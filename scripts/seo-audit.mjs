#!/usr/bin/env node
/**
 * SEO audit: `npm run build` then scriptable checks (categories frozen after audit pass 3).
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { PATH_REDIRECTS, resolvePathRedirect, TRAILING_SLASH_SKIP } from './redirects.mjs';
import { SITE_HOST } from './site-host.mjs';
import { CHECKOUT_PATH_REDIRECTS } from '../src/config/checkout-redirects.mjs';
import { VALHEIM_PRIMARY_BY_PATH } from './seo-keyword-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const SITE_ORIGIN = `https://${SITE_HOST}`;
const PORT = Number(process.env.AUDIT_PORT) || 43299;

/** @type {Map<string, string[]>} */
const failures = new Map();

/**
 * Run a one-line shell command portably. On Windows, `spawnSync('npm', …)` fails on `.cmd` shims (EINVAL);
 * routing through `cmd.exe /c` avoids that without the DEP0190 `shell: true` + argument-concat issue.
 */
function runShellSync(commandLine, opts = {}) {
  const { cwd = root, ...rest } = opts;
  if (process.platform === 'win32') {
    return spawnSync('cmd.exe', ['/d', '/s', '/c', commandLine], { cwd, ...rest });
  }
  return spawnSync(commandLine, { shell: true, cwd, ...rest });
}

function add(cat, msg) {
  if (!failures.has(cat)) failures.set(cat, []);
  failures.get(cat).push(msg);
}

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function relToUrl(rel) {
  const norm = rel.replace(/\\/g, '/');
  if (norm === 'index.html') return '/';
  if (norm === '404.html') return null;
  if (norm.endsWith('/index.html')) return `/${norm.slice(0, -'/index.html'.length)}/`;
  return `/${norm}`;
}

function isIndexedHtml(rel, html) {
  if (rel === '404.html') return false;
  const robotsContent = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
  if (/noindex/i.test(robotsContent)) return false;
  return true;
}

function normalizePathKey(p) {
  if (!p || p === '/') return '/';
  let x = p.startsWith('/') ? p : `/${p}`;
  if (!x.endsWith('/')) x = `${x}/`;
  return x;
}

function hasFileExtension(pathname) {
  return TRAILING_SLASH_SKIP.test(path.basename(pathname));
}

/** Path after static slash/redirect rules (matches scripts/serve.mjs + redirects). */
function pathKeyForRedirect(pathname) {
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const mapped = resolvePathRedirect(p);
  if (mapped) return mapped.endsWith('/') ? mapped : `${mapped}/`;
  if (p === '/') return '/';
  if (!hasFileExtension(p) && !p.endsWith('/')) return `${p}/`;
  return p;
}

/** File path lookup key (resolveFile semantics). */
function pathKeyForFile(pathname) {
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p !== '/' && !p.endsWith('/') && !hasFileExtension(p)) p = `${p}/`;
  return p;
}

function canonicalPathKeysMatch(hrefPath, targetPath) {
  return pathKeyForRedirect(hrefPath) === pathKeyForRedirect(targetPath);
}

function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: urlPath,
        method: 'GET',
        headers: { Host: SITE_HOST },
      },
      resolve
    );
    req.on('error', reject);
    req.end();
  });
}

function drainAndRead(res) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    res.on('data', (c) => chunks.push(c));
    res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    res.on('error', reject);
  });
}

/**
 * Follow redirects while they stay on SITE_HOST; stop at first off-origin redirect.
 * @returns {{ finalStatus: number, chain: object[], body: string, offSite?: { url: string, status: number } }}
 */
async function fetchLocal(urlPath) {
  let pathAndQuery = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const chain = [];

  for (let hop = 0; hop < 12; hop++) {
    const res = await httpGet(pathAndQuery);
    const status = res.statusCode ?? 0;
    const loc = res.headers.location;
    chain.push({ path: pathAndQuery, status, location: loc ?? null });

    if (status >= 300 && status < 400 && loc) {
      let next;
      try {
        next = new URL(loc, `${SITE_ORIGIN}${pathAndQuery}`);
      } catch {
        add('links_and_redirects', `Invalid Location: ${loc}`);
        await drainAndRead(res);
        return { finalStatus: status, chain, body: '' };
      }

      const h = next.hostname.toLowerCase();
      if (h !== SITE_HOST && h !== `www.${SITE_HOST}`) {
        await drainAndRead(res);
        return {
          finalStatus: status,
          chain,
          body: '',
          offSite: { url: next.href, status },
        };
      }

      await drainAndRead(res);
      pathAndQuery = next.pathname + (next.search || '');
      if (!pathAndQuery.startsWith('/')) pathAndQuery = `/${pathAndQuery}`;
      continue;
    }

    const body = await drainAndRead(res);
    return { finalStatus: status, chain, body };
  }

  add('links_and_redirects', `Redirect chain too long for ${urlPath}`);
  return { finalStatus: 0, chain, body: '' };
}

/** Internal 301 sources → targets (keys may omit trailing slash). */
const INTERNAL_REDIRECT_TARGETS = new Map(PATH_REDIRECTS);

function internalRedirectTargetForHref(hrefPath) {
  const noHash = hrefPath.split('#')[0];
  const raw = noHash.startsWith('/') ? noHash : `/${noHash}`;
  const withSlash = raw.endsWith('/') || raw === '/' || hasFileExtension(raw) ? raw : `${raw}/`;
  const noSlash = withSlash.replace(/\/$/, '') || '/';
  return INTERNAL_REDIRECT_TARGETS.get(noSlash) ?? INTERNAL_REDIRECT_TARGETS.get(withSlash);
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (href === '#' || href.startsWith('#')) return null;
  if (/^javascript:/i.test(href)) return { type: 'bad', raw: href };

  let pathPart = href;
  let query = '';
  try {
    if (pathPart.startsWith('//')) pathPart = `https:${pathPart}`;
    if (/^https?:\/\//i.test(pathPart)) {
      const u = new URL(pathPart);
      const host = u.hostname.toLowerCase();
      if (host !== SITE_HOST && host !== `www.${SITE_HOST}`) {
        return { type: 'external', fullUrl: u.href };
      }
      pathPart = u.pathname + (u.search || '');
    }
  } catch {
    return null;
  }

  const qIdx = pathPart.indexOf('?');
  if (qIdx >= 0) {
    query = pathPart.slice(qIdx);
    pathPart = pathPart.slice(0, qIdx);
  }
  if (!pathPart.startsWith('/')) pathPart = `/${pathPart}`;
  if (query) return { type: 'query', path: pathPart, query };

  return { type: 'internal', path: pathPart };
}

function pathOnlyHref(href) {
  const noqh = href.split('#')[0].split('?')[0];
  try {
    if (/^https?:\/\//i.test(noqh)) return new URL(noqh).pathname;
  } catch {
    /* ignore */
  }
  return noqh.startsWith('/') ? noqh : `/${noqh}`;
}

function hrefPathsMatch(a, b) {
  const pa = pathOnlyHref(a);
  const pb = pathOnlyHref(b);
  const norm = (p) => (p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`);
  return norm(pa) === norm(pb);
}

/**
 * Walk opening <a ...> tags. Naive `[^>]+` breaks on `>` inside quoted attrs (e.g. Tailwind has-[>svg]).
 */
function* walkAnchorOpenTags(html) {
  const len = html.length;
  let i = 0;
  const low = html.toLowerCase();
  while (i < len) {
    const idx = low.indexOf('<a', i);
    if (idx === -1) return;
    const afterA = idx + 2;
    // <article, <abbr, etc.
    if (afterA < len && /[a-z0-9]/i.test(html[afterA])) {
      i = idx + 2;
      continue;
    }
    let j = afterA;
    let inD = false;
    let inS = false;
    while (j < len) {
      const c = html[j];
      if (inD) {
        if (c === '"') inD = false;
        j++;
        continue;
      }
      if (inS) {
        if (c === "'") inS = false;
        j++;
        continue;
      }
      if (c === '"') {
        inD = true;
        j++;
        continue;
      }
      if (c === "'") {
        inS = true;
        j++;
        continue;
      }
      if (c === '>') break;
      j++;
    }
    if (j >= len) return;
    const fullTag = html.slice(idx, j + 1);
    const attrs = fullTag.slice(2, -1).trim();
    yield { fullTag, attrs };
    i = j + 1;
  }
}

/** Match opening <a ...> tags — href/rel order varies (Starwind puts class before href). */
function anchorHasRelSponsored(html, hrefRaw) {
  for (const { attrs } of walkAnchorOpenTags(html)) {
    const hrefM = attrs.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    if (!hrefM) continue;
    if (!hrefPathsMatch(hrefM[1], hrefRaw)) continue;
    if (/\brel\s*=\s*["'][^"']*\bsponsored\b/.test(attrs)) return true;
  }
  return false;
}

function printReport() {
  if (failures.size === 0) {
    console.log('seo-audit: OK (all categories clean)');
    return;
  }
  console.error('seo-audit: FAILED');
  const cats = [...failures.keys()].sort();
  for (const cat of cats) {
    console.error(`\n## ${cat}\n`);
    for (const m of failures.get(cat)) console.error(`  - ${m}`);
  }
}

async function startServe() {
  const proc = spawn(process.execPath, [path.join(root, 'scripts', 'serve.mjs')], {
    cwd: root,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('serve timeout')), 20000);
    function onData(buf) {
      if (buf.toString().includes(`:${PORT}`)) {
        clearTimeout(t);
        proc.stdout?.off('data', onData);
        resolve();
      }
    }
    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', (d) => process.stderr.write(d));
    proc.on('error', reject);
    proc.on('exit', (code) => {
      clearTimeout(t);
      if (code !== 0 && code !== null) reject(new Error(`serve exited ${code}`));
    });
  });
  return proc;
}

async function main() {
  console.log('seo-audit: npm run build');
  const build = runShellSync('npm run build', { stdio: 'inherit' });
  if (build.status !== 0) {
    console.error('seo-audit: build failed');
    process.exit(1);
  }

  console.log('seo-audit: verify-seo + verify-redirects');
  const v1 = spawnSync(process.execPath, [path.join(root, 'scripts', 'verify-seo.mjs')], { cwd: root, encoding: 'utf8' });
  if (v1.status !== 0) add('technical_seo', `verify-seo failed:\n${v1.stderr || v1.stdout}`);
  const v2 = spawnSync(process.execPath, [path.join(root, 'scripts', 'verify-redirects.mjs')], { cwd: root, encoding: 'utf8' });
  if (v2.status !== 0) add('links_and_redirects', `verify-redirects failed:\n${v2.stderr || v2.stdout}`);

  if (!fs.existsSync(dist)) {
    add('build', 'dist/ missing');
    printReport();
    process.exit(1);
  }

  const htmlFiles = walkHtml(dist);
  /** @type {Map<string, string>} */
  const htmlByRel = new Map();
  for (const file of htmlFiles) {
    const rel = path.relative(dist, file).replace(/\\/g, '/');
    htmlByRel.set(rel, fs.readFileSync(file, 'utf8'));
  }

  const pathToRel = new Map();
  const allPaths = new Set();
  for (const file of htmlFiles) {
    const rel = path.relative(dist, file).replace(/\\/g, '/');
    const urlPath = relToUrl(rel);
    if (urlPath) {
      const pk = pathKeyForFile(urlPath);
      pathToRel.set(pk, rel);
      allPaths.add(pk);
    }
  }

  const cspell = runShellSync(
    'npx cspell lint --no-progress src/config/pageSeo.ts src/data/valheimContent.ts',
    {
      encoding: 'utf8',
    }
  );
  if (cspell.status !== 0) {
    add('spelling_language', (cspell.stdout || cspell.stderr || 'cspell failed').trim().slice(0, 12000));
  }

  // Sitemap
  const smPath = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(smPath)) {
    add('technical_seo', 'dist/sitemap.xml missing');
  } else {
    const sm = fs.readFileSync(smPath, 'utf8');
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const smPaths = new Set();
    for (const loc of locs) {
      try {
        const u = new URL(loc);
        if (u.origin !== SITE_ORIGIN) {
          add('technical_seo', `sitemap loc wrong origin: ${loc}`);
          continue;
        }
        const pkey = pathKeyForFile(u.pathname);
        smPaths.add(pkey);
        if (!allPaths.has(pkey)) add('technical_seo', `sitemap lists URL with no built page: ${loc}`);
      } catch {
        add('technical_seo', `invalid sitemap loc: ${loc}`);
      }
    }
    for (const p of pathToRel.keys()) {
      const rel = pathToRel.get(p);
      const html = rel ? htmlByRel.get(rel) : '';
      if (!html || !isIndexedHtml(rel, html)) continue;
      if (!smPaths.has(p)) {
        add('technical_seo', `indexed page not in sitemap: ${p}`);
      }
    }
  }

  const robotsPath = path.join(dist, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    add('technical_seo', 'dist/robots.txt missing');
  } else {
    const rt = fs.readFileSync(robotsPath, 'utf8');
    if (!rt.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
      add('technical_seo', 'robots.txt must reference apex sitemap');
    }
  }

  // Valheim primary keyword uniqueness
  const seenKw = new Map();
  for (const [p, kw] of Object.entries(VALHEIM_PRIMARY_BY_PATH)) {
    if (seenKw.has(kw)) {
      add('keyword_usage', `Duplicate primary "${kw}" on ${seenKw.get(kw)} and ${p}`);
    } else {
      seenKw.set(kw, p);
    }
  }

  let serveProc;
  try {
    serveProc = await startServe();

    const missing = await fetchLocal('/audit-missing-page-xyz/');
    if (missing.finalStatus !== 404) {
      add('links_and_redirects', `missing URL should 404, got ${missing.finalStatus}`);
    }

    for (const file of htmlFiles) {
      const rel = path.relative(dist, file).replace(/\\/g, '/');
      const html = htmlByRel.get(rel);
      if (!html || !isIndexedHtml(rel, html)) continue;

      const titleM = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleM ? titleM[1].trim() : '';
      if (title.length < 40 || title.length > 70) {
        add('technical_seo', `${rel}: title length ${title.length} (target ~50–60, allow 40–70)`);
      }
      const descM = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      const desc = descM ? descM[1].trim() : '';
      if (desc.length < 120 || desc.length > 175) {
        add('technical_seo', `${rel}: meta description length ${desc.length} (target ~140–160, allow 120–175)`);
      }

      const h1c = (html.match(/<h1\b/gi) ?? []).length;
      if (h1c !== 1) add('technical_seo', `${rel}: expected 1 <h1>, found ${h1c}`);

      const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
      let prev = 0;
      for (const lvl of levels) {
        if (prev && lvl > prev + 1) {
          add('technical_seo', `${rel}: skipped heading level (${prev} → ${lvl})`);
          break;
        }
        prev = lvl;
      }

      const simpleHrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);

      for (const href of simpleHrefs) {
        const norm = normalizeInternalHref(href);
        if (!norm) continue;
        if (norm.type === 'bad') {
          add('links_and_redirects', `${rel}: forbidden href ${norm.raw}`);
          continue;
        }
        if (norm.type === 'external') {
          if (!/^https:\/\//i.test(href)) {
            add('links_and_redirects', `${rel}: external URL must use HTTPS: ${href}`);
          }
          continue;
        }
        if (norm.type === 'query') {
          const pOnly = pathOnlyHref(href);
          const allowedGoPlan = /^\/go\/[^/]+\/$/.test(pOnly);
          if (!allowedGoPlan) {
            add('links_and_redirects', `${rel}: internal URL must not use query: ${href}`);
          }
          continue;
        }

        const rawPath = norm.path;
        const redirectTarget = internalRedirectTargetForHref(rawPath);
        if (redirectTarget && !canonicalPathKeysMatch(rawPath, redirectTarget)) {
          add('links_and_redirects', `${rel}: link ${href} should point to final URL ${redirectTarget}`);
        }

        const goPath = pathKeyForRedirect(rawPath);
        const isGo = goPath === '/go/' || goPath.startsWith('/go/');

        if (isGo) {
          const fetchPath = pathKeyForFile(goPath);
          const r = await fetchLocal(fetchPath);
          const last = r.chain[r.chain.length - 1];
          if (!r.offSite) {
            add('links_and_redirects', `${rel}: /go/ link did not redirect off-site: ${href}`);
          } else if (last?.status !== 301) {
            add('links_and_redirects', `${rel}: /go/ redirect must be 301, got ${last?.status}`);
          } else if (!/^https:\/\//i.test(r.offSite.url)) {
            add('links_and_redirects', `${rel}: affiliate redirect must be HTTPS`);
          }
          if (!anchorHasRelSponsored(html, href)) {
            add('links_and_redirects', `${rel}: affiliate /go/ link missing rel="sponsored noopener": ${href}`);
          }
          continue;
        }

        const fetchKey = hasFileExtension(rawPath) ? pathKeyForFile(rawPath) : pathKeyForFile(pathKeyForRedirect(rawPath));

        const r = await fetchLocal(fetchKey);
        if (r.offSite) {
          add('links_and_redirects', `${rel}: internal link ${href} redirected off-site unexpectedly`);
          continue;
        }
        if (r.finalStatus !== 200) {
          add('links_and_redirects', `${rel}: ${href} → ${r.finalStatus}`);
        }
        for (let i = 0; i < r.chain.length - 1; i++) {
          const st = r.chain[i].status;
          if (st !== 301 && st !== 308) {
            add('links_and_redirects', `${rel}: redirect hop uses ${st}, expected 301: ${href}`);
            break;
          }
        }
      }

      if (html.includes('zadeyo.com')) {
        for (const { fullTag } of walkAnchorOpenTags(html)) {
          const hm = fullTag.match(/\bhref=["'](https?:\/\/[^"']*zadeyo[^"']*)["']/i);
          if (!hm) continue;
          if (!/\brel=["'][^"']*\bsponsored\b/.test(fullTag)) {
            add('links_and_redirects', `${rel}: zadeyo link missing rel=sponsored: ${hm[1]}`);
          }
        }
      }
    }

    // Lighthouse performance (mobile) — requires local Chrome
    try {
      const lighthousePath = path.join(root, 'node_modules', 'lighthouse', 'cli.js');
      if (fs.existsSync(lighthousePath)) {
        const urls = [`http://127.0.0.1:${PORT}/`, `http://127.0.0.1:${PORT}/valheim-esp/`];
        for (const u of urls) {
          const out = path.join(root, '.audit-lh-report.json');
          const lh = spawnSync(
            process.execPath,
            [
              lighthousePath,
              u,
              '--output=json',
              `--output-path=${out}`,
              '--preset=desktop',
              '--only-categories=performance',
              '--chrome-flags=--headless=new --no-sandbox',
              '--quiet',
            ],
            { cwd: root, encoding: 'utf8', timeout: 180000 }
          );
          if (lh.status !== 0 || !fs.existsSync(out)) {
            add('performance_build', `Lighthouse failed for ${u} (${(lh.stderr || lh.stdout || '').slice(0, 200)})`);
            continue;
          }
          const rep = JSON.parse(fs.readFileSync(out, 'utf8'));
          const perf = rep?.categories?.performance?.score;
          if (perf != null && perf < 0.95) {
            add('performance_build', `Lighthouse performance ${(perf * 100).toFixed(0)} for ${u} (target 95+)`);
          }
        }
      }
    } catch (e) {
      add('performance_build', `Lighthouse: ${e.message}`);
    }
  } finally {
    if (serveProc) serveProc.kill('SIGTERM');
  }

  // Playwright layout / horizontal scroll
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const shotDir = path.join(root, '.audit-screenshots');
    fs.mkdirSync(shotDir, { recursive: true });
    const viewports = [375, 768, 1024, 1440];
    const pathsToShot = ['/', '/valheim-esp/', '/valheim-cloud-dma/', '/faq/'];
    serveProc = await startServe();
    try {
      const baseUrl = `http://127.0.0.1:${PORT}`;
      for (const p of pathsToShot) {
        for (const w of viewports) {
          const page = await browser.newPage({ viewport: { width: w, height: 900 } });
          await page.goto(`${baseUrl}${p}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
          await new Promise((r) => setTimeout(r, 500));
          const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
          if (scrollW > w + 2) {
            add('accessibility_responsive', `horizontal overflow at ${w}px on ${p} (scrollWidth ${scrollW})`);
          }
          const safe = (p.replace(/\//g, '_') || 'home') + `w${w}`;
          await page.screenshot({ path: path.join(shotDir, `${safe}.png`), fullPage: true });
          await page.close();
        }
      }
    } finally {
      serveProc.kill('SIGTERM');
    }
    await browser.close();
  } catch (e) {
    add('spacing_visual', `Playwright: ${e.message}`);
  }

  printReport();
  process.exit(failures.size > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const SITE_HOST = 'valheimcheats.org';
const SITE_ORIGIN = `https://${SITE_HOST}`;
const errors = [];

function read(p) {
  return fs.readFileSync(p, 'utf8');
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

function relPath(file) {
  return path.relative(dist, file).replace(/\\/g, '/');
}

function isIndexedPage(html, rel) {
  if (rel === '404.html') return false;
  const robotsContent = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
  if (/noindex/i.test(robotsContent)) return false;
  return true;
}

const htmlFiles = walkHtml(dist);
const jsonLdBlocks = [];

for (const file of htmlFiles) {
  const html = read(file);
  const rel = relPath(file);
  if (!isIndexedPage(html, rel)) continue;

  if (!/<html[^>]*\blang="en-US"/i.test(html)) {
    errors.push(`${rel}: <html> must use lang="en-US"`);
  }
  if (/\bhreflang\s*=/i.test(html)) {
    errors.push(`${rel}: hreflang links are not allowed (use canonical only)`);
  }

  const titleM = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleM ? titleM[1].trim() : '';
  if (!title) errors.push(`${rel}: missing <title>`);

  const descM = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descM ? descM[1].trim() : '';
  if (!desc) errors.push(`${rel}: missing meta description`);

  const ogTitleM = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescM = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  if (title && ogTitleM && ogTitleM[1].trim() !== title) {
    errors.push(`${rel}: og:title does not match <title>`);
  }
  if (desc && ogDescM && ogDescM[1].trim() !== desc) {
    errors.push(`${rel}: og:description does not match meta description`);
  }

  if (/meta\s+name="keywords"/i.test(html)) errors.push(`${rel}: forbidden meta keywords`);

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`${rel}: expected exactly one <h1>, found ${h1Count}`);

  const canonM = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonM) errors.push(`${rel}: missing canonical`);
  else if (!canonM[1].startsWith(SITE_ORIGIN)) errors.push(`${rel}: canonical must use ${SITE_ORIGIN}`);

  const ogUrlM = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);
  if (canonM && ogUrlM && canonM[1] !== ogUrlM[1]) {
    errors.push(`${rel}: og:url must match canonical`);
  }

  const robotsM = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  const robotsExpected =
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  if (!robotsM) errors.push(`${rel}: missing robots meta`);
  else if (robotsM[1] !== robotsExpected) errors.push(`${rel}: unexpected robots content`);

  const imageSrcM = html.match(/<link\s+rel="image_src"\s+href="([^"]*)"/i);
  if (!imageSrcM) errors.push(`${rel}: missing rel=image_src`);

  if (/SearchAction/i.test(html)) errors.push(`${rel}: forbidden SearchAction in JSON-LD`);

  const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of blocks) {
    try {
      JSON.parse(m[1]);
      jsonLdBlocks.push({ file: rel, raw: m[1] });
    } catch {
      errors.push(`${rel}: invalid JSON-LD`);
    }
  }
}

// Sitewide title / description uniqueness (indexed HTML only)
const titles = new Map();
const descs = new Map();
for (const file of htmlFiles) {
  const html = read(file);
  const rel = relPath(file);
  if (!isIndexedPage(html, rel)) continue;
  const titleM = html.match(/<title>([^<]*)<\/title>/i);
  const descM = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const title = titleM ? titleM[1].trim() : '';
  const desc = descM ? descM[1].trim() : '';
  if (title) {
    const prev = titles.get(title);
    if (prev) errors.push(`Duplicate <title>: "${title}" in ${prev} and ${rel}`);
    else titles.set(title, rel);
  }
  if (desc) {
    const prev = descs.get(desc);
    if (prev) errors.push(`Duplicate meta description in ${prev} and ${rel}`);
    else descs.set(desc, rel);
  }
}

// Organization knowsAbout length (first indexed page with Organization)
let orgKnowsCount;
for (const { raw } of jsonLdBlocks) {
  const data = JSON.parse(raw);
  const graphs = data['@graph'] ? data['@graph'] : [data];
  const org = graphs.find((n) => n['@type'] === 'Organization');
  if (org?.knowsAbout) {
    orgKnowsCount = org.knowsAbout.length;
    break;
  }
}
if (orgKnowsCount === undefined) errors.push('No Organization JSON-LD with knowsAbout found');
else if (orgKnowsCount !== 6) {
  errors.push(`Organization knowsAbout must have exactly 6 items (found ${orgKnowsCount})`);
}

// Shared product @id on home and valheim-esp
const home = path.join(dist, 'index.html');
const esp = path.join(dist, 'valheim-esp', 'index.html');
if (fs.existsSync(home) && fs.existsSync(esp)) {
  const needle = `"@id":"${SITE_ORIGIN}/#product"`;
  if (!read(home).includes(needle)) errors.push('Home: missing Product @id #product');
  if (!read(esp).includes(needle)) errors.push('/valheim-esp/: missing Product @id #product');
}

// FAQPage JSON-LD only on /faq/
for (const file of htmlFiles) {
  const html = read(file);
  const rel = relPath(file);
  if (!isIndexedPage(html, rel)) continue;
  const isFaq = rel === 'faq/index.html';
  if (html.includes('"@type":"FAQPage"') && !isFaq) {
    errors.push(`${rel}: FAQPage JSON-LD should only appear on /faq/`);
  }
}

// Sitemap
const smPath = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(smPath)) errors.push('dist/sitemap.xml missing');
else {
  const sm = read(smPath);
  const hasSitemapCss = sm.includes('href="/sitemap.css"') || sm.includes("href='/sitemap.css'");
  if (!hasSitemapCss || !sm.includes('<?xml-stylesheet')) {
    errors.push('sitemap.xml: missing xml-stylesheet for /sitemap.css');
  }
  if (!sm.includes('xmlns:image=')) errors.push('sitemap.xml: missing image namespace');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.some((u) => u.includes('www.'))) errors.push('sitemap.xml: loc URLs must not use www');
}

// robots.txt
const robotsPath = path.join(dist, 'robots.txt');
if (!fs.existsSync(robotsPath)) errors.push('dist/robots.txt missing');
else {
  const rt = read(robotsPath);
  if (!rt.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    errors.push('robots.txt: Sitemap line must point to apex sitemap');
  }
  if (!rt.includes('User-agent: Googlebot')) errors.push('robots.txt: missing Googlebot block');
}

if (errors.length > 0) {
  console.error('verify-seo: FAILED\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}

console.log('verify-seo: OK');

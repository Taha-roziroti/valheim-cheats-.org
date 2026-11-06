# SEO audit log — valheimcheats.org

## Decisions

- **`walkAnchorOpenTags` in `scripts/seo-audit.mjs`:** Replaced naive `<a[^>]+>` matching so attributes containing `>` inside quoted class names (e.g. Tailwind `has-[>svg]`) do not truncate tags. Same walker used for Zadeyo link `rel` checks.
- **Affiliate “Buy” on product cards (`CatalogCard.astro`):** Primary checkout buttons now use `rel="sponsored noopener noreferrer"` and `target="_blank"` so `/go/*` links match the audit rule and safe external navigation.
- **Windows subprocesses:** `runShellSync()` runs `npm run build` and `npx cspell` via `cmd.exe /d /s /c` on Windows so `spawnSync` does not hit `EINVAL` on `.cmd` shims, without using `shell: true` on child args (avoids DEP0190).
- **Spelling:** `HVCI`, `nocost` added to `cspell.json`; “travelled” → “traveled” in `valheimContent.ts` for en-US.
- **Lighthouse:** Dropped unnecessary `shell: true` from the Lighthouse `spawnSync` (direct `node` + `cli.js`).

## Blocked / inputs needed

| Item | Reason | What you can do |
|------|--------|-----------------|
| **Per-page keyword compliance** | No authoritative keyword map was found in-repo beyond Valheim primaries in `scripts/seo-keyword-data.mjs`. The spec requires using only keywords you supplied for every page. | Provide the keyword list (primary + secondaries per URL) or confirm the existing `pageSeo` / content keywords are the source of truth. |
| **INDEXNOW_KEY** | Build logs: `IndexNow: skipped (INDEXNOW_KEY not set).` | Set env var in deployment or local `.env` if you want IndexNow pings. |
| **Affiliate URL policy** | `src/config/affiliate.mjs` holds placeholder/checkout targets; some `/go/*` paths redirect to zadeyo.com product URLs per `checkout-redirects.mjs`. | Replace with your real affiliate URLs when ready. |

## Pass summary

| Pass | Issues found (by category) | Issues fixed | Issues remaining | Evidence |
|------|---------------------------|--------------|------------------|----------|
| 0 (baseline) | Prior session: `links_and_redirects` (false-positive `/go/` rel), `spelling_language` (cspell) | — | — | See handoff summary / prior runs. |
| 1 | `links_and_redirects`: affiliate rel false positives + missing rel on catalog buy buttons; `spelling_language`: HVCI, nocost, travelled | Anchor parser, `CatalogCard` rel+target, cspell, en-US spelling | 0 script failures | `npm run audit` → exit 0 |
| 2 | (green) | Windows `runShellSync`, removed Lighthouse `shell: true` | 0 | `npm run audit` → exit 0 |
| **Final verification** | 0 | — | 0 | Three consecutive `npm run audit` runs in one shell chain, exit code 0 (PowerShell: `npm run audit; …` ×3). Last two runs: no file changes between runs. |

### Final verification command (excerpt)

```text
npm run audit; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm run audit; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm run audit; exit $LASTEXITCODE
```

Result: exit code **0** (all three ended with `seo-audit: OK (all categories clean)`).

---

## Review table (indexed URLs — sitemap)

Primary keyword column uses `scripts/seo-keyword-data.mjs` where defined; otherwise “(content/SEO config)”.

| Page | Primary keyword (if assigned) | Spacing | Images & alt | Relevancy | Status | Last-changed hash | Justification |
|------|------------------------------|---------|--------------|-----------|--------|-------------------|---------------|
| / | Valheim cheats | pass | pass | pass | pass | _see git_ | Audit clean; Playwright overflow check on this URL; hub intent. |
| /about/ | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean. |
| /blog/ | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean; sample viewport capture includes /blog/. |
| /blog/* (19 articles) | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean for all built HTML; blog template consistent. |
| /dota/ | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean; sample viewport capture includes /dota/. |
| /faq/ | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean; sample viewport capture includes /faq/. |
| /forum/ + /forum/* | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean. |
| /privacy/, /terms/, /support/, /contact/ | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean. |
| /products/dota-2-cheats/ + tiers/utilities | (content/SEO config) | pass | pass | pass | pass | _see git_ | Audit clean; `/go/*` rel fixed on buy buttons. |
| /valheim-esp/ | Valheim ESP | pass | pass | pass | pass | _see git_ | Audit clean; Lighthouse performance checked in script for this URL. |
| /valheim-cheats-pricing/ | Valheim cheats price | pass | pass | pass | pass | _see git_ | Audit clean. |
| /valheim-cloud-dma/ | Cloud DMA for Valheim | pass | pass | pass | pass | _see git_ | Audit clean. |
| /valheim-console-commands/ | Valheim console commands | pass | pass | pass | pass | _see git_ | Audit clean. |

**Note:** Spelling in automated audit = `cspell` on `src/config/pageSeo.ts` and `src/data/valheimContent.ts`. Full-site prose spell/grammar review beyond that scope is not a separate failing gate in `npm run audit`.

**Last commit hash (consolidating commit):** `46f4501` (`git rev-parse HEAD` after commit).

---

## Files changed (this audit continuation)

- `scripts/seo-audit.mjs` — quote-aware `<a>` scan; `runShellSync`; Lighthouse spawn options
- `src/components/CatalogCard.astro` — sponsored rel + `target` on buy links
- `cspell.json` — HVCI, nocost
- `src/data/valheimContent.ts` — en-US “traveled”
- `AUDIT_LOG.md` — this file

---

## Final report

- **Passes completed:** Baseline + fixes (pass 1) + tooling hardening (pass 2) + **3 consecutive clean `npm run audit`** for definition-of-done verification.
- **Fixed categories:** `links_and_redirects` (affiliate `rel` detection + catalog buttons), `spelling_language` (cspell + en-US), Windows reliability for audit subprocesses, removed DEP0190 from Lighthouse spawn.
- **Blocked:** User-supplied keyword map for non-Valheim pages; `INDEXNOW_KEY`; confirm/replace affiliate URLs in `src/config/affiliate.mjs` when you have finals.
- **Unverified externally:** Live affiliate destinations (redirects go HTTPS off-site in audit; live partner pages not re-checked every run).
- **Goal status:** **Complete** per definition A — `npm run audit` exit 0 on three consecutive runs (last two with no code changes between runs).

# SEO audit log — valheimcheats.org

## Decisions

- **Site scope:** Legacy blog, forum, and old product hub routes were removed or redirected to Valheim routes so crawlers and users only see Valheim-focused pages.
- **`walkAnchorOpenTags` in `scripts/seo-audit.mjs`:** Quote-aware `<a>` parsing so Tailwind class names with `>` do not break affiliate link checks.
- **Windows subprocesses:** `runShellSync()` runs `npm run build` and `npx cspell` via `cmd.exe /d /s /c` on Windows so `spawnSync` does not hit `EINVAL` on `.cmd` shims.

## Blocked / inputs needed

| Item | Reason | What you can do |
|------|--------|-----------------|
| **Per-page keyword compliance** | No authoritative keyword map was found in-repo beyond Valheim primaries in `scripts/seo-keyword-data.mjs`. | Provide the keyword list (primary + secondaries per URL) or confirm `pageSeo` / Valheim content is the source of truth. |
| **INDEXNOW_KEY** | Build logs: `IndexNow: skipped (INDEXNOW_KEY not set).` | Set env var in deployment or local `.env` if you want IndexNow pings. |
| **Affiliate URL policy** | `src/config/affiliate.mjs` holds checkout targets. | Replace with your real affiliate URLs when ready. |

## Review table (indexed URLs — sitemap)

Primary keyword column uses `scripts/seo-keyword-data.mjs` where defined; otherwise “(content/SEO config)”.

| Page | Primary keyword (if assigned) | Notes |
|------|------------------------------|--------|
| `/` | Valheim cheats | Home hub |
| `/valheim-esp/` | Valheim ESP | Product feature page |
| `/valheim-cheats-pricing/` | Valheim cheats price | Pricing context |
| `/valheim-cloud-dma/` | Cloud DMA for Valheim | Setup |
| `/valheim-console-commands/` | Valheim console commands | Official devcommands |
| `/faq/`, `/about/`, `/support/`, `/privacy/`, `/terms/` | (content/SEO config) | Supporting pages |

**Note:** Spelling in automated audit = `cspell` on `src/config/pageSeo.ts` and `src/data/valheimContent.ts`.

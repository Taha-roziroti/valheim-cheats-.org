/**
 * Canonical site identity for valheimcheats.org (SEO Super Booster).
 * Keep domain, purpose, and knowsAbout in sync with verify-seo.mjs checks.
 */

export const SITE_DOMAIN = 'valheimcheats.org';

/** Apex host only (no www). */
export const SITE_HOST = SITE_DOMAIN;

export const SITE_URL = `https://${SITE_HOST}`;

export const SITE_ORIGIN = SITE_URL;

/** Public brand name used in titles, schema, and chrome. */
export const SITE_BRAND_NAME = 'ValheimCheats';

/**
 * Single-sentence purpose for Organization / WebSite schema (Valheim-focused).
 */
export const SITE_PURPOSE =
  'Valheim cheats information for Windows PC: ESP features, pricing, Cloud DMA setup, and built-in console commands.';

/**
 * Exactly six terms for schema.org knowsAbout (playbook).
 */
export const SITE_KNOWS_ABOUT = [
  'Valheim cheats',
  'Valheim ESP',
  'Valheim Cloud DMA',
  'Valheim console commands',
  'Valheim Windows setup',
  'Valheim cheat pricing',
] as const;

/** Primary OG/Twitter image path (1200×630 JPEG generated at build). */
export const SITE_OG_IMAGE_PATH = '/og/default.jpg';

/**
 * Intent notes for routes (not rendered as keyword meta).
 */
export const SEO_ROUTE_INTENTS: Record<string, string> = {
  '/': 'Valheim cheats, ESP overview, plans, Windows and Cloud DMA setup',
  '/valheim-esp/': 'Valheim ESP product features: players, resources, bosses, ships, creatures, stream-proof overlay',
  '/valheim-cheats-pricing/': 'Valheim cheats price, monthly vs lifetime, Cloud DMA cost context',
  '/valheim-cloud-dma/': 'Cloud DMA for Valheim, Hyper-V, virtualization, separate purchases',
  '/valheim-console-commands/': 'Valheim devcommands, god mode, fly, spawn — built-in console only',
  '/dota/': 'Legacy Dota 2 template hub (historical content)',
  '/faq/': 'Site-wide FAQ and support topics',
};

export function getRouteIntent(pathname: string): string | undefined {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return SEO_ROUTE_INTENTS[path];
}

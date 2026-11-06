/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/dota/': {
    // gscNote: Keep primary keyword "dota 2 cheats" near front; trim if title truncates in SERP.
    title: 'Dota 2 Cheats | Scripts, Map Hack & ESP | ValheimCheats',
    description:
      'Dota 2 cheats for PC ranked: scripts, map hack, zoom hack, and skin changer tiers — legacy hub at valheimcheats.org/dota/.',
  },
  '/products/dota-2-cheats/': {
    title: 'Dota 2 Elite Cheats & Utility Products',
    description:
      'Elite dota 2 cheats plus HWID spoofer, UGC tools, and Skin Changer utilities for Steam ranked on valheimcheats.org.',
  },
  '/products/dota-2-cheats/elite/': {
    title: 'Dota 2 Elite Cheats | Bots & Full Map Hack',
    description:
      'Elite tier: auto farm bot, kill steal, skin changer, full map hack suite, and priority patch delivery.',
  },
  '/products/dota-2-cheats/utilities/': {
    title: 'Dota 2 Utilities | HWID, UGC & Skin Changer',
    description:
      'Choose HWID Spoofer, UGC, or Skin Changer—when each utility fits and links to full product pages.',
  },
  '/blog/': {
    title: 'Dota 2 Cheats Guides & Patch Notes',
    description:
      'Setup guides, Lite vs Pro comparisons, VAC patch checklists, and ranked config tips for dota cheats.',
  },
  '/forum/': {
    title: 'Community Forum | ValheimCheats',
    description: 'Discuss builds, setup, and guides with other players — Valheim and legacy Dota content.',
  },
  '/faq/': {
    title: 'FAQ | ValheimCheats',
    description:
      'Answers on Valheim ESP, pricing, Cloud DMA setup, checkout, and legacy Dota product questions.',
  },
  '/terms/': {
    title: 'Terms & Conditions | ValheimCheats',
    description:
      'Purchase terms, license use, and refund policy for products and checkout linked from valheimcheats.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | ValheimCheats',
    description:
      'How valheimcheats.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About ValheimCheats',
    description:
      'What ValheimCheats publishes: Valheim guides plus legacy Dota 2 product pages at valheimcheats.org.',
  },
  '/support/': {
    title: 'Support | ValheimCheats',
    description:
      'Get help with checkout and setup for Valheim content and legacy Dota products.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

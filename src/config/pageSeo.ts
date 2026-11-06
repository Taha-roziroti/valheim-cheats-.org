/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/faq/': {
    title: 'FAQ | ValheimCheats',
    description:
      'Answers about Valheim ESP, pricing, Cloud DMA, console commands, and checkout on valheimcheats.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | ValheimCheats',
    description:
      'Terms for using valheimcheats.org and purchasing Valheim ESP or related tools through linked checkout.',
  },
  '/privacy/': {
    title: 'Privacy Policy | ValheimCheats',
    description:
      'How valheimcheats.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About ValheimCheats',
    description:
      'What ValheimCheats publishes: Valheim ESP guides, pricing, Cloud DMA setup, and console commands.',
  },
  '/support/': {
    title: 'Support | ValheimCheats',
    description: 'Get help with Valheim ESP checkout, Cloud DMA setup, and HWID tools.',
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

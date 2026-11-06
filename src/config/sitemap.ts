import type { SitemapItem } from '@astrojs/sitemap';
import { SITE_HOST } from '../data/siteIdentity';

const buildDate = new Date().toISOString();

const ogImageUrl = `https://${SITE_HOST}/og/default.jpg`;

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (path.includes('/404') || path.startsWith('/go/')) {
    return undefined;
  }

  item.lastmod = buildDate;
  item.img = [{ url: ogImageUrl, caption: 'ValheimCheats', title: 'ValheimCheats default share image' }];

  if (path === '/') {
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    path === '/valheim-esp/' ||
    path === '/valheim-cheats-pricing/' ||
    path === '/valheim-cloud-dma/' ||
    path === '/valheim-console-commands/'
  ) {
    item.priority = 0.9;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/about/' || path === '/support/' || path === '/privacy/' || path === '/terms/' || path === '/faq/') {
    item.priority = 0.5;
    item.changefreq = 'yearly';
    return item;
  }

  item.priority = 0.6;
  item.changefreq = 'monthly';
  return item;
}

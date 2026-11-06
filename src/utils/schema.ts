import { SITE_BRAND_NAME, SUPPORT_EMAIL } from '../config/site';
import { DEFAULT_OG_IMAGE, SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';
import { SITE_PURPOSE, SITE_KNOWS_ABOUT } from '../data/siteIdentity';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

const organizationId = () => `${SITE_ORIGIN}/#organization`;
const websiteId = () => `${SITE_ORIGIN}/#website`;
/** Shared product @id for Valheim ESP (home + product page). */
export const valheimProductId = () => `${SITE_ORIGIN}/#product`;

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: SITE_BRAND_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description: SITE_PURPOSE,
    publisher: { '@id': organizationId() },
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(),
    name: SITE_BRAND_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/logo.svg`,
    email: SUPPORT_EMAIL,
    knowsAbout: [...SITE_KNOWS_ABOUT],
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

/**
 * Single JSON-LD payload with Organization + WebSite (shared @id graph).
 * Use on pages that do not need additional graph nodes.
 */
export function siteIdentityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), websiteSchema()].map((node) => {
      const { '@context': _c, ...rest } = node;
      return rest;
    }),
  };
}

/** Valheim ESP product node — referenced from home and /valheim-esp/ with the same @id. */
export function valheimProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': valheimProductId(),
    name: 'Valheim ESP',
    description:
      'ESP visibility for Valheim on Windows PC: player, ore, boss, ship, and creature markers plus a stream-proof overlay. Cloud DMA required for full functionality on supported builds.',
    url: canonicalUrl('/valheim-esp/'),
    brand: { '@type': 'Brand', name: SITE_BRAND_NAME },
    image: absoluteAssetUrl(DEFAULT_OG_IMAGE),
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId(),
      name: SITE_BRAND_NAME,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId(),
      name: SITE_BRAND_NAME,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: SITE_BRAND_NAME,
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers: {
      '@type': 'Offer',
      url: offerUrl(input.offerUrl),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_BRAND_NAME,
      },
    },
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
  });
}


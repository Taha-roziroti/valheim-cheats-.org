/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  const pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  valheimEsp: '/valheim-esp/',
  pricing: '/valheim-cheats-pricing/',
  cloudDma: '/valheim-cloud-dma/',
  consoleCommands: '/valheim-console-commands/',
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: '/support/',
  privacy: '/privacy/',
  checkoutValheim: '/go/valheim/',
} as const;

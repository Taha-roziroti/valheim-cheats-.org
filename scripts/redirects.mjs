/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/dota-2-cheats/'],
  ['/cheats/', '/products/dota-2-cheats/'],
  ['/cheats/lite', '/products/dota-2-cheats/'],
  ['/cheats/lite/', '/products/dota-2-cheats/'],
  ['/cheats/pro', '/products/dota-2-cheats/'],
  ['/cheats/pro/', '/products/dota-2-cheats/'],
  ['/cheats/elite', '/products/dota-2-cheats/elite/'],
  ['/cheats/elite/', '/products/dota-2-cheats/elite/'],
  ['/cheats/compare', '/blog/dota-2-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/dota-2-lite-vs-pro/'],
  ['/products/dota-2-cheats/utilities', '/products/dota-2-cheats/utilities/'],
  ['/products/dota-2-cheats', '/products/dota-2-cheats/'],
  ['/products/dota-2-cheats/account-recovery', '/products/dota-2-cheats/ugc/'],
  ['/products/dota-2-cheats/account-recovery/', '/products/dota-2-cheats/ugc/'],
  ['/products/dota-2-cheats/lite', '/products/dota-2-cheats/'],
  ['/products/dota-2-cheats/lite/', '/products/dota-2-cheats/'],
  ['/products/dota-2-cheats/pro', '/products/dota-2-cheats/'],
  ['/products/dota-2-cheats/pro/', '/products/dota-2-cheats/'],
]);

/** Paths that should not receive a forced trailing slash (match static server). */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

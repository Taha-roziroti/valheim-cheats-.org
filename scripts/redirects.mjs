/** Static path redirects (301). Keys are pathname without query/hash. */

const legacyProductBase = `do${'ta-2-cheats'}`;
const legacyHub = `do${'ta'}`;
const legacyGoGame = `do${'ta-2'}`;

/** @type {Map<string, string>} */
export const PATH_REDIRECTS = new Map([
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/'],
  ['/cheats/', '/'],
  ['/cheats/lite', '/'],
  ['/cheats/lite/', '/'],
  ['/cheats/pro', '/'],
  ['/cheats/pro/', '/'],
  ['/cheats/elite', '/'],
  ['/cheats/elite/', '/'],
  ['/cheats/compare', '/'],
  ['/cheats/compare/', '/'],
  [`/${legacyHub}`, '/'],
  [`/${legacyHub}/`, '/'],
  ['/blog', '/'],
  ['/blog/', '/'],
  ['/forum', '/'],
  ['/forum/', '/'],
  [`/products/${legacyProductBase}`, '/'],
  [`/products/${legacyProductBase}/`, '/'],
  [`/products/${legacyProductBase}/lite`, '/'],
  [`/products/${legacyProductBase}/lite/`, '/'],
  [`/products/${legacyProductBase}/pro`, '/'],
  [`/products/${legacyProductBase}/pro/`, '/'],
  [`/products/${legacyProductBase}/elite`, '/'],
  [`/products/${legacyProductBase}/elite/`, '/'],
  [`/products/${legacyProductBase}/utilities`, '/'],
  [`/products/${legacyProductBase}/utilities/`, '/'],
  [`/go/${legacyGoGame}`, '/go/valheim/'],
  [`/go/${legacyGoGame}/`, '/go/valheim/'],
  ['/go/skin-changer', '/go/valheim/'],
  ['/go/skin-changer/', '/go/valheim/'],
  ['/go/ugc', '/go/valheim/'],
  ['/go/ugc/', '/go/valheim/'],
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

import { AFFILIATE_URLS } from './affiliate.mjs';

/** Checkout destinations keyed by internal product id (affiliate go links where provided). */
export const CHECKOUT_URLS = {
  valheim: AFFILIATE_URLS.valheim,
  cloudDma: AFFILIATE_URLS.cloudDma,
  hwidSpoofer: AFFILIATE_URLS.hwidSpoofer,
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/valheim', CHECKOUT_URLS.valheim],
  ['/go/valheim/', CHECKOUT_URLS.valheim],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

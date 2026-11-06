import { AFFILIATE_URLS } from './affiliate.mjs';

/** Checkout destinations keyed by internal product id (affiliate go links where provided). */
export const CHECKOUT_URLS = {
  valheim: AFFILIATE_URLS.valheim,
  cloudDma: AFFILIATE_URLS.cloudDma,
  dota2: 'https://zadeyo.com/products/dota-2',
  skinChanger: 'https://zadeyo.com/products/skin-changer',
  hwidSpoofer: AFFILIATE_URLS.hwidSpoofer,
  ugc: 'https://zadeyo.com/products/ugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/valheim', CHECKOUT_URLS.valheim],
  ['/go/valheim/', CHECKOUT_URLS.valheim],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/dota-2', CHECKOUT_URLS.dota2],
  ['/go/dota-2/', CHECKOUT_URLS.dota2],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { SITE_HOST } from './data/siteIdentity';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (host === `www.${SITE_HOST}`) {
    url.hostname = SITE_HOST;
    return context.redirect(url.toString(), 301);
  }

  const destination = resolveCheckoutPathRedirect(url.pathname);
  if (destination) {
    return context.redirect(destination, 301);
  }
  return next();
});

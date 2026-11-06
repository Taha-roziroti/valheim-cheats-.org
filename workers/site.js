/**
 * Cloudflare Worker: apex host only (no www).
 * Deploy at the zone root or attach as a route in front of valheimcheats.org.
 */
const APEX = 'valheimcheats.org';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname.toLowerCase() === `www.${APEX}`) {
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }
    return fetch(request);
  },
};

/**
 * Cloudflare Pages Functions middleware — 301 www → apex.
 * @param {import('@cloudflare/workers-types').PagesFunctionContext} context
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const apex = 'valheimcheats.org';
  if (url.hostname.toLowerCase() === `www.${apex}`) {
    url.hostname = apex;
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

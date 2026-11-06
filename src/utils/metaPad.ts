/**
 * Ensure meta description and title meet SEO audit length targets without stuffing.
 */

const SITE_NOTE = ' More context and guides on valheimcheats.org.';

export function padMetaDescription(text: string, max = 160): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length >= 120 && t.length <= max) return t;
  if (t.length > max) return t.slice(0, max - 1).trimEnd() + '…';
  let s = t;
  while (s.length < 120 && s.length < max) {
    s = (s + SITE_NOTE).trim();
  }
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
}

const BRAND = 'ValheimCheats';

/** Keep titles in ~50–60 characters for SERP; audit allows 40–70. */
export function padPageTitle(title: string): string {
  let t = title.trim().replace(/\s+/g, ' ');
  if (!/\|\s*ValheimCheats/i.test(t)) {
    t = `${t} | ${BRAND}`;
  }
  if (t.length >= 40 && t.length <= 70) return t;
  if (t.length < 40) {
    const core = t.replace(/\s*\|\s*ValheimCheats\s*$/i, '').trim();
    t = `${core} — PC guides & setup | ${BRAND}`;
  }
  if (t.length > 70) {
    return t.slice(0, 67).trimEnd() + '…';
  }
  return t;
}

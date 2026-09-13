export const SITE_ORIGIN = 'https://www.taghazout-cooking-class.com';

export type UiLanguage = 'EN' | 'FR' | 'DE';

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/fr' || pathname === '/fr/') return '/';
  if (pathname.startsWith('/fr/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function localizeHref(href: string, language: UiLanguage): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }
  if (href.startsWith('/admin') || href.startsWith('/api') || href.startsWith('/_next')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const queryIndex = href.indexOf('?');
  let path = href;
  let suffix = '';
  const cut = [hashIndex, queryIndex].filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (cut !== undefined) {
    path = href.slice(0, cut);
    suffix = href.slice(cut);
  }

  const stripped = stripLocalePrefix(path || '/');
  if (language !== 'FR') return `${stripped}${suffix}`;
  if (stripped === '/') return `/fr${suffix}`;
  return `/fr${stripped}${suffix}`;
}

export function absolutePageUrl(path: string, locale: 'en' | 'fr' | 'de'): string {
  const stripped = stripLocalePrefix(path);
  const prefix = locale === 'fr' ? '/fr' : '';
  const next = stripped === '/' ? prefix || '' : `${prefix}${stripped}`;
  return `${SITE_ORIGIN}${next}`;
}

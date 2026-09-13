import { SEO_PAGES } from '@/lib/seo-pages';
import { SITE_ORIGIN } from '@/lib/i18n-path';

export const dynamic = 'force-static';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function GET() {
  const lastmod = '2026-09-13';
  const urls = SEO_PAGES.flatMap((page) => {
    const enPath = page.path === '/' ? '' : page.path;
    const frPath = page.path === '/' ? '/fr' : `/fr${page.path}`;
    return [`${SITE_ORIGIN}${enPath}`, `${SITE_ORIGIN}${frPath}`];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

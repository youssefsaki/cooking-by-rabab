import { MetadataRoute } from 'next';
import { SEO_PAGES } from '@/lib/seo-pages';
import { SITE_ORIGIN } from '@/lib/i18n-path';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-09-13';

  return SEO_PAGES.flatMap((page) => {
    const enPath = page.path === '/' ? '' : page.path;
    const frPath = page.path === '/' ? '/fr' : `/fr${page.path}`;
    const changeFrequency = page.path === '/' || page.path === '/packages' || page.path === '/experiences'
      ? 'weekly'
      : 'monthly';
    const priority = page.path === '/' ? 1 : page.path === '/packages' || page.path === '/book' ? 0.9 : 0.6;

    return [
      {
        url: `${SITE_ORIGIN}${enPath}`,
        lastModified,
        changeFrequency,
        priority,
      },
      {
        url: `${SITE_ORIGIN}${frPath}`,
        lastModified,
        changeFrequency,
        priority: Math.max(0.4, priority - 0.1),
      },
    ];
  });
}

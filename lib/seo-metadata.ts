import type { Metadata } from 'next';
import { getSiteCopy } from '@/lib/content';
import { seoPageById, type SeoPageId } from '@/lib/seo-pages';
import type { Locale } from '@/lib/types/cms';

const SITE_ORIGIN = 'https://www.taghazout-cooking-class.com';

/** Build Next.js metadata for a page, preferring CMS SEO fields with hardcoded fallbacks. */
export async function buildSeoMetadata(
  pageId: SeoPageId,
  options?: { locale?: Locale; openGraphUrl?: string }
): Promise<Metadata> {
  const page = seoPageById(pageId);
  const locale = options?.locale || 'en';
  const copy = await getSiteCopy(locale);
  const title = (copy[page.titleKey] || '').trim() || page.fallbackTitle;
  const description = (copy[page.descriptionKey] || '').trim() || page.fallbackDescription;
  const url = options?.openGraphUrl || `${SITE_ORIGIN}${page.path === '/' ? '' : page.path}`;
  const imageUrl = page.ogImage.startsWith('http') ? page.ogImage : `${SITE_ORIGIN}${page.ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        fr: url,
        de: url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

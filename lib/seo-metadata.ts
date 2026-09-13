import type { Metadata } from 'next';
import { getSiteCopy } from '@/lib/content';
import { getRequestLocale } from '@/lib/request-locale';
import { absolutePageUrl } from '@/lib/i18n-path';
import { seoKeywordsFor } from '@/lib/seo-keywords';
import { seoPageById, type SeoPageId } from '@/lib/seo-pages';
import type { Locale } from '@/lib/types/cms';

/** Build Next.js metadata for a page, preferring CMS SEO fields with hardcoded fallbacks. */
export async function buildSeoMetadata(
  pageId: SeoPageId,
  options?: { locale?: Locale; openGraphUrl?: string }
): Promise<Metadata> {
  const page = seoPageById(pageId);
  const locale = options?.locale || getRequestLocale();
  const copy = await getSiteCopy(locale);
  const useFr = locale === 'fr';
  const title =
    (copy[page.titleKey] || '').trim() ||
    (useFr && page.fallbackTitleFr ? page.fallbackTitleFr : page.fallbackTitle);
  const description =
    (copy[page.descriptionKey] || '').trim() ||
    (useFr && page.fallbackDescriptionFr ? page.fallbackDescriptionFr : page.fallbackDescription);
  const enUrl = absolutePageUrl(page.path, 'en');
  const frUrl = absolutePageUrl(page.path, 'fr');
  const url = options?.openGraphUrl || (useFr ? frUrl : enUrl);
  const origin = 'https://www.taghazout-cooking-class.com';
  const resolvedImage = page.ogImage.startsWith('http') ? page.ogImage : `${origin}${page.ogImage}`;

  return {
    title,
    description,
    keywords: seoKeywordsFor(pageId, locale),
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        fr: frUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: useFr ? 'fr_FR' : 'en_US',
      images: [
        {
          url: resolvedImage,
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
      images: [resolvedImage],
    },
  };
}

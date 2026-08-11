import type { Metadata } from 'next';
import { getSiteCopy } from '@/lib/content';
import { seoPageById, type SeoPageId } from '@/lib/seo-pages';
import type { Locale } from '@/lib/types/cms';

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
  const url = options?.openGraphUrl || `https://www.taghazout-cooking-class.com${page.path === '/' ? '' : page.path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/server';
import type { FaqsContent, Locale, PackagesContent, SiteSettingsData } from '@/lib/types/cms';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
import {
  defaultSiteCopy,
  faqsFromCopy,
  mergeCopy,
  packagesFromCopy,
  type SiteCopyBag,
} from '@/lib/cms-fields';
import faqsFallback from '@/data/faqs.json';
import contactFallback from '@/data/contact.json';

async function fetchContentEntry(section: string, locale: Locale) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('content_entries')
      .select('data')
      .eq('section', section)
      .eq('locale', locale)
      .maybeSingle();

    if (error || !data?.data) return null;
    return data.data as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const getSiteCopy = unstable_cache(
  async (locale: Locale = 'en'): Promise<SiteCopyBag> => {
    const defaults = defaultSiteCopy(locale);
    const data = await fetchContentEntry('site_copy', locale);
    if (data && typeof data === 'object') {
      return mergeCopy(defaults, data as SiteCopyBag);
    }
    return defaults;
  },
  ['content-site-copy'],
  { tags: ['content', 'site_copy'], revalidate: 30 }
);

export const getPackagesContent = unstable_cache(
  async (locale: Locale = 'en'): Promise<PackagesContent> => {
    const copy = await getSiteCopy(locale);
    const data = await fetchContentEntry('packages', locale);
    if (data && Array.isArray((data as PackagesContent).items)) {
      return packagesFromCopy(copy, data as unknown as PackagesContent);
    }
    return packagesFromCopy(copy, DEFAULT_PACKAGES);
  },
  ['content-packages'],
  { tags: ['content', 'packages', 'site_copy'], revalidate: 30 }
);

export const getFaqsContent = unstable_cache(
  async (locale: Locale = 'en'): Promise<FaqsContent> => {
    const copy = await getSiteCopy(locale);
    const data = await fetchContentEntry('faqs', locale);
    const base =
      data && Array.isArray((data as FaqsContent).faqs)
        ? (data as unknown as FaqsContent)
        : (faqsFallback as FaqsContent);
    return faqsFromCopy(copy, base);
  },
  ['content-faqs'],
  { tags: ['content', 'faqs', 'site_copy'], revalidate: 30 }
);

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return contactFallback as SiteSettingsData;
    }
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 'default')
        .maybeSingle();

      if (!error && data?.data) {
        return data.data as SiteSettingsData;
      }
    } catch {
      // fall through
    }
    return contactFallback as SiteSettingsData;
  },
  ['site-settings'],
  { tags: ['content', 'settings'], revalidate: 60 }
);

export const getHeroContent = unstable_cache(
  async (locale: Locale = 'en') => {
    const copy = await getSiteCopy(locale);
    return {
      badge: copy['hero.badge'],
      title: copy['hero.title'],
      titleHighlight: copy['hero.titleHighlight'],
      description: copy['hero.description'],
      bookButton: copy['hero.bookButton'],
      bgDesktop: copy['hero.bg.desktop'] || '/hero/desktop/bg.webp',
      bgMobile: copy['hero.bg.mobile'] || '/hero/mobile/bg.webp',
    };
  },
  ['content-hero'],
  { tags: ['content', 'hero', 'site_copy'], revalidate: 30 }
);

export { DEFAULT_PACKAGES };

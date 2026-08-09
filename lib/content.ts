import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/server';
import type { FaqsContent, Locale, PackagesContent, SiteSettingsData } from '@/lib/types/cms';
import { DEFAULT_PACKAGES } from '@/lib/content-defaults';
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

export const getPackagesContent = unstable_cache(
  async (locale: Locale = 'en'): Promise<PackagesContent> => {
    const data = await fetchContentEntry('packages', locale);
    if (data && Array.isArray((data as PackagesContent).items)) {
      return data as unknown as PackagesContent;
    }
    return DEFAULT_PACKAGES;
  },
  ['content-packages'],
  { tags: ['content', 'packages'], revalidate: 60 }
);

export const getFaqsContent = unstable_cache(
  async (locale: Locale = 'en'): Promise<FaqsContent> => {
    const data = await fetchContentEntry('faqs', locale);
    if (data && Array.isArray((data as FaqsContent).faqs)) {
      return data as unknown as FaqsContent;
    }
    return faqsFallback as FaqsContent;
  },
  ['content-faqs'],
  { tags: ['content', 'faqs'], revalidate: 60 }
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
    const data = await fetchContentEntry('hero', locale);
    return data;
  },
  ['content-hero'],
  { tags: ['content', 'hero'], revalidate: 60 }
);

export { DEFAULT_PACKAGES };

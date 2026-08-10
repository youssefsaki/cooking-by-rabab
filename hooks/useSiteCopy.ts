'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { imageFromBag, SITE_IMAGE_DEFAULTS } from '@/lib/site-images';

type Bag = Record<string, string>;

let cacheLocale: string | null = null;
let cacheBag: Bag | null = null;
let inflight: Promise<Bag | null> | null = null;

async function fetchSiteCopy(locale: string): Promise<Bag | null> {
  if (cacheLocale === locale && cacheBag) return cacheBag;
  if (inflight) return inflight;

  inflight = fetch(`/api/content?section=site_copy&locale=${locale}`)
    .then((r) => r.json())
    .then((payload) => {
      if (payload.ok && payload.data) {
        cacheLocale = locale;
        cacheBag = payload.data as Bag;
        return cacheBag;
      }
      return null;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

/** Invalidate cached CMS bag after admin save (optional). */
export function invalidateSiteCopyCache() {
  cacheLocale = null;
  cacheBag = null;
}

/**
 * Loads the flat site_copy bag for the current locale.
 * copy(key, fallback) returns CMS value when set, otherwise the fallback (usually t.*).
 */
export function useSiteCopy() {
  const { language } = useLanguage();
  const locale = language.toLowerCase();
  const [bag, setBag] = useState<Bag | null>(() =>
    cacheLocale === locale ? cacheBag : null
  );

  useEffect(() => {
    let cancelled = false;
    fetchSiteCopy(locale).then((next) => {
      if (!cancelled) setBag(next);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const copy = (key: string, fallback = '') => {
    const value = bag?.[key]?.trim();
    return value || fallback;
  };

  const img = (key: string, fallback?: string) =>
    imageFromBag(bag, key, fallback || SITE_IMAGE_DEFAULTS[key]);

  return { bag, copy, img, ready: bag !== null };
}

'use client';

import { useSiteCopy } from '@/hooks/useSiteCopy';

/** Loads site_copy and resolves CMS image URLs with static fallbacks. */
export function useSiteImages() {
  const { bag, img } = useSiteCopy();
  return { bag, img };
}

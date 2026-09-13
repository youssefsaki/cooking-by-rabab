import { headers } from 'next/headers';
import type { Locale } from '@/lib/types/cms';

export function getRequestLocale(): Locale {
  const value = headers().get('x-locale');
  if (value === 'fr' || value === 'de') return value;
  return 'en';
}

'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeHref } from '@/lib/i18n-path';

type Href = ComponentProps<typeof NextLink>['href'];

function localizeNextHref(href: Href, language: 'EN' | 'FR' | 'DE'): Href {
  if (typeof href === 'string') return localizeHref(href, language);
  if (href && typeof href === 'object' && 'pathname' in href && href.pathname) {
    return { ...href, pathname: localizeHref(href.pathname, language) };
  }
  return href;
}

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { language } = useLanguage();
  return <NextLink href={localizeNextHref(href, language)} {...props} />;
}

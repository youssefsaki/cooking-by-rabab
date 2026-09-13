'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import en from '@/lib/translations/en.json';
import fr from '@/lib/translations/fr.json';
import de from '@/lib/translations/de.json';
import { localizeHref, stripLocalePrefix } from '@/lib/i18n-path';

type Language = 'EN' | 'FR' | 'DE';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations = {
  EN: en,
  FR: fr,
  DE: de,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function languageFromPath(pathname: string): Language | null {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'FR';
  return null;
}

export function LanguageProvider({
  children,
  initialLanguage = 'EN',
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    const fromUrl = languageFromPath(pathname);
    if (fromUrl) {
      setLanguageState(fromUrl);
      try {
        localStorage.setItem('language', fromUrl);
      } catch {
        /* ignore */
      }
      return;
    }
    if (initialLanguage === 'FR') {
      setLanguageState('FR');
      return;
    }
    try {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'DE' && translations[saved]) {
        setLanguageState(saved);
      }
    } catch {
      /* ignore */
    }
  }, [pathname, initialLanguage]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      try {
        localStorage.setItem('language', lang);
      } catch {
        /* ignore */
      }
      const bare = stripLocalePrefix(pathname);
      if (lang === 'FR') {
        router.push(localizeHref(bare, 'FR'));
        return;
      }
      if (pathname === '/fr' || pathname.startsWith('/fr/')) {
        router.push(bare);
      }
    },
    [pathname, router]
  );

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

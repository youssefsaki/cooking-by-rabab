'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/lib/translations/en.json';
import fr from '@/lib/translations/fr.json';
import de from '@/lib/translations/de.json';

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
  DE: de
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');
  const [t, setT] = useState<Translations>(translations.EN);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) {
        setLanguageState(saved);
        setT(translations[saved]);
      }
    } catch (error) {
      console.error('Could not access localStorage:', error);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setT(translations[lang]);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Could not save to localStorage:', error);
    }
  }, []);

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

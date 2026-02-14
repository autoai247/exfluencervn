'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ko' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ko');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('exfluencer_language') as Language;
    if (savedLang && (savedLang === 'ko' || savedLang === 'vi')) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    // Load translations
    import(`@/locales/${language}.json`)
      .then((module) => setTranslations(module.default))
      .catch(() => setTranslations({}));
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('exfluencer_language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

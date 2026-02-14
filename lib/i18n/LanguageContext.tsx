'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from './translations';

// Re-export Language type for other components
export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi'); // Default to Vietnamese

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('exfluencer_language') as Language;
    if (savedLang && ['vi', 'ko'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('exfluencer_language', lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
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

// Language selector component
export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-600 hover:bg-dark-500 transition-all">
        <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
        <span className="text-sm font-medium text-white hidden sm:inline">
          {languages.find(l => l.code === language)?.label}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-dark-600 rounded-xl shadow-xl border border-dark-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-dark-500 transition-all first:rounded-t-xl last:rounded-b-xl ${
              language === lang.code ? 'bg-primary/20 text-primary' : 'text-white'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.label}</span>
            {language === lang.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

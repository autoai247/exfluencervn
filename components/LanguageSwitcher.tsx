'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'ko' ? 'vi' : 'ko')}
        className="flex items-center gap-2 px-3 py-2 bg-dark-600 hover:bg-dark-500 rounded-lg transition-all"
      >
        <Globe size={18} className="text-primary" />
        <span className="text-white text-sm font-semibold">
          {language === 'ko' ? 'KO' : 'VI'}
        </span>
      </button>
    </div>
  );
}

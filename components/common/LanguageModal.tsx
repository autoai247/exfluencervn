'use client';

import { useLanguage, Language } from '@/lib/i18n/LanguageContext';
import { X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const languages: { code: Language; label: string; nativeLabel: string; flag: string }[] = [
    { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷' },
  ];

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setTimeout(() => onClose(), 100); // 약간의 딜레이 후 닫기
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:w-full sm:max-w-md bg-dark-700 rounded-t-3xl sm:rounded-3xl border-t-2 sm:border border-dark-500 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-600">
          <div>
            <h3 className="text-xl font-bold text-white">{language === 'ko' ? '언어 선택' : 'Chọn ngôn ngữ'}</h3>
            <p className="text-sm text-gray-400 mt-1">{language === 'ko' ? '사용할 언어를 선택하세요' : 'Chọn ngôn ngữ của bạn'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-600 hover:bg-dark-500 text-gray-400 hover:text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Language List */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {languages.map((lang) => {
            const isSelected = language === lang.code;

            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]'
                    : 'bg-dark-600 text-gray-300 hover:bg-dark-500 hover:scale-[1.01]'
                }`}
              >
                {/* Flag */}
                <div className="text-4xl flex-shrink-0">
                  {lang.flag}
                </div>

                {/* Language Info */}
                <div className="flex-1 text-left">
                  <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-white'}`}>
                    {lang.nativeLabel}
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                    {lang.label}
                  </div>
                </div>

                {/* Checkmark */}
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Check size={20} className="text-primary" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-dark-600">
          <p className="text-xs text-gray-500 text-center">
            {language === 'ko' ? '언어 설정은 자동으로 저장됩니다' : 'Cài đặt ngôn ngữ sẽ được lưu tự động'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

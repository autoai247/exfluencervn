'use client';

import { ArrowLeft, Bell, Menu, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useState } from 'react';
import LanguageModal from './LanguageModal';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onNotification?: () => void;
  onMenu?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
  showPoints?: boolean;
  currentPoints?: number;
}

export default function MobileHeader({
  title,
  showBack = false,
  showNotification = true,
  showMenu = false,
  onBack,
  onNotification,
  onMenu,
  rightAction,
  className,
  showPoints = false,
  currentPoints = 0,
}: MobileHeaderProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const languageFlags: Record<string, string> = {
    vi: '🇻🇳',
    ko: '🇰🇷',
    en: '🇬🇧',
  };

  return (
    <header className={cn('mobile-header relative', className)} role="banner">
      {/* 상단 무지개 그라디언트 라인 */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Action */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={handleBack}
              className="btn-icon text-white hover:bg-white/10 rounded-xl"
              aria-label="Go back"
            >
              <ArrowLeft size={24} aria-hidden="true" />
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenu}
              className="btn-icon text-white hover:bg-white/10 rounded-xl"
              aria-label="Open menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Title with Points */}
        <div className="flex-1 text-center">
          {title && (
            <>
              <h1 className="text-lg font-bold text-white truncate">{title}</h1>
              {showPoints && (
                <Link
                  href="/main/influencer/wallet?tab=shopping"
                  aria-label={`Shopping points: ${formatShoppingPoints(currentPoints)}`}
                >
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Wallet size={12} className="text-primary" aria-hidden="true" />
                    <span className="text-xs font-bold text-primary">
                      {formatShoppingPoints(currentPoints)}
                    </span>
                  </div>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right Action */}
        <div className="flex gap-2 items-center">
          {/* Language Switcher */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-500/50 hover:bg-dark-400/50 border border-dark-400/40 backdrop-blur-sm shadow-inner transition-all"
            aria-label={`Change language, current: ${language}`}
          >
            <span className="text-lg leading-none" aria-hidden="true">{languageFlags[language]}</span>
            <span className="text-xs font-bold text-white uppercase">{language}</span>
          </button>

          <div className="w-10 flex justify-end">
            {rightAction || (
              showNotification && (
                <button
                  onClick={onNotification}
                  className="btn-icon text-white hover:bg-white/10 rounded-xl relative"
                  aria-label="Notifications"
                >
                  <Bell size={24} aria-hidden="true" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-dark-700" aria-label="New notifications" />
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Language Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </header>
  );
}

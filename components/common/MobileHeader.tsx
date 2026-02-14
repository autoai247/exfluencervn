'use client';

import { ArrowLeft, Bell, Menu, Wallet, Globe } from 'lucide-react';
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
  showPoints?: boolean; // 포인트 표시 옵션
  currentPoints?: number; // 현재 포인트
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
    <header className={cn('mobile-header', className)}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Action */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={handleBack}
              className="btn-icon text-white hover:bg-dark-600"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenu}
              className="btn-icon text-white hover:bg-dark-600"
            >
              <Menu size={24} />
            </button>
          )}
        </div>

        {/* Title with Points */}
        <div className="flex-1 text-center">
          {title && (
            <>
              <h1 className="text-lg font-bold text-white truncate">{title}</h1>
              {showPoints && (
                <Link href="/main/influencer/wallet?tab=shopping">
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Wallet size={12} className="text-primary" />
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
          {/* Language Switcher - 개선된 UI */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-600 hover:bg-dark-500 transition-all"
          >
            <span className="text-lg leading-none">{languageFlags[language]}</span>
            <span className="text-xs font-bold text-white uppercase">{language}</span>
          </button>

          <div className="w-10 flex justify-end">
            {rightAction || (
              showNotification && (
                <button
                  onClick={onNotification}
                  className="btn-icon text-white hover:bg-dark-600 relative"
                >
                  <Bell size={24} />
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
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

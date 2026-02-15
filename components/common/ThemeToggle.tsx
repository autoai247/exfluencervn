'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type Theme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'dropdown';
  showLabel?: boolean;
  language?: 'ko' | 'vi';
}

export default function ThemeToggle({
  variant = 'icon',
  showLabel = false,
  language = 'ko',
}: ThemeToggleProps) {
  const { theme, effectiveTheme, toggleTheme, setTheme, mounted } = useTheme();

  const text = {
    ko: {
      light: '라이트 모드',
      dark: '다크 모드',
      auto: '시스템 설정',
      theme: '테마',
    },
    vi: {
      light: 'Sáng',
      dark: 'Tối',
      auto: 'Tự động',
      theme: 'Giao diện',
    },
  };

  const t = text[language];

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-dark-600 animate-pulse" />
    );
  }

  const themeConfig = {
    light: {
      icon: Sun,
      label: t.light,
      color: 'text-accent',
      bg: 'bg-accent/20',
    },
    dark: {
      icon: Moon,
      label: t.dark,
      color: 'text-secondary',
      bg: 'bg-secondary/20',
    },
    auto: {
      icon: Monitor,
      label: t.auto,
      color: 'text-primary',
      bg: 'bg-primary/20',
    },
  };

  const currentTheme = themeConfig[theme];
  const CurrentIcon = currentTheme.icon;

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-lg bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white transition-all"
        title={currentTheme.label}
      >
        <CurrentIcon size={20} className={currentTheme.color} />
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`px-4 py-2.5 rounded-lg ${currentTheme.bg} border border-dark-500 hover:border-dark-400 transition-all flex items-center gap-2`}
      >
        <CurrentIcon size={18} className={currentTheme.color} />
        {showLabel && (
          <span className="text-sm font-medium text-gray-300">
            {currentTheme.label}
          </span>
        )}
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <button
          className="p-2.5 rounded-lg bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white transition-all"
          title={t.theme}
        >
          <CurrentIcon size={20} className={currentTheme.color} />
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-48 bg-dark-600 rounded-xl border border-dark-500 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 font-semibold">
              {t.theme}
            </div>

            {(['light', 'dark', 'auto'] as Theme[]).map((themeOption) => {
              const config = themeConfig[themeOption];
              const Icon = config.icon;
              const isActive = theme === themeOption;

              return (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? `${config.bg} text-white`
                      : 'text-gray-300 hover:bg-dark-500'
                  }`}
                >
                  <Icon size={18} className={isActive ? config.color : 'text-gray-400'} />
                  <span className="text-sm">{config.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-current" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

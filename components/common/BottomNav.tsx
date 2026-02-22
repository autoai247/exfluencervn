'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, LayoutGrid, BarChart3, BookOpen, Trophy, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserType } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BottomNavProps {
  userType: UserType;
}

export default function BottomNav({ userType }: BottomNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = userType === 'influencer'
    ? [
        { href: '/main/influencer', icon: Home, label: t.nav.home },
        { href: '/main/influencer/campaigns', icon: Briefcase, label: t.nav.campaigns },
        { href: '/main/influencer/shop', icon: BookOpen, label: t.nav.shop },
        { href: '/main/influencer/ranking', icon: Trophy, label: t.nav.ranking },
        { href: '/main/influencer/analytics', icon: BarChart3, label: t.nav.analytics },
        { href: '/main/influencer/profile', icon: User, label: t.nav.profile },
      ]
    : [
        { href: '/main/advertiser', icon: Home, label: t.nav.home },
        { href: '/main/advertiser/campaigns', icon: LayoutGrid, label: t.nav.campaigns },
        { href: '/main/advertiser/shop', icon: BookOpen, label: t.nav.shop },
        { href: '/main/advertiser/influencers', icon: Search, label: t.nav.kol },
        { href: '/main/advertiser/analytics', icon: BarChart3, label: t.nav.analytics },
        { href: '/main/advertiser/profile', icon: User, label: t.nav.profile },
      ];

  return (
    <nav className="bottom-nav relative" role="navigation" aria-label="Main navigation">
      {/* 상단 페이드 그라디언트 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all duration-300 active:scale-90',
                isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* 활성 인디케이터 점 */}
              {isActive ? (
                <div className="w-1 h-1 rounded-full bg-gradient-to-r from-primary to-secondary mb-0.5" />
              ) : (
                <div className="w-1 h-1 mb-0.5 opacity-0" />
              )}

              {/* 아이콘 */}
              {isActive ? (
                <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/25 shadow-sm">
                  <Icon size={22} strokeWidth={2.5} aria-hidden="true" />
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center">
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </div>
              )}

              {/* 레이블 */}
              <span className={cn(
                'text-[10px]',
                isActive ? 'font-bold text-primary' : 'font-medium text-gray-500'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

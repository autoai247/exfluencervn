'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageCircle, User, LayoutGrid, BarChart3, ShoppingBag, Trophy, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserType } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BottomNavProps {
  userType: UserType;
}

export default function BottomNav({ userType }: BottomNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Different nav items for influencer vs advertiser
  // 인플루언서용: 6개 메뉴 - 홈, 캠페인, 상점(후킹!), 랭킹, 통계, MY
  const navItems = userType === 'influencer'
    ? [
        { href: '/main/influencer', icon: Home, label: t.nav.home },
        { href: '/main/influencer/campaigns', icon: Briefcase, label: t.nav.campaigns },
        { href: '/main/influencer/shop', icon: ShoppingBag, label: t.nav.shop, highlight: true },
        { href: '/main/influencer/ranking', icon: Trophy, label: t.nav.ranking },
        { href: '/main/influencer/analytics', icon: BarChart3, label: t.nav.analytics },
        { href: '/main/influencer/profile', icon: User, label: t.nav.profile },
      ]
    : [
        { href: '/main/advertiser', icon: Home, label: t.nav.home },
        { href: '/main/advertiser/campaigns', icon: LayoutGrid, label: t.nav.campaigns },
        { href: '/main/advertiser/shop', icon: ShoppingBag, label: t.nav.shop, highlight: true },
        { href: '/main/advertiser/influencers', icon: Search, label: t.nav.kol },
        { href: '/main/advertiser/analytics', icon: BarChart3, label: t.nav.analytics },
        { href: '/main/advertiser/profile', icon: User, label: t.nav.profile },
      ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const isHighlight = 'highlight' in item && item.highlight;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'bottom-nav-item relative',
                isActive && 'bottom-nav-item-active'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* 상점 강조 뱃지 */}
              {isHighlight && !isActive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" aria-hidden="true" />
              )}
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={isHighlight && !isActive ? 'text-warning' : ''}
                aria-hidden="true"
              />
              <span className={cn(
                "text-[10px] font-medium",
                isHighlight && !isActive && "text-warning font-bold"
              )}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

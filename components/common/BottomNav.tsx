'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageCircle, User, LayoutGrid, BarChart3, BookOpen, Trophy, Briefcase } from 'lucide-react';
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
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'bottom-nav-item',
                isActive && 'bottom-nav-item-active'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

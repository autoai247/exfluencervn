'use client';

import { Suspense } from 'react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import AnalyticsClient from './AnalyticsClient';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdvertiserAnalyticsPage() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title={language === 'ko' ? '분석 대시보드' : 'Bảng phân tích'} showBack />

      <Suspense fallback={
        <div className="container-mobile py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      }>
        <AnalyticsClient />
      </Suspense>

      <BottomNav userType="advertiser" />
    </div>
  );
}

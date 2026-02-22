'use client';

import { Suspense } from 'react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { ListSkeleton } from '@/components/common/Skeleton';
import CampaignsClient from './CampaignsClient';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdvertiserCampaignsPage() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? '캠페인 관리' : 'Quản lý chiến dịch'} showBack />

      <Suspense fallback={
        <div className="container-mobile py-6">
          <ListSkeleton count={5} type="campaign" />
        </div>
      }>
        <CampaignsClient />
      </Suspense>

      <BottomNav userType="advertiser" />
    </div>
  );
}

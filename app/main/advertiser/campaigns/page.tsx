import { Suspense } from 'react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import CampaignsClient from './CampaignsClient';

export default function AdvertiserCampaignsPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title="캠페인 관리" showBack />

      <Suspense fallback={
        <div className="container-mobile py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      }>
        <CampaignsClient />
      </Suspense>

      <BottomNav userType="advertiser" />
    </div>
  );
}

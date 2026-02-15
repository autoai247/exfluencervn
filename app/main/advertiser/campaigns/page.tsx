import { Suspense } from 'react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { ListSkeleton } from '@/components/common/Skeleton';
import CampaignsClient from './CampaignsClient';

export default function AdvertiserCampaignsPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title="캠페인 관리" showBack />

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

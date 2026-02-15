'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calendar, DollarSign, ShoppingBag, Star, MapPin, Download, ExternalLink } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockCompletedCampaigns, type MockCompletedCampaign } from '@/lib/mockData';

type TabType = 'all' | 'cash' | 'points';

export default function CompletedCampaignsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const campaigns = getMockCompletedCampaigns(language);

  const handleDownloadReceipt = (campaign: MockCompletedCampaign) => {
    const campaignLabel = language === 'ko' ? '캠페인명' : 'Tên chiến dịch';
    const statusText = language === 'ko' ? '지급 완료' : 'Đã thanh toán';
    const statusLabel = language === 'ko' ? '상태' : 'Trạng thái';
    const noteText = language === 'ko'
      ? '※ 실제 운영 시 PDF 파일로 다운로드됩니다.'
      : '※ Trong vận hành thực tế sẽ tải xuống file PDF.';

    alert(`📄 ${campaign.title}\n\n${t.completed.downloadReceipt}\n\n- ${campaignLabel}: ${campaign.title}\n- ${t.completed.earned}: ${formatCash(campaign.reward)}\n- ${t.completed.completedOn}: ${campaign.completedDate}\n- ${statusLabel}: ${statusText}\n\n${noteText}`);
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === 'all') return true;
    if (activeTab === 'cash') return c.type === 'cash';
    if (activeTab === 'points') return c.type === 'points';
    return true;
  });

  const totalCashEarned = campaigns
    .filter(c => c.type === 'cash' && c.status === 'paid')
    .reduce((sum, c) => sum + c.reward, 0);

  const totalPointsEarned = campaigns
    .filter(c => c.type === 'points' && c.status === 'paid')
    .reduce((sum, c) => sum + c.reward, 0);

  const pendingPayment = campaigns
    .filter(c => c.type === 'cash' && c.status === 'pending_payment')
    .reduce((sum, c) => sum + c.reward, 0);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.completed.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-green-400" />
              <span className="text-xs text-gray-300">{t.wallet.cashPoints}</span>
            </div>
            <div className="text-xl font-bold text-green-400">{formatCash(totalCashEarned)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.wallet.completed}</div>
            {pendingPayment > 0 && (
              <div className="text-xs text-yellow-500 mt-1">
                {t.wallet.pending}: {formatCash(pendingPayment)}
              </div>
            )}
          </div>

          <div className="card bg-gradient-to-br from-blue-500/20 to-purple-600/10 border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-blue-400" />
              <span className="text-xs text-gray-300">{t.wallet.shoppingPoints}</span>
            </div>
            <div className="text-xl font-bold text-blue-400">{formatShoppingPoints(totalPointsEarned)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.wallet.completed}</div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {t.common.all} ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('cash')}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'cash'
                ? 'bg-green-500 text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            💰 {t.wallet.cashPoints} ({campaigns.filter(c => c.type === 'cash').length})
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'points'
                ? 'bg-blue-500 text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            🛍️ {t.wallet.shoppingPoints} ({campaigns.filter(c => c.type === 'points').length})
          </button>
        </div>

        {/* 캠페인 리스트 */}
        <div className="space-y-3">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="card">
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={campaign.thumbnail}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-1 left-1 px-2 py-0.5 text-white text-[10px] rounded-full font-bold ${
                    campaign.type === 'cash' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {campaign.type === 'cash' ? t.wallet.cashPoints : t.wallet.shoppingPoints}
                  </div>
                  {campaign.status === 'paid' && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">{campaign.company}</p>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{campaign.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} />
                      <span>{campaign.location}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className={`font-bold text-sm ${
                        campaign.type === 'cash' ? 'text-green-400' : 'text-blue-400'
                      }`}>
                        {campaign.type === 'cash'
                          ? formatCash(campaign.reward)
                          : formatShoppingPoints(campaign.reward)
                        }
                      </span>
                      {campaign.status === 'pending_payment' && (
                        <div className="text-[10px] text-yellow-500 font-semibold mt-0.5">
                          ⏱️ {t.wallet.pending}
                        </div>
                      )}
                    </div>

                    {campaign.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-yellow-400">{campaign.rating}.0</span>
                      </div>
                    )}
                  </div>

                  {/* 리뷰 텍스트 */}
                  {campaign.reviewText && (
                    <div className="mt-2 p-2 bg-dark-600 rounded-lg">
                      <p className="text-xs text-gray-300 italic">"{campaign.reviewText}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-dark-600">
                <Link href={`/main/influencer/campaigns/${campaign.id}`} className="flex-1">
                  <button className="w-full btn btn-ghost text-sm py-2">
                    <ExternalLink size={14} className="mr-1" />
                    {t.completed.viewDetails}
                  </button>
                </Link>
                {campaign.type === 'cash' && campaign.status === 'paid' && (
                  <button
                    onClick={() => handleDownloadReceipt(campaign)}
                    className="flex-1 btn btn-primary text-sm py-2"
                  >
                    <Download size={14} className="mr-1" />
                    {t.completed.downloadReceipt}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="card text-center py-12">
            <CheckCircle size={48} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.completed.noCampaigns}</h3>
            <p className="text-sm text-gray-400 mb-4 whitespace-pre-line">
              {t.completed.emptyDescription}
            </p>
            <Link href="/main/influencer/campaigns">
              <button className="btn btn-primary">
                {t.dashboard.findCampaigns}
              </button>
            </Link>
          </div>
        )}

        {/* 안내 */}
        <div className="card bg-info/10 border-info/30">
          <h4 className="font-semibold text-white mb-2 text-sm">{t.completed.infoTitle}</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• {t.completed.infoCash}</li>
            <li>• {t.completed.infoPoints}</li>
            <li>• {t.completed.infoRating}</li>
            <li>• {t.completed.infoReceipt}</li>
          </ul>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

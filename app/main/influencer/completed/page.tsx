'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calendar, DollarSign, ShoppingBag, Star, MapPin, Download, ExternalLink } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type CampaignType = 'cash' | 'points';
type TabType = 'all' | 'cash' | 'points';

interface CompletedCampaign {
  id: string;
  title: string;
  company: string;
  thumbnail: string;
  type: CampaignType;
  reward: number;
  completedDate: string;
  rating?: number;
  reviewText?: string;
  location: string;
  platform: string;
  status: 'paid' | 'pending_payment';
}

// Mock data
const mockCompletedCampaigns: CompletedCampaign[] = [
  {
    id: '1',
    title: '신규 스킨케어 제품 리뷰 캠페인',
    company: 'K-Beauty Co.',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 500000,
    completedDate: '2024-02-10',
    rating: 5,
    reviewText: '매우 만족스러운 협업이었습니다!',
    location: '서울, 한국',
    platform: 'Instagram',
    status: 'paid',
  },
  {
    id: '2',
    title: '베트남 레스토랑 체험 리뷰',
    company: 'Pho House Vietnam',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 300000,
    completedDate: '2024-02-08',
    rating: 4,
    location: '호치민, 베트남',
    platform: 'TikTok',
    status: 'paid',
  },
  {
    id: '3',
    title: '스마트폰 언박싱 & 리뷰',
    company: 'Tech World',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 800000,
    completedDate: '2024-02-05',
    rating: 5,
    location: '서울, 한국',
    platform: 'YouTube',
    status: 'pending_payment',
  },
  {
    id: '4',
    title: '출석 체크 보너스 - 7일 연속 달성',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    type: 'points',
    reward: 10000,
    completedDate: '2024-02-12',
    location: '온라인',
    platform: 'Platform',
    status: 'paid',
  },
  {
    id: '5',
    title: 'SNS 공유 이벤트',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    type: 'points',
    reward: 5000,
    completedDate: '2024-02-11',
    location: '온라인',
    platform: 'Multi-platform',
    status: 'paid',
  },
  {
    id: '6',
    title: '친구 추천 보너스',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    type: 'points',
    reward: 30000,
    completedDate: '2024-02-09',
    location: '온라인',
    platform: 'Platform',
    status: 'paid',
  },
];

export default function CompletedCampaignsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [campaigns] = useState(mockCompletedCampaigns);

  // 증빙서류 다운로드
  const handleDownloadReceipt = (campaign: CompletedCampaign) => {
    // TODO: 실제로는 서버에서 PDF 생성하여 다운로드
    alert(`📄 ${campaign.title}\n\n증빙서류를 다운로드합니다.\n\n- 캠페인명: ${campaign.title}\n- 수익: ${formatCash(campaign.reward)}\n- 완료일: ${campaign.completedDate}\n- 상태: 지급 완료\n\n※ 실제 운영 시 PDF 파일로 다운로드됩니다.`);
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
                    증빙서류
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
            <p className="text-sm text-gray-400 mb-4">
              캠페인을 완료하고<br />
              수익을 확인하세요
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
          <h4 className="font-semibold text-white mb-2 text-sm">💡 완료 캠페인 안내</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• 현금 수익: 캠페인 완료 후 2-5일 내 지급</li>
            <li>• 쇼핑 포인트: 즉시 적립 (상점에서 사용 가능)</li>
            <li>• 평점 & 리뷰: 광고주 만족도 평가</li>
            <li>• 증빙서류: 세금 신고 시 활용 가능</li>
          </ul>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

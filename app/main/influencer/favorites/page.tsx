'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, Calendar, DollarSign, ShoppingBag, X } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data
const mockFavoriteCampaigns = [
  {
    id: '1',
    title: '신규 스킨케어 제품 리뷰 캠페인',
    company: 'K-Beauty Co.',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    budget: 500000,
    budgetType: 'cash' as const, // 현금 수익
    location: '서울, 한국',
    deadline: '2024-03-15',
    status: 'active' as const,
  },
  {
    id: '2',
    title: '베트남 레스토랑 체험 리뷰',
    company: 'Pho House Vietnam',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    budget: 300000,
    budgetType: 'cash' as const,
    location: '호치민, 베트남',
    deadline: '2024-03-20',
    status: 'active' as const,
  },
  {
    id: '3',
    title: '포인트 적립 이벤트 - SNS 공유하고 포인트 받기',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    budget: 50000,
    budgetType: 'points' as const, // 쇼핑 포인트 보상
    location: '온라인',
    deadline: '2024-04-01',
    status: 'active' as const,
  },
  {
    id: '4',
    title: '출석 체크 챌린지 - 30일 연속 달성',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    budget: 100000,
    budgetType: 'points' as const,
    location: '온라인',
    deadline: '2024-03-30',
    status: 'active' as const,
  },
];

export default function FavoritesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState(mockFavoriteCampaigns);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(c => c.id !== id));
  };

  const cashCampaigns = favorites.filter(c => c.budgetType === 'cash');
  const pointsCampaigns = favorites.filter(c => c.budgetType === 'points');

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.favorites.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-green-400" />
              <span className="text-sm text-gray-300">{t.wallet.cashPoints}</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{cashCampaigns.length}{t.favorites.items}</div>
            <div className="text-xs text-gray-400 mt-1">{t.dashboard.withdrawable}</div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500/20 to-purple-600/10 border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-blue-400" />
              <span className="text-sm text-gray-300">{t.wallet.shoppingPoints}</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{pointsCampaigns.length}{t.favorites.items}</div>
            <div className="text-xs text-gray-400 mt-1">{t.dashboard.useInShop}</div>
          </div>
        </div>

        {/* 현금 캠페인 섹션 */}
        {cashCampaigns.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <DollarSign size={20} className="text-green-400" />
              <h3 className="text-sm font-semibold text-gray-300">{t.favorites.cashCampaigns}</h3>
              <span className="text-xs text-gray-500">({cashCampaigns.length})</span>
            </div>

            {cashCampaigns.map((campaign) => (
              <div key={campaign.id} className="card relative">
                {/* 제거 버튼 */}
                <button
                  onClick={() => removeFavorite(campaign.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-dark-600 hover:bg-dark-500 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X size={16} className="text-gray-400" />
                </button>

                <Link href={`/main/influencer/campaigns/${campaign.id}`}>
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-bold">
                        {t.wallet.cashPoints}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{campaign.company}</p>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin size={12} />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={12} />
                          <span>~{campaign.deadline}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-green-400 font-bold text-sm">
                          {formatCash(campaign.budget)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 포인트 캠페인 섹션 */}
        {pointsCampaigns.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <ShoppingBag size={20} className="text-blue-400" />
              <h3 className="text-sm font-semibold text-gray-300">{t.favorites.pointsCampaigns}</h3>
              <span className="text-xs text-gray-500">({pointsCampaigns.length})</span>
            </div>

            {pointsCampaigns.map((campaign) => (
              <div key={campaign.id} className="card relative">
                {/* 제거 버튼 */}
                <button
                  onClick={() => removeFavorite(campaign.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-dark-600 hover:bg-dark-500 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X size={16} className="text-gray-400" />
                </button>

                <Link href={`/main/influencer/campaigns/${campaign.id}`}>
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded-full font-bold">
                        {t.wallet.shoppingPoints}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{campaign.company}</p>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin size={12} />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={12} />
                          <span>~{campaign.deadline}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-blue-400 font-bold text-sm">
                          {formatShoppingPoints(campaign.budget)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="card text-center py-12">
            <Heart size={48} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.favorites.noCampaigns}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t.favorites.emptyMessage}
            </p>
            <Link href="/main/influencer/campaigns">
              <button className="btn btn-primary">
                {t.favorites.browseCampaigns}
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

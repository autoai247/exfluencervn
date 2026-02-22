'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, Calendar, DollarSign, ShoppingBag, X } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

type FavoriteCampaign = {
  id: string;
  title: string;
  company: string;
  thumbnail: string;
  budget: number;
  budgetType: 'cash' | 'points';
  location: string;
  deadline: string;
  status: 'active' | 'closed';
};

export default function FavoritesPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = useState<FavoriteCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // 비로그인: localStorage에서 즐겨찾기 campaign ID 읽어서 조회
          const savedIds: string[] = JSON.parse(localStorage.getItem('campaign_favorites') || '[]');
          if (savedIds.length === 0) {
            setFavorites([]);
            return;
          }
          const { data, error } = await supabase
            .from('campaigns')
            .select(`
              id,
              title,
              thumbnail,
              budget,
              type,
              location,
              deadline,
              status,
              advertiser_profiles (company_name)
            `)
            .in('id', savedIds);

          if (!error && data) {
            const formatted: FavoriteCampaign[] = data.map((c: any) => ({
              id: c.id,
              title: c.title || '',
              company: c.advertiser_profiles?.company_name || '',
              thumbnail: c.thumbnail || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
              budget: c.budget || 0,
              budgetType: c.type === 'points' ? 'points' : 'cash',
              location: c.location || '',
              deadline: c.deadline || '',
              status: c.status === 'active' ? 'active' : 'closed',
            }));
            setFavorites(formatted);
          }
          return;
        }

        // 로그인 사용자: favorites 테이블 또는 localStorage ID로 조회
        const savedIds: string[] = JSON.parse(localStorage.getItem('campaign_favorites') || '[]');

        // DB favorites 테이블 시도
        const { data: favData, error: favError } = await supabase
          .from('favorites')
          .select(`
            campaign_id,
            campaigns (
              id,
              title,
              thumbnail,
              budget,
              type,
              location,
              deadline,
              status,
              advertiser_profiles (company_name)
            )
          `)
          .eq('user_id', user.id);

        if (!favError && favData && favData.length > 0) {
          const formatted: FavoriteCampaign[] = favData
            .filter((f: any) => f.campaigns)
            .map((f: any) => ({
              id: f.campaigns.id,
              title: f.campaigns.title || '',
              company: f.campaigns.advertiser_profiles?.company_name || '',
              thumbnail: f.campaigns.thumbnail || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
              budget: f.campaigns.budget || 0,
              budgetType: f.campaigns.type === 'points' ? 'points' : 'cash',
              location: f.campaigns.location || '',
              deadline: f.campaigns.deadline || '',
              status: f.campaigns.status === 'active' ? 'active' : 'closed',
            }));
          setFavorites(formatted);
        } else if (savedIds.length > 0) {
          // favorites 테이블이 없거나 비어있으면 localStorage 기반 조회
          const { data, error } = await supabase
            .from('campaigns')
            .select(`
              id,
              title,
              thumbnail,
              budget,
              type,
              location,
              deadline,
              status,
              advertiser_profiles (company_name)
            `)
            .in('id', savedIds);

          if (!error && data) {
            const formatted: FavoriteCampaign[] = data.map((c: any) => ({
              id: c.id,
              title: c.title || '',
              company: c.advertiser_profiles?.company_name || '',
              thumbnail: c.thumbnail || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
              budget: c.budget || 0,
              budgetType: c.type === 'points' ? 'points' : 'cash',
              location: c.location || '',
              deadline: c.deadline || '',
              status: c.status === 'active' ? 'active' : 'closed',
            }));
            setFavorites(formatted);
          } else {
            setFavorites([]);
          }
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error('즐겨찾기 fetch 실패:', err);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    // localStorage에서 제거
    const savedIds: string[] = JSON.parse(localStorage.getItem('campaign_favorites') || '[]');
    const newIds = savedIds.filter((sid) => sid !== id);
    localStorage.setItem('campaign_favorites', JSON.stringify(newIds));

    // DB에서도 제거 시도
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('campaign_id', id);
      }
    } catch (err) {
      console.error('즐겨찾기 삭제 오류:', err);
    }

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
          <div className="bg-gradient-to-br from-success/15 to-dark-700 border border-success/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-success" />
              <span className="text-sm text-gray-300">{t.wallet.cashPoints}</span>
            </div>
            <div className="text-2xl font-bold text-success">{cashCampaigns.length}{t.favorites.items}</div>
            <div className="text-xs text-gray-400 mt-1">{t.dashboard.withdrawable}</div>
          </div>

          <div className="bg-gradient-to-br from-secondary/15 to-dark-700 border border-secondary/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-secondary" />
              <span className="text-sm text-gray-300">{t.wallet.shoppingPoints}</span>
            </div>
            <div className="text-2xl font-bold text-secondary">{pointsCampaigns.length}{t.favorites.items}</div>
            <div className="text-xs text-gray-400 mt-1">{t.dashboard.useInShop}</div>
          </div>
        </div>

        {/* 로딩 스켈레톤 */}
        {isLoading && (
          <div className="flex gap-3 overflow-x-hidden">
            {[1, 2].map((i) => (
              <div key={i} className="flex-shrink-0 w-[260px] animate-pulse bg-dark-600/80 border border-dark-400/40 rounded-2xl p-4">
                <div className="w-full h-32 rounded-xl bg-dark-500 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-dark-500 rounded w-3/4" />
                  <div className="h-3 bg-dark-500 rounded w-1/2" />
                  <div className="h-3 bg-dark-500 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 현금 캠페인 섹션 */}
        {!isLoading && cashCampaigns.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-success to-success/50 rounded-full" />
                <h3 className="text-base font-semibold text-white">{t.favorites.cashCampaigns}</h3>
                <span className="text-xs text-gray-500">({cashCampaigns.length})</span>
              </div>
              <span className="text-[10px] text-gray-500">
                {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
              </span>
            </div>

            <div
              className="flex gap-3 overflow-x-auto pl-0 pr-4 pb-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cashCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex-shrink-0 w-[260px] bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl relative">
                  {/* 제거 버튼 */}
                  <button
                    onClick={() => removeFavorite(campaign.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-dark-700/80 hover:bg-dark-500 border border-dark-400/40 rounded-full flex items-center justify-center transition-colors z-10"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>

                  <Link href={`/main/influencer/campaigns/${campaign.id}`}>
                    {/* Thumbnail */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 px-2 py-0.5 bg-gradient-to-r from-success to-success/80 text-white text-[10px] rounded-full font-bold">
                        {t.wallet.cashPoints}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2 pr-8">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{campaign.company}</p>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin size={12} />
                          <span className="truncate">{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={12} />
                          <span>~{campaign.deadline}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-success font-bold text-sm">
                          {formatCash(campaign.budget)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 포인트 캠페인 섹션 */}
        {!isLoading && pointsCampaigns.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-secondary to-primary rounded-full" />
                <h3 className="text-base font-semibold text-white">{t.favorites.pointsCampaigns}</h3>
                <span className="text-xs text-gray-500">({pointsCampaigns.length})</span>
              </div>
              <span className="text-[10px] text-gray-500">
                {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
              </span>
            </div>

            <div
              className="flex gap-3 overflow-x-auto pl-0 pr-4 pb-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {pointsCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex-shrink-0 w-[260px] bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl relative">
                  {/* 제거 버튼 */}
                  <button
                    onClick={() => removeFavorite(campaign.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-dark-700/80 hover:bg-dark-500 border border-dark-400/40 rounded-full flex items-center justify-center transition-colors z-10"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>

                  <Link href={`/main/influencer/campaigns/${campaign.id}`}>
                    {/* Thumbnail */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 left-1 px-2 py-0.5 bg-gradient-to-r from-secondary to-primary text-white text-[10px] rounded-full font-bold">
                        {t.wallet.shoppingPoints}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2 pr-8">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{campaign.company}</p>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin size={12} />
                          <span className="truncate">{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={12} />
                          <span>~{campaign.deadline}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-secondary font-bold text-sm">
                          {formatShoppingPoints(campaign.budget)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && favorites.length === 0 && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl text-center py-12">
            <Heart size={48} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.favorites.noCampaigns}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t.favorites.emptyMessage}
            </p>
            <Link href="/main/influencer/campaigns">
              <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold py-4 px-6 shadow-lg shadow-primary/20">
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

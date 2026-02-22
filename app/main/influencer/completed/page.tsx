'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calendar, DollarSign, ShoppingBag, Star, MapPin, Download, ExternalLink } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

type MockCompletedCampaign = {
  id: string;
  title: string;
  company: string;
  thumbnail: string;
  reward: number;
  type: 'cash' | 'points';
  status: 'paid' | 'pending_payment';
  completedDate: string;
  location: string;
  rating?: number;
  reviewText?: string;
};

type TabType = 'all' | 'cash' | 'points';

export default function CompletedCampaignsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [campaigns, setCampaigns] = useState<MockCompletedCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setCampaigns([]);
          return;
        }

        const { data, error } = await supabase
          .from('campaign_participants')
          .select(`
            id,
            status,
            completed_at,
            reward_amount,
            reward_type,
            payment_status,
            rating,
            review_text,
            campaigns (
              id,
              title,
              thumbnail,
              location,
              advertiser_profiles (
                company_name
              )
            )
          `)
          .eq('influencer_id', user.id)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false });

        if (error) {
          console.error('완료 캠페인 로딩 오류:', error);
          setCampaigns([]);
        } else {
          const formatted: MockCompletedCampaign[] = (data || []).map((p: any) => ({
            id: p.id,
            title: p.campaigns?.title || '',
            company: p.campaigns?.advertiser_profiles?.company_name || '',
            thumbnail: p.campaigns?.thumbnail
              || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
            reward: p.reward_amount || 0,
            type: (p.reward_type === 'points' ? 'points' : 'cash') as 'cash' | 'points',
            status: (p.payment_status === 'paid' ? 'paid' : 'pending_payment') as 'paid' | 'pending_payment',
            completedDate: p.completed_at
              ? new Date(p.completed_at).toLocaleDateString('ko-KR')
              : '',
            location: p.campaigns?.location || '',
            rating: p.rating,
            reviewText: p.review_text,
          }));
          setCampaigns(formatted);
        }
      } catch (err) {
        console.error('완료 캠페인 fetch 실패:', err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  const handleDownloadReceipt = (campaign: MockCompletedCampaign) => {
    alert(`📄 ${campaign.title}\n\n${t.completed.downloadReceipt}\n\n- ${t.completed.receiptContent.campaignName}: ${campaign.title}\n- ${t.completed.earned}: ${formatCash(campaign.reward)}\n- ${t.completed.completedOn}: ${campaign.completedDate}\n- ${t.completed.receiptContent.status}: ${t.completed.receiptContent.statusPaid}\n\n${t.completed.receiptContent.note}`);
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
          <div className="bg-gradient-to-br from-success/15 to-dark-700 border border-success/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-success" />
              <span className="text-xs text-gray-300">{t.wallet.cashPoints}</span>
            </div>
            <div className="text-xl font-bold text-success">{formatCash(totalCashEarned)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.wallet.completed}</div>
            {pendingPayment > 0 && (
              <div className="text-xs text-accent mt-1">
                {t.wallet.pending}: {formatCash(pendingPayment)}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-secondary/15 to-dark-700 border border-secondary/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-secondary" />
              <span className="text-xs text-gray-300">{t.wallet.shoppingPoints}</span>
            </div>
            <div className="text-xl font-bold text-secondary">{formatShoppingPoints(totalPointsEarned)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.wallet.completed}</div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            {t.common.all} ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('cash')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'cash'
                ? 'bg-gradient-to-r from-success to-success/80 text-white shadow-md shadow-success/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            💰 {t.wallet.cashPoints} ({campaigns.filter(c => c.type === 'cash').length})
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'points'
                ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-md shadow-secondary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            🛍️ {t.wallet.shoppingPoints} ({campaigns.filter(c => c.type === 'points').length})
          </button>
        </div>

        {/* 로딩 스켈레톤 */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-dark-600/80 border border-dark-400/40 rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="w-24 h-24 rounded-xl bg-dark-500 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-dark-500 rounded w-3/4" />
                    <div className="h-3 bg-dark-500 rounded w-1/2" />
                    <div className="h-3 bg-dark-500 rounded w-1/3" />
                    <div className="h-5 bg-dark-500 rounded w-1/4 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 캠페인 리스트 */}
        {!isLoading && <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
              <Link href={`/main/influencer/campaigns/${campaign.id}`} className="block">
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={campaign.thumbnail}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-1 left-1 px-2 py-0.5 text-white text-[10px] rounded-full font-bold ${
                    campaign.type === 'cash'
                      ? 'bg-gradient-to-r from-success to-success/80'
                      : 'bg-gradient-to-r from-secondary to-primary'
                  }`}>
                    {campaign.type === 'cash' ? t.wallet.cashPoints : t.wallet.shoppingPoints}
                  </div>
                  {campaign.status === 'paid' && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center shadow-md">
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
                        campaign.type === 'cash' ? 'text-success' : 'text-secondary'
                      }`}>
                        {campaign.type === 'cash'
                          ? formatCash(campaign.reward)
                          : formatShoppingPoints(campaign.reward)
                        }
                      </span>
                      {campaign.status === 'pending_payment' && (
                        <div className="text-[10px] text-accent font-semibold mt-0.5">
                          ⏱️ {t.wallet.pending}
                        </div>
                      )}
                    </div>

                    {campaign.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-accent fill-accent" />
                        <span className="text-xs font-bold text-accent">{campaign.rating}.0</span>
                      </div>
                    )}
                  </div>

                  {/* 리뷰 텍스트 */}
                  {campaign.reviewText && (
                    <div className="mt-2 p-2 bg-dark-700/60 border border-dark-400/30 rounded-xl">
                      <p className="text-xs text-gray-300 italic">"{campaign.reviewText}"</p>
                    </div>
                  )}
                </div>
              </div>
              </Link>

              {/* 액션 버튼 */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-dark-500/50">
                <Link href={`/main/influencer/campaigns/${campaign.id}`} className="flex-1">
                  <button className="w-full bg-dark-700/60 border border-dark-400/40 text-gray-300 hover:text-white rounded-xl text-sm py-2 flex items-center justify-center gap-1 transition-colors">
                    <ExternalLink size={14} />
                    {t.completed.viewDetails}
                  </button>
                </Link>
                {campaign.type === 'cash' && campaign.status === 'paid' && (
                  <button
                    onClick={() => handleDownloadReceipt(campaign)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm py-2 font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-1"
                  >
                    <Download size={14} />
                    {t.completed.downloadReceipt}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>}

        {/* Empty State */}
        {!isLoading && filteredCampaigns.length === 0 && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-8 shadow-xl text-center py-12">
            <CheckCircle size={48} className="text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{t.completed.noCampaigns}</h3>
            <p className="text-sm text-gray-400 mb-4 whitespace-pre-line">
              {t.completed.emptyDescription}
            </p>
            <Link href="/main/influencer/campaigns">
              <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold py-4 px-6 shadow-lg shadow-primary/20">
                {t.dashboard.findCampaigns}
              </button>
            </Link>
          </div>
        )}

        {/* 안내 */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h4 className="font-semibold text-white text-sm">{t.completed.infoTitle}</h4>
          </div>
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

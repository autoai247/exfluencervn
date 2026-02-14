'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Star,
  ChevronRight,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  ShoppingCart,
  Gift,
  Building2,
  Plane,
  Ticket,
  TrendingDown,
  BadgeDollarSign,
  Trophy,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import OnboardingTutorial from '@/components/onboarding/OnboardingTutorial';
import { formatPoints, formatCash, formatShoppingPoints, formatCompactNumber } from '@/lib/points';
import { formatTimeAgo } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockCompletedCampaigns, getMockUserProfile } from '@/lib/mockData';

// Mock data - replace with real API
// COMMENTED OUT: Hardcoded Korean data replaced with translated mock data
// const mockData = {
//   user: {
//     name: '김민수',
//     avatar: 'https://ui-avatars.com/api/?name=Kim+Minsu&background=FF6B6B&color=fff',
//     followers: 125000,
//     avgEngagement: 0.0567,
//   },
//   cash: {
//     available: 2500000, // 캠페인 수익 - 출금 가능
//     locked: 500000,     // 진행 중인 캠페인 수익
//     total: 3000000,
//   },
//   shoppingPoints: {
//     available: 150000,  // 쇼핑 포인트 - 상점에서만 사용
//     total: 150000,
//   },
//   stats: {
//     totalCashEarnings: 15000000, // 총 현금 수익 (캠페인)
//     totalShoppingPoints: 200000,  // 총 쇼핑 포인트 획득
//     completedCampaigns: 6,  // 완료한 캠페인 (completed page와 일치)
//     inProgressCampaigns: 3,
//     pendingApplications: 5,
//   },
//   recentCampaigns: [
//     {
//       id: '1',
//       title: '신규 스킨케어 제품 광고',
//       company: 'Beauty Brand',
//       budget: 500000,
//       status: 'in_progress',
//       deadline: '2026-03-15',
//       thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
//     },
//     {
//       id: '2',
//       title: '고급 레스토랑 리뷰',
//       company: 'Food Paradise',
//       budget: 300000,
//       status: 'pending',
//       deadline: '2026-03-20',
//       thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
//     },
//     {
//       id: '3',
//       title: '플래그십 스마트폰 언박싱',
//       company: 'Tech Store',
//       budget: 800000,
//       status: 'completed',
//       deadline: '2026-02-28',
//       thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
//     },
//   ],
// };

// Static data that doesn't change with language
const mockData = {
  cash: {
    available: 2500000, // 캠페인 수익 - 출금 가능
    locked: 500000,     // 진행 중인 캠페인 수익
    total: 3000000,
  },
  shoppingPoints: {
    available: 150000,  // 쇼핑 포인트 - 상점에서만 사용
    total: 150000,
  },
  stats: {
    totalCashEarnings: 15000000, // 총 현금 수익 (캠페인)
    totalShoppingPoints: 200000,  // 총 쇼핑 포인트 획득
    completedCampaigns: 4,  // 완료한 캠페인 (completed page와 일치) - updated to match mockData.ts
    inProgressCampaigns: 3,
    pendingApplications: 5,
  },
};

export default function InfluencerDashboard() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns'>('overview');
  const [totalShareEarnings, setTotalShareEarnings] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [myRaffleTickets, setMyRaffleTickets] = useState(0);

  // Get translated mock data
  const completedCampaigns = getMockCompletedCampaigns(language);
  const userProfile = getMockUserProfile(language);

  // Use the first 3 completed campaigns as recent campaigns
  const recentCampaigns = completedCampaigns.slice(0, 3).map(campaign => ({
    id: campaign.id,
    title: campaign.title,
    company: campaign.company,
    budget: campaign.reward,
    status: campaign.status === 'paid' ? 'completed' : 'pending',
    deadline: campaign.completedDate,
    thumbnail: campaign.thumbnail,
  }));

  // Load share earnings and raffle tickets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('exfluencer_share_history');
    if (stored) {
      const history = JSON.parse(stored);
      const totalEarnings = history.reduce((sum: number, h: any) => sum + h.pointsEarned, 0);
      setTotalShareEarnings(totalEarnings);
      setShareCount(history.length);
    }

    // Load raffle tickets
    const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
    const total = Object.values(raffleTickets).reduce((sum: number, count) => sum + (count as number), 0);
    setMyRaffleTickets(total);
  }, []);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader
        title="Dashboard"
        showNotification
        onNotification={() => router.push('/main/influencer/notifications')}
      />

      {/* Content */}
      <div className="container-mobile space-y-6 py-6">
        {/* 💰 내 자산 요약 - 최우선 표시 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/influencer/wallet?tab=cash">
            <div className="card bg-gradient-to-br from-green-500/30 to-green-600/10 border-2 border-green-500/50 hover:border-green-500/80 transition-all p-4">
              <div className="flex items-center gap-2 mb-2">
                <BadgeDollarSign size={20} className="text-green-400" />
                <span className="text-xs text-green-400 font-bold">💰 {t.wallet.cashPoints}</span>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {formatCash(mockData.cash.available)}
              </div>
              <div className="text-xs text-gray-400">{t.dashboard.withdrawable}</div>
              <div className="text-xs text-green-500 mt-2 font-semibold">{t.dashboard.tapToWithdraw}</div>
            </div>
          </Link>

          <Link href="/main/influencer/wallet?tab=shopping">
            <div className="card bg-gradient-to-br from-blue-500/30 to-purple-600/20 border-2 border-blue-500/50 hover:border-blue-500/80 transition-all p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart size={20} className="text-blue-400" />
                <span className="text-xs text-blue-400 font-bold">🛍️ {t.wallet.shoppingPoints}</span>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {formatShoppingPoints(mockData.shoppingPoints.available)}
              </div>
              <div className="text-xs text-gray-400">{t.dashboard.useInShop}</div>
              <div className="text-xs text-blue-500 mt-2 font-semibold">{t.dashboard.tapToShop}</div>
            </div>
          </Link>
        </div>

        {/* 🇰🇷 KOREA DREAM 배너 */}
        <Link href="/main/influencer/korea-dream">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 via-blue-500 to-red-500 p-[2px] animate-pulse">
            <div className="bg-dark-700 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Plane size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🇰🇷</span>
                        <span className="font-bold text-white text-lg">{t.koreaDream.title}</span>
                      </div>
                      <div className="text-xs text-gray-400">{t.koreaDream.subtitle}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-bold animate-bounce">
                    HOT 🔥
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.koreaDream.flightAndHotel}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.koreaDream.beautyAndShopping}</span>
                  </div>
                  <div className="text-xs text-accent font-bold">{t.koreaDream.totalValue}</div>
                </div>

                <div className="bg-dark-600 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{t.koreaDream.targetGoal}</span>
                    <span className="text-sm font-bold text-white">78,432{t.koreaDream.ticketsUnit} / 100,000{t.koreaDream.ticketsUnit}</span>
                  </div>
                  <div className="w-full bg-dark-500 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full" style={{width: '78.4%'}}></div>
                  </div>
                  <div className="text-xs text-primary mt-1">{t.koreaDream.progressText}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket size={16} className="text-primary" />
                    <span className="text-sm text-gray-300">{t.koreaDream.myTickets}: <span className="font-bold text-white">{myRaffleTickets}{t.koreaDream.ticketsUnit}</span></span>
                  </div>
                  <div className="btn btn-primary btn-sm">
                    {myRaffleTickets > 0 ? `${t.dashboard.collectMore} →` : `${t.dashboard.collectTickets} →`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Profile Card */}
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
          <div className="flex items-start gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white">{userProfile.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                <div>
                  <span className="font-semibold">
                    {formatCompactNumber(userProfile.followers)}
                  </span>{' '}
                  {t.dashboard.followers}
                </div>
                <div>
                  <span className="font-semibold">
                    {(userProfile.engagementRate * 100).toFixed(2)}%
                  </span>{' '}
                  {t.dashboard.engagementRate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cash & Shopping Points Cards - 개선된 UI: 명확한 색상 구분 */}
        <div className="grid grid-cols-1 gap-4">
          {/* Cash Card (현금 - 출금 가능) - 초록색 강조 */}
          <Link href="/main/influencer/wallet?tab=cash" className="block">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/10 border-2 border-green-500/40 hover:border-green-500/60 transition-all shadow-lg shadow-green-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"></div>
              <div className="relative p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BadgeDollarSign size={28} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-400">💰 CASH</div>
                      <div className="text-xs text-gray-400">{t.dashboard.cashAvailable}</div>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-green-400" />
                </div>

                <div className="text-4xl font-bold text-green-400 mb-3">
                  {formatCash(mockData.cash.available)}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-green-500/20">
                  <div className="text-xs text-gray-500">
                    {t.dashboard.pendingAmount}: <span className="text-yellow-500 font-semibold">{formatCash(mockData.cash.locked)}</span>
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 rounded-full">
                    <span className="text-xs text-green-400 font-semibold">{t.dashboard.campaignEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Shopping Points Card (쇼핑 포인트 - 상점 전용) - 파란색/보라색 강조 */}
          <Link href="/main/influencer/wallet?tab=shopping" className="block">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-600/20 border-2 border-blue-500/40 hover:border-blue-500/60 transition-all shadow-lg shadow-blue-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
              <div className="relative p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <ShoppingCart size={28} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-400">🛍️ SHOPPING POINTS</div>
                      <div className="text-xs text-gray-400">{t.dashboard.shoppingPoints}</div>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-blue-400" />
                </div>

                <div className="text-4xl font-bold text-blue-400 mb-3">
                  {formatShoppingPoints(mockData.shoppingPoints.available)}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-blue-500/20">
                  <div className="text-xs text-gray-500">
                    {t.dashboard.convertToTickets}
                  </div>
                  <div className="px-3 py-1 bg-blue-500/20 rounded-full">
                    <span className="text-xs text-blue-400 font-semibold">{t.dashboard.platformBonus}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats - 2x3 그리드 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 px-1">📊 {t.dashboard.overview}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
              <BadgeDollarSign size={28} className="text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">
                {formatCash(mockData.stats.totalCashEarnings)}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.dashboard.totalEarnings} 💰</div>
            </div>
            <div className="card text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <ShoppingCart size={28} className="text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">
                {formatShoppingPoints(mockData.stats.totalShoppingPoints)}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.dashboard.totalShoppingPoints} 🛍️</div>
            </div>
            <Link href="/main/influencer/completed" className="card text-center bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer">
              <CheckCircle size={28} className="text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {mockData.stats.completedCampaigns}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.dashboard.completedCampaigns}</div>
              <div className="text-xs text-green-500 mt-1 font-semibold">{t.dashboard.checkDetails} →</div>
            </Link>
            <Link href="/main/influencer/jobs" className="card text-center bg-gradient-to-br from-warning/10 to-transparent border-warning/30 hover:border-warning/50 transition-all cursor-pointer">
              <Clock size={28} className="text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {mockData.stats.inProgressCampaigns}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.dashboard.inProgress}</div>
              <div className="text-xs text-warning mt-1 font-semibold">{t.dashboard.checkDetails} →</div>
            </Link>
            <Link href="/main/influencer/campaigns/applications" className="card text-center bg-gradient-to-br from-info/10 to-transparent border-info/30 hover:border-info/50 transition-all cursor-pointer">
              <AlertCircle size={28} className="text-info mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {mockData.stats.pendingApplications}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.dashboard.pendingApproval}</div>
              <div className="text-xs text-info mt-1 font-semibold">{t.dashboard.applicationHistory} →</div>
            </Link>
            <Link href="/main/influencer/my-raffles" className="card text-center bg-gradient-to-br from-red-500/10 via-blue-500/10 to-red-500/10 border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer">
              <Ticket size={28} className="text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {myRaffleTickets}<span className="text-sm text-gray-400">{t.dashboard.ticketsCount}</span>
              </div>
              <div className="text-xs text-red-400 mt-1 font-semibold">{t.dashboard.myTickets} →</div>
            </Link>
          </div>
        </div>

        {/* 🎯 진행 중인 캠페인 타임라인 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 px-1 flex items-center gap-2">
            <Clock size={16} />
            {t.dashboard.inProgressCampaignsTitle} (3{t.dashboard.campaigns.toLowerCase()})
          </h3>
          <div className="space-y-3">
            {/* COMMENTED OUT: Hardcoded Korean data
            {[
              {
                title: '신규 스킨케어 제품 리뷰',
                company: 'Beauty Brand',
                reward: 500000,
                stage: 3,
                currentStep: '결과물 제출 대기',
                deadline: '2026-03-15',
                daysLeft: 29,
              },
              {
                title: '베트남 레스토랑 체험 리뷰',
                company: 'Pho House',
                reward: 300000,
                stage: 2,
                currentStep: '제품 배송 대기',
                deadline: '2026-03-20',
                daysLeft: 34,
              },
              {
                title: '피트니스 앱 프로모션',
                company: 'FitLife App',
                reward: 600000,
                stage: 4,
                currentStep: '광고주 검토 중',
                deadline: '2026-03-25',
                daysLeft: 39,
              },
            ].map((campaign, idx) => {
            */}
            {[
              {
                title: language === 'ko' ? '신규 스킨케어 제품 리뷰' : 'Đánh giá sản phẩm chăm sóc da mới',
                company: 'Beauty Brand',
                reward: 500000,
                stage: 3,
                currentStep: language === 'ko' ? '결과물 제출 대기' : 'Chờ nộp kết quả',
                deadline: '2026-03-15',
                daysLeft: 29,
              },
              {
                title: language === 'ko' ? '베트남 레스토랑 체험 리뷰' : 'Đánh giá trải nghiệm nhà hàng Việt Nam',
                company: 'Pho House',
                reward: 300000,
                stage: 2,
                currentStep: language === 'ko' ? '제품 배송 대기' : 'Chờ giao sản phẩm',
                deadline: '2026-03-20',
                daysLeft: 34,
              },
              {
                title: language === 'ko' ? '피트니스 앱 프로모션' : 'Quảng bá ứng dụng Fitness',
                company: 'FitLife App',
                reward: 600000,
                stage: 4,
                currentStep: language === 'ko' ? '광고주 검토 중' : 'Đang được nhà quảng cáo xem xét',
                deadline: '2026-03-25',
                daysLeft: 39,
              },
            ].map((campaign, idx) => {
              const steps = [t.dashboard.stepApply, t.dashboard.stepApprove, t.dashboard.stepInProgress, t.dashboard.stepSubmit, t.dashboard.stepReview, t.dashboard.stepComplete];
              return (
              <div key={idx} className="card bg-gradient-to-br from-dark-600 to-dark-700 border-dark-500 hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm mb-1 truncate">{campaign.title}</h4>
                    <p className="text-xs text-gray-400">{campaign.company}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm font-bold text-accent">{formatCash(campaign.reward)}</div>
                    <div className="text-xs text-gray-400">{campaign.daysLeft}{t.dashboard.daysLeft}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{campaign.currentStep}</span>
                    <span className="text-primary font-semibold">{campaign.stage + 1}/{steps.length}</span>
                  </div>
                  <div className="relative h-2 bg-dark-500 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${((campaign.stage + 1) / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Steps */}
                <div className="flex items-center justify-between">
                  {steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        stepIdx <= campaign.stage
                          ? 'bg-primary text-white'
                          : 'bg-dark-500 text-gray-500'
                      }`}>
                        {stepIdx < campaign.stage ? '✓' : stepIdx + 1}
                      </div>
                      <div className={`text-[9px] mt-1 text-center ${
                        stepIdx <= campaign.stage ? 'text-primary font-semibold' : 'text-gray-500'
                      }`}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
        </div>

        {/* 💰 이번 달 수익 현황 */}
        <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              {t.dashboard.monthlyEarnings} ({t.dashboard.february})
            </h3>
            <Link href="/main/influencer/wallet" className="text-xs text-accent hover:underline">
              {t.dashboard.viewDetails} →
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-dark-600 rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-gray-400 mb-1">✅ {t.dashboard.completedAndPaid}</div>
              <div className="text-base font-bold text-green-400">1.2M</div>
              <div className="text-[10px] text-gray-500">VND</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-gray-400 mb-1">⏳ {t.dashboard.inProgressExpected}</div>
              <div className="text-base font-bold text-warning">800K</div>
              <div className="text-[10px] text-gray-500">VND</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-gray-400 mb-1">📅 {t.dashboard.waitingStatus}</div>
              <div className="text-base font-bold text-info">500K</div>
              <div className="text-[10px] text-gray-500">VND</div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-3 border border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400 mb-1">{t.dashboard.expectedTotalEarnings}</div>
                <div className="text-2xl font-bold text-accent">2.5M VND</div>
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <TrendingUp size={16} />
                <span className="font-semibold">+23%</span>
              </div>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>{t.dashboard.monthlyTrend}</span>
              <span>{t.dashboard.lastSixMonths}</span>
            </div>
            <div className="flex items-end justify-between gap-1 h-12">
              {[1.8, 2.1, 1.5, 2.3, 1.9, 2.5].map((value, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-accent to-accent/50 rounded-t"
                  style={{ height: `${(value / 2.5) * 100}%` }}
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-gray-500 mt-1">
              <span>{t.dashboard.september}</span>
              <span>{t.dashboard.october}</span>
              <span>{t.dashboard.november}</span>
              <span>{t.dashboard.december}</span>
              <span>{t.dashboard.january}</span>
              <span className="text-accent font-bold">{t.dashboard.february}</span>
            </div>
          </div>
        </div>

        {/* Social Share Stats */}
        {totalShareEarnings > 0 && (
          <Link href="/main/influencer/shares">
            <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 hover:bg-primary/10 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">📣 {t.dashboard.snsSharingBonus}</p>
                  <p className="text-2xl font-bold text-primary">+{formatShoppingPoints(totalShareEarnings)}</p>
                  <p className="text-xs text-gray-500 mt-1">{shareCount}{t.dashboard.campaignsShared}</p>
                  <p className="text-xs text-primary mt-2">{t.dashboard.viewHistory} →</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Gift size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.common.search}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/main/influencer/campaigns" className="btn btn-primary">
              <TrendingUp size={18} className="mr-2" />
              {t.dashboard.findCampaigns}
            </Link>
            <Link href="/main/influencer/wallet/withdrawal" className="btn btn-secondary">
              <Wallet size={18} className="mr-2" />
              {t.wallet.withdraw}
            </Link>
          </div>
        </div>

        {/* 🛍️ 상점 - 최우선 강조 (마케팅 후킹!) */}
        <Link href="/main/influencer/shop">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-warning via-orange-500 to-red-500 p-[2px] animate-pulse">
            <div className="bg-dark-700 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-warning to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <ShoppingCart size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">🛍️ {t.dashboard.pointsShop}</h3>
                      <p className="text-xs text-gray-300">{t.dashboard.buyWithPoints}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-bold animate-bounce">
                    HOT 🔥
                  </div>
                </div>

                <div className="bg-dark-600/50 backdrop-blur rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{t.dashboard.myShoppingPoints}</span>
                    <span className="text-lg font-bold text-warning">{formatShoppingPoints(mockData.shoppingPoints.available)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-dark-700/80 rounded-lg p-2">
                      <div className="text-[10px] text-gray-400 mb-1">🇰🇷 {t.dashboard.koreaTicket}</div>
                      <div className="text-xs font-bold text-white">100K SP</div>
                    </div>
                    <div className="bg-dark-700/80 rounded-lg p-2">
                      <div className="text-[10px] text-gray-400 mb-1">🎁 {t.dashboard.giftCard}</div>
                      <div className="text-xs font-bold text-white">50K SP</div>
                    </div>
                    <div className="bg-dark-700/80 rounded-lg p-2">
                      <div className="text-[10px] text-gray-400 mb-1">💎 {t.dashboard.premium}</div>
                      <div className="text-xs font-bold text-white">200K SP</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm font-bold text-white">
                  <span>{t.dashboard.shopNow}</span>
                  <ChevronRight size={20} className="animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Rewards & Benefits - 바로가기 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">🎯 {t.dashboard.growthAndRewards}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 출석 체크 */}
            <Link href="/main/influencer/attendance">
              <div className="card bg-gradient-to-br from-orange-500/20 to-yellow-500/10 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all">
                <div className="text-center py-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="text-sm font-bold text-white">🔥 {t.dashboard.attendanceCheck}</div>
                  <div className="text-xs text-gray-400 mt-1">{t.dashboard.consecutiveDays} 23{t.attendance.days}</div>
                  <div className="text-xs text-orange-400 font-semibold mt-1">185K SP {t.dashboard.canEarn}</div>
                </div>
              </div>
            </Link>

            {/* 랭킹 */}
            <Link href="/main/influencer/ranking">
              <div className="card bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                <div className="text-center py-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div className="text-sm font-bold text-white">🏆 {t.dashboard.ranking}</div>
                  <div className="text-xs text-gray-400 mt-1">15{t.dashboard.rankingPosition} / 2,847{t.dashboard.peopleCount}</div>
                  <div className="text-xs text-yellow-400 font-semibold mt-1">TOP 10 {t.dashboard.topReward} 100K</div>
                </div>
              </div>
            </Link>

            {/* 친구 초대 */}
            <Link href="/main/influencer/referral">
              <div className="card bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-2 border-green-500/30 hover:border-green-500/50 transition-all">
                <div className="text-center py-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-sm font-bold text-white">💚 {t.dashboard.inviteFriends}</div>
                  <div className="text-xs text-gray-400 mt-1">12{t.dashboard.peopleInvited}</div>
                  <div className="text-xs text-green-400 font-semibold mt-1">{t.dashboard.lifetimeCommission}</div>
                </div>
              </div>
            </Link>

            {/* 광고주 초대 */}
            <Link href="/main/influencer/invite-advertiser">
              <div className="card bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all relative">
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-accent text-white text-[8px] rounded-full font-bold">
                  NEW
                </div>
                <div className="text-center py-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div className="text-sm font-bold text-white">💼 {t.dashboard.inviteAdvertiser}</div>
                  <div className="text-xs text-gray-400 mt-1">{t.dashboard.priorityMatching}</div>
                  <div className="text-xs text-purple-400 font-semibold mt-1">1{t.dashboard.perPerson} 100K VND</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">{t.dashboard.recentActivities}</h3>
            <Link href="/main/influencer/jobs" className="text-sm text-primary">
              {t.dashboard.viewAll}
            </Link>
          </div>

          <div className="space-y-3">
            {recentCampaigns.map((campaign) => (
              <Link key={campaign.id} href={`/main/influencer/jobs/${campaign.id}`}>
                <div className="card-hover overflow-hidden p-0">
                  {/* Thumbnail Image */}
                  {campaign.thumbnail && (
                    <div className="relative w-full h-40 overflow-hidden">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {campaign.status === 'completed' && (
                          <span className="badge badge-success shadow-lg">
                            <CheckCircle size={12} />
                            {t.completed.title}
                          </span>
                        )}
                        {campaign.status === 'in_progress' && (
                          <span className="badge badge-secondary shadow-lg">
                            <Clock size={12} />
                            {t.dashboard.inProgress}
                          </span>
                        )}
                        {campaign.status === 'pending' && (
                          <span className="badge badge-warning shadow-lg">
                            <AlertCircle size={12} />
                            {t.campaign.status.pending}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {campaign.title}
                        </h4>
                        <p className="text-sm text-gray-400">{campaign.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-500">
                      <div className="text-xs text-gray-500">
                        {t.dashboard.deadline}: {campaign.deadline}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">
                          {campaign.status === 'completed' ? t.dashboard.earnedReward : t.dashboard.expectedReward}
                        </div>
                        <div className="text-success font-bold text-lg">
                          {formatCash(campaign.budget)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Tip */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
          <div className="flex gap-3">
            <Star size={24} className="text-accent flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">{t.dashboard.performanceTip}</h4>
              <p className="text-sm text-gray-300">
                {t.dashboard.performanceTipText}
              </p>
              <Link href="/influencer/stats" className="text-sm text-accent mt-2 inline-block">
                {t.dashboard.viewStats} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="influencer" />

      {/* Onboarding Tutorial */}
      <OnboardingTutorial />
    </div>
  );
}

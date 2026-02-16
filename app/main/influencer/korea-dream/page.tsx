'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plane,
  Hotel,
  ShoppingBag,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  Gift,
  ArrowRight,
  Check,
  Star,
  Heart,
  Crown,
  ChevronRight,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatShoppingPoints } from '@/lib/points';
import SocialMetaTags from '@/components/common/SocialMetaTags';
import WinnerTestimonials from '@/components/marketing/WinnerTestimonials';
import PrimaryCTA from '@/components/common/PrimaryCTA';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data - 실제로는 API에서 가져옴
const eventData = {
  season: 1,
  title: 'KOREA DREAM Season 1',
  subtitle: '한국 뷰티 체험 초청 (2인)', // Will use t.koreaDream.subtitle in render
  prizeValue: '50,000,000 VND',
  targetTickets: 100000,
  currentTickets: 78432,
  participants: 3847,
  myTickets: 0, // localStorage에서 가져와야 함
  myRank: 0,
  daysLeft: 45,
  status: 'ongoing', // ongoing, target_reached, ended
};

// Prize details - will be populated with translations in component
const prizeDetailsStructure = [
  { icon: Plane, labelKey: 'roundTripFlight', detailKey: 'roundTripFlightDetail', valueKey: 'roundTripFlightValue' },
  { icon: Hotel, labelKey: 'fourStarHotel', detailKey: 'fourStarHotelDetail', valueKey: 'fourStarHotelValue' },
  { icon: Sparkles, labelKey: 'beautyTreatment', detailKey: 'beautyTreatmentDetail', valueKey: 'beautyTreatmentValue' },
  { icon: ShoppingBag, labelKey: 'shoppingCredit', detailKey: 'shoppingCreditDetail', valueKey: 'shoppingCreditValue' },
  { icon: Gift, labelKey: 'brandSponsorship', detailKey: 'brandSponsorshipDetail', valueKey: 'brandSponsorshipValue' },
];

const exchangePackages = [
  { points: 100000, tickets: 1, bonus: 0, total: 1, discount: 0 },
  { points: 500000, tickets: 5, bonus: 1, total: 6, discount: 17 },
  { points: 1000000, tickets: 10, bonus: 3, total: 13, discount: 23 },
  { points: 3000000, tickets: 30, bonus: 12, total: 42, discount: 29 },
  { points: 5000000, tickets: 50, bonus: 25, total: 75, discount: 33 },
];

// Mock ranking data
const topRankers = [
  { rank: 1, name: '@beauty_queen', tickets: 1247, probability: 1.59 },
  { rank: 2, name: '@skincare_mi', tickets: 892, probability: 1.14 },
  { rank: 3, name: '@makeup_vy', tickets: 654, probability: 0.83 },
  { rank: 4, name: '@glow_hana', tickets: 521, probability: 0.66 },
  { rank: 5, name: '@viet_beauty', tickets: 498, probability: 0.64 },
];

export default function KoreaDreamPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [shoppingPoints, setShoppingPoints] = useState(0);

  useEffect(() => {
    // Load shopping points from localStorage
    // 실제로는 API에서 가져와야 함
    setShoppingPoints(150000);
  }, []);

  const progressPercentage = (eventData.currentTickets / eventData.targetTickets) * 100;
  const remainingTickets = eventData.targetTickets - eventData.currentTickets;

  const handleExchange = (packageIndex: number) => {
    setSelectedPackage(packageIndex);
    setShowExchangeModal(true);
  };

  const confirmExchange = () => {
    if (selectedPackage === null) return;

    const pkg = exchangePackages[selectedPackage];
    if (shoppingPoints < pkg.points) {
      alert(t.koreaDream.insufficientPoints);
      return;
    }

    // 실제로는 API 호출
    alert(`${t.koreaDream.exchangeSuccessMessage.replace('{count}', pkg.total.toString())}\n\n${t.koreaDream.pointsUsed}: ${formatShoppingPoints(pkg.points)}\n${t.koreaDream.ticketsReceived}: ${pkg.total}${t.koreaDream.ticketsUnit} (${t.koreaDream.bonus} ${pkg.bonus}${t.koreaDream.ticketsUnit} ${t.koreaDream.bonusIncluded})`);
    setShoppingPoints(shoppingPoints - pkg.points);
    setShowExchangeModal(false);
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* 페이스북/SNS 공유 최적화 */}
      <SocialMetaTags
        title="🇰🇷 KOREA DREAM - 한국 뷰티 체험 여행 응모권 | Exfluencer VN"
        description="왕복 항공 + 4박5일 + 뷰티 시술 + 쇼핑 지원! 총 가치 50,000,000 VND. 지금 응모하고 한국에서 만나요! ✈️"
        image={typeof window !== 'undefined' ? `${window.location.origin}/api/og/korea-dream` : '/api/og/korea-dream'}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="article"
        price={eventData.prizeValue ? 50000000 : undefined}
        currency="VND"
      />

      <MobileHeader
        title="🇰🇷 KOREA DREAM"
        showBack
        showNotification
        onNotification={() => router.push('/main/influencer/notifications')}
      />

      <div className="container-mobile space-y-6 py-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 via-blue-500 to-red-500 p-[3px]">
          <div className="bg-dark-700 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <div className="text-6xl mb-3">🇰🇷</div>
              <h1 className="text-3xl font-bold text-white mb-2">{eventData.title}</h1>
              <p className="text-gray-300 mb-1">{t.koreaDream.subtitle}</p>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mt-3">
                <span className="text-white font-bold">{t.koreaDream.totalValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">{t.koreaDream.realtimeProgress}</h3>
            <div className="px-3 py-1 bg-primary/20 rounded-full">
              <span className="text-xs text-primary font-bold">{t.koreaDream.liveStatus}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{t.koreaDream.targetGoal}</span>
              <span className="font-bold text-white">{eventData.targetTickets.toLocaleString()}{t.koreaDream.ticketsUnit}</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">{t.koreaDream.currentProgress}</span>
                <span className="font-bold text-primary">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-dark-500 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{width: `${progressPercentage}%`}}
                >
                  {progressPercentage > 30 && (
                    <span className="text-xs text-white font-bold drop-shadow">
                      {eventData.currentTickets.toLocaleString()}장
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-dark-500">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{eventData.currentTickets.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{t.koreaDream.collectedTickets}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">{remainingTickets.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{t.koreaDream.remainingQuantity}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-success">{eventData.participants.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{t.koreaDream.participants}</div>
              </div>
            </div>

            {progressPercentage < 100 && (
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-warning" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-warning">{t.koreaDream.remainingToTarget.replace('{count}', remainingTickets.toLocaleString())}</div>
                    <div className="text-xs text-gray-400 mt-1">{t.koreaDream.drawingIn7Days}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* My Tickets */}
        <div className="card bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Ticket size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">{t.koreaDream.myTickets}</div>
                <div className="text-2xl font-bold text-white">{eventData.myTickets.toLocaleString()}{t.koreaDream.ticketsUnit}</div>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-400" />
          </div>

          {eventData.myTickets > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t.koreaDream.estimatedWinChance}</span>
                <span className="text-accent font-bold">
                  {((eventData.myTickets / eventData.currentTickets) * 100).toFixed(3)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{t.koreaDream.currentRank}</span>
                <span className="text-white font-semibold">
                  {eventData.myRank}위 / {eventData.participants.toLocaleString()}명
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-gray-400 mb-3">{t.koreaDream.noTicketsYet}</p>
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('exchange')?.offsetTop || 0, behavior: 'smooth' })}
                className="btn btn-primary btn-sm"
              >
                {t.koreaDream.exchangeTicketsNow}
              </button>
            </div>
          )}
        </div>

        {/* Prize Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white px-1">{t.koreaDream.prizeComposition}</h3>
          <div className="space-y-6">
            {prizeDetailsStructure.map((prize, index) => {
              const Icon = prize.icon;
              return (
                <div key={index} className="card bg-dark-600 hover:bg-dark-500 transition-colors border-2 border-dark-500/50 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{t.koreaDream[prize.labelKey as keyof typeof t.koreaDream]}</div>
                      <div className="text-xs text-gray-400">{t.koreaDream[prize.detailKey as keyof typeof t.koreaDream]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-accent">{t.koreaDream[prize.valueKey as keyof typeof t.koreaDream]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card bg-gradient-to-r from-success/20 to-success/5 border-2 border-success/30 shadow-xl">
            <div className="flex items-center gap-2">
              <Check size={20} className="text-success" />
              <div className="text-sm text-gray-300">
                {t.koreaDream.professionalGuide}
              </div>
            </div>
          </div>
        </div>

        {/* Winner Testimonials - 신뢰도 향상 */}
        <WinnerTestimonials />

        {/* Exchange Section */}
        <div id="exchange" className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-white">{t.koreaDream.ticketExchange}</h3>
            <div className="text-sm text-gray-400">
              {t.koreaDream.myPoints} <span className="font-bold text-primary">{formatShoppingPoints(shoppingPoints)}</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 shadow-xl">
            <div className="text-center mb-3">
              <div className="text-sm text-gray-400 mb-1">{t.koreaDream.exchangeRate}</div>
              <div className="text-2xl font-bold text-white">
                {t.koreaDream.basicExchangeRate} <span className="text-sm text-gray-400">({t.koreaDream.ticketsUnit})</span>
              </div>
            </div>
            <div className="bg-info/10 border border-info/30 rounded-lg p-2">
              <div className="text-xs text-info text-center">
                {t.koreaDream.bulkBonusInfo}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {exchangePackages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => handleExchange(index)}
                className={`card cursor-pointer transition-all shadow-xl ${
                  shoppingPoints >= pkg.points
                    ? 'bg-dark-600 hover:bg-dark-500 border-2 border-primary/30 hover:border-primary/50'
                    : 'bg-dark-600/50 border-2 border-dark-500 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-lg">{formatShoppingPoints(pkg.points)}</span>
                      {pkg.discount > 0 && (
                        <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full font-bold">
                          -{pkg.discount}%
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {t.koreaDream.basic} {pkg.tickets}{t.koreaDream.ticketsUnit}
                      {pkg.bonus > 0 && (
                        <span className="text-primary font-semibold"> {t.koreaDream.bonus} {pkg.bonus}{t.koreaDream.ticketsUnit}</span>
                      )}
                      <span className="text-white font-bold"> {t.koreaDream.total} {pkg.total}{t.koreaDream.ticketsUnit}</span>
                    </div>
                    {pkg.discount > 0 && (
                      <div className="text-xs text-success mt-1">
                        {t.koreaDream.perTicket} {Math.floor(pkg.points / pkg.total).toLocaleString()} SP ({pkg.discount}% {t.koreaDream.discount}!)
                      </div>
                    )}
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-warning/10 border-2 border-warning/30 shadow-xl">
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-warning">⚠️</span>
                <div>
                  <div className="font-semibold text-warning mb-1">{t.koreaDream.warning}</div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>{t.koreaDream.warningLine1}</li>
                    <li>{t.koreaDream.warningLine2}</li>
                    <li>{t.koreaDream.warningLine3}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white px-1">{t.koreaDream.rankingTop5}</h3>
          <div className="space-y-6">
            {topRankers.map((ranker) => (
              <div key={ranker.rank} className="card bg-dark-600 border-2 border-dark-500/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    ranker.rank === 1 ? 'bg-yellow-500 text-white' :
                    ranker.rank === 2 ? 'bg-gray-400 text-white' :
                    ranker.rank === 3 ? 'bg-orange-600 text-white' :
                    'bg-dark-500 text-gray-400'
                  }`}>
                    {ranker.rank === 1 ? '🥇' : ranker.rank === 2 ? '🥈' : ranker.rank === 3 ? '🥉' : ranker.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{ranker.name}</div>
                    <div className="text-xs text-gray-400">{t.koreaDream.tickets} {ranker.tickets.toLocaleString()}{t.koreaDream.ticketsUnit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">{ranker.probability.toFixed(2)}%</div>
                    <div className="text-xs text-gray-500">{t.koreaDream.winProbability}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/main/influencer/korea-dream/ranking">
            <div className="btn btn-secondary w-full">
              {t.koreaDream.viewAllRanking}
            </div>
          </Link>
        </div>

        {/* How to Earn Points */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white px-1">{t.koreaDream.howToEarnPoints}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/main/influencer/attendance" className="card bg-dark-600 hover:bg-dark-500 transition-colors text-center py-4 border-2 border-dark-500/50 shadow-xl">
              <Calendar size={28} className="text-success mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">{t.koreaDream.dailyAttendance}</div>
              <div className="text-xs text-gray-500 mt-1">{t.koreaDream.dailyPoints}</div>
            </Link>

            <Link href="/main/influencer/referral" className="card bg-dark-600 hover:bg-dark-500 transition-colors text-center py-4 border-2 border-dark-500/50 shadow-xl">
              <Users size={28} className="text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">{t.koreaDream.inviteFriends}</div>
              <div className="text-xs text-gray-500 mt-1">{t.koreaDream.invitePoints}</div>
            </Link>

            <Link href="/main/influencer/campaigns" className="card bg-dark-600 hover:bg-dark-500 transition-colors text-center py-4 border-2 border-dark-500/50 shadow-xl">
              <Sparkles size={28} className="text-warning mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">{t.koreaDream.shareCampaign}</div>
              <div className="text-xs text-gray-500 mt-1">{t.koreaDream.sharePoints}</div>
            </Link>

            <Link href="/main/influencer/profile" className="card bg-dark-600 hover:bg-dark-500 transition-colors text-center py-4 border-2 border-dark-500/50 shadow-xl">
              <Star size={28} className="text-accent mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">{t.koreaDream.completeMission}</div>
              <div className="text-xs text-gray-500 mt-1">{t.koreaDream.missionPoints}</div>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="card bg-gradient-to-r from-red-500/20 via-blue-500/20 to-purple-500/20 border-2 border-red-500/30 shadow-xl">
          <div className="text-center">
            <div className="text-2xl mb-2">✈️</div>
            <h4 className="text-lg font-bold text-white mb-2">{t.koreaDream.seeYouInKorea}</h4>
            <p className="text-sm text-gray-300 mb-4">
              {t.koreaDream.moreTicketsMoreChance}<br />
              {t.koreaDream.collectPointsNow}
            </p>
            <PrimaryCTA
              onClick={() => window.scrollTo({ top: document.getElementById('exchange')?.offsetTop || 0, behavior: 'smooth' })}
              icon={Ticket}
              pulse
            >
              {t.koreaDream.exchangeTickets}
            </PrimaryCTA>
          </div>
        </div>
      </div>

      {/* Exchange Modal */}
      {showExchangeModal && selectedPackage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dark-700 rounded-2xl p-6 w-full max-w-md border border-primary/30">
            <h3 className="text-xl font-bold text-white mb-4">{t.koreaDream.confirmExchange}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.koreaDream.pointsToUse}</span>
                <span className="font-bold text-white">{formatShoppingPoints(exchangePackages[selectedPackage].points)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.koreaDream.basicTickets}</span>
                <span className="font-bold text-white">{exchangePackages[selectedPackage].tickets}{t.koreaDream.ticketsUnit}</span>
              </div>
              {exchangePackages[selectedPackage].bonus > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t.koreaDream.bonusTickets}</span>
                  <span className="font-bold text-primary">+{exchangePackages[selectedPackage].bonus}{t.koreaDream.ticketsUnit}</span>
                </div>
              )}
              <div className="border-t border-dark-500 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-semibold">{t.koreaDream.totalTicketsReceived}</span>
                  <span className="text-2xl font-bold text-accent">{exchangePackages[selectedPackage].total}{t.koreaDream.ticketsUnit}</span>
                </div>
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-3">
                <div className="text-xs text-info">
                  {t.koreaDream.exchangeWarningModal}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <PrimaryCTA
                onClick={confirmExchange}
                icon={Check}
              >
                {t.common.confirm}
              </PrimaryCTA>
              <button
                onClick={() => setShowExchangeModal(false)}
                className="btn btn-ghost w-full"
              >
                {t.koreaDream.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}

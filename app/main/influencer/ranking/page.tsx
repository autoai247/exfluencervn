'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Flame, DollarSign, Users, Ticket, Crown, Medal, Award, TrendingUp, ChevronRight, Star, Zap, Target, Clock, AlertCircle, Gift, Sparkles, TrendingDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatShoppingPoints, formatCash } from '@/lib/points';
import Link from 'next/link';
import MobileHeader from '@/components/common/MobileHeader';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type RankingCategory = 'points' | 'attendance' | 'earnings' | 'referrals' | 'tickets';

interface RankingUser {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  value: number;
  trend?: 'up' | 'down' | 'same';
  badge?: string;
  level?: string;
}

interface RecentActivity {
  id: string;
  username: string;
  action: string;
  value: number;
  timestamp: number;
  type: 'rank_up' | 'points' | 'achievement';
}

export default function RankingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<RankingCategory>('points');
  const [myTotalTickets, setMyTotalTickets] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({ days: 7, hours: 15, minutes: 42, seconds: 18 });

  // Season countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load user's raffle tickets from localStorage
  useEffect(() => {
    const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
    const total = Object.values(raffleTickets).reduce((sum: number, count) => sum + (count as number), 0);
    setMyTotalTickets(total);
  }, []);

  // Mock data - Current user stats
  const myStats = {
    points: { rank: 8, value: 2500000, total: 2847, nextRank: 7, nextValue: 3480000, level: 'Gold', progress: 72 },
    attendance: { rank: 15, value: 23, total: 2847, nextRank: 14, nextValue: 25, level: 'Silver', progress: 60 },
    earnings: { rank: 42, value: 8500000, total: 2847, nextRank: 41, nextValue: 9200000, level: 'Bronze', progress: 45 },
    referrals: { rank: 8, value: 12, total: 2847, nextRank: 7, nextValue: 18, level: 'Gold', progress: 67 },
    tickets: { rank: myTotalTickets > 0 ? 156 : 2847, value: myTotalTickets, total: 2847, nextRank: 155, nextValue: myTotalTickets + 5, level: 'Bronze', progress: 50 },
  };

  // Recent activity feed
  const recentActivities: RecentActivity[] = [
    { id: '1', username: '김*진', action: '3위로 상승', value: 0, timestamp: 2, type: 'rank_up' },
    { id: '2', username: '이*수', action: '획득', value: 50000, timestamp: 5, type: 'points' },
    { id: '3', username: '박*영', action: '달성', value: 0, timestamp: 8, type: 'achievement' },
    { id: '4', username: '최*민', action: '1위 탈환', value: 0, timestamp: 12, type: 'rank_up' },
  ];

  // Top movers this week
  const topMovers = [
    { username: '윤*아', rankChange: 15, currentRank: 7 },
    { username: '장*우', rankChange: 12, currentRank: 8 },
    { username: '임*서', rankChange: 9, currentRank: 9 },
  ];

  // Mock ranking data with levels
  const rankingData: Record<RankingCategory, RankingUser[]> = {
    points: [
      { rank: 1, userId: 'u101', username: '김*진', value: 8750000, trend: 'up', badge: '🔥 연속 1위', level: 'Diamond' },
      { rank: 2, userId: 'u102', username: '이*수', value: 7820000, trend: 'same', level: 'Platinum' },
      { rank: 3, userId: 'u103', username: '박*영', value: 6940000, trend: 'up', badge: '⚡ 급상승', level: 'Platinum' },
      { rank: 4, userId: 'u104', username: '최*민', value: 5850000, trend: 'down', level: 'Gold' },
      { rank: 5, userId: 'u105', username: '정*호', value: 4920000, trend: 'up', level: 'Gold' },
      { rank: 6, userId: 'u106', username: '강*희', value: 4150000, trend: 'same', level: 'Gold' },
      { rank: 7, userId: 'u107', username: '윤*아', value: 3480000, trend: 'up', badge: '🚀 신예', level: 'Gold' },
      { rank: 8, userId: 'u108', username: '장*우', value: 2920000, trend: 'down', level: 'Silver' },
      { rank: 9, userId: 'u109', username: '임*서', value: 2450000, trend: 'up', level: 'Silver' },
      { rank: 10, userId: 'u110', username: '한*준', value: 1980000, trend: 'same', level: 'Silver' },
    ],
    attendance: [
      { rank: 1, userId: 'u001', username: '김*진', value: 87, trend: 'up', badge: '💪 철인', level: 'Diamond' },
      { rank: 2, userId: 'u002', username: '이*수', value: 82, trend: 'same', level: 'Platinum' },
      { rank: 3, userId: 'u003', username: '박*영', value: 78, trend: 'up', level: 'Platinum' },
      { rank: 4, userId: 'u004', username: '최*민', value: 75, trend: 'down', level: 'Gold' },
      { rank: 5, userId: 'u005', username: '정*호', value: 71, trend: 'up', level: 'Gold' },
      { rank: 6, userId: 'u006', username: '강*희', value: 68, trend: 'same', level: 'Gold' },
      { rank: 7, userId: 'u007', username: '윤*아', value: 65, trend: 'up', level: 'Silver' },
      { rank: 8, userId: 'u008', username: '장*우', value: 62, trend: 'down', level: 'Silver' },
      { rank: 9, userId: 'u009', username: '임*서', value: 58, trend: 'up', level: 'Silver' },
      { rank: 10, userId: 'u010', username: '한*준', value: 55, trend: 'same', level: 'Bronze' },
    ],
    earnings: [
      { rank: 1, userId: 'u011', username: '김*진', value: 45800000, trend: 'up', badge: '💰 부자', level: 'Diamond' },
      { rank: 2, userId: 'u012', username: '이*수', value: 42300000, trend: 'same', level: 'Platinum' },
      { rank: 3, userId: 'u013', username: '박*영', value: 38900000, trend: 'up', level: 'Platinum' },
      { rank: 4, userId: 'u014', username: '최*민', value: 35200000, trend: 'down', level: 'Gold' },
      { rank: 5, userId: 'u015', username: '정*호', value: 32100000, trend: 'up', level: 'Gold' },
      { rank: 6, userId: 'u016', username: '강*희', value: 28700000, trend: 'same', level: 'Gold' },
      { rank: 7, userId: 'u017', username: '윤*아', value: 25400000, trend: 'up', level: 'Silver' },
      { rank: 8, userId: 'u018', username: '장*우', value: 22800000, trend: 'down', level: 'Silver' },
      { rank: 9, userId: 'u019', username: '임*서', value: 19500000, trend: 'up', level: 'Silver' },
      { rank: 10, userId: 'u020', username: '한*준', value: 16200000, trend: 'same', level: 'Bronze' },
    ],
    referrals: [
      { rank: 1, userId: 'u021', username: '김*진', value: 47, trend: 'up', badge: '🌟 스타', level: 'Diamond' },
      { rank: 2, userId: 'u022', username: '이*수', value: 38, trend: 'same', level: 'Platinum' },
      { rank: 3, userId: 'u023', username: '박*영', value: 32, trend: 'up', level: 'Gold' },
      { rank: 4, userId: 'u024', username: '최*민', value: 28, trend: 'down', level: 'Gold' },
      { rank: 5, userId: 'u025', username: '정*호', value: 24, trend: 'up', level: 'Gold' },
      { rank: 6, userId: 'u026', username: '강*희', value: 21, trend: 'same', level: 'Silver' },
      { rank: 7, userId: 'u027', username: '윤*아', value: 18, trend: 'up', level: 'Silver' },
      { rank: 8, userId: 'u028', username: '장*우', value: 15, trend: 'down', level: 'Silver' },
      { rank: 9, userId: 'u029', username: '임*서', value: 13, trend: 'up', level: 'Bronze' },
      { rank: 10, userId: 'u030', username: '한*준', value: 11, trend: 'same', level: 'Bronze' },
    ],
    tickets: [
      { rank: 1, userId: 'u031', username: '김*진', value: 342, trend: 'up', badge: '🎰 행운아', level: 'Diamond' },
      { rank: 2, userId: 'u032', username: '이*수', value: 287, trend: 'same', level: 'Platinum' },
      { rank: 3, userId: 'u033', username: '박*영', value: 245, trend: 'up', level: 'Platinum' },
      { rank: 4, userId: 'u034', username: '최*민', value: 198, trend: 'down', level: 'Gold' },
      { rank: 5, userId: 'u035', username: '정*호', value: 176, trend: 'up', level: 'Gold' },
      { rank: 6, userId: 'u036', username: '강*희', value: 152, trend: 'same', level: 'Silver' },
      { rank: 7, userId: 'u037', username: '윤*아', value: 134, trend: 'up', level: 'Silver' },
      { rank: 8, userId: 'u038', username: '장*우', value: 118, trend: 'down', level: 'Silver' },
      { rank: 9, userId: 'u039', username: '임*서', value: 95, trend: 'up', level: 'Bronze' },
      { rank: 10, userId: 'u040', username: '한*준', value: 82, trend: 'same', level: 'Bronze' },
    ],
  };

  const categories = [
    {
      id: 'points' as RankingCategory,
      label: t.wallet.shoppingPoints,
      icon: TrendingUp,
      color: 'primary',
      gradient: 'from-primary to-accent',
      unit: 'SP',
      description: '총 쇼핑 포인트',
    },
    {
      id: 'attendance' as RankingCategory,
      label: t.attendance.title,
      icon: Flame,
      color: 'orange',
      gradient: 'from-orange-500 to-yellow-500',
      unit: t.attendance.days,
      description: '연속 출석',
    },
    {
      id: 'earnings' as RankingCategory,
      label: t.ranking.earnings,
      icon: DollarSign,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      unit: 'VND',
      description: '총 수익',
    },
    {
      id: 'referrals' as RankingCategory,
      label: t.referral.title,
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      unit: '명',
      description: '추천인',
    },
    {
      id: 'tickets' as RankingCategory,
      label: '응모권',
      icon: Ticket,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      unit: '장',
      description: '응모권',
    },
  ];

  const activeConfig = categories.find(c => c.id === activeCategory)!;
  const Icon = activeConfig.icon;
  const myRank = myStats[activeCategory];
  const rankings = rankingData[activeCategory];

  const formatValue = (value: number, category: RankingCategory) => {
    switch (category) {
      case 'points':
        return formatShoppingPoints(value);
      case 'attendance':
        return `${value}${t.attendance.days}`;
      case 'earnings':
        return formatCash(value);
      case 'referrals':
        return `${value}명`;
      case 'tickets':
        return `${value}장`;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} className="text-yellow-400" />;
      case 2:
        return <Medal size={24} className="text-gray-300" />;
      case 3:
        return <Award size={24} className="text-orange-400" />;
      default:
        return <span className="text-gray-400 font-bold text-lg">{rank}</span>;
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-success" />;
      case 'down':
        return <TrendingUp size={16} className="text-danger rotate-180" />;
      default:
        return <span className="text-gray-500">-</span>;
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Diamond': return 'from-cyan-400 to-blue-500';
      case 'Platinum': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-yellow-400 to-orange-500';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Bronze': return 'from-orange-700 to-orange-900';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getLevelIcon = (level?: string) => {
    switch (level) {
      case 'Diamond': return '💎';
      case 'Platinum': return '⚪';
      case 'Gold': return '🥇';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '⚫';
    }
  };

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Header */}
      <MobileHeader
        title={`🏆 ${t.ranking.title}`}
        showBack
        showPoints={true}
        currentPoints={myStats.points.value}
      />

      <div className="container-mobile space-y-4 py-4">
        {/* Season Countdown - FOMO Element */}
        <div className="card bg-gradient-to-r from-error/20 via-warning/20 to-error/20 border-2 border-error/50 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-error" />
              <div>
                <h3 className="text-sm font-bold text-white">{t.ranking.season?.currentSeason || '2월 슈퍼스타 챌린지'}</h3>
                <p className="text-xs text-gray-300">{t.ranking.season?.seasonEnd || '시즌 종료까지'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-right">
              <div className="text-center">
                <div className="text-2xl font-bold text-error">{timeRemaining.days}</div>
                <div className="text-xs text-gray-400">일</div>
              </div>
              <span className="text-error font-bold">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-error">{String(timeRemaining.hours).padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">시간</div>
              </div>
              <span className="text-error font-bold">:</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-error">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">분</div>
              </div>
            </div>
          </div>
          <div className="bg-dark-600 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-error to-warning h-full animate-pulse" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-center text-warning mt-2 font-bold">
            ⚠️ {t.ranking.season?.warning || '시즌 종료 후 순위가 확정됩니다!'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-5 gap-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? `bg-gradient-to-br ${category.gradient} text-white shadow-lg scale-105`
                    : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                }`}
              >
                <CategoryIcon size={18} />
                <span className="text-[10px]">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* My Rank Card with Progress to Next Rank */}
        <div className={`card bg-gradient-to-br ${activeConfig.gradient}/20 border-2 border-${activeConfig.color}-500/40`}>
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getLevelColor(myRank.level)} flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{getLevelIcon(myRank.level)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 bg-dark-600 rounded-full text-primary">
                  {myRank.level}
                </span>
                <span className="text-xs text-gray-400">{t.ranking.myRank}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{myRank.rank}</span>
                <span className="text-sm text-gray-400">위 / {myRank.total.toLocaleString()}명</span>
              </div>
              <div className="text-sm text-gray-300">
                {formatValue(myRank.value, activeCategory)}
              </div>
            </div>
          </div>

          {/* Progress to Next Rank - Competition Psychology */}
          <div className="bg-dark-600 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{t.ranking.nextRank?.toNext || '다음 순위까지'}</span>
              <span className="text-warning font-bold">
                {formatValue(myRank.nextValue - myRank.value, activeCategory)} {t.ranking.nextRank?.needed || '필요'}
              </span>
            </div>
            <div className="relative w-full bg-dark-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${activeConfig.gradient} transition-all duration-500`}
                style={{ width: `${myRank.progress}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {myRank.progress}%
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-success">
                <ChevronUp size={14} />
                <span>{t.ranking.nextRank?.canPass || '추월 가능'}: {rankings.filter(r => r.value < myRank.nextValue && r.rank < myRank.rank).length}명</span>
              </div>
              <button
                onClick={() => {
                  if (activeCategory === 'points') router.push('/main/influencer/shop');
                  else if (activeCategory === 'attendance') router.push('/main/influencer/attendance');
                  else if (activeCategory === 'referrals') router.push('/main/influencer/referral');
                  else if (activeCategory === 'tickets') router.push('/main/influencer/korea-dream');
                  else router.push('/main/influencer/wallet');
                }}
                className="px-3 py-1 bg-gradient-to-r from-accent to-secondary rounded-full text-xs font-bold text-white flex items-center gap-1"
              >
                <Zap size={12} />
                {t.ranking.nextRank?.boost || '올리기'}
              </button>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mt-3 pt-3 border-t border-dark-500">
            <p className="text-xs text-center text-primary font-bold">
              {myRank.rank <= 10
                ? `🎉 ${t.ranking.motivation?.top10 || 'TOP 10 진입! 보상 확정!'}`
                : myRank.rank <= 50
                ? `💪 ${t.ranking.motivation?.almost || '조금만 더! TOP 10까지 얼마 안 남았어요!'}`
                : `🚀 ${t.ranking.motivation?.keepGoing || '계속 도전하세요! 기회는 열려있습니다!'}`
              }
            </p>
          </div>
        </div>

        {/* Real-time Activity Feed - Social Proof */}
        <div className="card bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-secondary animate-pulse" />
            <h3 className="text-sm font-bold text-white">{t.ranking.liveActivity?.title || '실시간 활동'}</h3>
            <span className="px-2 py-0.5 bg-error text-white text-xs rounded-full animate-pulse">LIVE</span>
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-2 text-xs bg-dark-600 rounded-lg p-2">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'rank_up' ? 'bg-warning animate-pulse' :
                  activity.type === 'points' ? 'bg-success' : 'bg-primary'
                }`}></div>
                <span className="text-white font-semibold">{activity.username}</span>
                <span className="text-gray-400">{activity.action}</span>
                {activity.value > 0 && (
                  <span className="text-accent font-bold">{formatShoppingPoints(activity.value)}</span>
                )}
                <span className="ml-auto text-gray-500">{activity.timestamp}분 전</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Movers This Week - Competition */}
        <div className="card bg-gradient-to-br from-warning/10 to-orange/10 border border-warning/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-warning" />
            <h3 className="text-sm font-bold text-white">{t.ranking.topMovers?.title || '이번 주 급상승 TOP 3'}</h3>
          </div>
          <div className="space-y-2">
            {topMovers.map((mover, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-dark-600 rounded-lg p-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {idx + 1}
                </div>
                <span className="text-white font-semibold text-sm">{mover.username}</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="flex items-center gap-1 text-success">
                    <ChevronUp size={14} />
                    <span className="text-sm font-bold">{mover.rankChange}</span>
                  </div>
                  <span className="text-xs text-gray-400">→ {mover.currentRank}위</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-gray-400">
            {t.ranking.topMovers?.message || '당신도 다음 주 주인공이 될 수 있습니다!'}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="card bg-gradient-to-br from-dark-600 to-dark-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-400" />
            TOP 3 {t.ranking.podium?.champions || '챔피언'}
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* 2nd Place */}
            {rankings[1] && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mb-2 shadow-lg">
                    <Medal size={32} className="text-white" />
                  </div>
                  {rankings[1].badge && (
                    <div className="absolute -top-1 -right-1 text-xs">{rankings[1].badge.split(' ')[0]}</div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white mb-1">{rankings[1].username}</div>
                  <div className="text-xs px-2 py-0.5 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full text-white mb-1">
                    {rankings[1].level}
                  </div>
                  <div className="text-xs text-gray-400">{formatValue(rankings[1].value, activeCategory)}</div>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {rankings[0] && (
              <div className="flex flex-col items-center -mt-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-2 shadow-xl animate-pulse">
                    <Crown size={40} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                    1
                  </div>
                  {rankings[0].badge && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-error text-white px-2 py-0.5 rounded-full">
                      {rankings[0].badge}
                    </div>
                  )}
                </div>
                <div className="text-center mt-2">
                  <div className="text-base font-bold text-white mb-1">{rankings[0].username}</div>
                  <div className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-white mb-1">
                    {rankings[0].level}
                  </div>
                  <div className="text-sm text-yellow-400 font-bold">{formatValue(rankings[0].value, activeCategory)}</div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {rankings[2] && (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-2 shadow-lg">
                    <Award size={32} className="text-white" />
                  </div>
                  {rankings[2].badge && (
                    <div className="absolute -top-1 -right-1 text-xs">{rankings[2].badge.split(' ')[0]}</div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white mb-1">{rankings[2].username}</div>
                  <div className="text-xs px-2 py-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full text-white mb-1">
                    {rankings[2].level}
                  </div>
                  <div className="text-xs text-gray-400">{formatValue(rankings[2].value, activeCategory)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Ranking List */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            <span>{t.ranking.fullList || '전체 랭킹'}</span>
            <span className="text-xs text-gray-400 font-normal">{activeConfig.description}</span>
          </h3>

          <div className="space-y-2">
            {rankings.map((user, index) => (
              <div
                key={user.userId}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  index < 3
                    ? 'bg-gradient-to-r from-primary/10 to-transparent border border-primary/20'
                    : user.rank === myRank.rank
                    ? 'bg-gradient-to-r from-accent/20 to-transparent border-2 border-accent/40 animate-pulse'
                    : 'bg-dark-600 hover:bg-dark-500'
                }`}
              >
                {/* Rank */}
                <div className="w-10 flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar with Level */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getLevelColor(user.level)} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {user.username.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-xs">
                    {getLevelIcon(user.level)}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white truncate">{user.username}</span>
                    {user.badge && (
                      <span className="text-xs px-1.5 py-0.5 bg-error/20 text-error rounded text-[10px] whitespace-nowrap">
                        {user.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{formatValue(user.value, activeCategory)}</div>
                </div>

                {/* Trend */}
                <div className="flex flex-col items-end gap-1">
                  {getTrendIcon(user.trend)}
                  <span className="text-xs px-2 py-0.5 bg-dark-700 rounded-full text-gray-400">
                    {user.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full py-3 mt-4 bg-dark-600 hover:bg-dark-500 rounded-xl text-sm font-bold text-gray-300 transition-colors">
            {t.dashboard.viewAll} (TOP 100)
          </button>
        </div>

        {/* Tier System & Rewards */}
        <div className="card bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Gift size={20} className="text-primary" />
            {t.ranking.rewards?.title || '등급별 보상'}
          </h3>

          <div className="space-y-3">
            {/* Diamond Tier */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💎</span>
                  <span className="text-sm font-bold text-white">Diamond (1-3위)</span>
                </div>
                <span className="text-xs px-2 py-1 bg-cyan-500 text-white rounded-full">VIP</span>
              </div>
              <ul className="space-y-1 text-xs text-gray-300 ml-7">
                <li>• {formatShoppingPoints(1000000)} ~ {formatShoppingPoints(300000)}</li>
                <li>• 전용 VIP 라운지 이용권</li>
                <li>• 신제품 우선 체험</li>
                <li>• 전담 매니저 배정</li>
              </ul>
            </div>

            {/* Platinum Tier */}
            <div className="bg-gradient-to-r from-gray-300/20 to-gray-500/20 border border-gray-400/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚪</span>
                <span className="text-sm font-bold text-white">Platinum (4-10위)</span>
              </div>
              <ul className="space-y-1 text-xs text-gray-300 ml-7">
                <li>• {formatShoppingPoints(200000)} ~ {formatShoppingPoints(100000)}</li>
                <li>• 프리미엄 캠페인 우선 지원</li>
                <li>• 월간 리포트 제공</li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🥇</span>
                <span className="text-sm font-bold text-white">Gold (11-50위)</span>
              </div>
              <ul className="space-y-1 text-xs text-gray-300 ml-7">
                <li>• {formatShoppingPoints(50000)}</li>
                <li>• 특별 캠페인 알림</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-500 space-y-2">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <AlertCircle size={12} />
              {t.ranking.rewards?.resetInfo || '매월 1일 00시에 랭킹이 리셋되고 보상이 지급됩니다.'}
            </p>
            <p className="text-xs text-warning font-bold text-center">
              ⚡ {t.ranking.rewards?.warning || '시즌 종료 전 마지막 순위가 보상 기준입니다!'}
            </p>
          </div>
        </div>

        {/* CTA - Boost Ranking */}
        <div className="card bg-gradient-to-r from-accent to-secondary text-white">
          <div className="text-center py-2">
            <h3 className="text-lg font-bold mb-2">{t.ranking.cta?.title || '지금 순위를 올리세요!'}</h3>
            <p className="text-sm mb-4 opacity-90">{t.ranking.cta?.subtitle || '작은 노력으로 큰 보상을 받을 수 있습니다'}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/main/influencer/shop')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg py-3 px-4 transition-colors"
              >
                <TrendingUp size={20} className="mx-auto mb-1" />
                <div className="text-xs font-bold">{t.ranking.cta?.earnPoints || '포인트 모으기'}</div>
              </button>
              <button
                onClick={() => router.push('/main/influencer/attendance')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg py-3 px-4 transition-colors"
              >
                <Flame size={20} className="mx-auto mb-1" />
                <div className="text-xs font-bold">{t.ranking.cta?.dailyCheck || '매일 출석'}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

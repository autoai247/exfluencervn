'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, Ticket, DollarSign, Calendar, PieChart } from 'lucide-react';
import { formatShoppingPoints, formatCash } from '@/lib/points';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Stats {
  totalEarned: number;
  totalSpent: number;
  totalTickets: number;
  totalRaffles: number;
  averageSpendPerRaffle: number;
  thisMonthSpent: number;
  lastMonthSpent: number;
}

export default function PointsStatsPage() {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<Stats>({
    totalEarned: 0,
    totalSpent: 0,
    totalTickets: 0,
    totalRaffles: 0,
    averageSpendPerRaffle: 0,
    thisMonthSpent: 0,
    lastMonthSpent: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    // localStorage에서 데이터 로드
    const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
    const raffleHistory = JSON.parse(localStorage.getItem('exfluencer_raffle_history') || '[]');

    // 통계 계산
    const totalTickets = Object.values(raffleTickets).reduce((sum: number, count) => sum + (Number(count) || 0), 0);
    const totalSpent = raffleHistory.reduce((sum: number, h: any) => sum + (Number(h.pointsSpent) || 0), 0);
    const totalRaffles = Object.keys(raffleTickets).length;
    const averageSpendPerRaffle = totalRaffles > 0 ? totalSpent / totalRaffles : 0;

    // 이번 달 지출
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const thisMonthSpent = raffleHistory
      .filter((h: any) => {
        const date = new Date(h.date);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      })
      .reduce((sum: number, h: any) => sum + (Number(h.pointsSpent) || 0), 0);

    // 지난 달 지출
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
    const lastMonthSpent = raffleHistory
      .filter((h: any) => {
        const date = new Date(h.date);
        return date.getMonth() === lastMonth && date.getFullYear() === lastYear;
      })
      .reduce((sum: number, h: any) => sum + (Number(h.pointsSpent) || 0), 0);

    setStats({
      totalEarned: 3500000, // 임시 값 (실제로는 API에서 가져와야 함)
      totalSpent,
      totalTickets,
      totalRaffles,
      averageSpendPerRaffle,
      thisMonthSpent,
      lastMonthSpent,
    });

    setRecentTransactions(raffleHistory.slice(-10).reverse());
    setLoading(false);
  };

  const spendingTrend = stats.thisMonthSpent > stats.lastMonthSpent ? 'up' : 'down';
  const trendPercentage = stats.lastMonthSpent > 0
    ? Math.abs((stats.thisMonthSpent - stats.lastMonthSpent) / stats.lastMonthSpent * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">{t.pointsStats.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.pointsStats.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* 주요 통계 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card border-2 border-dark-500/50 shadow-xl text-center">
            <TrendingUp className="text-success mx-auto mb-2" size={28} />
            <div className="text-sm text-gray-400 mb-1">{t.pointsStats.totalEarned}</div>
            <div className="text-xl font-bold text-white">{formatShoppingPoints(stats.totalEarned)}</div>
          </div>

          <div className="card border-2 border-dark-500/50 shadow-xl text-center">
            <ShoppingCart className="text-primary mx-auto mb-2" size={28} />
            <div className="text-sm text-gray-400 mb-1">{t.pointsStats.totalSpent}</div>
            <div className="text-xl font-bold text-white">{formatShoppingPoints(stats.totalSpent)}</div>
          </div>

          <div className="card border-2 border-dark-500/50 shadow-xl text-center">
            <Ticket className="text-accent mx-auto mb-2" size={28} />
            <div className="text-sm text-gray-400 mb-1">{t.pointsStats.totalTickets}</div>
            <div className="text-xl font-bold text-white">{stats.totalTickets}{t.raffle.ticketUnit}</div>
          </div>

          <div className="card border-2 border-dark-500/50 shadow-xl text-center">
            <PieChart className="text-secondary mx-auto mb-2" size={28} />
            <div className="text-sm text-gray-400 mb-1">{t.pointsStats.participatedRaffles}</div>
            <div className="text-xl font-bold text-white">{stats.totalRaffles}{t.raffle.eventsParticipated}</div>
          </div>
        </div>

        {/* 이번 달 지출 */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{t.pointsStats.thisMonthSpending}</h3>
              <p className="text-xs text-gray-400">{t.pointsStats.lastMonthVs}</p>
            </div>
            <Calendar className="text-primary" size={32} />
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white mb-1">
                {formatShoppingPoints(stats.thisMonthSpent)}
              </div>
              <div className="flex items-center gap-2">
                {spendingTrend === 'up' ? (
                  <>
                    <TrendingUp className="text-error" size={16} />
                    <span className="text-sm text-error">+{trendPercentage}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="text-success" size={16} />
                    <span className="text-sm text-success">-{trendPercentage}%</span>
                  </>
                )}
                <span className="text-xs text-gray-400">{language === 'ko' ? '지난 달' : 'Tháng trước'}: {formatShoppingPoints(stats.lastMonthSpent)}</span>
              </div>
            </div>

            <div className="w-full bg-dark-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                style={{ width: `${Math.min((stats.thisMonthSpent / 1000000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 평균 지출 */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">{t.pointsStats.avgPerRaffle}</h3>
              <div className="text-xl font-bold text-white">
                {formatShoppingPoints(Math.round(stats.averageSpendPerRaffle))}
              </div>
            </div>
            <DollarSign className="text-accent" size={32} />
          </div>
        </div>

        {/* 최근 거래 내역 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">{t.pointsStats.recentTransactions}</h3>
          <div className="space-y-6">
            {recentTransactions.length === 0 ? (
              <div className="card border-2 border-dark-500/50 shadow-xl text-center py-8">
                <p className="text-gray-400">{t.pointsStats.noTransactions}</p>
              </div>
            ) : (
              recentTransactions.map((transaction, index) => (
                <div key={index} className="card border-2 border-dark-500/50 shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Ticket className="text-primary" size={16} />
                        <span className="text-sm font-semibold text-white">
                          {t.pointsStats.ticketsPurchased} {transaction.tickets}{t.raffle.ticketUnit}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(transaction.date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-error">
                        -{formatShoppingPoints(transaction.pointsSpent)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 팁 */}
        <div className="card bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 shadow-xl">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-primary flex-shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-white mb-2">{t.pointsStats.earnTipsTitle}</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>{t.pointsStats.earnTip1}</li>
                <li>{t.pointsStats.earnTip2}</li>
                <li>{t.pointsStats.earnTip3}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

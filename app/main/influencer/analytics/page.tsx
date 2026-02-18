'use client';

import { BarChart3, TrendingUp, DollarSign, Users, Eye, Calendar, Award, Target } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const mockStats = {
  thisMonth: {
    campaigns: 8,
    earnings: 12500000,
    views: 458000,
    engagement: 5.2,
  },
  lastMonth: {
    campaigns: 6,
    earnings: 9200000,
    views: 389000,
    engagement: 4.8,
  },
  total: {
    campaigns: 45,
    earnings: 85000000,
    followers: 125000,
    avgRating: 4.9,
  },
};

const recentCampaigns = [
  { name: 'Review Skincare cao cấp', date: '2026-02-10', earning: 2500000, views: 85000, status: 'completed' },
  { name: 'Fashion Brand Collaboration', date: '2026-02-05', earning: 3200000, views: 124000, status: 'completed' },
  { name: 'Unboxing Beauty Box', date: '2026-01-28', earning: 1800000, views: 67000, status: 'completed' },
];

export default function InfluencerAnalyticsPage() {
  const { language } = useLanguage();

  const getGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth > 0,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 pb-20">
      <MobileHeader title={language === 'ko' ? '통계' : 'Thống kê'} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'ko' ? '📊 성과 분석' : '📊 Performance Analytics'}
          </h2>
          <p className="text-sm text-gray-400">
            {language === 'ko' ? '나의 활동 통계를 확인하세요' : 'Track your activity statistics'}
          </p>
        </div>

        {/* This Month Stats */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">
            {language === 'ko' ? '이번 달' : 'This Month'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Campaigns */}
            <div className="bg-dark-600/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Target size={16} className="text-primary" />
                </div>
                <span className="text-xs text-gray-400">{language === 'ko' ? '캠페인' : 'Campaigns'}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{mockStats.thisMonth.campaigns}</div>
              {(() => {
                const growth = getGrowth(mockStats.thisMonth.campaigns, mockStats.lastMonth.campaigns);
                return (
                  <div className={`text-xs flex items-center gap-1 ${growth.isPositive ? 'text-success' : 'text-error'}`}>
                    <TrendingUp size={12} className={growth.isPositive ? '' : 'rotate-180'} />
                    {growth.value}%
                  </div>
                );
              })()}
            </div>

            {/* Earnings */}
            <div className="bg-dark-600/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <DollarSign size={16} className="text-success" />
                </div>
                <span className="text-xs text-gray-400">{language === 'ko' ? '수익' : 'Earnings'}</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{formatPoints(mockStats.thisMonth.earnings)}</div>
              {(() => {
                const growth = getGrowth(mockStats.thisMonth.earnings, mockStats.lastMonth.earnings);
                return (
                  <div className={`text-xs flex items-center gap-1 ${growth.isPositive ? 'text-success' : 'text-error'}`}>
                    <TrendingUp size={12} className={growth.isPositive ? '' : 'rotate-180'} />
                    {growth.value}%
                  </div>
                );
              })()}
            </div>

            {/* Views */}
            <div className="bg-dark-600/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Eye size={16} className="text-secondary" />
                </div>
                <span className="text-xs text-gray-400">{language === 'ko' ? '조회수' : 'Views'}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{(mockStats.thisMonth.views / 1000).toFixed(0)}K</div>
              {(() => {
                const growth = getGrowth(mockStats.thisMonth.views, mockStats.lastMonth.views);
                return (
                  <div className={`text-xs flex items-center gap-1 ${growth.isPositive ? 'text-success' : 'text-error'}`}>
                    <TrendingUp size={12} className={growth.isPositive ? '' : 'rotate-180'} />
                    {growth.value}%
                  </div>
                );
              })()}
            </div>

            {/* Engagement */}
            <div className="bg-dark-600/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BarChart3 size={16} className="text-accent" />
                </div>
                <span className="text-xs text-gray-400">{language === 'ko' ? '참여율' : 'Engagement'}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{mockStats.thisMonth.engagement}%</div>
              {(() => {
                const growth = getGrowth(mockStats.thisMonth.engagement, mockStats.lastMonth.engagement);
                return (
                  <div className={`text-xs flex items-center gap-1 ${growth.isPositive ? 'text-success' : 'text-error'}`}>
                    <TrendingUp size={12} className={growth.isPositive ? '' : 'rotate-180'} />
                    {growth.value}%
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Total Stats */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">
            {language === 'ko' ? '전체 통계' : 'Total Stats'}
          </h3>
          <div className="bg-dark-600/80 backdrop-blur-xl rounded-2xl p-5 border-2 border-dark-500/50 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-xs mb-1">{language === 'ko' ? '총 캠페인' : 'Total Campaigns'}</div>
                <div className="text-white text-2xl font-bold">{mockStats.total.campaigns}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">{language === 'ko' ? '총 수익' : 'Total Earnings'}</div>
                <div className="text-white text-lg font-bold">{formatPoints(mockStats.total.earnings)}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">{language === 'ko' ? '팔로워' : 'Followers'}</div>
                <div className="text-white text-2xl font-bold">{(mockStats.total.followers / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">{language === 'ko' ? '평균 평점' : 'Avg Rating'}</div>
                <div className="text-white text-2xl font-bold flex items-center gap-1">
                  {mockStats.total.avgRating}
                  <Award size={16} className="text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">
            {language === 'ko' ? '최근 캠페인' : 'Recent Campaigns'}
          </h3>
          <div className="space-y-6">
            {recentCampaigns.map((campaign, idx) => (
              <div
                key={idx}
                className="bg-dark-600/80 backdrop-blur-xl rounded-xl p-4 border-2 border-dark-500/50 shadow-xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{campaign.name}</h4>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <Calendar size={10} />
                      {campaign.date}
                    </p>
                  </div>
                  <div className="px-2 py-1 bg-success/20 text-success text-xs rounded-full font-medium">
                    {language === 'ko' ? '완료' : 'Completed'}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      <Eye size={12} className="inline mr-1" />
                      {(campaign.views / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="text-success font-bold">
                    +{formatPoints(campaign.earning)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

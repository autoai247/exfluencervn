'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Clock,
  CheckCircle,
  ChevronRight,
  Search,
  BarChart,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data
const mockData = {
  company: {
    name: 'K-Beauty Co.',
    logo: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
  },
  stats: {
    activeCampaigns: 5,
    totalSpent: 12000000,
    totalInfluencers: 23,
    avgROI: 3.2,
  },
  campaigns: [
    {
      id: '1',
      title: '신규 스킨케어 제품 리뷰 캠페인',
      status: 'active',
      budget: 2000000,
      spent: 1200000,
      applicants: 23,
      accepted: 8,
      views: 125000,
      deadline: '2024-03-15',
      createdAt: '2024-02-01',
    },
    {
      id: '2',
      title: '봄 신상 메이크업 프로모션',
      status: 'active',
      budget: 1500000,
      spent: 800000,
      applicants: 15,
      accepted: 5,
      views: 89000,
      deadline: '2024-03-20',
      createdAt: '2024-02-05',
    },
    {
      id: '3',
      title: '겨울 스킨케어 루틴 캠페인',
      status: 'completed',
      budget: 1800000,
      spent: 1800000,
      applicants: 31,
      accepted: 10,
      views: 250000,
      deadline: '2024-02-10',
      createdAt: '2024-01-15',
    },
  ],
};

export default function AdvertiserDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader
        title="Dashboard"
        showNotification
        onNotification={() => {
          // Navigate to notifications
        }}
      />

      {/* Content */}
      <div className="container-mobile space-y-6 py-6">
        {/* Company Card - 클릭하면 프로필로 이동 */}
        <Link href="/main/advertiser/profile">
          <div className="card bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary/30 hover:border-secondary/50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <img
                src={mockData.company.logo}
                alt={mockData.company.name}
                className="w-16 h-16 rounded-full border-2 border-secondary"
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">{mockData.company.name}</h2>
                <p className="text-sm text-gray-300">{t.advertiser.brandAccount}</p>
                <p className="text-xs text-gray-500 mt-1">{t.advertiser.verifiedAdvertiser}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </Link>

        {/* Quick Stats - Clickable */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/advertiser/campaigns?status=active">
            <div className="card text-center hover:bg-dark-600 transition-all cursor-pointer border-2 border-transparent hover:border-primary/50">
              <TrendingUp size={24} className="text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {mockData.stats.activeCampaigns}
              </div>
              <div className="text-xs text-gray-400 mt-1">진행 중 Active</div>
              <div className="text-xs text-primary mt-2">👆 상세 보기</div>
            </div>
          </Link>

          <Link href="/main/advertiser/analytics?tab=budget">
            <div className="card text-center hover:bg-dark-600 transition-all cursor-pointer border-2 border-transparent hover:border-accent/50">
              <DollarSign size={24} className="text-accent mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {formatPoints(mockData.stats.totalSpent)}
              </div>
              <div className="text-xs text-gray-400 mt-1">총 지출 VND</div>
              <div className="text-xs text-accent mt-2">👆 예산 분석</div>
            </div>
          </Link>

          <Link href="/main/advertiser/influencers">
            <div className="card text-center hover:bg-dark-600 transition-all cursor-pointer border-2 border-transparent hover:border-secondary/50">
              <Users size={24} className="text-secondary mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {mockData.stats.totalInfluencers}
              </div>
              <div className="text-xs text-gray-400 mt-1">협업 KOLs</div>
              <div className="text-xs text-secondary mt-2">👆 KOL 목록</div>
            </div>
          </Link>

          <Link href="/main/advertiser/analytics?tab=roi">
            <div className="card text-center hover:bg-dark-600 transition-all cursor-pointer border-2 border-transparent hover:border-success/50">
              <BarChart size={24} className="text-success mx-auto mb-2" />
              <div className="text-xl font-bold text-success">
                {mockData.stats.avgROI.toFixed(1)}x
              </div>
              <div className="text-xs text-gray-400 mt-1">평균 ROI</div>
              <div className="text-xs text-success mt-0.5">+{((mockData.stats.avgROI - 1) * 100).toFixed(0)}% return</div>
              <div className="text-xs text-success mt-2">👆 ROI 분석</div>
            </div>
          </Link>
        </div>

        {/* Create Campaign Button */}
        <Link href="/main/advertiser/campaigns/create">
          <button className="btn btn-primary w-full text-base py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark">
            <Plus size={20} className="mr-2" />
            🚀 새 캠페인 만들기 Create Campaign
          </button>
        </Link>

        {/* Value Prop */}
        <div className="bg-info/10 border border-info/30 rounded-xl p-4">
          <p className="text-sm text-gray-300 text-center">
            💡 <strong className="text-white">평균 24시간 내</strong> 검증된 KOL 매칭 |
            <strong className="text-white"> Average 24h</strong> verified KOL matching
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/advertiser/influencers" className="btn btn-secondary">
            <Search size={18} className="mr-2" />
            KOL 찾기 Find KOLs
          </Link>
          <Link href="/main/advertiser/analytics" className="btn btn-secondary">
            <BarChart size={18} className="mr-2" />
            분석 Analytics
          </Link>
        </div>

        {/* Active Campaigns */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">진행 중인 캠페인</h3>
            <Link href="/main/advertiser/campaigns" className="text-sm text-primary">
              모두 보기
            </Link>
          </div>

          <div className="space-y-3">
            {mockData.campaigns
              .filter((c) => c.status === 'active')
              .map((campaign) => (
                <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                  <div className="card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock size={12} />
                          마감: {campaign.deadline}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full">
                        진행 중
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">예산 사용</span>
                        <span className="text-white font-semibold">
                          {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-500">
                          {formatPoints(campaign.spent)}
                        </span>
                        <span className="text-gray-500">
                          {formatPoints(campaign.budget)}
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-dark-600 rounded-lg">
                        <div className="font-semibold text-white">{campaign.applicants}</div>
                        <div className="text-gray-400">지원자</div>
                      </div>
                      <div className="text-center p-2 bg-dark-600 rounded-lg">
                        <div className="font-semibold text-white">{campaign.accepted}</div>
                        <div className="text-gray-400">승인됨</div>
                      </div>
                      <div className="text-center p-2 bg-dark-600 rounded-lg">
                        <div className="font-semibold text-white">
                          {(campaign.views / 1000).toFixed(0)}K
                        </div>
                        <div className="text-gray-400">조회수</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-500">
                      <span className="text-xs text-gray-500">상세 정보 보기</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Recent Completed Campaigns */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">최근 완료된 캠페인</h3>
          </div>

          <div className="space-y-3">
            {mockData.campaigns
              .filter((c) => c.status === 'completed')
              .slice(0, 2)
              .map((campaign) => (
                <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                  <div className="card-hover">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle size={12} />
                          완료일: {campaign.deadline}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-success/20 text-success text-xs rounded-full">
                        완료
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                      <div className="text-center">
                        <div className="font-semibold text-white">{campaign.accepted}</div>
                        <div className="text-gray-400">인플루언서</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white">
                          {(campaign.views / 1000).toFixed(0)}K
                        </div>
                        <div className="text-gray-400">조회수</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-accent">
                          {formatPoints(campaign.spent)}
                        </div>
                        <div className="text-gray-400">지출</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Tips */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
          <div className="flex gap-3">
            <TrendingUp size={24} className="text-accent flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-1">캠페인 성공 팁</h4>
              <p className="text-sm text-gray-300">
                명확한 가이드라인과 충분한 예산을 제공하면 더 많은 인플루언서가 지원합니다!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="advertiser" />
    </div>
  );
}

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
      deadline: '2026-03-15',
      createdAt: '2026-02-01',
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
      deadline: '2026-03-20',
      createdAt: '2026-02-05',
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
      deadline: '2026-02-10',
      createdAt: '2026-01-15',
    },
  ],
};

export default function AdvertiserDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pb-20">
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
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all cursor-pointer shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src={mockData.company.logo}
                alt={mockData.company.name}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{mockData.company.name}</h2>
                <p className="text-sm text-gray-600">{t.advertiser.brandAccount}</p>
                <p className="text-xs text-gray-400 mt-1">{t.advertiser.verifiedAdvertiser}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </Link>

        {/* Quick Stats - Clickable */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/main/advertiser/campaigns?status=active">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-gray-900 transition-all cursor-pointer shadow-xl">
              <TrendingUp size={24} className="text-gray-700 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {mockData.stats.activeCampaigns}
              </div>
              <div className="text-xs text-gray-500 mt-1">진행 중 Active</div>
            </div>
          </Link>

          <Link href="/main/advertiser/analytics?tab=budget">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-gray-900 transition-all cursor-pointer shadow-xl">
              <DollarSign size={24} className="text-gray-700 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {formatPoints(mockData.stats.totalSpent)}
              </div>
              <div className="text-xs text-gray-500 mt-1">총 지출 VND</div>
            </div>
          </Link>

          <Link href="/main/advertiser/influencers">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-gray-900 transition-all cursor-pointer shadow-xl">
              <Users size={24} className="text-gray-700 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {mockData.stats.totalInfluencers}
              </div>
              <div className="text-xs text-gray-500 mt-1">협업 KOLs</div>
            </div>
          </Link>

          <Link href="/main/advertiser/analytics?tab=roi">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-gray-900 transition-all cursor-pointer shadow-xl">
              <BarChart size={24} className="text-gray-700 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">
                {mockData.stats.avgROI.toFixed(1)}x
              </div>
              <div className="text-xs text-gray-500 mt-1">평균 ROI</div>
              <div className="text-xs text-gray-600 mt-0.5">+{((mockData.stats.avgROI - 1) * 100).toFixed(0)}% return</div>
            </div>
          </Link>
        </div>

        {/* Create Campaign Button */}
        <Link href="/main/advertiser/campaigns/create">
          <button className="w-full bg-gray-900 text-white rounded-xl py-4 px-6 font-semibold text-base hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Plus size={20} className="mr-2" />
            새 캠페인 만들기 Create Campaign
          </button>
        </Link>

        {/* Value Prop */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 shadow-xl">
          <p className="text-sm text-gray-600 text-center">
            <strong className="text-gray-900">평균 24시간 내</strong> 검증된 KOL 매칭 |
            <strong className="text-gray-900"> Average 24h</strong> verified KOL matching
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/advertiser/influencers">
            <button className="w-full bg-gray-100 text-gray-900 rounded-xl py-3 px-4 font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Search size={18} className="mr-2" />
              KOL 찾기 Find KOLs
            </button>
          </Link>
          <Link href="/main/advertiser/analytics">
            <button className="w-full bg-gray-100 text-gray-900 rounded-xl py-3 px-4 font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center">
              <BarChart size={18} className="mr-2" />
              분석 Analytics
            </button>
          </Link>
        </div>

        {/* Active Campaigns */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-900">진행 중인 캠페인</h3>
            <Link href="/main/advertiser/campaigns" className="text-sm text-gray-900 font-medium">
              모두 보기
            </Link>
          </div>

          <div className="space-y-6">
            {mockData.campaigns
              .filter((c) => c.status === 'active')
              .map((campaign) => (
                <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-gray-900 transition-all cursor-pointer shadow-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          마감: {campaign.deadline}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs rounded-full font-medium">
                        진행 중
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">예산 사용</span>
                        <span className="text-gray-900 font-semibold">
                          {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900 rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-400">
                          {formatPoints(campaign.spent)}
                        </span>
                        <span className="text-gray-400">
                          {formatPoints(campaign.budget)}
                        </span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">{campaign.applicants}</div>
                        <div className="text-gray-500">지원자</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">{campaign.accepted}</div>
                        <div className="text-gray-500">승인됨</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">
                          {(campaign.views / 1000).toFixed(0)}K
                        </div>
                        <div className="text-gray-500">조회수</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">상세 정보 보기</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Recent Completed Campaigns */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-900">최근 완료된 캠페인</h3>
          </div>

          <div className="space-y-6">
            {mockData.campaigns
              .filter((c) => c.status === 'completed')
              .slice(0, 2)
              .map((campaign) => (
                <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-gray-900 transition-all cursor-pointer shadow-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle size={12} />
                          완료일: {campaign.deadline}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs rounded-full font-medium">
                        완료
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">{campaign.accepted}</div>
                        <div className="text-gray-500">인플루언서</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">
                          {(campaign.views / 1000).toFixed(0)}K
                        </div>
                        <div className="text-gray-500">조회수</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-semibold text-gray-900">
                          {formatPoints(campaign.spent)}
                        </div>
                        <div className="text-gray-500">지출</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 shadow-xl">
          <div className="flex gap-3">
            <TrendingUp size={24} className="text-gray-700 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">캠페인 성공 팁</h4>
              <p className="text-sm text-gray-600">
                명확한 가이드라인과 충분한 예산을 제공하면 더 많은 인플루언서가 지원합니다
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

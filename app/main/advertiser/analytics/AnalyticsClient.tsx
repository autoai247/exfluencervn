'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  BarChart3,
  Activity,
} from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type TabType = 'overview' | 'budget' | 'roi' | 'performance';

export default function AnalyticsClient() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;

  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'overview');

  const t = {
    ko: {
      overview: '개요',
      budget: '예산',
      roi: 'ROI',
      performance: '성과',
      totalSpent: '총 지출',
      totalBudget: '총 예산',
      avgCampaignBudget: '평균 캠페인 예산',
      totalReach: '총 도달',
      avgROI: '평균 ROI',
      totalInfluencers: '협업 인플루언서',
      activeCampaigns: '진행중 캠페인',
      completedCampaigns: '완료된 캠페인',
      budgetUtilization: '예산 사용률',
      topPerformingCampaigns: '최고 성과 캠페인',
    },
    vi: {
      overview: 'Tổng quan',
      budget: 'Ngân sách',
      roi: 'ROI',
      performance: 'Hiệu suất',
      totalSpent: 'Tổng chi tiêu',
      totalBudget: 'Tổng ngân sách',
      avgCampaignBudget: 'Ngân sách TB mỗi chiến dịch',
      totalReach: 'Tổng охват',
      avgROI: 'ROI trung bình',
      totalInfluencers: 'KOL hợp tác',
      activeCampaigns: 'Chiến dịch đang chạy',
      completedCampaigns: 'Chiến dịch hoàn thành',
      budgetUtilization: 'Tỷ lệ sử dụng ngân sách',
      topPerformingCampaigns: 'Chiến dịch hiệu quả nhất',
    },
  };

  const text = t[language];

  // Mock data
  const stats = {
    totalSpent: 12000000,
    totalBudget: 15000000,
    avgCampaignBudget: 2000000,
    totalReach: 464000,
    avgROI: 3.2,
    totalInfluencers: 23,
    activeCampaigns: 5,
    completedCampaigns: 7,
  };

  const budgetUtilization = ((stats.totalSpent / stats.totalBudget) * 100).toFixed(1);

  return (
    <div className="container-mobile py-6 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['overview', 'budget', 'roi', 'performance'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {text[tab]}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{text.activeCampaigns}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{text.avgROI}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgROI}x</div>
              <div className="text-xs text-gray-500 mt-1">
                +{((stats.avgROI - 1) * 100).toFixed(0)}% return
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{text.totalInfluencers}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalInfluencers}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{text.totalReach}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {(stats.totalReach / 1000).toFixed(0)}K
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{text.budget}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">{text.budgetUtilization}</span>
                  <span className="text-gray-900 font-bold">{budgetUtilization}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full"
                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{text.totalSpent}</div>
                  <div className="text-lg font-bold text-gray-900">{formatPoints(stats.totalSpent)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{text.totalBudget}</div>
                  <div className="text-lg font-bold text-gray-900">{formatPoints(stats.totalBudget)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={24} className="text-gray-600" />
              <div>
                <div className="text-xs text-gray-500">{text.totalSpent}</div>
                <div className="text-2xl font-bold text-gray-900">{formatPoints(stats.totalSpent)} VND</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{text.budgetUtilization}:</span>
              <span className="text-gray-900 font-bold">{budgetUtilization}%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {language === 'ko' ? '예산 분석' : 'Phân tích ngân sách'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{text.avgCampaignBudget}</span>
                <span className="text-sm font-bold text-gray-900">{formatPoints(stats.avgCampaignBudget)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{text.activeCampaigns}</span>
                <span className="text-sm font-bold text-gray-900">{stats.activeCampaigns}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{text.completedCampaigns}</span>
                <span className="text-sm font-bold text-gray-900">{stats.completedCampaigns}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Tab */}
      {activeTab === 'roi' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp size={24} className="text-gray-600" />
              <div>
                <div className="text-xs text-gray-500">{text.avgROI}</div>
                <div className="text-3xl font-bold text-gray-900">{stats.avgROI}x</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {language === 'ko' ? '평균 ' : 'Trung bình '} +{((stats.avgROI - 1) * 100).toFixed(0)}% {language === 'ko' ? '수익률' : 'lợi nhuận'}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {language === 'ko' ? 'ROI 분석' : 'Phân tích ROI'}
            </h3>
            <p className="text-sm text-gray-500">
              {language === 'ko'
                ? '캠페인별 ROI 데이터가 여기에 표시됩니다. 실제 운영 시 상세한 ROI 분석 차트와 인사이트가 제공됩니다.'
                : 'Dữ liệu ROI theo chiến dịch sẽ hiển thị ở đây. Trong vận hành thực tế, biểu đồ phân tích ROI chi tiết và insights sẽ được cung cấp.'}
            </p>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {language === 'ko' ? '전체 성과' : 'Tổng hiệu suất'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">{text.totalReach}</div>
                <div className="text-xl font-bold text-gray-900">{(stats.totalReach / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">{text.totalInfluencers}</div>
                <div className="text-xl font-bold text-gray-900">{stats.totalInfluencers}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{text.topPerformingCampaigns}</h3>
            <p className="text-sm text-gray-500">
              {language === 'ko'
                ? '최고 성과 캠페인 순위가 여기에 표시됩니다. 실제 운영 시 조회수, 참여율, 전환율 등의 상세 지표가 제공됩니다.'
                : 'Bảng xếp hạng chiến dịch hiệu quả nhất sẽ hiển thị ở đây. Trong vận hành thực tế, các chỉ số chi tiết như lượt xem, tỷ lệ tham gia, tỷ lệ chuyển đổi sẽ được cung cấp.'}
            </p>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex gap-3">
          <Activity size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">
              {language === 'ko' ? '분석 데이터 안내' : 'Thông tin dữ liệu phân tích'}
            </h4>
            <p className="text-xs text-gray-600">
              {language === 'ko'
                ? '현재는 데모 데이터가 표시됩니다. 실제 운영 시에는 실시간 데이터와 상세한 분석 차트가 제공됩니다.'
                : 'Hiện đang hiển thị dữ liệu demo. Trong vận hành thực tế, dữ liệu thời gian thực và biểu đồ phân tích chi tiết sẽ được cung cấp.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

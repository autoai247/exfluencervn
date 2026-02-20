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
import { translations } from '@/lib/i18n/translations';

type TabType = 'overview' | 'budget' | 'roi' | 'performance';

export default function AnalyticsClient() {
  const { language } = useLanguage();
  const t = translations[language].advertiser.analytics;
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;

  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'overview');


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
            {t[tab]}
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
                <span className="text-xs text-gray-500">{t.activeCampaigns}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{t.avgROI}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgROI}x</div>
              <div className="text-xs text-gray-500 mt-1">
                +{((stats.avgROI - 1) * 100).toFixed(0)}% return
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{t.totalInfluencers}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalInfluencers}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{t.totalReach}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {(stats.totalReach / 1000).toFixed(0)}K
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t.budget}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">{t.budgetUtilization}</span>
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
                  <div className="text-xs text-gray-500 mb-1">{t.totalSpent}</div>
                  <div className="text-lg font-bold text-gray-900">{formatPoints(stats.totalSpent)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.totalBudget}</div>
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
                <div className="text-xs text-gray-500">{t.totalSpent}</div>
                <div className="text-2xl font-bold text-gray-900">{formatPoints(stats.totalSpent)} VND</div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t.budgetUtilization}:</span>
              <span className="text-gray-900 font-bold">{budgetUtilization}%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {t.budgetAnalysis}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t.avgCampaignBudget}</span>
                <span className="text-sm font-bold text-gray-900">{formatPoints(stats.avgCampaignBudget)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t.activeCampaigns}</span>
                <span className="text-sm font-bold text-gray-900">{stats.activeCampaigns}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t.completedCampaigns}</span>
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
                <div className="text-xs text-gray-500">{t.avgROI}</div>
                <div className="text-3xl font-bold text-gray-900">{stats.avgROI}x</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {language === 'ko'
                ? `평균 +${((stats.avgROI - 1) * 100).toFixed(0)}% 수익`
                : `Trung bình +${((stats.avgROI - 1) * 100).toFixed(0)}% lợi nhuận`}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {t.roiAnalysis}
            </h3>
            <p className="text-sm text-gray-500">
              {t.roiDesc}
            </p>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              {t.overallPerformance}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">{t.totalReach}</div>
                <div className="text-xl font-bold text-gray-900">{(stats.totalReach / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">{t.totalInfluencers}</div>
                <div className="text-xl font-bold text-gray-900">{stats.totalInfluencers}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t.topPerformingCampaigns}</h3>
            <p className="text-sm text-gray-500">
              {t.performanceDesc}
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
              {t.dataInfo}
            </h4>
            <p className="text-xs text-gray-600">
              {t.dataInfoDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

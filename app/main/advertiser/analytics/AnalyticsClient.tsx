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
  Target,
  Zap,
} from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';

type TabType = 'overview' | 'budget' | 'roi' | 'performance';

const tabConfig = [
  { key: 'overview', icon: BarChart3, color: 'text-primary' },
  { key: 'budget', icon: DollarSign, color: 'text-success' },
  { key: 'roi', icon: TrendingUp, color: 'text-secondary' },
  { key: 'performance', icon: Target, color: 'text-accent' },
];

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

  const overviewCards = [
    {
      label: t.activeCampaigns,
      value: stats.activeCampaigns,
      icon: TrendingUp,
      gradient: 'from-primary/15 to-dark-700',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/20',
    },
    {
      label: t.avgROI,
      value: `${stats.avgROI}x`,
      sub: `+${((stats.avgROI - 1) * 100).toFixed(0)}% return`,
      icon: BarChart3,
      gradient: 'from-secondary/15 to-dark-700',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/20',
    },
    {
      label: t.totalInfluencers,
      value: stats.totalInfluencers,
      icon: Users,
      gradient: 'from-accent/15 to-dark-700',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/20',
    },
    {
      label: t.totalReach,
      value: `${(stats.totalReach / 1000).toFixed(0)}K`,
      icon: Eye,
      gradient: 'from-success/15 to-dark-700',
      iconColor: 'text-success',
      iconBg: 'bg-success/20',
    },
  ];

  return (
    <div className="container-mobile py-6 space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabConfig.map(({ key, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabType)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === key
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40 hover:border-primary/30'
            }`}
          >
            <Icon size={14} className={activeTab === key ? 'text-white' : color} />
            {t[key as keyof typeof t]}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {overviewCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className={`bg-gradient-to-br ${card.gradient} backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon size={16} className={card.iconColor} />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{card.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{card.value}</div>
                  {card.sub && <div className="text-xs text-gray-400 mt-1">{card.sub}</div>}
                </div>
              );
            })}
          </div>

          {/* Budget Overview */}
          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-sm font-bold text-white">{t.budget}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{t.budgetUtilization}</span>
                  <span className="text-white font-bold">{budgetUtilization}%</span>
                </div>
                <div className="w-full h-2.5 bg-dark-500 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dark-500/50">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.totalSpent}</div>
                  <div className="text-base font-bold text-success">{formatPoints(stats.totalSpent)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.totalBudget}</div>
                  <div className="text-base font-bold text-white">{formatPoints(stats.totalBudget)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-success/15 to-dark-700 border-2 border-success/20 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center">
                <DollarSign size={24} className="text-success" />
              </div>
              <div>
                <div className="text-xs text-gray-400">{t.totalSpent}</div>
                <div className="text-2xl font-bold text-success">{formatPoints(stats.totalSpent)} VND</div>
              </div>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-dark-500/50">
              <span className="text-gray-400">{t.budgetUtilization}:</span>
              <span className="text-white font-bold">{budgetUtilization}%</span>
            </div>
          </div>

          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-gradient-to-b from-success to-secondary rounded-full" />
              <h3 className="text-sm font-bold text-white">{t.budgetAnalysis}</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: t.avgCampaignBudget, value: formatPoints(stats.avgCampaignBudget) },
                { label: t.activeCampaigns, value: String(stats.activeCampaigns) },
                { label: t.completedCampaigns, value: String(stats.completedCampaigns) },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-dark-500/30 last:border-0">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ROI Tab */}
      {activeTab === 'roi' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-secondary/15 to-dark-700 border-2 border-secondary/20 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className="text-secondary" />
              </div>
              <div>
                <div className="text-xs text-gray-400">{t.avgROI}</div>
                <div className="text-3xl font-bold text-secondary">{stats.avgROI}x</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 pt-3 border-t border-dark-500/50">
              {language === 'ko'
                ? `평균 +${((stats.avgROI - 1) * 100).toFixed(0)}% 수익`
                : `Trung bình +${((stats.avgROI - 1) * 100).toFixed(0)}% lợi nhuận`}
            </div>
          </div>

          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-secondary to-accent rounded-full" />
              <h3 className="text-sm font-bold text-white">{t.roiAnalysis}</h3>
            </div>
            <p className="text-sm text-gray-400">{t.roiDesc}</p>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-4">
          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-gradient-to-b from-accent to-primary rounded-full" />
              <h3 className="text-sm font-bold text-white">{t.overallPerformance}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-700/50 rounded-xl p-3 border border-dark-400/30">
                <div className="text-xs text-gray-500 mb-1">{t.totalReach}</div>
                <div className="text-xl font-bold text-accent">{(stats.totalReach / 1000).toFixed(0)}K</div>
              </div>
              <div className="bg-dark-700/50 rounded-xl p-3 border border-dark-400/30">
                <div className="text-xs text-gray-500 mb-1">{t.totalInfluencers}</div>
                <div className="text-xl font-bold text-primary">{stats.totalInfluencers}</div>
              </div>
            </div>
          </div>

          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" />
              <h3 className="text-sm font-bold text-white">{t.topPerformingCampaigns}</h3>
            </div>
            <p className="text-sm text-gray-400">{t.performanceDesc}</p>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-4 shadow-xl">
        <div className="flex gap-3">
          <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">{t.dataInfo}</h4>
            <p className="text-xs text-gray-400">{t.dataInfoDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

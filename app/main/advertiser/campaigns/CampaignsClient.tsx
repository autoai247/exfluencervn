'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  TrendingUp,
  Clock,
  ChevronRight,
  Search,
  DollarSign,
  Users,
  Eye,
} from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

// Mock data
const mockCampaigns = [
  {
    id: '1',
    titleKo: '신규 스킨케어 제품 리뷰 캠페인',
    titleVi: 'Chiến dịch review sản phẩm skincare mới',
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
    titleKo: '봄 신상 메이크업 프로모션',
    titleVi: 'Khuyến mãi makeup BST mới mùa xuân',
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
    titleKo: '겨울 스킨케어 루틴 캠페인',
    titleVi: 'Chiến dịch skincare routine mùa đông',
    status: 'completed',
    budget: 1800000,
    spent: 1800000,
    applicants: 31,
    accepted: 10,
    views: 250000,
    deadline: '2026-02-10',
    createdAt: '2026-01-15',
  },
  {
    id: '4',
    titleKo: '여름 선크림 체험단 모집',
    titleVi: 'Tuyển thành viên trải nghiệm kem chống nắng mùa hè',
    status: 'draft',
    budget: 2500000,
    spent: 0,
    applicants: 0,
    accepted: 0,
    views: 0,
    deadline: '2026-04-01',
    createdAt: '2026-02-10',
  },
];

type StatusType = 'all' | 'active' | 'completed' | 'draft';

const statusConfig = {
  active: { color: 'bg-success/20 text-success border border-success/30', dot: 'bg-success' },
  completed: { color: 'bg-secondary/20 text-secondary border border-secondary/30', dot: 'bg-secondary' },
  draft: { color: 'bg-gray-500/20 text-gray-400 border border-gray-500/30', dot: 'bg-gray-500' },
};

export default function CampaignsClient() {
  const { language } = useLanguage();
  const t = translations[language].advertiser.campaigns;
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as StatusType | null;

  const [activeTab, setActiveTab] = useState<StatusType>(statusParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCampaigns = mockCampaigns.filter((c) => {
    const matchesStatus = activeTab === 'all' || c.status === activeTab;
    const title = language === 'ko' ? c.titleKo : c.titleVi;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    all: mockCampaigns.length,
    active: mockCampaigns.filter((c) => c.status === 'active').length,
    completed: mockCampaigns.filter((c) => c.status === 'completed').length,
    draft: mockCampaigns.filter((c) => c.status === 'draft').length,
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t.active;
      case 'completed': return t.completed;
      case 'draft': return t.draft;
      default: return status;
    }
  };

  useKeyboardShortcuts([
    {
      key: '/',
      action: () => { searchInputRef.current?.focus(); },
      description: 'Focus search input'
    },
    {
      key: 'Escape',
      action: () => {
        if (searchQuery) {
          setSearchQuery('');
          searchInputRef.current?.blur();
        }
      },
      description: 'Clear search'
    }
  ]);

  return (
    <div className="container-mobile py-6 space-y-5">
      {/* Create Campaign Button */}
      <Link href="/main/advertiser/campaigns/create">
        <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95">
          <Plus size={20} />
          {t.createCampaign}
        </button>
      </Link>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.search}
          className="w-full pl-11 pr-4 py-3 bg-dark-600/80 border border-dark-400/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'active', 'completed', 'draft'] as StatusType[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === status
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40 hover:border-primary/30'
            }`}
          >
            {t[status]} ({stats[status]})
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 rounded-2xl text-center py-12 px-6 shadow-xl">
            <TrendingUp size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">{t.noCampaigns}</h3>
            <p className="text-sm text-gray-400 mb-6">{t.createFirst}</p>
            <Link href="/main/advertiser/campaigns/create">
              <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-xl transition-all inline-flex items-center gap-2">
                <Plus size={18} />
                {t.createCampaign}
              </button>
            </Link>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => {
            const config = statusConfig[campaign.status as keyof typeof statusConfig] || statusConfig.draft;
            const budgetPct = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;

            return (
              <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                <div className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 hover:border-primary/30 rounded-2xl p-4 transition-all cursor-pointer shadow-xl hover:shadow-primary/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-3">
                      <h4 className="font-bold text-white mb-1 leading-tight">{language === 'ko' ? campaign.titleKo : campaign.titleVi}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock size={11} />
                        {t.deadline}: {campaign.deadline}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 ${config.color} text-xs font-bold rounded-full whitespace-nowrap flex items-center gap-1.5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {getStatusText(campaign.status)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status !== 'draft' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">{t.budget} {t.budgetUsed}</span>
                        <span className="text-white font-bold">{budgetPct.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-dark-500 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                          style={{ width: `${budgetPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-gray-500">{formatPoints(campaign.spent)}</span>
                        <span className="text-gray-500">{formatPoints(campaign.budget)}</span>
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2.5 bg-dark-700/50 rounded-xl border border-dark-400/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users size={12} className="text-primary" />
                      </div>
                      <div className="font-bold text-white">{campaign.applicants}</div>
                      <div className="text-gray-500 mt-0.5">{t.applicants}</div>
                    </div>
                    <div className="text-center p-2.5 bg-dark-700/50 rounded-xl border border-dark-400/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <DollarSign size={12} className="text-success" />
                      </div>
                      <div className="font-bold text-white">{campaign.accepted}</div>
                      <div className="text-gray-500 mt-0.5">{t.accepted}</div>
                    </div>
                    <div className="text-center p-2.5 bg-dark-700/50 rounded-xl border border-dark-400/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Eye size={12} className="text-secondary" />
                      </div>
                      <div className="font-bold text-white">
                        {campaign.views > 0 ? `${(campaign.views / 1000).toFixed(0)}K` : '0'}
                      </div>
                      <div className="text-gray-500 mt-0.5">{t.views}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-500/50">
                    <span className="text-xs text-gray-500">{t.viewDetails}</span>
                    <ChevronRight size={16} className="text-gray-500" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

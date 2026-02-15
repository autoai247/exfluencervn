'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  TrendingUp,
  Clock,
  ChevronRight,
  Search,
} from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data
const mockCampaigns = [
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
  {
    id: '4',
    title: '여름 선크림 체험단 모집',
    status: 'draft',
    budget: 2500000,
    spent: 0,
    applicants: 0,
    accepted: 0,
    views: 0,
    deadline: '2024-04-01',
    createdAt: '2024-02-10',
  },
];

type StatusType = 'all' | 'active' | 'completed' | 'draft';

export default function CampaignsClient() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as StatusType | null;

  const [activeTab, setActiveTab] = useState<StatusType>(statusParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    ko: {
      createCampaign: '새 캠페인 만들기',
      search: '캠페인 검색...',
      all: '전체',
      active: '진행중',
      completed: '완료',
      draft: '임시저장',
      budget: '예산',
      spent: '사용',
      applicants: '지원자',
      accepted: '승인',
      views: '조회수',
      deadline: '마감',
      noCampaigns: '캠페인이 없습니다',
      createFirst: '첫 번째 캠페인을 만들어보세요',
    },
    vi: {
      createCampaign: 'Tạo chiến dịch mới',
      search: 'Tìm kiếm chiến dịch...',
      all: 'Tất cả',
      active: 'Đang chạy',
      completed: 'Hoàn thành',
      draft: 'Nháp',
      budget: 'Ngân sách',
      spent: 'Đã dùng',
      applicants: 'Ứng viên',
      accepted: 'Chấp nhận',
      views: 'Lượt xem',
      deadline: 'Hạn chót',
      noCampaigns: 'Không có chiến dịch',
      createFirst: 'Tạo chiến dịch đầu tiên của bạn',
    },
  };

  const text = t[language];

  const filteredCampaigns = mockCampaigns.filter((c) => {
    const matchesStatus = activeTab === 'all' || c.status === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    all: mockCampaigns.length,
    active: mockCampaigns.filter((c) => c.status === 'active').length,
    completed: mockCampaigns.filter((c) => c.status === 'completed').length,
    draft: mockCampaigns.filter((c) => c.status === 'draft').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gray-900 text-white';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'draft':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return language === 'ko' ? '진행중' : 'Đang chạy';
      case 'completed':
        return language === 'ko' ? '완료' : 'Hoàn thành';
      case 'draft':
        return language === 'ko' ? '임시저장' : 'Nháp';
      default:
        return status;
    }
  };

  return (
    <div className="container-mobile py-6 space-y-6">
      {/* Create Campaign Button */}
      <Link href="/main/advertiser/campaigns/create">
        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center">
          <Plus size={20} className="mr-2" />
          {text.createCampaign}
        </button>
      </Link>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={text.search}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'active', 'completed', 'draft'] as StatusType[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeTab === status
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {text[status]} ({stats[status]})
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {filteredCampaigns.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg text-center py-12 px-6">
            <TrendingUp size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{text.noCampaigns}</h3>
            <p className="text-sm text-gray-500 mb-6">{text.createFirst}</p>
            <Link href="/main/advertiser/campaigns/create">
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center">
                <Plus size={18} className="mr-2" />
                {text.createCampaign}
              </button>
            </Link>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
              <div className="bg-white border border-gray-200 hover:border-gray-900 rounded-lg p-4 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      {text.deadline}: {campaign.deadline}
                    </div>
                  </div>
                  <span className={`px-3 py-1 ${getStatusColor(campaign.status)} text-xs font-medium rounded-full whitespace-nowrap ml-2`}>
                    {getStatusText(campaign.status)}
                  </span>
                </div>

                {/* Progress Bar */}
                {campaign.status !== 'draft' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500">{text.budget} {language === 'ko' ? '사용' : 'sử dụng'}</span>
                      <span className="text-gray-900 font-semibold">
                        {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1.5">
                      <span className="text-gray-400">{formatPoints(campaign.spent)}</span>
                      <span className="text-gray-400">{formatPoints(campaign.budget)}</span>
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="font-semibold text-gray-900">{campaign.applicants}</div>
                    <div className="text-gray-500 mt-1">{text.applicants}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="font-semibold text-gray-900">{campaign.accepted}</div>
                    <div className="text-gray-500 mt-1">{text.accepted}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="font-semibold text-gray-900">
                      {campaign.views > 0 ? `${(campaign.views / 1000).toFixed(0)}K` : '0'}
                    </div>
                    <div className="text-gray-500 mt-1">{text.views}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {language === 'ko' ? '상세 정보 보기' : 'Xem chi tiết'}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

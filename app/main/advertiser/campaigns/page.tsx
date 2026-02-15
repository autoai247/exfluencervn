'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Clock,
  CheckCircle,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
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

export default function AdvertiserCampaignsPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as StatusType | null;

  const [activeTab, setActiveTab] = useState<StatusType>(statusParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    ko: {
      title: '캠페인 관리',
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
      createFirst: '첫 번째 캠페인을 만들어보세요!',
    },
    vi: {
      title: 'Quản lý chiến dịch',
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
      createFirst: 'Tạo chiến dịch đầu tiên của bạn!',
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
        return 'bg-secondary/20 text-secondary';
      case 'completed':
        return 'bg-success/20 text-success';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-primary/20 text-primary';
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
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={text.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Create Campaign Button */}
        <Link href="/main/advertiser/campaigns/create">
          <button className="btn btn-primary w-full text-base py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark">
            <Plus size={20} className="mr-2" />
            🚀 {text.createCampaign}
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
            className="input pl-12"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'active', 'completed', 'draft'] as StatusType[]).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTab === status
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
              }`}
            >
              {text[status]} ({stats[status]})
            </button>
          ))}
        </div>

        {/* Campaigns List */}
        <div className="space-y-3">
          {filteredCampaigns.length === 0 ? (
            <div className="card text-center py-12">
              <TrendingUp size={48} className="text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{text.noCampaigns}</h3>
              <p className="text-sm text-gray-400 mb-4">{text.createFirst}</p>
              <Link href="/main/advertiser/campaigns/create">
                <button className="btn btn-primary">
                  <Plus size={18} className="mr-2" />
                  {text.createCampaign}
                </button>
              </Link>
            </div>
          ) : (
            filteredCampaigns.map((campaign) => (
              <Link key={campaign.id} href={`/main/advertiser/campaigns/${campaign.id}`}>
                <div className="card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{campaign.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} />
                        {text.deadline}: {campaign.deadline}
                      </div>
                    </div>
                    <span className={`px-3 py-1 ${getStatusColor(campaign.status)} text-xs rounded-full whitespace-nowrap ml-2`}>
                      {getStatusText(campaign.status)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {campaign.status !== 'draft' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{text.budget} {language === 'ko' ? '사용' : 'sử dụng'}</span>
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
                        <span className="text-gray-500">{formatPoints(campaign.spent)}</span>
                        <span className="text-gray-500">{formatPoints(campaign.budget)}</span>
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-dark-600 rounded-lg">
                      <div className="font-semibold text-white">{campaign.applicants}</div>
                      <div className="text-gray-400">{text.applicants}</div>
                    </div>
                    <div className="text-center p-2 bg-dark-600 rounded-lg">
                      <div className="font-semibold text-white">{campaign.accepted}</div>
                      <div className="text-gray-400">{text.accepted}</div>
                    </div>
                    <div className="text-center p-2 bg-dark-600 rounded-lg">
                      <div className="font-semibold text-white">
                        {campaign.views > 0 ? `${(campaign.views / 1000).toFixed(0)}K` : '0'}
                      </div>
                      <div className="text-gray-400">{text.views}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-500">
                    <span className="text-xs text-gray-500">
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

      <BottomNav userType="advertiser" />
    </div>
  );
}

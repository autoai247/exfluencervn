'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Megaphone,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import type { UserType, UserStatus, CampaignStatus } from '@/types';

// Mock data for demonstration
const mockStats = {
  totalUsers: 1248,
  activeInfluencers: 856,
  activeAdvertisers: 392,
  totalCampaigns: 523,
  activeCampaigns: 89,
  pendingCampaigns: 23,
  totalTransactions: 15234,
  totalRevenue: 2456789000, // VND
  pendingWithdrawals: 15,
  flaggedUsers: 7,
};

const mockUsers = [
  {
    id: 'U001',
    email: 'nguyenvana@gmail.com',
    name: '응우옌 반 A',
    userType: 'influencer' as UserType,
    status: 'active' as UserStatus,
    totalEarnings: 15000000,
    campaigns: 25,
    rating: 4.8,
    createdAt: '2024-01-15',
  },
  {
    id: 'U002',
    email: 'shopfashion@gmail.com',
    name: 'Fashion Shop VN',
    userType: 'advertiser' as UserType,
    status: 'active' as UserStatus,
    totalSpent: 45000000,
    campaigns: 12,
    rating: 4.5,
    createdAt: '2024-01-20',
  },
  {
    id: 'U003',
    email: 'tranthib@gmail.com',
    name: '짠 티 B',
    userType: 'influencer' as UserType,
    status: 'suspended' as UserStatus,
    totalEarnings: 2000000,
    campaigns: 3,
    rating: 3.2,
    createdAt: '2024-02-01',
  },
  {
    id: 'U004',
    email: 'beautystore@gmail.com',
    name: 'Beauty Store HCMC',
    userType: 'advertiser' as UserType,
    status: 'active' as UserStatus,
    totalSpent: 28000000,
    campaigns: 8,
    rating: 4.9,
    createdAt: '2024-01-10',
  },
];

const mockCampaigns = [
  {
    id: 'C001',
    title: '봄 패션 컬렉션 홍보',
    advertiser: 'Fashion Shop VN',
    budget: 5000000,
    influencers: 5,
    status: 'pending' as CampaignStatus,
    createdAt: '2024-02-10',
  },
  {
    id: 'C002',
    title: '뷰티 제품 리뷰',
    advertiser: 'Beauty Store HCMC',
    budget: 3000000,
    influencers: 3,
    status: 'in_progress' as CampaignStatus,
    createdAt: '2024-02-08',
  },
  {
    id: 'C003',
    title: '식당 신메뉴 홍보',
    advertiser: 'Pho Restaurant',
    budget: 2000000,
    influencers: 2,
    status: 'pending' as CampaignStatus,
    createdAt: '2024-02-11',
  },
];

const mockWithdrawals = [
  {
    id: 'W001',
    user: '응우옌 반 A',
    amount: 5000000,
    fee: 100000,
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    status: 'pending',
    createdAt: '2024-02-11 14:30',
  },
  {
    id: 'W002',
    user: '짠 티 B',
    amount: 1000000,
    fee: 20000,
    bankName: 'Techcombank',
    accountNumber: '0987654321',
    status: 'pending',
    createdAt: '2024-02-11 10:15',
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'campaigns' | 'withdrawals'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + ' VND';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const getUserStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'suspended': return 'text-error';
      case 'banned': return 'text-error';
      default: return 'text-gray-400';
    }
  };

  const getCampaignStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'published': return 'text-primary';
      case 'in_progress': return 'text-warning';
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-gray-400';
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case 'influencer': return '인플루언서';
      case 'advertiser': return '광고주';
      case 'admin': return '관리자';
      default: return type;
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case 'active': return '활성';
      case 'pending': return '대기';
      case 'suspended': return '정지';
      case 'banned': return '차단';
      default: return status;
    }
  };

  const getCampaignStatusLabel = (status: CampaignStatus) => {
    switch (status) {
      case 'draft': return '초안';
      case 'published': return '게시됨';
      case 'in_progress': return '진행중';
      case 'completed': return '완료';
      case 'pending': return '승인대기';
      case 'cancelled': return '취소';
      default: return status;
    }
  };

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">관리자 대시보드</h1>
              <p className="text-sm text-gray-400">Exfluencer VN Admin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-14 z-9 bg-dark-700 border-b border-dark-500 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
              }`}
            >
              개요
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'users'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
              }`}
            >
              사용자 관리
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
              }`}
            >
              캠페인 승인
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'withdrawals'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
              }`}
            >
              출금 관리
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-primary" />
                    <span className="text-xs text-gray-400">전체 사용자</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.totalUsers)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="text-success">+12%</span> vs 지난달
                  </div>
                </div>

                <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck size={20} className="text-secondary" />
                    <span className="text-xs text-gray-400">인플루언서</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.activeInfluencers)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="text-success">+8%</span> vs 지난달
                  </div>
                </div>

                <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone size={20} className="text-warning" />
                    <span className="text-xs text-gray-400">전체 캠페인</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.totalCampaigns)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    활성: {mockStats.activeCampaigns}개
                  </div>
                </div>

                <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-success" />
                    <span className="text-xs text-gray-400">총 거래액</span>
                  </div>
                  <div className="text-lg font-bold text-white">{formatNumber(mockStats.totalRevenue / 1000000)}M</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="text-success">+15%</span> vs 지난달
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">알림 & 대기 항목</h3>

                <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">승인 대기 중인 캠페인</h4>
                      <p className="text-sm text-gray-300">{mockStats.pendingCampaigns}개의 캠페인이 승인을 기다리고 있습니다.</p>
                      <button
                        onClick={() => setActiveTab('campaigns')}
                        className="text-sm text-warning font-semibold mt-2 hover:underline"
                      >
                        확인하기 →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <DollarSign size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">출금 요청</h4>
                      <p className="text-sm text-gray-300">{mockStats.pendingWithdrawals}건의 출금 요청이 처리 대기 중입니다.</p>
                      <button
                        onClick={() => setActiveTab('withdrawals')}
                        className="text-sm text-primary font-semibold mt-2 hover:underline"
                      >
                        처리하기 →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-error/10 border border-error/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Ban size={20} className="text-error flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">신고된 사용자</h4>
                      <p className="text-sm text-gray-300">{mockStats.flaggedUsers}명의 사용자가 신고되었습니다.</p>
                      <button
                        onClick={() => setActiveTab('users')}
                        className="text-sm text-error font-semibold mt-2 hover:underline"
                      >
                        조사하기 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">최근 활동</h3>
                <div className="space-y-2">
                  <div className="bg-dark-600 rounded-lg p-3 border border-dark-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-white">새로운 인플루언서 가입</p>
                        <p className="text-xs text-gray-400 mt-1">nguyenthic@gmail.com • 5분 전</p>
                      </div>
                      <UserCheck size={18} className="text-success" />
                    </div>
                  </div>

                  <div className="bg-dark-600 rounded-lg p-3 border border-dark-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-white">캠페인 생성 요청</p>
                        <p className="text-xs text-gray-400 mt-1">Fashion Shop VN • 15분 전</p>
                      </div>
                      <Megaphone size={18} className="text-warning" />
                    </div>
                  </div>

                  <div className="bg-dark-600 rounded-lg p-3 border border-dark-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-white">출금 요청</p>
                        <p className="text-xs text-gray-400 mt-1">응우옌 반 A • 5,000,000 VND • 1시간 전</p>
                      </div>
                      <DollarSign size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="사용자 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 pr-4"
                  />
                </div>
                <button className="btn-icon bg-dark-600 border-dark-500">
                  <Filter size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <div key={user.id} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{user.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            user.userType === 'influencer'
                              ? 'bg-secondary/20 text-secondary'
                              : 'bg-primary/20 text-primary'
                          }`}>
                            {getUserTypeLabel(user.userType)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {user.id} • 가입: {user.createdAt}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        user.status === 'active'
                          ? 'bg-success/20 text-success'
                          : user.status === 'suspended'
                          ? 'bg-error/20 text-error'
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {getStatusLabel(user.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">캠페인</p>
                        <p className="text-sm font-semibold text-white">{user.campaigns}개</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">평점</p>
                        <p className="text-sm font-semibold text-white">⭐ {user.rating}</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">
                          {user.userType === 'influencer' ? '수익' : '지출'}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {formatNumber((user.totalEarnings || user.totalSpent || 0) / 1000000)}M
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/main/admin/users/${user.id}`}
                        className="flex-1 py-2 bg-dark-700 hover:bg-dark-500 rounded-lg text-xs font-medium text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={14} />
                        상세보기
                      </Link>
                      {user.status === 'active' ? (
                        <button className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1">
                          <Ban size={14} />
                          계정정지
                        </button>
                      ) : (
                        <button className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1">
                          <CheckCircle size={14} />
                          정지해제
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <>
              <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-white font-semibold mb-1">승인 대기 중</p>
                <p className="text-xs text-gray-300">{mockCampaigns.filter(c => c.status === 'pending').length}개의 캠페인이 검토를 기다리고 있습니다.</p>
              </div>

              <div className="space-y-3">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{campaign.title}</h4>
                        <p className="text-xs text-gray-400">{campaign.advertiser}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {campaign.id} • 생성: {campaign.createdAt}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        campaign.status === 'pending'
                          ? 'bg-warning/20 text-warning'
                          : campaign.status === 'in_progress'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-success/20 text-success'
                      }`}>
                        {getCampaignStatusLabel(campaign.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">예산</p>
                        <p className="text-sm font-semibold text-white">{formatNumber(campaign.budget / 1000000)}M VND</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">인플루언서</p>
                        <p className="text-sm font-semibold text-white">{campaign.influencers}명</p>
                      </div>
                    </div>

                    {campaign.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1">
                          <CheckCircle size={14} />
                          승인
                        </button>
                        <button className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1">
                          <XCircle size={14} />
                          거부
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Withdrawals Tab */}
          {activeTab === 'withdrawals' && (
            <>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-white font-semibold mb-1">출금 요청 처리</p>
                <p className="text-xs text-gray-300">{mockWithdrawals.filter(w => w.status === 'pending').length}건의 출금 요청을 검토해주세요.</p>
              </div>

              <div className="space-y-3">
                {mockWithdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{withdrawal.user}</h4>
                        <p className="text-xs text-gray-400">요청 시간: {withdrawal.createdAt}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {withdrawal.id}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-lg bg-warning/20 text-warning">
                        대기중
                      </span>
                    </div>

                    <div className="bg-dark-700 rounded-lg p-3 mb-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">출금 금액</span>
                        <span className="text-white font-semibold">{formatCurrency(withdrawal.amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">수수료 (2%)</span>
                        <span className="text-error">-{formatCurrency(withdrawal.fee)}</span>
                      </div>
                      <div className="border-t border-dark-500 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">실수령액</span>
                          <span className="text-success font-bold">{formatCurrency(withdrawal.amount - withdrawal.fee)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-dark-700 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2">입금 정보</p>
                      <p className="text-sm text-white font-medium mb-1">{withdrawal.bankName}</p>
                      <p className="text-xs text-gray-300">{withdrawal.accountNumber}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1">
                        <CheckCircle size={14} />
                        송금 완료
                      </button>
                      <button className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1">
                        <XCircle size={14} />
                        거부
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

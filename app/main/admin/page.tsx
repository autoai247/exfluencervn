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
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'campaigns' | 'withdrawals'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [userTypeFilter, setUserTypeFilter] = useState<'all' | 'influencer' | 'advertiser'>('all');

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'suspended' as UserStatus } : u));
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'active' as UserStatus } : u));
  };

  const handleApproveCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: 'published' as CampaignStatus } : c));
  };

  const handleRejectCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: 'cancelled' as CampaignStatus } : c));
  };

  const handleApproveWithdrawal = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => w.id === withdrawalId ? { ...w, status: 'completed' } : w));
  };

  const handleRejectWithdrawal = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => w.id === withdrawalId ? { ...w, status: 'rejected' } : w));
  };

  const cycleUserTypeFilter = () => {
    setUserTypeFilter(prev => prev === 'all' ? 'influencer' : prev === 'influencer' ? 'advertiser' : 'all');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ko' ? 'ko-KR' : 'vi-VN').format(amount) + ' VND';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'ko' ? 'ko-KR' : 'vi-VN').format(num);
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
    if (language === 'ko') {
      switch (type) {
        case 'influencer': return '인플루언서';
        case 'advertiser': return '광고주';
        case 'admin': return '관리자';
        default: return type;
      }
    } else {
      switch (type) {
        case 'influencer': return 'Influencer';
        case 'advertiser': return 'Nhà QC';
        case 'admin': return 'Quản trị viên';
        default: return type;
      }
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    if (language === 'ko') {
      switch (status) {
        case 'active': return '활성';
        case 'pending': return '대기';
        case 'suspended': return '정지';
        case 'banned': return '차단';
        default: return status;
      }
    } else {
      switch (status) {
        case 'active': return 'Hoạt động';
        case 'pending': return 'Chờ duyệt';
        case 'suspended': return 'Tạm đình chỉ';
        case 'banned': return 'Bị chặn';
        default: return status;
      }
    }
  };

  const getCampaignStatusLabel = (status: CampaignStatus) => {
    if (language === 'ko') {
      switch (status) {
        case 'draft': return '초안';
        case 'published': return '게시됨';
        case 'in_progress': return '진행중';
        case 'completed': return '완료';
        case 'pending': return '승인대기';
        case 'cancelled': return '취소';
        default: return status;
      }
    } else {
      switch (status) {
        case 'draft': return 'Bản nháp';
        case 'published': return 'Đã đăng';
        case 'in_progress': return 'Đang tiến hành';
        case 'completed': return 'Hoàn thành';
        case 'pending': return 'Chờ duyệt';
        case 'cancelled': return 'Đã hủy';
        default: return status;
      }
    }
  };

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-dark-500/50 px-4 py-4 relative" style={{background: 'linear-gradient(135deg, #1A1A2E 0%, #25253A 100%)'}}>
          {/* 상단 그라디언트 라인 */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{language === 'ko' ? '관리자 대시보드' : 'Bảng quản trị'}</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
                Exfluencer VN Admin
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[73px] z-9 bg-dark-700/95 backdrop-blur-xl border-b border-dark-500/50 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
            {[
              { key: 'overview', ko: '개요', vi: 'Tổng quan' },
              { key: 'users', ko: '사용자', vi: 'Người dùng' },
              { key: 'campaigns', ko: '캠페인', vi: 'Chiến dịch' },
              { key: 'withdrawals', ko: '출금', vi: 'Rút tiền' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25'
                    : 'bg-dark-600/50 text-gray-400 hover:bg-dark-500/60 hover:text-white'
                }`}
              >
                {language === 'ko' ? tab.ko : tab.vi}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-4 border border-primary/20 shadow-lg shadow-primary/5" style={{background: 'linear-gradient(135deg, rgba(255,107,107,0.12) 0%, rgba(37,37,58,0.9) 100%)'}}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Users size={18} className="text-primary" />
                    </div>
                    <span className="text-xs text-gray-400">{language === 'ko' ? '전체 사용자' : 'Tổng người dùng'}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.totalUsers)}</div>
                  <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                    <span className="text-success font-semibold">↑ 12%</span>
                    <span>{language === 'ko' ? 'vs 지난달' : 'vs tháng trước'}</span>
                  </div>
                </div>

                <div className="rounded-2xl p-4 border border-secondary/20 shadow-lg shadow-secondary/5" style={{background: 'linear-gradient(135deg, rgba(78,205,196,0.12) 0%, rgba(37,37,58,0.9) 100%)'}}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <UserCheck size={18} className="text-secondary" />
                    </div>
                    <span className="text-xs text-gray-400">{language === 'ko' ? '인플루언서' : 'Influencer'}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.activeInfluencers)}</div>
                  <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                    <span className="text-success font-semibold">↑ 8%</span>
                    <span>{language === 'ko' ? 'vs 지난달' : 'vs tháng trước'}</span>
                  </div>
                </div>

                <div className="rounded-2xl p-4 border border-warning/20 shadow-lg shadow-warning/5" style={{background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(37,37,58,0.9) 100%)'}}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-warning/20 flex items-center justify-center">
                      <Megaphone size={18} className="text-warning" />
                    </div>
                    <span className="text-xs text-gray-400">{language === 'ko' ? '전체 캠페인' : 'Tổng chiến dịch'}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatNumber(mockStats.totalCampaigns)}</div>
                  <div className="text-xs text-gray-500 mt-1.5">
                    {language === 'ko' ? `활성 ${mockStats.activeCampaigns}개` : `Hoạt động: ${mockStats.activeCampaigns}`}
                  </div>
                </div>

                <div className="rounded-2xl p-4 border border-success/20 shadow-lg shadow-success/5" style={{background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(37,37,58,0.9) 100%)'}}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-success/20 flex items-center justify-center">
                      <DollarSign size={18} className="text-success" />
                    </div>
                    <span className="text-xs text-gray-400">{language === 'ko' ? '총 거래액' : 'Tổng giao dịch'}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{formatNumber(mockStats.totalRevenue / 1000000)}M VND</div>
                  <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                    <span className="text-success font-semibold">↑ 15%</span>
                    <span>{language === 'ko' ? 'vs 지난달' : 'vs tháng trước'}</span>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-warning to-primary rounded-full" />
                  <h3 className="text-sm font-bold text-white">{language === 'ko' ? '알림 & 대기 항목' : 'Thông báo & Mục chờ'}</h3>
                </div>

                <button onClick={() => setActiveTab('campaigns')} className="w-full text-left rounded-2xl border border-warning/25 p-4 hover:border-warning/40 transition-all" style={{background: 'linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(37,37,58,0.8) 100%)'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={20} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{language === 'ko' ? '승인 대기 중인 캠페인' : 'Chiến dịch chờ duyệt'}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {language === 'ko' ? `${mockStats.pendingCampaigns}개 대기 중` : `${mockStats.pendingCampaigns} đang chờ`}
                      </p>
                    </div>
                    <span className="text-xs text-warning font-bold px-2 py-1 bg-warning/10 rounded-lg">
                      {mockStats.pendingCampaigns}
                    </span>
                  </div>
                </button>

                <button onClick={() => setActiveTab('withdrawals')} className="w-full text-left rounded-2xl border border-primary/25 p-4 hover:border-primary/40 transition-all" style={{background: 'linear-gradient(135deg, rgba(255,107,107,0.10) 0%, rgba(37,37,58,0.8) 100%)'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{language === 'ko' ? '출금 요청' : 'Yêu cầu rút tiền'}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {language === 'ko' ? `${mockStats.pendingWithdrawals}건 처리 대기` : `${mockStats.pendingWithdrawals} đang chờ xử lý`}
                      </p>
                    </div>
                    <span className="text-xs text-primary font-bold px-2 py-1 bg-primary/10 rounded-lg">
                      {mockStats.pendingWithdrawals}
                    </span>
                  </div>
                </button>

                <button onClick={() => setActiveTab('users')} className="w-full text-left rounded-2xl border border-error/25 p-4 hover:border-error/40 transition-all" style={{background: 'linear-gradient(135deg, rgba(239,68,68,0.10) 0%, rgba(37,37,58,0.8) 100%)'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center flex-shrink-0">
                      <Ban size={20} className="text-error" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{language === 'ko' ? '신고된 사용자' : 'Người dùng bị báo cáo'}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {language === 'ko' ? `${mockStats.flaggedUsers}명 신고됨` : `${mockStats.flaggedUsers} người đã bị báo cáo`}
                      </p>
                    </div>
                    <span className="text-xs text-error font-bold px-2 py-1 bg-error/10 rounded-lg">
                      {mockStats.flaggedUsers}
                    </span>
                  </div>
                </button>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-secondary to-primary rounded-full" />
                  <h3 className="text-sm font-bold text-white">{language === 'ko' ? '최근 활동' : 'Hoạt động gần đây'}</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: UserCheck, color: 'success', title: language === 'ko' ? '새로운 인플루언서 가입' : 'Influencer mới đăng ký', sub: `nguyenthic@gmail.com • ${language === 'ko' ? '5분 전' : '5 phút trước'}` },
                    { icon: Megaphone, color: 'warning', title: language === 'ko' ? '캠페인 생성 요청' : 'Yêu cầu tạo chiến dịch', sub: `Fashion Shop VN • ${language === 'ko' ? '15분 전' : '15 phút trước'}` },
                    { icon: DollarSign, color: 'primary', title: language === 'ko' ? '출금 요청' : 'Yêu cầu rút tiền', sub: `응우옌 반 A • 5,000,000 VND • ${language === 'ko' ? '1시간 전' : '1 giờ trước'}` },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-dark-600/60 backdrop-blur-sm rounded-xl p-3 border border-dark-400/40 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-${item.color}/15`}>
                        <item.icon size={16} className={`text-${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{item.sub}</p>
                      </div>
                    </div>
                  ))}
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
                    placeholder={language === 'ko' ? '사용자 검색...' : 'Tìm kiếm người dùng...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 pr-4"
                  />
                </div>
                <button
                  onClick={cycleUserTypeFilter}
                  className={`btn-icon border transition-colors ${
                    userTypeFilter === 'all'
                      ? 'bg-dark-600 border-dark-500 text-gray-400'
                      : userTypeFilter === 'influencer'
                      ? 'bg-secondary/20 border-secondary text-secondary'
                      : 'bg-primary/20 border-primary text-primary'
                  }`}
                  title={
                    userTypeFilter === 'all'
                      ? (language === 'ko' ? '전체' : 'Tất cả')
                      : userTypeFilter === 'influencer'
                      ? (language === 'ko' ? '인플루언서만' : 'Influencer')
                      : (language === 'ko' ? '광고주만' : 'Nhà QC')
                  }
                >
                  <Filter size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {filteredUsers.map((user) => (
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
                        <p className="text-xs text-gray-500 mt-1">ID: {user.id} • {language === 'ko' ? '가입' : 'Ngày tham gia'}: {user.createdAt}</p>
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
                        <p className="text-xs text-gray-400">{language === 'ko' ? '캠페인' : 'Chiến dịch'}</p>
                        <p className="text-sm font-semibold text-white">{language === 'ko' ? `${user.campaigns}개` : user.campaigns}</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">{language === 'ko' ? '평점' : 'Đánh giá'}</p>
                        <p className="text-sm font-semibold text-white">⭐ {user.rating}</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">
                          {user.userType === 'influencer' ? (language === 'ko' ? '수익' : 'Thu nhập') : (language === 'ko' ? '지출' : 'Chi tiêu')}
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
                        {language === 'ko' ? '상세보기' : 'Xem chi tiết'}
                      </Link>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1"
                        >
                          <Ban size={14} />
                          {language === 'ko' ? '계정정지' : 'Đình chỉ'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={14} />
                          {language === 'ko' ? '정지해제' : 'Bỏ đình chỉ'}
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
                <p className="text-sm text-white font-semibold mb-1">{language === 'ko' ? '승인 대기 중' : 'Đang chờ duyệt'}</p>
                <p className="text-xs text-gray-300">
                  {language === 'ko'
                    ? `${mockCampaigns.filter(c => c.status === 'pending').length}개의 캠페인이 검토를 기다리고 있습니다.`
                    : `${mockCampaigns.filter(c => c.status === 'pending').length} chiến dịch đang chờ xem xét.`}
                </p>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{campaign.title}</h4>
                        <p className="text-xs text-gray-400">{campaign.advertiser}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {campaign.id} • {language === 'ko' ? '생성' : 'Ngày tạo'}: {campaign.createdAt}</p>
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
                        <p className="text-xs text-gray-400">{language === 'ko' ? '예산' : 'Ngân sách'}</p>
                        <p className="text-sm font-semibold text-white">{formatNumber(campaign.budget / 1000000)}M VND</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">{language === 'ko' ? '인플루언서' : 'Influencer'}</p>
                        <p className="text-sm font-semibold text-white">{language === 'ko' ? `${campaign.influencers}명` : campaign.influencers}</p>
                      </div>
                    </div>

                    {campaign.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveCampaign(campaign.id)}
                          className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={14} />
                          {language === 'ko' ? '승인' : 'Duyệt'}
                        </button>
                        <button
                          onClick={() => handleRejectCampaign(campaign.id)}
                          className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1"
                        >
                          <XCircle size={14} />
                          {language === 'ko' ? '거부' : 'Từ chối'}
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
                <p className="text-sm text-white font-semibold mb-1">{language === 'ko' ? '출금 요청 처리' : 'Xử lý yêu cầu rút tiền'}</p>
                <p className="text-xs text-gray-300">
                  {language === 'ko'
                    ? `${mockWithdrawals.filter(w => w.status === 'pending').length}건의 출금 요청을 검토해주세요.`
                    : `Vui lòng xem xét ${mockWithdrawals.filter(w => w.status === 'pending').length} yêu cầu rút tiền.`}
                </p>
              </div>

              <div className="space-y-3">
                {withdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{withdrawal.user}</h4>
                        <p className="text-xs text-gray-400">{language === 'ko' ? '요청 시간' : 'Thời gian yêu cầu'}: {withdrawal.createdAt}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {withdrawal.id}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        withdrawal.status === 'pending'
                          ? 'bg-warning/20 text-warning'
                          : withdrawal.status === 'completed'
                          ? 'bg-success/20 text-success'
                          : 'bg-error/20 text-error'
                      }`}>
                        {withdrawal.status === 'pending'
                          ? (language === 'ko' ? '대기중' : 'Đang chờ')
                          : withdrawal.status === 'completed'
                          ? (language === 'ko' ? '완료' : 'Hoàn thành')
                          : (language === 'ko' ? '거부됨' : 'Đã từ chối')}
                      </span>
                    </div>

                    <div className="bg-dark-700 rounded-lg p-3 mb-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{language === 'ko' ? '출금 금액' : 'Số tiền rút'}</span>
                        <span className="text-white font-semibold">{formatCurrency(withdrawal.amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{language === 'ko' ? '수수료 (2%)' : 'Phí (2%)'}</span>
                        <span className="text-error">-{formatCurrency(withdrawal.fee)}</span>
                      </div>
                      <div className="border-t border-dark-500 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">{language === 'ko' ? '실수령액' : 'Thực nhận'}</span>
                          <span className="text-success font-bold">{formatCurrency(withdrawal.amount - withdrawal.fee)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-dark-700 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2">{language === 'ko' ? '입금 정보' : 'Thông tin ngân hàng'}</p>
                      <p className="text-sm text-white font-medium mb-1">{withdrawal.bankName}</p>
                      <p className="text-xs text-gray-300">{withdrawal.accountNumber}</p>
                    </div>

                    <div className="flex gap-2">
                      {withdrawal.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApproveWithdrawal(withdrawal.id)}
                            className="flex-1 py-2 bg-success/20 hover:bg-success/30 rounded-lg text-xs font-medium text-success transition-colors flex items-center justify-center gap-1"
                          >
                            <CheckCircle size={14} />
                            {language === 'ko' ? '송금 완료' : 'Đã chuyển tiền'}
                          </button>
                          <button
                            onClick={() => handleRejectWithdrawal(withdrawal.id)}
                            className="flex-1 py-2 bg-error/20 hover:bg-error/30 rounded-lg text-xs font-medium text-error transition-colors flex items-center justify-center gap-1"
                          >
                            <XCircle size={14} />
                            {language === 'ko' ? '거부' : 'Từ chối'}
                          </button>
                        </>
                      ) : (
                        <div className={`flex-1 py-2 rounded-lg text-xs font-medium text-center ${
                          withdrawal.status === 'completed'
                            ? 'bg-success/10 text-success'
                            : 'bg-error/10 text-error'
                        }`}>
                          {withdrawal.status === 'completed'
                            ? (language === 'ko' ? '✓ 송금 완료됨' : '✓ Đã chuyển tiền')
                            : (language === 'ko' ? '✗ 거부됨' : '✗ Đã từ chối')}
                        </div>
                      )}
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

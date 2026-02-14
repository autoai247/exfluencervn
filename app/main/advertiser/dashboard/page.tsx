'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  mockAdvertiserCampaigns,
  getAdvertiserStats,
  getRecentApplicants,
  getCampaignsByStatus,
  type AdvertiserCampaignWithStats
} from '@/lib/mockAdvertiserData';
import {
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus,
  Eye,
  UserCheck,
  Calendar,
  DollarSign,
  MapPin,
  ChevronRight
} from 'lucide-react';

type TabType = 'all' | 'recruiting' | 'in_progress' | 'completed';

export default function AdvertiserDashboard() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const stats = getAdvertiserStats();
  const recentApplicants = getRecentApplicants(5);

  const filteredCampaigns = activeTab === 'all'
    ? mockAdvertiserCampaigns
    : getCampaignsByStatus(activeTab);

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-sm border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">
            {language === 'ko' ? '광고주 대시보드' : 'Bảng điều khiển nhà quảng cáo'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {language === 'ko' ? '캠페인을 관리하고 지원자를 확인하세요' : 'Quản lý chiến dịch và xem ứng viên'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-mint/10 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-mint" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalCampaigns}</p>
                <p className="text-xs text-gray-400">
                  {language === 'ko' ? '전체 캠페인' : 'Tổng chiến dịch'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeCampaigns}</p>
                <p className="text-xs text-gray-400">
                  {language === 'ko' ? '진행 중' : 'Đang hoạt động'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalApplicants}</p>
                <p className="text-xs text-gray-400">
                  {language === 'ko' ? '총 지원자' : 'Tổng ứng viên'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.pendingReview}</p>
                <p className="text-xs text-gray-400">
                  {language === 'ko' ? '대기 중' : 'Chờ xét duyệt'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/main/advertiser/campaigns/create"
            className="flex items-center gap-2 bg-mint text-black px-6 py-3 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            <Plus size={20} />
            {language === 'ko' ? '새 캠페인 등록' : 'Tạo chiến dịch mới'}
          </Link>

          <button className="flex items-center gap-2 bg-dark-100 border border-dark-200 text-white px-6 py-3 rounded-xl font-medium hover:bg-dark-200 transition-all">
            <Users size={20} />
            {language === 'ko' ? '지원자 관리' : 'Quản lý ứng viên'}
          </button>

          <button className="flex items-center gap-2 bg-dark-100 border border-dark-200 text-white px-6 py-3 rounded-xl font-medium hover:bg-dark-200 transition-all">
            <BarChart3 size={20} />
            {language === 'ko' ? '성과 분석' : 'Phân tích hiệu suất'}
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Campaign List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {language === 'ko' ? '내 캠페인' : 'Chiến dịch của tôi'}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['all', 'recruiting', 'in_progress', 'completed'] as TabType[]).map((tab) => {
                const labels = {
                  all: language === 'ko' ? '전체' : 'Tất cả',
                  recruiting: language === 'ko' ? '모집 중' : 'Đang tuyển',
                  in_progress: language === 'ko' ? '진행 중' : 'Đang thực hiện',
                  completed: language === 'ko' ? '완료' : 'Hoàn thành'
                };

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'bg-mint text-black'
                        : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Campaign Cards */}
            <div className="space-y-3">
              {filteredCampaigns.length === 0 ? (
                <div className="bg-dark-100 border border-dark-200 rounded-xl p-8 text-center">
                  <p className="text-gray-400">
                    {language === 'ko' ? '캠페인이 없습니다' : 'Không có chiến dịch'}
                  </p>
                </div>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} language={language} />
                ))
              )}
            </div>
          </div>

          {/* Right: Recent Applicants */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              {language === 'ko' ? '최근 지원자' : 'Ứng viên gần đây'}
            </h2>

            <div className="bg-dark-100 border border-dark-200 rounded-xl p-4 space-y-3">
              {recentApplicants.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">
                  {language === 'ko' ? '최근 지원자가 없습니다' : 'Không có ứng viên gần đây'}
                </p>
              ) : (
                recentApplicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-start gap-3 p-3 bg-dark rounded-lg hover:bg-dark-200 transition-all cursor-pointer"
                  >
                    <img
                      src={applicant.avatarUrl}
                      alt={applicant.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">
                        {language === 'ko' ? applicant.name : applicant.nameVi}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {applicant.campaignTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {applicant.followers.toLocaleString()} followers
                        </span>
                        <span className="text-xs text-mint">
                          {applicant.engagementRate}%
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                  </div>
                ))
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-mint/10 to-blue-500/10 border border-mint/20 rounded-xl p-4">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                💡 {language === 'ko' ? '팁' : 'Mẹo'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-mint mt-0.5 flex-shrink-0" />
                  <span>
                    {language === 'ko'
                      ? '지원자는 24시간 내에 검토하세요'
                      : 'Xem xét ứng viên trong vòng 24 giờ'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-mint mt-0.5 flex-shrink-0" />
                  <span>
                    {language === 'ko'
                      ? '명확한 가이드라인을 제공하세요'
                      : 'Cung cấp hướng dẫn rõ ràng'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-mint mt-0.5 flex-shrink-0" />
                  <span>
                    {language === 'ko'
                      ? '정시에 결제하면 평판이 올라갑니다'
                      : 'Thanh toán đúng hạn nâng cao uy tín'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Campaign Card Component
function CampaignCard({
  campaign,
  language
}: {
  campaign: any;
  language: 'ko' | 'vi';
}) {
  const statusConfig = {
    draft: {
      label: language === 'ko' ? '초안' : 'Nháp',
      color: 'bg-gray-500/10 text-gray-500 border-gray-500/30'
    },
    pending: {
      label: language === 'ko' ? '대기 중' : 'Chờ xử lý',
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
    },
    recruiting: {
      label: language === 'ko' ? '모집 중' : 'Đang tuyển',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/30'
    },
    published: {
      label: language === 'ko' ? '게시됨' : 'Đã đăng',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/30'
    },
    in_progress: {
      label: language === 'ko' ? '진행 중' : 'Đang thực hiện',
      color: 'bg-mint/10 text-mint border-mint/30'
    },
    completed: {
      label: language === 'ko' ? '완료' : 'Hoàn thành',
      color: 'bg-green-500/10 text-green-500 border-green-500/30'
    },
    cancelled: {
      label: language === 'ko' ? '취소됨' : 'Đã hủy',
      color: 'bg-red-500/10 text-red-500 border-red-500/30'
    }
  };

  const status = statusConfig[campaign.status as keyof typeof statusConfig] || statusConfig.draft;

  return (
    <Link
      href={`/main/advertiser/campaigns/${campaign.id}/applicants`}
      className="block bg-dark-100 border border-dark-200 rounded-xl p-4 hover:border-mint/30 transition-all group"
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-24 h-24 bg-dark-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={campaign.images?.[0] || ''}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-mint transition-colors">
              {language === 'ko' ? campaign.title : campaign.titleVi}
            </h3>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium border whitespace-nowrap ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-3 line-clamp-1">
            {language === 'ko' ? campaign.company : campaign.companyVi}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-gray-500" />
              <span className="text-gray-300">
                {campaign.applicantCount} {language === 'ko' ? '지원' : 'ứng viên'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck size={14} className="text-mint" />
              <span className="text-gray-300">
                {campaign.selectedCount} {language === 'ko' ? '선정' : 'đã chọn'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-500" />
              <span className="text-gray-300">
                {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN', {
                  month: 'short',
                  day: 'numeric'
                }) : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {campaign.status === 'recruiting' && campaign.applicants.filter((a: any) => a.status === 'pending').length > 0 && (
        <div className="mt-3 pt-3 border-t border-dark-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-orange-500" />
            <span className="text-xs text-orange-500 font-medium">
              {campaign.applicants.filter((a: any) => a.status === 'pending').length}{' '}
              {language === 'ko' ? '명 대기 중' : 'chờ xét duyệt'}
            </span>
          </div>
          <ChevronRight size={16} className="text-gray-500 group-hover:text-mint transition-colors" />
        </div>
      )}
    </Link>
  );
}

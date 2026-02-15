'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, Globe, Edit, Settings, LogOut, BarChart3, Users, Package } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { formatPoints } from '@/lib/points';

export default function AdvertiserProfilePage() {
  const { language } = useLanguage();
  const [advertiser, setAdvertiser] = useState({
    name: 'Demo Brand Company',
    email: 'advertiser@demo.com',
    phone: '+84 909 876 543',
    company_name: 'Demo Brand VN',
    website: 'https://demobrand.com',
    avatar_url: null,
    bio: 'Leading fashion brand in Vietnam. Specialized in youth fashion and streetwear.',
    created_at: '2024-01-15',
    verified: true,
    // Advertiser stats
    totalCampaigns: 12,
    activeCampaigns: 5,
    completedCampaigns: 7,
    totalBudget: 150000000, // VND
    totalInfluencers: 45,
  });

  const t = {
    ko: {
      title: '프로필',
      subtitle: '광고주 정보 관리',
      companyInfo: '회사 정보',
      companyName: '회사명',
      website: '웹사이트',
      email: '이메일',
      phone: '전화번호',
      bio: '회사 소개',
      verified: '인증됨',
      notVerified: '미인증',
      stats: {
        title: '활동 통계',
        totalCampaigns: '전체 캠페인',
        activeCampaigns: '진행 중',
        completedCampaigns: '완료',
        totalBudget: '총 광고비',
        totalInfluencers: '협업 인플루언서',
      },
      actions: {
        edit: '프로필 수정',
        settings: '설정',
        logout: '로그아웃',
        verification: '사업자 인증',
      },
      memberSince: '가입일',
    },
    vi: {
      title: 'Hồ sơ',
      subtitle: 'Quản lý thông tin nhà quảng cáo',
      companyInfo: 'Thông tin công ty',
      companyName: 'Tên công ty',
      website: 'Website',
      email: 'Email',
      phone: 'Điện thoại',
      bio: 'Giới thiệu công ty',
      verified: 'Đã xác minh',
      notVerified: 'Chưa xác minh',
      stats: {
        title: 'Thống kê hoạt động',
        totalCampaigns: 'Tổng chiến dịch',
        activeCampaigns: 'Đang hoạt động',
        completedCampaigns: 'Đã hoàn thành',
        totalBudget: 'Tổng ngân sách',
        totalInfluencers: 'Influencer hợp tác',
      },
      actions: {
        edit: 'Chỉnh sửa hồ sơ',
        settings: 'Cài đặt',
        logout: 'Đăng xuất',
        verification: 'Xác minh doanh nghiệp',
      },
      memberSince: 'Ngày tham gia',
    },
  };

  const text = t[language];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('exfluencer_user');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-dark-700">
      <MobileHeader title={text.title} subtitle={text.subtitle} />

      <main className="container-mobile pb-24 pt-20">
        {/* Profile Header */}
        <div className="bg-dark-600 rounded-2xl p-6 mb-6 border border-dark-500">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white flex-shrink-0">
              <Building2 size={32} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white truncate">
                  {advertiser.company_name}
                </h2>
                {advertiser.verified && (
                  <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full flex-shrink-0">
                    ✓ {text.verified}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">{advertiser.name}</p>
              <p className="text-gray-300 text-sm line-clamp-2">{advertiser.bio}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-dark-500 space-y-2">
            {advertiser.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} className="text-gray-400" />
                <a href={advertiser.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {advertiser.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-300">{advertiser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-300">{advertiser.phone}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">{text.stats.title}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-4 border border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-primary" />
                <span className="text-xs text-gray-400">{text.stats.totalCampaigns}</span>
              </div>
              <div className="text-2xl font-bold text-white">{advertiser.totalCampaigns}</div>
            </div>

            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-4 border border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-accent" />
                <span className="text-xs text-gray-400">{text.stats.activeCampaigns}</span>
              </div>
              <div className="text-2xl font-bold text-white">{advertiser.activeCampaigns}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
              <div className="text-xs text-gray-400 mb-1">{text.stats.completedCampaigns}</div>
              <div className="text-xl font-bold text-white">{advertiser.completedCampaigns}</div>
            </div>

            <div className="bg-dark-600 rounded-xl p-4 border border-dark-500">
              <div className="text-xs text-gray-400 mb-1">{text.stats.totalInfluencers}</div>
              <div className="text-xl font-bold text-white">{advertiser.totalInfluencers}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-xl p-4 border border-secondary/30 mt-4">
            <div className="text-xs text-gray-400 mb-1">{text.stats.totalBudget}</div>
            <div className="text-2xl font-bold text-white">{formatPoints(advertiser.totalBudget)} VND</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/main/advertiser/profile/edit"
            className="flex items-center justify-between bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Edit size={20} className="text-primary" />
              <span className="text-white font-medium">{text.actions.edit}</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>

          {!advertiser.verified && (
            <Link
              href="/main/advertiser/verification"
              className="flex items-center justify-between bg-accent/10 rounded-xl p-4 border border-accent/30 hover:border-accent/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-accent" />
                <span className="text-white font-medium">{text.actions.verification}</span>
              </div>
              <span className="text-accent">›</span>
            </Link>
          )}

          <Link
            href="/settings"
            className="flex items-center justify-between bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-gray-500 transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-400" />
              <span className="text-white font-medium">{text.actions.settings}</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-red-500/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-red-400" />
              <span className="text-white font-medium">{text.actions.logout}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Member Since */}
        <div className="text-center text-gray-500 text-xs mt-8">
          {text.memberSince}: {new Date(advertiser.created_at).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
        </div>
      </main>

      <BottomNav userType="advertiser" />
    </div>
  );
}

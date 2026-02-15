'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, Globe, Edit, Settings, LogOut, BarChart3, Package, Facebook, Instagram, Youtube, Share2 } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { formatPoints } from '@/lib/points';

export default function AdvertiserProfilePage() {
  const { language } = useLanguage();

  const [advertiser] = useState({
    name: 'Demo Brand Company',
    email: 'advertiser@demo.com',
    phone: '+84 909 876 543',
    company_name: 'Demo Brand VN',
    website: 'https://demobrand.com',
    bio: language === 'ko'
      ? '베트남을 대표하는 패션 브랜드. 청년 패션과 스트릿웨어 전문.'
      : 'Thương hiệu thời trang hàng đầu Việt Nam. Chuyên về thời trang trẻ và streetwear.',
    created_at: '2024-01-15',
    verified: true,
    totalCampaigns: 12,
    activeCampaigns: 5,
    completedCampaigns: 7,
    totalBudget: 150000000,
    totalInfluencers: 45,
    // SNS
    facebook: 'https://facebook.com/demobrand',
    instagram: 'https://instagram.com/demobrand',
    tiktok: '@demobrand',
    youtube: 'https://youtube.com/@demobrand',
  });

  const t = {
    ko: {
      title: '프로필',
      businessAccount: '비즈니스 계정',
      businessSubtitle: '브랜드/기업 계정',
      verified: '인증됨',
      stats: {
        title: '활동 통계',
        totalCampaigns: '전체 캠페인',
        activeCampaigns: '진행 중',
        completedCampaigns: '완료',
        totalBudget: '총 광고비',
        totalBudgetDesc: '총 광고 집행 금액',
        totalInfluencers: '협업 인플루언서',
      },
      actions: {
        title: '기업 계정 관리',
        edit: '프로필 수정',
        verification: '사업자 인증',
        verificationDesc: '신뢰도 향상',
        settings: '설정',
        logout: '로그아웃',
      },
      memberSince: '가입일',
    },
    vi: {
      title: 'Hồ sơ',
      businessAccount: 'Tài khoản doanh nghiệp',
      businessSubtitle: 'Tài khoản thương hiệu/doanh nghiệp',
      verified: 'Đã xác minh',
      stats: {
        title: 'Thống kê hoạt động',
        totalCampaigns: 'Tổng chiến dịch',
        activeCampaigns: 'Đang hoạt động',
        completedCampaigns: 'Đã hoàn thành',
        totalBudget: 'Tổng ngân sách',
        totalBudgetDesc: 'Tổng chi tiêu quảng cáo',
        totalInfluencers: 'Influencer hợp tác',
      },
      actions: {
        title: 'Quản lý tài khoản',
        edit: 'Chỉnh sửa hồ sơ',
        verification: 'Xác minh doanh nghiệp',
        verificationDesc: 'Tăng độ tin cậy',
        settings: 'Cài đặt',
        logout: 'Đăng xuất',
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
      {/* 🚨 TEST: 이 메시지가 보이면 페이지는 로딩됨 */}
      <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50 font-black text-xl">
        ⚠️ 광고주 프로필 페이지 - LOADED ⚠️
      </div>

      <MobileHeader title={text.title} showBack />

      <main className="container-mobile pb-24 pt-20">
        {/* BUSINESS ACCOUNT BANNER - ALWAYS VISIBLE */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-5 mb-6 shadow-2xl border-2 border-yellow-400 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/50">
              <Building2 size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-black text-lg mb-1 tracking-wide">
                🏢 {text.businessAccount.toUpperCase()}
              </h3>
              <p className="text-white font-bold text-sm">{text.businessSubtitle}</p>
              <p className="text-yellow-200 text-xs mt-1">✓ {language === 'ko' ? '기업 전용 계정입니다' : 'Tài khoản doanh nghiệp'}</p>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-dark-600 rounded-2xl p-6 mb-6 border-2 border-orange-500/30 shadow-xl">
          <div className="flex items-start gap-4">
            {/* Company Icon */}
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
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

          {/* SNS Links */}
          {(advertiser.facebook || advertiser.instagram || advertiser.tiktok || advertiser.youtube) && (
            <div className="mt-4 pt-4 border-t border-dark-500">
              <div className="flex items-center gap-2 mb-3">
                <Share2 size={16} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-300">
                  {language === 'ko' ? 'SNS 채널' : 'Kênh mạng xã hội'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {advertiser.facebook && (
                  <a
                    href={advertiser.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#1877F2]/20 text-[#1877F2] rounded-lg hover:bg-[#1877F2]/30 transition-colors text-sm"
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>
                )}
                {advertiser.instagram && (
                  <a
                    href={advertiser.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-400 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-colors text-sm"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                )}
                {advertiser.tiktok && (
                  <a
                    href={`https://tiktok.com/${advertiser.tiktok.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-black/40 text-white rounded-lg hover:bg-black/60 transition-colors text-sm"
                  >
                    <span className="font-bold">TikTok</span>
                    {advertiser.tiktok}
                  </a>
                )}
                {advertiser.youtube && (
                  <a
                    href={advertiser.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#FF0000]/20 text-[#FF0000] rounded-lg hover:bg-[#FF0000]/30 transition-colors text-sm"
                  >
                    <Youtube size={16} />
                    YouTube
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-orange-400" />
            <h3 className="text-lg font-bold text-white">{text.stats.title}</h3>
          </div>

          {/* Top Stats - Clickable */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Link href="/main/advertiser/campaigns">
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl p-4 border-2 border-orange-500/40 shadow-lg hover:border-orange-500/70 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-orange-400" />
                  <span className="text-xs text-gray-400">{text.stats.totalCampaigns}</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">{advertiser.totalCampaigns}</div>
                <div className="text-xs text-orange-300 mt-2">👆 {language === 'ko' ? '전체 보기' : 'Xem tất cả'}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/campaigns?status=active">
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-xl p-4 border-2 border-amber-500/40 shadow-lg hover:border-amber-500/70 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={20} className="text-amber-400" />
                  <span className="text-xs text-gray-400">{text.stats.activeCampaigns}</span>
                </div>
                <div className="text-2xl font-bold text-amber-400">{advertiser.activeCampaigns}</div>
                <div className="text-xs text-amber-300 mt-2">👆 {language === 'ko' ? '진행 중 보기' : 'Xem đang tiến hành'}</div>
              </div>
            </Link>
          </div>

          {/* Bottom Stats - Clickable */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Link href="/main/advertiser/campaigns?status=completed">
              <div className="bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-green-500/50 transition-all cursor-pointer">
                <div className="text-xs text-gray-400 mb-1">{text.stats.completedCampaigns}</div>
                <div className="text-xl font-bold text-white">{advertiser.completedCampaigns}</div>
                <div className="text-xs text-green-400 mt-2">👆 {language === 'ko' ? '완료 목록' : 'Danh sách hoàn thành'}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/influencers">
              <div className="bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-primary/50 transition-all cursor-pointer">
                <div className="text-xs text-gray-400 mb-1">{text.stats.totalInfluencers}</div>
                <div className="text-xl font-bold text-white">{advertiser.totalInfluencers}</div>
                <div className="text-xs text-primary mt-2">👆 {language === 'ko' ? '인플루언서 보기' : 'Xem KOLs'}</div>
              </div>
            </Link>
          </div>

          {/* Total Budget - Highlighted & Clickable */}
          <Link href="/main/advertiser/analytics">
            <div className="bg-gradient-to-r from-yellow-500/30 via-orange-500/20 to-amber-500/30 rounded-xl p-5 border-2 border-yellow-500/50 shadow-xl hover:border-yellow-500/80 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <div className="text-xs text-gray-300 font-bold">{text.stats.totalBudget}</div>
              </div>
              <div className="text-3xl font-black text-yellow-400">{formatPoints(advertiser.totalBudget)} VND</div>
              <div className="text-xs text-yellow-300/60 mt-1 font-medium">{text.stats.totalBudgetDesc}</div>
              <div className="text-xs text-yellow-200 mt-2">👆 {language === 'ko' ? '예산 분석 보기' : 'Xem phân tích ngân sách'}</div>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Building2 size={18} className="text-orange-400" />
            <h3 className="text-sm font-bold text-gray-400">{text.actions.title}</h3>
          </div>

          {/* Edit Profile */}
          <Link
            href="/main/advertiser/profile/edit"
            className="flex items-center justify-between bg-dark-600 rounded-xl p-4 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Edit size={20} className="text-orange-400" />
              </div>
              <span className="text-white font-medium">{text.actions.edit}</span>
            </div>
            <span className="text-orange-400">›</span>
          </Link>

          {/* Verification (if not verified) */}
          {!advertiser.verified && (
            <Link
              href="/main/advertiser/verification"
              className="flex items-center justify-between bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl p-4 border-2 border-orange-500/50 hover:border-orange-500/80 transition-all shadow-lg animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-orange-400" />
                </div>
                <div>
                  <span className="text-white font-bold block">{text.actions.verification}</span>
                  <span className="text-xs text-orange-300">{text.actions.verificationDesc}</span>
                </div>
              </div>
              <span className="text-orange-400 font-bold">›</span>
            </Link>
          )}

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center justify-between bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-gray-400 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <Settings size={20} className="text-gray-400" />
              </div>
              <span className="text-white font-medium">{text.actions.settings}</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between bg-dark-600 rounded-xl p-4 border border-dark-500 hover:border-red-500/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <LogOut size={20} className="text-red-400" />
              </div>
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

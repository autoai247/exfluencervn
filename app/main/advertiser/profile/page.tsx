'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, Globe, Edit, Settings, LogOut, BarChart3, Package, Facebook, Instagram, Youtube, Share2 } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { formatPoints } from '@/lib/points';

export default function AdvertiserProfilePage() {
  const { language } = useLanguage();
  const t = translations[language].advertiser.profile;

  const [advertiser] = useState({
    name: 'Demo Brand Company',
    email: 'advertiser@demo.com',
    phone: '+84 909 876 543',
    company_name: 'Demo Brand VN',
    website: 'https://demobrand.com',
    bio: language === 'ko' ? '베트남을 대표하는 패션 브랜드. 청년 패션과 스트릿웨어 전문.' : 'Thương hiệu thời trang hàng đầu Việt Nam. Chuyên về thời trang trẻ và streetwear.',
    created_at: '2026-01-15',
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


  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('exfluencer_user');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MobileHeader title={t.title} showBack />

      <main className="container-mobile pb-24 pt-16">
        {/* Business Account Banner */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 size={24} className="text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold text-sm mb-0.5">
                {t.businessAccount}
              </h3>
              <p className="text-gray-500 text-xs">{t.businessSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-start gap-4">
            {/* Company Icon */}
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0">
              <Building2 size={32} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {advertiser.company_name}
                </h2>
                {advertiser.verified && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
                    {t.verified}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-2">{advertiser.name}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{advertiser.bio}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            {advertiser.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} className="text-gray-400" />
                <a href={advertiser.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                  {advertiser.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-700">{advertiser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-700">{advertiser.phone}</span>
            </div>
          </div>

          {/* SNS Links */}
          {(advertiser.facebook || advertiser.instagram || advertiser.tiktok || advertiser.youtube) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Share2 size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {t.snsChannels}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {advertiser.facebook && (
                  <a
                    href={advertiser.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <span className="font-medium">TikTok</span>
                    {advertiser.tiktok}
                  </a>
                )}
                {advertiser.youtube && (
                  <a
                    href={advertiser.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
            <BarChart3 size={20} className="text-gray-700" />
            <h3 className="text-base font-semibold text-gray-900">{t.activityStats}</h3>
          </div>

          {/* Top Stats - Clickable */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link href="/main/advertiser/campaigns">
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={18} className="text-gray-600" />
                  <span className="text-xs text-gray-500">{t.totalCampaigns}</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{advertiser.totalCampaigns}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/campaigns?status=active">
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={18} className="text-gray-600" />
                  <span className="text-xs text-gray-500">{t.activeCampaigns}</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">{advertiser.activeCampaigns}</div>
              </div>
            </Link>
          </div>

          {/* Bottom Stats - Clickable */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link href="/main/advertiser/campaigns?status=completed">
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                <div className="text-xs text-gray-500 mb-1">{t.completedCampaigns}</div>
                <div className="text-xl font-semibold text-gray-900">{advertiser.completedCampaigns}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/influencers">
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                <div className="text-xs text-gray-500 mb-1">{t.totalInfluencers}</div>
                <div className="text-xl font-semibold text-gray-900">{advertiser.totalInfluencers}</div>
              </div>
            </Link>
          </div>

          {/* Total Budget - Highlighted & Clickable */}
          <Link href="/main/advertiser/analytics">
            <div className="bg-white rounded-lg p-5 border border-gray-300 hover:border-gray-400 transition-all cursor-pointer">
              <div className="text-xs text-gray-500 font-medium mb-2">{t.totalBudget}</div>
              <div className="text-2xl font-semibold text-gray-900">{formatPoints(advertiser.totalBudget)} VND</div>
              <div className="text-xs text-gray-400 mt-1">{t.totalBudgetDesc}</div>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Building2 size={18} className="text-gray-600" />
            <h3 className="text-sm font-medium text-gray-600">{t.accountManagement}</h3>
          </div>

          {/* Edit Profile */}
          <Link
            href="/main/advertiser/profile/edit"
            className="flex items-center justify-between bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <Edit size={20} className="text-white" />
              <span className="text-white font-medium">{t.editProfile}</span>
            </div>
            <span className="text-white">›</span>
          </Link>

          {/* Verification (if not verified) */}
          {!advertiser.verified && (
            <Link
              href="/main/advertiser/verification"
              className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-300 hover:border-gray-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-gray-700" />
                <div>
                  <span className="text-gray-900 font-medium block">{t.verification}</span>
                  <span className="text-xs text-gray-500">{t.verificationDesc}</span>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          )}

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-700" />
              <span className="text-gray-900 font-medium">{t.settings}</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-gray-700" />
              <span className="text-gray-900 font-medium">{t.logout}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Member Since */}
        <div className="text-center text-gray-400 text-xs mt-8">
          {t.memberSince}: {new Date(advertiser.created_at).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
        </div>
      </main>

      <BottomNav userType="advertiser" />
    </div>
  );
}

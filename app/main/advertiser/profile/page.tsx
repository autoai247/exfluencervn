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
    <div className="min-h-screen bg-dark-700">
      <MobileHeader title={t.title} showBack />

      <main className="container-mobile pb-24 pt-16">
        {/* Business Account Banner */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Building2 size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-0.5">
                {t.businessAccount}
              </h3>
              <p className="text-gray-400 text-xs">{t.businessSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-start gap-4">
            {/* Company Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 shadow-lg">
              <Building2 size={32} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-white truncate">
                  {advertiser.company_name}
                </h2>
                {advertiser.verified && (
                  <span className="px-2 py-0.5 bg-success/20 text-success border border-success/30 text-xs rounded-full flex-shrink-0">
                    {t.verified}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">{advertiser.name}</p>
              <p className="text-gray-300 text-sm line-clamp-2">{advertiser.bio}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-dark-400/40 space-y-2">
            {advertiser.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} className="text-gray-400" />
                <a href={advertiser.website} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors">
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
            <div className="mt-4 pt-4 border-t border-dark-400/40">
              <div className="flex items-center gap-2 mb-3">
                <Share2 size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  {t.snsChannels}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {advertiser.facebook && (
                  <a
                    href={advertiser.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark-700/60 text-gray-300 border border-dark-400/40 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
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
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark-700/60 text-gray-300 border border-dark-400/40 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
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
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark-700/60 text-gray-300 border border-dark-400/40 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
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
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark-700/60 text-gray-300 border border-dark-400/40 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
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
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-base font-semibold text-white">{t.activityStats}</h3>
          </div>

          {/* Top Stats - Clickable */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link href="/main/advertiser/campaigns">
              <div className="bg-gradient-to-br from-primary/15 to-dark-700 border border-primary/20 rounded-2xl p-4 hover:border-primary/40 transition-all cursor-pointer shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Package size={16} className="text-primary" />
                  </div>
                  <span className="text-xs text-gray-400">{t.totalCampaigns}</span>
                </div>
                <div className="text-2xl font-bold text-white">{advertiser.totalCampaigns}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/campaigns?status=active">
              <div className="bg-gradient-to-br from-success/15 to-dark-700 border border-success/20 rounded-2xl p-4 hover:border-success/40 transition-all cursor-pointer shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <BarChart3 size={16} className="text-success" />
                  </div>
                  <span className="text-xs text-gray-400">{t.activeCampaigns}</span>
                </div>
                <div className="text-2xl font-bold text-white">{advertiser.activeCampaigns}</div>
              </div>
            </Link>
          </div>

          {/* Bottom Stats - Clickable */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link href="/main/advertiser/campaigns?status=completed">
              <div className="bg-gradient-to-br from-secondary/15 to-dark-700 border border-secondary/20 rounded-2xl p-4 hover:border-secondary/40 transition-all cursor-pointer shadow-xl">
                <div className="text-xs text-gray-400 mb-1">{t.completedCampaigns}</div>
                <div className="text-xl font-bold text-white">{advertiser.completedCampaigns}</div>
              </div>
            </Link>

            <Link href="/main/advertiser/influencers">
              <div className="bg-gradient-to-br from-accent/15 to-dark-700 border border-accent/20 rounded-2xl p-4 hover:border-accent/40 transition-all cursor-pointer shadow-xl">
                <div className="text-xs text-gray-400 mb-1">{t.totalInfluencers}</div>
                <div className="text-xl font-bold text-white">{advertiser.totalInfluencers}</div>
              </div>
            </Link>
          </div>

          {/* Total Budget - Highlighted & Clickable */}
          <Link href="/main/advertiser/analytics">
            <div className="bg-gradient-to-r from-primary/20 via-dark-600/80 to-secondary/20 backdrop-blur-sm border border-primary/30 hover:border-primary/50 rounded-2xl p-5 transition-all cursor-pointer shadow-xl">
              <div className="text-xs text-gray-400 font-medium mb-2">{t.totalBudget}</div>
              <div className="text-2xl font-bold text-white">{formatPoints(advertiser.totalBudget)} VND</div>
              <div className="text-xs text-gray-500 mt-1">{t.totalBudgetDesc}</div>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-medium text-gray-400">{t.accountManagement}</h3>
          </div>

          {/* Edit Profile */}
          <Link
            href="/main/advertiser/profile/edit"
            className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary rounded-2xl p-4 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <div className="flex items-center gap-3">
              <Edit size={20} className="text-white" />
              <span className="text-white font-medium">{t.editProfile}</span>
            </div>
            <span className="text-white/70">›</span>
          </Link>

          {/* Verification (if not verified) */}
          {!advertiser.verified && (
            <Link
              href="/main/advertiser/verification"
              className="flex items-center justify-between bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-gray-300" />
                <div>
                  <span className="text-white font-medium block">{t.verification}</span>
                  <span className="text-xs text-gray-400">{t.verificationDesc}</span>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          )}

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center justify-between bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-300" />
              <span className="text-white font-medium">{t.settings}</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-gray-300" />
              <span className="text-white font-medium">{t.logout}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Member Since */}
        <div className="text-center text-gray-500 text-xs mt-8">
          {t.memberSince}: {new Date(advertiser.created_at).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
        </div>
      </main>

      <BottomNav userType="advertiser" />
    </div>
  );
}

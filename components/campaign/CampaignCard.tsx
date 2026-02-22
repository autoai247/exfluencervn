'use client';

import Link from 'next/link';
import { DollarSign, Calendar, MapPin, TrendingUp, X, Heart } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { formatCash } from '@/lib/points';
import type { Platform } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

const platformColors = {
  instagram: 'text-pink-500',
  tiktok: 'text-white',
  youtube: 'text-red-500',
  facebook: 'text-blue-500',
};

interface CampaignCardProps {
  campaign: any;
  eligibility: any;
  isAdminMode: boolean;
  campaignUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, campaignId: string) => void;
  generateApplicantAvatars: (id: string, count: number, max: number) => any[];
  t: any;
}

export default function CampaignCard({
  campaign,
  eligibility,
  isAdminMode,
  campaignUrl,
  isFavorite,
  onToggleFavorite,
  generateApplicantAvatars,
  t,
}: CampaignCardProps) {
  const { language } = useLanguage();
  return (
    <Link href={campaignUrl}>
      <div className="card-hover overflow-hidden p-0 cursor-pointer border-2 border-dark-500/50 hover:border-primary/50 shadow-xl">
        {/* Thumbnail Image */}
        {campaign.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={campaign.thumbnail}
              alt={campaign.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* ADMIN ONLY: Demo Campaign Watermark */}
            {isAdminMode && campaign.isDemoMode && (
              <div className="absolute top-3 left-3 z-20">
                <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-black flex items-center gap-1.5 shadow-xl border-2 border-white/40 animate-pulse">
                  🎭 DEMO CAMPAIGN
                </div>
              </div>
            )}

            {/* Eligibility Badge */}
            <div className="absolute top-3 right-3">
              {eligibility.eligible ? (
                <div className="px-3 py-1.5 bg-success rounded-full border-2 border-white shadow-lg flex items-center gap-1.5">
                  <span className="text-white font-bold text-xs">✓ {t.campaign.eligible}</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 bg-dark-600/90 rounded-full border-2 border-gray-500 shadow-lg flex items-center gap-1.5">
                  <span className="text-gray-300 font-semibold text-xs">{t.campaign.notEligible}</span>
                </div>
              )}
            </div>

            {/* Type Badge */}
            <div className={`absolute ${
              isAdminMode && campaign.isDemoMode ? 'top-14 left-3' : 'top-3 left-3'
            }`}>
              <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                campaign.type === 'cash'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {campaign.type === 'cash' ? t.campaignFilters.cash : t.campaignFilters.points}
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => onToggleFavorite(e, campaign.id)}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-dark-800/90 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:scale-110 hover:bg-dark-700 transition-all shadow-lg group"
            >
              <Heart
                size={20}
                className={`transition-all ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-white group-hover:fill-red-500/30'
                }`}
              />
            </button>

            <div className="absolute bottom-3 left-3 right-14">
              <h4 className="text-lg font-bold text-white drop-shadow-lg mb-1">{campaign.title}</h4>
              <div className="flex items-center gap-2">
                <img
                  src={campaign.companyLogo}
                  alt={campaign.company}
                  className="w-6 h-6 rounded-full border-2 border-white/50"
                  loading="lazy"
                />
                <span className="text-sm text-white/90 drop-shadow">{campaign.company}</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Description */}
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">
            {campaign.description}
          </p>

          {/* Platforms */}
          <div className="flex gap-2 mb-3">
            {campaign.platforms.map((platform: Platform) => {
              const Icon = platformIcons[platform];
              return (
                <div
                  key={platform}
                  className="w-8 h-8 bg-dark-600 rounded-lg flex items-center justify-center"
                >
                  <Icon size={16} className={platformColors[platform]} />
                </div>
              );
            })}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign size={16} className="text-accent" />
              <span className="text-white font-semibold">
                {formatCash(campaign.budget)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-300" />
              <span className="text-gray-300">{campaign.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-gray-300" />
              <span className="text-gray-300">{campaign.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-gray-300" />
              <span className="text-gray-300">{campaign.applicants}{t.campaignFilters.applicationsCount}</span>
            </div>
          </div>

          {/* Applicants Avatars */}
          {campaign.applicants > 0 && (
            <div className="mb-3 p-3 bg-dark-600 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {generateApplicantAvatars(campaign.id, campaign.applicants, 6).map((avatar: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative group"
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.name}
                        className="w-10 h-10 rounded-full border-3 border-dark-700 hover:z-10 hover:scale-125 transition-all cursor-pointer shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {avatar.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-300">
                    {t.campaign.applicants}: {campaign.applicants}{t.campaignFilters.applicationsUnit}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Eligibility Check */}
          {!eligibility.eligible && (
            <div className="mb-3 p-3 bg-dark-600/50 rounded-lg border border-error/30">
              <div className="text-xs text-error font-semibold mb-2">{t.campaign.whyNotEligible}</div>
              <div className="space-y-1">
                {!eligibility.followers && (
                  <div className="text-xs text-gray-300 flex items-center gap-1">
                    <X size={12} className="text-error" />
                    {t.campaign.failureReasons.followers}
                  </div>
                )}
                {!eligibility.engagement && (
                  <div className="text-xs text-gray-300 flex items-center gap-1">
                    <X size={12} className="text-error" />
                    {t.campaign.failureReasons.engagement}
                  </div>
                )}
                {!eligibility.platform && (
                  <div className="text-xs text-gray-300 flex items-center gap-1">
                    <X size={12} className="text-error" />
                    {t.campaign.failureReasons.platform}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-dark-500">
            <div className="flex-1 text-xs text-gray-400 truncate">
              📅 {language === 'ko' ? '마감' : 'Hạn chót'}: {campaign.deadline}
            </div>
            <Link
              href={`${campaignUrl}`}
              onClick={e => e.stopPropagation()}
              className="px-3 py-2 rounded-lg text-xs text-gray-300 bg-dark-600 hover:bg-dark-500 transition-all whitespace-nowrap"
            >
              {language === 'ko' ? '상세보기' : 'Xem chi tiết'}
            </Link>
            <Link
              href={`${campaignUrl}?apply=true`}
              onClick={e => e.stopPropagation()}
              className={`px-4 py-2 rounded-lg text-sm font-black whitespace-nowrap transition-all active:scale-95 ${
                eligibility.eligible
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                  : 'bg-dark-500 text-gray-500 cursor-default pointer-events-none'
              }`}
            >
              🎯 {language === 'ko' ? '지원하기' : 'Ứng tuyển'}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

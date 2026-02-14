'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockUserProfile, getMockPortfolio } from '@/lib/mockData';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Settings,
  LogOut,
  ChevronRight,
  Wallet,
  BarChart,
  FileText,
  HelpCircle,
  Shield,
  Bell,
  Globe,
  Calendar,
  Users as UsersIcon,
  ShoppingCart,
  Gift,
  Building2,
  MessageCircle,
  Heart,
  Trophy,
  CheckCircle,
  Briefcase,
  Ticket,
  DollarSign,
  Smartphone,
  Home,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCompactNumber } from '@/lib/points';

// Mock data - Hardcoded (Korean) version - commented out in favor of translated mock data
// const userProfile = {
//   id: '1',
//   name: '김민수',
//   email: 'kimminsu@example.com',
//   phone: '010-1234-5678',
//   zalo: '0901234567',
//   avatar: 'https://ui-avatars.com/api/?name=Kim+Minsu&background=FF6B6B&color=fff&size=200',
//   location: '서울, 한국',
//   bio: '뷰티 & 라이프스타일 인플루언서입니다. 다양한 브랜드와 협업하여 진솔한 리뷰를 전달합니다.',
//
//   // Extended profile information
//   gender: 'female' as 'female' | 'male' | 'other',
//   ageRange: '25-34',
//   maritalStatus: 'single' as 'single' | 'married' | 'divorced' | 'widowed',
//   education: 'bachelor' as 'high_school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'other',
//   occupation: 'creative' as string,
//   occupationDetail: '뷰티 크리에이터',
//
//   hasVehicle: false,
//   housingType: 'apartment' as 'apartment' | 'house' | 'villa' | 'studio' | 'shared' | 'dormitory',
//   ownershipStatus: 'rented' as 'owned' | 'rented' | 'family_owned',
//
//   hasChildren: false,
//
//   skinType: 'combination' as 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal',
//   skinTone: 'light' as 'fair' | 'light' | 'medium' | 'tan' | 'dark',
//   hairType: 'straight' as 'straight' | 'wavy' | 'curly' | 'coily',
//
//   categories: ['beauty', 'lifestyle'] as string[],
//
//   hasPets: false,
//
//   phoneModel: 'iPhone 15 Pro',
//   smartDevices: ['smartwatch', 'earbuds'] as string[],
//
//   hobbies: ['photography', 'travel', 'cooking'] as string[],
//
//   socialAccounts: [
//     {
//       platform: 'instagram' as const,
//       username: '@kimminsu_beauty',
//       followers: 125000,
//       verified: true,
//       connected: true,
//       lastUpdated: '2024-02-13',
//     },
//     {
//       platform: 'tiktok' as const,
//       username: '@kimminsu_official',
//       followers: 89000,
//       verified: false,
//       connected: true,
//       lastUpdated: '2024-02-13',
//     },
//     {
//       platform: 'youtube' as const,
//       username: '김민수 뷰티',
//       followers: 45000,
//       verified: true,
//       connected: true,
//       lastUpdated: '2024-02-10',
//     },
//     {
//       platform: 'facebook' as const,
//       username: 'kimminsu.beauty',
//       followers: 32000,
//       verified: false,
//       connected: false,
//       lastUpdated: '2024-02-01',
//     },
//   ],
//   stats: {
//     totalCampaigns: 9,  // 완료 6 + 진행 3
//     completedCampaigns: 6,  // completed page와 일치
//     totalEarnings: 15000000,
//     rating: 4.8,
//   },
// };

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

const platformColors = {
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  tiktok: 'bg-black',
  youtube: 'bg-red-600',
  facebook: 'bg-blue-600',
};

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [totalShareEarnings, setTotalShareEarnings] = useState(0);
  const [pendingShareCount, setPendingShareCount] = useState(0);
  const [myRaffleTickets, setMyRaffleTickets] = useState(0);

  // Get translated mock data
  const userProfile = getMockUserProfile(language);
  const portfolioItems = getMockPortfolio(language);

  // Load share earnings and raffle tickets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('exfluencer_share_history');
    if (stored) {
      const history = JSON.parse(stored);

      // Only approved shares count as earnings
      const totalEarnings = history.reduce((sum: number, h: any) =>
        h.status === 'approved' ? sum + h.pointsEarned : sum, 0
      );
      setTotalShareEarnings(totalEarnings);

      // Count pending shares
      const pendingCount = history.filter((h: any) => h.status === 'pending').length;
      setPendingShareCount(pendingCount);
    }

    // Load raffle tickets
    const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
    const total = Object.values(raffleTickets).reduce((sum: number, count) => sum + (count as number), 0);
    setMyRaffleTickets(total);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('exfluencer_user');
    router.push('/auth/login');
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      // Basic info (30%)
      { name: t.profile.name, value: userProfile.name, weight: 5 },
      { name: t.profile.email, value: userProfile.email, weight: 5 },
      { name: t.profile.phone, value: userProfile.phone, weight: 5 },
      { name: t.profile.location, value: userProfile.location, weight: 5 },
      { name: t.profile.introduction, value: userProfile.bio, weight: 5 },
      { name: t.profile.profilePhoto, value: userProfile.avatar, weight: 5 },

      // Demographic info (20%)
      { name: t.profile.gender, value: userProfile.gender, weight: 5 },
      { name: t.profile.ageRange, value: userProfile.ageRange, weight: 5 },
      { name: t.profile.maritalStatus, value: userProfile.maritalStatus, weight: 3 },
      { name: t.profile.education, value: userProfile.education, weight: 3 },
      { name: t.profile.occupation, value: userProfile.occupationDetail, weight: 4 },

      // Lifestyle info (15%)
      { name: t.profile.housingType, value: userProfile.housingType, weight: 3 },
      { name: t.profile.hasChildren, value: userProfile.hasChildren !== undefined, weight: 3 },
      { name: t.profile.hasPets, value: userProfile.hasPets !== undefined, weight: 3 },
      { name: t.profile.hasVehicle, value: userProfile.hasVehicle !== undefined, weight: 3 },
      { name: t.profile.hobbies, value: userProfile.hobbies?.length > 0, weight: 3 },

      // Beauty info (10%)
      { name: t.profile.skinType, value: userProfile.skinType, weight: 4 },
      { name: t.profile.skinTone, value: userProfile.skinTone, weight: 3 },
      { name: t.profile.hairType, value: userProfile.hairType, weight: 3 },

      // Tech/gadgets (5%)
      { name: t.profile.smartphoneModel, value: userProfile.phoneModel, weight: 3 },
      { name: t.profile.smartDevices, value: userProfile.smartDevices?.length > 0, weight: 2 },

      // Social accounts (20%)
      { name: t.profile.instagramConnection, value: userProfile.socialAccounts.find(s => s.platform === 'instagram')?.connected, weight: 5 },
      { name: t.profile.tiktokConnection, value: userProfile.socialAccounts.find(s => s.platform === 'tiktok')?.connected, weight: 5 },
      { name: t.profile.youtubeConnection, value: userProfile.socialAccounts.find(s => s.platform === 'youtube')?.connected, weight: 5 },
      { name: t.profile.facebookConnection, value: userProfile.socialAccounts.find(s => s.platform === 'facebook')?.connected, weight: 5 },
    ];

    const totalWeight = fields.reduce((sum, f) => sum + f.weight, 0);
    const completedWeight = fields.reduce((sum, f) => {
      const isFilled = typeof f.value === 'string' ? f.value.trim() !== '' : Boolean(f.value);
      return isFilled ? sum + f.weight : sum;
    }, 0);

    const percentage = Math.round((completedWeight / totalWeight) * 100);
    const missingFields = fields.filter(f => {
      const isFilled = typeof f.value === 'string' ? f.value.trim() !== '' : Boolean(f.value);
      return !isFilled;
    });

    return {
      percentage,
      missingFields: missingFields.map(f => f.name),
      completedCount: fields.length - missingFields.length,
      totalCount: fields.length,
    };
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader title={t.nav.profile} showNotification />

      <div className="container-mobile space-y-6 py-6">
        {/* 💰 내 자산 요약 - 최우선 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/influencer/wallet?tab=cash">
            <div className="card bg-gradient-to-br from-green-500/30 to-green-600/10 border-2 border-green-500/50 hover:border-green-500/80 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={20} className="text-green-400" />
                <span className="text-xs text-green-400 font-bold">💰 {t.wallet.cashPoints}</span>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                2.5M
              </div>
              <div className="text-xs text-gray-400">{t.dashboard.tapToWithdraw}</div>
            </div>
          </Link>

          <Link href="/main/influencer/wallet?tab=shopping">
            <div className="card bg-gradient-to-br from-blue-500/30 to-purple-600/20 border-2 border-blue-500/50 hover:border-blue-500/80 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart size={20} className="text-blue-400" />
                <span className="text-xs text-blue-400 font-bold">🛍️ {t.wallet.shoppingPoints}</span>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                150K
              </div>
              <div className="text-xs text-gray-400">{t.dashboard.tapToShop}</div>
            </div>
          </Link>
        </div>

        {/* Profile Completion Card */}
        <div className={`card ${
          profileCompletion.percentage >= 90 ? 'border-2 border-success' :
          profileCompletion.percentage >= 70 ? 'border-2 border-primary' :
          profileCompletion.percentage >= 50 ? 'border-2 border-warning' :
          'border-2 border-error'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={20} className={
                profileCompletion.percentage >= 90 ? 'text-success' :
                profileCompletion.percentage >= 70 ? 'text-primary' :
                profileCompletion.percentage >= 50 ? 'text-warning' :
                'text-error'
              } />
              <h3 className="text-lg font-bold text-white">{t.profile.completionPercentage}</h3>
            </div>
            <div className={`text-3xl font-bold ${
              profileCompletion.percentage >= 90 ? 'text-success' :
              profileCompletion.percentage >= 70 ? 'text-primary' :
              profileCompletion.percentage >= 50 ? 'text-warning' :
              'text-error'
            }`}>
              {profileCompletion.percentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-600 rounded-full h-3 mb-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                profileCompletion.percentage >= 90 ? 'bg-success' :
                profileCompletion.percentage >= 70 ? 'bg-primary' :
                profileCompletion.percentage >= 50 ? 'bg-warning' :
                'bg-error'
              }`}
              style={{ width: `${profileCompletion.percentage}%` }}
            ></div>
          </div>

          {/* Status Message */}
          <div className="text-sm mb-3">
            <span className="text-gray-400">
              {profileCompletion.completedCount} / {profileCompletion.totalCount}{' '}
              {t.profile.itemsCompleted}
            </span>
          </div>

          {/* Benefits Message */}
          {profileCompletion.percentage < 100 && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-primary font-semibold mb-1">
                    {t.profile.completeProfileForMore}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {t.profile.higherCompletionBetterMatching}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Perfect Profile Message */}
          {profileCompletion.percentage === 100 && (
            <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-sm">
              <div className="flex items-start gap-2">
                <Trophy size={16} className="text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-success font-semibold mb-1">
                    {t.profile.perfectProfile}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {t.profile.allInfoCompleted}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Missing Fields Dropdown */}
          {profileCompletion.missingFields.length > 0 && (
            <details className="text-xs mt-3">
              <summary className="cursor-pointer text-gray-400 hover:text-white transition-colors">
                {t.profile.viewMissingItems.replace('{count}', profileCompletion.missingFields.length.toString())}
              </summary>
              <div className="mt-2 pt-2 border-t border-dark-500">
                <div className="grid grid-cols-2 gap-2">
                  {profileCompletion.missingFields.map((field, index) => (
                    <div key={index} className="text-gray-500 flex items-center gap-1">
                      <span>•</span>
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          )}

          {/* Edit Profile Button */}
          <Link href="/main/influencer/profile/edit">
            <button className="w-full mt-3 bg-primary hover:bg-primary/80 text-white font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
              <Edit size={16} />
              {t.profile.edit}
            </button>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
          <div className="flex items-start gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-full border-4 border-primary"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{userProfile.name}</h2>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  {userProfile.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  {userProfile.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-blue-400" />
                  <span className="text-blue-400">Zalo: {userProfile.zalo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {userProfile.location}
                </div>
              </div>
            </div>
            <Link
              href="/main/influencer/profile/edit"
              className="btn-icon bg-primary text-white hover:bg-primary-dark"
            >
              <Edit size={20} />
            </Link>
          </div>

          {/* Bio */}
          {userProfile.bio && (
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              {userProfile.bio}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/influencer/completed">
            <div className="card text-center hover:bg-dark-600 transition-colors cursor-pointer border-2 border-green-500/30 hover:border-green-500/50">
              <div className="text-2xl font-bold text-green-400">
                {userProfile.stats.completedCampaigns}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.influencer.completedCampaigns}</div>
              <div className="text-xs text-green-500 mt-1 font-semibold">
                {t.profile.viewEarnings}
              </div>
            </div>
          </Link>
          <Link href="/main/influencer/reviews">
            <div className="card text-center hover:bg-dark-600 transition-colors cursor-pointer">
              <div className="text-2xl font-bold text-accent">
                {userProfile.stats.rating.toFixed(1)} ⭐
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {t.profile.averageRating}
              </div>
              <div className="text-xs text-primary mt-1">
                {t.profile.viewReviews}
              </div>
            </div>
          </Link>
          {(totalShareEarnings > 0 || pendingShareCount > 0) && (
            <Link href="/main/influencer/shares" className="col-span-2">
              <div className="card text-center bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 hover:bg-primary/10 transition-colors cursor-pointer">
                <div className="text-2xl font-bold text-primary">
                  +{(totalShareEarnings / 1000).toFixed(0)}K VND
                </div>
                <div className="text-xs text-gray-400 mt-1">📣 {t.profile.snsShareBonus}</div>
                {pendingShareCount > 0 && (
                  <div className="text-xs text-warning mt-1">
                    ⏱️ {t.profile.pendingReview.replace('{count}', pendingShareCount.toString())}
                  </div>
                )}
                {totalShareEarnings === 0 && pendingShareCount > 0 && (
                  <div className="text-xs text-gray-500 mt-1">{t.profile.pointsAfterApproval}</div>
                )}
                <div className="text-xs text-primary mt-2">{t.dashboard.viewHistory}</div>
              </div>
            </Link>
          )}
        </div>

        {/* Social Accounts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">
              {t.profile.snsConnected}
            </h3>
            <Link href="/main/influencer/profile/edit" className="text-sm text-primary">
              {t.common.edit}
            </Link>
          </div>

          {userProfile.socialAccounts.map((account) => {
            const Icon = platformIcons[account.platform];
            const bgColor = platformColors[account.platform];

            return (
              <div key={account.platform} className="card">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white capitalize">
                        {account.platform}
                      </h4>
                      {account.verified && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {t.profile.verified}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{account.username}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCompactNumber(account.followers)} {t.profile.followers}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {t.profile.lastUpdated}: {account.lastUpdated}
                    </p>
                  </div>
                  {account.connected ? (
                    <span className="text-success text-sm font-medium">{t.profile.connected}</span>
                  ) : (
                    <Link href="/main/influencer/profile/edit" className="btn btn-primary text-sm px-4">
                      {t.profile.connect}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Extended Profile Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">📋 {t.profile.detailedProfile}</h3>
            <Link href="/main/influencer/profile/edit" className="text-sm text-primary">
              {t.profile.edit}
            </Link>
          </div>

          {/* Demographics */}
          <div className="card">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <User size={16} className="text-primary" />
              {t.profile.basic}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">{t.profile.gender}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.gender === 'female' ? t.profile.female : userProfile.gender === 'male' ? t.profile.male : t.profile.other}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.ageRange}</span>
                <p className="text-white font-medium mt-0.5">{userProfile.ageRange}{t.profile.years}</p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.maritalStatus}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.maritalStatus === 'single' ? t.profile.single :
                   userProfile.maritalStatus === 'married' ? t.profile.married :
                   userProfile.maritalStatus === 'divorced' ? t.profile.divorced : t.profile.widowed}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.education}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.education === 'bachelor' ? t.profile.bachelor :
                   userProfile.education === 'master' ? t.profile.master :
                   userProfile.education === 'doctorate' ? t.profile.doctorate : t.profile.other}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{t.profile.occupation}</span>
                <p className="text-white font-medium mt-0.5">{userProfile.occupationDetail}</p>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="card">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Home size={16} className="text-primary" />
              {t.profile.lifestyle}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">{t.profile.hasVehicle}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.hasVehicle ? '✅' : t.profile.noVehicle}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{t.profile.housingType}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.housingType === 'apartment' ? t.profile.apartment :
                   userProfile.housingType === 'house' ? t.profile.house :
                   userProfile.housingType === 'villa' ? t.profile.villa :
                   userProfile.housingType === 'studio' ? t.profile.studio : t.profile.other}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.hasChildren}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.hasChildren ? '✅' : t.profile.noChildren}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.hasPets}</span>
                <p className="text-white font-medium mt-0.5">
                  {userProfile.hasPets ? '✅' : t.profile.noPets}
                </p>
              </div>
            </div>
          </div>

          {/* Beauty & Fashion (if applicable) */}
          {userProfile.categories.includes('beauty') && (
            <div className="card">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Heart size={16} className="text-pink-400" />
                {t.profile.beautyInfo}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">{t.profile.skinType}</span>
                  <p className="text-white font-medium mt-0.5">
                    {userProfile.skinType === 'dry' ? t.profile.drySkin :
                     userProfile.skinType === 'oily' ? t.profile.oilySkin :
                     userProfile.skinType === 'combination' ? t.profile.combinationSkin :
                     userProfile.skinType === 'sensitive' ? t.profile.sensitiveSkin : t.profile.normalSkin}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">{t.profile.skinTone}</span>
                  <p className="text-white font-medium mt-0.5">
                    {userProfile.skinTone === 'fair' ? t.profile.veryFair :
                     userProfile.skinTone === 'light' ? t.profile.fair :
                     userProfile.skinTone === 'medium' ? t.profile.medium :
                     userProfile.skinTone === 'tan' ? t.profile.tan : t.profile.dark}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">{t.profile.hairType}</span>
                  <p className="text-white font-medium mt-0.5">
                    {userProfile.hairType === 'straight' ? t.profile.straightHair :
                     userProfile.hairType === 'wavy' ? t.profile.wavyHair :
                     userProfile.hairType === 'curly' ? t.profile.curlyHair : t.profile.coilyHair}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tech & Gadgets */}
          <div className="card">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Smartphone size={16} className="text-blue-400" />
              {t.profile.techGadgets}
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">{t.profile.smartphoneModel}</span>
                <p className="text-white font-medium mt-0.5">{userProfile.phoneModel}</p>
              </div>
              <div>
                <span className="text-gray-500">{t.profile.smartDevices}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userProfile.smartDevices.map((device) => (
                    <span key={device} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                      {device.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hobbies */}
          <div className="card">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Heart size={16} className="text-purple-400" />
              {t.profile.hobbiesInterests}
            </h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.hobbies.map((hobby) => (
                <span key={hobby} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 text-sm rounded-full">
                  {hobby === 'photography' ? '📸 Photography' :
                   hobby === 'travel' ? '✈️ Travel' :
                   hobby === 'cooking' ? '🍳 Cooking' :
                   hobby === 'gaming' ? '🎮 Gaming' :
                   hobby === 'reading' ? '📚 Reading' :
                   hobby === 'music' ? '🎵 Music' : hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rewards & Benefits */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.profile.rewardsBenefits}</h3>

          <Link href="/main/influencer/invite-advertiser">
            <div className="card-hover border-2 border-secondary/50 bg-gradient-to-r from-secondary/20 to-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center">
                    <Building2 size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">💼 {t.profile.inviteAdvertiser}</h4>
                    <p className="text-xs text-gray-400">{t.profile.inviteAdvertiserDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-1 bg-accent text-white text-xs rounded-full font-bold">NEW 🔥</span>
                  <ChevronRight size={20} className="text-gray-400 mt-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link href="/main/influencer/attendance">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.attendanceCheck}</h4>
                  <p className="text-xs text-gray-400">{t.profile.attendanceCheckDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/main/influencer/referral">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <UsersIcon size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.inviteFriends}</h4>
                  <p className="text-xs text-gray-400">{t.profile.inviteFriendsDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/main/influencer/shop">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={20} className="text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.pointsShop}</h4>
                  <p className="text-xs text-gray-400">{t.profile.pointsShopDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.profile.myActivities}</h3>

          {/* 내 캠페인 - 전체 진행 상태 */}
          <Link href="/main/influencer/my-campaigns">
            <div className="card-hover flex items-center justify-between border-2 border-mint/50 bg-gradient-to-r from-mint/10 to-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-mint to-primary rounded-xl flex items-center justify-center shadow-lg shadow-mint/20">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    {t.profile.myCampaigns}
                    <span className="px-1.5 py-0.5 bg-mint text-black text-[10px] rounded-full font-black">NEW</span>
                  </h4>
                  <p className="text-xs text-gray-400">{t.profile.myCampaignsDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-mint/20 text-mint text-xs rounded-full font-bold">9</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 완료한 캠페인 */}
          <Link href="/main/influencer/completed">
            <div className="card-hover flex items-center justify-between border-2 border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.completedCampaigns}</h4>
                  <p className="text-xs text-gray-400">{t.profile.completedCampaignsDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">6</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 진행 중인 작업 */}
          <Link href="/main/influencer/jobs">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.inProgressWork}</h4>
                  <p className="text-xs text-gray-400">{t.profile.inProgressWorkDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-bold">3</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 찜 목록 */}
          <Link href="/main/influencer/favorites">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Heart size={20} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.favoriteCampaigns}</h4>
                  <p className="text-xs text-gray-400">{t.profile.favoriteCampaignsDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-bold">4</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 내 응모권 */}
          <Link href="/main/influencer/my-raffles">
            <div className="card-hover flex items-center justify-between border-2 border-primary/30 hover:border-primary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Ticket size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.myRaffleTickets}</h4>
                  <p className="text-xs text-gray-400">{t.profile.myRaffleTicketsDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-bold">{myRaffleTickets}{t.raffle.ticketUnit}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 메시지 */}
          <Link href="/main/messages">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.messages}</h4>
                  <p className="text-xs text-gray-400">{t.profile.messagesDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-accent text-white text-xs rounded-full font-bold">3</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>

          {/* 랭킹 */}
          <Link href="/main/influencer/ranking">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Trophy size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.myRanking}</h4>
                  <p className="text-xs text-gray-400">{t.profile.myRankingDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-yellow-400">15{t.dashboard.rankingPosition}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>
        </div>

        {/* Account Settings */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.profile.accountSettings}</h3>

          <Link href="/main/influencer/wallet">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Wallet size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.wallet}</h4>
                  <p className="text-xs text-gray-400">{t.profile.walletDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/main/influencer/stats">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <BarChart size={20} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.statistics}</h4>
                  <p className="text-xs text-gray-400">{t.profile.statisticsDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/main/influencer/portfolio">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.portfolio}</h4>
                  <p className="text-xs text-gray-400">{t.profile.portfolioDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/settings/notifications">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-info/20 rounded-xl flex items-center justify-center">
                  <Bell size={20} className="text-info" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.notificationSettings}</h4>
                  <p className="text-xs text-gray-400">{t.profile.notificationSettingsDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/settings">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500/20 rounded-xl flex items-center justify-center">
                  <Settings size={20} className="text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.profile.settings}</h4>
                  <p className="text-xs text-gray-400">{t.profile.settingsDesc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Support Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.profile.support}</h3>

          <Link href="/help">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-400" />
                <span className="text-white">{t.profile.help}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/terms">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <span className="text-white">{t.profile.termsOfService}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>

          <Link href="/privacy">
            <div className="card-hover flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-400" />
                <span className="text-white">{t.profile.privacyPolicy}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-ghost w-full text-error">
          <LogOut size={20} />
          {t.profile.logout}
        </button>

        {/* Version */}
        <div className="text-center text-xs text-gray-500">
          Exfluencer VN v1.0.0
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="influencer" />
    </div>
  );
}

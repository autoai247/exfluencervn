'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Share2,
  Copy,
  CheckCircle,
  ChevronRight,
  Star,
  MapPin,
  MessageCircle,
  BarChart2,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  FileText,
  Shield,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCompactNumber } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockUserProfile } from '@/lib/mockData';

// ─── Mock Rate Card Data ────────────────────────────────────
const rateCard = [
  { type: 'Post / Feed', price: 500000, note: '1 bài đăng + caption' },
  { type: 'Story (3 frames)', price: 200000, note: '3 khung story liên tiếp' },
  { type: 'Reel / Short', price: 800000, note: 'Video 15–60 giây' },
  { type: 'Package (Post + Story + Reel)', price: 1200000, note: 'Combo đủ gói' },
];

const pastCampaigns = [
  {
    id: 'c1',
    brand: 'Laneige Vietnam',
    title: 'Water Sleeping Mask Review',
    platform: 'instagram' as const,
    result: '45K lượt xem · 3.2K likes',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
  },
  {
    id: 'c2',
    brand: 'FitLife App',
    title: 'Fitness Challenge Vlog',
    platform: 'tiktok' as const,
    result: '120K lượt xem · 8.5K shares',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop',
  },
  {
    id: 'c3',
    brand: 'K-Beauty Co.',
    title: 'Spring Makeup Look',
    platform: 'instagram' as const,
    result: '32K lượt xem · 2.1K saves',
    thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=200&fit=crop',
  },
];

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  tiktok: 'bg-black',
  youtube: 'bg-red-600',
  facebook: 'bg-blue-600',
};

// ─── Component ─────────────────────────────────────────────
export default function InfluencerProfilePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const userProfile = getMockUserProfile(language);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleLogout = () => {
    try { localStorage.removeItem('exfluencer_user'); } catch { /* ignore */ }
    router.push('/auth/login');
  };

  const shareProfile = async () => {
    const url = `https://exfluencer.vn/kol/${userProfile.name.toLowerCase().replace(/\s+/g, '-')}`;
    const text = `📊 Rate card của ${userProfile.name}\nXem hồ sơ KOL trên Exfluencer VN: ${url}`;
    if (navigator.share) {
      await navigator.share({ title: `${userProfile.name} - KOL Profile`, text, url });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title="Hồ sơ của tôi" showNotification />

      <div className="container-mobile space-y-4 py-5">

        {/* ── Profile Card ── */}
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/40 shadow-xl">
          <div className="flex items-start gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-2xl border-4 border-primary object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">{userProfile.name}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={13} className="text-accent fill-accent" />
                <span className="text-sm font-bold text-accent">{userProfile.stats.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">· {userProfile.stats.completedCampaigns} chiến dịch</span>
                <span className="text-xs text-green-400 font-semibold">· ER {userProfile.engagementRate}%</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-gray-500" />
                <span className="text-xs text-gray-400">{userProfile.location}</span>
              </div>
              {userProfile.zalo && (
                <div className="flex items-center gap-1 mt-1">
                  <MessageCircle size={12} className="text-blue-400" />
                  <span className="text-xs text-blue-400">Zalo: {userProfile.zalo}</span>
                </div>
              )}
            </div>
            <Link href="/main/influencer/profile/edit">
              <div className="w-9 h-9 bg-dark-600 rounded-xl flex items-center justify-center border border-dark-400">
                <Edit size={16} className="text-gray-400" />
              </div>
            </Link>
          </div>

          {userProfile.bio && (
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{userProfile.bio}</p>
          )}

          {/* Niche tags */}
          {userProfile.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {userProfile.categories.map((c: string) => (
                <span key={c} className="px-2.5 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 capitalize">
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Share button */}
          <button
            type="button"
            onClick={shareProfile}
            className="mt-4 w-full py-2.5 rounded-xl bg-dark-600 border border-dark-400 text-sm text-gray-300 flex items-center justify-center gap-2"
          >
            {copied ? <CheckCircle size={15} className="text-accent" /> : <Share2 size={15} />}
            {copied ? (language === 'ko' ? '프로필 링크 복사됨!' : 'Đã sao chép link hồ sơ!') : (language === 'ko' ? '광고주와 프로필 공유' : 'Chia sẻ hồ sơ với nhà quảng cáo')}
          </button>
        </div>

        {/* ── Social Accounts ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-300">Kênh mạng xã hội</h3>
            <Link href="/main/influencer/profile/edit" className="text-xs text-primary">Chỉnh sửa</Link>
          </div>

          {userProfile.socialAccounts.map((acc: { platform: keyof typeof platformIcons; username: string; followers: number; connected: boolean; verified: boolean; lastUpdated?: string }) => {
            const Icon = platformIcons[acc.platform];
            const bg = platformColors[acc.platform];
            return (
              <div key={acc.platform} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white capitalize">{acc.platform}</span>
                      {acc.verified && (
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-full border border-blue-500/30">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{acc.username}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-white">{formatCompactNumber(acc.followers)}</div>
                    <div className="text-[10px] text-gray-500">followers</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Rate Card ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-300">Bảng giá dịch vụ</h3>
            <Link href="/main/influencer/profile/edit" className="text-xs text-primary">Cập nhật</Link>
          </div>

          <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl p-0 overflow-hidden">
            {rateCard.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < rateCard.length - 1 ? 'border-b border-dark-500' : ''
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-white">{item.type}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{item.note}</div>
                </div>
                <div className="text-sm font-bold text-accent flex-shrink-0 ml-3">
                  {(item.price / 1000).toFixed(0)}K VND
                </div>
              </div>
            ))}
            <div className="px-4 py-2.5 bg-dark-700/50 border-t border-dark-500">
              <p className="text-[11px] text-gray-500">{language === 'ko' ? '* 캠페인에 따라 가격 협의 가능. 자세한 내용은 문의해 주세요.' : '* Giá có thể thương lượng tùy chiến dịch. Liên hệ để biết thêm chi tiết.'}</p>
            </div>
          </div>
        </div>

        {/* ── Past Campaigns ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-300">{language === 'ko' ? '완료한 캠페인' : 'Chiến dịch đã thực hiện'}</h3>
            <Link href="/main/influencer/completed" className="text-xs text-primary">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
          </div>

          <div className="space-y-3">
            {pastCampaigns.map(c => {
              const Icon = platformIcons[c.platform];
              return (
                <div key={c.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl p-0 overflow-hidden flex">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-24 h-20 object-cover flex-shrink-0"
                  />
                  <div className="px-3 py-2.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={12} className="text-gray-400" />
                      <span className="text-[11px] text-gray-400">{c.brand}</span>
                    </div>
                    <div className="text-sm font-semibold text-white leading-tight truncate">{c.title}</div>
                    <div className="text-[11px] text-accent mt-1">{c.result}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{language === 'ko' ? '활동' : 'Hoạt động'}</h3>

          {[
            { href: '/main/influencer/jobs', icon: Briefcase, label: language === 'ko' ? '진행 중인 캠페인' : 'Chiến dịch đang thực hiện', badge: '3', color: 'bg-primary/20', iconColor: 'text-primary' },
            { href: '/main/influencer/earnings', icon: BarChart2, label: language === 'ko' ? '수입 내역' : 'Lịch sử thu nhập', color: 'bg-accent/20', iconColor: 'text-accent' },
            { href: '/main/messages', icon: MessageCircle, label: language === 'ko' ? '메시지' : 'Tin nhắn', badge: '3', color: 'bg-blue-500/20', iconColor: 'text-blue-400' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 bg-dark-600 rounded-xl px-4 py-3 border border-dark-500">
                <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <span className="text-sm font-medium text-white flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* ── Settings ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 px-1">Cài đặt & Hỗ trợ</h3>

          {[
            { href: '/settings/notifications', icon: Bell, label: 'Thông báo' },
            { href: '/settings', icon: Settings, label: 'Cài đặt tài khoản' },
            { href: '/help', icon: HelpCircle, label: 'Trợ giúp' },
            { href: '/terms', icon: FileText, label: 'Điều khoản dịch vụ' },
            { href: '/privacy', icon: Shield, label: 'Chính sách bảo mật' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 bg-dark-600 rounded-xl px-4 py-3 border border-dark-500">
                <item.icon size={18} className="text-gray-400" />
                <span className="text-sm text-white flex-1">{item.label}</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-dark-600 border border-red-500/30 text-red-400 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>

        <div className="text-center text-xs text-gray-600">Exfluencer VN v1.0.0</div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

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
  { type: 'Post / Feed', price: 500000, noteKo: '게시물 1개 + 캡션', noteVi: '1 bài đăng + caption' },
  { type: 'Story (3 frames)', price: 200000, noteKo: '스토리 3프레임 연속', noteVi: '3 khung story liên tiếp' },
  { type: 'Reel / Short', price: 800000, noteKo: '영상 15–60초', noteVi: 'Video 15–60 giây' },
  { type: 'Package (Post + Story + Reel)', price: 1200000, noteKo: '풀 패키지 콤보', noteVi: 'Combo đủ gói' },
];

const pastCampaigns = [
  {
    id: 'c1',
    brand: 'Laneige Vietnam',
    title: 'Water Sleeping Mask Review',
    platform: 'instagram' as const,
    resultKo: '45K 조회수 · 3.2K 좋아요',
    resultVi: '45K lượt xem · 3.2K likes',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
  },
  {
    id: 'c2',
    brand: 'FitLife App',
    title: 'Fitness Challenge Vlog',
    platform: 'tiktok' as const,
    resultKo: '120K 조회수 · 8.5K 공유',
    resultVi: '120K lượt xem · 8.5K shares',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop',
  },
  {
    id: 'c3',
    brand: 'K-Beauty Co.',
    title: 'Spring Makeup Look',
    platform: 'instagram' as const,
    resultKo: '32K 조회수 · 2.1K 저장',
    resultVi: '32K lượt xem · 2.1K saves',
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
    const text = language === 'ko'
      ? `📊 ${userProfile.name}의 Rate Card\nExfluencer VN에서 KOL 프로필 보기: ${url}`
      : `📊 Rate card của ${userProfile.name}\nXem hồ sơ KOL trên Exfluencer VN: ${url}`;
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
      <MobileHeader title={language === 'ko' ? '내 프로필' : 'Hồ sơ của tôi'} showNotification />

      <div className="container-mobile space-y-4 py-5">

        {/* ── Profile Card ── */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl bg-gradient-to-br from-primary/15 to-secondary/10">
          <div className="flex items-start gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-2xl border-2 border-primary/50 object-cover flex-shrink-0 shadow-lg shadow-primary/20"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">{userProfile.name}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={13} className="text-accent fill-accent" />
                <span className="text-sm font-bold text-accent">{userProfile.stats.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">· {userProfile.stats.completedCampaigns} {language === 'ko' ? '캠페인' : 'chiến dịch'}</span>
                <span className="text-xs text-success font-semibold">· ER {userProfile.engagementRate}%</span>
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
              <div className="w-9 h-9 bg-dark-700/80 rounded-xl flex items-center justify-center border border-dark-400/40 hover:border-primary/40 transition-all">
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
            className="mt-4 w-full py-2.5 rounded-xl bg-dark-700/80 border border-dark-400/40 text-sm text-gray-300 flex items-center justify-center gap-2 hover:border-primary/40 hover:text-white transition-all"
          >
            {copied ? <CheckCircle size={15} className="text-accent" /> : <Share2 size={15} />}
            {copied ? (language === 'ko' ? '프로필 링크 복사됨!' : 'Đã sao chép link hồ sơ!') : (language === 'ko' ? '광고주와 프로필 공유' : 'Chia sẻ hồ sơ với nhà quảng cáo')}
          </button>
        </div>

        {/* ── Social Accounts ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? 'SNS 채널' : 'Kênh mạng xã hội'}</h3>
            </div>
            <Link href="/main/influencer/profile/edit" className="text-xs text-primary font-medium">{language === 'ko' ? '편집' : 'Chỉnh sửa'}</Link>
          </div>

          {userProfile.socialAccounts.map((acc: { platform: keyof typeof platformIcons; username: string; followers: number; connected: boolean; verified: boolean; lastUpdated?: string }) => {
            const Icon = platformIcons[acc.platform];
            const bg = platformColors[acc.platform];
            return (
              <div key={acc.platform} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
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
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-accent to-yellow-400 rounded-full" />
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '서비스 요금표' : 'Bảng giá dịch vụ'}</h3>
            </div>
            <Link href="/main/influencer/profile/edit" className="text-xs text-primary font-medium">{language === 'ko' ? '업데이트' : 'Cập nhật'}</Link>
          </div>

          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl overflow-hidden">
            {rateCard.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < rateCard.length - 1 ? 'border-b border-dark-400/30' : ''
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-white">{item.type}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{language === 'ko' ? item.noteKo : item.noteVi}</div>
                </div>
                <div className="text-sm font-bold text-accent flex-shrink-0 ml-3">
                  {(item.price / 1000).toFixed(0)}K VND
                </div>
              </div>
            ))}
            <div className="px-4 py-2.5 bg-dark-700/50 border-t border-dark-400/30">
              <p className="text-[11px] text-gray-500">{language === 'ko' ? '* 캠페인에 따라 가격 협의 가능. 자세한 내용은 문의해 주세요.' : '* Giá có thể thương lượng tùy chiến dịch. Liên hệ để biết thêm chi tiết.'}</p>
            </div>
          </div>
        </div>

        {/* ── Past Campaigns ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-secondary to-primary rounded-full" />
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '완료한 캠페인' : 'Chiến dịch đã thực hiện'}</h3>
            </div>
            <Link href="/main/influencer/completed" className="text-xs text-primary font-medium">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
          </div>

          <div className="space-y-3">
            {pastCampaigns.map(c => {
              const Icon = platformIcons[c.platform];
              return (
                <div key={c.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl overflow-hidden flex">
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
                    <div className="text-[11px] text-accent mt-1">{language === 'ko' ? c.resultKo : c.resultVi}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '활동' : 'Hoạt động'}</h3>
          </div>

          {[
            { href: '/main/influencer/jobs', icon: Briefcase, label: language === 'ko' ? '진행 중인 캠페인' : 'Chiến dịch đang thực hiện', badge: '3', bgColor: 'bg-primary/15', iconColor: 'text-primary' },
            { href: '/main/influencer/earnings', icon: BarChart2, label: language === 'ko' ? '수입 내역' : 'Lịch sử thu nhập', bgColor: 'bg-accent/15', iconColor: 'text-accent' },
            { href: '/main/messages', icon: MessageCircle, label: language === 'ko' ? '메시지' : 'Tin nhắn', badge: '3', bgColor: 'bg-secondary/15', iconColor: 'text-secondary' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 bg-dark-600/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-dark-400/40 shadow-xl">
                <div className={`w-9 h-9 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <span className="text-sm font-medium text-white flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold border border-primary/30">
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
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '설정 & 지원' : 'Cài đặt & Hỗ trợ'}</h3>
          </div>

          {[
            { href: '/settings/notifications', icon: Bell, label: language === 'ko' ? '알림' : 'Thông báo' },
            { href: '/settings', icon: Settings, label: language === 'ko' ? '계정 설정' : 'Cài đặt tài khoản' },
            { href: '/help', icon: HelpCircle, label: language === 'ko' ? '도움말' : 'Trợ giúp' },
            { href: '/terms', icon: FileText, label: language === 'ko' ? '이용약관' : 'Điều khoản dịch vụ' },
            { href: '/privacy', icon: Shield, label: language === 'ko' ? '개인정보처리방침' : 'Chính sách bảo mật' },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 bg-dark-600/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-dark-400/40 shadow-xl">
                <div className="w-9 h-9 bg-dark-500/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-gray-400" />
                </div>
                <span className="text-sm text-white flex-1">{item.label}</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl bg-dark-600/80 backdrop-blur-sm border border-error/30 text-error text-sm font-semibold flex items-center justify-center gap-2 hover:bg-error/10 transition-all"
        >
          <LogOut size={16} />
          {language === 'ko' ? '로그아웃' : 'Đăng xuất'}
        </button>

        <div className="text-center text-xs text-gray-600">Exfluencer VN v1.0.0</div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

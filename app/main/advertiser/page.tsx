'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Users,
  Clock,
  ChevronRight,
  AlertCircle,
  BadgeDollarSign,
  FileText,
  Search,
  Star,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash, formatCompactNumber } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// ─── Mock Data ───────────────────────────────────────────
const mockData = {
  company: {
    name: 'K-Beauty Co.',
    logo: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
  },

  activeCampaigns: [
    {
      id: '1',
      title: 'Skincare Product Review',
      platform: 'Facebook + TikTok',
      deliverableKo: '게시물 × 1 · 스토리 × 3',
      deliverableVi: 'Bài đăng × 1 · Story × 3',
      budget: 500000,
      accepted: 8,
      deadline: '15/03',
      pendingSubmit: 3,
      pendingPayment: 2,
    },
    {
      id: '2',
      title: 'Spring Makeup Promo',
      platform: 'TikTok',
      deliverable: 'Video × 1 (60s)',
      budget: 400000,
      accepted: 5,
      deadline: '20/03',
      pendingSubmit: 0,
      pendingPayment: 1,
    },
  ],

  pendingKols: [
    {
      id: 'k1',
      name: 'Linh Nguyễn',
      platform: 'TikTok',
      followers: 285000,
      engagement: 0.072,
      rate: 500000,
      avatar: 'https://ui-avatars.com/api/?name=Linh+Nguyen&background=FF6B6B&color=fff',
      campaign: 'Skincare Review',
      niche: 'Beauty',
    },
    {
      id: 'k2',
      name: 'Minh Tuấn',
      platform: 'Facebook',
      followers: 142000,
      engagement: 0.058,
      rate: 300000,
      avatar: 'https://ui-avatars.com/api/?name=Minh+Tuan&background=4ECDC4&color=fff',
      campaign: 'Spring Makeup',
      niche: 'Lifestyle',
    },
  ],

  pendingPayments: [
    {
      id: 'p1',
      kolName: 'Thu Hà',
      kolAvatar: 'https://ui-avatars.com/api/?name=Thu+Ha&background=45B7D1&color=fff',
      campaign: 'Skincare Review',
      amount: 600000,
      contentUrl: 'https://www.tiktok.com',
    },
  ],

  recommendedKols: [
    {
      id: 'r1',
      name: 'Mai Anh',
      platform: 'Facebook',
      followers: 320000,
      engagement: 0.065,
      rate: 600000,
      niche: 'Beauty & Skincare',
      rating: 4.9,
      avatar: 'https://ui-avatars.com/api/?name=Mai+Anh&background=9B59B6&color=fff',
    },
    {
      id: 'r2',
      name: 'Hoàng Nam',
      platform: 'TikTok',
      followers: 180000,
      engagement: 0.089,
      rate: 400000,
      niche: 'Tech & Review',
      rating: 4.7,
      avatar: 'https://ui-avatars.com/api/?name=Hoang+Nam&background=E74C3C&color=fff',
    },
    {
      id: 'r3',
      name: 'Thanh Hương',
      platform: 'Instagram',
      followers: 95000,
      engagement: 0.112,
      rate: 250000,
      niche: 'Food & Travel',
      rating: 4.8,
      avatar: 'https://ui-avatars.com/api/?name=Thanh+Huong&background=27AE60&color=fff',
    },
  ],
};

// ─────────────────────────────────────────────────────────

export default function AdvertiserDashboard() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader
        title="Dashboard"
        showNotification
        onNotification={() => router.push('/main/advertiser/notifications')}
      />

      <div className="container-mobile space-y-5 py-5">

        {/* ── 회사 프로필 ── */}
        <Link href="/main/advertiser/profile">
          <div className="rounded-2xl bg-gradient-to-r from-dark-600 to-dark-500 border border-dark-400/50 p-4 flex items-center gap-3 hover:border-primary/30 transition-all shadow-lg group">
            <div className="relative flex-shrink-0">
              <img
                src={mockData.company.logo}
                alt={mockData.company.name}
                className="w-14 h-14 rounded-2xl border-2 border-primary/50 shadow-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-base leading-tight">{mockData.company.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t.advertiser.brandAccount} · {language === 'ko' ? '편집' : 'Chỉnh sửa'}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
              <ChevronRight size={16} className="text-primary" />
            </div>
          </div>
        </Link>

        {/* ── 입금 확인 긴급 알림 ── */}
        {mockData.pendingPayments.length > 0 && (
          <div className="rounded-2xl border-2 border-accent/40 p-4 shadow-lg shadow-accent/10" style={{background: 'linear-gradient(135deg, rgba(255,217,61,0.15) 0%, rgba(37,37,58,0.9) 100%)'}}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-accent/20 flex items-center justify-center">
                <BadgeDollarSign size={14} className="text-accent" />
              </div>
              <span className="text-sm font-bold text-accent">
                {mockData.pendingPayments.length} KOL {language === 'ko' ? '결제 확인 대기 중' : 'chờ xác nhận thanh toán'}
              </span>
            </div>
            {mockData.pendingPayments.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.kolAvatar} alt={p.kolName} className="w-9 h-9 rounded-xl flex-shrink-0 border border-accent/20" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{p.kolName} · {p.campaign}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '콘텐츠 제출 완료. 이체 후 확인해주세요.' : 'Đã nộp nội dung. Vui lòng chuyển khoản rồi xác nhận.'}</div>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <a href={p.contentUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] px-2 py-1 bg-dark-500/80 text-gray-300 rounded-lg text-center border border-dark-400/50 hover:bg-dark-400/50 transition-all">
                    {language === 'ko' ? '보기' : 'Xem'}
                  </a>
                  <button className="text-[10px] px-2 py-1 bg-accent text-dark-800 rounded-lg font-bold shadow-sm shadow-accent/30">
                    ✓ {formatCash(p.amount)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 핵심 도구 2개 ── */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/main/advertiser/campaigns/create">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 h-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                <FileText size={20} className="text-white" />
              </div>
              <div className="text-base font-bold text-white mb-1">{language === 'ko' ? '캠페인 생성' : 'Tạo chiến dịch'}</div>
              <div className="text-xs text-white/70">{language === 'ko' ? '자동 브리프 생성' : 'Tạo brief tự động'}<br />{language === 'ko' ? '표준화 템플릿' : 'Mẫu chuẩn hóa'}</div>
            </div>
          </Link>

          <Link href="/main/advertiser/influencers">
            <div className="rounded-2xl border border-dark-400/50 p-4 h-full shadow-lg hover:border-secondary/30 transition-all" style={{background: 'linear-gradient(135deg, rgba(37,37,58,0.9) 0%, rgba(26,26,46,0.9) 100%)'}}>
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center mb-3 border border-secondary/20">
                <Search size={20} className="text-secondary" />
              </div>
              <div className="text-base font-bold text-white mb-1">{language === 'ko' ? 'KOL 찾기' : 'Tìm KOL'}</div>
              <div className="text-xs text-gray-400">Followers · {language === 'ko' ? '단가' : 'Giá'} · ER<br />{language === 'ko' ? '빠른 비교' : 'So sánh nhanh'}</div>
            </div>
          </Link>
        </div>

        {/* ── KOL 신청 검토 ── */}
        {mockData.pendingKols.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <div className="w-1 h-4 bg-gradient-to-b from-warning to-primary rounded-full" />
                <AlertCircle size={13} className="text-warning" />
                {language === 'ko' ? `승인 대기 KOL (${mockData.pendingKols.length})` : `KOL đang chờ duyệt (${mockData.pendingKols.length})`}
              </h3>
              <Link href="/main/advertiser/campaigns?tab=approvals" className="text-xs text-primary font-medium">
                {language === 'ko' ? '전체 보기' : 'Xem tất cả'}
              </Link>
            </div>

            <div className="space-y-2">
              {mockData.pendingKols.map((kol) => (
                <div key={kol.id} className="bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-warning/15 shadow-lg hover:border-warning/25 transition-all">
                  <div className="flex items-center gap-3">
                    <img src={kol.avatar} alt={kol.name}
                      className="w-11 h-11 rounded-xl border border-dark-400/60 flex-shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">{kol.name}</div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-md">{kol.platform}</span>
                        <span className="text-[10px] text-gray-400">{formatCompactNumber(kol.followers)} followers</span>
                        <span className="text-[10px] text-accent font-semibold">{(kol.engagement * 100).toFixed(1)}% ER</span>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {kol.niche} · {kol.campaign} · <span className="text-white font-semibold">{formatCash(kol.rate)}/post</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link href={`/main/advertiser/influencers/${kol.id}`}
                      className="flex-1 py-2 bg-dark-500/80 text-gray-300 text-xs font-semibold rounded-xl text-center border border-dark-400/50 hover:bg-dark-400/50 transition-all">
                      {language === 'ko' ? '프로필 보기' : 'Xem hồ sơ'}
                    </Link>
                    <button className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                      ✓ {language === 'ko' ? '승인' : 'Duyệt'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 진행 중 캠페인 ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <Clock size={13} className="text-gray-400" />
              {language === 'ko' ? `진행 중 (${mockData.activeCampaigns.length})` : `Đang chạy (${mockData.activeCampaigns.length})`}
            </h3>
            <Link href="/main/advertiser/campaigns" className="text-xs text-primary font-medium">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
          </div>

          <div className="space-y-3">
            {mockData.activeCampaigns.map((c) => (
              <Link key={c.id} href={`/main/advertiser/campaigns/${c.id}`}>
                <div className="bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-primary/25 transition-all shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{c.title}</h4>
                      <div className="text-xs text-gray-400 mt-0.5">{c.platform}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{language === 'ko' ? (c.deliverableKo || c.deliverable) : (c.deliverableVi || c.deliverable)}</div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-sm font-bold text-accent">{formatCash(c.budget)}<span className="text-xs text-gray-500">/KOL</span></div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{language === 'ko' ? '마감:' : 'Hạn:'} {c.deadline}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl p-2 border border-dark-500/50">
                      <div className="font-bold text-white">{c.accepted}</div>
                      <div className="text-gray-500 mt-0.5">{language === 'ko' ? 'KOL 참여' : 'KOL tham gia'}</div>
                    </div>
                    <div className={`text-center rounded-xl p-2 border ${c.pendingSubmit > 0 ? 'bg-gradient-to-br from-warning/15 to-dark-800 border-warning/25' : 'bg-gradient-to-br from-dark-700 to-dark-800 border-dark-500/50'}`}>
                      <div className={`font-bold ${c.pendingSubmit > 0 ? 'text-warning' : 'text-white'}`}>{c.pendingSubmit}</div>
                      <div className="text-gray-500 mt-0.5">{language === 'ko' ? '제출 대기' : 'Chờ nộp bài'}</div>
                    </div>
                    <div className={`text-center rounded-xl p-2 border ${c.pendingPayment > 0 ? 'bg-gradient-to-br from-accent/15 to-dark-800 border-accent/25' : 'bg-gradient-to-br from-dark-700 to-dark-800 border-dark-500/50'}`}>
                      <div className={`font-bold ${c.pendingPayment > 0 ? 'text-accent' : 'text-white'}`}>{c.pendingPayment}</div>
                      <div className="text-gray-500 mt-0.5">{language === 'ko' ? '결제 대기' : 'Chờ TT'}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 추천 KOL ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <div className="w-1 h-4 bg-gradient-to-b from-secondary to-accent rounded-full" />
              <Users size={13} className="text-gray-400" />
              {language === 'ko' ? '추천 KOL' : 'KOL phù hợp với bạn'}
            </h3>
            <Link href="/main/advertiser/influencers" className="text-xs text-primary font-medium">
              {language === 'ko' ? '전체 보기' : 'Xem tất cả'}
            </Link>
          </div>

          <div className="space-y-2">
            {mockData.recommendedKols.map((kol) => (
              <Link key={kol.id} href={`/main/advertiser/influencers/${kol.id}`}>
                <div className="bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-secondary/25 transition-all shadow-md">
                  <div className="flex items-center gap-3">
                    <img src={kol.avatar} alt={kol.name}
                      className="w-12 h-12 rounded-xl border border-dark-400/60 flex-shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{kol.name}</span>
                        <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-md">{kol.platform}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{kol.niche}</div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-gray-300 font-medium">{formatCompactNumber(kol.followers)}</span>
                        <span className="text-xs text-accent font-semibold">{(kol.engagement * 100).toFixed(1)}% ER</span>
                        <span className="flex items-center gap-0.5 text-xs text-yellow-400 font-semibold">
                          <Star size={10} className="fill-yellow-400" />{kol.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white">{formatCash(kol.rate)}</div>
                      <div className="text-[10px] text-gray-400">/ post</div>
                      <ChevronRight size={14} className="text-gray-500 ml-auto mt-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <BottomNav userType="advertiser" />
    </div>
  );
}

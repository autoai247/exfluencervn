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
import { createClient } from '@/lib/supabase/client';

// ─── Types ────────────────────────────────────────────────
interface ActiveCampaign {
  id: string;
  title: string;
  platform: string;
  deliverableKo?: string;
  deliverableVi?: string;
  deliverable?: string;
  budget: number;
  accepted: number;
  deadline: string;
  pendingSubmit: number;
  pendingPayment: number;
}

interface PendingKol {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  rate: number;
  avatar: string;
  campaign: string;
  niche: string;
}

interface PendingPayment {
  id: string;
  kolName: string;
  kolAvatar: string;
  campaign: string;
  amount: number;
  contentUrl: string;
}

interface RecommendedKol {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  rate: number;
  niche: string;
  rating: number;
  avatar: string;
}

interface CompanyProfile {
  name: string;
  logo: string;
}

// ─────────────────────────────────────────────────────────

export default function AdvertiserDashboard() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [company, setCompany] = useState<CompanyProfile>({
    name: '',
    logo: '',
  });
  const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign[]>([]);
  const [pendingKols, setPendingKols] = useState<PendingKol[]>([]);
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [recommendedKols] = useState<RecommendedKol[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // 광고주 프로필 조회
        const { data: profile } = await supabase
          .from('users')
          .select('name, company_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (profile) {
          const displayName = profile.company_name || profile.name || 'Advertiser';
          setCompany({
            name: displayName,
            logo: profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=FF6B6B&color=fff`,
          });
        }

        // 진행 중 캠페인 조회
        const campaignsRes = await fetch(`/api/campaigns?advertiser_id=${user.id}&status=active`);
        if (campaignsRes.ok) {
          const rawCampaigns = await campaignsRes.json();
          const mapped: ActiveCampaign[] = rawCampaigns.map((c: any) => ({
            id: c.id,
            title: c.title,
            platform: (c.platforms || []).join(' + ') || c.platform || '',
            budget: c.budget || 0,
            accepted: c.accepted_count || 0,
            deadline: c.deadline
              ? new Date(c.deadline).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
              : '',
            pendingSubmit: c.pending_submit || 0,
            pendingPayment: c.pending_payment || 0,
          }));
          setActiveCampaigns(mapped);
        }

        // 승인 대기 KOL (pending 상태 applications)
        const applicationsRes = await fetch(`/api/applications?advertiser_id=${user.id}&status=pending`);
        if (applicationsRes.ok) {
          const rawApps = await applicationsRes.json();
          const mapped: PendingKol[] = rawApps.slice(0, 5).map((app: any) => {
            const influencer = app.influencer || {};
            const name = app.applicant_name || influencer.name || 'KOL';
            return {
              id: app.id,
              name,
              platform: (app.platform_url || '').includes('tiktok') ? 'TikTok' :
                        (app.platform_url || '').includes('instagram') ? 'Instagram' :
                        (app.platform_url || '').includes('facebook') ? 'Facebook' : 'SNS',
              followers: 0,
              engagement: 0,
              rate: app.campaign?.budget || 0,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF6B6B&color=fff`,
              campaign: app.campaign?.title || '',
              niche: '',
            };
          });
          setPendingKols(mapped);
        }

      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [mounted]);

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
                src={company.logo || `https://ui-avatars.com/api/?name=Advertiser&background=FF6B6B&color=fff`}
                alt={company.name || 'Advertiser'}
                className="w-14 h-14 rounded-2xl border-2 border-primary/50 shadow-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-base leading-tight">{company.name || (language === 'ko' ? '광고주 계정' : 'Tài khoản nhà QC')}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t.advertiser.brandAccount} · {language === 'ko' ? '편집' : 'Chỉnh sửa'}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
              <ChevronRight size={16} className="text-primary" />
            </div>
          </div>
        </Link>

        {/* ── 입금 확인 긴급 알림 ── */}
        {pendingPayments.length > 0 && (
          <div className="rounded-2xl border-2 border-accent/40 p-4 shadow-lg shadow-accent/10" style={{background: 'linear-gradient(135deg, rgba(255,217,61,0.15) 0%, rgba(37,37,58,0.9) 100%)'}}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-accent/20 flex items-center justify-center">
                <BadgeDollarSign size={14} className="text-accent" />
              </div>
              <span className="text-sm font-bold text-accent">
                {pendingPayments.length} KOL {language === 'ko' ? '결제 확인 대기 중' : 'chờ xác nhận thanh toán'}
              </span>
            </div>
            {pendingPayments.map((p) => (
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
                  <button
                    onClick={() => router.push('/main/advertiser/campaigns')}
                    className="text-[10px] px-2 py-1 bg-accent text-dark-800 rounded-lg font-bold shadow-sm shadow-accent/30 hover:bg-accent/80 transition-all active:scale-95"
                  >
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
        {pendingKols.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <div className="w-1 h-4 bg-gradient-to-b from-warning to-primary rounded-full" />
                <AlertCircle size={13} className="text-warning" />
                {language === 'ko' ? `승인 대기 KOL (${pendingKols.length})` : `KOL đang chờ duyệt (${pendingKols.length})`}
              </h3>
              <Link href="/main/advertiser/campaigns?tab=approvals" className="text-xs text-primary font-medium">
                {language === 'ko' ? '전체 보기' : 'Xem tất cả'}
              </Link>
            </div>
            <div className="text-[10px] text-gray-500 px-1 -mt-1">
              {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
            </div>

            <div
              className="flex gap-3 overflow-x-auto pl-1 pr-4 pb-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {pendingKols.map((kol) => (
                <div key={kol.id} className="flex-shrink-0 w-[200px] bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-warning/15 shadow-lg hover:border-warning/25 transition-all">
                  <div className="flex items-center gap-3">
                    <img src={kol.avatar} alt={kol.name}
                      className="w-10 h-10 rounded-xl border border-dark-400/60 flex-shrink-0 shadow-md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">{kol.name}</div>
                      <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                        <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-md">{kol.platform}</span>
                        <span className="text-[10px] text-accent font-semibold">{(kol.engagement * 100).toFixed(1)}% ER</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] text-gray-400">{formatCompactNumber(kol.followers)} followers</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 truncate">
                      {kol.niche} · <span className="text-white font-semibold">{formatCash(kol.rate)}/post</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link href={`/main/advertiser/influencers/${kol.id}`}
                      className="flex-1 py-2 bg-dark-500/80 text-gray-300 text-[10px] font-semibold rounded-xl text-center border border-dark-400/50 hover:bg-dark-400/50 transition-all">
                      {language === 'ko' ? '프로필' : 'Hồ sơ'}
                    </Link>
                    <button
                      onClick={() => router.push(`/main/advertiser/campaigns?tab=approvals`)}
                      className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
                    >
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
              {language === 'ko' ? `진행 중 (${activeCampaigns.length})` : `Đang chạy (${activeCampaigns.length})`}
            </h3>
            <Link href="/main/advertiser/campaigns" className="text-xs text-primary font-medium">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
          </div>
          <div className="text-[10px] text-gray-500 px-1 -mt-1">
            {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
          </div>

          <div
            className="flex gap-3 overflow-x-auto pl-1 pr-4 pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              <div className="flex-shrink-0 w-[260px] bg-dark-600/60 rounded-2xl p-4 border border-dark-400/40 animate-pulse h-40" />
            ) : activeCampaigns.length === 0 ? (
              <div className="flex-shrink-0 w-full py-8 text-center text-gray-500 text-sm">
                {language === 'ko' ? '진행 중인 캠페인이 없습니다.' : 'Chưa có chiến dịch nào đang chạy.'}
              </div>
            ) : null}
            {activeCampaigns.map((c) => (
              <Link key={c.id} href={`/main/advertiser/campaigns/${c.id}`} className="flex-shrink-0 w-[260px]">
                <div className="bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-primary/25 transition-all shadow-lg h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{c.title}</h4>
                      <div className="text-xs text-gray-400 mt-0.5">{c.platform}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{language === 'ko' ? (c.deliverableKo || c.deliverable) : (c.deliverableVi || c.deliverable)}</div>
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
          <div className="text-[10px] text-gray-500 px-1 -mt-1">
            {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
          </div>

          <div
            className="flex gap-3 overflow-x-auto pl-1 pr-4 pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {recommendedKols.map((kol) => (
              <Link key={kol.id} href={`/main/advertiser/influencers/${kol.id}`} className="flex-shrink-0 w-[200px]">
                <div className="bg-dark-600/60 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 hover:border-secondary/25 transition-all shadow-md h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={kol.avatar} alt={kol.name}
                      className="w-10 h-10 rounded-xl border border-dark-400/60 flex-shrink-0 shadow-md" />
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm truncate">{kol.name}</div>
                      <span className="text-[10px] text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded-md">{kol.platform}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">{kol.niche}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-300 font-medium">{formatCompactNumber(kol.followers)}</span>
                    <span className="text-xs text-accent font-semibold">{(kol.engagement * 100).toFixed(1)}% ER</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-sm font-bold text-white">{formatCash(kol.rate)}</div>
                      <div className="text-[10px] text-gray-400">/ post</div>
                    </div>
                    <span className="flex items-center gap-0.5 text-xs text-yellow-400 font-semibold">
                      <Star size={10} className="fill-yellow-400" />{kol.rating}
                    </span>
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

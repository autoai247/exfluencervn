'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Upload,
  CheckCircle,
  Clock,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  BadgeDollarSign,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockUserProfile } from '@/lib/mockData';

// ─── Mock Data ───────────────────────────────────────────
const mockData = {
  campaigns: {
    available: 36,
    newToday: 6,
  },

  inProgress: [
    {
      id: '1',
      title: 'Skincare Product Review',
      company: 'Beauty Brand',
      reward: 500000,
      stage: 2,
      action: 'submit',
      deadline: '15/03',
      daysLeft: 3,
      thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Spring Makeup Promotion',
      company: 'K-Beauty Co.',
      reward: 400000,
      stage: 1,
      action: 'check_brief',
      deadline: '20/03',
      daysLeft: 8,
      thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Fitness App Promotion',
      company: 'FitLife App',
      reward: 600000,
      stage: 3,
      action: 'waiting',
      deadline: '25/03',
      daysLeft: 13,
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    },
  ],

  applying: [
    { id: 'a1', title: 'Food Review Campaign', company: 'Pho House', reward: 300000, appliedAtKo: '2일 전', appliedAtVi: '2 ngày trước', status: 'pending' },
    { id: 'a2', title: 'Tech Unboxing', company: 'TechStore VN', reward: 800000, appliedAtKo: '3일 전', appliedAtVi: '3 ngày trước', status: 'rejected' },
    { id: 'a3', title: 'Travel Vlog', company: 'VietTravel', reward: 1200000, appliedAtKo: '1일 전', appliedAtVi: '1 ngày trước', status: 'pending' },
  ],

  earnings: [
    { id: 'e1', title: 'Fitness App Promotion', company: 'FitLife App', amount: 600000, paidAt: '10/02', status: 'confirmed' },
    { id: 'e2', title: 'Winter Skincare', company: 'Beauty Brand', amount: 500000, paidAt: '28/01', status: 'confirmed' },
    { id: 'e3', title: 'Makeup Tutorial', company: 'K-Beauty Co.', amount: 400000, paidAt: null, status: 'waiting' },
  ],
};

const STEPS_VI = ['Đăng ký', 'Duyệt', 'Làm việc', 'Nộp bài', 'Hoàn thành'];
const STEPS_KO = ['신청', '승인', '작업', '제출', '완료'];

// ─────────────────────────────────────────────────────────

export default function InfluencerDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const userProfile = getMockUserProfile(language);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const STEPS = language === 'ko' ? STEPS_KO : STEPS_VI;
  const urgentCampaign = mockData.inProgress.find((c) => c.daysLeft <= 3);
  const totalConfirmed = mockData.earnings
    .filter((e) => e.status === 'confirmed')
    .reduce((sum, e) => sum + e.amount, 0);
  const totalWaiting = mockData.earnings
    .filter((e) => e.status === 'waiting')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader
        title="Dashboard"
        showNotification
        onNotification={() => router.push('/main/influencer/notifications')}
      />

      <div className="container-mobile space-y-4 py-5">

        {/* ── 프로필 ── */}
        <Link href="/main/influencer/profile">
          <div className="rounded-2xl bg-gradient-to-r from-dark-600 to-dark-500 border border-dark-400/50 p-4 flex items-center gap-3 hover:border-primary/30 transition-all shadow-lg group">
            <div className="relative flex-shrink-0">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-14 h-14 rounded-2xl border-2 border-primary/50 shadow-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-dark-600 shadow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-base leading-tight">{userProfile.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '프로필 편집' : 'Chỉnh sửa hồ sơ'}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
              <ChevronRight size={16} className="text-primary" />
            </div>
          </div>
        </Link>

        {/* ── 긴급 마감 알림 ── */}
        {urgentCampaign && (
          <Link href={`/main/influencer/jobs/${urgentCampaign.id}`}>
            <div className="rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/10 border-2 border-red-500/60 p-4 shadow-lg shadow-red-500/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={18} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-red-400">
                    ⚡ {language === 'ko'
                      ? `${urgentCampaign.deadline} 전에 결과 제출 — ${urgentCampaign.daysLeft}일 남음!`
                      : `Nộp kết quả trước ${urgentCampaign.deadline} — còn ${urgentCampaign.daysLeft} ngày!`}
                  </div>
                  <div className="text-xs text-gray-300 truncate mt-0.5">
                    {urgentCampaign.title} · {urgentCampaign.company}
                  </div>
                </div>
                <div className="text-sm font-bold text-accent flex-shrink-0">
                  {formatCash(urgentCampaign.reward)}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── 캠페인 찾기 (Primary CTA) ── */}
        <Link href="/main/influencer/campaigns">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-5 flex items-center justify-between shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Search size={18} className="text-white" />
                <span className="text-lg font-bold text-white">{language === 'ko' ? '캠페인 찾기' : 'Tìm chiến dịch'}</span>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-bold text-white">{mockData.campaigns.available} {language === 'ko' ? '캠페인' : 'chiến dịch'}</span>
                {' '}· +{mockData.campaigns.newToday} {language === 'ko' ? '오늘 신규' : 'mới hôm nay'}
              </div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <ArrowRight size={24} className="text-white" />
            </div>
          </div>
        </Link>

        {/* ── 진행 중 캠페인 ── */}
        {mockData.inProgress.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
                {language === 'ko' ? `진행 중 (${mockData.inProgress.length})` : `Đang thực hiện (${mockData.inProgress.length})`}
              </h3>
              <Link href="/main/influencer/jobs" className="text-xs text-primary font-medium">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
            </div>
            <div className="text-[10px] text-gray-500 px-1 -mt-1">
              {language === 'ko' ? '옆으로 밀어보세요 →' : 'Vuốt để xem thêm →'}
            </div>

            <div
              className="flex gap-3 overflow-x-auto pl-1 pr-4 pb-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mockData.inProgress.map((c) => (
                <Link key={c.id} href={`/main/influencer/jobs/${c.id}`} className="flex-shrink-0 w-[260px]">
                  <div className="rounded-2xl bg-dark-600/80 border border-dark-400/50 shadow-xl overflow-hidden p-0 hover:border-primary/30 transition-all h-full">
                    {/* 썸네일 */}
                    <div className="relative h-28 overflow-hidden">
                      <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-700 via-dark-700/60 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm ${
                          c.daysLeft <= 3 ? 'bg-red-500/90 text-white' : 'bg-dark-600/80 text-gray-300'
                        }`}>
                          {language === 'ko' ? `D-${c.daysLeft}` : `Còn ${c.daysLeft}n`}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                        <div>
                          <div className="text-sm font-bold text-white leading-tight drop-shadow">{c.title}</div>
                          <div className="text-xs text-gray-300">{c.company}</div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-base font-bold text-accent drop-shadow">{formatCash(c.reward)}</div>
                          <div className="text-[10px] text-gray-400">{language === 'ko' ? '마감:' : 'Hạn:'} {c.deadline}</div>
                        </div>
                      </div>
                    </div>

                    {/* 단계 표시 */}
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-1">
                        {STEPS.map((step, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center">
                            <div className={`w-full h-1.5 rounded-full ${
                              idx < c.stage  ? 'bg-gradient-to-r from-primary to-secondary' :
                              idx === c.stage ? 'bg-primary shadow-sm shadow-primary/50' : 'bg-dark-500'
                            }`} />
                            <span className={`text-[9px] mt-1 ${
                              idx === c.stage ? 'text-primary font-bold' : idx < c.stage ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="p-3 pt-2">
                      {c.action === 'submit' && (
                        <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20">
                          <Upload size={15} />
                          {language === 'ko' ? `결과 제출 · 마감 ${c.deadline}` : `Nộp kết quả · Hạn ${c.deadline}`}
                        </div>
                      )}
                      {c.action === 'check_brief' && (
                        <div className="w-full py-2.5 rounded-xl bg-secondary/15 border border-secondary/40 text-secondary text-sm font-bold flex items-center justify-center gap-2">
                          <CheckCircle size={15} />
                          {language === 'ko' ? '캠페인 요구사항 보기 →' : 'Xem yêu cầu chiến dịch →'}
                        </div>
                      )}
                      {c.action === 'waiting' && (
                        <div className="w-full py-2.5 rounded-xl bg-dark-500/80 border border-dark-400/50 text-gray-400 text-sm flex items-center justify-center gap-2">
                          <Clock size={15} />
                          {language === 'ko' ? '광고주 확인 대기 중...' : 'Đang chờ nhà quảng cáo xác nhận...'}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── 신청 결과 ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <div className="w-1 h-4 bg-gradient-to-b from-secondary to-primary rounded-full" />
              {language === 'ko' ? `제출한 신청 (${mockData.applying.length})` : `Đơn đã nộp (${mockData.applying.length})`}
            </h3>
            <Link href="/main/influencer/my-campaigns" className="text-xs text-primary font-medium">
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
            {mockData.applying.map((a) => (
              <Link key={a.id} href={`/main/influencer/my-campaigns`} className="flex-shrink-0 w-[200px]">
                <div className="flex flex-col gap-1.5 bg-dark-600/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-dark-400/40 hover:border-primary/30 transition-all shadow-md h-full">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{a.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{a.company} · {language === 'ko' ? a.appliedAtKo : a.appliedAtVi}</div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-sm font-bold text-gray-300">{formatCash(a.reward)}</span>
                    {a.status === 'pending' && (
                      <span className="text-[10px] px-2 py-1 bg-warning/15 text-warning rounded-full font-bold border border-warning/30">
                        {language === 'ko' ? '검토 중' : 'Đang xét'}
                      </span>
                    )}
                    {a.status === 'rejected' && (
                      <span className="text-[10px] px-2 py-1 bg-red-500/15 text-red-400 rounded-full font-bold border border-red-500/30">
                        {language === 'ko' ? '거절' : 'Từ chối'}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 수익 내역 ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <div className="w-1 h-4 bg-gradient-to-b from-accent to-warning rounded-full" />
              <BadgeDollarSign size={14} className="text-accent" />
              {language === 'ko' ? '수입' : 'Thu nhập'}
            </h3>
            <Link href="/main/influencer/earnings" className="text-xs text-primary font-medium">{language === 'ko' ? '전체 보기' : 'Xem tất cả'}</Link>
          </div>

          {/* 요약 */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/main/influencer/earnings">
              <div className="rounded-xl bg-gradient-to-br from-accent/15 to-dark-700 border border-accent/25 p-3 shadow-lg shadow-accent/5 hover:border-accent/40 transition-all h-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle size={11} className="text-accent" />
                  <div className="text-[10px] text-gray-400">{language === 'ko' ? '결제 완료' : 'Đã nhận thanh toán'}</div>
                </div>
                <div className="text-xl font-bold text-accent">{formatCash(totalConfirmed)}</div>
              </div>
            </Link>
            <Link href="/main/influencer/earnings">
              <div className="rounded-xl bg-gradient-to-br from-warning/15 to-dark-700 border border-warning/25 p-3 shadow-lg shadow-warning/5 hover:border-warning/40 transition-all h-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={11} className="text-warning" />
                  <div className="text-[10px] text-gray-400">{language === 'ko' ? '확인 대기' : 'Chờ xác nhận'}</div>
                </div>
                <div className="text-xl font-bold text-warning">{formatCash(totalWaiting)}</div>
                <div className="text-[9px] text-gray-500 mt-0.5">{language === 'ko' ? '입금 후 광고주가 확인' : 'Nhà QC xác nhận sau khi nhận tiền'}</div>
              </div>
            </Link>
          </div>

          {/* 건별 목록 */}
          <div className="space-y-2">
            {mockData.earnings.map((e) => (
              <Link key={e.id} href="/main/influencer/earnings">
                <div className="flex items-center gap-3 bg-dark-600/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-dark-400/40 hover:border-accent/30 transition-all shadow-md">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{e.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{e.company}</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm font-bold text-white">{formatCash(e.amount)}</div>
                    {e.status === 'confirmed' ? (
                      <div className="text-[10px] text-accent font-semibold flex items-center justify-end gap-1 mt-0.5">
                        <CheckCircle size={9} />
                        {e.paidAt}
                      </div>
                    ) : (
                      <div className="text-[10px] text-warning mt-0.5">{language === 'ko' ? '확인 대기' : 'Chờ xác nhận'}</div>
                    )}
                  </div>
                  <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* 안내 문구 */}
          <div className="rounded-xl bg-dark-600/40 border border-dark-400/30 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {language === 'ko'
                ? <>💡 <span className="text-gray-300 font-medium">Exfluencer VN</span>은 광고주와 KOL을 연결합니다. 결제는 광고주에서 직접 이루어집니다. 입금 후 광고주가 플랫폼에서 확인하면 상태가 여기서 업데이트됩니다.</>
                : <>💡 <span className="text-gray-300 font-medium">Exfluencer VN</span> kết nối nhà quảng cáo và KOL. Thanh toán được thực hiện trực tiếp từ nhà quảng cáo. Sau khi nhận tiền, nhà quảng cáo xác nhận trên nền tảng và trạng thái sẽ cập nhật tại đây.</>
              }
            </p>
          </div>
        </div>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

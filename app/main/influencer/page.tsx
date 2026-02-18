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

  // 진행 중 캠페인
  inProgress: [
    {
      id: '1',
      title: 'Skincare Product Review',
      company: 'Beauty Brand',
      reward: 500000,
      // 0=신청 · 1=승인 · 2=작업 중 · 3=제출 완료 · 4=입금 확인
      stage: 2,
      action: 'submit',       // submit | check_brief | waiting | done
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

  // 신청 중 (결과 대기)
  applying: [
    { id: 'a1', title: 'Food Review Campaign', company: 'Pho House', reward: 300000, appliedAt: '2 ngày trước', status: 'pending' },
    { id: 'a2', title: 'Tech Unboxing', company: 'TechStore VN', reward: 800000, appliedAt: '3 ngày trước', status: 'rejected' },
    { id: 'a3', title: 'Travel Vlog', company: 'VietTravel', reward: 1200000, appliedAt: '1 ngày trước', status: 'pending' },
  ],

  // 수익 내역 (광고주가 입금 확인한 것들)
  earnings: [
    { id: 'e1', title: 'Fitness App Promotion', company: 'FitLife App', amount: 600000, paidAt: '10/02', status: 'confirmed' },
    { id: 'e2', title: 'Winter Skincare', company: 'Beauty Brand', amount: 500000, paidAt: '28/01', status: 'confirmed' },
    { id: 'e3', title: 'Makeup Tutorial', company: 'K-Beauty Co.', amount: 400000, paidAt: null, status: 'waiting' },
  ],
};

// 4단계로 단순화: 신청 → 승인 → 작업 → 제출 → 완료
const STEPS = ['Đăng ký', 'Duyệt', 'Làm việc', 'Nộp bài', 'Hoàn thành'];

// ─────────────────────────────────────────────────────────

export default function InfluencerDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const userProfile = getMockUserProfile(language);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

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
          <div className="flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-12 h-12 rounded-2xl border-2 border-primary"
            />
            <div>
              <div className="font-bold text-white">{userProfile.name}</div>
              <div className="text-xs text-gray-400">Chỉnh sửa hồ sơ →</div>
            </div>
            <ChevronRight size={16} className="text-gray-500 ml-auto" />
          </div>
        </Link>

        {/* ── 긴급 마감 알림 ── */}
        {urgentCampaign && (
          <Link href={`/main/influencer/jobs/${urgentCampaign.id}`}>
            <div className="rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/10 border-2 border-red-500/60 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-red-400">
                    ⚡ Nộp kết quả trước {urgentCampaign.deadline} — còn {urgentCampaign.daysLeft} ngày!
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
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Search size={18} className="text-white" />
                <span className="text-lg font-bold text-white">Tìm chiến dịch</span>
              </div>
              <div className="text-sm text-white/80">
                <span className="font-bold text-white">{mockData.campaigns.available} chiến dịch</span>
                {' '}· +{mockData.campaigns.newToday} mới hôm nay
              </div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ArrowRight size={24} className="text-white" />
            </div>
          </div>
        </Link>

        {/* ── 진행 중 캠페인 ── */}
        {mockData.inProgress.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-gray-300">
                Đang thực hiện ({mockData.inProgress.length})
              </h3>
              <Link href="/main/influencer/jobs" className="text-xs text-primary">Xem tất cả</Link>
            </div>

            <div className="space-y-3">
              {mockData.inProgress.map((c) => (
                <div key={c.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl overflow-hidden p-0">
                  {/* 썸네일 */}
                  <div className="relative h-24 overflow-hidden">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-700/95 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{c.title}</div>
                        <div className="text-xs text-gray-300">{c.company}</div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-base font-bold text-accent">{formatCash(c.reward)}</div>
                        <div className="text-[10px] text-gray-400">Hạn: {c.deadline}</div>
                      </div>
                    </div>
                  </div>

                  {/* 단계 표시 (5단계로 단순화) */}
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-1">
                      {STEPS.map((step, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className={`w-full h-1 rounded-full ${
                            idx < c.stage  ? 'bg-primary' :
                            idx === c.stage ? 'bg-primary' : 'bg-dark-500'
                          }`} />
                          <span className={`text-[9px] mt-1 ${
                            idx === c.stage ? 'text-primary font-bold' : 'text-gray-600'
                          }`}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="p-3 pt-2">
                    <Link href={`/main/influencer/jobs/${c.id}`}>
                      {c.action === 'submit' && (
                        <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold flex items-center justify-center gap-2">
                          <Upload size={15} />
                          Nộp kết quả · Hạn {c.deadline}
                        </button>
                      )}
                      {c.action === 'check_brief' && (
                        <button className="w-full py-2.5 rounded-xl bg-secondary/20 border border-secondary/40 text-secondary text-sm font-bold flex items-center justify-center gap-2">
                          <CheckCircle size={15} />
                          Xem yêu cầu chiến dịch →
                        </button>
                      )}
                      {c.action === 'waiting' && (
                        <button className="w-full py-2.5 rounded-xl bg-dark-500 text-gray-400 text-sm flex items-center justify-center gap-2" disabled>
                          <Clock size={15} />
                          Đang chờ nhà quảng cáo xác nhận...
                        </button>
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 신청 결과 (승인/거절 표시) ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-300">
              Đơn đã nộp ({mockData.applying.length})
            </h3>
            <Link href="/main/influencer/my-campaigns" className="text-xs text-primary">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-2">
            {mockData.applying.map((a) => (
              <div key={a.id} className="flex items-center gap-3 bg-dark-600 rounded-xl px-4 py-3 border border-dark-500">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{a.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{a.company} · {a.appliedAt}</div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-300">{formatCash(a.reward)}</span>
                  {a.status === 'pending' && (
                    <span className="text-[10px] px-2 py-1 bg-warning/20 text-warning rounded-full font-bold border border-warning/30">
                      Đang xét
                    </span>
                  )}
                  {a.status === 'rejected' && (
                    <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded-full font-bold border border-red-500/30">
                      Từ chối
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 수익 내역 (광고주 입금 확인 기록) ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <BadgeDollarSign size={14} className="text-accent" />
              Thu nhập
            </h3>
            <Link href="/main/influencer/earnings" className="text-xs text-primary">Xem tất cả</Link>
          </div>

          {/* 요약 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-dark-600 border border-accent/30 p-3">
              <div className="text-[10px] text-gray-400 mb-1">✅ Đã nhận thanh toán</div>
              <div className="text-xl font-bold text-accent">{formatCash(totalConfirmed)}</div>
            </div>
            <div className="rounded-xl bg-dark-600 border border-warning/30 p-3">
              <div className="text-[10px] text-gray-400 mb-1">⏳ Chờ xác nhận</div>
              <div className="text-xl font-bold text-warning">{formatCash(totalWaiting)}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">Nhà QC xác nhận sau khi nhận tiền</div>
            </div>
          </div>

          {/* 건별 목록 */}
          <div className="space-y-2">
            {mockData.earnings.map((e) => (
              <div key={e.id} className="flex items-center gap-3 bg-dark-600 rounded-xl px-4 py-3 border border-dark-500">
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
                    <div className="text-[10px] text-warning mt-0.5">Chờ xác nhận</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 안내 문구 */}
          <div className="rounded-xl bg-dark-600/50 border border-dark-500 px-4 py-3">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              💡 <span className="text-gray-300">Exfluencer VN</span> kết nối nhà quảng cáo và KOL.
              Thanh toán được thực hiện trực tiếp từ nhà quảng cáo. Sau khi nhận tiền, nhà quảng cáo xác nhận trên nền tảng và trạng thái sẽ cập nhật tại đây.
            </p>
          </div>
        </div>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

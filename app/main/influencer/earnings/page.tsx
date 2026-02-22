'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, BadgeDollarSign, Info } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// ─── Mock Data ─────────────────────────────────────────────
const allEarnings = [
  {
    id: 'e1',
    title: 'Fitness App Promotion',
    company: 'FitLife App',
    platform: 'TikTok',
    amount: 600000,
    paidAt: '10/02/2025',
    status: 'confirmed' as const,
    contentUrl: 'https://www.tiktok.com',
  },
  {
    id: 'e2',
    title: 'Winter Skincare Review',
    company: 'Beauty Brand',
    platform: 'Instagram',
    amount: 500000,
    paidAt: '28/01/2025',
    status: 'confirmed' as const,
    contentUrl: 'https://www.instagram.com',
  },
  {
    id: 'e3',
    title: 'Spring Makeup Tutorial',
    company: 'K-Beauty Co.',
    platform: 'YouTube',
    amount: 400000,
    paidAt: null,
    status: 'waiting' as const,
    contentUrl: null,
  },
  {
    id: 'e4',
    title: 'Food Review Campaign',
    company: 'Pho House',
    platform: 'Facebook',
    amount: 300000,
    paidAt: null,
    status: 'waiting' as const,
    contentUrl: null,
  },
];

export default function EarningsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'waiting'>('all');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const totalConfirmed = allEarnings
    .filter(e => e.status === 'confirmed')
    .reduce((s, e) => s + e.amount, 0);
  const totalWaiting = allEarnings
    .filter(e => e.status === 'waiting')
    .reduce((s, e) => s + e.amount, 0);

  const filtered = filter === 'all'
    ? allEarnings
    : allEarnings.filter(e => e.status === filter);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? '수입' : 'Thu nhập'} showNotification />

      <div className="container-mobile space-y-4 py-5">

        {/* ── Tổng quan ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-success/15 to-dark-700 border border-success/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <CheckCircle size={10} className="text-success" />
              {language === 'ko' ? '결제 완료' : 'Đã nhận thanh toán'}
            </div>
            <div className="text-2xl font-bold text-success">{formatCash(totalConfirmed)}</div>
            <div className="text-[10px] text-gray-500 mt-1">{allEarnings.filter(e => e.status === 'confirmed').length} {language === 'ko' ? '캠페인' : 'chiến dịch'}</div>
          </div>
          <div className="bg-gradient-to-br from-accent/15 to-dark-700 border border-accent/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <Clock size={10} className="text-accent" />
              {language === 'ko' ? '확인 대기' : 'Chờ xác nhận'}
            </div>
            <div className="text-2xl font-bold text-accent">{formatCash(totalWaiting)}</div>
            <div className="text-[10px] text-gray-500 mt-1">{allEarnings.filter(e => e.status === 'waiting').length} {language === 'ko' ? '캠페인' : 'chiến dịch'}</div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex gap-2">
          {([
            { key: 'all', labelVi: 'Tất cả', labelKo: '전체' },
            { key: 'confirmed', labelVi: 'Đã nhận', labelKo: '결제 완료' },
            { key: 'waiting', labelVi: 'Chờ xác nhận', labelKo: '확인 대기' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {language === 'ko' ? tab.labelKo : tab.labelVi}
            </button>
          ))}
        </div>

        {/* ── Danh sách ── */}
        <div className="space-y-3">
          {filtered.map(e => (
            <Link key={e.id} href={`/main/influencer/jobs`} className="block">
            <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{e.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{e.company} · {e.platform}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-white">{formatCash(e.amount)}</div>
                  {e.status === 'confirmed' ? (
                    <div className="text-[10px] font-semibold flex items-center justify-end gap-1 mt-0.5">
                      <span className="bg-success/20 text-success border border-success/30 rounded-full px-2 py-0.5 flex items-center gap-1">
                        <CheckCircle size={9} />
                        {e.paidAt}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-0.5 flex items-center justify-end">
                      <span className="bg-accent/20 text-accent border border-accent/30 rounded-full px-2 py-0.5 text-[10px] flex items-center gap-1">
                        <Clock size={9} />
                        {language === 'ko' ? '확인 대기' : 'Chờ xác nhận'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {e.status === 'waiting' && (
                <div className="mt-2.5 px-3 py-2 bg-accent/10 border border-accent/30 rounded-xl text-[11px] text-accent">
                  {language === 'ko' ? '광고주가 이체 후 결제를 확인합니다.' : 'Nhà quảng cáo xác nhận thanh toán sau khi chuyển khoản cho bạn.'}
                </div>
              )}

              {e.contentUrl && (
                <button
                  onClick={(ev) => { ev.preventDefault(); window.open(e.contentUrl!, '_blank', 'noopener,noreferrer'); }}
                  className="mt-2 w-full text-center py-2 bg-dark-700/60 border border-dark-400/40 rounded-xl text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {language === 'ko' ? '게시된 콘텐츠 보기 →' : 'Xem nội dung đã đăng →'}
                </button>
              )}
            </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              {language === 'ko' ? '아직 수입이 없습니다.' : 'Chưa có thu nhập nào.'}
            </div>
          )}
        </div>

        {/* ── Lưu ý ── */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/20 rounded-2xl px-4 py-4 shadow-xl">
          <div className="flex items-start gap-3">
            <Info size={15} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <div className="text-xs font-semibold text-primary">{language === 'ko' ? '작동 방식' : 'Cách hoạt động'}</div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {language === 'ko'
                  ? <>Exfluencer VN은 광고주와 KOL을 연결합니다. 결제는 광고주에서 귀하의 계좌로 직접 이루어집니다. 입금 후 광고주가 플랫폼에서 확인하면 상태가 <span className="text-success font-semibold">결제 완료</span>로 변경됩니다.</>
                  : <>Exfluencer VN kết nối nhà quảng cáo và KOL. Thanh toán được thực hiện trực tiếp từ nhà quảng cáo sang tài khoản của bạn. Sau khi nhận tiền, nhà quảng cáo xác nhận trên nền tảng và trạng thái sẽ chuyển thành <span className="text-success font-semibold">Đã nhận thanh toán</span>.</>
                }
              </p>
            </div>
          </div>
        </div>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

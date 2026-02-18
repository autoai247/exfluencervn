'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, BadgeDollarSign, Info } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCash } from '@/lib/points';

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
      <MobileHeader title="Thu nhập" showNotification />

      <div className="container-mobile space-y-4 py-5">

        {/* ── Tổng quan ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-dark-600 border-2 border-accent/40 p-4 shadow-xl">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <CheckCircle size={10} className="text-accent" />
              Đã nhận thanh toán
            </div>
            <div className="text-2xl font-bold text-accent">{formatCash(totalConfirmed)}</div>
            <div className="text-[10px] text-gray-500 mt-1">{allEarnings.filter(e => e.status === 'confirmed').length} chiến dịch</div>
          </div>
          <div className="rounded-2xl bg-dark-600 border-2 border-warning/40 p-4 shadow-xl">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <Clock size={10} className="text-warning" />
              Chờ xác nhận
            </div>
            <div className="text-2xl font-bold text-warning">{formatCash(totalWaiting)}</div>
            <div className="text-[10px] text-gray-500 mt-1">{allEarnings.filter(e => e.status === 'waiting').length} chiến dịch</div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex gap-2">
          {([
            { key: 'all', label: 'Tất cả' },
            { key: 'confirmed', label: 'Đã nhận' },
            { key: 'waiting', label: 'Chờ xác nhận' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400 border border-dark-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Danh sách ── */}
        <div className="space-y-2">
          {filtered.map(e => (
            <div key={e.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{e.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{e.company} · {e.platform}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-white">{formatCash(e.amount)}</div>
                  {e.status === 'confirmed' ? (
                    <div className="text-[10px] text-accent font-semibold flex items-center justify-end gap-1 mt-0.5">
                      <CheckCircle size={9} />
                      {e.paidAt}
                    </div>
                  ) : (
                    <div className="text-[10px] text-warning mt-0.5 flex items-center justify-end gap-1">
                      <Clock size={9} />
                      Chờ xác nhận
                    </div>
                  )}
                </div>
              </div>

              {e.status === 'waiting' && (
                <div className="mt-2.5 px-3 py-2 bg-warning/10 border border-warning/30 rounded-xl text-[11px] text-warning">
                  Nhà quảng cáo xác nhận thanh toán sau khi chuyển khoản cho bạn.
                </div>
              )}

              {e.contentUrl && (
                <a
                  href={e.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-center py-2 bg-dark-700 border border-dark-400 rounded-xl text-xs text-gray-400"
                >
                  Xem nội dung đã đăng →
                </a>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              Chưa có thu nhập nào.
            </div>
          )}
        </div>

        {/* ── Lưu ý ── */}
        <div className="rounded-2xl bg-dark-600/50 border border-dark-500 px-4 py-4">
          <div className="flex items-start gap-3">
            <Info size={15} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-primary mb-1">Cách hoạt động</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Exfluencer VN kết nối nhà quảng cáo và KOL. Thanh toán được thực hiện trực tiếp từ nhà quảng cáo sang tài khoản của bạn.
                Sau khi nhận tiền, nhà quảng cáo xác nhận trên nền tảng và trạng thái sẽ chuyển thành{' '}
                <span className="text-accent font-semibold">Đã nhận thanh toán</span>.
              </p>
            </div>
          </div>
        </div>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

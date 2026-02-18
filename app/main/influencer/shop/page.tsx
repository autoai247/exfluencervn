'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Download,
  CheckCircle,
  ChevronRight,
  Instagram,
  Video,
  TrendingUp,
  Star,
  MessageCircle,
  ExternalLink,
  Lightbulb,
  BarChart3,
  BadgeCheck,
  Gift,
  Trophy,
  Clock,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';

// ─── Free Templates ───────────────────────────────────────
const templates = [
  {
    id: 'media-kit',
    icon: FileText,
    color: 'from-primary to-secondary',
    title: 'Media Kit Template',
    desc: 'Giới thiệu bản thân đến nhà quảng cáo một cách chuyên nghiệp',
    tags: ['Canva', 'Miễn phí'],
    url: 'https://www.canva.com/templates/search/media-kit/',
  },
  {
    id: 'rate-card',
    icon: BarChart3,
    color: 'from-secondary to-accent',
    title: 'Rate Card Template',
    desc: 'Bảng báo giá dịch vụ chuẩn cho mọi nền tảng',
    tags: ['Google Docs', 'Miễn phí'],
    url: 'https://docs.google.com/document/create',
  },
  {
    id: 'caption',
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-500',
    title: 'Caption Hooks (50 mẫu)',
    desc: '50 câu mở đầu caption thu hút tương tác cao',
    tags: ['PDF', 'Miễn phí'],
    url: null,
  },
];

// ─── Platform Guides ──────────────────────────────────────
const guides = [
  {
    id: 'tiktok',
    icon: Video,
    color: 'bg-black border border-white/10',
    iconColor: 'text-white',
    title: 'TikTok Algorithm 2025',
    points: [
      'Đăng 3–5 lần/tuần để duy trì momentum',
      'Video 15–30s có tỉ lệ xem hết cao nhất',
      'Hook mạnh trong 3 giây đầu là bắt buộc',
      'Dùng 3–5 hashtag liên quan, không spam',
    ],
  },
  {
    id: 'instagram',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    iconColor: 'text-white',
    title: 'Instagram Reels Tips',
    points: [
      'Reels được ưu tiên hơn ảnh trong feed',
      'Caption 1–2 dòng ngắn gọn, kết với CTA',
      'Story tương tác (poll, quiz) tăng reach tự nhiên',
      'Collab với KOL cùng niche để mở rộng reach',
    ],
  },
  {
    id: 'engagement',
    icon: TrendingUp,
    color: 'bg-gradient-to-br from-accent to-green-500',
    iconColor: 'text-dark-800',
    title: 'Tăng Engagement Rate',
    points: [
      'Trả lời comment trong 1h đầu sau khi đăng',
      'Đặt câu hỏi trong caption để kích thích comment',
      'Post đúng giờ vàng: 7–9h sáng, 12h trưa, 7–9h tối',
      'ER > 3% là tốt — nhà QC quan tâm hơn followers',
    ],
  },
];

// ─── Campaign Tips ────────────────────────────────────────
const campaignTips = [
  { icon: '📋', tip: 'Đọc kỹ brief trước khi ứng tuyển — đảm bảo niche và follower phù hợp yêu cầu' },
  { icon: '📸', tip: 'Ảnh portfolio chất lượng cao tăng khả năng được chọn lên 3x' },
  { icon: '⏱️', tip: 'Ứng tuyển trong 24h đầu khi chiến dịch mở — slot có giới hạn' },
  { icon: '💬', tip: 'Giới thiệu bản thân ngắn gọn, nêu rõ why you (tại sao bạn phù hợp)' },
  { icon: '✅', tip: 'Nộp kết quả đúng hạn — uy tín cao giúp được chọn ưu tiên lần sau' },
];

export default function ResourcesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title="Tài nguyên KOL" showNotification />

      <div className="container-mobile space-y-6 py-5">

        {/* ── 상단 배너 ── */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <div className="font-bold text-white">Công cụ & Hướng dẫn miễn phí</div>
              <div className="text-xs text-gray-400 mt-0.5">Giúp bạn phát triển kênh và nhận nhiều chiến dịch hơn</div>
            </div>
          </div>
        </div>

        {/* ── 응모 이벤트 섹션 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Gift size={14} className="text-accent" />
            Sự kiện tri ân KOL
            <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded-full font-bold">THÁNG 3</span>
          </h3>

          {/* 큰 경품 — 분기별 KOL 어워드 */}
          <div className="card bg-gradient-to-br from-accent/10 to-yellow-500/5 border-2 border-accent/50 shadow-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Trophy size={26} className="text-dark-800" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">iPhone 16 Pro 256GB</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-accent/30 text-accent rounded-full font-bold">GIẢI LỚN</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Giải thưởng KOL xuất sắc quý Q1/2026</div>
                <div className="text-[10px] text-accent font-semibold mt-1">Trị giá ~35,000,000 VND</div>
              </div>
            </div>

            <div className="bg-dark-700 rounded-xl p-3 mb-3 space-y-1.5">
              <div className="text-[10px] font-semibold text-gray-400 mb-1">ĐIỀU KIỆN THAM GIA:</div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                Hoàn thành ít nhất <span className="text-white font-bold mx-1">3 chiến dịch</span> trong quý
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                Điểm đánh giá trung bình <span className="text-white font-bold mx-1">4.5★ trở lên</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                Nộp bài đúng hạn 100% (không trễ)
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                1 người đáp ứng đủ điều kiện xuất sắc nhất sẽ được chọn
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} />
                Kết thúc: 31/03/2026
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold">47</span> KOL đang tham gia
              </div>
            </div>

            <Link href="/main/influencer/campaigns">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-yellow-400 text-dark-800 text-sm font-bold flex items-center justify-center gap-2">
                <Trophy size={15} />
                Tham gia ngay — Nhận chiến dịch đầu tiên
              </button>
            </Link>

            <p className="text-[9px] text-gray-600 text-center mt-2">
              * Đây là chương trình tri ân nội bộ của Exfluencer VN. Người chiến thắng được chọn dựa trên hiệu suất thực tế.
            </p>
          </div>

          {/* 작은 경품 — 첫 캠페인 완수 보너스 */}
          <div className="card bg-dark-600 border-2 border-primary/40 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Gift size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Thưởng Chào Mừng</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-primary/30 text-primary rounded-full font-bold">MỌI NGƯỜI</span>
                </div>
                <div className="text-xs text-gray-400">Hoàn thành chiến dịch đầu tiên</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-primary">200K</div>
                <div className="text-[9px] text-gray-500">VND thưởng</div>
              </div>
            </div>

            <div className="bg-dark-700 rounded-xl p-3 mb-3">
              <div className="text-[10px] font-semibold text-gray-400 mb-1.5">BẠN SẼ NHẬN:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  '✅ Thưởng 200,000 VND',
                  '🏅 Huy hiệu KOL xác minh',
                  '⭐ Ưu tiên trong chiến dịch sau',
                  '📊 Hồ sơ nổi bật hơn',
                ].map((item) => (
                  <div key={item} className="text-[10px] text-gray-300">{item}</div>
                ))}
              </div>
            </div>

            <Link href="/main/influencer/campaigns">
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">
                Tìm chiến dịch đầu tiên →
              </button>
            </Link>

            <p className="text-[9px] text-gray-600 text-center mt-2">
              * Thưởng được ghi nhận sau khi nhà quảng cáo xác nhận hoàn thành.
            </p>
          </div>
        </div>

        {/* ── 인증 뱃지 CTA ── */}
        <Link href="/main/influencer/profile/edit">
          <div className="rounded-2xl bg-gradient-to-r from-accent/10 to-green-500/10 border-2 border-accent/40 p-4 flex items-center gap-3">
            <BadgeCheck size={28} className="text-accent flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">Xác minh hồ sơ KOL</div>
              <div className="text-xs text-gray-400 mt-0.5">Hồ sơ được xác minh → nhà quảng cáo tin tưởng hơn → nhiều cơ hội hơn</div>
            </div>
            <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
          </div>
        </Link>

        {/* ── 무료 템플릿 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Download size={14} className="text-primary" />
            Mẫu tải về miễn phí
          </h3>

          <div className="space-y-2">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              return (
                <div key={tpl.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white">{tpl.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">{tpl.desc}</div>
                      <div className="flex gap-1.5 mt-1">
                        {tpl.tags.map((tag) => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-dark-500 text-gray-400 rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                    {tpl.url ? (
                      <a
                        href={tpl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} />
                        Mở
                      </a>
                    ) : (
                      <button
                        className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold"
                        onClick={() => handleCopy(tpl.id, tpl.title)}
                      >
                        {copiedId === tpl.id ? <CheckCircle size={12} /> : <Download size={12} />}
                        {copiedId === tpl.id ? 'OK' : 'Lấy'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 플랫폼 가이드 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Lightbulb size={14} className="text-accent" />
            Hướng dẫn phát triển kênh
          </h3>

          <div className="space-y-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div key={guide.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={guide.iconColor} />
                    </div>
                    <div className="font-bold text-white text-sm">{guide.title}</div>
                  </div>
                  <div className="space-y-1.5">
                    {guide.points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-xs text-gray-300 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 캠페인 팁 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Star size={14} className="text-accent" />
            Mẹo ứng tuyển chiến dịch thành công
          </h3>

          <div className="rounded-2xl bg-dark-600 border-2 border-dark-500 shadow-xl divide-y divide-dark-500">
            {campaignTips.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 px-4 py-3">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <p className="text-xs text-gray-300 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 지금 캠페인 찾기 CTA ── */}
        <Link href="/main/influencer/campaigns">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-white">Sẵn sàng? Tìm chiến dịch ngay!</div>
              <div className="text-xs text-white/80 mt-0.5">36 chiến dịch đang mở · Ứng tuyển ngay hôm nay</div>
            </div>
            <ChevronRight size={20} className="text-white flex-shrink-0" />
          </div>
        </Link>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

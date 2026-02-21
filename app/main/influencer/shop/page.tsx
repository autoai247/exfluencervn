'use client';

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
import { useLanguage } from '@/lib/i18n/LanguageContext';

// ─── Free Templates ───────────────────────────────────────
const templates = [
  {
    id: 'media-kit',
    icon: FileText,
    color: 'from-primary to-secondary',
    titleKo: '미디어 킷 템플릿',
    titleVi: 'Media Kit Template',
    descKo: '광고주에게 나를 전문적으로 소개하는 미디어 킷',
    descVi: 'Giới thiệu bản thân đến nhà quảng cáo một cách chuyên nghiệp',
    tagsKo: ['PDF', '무료', 'A4'],
    tagsVi: ['PDF', 'Miễn phí', 'A4'],
    urlKo: '/templates/media-kit-ko.pdf',
    urlVi: '/templates/media-kit-vi.pdf',
    filenameKo: '미디어킷_템플릿.pdf',
    filenameVi: 'Media_Kit_Template.pdf',
  },
  {
    id: 'rate-card',
    icon: BarChart3,
    color: 'from-secondary to-accent',
    titleKo: '서비스 요금표 템플릿',
    titleVi: 'Rate Card Template',
    descKo: '모든 플랫폼에 맞는 표준 서비스 요금표',
    descVi: 'Bảng báo giá dịch vụ chuẩn cho mọi nền tảng',
    tagsKo: ['PDF', '무료', 'A4'],
    tagsVi: ['PDF', 'Miễn phí', 'A4'],
    urlKo: '/templates/rate-card-ko.pdf',
    urlVi: '/templates/rate-card-vi.pdf',
    filenameKo: '서비스요금표_템플릿.pdf',
    filenameVi: 'Rate_Card_Template.pdf',
  },
  {
    id: 'caption',
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-500',
    titleKo: 'Caption Hooks (50가지 샘플)',
    titleVi: 'Caption Hooks (50 mẫu)',
    descKo: '높은 참여율을 이끄는 50가지 캡션 오프너',
    descVi: '50 câu mở đầu caption thu hút tương tác cao',
    tagsKo: ['PDF', '무료', '50가지'],
    tagsVi: ['PDF', 'Miễn phí', '50 mẫu'],
    urlKo: '/templates/caption-hooks-ko.pdf',
    urlVi: '/templates/caption-hooks-vi.pdf',
    filenameKo: '캡션훅_50가지.pdf',
    filenameVi: 'Caption_Hooks_50.pdf',
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
    pointsKo: [
      '주 3~5회 업로드로 모멘텀 유지',
      '15~30초 영상이 완주율 가장 높음',
      '첫 3초 강한 훅(Hook)은 필수',
      '관련 해시태그 3~5개 사용, 스팸 금지',
    ],
    pointsVi: [
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
    pointsKo: [
      'Reels는 피드 사진보다 우선 노출됨',
      '짧고 간결한 캡션 1~2줄, CTA로 마무리',
      '스토리 인터랙션(poll, quiz)으로 자연 도달 증가',
      '같은 niche의 KOL과 콜라보로 reach 확장',
    ],
    pointsVi: [
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
    titleKo: '참여율(Engagement Rate) 높이기',
    titleVi: 'Tăng Engagement Rate',
    pointsKo: [
      '게시 후 1시간 내 댓글에 빠르게 답장',
      '캡션에 질문을 달아 댓글 유도',
      '황금 시간대 포스팅: 오전 7~9시, 낮 12시, 저녁 7~9시',
      'ER > 3%는 좋은 수치 — 팔로워 수보다 광고주가 더 중시',
    ],
    pointsVi: [
      'Trả lời comment trong 1h đầu sau khi đăng',
      'Đặt câu hỏi trong caption để kích thích comment',
      'Post đúng giờ vàng: 7–9h sáng, 12h trưa, 7–9h tối',
      'ER > 3% là tốt — nhà QC quan tâm hơn followers',
    ],
  },
];

// ─── Campaign Tips ────────────────────────────────────────
const campaignTips = [
  {
    icon: '📋',
    tipKo: '지원 전 브리프를 꼼꼼히 읽기 — niche와 팔로워 수가 요건에 맞는지 확인',
    tipVi: 'Đọc kỹ brief trước khi ứng tuyển — đảm bảo niche và follower phù hợp yêu cầu',
  },
  {
    icon: '📸',
    tipKo: '고품질 포트폴리오 사진은 선정 확률을 3배 높임',
    tipVi: 'Ảnh portfolio chất lượng cao tăng khả năng được chọn lên 3x',
  },
  {
    icon: '⏱️',
    tipKo: '캠페인 오픈 후 24시간 이내에 지원 — 슬롯 제한 있음',
    tipVi: 'Ứng tuyển trong 24h đầu khi chiến dịch mở — slot có giới hạn',
  },
  {
    icon: '💬',
    tipKo: '자기소개는 간결하게, 왜 내가 적합한지(why you) 명확히 밝힐 것',
    tipVi: 'Giới thiệu bản thân ngắn gọn, nêu rõ why you (tại sao bạn phù hợp)',
  },
  {
    icon: '✅',
    tipKo: '기한 내 결과물 제출 — 높은 신뢰도는 다음 캠페인 우선 선정으로 이어짐',
    tipVi: 'Nộp kết quả đúng hạn — uy tín cao giúp được chọn ưu tiên lần sau',
  },
];

export default function ResourcesPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? 'KOL 가이드' : 'Tài nguyên KOL'} showNotification />

      <div className="container-mobile space-y-6 py-5">

        {/* ── 상단 배너 ── */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <div className="font-bold text-white">{language === 'ko' ? '무료 도구 & 가이드' : 'Công cụ & Hướng dẫn miễn phí'}</div>
              <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '채널 성장 및 더 많은 캠페인 수주에 도움이 됩니다' : 'Giúp bạn phát triển kênh và nhận nhiều chiến dịch hơn'}</div>
            </div>
          </div>
        </div>

        {/* ── 응모 이벤트 섹션 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Gift size={14} className="text-accent" />
            {language === 'ko' ? 'KOL 감사 이벤트' : 'Sự kiện tri ân KOL'}
            <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded-full font-bold">{language === 'ko' ? '3월' : 'THÁNG 3'}</span>
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
                  <span className="text-[9px] px-1.5 py-0.5 bg-accent/30 text-accent rounded-full font-bold">
                    {language === 'ko' ? '대상' : 'GIẢI LỚN'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? 'Q1/2026 우수 KOL 상' : 'Giải thưởng KOL xuất sắc quý Q1/2026'}</div>
                <div className="text-[10px] text-accent font-semibold mt-1">{language === 'ko' ? '약 35,000,000 VND 상당' : 'Trị giá ~35,000,000 VND'}</div>
              </div>
            </div>

            <div className="bg-dark-700 rounded-xl p-3 mb-3 space-y-1.5">
              <div className="text-[10px] font-semibold text-gray-400 mb-1">{language === 'ko' ? '참가 조건:' : 'ĐIỀU KIỆN THAM GIA:'}</div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                {language === 'ko' ? <>{`분기 내 최소 `}<span className="text-white font-bold mx-1">3개 캠페인</span> 완료</> : <>Hoàn thành ít nhất <span className="text-white font-bold mx-1">3 chiến dịch</span> trong quý</>}
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                {language === 'ko' ? <>평균 평점 <span className="text-white font-bold mx-1">4.5★ 이상</span></> : <>Điểm đánh giá trung bình <span className="text-white font-bold mx-1">4.5★ trở lên</span></>}
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                {language === 'ko' ? '100% 기한 내 제출 (지연 없음)' : 'Nộp bài đúng hạn 100% (không trễ)'}
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle size={12} className="text-accent mt-0.5 flex-shrink-0" />
                {language === 'ko' ? '조건을 가장 잘 충족한 1명이 선정됩니다' : '1 người đáp ứng đủ điều kiện xuất sắc nhất sẽ được chọn'}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} />
                {language === 'ko' ? '종료: 31/03/2026' : 'Kết thúc: 31/03/2026'}
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold">47</span> KOL {language === 'ko' ? '참가 중' : 'đang tham gia'}
              </div>
            </div>

            <Link href="/main/influencer/campaigns">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-yellow-400 text-dark-800 text-sm font-bold flex items-center justify-center gap-2">
                <Trophy size={15} />
                {language === 'ko' ? '지금 참가 — 첫 캠페인 시작하기' : 'Tham gia ngay — Nhận chiến dịch đầu tiên'}
              </button>
            </Link>

            <p className="text-[9px] text-gray-600 text-center mt-2">
              {language === 'ko'
                ? '* 본 프로그램은 Exfluencer VN 내부 감사 이벤트입니다. 수상자는 실제 성과를 기반으로 선정됩니다.'
                : '* Đây là chương trình tri ân nội bộ của Exfluencer VN. Người chiến thắng được chọn dựa trên hiệu suất thực tế.'}
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
                  <span className="text-sm font-bold text-white">{language === 'ko' ? '환영 보너스' : 'Thưởng Chào Mừng'}</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-primary/30 text-primary rounded-full font-bold">{language === 'ko' ? '모두' : 'MỌI NGƯỜI'}</span>
                </div>
                <div className="text-xs text-gray-400">{language === 'ko' ? '첫 번째 캠페인 완료' : 'Hoàn thành chiến dịch đầu tiên'}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-primary">200K</div>
                <div className="text-[9px] text-gray-500">{language === 'ko' ? 'VND 보너스' : 'VND thưởng'}</div>
              </div>
            </div>

            <div className="bg-dark-700 rounded-xl p-3 mb-3">
              <div className="text-[10px] font-semibold text-gray-400 mb-1.5">{language === 'ko' ? '받게 되는 혜택:' : 'BẠN SẼ NHẬN:'}</div>
              <div className="grid grid-cols-2 gap-1.5">
                {language === 'ko' ? [
                  '✅ 보너스 200,000 VND',
                  '🏅 KOL 인증 배지',
                  '⭐ 다음 캠페인 우선 기회',
                  '📊 프로필 상위 노출',
                ] : [
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
                {language === 'ko' ? '첫 번째 캠페인 찾기 →' : 'Tìm chiến dịch đầu tiên →'}
              </button>
            </Link>

            <p className="text-[9px] text-gray-600 text-center mt-2">
              {language === 'ko'
                ? '* 광고주가 완료 확인 후 보너스가 지급됩니다.'
                : '* Thưởng được ghi nhận sau khi nhà quảng cáo xác nhận hoàn thành.'}
            </p>
          </div>
        </div>

        {/* ── 인증 뱃지 CTA ── */}
        <Link href="/main/influencer/profile/edit">
          <div className="rounded-2xl bg-gradient-to-r from-accent/10 to-green-500/10 border-2 border-accent/40 p-4 flex items-center gap-3">
            <BadgeCheck size={28} className="text-accent flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">{language === 'ko' ? 'KOL 프로필 인증' : 'Xác minh hồ sơ KOL'}</div>
              <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '인증된 프로필 → 광고주 신뢰도 상승 → 더 많은 기회' : 'Hồ sơ được xác minh → nhà quảng cáo tin tưởng hơn → nhiều cơ hội hơn'}</div>
            </div>
            <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
          </div>
        </Link>

        {/* ── 무료 템플릿 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Download size={14} className="text-primary" />
            {language === 'ko' ? '무료 다운로드 템플릿' : 'Mẫu tải về miễn phí'}
          </h3>

          <div className="space-y-2">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const title = language === 'ko' ? tpl.titleKo : tpl.titleVi;
              const desc = language === 'ko' ? tpl.descKo : tpl.descVi;
              const tags = language === 'ko' ? tpl.tagsKo : tpl.tagsVi;
              const pdfUrl = language === 'ko' ? tpl.urlKo : tpl.urlVi;
              const filename = language === 'ko' ? tpl.filenameKo : tpl.filenameVi;
              return (
                <div key={tpl.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white">{title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">{desc}</div>
                      <div className="flex gap-1.5 mt-1">
                        {tags.map((tag) => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-dark-500 text-gray-400 rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={pdfUrl}
                      download={filename}
                      className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={12} />
                      {language === 'ko' ? '다운로드' : 'Tải về'}
                    </a>
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
            {language === 'ko' ? '채널 성장 가이드' : 'Hướng dẫn phát triển kênh'}
          </h3>

          <div className="space-y-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              const title = 'titleKo' in guide
                ? (language === 'ko' ? guide.titleKo : guide.titleVi)
                : guide.title;
              const points = language === 'ko' ? guide.pointsKo : guide.pointsVi;
              return (
                <div key={guide.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={guide.iconColor} />
                    </div>
                    <div className="font-bold text-white text-sm">{title}</div>
                  </div>
                  <div className="space-y-1.5">
                    {points.map((point, idx) => (
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
            {language === 'ko' ? '캠페인 성공 지원 팁' : 'Mẹo ứng tuyển chiến dịch thành công'}
          </h3>

          <div className="rounded-2xl bg-dark-600 border-2 border-dark-500 shadow-xl divide-y divide-dark-500">
            {campaignTips.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 px-4 py-3">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'ko' ? item.tipKo : item.tipVi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 지금 캠페인 찾기 CTA ── */}
        <Link href="/main/influencer/campaigns">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-white">{language === 'ko' ? '준비됐나요? 지금 캠페인 찾기!' : 'Sẵn sàng? Tìm chiến dịch ngay!'}</div>
              <div className="text-xs text-white/80 mt-0.5">{language === 'ko' ? '36개 캠페인 모집 중 · 오늘 지원하세요' : '36 chiến dịch đang mở · Ứng tuyển ngay hôm nay'}</div>
            </div>
            <ChevronRight size={20} className="text-white flex-shrink-0" />
          </div>
        </Link>

      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

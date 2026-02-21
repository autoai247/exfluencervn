'use client';

import Link from 'next/link';
import {
  BookOpen,
  FileText,
  ChevronRight,
  Lightbulb,
  Target,
  BarChart3,
  Users,
  CheckCircle,
  BadgeCheck,
  ExternalLink,
  TrendingUp,
  Download,
  ClipboardList,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const guides = [
  {
    id: 'brief',
    icon: FileText,
    color: 'from-primary to-secondary',
    titleKo: '표준 Brief 작성 방법',
    titleVi: 'Cách viết Brief chuẩn',
    pointsKo: [
      '캠페인 목표 명확히 기술: 브랜드 인지도 향상 또는 매출 증가?',
      '플랫폼, 콘텐츠 형식, 구체적인 타임라인 명시',
      'KOL에게 핵심 메시지와 절대 언급하면 안 되는 사항 안내',
      'KOL이 스타일을 이해할 수 있도록 샘플 또는 무드보드 제공',
    ],
    pointsVi: [
      'Mô tả rõ mục tiêu chiến dịch: nhận diện thương hiệu hay tăng doanh số?',
      'Nêu rõ nền tảng, định dạng nội dung và timeline cụ thể',
      'Cho KOL biết key message và những điều KHÔNG được nói',
      'Cung cấp sample hoặc mood board để KOL hiểu phong cách',
    ],
  },
  {
    id: 'kol-select',
    icon: Users,
    color: 'from-secondary to-accent',
    titleKo: '적합한 KOL 선택',
    titleVi: 'Chọn KOL phù hợp',
    pointsKo: [
      'ER(참여율) > 3%가 팔로워 수보다 더 중요',
      'Nano KOL(1K–10K)은 Mega KOL보다 전환율이 높은 경우가 많음',
      'KOL의 오디언스가 타겟과 일치하는지 확인',
      '이전 캠페인 이력을 통해 콘텐츠 품질 평가',
    ],
    pointsVi: [
      'ER (Engagement Rate) > 3% quan trọng hơn số followers',
      'Nano KOL (1K–10K) thường có tỉ lệ chuyển đổi cao hơn mega KOL',
      'Kiểm tra tệp khán giả của KOL có khớp với target của bạn không',
      'Xem lịch sử campaign trước để đánh giá chất lượng nội dung',
    ],
  },
  {
    id: 'budget',
    icon: BarChart3,
    color: 'from-accent to-green-500',
    titleKo: '예산 최적화',
    titleVi: 'Tối ưu ngân sách',
    pointsKo: [
      '동일 예산으로 Macro KOL 1명보다 Nano KOL 3~5명이 더 효과적',
      '플랫폼 다양화 우선: TikTok은 도달, Instagram은 참여',
      '사전에 명확한 KPI 설정: 조회수, 클릭, 또는 전환?',
      'KOL 게시 후 콘텐츠 부스팅을 위해 예산의 20% 유보',
    ],
    pointsVi: [
      '3–5 Nano KOL thường hiệu quả hơn 1 Macro KOL cùng mức ngân sách',
      'Ưu tiên đa dạng nền tảng: TikTok cho reach, Instagram cho engagement',
      'Đặt KPI rõ ràng trước: views, click, hay conversion?',
      'Giữ lại 20% ngân sách cho content boost sau khi KOL đăng',
    ],
  },
  {
    id: 'relationship',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    titleKo: '장기 KOL 관계 구축',
    titleVi: 'Xây dựng quan hệ KOL dài hạn',
    pointsKo: [
      '기한 내 결제 — KOL은 신뢰할 수 있는 광고주를 기억하고 우선시',
      '캠페인 후 구체적인 피드백으로 다음 협업 개선',
      '지속 협업 KOL은 단가가 낮고 브랜드를 더 잘 이해함',
      '잠재적 KOL을 화이트리스트에 초대해 새 캠페인에서 우선 매칭',
    ],
    pointsVi: [
      'Thanh toán đúng hạn — KOL nhớ và ưu tiên nhà QC uy tín',
      'Feedback cụ thể sau mỗi chiến dịch giúp cải thiện lần sau',
      'KOL thường xuyên hợp tác có giá thấp hơn và hiểu thương hiệu hơn',
      'Invite KOL tiềm năng vào whitelist để được ưu tiên trong campaign mới',
    ],
  },
];

const tips = [
  { icon: '🎯', tipKo: '플랫폼에서 자세한 브리프 작성 → 고품질 KOL이 더 많이 지원', tipVi: 'Tạo brief chi tiết trên nền tảng → KOL chất lượng cao sẽ ứng tuyển nhiều hơn' },
  { icon: '⚡', tipKo: '48시간 내 지원서 응답 — 좋은 KOL은 선택지가 많음', tipVi: 'Phản hồi đơn ứng tuyển trong 48h — KOL tốt thường có nhiều lựa chọn' },
  { icon: '📊', tipKo: '실제 성과 측정을 위해 캠페인 후 KOL에게 인사이트 자료 요청', tipVi: 'Yêu cầu KOL cung cấp insight sau chiến dịch để đo lường hiệu quả thực' },
  { icon: '🤝', tipKo: '충분한 지원(샘플, 명확한 브리프)을 받은 KOL이 더 좋은 콘텐츠 제작', tipVi: 'KOL được hỗ trợ tốt (sample, brief rõ ràng) tạo nội dung chất lượng hơn' },
];

const advertiserTemplates = [
  {
    id: 'campaign-brief',
    icon: FileText,
    color: 'from-secondary to-accent',
    titleKo: '캠페인 브리프 템플릿',
    titleVi: 'Mẫu Campaign Brief',
    descKo: 'KOL에게 전달하는 공식 캠페인 브리프 양식',
    descVi: 'Mẫu brief chính thức gửi cho KOL',
    tagsKo: ['PDF', '무료', 'A4'],
    tagsVi: ['PDF', 'Miễn phí', 'A4'],
    urlKo: '/templates/campaign-brief-ko.pdf',
    urlVi: '/templates/campaign-brief-vi.pdf',
    filenameKo: '캠페인_브리프_템플릿.pdf',
    filenameVi: 'Campaign_Brief_Template.pdf',
  },
  {
    id: 'kol-checklist',
    icon: ClipboardList,
    color: 'from-primary to-secondary',
    titleKo: 'KOL 선정 체크리스트',
    titleVi: 'Checklist Chọn KOL',
    descKo: '100점 만점 KOL 검증 프레임워크 (5개 영역)',
    descVi: 'Khung đánh giá 100 điểm để chọn đúng KOL',
    tagsKo: ['PDF', '무료', '100점'],
    tagsVi: ['PDF', 'Miễn phí', '100 điểm'],
    urlKo: '/templates/kol-checklist-ko.pdf',
    urlVi: '/templates/kol-checklist-vi.pdf',
    filenameKo: 'KOL_선정_체크리스트.pdf',
    filenameVi: 'KOL_Selection_Checklist.pdf',
  },
];

export default function AdvertiserResourcesPage() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? '광고주 가이드' : 'Tài nguyên Nhà QC'} showNotification />

      <div className="container-mobile space-y-6 py-5">

        {/* ── 헤더 배너 ── */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <div className="font-bold text-white">{language === 'ko' ? '효과적인 캠페인 운영 가이드' : 'Hướng dẫn chạy campaign hiệu quả'}</div>
              <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '비용 최적화 · KOL 선택 · 성과 측정' : 'Tối ưu chi phí · Chọn đúng KOL · Đo lường kết quả'}</div>
            </div>
          </div>
        </div>

        {/* ── 캠페인 만들기 CTA ── */}
        <Link href="/main/advertiser/campaigns/create">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-white">{language === 'ko' ? '캠페인 만들기' : 'Tạo chiến dịch ngay'}</div>
              <div className="text-xs text-white/80 mt-0.5">{language === 'ko' ? '자동 브리프 · 표준 템플릿 · 2분' : 'Brief tự động · Mẫu chuẩn · 2 phút'}</div>
            </div>
            <ChevronRight size={20} className="text-white flex-shrink-0" />
          </div>
        </Link>

        {/* ── 가이드 섹션 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Lightbulb size={14} className="text-accent" />
            {language === 'ko' ? '실전 가이드' : 'Hướng dẫn thực chiến'}
          </h3>

          <div className="space-y-3">
            {guides.map((guide) => {
              const Icon = guide.icon;
              const title = language === 'ko' ? guide.titleKo : guide.titleVi;
              const points = language === 'ko' ? guide.pointsKo : guide.pointsVi;
              return (
                <div key={guide.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className="text-white" />
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

        {/* ── 실전 팁 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Target size={14} className="text-primary" />
            {language === 'ko' ? '성공 광고주의 팁' : 'Mẹo từ nhà quảng cáo thành công'}
          </h3>

          <div className="rounded-2xl bg-dark-600 border-2 border-dark-500 shadow-xl divide-y divide-dark-500">
            {tips.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 px-4 py-3">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <p className="text-xs text-gray-300 leading-relaxed">{language === 'ko' ? item.tipKo : item.tipVi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 무료 템플릿 다운로드 ── */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 px-1 flex items-center gap-2">
            <Download size={14} className="text-primary" />
            {language === 'ko' ? '무료 다운로드 템플릿' : 'Mẫu tải về miễn phí'}
          </h3>

          <div className="space-y-2">
            {advertiserTemplates.map((tpl) => {
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

        {/* ── KOL 찾기 CTA ── */}
        <Link href="/main/advertiser/influencers">
          <div className="rounded-2xl bg-dark-600 border-2 border-dark-500 p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">{language === 'ko' ? '적합한 KOL 찾기' : 'Tìm KOL phù hợp ngay'}</div>
              <div className="text-xs text-gray-400 mt-0.5">{language === 'ko' ? '니치 · 팔로워 · ER · 가격으로 필터' : 'Lọc theo niche · followers · ER · giá'}</div>
            </div>
            <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
          </div>
        </Link>

      </div>

      <BottomNav userType="advertiser" />
    </div>
  );
}

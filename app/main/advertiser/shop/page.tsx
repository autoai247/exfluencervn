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
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const guides = [
  {
    id: 'brief',
    icon: FileText,
    color: 'from-primary to-secondary',
    title: 'Cách viết Brief chuẩn',
    points: [
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
    title: 'Chọn KOL phù hợp',
    points: [
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
    title: 'Tối ưu ngân sách',
    points: [
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
    title: 'Xây dựng quan hệ KOL dài hạn',
    points: [
      'Thanh toán đúng hạn — KOL nhớ và ưu tiên nhà QC uy tín',
      'Feedback cụ thể sau mỗi chiến dịch giúp cải thiện lần sau',
      'KOL thường xuyên hợp tác có giá thấp hơn và hiểu thương hiệu hơn',
      'Invite KOL tiềm năng vào whitelist để được ưu tiên trong campaign mới',
    ],
  },
];

const tips = [
  { icon: '🎯', tip: 'Tạo brief chi tiết trên nền tảng → KOL chất lượng cao sẽ ứng tuyển nhiều hơn' },
  { icon: '⚡', tip: 'Phản hồi đơn ứng tuyển trong 48h — KOL tốt thường có nhiều lựa chọn' },
  { icon: '📊', tip: 'Yêu cầu KOL cung cấp insight sau chiến dịch để đo lường hiệu quả thực' },
  { icon: '🤝', tip: 'KOL được hỗ trợ tốt (sample, brief rõ ràng) tạo nội dung chất lượng hơn' },
];

export default function AdvertiserResourcesPage() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? '광고주 리소스' : 'Tài nguyên Nhà QC'} showNotification />

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
              return (
                <div key={guide.id} className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className="text-white" />
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
                <p className="text-xs text-gray-300 leading-relaxed">{item.tip}</p>
              </div>
            ))}
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

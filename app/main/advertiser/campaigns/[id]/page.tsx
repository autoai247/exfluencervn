'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, DollarSign, Users, Eye, Clock, CheckCircle, MessageCircle, X, User, Star } from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Breadcrumb from '@/components/common/Breadcrumb';
import BottomNav from '@/components/common/BottomNav';

// Mock campaign detail data
const mockCampaignDetail = {
  id: '1',
  title: '신규 스킨케어 제품 리뷰 캠페인',
  description: '새로 출시한 프리미엄 스킨케어 라인을 체험하고 솔직한 리뷰를 공유해주세요. 제품은 무료로 제공됩니다.',
  status: 'active',
  budget: 2000000,
  spent: 1200000,
  budgetPerInfluencer: 250000,
  targetInfluencers: 8,
  applicants: 23,
  views: 125000,
  startDate: '2026-02-01',
  endDate: '2026-03-15',
  deadline: '2026-03-15',
  createdAt: '2026-02-01',
  deliveryType: 'product' as 'product' | 'service' | 'visit',

  requirements: {
    minFollowers: 10000,
    minEngagement: 3.0,
    platforms: ['Instagram', 'TikTok'],
    categories: ['뷰티', '라이프스타일'],
    ageRange: '20-35세',
    gender: '여성',
    skinType: ['combination', 'oily'],
    skinTone: ['light', 'medium'],
  },

  deliverables: [
    'Instagram 피드 포스트 1개',
    'Instagram 스토리 3개 이상',
    '제품 사용 후기 영상 (1분 이상)',
    '해시태그 필수 포함: #스킨케어 #뷰티리뷰 #신제품',
  ],

  acceptedInfluencersList: [
    {
      id: '1',
      name: '김민지',
      avatar: 'https://ui-avatars.com/api/?name=Kim+Minji&background=FF6B6B&color=fff',
      followers: 45000,
      engagement: 4.2,
      platform: 'Instagram',
      status: 'completed',
      submittedAt: '2026-02-20',
      views: 15000,
      likes: 2300,
      submittedContent: [
        {
          id: 'content-1',
          url: 'https://instagram.com/p/example1',
          description: 'Instagram 피드 포스트 - 사용 전/후 비교',
          thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
          submittedAt: '2026-02-18',
          status: 'approved',
          reviewedAt: '2026-02-19'
        },
        {
          id: 'content-2',
          url: 'https://instagram.com/stories/example2',
          description: 'Instagram 스토리 - 제품 언박싱',
          thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
          submittedAt: '2026-02-18',
          status: 'approved',
          reviewedAt: '2026-02-19'
        }
      ]
    },
    {
      id: '2',
      name: '이서연',
      avatar: 'https://ui-avatars.com/api/?name=Lee+Seoyeon&background=4ECDC4&color=fff',
      followers: 32000,
      engagement: 5.1,
      platform: 'Instagram',
      status: 'content_submitted',
      acceptedAt: '2026-02-15',
      submittedContent: [
        {
          id: 'content-3',
          url: 'https://instagram.com/p/example3',
          description: 'Instagram 피드 포스트',
          thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          submittedAt: '2026-02-22',
          status: 'pending'
        }
      ]
    },
    {
      id: '3',
      name: '박지훈',
      avatar: 'https://ui-avatars.com/api/?name=Park+Jihoon&background=6C5CE7&color=fff',
      followers: 28000,
      engagement: 3.8,
      platform: 'TikTok',
      status: 'in_progress',
      acceptedAt: '2026-02-18',
      submittedContent: []
    },
  ],

  pendingApplicants: [
    {
      id: '4',
      name: '최유나',
      avatar: 'https://ui-avatars.com/api/?name=Choi+Yuna&background=FFA502&color=fff',
      followers: 52000,
      engagement: 4.5,
      platform: 'Instagram',
      appliedAt: '2026-02-10',
      categories: ['뷰티', '라이프스타일'],
      location: '호치민',
      gender: '여성',
      age: 28,
      skinType: 'combination',
      skinTone: 'light',
      hasVehicle: false,
      hasChildren: false,
      hasPets: false,
    },
    {
      id: '5',
      name: '정수빈',
      avatar: 'https://ui-avatars.com/api/?name=Jung+Subin&background=00B894&color=fff',
      followers: 18000,
      engagement: 3.5,
      platform: 'TikTok',
      appliedAt: '2026-02-12',
      categories: ['패션', '라이프스타일'],
      location: '하노이',
      gender: '여성',
      age: 25,
      skinType: 'dry',
      skinTone: 'medium',
      hasVehicle: false,
      hasChildren: false,
      hasPets: false,
    },
    {
      id: '6',
      name: '강민호',
      avatar: 'https://ui-avatars.com/api/?name=Kang+Minho&background=E91E63&color=fff',
      followers: 35000,
      engagement: 4.8,
      platform: 'Instagram',
      appliedAt: '2026-02-13',
      categories: ['뷰티', 'lifestyle'],
      location: '호치민',
      gender: '남성',
      age: 26,
      skinType: 'oily',
      skinTone: 'light',
      hasVehicle: true,
      hasChildren: false,
      hasPets: true,
    },
  ],
};

export default function CampaignDetailPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [pendingApplicants, setPendingApplicants] = useState(mockCampaignDetail.pendingApplicants);
  const [acceptedInfluencers, setAcceptedInfluencers] = useState(mockCampaignDetail.acceptedInfluencersList);

  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewInfluencer, setReviewInfluencer] = useState<any>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    tags: [] as string[],
    wouldRecommend: true,
  });

  const handleApprove = (applicant: any) => {
    setPendingApplicants(prev => prev.filter(a => a.id !== applicant.id));
    const newInfluencer = {
      id: applicant.id,
      name: applicant.name,
      avatar: applicant.avatar,
      followers: applicant.followers,
      engagement: applicant.engagement,
      platform: applicant.platform,
      status: 'in_progress' as const,
      acceptedAt: new Date().toISOString().split('T')[0],
      submittedContent: [],
    };
    setAcceptedInfluencers(prev => [...prev, newInfluencer]);
    // 승인 완료 - toast 또는 UI 상태로 처리
  };

  const handleReject = (applicant: any) => {
    setPendingApplicants(prev => prev.filter(a => a.id !== applicant.id));
    // 거절 완료 - UI 상태로 처리
  };

  const calculateApplicantMatch = (applicant: any) => {
    const requirements = mockCampaignDetail.requirements;
    let score = 0;
    const criteria: { name: string; match: boolean; weight: number }[] = [];

    const followersMatch = applicant.followers >= requirements.minFollowers;
    criteria.push({ name: language === 'ko' ? '팔로워' : 'Người theo dõi', match: followersMatch, weight: 25 });
    if (followersMatch) score += 25;

    const engagementMatch = applicant.engagement >= requirements.minEngagement;
    criteria.push({ name: language === 'ko' ? '참여율' : 'Tỷ lệ tương tác', match: engagementMatch, weight: 20 });
    if (engagementMatch) score += 20;

    const platformMatch = requirements.platforms.includes(applicant.platform);
    criteria.push({ name: language === 'ko' ? '플랫폼' : 'Nền tảng', match: platformMatch, weight: 15 });
    if (platformMatch) score += 15;

    const categoryMatch = applicant.categories?.some((c: string) =>
      requirements.categories.includes(c)
    ) ?? false;
    criteria.push({ name: language === 'ko' ? '카테고리' : 'Danh mục', match: categoryMatch, weight: 15 });
    if (categoryMatch) score += 15;

    const genderMatch = requirements.gender === '무관' || requirements.gender === 'Không giới hạn' || applicant.gender === requirements.gender;
    criteria.push({ name: language === 'ko' ? '성별' : 'Giới tính', match: genderMatch, weight: 10 });
    if (genderMatch) score += 10;

    const skinTypeMatch = !requirements.skinType ||
      (requirements.skinType as string[]).includes(applicant.skinType);
    criteria.push({ name: language === 'ko' ? '피부 타입' : 'Loại da', match: skinTypeMatch, weight: 10 });
    if (skinTypeMatch) score += 10;

    const skinToneMatch = !requirements.skinTone ||
      (requirements.skinTone as string[]).includes(applicant.skinTone);
    criteria.push({ name: language === 'ko' ? '피부 톤' : 'Tông da', match: skinToneMatch, weight: 5 });
    if (skinToneMatch) score += 5;

    return {
      percentage: Math.round(score),
      criteria,
      isGoodMatch: score >= 70,
    };
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700/95 backdrop-blur-sm border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => router.back()} className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{language === 'ko' ? '캠페인 상세' : 'Chi tiết chiến dịch'}</h1>
        </div>
        <Breadcrumb
          items={[
            { label: language === 'ko' ? '캠페인' : 'Chiến dịch', href: '/main/advertiser/campaigns' },
            { label: mockCampaignDetail.title },
          ]}
          className="ml-9"
        />
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Campaign Header */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold text-white flex-1 mr-3">{mockCampaignDetail.title}</h2>
            <span className="px-3 py-1 bg-success/20 text-success border border-success/30 text-xs rounded-full font-medium flex-shrink-0">
              {language === 'ko' ? '진행 중' : 'Đang hoạt động'}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{mockCampaignDetail.description}</p>
        </div>

        {/* Budget Progress */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '예산 사용 현황' : 'Tình trạng sử dụng ngân sách'}</h3>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{language === 'ko' ? '사용된 예산' : 'Ngân sách đã dùng'}</span>
              <span className="text-white font-semibold">
                {((mockCampaignDetail.spent / mockCampaignDetail.budget) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 bg-dark-500 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                style={{ width: `${(mockCampaignDetail.spent / mockCampaignDetail.budget) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-white font-semibold">
                {formatPoints(mockCampaignDetail.spent)}
              </span>
              <span className="text-gray-400">
                / {formatPoints(mockCampaignDetail.budget)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Clickable */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setShowAcceptedModal(true)}
            className="bg-gradient-to-br from-primary/15 to-dark-700 border border-primary/20 hover:border-primary/40 rounded-2xl p-4 text-center cursor-pointer transition-all shadow-xl"
          >
            <Users size={24} className="text-primary mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {acceptedInfluencers.length}/{mockCampaignDetail.targetInfluencers}
            </div>
            <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '승인된 KOL' : 'KOL được chấp thuận'}</div>
            <div className="text-xs text-gray-500 mt-1">👆 {language === 'ko' ? '눌러서 보기' : 'Nhấn để xem'}</div>
          </div>
          <div
            onClick={() => setShowApplicantsModal(true)}
            className="bg-gradient-to-br from-secondary/15 to-dark-700 border border-secondary/20 hover:border-secondary/40 rounded-2xl p-4 text-center cursor-pointer transition-all shadow-xl"
          >
            <Clock size={24} className="text-secondary mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{mockCampaignDetail.applicants}</div>
            <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '총 지원자' : 'Tổng ứng viên'}</div>
            <div className="text-xs text-gray-500 mt-1">👆 {language === 'ko' ? '눌러서 보기' : 'Nhấn để xem'}</div>
          </div>
          <div className="bg-gradient-to-br from-accent/15 to-dark-700 border border-accent/20 rounded-2xl p-4 text-center shadow-xl">
            <Eye size={24} className="text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {(mockCampaignDetail.views / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '조회수' : 'Lượt xem'}</div>
          </div>
          <div
            onClick={() => setShowBudgetModal(true)}
            className="bg-gradient-to-br from-success/15 to-dark-700 border border-success/20 hover:border-success/40 rounded-2xl p-4 text-center cursor-pointer transition-all shadow-xl"
          >
            <DollarSign size={24} className="text-success mx-auto mb-2" />
            <div className="text-lg font-bold text-white">
              {formatPoints(mockCampaignDetail.budgetPerInfluencer)}
            </div>
            <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? 'KOL당' : 'Mỗi KOL'}</div>
            <div className="text-xs text-gray-500 mt-1">👆 {language === 'ko' ? '눌러서 보기' : 'Nhấn để xem'}</div>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 space-y-3 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '캠페인 정보' : 'Thông tin chiến dịch'}</h3>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '기간:' : 'Thời gian:'}</span>
            <span className="text-white">{mockCampaignDetail.startDate} ~ {mockCampaignDetail.endDate}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '지원 마감:' : 'Hạn đăng ký:'}</span>
            <span className="text-white">{mockCampaignDetail.deadline}</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '지원 요건' : 'Yêu cầu ứng tuyển'}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'ko' ? '최소 팔로워:' : 'Người theo dõi tối thiểu:'}</span>
              <span className="text-white font-medium">{mockCampaignDetail.requirements.minFollowers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'ko' ? '최소 참여율:' : 'Tỷ lệ tương tác tối thiểu:'}</span>
              <span className="text-white font-medium">{mockCampaignDetail.requirements.minEngagement}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'ko' ? '플랫폼:' : 'Nền tảng:'}</span>
              <span className="text-white font-medium">{mockCampaignDetail.requirements.platforms.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'ko' ? '카테고리:' : 'Danh mục:'}</span>
              <span className="text-white font-medium">{mockCampaignDetail.requirements.categories.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '콘텐츠 요건' : 'Yêu cầu nội dung'}</h3>
          <ul className="space-y-2">
            {mockCampaignDetail.deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accepted Influencers */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? `승인된 KOL (${acceptedInfluencers.length})` : `KOL được chấp thuận (${acceptedInfluencers.length})`}</h3>
          </div>

          {acceptedInfluencers.map((influencer) => (
            <div key={influencer.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{influencer.name}</h4>
                  <p className="text-xs text-gray-400">{influencer.platform}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  influencer.status === 'completed'
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-accent/20 text-accent border border-accent/30'
                }`}>
                  {influencer.status === 'completed'
                    ? (language === 'ko' ? '완료' : 'Hoàn thành')
                    : (language === 'ko' ? '진행 중' : 'Đang thực hiện')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                  <p className="text-gray-400">{language === 'ko' ? '팔로워' : 'Người theo dõi'}</p>
                  <p className="text-white font-semibold">{(influencer.followers / 1000).toFixed(1)}K</p>
                </div>
                <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                  <p className="text-gray-400">{language === 'ko' ? '참여율' : 'Tỷ lệ tương tác'}</p>
                  <p className="text-white font-semibold">{influencer.engagement}%</p>
                </div>
              </div>

              {/* Payment & Product Shipping */}
              {influencer.status !== 'completed' && influencer.status !== 'in_progress' && (
                <div className="mt-3 pt-3 border-t border-dark-400/40 space-y-3">
                  {/* Payment Confirmation */}
                  <div>
                    <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                      <DollarSign size={14} className="text-success" />
                      {language === 'ko' ? '결제 정보' : 'Thông tin thanh toán'}
                    </h5>
                    <div className="bg-dark-700/60 rounded-xl p-3 border border-dark-400/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{language === 'ko' ? '결제 금액:' : 'Số tiền thanh toán:'}</span>
                        <span className="text-white font-semibold">{mockCampaignDetail.budgetPerInfluencer.toLocaleString()} VND</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`payment-${influencer.id}`}
                          className="w-4 h-4 rounded border-dark-400 text-primary focus:ring-primary"
                          onChange={(_e) => {
                            // 결제 완료 처리 - 추후 API 연동
                          }}
                        />
                        <label htmlFor={`payment-${influencer.id}`} className="text-xs text-gray-300 cursor-pointer">
                          {language === 'ko' ? '결제 완료' : 'Đã thanh toán xong'}
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === 'ko' ? '💡 KOL이 "수령 완료"를 확인하면 다음 단계로 진행됩니다' : '💡 Khi KOL xác nhận "Đã nhận", quy trình sẽ tiến sang bước tiếp theo'}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  {mockCampaignDetail.deliveryType === 'product' && (
                    <div>
                      <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        {language === 'ko' ? '제품 발송' : 'Gửi sản phẩm'}
                      </h5>
                      <div className="bg-dark-700/60 rounded-xl p-3 border border-dark-400/30 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '배송사' : 'Đơn vị vận chuyển'}</label>
                          <select className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white focus:border-primary/50 focus:outline-none">
                            <option className="bg-dark-700">Viettel Post</option>
                            <option className="bg-dark-700">Vietnam Post (EMS)</option>
                            <option className="bg-dark-700">Giao Hàng Nhanh (GHN)</option>
                            <option className="bg-dark-700">Giao Hàng Tiết Kiệm (GHTK)</option>
                            <option className="bg-dark-700">J&T Express</option>
                            <option className="bg-dark-700">Grab Express</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '운송장 번호' : 'Mã vận đơn'}</label>
                          <input
                            type="text"
                            placeholder="VTP123456789"
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => {/* 발송 정보 저장 - 추후 API 연동 */}}
                          className="w-full bg-gradient-to-r from-secondary to-blue-400 text-white hover:opacity-90 rounded-lg text-xs py-2 font-medium"
                        >
                          {language === 'ko' ? '발송 확인' : 'Xác nhận gửi hàng'}
                        </button>
                        <p className="text-xs text-gray-500">
                          {language === 'ko' ? '💡 운송장 번호 입력 시 KOL이 배송 조회 가능합니다' : '💡 Khi nhập mã vận đơn, KOL có thể theo dõi đơn hàng'}
                        </p>
                      </div>
                    </div>
                  )}

                  {mockCampaignDetail.deliveryType === 'service' && (
                    <div>
                      <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {language === 'ko' ? '매장 방문 정보' : 'Thông tin ghé thăm cửa hàng'}
                      </h5>
                      <div className="bg-dark-700/60 rounded-xl p-3 border border-dark-400/30 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '매장 주소' : 'Địa chỉ cửa hàng'}</label>
                          <input
                            type="text"
                            placeholder="123 Nguyen Hue, District 1, HCMC"
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '영업 시간' : 'Giờ mở cửa'}</label>
                          <input
                            type="text"
                            placeholder={language === 'ko' ? '월-금 10:00-20:00, 주말 10:00-22:00' : 'T2-T6 10:00-20:00, Cuối tuần 10:00-22:00'}
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '담당자 연락처' : 'Liên hệ phụ trách'}</label>
                          <input
                            type="text"
                            placeholder="+84 90 123 4567"
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => {/* 매장 정보 저장 - 추후 API 연동 */}}
                          className="w-full bg-gradient-to-r from-accent to-yellow-400 text-dark-800 hover:opacity-90 rounded-lg text-xs py-2 font-medium"
                        >
                          {language === 'ko' ? '정보 저장' : 'Lưu thông tin'}
                        </button>
                        <p className="text-xs text-gray-500">
                          {language === 'ko' ? '💡 KOL이 매장을 방문하여 서비스/제품을 체험합니다' : '💡 KOL sẽ ghé thăm cửa hàng để trải nghiệm dịch vụ/sản phẩm'}
                        </p>
                      </div>
                    </div>
                  )}

                  {mockCampaignDetail.deliveryType === 'visit' && (
                    <div>
                      <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                        <Calendar size={14} className="text-primary" />
                        {language === 'ko' ? '미팅 일정 잡기' : 'Sắp xếp lịch gặp'}
                      </h5>
                      <div className="bg-dark-700/60 rounded-xl p-3 border border-dark-400/30 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '미팅 날짜' : 'Ngày gặp'}</label>
                          <input
                            type="date"
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white focus:border-primary/50 focus:outline-none [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '미팅 시간' : 'Giờ gặp'}</label>
                          <input
                            type="time"
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white focus:border-primary/50 focus:outline-none [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '미팅 장소' : 'Địa điểm gặp'}</label>
                          <input
                            type="text"
                            placeholder={language === 'ko' ? '사무실, 이벤트 장소 등' : 'Văn phòng, địa điểm sự kiện, v.v.'}
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">{language === 'ko' ? '특이 사항' : 'Ghi chú đặc biệt'}</label>
                          <textarea
                            placeholder={language === 'ko' ? '주차 정보, 준비 물품 등' : 'Thông tin đỗ xe, vật dụng cần chuẩn bị, v.v.'}
                            rows={2}
                            className="w-full bg-dark-600/80 border border-dark-400/40 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none resize-none"
                          />
                        </div>
                        <button
                          onClick={() => {/* 미팅 일정 저장 - 추후 API 연동 */}}
                          className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-lg text-xs py-2 font-medium"
                        >
                          {language === 'ko' ? '일정 확인' : 'Xác nhận lịch'}
                        </button>
                        <p className="text-xs text-gray-500">
                          {language === 'ko' ? '💡 KOL과 직접 만나 제품/서비스를 전달합니다' : '💡 Hẹn gặp trực tiếp với KOL để bàn giao sản phẩm/dịch vụ'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {influencer.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-dark-400/40">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                      <p className="text-gray-400">{language === 'ko' ? '조회수' : 'Lượt xem'}</p>
                      <p className="text-white font-semibold">{influencer.views?.toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                      <p className="text-gray-400">{language === 'ko' ? '좋아요' : 'Lượt thích'}</p>
                      <p className="text-white font-semibold">{influencer.likes?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setReviewInfluencer(influencer);
                      setReviewData({ rating: 5, comment: '', tags: [], wouldRecommend: true });
                      setShowReviewModal(true);
                    }}
                    className="w-full bg-accent/20 text-accent hover:bg-accent/30 rounded-xl py-2 flex items-center justify-center gap-1 text-xs font-medium border border-accent/30 transition-colors"
                  >
                    <Star size={14} className="fill-accent" />
                    {language === 'ko' ? '리뷰 작성' : 'Viết đánh giá'}
                  </button>
                </div>
              )}

              <button
                onClick={() => router.push(`/main/messages?userId=${influencer.id}&userName=${influencer.name}`)}
                className="w-full mt-3 bg-dark-700/60 text-gray-300 hover:text-white hover:bg-dark-700 border border-dark-400/30 hover:border-primary/30 rounded-xl py-2 flex items-center justify-center gap-1 text-xs transition-all"
              >
                <MessageCircle size={14} />
                {language === 'ko' ? '메시지 보내기' : 'Gửi tin nhắn'}
              </button>

              {/* Submitted Content Review */}
              {influencer.submittedContent && influencer.submittedContent.length > 0 && (
                <div className="mt-4 pt-4 border-t border-dark-400/40">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Eye size={16} className="text-secondary" />
                    {language === 'ko' ? `제출된 콘텐츠 (${influencer.submittedContent.length})` : `Nội dung đã nộp (${influencer.submittedContent.length})`}
                  </h4>
                  <div className="space-y-3">
                    {influencer.submittedContent.map((content: any) => (
                      <div key={content.id} className="bg-dark-700/60 rounded-xl p-3 border border-dark-400/30">
                        <div className="flex gap-3 mb-2">
                          <img
                            src={content.thumbnail}
                            alt="Content thumbnail"
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white mb-1">{content.description}</p>
                            <a
                              href={content.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-secondary hover:text-secondary/80 block truncate transition-colors"
                            >
                              {content.url}
                            </a>
                            <p className="text-xs text-gray-500 mt-1">
                              {language === 'ko' ? '제출일' : 'Ngày nộp'}: {content.submittedAt}
                            </p>
                          </div>
                        </div>

                        {content.status === 'pending' ? (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {/* 콘텐츠 승인 - 추후 API 연동 */}}
                              className="flex-1 bg-success/20 text-success hover:bg-success/30 border border-success/30 rounded-lg text-xs py-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <CheckCircle size={14} />
                              {language === 'ko' ? '승인' : 'Chấp thuận'}
                            </button>
                            <button
                              onClick={() => {/* 콘텐츠 거절 - 추후 API 연동 */}}
                              className="flex-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 rounded-lg text-xs py-2 transition-colors"
                            >
                              {language === 'ko' ? '거절' : 'Từ chối'}
                            </button>
                          </div>
                        ) : content.status === 'approved' ? (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <CheckCircle size={14} className="text-success" />
                            <span className="text-success">{language === 'ko' ? '승인됨' : 'Đã duyệt'}</span>
                            <span className="text-gray-500">({content.reviewedAt})</span>
                          </div>
                        ) : (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className="text-primary">{language === 'ko' ? '거절됨' : 'Đã từ chối'}</span>
                            <span className="text-gray-500">({content.reviewedAt})</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pending Applicants */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? `대기 중인 지원자 (${pendingApplicants.length})` : `Ứng viên đang chờ (${pendingApplicants.length})`}</h3>
          </div>

          {pendingApplicants.map((applicant) => {
            const matchResult = calculateApplicantMatch(applicant);

            return (
              <div key={applicant.id} className={`relative bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl ${
                matchResult.isGoodMatch ? 'border-2 border-success/30' : 'border-2 border-dark-400/40'
              }`}>
                {/* Matching Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    matchResult.percentage >= 90 ? 'bg-gradient-to-r from-accent to-yellow-400 text-dark-800' :
                    matchResult.percentage >= 70 ? 'bg-gradient-to-r from-primary to-secondary text-white' :
                    matchResult.percentage >= 50 ? 'bg-gradient-to-r from-accent/80 to-orange-400 text-white' :
                    'bg-primary/20 text-primary border border-primary/30'
                  }`}>
                    <CheckCircle size={12} />
                    {language === 'ko' ? `적합도 ${matchResult.percentage}%` : `Phù hợp ${matchResult.percentage}%`}
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 mb-3 cursor-pointer hover:bg-dark-700/30 -mx-4 px-4 py-2 rounded-xl transition-colors"
                  onClick={() => router.push(`/main/advertiser/influencers/${applicant.id}`)}
                >
                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{applicant.name}</h4>
                    <p className="text-xs text-gray-400">{applicant.platform}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>📍 {applicant.location}</span>
                      {applicant.gender && <span>• {applicant.gender === '여성' ? (language === 'ko' ? '여성' : 'Nữ') : applicant.gender === '남성' ? (language === 'ko' ? '남성' : 'Nam') : applicant.gender}</span>}
                      {applicant.age && <span>• {applicant.age} {language === 'ko' ? '세' : 'tuổi'}</span>}
                    </div>
                    {applicant.categories && applicant.categories.length > 0 && (
                      <div className="flex gap-1 mt-1.5">
                        {applicant.categories.slice(0, 2).map((cat: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-primary/15 text-primary border border-primary/20 rounded-full text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{language === 'ko' ? '지원일' : 'Ngày ứng tuyển'}: {applicant.appliedAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                    <p className="text-gray-400">{language === 'ko' ? '팔로워' : 'Người theo dõi'}</p>
                    <p className="text-white font-semibold">{(applicant.followers / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-dark-700/60 rounded-xl p-2 border border-dark-400/30">
                    <p className="text-gray-400">{language === 'ko' ? '참여율' : 'Tỷ lệ tương tác'}</p>
                    <p className="text-white font-semibold">{applicant.engagement}%</p>
                  </div>
                </div>

                {/* View Profile Button */}
                <button
                  onClick={() => router.push(`/main/advertiser/influencers/${applicant.id}`)}
                  className="w-full mb-2 bg-dark-700/60 text-gray-300 hover:text-white hover:border-primary/30 border border-dark-400/30 rounded-xl text-xs py-2.5 flex items-center justify-center gap-1 font-medium transition-all"
                >
                  <User size={14} />
                  {language === 'ko' ? '상세 프로필 보기' : 'Xem hồ sơ chi tiết'}
                </button>

                {/* Approve/Reject Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(applicant)}
                    className="flex-1 bg-success/20 text-success hover:bg-success/30 border border-success/30 rounded-xl text-xs py-2 flex items-center justify-center gap-1 font-medium transition-colors"
                  >
                    <CheckCircle size={14} />
                    {language === 'ko' ? '승인' : 'Chấp thuận'}
                  </button>
                  <button
                    onClick={() => handleReject(applicant)}
                    className="flex-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 rounded-xl text-xs py-2 flex items-center justify-center gap-1 font-medium transition-colors"
                  >
                    <X size={14} />
                    {language === 'ko' ? '거절' : 'Từ chối'}
                  </button>
                </div>

                {/* Matching Details Dropdown */}
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors">
                    {language === 'ko' ? '적합도 상세 보기' : 'Xem chi tiết độ phù hợp'}
                  </summary>
                  <div className="mt-2 pt-2 border-t border-dark-400/40 space-y-1">
                    {matchResult.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-400">{criterion.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{criterion.weight} {language === 'ko' ? '점' : 'điểm'}</span>
                          {criterion.match ? (
                            <CheckCircle size={12} className="text-success" />
                          ) : (
                            <span className="text-primary">✗</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}

      {/* Accepted Influencers Modal */}
      {showAcceptedModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowAcceptedModal(false)}>
          <div className="bg-dark-700 border border-dark-400/60 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-dark-700 border-b border-dark-400/40 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? `승인된 KOL (${acceptedInfluencers.length})` : `KOL được chấp thuận (${acceptedInfluencers.length})`}</h3>
              <button onClick={() => setShowAcceptedModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <div className="space-y-3">
              {acceptedInfluencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center gap-3 p-3 bg-dark-600/80 border border-dark-400/40 rounded-xl hover:border-primary/30 transition-colors">
                  <img src={influencer.avatar} alt={influencer.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{influencer.name}</h4>
                    <p className="text-xs text-gray-400">{influencer.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{(influencer.followers / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-gray-400">{influencer.engagement}% {language === 'ko' ? '참여율' : 'tương tác'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAcceptedModal(false);
                      router.push(`/main/advertiser/influencers/${influencer.id}`);
                    }}
                    className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {language === 'ko' ? '보기' : 'Xem'}
                  </button>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Applicants Modal */}
      {showApplicantsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowApplicantsModal(false)}>
          <div className="bg-dark-700 border border-dark-400/60 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-dark-700 border-b border-dark-400/40 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? `전체 지원자 (${acceptedInfluencers.length + pendingApplicants.length})` : `Tất cả ứng viên (${acceptedInfluencers.length + pendingApplicants.length})`}</h3>
              <button onClick={() => setShowApplicantsModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? `승인됨 (${acceptedInfluencers.length})` : `Đã chấp thuận (${acceptedInfluencers.length})`}</h4>
                <div className="space-y-2">
                  {acceptedInfluencers.map((influencer) => (
                    <div key={influencer.id} className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-xl">
                      <img src={influencer.avatar} alt={influencer.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-white">{influencer.name}</h5>
                        <p className="text-xs text-gray-400">{(influencer.followers / 1000).toFixed(1)}K · {influencer.engagement}%</p>
                      </div>
                      <span className="px-2 py-1 bg-success/20 text-success border border-success/30 text-xs rounded-full">{language === 'ko' ? '승인' : 'Chấp thuận'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? `대기 중 (${pendingApplicants.length})` : `Đang chờ (${pendingApplicants.length})`}</h4>
                <div className="space-y-2">
                  {pendingApplicants.map((applicant) => (
                    <div key={applicant.id} className="flex items-center gap-3 p-3 bg-dark-600/80 border border-dark-400/40 rounded-xl">
                      <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-white">{applicant.name}</h5>
                        <p className="text-xs text-gray-400">{(applicant.followers / 1000).toFixed(1)}K · {applicant.engagement}%</p>
                      </div>
                      <span className="px-2 py-1 bg-accent/20 text-accent border border-accent/30 text-xs rounded-full">{language === 'ko' ? '대기 중' : 'Đang chờ'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Breakdown Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowBudgetModal(false)}>
          <div className="bg-dark-700 border border-dark-400/60 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-dark-700 border-b border-dark-400/40 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '예산 배분 상세' : 'Chi tiết phân bổ ngân sách'}</h3>
              <button onClick={() => setShowBudgetModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <div className="space-y-4">
                <div className="bg-dark-600/80 border border-dark-400/40 rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">{language === 'ko' ? '총 예산' : 'Tổng ngân sách'}</span>
                    <span className="text-sm font-bold text-white">{formatPoints(mockCampaignDetail.budget)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">{language === 'ko' ? '목표 KOL 수' : 'Mục tiêu số KOL'}</span>
                    <span className="text-sm font-bold text-white">{mockCampaignDetail.targetInfluencers} KOL</span>
                  </div>
                  <div className="flex justify-between mb-2 pb-2 border-b border-dark-400/40">
                    <span className="text-sm text-gray-400">{language === 'ko' ? 'KOL당 예산' : 'Ngân sách mỗi KOL'}</span>
                    <span className="text-sm font-bold text-white">{formatPoints(mockCampaignDetail.budgetPerInfluencer)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">{language === 'ko' ? '사용됨' : 'Đã sử dụng'}</span>
                    <span className="text-sm font-bold text-success">{formatPoints(mockCampaignDetail.spent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">{language === 'ko' ? '잔여 예산' : 'Ngân sách còn lại'}</span>
                    <span className="text-sm font-bold text-secondary">{formatPoints(mockCampaignDetail.budget - mockCampaignDetail.spent)}</span>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-3">
                  <p className="text-xs text-secondary">
                    {language === 'ko'
                      ? `💡 승인된 KOL: ${acceptedInfluencers.length} × ${formatPoints(mockCampaignDetail.budgetPerInfluencer)} = ${formatPoints(acceptedInfluencers.length * mockCampaignDetail.budgetPerInfluencer)}`
                      : `💡 KOL được duyệt: ${acceptedInfluencers.length} × ${formatPoints(mockCampaignDetail.budgetPerInfluencer)} = ${formatPoints(acceptedInfluencers.length * mockCampaignDetail.budgetPerInfluencer)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewInfluencer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowReviewModal(false)}>
          <div className="bg-dark-700 border border-dark-400/60 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-dark-700 border-b border-dark-400/40 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? 'KOL 리뷰 작성' : 'Viết đánh giá KOL'}</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              {/* Influencer Info */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-dark-600/80 border border-dark-400/40 rounded-xl">
                <img src={reviewInfluencer.avatar} alt={reviewInfluencer.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold text-white">{reviewInfluencer.name}</h4>
                  <p className="text-xs text-gray-400">{reviewInfluencer.platform}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-white mb-2 block">{language === 'ko' ? '평점' : 'Điểm đánh giá'}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={star <= reviewData.rating ? 'text-accent fill-accent' : 'text-gray-600'}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-lg font-bold text-white">{reviewData.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-white mb-2 block">{language === 'ko' ? '리뷰 내용' : 'Nội dung đánh giá'}</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  placeholder={language === 'ko' ? '이 KOL과의 협력 경험을 공유해 주세요...' : 'Chia sẻ trải nghiệm hợp tác với KOL này...'}
                  rows={4}
                  className="w-full bg-dark-600/80 border border-dark-400/40 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-white mb-2 block">{language === 'ko' ? '태그 선택' : 'Chọn nhãn'}</label>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ko'
                    ? ['성실함', '소통 잘됨', '고품질', '창의적', '기한 준수', '전문적', '열정적']
                    : ['Chăm chỉ', 'Giao tiếp tốt', 'Chất lượng cao', 'Sáng tạo', 'Đúng hạn', 'Chuyên nghiệp', 'Nhiệt tình']
                  ).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (reviewData.tags.includes(tag)) {
                          setReviewData({ ...reviewData, tags: reviewData.tags.filter(t => t !== tag) });
                        } else {
                          setReviewData({ ...reviewData, tags: [...reviewData.tags, tag] });
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        reviewData.tags.includes(tag)
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                          : 'bg-dark-600/80 text-gray-300 border border-dark-400/40 hover:border-primary/30'
                      }`}
                    >
                      {reviewData.tags.includes(tag) ? '✓ ' : ''}{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Would Recommend */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewData.wouldRecommend}
                    onChange={(e) => setReviewData({ ...reviewData, wouldRecommend: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-400 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-300">{language === 'ko' ? '이 KOL을 다른 광고주에게 추천합니다' : 'Tôi giới thiệu KOL này cho nhà quảng cáo khác'}</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 bg-dark-600/80 border border-dark-400/40 rounded-xl font-semibold text-gray-300 hover:border-primary/30 transition-all"
                >
                  {language === 'ko' ? '취소' : 'Hủy'}
                </button>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  {language === 'ko' ? '평가 제출' : 'Gửi đánh giá'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="advertiser" />
    </div>
  );
}

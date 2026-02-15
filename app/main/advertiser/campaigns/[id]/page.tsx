'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, DollarSign, Users, Eye, Clock, CheckCircle, MessageCircle, X, User, Star } from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  deliveryType: 'product' as 'product' | 'service' | 'visit', // product=제품발송, service=매장방문, visit=직접방문

  requirements: {
    minFollowers: 10000,
    minEngagement: 3.0,
    platforms: ['Instagram', 'TikTok'],
    categories: ['뷰티', '라이프스타일'],
    ageRange: '20-35세',
    gender: '여성',
    // Extended requirements
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
      // Extended profile for matching
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
      // Extended profile for matching
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
      // Extended profile for matching
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
  const { t } = useLanguage();

  // State management for applicants
  const [pendingApplicants, setPendingApplicants] = useState(mockCampaignDetail.pendingApplicants);
  const [acceptedInfluencers, setAcceptedInfluencers] = useState(mockCampaignDetail.acceptedInfluencersList);

  // Modal states for stats
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewInfluencer, setReviewInfluencer] = useState<any>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    tags: [] as string[],
    wouldRecommend: true,
  });

  // Handle approve applicant
  const handleApprove = (applicant: any) => {
    // Remove from pending
    setPendingApplicants(prev => prev.filter(a => a.id !== applicant.id));

    // Add to accepted list
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

    alert(`${applicant.name}님을 승인했습니다!`);
  };

  // Handle reject applicant
  const handleReject = (applicant: any) => {
    const reason = prompt(`${applicant.name}님의 지원을 거절하는 이유를 입력하세요 (선택사항):`);

    // Remove from pending
    setPendingApplicants(prev => prev.filter(a => a.id !== applicant.id));

    alert(`${applicant.name}님의 지원을 거절했습니다.${reason ? `\n사유: ${reason}` : ''}`);
  };

  // Calculate matching percentage for an applicant
  const calculateApplicantMatch = (applicant: any) => {
    const requirements = mockCampaignDetail.requirements;
    let score = 0;
    const criteria: { name: string; match: boolean; weight: number }[] = [];

    // Followers check (25%)
    const followersMatch = applicant.followers >= requirements.minFollowers;
    criteria.push({ name: '팔로워 수', match: followersMatch, weight: 25 });
    if (followersMatch) score += 25;

    // Engagement check (20%)
    const engagementMatch = applicant.engagement >= requirements.minEngagement;
    criteria.push({ name: '참여율', match: engagementMatch, weight: 20 });
    if (engagementMatch) score += 20;

    // Platform check (15%)
    const platformMatch = requirements.platforms.includes(applicant.platform);
    criteria.push({ name: '플랫폼', match: platformMatch, weight: 15 });
    if (platformMatch) score += 15;

    // Category check (15%)
    const categoryMatch = applicant.categories?.some((c: string) =>
      requirements.categories.includes(c)
    ) ?? false;
    criteria.push({ name: '카테고리', match: categoryMatch, weight: 15 });
    if (categoryMatch) score += 15;

    // Gender check (10%)
    const genderMatch = requirements.gender === '무관' || applicant.gender === requirements.gender;
    criteria.push({ name: '성별', match: genderMatch, weight: 10 });
    if (genderMatch) score += 10;

    // Skin type check (10%)
    const skinTypeMatch = !requirements.skinType ||
      (requirements.skinType as string[]).includes(applicant.skinType);
    criteria.push({ name: '피부 타입', match: skinTypeMatch, weight: 10 });
    if (skinTypeMatch) score += 10;

    // Skin tone check (5%)
    const skinToneMatch = !requirements.skinTone ||
      (requirements.skinTone as string[]).includes(applicant.skinTone);
    criteria.push({ name: '피부 톤', match: skinToneMatch, weight: 5 });
    if (skinToneMatch) score += 5;

    return {
      percentage: Math.round(score),
      criteria,
      isGoodMatch: score >= 70,
    };
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-900 hover:text-gray-700">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">캠페인 상세</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Campaign Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">{mockCampaignDetail.title}</h2>
            <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full font-medium">
              진행중
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{mockCampaignDetail.description}</p>
        </div>

        {/* Budget Progress */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">예산 사용 현황</h3>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">사용된 예산</span>
              <span className="text-gray-900 font-semibold">
                {((mockCampaignDetail.spent / mockCampaignDetail.budget) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full"
                style={{ width: `${(mockCampaignDetail.spent / mockCampaignDetail.budget) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-900 font-semibold">
                {formatPoints(mockCampaignDetail.spent)}
              </span>
              <span className="text-gray-500">
                / {formatPoints(mockCampaignDetail.budget)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Clickable */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setShowAcceptedModal(true)}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-900 hover:shadow-md transition-all"
          >
            <Users size={24} className="text-gray-700 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {acceptedInfluencers.length}/{mockCampaignDetail.targetInfluencers}
            </div>
            <div className="text-xs text-gray-500 mt-1">승인된 인플루언서</div>
            <div className="text-xs text-gray-400 mt-1">👆 클릭하여 보기</div>
          </div>
          <div
            onClick={() => setShowApplicantsModal(true)}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-900 hover:shadow-md transition-all"
          >
            <Clock size={24} className="text-gray-700 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">{mockCampaignDetail.applicants}</div>
            <div className="text-xs text-gray-500 mt-1">총 지원자</div>
            <div className="text-xs text-gray-400 mt-1">👆 클릭하여 보기</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Eye size={24} className="text-gray-700 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">
              {(mockCampaignDetail.views / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">조회수</div>
          </div>
          <div
            onClick={() => setShowBudgetModal(true)}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-900 hover:shadow-md transition-all"
          >
            <DollarSign size={24} className="text-gray-700 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">
              {formatPoints(mockCampaignDetail.budgetPerInfluencer)}
            </div>
            <div className="text-xs text-gray-500 mt-1">인플루언서당</div>
            <div className="text-xs text-gray-400 mt-1">👆 클릭하여 보기</div>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">캠페인 정보</h3>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-600" />
            <span className="text-gray-600">기간:</span>
            <span className="text-gray-900">{mockCampaignDetail.startDate} ~ {mockCampaignDetail.endDate}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock size={16} className="text-gray-600" />
            <span className="text-gray-600">지원 마감:</span>
            <span className="text-gray-900">{mockCampaignDetail.deadline}</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">지원 요건</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">최소 팔로워:</span>
              <span className="text-gray-900">{mockCampaignDetail.requirements.minFollowers.toLocaleString()}명</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">최소 참여율:</span>
              <span className="text-gray-900">{mockCampaignDetail.requirements.minEngagement}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">플랫폼:</span>
              <span className="text-gray-900">{mockCampaignDetail.requirements.platforms.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">카테고리:</span>
              <span className="text-gray-900">{mockCampaignDetail.requirements.categories.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">제출물 요구사항</h3>
          <ul className="space-y-2">
            {mockCampaignDetail.deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accepted Influencers */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">승인된 인플루언서 ({acceptedInfluencers.length})</h3>

          {acceptedInfluencers.map((influencer) => (
            <div key={influencer.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{influencer.name}</h4>
                  <p className="text-xs text-gray-500">{influencer.platform}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  influencer.status === 'completed'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {influencer.status === 'completed' ? '완료' : '진행 중'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-600">팔로워</p>
                  <p className="text-gray-900 font-semibold">{(influencer.followers / 1000).toFixed(1)}K</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-600">참여율</p>
                  <p className="text-gray-900 font-semibold">{influencer.engagement}%</p>
                </div>
              </div>

              {/* Payment & Product Shipping */}
              {influencer.status !== 'completed' && influencer.status !== 'in_progress' && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                  {/* Payment Confirmation */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <DollarSign size={14} />
                      결제 정보
                    </h5>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">지급 금액:</span>
                        <span className="text-gray-900 font-semibold">{mockCampaignDetail.budgetPerInfluencer.toLocaleString()} VND</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`payment-${influencer.id}`}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                          onChange={(e) => {
                            if (e.target.checked) {
                              alert('결제 완료로 표시됨 (데모)');
                            }
                          }}
                        />
                        <label htmlFor={`payment-${influencer.id}`} className="text-xs text-gray-700 cursor-pointer">
                          결제 완료했습니다
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        💡 인플루언서도 "받았습니다"를 체크하면 다음 단계로 진행됩니다
                      </p>
                    </div>
                  </div>

                  {/* Delivery/Visit Information - conditional based on deliveryType */}
                  {mockCampaignDetail.deliveryType === 'product' && (
                    <div>
                      <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        제품 발송
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">택배사</label>
                          <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-gray-900 focus:outline-none">
                            <option>Viettel Post</option>
                            <option>Vietnam Post (EMS)</option>
                            <option>Giao Hàng Nhanh (GHN)</option>
                            <option>Giao Hàng Tiết Kiệm (GHTK)</option>
                            <option>J&T Express</option>
                            <option>Grab Express</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">송장번호</label>
                          <input
                            type="text"
                            placeholder="VTP123456789"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => alert('발송 정보 저장됨 (데모)')}
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-xs py-2"
                        >
                          발송 완료
                        </button>
                        <p className="text-xs text-gray-500">
                          💡 송장번호를 입력하면 인플루언서가 배송 추적을 할 수 있습니다
                        </p>
                      </div>
                    </div>
                  )}

                  {mockCampaignDetail.deliveryType === 'service' && (
                    <div>
                      <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        매장 방문 정보
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">매장 주소</label>
                          <input
                            type="text"
                            placeholder="123 Nguyen Hue, District 1, HCMC"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">영업 시간</label>
                          <input
                            type="text"
                            placeholder="월-금 10:00-20:00, 주말 10:00-22:00"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">담당자 연락처</label>
                          <input
                            type="text"
                            placeholder="+84 90 123 4567"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => alert('매장 정보 저장됨 (데모)')}
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-xs py-2"
                        >
                          정보 저장
                        </button>
                        <p className="text-xs text-gray-500">
                          💡 인플루언서가 매장을 방문하여 서비스/제품을 체험합니다
                        </p>
                      </div>
                    </div>
                  )}

                  {mockCampaignDetail.deliveryType === 'visit' && (
                    <div>
                      <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar size={14} />
                        방문 일정 조율
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">방문 날짜</label>
                          <input
                            type="date"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">방문 시간</label>
                          <input
                            type="time"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">방문 장소</label>
                          <input
                            type="text"
                            placeholder="오피스, 이벤트 장소 등"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-600">특이사항</label>
                          <textarea
                            placeholder="주차 정보, 준비물 등"
                            rows={2}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none resize-none"
                          />
                        </div>
                        <button
                          onClick={() => alert('방문 일정 저장됨 (데모)')}
                          className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-xs py-2"
                        >
                          일정 확정
                        </button>
                        <p className="text-xs text-gray-500">
                          💡 인플루언서와 일정을 조율하여 직접 만나 제품/서비스를 전달합니다
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {influencer.status === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <p className="text-gray-600">조회수</p>
                      <p className="text-gray-900 font-semibold">{influencer.views?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">좋아요</p>
                      <p className="text-gray-900 font-semibold">{influencer.likes?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setReviewInfluencer(influencer);
                      setReviewData({
                        rating: 5,
                        comment: '',
                        tags: [],
                        wouldRecommend: true,
                      });
                      setShowReviewModal(true);
                    }}
                    className="w-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg py-2 flex items-center justify-center gap-1 text-xs font-medium border border-yellow-200"
                  >
                    <Star size={14} className="fill-yellow-500" />
                    리뷰 작성하기
                  </button>
                </div>
              )}

              <button
                onClick={() => router.push(`/main/messages?userId=${influencer.id}&userName=${influencer.name}`)}
                className="w-full mt-3 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg py-2 flex items-center justify-center gap-1 text-xs"
              >
                <MessageCircle size={14} />
                메시지 보내기
              </button>

              {/* Submitted Content Review */}
              {influencer.submittedContent && influencer.submittedContent.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Eye size={16} />
                    제출된 콘텐츠 ({influencer.submittedContent.length})
                  </h4>
                  <div className="space-y-3">
                    {influencer.submittedContent.map((content: any) => (
                      <div key={content.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex gap-3 mb-2">
                          <img
                            src={content.thumbnail}
                            alt="Content thumbnail"
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 mb-1">{content.description}</p>
                            <a
                              href={content.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-700 hover:underline block truncate"
                            >
                              {content.url}
                            </a>
                            <p className="text-xs text-gray-500 mt-1">
                              제출일: {content.submittedAt}
                            </p>
                          </div>
                        </div>

                        {content.status === 'pending' ? (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => alert('콘텐츠 승인됨 (데모)')}
                              className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs py-2 flex items-center justify-center gap-1"
                            >
                              <CheckCircle size={14} />
                              승인
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('반려 사유를 입력하세요:');
                                if (reason) alert(`반려됨: ${reason} (데모)`);
                              }}
                              className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs py-2"
                            >
                              반려
                            </button>
                          </div>
                        ) : content.status === 'approved' ? (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <CheckCircle size={14} className="text-green-700" />
                            <span className="text-green-700">승인됨</span>
                            <span className="text-gray-500">({content.reviewedAt})</span>
                          </div>
                        ) : (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className="text-red-700">반려됨</span>
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
          <h3 className="text-sm font-semibold text-gray-900">대기 중인 지원자 ({pendingApplicants.length})</h3>

          {pendingApplicants.map((applicant) => {
            const matchResult = calculateApplicantMatch(applicant);

            return (
              <div key={applicant.id} className={`relative bg-white rounded-xl p-4 ${
                matchResult.isGoodMatch ? 'border-2 border-green-200' : 'border-2 border-gray-200'
              }`}>
                {/* Matching Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    matchResult.percentage >= 90 ? 'bg-green-700 text-white' :
                    matchResult.percentage >= 70 ? 'bg-gray-900 text-white' :
                    matchResult.percentage >= 50 ? 'bg-yellow-600 text-white' :
                    'bg-red-700 text-white'
                  }`}>
                    <CheckCircle size={12} />
                    매칭 {matchResult.percentage}%
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 mb-3 cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => router.push(`/main/advertiser/influencers/${applicant.id}`)}
                >
                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                    <p className="text-xs text-gray-500">{applicant.platform}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>📍 {applicant.location}</span>
                      {applicant.gender && <span>• {applicant.gender === '여성' ? '여성' : applicant.gender === '남성' ? '남성' : applicant.gender}</span>}
                      {applicant.age && <span>• {applicant.age}세</span>}
                    </div>
                    {applicant.categories && applicant.categories.length > 0 && (
                      <div className="flex gap-1 mt-1.5">
                        {applicant.categories.slice(0, 2).map((cat: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">지원일: {applicant.appliedAt}</p>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-600">팔로워</p>
                  <p className="text-gray-900 font-semibold">{(applicant.followers / 1000).toFixed(1)}K</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-600">참여율</p>
                  <p className="text-gray-900 font-semibold">{applicant.engagement}%</p>
                </div>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => router.push(`/main/advertiser/influencers/${applicant.id}`)}
                className="w-full mb-2 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg text-xs py-2.5 flex items-center justify-center gap-1 font-medium border border-gray-200"
              >
                <User size={14} />
                상세 프로필 보기
              </button>

              {/* Approve/Reject Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(applicant)}
                  className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs py-2 flex items-center justify-center gap-1 border border-green-200 font-medium"
                >
                  <CheckCircle size={14} />
                  승인
                </button>
                <button
                  onClick={() => handleReject(applicant)}
                  className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs py-2 flex items-center justify-center gap-1 border border-red-200 font-medium"
                >
                  <X size={14} />
                  거절
                </button>
              </div>

              {/* Matching Details Dropdown */}
              <details className="mt-3 text-xs">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                  매칭 세부 정보 보기
                </summary>
                <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                  {matchResult.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{criterion.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{criterion.weight}점</span>
                        {criterion.match ? (
                          <CheckCircle size={12} className="text-green-700" />
                        ) : (
                          <span className="text-red-700">✗</span>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAcceptedModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">승인된 인플루언서 ({acceptedInfluencers.length}명)</h3>
              <button onClick={() => setShowAcceptedModal(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              {acceptedInfluencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src={influencer.avatar} alt={influencer.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{influencer.name}</h4>
                    <p className="text-xs text-gray-500">{influencer.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{(influencer.followers / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-gray-500">{influencer.engagement}% 참여율</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAcceptedModal(false);
                      router.push(`/main/advertiser/influencers/${influencer.id}`);
                    }}
                    className="px-3 py-1 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800"
                  >
                    보기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Applicants Modal */}
      {showApplicantsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowApplicantsModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">전체 지원자 ({acceptedInfluencers.length + pendingApplicants.length}명)</h3>
              <button onClick={() => setShowApplicantsModal(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>

            {/* 승인된 인플루언서 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">승인됨 ({acceptedInfluencers.length}명)</h4>
              <div className="space-y-2">
                {acceptedInfluencers.map((influencer) => (
                  <div key={influencer.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <img src={influencer.avatar} alt={influencer.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-gray-900">{influencer.name}</h5>
                      <p className="text-xs text-gray-500">{(influencer.followers / 1000).toFixed(1)}K · {influencer.engagement}%</p>
                    </div>
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">승인</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 대기 중인 지원자 */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">대기 중 ({pendingApplicants.length}명)</h4>
              <div className="space-y-2">
                {pendingApplicants.map((applicant) => (
                  <div key={applicant.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-gray-900">{applicant.name}</h5>
                      <p className="text-xs text-gray-500">{(applicant.followers / 1000).toFixed(1)}K · {applicant.engagement}%</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">대기</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Breakdown Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowBudgetModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">예산 분배 상세</h3>
              <button onClick={() => setShowBudgetModal(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">총 예산</span>
                  <span className="text-sm font-bold text-gray-900">{formatPoints(mockCampaignDetail.budget)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">목표 인플루언서 수</span>
                  <span className="text-sm font-bold text-gray-900">{mockCampaignDetail.targetInfluencers}명</span>
                </div>
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">인플루언서당 예산</span>
                  <span className="text-sm font-bold text-gray-900">{formatPoints(mockCampaignDetail.budgetPerInfluencer)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">현재 사용</span>
                  <span className="text-sm font-bold text-green-700">{formatPoints(mockCampaignDetail.spent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">남은 예산</span>
                  <span className="text-sm font-bold text-blue-700">{formatPoints(mockCampaignDetail.budget - mockCampaignDetail.spent)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  💡 승인된 인플루언서 {acceptedInfluencers.length}명 × {formatPoints(mockCampaignDetail.budgetPerInfluencer)} = {formatPoints(acceptedInfluencers.length * mockCampaignDetail.budgetPerInfluencer)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewInfluencer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowReviewModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">인플루언서 리뷰 작성</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>

            {/* Influencer Info */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <img src={reviewInfluencer.avatar} alt={reviewInfluencer.name} className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-semibold text-gray-900">{reviewInfluencer.name}</h4>
                <p className="text-xs text-gray-500">{reviewInfluencer.platform}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">평점</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={star <= reviewData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                    />
                  </button>
                ))}
                <span className="ml-2 text-lg font-bold text-gray-900">{reviewData.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">리뷰 내용</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="인플루언서와의 협업 경험을 공유해주세요..."
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none resize-none"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">태그 선택</label>
              <div className="flex flex-wrap gap-2">
                {['성실함', '소통 원활', '퀄리티 우수', '창의적', '기한 준수', '전문성', '적극적'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (reviewData.tags.includes(tag)) {
                        setReviewData({ ...reviewData, tags: reviewData.tags.filter(t => t !== tag) });
                      } else {
                        setReviewData({ ...reviewData, tags: [...reviewData.tags, tag] });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      reviewData.tags.includes(tag)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-sm text-gray-700">다른 광고주에게 추천합니다</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert(`리뷰가 저장되었습니다!\n평점: ${reviewData.rating}\n태그: ${reviewData.tags.join(', ')}\n추천: ${reviewData.wouldRecommend ? '예' : '아니오'}`);
                  setShowReviewModal(false);
                }}
                className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800"
              >
                리뷰 제출
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

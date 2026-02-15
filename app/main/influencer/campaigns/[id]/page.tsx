'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, Users, Eye, Clock, CheckCircle, Upload, FileText, Share2, ExternalLink, Gift, AlertCircle, Trophy, X } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { formatPoints } from '@/lib/points';
import BottomNav from '@/components/common/BottomNav';
import ContractProtectionModal from '@/components/ContractProtectionModal';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockCampaigns } from '@/lib/mockData';

// 신청자 프로필 아바타 생성 함수 (캠페인 목록과 동일)
const vietnamNames = [
  'Nguyen Anh', 'Tran Mai', 'Le Minh', 'Pham Thu', 'Hoang Van',
  'Phan Thi', 'Vu Duc', 'Dang Hong', 'Bui Quoc', 'Do Thanh',
  'Ngo Hai', 'Duong Kim', 'Ly Lan', 'Vo Hoa', 'Truong Linh',
  'Dinh Phuong', 'Lam Chi', 'Cao Binh', 'Tong Dieu', 'Ha Yen',
  'Nguyen Linh', 'Tran Khanh', 'Le Tuan', 'Pham Nga', 'Hoang Bao',
  'Phan Quynh', 'Vu Thao', 'Dang Huong', 'Bui Long', 'Do Thuy',
];

const avatarColors = [
  'FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7',
  'DFE6E9', '6C5CE7', 'A29BFE', 'FD79A8', 'FDCB6E',
  '6C5CE7', 'E17055', '00B894', '00CEC9', '0984E3',
  'FF7675', '74B9FF', 'A29BFE', 'FD79A8', 'FDCB6E',
];

// 지원 시간 생성 (리얼하게)
const generateApplyTime = (seed: number, index: number): string => {
  const minutes = [
    '방금 전', '5분 전', '12분 전', '23분 전', '35분 전', '48분 전',
    '1시간 전', '2시간 전', '3시간 전', '5시간 전', '8시간 전',
    '12시간 전', '1일 전', '2일 전', '3일 전', '5일 전', '7일 전'
  ];
  return minutes[(seed + index) % minutes.length];
};

// 인플루언서 뱃지 생성
const generateBadge = (seed: number, index: number, followers: number): {
  type: 'verified' | 'popular' | 'rising' | 'new' | null;
  label: string;
  color: string;
} | null => {
  // 팔로워 수에 따라 뱃지 확률 조정
  const rand = (seed + index) % 100;

  if (followers > 30000) {
    if (rand < 60) return { type: 'verified', label: '인증됨', color: 'bg-blue-500' };
    if (rand < 80) return { type: 'popular', label: '인기', color: 'bg-purple-500' };
  } else if (followers > 15000) {
    if (rand < 40) return { type: 'verified', label: '인증됨', color: 'bg-blue-500' };
    if (rand < 60) return { type: 'rising', label: '급상승', color: 'bg-green-500' };
  } else if (followers < 8000) {
    if (rand < 30) return { type: 'new', label: '신규', color: 'bg-yellow-500' };
  }

  return null;
};

const generateApplicantAvatars = (campaignId: string, applicantsCount: number, showCount: number = 10) => {
  const seed = campaignId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const avatars = [];

  for (let i = 0; i < Math.min(showCount, applicantsCount); i++) {
    const nameIndex = (seed + i) % vietnamNames.length;
    const colorIndex = (seed + i) % avatarColors.length;
    const name = vietnamNames[nameIndex];
    const color = avatarColors[colorIndex];
    const followers = Math.floor(((seed + i * 7) % 40000)) + 5000; // 5K-45K followers
    const applyTime = generateApplyTime(seed, i);
    const badge = generateBadge(seed, i, followers);
    const isOnline = i < 3; // 상위 3명은 온라인

    avatars.push({
      name,
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128`,
      followers,
      applyTime,
      badge,
      isOnline,
    });
  }

  return avatars;
};

// Mock campaign detail
const mockCampaign = {
  id: '1',
  title: '신규 스킨케어 제품 리뷰 캠페인',
  company: 'Beauty Brand',
  companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
  description: '새로 출시한 프리미엄 스킨케어 라인을 체험하고 솔직한 리뷰를 공유해주세요. 제품은 무료로 제공되며, 솔직한 사용 후기를 원합니다.',
  budget: 500000,
  status: 'not_applied' as 'not_applied' | 'pending' | 'in_progress' | 'completed', // not_applied, pending, in_progress, completed
  deadline: '2024-03-15',
  startDate: '2024-02-01',
  campaignType: 'cash' as 'cash' | 'points', // 현금 지급 vs 포인트 지급

  // Marketing & UX Optimization data
  urgency: {
    remainingSlots: 3, // Only 3 slots left
    totalSlots: 10,
    recentApplications: 7, // 7 people applied recently
    hoursRemaining: 48, // 48 hours until deadline
    isTrending: true, // Trending campaign badge
  },
  difficulty: {
    level: 'easy' as 'easy' | 'medium' | 'hard',
    estimatedHours: 4, // Total time investment
    skillsRequired: ['사진 촬영', '영상 편집 기초', 'SNS 활용'],
    successRate: 85, // 85% of applicants get selected
  },
  earningsBreakdown: {
    basePayment: 500000, // VND
    bonusOpportunities: [
      { type: '조회수 보너스', condition: '10,000회 이상', amount: 100000 },
      { type: '우수 리뷰', condition: '평점 4.5+', amount: 50000 },
    ],
    productValue: 2400000, // Total value of provided products
  },
  socialProof: {
    recentReviews: [
      { name: 'Nguyen T.', rating: 5, comment: '제품도 좋고 정산도 빨라요!', hours: 2 },
      { name: 'Tran M.', rating: 5, comment: '광고주 응대가 친절합니다', hours: 5 },
    ],
    averageRating: 4.9,
    completionRate: 95, // 95% of influencers complete successfully
  },
  qualityAssurance: {
    verified: true, // Verified advertiser
    paymentGuarantee: true, // Payment guaranteed by platform
    avgResponseTime: '2시간', // Average response time
    contractProtection: true, // Legal contract protection
  },

  // 이미지 갤러리
  images: {
    mainBanner: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=600&fit=crop', // 메인 배너
    productGallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop', // 세럼
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop', // 크림
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop', // 클렌징
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&h=800&fit=crop', // 세트
    ],
    exampleContent: [
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop', caption: '언박싱 예시' },
      { url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=800&fit=crop', caption: '사용 전후 비교' },
      { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop', caption: '제품 디테일' },
    ],
    brandStory: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=1200&h=400&fit=crop',
  },

  // 타겟 인플루언서 요구사항
  requirements: {
    minFollowers: 10000,
    maxFollowers: 100000, // 마이크로 인플루언서 타겟
    minEngagement: 3.0,
    platforms: ['Instagram', 'TikTok'],
    categories: ['뷰티', '라이프스타일'],
    gender: 'female' as 'any' | 'male' | 'female',
    ageRange: '20-35',
    location: ['호치민', '하노이', '다낭'],

    // Extended requirements - Beauty campaign specific
    skinType: ['combination', 'oily'], // For beauty campaign
    skinTone: ['light', 'medium'], // Makeup shade matching

    // Example values for different campaign types (uncomment to use):
    // requiresParent: true, childAgeRange: ['1-3', '3-6'], // For baby products
    // requiresVehicle: true, vehicleTypes: ['sedan', 'suv'], // For car accessories
    // clothingSizes: { top: ['S', 'M'], bottom: ['S', 'M'] }, // For fashion
    // requiresPet: true, petTypes: ['dog', 'cat'], // For pet products
    // maritalStatus: ['married'], // For newlywed products
    // housingTypes: ['apartment', 'house'], // For home/interior
  } as any,

  // 제공 내용
  providedItems: {
    products: [
      { name: '하이드레이팅 세럼 30ml', value: '800,000 VND', quantity: 1, type: 'fullsize' },
      { name: '리페어 크림 50ml', value: '1,200,000 VND', quantity: 1, type: 'fullsize' },
      { name: '클렌징 폼 150ml', value: '400,000 VND', quantity: 1, type: 'fullsize' },
    ],
    totalValue: '2,400,000 VND',
    shipping: '무료 배송 (영업일 기준 2-3일)',
    additionalBenefits: [
      '향후 신제품 우선 체험 기회',
      '우수 리뷰 시 장기 앰배서더 제안 가능',
    ],
  },

  // 상세 미션 가이드라인
  missionGuidelines: {
    contentFormat: [
      { platform: 'Instagram', type: '피드 포스트', count: 1, requirement: '제품 사용 전/후 사진 필수' },
      { platform: 'Instagram', type: '스토리', count: '3개 이상', requirement: '제품 언박싱, 사용 과정, 최종 후기' },
      { platform: 'TikTok', type: '숏폼 영상', count: 1, requirement: '1분 이상, 자막 필수' },
    ],
    mustInclude: [
      '제품명 정확히 언급',
      '브랜드 계정 태그 @beautybrand_official',
      '해시태그: #스킨케어루틴 #뷰티리뷰 #신제품체험 #BeautyBrand',
      '솔직한 사용감 (장단점 모두)',
      '본인 피부 타입 언급',
    ],
    prohibited: [
      '다른 브랜드 제품과 비교 금지',
      '의학적 효능 과장 금지 (예: "여드름 치료", "주름 완전 제거")',
      '제품 판매/양도 금지',
      '캠페인 종료 전 게시물 삭제 금지 (최소 30일 유지)',
    ],
    toneAndManner: 'natural' as 'natural' | 'professional' | 'casual',
  },

  // 브랜드/광고주 정보
  brandInfo: {
    name: 'Beauty Brand',
    founded: '2019',
    description: '클린 뷰티를 추구하는 비건 스킨케어 브랜드. 베트남 여성의 피부를 연구하여 개발한 프리미엄 라인을 출시했습니다.',
    website: 'https://beautybrand.vn',
    instagram: '@beautybrand_official',
    previousCampaigns: 5,
    averageRating: 4.8,
    totalInfluencers: 127,
  },

  // 선정 기준
  selectionCriteria: {
    priority: [
      '팔로워 참여율 (좋아요, 댓글, 저장 비율)',
      '콘텐츠 퀄리티 (사진/영상 완성도)',
      '이전 뷰티 캠페인 경험',
      '팔로워 demographics (20-35세 여성 비율)',
    ],
    processTime: '1-2일',
    expectedApplicants: 50,
    selectedInfluencers: 10,
    selectionRate: '20%',
  },

  // FAQ
  faq: [
    {
      q: '제품은 언제 받을 수 있나요?',
      a: '캠페인 승인 후 2-3일 내 등록하신 주소로 배송됩니다. 송장 번호는 별도 안내드립니다.',
    },
    {
      q: '민감성 피부인데 괜찮을까요?',
      a: '저자극 비건 포뮬러로 민감성 피부도 사용 가능하지만, 패치 테스트 후 사용을 권장드립니다. 만약 트러블 발생 시 즉시 사용 중단하고 연락 주세요.',
    },
    {
      q: '제품 사용 기간은 얼마나 되나요?',
      a: '최소 2주 이상 사용 후 리뷰를 작성해주세요. 변화를 확인하려면 4주 사용을 권장합니다.',
    },
    {
      q: '게시물은 언제까지 유지해야 하나요?',
      a: '최소 30일 이상 유지해주셔야 하며, 조기 삭제 시 보상이 취소될 수 있습니다.',
    },
  ],

  deliverables: [
    { id: 1, title: 'Instagram 피드 포스트 1개 (사용 전/후 비교)', submitted: true },
    { id: 2, title: 'Instagram 스토리 3개 이상 (언박싱, 사용, 후기)', submitted: true },
    { id: 3, title: 'TikTok 숏폼 영상 1개 (1분 이상, 자막 포함)', submitted: false },
    { id: 4, title: '해시태그 필수: #스킨케어루틴 #뷰티리뷰 #신제품체험 #BeautyBrand', submitted: false },
    { id: 5, title: '브랜드 계정 태그: @beautybrand_official', submitted: false },
  ],

  submittedWork: [
    {
      id: 1,
      type: 'instagram_post',
      url: 'https://instagram.com/p/xxx',
      thumbnail: 'https://ui-avatars.com/api/?name=Post+1&background=4ECDC4&color=fff&size=400',
      submittedAt: '2024-02-20',
      status: 'approved',
      views: 15000,
      likes: 2300,
    },
  ],
};

// Social share bonus settings
const SHARE_BONUS_AMOUNT = 5000; // 5,000 VND per share (~$0.20)
const MAX_DAILY_SHARES = 10; // Maximum 10 campaigns per day
const SHARE_COOLDOWN_HOURS = 24; // Must wait 24h before re-sharing

interface ShareHistory {
  campaignId: string;
  sharedAt: string;
  pointsEarned: number;
  platform: 'facebook';
  postUrl: string; // Facebook post URL for verification
  status: 'pending' | 'approved' | 'rejected'; // Manual verification status
  reviewedAt?: string;
  rejectionReason?: string;
}

export default function CampaignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  // ADMIN MODE: Check if viewing in admin mode (from campaigns list)
  const isAdminMode = searchParams?.get('admin') === 'true';

  // Load campaign data to check if demo
  const allCampaigns = getMockCampaigns(language);
  const currentCampaign = allCampaigns.find(c => c.id === params?.id);
  const isDemoMode = currentCampaign?.isDemoMode || false;
  const demoApplicants = currentCampaign?.demoApplicants || [];

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    url: '',
    description: '',
  });

  // Social share states
  const [shareHistory, setShareHistory] = useState<ShareHistory[]>([]);
  const [campaignShareCount, setCampaignShareCount] = useState(0); // How many times this campaign was shared
  const [dailyShareCount, setDailyShareCount] = useState(0);
  const [totalShareEarnings, setTotalShareEarnings] = useState(0);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [shareLinkInput, setShareLinkInput] = useState('');
  const [currentCampaignShare, setCurrentCampaignShare] = useState<any>(null);

  // 정산보증/계약보호 모달 상태
  const [showPaymentGuaranteeModal, setShowPaymentGuaranteeModal] = useState(false);
  const [showContractProtectionModal, setShowContractProtectionModal] = useState(false);

  // Load share history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('exfluencer_share_history');
    if (stored) {
      const history: ShareHistory[] = JSON.parse(stored);
      setShareHistory(history);

      // Count how many times this campaign was shared (pending or approved)
      const campaignShares = history.filter(
        (h) => h.campaignId === params.id && (h.status === 'pending' || h.status === 'approved')
      );
      setCampaignShareCount(campaignShares.length);

      // Count today's shares (only approved ones) for daily limit
      const today = new Date().toDateString();
      const todayShares = history.filter(
        (h) => new Date(h.sharedAt).toDateString() === today && h.status === 'approved'
      );
      setDailyShareCount(todayShares.length);

      // Calculate total earnings (only approved shares)
      const totalEarnings = history.reduce((sum, h) => h.status === 'approved' ? sum + h.pointsEarned : sum, 0);
      setTotalShareEarnings(totalEarnings);
    }
  }, [params.id]);

  const handleApplyCampaign = () => {
    // 실제로는 API 호출
    alert(t.campaignDetail.alerts.applicationComplete);
    setShowApplyModal(false);
    // mockCampaign.status를 'pending'으로 변경 (실제로는 API에서 처리)
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.campaignDetail.alerts.workSubmitted);
    setShowUploadModal(false);
    setUploadData({ url: '', description: '' });
  };

  // Facebook share handler - share campaign content with Web Share API
  const handleFacebookShare = async () => {
    // Check daily limit only (multiple shares per campaign allowed)
    if (dailyShareCount >= MAX_DAILY_SHARES) {
      alert(t.campaignDetail.alerts.dailyLimitExceeded.replace(/\$\{MAX_DAILY_SHARES\}/g, MAX_DAILY_SHARES.toString()));
      return;
    }

    if (!currentCampaign) return;

    // Campaign URL for sharing
    const campaignUrl = `${window.location.origin}/main/influencer/campaigns/${params.id}`;

    // Prepare share content
    const shareTitle = currentCampaign.title;
    const shareText = `${currentCampaign.title}\n\n${currentCampaign.description}\n\n💰 Ngân sách: ${formatPoints(currentCampaign.budget_min)} - ${formatPoints(currentCampaign.budget_max)} VND\n📅 Hạn chót: ${new Date(currentCampaign.deadline).toLocaleDateString('vi-VN')}\n\n`;

    // Try Web Share API first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: campaignUrl,
        });

        // After successful share, show modal to submit Facebook post link
        setTimeout(() => {
          setShowShareLinkModal(true);
        }, 500);
      } catch (err: any) {
        // User cancelled or error occurred
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
          // Fallback to Facebook share dialog
          openFacebookShareDialog(campaignUrl, shareTitle, shareText);
        }
      }
    } else {
      // Fallback: Open Facebook share dialog
      openFacebookShareDialog(campaignUrl, shareTitle, shareText);
    }
  };

  // Open Facebook share dialog (fallback for desktop)
  const openFacebookShareDialog = (url: string, title: string, text: string) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + '\n\n' + text)}`;

    // Open in new window
    const shareWindow = window.open(facebookShareUrl, '_blank', 'width=600,height=400');

    // After user shares, show modal to input the post link
    if (shareWindow) {
      setTimeout(() => {
        setShowShareLinkModal(true);
      }, 2000);
    }
  };

  // Validate Facebook post URL
  const validateFacebookUrl = (url: string): boolean => {
    // Check if URL contains facebook.com
    if (!url.includes('facebook.com')) {
      return false;
    }

    // Valid patterns:
    // https://www.facebook.com/groups/123456/posts/789012/
    // https://www.facebook.com/permalink.php?story_fbid=123456&id=789012
    // https://facebook.com/user/posts/123456
    const patterns = [
      /facebook\.com\/groups\/[\w-]+\/posts\/[\w-]+/,
      /facebook\.com\/permalink\.php\?story_fbid=/,
      /facebook\.com\/[\w.-]+\/posts\/[\w-]+/,
    ];

    return patterns.some(pattern => pattern.test(url));
  };

  // Submit share link
  const handleSubmitShareLink = () => {
    if (!shareLinkInput.trim()) {
      alert(t.campaignDetail.alerts.pleaseEnterLink);
      return;
    }

    if (!validateFacebookUrl(shareLinkInput)) {
      alert(t.campaignDetail.alerts.invalidFacebookLink);
      return;
    }

    // Check if this exact URL was already submitted
    const duplicateUrl = shareHistory.find(
      (h) => h.postUrl.trim() === shareLinkInput.trim() && (h.status === 'pending' || h.status === 'approved')
    );

    if (duplicateUrl) {
      alert(t.campaignDetail.alerts.duplicateLink);
      return;
    }

    // Record share with pending status
    const newShare: ShareHistory = {
      campaignId: params.id as string,
      sharedAt: new Date().toISOString(),
      pointsEarned: SHARE_BONUS_AMOUNT,
      platform: 'facebook',
      postUrl: shareLinkInput.trim(),
      status: 'pending',
    };

    const updatedHistory = [...shareHistory, newShare];
    setShareHistory(updatedHistory);
    localStorage.setItem('exfluencer_share_history', JSON.stringify(updatedHistory));

    // Show success message
    alert(
      t.campaignDetail.alerts.shareLinkSubmitted.replace('${formatPoints(SHARE_BONUS_AMOUNT)}', formatPoints(SHARE_BONUS_AMOUNT))
    );

    // TODO: Send to server API for admin review
    // await fetch('/api/share/submit', {
    //   method: 'POST',
    //   body: JSON.stringify(newShare)
    // });

    // Reset modal
    setShowShareLinkModal(false);
    setShareLinkInput('');
  };

  // Mock user profile for matching calculation
  const mockUserProfile = {
    followers: 15000,
    engagementRate: 4.5,
    platforms: ['Instagram', 'TikTok'],
    categories: ['뷰티', '라이프스타일'],
    location: '호치민',
    gender: 'female' as const,
    age: 28,
    skinType: 'combination' as const,
    skinTone: 'light' as const,
    hasVehicle: false,
    hasChildren: false,
    hasPets: false,
    maritalStatus: 'single' as const,
  };

  // Calculate matching percentage
  const calculateMatchingPercentage = () => {
    const criteria: { name: string; match: boolean; weight: number }[] = [
      {
        name: '팔로워 수',
        match: mockUserProfile.followers >= mockCampaign.requirements.minFollowers &&
               mockUserProfile.followers <= (mockCampaign.requirements.maxFollowers || Infinity),
        weight: 20,
      },
      {
        name: '참여율',
        match: mockUserProfile.engagementRate >= mockCampaign.requirements.minEngagement,
        weight: 20,
      },
      {
        name: '플랫폼',
        match: mockCampaign.requirements.platforms.some((p: string) =>
          mockUserProfile.platforms.includes(p)
        ),
        weight: 15,
      },
      {
        name: '카테고리',
        match: mockCampaign.requirements.categories.some((c: string) =>
          mockUserProfile.categories.includes(c)
        ),
        weight: 15,
      },
      {
        name: '지역',
        match: mockCampaign.requirements.location.some((l: string) =>
          mockUserProfile.location.includes(l)
        ),
        weight: 10,
      },
      {
        name: '성별',
        match: mockCampaign.requirements.gender === 'any' ||
               mockCampaign.requirements.gender === mockUserProfile.gender,
        weight: 5,
      },
      {
        name: '피부 타입',
        match: !mockCampaign.requirements.skinType ||
               mockCampaign.requirements.skinType.includes(mockUserProfile.skinType),
        weight: 10,
      },
      {
        name: '피부 톤',
        match: !mockCampaign.requirements.skinTone ||
               mockCampaign.requirements.skinTone.includes(mockUserProfile.skinTone),
        weight: 5,
      },
    ];

    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    const matchedWeight = criteria.reduce((sum, c) => c.match ? sum + c.weight : sum, 0);
    const percentage = Math.round((matchedWeight / totalWeight) * 100);

    return {
      percentage,
      criteria: criteria.map(c => ({ ...c, match: c.match })),
      isEligible: percentage >= 70, // 70% 이상 매칭 시 지원 가능
    };
  };

  const matchingResult = calculateMatchingPercentage();

  const completedCount = mockCampaign.deliverables.filter(d => d.submitted).length;
  const progress = (completedCount / mockCampaign.deliverables.length) * 100;

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.campaignDetail.title}</h1>
        </div>
      </div>

      {/* ADMIN ONLY: Demo Campaign Info Panel */}
      {isAdminMode && isDemoMode && (
        <div className="sticky top-[72px] z-10 bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-md border-b-2 border-pink-500 shadow-2xl">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-2xl">🎭</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-black text-lg flex items-center gap-2">
                  DEMO CAMPAIGN
                  <span className="px-2 py-0.5 bg-pink-500 text-white text-[10px] rounded-full">ADMIN ONLY</span>
                </h3>
                <p className="text-pink-200 text-xs">This is a fake campaign for platform bootstrapping - Only you can see this</p>
              </div>
            </div>

            {/* Demo Applicants */}
            {demoApplicants.length > 0 && (
              <div className="mt-4 p-3 bg-black/30 rounded-xl border border-pink-500/30">
                <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                  <Users size={14} />
                  Fake Applicants ({demoApplicants.length})
                </h4>
                <div className="space-y-2">
                  {demoApplicants.map((applicant, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-semibold">{applicant.name}</div>
                          <div className="text-pink-300 text-xs">{applicant.followers.toLocaleString()} followers</div>
                        </div>
                      </div>
                      {applicant.selected && (
                        <div className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold flex items-center gap-1">
                          <CheckCircle size={12} />
                          SELECTED
                        </div>
                      )}
                      {!applicant.selected && (
                        <div className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                          Not selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2 text-xs text-pink-200">
              <AlertCircle size={14} />
              <span>Regular users see this as a real campaign with {mockCampaign.urgency.recentApplications} applicants</span>
            </div>
          </div>
        </div>
      )}

      <div className="container-mobile space-y-6 py-6">
        {/* 메인 배너 이미지 */}
        <div className="card p-0 overflow-hidden">
          <img
            src={mockCampaign.images.mainBanner}
            alt={mockCampaign.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Urgency & Social Proof Banner */}
        {mockCampaign.urgency && (
          <div className="card bg-gradient-to-r from-error/20 via-warning/20 to-error/20 border-2 border-error/50 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.campaignDetail.urgency.hotCampaign || '인기 급상승 캠페인'}</h3>
                  <p className="text-xs text-gray-300">{t.campaignDetail.urgency.recentApps || `${mockCampaign.urgency.recentApplications}명이 최근 지원했습니다`}</p>
                </div>
              </div>
              {mockCampaign.urgency.isTrending && (
                <span className="px-3 py-1 bg-gradient-to-r from-accent to-secondary text-white text-xs font-bold rounded-full">
                  {t.campaignDetail.urgency.trending || 'TRENDING'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-600 rounded-lg p-3 border-2 border-warning/50">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-warning" />
                  <p className="text-xs text-gray-400">{t.campaignDetail.urgency.slotsRemaining || '남은 자리'}</p>
                </div>
                <p className="text-2xl font-bold text-warning">{mockCampaign.urgency.remainingSlots}/{mockCampaign.urgency.totalSlots}</p>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 border-2 border-error/50">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-error" />
                  <p className="text-xs text-gray-400">{t.campaignDetail.urgency.timeLeft || '마감까지'}</p>
                </div>
                <p className="text-2xl font-bold text-error">{mockCampaign.urgency.hoursRemaining}{t.campaignDetail.urgency.hours || '시간'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 최근 지원자 프로필 섹션 (신뢰도 향상) */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-white">최근 지원자</h3>
            </div>
            <span className="text-sm text-gray-400">
              총 <span className="text-primary font-bold">{mockCampaign.urgency.recentApplications}</span>명
            </span>
          </div>

          {/* 지원자 아바타 그리드 (개선!) */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {generateApplicantAvatars(params?.id as string || '1', mockCampaign.urgency.recentApplications, 10).map((avatar, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-14 h-14 rounded-full border-2 border-primary/30 group-hover:border-primary transition-all group-hover:scale-125 shadow-lg"
                  />
                  {/* 온라인 상태 표시 */}
                  {avatar.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-dark-700 animate-pulse"></div>
                  )}
                  {/* 뱃지 */}
                  {avatar.badge && (
                    <div className={`absolute -top-1 -right-1 ${avatar.badge.color} text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-lg`}>
                      {avatar.badge.type === 'verified' && '✓'}
                      {avatar.badge.type === 'popular' && '⭐'}
                      {avatar.badge.type === 'rising' && '🔥'}
                      {avatar.badge.type === 'new' && '✨'}
                    </div>
                  )}
                  {/* 신규 지원자 반짝임 효과 */}
                  {idx < 2 && (
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping"></div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-white font-semibold truncate w-full">
                    {avatar.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-gray-500">
                    {(avatar.followers / 1000).toFixed(1)}K
                  </div>
                  {/* 지원 시간 표시 */}
                  <div className="text-[8px] text-gray-600">
                    {avatar.applyTime}
                  </div>
                  {/* 뱃지 라벨 */}
                  {avatar.badge && (
                    <div className={`text-[8px] ${avatar.badge.color.replace('bg-', 'text-')} font-bold mt-0.5`}>
                      {avatar.badge.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 더 많은 지원자 표시 */}
          {mockCampaign.urgency.recentApplications > 10 && (
            <div className="flex items-center justify-center gap-2 p-3 bg-dark-600 rounded-lg border border-dark-500">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-dark-600 flex items-center justify-center"
                  >
                    <Users size={12} className="text-gray-400" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-300">
                그 외 <span className="text-primary font-bold">+{mockCampaign.urgency.recentApplications - 10}명</span>이 지원했습니다
              </span>
            </div>
          )}

          {/* 경쟁률 표시 */}
          <div className="mt-4 p-3 bg-gradient-to-r from-warning/10 to-error/10 border border-warning/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-warning" />
                <span className="text-sm text-white font-semibold">현재 경쟁률</span>
              </div>
              <span className="text-lg font-black text-warning">
                {Math.round(mockCampaign.urgency.recentApplications / mockCampaign.urgency.totalSlots)}:1
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              💡 {mockCampaign.urgency.totalSlots}명 선발 예정, 빠르게 지원하세요!
            </div>
          </div>
        </div>

        {/* Campaign Header */}
        <div className="card">
          <div className="flex items-start gap-4 mb-3">
            <img
              src={mockCampaign.companyLogo}
              alt={mockCampaign.company}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{mockCampaign.title}</h2>
                {mockCampaign.qualityAssurance?.verified && (
                  <span className="text-primary" title={t.campaignDetail.quality.verified || '인증된 광고주'}>
                    <CheckCircle size={18} />
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{mockCampaign.company}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                mockCampaign.status === 'completed' ? 'bg-success/20 text-success' :
                mockCampaign.status === 'in_progress' ? 'bg-warning/20 text-warning' :
                'bg-info/20 text-info'
              }`}>
                {mockCampaign.status === 'completed' ? t.dashboard.completedCampaigns.replace(' 캠페인', '').replace('Chiến dịch ', '') :
                 mockCampaign.status === 'in_progress' ? t.dashboard.inProgress : t.wallet.pending}
              </span>
              <button
                onClick={handleFacebookShare}
                className="btn btn-ghost text-xs px-3 py-1 flex items-center gap-1 whitespace-nowrap"
                title={t.campaignDetail.shareDescription}
              >
                <Share2 size={14} />
                {t.referral.shareLink.split(' ').pop()}
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{mockCampaign.description}</p>

          {/* Quality Assurance Badges (클릭 가능!) */}
          {mockCampaign.qualityAssurance && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockCampaign.qualityAssurance.paymentGuarantee && (
                <button
                  onClick={() => setShowPaymentGuaranteeModal(true)}
                  className="flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <DollarSign size={14} className="text-blue-400" />
                  <span className="text-blue-400 font-semibold flex-1 text-left">결제 안내</span>
                  <span className="text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">ℹ️</span>
                </button>
              )}
              {mockCampaign.qualityAssurance.contractProtection && (
                <button
                  onClick={() => setShowContractProtectionModal(true)}
                  className="flex items-center gap-2 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CheckCircle size={14} className="text-primary" />
                  <span className="text-primary font-semibold flex-1 text-left">{t.campaignDetail.quality.contractProtection || '계약 보호'}</span>
                  <span className="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">ℹ️</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Reward */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t.campaignDetail.expectedEarnings}</p>
              <p className="text-2xl font-bold text-accent">{formatPoints(mockCampaign.budget)}</p>
            </div>
            <DollarSign size={40} className="text-accent/50" />
          </div>
        </div>

        {/* Difficulty & Time Estimator */}
        {mockCampaign.difficulty && (
          <div className="card bg-gradient-to-br from-info/10 to-primary/10 border-info/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚡</span>
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.difficulty.title || '난이도 & 소요시간'}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.difficulty.difficultyLevel || '난이도'}</p>
                <div className={`text-lg font-bold ${
                  mockCampaign.difficulty.level === 'easy' ? 'text-success' :
                  mockCampaign.difficulty.level === 'medium' ? 'text-warning' : 'text-error'
                }`}>
                  {mockCampaign.difficulty.level === 'easy' ? (t.campaignDetail.difficulty.easy || '쉬움') :
                   mockCampaign.difficulty.level === 'medium' ? (t.campaignDetail.difficulty.medium || '보통') :
                   (t.campaignDetail.difficulty.hard || '어려움')}
                </div>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.difficulty.timeRequired || '소요시간'}</p>
                <div className="text-lg font-bold text-primary">
                  {mockCampaign.difficulty.estimatedHours}{t.campaignDetail.difficulty.hoursUnit || '시간'}
                </div>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.difficulty.successRate || '선정률'}</p>
                <div className="text-lg font-bold text-success">
                  {mockCampaign.difficulty.successRate}%
                </div>
              </div>
            </div>

            <div className="bg-dark-600 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-white mb-2">{t.campaignDetail.difficulty.skillsNeeded || '필요 스킬'}</h4>
              <div className="flex flex-wrap gap-2">
                {mockCampaign.difficulty.skillsRequired.map((skill: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 bg-info/20 text-info text-xs rounded-full border border-info/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Earnings Breakdown Calculator */}
        {mockCampaign.earningsBreakdown && (
          <div className="card bg-gradient-to-br from-success/10 to-accent/10 border-success/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💰</span>
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.earnings.title || '수익 계산기'}</h3>
            </div>

            <div className="space-y-3">
              {/* Base Payment */}
              <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-white">{t.campaignDetail.earnings.basePayment || '기본 페이'}</span>
                </div>
                <span className="text-lg font-bold text-success">{formatPoints(mockCampaign.earningsBreakdown.basePayment)}</span>
              </div>

              {/* Product Value */}
              <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-primary" />
                  <span className="text-sm text-white">{t.campaignDetail.earnings.productValue || '제공 제품 가치'}</span>
                </div>
                <span className="text-lg font-bold text-primary">{formatPoints(mockCampaign.earningsBreakdown.productValue)}</span>
              </div>

              {/* Bonus Opportunities */}
              {mockCampaign.earningsBreakdown.bonusOpportunities.length > 0 && (
                <div className="bg-gradient-to-r from-accent/10 to-warning/10 border border-accent/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <span>🎁</span>
                    {t.campaignDetail.earnings.bonusOpportunities || '보너스 기회'}
                  </h4>
                  <div className="space-y-2">
                    {mockCampaign.earningsBreakdown.bonusOpportunities.map((bonus: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div>
                          <p className="text-white font-semibold">{bonus.type}</p>
                          <p className="text-gray-400">{bonus.condition}</p>
                        </div>
                        <span className="text-accent font-bold">+{formatPoints(bonus.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Potential */}
              <div className="bg-gradient-to-r from-accent to-secondary rounded-lg p-4 text-center">
                <p className="text-xs text-white/80 mb-1">{t.campaignDetail.earnings.maxPotential || '최대 예상 수익'}</p>
                <p className="text-3xl font-bold text-white">
                  {formatPoints(
                    mockCampaign.earningsBreakdown.basePayment +
                    mockCampaign.earningsBreakdown.productValue +
                    mockCampaign.earningsBreakdown.bonusOpportunities.reduce((sum: number, b: any) => sum + b.amount, 0)
                  )}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  ({t.campaignDetail.earnings.cashAndProducts || '현금 + 제품 포함'})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Social Proof & Reviews */}
        {mockCampaign.socialProof && (
          <div className="card bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⭐</span>
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.socialProof.title || '인플루언서 후기'}</h3>
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                {mockCampaign.socialProof.averageRating}/5.0
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.socialProof.completionRate || '캠페인 완료율'}</p>
                <p className="text-2xl font-bold text-success">{mockCampaign.socialProof.completionRate}%</p>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.socialProof.avgResponseTime || '평균 응답시간'}</p>
                <p className="text-lg font-bold text-primary">{mockCampaign.qualityAssurance?.avgResponseTime || '2시간'}</p>
              </div>
            </div>

            {/* Recent Reviews */}
            {mockCampaign.socialProof.recentReviews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">{t.campaignDetail.socialProof.recentReviews || '최근 리뷰'}</h4>
                {mockCampaign.socialProof.recentReviews.map((review: any, idx: number) => (
                  <div key={idx} className="bg-dark-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-accent text-xs">★</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.hours}{t.campaignDetail.socialProof.hoursAgo || '시간 전'}</span>
                    </div>
                    <p className="text-sm text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Apply Button - Only show when not applied */}
        {mockCampaign.status === 'not_applied' && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="btn btn-primary w-full py-4 text-lg font-bold"
          >
            {t.campaignDetail.applyNow.replace('🎯 ', '')}
          </button>
        )}

        {/* 매칭률 표시 */}
        <div className={`card ${
          matchingResult.percentage >= 90 ? 'border-2 border-success' :
          matchingResult.percentage >= 70 ? 'border-2 border-primary' :
          matchingResult.percentage >= 50 ? 'border-2 border-warning' :
          'border-2 border-error'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={20} className={
                matchingResult.percentage >= 90 ? 'text-success' :
                matchingResult.percentage >= 70 ? 'text-primary' :
                matchingResult.percentage >= 50 ? 'text-warning' :
                'text-error'
              } />
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.matchingRate}</h3>
            </div>
            <div className={`text-3xl font-bold ${
              matchingResult.percentage >= 90 ? 'text-success' :
              matchingResult.percentage >= 70 ? 'text-primary' :
              matchingResult.percentage >= 50 ? 'text-warning' :
              'text-error'
            }`}>
              {matchingResult.percentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-600 rounded-full h-3 mb-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                matchingResult.percentage >= 90 ? 'bg-success' :
                matchingResult.percentage >= 70 ? 'bg-primary' :
                matchingResult.percentage >= 50 ? 'bg-warning' :
                'bg-error'
              }`}
              style={{ width: `${matchingResult.percentage}%` }}
            ></div>
          </div>

          {/* Status Message */}
          <div className={`text-sm mb-3 p-3 rounded-lg ${
            matchingResult.isEligible
              ? 'bg-success/10 text-success border border-success/30'
              : 'bg-error/10 text-error border border-error/30'
          }`}>
            {matchingResult.isEligible
              ? t.campaignDetail.eligible
              : t.campaignDetail.notEligible}
          </div>

          {/* Detailed Breakdown */}
          <details className="text-xs">
            <summary className="cursor-pointer text-gray-400 hover:text-white transition-colors mb-2">
              📊 {t.campaignDetail.viewDetails}
            </summary>
            <div className="space-y-1.5 mt-2 pt-2 border-t border-dark-500">
              {matchingResult.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400">{criterion.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">{criterion.weight}점</span>
                    {criterion.match ? (
                      <CheckCircle size={14} className="text-success" />
                    ) : (
                      <AlertCircle size={14} className="text-error" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* 지원 자격 요구사항 */}
        <div className="card border-2 border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-primary" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.requirements}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-600 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.minFollowers}</p>
              <p className="text-lg font-bold text-white">{mockCampaign.requirements.minFollowers.toLocaleString()}</p>
            </div>
            <div className="bg-dark-600 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">{t.campaignDetail.minEngagement}</p>
              <p className="text-lg font-bold text-white">{mockCampaign.requirements.minEngagement}%</p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">📱</span>
              <div>
                <span className="text-gray-400">{t.campaignDetail.platform} </span>
                <span className="text-white font-semibold">{mockCampaign.requirements.platforms.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">🎯</span>
              <div>
                <span className="text-gray-400">{t.campaignDetail.category} </span>
                <span className="text-white font-semibold">{mockCampaign.requirements.categories.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">👤</span>
              <div>
                <span className="text-gray-400">{t.campaignDetail.target} </span>
                <span className="text-white font-semibold">
                  {mockCampaign.requirements.gender === 'female' ? t.profile.female : mockCampaign.requirements.gender === 'male' ? t.profile.male : t.profile.any}, {mockCampaign.requirements.ageRange}{t.profile.years}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">📍</span>
              <div>
                <span className="text-gray-400">{t.campaignDetail.location} </span>
                <span className="text-white font-semibold">{mockCampaign.requirements.location.join(', ')}</span>
              </div>
            </div>

            {/* Beauty-specific requirements */}
            {mockCampaign.requirements.skinType && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✨</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.skinType} </span>
                  <span className="text-white font-semibold">
                    {mockCampaign.requirements.skinType.map((type: string) => ({
                      dry: t.profile.drySkin,
                      oily: t.profile.oilySkin,
                      combination: t.profile.combinationSkin,
                      sensitive: t.profile.sensitiveSkin,
                      normal: t.profile.normalSkin
                    }[type])).join(', ')}
                  </span>
                </div>
              </div>
            )}

            {mockCampaign.requirements.skinTone && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🎨</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.skinTone} </span>
                  <span className="text-white font-semibold">
                    {mockCampaign.requirements.skinTone.map((tone: string) => ({
                      fair: t.profile.veryFair,
                      light: t.profile.fair,
                      medium: t.profile.medium,
                      tan: t.profile.tan,
                      dark: t.profile.dark
                    }[tone])).join(', ')}
                  </span>
                </div>
              </div>
            )}

            {/* Parenting requirements */}
            {mockCampaign.requirements.requiresParent && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">👶</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.childRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasChildren}
                    {mockCampaign.requirements.childAgeRange && Array.isArray(mockCampaign.requirements.childAgeRange) && mockCampaign.requirements.childAgeRange.length > 0 && (
                      <span className="text-gray-300"> ({(mockCampaign.requirements.childAgeRange as any[]).map((age: string) => ({
                        '0-1': '0-1세',
                        '1-3': '1-3세',
                        '3-6': '3-6세',
                        '6-12': '6-12세',
                        '12-18': '12-18세'
                      }[age])).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Vehicle requirement */}
            {mockCampaign.requirements.requiresVehicle && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🚗</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.vehicleRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasVehicle}
                    {mockCampaign.requirements.vehicleTypes && mockCampaign.requirements.vehicleTypes.length > 0 && (
                      <span className="text-gray-300"> ({mockCampaign.requirements.vehicleTypes.map((v: string) => ({
                        sedan: '세단',
                        suv: 'SUV',
                        truck: '트럭',
                        electric: '전기차',
                        hybrid: '하이브리드',
                        motorcycle: '오토바이',
                        scooter: '스쿠터'
                      }[v])).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Fashion sizes requirement */}
            {mockCampaign.requirements.clothingSizes && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">👕</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.clothingSize} </span>
                  <span className="text-white font-semibold">
                    {mockCampaign.requirements.clothingSizes.top && mockCampaign.requirements.clothingSizes.top.length > 0 && (
                      <span>{t.campaignDetail.topSize} {mockCampaign.requirements.clothingSizes.top.join(', ')}</span>
                    )}
                    {mockCampaign.requirements.clothingSizes.bottom && mockCampaign.requirements.clothingSizes.bottom.length > 0 && (
                      <span> / {t.campaignDetail.bottomSize} {mockCampaign.requirements.clothingSizes.bottom.join(', ')}</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Pet requirement */}
            {mockCampaign.requirements.requiresPet && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🐾</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.petRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasPets}
                    {mockCampaign.requirements.petTypes && mockCampaign.requirements.petTypes.length > 0 && (
                      <span className="text-gray-300"> ({mockCampaign.requirements.petTypes.map((p: string) => ({
                        dog: '강아지',
                        cat: '고양이',
                        bird: '새',
                        fish: '물고기',
                        other: '기타'
                      }[p])).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Marital status requirement */}
            {mockCampaign.requirements.maritalStatus && mockCampaign.requirements.maritalStatus.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">💑</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.maritalStatus} </span>
                  <span className="text-white font-semibold">
                    {mockCampaign.requirements.maritalStatus.map((status: string) => ({
                      single: t.profile.single,
                      married: t.profile.married,
                      divorced: t.profile.divorced,
                      widowed: t.profile.widowed
                    }[status])).join(', ')}
                  </span>
                </div>
              </div>
            )}

            {/* Housing type requirement */}
            {mockCampaign.requirements.housingTypes && mockCampaign.requirements.housingTypes.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🏠</span>
                <div>
                  <span className="text-gray-400">{t.campaignDetail.housingType} </span>
                  <span className="text-white font-semibold">
                    {mockCampaign.requirements.housingTypes.map((h: string) => ({
                      apartment: t.profile.apartment,
                      house: t.profile.house,
                      villa: t.profile.villa,
                      studio: t.profile.studio,
                      shared: t.profile.sharedHouse,
                      dormitory: t.profile.dormitory
                    }[h])).join(', ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 제공 내용 */}
        <div className="card bg-gradient-to-br from-success/10 to-success/5 border-success/30">
          <div className="flex items-center gap-2 mb-4">
            <Gift size={20} className="text-success" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.benefits}</h3>
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-dark-600 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.providedProducts}</h4>
              {mockCampaign.providedItems.products.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-dark-500 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold">
                      {product.quantity}
                    </span>
                    <div>
                      <p className="text-sm text-white font-medium">{product.name}</p>
                      <p className="text-xs text-gray-400">
                        {product.type === 'fullsize' ? t.campaignDetail.fullsize : t.campaignDetail.sample}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-success font-semibold">{product.value}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-dark-500 flex items-center justify-between">
                <span className="text-sm font-bold text-white">{t.campaignDetail.totalValue}</span>
                <span className="text-lg font-bold text-success">{mockCampaign.providedItems.totalValue}</span>
              </div>
            </div>

            <div className="bg-dark-600 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-info" />
                <h4 className="text-sm font-semibold text-white">{t.campaignDetail.shippingInfo}</h4>
              </div>
              <p className="text-sm text-gray-300">{mockCampaign.providedItems.shipping}</p>
            </div>

            {mockCampaign.providedItems.additionalBenefits.length > 0 && (
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎁</span>
                  <h4 className="text-sm font-semibold text-white">{t.campaignDetail.additionalBenefits}</h4>
                </div>
                <ul className="space-y-1">
                  {mockCampaign.providedItems.additionalBenefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 제품 갤러리 */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📸</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.productGallery || '제품 갤러리'}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockCampaign.images.productGallery.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Product ${idx + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* 콘텐츠 제작 예시 */}
        <div className="card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.contentExamples || '콘텐츠 제작 예시'}</h3>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            {t.campaignDetail.contentExamplesDesc || '이런 스타일로 콘텐츠를 제작해주세요! 참고용 예시입니다.'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {mockCampaign.images.exampleContent.map((example, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={example.url}
                  alt={example.caption}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold px-2 text-center">{example.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상세 미션 가이드라인 */}
        <div className="card border-2 border-warning/30">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-warning" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.missionGuide}</h3>
          </div>

          {/* 콘텐츠 형식 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.contentFormat}</h4>
            <div className="space-y-2">
              {mockCampaign.missionGuidelines.contentFormat.map((format, idx) => (
                <div key={idx} className="bg-dark-600 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">
                      {format.platform} - {format.type}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold">
                      {format.count}개
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{format.requirement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 필수 포함 사항 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              {t.campaignDetail.mustInclude}
            </h4>
            <ul className="space-y-2">
              {mockCampaign.missionGuidelines.mustInclude.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm bg-success/5 rounded-lg p-2 border border-success/20">
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 금지 사항 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-error" />
              {t.campaignDetail.prohibited}
            </h4>
            <ul className="space-y-2">
              {mockCampaign.missionGuidelines.prohibited.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm bg-error/5 rounded-lg p-2 border border-error/20">
                  <span className="text-error flex-shrink-0 mt-0.5">✗</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 브랜드 정보 */}
        <div className="card bg-gradient-to-br from-info/10 to-info/5 border-info/30">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={mockCampaign.companyLogo}
              alt={mockCampaign.brandInfo.name}
              className="w-16 h-16 rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{mockCampaign.brandInfo.name}</h3>
              <p className="text-xs text-gray-400">{t.campaignDetail.founded} {mockCampaign.brandInfo.founded}</p>
            </div>
          </div>

          {/* 브랜드 스토리 이미지 */}
          <img
            src={mockCampaign.images.brandStory}
            alt="Brand Story"
            className="w-full h-32 object-cover rounded-lg mb-4"
          />

          <p className="text-sm text-gray-300 leading-relaxed mb-4">{mockCampaign.brandInfo.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-primary">{mockCampaign.brandInfo.previousCampaigns}</div>
              <div className="text-xs text-gray-400">{t.campaignDetail.previousCampaigns}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-accent">{mockCampaign.brandInfo.averageRating}</div>
              <div className="text-xs text-gray-400">{t.campaignDetail.averageRating}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-success">{mockCampaign.brandInfo.totalInfluencers}</div>
              <div className="text-xs text-gray-400">{t.campaignDetail.collaboratedInfluencers}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={mockCampaign.brandInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn btn-ghost text-sm"
            >
              <ExternalLink size={14} className="mr-1" />
              {t.campaignDetail.website}
            </a>
            <a
              href={`https://instagram.com/${mockCampaign.brandInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn btn-ghost text-sm"
            >
              📷 Instagram
            </a>
          </div>
        </div>

        {/* 선정 기준 */}
        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-secondary" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.selectionCriteria}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">{t.campaignDetail.expectedApplicants}</div>
              <div className="text-lg font-bold text-white">{mockCampaign.selectionCriteria.expectedApplicants}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">{t.campaignDetail.selectedInfluencers}</div>
              <div className="text-lg font-bold text-primary">{mockCampaign.selectionCriteria.selectedInfluencers}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-400 mb-1">{t.campaignDetail.expectedCompetition}</div>
              <div className="text-lg font-bold text-accent">{mockCampaign.selectionCriteria.selectionRate}</div>
            </div>
          </div>

          <div className="bg-dark-600 rounded-lg p-3 mb-3">
            <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.priorityCriteria}</h4>
            <ol className="space-y-2">
              {mockCampaign.selectionCriteria.priority.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-3">
            <p className="text-xs text-gray-300 text-center">
              ⏱️ <strong className="text-white">{t.campaignDetail.avgReviewTime.split(':')[0]}</strong>: {mockCampaign.selectionCriteria.processTime}
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💬</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.faq}</h3>
          </div>

          <div className="space-y-3">
            {mockCampaign.faq.map((item, idx) => (
              <details key={idx} className="bg-dark-600 rounded-lg">
                <summary className="p-3 cursor-pointer text-sm font-semibold text-white hover:bg-dark-500 rounded-lg transition-colors">
                  Q. {item.q}
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-sm text-gray-300 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Pending Status */}
        {mockCampaign.status === 'pending' && (
          <div className="card bg-gradient-to-r from-warning/20 to-warning/5 border-warning/30">
            <div className="text-center py-4">
              <Clock size={40} className="text-warning mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">{t.campaignDetail.pendingApproval}</h3>
              <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: t.campaignDetail.pendingApprovalDesc.replace('\n', '<br />') }} />
            </div>
          </div>
        )}

        {/* Social Share Bonus Section */}
        <div className={`card ${campaignShareCount > 0 ? 'bg-success/10 border-success/30' : 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30'}`}>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
              {campaignShareCount > 0 ? (
                <CheckCircle size={24} className="text-white" />
              ) : (
                <Share2 size={24} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                {t.campaignDetail.shareAndEarnBonus}
                <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                  +{formatPoints(SHARE_BONUS_AMOUNT)} VND
                </span>
              </h3>
              <p className="text-sm text-gray-300">
                {campaignShareCount > 0 ? (
                  <>✅ {campaignShareCount}{t.campaignDetail.shareSubmitted}</>
                ) : (
                  <>{t.campaignDetail.shareDescription.replace('적립', formatPoints(SHARE_BONUS_AMOUNT) + ' VND')}</>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {campaignShareCount > 0 ? `${campaignShareCount} shares submitted` : 'Share to Facebook & earn bonus points'}
              </p>
            </div>
          </div>

          {campaignShareCount > 0 ? (
            (() => {
              const campaignShares = shareHistory.filter(
                (h) => h.campaignId === params.id && h.platform === 'facebook'
              );
              const pendingCount = campaignShares.filter(h => h.status === 'pending').length;
              const approvedCount = campaignShares.filter(h => h.status === 'approved').length;
              const rejectedCount = campaignShares.filter(h => h.status === 'rejected').length;

              return (
                <div className="space-y-3">
                  {/* Share Summary */}
                  <div className="bg-dark-600 rounded-lg p-3 space-y-2">
                    <h4 className="text-sm font-semibold text-white mb-2">{t.campaignDetail.shareStatus}</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {approvedCount > 0 && (
                        <div className="bg-success/10 rounded p-2">
                          <div className="text-success text-lg font-bold">{approvedCount}</div>
                          <div className="text-xs text-gray-400">{t.campaignDetail.shareApproved}</div>
                        </div>
                      )}
                      {pendingCount > 0 && (
                        <div className="bg-warning/10 rounded p-2">
                          <div className="text-warning text-lg font-bold">{pendingCount}</div>
                          <div className="text-xs text-gray-400">{t.campaignDetail.sharePending}</div>
                        </div>
                      )}
                      {rejectedCount > 0 && (
                        <div className="bg-error/10 rounded p-2">
                          <div className="text-error text-lg font-bold">{rejectedCount}</div>
                          <div className="text-xs text-gray-400">{t.campaignDetail.shareRejected}</div>
                        </div>
                      )}
                    </div>
                    <Link href="/main/influencer/shares" className="block">
                      <button className="btn btn-ghost w-full text-xs mt-2">
                        {t.campaignDetail.viewAllShares}
                      </button>
                    </Link>
                  </div>

                  {/* Share More Button */}
                  <button
                    onClick={handleFacebookShare}
                    className="w-full btn bg-[#1877F2] hover:bg-[#166FE5] text-white border-0 flex items-center justify-center gap-2 py-3"
                    disabled={dailyShareCount >= MAX_DAILY_SHARES}
                  >
                    <FaFacebook size={20} />
                    <span className="font-semibold">
                      {dailyShareCount >= MAX_DAILY_SHARES ? t.campaignDetail.dailyLimitReached.split(' ')[0] : t.campaignDetail.shareMore}
                    </span>
                  </button>
                </div>
              );
            })()
          ) : (
            <>
              <button
                onClick={handleFacebookShare}
                className="w-full btn bg-[#1877F2] hover:bg-[#166FE5] text-white border-0 flex items-center justify-center gap-2 mb-3 py-4"
                disabled={dailyShareCount >= MAX_DAILY_SHARES}
              >
                <FaFacebook size={22} />
                <div className="flex-1 text-left">
                  <div className="font-bold">
                    {dailyShareCount >= MAX_DAILY_SHARES ? (
                      <>{t.campaignDetail.dailyLimitReached}</>
                    ) : (
                      <>{t.campaignDetail.shareOnFacebook}</>
                    )}
                  </div>
                  {dailyShareCount < MAX_DAILY_SHARES && (
                    <div className="text-xs opacity-90">{t.campaignDetail.shareButtonDesc} {formatPoints(SHARE_BONUS_AMOUNT)} VND</div>
                  )}
                </div>
              </button>

              <div className="bg-dark-600 rounded-lg p-3 space-y-2">
                <h4 className="text-xs font-semibold text-white mb-2">{t.campaignDetail.shareGuidelines}</h4>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <Share2 size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareWhere}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <Gift size={14} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.sharePerShare.replace('적립', formatPoints(SHARE_BONUS_AMOUNT) + ' VND')}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareMultiple}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <Clock size={14} className="text-warning flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareDailyLimit.replace('개 캠페인 공유 가능 (오늘:', ` ${MAX_DAILY_SHARES} ${dailyShareCount}/${MAX_DAILY_SHARES}`)}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <ExternalLink size={14} className="text-info flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareNoDelete}</span>
                </div>
              </div>

              {totalShareEarnings > 0 && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-3 mt-3">
                  <p className="text-xs text-gray-400 text-center">
                    💰 <strong className="text-white">{t.campaignDetail.totalShareEarnings}</strong>: {formatPoints(totalShareEarnings)} VND
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Progress */}
        {mockCampaign.status === 'in_progress' && (
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.progress}</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{t.campaignDetail.completedTasks}</span>
                <span className="text-white font-semibold">
                  {completedCount}/{mockCampaign.deliverables.length}
                </span>
              </div>
              <div className="w-full h-3 bg-dark-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Deliverables */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">{t.campaignDetail.deliverables}</h3>
            {mockCampaign.status === 'in_progress' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary text-xs"
              >
                <Upload size={14} className="mr-1" />
                {t.campaignDetail.submitWork}
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {mockCampaign.deliverables.map((item) => (
              <li key={item.id} className="flex items-start gap-2 text-sm">
                {item.submitted ? (
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-600 rounded flex-shrink-0 mt-0.5" />
                )}
                <span className={item.submitted ? 'text-gray-400 line-through' : 'text-gray-300'}>
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submitted Work */}
        {mockCampaign.submittedWork.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t.campaignDetail.submittedWork}</h3>
            {mockCampaign.submittedWork.map((work) => (
              <div key={work.id} className="card">
                <img
                  src={work.thumbnail}
                  alt="Submitted work"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    {t.campaignDetail.viewLink}
                  </a>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    work.status === 'approved' ? 'bg-success/20 text-success' :
                    work.status === 'rejected' ? 'bg-error/20 text-error' :
                    'bg-warning/20 text-warning'
                  }`}>
                    {work.status === 'approved' ? t.campaignDetail.approved :
                     work.status === 'rejected' ? t.campaignDetail.rejected : t.campaignDetail.reviewing}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {(work.views / 1000).toFixed(1)}K
                  </div>
                  <div>{t.campaignDetail.likes} {work.likes.toLocaleString()}</div>
                  <div>{t.campaignDetail.submittedAt} {work.submittedAt}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Campaign Info */}
        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.campaignInfo}</h3>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-400">{t.campaignDetail.period}</span>
            <span className="text-white">{mockCampaign.startDate} ~ {mockCampaign.deadline}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-400">{t.campaignDetail.deadline}</span>
            <span className="text-white">{mockCampaign.deadline}</span>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">{t.campaignDetail.applyModal.title}</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-dark-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{mockCampaign.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.campaignDetail.applyModal.advertiser}</span>
                    <span className="text-white">{mockCampaign.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.campaignDetail.applyModal.expectedEarnings}</span>
                    <span className="text-accent font-bold">{formatPoints(mockCampaign.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.campaignDetail.applyModal.deadline}</span>
                    <span className="text-white">{mockCampaign.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-3">
                <p className="text-xs text-gray-300">
                  {t.campaignDetail.applyModal.confirmLine1}<br />
                  {t.campaignDetail.applyModal.confirmLine2}<br />
                  {t.campaignDetail.applyModal.confirmLine3}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 btn btn-ghost"
              >
                {t.campaignDetail.applyModal.cancel}
              </button>
              <button
                onClick={handleApplyCampaign}
                className="flex-1 btn btn-primary"
              >
                {t.campaignDetail.applyModal.apply}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.campaignDetail.uploadModal.title}</h3>
            <form onSubmit={handleSubmitWork} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  {t.campaignDetail.uploadModal.contentUrl}
                </label>
                <input
                  type="url"
                  value={uploadData.url}
                  onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                  placeholder={t.campaignDetail.uploadModal.urlPlaceholder}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  {t.campaignDetail.uploadModal.description}
                </label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder={t.campaignDetail.uploadModal.descPlaceholder}
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 btn btn-ghost"
                >
                  {t.campaignDetail.uploadModal.cancel}
                </button>
                <button type="submit" className="flex-1 btn btn-primary">
                  {t.campaignDetail.uploadModal.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Link Input Modal */}
      {showShareLinkModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6 my-8">
            <h3 className="text-xl font-bold text-white mb-2">{t.campaignDetail.shareLinkModal.title}</h3>
            <p className="text-sm text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: t.campaignDetail.shareLinkModal.description.replace(formatPoints(SHARE_BONUS_AMOUNT) + ' VND', `<strong class="text-accent">${formatPoints(SHARE_BONUS_AMOUNT)} VND</strong>`) }} />

            <div className="space-y-4">
              {/* Where can I share? */}
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-sm font-bold text-white mb-3">{t.campaignDetail.shareLinkModal.whereCanShare}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-success rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.campaignDetail.shareLinkModal.facebookGroups}</p>
                      <p className="text-xs text-gray-400">{t.campaignDetail.shareLinkModal.facebookGroupsDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-success rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.campaignDetail.shareLinkModal.personalTimeline}</p>
                      <p className="text-xs text-gray-400">{t.campaignDetail.shareLinkModal.personalTimelineDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-success rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.campaignDetail.shareLinkModal.facebookPages}</p>
                      <p className="text-xs text-gray-400">{t.campaignDetail.shareLinkModal.facebookPagesDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-warning/10 border border-warning/30 rounded p-2">
                  <p className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="text-warning">⚠️</span>
                    <span dangerouslySetInnerHTML={{ __html: t.campaignDetail.shareLinkModal.publicWarning }} />
                  </p>
                </div>
              </div>

              {/* Step-by-step guide */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
                <h4 className="text-sm font-bold text-white mb-3">{t.campaignDetail.shareLinkModal.howToShare}</h4>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{t.campaignDetail.shareLinkModal.step1}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.campaignDetail.shareLinkModal.step1Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{t.campaignDetail.shareLinkModal.step2}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.campaignDetail.shareLinkModal.step2Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{t.campaignDetail.shareLinkModal.step3}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.campaignDetail.shareLinkModal.step3Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{t.campaignDetail.shareLinkModal.step4}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.campaignDetail.shareLinkModal.step4Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-warning flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">5</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{t.campaignDetail.shareLinkModal.step5}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.campaignDetail.shareLinkModal.step5Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended share content */}
              <div className="bg-dark-700 rounded-lg p-4 border border-dark-500">
                <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  {t.campaignDetail.shareLinkModal.recommendedContent}
                  <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">{t.campaignDetail.shareContent.stepBadge1}</span>
                </h4>
                <div className="bg-dark-600 rounded p-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
🎯 {mockCampaign.title}

{mockCampaign.description}

{t.campaignDetail.shareContent.expectedEarnings} {formatPoints(mockCampaign.budget)} VND
{t.campaignDetail.shareContent.company} {mockCampaign.company}
{t.campaignDetail.shareContent.deadline} {mockCampaign.deadline}

{t.campaignDetail.shareContent.viewDetails} https://exfluencer.vn/campaigns/{params.id}

#인플루언서 #마케팅 #베트남 #ExfluencerVN #KOL
                </div>
                <button
                  onClick={() => {
                    const campaignUrl = `https://exfluencer.vn/campaigns/${params.id}`;
                    const shareText = `🎯 ${mockCampaign.title}\n\n${mockCampaign.description}\n\n${t.campaignDetail.shareContent.expectedEarnings} ${formatPoints(mockCampaign.budget)} VND\n${t.campaignDetail.shareContent.company} ${mockCampaign.company}\n${t.campaignDetail.shareContent.deadline} ${mockCampaign.deadline}\n\n${t.campaignDetail.shareContent.viewDetails} ${campaignUrl}\n\n#인플루언서 #마케팅 #베트남 #ExfluencerVN #KOL`;
                    navigator.clipboard.writeText(shareText);
                    alert(t.campaignDetail.alerts.clipboardCopied);
                  }}
                  className="btn btn-primary w-full py-3"
                >
                  {t.campaignDetail.shareLinkModal.copyContent}
                </button>

                <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 mt-2">
                  <p className="text-xs text-gray-300 text-center" dangerouslySetInnerHTML={{ __html: t.campaignDetail.shareContent.manualShareNote }} />
                </div>
              </div>

              {/* URL input */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full">{t.campaignDetail.shareContent.stepBadge4}</span>
                    {t.campaignDetail.shareLinkModal.enterLink}
                  </span>
                </label>
                <input
                  type="url"
                  value={shareLinkInput}
                  onChange={(e) => setShareLinkInput(e.target.value)}
                  placeholder={t.campaignDetail.shareContent.placeholder}
                  className="input"
                  required
                />
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-400">
                    {t.campaignDetail.shareContent.linkCopyMethod}
                  </p>
                  <p className="text-xs text-warning">
                    {t.campaignDetail.shareContent.fakeWarning}
                  </p>
                </div>
              </div>

              {/* Valid URL examples */}
              <div className="bg-info/10 border border-info/30 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-white mb-2">{t.campaignDetail.shareLinkModal.validFormats}</h4>
                <div className="text-xs text-gray-300 space-y-2">
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.groupPost}</p>
                    <p className="font-mono text-gray-400">facebook.com/groups/123/posts/456/</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.timelinePost}</p>
                    <p className="font-mono text-gray-400">facebook.com/username/posts/123456</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.pagePost}</p>
                    <p className="font-mono text-gray-400">facebook.com/pagename/posts/123456</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.permalink}</p>
                    <p className="font-mono text-gray-400">facebook.com/permalink.php?story_fbid=...</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowShareLinkModal(false);
                    setShareLinkInput('');
                  }}
                  className="flex-1 btn btn-ghost"
                >
                  {t.campaignDetail.shareLinkModal.cancel}
                </button>
                <button
                  onClick={handleSubmitShareLink}
                  className="flex-1 btn btn-primary"
                >
                  {t.campaignDetail.shareLinkModal.submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 결제 안내 모달 */}
      {showPaymentGuaranteeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-700 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-blue-500/30 animate-slide-up">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500/20 to-blue-500/10 border-b border-blue-500/30 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <DollarSign size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">결제 안내</h3>
                    <p className="text-xs text-blue-400">Payment Information</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentGuaranteeModal(false)}
                  className="btn-icon text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 메인 설명 */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  🤝 직접 결제 시스템
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Exfluencer는 <span className="text-blue-400 font-bold">매칭 플랫폼</span>입니다.
                  결제는 <span className="text-blue-400 font-bold">광고주와 인플루언서가 직접 협의</span>하여 진행하세요.
                  플랫폼은 결제를 중개하거나 보관하지 않습니다.
                </p>
              </div>

              {/* 권장 결제 방법 */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">💳 권장 결제 방법</h4>

                <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">은행 이체 (권장)</h5>
                      <p className="text-xs text-gray-400">
                        가장 안전하고 추적 가능합니다.
                        Vietcombank, Techcombank, VPBank, BIDV 등
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">모바일 월렛</h5>
                      <p className="text-xs text-gray-400">
                        빠르고 편리합니다.
                        Momo, Zalo Pay, ViettelPay, ShopeePay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">국제 송금</h5>
                      <p className="text-xs text-gray-400">
                        해외 광고주의 경우 PayPal, Wise (구 TransferWise) 등
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 결제 진행 방법 */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">📋 결제 진행 방법</h4>
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"></div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">선정 후 협의</h5>
                        <p className="text-xs text-gray-400">메시징으로 금액, 결제 방법, 일정 협의</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">직접 결제</h5>
                        <p className="text-xs text-gray-400">광고주가 인플루언서에게 직접 송금</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/60 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">양측 확인</h5>
                        <p className="text-xs text-gray-400">플랫폼에서 결제 완료 확인 체크</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주의사항 */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  ⚠️ 주의사항
                </h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>• 반드시 계약서를 확인하고 결제하세요</li>
                  <li>• 결제 후 양측이 플랫폼에서 "결제 완료" 확인해야 다음 단계로 진행됩니다</li>
                  <li>• 분쟁 발생 시 플랫폼은 중재만 제공하며, 결제 책임은 당사자 간에 있습니다</li>
                  <li>• 안전을 위해 은행 이체 또는 공식 모바일 월렛 사용을 권장합니다</li>
                </ul>
              </div>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowPaymentGuaranteeModal(false)}
                className="w-full btn btn-primary py-4"
              >
                ✅ 이해했습니다
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 계약보호 모달 */}
      <ContractProtectionModal
        isOpen={showContractProtectionModal}
        onClose={() => setShowContractProtectionModal(false)}
      />

      <BottomNav userType="influencer" />
    </div>
  );
}

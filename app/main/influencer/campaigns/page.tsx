'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  X,
  Share2,
  Plane,
  Ticket,
  Trophy,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import EmptyState from '@/components/common/EmptyState';
import { formatCash } from '@/lib/points';
import type { Platform, Category } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockCampaigns, getMockUserProfile } from '@/lib/mockData';
import { checkAndGenerateCampaigns } from '@/lib/demoCampaignGenerator';

// Mock user profile - DEPRECATED: Now using getMockUserProfile() from @/lib/mockData
/*const mockUserProfile = {
  followers: 15000,
  engagementRate: 4.5,
  platforms: ['instagram', 'tiktok'] as Platform[],
  categories: ['beauty', 'lifestyle'] as Category[],
  location: '호치민, 베트남',

  // Extended profile
  gender: 'female' as const,
  ageRange: '25-34',
  hasVehicle: false,
  hasChildren: false,
  hasPets: false,
  maritalStatus: 'single' as const,
  housingType: 'apartment' as const,
  skinType: 'combination' as const,
  skinTone: 'light' as const,
};*/

// Mock data - DEPRECATED: Now using getMockCampaigns() from @/lib/mockData
/*const mockCampaigns = [
  {
    id: '1',
    title: '신규 스킨케어 제품 리뷰 캠페인',
    company: 'K-Beauty Co.',
    companyLogo: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    budget: 500000,
    minBudget: 300000,
    maxBudget: 800000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: '호치민, 베트남',
    deadline: '2024-03-15',
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
    description: '새로 출시되는 스킨케어 라인을 리뷰하고 홍보해주실 인플루언서를 찾습니다. 복합성/지성 피부에 최적화된 제품입니다.',
    applicants: 23,
    type: 'cash' as 'cash' | 'points',

    // Extended requirements - Beauty specific
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
    skinType: ['combination', 'oily'], // For skincare targeting
    skinTone: ['light', 'medium'],
  },
  {
    id: '2',
    title: '베트남 레스토랑 체험 리뷰',
    company: 'Pho House Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Pho+House&background=4ECDC4&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    budget: 300000,
    minBudget: 200000,
    maxBudget: 500000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['food', 'travel'] as Category[],
    location: '호치민, 베트남',
    deadline: '2024-03-20',
    requiredFollowers: 5000,
    requiredEngagement: 2.5,
    description: '베트남 전통 요리를 소개하고 레스토랑 3개 지점을 방문하여 리뷰해주실 푸드 인플루언서를 찾습니다. 여러 지점 이동을 위해 차량 소유자만 지원 가능합니다.',
    applicants: 15,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: true, // 여러 지점 방문을 위해 차량 필요
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '3',
    title: '스마트폰 언박싱 & 리뷰',
    company: 'Tech World',
    companyLogo: 'https://ui-avatars.com/api/?name=Tech+World&background=6C5CE7&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    budget: 1000000,
    minBudget: 800000,
    maxBudget: 1500000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['tech', 'lifestyle'] as Category[],
    location: '하노이, 베트남',
    deadline: '2024-03-10',
    requiredFollowers: 50000,
    requiredEngagement: 4.0,
    description: '최신 플래그십 스마트폰의 언박싱과 상세 리뷰를 진행해주실 테크 인플루언서를 찾습니다.',
    applicants: 42,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '4',
    title: '피트니스 앱 프로모션',
    company: 'FitLife App',
    companyLogo: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    budget: 600000,
    minBudget: 400000,
    maxBudget: 800000,
    platforms: ['instagram', 'youtube', 'tiktok'] as Platform[],
    categories: ['fitness', 'health'] as Category[],
    location: '온라인',
    deadline: '2024-03-25',
    requiredFollowers: 20000,
    requiredEngagement: 3.5,
    description: '피트니스 앱을 사용하고 운동 루틴을 공유해주실 피트니스 인플루언서를 찾습니다.',
    applicants: 31,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '5',
    title: '패션 브랜드 신상품 홍보',
    company: 'Fashion Hub',
    companyLogo: 'https://ui-avatars.com/api/?name=Fashion+Hub&background=E74C3C&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    budget: 700000,
    minBudget: 500000,
    maxBudget: 900000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['fashion', 'lifestyle'] as Category[],
    location: '다낭, 베트남',
    deadline: '2024-03-18',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: '새로운 봄 컬렉션을 착용하고 스타일링을 공유해주실 패션 인플루언서를 찾습니다. S~M 사이즈 착용 가능한 분을 찾습니다.',
    applicants: 28,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
    clothingSizes: {
      top: ['S', 'M'],
      bottom: ['S', 'M'],
    },
  },
  {
    id: '6',
    title: '카페 신메뉴 소개',
    company: 'Coffee Lab',
    companyLogo: 'https://ui-avatars.com/api/?name=Coffee+Lab&background=A55C2F&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    budget: 200000,
    minBudget: 150000,
    maxBudget: 300000,
    platforms: ['instagram'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: '호치민, 베트남',
    deadline: '2024-03-22',
    requiredFollowers: 3000,
    requiredEngagement: 2.0,
    description: '신규 오픈한 카페의 시그니처 음료를 소개해주실 인플루언서를 찾습니다.',
    applicants: 45,
    type: 'points' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '7',
    title: '여행 패키지 체험단',
    company: 'Vietnam Travel',
    companyLogo: 'https://ui-avatars.com/api/?name=Vietnam+Travel&background=3498DB&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
    budget: 1500000,
    minBudget: 1000000,
    maxBudget: 2000000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['travel', 'lifestyle'] as Category[],
    location: '하롱베이, 베트남',
    deadline: '2024-03-30',
    requiredFollowers: 30000,
    requiredEngagement: 4.5,
    description: '하롱베이 2박3일 럭셔리 투어를 체험하고 영상으로 소개해주실 여행 인플루언서를 찾습니다.',
    applicants: 67,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '8',
    title: '뷰티 메이크업 튜토리얼',
    company: 'Glam Cosmetics',
    companyLogo: 'https://ui-avatars.com/api/?name=Glam&background=E91E63&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    budget: 400000,
    minBudget: 300000,
    maxBudget: 600000,
    platforms: ['tiktok', 'instagram'] as Platform[],
    categories: ['beauty'] as Category[],
    location: '호치민, 베트남',
    deadline: '2024-03-17',
    requiredFollowers: 8000,
    requiredEngagement: 3.2,
    description: '신상 메이크업 팔레트를 활용한 메이크업 튜토리얼을 제작해주실 뷰티 크리에이터를 찾습니다. 밝은 톤~중간 톤 피부에 최적화된 색상입니다.',
    applicants: 52,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
    skinTone: ['light', 'medium'], // For makeup shade matching
  },
  {
    id: '9',
    title: '게임 앱 플레이 영상',
    company: 'GameStudio VN',
    companyLogo: 'https://ui-avatars.com/api/?name=GameStudio&background=9B59B6&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    budget: 800000,
    minBudget: 600000,
    maxBudget: 1000000,
    platforms: ['youtube', 'facebook'] as Platform[],
    categories: ['tech', 'gaming'] as Category[],
    location: '온라인',
    deadline: '2024-03-28',
    requiredFollowers: 25000,
    requiredEngagement: 5.0,
    description: '신규 모바일 게임의 플레이 영상과 리뷰를 제작해주실 게임 유튜버를 찾습니다.',
    applicants: 38,
    type: 'cash' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
  {
    id: '10',
    title: '홈 인테리어 제품 소개',
    company: 'HomeDeco',
    companyLogo: 'https://ui-avatars.com/api/?name=HomeDeco&background=16A085&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
    budget: 350000,
    minBudget: 250000,
    maxBudget: 500000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'home'] as Category[],
    location: '하노이, 베트남',
    deadline: '2024-03-21',
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
    description: '미니멀 인테리어 소품을 활용한 홈 스타일링 콘텐츠를 제작해주실 인플루언서를 찾습니다.',
    applicants: 24,
    type: 'points' as 'cash' | 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    requiredMaritalStatus: undefined as undefined | 'single' | 'married',
  },
];*/

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

const platformColors = {
  instagram: 'text-pink-500',
  tiktok: 'text-white',
  youtube: 'text-red-500',
  facebook: 'text-blue-500',
};

// 신청자 프로필 아바타 생성 (베트남 이름)
const vietnamNames = [
  'Nguyen Anh', 'Tran Mai', 'Le Minh', 'Pham Thu', 'Hoang Van',
  'Phan Thi', 'Vu Duc', 'Dang Hong', 'Bui Quoc', 'Do Thanh',
  'Ngo Hai', 'Duong Kim', 'Ly Lan', 'Vo Hoa', 'Truong Linh',
  'Dinh Phuong', 'Lam Chi', 'Cao Binh', 'Tong Dieu', 'Ha Yen',
];

const avatarColors = [
  'FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7',
  'DFE6E9', '6C5CE7', 'A29BFE', 'FD79A8', 'FDCB6E',
  '6C5CE7', 'E17055', '00B894', '00CEC9', '0984E3',
];

// 캠페인별 신청자 아바타 생성
const generateApplicantAvatars = (campaignId: string, applicantsCount: number, showCount: number = 5) => {
  const seed = campaignId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const avatars = [];

  for (let i = 0; i < Math.min(showCount, applicantsCount); i++) {
    const nameIndex = (seed + i) % vietnamNames.length;
    const colorIndex = (seed + i) % avatarColors.length;
    const name = vietnamNames[nameIndex];
    const color = avatarColors[colorIndex];

    avatars.push({
      name,
      url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=64`,
    });
  }

  return avatars;
};

export default function CampaignsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  // ADMIN MODE: Toggle to see demo campaign indicators (only for platform owner)
  // In production, this would check user.isAdmin from authentication
  // For now, check if ?admin=true in URL or development mode
  const [isAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === 'true' || process.env.NODE_ENV === 'development';
    }
    return false;
  });
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Use translated mock data based on current language
  const [mockCampaigns, setMockCampaigns] = useState(getMockCampaigns(language));
  const mockUserProfile = getMockUserProfile(language);

  // Auto-generate campaigns daily (if enabled in admin settings)
  useEffect(() => {
    // Check and generate new campaigns (runs once per day)
    checkAndGenerateCampaigns(language);
    // Reload campaigns after check
    setMockCampaigns(getMockCampaigns(language));
  }, [language]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    platforms: [] as Platform[],
    categories: [] as Category[],
    minBudget: '',
    maxBudget: '',
    location: '',
    type: '' as '' | 'cash' | 'points',
    eligibleOnly: false, // 지원 가능한 캠페인만 보기

    // Extended filters
    requiresVehicle: false, // 차량 소유 필수 캠페인만
    requiresParent: false, // 자녀 있는 사람 필수 캠페인만
    requiresPet: false, // 반려동물 있는 사람 필수 캠페인만
    maritalStatus: '' as '' | 'single' | 'married',
  });

  // 자격 체크 함수
  const checkEligibility = (campaign: typeof mockCampaigns[0]) => {
    const checks = {
      followers: mockUserProfile.followers >= campaign.requiredFollowers,
      engagement: mockUserProfile.engagementRate >= campaign.requiredEngagement,
      platform: campaign.platforms.some(p => mockUserProfile.platforms.includes(p)),
      location: campaign.location === '온라인' || campaign.location.includes(mockUserProfile.location.split(',')[0]),

      // Extended eligibility checks
      vehicle: campaign.requiresVehicle ? mockUserProfile.hasVehicle : true,
      parent: campaign.requiresParent ? mockUserProfile.hasChildren : true,
      pet: campaign.requiresPet ? mockUserProfile.hasPets : true,
      maritalStatus: campaign.requiredMaritalStatus ? mockUserProfile.maritalStatus === campaign.requiredMaritalStatus : true,

      // Beauty/Fashion specific checks
      skinType: (campaign as any).skinType ? (campaign as any).skinType.includes(mockUserProfile.skinType) : true,
      skinTone: (campaign as any).skinTone ? (campaign as any).skinTone.includes(mockUserProfile.skinTone) : true,
      // Clothing sizes - check if user's sizes are within campaign requirements (if any)
      clothingSize: (campaign as any).clothingSizes ? (
        // If campaign has size requirements, check if they match
        // For simplicity, we'll assume the user matches if campaign has sizes defined
        // In a real app, you'd check mockUserProfile.clothingSizes
        true
      ) : true,
    };

    return {
      ...checks,
      eligible: Object.values(checks).every(v => v),
    };
  };

  // Calculate recommendation score for campaigns (0-100)
  const calculateRecommendationScore = (campaign: typeof mockCampaigns[0]) => {
    let score = 0;
    const criteria = checkEligibility(campaign);

    // Perfect matches get full points
    if (criteria.followers) score += 25;
    if (criteria.engagement) score += 20;
    if (criteria.platform) score += 15;
    if (criteria.location) score += 10;

    // Extended criteria
    if (criteria.vehicle) score += 5;
    if (criteria.parent) score += 5;
    if (criteria.pet) score += 5;
    if (criteria.maritalStatus) score += 5;

    // Beauty/Fashion criteria
    if (criteria.skinType) score += 5;
    if (criteria.skinTone) score += 5;

    // Bonus for category match
    const categoryMatch = campaign.categories.some(c =>
      mockUserProfile.categories.includes(c)
    );
    if (categoryMatch) score += 10;

    // Bonus for budget (higher budget = more attractive)
    if (campaign.maxBudget >= 1000000) score += 5;
    if (campaign.maxBudget >= 500000) score += 3;

    // Penalty for low deadline (less time to apply)
    const deadlineDate = new Date(campaign.deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDeadline < 3) score -= 10;
    if (daysUntilDeadline < 7) score -= 5;

    return Math.max(0, Math.min(100, score));
  };

  // Get recommended campaigns (top 3 by score)
  const recommendedCampaigns = mockCampaigns
    .map(campaign => ({
      campaign,
      score: calculateRecommendationScore(campaign),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .filter(item => item.score >= 60); // Only show if score is 60% or higher

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = campaign.title.toLowerCase().includes(query);
      const matchCompany = campaign.company.toLowerCase().includes(query);
      const matchDescription = campaign.description.toLowerCase().includes(query);
      if (!matchTitle && !matchCompany && !matchDescription) return false;
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      const hasMatchingPlatform = campaign.platforms.some((p) =>
        filters.platforms.includes(p)
      );
      if (!hasMatchingPlatform) return false;
    }

    // Category filter
    if (filters.categories.length > 0) {
      const hasMatchingCategory = campaign.categories.some((c) =>
        filters.categories.includes(c)
      );
      if (!hasMatchingCategory) return false;
    }

    // Budget filter
    if (filters.minBudget) {
      const minBudget = parseInt(filters.minBudget);
      if (campaign.maxBudget < minBudget) return false;
    }

    if (filters.maxBudget) {
      const maxBudget = parseInt(filters.maxBudget);
      if (campaign.minBudget > maxBudget) return false;
    }

    // Location filter
    if (filters.location) {
      if (!campaign.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    // Type filter (cash vs points)
    if (filters.type) {
      if (campaign.type !== filters.type) return false;
    }

    // Eligible only filter
    if (filters.eligibleOnly) {
      const eligibility = checkEligibility(campaign);
      if (!eligibility.eligible) return false;
    }

    // Extended filters - show campaigns that match user's capabilities
    if (filters.requiresVehicle && campaign.requiresVehicle) {
      // Only show vehicle-required campaigns if user has vehicle
      if (!mockUserProfile.hasVehicle) return false;
    }

    if (filters.requiresParent && campaign.requiresParent) {
      // Only show parenting campaigns if user has children
      if (!mockUserProfile.hasChildren) return false;
    }

    if (filters.requiresPet && campaign.requiresPet) {
      // Only show pet campaigns if user has pets
      if (!mockUserProfile.hasPets) return false;
    }

    if (filters.maritalStatus) {
      // Only show campaigns matching marital status
      if (campaign.requiredMaritalStatus && campaign.requiredMaritalStatus !== filters.maritalStatus) {
        return false;
      }
    }

    return true;
  });

  const togglePlatform = (platform: Platform) => {
    setFilters({
      ...filters,
      platforms: filters.platforms.includes(platform)
        ? filters.platforms.filter((p) => p !== platform)
        : [...filters.platforms, platform],
    });
  };

  const toggleCategory = (category: Category) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader
        title={t.campaign.title}
        showNotification
        onNotification={() => router.push('/main/influencer/notifications')}
      />

      {/* ADMIN MODE TOGGLE (only visible to admins) */}
      {isAdmin && (
        <div className="sticky top-14 z-40 bg-dark-700/95 backdrop-blur-sm border-b border-dark-500">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-mono">🔐 Admin Panel</span>
              {isAdminMode && (
                <Link href="/admin/demo-campaigns">
                  <button className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[10px] rounded-full font-bold transition-all flex items-center gap-1">
                    ⚙️ 자동 생성 설정
                  </button>
                </Link>
              )}
            </div>
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isAdminMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-dark-600 text-gray-500 hover:bg-dark-500'
              }`}
            >
              {isAdminMode ? '🎭 Admin Mode ON' : 'Admin Mode OFF'}
            </button>
          </div>
        </div>
      )}

      {/* 🇰🇷 KOREA DREAM 고정 배너 */}
      <div className="sticky top-14 z-30 bg-dark-700 border-b border-dark-500">
        <Link href="/main/influencer/korea-dream">
          <div className="mx-4 my-3 relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 via-blue-500 to-red-500 p-[2px] animate-pulse">
            <div className="bg-dark-700 rounded-xl px-4 py-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plane size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🇰🇷</span>
                      <span className="font-bold text-white text-sm">KOREA DREAM</span>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold">HOT</span>
                    </div>
                    <div className="text-xs text-gray-300">{t.koreaDream.koreanBeautyExperience}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-gray-300">{t.koreaDream.myTickets}</div>
                    <div className="flex items-center gap-1">
                      <Ticket size={14} className="text-primary" />
                      <span className="font-bold text-white text-sm">0{t.koreaDream.ticketsUnit}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-300">{t.koreaDream.targetTickets}</span>
                  <span className="text-[10px] font-bold text-white">78,432 / 100,000{t.koreaDream.ticketsUnit}</span>
                </div>
                <div className="w-full bg-dark-600 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-red-500 to-blue-500 h-1.5 rounded-full" style={{width: '78.4%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="sticky top-[200px] z-20 bg-dark-700 border-b border-dark-500 p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t.campaign.title} ${t.common.search}...`}
              className="input pl-12 pr-4"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${
              showFilters || filters.platforms.length > 0
                ? 'btn-primary'
                : 'btn-secondary'
            } px-4`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-dark-600 rounded-xl space-y-4 animate-slide-down">
            {/* Eligible Only Toggle */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success/10 to-success/5 border border-success/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-success" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.campaignFilters.eligibleOnly}</div>
                  <div className="text-xs text-gray-300">{t.campaignFilters.eligibleOnlyDesc}</div>
                </div>
              </div>
              <button
                onClick={() => setFilters({ ...filters, eligibleOnly: !filters.eligibleOnly })}
                className={`w-12 h-6 rounded-full transition-all ${
                  filters.eligibleOnly ? 'bg-success' : 'bg-dark-500'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  filters.eligibleOnly ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {t.campaignFilters.platform}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['instagram', 'tiktok', 'youtube', 'facebook'] as Platform[]).map(
                  (platform) => {
                    const Icon = platformIcons[platform];
                    const isActive = filters.platforms.includes(platform);
                    return (
                      <button
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={`py-2 px-3 rounded-lg border transition-all ${
                          isActive
                            ? 'bg-primary border-primary text-white'
                            : 'bg-dark-700 border-dark-500 text-gray-300'
                        }`}
                      >
                        <Icon size={20} className="mx-auto" />
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {t.campaignFilters.category}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['beauty', 'food', 'fashion', 'tech', 'fitness', 'travel', 'lifestyle', 'gaming', 'education', 'entertainment'] as Category[]).map(
                  (category) => {
                    const isActive = filters.categories.includes(category);
                    return (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`py-2 px-3 rounded-lg border text-xs transition-all ${
                          isActive
                            ? 'bg-secondary border-secondary text-white font-semibold'
                            : 'bg-dark-700 border-dark-500 text-gray-300'
                        }`}
                      >
                        {t.campaignFilters[category as keyof typeof t.campaignFilters]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {t.campaignFilters.campaignType}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFilters({ ...filters, type: '' })}
                  className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                    filters.type === ''
                      ? 'bg-primary border-primary text-white font-semibold'
                      : 'bg-dark-700 border-dark-500 text-gray-300'
                  }`}
                >
                  {t.campaignFilters.all}
                </button>
                <button
                  onClick={() => setFilters({ ...filters, type: 'cash' })}
                  className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                    filters.type === 'cash'
                      ? 'bg-green-500 border-green-500 text-white font-semibold'
                      : 'bg-dark-700 border-dark-500 text-gray-300'
                  }`}
                >
                  {t.campaignFilters.cash}
                </button>
                <button
                  onClick={() => setFilters({ ...filters, type: 'points' })}
                  className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                    filters.type === 'points'
                      ? 'bg-blue-500 border-blue-500 text-white font-semibold'
                      : 'bg-dark-700 border-dark-500 text-gray-300'
                  }`}
                >
                  {t.campaignFilters.points}
                </button>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {t.campaignFilters.location}
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder={t.campaignFilters.locationPlaceholder}
                className="input text-sm"
              />
            </div>

            {/* Budget Filter */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {t.campaignFilters.budgetRange}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minBudget}
                  onChange={(e) =>
                    setFilters({ ...filters, minBudget: e.target.value })
                  }
                  placeholder={t.campaignFilters.minBudget}
                  className="input flex-1 text-sm"
                />
                <span className="text-gray-300 self-center">-</span>
                <input
                  type="number"
                  value={filters.maxBudget}
                  onChange={(e) =>
                    setFilters({ ...filters, maxBudget: e.target.value })
                  }
                  placeholder={t.campaignFilters.maxBudget}
                  className="input flex-1 text-sm"
                />
              </div>
            </div>

            {/* Lifestyle Filters */}
            <div className="border-t border-dark-500 pt-4">
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                🎯 {t.campaignFilters.specialConditions}
              </label>

              <div className="space-y-2">
                {/* Vehicle filter */}
                <label className="flex items-center justify-between p-3 bg-dark-700 rounded-lg cursor-pointer hover:bg-dark-600 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{t.campaignFilters.vehicleRequired}</span>
                    {!mockUserProfile.hasVehicle && (
                      <span className="text-xs text-warning">{t.campaignFilters.noVehicle}</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.requiresVehicle}
                    onChange={(e) => setFilters({ ...filters, requiresVehicle: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                </label>

                {/* Parent filter */}
                <label className="flex items-center justify-between p-3 bg-dark-700 rounded-lg cursor-pointer hover:bg-dark-600 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{t.campaignFilters.childrenRequired}</span>
                    {!mockUserProfile.hasChildren && (
                      <span className="text-xs text-warning">{t.campaignFilters.noChildren}</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.requiresParent}
                    onChange={(e) => setFilters({ ...filters, requiresParent: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                </label>

                {/* Pet filter */}
                <label className="flex items-center justify-between p-3 bg-dark-700 rounded-lg cursor-pointer hover:bg-dark-600 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{t.campaignFilters.petsRequired}</span>
                    {!mockUserProfile.hasPets && (
                      <span className="text-xs text-warning">{t.campaignFilters.noPets}</span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.requiresPet}
                    onChange={(e) => setFilters({ ...filters, requiresPet: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                </label>

                {/* Marital status filter */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">{t.campaignFilters.maritalStatusLabel}</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, maritalStatus: '' })}
                      className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                        filters.maritalStatus === ''
                          ? 'bg-primary border-primary text-white font-semibold'
                          : 'bg-dark-700 border-dark-500 text-gray-300'
                      }`}
                    >
                      {t.campaignFilters.all}
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, maritalStatus: 'single' })}
                      className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                        filters.maritalStatus === 'single'
                          ? 'bg-primary border-primary text-white font-semibold'
                          : 'bg-dark-700 border-dark-500 text-gray-300'
                      }`}
                    >
                      {t.campaignFilters.single}
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, maritalStatus: 'married' })}
                      className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                        filters.maritalStatus === 'married'
                          ? 'bg-primary border-primary text-white font-semibold'
                          : 'bg-dark-700 border-dark-500 text-gray-300'
                      }`}
                    >
                      {t.campaignFilters.married}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Count */}
            {(() => {
              const activeFilterCount = [
                filters.platforms.length > 0,
                filters.categories.length > 0,
                filters.location,
                filters.minBudget || filters.maxBudget,
                filters.type,
                filters.eligibleOnly,
                filters.requiresVehicle,
                filters.requiresParent,
                filters.requiresPet,
                filters.maritalStatus,
              ].filter(Boolean).length;

              return activeFilterCount > 0 ? (
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <div className="text-xs text-primary font-semibold">
                    ✅ {activeFilterCount}{t.campaignFilters.filtersApplied}
                    {filters.platforms.length > 1 && ` (플랫폼 ${filters.platforms.length}개)`}
                    {filters.categories.length > 1 && ` (카테고리 ${filters.categories.length}개)`}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Reset Button */}
            <button
              onClick={() =>
                setFilters({
                  platforms: [],
                  categories: [],
                  minBudget: '',
                  maxBudget: '',
                  location: '',
                  type: '',
                  eligibleOnly: false,
                  requiresVehicle: false,
                  requiresParent: false,
                  requiresPet: false,
                  maritalStatus: '',
                })
              }
              className="btn btn-ghost w-full text-sm"
            >
              {t.campaignFilters.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="px-4 py-3 text-sm text-gray-300">
        {filteredCampaigns.length}{t.campaignFilters.totalCampaigns}
      </div>

      {/* Recommended Campaigns Section */}
      {recommendedCampaigns.length > 0 && !filters.eligibleOnly && !filters.requiresVehicle && !filters.requiresParent && !filters.requiresPet && !filters.maritalStatus && filters.platforms.length === 0 && filters.categories.length === 0 && (
        <div className="container-mobile mb-6">
          <div className="flex items-center gap-2 mb-3 px-4">
            <Trophy size={20} className="text-primary" />
            <h3 className="text-lg font-bold text-white">{t.campaignFilters.recommendedCampaigns}</h3>
          </div>
          <div className="space-y-3 px-4">
            {recommendedCampaigns.map(({ campaign, score }) => {
              const eligibility = checkEligibility(campaign);
              const campaignUrl = `/main/influencer/campaigns/${campaign.id}${isAdminMode ? '?admin=true' : ''}`;
              return (
                <Link key={campaign.id} href={campaignUrl}>
                  <div className="relative card-hover overflow-hidden p-0 cursor-pointer border-2 border-primary/50">
                    {/* ADMIN ONLY: Demo Campaign Badge */}
                    {isAdminMode && campaign.isDemoMode && (
                      <div className="absolute top-2 left-2 z-20 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-[10px] font-black flex items-center gap-1 shadow-lg border border-white/30 animate-pulse">
                        🎭 DEMO
                      </div>
                    )}

                    {/* Recommendation Badge */}
                    <div className={`absolute top-2 z-10 px-2 py-1 bg-primary rounded-full text-white text-xs font-bold flex items-center gap-1 ${
                      isAdminMode && campaign.isDemoMode ? 'left-20' : 'left-2'
                    }`}>
                      <Trophy size={12} />
                      {t.campaignFilters.recommendationScore} {score}%
                    </div>

                    {/* Thumbnail Image */}
                    {campaign.thumbnail && (
                      <div className="relative w-full h-32 overflow-hidden">
                        <img
                          src={campaign.thumbnail}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Eligibility Badge */}
                        <div className="absolute top-2 right-2">
                          {eligibility.eligible ? (
                            <div className="px-2 py-1 bg-success rounded-full border border-white shadow-lg flex items-center gap-1">
                              <span className="text-white font-bold text-xs">✓ {t.campaign.eligible}</span>
                            </div>
                          ) : (
                            <div className="px-2 py-1 bg-error/90 rounded-full border border-white/50 shadow-lg flex items-center gap-1">
                              <span className="text-white font-bold text-xs">✗ {t.campaign.notEligible}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{campaign.title}</h3>
                      <p className="text-xs text-gray-300 mb-2">{campaign.company}</p>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold text-sm">
                            {(campaign.minBudget / 1000).toFixed(0)}K - {(campaign.maxBudget / 1000).toFixed(0)}K VND
                          </span>
                        </div>
                        <span className="text-xs text-gray-300">
                          {t.campaign.deadline}: {campaign.deadline}
                        </span>
                      </div>

                      {/* 신청자 아바타 */}
                      {campaign.applicants > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-dark-500">
                          <div className="flex -space-x-2">
                            {generateApplicantAvatars(campaign.id, campaign.applicants, 4).map((avatar, idx) => (
                              <img
                                key={idx}
                                src={avatar.url}
                                alt={avatar.name}
                                className="w-6 h-6 rounded-full border-2 border-dark-600 hover:z-10 hover:scale-110 transition-transform"
                                title={avatar.name}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-300">
                            {campaign.applicants > 4 && `+${campaign.applicants - 4}명 `}지원함
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="h-px bg-dark-500 my-6"></div>
        </div>
      )}

      {/* Campaign List */}
      <div className="container-mobile space-y-4 pb-6">
        {filteredCampaigns.map((campaign) => {
          const eligibility = checkEligibility(campaign);
          const campaignUrl = `/main/influencer/campaigns/${campaign.id}${isAdminMode ? '?admin=true' : ''}`;

          return (
            <Link key={campaign.id} href={campaignUrl}>
              <div className="card-hover overflow-hidden p-0 cursor-pointer">
                {/* Thumbnail Image */}
                {campaign.thumbnail && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* ADMIN ONLY: Demo Campaign Watermark */}
                    {isAdminMode && campaign.isDemoMode && (
                      <div className="absolute top-3 left-3 z-20">
                        <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-black flex items-center gap-1.5 shadow-xl border-2 border-white/40 animate-pulse">
                          🎭 DEMO CAMPAIGN
                        </div>
                      </div>
                    )}

                    {/* Eligibility Badge */}
                    <div className="absolute top-3 right-3">
                      {eligibility.eligible ? (
                        <div className="px-3 py-1.5 bg-success rounded-full border-2 border-white shadow-lg flex items-center gap-1.5">
                          <span className="text-white font-bold text-xs">✓ {t.campaign.eligible}</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1.5 bg-dark-600/90 rounded-full border-2 border-gray-500 shadow-lg flex items-center gap-1.5">
                          <span className="text-gray-300 font-semibold text-xs">{t.campaign.notEligible}</span>
                        </div>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className={`absolute ${
                      isAdminMode && campaign.isDemoMode ? 'top-14 left-3' : 'top-3 left-3'
                    }`}>
                      <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                        campaign.type === 'cash'
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {campaign.type === 'cash' ? t.campaignFilters.cash : t.campaignFilters.points}
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-lg font-bold text-white drop-shadow-lg mb-1">{campaign.title}</h4>
                      <div className="flex items-center gap-2">
                        <img
                          src={campaign.companyLogo}
                          alt={campaign.company}
                          className="w-6 h-6 rounded-full border-2 border-white/50"
                        />
                        <span className="text-sm text-white/90 drop-shadow">{campaign.company}</span>
                      </div>
                    </div>
                  </div>
                )}

              {/* Content */}
              <div className="p-4">
                {/* Description */}
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Platforms */}
                <div className="flex gap-2 mb-3">
                  {campaign.platforms.map((platform) => {
                    const Icon = platformIcons[platform];
                    return (
                      <div
                        key={platform}
                        className="w-8 h-8 bg-dark-600 rounded-lg flex items-center justify-center"
                      >
                        <Icon size={16} className={platformColors[platform]} />
                      </div>
                    );
                  })}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-accent" />
                    <span className="text-white font-semibold">
                      {formatCash(campaign.budget)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-300" />
                    <span className="text-gray-300">{campaign.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-300" />
                    <span className="text-gray-300">{campaign.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className="text-gray-300" />
                    <span className="text-gray-300">{campaign.applicants}{t.campaignFilters.applicationsCount}</span>
                  </div>
                </div>

                {/* 신청자 프로필 아바타 (추가!) */}
                {campaign.applicants > 0 && (
                  <div className="mb-3 p-3 bg-dark-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {generateApplicantAvatars(campaign.id, campaign.applicants, 6).map((avatar, idx) => (
                          <div
                            key={idx}
                            className="relative group"
                          >
                            <img
                              src={avatar.url}
                              alt={avatar.name}
                              className="w-10 h-10 rounded-full border-3 border-dark-700 hover:z-10 hover:scale-125 transition-all cursor-pointer shadow-lg"
                            />
                            {/* 호버 시 이름 표시 */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {avatar.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">
                          {campaign.applicants}명이 지원했습니다
                        </div>
                        <div className="text-xs text-gray-300">
                          {campaign.applicants > 6 ? `+${campaign.applicants - 6}명 더 보기` : '최근 지원자'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Eligibility Details */}
                {!eligibility.eligible && (
                  <div className="mb-3 p-2 bg-warning/10 border border-warning/30 rounded-lg">
                    <div className="text-xs font-semibold text-warning mb-1">{t.campaignFilters.requirementsNotMet}</div>
                    <div className="space-y-1">
                      {!eligibility.followers && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.followers}: {mockUserProfile.followers.toLocaleString()} ({campaign.requiredFollowers.toLocaleString()}+)
                        </div>
                      )}
                      {!eligibility.engagement && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.engagement}: {mockUserProfile.engagementRate}% ({campaign.requiredEngagement}%+)
                        </div>
                      )}
                      {!eligibility.platform && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.platform}
                        </div>
                      )}
                      {!eligibility.location && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.location}
                        </div>
                      )}
                      {!eligibility.vehicle && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.vehicle}
                        </div>
                      )}
                      {!eligibility.parent && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.parent}
                        </div>
                      )}
                      {!eligibility.pet && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.pet}
                        </div>
                      )}
                      {!eligibility.maritalStatus && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.maritalStatus}
                        </div>
                      )}
                      {!eligibility.skinType && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.skinType}
                        </div>
                      )}
                      {!eligibility.skinTone && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.skinTone}
                        </div>
                      )}
                      {!eligibility.clothingSize && (
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                          <X size={12} className="text-error" />
                          {t.campaign.failureReasons.clothingSize}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Info */}
                <div className="flex items-center justify-between pt-3 border-t border-dark-500">
                  <span className="text-xs text-gray-300">{t.campaignFilters.clickToView}</span>
                  <div className={`text-sm px-4 py-2 rounded-lg font-semibold ${
                    eligibility.eligible
                      ? 'bg-primary text-white'
                      : 'bg-dark-600 text-gray-300'
                  }`}>
                    {t.campaignFilters.viewDetails}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          );
        })}

        {filteredCampaigns.length === 0 && (
          <EmptyState
            icon={Search}
            title={t.campaignFilters.noResults || '검색 결과가 없습니다'}
            description={language === 'ko'
              ? '선택한 필터 조건과 일치하는 캠페인이 없습니다. 다른 조건으로 다시 시도해보세요.'
              : 'No campaigns match your selected filters. Try different criteria.'}
            action={{
              label: language === 'ko' ? '필터 초기화' : 'Reset Filters',
              onClick: () => {
                setFilters({
                  platforms: [],
                  categories: [],
                  eligibleOnly: false,
                  requiresVehicle: false,
                  requiresParent: false,
                  requiresPet: false,
                  maritalStatus: undefined,
                });
                setSearchQuery('');
              },
            }}
            dark
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="influencer" />
    </div>
  );
}

/**
 * Mock Data Translation System for Exfluencer VN
 *
 * This file contains all mock data in both Vietnamese and Korean.
 * It provides functions to retrieve data based on the selected language.
 */

import type { Platform, Category } from '@/types';

export type Language = 'vi' | 'ko';

// ============================================================================
// CAMPAIGN MOCK DATA
// ============================================================================

export interface MockCampaign {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  thumbnail: string;
  budget: number;
  minBudget: number;
  maxBudget: number;
  platforms: Platform[];
  categories: Category[];
  location: string;
  deadline: string;
  requiredFollowers: number;
  requiredEngagement: number;
  description: string;
  applicants: number;
  type: 'cash' | 'points';
  requiresVehicle?: boolean;
  requiresParent?: boolean;
  requiresPet?: boolean;
  requiredMaritalStatus?: 'single' | 'married';
  skinType?: string[];
  skinTone?: string[];
  clothingSizes?: {
    top?: string[];
    bottom?: string[];
  };

  // ADMIN ONLY: Demo mode flag for bootstrapping platform
  // 관리자 전용: 플랫폼 부트스트래핑을 위한 데모 모드 플래그
  isDemoMode?: boolean;
  demoApplicants?: Array<{
    name: string;
    followers: number;
    selected: boolean;
  }>;
}

const campaignsKo: MockCampaign[] = [
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
    deadline: '2025-05-15',
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
    description: '새로 출시되는 스킨케어 라인을 리뷰하고 홍보해주실 인플루언서를 찾습니다. 복합성/지성 피부에 최적화된 제품입니다.',
    applicants: 23,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    skinType: ['combination', 'oily'],
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
    deadline: '2025-05-20',
    requiredFollowers: 5000,
    requiredEngagement: 2.5,
    description: '베트남 전통 요리를 소개하고 레스토랑 3개 지점을 방문하여 리뷰해주실 푸드 인플루언서를 찾습니다. 여러 지점 이동을 위해 차량 소유자만 지원 가능합니다.',
    applicants: 15,
    type: 'cash',
    requiresVehicle: true,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-10',
    requiredFollowers: 50000,
    requiredEngagement: 4.0,
    description: '최신 플래그십 스마트폰의 언박싱과 상세 리뷰를 진행해주실 테크 인플루언서를 찾습니다.',
    applicants: 42,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-25',
    requiredFollowers: 20000,
    requiredEngagement: 3.5,
    description: '피트니스 앱을 사용하고 운동 루틴을 공유해주실 피트니스 인플루언서를 찾습니다.',
    applicants: 31,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-18',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: '새로운 봄 컬렉션을 착용하고 스타일링을 공유해주실 패션 인플루언서를 찾습니다. S~M 사이즈 착용 가능한 분을 찾습니다.',
    applicants: 28,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-22',
    requiredFollowers: 3000,
    requiredEngagement: 2.0,
    description: '신규 오픈한 카페의 시그니처 음료를 소개해주실 인플루언서를 찾습니다.',
    applicants: 45,
    type: 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-30',
    requiredFollowers: 30000,
    requiredEngagement: 4.5,
    description: '하롱베이 2박3일 럭셔리 투어를 체험하고 영상으로 소개해주실 여행 인플루언서를 찾습니다.',
    applicants: 67,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-17',
    requiredFollowers: 8000,
    requiredEngagement: 3.2,
    description: '신상 메이크업 팔레트를 활용한 메이크업 튜토리얼을 제작해주실 뷰티 크리에이터를 찾습니다. 밝은 톤~중간 톤 피부에 최적화된 색상입니다.',
    applicants: 52,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    skinTone: ['light', 'medium'],
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
    deadline: '2025-05-28',
    requiredFollowers: 25000,
    requiredEngagement: 5.0,
    description: '신규 모바일 게임의 플레이 영상과 리뷰를 제작해주실 게임 유튜버를 찾습니다.',
    applicants: 38,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
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
    deadline: '2025-05-21',
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
    description: '미니멀 인테리어 소품을 활용한 홈 스타일링 콘텐츠를 제작해주실 인플루언서를 찾습니다.',
    applicants: 24,
    type: 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '11',
    title: '반려동물 용품 리뷰',
    company: 'Pet Paradise',
    companyLogo: 'https://ui-avatars.com/api/?name=Pet+Paradise&background=FF9FF3&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop',
    budget: 450000,
    minBudget: 350000,
    maxBudget: 650000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'pets'] as Category[],
    location: '호치민, 베트남',
    deadline: '2025-05-23',
    requiredFollowers: 8000,
    requiredEngagement: 4.2,
    description: '반려동물과 함께 신상 펫 용품을 체험하고 리뷰해주실 펫 인플루언서를 찾습니다. 강아지 또는 고양이를 키우시는 분만 지원 가능합니다.',
    applicants: 19,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: true,
  },
  {
    id: '12',
    title: '육아 용품 체험단',
    company: 'Baby Care',
    companyLogo: 'https://ui-avatars.com/api/?name=Baby+Care&background=FFC312&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['lifestyle', 'family'] as Category[],
    location: '하노이, 베트남',
    deadline: '2025-05-26',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: '신생아~유아용 육아 용품을 사용하고 리뷰해주실 맘 인플루언서를 찾습니다. 0~5세 자녀를 둔 부모님만 지원 가능합니다.',
    applicants: 33,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: true,
    requiresPet: false,
  },

  // ============================================================================
  // DEMO MODE CAMPAIGNS (관리자만 구분 가능)
  // 플랫폼 초기 활성화를 위한 시드 캠페인
  // ============================================================================
  {
    id: 'demo-1',
    title: '프리미엄 커피 원두 리뷰',
    company: 'Vietnam Coffee House',
    companyLogo: 'https://ui-avatars.com/api/?name=Coffee&background=6F4E37&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    budget: 450000,
    minBudget: 300000,
    maxBudget: 600000,
    platforms: ['instagram', 'facebook'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: '호치민, 베트남',
    deadline: '2025-06-15',
    requiredFollowers: 8000,
    requiredEngagement: 2.8,
    description: '베트남 고산지대에서 재배한 프리미엄 아라비카 원두를 홍보해주실 인플루언서를 찾습니다.',
    applicants: 18,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen T.A.', followers: 12000, selected: true },
      { name: 'Tran M.H.', followers: 9500, selected: true },
      { name: 'Le V.T.', followers: 15000, selected: false },
    ],
  },
  {
    id: 'demo-2',
    title: '여름 패션 신상품 홍보',
    company: 'Saigon Fashion',
    companyLogo: 'https://ui-avatars.com/api/?name=Fashion&background=E91E63&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    budget: 700000,
    minBudget: 500000,
    maxBudget: 900000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['fashion', 'lifestyle'] as Category[],
    location: '하노이, 베트남',
    deadline: '2025-06-20',
    requiredFollowers: 20000,
    requiredEngagement: 3.5,
    description: '2024 여름 신상 의류 라인을 착용하고 스타일링 콘텐츠를 제작해주실 패션 인플루언서를 찾습니다.',
    applicants: 27,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Pham T.L.', followers: 25000, selected: true },
      { name: 'Hoang M.Q.', followers: 22000, selected: false },
      { name: 'Vo T.N.', followers: 28000, selected: true },
    ],
  },
  {
    id: 'demo-3',
    title: '온라인 영어 학습 앱 체험',
    company: 'EduTech Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Edu&background=2196F3&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['education', 'tech'] as Category[],
    location: '온라인',
    deadline: '2025-06-25',
    requiredFollowers: 15000,
    requiredEngagement: 4.0,
    description: 'AI 기반 영어 학습 앱을 사용하고 학습 과정을 공유해주실 에듀테크 인플루언서를 찾습니다.',
    applicants: 22,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Do H.T.', followers: 18000, selected: true },
      { name: 'Bui V.K.', followers: 16500, selected: true },
    ],
  },
  {
    id: 'demo-4',
    title: '헬스케어 스마트워치 리뷰',
    company: 'TechHealth VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Health&background=4CAF50&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop',
    budget: 800000,
    minBudget: 600000,
    maxBudget: 1000000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['tech', 'health', 'fitness'] as Category[],
    location: '호치민, 베트남',
    deadline: '2025-06-18',
    requiredFollowers: 25000,
    requiredEngagement: 3.2,
    description: '심박수, 수면 분석, 운동 추적 기능을 갖춘 스마트워치를 사용하고 리뷰해주실 인플루언서를 찾습니다.',
    applicants: 34,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen V.P.', followers: 30000, selected: true },
      { name: 'Tran T.H.', followers: 27000, selected: false },
      { name: 'Le M.T.', followers: 32000, selected: true },
    ],
  },
  {
    id: 'demo-5',
    title: '베트남 여행지 추천 콘텐츠',
    company: 'Vietnam Tourism Board',
    companyLogo: 'https://ui-avatars.com/api/?name=Tourism&background=FF9800&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
    budget: 900000,
    minBudget: 700000,
    maxBudget: 1200000,
    platforms: ['youtube', 'instagram', 'tiktok'] as Platform[],
    categories: ['travel', 'lifestyle'] as Category[],
    location: '다낭, 베트남',
    deadline: '2025-06-30',
    requiredFollowers: 30000,
    requiredEngagement: 3.8,
    description: '다낭의 숨겨진 명소를 방문하고 여행 콘텐츠를 제작해주실 트래블 인플루언서를 찾습니다.',
    applicants: 41,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Phan T.M.', followers: 35000, selected: true },
      { name: 'Ngo V.L.', followers: 32000, selected: true },
      { name: 'Dang H.Q.', followers: 38000, selected: false },
    ],
  },
  {
    id: 'demo-6',
    title: '유기농 화장품 체험단',
    company: 'Nature Beauty VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Nature&background=8BC34A&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
    budget: 650000,
    minBudget: 500000,
    maxBudget: 800000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: '하노이, 베트남',
    deadline: '2025-06-22',
    requiredFollowers: 18000,
    requiredEngagement: 4.2,
    description: '천연 성분으로 만든 비건 화장품 라인을 사용하고 리뷰해주실 뷰티 인플루언서를 찾습니다.',
    applicants: 29,
    type: 'cash',
    isDemoMode: true,
    skinType: ['sensitive', 'combination'],
    demoApplicants: [
      { name: 'Vu T.A.', followers: 22000, selected: true },
      { name: 'Ho M.L.', followers: 19000, selected: true },
    ],
  },
  {
    id: 'demo-7',
    title: '프리미엄 레스토랑 다이닝 체험',
    company: 'Fine Dining Saigon',
    companyLogo: 'https://ui-avatars.com/api/?name=Dining&background=795548&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    budget: 1200000,
    minBudget: 1000000,
    maxBudget: 1500000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: '호치민, 베트남',
    deadline: '2025-06-28',
    requiredFollowers: 40000,
    requiredEngagement: 3.5,
    description: '미슐랭 가이드 추천 레스토랑의 코스 요리를 체험하고 리뷰해주실 푸드 인플루언서를 찾습니다.',
    applicants: 38,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Trinh V.H.', followers: 45000, selected: true },
      { name: 'Cao T.N.', followers: 42000, selected: false },
    ],
  },
  {
    id: 'demo-8',
    title: '반려동물 용품 리뷰',
    company: 'Pet Care Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Pet&background=FF5722&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop',
    budget: 400000,
    minBudget: 300000,
    maxBudget: 500000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'pets'] as Category[],
    location: '온라인',
    deadline: '2025-06-24',
    requiredFollowers: 12000,
    requiredEngagement: 5.0,
    description: '강아지/고양이용 프리미엄 사료와 장난감을 체험하고 리뷰해주실 펫 인플루언서를 찾습니다.',
    applicants: 24,
    type: 'cash',
    isDemoMode: true,
    requiresPet: true,
    demoApplicants: [
      { name: 'Lam T.P.', followers: 15000, selected: true },
      { name: 'Quach V.M.', followers: 13500, selected: true },
    ],
  },
  {
    id: 'demo-9',
    title: '게이밍 의자 & 데스크 셋업',
    company: 'Gamer Zone VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Gaming&background=9C27B0&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop',
    budget: 850000,
    minBudget: 700000,
    maxBudget: 1000000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['tech', 'gaming', 'lifestyle'] as Category[],
    location: '하노이, 베트남',
    deadline: '2025-06-26',
    requiredFollowers: 28000,
    requiredEngagement: 4.5,
    description: '프로게이머급 게이밍 의자와 책상 셋업을 사용하고 언박싱부터 리뷰까지 콘텐츠를 제작해주실 게이밍 인플루언서를 찾습니다.',
    applicants: 31,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen Q.A.', followers: 32000, selected: true },
      { name: 'Pham V.T.', followers: 29000, selected: false },
    ],
  },
  {
    id: 'demo-10',
    title: '요가 & 필라테스 웨어 협찬',
    company: 'ActiveLife Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Active&background=00BCD4&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['fitness', 'health', 'fashion'] as Category[],
    location: '호치민, 베트남',
    deadline: '2025-06-29',
    requiredFollowers: 22000,
    requiredEngagement: 4.0,
    description: '기능성 요가복과 레깅스를 착용하고 운동 루틴을 공유해주실 피트니스 인플루언서를 찾습니다.',
    applicants: 26,
    type: 'cash',
    isDemoMode: true,
    clothingSizes: { top: ['S', 'M'], bottom: ['S', 'M'] },
    demoApplicants: [
      { name: 'Tran H.L.', followers: 24000, selected: true },
      { name: 'Le T.M.', followers: 21000, selected: true },
    ],
  },
];

const campaignsVi: MockCampaign[] = [
  {
    id: '1',
    title: 'Chiến dịch đánh giá sản phẩm chăm sóc da mới',
    company: 'K-Beauty Co.',
    companyLogo: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    budget: 500000,
    minBudget: 300000,
    maxBudget: 800000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-15',
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
    description: 'Tìm kiếm influencer để đánh giá và quảng bá dòng sản phẩm chăm sóc da mới ra mắt. Sản phẩm được tối ưu hóa cho da hỗn hợp/da dầu.',
    applicants: 23,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    skinType: ['combination', 'oily'],
    skinTone: ['light', 'medium'],
  },
  {
    id: '2',
    title: 'Trải nghiệm và đánh giá nhà hàng Việt Nam',
    company: 'Pho House Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Pho+House&background=4ECDC4&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    budget: 300000,
    minBudget: 200000,
    maxBudget: 500000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['food', 'travel'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-20',
    requiredFollowers: 5000,
    requiredEngagement: 2.5,
    description: 'Tìm kiếm food influencer để giới thiệu ẩm thực truyền thống Việt Nam và đánh giá 3 chi nhánh nhà hàng. Chỉ chấp nhận ứng viên có phương tiện di chuyển để ghé thăm nhiều chi nhánh.',
    applicants: 15,
    type: 'cash',
    requiresVehicle: true,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '3',
    title: 'Unboxing & Đánh giá Smartphone',
    company: 'Tech World',
    companyLogo: 'https://ui-avatars.com/api/?name=Tech+World&background=6C5CE7&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    budget: 1000000,
    minBudget: 800000,
    maxBudget: 1500000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['tech', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-05-10',
    requiredFollowers: 50000,
    requiredEngagement: 4.0,
    description: 'Tìm kiếm tech influencer để thực hiện unboxing và đánh giá chi tiết flagship smartphone mới nhất.',
    applicants: 42,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '4',
    title: 'Quảng bá ứng dụng Fitness',
    company: 'FitLife App',
    companyLogo: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    budget: 600000,
    minBudget: 400000,
    maxBudget: 800000,
    platforms: ['instagram', 'youtube', 'tiktok'] as Platform[],
    categories: ['fitness', 'health'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-05-25',
    requiredFollowers: 20000,
    requiredEngagement: 3.5,
    description: 'Tìm kiếm fitness influencer để sử dụng app và chia sẻ lịch trình tập luyện.',
    applicants: 31,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '5',
    title: 'Quảng bá sản phẩm mới thương hiệu thời trang',
    company: 'Fashion Hub',
    companyLogo: 'https://ui-avatars.com/api/?name=Fashion+Hub&background=E74C3C&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    budget: 700000,
    minBudget: 500000,
    maxBudget: 900000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['fashion', 'lifestyle'] as Category[],
    location: 'Đà Nẵng, Việt Nam',
    deadline: '2025-05-18',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: 'Tìm kiếm fashion influencer để mặc và styling bộ sưu tập xuân mới. Tìm người có thể mặc size S~M.',
    applicants: 28,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    clothingSizes: {
      top: ['S', 'M'],
      bottom: ['S', 'M'],
    },
  },
  {
    id: '6',
    title: 'Giới thiệu thực đơn mới của quán cà phê',
    company: 'Coffee Lab',
    companyLogo: 'https://ui-avatars.com/api/?name=Coffee+Lab&background=A55C2F&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    budget: 200000,
    minBudget: 150000,
    maxBudget: 300000,
    platforms: ['instagram'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-22',
    requiredFollowers: 3000,
    requiredEngagement: 2.0,
    description: 'Tìm kiếm influencer để giới thiệu đồ uống đặc trưng của quán cà phê mới khai trương.',
    applicants: 45,
    type: 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '7',
    title: 'Trải nghiệm gói du lịch',
    company: 'Vietnam Travel',
    companyLogo: 'https://ui-avatars.com/api/?name=Vietnam+Travel&background=3498DB&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
    budget: 1500000,
    minBudget: 1000000,
    maxBudget: 2000000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['travel', 'lifestyle'] as Category[],
    location: 'Vịnh Hạ Long, Việt Nam',
    deadline: '2025-05-30',
    requiredFollowers: 30000,
    requiredEngagement: 4.5,
    description: 'Tìm kiếm travel influencer để trải nghiệm tour Vịnh Hạ Long 2 ngày 3 đêm cao cấp và giới thiệu qua video.',
    applicants: 67,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '8',
    title: 'Hướng dẫn trang điểm làm đẹp',
    company: 'Glam Cosmetics',
    companyLogo: 'https://ui-avatars.com/api/?name=Glam&background=E91E63&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    budget: 400000,
    minBudget: 300000,
    maxBudget: 600000,
    platforms: ['tiktok', 'instagram'] as Platform[],
    categories: ['beauty'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-17',
    requiredFollowers: 8000,
    requiredEngagement: 3.2,
    description: 'Tìm kiếm beauty creator để tạo video hướng dẫn trang điểm với bảng màu mới. Màu sắc được tối ưu cho da sáng đến trung bình.',
    applicants: 52,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
    skinTone: ['light', 'medium'],
  },
  {
    id: '9',
    title: 'Video chơi game ứng dụng',
    company: 'GameStudio VN',
    companyLogo: 'https://ui-avatars.com/api/?name=GameStudio&background=9B59B6&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    budget: 800000,
    minBudget: 600000,
    maxBudget: 1000000,
    platforms: ['youtube', 'facebook'] as Platform[],
    categories: ['tech', 'gaming'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-05-28',
    requiredFollowers: 25000,
    requiredEngagement: 5.0,
    description: 'Tìm kiếm game youtuber để tạo video gameplay và đánh giá game mobile mới.',
    applicants: 38,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '10',
    title: 'Giới thiệu sản phẩm nội thất gia đình',
    company: 'HomeDeco',
    companyLogo: 'https://ui-avatars.com/api/?name=HomeDeco&background=16A085&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
    budget: 350000,
    minBudget: 250000,
    maxBudget: 500000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'home'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-05-21',
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
    description: 'Tìm kiếm influencer để tạo nội dung home styling với đồ trang trí tối giản.',
    applicants: 24,
    type: 'points',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: false,
  },
  {
    id: '11',
    title: 'Đánh giá sản phẩm thú cưng',
    company: 'Pet Paradise',
    companyLogo: 'https://ui-avatars.com/api/?name=Pet+Paradise&background=FF9FF3&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop',
    budget: 450000,
    minBudget: 350000,
    maxBudget: 650000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'pets'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-23',
    requiredFollowers: 8000,
    requiredEngagement: 4.2,
    description: 'Tìm kiếm pet influencer để trải nghiệm và đánh giá sản phẩm thú cưng mới cùng thú cưng của bạn. Chỉ chấp nhận người nuôi chó hoặc mèo.',
    applicants: 19,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: false,
    requiresPet: true,
  },
  {
    id: '12',
    title: 'Trải nghiệm sản phẩm chăm sóc em bé',
    company: 'Baby Care',
    companyLogo: 'https://ui-avatars.com/api/?name=Baby+Care&background=FFC312&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['lifestyle', 'family'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-05-26',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: 'Tìm kiếm mom influencer để sử dụng và đánh giá sản phẩm chăm sóc trẻ sơ sinh~trẻ nhỏ. Chỉ chấp nhận phụ huynh có con từ 0~5 tuổi.',
    applicants: 33,
    type: 'cash',
    requiresVehicle: false,
    requiresParent: true,
    requiresPet: false,
  },

  // ============================================================================
  // MICRO-INFLUENCER CAMPAIGNS (1K-10K followers)
  // ============================================================================
  {
    id: 'micro-1',
    title: 'Chụp ảnh sản phẩm trà sữa mới – Nano KOL',
    company: 'Ding Tea Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=DingTea&background=F39C12&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    budget: 150000,
    minBudget: 100000,
    maxBudget: 200000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-10',
    requiredFollowers: 1000,
    requiredEngagement: 3.0,
    description: 'Mở đầu cho micro KOL! Chỉ cần 1,000 followers. Chụp 1 ảnh thức uống + story check-in tại cửa hàng Ding Tea gần nhất. Nhận miễn phí 5 ly + 150K VND.',
    applicants: 88,
    type: 'cash',
  },
  {
    id: 'micro-2',
    title: 'Review son môi TikTok – Người mới bắt đầu',
    company: 'Romand Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Romand&background=E91E63&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1586495777744-4e6b8e8b4a7e?w=400&h=300&fit=crop',
    budget: 200000,
    minBudget: 150000,
    maxBudget: 250000,
    platforms: ['tiktok', 'instagram'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-05-15',
    requiredFollowers: 2000,
    requiredEngagement: 4.0,
    description: 'Phù hợp với beauty creator mới! Nhận 3 cây son, quay video 30-60s review màu sắc và độ bám. Không cần kinh nghiệm – chỉ cần nhiệt huyết.',
    applicants: 126,
    type: 'cash',
    skinTone: ['light', 'medium', 'tan'],
  },
  {
    id: 'micro-3',
    title: 'Đăng story quảng cáo khoá học online',
    company: 'Edumall Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Edumall&background=3498DB&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    budget: 100000,
    minBudget: 80000,
    maxBudget: 150000,
    platforms: ['facebook', 'instagram'] as Platform[],
    categories: ['education', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-05-20',
    requiredFollowers: 1500,
    requiredEngagement: 2.5,
    description: 'Đăng 3 story Instagram hoặc Facebook Story giới thiệu khoá học lập trình/thiết kế. Nhận link affiliate + 100K cố định.',
    applicants: 74,
    type: 'cash',
  },
  {
    id: 'micro-4',
    title: 'Check-in nhà hàng ăn vặt – Cần Nano KOL địa phương',
    company: 'Xoi Ga Bac Hai',
    companyLogo: 'https://ui-avatars.com/api/?name=XoiGa&background=E67E22&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    budget: 120000,
    minBudget: 100000,
    maxBudget: 180000,
    platforms: ['tiktok', 'facebook'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-05-25',
    requiredFollowers: 1000,
    requiredEngagement: 3.5,
    description: 'Quán xôi gà nổi tiếng Hà Nội cần 10 nano KOL địa phương. Đến ăn miễn phí + đăng 1 video ngắn TikTok. Nhận 120K/bài.',
    applicants: 95,
    type: 'cash',
  },
  {
    id: 'micro-5',
    title: 'Unbox sách mới – Booktok Vietnam',
    company: 'First News Publishing',
    companyLogo: 'https://ui-avatars.com/api/?name=FirstNews&background=8E44AD&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    budget: 180000,
    minBudget: 120000,
    maxBudget: 220000,
    platforms: ['tiktok', 'instagram'] as Platform[],
    categories: ['lifestyle', 'education'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-01',
    requiredFollowers: 2000,
    requiredEngagement: 3.0,
    description: 'Dành cho BookTok VN! Nhận 2 cuốn sách bestseller, quay video unbox + cảm nhận. Hợp đồng không cần kinh nghiệm trước.',
    applicants: 63,
    type: 'cash',
  },
  {
    id: 'micro-6',
    title: 'Thử thách làm đẹp tại nhà – Skincare routine',
    company: 'The Ordinary Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=TheOrdinary&background=2ECC71&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    budget: 250000,
    minBudget: 200000,
    maxBudget: 350000,
    platforms: ['tiktok', 'instagram'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-10',
    requiredFollowers: 3000,
    requiredEngagement: 4.5,
    description: 'Nhận 4 sản phẩm skincare The Ordinary trị giá 600K, quay video routine buổi sáng/tối 1 tuần. Cần ER > 4.5%.',
    applicants: 109,
    type: 'cash',
    skinType: ['dry', 'sensitive', 'combination'],
  },
  {
    id: 'micro-7',
    title: 'Đại sứ thương hiệu gym tháng 5 – Micro Fitness KOL',
    company: 'California Fitness Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=CalFit&background=E74C3C&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    budget: 300000,
    minBudget: 250000,
    maxBudget: 400000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['fitness', 'health', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-06-15',
    requiredFollowers: 3000,
    requiredEngagement: 3.5,
    description: 'Nhận 1 tháng tập miễn phí tại California Fitness + 300K. Cần đăng 2 bài + 5 story trong tháng. Mở cho micro KOL fitness!',
    applicants: 142,
    type: 'cash',
  },
  {
    id: 'micro-8',
    title: 'Review app giao đồ ăn nhanh – TikTok viral',
    company: 'ShopeeFood Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=ShopeeFood&background=FF5722&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    budget: 200000,
    minBudget: 150000,
    maxBudget: 300000,
    platforms: ['tiktok', 'facebook'] as Platform[],
    categories: ['food', 'lifestyle', 'tech'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-20',
    requiredFollowers: 2000,
    requiredEngagement: 3.0,
    description: 'Order thức ăn qua ShopeeFood, quay video "order đến unbox" kiểu vui nhộn. Đặc biệt ưu tiên video dưới 60s có nhạc trend.',
    applicants: 187,
    type: 'cash',
  },
  // ============================================================================
  // MEDIUM CAMPAIGNS (10K-30K followers)
  // ============================================================================
  {
    id: 'med-1',
    title: 'Thương hiệu laptop đồng hành sinh viên',
    company: 'Acer Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Acer&background=1ABC9C&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    budget: 800000,
    minBudget: 600000,
    maxBudget: 1000000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['tech', 'education', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-05-30',
    requiredFollowers: 10000,
    requiredEngagement: 3.5,
    description: 'Tạo video setup góc học tập / làm việc với laptop Acer Swift mới. Cần 1 video YouTube dài 8+ phút + 2 short.',
    applicants: 54,
    type: 'cash',
  },
  {
    id: 'med-2',
    title: 'Ambassador mỹ phẩm Hàn Quốc Q2/2025',
    company: 'COSRX Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=COSRX&background=FF6B9D&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    budget: 700000,
    minBudget: 500000,
    maxBudget: 900000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-05',
    requiredFollowers: 8000,
    requiredEngagement: 4.0,
    description: 'Nhận bộ sản phẩm COSRX trị giá 1.2 triệu. Tạo 2 bài review Instagram + 1 Reel so sánh trước/sau 4 tuần dùng sản phẩm.',
    applicants: 93,
    type: 'cash',
    skinType: ['acne', 'oily', 'combination'],
  },
  {
    id: 'med-3',
    title: 'Du lịch Phú Quốc – Travel content creator',
    company: 'Vinpearl Resort',
    companyLogo: 'https://ui-avatars.com/api/?name=Vinpearl&background=1E88E5&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
    budget: 2000000,
    minBudget: 1500000,
    maxBudget: 3000000,
    platforms: ['youtube', 'instagram', 'tiktok'] as Platform[],
    categories: ['travel', 'lifestyle'] as Category[],
    location: 'Phú Quốc, Việt Nam',
    deadline: '2025-07-01',
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
    description: 'Được tài trợ 2 đêm resort 5 sao tại Phú Quốc + 2,000,000 VND. Tạo 1 video vlog YouTube + nội dung Instagram đầy đủ.',
    applicants: 211,
    type: 'cash',
  },
  {
    id: 'med-4',
    title: 'Giới thiệu ứng dụng đầu tư chứng khoán',
    company: 'FPTS Securities',
    companyLogo: 'https://ui-avatars.com/api/?name=FPTS&background=2C3E50&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    budget: 900000,
    minBudget: 700000,
    maxBudget: 1200000,
    platforms: ['youtube', 'facebook'] as Platform[],
    categories: ['finance', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-25',
    requiredFollowers: 20000,
    requiredEngagement: 2.8,
    description: 'Cần finance influencer giải thích cách đầu tư chứng khoán cơ bản, review app FPTS. Nội dung giáo dục tài chính.',
    applicants: 47,
    type: 'cash',
  },
  {
    id: 'med-5',
    title: 'TikTok challenge – Món ăn vặt Hàn Quốc',
    company: 'GS25 Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=GS25&background=003087&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    budget: 500000,
    minBudget: 400000,
    maxBudget: 650000,
    platforms: ['tiktok'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-05-28',
    requiredFollowers: 5000,
    requiredEngagement: 5.0,
    description: 'Thực hiện challenge "blind test đồ ăn vặt Hàn Quốc" tại GS25. Ưu tiên video vui nhộn, có phản ứng thật, dễ viral.',
    applicants: 168,
    type: 'cash',
  },
  {
    id: 'med-6',
    title: 'Ambassador thương hiệu nước tẩy trang',
    company: 'Bioderma Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Bioderma&background=6C3483&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=400&h=300&fit=crop',
    budget: 600000,
    minBudget: 450000,
    maxBudget: 800000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-08',
    requiredFollowers: 7000,
    requiredEngagement: 3.5,
    description: 'Nhận bộ sản phẩm tẩy trang Bioderma Sensibio H2O. Quay video "makeup removal challenge" + routine chăm sóc da buổi tối.',
    applicants: 79,
    type: 'cash',
    skinType: ['sensitive', 'dry', 'normal'],
  },
  // ============================================================================
  // DEMO MODE CAMPAIGNS (Chỉ quản trị viên mới biết)
  // Chiến dịch seed để kích hoạt nền tảng ban đầu
  // ============================================================================
  {
    id: 'demo-1',
    title: 'Đánh giá cà phê hạt cao cấp',
    company: 'Vietnam Coffee House',
    companyLogo: 'https://ui-avatars.com/api/?name=Coffee&background=6F4E37&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    budget: 450000,
    minBudget: 300000,
    maxBudget: 600000,
    platforms: ['instagram', 'facebook'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-06-15',
    requiredFollowers: 8000,
    requiredEngagement: 2.8,
    description: 'Tìm kiếm influencer để quảng bá hạt cà phê Arabica cao cấp được trồng tại vùng cao Việt Nam.',
    applicants: 18,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen T.A.', followers: 12000, selected: true },
      { name: 'Tran M.H.', followers: 9500, selected: true },
      { name: 'Le V.T.', followers: 15000, selected: false },
    ],
  },
  {
    id: 'demo-2',
    title: 'Quảng bá thời trang mùa hè mới',
    company: 'Saigon Fashion',
    companyLogo: 'https://ui-avatars.com/api/?name=Fashion&background=E91E63&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    budget: 700000,
    minBudget: 500000,
    maxBudget: 900000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['fashion', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-06-20',
    requiredFollowers: 20000,
    requiredEngagement: 3.5,
    description: 'Tìm kiếm fashion influencer để mặc và tạo nội dung styling với dòng sản phẩm thời trang hè 2024.',
    applicants: 27,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Pham T.L.', followers: 25000, selected: true },
      { name: 'Hoang M.Q.', followers: 22000, selected: false },
      { name: 'Vo T.N.', followers: 28000, selected: true },
    ],
  },
  {
    id: 'demo-3',
    title: 'Trải nghiệm app học tiếng Anh online',
    company: 'EduTech Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Edu&background=2196F3&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['education', 'tech'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-25',
    requiredFollowers: 15000,
    requiredEngagement: 4.0,
    description: 'Tìm kiếm edutech influencer để sử dụng app học tiếng Anh AI và chia sẻ quá trình học tập.',
    applicants: 22,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Do H.T.', followers: 18000, selected: true },
      { name: 'Bui V.K.', followers: 16500, selected: true },
    ],
  },
  {
    id: 'demo-4',
    title: 'Đánh giá smartwatch chăm sóc sức khỏe',
    company: 'TechHealth VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Health&background=4CAF50&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop',
    budget: 800000,
    minBudget: 600000,
    maxBudget: 1000000,
    platforms: ['youtube', 'instagram'] as Platform[],
    categories: ['tech', 'health', 'fitness'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-06-18',
    requiredFollowers: 25000,
    requiredEngagement: 3.2,
    description: 'Tìm kiếm influencer để sử dụng và đánh giá smartwatch có tính năng theo dõi nhịp tim, giấc ngủ và tập luyện.',
    applicants: 34,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen V.P.', followers: 30000, selected: true },
      { name: 'Tran T.H.', followers: 27000, selected: false },
      { name: 'Le M.T.', followers: 32000, selected: true },
    ],
  },
  {
    id: 'demo-5',
    title: 'Nội dung giới thiệu điểm du lịch Việt Nam',
    company: 'Vietnam Tourism Board',
    companyLogo: 'https://ui-avatars.com/api/?name=Tourism&background=FF9800&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop',
    budget: 900000,
    minBudget: 700000,
    maxBudget: 1200000,
    platforms: ['youtube', 'instagram', 'tiktok'] as Platform[],
    categories: ['travel', 'lifestyle'] as Category[],
    location: 'Đà Nẵng, Việt Nam',
    deadline: '2025-06-30',
    requiredFollowers: 30000,
    requiredEngagement: 3.8,
    description: 'Tìm kiếm travel influencer để ghé thăm các địa điểm ẩn ở Đà Nẵng và tạo nội dung du lịch.',
    applicants: 41,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Phan T.M.', followers: 35000, selected: true },
      { name: 'Ngo V.L.', followers: 32000, selected: true },
      { name: 'Dang H.Q.', followers: 38000, selected: false },
    ],
  },
  {
    id: 'demo-6',
    title: 'Nhóm trải nghiệm mỹ phẩm hữu cơ',
    company: 'Nature Beauty VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Nature&background=8BC34A&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
    budget: 650000,
    minBudget: 500000,
    maxBudget: 800000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['beauty', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-06-22',
    requiredFollowers: 18000,
    requiredEngagement: 4.2,
    description: 'Tìm kiếm beauty influencer để sử dụng và đánh giá dòng mỹ phẩm vegan làm từ thành phần tự nhiên.',
    applicants: 29,
    type: 'cash',
    isDemoMode: true,
    skinType: ['sensitive', 'combination'],
    demoApplicants: [
      { name: 'Vu T.A.', followers: 22000, selected: true },
      { name: 'Ho M.L.', followers: 19000, selected: true },
    ],
  },
  {
    id: 'demo-7',
    title: 'Trải nghiệm ẩm thực nhà hàng cao cấp',
    company: 'Fine Dining Saigon',
    companyLogo: 'https://ui-avatars.com/api/?name=Dining&background=795548&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    budget: 1200000,
    minBudget: 1000000,
    maxBudget: 1500000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['food', 'lifestyle'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-06-28',
    requiredFollowers: 40000,
    requiredEngagement: 3.5,
    description: 'Tìm kiếm food influencer để trải nghiệm thực đơn course tại nhà hàng được Michelin Guide giới thiệu.',
    applicants: 38,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Trinh V.H.', followers: 45000, selected: true },
      { name: 'Cao T.N.', followers: 42000, selected: false },
    ],
  },
  {
    id: 'demo-8',
    title: 'Đánh giá sản phẩm thú cưng',
    company: 'Pet Care Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Pet&background=FF5722&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop',
    budget: 400000,
    minBudget: 300000,
    maxBudget: 500000,
    platforms: ['instagram', 'tiktok'] as Platform[],
    categories: ['lifestyle', 'pets'] as Category[],
    location: 'Trực tuyến',
    deadline: '2025-06-24',
    requiredFollowers: 12000,
    requiredEngagement: 5.0,
    description: 'Tìm kiếm pet influencer để trải nghiệm và đánh giá thức ăn cao cấp & đồ chơi cho chó/mèo.',
    applicants: 24,
    type: 'cash',
    isDemoMode: true,
    requiresPet: true,
    demoApplicants: [
      { name: 'Lam T.P.', followers: 15000, selected: true },
      { name: 'Quach V.M.', followers: 13500, selected: true },
    ],
  },
  {
    id: 'demo-9',
    title: 'Ghế gaming & thiết lập bàn làm việc',
    company: 'Gamer Zone VN',
    companyLogo: 'https://ui-avatars.com/api/?name=Gaming&background=9C27B0&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop',
    budget: 850000,
    minBudget: 700000,
    maxBudget: 1000000,
    platforms: ['youtube', 'tiktok'] as Platform[],
    categories: ['tech', 'gaming', 'lifestyle'] as Category[],
    location: 'Hà Nội, Việt Nam',
    deadline: '2025-06-26',
    requiredFollowers: 28000,
    requiredEngagement: 4.5,
    description: 'Tìm kiếm gaming influencer để sử dụng và tạo nội dung từ unboxing đến review ghế gaming & bàn cấp pro-gamer.',
    applicants: 31,
    type: 'cash',
    isDemoMode: true,
    demoApplicants: [
      { name: 'Nguyen Q.A.', followers: 32000, selected: true },
      { name: 'Pham V.T.', followers: 29000, selected: false },
    ],
  },
  {
    id: 'demo-10',
    title: 'Tài trợ đồ tập yoga & pilates',
    company: 'ActiveLife Vietnam',
    companyLogo: 'https://ui-avatars.com/api/?name=Active&background=00BCD4&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    budget: 550000,
    minBudget: 400000,
    maxBudget: 700000,
    platforms: ['instagram', 'youtube'] as Platform[],
    categories: ['fitness', 'health', 'fashion'] as Category[],
    location: 'TP. Hồ Chí Minh, Việt Nam',
    deadline: '2025-06-29',
    requiredFollowers: 22000,
    requiredEngagement: 4.0,
    description: 'Tìm kiếm fitness influencer để mặc quần áo yoga chức năng & legging và chia sẻ bài tập luyện.',
    applicants: 26,
    type: 'cash',
    isDemoMode: true,
    clothingSizes: { top: ['S', 'M'], bottom: ['S', 'M'] },
    demoApplicants: [
      { name: 'Tran H.L.', followers: 24000, selected: true },
      { name: 'Le T.M.', followers: 21000, selected: true },
    ],
  },
];

// ============================================================================
// USER PROFILE MOCK DATA
// ============================================================================

export interface MockUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  zalo: string;
  avatar: string;
  location: string;
  bio: string;
  gender: 'female' | 'male' | 'other';
  ageRange: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  education: string;
  occupation: string;
  occupationDetail: string;
  hasVehicle: boolean;
  housingType: string;
  ownershipStatus: string;
  hasChildren: boolean;
  skinType: string;
  skinTone: string;
  hairType: string;
  categories: string[];
  hasPets: boolean;
  phoneModel: string;
  smartDevices: string[];
  hobbies: string[];
  // Influencer specific fields (for campaigns page compatibility)
  followers: number;
  engagementRate: number;
  platforms: string[];
  // Social accounts (for profile page)
  socialAccounts: Array<{
    platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook';
    username: string;
    followers: number;
    verified: boolean;
    connected: boolean;
    lastUpdated: string;
  }>;
  // Stats (for profile page)
  stats: {
    completedCampaigns: number;
    rating: number;
  };
}

const userProfileKo: MockUserProfile = {
  id: '1',
  name: '김민수',
  email: 'kimminsu@example.com',
  phone: '010-1234-5678',
  zalo: '0901234567',
  avatar: 'https://ui-avatars.com/api/?name=Kim+Minsu&background=FF6B6B&color=fff&size=200',
  location: '서울, 한국',
  bio: '뷰티 & 라이프스타일 인플루언서입니다. 다양한 브랜드와 협업하여 진솔한 리뷰를 전달합니다.',
  gender: 'female',
  ageRange: '25-34',
  maritalStatus: 'single',
  education: 'bachelor',
  occupation: 'creative',
  occupationDetail: '뷰티 크리에이터',
  hasVehicle: false,
  housingType: 'apartment',
  ownershipStatus: 'rented',
  hasChildren: false,
  skinType: 'combination',
  skinTone: 'light',
  hairType: 'straight',
  categories: ['beauty', 'lifestyle'],
  hasPets: false,
  phoneModel: 'iPhone 15 Pro',
  smartDevices: ['smartwatch', 'earbuds'],
  hobbies: ['photography', 'travel', 'cooking'],
  followers: 15000,
  engagementRate: 4.5,
  platforms: ['instagram', 'tiktok'],
  socialAccounts: [
    {
      platform: 'instagram',
      username: '@kimminsu_beauty',
      followers: 125000,
      verified: true,
      connected: true,
      lastUpdated: '2024-02-13',
    },
    {
      platform: 'tiktok',
      username: '@kimminsu_official',
      followers: 89000,
      verified: false,
      connected: true,
      lastUpdated: '2024-02-13',
    },
    {
      platform: 'youtube',
      username: '김민수 뷰티',
      followers: 45000,
      verified: true,
      connected: true,
      lastUpdated: '2024-02-10',
    },
    {
      platform: 'facebook',
      username: 'kimminsu.beauty',
      followers: 12000,
      verified: false,
      connected: false,
      lastUpdated: '2024-01-20',
    },
  ],
  stats: {
    completedCampaigns: 24,
    rating: 4.8,
  },
};

const userProfileVi: MockUserProfile = {
  id: '1',
  name: 'Nguyễn Minh Anh',
  email: 'nguyenminhanh@example.com',
  phone: '0901-234-5678',
  zalo: '0901234567',
  avatar: 'https://ui-avatars.com/api/?name=Nguyen+Minh+Anh&background=FF6B6B&color=fff&size=200',
  location: 'TP. Hồ Chí Minh, Việt Nam',
  bio: 'Influencer về làm đẹp & phong cách sống. Hợp tác với nhiều thương hiệu để chia sẻ đánh giá chân thực.',
  gender: 'female',
  ageRange: '25-34',
  maritalStatus: 'single',
  education: 'bachelor',
  occupation: 'creative',
  occupationDetail: 'Beauty Creator',
  hasVehicle: false,
  housingType: 'apartment',
  ownershipStatus: 'rented',
  hasChildren: false,
  skinType: 'combination',
  skinTone: 'light',
  hairType: 'straight',
  categories: ['beauty', 'lifestyle'],
  hasPets: false,
  phoneModel: 'iPhone 15 Pro',
  smartDevices: ['smartwatch', 'earbuds'],
  hobbies: ['photography', 'travel', 'cooking'],
  followers: 15000,
  engagementRate: 4.5,
  platforms: ['instagram', 'tiktok'],
  socialAccounts: [
    {
      platform: 'instagram',
      username: '@minhanh_beauty',
      followers: 125000,
      verified: true,
      connected: true,
      lastUpdated: '2024-02-13',
    },
    {
      platform: 'tiktok',
      username: '@minhanh_official',
      followers: 89000,
      verified: false,
      connected: true,
      lastUpdated: '2024-02-13',
    },
    {
      platform: 'youtube',
      username: 'Minh Anh Beauty',
      followers: 45000,
      verified: true,
      connected: true,
      lastUpdated: '2024-02-10',
    },
    {
      platform: 'facebook',
      username: 'minhanh.beauty',
      followers: 12000,
      verified: false,
      connected: false,
      lastUpdated: '2024-01-20',
    },
  ],
  stats: {
    completedCampaigns: 24,
    rating: 4.8,
  },
};

// ============================================================================
// NOTIFICATIONS MOCK DATA
// ============================================================================

export interface MockNotification {
  id: string;
  type: 'campaign' | 'payment' | 'share' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const notificationsKo: MockNotification[] = [
  {
    id: '1',
    type: 'share',
    title: '공유 승인 완료',
    message: '신규 스킨케어 제품 리뷰 캠페인 공유가 승인되었습니다. 5,000 VND가 적립되었습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    actionUrl: '/main/influencer/shares',
  },
  {
    id: '2',
    type: 'campaign',
    title: '캠페인 승인됨',
    message: '베트남 레스토랑 체험 리뷰 캠페인에 선정되셨습니다!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    actionUrl: '/main/influencer/campaigns/2',
  },
  {
    id: '3',
    type: 'payment',
    title: '포인트 적립',
    message: '스마트폰 언박싱 & 리뷰 캠페인 완료로 800,000 VND가 적립되었습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    actionUrl: '/main/influencer/wallet',
  },
  {
    id: '4',
    type: 'campaign',
    title: '마감 임박',
    message: '피트니스 앱 프로모션 캠페인이 3일 후 마감됩니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    actionUrl: '/main/influencer/campaigns/4',
  },
  {
    id: '5',
    type: 'system',
    title: '신규 기능 안내',
    message: '이제 같은 캠페인을 여러 곳에 공유하고 각각 포인트를 받을 수 있습니다!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: true,
  },
];

const notificationsVi: MockNotification[] = [
  {
    id: '1',
    type: 'share',
    title: 'Phê duyệt chia sẻ hoàn tất',
    message: 'Chia sẻ chiến dịch đánh giá sản phẩm chăm sóc da mới đã được phê duyệt. 5,000 VND đã được cộng vào tài khoản.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    actionUrl: '/main/influencer/shares',
  },
  {
    id: '2',
    type: 'campaign',
    title: 'Chiến dịch được phê duyệt',
    message: 'Bạn đã được chọn tham gia chiến dịch trải nghiệm và đánh giá nhà hàng Việt Nam!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    actionUrl: '/main/influencer/campaigns/2',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Cộng điểm',
    message: 'Hoàn thành chiến dịch Unboxing & Đánh giá Smartphone, 800,000 VND đã được cộng vào tài khoản.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    actionUrl: '/main/influencer/wallet',
  },
  {
    id: '4',
    type: 'campaign',
    title: 'Sắp hết hạn',
    message: 'Chiến dịch quảng bá ứng dụng Fitness sẽ kết thúc sau 3 ngày.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    actionUrl: '/main/influencer/campaigns/4',
  },
  {
    id: '5',
    type: 'system',
    title: 'Hướng dẫn tính năng mới',
    message: 'Giờ đây bạn có thể chia sẻ cùng một chiến dịch ở nhiều nơi và nhận điểm cho mỗi lần chia sẻ!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: true,
  },
];

// ============================================================================
// JOBS MOCK DATA
// ============================================================================

export type JobStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';

export interface MockJob {
  id: string;
  campaignId: string;
  title: string;
  company: string;
  companyLogo: string;
  budget: number;
  status: JobStatus;
  deadline: string;
  appliedAt?: string;
  startedAt?: string;
  completedAt?: string;
  submittedContent?: string;
  feedback?: string;
}

const jobsKo: MockJob[] = [
  {
    id: '1',
    campaignId: '1',
    title: '신규 스킨케어 제품 광고',
    company: 'Beauty Brand',
    companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
    budget: 500000,
    status: 'in_progress',
    deadline: '2024-02-15',
    appliedAt: '2024-01-20',
    startedAt: '2024-01-25',
  },
  {
    id: '2',
    campaignId: '2',
    title: '고급 레스토랑 리뷰',
    company: 'Food Paradise',
    companyLogo: 'https://ui-avatars.com/api/?name=Food+Paradise&background=4ECDC4&color=fff',
    budget: 300000,
    status: 'pending',
    deadline: '2024-02-20',
    appliedAt: '2024-02-01',
  },
  {
    id: '3',
    campaignId: '3',
    title: '플래그십 스마트폰 언박싱',
    company: 'Tech Store',
    companyLogo: 'https://ui-avatars.com/api/?name=Tech+Store&background=6C5CE7&color=fff',
    budget: 800000,
    status: 'completed',
    deadline: '2024-02-10',
    appliedAt: '2024-01-15',
    startedAt: '2024-01-18',
    completedAt: '2024-02-08',
  },
  {
    id: '4',
    campaignId: '4',
    title: '피트니스 앱 프로모션',
    company: 'FitLife App',
    companyLogo: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
    budget: 400000,
    status: 'rejected',
    deadline: '2024-02-18',
    appliedAt: '2024-01-28',
    feedback: '팔로워 수가 요구사항에 미달되었습니다.',
  },
  {
    id: '5',
    campaignId: '5',
    title: '카페 신메뉴 홍보',
    company: 'Cafe Mocha',
    companyLogo: 'https://ui-avatars.com/api/?name=Cafe+Mocha&background=FFA502&color=fff',
    budget: 250000,
    status: 'accepted',
    deadline: '2024-02-22',
    appliedAt: '2024-02-02',
  },
];

const jobsVi: MockJob[] = [
  {
    id: '1',
    campaignId: '1',
    title: 'Quảng cáo sản phẩm chăm sóc da mới',
    company: 'Beauty Brand',
    companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
    budget: 500000,
    status: 'in_progress',
    deadline: '2024-02-15',
    appliedAt: '2024-01-20',
    startedAt: '2024-01-25',
  },
  {
    id: '2',
    campaignId: '2',
    title: 'Đánh giá nhà hàng cao cấp',
    company: 'Food Paradise',
    companyLogo: 'https://ui-avatars.com/api/?name=Food+Paradise&background=4ECDC4&color=fff',
    budget: 300000,
    status: 'pending',
    deadline: '2024-02-20',
    appliedAt: '2024-02-01',
  },
  {
    id: '3',
    campaignId: '3',
    title: 'Unboxing smartphone flagship',
    company: 'Tech Store',
    companyLogo: 'https://ui-avatars.com/api/?name=Tech+Store&background=6C5CE7&color=fff',
    budget: 800000,
    status: 'completed',
    deadline: '2024-02-10',
    appliedAt: '2024-01-15',
    startedAt: '2024-01-18',
    completedAt: '2024-02-08',
  },
  {
    id: '4',
    campaignId: '4',
    title: 'Quảng bá ứng dụng fitness',
    company: 'FitLife App',
    companyLogo: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
    budget: 400000,
    status: 'rejected',
    deadline: '2024-02-18',
    appliedAt: '2024-01-28',
    feedback: 'Số lượng người theo dõi chưa đạt yêu cầu.',
  },
  {
    id: '5',
    campaignId: '5',
    title: 'Quảng bá thực đơn mới quán cà phê',
    company: 'Cafe Mocha',
    companyLogo: 'https://ui-avatars.com/api/?name=Cafe+Mocha&background=FFA502&color=fff',
    budget: 250000,
    status: 'accepted',
    deadline: '2024-02-22',
    appliedAt: '2024-02-02',
  },
];

// ============================================================================
// REVIEWS/PORTFOLIO MOCK DATA
// ============================================================================

export interface MockPortfolio {
  id: string;
  campaignTitle: string;
  brand: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  thumbnail: string;
  contentUrl: string;
  publishedDate: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagement: number;
  };
  rating: number;
  feedback: string;
  category: string;
}

const portfolioKo: MockPortfolio[] = [
  {
    id: '1',
    campaignTitle: '신규 스킨케어 제품 리뷰',
    brand: 'Beauty Brand',
    platform: 'instagram',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    contentUrl: 'https://instagram.com/p/abc123',
    publishedDate: '2024-02-10',
    metrics: {
      views: 25000,
      likes: 3200,
      comments: 450,
      shares: 180,
      engagement: 14.7,
    },
    rating: 5.0,
    feedback: '매우 만족스러운 협업이었습니다!',
    category: 'beauty',
  },
  {
    id: '2',
    campaignTitle: '베트남 레스토랑 체험',
    brand: 'Pho House Vietnam',
    platform: 'tiktok',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    contentUrl: 'https://tiktok.com/@user/video/123',
    publishedDate: '2024-02-08',
    metrics: {
      views: 45000,
      likes: 5800,
      comments: 780,
      shares: 320,
      engagement: 15.3,
    },
    rating: 4.5,
    feedback: '음식 촬영 각도가 훌륭했습니다.',
    category: 'food',
  },
  {
    id: '3',
    campaignTitle: '스마트폰 상세 리뷰',
    brand: 'Tech World',
    platform: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    contentUrl: 'https://youtube.com/watch?v=xyz789',
    publishedDate: '2024-02-05',
    metrics: {
      views: 82000,
      likes: 4200,
      comments: 320,
      shares: 145,
      engagement: 5.7,
    },
    rating: 5.0,
    feedback: '전문적이고 상세한 리뷰였습니다.',
    category: 'tech',
  },
];

const portfolioVi: MockPortfolio[] = [
  {
    id: '1',
    campaignTitle: 'Đánh giá sản phẩm chăm sóc da mới',
    brand: 'Beauty Brand',
    platform: 'instagram',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    contentUrl: 'https://instagram.com/p/abc123',
    publishedDate: '2024-02-10',
    metrics: {
      views: 25000,
      likes: 3200,
      comments: 450,
      shares: 180,
      engagement: 14.7,
    },
    rating: 5.0,
    feedback: 'Hợp tác rất hài lòng!',
    category: 'beauty',
  },
  {
    id: '2',
    campaignTitle: 'Trải nghiệm nhà hàng Việt Nam',
    brand: 'Pho House Vietnam',
    platform: 'tiktok',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    contentUrl: 'https://tiktok.com/@user/video/123',
    publishedDate: '2024-02-08',
    metrics: {
      views: 45000,
      likes: 5800,
      comments: 780,
      shares: 320,
      engagement: 15.3,
    },
    rating: 4.5,
    feedback: 'Góc chụp món ăn rất tuyệt vời.',
    category: 'food',
  },
  {
    id: '3',
    campaignTitle: 'Đánh giá chi tiết smartphone',
    brand: 'Tech World',
    platform: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    contentUrl: 'https://youtube.com/watch?v=xyz789',
    publishedDate: '2024-02-05',
    metrics: {
      views: 82000,
      likes: 4200,
      comments: 320,
      shares: 145,
      engagement: 5.7,
    },
    rating: 5.0,
    feedback: 'Đánh giá chuyên nghiệp và chi tiết.',
    category: 'tech',
  },
];

// ============================================================================
// COMPLETED CAMPAIGNS MOCK DATA
// ============================================================================

export interface MockCompletedCampaign {
  id: string;
  title: string;
  company: string;
  thumbnail: string;
  type: 'cash' | 'points';
  reward: number;
  completedDate: string;
  rating?: number;
  reviewText?: string;
  location: string;
  platform: string;
  status: 'paid' | 'pending_payment';
}

const completedCampaignsKo: MockCompletedCampaign[] = [
  {
    id: '1',
    title: '신규 스킨케어 제품 리뷰 캠페인',
    company: 'K-Beauty Co.',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 500000,
    completedDate: '2024-02-10',
    rating: 5,
    reviewText: '매우 만족스러운 협업이었습니다!',
    location: '서울, 한국',
    platform: 'Instagram',
    status: 'paid',
  },
  {
    id: '2',
    title: '베트남 레스토랑 체험 리뷰',
    company: 'Pho House Vietnam',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 300000,
    completedDate: '2024-02-08',
    rating: 4,
    location: '호치민, 베트남',
    platform: 'TikTok',
    status: 'paid',
  },
  {
    id: '3',
    title: '스마트폰 언박싱 & 리뷰',
    company: 'Tech World',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 800000,
    completedDate: '2024-02-05',
    rating: 5,
    location: '서울, 한국',
    platform: 'YouTube',
    status: 'pending_payment',
  },
  {
    id: '4',
    title: '출석 체크 보너스 - 7일 연속 달성',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    type: 'points',
    reward: 10000,
    completedDate: '2024-02-12',
    location: '온라인',
    platform: 'Platform',
    status: 'paid',
  },
  {
    id: '5',
    title: 'SNS 공유 이벤트',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    type: 'points',
    reward: 5000,
    completedDate: '2024-02-11',
    location: '온라인',
    platform: 'Multi-platform',
    status: 'paid',
  },
  {
    id: '6',
    title: '친구 추천 보너스',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    type: 'points',
    reward: 30000,
    completedDate: '2024-02-09',
    location: '온라인',
    platform: 'Platform',
    status: 'paid',
  },
];

const completedCampaignsVi: MockCompletedCampaign[] = [
  {
    id: '1',
    title: 'Chiến dịch đánh giá sản phẩm chăm sóc da mới',
    company: 'K-Beauty Co.',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 500000,
    completedDate: '2024-02-10',
    rating: 5,
    reviewText: 'Hợp tác rất hài lòng!',
    location: 'Seoul, Hàn Quốc',
    platform: 'Instagram',
    status: 'paid',
  },
  {
    id: '2',
    title: 'Trải nghiệm và đánh giá nhà hàng Việt Nam',
    company: 'Pho House Vietnam',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 300000,
    completedDate: '2024-02-08',
    rating: 4,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    platform: 'TikTok',
    status: 'paid',
  },
  {
    id: '3',
    title: 'Unboxing & Đánh giá Smartphone',
    company: 'Tech World',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    type: 'cash',
    reward: 800000,
    completedDate: '2024-02-05',
    rating: 5,
    location: 'Seoul, Hàn Quốc',
    platform: 'YouTube',
    status: 'pending_payment',
  },
  {
    id: '4',
    title: 'Thưởng điểm danh - Đạt 7 ngày liên tục',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    type: 'points',
    reward: 10000,
    completedDate: '2024-02-12',
    location: 'Trực tuyến',
    platform: 'Platform',
    status: 'paid',
  },
  {
    id: '5',
    title: 'Sự kiện chia sẻ SNS',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    type: 'points',
    reward: 5000,
    completedDate: '2024-02-11',
    location: 'Trực tuyến',
    platform: 'Multi-platform',
    status: 'paid',
  },
  {
    id: '6',
    title: 'Thưởng giới thiệu bạn bè',
    company: 'Exfluencer VN',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    type: 'points',
    reward: 30000,
    completedDate: '2024-02-09',
    location: 'Trực tuyến',
    platform: 'Platform',
    status: 'paid',
  },
];

// ============================================================================
// WALLET/TRANSACTION MOCK DATA
// ============================================================================

export interface MockBankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
}

const bankAccountsKo: MockBankAccount[] = [
  {
    id: '1',
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountHolder: '김민수',
    isDefault: true,
  },
  {
    id: '2',
    bankName: 'BIDV',
    accountNumber: '0987654321',
    accountHolder: '김민수',
    isDefault: false,
  },
];

const bankAccountsVi: MockBankAccount[] = [
  {
    id: '1',
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountHolder: 'Nguyễn Minh Anh',
    isDefault: true,
  },
  {
    id: '2',
    bankName: 'BIDV',
    accountNumber: '0987654321',
    accountHolder: 'Nguyễn Minh Anh',
    isDefault: false,
  },
];

export interface MockTransaction {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  withdrawalMethod?: string;
}

export interface MockTransactionHistory {
  cash: MockTransaction[];
  shopping: MockTransaction[];
}

const transactionsKo: MockTransactionHistory = {
  cash: [
    {
      id: '1',
      type: 'credit',
      description: '신규 스킨케어 제품 광고',
      amount: 500000,
      date: '2024-02-10',
      timestamp: '2024-02-10T14:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'debit',
      description: '출금',
      amount: -300000,
      date: '2024-02-08',
      timestamp: '2024-02-08T10:15:00',
      status: 'completed',
    },
    {
      id: '3',
      type: 'credit',
      description: '스마트폰 언박싱 리뷰',
      amount: 800000,
      date: '2024-02-05',
      timestamp: '2024-02-05T16:45:00',
      status: 'pending',
    },
  ],
  shopping: [
    {
      id: 's1',
      type: 'debit',
      description: '응모권 구매 - KOREA DREAM',
      amount: -100000,
      date: '2024-02-12',
      timestamp: '2024-02-12T09:20:00',
      status: 'completed',
    },
    {
      id: 's2',
      type: 'credit',
      description: '캠페인 완료 보상',
      amount: 50000,
      date: '2024-02-09',
      timestamp: '2024-02-09T13:00:00',
      status: 'completed',
    },
    {
      id: 's3',
      type: 'debit',
      description: '응모권 구매 - iPhone 15 Pro',
      amount: -500000,
      date: '2024-02-06',
      timestamp: '2024-02-06T11:30:00',
      status: 'completed',
    },
  ],
};

const transactionsVi: MockTransactionHistory = {
  cash: [
    {
      id: '1',
      type: 'credit',
      description: 'Quảng cáo sản phẩm chăm sóc da mới',
      amount: 500000,
      date: '2024-02-10',
      timestamp: '2024-02-10T14:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'debit',
      description: 'Rút tiền',
      amount: -300000,
      date: '2024-02-08',
      timestamp: '2024-02-08T10:15:00',
      status: 'completed',
    },
    {
      id: '3',
      type: 'credit',
      description: 'Unboxing đánh giá smartphone',
      amount: 800000,
      date: '2024-02-05',
      timestamp: '2024-02-05T16:45:00',
      status: 'pending',
    },
  ],
  shopping: [
    {
      id: 's1',
      type: 'debit',
      description: 'Mua vé dự thưởng - KOREA DREAM',
      amount: -100000,
      date: '2024-02-12',
      timestamp: '2024-02-12T09:20:00',
      status: 'completed',
    },
    {
      id: 's2',
      type: 'credit',
      description: 'Thưởng hoàn thành chiến dịch',
      amount: 50000,
      date: '2024-02-09',
      timestamp: '2024-02-09T13:00:00',
      status: 'completed',
    },
    {
      id: 's3',
      type: 'debit',
      description: 'Mua vé dự thưởng - iPhone 15 Pro',
      amount: -500000,
      date: '2024-02-06',
      timestamp: '2024-02-06T11:30:00',
      status: 'completed',
    },
  ],
};

// ============================================================================
// REVIEWS MOCK DATA
// ============================================================================

export interface RatingBreakdown {
  professionalism: number; // 전문성
  punctuality: number; // 일정 준수
  communication: number; // 소통
  creativity: number; // 창의성
  performance: number; // 성과
}

export interface MockReview {
  id: string;
  campaignTitle: string;
  advertiser: string;
  advertiserAvatar: string;
  ratings: RatingBreakdown;
  comment: string;
  date: string;
  helpful: number;
}

const reviewsKo: MockReview[] = [
  {
    id: '1',
    campaignTitle: '스킨케어 제품 리뷰',
    advertiser: 'Beauty Brand',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 5,
      performance: 5,
    },
    comment: '매우 전문적이고 성실하게 진행해주셨습니다. 콘텐츠 퀄리티가 높아서 만족스러웠습니다. 일정도 완벽하게 지켜주셨고, 소통도 원활했습니다. 다음에도 꼭 함께 하고 싶습니다!',
    date: '2024-02-01',
    helpful: 12,
  },
  {
    id: '2',
    campaignTitle: '메이크업 튜토리얼',
    advertiser: 'Cosmetic Co.',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Cosmetic+Co&background=4ECDC4&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 4,
      creativity: 5,
      performance: 5,
    },
    comment: '기대 이상의 결과물을 보여주셨어요. 팔로워 반응도 아주 좋았습니다. 크리에이티브한 아이디어가 돋보였습니다. 강력 추천합니다!',
    date: '2024-01-20',
    helpful: 8,
  },
  {
    id: '3',
    campaignTitle: '패션 룩북',
    advertiser: 'Fashion Store',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Fashion+Store&background=6C5CE7&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 4,
      performance: 4,
    },
    comment: '소통이 원활하고 일정을 잘 지켜주셔서 작업하기 편했습니다. 전문성도 뛰어나셨습니다.',
    date: '2024-01-15',
    helpful: 5,
  },
  {
    id: '4',
    campaignTitle: '레스토랑 방문 리뷰',
    advertiser: 'Food Paradise',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Food+Paradise&background=00B894&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 3,
      communication: 4,
      creativity: 4,
      performance: 4,
    },
    comment: '콘텐츠는 좋았지만 일정이 조금 지연되었습니다. 그래도 결과는 만족스럽습니다.',
    date: '2024-01-10',
    helpful: 3,
  },
  {
    id: '5',
    campaignTitle: '피트니스 앱 홍보',
    advertiser: 'FitLife App',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=FitLife&background=FFA502&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 5,
      performance: 5,
    },
    comment: '참여율이 정말 높아요! ROI가 기대 이상이었습니다. 모든 면에서 완벽했습니다.',
    date: '2024-01-05',
    helpful: 15,
  },
];

const reviewsVi: MockReview[] = [
  {
    id: '1',
    campaignTitle: 'Đánh giá sản phẩm chăm sóc da',
    advertiser: 'Beauty Brand',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 5,
      performance: 5,
    },
    comment: 'Rất chuyên nghiệp và tận tâm. Chất lượng nội dung cao, tôi rất hài lòng. Tuân thủ lịch trình hoàn hảo và giao tiếp thông suốt. Chắc chắn sẽ hợp tác lại!',
    date: '2024-02-01',
    helpful: 12,
  },
  {
    id: '2',
    campaignTitle: 'Hướng dẫn trang điểm',
    advertiser: 'Cosmetic Co.',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Cosmetic+Co&background=4ECDC4&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 4,
      creativity: 5,
      performance: 5,
    },
    comment: 'Kết quả vượt mong đợi. Phản hồi của người theo dõi rất tích cực. Ý tưởng sáng tạo nổi bật. Rất khuyến khích!',
    date: '2024-01-20',
    helpful: 8,
  },
  {
    id: '3',
    campaignTitle: 'Lookbook thời trang',
    advertiser: 'Fashion Store',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Fashion+Store&background=6C5CE7&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 4,
      performance: 4,
    },
    comment: 'Giao tiếp thông suốt và tuân thủ lịch trình tốt, làm việc rất dễ dàng. Chuyên nghiệp xuất sắc.',
    date: '2024-01-15',
    helpful: 5,
  },
  {
    id: '4',
    campaignTitle: 'Đánh giá nhà hàng',
    advertiser: 'Food Paradise',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Food+Paradise&background=00B894&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 3,
      communication: 4,
      creativity: 4,
      performance: 4,
    },
    comment: 'Nội dung tốt nhưng lịch trình hơi chậm một chút. Tuy nhiên kết quả vẫn đạt yêu cầu.',
    date: '2024-01-10',
    helpful: 3,
  },
  {
    id: '5',
    campaignTitle: 'Quảng bá app Fitness',
    advertiser: 'FitLife App',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=FitLife&background=FFA502&color=fff',
    ratings: {
      professionalism: 5,
      punctuality: 5,
      communication: 5,
      creativity: 5,
      performance: 5,
    },
    comment: 'Tỷ lệ tương tác thật sự cao! ROI vượt kỳ vọng. Hoàn hảo về mọi mặt.',
    date: '2024-01-05',
    helpful: 15,
  },
];

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

/**
 * Get mock campaigns based on language
 * INCLUDES auto-generated demo campaigns from admin system
 */
export function getMockCampaigns(language: Language): MockCampaign[] {
  const staticCampaigns = language === 'ko' ? campaignsKo : campaignsVi;

  // Load auto-generated campaigns (only in browser)
  if (typeof window !== 'undefined') {
    try {
      // Load language-specific generated campaigns first
      const langKey = `exfluencer_generated_campaigns_${language}`;
      const stored = localStorage.getItem(langKey) || localStorage.getItem('exfluencer_generated_campaigns');
      if (stored) {
        const generatedCampaigns = JSON.parse(stored);
        // Combine static + auto-generated campaigns
        // Auto-generated ones appear FIRST (more recent)
        return [...generatedCampaigns, ...staticCampaigns];
      }
    } catch (error) {
      // If error, just return static campaigns
      console.warn('Failed to load auto-generated campaigns:', error);
    }
  }

  return staticCampaigns;
}

/**
 * Get mock user profile based on language
 */
export function getMockUserProfile(language: Language): MockUserProfile {
  return language === 'ko' ? userProfileKo : userProfileVi;
}

/**
 * Get mock notifications based on language
 */
export function getMockNotifications(language: Language): MockNotification[] {
  return language === 'ko' ? notificationsKo : notificationsVi;
}

/**
 * Get mock jobs based on language
 */
export function getMockJobs(language: Language): MockJob[] {
  return language === 'ko' ? jobsKo : jobsVi;
}

/**
 * Get mock portfolio based on language
 */
export function getMockPortfolio(language: Language): MockPortfolio[] {
  return language === 'ko' ? portfolioKo : portfolioVi;
}

/**
 * Get mock completed campaigns based on language
 */
export function getMockCompletedCampaigns(language: Language): MockCompletedCampaign[] {
  return language === 'ko' ? completedCampaignsKo : completedCampaignsVi;
}

/**
 * Get mock bank accounts based on language
 */
export function getMockBankAccounts(language: Language): MockBankAccount[] {
  return language === 'ko' ? bankAccountsKo : bankAccountsVi;
}

/**
 * Get mock transactions based on language
 */
export function getMockTransactions(language: Language): MockTransactionHistory {
  return language === 'ko' ? transactionsKo : transactionsVi;
}

/**
 * Get mock reviews based on language
 */
export function getMockReviews(language: Language): MockReview[] {
  return language === 'ko' ? reviewsKo : reviewsVi;
}

/**
 * Get all mock data at once
 */
export function getMockData(language: Language) {
  return {
    campaigns: getMockCampaigns(language),
    userProfile: getMockUserProfile(language),
    notifications: getMockNotifications(language),
    jobs: getMockJobs(language),
    portfolio: getMockPortfolio(language),
    completedCampaigns: getMockCompletedCampaigns(language),
    bankAccounts: getMockBankAccounts(language),
    transactions: getMockTransactions(language),
    reviews: getMockReviews(language),
  };
}

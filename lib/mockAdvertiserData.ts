/**
 * Mock data for advertiser dashboard
 * Simulates campaigns created by advertiser with applicants
 */

import { Campaign, Category, Platform } from '@/types';

export interface AdvertiserCampaignWithStats extends Campaign {
  applicantCount: number;
  selectedCount: number;
  completedCount: number;
  applicants: CampaignApplicant[];
}

export interface CampaignApplicant {
  id: string;
  name: string;
  nameVi: string;
  followers: number;
  engagementRate: number;
  platforms: Platform[];
  appliedAt: string;
  status: 'pending' | 'selected' | 'rejected';
  portfolioUrl?: string;
  avatarUrl: string;
}

// 광고주가 등록한 캠페인 목록
export const mockAdvertiserCampaigns = [
  {
    id: 'my-camp-001',
    title: '베트남 커피 브랜드 홍보 캠페인',
    titleVi: 'Chiến dịch quảng bá thương hiệu cà phê Việt Nam',
    company: '하이랜드 커피',
    companyVi: 'Highlands Coffee',
    category: 'food' as Category,
    description: '베트남 대표 커피 체인 하이랜드의 신제품 홍보 캠페인입니다.',
    descriptionVi: 'Chiến dịch quảng bá sản phẩm mới của chuỗi cà phê hàng đầu Việt Nam Highlands.',
    images: ['https://images.unsplash.com/photo-1559496417-e7f25cb247f8?w=800&q=80'],
    budget: 5000000,
    currency: 'VND',
    platforms: ['instagram', 'tiktok'] as Platform[],
    locations: ['호찌민', '하노이'],
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
    deadline: '2026-03-15',
    selectedInfluencers: 3,
    maxInfluencers: 5,
    createdAt: '2026-02-01',

    applicantCount: 24,
    selectedCount: 3,
    completedCount: 1,
    status: 'in_progress',
    applicants: [
      {
        id: 'inf-001',
        name: '린 응우옌',
        nameVi: 'Linh Nguyễn',
        followers: 45000,
        engagementRate: 5.2,
        platforms: ['instagram', 'tiktok'] as Platform[],
        appliedAt: '2026-02-02T10:30:00',
        status: 'selected',
        portfolioUrl: 'https://instagram.com/linh_nguyen',
        avatarUrl: 'https://ui-avatars.com/api/?name=Linh+Nguyen&background=10b981&color=fff'
      },
      {
        id: 'inf-002',
        name: '민 트란',
        nameVi: 'Minh Trần',
        followers: 32000,
        engagementRate: 4.8,
        platforms: ['instagram', 'youtube'] as Platform[],
        appliedAt: '2026-02-03T14:20:00',
        status: 'selected',
        avatarUrl: 'https://ui-avatars.com/api/?name=Minh+Tran&background=3b82f6&color=fff'
      },
      {
        id: 'inf-003',
        name: '투이 레',
        nameVi: 'Thúy Lê',
        followers: 28000,
        engagementRate: 6.1,
        platforms: ['tiktok'] as Platform[],
        appliedAt: '2026-02-03T16:45:00',
        status: 'selected',
        avatarUrl: 'https://ui-avatars.com/api/?name=Thuy+Le&background=ec4899&color=fff'
      },
      {
        id: 'inf-004',
        name: '꽝 팜',
        nameVi: 'Quang Phạm',
        followers: 18000,
        engagementRate: 3.9,
        platforms: ['instagram'] as Platform[],
        appliedAt: '2026-02-04T09:15:00',
        status: 'pending',
        avatarUrl: 'https://ui-avatars.com/api/?name=Quang+Pham&background=f59e0b&color=fff'
      },
      {
        id: 'inf-005',
        name: '황 보',
        nameVi: 'Hương Võ',
        followers: 52000,
        engagementRate: 5.8,
        platforms: ['instagram', 'tiktok', 'youtube'] as Platform[],
        appliedAt: '2026-02-04T11:30:00',
        status: 'pending',
        portfolioUrl: 'https://instagram.com/huong_vo',
        avatarUrl: 'https://ui-avatars.com/api/?name=Huong+Vo&background=8b5cf6&color=fff'
      },
    ]
  },
  {
    id: 'my-camp-002',
    title: '베트남 패션 브랜드 협찬',
    titleVi: 'Tài trợ thương hiệu thời trang Việt Nam',
    company: '엘리자 패션',
    companyVi: 'Elise Fashion',
    category: 'fashion' as Category,
    description: '베트남 로컬 패션 브랜드의 봄 신상품 홍보 캠페인',
    descriptionVi: 'Chiến dịch quảng bá sản phẩm mùa xuân mới của thương hiệu thời trang địa phương',
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'],
    budget: 8000000,
    currency: 'VND',
    platforms: ['instagram', 'facebook'] as Platform[],
    locations: ['호찌민', '다낭'],
    requiredFollowers: 20000,
    requiredEngagement: 4.0,
    deadline: '2026-03-30',
    selectedInfluencers: 0,
    maxInfluencers: 8,
    createdAt: '2026-02-10',

    applicantCount: 36,
    selectedCount: 0,
    completedCount: 0,
    status: 'recruiting',
    applicants: [
      {
        id: 'inf-011',
        name: '티엔 도',
        nameVi: 'Tiên Đỗ',
        followers: 68000,
        engagementRate: 7.2,
        platforms: ['instagram', 'facebook'] as Platform[],
        appliedAt: '2026-02-11T08:20:00',
        status: 'pending',
        portfolioUrl: 'https://instagram.com/tien_do',
        avatarUrl: 'https://ui-avatars.com/api/?name=Tien+Do&background=14b8a6&color=fff'
      },
      {
        id: 'inf-012',
        name: '빈 호앙',
        nameVi: 'Bình Hoàng',
        followers: 42000,
        engagementRate: 5.5,
        platforms: ['instagram'] as Platform[],
        appliedAt: '2026-02-11T10:45:00',
        status: 'pending',
        avatarUrl: 'https://ui-avatars.com/api/?name=Binh+Hoang&background=6366f1&color=fff'
      },
    ]
  },
  {
    id: 'my-camp-003',
    title: '하노이 여행 상품 프로모션',
    titleVi: 'Khuyến mãi sản phẩm du lịch Hà Nội',
    company: '비엣 트래블',
    companyVi: 'Viet Travel',
    category: 'travel' as Category,
    description: '하노이 3박 4일 패키지 여행 상품 홍보',
    descriptionVi: 'Quảng bá gói du lịch 3 ngày 4 đêm tại Hà Nội',
    images: ['https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80'],
    budget: 12000000,
    currency: 'VND',
    platforms: ['youtube', 'instagram', 'tiktok'] as Platform[],
    locations: ['하노이'],
    requiredFollowers: 30000,
    requiredEngagement: 5.0,
    deadline: '2026-02-28',
    selectedInfluencers: 5,
    maxInfluencers: 5,
    createdAt: '2026-01-15',

    applicantCount: 18,
    selectedCount: 5,
    completedCount: 5,
    status: 'completed',
    applicants: []
  }
];

// 광고주 통계 계산
export function getAdvertiserStats() {
  const totalCampaigns = mockAdvertiserCampaigns.length;
  const activeCampaigns = mockAdvertiserCampaigns.filter(c => c.status === 'in_progress' || c.status === 'recruiting').length;
  const completedCampaigns = mockAdvertiserCampaigns.filter(c => c.status === 'completed').length;
  const totalApplicants = mockAdvertiserCampaigns.reduce((sum, c) => sum + c.applicantCount, 0);
  const totalSelected = mockAdvertiserCampaigns.reduce((sum, c) => sum + c.selectedCount, 0);
  const pendingReview = mockAdvertiserCampaigns
    .filter(c => c.status === 'recruiting')
    .reduce((sum, c) => sum + c.applicants.filter(a => a.status === 'pending').length, 0);

  return {
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    totalApplicants,
    totalSelected,
    pendingReview
  };
}

// 특정 캠페인의 지원자 목록 가져오기
export function getCampaignApplicants(campaignId: string): CampaignApplicant[] {
  const campaign = mockAdvertiserCampaigns.find(c => c.id === campaignId);
  return (campaign?.applicants || []) as CampaignApplicant[];
}

// 최근 지원자 가져오기 (모든 캠페인에서)
export function getRecentApplicants(limit: number = 5): (CampaignApplicant & { campaignTitle: string })[] {
  const allApplicants: (CampaignApplicant & { campaignTitle: string })[] = [];

  mockAdvertiserCampaigns.forEach(campaign => {
    campaign.applicants.forEach(applicant => {
      allApplicants.push({
        ...applicant,
        campaignTitle: campaign.title
      } as any);
    });
  });

  return allApplicants
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, limit);
}

// 캠페인 상태별로 필터링
export function getCampaignsByStatus(status?: 'recruiting' | 'in_progress' | 'completed' | 'cancelled') {
  if (!status) return mockAdvertiserCampaigns;
  return mockAdvertiserCampaigns.filter(c => c.status === status);
}

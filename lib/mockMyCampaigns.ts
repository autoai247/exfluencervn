/**
 * 인플루언서의 지원한/진행중인 캠페인 데이터
 * 다양한 진행 단계의 캠페인들을 시뮬레이션
 */

import type { CampaignProgress, CampaignProgressStatus } from '@/types/campaignProgress';

// 현재 인플루언서가 참여한 캠페인들 (다양한 진행 상태)
export const mockMyCampaigns: CampaignProgress[] = [
  // 1. 방금 지원한 캠페인 (심사 대기)
  {
    campaignId: 'camp-001',
    campaignTitle: 'Phở 24 - 새로운 쌀국수 라인 체험단',
    currentStatus: 'applied',
    currentStepIndex: 0,
    totalSteps: 18,
    progressPercentage: 5,
    timeline: [],
    appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
  },

  // 2. 심사 중인 캠페인
  {
    campaignId: 'camp-002',
    campaignTitle: 'Vinamilk - 요거트 신제품 홍보',
    currentStatus: 'under_review',
    currentStepIndex: 1,
    totalSteps: 18,
    progressPercentage: 10,
    timeline: [],
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
  },

  // 3. 선정된 캠페인 (계약 진행 필요)
  {
    campaignId: 'camp-003',
    campaignTitle: 'The Coffee House - 겨울 시즌 음료 체험',
    currentStatus: 'selected',
    currentStepIndex: 2,
    totalSteps: 18,
    progressPercentage: 15,
    timeline: [],
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전 선정
  },

  // 4. 계약 완료, 제품 배송 중
  {
    campaignId: 'camp-004',
    campaignTitle: 'L\'Oréal Paris - 새 립스틱 컬렉션',
    currentStatus: 'product_shipped',
    currentStepIndex: 7,
    totalSteps: 18,
    progressPercentage: 40,
    timeline: [],
    appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    productShippedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    trackingInfo: {
      courier: 'Viettel Post',
      trackingNumber: 'VTP123456789',
      status: 'in_transit',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 후 도착 예정
    },
  },

  // 5. 제품 수령 완료, 콘텐츠 제작 중
  {
    campaignId: 'camp-005',
    campaignTitle: 'Grab Food - 배달 앱 신규 기능 홍보',
    currentStatus: 'content_creating',
    currentStepIndex: 10,
    totalSteps: 18,
    progressPercentage: 55,
    timeline: [],
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    productShippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // 6. 콘텐츠 제출됨 (승인 대기)
  {
    campaignId: 'camp-006',
    campaignTitle: 'Lazada - 슈퍼 세일 프로모션',
    currentStatus: 'content_submitted',
    currentStepIndex: 11,
    totalSteps: 18,
    progressPercentage: 60,
    timeline: [],
    appliedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    contentSubmittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    contentInfo: {
      submittedUrl: 'https://instagram.com/p/example123',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },

  // 7. 콘텐츠 승인됨 (포스팅 진행 중)
  {
    campaignId: 'camp-007',
    campaignTitle: 'Uniqlo - 봄 신상품 룩북',
    currentStatus: 'content_approved',
    currentStepIndex: 12,
    totalSteps: 18,
    progressPercentage: 65,
    timeline: [],
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    contentSubmittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    contentInfo: {
      submittedUrl: 'https://instagram.com/p/example456',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6시간 전 검토
      approvedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4시간 전 승인
      reviewComment: '콘텐츠가 매우 훌륭합니다! 브랜드 이미지와 잘 맞습니다.',
    },
  },

  // 8. 포스팅 완료 (성과 측정 중)
  {
    campaignId: 'camp-008',
    campaignTitle: 'Nike - 러닝화 신제품 캠페인',
    currentStatus: 'posted',
    currentStepIndex: 14,
    totalSteps: 18,
    progressPercentage: 75,
    timeline: [],
    appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    contentSubmittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // 9. 결제 합의 중
  {
    campaignId: 'camp-009',
    campaignTitle: 'Shopee - 패션 위크 특별 할인',
    currentStatus: 'payment_agreed',
    currentStepIndex: 16,
    totalSteps: 18,
    progressPercentage: 90,
    timeline: [],
    appliedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    paymentInfo: {
      amount: 3000000,
      currency: 'VND',
      requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },

  // 10. 완료된 캠페인 (정산 완료)
  {
    campaignId: 'camp-010',
    campaignTitle: 'Starbucks - 신메뉴 출시 이벤트',
    currentStatus: 'completed',
    currentStepIndex: 18,
    totalSteps: 18,
    progressPercentage: 100,
    timeline: [],
    appliedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    postedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    paymentInfo: {
      amount: 5000000,
      currency: 'VND',
      requestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      approvedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      method: '은행 이체',
    },
  },

  // 11. 탈락한 캠페인
  {
    campaignId: 'camp-011',
    campaignTitle: 'Chanel - 프리미엄 향수 라인',
    currentStatus: 'rejected',
    currentStepIndex: -1,
    totalSteps: 18,
    progressPercentage: 0,
    timeline: [],
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // 12. 콘텐츠 반려된 캠페인 (재제출 필요)
  {
    campaignId: 'camp-012',
    campaignTitle: 'Samsung - 갤럭시 신제품 언박싱',
    currentStatus: 'content_rejected',
    currentStepIndex: -2,
    totalSteps: 18,
    progressPercentage: 50,
    timeline: [],
    appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    selectedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    productReceivedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    contentSubmittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    contentInfo: {
      submittedUrl: 'https://tiktok.com/@user/video/123',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewComment: '제품 특징이 충분히 강조되지 않았습니다. 카메라 성능 부분을 더 자세히 다뤄주세요.',
    },
  },
];

// 상태별로 필터링
export function getMyCampaignsByStatus(status?: 'active' | 'completed' | 'rejected'): CampaignProgress[] {
  if (status === 'active') {
    return mockMyCampaigns.filter((c) =>
      !['completed', 'rejected', 'cancelled'].includes(c.currentStatus)
    );
  }

  if (status === 'completed') {
    return mockMyCampaigns.filter((c) => c.currentStatus === 'completed');
  }

  if (status === 'rejected') {
    return mockMyCampaigns.filter((c) =>
      ['rejected', 'cancelled'].includes(c.currentStatus)
    );
  }

  return mockMyCampaigns;
}

// 진행중인 캠페인 카운트
export function getActiveCampaignsCount(): number {
  return getMyCampaignsByStatus('active').length;
}

// 완료된 캠페인 카운트
export function getCompletedCampaignsCount(): number {
  return getMyCampaignsByStatus('completed').length;
}

// 총 수익 (완료된 캠페인)
export function getTotalEarnings(): number {
  return getMyCampaignsByStatus('completed').reduce((sum, campaign) => {
    return sum + (campaign.paymentInfo?.amount || 0);
  }, 0);
}

// 협의 중인 결제 금액
export function getPendingPayments(): number {
  return mockMyCampaigns
    .filter((c) => ['payment_agreed', 'payment_confirmed'].includes(c.currentStatus))
    .reduce((sum, campaign) => {
      return sum + (campaign.paymentInfo?.amount || 0);
    }, 0);
}

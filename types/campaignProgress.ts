/**
 * 캠페인 진행 상태 관리 시스템
 * 인플루언서와 광고주 양측의 진행 상황을 추적
 */

// 캠페인 진행 단계
export type CampaignProgressStatus =
  | 'applied'           // 지원 완료 (심사 대기)
  | 'under_review'      // 심사 중
  | 'selected'          // 선정됨
  | 'rejected'          // 탈락
  | 'contract_pending'  // 계약서 작성 중
  | 'contract_signed'   // 계약 완료
  | 'product_preparing' // 제품 준비 중
  | 'product_shipped'   // 제품 발송됨
  | 'product_delivered' // 제품 배송 완료
  | 'product_received'  // 제품 수령 확인
  | 'content_creating'  // 콘텐츠 제작 중
  | 'content_submitted' // 콘텐츠 제출됨
  | 'content_rejected'  // 콘텐츠 반려 (재제출 필요)
  | 'content_approved'  // 콘텐츠 승인됨
  | 'posting_scheduled' // 포스팅 예약됨
  | 'posted'            // 포스팅 완료
  | 'under_monitoring'  // 성과 측정 중
  | 'payment_agreed'    // 결제 합의됨 (광고주-인플루언서 직접 협의)
  | 'payment_confirmed' // 결제 확인됨 (양측 모두 확인)
  | 'completed'         // 완료
  | 'cancelled';        // 취소됨

// 진행 단계 정보
export interface ProgressStep {
  status: CampaignProgressStatus;
  label: string;
  labelVi: string;
  description: string;
  descriptionVi: string;
  icon: string;
  color: string;
  completedAt?: string; // ISO 8601 timestamp
  dueDate?: string; // 마감일 (선택적)
  actionRequired?: boolean; // 유저 액션 필요 여부
  actionLabel?: string; // 액션 버튼 라벨
  actionLabelVi?: string;
}

// 캠페인 전체 진행 상황
export interface CampaignProgress {
  campaignId: string;
  campaignTitle: string;
  currentStatus: CampaignProgressStatus;
  currentStepIndex: number; // 0-based
  totalSteps: number;
  progressPercentage: number; // 0-100
  timeline: ProgressStep[];
  estimatedCompletionDate?: string;

  // 주요 날짜들
  appliedAt: string;
  selectedAt?: string;
  productShippedAt?: string;
  productReceivedAt?: string;
  contentSubmittedAt?: string;
  postedAt?: string;
  completedAt?: string;

  // 배송 정보
  trackingInfo?: {
    courier: string; // 택배사
    trackingNumber: string;
    status: 'preparing' | 'shipped' | 'in_transit' | 'delivered';
    estimatedDelivery?: string;
  };

  // 콘텐츠 정보
  contentInfo?: {
    submittedUrl?: string;
    submittedAt?: string;
    reviewedAt?: string;
    reviewComment?: string;
    approvedAt?: string;
  };

  // 정산 정보
  paymentInfo?: {
    amount: number;
    currency: 'KRW' | 'VND' | 'points';
    requestedAt?: string;
    approvedAt?: string;
    paidAt?: string;
    method?: string; // 은행 이체, PayPal 등
  };
}

// 진행 단계별 설정 (기본 8단계 워크플로우)
export const CAMPAIGN_WORKFLOW_STEPS: Record<CampaignProgressStatus, {
  order: number;
  label: string;
  labelVi: string;
  shortLabel: string;
  shortLabelVi: string;
  icon: string;
  color: string;
  description: string;
  descriptionVi: string;
}> = {
  applied: {
    order: 1,
    label: '지원 완료',
    labelVi: 'Đã ứng tuyển',
    shortLabel: '지원',
    shortLabelVi: 'Ứng tuyển',
    icon: '📝',
    color: 'gray',
    description: '캠페인에 지원했습니다. 광고주가 검토 중입니다.',
    descriptionVi: 'Bạn đã ứng tuyển chiến dịch. Nhà quảng cáo đang xem xét.',
  },
  under_review: {
    order: 2,
    label: '심사 중',
    labelVi: 'Đang xét duyệt',
    shortLabel: '심사',
    shortLabelVi: 'Xét duyệt',
    icon: '🔍',
    color: 'blue',
    description: '광고주가 프로필을 검토하고 있습니다.',
    descriptionVi: 'Nhà quảng cáo đang xem xét hồ sơ của bạn.',
  },
  selected: {
    order: 3,
    label: '선정 완료',
    labelVi: 'Đã được chọn',
    shortLabel: '선정',
    shortLabelVi: 'Được chọn',
    icon: '🎉',
    color: 'green',
    description: '축하합니다! 캠페인에 선정되었습니다.',
    descriptionVi: 'Chúc mừng! Bạn đã được chọn cho chiến dịch.',
  },
  rejected: {
    order: -1,
    label: '선정 탈락',
    labelVi: 'Không được chọn',
    shortLabel: '탈락',
    shortLabelVi: 'Từ chối',
    icon: '❌',
    color: 'red',
    description: '아쉽게도 이번에는 선정되지 않았습니다.',
    descriptionVi: 'Rất tiếc, bạn chưa được chọn lần này.',
  },
  contract_pending: {
    order: 4,
    label: '계약 진행 중',
    labelVi: 'Đang ký hợp đồng',
    shortLabel: '계약',
    shortLabelVi: 'Hợp đồng',
    icon: '📄',
    color: 'yellow',
    description: '전자 계약서를 확인하고 서명해주세요.',
    descriptionVi: 'Vui lòng kiểm tra và ký hợp đồng điện tử.',
  },
  contract_signed: {
    order: 5,
    label: '계약 완료',
    labelVi: 'Đã ký hợp đồng',
    shortLabel: '계약완료',
    shortLabelVi: 'Hoàn tất',
    icon: '✅',
    color: 'green',
    description: '계약이 완료되었습니다. 제품 발송을 기다려주세요.',
    descriptionVi: 'Hợp đồng đã hoàn tất. Vui lòng đợi gửi sản phẩm.',
  },
  product_preparing: {
    order: 6,
    label: '제품 준비 중',
    labelVi: 'Đang chuẩn bị sản phẩm',
    shortLabel: '준비중',
    shortLabelVi: 'Chuẩn bị',
    icon: '📦',
    color: 'blue',
    description: '광고주가 제품을 준비하고 있습니다.',
    descriptionVi: 'Nhà quảng cáo đang chuẩn bị sản phẩm.',
  },
  product_shipped: {
    order: 7,
    label: '제품 발송됨',
    labelVi: 'Đã gửi sản phẩm',
    shortLabel: '발송',
    shortLabelVi: 'Đã gửi',
    icon: '🚚',
    color: 'blue',
    description: '제품이 발송되었습니다. 배송 추적이 가능합니다.',
    descriptionVi: 'Sản phẩm đã được gửi. Có thể theo dõi vận chuyển.',
  },
  product_delivered: {
    order: 8,
    label: '배송 완료',
    labelVi: 'Đã giao hàng',
    shortLabel: '배송완료',
    shortLabelVi: 'Đã giao',
    icon: '📬',
    color: 'green',
    description: '제품이 배송 완료되었습니다. 수령 확인해주세요.',
    descriptionVi: 'Sản phẩm đã được giao. Vui lòng xác nhận nhận hàng.',
  },
  product_received: {
    order: 9,
    label: '수령 확인',
    labelVi: 'Đã nhận hàng',
    shortLabel: '수령',
    shortLabelVi: 'Đã nhận',
    icon: '✅',
    color: 'green',
    description: '제품 수령을 확인했습니다. 콘텐츠 제작을 시작하세요.',
    descriptionVi: 'Đã xác nhận nhận hàng. Hãy bắt đầu tạo nội dung.',
  },
  content_creating: {
    order: 10,
    label: '콘텐츠 제작 중',
    labelVi: 'Đang tạo nội dung',
    shortLabel: '제작',
    shortLabelVi: 'Tạo nội dung',
    icon: '🎬',
    color: 'purple',
    description: '마감일까지 콘텐츠를 제작해주세요.',
    descriptionVi: 'Vui lòng tạo nội dung trước hạn chót.',
  },
  content_submitted: {
    order: 11,
    label: '콘텐츠 제출됨',
    labelVi: 'Đã nộp nội dung',
    shortLabel: '제출',
    shortLabelVi: 'Đã nộp',
    icon: '📤',
    color: 'blue',
    description: '콘텐츠를 제출했습니다. 광고주 검토 대기 중입니다.',
    descriptionVi: 'Đã nộp nội dung. Đang chờ nhà quảng cáo xét duyệt.',
  },
  content_rejected: {
    order: -2,
    label: '콘텐츠 반려',
    labelVi: 'Nội dung bị từ chối',
    shortLabel: '반려',
    shortLabelVi: 'Từ chối',
    icon: '🔄',
    color: 'orange',
    description: '콘텐츠가 반려되었습니다. 피드백을 확인하고 수정해주세요.',
    descriptionVi: 'Nội dung bị từ chối. Vui lòng xem phản hồi và chỉnh sửa.',
  },
  content_approved: {
    order: 12,
    label: '콘텐츠 승인됨',
    labelVi: 'Nội dung đã được duyệt',
    shortLabel: '승인',
    shortLabelVi: 'Đã duyệt',
    icon: '✅',
    color: 'green',
    description: '콘텐츠가 승인되었습니다. 포스팅을 진행하세요.',
    descriptionVi: 'Nội dung đã được duyệt. Hãy đăng bài.',
  },
  posting_scheduled: {
    order: 13,
    label: '포스팅 예약됨',
    labelVi: 'Đã lên lịch đăng',
    shortLabel: '예약',
    shortLabelVi: 'Lên lịch',
    icon: '⏰',
    color: 'blue',
    description: '포스팅이 예약되었습니다.',
    descriptionVi: 'Bài đăng đã được lên lịch.',
  },
  posted: {
    order: 14,
    label: '포스팅 완료',
    labelVi: 'Đã đăng bài',
    shortLabel: '포스팅',
    shortLabelVi: 'Đã đăng',
    icon: '📱',
    color: 'green',
    description: '포스팅이 완료되었습니다. 성과 측정 중입니다.',
    descriptionVi: 'Đã hoàn tất đăng bài. Đang đo lường hiệu quả.',
  },
  under_monitoring: {
    order: 15,
    label: '성과 측정 중',
    labelVi: 'Đang đo lường hiệu quả',
    shortLabel: '측정',
    shortLabelVi: 'Đo lường',
    icon: '📊',
    color: 'purple',
    description: '광고주가 캠페인 성과를 측정하고 있습니다.',
    descriptionVi: 'Nhà quảng cáo đang đo lường hiệu quả chiến dịch.',
  },
  payment_agreed: {
    order: 16,
    label: '결제 합의',
    labelVi: 'Thỏa thuận thanh toán',
    shortLabel: '결제합의',
    shortLabelVi: 'Thỏa thuận',
    icon: '🤝',
    color: 'yellow',
    description: '광고주와 결제 방법 및 금액을 협의 중입니다. (플랫폼 외부에서 직접 결제)',
    descriptionVi: 'Đang thỏa thuận phương thức và số tiền thanh toán với nhà quảng cáo. (Thanh toán trực tiếp ngoài nền tảng)',
  },
  payment_confirmed: {
    order: 17,
    label: '결제 확인됨',
    labelVi: 'Đã xác nhận thanh toán',
    shortLabel: '결제완료',
    shortLabelVi: 'Hoàn tất',
    icon: '✅',
    color: 'green',
    description: '양측이 결제 완료를 확인했습니다.',
    descriptionVi: 'Cả hai bên đã xác nhận thanh toán hoàn tất.',
  },
  completed: {
    order: 18,
    label: '완료',
    labelVi: 'Hoàn thành',
    shortLabel: '완료',
    shortLabelVi: 'Hoàn thành',
    icon: '🎊',
    color: 'green',
    description: '캠페인이 완료되고 정산이 완료되었습니다!',
    descriptionVi: 'Chiến dịch đã hoàn thành và thanh toán xong!',
  },
  cancelled: {
    order: -3,
    label: '취소됨',
    labelVi: 'Đã hủy',
    shortLabel: '취소',
    shortLabelVi: 'Hủy',
    icon: '🚫',
    color: 'gray',
    description: '캠페인이 취소되었습니다.',
    descriptionVi: 'Chiến dịch đã bị hủy.',
  },
};

// 진행률 계산 헬퍼
export function calculateProgress(status: CampaignProgressStatus): number {
  const step = CAMPAIGN_WORKFLOW_STEPS[status];
  if (!step || step.order < 0) return 0;

  const maxOrder = 18; // completed
  return Math.round((step.order / maxOrder) * 100);
}

// 다음 액션이 필요한지 체크
export function requiresAction(status: CampaignProgressStatus): boolean {
  return [
    'selected',
    'contract_pending',
    'product_delivered',
    'content_creating',
    'content_rejected',
    'content_approved',
    'payment_agreed',
  ].includes(status);
}

// 상태별 다음 액션 라벨
export function getNextAction(status: CampaignProgressStatus, language: 'ko' | 'vi' = 'ko'): {
  label: string;
  action: string;
} | null {
  const actions: Record<CampaignProgressStatus, { labelKo: string; labelVi: string; action: string } | null> = {
    applied: null,
    under_review: null,
    selected: {
      labelKo: '계약서 확인하기',
      labelVi: 'Kiểm tra hợp đồng',
      action: 'view_contract',
    },
    rejected: null,
    contract_pending: {
      labelKo: '계약서 서명하기',
      labelVi: 'Ký hợp đồng',
      action: 'sign_contract',
    },
    contract_signed: null,
    product_preparing: null,
    product_shipped: {
      labelKo: '배송 조회',
      labelVi: 'Theo dõi vận chuyển',
      action: 'track_delivery',
    },
    product_delivered: {
      labelKo: '수령 확인하기',
      labelVi: 'Xác nhận nhận hàng',
      action: 'confirm_receipt',
    },
    product_received: {
      labelKo: '콘텐츠 제작 시작',
      labelVi: 'Bắt đầu tạo nội dung',
      action: 'start_content',
    },
    content_creating: {
      labelKo: '콘텐츠 제출하기',
      labelVi: 'Nộp nội dung',
      action: 'submit_content',
    },
    content_submitted: null,
    content_rejected: {
      labelKo: '콘텐츠 수정하기',
      labelVi: 'Chỉnh sửa nội dung',
      action: 'revise_content',
    },
    content_approved: {
      labelKo: '포스팅하기',
      labelVi: 'Đăng bài',
      action: 'post_content',
    },
    posting_scheduled: null,
    posted: {
      labelKo: '성과 확인하기',
      labelVi: 'Xem hiệu quả',
      action: 'view_analytics',
    },
    under_monitoring: null,
    payment_agreed: {
      labelKo: '결제 완료 확인하기',
      labelVi: 'Xác nhận đã thanh toán',
      action: 'confirm_payment',
    },
    payment_confirmed: null,
    completed: {
      labelKo: '리뷰 작성하기',
      labelVi: 'Viết đánh giá',
      action: 'write_review',
    },
    cancelled: null,
  };

  const action = actions[status];
  if (!action) return null;

  return {
    label: language === 'ko' ? action.labelKo : action.labelVi,
    action: action.action,
  };
}

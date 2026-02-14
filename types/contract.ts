/**
 * 전자 계약서 시스템
 * 광고주 - 인플루언서 간 계약 및 패널티
 */

export type ContractStatus = 'draft' | 'pending_signature' | 'signed' | 'active' | 'completed' | 'violated' | 'terminated';

export interface CampaignContract {
  contractId: string;
  campaignId: string;
  campaignTitle: string;

  // 당사자
  advertiser: {
    id: string;
    name: string;
    businessVerified: boolean; // 사업자 인증 여부
    taxCode?: string;
  };

  influencer: {
    id: string;
    name: string;
    idVerified: boolean; // 신분증 인증 여부
  };

  // 계약 금액 및 조건
  payment: {
    amount: number;
    currency: 'VND' | 'KRW' | 'USD';
    method: '은행 이체' | 'Momo' | 'Zalo Pay' | 'PayPal' | '기타';
    schedule: 'before_delivery' | 'after_delivery' | 'after_posting' | '50_50_split'; // 지급 시점
    scheduleDetails?: string; // 상세 설명
  };

  // 제공 항목
  deliverables: {
    productProvided: boolean; // 제품 제공 여부
    productDescription?: string;
    contentRequirements: string; // 콘텐츠 요구사항
    platforms: string[]; // Instagram, TikTok 등
    postCount: number; // 포스팅 개수
    minimumViews?: number; // 최소 조회수
    minimumEngagement?: number; // 최소 참여율
  };

  // 일정
  timeline: {
    contractSignedAt?: string;
    productDeliveryDeadline?: string; // 제품 발송 기한
    contentSubmissionDeadline: string; // 콘텐츠 제출 기한
    postingDeadline: string; // 포스팅 기한
    campaignEndDate: string; // 캠페인 종료일
  };

  // 위반 시 패널티
  penalties: {
    advertiserViolations: AdvertiserPenalty[];
    influencerViolations: InfluencerPenalty[];
  };

  // 계약 상태
  status: ContractStatus;
  signatures: {
    advertiserSigned: boolean;
    advertiserSignedAt?: string;
    advertiserIP?: string;
    influencerSigned: boolean;
    influencerSignedAt?: string;
    influencerIP?: string;
  };

  // 분쟁
  dispute?: {
    reportedBy: 'advertiser' | 'influencer';
    reportedAt: string;
    reason: string;
    evidence: string[]; // 이미지 URL, 문서 등
    status: 'pending' | 'investigating' | 'resolved' | 'escalated';
    resolution?: string;
    resolvedAt?: string;
  };

  // 메타데이터
  createdAt: string;
  updatedAt: string;
  version: number; // 계약서 버전
}

// 광고주 위반 사항 및 패널티
export interface AdvertiserPenalty {
  violation:
    | 'no_payment' // 비용 미지급
    | 'late_payment' // 지연 지급
    | 'no_product_delivery' // 제품 미발송
    | 'late_product_delivery' // 제품 지연 발송
    | 'unfair_rejection' // 부당한 콘텐츠 반려
    | 'contract_breach'; // 기타 계약 위반

  description: {
    ko: string;
    vi: string;
  };

  penalty: {
    ko: string;
    vi: string;
  };

  severity: 'warning' | 'serious' | 'critical';
}

// 인플루언서 위반 사항 및 패널티
export interface InfluencerPenalty {
  violation:
    | 'no_content_submission' // 콘텐츠 미제출
    | 'late_content_submission' // 콘텐츠 지연 제출
    | 'no_posting' // 포스팅 안 함
    | 'late_posting' // 포스팅 지연
    | 'early_deletion' // 조기 삭제 (약속 기간 전)
    | 'false_metrics' // 가짜 조회수/좋아요
    | 'poor_quality' // 저품질 콘텐츠
    | 'contract_breach'; // 기타 계약 위반

  description: {
    ko: string;
    vi: string;
  };

  penalty: {
    ko: string;
    vi: string;
  };

  severity: 'warning' | 'serious' | 'critical';
}

// 기본 패널티 정의
export const DEFAULT_ADVERTISER_PENALTIES: AdvertiserPenalty[] = [
  {
    violation: 'no_payment',
    description: {
      ko: '약속한 금액을 지급하지 않은 경우',
      vi: 'Không thanh toán số tiền đã thỏa thuận',
    },
    penalty: {
      ko: '플랫폼 블랙리스트 등록 + 법적 조치 안내 + 계정 영구 정지',
      vi: 'Đưa vào danh sách đen + Hướng dẫn hành động pháp lý + Khóa tài khoản vĩnh viễn',
    },
    severity: 'critical',
  },
  {
    violation: 'late_payment',
    description: {
      ko: '약속한 기일보다 7일 이상 지연 지급',
      vi: 'Thanh toán chậm hơn 7 ngày so với thỏa thuận',
    },
    penalty: {
      ko: '플랫폼 경고 + 평점 하락 + 신규 캠페인 등록 제한 30일',
      vi: 'Cảnh cáo + Giảm xếp hạng + Hạn chế đăng chiến dịch mới 30 ngày',
    },
    severity: 'serious',
  },
  {
    violation: 'no_product_delivery',
    description: {
      ko: '약속한 제품을 발송하지 않은 경우',
      vi: 'Không gửi sản phẩm đã thỏa thuận',
    },
    penalty: {
      ko: '플랫폼 경고 + 평점 하락 + 인플루언서에게 배상 책임',
      vi: 'Cảnh cáo + Giảm xếp hạng + Trách nhiệm bồi thường cho influencer',
    },
    severity: 'critical',
  },
  {
    violation: 'unfair_rejection',
    description: {
      ko: '정당한 사유 없이 콘텐츠를 반려한 경우',
      vi: 'Từ chối nội dung không có lý do chính đáng',
    },
    penalty: {
      ko: '플랫폼 중재 후 부당 판정 시 전액 지급 의무 + 경고',
      vi: 'Sau trọng tài, nếu bất công thì phải thanh toán đầy đủ + Cảnh cáo',
    },
    severity: 'serious',
  },
];

export const DEFAULT_INFLUENCER_PENALTIES: InfluencerPenalty[] = [
  {
    violation: 'no_content_submission',
    description: {
      ko: '기한 내 콘텐츠를 제출하지 않은 경우',
      vi: 'Không nộp nội dung trong thời hạn',
    },
    penalty: {
      ko: '계약 해지 + 지급 금액 전액 반환 + 플랫폼 경고 + 평점 하락',
      vi: 'Hủy hợp đồng + Hoàn trả toàn bộ tiền + Cảnh cáo + Giảm xếp hạng',
    },
    severity: 'critical',
  },
  {
    violation: 'late_content_submission',
    description: {
      ko: '콘텐츠 제출 기한을 3일 이상 초과한 경우',
      vi: 'Nộp nội dung chậm hơn 3 ngày',
    },
    penalty: {
      ko: '플랫폼 경고 + 평점 하락 + 광고주가 요청 시 계약 금액 20% 감액 가능',
      vi: 'Cảnh cáo + Giảm xếp hạng + Nhà quảng cáo có thể giảm 20% phí',
    },
    severity: 'serious',
  },
  {
    violation: 'no_posting',
    description: {
      ko: '승인된 콘텐츠를 포스팅하지 않은 경우',
      vi: 'Không đăng bài sau khi được duyệt',
    },
    penalty: {
      ko: '계약 해지 + 지급 금액 전액 반환 + 제품 반환 + 플랫폼 블랙리스트 등록',
      vi: 'Hủy hợp đồng + Hoàn tiền + Trả sản phẩm + Đưa vào danh sách đen',
    },
    severity: 'critical',
  },
  {
    violation: 'early_deletion',
    description: {
      ko: '약속한 게시 기간 전에 포스팅을 삭제한 경우',
      vi: 'Xóa bài đăng trước thời hạn cam kết',
    },
    penalty: {
      ko: '지급 금액 50% 반환 + 플랫폼 경고 + 평점 하락',
      vi: 'Hoàn lại 50% phí + Cảnh cáo + Giảm xếp hạng',
    },
    severity: 'serious',
  },
  {
    violation: 'false_metrics',
    description: {
      ko: '가짜 조회수, 좋아요 등으로 성과를 조작한 경우',
      vi: 'Gian lận lượt xem, lượt thích để giả mạo kết quả',
    },
    penalty: {
      ko: '계약 해지 + 지급 금액 전액 반환 + 계정 영구 정지',
      vi: 'Hủy hợp đồng + Hoàn tiền + Khóa tài khoản vĩnh viễn',
    },
    severity: 'critical',
  },
];

// 분쟁 해결 프로세스
export interface DisputeResolutionProcess {
  step: number;
  title: {
    ko: string;
    vi: string;
  };
  description: {
    ko: string;
    vi: string;
  };
  timeframe: string; // e.g., "1-2 business days"
}

export const DISPUTE_RESOLUTION_STEPS: DisputeResolutionProcess[] = [
  {
    step: 1,
    title: {
      ko: '신고 접수',
      vi: 'Tiếp nhận khiếu nại',
    },
    description: {
      ko: '플랫폼에서 "분쟁 신고" 버튼 클릭 후 증거 자료 제출',
      vi: 'Nhấn nút "Khiếu nại" và gửi tài liệu chứng cứ',
    },
    timeframe: '즉시 / Ngay lập tức',
  },
  {
    step: 2,
    title: {
      ko: '양측 의견 수렴',
      vi: 'Thu thập ý kiến hai bên',
    },
    description: {
      ko: '플랫폼 관리자가 양측의 입장과 증거를 검토',
      vi: 'Quản trị viên xem xét lập trường và chứng cứ của cả hai bên',
    },
    timeframe: '1-2 영업일 / 1-2 ngày làm việc',
  },
  {
    step: 3,
    title: {
      ko: '중재 및 판정',
      vi: 'Trọng tài và phán quyết',
    },
    description: {
      ko: '계약서 및 증거를 기반으로 공정한 판정',
      vi: 'Phán quyết công bằng dựa trên hợp đồng và chứng cứ',
    },
    timeframe: '2-3 영업일 / 2-3 ngày làm việc',
  },
  {
    step: 4,
    title: {
      ko: '해결 또는 법적 조치 안내',
      vi: 'Giải quyết hoặc hướng dẫn pháp lý',
    },
    description: {
      ko: '합의 도출 또는 법적 절차 안내 (변호사, 법원)',
      vi: 'Đạt được thỏa thuận hoặc hướng dẫn thủ tục pháp lý (luật sư, tòa án)',
    },
    timeframe: '3-5 영업일 / 3-5 ngày làm việc',
  },
];

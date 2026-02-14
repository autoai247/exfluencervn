/**
 * 베트남 사업자 인증 시스템
 * Business Registration Certificate (Giấy chứng nhận đăng ký kinh doanh)
 */

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'none';

export interface VietnamBusinessInfo {
  // 기본 정보
  companyName: string; // Tên doanh nghiệp
  companyNameEnglish?: string;

  // 사업자 등록 정보
  registrationNumber: string; // Số ĐKKD (Business Registration Number)
  taxCode: string; // Mã số thuế (MST - Tax Code) - 10-13 digits

  // 회사 유형
  businessType:
    | 'limited_company' // Công ty TNHH (Limited Liability Company)
    | 'joint_stock' // Công ty Cổ phần (Joint Stock Company)
    | 'partnership' // Công ty hợp danh
    | 'private_enterprise' // Doanh nghiệp tư nhân
    | 'household_business'; // Hộ kinh doanh

  // 주소
  registeredAddress: string; // Địa chỉ đăng ký kinh doanh
  operatingAddress?: string; // Địa chỉ hoạt động (optional)

  // 대표자
  legalRepresentative: string; // Người đại diện pháp luật
  position: string; // Chức vụ

  // 등록 날짜
  registrationDate: string; // Ngày cấp
  issuedBy: string; // Cơ quan cấp (e.g., "Sở Kế hoạch và Đầu tư TP. HCM")

  // 업종
  businessScope: string[]; // Ngành nghề kinh doanh

  // 인증 상태
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  verifiedBy?: string; // Admin ID

  // 서류 첨부
  documents: {
    certificateImage?: string; // 사업자등록증 이미지
    taxCertificateImage?: string; // 세금등록증
    additionalDocs?: string[]; // 추가 서류
  };

  // 거부 사유
  rejectionReason?: string;
}

// 베트남 주요 도시 및 행정구역
export const VIETNAM_PROVINCES = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'Bình Dương',
  'Đồng Nai',
  'Khánh Hòa',
  'Lâm Đồng',
  'Quảng Nam',
  'Bà Rịa - Vũng Tàu',
  'Thừa Thiên Huế',
  'Kiên Giang',
  'Bắc Ninh',
  'Hải Dương',
  'Long An',
  'Quảng Ninh',
] as const;

// 세금 코드 검증 (베트남 MST는 10-13자리)
export function validateTaxCode(taxCode: string): boolean {
  // Remove any dashes or spaces
  const cleaned = taxCode.replace(/[-\s]/g, '');

  // Must be 10-13 digits
  if (!/^\d{10,13}$/.test(cleaned)) {
    return false;
  }

  return true;
}

// 사업자 등록번호 형식 검증
export function validateRegistrationNumber(regNumber: string): boolean {
  // 베트남 사업자 등록번호는 일반적으로 10-13자리 숫자
  const cleaned = regNumber.replace(/[-\s]/g, '');
  return /^\d{10,13}$/.test(cleaned);
}

// 실시간 사업자 조회 API (베트남 정부 API)
// https://masothue.com/ 같은 공개 서비스 활용 가능
export async function verifyBusinessWithGovernment(taxCode: string): Promise<{
  valid: boolean;
  companyName?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'suspended';
}> {
  // 실제 구현 시 베트남 정부 API 또는 masothue.com API 호출
  // 현재는 mock
  return {
    valid: true,
    companyName: 'Sample Company Ltd.',
    address: 'Ho Chi Minh City',
    status: 'active',
  };
}

// 사업자 인증 체크리스트
export const BUSINESS_VERIFICATION_CHECKLIST = {
  ko: [
    '사업자 등록증 사진이 선명한가요?',
    '세금 코드(MST)가 정확한가요?',
    '회사명과 주소가 일치하나요?',
    '등록 날짜가 명확한가요?',
    '발급 기관이 공식 기관인가요?',
  ],
  vi: [
    'Ảnh giấy chứng nhận đăng ký kinh doanh có rõ ràng không?',
    'Mã số thuế (MST) có chính xác không?',
    'Tên công ty và địa chỉ có khớp nhau không?',
    'Ngày cấp có rõ ràng không?',
    'Cơ quan cấp có phải là cơ quan chính thức không?',
  ],
};

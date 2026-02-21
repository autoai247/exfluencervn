'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, Users, Eye, Clock, CheckCircle, Upload, FileText, Share2, ExternalLink, Gift, AlertCircle, Trophy, X } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { formatPoints } from '@/lib/points';
import BottomNav from '@/components/common/BottomNav';
import Breadcrumb from '@/components/common/Breadcrumb';
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
const generateApplyTime = (seed: number, index: number, lang: 'ko' | 'vi' = 'vi'): string => {
  const minutesVi = [
    'vừa xong', '5 phút trước', '12 phút trước', '23 phút trước', '35 phút trước', '48 phút trước',
    '1 giờ trước', '2 giờ trước', '3 giờ trước', '5 giờ trước', '8 giờ trước',
    '12 giờ trước', '1 ngày trước', '2 ngày trước', '3 ngày trước', '5 ngày trước', '7 ngày trước'
  ];
  const minutesKo = [
    '방금 전', '5분 전', '12분 전', '23분 전', '35분 전', '48분 전',
    '1시간 전', '2시간 전', '3시간 전', '5시간 전', '8시간 전',
    '12시간 전', '1일 전', '2일 전', '3일 전', '5일 전', '7일 전'
  ];
  const arr = lang === 'ko' ? minutesKo : minutesVi;
  return arr[(seed + index) % arr.length];
};

// 인플루언서 뱃지 생성
const generateBadge = (seed: number, index: number, followers: number, lang: 'ko' | 'vi' = 'vi'): {
  type: 'verified' | 'popular' | 'rising' | 'new' | null;
  label: string;
  color: string;
} | null => {
  // 팔로워 수에 따라 뱃지 확률 조정
  const rand = (seed + index) % 100;

  if (followers > 30000) {
    if (rand < 60) return { type: 'verified', label: lang === 'ko' ? '인증' : 'Xác minh', color: 'bg-blue-500' };
    if (rand < 80) return { type: 'popular', label: lang === 'ko' ? '인기' : 'Nổi bật', color: 'bg-purple-500' };
  } else if (followers > 15000) {
    if (rand < 40) return { type: 'verified', label: lang === 'ko' ? '인증' : 'Xác minh', color: 'bg-blue-500' };
    if (rand < 60) return { type: 'rising', label: lang === 'ko' ? '급상승' : 'Đang hot', color: 'bg-green-500' };
  } else if (followers < 8000) {
    if (rand < 30) return { type: 'new', label: lang === 'ko' ? '신규' : 'Mới', color: 'bg-yellow-500' };
  }

  return null;
};

const generateApplicantAvatars = (campaignId: string, applicantsCount: number, showCount: number = 10, lang: 'ko' | 'vi' = 'vi') => {
  const seed = campaignId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const avatars = [];

  for (let i = 0; i < Math.min(showCount, applicantsCount); i++) {
    const nameIndex = (seed + i) % vietnamNames.length;
    const colorIndex = (seed + i) % avatarColors.length;
    const name = vietnamNames[nameIndex];
    const color = avatarColors[colorIndex];
    const followers = Math.floor(((seed + i * 7) % 40000)) + 5000; // 5K-45K followers
    const applyTime = generateApplyTime(seed, i, lang);
    const badge = generateBadge(seed, i, followers, lang);
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
  titleKo: '신규 출시 프리미엄 스킨케어 제품 리뷰',
  titleVi: 'Review sản phẩm Skincare cao cấp mới ra mắt',
  company: 'Beauty Brand VN',
  companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
  descriptionKo: '새로 출시된 프리미엄 스킨케어 라인을 직접 체험하고 솔직한 평가를 공유해주세요. 제품은 무료로 제공되며, 실제 사용 경험을 진심으로 담아주시길 바랍니다.',
  descriptionVi: 'Trải nghiệm dòng skincare premium mới ra mắt và chia sẻ đánh giá trung thực của bạn. Sản phẩm được cung cấp miễn phí, chúng tôi mong muốn nhận được phản hồi thật sự từ trải nghiệm của bạn.',
  budget: 500000,
  status: 'not_applied' as 'not_applied' | 'pending' | 'in_progress' | 'completed', // not_applied, pending, in_progress, completed
  deadline: '2026-04-15',
  startDate: '2026-03-01',
  campaignType: 'cash' as 'cash' | 'points', // 현금 지급 vs 포인트 지급
  platforms: ['instagram', 'tiktok'] as string[],
  applicants: 7,

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
    skillsRequiredKo: ['제품 사진 촬영', '기본 영상 편집', 'SNS 관리'],
    skillsRequiredVi: ['Chụp ảnh sản phẩm', 'Dựng video cơ bản', 'Quản lý SNS'],
    successRate: 85, // 85% of applicants get selected
  },
  earningsBreakdown: {
    basePayment: 500000, // VND
    bonusOpportunities: [
      { typeKo: '조회수 보너스', typeVi: 'Thưởng lượt xem', conditionKo: '10,000 조회수 초과', conditionVi: 'Trên 10.000 lượt xem', amount: 100000 },
      { typeKo: '고품질 리뷰 보너스', typeVi: 'Thưởng review chất lượng', conditionKo: '평점 4.5+', conditionVi: 'Đánh giá 4.5+', amount: 50000 },
    ],
    productValue: 2400000, // Total value of provided products
  },
  socialProof: {
    recentReviews: [
      { name: 'Nguyen T.', rating: 5, commentKo: '제품 품질 좋고, 결제 빨라요!', commentVi: 'Sản phẩm tốt, thanh toán nhanh!', hours: 2 },
      { name: 'Tran M.', rating: 5, commentKo: '광고주 매우 친절하고 전문적이에요', commentVi: 'Nhà QC rất thân thiện và chuyên nghiệp', hours: 5 },
    ],
    averageRating: 4.9,
    completionRate: 95, // 95% of influencers complete successfully
  },
  qualityAssurance: {
    verified: true, // Verified advertiser
    paymentGuarantee: true, // Payment guaranteed by platform
    avgResponseTimeKo: '2시간', // Average response time
    avgResponseTimeVi: '2 giờ',
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
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop', captionKo: '언박싱 예시', captionVi: 'Ví dụ unboxing' },
      { url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=800&fit=crop', captionKo: '사용 전/후', captionVi: 'Trước & sau khi dùng' },
      { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop', captionKo: '제품 상세', captionVi: 'Chi tiết sản phẩm' },
    ],
    brandStory: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=1200&h=400&fit=crop',
  },

  // 타겟 인플루언서 요구사항
  requirements: {
    minFollowers: 10000,
    maxFollowers: 100000, // 마이크로 인플루언서 타겟
    minEngagement: 3.0,
    platforms: ['Instagram', 'TikTok'],
    categories: ['Làm đẹp', 'Phong cách sống'],
    categoriesKo: ['뷰티', '라이프스타일'],
    categoriesVi: ['Làm đẹp', 'Phong cách sống'],
    gender: 'female' as 'any' | 'male' | 'female',
    ageRange: '20-35',
    location: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'],
    locationKo: ['호치민', '하노이', '다낭'],
    locationVi: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'],

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
      { name: 'Hydrating Serum 30ml', value: '800.000 VND', quantity: 1, type: 'fullsize' },
      { name: 'Repair Cream 50ml', value: '1.200.000 VND', quantity: 1, type: 'fullsize' },
      { name: 'Cleansing Foam 150ml', value: '400.000 VND', quantity: 1, type: 'fullsize' },
    ],
    totalValue: '2.400.000 VND',
    shippingKo: '무료 배송 (영업일 기준 2-3일)',
    shippingVi: 'Miễn phí vận chuyển (2-3 ngày làm việc)',
    additionalBenefitsKo: [
      '신규 출시 제품 우선 체험 기회',
      '리뷰 품질이 좋으면 장기 브랜드 앰배서더 기회',
    ],
    additionalBenefitsVi: [
      'Ưu tiên trải nghiệm sản phẩm mới ra mắt',
      'Cơ hội trở thành Brand Ambassador dài hạn nếu review chất lượng',
    ],
  },

  // 상세 미션 가이드라인
  missionGuidelines: {
    contentFormat: [
      { platform: 'Instagram', typeKo: '피드 게시물', typeVi: 'Feed post', count: 1, requirementKo: '사용 전/후 사진 필수', requirementVi: 'Bắt buộc có ảnh trước/sau khi dùng' },
      { platform: 'Instagram', typeKo: '스토리', typeVi: 'Stories', count: '3 trở lên', requirementKo: '언박싱, 사용 과정, 최종 감상', requirementVi: 'Unboxing, quá trình sử dụng, cảm nhận cuối' },
      { platform: 'TikTok', typeKo: '짧은 동영상', typeVi: 'Video ngắn', count: 1, requirementKo: '최소 1분, 자막 필수', requirementVi: 'Tối thiểu 1 phút, phải có phụ đề' },
    ],
    mustIncludeKo: [
      '정확한 제품명 언급',
      '브랜드 계정 @beautybrand_vn 태그',
      '해시태그: #skincareroutine #beautyreview #sanphammoiquoc #BeautyBrand',
      '솔직한 평가 (장단점 모두)',
      '본인 피부 타입 언급',
    ],
    mustIncludeVi: [
      'Đề cập tên sản phẩm chính xác',
      'Tag tài khoản thương hiệu @beautybrand_vn',
      'Hashtag: #skincareroutine #beautyreview #sanphammoiquoc #BeautyBrand',
      'Đánh giá trung thực (cả ưu và nhược điểm)',
      'Đề cập loại da của bạn',
    ],
    prohibitedKo: [
      '다른 브랜드 제품과 비교 금지',
      '의학적 효능 과장 금지 (예: "여드름 치료", "주름 완전 제거")',
      '제품 재판매 또는 양도 금지',
      '캠페인 종료 전 게시물 삭제 금지 (최소 30일)',
    ],
    prohibitedVi: [
      'Không so sánh với sản phẩm thương hiệu khác',
      'Không phóng đại hiệu quả y tế (VD: "chữa mụn", "xóa nếp nhăn hoàn toàn")',
      'Không bán lại hoặc chuyển nhượng sản phẩm',
      'Không xóa bài đăng trước khi kết thúc chiến dịch (tối thiểu 30 ngày)',
    ],
    toneAndManner: 'natural' as 'natural' | 'professional' | 'casual',
  },

  // 브랜드/광고주 정보
  brandInfo: {
    name: 'Beauty Brand',
    founded: '2019',
    descriptionKo: '비건 스킨케어 브랜드로 클린 뷰티를 추구합니다. 베트남 여성 피부를 연구하여 프리미엄 제품 라인을 개발했습니다.',
    descriptionVi: 'Thương hiệu skincare vegan theo đuổi clean beauty. Nghiên cứu làn da phụ nữ Việt Nam để phát triển dòng sản phẩm premium.',
    website: 'https://beautybrand.vn',
    instagram: '@beautybrand_official',
    previousCampaigns: 5,
    averageRating: 4.8,
    totalInfluencers: 127,
    verified: true,
    trustScore: 95, // 신뢰도 점수 (0-100)
    badgesKo: ['신뢰할 수 있는 결제', '빠른 응답', '명확한 브리핑'],
    badgesVi: ['Thanh toán uy tín', 'Phản hồi nhanh', 'Brief rõ ràng'],
  },

  // 광고주에 대한 인플루언서 리뷰 (중요!)
  advertiserReviews: [
    {
      id: 'ar1',
      influencer: 'Nguyen T.',
      influencerAvatar: 'https://ui-avatars.com/api/?name=Nguyen+T&background=4ECDC4&color=fff',
      rating: 5.0,
      commentKo: '제품 좋고, 결제 빨라요! 브리핑이 명확해서 작업하기 편했어요. 다음에도 꼭 협업하고 싶어요.',
      commentVi: 'Sản phẩm tốt, thanh toán nhanh! Brief rõ ràng nên làm việc rất thuận tiện. Nhất định sẽ hợp tác lần sau.',
      date: '2026-02-08',
      campaignTitleKo: '겨울 스킨케어 캠페인',
      campaignTitleVi: 'Chiến dịch Skincare Mùa Đông',
      tagsKo: ['빠른 결제', '소통 원활', '명확한 브리핑'],
      tagsVi: ['Thanh toán nhanh', 'Giao tiếp tốt', 'Brief rõ ràng'],
      wasPaymentOnTime: true,
      wouldWorkAgain: true
    },
    {
      id: 'ar2',
      influencer: 'Tran M.',
      influencerAvatar: 'https://ui-avatars.com/api/?name=Tran+M&background=FF6B6B&color=fff',
      rating: 4.8,
      commentKo: '광고주가 매우 친절하고 전문적이에요. 제품 품질이 좋아서 자신감 있게 리뷰했어요.',
      commentVi: 'Nhà QC thân thiện và chuyên nghiệp. Chất lượng sản phẩm xuất sắc nên mình tự tin review.',
      date: '2026-02-05',
      campaignTitleKo: '신제품 리뷰 캠페인',
      campaignTitleVi: 'Chiến dịch Review Sản Phẩm Mới',
      tagsKo: ['친절함', '전문성', '좋은 제품'],
      tagsVi: ['Thân thiện', 'Chuyên nghiệp', 'Sản phẩm tốt'],
      wasPaymentOnTime: true,
      wouldWorkAgain: true
    },
    {
      id: 'ar3',
      influencer: 'Le H.',
      influencerAvatar: 'https://ui-avatars.com/api/?name=Le+H&background=6C5CE7&color=fff',
      rating: 5.0,
      commentKo: '거의 수정 없이 진행했어요, 창의성을 존중해줘요. 강력 추천합니다!',
      commentVi: 'Hầu như không phải làm lại, họ tôn trọng sáng tạo của mình. Rất recommend!',
      date: '2026-01-28',
      campaignTitleKo: '뷰티 루틴 캠페인',
      campaignTitleVi: 'Chiến dịch Beauty Routine',
      tagsKo: ['창의성 존중', '적은 수정 요청', '추천'],
      tagsVi: ['Tôn trọng creative', 'Ít yêu cầu sửa', 'Được giới thiệu'],
      wasPaymentOnTime: true,
      wouldWorkAgain: true
    },
    {
      id: 'ar4',
      influencer: 'Pham N.',
      influencerAvatar: 'https://ui-avatars.com/api/?name=Pham+N&background=00B894&color=fff',
      rating: 4.9,
      commentKo: '계약이 명확하고 빠른 피드백. 믿을 수 있는 광고주예요.',
      commentVi: 'Hợp đồng rõ ràng, phản hồi nhanh chóng. Nhà QC đáng tin cậy.',
      date: '2026-01-20',
      campaignTitleKo: '메이크업 튜토리얼 캠페인',
      campaignTitleVi: 'Chiến dịch Tutorial Makeup',
      tagsKo: ['명확한 계약', '빠른 피드백', '신뢰'],
      tagsVi: ['Hợp đồng rõ', 'Feedback nhanh', 'Tin cậy'],
      wasPaymentOnTime: true,
      wouldWorkAgain: true
    },
    {
      id: 'ar5',
      influencer: 'Hoang V.',
      influencerAvatar: 'https://ui-avatars.com/api/?name=Hoang+V&background=FFA502&color=fff',
      rating: 5.0,
      commentKo: '처음부터 끝까지 완벽해요. 빠른 배송, 좋은 응답, 스트레스 없이 작업했어요.',
      commentVi: 'Hoàn hảo từ đầu đến cuối. Giao hàng nhanh, phản hồi tốt, làm việc không stress.',
      date: '2026-01-15',
      campaignTitleKo: '스킨케어 리뷰 캠페인',
      campaignTitleVi: 'Chiến dịch Review Skincare',
      tagsKo: ['완벽', '빠른 배송', '스트레스 없음'],
      tagsVi: ['Hoàn hảo', 'Giao hàng nhanh', 'Không stress'],
      wasPaymentOnTime: true,
      wouldWorkAgain: true
    }
  ],

  // 선정 기준
  selectionCriteria: {
    priorityKo: [
      '팔로워 참여율 (좋아요, 댓글, 저장)',
      '콘텐츠 품질 (사진/영상)',
      '이전 뷰티 캠페인 경험',
      '팔로워 인구통계 (여성 20-35세)',
    ],
    priorityVi: [
      'Tỉ lệ tương tác followers (like, comment, save)',
      'Chất lượng nội dung (ảnh/video)',
      'Kinh nghiệm campaign beauty trước đây',
      'Demographics followers (nữ 20-35 tuổi)',
    ],
    processTimeKo: '1-2일',
    processTimeVi: '1-2 ngày',
    expectedApplicants: 50,
    selectedInfluencers: 10,
    selectionRate: '20%',
  },

  // FAQ
  faq: [
    {
      qKo: '제품은 언제 받을 수 있나요?',
      qVi: 'Khi nào tôi nhận được sản phẩm?',
      aKo: '승인 후 등록된 주소로 2-3일 내 배송됩니다. 운송장 번호는 별도 안내됩니다.',
      aVi: 'Sau khi được duyệt, sản phẩm sẽ được giao trong 2-3 ngày đến địa chỉ đã đăng ký. Mã vận chuyển sẽ được thông báo riêng.',
    },
    {
      qKo: '민감성 피부도 사용 가능한가요?',
      qVi: 'Da nhạy cảm có dùng được không?',
      aKo: '비건 포뮬러라 자극이 적어 민감성 피부에도 적합합니다. 다만 사용 전 패치 테스트를 권장드립니다. 반응이 있으면 즉시 중단하고 저희에게 연락해주세요.',
      aVi: 'Công thức vegan ít kích ứng, phù hợp với da nhạy cảm. Tuy nhiên, khuyến nghị test patch trước khi dùng. Nếu có phản ứng, dừng ngay và liên hệ chúng tôi.',
    },
    {
      qKo: '리뷰 작성 전 얼마나 사용해야 하나요?',
      qVi: 'Cần dùng sản phẩm bao lâu trước khi review?',
      aKo: '리뷰 작성 전 최소 2주 이상 사용해 주세요. 변화를 더 명확히 보려면 4주 사용을 권장합니다.',
      aVi: 'Vui lòng dùng ít nhất 2 tuần trước khi viết review. Khuyến nghị dùng 4 tuần để thấy rõ sự thay đổi.',
    },
    {
      qKo: '게시물은 얼마나 유지해야 하나요?',
      qVi: 'Bài đăng phải duy trì bao lâu?',
      aKo: '게시일로부터 최소 30일 이상 유지해야 합니다. 조기 삭제 시 결제가 취소될 수 있습니다.',
      aVi: 'Ít nhất 30 ngày kể từ ngày đăng. Xóa sớm có thể dẫn đến hủy thanh toán.',
    },
  ],

  deliverables: [
    { id: 1, titleKo: 'Instagram 피드 게시물 1개 (사용 전/후 사진)', titleVi: '1 bài đăng feed Instagram (ảnh trước/sau khi dùng)', submitted: true },
    { id: 2, titleKo: 'Instagram 스토리 3개 이상 (언박싱, 사용 과정, 감상)', titleVi: '3+ Stories Instagram (unboxing, sử dụng, cảm nhận)', submitted: true },
    { id: 3, titleKo: 'TikTok 짧은 동영상 1개 (최소 1분, 자막 포함)', titleVi: '1 video ngắn TikTok (tối thiểu 1 phút, có phụ đề)', submitted: false },
    { id: 4, titleKo: '필수 해시태그: #skincareroutine #beautyreview #sanphammoiquoc #BeautyBrand', titleVi: 'Hashtag bắt buộc: #skincareroutine #beautyreview #sanphammoiquoc #BeautyBrand', submitted: false },
    { id: 5, titleKo: '브랜드 계정 태그: @beautybrand_vn', titleVi: 'Tag tài khoản thương hiệu: @beautybrand_vn', submitted: false },
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

  // Merge currentCampaign's basic data with mockCampaign's rich detail data
  // This ensures each campaign shows its own title/company/description/budget
  const campaign = currentCampaign ? {
    ...mockCampaign,
    titleKo: currentCampaign.title,
    titleVi: currentCampaign.title,
    company: currentCampaign.company,
    companyLogo: currentCampaign.companyLogo,
    descriptionKo: currentCampaign.description,
    descriptionVi: currentCampaign.description,
    budget: currentCampaign.budget,
    deadline: currentCampaign.deadline,
    images: { ...mockCampaign.images, mainBanner: currentCampaign.thumbnail },
    urgency: { ...mockCampaign.urgency, recentApplications: currentCampaign.applicants },
    platforms: currentCampaign.platforms,
    applicants: currentCampaign.applicants,
  } : mockCampaign;

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: '',
    zalo: '',
    platformUrl: '',
    followers: '',
    message: '',
  });
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

  // 통계 모달 상태
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showEarningsModal, setShowEarningsModal] = useState(false);

  // Auto-open apply modal if ?apply=true param is present
  useEffect(() => {
    if (searchParams?.get('apply') === 'true') {
      setShowApplyModal(true);
    }
  }, [searchParams]);

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

  const handleApplyCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 실제 지원 저장
    // 지원 정보를 localStorage에 임시 저장
    const application = {
      campaignId: params.id,
      campaignTitle: language === 'ko' ? campaign.titleKo : campaign.titleVi,
      ...applyForm,
      appliedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('exfluencer_applications') || '[]');
    localStorage.setItem('exfluencer_applications', JSON.stringify([...existing, application]));
    setApplySubmitted(true);
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
    const shareText = language === 'ko'
      ? `${currentCampaign.title}\n\n${currentCampaign.description}\n\n💰 예산: ${formatPoints(currentCampaign.minBudget)} - ${formatPoints(currentCampaign.maxBudget)} VND\n📅 마감: ${new Date(currentCampaign.deadline).toLocaleDateString('ko-KR')}\n\n`
      : `${currentCampaign.title}\n\n${currentCampaign.description}\n\n💰 Ngân sách: ${formatPoints(currentCampaign.minBudget)} - ${formatPoints(currentCampaign.maxBudget)} VND\n📅 Hạn chót: ${new Date(currentCampaign.deadline).toLocaleDateString('vi-VN')}\n\n`;

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
    categories: ['Làm đẹp', 'Phong cách sống'],
    location: 'Hồ Chí Minh',
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
        name: language === 'ko' ? '팔로워 수' : 'Số followers',
        match: mockUserProfile.followers >= campaign.requirements.minFollowers &&
               mockUserProfile.followers <= (campaign.requirements.maxFollowers || Infinity),
        weight: 20,
      },
      {
        name: language === 'ko' ? '참여율' : 'Tỉ lệ tương tác',
        match: mockUserProfile.engagementRate >= campaign.requirements.minEngagement,
        weight: 20,
      },
      {
        name: language === 'ko' ? '플랫폼' : 'Nền tảng',
        match: campaign.requirements.platforms.some((p: string) =>
          mockUserProfile.platforms.includes(p)
        ),
        weight: 15,
      },
      {
        name: language === 'ko' ? '분야' : 'Lĩnh vực',
        match: campaign.requirements.categories.some((c: string) =>
          mockUserProfile.categories.includes(c)
        ),
        weight: 15,
      },
      {
        name: language === 'ko' ? '지역' : 'Khu vực',
        match: campaign.requirements.location.some((l: string) =>
          mockUserProfile.location.includes(l)
        ),
        weight: 10,
      },
      {
        name: language === 'ko' ? '성별' : 'Giới tính',
        match: campaign.requirements.gender === 'any' ||
               campaign.requirements.gender === mockUserProfile.gender,
        weight: 5,
      },
      {
        name: language === 'ko' ? '피부 타입' : 'Loại da',
        match: !campaign.requirements.skinType ||
               campaign.requirements.skinType.includes(mockUserProfile.skinType),
        weight: 10,
      },
      {
        name: language === 'ko' ? '피부 톤' : 'Tông da',
        match: !campaign.requirements.skinTone ||
               campaign.requirements.skinTone.includes(mockUserProfile.skinTone),
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

  const completedCount = campaign.deliverables.filter(d => d.submitted).length;
  const progress = (completedCount / campaign.deliverables.length) * 100;

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.campaignDetail.title}</h1>
        </div>
        <Breadcrumb
          items={[
            { label: t.nav.campaigns, href: '/main/influencer/campaigns' },
            { label: currentCampaign?.title || (language === 'ko' ? campaign.titleKo : campaign.titleVi) },
          ]}
          className="ml-9"
          dark
        />
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
              <span>Regular users see this as a real campaign with {campaign.urgency.recentApplications} applicants</span>
            </div>
          </div>
        </div>
      )}

      <div className="container-mobile space-y-6 py-6">

        {/* ⚡ QUICK SUMMARY CARD — Dành cho KOL từ Facebook */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/60 shadow-2xl shadow-primary/20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-700 via-dark-600 to-dark-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

          {/* Banner image — compact */}
          {campaign.images.mainBanner && (
            <div className="relative h-36 overflow-hidden">
              <img
                src={campaign.images.mainBanner}
                alt={language === 'ko' ? campaign.titleKo : campaign.titleVi}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-dark-700" />
              {/* Company badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-dark-800/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <img src={campaign.companyLogo} alt={campaign.company} className="w-5 h-5 rounded-full" />
                <span className="text-white text-xs font-semibold">{campaign.company}</span>
              </div>
              {/* Type badge */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                💰 Cash
              </div>
            </div>
          )}

          {/* Content */}
          <div className="relative px-4 pt-3 pb-4">
            <h2 className="text-lg font-black text-white leading-tight mb-3">{language === 'ko' ? campaign.titleKo : campaign.titleVi}</h2>

            {/* Key stats — 3 columns */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-dark-800/70 rounded-xl p-3 text-center border border-accent/30">
                <div className="text-accent font-black text-lg leading-none">{formatPoints(campaign.budget)}</div>
                <div className="text-gray-400 text-xs mt-1">VND</div>
              </div>
              <div className="bg-dark-800/70 rounded-xl p-3 text-center border border-warning/30">
                <div className="text-warning font-black text-lg leading-none">{campaign.urgency?.remainingSlots ?? '?'}</div>
                <div className="text-gray-400 text-xs mt-1">{language === 'ko' ? '남은 자리' : 'Suất còn'}</div>
              </div>
              <div className="bg-dark-800/70 rounded-xl p-3 text-center border border-error/30">
                <div className="text-error font-black text-base leading-none">{campaign.deadline}</div>
                <div className="text-gray-400 text-xs mt-1">Deadline</div>
              </div>
            </div>

            {/* Quick requirements */}
            <div className="flex flex-wrap gap-2 mb-4">
              {campaign.requirements?.minFollowers && (
                <span className="px-2.5 py-1 bg-dark-800/70 rounded-full text-xs text-gray-300 border border-dark-500">
                  👥 {(campaign.requirements.minFollowers / 1000).toFixed(0)}K+ followers
                </span>
              )}
              {campaign.requirements?.minEngagement && (
                <span className="px-2.5 py-1 bg-dark-800/70 rounded-full text-xs text-gray-300 border border-dark-500">
                  📊 {campaign.requirements.minEngagement}%+ engagement
                </span>
              )}
              {campaign.platforms?.map((p: string) => (
                <span key={p} className="px-2.5 py-1 bg-dark-800/70 rounded-full text-xs text-gray-300 border border-dark-500 capitalize">
                  {p === 'instagram' ? '📸' : p === 'tiktok' ? '🎵' : p === 'youtube' ? '▶️' : '🔵'} {p}
                </span>
              ))}
            </div>

            {/* BIG APPLY BUTTON */}
            {campaign.status === 'not_applied' && !applySubmitted ? (
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-xl shadow-primary/40 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                {language === 'ko' ? `🎯 지금 지원 — ${formatPoints(campaign.budget)} VND` : `🎯 Ứng tuyển ngay — ${formatPoints(campaign.budget)} VND`}
              </button>
            ) : applySubmitted ? (
              <div className="w-full py-4 rounded-xl bg-success/20 border-2 border-success text-success font-bold text-center">
                {language === 'ko' ? '✅ 지원 완료!' : '✅ Đã ứng tuyển thành công!'}
              </div>
            ) : null}

            {/* Social proof micro-line */}
            <p className="text-center text-xs text-gray-500 mt-2">
              🔥 {campaign.urgency?.recentApplications ?? campaign.applicants ?? 0} {language === 'ko' ? '명 지원 · 사전 등록 불필요' : 'người đã ứng tuyển · Không cần đăng ký'}
            </p>
          </div>
        </div>

        {/* Urgency & Social Proof Banner */}
        {campaign.urgency && (
          <div className="card bg-gradient-to-r from-error/20 via-warning/20 to-error/20 border-2 border-error/50 animate-pulse shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.campaignDetail.urgency.hotCampaign || 'Chiến dịch đang hot'}</h3>
                  <p className="text-xs text-gray-300">{t.campaignDetail.urgency.recentApps || `${campaign.urgency.recentApplications} người đã ứng tuyển gần đây`}</p>
                </div>
              </div>
              {campaign.urgency.isTrending && (
                <span className="px-3 py-1 bg-gradient-to-r from-accent to-secondary text-white text-xs font-bold rounded-full">
                  {t.campaignDetail.urgency.trending || 'TRENDING'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setShowApplicantsModal(true)}
                className="bg-dark-600 rounded-lg p-3 border-2 border-warning/50 cursor-pointer hover:border-warning hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-warning" />
                  <p className="text-xs text-gray-300">{t.campaignDetail.urgency.slotsRemaining || 'Suất còn lại'}</p>
                </div>
                <p className="text-2xl font-bold text-warning">{campaign.urgency.remainingSlots}/{campaign.urgency.totalSlots}</p>
                <p className="text-xs text-gray-300 mt-1">👆 {language === 'ko' ? '지원자 보기' : 'Xem ứng viên'}</p>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 border-2 border-error/50">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-error" />
                  <p className="text-xs text-gray-300">{t.campaignDetail.urgency.timeLeft || 'Còn lại'}</p>
                </div>
                <p className="text-2xl font-bold text-error">{campaign.urgency.hoursRemaining}{t.campaignDetail.urgency.hours || ' giờ'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 최근 지원자 프로필 섹션 (신뢰도 향상) */}
        <div className="card border-2 border-dark-500/50 shadow-xl cursor-pointer hover:border-primary/50 transition-all" onClick={() => setShowApplicantsModal(true)}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '최근 지원자' : 'Ứng viên gần đây'}</h3>
            </div>
            <span className="text-sm text-gray-300">
              {language === 'ko' ? '총' : 'Tổng'} <span className="text-primary font-bold">{campaign.urgency.recentApplications}</span> {language === 'ko' ? '명' : 'người'}
            </span>
          </div>

          {/* 지원자 아바타 그리드 (개선!) */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {generateApplicantAvatars(params?.id as string || '1', campaign.urgency.recentApplications, 10, language as 'ko' | 'vi').map((avatar, idx) => (
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
                  <div className="text-[9px] text-gray-300">
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
          {campaign.urgency.recentApplications > 10 && (
            <div className="flex items-center justify-center gap-2 p-3 bg-dark-600 rounded-lg border border-dark-500">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-dark-600 flex items-center justify-center"
                  >
                    <Users size={12} className="text-gray-300" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-300">
                {language === 'ko' ? '그 외' : 'Và'} <span className="text-primary font-bold">+{campaign.urgency.recentApplications - 10}</span> {language === 'ko' ? '명 더 지원함' : 'người khác đã ứng tuyển'}
              </span>
            </div>
          )}

          {/* 경쟁률 표시 */}
          <div className="mt-4 p-3 bg-gradient-to-r from-warning/10 to-error/10 border border-warning/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-warning" />
                <span className="text-sm text-white font-semibold">{language === 'ko' ? '경쟁률' : 'Tỉ lệ cạnh tranh'}</span>
              </div>
              <span className="text-lg font-black text-warning">
                {Math.round(campaign.urgency.recentApplications / campaign.urgency.totalSlots)}:1
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              💡 {language === 'ko' ? `${campaign.urgency.totalSlots}명 선발 예정 — 지금 지원하세요!` : `Dự kiến chọn ${campaign.urgency.totalSlots} suất — ứng tuyển ngay!`}
            </div>
          </div>
        </div>

        {/* Campaign Header */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-start gap-4 mb-3">
            <img
              src={campaign.companyLogo}
              alt={campaign.company}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{language === 'ko' ? campaign.titleKo : campaign.titleVi}</h2>
                {campaign.qualityAssurance?.verified && (
                  <span className="text-primary" title={t.campaignDetail.quality.verified || (language === 'ko' ? '광고주 인증됨' : 'Nhà QC đã xác minh')}>
                    <CheckCircle size={18} />
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300">{campaign.company}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                campaign.status === 'completed' ? 'bg-success/20 text-success' :
                campaign.status === 'in_progress' ? 'bg-warning/20 text-warning' :
                'bg-info/20 text-info'
              }`}>
                {campaign.status === 'completed'
                  ? (language === 'ko' ? '완료' : 'Hoàn thành')
                  : campaign.status === 'in_progress'
                  ? (language === 'ko' ? '진행 중' : 'Đang thực hiện')
                  : (language === 'ko' ? '대기 중' : 'Đang chờ')}
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
          <p className="text-sm text-gray-300 leading-relaxed">{language === 'ko' ? campaign.descriptionKo : campaign.descriptionVi}</p>

          {/* Quality Assurance Badges (클릭 가능!) */}
          {campaign.qualityAssurance && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {campaign.qualityAssurance.paymentGuarantee && (
                <button
                  onClick={() => setShowPaymentGuaranteeModal(true)}
                  className="flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <DollarSign size={14} className="text-blue-400" />
                  <span className="text-blue-400 font-semibold flex-1 text-left">{language === 'ko' ? '결제 안내' : 'Hướng dẫn thanh toán'}</span>
                  <span className="text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">ℹ️</span>
                </button>
              )}
              {campaign.qualityAssurance.contractProtection && (
                <button
                  onClick={() => setShowContractProtectionModal(true)}
                  className="flex items-center gap-2 text-xs bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CheckCircle size={14} className="text-primary" />
                  <span className="text-primary font-semibold flex-1 text-left">{t.campaignDetail.quality.contractProtection || 'Bảo vệ hợp đồng'}</span>
                  <span className="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">ℹ️</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Reward */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-2 border-accent/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">{t.campaignDetail.expectedEarnings}</p>
              <p className="text-2xl font-bold text-accent">{formatPoints(campaign.budget)}</p>
            </div>
            <DollarSign size={40} className="text-accent/50" />
          </div>
        </div>

        {/* Difficulty & Time Estimator */}
        {campaign.difficulty && (
          <div className="card bg-gradient-to-br from-info/10 to-primary/10 border-2 border-info/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚡</span>
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.difficulty.title || 'Độ khó & Thời gian'}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.difficulty.difficultyLevel || 'Độ khó'}</p>
                <div className={`text-lg font-bold ${
                  campaign.difficulty.level === 'easy' ? 'text-success' :
                  campaign.difficulty.level === 'medium' ? 'text-warning' : 'text-error'
                }`}>
                  {campaign.difficulty.level === 'easy' ? (t.campaignDetail.difficulty.easy || 'Dễ') :
                   campaign.difficulty.level === 'medium' ? (t.campaignDetail.difficulty.medium || 'Trung bình') :
                   (t.campaignDetail.difficulty.hard || 'Khó')}
                </div>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.difficulty.timeRequired || 'Thời gian'}</p>
                <div className="text-lg font-bold text-primary">
                  {campaign.difficulty.estimatedHours}{t.campaignDetail.difficulty.hoursUnit || ' giờ'}
                </div>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.difficulty.successRate || 'Tỉ lệ chọn'}</p>
                <div className="text-lg font-bold text-success">
                  {campaign.difficulty.successRate}%
                </div>
              </div>
            </div>

            <div className="bg-dark-600 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-white mb-2">{t.campaignDetail.difficulty.skillsNeeded || 'Kỹ năng cần có'}</h4>
              <div className="flex flex-wrap gap-2">
                {(language === 'ko' ? campaign.difficulty.skillsRequiredKo : campaign.difficulty.skillsRequiredVi).map((skill: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 bg-info/20 text-info text-xs rounded-full border border-info/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Earnings Breakdown Calculator */}
        {campaign.earningsBreakdown && (
          <div
            onClick={() => setShowEarningsModal(true)}
            className="card bg-gradient-to-br from-success/10 to-accent/10 border-2 border-success/30 shadow-xl cursor-pointer hover:border-success hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <h3 className="text-lg font-bold text-white">{t.campaignDetail.earnings.title || 'Tính thu nhập'}</h3>
              </div>
              <span className="text-xs text-gray-300">👆 {language === 'ko' ? '상세 보기' : 'Xem chi tiết'}</span>
            </div>

            <div className="space-y-3">
              {/* Base Payment */}
              <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" />
                  <span className="text-sm text-white">{t.campaignDetail.earnings.basePayment || 'Thù lao cơ bản'}</span>
                </div>
                <span className="text-lg font-bold text-success">{formatPoints(campaign.earningsBreakdown.basePayment)}</span>
              </div>

              {/* Product Value */}
              <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-primary" />
                  <span className="text-sm text-white">{t.campaignDetail.earnings.productValue || 'Giá trị sản phẩm cung cấp'}</span>
                </div>
                <span className="text-lg font-bold text-primary">{formatPoints(campaign.earningsBreakdown.productValue)}</span>
              </div>

              {/* Bonus Opportunities */}
              {campaign.earningsBreakdown.bonusOpportunities.length > 0 && (
                <div className="bg-gradient-to-r from-accent/10 to-warning/10 border border-accent/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <span>🎁</span>
                    {t.campaignDetail.earnings.bonusOpportunities || (language === 'ko' ? '추가 보너스' : 'Thưởng thêm')}
                  </h4>
                  <div className="space-y-2">
                    {campaign.earningsBreakdown.bonusOpportunities.map((bonus: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div>
                          <p className="text-white font-semibold">{language === 'ko' ? bonus.typeKo : bonus.typeVi}</p>
                          <p className="text-gray-300">{language === 'ko' ? bonus.conditionKo : bonus.conditionVi}</p>
                        </div>
                        <span className="text-accent font-bold">+{formatPoints(bonus.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Potential */}
              <div className="bg-gradient-to-r from-accent to-secondary rounded-lg p-4 text-center">
                <p className="text-xs text-white/80 mb-1">{t.campaignDetail.earnings.maxPotential || (language === 'ko' ? '예상 최대 수익' : 'Thu nhập tối đa ước tính')}</p>
                <p className="text-3xl font-bold text-white">
                  {formatPoints(
                    campaign.earningsBreakdown.basePayment +
                    campaign.earningsBreakdown.productValue +
                    campaign.earningsBreakdown.bonusOpportunities.reduce((sum: number, b: any) => sum + b.amount, 0)
                  )}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  ({t.campaignDetail.earnings.cashAndProducts || 'Bao gồm tiền mặt + sản phẩm'})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Social Proof & Reviews */}
        {campaign.socialProof && (
          <div className="card bg-gradient-to-br from-secondary/10 to-primary/10 border-2 border-secondary/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⭐</span>
              <h3 className="text-lg font-bold text-white">{t.campaignDetail.socialProof.title || 'Đánh giá từ KOL'}</h3>
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                {campaign.socialProof.averageRating}/5.0
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.socialProof.completionRate || 'Tỉ lệ hoàn thành'}</p>
                <p className="text-2xl font-bold text-success">{campaign.socialProof.completionRate}%</p>
              </div>
              <div className="bg-dark-600 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.socialProof.avgResponseTime || 'Thời gian phản hồi'}</p>
                <p className="text-lg font-bold text-primary">{language === 'ko' ? (campaign.qualityAssurance?.avgResponseTimeKo || '2시간') : (campaign.qualityAssurance?.avgResponseTimeVi || '2 giờ')}</p>
              </div>
            </div>

            {/* Recent Reviews */}
            {campaign.socialProof.recentReviews.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">{t.campaignDetail.socialProof.recentReviews || 'Đánh giá gần đây'}</h4>
                {campaign.socialProof.recentReviews.map((review: any, idx: number) => (
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
                      <span className="text-xs text-gray-300">{review.hours}{t.campaignDetail.socialProof.hoursAgo || ' giờ trước'}</span>
                    </div>
                    <p className="text-sm text-gray-300">{language === 'ko' ? review.commentKo : review.commentVi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Apply Button */}
        {campaign.status === 'not_applied' && !applySubmitted && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-xl shadow-2xl shadow-primary/40 active:scale-95 transition-all"
          >
            {language === 'ko' ? '🎯 지금 지원 — 무료' : '🎯 Ứng tuyển ngay — Miễn phí'}
          </button>
        )}
        {applySubmitted && (
          <div className="w-full py-4 rounded-2xl bg-success/20 border-2 border-success text-center">
            <div className="text-success font-black text-lg">{language === 'ko' ? '✅ 지원 완료!' : '✅ Đã ứng tuyển thành công!'}</div>
            <div className="text-success/70 text-xs mt-1">{language === 'ko' ? '광고주가 Zalo로 1-2일 내 연락드립니다' : 'Nhà QC sẽ liên hệ qua Zalo trong 1-2 ngày'}</div>
          </div>
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
            <summary className="cursor-pointer text-gray-300 hover:text-white transition-colors mb-2">
              📊 {t.campaignDetail.viewDetails}
            </summary>
            <div className="space-y-1.5 mt-2 pt-2 border-t border-dark-500">
              {matchingResult.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{criterion.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-xs">{criterion.weight}đ</span>
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
        <div className="card border-2 border-primary/30 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-primary" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.requirements}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-600 rounded-lg p-3">
              <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.minFollowers}</p>
              <p className="text-lg font-bold text-white">{campaign.requirements.minFollowers.toLocaleString()}</p>
            </div>
            <div className="bg-dark-600 rounded-lg p-3">
              <p className="text-xs text-gray-300 mb-1">{t.campaignDetail.minEngagement}</p>
              <p className="text-lg font-bold text-white">{campaign.requirements.minEngagement}%</p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">📱</span>
              <div>
                <span className="text-gray-300">{t.campaignDetail.platform} </span>
                <span className="text-white font-semibold">{campaign.requirements.platforms.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">🎯</span>
              <div>
                <span className="text-gray-300">{t.campaignDetail.category} </span>
                <span className="text-white font-semibold">{(language === 'ko' ? campaign.requirements.categoriesKo : campaign.requirements.categoriesVi).join(', ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">👤</span>
              <div>
                <span className="text-gray-300">{t.campaignDetail.target} </span>
                <span className="text-white font-semibold">
                  {campaign.requirements.gender === 'female' ? t.profile.female : campaign.requirements.gender === 'male' ? t.profile.male : t.profile.any}, {campaign.requirements.ageRange}{t.profile.years}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5">📍</span>
              <div>
                <span className="text-gray-300">{t.campaignDetail.location} </span>
                <span className="text-white font-semibold">{(language === 'ko' ? campaign.requirements.locationKo : campaign.requirements.locationVi).join(', ')}</span>
              </div>
            </div>

            {/* Beauty-specific requirements */}
            {campaign.requirements.skinType && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✨</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.skinType} </span>
                  <span className="text-white font-semibold">
                    {campaign.requirements.skinType.map((type: string) => ({
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

            {campaign.requirements.skinTone && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🎨</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.skinTone} </span>
                  <span className="text-white font-semibold">
                    {campaign.requirements.skinTone.map((tone: string) => ({
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
            {campaign.requirements.requiresParent && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">👶</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.childRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasChildren}
                    {campaign.requirements.childAgeRange && Array.isArray(campaign.requirements.childAgeRange) && campaign.requirements.childAgeRange.length > 0 && (
                      <span className="text-gray-300"> ({(campaign.requirements.childAgeRange as any[]).map((age: string) => (language === 'ko' ? ({
                        '0-1': '0-1세',
                        '1-3': '1-3세',
                        '3-6': '3-6세',
                        '6-12': '6-12세',
                        '12-18': '12-18세'
                      }[age]) : ({
                        '0-1': '0-1 tuổi',
                        '1-3': '1-3 tuổi',
                        '3-6': '3-6 tuổi',
                        '6-12': '6-12 tuổi',
                        '12-18': '12-18 tuổi'
                      }[age]))).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Vehicle requirement */}
            {campaign.requirements.requiresVehicle && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🚗</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.vehicleRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasVehicle}
                    {campaign.requirements.vehicleTypes && campaign.requirements.vehicleTypes.length > 0 && (
                      <span className="text-gray-300"> ({campaign.requirements.vehicleTypes.map((v: string) => (language === 'ko' ? ({
                        sedan: '세단',
                        suv: 'SUV',
                        truck: '트럭',
                        electric: '전기차',
                        hybrid: '하이브리드',
                        motorcycle: '오토바이',
                        scooter: '스쿠터'
                      }[v]) : ({
                        sedan: 'Xe sedan',
                        suv: 'SUV',
                        truck: 'Xe tải',
                        electric: 'Xe điện',
                        hybrid: 'Xe hybrid',
                        motorcycle: 'Xe máy',
                        scooter: 'Xe tay ga'
                      }[v]))).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Fashion sizes requirement */}
            {campaign.requirements.clothingSizes && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">👕</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.clothingSize} </span>
                  <span className="text-white font-semibold">
                    {campaign.requirements.clothingSizes.top && campaign.requirements.clothingSizes.top.length > 0 && (
                      <span>{t.campaignDetail.topSize} {campaign.requirements.clothingSizes.top.join(', ')}</span>
                    )}
                    {campaign.requirements.clothingSizes.bottom && campaign.requirements.clothingSizes.bottom.length > 0 && (
                      <span> / {t.campaignDetail.bottomSize} {campaign.requirements.clothingSizes.bottom.join(', ')}</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Pet requirement */}
            {campaign.requirements.requiresPet && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🐾</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.petRequired} </span>
                  <span className="text-white font-semibold">
                    {t.profile.hasPets}
                    {campaign.requirements.petTypes && campaign.requirements.petTypes.length > 0 && (
                      <span className="text-gray-300"> ({campaign.requirements.petTypes.map((p: string) => (language === 'ko' ? ({
                        dog: '강아지',
                        cat: '고양이',
                        bird: '새',
                        fish: '물고기',
                        other: '기타'
                      }[p]) : ({
                        dog: 'Chó',
                        cat: 'Mèo',
                        bird: 'Chim',
                        fish: 'Cá',
                        other: 'Khác'
                      }[p]))).join(', ')})</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Marital status requirement */}
            {campaign.requirements.maritalStatus && campaign.requirements.maritalStatus.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">💑</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.maritalStatus} </span>
                  <span className="text-white font-semibold">
                    {campaign.requirements.maritalStatus.map((status: string) => ({
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
            {campaign.requirements.housingTypes && campaign.requirements.housingTypes.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">🏠</span>
                <div>
                  <span className="text-gray-300">{t.campaignDetail.housingType} </span>
                  <span className="text-white font-semibold">
                    {campaign.requirements.housingTypes.map((h: string) => ({
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
        <div className="card bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Gift size={20} className="text-success" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.benefits}</h3>
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-dark-600 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.providedProducts}</h4>
              {campaign.providedItems.products.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-dark-500 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-bold">
                      {product.quantity}
                    </span>
                    <div>
                      <p className="text-sm text-white font-medium">{product.name}</p>
                      <p className="text-xs text-gray-300">
                        {product.type === 'fullsize' ? t.campaignDetail.fullsize : t.campaignDetail.sample}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-success font-semibold">{product.value}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-dark-500 flex items-center justify-between">
                <span className="text-sm font-bold text-white">{t.campaignDetail.totalValue}</span>
                <span className="text-lg font-bold text-success">{campaign.providedItems.totalValue}</span>
              </div>
            </div>

            <div className="bg-dark-600 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-info" />
                <h4 className="text-sm font-semibold text-white">{t.campaignDetail.shippingInfo}</h4>
              </div>
              <p className="text-sm text-gray-300">{language === 'ko' ? campaign.providedItems.shippingKo : campaign.providedItems.shippingVi}</p>
            </div>

            {(language === 'ko' ? campaign.providedItems.additionalBenefitsKo : campaign.providedItems.additionalBenefitsVi).length > 0 && (
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎁</span>
                  <h4 className="text-sm font-semibold text-white">{t.campaignDetail.additionalBenefits}</h4>
                </div>
                <ul className="space-y-1">
                  {(language === 'ko' ? campaign.providedItems.additionalBenefitsKo : campaign.providedItems.additionalBenefitsVi).map((benefit, idx) => (
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
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📸</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.productGallery || 'Ảnh sản phẩm'}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {campaign.images.productGallery.map((image, idx) => (
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
        <div className="card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.contentExamples || 'Ví dụ nội dung'}</h3>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            {t.campaignDetail.contentExamplesDesc || 'Hãy tạo nội dung theo phong cách này! Đây chỉ là ví dụ tham khảo.'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {campaign.images.exampleContent.map((example, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={example.url}
                  alt={language === 'ko' ? example.captionKo : example.captionVi}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold px-2 text-center">{language === 'ko' ? example.captionKo : example.captionVi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상세 미션 가이드라인 */}
        <div className="card border-2 border-warning/30 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-warning" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.missionGuide}</h3>
          </div>

          {/* 콘텐츠 형식 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.contentFormat}</h4>
            <div className="space-y-2">
              {campaign.missionGuidelines.contentFormat.map((format, idx) => (
                <div key={idx} className="bg-dark-600 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">
                      {format.platform} - {language === 'ko' ? format.typeKo : format.typeVi}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold">
                      x{format.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{language === 'ko' ? format.requirementKo : format.requirementVi}</p>
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
              {(language === 'ko' ? campaign.missionGuidelines.mustIncludeKo : campaign.missionGuidelines.mustIncludeVi).map((item: string, idx: number) => (
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
              {(language === 'ko' ? campaign.missionGuidelines.prohibitedKo : campaign.missionGuidelines.prohibitedVi).map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm bg-error/5 rounded-lg p-2 border border-error/20">
                  <span className="text-error flex-shrink-0 mt-0.5">✗</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 브랜드 정보 */}
        <div className="card bg-gradient-to-br from-info/10 to-info/5 border-2 border-info/30 shadow-xl">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={campaign.companyLogo}
              alt={campaign.brandInfo.name}
              className="w-16 h-16 rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{campaign.brandInfo.name}</h3>
              <p className="text-xs text-gray-300">{t.campaignDetail.founded} {campaign.brandInfo.founded}</p>
            </div>
          </div>

          {/* 브랜드 스토리 이미지 */}
          <img
            src={campaign.images.brandStory}
            alt="Brand Story"
            className="w-full h-32 object-cover rounded-lg mb-4"
          />

          <p className="text-sm text-gray-300 leading-relaxed mb-4">{language === 'ko' ? campaign.brandInfo.descriptionKo : campaign.brandInfo.descriptionVi}</p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-primary">{campaign.brandInfo.previousCampaigns}</div>
              <div className="text-xs text-gray-300">{t.campaignDetail.previousCampaigns}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-accent">{campaign.brandInfo.averageRating}</div>
              <div className="text-xs text-gray-300">{t.campaignDetail.averageRating}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-success">{campaign.brandInfo.totalInfluencers}</div>
              <div className="text-xs text-gray-300">{t.campaignDetail.collaboratedInfluencers}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={campaign.brandInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn btn-ghost text-sm"
            >
              <ExternalLink size={14} className="mr-1" />
              {t.campaignDetail.website}
            </a>
            <a
              href={`https://instagram.com/${campaign.brandInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn btn-ghost text-sm"
            >
              📷 Instagram
            </a>
          </div>
        </div>

        {/* 광고주 신뢰도 & 인플루언서 리뷰 - 가장 중요! */}
        <div className="card bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-success" />
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '광고주 신뢰도' : 'Độ tin cậy Nhà QC'}</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-xl font-bold text-success">{campaign.brandInfo.trustScore}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-300">{language === 'ko' ? '신뢰 점수' : 'Điểm tin cậy'}</div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(campaign.brandInfo.trustScore / 20) ? 'bg-success' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 신뢰 배지 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(language === 'ko' ? campaign.brandInfo.badgesKo : campaign.brandInfo.badgesVi).map((badge: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 bg-success/20 text-success border border-success/30 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle size={12} />
                {badge}
              </span>
            ))}
            {campaign.brandInfo.verified && (
              <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle size={12} />
                {language === 'ko' ? '광고주 인증됨' : 'Nhà QC đã xác minh'}
              </span>
            )}
          </div>

          {/* 인플루언서 리뷰 */}
          <div className="bg-dark-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white">{language === 'ko' ? '다른 인플루언서 리뷰' : 'Đánh giá từ KOL khác'}</h4>
              <div className="flex items-center gap-1">
                <div className="text-yellow-400 text-lg font-bold">{campaign.brandInfo.averageRating}</div>
                <div className="text-gray-300 text-xs">/ 5.0</div>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {campaign.advertiserReviews.slice(0, 3).map((review: any) => (
                <div key={review.id} className="bg-dark-700 rounded-lg p-3 border border-dark-500">
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={review.influencerAvatar}
                      alt={review.influencer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-sm font-semibold text-white">{review.influencer}</h5>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{language === 'ko' ? review.campaignTitleKo : review.campaignTitleVi}</p>
                      <p className="text-sm text-gray-300 leading-relaxed mb-2">"{language === 'ko' ? review.commentKo : review.commentVi}"</p>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(language === 'ko' ? review.tagsKo : review.tagsVi).map((tag: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full border border-success/30">
                            ✓ {tag}
                          </span>
                        ))}
                      </div>

                      {/* 중요 정보 */}
                      <div className="flex items-center gap-3 text-xs">
                        {review.wasPaymentOnTime && (
                          <span className="text-success flex items-center gap-1">
                            <CheckCircle size={12} />
                            {language === 'ko' ? '결제 제때 완료' : 'Thanh toán đúng hạn'}
                          </span>
                        )}
                        {review.wouldWorkAgain && (
                          <span className="text-primary flex items-center gap-1">
                            <CheckCircle size={12} />
                            {language === 'ko' ? '재협업 의향 있음' : 'Muốn hợp tác lại'}
                          </span>
                        )}
                        <span className="text-gray-300">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {campaign.advertiserReviews.length > 3 && (
              <button className="w-full mt-3 py-2 text-sm text-gray-300 hover:text-white border border-dark-500 rounded-lg hover:bg-dark-600 transition-colors">
                {language === 'ko' ? `전체 리뷰 보기 (${campaign.advertiserReviews.length})` : `Xem tất cả đánh giá (${campaign.advertiserReviews.length})`}
              </button>
            )}
          </div>

          {/* 결제 보장 안내 */}
          <div className="bg-success/10 border border-success/30 rounded-lg p-3 flex items-start gap-3">
            <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">{language === 'ko' ? '플랫폼 결제 보장' : 'Đảm bảo thanh toán từ nền tảng'}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {language === 'ko'
                  ? '이 캠페인은 플랫폼이 결제를 보장합니다. 작업 완료 후 광고주가 결제하지 않으면 플랫폼이 대신 지급합니다. 안심하고 지원하세요!'
                  : 'Chiến dịch này được nền tảng đảm bảo thanh toán. Nếu nhà QC không thanh toán sau khi hoàn thành công việc, nền tảng sẽ chi trả thay. Yên tâm ứng tuyển!'}
              </p>
            </div>
          </div>
        </div>

        {/* 선정 기준 */}
        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-secondary" />
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.selectionCriteria}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-300 mb-1">{t.campaignDetail.expectedApplicants}</div>
              <div className="text-lg font-bold text-white">{campaign.selectionCriteria.expectedApplicants}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-300 mb-1">{t.campaignDetail.selectedInfluencers}</div>
              <div className="text-lg font-bold text-primary">{campaign.selectionCriteria.selectedInfluencers}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-300 mb-1">{t.campaignDetail.expectedCompetition}</div>
              <div className="text-lg font-bold text-accent">{campaign.selectionCriteria.selectionRate}</div>
            </div>
          </div>

          <div className="bg-dark-600 rounded-lg p-3 mb-3">
            <h4 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.priorityCriteria}</h4>
            <ol className="space-y-2">
              {(language === 'ko' ? campaign.selectionCriteria.priorityKo : campaign.selectionCriteria.priorityVi).map((item: string, idx: number) => (
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
              ⏱️ <strong className="text-white">{t.campaignDetail.avgReviewTime.split(':')[0]}</strong>: {language === 'ko' ? campaign.selectionCriteria.processTimeKo : campaign.selectionCriteria.processTimeVi}
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💬</span>
            <h3 className="text-lg font-bold text-white">{t.campaignDetail.faq}</h3>
          </div>

          <div className="space-y-3">
            {campaign.faq.map((item, idx) => (
              <details key={idx} className="bg-dark-600 rounded-lg">
                <summary className="p-3 cursor-pointer text-sm font-semibold text-white hover:bg-dark-500 rounded-lg transition-colors">
                  Q. {language === 'ko' ? item.qKo : item.qVi}
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-sm text-gray-300 leading-relaxed">{language === 'ko' ? item.aKo : item.aVi}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Pending Status */}
        {campaign.status === 'pending' && (
          <div className="card bg-gradient-to-r from-warning/20 to-warning/5 border-2 border-warning/30 shadow-xl">
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
                  <>{language === 'ko' ? `Facebook 그룹에 공유 → ${formatPoints(SHARE_BONUS_AMOUNT)} VND 획득!` : `Chia sẻ trên nhóm Facebook → Nhận ${formatPoints(SHARE_BONUS_AMOUNT)} VND!`}</>
                )}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {campaignShareCount > 0
                  ? (`${campaignShareCount} ${t.campaignDetail.shareCountSubmitted}`)
                  : t.campaignDetail.shareAndEarnBonusText}
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
                          <div className="text-xs text-gray-300">{t.campaignDetail.shareApproved}</div>
                        </div>
                      )}
                      {pendingCount > 0 && (
                        <div className="bg-warning/10 rounded p-2">
                          <div className="text-warning text-lg font-bold">{pendingCount}</div>
                          <div className="text-xs text-gray-300">{t.campaignDetail.sharePending}</div>
                        </div>
                      )}
                      {rejectedCount > 0 && (
                        <div className="bg-error/10 rounded p-2">
                          <div className="text-error text-lg font-bold">{rejectedCount}</div>
                          <div className="text-xs text-gray-300">{t.campaignDetail.shareRejected}</div>
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
                  <span>{language === 'ko' ? `+${formatPoints(SHARE_BONUS_AMOUNT)} VND (관리자 승인 후 지급)` : `+${formatPoints(SHARE_BONUS_AMOUNT)} VND cho mỗi lượt chia sẻ (sau khi admin duyệt)`}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareMultiple}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <Clock size={14} className="text-warning flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.dailyShareLimitText
                    .replace('{max}', MAX_DAILY_SHARES.toString())
                    .replace('{current}', dailyShareCount.toString())
                    .replace('{max}', MAX_DAILY_SHARES.toString())}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <ExternalLink size={14} className="text-info flex-shrink-0 mt-0.5" />
                  <span>{t.campaignDetail.shareNoDelete}</span>
                </div>
              </div>

              {totalShareEarnings > 0 && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-3 mt-3">
                  <p className="text-xs text-gray-300 text-center">
                    💰 <strong className="text-white">{t.campaignDetail.totalShareEarnings}</strong>: {formatPoints(totalShareEarnings)} VND
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Progress */}
        {campaign.status === 'in_progress' && (
          <div className="card border-2 border-dark-500/50 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.progress}</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{t.campaignDetail.completedTasks}</span>
                <span className="text-white font-semibold">
                  {completedCount}/{campaign.deliverables.length}
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
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">{t.campaignDetail.deliverables}</h3>
            {campaign.status === 'in_progress' && (
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
            {campaign.deliverables.map((item) => (
              <li key={item.id} className="flex items-start gap-2 text-sm">
                {item.submitted ? (
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-600 rounded flex-shrink-0 mt-0.5" />
                )}
                <span className={item.submitted ? 'text-gray-300 line-through' : 'text-gray-300'}>
                  {language === 'ko' ? item.titleKo : item.titleVi}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submitted Work */}
        {campaign.submittedWork.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t.campaignDetail.submittedWork}</h3>
            {campaign.submittedWork.map((work) => (
              <div key={work.id} className="card border-2 border-dark-500/50 shadow-xl">
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
                <div className="flex items-center gap-4 text-sm text-gray-300">
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
        <div className="card border-2 border-dark-500/50 shadow-xl space-y-3">
          <h3 className="text-sm font-semibold text-white mb-3">{t.campaignDetail.campaignInfo}</h3>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-300" />
            <span className="text-gray-300">{t.campaignDetail.period}</span>
            <span className="text-white">{campaign.startDate} ~ {campaign.deadline}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock size={16} className="text-gray-300" />
            <span className="text-gray-300">{t.campaignDetail.deadline}</span>
            <span className="text-white">{campaign.deadline}</span>
          </div>
        </div>
      </div>

      {/* ─── STICKY BOTTOM APPLY BAR ─── */}
      {campaign.status === 'not_applied' && !applySubmitted && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <div className="bg-dark-700/95 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 truncate">{campaign.company}</div>
                <div className="text-accent font-black text-lg leading-tight">+{formatPoints(campaign.budget)} VND</div>
              </div>
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black text-base shadow-lg shadow-primary/30 active:scale-95 transition-transform"
              >
                {language === 'ko' ? '🎯 지금 지원' : '🎯 Ứng tuyển ngay'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── GOOGLE FORM STYLE APPLY MODAL ─── */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-dark-700 rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">

            {/* Handle bar (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-dark-400 rounded-full"></div>
            </div>

            {!applySubmitted ? (
              <form onSubmit={handleApplyCampaign} className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white">{t.campaignDetail.applyModal.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{campaign.company} · +{formatPoints(campaign.budget)} VND</p>
                  </div>
                  <button type="button" onClick={() => setShowApplyModal(false)} className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= 5 ? 'bg-primary/60' : 'bg-dark-500'}`}></div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{language === 'ko' ? '입력만 하면 완료 — 계정 불필요 🎉' : 'Điền vào là xong — không cần tài khoản 🎉'}</p>

                {/* Field 1: Name */}
                <div>
                  <label className="text-sm font-semibold text-white mb-1.5 block">
                    👤 {language === 'ko' ? '이름' : 'Họ tên của bạn'} <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.name}
                    onChange={e => setApplyForm({...applyForm, name: e.target.value})}
                    placeholder="Nguyen Thi Lan"
                    className="input w-full"
                    autoFocus
                  />
                </div>

                {/* Field 2: Zalo */}
                <div>
                  <label className="text-sm font-semibold text-white mb-1.5 block">
                    📱 {language === 'ko' ? 'Zalo / Facebook 번호' : 'Số Zalo / Facebook'} <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.zalo}
                    onChange={e => setApplyForm({...applyForm, zalo: e.target.value})}
                    placeholder={language === 'ko' ? '+84 90 123 4567 또는 Facebook 링크' : '+84 90 123 4567 hoặc link Facebook'}
                    className="input w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">{language === 'ko' ? '광고주가 여기로 연락드립니다' : 'Nhà QC sẽ liên hệ bạn qua đây'}</p>
                </div>

                {/* Field 3: Platform URL */}
                <div>
                  <label className="text-sm font-semibold text-white mb-1.5 block">
                    📸 {language === 'ko' ? '주요 Instagram / TikTok 링크' : 'Link Instagram / TikTok chính'} <span className="text-error">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={applyForm.platformUrl}
                    onChange={e => setApplyForm({...applyForm, platformUrl: e.target.value})}
                    placeholder={language === 'ko' ? 'https://instagram.com/내아이디' : 'https://instagram.com/ten_cua_ban'}
                    className="input w-full"
                  />
                </div>

                {/* Field 4: Followers */}
                <div>
                  <label className="text-sm font-semibold text-white mb-1.5 block">
                    👥 {language === 'ko' ? '팔로워 수 (약)' : 'Số người theo dõi (khoảng)'} <span className="text-error">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['1K-5K', '5K-15K', '15K-50K', '50K-100K', '100K-500K', '500K+'].map(range => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setApplyForm({...applyForm, followers: range})}
                        className={`py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          applyForm.followers === range
                            ? 'bg-primary text-white border-primary'
                            : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary/50'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 5: Message (optional) */}
                <div>
                  <label className="text-sm font-semibold text-white mb-1.5 block">
                    💬 {language === 'ko' ? '짧은 메시지' : 'Lời nhắn ngắn'} <span className="text-gray-500 font-normal">{language === 'ko' ? '(선택)' : '(tùy chọn)'}</span>
                  </label>
                  <textarea
                    value={applyForm.message}
                    onChange={e => setApplyForm({...applyForm, message: e.target.value.slice(0, 150)})}
                    placeholder={language === 'ko' ? '본인 소개 및 참여 이유를 간단히...' : 'Giới thiệu ngắn về bạn và lý do muốn tham gia...'}
                    rows={2}
                    className="input w-full resize-none"
                  />
                  <p className="text-xs text-gray-600 text-right mt-0.5">{applyForm.message.length}/150</p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!applyForm.name || !applyForm.zalo || !applyForm.platformUrl || !applyForm.followers}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-xl shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                >
                  {language === 'ko' ? '🚀 지원서 제출' : '🚀 Gửi đơn ứng tuyển'}
                </button>

                <p className="text-center text-xs text-gray-500">
                  {language === 'ko' ? '무료 · 사전 등록 불필요 · 1-2일 내 결과 안내' : 'Miễn phí · Không cần đăng ký trước · Kết quả trong 1-2 ngày'}
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="p-8 text-center space-y-4">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <span className="text-5xl">🎉</span>
                </div>
                <h3 className="text-2xl font-black text-white">{language === 'ko' ? '제출 완료!' : 'Đã gửi thành công!'}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {language === 'ko' ? (
                    <><span className="text-white font-bold">{applyForm.name}</span>님의 지원서가 <span className="text-primary font-bold">{campaign.company}</span>에 전달되었습니다.<br/><br/>광고주가 <span className="text-accent font-bold">1-2 영업일</span> 내에 Zalo/Facebook으로 연락드립니다.</>
                  ) : (
                    <>Đơn ứng tuyển của <span className="text-white font-bold">{applyForm.name}</span> đã được gửi đến <span className="text-primary font-bold">{campaign.company}</span>.<br/><br/>Nhà QC sẽ liên hệ bạn qua Zalo/Facebook trong <span className="text-accent font-bold">1-2 ngày làm việc</span>.</>
                  )}
                </p>
                <div className="bg-dark-600 rounded-xl p-4 text-left space-y-2">
                  <div className="text-xs text-gray-400">📋 {language === 'ko' ? '지원서 요약' : 'Tóm tắt đơn'}</div>
                  <div className="text-sm text-white font-semibold">{language === 'ko' ? campaign.titleKo : campaign.titleVi}</div>
                  <div className="text-xs text-gray-400">{language === 'ko' ? '연락처' : 'Liên hệ'}: {applyForm.zalo}</div>
                  <div className="text-xs text-gray-400">Link: {applyForm.platformUrl}</div>
                </div>
                <button
                  onClick={() => { setShowApplyModal(false); router.push('/main/influencer/campaigns'); }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold"
                >
                  {t.campaignDetail.browseMoreCampaigns}
                </button>
              </div>
            )}
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
            <p className="text-sm text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t.campaignDetail.shareLinkModal.description.replace(formatPoints(SHARE_BONUS_AMOUNT) + ' VND', `<strong class="text-accent">${formatPoints(SHARE_BONUS_AMOUNT)} VND</strong>`) }} />

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
                      <p className="text-xs text-gray-300">{t.campaignDetail.shareLinkModal.facebookGroupsDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-success rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.campaignDetail.shareLinkModal.personalTimeline}</p>
                      <p className="text-xs text-gray-300">{t.campaignDetail.shareLinkModal.personalTimelineDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-success rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t.campaignDetail.shareLinkModal.facebookPages}</p>
                      <p className="text-xs text-gray-300">{t.campaignDetail.shareLinkModal.facebookPagesDesc}</p>
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
                      <p className="text-xs text-gray-300 mt-1">
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
                      <p className="text-xs text-gray-300 mt-1">
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
                      <p className="text-xs text-gray-300 mt-1">
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
                      <p className="text-xs text-gray-300 mt-1">
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
                      <p className="text-xs text-gray-300 mt-1">
                        {t.campaignDetail.shareLinkModal.step5Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended share content */}
              <div className="bg-dark-700 rounded-lg p-4 border border-dark-500">
                <h4 className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  {t.campaignDetail.shareLinkModal.recommendedContent}
                  <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">{t.campaignDetail.shareContent.stepBadge1}</span>
                </h4>
                <div className="bg-dark-600 rounded p-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
🎯 {language === 'ko' ? campaign.titleKo : campaign.titleVi}

{language === 'ko' ? campaign.descriptionKo : campaign.descriptionVi}

{t.campaignDetail.shareContent.expectedEarnings} {formatPoints(campaign.budget)} VND
{t.campaignDetail.shareContent.company} {campaign.company}
{t.campaignDetail.shareContent.deadline} {campaign.deadline}

{t.campaignDetail.shareContent.viewDetails} https://exfluencervn.vercel.app/main/influencer/campaigns/{params.id}

#influencer #marketing #vietnam #ExfluencerVN #KOL
                </div>
                <button
                  onClick={() => {
                    const campaignUrl = `https://exfluencervn.vercel.app/main/influencer/campaigns/${params.id}`;
                    const campaignTitle = language === 'ko' ? campaign.titleKo : campaign.titleVi;
                    const campaignDescription = language === 'ko' ? campaign.descriptionKo : campaign.descriptionVi;
                    const shareText = `🎯 ${campaignTitle}\n\n${campaignDescription}\n\n${t.campaignDetail.shareContent.expectedEarnings} ${formatPoints(campaign.budget)} VND\n${t.campaignDetail.shareContent.company} ${campaign.company}\n${t.campaignDetail.shareContent.deadline} ${campaign.deadline}\n\n${t.campaignDetail.shareContent.viewDetails} ${campaignUrl}\n\n#influencer #marketing #vietnam #ExfluencerVN #KOL`;
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
                  <p className="text-xs text-gray-300">
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
                    <p className="font-mono text-gray-300">facebook.com/groups/123/posts/456/</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.timelinePost}</p>
                    <p className="font-mono text-gray-300">facebook.com/username/posts/123456</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.pagePost}</p>
                    <p className="font-mono text-gray-300">facebook.com/pagename/posts/123456</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{t.campaignDetail.shareLinkModal.permalink}</p>
                    <p className="font-mono text-gray-300">facebook.com/permalink.php?story_fbid=...</p>
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
                    <h3 className="text-xl font-black text-white">{language === 'ko' ? '결제 안내' : 'Hướng dẫn thanh toán'}</h3>
                    <p className="text-xs text-blue-400">Payment Information</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentGuaranteeModal(false)}
                  className="btn-icon text-gray-300 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Mô tả chính */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  🤝 {language === 'ko' ? '직접 결제 시스템' : 'Hệ thống thanh toán trực tiếp'}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {language === 'ko' ? (
                    <>Exfluencer는 <span className="text-blue-400 font-bold">연결 플랫폼</span>입니다. 결제는 <span className="text-blue-400 font-bold">광고주와 인플루언서가 직접 협의</span>합니다. 플랫폼은 결제를 중개하거나 보관하지 않습니다.</>
                  ) : (
                    <>Exfluencer là <span className="text-blue-400 font-bold">nền tảng kết nối</span>. Thanh toán do <span className="text-blue-400 font-bold">nhà QC và influencer tự thỏa thuận</span> trực tiếp. Nền tảng không trung gian hoặc giữ tiền thanh toán.</>
                  )}
                </p>
              </div>

              {/* Phương thức thanh toán đề xuất */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">💳 {language === 'ko' ? '권장 결제 방법' : 'Phương thức thanh toán đề xuất'}</h4>

                <div className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-1">{language === 'ko' ? '계좌이체 (권장)' : 'Chuyển khoản ngân hàng (Khuyến nghị)'}</h5>
                      <p className="text-xs text-gray-300">
                        {language === 'ko' ? '안전하고 추적 가능합니다.' : 'An toàn và có thể theo dõi.'}
                        {' '}Vietcombank, Techcombank, VPBank, BIDV v.v.
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
                      <h5 className="text-sm font-semibold text-white mb-1">{language === 'ko' ? '전자지갑' : 'Ví điện tử'}</h5>
                      <p className="text-xs text-gray-300">
                        {language === 'ko' ? '빠르고 편리합니다.' : 'Nhanh và tiện lợi.'}
                        {' '}Momo, Zalo Pay, ViettelPay, ShopeePay
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
                      <h5 className="text-sm font-semibold text-white mb-1">{language === 'ko' ? '해외 송금' : 'Chuyển tiền quốc tế'}</h5>
                      <p className="text-xs text-gray-300">
                        {language === 'ko' ? '해외 광고주의 경우: PayPal, Wise (구 TransferWise) 등' : 'Với nhà QC nước ngoài: PayPal, Wise (trước là TransferWise) v.v.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quy trình thanh toán */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">📋 {language === 'ko' ? '결제 절차' : 'Quy trình thanh toán'}</h4>
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"></div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">{language === 'ko' ? '선정 후 협의' : 'Thỏa thuận sau khi được chọn'}</h5>
                        <p className="text-xs text-gray-300">{language === 'ko' ? '금액, 방법, 결제 일정 메시지 협의' : 'Nhắn tin thỏa thuận số tiền, phương thức và lịch thanh toán'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">{language === 'ko' ? '직접 결제' : 'Thanh toán trực tiếp'}</h5>
                        <p className="text-xs text-gray-300">{language === 'ko' ? '광고주가 인플루언서에게 직접 이체' : 'Nhà QC chuyển khoản trực tiếp cho influencer'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/60 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-semibold text-white">{language === 'ko' ? '양측 확인' : 'Xác nhận hai bên'}</h5>
                        <p className="text-xs text-gray-300">{language === 'ko' ? '양측이 플랫폼에서 "결제 완료" 확인' : 'Hai bên xác nhận "Hoàn tất thanh toán" trên nền tảng'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lưu ý */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  {t.campaignDetail.importantNotesTitle}
                </h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li>{t.campaignDetail.importantNote1}</li>
                  <li>{t.campaignDetail.importantNote2}</li>
                  <li>{t.campaignDetail.importantNote3}</li>
                  <li>{t.campaignDetail.importantNote4}</li>
                </ul>
              </div>

              {/* Nút xác nhận */}
              <button
                onClick={() => setShowPaymentGuaranteeModal(false)}
                className="w-full btn btn-primary py-4"
              >
                {language === 'ko' ? '✅ 확인했습니다' : '✅ Đã hiểu'}
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

      {/* 지원자 리스트 모달 */}
      {showApplicantsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowApplicantsModal(false)}>
          <div className="bg-dark-700 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-primary/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-primary" />
                {t.campaignDetail.recentApplicants}
              </h3>
              <button onClick={() => setShowApplicantsModal(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{t.campaignDetail.totalApplicants}</span>
                <span className="text-lg font-bold text-primary">{campaign.urgency.recentApplications} {language === 'ko' ? '명' : 'người'}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-300">{t.campaignDetail.slotsLeft}</span>
                <span className="text-lg font-bold text-warning">{campaign.urgency.remainingSlots}/{campaign.urgency.totalSlots}</span>
              </div>
            </div>

            <div className="space-y-3">
              {generateApplicantAvatars(params?.id as string || '1', campaign.urgency.recentApplications, 20, language as 'ko' | 'vi').map((avatar, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg hover:bg-dark-500 transition-all">
                  <div className="relative">
                    <img
                      src={avatar.url}
                      alt={avatar.name}
                      className="w-12 h-12 rounded-full border-2 border-primary/30"
                    />
                    {avatar.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-700"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      {avatar.name}
                      {avatar.badge && (
                        <span className={`${avatar.badge.color} text-white text-[10px] px-1.5 py-0.5 rounded-full`}>
                          {avatar.badge.type === 'verified' && '✓'}
                          {avatar.badge.type === 'popular' && '⭐'}
                          {avatar.badge.type === 'rising' && '🔥'}
                          {avatar.badge.type === 'new' && '🆕'}
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-300">{(avatar.followers / 1000).toFixed(1)}K {t.campaignDetail.followersUnit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-300">{avatar.applyTime}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-300 mt-4 p-3 bg-info/10 rounded-lg border border-info/30">
              {t.campaignDetail.competitionAlert}
            </p>
          </div>
        </div>
      )}

      {/* 수익 상세 모달 */}
      {showEarningsModal && campaign.earningsBreakdown && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowEarningsModal(false)}>
          <div className="bg-dark-700 rounded-2xl p-6 w-full max-w-md border border-success/30" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign size={20} className="text-success" />
                {t.campaignDetail.earningsBreakdown}
              </h3>
              <button onClick={() => setShowEarningsModal(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {/* 기본 페이 */}
              <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success" />
                    <span className="text-sm text-white">{t.campaignDetail.basePay}</span>
                  </div>
                  <span className="text-xl font-bold text-success">{formatPoints(campaign.earningsBreakdown.basePayment)}</span>
                </div>
                <p className="text-xs text-gray-300">{t.campaignDetail.guaranteedOnCompletion}</p>
              </div>

              {/* 제품 가치 */}
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gift size={16} className="text-primary" />
                    <span className="text-sm text-white">{t.campaignDetail.productValue}</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{formatPoints(campaign.earningsBreakdown.productValue)}</span>
                </div>
                <p className="text-xs text-gray-300">{t.campaignDetail.freeProducts}</p>
              </div>

              {/* 보너스 기회 */}
              {campaign.earningsBreakdown.bonusOpportunities.length > 0 && (
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Trophy size={16} className="text-warning" />
                    {t.campaignDetail.bonusOpportunity}
                  </h4>
                  <div className="space-y-2">
                    {campaign.earningsBreakdown.bonusOpportunities.map((bonus: any, idx: number) => (
                      <div key={idx} className="flex items-start justify-between text-xs">
                        <div className="flex-1">
                          <p className="text-white font-medium">{language === 'ko' ? bonus.typeKo : bonus.typeVi}</p>
                          <p className="text-gray-300">{language === 'ko' ? bonus.conditionKo : bonus.conditionVi}</p>
                        </div>
                        <span className="text-warning font-bold">+{formatPoints(bonus.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 총 예상 수익 */}
              <div className="p-4 bg-gradient-to-br from-success/20 to-primary/20 rounded-lg border-2 border-success">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-bold">{t.campaignDetail.totalExpectedEarnings}</span>
                  <span className="text-2xl font-bold text-success">
                    {formatPoints(
                      campaign.earningsBreakdown.basePayment +
                      campaign.earningsBreakdown.productValue +
                      campaign.earningsBreakdown.bonusOpportunities.reduce((sum: number, b: any) => sum + b.amount, 0)
                    )}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  {t.campaignDetail.maxEarningsWithBonus}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 mt-4 p-3 bg-info/10 rounded-lg border border-info/30">
              💡 {language === 'ko' ? '보너스는 성과 목표 달성 시 지급됩니다' : 'Tiền thưởng được trả khi đạt mục tiêu hiệu suất'}
            </p>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}

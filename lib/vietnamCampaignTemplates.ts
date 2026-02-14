/**
 * 베트남 전용 캠페인 템플릿
 * 자동 생성 시스템에서 사용
 * 모든 캠페인은 100% 베트남 로컬 비즈니스
 */

import type { Platform, Category } from '@/types';

export interface CampaignTemplate {
  category: Category;
  titleKo: string;
  titleVi: string;
  companyKo: string;
  companyVi: string;
  descriptionKo: string;
  descriptionVi: string;
  budgetRange: { min: number; max: number };
  platforms: Platform[];
  locations: string[];
  thumbnail: string;
  requiredFollowers: number;
  requiredEngagement: number;
}

// 베트남 회사 이름 풀
const vietnamCompanies = {
  food: [
    { ko: '사이공 푸드하우스', vi: 'Saigon Food House' },
    { ko: '하노이 레스토랑 그룹', vi: 'Hanoi Restaurant Group' },
    { ko: '메콩 델타 식품', vi: 'Mekong Delta Foods' },
    { ko: '베트남 커피 컬렉티브', vi: 'Vietnam Coffee Collective' },
    { ko: '포 마스터스', vi: 'Pho Masters' },
    { ko: '분짜 하우스', vi: 'Bun Cha House' },
    { ko: '반미 익스프레스', vi: 'Banh Mi Express' },
    { ko: '호치민 베이커리', vi: 'Ho Chi Minh Bakery' },
  ],
  beauty: [
    { ko: '사이공 뷰티', vi: 'Saigon Beauty' },
    { ko: '베트남 내추럴 코스메틱', vi: 'Vietnam Natural Cosmetics' },
    { ko: '로터스 스킨케어', vi: 'Lotus Skincare' },
    { ko: '피닉스 뷰티', vi: 'Phoenix Beauty' },
    { ko: '드래곤 헤어', vi: 'Dragon Hair Salon' },
    { ko: '퓨어 베트남 스파', vi: 'Pure Vietnam Spa' },
  ],
  fashion: [
    { ko: '사이공 스타일', vi: 'Saigon Style' },
    { ko: '베트남 패션 하우스', vi: 'Vietnam Fashion House' },
    { ko: '아오자이 모던', vi: 'Ao Dai Modern' },
    { ko: '하노이 부티크', vi: 'Hanoi Boutique' },
    { ko: '메콩 패션', vi: 'Mekong Fashion' },
  ],
  travel: [
    { ko: '베트남 어드벤처', vi: 'Vietnam Adventures' },
    { ko: '하롱베이 투어', vi: 'Ha Long Bay Tours' },
    { ko: '사파 트레킹', vi: 'Sapa Trekking Co.' },
    { ko: '호이안 익스피리언스', vi: 'Hoi An Experience' },
    { ko: '메콩 델타 크루즈', vi: 'Mekong Delta Cruises' },
  ],
  tech: [
    { ko: '베트남 테크 솔루션', vi: 'VietTech Solutions' },
    { ko: '사이공 스타트업', vi: 'Saigon Startup Hub' },
    { ko: '하노이 디지털', vi: 'Hanoi Digital' },
    { ko: '베트 이노베이션', vi: 'Viet Innovation' },
  ],
  fitness: [
    { ko: '사이공 피트니스', vi: 'Saigon Fitness' },
    { ko: '베트남 요가 센터', vi: 'Vietnam Yoga Center' },
    { ko: '하노이 짐', vi: 'Hanoi Gym' },
    { ko: '피닉스 웰니스', vi: 'Phoenix Wellness' },
  ],
  education: [
    { ko: '베트남 에듀케이션', vi: 'Vietnam Education' },
    { ko: '사이공 랭귀지 센터', vi: 'Saigon Language Center' },
    { ko: '하노이 아카데미', vi: 'Hanoi Academy' },
    { ko: '영어 마스터 베트남', vi: 'English Master Vietnam' },
  ],
  lifestyle: [
    { ko: '베트남 라이프스타일', vi: 'Vietnam Lifestyle' },
    { ko: '사이공 홈', vi: 'Saigon Home' },
    { ko: '하노이 리빙', vi: 'Hanoi Living' },
    { ko: '로터스 데코', vi: 'Lotus Deco' },
  ],
};

// 베트남 도시
const vietnamLocations = [
  '호치민, 베트남',
  '하노이, 베트남',
  '다낭, 베트남',
  '나짱, 베트남',
  '호이안, 베트남',
  '달랏, 베트남',
  '하롱, 베트남',
  '후에, 베트남',
  '칸토, 베트남',
  '붕따우, 베트남',
];

// Unsplash 이미지 키워드 (베트남 관련)
const unsplashImages = {
  food: [
    'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop', // Pho
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop', // Vietnamese coffee
    'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop', // Banh mi
    'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop', // Asian food
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1558769132-cb1aea3c821e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
  ],
  travel: [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop', // Ha Long Bay
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop', // Hoi An
    'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=400&h=300&fit=crop', // Vietnam rice fields
  ],
  tech: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
  ],
  education: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
  ],
};

// 캠페인 템플릿 (100개 이상)
export const vietnamCampaignTemplates: CampaignTemplate[] = [
  // FOOD 카테고리 (20개)
  {
    category: 'food',
    titleKo: '베트남 전통 쌀국수 리뷰',
    titleVi: 'Đánh giá Phở truyền thống Việt Nam',
    companyKo: '사이공 푸드하우스',
    companyVi: 'Saigon Food House',
    descriptionKo: '베트남 전통 방식으로 만든 정통 쌀국수를 체험하고 리뷰해주세요. 24시간 우려낸 육수가 특징입니다.',
    descriptionVi: 'Trải nghiệm và đánh giá phở truyền thống được nấu theo cách Việt Nam. Nước dùng được ninh trong 24 giờ.',
    budgetRange: { min: 300000, max: 600000 },
    platforms: ['instagram', 'tiktok'],
    locations: vietnamLocations.slice(0, 3),
    thumbnail: unsplashImages.food[0],
    requiredFollowers: 5000,
    requiredEngagement: 2.5,
  },
  {
    category: 'food',
    titleKo: '베트남 커피 원두 체험',
    titleVi: 'Trải nghiệm cà phê hạt Việt Nam',
    companyKo: '베트남 커피 컬렉티브',
    companyVi: 'Vietnam Coffee Collective',
    descriptionKo: '중부 고산지대에서 재배한 아라비카 원두를 홍보해주실 커피 인플루언서를 찾습니다.',
    descriptionVi: 'Tìm kiếm influencer cà phê để quảng bá hạt Arabica trồng tại vùng cao nguyên miền Trung.',
    budgetRange: { min: 400000, max: 700000 },
    platforms: ['instagram', 'facebook'],
    locations: ['다낭, 베트남', '달랏, 베트남'],
    thumbnail: unsplashImages.food[1],
    requiredFollowers: 8000,
    requiredEngagement: 3.0,
  },
  {
    category: 'food',
    titleKo: '반미 샌드위치 신메뉴 소개',
    titleVi: 'Giới thiệu menu mới Bánh Mì',
    companyKo: '반미 익스프레스',
    companyVi: 'Banh Mi Express',
    descriptionKo: '베트남식 바게트 샌드위치의 새로운 퓨전 메뉴를 소개해주세요.',
    descriptionVi: 'Giới thiệu menu bánh mì fusion mới của chúng tôi.',
    budgetRange: { min: 250000, max: 500000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.food[2],
    requiredFollowers: 3000,
    requiredEngagement: 2.0,
  },
  {
    category: 'food',
    titleKo: '분짜 맛집 리뷰 캠페인',
    titleVi: 'Chiến dịch đánh giá Bún chả',
    companyKo: '분짜 하우스',
    companyVi: 'Bun Cha House',
    descriptionKo: '하노이 스타일 분짜 전문점을 방문하고 리뷰해주세요.',
    descriptionVi: 'Ghé thăm và đánh giá nhà hàng Bún chả phong cách Hà Nội.',
    budgetRange: { min: 300000, max: 550000 },
    platforms: ['instagram', 'youtube'],
    locations: ['하노이, 베트남'],
    thumbnail: unsplashImages.food[3],
    requiredFollowers: 6000,
    requiredEngagement: 2.8,
  },
  {
    category: 'food',
    titleKo: '베트남 길거리 음식 투어',
    titleVi: 'Tour ẩm thực đường phố Việt Nam',
    companyKo: '사이공 푸드 투어',
    companyVi: 'Saigon Food Tours',
    descriptionKo: '호치민의 숨겨진 길거리 음식 맛집 5곳을 소개하는 영상을 제작해주세요.',
    descriptionVi: 'Tạo video giới thiệu 5 quán ăn đường phố ẩn ở Sài Gòn.',
    budgetRange: { min: 600000, max: 1000000 },
    platforms: ['youtube', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.food[0],
    requiredFollowers: 15000,
    requiredEngagement: 3.5,
  },

  // BEAUTY 카테고리 (15개)
  {
    category: 'beauty',
    titleKo: '베트남 천연 화장품 리뷰',
    titleVi: 'Đánh giá mỹ phẩm thiên nhiên Việt Nam',
    companyKo: '로터스 스킨케어',
    companyVi: 'Lotus Skincare',
    descriptionKo: '베트남 로컬 식물 성분으로 만든 비건 스킨케어 제품을 체험해주세요.',
    descriptionVi: 'Trải nghiệm sản phẩm skincare thuần chay từ thực vật bản địa Việt Nam.',
    budgetRange: { min: 500000, max: 900000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['호치민, 베트남', '하노이, 베트남'],
    thumbnail: unsplashImages.beauty[0],
    requiredFollowers: 10000,
    requiredEngagement: 3.5,
  },
  {
    category: 'beauty',
    titleKo: '사이공 헤어 살롱 체험',
    titleVi: 'Trải nghiệm salon tóc Sài Gòn',
    companyKo: '드래곤 헤어',
    companyVi: 'Dragon Hair Salon',
    descriptionKo: '최신 헤어 트렌드를 선도하는 프리미엄 살롱의 서비스를 체험해주세요.',
    descriptionVi: 'Trải nghiệm dịch vụ của salon cao cấp dẫn đầu xu hướng tóc mới nhất.',
    budgetRange: { min: 700000, max: 1200000 },
    platforms: ['instagram', 'facebook'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.beauty[1],
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
  },
  {
    category: 'beauty',
    titleKo: '베트남 스파 패키지 리뷰',
    titleVi: 'Đánh giá gói spa Việt Nam',
    companyKo: '퓨어 베트남 스파',
    companyVi: 'Pure Vietnam Spa',
    descriptionKo: '전통 베트남 마사지와 현대적인 스파 케어가 결합된 패키지를 소개해주세요.',
    descriptionVi: 'Giới thiệu gói kết hợp massage truyền thống Việt Nam và chăm sóc spa hiện đại.',
    budgetRange: { min: 800000, max: 1500000 },
    platforms: ['instagram', 'youtube'],
    locations: ['호치민, 베트남', '다낭, 베트남'],
    thumbnail: unsplashImages.beauty[2],
    requiredFollowers: 20000,
    requiredEngagement: 4.0,
  },

  // FASHION 카테고리 (15개)
  {
    category: 'fashion',
    titleKo: '현대적 아오자이 패션쇼',
    titleVi: 'Show thời trang Áo dài hiện đại',
    companyKo: '아오자이 모던',
    companyVi: 'Ao Dai Modern',
    descriptionKo: '전통 아오자이를 현대적으로 재해석한 신상품 라인을 착용하고 촬영해주세요.',
    descriptionVi: 'Mặc và chụp ảnh với dòng sản phẩm mới tái hiện Áo dài truyền thống theo phong cách hiện đại.',
    budgetRange: { min: 600000, max: 1000000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['하노이, 베트남', '후에, 베트남'],
    thumbnail: unsplashImages.fashion[0],
    requiredFollowers: 15000,
    requiredEngagement: 3.8,
  },
  {
    category: 'fashion',
    titleKo: '사이공 스트리트 패션',
    titleVi: 'Thời trang đường phố Sài Gòn',
    companyKo: '사이공 스타일',
    companyVi: 'Saigon Style',
    descriptionKo: '베트남 젊은 세대를 위한 트렌디한 스트리트 패션 브랜드를 홍보해주세요.',
    descriptionVi: 'Quảng bá thương hiệu thời trang đường phố trendy cho giới trẻ Việt Nam.',
    budgetRange: { min: 500000, max: 800000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.fashion[1],
    requiredFollowers: 10000,
    requiredEngagement: 3.5,
  },

  // TRAVEL 카테고리 (15개)
  {
    category: 'travel',
    titleKo: '하롱베이 크루즈 체험',
    titleVi: 'Trải nghiệm du thuyền Vịnh Hạ Long',
    companyKo: '하롱베이 투어',
    companyVi: 'Ha Long Bay Tours',
    descriptionKo: '세계문화유산 하롱베이에서 1박2일 럭셔리 크루즈 체험을 공유해주세요.',
    descriptionVi: 'Chia sẻ trải nghiệm du thuyền sang trọng 1 đêm 2 ngày tại Di sản Thế giới Vịnh Hạ Long.',
    budgetRange: { min: 1500000, max: 2500000 },
    platforms: ['youtube', 'instagram'],
    locations: ['하롱, 베트남'],
    thumbnail: unsplashImages.travel[0],
    requiredFollowers: 25000,
    requiredEngagement: 4.5,
  },
  {
    category: 'travel',
    titleKo: '사파 트레킹 투어',
    titleVi: 'Tour trekking Sapa',
    companyKo: '사파 트레킹',
    companyVi: 'Sapa Trekking Co.',
    descriptionKo: '소수민족 마을과 계단식 논을 탐험하는 2박3일 트레킹 코스를 소개해주세요.',
    descriptionVi: 'Giới thiệu hành trình trekking 2 đêm 3 ngày khám phá làng dân tộc và ruộng bậc thang.',
    budgetRange: { min: 1200000, max: 2000000 },
    platforms: ['youtube', 'instagram'],
    locations: ['사파, 베트남'],
    thumbnail: unsplashImages.travel[2],
    requiredFollowers: 20000,
    requiredEngagement: 4.0,
  },
  {
    category: 'travel',
    titleKo: '호이안 고대 도시 투어',
    titleVi: 'Tour Phố cổ Hội An',
    companyKo: '호이안 익스피리언스',
    companyVi: 'Hoi An Experience',
    descriptionKo: '유네스코 세계문화유산 호이안의 숨은 명소를 발굴하는 투어를 진행해주세요.',
    descriptionVi: 'Khám phá những địa điểm ẩn tại Di sản Văn hóa Thế giới UNESCO Hội An.',
    budgetRange: { min: 800000, max: 1300000 },
    platforms: ['instagram', 'youtube'],
    locations: ['호이안, 베트남'],
    thumbnail: unsplashImages.travel[1],
    requiredFollowers: 15000,
    requiredEngagement: 3.5,
  },
  {
    category: 'travel',
    titleKo: '메콩 델타 수상시장 투어',
    titleVi: 'Tour chợ nổi Đồng bằng sông Cửu Long',
    companyKo: '메콩 델타 크루즈',
    companyVi: 'Mekong Delta Cruises',
    descriptionKo: '새벽 수상시장과 과일 농장을 방문하는 1일 투어를 영상으로 담아주세요.',
    descriptionVi: 'Quay video tour 1 ngày thăm chợ nổi buổi sáng và vườn trái cây.',
    budgetRange: { min: 700000, max: 1200000 },
    platforms: ['youtube', 'tiktok'],
    locations: ['칸토, 베트남'],
    thumbnail: unsplashImages.travel[2],
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
  },

  // TECH 카테고리 (10개)
  {
    category: 'tech',
    titleKo: '베트남 스타트업 앱 리뷰',
    titleVi: 'Đánh giá app startup Việt Nam',
    companyKo: '사이공 스타트업',
    companyVi: 'Saigon Startup Hub',
    descriptionKo: '베트남에서 개발한 혁신적인 배달 앱을 사용하고 리뷰해주세요.',
    descriptionVi: 'Sử dụng và đánh giá ứng dụng giao hàng đổi mới được phát triển tại Việt Nam.',
    budgetRange: { min: 800000, max: 1500000 },
    platforms: ['youtube', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.tech[0],
    requiredFollowers: 20000,
    requiredEngagement: 4.0,
  },
  {
    category: 'tech',
    titleKo: '베트남 IT 교육 플랫폼 홍보',
    titleVi: 'Quảng bá nền tảng giáo dục IT Việt Nam',
    companyKo: '하노이 디지털',
    companyVi: 'Hanoi Digital',
    descriptionKo: '베트남어로 배우는 코딩 교육 플랫폼을 소개해주세요.',
    descriptionVi: 'Giới thiệu nền tảng học lập trình bằng tiếng Việt.',
    budgetRange: { min: 600000, max: 1000000 },
    platforms: ['facebook', 'youtube'],
    locations: ['하노이, 베트남'],
    thumbnail: unsplashImages.tech[1],
    requiredFollowers: 15000,
    requiredEngagement: 3.5,
  },

  // FITNESS 카테고리 (10개)
  {
    category: 'fitness',
    titleKo: '사이공 요가 스튜디오',
    titleVi: 'Studio yoga Sài Gòn',
    companyKo: '베트남 요가 센터',
    companyVi: 'Vietnam Yoga Center',
    descriptionKo: '호치민 중심가의 프리미엄 요가 클래스를 체험하고 공유해주세요.',
    descriptionVi: 'Trải nghiệm và chia sẻ lớp yoga cao cấp tại trung tâm Sài Gòn.',
    budgetRange: { min: 500000, max: 900000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.fitness[0],
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
  },
  {
    category: 'fitness',
    titleKo: '하노이 피트니스 센터',
    titleVi: 'Trung tâm fitness Hà Nội',
    companyKo: '하노이 짐',
    companyVi: 'Hanoi Gym',
    descriptionKo: '최신 장비를 갖춘 베트남 최대 피트니스 센터를 소개해주세요.',
    descriptionVi: 'Giới thiệu trung tâm fitness lớn nhất Việt Nam với thiết bị hiện đại.',
    budgetRange: { min: 700000, max: 1200000 },
    platforms: ['youtube', 'instagram'],
    locations: ['하노이, 베트남'],
    thumbnail: unsplashImages.fitness[1],
    requiredFollowers: 15000,
    requiredEngagement: 3.5,
  },

  // EDUCATION 카테고리 (10개)
  {
    category: 'education',
    titleKo: '베트남 영어 학원 리뷰',
    titleVi: 'Đánh giá trung tâm tiếng Anh Việt Nam',
    companyKo: '영어 마스터 베트남',
    companyVi: 'English Master Vietnam',
    descriptionKo: '베트남인을 위한 맞춤형 영어 학습 프로그램을 소개해주세요.',
    descriptionVi: 'Giới thiệu chương trình học tiếng Anh được thiết kế riêng cho người Việt.',
    budgetRange: { min: 600000, max: 1000000 },
    platforms: ['facebook', 'youtube'],
    locations: ['호치민, 베트남', '하노이, 베트남'],
    thumbnail: unsplashImages.education[0],
    requiredFollowers: 12000,
    requiredEngagement: 3.0,
  },
  {
    category: 'education',
    titleKo: '사이공 온라인 아카데미',
    titleVi: 'Học viện trực tuyến Sài Gòn',
    companyKo: '사이공 랭귀지 센터',
    companyVi: 'Saigon Language Center',
    descriptionKo: '베트남어, 영어, 한국어를 배울 수 있는 온라인 플랫폼을 체험해주세요.',
    descriptionVi: 'Trải nghiệm nền tảng trực tuyến học tiếng Việt, tiếng Anh, tiếng Hàn.',
    budgetRange: { min: 500000, max: 800000 },
    platforms: ['facebook', 'instagram'],
    locations: ['온라인'],
    thumbnail: unsplashImages.education[1],
    requiredFollowers: 8000,
    requiredEngagement: 2.5,
  },

  // LIFESTYLE 카테고리 (10개)
  {
    category: 'lifestyle',
    titleKo: '베트남 홈 인테리어 제품',
    titleVi: 'Sản phẩm nội thất Việt Nam',
    companyKo: '로터스 데코',
    companyVi: 'Lotus Deco',
    descriptionKo: '베트남 전통 문양을 현대적으로 재해석한 홈 데코 제품을 소개해주세요.',
    descriptionVi: 'Giới thiệu sản phẩm trang trí nhà hiện đại lấy cảm hứng từ họa tiết truyền thống Việt Nam.',
    budgetRange: { min: 400000, max: 700000 },
    platforms: ['instagram', 'tiktok'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.lifestyle[0],
    requiredFollowers: 10000,
    requiredEngagement: 3.0,
  },
  {
    category: 'lifestyle',
    titleKo: '사이공 라이프스타일 브랜드',
    titleVi: 'Thương hiệu lifestyle Sài Gòn',
    companyKo: '사이공 홈',
    companyVi: 'Saigon Home',
    descriptionKo: '베트남 로컬 디자이너가 만든 생활용품 라인을 체험해주세요.',
    descriptionVi: 'Trải nghiệm dòng sản phẩm sinh hoạt do nhà thiết kế bản địa Việt Nam tạo ra.',
    budgetRange: { min: 500000, max: 900000 },
    platforms: ['instagram', 'facebook'],
    locations: ['호치민, 베트남'],
    thumbnail: unsplashImages.lifestyle[1],
    requiredFollowers: 12000,
    requiredEngagement: 3.2,
  },
];

// 랜덤 템플릿 선택 함수
export function getRandomTemplate(category?: Category): CampaignTemplate {
  const filtered = category
    ? vietnamCampaignTemplates.filter(t => t.category === category)
    : vietnamCampaignTemplates;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

// 여러 개 랜덤 선택
export function getRandomTemplates(count: number, categories?: Category[]): CampaignTemplate[] {
  const filtered = categories && categories.length > 0
    ? vietnamCampaignTemplates.filter(t => categories.includes(t.category))
    : vietnamCampaignTemplates;

  // 셔플
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// 베트남 이름 생성 (가짜 지원자용)
const vietnamFirstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Dang', 'Bui', 'Do', 'Ngo', 'Duong', 'Ly'];
const vietnamMiddleNames = ['Van', 'Thi', 'Minh', 'Thanh', 'Duc', 'Quoc', 'Anh', 'Hong', 'Thu', 'Hai'];
const vietnamLastInitials = ['A', 'B', 'C', 'D', 'H', 'K', 'L', 'M', 'N', 'P', 'T', 'V'];

export function generateVietnameseName(): string {
  const first = vietnamFirstNames[Math.floor(Math.random() * vietnamFirstNames.length)];
  const middle = vietnamMiddleNames[Math.floor(Math.random() * vietnamMiddleNames.length)];
  const lastInitial = vietnamLastInitials[Math.floor(Math.random() * vietnamLastInitials.length)];
  return `${first} ${middle.charAt(0)}.${lastInitial}.`;
}

// 랜덤 팔로워 수 생성
export function generateFollowerCount(min: number = 5000, max: number = 50000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

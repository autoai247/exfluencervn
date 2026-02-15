'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  Eye,
  Award,
  Send,
  Calendar,
  Heart,
  MessageCircle,
  Bookmark,
  DollarSign,
  X,
  Building,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function InfluencerProfilePage() {
  const params = useParams();
  const { language } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // Mock data - 다중 SNS 플랫폼 지원
  const influencer = {
    id: params.id,
    name: '김민지',
    bio: language === 'ko'
      ? '뷰티 & 라이프스타일 크리에이터. 자연스러운 일상과 솔직한 제품 리뷰를 공유합니다.'
      : 'Beauty & Lifestyle Creator. Sharing natural daily life and honest product reviews.',
    avatar: 'https://ui-avatars.com/api/?name=Kim+Minji&background=E5E7EB&color=1F2937&size=200',
    categories: ['beauty', 'lifestyle'],
    platforms: [
      {
        platform: 'instagram',
        followers: 85000,
        engagement: 5.2,
        avgViews: 18000,
        username: '@minji_beauty',
        url: 'https://instagram.com/minji_beauty'
      },
      {
        platform: 'tiktok',
        followers: 40000,
        engagement: 4.1,
        avgViews: 7000,
        username: '@minji_official',
        url: 'https://tiktok.com/@minji_official'
      },
    ],
    followers: 125000, // 총합
    engagement: 4.8, // 평균
    platform: 'instagram', // 주력 플랫폼
    avgViews: 25000,
    rating: 4.9,
    completedCampaigns: 45,
    location: '호치민',
    verified: true,
    // 기본 정보
    gender: 'female',
    ageRange: '25-34',
    skinType: 'combination',
    skinTone: 'light',
    hasVehicle: false,
    // 상세 개인정보
    maritalStatus: 'single',
    hasChildren: false,
    numberOfChildren: 0,
    hasPets: true,
    petTypes: ['dog'],
    languages: ['korean', 'vietnamese', 'english'],
    education: 'bachelor',
    occupation: 'content_creator',
    interests: ['beauty', 'fashion', 'travel', 'food', 'fitness'],
    smoker: false,
    drinker: 'occasionally',
    recentWorks: [
      {
        id: '1',
        thumbnail: 'https://picsum.photos/seed/1/400/400',
        title: '스킨케어 루틴',
        views: 32000,
        platform: 'instagram',
      },
      {
        id: '2',
        thumbnail: 'https://picsum.photos/seed/2/400/400',
        title: '메이크업 튜토리얼',
        views: 28000,
        platform: 'instagram',
      },
      {
        id: '3',
        thumbnail: 'https://picsum.photos/seed/3/400/400',
        title: '일상 브이로그',
        views: 25000,
        platform: 'tiktok',
      },
    ],
    completedCampaignsList: [
      {
        id: 'c1',
        title: language === 'ko' ? '겨울 스킨케어 루틴 캠페인' : 'Chiến dịch chăm sóc da mùa đông',
        brand: 'Demo Brand VN',
        completedDate: '2026-02-10',
        payment: 250000,
        rating: 5.0,
        deliverables: language === 'ko'
          ? ['Instagram 포스트 1개', '스토리 3개']
          : ['1 bài đăng Instagram', '3 story'],
        results: {
          views: 32000,
          likes: 2400,
          comments: 156,
          saves: 890
        },
        thumbnail: 'https://picsum.photos/seed/c1/400/400'
      },
      {
        id: 'c2',
        title: language === 'ko' ? '봄 패션 룩북 콜라보' : 'Chiến dịch lookbook thời trang xuân',
        brand: 'Fashion Hub',
        completedDate: '2026-01-25',
        payment: 300000,
        rating: 4.8,
        deliverables: language === 'ko'
          ? ['TikTok 영상 2개', 'Instagram 릴스 1개']
          : ['2 video TikTok', '1 reel Instagram'],
        results: {
          views: 45000,
          likes: 3200,
          comments: 234,
          saves: 1200
        },
        thumbnail: 'https://picsum.photos/seed/c2/400/400'
      },
      {
        id: 'c3',
        title: language === 'ko' ? '건강 보조식품 리뷰' : 'Đánh giá thực phẩm chức năng',
        brand: 'HealthCare Plus',
        completedDate: '2026-01-15',
        payment: 200000,
        rating: 4.9,
        deliverables: language === 'ko'
          ? ['Instagram 포스트 2개', '스토리 5개']
          : ['2 bài đăng Instagram', '5 story'],
        results: {
          views: 28000,
          likes: 2100,
          comments: 189,
          saves: 750
        },
        thumbnail: 'https://picsum.photos/seed/c3/400/400'
      },
      {
        id: 'c4',
        title: language === 'ko' ? '여행 브이로그 시리즈' : 'Chuỗi vlog du lịch',
        brand: 'Travel Vietnam',
        completedDate: '2025-12-20',
        payment: 400000,
        rating: 5.0,
        deliverables: language === 'ko'
          ? ['YouTube 영상 1개', 'Instagram 릴스 3개']
          : ['1 video YouTube', '3 reel Instagram'],
        results: {
          views: 52000,
          likes: 4100,
          comments: 312,
          saves: 1500
        },
        thumbnail: 'https://picsum.photos/seed/c4/400/400'
      },
      {
        id: 'c5',
        title: language === 'ko' ? '홈 피트니스 챌린지' : 'Thử thách fitness tại nhà',
        brand: 'FitLife',
        completedDate: '2025-12-05',
        payment: 280000,
        rating: 4.7,
        deliverables: language === 'ko'
          ? ['TikTok 영상 3개', '스토리 7개']
          : ['3 video TikTok', '7 story'],
        results: {
          views: 38000,
          likes: 2800,
          comments: 198,
          saves: 980
        },
        thumbnail: 'https://picsum.photos/seed/c5/400/400'
      },
    ],
  };

  const t = {
    ko: {
      followers: '팔로워',
      totalFollowers: '총 팔로워',
      engagement: '참여율',
      avgViews: '평균 조회수',
      completed: '완료 캠페인',
      rating: '평점',
      verified: '인증됨',
      categories: '카테고리',
      location: '위치',
      snsChannels: 'SNS 채널',
      recentWorks: '최근 작업물',
      views: '조회수',
      contact: '제안하기',
      contactTitle: '캠페인 제안',
      sendProposal: '제안 보내기',
      cancel: '취소',
      profileInfo: '프로필 정보',
      gender: '성별',
      age: '연령대',
      skinType: '피부 타입',
      skinTone: '피부 톤',
      hasVehicle: '차량 보유',
      yes: '예',
      no: '아니오',
      male: '남성',
      female: '여성',
      // 완료 캠페인
      completedCampaigns: '완료한 캠페인',
      completedDate: '완료일',
      payment: '보상',
      deliverables: '제출물',
      results: '성과',
      campaignInfo: '캠페인 정보',
      brand: '브랜드',
      close: '닫기',
      likes: '좋아요',
      comments: '댓글',
      saves: '저장',
      // 상세 정보
      basicInfo: '기본 정보',
      lifestyleInfo: '생활 정보',
      languageEducation: '언어 & 교육',
      interestsTitle: '관심사',
      maritalStatus: '결혼 여부',
      children: '자녀',
      pets: '반려동물',
      languages_label: '구사 언어',
      education: '학력',
      occupation: '직업',
      lifestyle: '라이프스타일',
      smoker: '흡연',
      drinker: '음주',
      // 값
      single: '미혼',
      married: '기혼',
      divorced: '이혼',
      prefer_not_to_say: '비공개',
      dog: '강아지',
      cat: '고양이',
      bird: '새',
      fish: '물고기',
      other: '기타',
      korean: '한국어',
      vietnamese: '베트남어',
      english: '영어',
      highschool: '고등학교',
      bachelor: '학사',
      master: '석사',
      phd: '박사',
      content_creator: '콘텐츠 크리에이터',
      beauty: '뷰티',
      fashion: '패션',
      travel: '여행',
      food: '음식',
      fitness: '피트니스',
      never: '안함',
      occasionally: '가끔',
      regularly: '자주',
    },
    vi: {
      followers: 'Người theo dõi',
      totalFollowers: 'Tổng người theo dõi',
      engagement: 'Tương tác',
      avgViews: 'Lượt xem TB',
      completed: 'Chiến dịch hoàn thành',
      rating: 'Đánh giá',
      verified: 'Đã xác minh',
      categories: 'Danh mục',
      location: 'Vị trí',
      snsChannels: 'Kênh mạng xã hội',
      recentWorks: 'Công việc gần đây',
      views: 'Lượt xem',
      contact: 'Đề xuất',
      contactTitle: 'Đề xuất chiến dịch',
      sendProposal: 'Gửi đề xuất',
      cancel: 'Hủy',
      profileInfo: 'Thông tin hồ sơ',
      gender: 'Giới tính',
      age: 'Độ tuổi',
      skinType: 'Loại da',
      skinTone: 'Màu da',
      hasVehicle: 'Có xe',
      yes: 'Có',
      no: 'Không',
      male: 'Nam',
      female: 'Nữ',
      // 완료 캠페인
      completedCampaigns: 'Chiến dịch đã hoàn thành',
      completedDate: 'Ngày hoàn thành',
      payment: 'Thanh toán',
      deliverables: 'Sản phẩm',
      results: 'Kết quả',
      campaignInfo: 'Thông tin chiến dịch',
      brand: 'Thương hiệu',
      close: 'Đóng',
      likes: 'Thích',
      comments: 'Bình luận',
      saves: 'Lưu',
      // 상세 정보
      basicInfo: 'Thông tin cơ bản',
      lifestyleInfo: 'Thông tin cuộc sống',
      languageEducation: 'Ngôn ngữ & Giáo dục',
      interestsTitle: 'Sở thích',
      maritalStatus: 'Tình trạng hôn nhân',
      children: 'Con cái',
      pets: 'Thú cưng',
      languages_label: 'Ngôn ngữ',
      education: 'Học vấn',
      occupation: 'Nghề nghiệp',
      lifestyle: 'Lối sống',
      smoker: 'Hút thuốc',
      drinker: 'Uống rượu',
      // 값
      single: 'Độc thân',
      married: 'Đã kết hôn',
      divorced: 'Ly hôn',
      prefer_not_to_say: 'Không tiết lộ',
      dog: 'Chó',
      cat: 'Mèo',
      bird: 'Chim',
      fish: 'Cá',
      other: 'Khác',
      korean: 'Tiếng Hàn',
      vietnamese: 'Tiếng Việt',
      english: 'Tiếng Anh',
      highschool: 'Trung học',
      bachelor: 'Cử nhân',
      master: 'Thạc sĩ',
      phd: 'Tiến sĩ',
      content_creator: 'Nhà sáng tạo nội dung',
      beauty: 'Làm đẹp',
      fashion: 'Thời trang',
      travel: 'Du lịch',
      food: 'Ẩm thực',
      fitness: 'Thể hình',
      never: 'Không bao giờ',
      occasionally: 'Thỉnh thoảng',
      regularly: 'Thường xuyên',
    },
  };

  const text = t[language];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram size={20} className="text-pink-600" />;
      case 'tiktok':
        return <FaTiktok size={20} className="text-gray-900" />;
      case 'youtube':
        return <FaYoutube size={20} className="text-red-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ko' ? 'ko-KR' : 'vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title="" showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
            />
            {influencer.verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle size={16} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{influencer.name}</h1>
              {getPlatformIcon(influencer.platform)}
            </div>
            <p className="text-sm text-gray-600 mb-3">{influencer.bio}</p>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{influencer.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-gray-900 font-semibold">{influencer.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {(influencer.followers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">{text.totalFollowers}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{influencer.engagement}%</div>
            <div className="text-xs text-gray-500 mt-1">{text.engagement}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {(influencer.avgViews / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">{text.avgViews}</div>
          </div>
        </div>

        {/* SNS Channels */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {text.snsChannels} ({influencer.platforms.length}개)
          </h3>
          <div className="space-y-3">
            {influencer.platforms.map((platData: any) => {
              const icon = getPlatformIcon(platData.platform);
              return (
                <a
                  key={platData.platform}
                  href={platData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      {icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 capitalize">{platData.platform}</p>
                      <p className="text-xs text-gray-500">{platData.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {(platData.followers / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-gray-500">{platData.engagement}% 참여율</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">{text.categories}</h3>
          <div className="flex flex-wrap gap-2">
            {influencer.categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Information - 기본 정보 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{text.basicInfo}</h3>
          <div className="space-y-3">
            {influencer.gender && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.gender}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.gender === 'male' ? text.male : text.female}
                </span>
              </div>
            )}
            {influencer.ageRange && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.age}</span>
                <span className="text-sm font-semibold text-gray-900">{influencer.ageRange}</span>
              </div>
            )}
            {influencer.skinType && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.skinType}</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">{influencer.skinType}</span>
              </div>
            )}
            {influencer.skinTone && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.skinTone}</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">{influencer.skinTone}</span>
              </div>
            )}
          </div>
        </div>

        {/* 생활 정보 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{text.lifestyleInfo}</h3>
          <div className="space-y-3">
            {influencer.maritalStatus && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.maritalStatus}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {text[influencer.maritalStatus as keyof typeof text] || influencer.maritalStatus}
                </span>
              </div>
            )}
            {influencer.hasChildren !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.children}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasChildren ? `${text.yes} (${influencer.numberOfChildren})` : text.no}
                </span>
              </div>
            )}
            {influencer.hasPets !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.pets}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasPets
                    ? influencer.petTypes.map((pet: string) => text[pet as keyof typeof text] || pet).join(', ')
                    : text.no
                  }
                </span>
              </div>
            )}
            {influencer.hasVehicle !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.hasVehicle}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasVehicle ? text.yes : text.no}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 언어 & 교육 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{text.languageEducation}</h3>
          <div className="space-y-3">
            {influencer.languages && (
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600">{text.languages_label}</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {influencer.languages.map((lang: string) => (
                    <span key={lang} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {text[lang as keyof typeof text] || lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {influencer.education && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.education}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {text[influencer.education as keyof typeof text] || influencer.education}
                </span>
              </div>
            )}
            {influencer.occupation && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.occupation}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {text[influencer.occupation as keyof typeof text] || influencer.occupation}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 관심사 */}
        {influencer.interests && influencer.interests.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{text.interestsTitle}</h3>
            <div className="flex flex-wrap gap-2">
              {influencer.interests.map((interest: string) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-sm rounded-full border border-purple-100"
                >
                  {text[interest as keyof typeof text] || interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 라이프스타일 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{text.lifestyle}</h3>
          <div className="space-y-3">
            {influencer.smoker !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.smoker}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.smoker ? text.yes : text.no}
                </span>
              </div>
            )}
            {influencer.drinker && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.drinker}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {text[influencer.drinker as keyof typeof text] || influencer.drinker}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Works */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{text.recentWorks}</h3>
          <div className="grid grid-cols-3 gap-2">
            {influencer.recentWorks.map((work) => (
              <div key={work.id} className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <div className="flex items-center gap-1 text-white text-xs">
                    <Eye size={12} />
                    <span>{(work.views / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 완료한 캠페인 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {text.completedCampaigns} ({influencer.completedCampaigns}개)
          </h3>
          <div className="space-y-3">
            {influencer.completedCampaignsList.slice(0, 5).map((campaign: any) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex gap-3">
                  <img
                    src={campaign.thumbnail}
                    alt={campaign.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                      {campaign.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Building size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-600">{campaign.brand}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{formatDate(campaign.completedDate)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{(campaign.results.views / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} />
                        <span>{(campaign.results.likes / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{campaign.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{text.completed}</span>
            <span className="text-sm font-semibold text-gray-900">
              {influencer.completedCampaigns}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{text.rating}</span>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">{influencer.rating}</span>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={() => setShowContactModal(true)}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <Send size={18} />
          {text.contact}
        </button>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{text.contactTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ko'
                ? '캠페인 상세 정보를 입력하고 인플루언서에게 제안을 보내세요.'
                : 'Nhập thông tin chi tiết chiến dịch và gửi đề xuất cho influencer.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
                {text.cancel}
              </button>
              <button
                onClick={() => {
                  alert(language === 'ko' ? '제안이 전송되었습니다!' : 'Đề xuất đã được gửi!');
                  setShowContactModal(false);
                }}
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
              >
                {text.sendProposal}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 캠페인 상세 모달 */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{text.campaignInfo}</h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* 내용 */}
            <div className="p-6 space-y-6">
              {/* 캠페인 이미지 */}
              <img
                src={selectedCampaign.thumbnail}
                alt={selectedCampaign.title}
                className="w-full h-48 object-cover rounded-xl"
              />

              {/* 캠페인 정보 */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedCampaign.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Building size={16} className="text-gray-400" />
                    <span>{selectedCampaign.brand}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{formatDate(selectedCampaign.completedDate)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold text-gray-900">{selectedCampaign.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedCampaign.payment)}</span>
                  </div>
                </div>
              </div>

              {/* 제출물 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">{text.deliverables}</h5>
                <ul className="space-y-1">
                  {selectedCampaign.deliverables.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 지표 */}
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-3">{text.results}</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Eye size={16} className="text-blue-600" />
                      <span className="text-sm text-blue-600 font-semibold">{text.views}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(selectedCampaign.results.views / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Heart size={16} className="text-pink-600" />
                      <span className="text-sm text-pink-600 font-semibold">{text.likes}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(selectedCampaign.results.likes / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <MessageCircle size={16} className="text-purple-600" />
                      <span className="text-sm text-purple-600 font-semibold">{text.comments}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedCampaign.results.comments}
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Bookmark size={16} className="text-yellow-600" />
                      <span className="text-sm text-yellow-600 font-semibold">{text.saves}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedCampaign.results.saves}
                    </div>
                  </div>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
              >
                {text.close}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="advertiser" />
    </div>
  );
}

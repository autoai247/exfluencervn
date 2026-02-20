'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import Breadcrumb from '@/components/common/Breadcrumb';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function InfluencerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
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
        thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
        title: language === 'ko' ? '아침 스킨케어 루틴 & 제품 추천' : 'Quy trình chăm sóc da buổi sáng',
        description: language === 'ko' ? '건조한 겨울철 피부 관리 팁' : 'Mẹo chăm sóc da mùa đông',
        views: 32000,
        likes: 2400,
        comments: 156,
        platform: 'instagram',
        date: '2026-02-10',
        contentType: 'Reel'
      },
      {
        id: '2',
        thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
        title: language === 'ko' ? '데일리 메이크업 튜토리얼' : 'Hướng dẫn trang điểm hàng ngày',
        description: language === 'ko' ? '자연스러운 직장인 메이크업' : 'Makeup tự nhiên cho công sở',
        views: 28000,
        likes: 2100,
        comments: 89,
        platform: 'instagram',
        date: '2026-02-08',
        contentType: 'Post'
      },
      {
        id: '3',
        thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
        title: language === 'ko' ? '주말 브이로그 | 카페 투어' : 'Vlog cuối tuần | Tour cafe',
        description: language === 'ko' ? '호치민 숨은 카페 탐방' : 'Khám phá cafe ẩn HCM',
        views: 25000,
        likes: 1800,
        comments: 124,
        platform: 'tiktok',
        date: '2026-02-05',
        contentType: 'Video'
      },
    ],
    // 광고주 리뷰 목록
    reviews: [
      {
        id: 'r1',
        advertiserId: 'adv1',
        advertiser: 'Demo Brand VN',
        advertiserLogo: 'https://ui-avatars.com/api/?name=Demo+Brand&background=FF6B6B&color=fff',
        rating: 5.0,
        comment: language === 'ko'
          ? '매우 성실하게 작업해주셨고, 소통도 원활했습니다. 콘텐츠 퀄리티가 기대 이상이었어요! 다음에도 꼭 함께 하고 싶습니다.'
          : 'Rất chuyên nghiệp và nhiệt tình. Chất lượng nội dung vượt mong đợi! Mong được hợp tác tiếp.',
        date: '2026-02-12',
        campaignTitle: language === 'ko' ? '겨울 스킨케어 루틴 캠페인' : 'Chiến dịch chăm sóc da mùa đông',
        tags: language === 'ko' ? ['성실함', '소통 원활', '퀄리티 우수'] : ['Chuyên nghiệp', 'Giao tiếp tốt', 'Chất lượng cao']
      },
      {
        id: 'r2',
        advertiserId: 'adv2',
        advertiser: 'Fashion Hub',
        advertiserLogo: 'https://ui-avatars.com/api/?name=Fashion+Hub&background=4ECDC4&color=fff',
        rating: 4.8,
        comment: language === 'ko'
          ? '창의적인 아이디어와 트렌디한 스타일링이 돋보였습니다. 기한도 정확히 지켜주셔서 좋았어요.'
          : 'Ý tưởng sáng tạo và phong cách trendy. Đúng thời hạn cam kết.',
        date: '2026-01-27',
        campaignTitle: language === 'ko' ? '봄 패션 룩북 콜라보' : 'Chiến dịch lookbook thời trang xuân',
        tags: language === 'ko' ? ['창의적', '트렌디', '기한 준수'] : ['Sáng tạo', 'Trendy', 'Đúng hạn']
      },
      {
        id: 'r3',
        advertiserId: 'adv3',
        advertiser: 'HealthCare Plus',
        advertiserLogo: 'https://ui-avatars.com/api/?name=Health+Care&background=6C5CE7&color=fff',
        rating: 4.9,
        comment: language === 'ko'
          ? '제품에 대한 이해도가 높고, 솔직한 리뷰를 작성해주셔서 감사합니다. 팔로워 반응도 매우 좋았습니다.'
          : 'Hiểu sâu về sản phẩm và đánh giá trung thực. Phản hồi từ người theo dõi rất tốt.',
        date: '2026-01-17',
        campaignTitle: language === 'ko' ? '건강 보조식품 리뷰' : 'Đánh giá thực phẩm chức năng',
        tags: language === 'ko' ? ['전문성', '솔직함', '높은 반응'] : ['Chuyên môn', 'Trung thực', 'Phản hồi cao']
      },
      {
        id: 'r4',
        advertiserId: 'adv4',
        advertiser: 'Travel Vietnam',
        advertiserLogo: 'https://ui-avatars.com/api/?name=Travel+VN&background=00B894&color=fff',
        rating: 5.0,
        comment: language === 'ko'
          ? '영상 편집 실력이 뛰어나고, 스토리텔링이 매우 자연스러웠습니다. 최고의 파트너였어요!'
          : 'Kỹ năng dựng video xuất sắc và kể chuyện rất tự nhiên. Đối tác tuyệt vời!',
        date: '2025-12-22',
        campaignTitle: language === 'ko' ? '여행 브이로그 시리즈' : 'Chuỗi vlog du lịch',
        tags: language === 'ko' ? ['편집 우수', '스토리텔링', '적극 추천'] : ['Dựng video tốt', 'Kể chuyện hay', 'Khuyên dùng']
      },
      {
        id: 'r5',
        advertiserId: 'adv5',
        advertiser: 'FitLife',
        advertiserLogo: 'https://ui-avatars.com/api/?name=FitLife&background=FFA502&color=fff',
        rating: 4.7,
        comment: language === 'ko'
          ? '에너지 넘치는 콘텐츠로 많은 사람들에게 영감을 주었습니다. 약간의 피드백 수정이 있었지만 전체적으로 만족합니다.'
          : 'Nội dung tràn đầy năng lượng và truyền cảm hứng. Có chỉnh sửa nhỏ nhưng tổng thể rất hài lòng.',
        date: '2025-12-07',
        campaignTitle: language === 'ko' ? '홈 피트니스 챌린지' : 'Thử thách fitness tại nhà',
        tags: language === 'ko' ? ['에너지 넘침', '영감', '적극적'] : ['Năng động', 'Truyền cảm hứng', 'Tích cực']
      }
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
        thumbnail: 'https://picsum.photos/seed/c1/400/400',
        advertiserReview: {
          rating: 5.0,
          comment: language === 'ko'
            ? '매우 성실하게 작업해주셨고, 소통도 원활했습니다. 콘텐츠 퀄리티가 기대 이상이었어요!'
            : 'Rất chuyên nghiệp và nhiệt tình. Chất lượng nội dung vượt mong đợi!',
          wouldRecommend: true
        }
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
        thumbnail: 'https://picsum.photos/seed/c2/400/400',
        advertiserReview: {
          rating: 4.8,
          comment: language === 'ko'
            ? '창의적인 아이디어와 트렌디한 스타일링이 돋보였습니다. 기한도 정확히 지켜주셔서 좋았어요.'
            : 'Ý tưởng sáng tạo và phong cách trendy. Đúng thời hạn cam kết.',
          wouldRecommend: true
        }
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
        thumbnail: 'https://picsum.photos/seed/c3/400/400',
        advertiserReview: {
          rating: 4.9,
          comment: language === 'ko'
            ? '제품에 대한 이해도가 높고, 솔직한 리뷰를 작성해주셔서 감사합니다.'
            : 'Hiểu sâu về sản phẩm và đánh giá trung thực.',
          wouldRecommend: true
        }
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

      <div className="container-mobile pt-4">
        <Breadcrumb
          items={[
            { label: 'Influencers', href: '/main/advertiser/influencers' },
            { label: influencer.name },
          ]}
        />
      </div>

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
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">{t.advertiser.influencerDetail.totalFollowers}</div>
            <div className="text-2xl font-bold text-gray-900">
              {(influencer.followers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {language === 'ko' ? '전체 플랫폼 합계' : 'Tổng tất cả nền tảng'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">
              {language === 'ko' ? '평균 팔로워' : 'TB người theo dõi'}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(influencer.followers / influencer.platforms.length / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {language === 'ko' ? '플랫폼당 평균' : 'Trung bình mỗi nền tảng'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{influencer.engagement}%</div>
            <div className="text-xs text-gray-500 mt-1">{t.advertiser.influencerDetail.engagement}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {(influencer.avgViews / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">{t.advertiser.influencerDetail.avgViews}</div>
          </div>
        </div>

        {/* SNS Channels */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t.advertiser.influencerDetail.snsChannels} ({influencer.platforms.length})
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
                    <p className="text-xs text-gray-500">{platData.engagement}% {language === 'ko' ? '참여율' : 'tương tác'}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.advertiser.influencerDetail.categories}</h3>
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

        {/* Reviews Section - 광고주 리뷰 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{t.advertiser.influencerDetail.reviews}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {influencer.reviews.length} {t.advertiser.influencerDetail.reviewsCount}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-gray-900">{influencer.rating}</span>
              </div>
              <p className="text-xs text-gray-500">{t.advertiser.influencerDetail.overallRating}</p>
            </div>
          </div>

          <div className="space-y-4">
            {influencer.reviews.slice(0, 3).map((review: any) => (
              <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={review.advertiserLogo}
                    alt={review.advertiser}
                    className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
                    onClick={() => alert(language === 'ko' ? `${review.advertiser} 프로필 페이지 (준비 중)` : `Trang hồ sơ ${review.advertiser} (Đang chuẩn bị)`)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                        onClick={() => alert(language === 'ko' ? `${review.advertiser} 프로필 페이지 (준비 중)` : `Trang hồ sơ ${review.advertiser} (Đang chuẩn bị)`)}
                      >
                        {review.advertiser}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{review.campaignTitle}</p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {review.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {influencer.reviews.length > 3 && (
            <button className="w-full mt-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              {t.advertiser.influencerDetail.viewAll} ({influencer.reviews.length})
            </button>
          )}
        </div>

        {/* Profile Information - 기본 정보 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.advertiser.influencerDetail.basicInfo}</h3>
          <div className="space-y-3">
            {influencer.gender && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.gender}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.gender === 'male' ? t.advertiser.influencerDetail.male : t.advertiser.influencerDetail.female}
                </span>
              </div>
            )}
            {influencer.ageRange && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.age}</span>
                <span className="text-sm font-semibold text-gray-900">{influencer.ageRange}</span>
              </div>
            )}
            {influencer.skinType && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.skinType}</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">{influencer.skinType}</span>
              </div>
            )}
            {influencer.skinTone && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.skinTone}</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">{influencer.skinTone}</span>
              </div>
            )}
          </div>
        </div>

        {/* 생활 정보 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.advertiser.influencerDetail.lifestyleInfo}</h3>
          <div className="space-y-3">
            {influencer.maritalStatus && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.maritalStatus}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {t.advertiser.influencerDetail[influencer.maritalStatus as keyof typeof t.advertiser.influencerDetail] || influencer.maritalStatus}
                </span>
              </div>
            )}
            {influencer.hasChildren !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.children}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasChildren ? `${t.advertiser.influencerDetail.yes} (${influencer.numberOfChildren})` : t.advertiser.influencerDetail.no}
                </span>
              </div>
            )}
            {influencer.hasPets !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.pets}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasPets
                    ? influencer.petTypes.map((pet: string) => t.advertiser.influencerDetail[pet as keyof typeof t.advertiser.influencerDetail] || pet).join(', ')
                    : t.advertiser.influencerDetail.no
                  }
                </span>
              </div>
            )}
            {influencer.hasVehicle !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.hasVehicle}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.hasVehicle ? t.advertiser.influencerDetail.yes : t.advertiser.influencerDetail.no}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 언어 & 교육 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.advertiser.influencerDetail.languageEducation}</h3>
          <div className="space-y-3">
            {influencer.languages && (
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.languages}</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {influencer.languages.map((lang: string) => (
                    <span key={lang} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {t.advertiser.influencerDetail[lang as keyof typeof t.advertiser.influencerDetail] || lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {influencer.education && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.education}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {t.advertiser.influencerDetail[influencer.education as keyof typeof t.advertiser.influencerDetail] || influencer.education}
                </span>
              </div>
            )}
            {influencer.occupation && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.occupation}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {t.advertiser.influencerDetail[influencer.occupation as keyof typeof t.advertiser.influencerDetail] || influencer.occupation}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 관심사 */}
        {influencer.interests && influencer.interests.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.advertiser.influencerDetail.interests}</h3>
            <div className="flex flex-wrap gap-2">
              {influencer.interests.map((interest: string) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-sm rounded-full border border-purple-100"
                >
                  {t.advertiser.influencerDetail[interest as keyof typeof t.advertiser.influencerDetail] || interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 라이프스타일 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.advertiser.influencerDetail.lifestyle}</h3>
          <div className="space-y-3">
            {influencer.smoker !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.smoker}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {influencer.smoker ? t.advertiser.influencerDetail.yes : t.advertiser.influencerDetail.no}
                </span>
              </div>
            )}
            {influencer.drinker && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.drinker}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {t.advertiser.influencerDetail[influencer.drinker as keyof typeof t.advertiser.influencerDetail] || influencer.drinker}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Works - 개선된 버전 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t.advertiser.influencerDetail.recentWorks}
            <span className="text-xs text-gray-500 font-normal ml-2">
              {language === 'ko' ? '(콘텐츠 스타일 확인)' : '(Kiểm tra phong cách nội dung)'}
            </span>
          </h3>
          <div className="space-y-3">
            {influencer.recentWorks.map((work: any) => (
              <div key={work.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1">
                    {getPlatformIcon(work.platform)}
                  </div>
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white">
                    {work.contentType}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{work.title}</h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">{work.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{(work.views / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{(work.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>{work.comments}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(work.date)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
            💡 {language === 'ko' ? '최근 작업물을 통해 인플루언서의 콘텐츠 스타일, 편집 품질, 톤을 확인하세요' : 'Xem phong cách nội dung, chất lượng chỉnh sửa và tone của influencer qua các công việc gần đây'}
          </p>
        </div>

        {/* 완료한 캠페인 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t.advertiser.influencerDetail.completedCampaigns} ({influencer.completedCampaigns})
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
            <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.completedCampaigns}</span>
            <span className="text-sm font-semibold text-gray-900">
              {influencer.completedCampaigns}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t.advertiser.influencerDetail.rating}</span>
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
          {t.advertiser.influencerDetail.contact}
        </button>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.advertiser.influencerDetail.contactTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ko' ? '캠페인 상세 정보를 입력하고 인플루언서에게 제안서를 보내세요.' : 'Nhập thông tin chi tiết chiến dịch và gửi đề xuất cho influencer.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  alert(language === 'ko' ? '제안서가 전송되었습니다!' : 'Đề xuất đã được gửi!');
                  setShowContactModal(false);
                }}
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
              >
                {t.advertiser.influencerDetail.sendProposal}
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
              <h3 className="text-lg font-bold text-gray-900">{t.advertiser.influencerDetail.campaignInfo}</h3>
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
                <h5 className="text-sm font-semibold text-gray-900 mb-2">{t.advertiser.influencerDetail.deliverables}</h5>
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
                <h5 className="text-sm font-semibold text-gray-900 mb-3">{t.advertiser.influencerDetail.results}</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Eye size={16} className="text-blue-600" />
                      <span className="text-sm text-blue-600 font-semibold">{t.advertiser.influencerDetail.views}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(selectedCampaign.results.views / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Heart size={16} className="text-pink-600" />
                      <span className="text-sm text-pink-600 font-semibold">{t.advertiser.influencerDetail.likes}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(selectedCampaign.results.likes / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <MessageCircle size={16} className="text-purple-600" />
                      <span className="text-sm text-purple-600 font-semibold">{t.advertiser.influencerDetail.comments}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedCampaign.results.comments}
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Bookmark size={16} className="text-yellow-600" />
                      <span className="text-sm text-yellow-600 font-semibold">{t.advertiser.influencerDetail.saves}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedCampaign.results.saves}
                    </div>
                  </div>
                </div>
              </div>

              {/* 광고주 평가 */}
              {selectedCampaign.advertiserReview && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={18} className="text-green-600 fill-green-600" />
                    <h4 className="text-sm font-semibold text-gray-900">
                      {language === 'ko' ? '광고주 평가' : 'Đánh giá từ nhà quảng cáo'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= selectedCampaign.advertiserReview.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {selectedCampaign.advertiserReview.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    "{selectedCampaign.advertiserReview.comment}"
                  </p>
                  {selectedCampaign.advertiserReview.wouldRecommend && (
                    <div className="flex items-center gap-1 text-xs text-green-700">
                      <CheckCircle size={14} />
                      <span className="font-medium">{t.advertiser.influencerDetail.wouldRecommend}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
              >
                {t.advertiser.influencerDetail.close}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="advertiser" />
    </div>
  );
}

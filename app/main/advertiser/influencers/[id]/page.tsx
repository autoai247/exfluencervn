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
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function InfluencerProfilePage() {
  const params = useParams();
  const { language } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data
  const influencer = {
    id: params.id,
    name: '김민지',
    bio: language === 'ko'
      ? '뷰티 & 라이프스타일 크리에이터. 자연스러운 일상과 솔직한 제품 리뷰를 공유합니다.'
      : 'Beauty & Lifestyle Creator. Sharing natural daily life and honest product reviews.',
    avatar: 'https://ui-avatars.com/api/?name=Kim+Minji&background=E5E7EB&color=1F2937&size=200',
    categories: ['beauty', 'lifestyle'],
    followers: 125000,
    engagement: 4.8,
    rating: 4.9,
    completedCampaigns: 45,
    location: '호치민',
    platform: 'instagram',
    avgViews: 25000,
    verified: true,
    recentWorks: [
      {
        id: '1',
        thumbnail: 'https://picsum.photos/seed/1/400/400',
        title: '스킨케어 루틴',
        views: 32000,
      },
      {
        id: '2',
        thumbnail: 'https://picsum.photos/seed/2/400/400',
        title: '메이크업 튜토리얼',
        views: 28000,
      },
      {
        id: '3',
        thumbnail: 'https://picsum.photos/seed/3/400/400',
        title: '일상 브이로그',
        views: 25000,
      },
    ],
  };

  const t = {
    ko: {
      followers: '팔로워',
      engagement: '참여율',
      avgViews: '평균 조회수',
      completed: '완료 캠페인',
      rating: '평점',
      verified: '인증됨',
      categories: '카테고리',
      location: '위치',
      recentWorks: '최근 작업물',
      views: '조회수',
      contact: '제안하기',
      contactTitle: '캠페인 제안',
      sendProposal: '제안 보내기',
      cancel: '취소',
    },
    vi: {
      followers: 'Người theo dõi',
      engagement: 'Tương tác',
      avgViews: 'Lượt xem TB',
      completed: 'Chiến dịch hoàn thành',
      rating: 'Đánh giá',
      verified: 'Đã xác minh',
      categories: 'Danh mục',
      location: 'Vị trí',
      recentWorks: 'Công việc gần đây',
      views: 'Lượt xem',
      contact: 'Đề xuất',
      contactTitle: 'Đề xuất chiến dịch',
      sendProposal: 'Gửi đề xuất',
      cancel: 'Hủy',
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
            <div className="text-xs text-gray-500 mt-1">{text.followers}</div>
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

      <BottomNav userType="advertiser" />
    </div>
  );
}

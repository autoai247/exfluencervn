'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Zap, Award, Gem, TrendingUp, Crown, Sparkles, Tag, LucideIcon } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Shop item type definition
interface ShopItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  icon: LucideIcon;
  color: string;
  featured?: boolean;
  popular?: boolean;
  benefits?: string[];
}

// Mock shop items
const shopCategories: Record<'premium' | 'boost' | 'training', ShopItem[]> = {
  premium: [
    {
      id: 'premium-1',
      name: '프리미엄 뱃지',
      nameEn: 'Premium Badge',
      description: '프로필에 프리미엄 인증 뱃지 표시',
      descriptionEn: 'Display premium verified badge on profile',
      price: 500000,
      icon: Crown,
      color: 'from-yellow-400 to-orange-500',
      featured: true,
      benefits: ['프로필 상단 노출', '캠페인 우선 매칭', '전용 고객 지원'],
    },
    {
      id: 'premium-2',
      name: 'VIP 회원권 (30일)',
      nameEn: 'VIP Membership (30 days)',
      description: 'VIP 전용 혜택 및 프리미엄 캠페인 접근',
      descriptionEn: 'VIP exclusive benefits and premium campaigns',
      price: 1200000,
      icon: Gem,
      color: 'from-purple-400 to-pink-500',
      featured: true,
      benefits: ['프리미엄 캠페인 우선 선택', '수수료 20% 할인', '월간 리포트 제공'],
    },
  ],
  boost: [
    {
      id: 'boost-1',
      name: '프로필 부스트 (7일)',
      nameEn: 'Profile Boost (7 days)',
      description: '검색 결과 상단 노출 및 추천 목록 우선 배치',
      descriptionEn: 'Top search results and featured placement',
      price: 300000,
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      popular: true,
    },
    {
      id: 'boost-2',
      name: '캠페인 신청 부스트',
      nameEn: 'Application Boost',
      description: '캠페인 신청 시 광고주에게 우선 추천',
      descriptionEn: 'Priority recommendation to advertisers',
      price: 150000,
      icon: Zap,
      color: 'from-green-400 to-emerald-500',
    },
  ],
  training: [
    {
      id: 'training-1',
      name: '인플루언서 마스터 클래스',
      nameEn: 'Influencer Master Class',
      description: '전문가 강의 및 성공 전략 공유',
      descriptionEn: 'Expert lectures and success strategies',
      price: 800000,
      icon: Award,
      color: 'from-indigo-400 to-purple-500',
    },
    {
      id: 'training-2',
      name: '콘텐츠 제작 가이드북',
      nameEn: 'Content Creation Guidebook',
      description: '프로 콘텐츠 제작 비법 및 템플릿',
      descriptionEn: 'Pro content creation tips and templates',
      price: 250000,
      icon: Sparkles,
      color: 'from-pink-400 to-rose-500',
    },
  ],
};

export default function InfluencerShopPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'premium' | 'boost' | 'training'>('all');

  const categories = [
    { id: 'all', label: language === 'ko' ? '전체' : 'All', icon: ShoppingBag },
    { id: 'premium', label: language === 'ko' ? '프리미엄' : 'Premium', icon: Crown },
    { id: 'boost', label: language === 'ko' ? '부스트' : 'Boost', icon: Zap },
    { id: 'training', label: language === 'ko' ? '교육' : 'Training', icon: Award },
  ];

  const handlePurchase = (item: ShopItem) => {
    alert(
      language === 'ko'
        ? `"${item.name}" 구매 기능은 곧 출시됩니다!\n\n가격: ${formatPoints(item.price)} VND`
        : `"${item.nameEn}" purchase coming soon!\n\nPrice: ${formatPoints(item.price)} VND`
    );
  };

  const renderItems = (): ShopItem[] => {
    if (selectedCategory === 'all') {
      return [...shopCategories.premium, ...shopCategories.boost, ...shopCategories.training];
    }
    return shopCategories[selectedCategory];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 pb-20">
      <MobileHeader title={language === 'ko' ? '상점' : 'Shop'} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-bold">
                {language === 'ko' ? '인플루언서 성장 아이템' : 'Influencer Growth Items'}
              </h2>
            </div>
            <p className="text-sm text-white/90">
              {language === 'ko'
                ? '프리미엄 기능으로 더 많은 기회를 얻으세요'
                : 'Get more opportunities with premium features'}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Shop Items */}
        <div className="space-y-4">
          {renderItems().map((item) => {
            const Icon = item.icon;
            const isFeatured = 'featured' in item && item.featured;
            const isPopular = 'popular' in item && item.popular;

            return (
              <div
                key={item.id}
                className="relative bg-dark-600/80 backdrop-blur-xl rounded-2xl p-5 border border-dark-500/50 hover:border-primary/50 transition-all hover:scale-[1.02] group"
              >
                {/* Badge */}
                {(isFeatured || isPopular) && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-accent to-warning rounded-full text-xs font-bold text-dark-800 shadow-lg flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    {isFeatured ? (language === 'ko' ? '추천' : 'Featured') : (language === 'ko' ? '인기' : 'Popular')}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {language === 'ko' ? item.name : item.nameEn}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      {language === 'ko' ? item.description : item.descriptionEn}
                    </p>

                    {/* Benefits */}
                    {'benefits' in item && item.benefits && (
                      <div className="space-y-1 mb-3">
                        {item.benefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price & Button */}
                    <div className="flex items-center justify-between gap-3 mt-3">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {formatPoints(item.price)}
                        </div>
                        <div className="text-xs text-gray-400">VND</div>
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all"
                      >
                        {language === 'ko' ? '구매하기' : 'Buy Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Notice */}
        <div className="bg-dark-600/50 backdrop-blur-sm rounded-xl p-4 border border-dark-500/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Tag size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">
                {language === 'ko' ? '💡 포인트 적립 팁' : '💡 Points Earning Tips'}
              </h4>
              <p className="text-xs text-gray-400">
                {language === 'ko'
                  ? '캠페인 참여, 리뷰 작성, 친구 추천으로 포인트를 적립하고 프리미엄 아이템을 무료로 받으세요!'
                  : 'Participate in campaigns, write reviews, and refer friends to earn points for free premium items!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

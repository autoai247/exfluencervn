'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Zap, TrendingUp, Target, BarChart3, Users, Crown, Gift, Tag, LucideIcon } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';

// Shop item type definition
interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
  color: string;
  featured?: boolean;
  popular?: boolean;
  bonus?: string;
  benefits?: string[];
}

// Mock shop items for advertisers
const shopCategories: Record<'campaigns' | 'analytics' | 'credits', ShopItem[]> = {
  campaigns: [
    {
      id: 'campaign-1',
      name: '캠페인 부스트 패키지',
      description: '캠페인을 상단에 노출하여 더 많은 지원자 확보',
      price: 1000000,
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      featured: true,
      benefits: ['지원자 수 3배 증가', '검색 결과 상단 고정 7일', '프리미엄 인플루언서 추천'],
    },
    {
      id: 'campaign-2',
      name: 'AI 매칭 프리미엄',
      description: '고급 AI 알고리즘으로 최적의 인플루언서 자동 매칭',
      price: 800000,
      icon: Target,
      color: 'from-purple-400 to-pink-500',
      popular: true,
      benefits: ['매칭 정확도 95%', '시간 절약 70%', '전문 컨설팅 포함'],
    },
  ],
  analytics: [
    {
      id: 'analytics-1',
      name: '프리미엄 분석 리포트',
      description: '상세한 캠페인 성과 분석 및 ROI 리포트',
      price: 500000,
      icon: BarChart3,
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'analytics-2',
      name: '경쟁사 벤치마크',
      description: '동종 업계 캠페인 데이터 및 트렌드 분석',
      price: 1200000,
      icon: Users,
      color: 'from-orange-400 to-red-500',
      featured: true,
    },
  ],
  credits: [
    {
      id: 'credits-1',
      name: '광고 크레딧 10,000,000 VND',
      description: '캠페인 예산으로 사용 가능한 크레딧 (10% 보너스)',
      price: 9000000,
      icon: Gift,
      color: 'from-yellow-400 to-orange-500',
      popular: true,
      bonus: '+ 1,000,000 VND 보너스',
    },
    {
      id: 'credits-2',
      name: 'VIP 멤버십 (연간)',
      description: 'VIP 전용 혜택 및 프리미엄 서비스 무제한',
      price: 5000000,
      icon: Crown,
      color: 'from-indigo-400 to-purple-500',
      featured: true,
      benefits: ['모든 수수료 30% 할인', '전담 매니저 배정', '우선 고객 지원', '월간 전략 리포트'],
    },
  ],
};

export default function AdvertiserShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'campaigns' | 'analytics' | 'credits'>('all');

  const categories = [
    { id: 'all', label: '전체', icon: ShoppingBag },
    { id: 'campaigns', label: '캠페인', icon: Zap },
    { id: 'analytics', label: '분석', icon: BarChart3 },
    { id: 'credits', label: '크레딧', icon: Gift },
  ];

  const handlePurchase = (item: ShopItem) => {
    alert(`"${item.name}" 구매 기능은 곧 출시됩니다!\n\n가격: ${formatPoints(item.price)} VND`);
  };

  const renderItems = (): ShopItem[] => {
    if (selectedCategory === 'all') {
      return [...shopCategories.campaigns, ...shopCategories.analytics, ...shopCategories.credits];
    }
    return shopCategories[selectedCategory];
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title="상점 Shop" showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-bold">비즈니스 성장 솔루션</h2>
            </div>
            <p className="text-sm text-gray-300">
              프리미엄 도구로 캠페인 효율을 극대화하세요
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
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
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Shop Items */}
        <div className="space-y-6">
          {renderItems().map((item) => {
            const Icon = item.icon;
            const isFeatured = 'featured' in item && item.featured;
            const isPopular = 'popular' in item && item.popular;

            return (
              <div
                key={item.id}
                className="relative bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-gray-900 transition-all shadow-xl group"
              >
                {/* Badge */}
                {(isFeatured || isPopular) && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gray-900 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    {isFeatured ? '추천' : '인기'}
                  </div>
                )}

                {'bonus' in item && item.bonus && (
                  <div className="absolute -top-2 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-gray-900 shadow-lg">
                    {item.bonus}
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>

                    {/* Benefits */}
                    {'benefits' in item && item.benefits && (
                      <div className="space-y-1 mb-3">
                        {item.benefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-1 h-1 rounded-full bg-gray-900" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price & Button */}
                    <div className="flex items-center justify-between gap-3 mt-3">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPoints(item.price)}
                        </div>
                        <div className="text-xs text-gray-500">VND</div>
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all"
                      >
                        구매하기 Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Notice */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900/10 flex items-center justify-center flex-shrink-0">
              <Tag size={18} className="text-gray-900" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                💼 비즈니스 문의
              </h4>
              <p className="text-xs text-gray-600">
                대량 구매 또는 맞춤형 솔루션이 필요하신가요? 전담 매니저가 상담해드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav userType="advertiser" />
    </div>
  );
}

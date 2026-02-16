'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Zap, Award, Gem, TrendingUp, Crown, Sparkles, Tag, Gift, Ticket, Trophy, Smartphone, Plane, Camera, Headphones, Watch, LucideIcon } from 'lucide-react';
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
const shopCategories: Record<'raffles' | 'tickets' | 'premium' | 'boost' | 'training', ShopItem[]> = {
  raffles: [
    {
      id: 'raffle-1',
      name: 'iPhone 16 Pro 응모',
      nameEn: 'iPhone 16 Pro Raffle',
      description: '최신 iPhone 16 Pro 256GB - 응모권 1장으로 참여',
      descriptionEn: 'Latest iPhone 16 Pro 256GB - Enter with 1 ticket',
      price: 50000,
      icon: Smartphone,
      color: 'from-blue-400 to-purple-500',
      featured: true,
      benefits: ['iPhone 16 Pro 256GB', '당첨자 1명', '응모 마감: 2026-03-15', '응모권 1장 필요'],
    },
    {
      id: 'raffle-2',
      name: '다낭 3박4일 여행 응모',
      nameEn: 'Da Nang 4D3N Trip Raffle',
      description: '5성급 리조트 + 항공권 포함 럭셔리 여행 - 응모권 2장',
      descriptionEn: '5-star resort + flights included - 2 tickets required',
      price: 100000,
      icon: Plane,
      color: 'from-cyan-400 to-blue-500',
      featured: true,
      benefits: ['5성급 리조트 3박', '왕복 항공권 포함', '당첨자 2명', '응모권 2장 필요'],
    },
    {
      id: 'raffle-3',
      name: 'Sony A7 IV 카메라 응모',
      nameEn: 'Sony A7 IV Camera Raffle',
      description: '전문가용 풀프레임 미러리스 카메라 + 렌즈 키트',
      descriptionEn: 'Professional full-frame mirrorless camera + lens kit',
      price: 100000,
      icon: Camera,
      color: 'from-gray-400 to-gray-600',
      popular: true,
      benefits: ['Sony A7 IV 바디', '28-70mm 렌즈 포함', '당첨자 1명', '응모권 2장 필요'],
    },
    {
      id: 'raffle-4',
      name: 'AirPods Pro 2 응모',
      nameEn: 'AirPods Pro 2 Raffle',
      description: '최신 노이즈캔슬링 무선 이어폰',
      descriptionEn: 'Latest noise-canceling wireless earbuds',
      price: 30000,
      icon: Headphones,
      color: 'from-white to-gray-300',
      popular: true,
      benefits: ['AirPods Pro 2세대', '당첨자 3명', '응모 마감: 2026-02-28', '응모권 1장 필요'],
    },
    {
      id: 'raffle-5',
      name: 'Apple Watch Ultra 2 응모',
      nameEn: 'Apple Watch Ultra 2 Raffle',
      description: '프리미엄 스마트워치 - 티타늄 케이스',
      descriptionEn: 'Premium smartwatch - Titanium case',
      price: 80000,
      icon: Watch,
      color: 'from-orange-400 to-red-500',
      featured: true,
      benefits: ['Apple Watch Ultra 2', '티타늄 케이스', '당첨자 1명', '응모권 1장 필요'],
    },
    {
      id: 'raffle-6',
      name: '제주도 2박3일 여행 응모',
      nameEn: 'Jeju Island 3D2N Trip Raffle',
      description: '호텔 + 렌터카 + 체험 투어 포함',
      descriptionEn: 'Hotel + car rental + experience tours included',
      price: 100000,
      icon: Plane,
      color: 'from-green-400 to-emerald-500',
      popular: true,
      benefits: ['4성급 호텔 2박', '렌터카 3일', '체험투어 포함', '응모권 2장 필요'],
    },
  ],
  tickets: [
    {
      id: 'ticket-1',
      name: '응모권 1장',
      nameEn: '1 Raffle Ticket',
      description: '모든 경품 응모에 사용 가능한 응모권',
      descriptionEn: 'Use for any raffle campaign',
      price: 50000,
      icon: Ticket,
      color: 'from-orange-400 to-red-500',
      popular: true,
    },
    {
      id: 'ticket-2',
      name: '응모권 5장 패키지',
      nameEn: '5 Raffle Tickets Pack',
      description: '5장 구매 시 10% 할인 (225,000 VND)',
      descriptionEn: '10% discount on 5 tickets',
      price: 225000,
      icon: Ticket,
      color: 'from-orange-400 to-red-500',
      featured: true,
      benefits: ['10% 할인', '5장 = 225,000 VND', '즉시 사용 가능'],
    },
    {
      id: 'ticket-3',
      name: '응모권 10장 패키지',
      nameEn: '10 Raffle Tickets Pack',
      description: '10장 구매 시 20% 할인 (400,000 VND)',
      descriptionEn: '20% discount on 10 tickets',
      price: 400000,
      icon: Ticket,
      color: 'from-orange-400 to-red-500',
      featured: true,
      benefits: ['20% 할인', '10장 = 400,000 VND', '프리미엄 경품 접근'],
    },
  ],
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'raffles' | 'tickets' | 'premium' | 'boost' | 'training'>('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { id: 'all', label: language === 'ko' ? '전체' : 'All', icon: ShoppingBag },
    { id: 'raffles', label: language === 'ko' ? '경품응모' : 'Raffles', icon: Gift },
    { id: 'tickets', label: language === 'ko' ? '응모권구매' : 'Tickets', icon: Ticket },
    { id: 'premium', label: language === 'ko' ? '프리미엄' : 'Premium', icon: Crown },
    { id: 'boost', label: language === 'ko' ? '부스트' : 'Boost', icon: Zap },
    { id: 'training', label: language === 'ko' ? '교육' : 'Training', icon: Award },
  ];

  const handlePurchase = (item: ShopItem) => {
    // 응모권은 수량 선택 모달 표시
    if (item.id.startsWith('ticket-')) {
      setSelectedItem(item);
      setQuantity(1);
      setShowPurchaseModal(true);
    } else {
      // 다른 상품은 기존 방식
      alert(
        language === 'ko'
          ? `"${item.name}" 구매 기능은 곧 출시됩니다!\n\n가격: ${formatPoints(item.price)} VND`
          : `"${item.nameEn}" purchase coming soon!\n\nPrice: ${formatPoints(item.price)} VND`
      );
    }
  };

  const confirmPurchase = () => {
    if (!selectedItem) return;
    const totalPrice = selectedItem.price * quantity;
    alert(
      language === 'ko'
        ? `${selectedItem.name} ${quantity}장 구매 완료!\n\n총 금액: ${formatPoints(totalPrice)} VND\n\n보유 응모권이 ${quantity}장 증가했습니다!`
        : `${selectedItem.nameEn} x${quantity} purchased!\n\nTotal: ${formatPoints(totalPrice)} VND\n\nYou received ${quantity} raffle tickets!`
    );
    setShowPurchaseModal(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const renderItems = (): ShopItem[] => {
    if (selectedCategory === 'all') {
      return [...shopCategories.raffles, ...shopCategories.tickets, ...shopCategories.premium, ...shopCategories.boost, ...shopCategories.training];
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
        <div className="space-y-6">
          {renderItems().map((item) => {
            const Icon = item.icon;
            const isFeatured = 'featured' in item && item.featured;
            const isPopular = 'popular' in item && item.popular;

            return (
              <div
                key={item.id}
                className="relative bg-dark-600/80 backdrop-blur-xl rounded-2xl p-5 border-2 border-dark-500/50 hover:border-primary/50 transition-all hover:scale-[1.02] group shadow-xl"
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
        <div className="bg-dark-600/50 backdrop-blur-sm rounded-xl p-4 border-2 border-dark-500/50 shadow-xl">
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

      {/* Purchase Modal (Quantity Selector) */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-2xl w-full max-w-md p-6 border-2 border-primary/30 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'ko' ? '응모권 구매' : 'Purchase Tickets'}
            </h3>

            {/* Item Info */}
            <div className="bg-dark-700 rounded-xl p-4 mb-4 border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedItem.color} flex items-center justify-center shadow-xl`}>
                  <Ticket size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{language === 'ko' ? selectedItem.name : selectedItem.nameEn}</h4>
                  <p className="text-sm text-gray-400">{formatPoints(selectedItem.price)} VND / {language === 'ko' ? '장' : 'ticket'}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {language === 'ko' ? '수량' : 'Quantity'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-dark-700 border-2 border-dark-500 text-white font-bold text-xl hover:bg-dark-600 hover:border-primary/50 transition-all"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-dark-700 border-2 border-dark-500 rounded-xl px-4 py-3 text-center text-2xl font-bold text-white focus:border-primary focus:outline-none"
                    min="1"
                  />
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-dark-700 border-2 border-dark-500 text-white font-bold text-xl hover:bg-dark-600 hover:border-primary/50 transition-all"
                >
                  +
                </button>
              </div>

              {/* Quick Select */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 5, 10, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                      quantity === num
                        ? 'bg-primary text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border-2 border-dark-500'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 rounded-xl p-4 mb-4 shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{language === 'ko' ? '응모권' : 'Tickets'}</span>
                <span className="text-white font-semibold">{quantity} {language === 'ko' ? '장' : 'pcs'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{language === 'ko' ? '단가' : 'Unit Price'}</span>
                <span className="text-white font-semibold">{formatPoints(selectedItem.price)} VND</span>
              </div>
              <div className="h-px bg-primary/30 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">{language === 'ko' ? '총 금액' : 'Total'}</span>
                <span className="text-primary font-bold text-xl">{formatPoints(selectedItem.price * quantity)} VND</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedItem(null);
                  setQuantity(1);
                }}
                className="flex-1 btn btn-ghost"
              >
                {language === 'ko' ? '취소' : 'Cancel'}
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 btn btn-primary"
              >
                {language === 'ko' ? '구매하기' : 'Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}

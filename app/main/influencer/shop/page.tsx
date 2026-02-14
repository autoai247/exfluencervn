'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Gift, Zap, Star, Award, TrendingUp, Ticket, Plane, Smartphone, Laptop, DollarSign, CreditCard, Flame, Users } from 'lucide-react';
import { formatPoints, formatShoppingPoints } from '@/lib/points';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import LivePurchaseFeed from '@/components/common/LivePurchaseFeed';
import UrgencyTimer, { StockProgress, UrgencyBadge } from '@/components/common/UrgencyTimer';
import SocialMetaTags from '@/components/common/SocialMetaTags';
import PrimaryCTA from '@/components/common/PrimaryCTA';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: any;
  iconColor: string;
  bgColor: string;
  category: 'raffle' | 'boost' | 'feature' | 'gift';
  stock?: number;
  bestseller?: boolean;
  totalTickets?: number; // 총 목표 응모권 수
  currentTickets?: number; // 현재 모인 응모권 수
  ticketsPerPurchase?: number; // 1회 구매당 응모권 수
  prizeValue?: string; // 상품 가치
}

// Initial shop items function (now uses translations)
const getInitialShopItems = (t: any): ShopItem[] => [
  // 🎫 응모권 시스템 (최우선 배치)
  {
    id: 'korea-dream',
    name: t.shop.products.koreaDream.name,
    description: t.shop.products.koreaDream.description,
    price: 100000,
    icon: Plane,
    iconColor: 'text-red-500',
    bgColor: 'bg-gradient-to-br from-red-500/20 to-blue-500/20',
    category: 'raffle',
    bestseller: true,
    totalTickets: 100000,
    currentTickets: 78432,
    ticketsPerPurchase: 1,
    prizeValue: '50,000,000 VND (2인)',
  },
  {
    id: 'iphone-raffle',
    name: t.shop.products.iphoneRaffle.name,
    description: t.shop.products.iphoneRaffle.description,
    price: 100000,
    icon: Smartphone,
    iconColor: 'text-blue-500',
    bgColor: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
    category: 'raffle',
    bestseller: true,
    totalTickets: 50000,
    currentTickets: 32145,
    ticketsPerPurchase: 1,
    prizeValue: '35,000,000 VND',
  },
  {
    id: 'macbook-raffle',
    name: t.shop.products.macbookRaffle.name,
    description: t.shop.products.macbookRaffle.description,
    price: 100000,
    icon: Laptop,
    iconColor: 'text-purple-500',
    bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    category: 'raffle',
    totalTickets: 40000,
    currentTickets: 21567,
    ticketsPerPurchase: 1,
    prizeValue: '48,000,000 VND',
  },
  {
    id: 'cash-10m-raffle',
    name: t.shop.products.cash10mRaffle.name,
    description: t.shop.products.cash10mRaffle.description,
    price: 50000,
    icon: DollarSign,
    iconColor: 'text-green-500',
    bgColor: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    category: 'raffle',
    bestseller: true,
    totalTickets: 30000,
    currentTickets: 18234,
    ticketsPerPurchase: 1,
    prizeValue: '10,000,000 VND',
  },
  {
    id: 'giftcard-500k-raffle',
    name: t.shop.products.giftcard500kRaffle.name,
    description: t.shop.products.giftcard500kRaffle.description,
    price: 30000,
    icon: CreditCard,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
    category: 'raffle',
    totalTickets: 20000,
    currentTickets: 12456,
    ticketsPerPurchase: 1,
    prizeValue: '500,000 VND',
  },

  // 기존 상품들
  {
    id: '1',
    name: t.shop.products.profileBoost.name,
    description: t.shop.products.profileBoost.description,
    price: 100000,
    originalPrice: 150000,
    icon: TrendingUp,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
    category: 'boost',
  },
  {
    id: '2',
    name: t.shop.products.premiumBadge.name,
    description: t.shop.products.premiumBadge.description,
    price: 200000,
    icon: Award,
    iconColor: 'text-accent',
    bgColor: 'bg-accent/10',
    category: 'feature',
    bestseller: true,
  },
  {
    id: '3',
    name: t.shop.products.prioritySupport.name,
    description: t.shop.products.prioritySupport.description,
    price: 50000,
    icon: Zap,
    iconColor: 'text-warning',
    bgColor: 'bg-warning/10',
    category: 'boost',
    stock: 50,
  },
  {
    id: '4',
    name: t.shop.products.starInfluencer.name,
    description: t.shop.products.starInfluencer.description,
    price: 300000,
    icon: Star,
    iconColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
    category: 'feature',
  },
  {
    id: '5',
    name: t.shop.products.profileHighlight.name,
    description: t.shop.products.profileHighlight.description,
    price: 80000,
    icon: TrendingUp,
    iconColor: 'text-success',
    bgColor: 'bg-success/10',
    category: 'boost',
  },
  {
    id: '6',
    name: t.shop.products.starbucksGiftcard.name,
    description: t.shop.products.starbucksGiftcard.description,
    price: 50000,
    icon: Gift,
    iconColor: 'text-info',
    bgColor: 'bg-info/10',
    category: 'gift',
    stock: 10,
  },
];

export default function ShopPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const categories = [
    { id: 'all', name: t.shop.productCategories.all, icon: ShoppingCart },
    { id: 'raffle', name: t.shop.productCategories.raffleTickets, icon: Ticket },
    { id: 'boost', name: t.shop.productCategories.boost, icon: Zap },
    { id: 'feature', name: t.shop.productCategories.feature, icon: Star },
    { id: 'gift', name: t.shop.productCategories.gift, icon: Gift },
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>('raffle'); // 응모권 기본값
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [currentPoints, setCurrentPoints] = useState(2500000); // 실제 포인트 상태 관리
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  // Initialize and load shop items from localStorage on mount
  useEffect(() => {
    const initialItems = getInitialShopItems(t);
    const stored = localStorage.getItem('exfluencer_shop_items');
    if (stored) {
      try {
        const savedItems = JSON.parse(stored);
        // Merge with initialShopItems to preserve icon components and translations
        const mergedItems = initialItems.map(initial => {
          const saved = savedItems.find((s: any) => s.id === initial.id);
          return saved ? { ...initial, stock: saved.stock } : initial;
        });
        setShopItems(mergedItems);
      } catch (e) {
        console.error('Failed to load shop items from localStorage', e);
        setShopItems(initialItems);
      }
    } else {
      setShopItems(initialItems);
    }
  }, [t]);

  const filteredItems =
    selectedCategory === 'all'
      ? shopItems
      : shopItems.filter((item) => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedItem) return;

    if (currentPoints < selectedItem.price) {
      alert(`${t.shop.alertInsufficientPoints}\n\n${t.shop.alertRequired} ${formatShoppingPoints(selectedItem.price)}\n${t.shop.alertOwned} ${formatShoppingPoints(currentPoints)}`);
      setShowPurchaseModal(false);
      return;
    }

    // Check stock availability
    if (selectedItem.stock !== undefined && selectedItem.stock <= 0) {
      alert(`${t.shop.alertOutOfStock}\n\n${t.shop.outOfStock}`);
      setShowPurchaseModal(false);
      return;
    }

    // ✅ 실제 포인트 차감!
    const newPoints = currentPoints - selectedItem.price;
    setCurrentPoints(newPoints);

    // ✅ 재고 차감!
    const updatedItems = shopItems.map(item => {
      if (item.id === selectedItem.id && item.stock !== undefined) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    });
    setShopItems(updatedItems);

    // Save updated stock to localStorage (only save id and stock)
    const stockData = updatedItems.map(item => ({ id: item.id, stock: item.stock }));
    localStorage.setItem('exfluencer_shop_items', JSON.stringify(stockData));

    // ✅ 응모권 구매 시 랭킹 데이터 및 히스토리 저장
    if (selectedItem.category === 'raffle' && selectedItem.ticketsPerPurchase) {
      const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
      const itemId = selectedItem.id;
      raffleTickets[itemId] = (raffleTickets[itemId] || 0) + selectedItem.ticketsPerPurchase;
      localStorage.setItem('exfluencer_raffle_tickets', JSON.stringify(raffleTickets));

      // 구매 히스토리 저장
      const raffleHistory = JSON.parse(localStorage.getItem('exfluencer_raffle_history') || '[]');
      raffleHistory.push({
        raffleId: itemId,
        date: new Date().toISOString().split('T')[0],
        tickets: selectedItem.ticketsPerPurchase,
        pointsSpent: selectedItem.price,
      });
      localStorage.setItem('exfluencer_raffle_history', JSON.stringify(raffleHistory));
    }

    // TODO: 서버에 구매 기록 저장
    // await fetch('/api/shop/purchase', { method: 'POST', body: JSON.stringify({ itemId: selectedItem.id }) })

    const stockInfo = selectedItem.stock !== undefined ? `\n\n${t.shop.alertRemainingStock} ${selectedItem.stock - 1}` : '';
    const ticketInfo = selectedItem.category === 'raffle' && selectedItem.ticketsPerPurchase
      ? `\n🎫 ${t.shop.ticketsAcquired} ${selectedItem.ticketsPerPurchase}${t.shop.ticketCountUnit}!`
      : '';
    alert(`✅ ${selectedItem.name} ${t.shop.alertPurchaseComplete}\n\n${t.shop.alertDeducted} -${formatShoppingPoints(selectedItem.price)}\n${t.shop.alertRemainingPoints} ${formatShoppingPoints(newPoints)}${ticketInfo}${stockInfo}\n\n${t.shop.appliedImmediately}`);
    setShowPurchaseModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* 페이스북/SNS 공유 최적화 */}
      <SocialMetaTags
        title="🛍️ 포인트 상점 - 응모권, 프리미엄 아이템 | Exfluencer VN"
        description="쇼핑 포인트로 응모권 구매! iPhone 15 Pro Max, MacBook Pro, 현금 10M VND 등 푸짐한 경품 응모하세요! 🎁"
        image={typeof window !== 'undefined' ? `${window.location.origin}/api/og/shop` : '/api/og/shop'}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />

      {/* 실시간 구매 알림 피드 */}
      <LivePurchaseFeed />

      <MobileHeader
        title={t.shop.pageTitle}
        showBack
        showPoints={true}
        currentPoints={currentPoints}
      />

      <div className="container-mobile py-6 space-y-6">
        {/* 긴급 프로모션 배너 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 p-[3px] animate-pulse-glow">
          <div className="bg-dark-700 rounded-2xl p-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <div className="mb-2">
                <UrgencyBadge text={t.shop.limitedTimeOffer} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.shop.todaySpecial}
              </h2>
              <UrgencyTimer variant="danger" size="lg" />
              <p className="text-xs text-gray-300 mt-2">
                {t.shop.hurryBeforeClose}
              </p>
            </div>
          </div>
        </div>

        {/* Points Balance - 더 화려하게 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-[3px] shadow-2xl shadow-yellow-500/50">
          <div className="bg-dark-700 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <ShoppingCart size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{t.shop.myShoppingPoints}</p>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                      {formatPoints(currentPoints)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link href="/main/influencer/referral">
                    <button className="btn btn-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                      <Users size={14} />
                      {t.shop.inviteFriends}
                    </button>
                  </Link>
                  <p className="text-[10px] text-gray-400 mt-1">{t.shop.freeTickets}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                }`}
              >
                <Icon size={14} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Shop Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const canAfford = currentPoints >= item.price;
            const isOutOfStock = item.stock !== undefined && item.stock <= 0;
            const canPurchase = canAfford && !isOutOfStock;
            const isRaffle = item.category === 'raffle';
            const progress = item.totalTickets && item.currentTickets
              ? (item.currentTickets / item.totalTickets) * 100
              : 0;

            return (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl transition-all ${
                  isRaffle
                    ? 'bg-gradient-to-br from-red-500/20 via-yellow-400/20 to-red-500/20 p-[3px] shadow-xl shadow-red-500/30'
                    : 'bg-dark-600 p-[2px]'
                }`}
              >
                <div className={`rounded-2xl p-4 ${isRaffle ? 'bg-dark-700' : 'bg-dark-600'}`}>
                  {/* 베스트셀러 배지 - 더 크고 눈에 띄게 */}
                  {item.bestseller && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="px-5 py-2.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full shadow-2xl shadow-red-500/60 animate-pulse-glow border-2 border-yellow-400">
                        <span className="text-sm font-black text-white tracking-wide">{t.shop.bestseller}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className={`w-20 h-20 rounded-2xl ${item.bgColor} flex items-center justify-center flex-shrink-0 shadow-lg ${isRaffle ? 'animate-pulse-glow' : ''}`}>
                      <Icon size={36} className={item.iconColor} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-white text-base">{item.name}</h3>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.description}</p>

                          {/* 응모권 상품 추가 정보 */}
                          {isRaffle && item.prizeValue && (
                            <div className="mt-3 space-y-3">
                              {/* 타이머 */}
                              <div className="flex items-center justify-between">
                                <UrgencyTimer variant="danger" size="sm" />
                                <span className="text-xs text-yellow-400 font-bold animate-pulse">
                                  {t.shop.hurryUp}
                                </span>
                              </div>

                              <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <Star size={14} className="text-yellow-400" />
                                  <span className="text-xs text-yellow-400 font-bold">{t.shop.prizeValue}</span>
                                  <span className="text-sm text-white font-bold">{item.prizeValue}</span>
                                </div>
                              </div>

                              {/* 한정 수량 진행률 바 */}
                              {item.totalTickets && item.currentTickets && (
                                <StockProgress
                                  current={item.currentTickets}
                                  total={item.totalTickets}
                                  variant="danger"
                                />
                              )}

                              {/* 실시간 참여자 수 */}
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Users size={12} className="text-primary" />
                                <span>
                                  <span className="text-primary font-bold">
                                    {Math.floor((item.currentTickets || 0) / 2).toLocaleString()}
                                  </span>
                                  {t.shop.peopleEntering}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* 가격 및 구매 버튼 */}
                  <div className="mt-4 pt-4 border-t border-dark-500">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {item.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatShoppingPoints(item.originalPrice)}
                          </div>
                        )}
                        <div className={`text-2xl font-bold ${canPurchase ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500' : 'text-error'}`}>
                          {formatShoppingPoints(item.price)}
                        </div>
                        {isRaffle && item.ticketsPerPurchase && (
                          <div className="text-xs text-gray-400 mt-1">
                            = {t.shop.ticketUnit} <span className="text-primary font-bold">{item.ticketsPerPurchase}{t.shop.ticketCountUnit}</span>
                          </div>
                        )}
                        {item.stock !== undefined && (
                          <div className={`text-xs mt-1 font-bold ${isOutOfStock ? 'text-error' : item.stock <= 5 ? 'text-warning animate-pulse' : 'text-gray-400'}`}>
                            {isOutOfStock ? t.shop.outOfStock : `${t.shop.stockRemaining} ${item.stock}`}
                          </div>
                        )}
                      </div>
                    </div>

                    {isRaffle && item.id === 'korea-dream' ? (
                      <Link href="/main/influencer/korea-dream" className="w-full">
                        <PrimaryCTA icon={Plane} pulse>
                          {t.shop.detailView}
                        </PrimaryCTA>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canPurchase}
                        className={`w-full text-lg font-bold py-4 rounded-xl shadow-lg transition-all ${
                          canPurchase
                            ? isRaffle
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-red-500/50 animate-pulse-glow'
                              : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-primary/50'
                            : 'bg-dark-500 text-gray-500 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {isOutOfStock ? t.shop.outOfStock : !canAfford ? `💰 ${t.shop.insufficientPoints}` : isRaffle ? t.shop.enterNow : t.shop.buyNowButton}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="card text-center py-12">
              <ShoppingCart size={48} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400">{t.shop.noProducts}</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="card bg-info/10 border-info/30">
          <h4 className="font-semibold text-white mb-2">{t.shop.infoTitle}</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>{t.shop.info1}</li>
            <li>{t.shop.info2}</li>
            <li>{t.shop.info3}</li>
            <li>{t.shop.info4}</li>
            <li>{t.shop.info5}</li>
          </ul>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.shop.purchaseConfirmationTitle}</h3>

            <div className="bg-dark-700 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const Icon = selectedItem.icon;
                  return (
                    <div className={`w-12 h-12 rounded-lg ${selectedItem.bgColor} flex items-center justify-center`}>
                      <Icon size={24} className={selectedItem.iconColor} />
                    </div>
                  );
                })()}
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{selectedItem.name}</h4>
                  <p className="text-xs text-gray-400">{selectedItem.description}</p>
                </div>
              </div>

              <div className="border-t border-dark-600 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t.shop.price}</span>
                  <span className="text-white font-semibold">{formatPoints(selectedItem.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t.shop.currentPoints}</span>
                  <span className="text-accent">{formatPoints(currentPoints)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{t.shop.afterPurchaseBalance}</span>
                  <span className="text-success font-bold">
                    {formatPoints(currentPoints - selectedItem.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <PrimaryCTA
                onClick={confirmPurchase}
                icon={ShoppingCart}
              >
                {t.shop.confirmPurchase}
              </PrimaryCTA>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full btn btn-ghost"
              >
                {t.shop.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}

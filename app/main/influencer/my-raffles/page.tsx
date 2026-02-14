'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ticket, Calendar, TrendingUp, ShoppingBag, Plane, Smartphone, Laptop, DollarSign, Gift, Trophy, ChevronRight } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface RaffleEntry {
  id: string;
  name: string;
  icon: any;
  ticketCount: number;
  totalTickets: number;
  currentTickets: number;
  prizeValue: string;
  purchaseHistory: {
    date: string;
    tickets: number;
    pointsSpent: number;
  }[];
}

export default function MyRafflesPage() {
  const { t } = useLanguage();
  const [myRaffles, setMyRaffles] = useState<RaffleEntry[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    // localStorage에서 응모권 데이터 불러오기
    const raffleTickets = JSON.parse(localStorage.getItem('exfluencer_raffle_tickets') || '{}');
    const purchaseHistory = JSON.parse(localStorage.getItem('exfluencer_raffle_history') || '[]');

    // 응모권 정보 매핑 (use translation keys for names)
    const raffleInfo: { [key: string]: any } = {
      'korea-dream': {
        id: 'korea-dream',
        name: t.shop?.products?.koreaDream?.name || '🇰🇷 KOREA DREAM',
        icon: Plane,
        totalTickets: 100000,
        currentTickets: 78432,
        prizeValue: '50,000,000 VND (2인)',
        price: 100000,
      },
      'iphone': {
        id: 'iphone',
        name: t.shop?.products?.iphoneRaffle?.name || '📱 iPhone 15 Pro Max',
        icon: Smartphone,
        totalTickets: 50000,
        currentTickets: 32145,
        prizeValue: '30,000,000 VND',
        price: 500000,
      },
      'macbook': {
        id: 'macbook',
        name: t.shop?.products?.macbookRaffle?.name || '💻 MacBook Pro M3',
        icon: Laptop,
        totalTickets: 30000,
        currentTickets: 18923,
        prizeValue: '50,000,000 VND',
        price: 800000,
      },
      'cash': {
        id: 'cash',
        name: t.shop?.products?.cash10mRaffle?.name || '💰 현금 10M VND',
        icon: DollarSign,
        totalTickets: 100000,
        currentTickets: 65432,
        prizeValue: '10,000,000 VND',
        price: 1000000,
      },
      'giftcard': {
        id: 'giftcard',
        name: t.shop?.products?.giftcard500kRaffle?.name || '🎁 기프트카드 500K',
        icon: Gift,
        totalTickets: 200000,
        currentTickets: 145234,
        prizeValue: '500,000 VND',
        price: 50000,
      },
    };

    // 내가 응모한 항목만 필터링
    const myEntries: RaffleEntry[] = Object.entries(raffleTickets)
      .filter(([id, count]) => (count as number) > 0)
      .map(([id, count]) => {
        const info = raffleInfo[id];
        const history = purchaseHistory.filter((h: any) => h.raffleId === id);

        return {
          ...info,
          ticketCount: count as number,
          purchaseHistory: history,
        };
      })
      .filter((entry) => entry.id && entry.name); // undefined 항목 제거

    setMyRaffles(myEntries);

    // 총 응모권 개수
    const total = Object.values(raffleTickets).reduce(
      (sum: number, count) => sum + (Number(count) || 0),
      0
    );
    setTotalTickets(total);

    // 총 사용 포인트
    const spent = purchaseHistory.reduce(
      (sum: number, h: any) => sum + (Number(h.pointsSpent) || 0),
      0
    );
    setTotalSpent(spent);
  }, [t]);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.raffle?.myTickets || '내 응모권'} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* 요약 통계 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Ticket size={20} className="text-primary" />
              <span className="text-xs text-gray-300">{t.raffle?.totalTickets || '총 응모권'}</span>
            </div>
            <div className="text-3xl font-bold text-primary">{totalTickets}{t.raffle?.ticketUnit || '장'}</div>
            <div className="text-xs text-gray-400 mt-1">{myRaffles.length}{t.raffle?.eventsParticipated || '개 이벤트 참여'}</div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500/20 to-purple-600/10 border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-blue-400" />
              <span className="text-xs text-gray-300">{t.raffle?.pointsUsed || '사용 포인트'}</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{formatShoppingPoints(totalSpent)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.raffle?.totalInvestment || '총 투자액'}</div>
          </div>
        </div>

        {/* 안내 카드 */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-accent" />
            <div>
              <h4 className="font-semibold text-white mb-1">{t.raffle?.increaseChance || '당첨 확률 높이는 법'}</h4>
              <p className="text-xs text-gray-300">
                {t.raffle?.moreTicketsMoreChance || '더 많은 응모권을 모을수록 당첨 확률이 올라갑니다!'}
              </p>
            </div>
          </div>
        </div>

        {/* 내 응모권 리스트 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">{t.raffle?.participationStatus || '응모 현황'}</h3>
            <Link href="/main/influencer/shop" className="text-sm text-primary">
              {t.raffle?.collectMore || '더 모으기'} →
            </Link>
          </div>

          {myRaffles.length === 0 ? (
            <div className="card text-center py-12">
              <Ticket size={48} className="text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{t.raffle?.noEntries || '응모한 이벤트가 없습니다'}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {t.raffle?.buyTicketsDescription || '포인트로 응모권을 구매하고'}<br />
                {t.raffle?.tryForPrizes || '다양한 경품에 도전하세요!'}
              </p>
              <Link href="/main/influencer/shop">
                <button className="btn btn-primary">
                  {t.raffle?.buyTicketsFromShop || '상점에서 응모권 구매하기'}
                </button>
              </Link>
            </div>
          ) : (
            myRaffles.map((raffle) => {
              const Icon = raffle.icon;
              const winProbability = ((raffle.ticketCount / raffle.totalTickets) * 100).toFixed(4);

              return (
                <div key={raffle.id} className="card">
                  <div className="flex items-start gap-4">
                    {/* 아이콘 */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={32} className="text-white" />
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1">{raffle.name}</h3>
                      <p className="text-xs text-gray-400 mb-2">{t.raffle?.prizeValue || '상품 가치'}: {raffle.prizeValue}</p>

                      {/* 내 응모권 */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 bg-primary/20 rounded-full">
                          <span className="text-sm font-bold text-primary">
                            {t.raffle?.myTickets || '내 응모권'}: {raffle.ticketCount}{t.raffle?.ticketUnit || '장'}
                          </span>
                        </div>
                      </div>

                      {/* 당첨 확률 */}
                      <div className="bg-dark-600 rounded-lg p-2 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{t.raffle?.estimatedWinChance || '예상 당첨 확률'}</span>
                          <span className="text-xs font-bold text-accent">{winProbability}%</span>
                        </div>
                        <div className="w-full bg-dark-500 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full"
                            style={{ width: `${Math.min(parseFloat(winProbability) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {t.raffle?.total || '전체'}: {raffle.currentTickets.toLocaleString()}{t.raffle?.ticketUnit || '장'} / {raffle.totalTickets.toLocaleString()}{t.raffle?.ticketUnit || '장'}
                        </div>
                      </div>

                      {/* 구매 이력 */}
                      {raffle.purchaseHistory && raffle.purchaseHistory.length > 0 && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-400 cursor-pointer hover:text-primary">
                            {t.raffle?.purchaseHistory || '구매 이력'} {raffle.purchaseHistory.length}{t.raffle?.items || '건'} {t.raffle?.view || '보기'}
                          </summary>
                          <div className="mt-2 space-y-1">
                            {raffle.purchaseHistory.map((h: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-xs bg-dark-600 rounded p-2">
                                <div className="flex items-center gap-2">
                                  <Calendar size={12} className="text-gray-500" />
                                  <span className="text-gray-400">{h.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-primary font-semibold">+{h.tickets}{t.raffle?.ticketUnit || '장'}</span>
                                  <span className="text-gray-500">({formatShoppingPoints(h.pointsSpent)})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>

                  {/* 더 구매하기 버튼 */}
                  <Link href="/main/influencer/shop" className="mt-3">
                    <button className="w-full btn btn-ghost text-sm py-2">
                      <TrendingUp size={14} className="mr-1" />
                      {t.raffle?.buyMore || '더 구매하기'}
                    </button>
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* 랭킹 바로가기 */}
        {totalTickets > 0 && (
          <Link href="/main/influencer/ranking">
            <div className="card bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-yellow-500/30 hover:border-yellow-500/50 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t.raffle?.checkRanking || '응모권 랭킹 확인'}</h4>
                    <p className="text-xs text-gray-400">{t.raffle?.compareWithOthers || '다른 사람들과 비교해보세요'}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-yellow-400" />
              </div>
            </div>
          </Link>
        )}

        {/* 안내 */}
        <div className="card bg-info/10 border-info/30">
          <h4 className="font-semibold text-white mb-2 text-sm">💡 {t.raffle?.ticketGuide || '응모권 안내'}</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• {t.raffle?.guideLine1 || '응모권은 추첨 시까지 유효합니다'}</li>
            <li>• {t.raffle?.guideLine2 || '더 많은 응모권을 모을수록 당첨 확률 증가'}</li>
            <li>• {t.raffle?.guideLine3 || '추첨 일정은 별도 공지 예정'}</li>
            <li>• {t.raffle?.guideLine4 || '당첨 시 별도 연락드립니다'}</li>
          </ul>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

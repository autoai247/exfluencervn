'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Plus,
  Minus,
  TrendingUp,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints, formatCash, formatShoppingPoints } from '@/lib/points';
import { formatDate } from '@/lib/utils';
import { ShoppingBag, BadgeDollarSign } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockBankAccounts, getMockTransactions } from '@/lib/mockData';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'pending' | 'refund' | 'spending';
  walletType: 'cash' | 'shopping'; // 현금 거래인지 포인트 거래인지
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  campaignId?: string;
  withdrawalMethod?: string;
  itemName?: string; // 포인트 사용 시 구매한 아이템명
}

// Mock data
const mockWallet = {
  available: 2500000,
  locked: 500000,
  total: 3000000,
  monthlyEarning: 1200000,
  // Commented out - now using getMockBankAccounts()
  // bankAccounts: [
  //   {
  //     id: '1',
  //     bankName: 'KB국민은행',
  //     accountNumber: '1234-56-789012',
  //     accountHolder: '김민수',
  //     isDefault: true,
  //   },
  // ],
};

// Commented out - now using getMockTransactions()
// 현금 거래 내역
// const mockCashTransactions: Transaction[] = [
//   {
//     id: '1',
//     type: 'earning',
//     walletType: 'cash',
//     amount: 500000,
//     description: '신규 스킨케어 제품 광고',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
//     campaignId: '1',
//   },
//   {
//     id: '2',
//     type: 'withdrawal',
//     walletType: 'cash',
//     amount: -300000,
//     description: '출금',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
//     withdrawalMethod: 'KB국민은행 (1234-56-789012)',
//   },
//   {
//     id: '3',
//     type: 'pending',
//     walletType: 'cash',
//     amount: 400000,
//     description: '고급 레스토랑 리뷰',
//     status: 'pending',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
//     campaignId: '2',
//   },
//   {
//     id: '4',
//     type: 'earning',
//     walletType: 'cash',
//     amount: 800000,
//     description: '플래그십 스마트폰 언박싱',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
//     campaignId: '3',
//   },
//   {
//     id: '5',
//     type: 'withdrawal',
//     walletType: 'cash',
//     amount: -200000,
//     description: '출금',
//     status: 'failed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
//     withdrawalMethod: 'KB국민은행 (1234-56-789012)',
//   },
// ];

// Commented out - now using getMockTransactions()
// 포인트 거래 내역
// const mockPointTransactions: Transaction[] = [
//   {
//     id: 'p1',
//     type: 'earning',
//     walletType: 'shopping',
//     amount: 10000,
//     description: '출석 체크 보너스',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
//   },
//   {
//     id: 'p2',
//     type: 'spending',
//     walletType: 'shopping',
//     amount: -100000,
//     description: '🇰🇷 KOREA DREAM 응모권 구매',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
//     itemName: 'KOREA DREAM 응모권',
//   },
//   {
//     id: 'p3',
//     type: 'earning',
//     walletType: 'shopping',
//     amount: 50000,
//     description: '친구 초대 보너스 (민지님)',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
//   },
//   {
//     id: 'p4',
//     type: 'earning',
//     walletType: 'shopping',
//     amount: 20000,
//     description: 'SNS 공유 보너스 - 스킨케어 캠페인',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
//   },
//   {
//     id: 'p5',
//     type: 'spending',
//     walletType: 'shopping',
//     amount: -50000,
//     description: '🎁 기프트카드 500K 구매',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
//     itemName: '기프트카드 500K',
//   },
//   {
//     id: 'p6',
//     type: 'earning',
//     walletType: 'shopping',
//     amount: 10000,
//     description: '출석 체크 보너스',
//     status: 'completed',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
//   },
// ];

const transactionIcons = {
  credit: ArrowDownLeft,
  debit: ArrowUpRight,
};

const transactionColors = {
  credit: 'text-success',
  debit: 'text-error',
};

export default function WalletPage() {
  const { t, language } = useLanguage();

  // Get translated mock data
  const bankAccounts = getMockBankAccounts(language);
  const transactionHistory = getMockTransactions(language);

  // 현금(cash) vs 쇼핑 포인트(shopping) 탭
  const [walletType, setWalletType] = useState<'cash' | 'shopping'>('cash');

  // 거래 내역 필터 (현금: earning/withdrawal, 포인트: earning/spending)
  const [activeTab, setActiveTab] = useState<'all' | 'earning' | 'withdrawal' | 'spending'>('all');


  // walletType 변경 시 거래 탭 초기화
  useEffect(() => {
    setActiveTab('all');
  }, [walletType]);

  // 현재 지갑 타입에 맞는 거래 내역 선택
  const mockCashTransactions = transactionHistory.cash;
  const mockPointTransactions = transactionHistory.shopping;
  const currentTransactions = walletType === 'cash' ? mockCashTransactions : mockPointTransactions;

  // 탭에 따라 필터링
  const filteredTransactions =
    activeTab === 'all'
      ? currentTransactions
      : currentTransactions.filter((t) => {
          if (activeTab === 'earning') {
            return t.type === 'credit';
          }
          if (activeTab === 'withdrawal' || activeTab === 'spending') {
            return t.type === 'debit';
          }
          return false;
        });

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader title={t.wallet.title} showBack />

      {/* 💰 현금 / 🛍️ 포인트 탭 */}
      <div className="sticky top-14 z-30 bg-dark-700 border-b border-dark-500">
        <div className="container-mobile flex gap-2 py-3">
          <button
            onClick={() => setWalletType('cash')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              walletType === 'cash'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            <BadgeDollarSign size={18} />
            💰 {t.wallet.cashPoints}
          </button>
          <button
            onClick={() => setWalletType('shopping')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              walletType === 'shopping'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            <ShoppingBag size={18} />
            🛍️ {t.wallet.shoppingPoints}
          </button>
        </div>
      </div>

      <div className="container-mobile py-6">
        {/* 현금 카드 */}
        {walletType === 'cash' && (
          <div className="card bg-gradient-to-br from-green-500/30 to-green-600/10 border-2 border-green-500/50 shadow-xl mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={20} className="text-green-400" />
                <span className="text-sm text-green-400 font-bold">💰 {t.dashboard.withdrawable}</span>
              </div>
              <TrendingUp size={16} className="text-green-400" />
            </div>

            <div className="text-5xl font-bold text-green-400 mb-4">{formatCash(mockWallet.available)}</div>

            <div className="flex items-center justify-between text-xs mb-4">
              <div className="text-gray-400">
                {t.wallet.pending}: <span className="text-yellow-500">{formatCash(mockWallet.locked)}</span>
              </div>
              <div className="text-gray-400">
                {t.attendance.thisMonth}: <span className="text-green-400">+{formatCash(mockWallet.monthlyEarning)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/main/influencer/wallet/withdrawal"
                className="btn btn-primary text-sm"
              >
                <ArrowUpRight size={16} className="mr-1" />
                {t.wallet.withdraw}
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('transaction-history');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-ghost text-sm"
              >
                <DollarSign size={16} className="mr-1" />
                {t.wallet.history}
              </button>
            </div>
          </div>
        )}

        {/* 포인트 카드 */}
        {walletType === 'shopping' && (
          <div className="card bg-gradient-to-br from-blue-500/30 to-purple-600/20 border-2 border-blue-500/50 shadow-xl mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-blue-400" />
                <span className="text-sm text-blue-400 font-bold">🛍️ {t.wallet.shoppingPoints}</span>
              </div>
              <TrendingUp size={16} className="text-blue-400" />
            </div>

            <div className="text-5xl font-bold text-blue-400 mb-4">{formatShoppingPoints(150000)}</div>

            <div className="text-xs text-gray-400 mb-4">
              {t.dashboard.useInShop}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/main/influencer/shop"
                className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
              >
                <ShoppingBag size={16} className="mr-1" />
                {t.dashboard.tapToShop.replace(' →', '')}
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('transaction-history');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-ghost text-sm"
              >
                <DollarSign size={16} className="mr-1" />
                {t.wallet.history}
              </button>
            </div>
          </div>
        )}

        {/* Bank Accounts - 현금 탭일 때만 표시 */}
        {walletType === 'cash' && (
          <div className="space-y-6 mb-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-gray-400">
                {t.wallet.registeredAccounts}
              </h3>
              <Link
                href="/main/influencer/wallet/bank-accounts"
                className="text-sm text-primary"
              >
                {t.common.edit}
              </Link>
            </div>

            {bankAccounts.map((account) => (
              <div key={account.id} className="card border-2 border-dark-500/50 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white">{account.bankName}</h4>
                    {account.isDefault && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        {t.wallet.defaultAccount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{account.accountNumber}</p>
                  <p className="text-xs text-gray-500 mt-1">{account.accountHolder}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          ))}

          <Link href="/main/influencer/wallet/bank-accounts/add">
            <button className="btn btn-ghost w-full">
              <Plus size={18} className="mr-2" />
              {t.common.add}
            </button>
          </Link>
          </div>
        )}

        {/* 포인트 획득 방법 - 포인트 탭일 때만 표시 */}
        {walletType === 'shopping' && (
          <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 shadow-xl mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">{t.wallet.earnHow}</h3>
            <ul className="text-xs text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {t.wallet.earnCampaignBonus}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {t.wallet.earnDailyCheckIn}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {t.wallet.earnReferral}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {t.wallet.earnSNSShare}
              </li>
            </ul>
          </div>
        )}

        {/* Transaction Tabs - 현금/포인트별로 다른 탭 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {t.common.all}
          </button>
          <button
            onClick={() => setActiveTab('earning')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'earning'
                ? 'bg-success text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {walletType === 'cash' ? t.wallet.earning : t.wallet.credited}
          </button>

          {/* 현금: 출금 탭, 포인트: 사용 탭 */}
          {walletType === 'cash' ? (
            <button
              onClick={() => setActiveTab('withdrawal')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'withdrawal'
                  ? 'bg-red-500 text-white'
                  : 'bg-dark-600 text-gray-400'
              }`}
            >
              {t.wallet.withdraw}
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('spending')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'spending'
                  ? 'bg-blue-500 text-white'
                  : 'bg-dark-600 text-gray-400'
              }`}
            >
              {t.wallet.spending}
            </button>
          )}
        </div>

        {/* Transactions */}
        <div id="transaction-history" className="space-y-6">
          <h3 className="text-sm font-semibold text-gray-400 px-1">
            {t.wallet.recentTransactions}
          </h3>

          {filteredTransactions.map((transaction) => {
            const Icon = transactionIcons[transaction.type];
            const color = transactionColors[transaction.type];
            const isPositive = transaction.amount > 0;

            return (
              <div key={transaction.id} className="card border-2 border-dark-500/50 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-white truncate">
                        {transaction.description}
                      </h4>
                      <div className={`text-lg font-bold ${
                        walletType === 'cash'
                          ? (isPositive ? 'text-green-400' : 'text-red-400')
                          : (isPositive ? 'text-blue-400' : 'text-purple-400')
                      } flex-shrink-0 ml-2`}>
                        {isPositive ? '+' : ''}
                        {walletType === 'cash'
                          ? formatCash(Math.abs(transaction.amount))
                          : formatShoppingPoints(Math.abs(transaction.amount))
                        }
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {formatDate(transaction.timestamp, 'yyyy.MM.dd HH:mm')}
                      </span>
                      {transaction.status === 'pending' && (
                        <span className="px-2 py-0.5 bg-warning/20 text-warning rounded-full">
                          {t.wallet.pending}
                        </span>
                      )}
                      {transaction.status === 'failed' && (
                        <span className="px-2 py-0.5 bg-error/20 text-error rounded-full">
                          {t.common.error === 'Có lỗi xảy ra' ? 'Thất bại' : '실패'}
                        </span>
                      )}
                      {transaction.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-success/20 text-success rounded-full">
                          {t.wallet.completed}
                        </span>
                      )}
                    </div>

                    {transaction.withdrawalMethod && (
                      <p className="text-xs text-gray-500 mt-1">
                        {transaction.withdrawalMethod}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {t.common.all === 'Tất cả' ? 'Không có giao dịch' : '거래 내역이 없습니다'}
              </p>
            </div>
          )}
        </div>

        {/* Info Box - 현금 탭에서만 출금 안내 표시 */}
        {walletType === 'cash' && (
          <div className="card bg-info/10 border-2 border-info/30 shadow-xl mt-6">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-info flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">{t.wallet.withdrawalGuide}</p>
                <ul className="space-y-1 text-xs">
                  <li>• {t.wallet.minimumWithdrawalAmount}</li>
                  <li>• {t.wallet.withdrawalFeeRate}</li>
                  <li>• {t.wallet.processingTimeDays}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 포인트 탭에서는 사용 안내 표시 */}
        {walletType === 'shopping' && (
          <div className="card bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-2 border-blue-500/30 shadow-xl mt-6">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-blue-400 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">{t.wallet.pointsUsageGuide}</p>
                <ul className="space-y-1 text-xs">
                  <li>• {t.wallet.pointsInstantCredit}</li>
                  <li>• {t.wallet.pointsNoWithdrawal}</li>
                  <li>• {t.wallet.pointsShopOnly}</li>
                  <li>• {t.wallet.pointsExpiryPeriod}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="influencer" />
    </div>
  );
}

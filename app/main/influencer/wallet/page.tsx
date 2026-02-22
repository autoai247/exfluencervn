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
};

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
      <div className="sticky top-14 z-30 bg-dark-700/95 backdrop-blur-sm border-b border-dark-400/40">
        <div className="container-mobile flex gap-2 py-3">
          <button
            onClick={() => setWalletType('cash')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${
              walletType === 'cash'
                ? 'bg-gradient-to-r from-success to-green-400 text-white shadow-md shadow-success/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            <BadgeDollarSign size={18} />
            💰 {t.wallet.cashPoints}
          </button>
          <button
            onClick={() => setWalletType('shopping')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${
              walletType === 'shopping'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
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
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl mb-6 bg-gradient-to-br from-success/15 to-green-400/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={20} className="text-success" />
                <span className="text-sm text-success font-bold">💰 {t.dashboard.withdrawable}</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp size={16} className="text-success" />
              </div>
            </div>

            <div className="text-5xl font-bold text-white mb-4">{formatCash(mockWallet.available)}</div>

            <div className="flex items-center justify-between text-xs mb-5">
              <div className="text-gray-400">
                {t.wallet.pending}: <span className="text-yellow-400 font-semibold">{formatCash(mockWallet.locked)}</span>
              </div>
              <div className="text-gray-400">
                {t.attendance.thisMonth}: <span className="text-success font-semibold">+{formatCash(mockWallet.monthlyEarning)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/main/influencer/wallet/withdrawal"
                className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20"
              >
                <ArrowUpRight size={16} />
                {t.wallet.withdraw}
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('transaction-history');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-1.5 py-3 bg-dark-600/80 text-gray-300 rounded-2xl font-semibold text-sm border border-dark-400/40"
              >
                <DollarSign size={16} />
                {t.wallet.history}
              </button>
            </div>
          </div>
        )}

        {/* 포인트 카드 */}
        {walletType === 'shopping' && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl mb-6 bg-gradient-to-br from-primary/15 to-secondary/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <span className="text-sm text-primary font-bold">🛍️ {t.wallet.shoppingPoints}</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp size={16} className="text-primary" />
              </div>
            </div>

            <div className="text-5xl font-bold text-white mb-4">{formatShoppingPoints(150000)}</div>

            <div className="text-xs text-gray-400 mb-5">
              {t.dashboard.useInShop}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/main/influencer/shop"
                className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20"
              >
                <ShoppingBag size={16} />
                {t.dashboard.tapToShop.replace(' →', '')}
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById('transaction-history');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-1.5 py-3 bg-dark-600/80 text-gray-300 rounded-2xl font-semibold text-sm border border-dark-400/40"
              >
                <DollarSign size={16} />
                {t.wallet.history}
              </button>
            </div>
          </div>
        )}

        {/* Bank Accounts - 현금 탭일 때만 표시 */}
        {walletType === 'cash' && (
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <h3 className="text-sm font-semibold text-white">
                  {t.wallet.registeredAccounts}
                </h3>
              </div>
              <Link
                href="/main/influencer/wallet/bank-accounts"
                className="text-xs text-primary font-medium"
              >
                {t.common.edit}
              </Link>
            </div>

            {bankAccounts.map((account) => (
              <div key={account.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{account.bankName}</h4>
                      {account.isDefault && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                          {t.wallet.defaultAccount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{account.accountNumber}</p>
                    <p className="text-xs text-gray-500 mt-1">{account.accountHolder}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-500" />
                </div>
              </div>
            ))}

            <Link href="/main/influencer/wallet/bank-accounts/add">
              <button className="w-full py-3 bg-dark-600/80 backdrop-blur-sm border border-dashed border-dark-400/60 rounded-2xl text-gray-400 text-sm font-medium flex items-center justify-center gap-2 hover:border-primary/40 hover:text-primary transition-all">
                <Plus size={18} />
                {t.common.add}
              </button>
            </Link>
          </div>
        )}

        {/* 포인트 획득 방법 - 포인트 탭일 때만 표시 */}
        {walletType === 'shopping' && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-sm font-semibold text-white">{t.wallet.earnHow}</h3>
            </div>
            <ul className="text-xs text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                {t.wallet.earnCampaignBonus}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                {t.wallet.earnDailyCheckIn}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                {t.wallet.earnReferral}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                {t.wallet.earnSNSShare}
              </li>
            </ul>
          </div>
        )}

        {/* Transaction Tabs - 현금/포인트별로 다른 탭 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2.5 px-4 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            {t.common.all}
          </button>
          <button
            onClick={() => setActiveTab('earning')}
            className={`flex-1 py-2.5 px-4 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'earning'
                ? 'bg-gradient-to-r from-success to-green-400 text-white shadow-md shadow-success/20'
                : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
            }`}
          >
            {walletType === 'cash' ? t.wallet.earning : t.wallet.credited}
          </button>

          {/* 현금: 출금 탭, 포인트: 사용 탭 */}
          {walletType === 'cash' ? (
            <button
              onClick={() => setActiveTab('withdrawal')}
              className={`flex-1 py-2.5 px-4 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'withdrawal'
                  ? 'bg-gradient-to-r from-error to-red-400 text-white shadow-md shadow-error/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {t.wallet.withdraw}
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('spending')}
              className={`flex-1 py-2.5 px-4 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'spending'
                  ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-md shadow-secondary/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {t.wallet.spending}
            </button>
          )}
        </div>

        {/* Transactions */}
        <div id="transaction-history" className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">
              {t.wallet.recentTransactions}
            </h3>
          </div>

          {filteredTransactions.map((transaction) => {
            const Icon = transactionIcons[transaction.type];
            const color = transactionColors[transaction.type];
            const isPositive = transaction.amount > 0;

            return (
              <div key={transaction.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPositive ? 'bg-success/15' : 'bg-error/15'
                  }`}>
                    <Icon size={20} className={color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-white truncate">
                        {transaction.description}
                      </h4>
                      <div className={`text-lg font-bold flex-shrink-0 ml-2 ${
                        walletType === 'cash'
                          ? (isPositive ? 'text-success' : 'text-error')
                          : (isPositive ? 'text-primary' : 'text-secondary')
                      }`}>
                        {isPositive ? '+' : ''}
                        {walletType === 'cash'
                          ? formatCash(Math.abs(transaction.amount))
                          : formatShoppingPoints(Math.abs(transaction.amount))
                        }
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {formatDate(transaction.timestamp, 'yyyy.MM.dd HH:mm')}
                      </span>
                      {transaction.status === 'pending' && (
                        <span className="px-2 py-0.5 bg-warning/20 text-warning rounded-full border border-warning/30 text-[10px]">
                          {t.wallet.pending}
                        </span>
                      )}
                      {transaction.status === 'failed' && (
                        <span className="px-2 py-0.5 bg-error/20 text-error rounded-full border border-error/30 text-[10px]">
                          {language === 'ko' ? '실패' : 'Thất bại'}
                        </span>
                      )}
                      {transaction.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-success/20 text-success rounded-full border border-success/30 text-[10px]">
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
              <p className="text-gray-500">
                {language === 'ko' ? '거래 내역이 없습니다' : 'Không có giao dịch'}
              </p>
            </div>
          )}
        </div>

        {/* Info Box - 현금 탭에서만 출금 안내 표시 */}
        {walletType === 'cash' && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-info/30 rounded-2xl p-4 shadow-xl mt-6 bg-info/5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-info" />
              </div>
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">{t.wallet.withdrawalGuide}</p>
                <ul className="space-y-1 text-xs text-gray-400">
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
          <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl mt-6 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-primary" />
              </div>
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">{t.wallet.pointsUsageGuide}</p>
                <ul className="space-y-1 text-xs text-gray-400">
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

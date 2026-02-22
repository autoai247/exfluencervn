'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, AlertCircle, Wallet, DollarSign, CheckCircle } from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import MobileHeader from '@/components/common/MobileHeader';

const mockWallet = {
  available: 2500000,
  bankAccounts: [
    {
      id: '1',
      bankName: 'Vietcombank',
      accountNumber: '1234-56-789012',
      accountHolder: 'Nguyễn Văn A',
      isDefault: true,
    },
    {
      id: '2',
      bankName: 'Techcombank',
      accountNumber: '9876-54-321098',
      accountHolder: 'Nguyễn Văn A',
      isDefault: false,
    },
  ],
};

const MIN_WITHDRAWAL = 100000; // Số tiền rút tối thiểu 100,000 VND
const FEE_RATE = 0.02; // Phí 2%
const MIN_FEE = 10000; // Phí tối thiểu 10,000 VND

export default function WithdrawalPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(mockWallet.bankAccounts[0].id);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  const parsedAmount = parseInt(amount.replace(/,/g, '')) || 0;
  const fee = Math.max(parsedAmount * FEE_RATE, MIN_FEE);
  const finalAmount = parsedAmount - fee;
  const canWithdraw = parsedAmount >= MIN_WITHDRAWAL && parsedAmount <= mockWallet.available;

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '') {
      setAmount('');
      return;
    }
    const formatted = parseInt(numericValue).toLocaleString();
    setAmount(formatted);
  };

  const setQuickAmount = (value: number) => {
    setAmount(value.toLocaleString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canWithdraw) return;
    setShowConfirmModal(true);
  };

  const confirmWithdrawal = () => {
    setShowConfirmModal(false);
    setWithdrawalSuccess(true);
    setTimeout(() => router.back(), 2000);
  };

  const selectedBankAccount = mockWallet.bankAccounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.wallet.withdrawalRequest} showBack />

      {/* Withdrawal Success Banner */}
      {withdrawalSuccess && (
        <div className="container-mobile pt-4">
          <div className="bg-success/10 border border-success/30 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-success flex-shrink-0" />
            <p className="text-sm font-bold text-white">{t.wallet.withdrawalSuccess}</p>
          </div>
        </div>
      )}

      <div className="container-mobile py-6 space-y-4">
        {/* Available Balance */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl bg-gradient-to-br from-primary/15 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">{t.wallet.availableBalance}</p>
              <div className="text-2xl font-bold text-white">
                {formatPoints(mockWallet.available)}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Wallet size={24} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <label className="text-sm font-semibold text-white block">
                {t.wallet.withdrawalAmount}
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="w-full bg-dark-700/80 border border-dark-400/40 rounded-xl px-4 py-3 text-right text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                VND
              </span>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[100000, 500000, 1000000, mockWallet.available].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setQuickAmount(value)}
                  className="py-2 px-2 bg-dark-700/80 border border-dark-400/40 rounded-xl text-gray-300 text-xs font-medium hover:border-primary/40 hover:text-primary transition-all"
                >
                  {value === mockWallet.available ? t.wallet.allAmount : `${(value / 1000).toFixed(0)}K`}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {parsedAmount > 0 && parsedAmount < MIN_WITHDRAWAL && (
              <p className="text-xs text-error mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {t.wallet.minimumWithdrawalError} {formatPoints(MIN_WITHDRAWAL)}{t.wallet.minimumWithdrawalErrorSuffix}
              </p>
            )}
            {parsedAmount > mockWallet.available && (
              <p className="text-xs text-error mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {t.wallet.exceededBalanceError}
              </p>
            )}
          </div>

          {/* Bank Account Selection */}
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <label className="text-sm font-semibold text-white block">
                {t.wallet.withdrawalAccount}
              </label>
            </div>
            <div className="space-y-2">
              {mockWallet.bankAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => setSelectedAccount(account.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedAccount === account.id
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-dark-400/40 bg-dark-700/50 hover:border-dark-400/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{account.bankName}</h4>
                        {account.isDefault && (
                          <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full border border-success/30">
                            {t.wallet.defaultAccount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{account.accountNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">{account.accountHolder}</p>
                    </div>
                    {selectedAccount === account.id && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Withdrawal Summary */}
          {parsedAmount > 0 && canWithdraw && (
            <div className="bg-dark-600/80 backdrop-blur-sm border border-info/30 rounded-2xl p-4 shadow-xl bg-info/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-info to-blue-400 rounded-full" />
                <h3 className="text-sm font-semibold text-white">{t.wallet.withdrawalSummary}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.wallet.requestedAmount}</span>
                  <span className="text-white font-semibold">{formatPoints(parsedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.wallet.fee} (2%)</span>
                  <span className="text-error">-{formatPoints(fee)}</span>
                </div>
                <div className="h-px bg-dark-400/40 my-2" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">{t.wallet.actualDeposit}</span>
                  <span className="text-success font-bold text-lg">{formatPoints(finalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-dark-600/80 backdrop-blur-sm border border-warning/30 rounded-2xl p-4 shadow-xl bg-warning/5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-warning" />
              </div>
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-2">{t.wallet.withdrawalGuide}</p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• {t.wallet.minimumWithdrawal}: {formatPoints(MIN_WITHDRAWAL)}</li>
                  <li>• {t.wallet.withdrawalFee}: 2% ({t.wallet.minimum} {formatPoints(MIN_FEE)})</li>
                  <li>• {t.wallet.processingTime}: {t.wallet.processingDays}</li>
                  <li>• {t.wallet.noCancellation}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canWithdraw}
            className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
              canWithdraw
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                : 'bg-dark-600/80 text-gray-500 border border-dark-400/40 cursor-not-allowed'
            }`}
          >
            <ArrowUpRight size={18} />
            {parsedAmount > 0 ? `${formatPoints(finalAmount)} ${t.wallet.withdrawalRequest}` : t.wallet.withdrawalRequest}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600/95 backdrop-blur-sm border border-dark-400/40 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-lg font-bold text-white">{t.wallet.confirmWithdrawal}</h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t.wallet.withdrawalAmount}</span>
                <span className="text-white font-semibold">{formatPoints(parsedAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t.wallet.fee}</span>
                <span className="text-error">-{formatPoints(fee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t.wallet.actualDeposit}</span>
                <span className="text-success font-bold">{formatPoints(finalAmount)}</span>
              </div>
              <div className="h-px bg-dark-400/40 my-2" />
              <div className="bg-dark-700/80 border border-dark-400/40 p-3 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">{t.wallet.depositAccount}</p>
                <p className="text-sm text-white font-semibold">{selectedBankAccount?.bankName}</p>
                <p className="text-sm text-gray-300">{selectedBankAccount?.accountNumber}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedBankAccount?.accountHolder}</p>
              </div>
            </div>

            <p className="text-xs text-warning mb-4 flex items-start gap-1.5">
              <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
              {t.wallet.confirmWarning}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-dark-700/80 border border-dark-400/40 rounded-2xl text-gray-300 font-semibold text-sm"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={confirmWithdrawal}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20"
              >
                {t.common.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

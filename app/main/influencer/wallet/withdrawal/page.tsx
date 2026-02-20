'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, AlertCircle, Wallet, DollarSign } from 'lucide-react';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
    alert(t.wallet.withdrawalSuccess);
    setShowConfirmModal(false);
    router.back();
  };

  const selectedBankAccount = mockWallet.bankAccounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.wallet.withdrawalRequest}</h1>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        {/* Available Balance */}
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t.wallet.availableBalance}</p>
              <div className="text-2xl font-bold text-white">
                {formatPoints(mockWallet.available)}
              </div>
            </div>
            <Wallet size={40} className="text-primary/50" />
          </div>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div className="card border-2 border-dark-500/50 shadow-xl">
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              {t.wallet.withdrawalAmount}
            </label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="input text-right text-2xl font-bold pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
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
                  className="btn btn-ghost text-xs py-2"
                >
                  {value === mockWallet.available ? t.wallet.allAmount : `${(value / 1000).toFixed(0)}K`}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {parsedAmount > 0 && parsedAmount < MIN_WITHDRAWAL && (
              <p className="text-xs text-error mt-2">
                {t.wallet.minimumWithdrawalError} {formatPoints(MIN_WITHDRAWAL)}{t.wallet.minimumWithdrawalErrorSuffix}
              </p>
            )}
            {parsedAmount > mockWallet.available && (
              <p className="text-xs text-error mt-2">
                {t.wallet.exceededBalanceError}
              </p>
            )}
          </div>

          {/* Bank Account Selection */}
          <div className="card border-2 border-dark-500/50 shadow-xl">
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              {t.wallet.withdrawalAccount}
            </label>
            <div className="space-y-2">
              {mockWallet.bankAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => setSelectedAccount(account.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAccount === account.id
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-500 bg-dark-600 hover:border-dark-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{account.bankName}</h4>
                        {account.isDefault && (
                          <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">
                            {t.wallet.defaultAccount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{account.accountNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">{account.accountHolder}</p>
                    </div>
                    {selectedAccount === account.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
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
            <div className="card bg-info/10 border-2 border-info/30 shadow-xl">
              <h3 className="text-sm font-semibold text-white mb-3">{t.wallet.withdrawalSummary}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.wallet.requestedAmount}</span>
                  <span className="text-white font-semibold">{formatPoints(parsedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.wallet.fee} (2%)</span>
                  <span className="text-error">-{formatPoints(fee)}</span>
                </div>
                <div className="h-px bg-dark-500 my-2" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">{t.wallet.actualDeposit}</span>
                  <span className="text-success font-bold text-lg">{formatPoints(finalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="card bg-warning/10 border-2 border-warning/30 shadow-xl">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-warning flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-2">{t.wallet.withdrawalGuide}</p>
                <ul className="space-y-1 text-xs">
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
            className="btn btn-primary w-full text-base"
          >
            <ArrowUpRight size={18} className="mr-2" />
            {parsedAmount > 0 ? `${formatPoints(finalAmount)} ${t.wallet.withdrawalRequest}` : t.wallet.withdrawalRequest}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.wallet.confirmWithdrawal}</h3>

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
              <div className="h-px bg-dark-500 my-2" />
              <div className="bg-dark-700 p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">{t.wallet.depositAccount}</p>
                <p className="text-sm text-white font-semibold">{selectedBankAccount?.bankName}</p>
                <p className="text-sm text-gray-300">{selectedBankAccount?.accountNumber}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedBankAccount?.accountHolder}</p>
              </div>
            </div>

            <p className="text-xs text-warning mb-4">
              {t.wallet.confirmWarning}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 btn btn-ghost"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={confirmWithdrawal}
                className="flex-1 btn btn-primary"
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

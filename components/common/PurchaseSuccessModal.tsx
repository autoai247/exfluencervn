'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Ticket, TrendingDown, Sparkles, X } from 'lucide-react';
import { formatShoppingPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PurchaseSuccessModalProps {
  itemName: string;
  ticketsEarned: number;
  pointsSpent: number;
  remainingPoints: number;
  onClose: () => void;
}

export default function PurchaseSuccessModal({
  itemName,
  ticketsEarned,
  pointsSpent,
  remainingPoints,
  onClose,
}: PurchaseSuccessModalProps) {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // 입장 애니메이션
    setTimeout(() => setShow(true), 10);

    // Confetti 생성
    const confettiArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(confettiArray);

    // 5초 후 자동 닫기
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          show ? 'opacity-80' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2 h-2 bg-primary rounded-full animate-confetti"
            style={{
              left: `${c.x}%`,
              animationDelay: `${c.delay}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        className={`relative bg-gradient-to-br from-dark-600 to-dark-700 rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-primary/30 transition-all duration-300 ${
          show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="text-accent" size={32} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2 animate-fade-in">
          {language === 'ko' ? '구매 완료!' : 'Mua hàng thành công!'}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Purchase Successful
        </p>

        {/* Item Info */}
        <div className="space-y-4 mb-6">
          <div className="card bg-dark-700 border-primary/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <Ticket className="text-primary" size={24} />
              <div className="flex-1">
                <p className="text-xs text-gray-400">{language === 'ko' ? '구매 상품' : 'Sản phẩm mua'}</p>
                <p className="text-sm font-bold text-white">{itemName}</p>
              </div>
            </div>
          </div>

          {ticketsEarned > 0 && (
            <div className="card bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Ticket className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{language === 'ko' ? '획득한 응모권' : 'Vé rút thăm nhận được'}</p>
                    <p className="text-xl font-bold text-white">+{ticketsEarned}{language === 'ko' ? '장' : ''}</p>
                  </div>
                </div>
                <Sparkles className="text-accent animate-pulse" size={32} />
              </div>
            </div>
          )}

          <div className="card bg-dark-700 border-error/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="text-error" size={20} />
                <div>
                  <p className="text-xs text-gray-400">{language === 'ko' ? '사용한 포인트' : 'Điểm đã dùng'}</p>
                  <p className="text-sm font-bold text-error">-{formatShoppingPoints(pointsSpent)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{language === 'ko' ? '남은 포인트' : 'Điểm còn lại'}</p>
                <p className="text-xl font-bold text-white">{formatShoppingPoints(remainingPoints)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="btn btn-primary w-full animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          {language === 'ko' ? '확인' : 'Xác nhận'}
        </button>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

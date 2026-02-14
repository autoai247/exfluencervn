'use client';

import { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

interface UrgencyTimerProps {
  endDate?: Date;
  variant?: 'danger' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export default function UrgencyTimer({
  endDate = new Date(Date.now() + 24 * 60 * 60 * 1000), // 기본: 24시간 후
  variant = 'danger',
  size = 'md'
}: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - Date.now();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // endDate를 dependency에서 제거하여 타이머 안정화

  const colorClasses = {
    danger: 'from-red-500 to-orange-500 border-red-500/50 text-white',
    warning: 'from-yellow-500 to-orange-500 border-yellow-500/50 text-white',
    success: 'from-green-500 to-emerald-500 border-green-500/50 text-white',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`
      inline-flex items-center gap-2
      bg-gradient-to-r ${colorClasses[variant]}
      border-2 rounded-full
      ${sizeClasses[size]}
      font-bold shadow-lg animate-pulse-glow
    `}>
      <Flame size={size === 'lg' ? 20 : size === 'md' ? 16 : 14} className="animate-pulse" />
      <span>
        ⏰ {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    </div>
  );
}

// 한정 수량 진행률 바 컴포넌트
export function StockProgress({
  current,
  total,
  variant = 'danger'
}: {
  current: number;
  total: number;
  variant?: 'danger' | 'warning' | 'success';
}) {
  const percentage = (current / total) * 100;
  const remaining = total - current;

  const getColorClass = () => {
    if (percentage > 70) return 'from-red-500 to-orange-500';
    if (percentage > 40) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getStatusText = () => {
    if (percentage > 70) return '🔥 빨리 소진 중!';
    if (percentage > 40) return '⚡ 인기 폭발!';
    return '✨ 판매 중';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-primary">{getStatusText()}</span>
        <span className="text-gray-400">
          재고: <span className="text-white font-bold">{remaining}</span>개 남음
        </span>
      </div>
      <div className="w-full bg-dark-500 rounded-full h-3 overflow-hidden border border-dark-400">
        <div
          className={`h-3 bg-gradient-to-r ${getColorClass()} rounded-full transition-all duration-500 relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* 반짝이는 애니메이션 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500">
        {percentage.toFixed(0)}% 판매됨
      </div>
    </div>
  );
}

// 긴급 배지 컴포넌트
export function UrgencyBadge({ text = '한정 수량!' }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse">
      <Flame size={14} className="text-white" />
      <span className="text-xs font-bold text-white">{text}</span>
    </div>
  );
}

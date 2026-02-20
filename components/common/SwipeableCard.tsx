'use client';

import { useState, useRef, ReactNode } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  threshold?: number;
}

export default function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = '',
  threshold = 100,
}: SwipeableCardProps) {
  const { language } = useLanguage();
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;

    const distance = currentX;

    // Swipe left
    if (distance < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }

    // Swipe right
    if (distance > threshold && onSwipeRight) {
      onSwipeRight();
    }

    // Reset
    setIsSwiping(false);
    setCurrentX(0);
  };

  const transform = isSwiping ? `translateX(${currentX}px) rotate(${currentX * 0.05}deg)` : '';
  const opacity = isSwiping ? Math.max(0.5, 1 - Math.abs(currentX) / 300) : 1;

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`touch-action-pan-y transition-all duration-200 ${className}`}
      style={{
        transform,
        opacity,
      }}
    >
      {children}

      {/* Swipe indicators */}
      {isSwiping && (
        <>
          {currentX < -50 && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-red-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              {language === 'ko' ? '← 삭제' : '← Xóa'}
            </div>
          )}
          {currentX > 50 && (
            <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-green-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              {language === 'ko' ? '보관 →' : 'Lưu trữ →'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

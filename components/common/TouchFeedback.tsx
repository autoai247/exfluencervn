'use client';

import { ReactNode, useState } from 'react';

interface TouchFeedbackProps {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  haptic?: boolean;
  className?: string;
  longPressDelay?: number;
}

export default function TouchFeedback({
  children,
  onPress,
  onLongPress,
  haptic = false,
  className = '',
  longPressDelay = 500,
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const triggerHaptic = () => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10); // 10ms 짧은 진동
    }
  };

  const handleTouchStart = () => {
    setIsPressed(true);
    triggerHaptic();

    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
        if (haptic && 'vibrate' in navigator) {
          navigator.vibrate([10, 50, 10]); // 긴 누르기 진동 패턴
        }
        setIsPressed(false);
      }, longPressDelay);
      setPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }

    if (isPressed && onPress) {
      onPress();
    }

    setIsPressed(false);
  };

  const handleTouchCancel = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setIsPressed(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`touch-action-none select-none transition-transform duration-100 ${
        isPressed ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Haptic feedback utility
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  },
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50, 100, 50]);
    }
  },
  warning: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  },
};

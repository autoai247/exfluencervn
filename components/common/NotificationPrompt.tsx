'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationPromptProps {
  language?: 'ko' | 'vi';
  onClose?: () => void;
}

export default function NotificationPrompt({
  language = 'vi',
  onClose,
}: NotificationPromptProps) {
  const [dismissed, setDismissed] = useState(false);
  const { isSupported, permission, requestPermission } = useNotifications();

  // Check if prompt was already dismissed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasDismissed = localStorage.getItem('notification_prompt_dismissed');
      if (wasDismissed) {
        setDismissed(true);
      }
    }
  }, []);

  const text = {
    ko: {
      title: '알림 받기',
      description: '새로운 캠페인과 중요한 업데이트를 놓치지 마세요!',
      allow: '알림 허용',
      later: '나중에',
      benefits: [
        '새로운 캠페인 즉시 알림',
        '마감 임박 알림',
        '메시지 및 승인 알림',
      ],
    },
    vi: {
      title: 'Nhận thông báo',
      description: 'Đừng bỏ lỡ chiến dịch mới và cập nhật quan trọng!',
      allow: 'Cho phép',
      later: 'Để sau',
      benefits: [
        'Thông báo chiến dịch mới',
        'Nhắc nhở hết hạn',
        'Tin nhắn và phê duyệt',
      ],
    },
  };

  const t = text[language];

  const handleAllow = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('notification_prompt_dismissed', 'true');
    onClose?.();
  };

  // Don't show if not supported, already granted, or dismissed
  if (!isSupported || permission === 'granted' || permission === 'denied' || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto animate-slide-in-bottom">
      <div className="bg-gradient-to-br from-dark-600 to-dark-700 rounded-2xl p-5 shadow-2xl border-2 border-primary/30">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Bell size={24} className="text-primary" />
          </div>

          <div className="flex-1">
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-1">
              {t.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-3">
              {t.description}
            </p>

            {/* Benefits */}
            <ul className="space-y-1.5 mb-4">
              {t.benefits.map((benefit, index) => (
                <li key={index} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleAllow}
                className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <Bell size={16} />
                {t.allow}
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 bg-dark-500 hover:bg-dark-400 text-gray-300 rounded-lg font-medium transition-all"
              >
                {t.later}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add animation to tailwind.config.ts
// 'slide-in-bottom': {
//   '0%': { transform: 'translateY(100%)', opacity: '0' },
//   '100%': { transform: 'translateY(0)', opacity: '1' },
// },

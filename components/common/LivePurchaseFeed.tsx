'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Zap } from 'lucide-react';

interface PurchaseNotification {
  id: string;
  username: string;
  itemName: string;
  timestamp: number;
}

// 베트남 스타일 사용자 이름 생성
const vietnameseNames = [
  '@beauty_mi', '@skincare_vy', '@makeup_hana', '@glow_nguyen', '@viet_beauty',
  '@korea_fan', '@seoul_dream', '@kbeauty_lover', '@hanoi_girl', '@saigon_beauty',
  '@pretty_linh', '@charm_tran', '@lovely_mai', '@shine_pham', '@star_le',
];

const itemNames = [
  '🇰🇷 KOREA DREAM 응모권',
  '📱 iPhone 15 Pro Max 응모권',
  '💰 현금 10M VND 응모권',
  '💻 MacBook Pro M3 응모권',
  '프리미엄 배지 (30일)',
  '프로필 부스트 (7일)',
];

export default function LivePurchaseFeed() {
  const [notifications, setNotifications] = useState<PurchaseNotification[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 실시간 구매 알림 시뮬레이션 (3-8초마다)
    const generateNotification = () => {
      const newNotification: PurchaseNotification = {
        id: Date.now().toString(),
        username: vietnameseNames[Math.floor(Math.random() * vietnameseNames.length)],
        itemName: itemNames[Math.floor(Math.random() * itemNames.length)],
        timestamp: Date.now(),
      };

      setNotifications((prev) => [newNotification, ...prev].slice(0, 3)); // 최대 3개만 유지
      setVisible(true);

      // 5초 후 페이드아웃
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    // 초기 알림
    generateNotification();

    // 3-8초마다 새 알림 생성
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 5000 + 3000; // 3-8초
      setTimeout(generateNotification, randomDelay);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return '방금 전';
    if (seconds < 120) return '1분 전';
    if (seconds < 300) return `${Math.floor(seconds / 60)}분 전`;
    return '조금 전';
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-[400px] px-4 pointer-events-none">
      {notifications.slice(0, 1).map((notification, index) => (
        <div
          key={notification.id}
          className={`mb-2 transition-all duration-500 ${
            visible && index === 0
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="card-glass backdrop-blur-xl border-2 border-primary/50 shadow-2xl shadow-primary/30 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={12} className="text-warning animate-pulse" />
                  <span className="text-xs font-bold text-warning">실시간 구매!</span>
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  <span className="text-primary">{notification.username}</span>님이
                </p>
                <p className="text-xs text-gray-300 truncate">
                  {notification.itemName} 구매
                </p>
              </div>
              <div className="text-[10px] text-gray-400 flex-shrink-0">
                {getTimeSince(notification.timestamp)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

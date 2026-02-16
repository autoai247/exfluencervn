'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Clock, DollarSign, AlertCircle, Trash2, Share2, Gift } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';
import { formatTimeAgo } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockNotifications } from '@/lib/mockData';

interface Notification {
  id: string;
  type: 'campaign' | 'payment' | 'share' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: any;
  iconColor?: string;
  actionUrl?: string;
}

// Mock notifications - commented out, now using translated data from mockData.ts
// const mockNotifications: Notification[] = [
//   {
//     id: '1',
//     type: 'share',
//     title: '공유 승인 완료',
//     message: '신규 스킨케어 제품 리뷰 캠페인 공유가 승인되었습니다. 5,000 VND가 적립되었습니다.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
//     read: false,
//     icon: Share2,
//     iconColor: 'text-success',
//     actionUrl: '/main/influencer/shares',
//   },
//   {
//     id: '2',
//     type: 'campaign',
//     title: '캠페인 승인됨',
//     message: '베트남 레스토랑 체험 리뷰 캠페인에 선정되셨습니다!',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
//     read: false,
//     icon: CheckCircle,
//     iconColor: 'text-success',
//     actionUrl: '/main/influencer/campaigns/2',
//   },
//   {
//     id: '3',
//     type: 'payment',
//     title: '포인트 적립',
//     message: '스마트폰 언박싱 & 리뷰 캠페인 완료로 800,000 VND가 적립되었습니다.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
//     read: true,
//     icon: DollarSign,
//     iconColor: 'text-accent',
//     actionUrl: '/main/influencer/wallet',
//   },
//   {
//     id: '4',
//     type: 'campaign',
//     title: '마감 임박',
//     message: '피트니스 앱 프로모션 캠페인이 3일 후 마감됩니다.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
//     read: true,
//     icon: Clock,
//     iconColor: 'text-warning',
//     actionUrl: '/main/influencer/campaigns/4',
//   },
//   {
//     id: '5',
//     type: 'system',
//     title: '신규 기능 안내',
//     message: '이제 같은 캠페인을 여러 곳에 공유하고 각각 포인트를 받을 수 있습니다!',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
//     read: true,
//     icon: Gift,
//     iconColor: 'text-primary',
//   },
// ];

export default function NotificationsPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const mockNotifications = getMockNotifications(language);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={t.notification.title} showBack />

      <div className="container-mobile py-6 space-y-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400'
              }`}
            >
              {t.notification.all} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === 'unread'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-400'
              }`}
            >
              {t.notification.unread} ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              {t.notification.markAllRead}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="card border-2 border-dark-500/50 shadow-xl text-center py-12">
              <Bell size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">
                {filter === 'unread'
                  ? (t.common.all === 'Tất cả' ? 'Không có thông báo chưa đọc' : '읽지 않은 알림이 없습니다')
                  : (t.common.all === 'Tất cả' ? 'Không có thông báo' : '알림이 없습니다')
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon || Bell;
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`card border-2 shadow-xl cursor-pointer transition-all ${
                    !notification.read
                      ? 'bg-primary/5 border-primary/30'
                      : 'border-dark-500/50 hover:bg-dark-600'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full ${
                      notification.read ? 'bg-dark-600' : 'bg-primary/20'
                    } flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={notification.iconColor || 'text-gray-400'} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold ${
                          notification.read ? 'text-white' : 'text-primary'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-xs text-gray-500 hover:text-error transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

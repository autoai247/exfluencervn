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

  // 알림 타입별 아이콘 배경색
  const getIconBg = (notification: Notification) => {
    if (!notification.read) {
      if (notification.type === 'payment') return 'bg-accent/20';
      if (notification.type === 'campaign') return 'bg-success/20';
      if (notification.type === 'share') return 'bg-secondary/20';
      if (notification.type === 'system') return 'bg-primary/20';
      return 'bg-primary/20';
    }
    return 'bg-dark-500/60';
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
              className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {t.notification.all} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {t.notification.unread} ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary font-medium hover:text-secondary transition-colors"
            >
              {t.notification.markAllRead}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-dark-500/60 flex items-center justify-center mx-auto mb-3">
                <Bell size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm">
                {filter === 'unread'
                  ? (language === 'ko' ? '읽지 않은 알림이 없습니다' : 'Không có thông báo chưa đọc')
                  : (language === 'ko' ? '알림이 없습니다' : 'Không có thông báo')
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
                  className={`backdrop-blur-sm rounded-2xl p-4 shadow-xl cursor-pointer transition-all border ${
                    !notification.read
                      ? 'bg-primary/5 border-primary/30 hover:bg-primary/10'
                      : 'bg-dark-600/80 border-dark-400/40 hover:bg-dark-500/80'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(notification)}`}>
                      <Icon size={20} className={notification.iconColor || 'text-gray-400'} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold text-sm ${
                          notification.read ? 'text-white' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full flex-shrink-0 mt-1.5 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2 leading-relaxed">
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
                          className="p-1.5 rounded-lg text-gray-600 hover:text-error hover:bg-error/10 transition-all"
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

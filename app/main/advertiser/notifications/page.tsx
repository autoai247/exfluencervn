'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Clock, DollarSign, AlertCircle, Trash2, Users, FileText } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';

interface Notification {
  id: string;
  type: 'kol' | 'payment' | 'campaign' | 'system';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  icon: any;
  iconColor: string;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'kol',
    title: 'KOL mới ứng tuyển',
    message: 'Linh Nguyễn (TikTok · 285K followers) đã ứng tuyển vào chiến dịch Skincare Review.',
    timeAgo: '10 phút trước',
    read: false,
    icon: Users,
    iconColor: 'text-primary',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '2',
    type: 'kol',
    title: 'KOL mới ứng tuyển',
    message: 'Minh Tuấn (Facebook · 142K followers) đã ứng tuyển vào chiến dịch Spring Makeup.',
    timeAgo: '1 giờ trước',
    read: false,
    icon: Users,
    iconColor: 'text-primary',
    actionUrl: '/main/advertiser/campaigns/2',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Chờ xác nhận thanh toán',
    message: 'Thu Hà đã nộp nội dung cho chiến dịch Skincare Review. Vui lòng chuyển khoản và xác nhận.',
    timeAgo: '3 giờ trước',
    read: false,
    icon: DollarSign,
    iconColor: 'text-accent',
    actionUrl: '/main/advertiser',
  },
  {
    id: '4',
    type: 'campaign',
    title: 'Chiến dịch sắp hết hạn',
    message: 'Skincare Product Review còn 3 ngày nữa là đến hạn nộp bài (15/03).',
    timeAgo: '1 ngày trước',
    read: true,
    icon: Clock,
    iconColor: 'text-warning',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '5',
    type: 'campaign',
    title: 'KOL hoàn thành nội dung',
    message: 'Thu Hà đã nộp video TikTok cho chiến dịch Skincare Review. Xem và xác nhận thanh toán.',
    timeAgo: '2 ngày trước',
    read: true,
    icon: CheckCircle,
    iconColor: 'text-green-400',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '6',
    type: 'system',
    title: 'Tạo brief tự động',
    message: 'Tính năng tạo brief chiến dịch tự động đã sẵn sàng. Tạo brief chuẩn chỉ trong 2 phút!',
    timeAgo: '5 ngày trước',
    read: true,
    icon: FileText,
    iconColor: 'text-secondary',
    actionUrl: '/main/advertiser/campaigns/create',
  },
];

export default function AdvertiserNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
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
      <MobileHeader title="Thông báo" showBack />

      <div className="container-mobile py-5 space-y-4">
        {/* Filter */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'
              }`}
            >
              Tất cả ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === 'unread' ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-xs text-primary hover:underline">
              Đánh dấu đã đọc
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="card border-2 border-dark-500 shadow-xl text-center py-12">
              <Bell size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Không có thông báo</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`card border-2 shadow-xl cursor-pointer transition-all ${
                    !notification.read
                      ? 'bg-primary/5 border-primary/30'
                      : 'border-dark-500 hover:bg-dark-600'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      notification.read ? 'bg-dark-600' : 'bg-primary/20'
                    }`}>
                      <Icon size={20} className={notification.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold text-sm ${notification.read ? 'text-white' : 'text-primary'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{notification.timeAgo}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
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

      <BottomNav userType="advertiser" />
    </div>
  );
}

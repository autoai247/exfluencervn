'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Clock, DollarSign, FileText, Trash2, Users } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface NotificationData {
  id: string;
  type: 'kol' | 'payment' | 'campaign' | 'system';
  titleKo: string;
  titleVi: string;
  messageKo: string;
  messageVi: string;
  timeAgoKo: string;
  timeAgoVi: string;
  read: boolean;
  icon: any;
  iconColor: string;
  actionUrl?: string;
}

const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'kol',
    titleKo: '새 KOL 지원',
    titleVi: 'KOL mới ứng tuyển',
    messageKo: 'Linh Nguyễn (TikTok · 285K 팔로워)이 스킨케어 리뷰 캠페인에 지원했습니다.',
    messageVi: 'Linh Nguyễn (TikTok · 285K followers) đã ứng tuyển vào chiến dịch Skincare Review.',
    timeAgoKo: '10분 전',
    timeAgoVi: '10 phút trước',
    read: false,
    icon: Users,
    iconColor: 'text-primary',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '2',
    type: 'kol',
    titleKo: '새 KOL 지원',
    titleVi: 'KOL mới ứng tuyển',
    messageKo: 'Minh Tuấn (Facebook · 142K 팔로워)이 봄 메이크업 캠페인에 지원했습니다.',
    messageVi: 'Minh Tuấn (Facebook · 142K followers) đã ứng tuyển vào chiến dịch Spring Makeup.',
    timeAgoKo: '1시간 전',
    timeAgoVi: '1 giờ trước',
    read: false,
    icon: Users,
    iconColor: 'text-primary',
    actionUrl: '/main/advertiser/campaigns/2',
  },
  {
    id: '3',
    type: 'payment',
    titleKo: '결제 확인 대기 중',
    titleVi: 'Chờ xác nhận thanh toán',
    messageKo: 'Thu Hà가 스킨케어 리뷰 캠페인의 콘텐츠를 제출했습니다. 입금 후 확인해 주세요.',
    messageVi: 'Thu Hà đã nộp nội dung cho chiến dịch Skincare Review. Vui lòng chuyển khoản và xác nhận.',
    timeAgoKo: '3시간 전',
    timeAgoVi: '3 giờ trước',
    read: false,
    icon: DollarSign,
    iconColor: 'text-accent',
    actionUrl: '/main/advertiser',
  },
  {
    id: '4',
    type: 'campaign',
    titleKo: '캠페인 마감 임박',
    titleVi: 'Chiến dịch sắp hết hạn',
    messageKo: 'Skincare Product Review 캠페인 제출 기한이 3일 남았습니다 (15/03).',
    messageVi: 'Skincare Product Review còn 3 ngày nữa là đến hạn nộp bài (15/03).',
    timeAgoKo: '1일 전',
    timeAgoVi: '1 ngày trước',
    read: true,
    icon: Clock,
    iconColor: 'text-warning',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '5',
    type: 'campaign',
    titleKo: 'KOL 콘텐츠 완료',
    titleVi: 'KOL hoàn thành nội dung',
    messageKo: 'Thu Hà가 스킨케어 리뷰 캠페인의 TikTok 영상을 제출했습니다. 확인 후 결제해 주세요.',
    messageVi: 'Thu Hà đã nộp video TikTok cho chiến dịch Skincare Review. Xem và xác nhận thanh toán.',
    timeAgoKo: '2일 전',
    timeAgoVi: '2 ngày trước',
    read: true,
    icon: CheckCircle,
    iconColor: 'text-green-400',
    actionUrl: '/main/advertiser/campaigns/1',
  },
  {
    id: '6',
    type: 'system',
    titleKo: '브리프 자동 생성',
    titleVi: 'Tạo brief tự động',
    messageKo: '캠페인 브리프 자동 생성 기능이 준비되었습니다. 2분 만에 표준 브리프를 만들어 보세요!',
    messageVi: 'Tính năng tạo brief chiến dịch tự động đã sẵn sàng. Tạo brief chuẩn chỉ trong 2 phút!',
    timeAgoKo: '5일 전',
    timeAgoVi: '5 ngày trước',
    read: true,
    icon: FileText,
    iconColor: 'text-secondary',
    actionUrl: '/main/advertiser/campaigns/create',
  },
];

export default function AdvertiserNotificationsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);
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

  const handleNotificationClick = (notification: NotificationData) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={language === 'ko' ? '알림' : 'Thông báo'} showBack />

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
              {language === 'ko' ? '전체' : 'Tất cả'} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === 'unread' ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'
              }`}
            >
              {language === 'ko' ? '미읽음' : 'Chưa đọc'} ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-xs text-primary hover:underline">
              {language === 'ko' ? '모두 읽음 처리' : 'Đánh dấu đã đọc'}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="card border-2 border-dark-500 shadow-xl text-center py-12">
              <Bell size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">{language === 'ko' ? '알림이 없습니다' : 'Không có thông báo'}</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const title = language === 'ko' ? notification.titleKo : notification.titleVi;
              const message = language === 'ko' ? notification.messageKo : notification.messageVi;
              const timeAgo = language === 'ko' ? notification.timeAgoKo : notification.timeAgoVi;
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
                          {title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2 leading-relaxed">{message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{timeAgo}</span>
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

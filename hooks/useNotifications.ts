'use client';

import { useState, useEffect, useCallback } from 'react';

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  // Check if notifications are supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSupported('Notification' in window);
      if ('Notification' in window) {
        setPermission(Notification.permission);
      }
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, [isSupported]);

  // Send a notification
  const sendNotification = useCallback(async (options: NotificationOptions): Promise<boolean> => {
    if (!isSupported) {
      console.warn('Notifications are not supported');
      return false;
    }

    // Request permission if not granted
    if (permission === 'default') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') {
        return false;
      }
    }

    if (permission === 'denied') {
      console.warn('Notification permission denied');
      return false;
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icon-192x192.png',
        badge: options.badge || '/icon-96x96.png',
        tag: options.tag,
        data: options.data,
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false,
      });

      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();

        // Navigate if URL is provided in data
        if (options.data?.url) {
          window.location.href = options.data.url;
        }
      };

      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }, [isSupported, permission, requestPermission]);

  // Send a campaign notification
  const notifyCampaign = useCallback(async (campaignTitle: string, type: 'new' | 'deadline' | 'accepted') => {
    const messages = {
      ko: {
        new: {
          title: '🎯 새로운 캠페인',
          body: `"${campaignTitle}" 캠페인이 추가되었습니다!`,
        },
        deadline: {
          title: '⏰ 마감 임박',
          body: `"${campaignTitle}" 캠페인 마감이 얼마 남지 않았습니다!`,
        },
        accepted: {
          title: '🎉 지원 승인',
          body: `"${campaignTitle}" 캠페인 지원이 승인되었습니다!`,
        },
      },
      vi: {
        new: {
          title: '🎯 Chiến dịch mới',
          body: `Chiến dịch "${campaignTitle}" đã được thêm!`,
        },
        deadline: {
          title: '⏰ Sắp hết hạn',
          body: `Chiến dịch "${campaignTitle}" sắp hết hạn!`,
        },
        accepted: {
          title: '🎉 Đã chấp nhận',
          body: `Đơn ứng tuyển "${campaignTitle}" đã được chấp nhận!`,
        },
      },
    };

    const lang = 'ko'; // Get from context
    const message = messages[lang][type];

    return await sendNotification({
      title: message.title,
      body: message.body,
      tag: `campaign-${type}`,
      data: { type, campaignTitle },
    });
  }, [sendNotification]);

  // Send a message notification
  const notifyMessage = useCallback(async (from: string, preview: string) => {
    return await sendNotification({
      title: `💬 ${from}`,
      body: preview,
      tag: 'message',
      requireInteraction: true,
      data: { type: 'message', from },
    });
  }, [sendNotification]);

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    notifyCampaign,
    notifyMessage,
  };
}

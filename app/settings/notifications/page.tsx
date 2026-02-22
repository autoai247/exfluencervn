'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, MessageCircle, Briefcase, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: any;
  push: boolean;
  email: boolean;
}

export default function NotificationSettingsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'campaigns',
      title: '',
      description: '',
      icon: Briefcase,
      push: true,
      email: true,
    },
    {
      id: 'messages',
      title: '',
      description: '',
      icon: MessageCircle,
      push: true,
      email: false,
    },
    {
      id: 'payments',
      title: '',
      description: '',
      icon: DollarSign,
      push: true,
      email: true,
    },
    {
      id: 'applications',
      title: '',
      description: '',
      icon: TrendingUp,
      push: true,
      email: true,
    },
    {
      id: 'reviews',
      title: '',
      description: '',
      icon: Users,
      push: true,
      email: false,
    },
  ]);

  const notificationLabels: Record<string, { title: string; description: string }> = {
    campaigns: {
      title: language === 'ko' ? '새로운 캠페인' : 'Chiến dịch mới',
      description: language === 'ko' ? '나에게 맞는 새 캠페인이 등록되면 알림' : 'Thông báo khi có chiến dịch phù hợp mới',
    },
    messages: {
      title: language === 'ko' ? '메시지' : 'Tin nhắn',
      description: language === 'ko' ? '새 메시지 수신 시 알림' : 'Thông báo khi nhận tin nhắn mới',
    },
    payments: {
      title: language === 'ko' ? '결제 및 출금' : 'Thanh toán và rút tiền',
      description: language === 'ko' ? '포인트 획득 및 출금 처리 알림' : 'Thông báo nhận điểm và xử lý rút tiền',
    },
    applications: {
      title: language === 'ko' ? '지원 상태' : 'Trạng thái ứng tuyển',
      description: language === 'ko' ? '캠페인 지원 승인/거절 알림' : 'Thông báo duyệt/từ chối ứng tuyển chiến dịch',
    },
    reviews: {
      title: language === 'ko' ? '리뷰 및 평가' : 'Đánh giá và nhận xét',
      description: language === 'ko' ? '새로운 리뷰나 평가 등록 시 알림' : 'Thông báo khi có đánh giá mới',
    },
  };

  const togglePush = (id: string) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, push: !s.push } : s
    ));
  };

  const toggleEmail = (id: string) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, email: !s.email } : s
    ));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      router.back();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{language === 'ko' ? '알림 설정' : 'Cài đặt thông báo'}</h1>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        {/* Info */}
        <div className="card bg-info/10 border-info/30">
          <div className="flex gap-3">
            <Bell size={20} className="text-info flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p>{language === 'ko' ? '푸시 알림과 이메일 알림을 각각 설정할 수 있습니다.' : 'Bạn có thể cài đặt riêng thông báo đẩy và thông báo email.'}</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-3">
          {settings.map((setting) => {
            const Icon = setting.icon;
            const labels = notificationLabels[setting.id];
            return (
              <div key={setting.id} className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{labels.title}</h3>
                    <p className="text-xs text-gray-400">{labels.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Push Notification Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{language === 'ko' ? '푸시 알림' : 'Thông báo đẩy'}</span>
                    <button
                      onClick={() => togglePush(setting.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.push ? 'bg-primary' : 'bg-dark-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.push ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Email Notification Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{language === 'ko' ? '이메일 알림' : 'Thông báo email'}</span>
                    <button
                      onClick={() => toggleEmail(setting.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.email ? 'bg-secondary' : 'bg-dark-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Success Message */}
        {saveSuccess && (
          <div className="bg-success/10 border border-success/30 rounded-lg p-3">
            <p className="text-sm text-success text-center">
              {language === 'ko' ? '알림 설정이 저장되었습니다!' : 'Đã lưu cài đặt thông báo!'}
            </p>
          </div>
        )}

        {/* Save Button */}
        <button onClick={handleSave} className="btn btn-primary w-full" disabled={saveSuccess}>
          {saveSuccess
            ? (language === 'ko' ? '저장됨' : 'Đã lưu')
            : (language === 'ko' ? '설정 저장' : 'Lưu cài đặt')}
        </button>
      </div>
    </div>
  );
}

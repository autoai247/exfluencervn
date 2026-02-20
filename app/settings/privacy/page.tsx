'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Eye, EyeOff, Users, Lock, Download, Trash2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function PrivacySettingsPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [profileVisibility, setProfileVisibility] = useState('public'); // public, followers, private
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [allowMessages, setAllowMessages] = useState('all'); // all, connections, none
  const [dataTracking, setDataTracking] = useState(true);

  const handleSave = () => {
    alert(language === 'ko' ? '개인정보 보호 설정이 저장되었습니다!' : 'Đã lưu cài đặt bảo mật!');
    router.back();
  };

  const handleExportData = () => {
    alert(language === 'ko'
      ? '데이터 다운로드를 준비 중입니다.\n이메일로 다운로드 링크를 보내드립니다.'
      : 'Đang chuẩn bị tải xuống dữ liệu.\nChúng tôi sẽ gửi liên kết tải xuống qua email.');
  };

  const handleDeleteData = () => {
    const confirmed = confirm(language === 'ko'
      ? '정말로 모든 개인 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
      : 'Bạn có chắc muốn xóa tất cả dữ liệu cá nhân?\nHành động này không thể hoàn tác.');
    if (confirmed) {
      alert(language === 'ko'
        ? '데이터 삭제 요청이 접수되었습니다.\n7일 이내에 모든 데이터가 영구 삭제됩니다.'
        : 'Yêu cầu xóa dữ liệu đã được tiếp nhận.\nTất cả dữ liệu sẽ bị xóa vĩnh viễn trong vòng 7 ngày.');
    }
  };

  const visibilityOptions = [
    {
      value: 'public',
      label: language === 'ko' ? '전체 공개' : 'Công khai',
      desc: language === 'ko' ? '모든 사용자가 프로필을 볼 수 있습니다' : 'Tất cả người dùng đều có thể xem hồ sơ',
      icon: Eye,
    },
    {
      value: 'followers',
      label: language === 'ko' ? '팔로워만' : 'Chỉ người theo dõi',
      desc: language === 'ko' ? '나를 팔로우하는 사람만 볼 수 있습니다' : 'Chỉ người theo dõi mới xem được',
      icon: Users,
    },
    {
      value: 'private',
      label: language === 'ko' ? '비공개' : 'Riêng tư',
      desc: language === 'ko' ? '프로필을 숨깁니다' : 'Ẩn hồ sơ của bạn',
      icon: Lock,
    },
  ];

  const messageOptions = [
    { value: 'all', label: language === 'ko' ? '모든 사용자' : 'Tất cả người dùng', desc: language === 'ko' ? '누구나 메시지를 보낼 수 있습니다' : 'Bất kỳ ai cũng có thể nhắn tin' },
    { value: 'connections', label: language === 'ko' ? '연결된 사용자만' : 'Chỉ người đã kết nối', desc: language === 'ko' ? '나와 작업한 적 있는 사용자만' : 'Chỉ người đã từng làm việc cùng' },
    { value: 'none', label: language === 'ko' ? '받지 않음' : 'Không nhận', desc: language === 'ko' ? '메시지를 받지 않습니다' : 'Không nhận tin nhắn' },
  ];

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{language === 'ko' ? '개인정보 보호' : 'Bảo mật & Quyền riêng tư'}</h1>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        {/* Info */}
        <div className="card bg-info/10 border-info/30">
          <div className="flex gap-3">
            <Shield size={20} className="text-info flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p>{language === 'ko' ? '회원님의 개인정보 공개 범위와 데이터 사용을 설정할 수 있습니다.' : 'Bạn có thể cài đặt phạm vi công khai thông tin cá nhân và việc sử dụng dữ liệu.'}</p>
            </div>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{language === 'ko' ? '프로필 공개 범위' : 'Phạm vi công khai hồ sơ'}</h3>
              <p className="text-xs text-gray-400 mt-1">{language === 'ko' ? '프로필을 볼 수 있는 사람을 설정합니다' : 'Cài đặt ai có thể xem hồ sơ của bạn'}</p>
            </div>
          </div>

          <div className="space-y-2">
            {visibilityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setProfileVisibility(option.value)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    profileVisibility === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-500 hover:border-dark-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={profileVisibility === option.value ? 'text-primary' : 'text-gray-400'} />
                    <div>
                      <p className="text-sm font-semibold text-white">{option.label}</p>
                      <p className="text-xs text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="card">
          <h3 className="font-semibold text-white mb-4">{language === 'ko' ? '연락처 정보 공개' : 'Hiển thị thông tin liên lạc'}</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{language === 'ko' ? '이메일 주소 표시' : 'Hiển thị địa chỉ email'}</p>
                <p className="text-xs text-gray-400">{language === 'ko' ? '프로필에 이메일을 표시합니다' : 'Hiển thị email trên hồ sơ'}</p>
              </div>
              <button
                onClick={() => setShowEmail(!showEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showEmail ? 'bg-primary' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{language === 'ko' ? '전화번호 표시' : 'Hiển thị số điện thoại'}</p>
                <p className="text-xs text-gray-400">{language === 'ko' ? '프로필에 전화번호를 표시합니다' : 'Hiển thị số điện thoại trên hồ sơ'}</p>
              </div>
              <button
                onClick={() => setShowPhone(!showPhone)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showPhone ? 'bg-primary' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showPhone ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Message Permissions */}
        <div className="card">
          <h3 className="font-semibold text-white mb-4">{language === 'ko' ? '메시지 수신 설정' : 'Cài đặt nhận tin nhắn'}</h3>

          <div className="space-y-2">
            {messageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAllowMessages(option.value)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  allowMessages === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-dark-500 hover:border-dark-400'
                }`}
              >
                <p className="text-sm font-semibold text-white">{option.label}</p>
                <p className="text-xs text-gray-400">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="card">
          <h3 className="font-semibold text-white mb-4">{language === 'ko' ? '데이터 및 개인정보' : 'Dữ liệu & Quyền riêng tư'}</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{language === 'ko' ? '활동 데이터 수집' : 'Thu thập dữ liệu hoạt động'}</p>
                <p className="text-xs text-gray-400">{language === 'ko' ? '서비스 개선을 위한 데이터 수집' : 'Thu thập dữ liệu để cải thiện dịch vụ'}</p>
              </div>
              <button
                onClick={() => setDataTracking(!dataTracking)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  dataTracking ? 'bg-primary' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dataTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleExportData}
              className="w-full btn btn-secondary justify-start"
            >
              <Download size={18} className="mr-2" />
              {language === 'ko' ? '내 데이터 다운로드' : 'Tải xuống dữ liệu của tôi'}
            </button>

            <button
              onClick={handleDeleteData}
              className="w-full btn bg-error/20 text-error hover:bg-error/30 border-error/30 justify-start"
            >
              <Trash2 size={18} className="mr-2" />
              {language === 'ko' ? '모든 데이터 삭제 요청' : 'Yêu cầu xóa tất cả dữ liệu'}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="btn btn-primary w-full">
          {language === 'ko' ? '설정 저장' : 'Lưu cài đặt'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Eye, EyeOff, Users, Lock, Download, Trash2 } from 'lucide-react';

export default function PrivacySettingsPage() {
  const router = useRouter();

  const [profileVisibility, setProfileVisibility] = useState('public'); // public, followers, private
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [allowMessages, setAllowMessages] = useState('all'); // all, connections, none
  const [dataTracking, setDataTracking] = useState(true);

  const handleSave = () => {
    alert('개인정보 보호 설정이 저장되었습니다!');
    router.back();
  };

  const handleExportData = () => {
    alert('데이터 다운로드를 준비 중입니다.\n이메일로 다운로드 링크를 보내드립니다.');
  };

  const handleDeleteData = () => {
    const confirmed = confirm(
      '정말로 모든 개인 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
    );
    if (confirmed) {
      alert('데이터 삭제 요청이 접수되었습니다.\n7일 이내에 모든 데이터가 영구 삭제됩니다.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">개인정보 보호</h1>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        {/* Info */}
        <div className="card bg-info/10 border-info/30">
          <div className="flex gap-3">
            <Shield size={20} className="text-info flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p>회원님의 개인정보 공개 범위와 데이터 사용을 설정할 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">프로필 공개 범위</h3>
              <p className="text-xs text-gray-400 mt-1">프로필을 볼 수 있는 사람을 설정합니다</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setProfileVisibility('public')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                profileVisibility === 'public'
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-500 hover:border-dark-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye size={16} className={profileVisibility === 'public' ? 'text-primary' : 'text-gray-400'} />
                <div>
                  <p className="text-sm font-semibold text-white">전체 공개</p>
                  <p className="text-xs text-gray-400">모든 사용자가 프로필을 볼 수 있습니다</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setProfileVisibility('followers')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                profileVisibility === 'followers'
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-500 hover:border-dark-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={16} className={profileVisibility === 'followers' ? 'text-primary' : 'text-gray-400'} />
                <div>
                  <p className="text-sm font-semibold text-white">팔로워만</p>
                  <p className="text-xs text-gray-400">나를 팔로우하는 사람만 볼 수 있습니다</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setProfileVisibility('private')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                profileVisibility === 'private'
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-500 hover:border-dark-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock size={16} className={profileVisibility === 'private' ? 'text-primary' : 'text-gray-400'} />
                <div>
                  <p className="text-sm font-semibold text-white">비공개</p>
                  <p className="text-xs text-gray-400">프로필을 숨깁니다</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card">
          <h3 className="font-semibold text-white mb-4">연락처 정보 공개</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">이메일 주소 표시</p>
                <p className="text-xs text-gray-400">프로필에 이메일을 표시합니다</p>
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
                <p className="text-sm text-white">전화번호 표시</p>
                <p className="text-xs text-gray-400">프로필에 전화번호를 표시합니다</p>
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
          <h3 className="font-semibold text-white mb-4">메시지 수신 설정</h3>

          <div className="space-y-2">
            {[
              { value: 'all', label: '모든 사용자', desc: '누구나 메시지를 보낼 수 있습니다' },
              { value: 'connections', label: '연결된 사용자만', desc: '나와 작업한 적 있는 사용자만' },
              { value: 'none', label: '받지 않음', desc: '메시지를 받지 않습니다' },
            ].map((option) => (
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
          <h3 className="font-semibold text-white mb-4">데이터 및 개인정보</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">활동 데이터 수집</p>
                <p className="text-xs text-gray-400">서비스 개선을 위한 데이터 수집</p>
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
              내 데이터 다운로드
            </button>

            <button
              onClick={handleDeleteData}
              className="w-full btn bg-error/20 text-error hover:bg-error/30 border-error/30 justify-start"
            >
              <Trash2 size={18} className="mr-2" />
              모든 데이터 삭제 요청
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="btn btn-primary w-full">
          설정 저장
        </button>
      </div>
    </div>
  );
}

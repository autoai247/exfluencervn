'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Globe, Bell, Shield, Trash2, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function SettingsPage() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleLanguageChange = () => {
    setShowLanguageModal(true);
  };

  const handleNotificationSettings = () => {
    router.push('/settings/notifications');
  };

  const handlePrivacySettings = () => {
    router.push('/settings/privacy');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  const confirmDeleteAccount = () => {
    setShowDeleteModal(false);
    localStorage.removeItem('exfluencer_user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.settings.title}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Account Settings */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.settings.account}</h3>

          <button onClick={handleChangePassword} className="card-hover w-full text-left">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-gray-400" />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{t.settings.changePassword}</h4>
                <p className="text-xs text-gray-400">{t.settings.changePasswordDesc}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          <button onClick={handleLanguageChange} className="card-hover w-full text-left">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-400" />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{t.settings.language}</h4>
                <p className="text-xs text-gray-400">
                  {language === 'ko' ? t.settings.languageModal.korean : t.settings.languageModal.vietnamese}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          <button onClick={handleNotificationSettings} className="card-hover w-full text-left">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-400" />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{t.settings.notifications}</h4>
                <p className="text-xs text-gray-400">{t.settings.notificationsDesc}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          <button onClick={handlePrivacySettings} className="card-hover w-full text-left">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-400" />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{t.settings.privacy}</h4>
                <p className="text-xs text-gray-400">{t.settings.privacyDesc}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-error px-1">{t.settings.dangerZone}</h3>

          <button onClick={handleDeleteAccount} className="card border-error/30 hover:bg-error/5 transition-colors w-full text-left">
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-error" />
              <div className="flex-1">
                <h4 className="font-semibold text-error">{t.settings.deleteAccount}</h4>
                <p className="text-xs text-gray-400">{t.settings.deleteAccountDesc}</p>
              </div>
              <ChevronRight size={20} className="text-error" />
            </div>
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.settings.changePassword}</h3>
            {passwordSuccess ? (
              <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-success text-center">{t.settings.passwordModal.success}</p>
              </div>
            ) : null}
            {passwordError ? (
              <div className="bg-error/10 border border-error/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-error text-center">{passwordError}</p>
              </div>
            ) : null}
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              setPasswordError('');
              if (!passwordForm.current) {
                setPasswordError(language === 'ko' ? '현재 비밀번호를 입력하세요.' : 'Vui lòng nhập mật khẩu hiện tại.');
                return;
              }
              if (passwordForm.next.length < 8) {
                setPasswordError(language === 'ko' ? '새 비밀번호는 8자 이상이어야 합니다.' : 'Mật khẩu mới phải có ít nhất 8 ký tự.');
                return;
              }
              if (passwordForm.next !== passwordForm.confirm) {
                setPasswordError(language === 'ko' ? '새 비밀번호가 일치하지 않습니다.' : 'Mật khẩu mới không khớp.');
                return;
              }
              setPasswordSuccess(true);
              setPasswordForm({ current: '', next: '', confirm: '' });
              setTimeout(() => {
                setPasswordSuccess(false);
                setShowPasswordModal(false);
              }, 1500);
            }}>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">{t.settings.passwordModal.currentPassword}</label>
                <input
                  type="password"
                  className="input"
                  placeholder={t.settings.passwordModal.currentPasswordPlaceholder}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">{t.settings.passwordModal.newPassword}</label>
                <input
                  type="password"
                  className="input"
                  placeholder={t.settings.passwordModal.newPasswordPlaceholder}
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">{t.settings.passwordModal.confirmPassword}</label>
                <input
                  type="password"
                  className="input"
                  placeholder={t.settings.passwordModal.confirmPasswordPlaceholder}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordSuccess(false); setPasswordForm({ current: '', next: '', confirm: '' }); }} className="flex-1 btn btn-ghost">
                  {t.settings.passwordModal.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 btn btn-primary"
                >
                  {t.settings.passwordModal.change}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.settings.languageModal.title}</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setLanguage('ko');
                  setShowLanguageModal(false);
                }}
                className={`w-full card-hover text-left ${language === 'ko' ? 'border-2 border-primary' : ''}`}
              >
                <div className="py-3 px-4 flex items-center justify-between">
                  <span className="text-white">{t.settings.languageModal.korean}</span>
                  {language === 'ko' && <span className="text-primary">✓</span>}
                </div>
              </button>
              <button
                onClick={() => {
                  setLanguage('vi');
                  setShowLanguageModal(false);
                }}
                className={`w-full card-hover text-left ${language === 'vi' ? 'border-2 border-primary' : ''}`}
              >
                <div className="py-3 px-4 flex items-center justify-between">
                  <span className="text-white">{t.settings.languageModal.vietnamese}</span>
                  {language === 'vi' && <span className="text-primary">✓</span>}
                </div>
              </button>
            </div>
            <button onClick={() => setShowLanguageModal(false)} className="btn btn-ghost w-full mt-4">
              {t.settings.languageModal.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-error mb-4">{t.settings.deleteAccount}</h3>
            <p className="text-gray-300 mb-6">
              {t.settings.deleteModal.warning}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 btn btn-ghost">
                {t.settings.deleteModal.cancel}
              </button>
              <button onClick={confirmDeleteAccount} className="flex-1 btn bg-error text-white hover:bg-error/80">
                {t.settings.deleteModal.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

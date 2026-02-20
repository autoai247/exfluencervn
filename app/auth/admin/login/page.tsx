'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock admin credentials
    // TODO: Replace with actual API call
    if (formData.email === 'admin@exfluencervn.com' && formData.password === 'admin123') {
      setTimeout(() => {
        router.push('/main/admin');
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError(language === 'ko' ? '관리자 계정 정보가 올바르지 않습니다.' : 'Thông tin tài khoản quản trị viên không chính xác.');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-safe-top px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-error to-warning rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg">Exfluencer VN</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="space-y-6 animate-fade-in">
            {/* Title */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield size={32} className="text-error" />
              </div>
              <h1 className="text-3xl font-bold text-white">{language === 'ko' ? '관리자 로그인' : 'Đăng nhập quản trị viên'}</h1>
              <p className="text-gray-400">Exfluencer VN Admin Panel</p>
              <div className="inline-flex items-center gap-2 mt-3 bg-warning/10 border border-warning/30 rounded-lg px-3 py-2">
                <AlertTriangle size={16} className="text-warning" />
                <span className="text-xs text-warning">{language === 'ko' ? '권한이 있는 관리자만 접근 가능합니다' : 'Chỉ quản trị viên có quyền mới được truy cập'}</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{language === 'ko' ? '로그인 실패' : 'Đăng nhập thất bại'}</h4>
                    <p className="text-sm text-gray-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">{language === 'ko' ? '데모 계정 (테스트용)' : 'Tài khoản demo (để thử nghiệm)'}</p>
              <div className="space-y-1">
                <p className="text-sm text-white font-mono">{language === 'ko' ? '이메일' : 'Email'}: admin@exfluencervn.com</p>
                <p className="text-sm text-white font-mono">{language === 'ko' ? '비밀번호' : 'Mật khẩu'}: admin123</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {language === 'ko' ? '관리자 이메일' : 'Email quản trị viên'}
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setError('');
                    }}
                    placeholder="admin@exfluencervn.com"
                    className="input pl-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {language === 'ko' ? '비밀번호' : 'Mật khẩu'}
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setError('');
                    }}
                    placeholder="••••••••"
                    className="input pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-full text-base mt-6 bg-error hover:bg-error/80 text-white border-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner" />
                    {language === 'ko' ? '인증 중...' : 'Đang xác thực...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield size={20} />
                    {language === 'ko' ? '관리자 로그인' : 'Đăng nhập quản trị viên'}
                  </div>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="bg-dark-600 border border-dark-500 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                {language === 'ko' ? '보안 안내' : 'Hướng dẫn bảo mật'}
              </h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• {language === 'ko' ? '모든 관리자 활동은 로그로 기록됩니다' : 'Tất cả hoạt động quản trị đều được ghi log'}</li>
                <li>• {language === 'ko' ? '비인가 접근 시도는 차단됩니다' : 'Các lần truy cập trái phép sẽ bị chặn'}</li>
                <li>• {language === 'ko' ? '계정 정보를 타인과 공유하지 마세요' : 'Không chia sẻ thông tin tài khoản với người khác'}</li>
              </ul>
            </div>

            {/* Back Link */}
            <div className="text-center pt-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                {language === 'ko' ? '← 메인 페이지로 돌아가기' : '← Quay lại trang chính'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

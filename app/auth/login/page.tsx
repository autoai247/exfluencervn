'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, TrendingUp, User, Building2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      // Supabase Auth 로그인
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(language === 'ko' ? '로그인 실패. 이메일과 비밀번호를 확인하세요.' : 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
        setLoading(false);
        return;
      }

      if (data.user) {
        // 자동 로그인 설정
        if (rememberMe) {
          localStorage.setItem('exfluencer_remember', 'true');
        } else {
          localStorage.removeItem('exfluencer_remember');
        }

        // 프로필 정보 가져오기
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.user.id)
          .single();

        // user_type에 따라 리다이렉트
        if (profile?.user_type === 'advertiser' || profile?.user_type === 'venue') {
          router.push('/main/advertiser');
        } else {
          router.push('/main/influencer/campaigns');
        }

        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setLoading(false);
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
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg">Exfluencer VN</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="space-y-6 animate-fade-in">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">{t.auth.login.welcomeBack}</h1>
              <p className="text-gray-400">{t.auth.login.continueLogin}</p>
            </div>

            {/* Platform Stats (Social Proof) */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-600 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-primary">5,000+</div>
                <div className="text-xs text-gray-400 mt-1">KOLs</div>
              </div>
              <div className="bg-dark-600 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-secondary">1,200+</div>
                <div className="text-xs text-gray-400 mt-1">Brands</div>
              </div>
              <div className="bg-dark-600 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-accent">10,000+</div>
                <div className="text-xs text-gray-400 mt-1">Campaigns</div>
              </div>
            </div>

            {/* Quick Demo Login */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-400 font-semibold">{t.auth.login.quickDemo}</p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ email: 'influencer@test.com', password: 'test1234' });
                  }}
                  className="btn btn-secondary text-sm py-3 flex flex-col items-center gap-1"
                >
                  <User size={18} />
                  <span className="text-xs">KOL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ email: 'advertiser@test.com', password: 'test1234' });
                  }}
                  className="btn btn-primary text-sm py-3 flex flex-col items-center gap-1"
                >
                  <Building2 size={18} />
                  <span className="text-xs">Brand</span>
                </button>
              </div>

              <div className="pt-2 border-t border-primary/20">
                <p className="text-xs text-gray-400 text-center">
                  {t.auth.login.languageInfo}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t.auth.login.email}
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="input pl-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t.auth.login.password}
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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

              {/* Remember Me & Links */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-400">{t.auth.login.rememberMe}</span>
                </label>
                <div className="flex gap-3 text-sm">
                  <Link
                    href="/auth/find-email"
                    className="text-gray-400 hover:text-primary"
                  >
                    {t.auth.login.findEmail}
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link
                    href="/auth/forgot-password"
                    className="text-gray-400 hover:text-primary"
                  >
                    {t.auth.login.forgotPassword}
                  </Link>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-sm text-red-500 text-center">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-base mt-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner" />
                    {t.auth.login.loggingIn}
                  </div>
                ) : (
                  t.auth.login.loginButton
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-4">
              <span className="text-gray-400">{t.auth.login.noAccount} </span>
              <Link href="/auth/register" className="text-primary font-semibold hover:text-primary-light">
                {t.auth.login.signupNow}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

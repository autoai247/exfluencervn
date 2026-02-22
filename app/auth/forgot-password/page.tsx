'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, TrendingUp, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError(language === 'ko'
          ? '이메일 전송에 실패했습니다. 이메일 주소를 확인해 주세요.'
          : 'Gửi email thất bại. Vui lòng kiểm tra địa chỉ email.');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (language === 'ko' ? '오류가 발생했습니다. 다시 시도해 주세요.' : 'Đã xảy ra lỗi. Vui lòng thử lại.');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-safe-top px-4 py-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t.common.back}</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="space-y-6 animate-fade-in max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                <TrendingUp size={32} className="text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">{t.auth.forgotPassword.title}</h1>
              <p className="text-gray-400">{t.auth.forgotPassword.subtitle}</p>
            </div>

            {success ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center space-y-4">
                <div className="text-success text-5xl">✓</div>
                <h3 className="text-lg font-semibold text-white">{t.auth.forgotPassword.successTitle}</h3>
                <p className="text-sm text-gray-400">
                  {t.auth.forgotPassword.successMessage}
                </p>
                <Link
                  href="/auth/login"
                  className="btn btn-primary w-full mt-4"
                >
                  {t.auth.login.loginButton}
                </Link>
              </div>
            ) : (
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input pl-12"
                    />
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
                      {t.auth.forgotPassword.sending}
                    </div>
                  ) : (
                    t.auth.forgotPassword.sendButton
                  )}
                </button>
              </form>
            )}

            {/* Back to Login */}
            <div className="text-center pt-4">
              <Link href="/auth/login" className="text-sm text-gray-400 hover:text-primary">
                ← {language === 'ko' ? '로그인 페이지로 돌아가기' : 'Quay lại trang đăng nhập'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

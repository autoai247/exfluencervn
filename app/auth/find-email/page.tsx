'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, TrendingUp, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

export default function FindEmailPage() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundEmail, setFoundEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFoundEmail('');

    try {
      const supabase = createClient();

      // 전화번호로 프로필 검색
      const { data, error: searchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .single();

      if (searchError || !data) {
        setError(t.auth.findEmail.notFound);
        setLoading(false);
        return;
      }

      // 사용자 정보 가져오기
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(data.id);

      if (userError || !user) {
        setError(t.auth.findEmail.notFound);
        setLoading(false);
        return;
      }

      // 이메일 마스킹 처리
      const email = user.email || '';
      const [localPart, domain] = email.split('@');
      const maskedLocal = localPart.substring(0, 3) + '***';
      const maskedEmail = `${maskedLocal}@${domain}`;

      setFoundEmail(maskedEmail);
    } catch (err: any) {
      setError(err.message || 'Failed to find email');
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
              <h1 className="text-3xl font-bold text-white">{t.auth.findEmail.title}</h1>
              <p className="text-gray-400">{t.auth.findEmail.subtitle}</p>
            </div>

            {foundEmail ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center space-y-4">
                <div className="text-success text-5xl">✓</div>
                <h3 className="text-lg font-semibold text-white">{t.auth.findEmail.foundTitle}</h3>
                <div className="bg-dark-600 rounded-lg p-4">
                  <p className="text-xl font-mono text-primary">{foundEmail}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {t.auth.findEmail.foundMessage}
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
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {t.auth.register.phone}
                  </label>
                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.auth.register.phonePlaceholder}
                      className="input pl-12"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {t.auth.findEmail.phoneHint}
                  </p>
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
                      {t.auth.findEmail.searching}
                    </div>
                  ) : (
                    t.auth.findEmail.searchButton
                  )}
                </button>
              </form>
            )}

            {/* Back to Login */}
            <div className="text-center pt-4">
              <Link href="/auth/login" className="text-sm text-gray-400 hover:text-primary">
                ← {t.auth.login.loginButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import type { UserType } from '@/types';
import { useLanguage, LanguageSelector } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check for auto-login
    try {
      const userData = localStorage.getItem('exfluencer_user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.userType === 'advertiser') {
          router.push('/main/advertiser');
        } else if (user.userType === 'influencer') {
          router.push('/main/influencer/campaigns');
        }
      }
    } catch (e) {
      localStorage.removeItem('exfluencer_user');
    }
  }, [router]);

  // Show nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-lg mx-auto space-y-12">
            {/* Logo & Title */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                  <span className="text-4xl">🚀</span>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold text-white font-display">
                  Exfluencer VN
                </h1>
                <p className="text-gray-300 text-lg">
                  {t.homepage.tagline}
                </p>
              </div>

              {/* Language Selector - Prominent */}
              <div className="flex justify-center gap-3 pt-6">
                <button
                  onClick={() => {
                    localStorage.setItem('exfluencer_language', 'vi');
                    window.location.reload();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${
                    language === 'vi'
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                      : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">🇻🇳</span>
                  <span>Tiếng Việt</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('exfluencer_language', 'ko');
                    window.location.reload();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${
                    language === 'ko'
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                      : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">🇰🇷</span>
                  <span>한국어</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-5 text-center border border-dark-500/50">
                <div className="text-3xl font-bold text-primary">5K+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.kols}</div>
              </div>
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-5 text-center border border-dark-500/50">
                <div className="text-3xl font-bold text-secondary">1.2K+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.brands}</div>
              </div>
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-5 text-center border border-dark-500/50">
                <div className="text-3xl font-bold text-accent">10K+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.campaigns}</div>
              </div>
            </div>

            {/* Value Props */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-200">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-sm">{t.homepage.freeSignup}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                <span className="text-sm">{t.homepage.fastMatching}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span className="text-sm">{t.homepage.securePayment}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Link
                href="/auth/register"
                className="block w-full text-center py-5 font-bold bg-gradient-to-r from-primary to-secondary text-white rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Sign up for Exfluencer VN"
              >
                {t.homepage.signupText}
              </Link>
              {/* Preview campaigns without login - for Facebook-referred traffic */}
              <Link
                href="/main/influencer/campaigns"
                className="block w-full text-center py-4 font-semibold bg-transparent text-accent rounded-2xl border-2 border-accent/50 hover:border-accent hover:bg-accent/10 transition-all text-sm"
                aria-label="Browse open campaigns"
              >
                {language === 'vi' ? '👀 Xem các chiến dịch đang mở →' : '👀 오픈 캠페인 보기 →'}
              </Link>
              <Link
                href="/auth/login"
                className="block w-full text-center py-3 font-medium bg-transparent text-gray-400 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all text-sm"
                aria-label="Login to your account"
              >
                {t.homepage.loginText}
              </Link>
            </div>

            {/* Supported Platforms */}
            <div className="pt-4">
              <p className="text-center text-xs text-gray-500 mb-4">{t.homepage.platformsSubtitle}</p>
              <div className="flex justify-center gap-4" role="list" aria-label="Supported social media platforms">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center" role="listitem" aria-label="Instagram">
                  <FaInstagram size={24} className="text-white" aria-hidden="true" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center border border-white/10" role="listitem" aria-label="TikTok">
                  <FaTiktok size={24} className="text-white" aria-hidden="true" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center" role="listitem" aria-label="YouTube">
                  <FaYoutube size={24} className="text-white" aria-hidden="true" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center" role="listitem" aria-label="Facebook">
                  <FaFacebook size={24} className="text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              {t.homepage.howItWorksTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-600/30 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/30 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step1Title}</h3>
                <p className="text-gray-400 text-sm">{t.homepage.step1Desc}</p>
              </div>

              <div className="bg-dark-600/30 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/30 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step2Title}</h3>
                <p className="text-gray-400 text-sm">{t.homepage.step2Desc}</p>
              </div>

              <div className="bg-dark-600/30 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/30 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step3Title}</h3>
                <p className="text-gray-400 text-sm">{t.homepage.step3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stats */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-dark-600/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              {t.homepage.successStatsTitle}
            </h2>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">{t.homepage.stat1Value}</div>
                <div className="text-gray-400 text-xs">{t.homepage.stat1Label}</div>
              </div>
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-secondary/20">
                <div className="text-4xl font-bold text-secondary mb-2">{t.homepage.stat2Value}</div>
                <div className="text-gray-400 text-xs">{t.homepage.stat2Label}</div>
              </div>
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-accent/20">
                <div className="text-4xl font-bold text-accent mb-2">{t.homepage.stat3Value}</div>
                <div className="text-gray-400 text-xs">{t.homepage.stat3Label}</div>
              </div>
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-500/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">{t.homepage.stat4Value}</div>
                <div className="text-gray-400 text-xs">{t.homepage.stat4Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">
              {t.homepage.readyToStart}
            </h2>
            <Link
              href="/auth/register"
              className="inline-block px-12 py-5 text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all transform hover:scale-105"
              aria-label="Join Exfluencer VN now"
            >
              {t.homepage.joinNow}
            </Link>

            <p className="text-xs text-gray-500 pt-8">
              {t.homepage.agreeToTerms}{' '}
              <Link href="/terms" className="text-primary hover:underline">
                {t.homepage.termsLink}
              </Link>{' '}
              {t.homepage.and}{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                {t.homepage.privacyLink}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

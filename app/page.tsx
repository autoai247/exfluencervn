'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import type { UserType } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserType | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check for auto-login
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('exfluencer_user');

      if (userData) {
        try {
          const user = JSON.parse(userData);
          // Redirect based on user type
          if (user.userType === 'advertiser') {
            router.push('/main/advertiser');
          } else {
            router.push('/main/influencer/campaigns');
          }
        } catch (e) {
          // Invalid data, clear it
          localStorage.removeItem('exfluencer_user');
          setChecking(false);
        }
      } else {
        setChecking(false);
      }
    }
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">{t.homepage.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-700 via-dark-600 to-dark-700">
      <div className="container-mobile min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl">
                <TrendingUp size={40} className="text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white font-display">
                Exfluencer VN
              </h1>
              <p className="text-gray-400 text-sm px-4">
                {t.homepage.tagline}
              </p>
              <p className="text-gray-500 text-xs px-4">
                {t.homepage.taglineEn}
              </p>
              <p className="text-gray-500 text-xs px-4">
                {t.homepage.taglineVi}
              </p>
            </div>

            {/* Social platforms */}
            <div className="flex justify-center gap-3 py-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <FaInstagram size={24} className="text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-lg">
                <FaTiktok size={24} className="text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                <FaYoutube size={24} className="text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                <FaFacebook size={24} className="text-white" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-6">
              <div className="stat-item">
                <div className="stat-value">5,000+</div>
                <div className="stat-label">{t.homepage.kols}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">1,200+</div>
                <div className="stat-label">{t.homepage.brands}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">{t.homepage.campaigns}</div>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="space-y-2 mt-6 max-w-md mx-auto text-left">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>{t.homepage.freeSignup}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                <span>{t.homepage.fastMatching}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>{t.homepage.securePayment}</span>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4 mt-12 animate-slide-up">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-semibold text-white">
                {t.homepage.howToStart}
              </h2>
              <p className="text-xs text-gray-500">
                {t.homepage.howToStartEn} | {t.homepage.howToStartVi}
              </p>
            </div>

            {/* Influencer Card */}
            <button
              onClick={() => setSelectedRole('influencer')}
              className={`card-hover w-full p-6 transition-all ${
                selectedRole === 'influencer'
                  ? 'border-primary shadow-xl shadow-primary/20'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-white">{t.homepage.influencerRole}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {t.homepage.influencerDesc}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.homepage.influencerDescEn}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="badge badge-primary text-xs">{t.homepage.avgMonthlyEarning}</span>
                    <span className="badge badge-secondary text-xs">{t.homepage.free}</span>
                    <span className="badge badge-success text-xs">{t.homepage.activeCampaigns}</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Advertiser Card */}
            <button
              onClick={() => setSelectedRole('advertiser')}
              className={`card-hover w-full p-6 transition-all ${
                selectedRole === 'advertiser'
                  ? 'border-secondary shadow-xl shadow-secondary/20'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-white">{t.homepage.advertiserRole}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {t.homepage.advertiserDesc}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.homepage.advertiserDescEn}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="badge badge-secondary text-xs">{t.homepage.avgROI}</span>
                    <span className="badge badge-success text-xs">{t.homepage.verifiedKOL}</span>
                    <span className="badge badge-accent text-xs">{t.homepage.realtimeAnalysis}</span>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mt-8">
            {selectedRole && (
              <Link
                href={`/auth/register?type=${selectedRole}`}
                className="btn btn-primary w-full text-base animate-scale-in"
              >
                {t.homepage.startNowFree}
              </Link>
            )}
            <Link
              href="/auth/login"
              className={`btn ${selectedRole ? 'btn-ghost' : 'btn-primary'} w-full text-base`}
            >
              {t.homepage.loginText}
            </Link>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-6 px-4">
            {t.homepage.agreeToTerms}{' '}
            <Link href="/terms" className="text-primary underline">
              {t.homepage.termsLink}
            </Link>{' '}
            {t.homepage.and}{' '}
            <Link href="/privacy" className="text-primary underline">
              {t.homepage.privacyLink}
            </Link>
            {t.homepage.agreeBySigningUp}
          </p>

          {/* Admin Link */}
          <div className="text-center mt-6">
            <Link href="/auth/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              {t.homepage.adminLogin}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

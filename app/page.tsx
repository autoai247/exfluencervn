'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import type { UserType } from '@/types';
import { useLanguage, LanguageSelector } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
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
        {/* Language Selector - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector />
        </div>

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

          {/* CTA Buttons */}
          <div className="space-y-4 mt-12 max-w-md mx-auto w-full">
            <Link
              href="/auth/register"
              className="btn btn-primary w-full text-lg py-5 font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all transform hover:scale-105"
            >
              {t.homepage.signupText}
            </Link>
            <Link
              href="/auth/login"
              className="btn btn-ghost w-full text-lg py-5 font-semibold border-2 border-gray-500 hover:border-primary hover:bg-primary/10 transition-all"
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

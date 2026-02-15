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
    <main className="min-h-screen bg-gradient-to-b from-dark-700 via-dark-600 to-dark-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Language Selector - Fixed Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSelector />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg mx-auto space-y-10 animate-fade-in">
            {/* Logo Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center animate-scale-in">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 transform hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={48} className="text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl font-bold text-white font-display tracking-tight">
                  Exfluencer VN
                </h1>
                <p className="text-gray-300 text-base font-medium">
                  {t.homepage.tagline}
                </p>
              </div>

              {/* Social platforms */}
              <div className="flex justify-center gap-4 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <FaInstagram size={26} className="text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <FaTiktok size={26} className="text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <FaYoutube size={26} className="text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <FaFacebook size={26} className="text-white" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 px-4">
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-dark-500/50 hover:border-primary/30 transition-all">
                <div className="text-2xl font-bold text-primary">5,000+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.kols}</div>
              </div>
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-dark-500/50 hover:border-secondary/30 transition-all">
                <div className="text-2xl font-bold text-secondary">1,200+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.brands}</div>
              </div>
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-dark-500/50 hover:border-accent/30 transition-all">
                <div className="text-2xl font-bold text-accent">10,000+</div>
                <div className="text-xs text-gray-400 mt-1">{t.homepage.campaigns}</div>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="bg-dark-600/30 backdrop-blur-sm rounded-2xl p-6 border border-dark-500/30 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>{t.homepage.freeSignup}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                <span>{t.homepage.fastMatching}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                <span>{t.homepage.securePayment}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 px-4">
              <Link
                href="/auth/register"
                className="block w-full text-center text-xl py-6 font-bold bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.homepage.signupText}
              </Link>
              <Link
                href="/auth/login"
                className="block w-full text-center text-xl py-6 font-semibold bg-transparent text-white rounded-2xl border-2 border-gray-500 hover:border-primary hover:bg-primary/10 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.homepage.loginText}
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16 font-display">
              {t.homepage.howItWorksTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/40 hover:border-primary/40 transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step1Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.homepage.step1Desc}</p>
              </div>

              {/* Step 2 */}
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/40 hover:border-secondary/40 transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/30">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step2Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.homepage.step2Desc}</p>
              </div>

              {/* Step 3 */}
              <div className="bg-dark-600/40 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/40 hover:border-accent/40 transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/30">
                  <DollarSign size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.homepage.step3Title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.homepage.step3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Influencers Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-4 font-display">
              {t.homepage.forInfluencersTitle}
            </h2>
            <p className="text-gray-400 text-center mb-16 text-lg">
              {t.homepage.influencerDescEn}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Benefit 1 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-primary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.influencerBenefit1Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.influencerBenefit1Desc}</p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-primary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.influencerBenefit2Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.influencerBenefit2Desc}</p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-primary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.influencerBenefit3Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.influencerBenefit3Desc}</p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-primary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.influencerBenefit4Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.influencerBenefit4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Advertisers Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-4 font-display">
              {t.homepage.forAdvertisersTitle}
            </h2>
            <p className="text-gray-400 text-center mb-16 text-lg">
              {t.homepage.advertiserDescEn}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Benefit 1 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-secondary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.advertiserBenefit1Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.advertiserBenefit1Desc}</p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-secondary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.advertiserBenefit2Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.advertiserBenefit2Desc}</p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-secondary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.advertiserBenefit3Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.advertiserBenefit3Desc}</p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-dark-600/50 backdrop-blur-sm rounded-3xl p-8 border border-dark-500/50 hover:border-secondary/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{t.homepage.advertiserBenefit4Title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.homepage.advertiserBenefit4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stats Section */}
        <section className="py-20 px-4">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16 font-display">
              {t.homepage.successStatsTitle}
            </h2>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-primary/30">
                <div className="text-5xl font-bold text-primary mb-2">{t.homepage.stat1Value}</div>
                <div className="text-gray-300 text-sm">{t.homepage.stat1Label}</div>
              </div>
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-secondary/30">
                <div className="text-5xl font-bold text-secondary mb-2">{t.homepage.stat2Value}</div>
                <div className="text-gray-300 text-sm">{t.homepage.stat2Label}</div>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-accent/30">
                <div className="text-5xl font-bold text-accent mb-2">{t.homepage.stat3Value}</div>
                <div className="text-gray-300 text-sm">{t.homepage.stat3Label}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 backdrop-blur-sm rounded-3xl p-8 text-center border border-purple-500/30">
                <div className="text-5xl font-bold text-purple-400 mb-2">{t.homepage.stat4Value}</div>
                <div className="text-gray-300 text-sm">{t.homepage.stat4Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 px-4">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">
              {t.homepage.platformsTitle}
            </h2>
            <p className="text-gray-400 mb-12 text-lg">
              {t.homepage.platformsSubtitle}
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 transform hover:scale-110 transition-all cursor-pointer">
                <FaInstagram size={40} className="text-white" />
              </div>
              <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center shadow-2xl shadow-gray-900/30 transform hover:scale-110 transition-all cursor-pointer border border-white/10">
                <FaTiktok size={40} className="text-white" />
              </div>
              <div className="w-20 h-20 rounded-3xl bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/30 transform hover:scale-110 transition-all cursor-pointer">
                <FaYoutube size={40} className="text-white" />
              </div>
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 transform hover:scale-110 transition-all cursor-pointer">
                <FaFacebook size={40} className="text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 mb-20">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-white font-display">
              {t.homepage.readyToStart}
            </h2>
            <Link
              href="/auth/register"
              className="inline-block px-16 py-6 text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all transform hover:scale-105 active:scale-95"
            >
              {t.homepage.joinNow}
            </Link>

            {/* Terms */}
            <div className="text-center pt-8">
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.homepage.agreeToTerms}{' '}
                <Link href="/terms" className="text-primary underline hover:text-primary-light">
                  {t.homepage.termsLink}
                </Link>{' '}
                {t.homepage.and}{' '}
                <Link href="/privacy" className="text-primary underline hover:text-primary-light">
                  {t.homepage.privacyLink}
                </Link>
                {t.homepage.agreeBySigningUp}
              </p>
            </div>

            {/* Admin Link */}
            <div className="text-center pt-4">
              <Link href="/auth/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {t.homepage.adminLogin}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* 404 Illustration */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
            <SearchX size={48} className="text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
            404
          </div>
          <h1 className="text-3xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-300">
            {language === 'ko' ? '페이지를 찾을 수 없습니다' : 'Không tìm thấy trang'}
          </p>
          <p className="text-sm text-gray-400">
            {language === 'ko' ? '찾으시는 페이지가 존재하지 않거나 이동되었습니다.' : 'Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-600 text-white rounded-xl font-semibold hover:bg-dark-500 transition-all border border-dark-500"
          >
            <ArrowLeft size={20} />
            {language === 'ko' ? '뒤로 가기' : 'Quay lại'}
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <Home size={20} />
            {language === 'ko' ? '홈' : 'Trang chủ'}
          </Link>
        </div>

        {/* Popular Links */}
        <div className="pt-8 space-y-3">
          <p className="text-sm text-gray-500 font-semibold">{language === 'ko' ? '인기 페이지:' : 'Trang phổ biến:'}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-dark-600/50 text-gray-300 rounded-lg text-sm hover:bg-dark-600 transition-colors"
            >
              {language === 'ko' ? '로그인' : 'Đăng nhập'}
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-dark-600/50 text-gray-300 rounded-lg text-sm hover:bg-dark-600 transition-colors"
            >
              {language === 'ko' ? '회원가입' : 'Đăng ký'}
            </Link>
            <Link
              href="/main/influencer/campaigns"
              className="px-4 py-2 bg-dark-600/50 text-gray-300 rounded-lg text-sm hover:bg-dark-600 transition-colors"
            >
              Campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();

  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/30">
            <AlertTriangle size={48} className="text-white" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'ko' ? '오류가 발생했습니다' : 'Đã xảy ra lỗi'}
          </p>
          <p className="text-sm text-gray-400">
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <RefreshCw size={20} />
            {language === 'ko' ? '다시 시도' : 'Thử lại'}
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-600 text-white rounded-xl font-semibold hover:bg-dark-500 transition-all border border-dark-500"
          >
            <Home size={20} />
            {language === 'ko' ? '홈' : 'Trang chủ'}
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 text-xs text-gray-500">
          <p>{language === 'ko' ? '문제가 지속되면 지원팀에 문의하세요.' : 'Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ hỗ trợ.'}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-2xl skeleton" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 skeleton rounded-lg" />
          <div className="h-4 w-1/2 skeleton rounded-lg" />
          <div className="h-3 w-full skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function RaffleCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 rounded-2xl skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-3/4 skeleton rounded-lg" />
          <div className="h-4 w-full skeleton rounded-lg" />
          <div className="h-4 w-2/3 skeleton rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full skeleton rounded-full" />
        <div className="flex justify-between">
          <div className="h-4 w-24 skeleton rounded-lg" />
          <div className="h-4 w-16 skeleton rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RaffleListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <RaffleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card animate-pulse text-center">
          <div className="w-10 h-10 skeleton rounded-full mx-auto mb-3" />
          <div className="h-8 w-20 skeleton rounded-lg mx-auto mb-2" />
          <div className="h-4 w-16 skeleton rounded-lg mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function PageLoadingSpinner() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-dark-700 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="spinner mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">{language === 'ko' ? '로딩 중...' : 'Đang tải...'}</p>
      </div>
    </div>
  );
}

export function InlineSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} border-primary/30 border-t-primary rounded-full animate-spin`} />
  );
}

// 전체 화면 로딩
export function FullScreenLoader() {
  const { language } = useLanguage();
  return (
    <div className="fixed inset-0 z-[100] bg-dark-800/95 backdrop-blur-xl flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* 메인 로더 */}
        <div className="relative w-24 h-24 mx-auto">
          {/* 외부 원 */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          {/* 회전하는 원 */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin" />
          {/* 내부 펄스 */}
          <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse" />
          {/* 중앙 점 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse" />
          </div>
        </div>

        {/* 텍스트 */}
        <div className="space-y-2">
          <p className="text-white text-lg font-bold">{language === 'ko' ? '잠시만 기다려주세요' : 'Vui lòng đợi'}</p>
          <p className="text-gray-400 text-sm">{language === 'ko' ? '로딩 중입니다...' : 'Đang tải...'}</p>
        </div>

        {/* 로딩 바 */}
        <div className="w-48 mx-auto">
          <div className="progress-bar h-1.5">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

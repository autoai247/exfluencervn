'use client';

interface SkeletonProps {
  className?: string;
  /** @deprecated 앱 전체가 dark 테마로 통일되어 이 prop은 무시됩니다 */
  dark?: boolean;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-dark-600 ${className}`}
    />
  );
}

export function CampaignCardSkeleton({ dark: _dark }: { dark?: boolean } = {}) {
  return (
    <div className="rounded-xl p-4 border bg-dark-600 border-dark-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-500">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function InfluencerCardSkeleton({ dark: _dark }: { dark?: boolean } = {}) {
  return (
    <div className="rounded-xl p-4 border bg-dark-600 border-dark-500">
      {/* Profile */}
      <div className="flex items-start gap-3 mb-3">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-4 w-12 mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function ProfileHeaderSkeleton({ dark: _dark }: { dark?: boolean } = {}) {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="w-24 h-24 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-64 mb-3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({
  count = 3,
  type = 'campaign',
  dark: _dark = false,
}: {
  count?: number;
  type?: 'campaign' | 'influencer';
  dark?: boolean;
}) {
  const Component = type === 'campaign' ? CampaignCardSkeleton : InfluencerCardSkeleton;

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

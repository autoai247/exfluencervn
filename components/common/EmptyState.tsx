'use client';

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  /** @deprecated 앱 전체가 dark 테마로 통일되어 이 prop은 무시됩니다 */
  dark?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`text-center py-16 px-6 ${className}`}>
      {/* Decorative background circle */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute w-32 h-32 rounded-full bg-dark-600/50 animate-pulse" />
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-dark-500">
          <Icon
            size={40}
            className="text-gray-500"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold mb-2 text-white">
        {title}
      </h3>
      <p className="text-sm max-w-md mx-auto mb-6 text-gray-400">
        {description}
      </p>

      {/* Optional action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 rounded-lg font-medium transition-all bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-105 active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

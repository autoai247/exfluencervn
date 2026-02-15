'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  dark?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
  dark = false,
}: EmptyStateProps) {
  return (
    <div className={`text-center py-16 px-6 ${className}`}>
      {/* Decorative background circle */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div
          className={`absolute w-32 h-32 rounded-full ${
            dark ? 'bg-dark-600/50' : 'bg-gray-100'
          } animate-pulse`}
        />
        <div
          className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
            dark ? 'bg-dark-500' : 'bg-gray-50'
          }`}
        >
          <Icon
            size={40}
            className={dark ? 'text-gray-500' : 'text-gray-300'}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Text */}
      <h3
        className={`text-lg font-semibold mb-2 ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm max-w-md mx-auto mb-6 ${
          dark ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        {description}
      </p>

      {/* Optional action button */}
      {action && (
        <button
          onClick={action.onClick}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
            dark
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

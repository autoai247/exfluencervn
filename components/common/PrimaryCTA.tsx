'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PrimaryCTAProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  pulse?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryCTA({
  children,
  onClick,
  icon: Icon,
  pulse = false,
  disabled = false,
  className = '',
}: PrimaryCTAProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-5 px-6
        text-xl font-bold
        bg-gradient-to-r from-red-500 via-yellow-400 to-red-500
        hover:from-red-600 hover:via-yellow-500 hover:to-red-600
        active:scale-[0.98]
        text-white rounded-2xl
        shadow-2xl shadow-red-500/50
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${pulse ? 'animate-pulse-glow' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-3">
        {Icon && <Icon size={24} />}
        <span>{children}</span>
      </div>
    </button>
  );
}

// 보조 CTA (덜 중요한 액션용)
export function SecondaryCTA({
  children,
  onClick,
  icon: Icon,
  className = '',
}: PrimaryCTAProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full py-4 px-6
        text-lg font-bold
        bg-gradient-to-r from-primary to-secondary
        hover:from-primary/90 hover:to-secondary/90
        active:scale-[0.98]
        text-white rounded-xl
        shadow-xl shadow-primary/30
        transition-all duration-300
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon size={20} />}
        <span>{children}</span>
      </div>
    </button>
  );
}

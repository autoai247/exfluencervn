'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: {
    bg: 'bg-success/20',
    border: 'border-success',
    icon: 'text-success',
    text: 'text-success',
  },
  error: {
    bg: 'bg-error/20',
    border: 'border-error',
    icon: 'text-error',
    text: 'text-error',
  },
  info: {
    bg: 'bg-secondary/20',
    border: 'border-secondary',
    icon: 'text-secondary',
    text: 'text-secondary',
  },
  warning: {
    bg: 'bg-accent/20',
    border: 'border-accent',
    icon: 'text-accent',
    text: 'text-accent',
  },
};

export default function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-xl min-w-[320px] max-w-md animate-slide-in-right`}
    >
      <div className="flex items-start gap-3">
        <Icon size={24} className={colors.icon} />
        <div className="flex-1">
          <h4 className={`font-bold text-sm ${colors.text} mb-1`}>{title}</h4>
          {message && <p className="text-xs text-gray-300">{message}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

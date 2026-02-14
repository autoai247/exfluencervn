'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, Trophy } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'winner';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

export default function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = notification.duration || 5000;
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="text-success" size={24} />;
      case 'error':
        return <AlertCircle className="text-error" size={24} />;
      case 'winner':
        return <Trophy className="text-accent" size={24} />;
      default:
        return <Info className="text-info" size={24} />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-success/10 border-success/30';
      case 'error':
        return 'bg-error/10 border-error/30';
      case 'winner':
        return 'bg-accent/10 border-accent/30';
      default:
        return 'bg-info/10 border-info/30';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${getBgColor()} shadow-lg backdrop-blur-sm transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white mb-1">{notification.title}</h4>
        <p className="text-xs text-gray-300">{notification.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}

'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
  retryText?: string;
  fullPage?: boolean;
  action?: ReactNode;
}

export default function ErrorMessage({
  title = 'Error',
  message,
  retry,
  retryText = 'Try Again',
  fullPage = false,
  action,
}: ErrorMessageProps) {
  const content = (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center" role="alert" aria-live="assertive">
      <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-4 border border-red-500/30">
        <AlertTriangle size={32} className="text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-sm">{message}</p>
      {(retry || action) && (
        <div className="flex gap-3">
          {retry && (
            <button
              onClick={retry}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all active:scale-95"
              aria-label="Retry loading"
            >
              <RefreshCw size={18} aria-hidden="true" />
              {retryText}
            </button>
          )}
          {action}
        </div>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

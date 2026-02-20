'use client';

import { ThumbsUp } from 'lucide-react';
import Rating from './Rating';
import type { Review } from '@/contexts/ReviewContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ReviewCardProps {
  review: Review;
  onMarkHelpful?: (reviewId: string) => void;
}

export default function ReviewCard({ review, onMarkHelpful }: ReviewCardProps) {
  const { language } = useLanguage();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (language === 'ko') {
      if (days === 0) return '오늘';
      if (days === 1) return '어제';
      if (days < 7) return `${days}일 전`;
      if (days < 30) return `${Math.floor(days / 7)}주 전`;
      if (days < 365) return `${Math.floor(days / 30)}개월 전`;
      return `${Math.floor(days / 365)}년 전`;
    } else {
      if (days === 0) return 'Hôm nay';
      if (days === 1) return 'Hôm qua';
      if (days < 7) return `${days} ngày trước`;
      if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
      if (days < 365) return `${Math.floor(days / 30)} tháng trước`;
      return `${Math.floor(days / 365)} năm trước`;
    }
  };

  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.reviewerAvatar}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-white">{review.reviewerName}</h4>
            <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          <div className="mb-2">
            <Rating rating={review.rating} size={14} />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3 leading-relaxed">{review.comment}</p>

      <div className="flex items-center gap-4 pt-3 border-t border-dark-500">
        <button
          onClick={() => onMarkHelpful && onMarkHelpful(review.id)}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors"
        >
          <ThumbsUp size={14} />
          <span>{language === 'ko' ? `도움됨 (${review.helpful})` : `Hữu ích (${review.helpful})`}</span>
        </button>
      </div>
    </div>
  );
}

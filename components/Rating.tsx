'use client';

import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
}

export default function Rating({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onChange,
  showValue = false,
}: RatingProps) {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const filled = i <= Math.round(rating);
    stars.push(
      <button
        key={i}
        onClick={() => interactive && onChange && onChange(i)}
        disabled={!interactive}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
      >
        <Star
          size={size}
          className={`${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {showValue && (
        <span className="text-sm font-bold text-white ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

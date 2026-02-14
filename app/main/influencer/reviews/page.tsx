'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, ThumbsUp, Award, Calendar, MessageCircle, Lightbulb, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockReviews, type RatingBreakdown, type MockReview } from '@/lib/mockData';

// Calculate average for each category
const calculateCategoryAverages = (reviews: MockReview[]) => {
  const totals = reviews.reduce(
    (acc, review) => ({
      professionalism: acc.professionalism + review.ratings.professionalism,
      punctuality: acc.punctuality + review.ratings.punctuality,
      communication: acc.communication + review.ratings.communication,
      creativity: acc.creativity + review.ratings.creativity,
      performance: acc.performance + review.ratings.performance,
    }),
    { professionalism: 0, punctuality: 0, communication: 0, creativity: 0, performance: 0 }
  );

  const count = reviews.length;
  return {
    professionalism: totals.professionalism / count,
    punctuality: totals.punctuality / count,
    communication: totals.communication / count,
    creativity: totals.creativity / count,
    performance: totals.performance / count,
  };
};

// Calculate overall average
const calculateOverallAverage = (ratings: RatingBreakdown) => {
  return (
    (ratings.professionalism +
      ratings.punctuality +
      ratings.communication +
      ratings.creativity +
      ratings.performance) /
    5
  );
};

export default function ReviewsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  // Get translated mock reviews based on current language
  const mockReviews = getMockReviews(language);
  const categoryAverages = calculateCategoryAverages(mockReviews);
  const overallAverage = calculateOverallAverage(categoryAverages);

  const ratingCategories = [
    { key: 'professionalism', label: t.review.professionalism || '전문성', icon: Award, color: 'text-primary' },
    { key: 'punctuality', label: t.review.punctuality || '일정 준수', icon: Calendar, color: 'text-success' },
    { key: 'communication', label: t.review.communication || '소통', icon: MessageCircle, color: 'text-info' },
    { key: 'creativity', label: t.review.creativity || '창의성', icon: Lightbulb, color: 'text-warning' },
    { key: 'performance', label: t.review.performance || '성과', icon: TrendingUp, color: 'text-secondary' },
  ];

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.review.title}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Overall Rating Summary */}
        <div className="card">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">{overallAverage.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= overallAverage ? 'fill-warning text-warning' : 'text-gray-600'}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">{t.review.overallRating || '종합 평점'} - {mockReviews.length}{t.review.reviewsCount || '개의 리뷰'}</p>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">{t.review.categoryRatings || '평가 항목별 점수'}</h3>
          <div className="space-y-4">
            {ratingCategories.map((category) => {
              const Icon = category.icon;
              const rating = categoryAverages[category.key as keyof RatingBreakdown];
              return (
                <div key={category.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={category.color} />
                      <span className="text-sm text-white">{category.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
                      <Star size={14} className="fill-warning text-warning" />
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-warning to-warning/80 rounded-full transition-all"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.review.allReviews || '전체 리뷰'} ({mockReviews.length})</h3>

          {mockReviews.map((review) => {
            const avgRating = calculateOverallAverage(review.ratings);
            return (
              <div key={review.id} className="card">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.advertiserAvatar}
                    alt={review.advertiser}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{review.advertiser}</h4>
                    <p className="text-xs text-gray-400">{review.campaignTitle}</p>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>

                {/* Overall stars for this review */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= avgRating ? 'fill-warning text-warning' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{avgRating.toFixed(1)}</span>
                </div>

                {/* Detailed ratings */}
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {ratingCategories.map((category) => {
                    const Icon = category.icon;
                    const rating = review.ratings[category.key as keyof RatingBreakdown];
                    return (
                      <div key={category.key} className="text-center">
                        <Icon size={14} className={`${category.color} mx-auto mb-1`} />
                        <div className="text-xs font-bold text-white">{rating}</div>
                        <div className="text-xs text-gray-500 truncate">{category.label}</div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-3">{review.comment}</p>

                <div className="flex items-center gap-2 pt-3 border-t border-dark-500">
                  <button className="text-xs text-gray-400 hover:text-primary flex items-center gap-1 transition-colors">
                    <ThumbsUp size={14} />
                    {t.review.helpful || '도움됨'} ({review.helpful})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

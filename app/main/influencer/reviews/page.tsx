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
    { key: 'professionalism', label: t.review.professionalism, icon: Award, color: 'text-primary', gradientFrom: 'from-primary/15', gradientBorder: 'border-primary/20' },
    { key: 'punctuality', label: t.review.punctuality, icon: Calendar, color: 'text-success', gradientFrom: 'from-success/15', gradientBorder: 'border-success/20' },
    { key: 'communication', label: t.review.communication, icon: MessageCircle, color: 'text-secondary', gradientFrom: 'from-secondary/15', gradientBorder: 'border-secondary/20' },
    { key: 'creativity', label: t.review.creativity, icon: Lightbulb, color: 'text-accent', gradientFrom: 'from-accent/15', gradientBorder: 'border-accent/20' },
    { key: 'performance', label: t.review.performance, icon: TrendingUp, color: 'text-info', gradientFrom: 'from-info/15', gradientBorder: 'border-info/20' },
  ];

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700/90 backdrop-blur-sm border-b border-dark-500/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.review.title}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Overall Rating Summary */}
        <div className="bg-gradient-to-br from-accent/15 to-dark-700 border border-accent/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">{overallAverage.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  className={star <= overallAverage ? 'text-accent fill-accent' : 'text-gray-600'}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">{t.review.overallRating} - {mockReviews.length}{t.review.reviewsCount}</p>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-base font-semibold text-white">{t.review.categoryRatings}</h3>
          </div>
          <div className="space-y-4">
            {ratingCategories.map((category) => {
              const Icon = category.icon;
              const rating = categoryAverages[category.key as keyof RatingBreakdown];
              return (
                <div key={category.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={category.color} />
                      <span className="text-sm text-gray-300">{category.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
                      <Star size={14} className="fill-accent text-accent" />
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-base font-semibold text-white">{t.review.allReviews} ({mockReviews.length})</h3>
          </div>

          {mockReviews.map((review) => {
            const avgRating = calculateOverallAverage(review.ratings);
            return (
              <div key={review.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.advertiserAvatar}
                    alt={review.advertiser}
                    className="w-10 h-10 rounded-full border border-dark-400/40"
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
                        className={star <= avgRating ? 'fill-accent text-accent' : 'text-gray-600'}
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
                      <div key={category.key} className={`text-center bg-gradient-to-br ${category.gradientFrom} to-dark-700 border ${category.gradientBorder} rounded-xl p-2`}>
                        <Icon size={14} className={`${category.color} mx-auto mb-1`} />
                        <div className="text-xs font-bold text-white">{rating}</div>
                        <div className="text-[10px] text-gray-500 truncate">{category.label}</div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-3">{review.comment}</p>

                <div className="flex items-center gap-2 pt-3 border-t border-dark-500/50">
                  <button className="text-xs text-gray-400 hover:text-primary flex items-center gap-1 transition-colors">
                    <ThumbsUp size={14} />
                    {t.review.helpful} ({review.helpful})
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

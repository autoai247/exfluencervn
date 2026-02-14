'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Review {
  id: string;
  campaignId: string;
  campaignTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerType: 'advertiser' | 'influencer';
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  helpful: number;
  responses?: {
    id: string;
    from: string;
    message: string;
    createdAt: Date;
  }[];
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'responses'>) => void;
  getReviewsByCampaign: (campaignId: string) => Review[];
  getReviewsByUser: (userId: string) => Review[];
  getReviewStats: (userId?: string, campaignId?: string) => ReviewStats;
  markHelpful: (reviewId: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Mock data
const initialReviews: Review[] = [
  {
    id: '1',
    campaignId: '1',
    campaignTitle: '신규 스킨케어 제품 리뷰',
    reviewerId: 'advertiser1',
    reviewerName: 'Beauty Brand Vietnam',
    reviewerAvatar: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
    reviewerType: 'advertiser',
    rating: 5,
    comment: '매우 만족스러운 협업이었습니다! 콘텐츠 퀄리티가 높고, 제품 소개가 자연스러웠습니다. 다음 캠페인에서도 함께 하고 싶습니다.',
    createdAt: new Date('2024-02-11T10:00:00'),
    helpful: 12,
  },
  {
    id: '2',
    campaignId: '2',
    campaignTitle: '베트남 레스토랑 체험',
    reviewerId: 'advertiser2',
    reviewerName: 'Pho House Vietnam',
    reviewerAvatar: 'https://ui-avatars.com/api/?name=Pho+House&background=4ECDC4&color=fff',
    reviewerType: 'advertiser',
    rating: 4,
    comment: '음식 촬영 각도가 훌륭했습니다. 다만 납품 일정이 조금 늦었던 점이 아쉬웠습니다.',
    createdAt: new Date('2024-02-09T14:30:00'),
    helpful: 8,
  },
  {
    id: '3',
    campaignId: '3',
    campaignTitle: '스마트폰 언박싱 영상',
    reviewerId: 'advertiser3',
    reviewerName: 'TechGear Vietnam',
    reviewerAvatar: 'https://ui-avatars.com/api/?name=TechGear&background=6C5CE7&color=fff',
    reviewerType: 'advertiser',
    rating: 5,
    comment: '제품 특징을 잘 이해하고 자연스럽게 소개해주셨습니다. 참여율도 기대 이상이었습니다!',
    createdAt: new Date('2024-02-12T16:00:00'),
    helpful: 15,
  },
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'responses'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
      helpful: 0,
      responses: [],
    };
    setReviews([newReview, ...reviews]);
  };

  const getReviewsByCampaign = (campaignId: string) => {
    return reviews.filter((r) => r.campaignId === campaignId);
  };

  const getReviewsByUser = (userId: string) => {
    return reviews.filter((r) => r.reviewerId === userId);
  };

  const getReviewStats = (userId?: string, campaignId?: string): ReviewStats => {
    let filteredReviews = reviews;

    if (userId) {
      filteredReviews = filteredReviews.filter((r) => r.reviewerId === userId);
    }

    if (campaignId) {
      filteredReviews = filteredReviews.filter((r) => r.campaignId === campaignId);
    }

    const totalReviews = filteredReviews.length;
    const averageRating = totalReviews > 0
      ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingBreakdown = {
      5: filteredReviews.filter((r) => r.rating === 5).length,
      4: filteredReviews.filter((r) => r.rating === 4).length,
      3: filteredReviews.filter((r) => r.rating === 3).length,
      2: filteredReviews.filter((r) => r.rating === 2).length,
      1: filteredReviews.filter((r) => r.rating === 1).length,
    };

    return {
      averageRating,
      totalReviews,
      ratingBreakdown,
    };
  };

  const markHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getReviewsByCampaign,
        getReviewsByUser,
        getReviewStats,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
}

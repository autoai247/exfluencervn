'use client';

import { useState, useEffect, useCallback } from 'react';

interface OnboardingState {
  completed: string[];
  skipped: string[];
  currentTour: string | null;
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    completed: [],
    skipped: [],
    currentTour: null,
  });

  // Load onboarding state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        try {
          setState(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load onboarding state:', error);
        }
      }
    }
  }, []);

  // Save state to localStorage
  const saveState = useCallback((newState: OnboardingState) => {
    setState(newState);
    localStorage.setItem('onboarding_state', JSON.stringify(newState));
  }, []);

  // Check if tour should be shown
  const shouldShowTour = useCallback((tourId: string): boolean => {
    return !state.completed.includes(tourId) && !state.skipped.includes(tourId);
  }, [state]);

  // Start a tour
  const startTour = useCallback((tourId: string) => {
    saveState({ ...state, currentTour: tourId });
  }, [state, saveState]);

  // Complete a tour
  const completeTour = useCallback((tourId: string) => {
    const newState = {
      ...state,
      completed: [...state.completed, tourId],
      currentTour: null,
    };
    saveState(newState);
  }, [state, saveState]);

  // Skip a tour
  const skipTour = useCallback((tourId: string) => {
    const newState = {
      ...state,
      skipped: [...state.skipped, tourId],
      currentTour: null,
    };
    saveState(newState);
  }, [state, saveState]);

  // Reset a specific tour
  const resetTour = useCallback((tourId: string) => {
    const newState = {
      ...state,
      completed: state.completed.filter(id => id !== tourId),
      skipped: state.skipped.filter(id => id !== tourId),
      currentTour: null,
    };
    saveState(newState);
  }, [state, saveState]);

  // Reset all tours
  const resetAllTours = useCallback(() => {
    saveState({
      completed: [],
      skipped: [],
      currentTour: null,
    });
  }, [saveState]);

  return {
    state,
    shouldShowTour,
    startTour,
    completeTour,
    skipTour,
    resetTour,
    resetAllTours,
  };
}

// Predefined tours for different pages
export const TOURS = {
  influencerCampaigns: {
    id: 'influencer-campaigns',
    steps: [
      {
        title: '환영합니다! 👋',
        description: '캠페인 페이지에 오신 것을 환영합니다. 여기서 다양한 브랜드 협업 기회를 찾을 수 있습니다.',
      },
      {
        title: '🎯 추천 캠페인',
        description: '당신의 프로필에 가장 적합한 캠페인을 자동으로 추천해드립니다.',
        target: '.recommended-campaigns',
        position: 'bottom' as const,
      },
      {
        title: '🔍 검색 & 필터',
        description: '원하는 캠페인을 쉽게 찾을 수 있도록 검색과 필터 기능을 제공합니다.',
        target: 'input[type="text"]',
        position: 'bottom' as const,
      },
      {
        title: '✅ 자격 확인',
        description: '각 캠페인에 지원 가능한지 자동으로 확인해드립니다.',
        target: '.campaign-card:first-child',
        position: 'right' as const,
      },
      {
        title: '💡 빠른 지원',
        description: '마음에 드는 캠페인을 클릭하면 상세 정보를 확인하고 바로 지원할 수 있습니다.',
      },
    ],
  },
  advertiserCreateCampaign: {
    id: 'advertiser-create-campaign',
    steps: [
      {
        title: '캠페인 만들기 🚀',
        description: '새로운 인플루언서 마케팅 캠페인을 만들어보세요.',
      },
      {
        title: '📝 기본 정보',
        description: '캠페인 제목, 설명, 예산 등 기본 정보를 입력하세요.',
        target: 'input[name="title"]',
        position: 'bottom' as const,
      },
      {
        title: '🎨 플랫폼 선택',
        description: '인스타그램, 틱톡, 유튜브 등 원하는 플랫폼을 선택하세요.',
        target: '.platform-selector',
        position: 'bottom' as const,
      },
      {
        title: '💾 자동 저장',
        description: '작성 중인 내용은 자동으로 저장되니 안심하세요!',
        action: '완료',
      },
    ],
  },
  shop: {
    id: 'shop-tour',
    steps: [
      {
        title: '🛍️ 상점에 오신 것을 환영합니다!',
        description: '여기서 프리미엄 기능과 부스트 아이템을 구매할 수 있습니다.',
      },
      {
        title: '⭐ 프로필 부스트',
        description: '프로필을 상단에 노출시켜 더 많은 기회를 얻으세요.',
        target: '.boost-card:first-child',
        position: 'bottom' as const,
      },
      {
        title: '🎓 교육 과정',
        description: '전문가 과정을 통해 인플루언서로 성장하세요.',
        target: '.course-section',
        position: 'top' as const,
      },
    ],
  },
};

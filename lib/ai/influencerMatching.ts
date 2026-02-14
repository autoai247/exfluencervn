// AI 기반 인플루언서 매칭 알고리즘

export interface Influencer {
  id: string;
  name: string;
  categories: string[];
  followers: number;
  engagement: number;
  rating: number;
  completedCampaigns: number;
  location: string;
  platform: string;
  avgViews: number;
  skinType?: string;
  skinTone?: string;
  hasVehicle?: boolean;
  gender?: string;
  ageRange?: string;
  verified: boolean;
}

export interface Campaign {
  categories: string[];
  minFollowers?: number;
  maxFollowers?: number;
  location?: string;
  budget: number;
  targetAudience?: {
    gender?: string;
    ageRange?: string[];
  };
}

export interface MatchScore {
  influencer: Influencer;
  totalScore: number;
  breakdown: {
    categoryMatch: number;
    followerMatch: number;
    engagementScore: number;
    experienceScore: number;
    ratingScore: number;
    locationMatch: number;
    verifiedBonus: number;
  };
  recommendation: string;
  strengths: string[];
  concerns: string[];
}

/**
 * AI 기반 매칭 스코어 계산
 * 총 100점 만점
 */
export function calculateMatchScore(
  influencer: Influencer,
  campaign: Campaign
): MatchScore {
  const breakdown = {
    categoryMatch: 0,
    followerMatch: 0,
    engagementScore: 0,
    experienceScore: 0,
    ratingScore: 0,
    locationMatch: 0,
    verifiedBonus: 0,
  };

  const strengths: string[] = [];
  const concerns: string[] = [];

  // 1. 카테고리 매칭 (30점)
  const categoryOverlap = influencer.categories.filter(c =>
    campaign.categories.includes(c)
  );

  if (categoryOverlap.length > 0) {
    breakdown.categoryMatch = Math.min(30, categoryOverlap.length * 15);
    strengths.push(`${categoryOverlap.join(', ')} 카테고리 전문가`);
  } else {
    concerns.push('캠페인 카테고리와 일치하지 않음');
  }

  // 2. 팔로워 범위 매칭 (20점)
  if (campaign.minFollowers && campaign.maxFollowers) {
    if (
      influencer.followers >= campaign.minFollowers &&
      influencer.followers <= campaign.maxFollowers
    ) {
      breakdown.followerMatch = 20;
      strengths.push('타겟 팔로워 범위에 완벽 매칭');
    } else if (influencer.followers >= campaign.minFollowers) {
      breakdown.followerMatch = 15;
      strengths.push('타겟 팔로워보다 높은 도달력');
    } else {
      breakdown.followerMatch = 5;
      concerns.push('타겟 팔로워 수보다 낮음');
    }
  } else {
    breakdown.followerMatch = 15;
  }

  // 3. 참여율 점수 (20점)
  if (influencer.engagement >= 5.0) {
    breakdown.engagementScore = 20;
    strengths.push(`매우 높은 참여율 (${influencer.engagement.toFixed(1)}%)`);
  } else if (influencer.engagement >= 4.0) {
    breakdown.engagementScore = 17;
    strengths.push(`높은 참여율 (${influencer.engagement.toFixed(1)}%)`);
  } else if (influencer.engagement >= 3.0) {
    breakdown.engagementScore = 13;
  } else if (influencer.engagement >= 2.0) {
    breakdown.engagementScore = 8;
    concerns.push('평균 이하의 참여율');
  } else {
    breakdown.engagementScore = 3;
    concerns.push('낮은 참여율');
  }

  // 4. 경험 점수 (15점)
  if (influencer.completedCampaigns >= 50) {
    breakdown.experienceScore = 15;
    strengths.push(`풍부한 경험 (${influencer.completedCampaigns}개 완료)`);
  } else if (influencer.completedCampaigns >= 30) {
    breakdown.experienceScore = 12;
    strengths.push('충분한 캠페인 경험');
  } else if (influencer.completedCampaigns >= 10) {
    breakdown.experienceScore = 8;
  } else if (influencer.completedCampaigns >= 5) {
    breakdown.experienceScore = 5;
  } else {
    breakdown.experienceScore = 2;
    concerns.push('캠페인 경험 부족');
  }

  // 5. 평점 점수 (10점)
  breakdown.ratingScore = influencer.rating * 2;
  if (influencer.rating >= 4.8) {
    strengths.push(`최고 평점 (${influencer.rating.toFixed(1)}⭐)`);
  } else if (influencer.rating < 4.0) {
    concerns.push('평점이 다소 낮음');
  }

  // 6. 위치 매칭 (5점)
  if (campaign.location && influencer.location.includes(campaign.location)) {
    breakdown.locationMatch = 5;
    strengths.push('지역 일치');
  } else if (!campaign.location) {
    breakdown.locationMatch = 3;
  }

  // 7. 인증 보너스 (5점)
  if (influencer.verified) {
    breakdown.verifiedBonus = 5;
    strengths.push('✓ 인증된 인플루언서');
  }

  // 총점 계산
  const totalScore = Math.min(
    100,
    Object.values(breakdown).reduce((sum, score) => sum + score, 0)
  );

  // 추천 문구 생성
  let recommendation = '';
  if (totalScore >= 90) {
    recommendation = '🌟 완벽 매칭! 강력 추천';
  } else if (totalScore >= 80) {
    recommendation = '✨ 매우 적합 - 적극 추천';
  } else if (totalScore >= 70) {
    recommendation = '👍 좋은 매칭 - 추천';
  } else if (totalScore >= 60) {
    recommendation = '👌 적합 - 고려해볼만';
  } else if (totalScore >= 50) {
    recommendation = '🤔 보통 - 신중히 검토';
  } else {
    recommendation = '⚠️ 매칭 부족 - 재검토 필요';
  }

  return {
    influencer,
    totalScore,
    breakdown,
    recommendation,
    strengths,
    concerns,
  };
}

/**
 * 인플루언서 목록에 매칭 스코어 적용
 */
export function rankInfluencers(
  influencers: Influencer[],
  campaign: Campaign
): MatchScore[] {
  return influencers
    .map(influencer => calculateMatchScore(influencer, campaign))
    .sort((a, b) => b.totalScore - a.totalScore);
}

/**
 * TOP N 추천
 */
export function getTopRecommendations(
  influencers: Influencer[],
  campaign: Campaign,
  count: number = 10
): MatchScore[] {
  return rankInfluencers(influencers, campaign).slice(0, count);
}

/**
 * 예산 기반 최적 조합 추천
 */
export interface BudgetOptimization {
  option: string;
  totalBudget: number;
  influencers: {
    influencer: Influencer;
    estimatedCost: number;
    expectedViews: number;
  }[];
  totalExpectedViews: number;
  avgMatchScore: number;
  costPerView: number;
  recommendation: string;
}

export function optimizeBudget(
  influencers: Influencer[],
  campaign: Campaign,
  budget: number
): BudgetOptimization[] {
  const rankedInfluencers = rankInfluencers(influencers, campaign);

  // 예상 비용 계산 (팔로워 수 기반 간단한 모델)
  const estimateCost = (influencer: Influencer): number => {
    const baseRate = influencer.followers * 0.1; // 팔로워당 0.1 VND
    const engagementMultiplier = 1 + influencer.engagement / 10;
    return Math.round(baseRate * engagementMultiplier);
  };

  const estimateViews = (influencer: Influencer): number => {
    return Math.round(influencer.followers * (influencer.engagement / 100) * 10);
  };

  // 옵션 1: 대형 KOL 소수 (고품질)
  const option1 = {
    option: '고품질 콘텐츠',
    totalBudget: 0,
    influencers: [] as any[],
    totalExpectedViews: 0,
    avgMatchScore: 0,
    costPerView: 0,
    recommendation: '대형 KOL 위주로 고품질 콘텐츠 제작. 브랜드 이미지 강화에 적합.',
  };

  const largeInfluencers = rankedInfluencers.filter(m => m.influencer.followers >= 100000);
  let remaining1 = budget;

  for (const match of largeInfluencers.slice(0, 3)) {
    const cost = estimateCost(match.influencer);
    if (remaining1 >= cost) {
      const views = estimateViews(match.influencer);
      option1.influencers.push({
        influencer: match.influencer,
        estimatedCost: cost,
        expectedViews: views,
      });
      option1.totalBudget += cost;
      option1.totalExpectedViews += views;
      remaining1 -= cost;
    }
  }

  if (option1.influencers.length > 0) {
    option1.avgMatchScore =
      option1.influencers.reduce((sum, i) => {
        const match = rankedInfluencers.find(m => m.influencer.id === i.influencer.id);
        return sum + (match?.totalScore || 0);
      }, 0) / option1.influencers.length;
    option1.costPerView = option1.totalBudget / option1.totalExpectedViews;
  }

  // 옵션 2: 중소형 KOL 다수 (높은 도달률)
  const option2 = {
    option: '높은 도달률',
    totalBudget: 0,
    influencers: [] as any[],
    totalExpectedViews: 0,
    avgMatchScore: 0,
    costPerView: 0,
    recommendation: '중소형 KOL 다수로 넓은 타겟 도달. 다양한 오디언스 공략에 적합.',
  };

  const mediumInfluencers = rankedInfluencers.filter(
    m => m.influencer.followers >= 10000 && m.influencer.followers < 100000
  );
  let remaining2 = budget;

  for (const match of mediumInfluencers) {
    const cost = estimateCost(match.influencer);
    if (remaining2 >= cost && option2.influencers.length < 10) {
      const views = estimateViews(match.influencer);
      option2.influencers.push({
        influencer: match.influencer,
        estimatedCost: cost,
        expectedViews: views,
      });
      option2.totalBudget += cost;
      option2.totalExpectedViews += views;
      remaining2 -= cost;
    }
  }

  if (option2.influencers.length > 0) {
    option2.avgMatchScore =
      option2.influencers.reduce((sum, i) => {
        const match = rankedInfluencers.find(m => m.influencer.id === i.influencer.id);
        return sum + (match?.totalScore || 0);
      }, 0) / option2.influencers.length;
    option2.costPerView = option2.totalBudget / option2.totalExpectedViews;
  }

  // 옵션 3: 균형잡힌 조합
  const option3 = {
    option: '균형잡힌 조합',
    totalBudget: 0,
    influencers: [] as any[],
    totalExpectedViews: 0,
    avgMatchScore: 0,
    costPerView: 0,
    recommendation: '대/중/소형 KOL을 적절히 조합. 균형잡힌 캠페인에 최적.',
  };

  let remaining3 = budget;
  const mixedInfluencers = rankedInfluencers.slice(0, 15);

  for (const match of mixedInfluencers) {
    const cost = estimateCost(match.influencer);
    if (remaining3 >= cost && option3.influencers.length < 7) {
      const views = estimateViews(match.influencer);
      option3.influencers.push({
        influencer: match.influencer,
        estimatedCost: cost,
        expectedViews: views,
      });
      option3.totalBudget += cost;
      option3.totalExpectedViews += views;
      remaining3 -= cost;
    }
  }

  if (option3.influencers.length > 0) {
    option3.avgMatchScore =
      option3.influencers.reduce((sum, i) => {
        const match = rankedInfluencers.find(m => m.influencer.id === i.influencer.id);
        return sum + (match?.totalScore || 0);
      }, 0) / option3.influencers.length;
    option3.costPerView = option3.totalBudget / option3.totalExpectedViews;
  }

  return [option1, option2, option3].filter(opt => opt.influencers.length > 0);
}

/**
 * 비슷한 캠페인에서 성공한 KOL 찾기
 */
export function findSuccessfulInfluencers(
  influencers: Influencer[],
  campaign: Campaign,
  historicalData?: any
): Influencer[] {
  // 실제로는 과거 캠페인 데이터를 분석
  // 여기서는 높은 평점 + 많은 경험 + 카테고리 매칭으로 필터
  return influencers
    .filter(inf => {
      const categoryMatch = inf.categories.some(c => campaign.categories.includes(c));
      return categoryMatch && inf.rating >= 4.5 && inf.completedCampaigns >= 20;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
}

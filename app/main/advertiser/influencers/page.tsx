'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Send,
  X,
  Sparkles,
  Award,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import AdvancedInfluencerFilter, { type AdvancedFilters } from '@/components/advertiser/AdvancedInfluencerFilter';
import {
  calculateMatchScore,
  rankInfluencers,
  type Influencer,
  type Campaign
} from '@/lib/ai/influencerMatching';

// Mock influencer data - 다중 SNS 플랫폼 지원
const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: '김민지',
    categories: ['beauty', 'lifestyle'],
    platforms: [
      { platform: 'instagram', followers: 85000, engagement: 5.2, avgViews: 18000, username: '@minji_beauty' },
      { platform: 'tiktok', followers: 40000, engagement: 4.1, avgViews: 7000, username: '@minji_official' },
    ],
    followers: 125000, // 총합
    engagement: 4.8, // 평균
    platform: 'instagram', // 주력
    avgViews: 25000,
    rating: 4.9,
    completedCampaigns: 45,
    location: '호치민',
    skinType: 'combination',
    skinTone: 'light',
    hasVehicle: false,
    gender: 'female',
    ageRange: '25-34',
    verified: true,
  },
  {
    id: '2',
    name: '이서연',
    categories: ['fashion', 'beauty'],
    platforms: [
      { platform: 'instagram', followers: 52000, engagement: 4.8, avgViews: 12000, username: '@seoyeon_style' },
      { platform: 'tiktok', followers: 46000, engagement: 5.6, avgViews: 23000, username: '@seoyeon_ootd' },
    ],
    followers: 98000,
    engagement: 5.2,
    platform: 'tiktok',
    avgViews: 35000,
    rating: 4.7,
    completedCampaigns: 32,
    location: '하노이',
    skinType: 'dry',
    skinTone: 'medium',
    hasVehicle: true,
    gender: 'female',
    ageRange: '20-24',
    verified: true,
  },
  {
    id: '3',
    name: '박지훈',
    categories: ['tech', 'gaming'],
    platforms: [
      { platform: 'youtube', followers: 98000, engagement: 4.5, avgViews: 35000, username: '@jihoon_tech' },
      { platform: 'instagram', followers: 38000, engagement: 3.8, avgViews: 8000, username: '@jihoon_daily' },
      { platform: 'tiktok', followers: 20000, engagement: 4.2, avgViews: 6000, username: '@jihoon_shorts' },
    ],
    followers: 156000,
    engagement: 4.3,
    platform: 'youtube',
    avgViews: 42000,
    rating: 4.8,
    completedCampaigns: 58,
    location: '호치민',
    skinType: 'oily',
    hasVehicle: true,
    gender: 'male',
    ageRange: '25-34',
    verified: true,
  },
  {
    id: '4',
    name: '최유리',
    categories: ['beauty', 'skincare'],
    platforms: [
      { platform: 'instagram', followers: 145000, engagement: 5.8, avgViews: 42000, username: '@yuri_skincare' },
      { platform: 'youtube', followers: 65000, engagement: 5.1, avgViews: 28000, username: '@유리뷰티' },
    ],
    followers: 210000,
    engagement: 5.5,
    platform: 'instagram',
    avgViews: 55000,
    rating: 4.95,
    completedCampaigns: 72,
    location: '호치민',
    skinType: 'sensitive',
    skinTone: 'light',
    hasVehicle: true,
    gender: 'female',
    ageRange: '25-34',
    verified: true,
  },
  {
    id: '5',
    name: '정민수',
    categories: ['fitness', 'health'],
    platforms: [
      { platform: 'instagram', followers: 62000, engagement: 4.2, avgViews: 14000, username: '@minsu_fitness' },
      { platform: 'youtube', followers: 25000, engagement: 3.1, avgViews: 5500, username: '@민수PT' },
    ],
    followers: 87000,
    engagement: 3.8,
    platform: 'instagram',
    avgViews: 18000,
    rating: 4.6,
    completedCampaigns: 28,
    location: '다낭',
    hasVehicle: true,
    gender: 'male',
    ageRange: '25-34',
    verified: false,
  },
  {
    id: '6',
    name: '황수진',
    categories: ['food', 'travel'],
    platforms: [
      { platform: 'tiktok', followers: 88000, engagement: 4.5, avgViews: 28000, username: '@sujin_foodie' },
      { platform: 'instagram', followers: 54000, engagement: 3.8, avgViews: 12000, username: '@sujin_eats' },
    ],
    followers: 142000,
    engagement: 4.2,
    platform: 'tiktok',
    avgViews: 38000,
    rating: 4.75,
    completedCampaigns: 51,
    location: '호치민',
    hasVehicle: false,
    gender: 'female',
    ageRange: '20-24',
    verified: true,
  },
];

const platformIcons: any = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function InfluencerSearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [selectedMatchScore, setSelectedMatchScore] = useState<any>(null);
  const [inviteMessage, setInviteMessage] = useState('');

  const [filters, setFilters] = useState<AdvancedFilters>({
    categories: [],
    minFollowers: '',
    maxFollowers: '',
    location: '',
    minEngagement: '',
    maxEngagement: '',
    platform: 'all',
    gender: 'all',
    ageRange: [],
    verified: false,
    skinType: [],
    skinTone: [],
    hasVehicle: null,
    minRating: '',
    minCompletedCampaigns: '',
    minAvgViews: '',
    maxAvgViews: '',
  });

  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'rating' | 'matchingScore'>('matchingScore');

  // Create campaign object from filters for AI matching
  const campaign: Campaign = {
    categories: filters.categories,
    minFollowers: filters.minFollowers ? parseInt(filters.minFollowers) : undefined,
    maxFollowers: filters.maxFollowers ? parseInt(filters.maxFollowers) : undefined,
    location: filters.location || undefined,
    budget: 10000000, // Default budget for matching
    targetAudience: {
      gender: filters.gender !== 'all' ? filters.gender : undefined,
      ageRange: filters.ageRange.length > 0 ? filters.ageRange : undefined,
    },
  };

  // Apply advanced filters
  const advancedFilteredInfluencers = mockInfluencers.filter((influencer) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!influencer.name.toLowerCase().includes(query) &&
          !influencer.categories.some(c => c.toLowerCase().includes(query))) {
        return false;
      }
    }

    // Platform filter
    if (filters.platform !== 'all' && influencer.platform !== filters.platform) {
      return false;
    }

    // Engagement filter
    if (filters.minEngagement && influencer.engagement < parseFloat(filters.minEngagement)) {
      return false;
    }
    if (filters.maxEngagement && influencer.engagement > parseFloat(filters.maxEngagement)) {
      return false;
    }

    // Gender filter
    if (filters.gender !== 'all' && influencer.gender !== filters.gender) {
      return false;
    }

    // Age range filter
    if (filters.ageRange.length > 0 && influencer.ageRange && !filters.ageRange.includes(influencer.ageRange)) {
      return false;
    }

    // Verified filter
    if (filters.verified && !influencer.verified) {
      return false;
    }

    // Beauty-specific filters
    if (filters.skinType.length > 0 && influencer.skinType && !filters.skinType.includes(influencer.skinType)) {
      return false;
    }
    if (filters.skinTone.length > 0 && influencer.skinTone && !filters.skinTone.includes(influencer.skinTone)) {
      return false;
    }
    if (filters.hasVehicle !== null && influencer.hasVehicle !== filters.hasVehicle) {
      return false;
    }

    // Performance filters
    if (filters.minRating && influencer.rating < parseFloat(filters.minRating)) {
      return false;
    }
    if (filters.minCompletedCampaigns && influencer.completedCampaigns < parseInt(filters.minCompletedCampaigns)) {
      return false;
    }
    if (filters.minAvgViews && influencer.avgViews < parseInt(filters.minAvgViews)) {
      return false;
    }
    if (filters.maxAvgViews && influencer.avgViews > parseInt(filters.maxAvgViews)) {
      return false;
    }

    return true;
  });

  // Apply AI matching and sorting
  const matchedInfluencers = advancedFilteredInfluencers.map(influencer =>
    calculateMatchScore(influencer, campaign)
  );

  const sortedInfluencers = [...matchedInfluencers].sort((a, b) => {
    if (sortBy === 'followers') return b.influencer.followers - a.influencer.followers;
    if (sortBy === 'engagement') return b.influencer.engagement - a.influencer.engagement;
    if (sortBy === 'rating') return b.influencer.rating - a.influencer.rating;
    if (sortBy === 'matchingScore') return b.totalScore - a.totalScore;
    return 0;
  });

  const handleInvite = (matchScore: any) => {
    setSelectedInfluencer(matchScore.influencer);
    setSelectedMatchScore(matchScore);
    setInviteMessage(`안녕하세요 ${matchScore.influencer.name}님,\n\n저희 브랜드 캠페인에 참여하실 의향이 있으신지 문의드립니다.\n\n매칭 점수: ${matchScore.totalScore}점\n강점: ${matchScore.strengths.join(', ')}`);
    setShowInviteModal(true);
  };

  const handleSendInvite = () => {
    alert(`${selectedInfluencer?.name}님에게 초대가 발송되었습니다!`);
    setShowInviteModal(false);
    setSelectedInfluencer(null);
    setSelectedMatchScore(null);
  };

  const handleCardClick = (influencerId: string) => {
    router.push(`/main/advertiser/influencers/${influencerId}`);
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.minFollowers ? 1 : 0) +
    (filters.maxFollowers ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.minEngagement ? 1 : 0) +
    (filters.maxEngagement ? 1 : 0) +
    (filters.platform !== 'all' ? 1 : 0) +
    (filters.gender !== 'all' ? 1 : 0) +
    filters.ageRange.length +
    (filters.verified ? 1 : 0) +
    filters.skinType.length +
    filters.skinTone.length +
    (filters.hasVehicle !== null ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.minCompletedCampaigns ? 1 : 0) +
    (filters.minAvgViews ? 1 : 0) +
    (filters.maxAvgViews ? 1 : 0);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">인플루언서 검색</h1>
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="이름, 카테고리로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-900 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="sticky top-[94px] z-10 bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            showFilters || activeFilterCount > 0
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter size={16} />
          필터
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-white text-gray-900 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:border-gray-900"
        >
          <option value="matchingScore">매칭률 높은 순</option>
          <option value="followers">팔로워 많은 순</option>
          <option value="engagement">참여율 높은 순</option>
          <option value="rating">평점 높은 순</option>
        </select>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <AdvancedInfluencerFilter
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
          resultCount={sortedInfluencers.length}
        />
      )}

      {/* Results Count */}
      <div className="px-4 py-3 flex items-center justify-between bg-white">
        <p className="text-sm text-gray-500 font-medium">
          총 {sortedInfluencers.length}명
        </p>
        {sortedInfluencers.length > 0 && sortBy === 'matchingScore' && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Sparkles size={14} />
            <span className="font-medium">AI 매칭</span>
          </div>
        )}
      </div>

      {/* Influencer Grid */}
      <div className="px-4 space-y-4 pb-6">
        {sortedInfluencers.map((matchScore) => {
          const influencer = matchScore.influencer;
          const PlatformIcon = platformIcons[influencer.platform];

          return (
            <div
              key={influencer.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={(e) => {
                // Only navigate if not clicking on buttons
                if (!(e.target as HTMLElement).closest('button')) {
                  handleCardClick(influencer.id);
                }
              }}
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Profile Image */}
                    <div className="relative">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.name)}&background=random&color=fff&size=80`}
                        alt={influencer.name}
                        className="w-14 h-14 rounded-full border border-gray-200"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200">
                        <PlatformIcon className="w-3.5 h-3.5 text-gray-700" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-gray-900 font-semibold text-base truncate">
                          {influencer.name}
                        </h3>
                        {influencer.verified && (
                          <CheckCircle size={16} className="text-gray-900 flex-shrink-0" />
                        )}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {influencer.categories.map(cat => (
                          <span
                            key={cat}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} />
                        {influencer.location}
                      </div>
                    </div>
                  </div>

                  {/* AI Match Score Badge */}
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ${
                    matchScore.totalScore >= 90 ? 'bg-gray-900 text-white' :
                    matchScore.totalScore >= 80 ? 'bg-gray-800 text-white' :
                    matchScore.totalScore >= 70 ? 'bg-gray-700 text-white' :
                    matchScore.totalScore >= 60 ? 'bg-gray-600 text-white' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {matchScore.totalScore}점
                  </div>
                </div>

                {/* Multi-Platform Display */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 font-medium mb-2">SNS 채널 ({influencer.platforms.length}개)</p>
                  <div className="space-y-2">
                    {influencer.platforms.map((platData) => {
                      const Icon = platformIcons[platData.platform];
                      return (
                        <div key={platData.platform} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-700" />
                            <span className="text-gray-700 font-medium capitalize">{platData.platform}</span>
                            <span className="text-gray-500">{platData.username}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-semibold">
                              {(platData.followers / 1000).toFixed(1)}K
                            </span>
                            <span className="text-gray-600">{platData.engagement}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">총 팔로워</span>
                    <span className="text-gray-900 font-bold">{(influencer.followers / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">평균 조회수</p>
                    <p className="text-gray-900 font-semibold text-sm">
                      {(influencer.avgViews / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="text-center py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">평점</p>
                    <p className="text-gray-900 font-semibold text-sm flex items-center justify-center gap-1">
                      <Star size={12} className="text-gray-900 fill-gray-900" />
                      {influencer.rating}
                    </p>
                  </div>
                  <div className="text-center py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">완료</p>
                    <p className="text-gray-900 font-semibold text-sm">
                      {influencer.completedCampaigns}
                    </p>
                  </div>
                </div>

                {/* AI Strengths */}
                {matchScore.strengths.length > 0 && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award size={14} className="text-gray-700" />
                      <p className="text-xs font-semibold text-gray-900">강점</p>
                    </div>
                    <div className="space-y-1">
                      {matchScore.strengths.slice(0, 3).map((strength: string, idx: number) => (
                        <p key={idx} className="text-xs text-gray-600">
                          • {strength}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Concerns */}
                {matchScore.concerns.length > 0 && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertCircle size={14} className="text-gray-700" />
                      <p className="text-xs font-semibold text-gray-900">주의사항</p>
                    </div>
                    <div className="space-y-1">
                      {matchScore.concerns.slice(0, 2).map((concern: string, idx: number) => (
                        <p key={idx} className="text-xs text-gray-600">
                          • {concern}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Score Breakdown */}
                <details className="mb-3 group">
                  <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 flex items-center gap-1 font-medium">
                    상세 매칭 분석 보기
                    <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">카테고리 매칭</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.categoryMatch}/30</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">팔로워 범위</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.followerMatch}/20</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">참여율</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.engagementScore}/20</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">경험</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.experienceScore}/15</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">평점</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.ratingScore}/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">위치</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.locationMatch}/5</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">인증 보너스</span>
                      <span className="text-gray-900 font-semibold">{matchScore.breakdown.verifiedBonus}/5</span>
                    </div>
                  </div>
                </details>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(influencer.id);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    프로필 보기
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInvite(matchScore);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    초대하기
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {sortedInfluencers.length === 0 && (
          <div className="text-center py-16">
            <Users size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-900 font-semibold mb-1">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-500">다른 필터 조건으로 시도해보세요</p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && selectedInfluencer && selectedMatchScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">캠페인 초대</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Influencer Card */}
            <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedInfluencer.name)}&background=random&color=fff&size=80`}
                  alt={selectedInfluencer.name}
                  className="w-12 h-12 rounded-full border border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 font-bold">{selectedInfluencer.name}</p>
                    {selectedInfluencer.verified && <CheckCircle size={14} className="text-gray-900" />}
                  </div>
                  <p className="text-xs text-gray-600">{selectedInfluencer.followers.toLocaleString()} 팔로워</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedMatchScore.totalScore >= 90 ? 'bg-gray-900 text-white' :
                  selectedMatchScore.totalScore >= 80 ? 'bg-gray-800 text-white' :
                  'bg-gray-700 text-white'
                }`}>
                  {selectedMatchScore.totalScore}점
                </div>
              </div>

              {/* Match Highlights */}
              <div className="space-y-2">
                {selectedMatchScore.strengths.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-gray-900 mb-1.5">강점</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedMatchScore.strengths.slice(0, 3).map((strength: string, idx: number) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedMatchScore.concerns.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-gray-900 mb-1.5">주의사항</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedMatchScore.concerns.map((concern: string, idx: number) => (
                        <li key={idx}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label className="text-sm text-gray-900 mb-2 block font-semibold">초대 메시지</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-gray-900 text-gray-900 bg-gray-50"
                placeholder="인플루언서에게 보낼 메시지를 작성하세요..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSendInvite}
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                초대 발송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

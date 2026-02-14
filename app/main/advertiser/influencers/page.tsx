'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  Users,
  TrendingUp,
  MapPin,
  Star,
  CheckCircle,
  Send,
  X,
  Trophy,
  Sparkles,
  Award,
  AlertCircle,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import AdvancedInfluencerFilter, { type AdvancedFilters } from '@/components/advertiser/AdvancedInfluencerFilter';
import {
  calculateMatchScore,
  rankInfluencers,
  type Influencer,
  type Campaign
} from '@/lib/ai/influencerMatching';

// Mock influencer data - Updated to match Influencer interface
const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: '김민지',
    categories: ['beauty', 'lifestyle'],
    followers: 125000,
    engagement: 4.8,
    rating: 4.9,
    completedCampaigns: 45,
    location: '호치민',
    platform: 'instagram',
    avgViews: 25000,
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
    followers: 98000,
    engagement: 5.2,
    rating: 4.7,
    completedCampaigns: 32,
    location: '하노이',
    platform: 'tiktok',
    avgViews: 35000,
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
    followers: 156000,
    engagement: 4.3,
    rating: 4.8,
    completedCampaigns: 58,
    location: '호치민',
    platform: 'youtube',
    avgViews: 42000,
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
    followers: 210000,
    engagement: 5.5,
    rating: 4.95,
    completedCampaigns: 72,
    location: '호치민',
    platform: 'instagram',
    avgViews: 55000,
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
    followers: 87000,
    engagement: 3.8,
    rating: 4.6,
    completedCampaigns: 28,
    location: '다낭',
    platform: 'instagram',
    avgViews: 18000,
    hasVehicle: true,
    gender: 'male',
    ageRange: '25-34',
    verified: false,
  },
  {
    id: '6',
    name: '황수진',
    categories: ['food', 'travel'],
    followers: 142000,
    engagement: 4.2,
    rating: 4.75,
    completedCampaigns: 51,
    location: '호치민',
    platform: 'tiktok',
    avgViews: 38000,
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
    <div className="min-h-screen bg-dark-700 pb-20">
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-white">인플루언서 검색</h1>
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="이름, 카테고리로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="sticky top-[118px] z-10 bg-dark-700 border-b border-dark-500 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm ${
            showFilters || activeFilterCount > 0 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'
          }`}
        >
          <Filter size={16} />
          필터
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-white text-primary rounded-full text-xs">{activeFilterCount}</span>
          )}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="flex-1 px-4 py-2 bg-dark-600 text-white rounded-lg text-sm"
        >
          <option value="followers">팔로워 많은 순</option>
          <option value="engagement">참여율 높은 순</option>
          <option value="rating">평점 높은 순</option>
          <option value="matchingScore">매칭률 높은 순</option>
        </select>
      </div>

      {showFilters && (
        <AdvancedInfluencerFilter
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
          resultCount={sortedInfluencers.length}
        />
      )}

      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          총 {sortedInfluencers.length}명의 인플루언서
        </p>
        {sortedInfluencers.length > 0 && sortBy === 'matchingScore' && (
          <div className="flex items-center gap-1 text-xs text-mint">
            <Sparkles size={14} />
            AI 매칭 활성화
          </div>
        )}
      </div>

      <div className="container-mobile space-y-3 px-4 pb-6">
        {sortedInfluencers.map((matchScore) => {
          const influencer = matchScore.influencer;
          const PlatformIcon = platformIcons[influencer.platform];

          return (
            <div key={influencer.id} className="card-glass relative overflow-hidden">
              {/* AI Matching Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-xl ${
                  matchScore.totalScore >= 90 ? 'bg-success/90 text-white shadow-lg shadow-success/20' :
                  matchScore.totalScore >= 80 ? 'bg-mint/90 text-dark shadow-lg shadow-mint/20' :
                  matchScore.totalScore >= 70 ? 'bg-primary/90 text-white shadow-lg shadow-primary/20' :
                  matchScore.totalScore >= 60 ? 'bg-warning/90 text-white shadow-lg shadow-warning/20' :
                  'bg-dark-500/90 text-gray-300'
                }`}>
                  <Sparkles size={12} />
                  {matchScore.totalScore}점
                </div>
              </div>

              {/* Recommendation Badge */}
              {matchScore.totalScore >= 80 && (
                <div className="absolute top-14 right-3 z-10">
                  <div className="px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-primary text-white shadow-lg animate-pulse-glow">
                    {matchScore.recommendation}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.name)}&background=FF6B6B&color=fff`}
                    alt={influencer.name}
                    className="w-16 h-16 rounded-full border-2 border-mint shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-dark-600 rounded-full p-1">
                    <PlatformIcon className="w-4 h-4 text-mint" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{influencer.name}</h3>
                    {influencer.verified && (
                      <CheckCircle size={16} className="text-mint" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {influencer.categories.map(cat => (
                      <span key={cat} className="badge-accent text-[10px] px-2 py-0.5">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={12} />
                    {influencer.location}
                  </div>
                </div>
              </div>

              {/* AI Strengths */}
              {matchScore.strengths.length > 0 && (
                <div className="mb-3 p-2 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <Award size={12} className="text-success" />
                    <p className="text-xs font-bold text-success">강점</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchScore.strengths.slice(0, 3).map((strength, idx) => (
                      <span key={idx} className="text-[10px] text-gray-300">
                        • {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Concerns */}
              {matchScore.concerns.length > 0 && (
                <div className="mb-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <AlertCircle size={12} className="text-warning" />
                    <p className="text-xs font-bold text-warning">주의사항</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchScore.concerns.slice(0, 2).map((concern, idx) => (
                      <span key={idx} className="text-[10px] text-gray-300">
                        • {concern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="stat-item bg-dark-700/50">
                  <p className="text-xs text-gray-400">팔로워</p>
                  <p className="text-white font-bold text-sm">{(influencer.followers / 1000).toFixed(0)}K</p>
                </div>
                <div className="stat-item bg-dark-700/50">
                  <p className="text-xs text-gray-400">참여율</p>
                  <p className="text-mint font-bold text-sm">{influencer.engagement}%</p>
                </div>
                <div className="stat-item bg-dark-700/50">
                  <p className="text-xs text-gray-400">평점</p>
                  <p className="text-white font-bold text-sm flex items-center justify-center gap-1">
                    <Star size={12} className="text-warning fill-warning" />
                    {influencer.rating}
                  </p>
                </div>
                <div className="stat-item bg-dark-700/50">
                  <p className="text-xs text-gray-400">완료</p>
                  <p className="text-white font-bold text-sm">{influencer.completedCampaigns}</p>
                </div>
              </div>

              {/* AI Score Breakdown */}
              <details className="mb-3">
                <summary className="text-xs text-mint cursor-pointer hover:underline">
                  상세 매칭 분석 보기
                </summary>
                <div className="mt-2 p-3 bg-dark-700/50 rounded-lg space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">카테고리 매칭</span>
                    <span className="text-white font-bold">{matchScore.breakdown.categoryMatch}/30</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">팔로워 범위</span>
                    <span className="text-white font-bold">{matchScore.breakdown.followerMatch}/20</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">참여율</span>
                    <span className="text-white font-bold">{matchScore.breakdown.engagementScore}/20</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">경험</span>
                    <span className="text-white font-bold">{matchScore.breakdown.experienceScore}/15</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">평점</span>
                    <span className="text-white font-bold">{matchScore.breakdown.ratingScore}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">위치</span>
                    <span className="text-white font-bold">{matchScore.breakdown.locationMatch}/5</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">인증 보너스</span>
                    <span className="text-white font-bold">{matchScore.breakdown.verifiedBonus}/5</span>
                  </div>
                </div>
              </details>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-outline text-sm">프로필 보기</button>
                <button
                  onClick={() => handleInvite(matchScore)}
                  className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  초대하기
                </button>
              </div>
            </div>
          );
        })}

        {sortedInfluencers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400 mb-2">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-500">다른 필터 조건으로 시도해보세요</p>
          </div>
        )}
      </div>

      {showInviteModal && selectedInfluencer && selectedMatchScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dark-600 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">캠페인 초대</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            {/* Influencer Card */}
            <div className="mb-4 p-4 bg-dark-700 rounded-xl border border-dark-500">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedInfluencer.name)}&background=FF6B6B&color=fff`}
                  alt={selectedInfluencer.name}
                  className="w-12 h-12 rounded-full border-2 border-mint"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold">{selectedInfluencer.name}</p>
                    {selectedInfluencer.verified && <CheckCircle size={14} className="text-mint" />}
                  </div>
                  <p className="text-xs text-gray-400">{selectedInfluencer.followers.toLocaleString()} 팔로워</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedMatchScore.totalScore >= 90 ? 'bg-success text-white' :
                  selectedMatchScore.totalScore >= 80 ? 'bg-mint text-dark' :
                  'bg-primary text-white'
                }`}>
                  {selectedMatchScore.totalScore}점
                </div>
              </div>

              {/* Match Highlights */}
              <div className="space-y-2">
                {selectedMatchScore.strengths.length > 0 && (
                  <div className="p-2 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-xs font-bold text-success mb-1">✅ 강점</p>
                    <ul className="text-[10px] text-gray-300 space-y-0.5">
                      {selectedMatchScore.strengths.slice(0, 3).map((strength: string, idx: number) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedMatchScore.concerns.length > 0 && (
                  <div className="p-2 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-xs font-bold text-warning mb-1">⚠️ 주의사항</p>
                    <ul className="text-[10px] text-gray-300 space-y-0.5">
                      {selectedMatchScore.concerns.map((concern: string, idx: number) => (
                        <li key={idx}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-2 block font-semibold">초대 메시지</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="input w-full h-32 resize-none"
                placeholder="인플루언서에게 보낼 메시지를 작성하세요..."
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowInviteModal(false)} className="flex-1 btn-ghost">
                취소
              </button>
              <button onClick={handleSendInvite} className="flex-1 btn-primary flex items-center justify-center gap-2">
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

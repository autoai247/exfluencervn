'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
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
import EmptyState from '@/components/common/EmptyState';
import {
  calculateMatchScore,
  type Influencer,
  type Campaign
} from '@/lib/ai/influencerMatching';

// Mock influencer data
const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Nguyễn Thị Lan',
    categories: ['beauty', 'lifestyle'],
    platforms: [
      { platform: 'instagram', followers: 85000, engagement: 5.2, avgViews: 18000, username: '@lan.beauty' },
      { platform: 'tiktok', followers: 40000, engagement: 4.1, avgViews: 7000, username: '@lan_official' },
    ],
    followers: 125000,
    engagement: 4.8,
    platform: 'instagram',
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
    name: 'Trần Hà My',
    categories: ['fashion', 'beauty'],
    platforms: [
      { platform: 'instagram', followers: 52000, engagement: 4.8, avgViews: 12000, username: '@hamy_style' },
      { platform: 'tiktok', followers: 46000, engagement: 5.6, avgViews: 23000, username: '@hamy_ootd' },
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
    name: 'Lê Minh Tuấn',
    categories: ['tech', 'gaming'],
    platforms: [
      { platform: 'youtube', followers: 98000, engagement: 4.5, avgViews: 35000, username: '@tuan_tech' },
      { platform: 'instagram', followers: 38000, engagement: 3.8, avgViews: 8000, username: '@tuan_daily' },
      { platform: 'tiktok', followers: 20000, engagement: 4.2, avgViews: 6000, username: '@tuan_shorts' },
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
    name: 'Phạm Bảo Châu',
    categories: ['beauty', 'skincare'],
    platforms: [
      { platform: 'instagram', followers: 145000, engagement: 5.8, avgViews: 42000, username: '@baochau_skincare' },
      { platform: 'youtube', followers: 65000, engagement: 5.1, avgViews: 28000, username: '@BaoChauBeauty' },
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
    name: 'Võ Đức Hùng',
    categories: ['fitness', 'health'],
    platforms: [
      { platform: 'instagram', followers: 62000, engagement: 4.2, avgViews: 14000, username: '@hung_fitness' },
      { platform: 'youtube', followers: 25000, engagement: 3.1, avgViews: 5500, username: '@HungPT' },
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
    name: 'Đỗ Thị Thu Hương',
    categories: ['food', 'travel'],
    platforms: [
      { platform: 'tiktok', followers: 88000, engagement: 4.5, avgViews: 28000, username: '@huong_foodie' },
      { platform: 'instagram', followers: 54000, engagement: 3.8, avgViews: 12000, username: '@huong_eats' },
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

const platformColors: any = {
  instagram: 'text-pink-400',
  tiktok: 'text-white',
  youtube: 'text-red-400',
};

const getScoreConfig = (score: number) => {
  if (score >= 90) return { bg: 'bg-gradient-to-r from-accent to-yellow-400', text: 'text-dark-800' };
  if (score >= 80) return { bg: 'bg-gradient-to-r from-primary to-secondary', text: 'text-white' };
  if (score >= 70) return { bg: 'bg-gradient-to-r from-secondary to-blue-400', text: 'text-white' };
  if (score >= 60) return { bg: 'bg-dark-500', text: 'text-gray-300' };
  return { bg: 'bg-dark-600', text: 'text-gray-400' };
};

export default function InfluencerSearchPage() {
  const router = useRouter();
  const { language } = useLanguage();
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

  const campaign: Campaign = {
    categories: filters.categories,
    minFollowers: filters.minFollowers ? parseInt(filters.minFollowers) : undefined,
    maxFollowers: filters.maxFollowers ? parseInt(filters.maxFollowers) : undefined,
    location: filters.location || undefined,
    budget: 10000000,
    targetAudience: {
      gender: filters.gender !== 'all' ? filters.gender : undefined,
      ageRange: filters.ageRange.length > 0 ? filters.ageRange : undefined,
    },
  };

  const advancedFilteredInfluencers = mockInfluencers.filter((influencer) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!influencer.name.toLowerCase().includes(query) &&
          !influencer.categories.some(c => c.toLowerCase().includes(query))) {
        return false;
      }
    }
    if (filters.platform !== 'all' && influencer.platform !== filters.platform) return false;
    if (filters.minEngagement && influencer.engagement < parseFloat(filters.minEngagement)) return false;
    if (filters.maxEngagement && influencer.engagement > parseFloat(filters.maxEngagement)) return false;
    if (filters.gender !== 'all' && influencer.gender !== filters.gender) return false;
    if (filters.ageRange.length > 0 && influencer.ageRange && !filters.ageRange.includes(influencer.ageRange)) return false;
    if (filters.verified && !influencer.verified) return false;
    if (filters.skinType.length > 0 && influencer.skinType && !filters.skinType.includes(influencer.skinType)) return false;
    if (filters.skinTone.length > 0 && influencer.skinTone && !filters.skinTone.includes(influencer.skinTone)) return false;
    if (filters.hasVehicle !== null && influencer.hasVehicle !== filters.hasVehicle) return false;
    if (filters.minRating && influencer.rating < parseFloat(filters.minRating)) return false;
    if (filters.minCompletedCampaigns && influencer.completedCampaigns < parseInt(filters.minCompletedCampaigns)) return false;
    if (filters.minAvgViews && influencer.avgViews < parseInt(filters.minAvgViews)) return false;
    if (filters.maxAvgViews && influencer.avgViews > parseInt(filters.maxAvgViews)) return false;
    return true;
  });

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
    setInviteMessage(language === 'ko'
      ? `안녕하세요 ${matchScore.influencer.name}님,\n\n저희 브랜드 캠페인에 참여해 주시길 초대합니다.\n\n적합도 점수: ${matchScore.totalScore}\n강점: ${matchScore.strengths.join(', ')}`
      : `Xin chào ${matchScore.influencer.name},\n\nChúng tôi muốn mời bạn tham gia chiến dịch thương hiệu của chúng tôi.\n\nĐiểm phù hợp: ${matchScore.totalScore}\nĐiểm mạnh: ${matchScore.strengths.join(', ')}`);
    setShowInviteModal(true);
  };

  const handleSendInvite = () => {
    alert(language === 'ko' ? `${selectedInfluencer?.name}님에게 초대장을 보냈습니다!` : `Đã gửi lời mời đến ${selectedInfluencer?.name}!`);
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
      {/* Header */}
      <MobileHeader
        title={language === 'ko' ? 'KOL 찾기' : 'Tìm kiếm KOL'}
        showBack
        showNotification
        onNotification={() => router.push('/main/advertiser/notifications')}
      />

      {/* Search Bar */}
      <div className="sticky top-14 z-20 bg-dark-700/95 backdrop-blur-sm border-b border-dark-500 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={language === 'ko' ? '이름, 카테고리로 검색...' : 'Tìm theo tên, danh mục...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-dark-600/80 text-white rounded-xl border border-dark-400/40 focus:outline-none focus:border-primary/50 placeholder-gray-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="sticky top-[calc(3.5rem+60px)] z-10 bg-dark-700/95 backdrop-blur-sm border-b border-dark-500 px-4 py-2.5 flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
            showFilters || activeFilterCount > 0
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
              : 'bg-dark-600/80 text-gray-400 border border-dark-400/40 hover:border-primary/30'
          }`}
        >
          <Filter size={15} />
          {language === 'ko' ? '필터' : 'Lọc'}
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="flex-1 px-3 py-2 bg-dark-600/80 text-white rounded-xl text-sm font-medium border border-dark-400/40 focus:outline-none focus:border-primary/50"
        >
          <option value="matchingScore">{language === 'ko' ? '적합도 높은 순' : 'Độ phù hợp cao nhất'}</option>
          <option value="followers">{language === 'ko' ? '팔로워 많은 순' : 'Nhiều người theo dõi nhất'}</option>
          <option value="engagement">{language === 'ko' ? '참여율 높은 순' : 'Tỷ lệ tương tác cao nhất'}</option>
          <option value="rating">{language === 'ko' ? '평점 높은 순' : 'Đánh giá cao nhất'}</option>
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
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-400 font-medium">
          {language === 'ko' ? `총 ${sortedInfluencers.length}명의 KOL` : `Tổng ${sortedInfluencers.length} KOL`}
        </p>
        {sortedInfluencers.length > 0 && sortBy === 'matchingScore' && (
          <div className="flex items-center gap-1 text-xs text-primary font-semibold">
            <Sparkles size={13} />
            <span>{language === 'ko' ? 'AI 매칭' : 'Phù hợp AI'}</span>
          </div>
        )}
      </div>

      {/* Influencer Grid */}
      <div className="px-4 space-y-4 pb-6">
        {sortedInfluencers.map((matchScore) => {
          const influencer = matchScore.influencer;
          const PlatformIcon = platformIcons[influencer.platform];
          const scoreConfig = getScoreConfig(matchScore.totalScore);

          return (
            <div
              key={influencer.id}
              className="bg-dark-600/80 backdrop-blur-sm border-2 border-dark-400/40 hover:border-primary/30 rounded-2xl overflow-hidden shadow-xl transition-all cursor-pointer"
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('button')) {
                  router.push(`/main/advertiser/influencers/${influencer.id}`);
                }
              }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.name)}&background=random&color=fff&size=80`}
                        alt={influencer.name}
                        className="w-14 h-14 rounded-2xl border-2 border-dark-400"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-dark-600 rounded-full p-1 border border-dark-400">
                        <PlatformIcon className={`w-3.5 h-3.5 ${platformColors[influencer.platform]}`} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-white font-bold text-base truncate">{influencer.name}</h3>
                        {influencer.verified && (
                          <CheckCircle size={15} className="text-primary flex-shrink-0" />
                        )}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {influencer.categories.map(cat => (
                          <span key={cat} className="text-xs px-2 py-0.5 bg-primary/15 text-primary rounded-full border border-primary/20 font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} />
                        {influencer.location}
                      </div>
                    </div>
                  </div>

                  {/* AI Match Score Badge */}
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 ${scoreConfig.bg} ${scoreConfig.text}`}>
                    {matchScore.totalScore} {language === 'ko' ? '점' : 'điểm'}
                  </div>
                </div>

                {/* Multi-Platform Display */}
                <div className="mb-3 p-3 bg-dark-700/60 rounded-xl border border-dark-400/30">
                  <p className="text-xs text-gray-400 font-medium mb-2">
                    {language === 'ko' ? `SNS 채널 (${influencer.platforms.length})` : `Kênh SNS (${influencer.platforms.length})`}
                  </p>
                  <div className="space-y-1.5">
                    {influencer.platforms.map((platData) => {
                      const Icon = platformIcons[platData.platform];
                      return (
                        <div key={platData.platform} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${platformColors[platData.platform]}`} />
                            <span className="text-gray-300 font-medium capitalize">{platData.platform}</span>
                            <span className="text-gray-500">{platData.username}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-semibold">{(platData.followers / 1000).toFixed(1)}K</span>
                            <span className="text-primary">{platData.engagement}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-dark-400/30 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">{language === 'ko' ? '총 팔로워' : 'Tổng người theo dõi'}</span>
                    <span className="text-white font-bold">{(influencer.followers / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: language === 'ko' ? '평균 조회수' : 'Lượt xem TB', value: `${(influencer.avgViews / 1000).toFixed(0)}K`, color: 'text-secondary' },
                    { label: language === 'ko' ? '평점' : 'Đánh giá', value: influencer.rating.toString(), icon: <Star size={11} className="text-accent fill-accent" />, color: 'text-white' },
                    { label: language === 'ko' ? '완료' : 'Hoàn thành', value: String(influencer.completedCampaigns), color: 'text-success' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center py-2.5 bg-dark-700/50 rounded-xl border border-dark-400/30">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`font-bold text-sm flex items-center justify-center gap-1 ${stat.color}`}>
                        {stat.icon}{stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI Strengths */}
                {matchScore.strengths.length > 0 && (
                  <div className="mb-3 p-3 bg-success/5 rounded-xl border border-success/20">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award size={13} className="text-success" />
                      <p className="text-xs font-bold text-success">{language === 'ko' ? '강점' : 'Điểm mạnh'}</p>
                    </div>
                    <div className="space-y-1">
                      {matchScore.strengths.slice(0, 3).map((strength: string, idx: number) => (
                        <p key={idx} className="text-xs text-gray-300">• {strength}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Concerns */}
                {matchScore.concerns.length > 0 && (
                  <div className="mb-3 p-3 bg-warning/5 rounded-xl border border-warning/20">
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertCircle size={13} className="text-warning" />
                      <p className="text-xs font-bold text-warning">{language === 'ko' ? '유의사항' : 'Lưu ý'}</p>
                    </div>
                    <div className="space-y-1">
                      {matchScore.concerns.slice(0, 2).map((concern: string, idx: number) => (
                        <p key={idx} className="text-xs text-gray-300">• {concern}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Score Breakdown */}
                <details className="mb-3 group">
                  <summary className="text-xs text-gray-400 cursor-pointer hover:text-primary flex items-center gap-1 font-medium transition-colors">
                    {language === 'ko' ? '적합도 상세 분석 보기' : 'Xem phân tích độ phù hợp chi tiết'}
                    <ChevronDown size={13} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 p-3 bg-dark-700/60 rounded-xl border border-dark-400/30 space-y-2">
                    {[
                      { label: language === 'ko' ? '카테고리 적합도' : 'Phù hợp danh mục', value: `${matchScore.breakdown.categoryMatch}/30` },
                      { label: language === 'ko' ? '팔로워 범위' : 'Phạm vi người theo dõi', value: `${matchScore.breakdown.followerMatch}/20` },
                      { label: language === 'ko' ? '참여율' : 'Tỷ lệ tương tác', value: `${matchScore.breakdown.engagementScore}/20` },
                      { label: language === 'ko' ? '경험' : 'Kinh nghiệm', value: `${matchScore.breakdown.experienceScore}/15` },
                      { label: language === 'ko' ? '평점' : 'Đánh giá', value: `${matchScore.breakdown.ratingScore}/10` },
                      { label: language === 'ko' ? '위치' : 'Vị trí', value: `${matchScore.breakdown.locationMatch}/5` },
                      { label: language === 'ko' ? '인증 보너스' : 'Điểm thưởng xác minh', value: `${matchScore.breakdown.verifiedBonus}/5` },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/main/advertiser/influencers/${influencer.id}`);
                    }}
                    className="flex-1 px-4 py-2.5 bg-dark-500/80 text-white rounded-xl font-semibold text-sm hover:bg-dark-400/80 transition-colors border border-dark-400/40"
                  >
                    {language === 'ko' ? '프로필 보기' : 'Xem hồ sơ'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInvite(matchScore);
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    {language === 'ko' ? '초대하기' : 'Mời tham gia'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {sortedInfluencers.length === 0 && (
          <EmptyState
            icon={Users}
            title={language === 'ko' ? '결과 없음' : 'Không tìm thấy kết quả'}
            description={language === 'ko' ? '선택한 필터에 맞는 KOL이 없습니다. 다른 조건으로 검색해 보세요.' : 'Không có KOL nào khớp với bộ lọc đã chọn. Hãy thử với điều kiện khác.'}
            action={{
              label: language === 'ko' ? '필터 초기화' : 'Đặt lại bộ lọc',
              onClick: () => {
                setSearchQuery('');
                setFilters({
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
                setShowFilters(false);
              },
            }}
            dark
          />
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && selectedInfluencer && selectedMatchScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-700 border-2 border-dark-400/60 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '캠페인 초대' : 'Mời tham gia chiến dịch'}</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-white transition-colors w-8 h-8 bg-dark-600 rounded-xl flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Influencer Card */}
            <div className="mb-4 p-4 bg-dark-600/80 rounded-2xl border border-dark-400/40">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedInfluencer.name)}&background=random&color=fff&size=80`}
                  alt={selectedInfluencer.name}
                  className="w-12 h-12 rounded-xl border-2 border-dark-400"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold">{selectedInfluencer.name}</p>
                    {selectedInfluencer.verified && <CheckCircle size={14} className="text-primary" />}
                  </div>
                  <p className="text-xs text-gray-400">{selectedInfluencer.followers.toLocaleString()} {language === 'ko' ? '팔로워' : 'người theo dõi'}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${getScoreConfig(selectedMatchScore.totalScore).bg} ${getScoreConfig(selectedMatchScore.totalScore).text}`}>
                  {selectedMatchScore.totalScore} {language === 'ko' ? '점' : 'điểm'}
                </div>
              </div>

              <div className="space-y-2">
                {selectedMatchScore.strengths.length > 0 && (
                  <div className="p-3 bg-success/10 rounded-xl border border-success/20">
                    <p className="text-xs font-bold text-success mb-1.5">{language === 'ko' ? '강점' : 'Điểm mạnh'}</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {selectedMatchScore.strengths.slice(0, 3).map((strength: string, idx: number) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label className="text-sm text-white mb-2 block font-bold">{language === 'ko' ? '초대 메시지' : 'Nội dung lời mời'}</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-dark-600/80 border border-dark-400/40 rounded-xl resize-none focus:outline-none focus:border-primary/50 text-white placeholder-gray-500"
                placeholder={language === 'ko' ? 'KOL에게 보낼 메시지를 입력하세요...' : 'Nhập tin nhắn gửi đến KOL...'}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-3 bg-dark-600 text-gray-300 rounded-xl font-semibold hover:bg-dark-500 transition-colors border border-dark-400/40"
              >
                {language === 'ko' ? '취소' : 'Hủy'}
              </button>
              <button
                onClick={handleSendInvite}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {language === 'ko' ? '초대장 보내기' : 'Gửi lời mời'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav userType="advertiser" />
    </div>
  );
}

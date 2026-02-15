'use client';

import { Trophy, Crown, Medal, TrendingUp, Users, Eye } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const mockRankings = [
  { rank: 1, name: 'Nguyễn Minh Anh', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Minh+Anh&background=FFD700&color=000', campaigns: 156, followers: 285000, engagement: 8.2 },
  { rank: 2, name: 'Trần Khánh Linh', avatar: 'https://ui-avatars.com/api/?name=Tran+Khanh+Linh&background=C0C0C0&color=000', campaigns: 142, followers: 256000, engagement: 7.9 },
  { rank: 3, name: 'Lê Hoàng Phúc', avatar: 'https://ui-avatars.com/api/?name=Le+Hoang+Phuc&background=CD7F32&color=fff', campaigns: 138, followers: 234000, engagement: 7.5 },
  { rank: 4, name: 'Phạm Thu Hà', avatar: 'https://ui-avatars.com/api/?name=Pham+Thu+Ha&background=E5E7EB&color=1F2937', campaigns: 121, followers: 198000, engagement: 7.1 },
  { rank: 5, name: 'Hoàng Văn Minh', avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+Minh&background=E5E7EB&color=1F2937', campaigns: 115, followers: 187000, engagement: 6.8 },
  { rank: 6, name: '김민지', avatar: 'https://ui-avatars.com/api/?name=Kim+Minji&background=E5E7EB&color=1F2937', campaigns: 98, followers: 125000, engagement: 5.2, isCurrentUser: true },
];

export default function RankingPage() {
  const { language } = useLanguage();

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: 'from-yellow-400 to-yellow-600', text: 'text-yellow-600' };
    if (rank === 2) return { icon: Medal, color: 'from-gray-300 to-gray-500', text: 'text-gray-600' };
    if (rank === 3) return { icon: Medal, color: 'from-orange-400 to-orange-600', text: 'text-orange-600' };
    return { icon: Trophy, color: 'from-gray-200 to-gray-300', text: 'text-gray-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 pb-20">
      <MobileHeader title={language === 'ko' ? '랭킹' : 'Ranking'} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary p-6 text-white">
          <div className="relative z-10 text-center">
            <Trophy size={48} className="mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'ko' ? '🏆 인플루언서 랭킹' : '🏆 Influencer Ranking'}
            </h2>
            <p className="text-sm text-white/90">
              {language === 'ko' ? '이번 달 최고의 인플루언서들' : 'Top influencers this month'}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative mb-2">
              <img src={mockRankings[1].avatar} alt={mockRankings[1].name} className="w-16 h-16 rounded-full border-4 border-gray-400" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold truncate max-w-[80px]">{mockRankings[1].name.split(' ')[0]}</p>
              <p className="text-gray-400 text-[10px]">{mockRankings[1].campaigns} 캠페인</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img src={mockRankings[0].avatar} alt={mockRankings[0].name} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl" />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Crown size={20} className="text-white" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-yellow-400 text-sm font-bold truncate max-w-[90px]">{mockRankings[0].name.split(' ')[0]}</p>
              <p className="text-gray-300 text-xs">{mockRankings[0].campaigns} 캠페인</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative mb-2">
              <img src={mockRankings[2].avatar} alt={mockRankings[2].name} className="w-16 h-16 rounded-full border-4 border-orange-500" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-xs font-semibold truncate max-w-[80px]">{mockRankings[2].name.split(' ')[0]}</p>
              <p className="text-gray-400 text-[10px]">{mockRankings[2].campaigns} 캠페인</p>
            </div>
          </div>
        </div>

        {/* Full Rankings */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white px-2">
            {language === 'ko' ? '전체 랭킹' : 'Full Rankings'}
          </h3>
          
          {mockRankings.map((user) => {
            const badge = getRankBadge(user.rank);
            const Icon = badge.icon;
            const isCurrentUser = user.isCurrentUser;

            return (
              <div
                key={user.rank}
                className={`bg-dark-600/80 backdrop-blur-xl rounded-2xl p-4 border transition-all ${
                  isCurrentUser
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-dark-500/50 hover:border-dark-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center flex-shrink-0`}>
                    {user.rank <= 3 ? (
                      <Icon size={24} className="text-white" />
                    ) : (
                      <span className="text-white font-bold text-lg">{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-dark-500" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold truncate ${isCurrentUser ? 'text-primary' : 'text-white'}`}>
                        {user.name}
                        {isCurrentUser && <span className="text-xs ml-2 text-primary">(You)</span>}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {(user.followers / 1000).toFixed(0)}K
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          {user.engagement}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Campaigns */}
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{user.campaigns}</div>
                    <div className="text-xs text-gray-400">캠페인</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-dark-600/50 backdrop-blur-sm rounded-xl p-4 border border-dark-500/50">
          <p className="text-xs text-gray-400 text-center">
            {language === 'ko'
              ? '랭킹은 매월 1일 00:00 (KST)에 초기화됩니다'
              : 'Rankings reset on the 1st of each month at 00:00 KST'}
          </p>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

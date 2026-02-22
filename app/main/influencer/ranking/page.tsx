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
  const { language, t } = useLanguage();

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: 'from-yellow-400 to-yellow-600', text: 'text-yellow-400', shadow: 'shadow-yellow-500/30', border: 'border-yellow-500/40' };
    if (rank === 2) return { icon: Medal, color: 'from-gray-300 to-gray-500', text: 'text-gray-300', shadow: 'shadow-gray-400/20', border: 'border-gray-400/40' };
    if (rank === 3) return { icon: Medal, color: 'from-orange-400 to-orange-600', text: 'text-orange-400', shadow: 'shadow-orange-500/20', border: 'border-orange-500/40' };
    return { icon: Trophy, color: 'from-dark-500 to-dark-600', text: 'text-gray-400', shadow: '', border: 'border-dark-400/40' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 pb-20">
      <MobileHeader title={t.ranking.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary p-6 text-white shadow-xl">
          <div className="relative z-10 text-center">
            <Trophy size={48} className="mx-auto mb-3 drop-shadow-lg" />
            <h2 className="text-2xl font-bold mb-2">
              {t.ranking.hero.title}
            </h2>
            <p className="text-sm text-white/90">
              {t.ranking.hero.subtitle}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Top 3 Podium */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
            <h3 className="text-sm font-semibold text-white">TOP 3</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="relative mb-2">
                <img src={mockRankings[1].avatar} alt={mockRankings[1].name} className="w-16 h-16 rounded-full border-4 border-gray-400 shadow-lg shadow-gray-400/20" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-gray-400/30">
                  2
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-xs font-semibold truncate max-w-[80px]">{mockRankings[1].name.split(' ')[0]}</p>
                <p className="text-gray-500 text-[10px]">{mockRankings[1].campaigns} {t.ranking.campaignsUnit}</p>
                <div className="mt-1 px-2 py-0.5 bg-gradient-to-r from-gray-300/20 to-gray-500/20 rounded-full border border-gray-400/30">
                  <span className="text-[9px] text-gray-400 font-bold">SILVER</span>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-lg">👑</div>
                <img src={mockRankings[0].avatar} alt={mockRankings[0].name} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl shadow-yellow-500/30" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/40">
                  <Crown size={20} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-yellow-400 text-sm font-bold truncate max-w-[90px]">{mockRankings[0].name.split(' ')[0]}</p>
                <p className="text-gray-300 text-xs">{mockRankings[0].campaigns} {t.ranking.campaignsUnit}</p>
                <div className="mt-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full border border-yellow-500/40">
                  <span className="text-[9px] text-yellow-400 font-bold">GOLD</span>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="relative mb-2">
                <img src={mockRankings[2].avatar} alt={mockRankings[2].name} className="w-16 h-16 rounded-full border-4 border-orange-500 shadow-lg shadow-orange-500/20" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                  3
                </div>
              </div>
              <div className="text-center">
                <p className="text-orange-400 text-xs font-semibold truncate max-w-[80px]">{mockRankings[2].name.split(' ')[0]}</p>
                <p className="text-gray-500 text-[10px]">{mockRankings[2].campaigns} {t.ranking.campaignsUnit}</p>
                <div className="mt-1 px-2 py-0.5 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-full border border-orange-500/30">
                  <span className="text-[9px] text-orange-400 font-bold">BRONZE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Rankings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.ranking.fullRankings}</h3>
          </div>

          {mockRankings.map((user) => {
            const badge = getRankBadge(user.rank);
            const Icon = badge.icon;
            const isCurrentUser = user.isCurrentUser;

            return (
              <div
                key={user.rank}
                className={`bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 border transition-all shadow-xl ${
                  isCurrentUser
                    ? 'border-primary/50 shadow-primary/20 shadow-lg bg-primary/5'
                    : `${badge.border} hover:border-dark-300/50`
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center flex-shrink-0 shadow-lg ${badge.shadow}`}>
                    {user.rank <= 3 ? (
                      <Icon size={24} className="text-white" />
                    ) : (
                      <span className="text-white font-bold text-lg">{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={user.avatar} alt={user.name} className={`w-12 h-12 rounded-full border-2 ${
                      user.rank === 1 ? 'border-yellow-400/60' :
                      user.rank === 2 ? 'border-gray-400/60' :
                      user.rank === 3 ? 'border-orange-500/60' :
                      'border-dark-400/60'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold truncate ${
                          isCurrentUser ? 'text-primary' :
                          user.rank === 1 ? 'text-yellow-400' :
                          user.rank === 2 ? 'text-gray-300' :
                          user.rank === 3 ? 'text-orange-400' :
                          'text-white'
                        }`}>
                          {user.name}
                        </p>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 font-medium flex-shrink-0">
                            {t.ranking.you}
                          </span>
                        )}
                      </div>
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
                    <div className={`font-bold text-lg ${
                      user.rank === 1 ? 'text-yellow-400' :
                      user.rank === 2 ? 'text-gray-300' :
                      user.rank === 3 ? 'text-orange-400' :
                      'text-white'
                    }`}>{user.campaigns}</div>
                    <div className="text-xs text-gray-400">{t.ranking.campaignsUnit}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 shadow-xl">
          <p className="text-xs text-gray-400 text-center">
            {t.ranking.resetInfo}
          </p>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

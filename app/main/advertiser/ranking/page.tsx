'use client';

import { useState } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Users, X, Star, Package, Instagram, Youtube, Globe, MessageCircle, Megaphone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface RankingUser {
  rank: number;
  name: string;
  avatar: string;
  campaigns: number;
  followers: number;
  engagement: number;
  bio?: string;
  categories?: string[];
  rating?: number;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

const mockRankings: RankingUser[] = [
  {
    rank: 1, name: 'Nguyễn Minh Anh',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Minh+Anh&background=FFD700&color=000',
    campaigns: 156, followers: 285000, engagement: 8.2,
    bio: 'Fashion & Lifestyle Influencer tại TP.HCM. Chuyên về thời trang cao cấp và phong cách sống.',
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    rating: 4.9,
    instagram: '@minhanhstyle', youtube: 'Minh Anh Channel',
  },
  {
    rank: 2, name: 'Trần Khánh Linh',
    avatar: 'https://ui-avatars.com/api/?name=Tran+Khanh+Linh&background=C0C0C0&color=000',
    campaigns: 142, followers: 256000, engagement: 7.9,
    bio: 'Food & Travel blogger. Khám phá ẩm thực và du lịch khắp Việt Nam và Đông Nam Á.',
    categories: ['Food', 'Travel', 'Lifestyle'],
    rating: 4.8,
    instagram: '@khanhlinh.food', tiktok: '@khanhlinh',
  },
  {
    rank: 3, name: 'Lê Hoàng Phúc',
    avatar: 'https://ui-avatars.com/api/?name=Le+Hoang+Phuc&background=CD7F32&color=fff',
    campaigns: 138, followers: 234000, engagement: 7.5,
    bio: 'Tech & Gaming content creator. Review công nghệ và game mới nhất.',
    categories: ['Tech', 'Gaming', 'Electronics'],
    rating: 4.7,
    youtube: 'Hoàng Phúc Tech', instagram: '@hoangphuc.tech',
  },
  {
    rank: 4, name: 'Phạm Thu Hà',
    avatar: 'https://ui-avatars.com/api/?name=Pham+Thu+Ha&background=E5E7EB&color=1F2937',
    campaigns: 121, followers: 198000, engagement: 7.1,
    bio: 'Beauty & Skincare influencer. Chuyên review mỹ phẩm và chăm sóc da.',
    categories: ['Beauty', 'Skincare', 'Fashion'],
    rating: 4.6,
    instagram: '@thuha.beauty', tiktok: '@thuha',
  },
  {
    rank: 5, name: 'Hoàng Văn Minh',
    avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+Minh&background=E5E7EB&color=1F2937',
    campaigns: 115, followers: 187000, engagement: 6.8,
    bio: 'Fitness & Health creator. Hướng dẫn tập luyện và dinh dưỡng khoa học.',
    categories: ['Fitness', 'Health', 'Sports'],
    rating: 4.5,
    youtube: 'Minh Fitness', instagram: '@hvm.fitness',
  },
  {
    rank: 6, name: '김민지',
    avatar: 'https://ui-avatars.com/api/?name=Kim+Minji&background=E5E7EB&color=1F2937',
    campaigns: 98, followers: 125000, engagement: 5.2,
    bio: 'K-beauty & Korean culture influencer tại Việt Nam. Chia sẻ về văn hóa và làm đẹp Hàn Quốc.',
    categories: ['K-Beauty', 'Culture', 'Fashion'],
    rating: 4.4,
    instagram: '@minji.vn', tiktok: '@minji_kr',
  },
];

export default function AdvertiserRankingPage() {
  const { language, t } = useLanguage();
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-500/30', border: 'border-yellow-500/40' };
    if (rank === 2) return { icon: Medal, color: 'from-gray-300 to-gray-500', shadow: 'shadow-gray-400/20', border: 'border-gray-400/40' };
    if (rank === 3) return { icon: Medal, color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/20', border: 'border-orange-500/40' };
    return { icon: Trophy, color: 'from-dark-500 to-dark-600', shadow: '', border: 'border-dark-400/40' };
  };

  const getRankNameColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-white';
  };

  const title = language === 'ko' ? '인플루언서 랭킹' : 'Bảng Xếp Hạng KOL';

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 pb-20">
      <MobileHeader title={title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary p-6 text-white shadow-xl">
          <div className="relative z-10 text-center">
            <Trophy size={48} className="mx-auto mb-3 drop-shadow-lg" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'ko' ? '🏆 TOP KOL 랭킹' : '🏆 TOP KOL Ranking'}
            </h2>
            <p className="text-sm text-white/90">
              {language === 'ko' ? '이달의 최고 인플루언서를 만나보세요' : 'Khám phá những KOL hàng đầu tháng này'}
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
            <div className="flex flex-col items-center pt-8 cursor-pointer" onClick={() => setSelectedUser(mockRankings[1])}>
              <div className="relative mb-2">
                <img src={mockRankings[1].avatar} alt={mockRankings[1].name} className="w-16 h-16 rounded-full border-4 border-gray-400 shadow-lg shadow-gray-400/20" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-gray-400/30">
                  2
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-xs font-semibold truncate max-w-[80px]">{mockRankings[1].name.split(' ')[0]}</p>
                <p className="text-gray-500 text-[10px]">{mockRankings[1].campaigns} {language === 'ko' ? '캠페인' : 'camp.'}</p>
                <div className="mt-1 px-2 py-0.5 bg-gradient-to-r from-gray-300/20 to-gray-500/20 rounded-full border border-gray-400/30">
                  <span className="text-[9px] text-gray-400 font-bold">SILVER</span>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedUser(mockRankings[0])}>
              <div className="relative mb-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-lg">👑</div>
                <img src={mockRankings[0].avatar} alt={mockRankings[0].name} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-xl shadow-yellow-500/30" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/40">
                  <Crown size={20} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-yellow-400 text-sm font-bold truncate max-w-[90px]">{mockRankings[0].name.split(' ')[0]}</p>
                <p className="text-gray-300 text-xs">{mockRankings[0].campaigns} {language === 'ko' ? '캠페인' : 'camp.'}</p>
                <div className="mt-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full border border-yellow-500/40">
                  <span className="text-[9px] text-yellow-400 font-bold">GOLD</span>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-8 cursor-pointer" onClick={() => setSelectedUser(mockRankings[2])}>
              <div className="relative mb-2">
                <img src={mockRankings[2].avatar} alt={mockRankings[2].name} className="w-16 h-16 rounded-full border-4 border-orange-500 shadow-lg shadow-orange-500/20" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                  3
                </div>
              </div>
              <div className="text-center">
                <p className="text-orange-400 text-xs font-semibold truncate max-w-[80px]">{mockRankings[2].name.split(' ')[0]}</p>
                <p className="text-gray-500 text-[10px]">{mockRankings[2].campaigns} {language === 'ko' ? '캠페인' : 'camp.'}</p>
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
            <h3 className="text-sm font-semibold text-white">
              {language === 'ko' ? '전체 랭킹' : 'Toàn bộ xếp hạng'}
            </h3>
          </div>

          {mockRankings.map((user) => {
            const badge = getRankBadge(user.rank);
            const Icon = badge.icon;

            return (
              <div
                key={user.rank}
                onClick={() => setSelectedUser(user)}
                className={`bg-dark-600/80 backdrop-blur-sm rounded-2xl p-4 border transition-all shadow-xl cursor-pointer active:scale-[0.98] ${badge.border} hover:border-dark-300/50`}
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
                      <p className={`font-bold truncate ${getRankNameColor(user.rank)}`}>
                        {user.name}
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
                    <div className={`font-bold text-lg ${getRankNameColor(user.rank)}`}>{user.campaigns}</div>
                    <div className="text-xs text-gray-400">{language === 'ko' ? '캠페인' : 'camp.'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-dark-600/50 backdrop-blur-sm rounded-2xl p-4 border border-dark-400/40 shadow-xl">
          <p className="text-xs text-gray-400 text-center">
            {language === 'ko' ? '랭킹은 매월 1일 초기화됩니다' : 'Bảng xếp hạng được cập nhật vào ngày 1 hàng tháng'}
          </p>
        </div>
      </div>

      <BottomNav userType="advertiser" />

      {/* Profile Bottom Sheet Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />

          {/* Sheet */}
          <div className="relative bg-dark-700 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-dark-400 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-dark-600/80 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="px-5 pb-8 pt-2">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className={`w-20 h-20 rounded-2xl border-2 shadow-lg ${
                      selectedUser.rank === 1 ? 'border-yellow-400/70 shadow-yellow-500/20' :
                      selectedUser.rank === 2 ? 'border-gray-400/70 shadow-gray-400/20' :
                      selectedUser.rank === 3 ? 'border-orange-500/70 shadow-orange-500/20' :
                      'border-primary/50 shadow-primary/10'
                    }`}
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                    selectedUser.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    selectedUser.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                    selectedUser.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    'bg-gradient-to-br from-dark-400 to-dark-500'
                  }`}>
                    {selectedUser.rank === 1 ? '👑' : selectedUser.rank}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className={`text-lg font-bold mb-1 ${getRankNameColor(selectedUser.rank)}`}>
                    {selectedUser.name}
                  </h2>
                  {selectedUser.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-accent fill-accent" />
                      <span className="text-accent font-semibold text-sm">{selectedUser.rating}</span>
                      <span className="text-gray-500 text-xs">/ 5.0</span>
                    </div>
                  )}
                  {selectedUser.bio && (
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedUser.bio}</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              {selectedUser.categories && selectedUser.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedUser.categories.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users size={16} className="text-secondary" />
                  </div>
                  <div className="text-white font-bold text-base">
                    {selectedUser.followers >= 1000000
                      ? `${(selectedUser.followers / 1000000).toFixed(1)}M`
                      : `${(selectedUser.followers / 1000).toFixed(0)}K`}
                  </div>
                  <div className="text-gray-500 text-[10px] mt-0.5">Followers</div>
                </div>
                <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Package size={16} className="text-primary" />
                  </div>
                  <div className="text-white font-bold text-base">{selectedUser.campaigns}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">{language === 'ko' ? '캠페인' : 'Chiến dịch'}</div>
                </div>
                <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp size={16} className="text-success" />
                  </div>
                  <div className="text-white font-bold text-base">{selectedUser.engagement}%</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">Engagement</div>
                </div>
              </div>

              {/* SNS Links */}
              {(selectedUser.instagram || selectedUser.youtube || selectedUser.tiktok || selectedUser.website) && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <span className="text-sm font-semibold text-white">SNS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.instagram && (
                      <a
                        href={`https://instagram.com/${selectedUser.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-dark-600/80 border border-dark-400/40 rounded-xl text-sm text-gray-300 hover:border-pink-400/40 hover:text-pink-400 transition-colors"
                      >
                        <Instagram size={14} className="text-pink-400" />
                        {selectedUser.instagram}
                        <ExternalLink size={10} className="text-gray-600" />
                      </a>
                    )}
                    {selectedUser.youtube && (
                      <a
                        href={`https://youtube.com/@${selectedUser.youtube.replace(/ /g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-dark-600/80 border border-dark-400/40 rounded-xl text-sm text-gray-300 hover:border-red-400/40 hover:text-red-400 transition-colors"
                      >
                        <Youtube size={14} className="text-red-400" />
                        {selectedUser.youtube}
                        <ExternalLink size={10} className="text-gray-600" />
                      </a>
                    )}
                    {selectedUser.tiktok && (
                      <a
                        href={`https://tiktok.com/${selectedUser.tiktok}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-dark-600/80 border border-dark-400/40 rounded-xl text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors"
                      >
                        <span className="text-xs font-bold text-white">TikTok</span>
                        {selectedUser.tiktok}
                        <ExternalLink size={10} className="text-gray-600" />
                      </a>
                    )}
                    {selectedUser.website && (
                      <a
                        href={selectedUser.website.startsWith('http') ? selectedUser.website : `https://${selectedUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-dark-600/80 border border-dark-400/40 rounded-xl text-sm text-gray-300 hover:border-secondary/40 hover:text-secondary transition-colors"
                      >
                        <Globe size={14} className="text-secondary" />
                        {selectedUser.website}
                        <ExternalLink size={10} className="text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2 border-t border-dark-500/50">
                <Link
                  href={`/main/messages?userId=influencer_${selectedUser.rank}&userName=${encodeURIComponent(selectedUser.name)}`}
                  className="flex-1 py-3 bg-dark-600 hover:bg-dark-500 border border-dark-400/60 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
                  onClick={() => setSelectedUser(null)}
                >
                  <MessageCircle size={16} />
                  {language === 'ko' ? '메시지 보내기' : 'Nhắn tin'}
                </Link>
                <Link
                  href="/main/advertiser/campaigns/create"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  onClick={() => setSelectedUser(null)}
                >
                  <Megaphone size={16} />
                  {language === 'ko' ? '캠페인 초대' : 'Mời chiến dịch'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

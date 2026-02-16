'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  Award,
  Plus,
  Star,
  Grid3x3,
  LayoutList,
  X,
  ZoomIn,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCompactNumber } from '@/lib/points';

// Mock portfolio data
const mockPortfolio = [
  {
    id: '1',
    campaignTitle: '신규 스킨케어 제품 리뷰',
    brand: 'Beauty Brand',
    platform: 'instagram' as 'instagram' | 'tiktok' | 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    contentUrl: 'https://instagram.com/p/abc123',
    publishedDate: '2024-02-10',
    metrics: {
      views: 25000,
      likes: 3200,
      comments: 450,
      shares: 180,
      engagement: 14.7,
    },
    rating: 5.0,
    feedback: '매우 만족스러운 협업이었습니다!',
    category: 'beauty',
  },
  {
    id: '2',
    campaignTitle: '베트남 레스토랑 체험',
    brand: 'Pho House Vietnam',
    platform: 'tiktok' as 'instagram' | 'tiktok' | 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    contentUrl: 'https://tiktok.com/@user/video/123',
    publishedDate: '2024-02-08',
    metrics: {
      views: 45000,
      likes: 5800,
      comments: 780,
      shares: 320,
      engagement: 15.3,
    },
    rating: 4.5,
    feedback: '음식 촬영 각도가 훌륭했습니다.',
    category: 'food',
  },
];

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

const platformColors = {
  instagram: 'text-pink-500',
  tiktok: 'text-white',
  youtube: 'text-red-500',
};

export default function PortfolioPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'instagram' | 'tiktok' | 'youtube'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof mockPortfolio[0] | null>(null);

  const totalViews = mockPortfolio.reduce((sum, item) => sum + item.metrics.views, 0);
  const totalLikes = mockPortfolio.reduce((sum, item) => sum + item.metrics.likes, 0);
  const avgEngagement = (mockPortfolio.reduce((sum, item) => sum + item.metrics.engagement, 0) / mockPortfolio.length).toFixed(1);
  const avgRating = (mockPortfolio.reduce((sum, item) => sum + item.rating, 0) / mockPortfolio.length).toFixed(1);

  let filteredPortfolio = filter === 'all'
    ? mockPortfolio
    : mockPortfolio.filter(item => item.platform === filter);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-white">{t.portfolio.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`btn-icon ${viewMode === 'grid' ? 'text-primary bg-primary/20' : 'text-gray-400'}`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-icon ${viewMode === 'list' ? 'text-primary bg-primary/20' : 'text-gray-400'}`}
            >
              <LayoutList size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-4">📊 {t.portfolio.statistics}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-600 rounded-lg p-3">
              <Eye size={20} className="text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-white text-center">{formatCompactNumber(totalViews)}</div>
              <div className="text-xs text-gray-400 text-center">{t.portfolio.totalViews}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-3">
              <Heart size={20} className="text-red-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white text-center">{formatCompactNumber(totalLikes)}</div>
              <div className="text-xs text-gray-400 text-center">{t.portfolio.totalLikes}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-3">
              <TrendingUp size={20} className="text-accent mx-auto mb-1" />
              <div className="text-lg font-bold text-accent text-center">{avgEngagement}%</div>
              <div className="text-xs text-gray-400 text-center">{t.portfolio.avgEngagement}</div>
            </div>
            <div className="bg-dark-600 rounded-lg p-3">
              <Star size={20} className="text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-400 text-center">{avgRating}</div>
              <div className="text-xs text-gray-400 text-center">{t.portfolio.avgRating}</div>
            </div>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
              filter === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
            }`}
          >
            {t.portfolio.filterAll} ({mockPortfolio.length})
          </button>
          <button
            onClick={() => setFilter('instagram')}
            className={`flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
              filter === 'instagram'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
            }`}
          >
            <FaInstagram size={20} />
            Instagram ({mockPortfolio.filter(p => p.platform === 'instagram').length})
          </button>
          <button
            onClick={() => setFilter('tiktok')}
            className={`flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
              filter === 'tiktok'
                ? 'bg-black text-white shadow-lg border-2 border-cyan-400'
                : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
            }`}
          >
            <FaTiktok size={20} />
            TikTok ({mockPortfolio.filter(p => p.platform === 'tiktok').length})
          </button>
          <button
            onClick={() => setFilter('youtube')}
            className={`flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
              filter === 'youtube'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
            }`}
          >
            <FaYoutube size={20} />
            YouTube ({mockPortfolio.filter(p => p.platform === 'youtube').length})
          </button>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 gap-4'}>
          {filteredPortfolio.length === 0 ? (
            <div className="card border-2 border-dark-500/50 shadow-xl text-center py-12">
              <Award size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-1">{t.portfolio.emptyState}</p>
              <p className="text-sm text-gray-500">
                {filter === 'all'
                  ? t.portfolio.emptyStateDesc
                  : `${t.portfolio.emptyState} ${filter.toUpperCase()}`
                }
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View - Compact cards with image focus
            filteredPortfolio.map((item) => {
              const Icon = platformIcons[item.platform];
              return (
              <div key={item.id} className="card border-2 border-dark-500/50 shadow-xl p-0 overflow-hidden">
                <div
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => {
                    setLightboxImage(item.thumbnail);
                    setSelectedPortfolio(item);
                  }}
                >
                  <img src={item.thumbnail} alt={item.campaignTitle} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all" size={32} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-2 left-2">
                    <div className="w-8 h-8 bg-dark-700/90 rounded-lg flex items-center justify-center">
                      <Icon size={16} className={platformColors[item.platform]} />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-dark-700/90 rounded-full flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{item.rating}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.campaignTitle}</h3>
                    <p className="text-xs text-gray-300 line-clamp-1">{item.brand}</p>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Eye size={12} className="text-gray-400" />
                      <span className="text-white font-semibold">{formatCompactNumber(item.metrics.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={12} className="text-red-400" />
                      <span className="text-white font-semibold">{formatCompactNumber(item.metrics.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-accent" />
                      <span className="text-accent font-semibold">{item.metrics.engagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          ) : (
            // List View - Detailed cards
            filteredPortfolio.map((item) => {
              const Icon = platformIcons[item.platform];
              return (
              <div key={item.id} className="card border-2 border-dark-500/50 shadow-xl p-0 overflow-hidden">
                <div
                  className="relative h-48 cursor-pointer group"
                  onClick={() => {
                    setLightboxImage(item.thumbnail);
                    setSelectedPortfolio(item);
                  }}
                >
                  <img src={item.thumbnail} alt={item.campaignTitle} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all" size={40} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <div className="w-10 h-10 bg-dark-700/80 rounded-lg flex items-center justify-center">
                      <Icon size={20} className={platformColors[item.platform]} />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-dark-700/80 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-white">{item.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-lg mb-1">{item.campaignTitle}</h3>
                    <p className="text-sm text-gray-300">{item.brand}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <Eye size={16} className="text-gray-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">{formatCompactNumber(item.metrics.views)}</div>
                    </div>
                    <div className="text-center">
                      <Heart size={16} className="text-red-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">{formatCompactNumber(item.metrics.likes)}</div>
                    </div>
                    <div className="text-center">
                      <MessageCircle size={16} className="text-blue-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">{formatCompactNumber(item.metrics.comments)}</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp size={16} className="text-accent mx-auto mb-1" />
                      <div className="text-xs font-bold text-accent">{item.metrics.engagement}%</div>
                    </div>
                  </div>
                  {item.feedback && (
                    <div className="bg-dark-600 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-300 italic">"{item.feedback}"</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-dark-500">
                    <div className="text-xs text-gray-400">{item.publishedDate}</div>
                    <a href={item.contentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <ExternalLink size={14} className="mr-1" />{t.portfolio.viewContent}
                    </a>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && selectedPortfolio && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={() => {
            setLightboxImage(null);
            setSelectedPortfolio(null);
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 bg-dark-700/50">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = platformIcons[selectedPortfolio.platform];
                return (
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-dark-600`}>
                    <Icon size={18} className={platformColors[selectedPortfolio.platform]} />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-sm font-bold text-white">{selectedPortfolio.campaignTitle}</h3>
                <p className="text-xs text-gray-400">{selectedPortfolio.brand}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
                setSelectedPortfolio(null);
              }}
              className="btn-icon text-white hover:bg-dark-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt={selectedPortfolio.campaignTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Footer - Metrics */}
          <div className="bg-dark-700/50 px-4 py-4">
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="text-center">
                <Eye size={18} className="text-gray-400 mx-auto mb-1" />
                <div className="text-sm font-bold text-white">{formatCompactNumber(selectedPortfolio.metrics.views)}</div>
                <div className="text-xs text-gray-400">조회수</div>
              </div>
              <div className="text-center">
                <Heart size={18} className="text-red-400 mx-auto mb-1" />
                <div className="text-sm font-bold text-white">{formatCompactNumber(selectedPortfolio.metrics.likes)}</div>
                <div className="text-xs text-gray-400">좋아요</div>
              </div>
              <div className="text-center">
                <MessageCircle size={18} className="text-blue-400 mx-auto mb-1" />
                <div className="text-sm font-bold text-white">{formatCompactNumber(selectedPortfolio.metrics.comments)}</div>
                <div className="text-xs text-gray-400">댓글</div>
              </div>
              <div className="text-center">
                <TrendingUp size={18} className="text-accent mx-auto mb-1" />
                <div className="text-sm font-bold text-accent">{selectedPortfolio.metrics.engagement}%</div>
                <div className="text-xs text-gray-400">참여율</div>
              </div>
            </div>
            {selectedPortfolio.feedback && (
              <div className="bg-dark-600/50 rounded-lg p-3 mb-2">
                <p className="text-sm text-gray-300 italic">"{selectedPortfolio.feedback}"</p>
              </div>
            )}
            <a
              href={selectedPortfolio.contentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-primary text-white w-full flex items-center justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
              원본 콘텐츠 보기
            </a>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, XCircle, ExternalLink, Calendar, DollarSign, Share2 } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { formatPoints } from '@/lib/points';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ShareHistory {
  campaignId: string;
  sharedAt: string;
  pointsEarned: number;
  platform: 'facebook';
  postUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  rejectionReason?: string;
}

// Mock campaign titles (in production, fetch from API)
const mockCampaignTitles: { [key: string]: string } = {
  '1': '신규 스킨케어 제품 리뷰 캠페인',
  '2': '베트남 레스토랑 체험 리뷰',
  '3': '스마트폰 언박싱 & 리뷰',
  '4': '피트니스 앱 프로모션',
};

export default function ShareHistoryPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [shareHistory, setShareHistory] = useState<ShareHistory[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('exfluencer_share_history');
    if (stored) {
      const history: ShareHistory[] = JSON.parse(stored);
      // Sort by date (newest first)
      history.sort((a, b) => new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime());
      setShareHistory(history);
    }
  }, []);

  const filteredHistory = filter === 'all'
    ? shareHistory
    : shareHistory.filter(h => h.status === filter);

  const stats = {
    total: shareHistory.length,
    pending: shareHistory.filter(h => h.status === 'pending').length,
    approved: shareHistory.filter(h => h.status === 'approved').length,
    rejected: shareHistory.filter(h => h.status === 'rejected').length,
    totalEarnings: shareHistory
      .filter(h => h.status === 'approved')
      .reduce((sum, h) => sum + h.pointsEarned, 0),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-warning/20 text-warning text-xs rounded-full border border-warning/30 flex items-center gap-1 font-medium">
            <Clock size={12} />
            {t.shareHistory.statusPending}
          </span>
        );
      case 'approved':
        return (
          <span className="px-3 py-1 bg-success/20 text-success text-xs rounded-full border border-success/30 flex items-center gap-1 font-medium">
            <CheckCircle size={12} />
            {t.shareHistory.statusApproved}
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-error/20 text-error text-xs rounded-full border border-error/30 flex items-center gap-1 font-medium">
            <XCircle size={12} />
            {t.shareHistory.statusRejected}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700/90 backdrop-blur-sm border-b border-dark-500/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.shareHistory.title}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl text-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Share2 size={20} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-1">{t.shareHistory.totalShares}</div>
          </div>
          <div className="bg-dark-600/80 backdrop-blur-sm border border-success/30 rounded-2xl p-4 shadow-xl text-center bg-gradient-to-br from-success/20 to-success/5">
            <div className="w-10 h-10 bg-gradient-to-br from-success/30 to-success/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <DollarSign size={20} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{formatPoints(stats.totalEarnings)}</div>
            <div className="text-xs text-gray-400 mt-1">{t.shareHistory.totalEarned}</div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all font-medium ${
              filter === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                : 'bg-dark-600/80 backdrop-blur-sm text-gray-400 border border-dark-400/40'
            }`}
          >
            {t.shareHistory.filterAll} ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all font-medium flex items-center gap-1 ${
              filter === 'pending'
                ? 'bg-warning text-white shadow-lg shadow-warning/20'
                : 'bg-dark-600/80 backdrop-blur-sm text-gray-400 border border-dark-400/40'
            }`}
          >
            <Clock size={14} />
            {t.shareHistory.filterPending} ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all font-medium flex items-center gap-1 ${
              filter === 'approved'
                ? 'bg-success text-white shadow-lg shadow-success/20'
                : 'bg-dark-600/80 backdrop-blur-sm text-gray-400 border border-dark-400/40'
            }`}
          >
            <CheckCircle size={14} />
            {t.shareHistory.filterApproved} ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all font-medium flex items-center gap-1 ${
              filter === 'rejected'
                ? 'bg-error text-white shadow-lg shadow-error/20'
                : 'bg-dark-600/80 backdrop-blur-sm text-gray-400 border border-dark-400/40'
            }`}
          >
            <XCircle size={14} />
            {t.shareHistory.filterRejected} ({stats.rejected})
          </button>
        </div>

        {/* Share History List */}
        <div className="space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl text-center py-12">
              <Share2 size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-1">
                {filter === 'all' ? t.shareHistory.noShares : t.shareHistory.noSharesFiltered}
              </p>
              <p className="text-sm text-gray-500">{t.shareHistory.shareAndEarn}</p>
            </div>
          ) : (
            filteredHistory.map((share, index) => (
              <div key={index} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                      <FaFacebook size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {mockCampaignTitles[share.campaignId] || `${language === 'ko' ? '캠페인' : 'Chiến dịch'} #${share.campaignId}`}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-400">
                          {formatDate(share.sharedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(share.status)}
                </div>

                {/* Post URL */}
                <div className="bg-dark-700/60 rounded-xl p-3 mb-3 border border-dark-500/40">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-1">{t.shareHistory.submittedLink}</p>
                      <a
                        href={share.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-xs hover:underline break-all flex items-center gap-1"
                      >
                        <span className="truncate">{share.postUrl}</span>
                        <ExternalLink size={12} className="flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Points & Status Info */}
                <div className="flex items-center justify-between pt-3 border-t border-dark-500/40">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className={share.status === 'approved' ? 'text-success' : 'text-gray-400'} />
                    <span className={`text-sm font-semibold ${
                      share.status === 'approved' ? 'text-success' :
                      share.status === 'pending' ? 'text-warning' : 'text-gray-400'
                    }`}>
                      {share.status === 'approved' ? '+' : ''}
                      {formatPoints(share.pointsEarned)}
                    </span>
                  </div>

                  {share.status === 'pending' && (
                    <span className="text-xs text-gray-500">{t.shareHistory.averageReviewTime}</span>
                  )}

                  {share.status === 'approved' && share.reviewedAt && (
                    <span className="text-xs text-gray-500">
                      {t.shareHistory.approvedAt} {formatDate(share.reviewedAt)}
                    </span>
                  )}

                  {share.status === 'rejected' && (
                    <button
                      onClick={() => {
                        alert(share.rejectionReason || (language === 'ko'
                          ? '관리자가 게시물을 확인할 수 없었습니다.\n\n사유:\n• 링크가 잘못되었거나 삭제됨\n• 내용이 캠페인과 무관함\n• 게시물이 비공개이거나 접근 불가 (공개 설정 필요)'
                          : 'Quản trị viên không thể xác minh bài đăng.\n\nLý do:\n• Liên kết không hợp lệ hoặc đã bị xóa\n• Nội dung không liên quan đến chiến dịch\n• Bài đăng ở chế độ riêng tư hoặc không thể truy cập (cần đặt công khai)'));
                      }}
                      className="text-xs text-error hover:underline"
                    >
                      {t.shareHistory.viewReason}
                    </button>
                  )}
                </div>

                {/* Rejection Reason */}
                {share.status === 'rejected' && share.rejectionReason && (
                  <div className="mt-3 p-3 bg-error/10 border border-error/30 rounded-xl">
                    <p className="text-xs text-error font-semibold mb-1">{t.shareHistory.rejectionReason}</p>
                    <p className="text-xs text-gray-300">{share.rejectionReason}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Help Info */}
        {stats.pending > 0 && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-info/30 rounded-2xl p-4 shadow-xl bg-info/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-info to-info/60 rounded-full" />
              <h4 className="text-sm font-semibold text-white">{t.shareHistory.reviewGuideTitle}</h4>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>{t.shareHistory.reviewGuideLine1}</li>
              <li>{t.shareHistory.reviewGuideLine2}</li>
              <li>{t.shareHistory.reviewGuideLine3}</li>
              <li>{t.shareHistory.reviewGuideLine4}</li>
            </ul>
          </div>
        )}

        {/* Share Guidelines */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-4 shadow-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
            <h4 className="text-sm font-semibold text-white">{t.shareHistory.whereToShare}</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 bg-gradient-to-br from-success to-success/70 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span className="text-gray-300">{t.shareHistory.facebookGroups}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 bg-gradient-to-br from-success to-success/70 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span className="text-gray-300">{t.shareHistory.personalTimeline}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 bg-gradient-to-br from-success to-success/70 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span className="text-gray-300">{t.shareHistory.facebookPages}</span>
            </div>
          </div>
          <div className="mt-3 bg-warning/10 border border-warning/30 rounded-xl p-2">
            <p className="text-xs text-gray-300">
              {t.shareHistory.publicPostWarning}
            </p>
          </div>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

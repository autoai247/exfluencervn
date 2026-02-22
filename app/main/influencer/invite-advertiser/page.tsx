'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Share2, Building2, TrendingUp, Gift, CheckCircle, DollarSign, Star, Zap, Users, ChevronRight } from 'lucide-react';
import { formatPoints } from '@/lib/points';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data - 초대 현황
const inviteStats = {
  totalInvites: 5,
  activeAdvertisers: 3,
  totalEarnings: 160000, // Realistic total (~$6.5)
  pendingBonus: 40000,
};

const inviteHistory = [
  { id: '1', name: 'Beauty Brand Co.', status: 'active', inviteDate: '2024-01-15', campaigns: 3, earned: 70000 }, // 20K signup + 50K first campaign
  { id: '2', name: 'Fashion House', status: 'active', inviteDate: '2024-01-20', campaigns: 2, earned: 70000 },
  { id: '3', name: 'Tech Store VN', status: 'pending', inviteDate: '2024-02-10', campaigns: 0, earned: 20000 }, // signup only
];

const INVITE_CODE = 'KOL-MINSU2024';
const INVITE_LINK = `https://exfluencer.vn/advertiser/signup?ref=${INVITE_CODE}`;

export default function InviteAdvertiserPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(INVITE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(INVITE_LINK);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'ko' ? 'Exfluencer VN - 광고주 초대' : 'Exfluencer VN - Mời nhà quảng cáo',
        text: language === 'ko'
          ? `저와 함께 Exfluencer VN에서 캠페인을 관리하세요! 첫 캠페인 20% 할인 + 프리미엄 서포트`
          : `Hãy cùng tôi quản lý chiến dịch trên Exfluencer VN! Giảm 20% chiến dịch đầu tiên + Hỗ trợ cao cấp`,
        url: INVITE_LINK,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader title={`${t.inviteAdvertiser.title} ${t.inviteAdvertiser.subtitle}`} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-secondary/30 rounded-2xl p-4 shadow-xl bg-gradient-to-br from-secondary/20 to-primary/20">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg shadow-secondary/30">
              <Building2 size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {t.inviteAdvertiser.inviteAndEarn}
            </h2>
            <p className="text-sm text-gray-300">
              {t.inviteAdvertiser.inviteAndEarn.split('!')[0].split('💼 ')[1]}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t.inviteAdvertiser.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="bg-dark-700/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-accent">{formatPoints(inviteStats.totalEarnings)}</div>
              <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.totalEarnings}</div>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-success">{inviteStats.activeAdvertisers}</div>
              <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.activeAdvertisers}</div>
            </div>
          </div>
        </div>

        {/* 인플루언서 혜택 */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.myBenefits}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-dark-700/50 rounded-xl border border-success/20">
              <div className="w-10 h-10 bg-gradient-to-br from-success/30 to-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{t.inviteAdvertiser.signupBonus} {formatPoints(20000)}</div>
                <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.signupBonusDesc}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-dark-700/50 rounded-xl border border-primary/20">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{t.inviteAdvertiser.firstCampaignBonus} {formatPoints(50000)}</div>
                <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.firstCampaignBonusDesc}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-dark-700/50 rounded-xl border border-secondary/20">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign size={20} className="text-secondary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{t.inviteAdvertiser.ongoingCommission} {formatPoints(30000)})</div>
                <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.ongoingCommissionDesc}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-dark-700/50 rounded-xl border border-warning/20">
              <div className="w-10 h-10 bg-gradient-to-br from-warning/30 to-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{t.inviteAdvertiser.priorityMatching}</div>
                <div className="text-xs text-gray-400 mt-1">{t.inviteAdvertiser.priorityMatchingDesc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 광고주 혜택 */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-accent/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.brandBenefits}</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-success flex-shrink-0" />
              <span>{t.inviteAdvertiser.firstCampaignDiscount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-success flex-shrink-0" />
              <span>{t.inviteAdvertiser.freeCollaboration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-success flex-shrink-0" />
              <span>{t.inviteAdvertiser.premiumSupport}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-success flex-shrink-0" />
              <span>{t.inviteAdvertiser.verifiedKolList}</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-info/10 border border-info/30 rounded-xl">
            <p className="text-xs text-gray-300 text-center">
              {t.inviteAdvertiser.winWinNote}
            </p>
          </div>
        </div>

        {/* Invite Code */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.myInviteCode}</h3>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-primary tracking-wider font-mono">{INVITE_CODE}</span>
              <button
                onClick={handleCopyCode}
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold shadow-lg shadow-primary/20 px-4 py-2 text-sm flex items-center gap-1"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? t.inviteAdvertiser.copied : t.inviteAdvertiser.copyCode}
              </button>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full bg-dark-700/60 border border-dark-400/40 rounded-2xl py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-secondary/40 transition-all flex items-center justify-center gap-2 mb-2"
          >
            {linkCopied ? <CheckCircle size={18} className="text-success" /> : <Copy size={18} />}
            {linkCopied
              ? (language === 'ko' ? '✅ 복사됨' : '✅ Đã sao chép')
              : t.inviteAdvertiser.copyLink}
          </button>

          <button
            onClick={handleShare}
            className="w-full bg-dark-700/60 border border-dark-400/40 rounded-2xl py-3 text-sm font-semibold text-gray-400 hover:text-gray-300 hover:border-dark-300/40 transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            {t.inviteAdvertiser.shareToAdvertiser}
          </button>
        </div>

        {/* How it Works */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-warning/30 rounded-2xl p-4 shadow-xl bg-gradient-to-br from-warning/10 to-warning/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-warning to-warning/60 rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.howItWorks}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <p className="text-sm text-white font-semibold">{t.inviteAdvertiser.step1Title}</p>
                <p className="text-xs text-gray-400">{t.inviteAdvertiser.step1Desc}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-secondary/20">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <p className="text-sm text-white font-semibold">{t.inviteAdvertiser.step2Title} {formatPoints(20000)}</p>
                <p className="text-xs text-gray-400">{t.inviteAdvertiser.step2Desc}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-success/20">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <p className="text-sm text-white font-semibold">{t.inviteAdvertiser.step3Title} {formatPoints(50000)}</p>
                <p className="text-xs text-gray-400">{t.inviteAdvertiser.step3Desc}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                <span className="text-white font-bold text-sm">4</span>
              </div>
              <div>
                <p className="text-sm text-white font-semibold">{t.inviteAdvertiser.step4Title}</p>
                <p className="text-xs text-gray-400">{t.inviteAdvertiser.step4Desc} {formatPoints(30000)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invite History */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.inviteHistory}</h3>
          </div>

          {inviteHistory.map((invite) => (
            <div key={invite.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 size={16} className="text-secondary" />
                    <h4 className="font-semibold text-white">{invite.name}</h4>
                    {invite.status === 'active' ? (
                      <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full border border-success/30 font-medium">
                        {t.inviteAdvertiser.statusActive}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full border border-warning/30 font-medium">
                        {t.inviteAdvertiser.statusPending}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{t.inviteAdvertiser.inviteDate} {invite.inviteDate}</p>
                  {invite.campaigns > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{t.inviteAdvertiser.campaigns} {invite.campaigns}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold text-lg">+{formatPoints(invite.earned)}</div>
                  <div className="text-xs text-gray-500">{t.inviteAdvertiser.totalEarningsLabel}</div>
                </div>
              </div>

              {invite.status === 'active' && (
                <div className="pt-3 border-t border-dark-500/50">
                  <button className="text-xs text-primary hover:text-primary-light flex items-center gap-1">
                    <Users size={14} />
                    {t.inviteAdvertiser.viewBrandCampaigns}
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {inviteHistory.length === 0 && (
            <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl text-center py-8">
              <Building2 size={48} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400">{t.inviteAdvertiser.noInvites}</p>
              <p className="text-sm text-gray-500 mt-1">{t.inviteAdvertiser.noInvitesDesc}</p>
            </div>
          )}
        </div>

        {/* Success Tips */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 shadow-xl bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{t.inviteAdvertiser.successTipsTitle}</h3>
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>{t.inviteAdvertiser.successTip1}</li>
            <li>{t.inviteAdvertiser.successTip2}</li>
            <li>{t.inviteAdvertiser.successTip3}</li>
            <li>{t.inviteAdvertiser.successTip4}</li>
            <li>{t.inviteAdvertiser.successTip5} <strong className="text-accent">{formatPoints(210000)}</strong></li>
          </ul>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

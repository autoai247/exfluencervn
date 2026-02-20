'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Share2, Users, Gift, TrendingUp, Check, Ticket, Smartphone, Zap } from 'lucide-react';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { SiZalo, SiKakao } from 'react-icons/si';
import { formatPoints, formatShoppingPoints } from '@/lib/points';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import UrgencyTimer from '@/components/common/UrgencyTimer';
import SocialMetaTags from '@/components/common/SocialMetaTags';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const referralStats = {
  totalReferrals: 12,
  activeReferrals: 8,
  totalEarnings: 1250000, // 영구 5% 수익으로 증가
  monthlyPassiveIncome: 320000, // 이번 달 자동 수익
  pendingEarnings: 100000,
};

const referralHistory = [
  {
    id: '1',
    name: '이*수',
    status: 'active',
    joinDate: '2024-02-10',
    signupBonus: 30000, // 가입 보너스
    totalEarned: 285000, // 총 5% 수익
    campaignsCompleted: 15, // 완료한 캠페인 수
    lastCampaignDate: '2024-02-25',
  },
  {
    id: '2',
    name: '박*영',
    status: 'active',
    joinDate: '2024-02-08',
    signupBonus: 30000,
    totalEarned: 420000,
    campaignsCompleted: 21,
    lastCampaignDate: '2024-02-24',
  },
  {
    id: '3',
    name: '최*진',
    status: 'pending',
    joinDate: '2024-02-13',
    signupBonus: 0,
    totalEarned: 0,
    campaignsCompleted: 0,
    lastCampaignDate: null,
  },
  {
    id: '4',
    name: '김*호',
    status: 'active',
    joinDate: '2024-02-05',
    signupBonus: 30000,
    totalEarned: 545000,
    campaignsCompleted: 28,
    lastCampaignDate: '2024-02-26',
  },
];

const REFERRAL_CODE = 'KIMMINSU2024';
const REFERRAL_LINK = `https://exfluencer.vn/signup?ref=${REFERRAL_CODE}`;

export default function ReferralPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert(t.referral.codeCopied);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    alert(t.referral.linkCopied);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'ko' ? 'Exfluencer VN 초대' : 'Mời bạn tham gia Exfluencer VN',
        text: language === 'ko'
          ? `나와 함께 Exfluencer VN에서 활동해요! 가입하고 ${formatPoints(50000)}을 받으세요!`
          : `Hãy cùng tôi hoạt động trên Exfluencer VN! Đăng ký và nhận ${formatPoints(50000)}!`,
        url: REFERRAL_LINK,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* 페이스북/SNS 공유 최적화 */}
      <SocialMetaTags
        title={language === 'ko' ? '💰 친구 초대하고 평생 수익! 응모권 5장 무료 | Exfluencer VN' : '💰 Mời bạn bè nhận thu nhập trọn đời! 5 vé bốc thăm miễn phí | Exfluencer VN'}
        description={language === 'ko' ? '친구 1명 초대 시 30,000 SP + 응모권 5장 무료! 친구가 캠페인 할 때마다 5% 평생 자동 수익! 지금 바로 초대하세요 🚀' : 'Mời 1 bạn nhận 30,000 SP + 5 vé bốc thăm miễn phí! Thu nhập tự động 5% suốt đời khi bạn bè làm chiến dịch! Mời ngay 🚀'}
        image={typeof window !== 'undefined' ? `${window.location.origin}/api/og/referral` : '/api/og/referral'}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />

      <MobileHeader title={t.referral.title} showBack />

      <div className="container-mobile py-6 space-y-6">
        {/* 긴급 프로모션 - 응모권 보너스 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 p-[3px] shadow-2xl shadow-red-500/50 animate-pulse-glow">
          <div className="bg-dark-700 rounded-2xl p-5 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Ticket size={24} className="text-yellow-400 animate-pulse" />
                <h2 className="text-xl font-bold text-white">{t.referral.specialBonus}</h2>
                <Ticket size={24} className="text-yellow-400 animate-pulse" />
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl p-4 mb-3">
                <p className="text-center text-white font-bold text-lg mb-2">
                  {t.referral.inviteOne}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                      +{language === 'ko' ? '5장' : '5 vé'}
                    </div>
                    <div className="text-xs text-gray-300">{t.referral.freeTickets}</div>
                  </div>
                  <div className="text-2xl">🎟️</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      30,000 SP
                    </div>
                    <div className="text-xs text-gray-300">{t.referral.points}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <UrgencyTimer variant="warning" size="md" />
                <p className="text-xs text-gray-300 mt-2">
                  {t.referral.limitedBonus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 p-[3px] shadow-2xl shadow-green-500/50">
          <div className="bg-dark-700 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 text-center mb-4">
              <div className="text-7xl mb-3">💰</div>
              <h1 className="text-3xl font-bold text-white mb-3">
                {language === 'ko' ? '친구 초대하고' : 'Mời bạn bè'}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                  {language === 'ko' ? '평생 수익!' : 'Thu nhập trọn đời!'}
                </span>
              </h1>
              <p className="text-base text-gray-200 mb-2">
                {t.referral.friendEveryCampaign}
              </p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-xl">
                <span className="text-white font-bold text-2xl">{t.referral.autoPayment}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <TrendingUp size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-300 mb-1">{t.referral.monthlyAutoIncome}</div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                    {formatShoppingPoints(referralStats.monthlyPassiveIncome)}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {t.referral.notDeductFromFriend}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/30 shadow-xl">
            <div className="text-center">
              <Gift size={32} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formatShoppingPoints(referralStats.totalEarnings)}</div>
              <div className="text-xs text-gray-400 mt-1">{t.referral.totalReferralIncome}</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-success/10 to-transparent border-2 border-success/30 shadow-xl">
            <div className="text-center">
              <Users size={32} className="text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{referralStats.activeReferrals}</div>
              <div className="text-xs text-gray-400 mt-1">{t.referral.active}</div>
              <div className="text-xs text-success mt-1 font-semibold">{t.referral.permanent5Percent}</div>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
            <Zap size={20} className="text-primary" />
            {t.referral.myReferralCode}
          </h3>

          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 rounded-xl p-5 mb-4 shadow-lg">
            <div className="text-center mb-3">
              <p className="text-xs text-gray-400 mb-2">{language === 'ko' ? '내 초대 코드' : 'Mã mời của tôi'}</p>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-widest">
                {REFERRAL_CODE}
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="w-full btn bg-gradient-to-r from-primary to-secondary text-white border-0 py-3 text-base font-bold shadow-xl"
            >
              {copied ? <Check size={20} className="mr-2" /> : <Copy size={20} className="mr-2" />}
              {copied ? '✅' : t.referral.copyCodeButton}
            </button>
          </div>

          {/* SNS 공유 버튼 */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-300 text-center">
              {t.referral.shareDirectly}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* Zalo */}
              <a
                href={`https://zalo.me/?url=${encodeURIComponent(REFERRAL_LINK)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-blue-500 hover:bg-blue-600 text-white border-0 py-4 shadow-lg"
              >
                <SiZalo size={20} className="mr-2" />
                Zalo
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(REFERRAL_LINK)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 py-4 shadow-lg"
              >
                <FaFacebookF size={20} className="mr-2" />
                Facebook
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(language === 'ko' ? `나와 함께 Exfluencer VN에서 활동해요! 가입하고 ${formatPoints(30000)}과 응모권 5장을 받으세요! ${REFERRAL_LINK}` : `Hãy cùng tôi hoạt động trên Exfluencer VN! Đăng ký và nhận ${formatPoints(30000)} cùng 5 vé bốc thăm! ${REFERRAL_LINK}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-green-500 hover:bg-green-600 text-white border-0 py-4 shadow-lg"
              >
                <FaWhatsapp size={20} className="mr-2" />
                WhatsApp
              </a>

              {/* KakaoTalk */}
              <button
                onClick={handleShare}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-black border-0 py-4 font-bold shadow-lg"
              >
                <SiKakao size={20} className="mr-2" />
                KakaoTalk
              </button>
            </div>

            {/* 일반 공유 버튼 */}
            <button onClick={handleCopyLink} className="w-full btn btn-ghost border-2 border-dark-500 py-3">
              <Copy size={18} className="mr-2" />
              {language === 'ko' ? '링크 복사' : 'Sao chép liên kết'}
            </button>
          </div>
        </div>

        {/* How it Works */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white px-1">💡 {language === 'ko' ? '5% 영구 수익 시스템' : 'Hệ thống thu nhập 5% trọn đời'}</h3>

          <div className="card bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 shadow-xl">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-bold mb-1">{t.referral.inviteFriend}</p>
                  <p className="text-xs text-gray-300">{language === 'ko' ? '추천 코드나 링크를 친구에게 공유' : 'Chia sẻ mã hoặc liên kết giới thiệu cho bạn bè'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-bold mb-1">{t.referral.friendSignupComplete}</p>
                  <p className="text-xs text-gray-300 mb-1">
                    {language === 'ko' ? (
                      <>• 친구가 {formatShoppingPoints(30000)} 받음<br />• 나도 {formatShoppingPoints(30000)} 받음</>
                    ) : (
                      <>• Bạn bè nhận {formatShoppingPoints(30000)}<br />• Tôi cũng nhận {formatShoppingPoints(30000)}</>
                    )}
                  </p>
                  <p className="text-xs text-green-400 font-semibold">✅ {language === 'ko' ? '둘 다 보너스 획득!' : 'Cả hai cùng nhận thưởng!'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-bold mb-1 flex items-center gap-2">
                    {t.referral.lifetime5Auto}
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">BEST</span>
                  </p>
                  <p className="text-xs text-gray-300 mb-2">
                    <span className="text-green-400 font-bold">{language === 'ko' ? '친구가 캠페인 할 때마다' : 'Mỗi khi bạn bè làm chiến dịch'}</span> {language === 'ko' ? '나에게 5% 자동 지급' : 'tôi tự động nhận 5%'}
                  </p>
                  <div className="bg-dark-700 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-gray-400">{language === 'ko' ? '예시:' : 'Ví dụ:'}</p>
                    <p className="text-xs text-white">
                      {language === 'ko' ? (
                        <>친구가 500,000 VND 캠페인 완료<br />→ 친구는 <span className="text-green-400 font-bold">500,000 VND</span> 받음<br />→ 나는 <span className="text-green-400 font-bold">+25,000 VND</span> 자동 적립 (5%)</>
                      ) : (
                        <>Bạn bè hoàn thành chiến dịch 500,000 VND<br />→ Bạn bè nhận <span className="text-green-400 font-bold">500,000 VND</span><br />→ Tôi tự động nhận <span className="text-green-400 font-bold">+25,000 VND</span> (5%)</>
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-green-400 font-semibold mt-2">
                    ⚡ {language === 'ko' ? '친구에게서 빼는 게 아니라 추가로 지급!' : 'Không trừ từ bạn bè mà được trả thêm!'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Highlight */}
          <div className="card bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500/30 shadow-xl">
            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span>🎯</span>
                <span>{language === 'ko' ? '왜 좋은가요?' : 'Tại sao nên tham gia?'}</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong className="text-white">{language === 'ko' ? '불이익 없음:' : 'Không thiệt hại:'}</strong> {language === 'ko' ? '친구 수익 그대로 + 나만 5% 추가' : 'Bạn bè nhận đủ + tôi thêm 5%'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong className="text-white">{language === 'ko' ? '영구 수익:' : 'Thu nhập trọn đời:'}</strong> {language === 'ko' ? '한 번 초대하면 평생 5% 자동 수익' : 'Mời một lần, nhận 5% tự động mãi mãi'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong className="text-white">{language === 'ko' ? '무제한:' : 'Không giới hạn:'}</strong> {language === 'ko' ? '친구를 많이 초대할수록 수익 UP!' : 'Mời càng nhiều bạn, thu nhập càng cao!'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span><strong className="text-white">{language === 'ko' ? '자동 지급:' : 'Thanh toán tự động:'}</strong> {language === 'ko' ? '친구 캠페인 완료 시 즉시 적립' : 'Tự động nhận ngay khi bạn bè hoàn thành chiến dịch'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Calculator */}
          <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 shadow-xl">
            <h4 className="font-bold text-white mb-3">📊 {language === 'ko' ? '예상 수익 계산기' : 'Máy tính thu nhập dự kiến'}</h4>
            <div className="space-y-3">
              <div className="bg-dark-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{language === 'ko' ? '활성 추천인 10명' : '10 người giới thiệu đang hoạt động'}</span>
                  <span className="text-white font-semibold">{language === 'ko' ? '10명' : '10 người'}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{language === 'ko' ? '월 평균 캠페인' : 'Chiến dịch trung bình/tháng'}</span>
                  <span className="text-white font-semibold">{language === 'ko' ? '5개/인' : '5 cái/người'}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">{language === 'ko' ? '평균 캠페인 단가' : 'Giá chiến dịch trung bình'}</span>
                  <span className="text-white font-semibold">500,000 VND</span>
                </div>
                <div className="border-t border-dark-500 mt-3 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{language === 'ko' ? '월 예상 자동 수익' : 'Thu nhập tự động dự kiến/tháng'}</span>
                    <span className="text-2xl font-bold text-green-400">
                      1,250,000 VND
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {language === 'ko' ? '10명 × 5개 × 500,000 VND × 5% = 1.25M VND/월' : '10 người × 5 cái × 500,000 VND × 5% = 1.25M VND/tháng'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                💡 {language === 'ko' ? '추천인이 많을수록 자동 수익이 늘어납니다!' : 'Càng nhiều người giới thiệu, thu nhập tự động càng tăng!'}
              </p>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-gray-400">{language === 'ko' ? `내 추천인 (${referralStats.totalReferrals}명)` : `Người được giới thiệu của tôi (${referralStats.totalReferrals} người)`}</h3>
            <span className="text-xs text-gray-500">{language === 'ko' ? '총' : 'Tổng'} {formatShoppingPoints(referralStats.totalEarnings)} {language === 'ko' ? '수익' : 'thu nhập'}</span>
          </div>

          {referralHistory.map((referral) => (
            <div key={referral.id} className={`card border-2 border-dark-500/50 shadow-xl ${
              referral.status === 'active' ? 'bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20' : ''
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white">{referral.name}</h4>
                    {referral.status === 'active' ? (
                      <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-semibold">
                        ⚡ {language === 'ko' ? '활성' : 'Đang hoạt động'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full">
                        {language === 'ko' ? '가입 대기' : 'Chờ đăng ký'}
                      </span>
                    )}
                  </div>

                  {referral.status === 'active' ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                        <div className="bg-dark-700 rounded p-2">
                          <div className="text-xs text-gray-400 mb-0.5">{t.referral.my5Income}</div>
                          <div className="text-sm font-bold text-green-400">
                            {formatShoppingPoints(referral.totalEarned)}
                          </div>
                        </div>
                        <div className="bg-dark-700 rounded p-2">
                          <div className="text-xs text-gray-400 mb-0.5">{t.referral.completedCampaigns}</div>
                          <div className="text-sm font-bold text-white">
                            {referral.campaignsCompleted}{language === 'ko' ? '개' : ''}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{language === 'ko' ? '가입' : 'Ngày tham gia'}: {referral.joinDate}</span>
                        {referral.lastCampaignDate && (
                          <span className="text-success">{language === 'ko' ? '최근 활동' : 'Hoạt động gần đây'}: {referral.lastCampaignDate}</span>
                        )}
                      </div>

                      <div className="mt-2 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded p-2">
                        <p className="text-xs text-green-400 font-semibold">
                          💰 {language === 'ko' ? '이 친구가 캠페인 할 때마다 나에게 5% 자동 지급!' : 'Mỗi khi bạn này làm chiến dịch, tôi tự động nhận 5%!'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-gray-400 mt-1">{language === 'ko' ? '가입일' : 'Ngày đăng ký'}: {referral.joinDate}</p>
                      <p className="text-xs text-warning mt-2">
                        ⏱️ {language === 'ko' ? `친구가 가입을 완료하면 둘 다 ${formatShoppingPoints(30000)} 보너스!` : `Khi bạn hoàn tất đăng ký, cả hai cùng nhận ${formatShoppingPoints(30000)} thưởng!`}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {referralHistory.length === 0 && (
            <div className="card border-2 border-dark-500/50 shadow-xl text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h4 className="text-lg font-bold text-white mb-2">{t.referral.noInvitesYet}</h4>
              <p className="text-sm text-gray-400 mb-4">
                {t.referral.inviteForLifetime5}
              </p>
              <button
                onClick={handleCopyCode}
                className="btn btn-primary mx-auto"
              >
                {t.referral.inviteNowButton}
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, XCircle, DollarSign, Package, FileText, TrendingUp } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import CampaignProgressTimeline from '@/components/CampaignProgressTimeline';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  mockMyCampaigns,
  getMyCampaignsByStatus,
  getActiveCampaignsCount,
  getCompletedCampaignsCount,
  getTotalEarnings,
  getPendingPayments,
} from '@/lib/mockMyCampaigns';
import { CAMPAIGN_WORKFLOW_STEPS, getNextAction } from '@/types/campaignProgress';
import { formatPoints } from '@/lib/points';

type TabType = 'all' | 'active' | 'completed' | 'rejected';

export default function MyCampaignsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const allCampaigns = mockMyCampaigns;
  const activeCampaigns = getMyCampaignsByStatus('active');
  const completedCampaigns = getMyCampaignsByStatus('completed');
  const rejectedCampaigns = getMyCampaignsByStatus('rejected');

  const displayCampaigns =
    activeTab === 'all'
      ? allCampaigns
      : activeTab === 'active'
      ? activeCampaigns
      : activeTab === 'completed'
      ? completedCampaigns
      : rejectedCampaigns;

  const totalEarnings = getTotalEarnings();
  const pendingPayments = getPendingPayments();

  const t = {
    ko: {
      title: '내 캠페인',
      subtitle: '지원하고 진행 중인 캠페인을 한눈에 확인하세요',
      stats: {
        active: '진행 중',
        completed: '완료',
        totalEarnings: '총 수익',
        pending: '정산 대기',
      },
      tabs: {
        all: '전체',
        active: '진행 중',
        completed: '완료',
        rejected: '탈락',
      },
      empty: {
        all: '아직 지원한 캠페인이 없습니다.',
        active: '진행 중인 캠페인이 없습니다.',
        completed: '완료된 캠페인이 없습니다.',
        rejected: '탈락한 캠페인이 없습니다.',
      },
      viewDetails: '자세히 보기',
      appliedAt: '지원일',
      selectedAt: '선정일',
      completedAt: '완료일',
    },
    vi: {
      title: 'Chiến dịch của tôi',
      subtitle: 'Xem tất cả chiến dịch đã ứng tuyển và đang tiến hành',
      stats: {
        active: 'Đang tiến hành',
        completed: 'Hoàn thành',
        totalEarnings: 'Tổng thu nhập',
        pending: 'Chờ thanh toán',
      },
      tabs: {
        all: 'Tất cả',
        active: 'Đang tiến hành',
        completed: 'Hoàn thành',
        rejected: 'Không được chọn',
      },
      empty: {
        all: 'Chưa có chiến dịch nào.',
        active: 'Không có chiến dịch đang tiến hành.',
        completed: 'Chưa hoàn thành chiến dịch nào.',
        rejected: 'Không có chiến dịch bị từ chối.',
      },
      viewDetails: 'Xem chi tiết',
      appliedAt: 'Ngày ứng tuyển',
      selectedAt: 'Ngày được chọn',
      completedAt: 'Ngày hoàn thành',
    },
  };

  const text = t[language];

  return (
    <div className="min-h-screen bg-dark pb-20 overflow-x-hidden">
      {/* Header */}
      <MobileHeader
        title={text.title}
        showBack
      />

      <div className="w-full max-w-[430px] mx-auto">
        {/* Hero Section - 개선된 통계 */}
        <div className="bg-gradient-to-br from-primary/10 to-dark px-6 py-8 border-b border-dark-500">
          <p className="text-base text-gray-300 mb-6 font-medium">{text.subtitle}</p>

          {/* Stats Grid - 간격 및 크기 개선 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-600 backdrop-blur-sm rounded-2xl p-5 border border-primary/30 hover:border-primary/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⏱️</span>
                <span className="text-sm text-gray-400 font-medium">{text.stats.active}</span>
              </div>
              <p className="text-3xl font-bold text-white">{getActiveCampaignsCount()}</p>
            </div>

            <div className="bg-dark-600 backdrop-blur-sm rounded-2xl p-5 border border-mint/30 hover:border-mint/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✅</span>
                <span className="text-sm text-gray-400 font-medium">{text.stats.completed}</span>
              </div>
              <p className="text-3xl font-bold text-white">{getCompletedCampaignsCount()}</p>
            </div>

            <div className="bg-dark-600 backdrop-blur-sm rounded-2xl p-5 border border-green-500/30 hover:border-green-500/50 transition-all col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💵</span>
                <span className="text-sm text-gray-400 font-medium">{text.stats.totalEarnings}</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{formatPoints(totalEarnings)} VND</p>
            </div>
          </div>
        </div>

        {/* Tabs - 크기 및 간격 개선 */}
        <div className="sticky top-14 z-30 bg-dark-700 border-b border-dark-500 shadow-lg">
          <div className="flex gap-2 p-3">
            {(['all', 'active', 'completed', 'rejected'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30'
                    : 'bg-dark-600 text-gray-400 hover:bg-dark-500 hover:text-gray-300'
                }`}
              >
                {text.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign List */}
        <div className="p-4 space-y-4">
          {displayCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">{text.empty[activeTab]}</p>
            </div>
          ) : (
            displayCampaigns.map((campaign) => {
              const stepConfig = CAMPAIGN_WORKFLOW_STEPS[campaign.currentStatus];
              const nextAction = getNextAction(campaign.currentStatus, language);

              return (
                <div
                  key={campaign.campaignId}
                  className="bg-dark-700 rounded-2xl border border-dark-500 overflow-hidden hover:border-primary/30 transition-all"
                >
                  {/* Campaign Header */}
                  <div className="p-4 border-b border-dark-600">
                    <h3 className="font-bold text-white mb-2">{campaign.campaignTitle}</h3>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Status Badge */}
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                          campaign.currentStatus === 'completed'
                            ? 'bg-green-500/20 text-green-500'
                            : ['rejected', 'cancelled'].includes(campaign.currentStatus)
                            ? 'bg-red-500/20 text-red-500'
                            : campaign.currentStatus === 'content_rejected'
                            ? 'bg-orange-500/20 text-orange-500'
                            : 'bg-blue-500/20 text-blue-500'
                        }`}
                      >
                        {stepConfig.icon} {language === 'ko' ? stepConfig.label : stepConfig.labelVi}
                      </span>

                      {/* Progress Badge */}
                      {campaign.progressPercentage > 0 && campaign.currentStatus !== 'rejected' && (
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded-lg text-xs font-bold">
                          {campaign.progressPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        {text.appliedAt}: {new Date(campaign.appliedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                      </span>
                      {campaign.selectedAt && (
                        <span>
                          {text.selectedAt}: {new Date(campaign.selectedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Timeline (Compact) */}
                  <div className="p-4 bg-dark-800/50">
                    <CampaignProgressTimeline currentStatus={campaign.currentStatus} variant="compact" />
                  </div>

                  {/* Next Action */}
                  {nextAction && (
                    <div className="p-4 bg-mint/5 border-t border-mint/10">
                      <button className="w-full py-3 bg-mint text-black font-bold rounded-xl hover:bg-mint/90 transition-all shadow-lg shadow-mint/20">
                        {nextAction.label}
                      </button>
                    </div>
                  )}

                  {/* View Details Link */}
                  <div className="p-4 border-t border-dark-600">
                    <Link
                      href={`/main/influencer/campaigns/${campaign.campaignId}`}
                      className="text-sm text-primary hover:text-mint transition-colors flex items-center justify-center gap-2"
                    >
                      {text.viewDetails}
                      <ArrowLeft size={14} className="rotate-180" />
                    </Link>
                  </div>

                  {/* Payment Info (for completed campaigns) */}
                  {campaign.paymentInfo && campaign.currentStatus === 'completed' && (
                    <div className="px-4 pb-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-green-500" />
                          <span className="text-sm text-gray-400">{language === 'ko' ? '정산 완료' : 'Đã thanh toán'}</span>
                        </div>
                        <span className="text-lg font-black text-green-500">
                          {formatPoints(campaign.paymentInfo.amount)} VND
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Payment Agreement/Confirmation */}
                  {campaign.paymentInfo && ['payment_agreed', 'payment_confirmed'].includes(campaign.currentStatus) && (
                    <div className="px-4 pb-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🤝</span>
                            <span className="text-sm font-bold text-white">
                              {language === 'ko' ? '결제 협의 중' : 'Đang thỏa thuận thanh toán'}
                            </span>
                          </div>
                          <span className="text-lg font-black text-blue-400">
                            {formatPoints(campaign.paymentInfo.amount)} VND
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {language === 'ko'
                            ? '광고주와 직접 결제 방법을 협의하세요. (은행 이체, Momo, Zalo Pay 등)'
                            : 'Thỏa thuận phương thức thanh toán trực tiếp với nhà quảng cáo. (Chuyển khoản, Momo, Zalo Pay, v.v.)'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tracking Info */}
                  {campaign.trackingInfo && campaign.currentStatus === 'product_shipped' && (
                    <div className="px-4 pb-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Package size={16} className="text-blue-500" />
                          <span className="text-sm font-bold text-white">{language === 'ko' ? '배송 추적' : 'Theo dõi vận chuyển'}</span>
                        </div>
                        <div className="text-xs text-gray-400 space-y-1">
                          <p>
                            {language === 'ko' ? '택배사' : 'Đơn vị vận chuyển'}: {campaign.trackingInfo.courier}
                          </p>
                          <p>
                            {language === 'ko' ? '운송장 번호' : 'Mã vận đơn'}: {campaign.trackingInfo.trackingNumber}
                          </p>
                          {campaign.trackingInfo.estimatedDelivery && (
                            <p>
                              {language === 'ko' ? '예상 도착' : 'Dự kiến giao'}:{' '}
                              {new Date(campaign.trackingInfo.estimatedDelivery).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Review Comment */}
                  {campaign.contentInfo?.reviewComment && campaign.currentStatus === 'content_rejected' && (
                    <div className="px-4 pb-4">
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle size={16} className="text-orange-500" />
                          <span className="text-sm font-bold text-white">{language === 'ko' ? '반려 사유' : 'Lý do từ chối'}</span>
                        </div>
                        <p className="text-xs text-gray-400">{campaign.contentInfo.reviewComment}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}

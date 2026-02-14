'use client';

import { useMemo } from 'react';
import { Check, Circle, Lock, AlertCircle, ChevronRight } from 'lucide-react';
import type { CampaignProgressStatus } from '@/types/campaignProgress';
import { CAMPAIGN_WORKFLOW_STEPS, calculateProgress, getNextAction } from '@/types/campaignProgress';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TimelineStep {
  status: CampaignProgressStatus;
  label: string;
  icon: string;
  color: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
  completedAt?: string;
}

interface CampaignProgressTimelineProps {
  currentStatus: CampaignProgressStatus;
  className?: string;
  variant?: 'full' | 'compact' | 'mini'; // full = 모든 단계, compact = 주요 단계만, mini = 진행률만
}

export default function CampaignProgressTimeline({
  currentStatus,
  className = '',
  variant = 'full',
}: CampaignProgressTimelineProps) {
  const { language } = useLanguage();

  // 현재 단계의 order
  const currentOrder = CAMPAIGN_WORKFLOW_STEPS[currentStatus]?.order || 0;
  const progressPercentage = calculateProgress(currentStatus);
  const nextAction = getNextAction(currentStatus, language);

  // 타임라인에 표시할 주요 단계 (compact 모드용)
  const compactSteps: CampaignProgressStatus[] = [
    'applied',
    'selected',
    'contract_signed',
    'product_received',
    'content_approved',
    'posted',
    'completed',
  ];

  // 전체 단계 또는 주요 단계만
  const displaySteps = useMemo(() => {
    const allSteps = Object.entries(CAMPAIGN_WORKFLOW_STEPS)
      .filter(([_, step]) => step.order > 0) // order가 음수인 것 제외 (탈락, 취소 등)
      .sort(([_, a], [__, b]) => a.order - b.order)
      .map(([status, step]): TimelineStep => ({
        status: status as CampaignProgressStatus,
        label: language === 'ko' ? step.shortLabel : step.shortLabelVi,
        icon: step.icon,
        color: step.color,
        completed: step.order < currentOrder,
        current: status === currentStatus,
        locked: step.order > currentOrder,
      }));

    if (variant === 'compact') {
      return allSteps.filter((step) => compactSteps.includes(step.status));
    }

    return allSteps;
  }, [currentStatus, currentOrder, language, variant]);

  // Mini variant - 진행률만 표시
  if (variant === 'mini') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">
            {language === 'ko' ? '진행 상태' : 'Tiến độ'}
          </span>
          <span className="font-bold text-mint">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-mint to-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-400">
          {CAMPAIGN_WORKFLOW_STEPS[currentStatus]?.[language === 'ko' ? 'label' : 'labelVi']}
        </div>
      </div>
    );
  }

  // Compact & Full variants
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 진행률 바 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {language === 'ko' ? '캠페인 진행 상태' : 'Tiến độ chiến dịch'}
            </span>
            <span className="text-xs px-2 py-0.5 bg-mint/20 text-mint rounded-full font-bold">
              {progressPercentage}%
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {displaySteps.findIndex((s) => s.current) + 1} / {displaySteps.length}
          </span>
        </div>

        <div className="w-full bg-dark-600 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-mint via-primary to-mint h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-mint/20"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 타임라인 스텝 */}
      <div className="relative">
        {/* 연결선 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dark-600" />

        <div className="space-y-3">
          {displaySteps.map((step, index) => {
            const stepConfig = CAMPAIGN_WORKFLOW_STEPS[step.status];
            const colorClasses = {
              green: 'bg-green-500 text-white border-green-500',
              blue: 'bg-blue-500 text-white border-blue-500',
              yellow: 'bg-yellow-500 text-black border-yellow-500',
              purple: 'bg-purple-500 text-white border-purple-500',
              gray: 'bg-gray-500 text-white border-gray-500',
              red: 'bg-red-500 text-white border-red-500',
              orange: 'bg-orange-500 text-white border-orange-500',
            };

            const currentColorClass = colorClasses[step.color as keyof typeof colorClasses] || colorClasses.gray;

            return (
              <div key={step.status} className="relative flex items-start gap-3 group">
                {/* 아이콘 */}
                <div className="relative z-10">
                  {step.completed ? (
                    <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center shadow-lg shadow-mint/30 border-2 border-dark-700 group-hover:scale-110 transition-transform">
                      <Check size={16} className="text-black font-bold" />
                    </div>
                  ) : step.current ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-dark-700 ${currentColorClass} animate-pulse group-hover:scale-110 transition-transform`}
                    >
                      <Circle size={16} fill="currentColor" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-dark-600 border-2 border-dark-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Lock size={14} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* 내용 */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.icon}</span>
                    <h4
                      className={`text-sm font-bold ${
                        step.current ? 'text-white' : step.completed ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {step.current && (
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full font-bold animate-pulse">
                        {language === 'ko' ? '현재' : 'Hiện tại'}
                      </span>
                    )}
                  </div>

                  {/* 설명 */}
                  <p
                    className={`text-xs mt-1 ${
                      step.current ? 'text-gray-300' : step.completed ? 'text-gray-500' : 'text-gray-700'
                    }`}
                  >
                    {language === 'ko' ? stepConfig.description : stepConfig.descriptionVi}
                  </p>

                  {/* 완료 시간 */}
                  {step.completed && step.completedAt && (
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'ko' ? '완료' : 'Hoàn thành'}:{' '}
                      {new Date(step.completedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                    </p>
                  )}

                  {/* 현재 단계 - 다음 액션 */}
                  {step.current && nextAction && (
                    <button className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-mint text-black text-xs font-bold rounded-lg hover:bg-mint/90 transition-all shadow-lg shadow-mint/20 group">
                      {nextAction.label}
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 특수 상태 표시 (탈락, 취소 등) */}
      {currentOrder < 0 && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-500">
              {CAMPAIGN_WORKFLOW_STEPS[currentStatus]?.[language === 'ko' ? 'label' : 'labelVi']}
            </h4>
            <p className="text-xs text-red-400 mt-1">
              {CAMPAIGN_WORKFLOW_STEPS[currentStatus]?.[language === 'ko' ? 'description' : 'descriptionVi']}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

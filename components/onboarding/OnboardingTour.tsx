'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TourStep {
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: string; // Button text
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
  language?: 'ko' | 'vi';
}

export default function OnboardingTour({
  steps,
  onComplete,
  onSkip,
  language = 'vi',
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const { language: contextLanguage } = useLanguage();
  const lang = (language !== 'vi' ? language : contextLanguage) as 'ko' | 'vi';

  const text = {
    ko: {
      skip: '건너뛰기',
      back: '이전',
      next: '다음',
      finish: '완료',
      stepProgress: '단계',
    },
    vi: {
      skip: 'Bỏ qua',
      back: 'Trước',
      next: 'Tiếp',
      finish: 'Hoàn thành',
      stepProgress: 'Bước',
    },
  };

  const t = text[lang];
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Find and highlight target element
  useEffect(() => {
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement;
      setTargetElement(element);

      if (element) {
        // Scroll to element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add highlight class
        element.classList.add('onboarding-highlight');

        return () => {
          element.classList.remove('onboarding-highlight');
        };
      }
    } else {
      setTargetElement(null);
    }
  }, [step.target]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const getTooltipPosition = () => {
    if (!targetElement) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const rect = targetElement.getBoundingClientRect();
    const position = step.position || 'bottom';

    switch (position) {
      case 'top':
        return {
          top: `${rect.top - 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 20}px`,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 20}px`,
          transform: 'translateY(-50%)',
        };
      default:
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm" onClick={onSkip} />

      {/* Spotlight for target element */}
      {targetElement && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
            boxShadow: '0 0 0 4px rgba(255, 107, 107, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-[10000] w-[90vw] max-w-md"
        style={getTooltipPosition()}
      >
        <div className="bg-dark-600 rounded-2xl p-6 shadow-2xl border-2 border-primary">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-xs text-primary font-semibold mb-2">
                {t.stepProgress} {currentStep + 1}/{steps.length}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-white transition-colors ml-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-dark-500 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t.skip}
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg font-medium hover:bg-dark-600 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  {t.back}
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                {isLastStep ? (
                  <>
                    <Check size={16} />
                    {t.finish}
                  </>
                ) : (
                  <>
                    {step.action || t.next}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Arrow pointer */}
        {targetElement && (
          <div
            className={`absolute w-4 h-4 bg-dark-600 border-2 border-primary transform rotate-45 ${
              step.position === 'top'
                ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                : step.position === 'left'
                ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                : step.position === 'right'
                ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
                : 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
            }`}
          />
        )}
      </div>

      {/* CSS for highlight effect */}
      <style jsx global>{`
        .onboarding-highlight {
          position: relative;
          z-index: 9999;
          animation: pulse-highlight 2s ease-in-out infinite;
        }

        @keyframes pulse-highlight {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
          }
        }
      `}</style>
    </>
  );
}

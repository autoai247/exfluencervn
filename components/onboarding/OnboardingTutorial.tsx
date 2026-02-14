'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string; // CSS selector for highlighting
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  image?: string;
  highlightArea?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface OnboardingTutorialProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function OnboardingTutorial({ onComplete, onSkip }: OnboardingTutorialProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 'welcome',
      title: t.onboarding.welcome.title,
      description: t.onboarding.welcome.description,
      position: 'center',
    },
    {
      id: 'campaigns',
      title: t.onboarding.campaigns.title,
      description: t.onboarding.campaigns.description,
      position: 'top',
    },
    {
      id: 'eligibility',
      title: t.onboarding.eligibility.title,
      description: t.onboarding.eligibility.description,
      position: 'top',
    },
    {
      id: 'timeline',
      title: t.onboarding.timeline.title,
      description: t.onboarding.timeline.description,
      position: 'top',
    },
    {
      id: 'revenue',
      title: t.onboarding.revenue.title,
      description: t.onboarding.revenue.description,
      position: 'top',
    },
    {
      id: 'portfolio',
      title: t.onboarding.portfolio.title,
      description: t.onboarding.portfolio.description,
      position: 'bottom',
    },
    {
      id: 'messages',
      title: t.onboarding.messages.title,
      description: t.onboarding.messages.description,
      position: 'bottom',
    },
    {
      id: 'notifications',
      title: t.onboarding.notifications.title,
      description: t.onboarding.notifications.description,
      position: 'bottom',
    },
    {
      id: 'wallet',
      title: t.onboarding.wallet.title,
      description: t.onboarding.wallet.description,
      position: 'bottom',
    },
    {
      id: 'complete',
      title: t.onboarding.complete.title,
      description: t.onboarding.complete.description,
      position: 'center',
    },
  ];

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('exfluencer_onboarding_completed');

    if (!hasCompletedOnboarding) {
      // Show onboarding after a short delay
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('exfluencer_onboarding_completed', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  const handleSkip = () => {
    localStorage.setItem('exfluencer_onboarding_completed', 'true');
    setIsVisible(false);
    onSkip?.();
  };

  if (!isVisible) return null;

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all"
        onClick={handleSkip}
      />

      {/* Tutorial Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="card p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 btn-icon text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{t.onboarding.step} {currentStep + 1}/{tutorialSteps.length}</span>
              <span>{Math.round(progress)}% {t.onboarding.completed}</span>
            </div>
            <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">{step.title}</h2>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>

            {/* Image/Illustration (if provided) */}
            {step.image && (
              <div className="rounded-xl overflow-hidden">
                <img src={step.image} alt={step.title} className="w-full" />
              </div>
            )}

            {/* Feature Icons for specific steps */}
            {currentStep === 0 && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { emoji: '🎯', label: t.onboarding.features.campaign },
                  { emoji: '💰', label: t.onboarding.features.revenue },
                  { emoji: '⭐', label: t.onboarding.features.portfolio },
                  { emoji: '💬', label: t.onboarding.features.messages },
                  { emoji: '🔔', label: t.onboarding.features.notifications },
                  { emoji: '💳', label: t.onboarding.features.wallet },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-dark-600 rounded-lg p-3 text-center hover:bg-dark-500 transition-all"
                  >
                    <div className="text-2xl mb-1">{feature.emoji}</div>
                    <div className="text-xs text-gray-400">{feature.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Completion Confetti */}
            {currentStep === tutorialSteps.length - 1 && (
              <div className="text-center py-4">
                <div className="text-6xl mb-3 animate-bounce">🎊</div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-500">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`btn btn-sm ${
                currentStep === 0
                  ? 'bg-dark-600 text-gray-500 cursor-not-allowed'
                  : 'bg-dark-600 text-white hover:bg-dark-500'
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              {t.common.previous}
            </button>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {tutorialSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep
                      ? 'w-6 bg-primary'
                      : idx < currentStep
                      ? 'w-2 bg-primary/50'
                      : 'w-2 bg-dark-600'
                  }`}
                />
              ))}
            </div>

            {/* Next/Complete Button */}
            <button
              onClick={handleNext}
              className="btn btn-primary btn-sm"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <Check size={16} className="mr-1" />
                  {t.common.start}
                </>
              ) : (
                <>
                  {t.common.next}
                  <ChevronRight size={16} className="ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Skip Button */}
          {currentStep < tutorialSteps.length - 1 && (
            <div className="text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t.onboarding.skipTutorial}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 자동 캠페인 생성 엔진
 * 관리자 설정에 따라 정기적으로 가짜 캠페인을 생성
 * 절대 일반 유저에게 노출되지 않음
 */

import type { Category } from '@/types';
import {
  getRandomTemplates,
  generateVietnameseName,
  generateFollowerCount,
  type CampaignTemplate,
} from './vietnamCampaignTemplates';

export interface AutoGenerationSettings {
  enabled: boolean; // 자동 생성 활성화
  dailyCount: number; // 하루에 생성할 캠페인 개수 (1-10)
  categories: Category[]; // 생성할 카테고리
  lastGeneratedDate: string; // 마지막 생성 날짜 (YYYY-MM-DD)
  generatedCampaigns: string[]; // 생성된 캠페인 ID 목록

  // 리얼리티 설정 (REALISM SETTINGS)
  applicantsMin: number; // 최소 지원자 수 (기본 20)
  applicantsMax: number; // 최대 지원자 수 (기본 80)
  demoApplicantsMin: number; // 가짜 지원자 목록에 표시할 최소 개수 (기본 5)
  demoApplicantsMax: number; // 가짜 지원자 목록에 표시할 최대 개수 (기본 12)
  selectionRate: number; // 선정 비율 (%) (기본 15-25%)
  campaignAgeDaysMin: number; // 캠페인이 며칠 전에 생성된 것처럼 보일지 최소 (기본 1)
  campaignAgeDaysMax: number; // 캠페인이 며칠 전에 생성된 것처럼 보일지 최대 (기본 7)
  deadlineDaysMin: number; // 마감일까지 최소 일수 (기본 5)
  deadlineDaysMax: number; // 마감일까지 최대 일수 (기본 30)
  budgetMultiplier: number; // 예산 배율 (1.0 = 원래 금액, 1.5 = 50% 증가)
}

export interface GeneratedCampaign {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  thumbnail: string;
  budget: number;
  minBudget: number;
  maxBudget: number;
  platforms: any[];
  categories: Category[];
  location: string;
  deadline: string;
  requiredFollowers: number;
  requiredEngagement: number;
  description: string;
  applicants: number;
  type: 'cash' | 'points';
  isDemoMode: true;
  demoApplicants: Array<{
    name: string;
    followers: number;
    selected: boolean;
  }>;
  createdAt: string; // 생성 시간
}

const STORAGE_KEY = 'exfluencer_auto_generation_settings';
const CAMPAIGNS_STORAGE_KEY = 'exfluencer_generated_campaigns';

// 기본 설정 (리얼하게 설정됨)
const DEFAULT_SETTINGS: AutoGenerationSettings = {
  enabled: false,
  dailyCount: 3,
  categories: ['food', 'beauty', 'fashion', 'travel', 'lifestyle'],
  lastGeneratedDate: '',
  generatedCampaigns: [],

  // 리얼리티 기본값 (매우 현실적으로)
  applicantsMin: 20, // 최소 20명 지원
  applicantsMax: 80, // 최대 80명 지원
  demoApplicantsMin: 5, // 가짜 지원자 목록에 최소 5명
  demoApplicantsMax: 12, // 가짜 지원자 목록에 최대 12명
  selectionRate: 20, // 20% 선정율
  campaignAgeDaysMin: 1, // 최소 1일 전 생성
  campaignAgeDaysMax: 7, // 최대 7일 전 생성
  deadlineDaysMin: 5, // 마감일까지 최소 5일
  deadlineDaysMax: 30, // 마감일까지 최대 30일
  budgetMultiplier: 1.0, // 예산 배율 1.0 (원래대로)
};

// 설정 로드
export function loadSettings(): AutoGenerationSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_SETTINGS;

  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// 설정 저장
export function saveSettings(settings: AutoGenerationSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// 생성된 캠페인 로드
export function loadGeneratedCampaigns(): GeneratedCampaign[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// 생성된 캠페인 저장
export function saveGeneratedCampaigns(campaigns: GeneratedCampaign[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
}

// 오늘 날짜 (YYYY-MM-DD)
function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// 랜덤 마감일 생성
function generateDeadline(minDays: number, maxDays: number): string {
  const now = new Date();
  const daysToAdd = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  now.setDate(now.getDate() + daysToAdd);
  return now.toISOString().split('T')[0];
}

// 과거 날짜 생성 (며칠 전 생성된 것처럼)
function generatePastDate(minDaysAgo: number, maxDaysAgo: number): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * (maxDaysAgo - minDaysAgo + 1)) + minDaysAgo;
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
}

// 회사 로고 생성 (UI Avatars)
function generateCompanyLogo(companyName: string): string {
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DFE6E9', '6C5CE7', 'A29BFE'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const encoded = encodeURIComponent(companyName);
  return `https://ui-avatars.com/api/?name=${encoded}&background=${randomColor}&color=fff&size=200`;
}

// 가짜 지원자 생성 (관리자 설정에 따라)
function generateDemoApplicants(
  min: number,
  max: number,
  selectionRate: number
): Array<{ name: string; followers: number; selected: boolean }> {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const applicants = [];

  // 선정될 인원 계산
  const selectedCount = Math.floor(count * (selectionRate / 100));

  for (let i = 0; i < count; i++) {
    applicants.push({
      name: generateVietnameseName(),
      followers: generateFollowerCount(3000, 50000), // 더 다양한 팔로워 범위
      selected: i < selectedCount, // 처음 N명만 선정
    });
  }

  // 랜덤하게 섞기 (선정된 사람이 처음에만 있지 않도록)
  return applicants.sort(() => Math.random() - 0.5);
}

// 템플릿 → 캠페인 변환 (설정값 적용)
function templateToCampaign(
  template: CampaignTemplate,
  language: 'ko' | 'vi',
  settings: AutoGenerationSettings
): GeneratedCampaign {
  const id = `auto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 예산 계산 (배율 적용)
  const baseMin = template.budgetRange.min;
  const baseMax = template.budgetRange.max;
  const minBudget = Math.floor(baseMin * settings.budgetMultiplier);
  const maxBudget = Math.floor(baseMax * settings.budgetMultiplier);
  const budget = Math.floor(Math.random() * (maxBudget - minBudget)) + minBudget;

  // 지원자 수 (설정값 범위 내에서 랜덤)
  const applicants = Math.floor(
    Math.random() * (settings.applicantsMax - settings.applicantsMin + 1)
  ) + settings.applicantsMin;

  // 랜덤 위치 선택
  const location = template.locations[Math.floor(Math.random() * template.locations.length)];

  // 90% 현금, 10% 포인트
  const type: 'cash' | 'points' = Math.random() > 0.1 ? 'cash' : 'points';

  // 생성 날짜 (며칠 전으로 설정)
  const createdAt = generatePastDate(settings.campaignAgeDaysMin, settings.campaignAgeDaysMax);

  // 마감일 (설정값 범위 내)
  const deadline = generateDeadline(settings.deadlineDaysMin, settings.deadlineDaysMax);

  return {
    id,
    title: language === 'ko' ? template.titleKo : template.titleVi,
    company: language === 'ko' ? template.companyKo : template.companyVi,
    companyLogo: generateCompanyLogo(template.companyVi),
    thumbnail: template.thumbnail,
    budget,
    minBudget,
    maxBudget,
    platforms: template.platforms,
    categories: [template.category],
    location,
    deadline,
    requiredFollowers: template.requiredFollowers,
    requiredEngagement: template.requiredEngagement,
    description: language === 'ko' ? template.descriptionKo : template.descriptionVi,
    applicants,
    type,
    isDemoMode: true,
    demoApplicants: generateDemoApplicants(
      settings.demoApplicantsMin,
      settings.demoApplicantsMax,
      settings.selectionRate
    ),
    createdAt,
  };
}

// 자동 생성 체크 및 실행 (리얼리티 설정 적용)
export function checkAndGenerateCampaigns(language: 'ko' | 'vi' = 'ko'): GeneratedCampaign[] {
  const settings = loadSettings();

  // 비활성화 상태면 기존 캠페인만 반환
  if (!settings.enabled) {
    return loadGeneratedCampaigns();
  }

  const today = getTodayString();
  const existingCampaigns = loadGeneratedCampaigns();

  // 오늘 이미 생성했으면 기존 캠페인 반환
  if (settings.lastGeneratedDate === today) {
    return existingCampaigns;
  }

  // 새로운 캠페인 생성 (설정값 적용)
  const templates = getRandomTemplates(settings.dailyCount, settings.categories);
  const newCampaigns = templates.map(t => templateToCampaign(t, language, settings));

  // 기존 캠페인 + 새 캠페인 합치기
  const allCampaigns = [...existingCampaigns, ...newCampaigns];

  // 너무 많으면 오래된 것 삭제 (최대 100개 유지)
  const finalCampaigns = allCampaigns.slice(-100);

  // 저장
  saveGeneratedCampaigns(finalCampaigns);

  // 설정 업데이트
  settings.lastGeneratedDate = today;
  settings.generatedCampaigns = finalCampaigns.map(c => c.id);
  saveSettings(settings);

  return finalCampaigns;
}

// 수동으로 즉시 생성 (관리자 페이지에서 "지금 생성" 버튼)
export function generateNow(count: number, categories: Category[], language: 'ko' | 'vi' = 'ko'): GeneratedCampaign[] {
  const settings = loadSettings();
  const templates = getRandomTemplates(count, categories);
  const newCampaigns = templates.map(t => templateToCampaign(t, language, settings));

  const existingCampaigns = loadGeneratedCampaigns();
  const allCampaigns = [...existingCampaigns, ...newCampaigns];
  const finalCampaigns = allCampaigns.slice(-100);

  saveGeneratedCampaigns(finalCampaigns);

  return newCampaigns;
}

// 모든 생성된 캠페인 삭제
export function clearAllGeneratedCampaigns(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CAMPAIGNS_STORAGE_KEY);

  const settings = loadSettings();
  settings.generatedCampaigns = [];
  settings.lastGeneratedDate = '';
  saveSettings(settings);
}

// 특정 캠페인 삭제
export function deleteGeneratedCampaign(campaignId: string): void {
  const campaigns = loadGeneratedCampaigns();
  const filtered = campaigns.filter(c => c.id !== campaignId);
  saveGeneratedCampaigns(filtered);

  const settings = loadSettings();
  settings.generatedCampaigns = filtered.map(c => c.id);
  saveSettings(settings);
}

// 통계
export interface GenerationStats {
  totalGenerated: number;
  generatedToday: number;
  oldestCampaign: string | null;
  newestCampaign: string | null;
  byCategory: Record<Category, number>;
}

export function getGenerationStats(): GenerationStats {
  const campaigns = loadGeneratedCampaigns();
  const today = getTodayString();

  const stats: GenerationStats = {
    totalGenerated: campaigns.length,
    generatedToday: 0,
    oldestCampaign: null,
    newestCampaign: null,
    byCategory: {
      beauty: 0,
      fashion: 0,
      food: 0,
      travel: 0,
      tech: 0,
      fitness: 0,
      lifestyle: 0,
      gaming: 0,
      education: 0,
      entertainment: 0,
      health: 0,
      home: 0,
      pets: 0,
      sports: 0,
      music: 0,
    },
  };

  if (campaigns.length === 0) return stats;

  campaigns.forEach(campaign => {
    // 오늘 생성된 것 카운트
    if (campaign.createdAt.startsWith(today)) {
      stats.generatedToday++;
    }

    // 카테고리별 카운트
    campaign.categories.forEach(cat => {
      stats.byCategory[cat]++;
    });
  });

  // 가장 오래된/최신 캠페인
  const sorted = [...campaigns].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  stats.oldestCampaign = sorted[0]?.createdAt || null;
  stats.newestCampaign = sorted[sorted.length - 1]?.createdAt || null;

  return stats;
}

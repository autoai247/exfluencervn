'use client';

import { useState } from 'react';
import { Filter, X, Save, RotateCcw, ChevronDown } from 'lucide-react';

export interface AdvancedFilters {
  // 기본
  categories: string[];
  minFollowers: string;
  maxFollowers: string;
  location: string;

  // 고급
  minEngagement: string;
  maxEngagement: string;
  platform: 'all' | 'instagram' | 'tiktok' | 'youtube';
  gender: 'all' | 'male' | 'female';
  ageRange: string[];
  verified: boolean;

  // 뷰티 특화
  skinType: string[];
  skinTone: string[];
  hasVehicle: boolean | null;

  // 성과
  minRating: string;
  minCompletedCampaigns: string;
  minAvgViews: string;
  maxAvgViews: string;
}

interface AdvancedInfluencerFilterProps {
  filters: AdvancedFilters;
  onFilterChange: (filters: AdvancedFilters) => void;
  onClose: () => void;
  resultCount: number;
}

const categories = [
  { id: 'beauty', label: '뷰티 Beauty', icon: '💄' },
  { id: 'fashion', label: '패션 Fashion', icon: '👗' },
  { id: 'lifestyle', label: '라이프 Lifestyle', icon: '✨' },
  { id: 'food', label: '음식 Food', icon: '🍜' },
  { id: 'travel', label: '여행 Travel', icon: '✈️' },
  { id: 'tech', label: '테크 Tech', icon: '💻' },
  { id: 'fitness', label: '운동 Fitness', icon: '💪' },
  { id: 'gaming', label: '게임 Gaming', icon: '🎮' },
];

const ageRanges = [
  { id: '18-24', label: '18-24세' },
  { id: '25-34', label: '25-34세' },
  { id: '35-44', label: '35-44세' },
  { id: '45+', label: '45세 이상' },
];

const skinTypes = [
  { id: 'dry', label: '건성 Dry' },
  { id: 'oily', label: '지성 Oily' },
  { id: 'combination', label: '복합성 Combination' },
  { id: 'sensitive', label: '민감성 Sensitive' },
];

const skinTones = [
  { id: 'light', label: '밝은 톤 Light' },
  { id: 'medium', label: '중간 톤 Medium' },
  { id: 'tan', label: '태닝 톤 Tan' },
  { id: 'dark', label: '어두운 톤 Dark' },
];

export default function AdvancedInfluencerFilter({
  filters,
  onFilterChange,
  onClose,
  resultCount,
}: AdvancedInfluencerFilterProps) {
  const [localFilters, setLocalFilters] = useState<AdvancedFilters>(filters);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    advanced: false,
    beauty: false,
    performance: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: keyof AdvancedFilters, value: string) => {
    const currentArray = localFilters[key] as string[];
    if (currentArray.includes(value)) {
      updateFilter(
        key,
        currentArray.filter(v => v !== value)
      );
    } else {
      updateFilter(key, [...currentArray, value]);
    }
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const emptyFilters: AdvancedFilters = {
      categories: [],
      minFollowers: '',
      maxFollowers: '',
      location: '',
      minEngagement: '',
      maxEngagement: '',
      platform: 'all',
      gender: 'all',
      ageRange: [],
      verified: false,
      skinType: [],
      skinTone: [],
      hasVehicle: null,
      minRating: '',
      minCompletedCampaigns: '',
      minAvgViews: '',
      maxAvgViews: '',
    };
    setLocalFilters(emptyFilters);
  };

  const activeFilterCount =
    localFilters.categories.length +
    (localFilters.minFollowers ? 1 : 0) +
    (localFilters.maxFollowers ? 1 : 0) +
    (localFilters.location ? 1 : 0) +
    (localFilters.minEngagement ? 1 : 0) +
    (localFilters.platform !== 'all' ? 1 : 0) +
    (localFilters.gender !== 'all' ? 1 : 0) +
    localFilters.ageRange.length +
    (localFilters.verified ? 1 : 0) +
    localFilters.skinType.length +
    localFilters.skinTone.length +
    (localFilters.hasVehicle !== null ? 1 : 0) +
    (localFilters.minRating ? 1 : 0) +
    (localFilters.minCompletedCampaigns ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      <div className="bg-dark-600 rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-dark-600 border-b border-dark-500 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <Filter className="text-primary" size={24} />
            <div>
              <h3 className="text-lg font-bold text-white">고급 필터</h3>
              <p className="text-xs text-gray-400">
                {activeFilterCount}개 필터 적용 | {resultCount}명 검색됨
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* 기본 필터 */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('basic')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-bold text-white">기본 필터</h4>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  expandedSections.basic ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections.basic && (
              <div className="space-y-3">
                {/* 카테고리 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">카테고리</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleArrayValue('categories', cat.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          localFilters.categories.includes(cat.id)
                            ? 'bg-primary text-white'
                            : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 팔로워 범위 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최소 팔로워</label>
                    <input
                      type="number"
                      value={localFilters.minFollowers}
                      onChange={e => updateFilter('minFollowers', e.target.value)}
                      placeholder="예: 10000"
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최대 팔로워</label>
                    <input
                      type="number"
                      value={localFilters.maxFollowers}
                      onChange={e => updateFilter('maxFollowers', e.target.value)}
                      placeholder="예: 100000"
                      className="input text-sm"
                    />
                  </div>
                </div>

                {/* 위치 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">위치</label>
                  <input
                    type="text"
                    value={localFilters.location}
                    onChange={e => updateFilter('location', e.target.value)}
                    placeholder="호치민, 하노이..."
                    className="input text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="divider" />

          {/* 고급 필터 */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('advanced')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-bold text-white">고급 필터</h4>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  expandedSections.advanced ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections.advanced && (
              <div className="space-y-3">
                {/* 플랫폼 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">플랫폼</label>
                  <select
                    value={localFilters.platform}
                    onChange={e => updateFilter('platform', e.target.value)}
                    className="select text-sm"
                  >
                    <option value="all">전체 All</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>

                {/* 참여율 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최소 참여율 (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={localFilters.minEngagement}
                      onChange={e => updateFilter('minEngagement', e.target.value)}
                      placeholder="예: 3.0"
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최대 참여율 (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={localFilters.maxEngagement}
                      onChange={e => updateFilter('maxEngagement', e.target.value)}
                      placeholder="예: 10.0"
                      className="input text-sm"
                    />
                  </div>
                </div>

                {/* 성별 & 연령 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">성별</label>
                    <select
                      value={localFilters.gender}
                      onChange={e => updateFilter('gender', e.target.value)}
                      className="select text-sm"
                    >
                      <option value="all">전체</option>
                      <option value="female">여성 Female</option>
                      <option value="male">남성 Male</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">연령대</label>
                    <div className="flex flex-wrap gap-1">
                      {ageRanges.map(age => (
                        <button
                          key={age.id}
                          onClick={() => toggleArrayValue('ageRange', age.id)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                            localFilters.ageRange.includes(age.id)
                              ? 'bg-secondary text-white'
                              : 'bg-dark-500 text-gray-300'
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 인증 여부 */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.verified}
                    onChange={e => updateFilter('verified', e.target.checked)}
                    className="w-5 h-5 rounded-lg"
                  />
                  <span className="text-sm text-gray-300">✓ 인증된 인플루언서만 Verified Only</span>
                </label>
              </div>
            )}
          </div>

          <div className="divider" />

          {/* 뷰티 특화 필터 */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('beauty')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-bold text-white">💄 뷰티 특화</h4>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  expandedSections.beauty ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections.beauty && (
              <div className="space-y-3">
                {/* 피부 타입 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">피부 타입</label>
                  <div className="flex flex-wrap gap-2">
                    {skinTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => toggleArrayValue('skinType', type.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          localFilters.skinType.includes(type.id)
                            ? 'bg-accent text-dark-800'
                            : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 피부 톤 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">피부 톤</label>
                  <div className="flex flex-wrap gap-2">
                    {skinTones.map(tone => (
                      <button
                        key={tone.id}
                        onClick={() => toggleArrayValue('skinTone', tone.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          localFilters.skinTone.includes(tone.id)
                            ? 'bg-accent text-dark-800'
                            : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 차량 소유 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">차량 소유</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateFilter('hasVehicle', null)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === null
                          ? 'bg-primary text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      상관없음
                    </button>
                    <button
                      onClick={() => updateFilter('hasVehicle', true)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === true
                          ? 'bg-success text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      있음
                    </button>
                    <button
                      onClick={() => updateFilter('hasVehicle', false)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === false
                          ? 'bg-error text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      없음
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="divider" />

          {/* 성과 필터 */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('performance')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-bold text-white">📊 성과 기반</h4>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  expandedSections.performance ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections.performance && (
              <div className="space-y-3">
                {/* 최소 평점 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">최소 평점</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={localFilters.minRating}
                    onChange={e => updateFilter('minRating', e.target.value)}
                    placeholder="예: 4.5"
                    className="input text-sm"
                  />
                </div>

                {/* 최소 완료 캠페인 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">최소 완료 캠페인 수</label>
                  <input
                    type="number"
                    value={localFilters.minCompletedCampaigns}
                    onChange={e => updateFilter('minCompletedCampaigns', e.target.value)}
                    placeholder="예: 10"
                    className="input text-sm"
                  />
                </div>

                {/* 평균 조회수 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최소 평균 조회수</label>
                    <input
                      type="number"
                      value={localFilters.minAvgViews}
                      onChange={e => updateFilter('minAvgViews', e.target.value)}
                      placeholder="예: 10000"
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">최대 평균 조회수</label>
                    <input
                      type="number"
                      value={localFilters.maxAvgViews}
                      onChange={e => updateFilter('maxAvgViews', e.target.value)}
                      placeholder="예: 100000"
                      className="input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 bg-dark-600 border-t border-dark-500 px-6 py-4 flex gap-3 rounded-b-3xl">
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-gray-300 bg-dark-500 hover:bg-dark-400 transition-all"
          >
            <RotateCcw size={16} />
            초기화
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Filter size={16} />
            필터 적용 ({resultCount}명)
          </button>
        </div>
      </div>
    </div>
  );
}

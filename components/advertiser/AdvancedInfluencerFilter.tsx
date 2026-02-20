'use client';

import { useState } from 'react';
import { Filter, X, Save, RotateCcw, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  { id: 'beauty', labelKo: '뷰티 Beauty', labelVi: 'Làm đẹp Beauty', icon: '💄' },
  { id: 'fashion', labelKo: '패션 Fashion', labelVi: 'Thời trang Fashion', icon: '👗' },
  { id: 'lifestyle', labelKo: '라이프 Lifestyle', labelVi: 'Lối sống Lifestyle', icon: '✨' },
  { id: 'food', labelKo: '음식 Food', labelVi: 'Ẩm thực Food', icon: '🍜' },
  { id: 'travel', labelKo: '여행 Travel', labelVi: 'Du lịch Travel', icon: '✈️' },
  { id: 'tech', labelKo: '테크 Tech', labelVi: 'Công nghệ Tech', icon: '💻' },
  { id: 'fitness', labelKo: '운동 Fitness', labelVi: 'Thể thao Fitness', icon: '💪' },
  { id: 'gaming', labelKo: '게임 Gaming', labelVi: 'Game Gaming', icon: '🎮' },
];

const ageRanges = [
  { id: '18-24', labelKo: '18-24세', labelVi: '18-24 tuổi' },
  { id: '25-34', labelKo: '25-34세', labelVi: '25-34 tuổi' },
  { id: '35-44', labelKo: '35-44세', labelVi: '35-44 tuổi' },
  { id: '45+', labelKo: '45세 이상', labelVi: '45 tuổi trở lên' },
];

const skinTypes = [
  { id: 'dry', labelKo: '건성 Dry', labelVi: 'Da khô Dry' },
  { id: 'oily', labelKo: '지성 Oily', labelVi: 'Da dầu Oily' },
  { id: 'combination', labelKo: '복합성 Combination', labelVi: 'Da hỗn hợp Combination' },
  { id: 'sensitive', labelKo: '민감성 Sensitive', labelVi: 'Da nhạy cảm Sensitive' },
];

const skinTones = [
  { id: 'light', labelKo: '밝은 톤 Light', labelVi: 'Tông sáng Light' },
  { id: 'medium', labelKo: '중간 톤 Medium', labelVi: 'Tông trung Medium' },
  { id: 'tan', labelKo: '태닝 톤 Tan', labelVi: 'Tông nâu Tan' },
  { id: 'dark', labelKo: '어두운 톤 Dark', labelVi: 'Tông tối Dark' },
];

export default function AdvancedInfluencerFilter({
  filters,
  onFilterChange,
  onClose,
  resultCount,
}: AdvancedInfluencerFilterProps) {
  const { language } = useLanguage();
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
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '고급 필터' : 'Bộ lọc nâng cao'}</h3>
              <p className="text-xs text-gray-400">
                {language === 'ko'
                  ? `${activeFilterCount}개 필터 적용 | ${resultCount}명 검색됨`
                  : `${activeFilterCount} bộ lọc đang áp dụng | ${resultCount} người`}
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
              <h4 className="text-sm font-bold text-white">{language === 'ko' ? '기본 필터' : 'Bộ lọc cơ bản'}</h4>
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
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '카테고리' : 'Danh mục'}</label>
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
                        {cat.icon} {language === 'ko' ? cat.labelKo : cat.labelVi}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 팔로워 범위 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최소 팔로워' : 'Follower tối thiểu'}</label>
                    <input
                      type="number"
                      value={localFilters.minFollowers}
                      onChange={e => updateFilter('minFollowers', e.target.value)}
                      placeholder={language === 'ko' ? '예: 10000' : 'VD: 10000'}
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최대 팔로워' : 'Follower tối đa'}</label>
                    <input
                      type="number"
                      value={localFilters.maxFollowers}
                      onChange={e => updateFilter('maxFollowers', e.target.value)}
                      placeholder={language === 'ko' ? '예: 100000' : 'VD: 100000'}
                      className="input text-sm"
                    />
                  </div>
                </div>

                {/* 위치 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '위치' : 'Vị trí'}</label>
                  <input
                    type="text"
                    value={localFilters.location}
                    onChange={e => updateFilter('location', e.target.value)}
                    placeholder={language === 'ko' ? '호치민, 하노이...' : 'TP.HCM, Hà Nội...'}
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
              <h4 className="text-sm font-bold text-white">{language === 'ko' ? '고급 필터' : 'Bộ lọc nâng cao'}</h4>
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
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '플랫폼' : 'Nền tảng'}</label>
                  <select
                    value={localFilters.platform}
                    onChange={e => updateFilter('platform', e.target.value)}
                    className="select text-sm"
                  >
                    <option value="all">{language === 'ko' ? '전체 All' : 'Tất cả'}</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>

                {/* 참여율 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최소 참여율 (%)' : 'Tỷ lệ tương tác tối thiểu (%)'}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={localFilters.minEngagement}
                      onChange={e => updateFilter('minEngagement', e.target.value)}
                      placeholder={language === 'ko' ? '예: 3.0' : 'VD: 3.0'}
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최대 참여율 (%)' : 'Tỷ lệ tương tác tối đa (%)'}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={localFilters.maxEngagement}
                      onChange={e => updateFilter('maxEngagement', e.target.value)}
                      placeholder={language === 'ko' ? '예: 10.0' : 'VD: 10.0'}
                      className="input text-sm"
                    />
                  </div>
                </div>

                {/* 성별 & 연령 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '성별' : 'Giới tính'}</label>
                    <select
                      value={localFilters.gender}
                      onChange={e => updateFilter('gender', e.target.value)}
                      className="select text-sm"
                    >
                      <option value="all">{language === 'ko' ? '전체' : 'Tất cả'}</option>
                      <option value="female">{language === 'ko' ? '여성 Female' : 'Nữ Female'}</option>
                      <option value="male">{language === 'ko' ? '남성 Male' : 'Nam Male'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '연령대' : 'Độ tuổi'}</label>
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
                          {language === 'ko' ? age.labelKo : age.labelVi}
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
                  <span className="text-sm text-gray-300">
                    {language === 'ko' ? '✓ 인증된 인플루언서만 Verified Only' : '✓ Chỉ influencer đã xác minh Verified Only'}
                  </span>
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
              <h4 className="text-sm font-bold text-white">💄 {language === 'ko' ? '뷰티 특화' : 'Chuyên về làm đẹp'}</h4>
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
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '피부 타입' : 'Loại da'}</label>
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
                        {language === 'ko' ? type.labelKo : type.labelVi}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 피부 톤 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '피부 톤' : 'Tông da'}</label>
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
                        {language === 'ko' ? tone.labelKo : tone.labelVi}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 차량 소유 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '차량 소유' : 'Sở hữu phương tiện'}</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateFilter('hasVehicle', null)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === null
                          ? 'bg-primary text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      {language === 'ko' ? '상관없음' : 'Không quan trọng'}
                    </button>
                    <button
                      onClick={() => updateFilter('hasVehicle', true)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === true
                          ? 'bg-success text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      {language === 'ko' ? '있음' : 'Có'}
                    </button>
                    <button
                      onClick={() => updateFilter('hasVehicle', false)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        localFilters.hasVehicle === false
                          ? 'bg-error text-white'
                          : 'bg-dark-500 text-gray-300'
                      }`}
                    >
                      {language === 'ko' ? '없음' : 'Không'}
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
              <h4 className="text-sm font-bold text-white">📊 {language === 'ko' ? '성과 기반' : 'Dựa trên hiệu suất'}</h4>
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
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최소 평점' : 'Xếp hạng tối thiểu'}</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={localFilters.minRating}
                    onChange={e => updateFilter('minRating', e.target.value)}
                    placeholder={language === 'ko' ? '예: 4.5' : 'VD: 4.5'}
                    className="input text-sm"
                  />
                </div>

                {/* 최소 완료 캠페인 */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최소 완료 캠페인 수' : 'Số chiến dịch hoàn thành tối thiểu'}</label>
                  <input
                    type="number"
                    value={localFilters.minCompletedCampaigns}
                    onChange={e => updateFilter('minCompletedCampaigns', e.target.value)}
                    placeholder={language === 'ko' ? '예: 10' : 'VD: 10'}
                    className="input text-sm"
                  />
                </div>

                {/* 평균 조회수 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최소 평균 조회수' : 'Lượt xem trung bình tối thiểu'}</label>
                    <input
                      type="number"
                      value={localFilters.minAvgViews}
                      onChange={e => updateFilter('minAvgViews', e.target.value)}
                      placeholder={language === 'ko' ? '예: 10000' : 'VD: 10000'}
                      className="input text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '최대 평균 조회수' : 'Lượt xem trung bình tối đa'}</label>
                    <input
                      type="number"
                      value={localFilters.maxAvgViews}
                      onChange={e => updateFilter('maxAvgViews', e.target.value)}
                      placeholder={language === 'ko' ? '예: 100000' : 'VD: 100000'}
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
            {language === 'ko' ? '초기화' : 'Đặt lại'}
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Filter size={16} />
            {language === 'ko' ? `필터 적용 (${resultCount}명)` : `Áp dụng bộ lọc (${resultCount} người)`}
          </button>
        </div>
      </div>
    </div>
  );
}

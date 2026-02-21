'use client';

import { X, DollarSign, MapPin, Tag, Users, Car, Baby, PawPrint, Heart } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import type { Platform, Category } from '@/types';

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

const platformColors = {
  instagram: 'text-pink-500',
  tiktok: 'text-white',
  youtube: 'text-red-500',
  facebook: 'text-blue-500',
};

const categoryIcons: Record<Category, any> = {
  beauty: '💄',
  fashion: '👗',
  food: '🍜',
  travel: '✈️',
  fitness: '💪',
  tech: '📱',
  lifestyle: '🌟',
  gaming: '🎮',
  education: '📚',
  entertainment: '🎬',
  health: '🏥',
  home: '🏠',
  pets: '🐾',
  sports: '⚽',
  music: '🎵',
};

interface FilterPanelProps {
  filters: {
    platforms: Platform[];
    categories: Category[];
    minBudget: string;
    maxBudget: string;
    location: string[];
    type: '' | 'cash' | 'points';
    eligibleOnly: boolean;
    requiresVehicle: boolean;
    requiresParent: boolean;
    requiresPet: boolean;
    maritalStatus: '' | 'single' | 'married';
  };
  setFilters: (filters: any) => void;
  togglePlatform: (platform: Platform) => void;
  toggleCategory: (category: Category) => void;
  toggleLocation: (loc: string) => void;
  onClose: () => void;
  t: any;
  language: string;
}

export default function FilterPanel({
  filters,
  setFilters,
  togglePlatform,
  toggleCategory,
  toggleLocation,
  onClose,
  t,
  language,
}: FilterPanelProps) {
  const resetFilters = () => {
    setFilters({
      platforms: [],
      categories: [],
      minBudget: '',
      maxBudget: '',
      location: [],
      type: '',
      eligibleOnly: false,
      requiresVehicle: false,
      requiresParent: false,
      requiresPet: false,
      maritalStatus: '',
    });
  };

  return (
    <div className="bg-dark-600 rounded-xl p-5 mb-4 border border-dark-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{t.campaignFilters.filters}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Platforms */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 block">
          {t.campaignFilters.platform}
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['instagram', 'tiktok', 'youtube', 'facebook'] as Platform[]).map((platform) => {
            const Icon = platformIcons[platform];
            const isSelected = filters.platforms.includes(platform);
            return (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-dark-700 border-dark-500 hover:border-dark-400'
                }`}
              >
                <Icon
                  size={24}
                  className={isSelected ? 'text-white' : platformColors[platform]}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 block">
          {t.campaignFilters.category}
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['beauty', 'fashion', 'food', 'travel', 'fitness', 'tech', 'lifestyle', 'gaming'] as Category[]).map((category) => {
            const isSelected = filters.categories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-2 rounded-lg border-2 transition-all text-center ${
                  isSelected
                    ? 'bg-secondary border-secondary'
                    : 'bg-dark-700 border-dark-500 hover:border-dark-400'
                }`}
              >
                <div className="text-2xl mb-1">{categoryIcons[category]}</div>
                <div className={`text-xs font-medium ${
                  isSelected ? 'text-white' : 'text-gray-300'
                }`}>
                  {t.campaignFilters[category]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Range */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <DollarSign size={16} />
          {t.campaignFilters.budget}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={t.campaignFilters.min}
            value={filters.minBudget}
            onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder={t.campaignFilters.max}
            value={filters.maxBudget}
            onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
            className="input"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <MapPin size={16} />
          {t.campaignFilters.location}
          {filters.location.length > 0 && (
            <span className="ml-1 text-xs text-primary font-normal">({filters.location.length})</span>
          )}
        </label>
        {[
          { groupKo: '남부', groupVi: 'Miền Nam', cities: [
            { value: 'Hồ Chí Minh', ko: '호치민', vi: 'TP.HCM' },
            { value: 'Bình Dương', ko: '빈즈엉', vi: 'Bình Dương' },
            { value: 'Đồng Nai', ko: '동나이', vi: 'Đồng Nai' },
            { value: 'Vũng Tàu', ko: '붕따우', vi: 'Vũng Tàu' },
            { value: 'Cần Thơ', ko: '껀터', vi: 'Cần Thơ' },
          ]},
          { groupKo: '중부', groupVi: 'Miền Trung', cities: [
            { value: 'Đà Nẵng', ko: '다낭', vi: 'Đà Nẵng' },
            { value: 'Huế', ko: '후에', vi: 'Huế' },
            { value: 'Nha Trang', ko: '나트랑', vi: 'Nha Trang' },
            { value: 'Đà Lạt', ko: '달랏', vi: 'Đà Lạt' },
          ]},
          { groupKo: '북부', groupVi: 'Miền Bắc', cities: [
            { value: 'Hà Nội', ko: '하노이', vi: 'Hà Nội' },
            { value: 'Hải Phòng', ko: '하이퐁', vi: 'Hải Phòng' },
            { value: 'Hạ Long', ko: '하롱', vi: 'Hạ Long' },
            { value: 'Bắc Ninh', ko: '박닌', vi: 'Bắc Ninh' },
          ]},
        ].map(group => (
          <div key={group.groupKo} className="mb-2">
            <div className="text-xs text-gray-500 mb-1">{language === 'ko' ? group.groupKo : group.groupVi}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.cities.map(city => (
                <button
                  key={city.value}
                  type="button"
                  onClick={() => toggleLocation(city.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    filters.location.includes(city.value)
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-dark-700 border-dark-500 text-gray-400 hover:border-dark-400'
                  }`}
                >
                  {language === 'ko' ? city.ko : city.vi}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Type */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <Tag size={16} />
          {t.campaignFilters.type}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['', 'cash', 'points'] as const).map((type) => (
            <button
              key={type || 'all'}
              onClick={() => setFilters({ ...filters, type })}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filters.type === type
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {type === '' ? t.campaignFilters.all : type === 'cash' ? t.campaignFilters.cash : t.campaignFilters.points}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 block">
          {t.campaignFilters.quickFilters}
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.eligibleOnly}
              onChange={(e) => setFilters({ ...filters, eligibleOnly: e.target.checked })}
              className="w-5 h-5 rounded border-dark-400 text-primary focus:ring-primary"
            />
            <Users size={16} className="text-gray-300" />
            <span className="text-sm text-gray-300">{t.campaignFilters.eligibleOnly}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.requiresVehicle}
              onChange={(e) => setFilters({ ...filters, requiresVehicle: e.target.checked })}
              className="w-5 h-5 rounded border-dark-400 text-primary focus:ring-primary"
            />
            <Car size={16} className="text-gray-300" />
            <span className="text-sm text-gray-300">{t.campaignFilters.requiresVehicle}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.requiresParent}
              onChange={(e) => setFilters({ ...filters, requiresParent: e.target.checked })}
              className="w-5 h-5 rounded border-dark-400 text-primary focus:ring-primary"
            />
            <Baby size={16} className="text-gray-300" />
            <span className="text-sm text-gray-300">{t.campaignFilters.requiresParent}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.requiresPet}
              onChange={(e) => setFilters({ ...filters, requiresPet: e.target.checked })}
              className="w-5 h-5 rounded border-dark-400 text-primary focus:ring-primary"
            />
            <PawPrint size={16} className="text-gray-300" />
            <span className="text-sm text-gray-300">{t.campaignFilters.requiresPet}</span>
          </label>
        </div>
      </div>

      {/* Marital Status */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <Heart size={16} />
          {t.campaignFilters.maritalStatus}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['', 'single', 'married'] as const).map((status) => (
            <button
              key={status || 'all'}
              onClick={() => setFilters({ ...filters, maritalStatus: status })}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filters.maritalStatus === status
                  ? 'bg-secondary text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {status === '' ? t.campaignFilters.all : status === 'single' ? t.campaignFilters.single : t.campaignFilters.married}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-dark-500">
        <button
          onClick={resetFilters}
          className="flex-1 px-4 py-3 bg-dark-700 text-gray-300 rounded-lg font-medium hover:bg-dark-600 transition-colors active:scale-95"
          aria-label="Reset all filters"
        >
          {t.campaignFilters.reset}
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors active:scale-95"
          aria-label="Apply filters"
        >
          {t.campaignFilters.apply}
        </button>
      </div>
    </div>
  );
}

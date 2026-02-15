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
    location: string;
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
  onClose: () => void;
  t: any;
}

export default function FilterPanel({
  filters,
  setFilters,
  togglePlatform,
  toggleCategory,
  onClose,
  t,
}: FilterPanelProps) {
  const resetFilters = () => {
    setFilters({
      platforms: [],
      categories: [],
      minBudget: '',
      maxBudget: '',
      location: '',
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
        </label>
        <input
          type="text"
          placeholder={t.campaignFilters.locationPlaceholder}
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="input"
        />
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
          className="flex-1 px-4 py-3 bg-dark-700 text-gray-300 rounded-lg font-medium hover:bg-dark-600 transition-colors"
        >
          {t.campaignFilters.reset}
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          {t.campaignFilters.apply}
        </button>
      </div>
    </div>
  );
}

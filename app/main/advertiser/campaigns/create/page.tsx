'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  X,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Tag,
  FileText,
  Heart,
  Baby,
  Car,
  Home,
  PawPrint,
  Shirt,
  Utensils,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import type { Platform, Category } from '@/types';

const platformIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
};

export default function CreateCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    type: 'cash' as 'cash' | 'points',
    platforms: [] as Platform[],
    categories: [] as Category[],
    location: '호치민, 베트남',
    startDate: '',
    endDate: '',
    applicationDeadline: '',

    // Requirements
    minFollowers: '',
    minEngagement: '',
    gender: 'any' as 'any' | 'male' | 'female',
    ageRange: '',

    // Extended requirements
    requiresVehicle: false,
    vehicleTypes: [] as string[],
    requiresParent: false,
    childAgeRange: [] as string[],
    requiresPet: false,
    petTypes: [] as string[],
    maritalStatus: [] as string[],
    housingTypes: [] as string[],

    // Beauty specific
    skinTypes: [] as string[],
    skinTones: [] as string[],

    // Fashion specific
    clothingSizes: {
      top: [] as string[],
      bottom: [] as string[],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to API
    alert('캠페인이 생성되었습니다!');
    router.push('/main/advertiser');
  };

  const togglePlatform = (platform: Platform) => {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter(p => p !== platform)
        : [...formData.platforms, platform],
    });
  };

  const toggleCategory = (category: Category) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter(c => c !== category)
        : [...formData.categories, category],
    });
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-white">🚀 새 캠페인 만들기</h1>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary text-sm">
            <Save size={18} className="mr-1" />
            생성
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-mobile space-y-6 py-6">
        {/* Basic Information */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            기본 정보
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">캠페인 제목 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 신규 스킨케어 제품 리뷰 캠페인"
                className="input"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">설명 *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="캠페인에 대한 상세한 설명을 입력하세요..."
                className="input min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  <DollarSign size={14} className="inline mr-1" />
                  예산 (VND) *
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="500000"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">타입</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'cash' | 'points' })}
                  className="input"
                >
                  <option value="cash">💰 현금</option>
                  <option value="points">🛍️ 포인트</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                <MapPin size={14} className="inline mr-1" />
                지역
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="예: 호치민, 하노이, 온라인"
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            일정
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">시작일</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">종료일</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-300 mb-2 block">지원 마감일 *</label>
            <input
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>

        {/* Platforms & Categories */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            플랫폼 & 카테고리
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">플랫폼 *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['instagram', 'tiktok', 'youtube', 'facebook'] as Platform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  return (
                    <label
                      key={platform}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                        formData.platforms.includes(platform)
                          ? 'bg-primary text-white'
                          : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={() => togglePlatform(platform)}
                        className="hidden"
                      />
                      <Icon size={20} />
                      <span className="text-sm font-medium capitalize">{platform}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">카테고리 *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['beauty', 'food', 'fashion', 'tech', 'fitness', 'travel', 'lifestyle'] as Category[]).map(category => (
                  <label
                    key={category}
                    className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                      formData.categories.includes(category)
                        ? 'bg-primary text-white'
                        : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="hidden"
                    />
                    <span className="text-xs font-medium">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Requirements */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Users size={16} className="text-primary" />
            인플루언서 요구사항
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">최소 팔로워</label>
                <input
                  type="number"
                  value={formData.minFollowers}
                  onChange={(e) => setFormData({ ...formData, minFollowers: e.target.value })}
                  placeholder="10000"
                  className="input"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">최소 참여율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minEngagement}
                  onChange={(e) => setFormData({ ...formData, minEngagement: e.target.value })}
                  placeholder="3.0"
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">성별</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="input"
                >
                  <option value="any">무관</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">연령대</label>
                <input
                  type="text"
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  placeholder="20-35"
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Requirements */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Home size={16} className="text-primary" />
            라이프스타일 조건
          </h3>

          <div className="space-y-3">
            {/* Vehicle */}
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresVehicle}
                onChange={(e) => setFormData({ ...formData, requiresVehicle: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <Car size={18} className="text-blue-400" />
              <span className="text-sm text-white">차량 소유 필수</span>
            </label>

            {/* Parent */}
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresParent}
                onChange={(e) => setFormData({ ...formData, requiresParent: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <Baby size={18} className="text-pink-400" />
              <span className="text-sm text-white">자녀 있는 사람 필수</span>
            </label>

            {/* Pet */}
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresPet}
                onChange={(e) => setFormData({ ...formData, requiresPet: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <PawPrint size={18} className="text-orange-400" />
              <span className="text-sm text-white">반려동물 있는 사람 필수</span>
            </label>
          </div>
        </div>

        {/* Beauty Requirements */}
        {formData.categories.includes('beauty') && (
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Heart size={16} className="text-pink-400" />
              뷰티 조건
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">피부 타입</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'dry', label: '건성' },
                    { value: 'oily', label: '지성' },
                    { value: 'combination', label: '복합성' },
                    { value: 'sensitive', label: '민감성' },
                    { value: 'normal', label: '중성' },
                  ].map(type => (
                    <label
                      key={type.value}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.skinTypes.includes(type.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.skinTypes.includes(type.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, skinTypes: [...formData.skinTypes, type.value] });
                          } else {
                            setFormData({ ...formData, skinTypes: formData.skinTypes.filter(t => t !== type.value) });
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">스킨케어 제품은 피부 타입별로 매칭됩니다</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">피부톤</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'fair', label: '매우 밝음' },
                    { value: 'light', label: '밝음' },
                    { value: 'medium', label: '중간' },
                    { value: 'tan', label: '어두움' },
                    { value: 'dark', label: '매우 어두움' },
                  ].map(tone => (
                    <label
                      key={tone.value}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.skinTones.includes(tone.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.skinTones.includes(tone.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, skinTones: [...formData.skinTones, tone.value] });
                          } else {
                            setFormData({ ...formData, skinTones: formData.skinTones.filter(t => t !== tone.value) });
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-medium">{tone.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">메이크업 제품은 피부톤 매칭이 중요합니다</p>
              </div>
            </div>
          </div>
        )}

        {/* Fashion Requirements */}
        {formData.categories.includes('fashion') && (
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Shirt size={16} className="text-purple-400" />
              패션 조건
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">상의 사이즈</label>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label
                      key={size}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.clothingSizes.top.includes(size)
                          ? 'bg-purple-500 text-white'
                          : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.clothingSizes.top.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              clothingSizes: {
                                ...formData.clothingSizes,
                                top: [...formData.clothingSizes.top, size]
                              }
                            });
                          } else {
                            setFormData({
                              ...formData,
                              clothingSizes: {
                                ...formData.clothingSizes,
                                top: formData.clothingSizes.top.filter(s => s !== size)
                              }
                            });
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-medium">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">하의 사이즈</label>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label
                      key={size}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.clothingSizes.bottom.includes(size)
                          ? 'bg-purple-500 text-white'
                          : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.clothingSizes.bottom.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              clothingSizes: {
                                ...formData.clothingSizes,
                                bottom: [...formData.clothingSizes.bottom, size]
                              }
                            });
                          } else {
                            setFormData({
                              ...formData,
                              clothingSizes: {
                                ...formData.clothingSizes,
                                bottom: formData.clothingSizes.bottom.filter(s => s !== size)
                              }
                            });
                          }
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-medium">{size}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">의류 협찬은 정확한 사이즈 매칭이 필수입니다</p>
              </div>
            </div>
          </div>
        )}

        {/* Food Requirements */}
        {formData.categories.includes('food') && (
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Utensils size={16} className="text-orange-400" />
              식품 조건
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">식이 제한 고려</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'vegetarian', label: '채식' },
                  { value: 'vegan', label: '비건' },
                  { value: 'halal', label: '할랄' },
                  { value: 'gluten-free', label: '글루텐 프리' },
                  { value: 'lactose-free', label: '유당 불내증' },
                  { value: 'none', label: '제한 없음' },
                ].map(diet => (
                  <label
                    key={diet.value}
                    className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{diet.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">식품 캠페인은 식이 제한을 고려해야 합니다</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full py-4 text-lg">
          <Save size={20} className="mr-2" />
          캠페인 생성하기
        </button>
      </form>
    </div>
  );
}

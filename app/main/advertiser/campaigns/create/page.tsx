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

  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File;
    preview: string;
    type: 'image' | 'video';
  }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to API

    // Show success message and wait for user acknowledgment before routing
    await new Promise<void>((resolve) => {
      const confirmed = window.confirm('캠페인이 생성되었습니다!\n\n광고주 대시보드로 이동하시겠습니까?');
      if (confirmed) {
        resolve();
      } else {
        resolve();
      }
    });

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        alert('이미지 또는 비디오 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 체크 (100MB 제한)
      if (file.size > 100 * 1024 * 1024) {
        alert(`${file.name}: 파일이 너무 큽니다 (최대 100MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFiles(prev => [...prev, {
          file,
          preview: event.target?.result as string,
          type: isImage ? 'image' : 'video',
        }]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-gray-900 hover:text-gray-700">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-900">새 캠페인 만들기</h1>
          </div>
          <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center gap-1">
            <Save size={18} />
            생성
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-mobile space-y-6 py-6">
        {/* Basic Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-gray-700" />
            기본 정보
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">캠페인 제목 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 신규 스킨케어 제품 리뷰 캠페인"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">설명 *</label>
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
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <Users size={14} className="inline mr-1" />
                  모집 인원 *
                </label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">선발할 인플루언서 수</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <FileText size={14} className="inline mr-1" />
                  제출물 개수
                </label>
                <input
                  type="number"
                  placeholder="3"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">필요한 포스트/영상 수</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <DollarSign size={14} className="inline mr-1" />
                  예산 (VND) *
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="500000"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">타입</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'cash' | 'points' })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="cash">💰 현금</option>
                  <option value="points">🛍️ 포인트</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <MapPin size={14} className="inline mr-1" />
                지역
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="예: 호치민, 하노이, 온라인"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload size={16} className="text-gray-700" />
            사진 / 영상 업로드
          </h3>

          <div className="space-y-4">
            {/* Upload Button */}
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-900/50 rounded-xl p-8 text-center cursor-pointer hover:border-gray-900 hover:bg-gray-900/5 transition-all">
                <Upload size={40} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-900 font-semibold mb-1">파일 선택 또는 드래그 & 드롭</p>
                <p className="text-xs text-gray-400">이미지 (JPG, PNG, GIF) 또는 비디오 (MP4, MOV)</p>
                <p className="text-xs text-gray-500 mt-1">최대 100MB, 다중 선택 가능</p>
              </div>
            </label>

            {/* Preview Grid */}
            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {uploadedFiles.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                      {item.type === 'image' ? (
                        <img
                          src={item.preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.preview}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} className="text-gray-900" />
                    </button>
                    {/* Type Badge */}
                    <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white">
                      {item.type === 'image' ? '📷' : '🎥'} {item.file.name.length > 10 ? item.file.name.substring(0, 10) + '...' : item.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{uploadedFiles.length}개 파일 업로드됨</span>
                <span className="text-gray-500">
                  {(uploadedFiles.reduce((sum, item) => sum + item.file.size, 0) / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}

            <p className="text-xs text-gray-500 bg-info/10 border border-info/30 rounded-lg p-3">
              💡 <strong>팁:</strong> 캠페인 이미지는 인플루언서들이 어떤 제품/서비스인지 이해하는데 도움을 줍니다.
              고품질 이미지를 업로드하면 지원률이 높아집니다!
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-gray-700" />
            일정
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">시작일</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">종료일</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-700 mb-2 block">지원 마감일 *</label>
            <input
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-gray-700" />
            캠페인 세부 정보
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                #️⃣ 필수 해시태그
              </label>
              <input
                type="text"
                placeholder="#beauty #skincare #kbeauty (스페이스로 구분)"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">인플루언서가 반드시 사용해야 할 해시태그</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                📋 상세 가이드라인
              </label>
              <textarea
                placeholder="• 제품 사용 후 솔직한 리뷰 작성&#10;• 제품의 장단점 모두 언급&#10;• 사용 전/후 비교 사진 포함&#10;• 24시간 이상 게시물 유지"
                className="input min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">인플루언서가 따라야 할 구체적인 지침</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                📦 제공 사항
              </label>
              <textarea
                placeholder="• 제품 1세트 무료 제공&#10;• 배송비 지원&#10;• 추가 샘플 5종 제공"
                className="input min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">인플루언서에게 제공할 제품/서비스</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                🎁 보너스 조건 (선택)
              </label>
              <textarea
                placeholder="• 조회수 10만 이상 달성 시 +50% 보너스&#10;• 좋아요 1만 개 이상 시 +30% 보너스"
                className="input min-h-[60px]"
              />
              <p className="text-xs text-gray-500 mt-1">성과에 따른 추가 보상</p>
            </div>
          </div>
        </div>

        {/* Platforms & Categories */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag size={16} className="text-gray-700" />
            플랫폼 & 카테고리
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">플랫폼 *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['instagram', 'tiktok', 'youtube', 'facebook'] as Platform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  return (
                    <label
                      key={platform}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                        formData.platforms.includes(platform)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">카테고리 *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['beauty', 'food', 'fashion', 'tech', 'fitness', 'travel', 'lifestyle'] as Category[]).map(category => (
                  <label
                    key={category}
                    className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                      formData.categories.includes(category)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={16} className="text-gray-700" />
            인플루언서 요구사항
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">최소 팔로워</label>
                <input
                  type="number"
                  value={formData.minFollowers}
                  onChange={(e) => setFormData({ ...formData, minFollowers: e.target.value })}
                  placeholder="10000"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">최소 참여율 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minEngagement}
                  onChange={(e) => setFormData({ ...formData, minEngagement: e.target.value })}
                  placeholder="3.0"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">성별</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="any">무관</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">연령대</label>
                <input
                  type="text"
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  placeholder="20-35"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Requirements */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Home size={16} className="text-gray-700" />
            라이프스타일 조건
          </h3>

          <div className="space-y-3">
            {/* Vehicle */}
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresVehicle}
                onChange={(e) => setFormData({ ...formData, requiresVehicle: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-gray-700 focus:ring-primary"
              />
              <Car size={18} className="text-blue-400" />
              <span className="text-sm text-gray-900">차량 소유 필수</span>
            </label>

            {/* Parent */}
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresParent}
                onChange={(e) => setFormData({ ...formData, requiresParent: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-gray-700 focus:ring-primary"
              />
              <Baby size={18} className="text-pink-400" />
              <span className="text-sm text-gray-900">자녀 있는 사람 필수</span>
            </label>

            {/* Pet */}
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresPet}
                onChange={(e) => setFormData({ ...formData, requiresPet: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-gray-700 focus:ring-primary"
              />
              <PawPrint size={18} className="text-orange-400" />
              <span className="text-sm text-gray-900">반려동물 있는 사람 필수</span>
            </label>
          </div>
        </div>

        {/* Beauty Requirements */}
        {formData.categories.includes('beauty') && (
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart size={16} className="text-pink-400" />
              뷰티 조건
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">피부 타입</label>
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
                          ? 'bg-pink-500 text-gray-900'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
                <label className="text-sm font-medium text-gray-700 mb-2 block">피부톤</label>
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
                          ? 'bg-pink-500 text-gray-900'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shirt size={16} className="text-purple-400" />
              패션 조건
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">상의 사이즈</label>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label
                      key={size}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.clothingSizes.top.includes(size)
                          ? 'bg-purple-500 text-gray-900'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
                <label className="text-sm font-medium text-gray-700 mb-2 block">하의 사이즈</label>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label
                      key={size}
                      className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                        formData.clothingSizes.bottom.includes(size)
                          ? 'bg-purple-500 text-gray-900'
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Utensils size={16} className="text-orange-400" />
              식품 조건
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">식이 제한 고려</label>
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
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-600 text-gray-700 focus:ring-primary"
                    />
                    <span className="text-xs text-gray-900">{diet.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">식품 캠페인은 식이 제한을 고려해야 합니다</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg flex items-center justify-center gap-2">
          <Save size={20} />
          캠페인 생성하기
        </button>
      </form>
    </div>
  );
}

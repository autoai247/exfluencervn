'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, Plus, Trash2, BarChart3, Settings, Zap, Clock, TrendingUp, X, AlertTriangle } from 'lucide-react';
import type { Category } from '@/types';
import {
  loadSettings,
  saveSettings,
  checkAndGenerateCampaigns,
  generateNow,
  clearAllGeneratedCampaigns,
  deleteGeneratedCampaign,
  getGenerationStats,
  type AutoGenerationSettings,
  type GeneratedCampaign,
} from '@/lib/demoCampaignGenerator';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const CATEGORY_OPTIONS: Category[] = [
  'food',
  'beauty',
  'fashion',
  'travel',
  'tech',
  'fitness',
  'lifestyle',
  'education',
];

const CATEGORY_LABELS: Record<Category, { ko: string; vi: string }> = {
  food: { ko: '음식', vi: 'Ẩm thực' },
  beauty: { ko: '뷰티', vi: 'Làm đẹp' },
  fashion: { ko: '패션', vi: 'Thời trang' },
  travel: { ko: '여행', vi: 'Du lịch' },
  tech: { ko: '테크', vi: 'Công nghệ' },
  fitness: { ko: '피트니스', vi: 'Thể dục' },
  lifestyle: { ko: '라이프스타일', vi: 'Lối sống' },
  education: { ko: '교육', vi: 'Giáo dục' },
  gaming: { ko: '게임', vi: 'Trò chơi' },
  entertainment: { ko: '엔터테인먼트', vi: 'Giải trí' },
  health: { ko: '건강', vi: 'Sức khỏe' },
  home: { ko: '홈', vi: 'Nhà cửa' },
  pets: { ko: '반려동물', vi: 'Thú cưng' },
  sports: { ko: '스포츠', vi: 'Thể thao' },
  music: { ko: '음악', vi: 'Âm nhạc' },
};

export default function DemoCampaignsAdminPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [settings, setSettings] = useState<AutoGenerationSettings>(loadSettings());
  const [campaigns, setCampaigns] = useState<GeneratedCampaign[]>([]);
  const [stats, setStats] = useState(getGenerationStats());
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [validationError, setValidationError] = useState('');

  // 초기 로드
  useEffect(() => {
    const generated = checkAndGenerateCampaigns(language);
    setCampaigns(generated);
    setStats(getGenerationStats());
  }, [language]);

  // 설정 변경
  const updateSettings = (newSettings: Partial<AutoGenerationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  // 카테고리 토글
  const toggleCategory = (category: Category) => {
    const newCategories = settings.categories.includes(category)
      ? settings.categories.filter(c => c !== category)
      : [...settings.categories, category];

    updateSettings({ categories: newCategories });
  };

  // 즉시 생성
  const handleGenerateNow = () => {
    if (settings.categories.length === 0) {
      setValidationError(language === 'ko' ? '최소 1개 카테고리를 선택해주세요!' : 'Vui lòng chọn ít nhất 1 danh mục!');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const newCampaigns = generateNow(settings.dailyCount, settings.categories, language);
      const allCampaigns = checkAndGenerateCampaigns(language);
      setCampaigns(allCampaigns);
      setStats(getGenerationStats());
      setIsGenerating(false);
      setSuccessMessage(language === 'ko' ? `✅ ${newCampaigns.length}개 캠페인 생성 완료!` : `✅ Đã tạo ${newCampaigns.length} chiến dịch!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  // 모두 삭제
  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const executeClearAll = () => {
    clearAllGeneratedCampaigns();
    setCampaigns([]);
    setStats(getGenerationStats());
    setShowClearConfirm(false);
    setSuccessMessage(language === 'ko' ? '🗑️ 모든 캠페인 삭제 완료' : '🗑️ Đã xóa tất cả chiến dịch');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // 개별 삭제
  const handleDeleteCampaign = (id: string) => {
    deleteGeneratedCampaign(id);
    const updated = checkAndGenerateCampaigns(language);
    setCampaigns(updated);
    setStats(getGenerationStats());
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Clear All Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle size={20} className="text-warning" />
                {language === 'ko' ? '전체 삭제 확인' : 'Xác nhận xóa tất cả'}
              </h3>
              <button onClick={() => setShowClearConfirm(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              {language === 'ko'
                ? '정말 모든 자동 생성 캠페인을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
                : 'Bạn có chắc muốn xóa tất cả chiến dịch tự động? Hành động này không thể hoàn tác.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 bg-dark-700 hover:bg-dark-500 text-gray-300 rounded-xl font-semibold text-sm transition-all"
              >
                {language === 'ko' ? '취소' : 'Hủy'}
              </button>
              <button
                onClick={executeClearAll}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                {language === 'ko' ? '전체 삭제' : 'Xóa tất cả'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Error Toast */}
      {validationError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-red-500 text-white rounded-full shadow-2xl font-semibold text-sm">
          {validationError}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-900 to-pink-900 border-b border-pink-500 shadow-2xl">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                🎭 {language === 'ko' ? '자동 캠페인 생성 관리자' : 'Quản lý tạo chiến dịch tự động'}
              </h1>
              <p className="text-pink-200 text-xs">{language === 'ko' ? '오직 관리자만 접근 가능 - 절대 유저에게 노출 안 됨' : 'Chỉ admin mới có quyền truy cập - không bao giờ hiển thị với người dùng'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-full shadow-2xl animate-bounce">
          {successMessage}
        </div>
      )}

      <div className="container-mobile space-y-6 py-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{stats.totalGenerated}</div>
                <div className="text-xs text-gray-300">{language === 'ko' ? '총 생성 캠페인' : 'Tổng chiến dịch tạo'}</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{stats.generatedToday}</div>
                <div className="text-xs text-gray-300">{language === 'ko' ? '오늘 생성됨' : 'Tạo hôm nay'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 자동 생성 설정 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-primary" />
              <h2 className="text-lg font-bold text-white">{language === 'ko' ? '자동 생성 설정' : 'Cài đặt tạo tự động'}</h2>
            </div>
            <button
              onClick={() => updateSettings({ enabled: !settings.enabled })}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                settings.enabled
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {settings.enabled ? (
                <>
                  <Play size={16} />
                  {language === 'ko' ? '활성화됨' : 'Đang bật'}
                </>
              ) : (
                <>
                  <Pause size={16} />
                  {language === 'ko' ? '비활성화됨' : 'Đang tắt'}
                </>
              )}
            </button>
          </div>

          {/* 하루 생성 개수 */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-white mb-2 block">
              {language === 'ko' ? '하루 생성 개수' : 'Số lượng tạo mỗi ngày'}: <span className="text-primary text-xl">{settings.dailyCount}</span>{language === 'ko' ? '개' : ''}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={settings.dailyCount}
              onChange={(e) => updateSettings({ dailyCount: parseInt(e.target.value) })}
              className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{language === 'ko' ? '1개' : '1'}</span>
              <span>{language === 'ko' ? '10개' : '10'}</span>
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">
              {language === 'ko' ? `생성할 카테고리 선택 (${settings.categories.length}개 선택됨)` : `Chọn danh mục tạo (Đã chọn ${settings.categories.length})`}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map((category) => {
                const isActive = settings.categories.includes(category);
                const label = CATEGORY_LABELS[category];
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-primary border-primary text-white shadow-lg'
                        : 'bg-dark-600 border-dark-500 text-gray-400 hover:bg-dark-500'
                    }`}
                  >
                    {language === 'ko' ? label.ko : label.vi}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 마지막 생성 날짜 */}
          {settings.lastGeneratedDate && (
            <div className="mt-4 p-3 bg-dark-600 rounded-lg flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300">
                {language === 'ko' ? '마지막 자동 생성' : 'Lần tạo tự động cuối'}: <span className="text-white font-semibold">{settings.lastGeneratedDate}</span>
              </span>
            </div>
          )}
        </div>

        {/* 리얼리티 설정 (REALISM SETTINGS) */}
        <div className="card border-2 border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">🎯</div>
            <h2 className="text-lg font-bold text-white">{language === 'ko' ? '리얼리티 설정 (핵심!)' : 'Cài đặt thực tế (Quan trọng!)'}</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            {language === 'ko' ? '진짜처럼 보이게 만드는 설정들 - 모든 값을 세밀하게 조정 가능' : 'Các cài đặt làm cho trông thực tế - có thể điều chỉnh mọi giá trị'}
          </p>

          {/* 지원자 수 범위 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              📊 {language === 'ko' ? `지원자 수 범위: ${settings.applicantsMin}명 ~ ${settings.applicantsMax}명` : `Phạm vi số người đăng ký: ${settings.applicantsMin} ~ ${settings.applicantsMax}`}
            </label>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최소' : 'Tối thiểu'}</span>
                  <span className="text-xs text-primary font-bold">{settings.applicantsMin}{language === 'ko' ? '명' : ''}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={settings.applicantsMin}
                  onChange={(e) => updateSettings({ applicantsMin: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최대' : 'Tối đa'}</span>
                  <span className="text-xs text-secondary font-bold">{settings.applicantsMax}{language === 'ko' ? '명' : ''}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={settings.applicantsMax}
                  onChange={(e) => updateSettings({ applicantsMax: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '인기 캠페인은 50-100명, 일반 캠페인은 20-40명 정도가 리얼함' : 'Chiến dịch phổ biến 50-100 người, chiến dịch thường 20-40 người là hợp lý'}
            </div>
          </div>

          {/* 가짜 지원자 목록 개수 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              👥 {language === 'ko' ? `상세 지원자 목록 개수: ${settings.demoApplicantsMin}명 ~ ${settings.demoApplicantsMax}명` : `Số hồ sơ người đăng ký chi tiết: ${settings.demoApplicantsMin} ~ ${settings.demoApplicantsMax}`}
            </label>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최소' : 'Tối thiểu'}</span>
                  <span className="text-xs text-primary font-bold">{settings.demoApplicantsMin}{language === 'ko' ? '명' : ''}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={settings.demoApplicantsMin}
                  onChange={(e) => updateSettings({ demoApplicantsMin: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최대' : 'Tối đa'}</span>
                  <span className="text-xs text-secondary font-bold">{settings.demoApplicantsMax}{language === 'ko' ? '명' : ''}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="25"
                  value={settings.demoApplicantsMax}
                  onChange={(e) => updateSettings({ demoApplicantsMax: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '캠페인 상세 페이지에서 보여지는 지원자 프로필 개수' : 'Số hồ sơ người đăng ký hiển thị trong trang chi tiết chiến dịch'}
            </div>
          </div>

          {/* 선정 비율 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              ✅ {language === 'ko' ? '선정 비율' : 'Tỷ lệ chọn'}: <span className="text-green-400 text-xl">{settings.selectionRate}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.selectionRate}
              onChange={(e) => updateSettings({ selectionRate: parseInt(e.target.value) })}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10% ({language === 'ko' ? '까다로움' : 'Khắt khe'})</span>
              <span>30% ({language === 'ko' ? '보통' : 'Bình thường'})</span>
              <span>50% ({language === 'ko' ? '쉬움' : 'Dễ'})</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '전체 지원자 중 몇 %가 선정되는지 (낮을수록 경쟁이 치열해 보임)' : 'Bao nhiêu % người đăng ký được chọn (càng thấp càng có vẻ cạnh tranh)'}
            </div>
          </div>

          {/* 캠페인 나이 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              📅 {language === 'ko' ? `캠페인 생성 시점: ${settings.campaignAgeDaysMin}일 전 ~ ${settings.campaignAgeDaysMax}일 전` : `Thời điểm tạo chiến dịch: ${settings.campaignAgeDaysMin} ~ ${settings.campaignAgeDaysMax} ngày trước`}
            </label>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최소 (최근)' : 'Tối thiểu (gần đây)'}</span>
                  <span className="text-xs text-primary font-bold">{settings.campaignAgeDaysMin} {language === 'ko' ? '일 전' : 'ngày trước'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="7"
                  value={settings.campaignAgeDaysMin}
                  onChange={(e) => updateSettings({ campaignAgeDaysMin: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최대 (오래됨)' : 'Tối đa (cũ hơn)'}</span>
                  <span className="text-xs text-secondary font-bold">{settings.campaignAgeDaysMax} {language === 'ko' ? '일 전' : 'ngày trước'}</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="30"
                  value={settings.campaignAgeDaysMax}
                  onChange={(e) => updateSettings({ campaignAgeDaysMax: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '오늘이 아니라 며칠 전에 생성된 것처럼 보이게 (더 리얼함)' : 'Làm cho trông như được tạo vài ngày trước, không phải hôm nay (thực tế hơn)'}
            </div>
          </div>

          {/* 마감일 범위 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              ⏰ {language === 'ko' ? `마감일까지 남은 기간: ${settings.deadlineDaysMin}일 ~ ${settings.deadlineDaysMax}일` : `Thời gian còn lại đến hạn chót: ${settings.deadlineDaysMin} ~ ${settings.deadlineDaysMax} ngày`}
            </label>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최소 (긴박)' : 'Tối thiểu (gấp)'}</span>
                  <span className="text-xs text-error font-bold">{settings.deadlineDaysMin} {language === 'ko' ? '일' : 'ngày'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={settings.deadlineDaysMin}
                  onChange={(e) => updateSettings({ deadlineDaysMin: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-error"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{language === 'ko' ? '최대 (여유)' : 'Tối đa (thoải mái)'}</span>
                  <span className="text-xs text-success font-bold">{settings.deadlineDaysMax} {language === 'ko' ? '일' : 'ngày'}</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="60"
                  value={settings.deadlineDaysMax}
                  onChange={(e) => updateSettings({ deadlineDaysMax: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-success"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '마감이 임박한 캠페인이 있으면 긴박감 조성 (FOMO 효과)' : 'Tạo cảm giác khẩn cấp nếu có chiến dịch gần đến hạn (hiệu ứng FOMO)'}
            </div>
          </div>

          {/* 예산 배율 */}
          <div className="mb-4 p-3 bg-dark-600 rounded-lg">
            <label className="text-sm font-semibold text-white mb-2 block">
              💰 {language === 'ko' ? '예산 배율' : 'Hệ số ngân sách'}: <span className="text-yellow-400 text-xl">x{settings.budgetMultiplier.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.budgetMultiplier}
              onChange={(e) => updateSettings({ budgetMultiplier: parseFloat(e.target.value) })}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>x0.5 ({language === 'ko' ? '저가' : 'Giá thấp'})</span>
              <span>x1.0 ({language === 'ko' ? '원래' : 'Gốc'})</span>
              <span>x2.0 ({language === 'ko' ? '고가' : 'Giá cao'})</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              💡 {language === 'ko' ? '모든 캠페인 예산에 곱해지는 배율 (높으면 고급 캠페인처럼 보임)' : 'Hệ số nhân cho tất cả ngân sách chiến dịch (cao hơn trông như chiến dịch cao cấp)'}
            </div>
          </div>

          {/* 프리셋 버튼 */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateSettings({
                applicantsMin: 15,
                applicantsMax: 40,
                demoApplicantsMin: 4,
                demoApplicantsMax: 8,
                selectionRate: 25,
                campaignAgeDaysMin: 0,
                campaignAgeDaysMax: 3,
                deadlineDaysMin: 3,
                deadlineDaysMax: 14,
                budgetMultiplier: 0.8,
              })}
              className="btn btn-secondary py-2 text-xs"
            >
              🔥 {language === 'ko' ? '신생 플랫폼' : 'Nền tảng mới'}
            </button>
            <button
              onClick={() => updateSettings({
                applicantsMin: 30,
                applicantsMax: 80,
                demoApplicantsMin: 7,
                demoApplicantsMax: 15,
                selectionRate: 20,
                campaignAgeDaysMin: 1,
                campaignAgeDaysMax: 7,
                deadlineDaysMin: 5,
                deadlineDaysMax: 30,
                budgetMultiplier: 1.0,
              })}
              className="btn btn-primary py-2 text-xs"
            >
              ⭐ {language === 'ko' ? '인기 플랫폼' : 'Nền tảng phổ biến'}
            </button>
            <button
              onClick={() => updateSettings({
                applicantsMin: 50,
                applicantsMax: 150,
                demoApplicantsMin: 10,
                demoApplicantsMax: 20,
                selectionRate: 15,
                campaignAgeDaysMin: 2,
                campaignAgeDaysMax: 14,
                deadlineDaysMin: 7,
                deadlineDaysMax: 45,
                budgetMultiplier: 1.3,
              })}
              className="btn bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 text-xs"
            >
              👑 {language === 'ko' ? '프리미엄' : 'Cao cấp'}
            </button>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGenerateNow}
            disabled={isGenerating || settings.categories.length === 0}
            className="btn btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                {language === 'ko' ? '생성 중...' : 'Đang tạo...'}
              </>
            ) : (
              <>
                <Zap size={20} />
                {language === 'ko' ? '지금 즉시 생성' : 'Tạo ngay bây giờ'}
              </>
            )}
          </button>

          <button
            onClick={handleClearAll}
            disabled={campaigns.length === 0}
            className="btn btn-error py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Trash2 size={20} />
            {language === 'ko' ? '모두 삭제' : 'Xóa tất cả'}
          </button>
        </div>

        {/* 카테고리별 통계 */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
{language === 'ko' ? '카테고리별 통계' : 'Thống kê theo danh mục'}
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.byCategory)
              .filter(([_, count]) => count > 0)
              .sort(([_, a], [__, b]) => b - a)
              .map(([category, count]) => {
                const label = CATEGORY_LABELS[category as Category];
                const percentage = Math.round((count / stats.totalGenerated) * 100);
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div className="w-24 text-sm text-gray-300">
                      {language === 'ko' ? label.ko : label.vi}
                    </div>
                    <div className="flex-1 h-6 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs font-bold text-white">{count}</span>
                      </div>
                    </div>
                    <div className="w-12 text-right text-xs text-gray-400">{percentage}%</div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 생성된 캠페인 목록 */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-3">
{language === 'ko' ? `생성된 캠페인 목록 (${campaigns.length}개)` : `Danh sách chiến dịch đã tạo (${campaigns.length})`}
          </h3>

          {campaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'ko' ? <>아직 생성된 캠페인이 없습니다.<br />위에서 "지금 즉시 생성" 버튼을 눌러보세요!</> : <>Chưa có chiến dịch nào được tạo.<br />Nhấn nút "Tạo ngay bây giờ" ở trên!</>}
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {campaigns
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-3 bg-dark-600 rounded-lg border border-dark-500 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={campaign.thumbnail}
                        alt={campaign.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white mb-1 truncate">
                          {campaign.title}
                        </h4>
                        <p className="text-xs text-gray-400 mb-1">{campaign.company}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-primary font-semibold">
                            {(campaign.budget / 1000).toFixed(0)}K VND
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">
                            {campaign.applicants}{language === 'ko' ? '명 지원' : ' người đăng ký'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded-full font-bold">
                            🎭 DEMO
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {new Date(campaign.createdAt).toLocaleString('ko-KR')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="btn-icon text-error hover:bg-error/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* 경고 메시지 */}
        <div className="card bg-warning/10 border-warning/30">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-warning mb-1">{language === 'ko' ? '주의사항' : 'Lưu ý'}</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• {language === 'ko' ? '이 페이지는 절대 일반 유저에게 노출되지 않습니다' : 'Trang này tuyệt đối không được hiển thị với người dùng thông thường'}</li>
                <li>• {language === 'ko' ? '자동 생성된 캠페인은 일반 캠페인과 완전히 동일하게 보입니다' : 'Chiến dịch tạo tự động trông giống hệt chiến dịch thông thường'}</li>
                <li>• {language === 'ko' ? '자동 생성은 매일 자정(00:00)에 실행됩니다' : 'Tạo tự động chạy mỗi ngày lúc nửa đêm (00:00)'}</li>
                <li>• {language === 'ko' ? '최대 100개까지 유지되며, 오래된 것부터 자동 삭제됩니다' : 'Tối đa 100 chiến dịch, chiến dịch cũ nhất sẽ bị xóa tự động'}</li>
                <li>• {language === 'ko' ? '모든 캠페인은 100% 베트남 로컬 비즈니스입니다' : 'Tất cả chiến dịch đều là doanh nghiệp địa phương Việt Nam 100%'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

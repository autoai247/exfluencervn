'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, User, DollarSign } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const CATEGORIES = [
  { value: 'beauty', labelKo: '💄 뷰티', labelVi: '💄 Làm đẹp' },
  { value: 'fashion', labelKo: '👗 패션', labelVi: '👗 Thời trang' },
  { value: 'food', labelKo: '🍜 음식', labelVi: '🍜 Ẩm thực' },
  { value: 'travel', labelKo: '✈️ 여행', labelVi: '✈️ Du lịch' },
  { value: 'fitness', labelKo: '💪 피트니스', labelVi: '💪 Thể dục' },
  { value: 'tech', labelKo: '📱 테크', labelVi: '📱 Công nghệ' },
  { value: 'gaming', labelKo: '🎮 게이밍', labelVi: '🎮 Gaming' },
  { value: 'lifestyle', labelKo: '🌟 라이프스타일', labelVi: '🌟 Lifestyle' },
  { value: 'baby', labelKo: '👶 육아', labelVi: '👶 Mẹ & Bé' },
  { value: 'pet', labelKo: '🐾 반려동물', labelVi: '🐾 Thú cưng' },
  { value: 'home', labelKo: '🏠 인테리어', labelVi: '🏠 Nội thất' },
  { value: 'finance', labelKo: '💰 재테크', labelVi: '💰 Tài chính' },
];

const PRICE_RANGES = [
  { value: 'under_500k', labelKo: '50만 이하', labelVi: 'Dưới 500K' },
  { value: '500k_1m', labelKo: '50만 – 100만', labelVi: '500K – 1 triệu' },
  { value: '1m_3m', labelKo: '100만 – 300만', labelVi: '1 – 3 triệu' },
  { value: '3m_5m', labelKo: '300만 – 500만', labelVi: '3 – 5 triệu' },
  { value: '5m_10m', labelKo: '500만 – 1000만', labelVi: '5 – 10 triệu' },
  { value: 'over_10m', labelKo: '1000만 이상', labelVi: 'Trên 10 triệu' },
  { value: 'negotiable', labelKo: '협의 가능', labelVi: 'Thỏa thuận' },
];

export default function EditProfilePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    // Basic
    name: 'Nguyen Thi Lan',
    phone: '+84 90 123 4567',
    zalo: '+84 90 123 4567',
    bio: 'Influencer Beauty & Lifestyle tại TP.HCM.',

    // Social Media
    instagram: '',
    instagramFollowers: '',
    tiktok: '',
    tiktokFollowers: '',
    youtube: '',
    youtubeFollowers: '',
    facebook: '',
    facebookFollowers: '',

    // Demographics
    gender: 'female',
    ageRange: '25-34',
    location: 'Hồ Chí Minh',

    // Categories (max 5)
    categories: ['beauty', 'lifestyle'] as string[],

    // Campaign pricing
    pricePerPost: 'negotiable',

    // Lifestyle — simple
    vehicle: '',           // none / motorbike / car / both
    maritalStatus: '',     // single / dating / married / divorced
    hasChildren: false,
    travelFrequency: '',   // rarely / 1_2_year / often
    occupation: '',

    // Extra — only shown when relevant category selected
    hasPets: false,
    skinType: '',         // beauty only
    height: '',           // fashion only
    weight: '',           // fashion only
  });

  const toggleCategory = (cat: string) => {
    if (formData.categories.includes(cat)) {
      setFormData({ ...formData, categories: formData.categories.filter(c => c !== cat) });
    } else {
      setFormData({ ...formData, categories: [...formData.categories, cat] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'ko' ? '프로필이 성공적으로 업데이트되었습니다!' : 'Đã cập nhật hồ sơ thành công!');
    router.back();
  };

  const isBeauty = formData.categories.includes('beauty');
  const isFashion = formData.categories.includes('fashion');
  const isPet = formData.categories.includes('pet');

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-white">{t.profile.edit || 'Chỉnh sửa hồ sơ'}</h1>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary text-sm">
            <Save size={18} className="mr-1" />
            {t.common.save || 'Lưu'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-mobile space-y-8 py-6">

        {/* ─── 1. Basic Info ─── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <User size={14} /> {language === 'ko' ? '기본 정보' : 'Thông tin cơ bản'}
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '이름' : 'Họ và tên'} <span className="text-error">*</span></label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nguyen Thi Lan"
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '전화번호' : 'Số điện thoại'}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+84 90 123 4567"
                className="input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Zalo <span className="text-error">*</span></label>
              <input
                type="tel"
                required
                value={formData.zalo}
                onChange={(e) => setFormData({ ...formData, zalo: e.target.value })}
                placeholder="+84 90 123 4567"
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '자기소개' : 'Giới thiệu ngắn'}</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 150) })}
              rows={2}
              placeholder={language === 'ko' ? '예: HCM의 뷰티 크리에이터, 스킨케어 및 메이크업 리뷰 전문...' : 'VD: Beauty creator tại HCM, chuyên review skincare và makeup...'}
              className="input resize-none"
            />
            <p className="text-xs text-gray-600 text-right mt-0.5">{formData.bio.length}/150</p>
          </div>
        </div>

        {/* ─── 2. SNS Accounts ─── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{language === 'ko' ? 'SNS 계정' : 'Tài khoản mạng xã hội'}</h3>
          <p className="text-xs text-gray-500 -mt-2">{language === 'ko' ? '활동 중인 채널을 입력하세요' : 'Điền các kênh bạn đang hoạt động'}</p>

          {[
            { key: 'instagram', followersKey: 'instagramFollowers', icon: <FaInstagram className="text-pink-500" />, label: 'Instagram', placeholder: 'https://instagram.com/username' },
            { key: 'tiktok', followersKey: 'tiktokFollowers', icon: <FaTiktok className="text-white" />, label: 'TikTok', placeholder: 'https://tiktok.com/@username' },
            { key: 'youtube', followersKey: 'youtubeFollowers', icon: <FaYoutube className="text-red-500" />, label: 'YouTube', placeholder: 'https://youtube.com/@channel' },
            { key: 'facebook', followersKey: 'facebookFollowers', icon: <FaFacebook className="text-blue-500" />, label: 'Facebook', placeholder: 'https://facebook.com/username' },
          ].map(({ key, followersKey, icon, label, placeholder }) => (
            <div key={key} className="bg-dark-600 rounded-xl p-4 border border-dark-500">
              <div className="flex items-center gap-2 mb-3">
                {icon}
                <span className="text-sm font-semibold text-white">{label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="url"
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="input col-span-2 text-sm"
                />
                <input
                  type="number"
                  value={(formData as any)[followersKey]}
                  onChange={(e) => setFormData({ ...formData, [followersKey]: e.target.value })}
                  placeholder="Followers"
                  className="input text-sm"
                  min="0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. Demographics ─── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{language === 'ko' ? '개인 정보' : 'Thông tin cá nhân'}</h3>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '성별' : 'Giới tính'} <span className="text-error">*</span></label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="input"
              >
                <option value="">{language === 'ko' ? '선택' : 'Chọn'}</option>
                <option value="female">{language === 'ko' ? '여성' : 'Nữ'}</option>
                <option value="male">{language === 'ko' ? '남성' : 'Nam'}</option>
                <option value="other">{language === 'ko' ? '기타' : 'Khác'}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '연령대' : 'Độ tuổi'} <span className="text-error">*</span></label>
              <select
                required
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="input"
              >
                <option value="">{language === 'ko' ? '선택' : 'Chọn'}</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '도시' : 'Thành phố'} <span className="text-error">*</span></label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input"
              >
                <option value="">{language === 'ko' ? '선택' : 'Chọn'}</option>
                <option value="Hồ Chí Minh">{language === 'ko' ? '호치민' : 'TP.HCM'}</option>
                <option value="Hà Nội">{language === 'ko' ? '하노이' : 'Hà Nội'}</option>
                <option value="Đà Nẵng">{language === 'ko' ? '다낭' : 'Đà Nẵng'}</option>
                <option value="Cần Thơ">{language === 'ko' ? '껀터' : 'Cần Thơ'}</option>
                <option value="Hải Phòng">{language === 'ko' ? '하이퐁' : 'Hải Phòng'}</option>
                <option value="Bình Dương">{language === 'ko' ? '빈즈엉' : 'Bình Dương'}</option>
                <option value="Khác">{language === 'ko' ? '기타' : 'Khác'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* ─── 4. Content Categories ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{language === 'ko' ? '콘텐츠 분야' : 'Lĩnh vực nội dung'} <span className="text-error">*</span></h3>
            <span className="text-xs font-semibold text-gray-500">
              {formData.categories.length}{language === 'ko' ? '개 선택' : ' đã chọn'}
            </span>
          </div>
          <p className="text-xs text-gray-500">{language === 'ko' ? '해당하는 분야를 모두 선택하세요' : 'Chọn tất cả lĩnh vực phù hợp với bạn'}</p>

          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const selected = formData.categories.includes(cat.value);
              const disabled = false;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => toggleCategory(cat.value)}
                  disabled={disabled}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all text-center ${
                    selected
                      ? 'bg-primary/20 border-primary text-white'
                      : disabled
                      ? 'bg-dark-700 border-dark-600 text-gray-600 cursor-not-allowed'
                      : 'bg-dark-600 border-dark-500 text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {language === 'ko' ? cat.labelKo : cat.labelVi}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 5. Lifestyle ─── */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{language === 'ko' ? '라이프스타일 정보' : 'Thông tin cuộc sống'}</h3>
          <p className="text-xs text-gray-500 -mt-2">{language === 'ko' ? '캠페인 매칭 향상에 도움이 됩니다' : 'Giúp ghép chiến dịch phù hợp hơn (xe, du lịch, gia đình...)'}</p>

          {/* Vehicle */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{language === 'ko' ? '🚗 이동 수단' : '🚗 Phương tiện di chuyển'}</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: '', labelKo: '없음', labelVi: 'Không có' },
                { value: 'motorbike', labelKo: '🛵 오토바이', labelVi: '🛵 Xe máy' },
                { value: 'car', labelKo: '🚗 자동차', labelVi: '🚗 Ô tô' },
                { value: 'both', labelKo: '둘 다', labelVi: 'Cả hai' },
              ].map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, vehicle: v.value })}
                  className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                    formData.vehicle === v.value
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-dark-600 border-dark-500 text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {language === 'ko' ? v.labelKo : v.labelVi}
                </button>
              ))}
            </div>
          </div>

          {/* Marital status + children */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">💑 {language === 'ko' ? '혼인 상태' : 'Tình trạng hôn nhân'}</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {(language === 'ko' ? [
                { value: 'single', label: '미혼' },
                { value: 'dating', label: '연애 중' },
                { value: 'married', label: '기혼' },
                { value: 'divorced', label: '이혼' },
              ] : [
                { value: 'single', label: 'Độc thân' },
                { value: 'dating', label: 'Có đôi' },
                { value: 'married', label: 'Kết hôn' },
                { value: 'divorced', label: 'Đã ly hôn' },
              ]).map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, maritalStatus: m.value })}
                  className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                    formData.maritalStatus === m.value
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-dark-600 border-dark-500 text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                className="w-5 h-5 rounded border-gray-600 text-primary"
              />
              <span className="text-sm text-white">{language === 'ko' ? '👶 어린 자녀를 키우고 있습니다' : '👶 Tôi đang nuôi con nhỏ'}</span>
            </label>
          </div>

          {/* Travel frequency */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{language === 'ko' ? '✈️ 여행 빈도' : '✈️ Tần suất du lịch'}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'rarely', labelKo: '드물게', labelVi: 'Hiếm khi' },
                { value: '1_2_year', labelKo: '연 1-2회', labelVi: '1-2 lần/năm' },
                { value: 'often', labelKo: '자주', labelVi: 'Thường xuyên' },
              ].map((tf) => (
                <button
                  key={tf.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, travelFrequency: tf.value })}
                  className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                    formData.travelFrequency === tf.value
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-dark-600 border-dark-500 text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {language === 'ko' ? tf.labelKo : tf.labelVi}
                </button>
              ))}
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{language === 'ko' ? '💼 직업' : '💼 Nghề nghiệp'}</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="input"
            >
              <option value="">{language === 'ko' ? '공개하지 않음' : 'Không muốn tiết lộ'}</option>
              <option value="student">{language === 'ko' ? '학생' : 'Sinh viên'}</option>
              <option value="office">{language === 'ko' ? '사무직' : 'Nhân viên văn phòng'}</option>
              <option value="self_employed">{language === 'ko' ? '자영업' : 'Tự kinh doanh'}</option>
              <option value="creator">{language === 'ko' ? '크리에이터 / 아티스트' : 'Creator / Nghệ sĩ'}</option>
              <option value="healthcare">{language === 'ko' ? '의료 / 간호' : 'Y tế / Điều dưỡng'}</option>
              <option value="education">{language === 'ko' ? '교육' : 'Giáo dục'}</option>
              <option value="homemaker">{language === 'ko' ? '전업주부' : 'Nội trợ'}</option>
              <option value="other">{language === 'ko' ? '기타' : 'Khác'}</option>
            </select>
          </div>
        </div>

        {/* ─── 7. Category-specific extras ─── */}
        {(isBeauty || isFashion || isPet) && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{language === 'ko' ? '추가 정보' : 'Thông tin bổ sung'}</h3>

            {/* Beauty: skin type */}
            {isBeauty && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '💄 피부 타입' : '💄 Loại da'}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'dry', labelKo: '건성', labelVi: 'Da khô' },
                    { value: 'oily', labelKo: '지성', labelVi: 'Da dầu' },
                    { value: 'combination', labelKo: '복합성', labelVi: 'Da hỗn hợp' },
                    { value: 'sensitive', labelKo: '민감성', labelVi: 'Da nhạy cảm' },
                    { value: 'normal', labelKo: '보통', labelVi: 'Da thường' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, skinType: formData.skinType === s.value ? '' : s.value })}
                      className={`px-3 py-1.5 rounded-full text-xs border-2 transition-all ${
                        formData.skinType === s.value
                          ? 'bg-pink-500/20 border-pink-500 text-white'
                          : 'bg-dark-600 border-dark-500 text-gray-300'
                      }`}
                    >
                      {language === 'ko' ? s.labelKo : s.labelVi}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fashion: height/weight */}
            {isFashion && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '👗 키 (cm)' : '👗 Chiều cao (cm)'}</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="165"
                    className="input"
                    min="140"
                    max="220"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">{language === 'ko' ? '몸무게 (kg)' : 'Cân nặng (kg)'}</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="52"
                    className="input"
                    min="30"
                    max="150"
                  />
                </div>
              </div>
            )}

            {/* Pet */}
            {isPet && (
              <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasPets}
                  onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-600 text-primary"
                />
                <span className="text-sm text-white">{language === 'ko' ? '🐾 반려동물을 키우고 있습니다' : '🐾 Tôi đang nuôi thú cưng'}</span>
              </label>
            )}
          </div>
        )}

        {/* ─── 8. Pricing ─── */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={14} /> {language === 'ko' ? '희망 게시물 단가' : 'Mức phí mong muốn / bài đăng'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PRICE_RANGES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setFormData({ ...formData, pricePerPost: p.value })}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                  formData.pricePerPost === p.value
                    ? 'bg-accent/20 border-accent text-white'
                    : 'bg-dark-600 border-dark-500 text-gray-300 hover:border-accent/50'
                }`}
              >
                {language === 'ko' ? p.labelKo : p.labelVi}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">{language === 'ko' ? '참고용이며, 광고주와 협의 가능합니다' : 'Chỉ mang tính tham khảo, có thể thỏa thuận với nhà QC'}</p>
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-base font-black">
          <Save size={20} className="mr-2" />
          {language === 'ko' ? '프로필 저장' : 'Lưu hồ sơ'}
        </button>

      </form>
    </div>
  );
}

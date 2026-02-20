'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, User, DollarSign } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const CATEGORIES = [
  { value: 'beauty', label: '💄 Làm đẹp' },
  { value: 'fashion', label: '👗 Thời trang' },
  { value: 'food', label: '🍜 Ẩm thực' },
  { value: 'travel', label: '✈️ Du lịch' },
  { value: 'fitness', label: '💪 Thể dục' },
  { value: 'tech', label: '📱 Công nghệ' },
  { value: 'gaming', label: '🎮 Gaming' },
  { value: 'lifestyle', label: '🌟 Lifestyle' },
  { value: 'baby', label: '👶 Mẹ & Bé' },
  { value: 'pet', label: '🐾 Thú cưng' },
  { value: 'home', label: '🏠 Nội thất' },
  { value: 'finance', label: '💰 Tài chính' },
];

const PRICE_RANGES = [
  { value: 'under_500k', label: 'Dưới 500K' },
  { value: '500k_1m', label: '500K – 1 triệu' },
  { value: '1m_3m', label: '1 – 3 triệu' },
  { value: '3m_5m', label: '3 – 5 triệu' },
  { value: '5m_10m', label: '5 – 10 triệu' },
  { value: 'over_10m', label: 'Trên 10 triệu' },
  { value: 'negotiable', label: 'Thỏa thuận' },
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
    } else if (formData.categories.length < 5) {
      setFormData({ ...formData, categories: [...formData.categories, cat] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã cập nhật hồ sơ thành công!');
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
            <User size={14} /> Thông tin cơ bản
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Họ và tên <span className="text-error">*</span></label>
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
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Số điện thoại</label>
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
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Giới thiệu ngắn</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 150) })}
              rows={2}
              placeholder="VD: Beauty creator tại HCM, chuyên review skincare và makeup..."
              className="input resize-none"
            />
            <p className="text-xs text-gray-600 text-right mt-0.5">{formData.bio.length}/150</p>
          </div>
        </div>

        {/* ─── 2. SNS Accounts ─── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tài khoản mạng xã hội</h3>
          <p className="text-xs text-gray-500 -mt-2">Điền các kênh bạn đang hoạt động</p>

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
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thông tin cá nhân</h3>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Giới tính <span className="text-error">*</span></label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="input"
              >
                <option value="">Chọn</option>
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Độ tuổi <span className="text-error">*</span></label>
              <select
                required
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="input"
              >
                <option value="">Chọn</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Thành phố <span className="text-error">*</span></label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input"
              >
                <option value="">Chọn</option>
                <option value="Hồ Chí Minh">TP.HCM</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>
        </div>

        {/* ─── 4. Content Categories ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lĩnh vực nội dung <span className="text-error">*</span></h3>
            <span className={`text-xs font-semibold ${formData.categories.length >= 5 ? 'text-warning' : 'text-gray-500'}`}>
              {formData.categories.length}/5
            </span>
          </div>
          <p className="text-xs text-gray-500">Chọn tối đa 5 lĩnh vực bạn tạo nội dung</p>

          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const selected = formData.categories.includes(cat.value);
              const disabled = !selected && formData.categories.length >= 5;
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
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 5. Lifestyle ─── */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thông tin cuộc sống</h3>
          <p className="text-xs text-gray-500 -mt-2">Giúp ghép chiến dịch phù hợp hơn (xe, du lịch, gia đình...)</p>

          {/* Vehicle */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">🚗 Phương tiện di chuyển</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: '', label: 'Không có' },
                { value: 'motorbike', label: '🛵 Xe máy' },
                { value: 'car', label: '🚗 Ô tô' },
                { value: 'both', label: 'Cả hai' },
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
                  {v.label}
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
              <span className="text-sm text-white">👶 Tôi đang nuôi con nhỏ</span>
            </label>
          </div>

          {/* Travel frequency */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">✈️ Tần suất du lịch</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'rarely', label: 'Hiếm khi' },
                { value: '1_2_year', label: '1-2 lần/năm' },
                { value: 'often', label: 'Thường xuyên' },
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
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">💼 Nghề nghiệp</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="input"
            >
              <option value="">Không muốn tiết lộ</option>
              <option value="student">Sinh viên</option>
              <option value="office">Nhân viên văn phòng</option>
              <option value="self_employed">Tự kinh doanh</option>
              <option value="creator">Creator / Nghệ sĩ</option>
              <option value="healthcare">Y tế / Điều dưỡng</option>
              <option value="education">Giáo dục</option>
              <option value="homemaker">Nội trợ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* ─── 7. Category-specific extras ─── */}
        {(isBeauty || isFashion || isPet) && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thông tin bổ sung</h3>

            {/* Beauty: skin type */}
            {isBeauty && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">💄 Loại da</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'dry', label: 'Da khô' },
                    { value: 'oily', label: 'Da dầu' },
                    { value: 'combination', label: 'Da hỗn hợp' },
                    { value: 'sensitive', label: 'Da nhạy cảm' },
                    { value: 'normal', label: 'Da thường' },
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
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fashion: height/weight */}
            {isFashion && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">👗 Chiều cao (cm)</label>
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
                  <label className="text-sm font-medium text-gray-300 mb-1.5 block">Cân nặng (kg)</label>
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
                <span className="text-sm text-white">🐾 Tôi đang nuôi thú cưng</span>
              </label>
            )}
          </div>
        )}

        {/* ─── 8. Pricing ─── */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={14} /> Mức phí mong muốn / bài đăng
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
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">Chỉ mang tính tham khảo, có thể thỏa thuận với nhà QC</p>
        </div>

        <button type="submit" className="btn btn-primary w-full py-4 text-base font-black">
          <Save size={20} className="mr-2" />
          Lưu hồ sơ
        </button>

      </form>
    </div>
  );
}

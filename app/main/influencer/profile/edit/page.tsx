'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, User, Heart, Baby, Shirt, Utensils, Dumbbell, PawPrint, Car, Home, Briefcase, Smartphone, Palette } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function EditProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    // Basic Info
    name: 'Nguyen Thi Lan',
    email: 'lan.nguyen@example.com',
    phone: '+84 90 123 4567',
    zalo: '+84 90 123 4567',
    bio: 'Influencer Beauty & Lifestyle tại TP.HCM.',
    location: 'Hồ Chí Minh',

    // Social Media
    instagram: '',
    instagramFollowers: '',
    tiktok: '',
    tiktokFollowers: '',
    youtube: '',
    youtubeFollowers: '',
    facebook: '',
    facebookFollowers: '',

    // Extended Profile - Demographics
    gender: 'female',
    ageRange: '25-34',
    maritalStatus: 'single',
    marriageYear: '',
    education: 'bachelor',
    occupation: 'creative',
    occupationDetail: '',
    monthlyIncome: 'prefer_not_say',
    categories: ['beauty', 'lifestyle'],

    // Lifestyle
    hasVehicle: false,
    vehicleType: [] as string[],
    vehicleBrand: '',
    housingType: 'apartment',
    ownershipStatus: 'rented',

    // Parenting
    hasChildren: false,
    childrenAges: [] as string[],

    // Beauty
    skinType: 'combination',
    skinTone: 'light',
    hairType: 'straight',
    hairColor: 'black',

    // Fashion
    topSize: 'M',
    bottomSize: 'M',
    shoeSize: '38',
    fashionStyle: ['casual', 'minimalist'] as string[],
    height: '',
    weight: '',

    // Food
    dietaryRestrictions: ['none'] as string[],
    favoriteCuisines: [] as string[],

    // Fitness
    bodyType: 'athletic',
    fitnessLevel: 'intermediate',
    exerciseFrequency: '3_4_week',
    preferredWorkout: [] as string[],

    // Pets
    hasPets: false,
    petTypes: [] as string[],
    petBreeds: [] as string[],

    // Technology
    phoneModel: '',
    laptopBrand: '',
    smartDevices: [] as string[],

    // Hobbies
    hobbies: [] as string[],
    travelFrequency: '1_2_year',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to API
    alert(t.profile.profileUpdated || 'Đã cập nhật hồ sơ thành công!');
    router.back();
  };

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-white">{t.profile.edit}</h1>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary text-sm">
            <Save size={18} className="mr-1" />
            {t.common.save}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-mobile space-y-6 py-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400">{t.profile.basic}</h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.name || 'Họ và tên'}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.email || 'Email'}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.phone || 'Số điện thoại'}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Zalo <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              value={formData.zalo}
              onChange={(e) => setFormData({ ...formData, zalo: e.target.value })}
              placeholder="+84 90 123 4567"
              className="input"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              {t.profile.zaloDescription || 'Nhập số Zalo (ứng dụng nhắn tin phổ biến tại Việt Nam)'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.bio || 'Giới thiệu bản thân'}</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>

        {/* Social Media URLs */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400">{t.profile.socialMediaUrls || 'SNS URL'}</h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaInstagram className="text-pink-500" />
              Instagram
            </label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/username"
              className="input mb-2"
            />
            <input
              type="number"
              value={formData.instagramFollowers}
              onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
              placeholder={t.profile.followerCount || 'Số người theo dõi'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || 'Cập nhật lần cuối'}: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaTiktok className="text-black" />
              TikTok
            </label>
            <input
              type="url"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@username"
              className="input mb-2"
            />
            <input
              type="number"
              value={formData.tiktokFollowers}
              onChange={(e) => setFormData({ ...formData, tiktokFollowers: e.target.value })}
              placeholder={t.profile.followerCount || 'Số người theo dõi'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || 'Cập nhật lần cuối'}: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaYoutube className="text-red-500" />
              YouTube
            </label>
            <input
              type="url"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              placeholder="https://youtube.com/@username"
              className="input mb-2"
            />
            <input
              type="number"
              value={formData.youtubeFollowers}
              onChange={(e) => setFormData({ ...formData, youtubeFollowers: e.target.value })}
              placeholder={t.profile.subscriberCount || 'Số người đăng ký'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || 'Cập nhật lần cuối'}: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaFacebook className="text-blue-500" />
              Facebook
            </label>
            <input
              type="url"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              placeholder="https://facebook.com/username"
              className="input mb-2"
            />
            <input
              type="number"
              value={formData.facebookFollowers}
              onChange={(e) => setFormData({ ...formData, facebookFollowers: e.target.value })}
              placeholder={t.profile.followerCount || 'Số người theo dõi'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || 'Cập nhật lần cuối'}: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
        </div>

        {/* Demographics Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <User size={16} />
            {t.profile.demographic}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.gender || 'Giới tính'} *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="input"
                required
              >
                <option value="">{t.profile.selectOption || 'Chọn'}</option>
                <option value="male">{t.profile.male || 'Nam'}</option>
                <option value="female">{t.profile.female || 'Nữ'}</option>
                <option value="other">{t.profile.other || 'Khác'}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.ageRange || 'Độ tuổi'} *</label>
              <select
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="input"
                required
              >
                <option value="">{t.profile.selectOption || 'Chọn'}</option>
                <option value="18-24">18-24{t.profile.years || ' tuổi'}</option>
                <option value="25-34">25-34{t.profile.years || ' tuổi'}</option>
                <option value="35-44">35-44{t.profile.years || ' tuổi'}</option>
                <option value="45-54">45-54{t.profile.years || ' tuổi'}</option>
                <option value="55+">55{t.profile.yearsAndAbove || '+ tuổi'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.location || 'Địa điểm'} *</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input"
              required
            >
              <option value="">Chọn thành phố</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Tình trạng hôn nhân</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="single">Độc thân</option>
                <option value="married">Đã kết hôn</option>
                <option value="divorced">Đã ly hôn</option>
                <option value="widowed">Góa</option>
              </select>
            </div>

            {formData.maritalStatus === 'married' && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Năm kết hôn</label>
                <input
                  type="number"
                  value={formData.marriageYear}
                  onChange={(e) => setFormData({ ...formData, marriageYear: e.target.value })}
                  placeholder="2023"
                  className="input"
                  min="1950"
                  max={new Date().getFullYear()}
                />
                <p className="text-xs text-gray-500 mt-1">Dùng để ghép chiến dịch tân hôn</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Trình độ học vấn</label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="input"
            >
              <option value="">Không chọn</option>
              <option value="high_school">Tốt nghiệp THPT</option>
              <option value="associate">Cao đẳng</option>
              <option value="bachelor">Đại học</option>
              <option value="master">Thạc sĩ</option>
              <option value="doctorate">Tiến sĩ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Nghề nghiệp</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="input"
            >
              <option value="">Không chọn</option>
              <option value="student">Sinh viên</option>
              <option value="office_worker">Nhân viên văn phòng</option>
              <option value="self_employed">Tự kinh doanh</option>
              <option value="professional">Chuyên môn (bác sĩ, luật sư...)</option>
              <option value="creative">Creator / Nghệ sĩ</option>
              <option value="service">Dịch vụ</option>
              <option value="healthcare">Y tế / Điều dưỡng</option>
              <option value="education">Giáo dục</option>
              <option value="homemaker">Nội trợ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {formData.occupation && formData.occupation !== '' && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Chi tiết nghề (tùy chọn)</label>
              <input
                type="text"
                value={formData.occupationDetail}
                onChange={(e) => setFormData({ ...formData, occupationDetail: e.target.value })}
                placeholder="VD: Beauty Creator, Marketer, Y tá"
                className="input"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Thu nhập hàng tháng (tùy chọn)</label>
            <select
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
              className="input"
            >
              <option value="prefer_not_say">Không muốn tiết lộ</option>
              <option value="under_10m">Dưới 10 triệu VND</option>
              <option value="10m_20m">10 - 20 triệu VND</option>
              <option value="20m_30m">20 - 30 triệu VND</option>
              <option value="30m_50m">30 - 50 triệu VND</option>
              <option value="50m_100m">50 - 100 triệu VND</option>
              <option value="over_100m">Trên 100 triệu VND</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Dùng để ghép chiến dịch premium / luxury</p>
          </div>
        </div>

        {/* Lifestyle Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Home size={16} />
            {t.profile.lifestyle}
          </h3>

          <div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
              <input
                type="checkbox"
                checked={formData.hasVehicle}
                onChange={(e) => setFormData({ ...formData, hasVehicle: e.target.checked, vehicleType: e.target.checked ? formData.vehicleType : [], vehicleBrand: e.target.checked ? formData.vehicleBrand : '' })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Car size={18} className="text-primary" />
                <span className="text-sm text-white">{t.profile.hasVehicle || 'Có phương tiện di chuyển'}</span>
              </div>
            </label>
          </div>

          {formData.hasVehicle && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Loại phương tiện (chọn nhiều)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'sedan', label: 'Sedan' },
                    { value: 'suv', label: 'SUV' },
                    { value: 'truck', label: 'Xe tải / Pickup' },
                    { value: 'electric', label: 'Xe điện' },
                    { value: 'hybrid', label: 'Hybrid' },
                    { value: 'motorcycle', label: 'Mô tô' },
                    { value: 'scooter', label: 'Xe máy / Scooter' },
                  ].map((vehicle) => (
                    <label key={vehicle.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.vehicleType.includes(vehicle.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, vehicleType: [...formData.vehicleType, vehicle.value] });
                          } else {
                            setFormData({ ...formData, vehicleType: formData.vehicleType.filter(v => v !== vehicle.value) });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                      />
                      <span className="text-xs text-white">{vehicle.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Thương hiệu xe (tùy chọn)</label>
                <input
                  type="text"
                  value={formData.vehicleBrand}
                  onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                  placeholder="VD: Toyota, Honda, VinFast"
                  className="input"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Loại nhà ở</label>
              <select
                value={formData.housingType}
                onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="apartment">Chung cư / Căn hộ</option>
                <option value="house">Nhà riêng</option>
                <option value="villa">Biệt thự / Villa</option>
                <option value="studio">Phòng trọ / Studio</option>
                <option value="shared">Nhà ở chung</option>
                <option value="dormitory">Ký túc xá</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Hình thức sở hữu</label>
              <select
                value={formData.ownershipStatus}
                onChange={(e) => setFormData({ ...formData, ownershipStatus: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="owned">Sở hữu</option>
                <option value="rented">Thuê</option>
                <option value="family_owned">Của gia đình</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Dùng để ghép chiến dịch nội thất</p>
            </div>
          </div>
        </div>

        {/* Parenting Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Baby size={16} />
            {t.profile.parentingInfo || 'Thông tin nuôi con'}
          </h3>

          <div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked, childrenAges: e.target.checked ? formData.childrenAges : [] })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-white">{t.profile.hasChildren || 'Tôi đang nuôi con nhỏ'}</span>
            </label>
          </div>

          {formData.hasChildren && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Độ tuổi con (chọn nhiều)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: '0-1', label: '0-1 tuổi (Sơ sinh)' },
                  { value: '1-3', label: '1-3 tuổi (Mầm non)' },
                  { value: '3-6', label: '3-6 tuổi (Mẫu giáo)' },
                  { value: '6-12', label: '6-12 tuổi (Tiểu học)' },
                  { value: '12-18', label: '12-18 tuổi (THCS/THPT)' },
                ].map((age) => (
                  <label key={age.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.childrenAges.includes(age.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, childrenAges: [...formData.childrenAges, age.value] });
                        } else {
                          setFormData({ ...formData, childrenAges: formData.childrenAges.filter(a => a !== age.value) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{age.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Beauty Information */}
        {formData.categories.includes('beauty') && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <Heart size={16} />
              {t.profile.beauty}
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Loại da</label>
              <select
                value={formData.skinType}
                onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="dry">Da khô</option>
                <option value="oily">Da dầu</option>
                <option value="combination">Da hỗn hợp</option>
                <option value="sensitive">Da nhạy cảm</option>
                <option value="normal">Da thường</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Tông da</label>
              <select
                value={formData.skinTone}
                onChange={(e) => setFormData({ ...formData, skinTone: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="fair">Rất sáng</option>
                <option value="light">Sáng</option>
                <option value="medium">Trung bình</option>
                <option value="tan">Ngăm</option>
                <option value="dark">Rất ngăm</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Kiểu tóc</label>
                <select
                  value={formData.hairType}
                  onChange={(e) => setFormData({ ...formData, hairType: e.target.value })}
                  className="input"
                >
                  <option value="">Không chọn</option>
                  <option value="straight">Thẳng</option>
                  <option value="wavy">Gợn sóng</option>
                  <option value="curly">Xoăn</option>
                  <option value="coily">Xoăn tít</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Màu tóc</label>
                <select
                  value={formData.hairColor}
                  onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
                  className="input"
                >
                  <option value="">Không chọn</option>
                  <option value="black">Đen</option>
                  <option value="brown">Nâu</option>
                  <option value="blonde">Vàng</option>
                  <option value="red">Đỏ</option>
                  <option value="dyed">Nhuộm màu khác</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Fashion Information */}
        {formData.categories.includes('fashion') && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <Shirt size={16} />
              {t.profile.fashionInfo || 'Thông tin thời trang'}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Áo (Size)</label>
                <select
                  value={formData.topSize}
                  onChange={(e) => setFormData({ ...formData, topSize: e.target.value })}
                  className="input"
                >
                  <option value="">-</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Quần (Size)</label>
                <select
                  value={formData.bottomSize}
                  onChange={(e) => setFormData({ ...formData, bottomSize: e.target.value })}
                  className="input"
                >
                  <option value="">-</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Giày (Size)</label>
                <input
                  type="text"
                  value={formData.shoeSize}
                  onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                  placeholder="38"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Phong cách thời trang (chọn nhiều)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'casual', label: 'Casual' },
                  { value: 'formal', label: 'Formal' },
                  { value: 'streetwear', label: 'Streetwear' },
                  { value: 'vintage', label: 'Vintage' },
                  { value: 'minimalist', label: 'Minimalist' },
                  { value: 'bohemian', label: 'Bohemian' },
                  { value: 'sporty', label: 'Sporty' },
                  { value: 'elegant', label: 'Elegant' },
                ].map((style) => (
                  <label key={style.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.fashionStyle.includes(style.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, fashionStyle: [...formData.fashionStyle, style.value] });
                        } else {
                          setFormData({ ...formData, fashionStyle: formData.fashionStyle.filter(s => s !== style.value) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{style.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Chiều cao (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="165"
                  className="input"
                  min="100"
                  max="250"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Cân nặng (kg, tùy chọn)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="55"
                  className="input"
                  min="30"
                  max="200"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">Dùng cho chiến dịch cần chụp ảnh toàn thân</p>
          </div>
        )}

        {/* Food Information */}
        {formData.categories.includes('food') && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <Utensils size={16} />
              {t.profile.foodInfo || 'Thông tin ẩm thực'}
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Chế độ ăn (chọn nhiều)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'none', label: 'Không hạn chế' },
                  { value: 'vegetarian', label: 'Ăn chay' },
                  { value: 'vegan', label: 'Thuần chay' },
                  { value: 'halal', label: 'Halal' },
                  { value: 'kosher', label: 'Kosher' },
                  { value: 'gluten-free', label: 'Không gluten' },
                  { value: 'lactose-free', label: 'Không lactose' },
                ].map((diet) => (
                  <label key={diet.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(diet.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newRestrictions = diet.value === 'none'
                            ? ['none']
                            : formData.dietaryRestrictions.filter(r => r !== 'none').concat(diet.value);
                          setFormData({ ...formData, dietaryRestrictions: newRestrictions });
                        } else {
                          setFormData({ ...formData, dietaryRestrictions: formData.dietaryRestrictions.filter(r => r !== diet.value) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{diet.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Ẩm thực yêu thích (chọn nhiều)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'vietnamese', label: 'Ẩm thực Việt' },
                  { value: 'korean', label: 'Ẩm thực Hàn' },
                  { value: 'japanese', label: 'Ẩm thực Nhật' },
                  { value: 'western', label: 'Ẩm thực Tây' },
                  { value: 'chinese', label: 'Ẩm thực Trung' },
                  { value: 'thai', label: 'Ẩm thực Thái' },
                  { value: 'italian', label: 'Ẩm thực Ý' },
                  { value: 'other', label: 'Khác' },
                ].map((cuisine) => (
                  <label key={cuisine.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.favoriteCuisines.includes(cuisine.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, favoriteCuisines: [...formData.favoriteCuisines, cuisine.value] });
                        } else {
                          setFormData({ ...formData, favoriteCuisines: formData.favoriteCuisines.filter(c => c !== cuisine.value) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{cuisine.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fitness Information */}
        {formData.categories.includes('fitness') && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <Dumbbell size={16} />
              {t.profile.fitnessInfo || 'Thông tin thể dục'}
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Vóc dáng</label>
              <select
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="slim">Mảnh mai</option>
                <option value="athletic">Thể thao</option>
                <option value="average">Trung bình</option>
                <option value="curvy">Đầy đặn</option>
                <option value="muscular">Cơ bắp</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Trình độ thể dục</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="beginner">Mới bắt đầu</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
                <option value="professional">Chuyên nghiệp</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Tần suất tập luyện</label>
              <select
                value={formData.exerciseFrequency}
                onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
                className="input"
              >
                <option value="">Không chọn</option>
                <option value="rarely">Hiếm khi</option>
                <option value="1_2_week">1-2 lần/tuần</option>
                <option value="3_4_week">3-4 lần/tuần</option>
                <option value="5_6_week">5-6 lần/tuần</option>
                <option value="daily">Mỗi ngày</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Môn thể thao yêu thích (chọn nhiều)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'gym', label: 'Gym / Tập tạ' },
                  { value: 'yoga', label: 'Yoga' },
                  { value: 'running', label: 'Chạy bộ' },
                  { value: 'cycling', label: 'Đạp xe' },
                  { value: 'swimming', label: 'Bơi lội' },
                  { value: 'pilates', label: 'Pilates' },
                  { value: 'crossfit', label: 'CrossFit' },
                  { value: 'hiking', label: 'Leo núi' },
                  { value: 'dancing', label: 'Nhảy múa' },
                  { value: 'other', label: 'Khác' },
                ].map((workout) => (
                  <label key={workout.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.preferredWorkout.includes(workout.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, preferredWorkout: [...formData.preferredWorkout, workout.value] });
                        } else {
                          setFormData({ ...formData, preferredWorkout: formData.preferredWorkout.filter(w => w !== workout.value) });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-white">{workout.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Giúp ghép chiến dịch đồ thể thao / phụ kiện fitness</p>
            </div>
          </div>
        )}

        {/* Pet Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <PawPrint size={16} />
            {t.profile.petInfo || 'Thông tin thú cưng'}
          </h3>

          <div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
              <input
                type="checkbox"
                checked={formData.hasPets}
                onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked, petTypes: e.target.checked ? formData.petTypes : [] })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-white">{t.profile.hasPets || 'Tôi đang nuôi thú cưng'}</span>
            </label>
          </div>

          {formData.hasPets && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Loại thú cưng (chọn nhiều)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'dog', label: 'Chó' },
                    { value: 'cat', label: 'Mèo' },
                    { value: 'bird', label: 'Chim' },
                    { value: 'fish', label: 'Cá' },
                    { value: 'other', label: 'Khác' },
                  ].map((pet) => (
                    <label key={pet.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.petTypes.includes(pet.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, petTypes: [...formData.petTypes, pet.value] });
                          } else {
                            setFormData({ ...formData, petTypes: formData.petTypes.filter(p => p !== pet.value) });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                      />
                      <span className="text-xs text-white">{pet.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Giống thú cưng (tùy chọn)</label>
                <input
                  type="text"
                  value={formData.petBreeds?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    petBreeds: e.target.value.split(',').map(b => b.trim()).filter(b => b)
                  })}
                  placeholder="VD: Husky, Golden Retriever, Mèo Ba Tư (phân cách bằng dấu phẩy)"
                  className="input"
                />
                <p className="text-xs text-gray-500 mt-1">Dùng để ghép chiến dịch đồ dùng thú cưng theo giống</p>
              </div>
            </>
          )}
        </div>

        {/* Technology & Gadgets */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Smartphone size={16} />
            {t.profile.techGadgets || 'Công nghệ / Thiết bị'}
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Điện thoại đang dùng</label>
            <input
              type="text"
              value={formData.phoneModel}
              onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
              placeholder="VD: iPhone 15 Pro, Samsung Galaxy S24"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">Dùng cho chiến dịch phụ kiện điện thoại</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Thương hiệu laptop (tùy chọn)</label>
            <input
              type="text"
              value={formData.laptopBrand}
              onChange={(e) => setFormData({ ...formData, laptopBrand: e.target.value })}
              placeholder="VD: MacBook, Dell, Lenovo"
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Thiết bị thông minh đang sở hữu (chọn nhiều)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'smartwatch', label: 'Đồng hồ thông minh' },
                { value: 'earbuds', label: 'Tai nghe không dây' },
                { value: 'tablet', label: 'Máy tính bảng' },
                { value: 'smart_speaker', label: 'Loa thông minh' },
                { value: 'smart_tv', label: 'Smart TV' },
                { value: 'other', label: 'Khác' },
              ].map((device) => (
                <label key={device.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.smartDevices.includes(device.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, smartDevices: [...formData.smartDevices, device.value] });
                      } else {
                        setFormData({ ...formData, smartDevices: formData.smartDevices.filter(d => d !== device.value) });
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-white">{device.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Palette size={16} />
            {t.profile.hobbiesInterests || 'Sở thích & Quan tâm'}
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Sở thích (chọn nhiều)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'photography', label: 'Nhiếp ảnh / Quay phim' },
                { value: 'travel', label: 'Du lịch' },
                { value: 'cooking', label: 'Nấu ăn' },
                { value: 'gaming', label: 'Gaming' },
                { value: 'reading', label: 'Đọc sách' },
                { value: 'music', label: 'Âm nhạc' },
                { value: 'art', label: 'Nghệ thuật / Vẽ' },
                { value: 'gardening', label: 'Làm vườn' },
                { value: 'diy', label: 'DIY / Thủ công' },
                { value: 'other', label: 'Khác' },
              ].map((hobby) => (
                <label key={hobby.value} className="flex items-center gap-2 p-2 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.hobbies.includes(hobby.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, hobbies: [...formData.hobbies, hobby.value] });
                      } else {
                        setFormData({ ...formData, hobbies: formData.hobbies.filter(h => h !== hobby.value) });
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-white">{hobby.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Tần suất du lịch</label>
            <select
              value={formData.travelFrequency}
              onChange={(e) => setFormData({ ...formData, travelFrequency: e.target.value })}
              className="input"
            >
              <option value="rarely">Hiếm khi</option>
              <option value="1_2_year">1-2 lần/năm</option>
              <option value="3_6_year">3-6 lần/năm</option>
              <option value="6+_year">Hơn 6 lần/năm</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Dùng cho chiến dịch du lịch</p>
          </div>
        </div>

        <div className="bg-dark-600 border-2 border-primary/30 rounded-xl p-4 shadow-xl">
          <p className="text-xs text-gray-400">
            💡 <strong className="text-white">{t.profile.whyDetailedInfo || 'Tại sao cần nhiều thông tin như vậy?'}</strong><br/>
            {t.profile.detailedInfoBenefit || 'Thông tin hồ sơ chi tiết giúp ghép chiến dịch chính xác hơn'}:<br/>
            • {t.profile.infoExample1 || 'Đồ dùng mẹ bé → Theo độ tuổi con'}<br/>
            • {t.profile.infoExample2 || 'Phụ kiện xe → Người có xe'}<br/>
            • {t.profile.infoExample3 || 'Hàng luxury/premium → Thu nhập cao'}<br/>
            • {t.profile.infoExample4 || 'Nội thất → Người sở hữu nhà'}<br/>
            • {t.profile.infoExample5 || 'Tài trợ trang phục → Size chính xác'}<br/>
            <br/>
            <strong className="text-primary">{t.profile.accurateInfoBenefit || 'Thông tin chính xác hơn = Nhiều chiến dịch phù hợp hơn!'}</strong>
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          <Save size={20} className="mr-2" />
          {t.profile.saveChanges || 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
}

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
    name: '김민수',
    email: 'kimminsu@example.com',
    phone: '010-1234-5678',
    zalo: '+84 90 123 4567',
    bio: '뷰티 & 라이프스타일 인플루언서입니다.',
    location: '호치민',

    // Social Media
    instagram: 'https://instagram.com/kimminsu_beauty',
    instagramFollowers: '125000',
    tiktok: 'https://tiktok.com/@kimminsu_official',
    tiktokFollowers: '89000',
    youtube: 'https://youtube.com/@kimminsubeauty',
    youtubeFollowers: '45000',
    facebook: 'https://facebook.com/kimminsu.beauty',
    facebookFollowers: '32000',

    // Extended Profile - Demographics
    gender: 'female',
    ageRange: '25-34',
    maritalStatus: 'single',
    marriageYear: '',
    education: 'bachelor',
    occupation: 'creative',
    occupationDetail: '뷰티 크리에이터',
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
    alert(t.profile.profileUpdated || '프로필이 업데이트되었습니다');
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.name || '이름'}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.email || '이메일'}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.phone || '전화번호'}</label>
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
              {t.profile.zaloDescription || '베트남에서 주로 사용하는 Zalo 연락처를 입력해주세요'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.bio || '소개'}</label>
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
              placeholder={t.profile.followerCount || '팔로워 수'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || '마지막 업데이트'}: {new Date().toLocaleDateString('ko-KR')}</p>
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
              placeholder={t.profile.followerCount || '팔로워 수'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || '마지막 업데이트'}: {new Date().toLocaleDateString('ko-KR')}</p>
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
              placeholder={t.profile.subscriberCount || '구독자 수'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || '마지막 업데이트'}: {new Date().toLocaleDateString('ko-KR')}</p>
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
              placeholder={t.profile.followerCount || '팔로워 수'}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">{t.profile.lastUpdated || '마지막 업데이트'}: {new Date().toLocaleDateString('ko-KR')}</p>
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
              <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.gender || '성별'} *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="input"
                required
              >
                <option value="">{t.profile.selectOption || '선택'}</option>
                <option value="male">{t.profile.male || '남성'}</option>
                <option value="female">{t.profile.female || '여성'}</option>
                <option value="other">{t.profile.other || '기타'}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.ageRange || '연령대'} *</label>
              <select
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="input"
                required
              >
                <option value="">{t.profile.selectOption || '선택'}</option>
                <option value="18-24">18-24{t.profile.years || '세'}</option>
                <option value="25-34">25-34{t.profile.years || '세'}</option>
                <option value="35-44">35-44{t.profile.years || '세'}</option>
                <option value="45-54">45-54{t.profile.years || '세'}</option>
                <option value="55+">55{t.profile.yearsAndAbove || '세 이상'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">{t.profile.location || '지역'} *</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input"
              required
            >
              <option value="">선택</option>
              <option value="호치민">Hồ Chí Minh (호치민)</option>
              <option value="하노이">Hà Nội (하노이)</option>
              <option value="다낭">Đà Nẵng (다낭)</option>
              <option value="칸토">Cần Thơ (칸토)</option>
              <option value="하이퐁">Hải Phòng (하이퐁)</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">결혼 여부</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="single">미혼</option>
                <option value="married">기혼</option>
                <option value="divorced">이혼</option>
                <option value="widowed">사별</option>
              </select>
            </div>

            {formData.maritalStatus === 'married' && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">결혼 연도</label>
                <input
                  type="number"
                  value={formData.marriageYear}
                  onChange={(e) => setFormData({ ...formData, marriageYear: e.target.value })}
                  placeholder="2023"
                  className="input"
                  min="1950"
                  max={new Date().getFullYear()}
                />
                <p className="text-xs text-gray-500 mt-1">신혼 캠페인 매칭용</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">학력</label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="input"
            >
              <option value="">선택 안함</option>
              <option value="high_school">고등학교 졸업</option>
              <option value="associate">전문대 졸업</option>
              <option value="bachelor">대학교 졸업</option>
              <option value="master">석사</option>
              <option value="doctorate">박사</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">직업 분야</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="input"
            >
              <option value="">선택 안함</option>
              <option value="student">학생</option>
              <option value="office_worker">회사원</option>
              <option value="self_employed">자영업</option>
              <option value="professional">전문직 (의사, 변호사 등)</option>
              <option value="creative">크리에이터/예술가</option>
              <option value="service">서비스업</option>
              <option value="healthcare">의료/간호</option>
              <option value="education">교육</option>
              <option value="homemaker">주부/주夫</option>
              <option value="other">기타</option>
            </select>
          </div>

          {formData.occupation && formData.occupation !== '' && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">직업 상세 (선택)</label>
              <input
                type="text"
                value={formData.occupationDetail}
                onChange={(e) => setFormData({ ...formData, occupationDetail: e.target.value })}
                placeholder="예: 뷰티 크리에이터, 마케터, 간호사"
                className="input"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">월 소득 (선택)</label>
            <select
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
              className="input"
            >
              <option value="prefer_not_say">밝히고 싶지 않음</option>
              <option value="under_10m">1,000만 VND 미만</option>
              <option value="10m_20m">1,000만 ~ 2,000만 VND</option>
              <option value="20m_30m">2,000만 ~ 3,000만 VND</option>
              <option value="30m_50m">3,000만 ~ 5,000만 VND</option>
              <option value="50m_100m">5,000만 ~ 1억 VND</option>
              <option value="over_100m">1억 VND 이상</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">프리미엄/럭셔리 캠페인 매칭용</p>
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
                <span className="text-sm text-white">{t.profile.hasVehicle || '차량 소유'}</span>
              </div>
            </label>
          </div>

          {formData.hasVehicle && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">차량 종류 (복수 선택)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'sedan', label: '세단' },
                    { value: 'suv', label: 'SUV' },
                    { value: 'truck', label: '트럭/픽업' },
                    { value: 'electric', label: '전기차' },
                    { value: 'hybrid', label: '하이브리드' },
                    { value: 'motorcycle', label: '오토바이' },
                    { value: 'scooter', label: '스쿠터' },
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">차량 브랜드 (선택)</label>
                <input
                  type="text"
                  value={formData.vehicleBrand}
                  onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                  placeholder="예: Toyota, Honda, Tesla"
                  className="input"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">주거 형태</label>
              <select
                value={formData.housingType}
                onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="apartment">아파트</option>
                <option value="house">단독주택</option>
                <option value="villa">빌라</option>
                <option value="studio">원룸/스튜디오</option>
                <option value="shared">셰어하우스</option>
                <option value="dormitory">기숙사</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">소유 형태</label>
              <select
                value={formData.ownershipStatus}
                onChange={(e) => setFormData({ ...formData, ownershipStatus: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="owned">자가</option>
                <option value="rented">전세/월세</option>
                <option value="family_owned">가족 소유</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">인테리어 캠페인용</p>
            </div>
          </div>
        </div>

        {/* Parenting Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Baby size={16} />
            {t.profile.parentingInfo || '육아 정보'}
          </h3>

          <div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked, childrenAges: e.target.checked ? formData.childrenAges : [] })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-white">{t.profile.hasChildren || '육아 중입니다'}</span>
            </label>
          </div>

          {formData.hasChildren && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">자녀 연령대 (복수 선택 가능)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: '0-1', label: '0-1세 (영아)' },
                  { value: '1-3', label: '1-3세 (유아)' },
                  { value: '3-6', label: '3-6세 (미취학)' },
                  { value: '6-12', label: '6-12세 (초등)' },
                  { value: '12-18', label: '12-18세 (청소년)' },
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
              <label className="text-sm font-medium text-gray-300 mb-2 block">피부 타입</label>
              <select
                value={formData.skinType}
                onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="dry">건성</option>
                <option value="oily">지성</option>
                <option value="combination">복합성</option>
                <option value="sensitive">민감성</option>
                <option value="normal">중성</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">피부톤</label>
              <select
                value={formData.skinTone}
                onChange={(e) => setFormData({ ...formData, skinTone: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="fair">매우 밝음</option>
                <option value="light">밝음</option>
                <option value="medium">중간</option>
                <option value="tan">어두움</option>
                <option value="dark">매우 어두움</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">헤어 타입</label>
                <select
                  value={formData.hairType}
                  onChange={(e) => setFormData({ ...formData, hairType: e.target.value })}
                  className="input"
                >
                  <option value="">선택 안함</option>
                  <option value="straight">생머리</option>
                  <option value="wavy">웨이브</option>
                  <option value="curly">곱슬</option>
                  <option value="coily">심한 곱슬</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">헤어 컬러</label>
                <select
                  value={formData.hairColor}
                  onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
                  className="input"
                >
                  <option value="">선택 안함</option>
                  <option value="black">검은색</option>
                  <option value="brown">갈색</option>
                  <option value="blonde">금발</option>
                  <option value="red">빨강</option>
                  <option value="dyed">염색 (기타)</option>
                  <option value="other">기타</option>
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
              {t.profile.fashionInfo || '패션 정보'}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">상의</label>
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">하의</label>
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">신발</label>
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
              <label className="text-sm font-medium text-gray-300 mb-2 block">패션 스타일 (복수 선택)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'casual', label: '캐주얼' },
                  { value: 'formal', label: '포멀' },
                  { value: 'streetwear', label: '스트릿' },
                  { value: 'vintage', label: '빈티지' },
                  { value: 'minimalist', label: '미니멀' },
                  { value: 'bohemian', label: '보헤미안' },
                  { value: 'sporty', label: '스포티' },
                  { value: 'elegant', label: '엘레강스' },
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">키 (cm)</label>
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">몸무게 (kg, 선택)</label>
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
            <p className="text-xs text-gray-500">전신 패션 촬영이 필요한 캠페인용</p>
          </div>
        )}

        {/* Food Information */}
        {formData.categories.includes('food') && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <Utensils size={16} />
              {t.profile.foodInfo || '음식 정보'}
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">식이 제한 (복수 선택)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'none', label: '제한 없음' },
                  { value: 'vegetarian', label: '채식주의' },
                  { value: 'vegan', label: '비건' },
                  { value: 'halal', label: '할랄' },
                  { value: 'kosher', label: '코셔' },
                  { value: 'gluten-free', label: '글루텐 프리' },
                  { value: 'lactose-free', label: '유당 프리' },
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
              <label className="text-sm font-medium text-gray-300 mb-2 block">선호 음식 종류 (복수 선택)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'vietnamese', label: '베트남 음식' },
                  { value: 'korean', label: '한국 음식' },
                  { value: 'japanese', label: '일본 음식' },
                  { value: 'western', label: '양식' },
                  { value: 'chinese', label: '중식' },
                  { value: 'thai', label: '태국 음식' },
                  { value: 'italian', label: '이탈리아' },
                  { value: 'other', label: '기타' },
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
              {t.profile.fitnessInfo || '피트니스 정보'}
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">체형</label>
              <select
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="slim">슬림</option>
                <option value="athletic">운동선수형</option>
                <option value="average">평균</option>
                <option value="curvy">글래머</option>
                <option value="muscular">근육질</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">운동 수준</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="beginner">초급</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
                <option value="professional">전문가</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">운동 빈도</label>
              <select
                value={formData.exerciseFrequency}
                onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
                className="input"
              >
                <option value="">선택 안함</option>
                <option value="rarely">거의 안 함</option>
                <option value="1_2_week">주 1-2회</option>
                <option value="3_4_week">주 3-4회</option>
                <option value="5_6_week">주 5-6회</option>
                <option value="daily">매일</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">선호 운동 종류 (복수 선택)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'gym', label: '헬스/웨이트' },
                  { value: 'yoga', label: '요가' },
                  { value: 'running', label: '러닝' },
                  { value: 'cycling', label: '사이클링' },
                  { value: 'swimming', label: '수영' },
                  { value: 'pilates', label: '필라테스' },
                  { value: 'crossfit', label: '크로스핏' },
                  { value: 'hiking', label: '등산' },
                  { value: 'dancing', label: '댄스' },
                  { value: 'other', label: '기타' },
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
              <p className="text-xs text-gray-500 mt-2">피트니스 용품/웨어 캠페인 매칭에 도움이 됩니다</p>
            </div>
          </div>
        )}

        {/* Pet Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <PawPrint size={16} />
            {t.profile.petInfo || '반려동물 정보'}
          </h3>

          <div>
            <label className="flex items-center gap-3 p-3 bg-dark-600 rounded-lg cursor-pointer hover:bg-dark-500 transition-all">
              <input
                type="checkbox"
                checked={formData.hasPets}
                onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked, petTypes: e.target.checked ? formData.petTypes : [] })}
                className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-white">{t.profile.hasPets || '반려동물을 키우고 있습니다'}</span>
            </label>
          </div>

          {formData.hasPets && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">반려동물 종류 (복수 선택)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'dog', label: '강아지' },
                    { value: 'cat', label: '고양이' },
                    { value: 'bird', label: '새' },
                    { value: 'fish', label: '물고기' },
                    { value: 'other', label: '기타' },
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
                <label className="text-sm font-medium text-gray-300 mb-2 block">반려동물 품종 (선택)</label>
                <input
                  type="text"
                  value={formData.petBreeds?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    petBreeds: e.target.value.split(',').map(b => b.trim()).filter(b => b)
                  })}
                  placeholder="예: 시바견, 골든리트리버, 페르시안 고양이 (쉼표로 구분)"
                  className="input"
                />
                <p className="text-xs text-gray-500 mt-1">반려동물 용품 캠페인의 품종별 매칭에 사용됩니다</p>
              </div>
            </>
          )}
        </div>

        {/* Technology & Gadgets */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Smartphone size={16} />
            {t.profile.techGadgets || '기술/가젯'}
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">사용 중인 스마트폰</label>
            <input
              type="text"
              value={formData.phoneModel}
              onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
              placeholder="예: iPhone 15 Pro, Samsung Galaxy S24"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">스마트폰 액세서리 캠페인용</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">노트북 브랜드 (선택)</label>
            <input
              type="text"
              value={formData.laptopBrand}
              onChange={(e) => setFormData({ ...formData, laptopBrand: e.target.value })}
              placeholder="예: MacBook, Dell, Lenovo"
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">보유 스마트 기기 (복수 선택)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'smartwatch', label: '스마트워치' },
                { value: 'earbuds', label: '무선 이어폰' },
                { value: 'tablet', label: '태블릿' },
                { value: 'smart_speaker', label: '스마트 스피커' },
                { value: 'smart_tv', label: '스마트 TV' },
                { value: 'other', label: '기타' },
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
            {t.profile.hobbiesInterests || '취미 & 관심사'}
          </h3>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">취미 활동 (복수 선택)</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'photography', label: '사진/촬영' },
                { value: 'travel', label: '여행' },
                { value: 'cooking', label: '요리' },
                { value: 'gaming', label: '게임' },
                { value: 'reading', label: '독서' },
                { value: 'music', label: '음악' },
                { value: 'art', label: '미술/그림' },
                { value: 'gardening', label: '원예/가드닝' },
                { value: 'diy', label: 'DIY/수공예' },
                { value: 'other', label: '기타' },
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">여행 빈도</label>
            <select
              value={formData.travelFrequency}
              onChange={(e) => setFormData({ ...formData, travelFrequency: e.target.value })}
              className="input"
            >
              <option value="rarely">거의 안 함</option>
              <option value="1_2_year">연 1-2회</option>
              <option value="3_6_year">연 3-6회</option>
              <option value="6+_year">연 6회 이상</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">여행 관련 캠페인용</p>
          </div>
        </div>

        <div className="bg-dark-600 border border-primary/30 rounded-xl p-4">
          <p className="text-xs text-gray-400">
            💡 <strong className="text-white">{t.profile.whyDetailedInfo || '왜 이렇게 많은 정보가 필요한가요?'}</strong><br/>
            {t.profile.detailedInfoBenefit || '상세한 프로필 정보는 캠페인 매칭의 정확도를 높여줍니다'}:<br/>
            • {t.profile.infoExample1 || '육아템 → 자녀 연령 맞춤'}<br/>
            • {t.profile.infoExample2 || '자동차 용품 → 차량 소유자'}<br/>
            • {t.profile.infoExample3 || '명품/프리미엄 → 소득 수준'}<br/>
            • {t.profile.infoExample4 || '인테리어 → 자가 소유자'}<br/>
            • {t.profile.infoExample5 || '의류 협찬 → 정확한 사이즈'}<br/>
            <br/>
            <strong className="text-primary">{t.profile.accurateInfoBenefit || '더 정확한 정보 = 더 많은 맞춤 캠페인!'}</strong>
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          <Save size={20} className="mr-2" />
          {t.profile.saveChanges || '변경사항 저장'}
        </button>
      </form>
    </div>
  );
}

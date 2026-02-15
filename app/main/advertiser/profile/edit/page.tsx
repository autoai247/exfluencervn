'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, Globe, Upload, X, Save, Camera } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdvertiserProfileEditPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const [formData, setFormData] = useState({
    company_name: 'Demo Brand VN',
    name: 'Demo Brand Company',
    email: 'advertiser@demo.com',
    phone: '+84 909 876 543',
    website: 'https://demobrand.com',
    bio: language === 'ko'
      ? '베트남을 대표하는 패션 브랜드. 청년 패션과 스트릿웨어 전문.'
      : 'Thương hiệu thời trang hàng đầu Việt Nam. Chuyên về thời trang trẻ và streetwear.',
  });

  const t = {
    ko: {
      title: '프로필 수정',
      businessInfo: '기업 정보',
      logo: '회사 로고',
      uploadLogo: '로고 업로드',
      changeLogo: '로고 변경',
      companyName: '회사명',
      companyNamePlaceholder: '회사명을 입력하세요',
      contactPerson: '담당자명',
      contactPersonPlaceholder: '담당자명을 입력하세요',
      email: '이메일',
      emailPlaceholder: 'company@example.com',
      phone: '전화번호',
      phonePlaceholder: '+84 XXX XXX XXX',
      website: '웹사이트',
      websitePlaceholder: 'https://yourcompany.com',
      bio: '회사 소개',
      bioPlaceholder: '회사 소개를 입력하세요 (최대 200자)',
      saveChanges: '변경사항 저장',
      saving: '저장 중...',
      cancel: '취소',
      successTitle: '저장 완료',
      successMessage: '프로필이 성공적으로 업데이트되었습니다.',
      logoNote: '권장: 500x500px, 최대 5MB (PNG, JPG)',
    },
    vi: {
      title: 'Chỉnh sửa hồ sơ',
      businessInfo: 'Thông tin doanh nghiệp',
      logo: 'Logo công ty',
      uploadLogo: 'Tải logo lên',
      changeLogo: 'Đổi logo',
      companyName: 'Tên công ty',
      companyNamePlaceholder: 'Nhập tên công ty',
      contactPerson: 'Người liên hệ',
      contactPersonPlaceholder: 'Nhập tên người liên hệ',
      email: 'Email',
      emailPlaceholder: 'company@example.com',
      phone: 'Số điện thoại',
      phonePlaceholder: '+84 XXX XXX XXX',
      website: 'Website',
      websitePlaceholder: 'https://yourcompany.com',
      bio: 'Giới thiệu công ty',
      bioPlaceholder: 'Nhập giới thiệu công ty (tối đa 200 ký tự)',
      saveChanges: 'Lưu thay đổi',
      saving: 'Đang lưu...',
      cancel: 'Hủy',
      successTitle: 'Đã lưu',
      successMessage: 'Hồ sơ đã được cập nhật thành công.',
      logoNote: 'Khuyến nghị: 500x500px, tối đa 5MB (PNG, JPG)',
    },
  };

  const text = t[language];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(language === 'ko' ? '이미지 파일만 업로드 가능합니다.' : 'Chỉ có thể tải lên file hình ảnh.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'ko' ? '파일 크기는 5MB 이하여야 합니다.' : 'Kích thước file phải dưới 5MB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, this would call Supabase
    // const supabase = createClient();
    // await supabase.from('profiles').update({ ... }).eq('id', userId);

    alert(`✅ ${text.successTitle}\n\n${text.successMessage}`);
    setLoading(false);
    router.push('/main/advertiser/profile');
  };

  return (
    <div className="min-h-screen bg-dark-700">
      <MobileHeader title={text.title} showBack />

      <main className="container-mobile pb-24 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Account Banner */}
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/30 rounded-xl flex items-center justify-center">
                <Building2 size={24} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{text.businessInfo}</h3>
                <p className="text-orange-300 text-xs mt-0.5">
                  {language === 'ko' ? '기업 계정 정보를 관리합니다' : 'Quản lý thông tin tài khoản doanh nghiệp'}
                </p>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Camera size={16} className="text-orange-400" />
                {text.logo}
              </span>
            </label>

            <div className="flex items-center gap-4">
              {/* Logo Preview */}
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white flex-shrink-0 overflow-hidden border-2 border-orange-500/30">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 size={32} />
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <label className="btn btn-secondary w-full cursor-pointer">
                  <Upload size={18} className="mr-2" />
                  {logoPreview ? text.changeLogo : text.uploadLogo}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-400 mt-2">{text.logoNote}</p>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.companyName}</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder={text.companyNamePlaceholder}
                className="input pl-12"
              />
            </div>
          </div>

          {/* Contact Person */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.contactPerson}</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={text.contactPersonPlaceholder}
              className="input"
            />
          </div>

          {/* Email */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.email}</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={text.emailPlaceholder}
                className="input pl-12"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.phone}</span>
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={text.phonePlaceholder}
                className="input pl-12"
              />
            </div>
          </div>

          {/* Website */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.website}</span>
            </label>
            <div className="relative">
              <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder={text.websitePlaceholder}
                className="input pl-12"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="card">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-white">{text.bio}</span>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder={text.bioPlaceholder}
              maxLength={200}
              rows={4}
              className="input resize-none"
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {formData.bio.length}/200
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 btn btn-ghost"
              disabled={loading}
            >
              <X size={18} className="mr-2" />
              {text.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 btn btn-primary bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner mr-2" />
                  {text.saving}
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {text.saveChanges}
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <BottomNav userType="advertiser" />
    </div>
  );
}

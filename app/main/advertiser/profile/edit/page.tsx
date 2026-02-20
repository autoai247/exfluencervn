'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Upload,
  X,
  Save,
  Camera,
  MapPin,
  Users,
  Briefcase,
  Calendar,
  FileText,
  CheckCircle,
  Trash2,
  User,
  Facebook,
  Instagram,
  Youtube,
  Share2,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';

type UploadedDocument = {
  file: File;
  preview: string;
  type: string;
  name: string;
};

export default function AdvertiserProfileEditPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].advertiser.profileEdit;

  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [businessLicense, setBusinessLicense] = useState<UploadedDocument | null>(null);
  const [ecommerceLicense, setEcommerceLicense] = useState<UploadedDocument | null>(null);
  const [otherDocs, setOtherDocs] = useState<UploadedDocument[]>([]);

  // Refs to track FileReader instances for cleanup
  const fileReadersRef = useRef<FileReader[]>([]);

  const [formData, setFormData] = useState({
    // 기본 정보
    country: 'VN', // VN, KR, etc.
    company_name: 'Demo Brand VN',
    ceo_name: 'Nguyen Van A',
    contact_person: 'Tran Thi B',

    // 사업자 정보
    business_registration_number: '0123456789',
    tax_code: '0123456789-001',
    business_type: language === 'ko' ? '도소매업' : 'Bán lẻ',
    business_category: language === 'ko' ? '패션/의류' : 'Thời trang/Quần áo',
    establishment_date: '2020-01-15',
    employee_count: language === 'ko' ? '50-100명' : '50-100 người',
    capital: '5,000,000,000',

    // 연락처 정보
    email: 'advertiser@demo.com',
    phone: '+84 909 876 543',
    fax: '+84 28 1234 5678',
    website: 'https://demobrand.com',

    // SNS
    facebook: 'https://facebook.com/demobrand',
    instagram: 'https://instagram.com/demobrand',
    tiktok: '@demobrand',
    youtube: 'https://youtube.com/@demobrand',

    // 주소
    address: language === 'ko'
      ? '123 Nguyen Hue Street, District 1, Ho Chi Minh City'
      : '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    address_detail: language === 'ko' ? '5층 501호' : 'Tầng 5, Phòng 501',

    // 회사 소개
    bio: language === 'ko'
      ? '베트남을 대표하는 패션 브랜드. 청년 패션과 스트릿웨어 전문. 2020년 설립 이래 베트남 전역에 50개 이상의 매장을 운영하고 있습니다.'
      : 'Thương hiệu thời trang hàng đầu Việt Nam. Chuyên về thời trang trẻ và streetwear. Từ năm 2020, chúng tôi đã vận hành hơn 50 cửa hàng trên toàn quốc.',
  });

  // Cleanup FileReaders on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      fileReadersRef.current.forEach(reader => {
        if (reader.readyState === FileReader.LOADING) {
          reader.abort();
        }
      });
      fileReadersRef.current = [];
    };
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t.imageOnly);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t.fileSizeError);
      return;
    }

    const reader = new FileReader();
    fileReadersRef.current.push(reader);

    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
      // Remove from tracking after completion
      fileReadersRef.current = fileReadersRef.current.filter(r => r !== reader);
    };

    reader.onerror = () => {
      // Remove from tracking on error
      fileReadersRef.current = fileReadersRef.current.filter(r => r !== reader);
    };

    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'business' | 'ecommerce' | 'other'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert(t.fileTypeError);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(language === 'ko' ? `${t.maxFileSize} 10MB` : 'Kích thước file phải dưới 10MB');
      return;
    }

    const reader = new FileReader();
    fileReadersRef.current.push(reader);

    reader.onload = (event) => {
      const doc: UploadedDocument = {
        file,
        preview: event.target?.result as string,
        type: file.type,
        name: file.name,
      };

      if (type === 'business') {
        setBusinessLicense(doc);
      } else if (type === 'ecommerce') {
        setEcommerceLicense(doc);
      } else if (type === 'other') {
        setOtherDocs((prev) => [...prev, doc]);
      }

      // Remove from tracking after completion
      fileReadersRef.current = fileReadersRef.current.filter(r => r !== reader);
    };

    reader.onerror = () => {
      // Remove from tracking on error
      fileReadersRef.current = fileReadersRef.current.filter(r => r !== reader);
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(`${t.successTitle}\n\n${t.successMessage}`);
    setLoading(false);
    router.push('/main/advertiser/profile');
  };

  return (
    <div className="min-h-screen bg-white">
      <MobileHeader title={t.title} showBack />

      <main className="container-mobile pb-24 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Account Banner */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Building2 size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm">
                  {t.accountManagement}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {t.accountManagementDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.logo}</h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex flex-col items-center gap-4">
                {/* Logo Preview */}
                <div className="w-32 h-32 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border-2 border-gray-200">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={48} />
                  )}
                </div>

                {/* Upload Button */}
                <div className="w-full">
                  <label className="w-full py-2.5 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center font-semibold text-sm">
                    <Upload size={18} className="mr-2" />
                    {logoPreview ? t.changeLogo : t.uploadLogo}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 text-center mt-2">{t.logoNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.basicInfo}</h3>
            </div>

            {/* Country Select */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.country}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">{t.selectCountry}</option>
                <option value="VN">Viet Nam</option>
                <option value="KR">Han Quoc</option>
                <option value="US">United States</option>
                <option value="JP">Nhat Ban</option>
                <option value="CN">Trung Quoc</option>
                <option value="TH">Thai Lan</option>
                <option value="SG">Singapore</option>
                <option value="OTHER">{t.other}</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                {t.countryNote}
              </p>
            </div>

            {/* Company Name */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.companyName}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder={t.companyNamePlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* CEO Name */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.ceoName}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.ceo_name}
                onChange={(e) => setFormData({ ...formData, ceo_name: e.target.value })}
                placeholder={t.ceoNamePlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Contact Person */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.contactPerson}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder={t.contactPersonPlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.businessInfo}</h3>
            </div>

            {/* Business Registration Number */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.businessRegNumber}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.business_registration_number}
                onChange={(e) => setFormData({ ...formData, business_registration_number: e.target.value })}
                placeholder={t.businessRegNumberPlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Tax Code */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.taxCode}</span>
              </label>
              <input
                type="text"
                value={formData.tax_code}
                onChange={(e) => setFormData({ ...formData, tax_code: e.target.value })}
                placeholder={t.taxCodePlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Business Type & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.businessType}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  placeholder={t.businessTypePlaceholder}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.businessCategory}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.business_category}
                  onChange={(e) => setFormData({ ...formData, business_category: e.target.value })}
                  placeholder={t.businessCategoryPlaceholder}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Establishment Date */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.establishmentDate}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.establishment_date}
                  onChange={(e) => setFormData({ ...formData, establishment_date: e.target.value })}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Employee Count & Capital */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.employeeCount}</span>
                </label>
                <div className="relative">
                  <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.employee_count}
                    onChange={(e) => setFormData({ ...formData, employee_count: e.target.value })}
                    placeholder={t.employeeCountPlaceholder}
                    className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.capital}</span>
                </label>
                <input
                  type="text"
                  value={formData.capital}
                  onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                  placeholder={t.capitalPlaceholder}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Business License */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-gray-900">{t.businessLicense}</span>
                <span className="text-red-500 ml-1">*</span>
                <p className="text-xs text-gray-500 mt-1">{t.businessLicenseDesc}</p>
              </label>

              {businessLicense ? (
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <CheckCircle size={20} className="text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-semibold truncate">{businessLicense.name}</p>
                      <p className="text-xs text-gray-500">{t.uploaded}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBusinessLicense(null)}
                    className="ml-2 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer font-semibold text-sm">
                  <Upload size={18} className="mr-2" />
                  {t.selectFile}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleDocumentUpload(e, 'business')}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-gray-500 mt-2">{t.documentNote}</p>
            </div>

            {/* E-commerce License */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-gray-900">{t.ecommerceLicense}</span>
                <span className="text-xs text-gray-500 ml-2">({t.optional})</span>
                <p className="text-xs text-gray-500 mt-1">{t.ecommerceLicenseDesc}</p>
              </label>

              {ecommerceLicense ? (
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <CheckCircle size={20} className="text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-semibold truncate">{ecommerceLicense.name}</p>
                      <p className="text-xs text-gray-500">{t.uploaded}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEcommerceLicense(null)}
                    className="ml-2 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-semibold text-sm">
                  <Upload size={18} className="mr-2" />
                  {t.selectFile}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleDocumentUpload(e, 'ecommerce')}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Other Documents */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-gray-900">{t.otherDocuments}</span>
                <span className="text-xs text-gray-500 ml-2">({t.optional})</span>
                <p className="text-xs text-gray-500 mt-1">{t.otherDocumentsDesc}</p>
              </label>

              {/* Uploaded Documents List */}
              {otherDocs.length > 0 && (
                <div className="space-y-2 mb-3">
                  {otherDocs.map((doc, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CheckCircle size={20} className="text-gray-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 font-semibold truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{t.uploaded}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtherDocs(otherDocs.filter((_, i) => i !== index))}
                        className="ml-2 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-semibold text-sm">
                <Upload size={18} className="mr-2" />
                {t.selectFile}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleDocumentUpload(e, 'other')}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.contactInfo}</h3>
            </div>

            {/* Email */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.email}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone & Fax */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.phone}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-gray-900">{t.fax}</span>
                </label>
                <input
                  type="tel"
                  value={formData.fax}
                  onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                  placeholder={t.faxPlaceholder}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Website */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.website}</span>
              </label>
              <div className="relative">
                <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder={t.websitePlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* SNS Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Share2 size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.snsInfo}</h3>
              <span className="text-xs text-gray-500">({t.optional})</span>
            </div>

            {/* Facebook */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.facebook}</span>
              </label>
              <div className="relative">
                <Facebook size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder={t.facebookPlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.instagram}</span>
              </label>
              <div className="relative">
                <Instagram size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder={t.instagramPlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* TikTok */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.tiktok}</span>
              </label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder={t.tiktokPlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* YouTube */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.youtube}</span>
              </label>
              <div className="relative">
                <Youtube size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder={t.youtubePlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.addressInfo}</h3>
            </div>

            {/* Address */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.address}</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t.addressPlaceholder}
                  className="w-full px-4 pl-12 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Address Detail */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.addressDetail}</span>
              </label>
              <input
                type="text"
                value={formData.address_detail}
                onChange={(e) => setFormData({ ...formData, address_detail: e.target.value })}
                placeholder={t.addressDetailPlaceholder}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Company Intro */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-gray-600" />
              <h3 className="text-sm font-bold text-gray-700">{t.companyIntro}</h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-gray-900">{t.bio}</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder={t.bioPlaceholder}
                maxLength={500}
                rows={6}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {formData.bio.length}/500
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm flex items-center justify-center"
              disabled={loading}
            >
              <X size={18} className="mr-2" />
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t.saving}
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {t.saveChanges}
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

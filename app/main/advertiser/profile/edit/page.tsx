'use client';

import { useState } from 'react';
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

type UploadedDocument = {
  file: File;
  preview: string;
  type: string;
  name: string;
};

export default function AdvertiserProfileEditPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [businessLicense, setBusinessLicense] = useState<UploadedDocument | null>(null);
  const [ecommerceLicense, setEcommerceLicense] = useState<UploadedDocument | null>(null);
  const [otherDocs, setOtherDocs] = useState<UploadedDocument[]>([]);

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

  const t = {
    ko: {
      title: '프로필 수정',

      // 섹션
      basicInfo: '기본 정보',
      businessInfo: '사업자 정보',
      contactInfo: '연락처 정보',
      snsInfo: 'SNS 계정',
      addressInfo: '주소 정보',
      companyIntro: '회사 소개',
      documentsSection: '사업자 서류',

      // 기본 정보
      logo: '회사 로고',
      uploadLogo: '로고 업로드',
      changeLogo: '로고 변경',
      logoNote: '권장: 정사각형 500x500px 이상, 최대 5MB (PNG, JPG)',
      country: '국가',
      selectCountry: '국가를 선택하세요',
      companyName: '회사명 (상호)',
      companyNamePlaceholder: '주식회사 데모브랜드',
      ceoName: '대표자명',
      ceoNamePlaceholder: '홍길동',
      contactPerson: '담당자명',
      contactPersonPlaceholder: '김영희',

      // 사업자 정보
      businessRegNumber: '사업자 등록 번호 / Business Reg. No.',
      businessRegNumberPlaceholder: '한국: 123-45-67890 / 베트남: 0123456789',
      taxCode: '납세자 번호 / Tax ID',
      taxCodePlaceholder: '세금 식별 번호',
      businessType: '업종 / Business Type',
      businessTypePlaceholder: '도소매업, 제조업, 서비스업 등',
      businessCategory: '업태 / Business Category',
      businessCategoryPlaceholder: '패션/의류, 화장품, 식품 등',
      establishmentDate: '설립일',
      employeeCount: '직원 수',
      employeeCountPlaceholder: '예: 10-50명, 50-100명',
      capital: '자본금 (VND)',
      capitalPlaceholder: '1,000,000,000',

      // 연락처
      email: '이메일',
      emailPlaceholder: 'company@example.com',
      phone: '전화번호',
      phonePlaceholder: '+84 XXX XXX XXX',
      fax: '팩스',
      faxPlaceholder: '+84 28 XXXX XXXX',
      website: '웹사이트',
      websitePlaceholder: 'https://yourcompany.com',

      // SNS
      facebook: 'Facebook',
      facebookPlaceholder: 'https://facebook.com/yourcompany',
      instagram: 'Instagram',
      instagramPlaceholder: 'https://instagram.com/yourcompany',
      tiktok: 'TikTok',
      tiktokPlaceholder: '@yourcompany',
      youtube: 'YouTube',
      youtubePlaceholder: 'https://youtube.com/@yourcompany',

      // 주소
      address: '본사 주소',
      addressPlaceholder: '도로명 주소를 입력하세요',
      addressDetail: '상세 주소',
      addressDetailPlaceholder: '건물명, 층, 호수 등',

      // 회사 소개
      bio: '회사 소개',
      bioPlaceholder: '회사 소개를 상세히 입력하세요 (최대 500자)',

      // 서류
      businessLicense: '사업자 등록증',
      businessLicenseDesc: '사업자 등록증 스캔 본 또는 사진',
      ecommerceLicense: '통신판매업 신고증',
      ecommerceLicenseDesc: '온라인 판매업 신고증 (있는 경우)',
      otherDocuments: '기타 인증서',
      otherDocumentsDesc: '품질인증서, 특허증 등 추가 서류',
      selectFile: '파일 선택',
      changeFile: '파일 변경',
      removeDocument: '삭제',
      documentNote: '최대 10MB (PDF, JPG, PNG)',
      uploaded: '업로드됨',

      // 버튼
      saveChanges: '변경사항 저장',
      saving: '저장 중...',
      cancel: '취소',

      // 메시지
      successTitle: '저장 완료',
      successMessage: '프로필이 성공적으로 업데이트되었습니다.',
      required: '필수',
      optional: '선택',
    },
    vi: {
      title: 'Chỉnh sửa hồ sơ',

      // 섹션
      basicInfo: 'Thông tin cơ bản',
      businessInfo: 'Thông tin doanh nghiệp',
      contactInfo: 'Thông tin liên hệ',
      snsInfo: 'Tài khoản mạng xã hội',
      addressInfo: 'Địa chỉ',
      companyIntro: 'Giới thiệu công ty',
      documentsSection: 'Giấy tờ doanh nghiệp',

      // 기본 정보
      logo: 'Logo công ty',
      uploadLogo: 'Tải logo lên',
      changeLogo: 'Đổi logo',
      logoNote: 'Khuyến nghị: Vuông 500x500px trở lên, tối đa 5MB (PNG, JPG)',
      country: 'Quốc gia',
      selectCountry: 'Chọn quốc gia',
      companyName: 'Tên công ty',
      companyNamePlaceholder: 'Công ty TNHH Demo Brand',
      ceoName: 'Tên giám đốc',
      ceoNamePlaceholder: 'Nguyễn Văn A',
      contactPerson: 'Người liên hệ',
      contactPersonPlaceholder: 'Trần Thị B',

      // 사업자 정보
      businessRegNumber: 'Mã số doanh nghiệp / Business Reg. No.',
      businessRegNumberPlaceholder: 'VN: 0123456789 / KR: 123-45-67890',
      taxCode: 'Mã số thuế / Tax ID',
      taxCodePlaceholder: 'Mã định danh thuế',
      businessType: 'Loại hình / Business Type',
      businessTypePlaceholder: 'Bán lẻ, Sản xuất, Dịch vụ',
      businessCategory: 'Ngành nghề / Category',
      businessCategoryPlaceholder: 'Thời trang, Mỹ phẩm, Thực phẩm',
      establishmentDate: 'Ngày thành lập',
      employeeCount: 'Số lượng nhân viên',
      employeeCountPlaceholder: 'VD: 10-50, 50-100',
      capital: 'Vốn điều lệ (VND)',
      capitalPlaceholder: '1,000,000,000',

      // 연락처
      email: 'Email',
      emailPlaceholder: 'company@example.com',
      phone: 'Số điện thoại',
      phonePlaceholder: '+84 XXX XXX XXX',
      fax: 'Fax',
      faxPlaceholder: '+84 28 XXXX XXXX',
      website: 'Website',
      websitePlaceholder: 'https://yourcompany.com',

      // SNS
      facebook: 'Facebook',
      facebookPlaceholder: 'https://facebook.com/yourcompany',
      instagram: 'Instagram',
      instagramPlaceholder: 'https://instagram.com/yourcompany',
      tiktok: 'TikTok',
      tiktokPlaceholder: '@yourcompany',
      youtube: 'YouTube',
      youtubePlaceholder: 'https://youtube.com/@yourcompany',

      // 주소
      address: 'Địa chỉ trụ sở',
      addressPlaceholder: 'Nhập địa chỉ đường phố',
      addressDetail: 'Địa chỉ chi tiết',
      addressDetailPlaceholder: 'Tòa nhà, tầng, phòng',

      // 회사 소개
      bio: 'Giới thiệu công ty',
      bioPlaceholder: 'Nhập giới thiệu chi tiết về công ty (tối đa 500 ký tự)',

      // 서류
      businessLicense: 'Giấy phép kinh doanh',
      businessLicenseDesc: 'Bản scan hoặc ảnh giấy phép kinh doanh',
      ecommerceLicense: 'Giấy phép TMĐT',
      ecommerceLicenseDesc: 'Giấy phép thương mại điện tử (nếu có)',
      otherDocuments: 'Chứng chỉ khác',
      otherDocumentsDesc: 'Chứng chỉ chất lượng, bằng sáng chế, v.v.',
      selectFile: 'Chọn file',
      changeFile: 'Đổi file',
      removeDocument: 'Xóa',
      documentNote: 'Tối đa 10MB (PDF, JPG, PNG)',
      uploaded: 'Đã tải lên',

      // 버튼
      saveChanges: 'Lưu thay đổi',
      saving: 'Đang lưu...',
      cancel: 'Hủy',

      // 메시지
      successTitle: 'Đã lưu',
      successMessage: 'Hồ sơ đã được cập nhật thành công.',
      required: 'Bắt buộc',
      optional: 'Tùy chọn',
    },
  };

  const text = t[language];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'ko' ? '이미지 파일만 업로드 가능합니다.' : 'Chỉ có thể tải lên file hình ảnh.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'ko' ? '파일 크기는 5MB 이하여야 합니다.' : 'Kích thước file phải dưới 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
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
      alert(language === 'ko' ? 'PDF, JPG, PNG 파일만 업로드 가능합니다.' : 'Chỉ có thể tải lên PDF, JPG, PNG.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(language === 'ko' ? '파일 크기는 10MB 이하여야 합니다.' : 'Kích thước file phải dưới 10MB.');
      return;
    }

    const reader = new FileReader();
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
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

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
                <h3 className="text-white font-bold text-sm">
                  {language === 'ko' ? '기업 계정 정보 관리' : 'Quản lý thông tin doanh nghiệp'}
                </h3>
                <p className="text-orange-300 text-xs mt-0.5">
                  {language === 'ko' ? '정확한 정보 입력으로 신뢰도를 높이세요' : 'Tăng độ tin cậy bằng thông tin chính xác'}
                </p>
              </div>
            </div>
          </div>

          {/* ===== 로고 업로드 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-orange-400" />
              <h3 className="text-sm font-bold text-gray-300">{text.logo}</h3>
            </div>

            <div className="card">
              <div className="flex flex-col items-center gap-4">
                {/* Logo Preview */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white overflow-hidden border-4 border-orange-500/30 shadow-xl">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={48} />
                  )}
                </div>

                {/* Upload Button */}
                <div className="w-full">
                  <label className="btn btn-secondary w-full cursor-pointer flex items-center justify-center">
                    <Upload size={18} className="mr-2" />
                    {logoPreview ? text.changeLogo : text.uploadLogo}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-400 text-center mt-2">{text.logoNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 기본 정보 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User size={18} className="text-primary" />
              <h3 className="text-sm font-bold text-gray-300">{text.basicInfo}</h3>
            </div>

            {/* 국가 선택 */}
            <div className="card bg-primary/5 border-primary/30">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.country}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="input"
              >
                <option value="">{text.selectCountry}</option>
                <option value="VN">🇻🇳 Việt Nam (베트남)</option>
                <option value="KR">🇰🇷 한국 (Hàn Quốc)</option>
                <option value="US">🇺🇸 United States</option>
                <option value="JP">🇯🇵 日本 (Nhật Bản)</option>
                <option value="CN">🇨🇳 中国 (Trung Quốc)</option>
                <option value="TH">🇹🇭 ประเทศไทย (Thái Lan)</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="OTHER">{language === 'ko' ? '기타' : 'Khác'}</option>
              </select>
              <p className="text-xs text-gray-400 mt-2">
                {language === 'ko'
                  ? '회사가 등록된 국가를 선택하세요. 사업자 정보 양식이 국가에 맞게 조정됩니다.'
                  : 'Chọn quốc gia đăng ký công ty. Mẫu thông tin doanh nghiệp sẽ được điều chỉnh theo quốc gia.'}
              </p>
            </div>

            {/* 회사명 */}
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

            {/* 대표자명 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.ceoName}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.ceo_name}
                onChange={(e) => setFormData({ ...formData, ceo_name: e.target.value })}
                placeholder={text.ceoNamePlaceholder}
                className="input"
              />
            </div>

            {/* 담당자명 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.contactPerson}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder={text.contactPersonPlaceholder}
                className="input"
              />
            </div>
          </div>

          {/* ===== 사업자 정보 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-secondary" />
              <h3 className="text-sm font-bold text-gray-300">{text.businessInfo}</h3>
            </div>

            {/* 사업자 등록 번호 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.businessRegNumber}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.business_registration_number}
                onChange={(e) => setFormData({ ...formData, business_registration_number: e.target.value })}
                placeholder={text.businessRegNumberPlaceholder}
                className="input"
              />
            </div>

            {/* 납세자 번호 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.taxCode}</span>
              </label>
              <input
                type="text"
                value={formData.tax_code}
                onChange={(e) => setFormData({ ...formData, tax_code: e.target.value })}
                placeholder={text.taxCodePlaceholder}
                className="input"
              />
            </div>

            {/* 업종 & 업태 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-white">{text.businessType}</span>
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  placeholder={text.businessTypePlaceholder}
                  className="input"
                />
              </div>
              <div className="card">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-white">{text.businessCategory}</span>
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.business_category}
                  onChange={(e) => setFormData({ ...formData, business_category: e.target.value })}
                  placeholder={text.businessCategoryPlaceholder}
                  className="input"
                />
              </div>
            </div>

            {/* 설립일 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.establishmentDate}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.establishment_date}
                  onChange={(e) => setFormData({ ...formData, establishment_date: e.target.value })}
                  className="input pl-12"
                />
              </div>
            </div>

            {/* 직원 수 & 자본금 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-white">{text.employeeCount}</span>
                </label>
                <div className="relative">
                  <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.employee_count}
                    onChange={(e) => setFormData({ ...formData, employee_count: e.target.value })}
                    placeholder={text.employeeCountPlaceholder}
                    className="input pl-12"
                  />
                </div>
              </div>
              <div className="card">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-white">{text.capital}</span>
                </label>
                <input
                  type="text"
                  value={formData.capital}
                  onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                  placeholder={text.capitalPlaceholder}
                  className="input"
                />
              </div>
            </div>

            {/* 사업자 등록증 */}
            <div className="card bg-secondary/5 border-secondary/30">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-white">{text.businessLicense}</span>
                <span className="text-red-400 ml-1">*</span>
                <p className="text-xs text-gray-400 mt-1">{text.businessLicenseDesc}</p>
              </label>

              {businessLicense ? (
                <div className="bg-dark-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{businessLicense.name}</p>
                      <p className="text-xs text-gray-400">{text.uploaded}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBusinessLicense(null)}
                    className="ml-2 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center justify-center w-full btn btn-secondary cursor-pointer">
                  <Upload size={18} className="mr-2" />
                  {text.selectFile}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleDocumentUpload(e, 'business')}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-gray-500 mt-2">{text.documentNote}</p>
            </div>

            {/* 통신판매업 신고증 */}
            <div className="card bg-secondary/5 border-secondary/30">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-white">{text.ecommerceLicense}</span>
                <span className="text-xs text-gray-500 ml-2">({text.optional})</span>
                <p className="text-xs text-gray-400 mt-1">{text.ecommerceLicenseDesc}</p>
              </label>

              {ecommerceLicense ? (
                <div className="bg-dark-600 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{ecommerceLicense.name}</p>
                      <p className="text-xs text-gray-400">{text.uploaded}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEcommerceLicense(null)}
                    className="ml-2 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center justify-center w-full btn btn-ghost cursor-pointer">
                  <Upload size={18} className="mr-2" />
                  {text.selectFile}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleDocumentUpload(e, 'ecommerce')}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* 기타 인증서 */}
            <div className="card bg-secondary/5 border-secondary/30">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-white">{text.otherDocuments}</span>
                <span className="text-xs text-gray-500 ml-2">({text.optional})</span>
                <p className="text-xs text-gray-400 mt-1">{text.otherDocumentsDesc}</p>
              </label>

              {/* 업로드된 서류 목록 */}
              {otherDocs.length > 0 && (
                <div className="space-y-2 mb-3">
                  {otherDocs.map((doc, index) => (
                    <div key={index} className="bg-dark-600 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CheckCircle size={20} className="text-success flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-semibold truncate">{doc.name}</p>
                          <p className="text-xs text-gray-400">{text.uploaded}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtherDocs(otherDocs.filter((_, i) => i !== index))}
                        className="ml-2 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="inline-flex items-center justify-center w-full btn btn-ghost cursor-pointer">
                <Upload size={18} className="mr-2" />
                {text.selectFile}
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

          {/* ===== 연락처 정보 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-accent" />
              <h3 className="text-sm font-bold text-gray-300">{text.contactInfo}</h3>
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

            {/* Phone & Fax */}
            <div className="grid grid-cols-2 gap-3">
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
              <div className="card">
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-white">{text.fax}</span>
                </label>
                <input
                  type="tel"
                  value={formData.fax}
                  onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                  placeholder={text.faxPlaceholder}
                  className="input"
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
          </div>

          {/* ===== SNS 계정 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Share2 size={18} className="text-info" />
              <h3 className="text-sm font-bold text-gray-300">{text.snsInfo}</h3>
              <span className="text-xs text-gray-500">({text.optional})</span>
            </div>

            {/* Facebook */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.facebook}</span>
              </label>
              <div className="relative">
                <Facebook size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder={text.facebookPlaceholder}
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.instagram}</span>
              </label>
              <div className="relative">
                <Instagram size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder={text.instagramPlaceholder}
                  className="input pl-12"
                />
              </div>
            </div>

            {/* TikTok */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.tiktok}</span>
              </label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder={text.tiktokPlaceholder}
                className="input"
              />
            </div>

            {/* YouTube */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.youtube}</span>
              </label>
              <div className="relative">
                <Youtube size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  placeholder={text.youtubePlaceholder}
                  className="input pl-12"
                />
              </div>
            </div>
          </div>

          {/* ===== 주소 정보 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-success" />
              <h3 className="text-sm font-bold text-gray-300">{text.addressInfo}</h3>
            </div>

            {/* 본사 주소 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.address}</span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={text.addressPlaceholder}
                  className="input pl-12"
                />
              </div>
            </div>

            {/* 상세 주소 */}
            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.addressDetail}</span>
              </label>
              <input
                type="text"
                value={formData.address_detail}
                onChange={(e) => setFormData({ ...formData, address_detail: e.target.value })}
                placeholder={text.addressDetailPlaceholder}
                className="input"
              />
            </div>
          </div>

          {/* ===== 회사 소개 ===== */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-info" />
              <h3 className="text-sm font-bold text-gray-300">{text.companyIntro}</h3>
            </div>

            <div className="card">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-white">{text.bio}</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder={text.bioPlaceholder}
                maxLength={500}
                rows={6}
                className="input resize-none"
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {formData.bio.length}/500
              </div>
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

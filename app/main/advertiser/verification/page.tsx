'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowLeft, Building2, FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BusinessVerificationPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    companyNameVi: '',
    registrationNumber: '',
    taxCode: '',
    businessType: 'limited_company' as const,
    registeredAddress: '',
    legalRepresentative: '',
    email: '',
    phone: '',
    certificateImage: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: API 호출
    console.log('Business verification submitted:', formData);

    // 임시: localStorage 저장
    localStorage.setItem('businessVerification', JSON.stringify({
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-100 border border-dark-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'ko' ? '인증 신청 완료' : 'Đã gửi yêu cầu xác minh'}
          </h2>
          <p className="text-gray-400 mb-6">
            {language === 'ko'
              ? '사업자 인증 신청이 접수되었습니다. 1-2 영업일 내에 검토 후 알려드리겠습니다.'
              : 'Yêu cầu xác minh đã được gửi. Chúng tôi sẽ xem xét trong vòng 1-2 ngày làm việc.'}
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-300">
              📧 {language === 'ko' ? '이메일' : 'Email'}: {formData.email}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              📞 {language === 'ko' ? '연락처' : 'Điện thoại'}: {formData.phone}
            </p>
          </div>
          <button
            onClick={() => router.push('/main/advertiser/dashboard')}
            className="w-full bg-mint text-black py-3 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            {language === 'ko' ? '대시보드로 이동' : 'Đến bảng điều khiển'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-sm border-b border-dark-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/main/advertiser/dashboard"
              className="w-10 h-10 bg-dark-100 rounded-lg flex items-center justify-center hover:bg-dark-200 transition-all"
            >
              <ArrowLeft size={20} className="text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">
                {language === 'ko' ? '사업자 인증 신청' : 'Đăng ký xác minh doanh nghiệp'}
              </h1>
              <p className="text-sm text-gray-400">
                {language === 'ko' ? '캠페인 등록을 위해 필요합니다' : 'Bắt buộc để tạo chiến dịch'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-blue-400 mb-1">
              {language === 'ko' ? '왜 필요한가요?' : 'Tại sao cần xác minh?'}
            </p>
            <p>
              {language === 'ko'
                ? '사업자 인증은 인플루언서에게 신뢰를 제공하고, 결제 미지급 등의 사기를 방지하기 위해 필수입니다.'
                : 'Xác minh doanh nghiệp là bắt buộc để tạo niềm tin với influencer và ngăn chặn gian lận.'}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <section className="bg-dark-100 border border-dark-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-mint/10 rounded-lg flex items-center justify-center">
              <Building2 size={20} className="text-mint" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {language === 'ko' ? '회사 정보' : 'Thông tin công ty'}
            </h2>
          </div>

          {/* Company Name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '회사명' : 'Tên công ty'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={language === 'ko' ? '한국어 회사명' : 'Tên công ty (Tiếng Hàn)'}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder={language === 'ko' ? '베트남어 회사명' : 'Tên công ty (Tiếng Việt)'}
              value={formData.companyNameVi}
              onChange={(e) => setFormData({ ...formData, companyNameVi: e.target.value })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
          </div>

          {/* Registration Numbers */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {language === 'ko' ? '사업자 등록번호' : 'Số ĐKKD'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="0123456789"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {language === 'ko' ? '세금 코드 (MST)' : 'Mã số thuế (MST)'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="0123456789-001"
                value={formData.taxCode}
                onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '사업자 형태' : 'Loại hình doanh nghiệp'}
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white focus:border-mint focus:outline-none"
            >
              <option value="limited_company">{language === 'ko' ? '유한책임회사' : 'Công ty TNHH'}</option>
              <option value="joint_stock">{language === 'ko' ? '주식회사' : 'Công ty cổ phần'}</option>
              <option value="partnership">{language === 'ko' ? '합명회사' : 'Công ty hợp danh'}</option>
              <option value="private_enterprise">{language === 'ko' ? '개인사업자' : 'Doanh nghiệp tư nhân'}</option>
              <option value="household_business">{language === 'ko' ? '가구 사업' : 'Hộ kinh doanh'}</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '사업장 주소' : 'Địa chỉ đăng ký'} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.registeredAddress}
              onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
              placeholder={language === 'ko' ? '상세 주소 입력' : 'Nhập địa chỉ chi tiết'}
              rows={3}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none resize-none"
              required
            />
          </div>

          {/* Legal Representative */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '대표자명' : 'Người đại diện pháp luật'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.legalRepresentative}
              onChange={(e) => setFormData({ ...formData, legalRepresentative: e.target.value })}
              placeholder={language === 'ko' ? '대표자 이름' : 'Tên người đại diện'}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-dark-100 border border-dark-200 rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white">
            {language === 'ko' ? '연락처 정보' : 'Thông tin liên hệ'}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {language === 'ko' ? '이메일' : 'Email'} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="company@example.com"
                className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {language === 'ko' ? '전화번호' : 'Số điện thoại'} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+84 901 234 567"
                className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
                required
              />
            </div>
          </div>
        </section>

        {/* Document Upload */}
        <section className="bg-dark-100 border border-dark-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-purple-500" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {language === 'ko' ? '서류 제출' : 'Tài liệu'}
            </h2>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '사업자등록증 이미지' : 'Giấy phép kinh doanh'} <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.certificateImage}
              onChange={(e) => setFormData({ ...formData, certificateImage: e.target.value })}
              placeholder="https://example.com/certificate.jpg"
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500">
              {language === 'ko'
                ? '📌 실제 서비스에서는 파일 업로드 기능을 사용합니다. 지금은 이미지 URL을 입력하세요.'
                : '📌 Trong dịch vụ thực tế, sử dụng chức năng tải lên tệp. Hiện tại nhập URL hình ảnh.'}
            </p>
            {formData.certificateImage && (
              <img
                src={formData.certificateImage}
                alt="Certificate preview"
                className="w-full max-w-md h-64 object-cover rounded-lg border border-dark-200"
              />
            )}
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-3">
          <Link
            href="/main/advertiser/dashboard"
            className="flex-1 bg-dark-100 border border-dark-200 text-white py-4 rounded-xl font-bold text-center hover:bg-dark-200 transition-all"
          >
            {language === 'ko' ? '취소' : 'Hủy'}
          </Link>
          <button
            type="submit"
            className="flex-1 bg-mint text-black py-4 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            {language === 'ko' ? '인증 신청' : 'Gửi yêu cầu'}
          </button>
        </div>
      </form>
    </div>
  );
}

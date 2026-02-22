'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { Building2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';

export default function BusinessVerificationPage() {
  const { language } = useLanguage();
  const t = translations[language].advertiser.verification;
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

    localStorage.setItem('businessVerification', JSON.stringify({
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-700 pb-20">
        <MobileHeader
          title={language === 'ko' ? '사업자 인증' : 'Xác minh doanh nghiệp'}
          showBack
        />
        <div className="container-mobile pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="w-full bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {t.submitted}
            </h2>
            <p className="text-gray-400 mb-6">
              {t.submittedMessage}
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-300">
                {language === 'ko' ? '이메일' : 'Email'}: {formData.email}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {language === 'ko' ? '전화' : 'Điện thoại'}: {formData.phone}
              </p>
            </div>
            <button
              onClick={() => router.push('/main/advertiser')}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              {t.goToDashboard}
            </button>
          </div>
        </div>
        <BottomNav userType="advertiser" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader
        title={language === 'ko' ? '사업자 인증' : 'Xác minh doanh nghiệp'}
        showBack
      />

      <form onSubmit={handleSubmit} className="container-mobile pt-6 pb-8 space-y-6">
        {/* Info Box */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-primary mb-1">
              {t.whyNeeded}
            </p>
            <p>
              {t.whyNeededDesc}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-primary" />
            </div>
            <h2 className="text-sm font-bold text-white">
              {t.companyInfo}
            </h2>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              {t.companyName} <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder={t.companyNameKo}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
              required
            />
            <input
              type="text"
              placeholder={t.companyNameVi}
              value={formData.companyNameVi}
              onChange={(e) => setFormData({ ...formData, companyNameVi: e.target.value })}
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Registration Numbers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                {t.businessRegNumber} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="0123456789"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                {t.taxCode} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="0123456789-001"
                value={formData.taxCode}
                onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              {t.businessType}
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none transition-colors"
            >
              <option value="limited_company" className="bg-dark-700">{t.businessTypes.limitedCompany}</option>
              <option value="joint_stock" className="bg-dark-700">{t.businessTypes.jointStock}</option>
              <option value="partnership" className="bg-dark-700">{t.businessTypes.partnership}</option>
              <option value="private_enterprise" className="bg-dark-700">{t.businessTypes.privateEnterprise}</option>
              <option value="household_business" className="bg-dark-700">{t.businessTypes.householdBusiness}</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              {t.address} <span className="text-primary">*</span>
            </label>
            <textarea
              value={formData.registeredAddress}
              onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
              placeholder={t.addressPlaceholder}
              rows={3}
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Legal Representative */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              {t.legalRepresentative} <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={formData.legalRepresentative}
              onChange={(e) => setFormData({ ...formData, legalRepresentative: e.target.value })}
              placeholder={t.legalRepresentativePlaceholder}
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-bold text-white">
              {t.contactInfo}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                {t.emailLabel} <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="company@example.com"
                className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                {t.phoneLabel} <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+84 901 234 567"
                className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <div className="w-9 h-9 bg-secondary/20 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-secondary" />
            </div>
            <h2 className="text-sm font-bold text-white">
              {t.documents}
            </h2>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">
              {t.businessLicense} <span className="text-primary">*</span>
            </label>
            <input
              type="url"
              value={formData.certificateImage}
              onChange={(e) => setFormData({ ...formData, certificateImage: e.target.value })}
              placeholder="https://example.com/certificate.jpg"
              className="w-full bg-dark-700/50 border border-dark-400/40 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
              required
            />
            <p className="text-xs text-gray-500">
              {t.businessLicenseNote}
            </p>
            {formData.certificateImage && (
              <img
                src={formData.certificateImage}
                alt="Certificate preview"
                className="w-full max-w-md h-64 object-cover rounded-xl border border-dark-400/40"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 text-gray-300 py-3.5 rounded-2xl font-bold hover:border-primary/30 transition-all"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="flex-[2] bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            {t.submit}
          </button>
        </div>
      </form>

      <BottomNav userType="advertiser" />
    </div>
  );
}

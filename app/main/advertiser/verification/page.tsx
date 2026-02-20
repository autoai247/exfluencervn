'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { ArrowLeft, Building2, FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

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
            {t.submitted}
          </h2>
          <p className="text-gray-400 mb-6">
            {t.submittedMessage}
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-300">
              📧 {t.email}: {formData.email}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              📞 {t.phone}: {formData.phone}
            </p>
          </div>
          <button
            onClick={() => router.push('/main/advertiser/dashboard')}
            className="w-full bg-mint text-black py-3 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            {t.goToDashboard}
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
                {t.title}
              </h1>
              <p className="text-sm text-gray-400">
                {t.subtitle}
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
              {t.whyNeeded}
            </p>
            <p>
              {t.whyNeededDesc}
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
              {t.companyInfo}
            </h2>
          </div>

          {/* Company Name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {t.companyName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t.companyNameKo}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder={t.companyNameVi}
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
                {t.businessRegNumber} <span className="text-red-500">*</span>
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
                {t.taxCode} <span className="text-red-500">*</span>
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
              {t.businessType}
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white focus:border-mint focus:outline-none"
            >
              <option value="limited_company">{t.businessTypes.limitedCompany}</option>
              <option value="joint_stock">{t.businessTypes.jointStock}</option>
              <option value="partnership">{t.businessTypes.partnership}</option>
              <option value="private_enterprise">{t.businessTypes.privateEnterprise}</option>
              <option value="household_business">{t.businessTypes.householdBusiness}</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {t.address} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.registeredAddress}
              onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
              placeholder={t.addressPlaceholder}
              rows={3}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none resize-none"
              required
            />
          </div>

          {/* Legal Representative */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {t.legalRepresentative} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.legalRepresentative}
              onChange={(e) => setFormData({ ...formData, legalRepresentative: e.target.value })}
              placeholder={t.legalRepresentativePlaceholder}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-mint focus:outline-none"
              required
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-dark-100 border border-dark-200 rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white">
            {t.contactInfo}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {t.emailLabel} <span className="text-red-500">*</span>
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
                {t.phoneLabel} <span className="text-red-500">*</span>
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
              {t.documents}
            </h2>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {t.businessLicense} <span className="text-red-500">*</span>
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
              {t.businessLicenseNote}
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
            {t.cancel}
          </Link>
          <button
            type="submit"
            className="flex-1 bg-mint text-black py-4 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}

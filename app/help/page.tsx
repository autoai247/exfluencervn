'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, MessageCircle, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HelpPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-700">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{t.help.title}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle size={20} className="text-primary" />
            <h3 className="font-semibold text-white">{t.help.customerSupport}</h3>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            {t.help.customerSupportDesc}
          </p>
          <button className="btn btn-primary w-full">
            <Mail size={18} className="mr-2" />
            {t.help.contactUs}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 px-1">{t.help.faq}</h3>

          <div className="card">
            <h4 className="font-semibold text-white mb-2">{t.help.faqQuestion1}</h4>
            <p className="text-sm text-gray-300">
              {t.help.faqAnswer1}
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-2">{t.help.faqQuestion2}</h4>
            <p className="text-sm text-gray-300">
              {t.help.faqAnswer2}
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-2">{t.help.faqQuestion3}</h4>
            <p className="text-sm text-gray-300">
              {t.help.faqAnswer3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

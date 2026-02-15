'use client';

import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider, useLanguage } from '@/lib/i18n/LanguageContext'
import { MessageProvider } from '@/contexts/MessageContext'
import { ReviewProvider } from '@/contexts/ReviewContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/components/common/ToastContainer'
import { useEffect } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

// Component to update metadata dynamically
function MetaTags() {
  const { t } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t.metadata.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.metadata.description);
    }

    // Update OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t.metadata.title);
    }

    // Update OG description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t.metadata.description);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t.metadata.title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', t.metadata.description);
    }
  }, [t]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>Exfluencer VN - Nền tảng tiếp thị KOL hàng đầu Việt Nam</title>
        <meta name="description" content="Kết nối KOL và thương hiệu. Tìm kiếm chiến dịch phù hợp, kiếm tiền từ nội dung của bạn." />
        <meta name="keywords" content="influencer, marketing, vietnam, korea, kol, instagram, tiktok, youtube" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#FF6B6B" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Exfluencer VN" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Exfluencer VN" />
        <meta property="og:title" content="Exfluencer VN - Nền tảng tiếp thị KOL hàng đầu Việt Nam" />
        <meta property="og:description" content="Kết nối KOL và thương hiệu. Tìm kiếm chiến dịch phù hợp, kiếm tiền từ nội dung của bạn. 🚀" />
        <meta property="og:image" content="https://exfluencer.vn/api/og/default" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://exfluencer.vn" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:locale:alternate" content="ko_KR" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exfluencer VN - Nền tảng tiếp thị KOL hàng đầu Việt Nam" />
        <meta name="twitter:description" content="Kết nối KOL và thương hiệu. Tìm kiếm chiến dịch phù hợp, kiếm tiền từ nội dung của bạn. 🚀" />
        <meta name="twitter:image" content="https://exfluencer.vn/api/og/default" />

        {/* Zalo (베트남 SNS) */}
        <meta property="zalo:image" content="https://exfluencer.vn/api/og/default" />
        <meta property="zalo:title" content="Exfluencer VN - Nền tảng Marketing Influencer" />
        <meta property="zalo:description" content="Kết nối influencer và nhà quảng cáo. Tạo chiến dịch, tìm kiếm và phát triển cùng nhau! 🚀" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <LanguageProvider>
            <ToastProvider>
              <MetaTags />
              <MessageProvider>
                <ReviewProvider>
                  {/* Mobile-first layout wrapper */}
                  <div className="min-h-screen bg-dark-700">
                    <div className="w-full max-w-mobile mx-auto bg-dark-700 min-h-screen relative">
                      {children}
                    </div>
                  </div>
                </ReviewProvider>
              </MessageProvider>
            </ToastProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

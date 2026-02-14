'use client';

import { useEffect } from 'react';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  price?: number;
  currency?: string;
}

export default function SocialMetaTags({
  title,
  description,
  image = 'https://exfluencer.vn/og-default.png',
  url,
  type = 'website',
  price,
  currency = 'VND',
}: SocialMetaTagsProps) {
  useEffect(() => {
    // 기존 OG 태그 업데이트
    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Open Graph 태그
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:type', type);

    if (url) {
      updateMeta('og:url', url);
    }

    // 상품일 경우 가격 정보
    if (price) {
      updateMeta('product:price:amount', price.toString());
      updateMeta('product:price:currency', currency);
    }

    // Twitter Card
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', image);

    // Zalo (베트남)
    updateMeta('zalo:title', title);
    updateMeta('zalo:description', description);
    updateMeta('zalo:image', image);

    // Document title
    document.title = title;

  }, [title, description, image, url, type, price, currency]);

  return null; // 렌더링 없음 (메타 태그만 업데이트)
}

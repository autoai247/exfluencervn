'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** @deprecated 앱 전체가 dark 테마로 통일되어 이 prop은 무시됩니다 */
  dark?: boolean;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Home"
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-gray-500" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors truncate max-w-[120px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium truncate max-w-[120px]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

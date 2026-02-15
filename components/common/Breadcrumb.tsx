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
  dark?: boolean;
}

export default function Breadcrumb({ items, className = '', dark = false }: BreadcrumbProps) {
  const homeClass = dark
    ? 'text-gray-400 hover:text-white transition-colors'
    : 'text-gray-500 hover:text-gray-900 transition-colors';

  const separatorClass = dark ? 'text-gray-500' : 'text-gray-400';

  const linkClass = dark
    ? 'text-gray-300 hover:text-white transition-colors truncate max-w-[120px]'
    : 'text-gray-600 hover:text-gray-900 transition-colors truncate max-w-[120px]';

  const currentClass = dark
    ? 'text-white font-medium truncate max-w-[120px]'
    : 'text-gray-900 font-medium truncate max-w-[120px]';

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        href="/"
        className={homeClass}
        aria-label="Home"
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className={separatorClass} />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className={linkClass}
            >
              {item.label}
            </Link>
          ) : (
            <span className={currentClass}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

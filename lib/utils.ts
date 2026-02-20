import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Platform, Category, Gender } from '@/types';

/**
 * Merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== Date Formatting ====================

/**
 * Format date to Korean format
 * @param date - ISO date string or Date object
 * @param formatStr - Format string (default: 'dd/MM/yyyy')
 */
export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ko });
}

/**
 * Format date to time ago (e.g., "2시간 전")
 */
export function formatTimeAgo(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
}

/**
 * Format date to Korean full format (e.g., "2024년 2월 12일 월요일")
 */
export function formatDateFull(date: string | Date): string {
  return formatDate(date, "yyyy'년' M'월' d'일' EEEE");
}

/**
 * Format date to time (e.g., "14:30")
 */
export function formatTime(date: string | Date): string {
  return formatDate(date, 'HH:mm');
}

/**
 * Format date to datetime (e.g., "12/02/2024 14:30")
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
}

// ==================== Number Formatting ====================

/**
 * Format number with Korean locale (e.g., 1000000 → "1,000,000")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * Format number to compact format (e.g., 1000000 → "1M")
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format percentage (e.g., 0.0567 → "5.67%")
 */
export function formatPercent(num: number): string {
  return (num * 100).toFixed(2) + '%';
}

// ==================== Platform Utilities ====================

/**
 * Get platform name in Vietnamese
 */
export function getPlatformName(platform: Platform): string {
  const names: Record<Platform, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    facebook: 'Facebook',
  };
  return names[platform];
}

/**
 * Get platform color class
 */
export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    instagram: 'from-purple-500 to-pink-500',
    tiktok: 'from-black to-gray-800',
    youtube: 'from-red-600 to-red-700',
    facebook: 'from-blue-600 to-blue-700',
  };
  return colors[platform];
}

/**
 * Get platform icon color
 */
export function getPlatformIconColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    instagram: 'text-pink-500',
    tiktok: 'text-black dark:text-white',
    youtube: 'text-red-600',
    facebook: 'text-blue-600',
  };
  return colors[platform];
}

// ==================== Category Utilities ====================

/**
 * Get category name in Vietnamese
 */
export function getCategoryName(category: Category): string {
  const names: Record<Category, string> = {
    fashion: 'Thời trang',
    beauty: 'Làm đẹp',
    food: 'Ẩm thực',
    travel: 'Du lịch',
    tech: 'Công nghệ',
    lifestyle: 'Phong cách sống',
    fitness: 'Thể hình',
    gaming: 'Game',
    education: 'Giáo dục',
    entertainment: 'Giải trí',
    health: 'Sức khỏe',
    home: 'Nhà cửa',
    pets: 'Thú cưng',
    sports: 'Thể thao',
    music: 'Âm nhạc',
  };
  return names[category];
}

/**
 * Get category color
 */
export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    fashion: 'bg-pink-500',
    beauty: 'bg-purple-500',
    food: 'bg-orange-500',
    travel: 'bg-blue-500',
    tech: 'bg-indigo-500',
    lifestyle: 'bg-teal-500',
    fitness: 'bg-green-500',
    gaming: 'bg-violet-500',
    education: 'bg-yellow-500',
    entertainment: 'bg-red-500',
    health: 'bg-emerald-500',
    home: 'bg-amber-500',
    pets: 'bg-cyan-500',
    sports: 'bg-lime-500',
    music: 'bg-fuchsia-500',
  };
  return colors[category];
}

// ==================== Gender Utilities ====================

/**
 * Get gender name in Vietnamese
 */
export function getGenderName(gender: Gender): string {
  const names: Record<Gender, string> = {
    male: 'Nam',
    female: 'Nữ',
    other: 'Khác',
  };
  return names[gender];
}

// ==================== Status Utilities ====================

/**
 * Get campaign status name in the given language
 */
export function getCampaignStatusName(status: string, language: 'ko' | 'vi' = 'vi'): string {
  const names: Record<string, { ko: string; vi: string }> = {
    draft: { ko: '임시저장', vi: 'Bản nháp' },
    published: { ko: '진행 중', vi: 'Đang tiến hành' },
    in_progress: { ko: '진행 중', vi: 'Đang tiến hành' },
    completed: { ko: '완료', vi: 'Hoàn thành' },
    cancelled: { ko: '취소됨', vi: 'Đã hủy' },
  };
  return names[status]?.[language] || status;
}

/**
 * Get campaign status color
 */
export function getCampaignStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-gray-500',
    published: 'bg-primary',
    in_progress: 'bg-secondary',
    completed: 'bg-success',
    cancelled: 'bg-error',
  };
  return colors[status] || 'bg-gray-500';
}

/**
 * Get application status name in the given language
 */
export function getApplicationStatusName(status: string, language: 'ko' | 'vi' = 'vi'): string {
  const names: Record<string, { ko: string; vi: string }> = {
    pending: { ko: '승인 대기', vi: 'Đang chờ duyệt' },
    accepted: { ko: '승인됨', vi: 'Đã chấp nhận' },
    rejected: { ko: '거절됨', vi: 'Đã từ chối' },
    withdrawn: { ko: '철회됨', vi: 'Đã rút' },
  };
  return names[status]?.[language] || status;
}

/**
 * Get application status color
 */
export function getApplicationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-warning',
    accepted: 'bg-success',
    rejected: 'bg-error',
    withdrawn: 'bg-gray-500',
  };
  return colors[status] || 'bg-gray-500';
}

/**
 * Get content status name in Vietnamese
 */
export function getContentStatusName(status: string): string {
  const names: Record<string, string> = {
    pending: 'Chờ nộp',
    submitted: 'Đã nộp',
    approved: 'Đã duyệt',
    rejected: 'Bị từ chối',
    revision_requested: 'Yêu cầu chỉnh sửa',
  };
  return names[status] || status;
}

// ==================== File Utilities ====================

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Chỉ chấp nhận file JPG, PNG, WEBP' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File không được vượt quá 5MB' };
  }

  return { valid: true };
}

// ==================== String Utilities ====================

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Generate slug from string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== Validation Utilities ====================

/**
 * Validate Vietnamese phone number
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(0|\+84)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate Instagram username
 */
export function validateInstagramUsername(username: string): boolean {
  const regex = /^[a-zA-Z0-9._]{1,30}$/;
  return regex.test(username);
}

/**
 * Validate TikTok username
 */
export function validateTikTokUsername(username: string): boolean {
  const regex = /^@?[a-zA-Z0-9._]{1,24}$/;
  return regex.test(username);
}

// ==================== Engagement Utilities ====================

/**
 * Calculate engagement rate
 */
export function calculateEngagementRate(
  likes: number,
  comments: number,
  shares: number,
  followers: number
): number {
  if (followers === 0) return 0;
  const totalEngagement = likes + comments + shares;
  return (totalEngagement / followers) * 100;
}

/**
 * Get engagement rate grade
 */
export function getEngagementGrade(rate: number): {
  grade: string;
  color: string;
} {
  if (rate >= 10) return { grade: 'Xuất sắc', color: 'text-green-500' };
  if (rate >= 5) return { grade: 'Tốt', color: 'text-blue-500' };
  if (rate >= 2) return { grade: 'Trung bình', color: 'text-yellow-500' };
  return { grade: 'Thấp', color: 'text-red-500' };
}

// ==================== Array Utilities ====================

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// ==================== Mobile Utilities ====================

/**
 * Detect if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detect if device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Share content (Web Share API)
 */
export async function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}

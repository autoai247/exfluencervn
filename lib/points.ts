// ============================================
// Dual Currency System
// 1. Cash (현금): Campaign earnings, withdrawable
// 2. Shopping Points (쇼핑 포인트): Platform bonuses, shop only
// ============================================

/**
 * Format cash (현금) to Vietnamese Dong (VND)
 * Used for campaign earnings - withdrawable
 * @param amount - Cash amount
 * @returns Formatted string (e.g., "1.000.000 đ")
 */
export function formatCash(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format shopping points (쇼핑 포인트)
 * Used for platform bonuses - shop only, not withdrawable
 * @param points - Shopping points amount
 * @returns Formatted string (e.g., "1,000 SP")
 */
export function formatShoppingPoints(points: number): string {
  return new Intl.NumberFormat('en-US').format(points) + ' SP';
}

/**
 * @deprecated Use formatCash() or formatShoppingPoints() instead
 * Format points to Vietnamese Dong (VND)
 * @param points - Number of VI Points
 * @returns Formatted string (e.g., "1.000.000 đ")
 */
export function formatPoints(points: number): string {
  return formatCash(points);
}

/**
 * Format points without currency symbol
 * @param points - Number of VI Points
 * @returns Formatted string (e.g., "1.000.000")
 */
export function formatPointsNumber(points: number): string {
  return new Intl.NumberFormat('vi-VN').format(points);
}

/**
 * Format large numbers in compact form (K, M, B)
 * @param num - Number to format
 * @returns Compact formatted string (e.g., "125K", "1.5M")
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

/**
 * Parse Vietnamese formatted number to points
 * @param formatted - Formatted string (e.g., "1.000.000")
 * @returns Number of points
 */
export function parsePoints(formatted: string): number {
  return parseInt(formatted.replace(/\./g, ''), 10) || 0;
}

/**
 * Calculate withdrawal fee (2% minimum 10,000 VND)
 * @param amount - Withdrawal amount
 * @returns Fee amount
 */
export function calculateWithdrawalFee(amount: number): number {
  const feePercent = 0.02; // 2%
  const minFee = 10000; // 10,000 VND minimum
  const calculatedFee = Math.floor(amount * feePercent);
  return Math.max(calculatedFee, minFee);
}

/**
 * Calculate net withdrawal amount after fee
 * @param amount - Withdrawal amount
 * @returns Net amount
 */
export function calculateNetWithdrawal(amount: number): number {
  const fee = calculateWithdrawalFee(amount);
  return amount - fee;
}

/**
 * Validate withdrawal amount
 * @param amount - Amount to withdraw
 * @param availableBalance - Available balance
 * @returns Validation result
 */
export function validateWithdrawal(amount: number, availableBalance: number): {
  valid: boolean;
  error?: string;
} {
  const minWithdrawal = 100000; // 100,000 VND minimum
  const maxWithdrawal = 50000000; // 50,000,000 VND maximum per transaction

  if (amount < minWithdrawal) {
    return {
      valid: false,
      error: `Số tiền rút tối thiểu là ${formatPoints(minWithdrawal)}`,
    };
  }

  if (amount > maxWithdrawal) {
    return {
      valid: false,
      error: `Số tiền rút tối đa là ${formatPoints(maxWithdrawal)}`,
    };
  }

  if (amount > availableBalance) {
    return {
      valid: false,
      error: 'Số dư không đủ',
    };
  }

  return { valid: true };
}

/**
 * Validate charge amount
 * @param amount - Amount to charge
 * @returns Validation result
 */
export function validateCharge(amount: number): {
  valid: boolean;
  error?: string;
} {
  const minCharge = 50000; // 50,000 VND minimum
  const maxCharge = 100000000; // 100,000,000 VND maximum per transaction

  if (amount < minCharge) {
    return {
      valid: false,
      error: `Số tiền nạp tối thiểu là ${formatPoints(minCharge)}`,
    };
  }

  if (amount > maxCharge) {
    return {
      valid: false,
      error: `Số tiền nạp tối đa là ${formatPoints(maxCharge)}`,
    };
  }

  return { valid: true };
}

/**
 * Get quick charge amounts for UI
 * @returns Array of preset amounts
 */
export function getQuickChargeAmounts(): number[] {
  return [
    100000,   // 100k
    500000,   // 500k
    1000000,  // 1M
    2000000,  // 2M
    5000000,  // 5M
    10000000, // 10M
  ];
}

/**
 * Get quick withdrawal amounts for UI
 * @param availableBalance - User's available balance
 * @returns Array of preset amounts
 */
export function getQuickWithdrawalAmounts(availableBalance: number): number[] {
  const baseAmounts = [
    100000,   // 100k
    500000,   // 500k
    1000000,  // 1M
    5000000,  // 5M
  ];

  // Filter amounts that are within balance
  const validAmounts = baseAmounts.filter(amount => amount <= availableBalance);

  // Add "All" option if balance is sufficient
  if (availableBalance >= 100000) {
    validAmounts.push(availableBalance);
  }

  return validAmounts;
}

/**
 * Calculate platform fee for campaign (10%)
 * @param amount - Campaign budget
 * @returns Fee amount
 */
export function calculatePlatformFee(amount: number): number {
  const feePercent = 0.1; // 10%
  return Math.floor(amount * feePercent);
}

/**
 * Calculate total campaign cost including fee
 * @param budgetPerInfluencer - Budget per influencer
 * @param numberOfInfluencers - Number of influencers
 * @returns Total cost
 */
export function calculateCampaignTotalCost(
  budgetPerInfluencer: number,
  numberOfInfluencers: number
): number {
  const subtotal = budgetPerInfluencer * numberOfInfluencers;
  const fee = calculatePlatformFee(subtotal);
  return subtotal + fee;
}

/**
 * Format transaction type to Vietnamese
 * @param type - Transaction type
 * @returns Vietnamese label
 */
export function formatTransactionType(type: string): string {
  const types: Record<string, string> = {
    charge: 'Nạp tiền',
    campaign_payment: 'Thanh toán chiến dịch',
    campaign_refund: 'Hoàn tiền',
    earning: 'Thu nhập',
    withdrawal: 'Rút tiền',
    withdrawal_fee: 'Phí rút tiền',
    bonus: 'Thưởng',
    penalty: 'Phạt',
  };
  return types[type] || type;
}

/**
 * Get transaction type color class
 * @param type - Transaction type
 * @returns Tailwind color class
 */
export function getTransactionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    charge: 'text-success',
    campaign_payment: 'text-error',
    campaign_refund: 'text-success',
    earning: 'text-success',
    withdrawal: 'text-error',
    withdrawal_fee: 'text-error',
    bonus: 'text-accent',
    penalty: 'text-error',
  };
  return colors[type] || 'text-gray-400';
}

/**
 * Get transaction sign (+ or -)
 * @param type - Transaction type
 * @returns Sign string
 */
export function getTransactionSign(type: string): '+' | '-' {
  const negative = ['campaign_payment', 'withdrawal', 'withdrawal_fee', 'penalty'];
  return negative.includes(type) ? '-' : '+';
}

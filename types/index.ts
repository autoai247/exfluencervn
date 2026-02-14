// ============================================
// VIET INFLUENCER - Complete Type Definitions
// Mobile-First Vietnamese Influencer Platform
// ============================================

// ==================== User Types ====================

export type UserType = 'influencer' | 'advertiser' | 'admin';
export type UserStatus = 'active' | 'pending' | 'suspended' | 'banned';

export interface User {
  id: string;
  email: string;
  userType: UserType;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  influencerProfile?: InfluencerProfile;
  advertiserProfile?: AdvertiserProfile;
}

// ==================== Influencer Types ====================

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'facebook';
export type Category = 'fashion' | 'beauty' | 'food' | 'travel' | 'tech' | 'lifestyle' | 'fitness' | 'gaming' | 'education' | 'entertainment' | 'health' | 'home' | 'pets' | 'sports' | 'music';
export type Gender = 'male' | 'female' | 'other';

export interface SocialAccount {
  platform: Platform;
  username: string;
  url: string;
  followers: number;
  engagementRate: number; // Percentage (0-100)
  verified: boolean;
  connectedAt: string;
}

export interface InfluencerProfile {
  userId: string;
  fullName: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  gender?: Gender;
  birthDate?: string;
  phone: string;
  location: string; // City/Province in Vietnam
  categories: Category[];
  socialAccounts: SocialAccount[];
  totalFollowers: number;
  avgEngagementRate: number;
  rating: number; // 0-5
  reviewCount: number;
  completedCampaigns: number;
  isVerified: boolean;
  bankInfo?: BankInfo;
  createdAt: string;

  // ==================== Extended Profile Information ====================

  // BASIC DEMOGRAPHIC INFORMATION

  // Age Range
  ageRange?: '18-24' | '25-34' | '35-44' | '45-54' | '55+';

  // Marital Status (결혼 여부)
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
  marriageYear?: number; // For newlywed campaigns

  // Education Level
  education?: 'high_school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'other';

  // Occupation/Industry
  occupation?: 'student' | 'office_worker' | 'self_employed' | 'professional' | 'creative' | 'service' | 'healthcare' | 'education' | 'homemaker' | 'other';
  occupationDetail?: string; // Specific job title

  // Income Range (Optional, for luxury/premium campaigns)
  monthlyIncome?: 'under_10m' | '10m_20m' | '20m_30m' | '30m_50m' | '50m_100m' | 'over_100m' | 'prefer_not_say'; // VND

  // LIFESTYLE INFORMATION

  // Vehicle Ownership (차량 여부)
  hasVehicle?: boolean;
  vehicleType?: ('sedan' | 'suv' | 'truck' | 'electric' | 'hybrid' | 'motorcycle' | 'scooter')[];
  vehicleBrand?: string; // e.g., "Toyota", "Honda"

  // Housing Information (주거 정보)
  housingType?: 'apartment' | 'house' | 'villa' | 'studio' | 'shared' | 'dormitory';
  ownershipStatus?: 'owned' | 'rented' | 'family_owned'; // 자가/전세/월세

  // PARENTING INFORMATION

  hasChildren?: boolean;
  childrenAges?: ('0-1' | '1-3' | '3-6' | '6-12' | '12-18')[];

  // BEAUTY-SPECIFIC INFORMATION

  skinType?: 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal';
  skinTone?: 'fair' | 'light' | 'medium' | 'tan' | 'dark';
  hairType?: 'straight' | 'wavy' | 'curly' | 'coily';
  hairColor?: 'black' | 'brown' | 'blonde' | 'red' | 'dyed' | 'other';

  // FASHION-SPECIFIC INFORMATION

  clothingSize?: {
    top?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
    bottom?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
    shoes?: string; // e.g., "38", "40", "42"
  };
  fashionStyle?: ('casual' | 'formal' | 'streetwear' | 'vintage' | 'minimalist' | 'bohemian' | 'sporty' | 'elegant')[];
  height?: number; // cm (for full-body fashion campaigns)
  weight?: number; // kg (optional)

  // FOOD-SPECIFIC INFORMATION

  dietaryRestrictions?: ('vegetarian' | 'vegan' | 'halal' | 'kosher' | 'gluten_free' | 'lactose_free' | 'none')[];
  favoriteCuisines?: ('vietnamese' | 'korean' | 'japanese' | 'western' | 'chinese' | 'thai' | 'italian' | 'other')[];

  // FITNESS-SPECIFIC INFORMATION

  bodyType?: 'slim' | 'athletic' | 'average' | 'curvy' | 'muscular';
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  exerciseFrequency?: 'rarely' | '1_2_week' | '3_4_week' | '5_6_week' | 'daily';
  preferredWorkout?: ('gym' | 'yoga' | 'running' | 'cycling' | 'swimming' | 'pilates' | 'home_workout' | 'sports')[];

  // PET INFORMATION

  hasPets?: boolean;
  petTypes?: ('dog' | 'cat' | 'bird' | 'fish' | 'hamster' | 'rabbit' | 'other')[];
  petBreeds?: string[]; // e.g., "Golden Retriever", "Persian Cat"

  // TECHNOLOGY & GADGETS

  phoneModel?: string; // e.g., "iPhone 15 Pro", "Samsung Galaxy S24"
  laptopBrand?: string;
  smartDevices?: ('smartwatch' | 'earbuds' | 'tablet' | 'smart_speaker' | 'smart_tv' | 'other')[];

  // HOBBIES & INTERESTS

  hobbies?: ('photography' | 'travel' | 'cooking' | 'gaming' | 'reading' | 'music' | 'art' | 'gardening' | 'diy' | 'other')[];
  travelFrequency?: 'rarely' | '1_2_year' | '3_6_year' | '6+_year';
}

// ==================== Advertiser Types ====================

export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type Industry = 'ecommerce' | 'fashion' | 'food' | 'tech' | 'education' | 'healthcare' | 'finance' | 'entertainment' | 'other';

export interface AdvertiserProfile {
  userId: string;
  companyName: string;
  companyLogo?: string;
  industry: Industry;
  companySize: CompanySize;
  description?: string;
  website?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  taxId?: string; // MST (Mã số thuế)
  isVerified: boolean;
  rating: number; // 0-5
  reviewCount: number;
  activeCampaigns: number;
  completedCampaigns: number;
  createdAt: string;
}

// ==================== Point System ====================

export type TransactionType =
  | 'charge'           // Nạp tiền
  | 'campaign_payment' // Thanh toán chiến dịch
  | 'campaign_refund'  // Hoàn tiền chiến dịch
  | 'earning'          // Thu nhập từ chiến dịch
  | 'withdrawal'       // Rút tiền
  | 'withdrawal_fee'   // Phí rút tiền
  | 'bonus'            // Thưởng
  | 'penalty';         // Phạt

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface PointTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number; // VI Points (1 VI Point = 1 VND)
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
  description: string;
  metadata?: {
    campaignId?: string;
    withdrawalId?: string;
    chargeId?: string;
    [key: string]: any;
  };
  createdAt: string;
  completedAt?: string;
}

export interface PointBalance {
  userId: string;
  availablePoints: number; // Số dư khả dụng
  lockedPoints: number;    // Số dư bị khóa (đang trong campaign)
  totalPoints: number;     // Tổng số dư
  updatedAt: string;
}

// ==================== Bank & Payment ====================

export type BankCode = 'VCB' | 'TCB' | 'MB' | 'VPB' | 'ACB' | 'BIDV' | 'VIB' | 'TPB' | 'SHB' | 'OTHER';

export interface BankInfo {
  bankCode: BankCode;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch?: string;
}

export type ChargeMethod = 'bank_transfer' | 'momo' | 'zalopay' | 'vnpay';
export type ChargeStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface ChargeRequest {
  id: string;
  userId: string;
  amount: number; // VND
  method: ChargeMethod;
  status: ChargeStatus;
  bankTransferInfo?: {
    bankCode: BankCode;
    accountNumber: string;
    transferCode: string;
  };
  proofImage?: string;
  note?: string;
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
}

export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number; // VI Points to withdraw
  fee: number; // Withdrawal fee
  netAmount: number; // Amount after fee
  bankInfo: BankInfo;
  status: WithdrawalStatus;
  rejectionReason?: string;
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
}

// ==================== Campaign Types ====================

export type CampaignType = 'post' | 'story' | 'video' | 'livestream' | 'review' | 'event';
export type CampaignStatus = 'draft' | 'pending' | 'recruiting' | 'published' | 'in_progress' | 'completed' | 'cancelled';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';
export type ContentStatus = 'pending' | 'submitted' | 'approved' | 'rejected' | 'revision_requested';

export interface Campaign {
  id: string;
  advertiserId: string;
  advertiser?: AdvertiserProfile;
  title: string;
  titleVi?: string; // Vietnamese translation
  description: string;
  descriptionVi?: string; // Vietnamese translation
  images?: string[];
  type: CampaignType;
  platforms: Platform[];
  categories: Category[];
  budget: number; // Total budget in VI Points
  budgetPerInfluencer: number; // Payment per influencer
  targetInfluencers: number; // Number of influencers needed
  currentInfluencers: number; // Number of accepted influencers

  // Additional fields for mock data compatibility
  company?: string;
  companyVi?: string;
  category?: Category; // Single category (deprecated, use categories array)
  currency?: string;
  locations?: string[];
  requiredFollowers?: number;
  requiredEngagement?: number;
  deadline?: string;
  selectedInfluencers?: number;
  maxInfluencers?: number;

  requirements: {
    // Basic requirements
    minFollowers?: number;
    minEngagementRate?: number;
    location?: string[];
    gender?: Gender[];
    ageRange?: { min: number; max: number };

    // Parenting requirements
    requiresParent?: boolean; // For parenting/baby products
    childAgeRange?: ('0-1' | '1-3' | '3-6' | '6-12' | '12-18')[]; // Specific child age needed

    // Beauty requirements
    skinType?: ('dry' | 'oily' | 'combination' | 'sensitive' | 'normal')[];
    skinTone?: ('fair' | 'light' | 'medium' | 'tan' | 'dark')[];

    // Fashion requirements
    clothingSizes?: {
      top?: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
      bottom?: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
    };
    fashionStyle?: ('casual' | 'formal' | 'streetwear' | 'vintage' | 'minimalist' | 'bohemian' | 'sporty' | 'elegant')[];

    // Food requirements
    dietaryRestrictions?: ('vegetarian' | 'vegan' | 'halal' | 'kosher' | 'gluten-free' | 'lactose-free' | 'none')[];

    // Fitness requirements
    bodyType?: ('slim' | 'athletic' | 'average' | 'curvy' | 'muscular')[];
    fitnessLevel?: ('beginner' | 'intermediate' | 'advanced' | 'professional')[];

    // Pet requirements
    requiresPet?: boolean; // For pet product campaigns
    petTypes?: ('dog' | 'cat' | 'bird' | 'fish' | 'other')[];

    // Lifestyle requirements
    requiresVehicle?: boolean; // For automotive product campaigns
    vehicleTypes?: ('sedan' | 'suv' | 'truck' | 'electric' | 'hybrid' | 'motorcycle' | 'scooter')[];
    maritalStatus?: ('single' | 'married' | 'divorced' | 'widowed')[];
    housingTypes?: ('apartment' | 'house' | 'villa' | 'studio' | 'shared' | 'dormitory')[];
  };
  deliverables: string[]; // What influencers need to deliver
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  status: CampaignStatus;
  applicationCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignApplication {
  id: string;
  campaignId: string;
  campaign?: Campaign;
  influencerId: string;
  influencer?: InfluencerProfile;
  status: ApplicationStatus;
  proposedPrice?: number; // Influencer can propose different price
  message?: string; // Cover letter
  portfolio?: string[]; // Links to previous work
  appliedAt: string;
  respondedAt?: string;
  rejectionReason?: string;
}

export interface ContentSubmission {
  id: string;
  campaignId: string;
  applicationId: string;
  influencerId: string;
  platform: Platform;
  contentType: CampaignType;
  contentUrl: string; // Link to published content
  screenshot?: string;
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    reach?: number;
  };
  status: ContentStatus;
  submittedAt: string;
  reviewedAt?: string;
  feedback?: string;
  revisionNote?: string;
}

// ==================== Messaging ====================

export type MessageType = 'text' | 'image' | 'file' | 'campaign_offer' | 'payment_info';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: UserType;
  type: MessageType;
  content: string;
  fileUrl?: string;
  metadata?: {
    campaignId?: string;
    offerId?: string;
    [key: string]: any;
  };
  status: MessageStatus;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  participants: {
    influencerId: string;
    advertiserId: string;
  };
  campaignId?: string; // If related to specific campaign
  lastMessage?: Message;
  unreadCount: {
    influencer: number;
    advertiser: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ==================== Notification ====================

export type NotificationType =
  | 'campaign_match'        // 매칭률 높은 새 캠페인
  | 'campaign_deadline'     // 캠페인 마감 임박
  | 'application_accepted'  // 지원 승인
  | 'application_rejected'  // 지원 거절
  | 'new_applicant'         // 새 지원자 (광고주용)
  | 'high_match_applicant'  // 높은 매칭률 지원자 (광고주용)
  | 'campaign_starting'     // 캠페인 시작 임박
  | 'content_submitted'     // 콘텐츠 제출됨 (광고주용)
  | 'content_approved'      // 콘텐츠 승인됨
  | 'content_rejected'      // 콘텐츠 거절됨
  | 'payment_received'      // 결제 완료
  | 'profile_incomplete'    // 프로필 미완성 알림
  | 'system';               // 시스템 공지

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  actionUrl?: string; // URL to navigate when clicked
  actionLabel?: string; // e.g., "지금 확인", "지원하기"
  metadata?: {
    campaignId?: string;
    applicationId?: string;
    matchingScore?: number;
    deadline?: string;
    [key: string]: any;
  };
  createdAt: string;
  readAt?: string;
  expiresAt?: string; // Auto-expire after certain time
}

export interface NotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  preferences: {
    campaignMatch: boolean;
    campaignDeadline: boolean;
    applicationUpdates: boolean;
    newApplicants: boolean;
    contentUpdates: boolean;
    payments: boolean;
    marketing: boolean;
  };
}

// ==================== Review & Rating ====================

export type ReviewTarget = 'influencer' | 'advertiser';

export interface Review {
  id: string;
  campaignId: string;
  reviewerId: string;
  reviewerType: UserType;
  targetId: string;
  targetType: ReviewTarget;
  rating: number; // 1-5
  comment?: string;
  pros?: string[];
  cons?: string[];
  isAnonymous: boolean;
  createdAt: string;
}

// ==================== Analytics ====================

export interface InfluencerStats {
  userId: string;
  period: 'week' | 'month' | 'year' | 'all';
  totalEarnings: number;
  totalCampaigns: number;
  completedCampaigns: number;
  inProgressCampaigns: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  avgRating: number;
  totalReviews: number;
  profileViews: number;
  socialGrowth: {
    platform: Platform;
    followersGained: number;
    engagementChange: number;
  }[];
}

export interface AdvertiserStats {
  userId: string;
  period: 'week' | 'month' | 'year' | 'all';
  totalSpent: number;
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalApplications: number;
  totalInfluencers: number;
  avgCampaignBudget: number;
  avgRating: number;
  totalReviews: number;
  totalReach: number;
  totalEngagement: number;
}

// ==================== Settings ====================

export interface NotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    campaigns: boolean;
    applications: boolean;
    payments: boolean;
    messages: boolean;
    marketing: boolean;
  };
}

export interface PrivacySettings {
  userId: string;
  profileVisibility: 'public' | 'private' | 'verified_only';
  showEmail: boolean;
  showPhone: boolean;
  showSocialStats: boolean;
  allowMessages: 'everyone' | 'verified_only' | 'none';
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: Category[];
  platform?: Platform[];
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  location?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ==================== Influencer Search (Advertiser) ====================

export interface InfluencerSearchFilters {
  // Basic filters
  categories?: Category[];
  platforms?: Platform[];
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  maxEngagement?: number;
  location?: string[];
  gender?: Gender[];
  ageRange?: string[];

  // Extended filters
  skinType?: string[];
  skinTone?: string[];
  hasVehicle?: boolean;
  hasChildren?: boolean;
  hasPets?: boolean;
  maritalStatus?: string[];

  // Sorting
  sortBy?: 'followers' | 'engagement' | 'rating' | 'completedCampaigns' | 'matchingScore';
  sortOrder?: 'asc' | 'desc';
}

export interface InfluencerSearchResult {
  influencer: InfluencerProfile;
  matchingScore: number; // 0-100
  matchingDetails: {
    criteriaMatched: string[];
    criteriaMissing: string[];
  };
  isAvailable: boolean; // Currently available for campaigns
  estimatedReach?: number; // Estimated audience reach
  avgCampaignPerformance?: {
    avgViews: number;
    avgLikes: number;
    avgComments: number;
    avgShares: number;
  };
}

export interface CampaignInvitation {
  id: string;
  campaignId: string;
  campaign?: Campaign;
  advertiserId: string;
  influencerId: string;
  influencer?: InfluencerProfile;
  message: string; // Personalized invitation message
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  sentAt: string;
  respondedAt?: string;
  expiresAt: string; // Auto-expire after 7 days
}

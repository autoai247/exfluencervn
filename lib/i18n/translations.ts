export type Language = 'vi' | 'ko';

export interface Translations {
  // Common
  common: {
    all: string;
    back: string;
    next: string;
    previous: string;
    skip: string;
    start: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    add: string;
    search: string;
    filter: string;
    loading: string;
    noData: string;
    error: string;
    success: string;
    confirm: string;
    submit: string;
    sort: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    yesterday: string;
    daysAgo: string;
    weeksAgo: string;
  };

  // Navigation
  nav: {
    home: string;
    campaigns: string;
    shop: string;
    favorites: string;
    messages: string;
    stats: string;
    profile: string;
    notifications: string;
    wallet: string;
    ranking: string;
    analytics: string;
    kol: string;
  };

  // Campaigns
  campaign: {
    title: string;
    create: string;
    detail: string;
    apply: string;
    eligible: string;
    notEligible: string;
    deadline: string;
    budget: string;
    applicants: string;
    matching: string;
    requirements: string;
    description: string;
    categories: string;
    platforms: string;
    location: string;
    period: string;
    reward: string;
    status: {
      active: string;
      completed: string;
      pending: string;
      draft: string;
    };
    recommendedForYou: string;
    whyRecommended: string;
    matchingPercentage: string;
    eligibilityCheck: string;
    failureReasons: {
      followers: string;
      engagement: string;
      platform: string;
      location: string;
      vehicle: string;
      parent: string;
      pet: string;
      maritalStatus: string;
      skinType: string;
      skinTone: string;
      clothingSize: string;
    };
  };

  // Influencer
  influencer: {
    profile: string;
    followers: string;
    engagement: string;
    rating: string;
    completedCampaigns: string;
    search: string;
    invite: string;
    portfolio: string;
  };

  // Advertiser
  advertiser: {
    brandAccount: string;
    verifiedAdvertiser: string;
    // Verification page
    verification: {
      title: string;
      subtitle: string;
      submitted: string;
      submittedMessage: string;
      email: string;
      phone: string;
      goToDashboard: string;
      whyNeeded: string;
      whyNeededDesc: string;
      companyInfo: string;
      companyName: string;
      companyNameKo: string;
      companyNameVi: string;
      businessRegNumber: string;
      taxCode: string;
      businessType: string;
      address: string;
      addressPlaceholder: string;
      legalRepresentative: string;
      legalRepresentativePlaceholder: string;
      contactInfo: string;
      emailLabel: string;
      phoneLabel: string;
      documents: string;
      businessLicense: string;
      businessLicenseNote: string;
      cancel: string;
      submit: string;
      required: string;
      businessTypes: {
        limitedCompany: string;
        jointStock: string;
        partnership: string;
        privateEnterprise: string;
        householdBusiness: string;
      };
    };
    // Influencer detail page
    influencerDetail: {
      influencers: string;
      totalFollowers: string;
      allPlatforms: string;
      avgFollowers: string;
      perPlatform: string;
      engagement: string;
      avgViews: string;
      completedCampaigns: string;
      rating: string;
      snsChannels: string;
      channels: string;
      engagementRate: string;
      categories: string;
      reviews: string;
      reviewsCount: string;
      overallRating: string;
      viewAll: string;
      workStyle: string;
      basicInfo: string;
      gender: string;
      male: string;
      female: string;
      age: string;
      skinType: string;
      skinTone: string;
      lifestyleInfo: string;
      maritalStatus: string;
      single: string;
      married: string;
      divorced: string;
      preferNotToSay: string;
      children: string;
      yes: string;
      no: string;
      pets: string;
      dog: string;
      cat: string;
      bird: string;
      fish: string;
      other: string;
      hasVehicle: string;
      languageEducation: string;
      languages: string;
      korean: string;
      vietnamese: string;
      english: string;
      education: string;
      bachelor: string;
      master: string;
      phd: string;
      occupation: string;
      contentCreator: string;
      interests: string;
      beauty: string;
      fashion: string;
      travel: string;
      food: string;
      fitness: string;
      lifestyle: string;
      smoker: string;
      drinker: string;
      never: string;
      occasionally: string;
      regularly: string;
      recentWorks: string;
      contentStyleCheck: string;
      contentStyleTip: string;
      views: string;
      contact: string;
      contactTitle: string;
      contactMessage: string;
      sendProposal: string;
      proposalSent: string;
      campaignInfo: string;
      brand: string;
      completedDate: string;
      payment: string;
      deliverables: string;
      results: string;
      likes: string;
      comments: string;
      saves: string;
      close: string;
      advertiserReview: string;
      wouldRecommend: string;
      profilePagePreparing: string;
    };
    // Profile edit page
    profileEdit: {
      title: string;
      accountManagement: string;
      accountManagementDesc: string;
      logo: string;
      uploadLogo: string;
      changeLogo: string;
      logoNote: string;
      basicInfo: string;
      country: string;
      selectCountry: string;
      countryNote: string;
      other: string;
      companyName: string;
      companyNamePlaceholder: string;
      ceoName: string;
      ceoNamePlaceholder: string;
      contactPerson: string;
      contactPersonPlaceholder: string;
      businessInfo: string;
      businessRegNumber: string;
      businessRegNumberPlaceholder: string;
      taxCode: string;
      taxCodePlaceholder: string;
      businessType: string;
      businessTypePlaceholder: string;
      businessCategory: string;
      businessCategoryPlaceholder: string;
      establishmentDate: string;
      employeeCount: string;
      employeeCountPlaceholder: string;
      capital: string;
      capitalPlaceholder: string;
      businessLicense: string;
      businessLicenseDesc: string;
      ecommerceLicense: string;
      ecommerceLicenseDesc: string;
      otherDocuments: string;
      otherDocumentsDesc: string;
      selectFile: string;
      changeFile: string;
      removeDocument: string;
      documentNote: string;
      uploaded: string;
      contactInfo: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      fax: string;
      faxPlaceholder: string;
      website: string;
      websitePlaceholder: string;
      snsInfo: string;
      facebook: string;
      facebookPlaceholder: string;
      instagram: string;
      instagramPlaceholder: string;
      tiktok: string;
      tiktokPlaceholder: string;
      youtube: string;
      youtubePlaceholder: string;
      addressInfo: string;
      address: string;
      addressPlaceholder: string;
      addressDetail: string;
      addressDetailPlaceholder: string;
      companyIntro: string;
      bio: string;
      bioPlaceholder: string;
      saveChanges: string;
      saving: string;
      cancel: string;
      successTitle: string;
      successMessage: string;
      required: string;
      optional: string;
      imageOnly: string;
      maxFileSize: string;
      fileSizeError: string;
      allowedFileTypes: string;
      fileTypeError: string;
    };
    // Analytics page
    analytics: {
      overview: string;
      budget: string;
      roi: string;
      performance: string;
      totalSpent: string;
      totalBudget: string;
      avgCampaignBudget: string;
      totalReach: string;
      avgROI: string;
      totalInfluencers: string;
      activeCampaigns: string;
      completedCampaigns: string;
      budgetUtilization: string;
      topPerformingCampaigns: string;
      budgetAnalysis: string;
      roiAnalysis: string;
      roiDesc: string;
      overallPerformance: string;
      performanceDesc: string;
      dataInfo: string;
      dataInfoDesc: string;
    };
    // Campaigns page
    campaigns: {
      createCampaign: string;
      search: string;
      all: string;
      active: string;
      completed: string;
      draft: string;
      budget: string;
      budgetUsed: string;
      spent: string;
      applicants: string;
      accepted: string;
      views: string;
      deadline: string;
      noCampaigns: string;
      createFirst: string;
      viewDetails: string;
    };
    // Profile page
    profile: {
      title: string;
      businessAccount: string;
      businessSubtitle: string;
      verified: string;
      activityStats: string;
      totalCampaigns: string;
      activeCampaigns: string;
      completedCampaigns: string;
      totalBudget: string;
      totalBudgetDesc: string;
      totalInfluencers: string;
      accountManagement: string;
      editProfile: string;
      verification: string;
      verificationDesc: string;
      settings: string;
      logout: string;
      memberSince: string;
      snsChannels: string;
    };
  };

  // Analytics
  analyticsPage: {
    title: string;
    performanceAnalytics: string;
    trackActivity: string;
    thisMonth: string;
    totalStats: string;
    recentCampaigns: string;
    campaigns: string;
    earnings: string;
    views: string;
    engagement: string;
    totalCampaigns: string;
    totalEarnings: string;
    followers: string;
    avgRating: string;
    completed: string;
  };

  // Profile
  profile: {
    basic: string;
    demographic: string;
    lifestyle: string;
    beauty: string;
    completion: string;
    edit: string;
    completionPercentage: string;
    missingFields: string;
    name: string;
    email: string;
    phone: string;
    bio: string;
    zaloDescription: string;
    socialMediaUrls: string;
    followerCount: string;
    subscriberCount: string;
    lastUpdated: string;
    gender: string;
    selectOption: string;
    male: string;
    female: string;
    other: string;
    any: string;
    ageRange: string;
    years: string;
    yearsAndAbove: string;
    location: string;
    hasVehicle: string;
    parentingInfo: string;
    hasChildren: string;
    fashionInfo: string;
    foodInfo: string;
    fitnessInfo: string;
    petInfo: string;
    hasPets: string;
    techGadgets: string;
    hobbiesInterests: string;
    whyDetailedInfo: string;
    detailedInfoBenefit: string;
    infoExample1: string;
    infoExample2: string;
    infoExample3: string;
    infoExample4: string;
    infoExample5: string;
    accurateInfoBenefit: string;
    saveChanges: string;
    profileUpdated: string;
    // Field labels
    profilePhoto: string;
    introduction: string;
    maritalStatus: string;
    education: string;
    occupation: string;
    housingType: string;
    childrenStatus: string;
    petStatus: string;
    vehicleOwnership: string;
    hobbies: string;
    skinType: string;
    skinTone: string;
    hairType: string;
    smartphoneModel: string;
    smartDevices: string;
    instagramConnection: string;
    tiktokConnection: string;
    youtubeConnection: string;
    facebookConnection: string;
    // Marital status values
    single: string;
    married: string;
    divorced: string;
    widowed: string;
    // Education values
    bachelor: string;
    master: string;
    doctorate: string;
    // Housing type values
    apartment: string;
    house: string;
    villa: string;
    studio: string;
    sharedHouse: string;
    dormitory: string;
    // Children values
    noChildren: string;
    oneChild: string;
    twoChildren: string;
    threeOrMoreChildren: string;
    // Pet values
    noPets: string;
    dog: string;
    cat: string;
    bird: string;
    fish: string;
    otherPet: string;
    // Vehicle values
    noVehicle: string;
    sedan: string;
    suv: string;
    truck: string;
    electricCar: string;
    hybrid: string;
    motorcycle: string;
    scooter: string;
    // Skin type values
    drySkin: string;
    oilySkin: string;
    combinationSkin: string;
    sensitiveSkin: string;
    normalSkin: string;
    // Skin tone values
    veryFair: string;
    fair: string;
    medium: string;
    tan: string;
    dark: string;
    // Hair type values
    straightHair: string;
    wavyHair: string;
    curlyHair: string;
    coilyHair: string;
    // UI Messages
    itemsCompleted: string;
    completeProfileForMore: string;
    higherCompletionBetterMatching: string;
    perfectProfile: string;
    allInfoCompleted: string;
    viewMissingItems: string;
    viewEarnings: string;
    averageRating: string;
    viewReviews: string;
    snsShareBonus: string;
    pendingReview: string;
    pointsAfterApproval: string;
    snsConnected: string;
    verified: string;
    followers: string;
    connected: string;
    connect: string;
    // Section titles
    detailedProfile: string;
    basicInfo: string;
    lifestyleInfo: string;
    beautyInfo: string;
    techGadgetsInfo: string;
    hobbiesInterestsInfo: string;
    rewardsBenefits: string;
    myActivities: string;
    accountSettings: string;
    support: string;
    // Cards and links
    inviteAdvertiser: string;
    inviteAdvertiserDesc: string;
    attendanceCheck: string;
    attendanceCheckDesc: string;
    inviteFriends: string;
    inviteFriendsDesc: string;
    pointsShop: string;
    pointsShopDesc: string;
    myCampaigns: string;
    myCampaignsDesc: string;
    completedCampaigns: string;
    completedCampaignsDesc: string;
    inProgressWork: string;
    inProgressWorkDesc: string;
    favoriteCampaigns: string;
    favoriteCampaignsDesc: string;
    myRaffleTickets: string;
    myRaffleTicketsDesc: string;
    messages: string;
    messagesDesc: string;
    myRanking: string;
    myRankingDesc: string;
    wallet: string;
    walletDesc: string;
    statistics: string;
    statisticsDesc: string;
    portfolio: string;
    portfolioDesc: string;
    notificationSettings: string;
    notificationSettingsDesc: string;
    settings: string;
    settingsDesc: string;
    help: string;
    termsOfService: string;
    privacyPolicy: string;
    logout: string;
  };

  // Avatar Upload
  avatarUpload: {
    changePhoto: string;
    uploadPhoto: string;
    uploadProfilePhoto: string;
    cancel: string;
  };

  // Image Upload
  imageUpload: {
    imageFilesOnly: string;
    fileSizeLimit: string;
    dropImage: string;
    uploadImage: string;
    dragDropOrClick: string;
  };

  // Notifications
  notification: {
    title: string;
    unread: string;
    all: string;
    markAllRead: string;
    settings: string;
    types: {
      campaignMatch: string;
      deadline: string;
      accepted: string;
      rejected: string;
      payment: string;
    };
  };

  // Wallet
  wallet: {
    title: string;
    balance: string;
    withdraw: string;
    history: string;
    pending: string;
    completed: string;
    cashPoints: string;
    shoppingPoints: string;
    withdrawalRequest: string;
    availableBalance: string;
    withdrawalAmount: string;
    allAmount: string;
    minimumWithdrawalError: string;
    minimumWithdrawalErrorSuffix: string;
    exceededBalanceError: string;
    withdrawalAccount: string;
    defaultAccount: string;
    withdrawalSummary: string;
    requestedAmount: string;
    fee: string;
    actualDeposit: string;
    withdrawalGuide: string;
    minimumWithdrawal: string;
    withdrawalFee: string;
    minimum: string;
    processingTime: string;
    processingDays: string;
    noCancellation: string;
    confirmWithdrawal: string;
    depositAccount: string;
    confirmWarning: string;
    withdrawalSuccess: string;
    registeredAccounts: string;
    earnHow: string;
    pointsUsageGuide: string;
    earnCampaignBonus: string;
    earnDailyCheckIn: string;
    earnReferral: string;
    earnSNSShare: string;
    earning: string;
    credited: string;
    spending: string;
    withdrawal: string;
    recentTransactions: string;
    minimumWithdrawalAmount: string;
    withdrawalFeeRate: string;
    processingTimeDays: string;
    pointsInstantCredit: string;
    pointsNoWithdrawal: string;
    pointsShopOnly: string;
    pointsExpiryPeriod: string;
  };

  // Review
  review: {
    title: string;
    write: string;
    rating: string;
    comment: string;
    submit: string;
    professionalism: string;
    punctuality: string;
    communication: string;
    creativity: string;
    performance: string;
    overallRating: string;
    reviewsCount: string;
    categoryRatings: string;
    allReviews: string;
    helpful: string;
  };

  // Portfolio
  portfolio: {
    title: string;
    addNew: string;
    statistics: string;
    totalViews: string;
    totalLikes: string;
    avgEngagement: string;
    avgRating: string;
    filterAll: string;
    emptyState: string;
    emptyStateDesc: string;
    viewContent: string;
  };

  // Messages
  messages: {
    title: string;
    search: string;
    allMessages: string;
    unread: string;
    brands: string;
    support: string;
    noMessages: string;
    noMessagesDesc: string;
    typeMessage: string;
    quickReply1: string;
    quickReply2: string;
    quickReply3: string;
    quickReply4: string;
    gallery: string;
    camera: string;
    file: string;
    viewCampaign: string;
  };

  // Onboarding
  onboarding: {
    welcome: {
      title: string;
      description: string;
    };
    campaigns: {
      title: string;
      description: string;
    };
    eligibility: {
      title: string;
      description: string;
    };
    timeline: {
      title: string;
      description: string;
    };
    revenue: {
      title: string;
      description: string;
    };
    portfolio: {
      title: string;
      description: string;
    };
    messages: {
      title: string;
      description: string;
    };
    notifications: {
      title: string;
      description: string;
    };
    wallet: {
      title: string;
      description: string;
    };
    complete: {
      title: string;
      description: string;
    };
    step: string;
    completed: string;
    skipTutorial: string;
    features: {
      campaign: string;
      revenue: string;
      portfolio: string;
      messages: string;
      notifications: string;
      wallet: string;
    };
  };

  // Korea Dream & Shop
  koreaDream: {
    title: string;
    subtitle: string;
    winnersTitle: string;
    winnersDesc: string;
    season: string;
    verified: string;
    photos: string;
    callToAction: string;
    exchangeTickets: string;
    buyNow: string;
    confirmPurchase: string;
    bestseller: string;
    flightAndHotel: string;
    beautyAndShopping: string;
    totalValue: string;
    targetGoal: string;
    ticketsUnit: string;
    progressText: string;
    myTickets: string;
    koreanBeautyExperience: string;
    targetTickets: string;
    ticketProgress: string;
    // Prize details
    roundTripFlight: string;
    fourStarHotel: string;
    beautyTreatment: string;
    shoppingCredit: string;
    brandSponsorship: string;
    roundTripFlightDetail: string;
    fourStarHotelDetail: string;
    beautyTreatmentDetail: string;
    shoppingCreditDetail: string;
    brandSponsorshipDetail: string;
    roundTripFlightValue: string;
    fourStarHotelValue: string;
    beautyTreatmentValue: string;
    shoppingCreditValue: string;
    brandSponsorshipValue: string;
    // Progress section
    liveStatus: string;
    realtimeProgress: string;
    currentProgress: string;
    collectedTickets: string;
    remainingQuantity: string;
    participants: string;
    remainingToTarget: string;
    drawingIn7Days: string;
    // My tickets
    estimatedWinChance: string;
    currentRank: string;
    noTicketsYet: string;
    exchangeTicketsNow: string;
    // Prize composition
    prizeComposition: string;
    professionalGuide: string;
    // Exchange section
    ticketExchange: string;
    myPoints: string;
    exchangeRate: string;
    basicExchangeRate: string;
    bulkBonusInfo: string;
    basic: string;
    bonus: string;
    total: string;
    perTicket: string;
    discount: string;
    warning: string;
    warningLine1: string;
    warningLine2: string;
    warningLine3: string;
    // Ranking
    rankingTop5: string;
    tickets: string;
    winProbability: string;
    viewAllRanking: string;
    // Earn points
    howToEarnPoints: string;
    dailyAttendance: string;
    inviteFriends: string;
    shareCampaign: string;
    completeMission: string;
    dailyPoints: string;
    invitePoints: string;
    sharePoints: string;
    missionPoints: string;
    // CTA
    seeYouInKorea: string;
    moreTicketsMoreChance: string;
    collectPointsNow: string;
    // Exchange modal
    confirmExchange: string;
    pointsToUse: string;
    basicTickets: string;
    bonusTickets: string;
    totalTicketsReceived: string;
    exchangeWarningModal: string;
    cancel: string;
    // Alerts
    insufficientPoints: string;
    exchangeSuccessMessage: string;
    pointsUsed: string;
    ticketsReceived: string;
    bonusIncluded: string;
  };

  winners: {
    title: string;
    subtitle: string;
    seasonLabel: string;
    winnerLabel: string;
    youCouldBeNext: string;
  };

  // Dashboard (Home)
  dashboard: {
    cashAvailable: string;
    withdrawable: string;
    tapToWithdraw: string;
    shoppingPoints: string;
    useInShop: string;
    tapToShop: string;
    totalEarnings: string;
    completedCampaigns: string;
    inProgress: string;
    myTickets: string;
    checkDetails: string;
    recentActivities: string;
    viewAll: string;
    noCampaigns: string;
    findCampaigns: string;
    overview: string;
    campaigns: string;
    followers: string;
    engagementRate: string;
    pendingAmount: string;
    campaignEarnings: string;
    platformBonus: string;
    convertToTickets: string;
    totalShoppingPoints: string;
    pendingApproval: string;
    applicationHistory: string;
    ticketsCount: string;
    inProgressCampaignsTitle: string;
    daysLeft: string;
    monthlyEarnings: string;
    completedAndPaid: string;
    inProgressExpected: string;
    waitingStatus: string;
    expectedTotalEarnings: string;
    monthlyTrend: string;
    lastSixMonths: string;
    september: string;
    october: string;
    november: string;
    december: string;
    january: string;
    february: string;
    snsSharingBonus: string;
    campaignsShared: string;
    viewHistory: string;
    pointsShop: string;
    buyWithPoints: string;
    myShoppingPoints: string;
    koreaTicket: string;
    giftCard: string;
    premium: string;
    shopNow: string;
    growthAndRewards: string;
    attendanceCheck: string;
    consecutiveDays: string;
    canEarn: string;
    ranking: string;
    rankingPosition: string;
    topReward: string;
    inviteFriends: string;
    peopleInvited: string;
    lifetimeCommission: string;
    inviteAdvertiser: string;
    priorityMatching: string;
    perPerson: string;
    deadline: string;
    earnedReward: string;
    expectedReward: string;
    performanceTip: string;
    performanceTipText: string;
    viewStats: string;
    collectMore: string;
    collectTickets: string;
    stepApply: string;
    stepApprove: string;
    stepInProgress: string;
    stepSubmit: string;
    stepReview: string;
    stepComplete: string;
    viewDetails: string;
    peopleCount: string;
  };

  // Referral
  referral: {
    title: string;
    inviteCode: string;
    copyCode: string;
    shareLink: string;
    totalInvited: string;
    totalEarned: string;
    shareOnSocial: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    inviteHistory: string;
    noInvites: string;
    inviteNow: string;
    earnPerInvite: string;
    bonusInfo: string;
    specialBonus: string;
    inviteOne: string;
    freeTickets: string;
    points: string;
    limitedBonus: string;
    everyCampaign: string;
    autoPayment: string;
    monthlyAutoIncome: string;
    totalReferralIncome: string;
    permanent5Percent: string;
    myReferralCode: string;
    copyCodeButton: string;
    shareDirectly: string;
    whatsappShareText: string;
    copyLink: string;
    permanent5System: string;
    inviteFriend: string;
    shareCodeOrLink: string;
    friendSignupComplete: string;
    bothReceiveBonus: string;
    lifetime5Auto: string;
    friendEveryCampaign: string;
    calculationExample: string;
    notDeductFromFriend: string;
    whyGood: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    estimatedIncomeCalculator: string;
    myReferrals: string;
    active: string;
    pending: string;
    my5Income: string;
    completedCampaigns: string;
    friendAutoPayment: string;
    signupDate: string;
    bothReceiveAfterSignup: string;
    noInvitesYet: string;
    inviteForLifetime5: string;
    inviteNowButton: string;
    codeCopied: string;
    linkCopied: string;
    inviteTitle: string;
    inviteMessage: string;
  };

  // Attendance
  attendance: {
    title: string;
    checkIn: string;
    todayReward: string;
    streak: string;
    days: string;
    totalCheckins: string;
    thisMonth: string;
    calendar: string;
    rewards: string;
    checkInSuccess: string;
    alreadyChecked: string;
    comeBackTomorrow: string;
  };

  // Ranking
  ranking: {
    title: string;
    myRank: string;
    topInfluencers: string;
    thisMonth: string;
    allTime: string;
    rank: string;
    name: string;
    earnings: string;
    campaigns: string;
    fullList: string;
    fullRankings: string;
    hero: {
      title: string;
      subtitle: string;
    };
    resetInfo: string;
    campaignsUnit: string;
    you: string;
    season: {
      currentSeason: string;
      seasonEnd: string;
      warning: string;
    };
    nextRank: {
      toNext: string;
      needed: string;
      canPass: string;
      boost: string;
    };
    motivation: {
      top10: string;
      almost: string;
      keepGoing: string;
    };
    liveActivity: {
      title: string;
    };
    topMovers: {
      title: string;
      message: string;
    };
    podium: {
      champions: string;
    };
    rewards: {
      title: string;
      resetInfo: string;
      warning: string;
    };
    cta: {
      title: string;
      subtitle: string;
      earnPoints: string;
      dailyCheck: string;
    };
  };

  // Favorites
  favorites: {
    title: string;
    noCampaigns: string;
    browseCampaigns: string;
    removeFromFavorites: string;
    addedOn: string;
    cashCampaigns: string;
    pointsCampaigns: string;
    items: string;
    emptyMessage: string;
  };

  // My Campaigns
  myCampaigns: {
    title: string;
    subtitle: string;
    stats: {
      active: string;
      completed: string;
      totalEarnings: string;
      pending: string;
    };
    tabs: {
      all: string;
      active: string;
      completed: string;
      rejected: string;
    };
    empty: {
      all: string;
      active: string;
      completed: string;
      rejected: string;
    };
    viewDetails: string;
    appliedAt: string;
    selectedAt: string;
    completedAt: string;
    paymentAgreed: string;
    paymentAgreement: string;
    paymentAgreementDesc: string;
    paymentCompleted: string;
    deliveryTracking: string;
    courier: string;
    trackingNumber: string;
    estimatedDelivery: string;
    rejectionReason: string;
  };

  // Completed
  completed: {
    title: string;
    totalCompleted: string;
    totalEarned: string;
    noCampaigns: string;
    startWorking: string;
    completedOn: string;
    earned: string;
    viewDetails: string;
    downloadReceipt: string;
    emptyDescription: string;
    infoTitle: string;
    infoCash: string;
    infoPoints: string;
    infoRating: string;
    infoReceipt: string;
    receiptContent: {
      campaignName: string;
      status: string;
      statusPaid: string;
      note: string;
    };
  };

  // Raffle
  raffle: {
    myTickets: string;
    totalTickets: string;
    ticketUnit: string;
    eventsParticipated: string;
    pointsUsed: string;
    totalInvestment: string;
    increaseChance: string;
    moreTicketsMoreChance: string;
    participationStatus: string;
    collectMore: string;
    noEntries: string;
    buyTicketsDescription: string;
    tryForPrizes: string;
    buyTicketsFromShop: string;
    prizeValue: string;
    estimatedWinChance: string;
    total: string;
    purchaseHistory: string;
    items: string;
    view: string;
    buyMore: string;
    checkRanking: string;
    compareWithOthers: string;
    ticketGuide: string;
    guideLine1: string;
    guideLine2: string;
    guideLine3: string;
    guideLine4: string;
  };

  // Share History
  shareHistory: {
    title: string;
    totalShares: string;
    totalEarned: string;
    filterAll: string;
    filterPending: string;
    filterApproved: string;
    filterRejected: string;
    statusPending: string;
    statusApproved: string;
    statusRejected: string;
    noShares: string;
    noSharesFiltered: string;
    shareAndEarn: string;
    submittedLink: string;
    averageReviewTime: string;
    approvedAt: string;
    viewReason: string;
    rejectionReason: string;
    reviewGuideTitle: string;
    reviewGuideLine1: string;
    reviewGuideLine2: string;
    reviewGuideLine3: string;
    reviewGuideLine4: string;
    whereToShare: string;
    facebookGroups: string;
    personalTimeline: string;
    facebookPages: string;
    publicPostWarning: string;
  };

  // Points Stats
  pointsStats: {
    title: string;
    totalEarned: string;
    totalSpent: string;
    totalTickets: string;
    participatedRaffles: string;
    thisMonthSpending: string;
    lastMonthVs: string;
    avgPerRaffle: string;
    recentTransactions: string;
    noTransactions: string;
    ticketsPurchased: string;
    earnTipsTitle: string;
    earnTip1: string;
    earnTip2: string;
    earnTip3: string;
    loading: string;
  };

  // Invite Advertiser
  inviteAdvertiser: {
    title: string;
    subtitle: string;
    inviteAndEarn: string;
    totalEarnings: string;
    activeAdvertisers: string;
    myBenefits: string;
    signupBonus: string;
    signupBonusDesc: string;
    firstCampaignBonus: string;
    firstCampaignBonusDesc: string;
    ongoingCommission: string;
    ongoingCommissionDesc: string;
    priorityMatching: string;
    priorityMatchingDesc: string;
    brandBenefits: string;
    firstCampaignDiscount: string;
    freeCollaboration: string;
    premiumSupport: string;
    verifiedKolList: string;
    winWinNote: string;
    myInviteCode: string;
    copyCode: string;
    copied: string;
    copyLink: string;
    shareToAdvertiser: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    inviteHistory: string;
    statusActive: string;
    statusPending: string;
    inviteDate: string;
    campaigns: string;
    totalEarningsLabel: string;
    viewBrandCampaigns: string;
    noInvites: string;
    noInvitesDesc: string;
    successTipsTitle: string;
    successTip1: string;
    successTip2: string;
    successTip3: string;
    successTip4: string;
    successTip5: string;
  };

  // Homepage
  homepage: {
    loading: string;
    platformName: string;
    tagline: string;
    kols: string;
    brands: string;
    campaigns: string;
    freeSignup: string;
    fastMatching: string;
    securePayment: string;
    howToStart: string;
    influencerRole: string;
    influencerDesc: string;
    avgMonthlyEarning: string;
    free: string;
    activeCampaigns: string;
    advertiserRole: string;
    advertiserDesc: string;
    avgROI: string;
    verifiedKOL: string;
    realtimeAnalysis: string;
    startNowFree: string;
    signupText: string;
    loginText: string;
    agreeToTerms: string;
    termsLink: string;
    privacyLink: string;
    adminLogin: string;
    and: string;
    agreeBySigningUp: string;
    // How It Works
    howItWorksTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    // For Influencers
    forInfluencersTitle: string;
    influencerBenefit1Title: string;
    influencerBenefit1Desc: string;
    influencerBenefit2Title: string;
    influencerBenefit2Desc: string;
    influencerBenefit3Title: string;
    influencerBenefit3Desc: string;
    influencerBenefit4Title: string;
    influencerBenefit4Desc: string;
    // For Advertisers
    forAdvertisersTitle: string;
    advertiserBenefit1Title: string;
    advertiserBenefit1Desc: string;
    advertiserBenefit2Title: string;
    advertiserBenefit2Desc: string;
    advertiserBenefit3Title: string;
    advertiserBenefit3Desc: string;
    advertiserBenefit4Title: string;
    advertiserBenefit4Desc: string;
    // Success Stats
    successStatsTitle: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
    // Platforms
    platformsTitle: string;
    platformsSubtitle: string;
    // Final CTA
    readyToStart: string;
    joinNow: string;
  };

  // Auth
  auth: {
    login: {
      title: string;
      welcomeBack: string;
      continueLogin: string;
      quickDemo: string;
      languageInfo: string;
      email: string;
      password: string;
      rememberMe: string;
      findEmail: string;
      forgotPassword: string;
      loggingIn: string;
      loginButton: string;
      noAccount: string;
      signupNow: string;
    };
    register: {
      title: string;
      selectRole: string;
      createAccount: string;
      name: string;
      email: string;
      phone: string;
      zalo: string;
      password: string;
      confirmPassword: string;
      company: string;
      companyPlaceholder: string;
      agreeToTerms: string;
      and: string;
      termsOfService: string;
      privacyPolicy: string;
      signupButton: string;
      alreadyHaveAccount: string;
      loginNow: string;
      passwordRequirements: string;
      passwordMinLength: string;
      passwordUppercase: string;
      passwordNumber: string;
      passwordSpecial: string;
      passwordStrength: string;
      weak: string;
      medium: string;
      strong: string;
      veryStrong: string;
      emailInvalid: string;
      passwordMismatch: string;
      phoneInvalid: string;
      influencerTitle: string;
      brandTitle: string;
      influencerSubtitle: string;
      brandSubtitle: string;
      quickSignup: string;
      orEmail: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      confirmPasswordPlaceholder: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      zaloPlaceholder: string;
      zaloLabel: string;
      zaloHint: string;
      facebookPlaceholder: string;
      signingUp: string;
      errors: {
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordMinLength: string;
        passwordMismatch: string;
        nameRequired: string;
        phoneRequired: string;
        zaloRequired: string;
        companyRequired: string;
        termsRequired: string;
        privacyRequired: string;
      };
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      sending: string;
      sendButton: string;
      successTitle: string;
      successMessage: string;
    };
    findEmail: {
      title: string;
      subtitle: string;
      phoneHint: string;
      searching: string;
      searchButton: string;
      notFound: string;
      foundTitle: string;
      foundMessage: string;
    };
  };

  // Settings
  settings: {
    title: string;
    account: string;
    changePassword: string;
    changePasswordDesc: string;
    language: string;
    currentLanguage: string;
    notifications: string;
    notificationsDesc: string;
    privacy: string;
    privacyDesc: string;
    dangerZone: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    passwordModal: {
      title: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
      cancel: string;
      change: string;
      currentPasswordPlaceholder: string;
      newPasswordPlaceholder: string;
      confirmPasswordPlaceholder: string;
      success: string;
    };
    languageModal: {
      title: string;
      korean: string;
      vietnamese: string;
      english: string;
      cancel: string;
      confirm: string;
    };
    deleteModal: {
      title: string;
      warning: string;
      confirmText: string;
      typeDelete: string;
      cancel: string;
      delete: string;
      success: string;
    };
  };

  // Help
  help: {
    title: string;
    customerSupport: string;
    customerSupportDesc: string;
    contactUs: string;
    faq: string;
    faqQuestion1: string;
    faqAnswer1: string;
    faqQuestion2: string;
    faqAnswer2: string;
    faqQuestion3: string;
    faqAnswer3: string;
  };

  // Shop
  shop: {
    title: string;
    pageTitle: string;
    myPoints: string;
    myShoppingPoints: string;
    availableItems: string;
    bestseller: string;
    limitedEdition: string;
    soldOut: string;
    points: string;
    buyNow: string;
    exchangeTickets: string;
    confirmPurchase: string;
    purchaseSuccess: string;
    insufficientPoints: string;
    hurryUp: string;
    prizeValue: string;
    peopleEntering: string;
    outOfStock: string;
    stockRemaining: string;
    enterNow: string;
    buyNowButton: string;
    limitedTimeOffer: string;
    todaySpecial: string;
    hurryBeforeClose: string;
    inviteFriends: string;
    freeTickets: string;
    ticketUnit: string;
    ticketCountUnit: string;
    detailView: string;
    noProducts: string;
    infoTitle: string;
    info1: string;
    info2: string;
    info3: string;
    info4: string;
    info5: string;
    purchaseConfirmationTitle: string;
    price: string;
    currentPoints: string;
    afterPurchaseBalance: string;
    cancel: string;
    ticketsAcquired: string;
    remaining: string;
    appliedImmediately: string;
    alertInsufficientPoints: string;
    alertRequired: string;
    alertOwned: string;
    alertOutOfStock: string;
    alertPurchaseComplete: string;
    alertDeducted: string;
    alertRemainingPoints: string;
    alertRemainingStock: string;
    productCategories: {
      all: string;
      raffleTickets: string;
      boost: string;
      feature: string;
      gift: string;
      vouchers: string;
      merchandise: string;
      koreaDream: string;
    };
    products: {
      koreaDream: {
        name: string;
        description: string;
      };
      iphoneRaffle: {
        name: string;
        description: string;
      };
      macbookRaffle: {
        name: string;
        description: string;
      };
      cash10mRaffle: {
        name: string;
        description: string;
      };
      giftcard500kRaffle: {
        name: string;
        description: string;
      };
      profileBoost: {
        name: string;
        description: string;
      };
      premiumBadge: {
        name: string;
        description: string;
      };
      prioritySupport: {
        name: string;
        description: string;
      };
      starInfluencer: {
        name: string;
        description: string;
      };
      profileHighlight: {
        name: string;
        description: string;
      };
      starbucksGiftcard: {
        name: string;
        description: string;
      };
    };
  };

  // Campaign List Filters
  campaignFilters: {
    title: string;
    platform: string;
    allPlatforms: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
    category: string;
    allCategories: string;
    beauty: string;
    fashion: string;
    food: string;
    lifestyle: string;
    tech: string;
    fitness: string;
    travel: string;
    gaming: string;
    education: string;
    entertainment: string;
    health: string;
    home: string;
    type: string;
    allTypes: string;
    product: string;
    visiting: string;
    experience: string;
    location: string;
    allLocations: string;
    hanoi: string;
    hoChiMinh: string;
    danang: string;
    budget: string;
    anyBudget: string;
    under1M: string;
    from1to3M: string;
    from3to5M: string;
    over5M: string;
    specialConditions: string;
    hasVehicle: string;
    hasChildren: string;
    hasPets: string;
    specificSkinType: string;
    specificClothingSize: string;
    married: string;
    single: string;
    sortBy: string;
    newest: string;
    highestBudget: string;
    closingDeadline: string;
    mostMatching: string;
    applyFilters: string;
    resetFilters: string;
    eligibleOnly: string;
    eligibleOnlyDesc: string;
    locationPlaceholder: string;
    minBudget: string;
    maxBudget: string;
    budgetRange: string;
    campaignType: string;
    cash: string;
    points: string;
    all: string;
    filtersApplied: string;
    totalCampaigns: string;
    noResults: string;
    noResultsDesc: string;
    clickToView: string;
    viewDetails: string;
    recommendedCampaigns: string;
    recommendationScore: string;
    applicationsCount: string;
    requirementsNotMet: string;
    vehicleRequired: string;
    vehicleRequiredDesc: string;
    childrenRequired: string;
    childrenRequiredDesc: string;
    petsRequired: string;
    petsRequiredDesc: string;
    maritalStatusLabel: string;
    noVehicle: string;
    noChildren: string;
    noPets: string;
  };

  // Layout Metadata
  metadata: {
    title: string;
    description: string;
    titleTemplate: string;
  };

  // Campaign Detail
  campaignDetail: {
    title: string;
    expectedEarnings: string;
    applyNow: string;
    matchingRate: string;
    eligible: string;
    notEligible: string;
    viewDetails: string;
    requirements: string;
    minFollowers: string;
    minEngagement: string;
    platform: string;
    category: string;
    target: string;
    location: string;
    skinType: string;
    skinTone: string;
    childRequired: string;
    vehicleRequired: string;
    clothingSize: string;
    petRequired: string;
    maritalStatus: string;
    housingType: string;
    benefits: string;
    providedProducts: string;
    fullsize: string;
    sample: string;
    totalValue: string;
    shippingInfo: string;
    additionalBenefits: string;
    productGallery: string;
    contentExamples: string;
    contentExamplesDesc: string;
    missionGuide: string;

    // Marketing & UX Optimization
    urgency: {
      hotCampaign: string;
      recentApps: string;
      trending: string;
      slotsRemaining: string;
      timeLeft: string;
      hours: string;
    };
    difficulty: {
      title: string;
      difficultyLevel: string;
      easy: string;
      medium: string;
      hard: string;
      timeRequired: string;
      hoursUnit: string;
      successRate: string;
      skillsNeeded: string;
    };
    earnings: {
      title: string;
      basePayment: string;
      productValue: string;
      bonusOpportunities: string;
      maxPotential: string;
      cashAndProducts: string;
    };
    socialProof: {
      title: string;
      completionRate: string;
      avgResponseTime: string;
      recentReviews: string;
      hoursAgo: string;
    };
    quality: {
      verified: string;
      paymentGuarantee: string;
      contractProtection: string;
    };
    contentFormat: string;
    mustInclude: string;
    prohibited: string;
    brandInfo: string;
    founded: string;
    previousCampaigns: string;
    averageRating: string;
    collaboratedInfluencers: string;
    website: string;
    selectionCriteria: string;
    expectedApplicants: string;
    selectedInfluencers: string;
    expectedCompetition: string;
    priorityCriteria: string;
    avgReviewTime: string;
    faq: string;
    pendingApproval: string;
    pendingApprovalDesc: string;
    avgApprovalTime: string;
    shareAndEarnBonus: string;
    shareDescription: string;
    shareSubmitted: string;
    shareStatus: string;
    shareApproved: string;
    sharePending: string;
    shareRejected: string;
    shareGuidelines: string;
    shareWhere: string;
    sharePerShare: string;
    shareMultiple: string;
    shareDailyLimit: string;
    shareNoDelete: string;
    totalShareEarnings: string;
    shareMore: string;
    dailyLimitReached: string;
    shareOnFacebook: string;
    shareLinkModal: {
      title: string;
      description: string;
      whereCanShare: string;
      facebookGroups: string;
      facebookGroupsDesc: string;
      personalTimeline: string;
      personalTimelineDesc: string;
      facebookPages: string;
      facebookPagesDesc: string;
      publicWarning: string;
      howToShare: string;
      step1: string;
      step1Desc: string;
      step2: string;
      step2Desc: string;
      step3: string;
      step3Desc: string;
      step4: string;
      step4Desc: string;
      step5: string;
      step5Desc: string;
      recommendedContent: string;
      copyContent: string;
      manualNote: string;
      enterLink: string;
      linkCopyHow: string;
      fakeWarning: string;
      validFormats: string;
      groupPost: string;
      timelinePost: string;
      pagePost: string;
      permalink: string;
      cancel: string;
      submit: string;
    };
    progress: string;
    completedTasks: string;
    submitWork: string;
    deliverables: string;
    shareCountSubmitted: string;
    shareAndEarnBonusText: string;
    recentApplicants: string;
    totalApplicants: string;
    slotsLeft: string;
    followersUnit: string;
    earningsBreakdown: string;
    basePay: string;
    guaranteedOnCompletion: string;
    productValue: string;
    freeProducts: string;
    bonusOpportunity: string;
    totalExpectedEarnings: string;
    maxEarningsWithBonus: string;
    submittedWork: string;
    viewLink: string;
    approved: string;
    rejected: string;
    reviewing: string;
    views: string;
    likes: string;
    submittedAt: string;
    campaignInfo: string;
    period: string;
    deadline: string;
    applyModal: {
      title: string;
      advertiser: string;
      expectedEarnings: string;
      deadline: string;
      confirmLine1: string;
      confirmLine2: string;
      confirmLine3: string;
      cancel: string;
      apply: string;
    };
    uploadModal: {
      title: string;
      contentUrl: string;
      urlPlaceholder: string;
      description: string;
      descPlaceholder: string;
      cancel: string;
      submit: string;
    };
    alerts: {
      applicationComplete: string;
      workSubmitted: string;
      dailyLimitExceeded: string;
      pleaseEnterLink: string;
      invalidFacebookLink: string;
      duplicateLink: string;
      shareLinkSubmitted: string;
      clipboardCopied: string;
    };
    shareContent: {
      expectedEarnings: string;
      company: string;
      deadline: string;
      viewDetails: string;
      step: string;
      stepBadge1: string;
      stepBadge4: string;
      placeholder: string;
      linkCopyMethod: string;
      fakeWarning: string;
      manualShareNote: string;
    };
    viewAllShares: string;
    shareButtonDesc: string;
    browseMoreCampaigns: string;
    dailyShareLimitText: string;
    importantNotesTitle: string;
    importantNote1: string;
    importantNote2: string;
    importantNote3: string;
    importantNote4: string;
    competitionAlert: string;
    topSize: string;
    bottomSize: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    homepage: {
      loading: 'Đang tải...',
      platformName: 'Exfluencer VN',
      tagline: 'Kiếm tiền từ nội dung — chỉ cần 1,000 followers',
      kols: 'Chiến dịch đang mở',
      brands: 'Phí hoa hồng',
      campaigns: 'Followers là đủ',
      freeSignup: '✅ Đăng ký miễn phí — không phí ẩn',
      fastMatching: '⚡ Nano KOL (1K+ followers) đều có thể ứng tuyển',
      securePayment: '📋 Nhận brief chuẩn, theo dõi thanh toán dễ dàng',
      howToStart: 'Bạn muốn bắt đầu như thế nào?',
      influencerRole: 'Influencer / KOL',
      influencerDesc: 'Nhận chiến dịch có trả phí — chỉ cần 1,000 followers là đủ điều kiện!',
      avgMonthlyEarning: '💰 Thu nhập thêm 2–10 triệu/tháng',
      free: 'Đăng ký miễn phí',
      activeCampaigns: '36 chiến dịch đang mở',
      advertiserRole: 'Nhà quảng cáo / Brand',
      advertiserDesc: 'Tìm KOL phù hợp & tạo brief chiến dịch chuẩn hóa',
      avgROI: 'Tiếp cận đúng đối tượng',
      verifiedKOL: 'KOL đã xác minh',
      realtimeAnalysis: 'Phân tích thời gian thực',
      startNowFree: '🚀 Bắt đầu ngay - Hoàn toàn miễn phí',
      signupText: 'Đăng ký',
      loginText: 'Đăng nhập',
      agreeToTerms: 'Bằng cách đăng ký, bạn đồng ý với',
      termsLink: 'Điều khoản dịch vụ',
      privacyLink: 'Chính sách bảo mật',
      adminLogin: '🔐 Đăng nhập quản trị viên',
      and: 'và',
      agreeBySigningUp: '',
      // How It Works
      howItWorksTitle: 'Cách thức hoạt động',
      step1Title: '1. Đăng ký miễn phí',
      step1Desc: 'Tạo tài khoản chỉ trong 2 phút. Chọn vai trò của bạn: Influencer hoặc Nhà quảng cáo.',
      step2Title: '2. Tìm & Kết nối',
      step2Desc: 'Influencer tìm chiến dịch phù hợp. Nhà quảng cáo tìm KOL đã xác minh với dữ liệu thực.',
      step3Title: '3. Hợp tác & Kiếm tiền',
      step3Desc: 'Hoàn thành chiến dịch, nhận thanh toán an toàn. Phát triển cùng nhau trong nền tảng.',
      // For Influencers
      forInfluencersTitle: 'Dành cho Influencers',
      influencerBenefit1Title: '💰 Thu nhập ổn định',
      influencerBenefit1Desc: 'Kiếm tiền từ nội dung với hàng nghìn chiến dịch đa dạng. Phí 0%, rút tiền nhanh chóng.',
      influencerBenefit2Title: '🤝 Hợp tác với thương hiệu lớn',
      influencerBenefit2Desc: 'Kết nối với các thương hiệu uy tín tại Việt Nam. Xây dựng danh mục đối tác chất lượng.',
      influencerBenefit3Title: '📊 Công cụ phân tích chuyên nghiệp',
      influencerBenefit3Desc: 'Theo dõi hiệu suất, tăng trưởng và thu nhập của bạn. Tối ưu hóa chiến lược nội dung.',
      influencerBenefit4Title: '🎓 Hỗ trợ & Đào tạo',
      influencerBenefit4Desc: 'Nhận hướng dẫn chuyên môn, tips & tricks từ các KOL hàng đầu. Phát triển kỹ năng liên tục.',
      // For Advertisers
      forAdvertisersTitle: 'Dành cho Nhà quảng cáo',
      advertiserBenefit1Title: '🎯 Tìm đúng KOL',
      advertiserBenefit1Desc: 'Hệ thống AI giúp tìm KOL phù hợp với thương hiệu. Lọc theo niche, độ tương tác, giá cả.',
      advertiserBenefit2Title: '✅ KOL đã xác minh',
      advertiserBenefit2Desc: 'Mọi KOL đều được kiểm tra kỹ lưỡng. Dữ liệu follower thật, không fake, không bot.',
      advertiserBenefit3Title: '📈 ROI minh bạch',
      advertiserBenefit3Desc: 'Theo dõi hiệu quả chiến dịch realtime. Báo cáo chi tiết về reach, engagement, conversion.',
      advertiserBenefit4Title: '💳 Thanh toán an toàn',
      advertiserBenefit4Desc: 'Hệ thống escrow bảo vệ ngân sách. Chỉ thanh toán khi chiến dịch hoàn thành đúng yêu cầu.',
      // Success Stats
      successStatsTitle: 'Thành công cùng Exfluencer VN',
      stat1Value: '95%',
      stat1Label: 'Tỷ lệ hoàn thành chiến dịch',
      stat2Value: '2 giờ',
      stat2Label: 'Thời gian phản hồi trung bình',
      stat3Value: '300%',
      stat3Label: 'ROI trung bình',
      stat4Value: '200+',
      stat4Label: 'Chiến dịch đã hoàn thành',
      // Platforms
      platformsTitle: 'Hỗ trợ mọi nền tảng phổ biến',
      platformsSubtitle: 'Instagram, TikTok, YouTube, Facebook - Tất cả trong một nền tảng duy nhất',
      // Final CTA
      readyToStart: 'Sẵn sàng bắt đầu hành trình của bạn?',
      joinNow: 'Tham gia ngay - Miễn phí 100%',
    },
    auth: {
      login: {
        title: 'Đăng nhập',
        welcomeBack: 'Chào mừng trở lại',
        continueLogin: 'Đăng nhập để tiếp tục',
        quickDemo: 'Dùng thử nhanh (Quick Demo)',
        languageInfo: 'Tiếng Việt',
        email: 'Email',
        password: 'Mật khẩu',
        rememberMe: 'Ghi nhớ đăng nhập',
        findEmail: 'Tìm email',
        forgotPassword: 'Quên mật khẩu?',
        loggingIn: 'Đang đăng nhập...',
        loginButton: 'Đăng nhập',
        noAccount: 'Chưa có tài khoản?',
        signupNow: 'Đăng ký ngay',
      },
      register: {
        title: 'Đăng ký',
        selectRole: 'Chọn loại tài khoản của bạn',
        createAccount: 'Tạo tài khoản mới',
        name: 'Tên đầy đủ',
        email: 'Email',
        phone: 'Số điện thoại',
        zalo: 'Zalo ID (tùy chọn)',
        password: 'Mật khẩu',
        confirmPassword: 'Xác nhận mật khẩu',
        company: 'Tên công ty',
        companyPlaceholder: 'Nhập tên công ty của bạn',
        agreeToTerms: 'Tôi đồng ý với',
        and: 'và',
        termsOfService: 'Điều khoản dịch vụ',
        privacyPolicy: 'Chính sách bảo mật',
        signupButton: 'Tạo tài khoản',
        alreadyHaveAccount: 'Đã có tài khoản?',
        loginNow: 'Đăng nhập ngay',
        passwordRequirements: 'Yêu cầu mật khẩu:',
        passwordMinLength: 'Tối thiểu 8 ký tự',
        passwordUppercase: 'Ít nhất 1 chữ hoa',
        passwordNumber: 'Ít nhất 1 số',
        passwordSpecial: 'Ít nhất 1 ký tự đặc biệt',
        passwordStrength: 'Độ mạnh mật khẩu:',
        weak: 'Yếu',
        medium: 'Trung bình',
        strong: 'Mạnh',
        veryStrong: 'Rất mạnh',
        emailInvalid: 'Email không hợp lệ',
        passwordMismatch: 'Mật khẩu không khớp',
        phoneInvalid: 'Số điện thoại không hợp lệ',
        influencerTitle: 'Đăng ký KOL',
        brandTitle: 'Đăng ký Brand',
        influencerSubtitle: 'Tìm chiến dịch & kiếm tiền | Find campaigns & earn money',
        brandSubtitle: 'Tìm KOL & phát triển thương hiệu | Find KOLs & grow your brand',
        quickSignup: 'Đăng ký nhanh Quick signup',
        orEmail: 'hoặc email or email',
        emailPlaceholder: 'your@email.com',
        passwordPlaceholder: 'Tối thiểu 8 ký tự',
        confirmPasswordPlaceholder: 'Nhập lại mật khẩu',
        namePlaceholder: 'Nguyễn Văn A',
        phonePlaceholder: '+84 90 123 4567',
        zaloPlaceholder: '+84 90 123 4567 (Số điện thoại VN VN number)',
        zaloLabel: 'Zalo * (Ứng dụng nhắn tin VN)',
        zaloHint: '💡 Ứng dụng nhắn tin phổ biến nhất Việt Nam',
        facebookPlaceholder: 'fb.com/yourname',
        signingUp: 'Đang đăng ký...',
        errors: {
          emailRequired: 'Vui lòng nhập email',
          emailInvalid: 'Email không hợp lệ',
          passwordRequired: 'Vui lòng nhập mật khẩu',
          passwordMinLength: 'Mật khẩu phải có ít nhất 8 ký tự',
          passwordMismatch: 'Mật khẩu không khớp',
          nameRequired: 'Vui lòng nhập tên',
          phoneRequired: 'Vui lòng nhập số điện thoại',
          zaloRequired: 'Vui lòng nhập số Zalo',
          companyRequired: 'Vui lòng nhập tên công ty',
          termsRequired: 'Vui lòng đồng ý với Điều khoản dịch vụ',
          privacyRequired: 'Vui lòng đồng ý với Chính sách bảo mật',
        },
      },
      forgotPassword: {
        title: 'Quên mật khẩu',
        subtitle: 'Nhập email của bạn để nhận liên kết đặt lại mật khẩu',
        sending: 'Đang gửi...',
        sendButton: 'Gửi liên kết đặt lại',
        successTitle: 'Email đã được gửi!',
        successMessage: 'Vui lòng kiểm tra hộp thư email của bạn để đặt lại mật khẩu.',
      },
      findEmail: {
        title: 'Tìm Email',
        subtitle: 'Nhập số điện thoại để tìm email đã đăng ký',
        phoneHint: 'Nhập số điện thoại bạn đã dùng khi đăng ký',
        searching: 'Đang tìm...',
        searchButton: 'Tìm email',
        notFound: 'Không tìm thấy tài khoản với số điện thoại này',
        foundTitle: 'Tìm thấy email!',
        foundMessage: 'Hãy sử dụng email này để đăng nhập',
      },
    },
    settings: {
      title: 'Cài đặt',
      account: 'Tài khoản',
      changePassword: 'Đổi mật khẩu',
      changePasswordDesc: 'Thay đổi định kỳ để bảo mật',
      language: 'Ngôn ngữ',
      currentLanguage: 'Tiếng Việt',
      notifications: 'Thông báo',
      notificationsDesc: 'Cài đặt thông báo đẩy',
      privacy: 'Bảo mật',
      privacyDesc: 'Quản lý dữ liệu và quyền',
      dangerZone: 'Vùng nguy hiểm',
      deleteAccount: 'Xóa tài khoản',
      deleteAccountDesc: 'Tất cả dữ liệu sẽ bị xóa vĩnh viễn',
      passwordModal: {
        title: 'Đổi mật khẩu',
        currentPassword: 'Mật khẩu hiện tại',
        newPassword: 'Mật khẩu mới',
        confirmPassword: 'Xác nhận mật khẩu',
        cancel: 'Hủy',
        change: 'Thay đổi',
        currentPasswordPlaceholder: 'Nhập mật khẩu hiện tại',
        newPasswordPlaceholder: 'Nhập mật khẩu mới',
        confirmPasswordPlaceholder: 'Nhập lại mật khẩu mới',
        success: 'Mật khẩu đã được thay đổi',
      },
      languageModal: {
        title: 'Chọn ngôn ngữ',
        korean: '한국어',
        vietnamese: 'Tiếng Việt',
        english: 'English',
        cancel: 'Hủy',
        confirm: 'Xác nhận',
      },
      deleteModal: {
        title: 'Xóa tài khoản',
        warning: 'Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể hoàn tác.',
        confirmText: 'Nhập "DELETE" để xác nhận',
        typeDelete: 'Nhập DELETE',
        cancel: 'Hủy',
        delete: 'Xóa tài khoản',
        success: 'Tài khoản đã được xóa',
      },
    },
    help: {
      title: 'Trợ giúp',
      customerSupport: 'Hỗ trợ khách hàng',
      customerSupportDesc: 'Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi bất cứ lúc nào.',
      contactUs: 'Liên hệ',
      faq: 'Câu hỏi thường gặp',
      faqQuestion1: 'Làm thế nào để ứng tuyển chiến dịch?',
      faqAnswer1: 'Chọn chiến dịch bạn quan tâm từ danh sách và nhấp vào nút "Ứng tuyển".',
      faqQuestion2: 'Làm thế nào để rút điểm?',
      faqAnswer2: 'Chọn rút tiền từ menu ví và nhập thông tin tài khoản ngân hàng của bạn.',
      faqQuestion3: 'Làm thế nào để kết nối tài khoản SNS?',
      faqAnswer3: 'Nhấp vào nút "Kết nối" trong phần SNS trên trang hồ sơ.',
    },
    shop: {
      title: 'Cửa hàng',
      pageTitle: '🛍️ Cửa hàng Điểm',
      myPoints: 'Điểm của tôi',
      myShoppingPoints: 'Điểm mua sắm của tôi',
      availableItems: 'Sản phẩm có sẵn',
      bestseller: '🔥 Bán chạy nhất!',
      limitedEdition: '⭐ Phiên bản giới hạn',
      soldOut: 'Hết hàng',
      points: 'điểm',
      buyNow: 'Mua ngay',
      exchangeTickets: 'Đổi vé',
      confirmPurchase: 'Xác nhận mua hàng',
      purchaseSuccess: 'Mua hàng thành công!',
      insufficientPoints: 'Không đủ điểm',
      hurryUp: '⚡ Nhanh lên!',
      prizeValue: 'Giá trị giải thưởng:',
      peopleEntering: 'người đang tham gia!',
      outOfStock: '🚫 Hết hàng (Sold Out)',
      stockRemaining: '📦 Còn lại',
      enterNow: '🎟️ Tham gia ngay!',
      buyNowButton: '🛒 Mua ngay',
      limitedTimeOffer: '🔥 Ưu đãi giới hạn! Nhanh tay kẻo hết!',
      todaySpecial: 'Giảm giá đặc biệt chỉ hôm nay! 🎁',
      hurryBeforeClose: '⚡ Nhanh lên trước khi đóng cửa!',
      inviteFriends: 'Mời bạn bè',
      freeTickets: 'Vé miễn phí!',
      ticketUnit: 'vé',
      ticketCountUnit: 'vé',
      detailView: '🇰🇷 Xem chi tiết →',
      noProducts: 'Không có sản phẩm',
      infoTitle: 'Hướng dẫn Cửa hàng Điểm',
      info1: '• Tích điểm khi hoàn thành chiến dịch',
      info2: '• Nhận điểm hàng ngày qua điểm danh',
      info3: '• Nhận thêm điểm qua giới thiệu bạn bè',
      info4: '• Vật phẩm đã mua được áp dụng ngay lập tức',
      info5: '• Thẻ quà tặng sẽ được gửi qua email',
      purchaseConfirmationTitle: 'Xác nhận mua hàng',
      price: 'Giá',
      currentPoints: 'Điểm hiện có',
      afterPurchaseBalance: 'Số dư sau mua',
      cancel: 'Hủy',
      ticketsAcquired: 'Vé đã nhận',
      remaining: 'Còn lại',
      appliedImmediately: 'Vật phẩm đã được áp dụng ngay lập tức!',
      alertInsufficientPoints: '⚠️ Không đủ điểm!',
      alertRequired: 'Cần:',
      alertOwned: 'Hiện có:',
      alertOutOfStock: '⚠️ Hết hàng!',
      alertPurchaseComplete: 'Mua hàng hoàn tất!',
      alertDeducted: 'Đã trừ:',
      alertRemainingPoints: 'Điểm còn lại:',
      alertRemainingStock: 'Hàng còn lại:',
      productCategories: {
        all: 'Tất cả',
        raffleTickets: '🎫 Vé xổ số',
        boost: '⚡ Tăng tốc',
        feature: '⭐ Tính năng',
        gift: '🎁 Quà tặng',
        vouchers: 'Phiếu giảm giá',
        merchandise: 'Hàng hóa',
        koreaDream: 'Korea Dream',
      },
      products: {
        koreaDream: {
          name: '🇰🇷 Vé KOREA DREAM',
          description: 'Chuyến đi trải nghiệm làm đẹp Hàn Quốc (Vé máy bay + 4 ngày 5 đêm + Điều trị + Mua sắm)',
        },
        iphoneRaffle: {
          name: '📱 Vé iPhone 15 Pro Max',
          description: 'iPhone mới nhất 256GB (Chọn màu)',
        },
        macbookRaffle: {
          name: '💻 Vé MacBook Pro M3',
          description: 'MacBook Pro 14 inch chip M3 (512GB)',
        },
        cash10mRaffle: {
          name: '💰 Vé tiền mặt 10M VND',
          description: 'Chuyển khoản ngay lập tức (Không thuế)',
        },
        giftcard500kRaffle: {
          name: '🎁 Thẻ quà tặng tổng hợp 500K',
          description: 'Chọn Starbucks/CGV/Coupang',
        },
        profileBoost: {
          name: 'Tăng cường hồ sơ (7 ngày)',
          description: 'Hiển thị hồ sơ của bạn ở đầu trong 7 ngày',
        },
        premiumBadge: {
          name: 'Huy hiệu Premium (30 ngày)',
          description: 'Hiển thị huy hiệu xác minh Premium trên hồ sơ',
        },
        prioritySupport: {
          name: 'Phiếu hỗ trợ ưu tiên chiến dịch',
          description: 'Xem xét ưu tiên khi ứng tuyển chiến dịch',
        },
        starInfluencer: {
          name: 'Cấp độ KOL Star',
          description: 'Nhận đặc quyền cấp độ Star trong 30 ngày',
        },
        profileHighlight: {
          name: 'Làm nổi bật hồ sơ',
          description: 'Đánh dấu nổi bật trong kết quả tìm kiếm',
        },
        starbucksGiftcard: {
          name: 'Thẻ quà tặng Starbucks 50K',
          description: 'Thẻ quà tặng Starbucks 50.000 VND',
        },
      },
    },
    campaignFilters: {
      title: 'Bộ lọc',
      platform: 'Nền tảng',
      allPlatforms: 'Tất cả nền tảng',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      category: 'Danh mục',
      allCategories: 'Tất cả danh mục',
      beauty: 'Làm đẹp',
      fashion: 'Thời trang',
      food: 'Ẩm thực',
      lifestyle: 'Lối sống',
      tech: 'Công nghệ',
      fitness: 'Thể dục',
      travel: 'Du lịch',
      gaming: 'Game',
      education: 'Giáo dục',
      entertainment: 'Giải trí',
      health: 'Sức khỏe',
      home: 'Nhà cửa',
      type: 'Loại',
      allTypes: 'Tất cả loại',
      product: 'Sản phẩm',
      visiting: 'Ghé thăm',
      experience: 'Trải nghiệm',
      location: 'Địa điểm',
      allLocations: 'Tất cả địa điểm',
      hanoi: 'Hà Nội',
      hoChiMinh: 'TP. Hồ Chí Minh',
      danang: 'Đà Nẵng',
      budget: 'Ngân sách',
      anyBudget: 'Mọi ngân sách',
      under1M: 'Dưới 1M',
      from1to3M: '1M - 3M',
      from3to5M: '3M - 5M',
      over5M: 'Trên 5M',
      specialConditions: 'Điều kiện đặc biệt',
      hasVehicle: 'Có phương tiện',
      hasChildren: 'Có con',
      hasPets: 'Có thú cưng',
      specificSkinType: 'Loại da cụ thể',
      specificClothingSize: 'Kích cỡ quần áo cụ thể',
      married: 'Đã kết hôn',
      single: 'Độc thân',
      sortBy: 'Sắp xếp theo',
      newest: 'Mới nhất',
      highestBudget: 'Ngân sách cao nhất',
      closingDeadline: 'Hạn chót gần nhất',
      mostMatching: 'Phù hợp nhất',
      applyFilters: 'Áp dụng bộ lọc',
      resetFilters: 'Đặt lại bộ lọc',
      eligibleOnly: 'Chỉ chiến dịch đủ điều kiện',
      eligibleOnlyDesc: 'Phù hợp với hồ sơ của tôi',
      locationPlaceholder: 'Ví dụ: Hà Nội, TP.HCM, Trực tuyến',
      minBudget: 'Tối thiểu',
      maxBudget: 'Tối đa',
      budgetRange: 'Phạm vi ngân sách (VND)',
      campaignType: 'Loại chiến dịch',
      cash: '💰 Tiền mặt',
      points: '🛍️ Điểm',
      all: 'Tất cả',
      filtersApplied: 'bộ lọc đang áp dụng',
      totalCampaigns: 'chiến dịch tổng cộng',
      noResults: 'Không tìm thấy kết quả',
      noResultsDesc: 'Không có chiến dịch nào phù hợp với bộ lọc đã chọn. Hãy thử tiêu chí khác.',
      clickToView: 'Nhấp để xem chi tiết',
      viewDetails: 'Xem chi tiết',
      recommendedCampaigns: 'Chiến dịch được đề xuất cho bạn',
      recommendationScore: 'Đề xuất',
      applicationsCount: 'người ứng tuyển',
      requirementsNotMet: 'Không đáp ứng yêu cầu',
      vehicleRequired: '🚗 Chiến dịch yêu cầu có phương tiện',
      vehicleRequiredDesc: '(Tôi không có phương tiện)',
      childrenRequired: '👶 Chiến dịch yêu cầu có con',
      childrenRequiredDesc: '(Tôi không có con)',
      petsRequired: '🐾 Chiến dịch yêu cầu có thú cưng',
      petsRequiredDesc: '(Tôi không có thú cưng)',
      maritalStatusLabel: '💑 Tình trạng hôn nhân',
      noVehicle: '(Tôi không có phương tiện)',
      noChildren: '(Tôi không có con)',
      noPets: '(Tôi không có thú cưng)',
    },
    metadata: {
      title: 'Exfluencer VN - Nền tảng tiếp thị KOL hàng đầu Việt Nam',
      description: 'Kết nối KOL và thương hiệu. Tìm kiếm chiến dịch phù hợp, kiếm tiền từ nội dung của bạn.',
      titleTemplate: '%s | Exfluencer VN',
    },
    common: {
      all: 'Tất cả',
      back: 'Quay lại',
      next: 'Tiếp',
      previous: 'Trước',
      skip: 'Bỏ qua',
      start: 'Bắt đầu',
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Sửa',
      view: 'Xem',
      add: 'Thêm',
      search: 'Tìm kiếm',
      filter: 'Lọc',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu',
      error: 'Có lỗi xảy ra',
      success: 'Thành công',
      confirm: 'Xác nhận',
      submit: 'Gửi',
      sort: 'Sắp xếp',
      justNow: 'Vừa xong',
      minutesAgo: 'phút trước',
      hoursAgo: 'giờ trước',
      yesterday: 'Hôm qua',
      daysAgo: 'ngày trước',
      weeksAgo: 'tuần trước',
    },
    nav: {
      home: 'Trang chủ',
      campaigns: 'Chiến dịch',
      shop: 'Tài nguyên',
      favorites: 'Yêu thích',
      messages: 'Tin nhắn',
      stats: 'Thống kê',
      profile: 'Hồ sơ',
      notifications: 'Thông báo',
      wallet: 'Ví',
      ranking: 'Xếp hạng',
      analytics: 'Phân tích',
      kol: 'KOL',
    },
    campaign: {
      title: 'Chiến dịch',
      create: 'Tạo chiến dịch',
      detail: 'Chi tiết chiến dịch',
      apply: 'Ứng tuyển',
      eligible: 'Đủ điều kiện',
      notEligible: 'Không đủ điều kiện',
      deadline: 'Hạn chót',
      budget: 'Ngân sách',
      applicants: 'Ứng viên',
      matching: 'Tỷ lệ phù hợp',
      requirements: 'Yêu cầu',
      description: 'Mô tả',
      categories: 'Danh mục',
      platforms: 'Nền tảng',
      location: 'Địa điểm',
      period: 'Thời gian',
      reward: 'Phần thưởng',
      status: {
        active: 'Đang hoạt động',
        completed: 'Hoàn thành',
        pending: 'Chờ xử lý',
        draft: 'Bản nháp',
      },
      recommendedForYou: 'Được đề xuất cho bạn',
      whyRecommended: 'Tại sao được đề xuất',
      matchingPercentage: 'Tỷ lệ phù hợp',
      eligibilityCheck: 'Kiểm tra điều kiện',
      failureReasons: {
        followers: 'Số người theo dõi không đủ',
        engagement: 'Tỷ lệ tương tác không đủ',
        platform: 'Nền tảng không khớp',
        location: 'Địa điểm không khớp',
        vehicle: 'Cần có phương tiện',
        parent: 'Cần là cha mẹ',
        pet: 'Cần nuôi thú cưng',
        maritalStatus: 'Tình trạng hôn nhân không khớp',
        skinType: 'Loại da không khớp',
        skinTone: 'Tông màu da không khớp',
        clothingSize: 'Kích cỡ quần áo không khớp',
      },
    },
    influencer: {
      profile: 'Hồ sơ',
      followers: 'Người theo dõi',
      engagement: 'Tỷ lệ tương tác',
      rating: 'Đánh giá',
      completedCampaigns: 'Chiến dịch hoàn thành',
      search: 'Tìm influencer',
      invite: 'Mời',
      portfolio: 'Danh mục đầu tư',
    },
    advertiser: {
      brandAccount: 'Tài khoản thương hiệu',
      verifiedAdvertiser: '💼 Nhà quảng cáo đã xác minh',
      verification: {
        title: 'Đăng ký xác minh doanh nghiệp',
        subtitle: 'Bắt buộc để tạo chiến dịch',
        submitted: 'Đã gửi yêu cầu xác minh',
        submittedMessage: 'Yêu cầu xác minh đã được gửi. Chúng tôi sẽ xem xét trong vòng 1-2 ngày làm việc.',
        email: 'Email',
        phone: 'Điện thoại',
        goToDashboard: 'Đến bảng điều khiển',
        whyNeeded: 'Tại sao cần xác minh?',
        whyNeededDesc: 'Xác minh doanh nghiệp là bắt buộc để tạo niềm tin với influencer và ngăn chặn gian lận.',
        companyInfo: 'Thông tin công ty',
        companyName: 'Tên công ty',
        companyNameKo: 'Tên công ty (Tiếng Hàn)',
        companyNameVi: 'Tên công ty (Tiếng Việt)',
        businessRegNumber: 'Số ĐKKD',
        taxCode: 'Mã số thuế (MST)',
        businessType: 'Loại hình doanh nghiệp',
        address: 'Địa chỉ đăng ký',
        addressPlaceholder: 'Nhập địa chỉ chi tiết',
        legalRepresentative: 'Người đại diện pháp luật',
        legalRepresentativePlaceholder: 'Tên người đại diện',
        contactInfo: 'Thông tin liên hệ',
        emailLabel: 'Email',
        phoneLabel: 'Số điện thoại',
        documents: 'Tài liệu',
        businessLicense: 'Giấy phép kinh doanh',
        businessLicenseNote: '📌 Trong dịch vụ thực tế, sử dụng chức năng tải lên tệp. Hiện tại nhập URL hình ảnh.',
        cancel: 'Hủy',
        submit: 'Gửi yêu cầu',
        required: 'Bắt buộc',
        businessTypes: {
          limitedCompany: 'Công ty TNHH',
          jointStock: 'Công ty cổ phần',
          partnership: 'Công ty hợp danh',
          privateEnterprise: 'Doanh nghiệp tư nhân',
          householdBusiness: 'Hộ kinh doanh',
        },
      },
      influencerDetail: {
        influencers: 'Influencers',
        totalFollowers: 'Tổng người theo dõi',
        allPlatforms: 'Tổng tất cả nền tảng',
        avgFollowers: 'TB người theo dõi',
        perPlatform: 'Trung bình mỗi nền tảng',
        engagement: 'Tương tác',
        avgViews: 'Lượt xem TB',
        completedCampaigns: 'Chiến dịch hoàn thành',
        rating: 'Đánh giá',
        snsChannels: 'Kênh mạng xã hội',
        channels: 'kênh',
        engagementRate: 'Tỷ lệ tương tác',
        categories: 'Danh mục',
        reviews: 'Đánh giá từ nhà quảng cáo',
        reviewsCount: 'đánh giá',
        overallRating: 'Đánh giá tổng thể',
        viewAll: 'Xem tất cả',
        workStyle: 'Phong cách làm việc',
        basicInfo: 'Thông tin cơ bản',
        gender: 'Giới tính',
        male: 'Nam',
        female: 'Nữ',
        age: 'Độ tuổi',
        skinType: 'Loại da',
        skinTone: 'Màu da',
        lifestyleInfo: 'Thông tin cuộc sống',
        maritalStatus: 'Tình trạng hôn nhân',
        single: 'Độc thân',
        married: 'Đã kết hôn',
        divorced: 'Ly hôn',
        preferNotToSay: 'Không tiết lộ',
        children: 'Con cái',
        yes: 'Có',
        no: 'Không',
        pets: 'Thú cưng',
        dog: 'Chó',
        cat: 'Mèo',
        bird: 'Chim',
        fish: 'Cá',
        other: 'Khác',
        hasVehicle: 'Có xe',
        languageEducation: 'Ngôn ngữ & Giáo dục',
        languages: 'Ngôn ngữ',
        korean: 'Tiếng Hàn',
        vietnamese: 'Tiếng Việt',
        english: 'Tiếng Anh',
        education: 'Học vấn',
        bachelor: 'Cử nhân',
        master: 'Thạc sĩ',
        phd: 'Tiến sĩ',
        occupation: 'Nghề nghiệp',
        contentCreator: 'Nhà sáng tạo nội dung',
        interests: 'Sở thích',
        beauty: 'Làm đẹp',
        fashion: 'Thời trang',
        travel: 'Du lịch',
        food: 'Ẩm thực',
        fitness: 'Thể hình',
        lifestyle: 'Lối sống',
        smoker: 'Hút thuốc',
        drinker: 'Uống rượu',
        never: 'Không bao giờ',
        occasionally: 'Thỉnh thoảng',
        regularly: 'Thường xuyên',
        recentWorks: 'Công việc gần đây',
        contentStyleCheck: 'Kiểm tra phong cách nội dung',
        contentStyleTip: 'Xem phong cách nội dung, chất lượng chỉnh sửa và tone của influencer qua các công việc gần đây',
        views: 'Lượt xem',
        contact: 'Đề xuất',
        contactTitle: 'Đề xuất chiến dịch',
        contactMessage: 'Nhập thông tin chi tiết chiến dịch và gửi đề xuất cho influencer.',
        sendProposal: 'Gửi đề xuất',
        proposalSent: 'Đề xuất đã được gửi!',
        campaignInfo: 'Thông tin chiến dịch',
        brand: 'Thương hiệu',
        completedDate: 'Ngày hoàn thành',
        payment: 'Thanh toán',
        deliverables: 'Sản phẩm',
        results: 'Kết quả',
        likes: 'Thích',
        comments: 'Bình luận',
        saves: 'Lưu',
        close: 'Đóng',
        advertiserReview: 'Đánh giá từ nhà quảng cáo',
        wouldRecommend: 'Khuyên dùng',
        profilePagePreparing: 'Trang hồ sơ',
      },
      profileEdit: {
        title: 'Chỉnh sửa hồ sơ',
        accountManagement: 'Quản lý thông tin doanh nghiệp',
        accountManagementDesc: 'Tăng độ tin cậy bằng thông tin chính xác',
        logo: 'Logo công ty',
        uploadLogo: 'Tải logo lên',
        changeLogo: 'Đổi logo',
        logoNote: 'Khuyến nghị: Vuông 500x500px trở lên, tối đa 5MB (PNG, JPG)',
        basicInfo: 'Thông tin cơ bản',
        country: 'Quốc gia',
        selectCountry: 'Chọn quốc gia',
        countryNote: 'Chọn quốc gia đăng ký công ty. Mẫu thông tin doanh nghiệp sẽ được điều chỉnh theo quốc gia.',
        other: 'Khác',
        companyName: 'Tên công ty',
        companyNamePlaceholder: 'Công ty TNHH Demo Brand',
        ceoName: 'Tên giám đốc',
        ceoNamePlaceholder: 'Nguyễn Văn A',
        contactPerson: 'Người liên hệ',
        contactPersonPlaceholder: 'Trần Thị B',
        businessInfo: 'Thông tin doanh nghiệp',
        businessRegNumber: 'Mã số doanh nghiệp / Business Reg. No.',
        businessRegNumberPlaceholder: 'VN: 0123456789 / KR: 123-45-67890',
        taxCode: 'Mã số thuế / Tax ID',
        taxCodePlaceholder: 'Mã định danh thuế',
        businessType: 'Loại hình / Business Type',
        businessTypePlaceholder: 'Bán lẻ, Sản xuất, Dịch vụ',
        businessCategory: 'Ngành nghề / Category',
        businessCategoryPlaceholder: 'Thời trang, Mỹ phẩm, Thực phẩm',
        establishmentDate: 'Ngày thành lập',
        employeeCount: 'Số lượng nhân viên',
        employeeCountPlaceholder: 'VD: 10-50, 50-100',
        capital: 'Vốn điều lệ (VND)',
        capitalPlaceholder: '1,000,000,000',
        businessLicense: 'Giấy phép kinh doanh',
        businessLicenseDesc: 'Bản scan hoặc ảnh giấy phép kinh doanh',
        ecommerceLicense: 'Giấy phép TMĐT',
        ecommerceLicenseDesc: 'Giấy phép thương mại điện tử (nếu có)',
        otherDocuments: 'Chứng chỉ khác',
        otherDocumentsDesc: 'Chứng chỉ chất lượng, bằng sáng chế, v.v.',
        selectFile: 'Chọn file',
        changeFile: 'Đổi file',
        removeDocument: 'Xóa',
        documentNote: 'Tối đa 10MB (PDF, JPG, PNG)',
        uploaded: 'Đã tải lên',
        contactInfo: 'Thông tin liên hệ',
        email: 'Email',
        emailPlaceholder: 'company@example.com',
        phone: 'Số điện thoại',
        phonePlaceholder: '+84 XXX XXX XXX',
        fax: 'Fax',
        faxPlaceholder: '+84 28 XXXX XXXX',
        website: 'Website',
        websitePlaceholder: 'https://yourcompany.com',
        snsInfo: 'Tài khoản mạng xã hội',
        facebook: 'Facebook',
        facebookPlaceholder: 'https://facebook.com/yourcompany',
        instagram: 'Instagram',
        instagramPlaceholder: 'https://instagram.com/yourcompany',
        tiktok: 'TikTok',
        tiktokPlaceholder: '@yourcompany',
        youtube: 'YouTube',
        youtubePlaceholder: 'https://youtube.com/@yourcompany',
        addressInfo: 'Địa chỉ',
        address: 'Địa chỉ trụ sở',
        addressPlaceholder: 'Nhập địa chỉ đường phố',
        addressDetail: 'Địa chỉ chi tiết',
        addressDetailPlaceholder: 'Tòa nhà, tầng, phòng',
        companyIntro: 'Giới thiệu công ty',
        bio: 'Giới thiệu công ty',
        bioPlaceholder: 'Nhập giới thiệu chi tiết về công ty (tối đa 500 ký tự)',
        saveChanges: 'Lưu thay đổi',
        saving: 'Đang lưu...',
        cancel: 'Hủy',
        successTitle: 'Đã lưu',
        successMessage: 'Hồ sơ đã được cập nhật thành công.',
        required: 'Bắt buộc',
        optional: 'Tùy chọn',
        imageOnly: 'Chỉ có thể tải lên file hình ảnh.',
        maxFileSize: 'Kích thước file phải dưới',
        fileSizeError: 'Kích thước file phải dưới 5MB.',
        allowedFileTypes: 'Chỉ có thể tải lên PDF, JPG, PNG.',
        fileTypeError: 'Chỉ có thể tải lên PDF, JPG, PNG.',
      },
      analytics: {
        overview: 'Tổng quan',
        budget: 'Ngân sách',
        roi: 'ROI',
        performance: 'Hiệu suất',
        totalSpent: 'Tổng chi tiêu',
        totalBudget: 'Tổng ngân sách',
        avgCampaignBudget: 'Ngân sách TB mỗi chiến dịch',
        totalReach: 'Tổng охват',
        avgROI: 'ROI trung bình',
        totalInfluencers: 'KOL hợp tác',
        activeCampaigns: 'Chiến dịch đang chạy',
        completedCampaigns: 'Chiến dịch hoàn thành',
        budgetUtilization: 'Tỷ lệ sử dụng ngân sách',
        topPerformingCampaigns: 'Chiến dịch hiệu quả nhất',
        budgetAnalysis: 'Phân tích ngân sách',
        roiAnalysis: 'Phân tích ROI',
        roiDesc: 'Dữ liệu ROI theo chiến dịch sẽ hiển thị ở đây. Trong vận hành thực tế, biểu đồ phân tích ROI chi tiết và insights sẽ được cung cấp.',
        overallPerformance: 'Tổng hiệu suất',
        performanceDesc: 'Bảng xếp hạng chiến dịch hiệu quả nhất sẽ hiển thị ở đây. Trong vận hành thực tế, các chỉ số chi tiết như lượt xem, tỷ lệ tham gia, tỷ lệ chuyển đổi sẽ được cung cấp.',
        dataInfo: 'Thông tin dữ liệu phân tích',
        dataInfoDesc: 'Hiện đang hiển thị dữ liệu demo. Trong vận hành thực tế, dữ liệu thời gian thực và biểu đồ phân tích chi tiết sẽ được cung cấp.',
      },
      campaigns: {
        createCampaign: 'Tạo chiến dịch mới',
        search: 'Tìm kiếm chiến dịch...',
        all: 'Tất cả',
        active: 'Đang chạy',
        completed: 'Hoàn thành',
        draft: 'Nháp',
        budget: 'Ngân sách',
        budgetUsed: 'sử dụng',
        spent: 'Đã dùng',
        applicants: 'Ứng viên',
        accepted: 'Chấp nhận',
        views: 'Lượt xem',
        deadline: 'Hạn chót',
        noCampaigns: 'Không có chiến dịch',
        createFirst: 'Tạo chiến dịch đầu tiên của bạn',
        viewDetails: 'Xem chi tiết',
      },
      profile: {
        title: 'Hồ sơ',
        businessAccount: 'Tài khoản doanh nghiệp',
        businessSubtitle: 'Tài khoản thương hiệu/doanh nghiệp',
        verified: 'Đã xác minh',
        activityStats: 'Thống kê hoạt động',
        totalCampaigns: 'Tổng chiến dịch',
        activeCampaigns: 'Đang hoạt động',
        completedCampaigns: 'Đã hoàn thành',
        totalBudget: 'Tổng ngân sách',
        totalBudgetDesc: 'Tổng chi tiêu quảng cáo',
        totalInfluencers: 'Influencer hợp tác',
        accountManagement: 'Quản lý tài khoản',
        editProfile: 'Chỉnh sửa hồ sơ',
        verification: 'Xác minh doanh nghiệp',
        verificationDesc: 'Tăng độ tin cậy',
        settings: 'Cài đặt',
        logout: 'Đăng xuất',
        memberSince: 'Ngày tham gia',
        snsChannels: 'Kênh mạng xã hội',
      },
    },
    analyticsPage: {
      title: 'Thống kê',
      performanceAnalytics: '📊 Phân tích hiệu suất',
      trackActivity: 'Theo dõi thống kê hoạt động của bạn',
      thisMonth: 'Tháng này',
      totalStats: 'Tổng thống kê',
      recentCampaigns: 'Chiến dịch gần đây',
      campaigns: 'Chiến dịch',
      earnings: 'Thu nhập',
      views: 'Lượt xem',
      engagement: 'Tương tác',
      totalCampaigns: 'Tổng chiến dịch',
      totalEarnings: 'Tổng thu nhập',
      followers: 'Người theo dõi',
      avgRating: 'Đánh giá TB',
      completed: 'Hoàn thành',
    },
    profile: {
      basic: 'Thông tin cơ bản',
      demographic: 'Nhân khẩu học',
      lifestyle: 'Lối sống',
      beauty: 'Thông tin làm đẹp',
      completion: 'Hoàn thiện',
      edit: 'Chỉnh sửa hồ sơ',
      completionPercentage: 'Tỷ lệ hoàn thiện',
      missingFields: 'Trường còn thiếu',
      name: 'Tên',
      email: 'Email',
      phone: 'Số điện thoại',
      bio: 'Giới thiệu',
      zaloDescription: 'Nhập số Zalo thường dùng ở Việt Nam',
      socialMediaUrls: 'URL mạng xã hội',
      followerCount: 'Số người theo dõi',
      subscriberCount: 'Số người đăng ký',
      lastUpdated: 'Cập nhật lần cuối',
      gender: 'Giới tính',
      selectOption: 'Chọn',
      male: 'Nam',
      female: 'Nữ',
      other: 'Khác',
      any: 'Tất cả',
      ageRange: 'Độ tuổi',
      years: ' tuổi',
      yearsAndAbove: ' tuổi trở lên',
      location: 'Vị trí',
      hasVehicle: 'Có phương tiện',
      parentingInfo: 'Thông tin nuôi dạy con',
      hasChildren: 'Đang nuôi con',
      fashionInfo: 'Thông tin thời trang',
      foodInfo: 'Thông tin ẩm thực',
      fitnessInfo: 'Thông tin thể dục',
      petInfo: 'Thông tin thú cưng',
      hasPets: 'Đang nuôi thú cưng',
      techGadgets: 'Công nghệ/Thiết bị',
      hobbiesInterests: 'Sở thích & Quan tâm',
      whyDetailedInfo: 'Tại sao cần nhiều thông tin?',
      detailedInfoBenefit: 'Thông tin chi tiết giúp tăng độ chính xác khi ghép chiến dịch',
      infoExample1: 'Sản phẩm em bé → Độ tuổi con phù hợp',
      infoExample2: 'Phụ kiện ô tô → Người có xe',
      infoExample3: 'Hàng cao cấp → Mức thu nhập',
      infoExample4: 'Nội thất → Người sở hữu nhà',
      infoExample5: 'Quần áo → Kích cỡ chính xác',
      accurateInfoBenefit: 'Thông tin chính xác = Nhiều chiến dịch phù hợp hơn!',
      saveChanges: 'Lưu thay đổi',
      profileUpdated: 'Hồ sơ đã được cập nhật',
      // Field labels
      profilePhoto: 'Ảnh hồ sơ',
      introduction: 'Giới thiệu',
      maritalStatus: 'Tình trạng hôn nhân',
      education: 'Học vấn',
      occupation: 'Nghề nghiệp',
      housingType: 'Loại nhà ở',
      childrenStatus: 'Tình trạng con cái',
      petStatus: 'Tình trạng thú cưng',
      vehicleOwnership: 'Sở hữu phương tiện',
      hobbies: 'Sở thích',
      skinType: 'Loại da',
      skinTone: 'Tông da',
      hairType: 'Loại tóc',
      smartphoneModel: 'Mẫu điện thoại',
      smartDevices: 'Thiết bị thông minh',
      instagramConnection: 'Kết nối Instagram',
      tiktokConnection: 'Kết nối TikTok',
      youtubeConnection: 'Kết nối YouTube',
      facebookConnection: 'Kết nối Facebook',
      // Marital status values
      single: 'Độc thân',
      married: 'Đã kết hôn',
      divorced: 'Ly hôn',
      widowed: 'Góa bụa',
      // Education values
      bachelor: 'Cử nhân',
      master: 'Thạc sĩ',
      doctorate: 'Tiến sĩ',
      // Housing type values
      apartment: 'Chung cư',
      house: 'Nhà riêng',
      villa: 'Biệt thự',
      studio: 'Studio',
      sharedHouse: 'Nhà ở chung',
      dormitory: 'Ký túc xá',
      // Children values
      noChildren: 'Không có',
      oneChild: '1 người',
      twoChildren: '2 người',
      threeOrMoreChildren: '3 người trở lên',
      // Pet values
      noPets: 'Không có',
      dog: 'Chó',
      cat: 'Mèo',
      bird: 'Chim',
      fish: 'Cá',
      otherPet: 'Khác',
      // Vehicle values
      noVehicle: 'Không có',
      sedan: 'Sedan',
      suv: 'SUV',
      truck: 'Xe tải',
      electricCar: 'Xe điện',
      hybrid: 'Hybrid',
      motorcycle: 'Xe máy',
      scooter: 'Xe tay ga',
      // Skin type values
      drySkin: 'Da khô',
      oilySkin: 'Da dầu',
      combinationSkin: 'Da hỗn hợp',
      sensitiveSkin: 'Da nhạy cảm',
      normalSkin: 'Da bình thường',
      // Skin tone values
      veryFair: 'Rất sáng',
      fair: 'Sáng',
      medium: 'Trung bình',
      tan: 'Ngăm',
      dark: 'Tối',
      // Hair type values
      straightHair: 'Tóc thẳng',
      wavyHair: 'Tóc gợn sóng',
      curlyHair: 'Tóc xoăn',
      coilyHair: 'Tóc xoăn rất',
      // UI Messages
      itemsCompleted: 'mục hoàn thành',
      completeProfileForMore: 'Hoàn thiện hồ sơ để nhận nhiều cơ hội hơn!',
      higherCompletionBetterMatching: 'Tỷ lệ hoàn thiện cao hơn sẽ tăng tỷ lệ ghép chiến dịch và được ưu tiên hiển thị cho nhà quảng cáo.',
      perfectProfile: 'Hồ sơ hoàn hảo! 🎉',
      allInfoCompleted: 'Tất cả thông tin đã được nhập và bạn được đảm bảo tỷ lệ ghép tốt nhất.',
      viewMissingItems: 'Xem {count} mục chưa nhập',
      viewEarnings: 'Xem thu nhập →',
      averageRating: 'Đánh giá TB',
      viewReviews: 'Xem đánh giá →',
      snsShareBonus: 'Bonus chia sẻ SNS',
      pendingReview: '{count} đang chờ duyệt',
      pointsAfterApproval: 'Điểm được cộng sau khi duyệt',
      snsConnected: 'SNS đã kết nối',
      verified: 'Đã xác minh',
      followers: ' người theo dõi',
      connected: 'Đã kết nối',
      connect: 'Kết nối',
      // Section titles
      detailedProfile: 'Hồ sơ chi tiết',
      basicInfo: 'Thông tin cơ bản',
      lifestyleInfo: 'Lối sống',
      beautyInfo: 'Thông tin làm đẹp',
      techGadgetsInfo: 'Công nghệ/Thiết bị',
      hobbiesInterestsInfo: 'Sở thích & Quan tâm',
      rewardsBenefits: 'Phần thưởng & Ưu đãi',
      myActivities: 'Hoạt động của tôi',
      accountSettings: 'Cài đặt tài khoản',
      support: 'Hỗ trợ',
      // Cards and links
      inviteAdvertiser: 'Mời nhà quảng cáo',
      inviteAdvertiserDesc: 'Lên đến 100K VND mỗi lời mời!',
      attendanceCheck: 'Điểm danh',
      attendanceCheckDesc: 'Nhận điểm mỗi ngày',
      inviteFriends: 'Mời bạn bè',
      inviteFriendsDesc: 'Nhận điểm qua mã giới thiệu',
      pointsShop: 'Cửa hàng điểm',
      pointsShopDesc: 'Mua sản phẩm bằng điểm',
      myCampaigns: 'Chiến dịch của tôi',
      myCampaignsDesc: 'Xem tất cả tiến độ chiến dịch',
      completedCampaigns: 'Chiến dịch hoàn thành',
      completedCampaignsDesc: 'Thu nhập và lịch sử',
      inProgressWork: 'Công việc đang tiến hành',
      inProgressWorkDesc: 'Chiến dịch hiện tại',
      favoriteCampaigns: 'Chiến dịch yêu thích',
      favoriteCampaignsDesc: 'Xem chiến dịch quan tâm',
      myRaffleTickets: 'Vé xổ số của tôi',
      myRaffleTicketsDesc: 'Sự kiện đã tham gia và tỷ lệ trúng',
      messages: 'Tin nhắn',
      messagesDesc: 'Trò chuyện với nhà quảng cáo',
      myRanking: 'Xếp hạng của tôi',
      myRankingDesc: 'Kiểm tra xếp hạng thời gian thực',
      wallet: 'Ví',
      walletDesc: 'Điểm và rút tiền',
      statistics: 'Thống kê',
      statisticsDesc: 'Thu nhập và hiệu suất',
      portfolio: 'Danh mục',
      portfolioDesc: 'Kết quả công việc',
      notificationSettings: 'Cài đặt thông báo',
      notificationSettingsDesc: 'Quản lý thông báo',
      settings: 'Cài đặt',
      settingsDesc: 'Tài khoản và bảo mật',
      help: 'Trợ giúp',
      termsOfService: 'Điều khoản dịch vụ',
      privacyPolicy: 'Chính sách bảo mật',
      logout: 'Đăng xuất',
    },
    avatarUpload: {
      changePhoto: 'Thay đổi ảnh',
      uploadPhoto: 'Tải ảnh lên',
      uploadProfilePhoto: 'Tải ảnh hồ sơ lên',
      cancel: 'Hủy',
    },
    imageUpload: {
      imageFilesOnly: 'Chỉ có thể tải lên tệp hình ảnh.',
      fileSizeLimit: 'Kích thước tệp phải nhỏ hơn {maxSizeMB}MB.',
      dropImage: 'Thả hình ảnh vào đây',
      uploadImage: 'Tải hình ảnh lên',
      dragDropOrClick: 'Kéo thả hoặc nhấp để chọn',
    },
    notification: {
      title: 'Thông báo',
      unread: 'Chưa đọc',
      all: 'Tất cả',
      markAllRead: 'Đánh dấu đã đọc',
      settings: 'Cài đặt thông báo',
      types: {
        campaignMatch: 'Chiến dịch mới phù hợp',
        deadline: 'Sắp hết hạn',
        accepted: 'Đã chấp nhận',
        rejected: 'Đã từ chối',
        payment: 'Thanh toán hoàn tất',
      },
    },
    wallet: {
      title: 'Ví',
      balance: 'Số dư',
      withdraw: 'Rút tiền',
      history: 'Lịch sử',
      pending: 'Đang chờ',
      completed: 'Hoàn thành',
      cashPoints: 'Điểm tiền mặt',
      shoppingPoints: 'Điểm mua sắm',
      withdrawalRequest: 'Yêu cầu rút tiền',
      availableBalance: 'Số dư khả dụng',
      withdrawalAmount: 'Số tiền rút',
      allAmount: 'Tất cả',
      minimumWithdrawalError: 'Số tiền rút tối thiểu là',
      minimumWithdrawalErrorSuffix: '.',
      exceededBalanceError: 'Vượt quá số dư khả dụng.',
      withdrawalAccount: 'Tài khoản rút tiền',
      defaultAccount: 'Mặc định',
      withdrawalSummary: 'Tóm tắt rút tiền',
      requestedAmount: 'Số tiền yêu cầu',
      fee: 'Phí',
      actualDeposit: 'Số tiền thực nhận',
      withdrawalGuide: 'Hướng dẫn rút tiền',
      minimumWithdrawal: 'Số tiền rút tối thiểu',
      withdrawalFee: 'Phí rút tiền',
      minimum: 'Tối thiểu',
      processingTime: 'Thời gian xử lý',
      processingDays: '1-3 ngày làm việc',
      noCancellation: 'Không thể hủy sau khi yêu cầu rút tiền',
      confirmWithdrawal: 'Xác nhận rút tiền',
      depositAccount: 'Tài khoản nhận tiền',
      confirmWarning: 'Không thể hủy sau khi yêu cầu. Vui lòng kiểm tra thông tin.',
      withdrawalSuccess: 'Yêu cầu rút tiền thành công!\nXử lý trong 1-3 ngày làm việc.',
      registeredAccounts: 'Tài khoản đã đăng ký',
      earnHow: '🎁 Cách nhận điểm',
      pointsUsageGuide: '💡 Hướng dẫn sử dụng điểm',
      earnCampaignBonus: 'Nhận thưởng điểm khi hoàn thành chiến dịch',
      earnDailyCheckIn: 'Điểm danh hàng ngày (Tối đa 10K SP/ngày)',
      earnReferral: 'Mời bạn bè (50K SP/người)',
      earnSNSShare: 'Chia sẻ trên SNS (Tối đa 20K SP/chiến dịch)',
      earning: 'Thu nhập',
      credited: 'Tích lũy',
      spending: 'Sử dụng',
      withdrawal: 'Rút tiền',
      recentTransactions: 'Giao dịch gần đây',
      minimumWithdrawalAmount: 'Số tiền rút tối thiểu: 100,000 VND',
      withdrawalFeeRate: 'Phí rút tiền: 2% (Tối thiểu 10,000 VND)',
      processingTimeDays: 'Thời gian xử lý: 1-3 ngày làm việc',
      pointsInstantCredit: 'Điểm được tích lũy ngay lập tức và có thể sử dụng',
      pointsNoWithdrawal: 'Không thể rút tiền, chỉ sử dụng tại cửa hàng',
      pointsShopOnly: 'Sử dụng khi mua vé xổ số, tăng tốc, quà tặng, v.v.',
      pointsExpiryPeriod: 'Thời hạn: 1 năm kể từ ngày tích lũy',
    },
    review: {
      title: 'Đánh giá',
      write: 'Viết đánh giá',
      rating: 'Xếp hạng',
      comment: 'Bình luận',
      submit: 'Gửi đánh giá',
      professionalism: 'Chuyên nghiệp',
      punctuality: 'Đúng hạn',
      communication: 'Giao tiếp',
      creativity: 'Sáng tạo',
      performance: 'Hiệu suất',
      overallRating: 'Đánh giá tổng thể',
      reviewsCount: ' đánh giá',
      categoryRatings: 'Điểm theo danh mục',
      allReviews: 'Tất cả đánh giá',
      helpful: 'Hữu ích',
    },
    portfolio: {
      title: 'Portfolio của tôi',
      addNew: 'Thêm mới',
      statistics: 'Thống kê tổng quan',
      totalViews: 'Lượt xem',
      totalLikes: 'Lượt thích',
      avgEngagement: 'Tương tác TB',
      avgRating: 'Đánh giá TB',
      filterAll: '✨ Tất cả',
      emptyState: 'Chưa có portfolio',
      emptyStateDesc: 'Hoàn thành campaign sẽ tự động thêm vào portfolio',
      viewContent: 'Xem',
    },
    messages: {
      title: 'Tin nhắn',
      search: 'Tìm kiếm cuộc trò chuyện...',
      allMessages: '✨ Tất cả',
      unread: '📬 Chưa đọc',
      brands: '💼 Thương hiệu',
      support: '🛟 Hỗ trợ',
      noMessages: 'Chưa có tin nhắn',
      noMessagesDesc: 'Ứng tuyển campaign để trò chuyện với thương hiệu',
      typeMessage: 'Nhập tin nhắn...',
      quickReply1: 'Vâng, tôi quan tâm!',
      quickReply2: 'Tôi muốn nhận sample',
      quickReply3: 'Khi nào bắt đầu?',
      quickReply4: 'Ngân sách là bao nhiêu?',
      gallery: 'Thư viện',
      camera: 'Camera',
      file: 'Tệp tin',
      viewCampaign: 'Xem campaign',
    },
    onboarding: {
      welcome: {
        title: '👋 Chào mừng đến Exfluencer VN!',
        description: 'Nền tảng Influencer Marketing hàng đầu Việt Nam. Bắt đầu với hướng dẫn nhanh nhé!',
      },
      campaigns: {
        title: '🎯 Tìm Campaign',
        description: 'Tìm campaign từ các thương hiệu khác nhau. Lọc theo danh mục, nền tảng, ngân sách!',
      },
      eligibility: {
        title: '✓ Kiểm Tra Điều Kiện',
        description: 'Mỗi campaign hiển thị điều kiện ứng tuyển. Huy hiệu xanh = bạn đủ điều kiện!',
      },
      timeline: {
        title: '📊 Timeline Tiến Độ',
        description: 'Theo dõi tiến độ campaign trực quan. Ứng tuyển → Duyệt → Thực hiện → Nộp → Kiểm tra → Hoàn thành.',
      },
      revenue: {
        title: '💰 Thu Nhập Tháng',
        description: 'Xem thu nhập dự kiến và thưởng đã hoàn thành. Theo dõi xu hướng dễ dàng!',
      },
      portfolio: {
        title: '⭐ Portfolio',
        description: 'Quản lý campaign đã hoàn thành. Chỉ số hiệu suất và đánh giá tăng uy tín!',
      },
      messages: {
        title: '💬 Nhắn Tin',
        description: 'Trò chuyện trực tiếp với thương hiệu. Thảo luận chi tiết và hợp tác hiệu quả!',
      },
      notifications: {
        title: '🔔 Thông Báo',
        description: 'Nhận thông báo về duyệt campaign, thanh toán, tin nhắn. Không bỏ lỡ!',
      },
      wallet: {
        title: '💳 Ví & Điểm',
        description: 'Kiểm tra thưởng và rút tiền. Quản lý tiền mặt và điểm dễ dàng!',
      },
      complete: {
        title: '🎉 Sẵn Sàng!',
        description: 'Hoàn tất! Bắt đầu tìm campaign và khởi động sự nghiệp Influencer!',
      },
      step: 'Bước',
      completed: 'hoàn thành',
      skipTutorial: 'Bỏ qua hướng dẫn',
      features: {
        campaign: 'Campaign',
        revenue: 'Thu nhập',
        portfolio: 'Portfolio',
        messages: 'Tin nhắn',
        notifications: 'Thông báo',
        wallet: 'Ví',
      },
    },
    koreaDream: {
      title: 'KOREA DREAM',
      subtitle: 'Chuyến đi trải nghiệm làm đẹp Hàn Quốc',
      winnersTitle: '🎉 Nhận xét từ người thắng cuộc mùa trước',
      winnersDesc: 'Xem nhận xét thực tế từ những người đã đến Hàn Quốc!',
      season: 'Mùa',
      verified: 'Đã xác minh',
      photos: 'ảnh xác minh',
      callToAction: 'Bạn cũng có thể trở thành người thắng cuộc Mùa 1!',
      exchangeTickets: 'Đổi vé ngay bây giờ',
      buyNow: 'Mua ngay',
      confirmPurchase: 'Xác nhận mua',
      bestseller: '🔥 Bán chạy nhất!',
      flightAndHotel: '✈️ Vé máy bay khứ hồi + 🏨 Lưu trú 4 ngày 5 đêm',
      beautyAndShopping: '💉 Điều trị làm đẹp + 🛍️ Hỗ trợ mua sắm',
      totalValue: 'Tổng giá trị: 50,000,000 VND (2 người)',
      targetGoal: 'Mục tiêu vé',
      ticketsUnit: 'vé',
      progressText: '78.4% đạt được - còn 21,568 vé nữa!',
      myTickets: 'Vé của tôi',
      koreanBeautyExperience: 'Trải nghiệm làm đẹp Hàn Quốc 50M VND (2 người)',
      targetTickets: 'Vé mục tiêu',
      ticketProgress: '78,432 / 100,000 vé',
      // Prize details
      roundTripFlight: 'Vé máy bay khứ hồi',
      fourStarHotel: 'Khách sạn 4 sao',
      beautyTreatment: 'Điều trị làm đẹp',
      shoppingCredit: 'Hỗ trợ mua sắm',
      brandSponsorship: 'Tài trợ sản phẩm',
      roundTripFlightDetail: 'Việt Nam ↔ Incheon (2 người)',
      fourStarHotelDetail: 'Lưu trú 4 đêm (bao gồm bữa sáng)',
      beautyTreatmentDetail: 'Tiêm ánh sáng/Laser/Botox chọn 2',
      shoppingCreditDetail: 'Voucher Olive Young',
      brandSponsorshipDetail: 'Bộ quà tặng thương hiệu làm đẹp',
      roundTripFlightValue: '15,000,000 VND',
      fourStarHotelValue: '8,000,000 VND',
      beautyTreatmentValue: '10,000,000 VND',
      shoppingCreditValue: '2,000,000 VND',
      brandSponsorshipValue: '5,000,000 VND',
      // Progress section
      liveStatus: 'LIVE',
      realtimeProgress: '🎯 Tiến độ thời gian thực',
      currentProgress: 'Tỷ lệ hiện tại',
      collectedTickets: 'Vé đã thu thập',
      remainingQuantity: 'Số lượng còn lại',
      participants: 'Người tham gia',
      remainingToTarget: 'Còn {count} vé đến mục tiêu!',
      drawingIn7Days: 'Rút thăm trong vòng 7 ngày sau khi đạt mục tiêu',
      // My tickets
      estimatedWinChance: 'Xác suất trúng thưởng dự kiến',
      currentRank: 'Xếp hạng hiện tại',
      noTicketsYet: 'Bạn chưa có vé',
      exchangeTicketsNow: 'Đổi vé ngay →',
      // Prize composition
      prizeComposition: '🎁 Cấu trúc giải thưởng',
      professionalGuide: 'Hướng dẫn viên chuyên nghiệp, xe riêng, quay nội dung, bao gồm tất cả các bữa ăn',
      // Exchange section
      ticketExchange: '🎟️ Đổi vé',
      myPoints: 'Điểm của tôi:',
      exchangeRate: 'Tỷ lệ đổi',
      basicExchangeRate: '100,000 SP = 1 vé',
      bulkBonusInfo: '💡 Nhận vé thưởng khi đổi số lượng lớn! (Giảm giá tối đa 60%)',
      basic: 'Cơ bản',
      bonus: '+ Thưởng',
      total: '= Tổng',
      perTicket: 'mỗi vé',
      discount: 'giảm giá',
      warning: 'Lưu ý',
      warningLine1: 'Điểm đã đổi không thể rút tiền',
      warningLine2: 'Vé không thể hoàn lại/hủy',
      warningLine3: 'Nếu không đạt mục tiêu, vé sẽ được chuyển sang tháng sau',
      // Ranking
      rankingTop5: '🏆 Bảng xếp hạng vé TOP 5',
      tickets: 'vé',
      winProbability: 'Xác suất trúng',
      viewAllRanking: 'Xem toàn bộ bảng xếp hạng →',
      // Earn points
      howToEarnPoints: '💡 Cách kiếm điểm mua sắm',
      dailyAttendance: 'Điểm danh hàng ngày',
      inviteFriends: 'Mời bạn bè',
      shareCampaign: 'Chia sẻ chiến dịch',
      completeMission: 'Hoàn thành nhiệm vụ',
      dailyPoints: 'Hàng ngày 1,000 SP',
      invitePoints: '30,000 SP',
      sharePoints: '2,000~5,000 SP',
      missionPoints: 'Từ 10,000+ SP',
      // CTA
      seeYouInKorea: 'Hẹn gặp bạn ở Hàn Quốc!',
      moreTicketsMoreChance: 'Càng nhiều vé, xác suất trúng thưởng càng cao.',
      collectPointsNow: 'Thu thập điểm ngay và đổi vé ngay bây giờ!',
      // Exchange modal
      confirmExchange: 'Xác nhận đổi vé',
      pointsToUse: 'Điểm sử dụng',
      basicTickets: 'Vé cơ bản',
      bonusTickets: 'Vé thưởng',
      totalTicketsReceived: 'Tổng số vé nhận được',
      exchangeWarningModal: '⚠️ Điểm đã đổi không thể rút tiền và vé không thể hoàn lại/hủy.',
      cancel: 'Hủy',
      // Alerts
      insufficientPoints: 'Điểm mua sắm không đủ!',
      exchangeSuccessMessage: '✅ Đổi {count} vé thành công!',
      pointsUsed: 'Điểm đã sử dụng',
      ticketsReceived: 'Vé nhận được',
      bonusIncluded: 'bao gồm thưởng',
    },
    winners: {
      title: 'Nhận xét từ người thắng cuộc',
      subtitle: 'Những người đã đi Hàn Quốc chia sẻ trải nghiệm',
      seasonLabel: 'Mùa',
      winnerLabel: 'Người thắng cuộc',
      youCouldBeNext: 'Người thắng cuộc Mùa 1 có thể là bạn!',
    },
    dashboard: {
      cashAvailable: 'Tiền mặt khả dụng',
      withdrawable: 'Có thể rút',
      tapToWithdraw: 'Chạm để rút tiền →',
      shoppingPoints: 'Điểm mua sắm',
      useInShop: 'Dùng trong cửa hàng',
      tapToShop: 'Chạm để mua sắm →',
      totalEarnings: 'Tổng thu nhập',
      completedCampaigns: 'Chiến dịch hoàn thành',
      inProgress: 'Đang tiến hành',
      myTickets: 'Vé của tôi',
      checkDetails: 'Xem chi tiết',
      recentActivities: 'Hoạt động gần đây',
      viewAll: 'Xem tất cả',
      noCampaigns: 'Chưa có chiến dịch',
      findCampaigns: 'Tìm chiến dịch',
      overview: 'Tổng quan',
      campaigns: 'Chiến dịch',
      followers: 'Người theo dõi',
      engagementRate: 'Tỷ lệ tương tác',
      pendingAmount: 'Đang chờ',
      campaignEarnings: 'Thu nhập chiến dịch',
      platformBonus: 'Thưởng nền tảng',
      convertToTickets: 'Chuyển đổi thành vé',
      totalShoppingPoints: 'Tổng điểm mua sắm',
      pendingApproval: 'Chờ phê duyệt',
      applicationHistory: 'Lịch sử đăng ký',
      ticketsCount: 'vé',
      inProgressCampaignsTitle: 'Chiến dịch đang tiến hành',
      daysLeft: 'ngày còn lại',
      monthlyEarnings: 'Thu nhập tháng này',
      completedAndPaid: 'Hoàn thành & Đã trả',
      inProgressExpected: 'Đang tiến hành (Dự kiến)',
      waitingStatus: 'Đang chờ',
      expectedTotalEarnings: 'Tổng thu nhập dự kiến',
      monthlyTrend: 'Xu hướng hàng tháng',
      lastSixMonths: '6 tháng gần đây',
      september: 'Tháng 9',
      october: 'Tháng 10',
      november: 'Tháng 11',
      december: 'Tháng 12',
      january: 'Tháng 1',
      february: 'Tháng 2',
      snsSharingBonus: 'Thưởng chia sẻ mạng xã hội',
      campaignsShared: 'chiến dịch đã chia sẻ',
      viewHistory: 'Xem lịch sử',
      pointsShop: 'Cửa hàng điểm',
      buyWithPoints: 'Mua bằng điểm cho vé, quà tặng!',
      myShoppingPoints: 'Điểm mua sắm của tôi',
      koreaTicket: 'Vé Hàn Quốc',
      giftCard: 'Thẻ quà tặng',
      premium: 'Cao cấp',
      shopNow: 'Mua sắm ngay',
      growthAndRewards: 'Phát triển & Phần thưởng',
      attendanceCheck: 'Điểm danh',
      consecutiveDays: 'Liên tiếp',
      canEarn: 'Có thể kiếm',
      ranking: 'Xếp hạng',
      rankingPosition: 'Vị trí',
      topReward: 'Thưởng TOP',
      inviteFriends: 'Mời bạn bè',
      peopleInvited: 'người đã mời',
      lifetimeCommission: 'Hoa hồng suốt đời',
      inviteAdvertiser: 'Mời nhà quảng cáo',
      priorityMatching: 'Quyền ưu tiên',
      perPerson: 'mỗi người',
      deadline: 'Hạn chót',
      earnedReward: 'Phần thưởng đã nhận',
      expectedReward: 'Phần thưởng dự kiến',
      performanceTip: 'Mẹo cải thiện hiệu suất',
      performanceTipText: 'Tăng tỷ lệ tương tác 10% để nhận thêm nhiều chiến dịch!',
      viewStats: 'Xem thống kê',
      collectMore: 'Thu thập thêm',
      collectTickets: 'Thu thập vé',
      stepApply: 'Ứng tuyển',
      stepApprove: 'Phê duyệt',
      stepInProgress: 'Tiến hành',
      stepSubmit: 'Gửi',
      stepReview: 'Đánh giá',
      stepComplete: 'Hoàn thành',
      viewDetails: 'Chi tiết',
      peopleCount: 'người',
    },
    referral: {
      title: 'Giới thiệu bạn bè',
      inviteCode: 'Mã giới thiệu',
      copyCode: 'Sao chép mã',
      shareLink: 'Chia sẻ link',
      totalInvited: 'Tổng số người mời',
      totalEarned: 'Tổng thu nhập',
      shareOnSocial: 'Chia sẻ trên mạng xã hội',
      howItWorks: 'Cách thức hoạt động',
      step1Title: 'Chia sẻ mã',
      step1Desc: 'Gửi mã giới thiệu cho bạn bè',
      step2Title: 'Bạn đăng ký',
      step2Desc: 'Bạn bè đăng ký qua link của bạn',
      step3Title: 'Nhận thưởng',
      step3Desc: 'Nhận điểm khi bạn bè hoàn thành chiến dịch',
      inviteHistory: 'Lịch sử giới thiệu',
      noInvites: 'Chưa có lời mời',
      inviteNow: 'Mời ngay',
      earnPerInvite: 'Thu nhập mỗi lời mời',
      bonusInfo: 'Thông tin thưởng',
      specialBonus: '🎁 Phần thưởng đặc biệt!',
      inviteOne: 'Mời 1 bạn',
      freeTickets: 'Vé miễn phí!',
      points: 'điểm',
      limitedBonus: 'Phần thưởng đặc biệt có thời hạn!',
      everyCampaign: 'Mỗi khi bạn làm chiến dịch',
      autoPayment: '5% tự động thanh toán!',
      monthlyAutoIncome: '💸 Thu nhập tự động tháng này',
      totalReferralIncome: 'Tổng thu nhập giới thiệu',
      permanent5Percent: 'Thu nhập 5% vĩnh viễn',
      myReferralCode: 'Mã giới thiệu của tôi',
      copyCodeButton: '📋 Sao chép mã',
      shareDirectly: 'Chia sẻ ngay cho bạn bè 👇',
      whatsappShareText: 'Tham gia Exfluencer VN cùng tôi! Nhận {points} khi đăng ký qua link này',
      copyLink: 'Sao chép link',
      permanent5System: '💡 Hệ thống thu nhập 5% vĩnh viễn',
      inviteFriend: 'Mời bạn bè',
      shareCodeOrLink: 'Chia sẻ mã giới thiệu hoặc link cho bạn bè',
      friendSignupComplete: 'Bạn hoàn tất đăng ký',
      bothReceiveBonus: 'Cả hai đều nhận',
      lifetime5Auto: 'Thu nhập tự động 5% suốt đời!',
      friendEveryCampaign: 'Mỗi khi bạn làm chiến dịch',
      calculationExample: 'Ví dụ: Bạn bè làm chiến dịch 1M VND → Bạn tự động nhận 50K VND',
      notDeductFromFriend: '⚡ Không trừ từ bạn bè mà thanh toán thêm!',
      whyGood: 'Tại sao lại tốt?',
      benefit1: '💰 Thu nhập thụ động - Không làm gì vẫn có tiền',
      benefit2: '♾️ Vĩnh viễn - Thu nhập suốt đời',
      benefit3: '📈 Tăng theo số người - Càng nhiều bạn, càng nhiều tiền',
      estimatedIncomeCalculator: '📊 Máy tính thu nhập dự kiến',
      myReferrals: 'Người tôi giới thiệu',
      active: '⚡ Hoạt động',
      pending: 'Chờ đăng ký',
      my5Income: 'Thu nhập 5% của tôi',
      completedCampaigns: 'Chiến dịch hoàn thành',
      friendAutoPayment: '💰 Mỗi khi bạn này làm chiến dịch, bạn tự động nhận 5%!',
      signupDate: 'Ngày đăng ký:',
      bothReceiveAfterSignup: '⏱️ Cả hai sẽ nhận sau khi bạn hoàn tất đăng ký',
      noInvitesYet: 'Chưa mời bạn bè nào',
      inviteForLifetime5: 'Mời bạn bè và nhận thu nhập tự động 5% suốt đời!',
      inviteNowButton: 'Mời bạn bè ngay',
      codeCopied: 'Đã sao chép mã giới thiệu!',
      linkCopied: 'Đã sao chép link giới thiệu!',
      inviteTitle: 'Mời tham gia Exfluencer VN',
      inviteMessage: 'Hãy tham gia Exfluencer VN cùng tôi! Đăng ký và nhận {points}!',
    },
    attendance: {
      title: 'Điểm danh',
      checkIn: 'Điểm danh',
      todayReward: 'Phần thưởng hôm nay',
      streak: 'Chuỗi liên tiếp',
      days: 'ngày',
      totalCheckins: 'Tổng điểm danh',
      thisMonth: 'Tháng này',
      calendar: 'Lịch',
      rewards: 'Phần thưởng',
      checkInSuccess: 'Điểm danh thành công!',
      alreadyChecked: 'Đã điểm danh hôm nay',
      comeBackTomorrow: 'Quay lại vào ngày mai',
    },
    ranking: {
      title: 'Bảng xếp hạng',
      myRank: 'Hạng của tôi',
      topInfluencers: 'Influencer hàng đầu',
      thisMonth: 'Tháng này',
      allTime: 'Mọi thời điểm',
      rank: 'Hạng',
      name: 'Tên',
      earnings: 'Thu nhập',
      campaigns: 'Chiến dịch',
      fullList: 'Bảng xếp hạng đầy đủ',
      fullRankings: 'Toàn bộ bảng xếp hạng',
      hero: {
        title: '🏆 Influencer Ranking',
        subtitle: 'Top influencers this month',
      },
      resetInfo: 'Rankings reset on the 1st of each month at 00:00 KST',
      campaignsUnit: 'chiến dịch',
      you: '(You)',
      season: {
        currentSeason: 'Thử thách Siêu sao Tháng 2',
        seasonEnd: 'Mùa kết thúc sau',
        warning: 'Xếp hạng sẽ được xác định sau khi mùa kết thúc!',
      },
      nextRank: {
        toNext: 'Đến hạng tiếp theo',
        needed: 'cần',
        canPass: 'Có thể vượt',
        boost: 'Tăng hạng',
      },
      motivation: {
        top10: 'Vào TOP 10! Phần thưởng đã xác nhận!',
        almost: 'Chỉ còn chút nữa! Gần đến TOP 10 rồi!',
        keepGoing: 'Tiếp tục cố gắng! Cơ hội luôn rộng mở!',
      },
      liveActivity: {
        title: 'Hoạt động trực tiếp',
      },
      topMovers: {
        title: 'TOP 3 Tăng hạng nhanh tuần này',
        message: 'Bạn có thể là nhân vật chính tuần sau!',
      },
      podium: {
        champions: 'Nhà vô địch',
      },
      rewards: {
        title: 'Phần thưởng theo hạng',
        resetInfo: 'Bảng xếp hạng sẽ được đặt lại vào 00:00 ngày 1 hàng tháng và phần thưởng sẽ được trao.',
        warning: 'Hạng cuối cùng trước khi kết thúc mùa là tiêu chuẩn phần thưởng!',
      },
      cta: {
        title: 'Tăng xếp hạng ngay bây giờ!',
        subtitle: 'Nhận phần thưởng lớn với nỗ lực nhỏ',
        earnPoints: 'Tích điểm',
        dailyCheck: 'Điểm danh hàng ngày',
      },
    },
    favorites: {
      title: 'Yêu thích',
      noCampaigns: 'Chưa có chiến dịch yêu thích',
      browseCampaigns: 'Duyệt chiến dịch',
      removeFromFavorites: 'Xóa khỏi yêu thích',
      addedOn: 'Đã thêm vào',
      cashCampaigns: '💰 Chiến dịch tiền mặt',
      pointsCampaigns: '🛍️ Chiến dịch điểm mua sắm',
      items: 'mục',
      emptyMessage: 'Lưu chiến dịch yêu thích để xem sau',
    },
    myCampaigns: {
      title: 'Chiến dịch của tôi',
      subtitle: 'Xem tất cả chiến dịch đã ứng tuyển và đang tiến hành',
      stats: {
        active: 'Đang tiến hành',
        completed: 'Hoàn thành',
        totalEarnings: 'Tổng thu nhập',
        pending: 'Chờ thanh toán',
      },
      tabs: {
        all: 'Tất cả',
        active: 'Đang tiến hành',
        completed: 'Hoàn thành',
        rejected: 'Không được chọn',
      },
      empty: {
        all: 'Chưa có chiến dịch nào.',
        active: 'Không có chiến dịch đang tiến hành.',
        completed: 'Chưa hoàn thành chiến dịch nào.',
        rejected: 'Không có chiến dịch bị từ chối.',
      },
      viewDetails: 'Xem chi tiết',
      appliedAt: 'Ngày ứng tuyển',
      selectedAt: 'Ngày được chọn',
      completedAt: 'Ngày hoàn thành',
      paymentAgreed: 'Đang thỏa thuận thanh toán',
      paymentCompleted: 'Đã thanh toán',
      paymentAgreement: 'Đang thỏa thuận thanh toán',
      paymentAgreementDesc: 'Thỏa thuận phương thức thanh toán trực tiếp với nhà quảng cáo. (Chuyển khoản, Momo, Zalo Pay, v.v.)',
      deliveryTracking: 'Theo dõi vận chuyển',
      courier: 'Đơn vị vận chuyển',
      trackingNumber: 'Mã vận đơn',
      estimatedDelivery: 'Dự kiến giao',
      rejectionReason: 'Lý do từ chối',
    },
    completed: {
      title: 'Đã hoàn thành',
      totalCompleted: 'Tổng số hoàn thành',
      totalEarned: 'Tổng thu nhập',
      noCampaigns: 'Chưa hoàn thành chiến dịch nào',
      startWorking: 'Bắt đầu làm việc',
      completedOn: 'Hoàn thành vào',
      earned: 'Đã kiếm',
      viewDetails: 'Xem chi tiết',
      downloadReceipt: 'Chứng từ',
      emptyDescription: 'Hoàn thành chiến dịch và\nkiểm tra thu nhập của bạn',
      infoTitle: '💡 Hướng dẫn chiến dịch đã hoàn thành',
      infoCash: 'Điểm tiền mặt: Thanh toán trong 2-5 ngày sau khi hoàn thành chiến dịch',
      infoPoints: 'Điểm mua sắm: Được cộng ngay lập tức (có thể sử dụng tại cửa hàng)',
      infoRating: 'Đánh giá & nhận xét: Đánh giá mức độ hài lòng của nhà quảng cáo',
      infoReceipt: 'Chứng từ: Có thể sử dụng khi khai báo thuế',
      receiptContent: {
        campaignName: 'Tên chiến dịch',
        status: 'Trạng thái',
        statusPaid: 'Đã thanh toán',
        note: '※ Trong vận hành thực tế sẽ tải xuống file PDF.',
      },
    },
    raffle: {
      myTickets: 'Vé của tôi',
      totalTickets: 'Tổng số vé',
      ticketUnit: ' vé',
      eventsParticipated: ' sự kiện đã tham gia',
      pointsUsed: 'Điểm đã dùng',
      totalInvestment: 'Tổng đầu tư',
      increaseChance: 'Cách tăng cơ hội trúng',
      moreTicketsMoreChance: 'Càng nhiều vé, cơ hội trúng càng cao!',
      participationStatus: 'Tình trạng tham gia',
      collectMore: 'Lấy thêm',
      noEntries: 'Chưa tham gia sự kiện nào',
      buyTicketsDescription: 'Mua vé bằng điểm',
      tryForPrizes: 'và thử vận may với nhiều giải thưởng!',
      buyTicketsFromShop: 'Mua vé tại cửa hàng',
      prizeValue: 'Giá trị giải',
      estimatedWinChance: 'Cơ hội trúng ước tính',
      total: 'Tổng',
      purchaseHistory: 'Lịch sử mua',
      items: ' mục',
      view: ' xem',
      buyMore: 'Mua thêm',
      checkRanking: 'Xem bảng xếp hạng vé',
      compareWithOthers: 'So sánh với người khác',
      ticketGuide: 'Hướng dẫn vé',
      guideLine1: 'Vé có giá trị đến khi rút thăm',
      guideLine2: 'Càng nhiều vé, cơ hội trúng càng cao',
      guideLine3: 'Lịch rút thăm sẽ được thông báo riêng',
      guideLine4: 'Sẽ liên hệ khi trúng giải',
    },

    shareHistory: {
      title: 'Lịch sử chia sẻ',
      totalShares: 'Tổng số lần chia sẻ',
      totalEarned: 'Tổng điểm tích lũy',
      filterAll: 'Tất cả',
      filterPending: 'Đang chờ',
      filterApproved: 'Đã duyệt',
      filterRejected: 'Bị từ chối',
      statusPending: 'Đang chờ duyệt',
      statusApproved: 'Đã duyệt',
      statusRejected: 'Bị từ chối',
      noShares: 'Chưa có lịch sử chia sẻ',
      noSharesFiltered: 'Không có chia sẻ nào',
      shareAndEarn: 'Chia sẻ chiến dịch và nhận điểm!',
      submittedLink: 'Link đã gửi:',
      averageReviewTime: 'Trung bình 1~3 giờ',
      approvedAt: 'Đã duyệt:',
      viewReason: 'Xem lý do',
      rejectionReason: 'Lý do từ chối:',
      reviewGuideTitle: '💡 Hướng dẫn xét duyệt',
      reviewGuideLine1: '• Quản trị viên sẽ kiểm tra bài đăng thực tế',
      reviewGuideLine2: '• Trung bình hoàn thành trong 1~3 giờ',
      reviewGuideLine3: '• Điểm sẽ tự động được cộng khi duyệt',
      reviewGuideLine4: '• Xóa bài đăng có thể dẫn đến thu hồi điểm',
      whereToShare: '📍 Bạn có thể chia sẻ ở đâu?',
      facebookGroups: 'Nhóm Facebook - Nên dùng nhóm công khai',
      personalTimeline: 'Timeline cá nhân - Trang cá nhân của bạn',
      facebookPages: 'Trang Facebook - Trang do bạn quản lý',
      publicPostWarning: '⚠️ Vui lòng đặt chế độ Công khai! Quản trị viên cần xác minh.',
    },

    pointsStats: {
      title: 'Thống kê điểm',
      totalEarned: 'Tổng tích lũy',
      totalSpent: 'Tổng đã dùng',
      totalTickets: 'Tổng vé',
      participatedRaffles: 'Đã tham gia',
      thisMonthSpending: 'Chi tiêu tháng này',
      lastMonthVs: 'So với tháng trước',
      avgPerRaffle: 'Trung bình mỗi lần tham gia',
      recentTransactions: 'Giao dịch gần đây',
      noTransactions: 'Chưa có giao dịch',
      ticketsPurchased: 'Mua vé',
      earnTipsTitle: '💡 Mẹo tích điểm',
      earnTip1: '• Điểm danh hàng ngày để nhận tối đa 10,000 SP',
      earnTip2: '• Mời bạn bè nhận ngay 50,000 SP',
      earnTip3: '• Chia sẻ SNS để tích thêm 20,000 SP',
      loading: 'Đang tải...',
    },

    inviteAdvertiser: {
      title: 'Mời nhà quảng cáo',
      subtitle: 'Invite Brands',
      inviteAndEarn: '💼 Mời nhà quảng cáo và nhận thu nhập thêm!',
      totalEarnings: 'Thu nhập từ lời mời VND',
      activeAdvertisers: 'Nhà quảng cáo đang hoạt động',
      myBenefits: '💰 Lợi ích của tôi (KOL Benefits)',
      signupBonus: 'Ngay khi đăng ký',
      signupBonusDesc: 'Nhận ngay khi nhà quảng cáo đăng ký!',
      firstCampaignBonus: 'Khi chiến dịch đầu tiên',
      firstCampaignBonusDesc: 'Khi nhà quảng cáo tạo chiến dịch đầu tiên!',
      ongoingCommission: 'Hoa hồng liên tục 3% (tối đa',
      ongoingCommissionDesc: 'Mỗi khi nhà quảng cáo tạo chiến dịch!',
      priorityMatching: 'Quyền ưu tiên ghép đôi',
      priorityMatchingDesc: 'Có thể ứng tuyển ưu tiên cho chiến dịch của nhà quảng cáo đã mời!',
      brandBenefits: '🎁 Lợi ích của nhà quảng cáo (Brand Benefits)',
      firstCampaignDiscount: 'Giảm giá 20% cho chiến dịch đầu tiên (tối đa 500,000 VND)',
      freeCollaboration: 'Hợp tác miễn phí với KOL được giới thiệu (miễn phí hoa hồng)',
      premiumSupport: 'Hỗ trợ khách hàng cao cấp (quản lý chuyên trách 24 giờ)',
      verifiedKolList: 'Danh sách KOL đã xác minh',
      winWinNote: '💡 Win-Win! Nhà quảng cáo cũng nhận nhiều lợi ích nên dễ mời!',
      myInviteCode: 'Mã mời của tôi My Invite Code',
      copyCode: 'Sao chép mã',
      copied: 'Đã sao chép',
      copyLink: 'Sao chép liên kết Copy Link',
      shareToAdvertiser: 'Chia sẻ với nhà quảng cáo Share to Brand',
      howItWorks: 'Cách hoạt động? How it works',
      step1Title: 'Chia sẻ mã',
      step1Desc: 'Gửi mã mời cho nhà quảng cáo qua Kakao Talk, email',
      step2Title: 'Nhà quảng cáo đăng ký ngay',
      step2Desc: 'Tự động cộng điểm khi hoàn tất đăng ký!',
      step3Title: 'Khi chiến dịch đầu tiên',
      step3Desc: 'Có thể ứng tuyển ưu tiên cho chiến dịch của nhà quảng cáo!',
      step4Title: 'Nhận hoa hồng liên tục 3%',
      step4Desc: 'Tối đa mỗi chiến dịch!',
      inviteHistory: 'Lịch sử mời Invite History',
      statusActive: 'Đang hoạt động Active',
      statusPending: 'Đang chờ Pending',
      inviteDate: 'Ngày mời:',
      campaigns: 'Chiến dịch đang chạy:',
      totalEarningsLabel: 'Thu nhập tích lũy',
      viewBrandCampaigns: 'Xem chiến dịch của nhà quảng cáo này',
      noInvites: 'Chưa có nhà quảng cáo nào được mời',
      noInvitesDesc: 'Mời nhà quảng cáo đang hợp tác và nhận thu nhập thêm!',
      successTipsTitle: '💡 Mẹo thành công Success Tips',
      successTip1: '✅ Đề xuất cho nhà quảng cáo đang hợp tác trước (độ tin cậy cao)',
      successTip2: '✅ Nhấn mạnh lợi ích nền tảng (giảm giá 20%, hợp tác miễn phí)',
      successTip3: '✅ Giải thích ghép đôi nhanh (trung bình trong 24 giờ)',
      successTip4: '✅ Nhà quảng cáo có nhiều chiến dịch SNS càng tốt',
      successTip5: '💰 Mời trung bình 3 người/tháng, thu nhập thêm hơn!',
    },

    campaignDetail: {
      title: 'Chi tiết chiến dịch',
      expectedEarnings: 'Thu nhập dự kiến',
      applyNow: '🎯 Ứng tuyển chiến dịch này',
      matchingRate: 'Tỷ lệ phù hợp',
      eligible: '✓ Bạn có thể ứng tuyển chiến dịch này!',
      notEligible: '✗ Tỷ lệ phù hợp thấp, có thể khó ứng tuyển.',
      viewDetails: 'Xem chi tiết phù hợp',
      requirements: 'Yêu cầu ứng tuyển',
      minFollowers: 'Người theo dõi tối thiểu',
      minEngagement: 'Tương tác tối thiểu',
      platform: 'Nền tảng:',
      category: 'Danh mục:',
      target: 'Đối tượng:',
      location: 'Khu vực:',
      skinType: 'Loại da:',
      skinTone: 'Màu da:',
      childRequired: 'Điều kiện con cái:',
      vehicleRequired: 'Điều kiện phương tiện:',
      clothingSize: 'Kích cỡ quần áo:',
      petRequired: 'Điều kiện thú cưng:',
      maritalStatus: 'Tình trạng hôn nhân:',
      housingType: 'Loại nhà ở:',
      benefits: 'Lợi ích nhận được',
      providedProducts: '📦 Sản phẩm cung cấp',
      fullsize: 'Chính hãng',
      sample: 'Mẫu thử',
      totalValue: 'Tổng giá trị sản phẩm',
      shippingInfo: 'Thông tin vận chuyển',
      additionalBenefits: 'Lợi ích bổ sung',
      productGallery: 'Thư viện sản phẩm',
      contentExamples: 'Ví dụ nội dung',
      contentExamplesDesc: 'Hãy tạo nội dung theo phong cách này! Đây là ví dụ tham khảo.',
      missionGuide: 'Hướng dẫn nhiệm vụ chi tiết',

      // Marketing & UX Optimization
      urgency: {
        hotCampaign: 'Chiến dịch HOT đang thịnh hành',
        recentApps: 'người đã ứng tuyển gần đây',
        trending: 'ĐANG HOT',
        slotsRemaining: 'Vị trí còn lại',
        timeLeft: 'Thời gian còn lại',
        hours: ' giờ',
      },
      difficulty: {
        title: 'Độ khó & Thời gian',
        difficultyLevel: 'Độ khó',
        easy: 'Dễ',
        medium: 'Trung bình',
        hard: 'Khó',
        timeRequired: 'Thời gian cần',
        hoursUnit: ' giờ',
        successRate: 'Tỷ lệ được chọn',
        skillsNeeded: 'Kỹ năng cần thiết',
      },
      earnings: {
        title: 'Máy tính thu nhập',
        basePayment: 'Thanh toán cơ bản',
        productValue: 'Giá trị sản phẩm',
        bonusOpportunities: 'Cơ hội thưởng thêm',
        maxPotential: 'Thu nhập tối đa có thể',
        cashAndProducts: 'tiền mặt + sản phẩm',
      },
      socialProof: {
        title: 'Đánh giá từ Influencer',
        completionRate: 'Tỷ lệ hoàn thành',
        avgResponseTime: 'Thời gian phản hồi TB',
        recentReviews: 'Đánh giá gần đây',
        hoursAgo: ' giờ trước',
      },
      quality: {
        verified: 'Nhà quảng cáo đã xác minh',
        paymentGuarantee: 'Đảm bảo thanh toán',
        contractProtection: 'Bảo vệ hợp đồng',
      },

      contentFormat: '📱 Nội dung cần tạo',
      mustInclude: 'Nội dung bắt buộc',
      prohibited: 'Nội dung cấm',
      brandInfo: 'Thông tin thương hiệu',
      founded: 'Thành lập',
      previousCampaigns: 'Chiến dịch trước',
      averageRating: 'Đánh giá trung bình',
      collaboratedInfluencers: 'Influencer hợp tác',
      website: 'Website',
      selectionCriteria: 'Tiêu chí lựa chọn',
      expectedApplicants: 'Ứng viên dự kiến',
      selectedInfluencers: 'Số người được chọn',
      expectedCompetition: 'Tỷ lệ cạnh tranh dự kiến',
      priorityCriteria: '🎯 Tiêu chí ưu tiên',
      avgReviewTime: 'Thời gian xét duyệt trung bình',
      faq: '💬 Câu hỏi thường gặp',
      pendingApproval: 'Đang chờ phê duyệt',
      pendingApprovalDesc: 'Nhà quảng cáo đang xem xét đơn ứng tuyển.\nThời gian duyệt trung bình: 1~2 ngày',
      avgApprovalTime: 'Thời gian duyệt trung bình: 1~2 ngày',
      shareAndEarnBonus: '📣 Chia sẻ chiến dịch và nhận thu nhập thêm!',
      shareDescription: 'Chia sẻ trên nhóm/timeline/trang Facebook → Nhận điểm!',
      shareSubmitted: 'lượt chia sẻ đã hoàn tất! Có thể chia sẻ nhiều nơi!',
      shareStatus: '📊 Tình trạng chia sẻ',
      shareApproved: 'Đã duyệt',
      sharePending: 'Đang chờ',
      shareRejected: 'Bị từ chối',
      shareGuidelines: '📋 Hướng dẫn chia sẻ Share Guidelines',
      shareWhere: 'Có thể chia sẻ: nhóm, timeline cá nhân, trang (cần đặt chế độ công khai)',
      sharePerShare: 'Cộng điểm cho mỗi lượt chia sẻ (sau khi quản trị viên duyệt)',
      shareMultiple: 'Có thể chia sẻ cùng chiến dịch nhiều nơi! (mỗi nơi được cộng điểm)',
      shareDailyLimit: 'Tối đa mỗi ngày (hôm nay:',
      shareNoDelete: 'Cấm xóa trong 24 giờ sau khi chia sẻ (điểm sẽ bị thu hồi)',
      totalShareEarnings: 'Tổng thu nhập từ chia sẻ',
      shareMore: '➕ Chia sẻ thêm nơi khác',
      dailyLimitReached: 'Đã đạt giới hạn hàng ngày Daily limit',
      shareOnFacebook: '📣 Chia sẻ trên Facebook',
      shareLinkModal: {
        title: '📣 Chia sẻ trên Facebook',
        description: 'Chia sẻ chiến dịch trên Facebook và nhập link bài đăng để nhận điểm!',
        whereCanShare: '📍 Bạn có thể chia sẻ ở đâu?',
        facebookGroups: 'Nhóm Facebook',
        facebookGroupsDesc: 'Nên dùng nhóm công khai (Việt Nam/Hàn Quốc/Marketing)',
        personalTimeline: 'Timeline cá nhân',
        personalTimelineDesc: 'Đăng trên tường cá nhân (cần đặt chế độ công khai)',
        facebookPages: 'Trang Facebook',
        facebookPagesDesc: 'Đăng trên trang do bạn quản lý',
        publicWarning: '⚠️ Vui lòng đặt chế độ Công khai! (để quản trị viên xác minh)',
        howToShare: '📋 Cách chia sẻ (hoàn toàn thủ công)',
        step1: 'Nhấn nút "Sao chép nội dung chia sẻ" bên dưới',
        step1Desc: 'Văn bản sẽ được sao chép vào clipboard',
        step2: 'Mở Facebook trực tiếp',
        step2Desc: 'Truy cập Facebook từ app hoặc trình duyệt',
        step3: 'Dán vào nơi bạn muốn (Ctrl+V)',
        step3Desc: 'Chọn nhóm, timeline hoặc trang (đặt chế độ công khai!)',
        step4: 'Sao chép link bài đăng',
        step4Desc: 'Sau khi đăng: "..." → "Sao chép link"',
        step5: 'Quay lại đây và nhập link',
        step5Desc: 'Dán vào ô nhập bên dưới và nhấn "Gửi"',
        recommendedContent: '💡 Nội dung chia sẻ đề xuất',
        copyContent: '📋 Sao chép nội dung chia sẻ',
        manualNote: '💡 Vui lòng tự mở Facebook và chọn nhóm/timeline/trang để chia sẻ',
        enterLink: 'Nhập link bài đăng Facebook *',
        linkCopyHow: '💡 Cách sao chép link: Nhấn "..." ở góc trên bên phải bài đăng → "Sao chép link"',
        fakeWarning: '⚠️ Gửi link giả có thể dẫn đến tài khoản bị khóa',
        validFormats: '✅ Định dạng URL hợp lệ (tất cả đều được!)',
        groupPost: 'Bài đăng nhóm:',
        timelinePost: 'Timeline cá nhân:',
        pagePost: 'Bài đăng trang:',
        permalink: 'Permalink:',
        cancel: 'Hủy',
        submit: 'Gửi',
      },
      progress: 'Tiến độ',
      completedTasks: 'Công việc đã hoàn thành',
      submitWork: 'Gửi kết quả',
      deliverables: 'Yêu cầu nộp',
      shareCountSubmitted: 'lần chia sẻ đã gửi',
      shareAndEarnBonusText: 'Chia sẻ Facebook & nhận thưởng',
      recentApplicants: 'Danh sách ứng viên gần đây',
      totalApplicants: 'Tổng ứng viên',
      slotsLeft: 'Vị trí còn lại',
      followersUnit: 'người theo dõi',
      earningsBreakdown: 'Chi tiết thu nhập',
      basePay: 'Thanh toán cơ bản',
      guaranteedOnCompletion: 'Đảm bảo khi hoàn thành',
      productValue: 'Giá trị sản phẩm',
      freeProducts: 'Sản phẩm miễn phí',
      bonusOpportunity: 'Cơ hội thưởng',
      totalExpectedEarnings: 'Tổng thu nhập dự kiến',
      maxEarningsWithBonus: 'Thu nhập tối đa bao gồm thưởng',
      submittedWork: 'Kết quả đã gửi',
      viewLink: 'Xem link →',
      approved: 'Đã duyệt',
      rejected: 'Bị từ chối',
      reviewing: 'Đang xem xét',
      views: 'K',
      likes: 'Thích',
      submittedAt: 'Ngày gửi',
      campaignInfo: 'Thông tin chiến dịch',
      period: 'Thời gian:',
      deadline: 'Hạn chót:',
      applyModal: {
        title: '🎯 Ứng tuyển chiến dịch',
        advertiser: 'Nhà quảng cáo',
        expectedEarnings: 'Thu nhập dự kiến',
        deadline: 'Hạn chót',
        confirmLine1: '✅ Đơn ứng tuyển sẽ được gửi cho nhà quảng cáo',
        confirmLine2: '✅ Bạn sẽ nhận thông báo khi được duyệt',
        confirmLine3: '⏱️ Thời gian duyệt trung bình: 1~2 ngày',
        cancel: 'Hủy',
        apply: 'Ứng tuyển',
      },
      uploadModal: {
        title: 'Gửi kết quả',
        contentUrl: 'URL nội dung',
        urlPlaceholder: 'https://instagram.com/p/...',
        description: 'Mô tả (tùy chọn)',
        descPlaceholder: 'Nhập mô tả thêm...',
        cancel: 'Hủy',
        submit: 'Gửi',
      },
      alerts: {
        applicationComplete: '✅ Hoàn tất ứng tuyển chiến dịch!\n\nĐang chờ nhà quảng cáo phê duyệt.\nThời gian phê duyệt trung bình: 1~2 ngày',
        workSubmitted: 'Kết quả đã được gửi!',
        dailyLimitExceeded: '⚠️ Vượt quá giới hạn chia sẻ hàng ngày!\n\nTối đa ${MAX_DAILY_SHARES} lượt chia sẻ mỗi ngày.\nVui lòng thử lại vào ngày mai.\n\nGiới hạn hàng ngày: ${MAX_DAILY_SHARES} lượt chia sẻ/ngày',
        pleaseEnterLink: '⚠️ Vui lòng nhập link bài đăng Facebook!\n\nPlease enter your Facebook post URL.',
        invalidFacebookLink: '⚠️ Link bài đăng Facebook không hợp lệ!\n\nVí dụ:\n• https://www.facebook.com/groups/123/posts/456/\n• https://www.facebook.com/user/posts/123456\n\nĐịnh dạng URL Facebook không hợp lệ.',
        duplicateLink: '⚠️ Link này đã được gửi!\n\nKhông thể gửi trùng lặp cùng một link.\nNếu bạn đã chia sẻ ở nơi khác, vui lòng nhập link mới.\n\nURL này đã được gửi.',
        shareLinkSubmitted: '✅ Hoàn tất gửi link chia sẻ!\n\n🔍 Quản trị viên đang xem xét bài đăng\n⏱️ Thời gian xem xét trung bình: 1~3 giờ\n💰 Khi được phê duyệt, ${formatPoints(SHARE_BONUS_AMOUNT)} VND sẽ tự động được cộng\n\n💡 Bạn có thể chia sẻ cùng chiến dịch đến các nhóm/dòng thời gian khác!\n\n📋 Bạn có thể kiểm tra trạng thái xem xét trên trang này.\n\n⚠️ Nếu xóa bài trong vòng 24 giờ sau khi chia sẻ, điểm sẽ bị thu hồi.\n\nĐã gửi để xem xét!',
        clipboardCopied: '✅ Đã sao chép vào clipboard!\n\nCác bước tiếp theo:\n1️⃣ Mở ứng dụng/web Facebook trực tiếp\n2️⃣ Chọn nhóm/dòng thời gian/trang\n3️⃣ Dán và đăng với cài đặt công khai\n4️⃣ Sao chép link bài đăng và quay lại đây',
      },
      shareContent: {
        expectedEarnings: '💰 Thu nhập dự kiến:',
        company: '📍 Công ty:',
        deadline: '⏰ Hạn chót:',
        viewDetails: '📱 Xem chi tiết:',
        step: 'Bước',
        stepBadge1: 'Bước 1',
        stepBadge4: 'Bước 4',
        placeholder: 'https://www.facebook.com/... (nhóm/dòng thời gian/trang đều OK)',
        linkCopyMethod: '💡 Cách sao chép link: Nhấp vào "..." ở góc trên bên phải bài đăng Facebook → "Sao chép link"',
        fakeWarning: '⚠️ Gửi link giả có thể dẫn đến tài khoản bị đình chỉ',
        manualShareNote: '💡 Mở Facebook trực tiếp và chọn nhóm/dòng thời gian/trang để chia sẻ',
      },
      viewAllShares: 'Xem tất cả lịch sử chia sẻ →',
      shareButtonDesc: 'Nhóm/Dòng thời gian/Trang đều OK →',
      browseMoreCampaigns: 'Xem thêm chiến dịch khác →',
      dailyShareLimitText: 'Tối đa {max} chiến dịch/ngày (hôm nay: {current}/{max})',
      importantNotesTitle: '⚠️ Lưu ý quan trọng',
      importantNote1: '• Hãy kiểm tra hợp đồng trước khi thanh toán',
      importantNote2: '• Sau khi thanh toán, cả hai bên phải xác nhận "Hoàn tất" trên nền tảng mới chuyển sang bước tiếp theo',
      importantNote3: '• Khi phát sinh tranh chấp, nền tảng chỉ cung cấp hỗ trợ trung gian, trách nhiệm thanh toán thuộc về các bên',
      importantNote4: '• Khuyến nghị dùng chuyển khoản ngân hàng hoặc ví điện tử chính thức để đảm bảo an toàn',
      competitionAlert: '💡 Các influencer khác cũng quan tâm đến chiến dịch này. Hãy nhanh tay ứng tuyển!',
      topSize: 'Áo',
      bottomSize: 'Quần',
    },
  },
  ko: {
    homepage: {
      loading: '로딩 중...',
      platformName: 'Exfluencer VN',
      tagline: '베트남 #1 인플루언서 매칭 플랫폼',
      kols: '오픈 캠페인',
      brands: '수수료율',
      campaigns: '최소 팔로워',
      freeSignup: '✅ 무료 가입 & 수수료 0원',
      fastMatching: '⚡ 24시간 빠른 매칭',
      securePayment: '📊 실시간 성과 추적',
      howToStart: '어떻게 시작하시겠어요?',
      influencerRole: '인플루언서 / KOL',
      influencerDesc: '캠페인을 찾고 콘텐츠로 수익을 창출하세요',
      avgMonthlyEarning: '월 평균 500만 VND',
      free: '무료',
      activeCampaigns: '1000+ 활성 캠페인',
      advertiserRole: '광고주 / 브랜드',
      advertiserDesc: '검증된 KOL을 찾고 브랜드를 성장시키세요',
      avgROI: '평균 ROI 300%',
      verifiedKOL: '검증된 KOL',
      realtimeAnalysis: '실시간 분석',
      startNowFree: '🚀 지금 시작하기 - 완전 무료',
      signupText: '회원가입',
      loginText: '로그인',
      agreeToTerms: '가입하시면',
      termsLink: '서비스 약관',
      privacyLink: '개인정보 보호정책',
      adminLogin: '🔐 관리자 로그인',
      and: '및',
      agreeBySigningUp: '에 동의하게 됩니다',
      // How It Works
      howItWorksTitle: '이용 방법',
      step1Title: '1. 무료 회원가입',
      step1Desc: '2분 안에 계정을 만드세요. 인플루언서 또는 광고주 중 선택하세요.',
      step2Title: '2. 검색 & 연결',
      step2Desc: '인플루언서는 적합한 캠페인을 찾고, 광고주는 검증된 KOL을 실제 데이터로 찾습니다.',
      step3Title: '3. 협업 & 수익 창출',
      step3Desc: '캠페인을 완료하고 안전한 결제를 받으세요. 플랫폼에서 함께 성장하세요.',
      // For Influencers
      forInfluencersTitle: '인플루언서를 위한',
      influencerBenefit1Title: '💰 안정적인 수입',
      influencerBenefit1Desc: '수천 개의 다양한 캠페인으로 콘텐츠에서 수익을 창출하세요. 수수료 0%, 빠른 출금.',
      influencerBenefit2Title: '🤝 대형 브랜드와 협업',
      influencerBenefit2Desc: '베트남 내 신뢰할 수 있는 브랜드와 연결하세요. 고품질 파트너 포트폴리오를 구축하세요.',
      influencerBenefit3Title: '📊 전문 분석 도구',
      influencerBenefit3Desc: '성과, 성장 및 수익을 추적하세요. 콘텐츠 전략을 최적화하세요.',
      influencerBenefit4Title: '🎓 지원 & 교육',
      influencerBenefit4Desc: '전문 가이드, 팁 & 트릭을 최고 KOL로부터 받으세요. 지속적인 스킬 개발.',
      // For Advertisers
      forAdvertisersTitle: '광고주를 위한',
      advertiserBenefit1Title: '🎯 정확한 KOL 찾기',
      advertiserBenefit1Desc: 'AI 시스템이 브랜드에 맞는 KOL을 찾아드립니다. 니치, 참여도, 가격으로 필터링.',
      advertiserBenefit2Title: '✅ 검증된 KOL',
      advertiserBenefit2Desc: '모든 KOL은 철저히 검증됩니다. 실제 팔로워 데이터, 가짜 없음, 봇 없음.',
      advertiserBenefit3Title: '📈 투명한 ROI',
      advertiserBenefit3Desc: '실시간으로 캠페인 효과를 추적하세요. 도달률, 참여도, 전환율 상세 보고서.',
      advertiserBenefit4Title: '💳 안전한 결제',
      advertiserBenefit4Desc: '에스크로 시스템으로 예산을 보호합니다. 캠페인이 요구사항대로 완료될 때만 결제.',
      // Success Stats
      successStatsTitle: 'Exfluencer VN과 함께한 성공',
      stat1Value: '95%',
      stat1Label: '캠페인 완료율',
      stat2Value: '2시간',
      stat2Label: '평균 응답 시간',
      stat3Value: '300%',
      stat3Label: '평균 ROI',
      stat4Value: '200+',
      stat4Label: '완료된 캠페인',
      // Platforms
      platformsTitle: '모든 주요 플랫폼 지원',
      platformsSubtitle: 'Instagram, TikTok, YouTube, Facebook - 하나의 플랫폼에서 모두',
      // Final CTA
      readyToStart: '당신의 여정을 시작할 준비가 되셨나요?',
      joinNow: '지금 참여하기 - 100% 무료',
    },
    auth: {
      login: {
        title: '로그인',
        welcomeBack: '다시 오신 것을 환영합니다',
        continueLogin: '계속하려면 로그인하세요',
        quickDemo: '빠른 데모 체험 (Quick Demo)',
        languageInfo: '한국어',
        email: '이메일',
        password: '비밀번호',
        rememberMe: '자동 로그인',
        findEmail: '이메일 찾기',
        forgotPassword: '비밀번호를 잊으셨나요?',
        loggingIn: '로그인 중...',
        loginButton: '로그인',
        noAccount: '계정이 없으신가요?',
        signupNow: '지금 가입',
      },
      register: {
        title: '회원가입',
        selectRole: '계정 유형을 선택하세요',
        createAccount: '새 계정 만들기',
        name: '이름',
        email: '이메일',
        phone: '전화번호',
        zalo: 'Zalo ID (선택사항)',
        password: '비밀번호',
        confirmPassword: '비밀번호 확인',
        company: '회사명',
        companyPlaceholder: '회사명을 입력하세요',
        agreeToTerms: '동의합니다',
        and: '및',
        termsOfService: '서비스 약관',
        privacyPolicy: '개인정보 보호정책',
        signupButton: '계정 만들기',
        alreadyHaveAccount: '이미 계정이 있으신가요?',
        loginNow: '지금 로그인',
        passwordRequirements: '비밀번호 요구사항:',
        passwordMinLength: '최소 8자',
        passwordUppercase: '대문자 1개 이상',
        passwordNumber: '숫자 1개 이상',
        passwordSpecial: '특수문자 1개 이상',
        passwordStrength: '비밀번호 강도:',
        weak: '약함',
        medium: '보통',
        strong: '강함',
        veryStrong: '매우 강함',
        emailInvalid: '유효하지 않은 이메일',
        passwordMismatch: '비밀번호가 일치하지 않습니다',
        phoneInvalid: '유효하지 않은 전화번호',
        influencerTitle: '인플루언서 KOL 회원가입',
        brandTitle: '광고주 Brand 회원가입',
        influencerSubtitle: '캠페인을 찾고 수익을 창출하세요 | Find campaigns & earn money',
        brandSubtitle: '인플루언서를 찾고 브랜드를 홍보하세요 | Find KOLs & grow your brand',
        quickSignup: '빠른 가입 Quick signup',
        orEmail: '또는 이메일로 or email',
        emailPlaceholder: 'your@email.com',
        passwordPlaceholder: '8자 이상',
        confirmPasswordPlaceholder: '비밀번호 재입력',
        namePlaceholder: '홍길동',
        phonePlaceholder: '+84 90 123 4567',
        zaloPlaceholder: '+84 90 123 4567 (베트남 번호 VN number)',
        zaloLabel: 'Zalo * (베트남 메신저)',
        zaloHint: '💡 베트남에서 가장 인기 있는 메신저입니다',
        facebookPlaceholder: 'fb.com/yourname',
        signingUp: '가입 중...',
        errors: {
          emailRequired: '이메일을 입력해주세요',
          emailInvalid: '올바른 이메일 형식이 아닙니다',
          passwordRequired: '비밀번호를 입력해주세요',
          passwordMinLength: '비밀번호는 8자 이상이어야 합니다',
          passwordMismatch: '비밀번호가 일치하지 않습니다',
          nameRequired: '이름을 입력해주세요',
          phoneRequired: '전화번호를 입력해주세요',
          zaloRequired: 'Zalo 번호를 입력해주세요',
          companyRequired: '회사명을 입력해주세요',
          termsRequired: '서비스 약관에 동의해주세요',
          privacyRequired: '개인정보 처리방침에 동의해주세요',
        },
      },
      forgotPassword: {
        title: '비밀번호 찾기',
        subtitle: '가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다',
        sending: '전송 중...',
        sendButton: '재설정 링크 보내기',
        successTitle: '이메일 전송 완료!',
        successMessage: '이메일을 확인하여 비밀번호를 재설정하세요.',
      },
      findEmail: {
        title: '이메일 찾기',
        subtitle: '가입 시 등록한 전화번호를 입력하세요',
        phoneHint: '회원가입 시 등록한 전화번호를 입력하세요',
        searching: '검색 중...',
        searchButton: '이메일 찾기',
        notFound: '해당 전화번호로 등록된 계정을 찾을 수 없습니다',
        foundTitle: '이메일을 찾았습니다!',
        foundMessage: '이 이메일로 로그인하세요',
      },
    },
    settings: {
      title: '설정',
      account: '계정',
      changePassword: '비밀번호 변경',
      changePasswordDesc: '보안을 위해 정기적으로 변경하세요',
      language: '언어',
      currentLanguage: '한국어',
      notifications: '알림',
      notificationsDesc: '푸시 알림 설정',
      privacy: '개인정보 보호',
      privacyDesc: '데이터 및 권한 관리',
      dangerZone: '위험 구역',
      deleteAccount: '계정 삭제',
      deleteAccountDesc: '모든 데이터가 영구적으로 삭제됩니다',
      passwordModal: {
        title: '비밀번호 변경',
        currentPassword: '현재 비밀번호',
        newPassword: '새 비밀번호',
        confirmPassword: '비밀번호 확인',
        cancel: '취소',
        change: '변경',
        currentPasswordPlaceholder: '현재 비밀번호 입력',
        newPasswordPlaceholder: '새 비밀번호 입력',
        confirmPasswordPlaceholder: '새 비밀번호 다시 입력',
        success: '비밀번호가 변경되었습니다',
      },
      languageModal: {
        title: '언어 선택',
        korean: '한국어',
        vietnamese: 'Tiếng Việt',
        english: 'English',
        cancel: '취소',
        confirm: '확인',
      },
      deleteModal: {
        title: '계정 삭제',
        warning: '정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        confirmText: '"DELETE"를 입력하여 확인',
        typeDelete: 'DELETE 입력',
        cancel: '취소',
        delete: '계정 삭제',
        success: '계정이 삭제되었습니다',
      },
    },
    help: {
      title: '도움말',
      customerSupport: '고객 지원',
      customerSupportDesc: '궁금한 사항이 있으시면 언제든지 문의해주세요.',
      contactUs: '문의하기',
      faq: '자주 묻는 질문',
      faqQuestion1: '캠페인에 어떻게 지원하나요?',
      faqAnswer1: '캠페인 목록에서 관심있는 캠페인을 선택하고 "지원하기" 버튼을 클릭하세요.',
      faqQuestion2: '포인트는 어떻게 출금하나요?',
      faqAnswer2: '지갑 메뉴에서 출금을 선택하고 은행 계좌 정보를 입력하세요.',
      faqQuestion3: 'SNS 계정을 어떻게 연결하나요?',
      faqAnswer3: '프로필 페이지에서 SNS 섹션의 "연결" 버튼을 클릭하세요.',
    },
    shop: {
      title: '상점',
      pageTitle: '🛍️ 포인트 상점',
      myPoints: '내 포인트',
      myShoppingPoints: '내 쇼핑 포인트',
      availableItems: '사용 가능한 아이템',
      bestseller: '🔥 베스트셀러!',
      limitedEdition: '⭐ 한정판',
      soldOut: '품절',
      points: '포인트',
      buyNow: '지금 구매',
      exchangeTickets: '응모권 교환',
      confirmPurchase: '구매 확인',
      purchaseSuccess: '구매 성공!',
      insufficientPoints: '포인트가 부족합니다',
      hurryUp: '⚡ 서두르세요!',
      prizeValue: '상품 가치:',
      peopleEntering: '명이 지금 응모 중!',
      outOfStock: '🚫 품절 (Sold Out)',
      stockRemaining: '📦 재고',
      enterNow: '🎟️ 지금 응모하기!',
      buyNowButton: '🛒 구매하기',
      limitedTimeOffer: '🔥 한정 특가! 빨리 소진 중!',
      todaySpecial: '오늘만 특별 할인! 🎁',
      hurryBeforeClose: '⚡ 마감 전 서두르세요!',
      inviteFriends: '친구 초대',
      freeTickets: '응모권 무료!',
      ticketUnit: '응모권',
      ticketCountUnit: '장',
      detailView: '🇰🇷 자세히 보기 →',
      noProducts: '상품이 없습니다',
      infoTitle: '포인트 상점 안내',
      info1: '• 캠페인 완료 시 포인트 적립',
      info2: '• 출석 체크로 매일 포인트 획득',
      info3: '• 친구 추천으로 추가 포인트 획득',
      info4: '• 구매한 아이템은 즉시 적용됩니다',
      info5: '• 기프트 카드는 이메일로 전송됩니다',
      purchaseConfirmationTitle: '구매 확인',
      price: '가격',
      currentPoints: '보유 포인트',
      afterPurchaseBalance: '구매 후 잔액',
      cancel: '취소',
      ticketsAcquired: '응모권 획득',
      remaining: '남음',
      appliedImmediately: '아이템이 즉시 적용되었습니다!',
      alertInsufficientPoints: '⚠️ 포인트가 부족합니다!',
      alertRequired: '필요:',
      alertOwned: '보유:',
      alertOutOfStock: '⚠️ 재고가 없습니다!',
      alertPurchaseComplete: '구매 완료!',
      alertDeducted: '차감:',
      alertRemainingPoints: '남은 포인트:',
      alertRemainingStock: '남은 재고:',
      productCategories: {
        all: '전체',
        raffleTickets: '🎫 응모권',
        boost: '⚡ 부스트',
        feature: '⭐ 기능',
        gift: '🎁 기프트',
        vouchers: '상품권',
        merchandise: '굿즈',
        koreaDream: 'Korea Dream',
      },
      products: {
        koreaDream: {
          name: '🇰🇷 KOREA DREAM 응모권',
          description: '한국 뷰티 체험 여행 (왕복 항공 + 4박5일 + 시술 + 쇼핑)',
        },
        iphoneRaffle: {
          name: '📱 iPhone 15 Pro Max 응모권',
          description: '최신 아이폰 256GB (색상 선택 가능)',
        },
        macbookRaffle: {
          name: '💻 MacBook Pro M3 응모권',
          description: 'MacBook Pro 14인치 M3 칩 (512GB)',
        },
        cash10mRaffle: {
          name: '💰 현금 10M VND 응모권',
          description: '즉시 현금 입금 (세금 없음)',
        },
        giftcard500kRaffle: {
          name: '🎁 통합 기프트카드 500K',
          description: '스타벅스/CGV/쿠팡 선택 가능',
        },
        profileBoost: {
          name: '프로필 부스트 (7일)',
          description: '7일간 프로필을 상단에 노출시킵니다',
        },
        premiumBadge: {
          name: '프리미엄 배지 (30일)',
          description: '프로필에 프리미엄 인증 배지 표시',
        },
        prioritySupport: {
          name: '캠페인 우선 지원권',
          description: '캠페인 지원 시 최우선 검토',
        },
        starInfluencer: {
          name: '스타 인플루언서 등급',
          description: '30일간 스타 등급 혜택 제공',
        },
        profileHighlight: {
          name: '프로필 하이라이트',
          description: '검색 결과에서 하이라이트 표시',
        },
        starbucksGiftcard: {
          name: '스타벅스 기프트카드 50K',
          description: '스타벅스 5만원 기프트카드',
        },
      },
    },
    campaignFilters: {
      title: '필터',
      platform: '플랫폼',
      allPlatforms: '모든 플랫폼',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      category: '카테고리',
      allCategories: '모든 카테고리',
      beauty: '뷰티',
      fashion: '패션',
      food: '푸드',
      lifestyle: '라이프',
      tech: '테크',
      fitness: '피트니스',
      travel: '여행',
      gaming: '게임',
      education: '교육',
      entertainment: '엔터',
      health: '건강',
      home: '홈',
      type: '타입',
      allTypes: '모든 타입',
      product: '제품',
      visiting: '방문형',
      experience: '체험형',
      location: '위치',
      allLocations: '모든 위치',
      hanoi: '하노이',
      hoChiMinh: '호치민',
      danang: '다낭',
      budget: '예산',
      anyBudget: '모든 예산',
      under1M: '100만 미만',
      from1to3M: '100만~300만',
      from3to5M: '300만~500만',
      over5M: '500만 이상',
      specialConditions: '특수 조건',
      hasVehicle: '차량 보유',
      hasChildren: '자녀 있음',
      hasPets: '반려동물 있음',
      specificSkinType: '특정 피부 타입',
      specificClothingSize: '특정 사이즈',
      married: '기혼',
      single: '미혼',
      sortBy: '정렬',
      newest: '최신순',
      highestBudget: '높은 예산순',
      closingDeadline: '마감 임박순',
      mostMatching: '매칭률순',
      applyFilters: '필터 적용',
      resetFilters: '필터 초기화',
      eligibleOnly: '지원 가능한 캠페인만',
      eligibleOnlyDesc: '내 자격에 맞는 캠페인',
      locationPlaceholder: '예: 호치민, 하노이, 온라인',
      minBudget: '최소',
      maxBudget: '최대',
      budgetRange: '예산 범위 (VND)',
      campaignType: '캠페인 타입',
      cash: '💰 현금',
      points: '🛍️ 포인트',
      all: '전체',
      filtersApplied: '개 필터 적용 중',
      totalCampaigns: '개의 캠페인',
      noResults: '검색 결과가 없습니다',
      noResultsDesc: '선택한 필터 조건과 일치하는 캠페인이 없습니다. 다른 조건으로 다시 시도해보세요.',
      clickToView: '클릭하여 상세 보기',
      viewDetails: '상세보기',
      recommendedCampaigns: '당신을 위한 추천 캠페인',
      recommendationScore: '추천',
      applicationsCount: '명 지원',
      requirementsNotMet: '자격 요건 미달',
      vehicleRequired: '🚗 차량 소유 필수 캠페인',
      vehicleRequiredDesc: '(내 차량 없음)',
      childrenRequired: '👶 자녀 필수 캠페인',
      childrenRequiredDesc: '(내 자녀 없음)',
      petsRequired: '🐾 반려동물 필수 캠페인',
      petsRequiredDesc: '(내 반려동물 없음)',
      maritalStatusLabel: '💑 결혼 상태',
      noVehicle: '(내 차량 없음)',
      noChildren: '(내 자녀 없음)',
      noPets: '(내 반려동물 없음)',
    },
    metadata: {
      title: 'Exfluencer VN - 베트남 #1 인플루언서 마케팅 플랫폼',
      description: 'KOL과 브랜드를 연결합니다. 맞춤 캠페인을 찾고 콘텐츠로 수익을 창출하세요.',
      titleTemplate: '%s | Exfluencer VN',
    },
    common: {
      all: '전체',
      back: '뒤로',
      next: '다음',
      previous: '이전',
      skip: '건너뛰기',
      start: '시작하기',
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '수정',
      view: '보기',
      add: '추가',
      search: '검색',
      filter: '필터',
      loading: '로딩 중...',
      noData: '데이터가 없습니다',
      error: '오류가 발생했습니다',
      success: '성공',
      confirm: '확인',
      submit: '제출',
      sort: '정렬',
      justNow: '방금',
      minutesAgo: '분 전',
      hoursAgo: '시간 전',
      yesterday: '어제',
      daysAgo: '일 전',
      weeksAgo: '주일 전',
    },
    nav: {
      home: '홈',
      campaigns: '캠페인',
      shop: '가이드',
      favorites: '찜',
      messages: '메시지',
      stats: '통계',
      profile: '프로필',
      notifications: '알림',
      wallet: '지갑',
      ranking: '랭킹',
      analytics: '분석',
      kol: 'KOL',
    },
    campaign: {
      title: '캠페인',
      create: '캠페인 만들기',
      detail: '캠페인 상세',
      apply: '지원하기',
      eligible: '지원 가능',
      notEligible: '조건 미달',
      deadline: '마감일',
      budget: '예산',
      applicants: '지원자',
      matching: '매칭률',
      requirements: '요구사항',
      description: '설명',
      categories: '카테고리',
      platforms: '플랫폼',
      location: '위치',
      period: '기간',
      reward: '보상',
      status: {
        active: '진행중',
        completed: '완료',
        pending: '대기중',
        draft: '임시저장',
      },
      recommendedForYou: '추천 캠페인',
      whyRecommended: '추천 이유',
      matchingPercentage: '매칭률',
      eligibilityCheck: '지원 가능 여부',
      failureReasons: {
        followers: '팔로워 수 부족',
        engagement: '참여율 부족',
        platform: '플랫폼 불일치',
        location: '지역 불일치',
        vehicle: '차량 필요',
        parent: '자녀 필요',
        pet: '반려동물 필요',
        maritalStatus: '결혼 상태 불일치',
        skinType: '피부 타입 불일치',
        skinTone: '피부톤 불일치',
        clothingSize: '사이즈 불일치',
      },
    },
    influencer: {
      profile: '프로필',
      followers: '팔로워',
      engagement: '참여율',
      rating: '평점',
      completedCampaigns: '완료 캠페인',
      search: '인플루언서 검색',
      invite: '초대하기',
      portfolio: '포트폴리오',
    },
    advertiser: {
      brandAccount: '브랜드 계정',
      verifiedAdvertiser: '💼 인증된 광고주',
      verification: {
        title: '사업자 인증 신청',
        subtitle: '캠페인 등록을 위해 필요합니다',
        submitted: '인증 신청 완료',
        submittedMessage: '사업자 인증 신청이 접수되었습니다. 1-2 영업일 내에 검토 후 알려드리겠습니다.',
        email: '이메일',
        phone: '연락처',
        goToDashboard: '대시보드로 이동',
        whyNeeded: '왜 필요한가요?',
        whyNeededDesc: '사업자 인증은 인플루언서에게 신뢰를 제공하고, 결제 미지급 등의 사기를 방지하기 위해 필수입니다.',
        companyInfo: '회사 정보',
        companyName: '회사명',
        companyNameKo: '한국어 회사명',
        companyNameVi: '베트남어 회사명',
        businessRegNumber: '사업자 등록번호',
        taxCode: '세금 코드 (MST)',
        businessType: '사업자 형태',
        address: '사업장 주소',
        addressPlaceholder: '상세 주소 입력',
        legalRepresentative: '대표자명',
        legalRepresentativePlaceholder: '대표자 이름',
        contactInfo: '연락처 정보',
        emailLabel: '이메일',
        phoneLabel: '전화번호',
        documents: '서류 제출',
        businessLicense: '사업자등록증 이미지',
        businessLicenseNote: '📌 실제 서비스에서는 파일 업로드 기능을 사용합니다. 지금은 이미지 URL을 입력하세요.',
        cancel: '취소',
        submit: '인증 신청',
        required: '필수',
        businessTypes: {
          limitedCompany: '유한책임회사',
          jointStock: '주식회사',
          partnership: '합명회사',
          privateEnterprise: '개인사업자',
          householdBusiness: '가구 사업',
        },
      },
      influencerDetail: {
        influencers: '인플루언서',
        totalFollowers: '총 팔로워',
        allPlatforms: '전체 플랫폼 합계',
        avgFollowers: '평균 팔로워',
        perPlatform: '플랫폼당 평균',
        engagement: '참여율',
        avgViews: '평균 조회수',
        completedCampaigns: '완료 캠페인',
        rating: '평점',
        snsChannels: 'SNS 채널',
        channels: '개',
        engagementRate: '참여율',
        categories: '카테고리',
        reviews: '광고주 리뷰',
        reviewsCount: '개 리뷰',
        overallRating: '종합 평점',
        viewAll: '전체 보기',
        workStyle: '작업 스타일',
        basicInfo: '기본 정보',
        gender: '성별',
        male: '남성',
        female: '여성',
        age: '연령대',
        skinType: '피부 타입',
        skinTone: '피부 톤',
        lifestyleInfo: '생활 정보',
        maritalStatus: '결혼 여부',
        single: '미혼',
        married: '기혼',
        divorced: '이혼',
        preferNotToSay: '비공개',
        children: '자녀',
        yes: '예',
        no: '아니오',
        pets: '반려동물',
        dog: '강아지',
        cat: '고양이',
        bird: '새',
        fish: '물고기',
        other: '기타',
        hasVehicle: '차량 보유',
        languageEducation: '언어 & 교육',
        languages: '구사 언어',
        korean: '한국어',
        vietnamese: '베트남어',
        english: '영어',
        education: '학력',
        bachelor: '학사',
        master: '석사',
        phd: '박사',
        occupation: '직업',
        contentCreator: '콘텐츠 크리에이터',
        interests: '관심사',
        beauty: '뷰티',
        fashion: '패션',
        travel: '여행',
        food: '음식',
        fitness: '피트니스',
        lifestyle: '라이프스타일',
        smoker: '흡연',
        drinker: '음주',
        never: '안함',
        occasionally: '가끔',
        regularly: '자주',
        recentWorks: '최근 작업물',
        contentStyleCheck: '콘텐츠 스타일 확인용',
        contentStyleTip: '최근 작업물을 통해 인플루언서의 콘텐츠 스타일, 편집 퀄리티, 톤앤매너를 확인하세요',
        views: '조회수',
        contact: '제안하기',
        contactTitle: '캠페인 제안',
        contactMessage: '캠페인 상세 정보를 입력하고 인플루언서에게 제안을 보내세요.',
        sendProposal: '제안 보내기',
        proposalSent: '제안이 전송되었습니다!',
        campaignInfo: '캠페인 정보',
        brand: '브랜드',
        completedDate: '완료일',
        payment: '보상',
        deliverables: '제출물',
        results: '성과',
        likes: '좋아요',
        comments: '댓글',
        saves: '저장',
        close: '닫기',
        advertiserReview: '광고주 평가',
        wouldRecommend: '추천함',
        profilePagePreparing: '프로필 페이지',
      },
      profileEdit: {
        title: '프로필 수정',
        accountManagement: '기업 계정 정보 관리',
        accountManagementDesc: '정확한 정보 입력으로 신뢰도를 높이세요',
        logo: '회사 로고',
        uploadLogo: '로고 업로드',
        changeLogo: '로고 변경',
        logoNote: '권장: 정사각형 500x500px 이상, 최대 5MB (PNG, JPG)',
        basicInfo: '기본 정보',
        country: '국가',
        selectCountry: '국가를 선택하세요',
        countryNote: '회사가 등록된 국가를 선택하세요. 사업자 정보 양식이 국가에 맞게 조정됩니다.',
        other: '기타',
        companyName: '회사명 (상호)',
        companyNamePlaceholder: '주식회사 데모브랜드',
        ceoName: '대표자명',
        ceoNamePlaceholder: '홍길동',
        contactPerson: '담당자명',
        contactPersonPlaceholder: '김영희',
        businessInfo: '사업자 정보',
        businessRegNumber: '사업자 등록 번호 / Business Reg. No.',
        businessRegNumberPlaceholder: '한국: 123-45-67890 / 베트남: 0123456789',
        taxCode: '납세자 번호 / Tax ID',
        taxCodePlaceholder: '세금 식별 번호',
        businessType: '업종 / Business Type',
        businessTypePlaceholder: '도소매업, 제조업, 서비스업 등',
        businessCategory: '업태 / Business Category',
        businessCategoryPlaceholder: '패션/의류, 화장품, 식품 등',
        establishmentDate: '설립일',
        employeeCount: '직원 수',
        employeeCountPlaceholder: '예: 10-50명, 50-100명',
        capital: '자본금 (VND)',
        capitalPlaceholder: '1,000,000,000',
        businessLicense: '사업자 등록증',
        businessLicenseDesc: '사업자 등록증 스캔 본 또는 사진',
        ecommerceLicense: '통신판매업 신고증',
        ecommerceLicenseDesc: '온라인 판매업 신고증 (있는 경우)',
        otherDocuments: '기타 인증서',
        otherDocumentsDesc: '품질인증서, 특허증 등 추가 서류',
        selectFile: '파일 선택',
        changeFile: '파일 변경',
        removeDocument: '삭제',
        documentNote: '최대 10MB (PDF, JPG, PNG)',
        uploaded: '업로드됨',
        contactInfo: '연락처 정보',
        email: '이메일',
        emailPlaceholder: 'company@example.com',
        phone: '전화번호',
        phonePlaceholder: '+84 XXX XXX XXX',
        fax: '팩스',
        faxPlaceholder: '+84 28 XXXX XXXX',
        website: '웹사이트',
        websitePlaceholder: 'https://yourcompany.com',
        snsInfo: 'SNS 계정',
        facebook: 'Facebook',
        facebookPlaceholder: 'https://facebook.com/yourcompany',
        instagram: 'Instagram',
        instagramPlaceholder: 'https://instagram.com/yourcompany',
        tiktok: 'TikTok',
        tiktokPlaceholder: '@yourcompany',
        youtube: 'YouTube',
        youtubePlaceholder: 'https://youtube.com/@yourcompany',
        addressInfo: '주소 정보',
        address: '본사 주소',
        addressPlaceholder: '도로명 주소를 입력하세요',
        addressDetail: '상세 주소',
        addressDetailPlaceholder: '건물명, 층, 호수 등',
        companyIntro: '회사 소개',
        bio: '회사 소개',
        bioPlaceholder: '회사 소개를 상세히 입력하세요 (최대 500자)',
        saveChanges: '변경사항 저장',
        saving: '저장 중...',
        cancel: '취소',
        successTitle: '저장 완료',
        successMessage: '프로필이 성공적으로 업데이트되었습니다.',
        required: '필수',
        optional: '선택',
        imageOnly: '이미지 파일만 업로드 가능합니다.',
        maxFileSize: '파일 크기는',
        fileSizeError: '파일 크기는 5MB 이하여야 합니다.',
        allowedFileTypes: 'PDF, JPG, PNG 파일만 업로드 가능합니다.',
        fileTypeError: 'PDF, JPG, PNG 파일만 업로드 가능합니다.',
      },
      analytics: {
        overview: '개요',
        budget: '예산',
        roi: 'ROI',
        performance: '성과',
        totalSpent: '총 지출',
        totalBudget: '총 예산',
        avgCampaignBudget: '평균 캠페인 예산',
        totalReach: '총 도달',
        avgROI: '평균 ROI',
        totalInfluencers: '협업 인플루언서',
        activeCampaigns: '진행중 캠페인',
        completedCampaigns: '완료된 캠페인',
        budgetUtilization: '예산 사용률',
        topPerformingCampaigns: '최고 성과 캠페인',
        budgetAnalysis: '예산 분석',
        roiAnalysis: 'ROI 분석',
        roiDesc: '캠페인별 ROI 데이터가 여기에 표시됩니다. 실제 운영 시 상세한 ROI 분석 차트와 인사이트가 제공됩니다.',
        overallPerformance: '전체 성과',
        performanceDesc: '최고 성과 캠페인 순위가 여기에 표시됩니다. 실제 운영 시 조회수, 참여율, 전환율 등의 상세 지표가 제공됩니다.',
        dataInfo: '분석 데이터 안내',
        dataInfoDesc: '현재는 데모 데이터가 표시됩니다. 실제 운영 시에는 실시간 데이터와 상세한 분석 차트가 제공됩니다.',
      },
      campaigns: {
        createCampaign: '새 캠페인 만들기',
        search: '캠페인 검색...',
        all: '전체',
        active: '진행중',
        completed: '완료',
        draft: '임시저장',
        budget: '예산',
        budgetUsed: '사용',
        spent: '사용',
        applicants: '지원자',
        accepted: '승인',
        views: '조회수',
        deadline: '마감',
        noCampaigns: '캠페인이 없습니다',
        createFirst: '첫 번째 캠페인을 만들어보세요',
        viewDetails: '상세 정보 보기',
      },
      profile: {
        title: '프로필',
        businessAccount: '비즈니스 계정',
        businessSubtitle: '브랜드/기업 계정',
        verified: '인증됨',
        activityStats: '활동 통계',
        totalCampaigns: '전체 캠페인',
        activeCampaigns: '진행 중',
        completedCampaigns: '완료',
        totalBudget: '총 광고비',
        totalBudgetDesc: '총 광고 집행 금액',
        totalInfluencers: '협업 인플루언서',
        accountManagement: '기업 계정 관리',
        editProfile: '프로필 수정',
        verification: '사업자 인증',
        verificationDesc: '신뢰도 향상',
        settings: '설정',
        logout: '로그아웃',
        memberSince: '가입일',
        snsChannels: 'SNS 채널',
      },
    },
    analyticsPage: {
      title: '통계',
      performanceAnalytics: '📊 성과 분석',
      trackActivity: '나의 활동 통계를 확인하세요',
      thisMonth: '이번 달',
      totalStats: '전체 통계',
      recentCampaigns: '최근 캠페인',
      campaigns: '캠페인',
      earnings: '수익',
      views: '조회수',
      engagement: '참여율',
      totalCampaigns: '총 캠페인',
      totalEarnings: '총 수익',
      followers: '팔로워',
      avgRating: '평균 평점',
      completed: '완료',
    },
    profile: {
      basic: '기본 정보',
      demographic: '인구통계',
      lifestyle: '라이프스타일',
      beauty: '뷰티 정보',
      completion: '완성도',
      edit: '프로필 수정',
      completionPercentage: '프로필 완성도',
      missingFields: '미완성 항목',
      name: '이름',
      email: '이메일',
      phone: '전화번호',
      bio: '소개',
      zaloDescription: '베트남에서 주로 사용하는 Zalo 연락처를 입력해주세요',
      socialMediaUrls: 'SNS URL',
      followerCount: '팔로워 수',
      subscriberCount: '구독자 수',
      lastUpdated: '마지막 업데이트',
      gender: '성별',
      selectOption: '선택',
      male: '남성',
      female: '여성',
      other: '기타',
      any: '무관',
      ageRange: '연령대',
      years: '세',
      yearsAndAbove: '세 이상',
      location: '지역',
      hasVehicle: '차량 소유',
      parentingInfo: '육아 정보',
      hasChildren: '육아 중입니다',
      fashionInfo: '패션 정보',
      foodInfo: '음식 정보',
      fitnessInfo: '피트니스 정보',
      petInfo: '반려동물 정보',
      hasPets: '반려동물을 키우고 있습니다',
      techGadgets: '기술/가젯',
      hobbiesInterests: '취미 & 관심사',
      whyDetailedInfo: '왜 이렇게 많은 정보가 필요한가요?',
      detailedInfoBenefit: '상세한 프로필 정보는 캠페인 매칭의 정확도를 높여줍니다',
      infoExample1: '육아템 → 자녀 연령 맞춤',
      infoExample2: '자동차 용품 → 차량 소유자',
      infoExample3: '명품/프리미엄 → 소득 수준',
      infoExample4: '인테리어 → 자가 소유자',
      infoExample5: '의류 협찬 → 정확한 사이즈',
      accurateInfoBenefit: '더 정확한 정보 = 더 많은 맞춤 캠페인!',
      saveChanges: '변경사항 저장',
      profileUpdated: '프로필이 업데이트되었습니다',
      // Field labels
      profilePhoto: '프로필 사진',
      introduction: '소개',
      maritalStatus: '결혼 여부',
      education: '학력',
      occupation: '직업',
      housingType: '주거 형태',
      childrenStatus: '자녀 여부',
      petStatus: '반려동물 여부',
      vehicleOwnership: '차량 소유 여부',
      hobbies: '취미',
      skinType: '피부 타입',
      skinTone: '피부 톤',
      hairType: '헤어 타입',
      smartphoneModel: '스마트폰 모델',
      smartDevices: '스마트 기기',
      instagramConnection: '인스타그램 연동',
      tiktokConnection: '틱톡 연동',
      youtubeConnection: '유튜브 연동',
      facebookConnection: '페이스북 연동',
      // Marital status values
      single: '미혼',
      married: '기혼',
      divorced: '이혼',
      widowed: '사별',
      // Education values
      bachelor: '학사',
      master: '석사',
      doctorate: '박사',
      // Housing type values
      apartment: '아파트',
      house: '단독주택',
      villa: '빌라',
      studio: '원룸',
      sharedHouse: '공유주택',
      dormitory: '기숙사',
      // Children values
      noChildren: '없음',
      oneChild: '1명',
      twoChildren: '2명',
      threeOrMoreChildren: '3명 이상',
      // Pet values
      noPets: '없음',
      dog: '강아지',
      cat: '고양이',
      bird: '새',
      fish: '물고기',
      otherPet: '기타',
      // Vehicle values
      noVehicle: '없음',
      sedan: '세단',
      suv: 'SUV',
      truck: '트럭',
      electricCar: '전기차',
      hybrid: '하이브리드',
      motorcycle: '오토바이',
      scooter: '스쿠터',
      // Skin type values
      drySkin: '건성',
      oilySkin: '지성',
      combinationSkin: '복합성',
      sensitiveSkin: '민감성',
      normalSkin: '중성',
      // Skin tone values
      veryFair: '매우 밝음',
      fair: '밝음',
      medium: '중간',
      tan: '어두움',
      dark: '매우 어두움',
      // Hair type values
      straightHair: '직모',
      wavyHair: '웨이브',
      curlyHair: '곱슬',
      coilyHair: '반곱슬',
      // UI Messages
      itemsCompleted: '항목 완료',
      completeProfileForMore: '프로필을 완성하면 더 많은 기회를!',
      higherCompletionBetterMatching: '완성도가 높을수록 캠페인 매칭률이 올라가고, 광고주에게 우선 노출됩니다.',
      perfectProfile: '완벽한 프로필입니다! 🎉',
      allInfoCompleted: '모든 정보가 입력되어 최고의 매칭률을 보장받습니다.',
      viewMissingItems: '미입력 항목 {count}개 보기',
      viewEarnings: 'Xem thu nhập →',
      averageRating: 'Đánh giá TB',
      viewReviews: 'Xem đánh giá →',
      snsShareBonus: 'SNS 공유 보너스',
      pendingReview: '{count}개 검토 대기중',
      pointsAfterApproval: '승인 후 포인트 적립',
      snsConnected: 'SNS 연결됨',
      verified: '인증됨',
      followers: ' 팔로워',
      connected: '연결됨',
      connect: '연결',
      // Section titles
      detailedProfile: '상세 프로필',
      basicInfo: '기본 정보',
      lifestyleInfo: '라이프스타일',
      beautyInfo: '뷰티 정보',
      techGadgetsInfo: '기술/가젯',
      hobbiesInterestsInfo: '취미 & 관심사',
      rewardsBenefits: '리워드 & 혜택',
      myActivities: '내 활동',
      accountSettings: '계정 설정',
      support: '지원',
      // Cards and links
      inviteAdvertiser: '광고주 초대하기',
      inviteAdvertiserDesc: '초대 1명당 최대 100K VND!',
      attendanceCheck: '출석 체크',
      attendanceCheckDesc: '매일 포인트 받기',
      inviteFriends: '친구 초대',
      inviteFriendsDesc: '추천 코드로 포인트 획득',
      pointsShop: '포인트 상점',
      pointsShopDesc: '포인트로 아이템 구매',
      myCampaigns: '내 캠페인',
      myCampaignsDesc: '전체 캠페인 진행 상태 확인',
      completedCampaigns: '완료한 캠페인',
      completedCampaignsDesc: '수익 내역 및 이력 확인',
      inProgressWork: '진행 중인 작업',
      inProgressWorkDesc: '현재 진행 중인 캠페인',
      favoriteCampaigns: '찜한 캠페인',
      favoriteCampaignsDesc: '관심있는 캠페인 모아보기',
      myRaffleTickets: '내 응모권',
      myRaffleTicketsDesc: '응모한 이벤트 및 당첨 확률',
      messages: '메시지',
      messagesDesc: '광고주와 대화하기',
      myRanking: '내 랭킹',
      myRankingDesc: '실시간 순위 확인',
      wallet: '지갑',
      walletDesc: '포인트 및 출금',
      statistics: '통계',
      statisticsDesc: '수익 및 성과',
      portfolio: '포트폴리오',
      portfolioDesc: '작업 결과물',
      notificationSettings: '알림 설정',
      notificationSettingsDesc: '알림 관리',
      settings: '설정',
      settingsDesc: '계정 및 보안',
      help: '도움말',
      termsOfService: '서비스 약관',
      privacyPolicy: '개인정보 보호정책',
      logout: '로그아웃',
    },
    avatarUpload: {
      changePhoto: '사진 변경',
      uploadPhoto: '사진 업로드',
      uploadProfilePhoto: '프로필 사진 업로드',
      cancel: '취소',
    },
    imageUpload: {
      imageFilesOnly: '이미지 파일만 업로드할 수 있습니다.',
      fileSizeLimit: '파일 크기는 {maxSizeMB}MB 이하여야 합니다.',
      dropImage: '이미지를 놓으세요',
      uploadImage: '이미지를 업로드하세요',
      dragDropOrClick: '드래그 앤 드롭 또는 클릭하여 선택',
    },
    notification: {
      title: '알림',
      unread: '안 읽음',
      all: '전체',
      markAllRead: '모두 읽음',
      settings: '알림 설정',
      types: {
        campaignMatch: '새 캠페인 매칭',
        deadline: '마감 임박',
        accepted: '지원 승인',
        rejected: '지원 거절',
        payment: '결제 완료',
      },
    },
    wallet: {
      title: '지갑',
      balance: '잔액',
      withdraw: '출금',
      history: '내역',
      pending: '대기중',
      completed: '완료',
      cashPoints: '현금 포인트',
      shoppingPoints: '쇼핑 포인트',
      withdrawalRequest: '출금 요청',
      availableBalance: '출금 가능 금액',
      withdrawalAmount: '출금 금액',
      allAmount: '전액',
      minimumWithdrawalError: '최소 출금 금액은',
      minimumWithdrawalErrorSuffix: '입니다.',
      exceededBalanceError: '출금 가능 금액을 초과했습니다.',
      withdrawalAccount: '출금 계좌',
      defaultAccount: '기본',
      withdrawalSummary: '출금 요약',
      requestedAmount: '요청 금액',
      fee: '수수료',
      actualDeposit: '실제 입금액',
      withdrawalGuide: '출금 안내',
      minimumWithdrawal: '최소 출금 금액',
      withdrawalFee: '출금 수수료',
      minimum: '최소',
      processingTime: '처리 시간',
      processingDays: '영업일 기준 1-3일',
      noCancellation: '출금 요청 후에는 취소가 불가능합니다',
      confirmWithdrawal: '출금 요청 확인',
      depositAccount: '입금 계좌',
      confirmWarning: '출금 요청 후에는 취소가 불가능합니다. 정보를 확인해주세요.',
      withdrawalSuccess: '출금 요청이 완료되었습니다!\n처리까지 영업일 기준 1-3일 소요됩니다.',
      registeredAccounts: '등록된 계좌',
      earnHow: '🎁 포인트 획득 방법',
      pointsUsageGuide: '💡 포인트 사용 안내',
      earnCampaignBonus: '캠페인 완료 시 포인트 보너스',
      earnDailyCheckIn: '매일 출석 체크 (최대 10K SP/일)',
      earnReferral: '친구 초대 (1명당 50K SP)',
      earnSNSShare: 'SNS 공유 (캠페인당 최대 20K SP)',
      earning: '수익',
      credited: '적립',
      spending: '사용',
      withdrawal: '출금',
      recentTransactions: '최근 거래',
      minimumWithdrawalAmount: '최소 출금 금액: 100,000 VND',
      withdrawalFeeRate: '출금 수수료: 2% (최소 10,000 VND)',
      processingTimeDays: '처리 시간: 영업일 기준 1-3일',
      pointsInstantCredit: '포인트는 즉시 적립되어 사용 가능합니다',
      pointsNoWithdrawal: '출금이 불가능하며, 상점에서만 사용 가능합니다',
      pointsShopOnly: '응모권, 부스트, 기프트 등 구매 시 사용됩니다',
      pointsExpiryPeriod: '유효기간: 적립일로부터 1년',
    },
    review: {
      title: '리뷰',
      write: '리뷰 작성',
      rating: '평점',
      comment: '코멘트',
      submit: '리뷰 제출',
      professionalism: '전문성',
      punctuality: '일정 준수',
      communication: '소통',
      creativity: '창의성',
      performance: '성과',
      overallRating: '종합 평점',
      reviewsCount: '개의 리뷰',
      categoryRatings: '평가 항목별 점수',
      allReviews: '전체 리뷰',
      helpful: '도움됨',
    },
    portfolio: {
      title: '내 포트폴리오',
      addNew: '새로 추가',
      statistics: '전체 성과 통계',
      totalViews: '총 조회수',
      totalLikes: '총 좋아요',
      avgEngagement: '평균 참여율',
      avgRating: '평균 평점',
      filterAll: '✨ 전체',
      emptyState: '포트폴리오가 없습니다',
      emptyStateDesc: '캠페인을 완료하면 자동으로 추가됩니다',
      viewContent: '보기',
    },
    messages: {
      title: '메시지',
      search: '대화 검색...',
      allMessages: '✨ 전체',
      unread: '📬 읽지 않음',
      brands: '💼 광고주',
      support: '🛟 고객지원',
      noMessages: '메시지가 없습니다',
      noMessagesDesc: '캠페인에 지원하면 광고주와 대화할 수 있습니다',
      typeMessage: '메시지를 입력하세요...',
      quickReply1: '네, 관심 있습니다!',
      quickReply2: '샘플 받고 싶어요',
      quickReply3: '언제 시작하나요?',
      quickReply4: '예산이 어떻게 되나요?',
      gallery: '갤러리',
      camera: '카메라',
      file: '파일',
      viewCampaign: '캠페인 보기',
    },
    onboarding: {
      welcome: {
        title: '👋 Exfluencer VN에 오신 것을 환영합니다!',
        description: '베트남 최고의 인플루언서 마케팅 플랫폼입니다. 간단한 튜토리얼로 시작해볼까요?',
      },
      campaigns: {
        title: '🎯 캠페인 찾기',
        description: '다양한 브랜드의 캠페인을 찾을 수 있습니다. 카테고리, 플랫폼, 예산별로 필터링하세요!',
      },
      eligibility: {
        title: '✓ 자격 요건 체크',
        description: '각 캠페인 카드에 지원 가능 여부가 표시됩니다. 녹색 배지가 있으면 바로 지원하세요!',
      },
      timeline: {
        title: '📊 진행 상황 타임라인',
        description: '진행 중인 캠페인 단계를 확인하세요. 지원 → 승인 → 진행 → 제출 → 검토 → 완료.',
      },
      revenue: {
        title: '💰 월간 수익 대시보드',
        description: '이번 달 예상 수익과 완료된 캠페인 보상을 확인하세요. 수익 트렌드도 한눈에!',
      },
      portfolio: {
        title: '⭐ 포트폴리오',
        description: '완료한 캠페인을 포트폴리오로 관리하세요. 성과 지표와 브랜드 평가로 신뢰도 UP!',
      },
      messages: {
        title: '💬 메시징',
        description: '광고주와 실시간 소통하세요. 캠페인 세부사항을 논의하고 협업하세요!',
      },
      notifications: {
        title: '🔔 알림',
        description: '캠페인 승인, 결제 완료, 메시지 등 중요한 업데이트를 놓치지 마세요!',
      },
      wallet: {
        title: '💳 지갑 & 포인트',
        description: '캠페인 보상을 확인하고 출금하세요. 현금과 쇼핑 포인트를 관리하세요!',
      },
      complete: {
        title: '🎉 준비 완료!',
        description: '모든 준비가 끝났습니다! 지금 바로 캠페인을 찾아 인플루언서 활동을 시작하세요.',
      },
      step: '단계',
      completed: '완료',
      skipTutorial: '튜토리얼 건너뛰기',
      features: {
        campaign: '캠페인',
        revenue: '수익',
        portfolio: '포트폴리오',
        messages: '메시징',
        notifications: '알림',
        wallet: '지갑',
      },
    },
    koreaDream: {
      title: 'KOREA DREAM',
      subtitle: '한국 뷰티 체험 여행',
      winnersTitle: '🎉 지난 시즌 당첨자 후기',
      winnersDesc: '실제로 한국에 다녀온 당첨자들의 생생한 후기를 확인하세요!',
      season: '시즌',
      verified: '인증됨',
      photos: '장의 인증 사진',
      callToAction: 'Season 1 당첨자도 당신이 될 수 있습니다!',
      exchangeTickets: '지금 응모권 교환하기',
      buyNow: '지금 구매하기',
      confirmPurchase: '구매 확정하기',
      bestseller: '🔥 베스트 인기!',
      flightAndHotel: '✈️ 왕복 항공 + 🏨 4박5일 숙박',
      beautyAndShopping: '💉 뷰티 시술 + 🛍️ 쇼핑 지원금',
      totalValue: '총 가치: 50,000,000 VND (2인)',
      targetGoal: '목표 응모권',
      ticketsUnit: '장',
      progressText: '78.4% 달성 - 목표까지 21,568장!',
      myTickets: '내 응모권',
      koreanBeautyExperience: '한국 뷰티 체험 50M VND (2인)',
      targetTickets: '목표 응모권',
      ticketProgress: '78,432 / 100,000장',
      // Prize details
      roundTripFlight: '왕복 항공권',
      fourStarHotel: '4성급 호텔',
      beautyTreatment: '뷰티 시술',
      shoppingCredit: '쇼핑 지원금',
      brandSponsorship: '제품 협찬',
      roundTripFlightDetail: '베트남 ↔ 인천 (2인)',
      fourStarHotelDetail: '4박 숙박 (조식 포함)',
      beautyTreatmentDetail: '물광주사/레이저/보톡스 택2',
      shoppingCreditDetail: '올리브영 상품권',
      brandSponsorshipDetail: '뷰티 브랜드 선물 세트',
      roundTripFlightValue: '15,000,000 VND',
      fourStarHotelValue: '8,000,000 VND',
      beautyTreatmentValue: '10,000,000 VND',
      shoppingCreditValue: '2,000,000 VND',
      brandSponsorshipValue: '5,000,000 VND',
      // Progress section
      liveStatus: 'LIVE',
      realtimeProgress: '🎯 실시간 진행 현황',
      currentProgress: '현재 진행률',
      collectedTickets: '모인 응모권',
      remainingQuantity: '남은 수량',
      participants: '참여자',
      remainingToTarget: '목표까지 {count}장 남았어요!',
      drawingIn7Days: '목표 달성 시 7일 내 추첨 진행',
      // My tickets
      estimatedWinChance: '예상 당첨 확률',
      currentRank: '현재 순위',
      noTicketsYet: '아직 응모권이 없습니다',
      exchangeTicketsNow: '응모권 교환하기 →',
      // Prize composition
      prizeComposition: '🎁 상품 구성',
      professionalGuide: '전문 가이드, 전용 차량, 콘텐츠 촬영, 전 일정 식사 포함',
      // Exchange section
      ticketExchange: '🎟️ 응모권 교환',
      myPoints: '내 포인트:',
      exchangeRate: '교환 비율',
      basicExchangeRate: '100,000 SP = 1장',
      bulkBonusInfo: '💡 대량 교환 시 보너스 응모권 제공! (최대 60% 할인)',
      basic: '기본',
      bonus: '+ 보너스',
      total: '= 총',
      perTicket: '장당',
      discount: '할인',
      warning: '주의사항',
      warningLine1: '교환한 포인트는 출금할 수 없습니다',
      warningLine2: '응모권은 환불/취소가 불가합니다',
      warningLine3: '목표 미달성 시 응모권은 다음 달로 이월됩니다',
      // Ranking
      rankingTop5: '🏆 응모권 랭킹 TOP 5',
      tickets: '장',
      winProbability: '당첨 확률',
      viewAllRanking: '전체 랭킹 보기 →',
      // Earn points
      howToEarnPoints: '💡 쇼핑 포인트 모으는 법',
      dailyAttendance: '출석 체크',
      inviteFriends: '친구 초대',
      shareCampaign: '캠페인 공유',
      completeMission: '미션 완료',
      dailyPoints: '매일 1,000 SP',
      invitePoints: '30,000 SP',
      sharePoints: '2,000~5,000 SP',
      missionPoints: '10,000+ SP',
      // CTA
      seeYouInKorea: '한국에서 만나요!',
      moreTicketsMoreChance: '응모권이 많을수록 당첨 확률이 높아집니다.',
      collectPointsNow: '지금 바로 포인트를 모아 응모권을 교환하세요!',
      // Exchange modal
      confirmExchange: '응모권 교환 확인',
      pointsToUse: '사용할 포인트',
      basicTickets: '기본 응모권',
      bonusTickets: '보너스 응모권',
      totalTicketsReceived: '총 획득 응모권',
      exchangeWarningModal: '⚠️ 교환한 포인트는 출금할 수 없으며, 응모권은 환불/취소가 불가합니다.',
      cancel: '취소',
      // Alerts
      insufficientPoints: '쇼핑 포인트가 부족합니다!',
      exchangeSuccessMessage: '✅ {count}장 응모권 교환 완료!',
      pointsUsed: '사용한 포인트',
      ticketsReceived: '획득 응모권',
      bonusIncluded: '보너스 포함',
    },
    winners: {
      title: '당첨자 후기',
      subtitle: '한국 여행을 다녀온 분들의 실제 후기',
      seasonLabel: '시즌',
      winnerLabel: '당첨자',
      youCouldBeNext: 'Season 1 당첨자도 당신이 될 수 있습니다!',
    },
    dashboard: {
      cashAvailable: '사용 가능 현금',
      withdrawable: '출금 가능',
      tapToWithdraw: '탭하여 출금 →',
      shoppingPoints: '쇼핑 포인트',
      useInShop: '상점에서 사용',
      tapToShop: '탭하여 쇼핑 →',
      totalEarnings: '총 수익',
      completedCampaigns: '완료한 캠페인',
      inProgress: '진행 중',
      myTickets: '내 응모권',
      checkDetails: '자세히 보기',
      recentActivities: '최근 활동',
      viewAll: '전체 보기',
      noCampaigns: '캠페인이 없습니다',
      findCampaigns: '캠페인 찾기',
      overview: '개요',
      campaigns: '캠페인',
      followers: '팔로워',
      engagementRate: '참여율',
      pendingAmount: '보류 중',
      campaignEarnings: '캠페인 수익',
      platformBonus: '플랫폼 보너스',
      convertToTickets: '응모권으로 전환 가능',
      totalShoppingPoints: '총 쇼핑 포인트',
      pendingApproval: '승인 대기',
      applicationHistory: '신청 내역',
      ticketsCount: '장',
      inProgressCampaignsTitle: '진행 중인 캠페인',
      daysLeft: '일 남음',
      monthlyEarnings: '이번 달 수익 현황',
      completedAndPaid: '완료 & 지급',
      inProgressExpected: '진행 중 (예상)',
      waitingStatus: '대기 중',
      expectedTotalEarnings: '예상 총 수익',
      monthlyTrend: '월별 수익 추이',
      lastSixMonths: '최근 6개월',
      september: '9월',
      october: '10월',
      november: '11월',
      december: '12월',
      january: '1월',
      february: '2월',
      snsSharingBonus: 'SNS 공유 보너스 (쇼핑 포인트)',
      campaignsShared: '개 캠페인 공유 완료',
      viewHistory: '내역 보기',
      pointsShop: '포인트 상점',
      buyWithPoints: '포인트로 응모권, 기프트 구매!',
      myShoppingPoints: '내 쇼핑 포인트',
      koreaTicket: '응모권',
      giftCard: '기프트카드',
      premium: '프리미엄',
      shopNow: '지금 바로 쇼핑하기',
      growthAndRewards: '성장 & 리워드',
      attendanceCheck: '출석 체크',
      consecutiveDays: '연속',
      canEarn: '획득 가능',
      ranking: '랭킹',
      rankingPosition: '위',
      topReward: '보상',
      inviteFriends: '친구 초대',
      peopleInvited: '명 초대',
      lifetimeCommission: '평생 5% 수익',
      inviteAdvertiser: '광고주 초대',
      priorityMatching: '우선 매칭권',
      perPerson: '명당',
      deadline: '마감',
      earnedReward: '획득 수익 (현금)',
      expectedReward: '예상 수익 (현금)',
      performanceTip: '성과 향상 팁',
      performanceTipText: '참여율을 10% 높여서 더 많은 캠페인을 받으세요!',
      viewStats: '통계 보기',
      collectMore: '더 모으기',
      collectTickets: '응모권 모으기',
      stepApply: '지원',
      stepApprove: '승인',
      stepInProgress: '진행',
      stepSubmit: '제출',
      stepReview: '검토',
      stepComplete: '완료',
      viewDetails: '상세',
      peopleCount: '명',
    },
    referral: {
      title: '친구 초대',
      inviteCode: '초대 코드',
      copyCode: '코드 복사',
      shareLink: '링크 공유',
      totalInvited: '총 초대 인원',
      totalEarned: '총 수익',
      shareOnSocial: 'SNS에 공유',
      howItWorks: '작동 방식',
      step1Title: '코드 공유',
      step1Desc: '친구에게 초대 코드 전송',
      step2Title: '친구 가입',
      step2Desc: '친구가 내 링크로 가입',
      step3Title: '보상 받기',
      step3Desc: '친구가 캠페인 완료 시 포인트 획득',
      inviteHistory: '초대 내역',
      noInvites: '초대 내역이 없습니다',
      inviteNow: '지금 초대하기',
      earnPerInvite: '초대당 수익',
      bonusInfo: '보너스 정보',
      specialBonus: '🎁 특별 보너스!',
      inviteOne: '친구 1명 초대 시',
      freeTickets: '응모권 무료!',
      points: '포인트',
      limitedBonus: '한정 기간 특별 보너스!',
      everyCampaign: '친구가 캠페인 할 때마다',
      autoPayment: '5% 자동 지급!',
      monthlyAutoIncome: '💸 이번 달 자동 수익',
      totalReferralIncome: '총 추천 수익',
      permanent5Percent: '영구 5% 수익중',
      myReferralCode: '내 추천 코드',
      copyCodeButton: '📋 코드 복사하기',
      shareDirectly: '친구에게 바로 공유하기 👇',
      whatsappShareText: '나와 함께 Exfluencer VN에서 활동해요! 가입하고 {points}을 받으세요!',
      copyLink: '링크 복사',
      permanent5System: '💡 5% 영구 수익 시스템',
      inviteFriend: '친구 초대하기',
      shareCodeOrLink: '추천 코드나 링크를 친구에게 공유',
      friendSignupComplete: '친구 가입 완료',
      bothReceiveBonus: '둘 다',
      lifetime5Auto: '평생 5% 자동 수익!',
      friendEveryCampaign: '친구가 캠페인 할 때마다',
      calculationExample: '예: 친구 캠페인 1M VND → 나에게 자동 50K VND 입금',
      notDeductFromFriend: '⚡ 친구에게서 빼는 게 아니라 추가로 지급!',
      whyGood: '왜 좋은가요?',
      benefit1: '💰 자동 수익 - 아무것도 안 해도 돈이 들어옴',
      benefit2: '♾️ 영구적 - 평생 계속 수익',
      benefit3: '📈 비례 증가 - 친구 많을수록 수익도 증가',
      estimatedIncomeCalculator: '📊 예상 수익 계산기',
      myReferrals: '내 추천인',
      active: '⚡ 활성',
      pending: '가입 대기',
      my5Income: '나의 5% 수익',
      completedCampaigns: '완료 캠페인',
      friendAutoPayment: '💰 이 친구가 캠페인 할 때마다 나에게 5% 자동 지급!',
      signupDate: '가입일:',
      bothReceiveAfterSignup: '⏱️ 친구가 가입을 완료하면 둘 다',
      noInvitesYet: '아직 초대한 친구가 없습니다',
      inviteForLifetime5: '친구를 초대하고 평생 5% 자동 수익을 받으세요!',
      inviteNowButton: '지금 친구 초대하기',
      codeCopied: '추천 코드가 복사되었습니다!',
      linkCopied: '추천 링크가 복사되었습니다!',
      inviteTitle: 'Exfluencer VN 초대',
      inviteMessage: '나와 함께 Exfluencer VN에서 활동해요! 가입하고 {points}을 받으세요!',
    },
    attendance: {
      title: '출석 체크',
      checkIn: '출석하기',
      todayReward: '오늘의 보상',
      streak: '연속 출석',
      days: '일',
      totalCheckins: '총 출석',
      thisMonth: '이번 달',
      calendar: '달력',
      rewards: '보상',
      checkInSuccess: '출석 완료!',
      alreadyChecked: '오늘 이미 출석했습니다',
      comeBackTomorrow: '내일 다시 오세요',
    },
    ranking: {
      title: '랭킹',
      myRank: '내 순위',
      topInfluencers: '상위 인플루언서',
      thisMonth: '이번 달',
      allTime: '전체',
      rank: '순위',
      name: '이름',
      earnings: '수익',
      campaigns: '캠페인',
      fullList: '전체 랭킹',
      fullRankings: '전체 랭킹',
      hero: {
        title: '🏆 인플루언서 랭킹',
        subtitle: '이번 달 최고의 인플루언서들',
      },
      resetInfo: '랭킹은 매월 1일 00:00 (KST)에 초기화됩니다',
      campaignsUnit: '캠페인',
      you: '(You)',
      season: {
        currentSeason: '2월 슈퍼스타 챌린지',
        seasonEnd: '시즌 종료까지',
        warning: '시즌 종료 후 순위가 확정됩니다!',
      },
      nextRank: {
        toNext: '다음 순위까지',
        needed: '필요',
        canPass: '추월 가능',
        boost: '올리기',
      },
      motivation: {
        top10: 'TOP 10 진입! 보상 확정!',
        almost: '조금만 더! TOP 10까지 얼마 안 남았어요!',
        keepGoing: '계속 도전하세요! 기회는 열려있습니다!',
      },
      liveActivity: {
        title: '실시간 활동',
      },
      topMovers: {
        title: '이번 주 급상승 TOP 3',
        message: '당신도 다음 주 주인공이 될 수 있습니다!',
      },
      podium: {
        champions: '챔피언',
      },
      rewards: {
        title: '등급별 보상',
        resetInfo: '매월 1일 00시에 랭킹이 리셋되고 보상이 지급됩니다.',
        warning: '시즌 종료 전 마지막 순위가 보상 기준입니다!',
      },
      cta: {
        title: '지금 순위를 올리세요!',
        subtitle: '작은 노력으로 큰 보상을 받을 수 있습니다',
        earnPoints: '포인트 모으기',
        dailyCheck: '매일 출석',
      },
    },
    favorites: {
      title: '찜',
      noCampaigns: '찜한 캠페인이 없습니다',
      browseCampaigns: '캠페인 둘러보기',
      removeFromFavorites: '찜 해제',
      addedOn: '추가일',
      cashCampaigns: '💰 현금 수익 캠페인',
      pointsCampaigns: '🛍️ 쇼핑 포인트 캠페인',
      items: '개',
      emptyMessage: '관심있는 캠페인을 찜하고 나중에 쉽게 확인하세요',
    },
    myCampaigns: {
      title: '내 캠페인',
      subtitle: '지원하고 진행 중인 캠페인을 한눈에 확인하세요',
      stats: {
        active: '진행 중',
        completed: '완료',
        totalEarnings: '총 수익',
        pending: '정산 대기',
      },
      tabs: {
        all: '전체',
        active: '진행 중',
        completed: '완료',
        rejected: '탈락',
      },
      empty: {
        all: '아직 지원한 캠페인이 없습니다.',
        active: '진행 중인 캠페인이 없습니다.',
        completed: '완료된 캠페인이 없습니다.',
        rejected: '탈락한 캠페인이 없습니다.',
      },
      viewDetails: '자세히 보기',
      appliedAt: '지원일',
      selectedAt: '선정일',
      completedAt: '완료일',
      paymentAgreed: '결제 협의 중',
      paymentCompleted: '정산 완료',
      paymentAgreement: '결제 협의 중',
      paymentAgreementDesc: '광고주와 직접 결제 방법을 협의하세요. (은행 이체, Momo, Zalo Pay 등)',
      deliveryTracking: '배송 추적',
      courier: '택배사',
      trackingNumber: '운송장 번호',
      estimatedDelivery: '예상 도착',
      rejectionReason: '반려 사유',
    },
    completed: {
      title: '완료됨',
      totalCompleted: '총 완료 수',
      totalEarned: '총 수익',
      noCampaigns: '완료한 캠페인이 없습니다',
      startWorking: '시작하기',
      completedOn: '완료일',
      earned: '획득',
      viewDetails: '상세 보기',
      downloadReceipt: '증빙서류',
      emptyDescription: '캠페인을 완료하고\n수익을 확인하세요',
      infoTitle: '💡 완료 캠페인 안내',
      infoCash: '현금 수익: 캠페인 완료 후 2-5일 내 지급',
      infoPoints: '쇼핑 포인트: 즉시 적립 (상점에서 사용 가능)',
      infoRating: '평점 & 리뷰: 광고주 만족도 평가',
      infoReceipt: '증빙서류: 세금 신고 시 활용 가능',
      receiptContent: {
        campaignName: '캠페인명',
        status: '상태',
        statusPaid: '지급 완료',
        note: '※ 실제 운영 시 PDF 파일로 다운로드됩니다.',
      },
    },
    raffle: {
      myTickets: '내 응모권',
      totalTickets: '총 응모권',
      ticketUnit: '장',
      eventsParticipated: '개 이벤트 참여',
      pointsUsed: '사용 포인트',
      totalInvestment: '총 투자액',
      increaseChance: '당첨 확률 높이는 법',
      moreTicketsMoreChance: '더 많은 응모권을 모을수록 당첨 확률이 올라갑니다!',
      participationStatus: '응모 현황',
      collectMore: '더 모으기',
      noEntries: '응모한 이벤트가 없습니다',
      buyTicketsDescription: '포인트로 응모권을 구매하고',
      tryForPrizes: '다양한 경품에 도전하세요!',
      buyTicketsFromShop: '상점에서 응모권 구매하기',
      prizeValue: '상품 가치',
      estimatedWinChance: '예상 당첨 확률',
      total: '전체',
      purchaseHistory: '구매 이력',
      items: '건',
      view: '보기',
      buyMore: '더 구매하기',
      checkRanking: '응모권 랭킹 확인',
      compareWithOthers: '다른 사람들과 비교해보세요',
      ticketGuide: '응모권 안내',
      guideLine1: '응모권은 추첨 시까지 유효합니다',
      guideLine2: '더 많은 응모권을 모을수록 당첨 확률 증가',
      guideLine3: '추첨 일정은 별도 공지 예정',
      guideLine4: '당첨 시 별도 연락드립니다',
    },

    shareHistory: {
      title: '공유 내역',
      totalShares: '총 공유 횟수',
      totalEarned: '총 적립 포인트',
      filterAll: '전체',
      filterPending: '대기',
      filterApproved: '승인',
      filterRejected: '거부',
      statusPending: '검토 대기',
      statusApproved: '승인됨',
      statusRejected: '거부됨',
      noShares: '공유 내역이 없습니다',
      noSharesFiltered: '공유가 없습니다',
      shareAndEarn: '캠페인을 공유하고 포인트를 받아보세요!',
      submittedLink: '제출된 링크:',
      averageReviewTime: '평균 1~3시간 소요',
      approvedAt: '승인:',
      viewReason: '사유 보기',
      rejectionReason: '거부 사유:',
      reviewGuideTitle: '💡 검토 안내',
      reviewGuideLine1: '• 관리자가 실제 게시물을 확인합니다',
      reviewGuideLine2: '• 평균 1~3시간 내에 검토가 완료됩니다',
      reviewGuideLine3: '• 승인되면 자동으로 포인트가 적립됩니다',
      reviewGuideLine4: '• 게시물 삭제 시 포인트가 회수될 수 있습니다',
      whereToShare: '📍 어디에 공유할 수 있나요?',
      facebookGroups: 'Facebook 그룹 - 공개 그룹 권장',
      personalTimeline: '개인 타임라인 - 본인 계정 담벼락',
      facebookPages: 'Facebook 페이지 - 관리하는 페이지',
      publicPostWarning: '⚠️ 공개 게시물로 설정해주세요! 관리자가 확인할 수 있어야 승인됩니다.',
    },

    pointsStats: {
      title: '포인트 통계',
      totalEarned: '총 적립',
      totalSpent: '총 사용',
      totalTickets: '총 응모권',
      participatedRaffles: '참여 응모',
      thisMonthSpending: '이번 달 지출',
      lastMonthVs: '지난 달 대비',
      avgPerRaffle: '응모당 평균 지출',
      recentTransactions: '최근 거래 내역',
      noTransactions: '거래 내역이 없습니다',
      ticketsPurchased: '응모권 구매',
      earnTipsTitle: '💡 포인트 적립 팁',
      earnTip1: '• 매일 출석 체크로 최대 10,000 SP 획득',
      earnTip2: '• 친구 초대 시 50,000 SP 즉시 지급',
      earnTip3: '• SNS 공유로 20,000 SP 추가 적립',
      loading: '로딩 중...',
    },

    inviteAdvertiser: {
      title: '광고주 초대하기',
      subtitle: 'Invite Brands',
      inviteAndEarn: '💼 광고주를 초대하고 추가 수익 받기!',
      totalEarnings: '초대 수익 VND',
      activeAdvertisers: '활성 광고주',
      myBenefits: '💰 내가 받는 혜택 (KOL Benefits)',
      signupBonus: '가입 즉시',
      signupBonusDesc: '광고주가 가입만 해도 즉시 지급!',
      firstCampaignBonus: '첫 캠페인 시',
      firstCampaignBonusDesc: '초대한 광고주가 첫 캠페인 집행 시!',
      ongoingCommission: '지속 수수료 3% (최대',
      ongoingCommissionDesc: '초대한 광고주가 캠페인 할 때마다!',
      priorityMatching: '우선 매칭권',
      priorityMatchingDesc: '초대한 광고주 캠페인에 최우선 지원 가능!',
      brandBenefits: '🎁 광고주가 받는 혜택 (Brand Benefits)',
      firstCampaignDiscount: '첫 캠페인 20% 할인 (최대 500,000 VND)',
      freeCollaboration: '추천 KOL과 무료 협업 (수수료 면제)',
      premiumSupport: '프리미엄 고객 지원 (24시간 전담 매니저)',
      verifiedKolList: '검증된 KOL 리스트 제공',
      winWinNote: '💡 Win-Win! 광고주도 혜택이 많아 초대하기 쉬워요!',
      myInviteCode: '내 초대 코드 My Invite Code',
      copyCode: '복사',
      copied: '복사됨',
      copyLink: '초대 링크 복사 Copy Link',
      shareToAdvertiser: '광고주에게 공유 Share to Brand',
      howItWorks: '어떻게 작동하나요? How it works',
      step1Title: '협업 중인 광고주에게 공유',
      step1Desc: '초대 코드나 링크를 카카오톡, 이메일로 전송',
      step2Title: '광고주가 가입하면 즉시',
      step2Desc: '가입 완료 시 자동으로 포인트 적립!',
      step3Title: '첫 캠페인 시',
      step3Desc: '광고주 캠페인에 최우선 지원 가능!',
      step4Title: '지속적으로 3% 수수료 획득',
      step4Desc: '매 캠페인마다 최대까지!',
      inviteHistory: '초대 내역 Invite History',
      statusActive: '활성 Active',
      statusPending: '대기 Pending',
      inviteDate: '초대일:',
      campaigns: '진행 캠페인:',
      totalEarningsLabel: '누적 수익',
      viewBrandCampaigns: '이 광고주 캠페인 보기',
      noInvites: '아직 초대한 광고주가 없습니다',
      noInvitesDesc: '협업 중인 광고주를 초대하고 추가 수익을 받으세요!',
      successTipsTitle: '💡 성공 팁 Success Tips',
      successTip1: '✅ 협업 중인 광고주에게 먼저 제안하세요 (신뢰도 높음)',
      successTip2: '✅ 플랫폼 혜택을 강조하세요 (20% 할인, 무료 협업)',
      successTip3: '✅ 빠른 매칭을 설명하세요 (평균 24시간 내 KOL 확보)',
      successTip4: '✅ SNS 캠페인이 많은 광고주일수록 좋습니다',
      successTip5: '💰 월 평균 3명 초대 시 이상 추가 수익!',
    },

    campaignDetail: {
      title: '캠페인 상세',
      expectedEarnings: '예상 수익',
      applyNow: '🎯 이 캠페인 지원하기',
      matchingRate: '매칭률',
      eligible: '✓ 이 캠페인에 지원 가능합니다!',
      notEligible: '✗ 매칭률이 낮아 지원이 어려울 수 있습니다.',
      viewDetails: '상세 매칭 항목 보기',
      requirements: '지원 자격 요구사항',
      minFollowers: '최소 팔로워',
      minEngagement: '최소 참여율',
      platform: '플랫폼:',
      category: '카테고리:',
      target: '타겟:',
      location: '지역:',
      skinType: '피부 타입:',
      skinTone: '피부톤:',
      childRequired: '자녀 조건:',
      vehicleRequired: '차량 조건:',
      clothingSize: '의류 사이즈:',
      petRequired: '반려동물 조건:',
      maritalStatus: '결혼 상태:',
      housingType: '주거 형태:',
      benefits: '받게 될 혜택',
      providedProducts: '📦 제공 제품',
      fullsize: '정품',
      sample: '샘플',
      totalValue: '총 제품 가치',
      shippingInfo: '배송 정보',
      additionalBenefits: '추가 혜택',
      productGallery: '제품 갤러리',
      contentExamples: '콘텐츠 제작 예시',
      contentExamplesDesc: '이런 스타일로 콘텐츠를 제작해주세요! 참고용 예시입니다.',
      missionGuide: '상세 미션 가이드',

      // Marketing & UX Optimization
      urgency: {
        hotCampaign: '인기 급상승 캠페인',
        recentApps: '명이 최근 지원했습니다',
        trending: '인기',
        slotsRemaining: '남은 자리',
        timeLeft: '마감까지',
        hours: '시간',
      },
      difficulty: {
        title: '난이도 & 소요시간',
        difficultyLevel: '난이도',
        easy: '쉬움',
        medium: '보통',
        hard: '어려움',
        timeRequired: '소요시간',
        hoursUnit: '시간',
        successRate: '선정률',
        skillsNeeded: '필요 스킬',
      },
      earnings: {
        title: '수익 계산기',
        basePayment: '기본 페이',
        productValue: '제공 제품 가치',
        bonusOpportunities: '보너스 기회',
        maxPotential: '최대 예상 수익',
        cashAndProducts: '현금 + 제품 포함',
      },
      socialProof: {
        title: '인플루언서 후기',
        completionRate: '캠페인 완료율',
        avgResponseTime: '평균 응답시간',
        recentReviews: '최근 리뷰',
        hoursAgo: '시간 전',
      },
      quality: {
        verified: '인증된 광고주',
        paymentGuarantee: '정산 보증',
        contractProtection: '계약 보호',
      },

      contentFormat: '📱 제작할 콘텐츠',
      mustInclude: '필수 포함 사항',
      prohibited: '금지 사항',
      brandInfo: '브랜드 정보',
      founded: '설립',
      previousCampaigns: '이전 캠페인',
      averageRating: '평균 평점',
      collaboratedInfluencers: '협업 인플루언서',
      website: '웹사이트',
      selectionCriteria: '선정 기준',
      expectedApplicants: '예상 지원자',
      selectedInfluencers: '선정 인원',
      expectedCompetition: '예상 경쟁률',
      priorityCriteria: '🎯 우선 선정 기준',
      avgReviewTime: '평균 심사 시간',
      faq: '💬 자주 묻는 질문',
      pendingApproval: '승인 대기 중',
      pendingApprovalDesc: '광고주가 지원서를 검토하고 있습니다.\n평균 승인 시간: 1~2일',
      avgApprovalTime: '평균 승인 시간: 1~2일',
      shareAndEarnBonus: '📣 캠페인 공유하고 추가 수익!',
      shareDescription: 'Facebook 그룹/타임라인/페이지에 공유 → 적립!',
      shareSubmitted: '곳에 공유 완료! 여러 곳 공유 가능!',
      shareStatus: '📊 공유 현황',
      shareApproved: '승인',
      sharePending: '대기',
      shareRejected: '거부',
      shareGuidelines: '📋 공유 안내 Share Guidelines',
      shareWhere: '공유 가능: 그룹, 개인 타임라인, 페이지 (공개 설정 필수)',
      sharePerShare: '공유 1회당 적립 (관리자 승인 후)',
      shareMultiple: '같은 캠페인을 여러 곳에 공유 가능! (각각 포인트 지급)',
      shareDailyLimit: '하루 최대 개 캠페인 공유 가능 (오늘:',
      shareNoDelete: '공유 후 24시간 내 삭제 금지 (포인트 회수됨)',
      totalShareEarnings: '총 공유 수익',
      shareMore: '➕ 다른 곳에도 공유하기',
      dailyLimitReached: '일일 한도 초과 Daily limit',
      shareOnFacebook: '📣 Facebook에 공유하기',
      shareLinkModal: {
        title: '📣 Facebook 공유하기',
        description: '캠페인을 Facebook에 공유하고\n게시물 링크를 입력하면 적립!',
        whereCanShare: '📍 어디에 공유할 수 있나요?',
        facebookGroups: 'Facebook 그룹',
        facebookGroupsDesc: '공개 그룹 권장 (베트남/한국/마케팅 관련)',
        personalTimeline: '개인 타임라인',
        personalTimelineDesc: '본인 계정 담벼락에 게시 (공개 설정 필요)',
        facebookPages: 'Facebook 페이지',
        facebookPagesDesc: '관리하는 페이지에 게시',
        publicWarning: '⚠️ 공개 게시물로 설정해주세요! (관리자 확인용)',
        howToShare: '📋 공유 방법 (완전 수동)',
        step1: '아래 "공유 내용 복사하기" 버튼 클릭',
        step1Desc: '클립보드에 텍스트가 복사됩니다',
        step2: '직접 Facebook 열기',
        step2Desc: '앱 또는 브라우저에서 Facebook 접속',
        step3: '원하는 곳에 붙여넣기 (Ctrl+V)',
        step3Desc: '그룹, 타임라인, 페이지 중 선택 (공개 설정!)',
        step4: '게시물 링크 복사',
        step4Desc: '게시 후 "..." → "링크 복사" 클릭',
        step5: '여기로 돌아와서 링크 입력',
        step5Desc: '아래 입력란에 붙여넣기 후 "제출하기"',
        recommendedContent: '💡 추천 공유 내용',
        copyContent: '📋 공유 내용 복사하기',
        manualNote: '💡 직접 Facebook을 열어서 그룹/타임라인/페이지 중 선택해서 공유하세요',
        enterLink: 'Facebook 게시물 링크 입력 *',
        linkCopyHow: '💡 링크 복사 방법: Facebook 게시물 우측 상단 "..." 클릭 → "링크 복사"',
        fakeWarning: '⚠️ 허위 링크 제출 시 계정이 정지될 수 있습니다',
        validFormats: '✅ 올바른 URL 형식 (모두 가능!)',
        groupPost: '그룹 게시물:',
        timelinePost: '개인 타임라인:',
        pagePost: '페이지 게시물:',
        permalink: 'Permalink:',
        cancel: '취소',
        submit: '제출하기',
      },
      progress: '진행 상황',
      completedTasks: '완료된 작업',
      submitWork: '결과물 제출',
      deliverables: '제출물 요구사항',
      shareCountSubmitted: '회 공유 제출됨',
      shareAndEarnBonusText: 'Facebook에 공유하고 보너스 받기',
      recentApplicants: '최근 지원자 목록',
      totalApplicants: '총 지원자',
      slotsLeft: '남은 자리',
      followersUnit: '팔로워',
      earningsBreakdown: '수익 상세 내역',
      basePay: '기본 페이',
      guaranteedOnCompletion: '캠페인 완료 시 보장',
      productValue: '제공 제품 가치',
      freeProducts: '무료로 제공되는 제품',
      bonusOpportunity: '보너스 기회',
      totalExpectedEarnings: '총 예상 수익',
      maxEarningsWithBonus: '보너스 포함 최대 수익',
      submittedWork: '제출한 결과물',
      viewLink: '링크 보기 →',
      approved: '승인됨',
      rejected: '거절됨',
      reviewing: '검토중',
      views: 'K',
      likes: '좋아요',
      submittedAt: '제출일',
      campaignInfo: '캠페인 정보',
      period: '기간:',
      deadline: '마감일:',
      applyModal: {
        title: '🎯 캠페인 지원하기',
        advertiser: '광고주',
        expectedEarnings: '예상 수익',
        deadline: '마감일',
        confirmLine1: '✅ 지원서가 광고주에게 전송됩니다',
        confirmLine2: '✅ 승인되면 알림을 보내드립니다',
        confirmLine3: '⏱️ 평균 승인 시간: 1~2일',
        cancel: '취소',
        apply: '지원하기',
      },
      uploadModal: {
        title: '결과물 제출',
        contentUrl: '콘텐츠 URL',
        urlPlaceholder: 'https://instagram.com/p/...',
        description: '설명 (선택)',
        descPlaceholder: '추가 설명을 입력하세요...',
        cancel: '취소',
        submit: '제출',
      },
      alerts: {
        applicationComplete: '✅ 캠페인 지원 완료!\n\n광고주의 승인을 기다리고 있습니다.\n평균 승인 시간: 1~2일',
        workSubmitted: '결과물이 제출되었습니다!',
        dailyLimitExceeded: '⚠️ 일일 공유 한도 초과!\n\n하루 최대 ${MAX_DAILY_SHARES}개 공유까지 가능합니다.\n내일 다시 시도해주세요.\n\nDaily share limit: ${MAX_DAILY_SHARES} shares/day',
        pleaseEnterLink: '⚠️ Facebook 게시물 링크를 입력해주세요!\n\nPlease enter your Facebook post URL.',
        invalidFacebookLink: '⚠️ 올바른 Facebook 게시물 링크가 아닙니다!\n\n예시:\n• https://www.facebook.com/groups/123/posts/456/\n• https://www.facebook.com/user/posts/123456\n\nInvalid Facebook URL format.',
        duplicateLink: '⚠️ 이미 제출된 링크입니다!\n\n같은 링크는 중복 제출할 수 없습니다.\n다른 곳에 공유한 경우 새 링크를 입력해주세요.\n\nThis URL has already been submitted.',
        shareLinkSubmitted: '✅ 공유 링크 제출 완료!\n\n🔍 관리자가 게시물을 확인하고 있습니다\n⏱️ 평균 검토 시간: 1~3시간\n💰 승인되면 ${formatPoints(SHARE_BONUS_AMOUNT)} VND 자동 적립\n\n💡 같은 캠페인을 다른 그룹/타임라인에도 공유 가능합니다!\n\n📋 이 페이지에서 검토 상태를 확인할 수 있습니다.\n\n⚠️ 공유 후 24시간 내 삭제 시 포인트가 회수됩니다.\n\nShare submitted for review!',
        clipboardCopied: '✅ 클립보드에 복사 완료!\n\n다음 단계:\n1️⃣ 직접 Facebook 앱/웹 열기\n2️⃣ 그룹/타임라인/페이지 중 선택\n3️⃣ 붙여넣기 후 공개 설정으로 게시\n4️⃣ 게시물 링크 복사해서 돌아오기',
      },
      shareContent: {
        expectedEarnings: '💰 예상 수익:',
        company: '📍 회사:',
        deadline: '⏰ 마감:',
        viewDetails: '📱 자세히 보기:',
        step: '단계',
        stepBadge1: '1단계',
        stepBadge4: '4단계',
        placeholder: 'https://www.facebook.com/... (그룹/타임라인/페이지 모두 OK)',
        linkCopyMethod: '💡 링크 복사 방법: Facebook 게시물 우측 상단 "..." 클릭 → "링크 복사"',
        fakeWarning: '⚠️ 허위 링크 제출 시 계정이 정지될 수 있습니다',
        manualShareNote: '💡 직접 Facebook을 열어서 그룹/타임라인/페이지 중 선택해서 공유하세요',
      },
      viewAllShares: '전체 공유 내역 보기 →',
      shareButtonDesc: '그룹/타임라인/페이지 모두 OK →',
      browseMoreCampaigns: '다른 캠페인 더 보기 →',
      dailyShareLimitText: '하루 최대 {max}개 캠페인 공유 가능 (오늘: {current}/{max})',
      importantNotesTitle: '⚠️ 중요 사항',
      importantNote1: '• 결제 전 반드시 계약서를 확인하세요',
      importantNote2: '• 결제 후 양측 모두 플랫폼에서 "완료" 확인을 해야 다음 단계로 진행됩니다',
      importantNote3: '• 분쟁 발생 시 플랫폼은 중재 지원만 제공하며, 결제 책임은 당사자에게 있습니다',
      importantNote4: '• 안전한 거래를 위해 공식 은행 송금 또는 전자지갑 사용을 권장합니다',
      competitionAlert: '💡 다른 인플루언서들도 이 캠페인에 관심을 갖고 있습니다. 서둘러 지원하세요!',
      topSize: '상의',
      bottomSize: '하의',
    },
  },
};


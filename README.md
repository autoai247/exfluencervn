# Exfluencer VN - Nền tảng Influencer Marketing tại Việt Nam

Nền tảng kết nối Influencer và Nhà quảng cáo, được tối ưu hoá cho thị trường Việt Nam với thiết kế mobile-first.

## 🎯 Tính năng chính

### Cho Influencer/KOL
- ✅ Tìm kiếm và ứng tuyển chiến dịch
- ✅ Quản lý công việc và tiến độ
- ✅ Hệ thống điểm VI Point (1 Point = 1 VND)
- ✅ Rút tiền về tài khoản ngân hàng Việt Nam
- ✅ Kết nối 4 nền tảng: Instagram, TikTok, YouTube, Facebook
- ✅ Thống kê thu nhập và hiệu suất
- ✅ Nhận tin nhắn từ nhà quảng cáo

### Cho Nhà quảng cáo
- ✅ Tạo và quản lý chiến dịch
- ✅ Tìm kiếm influencer phù hợp
- ✅ Thanh toán qua hệ thống ký quỹ (Escrow)
- ✅ Duyệt nội dung và theo dõi hiệu suất
- ✅ Thống kê chi tiết campaign
- ✅ Chat trực tiếp với influencer

## 📱 Mobile-First Design

**LƯU Ý QUAN TRỌNG**: Dự án này được thiết kế 100% cho mobile. KOL tại Việt Nam chủ yếu sử dụng điện thoại.

### Đặc điểm mobile-first:
- Max-width: 430px (giống iPhone 14 Pro Max)
- Touch-optimized (button min 44px)
- Safe area insets (iOS notch)
- Bottom navigation (dễ với tay)
- Prevent iOS zoom (input font-size: 16px)
- Vietnamese keyboard friendly

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date**: date-fns
- **State**: Zustand
- **Data fetching**: TanStack Query (React Query)
- **HTTP**: Axios

## 📁 Project Structure

```
exfluencervn/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (main)/              # Main app routes
│   │   ├── influencer/      # Influencer dashboard
│   │   │   ├── campaigns/   # Find campaigns
│   │   │   ├── jobs/        # My jobs
│   │   │   ├── wallet/      # Points & withdrawal
│   │   │   ├── stats/       # Statistics
│   │   │   └── profile/     # Profile settings
│   │   └── advertiser/      # Advertiser dashboard
│   │       ├── campaigns/   # My campaigns
│   │       ├── influencers/ # Find influencers
│   │       ├── wallet/      # Points & charging
│   │       ├── stats/       # Statistics
│   │       └── profile/     # Company settings
│   ├── messages/            # Messaging system
│   ├── notifications/       # Notifications
│   ├── layout.tsx           # Root layout (mobile wrapper)
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── common/              # Shared components
│   │   ├── BottomNav.tsx
│   │   ├── MobileHeader.tsx
│   │   ├── Button.tsx
│   │   └── ...
│   ├── influencer/          # Influencer-specific
│   └── advertiser/          # Advertiser-specific
├── lib/
│   ├── points.ts            # Point system utilities
│   ├── utils.ts             # General utilities
│   └── api.ts               # API client
├── types/
│   └── index.ts             # TypeScript types
├── public/                  # Static files
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎨 Color System

### Primary Colors
- **Primary** (`#FF6B6B`): CTA buttons, active states
- **Secondary** (`#4ECDC4`): Secondary actions
- **Accent** (`#FFD93D`): Points, highlights

### Dark Theme
- **Background**: `#1A1A2E`
- **Cards**: `#2E2E3E`
- **Borders**: `#565662`

### Platform Colors
- **Instagram**: Purple-Pink gradient
- **TikTok**: Black
- **YouTube**: Red
- **Facebook**: Blue

## 💰 Point System

### VI Point = VND 1:1
```typescript
1 VI Point = 1 VND
```

### Transaction Types
- `charge`: Nạp tiền (Advertiser)
- `withdrawal`: Rút tiền (Influencer)
- `campaign_payment`: Thanh toán campaign
- `earning`: Thu nhập từ campaign
- `withdrawal_fee`: Phí rút (2%, tối thiểu 10.000đ)

### Limits
```typescript
// Nạp tiền
Min: 50.000đ
Max: 100.000.000đ

// Rút tiền
Min: 100.000đ
Max: 50.000.000đ
Fee: 2% (min 10.000đ)
```

## 📊 42 Screens Overview

### Common (4 screens)
1. Landing page (Welcome)
2. Login
3. Register
4. Forgot password

### Auth Flow (5 screens)
5. OTP verification
6. Reset password
7. Onboarding (Influencer)
8. Onboarding (Advertiser)
9. Social connect

### Campaign (6 screens)
10. Campaign list
11. Campaign detail
12. Campaign create
13. Campaign edit
14. Application form
15. Application status

### Influencer Dashboard (10 screens)
16. Dashboard home
17. Find campaigns
18. My jobs
19. Job detail
20. Content submission
21. Wallet (Points)
22. Charge points
23. Withdrawal
24. Transaction history
25. Profile settings

### Advertiser Dashboard (9 screens)
26. Dashboard home
27. My campaigns
28. Campaign analytics
29. Find influencers
30. Influencer profile
31. Wallet (Points)
32. Withdrawal request
33. Transaction history
34. Company settings

### Messaging (3 screens)
35. Conversation list
36. Chat detail
37. Message requests

### Settings (4 screens)
38. Notification settings
39. Privacy settings
40. Bank account settings
41. Help & support

### Misc (3 screens)
42. Notifications
43. Search results
44. Reviews & ratings

## 🚀 Installation

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Install Dependencies

```bash
cd exfluencervn
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your mobile device or browser (resize to mobile view).

### Build for Production

```bash
npm run build
npm start
```

## 📱 Testing on Mobile

### Option 1: Mobile Browser DevTools
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone 14 Pro Max" or custom 430px width

### Option 2: ngrok (Real Device)
```bash
# Install ngrok
npm install -g ngrok

# Start dev server
npm run dev

# In another terminal
ngrok http 3000

# Open ngrok URL on your mobile device
```

### Option 3: Local Network
```bash
# Find your local IP (Windows)
ipconfig

# Find your local IP (Mac/Linux)
ifconfig

# Start dev server
npm run dev

# Open http://YOUR_IP:3000 on mobile device
# Example: http://192.168.1.100:3000
```

## 🎯 Mobile UX Best Practices

### Touch Targets
- Minimum 44x44px (Apple HIG)
- Spacing between targets: 8px+

### Input Fields
- Font size minimum 16px (prevent iOS zoom)
- Clear labels and placeholders
- Vietnamese keyboard support

### Navigation
- Bottom navigation (thumb-friendly)
- Sticky headers with back buttons
- Swipe gestures where appropriate

### Performance
- Lazy loading images
- Optimize bundle size
- Use React.memo for heavy components

## 🌍 Vietnamese Localization

### Currency
```typescript
formatPoints(1000000) // "1.000.000 đ"
```

### Date Format
```typescript
formatDate(date) // "12/02/2024"
formatDateFull(date) // "Thứ Hai, 12 tháng 2, 2024"
formatTimeAgo(date) // "2 giờ trước"
```

### Phone Numbers
```typescript
// Accepted formats
0901234567
+84901234567
```

### Banks Supported
- VCB (Vietcombank)
- TCB (Techcombank)
- MB (MBBank)
- VPB (VPBank)
- ACB (ACB)
- BIDV
- VIB
- TPB (TPBank)
- SHB (SHB)

## 🔐 Security

### Input Sanitization
- XSS protection on all user inputs
- SQL injection prevention (use parameterized queries)
- CSRF tokens for forms

### File Uploads
- Max 5MB for images
- Allowed types: JPG, PNG, WEBP
- Virus scanning recommended

### Authentication
- JWT tokens (recommended)
- Refresh token rotation
- Secure password hashing (bcrypt)

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests (Recommended: Playwright)
```bash
npm run test:e2e
```

## 📚 Documentation

### API Documentation
- See `/docs/api.md` for API endpoints
- See `/docs/types.md` for TypeScript types

### Component Documentation
- See `/docs/components.md` for component usage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

Proprietary - Exfluencer VN Platform

## 🆘 Support

- Email: support@viinfluencer.com
- Hotline: 1900-xxxx
- Facebook: @viinfluencer

---

**Developed with ❤️ for Vietnamese Influencer Market**

**Mobile-First | Vietnamese-Optimized | Performance-Focused**

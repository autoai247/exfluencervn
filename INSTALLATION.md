# Exfluencer VN - Installation Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Node.js

**Windows:**
1. Download from https://nodejs.org/en/download
2. Install LTS version (20.x recommended)
3. Verify: Open Command Prompt and run:
```bash
node --version
npm --version
```

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### Step 2: Navigate to Project Folder

**Windows:**
```bash
cd "C:\Users\user\OneDrive\민기현_SUPERS\슈퍼_익스플루언서\베트남\exfluencervn"
```

**Mac/Linux:**
```bash
cd "/path/to/exfluencervn"
```

---

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- date-fns (Vietnamese date formatting)
- Zustand (state management)
- React Query (data fetching)
- Axios (HTTP client)

⏱️ **Time**: 2-3 minutes depending on internet speed

---

### Step 4: Create Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` file with your settings (optional for development):
```bash
NEXT_PUBLIC_APP_NAME=Exfluencer VN
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

### Step 6: Open in Browser

**Desktop (DevTools):**
1. Open http://localhost:3000
2. Press F12 (DevTools)
3. Click "Toggle device toolbar" (Ctrl+Shift+M)
4. Select "iPhone 14 Pro Max" or set width to 430px

**Mobile Device (Same WiFi):**
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```
2. On your phone, open browser and go to:
   ```
   http://YOUR_IP:3000
   # Example: http://192.168.1.100:3000
   ```

---

## 📱 Mobile Testing Methods

### Method 1: Chrome DevTools (Easiest)
1. Open http://localhost:3000
2. Press F12
3. Click device icon (Ctrl+Shift+M)
4. Select device preset or custom size

### Method 2: ngrok (Real Device)
```bash
# Install ngrok
npm install -g ngrok

# Start dev server (terminal 1)
npm run dev

# Start ngrok (terminal 2)
ngrok http 3000

# Copy ngrok URL and open on phone
# Example: https://abc123.ngrok.io
```

### Method 3: Local Network (Same WiFi)
```bash
# Find IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Your phone must be on same WiFi
# Open: http://192.168.1.xxx:3000
```

---

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 📦 Folder Structure Explained

```
exfluencervn/
│
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   │   └── login/
│   ├── (main)/            # Main app pages
│   │   ├── influencer/    # Influencer dashboard
│   │   └── advertiser/    # Advertiser dashboard
│   ├── page.tsx           # Landing page (/)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── common/           # Shared components
│   │   ├── BottomNav.tsx
│   │   └── MobileHeader.tsx
│   ├── influencer/       # Influencer-specific
│   └── advertiser/       # Advertiser-specific
│
├── lib/                  # Utility functions
│   ├── points.ts         # Point system (VND)
│   └── utils.ts          # General utilities
│
├── types/                # TypeScript definitions
│   └── index.ts          # All type definitions
│
├── public/               # Static files
│   └── (images, icons)
│
└── Config files:
    ├── package.json       # Dependencies
    ├── tsconfig.json      # TypeScript config
    ├── tailwind.config.ts # Tailwind config
    ├── next.config.js     # Next.js config
    └── .env               # Environment variables
```

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#FF6B6B', // Change this
    light: '#FF8E8E',
    dark: '#E54A4A',
  },
  // ... other colors
}
```

### Change Max Width (Mobile size)

Edit `tailwind.config.ts`:

```typescript
maxWidth: {
  'mobile': '430px', // Change this (default: iPhone 14 Pro Max)
}
```

### Add New Fonts

Edit `app/layout.tsx`:

```typescript
import { Inter, YourFont } from 'next/font/google'

const yourFont = YourFont({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

---

## 🔧 Troubleshooting

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Tailwind styles not working

```bash
# Make sure Tailwind directives are in globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Hot reload not working

1. Check file watcher limits (Linux):
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. Restart dev server:
```bash
# Kill server (Ctrl+C)
npm run dev
```

---

## 📚 Learning Resources

### Next.js 14
- Official docs: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app

### TypeScript
- Handbook: https://www.typescriptlang.org/docs/handbook/

### Tailwind CSS
- Docs: https://tailwindcss.com/docs
- Mobile-first: https://tailwindcss.com/docs/responsive-design

### React
- Official docs: https://react.dev
- Hooks: https://react.dev/reference/react

---

## 🚀 Next Steps After Installation

1. ✅ **Explore the landing page**: http://localhost:3000
2. ✅ **Check login page**: http://localhost:3000/auth/login
3. ✅ **View dashboard**: http://localhost:3000/influencer
4. 📖 **Read README.md**: Full documentation
5. 📖 **Read PROJECT_STATUS.md**: Current progress
6. 🛠 **Start building**: Create new pages in `app/` folder
7. 🎨 **Customize**: Modify colors, fonts, layouts
8. 🔌 **Add backend**: Connect to your API
9. 🧪 **Test on phone**: Use ngrok or local network
10. 🚀 **Deploy**: Vercel, Netlify, or self-host

---

## 💡 Quick Tips

### VSCode Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier

### Keyboard Shortcuts
- `Ctrl+Shift+M`: Toggle mobile view (Chrome DevTools)
- `Ctrl+Shift+C`: Inspect element
- `Ctrl+R`: Reload page
- `F12`: Open DevTools

### Development Workflow
1. Create new page in `app/` folder
2. Import components from `components/`
3. Use utilities from `lib/`
4. Use types from `types/`
5. Test on mobile (DevTools or real device)
6. Commit to Git

---

## 🆘 Get Help

### Check Documentation
1. README.md - Full project overview
2. PROJECT_STATUS.md - Current progress and TODO
3. This file - Installation guide

### Common Issues
- **Styles not loading**: Clear `.next` cache
- **TypeScript errors**: Run `npx tsc --noEmit`
- **Port in use**: Use different port or kill process
- **Module errors**: Reinstall dependencies

### External Resources
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag `nextjs` `tailwindcss` `typescript`

---

**You're all set! Start building the future of Vietnamese influencer marketing! 🚀**

**Mobile-First | Vietnamese-Optimized | Performance-Focused**

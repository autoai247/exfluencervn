import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mobile-first: Max widths for mobile optimization
      maxWidth: {
        'mobile': '430px',
      },
      // Vietnamese influencer platform colors
      colors: {
        primary: {
          DEFAULT: '#FF6B6B', // Vibrant red for CTAs
          light: '#FF8E8E',
          dark: '#E54A4A',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // Teal for secondary actions
          light: '#6FD9D1',
          dark: '#3AB5AD',
        },
        accent: {
          DEFAULT: '#FFD93D', // Yellow for highlights/points
          light: '#FFE36D',
          dark: '#FFC700',
        },
        dark: {
          DEFAULT: '#1A1A2E', // Dark background
          50: '#F7F7F8',
          100: '#E8E8EA',
          200: '#C4C4C8',
          300: '#9F9FA6',
          400: '#565662',
          500: '#2E2E3E',
          600: '#25253A',
          700: '#1A1A2E',
          800: '#16162A',
          900: '#0F0F1E',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      // Mobile-optimized spacing
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      // Vietnamese-friendly fonts
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Noto Sans', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      // Animations for Vietnamese marketing style
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
export default config

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'exfluencer.vn' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

module.exports = nextConfig

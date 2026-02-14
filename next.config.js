/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mobile-first optimizations
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig

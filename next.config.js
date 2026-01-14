/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only keep remote patterns that are actually used
    remotePatterns: [],
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Longer cache time for production
    minimumCacheTTL: 31536000, // 1 year
    // Disable image optimization to avoid hydration mismatch
    unoptimized: true,
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Compression and security
  compress: true,
  poweredByHeader: false,
  // Enable React Strict Mode
  reactStrictMode: true,
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

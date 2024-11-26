/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', 
      'w.soundcloud.com',
      'res.cloudinary.com'
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  swcMinify: true,
}

module.exports = nextConfig 
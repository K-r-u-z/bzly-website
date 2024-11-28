/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracing: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { punycode: false }
    return config
  }
}

module.exports = nextConfig 
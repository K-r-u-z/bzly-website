/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'w.soundcloud.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'bzly.fowhl.mongodb.net',
      }
    ]
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [],
    optimizeCss: false,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      }
    }
    config.optimization = {
      ...config.optimization,
      maxInitialRequests: 25,
      moduleIds: 'deterministic',
    }
    return config
  },
  poweredByHeader: false,
}

module.exports = nextConfig 
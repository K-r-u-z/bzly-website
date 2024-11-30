/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bzly.info', 'www.bzly.info', 'bzly-website.vercel.app'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bzly.info',
        pathname: '/api/assets/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/assets/:type',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate, max-age=0'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ],
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
        {
          source: '/newsletter/unsubscribe',
          destination: '/newsletter/unsubscribe',
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'bzly.info',
          },
        ],
        destination: 'https://www.bzly.info',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bzly.info',
          },
        ],
        destination: 'https://www.bzly.info/:path*',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig 
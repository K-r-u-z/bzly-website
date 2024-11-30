/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bzly.info', 'www.bzly.info', 'bzly-website.vercel.app'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
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
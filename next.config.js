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
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
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
  }
}

module.exports = nextConfig 
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
  experimental: {
    tracingIgnores: ['**/.next/**', '**/node_modules/**'],
    outputFileTracingRoot: process.env.VERCEL ? '/var/task' : undefined,
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { punycode: false }
    return config
  }
}

module.exports = nextConfig 
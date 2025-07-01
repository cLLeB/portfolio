/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages, disable for Vercel
  output: process.env.GITHUB_ACTIONS ? 'export' : undefined,
  trailingSlash: process.env.GITHUB_ACTIONS ? true : false,
  basePath: process.env.GITHUB_ACTIONS ? '/portfolio' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/portfolio/' : '',
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

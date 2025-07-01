/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/cs-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cs-portfolio/' : '',
}

module.exports = nextConfig

const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  sassOptions: {
    includePaths: ['./styles', './app'],
  },
  
  // Image optimization
  images: {
    loader: "custom",
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "/",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    nextImageExportOptimizer_remoteImageCacheTTL: "0",
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for caching and performance
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
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/frontend-background',
        destination: '/frontend-profile',
        permanent: true,
      },
      {
        source: '/backend-background',
        destination: '/backend-profile',
        permanent: true,
      },
      {
        source: '/software-architect-background',
        destination: '/software-architect-profile',
        permanent: true,
      },
      {
        source: '/my-career-timeline',
        destination: '/my-experience',
        permanent: true,
      },
      {
        source: '/about-me',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-or-hire-me',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/the-brainstorming-forum',
        destination: '/forum',
        permanent: true,
      },
      {
        source: '/projects/how-did-i-build-my-interactive-cv',
        destination: '/projects/how-do-i-build-it',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 
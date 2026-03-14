const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  outputFileTracingRoot: path.resolve(__dirname),
  sassOptions: {
    includePaths: ['./styles', './app'],
  },

  // Image optimization
  images: {
    loader: 'custom',
    loaderFile: './lib/images/siteLoader.ts',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 960, 1200, 1536, 1920],
    imageSizes: [60, 80, 100, 120, 160, 180, 245, 300, 340, 400, 490, 540],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
module.exports = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: 'none-03p',
    project: 'my-website',

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    webpack: {
      automaticVercelMonitors: false,
      treeshake: {
        removeDebugLogging: true,
      },
    },
  }
)

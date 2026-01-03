/** @type {import('next').NextConfig} */
import path from 'path'

const nextConfig = {
  // Performance: Enable React strict mode for better development practices
  reactStrictMode: true,

  // Performance: Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Build optimization
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image Optimization - WebP and AVIF support
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Compression - Enable gzip and brotli
  compress: true,

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          // Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live https://*.vercel.app https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: https://*.cloudinary.com https://*.vercel-storage.com https://cdn.sanity.io https://hcaptcha.com https://*.hcaptcha.com",
              "font-src 'self' data: https://fonts.gstatic.com https://hcaptcha.com https://*.hcaptcha.com",
              "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://*.vercel.app https://vercel.live wss://*.vercel.app wss://vercel.live https://*.stripe.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://*.stripe.com https://vercel.live",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "manifest-src 'self'",
              "media-src 'self' https://*.cloudinary.com https://*.vercel-storage.com",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // X-Frame-Options (prevent clickjacking)
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // X-Content-Type-Options (prevent MIME sniffing)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // X-XSS-Protection (legacy browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy (restrict browser features)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=(self)',
              'interest-cohort=()',
              'payment=(self)',
              'usb=()',
            ].join(', '),
          },
          // Strict-Transport-Security (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },

  // Enable experimental features for performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
      'date-fns',
    ],

    // Server actions
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app'],
      bodySizeLimit: '2mb',
    },
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@anthropic-ai/claude-agent-sdk': path.resolve('./src/shims/claude-agent-sdk'),
    }

    // Production optimizations
    if (!dev && !isServer) {
      // Code splitting optimization
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'async',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // UI components chunk
            ui: {
              name: 'ui',
              test: /[\\/]src[\\/](components|ui)[\\/]/,
              chunks: 'all',
              priority: 15,
            },
            // Lib chunk
            lib: {
              name: 'lib',
              test: /[\\/]src[\\/]lib[\\/]/,
              chunks: 'all',
              priority: 12,
            },
          },
        },
      }
    }

    return config
  },

  // PoweredByHeader: Remove for security
  poweredByHeader: false,

  // Redirects
  async redirects() {
    return []
  },

  // Rewrites
  async rewrites() {
    return []
  },
}

export default nextConfig

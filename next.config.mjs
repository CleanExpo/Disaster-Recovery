// DR-722: bundle-analyzer — run with ANALYZE=true npm run build
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: '/for/:path*', destination: '/for-business/:path*', permanent: true },
      { source: '/contractors/join', destination: '/contractors/apply', permanent: true },
      { source: '/help-center', destination: '/contact', permanent: true },
      { source: '/help', destination: '/contact', permanent: true },
      { source: '/support', destination: '/contact', permanent: true },
      { source: '/cookie-policy', destination: '/cookies', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/insurance-claim', destination: '/claim', permanent: true },
      { source: '/insurance-claims', destination: '/claim', permanent: true },
      { source: '/make-a-claim', destination: '/claim', permanent: true },
      { source: '/lodge-a-claim', destination: '/claim', permanent: true },
      { source: '/insurance-claim-advocate', destination: '/how-it-works', permanent: false },
      { source: '/contractor-terms', destination: '/terms', permanent: false },
      // Canonical redirect — old DR-398 page had advocacy framing violations
      { source: '/events/cyclone-narelle-wa', destination: '/events/cyclone-narelle-western-australia-2026', permanent: true },
      // DR-745: Bare-slug 404s — short-form event slugs that appear in external links / social media
      { source: '/events/cyclone-alfred', destination: '/events/cyclone-alfred-fnq-2026', permanent: true },
      { source: '/events/cyclone-maila', destination: '/events/tc-maila-fnq-2026', permanent: true },
      { source: '/events/nsw-storms', destination: '/events/nsw-storms-april-2026', permanent: true },
      // DR-533: NSW/QLD storms April 2026 — long-tail canonical redirect
      { source: '/nsw-storms-april-2026-insurance-claims', destination: '/events/nsw-storms-april-2026', permanent: true },
      { source: '/nsw-qld-storms-2026', destination: '/events/nsw-storms-april-2026', permanent: true },
      // DR-774 / GAP-116: Nov 2025 QLD/NSW storms — bare-slug redirects
      { source: '/events/nov-storms-2025', destination: '/events/qld-nsw-storms-november-2025', permanent: true },
      { source: '/events/november-storms-2025', destination: '/events/qld-nsw-storms-november-2025', permanent: true },
      { source: '/events/qld-storms-november-2025', destination: '/events/qld-nsw-storms-november-2025', permanent: true },
      { source: '/events/nsw-storms-november-2025', destination: '/events/qld-nsw-storms-november-2025', permanent: true },
      // DR-528: Cyclone Alfred Queensland 2026 canonical redirects
      { source: '/cyclone-alfred-queensland-2026', destination: '/events/cyclone-alfred-fnq-2026', permanent: true },
      { source: '/cyclone-alfred-2026', destination: '/events/cyclone-alfred-fnq-2026', permanent: true },
      { source: '/ex-tc-alfred-insurance-claim', destination: '/events/cyclone-alfred-fnq-2026', permanent: true },
      // DR-464/DR-469: Legacy WordPress URLs with old "Disaster Recovery QLD" branding → 301 to new pages
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us-disaster-recovery-qld-our-story', destination: '/about', permanent: true },
      { source: '/about-us-disaster-recovery-qld-our-story/:path*', destination: '/about', permanent: true },
      { source: '/location/disaster-recovery-qld-service-locations', destination: '/locations', permanent: true },
      { source: '/location/disaster-recovery-qld-service-locations/:path*', destination: '/locations', permanent: true },
      { source: '/wacol-queensland-australia', destination: '/locations', permanent: true },
      { source: '/water-damage-restoration-service/emergency-restoration-services', destination: '/services', permanent: true },
      { source: '/water-damage-restoration-service/emergency-restoration-services/:path*', destination: '/services', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.firebaseapp.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://*.stripe.com https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://*.stripe.com https://api.anthropic.com https://api.deepseek.com https://generativelanguage.googleapis.com https://*.firebaseapp.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://go.servicem8.com https://api.servicem8.com https://login.xero.com https://identity.xero.com https://api.xero.com https://appcenter.intuit.com https://oauth.platform.intuit.com https://quickbooks.api.intuit.com https://secure.myob.com https://api.myob.com https://api.ascora.com.au https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
              "frame-src 'self' https://*.firebaseapp.com https://*.stripe.com https://accounts.google.com https://www.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  experimental: {
    // optimizeCss: true, // Disabled - requires critters
    // Health-check audit C2 (P1, 2026-04-26): trimmed 5 server-only / unused
    // packages from this list. optimizePackageImports has overhead per entry
    // and is only beneficial for packages that are bundled into client code.
    // Server-only imports (@anthropic-ai/sdk, used solely in API routes) and
    // unused packages (@google/generative-ai, exceljs, pdfjs-dist, cmdk —
    // verified zero or near-zero client imports) added build memory pressure
    // for no client-bundle benefit.
    optimizePackageImports: [
      '@hookform/resolvers',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'date-fns',
      'framer-motion',
      'lucide-react',
      'react-day-picker',
      'react-hook-form',
      'recharts',
      'zod',
    ],
  },
  images: {
    // Enable Next.js image optimization (disabled: false)
    // This provides automatic WebP/AVIF conversion, lazy loading, and responsive image sizing
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
    // Supported image formats for automatic conversion
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for various breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // DR-719: cache optimised images for 1 year — hero WebPs are stable assets.
    // Default is 60 s which causes unnecessary re-optimisation on repeat visits.
    minimumCacheTTL: 31536000,
  },
}

export default withBundleAnalyzer(nextConfig)

/** @type {import('next').NextConfig} */

// Optional bundle analyzer - only load if installed
let withBundleAnalyzer = (config) => config;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  // Bundle analyzer not installed, continue without it
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Build checks
  // NOTE: ignoreBuildErrors kept true — ~200+ pre-existing TS errors across src/ need
  // a dedicated cleanup sprint before this can be set to false. See tsconfig excludes.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization (merged from .mjs + .js)
  images: {
    domains: [
      'disasterrecovery.com.au',
      'disaster-recovery-seven.vercel.app',
      'images.unsplash.com',
      'cloudinary.com',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for caching and security (merged from .mjs security + .js caching)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.vercel-insights.com https://*.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob: https://*.google-analytics.com https://*.googletagmanager.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://vitals.vercel-insights.com https://*.google-analytics.com https://*.clarity.ms https://*.googletagmanager.com",
              "frame-src 'self' https://*.googletagmanager.com https://www.youtube.com https://youtube.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
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
      // Group C — location pages now have rich data-driven content (Phase 1 shipped 2026-02-25)
      // brookwater/eagle-farm/indooroopilly redirect to /locations/brisbane
      // melbourne/perth/adelaide have dedicated JSON data files with verified ABS/BOM/ICA data
      {
        source: '/resources/disaster-prep-videos',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/resources/mold-prevention',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/resources/fire-safety',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/resources/water-damage-101',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/insurance/allianz',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/careers',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/logan-queensland',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      // Auth/utility pages — no SEO value, should not be indexed
      {
        source: '/login',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/signup',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // --- Existing redirects ---
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portal/connect',
        destination: '/claim',
        permanent: true,
      },
      {
        source: '/services/fire-smoke',
        destination: '/services/fire-damage-restoration',
        permanent: true,
      },

      // --- Phase 0: Conversion funnel fixes (2026-02-25) ---
      // /claim/start is a dead-end demo form — redirect all traffic to the working /claim form
      { source: '/claim/start', destination: '/claim', permanent: true },
      // Dead routes that 404 or lead to broken flows
      { source: '/client/emergency', destination: '/claim', permanent: true },
      { source: '/client/instant-quote', destination: '/claim', permanent: true },
      // /book-service funnel replaced by /claim — fake bank details removed
      { source: '/book-service', destination: '/claim', permanent: true },
      { source: '/book-service/payment', destination: '/claim', permanent: true },
      { source: '/book-service/success', destination: '/claim', permanent: true },
      { source: '/book-service/error', destination: '/claim', permanent: true },
      { source: '/ai-assessment', destination: '/tools/cost-estimator', permanent: true },
      { source: '/free-assessment', destination: '/tools/cost-estimator', permanent: true },
      { source: '/quote', destination: '/tools/cost-estimator', permanent: true },

      // --- Legacy WordPress → Next.js redirects (GSC 404 cleanup) ---

      // WordPress tag archives → blog (53 URLs)
      { source: '/tag/:slug*/feed', destination: '/blog', permanent: true },
      { source: '/tag/:slug*', destination: '/blog', permanent: true },

      // WordPress category archives → blog (4 URLs)
      { source: '/category/:slug*', destination: '/blog', permanent: true },

      // Old blog pagination → blog (8 URLs)
      { source: '/our-blog/:path*', destination: '/blog', permanent: true },
      { source: '/blog/', destination: '/blog', permanent: true },

      // Brisbane suburb redirects — these pages had no content, now redirect to rich Brisbane page
      { source: '/locations/brookwater', destination: '/locations/brisbane', permanent: true },
      { source: '/locations/eagle-farm', destination: '/locations/brisbane', permanent: true },
      { source: '/locations/indooroopilly', destination: '/locations/brisbane', permanent: true },

      // Old location pages → services (legacy WordPress slugs only)
      // Negative lookahead excludes slugs that have real page files in app/locations/
      { source: '/locations/:loc/water-damage-restoration', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/locations/:loc/fire-damage-restoration', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/locations/:loc/storm-damage-restoration', destination: '/services/storm-damage-restoration', permanent: true },
      { source: '/locations/:loc/mould-remediation', destination: '/services/mould-remediation', permanent: true },
      { source: '/locations/:loc((?!nsw|vic|qld|wa|sa|tas|nt|act|sydney|melbourne|brisbane|perth|adelaide|gold-coast|newcastle|auckland).*)', destination: '/services', permanent: true },
      { source: '/location/disaster-recovery-qld-service-locations/:slug*', destination: '/services', permanent: true },
      { source: '/location/:slug*', destination: '/services', permanent: true },

      // Old service hierarchy pages → new service pages (19 URLs)
      { source: '/water-damage-restoration-service/water-extraction-flood-recovery', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-damage-restoration-service/burst-pipes-restoration-services', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-damage-restoration-service/storm-damage-restoration-services', destination: '/services/storm-damage-restoration', permanent: true },
      { source: '/water-damage-restoration-service/thermography-services', destination: '/services/technical-assessment', permanent: true },
      { source: '/water-damage-restoration-service/structural-drying-restoration-services', destination: '/services/structural-drying', permanent: true },
      { source: '/water-damage-restoration-service/concrete-drying-services', destination: '/services/structural-drying', permanent: true },
      { source: '/water-damage-restoration-service/:slug*', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/fire-damage-restoration-service/:slug*', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/fire-remediation-services/:slug*', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/mould-remediation-services/:slug*', destination: '/services/mould-remediation', permanent: true },
      { source: '/sewage-cleanup-services/:slug*', destination: '/services/sewage-cleanup', permanent: true },
      { source: '/waste-management-services/:slug*', destination: '/services/sewage-cleanup', permanent: true },
      { source: '/building-restoration-services/:slug*', destination: '/services', permanent: true },

      // Old commercial/services pages → new equivalents (18 URLs)
      { source: '/services/commercial/:slug*', destination: '/services/commercial', permanent: true },
      { source: '/services/water-flood-services', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/services/mould-removal', destination: '/services/mould-remediation', permanent: true },
      { source: '/services/odour-measures', destination: '/services', permanent: true },
      { source: '/services/blasting', destination: '/services', permanent: true },
      { source: '/services/dry-fogging', destination: '/services', permanent: true },
      { source: '/services/vandalism', destination: '/services', permanent: true },
      { source: '/services/fire-damage-restoration/smoke-damage', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/services/fire-damage-restoration/soot-removal', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/services/fire-damage-restoration/structural-repairs', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/services/fire-damage-restoration/odour-removal', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/water-flood-services', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/fire-smoke', destination: '/services/fire-damage-restoration', permanent: true },
      { source: '/commercial', destination: '/services/commercial', permanent: true },
      { source: '/commercial/', destination: '/services/commercial', permanent: true },

      // Insurance partner pages → about (13 URLs)
      { source: '/insurance-partners/:slug', destination: '/about', permanent: true },
      { source: '/insurance-partners', destination: '/about', permanent: true },

      // Insurance guide pages → claim (7 URLs)
      { source: '/insurance-guide/:slug*', destination: '/claim', permanent: true },
      { source: '/insurance-guide', destination: '/claim', permanent: true },
      { source: '/insurance-claims', destination: '/claim', permanent: true },

      // About/story pages → about (10 URLs)
      { source: '/about-us-disaster-recovery-qld-our-story/:slug*', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-phil-mcgurk', destination: '/about', permanent: true },
      { source: '/phill-mcgurk-the-author', destination: '/about', permanent: true },

      // Video/course/lesson pages → homepage (9 URLs)
      { source: '/topic/:slug*', destination: '/', permanent: true },
      { source: '/lessons/:slug*', destination: '/', permanent: true },
      { source: '/courses/:slug*', destination: '/', permanent: true },

      // Old standalone service pages → new equivalents
      { source: '/water-damage-cleanup', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-damage-cleanup/', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-extraction', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-extraction/', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/mould-remediation', destination: '/services/mould-remediation', permanent: true },
      { source: '/odour-removal', destination: '/services', permanent: true },
      { source: '/biohazard-restoration', destination: '/services/biohazard-cleaning', permanent: true },
      { source: '/sanitisation', destination: '/services', permanent: true },
      { source: '/thermography', destination: '/services/technical-assessment', permanent: true },
      { source: '/commercial-restoration-services/:slug*', destination: '/services/commercial', permanent: true },
      { source: '/commercial-restoration-services', destination: '/services/commercial', permanent: true },
      { source: '/commercial-cleaning-services/:slug*', destination: '/services/commercial', permanent: true },
      { source: '/commercial-cleaning-services', destination: '/services/commercial', permanent: true },
      { source: '/commercial-cleaning-service', destination: '/services/commercial', permanent: true },

      // Old misc pages → new equivalents
      { source: '/service-areas', destination: '/services', permanent: true },
      { source: '/services/', destination: '/services', permanent: true },
      { source: '/resources/:slug*', destination: '/guides', permanent: true },
      { source: '/resources', destination: '/guides', permanent: true },
      { source: '/standards/:slug*', destination: '/certifications', permanent: true },
      { source: '/licenses-insurances/:slug*', destination: '/certifications', permanent: true },
      { source: '/licenses-insurances', destination: '/certifications', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/free-quote', destination: '/claim', permanent: true },
      { source: '/free-quote/', destination: '/claim', permanent: true },
      { source: '/get-help', destination: '/claim', permanent: true },
      { source: '/emergency-form', destination: '/claim', permanent: true },
      { source: '/assessment', destination: '/claim', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/reviews', destination: '/testimonials', permanent: true },
      // Self-referential /terms redirect removed — page exists at app/terms/
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/accessibility', destination: '/about', permanent: true },

      // Old location-specific blog posts → blog
      { source: '/cleaning/:slug*', destination: '/services', permanent: true },
      { source: '/cleaning__trashed/:slug*', destination: '/services', permanent: true },

      // Strata/property management pages → services
      { source: '/strata-remediation-services-:slug*', destination: '/services', permanent: true },
      { source: '/building-management-restoration-services-:slug*', destination: '/services', permanent: true },
      { source: '/property-maintenance-restoration-services-:slug*', destination: '/services', permanent: true },
      { source: '/packout-and-storage-services-:slug*', destination: '/services', permanent: true },
      { source: '/structural-and-specialised-drying-services-:slug*', destination: '/services/structural-drying', permanent: true },
      { source: '/structual-and-specialised-drying-services-:slug*', destination: '/services/structural-drying', permanent: true },

      // Old Queensland suburb pages → services
      { source: '/palm-beach-queensland', destination: '/services', permanent: true },
      { source: '/redland-bay-queensland', destination: '/services', permanent: true },
      { source: '/esk-queensland', destination: '/services', permanent: true },
      { source: '/wacol-queensland-australia', destination: '/services', permanent: true },
      { source: '/brisbane-australia', destination: '/services', permanent: true },
      { source: '/gold-coast-australia', destination: '/services', permanent: true },
      { source: '/ipswich-australia', destination: '/services', permanent: true },
      { source: '/logan-australia', destination: '/services', permanent: true },
      { source: '/toowoomba-regional-australia', destination: '/services', permanent: true },
      { source: '/moreton-bay-region-australia', destination: '/services', permanent: true },
      { source: '/scenic-rim-regional-australia', destination: '/services', permanent: true },
      { source: '/lockyer-valley-regional-australia', destination: '/services', permanent: true },
      { source: '/logan', destination: '/services', permanent: true },
      { source: '/ipswich', destination: '/services', permanent: true },
      { source: '/hamilton', destination: '/services', permanent: true },
      { source: '/hamilton/', destination: '/services', permanent: true },

      // --- Crawled-not-indexed cleanup (remaining old blog posts & pages) ---

      // Privacy/policy variants
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/privacy/', destination: '/privacy', permanent: true },

      // Old standalone blog posts → blog
      { source: '/specialized-chemical-range', destination: '/blog', permanent: true },
      { source: '/specialized-chemical-range/', destination: '/blog', permanent: true },
      { source: '/what-to-expect-to-pay-for-water-damage-restoration', destination: '/cost', permanent: true },
      { source: '/what-to-expect-to-pay-for-water-damage-restoration/', destination: '/cost', permanent: true },
      { source: '/what-are-the-4-stages-of-drying', destination: '/blog', permanent: true },
      { source: '/what-are-the-4-stages-of-drying/', destination: '/blog', permanent: true },
      { source: '/business-continuity-planning', destination: '/blog', permanent: true },
      { source: '/business-continuity-planning/', destination: '/blog', permanent: true },
      { source: '/business-interruption-loss-assessment', destination: '/blog', permanent: true },
      { source: '/business-interruption-loss-assessment/', destination: '/blog', permanent: true },
      { source: '/the-rising-cost-of-claims-why-restoration-matters', destination: '/blog', permanent: true },
      { source: '/the-rising-cost-of-claims-why-restoration-matters/', destination: '/blog', permanent: true },
      { source: '/preventing-business-interruptions', destination: '/blog', permanent: true },
      { source: '/preventing-business-interruptions/', destination: '/blog', permanent: true },
      { source: '/why-carpet-cleaning-is-crucial-in-water-damage-restoration-efforts', destination: '/blog', permanent: true },
      { source: '/why-carpet-cleaning-is-crucial-in-water-damage-restoration-efforts/', destination: '/blog', permanent: true },
      { source: '/prepare-for-bushfires-with-firefighting-equipment', destination: '/blog', permanent: true },
      { source: '/prepare-for-bushfires-with-firefighting-equipment/', destination: '/blog', permanent: true },
      { source: '/what-is-a-contents-cleaner', destination: '/blog', permanent: true },
      { source: '/what-is-a-contents-cleaner/', destination: '/blog', permanent: true },
      { source: '/carpet-cleaning', destination: '/services', permanent: true },
      { source: '/carpet-cleaning/', destination: '/services', permanent: true },
      { source: '/discreet-cleaning-services', destination: '/services', permanent: true },
      { source: '/discreet-cleaning-services/', destination: '/services', permanent: true },
      { source: '/trauma-cleanup-services', destination: '/services/trauma-cleanup', permanent: true },
      { source: '/trauma-cleanup-services/', destination: '/services/trauma-cleanup', permanent: true },
      { source: '/mould-removal', destination: '/services/mould-remediation', permanent: true },
      { source: '/mould-removal/', destination: '/services/mould-remediation', permanent: true },
      { source: '/mold-remediation', destination: '/services/mould-remediation', permanent: true },
      { source: '/mold-remediation/', destination: '/services/mould-remediation', permanent: true },
      { source: '/can-you-remediate-mold-yourself', destination: '/services/mould-remediation', permanent: true },
      { source: '/specialised-services', destination: '/services', permanent: true },
      { source: '/specialised-services/', destination: '/services', permanent: true },

      // Old Queensland suburb/region pages (crawled-not-indexed)
      { source: '/logan-queensland', destination: '/services', permanent: true },
      { source: '/palm-beach', destination: '/services', permanent: true },
      { source: '/redland-bay-australia', destination: '/services', permanent: true },
      { source: '/redland-bay-australia/', destination: '/services', permanent: true },
      { source: '/parkwood-queensland', destination: '/services', permanent: true },
      { source: '/parkwood-queensland/', destination: '/services', permanent: true },

      // Soft 404 fixes — actual 404s needing redirects
      // Legal pages (old slugs → correct current paths)
      { source: '/legal/contractor', destination: '/legal/contractor-network', permanent: true },
      { source: '/legal/terms', destination: '/legal/forms/terms-of-service', permanent: true },
      { source: '/legal/accessibility', destination: '/legal', permanent: true },
      { source: '/legal/privacy', destination: '/legal/forms/privacy-policy', permanent: true },

      // Utility pages (no longer exist)
      { source: '/sign-in', destination: '/', permanent: true },
      { source: '/help', destination: '/claim', permanent: true },
      { source: '/find-contractor', destination: '/claim', permanent: true },
      { source: '/claim/submit', destination: '/claim', permanent: true },

      // Old WordPress blog posts (soft 404)
      { source: '/allergen-containment-abilities-of-vacuum-cleaners', destination: '/blog', permanent: true },
      { source: '/allergen-containment-abilities-of-vacuum-cleaners/', destination: '/blog', permanent: true },
      { source: '/dealing-with-contaminated-water-damage', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/dealing-with-contaminated-water-damage/', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/be-prepared-for-fire-season', destination: '/blog', permanent: true },
      { source: '/be-prepared-for-fire-season/', destination: '/blog', permanent: true },
      { source: '/water-damage-restoration-services', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/water-damage-restoration-services/', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/blog/flood-damage-restoration-companies', destination: '/blog', permanent: true },
      { source: '/blog/preventing-business-interruptions', destination: '/blog', permanent: true },
      { source: '/blog/water-damage-restoration-services', destination: '/blog', permanent: true },

      // UTM-tagged legacy WordPress posts (soft 404 — match without query string)
      { source: '/biohazard-remediation-services', destination: '/services/biohazard-cleaning', permanent: true },
      { source: '/biohazard-remediation-services/', destination: '/services/biohazard-cleaning', permanent: true },
      { source: '/things-to-do-and-places-to-visit-in-brisbane-queensland', destination: '/blog', permanent: true },
      { source: '/things-to-do-and-places-to-visit-in-brisbane-queensland/', destination: '/blog', permanent: true },
      { source: '/things-to-do-and-places-to-visit-in-logan-city-queensland', destination: '/blog', permanent: true },
      { source: '/things-to-do-and-places-to-visit-in-logan-city-queensland/', destination: '/blog', permanent: true },

      // Page with redirect — trailing-slash strip lands on 404
      { source: '/vandalism', destination: '/services', permanent: true },
      { source: '/vandalism/', destination: '/services', permanent: true },

      // Indexed pages returning 404 — critical fixes
      { source: '/join', destination: '/signup', permanent: true },
      { source: '/pricing', destination: '/cost', permanent: true },
      { source: '/brisbane', destination: '/locations/brisbane', permanent: true },

      // Group A soft 404s — "Service Not Found" pages (slug not recognised by [category] route)
      { source: '/services/flood', destination: '/services/flood-damage-restoration', permanent: true },
      { source: '/services/mould', destination: '/services/mould-remediation', permanent: true },
      { source: '/services/emergency', destination: '/services/emergency-response', permanent: true },
      { source: '/services/water-flood-restoration', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/services/mould-air-quality', destination: '/services/mould-remediation', permanent: true },
      { source: '/services/bio-forensic-cleaning', destination: '/services/biohazard-cleaning', permanent: true },
      { source: '/services/fire-smoke-remediation', destination: '/services/fire-damage-restoration', permanent: true },

      // Indexed page returning "Service Not Found" — active in Google index
      { source: '/services/fire-smoke-damage', destination: '/services/fire-damage-restoration', permanent: true },

      // --- Duplicate content consolidation (keyword cannibalisation prevention) ---
      { source: '/services/biohazard', destination: '/services/biohazard-cleaning', permanent: true },
      { source: '/services/commercial', destination: '/services/commercial-services', permanent: true },
      { source: '/compare/professional-vs-diy', destination: '/compare/diy-vs-professional', permanent: true },
      { source: '/property-types/residential-homes', destination: '/property-types/residential', permanent: true },
      { source: '/property-types/strata-properties', destination: '/property-types/strata', permanent: true },
      { source: '/property-types/government-facilities', destination: '/property-types/government', permanent: true },
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/v1/:path*',
          destination: '/api/:path*',
        },
      ],
    };
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // Webpack configuration (chunk-splitting from .js + node fallbacks from .mjs)
  webpack: (config, { isServer, dev }) => {
    // Optimize chunks for production client builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\\\/]node_modules[\\\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const crypto = require('crypto');
              const hash = crypto.createHash('sha256');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Module replacements for smaller bundles
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'lodash': 'lodash-es',
      };
      // Node module fallbacks for client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    return config;
  },

  // Experimental features (merged)
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'recharts',
      'date-fns',
      '@headlessui/react',
      'gsap',
      'chart.js',
    ],
    webVitalsAttribution: ['CLS', 'LCP'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  distDir: '.next',
};

module.exports = withBundleAnalyzer(nextConfig);

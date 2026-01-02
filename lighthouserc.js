module.exports = {
  ci: {
    collect: {
      // Collect settings
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/pricing',
        'http://localhost:3000/contact',
        'http://localhost:3000/dashboard',
      ],
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance budgets
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],

        // Accessibility
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'warn',
        'valid-lang': 'error',

        // Best Practices
        'errors-in-console': 'warn',
        'no-vulnerable-libraries': 'error',
        'uses-http2': 'warn',
        'uses-responsive-images': 'warn',

        // SEO
        'meta-description': 'warn',
        'link-text': 'warn',
        'crawlable-anchors': 'warn',
        'is-crawlable': 'error',

        // Resource optimization
        'unused-javascript': ['warn', { maxLength: 0 }],
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'uses-text-compression': 'error',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'offscreen-images': 'warn',

        // Security
        'is-on-https': 'error',
        'uses-http2': 'warn',
      },
    },
  },
};

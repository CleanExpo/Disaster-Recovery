// Comprehensive Lighthouse optimization checklist and utilities

export const lighthouseOptimizations = {
  // Performance optimizations (Weight: 30%)
  performance: {
    fcp: { // First Contentful Paint
      target: '< 1.8s',
      optimizations: [
        'Inline critical CSS',
        'Preload key resources',
        'Reduce server response time',
        'Eliminate render-blocking resources',
      ],
    },
    lcp: { // Largest Contentful Paint
      target: '< 2.5s',
      optimizations: [
        'Optimize images with next/image',
        'Use CDN for static assets',
        'Preload LCP image',
        'Use efficient cache policy',
      ],
    },
    fid: { // First Input Delay
      target: '< 100ms',
      optimizations: [
        'Break up long tasks',
        'Use web workers for heavy computation',
        'Optimize JavaScript execution',
        'Reduce JavaScript bundle size',
      ],
    },
    cls: { // Cumulative Layout Shift
      target: '< 0.1',
      optimizations: [
        'Set explicit dimensions for images/videos',
        'Avoid inserting content above existing content',
        'Use transform animations instead of layout properties',
        'Preload fonts',
      ],
    },
    ttfb: { // Time to First Byte
      target: '< 0.8s',
      optimizations: [
        'Use efficient server infrastructure',
        'Enable compression',
        'Optimize database queries',
        'Use CDN',
      ],
    },
    tti: { // Time to Interactive
      target: '< 3.8s',
      optimizations: [
        'Minimize main thread work',
        'Reduce JavaScript execution time',
        'Optimize third-party scripts',
        'Use code splitting',
      ],
    },
    tbt: { // Total Blocking Time
      target: '< 200ms',
      optimizations: [
        'Minimize long tasks',
        'Optimize JavaScript bundles',
        'Defer non-critical JavaScript',
        'Use requestIdleCallback for non-urgent work',
      ],
    },
    si: { // Speed Index
      target: '< 3.4s',
      optimizations: [
        'Optimize critical rendering path',
        'Minimize main thread work',
        'Reduce JavaScript execution time',
        'Optimize CSS delivery',
      ],
    },
  },

  // Accessibility optimizations (Weight: 30%)
  accessibility: {
    colorContrast: {
      requirement: 'WCAG AAA (7:1 for normal text, 4.5:1 for large text)',
      implementation: 'Use color palette with proper contrast ratios',
    },
    ariaLabels: {
      requirement: 'All interactive elements must have accessible names',
      implementation: 'Add aria-label, aria-labelledby, or visible text',
    },
    altText: {
      requirement: 'All images must have alt text',
      implementation: 'Provide descriptive alt text or empty alt="" for decorative images',
    },
    headingOrder: {
      requirement: 'Headings must be in sequential order',
      implementation: 'Use h1-h6 tags in proper hierarchy',
    },
    landmarks: {
      requirement: 'Page must have proper landmark regions',
      implementation: 'Use semantic HTML5 elements (header, nav, main, footer)',
    },
    focusIndicators: {
      requirement: 'All interactive elements must have visible focus indicators',
      implementation: 'Use focus:ring or custom focus styles',
    },
    skipLinks: {
      requirement: 'Provide skip navigation links',
      implementation: 'Add "Skip to main content" link at page start',
    },
    formLabels: {
      requirement: 'All form inputs must have labels',
      implementation: 'Use <label> elements or aria-label',
    },
    language: {
      requirement: 'Page must have lang attribute',
      implementation: 'Add lang="en-AU" to html element',
    },
    viewport: {
      requirement: 'Page must be mobile-friendly',
      implementation: 'Use responsive design and proper viewport meta tag',
    },
  },

  // Best Practices (Weight: 25%)
  bestPractices: {
    https: {
      requirement: 'Use HTTPS',
      implementation: 'Enable SSL certificate',
    },
    mixedContent: {
      requirement: 'No mixed content',
      implementation: 'Load all resources over HTTPS',
    },
    consoleErrors: {
      requirement: 'No browser errors',
      implementation: 'Fix all JavaScript errors',
    },
    imageAspectRatio: {
      requirement: 'Maintain image aspect ratios',
      implementation: 'Use proper width/height attributes',
    },
    doctype: {
      requirement: 'Use HTML5 doctype',
      implementation: '<!DOCTYPE html>',
    },
    charset: {
      requirement: 'Document has valid charset',
      implementation: '<meta charset="utf-8">',
    },
    vulnerabilities: {
      requirement: 'No known vulnerabilities',
      implementation: 'Keep dependencies updated',
    },
    notifications: {
      requirement: 'Request notification permission responsibly',
      implementation: 'Only request when user action triggers it',
    },
    passwords: {
      requirement: 'Allow password pasting',
      implementation: "Don't prevent paste on password fields",
    },
  },

  // SEO optimizations (Weight: 15%)
  seo: {
    title: {
      requirement: 'Page has title',
      implementation: 'Use unique, descriptive titles < 60 chars',
    },
    metaDescription: {
      requirement: 'Page has meta description',
      implementation: 'Write compelling descriptions < 160 chars',
    },
    crawlable: {
      requirement: 'Page is crawlable',
      implementation: 'Check robots.txt and meta robots',
    },
    canonical: {
      requirement: 'Document has valid canonical',
      implementation: 'Add canonical URL to prevent duplicates',
    },
    structuredData: {
      requirement: 'Valid structured data',
      implementation: 'Use schema.org JSON-LD',
    },
    hreflang: {
      requirement: 'Valid hreflang (if applicable)',
      implementation: 'Use proper language/region codes',
    },
    fontSize: {
      requirement: 'Font sizes are legible',
      implementation: 'Use minimum 12px font size',
    },
    tapTargets: {
      requirement: 'Tap targets are sized appropriately',
      implementation: 'Minimum 48x48px for touch targets',
    },
  },

  // PWA optimizations (Optional but recommended)
  pwa: {
    manifest: {
      requirement: 'Web app manifest',
      implementation: 'Create manifest.json with required fields',
    },
    serviceWorker: {
      requirement: 'Service worker for offline',
      implementation: 'Implement basic caching strategy',
    },
    icons: {
      requirement: 'App icons',
      implementation: 'Provide 192x192 and 512x512 icons',
    },
    themeColor: {
      requirement: 'Theme color meta tag',
      implementation: '<meta name="theme-color">',
    },
    viewport: {
      requirement: 'Viewport meta tag',
      implementation: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    },
    appleTouchIcon: {
      requirement: 'Apple touch icon',
      implementation: '<link rel="apple-touch-icon">',
    },
  },
};

// Helper function to generate optimization report
export function generateOptimizationReport(scores: {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa?: number;
}) {
  const report = {
    overall: Math.round((scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4),
    scores,
    recommendations: [] as string[],
  };

  if (scores.performance < 100) {
    report.recommendations.push('Optimize performance metrics (LCP, FCP, CLS)');
  }
  if (scores.accessibility < 100) {
    report.recommendations.push('Fix accessibility issues (contrast, ARIA labels)');
  }
  if (scores.bestPractices < 100) {
    report.recommendations.push('Follow web best practices');
  }
  if (scores.seo < 100) {
    report.recommendations.push('Improve SEO metadata');
  }

  return report;
}

// Resource hints for performance
export const resourceHints = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
`;

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical CSS for immediate rendering */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  .hero { min-height: 600px; background: linear-gradient(180deg, #1e40af, #2563eb); }
  .btn { display: inline-block; padding: 0.75rem 2rem; background: #f97316; color: white; text-decoration: none; border-radius: 0.5rem; }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;
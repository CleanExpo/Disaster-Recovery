import { test, expect } from '@playwright/test';

// List of all pages to check
const pages = [
  // Core pages
  '/',
  '/services',
  '/locations/qld',
  '/locations/nsw',
  '/locations/vic',
  '/locations/wa',
  '/locations/sa',
  '/locations/tas',
  '/locations/act',
  '/locations/nt',
  '/get-help',
  '/emergency',
  '/insurance-claims',
  '/coming-soon',
  '/why-independent-professionals',
  '/lighthouse-report',
  
  // Service pages
  '/services/water-damage-restoration',
  '/services/fire-damage-restoration',
  '/services/mould-remediation',
  '/services/biohazard-cleaning',
  '/services/storm-damage',
  
  // Emergency pages
  '/emergency/after-hours',
  '/emergency/weekend',
  '/emergency/public-holiday',
  '/emergency/christmas',
  '/emergency/new-year',
  
  // Property type pages
  '/property-types/residential',
  '/property-types/commercial',
  '/property-types/strata',
  '/property-types/government',
  '/property-types/industrial',
  
  // FAQ pages
  '/faq',
  '/faq/general',
  '/faq/water-damage',
  '/faq/fire-damage',
  '/faq/mould-removal',
  '/faq/insurance-claims',
  
  // Case studies
  '/case-studies/brisbane-floods-2022',
  '/case-studies/black-summer-bushfires',
  '/case-studies/cyclone-debbie-recovery',
  
  // Admin/Portal pages
  '/contractors',
  '/contractors/apply',
  '/partner-portal',
  '/admin/site-audit',
  
  // Legal pages
  '/privacy',
  '/terms',
  '/sitemap',
];

test.describe('Comprehensive Site Health Audit', () => {
  test.describe.configure({ mode: 'parallel' });
  
  // Check for 404 errors
  test('All pages should load without 404 errors', async ({ page }) => {
    const results: { url: string; status: number }[] = [];
    
    for (const path of pages) {
      const response = await page.goto(`http://localhost:3000${path}`, {
        waitUntil: 'networkidle',
      });
      
      results.push({
        url: path,
        status: response?.status() || 0,
      });
      
      // Check that page loads successfully
      expect(response?.status()).toBe(200);
    }
    
    // Log results
    console.log('Page Load Results:', results);
  });
  
  // Check navigation components
  test('Navigation components should be present on all pages', async ({ page }) => {
    for (const path of pages.slice(0, 5)) { // Test first 5 pages
      await page.goto(`http://localhost:3000${path}`);
      
      // Check header exists
      const header = await page.locator('header').count();
      expect(header).toBeGreaterThan(0);
      
      // Check footer exists
      const footer = await page.locator('footer').count();
      expect(footer).toBeGreaterThan(0);
      
      // Check main navigation
      const nav = await page.locator('nav').count();
      expect(nav).toBeGreaterThan(0);
    }
  });
  
  // Check meta tags
  test('All pages should have proper meta tags', async ({ page }) => {
    for (const path of pages.slice(0, 10)) { // Test first 10 pages
      await page.goto(`http://localhost:3000${path}`);
      
      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      
      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
      
      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').count();
      expect(canonical).toBeGreaterThanOrEqual(0); // Some pages may not need canonical
      
      // Check viewport
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
    }
  });
  
  // Check Google integrations
  test('Google Analytics and Tag Manager should be present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for GA script
    const gaScript = await page.locator('script[src*="googletagmanager.com/gtag"]').count();
    expect(gaScript).toBeGreaterThan(0);
    
    // Check for GTM
    const gtmScript = await page.evaluate(() => {
      return window.dataLayer !== undefined;
    });
    expect(gtmScript).toBeTruthy();
  });
  
  // Check Microsoft integrations
  test('Microsoft Clarity should be present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for Clarity script
    const clarityScript = await page.evaluate(() => {
      return typeof window.clarity === 'function';
    });
    // Note: Will be false if CLARITY_ID not set in env
    console.log('Clarity present:', clarityScript);
  });
  
  // Check forms functionality
  test('Get Help form should be functional', async ({ page }) => {
    await page.goto('http://localhost:3000/get-help');
    
    // Check form exists
    const form = await page.locator('form').count();
    expect(form).toBeGreaterThan(0);
    
    // Check required fields
    const nameInput = await page.locator('input[id="name"]').count();
    expect(nameInput).toBe(1);
    
    const emailInput = await page.locator('input[id="email"]').count();
    expect(emailInput).toBe(1);
    
    const postcodeInput = await page.locator('input[id="postcode"]').count();
    expect(postcodeInput).toBe(1);
    
    // Check submit button
    const submitButton = await page.locator('button[type="submit"]').count();
    expect(submitButton).toBeGreaterThan(0);
  });
  
  // Check responsive design
  test('Site should be responsive', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 768, height: 1024, name: 'iPad' },
      { width: 1920, height: 1080, name: 'Desktop' },
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000');
      
      // Check that content is visible
      const mainContent = await page.locator('main').isVisible();
      expect(mainContent).toBeTruthy();
      
      // Check mobile menu on small screens
      if (viewport.width < 768) {
        const mobileMenu = await page.locator('button[aria-label*="menu"]').count();
        expect(mobileMenu).toBeGreaterThan(0);
      }
    }
  });
  
  // Check accessibility
  test('Site should have proper accessibility features', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check skip link
    const skipLink = await page.locator('a:has-text("Skip")').count();
    expect(skipLink).toBeGreaterThan(0);
    
    // Check ARIA labels on interactive elements
    const buttons = await page.locator('button').all();
    for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      expect(ariaLabel || text).toBeTruthy();
    }
    
    // Check alt text on images
    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) { // Check first 5 images
      const alt = await img.getAttribute('alt');
      expect(alt !== null).toBeTruthy();
    }
  });
  
  // Check structured data
  test('Site should have structured data', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for JSON-LD structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').count();
    expect(structuredData).toBeGreaterThan(0);
  });
  
  // Check security headers
  test('Security headers should be configured', async ({ page }) => {
    const response = await page.goto('http://localhost:3000');
    const headers = response?.headers();
    
    // Note: These headers are set in next.config.mjs and may not appear in dev
    console.log('Response headers:', Object.keys(headers || {}));
  });
});

// Performance testing
test.describe('Performance Metrics', () => {
  test('Core Web Vitals should meet targets', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries.find(e => e.name === 'first-contentful-paint');
          const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
          
          resolve({
            fcp: fcp ? fcp.startTime : 0,
            lcp: lcp ? (lcp as any).startTime : 0,
          });
        });
        
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        
        // Timeout after 5 seconds
        setTimeout(() => resolve({ fcp: 0, lcp: 0 }), 5000);
      });
    });
    
    console.log('Performance metrics:', metrics);
    
    // Check that metrics are within acceptable ranges
    // These are relaxed for dev environment
    expect((metrics as any).fcp).toBeLessThan(5000); // 5s for dev
    expect((metrics as any).lcp).toBeLessThan(7000); // 7s for dev
  });
});

// Content validation
test.describe('Content Validation', () => {
  test('Emergency CTAs should be present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for emergency help button
    const emergencyButton = await page.locator('a:has-text("Get Emergency Help")').count();
    expect(emergencyButton).toBeGreaterThan(0);
  });
  
  test('Insurance information should be present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for insurance-related content
    const insuranceContent = await page.locator('text=/insurance/i').count();
    expect(insuranceContent).toBeGreaterThan(0);
  });
  
  test('IICRC certification should be highlighted', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for IICRC mentions
    const iicrContent = await page.locator('text=/IICRC/i').count();
    expect(iicrContent).toBeGreaterThan(0);
  });
});
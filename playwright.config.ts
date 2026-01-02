import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Disaster Recovery - NRPG Platform
 *
 * Complete E2E testing setup supporting:
 * - Desktop browsers (Chrome, Firefox, Safari)
 * - Mobile browsers (Mobile Chrome, Mobile Safari)
 * - Visual regression testing
 * - Accessibility testing
 * - Performance monitoring
 * - Cross-browser compatibility
 */

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
    ['list'],
    // GitHub Actions reporter for CI/CD
    process.env.CI ? ['github'] : ['line'],
  ],

  // Global settings
  use: {
    // Base URL
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Trace settings
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',

    // Screenshot settings
    screenshot: 'only-on-failure',

    // Video settings
    video: process.env.CI ? 'retain-on-failure' : 'off',

    // Action timeout
    actionTimeout: 15000,

    // Navigation timeout
    navigationTimeout: 30000,

    // Locale and timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',

    // Viewport (default, can be overridden in projects)
    viewport: { width: 1280, height: 720 },

    // Permissions
    permissions: [],

    // Geolocation (for disaster location testing)
    geolocation: { latitude: 40.7128, longitude: -74.0060 }, // New York

    // User agent
    userAgent: undefined, // Use default
  },

  // Test timeout
  timeout: 60000,

  // Expect timeout
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
    },
  },

  // Projects - Desktop Browsers
  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Desktop Chrome
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    // Desktop Safari
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    // Mobile Chrome (Android)
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        isMobile: true,
        hasTouch: true,
      },
      dependencies: ['setup'],
    },

    // Mobile Safari (iOS)
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        isMobile: true,
        hasTouch: true,
      },
      dependencies: ['setup'],
    },

    // Tablet - iPad
    {
      name: 'iPad',
      use: {
        ...devices['iPad Pro'],
        isMobile: true,
        hasTouch: true,
      },
      dependencies: ['setup'],
    },

    // High DPI Display
    {
      name: 'chromium-hidpi',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2,
      },
      dependencies: ['setup'],
    },
  ],

  // Web server configuration
  webServer: {
    command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev',
    url: process.env.BASE_URL || 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Output directory
  outputDir: 'test-results/',

  // Snapshot path template
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
});

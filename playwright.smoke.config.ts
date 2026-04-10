import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke test config — targets a Vercel preview deployment.
 *
 * Usage:
 *   SMOKE_BASE_URL=https://your-preview.vercel.app npx playwright test \
 *     --config=playwright.smoke.config.ts
 *
 * In CI the SMOKE_BASE_URL is set from the Vercel preview URL output.
 * Chromium only — fast single-browser pass, not a cross-browser suite.
 */

const baseURL = process.env.SMOKE_BASE_URL;

if (!baseURL) {
  throw new Error(
    'SMOKE_BASE_URL must be set. ' +
      'Example: SMOKE_BASE_URL=https://dr-preview-xxx.vercel.app npx playwright test --config=playwright.smoke.config.ts'
  );
}

export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: false,
  forbidOnly: true,
  retries: 1,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report/smoke' }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    // Bypass Vercel authentication prompt on preview deployments
    extraHTTPHeaders: {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

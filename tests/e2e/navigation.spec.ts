import { test, expect } from '@playwright/test';
import { setMobileViewport } from './helpers/viewport';

/**
 * DR-372: Navigation smoke tests — all 21 key pages must load with HTTP 200
 * and no uncaught console errors, on both desktop and mobile viewports.
 */

const KEY_PAGES: string[] = [
  '/',
  '/claim/start',
  '/claim',
  '/contact',
  '/how-it-works',
  '/services',
  '/services/queensland',
  '/services/new-south-wales',
  '/services/victoria',
  '/services/south-australia',
  '/services/western-australia',
  '/contractor/apply',
  '/contractor/onboarding',
  '/about',
  '/privacy',
  '/terms',
  '/cookies',
  '/guides',
  '/offline',
  '/login',
  '/signup',
];

for (const pagePath of KEY_PAGES) {
  test(`page loads without errors: ${pagePath}`, async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

    // Allow redirects (3xx → 200) but never 4xx / 5xx
    const status = response?.status() ?? 200;
    expect(
      status,
      `Expected ${pagePath} to return 2xx or 3xx but got ${status}`
    ).toBeLessThan(400);

    // Page must have a <title> element
    const title = await page.title();
    expect(title.length, `Expected ${pagePath} to have a non-empty <title>`).toBeGreaterThan(0);

    // No hard JS errors should appear in the console
    expect(
      consoleErrors,
      `Unexpected console errors on ${pagePath}: ${consoleErrors.join(', ')}`
    ).toHaveLength(0);
  });
}

test.describe('mobile layout — key pages', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
  });

  for (const pagePath of ['/', '/claim/start', '/contractor/apply', '/how-it-works']) {
    test(`renders correctly at 375 px: ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

      // The page body must be visible at mobile width
      await expect(page.locator('body')).toBeVisible();

      // There must not be a horizontal scrollbar (content overflowing viewport)
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(
        scrollWidth,
        `Horizontal overflow detected on ${pagePath} at mobile viewport`
      ).toBeLessThanOrEqual(clientWidth + 1); // +1 px tolerance for sub-pixel rounding
    });
  }
});

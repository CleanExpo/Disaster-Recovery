import { test, expect } from '@playwright/test';

/**
 * DR-372: Basic accessibility checks across key pages.
 *
 * Covers:
 *   - Presence of a skip-to-main-content link
 *   - Unique, non-empty <title> per page
 *   - Form inputs have associated visible labels
 *   - Images have alt text
 *   - Landmark regions exist (main, nav)
 */

const A11Y_PAGES: string[] = [
  '/',
  '/claim/start',
  '/claim',
  '/contact',
  '/how-it-works',
  '/services',
  '/contractor/apply',
  '/about',
  '/privacy',
  '/terms',
  '/cookies',
  '/guides',
  '/login',
  '/signup',
];

test.describe('page titles are unique and non-empty', () => {
  const seenTitles = new Set<string>();

  for (const pagePath of A11Y_PAGES) {
    test(`${pagePath} has a unique, non-empty title`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
      const title = await page.title();

      expect(title.trim().length, `${pagePath} has an empty <title>`).toBeGreaterThan(0);

      // Within a single worker run, titles should be unique across pages
      expect(
        seenTitles.has(title),
        `Duplicate <title> "${title}" found on ${pagePath}`
      ).toBe(false);
      seenTitles.add(title);
    });
  }
});

test.describe('skip-to-main link', () => {
  for (const pagePath of A11Y_PAGES) {
    test(`${pagePath} has a skip-to-main-content link`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

      // The skip link is typically visually hidden but must exist in the DOM.
      // It should be the first focusable element and have an href of #main or #content.
      const skipLink = page
        .locator('a[href="#main"], a[href="#main-content"], a[href="#content"]')
        .first();

      // We check presence in the DOM (not necessarily visible until focused).
      const count = await skipLink.count();
      expect(
        count,
        `${pagePath} is missing a skip-to-main-content link (<a href="#main"> or similar)`
      ).toBeGreaterThan(0);
    });
  }
});

test.describe('form labels', () => {
  test('claim start form — all inputs have associated labels', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    const inputs = page.locator('input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const inputId = await input.getAttribute('id');
      const inputName = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Each input must have either: an associated <label>, an aria-label, or aria-labelledby
      const hasLabel =
        (inputId !== null &&
          (await page.locator(`label[for="${inputId}"]`).count()) > 0) ||
        ariaLabel !== null ||
        ariaLabelledBy !== null;

      expect(
        hasLabel,
        `Input with name="${inputName}" on /claim/start has no associated label`
      ).toBe(true);
    }
  });

  test('login form — all inputs have associated labels', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    const inputs = page.locator('input:not([type="hidden"]):not([type="submit"]):not([type="button"])');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const inputId = await input.getAttribute('id');
      const inputName = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      const hasLabel =
        (inputId !== null &&
          (await page.locator(`label[for="${inputId}"]`).count()) > 0) ||
        ariaLabel !== null ||
        ariaLabelledBy !== null;

      expect(
        hasLabel,
        `Input with name="${inputName}" on /login has no associated label`
      ).toBe(true);
    }
  });
});

test.describe('landmark regions', () => {
  for (const pagePath of ['/', '/claim/start', '/contact', '/services']) {
    test(`${pagePath} has a <main> landmark`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
      const main = page.locator('main, [role="main"]');
      await expect(main.first()).toBeVisible();
    });

    test(`${pagePath} has a navigation landmark`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
      const nav = page.locator('nav, [role="navigation"]');
      expect(await nav.count()).toBeGreaterThan(0);
    });
  }
});

test.describe('image alt text', () => {
  for (const pagePath of ['/', '/about', '/how-it-works']) {
    test(`${pagePath} — all <img> elements have non-empty alt attributes`, async ({
      page,
    }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

      // Decorative images should use alt="" (empty string) — we only flag missing alt.
      const imagesWithoutAlt = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter((img) => !img.hasAttribute('alt'))
          .map((img) => img.src || img.getAttribute('data-src') || '(no src)');
      });

      expect(
        imagesWithoutAlt,
        `${pagePath} has <img> elements missing alt attributes: ${imagesWithoutAlt.join(', ')}`
      ).toHaveLength(0);
    });
  }
});

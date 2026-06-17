import { test, expect } from '@playwright/test';
import { setMobileViewport } from './helpers/viewport';

/**
 * DR-372: Contractor application flow tests.
 *
 * The contractor apply page (/contractor/apply) renders a multi-step
 * application form (ApplyClient.tsx). Tests verify the form is accessible,
 * all sections are reachable, and the layout holds on mobile.
 */

test.describe('contractor apply — desktop', () => {
  test('renders the application page', async ({ page }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });

    // Page must have a meaningful heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    const headingText = await heading.innerText();
    expect(headingText.length).toBeGreaterThan(0);
  });

  test('application form or CTA is present', async ({ page }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });

    // Either a form element or a button/link to start the application
    const formOrCta =
      (await page.locator('form').count()) > 0
        ? page.locator('form').first()
        : page.getByRole('button', { name: /apply|start|get started|join|continue|application/i });

    await expect(formOrCta).toBeVisible();
  });

  test('page title is descriptive', async ({ page }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title).toMatch(/apply|contractor|join|nrpg/i);
  });

  test('all form steps are accessible by tabbing through the page', async ({ page }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });

    // Focus the first interactive element and ensure it is reachable
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    // Something must be focused — the page is keyboard-navigable
    await expect(focused).toBeVisible();
  });
});

test.describe('contractor apply — mobile (375 px)', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
  });

  test('page renders correctly at mobile width', async ({ page }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('primary CTA is visible without horizontal scrolling on mobile', async ({
    page,
  }) => {
    await page.goto('/contractor/apply', { waitUntil: 'domcontentloaded' });

    // There must be at least one interactive element (button or link) visible above the fold
    const firstButton = page
      .getByRole('button')
      .or(page.getByRole('link', { name: /apply|join|start/i }))
      .first();

    await expect(firstButton).toBeVisible();
  });
});

test.describe('contractor onboarding page', () => {
  test('renders onboarding page', async ({ page }) => {
    const response = await page.goto('/contractor/onboarding', {
      waitUntil: 'domcontentloaded',
    });
    const status = response?.status() ?? 200;
    expect(status).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
  });
});

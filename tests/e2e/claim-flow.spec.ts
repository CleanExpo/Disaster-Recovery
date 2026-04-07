import { test, expect } from '@playwright/test';
import { setMobileViewport } from './helpers/viewport';

/**
 * DR-372: Client claim submission flow tests.
 *
 * The ClaimStartClient form uses native `name` attributes:
 *   name, email, address, insuranceCompany, claimNumber,
 *   incidentType (select), incidentDate, description, urgency (radio)
 *
 * On successful submission the app redirects to /track/<claimId> or
 * renders a success confirmation on the same page.
 */

test.describe('claim flow — desktop', () => {
  test('renders the claim start form', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    // Core fields must be present
    await expect(page.locator('[name="name"]')).toBeVisible();
    await expect(page.locator('[name="email"]')).toBeVisible();
    await expect(page.locator('[name="address"]')).toBeVisible();
    await expect(page.locator('[name="description"]')).toBeVisible();
  });

  test('validates required fields before submission', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    // Submit with empty form — expect to stay on the same page
    const submitButton = page.getByRole('button', { name: /submit|send claim|lodge/i });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Should remain on /claim/start (no redirect)
      await expect(page).toHaveURL(/\/claim\/start/);
    }
  });

  test('fills all fields and submits the claim form', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    // Fill contact details
    await page.locator('[name="name"]').fill('Jane Smith');
    await page.locator('[name="email"]').fill('jane.smith@example.com');
    await page.locator('[name="address"]').fill('42 Test Street, Sydney NSW 2000');

    // Optionally fill insurer fields if present
    const insuranceField = page.locator('[name="insuranceCompany"]');
    if (await insuranceField.isVisible()) {
      await insuranceField.fill('Test Insurer Pty Ltd');
    }

    // Select incident type if it's a <select>
    const incidentTypeSelect = page.locator('[name="incidentType"]');
    if (await incidentTypeSelect.isVisible()) {
      await incidentTypeSelect.selectOption({ index: 1 });
    }

    // Fill incident date if present
    const incidentDateField = page.locator('[name="incidentDate"]');
    if (await incidentDateField.isVisible()) {
      await incidentDateField.fill('2026-03-15');
    }

    // Fill description
    await page.locator('[name="description"]').fill(
      'Water damage from burst pipe in kitchen — affecting floor and cabinetry.'
    );

    // Submit
    const submitButton = page.getByRole('button', { name: /submit|send claim|lodge/i });
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // After submission: expect either a redirect to /track/ or a success indicator
      await page.waitForURL(
        (url) =>
          url.pathname.startsWith('/track/') ||
          url.pathname === '/claim/start',
        { timeout: 15_000 }
      );

      const currentUrl = page.url();
      const onTrackPage = currentUrl.includes('/track/');
      const successVisible = await page
        .getByText(/claim submitted|thank you|we.ll be in touch|received/i)
        .isVisible()
        .catch(() => false);

      expect(
        onTrackPage || successVisible,
        'Expected a success state after claim submission (redirect to /track/ or success message)'
      ).toBe(true);
    }
  });
});

test.describe('claim flow — mobile (375 px)', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
  });

  test('claim form is fully visible and usable on mobile', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('[name="name"]')).toBeVisible();
    await expect(page.locator('[name="email"]')).toBeVisible();
    await expect(page.locator('[name="address"]')).toBeVisible();
    await expect(page.locator('[name="description"]')).toBeVisible();

    // All fields must be within the viewport — no horizontal overflow
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('can type into all visible fields on mobile', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });

    await page.locator('[name="name"]').fill('Mobile Test User');
    await page.locator('[name="email"]').fill('mobile@example.com');
    await page.locator('[name="address"]').fill('1 Mobile Lane, Brisbane QLD 4000');
    await page.locator('[name="description"]').fill('Storm damage to roof tiles.');

    // Values should persist
    await expect(page.locator('[name="name"]')).toHaveValue('Mobile Test User');
    await expect(page.locator('[name="email"]')).toHaveValue('mobile@example.com');
  });
});

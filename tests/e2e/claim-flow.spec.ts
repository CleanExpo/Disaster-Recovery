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

    const claimForm = page.locator('form').first();

    // Core fields must be present
    await expect(claimForm.locator('[name="name"]')).toBeVisible();
    await expect(claimForm.locator('[name="email"]')).toBeVisible();
    await expect(claimForm.locator('[name="address"]')).toBeVisible();
    await expect(claimForm.locator('[name="description"]')).toBeVisible();
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
    await page.addInitScript(() => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (input, init) => {
        const url =
          typeof input === 'string'
            ? input
            : input instanceof Request
              ? input.url
              : String(input);

        if (url.includes('/api/claims/submit')) {
          return new Response(
            JSON.stringify({
              success: true,
              claimId: 'e2e-claim-123',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return originalFetch(input, init);
      };
    });

    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });
    const claimForm = page.locator('form').first();

    // Fill contact details
    await claimForm.locator('[name="name"]').fill('Jane Smith');
    await claimForm.locator('[name="email"]').fill('jane.smith@example.com');
    await claimForm.locator('[name="address"]').fill('42 Test Street, Sydney NSW 2000');

    // Optionally fill insurer fields if present
    const insuranceField = claimForm.locator('[name="insuranceCompany"]');
    if (await insuranceField.isVisible()) {
      await insuranceField.fill('Test Insurer Pty Ltd');
    }

    // Select incident type if it's a <select>
    const incidentTypeSelect = claimForm.locator('[name="incidentType"]');
    if (await incidentTypeSelect.isVisible()) {
      await incidentTypeSelect.selectOption({ index: 1 });
    }

    // Fill incident date if present
    const incidentDateField = claimForm.locator('[name="incidentDate"]');
    if (await incidentDateField.isVisible()) {
      await incidentDateField.fill('2026-03-15');
    }

    // Fill description
    await claimForm.locator('[name="description"]').fill(
      'Water damage from burst pipe in kitchen — affecting floor and cabinetry.'
    );

    // Submit
    const submitButton = page.getByRole('button', { name: /submit|send claim|lodge/i });
    if (await submitButton.isVisible()) {
      const acceptCookies = page.getByRole('button', { name: /accept all/i });
      if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click();
      }

      await submitButton.click();

      await expect(page).toHaveURL(/\/track\/e2e-claim-123/, { timeout: 15_000 });
    }
  });
});

test.describe('claim flow — mobile (375 px)', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
  });

  test('claim form is fully visible and usable on mobile', async ({ page }) => {
    await page.goto('/claim/start', { waitUntil: 'domcontentloaded' });
    const claimForm = page.locator('form').first();

    await expect(claimForm.locator('[name="name"]')).toBeVisible();
    await expect(claimForm.locator('[name="email"]')).toBeVisible();
    await expect(claimForm.locator('[name="address"]')).toBeVisible();
    await expect(claimForm.locator('[name="description"]')).toBeVisible();

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
    const claimForm = page.locator('form').first();

    await claimForm.locator('[name="name"]').fill('Mobile Test User');
    await claimForm.locator('[name="email"]').fill('mobile@example.com');
    await claimForm.locator('[name="address"]').fill('1 Mobile Lane, Brisbane QLD 4000');
    await claimForm.locator('[name="description"]').fill('Storm damage to roof tiles.');

    // Values should persist
    await expect(claimForm.locator('[name="name"]')).toHaveValue('Mobile Test User');
    await expect(claimForm.locator('[name="email"]')).toHaveValue('mobile@example.com');
  });
});

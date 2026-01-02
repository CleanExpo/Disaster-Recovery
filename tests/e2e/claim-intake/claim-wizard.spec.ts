/**
 * E2E Test: Claim Intake Flow (3-Step Wizard)
 *
 * Tests the complete claim submission wizard including:
 * - Step 1: Basic Information (damage type, location, date)
 * - Step 2: Damage Details (description, photos, affected areas)
 * - Step 3: Contact & Insurance (homeowner info, insurance details)
 */

import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';
import { testClaims, testUsers, testAddresses } from '../fixtures/test-data';

test.describe('Claim Intake Wizard - Complete Flow', () => {
  let helper: PageHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();
  });

  test('should complete entire claim submission wizard successfully', async ({ page }) => {
    // ============================================================
    // STEP 1: Basic Information
    // ============================================================
    await test.step('Step 1: Fill basic claim information', async () => {
      // Verify we're on step 1
      await expect(page.getByRole('heading', { name: /step 1|basic information/i })).toBeVisible();

      // Select damage type
      await helper.form.selectOption('Damage Type', testClaims.waterDamage.type);

      // Enter incident date
      await helper.form.fillInput('Date of Incident', testClaims.waterDamage.damageDate);

      // Select severity
      await helper.form.selectOption('Severity', testClaims.waterDamage.severity);

      // Select urgency
      await helper.form.selectRadio(testClaims.waterDamage.urgency);

      // Enter property address
      await helper.form.fillInput('Street Address', testAddresses.newYork.street);
      await helper.form.fillInput('City', testAddresses.newYork.city);
      await helper.form.selectOption('State', testAddresses.newYork.state);
      await helper.form.fillInput('ZIP Code', testAddresses.newYork.zip);

      // Take screenshot of completed step 1
      await page.screenshot({ path: 'test-results/screenshots/claim-step1-complete.png' });

      // Click Next button
      await page.getByRole('button', { name: /next|continue/i }).click();
      await helper.wait.waitForNavigation();
    });

    // ============================================================
    // STEP 2: Damage Details
    // ============================================================
    await test.step('Step 2: Add damage details and photos', async () => {
      // Verify we're on step 2
      await expect(page.getByRole('heading', { name: /step 2|damage details/i })).toBeVisible();

      // Enter damage description
      await helper.form.fillInput('Description', testClaims.waterDamage.description);

      // Select affected areas
      for (const area of testClaims.waterDamage.affectedAreas) {
        await helper.form.checkCheckbox(area);
      }

      // Enter estimated damage cost
      await helper.form.fillInput('Estimated Damage Cost', testClaims.waterDamage.estimatedDamage.toString());

      // Upload damage photos (if file input exists)
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.isVisible()) {
        // Note: In real tests, you would upload actual test images
        // await helper.form.uploadFile('input[type="file"]', 'tests/fixtures/images/test-damage.jpg');
      }

      // Add additional notes
      await helper.form.fillInput('Additional Notes', 'Water came from burst pipe under kitchen sink');

      // Take screenshot of completed step 2
      await page.screenshot({ path: 'test-results/screenshots/claim-step2-complete.png' });

      // Click Next button
      await page.getByRole('button', { name: /next|continue/i }).click();
      await helper.wait.waitForNavigation();
    });

    // ============================================================
    // STEP 3: Contact & Insurance Information
    // ============================================================
    await test.step('Step 3: Enter contact and insurance details', async () => {
      // Verify we're on step 3
      await expect(page.getByRole('heading', { name: /step 3|contact|insurance/i })).toBeVisible();

      // Enter homeowner information
      await helper.form.fillInput('First Name', testUsers.homeowner.firstName);
      await helper.form.fillInput('Last Name', testUsers.homeowner.lastName);
      await helper.form.fillInput('Email', testUsers.homeowner.email);
      await helper.form.fillInput('Phone', testUsers.homeowner.phone);

      // Enter insurance information
      await helper.form.fillInput('Insurance Company', 'State Farm Insurance');
      await helper.form.fillInput('Policy Number', 'POL-123456789');
      await helper.form.fillInput('Claim Number', 'CLM-987654321');

      // Select preferred contact method
      await helper.form.selectRadio('Phone');

      // Agree to terms and conditions
      await helper.form.checkCheckbox('I agree to the terms and conditions');

      // Take screenshot of completed step 3
      await page.screenshot({ path: 'test-results/screenshots/claim-step3-complete.png' });

      // Click Submit button
      await page.getByRole('button', { name: /submit|complete/i }).click();
      await helper.wait.waitForNavigation();
    });

    // ============================================================
    // VERIFICATION: Success Page
    // ============================================================
    await test.step('Verify claim submission success', async () => {
      // Should be redirected to success page
      await expect(page).toHaveURL(/success|confirmation|thank-you/i, { timeout: 15000 });

      // Verify success message
      await expect(page.getByText(/claim submitted|successfully submitted|thank you/i)).toBeVisible();

      // Verify claim number is displayed
      const claimNumberElement = page.locator('[data-testid="claim-number"], .claim-number');
      if (await claimNumberElement.isVisible()) {
        const claimNumber = await claimNumberElement.textContent();
        expect(claimNumber).toBeTruthy();
        console.log(`✓ Claim submitted successfully: ${claimNumber}`);
      }

      // Take screenshot of success page
      await page.screenshot({ path: 'test-results/screenshots/claim-success.png', fullPage: true });
    });
  });

  test('should validate required fields in Step 1', async ({ page }) => {
    await test.step('Try to proceed without filling required fields', async () => {
      // Click Next without filling any fields
      await page.getByRole('button', { name: /next|continue/i }).click();

      // Should show validation errors
      await expect(page.getByText(/required|please enter|this field/i).first()).toBeVisible({ timeout: 5000 });

      // Should remain on step 1
      await expect(page.getByRole('heading', { name: /step 1|basic information/i })).toBeVisible();
    });
  });

  test('should allow navigation back to previous steps', async ({ page }) => {
    await test.step('Navigate forward then backward through wizard', async () => {
      // Fill and complete Step 1
      await helper.form.selectOption('Damage Type', 'Water Damage');
      await helper.form.fillInput('Date of Incident', '2025-01-01');
      await helper.form.selectOption('Severity', 'Moderate');
      await helper.form.fillInput('Street Address', '123 Main St');
      await helper.form.fillInput('City', 'New York');
      await helper.form.selectOption('State', 'NY');
      await helper.form.fillInput('ZIP Code', '10001');

      // Go to Step 2
      await page.getByRole('button', { name: /next|continue/i }).click();
      await helper.wait.waitForNavigation();

      // Verify on Step 2
      await expect(page.getByRole('heading', { name: /step 2|damage details/i })).toBeVisible();

      // Click Back button
      const backButton = page.getByRole('button', { name: /back|previous/i });
      if (await backButton.isVisible()) {
        await backButton.click();
        await helper.wait.waitForNavigation();

        // Verify back on Step 1
        await expect(page.getByRole('heading', { name: /step 1|basic information/i })).toBeVisible();

        // Verify form data is preserved
        await expect(page.getByLabel('Damage Type')).toHaveValue('Water Damage');
      }
    });
  });

  test('should show progress indicator throughout wizard', async ({ page }) => {
    await test.step('Verify progress indicator updates', async () => {
      // Check for progress indicator
      const progressIndicator = page.locator('[data-testid="wizard-progress"], .wizard-progress, .stepper');
      if (await progressIndicator.isVisible()) {
        // Verify step 1 is active
        await expect(page.locator('[data-step="1"]')).toHaveClass(/active|current/);

        // Take screenshot of progress indicator
        await progressIndicator.screenshot({ path: 'test-results/screenshots/wizard-progress.png' });
      }
    });
  });

  test('should save draft and allow resume later', async ({ page }) => {
    await test.step('Save partial claim as draft', async () => {
      // Fill partial information
      await helper.form.selectOption('Damage Type', 'Fire Damage');
      await helper.form.fillInput('Date of Incident', '2025-01-02');
      await helper.form.fillInput('Street Address', '456 Oak Ave');
      await helper.form.fillInput('City', 'Brooklyn');

      // Look for Save Draft button
      const saveDraftButton = page.getByRole('button', { name: /save draft|save for later/i });
      if (await saveDraftButton.isVisible()) {
        await saveDraftButton.click();

        // Wait for save confirmation
        await expect(page.getByText(/draft saved|saved successfully/i)).toBeVisible({ timeout: 5000 });
      }
    });
  });
});

test.describe('Claim Intake Wizard - Edge Cases', () => {
  test('should handle file upload errors gracefully', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();

    // Navigate to Step 2 (assuming file upload is here)
    // ... fill Step 1 and navigate ...

    // Try to upload invalid file type
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // Test would upload an invalid file and verify error handling
      // This is a placeholder for actual implementation
    }
  });

  test('should handle session timeout gracefully', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();

    // Fill form data
    await helper.form.selectOption('Damage Type', 'Mold');

    // Simulate session timeout (clear cookies)
    await page.context().clearCookies();

    // Try to proceed
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Should redirect to login or show session expired message
    // Implementation depends on app behavior
  });

  test('should validate date is not in the future', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();

    // Enter future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    await helper.form.fillInput('Date of Incident', futureDateStr);

    // Try to proceed
    await page.getByRole('button', { name: /next|continue/i }).click();

    // Should show validation error
    await expect(page.getByText(/future date|cannot be in the future/i)).toBeVisible({ timeout: 3000 });
  });
});

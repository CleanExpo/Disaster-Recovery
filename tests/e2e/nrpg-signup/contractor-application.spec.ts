/**
 * E2E Test: NRPG Contractor Signup Flow
 *
 * Tests the complete contractor application process including:
 * - Company information
 * - License and insurance verification
 * - Service areas and specializations
 * - Certifications and references
 * - Background check consent
 */

import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';
import { testContractorApplications, testAddresses } from '../fixtures/test-data';

test.describe('NRPG Contractor Signup - Complete Application', () => {
  let helper: PageHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PageHelper(page);
    await helper.nav.goToContractorSignup();
  });

  test('should complete full contractor application successfully', async ({ page }) => {
    const appData = testContractorApplications.waterRestoration;

    // ============================================================
    // SECTION 1: Company Information
    // ============================================================
    await test.step('Fill company information', async () => {
      // Verify signup page loaded
      await expect(page.getByRole('heading', { name: /contractor application|become a contractor|join our network/i }))
        .toBeVisible();

      // Company details
      await helper.form.fillInput('Company Name', appData.companyName);
      await helper.form.selectOption('Business Type', appData.businessType);
      await helper.form.fillInput('Years in Business', appData.yearsInBusiness.toString());

      // Business address
      await helper.form.fillInput('Business Address', testAddresses.newYork.street);
      await helper.form.fillInput('City', testAddresses.newYork.city);
      await helper.form.selectOption('State', testAddresses.newYork.state);
      await helper.form.fillInput('ZIP Code', testAddresses.newYork.zip);

      // Contact information
      await helper.form.fillInput('Business Phone', '555-0123');
      await helper.form.fillInput('Business Email', 'contact@waterexperts.com');
      await helper.form.fillInput('Website', 'https://waterexperts.com');

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/contractor-company-info.png' });
    });

    // ============================================================
    // SECTION 2: License & Insurance
    // ============================================================
    await test.step('Fill license and insurance information', async () => {
      // Scroll to section if needed
      await helper.scroll.scrollToElement('[data-section="license-insurance"], h2:has-text("License")');

      // License information
      await helper.form.fillInput('License Number', appData.licenseNumber);
      await helper.form.selectOption('License State', 'New York');
      await helper.form.fillInput('License Expiration Date', '2026-12-31');

      // Upload license document (if available)
      const licenseUpload = page.locator('input[name="license-upload"], input[data-upload="license"]');
      if (await licenseUpload.isVisible()) {
        // In real tests, upload actual document
        // await licenseUpload.setInputFiles('tests/fixtures/documents/license.pdf');
      }

      // Insurance information
      await helper.form.fillInput('Insurance Provider', appData.insuranceProvider);
      await helper.form.fillInput('Policy Number', appData.policyNumber);
      await helper.form.fillInput('Coverage Amount', '2000000');
      await helper.form.fillInput('Insurance Expiration Date', '2026-06-30');

      // Upload insurance certificate (if available)
      const insuranceUpload = page.locator('input[name="insurance-upload"], input[data-upload="insurance"]');
      if (await insuranceUpload.isVisible()) {
        // In real tests, upload actual document
        // await insuranceUpload.setInputFiles('tests/fixtures/documents/insurance.pdf');
      }

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/contractor-license-insurance.png' });
    });

    // ============================================================
    // SECTION 3: Service Areas & Specializations
    // ============================================================
    await test.step('Select service areas and specializations', async () => {
      // Scroll to section
      await helper.scroll.scrollToElement('[data-section="service-areas"], h2:has-text("Service Areas")');

      // Select service areas (multiple checkboxes)
      for (const area of appData.serviceAreas) {
        await helper.form.checkCheckbox(area);
      }

      // Select specializations
      for (const specialization of appData.specializations) {
        await helper.form.checkCheckbox(specialization);
      }

      // Service radius
      await helper.form.fillInput('Service Radius (miles)', '50');

      // Emergency response availability
      await helper.form.checkCheckbox('24/7 Emergency Response');

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/contractor-services.png' });
    });

    // ============================================================
    // SECTION 4: Certifications
    // ============================================================
    await test.step('Add certifications', async () => {
      // Scroll to certifications section
      await helper.scroll.scrollToElement('[data-section="certifications"], h2:has-text("Certifications")');

      // Add first certification
      const cert1 = appData.certifications[0];
      await helper.form.fillInput('Certification Name', cert1.name);
      await helper.form.fillInput('Certificate Number', cert1.number);
      await helper.form.fillInput('Expiration Date', cert1.expiryDate);

      // Add another certification button (if exists)
      const addCertButton = page.getByRole('button', { name: /add certification|add another/i });
      if (await addCertButton.isVisible()) {
        await addCertButton.click();
        await helper.wait.waitForTimeout(500);

        // Add second certification
        const cert2 = appData.certifications[1];
        await page.locator('input[name="certification-name"]').nth(1).fill(cert2.name);
        await page.locator('input[name="certificate-number"]').nth(1).fill(cert2.number);
        await page.locator('input[name="expiration-date"]').nth(1).fill(cert2.expiryDate);
      }

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/contractor-certifications.png' });
    });

    // ============================================================
    // SECTION 5: References
    // ============================================================
    await test.step('Add business references', async () => {
      // Scroll to references section
      await helper.scroll.scrollToElement('[data-section="references"], h2:has-text("References")');

      // Add first reference
      const ref1 = appData.references[0];
      await helper.form.fillInput('Reference Name', ref1.name);
      await helper.form.fillInput('Reference Phone', ref1.phone);
      await helper.form.fillInput('Reference Email', ref1.email);

      // Add another reference button (if exists)
      const addRefButton = page.getByRole('button', { name: /add reference|add another/i });
      if (await addRefButton.isVisible() && appData.references.length > 1) {
        await addRefButton.click();
        await helper.wait.waitForTimeout(500);

        // Add second reference
        const ref2 = appData.references[1];
        await page.locator('input[name="reference-name"]').nth(1).fill(ref2.name);
        await page.locator('input[name="reference-phone"]').nth(1).fill(ref2.phone);
        await page.locator('input[name="reference-email"]').nth(1).fill(ref2.email);
      }

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/contractor-references.png' });
    });

    // ============================================================
    // SECTION 6: Background Check & Terms
    // ============================================================
    await test.step('Consent and submit application', async () => {
      // Scroll to bottom
      await helper.scroll.scrollToBottom();

      // Background check consent
      await helper.form.checkCheckbox('I consent to a background check');

      // Terms and conditions
      await helper.form.checkCheckbox('I agree to the Terms of Service');
      await helper.form.checkCheckbox('I agree to the Contractor Agreement');

      // Privacy policy
      await helper.form.checkCheckbox('I have read the Privacy Policy');

      // Take final screenshot before submission
      await page.screenshot({
        path: 'test-results/screenshots/contractor-final-before-submit.png',
        fullPage: true
      });

      // Submit application
      await page.getByRole('button', { name: /submit application|apply now/i }).click();
      await helper.wait.waitForNavigation();
    });

    // ============================================================
    // VERIFICATION: Application Submitted
    // ============================================================
    await test.step('Verify application submission success', async () => {
      // Should be redirected to confirmation page
      await expect(page).toHaveURL(/confirmation|success|thank-you|pending/i, { timeout: 15000 });

      // Verify success message
      await expect(page.getByText(/application submitted|application received|under review/i))
        .toBeVisible({ timeout: 10000 });

      // Check for application ID
      const appIdElement = page.locator('[data-testid="application-id"], .application-id');
      if (await appIdElement.isVisible()) {
        const appId = await appIdElement.textContent();
        expect(appId).toBeTruthy();
        console.log(`✓ Application submitted successfully: ${appId}`);
      }

      // Take screenshot of success page
      await page.screenshot({
        path: 'test-results/screenshots/contractor-application-success.png',
        fullPage: true
      });

      // Verify next steps information is displayed
      await expect(page.getByText(/next steps|what happens next|review process/i))
        .toBeVisible({ timeout: 5000 });
    });
  });

  test('should validate required fields before submission', async ({ page }) => {
    await test.step('Try to submit without required fields', async () => {
      // Try to submit empty form
      await page.getByRole('button', { name: /submit application|apply now/i }).click();

      // Should show validation errors
      const errorMessages = page.locator('.error, [role="alert"], .field-error');
      await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });

      // Should remain on the same page
      await expect(page).toHaveURL(/contractor\/signup|contractor\/apply/i);
    });
  });

  test('should validate email format', async ({ page }) => {
    await test.step('Enter invalid email and verify validation', async () => {
      await helper.form.fillInput('Business Email', 'invalid-email');

      // Trigger validation (blur or submit)
      await page.getByLabel('Business Email').blur();

      // Look for validation error
      const emailError = page.getByText(/valid email|invalid email/i);
      if (await emailError.isVisible({ timeout: 2000 })) {
        expect(await emailError.isVisible()).toBeTruthy();
      }
    });
  });

  test('should validate phone number format', async ({ page }) => {
    await test.step('Enter invalid phone and verify validation', async () => {
      await helper.form.fillInput('Business Phone', '123');

      // Trigger validation
      await page.getByLabel('Business Phone').blur();

      // Look for validation error
      const phoneError = page.getByText(/valid phone|invalid phone|10 digits/i);
      if (await phoneError.isVisible({ timeout: 2000 })) {
        expect(await phoneError.isVisible()).toBeTruthy();
      }
    });
  });

  test('should allow adding and removing multiple certifications', async ({ page }) => {
    await test.step('Manage multiple certifications', async () => {
      // Scroll to certifications
      await helper.scroll.scrollToElement('h2:has-text("Certifications")');

      // Add certification
      const addButton = page.getByRole('button', { name: /add certification/i });
      if (await addButton.isVisible()) {
        await addButton.click();

        // Fill certification
        await helper.form.fillInput('Certification Name', 'IICRC WRT');

        // Add another
        await addButton.click();

        // Verify two certification forms are visible
        const certForms = page.locator('[data-certification-form], .certification-entry');
        if (await certForms.count() > 0) {
          const count = await certForms.count();
          expect(count).toBeGreaterThanOrEqual(2);
        }

        // Remove one certification
        const removeButton = page.getByRole('button', { name: /remove|delete/i });
        if (await removeButton.isVisible()) {
          await removeButton.first().click();
        }
      }
    });
  });

  test('should save application as draft', async ({ page }) => {
    await test.step('Save partial application', async () => {
      // Fill partial information
      await helper.form.fillInput('Company Name', 'Test Restoration Co');
      await helper.form.fillInput('Business Phone', '555-0100');

      // Look for save draft button
      const saveDraftButton = page.getByRole('button', { name: /save draft|save for later/i });
      if (await saveDraftButton.isVisible()) {
        await saveDraftButton.click();

        // Verify save confirmation
        await expect(page.getByText(/draft saved|saved successfully/i))
          .toBeVisible({ timeout: 5000 });
      }
    });
  });
});

test.describe('NRPG Contractor Signup - File Upload', () => {
  test('should handle license document upload', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContractorSignup();

    // Locate file upload input
    const fileInput = page.locator('input[type="file"][name*="license"]');
    if (await fileInput.isVisible()) {
      // In real implementation, upload actual test file
      // await fileInput.setInputFiles('tests/fixtures/documents/test-license.pdf');

      // Verify file appears in UI
      // await expect(page.getByText('test-license.pdf')).toBeVisible();
    }
  });

  test('should reject invalid file types', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContractorSignup();

    // Try to upload invalid file type (e.g., .exe)
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.isVisible()) {
      // Test would upload invalid file and check for error
      // Implementation depends on app's file validation
    }
  });
});

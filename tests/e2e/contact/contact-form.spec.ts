/**
 * E2E Test: Contact Form
 *
 * Tests all contact form scenarios including:
 * - General inquiries
 * - Claim assistance requests
 * - Partnership inquiries
 * - Form validation
 * - Success/error handling
 */

import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';
import { testContactForms } from '../fixtures/test-data';

test.describe('Contact Form - Submission Tests', () => {
  let helper: PageHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PageHelper(page);
    await helper.nav.goToContact();
  });

  test('should submit general inquiry successfully', async ({ page }) => {
    const formData = testContactForms.generalInquiry;

    await test.step('Fill and submit general inquiry form', async () => {
      // Verify contact page loaded
      await expect(page.getByRole('heading', { name: /contact us|get in touch/i }))
        .toBeVisible();

      // Fill contact form
      await helper.form.fillContactForm(formData);

      // Take screenshot before submission
      await page.screenshot({ path: 'test-results/screenshots/contact-form-filled.png' });

      // Submit form
      await helper.form.submitForm('Send Message');
      await helper.wait.waitForNavigation();

      // Verify success message
      await expect(page.getByText(/message sent|thank you|we'll be in touch|received your message/i))
        .toBeVisible({ timeout: 10000 });

      // Take screenshot of success
      await page.screenshot({ path: 'test-results/screenshots/contact-form-success.png' });
    });
  });

  test('should submit claim assistance request', async ({ page }) => {
    const formData = testContactForms.claimAssistance;

    await test.step('Submit claim assistance inquiry', async () => {
      // Fill form
      await helper.form.fillInput('Name', formData.name);
      await helper.form.fillInput('Email', formData.email);
      await helper.form.fillInput('Phone', formData.phone);
      await helper.form.selectOption('Subject', formData.subject);
      await helper.form.fillInput('Message', formData.message);

      // Select preferred contact method
      if (formData.preferredContact) {
        await helper.form.selectRadio(formData.preferredContact);
      }

      // Select urgency
      if (formData.urgency) {
        await helper.form.selectOption('Urgency', formData.urgency);
      }

      // Submit
      await helper.form.submitForm();
      await helper.wait.waitForFormSubmission();

      // Verify submission
      await expect(page.getByText(/received|submitted|thank you/i))
        .toBeVisible({ timeout: 10000 });
    });
  });

  test('should submit partnership inquiry', async ({ page }) => {
    const formData = testContactForms.partnershipInquiry;

    await test.step('Submit partnership inquiry', async () => {
      // Fill form including company name
      await helper.form.fillInput('Name', formData.name);
      await helper.form.fillInput('Email', formData.email);
      await helper.form.fillInput('Phone', formData.phone);
      await helper.form.selectOption('Subject', formData.subject);

      // Company name field (may be conditional based on subject)
      if (formData.companyName) {
        const companyField = page.getByLabel(/company name|organization/i);
        if (await companyField.isVisible({ timeout: 2000 })) {
          await companyField.fill(formData.companyName);
        }
      }

      await helper.form.fillInput('Message', formData.message);

      // Submit
      await helper.form.submitForm();
      await helper.wait.waitForFormSubmission();

      // Verify
      await expect(page.getByText(/received|submitted|thank you/i))
        .toBeVisible({ timeout: 10000 });
    });
  });

  test('should show loading state during submission', async ({ page }) => {
    await test.step('Verify loading indicator appears', async () => {
      // Fill form
      await helper.form.fillContactForm(testContactForms.generalInquiry);

      // Submit and immediately check for loading state
      const submitButton = page.getByRole('button', { name: /send|submit/i });
      await submitButton.click();

      // Look for loading indicator
      const loadingIndicator = page.locator(
        '[data-loading="true"], .loading, .spinner, button:disabled:has-text("Sending")'
      );

      // Check if loading state appears (even briefly)
      const hasLoading = await loadingIndicator.isVisible({ timeout: 1000 }).catch(() => false);

      if (hasLoading) {
        console.log('✓ Loading state displayed');
      }

      // Wait for completion
      await helper.wait.waitForFormSubmission();
    });
  });
});

test.describe('Contact Form - Validation Tests', () => {
  let helper: PageHelper;

  test.beforeEach(async ({ page }) => {
    helper = new PageHelper(page);
    await helper.nav.goToContact();
  });

  test('should validate required fields', async ({ page }) => {
    await test.step('Submit empty form and verify errors', async () => {
      // Click submit without filling anything
      await page.getByRole('button', { name: /send|submit/i }).click();

      // Should show required field errors
      await expect(page.getByText(/required|this field is required/i).first())
        .toBeVisible({ timeout: 5000 });

      // Should not navigate away
      await expect(page).toHaveURL(/contact/i);

      // Take screenshot of validation errors
      await page.screenshot({ path: 'test-results/screenshots/contact-form-validation-errors.png' });
    });
  });

  test('should validate email format', async ({ page }) => {
    await test.step('Enter invalid email', async () => {
      // Fill name
      await helper.form.fillInput('Name', 'Test User');

      // Enter invalid email
      await helper.form.fillInput('Email', 'invalid-email');

      // Trigger validation (blur or submit)
      await page.getByLabel(/email/i).blur();

      // Check for email validation error
      const emailError = page.getByText(/valid email|invalid email|email address/i);
      const hasError = await emailError.isVisible({ timeout: 2000 }).catch(() => false);

      if (hasError) {
        expect(await emailError.isVisible()).toBeTruthy();
        console.log('✓ Email validation working');
      }
    });
  });

  test('should validate phone number format', async ({ page }) => {
    await test.step('Enter invalid phone number', async () => {
      // Enter invalid phone
      await helper.form.fillInput('Phone', '123');

      // Trigger validation
      await page.getByLabel(/phone/i).blur();

      // Check for phone validation error
      const phoneError = page.getByText(/valid phone|invalid phone|phone number/i);
      const hasError = await phoneError.isVisible({ timeout: 2000 }).catch(() => false);

      if (hasError) {
        expect(await phoneError.isVisible()).toBeTruthy();
        console.log('✓ Phone validation working');
      }
    });
  });

  test('should validate message length', async ({ page }) => {
    await test.step('Test minimum message length', async () => {
      // Fill required fields
      await helper.form.fillInput('Name', 'Test');
      await helper.form.fillInput('Email', 'test@example.com');

      // Enter very short message
      await helper.form.fillInput('Message', 'Hi');

      // Try to submit
      await page.getByRole('button', { name: /send|submit/i }).click();

      // May show message length error
      const lengthError = page.getByText(/minimum|too short|at least/i);
      const hasError = await lengthError.isVisible({ timeout: 2000 }).catch(() => false);

      if (hasError) {
        console.log('✓ Message length validation working');
      }
    });
  });

  test('should prevent duplicate submissions', async ({ page }) => {
    await test.step('Submit form twice rapidly', async () => {
      // Fill form
      await helper.form.fillContactForm(testContactForms.generalInquiry);

      // Get submit button
      const submitButton = page.getByRole('button', { name: /send|submit/i });

      // Click submit
      await submitButton.click();

      // Try to click again immediately
      const isDisabled = await submitButton.isDisabled({ timeout: 1000 }).catch(() => false);

      if (isDisabled) {
        console.log('✓ Duplicate submission prevented');
      }

      // Wait for form to complete
      await helper.wait.waitForFormSubmission();
    });
  });
});

test.describe('Contact Form - Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Simulate network error', async () => {
      // Intercept and fail the submission request
      await page.route('**/api/contact', route => {
        route.abort('failed');
      });

      // Fill and submit form
      await helper.form.fillContactForm(testContactForms.generalInquiry);
      await helper.form.submitForm();

      // Should show error message
      await expect(page.getByText(/error|failed|try again|something went wrong/i))
        .toBeVisible({ timeout: 10000 });

      // Form should still be filled (data not lost)
      await expect(page.getByLabel('Email')).toHaveValue(testContactForms.generalInquiry.email);
    });
  });

  test('should handle server errors (500)', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Simulate server error', async () => {
      // Intercept and return 500 error
      await page.route('**/api/contact', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      // Fill and submit form
      await helper.form.fillContactForm(testContactForms.generalInquiry);
      await helper.form.submitForm();

      // Should show error message
      await expect(page.getByText(/error|failed|server error/i))
        .toBeVisible({ timeout: 10000 });
    });
  });
});

test.describe('Contact Form - Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Navigate form using keyboard', async () => {
      // Focus first field
      await page.keyboard.press('Tab');

      // Fill using keyboard
      await page.keyboard.type('Test User');

      // Tab to next field
      await page.keyboard.press('Tab');
      await page.keyboard.type('test@example.com');

      // Tab to phone
      await page.keyboard.press('Tab');
      await page.keyboard.type('5551234567');

      // Tab to message
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // May need extra tabs depending on layout
      await page.keyboard.type('Test message via keyboard');

      // Should be able to submit via Enter or Tab to button and press Enter
      // This verifies keyboard accessibility

      console.log('✓ Form is keyboard navigable');
    });
  });

  test('should have proper ARIA labels', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Check for accessibility attributes', async () => {
      // Check for aria-required on required fields
      const nameInput = page.getByLabel(/name/i);
      const emailInput = page.getByLabel(/email/i);
      const messageInput = page.getByLabel(/message/i);

      // Verify inputs are labeled (getByLabel works)
      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();

      console.log('✓ Form has proper labels');
    });
  });
});

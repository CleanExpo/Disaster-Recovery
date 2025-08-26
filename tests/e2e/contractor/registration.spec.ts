import { test, expect, Page } from '@playwright/test';

const TEST_CONTRACTOR = {
  companyName: 'Test Restoration Services',
  abn: '12345678901',
  email: 'test@restoration.com.au',
  phone: '0412345678',
  username: 'testcontractor',
  password: 'TestPass123!',
  address: '123 Test Street, Brisbane QLD 4000',
};

test.describe('Contractor Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contractor/register');
  });

  test('should display registration wizard with all steps', async ({ page }) => {
    // Check wizard steps are visible
    await expect(page.locator('text=Company Information')).toBeVisible();
    await expect(page.locator('text=Insurance & Certifications')).toBeVisible();
    await expect(page.locator('text=Service Areas')).toBeVisible();
    await expect(page.locator('text=Background Check')).toBeVisible();
    await expect(page.locator('text=Subscription')).toBeVisible();
    await expect(page.locator('text=Review & Submit')).toBeVisible();
  });

  test('should complete company information step', async ({ page }) => {
    // Fill company details
    await page.fill('input[name="companyName"]', TEST_CONTRACTOR.companyName);
    await page.fill('input[name="abn"]', TEST_CONTRACTOR.abn);
    await page.fill('input[name="email"]', TEST_CONTRACTOR.email);
    await page.fill('input[name="phone"]', TEST_CONTRACTOR.phone);
    await page.fill('input[name="username"]', TEST_CONTRACTOR.username);
    await page.fill('input[name="password"]', TEST_CONTRACTOR.password);
    await page.fill('input[name="confirmPassword"]', TEST_CONTRACTOR.password);
    
    // Select company structure
    await page.selectOption('select[name="companyStructure"]', 'PTY_LTD');
    
    // Fill address
    await page.fill('input[name="registeredAddress"]', TEST_CONTRACTOR.address);
    
    // Click next
    await page.click('button:has-text("Next")');
    
    // Verify moved to next step
    await expect(page.locator('text=Upload Insurance Documents')).toBeVisible();
  });

  test('should validate ABN format', async ({ page }) => {
    // Enter invalid ABN
    await page.fill('input[name="abn"]', '123');
    await page.click('button:has-text("Next")');
    
    // Check validation error
    await expect(page.locator('text=ABN must be 11 digits')).toBeVisible();
    
    // Enter valid ABN
    await page.fill('input[name="abn"]', TEST_CONTRACTOR.abn);
    
    // Error should disappear
    await expect(page.locator('text=ABN must be 11 digits')).not.toBeVisible();
  });

  test('should handle file uploads for insurance documents', async ({ page }) => {
    // Navigate to insurance step
    await fillCompanyInfo(page);
    
    // Upload public liability insurance
    const fileInput = await page.locator('input[type="file"][name="publicLiability"]');
    await fileInput.setInputFiles('./tests/fixtures/sample-insurance.pdf');
    
    // Check file uploaded
    await expect(page.locator('text=sample-insurance.pdf')).toBeVisible();
    
    // Add coverage amount
    await page.fill('input[name="publicLiabilityCoverage"]', '20000000');
    
    // Add expiry date
    await page.fill('input[name="publicLiabilityExpiry"]', '2025-12-31');
  });

  test('should configure service areas', async ({ page }) => {
    // Navigate to service areas step
    await fillCompanyInfo(page);
    await fillInsurance(page);
    
    // Select service radius
    await page.click('text=50km radius');
    
    // Enter base location
    await page.fill('input[name="baseLocation"]', 'Brisbane CBD');
    
    // Select service types
    await page.check('input[value="water_damage"]');
    await page.check('input[value="fire_damage"]');
    await page.check('input[value="mold_remediation"]');
    
    // Set availability
    await page.check('input[name="emergencyResponse"]');
    await page.check('input[name="afterHours"]');
    
    // Click next
    await page.click('button:has-text("Next")');
  });

  test('should consent to background check', async ({ page }) => {
    // Navigate to background check step
    await navigateToBackgroundCheck(page);
    
    // Read terms
    await expect(page.locator('text=Background Check Consent')).toBeVisible();
    
    // Provide consent
    await page.check('input[name="criminalCheckConsent"]');
    await page.check('input[name="creditCheckConsent"]');
    await page.check('input[name="identityVerificationConsent"]');
    
    // Upload ID
    const idInput = await page.locator('input[type="file"][name="identityDocument"]');
    await idInput.setInputFiles('./tests/fixtures/sample-id.pdf');
    
    // Sign consent
    await page.fill('input[name="digitalSignature"]', 'John Smith');
    
    // Click next
    await page.click('button:has-text("Next")');
  });

  test('should select subscription tier', async ({ page }) => {
    // Navigate to subscription step
    await navigateToSubscription(page);
    
    // View tier options
    await expect(page.locator('text=25km - $750/month')).toBeVisible();
    await expect(page.locator('text=50km - $1,250/month')).toBeVisible();
    await expect(page.locator('text=75km - $1,750/month')).toBeVisible();
    
    // Select 50km tier
    await page.click('[data-tier="50km"]');
    
    // Check selected
    await expect(page.locator('[data-tier="50km"]')).toHaveClass(/selected/);
    
    // Select billing frequency
    await page.click('text=Monthly');
    
    // Enter payment method
    await page.click('text=Direct Debit');
    
    // Fill bank details
    await page.fill('input[name="accountName"]', 'Test Restoration Services');
    await page.fill('input[name="bsb"]', '123456');
    await page.fill('input[name="accountNumber"]', '123456789');
    
    // Agree to terms
    await page.check('input[name="agreeToTerms"]');
    
    // Click next
    await page.click('button:has-text("Next")');
  });

  test('should review and submit registration', async ({ page }) => {
    // Complete all steps
    await completeAllSteps(page);
    
    // Review page
    await expect(page.locator('text=Review Your Application')).toBeVisible();
    
    // Check summary
    await expect(page.locator(`text=${TEST_CONTRACTOR.companyName}`)).toBeVisible();
    await expect(page.locator(`text=${TEST_CONTRACTOR.abn}`)).toBeVisible();
    await expect(page.locator('text=50km radius')).toBeVisible();
    
    // Sign application
    const canvas = await page.locator('canvas#signature');
    await canvas.click({ position: { x: 50, y: 50 } });
    await page.mouse.down();
    await page.mouse.move(150, 50);
    await page.mouse.up();
    
    // Submit
    await page.click('button:has-text("Submit Application")');
    
    // Check success message
    await expect(page.locator('text=Application Submitted Successfully')).toBeVisible();
    await expect(page.locator('text=We will review your application within 2-3 business days')).toBeVisible();
  });

  test('should save progress and resume', async ({ page }) => {
    // Fill first step
    await fillCompanyInfo(page);
    
    // Click save progress
    await page.click('button:has-text("Save Progress")');
    
    // Check saved
    await expect(page.locator('text=Progress saved')).toBeVisible();
    
    // Navigate away
    await page.goto('/');
    
    // Return to registration
    await page.goto('/contractor/register');
    
    // Check data persisted
    await expect(page.locator('input[name="companyName"]')).toHaveValue(TEST_CONTRACTOR.companyName);
    await expect(page.locator('input[name="abn"]')).toHaveValue(TEST_CONTRACTOR.abn);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Complete all steps
    await completeAllSteps(page);
    
    // Mock API failure
    await page.route('/api/contractor/register', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });
    
    // Try to submit
    await page.click('button:has-text("Submit Application")');
    
    // Check error handling
    await expect(page.locator('text=Failed to submit application')).toBeVisible();
    await expect(page.locator('text=Please try again')).toBeVisible();
    
    // Can retry
    await expect(page.locator('button:has-text("Retry")'));
  });
});

// Helper functions
async function fillCompanyInfo(page: Page) {
  await page.fill('input[name="companyName"]', TEST_CONTRACTOR.companyName);
  await page.fill('input[name="abn"]', TEST_CONTRACTOR.abn);
  await page.fill('input[name="email"]', TEST_CONTRACTOR.email);
  await page.fill('input[name="phone"]', TEST_CONTRACTOR.phone);
  await page.fill('input[name="username"]', TEST_CONTRACTOR.username);
  await page.fill('input[name="password"]', TEST_CONTRACTOR.password);
  await page.fill('input[name="confirmPassword"]', TEST_CONTRACTOR.password);
  await page.selectOption('select[name="companyStructure"]', 'PTY_LTD');
  await page.fill('input[name="registeredAddress"]', TEST_CONTRACTOR.address);
  await page.click('button:has-text("Next")');
}

async function fillInsurance(page: Page) {
  // Skip actual file upload in helper
  await page.fill('input[name="publicLiabilityCoverage"]', '20000000');
  await page.fill('input[name="publicLiabilityExpiry"]', '2025-12-31');
  await page.click('button:has-text("Next")');
}

async function navigateToBackgroundCheck(page: Page) {
  await fillCompanyInfo(page);
  await fillInsurance(page);
  // Service areas
  await page.click('text=50km radius');
  await page.check('input[value="water_damage"]');
  await page.click('button:has-text("Next")');
}

async function navigateToSubscription(page: Page) {
  await navigateToBackgroundCheck(page);
  // Background check
  await page.check('input[name="criminalCheckConsent"]');
  await page.fill('input[name="digitalSignature"]', 'John Smith');
  await page.click('button:has-text("Next")');
}

async function completeAllSteps(page: Page) {
  await navigateToSubscription(page);
  // Subscription
  await page.click('[data-tier="50km"]');
  await page.click('text=Direct Debit');
  await page.check('input[name="agreeToTerms"]');
  await page.click('button:has-text("Next")');
}
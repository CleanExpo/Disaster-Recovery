import { test, expect, Page } from '@playwright/test';
import path from 'path';

test.describe('Mass WebPage Creations Application Verification', () => {
  test('should verify homepage loads correctly', async ({ page }) => {
    console.log('Step 1: Navigating to homepage...');
    
    try {
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of homepage
      const homepageScreenshot = path.join(process.cwd(), 'test-results', 'homepage-screenshot.png');
      await page.screenshot({ path: homepageScreenshot, fullPage: true });
      console.log(`✓ Homepage screenshot saved to: ${homepageScreenshot}`);
      
      // Verify page loaded successfully
      expect(page.url()).toBe('http://localhost:3001/');
      console.log('✓ Homepage loaded successfully');
      
    } catch (error) {
      console.error('✗ Homepage failed to load:', error);
      throw error;
    }
  });

  test('should verify login page exists and loads', async ({ page }) => {
    console.log('Step 2: Navigating to login page...');
    
    try {
      await page.goto('http://localhost:3001/login');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of login page
      const loginScreenshot = path.join(process.cwd(), 'test-results', 'login-page-screenshot.png');
      await page.screenshot({ path: loginScreenshot, fullPage: true });
      console.log(`✓ Login page screenshot saved to: ${loginScreenshot}`);
      
      // Verify we're on login page
      expect(page.url()).toBe('http://localhost:3001/login');
      console.log('✓ Login page loaded successfully');
      
      // Check if login form elements exist
      const emailInput = page.locator('input[type="email"], input[name="email"], input#email');
      const passwordInput = page.locator('input[type="password"], input[name="password"], input#password');
      const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
      
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitButton).toBeVisible();
      
      console.log('✓ Login form elements are present');
      
    } catch (error) {
      console.error('✗ Login page failed to load or form elements missing:', error);
      throw error;
    }
  });

  test('should attempt login with provided credentials', async ({ page }) => {
    console.log('Step 3: Attempting login with admin credentials...');
    
    try {
      await page.goto('http://localhost:3001/login');
      await page.waitForLoadState('networkidle');
      
      // Find form inputs (flexible selectors)
      const emailInput = page.locator('input[type="email"], input[name="email"], input#email').first();
      const passwordInput = page.locator('input[type="password"], input[name="password"], input#password').first();
      const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")').first();
      
      // Fill login form
      await emailInput.fill('admin@demo.com');
      await passwordInput.fill('admin123');
      
      console.log('✓ Filled login credentials');
      
      // Submit form
      await submitButton.click();
      
      // Wait for navigation or error
      await page.waitForTimeout(3000);
      
      const currentUrl = page.url();
      console.log(`Current URL after login attempt: ${currentUrl}`);
      
      // Check if redirected to dashboard or still on login
      if (currentUrl.includes('/dashboard')) {
        console.log('✓ Login successful - redirected to dashboard');
        
        // Take screenshot of dashboard
        const dashboardScreenshot = path.join(process.cwd(), 'test-results', 'dashboard-screenshot.png');
        await page.screenshot({ path: dashboardScreenshot, fullPage: true });
        console.log(`✓ Dashboard screenshot saved to: ${dashboardScreenshot}`);
        
      } else if (currentUrl.includes('/login')) {
        // Check for error messages
        const errorElements = await page.locator('[role="alert"], .error, .alert-error, .text-red-500, .text-danger').count();
        if (errorElements > 0) {
          const errorText = await page.locator('[role="alert"], .error, .alert-error, .text-red-500, .text-danger').first().textContent();
          console.log(`✗ Login failed with error: ${errorText}`);
        } else {
          console.log('✗ Login failed - remained on login page with no visible error');
        }
      } else {
        console.log(`? Login result unclear - redirected to: ${currentUrl}`);
      }
      
    } catch (error) {
      console.error('✗ Login process failed:', error);
      
      // Take screenshot of current state for debugging
      const errorScreenshot = path.join(process.cwd(), 'test-results', 'login-error-screenshot.png');
      await page.screenshot({ path: errorScreenshot, fullPage: true });
      console.log(`Debug screenshot saved to: ${errorScreenshot}`);
      
      throw error;
    }
  });

  test('should check application health and report status', async ({ page }) => {
    console.log('Step 4: Checking overall application health...');
    
    const results = {
      homepage: false,
      loginPage: false,
      loginFunction: false,
      errors: [] as string[]
    };
    
    try {
      // Test homepage
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      results.homepage = true;
      console.log('✓ Homepage: Working');
    } catch (error) {
      results.errors.push(`Homepage error: ${error instanceof Error ? error.message : String(error)}`);
      console.log('✗ Homepage: Failed');
    }
    
    try {
      // Test login page
      await page.goto('http://localhost:3001/login');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      const emailInput = page.locator('input[type="email"], input[name="email"], input#email');
      const passwordInput = page.locator('input[type="password"], input[name="password"], input#password');
      
      if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
        results.loginPage = true;
        console.log('✓ Login Page: Working');
      } else {
        results.errors.push('Login page missing form elements');
        console.log('✗ Login Page: Missing form elements');
      }
    } catch (error) {
      results.errors.push(`Login page error: ${error instanceof Error ? error.message : String(error)}`);
      console.log('✗ Login Page: Failed');
    }
    
    console.log('\n=== APPLICATION STATUS REPORT ===');
    console.log(`Homepage: ${results.homepage ? 'WORKING' : 'FAILED'}`);
    console.log(`Login Page: ${results.loginPage ? 'WORKING' : 'FAILED'}`);
    console.log(`Login Function: ${results.loginFunction ? 'WORKING' : 'NOT VERIFIED'}`);
    
    if (results.errors.length > 0) {
      console.log('\nErrors encountered:');
      results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    console.log('================================\n');
  });
});
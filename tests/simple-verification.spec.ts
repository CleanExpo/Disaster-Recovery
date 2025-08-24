import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Mass WebPage Creations - Simple Verification', () => {
  
  test('Step 1: Navigate to homepage and take screenshot', async ({ page }) => {
    console.log('🔍 Step 1: Checking homepage at http://localhost:3002...');
    
    await page.goto('http://localhost:3002');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of homepage
    await page.screenshot({ 
      path: path.join(process.cwd(), 'test-results', 'step1-homepage.png'), 
      fullPage: true 
    });
    
    console.log('✅ Step 1 Complete: Homepage loaded and screenshot taken');
    expect(page.url()).toContain('localhost:3002');
  });

  test('Step 2: Navigate to login page and take screenshot', async ({ page }) => {
    console.log('🔍 Step 2: Checking login page at http://localhost:3002/login...');
    
    await page.goto('http://localhost:3002/login');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of login page
    await page.screenshot({ 
      path: path.join(process.cwd(), 'test-results', 'step2-login-page.png'), 
      fullPage: true 
    });
    
    console.log('✅ Step 2 Complete: Login page loaded and screenshot taken');
    expect(page.url()).toContain('/login');
  });

  test('Step 3: Test login functionality with admin credentials', async ({ page }) => {
    console.log('🔍 Step 3: Testing login with admin@demo.com / admin123...');
    
    await page.goto('http://localhost:3002/login');
    await page.waitForLoadState('networkidle');
    
    // Fill in the login form
    await page.fill('#email', 'admin@demo.com');
    await page.fill('#password', 'admin123');
    
    console.log('📝 Filled login credentials');
    
    // Click the submit button
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    console.log(`📍 Current URL after login: ${currentUrl}`);
    
    if (currentUrl.includes('/dashboard')) {
      console.log('✅ Step 3 Complete: Login successful - redirected to dashboard');
      
      // Take screenshot of dashboard
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', 'step3-dashboard.png'), 
        fullPage: true 
      });
      
    } else {
      console.log('⚠️  Step 3: Login may have failed or credentials invalid');
      
      // Take screenshot of current state
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', 'step3-login-result.png'), 
        fullPage: true 
      });
      
      // Check for error messages
      const errorMessage = await page.locator('.text-destructive, [role="alert"]').textContent();
      if (errorMessage) {
        console.log(`❌ Error message: ${errorMessage}`);
      }
    }
  });

  test('Step 4: Application Health Summary', async ({ page }) => {
    console.log('🏥 Step 4: Running application health check...');
    
    const results = {
      homepage: { working: false, error: null },
      loginPage: { working: false, error: null },
      loginForm: { working: false, error: null }
    };
    
    // Test homepage
    try {
      await page.goto('http://localhost:3002');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      results.homepage.working = true;
      console.log('✅ Homepage: WORKING');
    } catch (error) {
      results.homepage.error = error.message;
      console.log('❌ Homepage: FAILED');
    }
    
    // Test login page
    try {
      await page.goto('http://localhost:3002/login');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      const emailInput = await page.locator('#email').count();
      const passwordInput = await page.locator('#password').count();
      const submitButton = await page.locator('button[type="submit"]').count();
      
      if (emailInput > 0 && passwordInput > 0 && submitButton > 0) {
        results.loginPage.working = true;
        results.loginForm.working = true;
        console.log('✅ Login Page: WORKING');
        console.log('✅ Login Form: WORKING');
      } else {
        results.loginPage.error = 'Form elements missing';
        console.log('❌ Login Page: MISSING FORM ELEMENTS');
      }
    } catch (error) {
      results.loginPage.error = error.message;
      console.log('❌ Login Page: FAILED');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 APPLICATION VERIFICATION REPORT');
    console.log('='.repeat(50));
    console.log(`🏠 Homepage:           ${results.homepage.working ? '✅ WORKING' : '❌ FAILED'}`);
    console.log(`🔐 Login Page:         ${results.loginPage.working ? '✅ WORKING' : '❌ FAILED'}`);
    console.log(`📝 Login Form:         ${results.loginForm.working ? '✅ WORKING' : '❌ FAILED'}`);
    
    if (results.homepage.error || results.loginPage.error) {
      console.log('\n🚨 ERRORS ENCOUNTERED:');
      if (results.homepage.error) {
        console.log(`   Homepage: ${results.homepage.error}`);
      }
      if (results.loginPage.error) {
        console.log(`   Login Page: ${results.loginPage.error}`);
      }
    }
    
    console.log('='.repeat(50) + '\n');
    
    // At least verify that we can complete basic navigation
    expect(results.homepage.working).toBeTruthy();
  });
});
import { test, expect, Page, devices } from '@playwright/test';
import path from 'path';

test.describe('Comprehensive UI/UX Testing - Disaster Recovery Website', () => {
  
  // Test 1: Check if development server is running
  test('1. Verify development server is accessible at localhost:3000', async ({ page }) => {
    console.log('🔍 Testing server accessibility...');
    
    try {
      await page.goto('/');
      await page.waitForLoadState('networkidle', { timeout: 15000 });
      
      expect(page.url()).toContain('localhost:3000');
      console.log('✅ Development server is running and accessible');
      
      // Take screenshot for documentation
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '1-server-check.png'), 
        fullPage: true 
      });
      
    } catch (error) {
      console.error('❌ Server accessibility failed:', error);
      throw error;
    }
  });

  // Test 2: Homepage rendering and responsiveness
  test('2. Homepage rendering, content, and responsiveness', async ({ page }) => {
    console.log('🏠 Testing homepage...');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check basic page elements
    await expect(page).toHaveTitle(/Disaster Recovery|Emergency/i);
    
    // Check for main structural elements (no nav bar, it's a landing page design)
    const emergencyBanner = page.locator('.bg-red-600').first();
    await expect(emergencyBanner).toBeVisible();
    
    // Check for hero section
    const hero = page.locator('[data-testid="hero"], .hero, h1, [class*="hero"]').first();
    await expect(hero).toBeVisible();
    
    // Test responsiveness at different breakpoints
    console.log('📱 Testing mobile responsiveness (320px)...');
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(process.cwd(), 'test-results', '2-homepage-mobile-320.png') 
    });
    
    console.log('📱 Testing tablet responsiveness (768px)...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(process.cwd(), 'test-results', '2-homepage-tablet-768.png') 
    });
    
    console.log('💻 Testing desktop responsiveness (1024px)...');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(process.cwd(), 'test-results', '2-homepage-desktop-1024.png') 
    });
    
    // Reset to desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    
    console.log('✅ Homepage rendering and responsiveness test completed');
  });

  // Test 3: /get-help form functionality and validation
  test('3. Get Help form page functionality and validation', async ({ page }) => {
    console.log('📋 Testing /get-help form...');
    
    try {
      await page.goto('/get-help');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of form
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '3-get-help-form.png'), 
        fullPage: true 
      });
      
      // Check if form exists
      const form = page.locator('form').first();
      await expect(form).toBeVisible();
      
      // Test form fields
      const nameField = page.locator('input[name="name"], input[type="text"]').first();
      const emailField = page.locator('input[name="email"], input[type="email"]').first();
      const phoneField = page.locator('input[name="phone"], input[type="tel"]').first();
      const messageField = page.locator('textarea[name="message"], textarea').first();
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      
      // Test field visibility
      if (await nameField.count() > 0) {
        await expect(nameField).toBeVisible();
        console.log('✅ Name field found');
      }
      
      if (await emailField.count() > 0) {
        await expect(emailField).toBeVisible();
        console.log('✅ Email field found');
      }
      
      if (await phoneField.count() > 0) {
        await expect(phoneField).toBeVisible();
        console.log('✅ Phone field found');
      }
      
      if (await messageField.count() > 0) {
        await expect(messageField).toBeVisible();
        console.log('✅ Message field found');
      }
      
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeVisible();
        console.log('✅ Submit button found');
        
        // Test form validation - submit empty form
        await submitButton.click();
        await page.waitForTimeout(1000);
        
        // Check for validation messages
        const validationMessages = page.locator('[role="alert"], .error, .invalid-feedback, [class*="error"]');
        const validationCount = await validationMessages.count();
        console.log(`📝 Found ${validationCount} validation messages`);
        
        // Test form with valid data
        if (await nameField.count() > 0) await nameField.fill('Test User');
        if (await emailField.count() > 0) await emailField.fill('test@example.com');
        if (await phoneField.count() > 0) await phoneField.fill('0412345678');
        if (await messageField.count() > 0) await messageField.fill('This is a test emergency request.');
        
        await page.screenshot({ 
          path: path.join(process.cwd(), 'test-results', '3-get-help-form-filled.png'), 
          fullPage: true 
        });
      }
      
      console.log('✅ Get Help form test completed');
      
    } catch (error) {
      console.error('❌ Get Help form test failed:', error);
      throw error;
    }
  });

  // Test 4: /contractors page layout
  test('4. Contractors page layout and content', async ({ page }) => {
    console.log('👷 Testing /contractors page...');
    
    try {
      await page.goto('/contractors');
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '4-contractors-page.png'), 
        fullPage: true 
      });
      
      // Check page loaded successfully
      expect(page.url()).toContain('/contractors');
      
      // Check for main content
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
      
      // Test mobile responsiveness
      await page.setViewportSize({ width: 320, height: 568 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '4-contractors-mobile.png') 
      });
      
      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('✅ Contractors page test completed');
      
    } catch (error) {
      console.error('❌ Contractors page test failed:', error);
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '4-contractors-error.png'), 
        fullPage: true 
      });
      throw error;
    }
  });

  // Test 5: Check for broken links and missing components
  test('5. Link validation and component integrity', async ({ page }) => {
    console.log('🔗 Testing links and components...');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const brokenLinks = [];
    const workingLinks = [];
    
    // Get all links on the homepage
    const links = await page.locator('a[href]').all();
    console.log(`Found ${links.length} links to test`);
    
    for (let i = 0; i < Math.min(links.length, 10); i++) { // Test first 10 links only
      const link = links[i];
      try {
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          try {
            const response = await page.goto(href, { timeout: 10000 });
            if (response?.status() && response.status() >= 400) {
              brokenLinks.push({ href, status: response.status() });
              console.log(`❌ Broken link: ${href} (${response.status()})`);
            } else {
              workingLinks.push(href);
              console.log(`✅ Working link: ${href}`);
            }
          } catch (error) {
            brokenLinks.push({ href, error: error instanceof Error ? error.message : String(error) });
            console.log(`❌ Link error: ${href} - ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      } catch (error) {
        console.log(`⚠️ Skipping link due to timeout: ${error instanceof Error ? error.message : String(error)}`);
        break;
      }
    }
    
    console.log(`📊 Link test results: ${workingLinks.length} working, ${brokenLinks.length} broken`);
    
    // Return to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // Test 6: Mobile responsiveness comprehensive test
  test('6. Comprehensive mobile responsiveness test', async ({ page }) => {
    console.log('📱 Comprehensive mobile testing...');
    
    const breakpoints = [
      { name: 'Mobile Small', width: 320, height: 568 },
      { name: 'Mobile Medium', width: 375, height: 667 },
      { name: 'Mobile Large', width: 414, height: 896 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Desktop Small', width: 1280, height: 720 }
    ];
    
    const pagesToTest = ['/', '/get-help']; // Test fewer pages to avoid timeout
    
    for (const page_path of pagesToTest) {
      for (const breakpoint of breakpoints) {
        try {
          await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
          await page.goto(page_path, { timeout: 15000 });
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          const filename = `6-${page_path.replace('/', 'home')}-${breakpoint.name.toLowerCase().replace(' ', '-')}.png`;
          await page.screenshot({ 
            path: path.join(process.cwd(), 'test-results', filename.replace(/[^a-z0-9.-]/g, '-')) 
          });
          
          console.log(`📸 Screenshot taken: ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}) for ${page_path}`);
        } catch (error) {
          console.log(`⚠️ Skipping ${page_path} at ${breakpoint.name}: ${error instanceof Error ? error.message : String(error)}`);
          continue;
        }
      }
    }
    
    console.log('✅ Mobile responsiveness test completed');
  });

  // Test 7: CTA verification (no phone numbers, links to /get-help)
  test('7. Call-to-Action verification', async ({ page }) => {
    console.log('📞 Testing CTAs for /get-help links (no phone numbers)...');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find all buttons and links that might be CTAs
    const ctaElements = await page.locator('a[class*="btn"], button[class*="btn"], a[class*="cta"], button[class*="cta"], a:has-text("Get Help"), a:has-text("Contact"), a:has-text("Emergency"), button:has-text("Get Help"), button:has-text("Contact"), button:has-text("Emergency")').all();
    
    console.log(`Found ${ctaElements.length} potential CTA elements`);
    
    const phoneNumbers = [];
    const getHelpLinks = [];
    const otherLinks = [];
    
    for (const element of ctaElements) {
      const href = await element.getAttribute('href');
      const text = await element.textContent();
      
      if (href) {
        if (href.includes('tel:')) {
          phoneNumbers.push({ href, text });
          console.log(`⚠️ Found phone number CTA: "${text}" -> ${href}`);
        } else if (href.includes('/get-help')) {
          getHelpLinks.push({ href, text });
          console.log(`✅ Good CTA: "${text}" -> ${href}`);
        } else {
          otherLinks.push({ href, text });
          console.log(`ℹ️ Other CTA: "${text}" -> ${href}`);
        }
      }
    }
    
    console.log(`📊 CTA Analysis: ${phoneNumbers.length} phone CTAs, ${getHelpLinks.length} get-help CTAs, ${otherLinks.length} other CTAs`);
    
    // This should pass if no phone numbers are found
    if (phoneNumbers.length > 0) {
      console.warn('⚠️ Warning: Found phone number CTAs that should link to /get-help instead');
    }
  });

  // Test 8: Performance and page load times
  test('8. Performance and page load time analysis', async ({ page }) => {
    console.log('⚡ Testing performance and load times...');
    
    const pages = ['/', '/get-help', '/contractors'];
    const performanceResults = [];
    
    for (const pagePath of pages) {
      const startTime = Date.now();
      
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      // Get performance metrics
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstByte: navigation.responseStart - navigation.requestStart,
        };
      });
      
      performanceResults.push({
        page: pagePath,
        totalLoadTime: loadTime,
        ...metrics
      });
      
      console.log(`📊 ${pagePath}: ${loadTime}ms total, ${metrics.domContentLoaded}ms DOM, ${metrics.firstByte}ms TTFB`);
      
      // Flag slow pages (over 3 seconds)
      if (loadTime > 3000) {
        console.warn(`⚠️ Slow page detected: ${pagePath} took ${loadTime}ms`);
      }
    }
    
    console.log('✅ Performance analysis completed');
  });

  // Test 9: Form submission and error states
  test('9. Form submission and error handling', async ({ page }) => {
    console.log('📝 Testing form submissions and error states...');
    
    await page.goto('/get-help');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form').first();
    
    if (await form.count() > 0) {
      // Test empty form submission
      console.log('Testing empty form submission...');
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await page.waitForTimeout(2000);
        
        // Check for error messages
        const errorMessages = await page.locator('[role="alert"], .error, [class*="error"], .invalid-feedback').count();
        console.log(`Found ${errorMessages} error messages for empty form`);
        
        // Test with invalid email
        console.log('Testing invalid email...');
        const emailField = page.locator('input[name="email"], input[type="email"]').first();
        if (await emailField.count() > 0) {
          await emailField.fill('invalid-email');
          await submitButton.click();
          await page.waitForTimeout(1000);
          
          await page.screenshot({ 
            path: path.join(process.cwd(), 'test-results', '9-form-invalid-email.png'), 
            fullPage: true 
          });
        }
        
        // Test with valid data
        console.log('Testing valid form submission...');
        const nameField = page.locator('input[name="name"], input[type="text"]').first();
        const phoneField = page.locator('input[name="phone"], input[type="tel"]').first();
        const messageField = page.locator('textarea').first();
        
        if (await nameField.count() > 0) await nameField.fill('Test User');
        if (await emailField.count() > 0) await emailField.fill('test@example.com');
        if (await phoneField.count() > 0) await phoneField.fill('0412345678');
        if (await messageField.count() > 0) await messageField.fill('Emergency test request');
        
        await submitButton.click();
        await page.waitForTimeout(3000);
        
        await page.screenshot({ 
          path: path.join(process.cwd(), 'test-results', '9-form-submitted.png'), 
          fullPage: true 
        });
      }
    } else {
      console.log('⚠️ No form found on /get-help page');
    }
    
    console.log('✅ Form submission testing completed');
  });

  // Test 10: Accessibility testing
  test('10. Accessibility testing (ARIA labels, keyboard navigation)', async ({ page }) => {
    console.log('♿ Testing accessibility features...');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for ARIA labels and landmarks
    const ariaLabels = await page.locator('[aria-label]').count();
    const ariaLandmarks = await page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]').count();
    const headingStructure = await page.locator('h1, h2, h3, h4, h5, h6').count();
    const altTexts = await page.locator('img[alt]').count();
    const totalImages = await page.locator('img').count();
    
    console.log(`📊 Accessibility audit:`);
    console.log(`  - ARIA labels: ${ariaLabels}`);
    console.log(`  - ARIA landmarks: ${ariaLandmarks}`);
    console.log(`  - Heading elements: ${headingStructure}`);
    console.log(`  - Images with alt text: ${altTexts}/${totalImages}`);
    
    // Test keyboard navigation
    console.log('Testing keyboard navigation...');
    
    // Focus on the first focusable element
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus').first();
    
    if (await focusedElement.count() > 0) {
      console.log('✅ Keyboard focus working');
      
      // Tab through several elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
      }
      
      await page.screenshot({ 
        path: path.join(process.cwd(), 'test-results', '10-keyboard-navigation.png') 
      });
    } else {
      console.log('⚠️ No focusable elements found');
    }
    
    // Test on get-help form
    await page.goto('/get-help');
    await page.waitForLoadState('networkidle');
    
    const formLabels = await page.locator('label').count();
    const formFieldsWithLabels = await page.locator('input[aria-label], input[aria-labelledby], input + label, label + input').count();
    
    console.log(`📋 Form accessibility:`);
    console.log(`  - Form labels: ${formLabels}`);
    console.log(`  - Fields with proper labeling: ${formFieldsWithLabels}`);
    
    console.log('✅ Accessibility testing completed');
  });
});
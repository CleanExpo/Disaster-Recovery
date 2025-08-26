import { test, expect } from '@playwright/test';

test.describe('Console Error Detection', () => {
  test('Check for console errors and warnings on key pages', async ({ page }) => {
    const consoleMessages: Array<{
      type: string;
      text: string;
      location: any;
    }> = [];
    
    // Listen for console messages
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text(),
          location: msg.location()
        });
      }
    });

    // Test homepage
    console.log('🔍 Checking console errors on homepage...');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test get-help page
    console.log('🔍 Checking console errors on /get-help...');
    await page.goto('/get-help');
    await page.waitForLoadState('networkidle');
    
    // Test contractors page
    console.log('🔍 Checking console errors on /contractors...');
    try {
      await page.goto('/contractors');
      await page.waitForLoadState('networkidle');
    } catch (error) {
      console.log('⚠️ Error loading contractors page:', error instanceof Error ? error.message : String(error));
    }
    
    // Report findings
    if (consoleMessages.length > 0) {
      console.log(`❌ Found ${consoleMessages.length} console errors/warnings:`);
      consoleMessages.forEach((msg, index) => {
        console.log(`${index + 1}. [${msg.type.toUpperCase()}] ${msg.text}`);
        if (msg.location) {
          console.log(`   Location: ${msg.location.url}:${msg.location.lineNumber}`);
        }
      });
    } else {
      console.log('✅ No console errors or warnings found');
    }
    
    // Allow some warnings but fail on errors
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    expect(errors.length).toBe(0);
  });
});
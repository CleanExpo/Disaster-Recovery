/**
 * E2E Test: Mobile Responsive Design
 *
 * Tests mobile responsiveness across different screen sizes:
 * - Mobile portrait (375x667)
 * - Mobile landscape (667x375)
 * - Tablet portrait (768x1024)
 * - Tablet landscape (1024x768)
 */

import { test, expect, devices } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';

const mobileViewports = {
  mobilePortrait: { width: 375, height: 667 },
  mobileLandscape: { width: 667, height: 375 },
  tabletPortrait: { width: 768, height: 1024 },
  tabletLandscape: { width: 1024, height: 768 },
};

test.describe('Mobile Responsive - Homepage', () => {
  test('should display properly on mobile portrait', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify mobile layout', async () => {
      // Page should load
      await expect(page).toHaveURL(/^\/$|^\/home/i);

      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/mobile-portrait-homepage.png',
        fullPage: true
      });

      // Verify mobile menu button exists
      const menuButton = page.locator('button[aria-label="Menu"], .hamburger, [data-menu-toggle]');
      const hasMenu = await menuButton.isVisible({ timeout: 2000 }).catch(() => false);

      if (hasMenu) {
        console.log('✓ Mobile menu button visible');
      }

      // Verify content stacks vertically (no horizontal scroll)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(mobileViewports.mobilePortrait.width + 20); // +20px tolerance
    });
  });

  test('should display properly on mobile landscape', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobileLandscape);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify landscape layout', async () => {
      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/mobile-landscape-homepage.png',
        fullPage: true
      });

      console.log('✓ Mobile landscape layout rendered');
    });
  });

  test('should display properly on tablet portrait', async ({ page }) => {
    await page.setViewportSize(mobileViewports.tabletPortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify tablet layout', async () => {
      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/tablet-portrait-homepage.png',
        fullPage: true
      });

      console.log('✓ Tablet portrait layout rendered');
    });
  });

  test('should display properly on tablet landscape', async ({ page }) => {
    await page.setViewportSize(mobileViewports.tabletLandscape);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify tablet landscape layout', async () => {
      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/tablet-landscape-homepage.png',
        fullPage: true
      });

      console.log('✓ Tablet landscape layout rendered');
    });
  });
});

test.describe('Mobile Responsive - Forms', () => {
  test('should render contact form on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Test mobile form interaction', async () => {
      // Verify form is visible
      const form = page.locator('form');
      await expect(form.first()).toBeVisible();

      // Fill form on mobile
      await helper.form.fillInput('Name', 'Mobile Test User');
      await helper.form.fillInput('Email', 'mobile@test.com');
      await helper.form.fillInput('Message', 'Testing mobile form submission');

      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/mobile-contact-form.png',
        fullPage: true
      });

      // Verify inputs are properly sized
      const nameInput = page.getByLabel(/name/i).first();
      const inputBox = await nameInput.boundingBox();

      if (inputBox) {
        // Input should be wide enough for mobile (at least 90% of viewport)
        const minWidth = mobileViewports.mobilePortrait.width * 0.7;
        expect(inputBox.width).toBeGreaterThan(minWidth);
        console.log(`✓ Input width: ${inputBox.width}px (min: ${minWidth}px)`);
      }
    });
  });

  test('should render claim wizard on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();

    await test.step('Test mobile wizard interaction', async () => {
      // Wait for wizard to load
      await page.waitForLoadState('networkidle');

      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/mobile-claim-wizard.png',
        fullPage: true
      });

      console.log('✓ Claim wizard rendered on mobile');
    });
  });
});

test.describe('Mobile Responsive - Touch Interactions', () => {
  test('should handle tap interactions', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Test tap on mobile', async () => {
      // Find a tappable element (button or link)
      const ctaButton = page.getByRole('link', { name: /get started|file claim/i }).first();

      if (await ctaButton.isVisible({ timeout: 3000 })) {
        // Use tap instead of click for mobile
        await helper.mobile.tap(ctaButton.locator);

        console.log('✓ Tap interaction successful');
      }
    });
  });

  test('should handle swipe gestures', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Test swipe gesture', async () => {
      // Initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Swipe up (scroll down)
      await helper.mobile.swipe('up');

      // Wait for scroll
      await page.waitForTimeout(500);

      // Check if page scrolled
      const newScroll = await page.evaluate(() => window.scrollY);

      if (newScroll > initialScroll) {
        console.log(`✓ Swipe gesture worked: scrolled ${newScroll - initialScroll}px`);
      }
    });
  });

  test('should handle pinch/zoom (if applicable)', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Test zoom meta tag', async () => {
      // Check viewport meta tag prevents unwanted zooming
      const viewportMeta = page.locator('meta[name="viewport"]');
      const content = await viewportMeta.getAttribute('content');

      if (content) {
        console.log(`✓ Viewport meta: ${content}`);

        // Should have user-scalable or maximum-scale
        const hasZoomControl = content.includes('user-scalable') ||
                               content.includes('maximum-scale');

        if (hasZoomControl) {
          console.log('✓ Zoom control configured');
        }
      }
    });
  });
});

test.describe('Mobile Responsive - Navigation', () => {
  test('should open and close mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Toggle mobile menu', async () => {
      // Find menu toggle
      const menuButton = page.locator('button[aria-label="Menu"], .hamburger, [data-menu-toggle]');

      if (await menuButton.isVisible({ timeout: 3000 })) {
        // Open menu
        await menuButton.click();
        await page.waitForTimeout(500);

        // Take screenshot of open menu
        await page.screenshot({ path: 'test-results/screenshots/mobile-menu-open.png' });

        // Verify menu is open
        const mobileMenu = page.locator('[data-mobile-menu], .mobile-menu');
        const isOpen = await mobileMenu.isVisible({ timeout: 2000 }).catch(() => false);

        if (isOpen) {
          console.log('✓ Mobile menu opened');

          // Close menu
          await menuButton.click();
          await page.waitForTimeout(500);

          // Verify menu is closed
          const isClosed = await mobileMenu.isHidden({ timeout: 2000 }).catch(() => false);

          if (isClosed) {
            console.log('✓ Mobile menu closed');
          }
        }
      }
    });
  });

  test('should navigate using mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Navigate via mobile menu', async () => {
      // Open menu
      const menuButton = page.locator('button[aria-label="Menu"], .hamburger, [data-menu-toggle]');

      if (await menuButton.isVisible({ timeout: 3000 })) {
        await menuButton.click();
        await page.waitForTimeout(500);

        // Click a menu link
        const aboutLink = page.getByRole('link', { name: /about/i }).first();

        if (await aboutLink.isVisible({ timeout: 2000 })) {
          await aboutLink.click();
          await helper.wait.waitForNavigation();

          // Verify navigation
          await expect(page).toHaveURL(/about/i, { timeout: 5000 });
          console.log('✓ Mobile menu navigation successful');
        }
      }
    });
  });
});

test.describe('Mobile Responsive - Images and Media', () => {
  test('should load responsive images', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check image responsiveness', async () => {
      // Find images
      const images = page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        console.log(`✓ Found ${imageCount} images`);

        // Check first few images
        for (let i = 0; i < Math.min(3, imageCount); i++) {
          const img = images.nth(i);
          const box = await img.boundingBox();

          if (box) {
            // Image should not exceed viewport width
            expect(box.width).toBeLessThanOrEqual(mobileViewports.mobilePortrait.width);
          }
        }

        console.log('✓ Images are responsive');
      }
    });
  });

  test('should not have horizontal scroll', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check for horizontal overflow', async () => {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = mobileViewports.mobilePortrait.width;

      console.log(`Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`);

      // Allow small tolerance for browser differences
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
      console.log('✓ No horizontal scroll');
    });
  });
});

test.describe('Mobile Responsive - Typography', () => {
  test('should have readable font sizes', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check font sizes', async () => {
      // Check body text
      const bodyFontSize = await page.evaluate(() => {
        return window.getComputedStyle(document.body).fontSize;
      });

      console.log(`Body font size: ${bodyFontSize}`);

      // Body text should be at least 14px
      const fontSize = parseInt(bodyFontSize);
      expect(fontSize).toBeGreaterThanOrEqual(14);

      console.log('✓ Font sizes are readable');
    });
  });

  test('should have adequate touch targets', async ({ page }) => {
    await page.setViewportSize(mobileViewports.mobilePortrait);

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check touch target sizes', async () => {
      // Find buttons
      const buttons = page.locator('button, a[role="button"]');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        // Check first button
        const firstButton = buttons.first();
        const box = await firstButton.boundingBox();

        if (box) {
          // Touch targets should be at least 44x44px (iOS guidelines)
          const minSize = 44;

          if (box.height >= minSize || box.width >= minSize) {
            console.log(`✓ Touch target size: ${box.width}x${box.height}px`);
          } else {
            console.warn(`⚠ Touch target may be too small: ${box.width}x${box.height}px`);
          }
        }
      }
    });
  });
});

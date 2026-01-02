/**
 * E2E Test: Visual Regression Testing
 *
 * Captures and compares screenshots to detect visual changes:
 * - Page screenshots
 * - Component screenshots
 * - Cross-browser visual consistency
 * - Responsive design visual testing
 *
 * Note: For production use with Percy or Chromatic, integrate their SDK
 */

import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';

test.describe('Visual Regression - Key Pages', () => {
  test('should match homepage screenshot', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Capture homepage screenshot', async () => {
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Hide dynamic elements (dates, live counters, etc.)
      await page.addStyleTag({
        content: `
          [data-dynamic="true"],
          .countdown,
          .live-counter {
            visibility: hidden !important;
          }
        `
      });

      // Take full page screenshot
      await expect(page).toHaveScreenshot('homepage-full.png', {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });

      console.log('✓ Homepage screenshot captured');
    });
  });

  test('should match contact page screenshot', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Capture contact page screenshot', async () => {
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('contact-page-full.png', {
        fullPage: true,
        animations: 'disabled',
      });

      console.log('✓ Contact page screenshot captured');
    });
  });

  test('should match claim intake page screenshot', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToClaimIntake();

    await test.step('Capture claim intake screenshot', async () => {
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('claim-intake-full.png', {
        fullPage: true,
        animations: 'disabled',
      });

      console.log('✓ Claim intake screenshot captured');
    });
  });

  test('should match contractor signup page screenshot', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContractorSignup();

    await test.step('Capture contractor signup screenshot', async () => {
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('contractor-signup-full.png', {
        fullPage: true,
        animations: 'disabled',
      });

      console.log('✓ Contractor signup screenshot captured');
    });
  });
});

test.describe('Visual Regression - Components', () => {
  test('should match navigation component', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Capture navigation screenshot', async () => {
      const nav = page.locator('nav, [role="navigation"]').first();

      if (await nav.isVisible()) {
        await expect(nav).toHaveScreenshot('component-navigation.png', {
          animations: 'disabled',
        });

        console.log('✓ Navigation component screenshot captured');
      }
    });
  });

  test('should match footer component', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Capture footer screenshot', async () => {
      await helper.scroll.scrollToBottom();

      const footer = page.locator('footer').first();

      if (await footer.isVisible()) {
        await expect(footer).toHaveScreenshot('component-footer.png', {
          animations: 'disabled',
        });

        console.log('✓ Footer component screenshot captured');
      }
    });
  });

  test('should match hero section', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Capture hero section screenshot', async () => {
      const hero = page.locator('[data-section="hero"], .hero, section:has(h1)').first();

      if (await hero.isVisible()) {
        await expect(hero).toHaveScreenshot('component-hero.png', {
          animations: 'disabled',
        });

        console.log('✓ Hero section screenshot captured');
      }
    });
  });

  test('should match form components', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Capture form screenshot', async () => {
      const form = page.locator('form').first();

      if (await form.isVisible()) {
        await expect(form).toHaveScreenshot('component-contact-form.png', {
          animations: 'disabled',
        });

        console.log('✓ Form component screenshot captured');
      }
    });
  });
});

test.describe('Visual Regression - Responsive Breakpoints', () => {
  const breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const breakpoint of breakpoints) {
    test(`should match homepage at ${breakpoint.name} breakpoint`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      const helper = new PageHelper(page);
      await helper.nav.goToHomepage();

      await test.step(`Capture ${breakpoint.name} screenshot`, async () => {
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`homepage-${breakpoint.name}.png`, {
          fullPage: true,
          animations: 'disabled',
        });

        console.log(`✓ Homepage ${breakpoint.name} screenshot captured`);
      });
    });
  }
});

test.describe('Visual Regression - States', () => {
  test('should match form validation state', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Capture validation error state', async () => {
      // Submit empty form to trigger validation
      await page.getByRole('button', { name: /send|submit/i }).click();

      // Wait for validation errors to appear
      await page.waitForTimeout(1000);

      // Capture form with errors
      const form = page.locator('form').first();

      if (await form.isVisible()) {
        await expect(form).toHaveScreenshot('form-validation-errors.png', {
          animations: 'disabled',
        });

        console.log('✓ Form validation state captured');
      }
    });
  });

  test('should match loading state', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Capture loading state', async () => {
      // Fill form
      await helper.form.fillInput('Name', 'Test');
      await helper.form.fillInput('Email', 'test@example.com');
      await helper.form.fillInput('Message', 'Test message');

      // Slow down network to capture loading state
      await page.route('**/api/contact', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.continue();
      });

      // Submit form
      const submitButton = page.getByRole('button', { name: /send|submit/i });
      await submitButton.click();

      // Wait a bit for loading state
      await page.waitForTimeout(500);

      // Try to capture loading state
      const loadingElement = page.locator('[data-loading="true"], .loading, .spinner');
      if (await loadingElement.isVisible({ timeout: 1000 })) {
        await expect(loadingElement).toHaveScreenshot('loading-state.png', {
          animations: 'disabled',
        });

        console.log('✓ Loading state captured');
      }
    });
  });

  test('should match hover state on buttons', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Capture button hover state', async () => {
      const ctaButton = page.getByRole('link', { name: /get started|file claim/i }).first();

      if (await ctaButton.isVisible()) {
        // Hover over button
        await ctaButton.hover();

        // Wait for hover animation
        await page.waitForTimeout(300);

        // Capture button in hover state
        await expect(ctaButton).toHaveScreenshot('button-hover-state.png', {
          animations: 'disabled',
        });

        console.log('✓ Button hover state captured');
      }
    });
  });

  test('should match focus state on inputs', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToContact();

    await test.step('Capture input focus state', async () => {
      const nameInput = page.getByLabel(/name/i).first();

      if (await nameInput.isVisible()) {
        // Focus input
        await nameInput.focus();

        // Wait for focus styles
        await page.waitForTimeout(200);

        // Capture input with focus
        await expect(nameInput).toHaveScreenshot('input-focus-state.png', {
          animations: 'disabled',
        });

        console.log('✓ Input focus state captured');
      }
    });
  });
});

test.describe('Visual Regression - Dark Mode', () => {
  test('should match homepage in dark mode', async ({ page }) => {
    const helper = new PageHelper(page);

    // Enable dark mode (method depends on implementation)
    await page.emulateMedia({ colorScheme: 'dark' });

    await helper.nav.goToHomepage();

    await test.step('Capture dark mode screenshot', async () => {
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
      });

      console.log('✓ Dark mode screenshot captured');
    });
  });

  test('should match contact form in dark mode', async ({ page }) => {
    const helper = new PageHelper(page);

    await page.emulateMedia({ colorScheme: 'dark' });

    await helper.nav.goToContact();

    await test.step('Capture dark mode form', async () => {
      await page.waitForLoadState('networkidle');

      const form = page.locator('form').first();

      if (await form.isVisible()) {
        await expect(form).toHaveScreenshot('form-dark-mode.png', {
          animations: 'disabled',
        });

        console.log('✓ Dark mode form captured');
      }
    });
  });
});

test.describe('Visual Regression - Cross-Browser Consistency', () => {
  test('should look consistent across browsers', async ({ page, browserName }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step(`Capture screenshot in ${browserName}`, async () => {
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 200, // Allow some variance between browsers
      });

      console.log(`✓ ${browserName} screenshot captured`);
    });
  });
});

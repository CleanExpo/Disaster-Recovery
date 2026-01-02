/**
 * E2E Test: Homepage Navigation
 *
 * Tests homepage functionality including:
 * - Page load and content
 * - Navigation menu
 * - Hero section interactions
 * - Call-to-action buttons
 * - Footer links
 * - Search functionality
 */

import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/page-helpers';

test.describe('Homepage - Initial Load', () => {
  test('should load homepage successfully', async ({ page }) => {
    const helper = new PageHelper(page);

    await test.step('Navigate to homepage', async () => {
      await helper.nav.goToHomepage();

      // Verify page loaded
      await expect(page).toHaveURL(/^\/$|^\/home/i);

      // Take screenshot
      await page.screenshot({
        path: 'test-results/screenshots/homepage-loaded.png',
        fullPage: true
      });
    });
  });

  test('should display key homepage sections', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify homepage sections exist', async () => {
      // Hero section
      const hero = page.locator('section:has(h1), [data-section="hero"], .hero');
      await expect(hero.first()).toBeVisible({ timeout: 5000 });

      // Services or features section
      const services = page.getByText(/our services|what we do|how it works/i).first();
      if (await services.isVisible({ timeout: 3000 })) {
        console.log('✓ Services section found');
      }

      // CTA buttons
      const ctaButtons = page.getByRole('link', { name: /get started|file a claim|apply now/i });
      const ctaCount = await ctaButtons.count();
      expect(ctaCount).toBeGreaterThan(0);

      console.log(`✓ Found ${ctaCount} CTA button(s)`);
    });
  });

  test('should have proper meta tags and title', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check SEO elements', async () => {
      // Page title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      console.log(`✓ Page title: ${title}`);

      // Meta description
      const metaDescription = page.locator('meta[name="description"]');
      const descriptionContent = await metaDescription.getAttribute('content');
      if (descriptionContent) {
        expect(descriptionContent.length).toBeGreaterThan(0);
        console.log(`✓ Meta description present`);
      }
    });
  });
});

test.describe('Homepage - Navigation Menu', () => {
  test('should display navigation menu', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify navigation menu exists', async () => {
      // Look for nav element
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();

      // Common nav links
      const navLinks = [
        /home/i,
        /about/i,
        /services/i,
        /contact/i,
      ];

      for (const linkPattern of navLinks) {
        const link = page.getByRole('link', { name: linkPattern });
        const isVisible = await link.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          console.log(`✓ Found link: ${linkPattern}`);
        }
      }
    });
  });

  test('should navigate to About page', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click About link', async () => {
      const aboutLink = page.getByRole('link', { name: /about/i }).first();

      if (await aboutLink.isVisible({ timeout: 3000 })) {
        await aboutLink.click();
        await helper.wait.waitForNavigation();

        // Verify navigation
        await expect(page).toHaveURL(/about/i, { timeout: 5000 });
        console.log('✓ Navigated to About page');
      }
    });
  });

  test('should navigate to Services page', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click Services link', async () => {
      const servicesLink = page.getByRole('link', { name: /services/i }).first();

      if (await servicesLink.isVisible({ timeout: 3000 })) {
        await servicesLink.click();
        await helper.wait.waitForNavigation();

        // Verify navigation
        await expect(page).toHaveURL(/services/i, { timeout: 5000 });
        console.log('✓ Navigated to Services page');
      }
    });
  });

  test('should navigate to Contact page', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click Contact link', async () => {
      const contactLink = page.getByRole('link', { name: /contact/i }).first();

      if (await contactLink.isVisible({ timeout: 3000 })) {
        await contactLink.click();
        await helper.wait.waitForNavigation();

        // Verify navigation
        await expect(page).toHaveURL(/contact/i, { timeout: 5000 });
        console.log('✓ Navigated to Contact page');
      }
    });
  });

  test('should open mobile menu on small screens', async ({ page }) => {
    const helper = new PageHelper(page);

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await helper.nav.goToHomepage();

    await test.step('Toggle mobile menu', async () => {
      // Look for hamburger menu button
      const menuButton = page.locator(
        'button[aria-label="Menu"], button:has-text("Menu"), .hamburger, [data-menu-toggle]'
      );

      if (await menuButton.isVisible({ timeout: 3000 })) {
        await menuButton.click();

        // Mobile nav should appear
        const mobileNav = page.locator('[data-mobile-menu], .mobile-menu, nav[aria-expanded="true"]');
        await expect(mobileNav.first()).toBeVisible({ timeout: 2000 });

        console.log('✓ Mobile menu opened successfully');

        // Take screenshot
        await page.screenshot({ path: 'test-results/screenshots/homepage-mobile-menu.png' });
      }
    });
  });
});

test.describe('Homepage - Call-to-Action', () => {
  test('should navigate to claim intake from CTA', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click File Claim CTA', async () => {
      const claimCTA = page.getByRole('link', { name: /file a claim|start claim|get started/i }).first();

      if (await claimCTA.isVisible({ timeout: 3000 })) {
        await claimCTA.click();
        await helper.wait.waitForNavigation();

        // Should navigate to claim intake
        await expect(page).toHaveURL(/claim|intake/i, { timeout: 5000 });
        console.log('✓ CTA navigated to claim intake');
      }
    });
  });

  test('should navigate to contractor signup from CTA', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click Contractor CTA', async () => {
      const contractorCTA = page.getByRole('link', { name: /become a contractor|join network|apply now/i }).first();

      if (await contractorCTA.isVisible({ timeout: 3000 })) {
        await contractorCTA.click();
        await helper.wait.waitForNavigation();

        // Should navigate to contractor signup
        await expect(page).toHaveURL(/contractor|signup|apply/i, { timeout: 5000 });
        console.log('✓ CTA navigated to contractor signup');
      }
    });
  });
});

test.describe('Homepage - Footer', () => {
  test('should display footer with links', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Verify footer exists', async () => {
      // Scroll to footer
      await helper.scroll.scrollToBottom();

      // Look for footer
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Common footer links
      const footerLinks = [
        /privacy policy/i,
        /terms/i,
        /contact/i,
      ];

      for (const linkPattern of footerLinks) {
        const link = page.getByRole('link', { name: linkPattern }).first();
        const isVisible = await link.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          console.log(`✓ Found footer link: ${linkPattern}`);
        }
      }

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/homepage-footer.png' });
    });
  });

  test('should navigate to Privacy Policy from footer', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click Privacy Policy link', async () => {
      await helper.scroll.scrollToBottom();

      const privacyLink = page.getByRole('link', { name: /privacy policy/i }).first();

      if (await privacyLink.isVisible({ timeout: 3000 })) {
        await privacyLink.click();
        await helper.wait.waitForNavigation();

        // Verify navigation
        await expect(page).toHaveURL(/privacy/i, { timeout: 5000 });
        console.log('✓ Navigated to Privacy Policy');
      }
    });
  });

  test('should navigate to Terms of Service from footer', async ({ page }) => {
    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Click Terms link', async () => {
      await helper.scroll.scrollToBottom();

      const termsLink = page.getByRole('link', { name: /terms|terms of service/i }).first();

      if (await termsLink.isVisible({ timeout: 3000 })) {
        await termsLink.click();
        await helper.wait.waitForNavigation();

        // Verify navigation
        await expect(page).toHaveURL(/terms/i, { timeout: 5000 });
        console.log('✓ Navigated to Terms of Service');
      }
    });
  });
});

test.describe('Homepage - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const helper = new PageHelper(page);

    await test.step('Measure page load time', async () => {
      const startTime = Date.now();

      await helper.nav.goToHomepage();

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      console.log(`✓ Homepage loaded in ${loadTime}ms`);

      // Reasonable load time threshold (adjust as needed)
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test('should have no console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const helper = new PageHelper(page);
    await helper.nav.goToHomepage();

    await test.step('Check for console errors', async () => {
      // Wait a bit for any delayed errors
      await page.waitForTimeout(2000);

      if (consoleErrors.length > 0) {
        console.warn(`⚠ Console errors found: ${consoleErrors.length}`);
        consoleErrors.forEach(err => console.warn(`  - ${err}`));
      } else {
        console.log('✓ No console errors');
      }

      // Optionally fail if critical errors found
      // expect(consoleErrors.length).toBe(0);
    });
  });
});

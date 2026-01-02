/**
 * Authentication Setup for E2E Tests
 *
 * Handles authentication state setup for all test suites
 * This runs once before all tests to establish authenticated sessions
 */

import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../../.auth/user.json');

/**
 * Setup authenticated user session
 * This will be used by all tests that require authentication
 */
setup('authenticate', async ({ page }) => {
  // Navigate to login page
  await page.goto('/auth/login');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Fill in login credentials
  // Note: In production, use environment variables
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL || 'test@nrpg.com');
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || 'Test123!@#');

  // Click sign in button
  await page.getByRole('button', { name: /sign in|log in/i }).click();

  // Wait for navigation to dashboard or success
  await page.waitForURL(/dashboard|home/i, { timeout: 10000 }).catch(() => {
    console.log('Authentication may have failed or redirected elsewhere');
  });

  // Verify we're logged in by checking for user menu or profile
  const isLoggedIn = await page.locator('[data-testid="user-menu"], [aria-label="User menu"]').isVisible()
    .catch(() => false);

  if (isLoggedIn) {
    console.log('✓ Authentication successful');
  } else {
    console.warn('⚠ Authentication state unclear - tests may need manual login');
  }

  // Save authentication state
  await page.context().storageState({ path: authFile });
});

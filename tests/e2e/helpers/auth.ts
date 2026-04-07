import { Page } from '@playwright/test';

/**
 * Test credentials for the DR platform.
 * These are seeded test accounts — never use real credentials here.
 */
export const TEST_USER = {
  email: 'testuser@example.com',
  password: 'TestPassword123!',
} as const;

/**
 * Log in as a test user via the /login page.
 * Waits for navigation to complete before returning.
 */
export async function loginAsTestUser(page: Page): Promise<void> {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill(TEST_USER.email);
  await page.getByLabel(/password/i).fill(TEST_USER.password);
  await page.getByRole('button', { name: /sign in|log in/i }).click();
  // Wait for redirect away from /login
  await page.waitForURL((url) => !url.pathname.startsWith('/login'), {
    timeout: 10_000,
  });
}

/**
 * Log out by navigating directly — clears session cookie via the API route
 * if one exists, otherwise just clears storage.
 */
export async function logout(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

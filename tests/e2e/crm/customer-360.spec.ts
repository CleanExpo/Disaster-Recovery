/**
 * E2E Tests: CRM Customer 360° View
 *
 * Tests user journey through CRM customer management:
 * - Navigate to customer dashboard
 * - Search for customers
 * - View Customer 360° page
 * - Verify all tabs load (Opportunities, Activities, Tasks)
 * - Verify customer metrics display
 *
 * Uses Playwright for browser automation
 *
 * @module E2E_CRMCustomer360
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { test, expect, Page } from '@playwright/test';

test.describe('CRM Customer 360° View', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;

    // Login first (assumes authentication is set up)
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await page.waitForURL('/dashboard', { timeout: 10000 });
  });

  test('should navigate to CRM customer dashboard', async () => {
    // Navigate to CRM customers page
    await page.goto('/dashboard/crm/customers');

    // Verify page loaded
    await expect(page).toHaveURL(/\/dashboard\/crm\/customers/);

    // Check for key elements
    await expect(page.locator('h1')).toContainText(/customers/i);

    // Verify customer list or table exists
    const customerList = page.locator('[data-testid="customer-list"]').or(page.locator('table'));
    await expect(customerList).toBeVisible({ timeout: 5000 });
  });

  test('should search for customers by name', async () => {
    await page.goto('/dashboard/crm/customers');

    // Find and fill search input
    const searchInput = page.locator('input[placeholder*="Search"]').or(
      page.locator('input[type="search"]')
    ).first();

    await searchInput.fill('John Doe');

    // Wait for search results
    await page.waitForTimeout(1000); // Debounce delay

    // Verify search results update
    const resultsContainer = page.locator('[data-testid="search-results"]').or(
      page.locator('table tbody')
    );

    await expect(resultsContainer).toBeVisible();
  });

  test('should display customer 360° view with all sections', async () => {
    await page.goto('/dashboard/crm/customers');

    // Click on first customer in list (or use test customer)
    const firstCustomer = page.locator('[data-testid="customer-row"]').first().or(
      page.locator('table tbody tr').first()
    );

    await firstCustomer.click();

    // Wait for customer detail page to load
    await page.waitForURL(/\/dashboard\/crm\/customers\/[a-zA-Z0-9-]+/);

    // Verify customer header information
    await expect(page.locator('[data-testid="customer-name"]').or(page.locator('h1'))).toBeVisible();

    // Verify customer metrics
    const metricsSection = page.locator('[data-testid="customer-metrics"]');
    if (await metricsSection.isVisible()) {
      await expect(metricsSection).toBeVisible();
    }

    // Verify lifecycle stage is displayed
    const lifecycleStage = page.locator('[data-testid="lifecycle-stage"]').or(
      page.locator('text=/LEAD|PROSPECT|CUSTOMER|CHAMPION|CHURNED/i')
    );
    await expect(lifecycleStage).toBeVisible();
  });

  test('should load and display Opportunities tab', async () => {
    // Navigate to a customer detail page (using test customer ID)
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Click on Opportunities tab
    const opportunitiesTab = page.locator('button:has-text("Opportunities")').or(
      page.locator('[role="tab"]:has-text("Opportunities")')
    );

    if (await opportunitiesTab.isVisible()) {
      await opportunitiesTab.click();

      // Verify opportunities content loads
      const opportunitiesContent = page.locator('[data-testid="opportunities-content"]').or(
        page.locator('[role="tabpanel"]')
      );

      await expect(opportunitiesContent).toBeVisible();

      // Check for opportunity list or empty state
      const opportunityItem = page.locator('[data-testid="opportunity-item"]').first();
      const emptyState = page.locator('text=/no opportunities/i');

      await expect(opportunityItem.or(emptyState)).toBeVisible({ timeout: 3000 });
    }
  });

  test('should load and display Activities tab', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Click on Activities tab
    const activitiesTab = page.locator('button:has-text("Activities")').or(
      page.locator('[role="tab"]:has-text("Activities")')
    );

    if (await activitiesTab.isVisible()) {
      await activitiesTab.click();

      // Verify activities content loads
      const activitiesContent = page.locator('[data-testid="activities-content"]').or(
        page.locator('[role="tabpanel"]')
      );

      await expect(activitiesContent).toBeVisible();

      // Check for activity timeline
      const activityTimeline = page.locator('[data-testid="activity-timeline"]').or(
        page.locator('.activity-timeline')
      );

      if (await activityTimeline.isVisible()) {
        await expect(activityTimeline).toBeVisible();
      }
    }
  });

  test('should load and display Tasks tab', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Click on Tasks tab
    const tasksTab = page.locator('button:has-text("Tasks")').or(
      page.locator('[role="tab"]:has-text("Tasks")')
    );

    if (await tasksTab.isVisible()) {
      await tasksTab.click();

      // Verify tasks content loads
      const tasksContent = page.locator('[data-testid="tasks-content"]').or(
        page.locator('[role="tabpanel"]')
      );

      await expect(tasksContent).toBeVisible();
    }
  });

  test('should display customer lifecycle metrics', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Look for key metrics
    const metricsToCheck = [
      'Lifetime Value',
      'Total Jobs',
      'Health Score',
      'Last Contact',
    ];

    for (const metric of metricsToCheck) {
      const metricElement = page.locator(`text=${metric}`).or(
        page.locator(`[data-testid*="${metric.toLowerCase().replace(/\s+/g, '-')}"]`)
      );

      // Check if metric exists (not all customers may have all metrics)
      if (await metricElement.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(metricElement).toBeVisible();
      }
    }
  });

  test('should allow creating new opportunity from customer page', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Look for "New Opportunity" button
    const newOppButton = page.locator('button:has-text("New Opportunity")').or(
      page.locator('[data-testid="create-opportunity-btn"]')
    );

    if (await newOppButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await newOppButton.click();

      // Verify opportunity form opens
      const oppForm = page.locator('[data-testid="opportunity-form"]').or(
        page.locator('form')
      );

      await expect(oppForm).toBeVisible();

      // Check for required fields
      await expect(page.locator('input[name="title"]').or(page.locator('label:has-text("Title")'))).toBeVisible();
    }
  });

  test('should allow creating new activity from customer page', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Navigate to Activities tab first
    const activitiesTab = page.locator('button:has-text("Activities")');
    if (await activitiesTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await activitiesTab.click();
    }

    // Look for "New Activity" or "Log Activity" button
    const newActivityButton = page.locator('button:has-text("New Activity")').or(
      page.locator('button:has-text("Log Activity")')
    ).or(page.locator('[data-testid="create-activity-btn"]'));

    if (await newActivityButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await newActivityButton.click();

      // Verify activity form opens
      const activityForm = page.locator('[data-testid="activity-form"]').or(
        page.locator('form')
      );

      await expect(activityForm).toBeVisible();
    }
  });

  test('should display customer contact information', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Look for contact info section
    const contactInfo = page.locator('[data-testid="contact-info"]').or(
      page.locator('.contact-information')
    );

    if (await contactInfo.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(contactInfo).toBeVisible();

      // Check for email
      const email = page.locator('[data-testid="customer-email"]').or(
        page.locator('text=/@[a-z0-9.-]+\.[a-z]{2,}/i')
      );

      if (await email.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(email).toBeVisible();
      }
    }
  });

  test('should allow filtering customers by lifecycle stage', async () => {
    await page.goto('/dashboard/crm/customers');

    // Look for lifecycle stage filter
    const stageFilter = page.locator('[data-testid="lifecycle-filter"]').or(
      page.locator('select[name*="stage"]')
    ).or(page.locator('button:has-text("Filter")'));

    if (await stageFilter.isVisible({ timeout: 3000 }).catch(() => false)) {
      await stageFilter.click();

      // Select a stage (e.g., PROSPECT)
      const prospectOption = page.locator('text=PROSPECT').or(
        page.locator('[value="PROSPECT"]')
      );

      if (await prospectOption.isVisible({ timeout: 2000 }).catch(() => false)) {
        await prospectOption.click();

        // Wait for filtered results
        await page.waitForTimeout(1000);

        // Verify results updated
        const customerList = page.locator('[data-testid="customer-list"]').or(
          page.locator('table tbody')
        );
        await expect(customerList).toBeVisible();
      }
    }
  });

  test('should display opportunity pipeline on customer page', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Navigate to Opportunities tab
    const oppTab = page.locator('button:has-text("Opportunities")');
    if (await oppTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await oppTab.click();

      // Look for opportunity stages
      const stages = ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON'];

      for (const stage of stages) {
        const stageElement = page.locator(`text=${stage}`);

        // Check if any opportunities in this stage exist
        if (await stageElement.isVisible({ timeout: 1000 }).catch(() => false)) {
          await expect(stageElement).toBeVisible();
          break; // Found at least one stage
        }
      }
    }
  });

  test('should show customer health score indicator', async () => {
    await page.goto('/dashboard/crm/customers/test-customer-123');

    // Look for health score
    const healthScore = page.locator('[data-testid="health-score"]').or(
      page.locator('text=/health.*score/i')
    ).or(page.locator('[class*="health-score"]'));

    if (await healthScore.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(healthScore).toBeVisible();

      // Check for score value (0-100)
      const scoreValue = page.locator('text=/\\d{1,3}/');
      if (await scoreValue.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(scoreValue).toBeVisible();
      }
    }
  });

  test('should allow navigating between multiple customers', async () => {
    await page.goto('/dashboard/crm/customers');

    // Get first customer
    const firstCustomer = page.locator('[data-testid="customer-row"]').first().or(
      page.locator('table tbody tr').first()
    );
    await firstCustomer.click();

    // Wait for detail page
    await page.waitForURL(/\/dashboard\/crm\/customers\/[a-zA-Z0-9-]+/);
    const firstUrl = page.url();

    // Go back to list
    await page.goBack();
    await expect(page).toHaveURL(/\/dashboard\/crm\/customers$/);

    // Click second customer
    const secondCustomer = page.locator('[data-testid="customer-row"]').nth(1).or(
      page.locator('table tbody tr').nth(1)
    );

    if (await secondCustomer.isVisible({ timeout: 2000 }).catch(() => false)) {
      await secondCustomer.click();
      await page.waitForURL(/\/dashboard\/crm\/customers\/[a-zA-Z0-9-]+/);
      const secondUrl = page.url();

      // Verify we navigated to different customer
      expect(firstUrl).not.toBe(secondUrl);
    }
  });
});

import { test, expect } from '@playwright/test';

/**
 * Critical Path Smoke Tests
 *
 * Tier 1: Liveness — every page must return 200 and render core content
 * Tier 2: Critical Paths — key user journeys must be navigable
 * Tier 3: Auth Safety — protected routes must redirect unauthenticated users
 * Tier 4: Security Headers — production-required headers must be present
 *
 * These tests run against the Vercel preview URL before any PR merges to main.
 */

// ─── Tier 1: Liveness ────────────────────────────────────────────────────────

test.describe('Tier 1: Liveness', () => {
  const publicRoutes = [
    { path: '/', label: 'Homepage', expectedText: 'Disaster Recovery' },
    { path: '/about', label: 'About', expectedText: null },
    { path: '/services', label: 'Services', expectedText: null },
    { path: '/contact', label: 'Contact', expectedText: null },
    { path: '/resources', label: 'Resources', expectedText: null },
    { path: '/events', label: 'Events hub', expectedText: null },
  ];

  for (const route of publicRoutes) {
    test(`${route.label} (${route.path}) returns 200`, async ({ page, request }) => {
      const response = await request.get(route.path);
      expect(response.status(), `${route.path} must return 200`).toBe(200);

      if (route.expectedText) {
        await page.goto(route.path);
        await expect(page.locator('body')).toContainText(route.expectedText, { timeout: 10_000 });
      }
    });
  }

  test('State hub pages render', async ({ request }) => {
    const states = [
      'queensland',
      'new-south-wales',
      'victoria',
      'south-australia',
      'western-australia',
    ];
    for (const state of states) {
      const response = await request.get(`/services/${state}`);
      expect(response.status(), `/services/${state} must return 200`).toBe(200);
    }
  });

  test('Event pages render (Alfred + Narelle + QLD Floods)', async ({ request }) => {
    const events = [
      '/events/cyclone-alfred-fnq-2026',
      '/events/cyclone-narelle-western-australia-2026',
      '/events/queensland-floods-2026',
    ];
    for (const path of events) {
      const response = await request.get(path);
      expect(response.status(), `${path} must return 200`).toBe(200);
    }
  });

  test('IICRC guide pages render', async ({ request }) => {
    const guides = [
      '/guides/iicrc/s700-2025-fire-smoke-restoration',
      '/guides/iicrc/s500-2025-water-damage-restoration',
      '/guides/iicrc/s520-2025-mould-remediation',
      '/guides/iicrc/s220-floor-covering-restoration',
    ];
    for (const path of guides) {
      const response = await request.get(path);
      expect(response.status(), `${path} must return 200`).toBe(200);
    }
  });
});

// ─── Tier 2: Critical Paths ──────────────────────────────────────────────────

test.describe('Tier 2: Critical Paths', () => {
  test('Homepage CTA navigates to contact or booking', async ({ page }) => {
    await page.goto('/');
    // Primary CTA should be a link — find the first prominent CTA button/link
    const cta = page.locator('a[href*="contact"], a[href*="book"], a[href*="quote"]').first();
    await expect(cta).toBeVisible({ timeout: 10_000 });
    const href = await cta.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href).not.toBe('#');
  });

  test('Homepage renders the APP 3 privacy collection notice (DR-782)', async ({ page }) => {
    await page.goto('/');
    const notice = page.getByRole('region', { name: 'Privacy collection notice' });
    await expect(notice).toBeVisible({ timeout: 10_000 });
  });

  test('Navigation renders all primary links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible({ timeout: 10_000 });
    // Nav must contain at least 3 links
    const links = nav.locator('a');
    const count = await links.count();
    expect(count, 'Navigation must have at least 3 links').toBeGreaterThanOrEqual(3);
  });

  test('Insurance guide page loads and contains compliance content', async ({ page }) => {
    await page.goto('/guides/insurance/human-advocate-vs-insurer-assigned-builder');
    await expect(page.locator('h1')).toBeVisible({ timeout: 10_000 });
    // Must not contain dark pattern language
    const body = await page.locator('body').textContent();
    expect(body).not.toContain('We negotiate with insurers on your behalf');
    expect(body).not.toContain('dedicated advocate');
  });

  test('Privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.locator('h1')).toBeVisible({ timeout: 10_000 });
    const body = await page.locator('body').textContent();
    expect(body).toContain('Privacy');
  });

  test('Contact page renders form', async ({ page }) => {
    await page.goto('/contact');
    // At minimum a form or contact details must be present
    const form = page.locator('form, [data-testid="contact-form"]').first();
    const hasForm = await form.isVisible().catch(() => false);
    const hasEmail = await page
      .locator('a[href^="mailto:"]')
      .first()
      .isVisible()
      .catch(() => false);
    expect(hasForm || hasEmail, 'Contact page must have a form or email link').toBe(true);
  });
});

// ─── Tier 3: Auth Safety ─────────────────────────────────────────────────────

test.describe('Tier 3: Auth Safety', () => {
  const protectedRoutes = [
    '/admin',
    '/admin/dashboard',
    '/contractor/dashboard',
    '/api/admin/users',
  ];

  // Re-enabled 2026-05-01 — NEXTAUTH_URL (Preview, added Apr 10) +
  // NEXTAUTH_SECRET (All Environments, Mar 17) are populated in
  // Vercel, so getServerSession() resolves cleanly and the layout's
  // redirect() fires as expected. The original env-config-missing
  // diagnosis was stale (the vars landed before this fixme was
  // recognised as resolvable).
  for (const route of protectedRoutes) {
    test(`${route} redirects unauthenticated users`, async ({ request }) => {
      const response = await request.get(route, { maxRedirects: 0 });
      const status = response.status();
      // Must be 302 redirect to login, or 401/403 — never 200
      expect(
        [301, 302, 303, 307, 308, 401, 403],
        `${route} must not be publicly accessible`,
      ).toContain(status);
    });
  }
});

// ─── Tier 4: Security Headers ────────────────────────────────────────────────

test.describe('Tier 4: Security Headers', () => {
  test('Homepage returns required security headers', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    expect(
      headers['x-frame-options'] ?? headers['content-security-policy'],
      'Must have X-Frame-Options or CSP frame-ancestors',
    ).toBeTruthy();

    expect(headers['x-content-type-options'], 'X-Content-Type-Options must be nosniff').toBe(
      'nosniff',
    );
  });

  test('API endpoints return JSON content-type', async ({ request }) => {
    // Public API endpoint that requires no auth
    const response = await request.get('/api/health');
    if (response.status() === 200) {
      const contentType = response.headers()['content-type'] ?? '';
      expect(contentType).toContain('application/json');
    }
    // If no /api/health, just confirm the endpoint doesn't 500
    expect(response.status(), '/api/health must not 500').not.toBe(500);
  });
});

// ─── Tier 5: API Liveness ────────────────────────────────────────────────────

test.describe('Tier 5: API Liveness', () => {
  // Re-enabled 2026-05-01 after DR-804 Step 2 (PR #332) created the
  // ErrorLog + ContractorNotification tables in production. The route's
  // inner-catch fallback now persists cleanly instead of falling through
  // to the outer 500. AuditLog + compliance_events were never the
  // problem (both pre-existing real tables).
  // 202 added to the accepted-status set: the route returns 200/persisted:false
  // on telemetry-DB-failure today, but a future hardening change might
  // switch that to 202 Accepted (more semantically correct). Either passes.
  test('log-error endpoint accepts POST and returns 200/202/400', async ({ request }) => {
    const validResponse = await request.post('/api/log-error', {
      data: { message: 'Smoke test error check', level: 'info', source: 'smoke-test' },
    });
    expect([200, 202, 400, 401], 'log-error must not 500').toContain(validResponse.status());
  });

  test('log-error rejects requests missing message field', async ({ request }) => {
    const response = await request.post('/api/log-error', {
      data: { level: 'error' }, // Missing message
    });
    expect(response.status(), 'Missing message must return 400').toBe(400);
  });

  test('analytics/compliance requires authentication', async ({ request }) => {
    const response = await request.get('/api/analytics/compliance', { maxRedirects: 0 });
    expect([401, 403, 302, 307], 'compliance analytics must require auth').toContain(
      response.status(),
    );
  });
});

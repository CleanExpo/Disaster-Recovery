import { expect, test } from '@playwright/test';

// Vercel injects these endpoints at deployment time; localhost cannot serve them.
// Run explicitly against the intended deployment, never against a guessed project.
test.describe('Vercel Analytics deployment', () => {
  test.skip(process.env.VERCEL_ANALYTICS_SMOKE !== 'true', 'Requires a Vercel deployment target');

  for (const path of ['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js']) {
    test(`${path} serves JavaScript`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toMatch(/(?:application|text)\/javascript/);
      expect(await response.text()).not.toMatch(/^\s*<!doctype html/i);
    });
  }

  test('capture the claim page top band for visual review', async ({ page }) => {
    await page.goto('/claim');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /dial 000|call 000/i }).first()).toBeVisible();

    const layout = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('main, nav, h1, [role="alert"]'))
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            tag: element.tagName,
            className: element.className,
            top: bounds.top,
            height: bounds.height,
            paddingTop: style.paddingTop,
            marginTop: style.marginTop,
          };
        });
    });
    await test.info().attach('claim-top-layout', {
      body: JSON.stringify(layout, null, 2),
      contentType: 'application/json',
    });
    await test.info().attach('claim-top-band', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
});

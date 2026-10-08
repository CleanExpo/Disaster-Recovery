import { expect, test } from '@playwright/test';

function contrast(foreground: string, background: string): number {
  function luminance(colour: string): number {
    const channels = colour.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (!channels || channels.length !== 3) {
      throw new Error(`Unexpected computed colour: ${colour}`);
    }
    const linear = channels.map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  }
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const routes = ['/signup', '/login', '/forgot-password', '/reset-password', '/contractor/activate'];

for (const colourScheme of ['light', 'dark'] as const) {
  test.describe(`Auth input contrast (${colourScheme})`, () => {
    test.use({ colorScheme: colourScheme });

    for (const route of routes) {
      test(`${route}: borders, placeholders and entered text remain visible`, async ({ page }) => {
        await page.goto(route);
        const inputs = page.locator('input.ag-auth-input');
        await expect(inputs.first()).toBeVisible();

        for (let index = 0; index < (await inputs.count()); index += 1) {
          const input = inputs.nth(index);
          await expect(input).toBeEnabled();

          for (const state of ['rest', 'hover', 'focus'] as const) {
            if (state === 'hover') await input.hover();
            if (state === 'focus') await input.focus();

            const styles = await input.evaluate((element) => {
              const style = getComputedStyle(element);
              const placeholder = getComputedStyle(element, '::placeholder');
              return {
                colour: style.color,
                background: style.backgroundColor,
                border: style.borderTopColor,
                borderWidth: parseFloat(style.borderTopWidth),
                borderStyle: style.borderTopStyle,
                opacity: style.opacity,
                placeholderColour: placeholder.color,
                placeholderOpacity: placeholder.opacity,
                outline: style.outlineStyle,
                outlineWidth: parseFloat(style.outlineWidth),
                height: element.getBoundingClientRect().height,
              };
            });

            expect(styles.opacity).toBe('1');
            expect(styles.height).toBeGreaterThanOrEqual(44);
            expect(styles.borderWidth).toBeGreaterThanOrEqual(1);
            expect(styles.borderStyle).toBe('solid');
            expect(contrast(styles.border, styles.background)).toBeGreaterThanOrEqual(3);
            expect(contrast(styles.colour, styles.background)).toBeGreaterThanOrEqual(4.5);
            if (await input.getAttribute('placeholder')) {
              expect(styles.placeholderOpacity).toBe('1');
              expect(contrast(styles.placeholderColour, styles.background)).toBeGreaterThanOrEqual(4.5);
            }
            if (state === 'focus') {
              expect(styles.outline).toBe('solid');
              expect(styles.outlineWidth).toBeGreaterThanOrEqual(2);
            }
          }

          const value = (await input.getAttribute('type')) === 'email'
            ? 'alex@example.com'
            : 'AlexTaylor123!';
          await input.fill(value);
          await expect(input).toHaveValue(value);
          await input.evaluate((element) => (element as HTMLInputElement).blur());
          const entered = await input.evaluate((element) => {
            const style = getComputedStyle(element);
            return { colour: style.color, background: style.backgroundColor };
          });
          expect(contrast(entered.colour, entered.background)).toBeGreaterThanOrEqual(4.5);
        }

        await test.info().attach('auth-inputs', {
          body: await page.screenshot({ fullPage: true }),
          contentType: 'image/png',
        });
      });
    }
  });
}

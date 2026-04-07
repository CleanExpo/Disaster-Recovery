import { Page } from '@playwright/test';

export const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  mobileLandscape: { width: 812, height: 375 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  wide: { width: 1920, height: 1080 },
} as const;

export type ViewportName = keyof typeof VIEWPORTS;

/**
 * Resize the page to a named viewport preset.
 */
export async function setViewport(page: Page, name: ViewportName): Promise<void> {
  await page.setViewportSize(VIEWPORTS[name]);
}

/**
 * Resize the page to mobile (375 × 812) — convenience wrapper.
 */
export async function setMobileViewport(page: Page): Promise<void> {
  await setViewport(page, 'mobile');
}

/**
 * Resize the page to desktop (1280 × 800) — convenience wrapper.
 */
export async function setDesktopViewport(page: Page): Promise<void> {
  await setViewport(page, 'desktop');
}

/**
 * Returns true if the current viewport width is ≤ 768 px (mobile/tablet).
 */
export async function isMobileViewport(page: Page): Promise<boolean> {
  const width = page.viewportSize()?.width ?? 1280;
  return width <= 768;
}

/**
 * E2E Test Page Helpers
 *
 * Reusable helper functions for common page interactions,
 * form filling, navigation, and assertions
 */

import { Page, expect, Locator } from '@playwright/test';

/**
 * Navigation Helpers
 */
export class NavigationHelper {
  constructor(private page: Page) {}

  async goToHomepage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async goToClaimIntake() {
    await this.page.goto('/claim/intake');
    await this.page.waitForLoadState('networkidle');
  }

  async goToContractorSignup() {
    await this.page.goto('/contractor/signup');
    await this.page.waitForLoadState('networkidle');
  }

  async goToContact() {
    await this.page.goto('/contact');
    await this.page.waitForLoadState('networkidle');
  }

  async goToDashboard() {
    await this.page.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async clickNavLink(linkText: string) {
    await this.page.getByRole('link', { name: linkText }).click();
    await this.page.waitForLoadState('networkidle');
  }
}

/**
 * Form Helpers
 */
export class FormHelper {
  constructor(private page: Page) {}

  async fillInput(label: string, value: string) {
    const input = this.page.getByLabel(label, { exact: false });
    await input.fill(value);
  }

  async fillInputByPlaceholder(placeholder: string, value: string) {
    const input = this.page.getByPlaceholder(placeholder);
    await input.fill(value);
  }

  async selectOption(label: string, value: string) {
    const select = this.page.getByLabel(label, { exact: false });
    await select.selectOption(value);
  }

  async checkCheckbox(label: string) {
    const checkbox = this.page.getByLabel(label, { exact: false });
    await checkbox.check();
  }

  async uncheckCheckbox(label: string) {
    const checkbox = this.page.getByLabel(label, { exact: false });
    await checkbox.uncheck();
  }

  async selectRadio(label: string) {
    const radio = this.page.getByLabel(label, { exact: false });
    await radio.check();
  }

  async uploadFile(inputSelector: string, filePath: string) {
    const fileInput = this.page.locator(inputSelector);
    await fileInput.setInputFiles(filePath);
  }

  async submitForm(buttonText: string = 'Submit') {
    const submitButton = this.page.getByRole('button', { name: buttonText });
    await submitButton.click();
  }

  async waitForFormSubmission() {
    await this.page.waitForLoadState('networkidle');
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    await this.fillInput('Name', data.name);
    await this.fillInput('Email', data.email);
    if (data.phone) await this.fillInput('Phone', data.phone);
    if (data.subject) await this.fillInput('Subject', data.subject);
    await this.fillInput('Message', data.message);
  }
}

/**
 * Wait Helpers
 */
export class WaitHelper {
  constructor(private page: Page) {}

  async waitForElement(selector: string, timeout: number = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForText(text: string, timeout: number = 10000) {
    await this.page.waitForSelector(`text=${text}`, { timeout });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForUrl(url: string | RegExp, timeout: number = 10000) {
    await this.page.waitForURL(url, { timeout });
  }

  async waitForApiResponse(urlPattern: string | RegExp, timeout: number = 10000) {
    await this.page.waitForResponse(urlPattern, { timeout });
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}

/**
 * Assertion Helpers
 */
export class AssertionHelper {
  constructor(private page: Page) {}

  async expectToBeOnPage(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  async expectPageTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectElementVisible(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();
  }

  async expectElementHidden(selector: string) {
    const element = this.page.locator(selector);
    await expect(element).toBeHidden();
  }

  async expectTextVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectInputValue(label: string, value: string) {
    const input = this.page.getByLabel(label, { exact: false });
    await expect(input).toHaveValue(value);
  }

  async expectButtonEnabled(buttonText: string) {
    const button = this.page.getByRole('button', { name: buttonText });
    await expect(button).toBeEnabled();
  }

  async expectButtonDisabled(buttonText: string) {
    const button = this.page.getByRole('button', { name: buttonText });
    await expect(button).toBeDisabled();
  }

  async expectElementCount(selector: string, count: number) {
    const elements = this.page.locator(selector);
    await expect(elements).toHaveCount(count);
  }

  async expectSuccessMessage(message?: string) {
    if (message) {
      await expect(this.page.getByText(message)).toBeVisible();
    } else {
      const successElement = this.page.locator('[role="status"], .success, .alert-success');
      await expect(successElement).toBeVisible();
    }
  }

  async expectErrorMessage(message?: string) {
    if (message) {
      await expect(this.page.getByText(message)).toBeVisible();
    } else {
      const errorElement = this.page.locator('[role="alert"], .error, .alert-error');
      await expect(errorElement).toBeVisible();
    }
  }
}

/**
 * Scroll Helpers
 */
export class ScrollHelper {
  constructor(private page: Page) {}

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToElement(selector: string) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  async scrollBy(x: number, y: number) {
    await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
  }
}

/**
 * Screenshot Helpers
 */
export class ScreenshotHelper {
  constructor(private page: Page) {}

  async takeFullPageScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async takeViewportScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async takeElementScreenshot(selector: string, name: string) {
    const element = this.page.locator(selector);
    await element.screenshot({ path: `screenshots/${name}.png` });
  }
}

/**
 * Dialog Helpers
 */
export class DialogHelper {
  constructor(private page: Page) {}

  async acceptDialog() {
    this.page.once('dialog', dialog => dialog.accept());
  }

  async dismissDialog() {
    this.page.once('dialog', dialog => dialog.dismiss());
  }

  async acceptDialogWithText(text: string) {
    this.page.once('dialog', dialog => dialog.accept(text));
  }

  async getDialogMessage(): Promise<string> {
    return new Promise(resolve => {
      this.page.once('dialog', dialog => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
  }
}

/**
 * Mobile Helpers
 */
export class MobileHelper {
  constructor(private page: Page) {}

  async tap(selector: string) {
    const element = this.page.locator(selector);
    await element.tap();
  }

  async swipe(direction: 'up' | 'down' | 'left' | 'right') {
    const viewportSize = this.page.viewportSize();
    if (!viewportSize) return;

    const startX = viewportSize.width / 2;
    const startY = viewportSize.height / 2;
    let endX = startX;
    let endY = startY;

    const swipeDistance = 200;

    switch (direction) {
      case 'up':
        endY -= swipeDistance;
        break;
      case 'down':
        endY += swipeDistance;
        break;
      case 'left':
        endX -= swipeDistance;
        break;
      case 'right':
        endX += swipeDistance;
        break;
    }

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(endX, endY);
    await this.page.mouse.up();
  }

  async toggleOrientation() {
    const viewportSize = this.page.viewportSize();
    if (!viewportSize) return;

    await this.page.setViewportSize({
      width: viewportSize.height,
      height: viewportSize.width,
    });
  }
}

/**
 * Combined Page Object Helper
 */
export class PageHelper {
  nav: NavigationHelper;
  form: FormHelper;
  wait: WaitHelper;
  assert: AssertionHelper;
  scroll: ScrollHelper;
  screenshot: ScreenshotHelper;
  dialog: DialogHelper;
  mobile: MobileHelper;

  constructor(public page: Page) {
    this.nav = new NavigationHelper(page);
    this.form = new FormHelper(page);
    this.wait = new WaitHelper(page);
    this.assert = new AssertionHelper(page);
    this.scroll = new ScrollHelper(page);
    this.screenshot = new ScreenshotHelper(page);
    this.dialog = new DialogHelper(page);
    this.mobile = new MobileHelper(page);
  }
}

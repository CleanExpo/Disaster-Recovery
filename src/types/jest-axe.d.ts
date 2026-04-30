/**
 * Type augmentation: register jest-axe's `toHaveNoViolations` matcher
 * with vitest's `expect`. The matcher is wired in `vitest.setup.ts`.
 */

import 'vitest';

interface AxeMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers<T> {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

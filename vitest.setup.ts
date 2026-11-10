import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Register jest-axe's `toHaveNoViolations` matcher with vitest's expect.
// Used by a11y test files (see src/components/__tests__/*.a11y.test.tsx).
expect.extend(toHaveNoViolations);

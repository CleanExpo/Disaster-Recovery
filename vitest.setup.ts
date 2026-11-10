import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Register jest-axe's `toHaveNoViolations` matcher with vitest's expect.
// Used by a11y test files (see src/components/__tests__/*.a11y.test.tsx).
expect.extend(toHaveNoViolations);

// Testing Library's findBy*/waitFor give up after 1000 ms by default. On a busy GitHub
// runner the claim form took just over that to appear after "Resume" (run 42727713963,
// failed at 1048 ms, passed on re-run; DR-978). 3000 ms stays under vitest's 5000 ms
// per-test limit. A real bug still fails: an element that never appears times out at 3 s.
configure({ asyncUtilTimeout: 3000 });

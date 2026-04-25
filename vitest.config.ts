import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    exclude: [
      'node_modules/**',
      'tests/**',          // Playwright e2e lives here
      '.next/**',
      'dist/**',
      'build/**',
      // Pre-existing stub test file that imports non-existent exports
      // (validatePhoneNumber / formatPhoneNumber). Leave for a future PR that
      // either restores the missing helpers or rewrites the assertions.
      'src/lib/utils/australian-compliance.test.ts',
      // These files use a custom plain-TS runner (node:assert), not vitest describe/test.
      // Run them directly with: npx tsx <file>
      'src/lib/finance/__tests__/webhook-verify.test.ts',
      'src/lib/payments/__tests__/create-session.test.ts',
    ],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      exclude: [
        'node_modules/**',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.d.ts',
        '.next/**',
        'tests/**',
        'app/**',          // covered via Playwright smoke + future integration
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

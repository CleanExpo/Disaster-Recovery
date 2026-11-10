import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// DR-979: Node 25+ defines a `localStorage` key on globalThis (undefined
// without --localstorage-file), so happy-dom does not install its own and
// localStorage-backed tests fail. --no-webstorage removes Node's key.
// Node 24 and older reject the flag, so pass it only from Node 25.
const nodeMajor = Number(process.versions.node.split('.')[0]);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    execArgv: nodeMajor >= 25 ? ['--no-webstorage'] : [],
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    exclude: [
      'node_modules/**',
      'tests/**', // Playwright e2e lives here
      '.next/**',
      'dist/**',
      'build/**',
      // Pre-existing stub test file that imports non-existent exports
      // (validatePhoneNumber / formatPhoneNumber). Leave for a future PR that
      // either restores the missing helpers or rewrites the assertions.
      'src/lib/utils/australian-compliance.test.ts',
      // Custom tsx-runner tests (no Vitest describe/test blocks) — run via
      // `npx tsx <file>` as documented in their file-level comments.
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
        'app/**', // covered via Playwright smoke + future integration
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

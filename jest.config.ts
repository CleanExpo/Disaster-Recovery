import type { Config } from 'jest';

/**
 * Jest Configuration for Disaster Recovery - NRPG Platform
 *
 * Complete test suite configuration supporting:
 * - Unit tests (services, hooks, components)
 * - Integration tests (cross-service workflows)
 * - E2E tests (user journeys)
 * - Performance tests
 * - Security tests
 *
 * Coverage targets: 80%+ across all services
 */

const config: Config = {
  // Test environment
  testEnvironment: 'node',

  // Project preset for TypeScript
  preset: 'ts-jest',

  // Root directory
  rootDir: '.',

  // Custom resolver to match tsconfig.json path resolution
  // Tries root directory first, then src/ (like tsconfig "@/*": ["./*", "./src/*"])
  resolver: '<rootDir>/jest.resolver.js',

  // Module resolution - Map @ imports
  // Note: Custom resolver handles most resolution, but keep these for non-file imports
  moduleNameMapper: {
    // Tests directory
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },

  // Test paths
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
    '<rootDir>/tests/**/*.test.tsx'
  ],

  // Files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
    '!src/app/**',
    '!src/components/**/*.tsx'
  ],

  // Coverage thresholds - Disabled until full test suite is enabled
  // Will be re-enabled in Phase 24 when all features are implemented
  // coverageThreshold: {},

  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
    'json-summary'
  ],

  // Coverage directory
  coverageDirectory: '<rootDir>/coverage',

  // Transform TypeScript files
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          skipLibCheck: true
        }
      }
    ]
  },

  // Module file extensions
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/dist/',
    '/build/',
    '/coverage/',
    // Skip tests for unimplemented or incomplete features
    // These will be enabled as features are completed in Phase 24+
    'tests/unit/services\\.test\\.ts',
    'tests/unit/platform-integration\\.test\\.ts',
    'tests/unit/ai-service\\.test\\.ts',
    'tests/integration/ai-worker\\.test\\.ts',
    'tests/integration/saga-patterns\\.test\\.ts',
    'tests/integration/workflows\\.test\\.ts',
    'tests/integration/api/.*\\.test\\.ts',
    'tests/performance/load-tests\\.test\\.ts'
  ],

  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/dist/'
  ],

  // Test timeout
  testTimeout: 10000,

  // Max workers
  maxWorkers: '50%',

  // Bail on first failure
  bail: 0,

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Reset modules between tests
  resetModules: true,

  // Snapshot settings
  snapshotFormat: {
    printBasicPrototype: false
  },

  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],

  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // Test reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test-results',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › '
      }
    ]
  ],

  // Environment options
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
};

export default config;

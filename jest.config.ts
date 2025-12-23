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

  // Module resolution - Map @ imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1'
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

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/lib/messaging/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    './src/lib/platform/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    './src/lib/security/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },

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
        },
        isolatedModules: true
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
    '/coverage/'
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
  },

  // Globals
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};

export default config;

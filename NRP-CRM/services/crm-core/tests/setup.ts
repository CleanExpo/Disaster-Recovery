import { PrismaClient } from '@prisma/client';

// Global test setup
beforeAll(async () => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'error';
  
  // Initialize test database if needed
});

afterAll(async () => {
  // Cleanup after all tests
});

// Mock external dependencies
jest.mock('@/utils/cache', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  health: jest.fn(() => ({ connected: true, latency: 10 })),
  disconnect: jest.fn(),
}));

jest.mock('@/config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));
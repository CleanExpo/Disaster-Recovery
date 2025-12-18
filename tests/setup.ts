import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// Mock Next.js headers
jest.mock('next/headers', () => ({
  headers: () => new Map(),
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    has: jest.fn(),
    getAll: jest.fn().mockReturnValue([]),
  }),
}));

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key';
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_mock_key';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock_webhook_secret';
process.env.OPENAI_API_KEY = 'sk-test-mock-openai-key';
process.env.TWILIO_ACCOUNT_SID = 'AC_test_mock_sid';
process.env.TWILIO_AUTH_TOKEN = 'test_mock_token';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn((...args) => {
    // Only log actual errors, not React warnings
    if (args[0]?.includes?.('Warning:')) return;
    originalConsoleError(...args);
  });
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Clean up between tests
afterEach(() => {
  jest.clearAllMocks();
});

// Global test timeout
jest.setTimeout(30000);

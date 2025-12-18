import { NextRequest, NextResponse } from 'next/server';
import { createMockUser, MockUser } from '../factories/userFactory';

/**
 * Creates a mock NextRequest for testing API routes
 */
export function createMockRequest(options: {
  method?: string;
  url?: string;
  body?: any;
  headers?: Record<string, string>;
  searchParams?: Record<string, string>;
  cookies?: Record<string, string>;
} = {}): NextRequest {
  const {
    method = 'GET',
    url = 'http://localhost:3000/api/test',
    body,
    headers = {},
    searchParams = {},
    cookies = {},
  } = options;

  const urlObj = new URL(url);
  Object.entries(searchParams).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });

  const requestInit: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers,
    }),
  };

  if (body && method !== 'GET') {
    requestInit.body = JSON.stringify(body);
  }

  const request = new NextRequest(urlObj, requestInit);

  // Add cookies
  Object.entries(cookies).forEach(([key, value]) => {
    request.cookies.set(key, value);
  });

  return request;
}

/**
 * Creates a mock authenticated request with session
 */
export function createAuthenticatedRequest(
  user: MockUser,
  options: Parameters<typeof createMockRequest>[0] = {}
): NextRequest {
  const sessionToken = `mock-session-token-${user.id}`;
  return createMockRequest({
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${sessionToken}`,
    },
    cookies: {
      ...options.cookies,
      'next-auth.session-token': sessionToken,
    },
  });
}

/**
 * Parses a NextResponse and returns the JSON body
 */
export async function parseResponse<T = any>(response: NextResponse): Promise<{
  status: number;
  data: T;
  headers: Headers;
}> {
  const data = await response.json();
  return {
    status: response.status,
    data,
    headers: response.headers,
  };
}

/**
 * Wait for a specified amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function until it succeeds or times out
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 100 } = options;
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await wait(delay * attempt);
      }
    }
  }

  throw lastError;
}

/**
 * Creates a mock session for NextAuth
 */
export function createMockSession(user: MockUser = createMockUser()) {
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Mock implementation of getServerSession for testing
 */
export function mockGetServerSession(user: MockUser | null = null) {
  if (!user) return null;
  return createMockSession(user);
}

/**
 * Generates a random string for testing
 */
export function randomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generates a random email for testing
 */
export function randomEmail(): string {
  return `test-${randomString()}@example.com`;
}

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Compares two objects, ignoring specified keys
 */
export function objectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  ignoreKeys: string[] = []
): boolean {
  const keys1 = Object.keys(obj1).filter(k => !ignoreKeys.includes(k));
  const keys2 = Object.keys(obj2).filter(k => !ignoreKeys.includes(k));

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return objectsEqual(obj1[key], obj2[key], ignoreKeys);
    }
    return obj1[key] === obj2[key];
  });
}

/**
 * Assert that a function throws an error with a specific message
 */
export async function assertThrows(
  fn: () => Promise<any>,
  expectedMessage?: string | RegExp
): Promise<void> {
  let error: Error | undefined;
  try {
    await fn();
  } catch (e) {
    error = e as Error;
  }

  if (!error) {
    throw new Error('Expected function to throw an error');
  }

  if (expectedMessage) {
    if (typeof expectedMessage === 'string') {
      if (!error.message.includes(expectedMessage)) {
        throw new Error(
          `Expected error message to include "${expectedMessage}", got "${error.message}"`
        );
      }
    } else {
      if (!expectedMessage.test(error.message)) {
        throw new Error(
          `Expected error message to match ${expectedMessage}, got "${error.message}"`
        );
      }
    }
  }
}

/**
 * Creates mock form data
 */
export function createMockFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, String(v)));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
}

/**
 * Type-safe mock function creator
 */
export function createMockFn<T extends (...args: any[]) => any>(): jest.Mock<ReturnType<T>, Parameters<T>> {
  return jest.fn();
}

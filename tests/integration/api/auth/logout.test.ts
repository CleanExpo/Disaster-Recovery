import { POST } from '@/app/api/auth/logout/route';
import { createMockRequest } from '@tests/utils/testHelpers';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    delete: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  }),
}));

describe('POST /api/auth/logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully logout and clear cookies', async () => {
    const { cookies } = require('next/headers');
    const mockCookieStore = {
      delete: jest.fn(),
    };
    cookies.mockReturnValue(mockCookieStore);

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/logout',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Logged out successfully');
  });

  it('should clear all session-related cookies', async () => {
    const { cookies } = require('next/headers');
    const mockCookieStore = {
      delete: jest.fn(),
    };
    cookies.mockReturnValue(mockCookieStore);

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/logout',
    });

    await POST(request);

    expect(mockCookieStore.delete).toHaveBeenCalledWith('next-auth.session-token');
    expect(mockCookieStore.delete).toHaveBeenCalledWith('next-auth.csrf-token');
    expect(mockCookieStore.delete).toHaveBeenCalledWith('next-auth.callback-url');
  });

  it('should handle errors gracefully', async () => {
    const { cookies } = require('next/headers');
    cookies.mockImplementation(() => {
      throw new Error('Cookie error');
    });

    const request = createMockRequest({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/logout',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Internal server error');
  });
});

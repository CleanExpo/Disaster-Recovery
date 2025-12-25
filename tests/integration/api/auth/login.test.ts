import { POST } from '@/app/api/auth/login/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

// Mock modules
jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
  findUserByEmail: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  verifyPassword: jest.fn(),
  generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
}));

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful login', () => {
    it('should login with valid credentials', async () => {
      const mockUser = createMockUser({
        isActive: true,
        password: 'hashedPassword',
      });

      const { findUserByEmail } = require('@/lib/db');
      const { verifyPassword } = require('@/lib/auth');

      findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(true);
      prismaMock.loginAttempt.create.mockResolvedValue({} as any);
      prismaMock.user.update.mockResolvedValue(mockUser as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'TestPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.token).toBe('mock-jwt-token');
      expect(data.data.user.id).toBe(mockUser.id);
      expect(data.data.user.email).toBe(mockUser.email);
    });

    it('should log successful login attempt', async () => {
      const mockUser = createMockUser({ isActive: true });

      const { findUserByEmail } = require('@/lib/db');
      const { verifyPassword } = require('@/lib/auth');

      findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(true);
      prismaMock.loginAttempt.create.mockResolvedValue({} as any);
      prismaMock.user.update.mockResolvedValue(mockUser as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'TestPassword123!',
        },
      });

      await POST(request);

      expect(prismaMock.loginAttempt.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: mockUser.id,
            success: true,
          }),
        })
      );
    });

    it('should update last login timestamp', async () => {
      const mockUser = createMockUser({ isActive: true });

      const { findUserByEmail } = require('@/lib/db');
      const { verifyPassword } = require('@/lib/auth');

      findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(true);
      prismaMock.loginAttempt.create.mockResolvedValue({} as any);
      prismaMock.user.update.mockResolvedValue(mockUser as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'TestPassword123!',
        },
      });

      await POST(request);

      expect(prismaMock.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: mockUser.id },
          data: expect.objectContaining({
            lastLoginAt: expect.any(Date),
          }),
        })
      );
    });
  });

  describe('authentication failures', () => {
    it('should reject non-existent user', async () => {
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: 'nonexistent@example.com',
          password: 'TestPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid credentials');
    });

    it('should reject incorrect password', async () => {
      const mockUser = createMockUser({ isActive: true });

      const { findUserByEmail } = require('@/lib/db');
      const { verifyPassword } = require('@/lib/auth');

      findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(false);
      prismaMock.loginAttempt.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'WrongPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid credentials');
    });

    it('should log failed login attempt', async () => {
      const mockUser = createMockUser({ isActive: true });

      const { findUserByEmail } = require('@/lib/db');
      const { verifyPassword } = require('@/lib/auth');

      findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(false);
      prismaMock.loginAttempt.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'WrongPassword123!',
        },
      });

      await POST(request);

      expect(prismaMock.loginAttempt.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: mockUser.id,
            success: false,
          }),
        })
      );
    });

    it('should reject deactivated account', async () => {
      const mockUser = createMockUser({ isActive: false });

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(mockUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: mockUser.email,
          password: 'TestPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Account is deactivated');
    });
  });

  describe('validation errors', () => {
    it('should reject invalid email format', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: 'invalid-email',
          password: 'TestPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.details).toHaveProperty('email');
    });

    it('should reject missing password', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: 'test@example.com',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject empty password', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: 'test@example.com',
          password: '',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle database errors', async () => {
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockRejectedValue(new Error('Database error'));

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        body: {
          email: 'test@example.com',
          password: 'TestPassword123!',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Internal server error');
    });
  });
});

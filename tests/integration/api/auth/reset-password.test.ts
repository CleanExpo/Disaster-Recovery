import { POST, PUT } from '@/app/api/auth/reset-password/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
  findUserByEmail: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  generateResetToken: jest.fn().mockReturnValue('mock-reset-token'),
  verifyToken: jest.fn(),
  hashPassword: jest.fn().mockResolvedValue('new-hashed-password'),
}));

describe('Password Reset API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/reset-password (Request Reset)', () => {
    it('should send reset email for existing user', async () => {
      const mockUser = createMockUser();

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(mockUser);
      prismaMock.passwordResetToken.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: { email: mockUser.email },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(prismaMock.passwordResetToken.create).toHaveBeenCalled();
    });

    it('should return success for non-existent email (security)', async () => {
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: { email: 'nonexistent@example.com' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(prismaMock.passwordResetToken.create).not.toHaveBeenCalled();
    });

    it('should reject invalid email format', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: { email: 'invalid-email' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('PUT /api/auth/reset-password (Execute Reset)', () => {
    it('should reset password with valid token', async () => {
      const mockUser = createMockUser();
      const { verifyToken } = require('@/lib/auth');

      verifyToken.mockReturnValue({
        userId: mockUser.id,
        type: 'password-reset',
      });

      prismaMock.passwordResetToken.findFirst.mockResolvedValue({
        id: 'token-id',
        token: 'mock-reset-token',
        userId: mockUser.id,
        usedAt: null,
        expiresAt: new Date(Date.now() + 3600000),
      } as any);

      prismaMock.$transaction.mockResolvedValue([{}, {}] as any);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: {
          token: 'mock-reset-token',
          password: 'NewSecurePass123!',
        },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Password reset successful');
    });

    it('should reject invalid token', async () => {
      const { verifyToken } = require('@/lib/auth');
      verifyToken.mockReturnValue(null);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: {
          token: 'invalid-token',
          password: 'NewSecurePass123!',
        },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid or expired token');
    });

    it('should reject expired token', async () => {
      const mockUser = createMockUser();
      const { verifyToken } = require('@/lib/auth');

      verifyToken.mockReturnValue({
        userId: mockUser.id,
        type: 'password-reset',
      });

      prismaMock.passwordResetToken.findFirst.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: {
          token: 'expired-token',
          password: 'NewSecurePass123!',
        },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject weak password', async () => {
      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: {
          token: 'mock-reset-token',
          password: 'weak',
        },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.details).toHaveProperty('password');
    });

    it('should reject already used token', async () => {
      const mockUser = createMockUser();
      const { verifyToken } = require('@/lib/auth');

      verifyToken.mockReturnValue({
        userId: mockUser.id,
        type: 'password-reset',
      });

      prismaMock.passwordResetToken.findFirst.mockResolvedValue(null); // Used tokens won't be found

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/reset-password',
        body: {
          token: 'used-token',
          password: 'NewSecurePass123!',
        },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });
});

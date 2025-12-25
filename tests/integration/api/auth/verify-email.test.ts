import { POST, PUT } from '@/app/api/auth/verify-email/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
  findUserByEmail: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  verifyToken: jest.fn(),
  generateVerificationToken: jest.fn().mockReturnValue('mock-verification-token'),
}));

describe('Email Verification API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/verify-email (Verify)', () => {
    it('should verify email with valid token', async () => {
      const mockUser = createMockUser({ emailVerified: null });
      const { verifyToken } = require('@/lib/auth');

      verifyToken.mockReturnValue({
        userId: mockUser.id,
        type: 'email-verification',
      });

      prismaMock.verificationToken.findFirst.mockResolvedValue({
        id: 'token-id',
        token: 'mock-verification-token',
        userId: mockUser.id,
        expiresAt: new Date(Date.now() + 86400000),
      } as any);

      prismaMock.$transaction.mockResolvedValue([{}, {}] as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { token: 'mock-verification-token' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Email verified successfully');
    });

    it('should reject invalid token', async () => {
      const { verifyToken } = require('@/lib/auth');
      verifyToken.mockReturnValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { token: 'invalid-token' },
      });

      const response = await POST(request);
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
        type: 'email-verification',
      });

      prismaMock.verificationToken.findFirst.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { token: 'expired-token' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject token with wrong type', async () => {
      const mockUser = createMockUser();
      const { verifyToken } = require('@/lib/auth');

      verifyToken.mockReturnValue({
        userId: mockUser.id,
        type: 'password-reset', // Wrong type
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { token: 'wrong-type-token' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('PUT /api/auth/verify-email (Resend)', () => {
    it('should resend verification for unverified user', async () => {
      const mockUser = createMockUser({ emailVerified: null });

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(mockUser);
      prismaMock.verificationToken.deleteMany.mockResolvedValue({} as any);
      prismaMock.verificationToken.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { email: mockUser.email },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should reject already verified email', async () => {
      const mockUser = createMockUser({ emailVerified: new Date() });

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(mockUser);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { email: mockUser.email },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Email already verified');
    });

    it('should return success for non-existent email (security)', async () => {
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { email: 'nonexistent@example.com' },
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should delete existing tokens before creating new one', async () => {
      const mockUser = createMockUser({ emailVerified: null });

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(mockUser);
      prismaMock.verificationToken.deleteMany.mockResolvedValue({} as any);
      prismaMock.verificationToken.create.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'PUT',
        url: 'http://localhost:3000/api/auth/verify-email',
        body: { email: mockUser.email },
      });

      await PUT(request);

      expect(prismaMock.verificationToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
    });
  });
});

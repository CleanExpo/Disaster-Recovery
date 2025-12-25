import { POST } from '@/app/api/auth/register/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
  findUserByEmail: jest.fn(),
}));

// Mock auth
jest.mock('@/lib/auth', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful registration', () => {
    it('should register a new user with valid data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        name: 'New User',
        phone: '+15551234567',
      };

      const mockUser = createMockUser({
        email: userData.email,
        name: userData.name,
      });

      // Mock no existing user
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      // Mock user creation
      prismaMock.user.create.mockResolvedValue({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: 'USER',
        createdAt: mockUser.createdAt,
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: userData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.email).toBe(userData.email.toLowerCase());
      expect(data.message).toBe('Registration successful');
    });

    it('should lowercase email before saving', async () => {
      const userData = {
        email: 'TEST@EXAMPLE.COM',
        password: 'SecurePass123!',
        name: 'Test User',
      };

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      prismaMock.user.create.mockResolvedValue({
        id: 'test-id',
        email: 'test@example.com',
        name: userData.name,
        role: 'USER',
        createdAt: new Date(),
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: userData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(prismaMock.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'test@example.com',
          }),
        })
      );
    });
  });

  describe('validation errors', () => {
    it('should reject invalid email format', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'invalid-email',
          password: 'SecurePass123!',
          name: 'Test User',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toHaveProperty('email');
    });

    it('should reject weak password', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'test@example.com',
          password: 'weak',
          name: 'Test User',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.details).toHaveProperty('password');
    });

    it('should reject password without uppercase', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'test@example.com',
          password: 'password123!',
          name: 'Test User',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details.password).toContainEqual(
        expect.stringContaining('uppercase')
      );
    });

    it('should reject password without special character', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'test@example.com',
          password: 'Password123',
          name: 'Test User',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details.password).toContainEqual(
        expect.stringContaining('special character')
      );
    });

    it('should reject short name', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'test@example.com',
          password: 'SecurePass123!',
          name: 'A',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.details).toHaveProperty('name');
    });

    it('should reject missing required fields', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {},
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('duplicate email handling', () => {
    it('should reject registration with existing email', async () => {
      const existingUser = createMockUser();

      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(existingUser);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: existingUser.email,
          password: 'SecurePass123!',
          name: 'Test User',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Email already registered');
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      const { findUserByEmail } = require('@/lib/db');
      findUserByEmail.mockResolvedValue(null);

      prismaMock.user.create.mockRejectedValue(new Error('Database error'));

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/register',
        body: {
          email: 'test@example.com',
          password: 'SecurePass123!',
          name: 'Test User',
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

/**
 * Integration Tests: Service Request Search API
 *
 * Tests the GET /api/service-requests/search endpoint covering:
 * - Authentication requirements
 * - Authorization (client vs admin access)
 * - Query parameter validation
 * - Successful search with various filters
 * - Pagination
 * - Error handling
 *
 * @module ServiceRequestSearchAPITests
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';
import { ServiceStatus } from '@prisma/client';
import { ZodError } from 'zod';

// Mock Prisma - must be before imports that use it
jest.mock('@/lib/prisma', () => {
  return {
    prisma: {
      serviceRequest: {
        findMany: jest.fn(),
        count: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
    },
  };
});

// Mock next-auth - must be before imports that use it
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// Mock auth - must be before imports that use it
jest.mock('@/lib/auth', () => ({
  authOptions: {},
  isAdmin: jest.fn((userType: string) => userType === 'ADMIN' || userType === 'SUPER_ADMIN'),
}));

// Mock API error handlers
jest.mock('@/lib/api-errors', () => ({
  handleValidationError: jest.fn((error: any) => {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', message: error.message || 'Validation failed', details: error.errors },
      { status: 400 }
    );
  }),
  handleUnexpectedError: jest.fn((error: any) => {
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }),
}));

// Import after mocks
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth';
import { GET } from '@/app/api/service-requests/search/route';

// Cast mocks for TypeScript
const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;
const mockIsAdmin = isAdmin as jest.MockedFunction<typeof isAdmin>;

// Mock service request data factory
const createMockServiceRequest = (overrides: Partial<{
  id: string;
  userId: string;
  serviceCategory: string;
  urgency: string;
  serviceTitle: string;
  description: string;
  location: string;
  status: ServiceStatus;
  createdAt: Date;
  updatedAt: Date;
}> = {}) => ({
  id: overrides.id || `sr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  userId: overrides.userId || 'user-123',
  serviceCategory: overrides.serviceCategory || 'Water Damage',
  urgency: overrides.urgency || 'HIGH',
  serviceTitle: overrides.serviceTitle || 'Emergency Water Damage Repair',
  description: overrides.description || 'Burst pipe causing flooding in basement',
  location: overrides.location || 'Melbourne VIC 3000',
  budget: null,
  phone: '+61400000000',
  preferredTime: null,
  insurance: false,
  urgentResponse: true,
  status: overrides.status || 'PENDING' as ServiceStatus,
  leadScore: 85.0,
  createdAt: overrides.createdAt || new Date(),
  updatedAt: overrides.updatedAt || new Date(),
  tenantId: null,
  user: {
    id: overrides.userId || 'user-123',
    name: 'Test User',
    email: 'test@example.com',
  },
  matches: [],
});

// Mock user factory
const createMockUser = (overrides: Partial<{
  id: string;
  email: string;
  name: string;
  userType: 'CLIENT' | 'ADMIN' | 'CONTRACTOR' | 'SUPER_ADMIN';
}> = {}) => ({
  id: overrides.id || 'user-123',
  email: overrides.email || 'test@example.com',
  name: overrides.name || 'Test User',
  userType: overrides.userType || 'CLIENT',
  password: 'hashed-password',
  emailVerified: false,
  phoneVerified: false,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Helper to create NextRequest with query params
const createSearchRequest = (params: Record<string, string> = {}) => {
  const url = new URL('http://localhost:3000/api/service-requests/search');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return new NextRequest(url);
};

describe('Service Request Search API - GET /api/service-requests/search', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset isAdmin mock to default behavior
    mockIsAdmin.mockImplementation((userType: string) => userType === 'ADMIN' || userType === 'SUPER_ADMIN');
  });

  // ============================================
  // AUTHENTICATION TESTS
  // ============================================
  describe('Authentication Requirements', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createSearchRequest({ q: 'water damage' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBeDefined();
      expect(data.message).toContain('Authentication');
    });

    it('should return 401 when session has no user', async () => {
      mockGetServerSession.mockResolvedValue({ expires: new Date().toISOString() } as any);

      const request = createSearchRequest({ q: 'water damage' });
      const response = await GET(request);

      expect(response.status).toBe(401);
    });

    it('should return 401 when user not found in database', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: 'user-123', email: 'test@example.com' },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const request = createSearchRequest({ q: 'test' });
      const response = await GET(request);

      expect(response.status).toBe(401);
    });

    it('should succeed when user is authenticated', async () => {
      const mockUser = createMockUser({ userType: 'CLIENT' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue([]);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(0);

      const request = createSearchRequest({ q: 'test' });
      const response = await GET(request);

      expect(response.status).toBe(200);
    });
  });

  // ============================================
  // AUTHORIZATION TESTS
  // ============================================
  describe('Authorization - Client vs Admin Access', () => {
    it('should allow CLIENT users and scope to their own requests', async () => {
      const mockUser = createMockUser({ id: 'client-user-123', userType: 'CLIENT' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const mockResults = [
        createMockServiceRequest({ userId: 'client-user-123', id: 'sr-1' }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(1);

      const request = createSearchRequest({ q: 'water' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.userScope).toBe('own');
    });

    it('should allow ADMIN users to search all requests', async () => {
      const mockUser = createMockUser({ id: 'admin-user-123', userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const mockResults = [
        createMockServiceRequest({ userId: 'user-1', id: 'sr-1' }),
        createMockServiceRequest({ userId: 'user-2', id: 'sr-2' }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(2);

      const request = createSearchRequest({ q: 'damage' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.userScope).toBe('all');
    });

    it('should allow SUPER_ADMIN users to search all requests', async () => {
      const mockUser = createMockUser({ id: 'super-admin-123', userType: 'SUPER_ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const mockResults = [createMockServiceRequest()];
      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(1);

      const request = createSearchRequest({ q: 'fire' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.userScope).toBe('all');
    });
  });

  // ============================================
  // QUERY PARAMETER VALIDATION TESTS
  // ============================================
  describe('Query Parameter Validation', () => {
    const setupAuthenticatedUser = () => {
      const mockUser = createMockUser({ userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue([]);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(0);
    };

    it('should accept valid status filter', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ status: 'PENDING' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.searchCriteria.status).toBe('PENDING');
    });

    it('should reject invalid status value', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ status: 'INVALID_STATUS' });
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('should accept valid limit and offset parameters', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ limit: '50', offset: '10' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.limit).toBe(50);
      expect(data.pagination.offset).toBe(10);
    });

    it('should reject limit exceeding maximum (100)', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ limit: '150' });
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('should reject negative offset', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ offset: '-5' });
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('should accept valid date range filters', async () => {
      setupAuthenticatedUser();

      const createdAfter = '2024-01-01T00:00:00.000Z';
      const createdBefore = '2024-12-31T23:59:59.999Z';

      const request = createSearchRequest({ createdAfter, createdBefore });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.searchCriteria.createdAfter).toBe(createdAfter);
      expect(data.searchCriteria.createdBefore).toBe(createdBefore);
    });

    it('should reject invalid date format', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ createdAfter: 'not-a-date' });
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('should reject createdAfter after createdBefore', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({
        createdAfter: '2024-12-31T00:00:00.000Z',
        createdBefore: '2024-01-01T00:00:00.000Z',
      });
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('should accept query parameter aliases (q for query)', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ q: 'water damage' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.searchCriteria.query).toBe('water damage');
    });

    it('should accept category parameter alias', async () => {
      setupAuthenticatedUser();

      const request = createSearchRequest({ category: 'Water Damage' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.searchCriteria.serviceCategory).toBe('Water Damage');
    });
  });

  // ============================================
  // SUCCESSFUL SEARCH TESTS
  // ============================================
  describe('Successful Search with Filters', () => {
    const setupAuthenticatedAdmin = () => {
      const mockUser = createMockUser({ id: 'admin-1', userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    };

    it('should return matching results for text query', async () => {
      setupAuthenticatedAdmin();

      const mockResults = [
        createMockServiceRequest({
          id: 'sr-1',
          serviceTitle: 'Water Damage Emergency',
          description: 'Flood in basement from burst pipe',
        }),
        createMockServiceRequest({
          id: 'sr-2',
          serviceTitle: 'Pipe Leak Repair',
          description: 'Water leak in kitchen ceiling',
        }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(2);

      const request = createSearchRequest({ q: 'water' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.total).toBe(2);
    });

    it('should filter by status', async () => {
      setupAuthenticatedAdmin();

      const mockResults = [
        createMockServiceRequest({ id: 'sr-1', status: 'IN_PROGRESS' as ServiceStatus }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(1);

      const request = createSearchRequest({ status: 'IN_PROGRESS' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toHaveLength(1);
      expect(data.searchCriteria.status).toBe('IN_PROGRESS');
    });

    it('should filter by service category', async () => {
      setupAuthenticatedAdmin();

      const mockResults = [
        createMockServiceRequest({ id: 'sr-1', serviceCategory: 'Fire Damage' }),
        createMockServiceRequest({ id: 'sr-2', serviceCategory: 'Fire Damage' }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(2);

      const request = createSearchRequest({ category: 'Fire Damage' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toHaveLength(2);
      expect(data.searchCriteria.serviceCategory).toBe('Fire Damage');
    });

    it('should return empty results when no matches found', async () => {
      setupAuthenticatedAdmin();

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue([]);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(0);

      const request = createSearchRequest({ q: 'nonexistent query xyz' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(0);
      expect(data.total).toBe(0);
    });
  });

  // ============================================
  // PAGINATION TESTS
  // ============================================
  describe('Pagination', () => {
    const setupAuthenticatedAdmin = () => {
      const mockUser = createMockUser({ id: 'admin-1', userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    };

    it('should use default pagination values (limit: 20, offset: 0)', async () => {
      setupAuthenticatedAdmin();

      const mockResults = Array.from({ length: 20 }, (_, i) =>
        createMockServiceRequest({ id: `sr-${i}` })
      );

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(50);

      const request = createSearchRequest({});
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.limit).toBe(20);
      expect(data.pagination.offset).toBe(0);
      expect(data.pagination.hasMore).toBe(true);
    });

    it('should respect custom limit and offset', async () => {
      setupAuthenticatedAdmin();

      const mockResults = Array.from({ length: 10 }, (_, i) =>
        createMockServiceRequest({ id: `sr-${i + 20}` })
      );

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(50);

      const request = createSearchRequest({ limit: '10', offset: '20' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.limit).toBe(10);
      expect(data.pagination.offset).toBe(20);
      expect(data.count).toBe(10);
    });

    it('should indicate hasMore when more results exist', async () => {
      setupAuthenticatedAdmin();

      const mockResults = Array.from({ length: 20 }, (_, i) =>
        createMockServiceRequest({ id: `sr-${i}` })
      );

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(100);

      const request = createSearchRequest({ limit: '20', offset: '0' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.hasMore).toBe(true);
      expect(data.total).toBe(100);
    });

    it('should indicate hasMore=false when on last page', async () => {
      setupAuthenticatedAdmin();

      const mockResults = Array.from({ length: 5 }, (_, i) =>
        createMockServiceRequest({ id: `sr-${i + 45}` })
      );

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(50);

      const request = createSearchRequest({ limit: '20', offset: '45' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.hasMore).toBe(false);
      expect(data.count).toBe(5);
    });
  });

  // ============================================
  // ERROR HANDLING TESTS
  // ============================================
  describe('Error Handling', () => {
    const setupAuthenticatedAdmin = () => {
      const mockUser = createMockUser({ id: 'admin-1', userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    };

    it('should handle database errors gracefully', async () => {
      setupAuthenticatedAdmin();

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockRejectedValue(new Error('Database connection failed'));
      (mockPrisma.serviceRequest.count as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

      const request = createSearchRequest({ q: 'test' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });

    it('should handle Zod validation errors with proper format', async () => {
      setupAuthenticatedAdmin();

      const request = createSearchRequest({ status: 'INVALID_STATUS_VALUE' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });
  });

  // ============================================
  // RESPONSE FORMAT TESTS
  // ============================================
  describe('Response Format', () => {
    const setupAuthenticatedAdmin = () => {
      const mockUser = createMockUser({ id: 'admin-1', userType: 'ADMIN' });
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, email: mockUser.email },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    };

    it('should return proper success response structure', async () => {
      setupAuthenticatedAdmin();

      const mockResults = [createMockServiceRequest({ id: 'sr-1' })];
      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(1);

      const request = createSearchRequest({ q: 'water' });
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('count');
      expect(data).toHaveProperty('pagination');
      expect(data).toHaveProperty('searchCriteria');
      expect(data).toHaveProperty('userScope');

      // Verify pagination structure
      expect(data.pagination).toHaveProperty('limit');
      expect(data.pagination).toHaveProperty('offset');
      expect(data.pagination).toHaveProperty('hasMore');

      // Verify searchCriteria structure
      expect(data.searchCriteria).toHaveProperty('query');
      expect(data.searchCriteria).toHaveProperty('serviceCategory');
      expect(data.searchCriteria).toHaveProperty('status');
      expect(data.searchCriteria).toHaveProperty('location');
    });

    it('should include service request data with user info', async () => {
      setupAuthenticatedAdmin();

      const mockResults = [
        createMockServiceRequest({
          id: 'sr-1',
          userId: 'user-123',
          serviceCategory: 'Water Damage',
          status: 'PENDING' as ServiceStatus,
        }),
      ];

      (mockPrisma.serviceRequest.findMany as jest.Mock).mockResolvedValue(mockResults);
      (mockPrisma.serviceRequest.count as jest.Mock).mockResolvedValue(1);

      const request = createSearchRequest({});
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data[0]).toHaveProperty('id', 'sr-1');
      expect(data.data[0]).toHaveProperty('userId', 'user-123');
      expect(data.data[0]).toHaveProperty('serviceCategory', 'Water Damage');
      expect(data.data[0]).toHaveProperty('status', 'PENDING');
      expect(data.data[0]).toHaveProperty('user');
      expect(data.data[0].user).toHaveProperty('name');
      expect(data.data[0].user).toHaveProperty('email');
    });
  });
});

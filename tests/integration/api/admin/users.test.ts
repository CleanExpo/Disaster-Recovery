import { GET } from '@/app/api/admin/users/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockSuperAdmin } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
  isAdmin: jest.fn().mockImplementation((role) => role === 'ADMIN' || role === 'SUPER_ADMIN'),
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('GET /api/admin/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful queries', () => {
    it('should return paginated users for admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockUsers = [
        createMockUser({ name: 'User 1' }),
        createMockUser({ name: 'User 2' }),
      ];

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue(mockUsers.map(u => ({
        ...u,
        _count: { bookings: 5, payments: 3 },
      })) as any);
      prismaMock.user.count.mockResolvedValue(2);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.pagination).toBeDefined();
    });

    it('should filter by search query', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users?query=john',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              expect.objectContaining({ name: expect.anything() }),
              expect.objectContaining({ email: expect.anything() }),
            ]),
          }),
        })
      );
    });

    it('should filter by role', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users?role=CONTRACTOR',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            role: 'CONTRACTOR',
          }),
        })
      );
    });

    it('should filter by active status', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users?isActive=true',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            isActive: true,
          }),
        })
      );
    });

    it('should support sorting', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users?sortBy=name&sortOrder=asc',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { name: 'asc' },
        })
      );
    });

    it('should support pagination', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(100);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users?page=3&limit=10',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 20,
          take: 10,
        })
      );
      expect(data.pagination.page).toBe(3);
      expect(data.pagination.totalPages).toBe(10);
    });
  });

  describe('authorization', () => {
    it('should reject non-admin access', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should allow super admin access', async () => {
      const mockSuperAdmin = createMockSuperAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockSuperAdmin.id, role: mockSuperAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('response format', () => {
    it('should not expose password field', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.not.objectContaining({
            password: true,
          }),
        })
      );
    });

    it('should include user statistics', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            _count: expect.anything(),
          }),
        })
      );
    });
  });
});

import { GET, PATCH, DELETE } from '@/app/api/admin/users/[id]/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockSuperAdmin } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
  isAdmin: jest.fn().mockImplementation((role) => role === 'ADMIN' || role === 'SUPER_ADMIN'),
  isSuperAdmin: jest.fn().mockImplementation((role) => role === 'SUPER_ADMIN'),
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('Admin User Detail API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/admin/users/[id]', () => {
    it('should return user details for admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue({
        ...mockTargetUser,
        contractor: null,
        bookings: [],
        payments: [],
        loginAttempts: [],
      } as any);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
      });

      const response = await GET(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(mockTargetUser.id);
    });

    it('should return 404 for non-existent user', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users/non-existent',
      });

      const response = await GET(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should reject non-admin access', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/admin/users/some-id',
      });

      const response = await GET(request, { params: { id: 'some-id' } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });
  });

  describe('PATCH /api/admin/users/[id]', () => {
    it('should update user details', async () => {
      const mockAdmin = createMockAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockTargetUser as any);
      prismaMock.user.update.mockResolvedValue({
        ...mockTargetUser,
        name: 'Updated Name',
      } as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
        body: { name: 'Updated Name' },
      });

      const response = await PATCH(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Updated Name');
    });

    it('should reject role change by non-super-admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: 'ADMIN' },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockTargetUser as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
        body: { role: 'ADMIN' },
      });

      const response = await PATCH(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should allow super admin to change roles', async () => {
      const mockSuperAdmin = createMockSuperAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockSuperAdmin.id, role: mockSuperAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockTargetUser as any);
      prismaMock.user.update.mockResolvedValue({
        ...mockTargetUser,
        role: 'ADMIN',
      } as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
        body: { role: 'ADMIN' },
      });

      const response = await PATCH(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should prevent self-role change', async () => {
      const mockAdmin = createMockAdmin();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockAdmin as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/admin/users/${mockAdmin.id}`,
        body: { role: 'USER' },
      });

      const response = await PATCH(request, { params: { id: mockAdmin.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('own role');
    });

    it('should validate update data', async () => {
      const mockAdmin = createMockAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockTargetUser as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
        body: { name: 'A' }, // Too short
      });

      const response = await PATCH(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('DELETE /api/admin/users/[id]', () => {
    it('should soft delete user (super admin only)', async () => {
      const mockSuperAdmin = createMockSuperAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockSuperAdmin.id, role: mockSuperAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockTargetUser as any);
      prismaMock.user.update.mockResolvedValue({
        ...mockTargetUser,
        isActive: false,
      } as any);

      const request = createMockRequest({
        method: 'DELETE',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
      });

      const response = await DELETE(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(prismaMock.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            isActive: false,
          }),
        })
      );
    });

    it('should prevent self-deletion', async () => {
      const mockSuperAdmin = createMockSuperAdmin();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockSuperAdmin.id, role: mockSuperAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(mockSuperAdmin as any);

      const request = createMockRequest({
        method: 'DELETE',
        url: `http://localhost:3000/api/admin/users/${mockSuperAdmin.id}`,
      });

      const response = await DELETE(request, { params: { id: mockSuperAdmin.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('own account');
    });

    it('should reject non-super-admin deletion', async () => {
      const mockAdmin = createMockAdmin();
      const mockTargetUser = createMockUser();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: 'ADMIN' },
      });

      const request = createMockRequest({
        method: 'DELETE',
        url: `http://localhost:3000/api/admin/users/${mockTargetUser.id}`,
      });

      const response = await DELETE(request, { params: { id: mockTargetUser.id } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should return 404 for non-existent user', async () => {
      const mockSuperAdmin = createMockSuperAdmin();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockSuperAdmin.id, role: mockSuperAdmin.role },
      });

      prismaMock.user.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'DELETE',
        url: 'http://localhost:3000/api/admin/users/non-existent',
      });

      const response = await DELETE(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });
});

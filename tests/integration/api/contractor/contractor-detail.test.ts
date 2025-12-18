import { GET, PATCH } from '@/app/api/contractor/[id]/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockContractor } from '@tests/factories/userFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
  isAdmin: jest.fn().mockImplementation((role) => role === 'ADMIN' || role === 'SUPER_ADMIN'),
  isContractor: jest.fn().mockImplementation((role) => role === 'CONTRACTOR'),
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('Contractor Detail API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/contractor/[id]', () => {
    it('should return contractor profile for public', async () => {
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'user-id',
        businessName: 'Test Business',
        rating: 4.5,
        completedJobs: 100,
        isVerified: true,
        user: {
          id: 'user-id',
          name: 'Test Contractor',
          image: null,
        },
        bookings: [],
        reviews: [],
      };

      mockGetServerSession.mockResolvedValue(null);

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/contractor-id',
      });

      const response = await GET(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.businessName).toBe('Test Business');
    });

    it('should hide unverified contractor from public', async () => {
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'other-user',
        isVerified: false,
      };

      mockGetServerSession.mockResolvedValue(null);

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/contractor-id',
      });

      const response = await GET(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should show unverified contractor to owner', async () => {
      const mockUser = createMockUser({ id: 'owner-id' });
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'owner-id',
        isVerified: false,
        user: { id: 'owner-id', name: 'Owner' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/contractor-id',
      });

      const response = await GET(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should show unverified contractor to admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'other-user',
        isVerified: false,
        user: { id: 'other-user' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/contractor-id',
      });

      const response = await GET(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should hide license number from public', async () => {
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'other-user',
        licenseNumber: 'SECRET123',
        isVerified: true,
        user: { id: 'other-user' },
      };

      mockGetServerSession.mockResolvedValue(null);

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/contractor-id',
      });

      const response = await GET(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.licenseNumber).toBeUndefined();
    });

    it('should return 404 for non-existent contractor', async () => {
      mockGetServerSession.mockResolvedValue(null);
      prismaMock.contractor.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor/non-existent',
      });

      const response = await GET(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });

  describe('PATCH /api/contractor/[id]', () => {
    it('should allow owner to update profile', async () => {
      const mockUser = createMockUser({ id: 'owner-id' });
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'owner-id',
        businessName: 'Old Name',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);
      prismaMock.contractor.update.mockResolvedValue({
        ...mockContractorData,
        businessName: 'New Name',
      } as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { businessName: 'New Name' },
      });

      const response = await PATCH(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.businessName).toBe('New Name');
    });

    it('should prevent owner from self-verifying', async () => {
      const mockUser = createMockUser({ id: 'owner-id', role: 'CONTRACTOR' });
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'owner-id',
        isVerified: false,
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);
      prismaMock.contractor.update.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { isVerified: true },
      });

      await PATCH(request, { params: { id: 'contractor-id' } });

      // isVerified should be stripped from update
      expect(prismaMock.contractor.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.not.objectContaining({
            isVerified: true,
          }),
        })
      );
    });

    it('should allow admin to verify contractor', async () => {
      const mockAdmin = createMockAdmin();
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'other-user',
        isVerified: false,
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);
      prismaMock.contractor.update.mockResolvedValue({
        ...mockContractorData,
        isVerified: true,
      } as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { isVerified: true },
      });

      const response = await PATCH(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.isVerified).toBe(true);
    });

    it('should reject unauthorized updates', async () => {
      const mockUser = createMockUser({ id: 'random-user' });
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'other-user',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { businessName: 'Hacked Name' },
      });

      const response = await PATCH(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should validate update data', async () => {
      const mockUser = createMockUser({ id: 'owner-id' });
      const mockContractorData = {
        id: 'contractor-id',
        userId: 'owner-id',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(mockContractorData as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { businessName: 'A' }, // Too short
      });

      const response = await PATCH(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/contractor-id',
        body: { businessName: 'New Name' },
      });

      const response = await PATCH(request, { params: { id: 'contractor-id' } });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should return 404 for non-existent contractor', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/contractor/non-existent',
        body: { businessName: 'New Name' },
      });

      const response = await PATCH(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });
});

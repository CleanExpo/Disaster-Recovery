import { GET, POST } from '@/app/api/contractor/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockContractor } from '@tests/factories/userFactory';
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

describe('Contractor API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/contractor', () => {
    it('should return verified contractors for public search', async () => {
      const mockContractors = [
        {
          id: 'contractor-1',
          name: 'Contractor One',
          contractor: {
            id: 'c1',
            businessName: 'Business One',
            rating: 4.5,
            completedJobs: 50,
            isVerified: true,
          },
        },
      ];

      mockGetServerSession.mockResolvedValue(null);

      prismaMock.user.findMany.mockResolvedValue(mockContractors as any);
      prismaMock.user.count.mockResolvedValue(1);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
    });

    it('should filter by service type', async () => {
      mockGetServerSession.mockResolvedValue(null);

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor?serviceType=WATER_DAMAGE',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            contractor: expect.objectContaining({
              specialties: { has: 'WATER_DAMAGE' },
            }),
          }),
        })
      );
    });

    it('should filter by zip code', async () => {
      mockGetServerSession.mockResolvedValue(null);

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor?zipCode=12345',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            contractor: expect.objectContaining({
              serviceArea: { has: '12345' },
            }),
          }),
        })
      );
    });

    it('should search by name or business name', async () => {
      mockGetServerSession.mockResolvedValue(null);

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor?query=ace',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              expect.objectContaining({ name: expect.anything() }),
            ]),
          }),
        })
      );
    });

    it('should show unverified contractors to admin', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor?isVerified=false',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            contractor: expect.objectContaining({
              isVerified: false,
            }),
          }),
        })
      );
    });

    it('should sort by rating and completed jobs', async () => {
      mockGetServerSession.mockResolvedValue(null);

      prismaMock.user.findMany.mockResolvedValue([]);
      prismaMock.user.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/contractor',
      });

      await GET(request);

      expect(prismaMock.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: expect.arrayContaining([
            expect.objectContaining({ contractor: { rating: 'desc' } }),
          ]),
        })
      );
    });
  });

  describe('POST /api/contractor (Application)', () => {
    it('should create contractor application', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue(null);
      prismaMock.$transaction.mockImplementation(async (fn) => {
        return { id: 'new-contractor-id', isVerified: false };
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contractor',
        body: {
          businessName: 'Test Business LLC',
          licenseNumber: 'LIC12345',
          insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          serviceArea: ['12345', '12346', '12347'],
          specialties: ['WATER_DAMAGE', 'MOLD_REMEDIATION'],
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.message).toContain('pending');
    });

    it('should reject if already a contractor', async () => {
      const mockContractor = createMockContractor();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockContractor.id, role: mockContractor.role },
      });

      prismaMock.contractor.findUnique.mockResolvedValue({
        id: 'existing-contractor',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contractor',
        body: {
          businessName: 'Test Business LLC',
          licenseNumber: 'LIC12345',
          insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          serviceArea: ['12345'],
          specialties: ['WATER_DAMAGE'],
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Already a contractor');
    });

    it('should validate required fields', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contractor',
        body: {
          businessName: 'A', // Too short
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should require at least one specialty', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contractor',
        body: {
          businessName: 'Test Business LLC',
          licenseNumber: 'LIC12345',
          insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          serviceArea: ['12345'],
          specialties: [], // Empty
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contractor',
        body: {
          businessName: 'Test Business LLC',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });
  });
});

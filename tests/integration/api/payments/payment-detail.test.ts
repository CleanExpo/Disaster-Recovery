import { GET, PATCH } from '@/app/api/payments/[id]/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockContractor } from '@tests/factories/userFactory';
import { createMockPayment } from '@tests/factories/paymentFactory';
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

describe('Payment Detail API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/payments/[id]', () => {
    it('should return payment for owner', async () => {
      const mockUser = createMockUser();
      const mockPayment = createMockPayment({ clientId: mockUser.id });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue({
        ...mockPayment,
        booking: {
          client: { id: mockUser.id, name: 'Test', email: 'test@test.com' },
          contractor: { id: 'contractor', name: 'Contractor', email: 'contractor@test.com' },
        },
        refunds: [],
      } as any);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
      });

      const response = await GET(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(mockPayment.id);
    });

    it('should return payment for contractor', async () => {
      const mockContractor = createMockContractor();
      const mockPayment = createMockPayment({ contractorId: mockContractor.id });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockContractor.id, role: mockContractor.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue({
        ...mockPayment,
        booking: {},
        refunds: [],
      } as any);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
      });

      const response = await GET(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return payment for admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue({
        ...mockPayment,
        booking: {},
        refunds: [],
      } as any);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
      });

      const response = await GET(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should reject unauthorized access', async () => {
      const mockUser = createMockUser();
      const otherUser = createMockUser();
      const mockPayment = createMockPayment({
        clientId: otherUser.id,
        contractorId: 'other-contractor',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
      });

      const response = await GET(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should return 404 for non-existent payment', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments/non-existent-id',
      });

      const response = await GET(request, { params: { id: 'non-existent-id' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments/some-id',
      });

      const response = await GET(request, { params: { id: 'some-id' } });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });
  });

  describe('PATCH /api/payments/[id]', () => {
    it('should update payment status (admin only)', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.payment.update.mockResolvedValue({
        ...mockPayment,
        status: 'COMPLETED',
      } as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
        body: { status: 'COMPLETED' },
      });

      const response = await PATCH(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('COMPLETED');
    });

    it('should reject non-admin updates', async () => {
      const mockUser = createMockUser();
      const mockPayment = createMockPayment({ clientId: mockUser.id });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
        body: { status: 'COMPLETED' },
      });

      const response = await PATCH(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should only allow specific fields to be updated', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment();

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.payment.update.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'PATCH',
        url: `http://localhost:3000/api/payments/${mockPayment.id}`,
        body: {
          status: 'COMPLETED',
          amount: 99999, // This should not be updated
          clientId: 'hacker', // This should not be updated
        },
      });

      await PATCH(request, { params: { id: mockPayment.id } });

      expect(prismaMock.payment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.not.objectContaining({
            amount: 99999,
            clientId: 'hacker',
          }),
        })
      );
    });

    it('should return 404 for non-existent payment', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'PATCH',
        url: 'http://localhost:3000/api/payments/non-existent',
        body: { status: 'COMPLETED' },
      });

      const response = await PATCH(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });
});

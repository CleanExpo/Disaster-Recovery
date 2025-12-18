import { POST } from '@/app/api/payments/[id]/refund/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin } from '@tests/factories/userFactory';
import { createMockPayment } from '@tests/factories/paymentFactory';
import { prismaMock } from '@tests/mocks/prisma';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/stripe', () => ({
  createRefund: jest.fn().mockResolvedValue({
    id: 're_test123',
    amount: 5000,
    status: 'succeeded',
  }),
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
  isAdmin: jest.fn().mockImplementation((role) => role === 'ADMIN' || role === 'SUPER_ADMIN'),
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('POST /api/payments/[id]/refund', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful refund', () => {
    it('should process full refund for admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({
        status: 'COMPLETED',
        amount: 5000,
        refundedAmount: 0,
        stripePaymentIntentId: 'pi_test123',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.refund.create.mockResolvedValue({
        id: 'refund-id',
        amount: 5000,
        status: 'COMPLETED',
      } as any);
      prismaMock.payment.update.mockResolvedValue({
        ...mockPayment,
        refundedAmount: 5000,
        status: 'REFUNDED',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: { reason: 'Customer requested refund' },
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Refund processed successfully');
    });

    it('should process partial refund', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({
        status: 'COMPLETED',
        amount: 5000,
        refundedAmount: 0,
        stripePaymentIntentId: 'pi_test123',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.refund.create.mockResolvedValue({
        id: 'refund-id',
        amount: 2500,
        status: 'COMPLETED',
      } as any);
      prismaMock.payment.update.mockResolvedValue({
        ...mockPayment,
        refundedAmount: 2500,
        status: 'COMPLETED', // Still completed, partial refund
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: {
          amount: 2500,
          reason: 'Partial service completed',
        },
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should handle multiple partial refunds', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({
        status: 'COMPLETED',
        amount: 5000,
        refundedAmount: 2000, // Already partially refunded
        stripePaymentIntentId: 'pi_test123',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.refund.create.mockResolvedValue({
        id: 'refund-id',
        amount: 1500,
        status: 'COMPLETED',
      } as any);
      prismaMock.payment.update.mockResolvedValue({
        ...mockPayment,
        refundedAmount: 3500,
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: { amount: 1500 },
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('refund validation', () => {
    it('should reject refund for non-completed payment', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({ status: 'PENDING' });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: {},
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Only completed payments can be refunded');
    });

    it('should reject refund exceeding available amount', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({
        status: 'COMPLETED',
        amount: 5000,
        refundedAmount: 4000,
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: { amount: 2000 }, // Only 1000 available
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Refund amount exceeds available amount');
    });

    it('should reject refund for fully refunded payment', async () => {
      const mockAdmin = createMockAdmin();
      const mockPayment = createMockPayment({
        status: 'COMPLETED',
        amount: 5000,
        refundedAmount: 5000,
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: {},
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid refund amount');
    });
  });

  describe('authorization', () => {
    it('should reject non-admin refund requests', async () => {
      const mockUser = createMockUser();
      const mockPayment = createMockPayment({ status: 'COMPLETED' });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: `http://localhost:3000/api/payments/${mockPayment.id}/refund`,
        body: {},
      });

      const response = await POST(request, { params: { id: mockPayment.id } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should reject unauthenticated refund requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments/some-id/refund',
        body: {},
      });

      const response = await POST(request, { params: { id: 'some-id' } });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });
  });

  describe('payment not found', () => {
    it('should return 404 for non-existent payment', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments/non-existent/refund',
        body: {},
      });

      const response = await POST(request, { params: { id: 'non-existent' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Payment not found');
    });
  });
});

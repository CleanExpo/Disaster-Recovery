import { GET, POST } from '@/app/api/payments/route';
import { createMockRequest, createAuthenticatedRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin, createMockContractor } from '@tests/factories/userFactory';
import { createMockBooking } from '@tests/factories/bookingFactory';
import { createMockPayment } from '@tests/factories/paymentFactory';
import { prismaMock } from '@tests/mocks/prisma';
import { mockStripe } from '@tests/mocks/stripe';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/stripe', () => ({
  createPaymentIntent: jest.fn().mockResolvedValue({
    id: 'pi_test123',
    client_secret: 'pi_test123_secret_test',
  }),
  calculateFees: jest.fn().mockImplementation((amount) => ({
    processingFee: amount * 0.029 + 0.30,
    platformFee: amount * 0.05,
    netAmount: amount - (amount * 0.029 + 0.30) - (amount * 0.05),
  })),
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('Payments API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/payments', () => {
    it('should return payments for authenticated user', async () => {
      const mockUser = createMockUser();
      const mockPayments = [createMockPayment({ clientId: mockUser.id })];

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findMany.mockResolvedValue(mockPayments as any);
      prismaMock.payment.count.mockResolvedValue(1);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.pagination).toBeDefined();
    });

    it('should filter payments by status', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findMany.mockResolvedValue([]);
      prismaMock.payment.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments?status=COMPLETED',
      });

      await GET(request);

      expect(prismaMock.payment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'COMPLETED',
          }),
        })
      );
    });

    it('should filter payments by bookingId', async () => {
      const mockUser = createMockUser();
      const bookingId = 'test-booking-id';

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findMany.mockResolvedValue([]);
      prismaMock.payment.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: `http://localhost:3000/api/payments?bookingId=${bookingId}`,
      });

      await GET(request);

      expect(prismaMock.payment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            bookingId,
          }),
        })
      );
    });

    it('should reject unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should show all payments for admin', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.payment.findMany.mockResolvedValue([]);
      prismaMock.payment.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments',
      });

      await GET(request);

      // Admin should not have clientId filter
      expect(prismaMock.payment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.not.objectContaining({
            clientId: mockAdmin.id,
          }),
        })
      );
    });

    it('should support pagination', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findMany.mockResolvedValue([]);
      prismaMock.payment.count.mockResolvedValue(100);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/payments?page=2&limit=10',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(data.pagination.page).toBe(2);
      expect(data.pagination.limit).toBe(10);
      expect(data.pagination.totalPages).toBe(10);
    });
  });

  describe('POST /api/payments', () => {
    it('should create payment for valid booking', async () => {
      const mockUser = createMockUser();
      const mockBooking = createMockBooking({
        clientId: mockUser.id,
        contractorId: 'contractor-id',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.booking.findUnique.mockResolvedValue({
        ...mockBooking,
        contractor: { stripeAccountId: 'acct_test' },
        client: { stripeCustomerId: 'cus_test' },
      } as any);

      prismaMock.payment.create.mockResolvedValue({
        id: 'payment-id',
        bookingId: mockBooking.id,
        amount: 1000,
        status: 'PENDING',
      } as any);

      prismaMock.payment.update.mockResolvedValue({
        id: 'payment-id',
        status: 'PROCESSING',
        stripePaymentIntentId: 'pi_test123',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: mockBooking.id,
          amount: 1000,
          paymentMethod: 'CARD',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.clientSecret).toBeDefined();
    });

    it('should reject payment for non-existent booking', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.booking.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: 'non-existent-id',
          amount: 1000,
          paymentMethod: 'CARD',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Booking not found');
    });

    it('should reject payment from non-owner', async () => {
      const mockUser = createMockUser();
      const otherUser = createMockUser();
      const mockBooking = createMockBooking({ clientId: otherUser.id });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      prismaMock.booking.findUnique.mockResolvedValue(mockBooking as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: mockBooking.id,
          amount: 1000,
          paymentMethod: 'CARD',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });

    it('should reject invalid amount', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: 'booking-id',
          amount: -100,
          paymentMethod: 'CARD',
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
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: 'booking-id',
          amount: 1000,
          paymentMethod: 'CARD',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should handle non-card payments without Stripe', async () => {
      const mockUser = createMockUser();
      const mockBooking = createMockBooking({
        clientId: mockUser.id,
        contractorId: 'contractor-id',
      });

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.booking.findUnique.mockResolvedValue(mockBooking as any);
      prismaMock.payment.create.mockResolvedValue({
        id: 'payment-id',
        bookingId: mockBooking.id,
        amount: 1000,
        status: 'PENDING',
        paymentMethod: 'CASH',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/payments',
        body: {
          bookingId: mockBooking.id,
          amount: 1000,
          paymentMethod: 'CASH',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.clientSecret).toBeUndefined();
    });
  });
});

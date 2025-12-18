import { GET, POST } from '@/app/api/fraud-detection/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin } from '@tests/factories/userFactory';
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

describe('Fraud Detection API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/fraud-detection', () => {
    it('should return flagged transactions for admin', async () => {
      const mockAdmin = createMockAdmin();
      const mockAlerts = [
        {
          id: 'alert-1',
          paymentId: 'payment-1',
          riskScore: 0.8,
          flags: ['New Account', 'High Value'],
          reviewStatus: 'PENDING',
          payment: {
            client: { id: 'client-1', name: 'Test', email: 'test@test.com' },
            booking: { id: 'booking-1', serviceType: 'WATER_DAMAGE' },
          },
        },
      ];

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findMany.mockResolvedValue(mockAlerts as any);
      prismaMock.fraudAlert.count.mockResolvedValue(1);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/fraud-detection',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].riskScore).toBe(0.8);
    });

    it('should filter by status', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findMany.mockResolvedValue([]);
      prismaMock.fraudAlert.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/fraud-detection?status=approved',
      });

      await GET(request);

      expect(prismaMock.fraudAlert.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            reviewStatus: 'APPROVED',
          }),
        })
      );
    });

    it('should filter by minimum risk score', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findMany.mockResolvedValue([]);
      prismaMock.fraudAlert.count.mockResolvedValue(0);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/fraud-detection?minRiskScore=0.7',
      });

      await GET(request);

      expect(prismaMock.fraudAlert.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            riskScore: { gte: 0.7 },
          }),
        })
      );
    });

    it('should reject non-admin access', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/fraud-detection',
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
        url: 'http://localhost:3000/api/fraud-detection',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should support pagination', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findMany.mockResolvedValue([]);
      prismaMock.fraudAlert.count.mockResolvedValue(50);

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/fraud-detection?page=2&limit=10',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(data.pagination.page).toBe(2);
      expect(data.pagination.limit).toBe(10);
      expect(data.pagination.totalPages).toBe(5);
    });
  });

  describe('POST /api/fraud-detection (Review)', () => {
    it('should approve flagged transaction', async () => {
      const mockAdmin = createMockAdmin();
      const mockAlert = {
        id: 'alert-1',
        paymentId: 'payment-1',
        riskScore: 0.6,
        reviewStatus: 'PENDING',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findFirst.mockResolvedValue(mockAlert as any);
      prismaMock.fraudAlert.update.mockResolvedValue({
        ...mockAlert,
        reviewStatus: 'APPROVE',
        reviewedById: mockAdmin.id,
      } as any);
      prismaMock.payment.update.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'payment-1',
          action: 'APPROVE',
          reason: 'Verified legitimate transaction',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('approved');
    });

    it('should reject flagged transaction', async () => {
      const mockAdmin = createMockAdmin();
      const mockAlert = {
        id: 'alert-1',
        paymentId: 'payment-1',
        reviewStatus: 'PENDING',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findFirst.mockResolvedValue(mockAlert as any);
      prismaMock.fraudAlert.update.mockResolvedValue({
        ...mockAlert,
        reviewStatus: 'REJECT',
      } as any);
      prismaMock.payment.update.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'payment-1',
          action: 'REJECT',
          reason: 'Confirmed fraudulent activity',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('rejected');

      // Verify payment was marked as failed
      expect(prismaMock.payment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'payment-1' },
          data: expect.objectContaining({
            status: 'FAILED',
          }),
        })
      );
    });

    it('should flag for investigation', async () => {
      const mockAdmin = createMockAdmin();
      const mockAlert = {
        id: 'alert-1',
        paymentId: 'payment-1',
        reviewStatus: 'PENDING',
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findFirst.mockResolvedValue(mockAlert as any);
      prismaMock.fraudAlert.update.mockResolvedValue({
        ...mockAlert,
        reviewStatus: 'INVESTIGATE',
      } as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'payment-1',
          action: 'INVESTIGATE',
          notes: 'Need more information from customer',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 404 for non-existent alert', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      prismaMock.fraudAlert.findFirst.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'non-existent',
          action: 'APPROVE',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should reject invalid action', async () => {
      const mockAdmin = createMockAdmin();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockAdmin.id, role: mockAdmin.role },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'payment-1',
          action: 'INVALID_ACTION',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject non-admin review requests', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: 'USER' },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection',
        body: {
          transactionId: 'payment-1',
          action: 'APPROVE',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
    });
  });
});

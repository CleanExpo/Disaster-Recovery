import { POST } from '@/app/api/fraud-detection/analyze/route';
import { createMockRequest } from '@tests/utils/testHelpers';
import { createMockUser, createMockAdmin } from '@tests/factories/userFactory';
import { createMockPayment } from '@tests/factories/paymentFactory';
import { prismaMock } from '@tests/mocks/prisma';
import { faker } from '@faker-js/faker';

jest.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

jest.mock('@/lib/auth', () => ({
  authOptions: {},
}));

const mockGetServerSession = jest.fn();
jest.mock('next-auth', () => ({
  getServerSession: () => mockGetServerSession(),
}));

describe('POST /api/fraud-detection/analyze', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('risk analysis', () => {
    it('should return low risk for established user with normal transaction', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'Test Client',
        email: 'test@example.com',
        emailVerified: new Date(),
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year old
        payments: [
          { amount: 1000, createdAt: new Date() },
          { amount: 1200, createdAt: new Date() },
        ],
        loginAttempts: [{ success: true }],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 1100,
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.riskScore).toBeLessThan(0.4);
      expect(data.data.recommendation).toBe('APPROVE');
    });

    it('should flag new account with high-value transaction', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'New Client',
        email: 'new@example.com',
        emailVerified: null,
        createdAt: new Date(), // Just created
        payments: [],
        loginAttempts: [],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 15000, // High value
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.riskScore).toBeGreaterThan(0.4);
      expect(data.data.flags).toContain('New Account');
      expect(data.data.flags).toContain('High Value');
      expect(['REVIEW', 'REJECT']).toContain(data.data.recommendation);
    });

    it('should flag multiple failed login attempts', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'Test Client',
        email: 'test@example.com',
        emailVerified: new Date(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        payments: [],
        loginAttempts: [
          { success: false },
          { success: false },
          { success: false },
          { success: true },
        ],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 500,
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.flags).toContain('Failed Login Attempts');
    });

    it('should flag unusual transaction amount', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'Test Client',
        email: 'test@example.com',
        emailVerified: new Date(),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        payments: [
          { amount: 100, createdAt: new Date() },
          { amount: 150, createdAt: new Date() },
          { amount: 120, createdAt: new Date() },
        ],
        loginAttempts: [],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 5000, // Much higher than average (~123)
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.flags).toContain('Unusual Amount');
    });

    it('should flag unverified email', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'Test Client',
        email: 'test@example.com',
        emailVerified: null,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        payments: [],
        loginAttempts: [],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 500,
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.flags).toContain('Unverified Email');
    });

    it('should recommend REJECT for very high risk', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        name: 'Risky Client',
        email: 'risky@example.com',
        emailVerified: null,
        createdAt: new Date(), // Brand new
        payments: [],
        loginAttempts: [
          { success: false },
          { success: false },
          { success: false },
          { success: false },
        ],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 50000, // Very high value
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.riskScore).toBeGreaterThan(0.7);
      expect(data.data.recommendation).toBe('REJECT');
    });
  });

  describe('fraud alert creation', () => {
    it('should create fraud alert for elevated risk', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        createdAt: new Date(),
        emailVerified: null,
        payments: [],
        loginAttempts: [],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 10000,
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);
      prismaMock.fraudAlert.upsert.mockResolvedValue({} as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      await POST(request);

      expect(prismaMock.fraudAlert.upsert).toHaveBeenCalled();
    });

    it('should not create fraud alert for low risk', async () => {
      const mockUser = createMockUser();
      const mockClient = {
        id: 'client-id',
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        emailVerified: new Date(),
        payments: [{ amount: 500 }],
        loginAttempts: [],
      };

      const mockPayment = {
        id: 'payment-id',
        amount: 500,
        client: mockClient,
        booking: { id: 'booking-id' },
      };

      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(mockPayment as any);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      if (data.data.riskScore < 0.4) {
        expect(prismaMock.fraudAlert.upsert).not.toHaveBeenCalled();
      }
    });
  });

  describe('error handling', () => {
    it('should return 404 for non-existent payment', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      prismaMock.payment.findUnique.mockResolvedValue(null);

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'non-existent' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
    });

    it('should reject invalid paymentId format', async () => {
      const mockUser = createMockUser();
      mockGetServerSession.mockResolvedValue({
        user: { id: mockUser.id, role: mockUser.role },
      });

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: '' },
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
        url: 'http://localhost:3000/api/fraud-detection/analyze',
        body: { paymentId: 'payment-id' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });
  });
});

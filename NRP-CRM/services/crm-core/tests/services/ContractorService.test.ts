import ContractorService from '@/services/ContractorService';
import { ContractorCreateData, ServiceCategory, UserRole } from '@/types';

// Mock Prisma
jest.mock('@/config/database', () => ({
  contractor: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn(),
  auditLog: {
    create: jest.fn(),
  },
}));

describe('ContractorService', () => {
  const mockContractorData: ContractorCreateData = {
    businessName: 'Test Contractor',
    abn: '12345678901',
    email: 'test@contractor.com',
    phone: '+61400000000',
    address: {
      street: '123 Test St',
      suburb: 'Test Suburb',
      state: 'NSW',
      postcode: '2000',
    },
    contactPerson: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@contractor.com',
      phone: '+61400000000',
      position: 'Manager',
    },
    services: [ServiceCategory.WATER_DAMAGE],
    serviceRadius: 50,
    certifications: [],
    insuranceDetails: {
      provider: 'Test Insurance',
      policyNumber: 'POL123',
      coverageAmount: 1000000,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      publicLiability: true,
      professionalIndemnity: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new contractor successfully', async () => {
      const mockCreatedContractor = {
        id: 'contractor-123',
        ...mockContractorData,
        status: 'PENDING',
        verified: false,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock successful transaction
      require('@/config/database').$transaction.mockImplementation(async (callback: any) => {
        return callback({
          contractor: {
            create: jest.fn().mockResolvedValue(mockCreatedContractor),
          },
          auditLog: {
            create: jest.fn().mockResolvedValue({}),
          },
        });
      });

      const result = await ContractorService.create(mockContractorData, 'user-123');

      expect(result).toMatchObject(mockCreatedContractor);
      expect(require('@/config/database').$transaction).toHaveBeenCalled();
    });

    it('should handle creation errors', async () => {
      require('@/config/database').$transaction.mockRejectedValue(new Error('Database error'));

      await expect(ContractorService.create(mockContractorData, 'user-123'))
        .rejects.toThrow('Failed to create contractor');
    });
  });

  describe('getById', () => {
    it('should return contractor by ID', async () => {
      const mockContractor = {
        id: 'contractor-123',
        businessName: 'Test Contractor',
        status: 'ACTIVE',
      };

      require('@/config/database').contractor.findUnique.mockResolvedValue(mockContractor);

      const result = await ContractorService.getById('contractor-123');

      expect(result).toEqual(mockContractor);
      expect(require('@/config/database').contractor.findUnique).toHaveBeenCalledWith({
        where: { id: 'contractor-123' },
        include: expect.any(Object),
      });
    });

    it('should return null for non-existent contractor', async () => {
      require('@/config/database').contractor.findUnique.mockResolvedValue(null);

      const result = await ContractorService.getById('non-existent');

      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      require('@/config/database').contractor.findUnique.mockRejectedValue(new Error('Database error'));

      await expect(ContractorService.getById('contractor-123'))
        .rejects.toThrow('Failed to get contractor');
    });
  });

  describe('getMany', () => {
    it('should return paginated contractors', async () => {
      const mockContractors = [
        { id: '1', businessName: 'Contractor 1' },
        { id: '2', businessName: 'Contractor 2' },
      ];

      require('@/config/database').contractor.count.mockResolvedValue(2);
      require('@/config/database').contractor.findMany.mockResolvedValue(mockContractors);

      const result = await ContractorService.getMany(
        { page: 1, limit: 10 },
        {}
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockContractors);
      expect(result.meta).toMatchObject({
        total: 2,
        page: 1,
        limit: 10,
      });
    });

    it('should apply filters correctly', async () => {
      const filters = {
        status: ['ACTIVE'],
        verified: true,
      };

      require('@/config/database').contractor.count.mockResolvedValue(0);
      require('@/config/database').contractor.findMany.mockResolvedValue([]);

      await ContractorService.getMany({ page: 1, limit: 10 }, filters);

      expect(require('@/config/database').contractor.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: { in: ['ACTIVE'] },
            verified: true,
          }),
        })
      );
    });
  });

  describe('search', () => {
    it('should search contractors by business name', async () => {
      const mockContractors = [
        { id: '1', businessName: 'Test Contractor' },
      ];

      require('@/config/database').contractor.count.mockResolvedValue(1);
      require('@/config/database').contractor.findMany.mockResolvedValue(mockContractors);

      const result = await ContractorService.search(
        'Test',
        { page: 1, limit: 10 },
        {}
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockContractors);
    });

    it('should handle empty search results', async () => {
      require('@/config/database').contractor.count.mockResolvedValue(0);
      require('@/config/database').contractor.findMany.mockResolvedValue([]);

      const result = await ContractorService.search(
        'NonExistent',
        { page: 1, limit: 10 },
        {}
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
      expect(result.meta?.total).toBe(0);
    });
  });
});
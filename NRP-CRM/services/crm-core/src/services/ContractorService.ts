import prisma from '@/config/database';
import cache from '@/utils/cache';
import logger from '@/config/logger';
import {
  ContractorCreateData,
  ContractorUpdateData,
  PaginationOptions,
  FilterOptions,
  PerformanceMetrics,
  ServiceTerritoryData,
  ApiResponse,
} from '@/types';
import { Contractor, ContractorStatus, ServiceCategory } from '@prisma/client';

export class ContractorService {
  private static readonly CACHE_TTL = 300; // 5 minutes
  private static readonly CACHE_PREFIX = 'contractor:';

  /**
   * Create a new contractor
   */
  public static async create(data: ContractorCreateData, userId: string): Promise<Contractor> {
    try {
      logger.info(`Creating contractor for user ${userId}`, { businessName: data.businessName });

      const contractor = await prisma.$transaction(async (tx) => {
        // Create contractor
        const newContractor = await tx.contractor.create({
          data: {
            userId,
            businessName: data.businessName,
            abn: data.abn,
            email: data.email,
            phone: data.phone,
            serviceRadius: data.serviceRadius,
            website: data.website,
            description: data.description,
            
            // Create related records
            address: {
              create: data.address,
            },
            contactPerson: {
              create: data.contactPerson,
            },
            services: {
              create: data.services.map(service => ({
                service: service as ServiceCategory,
                available: true,
              })),
            },
            certifications: {
              create: data.certifications?.map(cert => ({
                name: cert.name,
                issuedBy: cert.issuedBy,
                certificateNumber: cert.certificateNumber,
                issueDate: cert.issueDate,
                expiryDate: cert.expiryDate,
                verified: cert.verified,
                documentUrl: cert.documentUrl,
              })) || [],
            },
            insuranceDetails: {
              create: {
                provider: data.insuranceDetails.provider,
                policyNumber: data.insuranceDetails.policyNumber,
                coverageAmount: data.insuranceDetails.coverageAmount,
                expiryDate: data.insuranceDetails.expiryDate,
                publicLiability: data.insuranceDetails.publicLiability,
                professionalIndemnity: data.insuranceDetails.professionalIndemnity,
                documentUrl: data.insuranceDetails.documentUrl,
              },
            },
            performanceMetrics: {
              create: {
                averageRating: 0,
                responseTime: 0,
                completionRate: 0,
                customerSatisfaction: 0,
                onTimePercentage: 0,
                repeatCustomers: 0,
                totalRevenue: 0,
              },
            },
          },
          include: {
            address: true,
            contactPerson: true,
            services: true,
            certifications: true,
            insuranceDetails: true,
            performanceMetrics: true,
          },
        });

        // Create audit log
        await tx.auditLog.create({
          data: {
            userId,
            action: 'CREATE',
            resource: 'contractor',
            resourceId: newContractor.id,
            changes: data,
          },
        });

        return newContractor;
      });

      // Invalidate relevant caches
      await this.invalidateContractorCaches(contractor.id);

      logger.info(`Contractor created successfully`, { contractorId: contractor.id });
      return contractor;
    } catch (error) {
      logger.error('Error creating contractor:', error);
      throw new Error('Failed to create contractor');
    }
  }

  /**
   * Get contractor by ID with caching
   */
  public static async getById(
    id: string,
    includeRelations: boolean = true
  ): Promise<Contractor | null> {
    try {
      const cacheKey = `${this.CACHE_PREFIX}${id}:${includeRelations}`;
      
      // Try to get from cache first
      const cached = await cache.get<Contractor>(cacheKey);
      if (cached) {
        return cached;
      }

      const contractor = await prisma.contractor.findUnique({
        where: { id },
        include: includeRelations ? {
          address: true,
          contactPerson: true,
          services: true,
          certifications: true,
          insuranceDetails: true,
          serviceAreas: true,
          performanceMetrics: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
              active: true,
            },
          },
        } : undefined,
      });

      if (contractor) {
        // Cache the result
        await cache.set(cacheKey, contractor, this.CACHE_TTL);
      }

      return contractor;
    } catch (error) {
      logger.error('Error getting contractor by ID:', error);
      throw new Error('Failed to get contractor');
    }
  }

  /**
   * Update contractor
   */
  public static async update(
    id: string,
    data: ContractorUpdateData,
    userId: string
  ): Promise<Contractor> {
    try {
      logger.info(`Updating contractor ${id}`, { userId });

      const contractor = await prisma.$transaction(async (tx) => {
        // Get current contractor for audit
        const currentContractor = await tx.contractor.findUnique({
          where: { id },
          include: {
            address: true,
            contactPerson: true,
            services: true,
            certifications: true,
            insuranceDetails: true,
          },
        });

        if (!currentContractor) {
          throw new Error('Contractor not found');
        }

        // Update main contractor record
        const updatedContractor = await tx.contractor.update({
          where: { id },
          data: {
            businessName: data.businessName,
            abn: data.abn,
            email: data.email,
            phone: data.phone,
            status: data.status,
            verified: data.verified,
            serviceRadius: data.serviceRadius,
            website: data.website,
            description: data.description,
          },
          include: {
            address: true,
            contactPerson: true,
            services: true,
            certifications: true,
            insuranceDetails: true,
            serviceAreas: true,
            performanceMetrics: true,
          },
        });

        // Update address if provided
        if (data.address) {
          await tx.contractorAddress.update({
            where: { contractorId: id },
            data: data.address,
          });
        }

        // Update contact person if provided
        if (data.contactPerson) {
          await tx.contactPerson.update({
            where: { contractorId: id },
            data: data.contactPerson,
          });
        }

        // Update services if provided
        if (data.services) {
          // Delete existing services
          await tx.contractorService.deleteMany({
            where: { contractorId: id },
          });
          
          // Create new services
          await tx.contractorService.createMany({
            data: data.services.map(service => ({
              contractorId: id,
              service: service as ServiceCategory,
              available: true,
            })),
          });
        }

        // Update insurance if provided
        if (data.insuranceDetails) {
          await tx.insuranceDetail.updateMany({
            where: { contractorId: id },
            data: data.insuranceDetails,
          });
        }

        // Create audit log
        await tx.auditLog.create({
          data: {
            userId,
            action: 'UPDATE',
            resource: 'contractor',
            resourceId: id,
            changes: data,
          },
        });

        return updatedContractor;
      });

      // Invalidate caches
      await this.invalidateContractorCaches(id);

      logger.info(`Contractor updated successfully`, { contractorId: id });
      return contractor;
    } catch (error) {
      logger.error('Error updating contractor:', error);
      throw new Error('Failed to update contractor');
    }
  }

  /**
   * Delete contractor (soft delete by deactivating)
   */
  public static async delete(id: string, userId: string): Promise<void> {
    try {
      logger.info(`Deleting contractor ${id}`, { userId });

      await prisma.$transaction(async (tx) => {
        // Soft delete by setting status to INACTIVE
        await tx.contractor.update({
          where: { id },
          data: {
            status: ContractorStatus.INACTIVE,
          },
        });

        // Deactivate user account
        const contractor = await tx.contractor.findUnique({
          where: { id },
          select: { userId: true },
        });

        if (contractor) {
          await tx.user.update({
            where: { id: contractor.userId },
            data: { active: false },
          });
        }

        // Create audit log
        await tx.auditLog.create({
          data: {
            userId,
            action: 'DELETE',
            resource: 'contractor',
            resourceId: id,
          },
        });
      });

      // Invalidate caches
      await this.invalidateContractorCaches(id);

      logger.info(`Contractor deleted successfully`, { contractorId: id });
    } catch (error) {
      logger.error('Error deleting contractor:', error);
      throw new Error('Failed to delete contractor');
    }
  }

  /**
   * Get contractors with pagination and filtering
   */
  public static async getMany(
    pagination: PaginationOptions,
    filters: FilterOptions
  ): Promise<ApiResponse<Contractor[]>> {
    try {
      const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {
        ...(filters.status && { status: { in: filters.status } }),
        ...(filters.verified !== undefined && { verified: filters.verified }),
        ...(filters.services && {
          services: {
            some: {
              service: { in: filters.services },
            },
          },
        }),
        ...(filters.location && {
          OR: [
            ...(filters.location.suburb ? [{
              address: { suburb: { contains: filters.location.suburb, mode: 'insensitive' } }
            }] : []),
            ...(filters.location.state ? [{
              address: { state: filters.location.state }
            }] : []),
            ...(filters.location.postcode ? [{
              address: { postcode: filters.location.postcode }
            }] : []),
          ],
        }),
        ...(filters.rating && {
          rating: {
            ...(filters.rating.min && { gte: filters.rating.min }),
            ...(filters.rating.max && { lte: filters.rating.max }),
          },
        }),
      };

      const cacheKey = `${this.CACHE_PREFIX}list:${JSON.stringify({ pagination, filters })}`;
      const cached = await cache.get<ApiResponse<Contractor[]>>(cacheKey);
      
      if (cached) {
        return cached;
      }

      // Get total count
      const total = await prisma.contractor.count({ where });

      // Get contractors
      const contractors = await prisma.contractor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          address: true,
          contactPerson: true,
          services: true,
          performanceMetrics: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              active: true,
            },
          },
        },
      });

      const result: ApiResponse<Contractor[]> = {
        success: true,
        data: contractors,
        meta: {
          total,
          page,
          limit,
          hasNext: skip + limit < total,
          hasPrev: page > 1,
        },
      };

      // Cache the result
      await cache.set(cacheKey, result, this.CACHE_TTL);

      return result;
    } catch (error) {
      logger.error('Error getting contractors:', error);
      throw new Error('Failed to get contractors');
    }
  }

  /**
   * Search contractors
   */
  public static async search(
    query: string,
    pagination: PaginationOptions,
    filters: FilterOptions
  ): Promise<ApiResponse<Contractor[]>> {
    try {
      const { page = 1, limit = 20 } = pagination;
      const skip = (page - 1) * limit;

      const searchWhere = {
        OR: [
          { businessName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { contactPerson: { 
            OR: [
              { firstName: { contains: query, mode: 'insensitive' } },
              { lastName: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ]
          }},
          { address: {
            OR: [
              { suburb: { contains: query, mode: 'insensitive' } },
              { state: { contains: query, mode: 'insensitive' } },
            ]
          }},
        ],
      };

      // Combine search with filters
      const where = {
        AND: [
          searchWhere,
          ...(filters.status ? [{ status: { in: filters.status } }] : []),
          ...(filters.verified !== undefined ? [{ verified: filters.verified }] : []),
          ...(filters.services ? [{
            services: { some: { service: { in: filters.services } } }
          }] : []),
        ],
      };

      const total = await prisma.contractor.count({ where });

      const contractors = await prisma.contractor.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
        include: {
          address: true,
          contactPerson: true,
          services: true,
          performanceMetrics: true,
        },
      });

      return {
        success: true,
        data: contractors,
        meta: {
          total,
          page,
          limit,
          hasNext: skip + limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      logger.error('Error searching contractors:', error);
      throw new Error('Failed to search contractors');
    }
  }

  /**
   * Update contractor performance metrics
   */
  public static async updatePerformanceMetrics(
    contractorId: string,
    metrics: Partial<PerformanceMetrics>
  ): Promise<PerformanceMetrics> {
    try {
      const updatedMetrics = await prisma.performanceMetric.update({
        where: { contractorId },
        data: {
          ...metrics,
          lastCalculated: new Date(),
        },
      });

      // Invalidate caches
      await this.invalidateContractorCaches(contractorId);

      return updatedMetrics as PerformanceMetrics;
    } catch (error) {
      logger.error('Error updating performance metrics:', error);
      throw new Error('Failed to update performance metrics');
    }
  }

  /**
   * Get contractors by service area
   */
  public static async getByServiceArea(
    postcode: string,
    serviceCategory?: ServiceCategory,
    radius: number = 50
  ): Promise<Contractor[]> {
    try {
      const cacheKey = `${this.CACHE_PREFIX}servicearea:${postcode}:${serviceCategory}:${radius}`;
      const cached = await cache.get<Contractor[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const contractors = await prisma.contractor.findMany({
        where: {
          AND: [
            { status: ContractorStatus.ACTIVE },
            { verified: true },
            {
              OR: [
                // Direct service area match
                {
                  serviceAreas: {
                    some: {
                      postcode,
                      active: true,
                    },
                  },
                },
                // Address-based radius match (simplified - would need geo calculation in production)
                {
                  address: {
                    postcode: {
                      // This is a simplified check - in production you'd calculate actual distance
                      in: await this.getNearbyPostcodes(postcode, radius),
                    },
                  },
                },
              ],
            },
            ...(serviceCategory ? [{
              services: {
                some: {
                  service: serviceCategory,
                  available: true,
                },
              },
            }] : []),
          ],
        },
        include: {
          address: true,
          contactPerson: true,
          services: true,
          performanceMetrics: true,
        },
        orderBy: [
          { rating: 'desc' },
          { performanceMetrics: { responseTime: 'asc' } },
        ],
      });

      // Cache the result
      await cache.set(cacheKey, contractors, this.CACHE_TTL);

      return contractors;
    } catch (error) {
      logger.error('Error getting contractors by service area:', error);
      throw new Error('Failed to get contractors by service area');
    }
  }

  /**
   * Manage service territories
   */
  public static async updateServiceTerritories(
    contractorId: string,
    territories: ServiceTerritoryData[]
  ): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        // Delete existing service areas
        await tx.serviceArea.deleteMany({
          where: { contractorId },
        });

        // Create new service areas
        for (const territory of territories) {
          for (const postcode of territory.postcodes) {
            await tx.serviceArea.create({
              data: {
                contractorId,
                postcode,
                suburb: territory.suburbs.join(','),
                state: await this.getStateFromPostcode(postcode),
                priority: territory.priority,
                active: territory.active,
              },
            });
          }
        }
      });

      // Invalidate caches
      await this.invalidateContractorCaches(contractorId);
    } catch (error) {
      logger.error('Error updating service territories:', error);
      throw new Error('Failed to update service territories');
    }
  }

  /**
   * Get contractor statistics
   */
  public static async getStatistics(): Promise<{
    total: number;
    active: number;
    pending: number;
    verified: number;
    byState: Record<string, number>;
    byService: Record<string, number>;
  }> {
    try {
      const cacheKey = `${this.CACHE_PREFIX}statistics`;
      const cached = await cache.get(cacheKey);
      
      if (cached) {
        return cached;
      }

      const [
        total,
        active,
        pending,
        verified,
        byStateData,
        byServiceData,
      ] = await Promise.all([
        prisma.contractor.count(),
        prisma.contractor.count({ where: { status: ContractorStatus.ACTIVE } }),
        prisma.contractor.count({ where: { status: ContractorStatus.PENDING } }),
        prisma.contractor.count({ where: { verified: true } }),
        prisma.contractorAddress.groupBy({
          by: ['state'],
          _count: { state: true },
        }),
        prisma.contractorService.groupBy({
          by: ['service'],
          _count: { service: true },
        }),
      ]);

      const byState = Object.fromEntries(
        byStateData.map(item => [item.state, item._count.state])
      );

      const byService = Object.fromEntries(
        byServiceData.map(item => [item.service, item._count.service])
      );

      const statistics = {
        total,
        active,
        pending,
        verified,
        byState,
        byService,
      };

      // Cache for 10 minutes
      await cache.set(cacheKey, statistics, 600);

      return statistics;
    } catch (error) {
      logger.error('Error getting contractor statistics:', error);
      throw new Error('Failed to get contractor statistics');
    }
  }

  /**
   * Helper method to invalidate contractor-related caches
   */
  private static async invalidateContractorCaches(contractorId: string): Promise<void> {
    await Promise.all([
      cache.flushByPattern(`${this.CACHE_PREFIX}${contractorId}*`),
      cache.flushByPattern(`${this.CACHE_PREFIX}list*`),
      cache.flushByPattern(`${this.CACHE_PREFIX}statistics`),
      cache.flushByPattern(`${this.CACHE_PREFIX}servicearea*`),
    ]);
  }

  /**
   * Helper method to get nearby postcodes (simplified - would use geo library in production)
   */
  private static async getNearbyPostcodes(postcode: string, radius: number): Promise<string[]> {
    // Simplified implementation - in production you'd use a geo library
    // This is just a placeholder that returns the same postcode
    return [postcode];
  }

  /**
   * Helper method to get state from postcode
   */
  private static async getStateFromPostcode(postcode: string): Promise<string> {
    const code = parseInt(postcode);
    
    if (code >= 1000 && code <= 2999) return 'NSW';
    if (code >= 3000 && code <= 3999) return 'VIC';
    if (code >= 4000 && code <= 4999) return 'QLD';
    if (code >= 5000 && code <= 5999) return 'SA';
    if (code >= 6000 && code <= 6999) return 'WA';
    if (code >= 7000 && code <= 7999) return 'TAS';
    if (code >= 800 && code <= 999) return 'NT';
    if ((code >= 200 && code <= 299) || (code >= 2600 && code <= 2920)) return 'ACT';
    
    return 'NSW'; // default
  }
}

export default ContractorService;
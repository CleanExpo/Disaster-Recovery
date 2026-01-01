import { prisma } from '@/lib/prisma';
import { ServiceStatus } from '@prisma/client';

/**
 * Search filters for service requests
 */
export interface ServiceRequestSearchFilters {
  /** Text query to search across description, serviceTitle, and location */
  query?: string;
  /** Filter by service category (exact match) */
  serviceCategory?: string;
  /** Filter by status (exact match) */
  status?: ServiceStatus;
  /** Filter by location (text match) */
  location?: string;
  /** Filter by user ID (for client-specific queries) */
  userId?: string;
  /** Filter by tenant ID (for multi-tenant queries) */
  tenantId?: string;
  /** Filter by date range - start date */
  createdAfter?: Date;
  /** Filter by date range - end date */
  createdBefore?: Date;
}

/**
 * Pagination options for search results
 */
export interface SearchPaginationOptions {
  /** Maximum number of results to return (default: 20) */
  limit?: number;
  /** Number of results to skip (default: 0) */
  offset?: number;
}

/**
 * Search result containing service requests and metadata
 */
export interface ServiceRequestSearchResult {
  /** Array of matching service requests */
  data: any[];
  /** Total count of matching records (before pagination) */
  total: number;
  /** Number of results returned */
  count: number;
  /** Pagination info */
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * ServiceRequestSearchService
 *
 * Provides search functionality for service requests using Prisma queries.
 * Follows the pattern from MatchingService and MessagingService with static methods,
 * text matching using contains/startsWith, and support for filtering and pagination.
 */
export class ServiceRequestSearchService {
  /**
   * Search service requests with text matching and filters
   *
   * @param filters - Search filters including query text and field filters
   * @param pagination - Pagination options (limit and offset)
   * @returns Search results with data and pagination info
   */
  static async search(
    filters: ServiceRequestSearchFilters = {},
    pagination: SearchPaginationOptions = {}
  ): Promise<ServiceRequestSearchResult> {
    try {
      const { limit = 20, offset = 0 } = pagination;

      // Build the where clause
      const whereClause = this.buildWhereClause(filters);

      // Execute count and findMany queries in parallel for efficiency
      const [total, data] = await Promise.all([
        prisma.serviceRequest.count({ where: whereClause }),
        prisma.serviceRequest.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            matches: {
              select: {
                id: true,
                matchScore: true,
                status: true,
              },
            },
          },
          orderBy: [
            { createdAt: 'desc' },
          ],
          take: limit,
          skip: offset,
        }),
      ]);

      return {
        data,
        total,
        count: data.length,
        pagination: {
          limit,
          offset,
          hasMore: offset + data.length < total,
        },
      };
    } catch (error) {
      console.error('Error searching service requests:', error);
      throw new Error('Failed to search service requests');
    }
  }

  /**
   * Search service requests for a specific user (client)
   * Convenience method that enforces user ID filter
   *
   * @param userId - The user ID to filter by
   * @param filters - Additional search filters
   * @param pagination - Pagination options
   * @returns Search results filtered to the specific user
   */
  static async searchForUser(
    userId: string,
    filters: Omit<ServiceRequestSearchFilters, 'userId'> = {},
    pagination: SearchPaginationOptions = {}
  ): Promise<ServiceRequestSearchResult> {
    return this.search({ ...filters, userId }, pagination);
  }

  /**
   * Search all service requests (admin view)
   * Provides access to all requests across users
   *
   * @param filters - Search filters
   * @param pagination - Pagination options
   * @returns Search results across all users
   */
  static async searchAll(
    filters: Omit<ServiceRequestSearchFilters, 'userId'> = {},
    pagination: SearchPaginationOptions = {}
  ): Promise<ServiceRequestSearchResult> {
    return this.search(filters, pagination);
  }

  /**
   * Get service request by ID with related data
   *
   * @param id - Service request ID
   * @param userId - Optional user ID for authorization check
   * @returns Service request or null if not found
   */
  static async getById(
    id: string,
    userId?: string
  ): Promise<any | null> {
    try {
      const whereClause: any = { id };

      // If userId provided, ensure request belongs to that user
      if (userId) {
        whereClause.userId = userId;
      }

      return await prisma.serviceRequest.findFirst({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          matches: {
            include: {
              contractor: {
                select: {
                  id: true,
                  businessName: true,
                  rating: true,
                  experience: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error getting service request by ID:', error);
      throw new Error('Failed to get service request');
    }
  }

  /**
   * Get service requests by status
   * Useful for dashboard views and workflow management
   *
   * @param status - The status to filter by
   * @param userId - Optional user ID filter
   * @param pagination - Pagination options
   * @returns Service requests with the specified status
   */
  static async getByStatus(
    status: ServiceStatus,
    userId?: string,
    pagination: SearchPaginationOptions = {}
  ): Promise<ServiceRequestSearchResult> {
    const filters: ServiceRequestSearchFilters = { status };
    if (userId) {
      filters.userId = userId;
    }
    return this.search(filters, pagination);
  }

  /**
   * Get recent service requests
   * Returns the most recently created requests
   *
   * @param limit - Maximum number of results (default: 10)
   * @param userId - Optional user ID filter
   * @returns Recent service requests
   */
  static async getRecent(
    limit: number = 10,
    userId?: string
  ): Promise<any[]> {
    try {
      const whereClause: any = {};
      if (userId) {
        whereClause.userId = userId;
      }

      return await prisma.serviceRequest.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    } catch (error) {
      console.error('Error getting recent service requests:', error);
      throw new Error('Failed to get recent service requests');
    }
  }

  /**
   * Count service requests matching filters
   * Useful for statistics and dashboard counts
   *
   * @param filters - Search filters
   * @returns Count of matching requests
   */
  static async count(filters: ServiceRequestSearchFilters = {}): Promise<number> {
    try {
      const whereClause = this.buildWhereClause(filters);
      return await prisma.serviceRequest.count({ where: whereClause });
    } catch (error) {
      console.error('Error counting service requests:', error);
      throw new Error('Failed to count service requests');
    }
  }

  /**
   * Build the Prisma where clause from search filters
   * Handles text matching with contains for query searches
   * and exact matching for category/status filters
   *
   * @param filters - Search filters to convert to where clause
   * @returns Prisma where clause object
   */
  private static buildWhereClause(filters: ServiceRequestSearchFilters): any {
    const whereClause: any = {};

    // Text search across multiple fields using OR
    if (filters.query && filters.query.trim().length > 0) {
      const searchTerm = filters.query.trim();
      whereClause.OR = [
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { serviceTitle: { contains: searchTerm, mode: 'insensitive' } },
        { location: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    // Exact match filters
    if (filters.serviceCategory) {
      whereClause.serviceCategory = filters.serviceCategory;
    }

    if (filters.status) {
      whereClause.status = filters.status;
    }

    // Location text match (in addition to query search)
    if (filters.location && !filters.query) {
      whereClause.location = { contains: filters.location, mode: 'insensitive' };
    }

    // User ID filter (for client-specific queries)
    if (filters.userId) {
      whereClause.userId = filters.userId;
    }

    // Tenant ID filter (for multi-tenant queries)
    if (filters.tenantId) {
      whereClause.tenantId = filters.tenantId;
    }

    // Date range filters
    if (filters.createdAfter || filters.createdBefore) {
      whereClause.createdAt = {};
      if (filters.createdAfter) {
        whereClause.createdAt.gte = filters.createdAfter;
      }
      if (filters.createdBefore) {
        whereClause.createdAt.lte = filters.createdBefore;
      }
    }

    return whereClause;
  }
}

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ContractorService from '@/services/ContractorService';
import { AuthenticatedRequest, PaginationOptions, FilterOptions } from '@/types';
import { validateAndTransform, contractorCreateSchema, contractorUpdateSchema, paginationSchema, filterSchema } from '@/utils/validation';
import logger from '@/config/logger';

export class ContractorController {
  /**
   * Create a new contractor
   * POST /api/v1/contractors
   */
  public static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // Validate request data
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors.array().map(err => err.msg),
        });
        return;
      }

      const contractorData = validateAndTransform(contractorCreateSchema, req.body);
      
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractor = await ContractorService.create(contractorData, req.user.id);

      logger.info('Contractor created successfully', {
        contractorId: contractor.id,
        userId: req.user.id,
        businessName: contractor.businessName,
      });

      res.status(201).json({
        success: true,
        data: contractor,
        message: 'Contractor created successfully',
      });
    } catch (error) {
      logger.error('Error creating contractor:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create contractor',
      });
    }
  }

  /**
   * Get contractor by ID
   * GET /api/v1/contractors/:id
   */
  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const includeRelations = req.query.include !== 'false';

      const contractor = await ContractorService.getById(id, includeRelations);

      if (!contractor) {
        res.status(404).json({
          success: false,
          message: 'Contractor not found',
        });
        return;
      }

      res.json({
        success: true,
        data: contractor,
      });
    } catch (error) {
      logger.error('Error getting contractor:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get contractor',
      });
    }
  }

  /**
   * Update contractor
   * PUT /api/v1/contractors/:id
   */
  public static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors.array().map(err => err.msg),
        });
        return;
      }

      const { id } = req.params;
      const updateData = validateAndTransform(contractorUpdateSchema, req.body);

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractor = await ContractorService.update(id, updateData, req.user.id);

      logger.info('Contractor updated successfully', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        data: contractor,
        message: 'Contractor updated successfully',
      });
    } catch (error) {
      logger.error('Error updating contractor:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update contractor',
      });
    }
  }

  /**
   * Delete contractor
   * DELETE /api/v1/contractors/:id
   */
  public static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      await ContractorService.delete(id, req.user.id);

      logger.info('Contractor deleted successfully', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        message: 'Contractor deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting contractor:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete contractor',
      });
    }
  }

  /**
   * Get contractors with pagination and filtering
   * GET /api/v1/contractors
   */
  public static async getMany(req: Request, res: Response): Promise<void> {
    try {
      const pagination: PaginationOptions = validateAndTransform(paginationSchema, {
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      });

      const filters: FilterOptions = validateAndTransform(filterSchema, {
        status: req.query.status ? (req.query.status as string).split(',') : undefined,
        services: req.query.services ? (req.query.services as string).split(',') : undefined,
        verified: req.query.verified,
        location: {
          suburb: req.query.suburb as string,
          state: req.query.state as string,
          postcode: req.query.postcode as string,
        },
        rating: {
          min: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
          max: req.query.maxRating ? parseFloat(req.query.maxRating as string) : undefined,
        },
        search: req.query.search as string,
      });

      const result = await ContractorService.getMany(pagination, filters);

      res.json(result);
    } catch (error) {
      logger.error('Error getting contractors:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get contractors',
      });
    }
  }

  /**
   * Search contractors
   * GET /api/v1/contractors/search
   */
  public static async search(req: Request, res: Response): Promise<void> {
    try {
      const { q: query } = req.query;

      if (!query || typeof query !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
        return;
      }

      const pagination: PaginationOptions = validateAndTransform(paginationSchema, {
        page: req.query.page,
        limit: req.query.limit,
      });

      const filters: FilterOptions = validateAndTransform(filterSchema, {
        status: req.query.status ? (req.query.status as string).split(',') : undefined,
        services: req.query.services ? (req.query.services as string).split(',') : undefined,
        verified: req.query.verified,
      });

      const result = await ContractorService.search(query, pagination, filters);

      res.json(result);
    } catch (error) {
      logger.error('Error searching contractors:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search contractors',
      });
    }
  }

  /**
   * Get contractors by service area
   * GET /api/v1/contractors/service-area/:postcode
   */
  public static async getByServiceArea(req: Request, res: Response): Promise<void> {
    try {
      const { postcode } = req.params;
      const { service, radius } = req.query;

      if (!/^\d{4}$/.test(postcode)) {
        res.status(400).json({
          success: false,
          message: 'Invalid postcode format',
        });
        return;
      }

      const contractors = await ContractorService.getByServiceArea(
        postcode,
        service as any,
        radius ? parseInt(radius as string) : undefined
      );

      res.json({
        success: true,
        data: contractors,
        meta: {
          postcode,
          service: service || 'all',
          radius: radius || 50,
          total: contractors.length,
        },
      });
    } catch (error) {
      logger.error('Error getting contractors by service area:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get contractors by service area',
      });
    }
  }

  /**
   * Update contractor performance metrics
   * PUT /api/v1/contractors/:id/performance
   */
  public static async updatePerformanceMetrics(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const metrics = req.body;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const updatedMetrics = await ContractorService.updatePerformanceMetrics(id, metrics);

      logger.info('Performance metrics updated', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        data: updatedMetrics,
        message: 'Performance metrics updated successfully',
      });
    } catch (error) {
      logger.error('Error updating performance metrics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update performance metrics',
      });
    }
  }

  /**
   * Update service territories
   * PUT /api/v1/contractors/:id/territories
   */
  public static async updateServiceTerritories(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const territories = req.body;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      await ContractorService.updateServiceTerritories(id, territories);

      logger.info('Service territories updated', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        message: 'Service territories updated successfully',
      });
    } catch (error) {
      logger.error('Error updating service territories:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update service territories',
      });
    }
  }

  /**
   * Get contractor statistics
   * GET /api/v1/contractors/statistics
   */
  public static async getStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await ContractorService.getStatistics();

      res.json({
        success: true,
        data: statistics,
      });
    } catch (error) {
      logger.error('Error getting contractor statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get contractor statistics',
      });
    }
  }

  /**
   * Get contractor profile (for authenticated contractor)
   * GET /api/v1/contractors/me
   */
  public static async getMyProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.contractorId) {
        res.status(404).json({
          success: false,
          message: 'Contractor profile not found',
        });
        return;
      }

      const contractor = await ContractorService.getById(req.user.contractorId, true);

      if (!contractor) {
        res.status(404).json({
          success: false,
          message: 'Contractor profile not found',
        });
        return;
      }

      res.json({
        success: true,
        data: contractor,
      });
    } catch (error) {
      logger.error('Error getting contractor profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get contractor profile',
      });
    }
  }

  /**
   * Update contractor profile (for authenticated contractor)
   * PUT /api/v1/contractors/me
   */
  public static async updateMyProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.contractorId) {
        res.status(404).json({
          success: false,
          message: 'Contractor profile not found',
        });
        return;
      }

      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors.array().map(err => err.msg),
        });
        return;
      }

      const updateData = validateAndTransform(contractorUpdateSchema, req.body);

      // Contractors can't update their own status or verification
      delete updateData.status;
      delete updateData.verified;

      const contractor = await ContractorService.update(
        req.user.contractorId,
        updateData,
        req.user.id
      );

      logger.info('Contractor profile updated', {
        contractorId: req.user.contractorId,
        userId: req.user.id,
      });

      res.json({
        success: true,
        data: contractor,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      logger.error('Error updating contractor profile:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update profile',
      });
    }
  }

  /**
   * Verify contractor
   * POST /api/v1/contractors/:id/verify
   */
  public static async verify(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractor = await ContractorService.update(
        id,
        { verified: true },
        req.user.id
      );

      logger.info('Contractor verified', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        data: contractor,
        message: 'Contractor verified successfully',
      });
    } catch (error) {
      logger.error('Error verifying contractor:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to verify contractor',
      });
    }
  }

  /**
   * Approve contractor
   * POST /api/v1/contractors/:id/approve
   */
  public static async approve(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractor = await ContractorService.update(
        id,
        { status: 'ACTIVE' as any, verified: true },
        req.user.id
      );

      logger.info('Contractor approved', {
        contractorId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        data: contractor,
        message: 'Contractor approved successfully',
      });
    } catch (error) {
      logger.error('Error approving contractor:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to approve contractor',
      });
    }
  }

  /**
   * Suspend contractor
   * POST /api/v1/contractors/:id/suspend
   */
  public static async suspend(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      const contractor = await ContractorService.update(
        id,
        { status: 'SUSPENDED' as any },
        req.user.id
      );

      logger.info('Contractor suspended', {
        contractorId: id,
        userId: req.user.id,
        reason,
      });

      res.json({
        success: true,
        data: contractor,
        message: 'Contractor suspended successfully',
      });
    } catch (error) {
      logger.error('Error suspending contractor:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to suspend contractor',
      });
    }
  }
}

export default ContractorController;
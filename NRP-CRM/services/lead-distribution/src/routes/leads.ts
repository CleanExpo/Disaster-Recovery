import { Router, Request, Response } from 'express';
import { LeadDistributionService, ContractorResponse } from '../services/LeadDistributionService';
import { Lead, ILead, LeadStatus, ServiceType, LeadPriority, PropertyType, MembershipTier } from '../models/Lead';
import { GeoMatching } from '../algorithms/GeoMatching';
import { PriorityScoring } from '../algorithms/PriorityScoring';
import { getQueueManager } from '../utils/queue';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';

const router = Router();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'lead-routes' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Validation schemas
const createLeadSchema = Joi.object({
  title: Joi.string().required().max(200),
  description: Joi.string().required().max(2000),
  serviceType: Joi.array().items(Joi.string().valid(...Object.values(ServiceType))).required(),
  priority: Joi.string().valid(...Object.values(LeadPriority)).default(LeadPriority.MEDIUM),
  propertyType: Joi.string().valid(...Object.values(PropertyType)).required(),
  location: Joi.object({
    address: Joi.string().required(),
    suburb: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postcode: Joi.string().required(),
    country: Joi.string().default('Australia'),
    coordinates: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required()
    }).required()
  }).required(),
  client: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    alternatePhone: Joi.string().optional(),
    preferredContactMethod: Joi.string().valid('phone', 'email', 'sms').default('phone'),
    insuranceCompany: Joi.string().optional(),
    claimNumber: Joi.string().optional()
  }).required(),
  estimatedValue: Joi.number().min(0).required(),
  budget: Joi.object({
    min: Joi.number().min(0).optional(),
    max: Joi.number().min(0).optional()
  }).optional(),
  requiredBy: Joi.date().optional(),
  preferredStartDate: Joi.date().optional(),
  isEmergency: Joi.boolean().default(false),
  availableHours: Joi.object({
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
  }).optional(),
  maxDistributionRadius: Joi.number().min(1).max(500).default(50),
  autoExpiry: Joi.boolean().default(true),
  expiryMinutes: Joi.number().min(5).max(1440).default(60),
  images: Joi.array().items(Joi.string().uri()).optional(),
  attachments: Joi.array().items(Joi.object({
    fileName: Joi.string().required(),
    fileUrl: Joi.string().uri().required(),
    fileType: Joi.string().required()
  })).optional(),
  source: Joi.string().required(),
  specialRequirements: Joi.array().items(Joi.string()).optional(),
  hazardWarnings: Joi.array().items(Joi.string()).optional(),
  equipmentRequired: Joi.array().items(Joi.string()).optional()
});

const contractorResponseSchema = Joi.object({
  leadId: Joi.string().required(),
  contractorId: Joi.string().required(),
  response: Joi.string().valid('accepted', 'declined').required(),
  reason: Joi.string().optional(),
  estimatedArrivalTime: Joi.date().optional(),
  notes: Joi.string().max(500).optional()
});

const distributionConfigSchema = Joi.object({
  maxContractorsPerLead: Joi.number().min(1).max(20).default(5),
  distributionMethod: Joi.string().valid('sequential', 'parallel', 'tier-based').default('tier-based'),
  expirationMinutes: Joi.number().min(5).max(1440).default(60)
});

// Initialize distribution service
let distributionService: LeadDistributionService;

// Middleware to initialize services
router.use((req: Request, res: Response, next) => {
  if (!distributionService) {
    distributionService = new LeadDistributionService();
  }
  next();
});

/**
 * @route   POST /api/leads
 * @desc    Create a new lead
 * @access  Public
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { error, value } = createLeadSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Validate coordinates
    if (!GeoMatching.validateCoordinates(value.location)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates provided'
      });
    }

    // Generate unique lead ID
    const leadId = `LEAD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Create lead document
    const leadData: Partial<ILead> = {
      leadId,
      ...value,
      status: LeadStatus.PENDING,
      viewCount: 0,
      distributionCount: 0,
      distributionAttempts: []
    };

    const lead = new Lead(leadData);
    await lead.save();

    logger.info('Lead created successfully', {
      leadId,
      title: value.title,
      location: `${value.location.suburb}, ${value.location.city}`,
      estimatedValue: value.estimatedValue
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: {
        leadId,
        title: lead.title,
        status: lead.status,
        createdAt: lead.createdAt,
        location: lead.formattedLocation
      }
    });

  } catch (error) {
    logger.error('Failed to create lead', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   POST /api/leads/:leadId/distribute
 * @desc    Distribute a lead to contractors
 * @access  Private
 */
router.post('/:leadId/distribute', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const { error, value } = distributionConfigSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Check if lead exists
    const lead = await Lead.findOne({ leadId }).exec();
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Check if lead can be distributed
    if (!lead.canDistribute()) {
      return res.status(400).json({
        success: false,
        error: 'Lead cannot be distributed',
        details: `Status: ${lead.status}, Expired: ${lead.isExpired()}`
      });
    }

    // Queue lead for distribution
    const queueManager = getQueueManager();
    await queueManager.publishLeadDistribution({
      leadId,
      contractorIds: [], // Will be determined by distribution service
      priority: lead.priority,
      distributionMethod: value.distributionMethod,
      expirationTime: new Date(Date.now() + (value.expirationMinutes * 60 * 1000))
    });

    logger.info('Lead queued for distribution', {
      leadId,
      distributionMethod: value.distributionMethod,
      expirationMinutes: value.expirationMinutes
    });

    res.json({
      success: true,
      message: 'Lead queued for distribution',
      data: {
        leadId,
        status: 'queued',
        distributionMethod: value.distributionMethod,
        estimatedDistributionTime: new Date(Date.now() + 5000) // 5 seconds estimate
      }
    });

  } catch (error) {
    logger.error('Failed to distribute lead', { error, leadId: req.params.leadId });
    res.status(500).json({
      success: false,
      error: 'Failed to distribute lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   POST /api/leads/:leadId/respond
 * @desc    Handle contractor response to a lead
 * @access  Private
 */
router.post('/:leadId/respond', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const responseData = { ...req.body, leadId, responseTime: new Date() };
    
    const { error, value } = contractorResponseSchema.validate(responseData);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Check if lead exists
    const lead = await Lead.findOne({ leadId }).exec();
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Check if contractor was actually notified about this lead
    const distributionAttempt = lead.distributionAttempts.find(
      attempt => attempt.contractorId === value.contractorId
    );

    if (!distributionAttempt) {
      return res.status(400).json({
        success: false,
        error: 'Contractor was not notified about this lead'
      });
    }

    // Check if contractor already responded
    if (distributionAttempt.response) {
      return res.status(400).json({
        success: false,
        error: 'Response already submitted',
        previousResponse: distributionAttempt.response
      });
    }

    // Handle the response
    await distributionService.handleContractorResponse(value);

    logger.info('Contractor response processed', {
      leadId,
      contractorId: value.contractorId,
      response: value.response
    });

    res.json({
      success: true,
      message: `Lead ${value.response} successfully`,
      data: {
        leadId,
        contractorId: value.contractorId,
        response: value.response,
        responseTime: value.responseTime
      }
    });

  } catch (error) {
    logger.error('Failed to process contractor response', {
      error,
      leadId: req.params.leadId,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to process response',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/leads
 * @desc    Get leads with filtering and pagination
 * @access  Private
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      serviceType,
      priority,
      city,
      state,
      minValue,
      maxValue,
      isEmergency,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter query
    const filter: any = {};
    
    if (status) filter.status = status;
    if (serviceType) filter.serviceType = { $in: Array.isArray(serviceType) ? serviceType : [serviceType] };
    if (priority) filter.priority = priority;
    if (city) filter['location.city'] = new RegExp(city as string, 'i');
    if (state) filter['location.state'] = new RegExp(state as string, 'i');
    if (isEmergency !== undefined) filter.isEmergency = isEmergency === 'true';
    
    if (minValue || maxValue) {
      filter.estimatedValue = {};
      if (minValue) filter.estimatedValue.$gte = Number(minValue);
      if (maxValue) filter.estimatedValue.$lte = Number(maxValue);
    }

    // Execute query with pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limitNum)
        .select('-distributionAttempts -__v')
        .exec(),
      Lead.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1
      }
    });

  } catch (error) {
    logger.error('Failed to fetch leads', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/leads/:leadId
 * @desc    Get a specific lead by ID
 * @access  Private
 */
router.get('/:leadId', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const lead = await Lead.findOne({ leadId }).exec();

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    // Increment view count
    lead.viewCount += 1;
    await lead.save();

    res.json({
      success: true,
      data: lead
    });

  } catch (error) {
    logger.error('Failed to fetch lead', { error, leadId: req.params.leadId });
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/leads/:leadId/status
 * @desc    Get lead distribution status and progress
 * @access  Private
 */
router.get('/:leadId/status', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const lead = await Lead.findOne({ leadId }).exec();

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    const distributionStatus = lead.distributionStatus;
    const responses = lead.distributionAttempts.filter(attempt => attempt.response);
    const pendingResponses = lead.distributionAttempts.filter(attempt => !attempt.response);

    res.json({
      success: true,
      data: {
        leadId,
        status: lead.status,
        distributionStatus,
        isExpired: lead.isExpired(),
        distributionStartedAt: lead.distributionStartedAt,
        distributionExpiresAt: lead.distributionExpiresAt,
        assignedContractor: lead.assignedContractor,
        statistics: {
          totalNotified: lead.distributionAttempts.length,
          totalResponses: responses.length,
          acceptedResponses: responses.filter(r => r.response === 'accepted').length,
          declinedResponses: responses.filter(r => r.response === 'declined').length,
          pendingResponses: pendingResponses.length
        },
        distributionAttempts: lead.distributionAttempts.map(attempt => ({
          contractorId: attempt.contractorId,
          sentAt: attempt.sentAt,
          response: attempt.response,
          responseAt: attempt.responseAt,
          declineReason: attempt.declineReason,
          priorityScore: attempt.priorityScore,
          distance: attempt.distance
        }))
      }
    });

  } catch (error) {
    logger.error('Failed to fetch lead status', { error, leadId: req.params.leadId });
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead status',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   PUT /api/leads/:leadId
 * @desc    Update a lead (limited fields)
 * @access  Private
 */
router.put('/:leadId', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const allowedUpdates = [
      'title', 'description', 'priority', 'estimatedValue', 
      'requiredBy', 'preferredStartDate', 'specialRequirements',
      'hazardWarnings', 'equipmentRequired'
    ];

    // Filter allowed updates
    const updates: any = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid updates provided',
        allowedFields: allowedUpdates
      });
    }

    const lead = await Lead.findOneAndUpdate(
      { leadId },
      { $set: updates },
      { new: true, runValidators: true }
    ).exec();

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    logger.info('Lead updated successfully', {
      leadId,
      updates: Object.keys(updates)
    });

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });

  } catch (error) {
    logger.error('Failed to update lead', { error, leadId: req.params.leadId });
    res.status(500).json({
      success: false,
      error: 'Failed to update lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   POST /api/leads/:leadId/cancel
 * @desc    Cancel a lead distribution
 * @access  Private
 */
router.post('/:leadId/cancel', async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const { reason = 'Cancelled by user' } = req.body;

    const lead = await Lead.findOne({ leadId }).exec();
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    if (lead.status === LeadStatus.ACCEPTED) {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel an accepted lead'
      });
    }

    if (lead.status === LeadStatus.CANCELLED) {
      return res.status(400).json({
        success: false,
        error: 'Lead is already cancelled'
      });
    }

    lead.status = LeadStatus.CANCELLED;
    await lead.save();

    logger.info('Lead cancelled', { leadId, reason });

    res.json({
      success: true,
      message: 'Lead cancelled successfully',
      data: {
        leadId,
        status: lead.status,
        cancelledAt: new Date(),
        reason
      }
    });

  } catch (error) {
    logger.error('Failed to cancel lead', { error, leadId: req.params.leadId });
    res.status(500).json({
      success: false,
      error: 'Failed to cancel lead',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/leads/analytics/dashboard
 * @desc    Get lead distribution analytics for dashboard
 * @access  Private
 */
router.get('/analytics/dashboard', async (req: Request, res: Response) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Get analytics data
    const [
      totalLeads,
      statusBreakdown,
      priorityBreakdown,
      serviceTypeBreakdown,
      locationBreakdown,
      valueAnalytics
    ] = await Promise.all([
      Lead.countDocuments({ createdAt: { $gte: startDate } }),
      Lead.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $unwind: '$serviceType' },
        { $group: { _id: '$serviceType', count: { $sum: 1 } } }
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: '$location.city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Lead.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: {
          _id: null,
          totalValue: { $sum: '$estimatedValue' },
          averageValue: { $avg: '$estimatedValue' },
          minValue: { $min: '$estimatedValue' },
          maxValue: { $max: '$estimatedValue' }
        }}
      ])
    ]);

    // Get distribution service stats
    const distributionStats = await distributionService.getDistributionStats();

    res.json({
      success: true,
      data: {
        period,
        overview: {
          totalLeads,
          activeDistributions: distributionStats.activeDistributions,
          acceptanceRate: distributionStats.acceptanceRate,
          averageResponseTime: distributionStats.averageResponseTime
        },
        breakdowns: {
          status: statusBreakdown,
          priority: priorityBreakdown,
          serviceType: serviceTypeBreakdown,
          locations: locationBreakdown
        },
        valueAnalytics: valueAnalytics[0] || {
          totalValue: 0,
          averageValue: 0,
          minValue: 0,
          maxValue: 0
        },
        distributionStats
      }
    });

  } catch (error) {
    logger.error('Failed to fetch analytics', { error });
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/leads/test/geo-matching
 * @desc    Test geo-matching functionality
 * @access  Private (Development only)
 */
router.get('/test/geo-matching', async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ success: false, error: 'Not found' });
  }

  try {
    const { lat = -27.4698, lng = 153.0251, radius = 25 } = req.query;
    
    const testLocation = {
      address: 'Test Address',
      suburb: 'Test Suburb',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia',
      coordinates: {
        latitude: Number(lat),
        longitude: Number(lng)
      }
    };

    // Mock contractors for testing
    const mockContractors = [
      {
        contractorId: 'test-1',
        name: 'Test Contractor 1',
        location: {
          ...testLocation,
          coordinates: { latitude: -27.4698, longitude: 153.0251 } // Same location
        },
        serviceRadius: 30,
        isAvailable: true
      },
      {
        contractorId: 'test-2',
        name: 'Test Contractor 2',
        location: {
          ...testLocation,
          coordinates: { latitude: -27.5000, longitude: 153.0000 } // ~5km away
        },
        serviceRadius: 25,
        isAvailable: true
      }
    ];

    const matches = GeoMatching.matchContractors(
      testLocation,
      mockContractors as any,
      { maxDistance: Number(radius), sortByDistance: true }
    );

    res.json({
      success: true,
      data: {
        testLocation,
        searchRadius: Number(radius),
        contractors: mockContractors.length,
        matches: matches.length,
        results: matches
      }
    });

  } catch (error) {
    logger.error('Geo-matching test failed', { error });
    res.status(500).json({
      success: false,
      error: 'Geo-matching test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
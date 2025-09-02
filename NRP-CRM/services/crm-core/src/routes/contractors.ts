import { Router } from 'express';
import { body, param, query } from 'express-validator';
import ContractorController from '@/controllers/ContractorController';
import AuthMiddleware from '@/middleware/auth';
import { UserRole } from '@/types';

const router = Router();

// Validation middleware
const contractorCreateValidation = [
  body('businessName')
    .notEmpty()
    .withMessage('Business name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  
  body('abn')
    .notEmpty()
    .withMessage('ABN is required')
    .matches(/^\d{11}$/)
    .withMessage('ABN must be 11 digits'),
  
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('phone')
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Valid phone number is required'),
  
  body('address.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('address.suburb')
    .notEmpty()
    .withMessage('Suburb is required'),
  
  body('address.state')
    .isIn(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'])
    .withMessage('Valid Australian state is required'),
  
  body('address.postcode')
    .matches(/^\d{4}$/)
    .withMessage('Valid 4-digit postcode is required'),
  
  body('contactPerson.firstName')
    .notEmpty()
    .withMessage('Contact person first name is required'),
  
  body('contactPerson.lastName')
    .notEmpty()
    .withMessage('Contact person last name is required'),
  
  body('contactPerson.email')
    .isEmail()
    .withMessage('Valid contact person email is required')
    .normalizeEmail(),
  
  body('contactPerson.phone')
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Valid contact person phone is required'),
  
  body('contactPerson.position')
    .notEmpty()
    .withMessage('Contact person position is required'),
  
  body('services')
    .isArray({ min: 1 })
    .withMessage('At least one service category is required'),
  
  body('services.*')
    .isIn([
      'WATER_DAMAGE',
      'FIRE_DAMAGE',
      'MOULD_REMEDIATION',
      'STORM_DAMAGE',
      'FLOOD_RECOVERY',
      'SEWAGE_CLEANUP',
      'BIOHAZARD_CLEANING',
      'TRAUMA_SCENE_CLEANING',
      'VANDALISM_REPAIR',
      'EMERGENCY_BOARD_UP'
    ])
    .withMessage('Invalid service category'),
  
  body('serviceRadius')
    .optional()
    .isInt({ min: 1, max: 500 })
    .withMessage('Service radius must be between 1 and 500 km'),
  
  body('insuranceDetails.provider')
    .notEmpty()
    .withMessage('Insurance provider is required'),
  
  body('insuranceDetails.policyNumber')
    .notEmpty()
    .withMessage('Insurance policy number is required'),
  
  body('insuranceDetails.coverageAmount')
    .isNumeric()
    .withMessage('Valid coverage amount is required'),
  
  body('insuranceDetails.expiryDate')
    .isISO8601()
    .withMessage('Valid insurance expiry date is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Insurance expiry date must be in the future');
      }
      return true;
    }),
];

const contractorUpdateValidation = [
  body('businessName')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Valid phone number is required'),
  
  body('status')
    .optional()
    .isIn(['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE', 'REJECTED'])
    .withMessage('Invalid status'),
  
  body('verified')
    .optional()
    .isBoolean()
    .withMessage('Verified must be a boolean'),
];

const idValidation = [
  param('id')
    .isUUID()
    .withMessage('Valid contractor ID is required'),
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'businessName', 'rating', 'status'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
];

// Public routes (no authentication required)
router.get(
  '/search',
  [
    query('q')
      .notEmpty()
      .withMessage('Search query is required'),
    ...paginationValidation,
  ],
  ContractorController.search
);

router.get(
  '/service-area/:postcode',
  [
    param('postcode')
      .matches(/^\d{4}$/)
      .withMessage('Valid 4-digit postcode is required'),
    query('service')
      .optional()
      .isIn([
        'WATER_DAMAGE',
        'FIRE_DAMAGE',
        'MOULD_REMEDIATION',
        'STORM_DAMAGE',
        'FLOOD_RECOVERY',
        'SEWAGE_CLEANUP',
        'BIOHAZARD_CLEANING',
        'TRAUMA_SCENE_CLEANING',
        'VANDALISM_REPAIR',
        'EMERGENCY_BOARD_UP'
      ])
      .withMessage('Invalid service category'),
    query('radius')
      .optional()
      .isInt({ min: 1, max: 500 })
      .withMessage('Radius must be between 1 and 500 km'),
  ],
  ContractorController.getByServiceArea
);

router.get(
  '/statistics',
  ContractorController.getStatistics
);

// Protected routes (authentication required)

// Contractor self-management routes
router.get(
  '/me',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(UserRole.CONTRACTOR),
  ContractorController.getMyProfile
);

router.put(
  '/me',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(UserRole.CONTRACTOR),
  contractorUpdateValidation,
  ContractorController.updateMyProfile
);

// CRUD operations (admin/manager only)
router.post(
  '/',
  AuthMiddleware.authenticate,
  contractorCreateValidation,
  ContractorController.create
);

router.get(
  '/',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  paginationValidation,
  ContractorController.getMany
);

router.get(
  '/:id',
  AuthMiddleware.authenticate,
  idValidation,
  AuthMiddleware.authorizeContractor,
  ContractorController.getById
);

router.put(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  contractorUpdateValidation,
  ContractorController.update
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  ContractorController.delete
);

// Performance metrics (admin/manager only)
router.put(
  '/:id/performance',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  [
    body('averageRating')
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage('Average rating must be between 0 and 5'),
    
    body('responseTime')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Response time must be a positive number'),
    
    body('completionRate')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Completion rate must be between 0 and 100'),
    
    body('customerSatisfaction')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Customer satisfaction must be between 0 and 100'),
  ],
  ContractorController.updatePerformanceMetrics
);

// Service territories (contractor can manage their own, admin/manager can manage any)
router.put(
  '/:id/territories',
  AuthMiddleware.authenticate,
  idValidation,
  AuthMiddleware.authorizeContractor,
  [
    body('*.postcodes')
      .isArray({ min: 1 })
      .withMessage('At least one postcode is required'),
    
    body('*.postcodes.*')
      .matches(/^\d{4}$/)
      .withMessage('Valid 4-digit postcode is required'),
    
    body('*.radius')
      .isInt({ min: 1, max: 500 })
      .withMessage('Radius must be between 1 and 500 km'),
    
    body('*.priority')
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage('Priority must be between 1 and 10'),
    
    body('*.active')
      .optional()
      .isBoolean()
      .withMessage('Active must be a boolean'),
  ],
  ContractorController.updateServiceTerritories
);

// Admin-only contractor management
router.post(
  '/:id/verify',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  ContractorController.verify
);

router.post(
  '/:id/approve',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  ContractorController.approve
);

router.post(
  '/:id/suspend',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize([UserRole.ADMIN, UserRole.MANAGER]),
  idValidation,
  [
    body('reason')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Suspension reason must not exceed 500 characters'),
  ],
  ContractorController.suspend
);

// Rate limiting for sensitive operations
router.use(
  ['/:id/verify', '/:id/approve', '/:id/suspend'],
  AuthMiddleware.rateLimitByUser()
);

export default router;
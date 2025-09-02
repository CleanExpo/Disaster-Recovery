export interface ContractorCreateData {
  businessName: string;
  abn: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country?: string;
  };
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
  };
  services: string[];
  serviceRadius: number;
  certifications: CertificationData[];
  insuranceDetails: InsuranceData;
}

export interface ContractorUpdateData extends Partial<ContractorCreateData> {}

export interface CertificationData {
  name: string;
  issuedBy: string;
  issueDate: Date;
  expiryDate: Date;
  certificateNumber: string;
  verified: boolean;
  documentUrl?: string;
}

export interface InsuranceData {
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  expiryDate: Date;
  publicLiability: boolean;
  professionalIndemnity: boolean;
  documentUrl?: string;
}

export interface ServiceTerritoryData {
  contractorId: string;
  postcodes: string[];
  suburbs: string[];
  radius: number;
  priority: number;
  active: boolean;
}

export interface PerformanceMetrics {
  contractorId: string;
  totalJobs: number;
  completedJobs: number;
  averageRating: number;
  responseTime: number; // in minutes
  completionRate: number;
  customerSatisfaction: number;
  lastCalculated: Date;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  contractorId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  status?: string[];
  services?: string[];
  location?: {
    suburb?: string;
    state?: string;
    postcode?: string;
  };
  rating?: {
    min?: number;
    max?: number;
  };
  verified?: boolean;
}

export interface CacheOptions {
  ttl?: number;
  key?: string;
  tags?: string[];
}

export interface WebSocketEventPayload {
  type: string;
  data: any;
  timestamp: Date;
  userId?: string;
  contractorId?: string;
}

export interface EmailNotification {
  to: string[];
  subject: string;
  template: string;
  data: Record<string, any>;
  priority?: 'low' | 'normal' | 'high';
}

export interface AuditLog {
  action: string;
  resource: string;
  resourceId: string;
  userId?: string;
  changes?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export enum ContractorStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED'
}

export enum ServiceCategory {
  WATER_DAMAGE = 'WATER_DAMAGE',
  FIRE_DAMAGE = 'FIRE_DAMAGE',
  MOULD_REMEDIATION = 'MOULD_REMEDIATION',
  STORM_DAMAGE = 'STORM_DAMAGE',
  FLOOD_RECOVERY = 'FLOOD_RECOVERY',
  SEWAGE_CLEANUP = 'SEWAGE_CLEANUP',
  BIOHAZARD_CLEANING = 'BIOHAZARD_CLEANING',
  TRAUMA_SCENE_CLEANING = 'TRAUMA_SCENE_CLEANING',
  VANDALISM_REPAIR = 'VANDALISM_REPAIR',
  EMERGENCY_BOARD_UP = 'EMERGENCY_BOARD_UP'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CONTRACTOR = 'CONTRACTOR',
  SUPPORT = 'SUPPORT'
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}
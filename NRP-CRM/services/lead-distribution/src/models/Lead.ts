import { Schema, model, Document } from 'mongoose';

// Enums for better type safety
export enum MembershipTier {
  FOUNDATION = 'foundation',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  FRANCHISE = 'franchise'
}

export enum LeadStatus {
  PENDING = 'pending',
  DISTRIBUTED = 'distributed',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum LeadPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  EMERGENCY = 'emergency'
}

export enum ServiceType {
  WATER_DAMAGE = 'water_damage',
  FIRE_DAMAGE = 'fire_damage',
  MOULD_REMEDIATION = 'mould_remediation',
  STORM_DAMAGE = 'storm_damage',
  FLOOD_RECOVERY = 'flood_recovery',
  SEWAGE_CLEANUP = 'sewage_cleanup',
  BIOHAZARD_CLEANING = 'biohazard_cleaning',
  TRAUMA_SCENE_CLEANING = 'trauma_scene_cleaning',
  VANDALISM_REPAIR = 'vandalism_repair',
  EMERGENCY_BOARD_UP = 'emergency_board_up',
  ASBESTOS_REMOVAL = 'asbestos_removal',
  CARPET_CLEANING = 'carpet_cleaning'
}

export enum PropertyType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  INSTITUTIONAL = 'institutional'
}

// Location interface for geographic data
export interface Location {
  address: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Client information
export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  preferredContactMethod: 'phone' | 'email' | 'sms';
  insuranceCompany?: string;
  claimNumber?: string;
}

// Contractor information for assignment tracking
export interface ContractorInfo {
  contractorId: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: MembershipTier;
  rating: number;
  responseTime: number; // Average response time in minutes
  completionRate: number; // Percentage of completed jobs
  currentWorkload: number; // Number of active jobs
  serviceRadius: number; // Service radius in kilometers
  specializations: ServiceType[];
  location: Location;
  lastActive: Date;
  isAvailable: boolean;
}

// Distribution tracking
export interface DistributionAttempt {
  contractorId: string;
  sentAt: Date;
  response?: 'accepted' | 'declined';
  responseAt?: Date;
  declineReason?: string;
  priorityScore: number;
  distance: number; // Distance in kilometers
}

// Lead interface
export interface ILead extends Document {
  // Basic lead information
  leadId: string;
  title: string;
  description: string;
  serviceType: ServiceType[];
  priority: LeadPriority;
  status: LeadStatus;
  
  // Property and location details
  propertyType: PropertyType;
  location: Location;
  propertySize?: number; // Square meters
  accessNotes?: string;
  
  // Client information
  client: ClientInfo;
  
  // Financial details
  estimatedValue: number;
  budget?: {
    min: number;
    max: number;
  };
  
  // Timing requirements
  requiredBy?: Date;
  preferredStartDate?: Date;
  isEmergency: boolean;
  availableHours?: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
  
  // Distribution tracking
  distributionAttempts: DistributionAttempt[];
  assignedContractor?: ContractorInfo;
  maxDistributionRadius: number; // Maximum radius for contractor search
  distributionStartedAt?: Date;
  distributionExpiresAt?: Date;
  autoExpiry: boolean;
  expiryMinutes: number; // Minutes until lead expires
  
  // Images and attachments
  images?: string[]; // URLs to uploaded images
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
  
  // Metadata
  source: string; // 'website', 'api', 'phone', 'referral'
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // User ID who created the lead
  
  // Analytics and tracking
  viewCount: number;
  distributionCount: number;
  
  // Additional requirements
  specialRequirements?: string[];
  hazardWarnings?: string[];
  equipmentRequired?: string[];
}

// Mongoose schema
const LeadSchema = new Schema<ILead>({
  leadId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  title: { 
    type: String, 
    required: true,
    maxlength: 200 
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 2000 
  },
  serviceType: [{ 
    type: String, 
    enum: Object.values(ServiceType),
    required: true 
  }],
  priority: { 
    type: String, 
    enum: Object.values(LeadPriority),
    default: LeadPriority.MEDIUM,
    index: true 
  },
  status: { 
    type: String, 
    enum: Object.values(LeadStatus),
    default: LeadStatus.PENDING,
    index: true 
  },
  
  propertyType: { 
    type: String, 
    enum: Object.values(PropertyType),
    required: true 
  },
  location: {
    address: { type: String, required: true },
    suburb: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, default: 'Australia' },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  propertySize: Number,
  accessNotes: String,
  
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: String,
    preferredContactMethod: { 
      type: String, 
      enum: ['phone', 'email', 'sms'],
      default: 'phone' 
    },
    insuranceCompany: String,
    claimNumber: String
  },
  
  estimatedValue: { 
    type: Number, 
    required: true,
    min: 0 
  },
  budget: {
    min: { type: Number, min: 0 },
    max: { type: Number, min: 0 }
  },
  
  requiredBy: Date,
  preferredStartDate: Date,
  isEmergency: { 
    type: Boolean, 
    default: false,
    index: true 
  },
  availableHours: {
    start: String,
    end: String
  },
  
  distributionAttempts: [{
    contractorId: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    response: { type: String, enum: ['accepted', 'declined'] },
    responseAt: Date,
    declineReason: String,
    priorityScore: { type: Number, required: true },
    distance: { type: Number, required: true }
  }],
  assignedContractor: {
    contractorId: String,
    name: String,
    email: String,
    phone: String,
    membershipTier: { type: String, enum: Object.values(MembershipTier) },
    rating: Number,
    responseTime: Number,
    completionRate: Number,
    currentWorkload: Number,
    serviceRadius: Number,
    specializations: [{ type: String, enum: Object.values(ServiceType) }],
    location: {
      address: String,
      suburb: String,
      city: String,
      state: String,
      postcode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    lastActive: Date,
    isAvailable: Boolean
  },
  
  maxDistributionRadius: { 
    type: Number, 
    default: 50,
    min: 1,
    max: 500 
  },
  distributionStartedAt: Date,
  distributionExpiresAt: Date,
  autoExpiry: { 
    type: Boolean, 
    default: true 
  },
  expiryMinutes: { 
    type: Number, 
    default: 60,
    min: 5,
    max: 1440 // 24 hours max
  },
  
  images: [String],
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String
  }],
  
  source: { 
    type: String, 
    required: true,
    index: true 
  },
  createdBy: String,
  viewCount: { 
    type: Number, 
    default: 0 
  },
  distributionCount: { 
    type: Number, 
    default: 0 
  },
  
  specialRequirements: [String],
  hazardWarnings: [String],
  equipmentRequired: [String]
}, {
  timestamps: true,
  collection: 'leads'
});

// Indexes for better query performance
LeadSchema.index({ 'location.coordinates': '2dsphere' });
LeadSchema.index({ status: 1, priority: 1 });
LeadSchema.index({ serviceType: 1 });
LeadSchema.index({ createdAt: 1 });
LeadSchema.index({ distributionExpiresAt: 1 });
LeadSchema.index({ estimatedValue: 1 });
LeadSchema.index({ isEmergency: 1, createdAt: 1 });

// Virtual for formatted location
LeadSchema.virtual('formattedLocation').get(function() {
  return `${this.location.address}, ${this.location.suburb}, ${this.location.city}, ${this.location.state} ${this.location.postcode}`;
});

// Virtual for distribution status
LeadSchema.virtual('distributionStatus').get(function() {
  if (!this.distributionStartedAt) return 'not_started';
  if (this.status === LeadStatus.ACCEPTED) return 'accepted';
  if (this.status === LeadStatus.EXPIRED) return 'expired';
  if (this.distributionExpiresAt && new Date() > this.distributionExpiresAt) return 'expired';
  return 'active';
});

// Pre-save middleware
LeadSchema.pre('save', function(next) {
  // Set distribution expiry if not set
  if (this.autoExpiry && this.distributionStartedAt && !this.distributionExpiresAt) {
    this.distributionExpiresAt = new Date(
      this.distributionStartedAt.getTime() + (this.expiryMinutes * 60 * 1000)
    );
  }
  
  // Update distribution count
  if (this.isModified('distributionAttempts')) {
    this.distributionCount = this.distributionAttempts.length;
  }
  
  next();
});

// Instance methods
LeadSchema.methods.isExpired = function(): boolean {
  if (!this.distributionExpiresAt) return false;
  return new Date() > this.distributionExpiresAt;
};

LeadSchema.methods.canDistribute = function(): boolean {
  return this.status === LeadStatus.PENDING && !this.isExpired();
};

LeadSchema.methods.getEligibleContractors = function(contractors: ContractorInfo[]): ContractorInfo[] {
  return contractors.filter(contractor => 
    contractor.isAvailable &&
    contractor.specializations.some(spec => this.serviceType.includes(spec)) &&
    !this.distributionAttempts.some(attempt => attempt.contractorId === contractor.contractorId)
  );
};

export const Lead = model<ILead>('Lead', LeadSchema);
export default Lead;
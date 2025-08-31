// NRP Contractor CRM Type Definitions

export interface ContractorOnboardingData {
  // Step 1: Account Creation
  email: string;
  username: string;
  mobileNumber: string;
  companyName: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;

  // Step 2: Company Profile
  company: {
    tradingName?: string;
    abn: string;
    acn?: string;
    companyStructure: CompanyStructure;
    registeredAddress: Address;
    mailingAddress?: Address;
    directors: Director[];
    officePhone?: string;
    website?: string;
    companyLogo?: File;
  };

  // Step 3: Insurance
  insurance: InsurancePolicy[];

  // Step 4: Certifications
  certifications: Certification[];

  // Step 5: Background & References
  backgroundCheck: {
    consentGiven: boolean;
    identificationDocument: File;
    references: Reference[];
    projectSummary?: File;
  };

  // Step 6: Subscription & Territory
  subscription: {
    tier: SubscriptionTier;
    territories: Territory[];
    billingDetails: BillingDetails;
    bondAccepted: boolean;
  };

  // Step 7: Agreements
  agreements: {
    partnershipAgreement: boolean;
    codeOfConduct: boolean;
    whsCompliance: boolean;
    dutyOfCare: boolean;
    ongoingMonitoring: boolean;
  };
}

export enum CompanyStructure {
  SOLE_TRADER = 'SOLE_TRADER',
  PARTNERSHIP = 'PARTNERSHIP',
  PTY_LTD = 'PTY_LTD',
  TRUST = 'TRUST'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country?: string;
}

export interface Director {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  
  directorId?: string;
}

export interface InsurancePolicy {
  type: InsuranceType;
  insurer: string;
  policyNumber: string;
  coverageAmount: number;
  excess?: number;
  effectiveDate: Date;
  expiryDate: Date;
  certificateOfCurrency: File;
}

export enum InsuranceType {
  PUBLIC_LIABILITY = 'PUBLIC_LIABILITY',
  PROFESSIONAL_INDEMNITY = 'PROFESSIONAL_INDEMNITY',
  WORKERS_COMP = 'WORKERS_COMP'
}

export interface Certification {
  type: CertificationType;
  name: string;
  number: string;
  issuingOrganisation: string;
  issueDate: Date;
  expiryDate?: Date;
  document: File;
}

export enum CertificationType {
  CPP40421 = 'CPP40421',
  IICRC_WRT = 'IICRC_WRT',
  IICRC_ASD = 'IICRC_ASD',
  IICRC_AMRT = 'IICRC_AMRT',
  IICRC_HST = 'IICRC_HST',
  RIA_MEMBER = 'RIA_MEMBER',
  IAQAA_MEMBER = 'IAQAA_MEMBER',
  CARSI_CERTIFIED = 'CARSI_CERTIFIED',
  OTHER = 'OTHER'
}

export interface Reference {
  name: string;
  companyName: string;
  position: string;
  email: string;
  
  relationship: ReferenceRelationship;
  projectDescription?: string;
}

export enum ReferenceRelationship {
  CLIENT = 'CLIENT',
  SUPPLIER = 'SUPPLIER',
  PARTNER = 'PARTNER',
  OTHER = 'OTHER'
}

export enum SubscriptionTier {
  TIER_25KM = 'TIER_25KM',
  TIER_50KM = 'TIER_50KM',
  TIER_75KM = 'TIER_75KM',
  TIER_100KM = 'TIER_100KM',
  RURAL = 'RURAL'
}

export interface Territory {
  type: TerritoryType;
  name: string;
  centerPoint?: {
    lat: number;
    lng: number;
  };
  radiusKm?: number;
  postcodes?: string[];
  suburbs?: string[];
  emergencyResponse: boolean;
  afterHours: boolean;
  weekendService: boolean;
  maxJobsPerDay: number;
}

export enum TerritoryType {
  RADIUS = 'RADIUS',
  POSTCODE = 'POSTCODE',
  SUBURB = 'SUBURB',
  LGA = 'LGA',
  STATE = 'STATE'
}

export interface BillingDetails {
  method: PaymentMethod;
  frequency: BillingFrequency;
  accountName?: string;
  bsb?: string;
  accountNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export enum PaymentMethod {
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  CREDIT_CARD = 'CREDIT_CARD'
}

export enum BillingFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL'
}

// Status Enums
export enum ContractorStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED'
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED'
}

export enum BackgroundCheckType {
  CRIMINAL = 'CRIMINAL',
  CREDIT = 'CREDIT',
  IDENTITY = 'IDENTITY',
  QUALIFICATION = 'QUALIFICATION'
}

export enum BackgroundCheckStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum BackgroundCheckResult {
  CLEAR = 'CLEAR',
  FLAGGED = 'FLAGGED',
  REQUIRES_REVIEW = 'REQUIRES_REVIEW'
}

// Dashboard Types
export interface ContractorDashboard {
  profile: ContractorProfile;
  kpi: ContractorKPIMetrics;
  subscription: ContractorSubscriptionInfo;
  notifications: ContractorNotification[];
  compliance: ComplianceStatus;
  training: TrainingProgress[];
  support: SupportTicketSummary;
}

export interface ContractorProfile {
  id: string;
  username: string;
  email: string;
  companyName: string;
  status: ContractorStatus;
  approvedAt?: Date;
  territories: Territory[];
  certifications: CertificationSummary[];
  insurance: InsuranceSummary[];
}

export interface ContractorKPIMetrics {
  period: string;
  totalJobs: number;
  completedJobs: number;
  averageResponseTime: number;
  averageCompletionTime: number;
  customerSatisfaction: number;
  qualityScore: number;
  complianceScore: number;
  cleanClaimsScore?: number;
  carsiCompliance?: number;
}

export interface ContractorSubscriptionInfo {
  tier: SubscriptionTier;
  status: string;
  nextBillingDate?: Date;
  amount: number;
  bondStatus: string;
  creditLimit: number;
  accountBalance: number;
}

export interface ContractorNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  subject: string;
  message: string;
  actionRequired: boolean;
  actionUrl?: string;
  actionDeadline?: Date;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  COMPLIANCE = 'COMPLIANCE',
  EXPIRY = 'EXPIRY',
  PAYMENT = 'PAYMENT',
  JOB = 'JOB',
  TRAINING = 'TRAINING'
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface ComplianceStatus {
  overallStatus: 'COMPLIANT' | 'ACTION_REQUIRED' | 'NON_COMPLIANT';
  items: ComplianceItem[];
}

export interface ComplianceItem {
  type: string;
  name: string;
  status: 'VALID' | 'EXPIRING' | 'EXPIRED';
  expiryDate?: Date;
  daysUntilExpiry?: number;
  actionRequired?: string;
}

export interface TrainingProgress {
  id: string;
  name: string;
  provider: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  ceuPoints?: number;
  validUntil?: Date;
}

export interface SupportTicketSummary {
  open: number;
  inProgress: number;
  resolved: number;
  recentTickets: SupportTicket[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CertificationSummary {
  type: string;
  name: string;
  expiryDate?: Date;
  status: DocumentStatus;
}

export interface InsuranceSummary {
  type: InsuranceType;
  insurer: string;
  coverageAmount: number;
  expiryDate: Date;
  status: DocumentStatus;
}

// Admin Types
export interface ContractorApplication {
  id: string;
  contractor: ContractorProfile;
  submittedAt: Date;
  currentStep: number;
  completedSteps: number[];
  score?: ApplicationScore;
  reviewNotes?: string;
  reviewer?: string;
  reviewedAt?: Date;
}

export interface ApplicationScore {
  total: number;
  certifications: number;
  insurance: number;
  experience: number;
  references: number;
  backgroundCheck: number;
  territoryConflict: boolean;
  recommendations: string[];
}

// API Response Types
export interface ContractorApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Validation Schemas (using Zod)
export const contractorValidationSchemas = {
  step1: {
    email: 'required|email',
    username: 'required|min:3|max:50|unique',
    mobileNumber: 'required|email',
    companyName: 'required|min:2|max:100',
    acceptedTerms: 'required|boolean:true',
    acceptedPrivacy: 'required|boolean:true'
  },
  step2: {
    abn: 'required|abn',
    companyStructure: 'required|enum:CompanyStructure',
    registeredAddress: 'required|object',
    directors: 'required|array|min:1'
  },
  // ... continue for other steps
};
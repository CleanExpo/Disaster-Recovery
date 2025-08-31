export interface Technician {
  id: string;
  cleanClaimsId?: string;
  name: string;
  profileImage?: string;
  contactNumber?: string;
  email?: string;
  certifications: Certification[];
  specialtyFlags: SpecialtyFlag[];
  companyAffiliation: CompanyInfo;
  status: TechnicianStatus;
  syncStatus: SyncStatus;
  lastSyncedAt?: string;
  metadata: TechnicianMetadata;
}

export interface Certification {
  id: string;
  code: string; // IICRC code
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate?: string;
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  documentUrl?: string;
}

export type VerificationStatus = 
  | 'pending'
  | 'verified'
  | 'expired'
  | 'invalid'
  | 'manual_review';

export interface SpecialtyFlag {
  type: SpecialtyType;
  label: string;
  priority: number;
}

export type SpecialtyType = 
  | 'senior_technician'
  | 'specialist'
  | 'team_lead'
  | 'expert'
  | 'trainer'
  | 'supervisor';

export interface CompanyInfo {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  contactEmail: string;
  contactOnline Form: string;
  address: Address;
}

export interface Address {
  street?: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export type TechnicianStatus = 
  | 'active'
  | 'inactive'
  | 'on_leave'
  | 'training'
  | 'terminated';

export interface SyncStatus {
  status: 'synced' | 'pending' | 'error' | 'out_of_sync';
  lastAttempt?: string;
  lastSuccess?: string;
  errorMessage?: string;
  retryCount: number;
}

export interface TechnicianMetadata {
  bio?: string;
  yearsExperience?: number;
  languages?: string[];
  specializations?: string[];
  rating?: number;
  completedJobs?: number;
  preferredRegions?: string[];
}

export interface JobAssignment {
  id: string;
  jobId: string;
  cleanClaimsJobId?: string;
  technicianId: string;
  role: AssignmentRole;
  startDate: string;
  endDate?: string;
  status: AssignmentStatus;
  seniorSupport?: SeniorSupport;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AssignmentRole = 
  | 'lead_technician'
  | 'technician'
  | 'specialist'
  | 'supervisor'
  | 'support';

export type AssignmentStatus = 
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'reassigned';

export interface SeniorSupport {
  technicianId: string;
  name: string;
  contactMethod: ContactMethod;
  availability: string;
  escalationPriority: number;
}

export type ContactMethod = 
  | 'email'
  | 'email'
  | 'sms'
  | 'app_message'
  | 'video_call';

export interface ClientCommunication {
  id: string;
  jobId: string;
  clientId: string;
  type: CommunicationType;
  status: CommunicationStatus;
  scheduledFor?: string;
  sentAt?: string;
  openedAt?: string;
  content: CommunicationContent;
  attachments?: Attachment[];
  tracking: CommunicationTracking;
}

export type CommunicationType = 
  | 'pre_visit_introduction'
  | 'service_description'
  | 'digital_contract'
  | 'portal_invitation'
  | 'progress_update'
  | 'completion_notice'
  | 'feedback_request';

export type CommunicationStatus = 
  | 'draft'
  | 'scheduled'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'bounced'
  | 'failed';

export interface CommunicationContent {
  subject: string;
  body: string;
  template?: string;
  personalization?: Record<string, any>;
  technicianProfiles?: TechnicianProfile[];
  serviceDetails?: ServiceDetail[];
  slaDocument?: Document;
}

export interface TechnicianProfile {
  technicianId: string;
  name: string;
  photo?: string;
  credentials: string[];
  bio?: string;
  role: string;
  isExpertBackup: boolean;
}

export interface ServiceDetail {
  serviceType: string;
  description: string;
  expectedDuration: string;
  requirements?: string[];
  reminders?: string[];
}

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url?: string;
  content?: string;
  version: string;
  customizedFor?: string;
  expiresAt?: string;
}

export type DocumentType = 
  | 'sla'
  | 'contract'
  | 'privacy_policy'
  | 'compliance'
  | 'invoice'
  | 'quote'
  | 'report';

export interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface CommunicationTracking {
  emailId?: string;
  opens: number;
  clicks: number;
  bounces: number;
  unsubscribes: number;
  events: TrackingEvent[];
}

export interface TrackingEvent {
  type: 'open' | 'click' | 'bounce' | 'unsubscribe';
  timestamp: string;
  details?: Record<string, any>;
}

export interface ClientPortal {
  id: string;
  jobId: string;
  clientId: string;
  accessToken: string;
  portalUrl: string;
  status: PortalStatus;
  features: PortalFeature[];
  accessLog: AccessLog[];
  contributions: ClientContribution[];
  settings: PortalSettings;
}

export type PortalStatus = 
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'expired'
  | 'archived';

export interface PortalFeature {
  name: FeatureName;
  enabled: boolean;
  permissions: Permission[];
}

export type FeatureName = 
  | 'view_progress'
  | 'upload_media'
  | 'add_comments'
  | 'view_documents'
  | 'approve_work'
  | 'request_changes'
  | 'view_invoices'
  | 'make_payments';

export interface Permission {
  action: string;
  resource: string;
  conditions?: Record<string, any>;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  action: string;
  details?: Record<string, any>;
}

export interface ClientContribution {
  id: string;
  type: ContributionType;
  content?: string;
  mediaFiles?: MediaFile[];
  timestamp: string;
  status: ContributionStatus;
  moderationStatus?: ModerationStatus;
  responses?: ContributionResponse[];
}

export type ContributionType = 
  | 'photo'
  | 'video'
  | 'comment'
  | 'feedback'
  | 'damage_report'
  | 'additional_info';

export type ContributionStatus = 
  | 'submitted'
  | 'processing'
  | 'accepted'
  | 'rejected'
  | 'archived';

export type ModerationStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'flagged';

export interface MediaFile {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  metadata?: MediaMetadata;
  uploadedAt: string;
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number; // for videos
  location?: {
    lat: number;
    lng: number;
  };
  timestamp?: string;
  description?: string;
}

export interface ContributionResponse {
  id: string;
  responderId: string;
  responderName: string;
  responderRole: string;
  message: string;
  timestamp: string;
}

export interface PortalSettings {
  theme?: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  branding?: BrandingSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  types: string[];
}

export interface PrivacySettings {
  shareOnline Form: boolean;
  shareAddress: boolean;
  shareEmail: boolean;
  allowPhotos: boolean;
  dataRetentionDays: number;
}

export interface BrandingSettings {
  primaryColor?: string;
  logo?: string;
  companyName?: string;
  supportEmail?: string;
  supportPhone?: string;
}

export interface AccountingIntegration {
  id: string;
  provider: AccountingProvider;
  status: IntegrationStatus;
  credentials?: IntegrationCredentials;
  syncSettings: SyncSettings;
  lastSync?: SyncResult;
  mappings: FieldMapping[];
}

export type AccountingProvider = 
  | 'xero'
  | 'quickbooks'
  | 'myob'
  | 'sage'
  | 'wave'
  | 'custom';

export type IntegrationStatus = 
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'pending_auth'
  | 'rate_limited';

export interface IntegrationCredentials {
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  tenantId?: string;
  expiresAt?: string;
}

export interface SyncSettings {
  autoSync: boolean;
  syncFrequency: SyncFrequency;
  syncDirection: 'one_way' | 'two_way';
  itemsToSync: SyncItem[];
  conflictResolution: ConflictResolution;
}

export type SyncFrequency = 
  | 'realtime'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'manual';

export interface SyncItem {
  type: 'invoice' | 'payment' | 'credit' | 'expense' | 'customer';
  enabled: boolean;
  lastSyncedAt?: string;
}

export type ConflictResolution = 
  | 'crm_wins'
  | 'accounting_wins'
  | 'newest_wins'
  | 'manual_review';

export interface FieldMapping {
  crmField: string;
  accountingField: string;
  transformation?: string;
  defaultValue?: any;
}

export interface SyncResult {
  timestamp: string;
  status: 'success' | 'partial' | 'failed';
  itemsSynced: number;
  itemsFailed: number;
  errors?: SyncError[];
  duration: number;
}

export interface SyncError {
  item: string;
  error: string;
  timestamp: string;
  retryable: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  jobId: string;
  clientId: string;
  accountingSystemId?: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  paymentTerms: string;
  notes?: string;
  attachments?: Document[];
}

export type InvoiceStatus = 
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  tax?: number;
  discount?: number;
  total: number;
  category?: string;
  jobPhase?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  processedAt?: string;
  reconciled: boolean;
  accountingSystemId?: string;
  fees?: number;
  netAmount?: number;
}

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'cash'
  | 'check'
  | 'insurance'
  | 'other';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'disputed';

export interface CleanClaimsAPI {
  baseUrl: string;
  version: string;
  authentication: APIAuthentication;
  endpoints: APIEndpoint[];
  rateLimits: RateLimit[];
  webhooks?: Webhook[];
}

export interface APIAuthentication {
  type: 'api_key' | 'oauth2' | 'jwt';
  credentials: Record<string, string>;
  expiresAt?: string;
}

export interface APIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters?: EndpointParameter[];
  response?: ResponseSchema;
  rateLimit?: string;
}

export interface EndpointParameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: any;
}

export interface ResponseSchema {
  success: Record<string, any>;
  error: Record<string, any>;
}

export interface RateLimit {
  endpoint: string;
  limit: number;
  window: number; // in seconds
  currentUsage?: number;
  resetsAt?: string;
}

export interface Webhook {
  id: string;
  event: string;
  url: string;
  secret?: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface SecuritySettings {
  encryptionEnabled: boolean;
  encryptionMethod?: string;
  apiKeyRotation: boolean;
  rotationFrequency?: number; // days
  ipWhitelist?: string[];
  auditLogging: boolean;
  dataRetention: DataRetention;
  privacyCompliance: PrivacyCompliance;
}

export interface DataRetention {
  clientData: number; // days
  technicianData: number;
  jobData: number;
  communicationLogs: number;
  financialRecords: number;
}

export interface PrivacyCompliance {
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  dataProcessingAgreement?: string;
  privacyPolicyUrl?: string;
  consentManagement: boolean;
}
export interface Document {
  id: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  category: DocumentCategory;
  tags: string[];
  uploadedBy: string;
  uploadedAt: string;
  lastModifiedAt: string;
  version: number;
  status: DocumentStatus;
  expiryDate?: string;
  isRequired: boolean;
  accessLevel: AccessLevel;
  downloadCount: number;
  checksum: string;
  storageUrl: string;
  thumbnailUrl?: string;
  metadata: DocumentMetadata;
}

export type DocumentCategory = 
  | 'onboarding'
  | 'compliance'
  | 'insurance'
  | 'certification'
  | 'contract'
  | 'project'
  | 'training'
  | 'policy'
  | 'template'
  | 'other';

export type DocumentStatus = 
  | 'active'
  | 'expired'
  | 'expiring_soon'
  | 'pending_signature'
  | 'signed'
  | 'archived'
  | 'rejected'
  | 'draft';

export type AccessLevel = 
  | 'public'
  | 'contractor_only'
  | 'admin_only'
  | 'auditor_access'
  | 'restricted'
  | 'confidential';

export interface DocumentMetadata {
  contractorId?: string;
  projectId?: string;
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  signatureRequired: boolean;
  signatureStatus?: SignatureStatus;
  relatedDocuments: string[];
  customFields: Record<string, any>;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  changeLog: string;
  storageUrl: string;
  checksum: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  parentId?: string;
  path: string;
  accessLevel: AccessLevel;
  createdBy: string;
  createdAt: string;
  documentCount: number;
  subfolders: DocumentFolder[];
}

export interface eSignatureRequest {
  id: string;
  documentId: string;
  title: string;
  description: string;
  requesterUserId: string;
  status: SignatureStatus;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  signers: DocumentSigner[];
  emailTemplate: string;
  reminderSettings: ReminderSettings;
  auditTrail: SignatureAuditEntry[];
  settings: eSignatureSettings;
}

export type SignatureStatus = 
  | 'draft'
  | 'sent'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'expired'
  | 'declined';

export interface DocumentSigner {
  id: string;
  name: string;
  email: string;
  role: string;
  order: number;
  status: SignerStatus;
  signedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  signature: SignatureData;
  fields: SignatureField[];
}

export type SignerStatus = 
  | 'pending'
  | 'sent'
  | 'opened'
  | 'signed'
  | 'declined'
  | 'bounced';

export interface SignatureData {
  type: 'drawn' | 'typed' | 'uploaded';
  data: string;
  timestamp: string;
  certificate: string;
}

export interface SignatureField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  position: {
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  value?: string;
  options?: string[];
}

export type FieldType = 
  | 'signature'
  | 'initial'
  | 'date'
  | 'text'
  | 'checkbox'
  | 'radio'
  | 'dropdown';

export interface eSignatureSettings {
  requireAuth: boolean;
  allowDelegation: boolean;
  sequentialSigning: boolean;
  reminderFrequency: number;
  expirationDays: number;
  passwordProtected: boolean;
  downloadRestrictions: boolean;
}

export interface ReminderSettings {
  enabled: boolean;
  firstReminderDays: number;
  subsequentReminderDays: number;
  maxReminders: number;
  customMessage?: string;
}

export interface SignatureAuditEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  userId: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export type AuditAction = 
  | 'created'
  | 'sent'
  | 'opened'
  | 'signed'
  | 'declined'
  | 'cancelled'
  | 'reminded'
  | 'downloaded'
  | 'viewed'
  | 'delegated';

export interface DocumentShare {
  id: string;
  documentId: string;
  sharedBy: string;
  sharedWith: string[];
  shareType: ShareType;
  permissions: SharePermissions;
  password?: string;
  expiryDate?: string;
  downloadLimit?: number;
  downloadCount: number;
  accessLog: ShareAccessEntry[];
  createdAt: string;
  isActive: boolean;
}

export type ShareType = 
  | 'public_link'
  | 'email'
  | 'user_specific'
  | 'organisation';

export interface SharePermissions {
  canView: boolean;
  canDownload: boolean;
  canShare: boolean;
  canComment: boolean;
  canEdit: boolean;
}

export interface ShareAccessEntry {
  id: string;
  accessedBy: string;
  accessedAt: string;
  ipAddress: string;
  userAgent: string;
  action: 'viewed' | 'downloaded' | 'shared';
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
  templateType: TemplateType;
  content: string;
  fields: TemplateField[];
  settings: TemplateSettings;
  createdBy: string;
  createdAt: string;
  lastModifiedAt: string;
  version: number;
  isActive: boolean;
  usageCount: number;
}

export type TemplateType = 
  | 'contract'
  | 'agreement'
  | 'form'
  | 'certificate'
  | 'report'
  | 'invoice'
  | 'proposal';

export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: TemplateFieldType;
  required: boolean;
  defaultValue?: string;
  options?: string[];
  validation?: ValidationRule[];
  placeholder?: string;
}

export type TemplateFieldType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'date'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'signature';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'phone';
  value?: any;
  message: string;
}

export interface TemplateSettings {
  autoMergeData: boolean;
  requireSignature: boolean;
  allowEditing: boolean;
  trackUsage: boolean;
  expirationPeriod?: number;
}

export interface ComplianceStatus {
  contractorId: string;
  overallStatus: 'compliant' | 'non_compliant' | 'pending' | 'warning';
  lastUpdated: string;
  categories: ComplianceCategory[];
  upcomingExpirations: ExpirationAlert[];
  overdueDocuments: Document[];
  completionRate: number;
}

export interface ComplianceCategory {
  category: DocumentCategory;
  required: number;
  submitted: number;
  approved: number;
  expired: number;
  status: 'complete' | 'incomplete' | 'warning';
  documents: Document[];
}

export interface ExpirationAlert {
  documentId: string;
  title: string;
  category: DocumentCategory;
  expiryDate: string;
  daysUntilExpiry: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  contractorId: string;
  notificationsSent: number;
}

export interface DocumentUploadProgress {
  fileId: string;
  fileName: string;
  fileSize: number;
  uploadedBytes: number;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  estimatedTimeRemaining?: number;
}

export interface DocumentSearch {
  query: string;
  filters: SearchFilters;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface SearchFilters {
  categories?: DocumentCategory[];
  status?: DocumentStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  uploadedBy?: string[];
  tags?: string[];
  accessLevel?: AccessLevel[];
  hasExpiry?: boolean;
  isExpired?: boolean;
}

export type SortField = 
  | 'title'
  | 'uploadedAt'
  | 'lastModifiedAt'
  | 'expiryDate'
  | 'fileSize'
  | 'downloadCount';

export interface DocumentSearchResult {
  documents: Document[];
  totalCount: number;
  facets: SearchFacets;
  suggestions: string[];
}

export interface SearchFacets {
  categories: FacetCount[];
  status: FacetCount[];
  uploadedBy: FacetCount[];
  tags: FacetCount[];
}

export interface FacetCount {
  value: string;
  count: number;
}

export interface BulkOperation {
  id: string;
  type: BulkOperationType;
  documentIds: string[];
  parameters: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  progress: number;
  results: BulkOperationResult[];
  error?: string;
}

export type BulkOperationType = 
  | 'delete'
  | 'archive'
  | 'updateCategory'
  | 'updateTags'
  | 'updateAccessLevel'
  | 'sendForSignature'
  | 'share';

export interface BulkOperationResult {
  documentId: string;
  status: 'success' | 'error';
  error?: string;
}

export interface DocumentAnalytics {
  totalDocuments: number;
  storageUsed: number;
  storageLimit: number;
  categoryBreakdown: CategoryStats[];
  statusBreakdown: StatusStats[];
  uploadTrend: TrendData[];
  downloadTrend: TrendData[];
  topDownloaded: Document[];
  expirationSummary: ExpirationSummary;
  complianceMetrics: ComplianceMetrics;
}

export interface CategoryStats {
  category: DocumentCategory;
  count: number;
  storageUsed: number;
  averageSize: number;
}

export interface StatusStats {
  status: DocumentStatus;
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  count: number;
  size?: number;
}

export interface ExpirationSummary {
  expiredCount: number;
  expiringIn30Days: number;
  expiringIn90Days: number;
  upcomingExpirations: ExpirationAlert[];
}

export interface ComplianceMetrics {
  overallComplianceRate: number;
  contractorsCompliant: number;
  contractorsNonCompliant: number;
  averageCompletionTime: number;
  topComplianceIssues: string[];
}

export interface DocumentActivity {
  id: string;
  documentId: string;
  userId: string;
  action: ActivityAction;
  timestamp: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

export type ActivityAction = 
  | 'uploaded'
  | 'downloaded'
  | 'viewed'
  | 'shared'
  | 'signed'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'archived'
  | 'deleted'
  | 'restored';

export interface NotificationPreferences {
  userId: string;
  expirationReminders: boolean;
  signatureRequests: boolean;
  shareNotifications: boolean;
  complianceUpdates: boolean;
  systemAnnouncements: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface DocumentIntegration {
  id: string;
  name: string;
  type: IntegrationType;
  status: 'active' | 'inactive' | 'error';
  configuration: IntegrationConfig;
  lastSync: string;
  errorMessage?: string;
}

export type IntegrationType = 
  | 'google_drive'
  | 'dropbox'
  | 'onedrive'
  | 'box'
  | 'sharepoint'
  | 's3'
  | 'docusign'
  | 'hellosign'
  | 'adobe_sign';

export interface IntegrationConfig {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  folderMapping: Record<string, string>;
  syncSettings: SyncSettings;
}

export interface SyncSettings {
  autoSync: boolean;
  syncFrequency: number;
  conflictResolution: 'local' | 'remote' | 'manual';
  includedCategories: DocumentCategory[];
  excludedFileTypes: string[];
}
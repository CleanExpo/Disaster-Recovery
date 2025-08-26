export interface PrivacyConsent {
  id: string;
  userId: string;
  type: 'data_collection' | 'marketing' | 'third_party_sharing' | 'cookies' | 'terms_of_service' | 'privacy_policy';
  version: string;
  granted: boolean;
  grantedAt?: Date;
  revokedAt?: Date;
  ipAddress: string;
  userAgent: string;
  expiresAt?: Date;
}

export interface DataSubjectRequest {
  id: string;
  userId: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  requestedAt: Date;
  completedAt?: Date;
  description: string;
  legalBasis?: string;
  attachments?: string[];
  response?: string;
  processedBy?: string;
}

export interface DataBreach {
  id: string;
  detectedAt: Date;
  reportedAt?: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'unauthorized_access' | 'data_loss' | 'data_theft' | 'accidental_disclosure' | 'system_breach';
  affectedRecords: number;
  affectedUsers: string[];
  description: string;
  containmentMeasures: string[];
  notificationsSent: boolean;
  regulatoryReported: boolean;
  investigationStatus: 'pending' | 'ongoing' | 'completed';
  rootCause?: string;
  remediation?: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  dataAccessed?: string[];
  ipAddress: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
  sensitiveData: boolean;
  legalBasis?: string;
}

export interface PrivacyPolicy {
  version: string;
  effectiveDate: Date;
  lastUpdated: Date;
  sections: {
    title: string;
    content: string;
    required: boolean;
  }[];
  changeLog: {
    version: string;
    date: Date;
    changes: string[];
  }[];
}

export interface ComplianceRequirement {
  id: string;
  framework: 'APP' | 'GDPR' | 'CCPA' | 'ISO27001' | 'SOC2';
  requirement: string;
  description: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_applicable';
  evidence?: string[];
  lastAssessed: Date;
  nextReview: Date;
  responsibleParty: string;
  controls: string[];
}
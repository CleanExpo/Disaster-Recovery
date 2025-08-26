export interface ComplianceIndicator {
  id: string;
  name: string;
  category: ComplianceCategory;
  type: IndicatorType;
  status: ComplianceStatus;
  currentValue?: number | string | boolean;
  targetValue?: number | string | boolean;
  threshold?: {
    critical: number;
    warning: number;
    good: number;
  };
  lastChecked: string;
  nextCheckDue: string;
  frequency: CheckFrequency;
  priority: Priority;
  description: string;
  requiresEvidence: boolean;
  evidenceDocuments: string[];
  automatedCheck: boolean;
  checkScript?: string;
}

export type ComplianceCategory = 
  | 'certification'
  | 'insurance'
  | 'kpi'
  | 'background_check'
  | 'licensing'
  | 'training'
  | 'safety'
  | 'financial'
  | 'operational'
  | 'quality';

export type IndicatorType = 
  | 'document'
  | 'metric'
  | 'boolean'
  | 'date'
  | 'percentage'
  | 'count';

export type ComplianceStatus = 
  | 'compliant'
  | 'non_compliant'
  | 'warning'
  | 'pending_review'
  | 'expired'
  | 'not_applicable';

export type CheckFrequency = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'semi_annual'
  | 'annual'
  | 'on_demand';

export type Priority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

export interface Audit {
  id: string;
  title: string;
  description: string;
  type: AuditType;
  status: AuditStatus;
  contractorId?: string;
  contractorName?: string;
  auditorId: string;
  auditorName: string;
  scheduledDate?: string;
  startDate?: string;
  completedDate?: string;
  dueDate?: string;
  scope: AuditScope;
  riskLevel: RiskLevel;
  triggerReason?: string;
  checklistTemplateId: string;
  checklist: AuditChecklistItem[];
  findings: AuditFinding[];
  score?: number;
  outcome?: AuditOutcome;
  recommendations: string[];
  remediationRequired: boolean;
  remediationPlan?: RemediationPlan;
  evidenceFiles: EvidenceFile[];
  comments: AuditComment[];
  metadata: AuditMetadata;
}

export type AuditType = 
  | 'scheduled'
  | 'surprise'
  | 'incident_triggered'
  | 'risk_based'
  | 'compliance'
  | 'quality'
  | 'financial'
  | 'operational'
  | 'safety';

export type AuditStatus = 
  | 'scheduled'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'cancelled'
  | 'overdue';

export interface AuditScope {
  categories: ComplianceCategory[];
  indicators: string[];
  departments?: string[];
  locations?: string[];
  timeframe: {
    start: string;
    end: string;
  };
  includeSubcontractors: boolean;
}

export type RiskLevel = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'minimal';

export interface AuditChecklistItem {
  id: string;
  category: ComplianceCategory;
  question: string;
  description?: string;
  requiresEvidence: boolean;
  evidenceType?: string[];
  weight: number;
  response?: ChecklistResponse;
  evidence?: EvidenceFile[];
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ChecklistResponse {
  status: 'pass' | 'fail' | 'partial' | 'not_applicable' | 'pending';
  value?: any;
  comments?: string;
  timestamp: string;
  respondedBy: string;
}

export interface AuditFinding {
  id: string;
  checklistItemId?: string;
  type: FindingType;
  severity: FindingSeverity;
  title: string;
  description: string;
  impact: string;
  rootCause?: string;
  recommendation: string;
  evidence: EvidenceFile[];
  status: FindingStatus;
  assignedTo?: string;
  dueDate?: string;
  resolution?: {
    description: string;
    resolvedBy: string;
    resolvedAt: string;
    verifiedBy?: string;
    verifiedAt?: string;
  };
}

export type FindingType = 
  | 'non_compliance'
  | 'observation'
  | 'opportunity'
  | 'best_practice'
  | 'critical_issue';

export type FindingSeverity = 
  | 'critical'
  | 'major'
  | 'minor'
  | 'observation';

export type FindingStatus = 
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'verified'
  | 'closed'
  | 'deferred';

export type AuditOutcome = 
  | 'passed'
  | 'passed_with_conditions'
  | 'failed'
  | 'requires_remediation'
  | 'suspended';

export interface RemediationPlan {
  id: string;
  auditId: string;
  status: RemediationStatus;
  tasks: RemediationTask[];
  timeline: {
    startDate: string;
    targetCompletionDate: string;
    actualCompletionDate?: string;
  };
  assignedTo: string;
  approvedBy?: string;
  approvalDate?: string;
  verificationRequired: boolean;
  verificationStatus?: VerificationStatus;
}

export type RemediationStatus = 
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'verified'
  | 'closed';

export interface RemediationTask {
  id: string;
  title: string;
  description: string;
  findingId: string;
  priority: Priority;
  status: TaskStatus;
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  evidence?: EvidenceFile[];
  comments: TaskComment[];
  dependencies?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export type TaskStatus = 
  | 'pending'
  | 'in_progress'
  | 'blocked'
  | 'completed'
  | 'verified'
  | 'cancelled';

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  attachments?: string[];
}

export type VerificationStatus = 
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'requires_rework';

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  category: EvidenceCategory;
  relatedItemId: string;
  relatedItemType: 'audit' | 'finding' | 'task' | 'indicator';
  url: string;
  metadata?: Record<string, any>;
}

export type EvidenceCategory = 
  | 'document'
  | 'photo'
  | 'video'
  | 'report'
  | 'certificate'
  | 'log'
  | 'screenshot'
  | 'other';

export interface AuditComment {
  id: string;
  auditId: string;
  userId: string;
  userName: string;
  userRole: string;
  comment: string;
  timestamp: string;
  visibility: CommentVisibility;
  attachments?: string[];
  mentions?: string[];
}

export type CommentVisibility = 
  | 'public'
  | 'internal'
  | 'auditor_only'
  | 'admin_only';

export interface AuditMetadata {
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  version: number;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface AuditTrail {
  id: string;
  entityType: EntityType;
  entityId: string;
  action: AuditAction;
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
  previousValue?: any;
  newValue?: any;
  description: string;
  metadata?: Record<string, any>;
}

export type EntityType = 
  | 'compliance_indicator'
  | 'audit'
  | 'finding'
  | 'remediation_task'
  | 'evidence'
  | 'user'
  | 'contractor'
  | 'document';

export type AuditAction = 
  | 'created'
  | 'updated'
  | 'deleted'
  | 'viewed'
  | 'downloaded'
  | 'approved'
  | 'rejected'
  | 'submitted'
  | 'assigned'
  | 'completed'
  | 'verified'
  | 'commented';

export interface ComplianceReport {
  id: string;
  title: string;
  type: ReportType;
  period: ReportPeriod;
  generatedAt: string;
  generatedBy: string;
  contractors?: string[];
  metrics: ComplianceMetric[];
  summary: ReportSummary;
  details: ReportSection[];
  charts: ChartData[];
  exportFormats: ExportFormat[];
  shareableLink?: string;
  expiryDate?: string;
}

export type ReportType = 
  | 'compliance_summary'
  | 'audit_outcome'
  | 'incident_report'
  | 'trend_analysis'
  | 'executive_summary'
  | 'detailed_assessment';

export interface ReportPeriod {
  start: string;
  end: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'custom';
}

export interface ComplianceMetric {
  name: string;
  value: number | string;
  target?: number | string;
  trend: 'improving' | 'stable' | 'declining';
  changePercentage?: number;
}

export interface ReportSummary {
  overallCompliance: number;
  totalAudits: number;
  passedAudits: number;
  failedAudits: number;
  openFindings: number;
  completedRemediations: number;
  criticalIssues: number;
  recommendations: string[];
}

export interface ReportSection {
  title: string;
  content: string;
  data?: any;
  tables?: TableData[];
  charts?: ChartData[];
}

export interface TableData {
  headers: string[];
  rows: any[][];
  footer?: string[];
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut' | 'radar' | 'heatmap';
  title: string;
  data: any;
  options?: Record<string, any>;
}

export type ExportFormat = 
  | 'pdf'
  | 'excel'
  | 'csv'
  | 'json'
  | 'html';

export interface NotificationSettings {
  userId: string;
  complianceAlerts: {
    enabled: boolean;
    channels: NotificationChannel[];
    timing: NotificationTiming;
  };
  auditNotifications: {
    enabled: boolean;
    channels: NotificationChannel[];
    includeFindings: boolean;
  };
  remediationReminders: {
    enabled: boolean;
    frequency: ReminderFrequency;
    channels: NotificationChannel[];
  };
  reportDelivery: {
    enabled: boolean;
    frequency: ReportFrequency;
    recipients: string[];
    format: ExportFormat;
  };
}

export type NotificationChannel = 
  | 'email'
  | 'sms'
  | 'in_app'
  | 'push';

export interface NotificationTiming {
  daysBeforeExpiry: number[];
  timeOfDay: string;
  timezone: string;
}

export type ReminderFrequency = 
  | 'daily'
  | 'weekly'
  | 'bi_weekly'
  | 'monthly';

export type ReportFrequency = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly';

export interface RolePermissions {
  role: UserRole;
  permissions: {
    viewCompliance: boolean;
    editCompliance: boolean;
    createAudits: boolean;
    performAudits: boolean;
    viewAudits: boolean;
    approveFindings: boolean;
    createRemediations: boolean;
    verifyRemediations: boolean;
    generateReports: boolean;
    exportData: boolean;
    manageSettings: boolean;
  };
}

export type UserRole = 
  | 'admin'
  | 'auditor'
  | 'contractor'
  | 'compliance_manager'
  | 'viewer';

export interface AuditSchedule {
  id: string;
  name: string;
  description: string;
  frequency: ScheduleFrequency;
  nextRunDate: string;
  lastRunDate?: string;
  enabled: boolean;
  contractors: string[];
  auditType: AuditType;
  checklistTemplateId: string;
  assignedAuditor?: string;
  notifications: ScheduleNotification[];
  createdBy: string;
  createdAt: string;
}

export type ScheduleFrequency = 
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'semi_annual'
  | 'annual'
  | 'custom';

export interface ScheduleNotification {
  type: 'before' | 'on_day' | 'overdue';
  days: number;
  recipients: string[];
  message?: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  category: string;
  weight: number;
  threshold: number;
  currentScore?: number;
  indicators: string[];
  triggerAudit: boolean;
  lastEvaluated?: string;
}

export interface ComplianceDashboard {
  contractorId?: string;
  period: ReportPeriod;
  overallScore: number;
  status: ComplianceStatus;
  indicators: ComplianceIndicator[];
  upcomingAudits: Audit[];
  recentFindings: AuditFinding[];
  openRemediations: RemediationTask[];
  trends: TrendData[];
  riskScore: number;
  alerts: ComplianceAlert[];
}

export interface TrendData {
  date: string;
  complianceScore: number;
  auditsPassed: number;
  auditsFailed: number;
  findingsOpened: number;
  findingsClosed: number;
}

export interface ComplianceAlert {
  id: string;
  type: AlertType;
  severity: Priority;
  title: string;
  description: string;
  relatedEntity?: {
    type: EntityType;
    id: string;
    name: string;
  };
  createdAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export type AlertType = 
  | 'expiry_warning'
  | 'non_compliance'
  | 'audit_scheduled'
  | 'audit_overdue'
  | 'finding_unresolved'
  | 'remediation_overdue'
  | 'risk_threshold_exceeded';
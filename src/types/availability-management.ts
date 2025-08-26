export interface ContractorAvailability {
  id: string;
  contractorId: string;
  currentStatus: AvailabilityStatus;
  statusReason?: StatusReason;
  customReason?: string;
  estimatedReturnDate?: string;
  lastStatusChange: string;
  statusHistory: StatusHistoryEntry[];
  scheduledWindows: ScheduledAvailabilityWindow[];
  recurringSchedule: RecurringSchedule;
  blackoutDates: BlackoutDate[];
  emergencyOverride?: EmergencyOverride;
  complianceStatus: ComplianceStatus;
  pauseRequirements?: PauseRequirements;
}

export type AvailabilityStatus = 
  | 'available'
  | 'busy'
  | 'offline'
  | 'vacation'
  | 'sick_leave'
  | 'emergency'
  | 'training'
  | 'suspended'
  | 'paused';

export interface StatusReason {
  category: ReasonCategory;
  description: string;
  requiresApproval: boolean;
  maxDuration?: number; // in days
  documentationRequired?: boolean;
}

export type ReasonCategory = 
  | 'planned_vacation'
  | 'sick_leave'
  | 'family_emergency'
  | 'equipment_maintenance'
  | 'training_certification'
  | 'capacity_limit'
  | 'weather_event'
  | 'other';

export interface StatusHistoryEntry {
  id: string;
  timestamp: string;
  previousStatus: AvailabilityStatus;
  newStatus: AvailabilityStatus;
  reason?: string;
  changedBy: string;
  changeMethod: 'manual' | 'scheduled' | 'automatic' | 'admin_override';
  duration?: number; // in minutes
}

export interface ScheduledAvailabilityWindow {
  id: string;
  contractorId: string;
  startDateTime: string;
  endDateTime: string;
  status: AvailabilityStatus;
  reason: StatusReason;
  notes?: string;
  createdAt: string;
  createdBy: string;
  notificationsSent: boolean;
  approved: boolean;
  approvedBy?: string;
  approvalDate?: string;
  minimumNoticeHours: number;
}

export interface RecurringSchedule {
  id: string;
  contractorId: string;
  enabled: boolean;
  weeklySchedule: WeeklySchedule[];
  exceptions: ScheduleException[];
  timezone: string;
  lastUpdated: string;
}

export interface WeeklySchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  periods: AvailabilityPeriod[];
}

export interface AvailabilityPeriod {
  startTime: string; // HH:MM format
  endTime: string;
  status: AvailabilityStatus;
  capacity?: number; // Percentage of normal capacity
}

export interface ScheduleException {
  date: string;
  periods: AvailabilityPeriod[];
  reason: string;
}

export interface BlackoutDate {
  id: string;
  contractorId: string;
  startDate: string;
  endDate: string;
  reason: string;
  recurring: boolean;
  recurringType?: 'annual' | 'monthly';
  approved: boolean;
  approvedBy?: string;
}

export interface EmergencyOverride {
  id: string;
  activatedAt: string;
  activatedBy: string;
  reason: string;
  expectedDuration?: number; // in hours
  autoRevertAt?: string;
  previousStatus: AvailabilityStatus;
  notificationsSent: string[];
}

export interface ComplianceStatus {
  isCompliant: boolean;
  outstandingJobs: number;
  pendingDocumentation: string[];
  unResolvedIssues: ComplianceIssue[];
  lastComplianceCheck: string;
  canPause: boolean;
  blockReasons: string[];
}

export interface ComplianceIssue {
  id: string;
  type: IssueType;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  createdAt: string;
  dueDate?: string;
  resolutionRequired: boolean;
}

export type IssueType = 
  | 'incomplete_job'
  | 'missing_documentation'
  | 'quality_issue'
  | 'payment_due'
  | 'certification_expired'
  | 'training_required';

export interface PauseRequirements {
  jobsCompleted: boolean;
  documentationSubmitted: boolean;
  qualityIssuesResolved: boolean;
  paymentsSettled: boolean;
  handoverCompleted: boolean;
  checklist: PauseChecklistItem[];
}

export interface PauseChecklistItem {
  id: string;
  requirement: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt?: string;
  completedBy?: string;
  mandatory: boolean;
  category: string;
}

export interface AvailabilityRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  notifications: RuleNotification[];
  createdAt: string;
  updatedAt: string;
}

export interface RuleCondition {
  type: ConditionType;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
  timeframe?: string; // for time-based conditions
}

export type ConditionType = 
  | 'status_change'
  | 'duration_exceeded'
  | 'advance_notice'
  | 'compliance_status'
  | 'job_count'
  | 'date_range';

export interface RuleAction {
  type: ActionType;
  parameters: Record<string, any>;
  delay?: number; // in minutes
}

export type ActionType = 
  | 'reallocate_leads'
  | 'notify_admin'
  | 'block_status_change'
  | 'require_approval'
  | 'auto_approve'
  | 'send_reminder'
  | 'escalate';

export interface RuleNotification {
  recipient: NotificationRecipient;
  channel: NotificationChannel;
  template: string;
  timing: 'immediate' | 'scheduled' | 'before_change' | 'after_change';
  advanceMinutes?: number;
}

export type NotificationRecipient = 
  | 'contractor'
  | 'admin'
  | 'manager'
  | 'affected_customers'
  | 'team_members';

export type NotificationChannel = 
  | 'email'
  | 'sms'
  | 'push'
  | 'in_app'
  | 'phone';

export interface AvailabilityChangeRequest {
  id: string;
  contractorId: string;
  requestedStatus: AvailabilityStatus;
  currentStatus: AvailabilityStatus;
  startDate: string;
  endDate?: string;
  reason: StatusReason;
  notes?: string;
  submittedAt: string;
  advanceNoticeHours: number;
  meetsMinimumNotice: boolean;
  approvalStatus: ApprovalStatus;
  approvedBy?: string;
  approvalDate?: string;
  denialReason?: string;
}

export type ApprovalStatus = 
  | 'pending'
  | 'approved'
  | 'denied'
  | 'auto_approved'
  | 'cancelled';

export interface LeadReallocation {
  id: string;
  originalContractorId: string;
  newContractorId: string;
  leadId: string;
  reallocationDate: string;
  reason: string;
  method: 'automatic' | 'manual' | 'emergency';
  success: boolean;
  attemptCount: number;
  fallbackContractors: string[];
}

export interface AvailabilityNotice {
  minimumHours: number;
  emergencyExemption: boolean;
  requiresDocumentation: string[];
  maxConsecutiveDays: number;
  blackoutPeriods: DateRange[];
  penaltyWaived: boolean;
  approvalRequired: boolean;
  approvalLevels: ApprovalLevel[];
}

export interface ApprovalLevel {
  level: number;
  approverRole: string;
  conditions: string[];
  maxResponseTime: number; // in hours
  autoApproveAfter?: number; // in hours
}

export interface DateRange {
  startDate: string;
  endDate: string;
  description: string;
  restrictionLevel: 'no_changes' | 'approval_required' | 'emergency_only';
}

export interface AvailabilityMetrics {
  contractorId: string;
  period: string;
  totalAvailableHours: number;
  actualWorkingHours: number;
  utilizationRate: number;
  plannedOfflineHours: number;
  unplannedOfflineHours: number;
  emergencyOfflineHours: number;
  averageResponseTime: number;
  missedLeads: number;
  reallocatedLeads: number;
  complianceScore: number;
  reliabilityScore: number;
}

export interface AvailabilityForecast {
  date: string;
  expectedAvailableContractors: number;
  expectedCapacity: number;
  projectedDemand: number;
  capacityGap?: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  affectedAreas: string[];
}
// Notification System Types

export type NotificationType = 
  | 'compliance'
  | 'billing'
  | 'job'
  | 'system'
  | 'custom';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push';

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;
  recipientId: string;
  recipientType: 'user' | 'contractor' | 'group';
  channels: NotificationChannel[];
  status: NotificationStatus;
  statusByChannel?: Record<NotificationChannel, NotificationStatus>;
  createdAt: Date;
  scheduledFor?: Date;
  sentAt?: Date;
  readAt?: Date;
  expiresAt?: Date;
  actions?: NotificationAction[];
  metadata?: NotificationMetadata;
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'link' | 'button' | 'dismiss';
  url?: string;
  action?: string;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationMetadata {
  category?: string;
  tags?: string[];
  relatedEntityType?: string;
  relatedEntityId?: string;
  triggeredBy?: string;
  automationRuleId?: string;
  retryCount?: number;
  errorMessage?: string;
}

// Compliance Notifications
export interface ComplianceNotification extends Notification {
  type: 'compliance';
  complianceData: {
    itemType: 'certification' | 'insurance' | 'training' | 'audit';
    itemName: string;
    expiryDate: Date;
    daysUntilExpiry: number;
    complianceScore?: number;
    actionRequired: string;
  };
}

// Billing Notifications
export interface BillingNotification extends Notification {
  type: 'billing';
  billingData: {
    invoiceNumber?: string;
    amount: number;
    dueDate?: Date;
    paymentStatus: 'pending' | 'paid' | 'overdue' | 'failed';
    paymentMethod?: string;
    subscriptionTier?: string;
  };
}

// Job Notifications
export interface JobNotification extends Notification {
  type: 'job';
  jobData: {
    jobId: string;
    jobNumber: string;
    clientName: string;
    address: string;
    jobType: string;
    deadline?: Date;
    changeType?: 'new' | 'updated' | 'cancelled' | 'reassigned';
    urgency?: 'routine' | 'urgent' | 'emergency';
  };
}

// System Notifications
export interface SystemNotification extends Notification {
  type: 'system';
  systemData: {
    announcementType: 'feature' | 'maintenance' | 'outage' | 'policy' | 'security';
    affectedServices?: string[];
    startTime?: Date;
    endTime?: Date;
    actionRequired?: boolean;
  };
}

// Custom Notifications
export interface CustomNotification extends Notification {
  type: 'custom';
  customData: {
    sender: string;
    senderRole: string;
    category?: string;
    attachments?: string[];
    requiresAcknowledgment?: boolean;
    acknowledgedAt?: Date;
  };
}

// Notification Templates
export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string;
  type: NotificationType;
  channels: NotificationChannel[];
  subject?: string; // For email
  bodyTemplate: string;
  smsTemplate?: string;
  variables: string[]; // Available template variables
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Preferences
export interface NotificationPreferences {
  userId: string;
  channels: {
    in_app: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  categories: {
    compliance: NotificationChannelPreference;
    billing: NotificationChannelPreference;
    job: NotificationChannelPreference;
    system: NotificationChannelPreference;
    custom: NotificationChannelPreference;
  };
  quietHours?: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    timezone: string;
    excludeUrgent: boolean;
  };
  emailDigest?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string; // HH:MM format
    includeTypes: NotificationType[];
  };
}

export interface NotificationChannelPreference {
  enabled: boolean;
  channels: NotificationChannel[];
  priorities: NotificationPriority[];
  immediateFor?: NotificationPriority[];
}

// Notification Rules for Automation
export interface NotificationRule {
  id: string;
  name: string;
  description?: string;
  type: NotificationType;
  trigger: NotificationTrigger;
  conditions?: NotificationCondition[];
  recipients: NotificationRecipient[];
  template: string; // Template ID
  channels: NotificationChannel[];
  priority: NotificationPriority;
  schedule?: NotificationSchedule;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface NotificationTrigger {
  event: string;
  source: 'system' | 'user' | 'schedule' | 'api';
  parameters?: Record<string, any>;
}

export interface NotificationCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface NotificationRecipient {
  type: 'user' | 'role' | 'group' | 'email' | 'phone';
  value: string;
  includeConditions?: NotificationCondition[];
}

export interface NotificationSchedule {
  type: 'once' | 'recurring';
  startDate?: Date;
  endDate?: Date;
  frequency?: 'daily' | 'weekly' | 'monthly';
  interval?: number;
  daysOfWeek?: number[]; // 0-6
  dayOfMonth?: number;
  time?: string; // HH:MM format
}

// Notification History
export interface NotificationHistory {
  id: string;
  notificationId: string;
  recipientId: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  retryCount: number;
  metadata?: Record<string, any>;
}

// Notification Analytics
export interface NotificationAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalFailed: number;
  byType: Record<NotificationType, number>;
  byChannel: Record<NotificationChannel, number>;
  byPriority: Record<NotificationPriority, number>;
  averageReadTime: number; // in seconds
  topUnreadTypes: Array<{ type: NotificationType; count: number }>;
  deliveryRate: number; // percentage
  readRate: number; // percentage
}

// Notification Queue
export interface NotificationQueue {
  id: string;
  notification: Notification;
  channel: NotificationChannel;
  attempts: number;
  maxAttempts: number;
  nextAttemptAt: Date;
  priority: number; // Queue priority (lower = higher priority)
  status: 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
}

// Default notification settings by type
export const NOTIFICATION_DEFAULTS: Record<NotificationType, {
  priority: NotificationPriority;
  channels: NotificationChannel[];
  expiryHours?: number;
}> = {
  compliance: {
    priority: 'high',
    channels: ['in_app', 'email', 'sms'],
    expiryHours: 168 // 7 days
  },
  billing: {
    priority: 'high',
    channels: ['in_app', 'email'],
    expiryHours: 720 // 30 days
  },
  job: {
    priority: 'medium',
    channels: ['in_app', 'email', 'push'],
    expiryHours: 48
  },
  system: {
    priority: 'medium',
    channels: ['in_app', 'email'],
    expiryHours: 168
  },
  custom: {
    priority: 'medium',
    channels: ['in_app'],
    expiryHours: 168
  }
};

// Compliance reminder thresholds
export const COMPLIANCE_REMINDER_DAYS = [30, 7, 1];

// SMS character limits
export const SMS_CHARACTER_LIMIT = 160;

// Email rate limits
export const EMAIL_RATE_LIMITS = {
  perMinute: 10,
  perHour: 100,
  perDay: 1000
};
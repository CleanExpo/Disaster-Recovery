// User Settings & Profile Types

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  alternativePhone?: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  companyId: string;
  companyName: string;
  department?: string;
  position?: string;
  employeeId?: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  displayName: string;
  permissions: string[];
  level: 'admin' | 'manager' | 'contractor' | 'viewer';
}

// Security Settings
export interface SecuritySettings {
  userId: string;
  passwordLastChanged: Date;
  passwordExpiresAt?: Date;
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'totp' | 'sms' | 'email';
  totpSecret?: string;
  backupCodes?: string[];
  securityQuestions?: SecurityQuestion[];
  trustedDevices?: TrustedDevice[];
  loginHistory?: LoginHistory[];
  sessionTimeout: number; // in minutes
  requirePasswordChange: boolean;
  accountLocked: boolean;
  lockoutUntil?: Date;
  failedLoginAttempts: number;
}

export interface SecurityQuestion {
  id: string;
  question: string;
  answerHash: string;
  createdAt: Date;
  lastUsed?: Date;
}

export interface TrustedDevice {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  lastUsed: Date;
  addedAt: Date;
  ipAddress: string;
  userAgent: string;
}

export interface LoginHistory {
  id: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  deviceType: string;
  success: boolean;
  failureReason?: string;
}

// Notification Preferences
export interface NotificationPreferences {
  userId: string;
  email: EmailPreferences;
  sms: SMSPreferences;
  push: PushPreferences;
  inApp: InAppPreferences;
  doNotDisturb: DoNotDisturbSettings;
  digest: DigestSettings;
}

export interface EmailPreferences {
  enabled: boolean;
  marketing: boolean;
  compliance: boolean;
  system: boolean;
  billing: boolean;
  jobs: boolean;
  updates: boolean;
  newsletters: boolean;
  promotions: boolean;
}

export interface SMSPreferences {
  enabled: boolean;
  urgent: boolean;
  compliance: boolean;
  jobs: boolean;
  billing: boolean;
  verificationOnly: boolean;
}

export interface PushPreferences {
  enabled: boolean;
  desktop: boolean;
  mobile: boolean;
  jobAlerts: boolean;
  messages: boolean;
  updates: boolean;
}

export interface InAppPreferences {
  enabled: boolean;
  showBanners: boolean;
  playSound: boolean;
  showDesktopNotifications: boolean;
}

export interface DoNotDisturbSettings {
  enabled: boolean;
  schedule: DoNotDisturbSchedule[];
  overrideForUrgent: boolean;
  vacationMode: boolean;
  vacationUntil?: Date;
}

export interface DoNotDisturbSchedule {
  id: string;
  name: string;
  days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  timezone: string;
  active: boolean;
}

export interface DigestSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string; // HH:MM format
  day?: number; // For weekly (0-6) or monthly (1-31)
  includeTypes: string[];
}

// Language & Accessibility
export interface AccessibilitySettings {
  userId: string;
  language: string;
  region: string;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindMode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  textToSpeech: boolean;
  autoplayVideos: boolean;
  showCaptions: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Data & Privacy
export interface PrivacySettings {
  userId: string;
  dataSharing: DataSharingPreferences;
  consent: ConsentRecords;
  dataRetention: DataRetentionSettings;
  exportHistory: DataExportRequest[];
  deletionRequests: AccountDeletionRequest[];
}

export interface DataSharingPreferences {
  shareWithPartners: boolean;
  shareForAnalytics: boolean;
  shareForMarketing: boolean;
  anonymizeData: boolean;
  allowProfiling: boolean;
}

export interface ConsentRecords {
  privacyPolicy: ConsentRecord;
  termsOfService: ConsentRecord;
  marketingCommunications?: ConsentRecord;
  dataProcessing?: ConsentRecord;
  cookies?: ConsentRecord;
}

export interface ConsentRecord {
  version: string;
  consentedAt: Date;
  consentedFrom: string; // IP address
  withdrawnAt?: Date;
  status: 'granted' | 'withdrawn' | 'pending';
}

export interface DataRetentionSettings {
  deleteInactiveAfter: number; // days
  deleteLogsAfter: number; // days
  deleteMessagesAfter: number; // days
  autoDeleteEnabled: boolean;
}

export interface DataExportRequest {
  id: string;
  requestedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  format: 'json' | 'csv' | 'pdf';
  includeTypes: string[];
  downloadUrl?: string;
  expiresAt?: Date;
  completedAt?: Date;
}

export interface AccountDeletionRequest {
  id: string;
  requestedAt: Date;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  scheduledFor?: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
}

// Password Requirements
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  prohibitCommonPasswords: boolean;
  prohibitUserInfo: boolean;
  expiryDays?: number;
  historyCount: number; // Number of previous passwords to check
}

export interface PasswordStrength {
  score: number; // 0-4
  level: 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';
  feedback: string[];
  suggestions: string[];
  crackTime: string;
  isValid: boolean;
}

// Session Management
export interface UserSession {
  id: string;
  userId: string;
  token: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
  isActive: boolean;
}

// Avatar Upload
export interface AvatarUpload {
  file: File;
  preview: string;
  cropData?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  maxSize: number; // in bytes
  allowedTypes: string[];
}

// Activity Log
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  category: 'profile' | 'security' | 'privacy' | 'settings' | 'access';
  description: string;
  metadata?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Constants
export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  prohibitCommonPasswords: true,
  prohibitUserInfo: true,
  expiryDays: 90,
  historyCount: 5
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', region: 'US' },
  { code: 'en-AU', name: 'English', region: 'Australia' },
  { code: 'es', name: 'Español', region: 'ES' },
  { code: 'fr', name: 'Français', region: 'FR' },
  { code: 'de', name: 'Deutsch', region: 'DE' },
  { code: 'zh', name: '中文', region: 'CN' },
  { code: 'ja', name: '日本語', region: 'JP' }
];

export const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your first school?",
  "What is your favourite book?",
  "What was the make of your first car?",
  "What is the name of the street you grew up on?",
  "What was your childhood nickname?",
  "What is your father's middle name?",
  "What was your first job?"
];

export const TIMEZONES = [
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: '+11:00' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEDT)', offset: '+11:00' },
  { value: 'Australia/Brisbane', label: 'Brisbane (AEST)', offset: '+10:00' },
  { value: 'Australia/Perth', label: 'Perth (AWST)', offset: '+08:00' },
  { value: 'Australia/Adelaide', label: 'Adelaide (ACDT)', offset: '+10:30' },
  { value: 'Australia/Darwin', label: 'Darwin (ACST)', offset: '+09:30' },
  { value: 'Australia/Hobart', label: 'Hobart (AEDT)', offset: '+11:00' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZDT)', offset: '+13:00' }
];

export const DATE_FORMATS = [
  { value: 'DD/MM/YYYY', label: '31/12/2024' },
  { value: 'MM/DD/YYYY', label: '12/31/2024' },
  { value: 'YYYY-MM-DD', label: '2024-12-31' },
  { value: 'DD-MMM-YYYY', label: '31-Dec-2024' },
  { value: 'MMM DD, YYYY', label: 'Dec 31, 2024' }
];

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'auto', label: 'System', icon: 'laptop' }
];
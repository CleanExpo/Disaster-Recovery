// Mobile App Types

export interface MobileUser {
  id: string;
  email: string;
  name: string;
  role: 'contractor' | 'technician' | 'admin';
  avatar?: string;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  lastLogin: Date;
  deviceInfo: DeviceInfo;
  locationSharing: boolean;
  notificationSettings: MobileNotificationSettings;
}

export interface DeviceInfo {
  id: string;
  platform: 'ios' | 'android';
  model: string;
  osVersion: string;
  appVersion: string;
  pushToken?: string;
  biometricType?: 'faceId' | 'touchId' | 'fingerprint' | 'face';
  isTablet: boolean;
  screenSize: string;
}

export interface MobileAuthSettings {
  biometric: {
    enabled: boolean;
    type?: 'faceId' | 'touchId' | 'fingerprint' | 'face';
    lastUsed?: Date;
  };
  twoFactor: {
    enabled: boolean;
    method: 'sms' | 'totp' | 'email';
  };
  pin: {
    enabled: boolean;
    length: number;
  };
  sessionTimeout: number; // minutes
  requireAuthOnLaunch: boolean;
}

// Job Management
export interface MobileJob {
  id: string;
  jobNumber: string;
  type: 'water_damage' | 'fire_damage' | 'mould' | 'biohazard' | 'other';
  status: 'assigned' | 'in_route' | 'on_site' | 'in_progress' | 'completed';
  priority: 'routine' | 'urgent' | 'emergency';
  client: {
    name: string;
    
    email?: string;
  };
  location: JobLocation;
  scheduledDate: Date;
  estimatedDuration: number; // hours
  notes: string;
  photos: JobPhoto[];
  documents: JobDocument[];
  offlineData?: OfflineJobData;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'error';
}

export interface JobLocation {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distance?: number; // km from current location
  estimatedTravelTime?: number; // minutes
  mapUrl?: string;
}

export interface JobPhoto {
  id: string;
  uri: string;
  thumbnailUri?: string;
  caption?: string;
  category: 'before' | 'during' | 'after' | 'damage' | 'equipment';
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  syncStatus: 'synced' | 'pending' | 'failed';
  fileSize: number;
  offlineAvailable: boolean;
}

export interface JobDocument {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'other';
  uri: string;
  size: number;
  uploadedAt: Date;
  offlineAvailable: boolean;
  syncStatus: 'synced' | 'pending' | 'failed';
}

// Offline Functionality
export interface OfflineJobData {
  jobId: string;
  lastSynced: Date;
  pendingChanges: {
    status?: string;
    notes?: string;
    photos?: JobPhoto[];
    documents?: JobDocument[];
    fieldData?: Record<string, any>;
  };
  conflictResolution?: 'local' | 'remote' | 'manual';
}

export interface OfflineSyncQueue {
  id: string;
  type: 'job_update' | 'photo_upload' | 'document_upload' | 'status_change';
  data: any;
  priority: number; // 1-10, lower is higher priority
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  lastAttemptAt?: Date;
  error?: string;
}

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSync: Date;
  pendingUploads: number;
  pendingDownloads: number;
  queuedItems: OfflineSyncQueue[];
  conflicts: SyncConflict[];
}

export interface SyncConflict {
  id: string;
  type: 'job' | 'document' | 'compliance';
  localVersion: any;
  remoteVersion: any;
  detectedAt: Date;
  resolution?: 'local' | 'remote' | 'merged';
}

// Compliance Mobile
export interface MobileCompliance {
  certifications: MobileCertification[];
  insurance: MobileInsurance[];
  training: MobileTraining[];
  overallScore: number;
  expiringItems: number;
  urgentActions: ComplianceAction[];
}

export interface MobileCertification {
  id: string;
  name: string;
  type: string;
  status: 'valid' | 'expiring' | 'expired';
  expiryDate: Date;
  documentUri?: string;
  offlineAvailable: boolean;
  canRenewViaApp: boolean;
  renewalUrl?: string;
}

export interface MobileInsurance {
  id: string;
  type: string;
  provider: string;
  policyNumber: string;
  status: 'active' | 'expiring' | 'expired';
  expiryDate: Date;
  coverage: number;
  documentUri?: string;
  offlineAvailable: boolean;
}

export interface MobileTraining {
  id: string;
  courseName: string;
  provider: string;
  completedDate?: Date;
  expiryDate?: Date;
  credits: number;
  certificateUri?: string;
  status: 'completed' | 'in_progress' | 'required';
  offlineAvailable: boolean;
}

export interface ComplianceAction {
  id: string;
  type: 'renewal' | 'upload' | 'training';
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

// Notifications
export interface MobileNotification {
  id: string;
  type: 'job' | 'compliance' | 'billing' | 'system' | 'emergency';
  title: string;
  body: string;
  data?: Record<string, any>;
  receivedAt: Date;
  readAt?: Date;
  actionUrl?: string;
  priority: 'normal' | 'high' | 'urgent';
  requiresAction: boolean;
}

export interface MobileNotificationSettings {
  enabled: boolean;
  jobAlerts: boolean;
  complianceReminders: boolean;
  emergencyAlerts: boolean;
  marketingMessages: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM
    end: string; // HH:MM
  };
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// Location & Safety
export interface LocationTracking {
  enabled: boolean;
  mode: 'always' | 'while_using' | 'never';
  shareWithAdmin: boolean;
  emergencyContactsOnly: boolean;
  geofencing: {
    enabled: boolean;
    jobSites: GeofenceArea[];
  };
}

export interface GeofenceArea {
  id: string;
  jobId: string;
  centre: {
    latitude: number;
    longitude: number;
  };
  radius: number; // meters
  active: boolean;
  entryTime?: Date;
  exitTime?: Date;
}

export interface SafetyCheckIn {
  enabled: boolean;
  interval: number; // minutes
  lastCheckIn: Date;
  emergencyContacts: EmergencyContact[];
  panicButtonEnabled: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  
  relationship: string;
  isPrimary: boolean;
}

// Support & Resources
export interface MobileSupport {
  chatAvailable: boolean;
  chatUnreadCount: number;
  tickets: MobileSupportTicket[];
  faqs: MobileFAQ[];
  emergencyNumber: string;
}

export interface MobileSupportTicket {
  id: string;
  number: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  lastUpdate: Date;
  unreadMessages: number;
}

export interface MobileFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: boolean;
  offlineAvailable: boolean;
}

// Mobile App State
export interface MobileAppState {
  user: MobileUser | null;
  auth: {
    isAuthenticated: boolean;
    token?: string;
    refreshToken?: string;
    expiresAt?: Date;
  };
  jobs: {
    active: MobileJob[];
    completed: MobileJob[];
    upcoming: MobileJob[];
  };
  compliance: MobileCompliance;
  notifications: MobileNotification[];
  offline: {
    isOffline: boolean;
    syncStatus: SyncStatus;
    cachedData: CachedData;
  };
  location: {
    current?: {
      latitude: number;
      longitude: number;
      accuracy: number;
      timestamp: Date;
    };
    tracking: LocationTracking;
    safety: SafetyCheckIn;
  };
}

export interface CachedData {
  jobs: MobileJob[];
  compliance: MobileCompliance;
  documents: CachedDocument[];
  lastUpdated: Date;
  sizeInBytes: number;
}

export interface CachedDocument {
  id: string;
  name: string;
  uri: string;
  type: string;
  size: number;
  cachedAt: Date;
  expiresAt?: Date;
}

// App Configuration
export interface MobileAppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    biometric: boolean;
    offlineMode: boolean;
    locationTracking: boolean;
    cameraUpload: boolean;
    documentScanner: boolean;
    pushNotifications: boolean;
    liveChat: boolean;
    voiceNotes: boolean;
  };
  cache: {
    maxSize: number; // MB
    ttl: number; // seconds
    autoCleanup: boolean;
  };
  sync: {
    interval: number; // seconds
    wifiOnly: boolean;
    backgroundSync: boolean;
    conflictResolution: 'auto' | 'manual';
  };
  security: {
    certificatePinning: boolean;
    jailbreakDetection: boolean;
    screenshotPrevention: boolean;
    dataEncryption: boolean;
  };
}

// Mobile Analytics
export interface MobileAnalytics {
  sessionId: string;
  userId: string;
  events: AnalyticsEvent[];
  performance: {
    appLaunchTime: number;
    screenLoadTimes: Record<string, number>;
    apiResponseTimes: Record<string, number[]>;
    crashCount: number;
    errorCount: number;
  };
  usage: {
    dailyActiveTime: number; // minutes
    featuresUsed: Record<string, number>;
    jobsCompleted: number;
    photosUploaded: number;
  };
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  properties?: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

// Constants
export const PHOTO_QUALITY_OPTIONS = {
  low: { width: 800, height: 600, quality: 0.6 },
  medium: { width: 1920, height: 1080, quality: 0.8 },
  high: { width: 3840, height: 2160, quality: 0.9 },
  original: { quality: 1.0 }
};

export const OFFLINE_STORAGE_LIMITS = {
  photos: 100, // MB
  documents: 50, // MB
  jobs: 500, // count
  totalCache: 500 // MB
};

export const SYNC_PRIORITIES = {
  emergency: 1,
  jobStatus: 2,
  photos: 3,
  documents: 4,
  compliance: 5,
  training: 6
};

export const APP_PERMISSIONS = [
  'camera',
  'location',
  'storage',
  'notifications',
  'biometric',
  'contacts',
  'email'
] as const;
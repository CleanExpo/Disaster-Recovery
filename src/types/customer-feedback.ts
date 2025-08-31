// Customer Feedback & Reviews Types

export interface CustomerFeedback {
  id: string;
  jobId: string;
  contractorId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  jobType: string;
  completedDate: Date;
  submittedDate: Date;
  rating: {
    overall: number; // 1-5 stars
    quality: number;
    timeliness: number;
    communication: number;
    professionalism: number;
    value: number;
  };
  comments: {
    positive?: string;
    negative?: string;
    suggestions?: string;
    general?: string;
  };
  photos?: FeedbackPhoto[];
  status: FeedbackStatus;
  flagged: boolean;
  flagReason?: string;
  moderationNotes?: string;
  response?: ContractorResponse;
  publishedAsTestimonial: boolean;
  googleReviewSubmitted: boolean;
  googleReviewLink?: string;
  npsScore?: number; // Net Promoter Score (-100 to 100)
  tags: string[];
  metadata: {
    source: 'email' | 'sms' | 'portal' | 'manual';
    device?: string;
    location?: string;
    ipAddress?: string;
  };
}

export type FeedbackStatus = 
  | 'pending'
  | 'submitted'
  | 'reviewed'
  | 'escalated'
  | 'resolved'
  | 'archived';

export interface FeedbackPhoto {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  type: 'before' | 'after' | 'issue' | 'testimonial';
  uploadedDate: Date;
  approved: boolean;
}

export interface ContractorResponse {
  id: string;
  contractorId: string;
  respondedBy: string;
  respondedDate: Date;
  response: string;
  actionTaken?: string;
  internal: boolean; // If true, not shown to customer
}

// Google Business Profile Integration
export interface GoogleBusinessProfile {
  id: string;
  contractorId: string;
  placeId: string;
  businessName: string;
  address: string;
  
  website?: string;
  reviewsUrl: string;
  averageRating: number;
  totalReviews: number;
  lastSyncDate: Date;
  isVerified: boolean;
  status: 'active' | 'suspended' | 'pending_verification';
}

export interface GoogleReview {
  id: string;
  reviewId: string;
  contractorId: string;
  customerName: string;
  rating: number;
  text: string;
  publishedDate: Date;
  language: string;
  photos?: string[];
  response?: {
    text: string;
    publishedDate: Date;
  };
  imported: boolean;
  matchedFeedbackId?: string;
}

export interface ReviewInvitation {
  id: string;
  jobId: string;
  contractorId: string;
  customerId: string;
  customerEmail: string;
  customerPhone?: string;
  type: 'portal' | 'google' | 'both';
  status: 'pending' | 'sent' | 'clicked' | 'completed' | 'expired';
  sentDate: Date;
  reminderCount: number;
  lastReminderDate?: Date;
  clickedDate?: Date;
  completedDate?: Date;
  expiryDate: Date;
  customMessage?: string;
  trackingToken: string;
  googleReviewLink?: string;
}

// Analytics & Reporting
export interface FeedbackAnalytics {
  contractorId: string;
  period: AnalyticsPeriod;
  metrics: {
    totalFeedbacks: number;
    averageRating: number;
    ratingDistribution: RatingDistribution;
    responseRate: number; // % of jobs that received feedback
    googleReviewRate: number; // % that also left Google reviews
    npsScore: number;
    satisfactionScore: number; // CSAT
    improvementTrend: number; // % change vs previous period
  };
  categoryBreakdown: CategoryAnalytics[];
  jobTypeAnalytics: JobTypeAnalytics[];
  geographicAnalytics: GeographicAnalytics[];
  timeSeriesData: TimeSeriesData[];
  topComplaints: ComplaintAnalytics[];
  topPraises: PraiseAnalytics[];
}

export interface AnalyticsPeriod {
  start: Date;
  end: Date;
  type: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
}

export interface RatingDistribution {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

export interface CategoryAnalytics {
  category: 'quality' | 'timeliness' | 'communication' | 'professionalism' | 'value';
  averageRating: number;
  trend: number;
  feedbackCount: number;
}

export interface JobTypeAnalytics {
  jobType: string;
  count: number;
  averageRating: number;
  topIssues: string[];
  satisfactionRate: number;
}

export interface GeographicAnalytics {
  location: string;
  count: number;
  averageRating: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface TimeSeriesData {
  date: Date;
  averageRating: number;
  feedbackCount: number;
  npsScore: number;
}

export interface ComplaintAnalytics {
  issue: string;
  count: number;
  severity: 'low' | 'medium' | 'high';
  trend: number;
  commonJobTypes: string[];
}

export interface PraiseAnalytics {
  praise: string;
  count: number;
  category: string;
  commonJobTypes: string[];
}

// Testimonials & Public Display
export interface Testimonial {
  id: string;
  feedbackId: string;
  contractorId: string;
  customerName: string;
  customerTitle?: string;
  customerCompany?: string;
  customerLocation: string;
  jobType: string;
  rating: number;
  testimonialText: string;
  photos?: string[];
  publishedDate: Date;
  featured: boolean;
  approved: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  tags: string[];
  displayOrder: number;
  consentGiven: boolean;
  consentDate: Date;
  usageRights: {
    website: boolean;
    marketing: boolean;
    socialMedia: boolean;
    advertising: boolean;
  };
}

export interface TestimonialDisplay {
  id: string;
  contractorId?: string; // If null, shown on main NRP site
  testimonials: Testimonial[];
  layout: 'carousel' | 'grid' | 'list';
  filterBy?: {
    jobType?: string[];
    rating?: number;
    location?: string[];
    featured?: boolean;
  };
  sortBy: 'newest' | 'oldest' | 'rating' | 'featured' | 'random';
  maxCount?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
}

// Review Moderation
export interface ModerationQueue {
  id: string;
  feedbackId: string;
  contractorId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reason: ModerationReason;
  status: 'pending' | 'in_review' | 'resolved' | 'escalated';
  assignedTo?: string;
  createdDate: Date;
  reviewedDate?: Date;
  resolution?: string;
  escalationLevel: number;
  autoFlagged: boolean;
  customerNotified: boolean;
}

export type ModerationReason = 
  | 'low_rating'
  | 'negative_keywords'
  | 'complaint'
  | 'inappropriate_content'
  | 'spam_suspected'
  | 'escalation_request'
  | 'legal_concern'
  | 'manual_review';

export interface ModerationAction {
  id: string;
  moderationId: string;
  actionType: ActionType;
  performedBy: string;
  performedDate: Date;
  description: string;
  attachments?: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
}

export type ActionType = 
  | 'approved'
  | 'rejected'
  | 'escalated'
  | 'contacted_customer'
  | 'contacted_contractor'
  | 'requested_more_info'
  | 'resolved'
  | 'archived';

// Feedback Collection Settings
export interface FeedbackSettings {
  contractorId: string;
  collection: {
    enabled: boolean;
    autoPrompt: boolean;
    promptDelay: number; // hours after job completion
    reminderEnabled: boolean;
    reminderDelay: number; // hours after initial prompt
    maxReminders: number;
    channels: ('email' | 'sms' | 'portal')[];
  };
  googleIntegration: {
    enabled: boolean;
    businessProfileId?: string;
    autoPrompt: boolean;
    promptAfterPortalFeedback: boolean;
    customMessage?: string;
    incentive?: string;
  };
  moderation: {
    autoFlag: boolean;
    flagThreshold: number; // rating below this gets flagged
    keywords: string[]; // negative keywords for auto-flagging
    requireApproval: boolean;
  };
  testimonials: {
    enabled: boolean;
    autoPublish: boolean;
    requireConsent: boolean;
    minRating: number;
    showCustomerName: boolean;
    showCustomerLocation: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
    recipients: string[];
  };
}

// Email/SMS Templates
export interface FeedbackTemplate {
  id: string;
  contractorId?: string; // If null, system default
  type: 'feedback_request' | 'google_review_request' | 'reminder' | 'thank_you';
  channel: 'email' | 'sms';
  subject?: string; // For email only
  content: string;
  variables: TemplateVariable[];
  active: boolean;
  createdDate: Date;
  lastModified: Date;
}

export interface TemplateVariable {
  key: string;
  description: string;
  example: string;
  required: boolean;
}

// Feedback Campaign
export interface FeedbackCampaign {
  id: string;
  contractorId: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  targets: {
    jobTypes?: string[];
    locations?: string[];
    customerSegments?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
  incentive?: {
    type: 'discount' | 'gift_card' | 'donation' | 'entry';
    description: string;
    value?: number;
    conditions: string;
  };
  templates: {
    feedbackRequest: string;
    googleReviewRequest?: string;
    reminder?: string;
    thankYou?: string;
  };
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    completed: number;
    conversionRate: number;
    averageRating: number;
  };
}

// Dashboard Summary
export interface FeedbackDashboard {
  contractorId: string;
  period: AnalyticsPeriod;
  summary: {
    totalFeedbacks: number;
    averageRating: number;
    responseRate: number;
    googleReviews: number;
    pendingModeration: number;
    improvementTrend: number;
  };
  recentFeedbacks: CustomerFeedback[];
  topIssues: string[];
  topPraises: string[];
  ratingTrends: TimeSeriesData[];
  pendingActions: {
    type: 'moderate' | 'respond' | 'escalate' | 'follow_up';
    count: number;
    items: any[];
  }[];
}

// Constants
export const RATING_LABELS = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
};

export const NPS_CATEGORIES = {
  DETRACTOR: { min: 0, max: 6, label: 'Detractor' },
  PASSIVE: { min: 7, max: 8, label: 'Passive' },
  PROMOTER: { min: 9, max: 10, label: 'Promoter' }
};

export const FEEDBACK_CATEGORIES = [
  'quality',
  'timeliness',
  'communication', 
  'professionalism',
  'value'
] as const;

export const DEFAULT_NEGATIVE_KEYWORDS = [
  'terrible', 'awful', 'horrible', 'worst', 'never again',
  'scam', 'fraud', 'dishonest', 'unprofessional', 'rude',
  'damaged', 'broken', 'incomplete', 'late', 'cancelled',
  'overcharged', 'expensive', 'poor', 'bad', 'disappointed'
];

export const JOB_TYPES = [
  'water_damage',
  'fire_damage',
  'mold_remediation',
  'smoke_damage',
  'storm_damage',
  'flood_damage',
  'biohazard_cleanup',
  'contents_cleaning',
  'carpet_cleaning',
  'air_duct_cleaning',
  'reconstruction',
  'emergency_services',
  'inspection',
  'consultation',
  'other'
] as const;

export type JobType = typeof JOB_TYPES[number];
/**
 * Local SEO Types and Interfaces - NRPG Platform
 *
 * Comprehensive type definitions for local search optimization:
 * - Google Business Profile management
 * - Local citation management
 * - Backlink tracking
 * - NAP consistency
 */

// =============================================================================
// CORE TYPES
// =============================================================================

/**
 * Australian state codes for local SEO targeting
 */
export type AustralianStateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

/**
 * Service categories for local business listings
 */
export type ServiceCategory =
  | 'water_damage_restoration'
  | 'fire_damage_restoration'
  | 'mould_remediation'
  | 'biohazard_cleanup'
  | 'emergency_restoration'
  | 'storm_damage_restoration';

/**
 * GBP business categories (Google-recognized categories)
 */
export type GBPCategory =
  | 'Emergency restoration service'
  | 'Water damage restoration service'
  | 'Fire damage restoration service'
  | 'Mold removal service'
  | 'Cleaning service'
  | 'Restoration service';

// =============================================================================
// GOOGLE BUSINESS PROFILE TYPES
// =============================================================================

/**
 * GBP Location Configuration
 */
export interface GBPLocationConfig {
  /** Location ID (auto-generated or from Google) */
  id: string;

  /** Business name with location suffix */
  businessName: string;

  /** City for this location */
  city: string;

  /** State code */
  stateCode: AustralianStateCode;

  /** Full address */
  address: GBPAddress;

  /** Geo coordinates */
  coordinates: GeoCoordinates;

  /** Service area radius in km */
  serviceRadius: number;

  /** Primary phone number */
  phone: string;

  /** Website URL for this location */
  websiteUrl: string;

  /** Primary business category */
  primaryCategory: GBPCategory;

  /** Additional categories */
  additionalCategories: GBPCategory[];

  /** Business description (SEO optimized) */
  description: string;

  /** Opening hours specification */
  openingHours: OpeningHoursSpec;

  /** Business attributes */
  attributes: GBPAttribute[];

  /** Photos configuration */
  photos: GBPPhotoConfig;

  /** Status of the listing */
  status: GBPLocationStatus;

  /** Created timestamp */
  createdAt: Date;

  /** Last updated timestamp */
  updatedAt: Date;
}

/**
 * GBP Address structure
 */
export interface GBPAddress {
  /** Street address line 1 */
  addressLine1: string;

  /** Street address line 2 (optional) */
  addressLine2?: string;

  /** Suburb/City */
  locality: string;

  /** State/Region */
  region: string;

  /** Postcode */
  postalCode: string;

  /** Country (always Australia for NRPG) */
  country: 'Australia';

  /** Country code */
  countryCode: 'AU';
}

/**
 * Geographic coordinates
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Opening hours specification (24/7 for emergency services)
 */
export interface OpeningHoursSpec {
  /** Days of operation */
  dayOfWeek: DayOfWeek[];

  /** Opening time (HH:MM format) */
  opens: string;

  /** Closing time (HH:MM format) */
  closes: string;

  /** Is 24/7 operation */
  is24Hours: boolean;
}

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

/**
 * GBP business attributes
 */
export interface GBPAttribute {
  /** Attribute name */
  name: string;

  /** Attribute value */
  value: string | boolean;

  /** Google attribute ID */
  attributeId?: string;
}

/**
 * GBP photo configuration
 */
export interface GBPPhotoConfig {
  /** Logo image URL */
  logo?: string;

  /** Cover image URL */
  cover?: string;

  /** Gallery photos */
  gallery: GBPPhoto[];

  /** Team photos */
  team: GBPPhoto[];

  /** Before/after project photos */
  projects: GBPPhoto[];
}

/**
 * Individual photo entry
 */
export interface GBPPhoto {
  /** Photo URL */
  url: string;

  /** Photo description (alt text) */
  description: string;

  /** Photo category */
  category: 'exterior' | 'interior' | 'product' | 'at_work' | 'team' | 'logo' | 'cover';

  /** Upload date */
  uploadedAt?: Date;
}

/**
 * GBP location status
 */
export type GBPLocationStatus =
  | 'pending_creation'
  | 'pending_verification'
  | 'verified'
  | 'suspended'
  | 'needs_update'
  | 'active';

/**
 * GBP Post types
 */
export type GBPPostType =
  | 'UPDATE'
  | 'EVENT'
  | 'OFFER'
  | 'PRODUCT';

/**
 * GBP Post content
 */
export interface GBPPost {
  /** Post ID */
  id: string;

  /** Location ID this post belongs to */
  locationId: string;

  /** Post type */
  type: GBPPostType;

  /** Post summary (1500 chars max) */
  summary: string;

  /** Call to action */
  callToAction?: GBPCallToAction;

  /** Media attachment */
  media?: GBPPostMedia;

  /** Scheduled publish date */
  scheduledAt?: Date;

  /** Published date */
  publishedAt?: Date;

  /** Expiry date (for offers/events) */
  expiresAt?: Date;

  /** Post status */
  status: 'draft' | 'scheduled' | 'published' | 'expired';
}

/**
 * GBP Call to action
 */
export interface GBPCallToAction {
  /** CTA type */
  actionType: 'CALL' | 'BOOK' | 'LEARN_MORE' | 'ORDER' | 'SHOP' | 'SIGN_UP' | 'GET_OFFER';

  /** CTA URL */
  url?: string;
}

/**
 * GBP Post media
 */
export interface GBPPostMedia {
  /** Media URL */
  sourceUrl: string;

  /** Media type */
  mediaFormat: 'PHOTO' | 'VIDEO';

  /** Alt text */
  description?: string;
}

/**
 * GBP Review
 */
export interface GBPReview {
  /** Review ID */
  reviewId: string;

  /** Location ID */
  locationId: string;

  /** Reviewer name */
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
    isAnonymous: boolean;
  };

  /** Star rating (1-5) */
  starRating: 1 | 2 | 3 | 4 | 5;

  /** Review text */
  comment?: string;

  /** Review creation date */
  createTime: Date;

  /** Review update date */
  updateTime?: Date;

  /** Response to review */
  reviewReply?: {
    comment: string;
    updateTime: Date;
  };

  /** Review status */
  status: 'new' | 'responded' | 'flagged';
}

// =============================================================================
// CITATION TYPES
// =============================================================================

/**
 * Citation directory categories
 */
export type DirectoryCategory =
  | 'national'
  | 'local'
  | 'industry'
  | 'social'
  | 'maps';

/**
 * Citation directory entry
 */
export interface CitationDirectory {
  /** Directory ID */
  id: string;

  /** Directory name */
  name: string;

  /** Directory URL */
  url: string;

  /** Directory category */
  category: DirectoryCategory;

  /** Domain authority (estimated) */
  domainAuthority: number;

  /** Is the directory active/useful */
  isActive: boolean;

  /** Submission URL */
  submissionUrl: string;

  /** Notes for submission */
  submissionNotes?: string;

  /** State-specific (null for national) */
  stateCode?: AustralianStateCode;

  /** City-specific (null for state/national) */
  city?: string;

  /** Typical approval time in days */
  approvalDays: number;

  /** Priority score (1-10) */
  priority: number;
}

/**
 * Citation submission
 */
export interface CitationSubmission {
  /** Submission ID */
  id: string;

  /** Directory ID */
  directoryId: string;

  /** Location ID (if location-specific) */
  locationId?: string;

  /** Submission date */
  submittedAt: Date;

  /** Approval date */
  approvedAt?: Date;

  /** Live URL of citation */
  liveUrl?: string;

  /** Status */
  status: 'pending' | 'approved' | 'rejected' | 'expired';

  /** NAP data submitted */
  napData: NAPData;

  /** Notes */
  notes?: string;
}

/**
 * NAP (Name, Address, Phone) data for citations
 */
export interface NAPData {
  /** Business name */
  name: string;

  /** Full address */
  address: string;

  /** Phone number */
  phone: string;

  /** Website URL */
  website: string;

  /** Formatted address parts */
  addressParts: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}

/**
 * NAP consistency check result
 */
export interface NAPConsistencyResult {
  /** Directory name */
  directoryName: string;

  /** Directory URL */
  directoryUrl: string;

  /** Citation URL */
  citationUrl: string;

  /** Is NAP consistent */
  isConsistent: boolean;

  /** Name match */
  nameMatch: boolean;

  /** Address match */
  addressMatch: boolean;

  /** Phone match */
  phoneMatch: boolean;

  /** Website match */
  websiteMatch: boolean;

  /** Discrepancies found */
  discrepancies: string[];

  /** Last checked date */
  lastChecked: Date;
}

// =============================================================================
// BACKLINK TYPES
// =============================================================================

/**
 * Backlink source types
 */
export type BacklinkSourceType =
  | 'news'
  | 'trade_association'
  | 'insurance'
  | 'real_estate'
  | 'government'
  | 'blog'
  | 'directory'
  | 'social'
  | 'forum'
  | 'other';

/**
 * Backlink entry
 */
export interface Backlink {
  /** Backlink ID */
  id: string;

  /** Source domain */
  sourceDomain: string;

  /** Source URL */
  sourceUrl: string;

  /** Target URL on NRPG site */
  targetUrl: string;

  /** Anchor text used */
  anchorText: string;

  /** Link type */
  linkType: 'dofollow' | 'nofollow' | 'sponsored' | 'ugc';

  /** Source type */
  sourceType: BacklinkSourceType;

  /** Is local relevance (Australian) */
  isLocalRelevance: boolean;

  /** State relevance */
  stateRelevance?: AustralianStateCode;

  /** City relevance */
  cityRelevance?: string;

  /** Domain authority of source */
  domainAuthority: number;

  /** Page authority of source page */
  pageAuthority?: number;

  /** First discovered date */
  firstDiscovered: Date;

  /** Last verified date */
  lastVerified: Date;

  /** Is link still live */
  isLive: boolean;

  /** Status */
  status: 'active' | 'lost' | 'broken';
}

/**
 * Backlink prospect for outreach
 */
export interface BacklinkProspect {
  /** Prospect ID */
  id: string;

  /** Domain */
  domain: string;

  /** Contact page/email */
  contactUrl?: string;

  /** Contact email */
  contactEmail?: string;

  /** Source type */
  sourceType: BacklinkSourceType;

  /** Domain authority */
  domainAuthority: number;

  /** Relevance score (1-10) */
  relevanceScore: number;

  /** State relevance */
  stateRelevance?: AustralianStateCode;

  /** City relevance */
  cityRelevance?: string;

  /** Outreach status */
  outreachStatus: 'new' | 'contacted' | 'responded' | 'secured' | 'rejected' | 'no_response';

  /** Outreach attempts */
  outreachAttempts: number;

  /** Last outreach date */
  lastOutreachDate?: Date;

  /** Notes */
  notes?: string;

  /** Priority (1-10) */
  priority: number;
}

/**
 * Outreach email template
 */
export interface OutreachTemplate {
  /** Template ID */
  id: string;

  /** Template name */
  name: string;

  /** Subject line */
  subject: string;

  /** Email body (supports {{variables}}) */
  body: string;

  /** Source type this template is for */
  forSourceType: BacklinkSourceType;

  /** Created date */
  createdAt: Date;
}

// =============================================================================
// REPORTING TYPES
// =============================================================================

/**
 * Local SEO health report
 */
export interface LocalSEOReport {
  /** Report generation date */
  generatedAt: Date;

  /** Report period */
  period: {
    start: Date;
    end: Date;
  };

  /** GBP metrics */
  gbpMetrics: GBPMetrics;

  /** Citation metrics */
  citationMetrics: CitationMetrics;

  /** Backlink metrics */
  backlinkMetrics: BacklinkMetrics;

  /** Overall health score (1-100) */
  healthScore: number;

  /** Action items */
  actionItems: ActionItem[];
}

/**
 * GBP metrics
 */
export interface GBPMetrics {
  /** Total locations */
  totalLocations: number;

  /** Verified locations */
  verifiedLocations: number;

  /** Total reviews */
  totalReviews: number;

  /** Average rating */
  averageRating: number;

  /** New reviews this period */
  newReviews: number;

  /** Reviews awaiting response */
  unrepliedReviews: number;

  /** Posts this period */
  postsThisPeriod: number;

  /** Photo count */
  totalPhotos: number;
}

/**
 * Citation metrics
 */
export interface CitationMetrics {
  /** Total citations */
  totalCitations: number;

  /** New citations this period */
  newCitations: number;

  /** NAP consistency score (percentage) */
  napConsistencyScore: number;

  /** Inconsistent citations */
  inconsistentCitations: number;

  /** Pending submissions */
  pendingSubmissions: number;
}

/**
 * Backlink metrics
 */
export interface BacklinkMetrics {
  /** Total backlinks */
  totalBacklinks: number;

  /** Dofollow backlinks */
  dofollowBacklinks: number;

  /** New backlinks this period */
  newBacklinks: number;

  /** Lost backlinks this period */
  lostBacklinks: number;

  /** Average domain authority */
  averageDomainAuthority: number;

  /** Local backlinks (Australian sources) */
  localBacklinks: number;

  /** Active prospects */
  activeProspects: number;
}

/**
 * Action item
 */
export interface ActionItem {
  /** Action type */
  type: 'critical' | 'important' | 'recommended';

  /** Category */
  category: 'gbp' | 'citation' | 'backlink' | 'general';

  /** Description */
  description: string;

  /** Impact (1-10) */
  impact: number;

  /** Effort required */
  effort: 'low' | 'medium' | 'high';
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Standard API response
 */
export interface LocalSEOApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: Date;
    requestId: string;
  };
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Local SEO module configuration
 */
export interface LocalSEOConfig {
  /** Brand configuration */
  brand: {
    name: string;
    fullName: string;
    phone: string;
    website: string;
    defaultDescription: string;
  };

  /** GBP API configuration */
  gbp: {
    accountId?: string;
    apiKey?: string;
    defaultServiceRadius: number;
    defaultCategories: GBPCategory[];
  };

  /** Citation configuration */
  citations: {
    rateLimit: number; // requests per second
    autoSubmitEnabled: boolean;
    napTemplate: NAPData;
  };

  /** Backlink configuration */
  backlinks: {
    monitoringEnabled: boolean;
    alertThreshold: number; // DA threshold for alerts
    outreachEnabled: boolean;
  };
}

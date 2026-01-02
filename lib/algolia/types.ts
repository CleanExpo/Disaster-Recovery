/**
 * Algolia Search Types
 *
 * TypeScript types for Algolia search records and results
 */

// Base record type (all Algolia records must have objectID)
export interface AlgoliaRecord {
  objectID: string;
}

// Content record (blog posts, guides, articles)
export interface AlgoliaContentRecord extends AlgoliaRecord {
  title: string;
  description: string;
  content: string;
  category: string;
  disasterType: string[];
  contentType: 'blog' | 'guide' | 'article' | 'faq';
  slug: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  author?: string;
  publishedAt: number; // Unix timestamp
  updatedAt: number;
  engagement: number; // Views + shares + comments
  priority: number; // 1-10 (10 = highest)
  readingTime?: number; // minutes
}

// Location record (SEO location pages)
export interface AlgoliaLocationRecord extends AlgoliaRecord {
  cityName: string;
  stateName: string;
  state: string; // State code (NSW, VIC, etc.)
  serviceType: string;
  disasterType: string;
  title: string;
  description: string;
  slug: string;
  url: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  emergencyAvailable: boolean;
  contractorCount: number;
  averageRating: number;
  priority: number;
}

// Contractor record (contractor directory)
export interface AlgoliaContractorRecord extends AlgoliaRecord {
  businessName: string;
  serviceTypes: string[];
  location: string;
  city: string;
  state: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  certifications: string[];
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  description: string;
  slug: string;
  url: string;
  logoUrl?: string;
  emergencyAvailable: boolean;
  insurancePreferred: string[];
  yearsInBusiness: number;
  verified: boolean;
  responseTime: number; // Average response time in minutes
}

// Search result types
export interface SearchResult<T> {
  hits: T[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  facets?: Record<string, Record<string, number>>;
}

// Search filters
export interface SearchFilters {
  category?: string[];
  disasterType?: string[];
  contentType?: string[];
  state?: string[];
  serviceTypes?: string[];
  rating?: number;
  emergencyAvailable?: boolean;
  verified?: boolean;
}

// Search options
export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  page?: number;
  hitsPerPage?: number;
  aroundLatLng?: string; // "lat,lng"
  aroundRadius?: number; // meters
  facets?: string[];
}

// Analytics event
export interface SearchAnalyticsEvent {
  query: string;
  index: string;
  objectID?: string;
  position?: number;
  queryID?: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  resultType?: 'click' | 'conversion' | 'view';
}

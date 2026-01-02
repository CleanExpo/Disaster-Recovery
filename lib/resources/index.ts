/**
 * Resources Library - Central Export
 *
 * Complete resource hub system with CMS integration, search, and analytics
 */

// Types
export * from './types';

// Data (sample data and configurations)
export * from './data';

// CMS Integration
export {
  createCMSService,
  cmsService,
} from './cms-integration';

// Search Integration
export {
  createSearchService,
  searchService,
  useResourceSearch,
} from './search-integration';

// Download Tracking
export {
  trackDownload,
  getResourceDownloadStats,
  hasRecentlyDownloaded,
  syncDownloadEvents,
} from './download-tracking';

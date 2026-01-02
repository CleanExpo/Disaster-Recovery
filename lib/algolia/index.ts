/**
 * Algolia Search - Main Export
 *
 * Central export point for all Algolia-related functionality
 */

// Configuration
export { ALGOLIA_CONFIG } from './config';
export type { AlgoliaIndex } from './config';

// Clients
export {
  getAlgoliaSearchClient,
  getAlgoliaAdminClient,
  getSearchIndex,
  getAdminIndex,
} from './client';

// Types
export type {
  AlgoliaRecord,
  AlgoliaContentRecord,
  AlgoliaLocationRecord,
  AlgoliaContractorRecord,
  SearchResult,
  SearchFilters,
  SearchOptions,
  SearchAnalyticsEvent,
} from './types';

// Analytics
export {
  trackSearchClick,
  trackSearchConversion,
  trackSearchView,
  getSearchAnalytics,
  initializeAlgoliaInsights,
  useSearchAnalytics,
} from './analytics';

// Re-export commonly used functions
export { syncToAlgolia } from '../../scripts/sync-to-algolia';

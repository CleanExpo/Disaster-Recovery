/**
 * Sitemap Generation & Submission Module
 * Disaster Recovery - NRPG Platform
 *
 * Handles dynamic sitemap generation, updates, and search engine submission
 * for SEO/GEO pages generated on contractor signup.
 *
 * Features:
 * - Dynamic sitemap.xml generation
 * - Sitemap index for large page counts (50,000+ URLs)
 * - Google Search Console submission via API
 * - Bing Webmaster Tools submission
 * - ISR-compatible incremental updates
 *
 * Usage:
 * import { generateSitemap, submitToSearchEngines } from '@/lib/geo/sitemap';
 */

export {
  // Types
  type SitemapUrl,
  type SitemapConfig,
  type SitemapIndex,
  type SitemapFile,
  type SearchEngineSubmission,
  type SubmissionResult,

  // Sitemap Generation
  generateSitemapXml,
  generateSitemapIndexXml,
  buildSitemapUrl,

  // URL Builders
  buildLandingPageUrls,
  buildPillarPageUrls,
  buildServicePageUrls,
  buildRegionPageUrls,
  buildStaticPageUrls,

  // Configuration
  DEFAULT_SITEMAP_CONFIG,
  SITEMAP_PRIORITIES,
  CHANGE_FREQUENCIES,
} from './sitemap-generator';

export {
  // Search Engine Submission
  submitToGoogleSearchConsole,
  submitToBingWebmaster,
  submitToSearchEngines,
  pingSearchEngines,

  // Types
  type GoogleSearchConsoleConfig,
  type BingWebmasterConfig,
} from './search-engine-submit';

export {
  // Sitemap Storage & Management
  saveSitemapToStorage,
  loadSitemapFromStorage,
  updateSitemapWithNewPages,
  getSitemapStatus,
  cleanupOldSitemaps,

  // Types
  type SitemapStorageConfig,
  type SitemapStatus,
} from './sitemap-storage';

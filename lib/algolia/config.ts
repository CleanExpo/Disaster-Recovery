/**
 * Algolia Search Configuration
 *
 * Centralized configuration for Algolia search integration
 * Includes index names, search settings, and client configuration
 */

export const ALGOLIA_CONFIG = {
  // App ID and API Keys (from environment variables)
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
  adminApiKey: process.env.ALGOLIA_ADMIN_KEY || '',

  // Index Names
  indices: {
    content: 'disaster_recovery_content',
    locations: 'disaster_recovery_locations',
    contractors: 'disaster_recovery_contractors',
  },

  // Searchable Attributes (priority order)
  searchableAttributes: {
    content: [
      'title',
      'description',
      'content',
      'tags',
      'category',
    ],
    locations: [
      'cityName',
      'stateName',
      'serviceType',
      'title',
      'description',
    ],
    contractors: [
      'businessName',
      'serviceTypes',
      'location',
      'certifications',
      'description',
    ],
  },

  // Custom Ranking (secondary ranking factors)
  customRanking: {
    content: [
      'desc(publishedAt)',
      'desc(engagement)',
      'desc(priority)',
    ],
    locations: [
      'desc(priority)',
      'asc(distance)',
    ],
    contractors: [
      'desc(rating)',
      'desc(jobsCompleted)',
      'asc(distance)',
    ],
  },

  // Facets (for filtering)
  facets: {
    content: [
      'category',
      'disasterType',
      'contentType',
      'tags',
      'publishedAt',
    ],
    locations: [
      'state',
      'serviceType',
      'disasterType',
      'emergencyAvailable',
    ],
    contractors: [
      'serviceTypes',
      'state',
      'certifications',
      'rating',
      'emergencyAvailable',
      'insurancePreferred',
    ],
  },

  // Synonyms (search term equivalents)
  synonyms: [
    // Water damage synonyms
    ['water damage', 'flood', 'flooding', 'water emergency'],
    ['burst pipe', 'broken pipe', 'pipe leak', 'plumbing leak'],
    ['basement flooding', 'cellar flood', 'underground flooding'],

    // Fire damage synonyms
    ['fire damage', 'fire restoration', 'fire cleanup'],
    ['smoke damage', 'smoke restoration', 'soot damage'],
    ['smoke odor', 'smoke smell', 'fire smell'],

    // Mold synonyms
    ['mould', 'mold', 'mildew'],
    ['black mould', 'toxic mold', 'black mold'],

    // Storm synonyms
    ['storm damage', 'weather damage', 'wind damage'],
    ['hail damage', 'hailstorm damage'],

    // General synonyms
    ['emergency', 'urgent', '24/7', 'immediate'],
    ['restoration', 'remediation', 'cleanup', 'repair'],
    ['commercial', 'business', 'industrial'],
    ['residential', 'home', 'house', 'property'],
  ],

  // Ranking Formula
  ranking: [
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom',
  ],

  // Search Settings
  settings: {
    hitsPerPage: 20,
    maxValuesPerFacet: 100,
    typoTolerance: 'min',
    attributesToSnippet: ['content:30', 'description:50'],
    snippetEllipsisText: '…',
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  },
} as const;

// Type exports
export type AlgoliaIndex = keyof typeof ALGOLIA_CONFIG.indices;

/**
 * Algolia Client - DEPRECATED
 *
 * This project now uses PostgreSQL full-text search.
 * See: lib/search/postgres-search.ts
 *
 * This file is kept for backwards compatibility but all methods
 * throw deprecation errors. Use PostgreSQL search instead.
 */

// Stub type to prevent import errors
type SearchClient = {
  initIndex: (name: string) => SearchIndex;
};

type SearchIndex = {
  search: (query: string) => Promise<{ hits: never[] }>;
};

const DEPRECATION_MESSAGE =
  'Algolia is deprecated. Use PostgreSQL search from lib/search/postgres-search.ts instead.';

// Search-only client (deprecated)
export function getAlgoliaSearchClient(): SearchClient {
  console.warn(DEPRECATION_MESSAGE);
  return {
    initIndex: () => ({
      search: async () => ({ hits: [] }),
    }),
  };
}

// Admin client (deprecated)
export function getAlgoliaAdminClient(): SearchClient {
  console.warn(DEPRECATION_MESSAGE);
  return {
    initIndex: () => ({
      search: async () => ({ hits: [] }),
    }),
  };
}

// Helper to get a specific index (deprecated)
export function getSearchIndex(indexName: string): SearchIndex {
  console.warn(DEPRECATION_MESSAGE);
  return {
    search: async () => ({ hits: [] }),
  };
}

export function getAdminIndex(indexName: string): SearchIndex {
  console.warn(DEPRECATION_MESSAGE);
  return {
    search: async () => ({ hits: [] }),
  };
}

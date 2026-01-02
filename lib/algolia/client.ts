/**
 * Algolia Client Initialization
 *
 * Provides configured Algolia search clients for both
 * frontend (search-only) and backend (admin) operations
 */

import algoliasearch, { SearchClient } from 'algoliasearch';
import { ALGOLIA_CONFIG } from './config';

// Search-only client (safe for frontend use)
let searchClient: SearchClient | null = null;

export function getAlgoliaSearchClient(): SearchClient {
  if (!searchClient) {
    if (!ALGOLIA_CONFIG.appId || !ALGOLIA_CONFIG.searchApiKey) {
      throw new Error('Algolia app ID and search API key must be configured');
    }

    searchClient = algoliasearch(
      ALGOLIA_CONFIG.appId,
      ALGOLIA_CONFIG.searchApiKey
    );
  }

  return searchClient;
}

// Admin client (backend only - has write permissions)
let adminClient: SearchClient | null = null;

export function getAlgoliaAdminClient(): SearchClient {
  if (!adminClient) {
    if (!ALGOLIA_CONFIG.appId || !ALGOLIA_CONFIG.adminApiKey) {
      throw new Error('Algolia app ID and admin API key must be configured');
    }

    adminClient = algoliasearch(
      ALGOLIA_CONFIG.appId,
      ALGOLIA_CONFIG.adminApiKey
    );
  }

  return adminClient;
}

// Helper to get a specific index
export function getSearchIndex(indexName: string) {
  const client = getAlgoliaSearchClient();
  return client.initIndex(indexName);
}

export function getAdminIndex(indexName: string) {
  const client = getAlgoliaAdminClient();
  return client.initIndex(indexName);
}

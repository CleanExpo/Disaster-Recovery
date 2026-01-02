/**
 * Search Integration Layer
 *
 * Abstraction layer for search integration supporting:
 * - Algolia (production-ready, instant search)
 * - Local fallback (simple client-side search)
 *
 * Easy to integrate with Algolia without changing application code
 */

import {
  Resource,
  SearchConfig,
  ResourceSearchParams,
  ResourceSearchResult,
  AlgoliaResource,
} from './types';

/**
 * Search Service Interface
 */
interface SearchService {
  search(params: ResourceSearchParams): Promise<ResourceSearchResult>;
  indexResource(resource: Resource): Promise<void>;
  indexResources(resources: Resource[]): Promise<void>;
  deleteResource(resourceId: string): Promise<void>;
}

/**
 * Algolia Search Service
 * Production-ready search with instant results
 */
class AlgoliaSearchService implements SearchService {
  private appId: string;
  private apiKey: string;
  private indexName: string;

  constructor(config: SearchConfig) {
    if (!config.appId || !config.apiKey || !config.indexName) {
      throw new Error('Algolia requires appId, apiKey, and indexName');
    }
    this.appId = config.appId;
    this.apiKey = config.apiKey;
    this.indexName = config.indexName;
  }

  private async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `https://${this.appId}-dsn.algolia.net/1${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Algolia-API-Key': this.apiKey,
        'X-Algolia-Application-Id': this.appId,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Algolia API error: ${response.statusText}`);
    }

    return response.json();
  }

  private transformResourceToAlgolia(resource: Resource): AlgoliaResource {
    return {
      objectID: resource.id,
      title: resource.title,
      description: resource.description,
      category: resource.category,
      contentType: resource.contentType,
      tags: resource.tags || [],
      author: resource.author.name,
      publishedAt: resource.publishedAt.getTime(),
    };
  }

  private transformAlgoliaToResource(hit: any): Partial<Resource> {
    return {
      id: hit.objectID,
      title: hit.title,
      description: hit.description,
      category: hit.category,
      contentType: hit.contentType,
      tags: hit.tags,
      publishedAt: new Date(hit.publishedAt),
    };
  }

  async search(params: ResourceSearchParams): Promise<ResourceSearchResult> {
    try {
      const searchParams: any = {
        query: params.query || '',
        page: (params.page || 1) - 1, // Algolia uses 0-based pages
        hitsPerPage: params.perPage || 20,
      };

      // Add filters
      const filters: string[] = [];
      if (params.filters?.categories) {
        const categoryFilter = params.filters.categories.map(c => `category:${c}`).join(' OR ');
        filters.push(`(${categoryFilter})`);
      }
      if (params.filters?.contentTypes) {
        const typeFilter = params.filters.contentTypes.map(t => `contentType:${t}`).join(' OR ');
        filters.push(`(${typeFilter})`);
      }
      if (params.filters?.featured) {
        filters.push('featured:true');
      }
      if (params.filters?.trending) {
        filters.push('trending:true');
      }

      if (filters.length > 0) {
        searchParams.filters = filters.join(' AND ');
      }

      const result = await this.fetch(`/indexes/${this.indexName}/query`, {
        method: 'POST',
        body: JSON.stringify(searchParams),
      });

      return {
        resources: result.hits.map(this.transformAlgoliaToResource) as Resource[],
        total: result.nbHits,
        page: result.page + 1,
        perPage: result.hitsPerPage,
        hasMore: result.page + 1 < result.nbPages,
      };
    } catch (error) {
      console.error('Error searching with Algolia:', error);
      return {
        resources: [],
        total: 0,
        page: 1,
        perPage: 20,
        hasMore: false,
      };
    }
  }

  async indexResource(resource: Resource): Promise<void> {
    try {
      const algoliaResource = this.transformResourceToAlgolia(resource);
      await this.fetch(`/indexes/${this.indexName}`, {
        method: 'POST',
        body: JSON.stringify(algoliaResource),
      });
    } catch (error) {
      console.error('Error indexing resource in Algolia:', error);
    }
  }

  async indexResources(resources: Resource[]): Promise<void> {
    try {
      const algoliaResources = resources.map(this.transformResourceToAlgolia.bind(this));
      await this.fetch(`/indexes/${this.indexName}/batch`, {
        method: 'POST',
        body: JSON.stringify({
          requests: algoliaResources.map(obj => ({
            action: 'addObject',
            body: obj,
          })),
        }),
      });
    } catch (error) {
      console.error('Error batch indexing resources in Algolia:', error);
    }
  }

  async deleteResource(resourceId: string): Promise<void> {
    try {
      await this.fetch(`/indexes/${this.indexName}/${resourceId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting resource from Algolia:', error);
    }
  }
}

/**
 * Local Search Service
 * Simple client-side search for development/fallback
 */
class LocalSearchService implements SearchService {
  private resources: Resource[] = [];

  async search(params: ResourceSearchParams): Promise<ResourceSearchResult> {
    // Load resources if not already loaded
    if (this.resources.length === 0) {
      const { SAMPLE_RESOURCES } = await import('./data');
      this.resources = SAMPLE_RESOURCES;
    }

    let filtered = [...this.resources];

    // Text search
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.excerpt?.toLowerCase().includes(query) ||
          r.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (params.filters?.categories) {
      filtered = filtered.filter(r => params.filters?.categories?.includes(r.category));
    }

    // Content type filter
    if (params.filters?.contentTypes) {
      filtered = filtered.filter(r => params.filters?.contentTypes?.includes(r.contentType));
    }

    // Featured filter
    if (params.filters?.featured) {
      filtered = filtered.filter(r => r.featured);
    }

    // Trending filter
    if (params.filters?.trending) {
      filtered = filtered.filter(r => r.trending);
    }

    // Difficulty filter
    if (params.filters?.difficulty) {
      filtered = filtered.filter(r =>
        r.difficulty && params.filters?.difficulty?.includes(r.difficulty)
      );
    }

    // Tags filter
    if (params.filters?.tags && params.filters.tags.length > 0) {
      filtered = filtered.filter(r =>
        r.tags?.some(tag => params.filters?.tags?.includes(tag))
      );
    }

    // Sorting
    if (params.sortBy === 'date') {
      filtered.sort((a, b) => {
        const dateA = a.publishedAt.getTime();
        const dateB = b.publishedAt.getTime();
        return params.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (params.sortBy === 'title') {
      filtered.sort((a, b) => {
        return params.sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
    } else if (params.sortBy === 'popular') {
      filtered.sort((a, b) => {
        const viewsA = a.viewCount || 0;
        const viewsB = b.viewCount || 0;
        return params.sortOrder === 'asc' ? viewsA - viewsB : viewsB - viewsA;
      });
    }

    // Pagination
    const page = params.page || 1;
    const perPage = params.perPage || 20;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
      resources: filtered.slice(start, end),
      total: filtered.length,
      page,
      perPage,
      hasMore: end < filtered.length,
    };
  }

  async indexResource(resource: Resource): Promise<void> {
    // Add to local cache
    const existingIndex = this.resources.findIndex(r => r.id === resource.id);
    if (existingIndex >= 0) {
      this.resources[existingIndex] = resource;
    } else {
      this.resources.push(resource);
    }
  }

  async indexResources(resources: Resource[]): Promise<void> {
    this.resources = resources;
  }

  async deleteResource(resourceId: string): Promise<void> {
    this.resources = this.resources.filter(r => r.id !== resourceId);
  }
}

/**
 * Search Factory
 * Create appropriate search service based on configuration
 */
export function createSearchService(config?: SearchConfig): SearchService {
  const provider = config?.provider || process.env.NEXT_PUBLIC_SEARCH_PROVIDER || 'local';

  switch (provider) {
    case 'algolia':
      return new AlgoliaSearchService({
        provider: 'algolia',
        appId: config?.appId || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
        apiKey: config?.apiKey || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
        indexName: config?.indexName || process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'resources',
      });

    case 'local':
    default:
      return new LocalSearchService();
  }
}

/**
 * Default search service instance
 */
export const searchService = createSearchService();

/**
 * Client-side search hook for React components
 */
export function useResourceSearch() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<ResourceSearchResult>({
    resources: [],
    total: 0,
    page: 1,
    perPage: 20,
    hasMore: false,
  });

  const search = async (params: ResourceSearchParams) => {
    setIsLoading(true);
    try {
      const searchResults = await searchService.search(params);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    search,
    results,
    isLoading,
  };
}

// React import for the hook
import * as React from 'react';

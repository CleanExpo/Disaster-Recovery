/**
 * CMS Integration Layer
 *
 * Abstraction layer for headless CMS integration supporting:
 * - Contentful
 * - Sanity
 * - Local fallback
 *
 * Easy to swap CMS providers without changing application code
 */

import {
  Resource,
  CMSConfig,
  CMSResource,
  ResourceSearchParams,
  ResourceSearchResult,
  DisasterCategory,
} from './types';

/**
 * CMS Service Interface
 * All CMS providers must implement this interface
 */
interface CMSService {
  getResource(id: string): Promise<Resource | null>;
  getResourceBySlug(category: DisasterCategory, slug: string): Promise<Resource | null>;
  getResources(params?: ResourceSearchParams): Promise<ResourceSearchResult>;
  getFeaturedResources(limit?: number): Promise<Resource[]>;
  getTrendingResources(limit?: number): Promise<Resource[]>;
  getRecentResources(limit?: number): Promise<Resource[]>;
  getResourcesByCategory(category: DisasterCategory, limit?: number): Promise<Resource[]>;
}

/**
 * Contentful CMS Service
 * Integration with Contentful headless CMS
 */
class ContentfulService implements CMSService {
  private spaceId: string;
  private accessToken: string;
  private baseUrl: string;

  constructor(config: CMSConfig) {
    if (!config.spaceId || !config.accessToken) {
      throw new Error('Contentful requires spaceId and accessToken');
    }
    this.spaceId = config.spaceId;
    this.accessToken = config.accessToken;
    this.baseUrl = `https://cdn.contentful.com/spaces/${this.spaceId}`;
  }

  private async fetch(endpoint: string, params?: Record<string, any>): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set('access_token', this.accessToken);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.statusText}`);
    }

    return response.json();
  }

  private transformContentfulResource(entry: CMSResource): Resource {
    // Transform Contentful entry to Resource
    // This is a placeholder - actual transformation depends on your Contentful content model
    const fields = entry.fields as any;

    return {
      id: entry.sys?.id || '',
      slug: fields.slug,
      title: fields.title,
      description: fields.description,
      excerpt: fields.excerpt,
      category: fields.category,
      contentType: fields.contentType,
      content: fields.content,
      thumbnailUrl: fields.thumbnail?.fields?.file?.url,
      featuredImageUrl: fields.featuredImage?.fields?.file?.url,
      author: {
        id: fields.author?.sys?.id || '',
        name: fields.author?.fields?.name || 'Unknown',
        title: fields.author?.fields?.title,
        avatarUrl: fields.author?.fields?.avatar?.fields?.file?.url,
      },
      publishedAt: new Date(fields.publishedAt || entry.sys?.createdAt || ''),
      updatedAt: new Date(entry.sys?.updatedAt || ''),
      readingTime: fields.readingTime,
      tags: fields.tags || [],
      downloadable: fields.downloadable || false,
      downloadUrl: fields.downloadFile?.fields?.file?.url,
      downloadFormat: fields.downloadFormat,
      featured: fields.featured || false,
      trending: fields.trending || false,
    };
  }

  async getResource(id: string): Promise<Resource | null> {
    try {
      const data = await this.fetch(`/entries/${id}`);
      return this.transformContentfulResource(data);
    } catch (error) {
      console.error('Error fetching resource from Contentful:', error);
      return null;
    }
  }

  async getResourceBySlug(category: DisasterCategory, slug: string): Promise<Resource | null> {
    try {
      const data = await this.fetch('/entries', {
        content_type: 'resource',
        'fields.category': category,
        'fields.slug': slug,
        limit: 1,
      });

      if (data.items && data.items.length > 0) {
        return this.transformContentfulResource(data.items[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching resource by slug from Contentful:', error);
      return null;
    }
  }

  async getResources(params?: ResourceSearchParams): Promise<ResourceSearchResult> {
    try {
      const contentfulParams: Record<string, any> = {
        content_type: 'resource',
        limit: params?.perPage || 20,
        skip: ((params?.page || 1) - 1) * (params?.perPage || 20),
      };

      if (params?.filters?.categories) {
        contentfulParams['fields.category[in]'] = params.filters.categories.join(',');
      }

      const data = await this.fetch('/entries', contentfulParams);

      return {
        resources: data.items.map(this.transformContentfulResource.bind(this)),
        total: data.total,
        page: params?.page || 1,
        perPage: params?.perPage || 20,
        hasMore: data.skip + data.items.length < data.total,
      };
    } catch (error) {
      console.error('Error fetching resources from Contentful:', error);
      return {
        resources: [],
        total: 0,
        page: 1,
        perPage: 20,
        hasMore: false,
      };
    }
  }

  async getFeaturedResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { featured: true },
      perPage: limit,
    });
    return result.resources;
  }

  async getTrendingResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { trending: true },
      perPage: limit,
    });
    return result.resources;
  }

  async getRecentResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      sortBy: 'date',
      sortOrder: 'desc',
      perPage: limit,
    });
    return result.resources;
  }

  async getResourcesByCategory(category: DisasterCategory, limit?: number): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { categories: [category] },
      perPage: limit || 20,
    });
    return result.resources;
  }
}

/**
 * Sanity CMS Service
 * Integration with Sanity headless CMS
 */
class SanityService implements CMSService {
  private projectId: string;
  private dataset: string;
  private baseUrl: string;

  constructor(config: CMSConfig) {
    if (!config.projectId || !config.dataset) {
      throw new Error('Sanity requires projectId and dataset');
    }
    this.projectId = config.projectId;
    this.dataset = config.dataset;
    this.baseUrl = `https://${this.projectId}.api.sanity.io/v2021-10-21/data/query/${this.dataset}`;
  }

  private async query(groqQuery: string): Promise<any> {
    const url = `${this.baseUrl}?query=${encodeURIComponent(groqQuery)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  }

  private transformSanityResource(doc: any): Resource {
    // Transform Sanity document to Resource
    return {
      id: doc._id,
      slug: doc.slug?.current || '',
      title: doc.title,
      description: doc.description,
      excerpt: doc.excerpt,
      category: doc.category,
      contentType: doc.contentType,
      content: doc.content,
      thumbnailUrl: doc.thumbnail?.asset?.url,
      featuredImageUrl: doc.featuredImage?.asset?.url,
      author: {
        id: doc.author?._id || '',
        name: doc.author?.name || 'Unknown',
        title: doc.author?.title,
        avatarUrl: doc.author?.avatar?.asset?.url,
      },
      publishedAt: new Date(doc.publishedAt || doc._createdAt),
      updatedAt: new Date(doc._updatedAt),
      readingTime: doc.readingTime,
      tags: doc.tags || [],
      downloadable: doc.downloadable || false,
      downloadUrl: doc.downloadFile?.asset?.url,
      downloadFormat: doc.downloadFormat,
      featured: doc.featured || false,
      trending: doc.trending || false,
    };
  }

  async getResource(id: string): Promise<Resource | null> {
    try {
      const query = `*[_type == "resource" && _id == "${id}"][0]`;
      const doc = await this.query(query);
      return doc ? this.transformSanityResource(doc) : null;
    } catch (error) {
      console.error('Error fetching resource from Sanity:', error);
      return null;
    }
  }

  async getResourceBySlug(category: DisasterCategory, slug: string): Promise<Resource | null> {
    try {
      const query = `*[_type == "resource" && category == "${category}" && slug.current == "${slug}"][0]`;
      const doc = await this.query(query);
      return doc ? this.transformSanityResource(doc) : null;
    } catch (error) {
      console.error('Error fetching resource by slug from Sanity:', error);
      return null;
    }
  }

  async getResources(params?: ResourceSearchParams): Promise<ResourceSearchResult> {
    try {
      let filters = '';
      if (params?.filters?.categories) {
        filters = ` && category in [${params.filters.categories.map(c => `"${c}"`).join(',')}]`;
      }

      const offset = ((params?.page || 1) - 1) * (params?.perPage || 20);
      const limit = params?.perPage || 20;

      const query = `{
        "resources": *[_type == "resource"${filters}] | order(_createdAt desc) [${offset}...${offset + limit}],
        "total": count(*[_type == "resource"${filters}])
      }`;

      const result = await this.query(query);

      return {
        resources: result.resources.map(this.transformSanityResource.bind(this)),
        total: result.total,
        page: params?.page || 1,
        perPage: params?.perPage || 20,
        hasMore: offset + result.resources.length < result.total,
      };
    } catch (error) {
      console.error('Error fetching resources from Sanity:', error);
      return {
        resources: [],
        total: 0,
        page: 1,
        perPage: 20,
        hasMore: false,
      };
    }
  }

  async getFeaturedResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { featured: true },
      perPage: limit,
    });
    return result.resources;
  }

  async getTrendingResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { trending: true },
      perPage: limit,
    });
    return result.resources;
  }

  async getRecentResources(limit: number = 5): Promise<Resource[]> {
    const result = await this.getResources({
      sortBy: 'date',
      sortOrder: 'desc',
      perPage: limit,
    });
    return result.resources;
  }

  async getResourcesByCategory(category: DisasterCategory, limit?: number): Promise<Resource[]> {
    const result = await this.getResources({
      filters: { categories: [category] },
      perPage: limit || 20,
    });
    return result.resources;
  }
}

/**
 * Local CMS Service
 * Fallback service using local data
 */
class LocalService implements CMSService {
  async getResource(id: string): Promise<Resource | null> {
    // Import local data
    const { SAMPLE_RESOURCES } = await import('./data');
    return SAMPLE_RESOURCES.find(r => r.id === id) || null;
  }

  async getResourceBySlug(category: DisasterCategory, slug: string): Promise<Resource | null> {
    const { SAMPLE_RESOURCES } = await import('./data');
    return SAMPLE_RESOURCES.find(r => r.category === category && r.slug === slug) || null;
  }

  async getResources(params?: ResourceSearchParams): Promise<ResourceSearchResult> {
    const { SAMPLE_RESOURCES } = await import('./data');
    let filtered = [...SAMPLE_RESOURCES];

    // Apply filters
    if (params?.filters?.categories) {
      filtered = filtered.filter(r => params.filters?.categories?.includes(r.category));
    }

    // Pagination
    const page = params?.page || 1;
    const perPage = params?.perPage || 20;
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

  async getFeaturedResources(limit: number = 5): Promise<Resource[]> {
    const { getFeaturedResources } = await import('./data');
    return getFeaturedResources();
  }

  async getTrendingResources(limit: number = 5): Promise<Resource[]> {
    const { getTrendingResources } = await import('./data');
    return getTrendingResources();
  }

  async getRecentResources(limit: number = 5): Promise<Resource[]> {
    const { getRecentResources } = await import('./data');
    return getRecentResources(limit);
  }

  async getResourcesByCategory(category: DisasterCategory, limit?: number): Promise<Resource[]> {
    const { getResourcesByCategory } = await import('./data');
    return getResourcesByCategory(category);
  }
}

/**
 * CMS Factory
 * Create appropriate CMS service based on configuration
 */
export function createCMSService(config?: CMSConfig): CMSService {
  const provider = config?.provider || process.env.NEXT_PUBLIC_CMS_PROVIDER || 'local';

  switch (provider) {
    case 'contentful':
      return new ContentfulService({
        provider: 'contentful',
        spaceId: config?.spaceId || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: config?.accessToken || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      });

    case 'sanity':
      return new SanityService({
        provider: 'sanity',
        projectId: config?.projectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: config?.dataset || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      });

    case 'local':
    default:
      return new LocalService();
  }
}

/**
 * Default CMS service instance
 */
export const cmsService = createCMSService();

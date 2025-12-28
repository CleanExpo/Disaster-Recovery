/**
 * SEMRUSH API Client
 *
 * Integrates with SEMRUSH API for:
 * - Domain overview (traffic, keywords, backlinks)
 * - Organic keyword rankings
 * - Backlink profile analysis
 * - Competitor discovery
 *
 * Rate Limits: 10 requests/second, 10,000 requests/day
 * Cache: 24-hour TTL to reduce API calls
 */

import axios, { AxiosInstance } from 'axios';
import NodeCache from 'node-cache';
import { semrushRateLimiter } from './rate-limiter';
import type {
  SemrushDomainOverview,
  SemrushKeyword,
  SemrushBacklink,
  SemrushCompetitor,
} from '../types';

interface SemrushApiConfig {
  apiKey: string;
  baseUrl?: string;
  cacheEnabled?: boolean;
  cacheTtlSeconds?: number;
  retryAttempts?: number;
  retryDelayMs?: number;
}

export class SemrushClient {
  private client: AxiosInstance;
  private cache: NodeCache;
  private config: Required<SemrushApiConfig>;

  constructor(config: SemrushApiConfig) {
    this.config = {
      baseUrl: 'https://api.semrush.com',
      cacheEnabled: true,
      cacheTtlSeconds: 86400, // 24 hours
      retryAttempts: 3,
      retryDelayMs: 1000,
      ...config,
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.cache = new NodeCache({
      stdTTL: this.config.cacheTtlSeconds,
      checkperiod: 600,
      useClones: false,
    });
  }

  /**
   * Get domain overview - traffic, keywords, backlinks
   */
  async getDomainOverview(
    domain: string,
    database: string = 'au' // Australia
  ): Promise<SemrushDomainOverview> {
    const cacheKey = `domain_overview:${domain}:${database}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<SemrushDomainOverview>(cacheKey);
      if (cached) {
        console.log(`[SEMRUSH] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    const result = await this.executeWithRetry(async () => {
      const response = await this.client.get('/', {
        params: {
          type: 'domain_ranks',
          key: this.config.apiKey,
          export_columns: 'Ot,Oc,Or,Ov,Ad,At,Ac,Sh,Sv,Rk',
          domain,
          database,
        },
      });

      return this.parseDomainOverview(response.data, domain);
    });

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, result);
    }

    return result;
  }

  /**
   * Get organic keywords for domain
   */
  async getOrganicKeywords(
    domain: string,
    limit: number = 100,
    database: string = 'au'
  ): Promise<SemrushKeyword[]> {
    const cacheKey = `organic_keywords:${domain}:${limit}:${database}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<SemrushKeyword[]>(cacheKey);
      if (cached) {
        console.log(`[SEMRUSH] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    const result = await this.executeWithRetry(async () => {
      const response = await this.client.get('/', {
        params: {
          type: 'domain_organic',
          key: this.config.apiKey,
          export_columns: 'Ph,Po,Pp,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td',
          domain,
          database,
          display_limit: limit,
          display_sort: 'tr_desc', // Sort by traffic descending
        },
      });

      return this.parseKeywords(response.data);
    });

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, result);
    }

    return result;
  }

  /**
   * Get backlinks for domain
   */
  async getBacklinks(
    domain: string,
    limit: number = 100,
    type: 'all' | 'dofollow' | 'nofollow' = 'all'
  ): Promise<SemrushBacklink[]> {
    const cacheKey = `backlinks:${domain}:${limit}:${type}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<SemrushBacklink[]>(cacheKey);
      if (cached) {
        console.log(`[SEMRUSH] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    const result = await this.executeWithRetry(async () => {
      const response = await this.client.get('/', {
        params: {
          type: 'backlinks',
          key: this.config.apiKey,
          export_columns: 'source_url,target_url,anchor,external_num,response_code,last_seen,first_seen,source_title',
          target: domain,
          target_type: 'domain',
          display_limit: limit,
        },
      });

      return this.parseBacklinks(response.data);
    });

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, result);
    }

    return result;
  }

  /**
   * Get organic competitors for domain
   */
  async getOrganicCompetitors(
    domain: string,
    limit: number = 20,
    database: string = 'au'
  ): Promise<SemrushCompetitor[]> {
    const cacheKey = `organic_competitors:${domain}:${limit}:${database}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<SemrushCompetitor[]>(cacheKey);
      if (cached) {
        console.log(`[SEMRUSH] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    const result = await this.executeWithRetry(async () => {
      const response = await this.client.get('/', {
        params: {
          type: 'domain_organic_organic',
          key: this.config.apiKey,
          export_columns: 'Dn,Cr,Np,Or,Ot,Oc,Ad',
          domain,
          database,
          display_limit: limit,
          display_sort: 'np_desc', // Sort by common keywords descending
        },
      });

      return this.parseCompetitors(response.data);
    });

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, result);
    }

    return result;
  }

  /**
   * Execute request with rate limiting and retry logic
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await semrushRateLimiter.execute(fn, 5);
    } catch (error: any) {
      if (attempt >= this.config.retryAttempts) {
        throw new Error(
          `SEMRUSH API request failed after ${attempt} attempts: ${error.message}`
        );
      }

      // Exponential backoff
      const delay = this.config.retryDelayMs * Math.pow(2, attempt - 1);
      console.log(`[SEMRUSH] Retry attempt ${attempt}, waiting ${delay}ms`);
      await this.sleep(delay);

      return this.executeWithRetry(fn, attempt + 1);
    }
  }

  /**
   * Parse domain overview from CSV response
   */
  private parseDomainOverview(
    csvData: string,
    domain: string
  ): SemrushDomainOverview {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('Invalid SEMRUSH response: no data rows');
    }

    const values = lines[1].split(';');

    return {
      domain,
      organicTraffic: parseInt(values[0]) || 0,
      organicKeywords: parseInt(values[2]) || 0,
      paidTraffic: parseInt(values[5]) || 0,
      paidKeywords: parseInt(values[6]) || 0,
      organicCost: parseFloat(values[1]) || 0,
      paidCost: parseFloat(values[7]) || 0,
      adKeywords: parseInt(values[4]) || 0,
    };
  }

  /**
   * Parse keywords from CSV response
   */
  private parseKeywords(csvData: string): SemrushKeyword[] {
    const lines = csvData.trim().split('\n');
    const keywords: SemrushKeyword[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';');

      keywords.push({
        keyword: values[0],
        position: parseInt(values[1]) || 0,
        previousPosition: parseInt(values[2]) || undefined,
        searchVolume: parseInt(values[3]) || 0,
        cpc: parseFloat(values[4]) || 0,
        url: values[5],
        traffic: parseInt(values[6]) || 0,
        trafficPercent: parseFloat(values[7]) || 0,
        competitionLevel: parseFloat(values[8]) || 0,
        numberOfResults: parseInt(values[9]) || 0,
        trends: [],
        timestamp: Date.now(),
      });
    }

    return keywords;
  }

  /**
   * Parse backlinks from CSV response
   */
  private parseBacklinks(csvData: string): SemrushBacklink[] {
    const lines = csvData.trim().split('\n');
    const backlinks: SemrushBacklink[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';');

      backlinks.push({
        sourceUrl: values[0],
        targetUrl: values[1],
        anchorText: values[2],
        linkType: values[4] === '200' ? 'dofollow' : 'nofollow',
        firstSeen: values[6],
        lastSeen: values[5],
        domainAscore: 0,
        pageAscore: 0,
      });
    }

    return backlinks;
  }

  /**
   * Parse competitors from CSV response
   */
  private parseCompetitors(csvData: string): SemrushCompetitor[] {
    const lines = csvData.trim().split('\n');
    const competitors: SemrushCompetitor[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';');

      competitors.push({
        domain: values[0],
        competitionLevel: parseFloat(values[1]) || 0,
        commonKeywords: parseInt(values[2]) || 0,
        organicKeywords: parseInt(values[3]) || 0,
        organicTraffic: parseInt(values[4]) || 0,
        organicCost: parseFloat(values[5]) || 0,
      });
    }

    return competitors;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.flushAll();
    console.log('[SEMRUSH] Cache cleared');
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return this.cache.getStats();
  }
}

// Export singleton instance
export const semrushClient = new SemrushClient({
  apiKey: process.env.SEMRUSH_API_KEY || '',
});

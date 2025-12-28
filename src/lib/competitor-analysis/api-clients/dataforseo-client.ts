/**
 * DataForSEO API Client
 *
 * Integrates with DataForSEO API for:
 * - SERP data (search rankings)
 * - On-page SEO analysis
 * - Page speed metrics (Core Web Vitals)
 * - Backlink data
 *
 * Rate Limits: 2,000 units/day, task-based API with polling
 * Cache: 12-hour TTL to reduce API calls
 */

import axios, { AxiosInstance } from 'axios';
import NodeCache from 'node-cache';
import { dataForSeoRateLimiter } from './rate-limiter';
import type {
  DataForSeoTask,
  DataForSeoSerpResult,
  DataForSeoOnPage,
  DataForSeoPageSpeed,
  DataForSeoBacklink,
} from '../types';

interface DataForSeoConfig {
  login: string;
  password: string;
  baseUrl?: string;
  cacheEnabled?: boolean;
  cacheTtlSeconds?: number;
  pollIntervalMs?: number;
  pollTimeoutMs?: number;
  retryAttempts?: number;
}

export class DataForSeoClient {
  private client: AxiosInstance;
  private cache: NodeCache;
  private config: Required<DataForSeoConfig>;

  constructor(config: DataForSeoConfig) {
    this.config = {
      baseUrl: 'https://api.dataforseo.com/v3',
      cacheEnabled: true,
      cacheTtlSeconds: 43200, // 12 hours
      pollIntervalMs: 5000,    // Poll every 5 seconds
      pollTimeoutMs: 300000,   // Timeout after 5 minutes
      retryAttempts: 3,
      ...config,
    };

    const auth = Buffer.from(
      `${this.config.login}:${this.config.password}`
    ).toString('base64');

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: 30000,
      headers: {
        Authorization: `Basic ${auth}`,
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
   * Get SERP data for keyword (Australia location)
   */
  async getSERPData(
    keyword: string,
    location: string = 'Australia'
  ): Promise<DataForSeoSerpResult> {
    const cacheKey = `serp:${keyword}:${location}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<DataForSeoSerpResult>(cacheKey);
      if (cached) {
        console.log(`[DataForSEO] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    // Submit task
    const taskId = await this.submitTask('serp/google/organic/task_post', [
      {
        keyword,
        location_name: location,
        language_code: 'en',
        device: 'desktop',
        os: 'windows',
        depth: 100, // Get top 100 results
      },
    ]);

    // Poll for results
    const result = await this.pollTaskResults(
      `serp/google/organic/task_get/${taskId}`
    );

    const serpResult = this.parseSerpResult(result, keyword, location);

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, serpResult);
    }

    return serpResult;
  }

  /**
   * Get on-page SEO analysis for URL
   */
  async getOnPageSEO(url: string): Promise<DataForSeoOnPage> {
    const cacheKey = `onpage:${url}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<DataForSeoOnPage>(cacheKey);
      if (cached) {
        console.log(`[DataForSEO] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    // Submit task
    const taskId = await this.submitTask('on_page/task_post', [
      {
        target: url,
        max_crawl_pages: 100,
        load_resources: true,
        enable_javascript: true,
      },
    ]);

    // Poll for results
    const result = await this.pollTaskResults(`on_page/task_get/${taskId}`);

    const onPageResult = this.parseOnPageResult(result, url);

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, onPageResult);
    }

    return onPageResult;
  }

  /**
   * Get page speed metrics (Core Web Vitals)
   */
  async getPageSpeed(url: string): Promise<DataForSeoPageSpeed> {
    const cacheKey = `pagespeed:${url}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<DataForSeoPageSpeed>(cacheKey);
      if (cached) {
        console.log(`[DataForSEO] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    // Submit task
    const taskId = await this.submitTask('page_speed/task_post', [
      {
        url,
        device: 'desktop',
        audits: [
          'largest-contentful-paint',
          'first-input-delay',
          'cumulative-layout-shift',
          'first-contentful-paint',
          'speed-index',
          'time-to-interactive',
          'total-blocking-time',
        ],
      },
    ]);

    // Poll for results
    const result = await this.pollTaskResults(`page_speed/task_get/${taskId}`);

    const pageSpeedResult = this.parsePageSpeedResult(result, url);

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, pageSpeedResult);
    }

    return pageSpeedResult;
  }

  /**
   * Get backlink data for domain
   */
  async getBacklinkData(
    domain: string,
    limit: number = 100
  ): Promise<DataForSeoBacklink[]> {
    const cacheKey = `backlinks:${domain}:${limit}`;

    if (this.config.cacheEnabled) {
      const cached = this.cache.get<DataForSeoBacklink[]>(cacheKey);
      if (cached) {
        console.log(`[DataForSEO] Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    // Submit task
    const taskId = await this.submitTask('backlinks/backlinks/task_post', [
      {
        target: domain,
        mode: 'domain',
        limit,
        order_by: ['rank_desc'],
      },
    ]);

    // Poll for results
    const result = await this.pollTaskResults(
      `backlinks/backlinks/task_get/${taskId}`
    );

    const backlinks = this.parseBacklinksResult(result);

    if (this.config.cacheEnabled) {
      this.cache.set(cacheKey, backlinks);
    }

    return backlinks;
  }

  /**
   * Submit task to DataForSEO API
   */
  private async submitTask(
    endpoint: string,
    data: any[]
  ): Promise<string> {
    return dataForSeoRateLimiter.execute(async () => {
      console.log(`[DataForSEO] Submitting task: ${endpoint}`);

      const response = await this.client.post(endpoint, data);

      if (response.data.status_code !== 20000) {
        throw new Error(
          `DataForSEO API error: ${response.data.status_message}`
        );
      }

      const tasks: DataForSeoTask[] = response.data.tasks;
      if (!tasks || tasks.length === 0) {
        throw new Error('No tasks returned from DataForSEO API');
      }

      const taskId = tasks[0].id;
      console.log(`[DataForSEO] Task submitted: ${taskId}`);

      return taskId;
    }, 5);
  }

  /**
   * Poll task results until completed or timeout
   */
  private async pollTaskResults(endpoint: string): Promise<any> {
    const startTime = Date.now();

    while (Date.now() - startTime < this.config.pollTimeoutMs) {
      await this.sleep(this.config.pollIntervalMs);

      const response = await dataForSeoRateLimiter.execute(
        async () => this.client.get(endpoint),
        3
      );

      if (response.data.status_code !== 20000) {
        throw new Error(
          `DataForSEO API error: ${response.data.status_message}`
        );
      }

      const tasks: DataForSeoTask[] = response.data.tasks;
      if (!tasks || tasks.length === 0) {
        continue;
      }

      const task = tasks[0];

      if (task.status === 'completed') {
        console.log(`[DataForSEO] Task completed: ${endpoint}`);
        return task.result?.[0] || {};
      }

      if (task.status === 'failed') {
        throw new Error(`DataForSEO task failed: ${task.statusMessage}`);
      }

      console.log(`[DataForSEO] Task status: ${task.status}, polling...`);
    }

    throw new Error('DataForSEO task timeout');
  }

  /**
   * Parse SERP result
   */
  private parseSerpResult(
    data: any,
    keyword: string,
    location: string
  ): DataForSeoSerpResult {
    const items = data.items || [];

    return {
      keyword,
      location,
      language: 'en',
      items: items.map((item: any, index: number) => ({
        position: index + 1,
        url: item.url || '',
        domain: item.domain || '',
        title: item.title || '',
        description: item.description || '',
        breadcrumb: item.breadcrumb || undefined,
        rating: item.rating
          ? {
              value: item.rating.value,
              votesCount: item.rating.votes_count,
            }
          : undefined,
      })),
      totalResults: data.total_count || 0,
    };
  }

  /**
   * Parse on-page result
   */
  private parseOnPageResult(data: any, url: string): DataForSeoOnPage {
    const page = data.pages?.[0] || {};
    const meta = page.meta || {};
    const onPageScore = page.onpage_score || {};

    return {
      url,
      domainRank: onPageScore.domain_rank || 0,
      pageRank: onPageScore.page_rank || 0,
      backlinksCount: page.external_links_count || 0,
      internalLinksCount: page.internal_links_count || 0,
      externalLinksCount: page.external_links_count || 0,
      brokenLinksCount: page.broken_links || 0,
      brokenResourcesCount: page.broken_resources || 0,
      title: meta.title || '',
      description: meta.description || '',
      h1: meta.h1 || [],
      contentSize: page.size || 0,
      wordCount: page.word_count || 0,
      duplicateContent: page.duplicate_content || false,
      loadTime: page.load_time || 0,
      mobileOptimized: page.is_mobile || false,
    };
  }

  /**
   * Parse page speed result
   */
  private parsePageSpeedResult(data: any, url: string): DataForSeoPageSpeed {
    const audits = data.audits || {};

    return {
      url,
      desktopScore: data.desktop_score || 0,
      mobileScore: data.mobile_score || 0,
      largestContentfulPaint:
        audits['largest-contentful-paint']?.score || 0,
      firstInputDelay: audits['first-input-delay']?.score || 0,
      cumulativeLayoutShift:
        audits['cumulative-layout-shift']?.score || 0,
      firstContentfulPaint:
        audits['first-contentful-paint']?.score || 0,
      timeToInteractive: audits['time-to-interactive']?.score || 0,
      speedIndex: audits['speed-index']?.score || 0,
      totalBlockingTime: audits['total-blocking-time']?.score || 0,
    };
  }

  /**
   * Parse backlinks result
   */
  private parseBacklinksResult(data: any): DataForSeoBacklink[] {
    const items = data.items || [];

    return items.map((item: any) => ({
      sourceUrl: item.source_url || '',
      targetUrl: item.target_url || '',
      anchorText: item.anchor || '',
      linkType: item.type || 'dofollow',
      firstSeen: item.first_seen || '',
      lastSeen: item.last_seen || '',
      domainRank: item.domain_rank || 0,
      pageRank: item.page_rank || 0,
      externalLinksCount: item.external_links_count || 0,
    }));
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
    console.log('[DataForSEO] Cache cleared');
  }

  /**
   * Get cache stats
   */
  getCacheStats() {
    return this.cache.getStats();
  }
}

// Export singleton instance
export const dataForSeoClient = new DataForSeoClient({
  login: process.env.DATAFORSEO_LOGIN || '',
  password: process.env.DATAFORSEO_PASSWORD || '',
});

/**
 * Competitor Analysis Service
 *
 * Main orchestration service for analyzing competitors
 * Combines SEMRUSH + DataForSEO data and stores results in database
 */

import { PrismaClient } from '@prisma/client';
import { semrushClient } from '../api-clients/semrush-client';
import { dataForSeoClient } from '../api-clients/dataforseo-client';
import type {
  CompetitorAnalysisData,
  AnalysisProgress,
} from '../types';

const prisma = new PrismaClient();

export class CompetitorAnalysisService {
  /**
   * Analyze a single competitor - full analysis
   */
  async analyzeCompetitor(competitorId: string): Promise<CompetitorAnalysisData> {
    console.log(`[Analysis] Starting full analysis for competitor: ${competitorId}`);

    // Get competitor from database
    const competitor = await prisma.competitor.findUnique({
      where: { id: competitorId },
    });

    if (!competitor) {
      throw new Error(`Competitor not found: ${competitorId}`);
    }

    const domain = competitor.domain;
    const progress = this.createProgressTracker(competitorId, domain);

    try {
      // Phase 1: SEMRUSH data
      progress.update('semrush', 20);
      const semrushData = await this.fetchSemrushData(domain);

      // Phase 2: DataForSEO data
      progress.update('dataforseo', 50);
      const dataForSeoData = await this.fetchDataForSeoData(domain);

      // Phase 3: Process and combine data
      progress.update('processing', 80);
      const analysisData = this.combineAnalysisData(
        competitorId,
        domain,
        semrushData,
        dataForSeoData
      );

      // Phase 4: Store in database
      await this.storeAnalysis(analysisData);

      // Store keywords
      await this.storeKeywords(competitorId, semrushData.keywords);

      // Store backlinks
      await this.storeBacklinks(competitorId, semrushData.backlinks);

      // Update competitor last analyzed timestamp
      await prisma.competitor.update({
        where: { id: competitorId },
        data: { lastAnalyzedAt: new Date() },
      });

      progress.update('completed', 100);
      console.log(`[Analysis] Completed analysis for: ${domain}`);

      return analysisData;
    } catch (error: any) {
      progress.update('failed', 0, error.message);
      throw error;
    }
  }

  /**
   * Analyze all competitors in a category
   */
  async analyzeAllCompetitors(
    category?: string
  ): Promise<CompetitorAnalysisData[]> {
    console.log(`[Analysis] Starting batch analysis${category ? ` for category: ${category}` : ''}`);

    const competitors = await prisma.competitor.findMany({
      where: {
        isActive: true,
        ...(category && { category: category as any }),
      },
      orderBy: { priority: 'desc' },
    });

    console.log(`[Analysis] Found ${competitors.length} competitors to analyze`);

    const results: CompetitorAnalysisData[] = [];
    const errors: Array<{ competitorId: string; error: string }> = [];

    // Process in batches of 5 to avoid overwhelming APIs
    const batchSize = 5;
    for (let i = 0; i < competitors.length; i += batchSize) {
      const batch = competitors.slice(i, i + batchSize);

      const batchPromises = batch.map(async (competitor) => {
        try {
          return await this.analyzeCompetitor(competitor.id);
        } catch (error: any) {
          console.error(`[Analysis] Error analyzing ${competitor.domain}:`, error.message);
          errors.push({
            competitorId: competitor.id,
            error: error.message,
          });
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter((r) => r !== null) as CompetitorAnalysisData[]);

      // Wait between batches to respect rate limits
      if (i + batchSize < competitors.length) {
        console.log(`[Analysis] Batch ${i / batchSize + 1} complete, waiting 5s...`);
        await this.sleep(5000);
      }
    }

    console.log(`[Analysis] Batch analysis complete: ${results.length} successes, ${errors.length} failures`);

    return results;
  }

  /**
   * Refresh analysis for a competitor
   */
  async refreshAnalysis(competitorId: string): Promise<CompetitorAnalysisData> {
    console.log(`[Analysis] Refreshing analysis for: ${competitorId}`);
    return this.analyzeCompetitor(competitorId);
  }

  /**
   * Fetch SEMRUSH data
   */
  private async fetchSemrushData(domain: string) {
    console.log(`[SEMRUSH] Fetching data for: ${domain}`);

    const [overview, keywords, backlinks] = await Promise.all([
      semrushClient.getDomainOverview(domain),
      semrushClient.getOrganicKeywords(domain, 200),
      semrushClient.getBacklinks(domain, 200),
    ]);

    return { overview, keywords, backlinks };
  }

  /**
   * Fetch DataForSEO data
   */
  private async fetchDataForSeoData(domain: string) {
    console.log(`[DataForSEO] Fetching data for: ${domain}`);

    const url = `https://${domain}`;

    try {
      const [pageSpeed, backlinks] = await Promise.all([
        dataForSeoClient.getPageSpeed(url),
        dataForSeoClient.getBacklinkData(domain, 100),
      ]);

      return { pageSpeed, backlinks };
    } catch (error: any) {
      console.warn(`[DataForSEO] Error fetching data for ${domain}: ${error.message}`);
      // Return empty data if DataForSEO fails
      return {
        pageSpeed: {
          url,
          desktopScore: 0,
          mobileScore: 0,
          largestContentfulPaint: 0,
          firstInputDelay: 0,
          cumulativeLayoutShift: 0,
          firstContentfulPaint: 0,
          timeToInteractive: 0,
          speedIndex: 0,
          totalBlockingTime: 0,
        },
        backlinks: [],
      };
    }
  }

  /**
   * Combine analysis data from both sources
   */
  private combineAnalysisData(
    competitorId: string,
    domain: string,
    semrushData: any,
    dataForSeoData: any
  ): CompetitorAnalysisData {
    return {
      competitorId,
      domain,

      // Traffic metrics from SEMRUSH
      organicTraffic: semrushData.overview.organicTraffic,
      paidTraffic: semrushData.overview.paidTraffic,
      totalKeywords: semrushData.overview.organicKeywords + semrushData.overview.paidKeywords,
      organicKeywords: semrushData.overview.organicKeywords,
      paidKeywords: semrushData.overview.paidKeywords,

      // Authority metrics (placeholder - would come from backlink analysis)
      domainRating: 0, // Calculate from backlink profile
      trustFlow: undefined,
      citationFlow: undefined,

      // Backlink metrics
      totalBacklinks: semrushData.backlinks.length + dataForSeoData.backlinks.length,
      referringDomains: new Set([
        ...semrushData.backlinks.map((b: any) => this.extractDomain(b.sourceUrl)),
        ...dataForSeoData.backlinks.map((b: any) => this.extractDomain(b.sourceUrl)),
      ]).size,

      // Technical SEO from DataForSEO
      pageSpeed: dataForSeoData.pageSpeed.desktopScore,
      mobileScore: dataForSeoData.pageSpeed.mobileScore,
      coreWebVitals: {
        lcp: dataForSeoData.pageSpeed.largestContentfulPaint,
        fid: dataForSeoData.pageSpeed.firstInputDelay,
        cls: dataForSeoData.pageSpeed.cumulativeLayoutShift,
      },

      // Content metrics (would need on-page analysis)
      totalPages: 0,
      blogPosts: 0,
      servicePages: 0,

      // Metadata
      analysisDate: new Date(),
      dataSource: 'Combined',
      rawData: {
        semrush: semrushData.overview,
        dataForSeo: dataForSeoData.pageSpeed,
      },
    };
  }

  /**
   * Store analysis in database
   */
  private async storeAnalysis(data: CompetitorAnalysisData): Promise<void> {
    await prisma.competitorAnalysis.create({
      data: {
        competitorId: data.competitorId,
        organicTraffic: data.organicTraffic,
        paidTraffic: data.paidTraffic,
        totalKeywords: data.totalKeywords,
        organicKeywords: data.organicKeywords,
        paidKeywords: data.paidKeywords,
        domainRating: data.domainRating,
        totalBacklinks: data.totalBacklinks,
        referringDomains: data.referringDomains,
        pageSpeed: data.pageSpeed,
        mobileScore: data.mobileScore,
        coreWebVitals: data.coreWebVitals as any,
        totalPages: data.totalPages,
        blogPosts: data.blogPosts,
        servicePages: data.servicePages,
        analysisDate: data.analysisDate,
        dataSource: data.dataSource,
        rawData: data.rawData as any,
      },
    });

    console.log(`[Database] Stored analysis for: ${data.domain}`);
  }

  /**
   * Store keywords in database
   */
  private async storeKeywords(competitorId: string, keywords: any[]): Promise<void> {
    const keywordData = keywords.map((kw) => ({
      competitorId,
      keyword: kw.keyword,
      searchVolume: kw.searchVolume,
      difficulty: kw.competitionLevel * 100, // Convert 0-1 to 0-100
      cpc: kw.cpc,
      position: kw.position,
      previousPosition: kw.previousPosition,
      url: kw.url,
      lastChecked: new Date(),
    }));

    // Use upsert to handle duplicates
    for (const kw of keywordData) {
      await prisma.competitorKeyword.upsert({
        where: {
          competitorId_keyword: {
            competitorId: kw.competitorId,
            keyword: kw.keyword,
          },
        },
        update: {
          searchVolume: kw.searchVolume,
          difficulty: kw.difficulty,
          cpc: kw.cpc,
          position: kw.position,
          previousPosition: kw.previousPosition,
          url: kw.url,
          lastChecked: kw.lastChecked,
        },
        create: kw,
      });
    }

    console.log(`[Database] Stored ${keywords.length} keywords for competitor: ${competitorId}`);
  }

  /**
   * Store backlinks in database
   */
  private async storeBacklinks(competitorId: string, backlinks: any[]): Promise<void> {
    const backlinkData = backlinks.slice(0, 200).map((bl) => ({
      competitorId,
      sourceUrl: bl.sourceUrl,
      targetUrl: bl.targetUrl,
      sourceDomain: this.extractDomain(bl.sourceUrl),
      anchorText: bl.anchorText,
      linkType: bl.linkType,
      firstSeen: new Date(bl.firstSeen),
      lastSeen: new Date(bl.lastSeen),
      isActive: true,
    }));

    // Batch insert
    await prisma.backlink.createMany({
      data: backlinkData,
      skipDuplicates: true,
    });

    console.log(`[Database] Stored ${backlinkData.length} backlinks for competitor: ${competitorId}`);
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  /**
   * Create progress tracker
   */
  private createProgressTracker(competitorId: string, domain: string) {
    const progress: AnalysisProgress = {
      competitorId,
      domain,
      stage: 'semrush',
      progress: 0,
      startedAt: new Date(),
    };

    return {
      update: (
        stage: AnalysisProgress['stage'],
        progressPercent: number,
        error?: string
      ) => {
        progress.stage = stage;
        progress.progress = progressPercent;
        if (error) progress.error = error;

        console.log(
          `[Progress] ${domain}: ${stage} - ${progressPercent}%${error ? ` (Error: ${error})` : ''}`
        );
      },
    };
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton
export const competitorAnalysisService = new CompetitorAnalysisService();

/**
 * SWOT Analysis Service
 *
 * Generates automated SWOT (Strengths, Weaknesses, Opportunities, Threats)
 * analysis for competitors based on collected data.
 *
 * Can be enhanced with AI insights using OpenAI/HuggingFace integration.
 */

import { PrismaClient } from '@prisma/client';
import type {
  SWOTAnalysisResult,
  SWOTItem,
  CompetitorAnalysisData,
} from '../types';

const prisma = new PrismaClient();

export class SWOTAnalysisService {
  /**
   * Generate SWOT analysis for a competitor
   */
  async generateSWOT(competitorId: string): Promise<SWOTAnalysisResult> {
    console.log(`[SWOT] Generating analysis for competitor: ${competitorId}`);

    // Get competitor data
    const competitor = await prisma.competitor.findUnique({
      where: { id: competitorId },
      include: {
        analyses: {
          orderBy: { analysisDate: 'desc' },
          take: 1,
        },
        keywords: {
          orderBy: { searchVolume: 'desc' },
          take: 100,
        },
        backlinks: {
          where: { isActive: true },
          take: 100,
        },
      },
    });

    if (!competitor) {
      throw new Error(`Competitor not found: ${competitorId}`);
    }

    const latestAnalysis = competitor.analyses[0];
    if (!latestAnalysis) {
      throw new Error(`No analysis data found for competitor: ${competitorId}`);
    }

    // Generate SWOT components
    const strengths = this.identifyStrengths(latestAnalysis, competitor);
    const weaknesses = this.identifyWeaknesses(latestAnalysis, competitor);
    const opportunities = this.identifyOpportunities(latestAnalysis, competitor);
    const threats = this.identifyThreats(latestAnalysis, competitor);

    // Generate summary and recommendations
    const summary = this.generateSummary(strengths, weaknesses, opportunities, threats);
    const recommendations = this.generateRecommendations(weaknesses, opportunities);
    const competitiveAdvantages = this.identifyCompetitiveAdvantages(strengths);

    const swotResult: SWOTAnalysisResult = {
      competitorId,
      strengths,
      weaknesses,
      opportunities,
      threats,
      summary,
      recommendations,
      competitiveAdvantages,
      generatedAt: new Date(),
      generatedBy: 'Hybrid', // Automated with manual enhancement capability
    };

    // Store in database
    await this.storeSWOT(swotResult);

    console.log(`[SWOT] Analysis complete for: ${competitor.name}`);

    return swotResult;
  }

  /**
   * Identify strengths based on competitor data
   */
  private identifyStrengths(analysis: any, competitor: any): SWOTItem[] {
    const strengths: SWOTItem[] = [];

    // High organic traffic
    if (analysis.organicTraffic > 10000) {
      strengths.push({
        title: 'Strong Organic Traffic',
        description: `Receives ${analysis.organicTraffic.toLocaleString()} monthly organic visits, indicating strong SEO performance and brand awareness.`,
        impact: 'high',
        source: 'SEMRUSH Traffic Data',
        metrics: { organicTraffic: analysis.organicTraffic },
      });
    }

    // Large keyword portfolio
    if (analysis.organicKeywords > 1000) {
      strengths.push({
        title: 'Extensive Keyword Rankings',
        description: `Ranks for ${analysis.organicKeywords.toLocaleString()} organic keywords, providing multiple entry points for potential customers.`,
        impact: 'high',
        source: 'SEMRUSH Keyword Data',
        metrics: { organicKeywords: analysis.organicKeywords },
      });
    }

    // Strong backlink profile
    if (analysis.totalBacklinks > 500) {
      strengths.push({
        title: 'Robust Backlink Profile',
        description: `Has ${analysis.totalBacklinks.toLocaleString()} backlinks from ${analysis.referringDomains} domains, indicating strong domain authority.`,
        impact: 'high',
        source: 'Backlink Analysis',
        metrics: {
          totalBacklinks: analysis.totalBacklinks,
          referringDomains: analysis.referringDomains,
        },
      });
    }

    // Good page speed
    if (analysis.pageSpeed > 80) {
      strengths.push({
        title: 'Excellent Page Speed',
        description: `PageSpeed score of ${analysis.pageSpeed}/100 provides superior user experience and SEO advantage.`,
        impact: 'medium',
        source: 'DataForSEO PageSpeed',
        metrics: { pageSpeed: analysis.pageSpeed },
      });
    }

    // Mobile optimized
    if (analysis.mobileScore > 80) {
      strengths.push({
        title: 'Mobile-Optimized',
        description: `Mobile score of ${analysis.mobileScore}/100 ensures excellent experience on mobile devices.`,
        impact: 'medium',
        source: 'DataForSEO Mobile Score',
        metrics: { mobileScore: analysis.mobileScore },
      });
    }

    // High priority competitor
    if (competitor.priority >= 9) {
      strengths.push({
        title: 'Market Leader Position',
        description: `Identified as a high-priority competitor (${competitor.priority}/10), indicating significant market presence.`,
        impact: 'high',
        source: 'Market Analysis',
        metrics: { priority: competitor.priority },
      });
    }

    return strengths;
  }

  /**
   * Identify weaknesses based on competitor data
   */
  private identifyWeaknesses(analysis: any, competitor: any): SWOTItem[] {
    const weaknesses: SWOTItem[] = [];

    // Low organic traffic
    if (analysis.organicTraffic < 1000) {
      weaknesses.push({
        title: 'Limited Organic Visibility',
        description: `Only ${analysis.organicTraffic.toLocaleString()} monthly organic visits, indicating SEO improvement opportunities.`,
        impact: 'high',
        source: 'SEMRUSH Traffic Data',
        metrics: { organicTraffic: analysis.organicTraffic },
      });
    }

    // Small keyword portfolio
    if (analysis.organicKeywords < 100) {
      weaknesses.push({
        title: 'Limited Keyword Coverage',
        description: `Ranks for only ${analysis.organicKeywords} keywords, missing significant search visibility opportunities.`,
        impact: 'high',
        source: 'SEMRUSH Keyword Data',
        metrics: { organicKeywords: analysis.organicKeywords },
      });
    }

    // Weak backlink profile
    if (analysis.totalBacklinks < 50) {
      weaknesses.push({
        title: 'Weak Backlink Profile',
        description: `Only ${analysis.totalBacklinks} backlinks indicates low domain authority and limited off-page SEO.`,
        impact: 'high',
        source: 'Backlink Analysis',
        metrics: { totalBacklinks: analysis.totalBacklinks },
      });
    }

    // Poor page speed
    if (analysis.pageSpeed < 50) {
      weaknesses.push({
        title: 'Poor Page Speed',
        description: `PageSpeed score of ${analysis.pageSpeed}/100 may harm user experience and search rankings.`,
        impact: 'medium',
        source: 'DataForSEO PageSpeed',
        metrics: { pageSpeed: analysis.pageSpeed },
      });
    }

    // Mobile issues
    if (analysis.mobileScore < 50) {
      weaknesses.push({
        title: 'Mobile Experience Issues',
        description: `Mobile score of ${analysis.mobileScore}/100 may lose mobile-first indexing advantages.`,
        impact: 'high',
        source: 'DataForSEO Mobile Score',
        metrics: { mobileScore: analysis.mobileScore },
      });
    }

    // Poor Core Web Vitals
    const cwv = analysis.coreWebVitals as any;
    if (cwv && (cwv.lcp > 2500 || cwv.fid > 100 || cwv.cls > 0.1)) {
      weaknesses.push({
        title: 'Core Web Vitals Issues',
        description: `Poor Core Web Vitals (LCP: ${cwv.lcp}ms, FID: ${cwv.fid}ms, CLS: ${cwv.cls}) may impact search rankings.`,
        impact: 'medium',
        source: 'DataForSEO Core Web Vitals',
        metrics: cwv,
      });
    }

    return weaknesses;
  }

  /**
   * Identify opportunities based on competitor data
   */
  private identifyOpportunities(analysis: any, competitor: any): SWOTItem[] {
    const opportunities: SWOTItem[] = [];

    // Keyword gap opportunities
    opportunities.push({
      title: 'Keyword Gap Exploitation',
      description: `Competitor ranks for ${analysis.organicKeywords} keywords - analyze gaps to find untapped keyword opportunities.`,
      impact: 'high',
      source: 'Keyword Gap Analysis',
      metrics: { organicKeywords: analysis.organicKeywords },
    });

    // Backlink opportunities
    if (analysis.referringDomains > 10) {
      opportunities.push({
        title: 'Backlink Acquisition',
        description: `Competitor has backlinks from ${analysis.referringDomains} domains - target these sites for our own link building.`,
        impact: 'high',
        source: 'Backlink Analysis',
        metrics: { referringDomains: analysis.referringDomains },
      });
    }

    // Content gap opportunities
    if (analysis.blogPosts > 0 || analysis.servicePages > 0) {
      opportunities.push({
        title: 'Content Gap Analysis',
        description: `Competitor has content across multiple pages - analyze topics and formats to identify content opportunities.`,
        impact: 'medium',
        source: 'Content Analysis',
        metrics: {
          blogPosts: analysis.blogPosts,
          servicePages: analysis.servicePages,
        },
      });
    }

    // Technical SEO improvements
    if (analysis.pageSpeed < 90 || analysis.mobileScore < 90) {
      opportunities.push({
        title: 'Technical SEO Advantage',
        description: `Competitor has technical SEO weaknesses - we can outperform with better page speed and mobile optimization.`,
        impact: 'medium',
        source: 'Technical SEO Analysis',
        metrics: {
          pageSpeed: analysis.pageSpeed,
          mobileScore: analysis.mobileScore,
        },
      });
    }

    // Geographic expansion
    if (competitor.geographicFocus && competitor.geographicFocus.length < 8) {
      opportunities.push({
        title: 'Geographic Expansion',
        description: `Competitor operates in ${competitor.geographicFocus.length} states - opportunity to target underserved regions.`,
        impact: 'high',
        source: 'Geographic Analysis',
        metrics: { states: competitor.geographicFocus },
      });
    }

    return opportunities;
  }

  /**
   * Identify threats based on competitor data
   */
  private identifyThreats(analysis: any, competitor: any): SWOTItem[] {
    const threats: SWOTItem[] = [];

    // Strong competitor growth
    if (analysis.organicTraffic > 50000) {
      threats.push({
        title: 'Market Leader Competition',
        description: `Competitor receives ${analysis.organicTraffic.toLocaleString()} monthly visits, indicating significant market dominance.`,
        impact: 'high',
        source: 'Traffic Analysis',
        metrics: { organicTraffic: analysis.organicTraffic },
      });
    }

    // Large keyword coverage
    if (analysis.organicKeywords > 5000) {
      threats.push({
        title: 'Extensive Keyword Dominance',
        description: `Competitor ranks for ${analysis.organicKeywords.toLocaleString()} keywords, capturing significant search visibility.`,
        impact: 'high',
        source: 'Keyword Analysis',
        metrics: { organicKeywords: analysis.organicKeywords },
      });
    }

    // Strong domain authority
    if (analysis.totalBacklinks > 1000) {
      threats.push({
        title: 'High Domain Authority',
        description: `Competitor has ${analysis.totalBacklinks.toLocaleString()} backlinks, making it difficult to outrank for competitive keywords.`,
        impact: 'high',
        source: 'Backlink Analysis',
        metrics: { totalBacklinks: analysis.totalBacklinks },
      });
    }

    // Insurance network threat
    if (competitor.category === 'INSURANCE_NETWORK') {
      threats.push({
        title: 'Insurance Network Control',
        description: `Competitor is an insurance network with direct policyholder access, bypassing traditional marketing channels.`,
        impact: 'high',
        source: 'Business Model Analysis',
        metrics: { category: competitor.category },
      });
    }

    // Marketplace platform threat
    if (competitor.category === 'CONTRACTOR_MARKETPLACE') {
      threats.push({
        title: 'Marketplace Platform Advantage',
        description: `Competitor operates a marketplace platform, capturing leads and controlling contractor-client relationships.`,
        impact: 'high',
        source: 'Business Model Analysis',
        metrics: { category: competitor.category },
      });
    }

    return threats;
  }

  /**
   * Generate summary of SWOT analysis
   */
  private generateSummary(
    strengths: SWOTItem[],
    weaknesses: SWOTItem[],
    opportunities: SWOTItem[],
    threats: SWOTItem[]
  ): string {
    return `SWOT Analysis reveals ${strengths.length} key strengths, ${weaknesses.length} areas for improvement, ${opportunities.length} opportunities to exploit, and ${threats.length} competitive threats to monitor. Focus on leveraging strengths while addressing critical weaknesses, particularly in ${weaknesses[0]?.title.toLowerCase() || 'key areas'}.`;
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    weaknesses: SWOTItem[],
    opportunities: SWOTItem[]
  ): string[] {
    const recommendations: string[] = [];

    // Address weaknesses
    for (const weakness of weaknesses.slice(0, 3)) {
      recommendations.push(
        `Address ${weakness.title.toLowerCase()}: ${weakness.description.split('.')[0]}`
      );
    }

    // Exploit opportunities
    for (const opportunity of opportunities.slice(0, 3)) {
      recommendations.push(
        `Capitalize on ${opportunity.title.toLowerCase()}: ${opportunity.description.split('.')[0]}`
      );
    }

    return recommendations;
  }

  /**
   * Identify competitive advantages
   */
  private identifyCompetitiveAdvantages(strengths: SWOTItem[]): string[] {
    return strengths
      .filter((s) => s.impact === 'high')
      .map((s) => s.title);
  }

  /**
   * Store SWOT analysis in database
   */
  private async storeSWOT(swot: SWOTAnalysisResult): Promise<void> {
    await prisma.sWOTAnalysis.create({
      data: {
        competitorId: swot.competitorId,
        strengths: swot.strengths as any,
        weaknesses: swot.weaknesses as any,
        opportunities: swot.opportunities as any,
        threats: swot.threats as any,
        summary: swot.summary,
        recommendations: swot.recommendations as any,
        competitiveAdvantages: swot.competitiveAdvantages as any,
        generatedAt: swot.generatedAt,
        generatedBy: swot.generatedBy,
      },
    });

    console.log(`[Database] Stored SWOT analysis for: ${swot.competitorId}`);
  }

  /**
   * Get latest SWOT analysis for competitor
   */
  async getSWOT(competitorId: string): Promise<SWOTAnalysisResult | null> {
    const swot = await prisma.sWOTAnalysis.findFirst({
      where: { competitorId },
      orderBy: { generatedAt: 'desc' },
    });

    if (!swot) {
      return null;
    }

    return {
      competitorId: swot.competitorId,
      strengths: swot.strengths as any,
      weaknesses: swot.weaknesses as any,
      opportunities: swot.opportunities as any,
      threats: swot.threats as any,
      summary: swot.summary || undefined,
      recommendations: swot.recommendations as any,
      competitiveAdvantages: swot.competitiveAdvantages as any,
      generatedAt: swot.generatedAt,
      generatedBy: swot.generatedBy as any,
    };
  }
}

// Export singleton
export const swotAnalysisService = new SWOTAnalysisService();

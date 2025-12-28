/**
 * Keyword Gap Service
 *
 * Identifies keyword opportunities by analyzing gaps between
 * target domain and competitors.
 *
 * Opportunity scoring algorithm:
 * score = (searchVolume / 1000) * 0.3 +
 *         ((100 - difficulty) / 100) * 0.4 +
 *         (competitorCount / 10) * 0.2 +
 *         ((100 - avgPosition) / 100) * 0.1
 *
 * Classification:
 * - Easy: difficulty < 30, competitors < 3
 * - Medium: difficulty 30-60, competitors 3-7
 * - Hard: difficulty > 60, competitors > 7
 */

import { PrismaClient } from '@prisma/client';
import { semrushClient } from '../api-clients/semrush-client';
import type {
  KeywordGapAnalysis,
  OpportunityScore,
  SemrushKeyword,
} from '../types';

const prisma = new PrismaClient();

export class KeywordGapService {
  /**
   * Find keyword gaps between target domain and competitors
   */
  async findKeywordGaps(
    targetDomain: string,
    competitorDomains: string[]
  ): Promise<KeywordGapAnalysis[]> {
    console.log(`[KeywordGap] Analyzing gaps for: ${targetDomain}`);
    console.log(`[KeywordGap] Against ${competitorDomains.length} competitors`);

    // Get target domain keywords
    const targetKeywords = await semrushClient.getOrganicKeywords(targetDomain, 500);
    const targetKeywordSet = new Set(targetKeywords.map((kw) => kw.keyword));

    // Get competitor keywords
    const competitorKeywordsMap = new Map<string, SemrushKeyword[]>();
    for (const domain of competitorDomains) {
      const keywords = await semrushClient.getOrganicKeywords(domain, 500);
      competitorKeywordsMap.set(domain, keywords);
    }

    // Find gaps (keywords competitors rank for but target doesn't)
    const gaps = new Map<string, KeywordGapAnalysis>();

    for (const [domain, keywords] of competitorKeywordsMap) {
      for (const kw of keywords) {
        // Skip if target already ranks for this keyword
        if (targetKeywordSet.has(kw.keyword)) {
          continue;
        }

        if (gaps.has(kw.keyword)) {
          // Update existing gap
          const existing = gaps.get(kw.keyword)!;
          existing.competitors.push({
            domain,
            position: kw.position,
            url: kw.url,
          });
        } else {
          // Create new gap
          gaps.set(kw.keyword, {
            keyword: kw.keyword,
            searchVolume: kw.searchVolume,
            difficulty: kw.competitionLevel * 100,
            cpc: kw.cpc,
            competitorCount: 1,
            averagePosition: kw.position,
            gapScore: 0, // Calculate later
            difficultyTier: 'medium',
            category: this.categorizeKeyword(kw.keyword),
            intent: this.detectIntent(kw.keyword),
            competitors: [
              {
                domain,
                position: kw.position,
                url: kw.url,
              },
            ],
          });
        }
      }
    }

    // Calculate scores and classify
    const gapArray = Array.from(gaps.values());
    for (const gap of gapArray) {
      gap.competitorCount = gap.competitors.length;
      gap.averagePosition =
        gap.competitors.reduce((sum, c) => sum + c.position, 0) /
        gap.competitorCount;

      const score = this.calculateOpportunityScore(gap);
      gap.gapScore = score.score;
      gap.difficultyTier = score.tier;
    }

    // Sort by gap score descending
    gapArray.sort((a, b) => b.gapScore - a.gapScore);

    console.log(`[KeywordGap] Found ${gapArray.length} keyword opportunities`);

    return gapArray;
  }

  /**
   * Classify opportunities by difficulty tier
   */
  classifyOpportunities(keywords: KeywordGapAnalysis[]): {
    easy: KeywordGapAnalysis[];
    medium: KeywordGapAnalysis[];
    hard: KeywordGapAnalysis[];
  } {
    const easy = keywords.filter((kw) => kw.difficultyTier === 'easy');
    const medium = keywords.filter((kw) => kw.difficultyTier === 'medium');
    const hard = keywords.filter((kw) => kw.difficultyTier === 'hard');

    console.log(`[KeywordGap] Classification: ${easy.length} easy, ${medium.length} medium, ${hard.length} hard`);

    return { easy, medium, hard };
  }

  /**
   * Calculate opportunity score for a keyword
   *
   * Scoring formula:
   * - 30% weight: Search volume (higher is better)
   * - 40% weight: Difficulty (lower is better)
   * - 20% weight: Competition (more competitors = more valuable)
   * - 10% weight: Average position (lower position = easier to outrank)
   */
  calculateOpportunityScore(keyword: KeywordGapAnalysis): OpportunityScore {
    const volumeScore = Math.min((keyword.searchVolume / 1000) * 30, 30);
    const difficultyScore = ((100 - keyword.difficulty) / 100) * 40;
    const competitionScore = Math.min((keyword.competitorCount / 10) * 20, 20);
    const positionScore = ((100 - keyword.averagePosition) / 100) * 10;

    const score = volumeScore + difficultyScore + competitionScore + positionScore;

    // Determine tier based on difficulty and competition
    let tier: 'easy' | 'medium' | 'hard';
    if (keyword.difficulty < 30 && keyword.competitorCount < 3) {
      tier = 'easy';
    } else if (keyword.difficulty > 60 || keyword.competitorCount > 7) {
      tier = 'hard';
    } else {
      tier = 'medium';
    }

    return {
      keyword: keyword.keyword,
      score: Math.round(score * 100) / 100,
      factors: {
        volumeScore: Math.round(volumeScore * 100) / 100,
        difficultyScore: Math.round(difficultyScore * 100) / 100,
        competitionScore: Math.round(competitionScore * 100) / 100,
        positionScore: Math.round(positionScore * 100) / 100,
      },
      tier,
    };
  }

  /**
   * Store keyword opportunities in database
   */
  async storeOpportunities(
    opportunities: KeywordGapAnalysis[]
  ): Promise<void> {
    console.log(`[Database] Storing ${opportunities.length} keyword opportunities`);

    for (const opp of opportunities) {
      await prisma.keywordOpportunity.upsert({
        where: { keyword: opp.keyword },
        update: {
          searchVolume: opp.searchVolume,
          difficulty: opp.difficulty,
          cpc: opp.cpc,
          competitorCount: opp.competitorCount,
          averagePosition: opp.averagePosition,
          gapScore: opp.gapScore,
          difficultyTier: opp.difficultyTier,
          category: opp.category,
          intent: opp.intent,
          competitors: opp.competitors as any,
        },
        create: {
          keyword: opp.keyword,
          searchVolume: opp.searchVolume,
          difficulty: opp.difficulty,
          cpc: opp.cpc,
          competitorCount: opp.competitorCount,
          averagePosition: opp.averagePosition,
          gapScore: opp.gapScore,
          difficultyTier: opp.difficultyTier,
          category: opp.category,
          intent: opp.intent,
          competitors: opp.competitors as any,
        },
      });
    }

    console.log(`[Database] Stored keyword opportunities successfully`);
  }

  /**
   * Get top opportunities by tier
   */
  async getTopOpportunities(
    tier?: 'easy' | 'medium' | 'hard',
    limit: number = 50
  ): Promise<KeywordGapAnalysis[]> {
    const opportunities = await prisma.keywordOpportunity.findMany({
      where: tier ? { difficultyTier: tier } : undefined,
      orderBy: { gapScore: 'desc' },
      take: limit,
    });

    return opportunities.map((opp) => ({
      keyword: opp.keyword,
      searchVolume: opp.searchVolume,
      difficulty: opp.difficulty,
      cpc: opp.cpc || 0,
      competitorCount: opp.competitorCount,
      averagePosition: opp.averagePosition,
      gapScore: opp.gapScore,
      difficultyTier: opp.difficultyTier as 'easy' | 'medium' | 'hard',
      category: opp.category || undefined,
      intent: opp.intent as any,
      competitors: opp.competitors as any,
    }));
  }

  /**
   * Categorize keyword based on content
   */
  private categorizeKeyword(keyword: string): string | undefined {
    const lowerKeyword = keyword.toLowerCase();

    // Disaster recovery categories
    if (lowerKeyword.includes('water') || lowerKeyword.includes('flood')) {
      return 'water_damage';
    }
    if (lowerKeyword.includes('fire') || lowerKeyword.includes('smoke')) {
      return 'fire_damage';
    }
    if (lowerKeyword.includes('mould') || lowerKeyword.includes('mold')) {
      return 'mould_remediation';
    }
    if (lowerKeyword.includes('restoration') || lowerKeyword.includes('restore')) {
      return 'restoration';
    }
    if (lowerKeyword.includes('emergency') || lowerKeyword.includes('urgent')) {
      return 'emergency_response';
    }

    return undefined;
  }

  /**
   * Detect search intent based on keyword
   */
  private detectIntent(
    keyword: string
  ): 'informational' | 'commercial' | 'transactional' | 'navigational' {
    const lowerKeyword = keyword.toLowerCase();

    // Transactional keywords
    const transactionalWords = [
      'hire',
      'book',
      'call',
      'emergency',
      'service',
      'near me',
      'cost',
      'price',
      'quote',
    ];
    if (transactionalWords.some((word) => lowerKeyword.includes(word))) {
      return 'transactional';
    }

    // Commercial keywords
    const commercialWords = [
      'best',
      'top',
      'review',
      'compare',
      'vs',
      'cheap',
      'affordable',
    ];
    if (commercialWords.some((word) => lowerKeyword.includes(word))) {
      return 'commercial';
    }

    // Informational keywords
    const informationalWords = [
      'what',
      'how',
      'why',
      'guide',
      'tips',
      'diy',
      'prevent',
      'causes',
    ];
    if (informationalWords.some((word) => lowerKeyword.includes(word))) {
      return 'informational';
    }

    // Default to commercial for brand/product searches
    return 'commercial';
  }

  /**
   * Generate keyword gap report
   */
  async generateGapReport(
    targetDomain: string,
    competitorCategory?: string
  ): Promise<{
    summary: {
      totalOpportunities: number;
      easyOpportunities: number;
      mediumOpportunities: number;
      hardOpportunities: number;
      totalSearchVolume: number;
      averageDifficulty: number;
    };
    topOpportunities: KeywordGapAnalysis[];
    byCategory: Record<string, KeywordGapAnalysis[]>;
  }> {
    // Get competitor domains from database
    const competitors = await prisma.competitor.findMany({
      where: {
        isActive: true,
        ...(competitorCategory && { category: competitorCategory as any }),
      },
      select: { domain: true },
    });

    const competitorDomains = competitors.map((c) => c.domain);

    // Find gaps
    const gaps = await this.findKeywordGaps(targetDomain, competitorDomains);

    // Classify
    const { easy, medium, hard } = this.classifyOpportunities(gaps);

    // Calculate summary
    const summary = {
      totalOpportunities: gaps.length,
      easyOpportunities: easy.length,
      mediumOpportunities: medium.length,
      hardOpportunities: hard.length,
      totalSearchVolume: gaps.reduce((sum, g) => sum + g.searchVolume, 0),
      averageDifficulty:
        gaps.reduce((sum, g) => sum + g.difficulty, 0) / gaps.length,
    };

    // Top 50 opportunities
    const topOpportunities = gaps.slice(0, 50);

    // Group by category
    const byCategory: Record<string, KeywordGapAnalysis[]> = {};
    for (const gap of gaps) {
      if (gap.category) {
        if (!byCategory[gap.category]) {
          byCategory[gap.category] = [];
        }
        byCategory[gap.category].push(gap);
      }
    }

    return { summary, topOpportunities, byCategory };
  }
}

// Export singleton
export const keywordGapService = new KeywordGapService();

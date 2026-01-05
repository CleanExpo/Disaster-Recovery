/**
 * Blue Ocean Intelligence - Opportunity Detection System
 *
 * 6 detection algorithms to discover untapped SEO opportunities:
 * 1. Adjacent Problems - PAA analysis
 * 2. Question Mining - GSC low-CTR questions
 * 3. Emerging Trends - SEMrush growth detection
 * 4. Underserved Segments - Geographic gaps
 * 5. Format Gaps - SERP feature opportunities
 * 6. Language Gaps - Technical vs consumer keyword variations
 */

import { prisma } from '@/lib/prisma';
import { dataForSEOClient } from '@/lib/integrations/dataforseo-client';
import { semrushClient } from '@/lib/integrations/semrush-client';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export type OpportunityType =
  | 'ADJACENT_PROBLEM'
  | 'QUESTION_GAP'
  | 'EMERGING_TREND'
  | 'GEOGRAPHIC_GAP'
  | 'FORMAT_GAP'
  | 'LANGUAGE_GAP';

export type OpportunityPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type OpportunityStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DISMISSED';

export type SearchIntent = 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL' | 'COMMERCIAL';

export interface DetectedOpportunity {
  type: OpportunityType;
  keyword: string;
  description: string;
  score: number; // 0-100
  priority: OpportunityPriority;
  searchVolume: number;
  competitorCount: number;
  detectionSource: string; // e.g., "Algorithm 1: Adjacent Problems"
  metadata: Record<string, any>; // Algorithm-specific data
}

export interface OpportunityStats {
  totalDetected: number;
  byAlgorithm: Record<string, number>;
  byPriority: Record<OpportunityPriority, number>;
  duplicatesRemoved: number;
}

export interface DetectOpportunitiesOptions {
  algorithms?: string[]; // Run specific algorithms only
  minScore?: number; // Filter results by minimum score
  limit?: number; // Max opportunities to return
  skipDeduplication?: boolean; // For testing
}

export interface DetectOpportunitiesResult {
  opportunities: any[]; // BlueOceanOpportunity[] (Prisma type)
  stats: OpportunityStats;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get monthly search volume for a keyword from SEMrush
 */
export async function getSearchVolume(keyword: string): Promise<number> {
  try {
    // SEMrush API call for search volume
    // Cache results for 24 hours
    const result = await semrushClient.getKeywordOverview(keyword, 'au');
    return result?.volume || 0;
  } catch (error) {
    console.error(`[Blue Ocean] Failed to get search volume for "${keyword}":`, error);
    return 0;
  }
}

/**
 * Get competitor count (unique domains ranking top 20) for a keyword
 */
export async function getCompetitorCount(keyword: string): Promise<number> {
  try {
    // DataForSEO SERP API
    const serp = await dataForSEOClient.getSERP(keyword, 'Australia', 'en');
    if (!serp?.items) return 0;

    // Count unique domains, exclude our own
    const domains = new Set<string>();
    for (const item of serp.items.slice(0, 20)) {
      if (item.domain && item.domain !== 'disasterrecovery.com.au') {
        domains.add(item.domain);
      }
    }

    return domains.size;
  } catch (error) {
    console.error(`[Blue Ocean] Failed to get competitor count for "${keyword}":`, error);
    return 0;
  }
}

/**
 * Classify search intent based on keyword patterns
 */
export function classifyIntent(keyword: string): SearchIntent {
  const lower = keyword.toLowerCase();

  // Question words = INFORMATIONAL
  const questionWords = ['how', 'what', 'why', 'when', 'where', 'who', 'which', 'can', 'should', 'does'];
  if (questionWords.some((word) => lower.startsWith(word + ' '))) {
    return 'INFORMATIONAL';
  }

  // Brand names or specific domains = NAVIGATIONAL
  if (lower.includes('disaster recovery') || lower.includes('login') || lower.includes('contact')) {
    return 'NAVIGATIONAL';
  }

  // Transactional keywords
  const transactionalWords = ['buy', 'price', 'cost', 'quote', 'hire', 'book', 'order', 'purchase'];
  if (transactionalWords.some((word) => lower.includes(word))) {
    return 'TRANSACTIONAL';
  }

  // Commercial investigation
  const commercialWords = ['best', 'top', 'review', 'vs', 'compare', 'alternative'];
  if (commercialWords.some((word) => lower.includes(word))) {
    return 'COMMERCIAL';
  }

  // Default to INFORMATIONAL
  return 'INFORMATIONAL';
}

/**
 * Extract keywords from text for deduplication
 */
export function extractKeywords(text: string): string[] {
  // Tokenize
  const tokens = text.toLowerCase().split(/\s+/);

  // Stop words to remove
  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'from',
    'as',
    'is',
    'was',
    'are',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'should',
    'could',
    'may',
    'might',
    'must',
    'can',
  ]);

  // Filter and deduplicate
  const keywords = tokens
    .filter((token) => token.length > 2 && !stopWords.has(token))
    .map((token) => token.replace(/[^a-z0-9]/g, ''))
    .filter((token) => token.length > 2);

  return Array.from(new Set(keywords));
}

// ============================================================================
// Scoring Engine
// ============================================================================

/**
 * Calculate opportunity score (0-100) based on volume, growth, gap, and competition
 */
export function calculateScore(params: {
  searchVolume: number;
  growthRate?: number; // Percentage (e.g., 50 for 50% growth)
  currentRank?: number | null; // null if not ranking
  competitorCount: number;
}): number {
  const { searchVolume, growthRate = 0, currentRank, competitorCount } = params;

  // Volume component (0-1)
  let volume = 0.1;
  if (searchVolume > 5000) volume = 1.0;
  else if (searchVolume > 1000) volume = 0.7;
  else if (searchVolume > 500) volume = 0.5;
  else if (searchVolume > 100) volume = 0.3;

  // Growth component (0-2)
  let growth = 1.0;
  if (growthRate < 0) growth = 0.3; // Declining
  else if (growthRate > 100) growth = 2.0; // >100% growth
  else if (growthRate > 50) growth = 1.6; // 50-100% growth
  else if (growthRate > 0) growth = 1.3; // 0-50% growth

  // Gap component (0-1)
  let gap = 1.0;
  if (currentRank === null) {
    gap = 1.0; // Not ranking = maximum opportunity
  } else if (currentRank === 1) {
    gap = 0.1; // #1 = maintain, not huge opportunity
  } else if (currentRank <= 5) {
    gap = 0.4; // #2-5 = optimize
  } else if (currentRank <= 10) {
    gap = 0.7; // #6-10 = push
  } else {
    gap = 0.9; // #11+ = attack
  }

  // Competition component (divisor 1-3)
  let competition = 1.0;
  if (competitorCount > 100) competition = 3.0; // Very high
  else if (competitorCount > 50) competition = 2.0; // High
  else if (competitorCount > 20) competition = 1.5; // Medium
  else competition = 1.0; // Low

  // Calculate raw score
  const rawScore = (volume * growth * gap) / competition;

  // Normalize to 0-100
  // Maximum possible raw score: (1.0 * 2.0 * 1.0) / 1.0 = 2.0
  // Normalize: rawScore / 2.0 * 100
  const normalized = Math.min(100, (rawScore / 2.0) * 100);

  return Math.round(normalized);
}

/**
 * Classify priority based on score
 */
export function classifyPriority(score: number): OpportunityPriority {
  if (score >= 90) return 'CRITICAL';
  if (score >= 75) return 'HIGH';
  if (score >= 50) return 'MEDIUM';
  return 'LOW';
}

// ============================================================================
// Deduplication System
// ============================================================================

/**
 * Check if two opportunities are duplicates using Jaccard similarity
 */
export function isDuplicate(
  opp1: { keyword: string; description: string },
  opp2: { keyword: string; description: string }
): boolean {
  // Extract keywords from both
  const keywords1 = extractKeywords(opp1.keyword + ' ' + opp1.description);
  const keywords2 = extractKeywords(opp2.keyword + ' ' + opp2.description);

  if (keywords1.length === 0 || keywords2.length === 0) return false;

  // Calculate Jaccard similarity
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);

  const intersection = keywords1.filter((k) => set2.has(k)).length;
  const union = new Set([...keywords1, ...keywords2]).size;

  const similarity = intersection / union;

  // >70% keyword overlap = duplicate
  return similarity > 0.7;
}

/**
 * Deduplicate opportunities, keeping highest scores
 */
export function deduplicateOpportunities(opportunities: DetectedOpportunity[]): {
  deduplicated: DetectedOpportunity[];
  duplicatesRemoved: number;
} {
  const unique: DetectedOpportunity[] = [];
  let duplicatesRemoved = 0;

  for (const opp of opportunities) {
    // Check if this opportunity is duplicate of any in unique list
    const existingIndex = unique.findIndex((existing) => isDuplicate(existing, opp));

    if (existingIndex === -1) {
      // Not a duplicate, add to unique list
      unique.push(opp);
    } else {
      // Duplicate found
      duplicatesRemoved++;

      // Keep the one with higher score
      if (opp.score > unique[existingIndex].score) {
        // Merge detection sources
        const merged = {
          ...opp,
          detectionSource: `${unique[existingIndex].detectionSource}, ${opp.detectionSource}`,
        };
        unique[existingIndex] = merged;
      } else {
        // Keep existing, but merge sources
        unique[existingIndex].detectionSource += `, ${opp.detectionSource}`;
      }
    }
  }

  return { deduplicated: unique, duplicatesRemoved };
}

// ============================================================================
// Detection Algorithms
// ============================================================================

/**
 * Algorithm 1: Adjacent Problems Detector
 * Analyzes "People Also Ask" boxes from top-ranking keywords
 */
async function detectAdjacentProblems(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 1: Adjacent Problems...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // Get top 100 ranking keywords (position 1-3)
    const topKeywords = await prisma.rankingRecord.findMany({
      where: {
        position: { lte: 3 },
      },
      orderBy: {
        timestamp: 'desc',
      },
      distinct: ['keyword'],
      take: 100,
    });

    console.log(`[Blue Ocean] Analyzing ${topKeywords.length} top-ranking keywords for PAA...`);

    // Track all PAA questions
    const paaQuestions = new Map<string, number>(); // question -> frequency

    // For each top keyword, fetch SERP with PAA
    for (const record of topKeywords.slice(0, 20)) {
      // Limit to avoid rate limits
      try {
        const serp = await dataForSEOClient.getSERP(record.keyword, 'Australia', 'en');

        // Extract PAA questions
        if (serp?.people_also_ask) {
          for (const paa of serp.people_also_ask) {
            const question = paa.question || '';
            if (question) {
              paaQuestions.set(question, (paaQuestions.get(question) || 0) + 1);
            }
          }
        }
      } catch (error) {
        console.error(`[Blue Ocean] Failed to fetch SERP for "${record.keyword}":`, error);
      }
    }

    console.log(`[Blue Ocean] Found ${paaQuestions.size} unique PAA questions`);

    // Filter PAA questions that are relevant to disaster recovery
    const relevantTerms = [
      'flood',
      'fire',
      'mould',
      'water damage',
      'smoke',
      'restoration',
      'cleanup',
      'damage',
      'emergency',
      'disaster',
    ];

    for (const [question, frequency] of paaQuestions.entries()) {
      const isRelevant = relevantTerms.some((term) => question.toLowerCase().includes(term));
      if (!isRelevant) continue;

      // Check if we have content targeting this question
      // For now, simple keyword match in RankingRecord
      const existingContent = await prisma.rankingRecord.findFirst({
        where: {
          keyword: {
            contains: question.toLowerCase().slice(0, 50), // Partial match
            mode: 'insensitive',
          },
        },
      });

      if (!existingContent) {
        // Opportunity! We don't have content for this question
        const searchVolume = await getSearchVolume(question);
        const competitorCount = await getCompetitorCount(question);

        const score = calculateScore({
          searchVolume,
          competitorCount,
          currentRank: null,
        });

        // Boost score based on PAA frequency
        const boostedScore = Math.min(100, score + frequency * 5);

        opportunities.push({
          type: 'ADJACENT_PROBLEM',
          keyword: question,
          description: `PAA question appearing ${frequency}x in top keywords. No existing content coverage.`,
          score: boostedScore,
          priority: classifyPriority(boostedScore),
          searchVolume,
          competitorCount,
          detectionSource: 'Algorithm 1: Adjacent Problems',
          metadata: {
            paaFrequency: frequency,
            sourceKeywords: topKeywords.slice(0, 5).map((k) => k.keyword),
          },
        });
      }
    }

    console.log(`[Blue Ocean] Algorithm 1 detected ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 1 failed:', error);
  }

  return opportunities;
}

/**
 * Algorithm 2: Question Mining Detector
 * Finds high-impression, low-CTR questions from GSC
 */
async function detectQuestionGaps(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 2: Question Mining...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // Note: Requires Google Search Console API integration
    // For now, return placeholder
    console.log('[Blue Ocean] GSC integration not yet available - Algorithm 2 skipped');

    // TODO: Implement GSC query:
    // - Impressions > 100
    // - CTR < 5%
    // - Query contains question words
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 2 failed:', error);
  }

  return opportunities;
}

/**
 * Algorithm 3: Emerging Trends Detector
 * Catches rising search trends from SEMrush
 */
async function detectEmergingTrends(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 3: Emerging Trends...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // SEMrush Keyword Magic with trend filters
    const trendingKeywords = await semrushClient.getTrendingKeywords({
      database: 'au',
      category: 'restoration',
      minGrowth: 50, // >50% growth
      minVolume: 100,
    });

    for (const keyword of trendingKeywords || []) {
      // Check our current ranking
      const currentRank = await prisma.rankingRecord.findFirst({
        where: { keyword: keyword.keyword },
        orderBy: { timestamp: 'desc' },
      });

      if (!currentRank || currentRank.position > 10) {
        const score = calculateScore({
          searchVolume: keyword.volume,
          growthRate: keyword.growth,
          currentRank: currentRank?.position || null,
          competitorCount: keyword.competitorCount || 0,
        });

        opportunities.push({
          type: 'EMERGING_TREND',
          keyword: keyword.keyword,
          description: `Growing ${keyword.growth}% month-over-month. ${keyword.volume} searches/month.`,
          score,
          priority: classifyPriority(score),
          searchVolume: keyword.volume,
          competitorCount: keyword.competitorCount || 0,
          detectionSource: 'Algorithm 3: Emerging Trends',
          metadata: {
            growth: keyword.growth,
            trendVelocity: keyword.velocity || 'accelerating',
          },
        });
      }
    }

    console.log(`[Blue Ocean] Algorithm 3 detected ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 3 failed:', error);
  }

  return opportunities;
}

/**
 * Algorithm 4: Underserved Segments Detector
 * Finds geographic areas with demand but no coverage
 */
async function detectUnderservedSegments(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 4: Underserved Segments...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // Get all service areas
    const allAreas = await prisma.contractorServiceArea.findMany({
      where: {
        seoActivated: false, // Not yet activated for SEO
      },
    });

    console.log(`[Blue Ocean] Analyzing ${allAreas.length} unactivated service areas...`);

    for (const area of allAreas.slice(0, 50)) {
      // Limit to avoid API overload
      // Build location-based keyword
      const locationKeyword = `flood restoration ${area.suburb}`;
      const searchVolume = await getSearchVolume(locationKeyword);

      if (searchVolume > 50) {
        // Meaningful search volume
        const competitorCount = await getCompetitorCount(locationKeyword);

        const score = calculateScore({
          searchVolume,
          competitorCount,
          currentRank: null,
        });

        opportunities.push({
          type: 'GEOGRAPHIC_GAP',
          keyword: locationKeyword,
          description: `${area.suburb}, ${area.state} - ${searchVolume} searches/month, no SEO coverage.`,
          score,
          priority: classifyPriority(score),
          searchVolume,
          competitorCount,
          detectionSource: 'Algorithm 4: Underserved Segments',
          metadata: {
            suburb: area.suburb,
            state: area.state,
            postcode: area.postcode,
            population: area.populationTier || 'unknown',
          },
        });
      }
    }

    console.log(`[Blue Ocean] Algorithm 4 detected ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 4 failed:', error);
  }

  return opportunities;
}

/**
 * Algorithm 5: Format Gaps Detector
 * Identifies SERP features competitors own that we don't
 */
async function detectFormatGaps(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 5: Format Gaps...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // Get all tracked keywords
    const trackedKeywords = await prisma.rankingRecord.findMany({
      orderBy: { timestamp: 'desc' },
      distinct: ['keyword'],
      take: 100,
    });

    console.log(`[Blue Ocean] Analyzing SERP features for ${trackedKeywords.length} keywords...`);

    for (const record of trackedKeywords.slice(0, 20)) {
      // If we rank #4-10 but don't have featured snippet, and snippet exists
      if (record.position >= 4 && record.position <= 10 && record.hasFeaturedSnippet && !record.isInAIOverview) {
        const score = calculateScore({
          searchVolume: record.searchVolume || 0,
          currentRank: record.position,
          competitorCount: 10, // Assume moderate competition
        });

        // Boost score because featured snippet = high CTR
        const boostedScore = Math.min(100, score + 15);

        opportunities.push({
          type: 'FORMAT_GAP',
          keyword: record.keyword,
          description: `Ranking #${record.position} but missing featured snippet. Winnable with better formatting.`,
          score: boostedScore,
          priority: classifyPriority(boostedScore),
          searchVolume: record.searchVolume || 0,
          competitorCount: 10,
          detectionSource: 'Algorithm 5: Format Gaps',
          metadata: {
            currentRank: record.position,
            featureType: 'featured_snippet',
            estimatedCTR: '35%',
          },
        });
      }
    }

    console.log(`[Blue Ocean] Algorithm 5 detected ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 5 failed:', error);
  }

  return opportunities;
}

/**
 * Algorithm 6: Language Gaps Detector
 * Finds keyword variations using different language styles
 */
async function detectLanguageGaps(): Promise<DetectedOpportunity[]> {
  console.log('[Blue Ocean] Running Algorithm 6: Language Gaps...');
  const opportunities: DetectedOpportunity[] = [];

  try {
    // Define language mapping: technical -> consumer
    const languagePairs = [
      { technical: 'microbial remediation', consumer: 'mould removal' },
      { technical: 'water extraction', consumer: 'flood cleanup' },
      { technical: 'structural drying', consumer: 'dry out water damage' },
      { technical: 'smoke remediation', consumer: 'smoke smell removal' },
      { technical: 'thermal imaging', consumer: 'find water leaks' },
    ];

    for (const pair of languagePairs) {
      // Check if we rank for technical term
      const technicalRank = await prisma.rankingRecord.findFirst({
        where: { keyword: { contains: pair.technical, mode: 'insensitive' } },
        orderBy: { timestamp: 'desc' },
      });

      // Check if we rank for consumer term
      const consumerRank = await prisma.rankingRecord.findFirst({
        where: { keyword: { contains: pair.consumer, mode: 'insensitive' } },
        orderBy: { timestamp: 'desc' },
      });

      // If we rank for technical but NOT consumer (or rank poorly)
      if (technicalRank && (!consumerRank || consumerRank.position > 10)) {
        const searchVolume = await getSearchVolume(pair.consumer);
        const competitorCount = await getCompetitorCount(pair.consumer);

        // Consumer terms typically have higher volume
        if (searchVolume > 100) {
          const score = calculateScore({
            searchVolume,
            competitorCount,
            currentRank: consumerRank?.position || null,
          });

          opportunities.push({
            type: 'LANGUAGE_GAP',
            keyword: pair.consumer,
            description: `Consumer-friendly alternative to "${pair.technical}". ${searchVolume} searches/month.`,
            score,
            priority: classifyPriority(score),
            searchVolume,
            competitorCount,
            detectionSource: 'Algorithm 6: Language Gaps',
            metadata: {
              technicalTerm: pair.technical,
              consumerTerm: pair.consumer,
              languageStyle: 'consumer',
              intent: classifyIntent(pair.consumer),
            },
          });
        }
      }
    }

    console.log(`[Blue Ocean] Algorithm 6 detected ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[Blue Ocean] Algorithm 6 failed:', error);
  }

  return opportunities;
}

// ============================================================================
// Main Orchestrator
// ============================================================================

/**
 * Main function to detect Blue Ocean opportunities
 * Runs all 6 algorithms in parallel, deduplicates, and saves to database
 */
export async function detectOpportunities(
  options: DetectOpportunitiesOptions = {}
): Promise<DetectOpportunitiesResult> {
  console.log('[Blue Ocean] Starting opportunity detection...');
  console.log('[Blue Ocean] Options:', options);

  const startTime = Date.now();
  const {
    algorithms = ['all'],
    minScore = 50,
    limit = 100,
    skipDeduplication = false,
  } = options;

  try {
    // Run algorithms in parallel
    const algorithmResults = await Promise.allSettled([
      algorithms.includes('all') || algorithms.includes('adjacent-problems')
        ? detectAdjacentProblems()
        : Promise.resolve([]),
      algorithms.includes('all') || algorithms.includes('question-gaps')
        ? detectQuestionGaps()
        : Promise.resolve([]),
      algorithms.includes('all') || algorithms.includes('emerging-trends')
        ? detectEmergingTrends()
        : Promise.resolve([]),
      algorithms.includes('all') || algorithms.includes('underserved-segments')
        ? detectUnderservedSegments()
        : Promise.resolve([]),
      algorithms.includes('all') || algorithms.includes('format-gaps')
        ? detectFormatGaps()
        : Promise.resolve([]),
      algorithms.includes('all') || algorithms.includes('language-gaps')
        ? detectLanguageGaps()
        : Promise.resolve([]),
    ]);

    // Collect all opportunities
    let allOpportunities: DetectedOpportunity[] = [];
    const byAlgorithm: Record<string, number> = {};

    algorithmResults.forEach((result, index) => {
      const algorithmName = [
        'Adjacent Problems',
        'Question Gaps',
        'Emerging Trends',
        'Underserved Segments',
        'Format Gaps',
        'Language Gaps',
      ][index];

      if (result.status === 'fulfilled') {
        allOpportunities.push(...result.value);
        byAlgorithm[algorithmName] = result.value.length;
      } else {
        console.error(`[Blue Ocean] ${algorithmName} algorithm failed:`, result.reason);
        byAlgorithm[algorithmName] = 0;
      }
    });

    console.log(`[Blue Ocean] Total raw opportunities detected: ${allOpportunities.length}`);

    // Deduplication
    let duplicatesRemoved = 0;
    if (!skipDeduplication && allOpportunities.length > 0) {
      const deduped = deduplicateOpportunities(allOpportunities);
      allOpportunities = deduped.deduplicated;
      duplicatesRemoved = deduped.duplicatesRemoved;
      console.log(`[Blue Ocean] Removed ${duplicatesRemoved} duplicates`);
    }

    // Filter by minimum score
    allOpportunities = allOpportunities.filter((opp) => opp.score >= minScore);
    console.log(`[Blue Ocean] After filtering (score >= ${minScore}): ${allOpportunities.length}`);

    // Sort by score descending
    allOpportunities.sort((a, b) => b.score - a.score);

    // Limit results
    if (limit && allOpportunities.length > limit) {
      allOpportunities = allOpportunities.slice(0, limit);
    }

    // Save to database
    const savedOpportunities: any[] = [];
    for (const opp of allOpportunities) {
      try {
        const saved = await saveOpportunity(opp);
        savedOpportunities.push(saved);
      } catch (error) {
        console.error(`[Blue Ocean] Failed to save opportunity "${opp.keyword}":`, error);
      }
    }

    // Calculate stats
    const byPriority: Record<OpportunityPriority, number> = {
      CRITICAL: savedOpportunities.filter((o) => o.priority === 'CRITICAL').length,
      HIGH: savedOpportunities.filter((o) => o.priority === 'HIGH').length,
      MEDIUM: savedOpportunities.filter((o) => o.priority === 'MEDIUM').length,
      LOW: savedOpportunities.filter((o) => o.priority === 'LOW').length,
    };

    const duration = Date.now() - startTime;
    console.log(`[Blue Ocean] Detection complete in ${duration}ms`);
    console.log(`[Blue Ocean] Saved ${savedOpportunities.length} opportunities to database`);

    return {
      opportunities: savedOpportunities,
      stats: {
        totalDetected: allOpportunities.length,
        byAlgorithm,
        byPriority,
        duplicatesRemoved,
      },
    };
  } catch (error) {
    console.error('[Blue Ocean] Detection failed:', error);
    throw error;
  }
}

/**
 * Save opportunity to database (create or update)
 */
async function saveOpportunity(opp: DetectedOpportunity): Promise<any> {
  // Check if opportunity already exists
  const existing = await prisma.blueOceanOpportunity.findFirst({
    where: {
      keyword: opp.keyword,
      status: { not: 'DISMISSED' },
    },
  });

  if (existing) {
    // Update if new score is higher
    if (opp.score > existing.score) {
      return await prisma.blueOceanOpportunity.update({
        where: { id: existing.id },
        data: {
          score: opp.score,
          priority: opp.priority,
          detectionSources: [
            ...(Array.isArray(existing.detectionSources) ? existing.detectionSources : []),
            opp.detectionSource,
          ],
          lastDetectedAt: new Date(),
        },
      });
    }
    return existing;
  }

  // Create new opportunity
  const created = await prisma.blueOceanOpportunity.create({
    data: {
      type: opp.type,
      keyword: opp.keyword,
      description: opp.description,
      score: opp.score,
      priority: opp.priority,
      searchVolume: opp.searchVolume,
      competitorCount: opp.competitorCount,
      detectionSources: [opp.detectionSource],
      metadata: opp.metadata,
      status: 'PENDING',
      lastDetectedAt: new Date(),
    },
  });

  // Create alert for CRITICAL opportunities
  if (opp.priority === 'CRITICAL') {
    await prisma.searchAlert.create({
      data: {
        type: 'BLUE_OCEAN',
        severity: 'CRITICAL',
        title: `New Blue Ocean: ${opp.keyword}`,
        message: `Score ${opp.score}/100 - ${opp.description}`,
        metadata: { opportunityId: created.id },
        actionRequired: true,
      },
    });
  }

  return created;
}

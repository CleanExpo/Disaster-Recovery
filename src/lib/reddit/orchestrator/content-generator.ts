/**
 * Content Generator — AI content generation via Vercel AI SDK
 *
 * Uses Claude Sonnet via generateText() to produce full Reddit posts
 * following the v2.0 system prompt and GEO compliance rules.
 */

import { generateText } from 'ai';
import { contentModel } from './ai-provider';
import { getActiveSystemPrompt } from './system-prompt';
import { getFactsForPost, formatFactAsMarkdown } from '../content/fact-bank';
import { BRAND_REGISTRY } from '../content/brand-cross-links';
import { validateGEOCompliance } from '../content/geo-formatter';
import type { TopicSelection, GeneratedContent } from './types';
import type { PerformanceFeedback } from './types';
import { clientLogger } from '@/lib/observability/client-logger';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a full Reddit post using Claude Sonnet via Vercel AI SDK.
 *
 * Injects:
 * - Selected pillar and topic from TopicSelection
 * - 3-5 relevant facts from FACT_BANK
 * - Brand registry info
 * - Recent performance feedback
 * - The initialisation command
 */
export async function generateRedditPost(
  topic: TopicSelection,
  feedback?: PerformanceFeedback,
  command?: string,
): Promise<GeneratedContent> {
  const { version, prompt: systemPrompt } = await getActiveSystemPrompt();

  // Build fact context
  const facts = topic.facts.length >= 3
    ? topic.facts
    : [...topic.facts, ...getFactsForPost(topic.category, 4 - topic.facts.length)];

  const factContext = facts.map((f) => formatFactAsMarkdown(f)).join('\n');

  // Build brand context
  const brandContext = topic.brands
    .map((id) => {
      const brand = BRAND_REGISTRY[id];
      return `- **${brand.name}** (${brand.url}) — ${brand.anchors[0]}`;
    })
    .join('\n');

  // Build feedback context
  const feedbackContext = feedback
    ? `\n## Recent Performance Feedback\n${feedback.summary}`
    : '';

  // Build user prompt
  const userPrompt = `## Command: ${command || 'DAILY-AUTO'}

## Content Pillar: ${topic.pillarCode} — ${topic.pillarName}
## Topic: ${topic.topic}
## Category: ${topic.category}
## Target Subreddit: r/Disaster_Recovery_Qld

## Available Facts (use these — do NOT fabricate statistics):
${factContext}

## Brand Registry (distribute naturally, max 2 mentions per brand):
${brandContext}
${feedbackContext}

Generate a complete Reddit post following ALL GEO compliance rules in the system prompt.
Return your response as a valid JSON object matching the schema specified in the system prompt.`;

  const result = await generateText({
    model: contentModel,
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: 4096,
    temperature: 0.7,
  });

  // Parse the JSON response
  const parsed = parseGeneratedContent(result.text, topic, version);

  // Run GEO compliance check
  const compliance = validateGEOCompliance(parsed.body);
  if (!compliance.valid) {
    clientLogger.warn('[content-generator] GEO compliance issues:', { source: 'orchestrator/content-generator', data: compliance.issues });
  }

  return {
    ...parsed,
    tokensUsed: result.usage?.totalTokens ?? 0,
    model: 'claude-sonnet-4-20250514',
    promptVersion: version,
  };
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

function parseGeneratedContent(
  text: string,
  topic: TopicSelection,
  promptVersion: string,
): Omit<GeneratedContent, 'tokensUsed' | 'model' | 'promptVersion'> {
  // Try to extract JSON from the response (may be wrapped in markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  const jsonStr = (jsonMatch[1] || text).trim();

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      title: parsed.title || topic.topic,
      body: parsed.body || text,
      tldr: parsed.tldr || '',
      category: parsed.category || topic.category,
      brands: parsed.brands || topic.brands,
      geoSignals: parsed.geoSignals || topic.facts,
    };
  } catch {
    // If JSON parsing fails, use the raw text as the body
    clientLogger.warn('[content-generator] Failed to parse JSON response, using raw text', { source: 'orchestrator/content-generator' });
    return {
      title: topic.topic,
      body: text,
      tldr: '',
      category: topic.category,
      brands: topic.brands,
      geoSignals: topic.facts,
    };
  }
}

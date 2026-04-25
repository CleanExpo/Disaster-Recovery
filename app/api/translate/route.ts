/**
 * /api/translate
 *
 * DR-386: Gemma 4 multilingual translation endpoint.
 * DR-384: PII minimisation layer applied before sending text to the model.
 *
 * Uses @google/genai SDK — model configurable via TRANSLATION_MODEL env var.
 * Default: gemini-1.5-flash (Phase 1 model).
 * TODO DR-430: upgrade to Gemma 4 Vertex AI once DPA signed
 * Swap to a Gemma 4 Vertex AI endpoint by setting TRANSLATION_MODEL.
 *
 * POST { texts: string[], targetLanguage: string }
 *   → { translations: string[], targetLanguage: string }
 *
 * Limits: max 50 texts, total character count ≤ 50,000.
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { SUPPORTED_LANGUAGES } from '@/lib/supported-languages';
import { requestLogger, captureException } from '@/lib/observability';

const translateSchema = z.object({
  texts: z.array(z.string().max(2000)).min(1).max(50),
  targetLanguage: z.enum(Object.keys(SUPPORTED_LANGUAGES) as [string, ...string[]]),
});

// TODO DR-430: upgrade to Gemma 4 Vertex AI once DPA signed
const DEFAULT_MODEL = 'gemini-1.5-flash';

const MAX_TEXTS = 50;
const MAX_TOTAL_CHARS = 50_000;

function getAI(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_GENAI_API_KEY is not configured');
  return new GoogleGenAI({ apiKey });
}

/**
 * DR-384: Minimise PII before sending text to the translation model.
 * Strips/replaces common Australian PII patterns.
 * Brand terms (IICRC, NRPG, DR, Disaster Recovery, RestoreAssist, CARSI) are preserved.
 */
function minimisePII(text: string): string {
  // Replace email addresses with [EMAIL]
  let result = text.replace(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');

  // Replace Australian phone numbers (+61, 04xx, 1300, 1800)
  result = result.replace(
    /(?:\+61[\s\-]?(?:\d[\s\-]?){8,9}|0[45]\d{2}[\s\-]?\d{3}[\s\-]?\d{3}|1[38]00[\s\-]?\d{3}[\s\-]?\d{3}|\(0[2-8]\)[\s\-]?\d{4}[\s\-]?\d{4}|0[2-8][\s\-]?\d{4}[\s\-]?\d{4})/g,
    '[PHONE]',
  );

  // Replace ABN patterns (xx xxx xxx xxx — 11 digits with optional spaces)
  result = result.replace(/\b\d{2}\s\d{3}\s\d{3}\s\d{3}\b/g, '[ABN]');

  // Replace TFN patterns (xxx xxx xxx — 9 digits with spaces)
  result = result.replace(/\b\d{3}\s\d{3}\s\d{3}\b/g, '[TFN]');

  // Replace Australian street addresses: number + street name + type + optional suburb
  // e.g. "12 Main Street", "456 George St Sydney"
  result = result.replace(
    /\b\d{1,5}\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\s+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Place|Pl|Court|Ct|Lane|Ln|Boulevard|Blvd|Crescent|Cres|Parade|Pde|Highway|Hwy|Way|Close|Cl|Circuit|Cct|Grove|Gr|Terrace|Tce)\b(?:\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)*/g,
    '[ADDRESS]',
  );

  return result;
}

/**
 * Build a translation prompt that preserves HTML/markdown and returns
 * a JSON array of translated strings in the same order as input.
 */
function buildPrompt(texts: string[], targetLanguage: string): string {
  const langName = SUPPORTED_LANGUAGES[targetLanguage] ?? targetLanguage;
  return [
    `You are a professional translator for an Australian disaster recovery and property restoration service.`,
    `Translate the following ${texts.length} text item(s) into ${langName} (language code: ${targetLanguage}).`,
    `Rules:`,
    `- Preserve any HTML tags, markdown formatting, and line breaks exactly as they appear.`,
    `- Do not translate proper nouns: "IICRC", "NRPG", "Disaster Recovery", "AFCA", "OAIC", "Stripe", "RestoreAssist", "CARSI".`,
    `- Preserve all URLs, email addresses, phone numbers, and dollar amounts unchanged.`,
    `- Preserve placeholder tokens like [EMAIL], [PHONE], [ADDRESS], [ABN], [TFN] unchanged.`,
    `- Use formal, professional language appropriate for insurance and emergency services.`,
    `- Return ONLY a valid JSON array of ${texts.length} translated string(s), no explanation, no markdown code fences.`,
    ``,
    `Input JSON array:`,
    JSON.stringify(texts),
  ].join('\n');
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/translate' });
  try {
    const body = await request.json();
    const { texts, targetLanguage } = translateSchema.parse(body);

    // Request size limits (DR-386 abuse prevention)
    if (texts.length > MAX_TEXTS) {
      return NextResponse.json({ error: `Too many texts: max ${MAX_TEXTS}` }, { status: 400 });
    }
    const totalChars = texts.reduce((sum, t) => sum + t.length, 0);
    if (totalChars > MAX_TOTAL_CHARS) {
      return NextResponse.json(
        { error: `Total character count exceeds limit of ${MAX_TOTAL_CHARS}` },
        { status: 400 },
      );
    }

    // English is the source language — return as-is
    if (targetLanguage === 'en') {
      return NextResponse.json({ translations: texts, targetLanguage });
    }

    // DR-384: Apply PII minimisation before sending to the model
    const sanitisedTexts = texts.map(minimisePII);

    const ai = getAI();
    const model = process.env.TRANSLATION_MODEL ?? DEFAULT_MODEL;

    const prompt = buildPrompt(sanitisedTexts, targetLanguage);

    const result = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.1,
        maxOutputTokens: 8192,
      },
    });

    const raw = result.text?.trim() ?? '';

    // Strip markdown code fences if the model added them
    const jsonStr = raw
      .replace(/^```(?:json)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    let translations: string[];
    try {
      translations = JSON.parse(jsonStr);
      if (!Array.isArray(translations) || translations.length !== texts.length) {
        throw new Error('Translation response length mismatch');
      }
    } catch {
      // Fallback: return originals if parsing fails
      log.error('failed to parse model response', { raw });
      translations = texts;
    }

    return NextResponse.json({ translations, targetLanguage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 },
      );
    }
    log.error('translate error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/translate' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Translation service unavailable' }, { status: 503 });
  }
}

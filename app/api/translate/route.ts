/**
 * /api/translate
 *
 * DR-358: Gemma 4 multilingual translation endpoint.
 *
 * Uses @google/genai SDK — model configurable via TRANSLATION_MODEL env var.
 * Default: gemini-2.0-flash-lite (fast, low-cost, 140+ language coverage).
 * Swap to a Gemma 4 Vertex AI endpoint by setting TRANSLATION_MODEL.
 *
 * POST { texts: string[], targetLanguage: string }
 *   → { translations: string[], targetLanguage: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { SUPPORTED_LANGUAGES } from '@/lib/supported-languages';

const translateSchema = z.object({
  texts: z.array(z.string().max(2000)).min(1).max(50),
  targetLanguage: z.enum(Object.keys(SUPPORTED_LANGUAGES) as [string, ...string[]]),
});

const DEFAULT_MODEL = 'gemini-2.0-flash-lite';

function getAI(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_GENAI_API_KEY is not configured');
  return new GoogleGenAI({ apiKey });
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
    `- Do not translate proper nouns: "IICRC", "NRPG", "Disaster Recovery Australia", "AFCA", "OAIC", "Stripe", "RestoreAssist", "CARSI".`,
    `- Preserve all URLs, email addresses, phone numbers, and dollar amounts unchanged.`,
    `- Use formal, professional language appropriate for insurance and emergency services.`,
    `- Return ONLY a valid JSON array of ${texts.length} translated string(s), no explanation, no markdown code fences.`,
    ``,
    `Input JSON array:`,
    JSON.stringify(texts),
  ].join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { texts, targetLanguage } = translateSchema.parse(body);

    // English is the source language — return as-is
    if (targetLanguage === 'en') {
      return NextResponse.json({ translations: texts, targetLanguage });
    }

    const ai = getAI();
    const model = process.env.TRANSLATION_MODEL ?? DEFAULT_MODEL;

    const prompt = buildPrompt(texts, targetLanguage);

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
    const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

    let translations: string[];
    try {
      translations = JSON.parse(jsonStr);
      if (!Array.isArray(translations) || translations.length !== texts.length) {
        throw new Error('Translation response length mismatch');
      }
    } catch {
      // Fallback: return originals if parsing fails
      console.error('[translate] Failed to parse model response:', raw);
      translations = texts;
    }

    return NextResponse.json({ translations, targetLanguage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }
    console.error('[translate] Error:', error);
    return NextResponse.json(
      { error: 'Translation service unavailable' },
      { status: 503 }
    );
  }
}

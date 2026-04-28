/**
 * Visual Generator — Nano Banana Pro (Gemini 3 Pro Image) Pipeline
 *
 * Hard-coded generation procedure for the Unite-Group Cinematic Materiality
 * standard. Uses @google/genai SDK to call Nano Banana Pro for photographic-
 * quality raster assets (3D logos, hero images, service visuals).
 *
 * Required env: GOOGLE_GENAI_API_KEY
 */

import { GoogleGenAI } from '@google/genai';
import {
  buildCinematicPrompt,
  type PromptRequest,
  type AspectRatio,
  type Resolution,
} from './visual-prompts';

const MODEL_ID = 'gemini-3-pro-image-preview';

export interface VisualRequest {
  brand: PromptRequest['brand'];
  assetType: PromptRequest['assetType'];
  description: string;
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
}

interface GenerationResult {
  /** Base64-encoded image data */
  imageBase64: string;
  /** MIME type of the generated image */
  mimeType: string;
  /** The full prompt sent to the model */
  prompt: string;
}

function getClient(): GoogleGenAI {
  const apiKey =
    process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GOOGLE_GENAI_API_KEY (or GOOGLE_AI_API_KEY) is not set. ' +
        'Add it to your .env.local or Vercel environment variables.',
    );
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Generate a visual asset using Nano Banana Pro.
 *
 * 1. Builds an Octane-style cinematic prompt from the v3 Environmental Tiering matrix
 * 2. Calls Gemini 3 Pro Image via @google/genai SDK
 * 3. Returns base64 image data for saving or further processing
 */
export async function generateVisual(request: VisualRequest): Promise<GenerationResult> {
  const client = getClient();

  const prompt = buildCinematicPrompt({
    brand: request.brand,
    assetType: request.assetType,
    description: request.description,
    aspectRatio: request.aspectRatio,
    resolution: request.resolution,
  });

  const response = await client.models.generateContent({
    model: MODEL_ID,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
      // @ts-expect-error — image_config is supported by the API but not yet in SDK types
      image_config: {
        aspect_ratio: request.aspectRatio || '16:9',
        image_size: request.resolution || '2K',
      },
    },
  });

  // Extract the image part from the response
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error('No response parts received from Nano Banana Pro');
  }

  const imagePart = (parts as Array<Record<string, unknown>>).find(
    (p) =>
      p.inlineData &&
      typeof (p.inlineData as Record<string, unknown>).mimeType === 'string' &&
      ((p.inlineData as Record<string, unknown>).mimeType as string).startsWith('image/'),
  );

  if (!imagePart?.inlineData) {
    throw new Error(
      'No image data in Nano Banana Pro response. ' +
        'The model may have returned text only. Check your prompt.',
    );
  }

  return {
    imageBase64: (imagePart.inlineData as { data: string }).data,
    mimeType: (imagePart.inlineData as { mimeType: string }).mimeType,
    prompt,
  };
}

/**
 * Re-export buildCinematicPrompt for direct use without importing visual-prompts.
 */
export { buildCinematicPrompt } from './visual-prompts';

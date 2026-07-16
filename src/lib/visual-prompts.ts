/**
 * Visual Prompts — Brand-specific prompt templates for Nano Banana Pro
 *
 * Derived from the v3 Global Visual Framework (Cinematic Materiality standard).
 * Each brand has a unique environment, glow, and material finish that maps to
 * Octane-style rendering directives for photorealistic image generation.
 */

export type BrandKey = 'disaster-recovery' | 'synthex' | 'restore-assist';
export type AssetType = 'hero-image' | 'card-background' | 'logo-render' | 'service-visual';
export type AspectRatio = '16:9' | '1:1' | '5:4';
export type Resolution = '1K' | '2K' | '4K';

interface BrandEnvironment {
  substrate: string;
  glow: string;
  finish: string;
  octaneDirectives: string;
}

/**
 * Brand-specific prompt fragments from the v3 Environmental Tiering matrix.
 */
export const BRAND_ENVIRONMENTS: Record<BrandKey, BrandEnvironment> = {
  'disaster-recovery': {
    substrate: 'Hyper-detailed water ripples, soot-mist, or rain-streaked glass',
    glow: '450nm Deep Blue / 2000K Amber',
    finish: 'Brushed Titanium',
    octaneDirectives:
      'ray-traced metallic reflections on brushed titanium surface, volumetric soot particles, ' +
      '15mm frosted glass pane with refractive index 1.5 distorting water ripple background',
  },
  synthex: {
    substrate: 'Volumetric neural networks and flowing data streams',
    glow: '10,000K Electric Violet / Cyan',
    finish: 'Iridescent Glass',
    octaneDirectives:
      'ray-traced iridescent glass refractions, volumetric data stream particles with electric violet glow, ' +
      '15mm frosted glass pane with refractive index 1.5 distorting neural network substrate',
  },
  'restore-assist': {
    substrate: 'Industry-grade equipment textures (macro-detail)',
    glow: '6500K Clinical White / Safety Orange',
    finish: 'Matte Industrial Grey',
    octaneDirectives:
      'ray-traced matte industrial surfaces with clinical white key light, volumetric dust motes, ' +
      '15mm frosted glass pane with refractive index 1.5 distorting macro-detail equipment background',
  },
};

/**
 * Rendering directive template (Octane-style).
 * Placeholders are replaced by brand-specific values.
 */
const RENDERING_TEMPLATE = `Photorealistic 3D render, Octane-quality.
Ray-tracing: {rayTracing}
Volumetric depth: 15mm frosted glass pane, visible thickness and weight.
Refraction: Background texture distorted through glass with refractive index n=1.5.
Material finish: {materialFinish}
Primary glow: {primaryGlow}
Environment: {macroTexture}
Resolution: {resolution}, sharp detail.`;

/**
 * Asset-type-specific composition guidance.
 */
const ASSET_COMPOSITIONS: Record<AssetType, string> = {
  'hero-image':
    'Wide cinematic composition, shallow depth of field, hero banner framing. ' +
    'Subject centred with atmospheric negative space for text overlay.',
  'card-background':
    'Tight macro composition suitable for card container background. ' +
    'Subtle depth, no prominent foreground subject, optimised for text readability.',
  'logo-render':
    '3D-rendered brand logo with material finish applied. ' +
    'Centred on transparent or substrate background, dramatic rim lighting.',
  'service-visual':
    'Environmental portrait of service activity. ' +
    'Professional equipment visible, safety-realistic, Australian context. ' +
    'Industrial machinery with visible ventilation in enclosed spaces.',
};

const RESOLUTION_MAP: Record<Resolution, string> = {
  '1K': '1024x1024',
  '2K': '2048x2048',
  '4K': '4096x4096',
};

export interface PromptRequest {
  brand: BrandKey;
  assetType: AssetType;
  description: string;
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
}

/**
 * Constructs an Octane-style rendering prompt for Nano Banana Pro.
 *
 * Combines brand environment, asset composition guidance, and the user's
 * description into a single prompt string optimised for photorealistic output.
 */
export function buildCinematicPrompt(request: PromptRequest): string {
  const env = BRAND_ENVIRONMENTS[request.brand];
  const resolution = request.resolution ?? '2K';
  const composition = ASSET_COMPOSITIONS[request.assetType];

  const renderingBlock = RENDERING_TEMPLATE
    .replace('{rayTracing}', env.octaneDirectives)
    .replace('{materialFinish}', env.finish)
    .replace('{primaryGlow}', env.glow)
    .replace('{macroTexture}', env.substrate)
    .replace('{resolution}', RESOLUTION_MAP[resolution]);

  return [
    request.description,
    '',
    composition,
    '',
    renderingBlock,
  ].join('\n');
}

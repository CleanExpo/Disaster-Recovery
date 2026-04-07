/**
 * Reddit Visual Prompts — Nano Banana Pro prompt templates for Reddit hero banners
 *
 * Builds category-specific 16:9 social preview hero banners using the
 * DisasterRecovery brand environment (brushed titanium, deep blue/amber glow)
 * from the v3 Cinematic Materiality standard.
 */

import type { BrandKey } from '../../visual-prompts';
import type { PostCategory, ImageType } from '../reddit-types';
import { BRAND_ENVIRONMENTS } from '../../visual-prompts';

// ---------------------------------------------------------------------------
// Category-specific prompt fragments
// ---------------------------------------------------------------------------

const CATEGORY_PROMPTS: Record<PostCategory, string> = {
  'water-damage':
    'Dramatic aerial view of QLD flooding, emergency response vehicles, professional water extraction equipment, ' +
    'industrial dehumidifiers running in a waterlogged residential interior, standing water reflecting emergency lights, ' +
    'Brisbane suburban street with floodwater receding, restoration crew in branded PPE deploying submersible pumps.',

  insurance:
    'Professional insurance documents on a modern desk, digital claims interface on a large monitor, ' +
    'modern tablet showing a claims dashboard with progress bars and approval status, ' +
    'scattered policy documents with highlighted coverage sections, ' +
    'Brisbane CBD office backdrop through rain-streaked glass.',

  iicrc:
    'IICRC certification badges and credentials displayed prominently, professional training environment ' +
    'with restoration equipment stations, technicians reviewing S500:2025 and S520:2025 standards documentation, ' +
    'hands-on equipment calibration training, certification plaques on an industrial grey wall.',

  mould:
    'Microscopic mould spores in dramatic macro detail, professional remediation technician in full protective gear ' +
    'and P2 respirator, moisture detection equipment with digital readouts showing elevated readings, ' +
    'HEPA air scrubber running in a contained remediation zone with plastic sheeting barriers, ' +
    'infrared thermal image overlay revealing hidden moisture in wall cavities.',

  fire:
    'Australian bushfire smoke haze over a QLD landscape, professional fire damage assessment in progress, ' +
    'charred structural timber elements with visible grain detail, soot-covered interior with restoration ' +
    'team documenting damage on tablets, thermal imaging camera revealing hotspots, ' +
    'industrial air scrubbers and ozone generators staged for smoke odour removal.',

  property:
    'Brisbane high-rise skyline at dusk with amber light, commercial kitchen undergoing professional restoration, ' +
    'strata building exterior with scaffolding and restoration crews, multi-level apartment complex with ' +
    'restoration equipment visible through windows, body corporate documentation and building plans on a desk, ' +
    'professional moisture mapping of a large commercial floor plan.',

  'cost-guide':
    'Professional cost estimation displayed on a tablet with detailed line items, restoration equipment pricing ' +
    'spreadsheet on a modern monitor, detailed scope-of-works report with diagrams and measurements, ' +
    'estimator using a laser measure in a damaged property, transparent pricing breakdown charts, ' +
    'side-by-side cost comparison graphics on a digital display.',

  software:
    'Modern SaaS dashboard interface with real-time restoration job tracking, digital estimating tools ' +
    'displaying Xactimate-style pricing, transparent pricing display on a widescreen monitor, ' +
    'mobile app showing live job status updates and photo documentation, ' +
    'data analytics charts showing restoration project metrics and KPIs.',

  training:
    'Professional training classroom with restoration equipment stations, IICRC certification ceremony ' +
    'with graduates receiving credentials, hands-on equipment training with industrial dehumidifiers and ' +
    'air movers, instructor demonstrating moisture meter calibration, training manual and course materials ' +
    'spread on a workshop bench, Australian training facility with safety signage.',

  network:
    'Australian continental map with illuminated network nodes connecting major cities and remote towns, ' +
    'coverage lines stretching from Coober Pedy to Sydney and Darwin to Hobart, contractor team in ' +
    'branded gear standing before a fleet of service vehicles, satellite view of Australia with ' +
    'glowing connection points at every state capital and regional centre.',
};

// ---------------------------------------------------------------------------
// Image type configs
// ---------------------------------------------------------------------------

export const REDDIT_VISUAL_CONFIGS: Record<ImageType, { description: string; brand: BrandKey; aspectRatio: '16:9' }> = {
  'hero-banner': {
    description: 'Social preview hero banner for Reddit post — cinematic 16:9 composition',
    brand: 'disaster-recovery',
    aspectRatio: '16:9',
  },
  'stat-infographic': {
    description: 'Statistics infographic card — data-driven 16:9 visual',
    brand: 'disaster-recovery',
    aspectRatio: '16:9',
  },
  'comparison-table': {
    description: 'Side-by-side comparison table — structured 16:9 visual',
    brand: 'disaster-recovery',
    aspectRatio: '16:9',
  },
  'process-flow': {
    description: 'Step-by-step process flow diagram — horizontal 16:9 layout',
    brand: 'disaster-recovery',
    aspectRatio: '16:9',
  },
  'cost-breakdown': {
    description: 'Cost breakdown doughnut chart — financial 16:9 visual',
    brand: 'disaster-recovery',
    aspectRatio: '16:9',
  },
};

// ---------------------------------------------------------------------------
// Hero banner prompt builder
// ---------------------------------------------------------------------------

/**
 * Builds a Nano Banana Pro prompt for a Reddit hero banner image.
 *
 * Combines:
 * - Category-specific visual theme (water/flood, fire, mould, etc.)
 * - 16:9 social media hero banner framing
 * - DisasterRecovery brand environment (brushed titanium, deep blue/amber glow)
 * - Australian context (QLD landscapes, Brisbane skyline)
 * - "No text in image" directive
 */
export function buildRedditHeroBannerPrompt(title: string, category: PostCategory): string {
  const env = BRAND_ENVIRONMENTS['disaster-recovery'];
  const categoryFragment = CATEGORY_PROMPTS[category];

  return [
    `Reddit social preview hero banner for: "${title}"`,
    '',
    categoryFragment,
    '',
    'Composition: Wide cinematic 16:9 aspect ratio, social media hero banner framing.',
    'Shallow depth of field with atmospheric negative space.',
    'Australian context — Queensland landscapes, Brisbane skyline where appropriate.',
    '',
    `Material finish: ${env.finish}.`,
    `Primary glow: ${env.glow}.`,
    `Environment: ${env.substrate}.`,
    `Rendering: ${env.octaneDirectives}.`,
    '',
    'IMPORTANT: No text, no words, no letters, no watermarks in the image.',
    'Photorealistic quality, Octane-style rendering, dramatic cinematic lighting.',
  ].join('\n');
}

#!/usr/bin/env tsx
/**
 * Batch generator for mould/efflorescence images.
 * Uses the Nano Banana Pro pipeline (Gemini 3 Pro Image).
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateVisual } from '../src/lib/visual-generator';
import type { VisualRequest } from '../src/lib/visual-generator';

// Load env
function loadEnvFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch { /* skip */ }
}
loadEnvFile(path.join(process.cwd(), '.env.local'));
loadEnvFile(path.join(process.cwd(), '.env'));

interface ImageJob {
  filename: string;
  description: string;
}

const JOBS: ImageJob[] = [
  {
    filename: 'mould-type-aspergillus.webp',
    description:
      'Close-up photograph of green and yellow Aspergillus mould colony growing on damp plasterboard in an Australian residential building. Realistic, detailed texture showing fuzzy spore clusters. Professional restoration documentation style. Macro photography, sharp focus on mould texture.',
  },
  {
    filename: 'mould-type-penicillium.webp',
    description:
      'Close-up photograph of blue-green fuzzy Penicillium mould growing on damp building materials, timber framing and MDF. Realistic texture showing velvety surface. Professional restoration documentation style. Macro photography, sharp focus.',
  },
  {
    filename: 'mould-type-black-mould.webp',
    description:
      'Close-up photograph of toxic black mould Stachybotrys chartarum growing on wet plasterboard gyprock. Dark black-green slimy patches on white wall surface. Professional restoration documentation style showing severity of contamination. Macro photography.',
  },
  {
    filename: 'mould-type-cladosporium.webp',
    description:
      'Close-up photograph of olive-green and brown Cladosporium mould growing around aluminium window frames in an Australian bathroom. Condensation droplets visible on glass. Professional restoration documentation style. Realistic texture.',
  },
  {
    filename: 'mould-type-alternaria.webp',
    description:
      'Close-up photograph of dark grey-brown Alternaria mould in a bathroom shower area, growing on grout lines and silicone sealant between tiles. Realistic velvety texture with dark hairs. Professional restoration documentation style.',
  },
  {
    filename: 'mould-type-chaetomium.webp',
    description:
      'Close-up photograph of white cotton-like Chaetomium mould growing on water-damaged building materials, wet cardboard and damaged plasterboard. Fluffy white growth. Professional restoration documentation style.',
  },
  {
    filename: 'efflorescence-vs-mould.webp',
    description:
      'Photograph showing white crystalline salt deposits known as efflorescence on red brick or concrete block wall. Clear crystalline and powdery texture distinct from fuzzy mould. Professional restoration documentation style showing mineral deposit patterns.',
  },
];

const OUTPUT_DIR = path.join(
  process.cwd(),
  'public',
  'images',
  'generated',
  'disaster-recovery'
);

async function main(): Promise<void> {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const results: { filename: string; size: string; status: string }[] = [];

  for (const job of JOBS) {
    console.log(`\n--- Generating: ${job.filename} ---`);
    console.log(`Description: ${job.description.slice(0, 80)}...`);

    try {
      const request: VisualRequest = {
        brand: 'disaster-recovery',
        assetType: 'service-visual',
        description: job.description,
        aspectRatio: '16:9',
        resolution: '2K',
      };

      const result = await generateVisual(request);

      const outputPath = path.join(OUTPUT_DIR, job.filename);
      const buffer = Buffer.from(result.imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);

      const sizeKB = (buffer.length / 1024).toFixed(1);
      console.log(`  Saved: ${outputPath}`);
      console.log(`  Size: ${sizeKB} KB | MIME: ${result.mimeType}`);

      results.push({ filename: job.filename, size: `${sizeKB} KB`, status: 'OK' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  FAILED: ${msg}`);
      results.push({ filename: job.filename, size: '-', status: `FAIL: ${msg}` });
    }
  }

  console.log('\n\n=== GENERATION SUMMARY ===');
  console.table(results);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

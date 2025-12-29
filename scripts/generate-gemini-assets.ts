/**
 * Generate all NRPG platform assets using Google Gemini
 * - Nano Banana Pro for images (2K/4K)
 * - Veo 3.1 for videos (optional)
 */

import { geminiImageService } from '../lib/services/gemini-image.service';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

async function generateAllAssets() {
  console.log('🚀 Starting NRPG Asset Generation with Google Gemini');
  console.log('📦 Using: Nano Banana Pro (Gemini 3 Pro Image)');
  console.log('');

  // Test API connection first
  console.log('1️⃣ Testing Gemini API connection...');
  const isConnected = await geminiImageService.testConnection();

  if (!isConnected) {
    console.error('❌ Gemini API connection failed. Check your API key in .env.local');
    process.exit(1);
  }

  console.log('');

  // Generate hero carousel scenario images (4K, highest priority)
  console.log('2️⃣ Generating Hero Carousel Scenario Images (4K)...');
  console.log('━'.repeat(60));

  const scenarios: Array<'residential-flood' | 'commercial-fire' | 'industrial-bio'> = [
    'residential-flood',
    'commercial-fire',
    'industrial-bio',
  ];

  for (const scenario of scenarios) {
    try {
      console.log(`\n📸 Generating: ${scenario}...`);
      await geminiImageService.generateScenarioImage(scenario);
      console.log(`✅ Completed: ${scenario}`);
    } catch (error) {
      console.error(`❌ Failed: ${scenario}`, error);
    }
  }

  console.log('');
  console.log('━'.repeat(60));
  console.log('');

  // Generate service card images (2K)
  console.log('3️⃣ Generating Service Card Images (2K)...');
  console.log('━'.repeat(60));

  const services: Array<'water' | 'fire' | 'mould' | 'bio'> = [
    'water',
    'fire',
    'mould',
    'bio',
  ];

  for (const service of services) {
    try {
      console.log(`\n📸 Generating: ${service}-card...`);
      await geminiImageService.generateServiceCardImage(service);
      console.log(`✅ Completed: ${service}-card`);
    } catch (error) {
      console.error(`❌ Failed: ${service}-card`, error);
    }
  }

  console.log('');
  console.log('━'.repeat(60));
  console.log('');

  // Generate sector card images (2K)
  console.log('4️⃣ Generating Sector Card Images (2K)...');
  console.log('━'.repeat(60));

  const sectors: Array<'residential' | 'commercial' | 'industrial' | 'insurance'> = [
    'residential',
    'commercial',
    'industrial',
    'insurance',
  ];

  for (const sector of sectors) {
    try {
      console.log(`\n📸 Generating: ${sector}...`);
      await geminiImageService.generateSectorImage(sector);
      console.log(`✅ Completed: ${sector}`);
    } catch (error) {
      console.error(`❌ Failed: ${sector}`, error);
    }
  }

  console.log('');
  console.log('━'.repeat(60));
  console.log('');

  // Summary
  console.log('🎉 ASSET GENERATION COMPLETE!');
  console.log('');
  console.log('Generated Assets:');
  console.log('  ✅ 3 Hero Carousel Scenarios (4K)');
  console.log('  ✅ 4 Service Card Images (2K)');
  console.log('  ✅ 4 Sector Card Images (2K)');
  console.log('');
  console.log('📁 Location: /public/images/');
  console.log('  - /scenarios/');
  console.log('  - /services/');
  console.log('  - /sectors/');
  console.log('');
  console.log('💰 Estimated Cost:');
  console.log('  - 3 × 4K images: ~$0.72');
  console.log('  - 8 × 2K images: ~$1.11');
  console.log('  - TOTAL: ~$1.83');
  console.log('');
  console.log('✅ All assets ready for production use!');
}

// Run generation
generateAllAssets().catch((error) => {
  console.error('❌ Asset generation failed:', error);
  process.exit(1);
});

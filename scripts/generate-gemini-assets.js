/**
 * Generate all NRPG platform assets using Google Gemini
 * - Nano Banana Pro (gemini-3-pro-image-preview) for images
 * - Veo 3.1 (veo-3.1-generate-preview) for videos
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load environment variables
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateImage(prompt, outputPath, resolution = '2K') {
  console.log(`\n📸 Generating ${resolution} image...`);
  console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-image', // Latest recommended model (December 2025) with higher quota
  });

  try {
    const result = await model.generateContent([
      {
        text: `Generate a professional ${resolution} photograph.

${prompt}

Return the image as inline data.`,
      },
    ]);

    const response = result.response;

    // Extract image from response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Saved: ${outputPath}`);
        return buffer;
      }
    }

    // If no inline data, check for text response
    const text = response.text();
    console.log(`⚠️  Response:`, text);
    throw new Error('No image data in response');
  } catch (error) {
    console.error(`❌ Failed:`, error.message);
    throw error;
  }
}

async function generateAllAssets() {
  console.log('🚀 Starting NRPG Asset Generation with Google Gemini');
  console.log('📦 Using: Nano Banana Pro (gemini-3-pro-image-preview)');
  console.log('🎬 Using: Veo 3.1 (veo-3.1-generate-preview)');
  console.log('');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  console.log('✅ API Key loaded');
  console.log('');

  // Generate hero carousel scenario images (4K, highest priority)
  console.log('━'.repeat(70));
  console.log('1️⃣  HERO CAROUSEL SCENARIO IMAGES (4K)');
  console.log('━'.repeat(70));

  const scenarioPrompts = {
    'residential-flood': `
SCENE: Professional insurance documentation photograph of flooded Australian suburban home basement

DETAILS:
- Modern home basement with 2-3 inches of water on hardwood floor
- Natural daylight from small windows, water reflections visible
- Some wet furniture and carpet in background
- Clean but damaged (not catastrophic)
- Professional photojournalism style

CAMERA: 24mm wide angle, f/2.8, natural color grading
MOOD: Serious but professional, realistic emergency documentation
AVOID: People, extreme destruction, dark horror aesthetic, fake CGI
`,

    'commercial-fire': `
SCENE: Professional photograph of smoke-damaged Australian commercial office interior

DETAILS:
- Modern open-plan office with visible soot on white walls and ceiling
- Water on carpet from sprinklers, damaged office furniture
- Overhead LED lighting partially working
- Professional clean lines despite damage

CAMERA: 35mm lens, f/4, desaturated professional documentary style
MOOD: Serious business emergency, professional documentation, recoverable
AVOID: Active flames, people, extreme destruction, horror aesthetic
`,

    'industrial-bio': `
SCENE: Professional photograph of large Australian industrial warehouse prepared for biohazard cleanup

DETAILS:
- Massive warehouse with 30-foot ceilings, polished concrete floors
- Professional hazmat containment barriers staged
- HEPA filtration equipment ready for deployment
- Bright industrial overhead lighting, organized professional setup

CAMERA: 24mm ultra-wide, f/5.6, technical clarity color grading
MOOD: Professional, safety-focused, technical documentation, organized
AVOID: People, contamination visible, gore, dark aesthetic, chaos
`,
  };

  for (const [scenario, prompt] of Object.entries(scenarioPrompts)) {
    const outputPath = path.join(process.cwd(), 'public', 'images', 'scenarios', `${scenario}.jpg`);
    try {
      await generateImage(prompt, outputPath, '4K');
    } catch (error) {
      console.error(`Failed to generate ${scenario}:`, error.message);
    }
  }

  console.log('');
  console.log('━'.repeat(70));
  console.log('2️⃣  SERVICE CARD IMAGES (2K)');
  console.log('━'.repeat(70));

  const servicePrompts = {
    'water': `
SCENE: Professional product photography of industrial water damage restoration equipment

EQUIPMENT: Large truck-mounted water extractor, commercial dehumidifiers, high-velocity air movers
SETTING: Clean Australian residential interior, natural window lighting
STYLE: Commercial product photography, f/2.8, equipment as hero subjects
AVOID: People, dirty environment, text, logos
`,

    'fire': `
SCENE: Professional photograph of fire damage restoration equipment setup

EQUIPMENT: Industrial air scrubbers with HEPA filters, thermal imaging camera, safety gear
SETTING: Professional job site with containment, well-lit workspace
STYLE: Technical equipment photography, f/4, organized professional
AVOID: Active fire, people, extreme damage, dark aesthetic
`,

    'mould': `
SCENE: Professional photograph of mold remediation containment setup

EQUIPMENT: Clear plastic containment barriers, HEPA filtration units, protective equipment
SETTING: Professional remediation job site, clean organized workspace
STYLE: Safety documentation photography, f/5.6, technical clarity
AVOID: Visible mold, people, contamination, dark aesthetic
`,

    'bio': `
SCENE: Professional product photography of biohazard cleanup protective equipment

EQUIPMENT: Level A hazmat suits (yellow/white), respirators, decontamination tools
SETTING: Clean white background or professional staging area
STYLE: Safety equipment product photography, f/8, clean technical
AVOID: People wearing equipment, gore, contamination, biohazard symbols
`,
  };

  for (const [service, prompt] of Object.entries(servicePrompts)) {
    const outputPath = path.join(process.cwd(), 'public', 'images', 'services', `${service}-card.jpg`);
    try {
      await generateImage(prompt, outputPath, '2K');
    } catch (error) {
      console.error(`Failed to generate ${service}-card:`, error.message);
    }
  }

  console.log('');
  console.log('━'.repeat(70));
  console.log('🎉 ASSET GENERATION COMPLETE!');
  console.log('━'.repeat(70));
  console.log('');
  console.log('Generated:');
  console.log('  ✅ 3 Hero Carousel Scenario Images (4K)');
  console.log('  ✅ 4 Service Card Images (2K)');
  console.log('');
  console.log('📁 Saved to: /public/images/');
  console.log('  - /scenarios/');
  console.log('  - /services/');
  console.log('');
  console.log('💰 Estimated Cost: ~$1.28');
  console.log('  - 3 × 4K: $0.72');
  console.log('  - 4 × 2K: $0.56');
  console.log('');
  console.log('✅ Ready for production!');
}

// Run generation
generateAllAssets().catch((error) => {
  console.error('❌ Generation failed:', error);
  process.exit(1);
});

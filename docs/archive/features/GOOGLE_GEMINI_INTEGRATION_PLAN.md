# Google Gemini Integration Plan - NRPG Platform
**Date**: 2025-12-29
**Tools**: Veo 3.1 (Video) + Nano Banana Pro (Image)
**Purpose**: Generate videos, animations, and images for disaster recovery platform

---

## 🎯 AVAILABLE GOOGLE GEMINI TOOLS (Latest December 2025)

### 1. Veo 3.1 (Video Generation) - October 2025 Release
**Capabilities**:
- Generate 8-second 720p or 1080p videos from text prompts
- Native audio generation (dialogue, sound effects, ambient noise)
- Image-to-video conversion
- Video extension (chain clips to create 60+ second videos)
- Reference images for character/scene consistency
- Cinematic styles and realistic physics

**Pricing**:
- Per video generation (varies by resolution)
- Available via Gemini API

**Use Cases for NRPG**:
- Hero carousel scenario videos (flood, fire, biohazard)
- Service demonstration videos
- Before/after restoration sequences
- Emergency response simulations
- Contractor training materials

---

### 2. Nano Banana Pro (Gemini 3 Pro Image) - November 2025 Release
**Capabilities**:
- Generate 2K or 4K images from text prompts
- Advanced control: camera angles, lighting, depth of field, color grading
- Blend up to 14 objects in single image
- Maintain consistency of up to 5 people
- Best-in-class text rendering in images
- Thinking mode + search grounding
- Image editing through natural language

**Pricing**:
- $0.139 per 1080p/2K image
- $0.24 per 4K image

**Use Cases for NRPG**:
- Hero carousel scenario images (residential flood, commercial fire, industrial biohazard)
- Service pillar cards (water, fire, mold, bio)
- Sector cards (residential, commercial, industrial, insurance)
- Location images (8 states)
- Before/after comparison images
- Emergency response graphics
- Marketing materials

---

### 3. Gemini 2.5 Flash (Nano Banana) - Standard Version
**Capabilities**:
- Generate 1024x1024 images
- Fast generation
- Lower cost alternative
- Good for bulk generation

**Use Cases for NRPG**:
- Blog post images
- Social media graphics
- Icon generation
- UI elements

---

## 🛠️ IMPLEMENTATION PLAN

### Phase 1: API Setup (30 minutes)
1. ✅ Get Gemini API key from Google AI Studio
2. ✅ Add to `.env.local`:
```env
GEMINI_API_KEY=your_api_key_here
```
3. ✅ Install Google Generative AI SDK:
```bash
npm install @google/generative-ai
```

### Phase 2: Image Generation Service (1-2 hours)
Create `/lib/services/gemini-image.service.ts`:
- Nano Banana Pro integration
- Image generation from prompts
- Image editing capabilities
- Batch generation support
- 4K image generation

### Phase 3: Video Generation Service (2-3 hours)
Create `/lib/services/gemini-video.service.ts`:
- Veo 3.1 integration
- Text-to-video generation
- Image-to-video conversion
- Video extension (chaining clips)
- Audio generation

### Phase 4: Asset Generation Scripts (2-3 hours)
Create `/scripts/generate-assets.ts`:
- Generate all hero carousel scenario images
- Generate service pillar card images
- Generate sector images
- Generate location images
- Generate marketing materials

### Phase 5: Video Content Generation (3-4 hours)
Create `/scripts/generate-videos.ts`:
- Generate hero carousel scenario videos
- Generate service demonstration videos
- Generate emergency response videos
- Generate before/after sequences

### Phase 6: UI Integration (2-3 hours)
- Add video players to hero carousel
- Implement lazy loading for large assets
- Add fallback images
- Optimize delivery (CDN)

---

## 📝 DETAILED IMPLEMENTATION

### Service 1: Nano Banana Pro Image Generation

```typescript
// lib/services/gemini-image.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ImageGenerationOptions {
  prompt: string;
  resolution?: '1080p' | '2K' | '4K';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
  style?: string;
  negativePrompt?: string;
  numberOfImages?: number;
}

export class GeminiImageService {
  private model;

  constructor() {
    // Nano Banana Pro = Gemini 3 Pro Preview with image generation
    this.model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-preview',
      generationConfig: {
        responseModalities: ['Text', 'Image'],
        temperature: 0.4,
      },
    });
  }

  async generateImage(options: ImageGenerationOptions): Promise<Buffer> {
    const {
      prompt,
      resolution = '2K',
      aspectRatio = '16:9',
      style = '',
      negativePrompt = '',
      numberOfImages = 1,
    } = options;

    const fullPrompt = `
Generate a professional ${resolution} image with ${aspectRatio} aspect ratio.

STYLE: ${style || 'Photorealistic, professional photography'}

SCENE: ${prompt}

${negativePrompt ? `AVOID: ${negativePrompt}` : ''}

Requirements:
- High detail and clarity
- Professional color grading
- Proper lighting and composition
- Sharp focus on main subject
`;

    const response = await this.model.generateContent(fullPrompt);

    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        return Buffer.from(part.inlineData.data, 'base64');
      }
    }

    throw new Error('No image generated');
  }

  async generateScenarioImage(scenario: string): Promise<Buffer> {
    const prompts = {
      'residential-flood': `
A dramatic but professional photograph of a flooded residential home basement.
Water damage visible, wet carpet and walls, some furniture damaged.
Natural lighting from windows, realistic water reflections.
Professional insurance documentation style.
Shot with wide angle lens, f/2.8, natural color grading.
Australian suburban home interior.
`,
      'commercial-fire': `
A professional photograph of fire damage in a commercial office building.
Smoke-damaged walls and ceiling, water from sprinklers, burned office furniture.
Emergency lighting, dramatic but professional composition.
Insurance documentation photography style.
Shot with 24mm lens, f/4, color graded for clarity.
Modern Australian office interior.
`,
      'industrial-bio': `
A professional photograph of an industrial facility requiring biohazard cleanup.
Large warehouse or manufacturing space, industrial lighting.
Professional hazmat equipment visible, safety protocols in place.
Technical documentation photography style.
Shot with 35mm lens, f/5.6, sharp focus throughout.
Australian industrial facility interior.
`,
    };

    return this.generateImage({
      prompt: prompts[scenario] || scenario,
      resolution: '4K',
      aspectRatio: '16:9',
      style: 'Professional photographic documentation',
    });
  }

  async generateServiceCardImage(service: string): Promise<Buffer> {
    const prompts = {
      water: `
Professional photograph of water damage restoration equipment in action.
Industrial water extractor, dehumidifiers, air movers in clean operation.
Australian home interior, natural lighting, equipment in focus.
Professional clean aesthetic, f/2.8, 50mm lens.
`,
      fire: `
Professional photograph of fire and smoke damage restoration.
Smoke-damaged room being cleaned, professional restoration equipment.
Contractor in protective gear, IICRC certified work environment.
Professional documentation style, natural lighting.
`,
      mould: `
Professional photograph of mold remediation in progress.
Containment barriers, HEPA filtration equipment, protective gear.
Clean professional workspace, proper safety protocols visible.
Technical documentation photography, sharp focus, f/4.
`,
      bio: `
Professional photograph of biohazard cleanup equipment and PPE.
Hazmat suits, decontamination equipment, professional setup.
Industrial clean room aesthetic, technical lighting.
Safety-focused composition, professional color grading.
`,
    };

    return this.generateImage({
      prompt: prompts[service] || service,
      resolution: '2K',
      aspectRatio: '4:3',
    });
  }
}

export const geminiImageService = new GeminiImageService();
```

---

### Service 2: Veo 3.1 Video Generation

```typescript
// lib/services/gemini-video.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface VideoGenerationOptions {
  prompt: string;
  resolution?: '720p' | '1080p';
  duration?: 8; // Veo 3.1 generates 8-second clips
  style?: string;
  referenceImages?: Buffer[];
  audioStyle?: string;
}

export class GeminiVideoService {
  private model;

  constructor() {
    // Veo 3.1 for video generation
    this.model = genAI.getGenerativeModel({
      model: 'veo-3.1',
    });
  }

  async generateVideo(options: VideoGenerationOptions): Promise<Buffer> {
    const {
      prompt,
      resolution = '1080p',
      duration = 8,
      style = '',
      audioStyle = 'ambient background',
    } = options;

    const fullPrompt = `
Generate a professional ${resolution} video (${duration} seconds).

STYLE: ${style || 'Cinematic documentary style, professional'}

SCENE: ${prompt}

AUDIO: ${audioStyle}

Requirements:
- Realistic physics and motion
- Professional cinematography
- Smooth camera movements
- Natural lighting
- High production value
`;

    const response = await this.model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    });

    // Extract video data from response
    for (const part of response.response.candidates[0].content.parts) {
      if (part.videoData) {
        return Buffer.from(part.videoData, 'base64');
      }
    }

    throw new Error('No video generated');
  }

  async generateScenarioVideo(scenario: string): Promise<Buffer> {
    const prompts = {
      'residential-flood': `
8-second cinematic video of emergency water damage response in Australian suburban home.

SEQUENCE:
0-2s: Establish shot of flooded basement, water visible on floor
2-4s: IICRC-certified technician enters with professional equipment
4-6s: Close-up of industrial water extractor in operation
6-8s: Wide shot showing restoration equipment setup, professional atmosphere

CINEMATOGRAPHY:
- Handheld documentary style
- Natural lighting + work lights
- Smooth camera movements
- Professional color grading

AUDIO:
- Ambient water sounds
- Equipment operation sounds
- Professional work environment
`,
      'commercial-fire': `
8-second cinematic video of commercial fire damage restoration response.

SEQUENCE:
0-2s: Establishing shot of smoke-damaged office interior
2-4s: Professional restoration team arriving in protective gear
4-6s: Setting up air scrubbers and dehumidification equipment
6-8s: Team beginning structural assessment and cleanup

CINEMATOGRAPHY:
- Steady cam professional shots
- Emergency lighting + work lights
- Dramatic but professional composition
- Desaturated color grade for serious tone

AUDIO:
- Low ambient sound
- Equipment sounds
- Professional work environment
- No music (serious emergency tone)
`,
      'industrial-bio': `
8-second cinematic video of industrial biohazard cleanup operation.

SEQUENCE:
0-2s: Wide shot of large industrial warehouse interior
2-4s: Hazmat team in full protective suits entering
4-6s: Professional decontamination equipment being deployed
6-8s: Team conducting systematic facility assessment

CINEMATOGRAPHY:
- Wide establishing shots
- Industrial lighting
- Steady professional camera work
- Technical documentary style

AUDIO:
- Industrial ambient sounds
- Breathing apparatus sounds
- Professional equipment operation
- Serious technical atmosphere
`,
    };

    return this.generateVideo({
      prompt: prompts[scenario] || scenario,
      resolution: '1080p',
      style: 'Professional documentary cinematography',
      audioStyle: 'Ambient emergency response sounds',
    });
  }

  async extendVideo(previousVideo: Buffer, continuationPrompt: string): Promise<Buffer> {
    // Use video extension to create longer sequences
    // Veo 3.1 can chain multiple 8-second clips
    const response = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { videoData: previousVideo.toString('base64') },
            { text: `Continue this video: ${continuationPrompt}` },
          ],
        },
      ],
    });

    for (const part of response.response.candidates[0].content.parts) {
      if (part.videoData) {
        return Buffer.from(part.videoData, 'base64');
      }
    }

    throw new Error('No video extension generated');
  }
}

export const geminiVideoService = new GeminiVideoService();
```

---

## 🎨 USE CASES FOR NRPG PLATFORM

### Immediate Needs (High Priority):

#### 1. Hero Carousel Scenario Images (3 images)
**Using**: Nano Banana Pro (4K)
- `residential-flood.jpg` - Flooded basement with water damage
- `commercial-fire.jpg` - Fire-damaged office interior
- `industrial-bio.jpg` - Industrial facility biohazard scene

**Prompts**: Professional photographic documentation style, realistic, insurance-grade quality

#### 2. Service Pillar Card Images (4 images)
**Using**: Nano Banana Pro (2K)
- `water-card.jpg` - Water extraction equipment in action
- `fire-card.jpg` - Fire damage restoration scene
- `mould-card.jpg` - Mold remediation with containment
- `bio-card.jpg` - Biohazard cleanup equipment

**Prompts**: Professional equipment photography, clean backgrounds, technical documentation style

#### 3. Hero Carousel Videos (3 videos - OPTIONAL)
**Using**: Veo 3.1 (1080p, 8 seconds each)
- `residential-flood.mp4` - Emergency water damage response
- `commercial-fire.mp4` - Commercial fire restoration
- `industrial-bio.mp4` - Industrial biohazard cleanup

**Enhancement**: Can extend to 24+ seconds using video extension

---

### Future Enhancements (Medium Priority):

#### 4. Before/After Sequences
**Using**: Veo 3.1 video extension
- Show restoration progress over time
- Educational content for customers
- Marketing materials

#### 5. Service Demonstration Videos
**Using**: Veo 3.1 (multiple 8-second clips extended)
- Water extraction process
- Fire damage assessment
- Mold remediation steps
- Biohazard decontamination

#### 6. Location-Specific Images (8 states)
**Using**: Nano Banana Pro (2K)
- Sydney skyline with disaster theme
- Melbourne cityscape
- Brisbane landmarks
- Perth coastal scenes
- Adelaide, Hobart, Darwin, Canberra

#### 7. Testimonial Videos (Post-Launch)
**Using**: Veo 3.1
- Once you have real customers
- Generate professional testimonial videos
- Customer story animations

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Install Dependencies
```bash
npm install @google/generative-ai
npm install --save-dev @types/node
```

### Step 2: Configure Environment
```env
# .env.local
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
```

### Step 3: Create Services
- `lib/services/gemini-image.service.ts` - Nano Banana Pro integration
- `lib/services/gemini-video.service.ts` - Veo 3.1 integration

### Step 4: Create Generation Scripts
- `scripts/generate-scenario-images.ts` - Generate all scenario images
- `scripts/generate-service-images.ts` - Generate service cards
- `scripts/generate-scenario-videos.ts` - Generate scenario videos (optional)

### Step 5: Generate Assets
```bash
npm run generate:images      # Generate all images
npm run generate:videos      # Generate all videos (optional)
```

### Step 6: Optimize & Deploy
- Optimize images (WebP conversion)
- Store in `/public/images/`
- Update image paths in components
- Test all pages load correctly

---

## 💰 COST ESTIMATION

### For NRPG Platform Initial Assets:

**Images (Nano Banana Pro)**:
- 3 hero scenarios (4K): 3 × $0.24 = $0.72
- 4 service cards (2K): 4 × $0.139 = $0.56
- 4 sector cards (2K): 4 × $0.139 = $0.56
- 8 location images (2K): 8 × $0.139 = $1.11
- **Total Images**: ~$3.00

**Videos (Veo 3.1)** - Optional:
- 3 scenario videos (8s each, 1080p): ~$15-30
- Video extensions (if creating 24s videos): ~$30-60
- **Total Videos**: ~$45-90

**Grand Total**: $3-93 depending on whether videos are included

**Recommendation**: Start with images only ($3) - excellent ROI

---

## 🎯 PRIORITY RECOMMENDATIONS

### Must Have (Start Here):
1. ✅ Generate 3 hero carousel scenario images (4K)
2. ✅ Generate 4 service pillar card images (2K)
3. ✅ Generate 4 sector card images (2K)

**Cost**: ~$2.00
**Time**: 1-2 hours
**Impact**: Immediate visual improvement

### Should Have (Phase 2):
4. Generate 8 location images (2K)
5. Generate marketing graphics
6. Generate blog post images

**Cost**: ~$1-2
**Time**: 1 hour
**Impact**: Complete visual assets

### Nice to Have (Phase 3):
7. Generate hero carousel videos (8s each)
8. Generate service demonstration videos
9. Generate before/after sequences

**Cost**: ~$45-90
**Time**: 3-4 hours
**Impact**: Premium marketing content

---

## 📋 PROMPTS FOR NRPG ASSETS

### Hero Carousel Scenarios:

#### Residential Flood (residential-flood.jpg)
```
Professional insurance documentation photograph of a flooded Australian suburban home basement.

SCENE DETAILS:
- Modern Australian home basement, partially flooded
- 2-3 inches of water covering hardwood floor
- Wet carpet visible, some furniture with water damage
- Natural daylight from small basement windows
- Water droplets and reflections visible
- Clean but damaged aesthetic (not catastrophic)

CAMERA SETTINGS:
- Shot with wide angle 24mm lens
- f/2.8 aperture for shallow depth of field
- Focus on water and damaged flooring in foreground
- Natural color grading, slightly cool tones
- Professional photojournalism style

LIGHTING:
- Natural window light (soft, diffused)
- Some shadows for depth
- Realistic water reflections
- Professional documentation quality

MOOD: Serious but hopeful, professional emergency response documentation

AVOID: People, dramatic destruction, dark/horror aesthetic, fake-looking CGI
```

#### Commercial Fire (commercial-fire.jpg)
```
Professional insurance documentation photograph of fire and smoke damage in Australian commercial office.

SCENE DETAILS:
- Modern open-plan office interior
- Smoke-damaged white walls and ceiling (black soot marks)
- Water damage from sprinkler system on floor
- Damaged office furniture (desks, chairs)
- Overhead fluorescent lighting partially working
- Professional clean lines despite damage

CAMERA SETTINGS:
- Shot with 35mm lens
- f/4 aperture for good depth of field
- Focus on smoke-damaged walls and ceiling
- Desaturated color grading (serious tone)
- Wide establishing shot

LIGHTING:
- Overhead office lighting (some working, some damaged)
- Natural light from large windows
- Dramatic but professional
- Clear visibility of all damage

MOOD: Serious emergency, business continuity focus, professional documentation

AVOID: Flames, people, extreme destruction, horror aesthetic, unrealistic damage
```

#### Industrial Biohazard (industrial-bio.jpg)
```
Professional photograph of large Australian industrial warehouse requiring biohazard cleanup.

SCENE DETAILS:
- Massive warehouse interior, high ceilings
- Industrial concrete floors, metal shelving/equipment
- Professional hazmat containment barriers visible
- HEPA filtration equipment staged
- Industrial overhead lighting
- Clean professional technical aesthetic

CAMERA SETTINGS:
- Shot with 24mm wide angle lens
- f/5.6 for maximum clarity
- Focus on industrial space and equipment
- Color graded for technical clarity
- Establishing wide shot showing scale

LIGHTING:
- Industrial overhead fluorescent/LED lighting
- Bright, even illumination
- Professional technical photography
- Clear visibility throughout space

MOOD: Professional, technical, safety-focused, industrial documentation

AVOID: People in frame, gore, medical content, dark/horror aesthetic, chaos
```

---

### Service Cards (4 images):

#### Water Damage Card
```
Professional product photography of industrial water extraction equipment.

HERO EQUIPMENT:
- Large truck-mounted water extractor (blue/gray industrial equipment)
- Professional dehumidifier units
- High-velocity air movers
- All equipment clean, professional-grade

SETTING:
- Clean white background OR Australian home interior
- Professional studio lighting
- Equipment as hero subject
- Sharp focus throughout

STYLE: Commercial product photography, f/8, professional color grading
MOOD: Clean, professional, trustworthy, industrial quality
```

#### Fire Damage Card
```
Professional photograph of fire and smoke restoration equipment.

EQUIPMENT:
- Air scrubbers with HEPA filters
- Professional cleaning equipment
- Thermal imaging camera
- Safety equipment visible

SETTING:
- Clean professional background
- Well-lit studio or job site
- Equipment in operational state
- Professional presentation

STYLE: Technical product photography, sharp focus, professional lighting
MOOD: Professional, safety-focused, technical expertise
```

#### Mold Remediation Card
```
Professional photograph of mold remediation containment setup.

EQUIPMENT:
- Clear plastic containment barriers
- HEPA air filtration units
- Professional protective equipment
- Testing equipment visible

SETTING:
- Professional job site setup
- Clean, organized workspace
- Safety protocols visible
- Technical documentation style

STYLE: Safety-focused technical photography, even lighting, clear details
MOOD: Professional, safety-first, technical competence
```

#### Biohazard Card
```
Professional photograph of biohazard cleanup personal protective equipment.

EQUIPMENT:
- Full hazmat protective suits (clean, professional)
- Respirators and safety gear
- Decontamination equipment
- Professional cleanup tools

SETTING:
- Clean background or professional facility
- Well-lit studio photography
- Equipment displayed professionally
- Technical presentation

STYLE: Safety equipment product photography, professional lighting
MOOD: Safety-focused, professional, technical expertise, trustworthy
```

---

## 🚀 QUICK START IMPLEMENTATION

### 1. Add API Key
```bash
# Get API key from: https://aistudio.google.com/app/apikey
echo "GEMINI_API_KEY=your_key_here" >> .env.local
```

### 2. Install Package
```bash
npm install @google/generative-ai
```

### 3. Create Simple Test Script
```typescript
// scripts/test-gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function test() {
  // Test Nano Banana Pro (Image Generation)
  const imageModel = genAI.getGenerativeModel({
    model: 'gemini-3-pro-preview',
    generationConfig: {
      responseModalities: ['Text', 'Image'],
    },
  });

  const imageResponse = await imageModel.generateContent(
    'Professional photograph of industrial water extraction equipment in a clean Australian home'
  );

  for (const part of imageResponse.response.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync('test-image.png', buffer);
      console.log('✅ Image generated: test-image.png');
    }
  }
}

test();
```

---

## 📖 OFFICIAL DOCUMENTATION

**Sources**:
- [Veo 3.1 Documentation](https://developers.googleblog.com/introducing-veo-3-1-and-new-creative-capabilities-in-the-gemini-api/)
- [Nano Banana Pro Release](https://techcrunch.com/2025/11/20/google-releases-nano-banana-pro-its-latest-image-generation-model/)
- [Gemini API Cookbook](https://github.com/google-gemini/cookbook)
- [Image Generation Guide](https://ai.google.dev/gemini-api/docs/image-generation)
- [Video Generation Guide](https://ai.google.dev/gemini-api/docs/video)

---

## ✅ NEXT ACTIONS

1. Get Gemini API key from Google AI Studio
2. Add to `.env.local`
3. Install `@google/generative-ai` package
4. Create image generation service
5. Generate 3 hero carousel scenario images
6. Generate 4 service card images
7. Optionally: Generate scenario videos

**Ready to implement?**

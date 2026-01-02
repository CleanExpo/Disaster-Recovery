# Marketing Components

Comprehensive marketing and lead generation components for the Disaster Recovery platform, optimized for conversion, engagement, and trust-building.

## Overview

All marketing components follow DesignOS standards:
- Authority/clinical aesthetic using serif headlines and clean layouts
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Full TypeScript type safety
- Production-ready implementation

---

## Component Categories

### 1. Hero Variants

#### HeroFullWidth
Full-width background image hero with centered content overlay.

**Use Cases:**
- Landing pages
- Major section headers
- Campaign pages

**Example:**
```tsx
import { HeroFullWidth } from '@/design-system';

<HeroFullWidth
  backgroundImage="/images/disaster-recovery-hero.jpg"
  heading="Emergency Disaster Recovery"
  subheading="24/7 rapid response from certified contractors"
  overlayOpacity={0.6}
>
  <Button variant="emergency" size="large">Get Help Now</Button>
  <Button variant="secondary" size="large">Learn More</Button>
</HeroFullWidth>
```

**Props:**
- `backgroundImage` (string): Background image URL
- `heading` (string): Main heading text
- `subheading?` (string): Optional subheading
- `children?` (ReactNode): CTA buttons
- `overlayOpacity?` (number): Overlay darkness (0-1), default 0.5
- `minHeight?` (string): Minimum height, default "600px"
- `textAlign?` ('left' | 'center' | 'right'): Text alignment

---

#### HeroVideo
Full-width video background hero with content overlay and playback controls.

**Use Cases:**
- High-impact landing pages
- Brand storytelling
- Before/after showcases

**Example:**
```tsx
<HeroVideo
  videoSrc="/videos/disaster-recovery.mp4"
  posterImage="/images/video-poster.jpg"
  heading="We're Here When Disaster Strikes"
  subheading="24/7 emergency response nationwide"
  autoPlay
  loop
>
  <Button variant="emergency" size="large">Start Your Claim</Button>
</HeroVideo>
```

**Props:**
- `videoSrc` (string): Video URL (mp4, webm)
- `posterImage` (string): Fallback poster image
- `heading` (string): Main heading
- `autoPlay?` (boolean): Auto-play video
- `loop?` (boolean): Loop video
- All HeroFullWidth props

**Accessibility:**
- Accessible play/pause controls
- Mute/unmute toggle
- Video hidden on mobile for performance

---

#### HeroSplitScreen
Split-screen layout with image on one side, content on the other.

**Use Cases:**
- Product showcases
- Trust-building pages
- Feature highlights

**Example:**
```tsx
<HeroSplitScreen
  imageSrc="/images/certified-contractor.jpg"
  imageAlt="Certified contractor inspecting water damage"
  heading="Australia's Trusted Disaster Recovery Network"
  subheading="Over 2,000 verified contractors ready to respond"
  imagePosition="right"
>
  <Button variant="primary" size="large">Find a Contractor</Button>
</HeroSplitScreen>
```

**Props:**
- `imageSrc` (string): Image URL
- `imageAlt` (string): Required alt text for accessibility
- `imagePosition?` ('left' | 'right'): Image side, default 'left'
- `backgroundColor?` (string): Content side background
- `textColor?` (string): Text color

---

### 2. Testimonial Components

#### ClientTestimonialCard
Single testimonial card with photo, quote, and attribution (client-focused).

**Use Cases:**
- Social proof sections
- Trust-building
- Success stories

**Example:**
```tsx
<ClientTestimonialCard
  quote="The contractor arrived within 2 hours and had our water damage under control by evening. Absolutely incredible response time."
  name="Sarah Mitchell"
  role="Homeowner, Sydney NSW"
  photoUrl="/images/testimonials/sarah-m.jpg"
  rating={5}
  incidentType="Water Damage"
  variant="featured"
/>
```

**Props:**
- `quote` (string): Customer testimonial
- `name` (string): Customer name
- `role?` (string): Customer role/location
- `photoUrl?` (string): Customer photo
- `rating?` (number): 1-5 star rating
- `incidentType?` (string): Disaster category
- `variant?` ('default' | 'featured'): Card style

---

#### TestimonialCarousel
Swipeable carousel for multiple testimonials.

**Use Cases:**
- Multiple testimonials on one page
- Auto-rotating social proof
- Mobile-optimized testimonial display

**Example:**
```tsx
<TestimonialCarousel
  testimonials={[
    {
      id: '1',
      quote: 'Amazing service! They arrived within hours.',
      name: 'John Smith',
      role: 'Homeowner, Melbourne VIC',
      rating: 5,
    },
    // ... more testimonials
  ]}
  autoPlayInterval={5000}
  showArrows
  showDots
/>
```

**Props:**
- `testimonials` (TestimonialItem[]): Array of testimonials
- `autoPlayInterval?` (number): Auto-play interval in ms (0 = disabled)
- `showArrows?` (boolean): Show navigation arrows
- `showDots?` (boolean): Show dot indicators

**Features:**
- Touch-enabled swipe navigation
- Keyboard accessible (arrow keys)
- Auto-play with pause on hover
- Smooth transitions

---

#### VideoTestimonial
Video testimonial with thumbnail, play button, and metadata.

**Use Cases:**
- High-impact social proof
- Detailed customer stories
- Before/after video showcases

**Example:**
```tsx
<VideoTestimonial
  videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
  thumbnailUrl="/images/video-thumbnails/john-testimonial.jpg"
  name="John Williams"
  role="Homeowner, Brisbane QLD"
  duration="3:45"
  incidentType="Storm Damage"
  platform="youtube"
/>
```

**Props:**
- `videoUrl` (string): YouTube, Vimeo, or direct video URL
- `thumbnailUrl` (string): Video thumbnail
- `name` (string): Customer name
- `duration?` (string): Video duration (e.g., "3:45")
- `platform?` ('youtube' | 'vimeo' | 'direct'): Video platform

---

### 3. Interactive Tools

#### DamageCostCalculator
Multi-step calculator for estimating disaster recovery costs.

**Use Cases:**
- Lead generation
- Education and transparency
- Setting realistic expectations

**Example:**
```tsx
<DamageCostCalculator
  title="Estimate Your Recovery Cost"
  description="Get an instant estimate in 3 quick steps"
  onComplete={(result) => {
    console.log('Estimated cost:', result.estimatedCost);
    // Track lead, send to CRM, etc.
  }}
/>
```

**Props:**
- `title?` (string): Calculator title
- `description?` (string): Calculator description
- `steps?` (CalculatorStep[]): Custom steps (default provided)
- `onComplete?` (callback): Called when calculation completes

**Result Object:**
```typescript
{
  estimatedCost: { min: number, max: number },
  urgency: 'immediate' | 'urgent' | 'standard',
  selectedOptions: Record<string, string>
}
```

**Features:**
- Multi-step form flow with progress bar
- Real-time cost estimation
- Mobile-optimized
- Back/forward navigation

---

#### RiskAssessmentQuiz
Interactive questionnaire to assess disaster preparedness risk.

**Use Cases:**
- Lead qualification
- Education and awareness
- Personalized recommendations

**Example:**
```tsx
<RiskAssessmentQuiz
  title="How Prepared Are You?"
  description="Take our 5-question assessment to find out"
  onComplete={(result) => {
    console.log('Risk level:', result.riskLevel);
    console.log('Recommendations:', result.recommendations);
  }}
/>
```

**Props:**
- `title?` (string): Quiz title
- `questions?` (QuizQuestion[]): Custom questions (default provided)
- `onComplete?` (callback): Called when quiz completes

**Result Object:**
```typescript
{
  totalScore: number,
  riskLevel: 'low' | 'moderate' | 'high' | 'critical',
  recommendations: string[],
  answers: Record<string, string>
}
```

**Risk Levels:**
- Low (0-25%): Excellent preparedness
- Moderate (25-50%): Some improvements needed
- High (50-75%): Urgent action required
- Critical (75-100%): Immediate action required

---

#### TriageTool
Emergency assessment decision tree for immediate guidance.

**Use Cases:**
- Emergency intake pages
- Help center / support
- Routing users to appropriate services

**Example:**
```tsx
<TriageTool
  onComplete={(result) => {
    console.log('Urgency level:', result.urgency);
    console.log('Recommended actions:', result.actions);

    if (result.urgency === 'emergency') {
      // Route to emergency services
    }
  }}
/>
```

**Props:**
- `initialNode?` (TriageNode): Starting question
- `nodes?` (Record<string, TriageNode>): Custom decision tree
- `onComplete?` (callback): Called when triage completes

**Result Object:**
```typescript
{
  urgency: 'emergency' | 'urgent' | 'standard',
  title: string,
  message: string,
  actions: string[]
}
```

**Features:**
- Binary decision tree (yes/no questions)
- Color-coded urgency levels
- Clear action steps
- Back navigation

---

### 4. Location Components

#### AustraliaMap
Interactive SVG map of Australia with clickable states/territories.

**Use Cases:**
- Location-based navigation
- Service area visualization
- Geographic targeting

**Example:**
```tsx
<AustraliaMap
  selectedState="nsw"
  onStateClick={(stateId) => {
    console.log('Selected state:', stateId);
    // Filter contractors, update content, etc.
  }}
  statesData={[
    { id: 'nsw', name: 'New South Wales', contractorCount: 487 },
    { id: 'vic', name: 'Victoria', contractorCount: 356 },
  ]}
  showLabels
/>
```

**Props:**
- `selectedState?` (string): Currently selected state
- `onStateClick?` (callback): Called when state is clicked
- `statesData?` (StateData[]): State-specific data
- `showLabels?` (boolean): Show state abbreviations

**State IDs:**
- 'nsw', 'vic', 'qld', 'wa', 'sa', 'tas', 'nt', 'act'

---

#### ServiceAreaVisualization
Heat map showing contractor density across regions.

**Use Cases:**
- Demonstrating network size
- Service coverage transparency
- Trust-building

**Example:**
```tsx
<ServiceAreaVisualization
  regions={[
    { id: 'sydney-metro', name: 'Sydney Metro', contractorCount: 487, density: 'very-high' },
    { id: 'melbourne-metro', name: 'Melbourne Metro', contractorCount: 356, density: 'high' },
    { id: 'brisbane-metro', name: 'Brisbane Metro', contractorCount: 234, density: 'high' },
    { id: 'perth-metro', name: 'Perth Metro', contractorCount: 156, density: 'medium' },
  ]}
  showCounts
  onRegionClick={(id) => console.log('Selected:', id)}
/>
```

**Props:**
- `regions` (RegionData[]): Region data with contractor counts
- `selectedRegion?` (string): Currently selected region
- `onRegionClick?` (callback): Called when region is clicked
- `showCounts?` (boolean): Show contractor counts

**Density Levels:**
- Very High: 300+ contractors (green)
- High: 150-299 contractors (light green)
- Moderate: 50-149 contractors (yellow)
- Basic: <50 contractors (orange)

---

#### LocalContractorCounter
Animated counter showing contractors in user's area.

**Use Cases:**
- Creating urgency
- Demonstrating network size
- Location-specific messaging

**Example:**
```tsx
<LocalContractorCounter
  count={487}
  location="Sydney"
  state="NSW"
  availableNow={47}
  variant="prominent"
/>
```

**Props:**
- `count` (number): Total contractors in area
- `location` (string): Location name
- `state?` (string): State/region
- `availableNow?` (number): Currently available contractors
- `animationDuration?` (number): Animation time in ms
- `variant?` ('default' | 'compact' | 'prominent'): Display style

**Features:**
- Count-up animation when visible
- Real-time availability indicator
- Mobile-optimized variants
- Intersection Observer for performance

---

## Usage Best Practices

### Performance
- All components use CSS-in-JS for optimal performance
- Images should be optimized (WebP format recommended)
- Videos should be compressed and hosted on CDN
- Lazy loading implemented for below-fold components

### Accessibility
- All components meet WCAG 2.1 AA standards
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader tested

### Mobile Optimization
- Touch-friendly tap targets (minimum 44px)
- Responsive typography using clamp()
- Mobile-first breakpoints
- Optimized for 3G connections

### SEO
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Structured data support (where applicable)

---

## Integration Examples

### Landing Page
```tsx
import {
  HeroVideo,
  LocalContractorCounter,
  ServiceAreaVisualization,
  TestimonialCarousel,
  TriageTool,
} from '@/design-system';

export function LandingPage() {
  return (
    <>
      <HeroVideo
        videoSrc="/videos/hero.mp4"
        posterImage="/images/hero-poster.jpg"
        heading="Emergency Disaster Recovery"
        subheading="24/7 response across Australia"
      >
        <Button variant="emergency">Get Help Now</Button>
      </HeroVideo>

      <LocalContractorCounter
        count={487}
        location="your area"
        availableNow={47}
        variant="prominent"
      />

      <TriageTool onComplete={handleTriageComplete} />

      <TestimonialCarousel
        testimonials={testimonials}
        autoPlayInterval={5000}
      />

      <ServiceAreaVisualization regions={regions} />
    </>
  );
}
```

### Calculator Page
```tsx
import {
  HeroSplitScreen,
  DamageCostCalculator,
  RiskAssessmentQuiz,
} from '@/design-system';

export function CalculatorPage() {
  return (
    <>
      <HeroSplitScreen
        imageSrc="/images/calculator-hero.jpg"
        imageAlt="Professional assessment"
        heading="Estimate Your Recovery Cost"
        subheading="Get an instant, transparent estimate"
      />

      <DamageCostCalculator
        onComplete={(result) => {
          // Track conversion
          analytics.track('calculator_completed', result);
          // Route to quote request
          router.push('/quote');
        }}
      />

      <RiskAssessmentQuiz
        onComplete={(result) => {
          // Personalize recommendations
          setRecommendations(result.recommendations);
        }}
      />
    </>
  );
}
```

---

## Conversion Optimization

### Call-to-Action Hierarchy
1. **Emergency**: Immediate response needed (red)
2. **Primary**: Main conversion action (teal/education primary)
3. **Secondary**: Alternative actions (navy/authority)

### Lead Capture Points
- Calculator completion
- Quiz results
- Video testimonial views
- Map interactions
- Contractor counter clicks

### A/B Testing Support
All components accept `className` and support data attributes:
```tsx
<DamageCostCalculator
  className="variant-a"
  data-ab-test="calculator-v2"
  onComplete={handleComplete}
/>
```

---

## Support

For questions or issues:
- Documentation: `/docs/design-system`
- Examples: `/examples/marketing`
- Issues: GitHub Issues
- Team: Slack #design-system

---

**Generated**: 2025-01-02
**Version**: 1.0.0
**DesignOS**: Marketing Components
**Status**: Production Ready

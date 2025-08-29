/**
 * IMAGE GENERATION REQUIREMENTS DATABASE
 * =======================================
 * 
 * Complete specifications for all images needed across the NRP platform.
 * This serves as the single source of truth for our automated image generation pipeline.
 */

export interface ImageRequirement {
  id: string;
  category: 'website' | 'training' | 'crm' | 'marketing' | 'documentation';
  subcategory: string;
  title: string;
  description: string;
  aiPrompt: string;
  dimensions: {
    width: number;
    height: number;
  };
  format: 'jpg' | 'png' | 'webp' | 'svg';
  priority: 1 | 2 | 3;
  style: string;
  colorScheme?: string[];
  keywords: string[];
  altText: string;
  usage: string[];
  generated?: boolean;
  generatedUrl?: string;
  fallbackUrl?: string;
}

export const IMAGE_REQUIREMENTS: ImageRequirement[] = [
  // ========================================
  // WEBSITE HERO IMAGES
  // ========================================
  {
    id: 'hero-water-damage',
    category: 'website',
    subcategory: 'hero',
    title: 'Water Damage Restoration Hero',
    description: 'Professional water damage restoration in action',
    aiPrompt: 'Professional water damage restoration team using industrial water extraction equipment in modern Australian home, bright clean environment, wearing NRP branded uniforms, truck-mount extraction equipment visible, photorealistic, commercial photography style',
    dimensions: { width: 1920, height: 1080 },
    format: 'webp',
    priority: 1,
    style: 'photorealistic, professional, bright, clean',
    colorScheme: ['#0066CC', '#FFFFFF', '#F0F8FF'],
    keywords: ['water damage', 'restoration', 'extraction', 'flooding'],
    altText: 'Professional water damage restoration team extracting water from residential property',
    usage: ['/services/water-damage', 'homepage slider'],
    generated: false
  },
  {
    id: 'hero-fire-damage',
    category: 'website',
    subcategory: 'hero',
    title: 'Fire Damage Restoration Hero',
    description: 'Fire and smoke damage restoration scene',
    aiPrompt: 'Professional restoration team cleaning fire and smoke damage in residential property, wearing protective equipment, using specialized cleaning equipment, HEPA air scrubbers visible, before and after contrast visible, Australian home interior, photorealistic',
    dimensions: { width: 1920, height: 1080 },
    format: 'webp',
    priority: 1,
    style: 'photorealistic, professional, high contrast',
    colorScheme: ['#FF6B00', '#333333', '#FFFFFF'],
    keywords: ['fire damage', 'smoke', 'restoration', 'cleaning'],
    altText: 'Fire damage restoration specialists cleaning smoke-damaged property',
    usage: ['/services/fire-damage', 'service overview page'],
    generated: false
  },
  {
    id: 'hero-mould-remediation',
    category: 'website',
    subcategory: 'hero',
    title: 'Mould Remediation Hero',
    description: 'Professional mould removal process',
    aiPrompt: 'Mould remediation specialist in full PPE including respirator removing mould from wall, containment barriers with negative air machine visible, professional lighting, Australian residential setting, emphasis on safety and thoroughness, photorealistic',
    dimensions: { width: 1920, height: 1080 },
    format: 'webp',
    priority: 1,
    style: 'photorealistic, clinical, professional',
    colorScheme: ['#00AA55', '#FFFFFF', '#F5F5F5'],
    keywords: ['mould', 'remediation', 'removal', 'health'],
    altText: 'Certified mould remediation specialist safely removing mould',
    usage: ['/services/mould-remediation'],
    generated: false
  },
  {
    id: 'hero-emergency-response',
    category: 'website',
    subcategory: 'hero',
    title: 'Emergency Response Hero',
    description: '24/7 emergency response team',
    aiPrompt: 'Emergency response restoration team arriving at night with professional vehicle, emergency lights, team unloading equipment, sense of urgency and professionalism, Australian suburban setting, dramatic lighting, photorealistic',
    dimensions: { width: 1920, height: 1080 },
    format: 'webp',
    priority: 1,
    style: 'dramatic, urgent, professional',
    colorScheme: ['#FF0000', '#FFD700', '#000000'],
    keywords: ['emergency', '24/7', 'response', 'urgent'],
    altText: '24/7 emergency restoration team responding to disaster',
    usage: ['/emergency', 'homepage hero'],
    generated: false
  },
  {
    id: 'hero-storm-damage',
    category: 'website',
    subcategory: 'hero',
    title: 'Storm Damage Hero',
    description: 'Storm damage restoration and tarping',
    aiPrompt: 'Restoration team installing emergency roof tarp after storm damage, Australian home with visible storm damage, professional equipment and safety gear, blue tarp being secured, overcast sky, photorealistic commercial photography',
    dimensions: { width: 1920, height: 1080 },
    format: 'webp',
    priority: 1,
    style: 'photorealistic, dynamic, professional',
    colorScheme: ['#4A90E2', '#333333', '#FFFFFF'],
    keywords: ['storm', 'damage', 'emergency', 'tarp'],
    altText: 'Storm damage restoration team securing property',
    usage: ['/services/storm-damage'],
    generated: false
  },

  // ========================================
  // TRAINING MATERIAL IMAGES
  // ========================================
  {
    id: 'training-ppe-water',
    category: 'training',
    subcategory: 'safety',
    title: 'PPE for Water Damage',
    description: 'Complete PPE setup for water damage restoration',
    aiPrompt: 'Professional layout of personal protective equipment for water damage restoration including rubber boots, waterproof gloves, safety glasses, N95 respirator, and disposable coveralls, clean white background, product photography style, labeled items',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 2,
    style: 'educational, clear, well-lit',
    keywords: ['PPE', 'safety', 'equipment', 'water damage'],
    altText: 'Personal protective equipment required for water damage restoration',
    usage: ['training/day-2/ppe-requirements'],
    generated: false
  },
  {
    id: 'training-water-extraction',
    category: 'training',
    subcategory: 'procedures',
    title: 'Water Extraction Process',
    description: 'Step-by-step water extraction procedure',
    aiPrompt: 'Technician demonstrating proper water extraction technique with truck-mount wand on carpet, showing correct angle and overlapping pattern, professional lighting, educational style, clear view of technique',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 2,
    style: 'educational, clear, demonstrative',
    keywords: ['extraction', 'technique', 'training', 'procedure'],
    altText: 'Proper water extraction technique demonstration',
    usage: ['training/day-2/extraction-procedures'],
    generated: false
  },
  {
    id: 'training-moisture-meter',
    category: 'training',
    subcategory: 'equipment',
    title: 'Moisture Meter Usage',
    description: 'Using penetrating moisture meter on drywall',
    aiPrompt: 'Close-up of hand holding penetrating moisture meter against wall showing digital reading, proper pin insertion technique visible, educational lighting, clear display showing moisture percentage',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 2,
    style: 'educational, close-up, clear',
    keywords: ['moisture meter', 'testing', 'equipment', 'measurement'],
    altText: 'Proper use of penetrating moisture meter on drywall',
    usage: ['training/day-2/moisture-documentation'],
    generated: false
  },
  {
    id: 'training-containment-setup',
    category: 'training',
    subcategory: 'procedures',
    title: 'Containment Barrier Setup',
    description: 'Professional containment barrier installation',
    aiPrompt: 'Restoration technician installing plastic sheeting containment barrier with zipper door, negative air machine visible, proper sealing technique shown, mould remediation setup, educational photography',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 2,
    style: 'educational, step-by-step, clear',
    keywords: ['containment', 'barrier', 'mould', 'setup'],
    altText: 'Installing containment barrier for mould remediation',
    usage: ['training/day-3/containment-procedures'],
    generated: false
  },
  {
    id: 'training-air-mover-placement',
    category: 'training',
    subcategory: 'equipment',
    title: 'Air Mover Placement',
    description: 'Optimal air mover positioning for drying',
    aiPrompt: 'Room showing correct air mover placement with multiple units positioned at 15-45 degree angles to walls, arrows showing air flow pattern, vortex drying setup clearly illustrated, educational diagram overlay',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 2,
    style: 'educational, diagrammatic, clear',
    keywords: ['air mover', 'drying', 'placement', 'equipment'],
    altText: 'Optimal air mover placement for structural drying',
    usage: ['training/day-2/drying-setup'],
    generated: false
  },

  // ========================================
  // CRM & DASHBOARD IMAGES
  // ========================================
  {
    id: 'crm-status-active',
    category: 'crm',
    subcategory: 'status',
    title: 'Active Job Status',
    description: 'Active job status indicator',
    aiPrompt: 'Green circular badge with checkmark icon, modern flat design, subtle gradient, professional UI element, transparent background',
    dimensions: { width: 128, height: 128 },
    format: 'png',
    priority: 3,
    style: 'flat design, modern, clean',
    colorScheme: ['#00AA55', '#00CC66'],
    keywords: ['status', 'active', 'indicator', 'ui'],
    altText: 'Active job status indicator',
    usage: ['crm/job-status'],
    generated: false
  },
  {
    id: 'crm-status-pending',
    category: 'crm',
    subcategory: 'status',
    title: 'Pending Job Status',
    description: 'Pending job status indicator',
    aiPrompt: 'Orange circular badge with clock icon, modern flat design, subtle gradient, professional UI element, transparent background',
    dimensions: { width: 128, height: 128 },
    format: 'png',
    priority: 3,
    style: 'flat design, modern, clean',
    colorScheme: ['#FFA500', '#FFB833'],
    keywords: ['status', 'pending', 'indicator', 'ui'],
    altText: 'Pending job status indicator',
    usage: ['crm/job-status'],
    generated: false
  },
  {
    id: 'crm-avatar-placeholder',
    category: 'crm',
    subcategory: 'avatars',
    title: 'Default Avatar',
    description: 'Default contractor avatar placeholder',
    aiPrompt: 'Professional silhouette avatar placeholder, circular frame, gradient background from blue to teal, modern design, suitable for contractor profile',
    dimensions: { width: 256, height: 256 },
    format: 'png',
    priority: 3,
    style: 'modern, professional, clean',
    colorScheme: ['#0066CC', '#00CCCC'],
    keywords: ['avatar', 'profile', 'placeholder', 'contractor'],
    altText: 'Default contractor profile avatar',
    usage: ['crm/contractor-profile'],
    generated: false
  },

  // ========================================
  // MARKETING IMAGES
  // ========================================
  {
    id: 'marketing-social-water',
    category: 'marketing',
    subcategory: 'social',
    title: 'Water Damage Social Post',
    description: 'Social media post for water damage services',
    aiPrompt: 'Split image showing before and after water damage restoration, dramatic transformation, Australian home, professional quality, Instagram-ready square format, NRP branding space at bottom',
    dimensions: { width: 1080, height: 1080 },
    format: 'jpg',
    priority: 2,
    style: 'dramatic, transformation, professional',
    keywords: ['before after', 'water damage', 'social media', 'transformation'],
    altText: 'Before and after water damage restoration transformation',
    usage: ['marketing/social-media/water-damage'],
    generated: false
  },
  {
    id: 'marketing-banner-recruitment',
    category: 'marketing',
    subcategory: 'recruitment',
    title: 'Contractor Recruitment Banner',
    description: 'Banner for contractor recruitment campaign',
    aiPrompt: 'Professional restoration contractor in action with text space for "Join NRP Network", modern design, Australian contractor, sense of success and professionalism, bright optimistic colors',
    dimensions: { width: 1200, height: 628 },
    format: 'jpg',
    priority: 2,
    style: 'inspirational, professional, modern',
    colorScheme: ['#0066CC', '#FFD700', '#FFFFFF'],
    keywords: ['recruitment', 'contractor', 'join', 'opportunity'],
    altText: 'Join the NRP contractor network - recruitment banner',
    usage: ['marketing/recruitment/facebook-ads'],
    generated: false
  },

  // ========================================
  // DOCUMENTATION IMAGES
  // ========================================
  {
    id: 'docs-water-categories',
    category: 'documentation',
    subcategory: 'diagrams',
    title: 'Water Categories Diagram',
    description: 'Visual guide to water damage categories 1-3',
    aiPrompt: 'Clean infographic showing three water categories with icons and color coding, Category 1 clean water blue, Category 2 grey water orange, Category 3 black water red, professional diagram style, educational',
    dimensions: { width: 1280, height: 720 },
    format: 'png',
    priority: 3,
    style: 'infographic, educational, clean',
    colorScheme: ['#0099FF', '#FF9900', '#FF0000'],
    keywords: ['water categories', 'diagram', 'education', 'classification'],
    altText: 'Water damage categories 1-3 classification diagram',
    usage: ['documentation/water-damage/categories'],
    generated: false
  },
  {
    id: 'docs-drying-process',
    category: 'documentation',
    subcategory: 'diagrams',
    title: 'Drying Process Flowchart',
    description: 'Complete drying process workflow',
    aiPrompt: 'Professional flowchart showing water damage drying process from assessment to completion, clean design with icons for each step, arrows showing flow, modern infographic style',
    dimensions: { width: 1280, height: 1600 },
    format: 'png',
    priority: 3,
    style: 'flowchart, professional, clean',
    keywords: ['process', 'workflow', 'drying', 'flowchart'],
    altText: 'Water damage drying process workflow diagram',
    usage: ['documentation/processes/drying-workflow'],
    generated: false
  }
];

// Utility functions
export function getImagesByCategory(category: ImageRequirement['category']): ImageRequirement[] {
  return IMAGE_REQUIREMENTS.filter(img => img.category === category);
}

export function getImagesByPriority(priority: 1 | 2 | 3): ImageRequirement[] {
  return IMAGE_REQUIREMENTS.filter(img => img.priority === priority);
}

export function getUngenerated(): ImageRequirement[] {
  return IMAGE_REQUIREMENTS.filter(img => !img.generated);
}

export function getImageById(id: string): ImageRequirement | undefined {
  return IMAGE_REQUIREMENTS.find(img => img.id === id);
}

export function getImageCount(): {
  total: number;
  generated: number;
  pending: number;
  byCategory: Record<string, number>;
} {
  const total = IMAGE_REQUIREMENTS.length;
  const generated = IMAGE_REQUIREMENTS.filter(img => img.generated).length;
  const pending = total - generated;
  
  const byCategory = IMAGE_REQUIREMENTS.reduce((acc, img) => {
    acc[img.category] = (acc[img.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return { total, generated, pending, byCategory };
}
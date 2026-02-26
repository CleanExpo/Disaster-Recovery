// ============================================================
// UNI-722: Video Configuration — YouTube Video Mapping
// Maps service categories and pages to YouTube video embeds
// VideoObject schema generated automatically for each video
// ============================================================

export interface VideoConfig {
  /** YouTube video ID (the part after v= or /embed/) */
  youtubeId: string;
  /** Video title for schema + accessible embed */
  title: string;
  /** Video description for schema */
  description: string;
  /** ISO 8601 duration (e.g., PT2M30S = 2min 30sec) */
  duration: string;
  /** Upload date in ISO format */
  uploadDate: string;
  /** Thumbnail URL — auto-generated from YouTube if not provided */
  thumbnailUrl?: string;
  /** Which pages should embed this video */
  pages: string[];
  /** Service category alignment */
  category: string;
  /** Whether video exists on YouTube already */
  status: 'live' | 'planned' | 'filming';
}

// Helper: generate YouTube thumbnail from video ID
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Helper: generate YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// Helper: generate YouTube watch URL
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ============================================================
// MASTER VIDEO LIST
// Status: 'live' = already on YouTube, 'planned' = needs recording
// ============================================================

export const videoConfig: VideoConfig[] = [
  // === TIER 1: CORE SERVICE EXPLAINERS (1 per main service) ===
  {
    youtubeId: 'PLACEHOLDER_WATER',
    title: 'Water Damage Restoration Process — Step by Step',
    description: 'Learn how NRPG certified contractors handle emergency water damage restoration in Australia. From initial call-out to structural drying and claims documentation.',
    duration: 'PT3M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/water-damage-restoration', '/services/water-damage'],
    category: 'water-damage-restoration',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_FIRE',
    title: 'Fire Damage Restoration — What to Expect After a House Fire',
    description: 'A complete walkthrough of professional fire damage restoration: make-safe, soot removal, smoke odour treatment, structural repair, and insurance documentation.',
    duration: 'PT3M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/fire-damage-restoration', '/services/fire-damage'],
    category: 'fire-damage-restoration',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_MOULD',
    title: 'Mould Remediation — How Professionals Remove Mould Safely',
    description: 'See how IICRC-certified mould remediation specialists assess, contain, remove, and prevent mould in Australian homes and commercial properties.',
    duration: 'PT2M45S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/mould-remediation', '/services/mould-remediation/black-mould-removal'],
    category: 'mould-remediation',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_STORM',
    title: 'Storm Damage Repairs — Emergency Tarping to Full Restoration',
    description: 'How our disaster recovery network responds to storm damage across Australia: emergency tarping, debris removal, roof repairs, and water extraction.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/storm-damage-restoration', '/services/storm-damage'],
    category: 'storm-damage-repairs',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_FLOOD',
    title: 'Flood Recovery in Australia — The Professional Restoration Process',
    description: 'What happens when floodwaters recede: water extraction, structural drying, mould prevention, sanitisation, and getting your home back to pre-loss condition.',
    duration: 'PT3M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/flood-damage-restoration', '/services/flood-recovery'],
    category: 'flood-recovery',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_EMERGENCY',
    title: 'Emergency Restoration Services — 24/7 Disaster Response Australia',
    description: 'How Disaster Recovery provides 24/7 emergency restoration across Australia. From midnight call-outs to public holiday emergencies — our network is always ready.',
    duration: 'PT2M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/emergency-restoration', '/emergency'],
    category: 'emergency-restoration',
    status: 'planned',
  },

  // === TIER 2: HOW-IT-WORKS + BRAND VIDEOS ===
  {
    youtubeId: 'PLACEHOLDER_HOW_IT_WORKS',
    title: 'How Disaster Recovery Works — From Claim to Completion',
    description: 'A simple 4-step overview: Report your damage online, get matched with a vetted local contractor, emergency response begins, and full restoration with claims documentation.',
    duration: 'PT2M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/', '/how-it-works', '/about'],
    category: 'brand',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_INSURANCE',
    title: 'Insurance Claims After Property Damage — Your Step-by-Step Guide',
    description: 'Understand the insurance claims process after water, fire, storm, or flood damage in Australia. We bill you directly and provide full documentation for your insurer.',
    duration: 'PT3M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/insurance', '/is-it-covered', '/guides/insurance'],
    category: 'insurance',
    status: 'planned',
  },

  // === TIER 3: SPECIALIST / NICHE VIDEOS ===
  {
    youtubeId: 'PLACEHOLDER_SEWAGE',
    title: 'Sewage Cleanup — Professional Biohazard Decontamination',
    description: 'How professionals safely clean up sewage spills, black water contamination, and grey water overflows in residential and commercial properties.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/sewage-cleanup'],
    category: 'sewage-cleanup',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_BIOHAZARD',
    title: 'Biohazard Cleaning Services — Crime Scene and Trauma Cleanup',
    description: 'Specialist biohazard cleaning: crime scenes, unattended deaths, hoarding, drug labs, and infectious disease decontamination by certified professionals.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/biohazard-cleaning', '/services/trauma-cleanup'],
    category: 'biohazard-cleaning',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_BUSHFIRE',
    title: 'Bushfire Damage Restoration — Rebuilding After Australian Bushfires',
    description: 'The complete bushfire restoration process: structural assessment, ash and soot removal, smoke odour treatment, and rebuilding in fire-affected Australian communities.',
    duration: 'PT3M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/bushfire-damage-restoration', '/disasters/bushfire-restoration'],
    category: 'bushfire',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_CYCLONE',
    title: 'Cyclone Damage Recovery — Tropical Storm Restoration',
    description: 'How disaster recovery teams respond to cyclone and tropical storm damage in Northern Australia: emergency make-safe, water extraction, and structural repairs.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/services/cyclone-damage-restoration', '/disasters/cyclone-response'],
    category: 'cyclone',
    status: 'planned',
  },

  // === TIER 4: EDUCATIONAL / GUIDE VIDEOS ===
  {
    youtubeId: 'PLACEHOLDER_PREVENT_MOULD',
    title: 'How to Prevent Mould After Flooding — Expert Tips',
    description: 'Essential steps to prevent mould growth after water damage or flooding. Learn the 48-hour window, ventilation techniques, and when to call professionals.',
    duration: 'PT2M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/guides/mould', '/guides/water-damage'],
    category: 'guide',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_WHAT_TO_DO_FLOOD',
    title: 'What to Do After a Flood in Australia — Homeowner Guide',
    description: 'Step-by-step actions after your home floods: safety first, document damage for insurance, contact your insurer, and engage professional restoration.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/guides/water-damage', '/emergency-guide'],
    category: 'guide',
    status: 'planned',
  },
  {
    youtubeId: 'PLACEHOLDER_FIRE_SAFETY',
    title: 'After a House Fire — First Steps for Australian Homeowners',
    description: 'What to do after a house fire in Australia: safety, insurance notification, make-safe, contents recovery, and the restoration timeline.',
    duration: 'PT2M30S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/guides/fire-damage'],
    category: 'guide',
    status: 'planned',
  },

  // === TIER 5: CONTRACTOR / PLATFORM VIDEOS ===
  {
    youtubeId: 'PLACEHOLDER_CONTRACTOR',
    title: 'Join the Disaster Recovery Network — Contractor Opportunities',
    description: 'How IICRC-certified restoration contractors can join Australia\'s largest disaster recovery network. Receive qualified leads, grow your business, and help communities recover.',
    duration: 'PT2M00S',
    uploadDate: '2026-01-01T00:00:00+10:00',
    pages: ['/contractors', '/contractors/apply'],
    category: 'contractor',
    status: 'planned',
  },
];

// ============================================================
// LOOKUP HELPERS
// ============================================================

/** Get videos for a specific page path */
export function getVideosForPage(pagePath: string): VideoConfig[] {
  return videoConfig.filter(v => v.pages.includes(pagePath) && v.status === 'live');
}

/** Get the primary video for a service category */
export function getVideoForService(serviceCategory: string): VideoConfig | undefined {
  return videoConfig.find(v => v.category === serviceCategory && v.status === 'live');
}

/** Get all videos that are live */
export function getLiveVideos(): VideoConfig[] {
  return videoConfig.filter(v => v.status === 'live');
}

/** Get all videos that need to be created */
export function getPlannedVideos(): VideoConfig[] {
  return videoConfig.filter(v => v.status === 'planned');
}

// ============================================================
// SUMMARY
// ============================================================
export const videoSummary = {
  total: videoConfig.length,
  byStatus: {
    live: videoConfig.filter(v => v.status === 'live').length,
    planned: videoConfig.filter(v => v.status === 'planned').length,
    filming: videoConfig.filter(v => v.status === 'filming').length,
  },
  byTier: {
    'core-service': 6,
    'brand-how-it-works': 2,
    'specialist-niche': 4,
    'educational-guide': 3,
    'contractor-platform': 1,
  },
};

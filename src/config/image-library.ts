// Image Library Configuration
// Defines all disaster recovery and equipment images with optimisation settings

export interface ImageAsset {
  id: string;
  name: string;
  category: ImageCategory;
  originalPath?: string;
  description: string;
  tags: string[];
  formats: {
    webp?: string;
    avif?: string;
    jpg?: string;
    png?: string;
  };
  sizes: {
    thumbnail?: string;  // 150x150
    small?: string;      // 400x400
    medium?: string;     // 800x800
    large?: string;      // 1200x1200
    original?: string;   // Full size
  };
  dimensions?: {
    width: number;
    height: number;
  };
  fileSize?: number;
  alt: string;
}

export type ImageCategory = 
  | 'damage-types'
  | 'equipment-air-movers'
  | 'equipment-dehumidifiers'
  | 'equipment-extractors'
  | 'equipment-filters'
  | 'mould-damage'
  | 'water-damage'
  | 'fire-damage'
  | 'restoration-process';

// Image Library Database
export const IMAGE_LIBRARY: ImageAsset[] = [
  // Damage Types - Mould
  {
    id: 'mould-ceiling-01',
    name: '3D Mould on Ceiling',
    category: 'mould-damage',
    description: '3D visualization of mould growth on ceiling surface',
    tags: ['mould', 'ceiling', 'damage', 'indoor', 'remediation'],
    formats: {
      webp: '/images/damage/mould/ceiling-mould.webp',
      jpg: '/images/damage/mould/ceiling-mould.jpg',
      png: '/images/damage/mould/ceiling-mould.png'
    },
    sizes: {
      thumbnail: '/images/damage/mould/ceiling-mould-thumb.webp',
      small: '/images/damage/mould/ceiling-mould-sm.webp',
      medium: '/images/damage/mould/ceiling-mould-md.webp',
      large: '/images/damage/mould/ceiling-mould-lg.webp'
    },
    alt: 'Black mould growth spreading across ceiling surface requiring professional remediation'
  },
  {
    id: 'mould-spores-01',
    name: '3D Mould Spores',
    category: 'mould-damage',
    description: '3D microscopic view of mould spores',
    tags: ['mould', 'spores', 'microscopic', 'health-hazard', 'air-quality'],
    formats: {
      webp: '/images/damage/mould/mould-spores.webp',
      jpg: '/images/damage/mould/mould-spores.jpg',
      png: '/images/damage/mould/mould-spores.png'
    },
    sizes: {
      thumbnail: '/images/damage/mould/mould-spores-thumb.webp',
      small: '/images/damage/mould/mould-spores-sm.webp',
      medium: '/images/damage/mould/mould-spores-md.webp',
      large: '/images/damage/mould/mould-spores-lg.webp'
    },
    alt: 'Microscopic view of dangerous mould spores that can affect air quality'
  },

  // Fire Damage
  {
    id: 'kitchen-fire-01',
    name: '3D Kitchen Fire',
    category: 'fire-damage',
    description: '3D visualization of kitchen fire damage',
    tags: ['fire', 'kitchen', 'damage', 'smoke', 'restoration'],
    formats: {
      webp: '/images/damage/fire/kitchen-fire.webp',
      jpg: '/images/damage/fire/kitchen-fire.jpg',
      png: '/images/damage/fire/kitchen-fire.png'
    },
    sizes: {
      thumbnail: '/images/damage/fire/kitchen-fire-thumb.webp',
      small: '/images/damage/fire/kitchen-fire-sm.webp',
      medium: '/images/damage/fire/kitchen-fire-md.webp',
      large: '/images/damage/fire/kitchen-fire-lg.webp'
    },
    alt: 'Kitchen fire damage showing burned cabinets and smoke damage requiring restoration'
  },

  // Water Damage
  {
    id: 'water-damage-home-01',
    name: '3D Water Damage to a Home',
    category: 'water-damage',
    description: '3D visualization of residential water damage',
    tags: ['water', 'flood', 'damage', 'residential', 'restoration'],
    formats: {
      webp: '/images/damage/water/home-water-damage.webp',
      jpg: '/images/damage/water/home-water-damage.jpg',
      png: '/images/damage/water/home-water-damage.png'
    },
    sizes: {
      thumbnail: '/images/damage/water/home-water-damage-thumb.webp',
      small: '/images/damage/water/home-water-damage-sm.webp',
      medium: '/images/damage/water/home-water-damage-md.webp',
      large: '/images/damage/water/home-water-damage-lg.webp'
    },
    alt: 'Flooded home interior showing standing water requiring emergency extraction'
  },
  {
    id: 'water-mould-ceiling-01',
    name: '3D Water Damage Mould on ceiling',
    category: 'water-damage',
    description: '3D visualization of water damage causing mould on ceiling',
    tags: ['water', 'mould', 'ceiling', 'secondary-damage', 'remediation'],
    formats: {
      webp: '/images/damage/water/water-mould-ceiling.webp',
      jpg: '/images/damage/water/water-mould-ceiling.jpg',
      png: '/images/damage/water/water-mould-ceiling.png'
    },
    sizes: {
      thumbnail: '/images/damage/water/water-mould-ceiling-thumb.webp',
      small: '/images/damage/water/water-mould-ceiling-sm.webp',
      medium: '/images/damage/water/water-mould-ceiling-md.webp',
      large: '/images/damage/water/water-mould-ceiling-lg.webp'
    },
    alt: 'Water damage on ceiling causing mould growth requiring dual remediation'
  },
  {
    id: 'burst-pipe-01',
    name: '3D Burst Water Pipe',
    category: 'water-damage',
    description: '3D visualization of burst water pipe',
    tags: ['pipe', 'burst', 'plumbing', 'emergency', 'water'],
    formats: {
      webp: '/images/damage/water/burst-pipe.webp',
      jpg: '/images/damage/water/burst-pipe.jpg',
      png: '/images/damage/water/burst-pipe.png'
    },
    sizes: {
      thumbnail: '/images/damage/water/burst-pipe-thumb.webp',
      small: '/images/damage/water/burst-pipe-sm.webp',
      medium: '/images/damage/water/burst-pipe-md.webp',
      large: '/images/damage/water/burst-pipe-lg.webp'
    },
    alt: 'Burst water pipe causing flooding emergency requiring immediate response'
  },

  // Restoration Process
  {
    id: 'air-drying-carpet-01',
    name: '3D Air movement drying carpet',
    category: 'restoration-process',
    description: '3D visualization of carpet drying process',
    tags: ['drying', 'carpet', 'air-movement', 'restoration', 'process'],
    formats: {
      webp: '/images/process/drying/carpet-drying.webp',
      jpg: '/images/process/drying/carpet-drying.jpg',
      png: '/images/process/drying/carpet-drying.png'
    },
    sizes: {
      thumbnail: '/images/process/drying/carpet-drying-thumb.webp',
      small: '/images/process/drying/carpet-drying-sm.webp',
      medium: '/images/process/drying/carpet-drying-md.webp',
      large: '/images/process/drying/carpet-drying-lg.webp'
    },
    alt: 'Professional carpet drying setup with air movers for water damage restoration'
  },

  // Equipment - Air Movers
  {
    id: 'air-mover-standard-01',
    name: '3D Air Mover',
    category: 'equipment-air-movers',
    description: '3D model of standard air mover equipment',
    tags: ['equipment', 'air-mover', 'drying', 'restoration', 'professional'],
    formats: {
      webp: '/images/equipment/air-movers/standard-air-mover.webp',
      jpg: '/images/equipment/air-movers/standard-air-mover.jpg',
      png: '/images/equipment/air-movers/standard-air-mover.png'
    },
    sizes: {
      thumbnail: '/images/equipment/air-movers/standard-air-mover-thumb.webp',
      small: '/images/equipment/air-movers/standard-air-mover-sm.webp',
      medium: '/images/equipment/air-movers/standard-air-mover-md.webp',
      large: '/images/equipment/air-movers/standard-air-mover-lg.webp'
    },
    alt: 'Professional grade air mover for structural drying and water damage restoration'
  },
  {
    id: 'air-mover-low-profile-01',
    name: '3D Low Profile Air Mover',
    category: 'equipment-air-movers',
    description: '3D model of low profile air mover',
    tags: ['equipment', 'air-mover', 'low-profile', 'crawlspace', 'drying'],
    formats: {
      webp: '/images/equipment/air-movers/low-profile-air-mover.webp',
      jpg: '/images/equipment/air-movers/low-profile-air-mover.jpg',
      png: '/images/equipment/air-movers/low-profile-air-mover.png'
    },
    sizes: {
      thumbnail: '/images/equipment/air-movers/low-profile-air-mover-thumb.webp',
      small: '/images/equipment/air-movers/low-profile-air-mover-sm.webp',
      medium: '/images/equipment/air-movers/low-profile-air-mover-md.webp',
      large: '/images/equipment/air-movers/low-profile-air-mover-lg.webp'
    },
    alt: 'Low profile air mover for tight spaces and under-cabinet drying'
  },
  {
    id: 'phoenix-afd-01',
    name: '3D Phoenix AFD flat view',
    category: 'equipment-air-movers',
    description: '3D model of Phoenix AFD air mover',
    tags: ['equipment', 'phoenix', 'afd', 'air-mover', 'professional'],
    formats: {
      webp: '/images/equipment/air-movers/phoenix-afd.webp',
      jpg: '/images/equipment/air-movers/phoenix-afd.jpg',
      png: '/images/equipment/air-movers/phoenix-afd.png'
    },
    sizes: {
      thumbnail: '/images/equipment/air-movers/phoenix-afd-thumb.webp',
      small: '/images/equipment/air-movers/phoenix-afd-sm.webp',
      medium: '/images/equipment/air-movers/phoenix-afd-md.webp',
      large: '/images/equipment/air-movers/phoenix-afd-lg.webp'
    },
    alt: 'Phoenix AFD professional air mover for high-velocity structural drying'
  },

  // Equipment - Dehumidifiers
  {
    id: 'dehumidifier-standard-01',
    name: '3D Model Dehumidifier',
    category: 'equipment-dehumidifiers',
    description: '3D model of standard dehumidifier',
    tags: ['equipment', 'dehumidifier', 'moisture-control', 'drying', 'restoration'],
    formats: {
      webp: '/images/equipment/dehumidifiers/standard-dehumidifier.webp',
      jpg: '/images/equipment/dehumidifiers/standard-dehumidifier.jpg',
      png: '/images/equipment/dehumidifiers/standard-dehumidifier.png'
    },
    sizes: {
      thumbnail: '/images/equipment/dehumidifiers/standard-dehumidifier-thumb.webp',
      small: '/images/equipment/dehumidifiers/standard-dehumidifier-sm.webp',
      medium: '/images/equipment/dehumidifiers/standard-dehumidifier-md.webp',
      large: '/images/equipment/dehumidifiers/standard-dehumidifier-lg.webp'
    },
    alt: 'Commercial grade dehumidifier for moisture extraction and humidity control'
  },
  {
    id: 'lgr-dehumidifier-01',
    name: '3D LGR Dehumidifier',
    category: 'equipment-dehumidifiers',
    description: '3D model of LGR (Low Grain Refrigerant) dehumidifier',
    tags: ['equipment', 'lgr', 'dehumidifier', 'high-efficiency', 'professional'],
    formats: {
      webp: '/images/equipment/dehumidifiers/lgr-dehumidifier.webp',
      jpg: '/images/equipment/dehumidifiers/lgr-dehumidifier.jpg',
      png: '/images/equipment/dehumidifiers/lgr-dehumidifier.png'
    },
    sizes: {
      thumbnail: '/images/equipment/dehumidifiers/lgr-dehumidifier-thumb.webp',
      small: '/images/equipment/dehumidifiers/lgr-dehumidifier-sm.webp',
      medium: '/images/equipment/dehumidifiers/lgr-dehumidifier-md.webp',
      large: '/images/equipment/dehumidifiers/lgr-dehumidifier-lg.webp'
    },
    alt: 'LGR dehumidifier for extreme moisture removal in water damage restoration'
  },
  {
    id: 'evolution-dh-01',
    name: '3D Evolution DH Image',
    category: 'equipment-dehumidifiers',
    description: '3D model of Evolution dehumidifier',
    tags: ['equipment', 'evolution', 'dehumidifier', 'commercial', 'drying'],
    formats: {
      webp: '/images/equipment/dehumidifiers/evolution-dh.webp',
      jpg: '/images/equipment/dehumidifiers/evolution-dh.jpg',
      png: '/images/equipment/dehumidifiers/evolution-dh.png'
    },
    sizes: {
      thumbnail: '/images/equipment/dehumidifiers/evolution-dh-thumb.webp',
      small: '/images/equipment/dehumidifiers/evolution-dh-sm.webp',
      medium: '/images/equipment/dehumidifiers/evolution-dh-md.webp',
      large: '/images/equipment/dehumidifiers/evolution-dh-lg.webp'
    },
    alt: 'Evolution commercial dehumidifier for large-scale water damage projects'
  },

  // Equipment - Extractors
  {
    id: 'water-extractor-01',
    name: '3D Professional Water Extractor',
    category: 'equipment-extractors',
    description: '3D model of professional water extractor',
    tags: ['equipment', 'extractor', 'water-removal', 'flood', 'professional'],
    formats: {
      webp: '/images/equipment/extractors/water-extractor.webp',
      jpg: '/images/equipment/extractors/water-extractor.jpg',
      png: '/images/equipment/extractors/water-extractor.png'
    },
    sizes: {
      thumbnail: '/images/equipment/extractors/water-extractor-thumb.webp',
      small: '/images/equipment/extractors/water-extractor-sm.webp',
      medium: '/images/equipment/extractors/water-extractor-md.webp',
      large: '/images/equipment/extractors/water-extractor-lg.webp'
    },
    alt: 'Professional water extraction unit for emergency flood water removal'
  },
  {
    id: 'spotting-machine-01',
    name: '3D Spotting Machine',
    category: 'equipment-extractors',
    description: '3D model of carpet spotting machine',
    tags: ['equipment', 'spotting', 'carpet', 'cleaning', 'extraction'],
    formats: {
      webp: '/images/equipment/extractors/spotting-machine.webp',
      jpg: '/images/equipment/extractors/spotting-machine.jpg',
      png: '/images/equipment/extractors/spotting-machine.png'
    },
    sizes: {
      thumbnail: '/images/equipment/extractors/spotting-machine-thumb.webp',
      small: '/images/equipment/extractors/spotting-machine-sm.webp',
      medium: '/images/equipment/extractors/spotting-machine-md.webp',
      large: '/images/equipment/extractors/spotting-machine-lg.webp'
    },
    alt: 'Carpet spotting and extraction machine for detailed cleaning and water removal'
  },

  // Equipment - Filters
  {
    id: 'hepa-filters-01',
    name: '3D HEPA Filters',
    category: 'equipment-filters',
    description: '3D model of HEPA air filtration system',
    tags: ['equipment', 'hepa', 'filter', 'air-quality', 'purification'],
    formats: {
      webp: '/images/equipment/filters/hepa-filters.webp',
      jpg: '/images/equipment/filters/hepa-filters.jpg',
      png: '/images/equipment/filters/hepa-filters.png'
    },
    sizes: {
      thumbnail: '/images/equipment/filters/hepa-filters-thumb.webp',
      small: '/images/equipment/filters/hepa-filters-sm.webp',
      medium: '/images/equipment/filters/hepa-filters-md.webp',
      large: '/images/equipment/filters/hepa-filters-lg.webp'
    },
    alt: 'HEPA air filtration system for removing airborne contaminants during restoration'
  },

  // Process Documentation
  {
    id: 'moisture-meter-01',
    name: 'Moisture Meter Readings',
    category: 'restoration-process',
    description: 'Professional moisture meter taking readings during water damage assessment',
    tags: ['moisture-meter', 'measurement', 'assessment', 'water-damage', 'documentation'],
    formats: {
      webp: '/images/process/measurement/moisture-meter-readings.webp',
      jpg: '/images/process/measurement/moisture-meter-readings.jpg',
      png: '/images/process/measurement/moisture-meter-readings.png'
    },
    sizes: {
      thumbnail: '/images/process/measurement/moisture-meter-thumb.webp',
      small: '/images/process/measurement/moisture-meter-sm.webp',
      medium: '/images/process/measurement/moisture-meter-md.webp',
      large: '/images/process/measurement/moisture-meter-lg.webp'
    },
    alt: 'Certified technician using professional moisture meter to assess water damage levels'
  },
  {
    id: 'documentation-structure-01',
    name: 'Project Documentation Structure Guidelines',
    category: 'restoration-process',
    description: 'Comprehensive documentation structure for restoration projects',
    tags: ['documentation', 'project-management', 'compliance', 'insurance', 'reporting'],
    formats: {
      webp: '/images/process/documentation/project-documentation.webp',
      jpg: '/images/process/documentation/project-documentation.jpg',
      png: '/images/process/documentation/project-documentation.png'
    },
    sizes: {
      thumbnail: '/images/process/documentation/project-documentation-thumb.webp',
      small: '/images/process/documentation/project-documentation-sm.webp',
      medium: '/images/process/documentation/project-documentation-md.webp',
      large: '/images/process/documentation/project-documentation-lg.webp'
    },
    alt: 'Professional project documentation structure for insurance and compliance requirements'
  },

  // Partner and Certification Logos
  {
    id: 'carsi-logo-3d',
    name: '3D CARSI Logo',
    category: 'branding',
    description: 'CARSI (Carpet and Restoration Services Institute) certification logo',
    tags: ['certification', 'carsi', 'logo', 'professional', 'accreditation', 'partner'],
    formats: {
      webp: '/images/branding/partners/carsi-logo-3d.webp',
      jpg: '/images/branding/partners/carsi-logo-3d.jpg',
      png: '/images/branding/partners/carsi-logo-3d.png'
    },
    sizes: {
      thumbnail: '/images/branding/partners/carsi-logo-3d-thumb.webp',
      small: '/images/branding/partners/carsi-logo-3d-sm.webp',
      medium: '/images/branding/partners/carsi-logo-3d-md.webp',
      large: '/images/branding/partners/carsi-logo-3d-lg.webp'
    },
    alt: 'CARSI certification logo - Carpet and Restoration Services Institute accreditation'
  },
  {
    id: 'carsi-logo-00',
    name: 'CARSI Logo 00',
    category: 'branding',
    description: 'CARSI official certification logo variant',
    tags: ['certification', 'carsi', 'logo', 'professional', 'accreditation'],
    formats: {
      webp: '/images/branding/partners/carsi-logo-00.webp',
      jpg: '/images/branding/partners/carsi-logo-00.jpg',
      png: '/images/branding/partners/carsi-logo-00.png'
    },
    sizes: {
      thumbnail: '/images/branding/partners/carsi-logo-00-thumb.webp',
      small: '/images/branding/partners/carsi-logo-00-sm.webp',
      medium: '/images/branding/partners/carsi-logo-00-md.webp',
      large: '/images/branding/partners/carsi-logo-00-lg.webp'
    },
    alt: 'CARSI professional certification logo for restoration services'
  },
  {
    id: 'carsi-logo-01',
    name: 'CARSI Logo 01',
    category: 'branding',
    description: 'CARSI certification badge for professional restoration',
    tags: ['certification', 'carsi', 'logo', 'badge', 'accreditation'],
    formats: {
      webp: '/images/branding/partners/carsi-logo-01.webp',
      jpg: '/images/branding/partners/carsi-logo-01.jpg',
      png: '/images/branding/partners/carsi-logo-01.png'
    },
    sizes: {
      thumbnail: '/images/branding/partners/carsi-logo-01-thumb.webp',
      small: '/images/branding/partners/carsi-logo-01-sm.webp',
      medium: '/images/branding/partners/carsi-logo-01-md.webp',
      large: '/images/branding/partners/carsi-logo-01-lg.webp'
    },
    alt: 'CARSI certification badge demonstrating professional restoration standards'
  },
  
  // Main Company Branding
  {
    id: 'disaster-recovery-logo-3d',
    name: '3D Disaster Recovery Logo',
    category: 'branding',
    description: 'Official 3D Disaster Recovery Australia company logo',
    tags: ['logo', 'branding', 'disaster-recovery', 'company', 'official', 'main-logo', 'hero'],
    formats: {
      webp: '/images/branding/disaster-recovery-logo-3d.webp',
      jpg: '/images/branding/disaster-recovery-logo-3d.jpg',
      png: '/images/branding/disaster-recovery-logo-3d.png'
    },
    sizes: {
      thumbnail: '/images/branding/disaster-recovery-logo-3d-thumb.webp',
      small: '/images/branding/disaster-recovery-logo-3d-sm.webp',
      medium: '/images/branding/disaster-recovery-logo-3d-md.webp',
      large: '/images/branding/disaster-recovery-logo-3d-lg.webp'
    },
    alt: 'Disaster Recovery Australia - 24/7 Emergency Restoration Services | Water, Fire, Mould Damage Specialists'
  },
  {
    id: 'disaster-recovery-logo-standard',
    name: 'Disaster Recovery Logo',
    category: 'branding',
    description: 'Disaster Recovery Australia standard company logo',
    tags: ['logo', 'branding', 'disaster-recovery', 'company', 'official', 'standard-logo', 'header'],
    formats: {
      webp: '/images/branding/disaster-recovery-logo.webp',
      jpg: '/images/branding/disaster-recovery-logo.jpg',
      png: '/images/branding/disaster-recovery-logo.png'
    },
    sizes: {
      thumbnail: '/images/branding/disaster-recovery-logo-thumb.webp',
      small: '/images/branding/disaster-recovery-logo-sm.webp',
      medium: '/images/branding/disaster-recovery-logo-md.webp',
      large: '/images/branding/disaster-recovery-logo-lg.webp'
    },
    alt: 'Disaster Recovery Australia Logo - Professional Emergency Restoration Services Nationwide'
  },

  // Additional Equipment Images  
  {
    id: 'equipment-moisture-reading-01',
    name: '3D Moisture Meter Reading',
    category: 'equipment-extractors',
    description: '3D visualization of moisture meter taking readings on damaged surface',
    originalPath: '3D Moisture Meter Reading.png',
    tags: ['equipment', 'moisture meter', 'reading', 'detection', 'assessment', '3d'],
    formats: {
      png: '/images/optimised/equipment/3D Moisture Meter Reading.png',
      webp: '/images/optimised/equipment/3D Moisture Meter Reading.webp',
      jpg: '/images/optimised/equipment/3D Moisture Meter Reading.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/equipment/thumb/3D Moisture Meter Reading.png',
      small: '/images/optimised/equipment/small/3D Moisture Meter Reading.png',
      medium: '/images/optimised/equipment/medium/3D Moisture Meter Reading.png',
      large: '/images/optimised/equipment/large/3D Moisture Meter Reading.png',
      original: '/images/optimised/equipment/3D Moisture Meter Reading.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D moisture meter reading - Professional water damage detection equipment in action'
  },

  // Fire Damage Scenarios
  {
    id: 'fire-damage-house-01',
    name: '3D House Fire Damage',
    category: 'fire-damage',
    description: '3D visualization of residential house fire damage requiring restoration',
    originalPath: '3D image of a house fire.png',
    tags: ['fire damage', 'house fire', 'residential', 'emergency', 'restoration', '3d'],
    formats: {
      png: '/images/optimised/damage/3D image of a house fire.png',
      webp: '/images/optimised/damage/3D image of a house fire.webp',
      jpg: '/images/optimised/damage/3D image of a house fire.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/damage/thumb/3D image of a house fire.png',
      small: '/images/optimised/damage/small/3D image of a house fire.png',
      medium: '/images/optimised/damage/medium/3D image of a house fire.png',
      large: '/images/optimised/damage/large/3D image of a house fire.png',
      original: '/images/optimised/damage/3D image of a house fire.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D house fire damage visualization - Emergency fire restoration services needed'
  },

  // Vehicle Damage Scenarios
  {
    id: 'damage-vehicle-impact-01',
    name: '3D Vehicle Into Home Impact',
    category: 'damage-types',
    description: '3D visualization of vehicle collision with residential structure requiring emergency restoration',
    originalPath: '3D Vehicle into Home.png',
    tags: ['vehicle damage', 'structural damage', 'collision', 'emergency', 'restoration', '3d', 'impact'],
    formats: {
      png: '/images/optimised/damage/3D Vehicle into Home.png',
      webp: '/images/optimised/damage/3D Vehicle into Home.webp',
      jpg: '/images/optimised/damage/3D Vehicle into Home.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/damage/thumb/3D Vehicle into Home.png',
      small: '/images/optimised/damage/small/3D Vehicle into Home.png',
      medium: '/images/optimised/damage/medium/3D Vehicle into Home.png',
      large: '/images/optimised/damage/large/3D Vehicle into Home.png',
      original: '/images/optimised/damage/3D Vehicle into Home.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D vehicle impact into home - Emergency structural damage restoration and repair services'
  },

  // Specialised Cleanup Services
  {
    id: 'cleanup-squalor-emergency-01',
    name: '3D Emergency Squalor Cleanup',
    category: 'restoration-process',
    description: '3D visualization of professional squalor and hoarding cleanup services',
    originalPath: '3D Emergency Squalor Cleanup.png',
    tags: ['squalor cleanup', 'hoarding cleanup', 'biohazard', 'deep cleaning', 'restoration', '3d', 'emergency cleanup', 'sanitization'],
    formats: {
      png: '/images/optimised/process/3D Emergency Squalor Cleanup.png',
      webp: '/images/optimised/process/3D Emergency Squalor Cleanup.webp',
      jpg: '/images/optimised/process/3D Emergency Squalor Cleanup.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/process/thumb/3D Emergency Squalor Cleanup.png',
      small: '/images/optimised/process/small/3D Emergency Squalor Cleanup.png',
      medium: '/images/optimised/process/medium/3D Emergency Squalor Cleanup.png',
      large: '/images/optimised/process/large/3D Emergency Squalor Cleanup.png',
      original: '/images/optimised/process/3D Emergency Squalor Cleanup.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D emergency squalor cleanup - Professional hoarding and biohazard cleaning services'
  },

  // Deodorization and Sanitization Equipment
  {
    id: 'equipment-thermal-fogging-01',
    name: '3D Thermal Fogging Equipment',
    category: 'equipment-filters',
    description: '3D visualization of thermal fogging equipment for odour elimination and sanitization',
    originalPath: '3D Thermal Fogging.png',
    tags: ['thermal fogging', 'deodorization', 'sanitization', 'odour removal', 'smoke damage', 'equipment', '3d', 'disinfection'],
    formats: {
      png: '/images/optimised/equipment/3D Thermal Fogging.png',
      webp: '/images/optimised/equipment/3D Thermal Fogging.webp',
      jpg: '/images/optimised/equipment/3D Thermal Fogging.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/equipment/thumb/3D Thermal Fogging.png',
      small: '/images/optimised/equipment/small/3D Thermal Fogging.png',
      medium: '/images/optimised/equipment/medium/3D Thermal Fogging.png',
      large: '/images/optimised/equipment/large/3D Thermal Fogging.png',
      original: '/images/optimised/equipment/3D Thermal Fogging.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D thermal fogging equipment - Professional odour elimination and sanitization technology'
  },

  // Hazardous Material Cleanup
  {
    id: 'cleanup-hazardous-01',
    name: '3D Hazardous Cleaning Services',
    category: 'restoration-process',
    description: '3D visualization of hazardous material cleanup and biohazard remediation services',
    originalPath: '3D Hazardous Cleaning.png',
    tags: ['hazardous cleanup', 'biohazard', 'hazmat', 'chemical spill', 'contamination', 'safety equipment', '3d', 'industrial cleaning', 'environmental cleanup'],
    formats: {
      png: '/images/optimised/process/3D Hazardous Cleaning.png',
      webp: '/images/optimised/process/3D Hazardous Cleaning.webp',
      jpg: '/images/optimised/process/3D Hazardous Cleaning.jpg'
    },
    sizes: {
      thumbnail: '/images/optimised/process/thumb/3D Hazardous Cleaning.png',
      small: '/images/optimised/process/small/3D Hazardous Cleaning.png',
      medium: '/images/optimised/process/medium/3D Hazardous Cleaning.png',
      large: '/images/optimised/process/large/3D Hazardous Cleaning.png',
      original: '/images/optimised/process/3D Hazardous Cleaning.png'
    },
    dimensions: {
      width: 1920,
      height: 1080
    },
    alt: '3D hazardous cleaning services - Professional biohazard and hazmat cleanup specialists'
  }
];

// Helper functions for image optimisation
export const getOptimizedImageSrc = (
  imageId: string,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium',
  format?: 'webp' | 'avif' | 'jpg' | 'png'
): string => {
  const image = IMAGE_LIBRARY.find(img => img.id === imageId);
  if (!image) return '/images/placeholder.jpg';

  // Try to get the requested format and size
  if (format && image.formats[format]) {
    return image.formats[format];
  }

  // Return the appropriate size in webp format (preferred)
  if (image.sizes[size]) {
    return image.sizes[size];
  }

  // Fallback to medium webp
  return image.sizes.medium || image.formats.webp || '/images/placeholder.jpg';
};

export const getImagesByCategory = (category: ImageCategory): ImageAsset[] => {
  return IMAGE_LIBRARY.filter(img => img.category === category);
};

export const getImagesByTags = (tags: string[]): ImageAsset[] => {
  return IMAGE_LIBRARY.filter(img => 
    tags.some(tag => img.tags.includes(tag))
  );
};

export const searchImages = (query: string): ImageAsset[] => {
  const lowercaseQuery = query.toLowerCase();
  return IMAGE_LIBRARY.filter(img =>
    img.name.toLowerCase().includes(lowercaseQuery) ||
    img.description.toLowerCase().includes(lowercaseQuery) ||
    img.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
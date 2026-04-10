import type { GuideAuthor } from '@/components/antigravity/AgGuidePageTemplate';

/**
 * Default author for water damage and general restoration guides.
 * IICRC WRT (Water Damage Restoration Technician) + ASD (Applied Structural Drying).
 */
export const WATER_DAMAGE_AUTHOR: GuideAuthor = {
  name: 'NRPG Technical Editorial Team',
  jobTitle: 'IICRC-Certified Water Damage Restoration Specialist',
  credentials: ['IICRC WRT', 'IICRC ASD'],
  url: 'https://disasterrecovery.com.au/about',
};

/**
 * Author for insurance and claims-related guides.
 * Highlights IICRC certification and insurance process expertise.
 */
export const INSURANCE_GUIDE_AUTHOR: GuideAuthor = {
  name: 'NRPG Technical Editorial Team',
  jobTitle: 'IICRC-Certified Restoration Specialist & Insurance Claims Adviser',
  credentials: ['IICRC WRT', 'IICRC ASD', 'IICRC FSRT'],
  url: 'https://disasterrecovery.com.au/about',
};

/**
 * Author for fire and smoke damage guides.
 */
export const FIRE_DAMAGE_AUTHOR: GuideAuthor = {
  name: 'NRPG Technical Editorial Team',
  jobTitle: 'IICRC-Certified Fire & Smoke Restoration Technician',
  credentials: ['IICRC FSRT', 'IICRC OCT'],
  url: 'https://disasterrecovery.com.au/about',
};

/**
 * Author for mould remediation guides.
 */
export const MOULD_AUTHOR: GuideAuthor = {
  name: 'NRPG Technical Editorial Team',
  jobTitle: 'IICRC-Certified Mould Remediation Specialist',
  credentials: ['IICRC AMRT', 'IICRC WRT'],
  url: 'https://disasterrecovery.com.au/about',
};

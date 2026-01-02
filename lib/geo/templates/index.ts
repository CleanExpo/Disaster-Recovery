/**
 * SEO/GEO Page Templates - Barrel Export
 * Disaster Recovery - NRPG Platform
 *
 * Template types and generators for dynamically generated location pages:
 * - Landing Pages: /{suburb}/{service}
 * - Pillar Pages: /{city}/{service}
 * - Service Pages: /services/{service}
 * - Region Pages: /regions/{region}
 *
 * Usage:
 * import {
 *   generateLandingPage,
 *   generatePillarPage,
 *   generateServicePage,
 *   generateRegionPage,
 *   SERVICE_CONFIG,
 *   MAJOR_CITIES,
 *   REGIONS,
 * } from '@/lib/geo/templates';
 */

// ============================================
// Types
// ============================================
export type {
  // Base Types
  BaseSEOPage,
  Breadcrumb,
  RelatedPage,

  // Landing Page
  LandingPageTemplate,

  // Pillar Page
  PillarPageTemplate,
  SuburbLink,

  // Service Page
  ServicePageTemplate,
  CityLink,
  RelatedService,
  CostGuide,

  // Region Page
  RegionPageTemplate,
  DisasterRisk,
  ServiceAvailability,
  SuburbDirectory,

  // Content Types
  ProcessStep,
  FAQ,
  Testimonial,
  CTAButton,

  // Schema Types
  SchemaMarkup,
  SchemaEntity,
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
  OrganisationSchema,

  // Open Graph
  OpenGraphData,

  // Configuration
  TemplateConfig,
  PageType,
  SEOPageTemplate,
} from './types';

// ============================================
// Constants
// ============================================
export {
  DEFAULT_TEMPLATE_CONFIG,
  SERVICE_DISPLAY_NAMES,
  SERVICE_SLUGS,
  SERVICE_ICONS,
} from './types';

// ============================================
// Landing Page Generator
// ============================================
export {
  SERVICE_CONFIG,
  generateLandingPage,
  generateAllLandingPagesForSuburb,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from './landing-page-generator';

export type { LandingPageInput } from './landing-page-generator';

// ============================================
// Pillar Page Generator
// ============================================
export {
  MAJOR_CITIES,
  generatePillarPage,
  generateAllPillarPagesForCity,
  getCityBySlug,
  getAllCitySlugs,
} from './pillar-page-generator';

export type { CityData, PillarPageInput } from './pillar-page-generator';

// ============================================
// Service Page Generator
// ============================================
export {
  generateServicePage,
  generateAllServicePages,
  getServiceContent,
  getAllServiceTypes,
  getServiceBySlug,
} from './service-page-generator';

export type { ServicePageInput } from './service-page-generator';

// ============================================
// Region Page Generator
// ============================================
export {
  REGIONS,
  STATE_REGIONS,
  generateRegionPage,
  generateAllRegionPages,
  getRegionById,
  getAllRegionIds,
  getStateRegion,
} from './region-page-generator';

export type { RegionData, RegionPageInput } from './region-page-generator';

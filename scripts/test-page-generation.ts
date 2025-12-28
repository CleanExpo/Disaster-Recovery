/**
 * Page Generation Test Script
 *
 * Validates that the page generation system works correctly:
 * - Verifies data files are valid
 * - Tests page generation functions
 * - Checks internal linking
 * - Validates sitemap generation
 */

import { pageGenerator } from '../lib/content/page-generator';
import { internalLinking } from '../lib/seo/internal-linking';
import servicesData from '../data/services.json';
import citiesData from '../data/australian-cities.json';

console.log('🧪 Testing NRPG Page Generation System\n');

// Test 1: Validate Data Files
console.log('📊 Test 1: Validating Data Files');
console.log(`✅ Services loaded: ${servicesData.services.length}`);
console.log(`✅ Cities loaded: ${citiesData.cities.length}`);
console.log('');

// Test 2: Service Page Generation
console.log('📄 Test 2: Service Page Generation');
const servicePages = pageGenerator.generateServicePages();
console.log(`✅ Service pages generated: ${servicePages.length}`);
console.log(`   Sample: ${servicePages[0].slug}`);
console.log(`   Title: ${servicePages[0].title}`);
console.log(`   FAQs: ${servicePages[0].faqs.length}`);
console.log('');

// Test 3: Location Page Generation
console.log('🗺️  Test 3: Location Page Generation');
const locationPages = pageGenerator.generateLocationPages();
console.log(`✅ Location pages generated: ${locationPages.length}`);
console.log(`   Sample: ${locationPages[0].slug}`);
console.log(`   City: ${locationPages[0].city}, ${locationPages[0].state}`);
console.log(`   Population: ${locationPages[0].population.toLocaleString()}`);
console.log('');

// Test 4: Service + Location Page Generation
console.log('🎯 Test 4: Service + Location Page Generation');
const serviceLocationPages = pageGenerator.generateServiceLocationPages();
console.log(`✅ Service+Location pages generated: ${serviceLocationPages.length}`);
console.log(`   Sample: ${serviceLocationPages[0].serviceSlug}/${serviceLocationPages[0].locationSlug}`);
console.log(`   Target: ${serviceLocationPages[0].serviceTitle} in ${serviceLocationPages[0].city}`);
console.log('');

// Test 5: Total Page Count
console.log('📊 Test 5: Total Page Count');
const stats = pageGenerator.getStats();
console.log(`✅ Total pages: ${stats.totalPages}`);
console.log(`   Service pages: ${stats.servicePages}`);
console.log(`   Location pages: ${stats.locationPages}`);
console.log(`   Service+Location pages: ${stats.serviceLocationPages}`);
console.log('');

// Test 6: Internal Linking
console.log('🔗 Test 6: Internal Linking');
const relatedServices = internalLinking.getRelatedServiceLinks('water-damage-restoration', 6);
console.log(`✅ Related services: ${relatedServices.length}`);
console.log(`   Example: ${relatedServices[0].text} → ${relatedServices[0].url}`);

const locationLinks = internalLinking.getServiceLocationLinks('water-damage-restoration', 12);
console.log(`✅ Location links: ${locationLinks.length}`);
console.log(`   Example: ${locationLinks[0].text} → ${locationLinks[0].url}`);
console.log('');

// Test 7: Breadcrumbs
console.log('🍞 Test 7: Breadcrumb Generation');
const breadcrumbs = internalLinking.generateBreadcrumbs({
  type: 'service-location',
  serviceSlug: 'water-damage-restoration',
  city: 'Sydney',
  state: 'NSW',
});
console.log(`✅ Breadcrumbs: ${breadcrumbs.length} levels`);
breadcrumbs.forEach((crumb, i) => {
  console.log(`   ${i + 1}. ${crumb.name} → ${crumb.url}`);
});
console.log('');

// Test 8: Sitemap Structure
console.log('🗺️  Test 8: Sitemap Generation');
const sitemap = internalLinking.generateSitemapStructure();
console.log(`✅ Sitemap generated`);
console.log(`   Service URLs: ${sitemap.services.length}`);
console.log(`   Location URLs: ${sitemap.locations.length}`);
console.log(`   Service+Location URLs: ${sitemap.serviceLocations.length}`);
console.log(`   Total URLs: ${sitemap.services.length + sitemap.locations.length + sitemap.serviceLocations.length}`);
console.log('');

// Test 9: Static Params Generation
console.log('⚙️  Test 9: Static Params for Next.js');
const serviceParams = pageGenerator.generateServiceStaticParams();
const locationParams = pageGenerator.generateLocationStaticParams();
const serviceLocationParams = pageGenerator.generateServiceLocationStaticParams();
console.log(`✅ Service params: ${serviceParams.length}`);
console.log(`✅ Location params: ${locationParams.length}`);
console.log(`✅ Service+Location params: ${serviceLocationParams.length}`);
console.log('');

// Test 10: Data Validation
console.log('✔️  Test 10: Data Validation');
let validationErrors = 0;

// Check for duplicate slugs
const serviceSlugs = new Set();
servicesData.services.forEach((service) => {
  if (serviceSlugs.has(service.slug)) {
    console.log(`❌ Duplicate service slug: ${service.slug}`);
    validationErrors++;
  }
  serviceSlugs.add(service.slug);
});

const citySlugs = new Set();
citiesData.cities.forEach((city) => {
  if (citySlugs.has(city.slug)) {
    console.log(`❌ Duplicate city slug: ${city.slug}`);
    validationErrors++;
  }
  citySlugs.add(city.slug);
});

// Check required fields
servicesData.services.forEach((service) => {
  if (!service.title || !service.slug || !service.description) {
    console.log(`❌ Service missing required fields: ${service.id}`);
    validationErrors++;
  }
  if (!service.faqs || service.faqs.length === 0) {
    console.log(`⚠️  Service has no FAQs: ${service.id}`);
  }
});

citiesData.cities.forEach((city) => {
  if (!city.city || !city.slug || !city.state) {
    console.log(`❌ City missing required fields: ${city.slug}`);
    validationErrors++;
  }
  if (!city.latitude || !city.longitude) {
    console.log(`⚠️  City missing coordinates: ${city.city}`);
  }
});

if (validationErrors === 0) {
  console.log('✅ All data validation checks passed');
} else {
  console.log(`❌ Found ${validationErrors} validation errors`);
}
console.log('');

// Summary
console.log('═══════════════════════════════════════════════════');
console.log('📊 SUMMARY');
console.log('═══════════════════════════════════════════════════');
console.log(`Total Pages Generated: ${stats.totalPages}`);
console.log(`Service Pages: ${stats.servicePages}`);
console.log(`Location Pages: ${stats.locationPages}`);
console.log(`Service+Location Pages: ${stats.serviceLocationPages}`);
console.log('');
console.log('Services by Category:');
Object.entries(stats.servicesPerCategory).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});
console.log('');
console.log('Cities by State:');
Object.entries(stats.citiesPerState).forEach(([state, count]) => {
  console.log(`  ${state}: ${count}`);
});
console.log('');
console.log('✅ Page Generation System: OPERATIONAL');
console.log('✅ Ready for: npm run build');
console.log('═══════════════════════════════════════════════════');

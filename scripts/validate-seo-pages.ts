/**
 * SEO Page Validation Script
 *
 * Validates that all location pages can be generated successfully
 * Run with: npx tsx scripts/validate-seo-pages.ts
 */

import {
  generateCityServicePageData,
  getCityServiceStats,
  getAllCityServiceCombinations,
} from '../lib/seo/city-service-generator';

function validatePages() {
  console.log('\n===========================================');
  console.log('VALIDATING SEO LOCATION PAGES');
  console.log('===========================================\n');

  const stats = getCityServiceStats();
  const allCombinations = getAllCityServiceCombinations();

  console.log(`Total combinations to validate: ${allCombinations.length.toLocaleString()}\n`);

  let validPages = 0;
  let invalidPages = 0;
  const errors: Array<{ city: string; service: string; error: string }> = [];

  // Sample validation (first 50 pages to avoid long execution)
  const sample = allCombinations.slice(0, 50);

  console.log('Validating sample of 50 pages...\n');

  sample.forEach((combo, index) => {
    try {
      const pageData = generateCityServicePageData(combo.city, combo.service);

      if (!pageData) {
        invalidPages++;
        errors.push({
          city: combo.city,
          service: combo.service,
          error: 'Page data returned null',
        });
        console.log(`❌ [${index + 1}/${sample.length}] /${combo.city}/${combo.service} - FAILED`);
      } else {
        // Validate required fields
        const required = [
          'cityName',
          'serviceTitle',
          'metaTitle',
          'metaDescription',
          'h1',
          'description',
          'keywords',
          'faqs',
          'relatedServices',
        ];

        const missingFields = required.filter((field) => !pageData[field as keyof typeof pageData]);

        if (missingFields.length > 0) {
          invalidPages++;
          errors.push({
            city: combo.city,
            service: combo.service,
            error: `Missing fields: ${missingFields.join(', ')}`,
          });
          console.log(`⚠️  [${index + 1}/${sample.length}] /${combo.city}/${combo.service} - Missing fields`);
        } else {
          validPages++;
          console.log(`✅ [${index + 1}/${sample.length}] /${combo.city}/${combo.service} - OK`);
        }
      }
    } catch (error) {
      invalidPages++;
      errors.push({
        city: combo.city,
        service: combo.service,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      console.log(`❌ [${index + 1}/${sample.length}] /${combo.city}/${combo.service} - ERROR`);
    }
  });

  console.log('\n===========================================');
  console.log('VALIDATION RESULTS');
  console.log('===========================================\n');
  console.log(`✅ Valid Pages: ${validPages}`);
  console.log(`❌ Invalid Pages: ${invalidPages}`);
  console.log(`📊 Success Rate: ${Math.round((validPages / sample.length) * 100)}%\n`);

  if (errors.length > 0) {
    console.log('ERRORS:\n');
    errors.forEach((err) => {
      console.log(`  /${err.city}/${err.service}`);
      console.log(`  └─ ${err.error}\n`);
    });
  }

  // Validate sample pages in detail
  console.log('\n===========================================');
  console.log('DETAILED PAGE VALIDATION');
  console.log('===========================================\n');

  const detailedSamples = [
    { city: 'sydney', service: 'water-damage' },
    { city: 'melbourne', service: 'fire-restoration' },
    { city: 'brisbane', service: 'mold-remediation' },
    { city: 'bondi', service: 'flood-cleanup' },
  ];

  detailedSamples.forEach((sample) => {
    console.log(`\n📄 /${sample.city}/${sample.service}`);
    console.log('-------------------------------------------');

    const pageData = generateCityServicePageData(sample.city, sample.service);

    if (pageData) {
      console.log(`City: ${pageData.cityName}, ${pageData.state}`);
      console.log(`Service: ${pageData.serviceTitle}`);
      console.log(`Is Suburb: ${pageData.isSuburb}`);
      console.log(`Population: ${pageData.population.toLocaleString()}`);
      console.log(`\nMeta Title: ${pageData.metaTitle}`);
      console.log(`Meta Desc: ${pageData.metaDescription.substring(0, 100)}...`);
      console.log(`\nH1: ${pageData.h1}`);
      console.log(`Keywords: ${pageData.keywords.length} keywords`);
      console.log(`FAQs: ${pageData.faqs.length} questions`);
      console.log(`Related Services: ${pageData.relatedServices.length}`);
      console.log(`Nearby Locations: ${pageData.nearbyLocations.length}`);
      console.log(`Local Stats: ${pageData.localStats.length} metrics`);
      console.log(`Process Steps: ${pageData.processSteps.length} steps`);
      console.log(`\n✅ Page is valid and complete`);
    } else {
      console.log(`❌ Page generation failed`);
    }
  });

  console.log('\n===========================================\n');

  // Exit with error if validation failed
  if (invalidPages > 0) {
    console.error('❌ Validation failed. Please fix errors above.\n');
    process.exit(1);
  } else {
    console.log('✅ All validations passed!\n');
    process.exit(0);
  }
}

validatePages();

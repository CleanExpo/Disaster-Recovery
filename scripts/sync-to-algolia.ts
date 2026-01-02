/**
 * Sync Data to Algolia
 *
 * Syncs content, locations, and contractors to Algolia search indices
 * Run with: npx ts-node scripts/sync-to-algolia.ts
 */

import { PrismaClient } from '@prisma/client';
import { getAlgoliaAdminClient } from '../lib/algolia/client';
import { ALGOLIA_CONFIG } from '../lib/algolia/config';
import type {
  AlgoliaContentRecord,
  AlgoliaLocationRecord,
  AlgoliaContractorRecord,
} from '../lib/algolia/types';

const prisma = new PrismaClient();

/**
 * Configure Algolia Index Settings
 */
async function configureIndexSettings() {
  console.log('📝 Configuring Algolia index settings...');

  const client = getAlgoliaAdminClient();

  // Configure content index
  const contentIndex = client.initIndex(ALGOLIA_CONFIG.indices.content);
  await contentIndex.setSettings({
    searchableAttributes: ALGOLIA_CONFIG.searchableAttributes.content,
    customRanking: ALGOLIA_CONFIG.customRanking.content,
    attributesForFaceting: ALGOLIA_CONFIG.facets.content.map(f => `filterOnly(${f})`),
    ...ALGOLIA_CONFIG.settings,
  });

  // Configure locations index
  const locationsIndex = client.initIndex(ALGOLIA_CONFIG.indices.locations);
  await locationsIndex.setSettings({
    searchableAttributes: ALGOLIA_CONFIG.searchableAttributes.locations,
    customRanking: ALGOLIA_CONFIG.customRanking.locations,
    attributesForFaceting: ALGOLIA_CONFIG.facets.locations.map(f => `filterOnly(${f})`),
    ...ALGOLIA_CONFIG.settings,
  });

  // Configure contractors index
  const contractorsIndex = client.initIndex(ALGOLIA_CONFIG.indices.contractors);
  await contractorsIndex.setSettings({
    searchableAttributes: ALGOLIA_CONFIG.searchableAttributes.contractors,
    customRanking: ALGOLIA_CONFIG.customRanking.contractors,
    attributesForFaceting: ALGOLIA_CONFIG.facets.contractors.map(f => `filterOnly(${f})`),
    ...ALGOLIA_CONFIG.settings,
  });

  // Set up synonyms
  const synonymObjects = ALGOLIA_CONFIG.synonyms.map((synonymGroup, index) => ({
    objectID: `synonym_${index}`,
    type: 'synonym' as const,
    synonyms: synonymGroup,
  }));

  await contentIndex.saveSynonyms(synonymObjects, { replaceExistingSynonyms: true });

  console.log('✅ Index settings configured');
}

/**
 * Sync Content to Algolia (Blog Posts, Guides, FAQs)
 */
async function syncContent() {
  console.log('📚 Syncing content to Algolia...');

  // For now, we'll create sample content records
  // In production, this would fetch from Sanity CMS or database
  const contentRecords: AlgoliaContentRecord[] = [
    {
      objectID: 'content_1',
      title: 'How to Handle Water Damage Emergency',
      description: 'Complete guide to managing water damage emergencies in your home or business.',
      content: 'When water damage strikes, quick action is critical. Here\'s what you need to know...',
      category: 'Emergency Guide',
      disasterType: ['water_damage', 'flood'],
      contentType: 'guide',
      slug: 'handle-water-damage-emergency',
      url: '/blog/handle-water-damage-emergency',
      tags: ['water damage', 'emergency', 'restoration', 'flood'],
      author: 'NRPG Team',
      publishedAt: Date.now() - 86400000, // 1 day ago
      updatedAt: Date.now(),
      engagement: 1250,
      priority: 10,
      readingTime: 8,
    },
    {
      objectID: 'content_2',
      title: 'Fire Damage Restoration Process Explained',
      description: 'Understanding the fire damage restoration process from start to finish.',
      content: 'Fire damage restoration involves multiple stages including assessment, cleanup, and reconstruction...',
      category: 'Restoration Process',
      disasterType: ['fire_damage', 'smoke_damage'],
      contentType: 'article',
      slug: 'fire-damage-restoration-process',
      url: '/blog/fire-damage-restoration-process',
      tags: ['fire damage', 'restoration', 'smoke', 'soot'],
      author: 'NRPG Team',
      publishedAt: Date.now() - 172800000, // 2 days ago
      updatedAt: Date.now(),
      engagement: 980,
      priority: 9,
      readingTime: 10,
    },
    {
      objectID: 'content_3',
      title: 'Black Mould: Detection and Removal',
      description: 'How to identify black mould in your home and the professional removal process.',
      content: 'Black mould (Stachybotrys chartarum) can pose serious health risks. Here\'s what to look for...',
      category: 'Health & Safety',
      disasterType: ['mould'],
      contentType: 'guide',
      slug: 'black-mould-detection-removal',
      url: '/blog/black-mould-detection-removal',
      tags: ['mould', 'black mould', 'health', 'remediation'],
      author: 'NRPG Team',
      publishedAt: Date.now() - 259200000, // 3 days ago
      updatedAt: Date.now(),
      engagement: 1450,
      priority: 10,
      readingTime: 12,
    },
  ];

  const client = getAlgoliaAdminClient();
  const index = client.initIndex(ALGOLIA_CONFIG.indices.content);

  await index.saveObjects(contentRecords);
  console.log(`✅ Synced ${contentRecords.length} content records`);
}

/**
 * Sync Location Pages to Algolia
 */
async function syncLocations() {
  console.log('📍 Syncing location pages to Algolia...');

  // Sample location records
  // In production, generate from all city/service combinations
  const locationRecords: AlgoliaLocationRecord[] = [
    {
      objectID: 'location_sydney_water',
      cityName: 'Sydney',
      stateName: 'New South Wales',
      state: 'NSW',
      serviceType: 'Water Damage Restoration',
      disasterType: 'water_damage',
      title: 'Water Damage Restoration Sydney NSW',
      description: '24/7 emergency water damage restoration services in Sydney. Fast response, certified technicians.',
      slug: 'nsw/sydney/water-damage-restoration',
      url: '/locations/nsw/sydney/water-damage-restoration',
      emergencyAvailable: true,
      contractorCount: 12,
      averageRating: 4.8,
      priority: 10,
      coordinates: {
        lat: -33.8688,
        lng: 151.2093,
      },
    },
    {
      objectID: 'location_melbourne_fire',
      cityName: 'Melbourne',
      stateName: 'Victoria',
      state: 'VIC',
      serviceType: 'Fire Damage Restoration',
      disasterType: 'fire_damage',
      title: 'Fire Damage Restoration Melbourne VIC',
      description: 'Expert fire and smoke damage restoration in Melbourne. Insurance approved contractors.',
      slug: 'vic/melbourne/fire-damage-restoration',
      url: '/locations/vic/melbourne/fire-damage-restoration',
      emergencyAvailable: true,
      contractorCount: 8,
      averageRating: 4.7,
      priority: 9,
      coordinates: {
        lat: -37.8136,
        lng: 144.9631,
      },
    },
    {
      objectID: 'location_brisbane_mould',
      cityName: 'Brisbane',
      stateName: 'Queensland',
      state: 'QLD',
      serviceType: 'Mould Remediation',
      disasterType: 'mould',
      title: 'Mould Remediation Brisbane QLD',
      description: 'Professional mould removal and remediation services in Brisbane. Certified specialists.',
      slug: 'qld/brisbane/mould-remediation',
      url: '/locations/qld/brisbane/mould-remediation',
      emergencyAvailable: true,
      contractorCount: 10,
      averageRating: 4.9,
      priority: 9,
      coordinates: {
        lat: -27.4698,
        lng: 153.0251,
      },
    },
  ];

  const client = getAlgoliaAdminClient();
  const index = client.initIndex(ALGOLIA_CONFIG.indices.locations);

  await index.saveObjects(locationRecords);
  console.log(`✅ Synced ${locationRecords.length} location records`);
}

/**
 * Sync Contractors to Algolia
 */
async function syncContractors() {
  console.log('👷 Syncing contractors to Algolia...');

  try {
    // Fetch contractors from database
    const contractors = await prisma.contractor.findMany({
      where: {
        status: 'ACTIVE',
        verified: true,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const contractorRecords: AlgoliaContractorRecord[] = contractors.map((contractor) => ({
      objectID: contractor.id,
      businessName: contractor.businessName,
      serviceTypes: contractor.serviceTypes,
      location: `${contractor.city}, ${contractor.state}`,
      city: contractor.city,
      state: contractor.state,
      certifications: contractor.certifications || [],
      rating: contractor.rating.toNumber(),
      reviewCount: contractor.reviewCount,
      jobsCompleted: contractor.completedJobs,
      description: contractor.bio || '',
      slug: contractor.slug || contractor.id,
      url: `/contractor/${contractor.slug || contractor.id}`,
      logoUrl: contractor.logo || undefined,
      emergencyAvailable: contractor.emergencyAvailable,
      insurancePreferred: contractor.insurancePreferred || [],
      yearsInBusiness: contractor.yearsInBusiness || 0,
      verified: contractor.verified,
      responseTime: contractor.responseTimeMinutes || 120,
    }));

    const client = getAlgoliaAdminClient();
    const index = client.initIndex(ALGOLIA_CONFIG.indices.contractors);

    if (contractorRecords.length > 0) {
      await index.saveObjects(contractorRecords);
      console.log(`✅ Synced ${contractorRecords.length} contractor records`);
    } else {
      console.log('⚠️  No contractors found to sync');
    }
  } catch (error) {
    console.error('❌ Error syncing contractors:', error);
  }
}

/**
 * Main sync function
 */
async function main() {
  console.log('🚀 Starting Algolia sync...\n');

  try {
    await configureIndexSettings();
    await syncContent();
    await syncLocations();
    await syncContractors();

    console.log('\n✅ Algolia sync completed successfully');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main as syncToAlgolia };

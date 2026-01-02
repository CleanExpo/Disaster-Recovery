#!/usr/bin/env node

/**
 * Algolia Search Index Sync Script
 *
 * Synchronizes content from the database/CMS to Algolia search indices.
 * Run this script after content updates or as part of the deployment pipeline.
 */

const algoliasearch = require('algoliasearch');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Configuration
const config = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  adminKey: process.env.ALGOLIA_ADMIN_KEY,
  indices: {
    pages: 'pages',
    articles: 'articles',
    services: 'services',
    contractors: 'contractors',
  },
};

// Validate configuration
function validateConfig() {
  if (!config.appId || !config.adminKey) {
    log('❌ Missing Algolia configuration:', 'red');
    log('   NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY required', 'red');
    process.exit(1);
  }
}

// Initialize Algolia client
function initClient() {
  return algoliasearch(config.appId, config.adminKey);
}

// Sync data to Algolia
async function syncIndex(client, indexName, data) {
  log(`\n📤 Syncing ${indexName}...`, 'cyan');

  try {
    const index = client.initIndex(indexName);

    // Configure index settings
    await index.setSettings({
      searchableAttributes: [
        'title',
        'description',
        'content',
        'tags',
      ],
      attributesForFaceting: [
        'category',
        'type',
        'status',
      ],
      customRanking: [
        'desc(importance)',
        'desc(updatedAt)',
      ],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    });

    // Clear existing records (optional - use saveObjects instead for partial updates)
    // await index.clearObjects();

    // Save objects to index
    const result = await index.saveObjects(data, {
      autoGenerateObjectIDIfNotExist: true,
    });

    log(`  ✅ Synced ${data.length} records to ${indexName}`, 'green');
    return result;
  } catch (error) {
    log(`  ❌ Error syncing ${indexName}: ${error.message}`, 'red');
    throw error;
  }
}

// Fetch data from your data source
async function fetchDataForIndex(indexName) {
  log(`\n🔍 Fetching data for ${indexName}...`, 'cyan');

  // TODO: Replace with actual data fetching logic
  // This is a placeholder - implement based on your data source
  switch (indexName) {
    case 'pages':
      return [
        {
          objectID: 'home',
          title: 'Home',
          description: 'Disaster Recovery NRPG Platform',
          url: '/',
          content: 'Welcome to the Disaster Recovery platform',
          type: 'page',
        },
        // Add more pages...
      ];

    case 'articles':
      return [
        // Fetch from CMS or database
      ];

    case 'services':
      return [
        // Fetch from database
      ];

    case 'contractors':
      return [
        // Fetch from database
      ];

    default:
      return [];
  }
}

// Main sync function
async function main() {
  log('\n╔════════════════════════════════════════════════╗', 'cyan');
  log('║   Algolia Search Index Sync                   ║', 'cyan');
  log('╚════════════════════════════════════════════════╝', 'cyan');

  validateConfig();

  const client = initClient();
  const results = [];

  // Sync each index
  for (const [key, indexName] of Object.entries(config.indices)) {
    try {
      const data = await fetchDataForIndex(indexName);

      if (data.length === 0) {
        log(`  ⚠️  No data to sync for ${indexName}`, 'yellow');
        continue;
      }

      const result = await syncIndex(client, indexName, data);
      results.push({ index: indexName, success: true, count: data.length });
    } catch (error) {
      log(`  ❌ Failed to sync ${indexName}`, 'red');
      results.push({ index: indexName, success: false, error: error.message });
    }
  }

  // Print summary
  log('\n╔════════════════════════════════════════════════╗', 'cyan');
  log('║   Sync Summary                                 ║', 'cyan');
  log('╚════════════════════════════════════════════════╝', 'cyan');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  log(`\n✅ Successful: ${successful}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');

  if (failed > 0) {
    log('\nFailed indices:', 'red');
    results.filter(r => !r.success).forEach(r => {
      log(`  • ${r.index}: ${r.error}`, 'red');
    });
    process.exit(1);
  } else {
    log('\n✅ All indices synced successfully!', 'green');
    process.exit(0);
  }
}

// Execute
if (require.main === module) {
  main().catch((error) => {
    log(`\n❌ Unexpected error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = { syncIndex, fetchDataForIndex };

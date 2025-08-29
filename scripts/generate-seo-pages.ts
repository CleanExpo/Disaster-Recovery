#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client';
import { generateLocationCombinations, calculatePagePriority, getEstimatedSearchVolume } from '../src/lib/seo/locations';
import { generateSEOContent } from '../src/lib/seo/content-generator';

const prisma = new PrismaClient();

interface GenerationConfig {
  batchSize: number;
  minPriority: number;
  maxPages?: number;
  states?: string[];
  serviceTypes?: string[];
}

async function generateSEOPages(config: GenerationConfig = {
  batchSize: 50,
  minPriority: 70,
  maxPages: 1000
}) {
  console.log('🚀 Starting SEO page generation...');
  console.log(`Config: ${JSON.stringify(config, null, 2)}`);
  
  try {
    // Generate all location/service combinations
    console.log('📍 Generating location combinations...');
    const combinations = generateLocationCombinations();
    console.log(`Generated ${combinations.length} total combinations`);
    
    // Filter by configuration
    let filteredCombinations = combinations.filter(combo => {
      const priority = calculatePagePriority(combo.location, combo.service, combo.propertyType, combo.businessType);
      if (priority < config.minPriority) return false;
      
      if (config.states && !config.states.includes(combo.location.state)) return false;
      if (config.serviceTypes && !config.serviceTypes.includes(combo.service.slug)) return false;
      
      return true;
    });
    
    // Limit if specified
    if (config.maxPages) {
      filteredCombinations = filteredCombinations.slice(0, config.maxPages);
    }
    
    console.log(`📊 Processing ${filteredCombinations.length} high-priority combinations`);
    
    const stats = {
      processed: 0,
      created: 0,
      skipped: 0,
      errors: 0,
      startTime: Date.now()
    };
    
    // Process in batches
    for (let i = 0; i < filteredCombinations.length; i += config.batchSize) {
      const batch = filteredCombinations.slice(i, i + config.batchSize);
      console.log(`📦 Processing batch ${Math.floor(i / config.batchSize) + 1}/${Math.ceil(filteredCombinations.length / config.batchSize)}`);
      
      await Promise.all(batch.map(async (combo) => {
        try {
          stats.processed++;
          
          const { location, service, propertyType, businessType } = combo;
          
          // Generate URL slug
          const businessSegment = businessType ? `-${businessType}` : '';
          const suburbSegment = location.suburb ? `-${location.suburb.toLowerCase().replace(/\s+/g, '-')}` : '';
          const slug = `${service.slug}-${propertyType.slug}${businessSegment}-${location.city.toLowerCase().replace(/\s+/g, '-')}${suburbSegment}-${location.postcode}`;
          
          // Check if page already exists
          const existingPage = await prisma.sEOLocationPage.findUnique({
            where: { slug }
          });
          
          if (existingPage) {
            stats.skipped++;
            return;
          }
          
          // Generate content
          const seoContent = await generateSEOContent(location, service, propertyType, businessType);
          
          // Calculate metrics
          const priorityScore = calculatePagePriority(location, service, propertyType, businessType);
          const estimatedSearchVolume = getEstimatedSearchVolume(location, service, propertyType);
          
          // Create page record
          await prisma.sEOLocationPage.create({
            data: {
              slug,
              title: seoContent.title,
              metaDescription: seoContent.metaDescription,
              content: seoContent.content,
              structuredData: JSON.stringify(seoContent.structuredData),
              
              // Location data
              state: location.state,
              city: location.city,
              suburb: location.suburb,
              postcode: location.postcode,
              latitude: location.latitude,
              longitude: location.longitude,
              
              // Service data
              serviceType: service.slug,
              serviceName: service.name,
              propertyType: propertyType.slug,
              businessType,
              
              // SEO metrics
              priorityScore,
              estimatedSearchVolume,
              competitionLevel: priorityScore > 90 ? 'high' : priorityScore > 75 ? 'medium' : 'low',
              
              status: 'PUBLISHED',
              publishedAt: new Date(),
            }
          });
          
          stats.created++;
          
        } catch (error) {
          stats.errors++;
          console.error(`❌ Error processing combination:`, error);
        }
      }));
      
      // Progress update
      const progressPercent = Math.round((stats.processed / filteredCombinations.length) * 100);
      const elapsed = (Date.now() - stats.startTime) / 1000;
      const rate = stats.processed / elapsed;
      const eta = Math.round((filteredCombinations.length - stats.processed) / rate);
      
      console.log(`📈 Progress: ${progressPercent}% | Created: ${stats.created} | Skipped: ${stats.skipped} | Errors: ${stats.errors} | ETA: ${eta}s`);
      
      // Small delay to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Final statistics
    const totalTime = (Date.now() - stats.startTime) / 1000;
    console.log('\n🎉 SEO Page Generation Complete!');
    console.log(`📊 Final Statistics:`);
    console.log(`  - Total processed: ${stats.processed}`);
    console.log(`  - Pages created: ${stats.created}`);
    console.log(`  - Pages skipped (existing): ${stats.skipped}`);
    console.log(`  - Errors: ${stats.errors}`);
    console.log(`  - Total time: ${totalTime.toFixed(2)}s`);
    console.log(`  - Average rate: ${(stats.processed / totalTime).toFixed(2)} pages/second`);
    
    // Generate summary by state
    const stateStats = await prisma.sEOLocationPage.groupBy({
      by: ['state'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });
    
    console.log('\n📍 Pages by State:');
    for (const stat of stateStats) {
      console.log(`  - ${stat.state}: ${stat._count.id} pages`);
    }
    
    // Generate summary by service type
    const serviceStats = await prisma.sEOLocationPage.groupBy({
      by: ['serviceType'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });
    
    console.log('\n🔧 Pages by Service:');
    for (const stat of serviceStats) {
      console.log(`  - ${stat.serviceType}: ${stat._count.id} pages`);
    }
    
  } catch (error) {
    console.error('💥 Fatal error during generation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const config: GenerationConfig = {
    batchSize: 50,
    minPriority: 70,
    maxPages: 1000
  };
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const arg = args[i];
    const value = args[i + 1];
    
    switch (arg) {
      case '--batch-size':
        config.batchSize = parseInt(value);
        break;
      case '--min-priority':
        config.minPriority = parseInt(value);
        break;
      case '--max-pages':
        config.maxPages = parseInt(value);
        break;
      case '--states':
        config.states = value.split(',');
        break;
      case '--services':
        config.serviceTypes = value.split(',');
        break;
      case '--help':
        console.log(`
🎯 SEO Page Generator

Usage: ts-node scripts/generate-seo-pages.ts [options]

Options:
  --batch-size <number>     Number of pages to process in parallel (default: 50)
  --min-priority <number>   Minimum priority score to generate (default: 70)
  --max-pages <number>      Maximum number of pages to generate (default: 1000)
  --states <string>         Comma-separated list of states (e.g., "NSW,VIC,QLD")
  --services <string>       Comma-separated list of service types
  --help                    Show this help message

Examples:
  # Generate 500 high-priority pages for NSW and VIC only
  ts-node scripts/generate-seo-pages.ts --max-pages 500 --min-priority 85 --states "NSW,VIC"
  
  # Generate water damage pages only
  ts-node scripts/generate-seo-pages.ts --services "water-damage-restoration"
  
  # Generate all pages with minimum priority 60
  ts-node scripts/generate-seo-pages.ts --min-priority 60 --max-pages 5000
        `);
        process.exit(0);
    }
  }
  
  generateSEOPages(config);
}

export default generateSEOPages;
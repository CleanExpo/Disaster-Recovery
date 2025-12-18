/**
 * Database Seed Script
 *
 * Populates the database with initial data:
 * - Insurance providers (NRMA, Suncorp, Allianz, QBE, IAG, CGU)
 * - Disaster types
 * - Service configurations
 *
 * Run with: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ========================================================================
  // INSURANCE PROVIDERS - SEED DATA
  // ========================================================================

  console.log('📋 Seeding insurance providers...');

  const providers = await Promise.all([
    // NRMA - NSW/ACT Focus
    prisma.insuranceProvider.upsert({
      where: { code: 'NRMA' },
      update: {},
      create: {
        name: 'NRMA',
        providerType: 'NRMA',
        code: 'NRMA',
        contactEmail: 'claims@nrma.com.au',
        contactPhone: '1300 136 111',
        apiEndpoint: process.env.NRMA_API_URL,
        supportedStates: ['NSW', 'ACT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // Suncorp - National
    prisma.insuranceProvider.upsert({
      where: { code: 'SUNCORP' },
      update: {},
      create: {
        name: 'Suncorp',
        providerType: 'SUNCORP',
        code: 'SUNCORP',
        contactEmail: 'claims@suncorp.com.au',
        contactPhone: '13 11 10',
        apiEndpoint: process.env.SUNCORP_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // Allianz - National
    prisma.insuranceProvider.upsert({
      where: { code: 'ALLIANZ' },
      update: {},
      create: {
        name: 'Allianz',
        providerType: 'ALLIANZ',
        code: 'ALLIANZ',
        contactEmail: 'claims@allianz.com.au',
        contactPhone: '1300 134 142',
        apiEndpoint: process.env.ALLIANZ_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // QBE - National (Property & Business)
    prisma.insuranceProvider.upsert({
      where: { code: 'QBE' },
      update: {},
      create: {
        name: 'QBE',
        providerType: 'QBE',
        code: 'QBE',
        contactEmail: 'claims@qbe.com.au',
        contactPhone: '1300 720 336',
        apiEndpoint: process.env.QBE_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // IAG (Insurance Australia Group - Parent of NRMA)
    prisma.insuranceProvider.upsert({
      where: { code: 'IAG' },
      update: {},
      create: {
        name: 'IAG',
        providerType: 'IAG',
        code: 'IAG',
        contactEmail: 'claims@iag.com.au',
        contactPhone: '1300 650 411',
        apiEndpoint: process.env.IAG_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // CGU - Commercial & Business
    prisma.insuranceProvider.upsert({
      where: { code: 'CGU' },
      update: {},
      create: {
        name: 'CGU',
        providerType: 'CGU',
        code: 'CGU',
        contactEmail: 'claims@cgu.com.au',
        contactPhone: '1300 130 649',
        apiEndpoint: process.env.CGU_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),

    // Medibank (also does home/contents)
    prisma.insuranceProvider.upsert({
      where: { code: 'MEDIBANK' },
      update: {},
      create: {
        name: 'Medibank',
        providerType: 'MEDIBANK',
        code: 'MEDIBANK',
        contactEmail: 'claims@medibank.com.au',
        contactPhone: '132 331',
        apiEndpoint: process.env.MEDIBANK_API_URL,
        supportedStates: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
        isActive: true,
        isVerified: false,
        verificationNotes: 'Pending API integration',
      },
    }),
  ]);

  console.log(`✅ Created ${providers.length} insurance providers\n`);

  // ========================================================================
  // SUMMARY
  // ========================================================================

  console.log('✨ Database seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   • Insurance Providers: ${providers.length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. npm run db:generate - Generate Prisma Client');
  console.log('   2. npm run dev - Start development server');
  console.log('   3. Create your first admin user\n');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/**
 * Seed Demo Data for RIA Tradeshow
 *
 * Creates demo accounts, jobs, messages, and subscriptions for booth demonstrations.
 * All demo accounts use ENTERPRISE tier to showcase full feature set.
 *
 * Run: npx tsx scripts/seed-demo-data.ts
 */

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// Demo credentials (use strong passwords in production)
const DEMO_PASSWORD_HASH = '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u' // 'demo2026'

async function seedDemoData() {
  console.log('🎪 Starting RIA Tradeshow Demo Data Seeding...\n')

  try {
    // ========================================
    // 1. Create Demo Client
    // ========================================
    console.log('👤 Creating demo client...')

    const demoClient = await prisma.user.upsert({
      where: { email: 'demo.client@disasterrecovery.com.au' },
      update: {},
      create: {
        email: 'demo.client@disasterrecovery.com.au',
        name: 'Demo Client - RIA 2026',
        password: DEMO_PASSWORD_HASH,
        userType: 'CLIENT',
        australianPhoneNumber: '+61400000001',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        isEmailVerified: true,
        isActive: true,
      },
    })

    console.log(`✅ Demo client: ${demoClient.email}\n`)

    // ========================================
    // 2. Create Demo Contractor
    // ========================================
    console.log('🔧 Creating demo contractor...')

    const demoContractorUser = await prisma.user.upsert({
      where: { email: 'demo.contractor@disasterrecovery.com.au' },
      update: {},
      create: {
        email: 'demo.contractor@disasterrecovery.com.au',
        name: 'Rapid Response Restoration',
        password: DEMO_PASSWORD_HASH,
        userType: 'CONTRACTOR',
        australianPhoneNumber: '+61400000002',
        australianState: 'VIC',
        australianPostcode: '3121',
        suburb: 'Richmond',
        streetAddress: '45 Swan Street',
        isEmailVerified: true,
        isActive: true,
      },
    })

    const demoContractor = await prisma.contractor.upsert({
      where: { userId: demoContractorUser.id },
      update: {},
      create: {
        userId: demoContractorUser.id,
        businessName: 'Rapid Response Restoration Pty Ltd',
        abnNumber: '98765432101',
        primaryState: 'VIC',
        operatingStates: ['VIC', 'NSW', 'QLD'],
        australianSpecialties: ['WATER_DAMAGE', 'FIRE_DAMAGE', 'MOULD_REMEDIATION', 'STORM_DAMAGE'],
        supportedEmergencyLevels: ['URGENT', 'HIGH', 'STANDARD'],
        publicLiabilityPolicyNumber: 'PL-DEMO-2026',
        publicLiabilityExpiryDate: new Date('2027-12-31'),
        completedJobs: 342,
        averageRating: new Prisma.Decimal(4.9),
        averageResponseTimeMinutes: 28,
        isVerified: true,
        isActive: true,
      },
    })

    console.log(`✅ Demo contractor: ${demoContractor.businessName}\n`)

    // ========================================
    // 3. Create ENTERPRISE Subscription
    // ========================================
    console.log('💎 Creating ENTERPRISE subscription...')

    const subscription = await prisma.realtimeSubscription.upsert({
      where: { contractorId: demoContractor.id },
      update: {
        tier: 'ENTERPRISE',
        status: 'ACTIVE',
      },
      create: {
        contractorId: demoContractor.id,
        tier: 'ENTERPRISE',
        status: 'ACTIVE',
        startDate: new Date(),
      },
    })

    console.log(`✅ ENTERPRISE tier active\n`)

    // ========================================
    // 4. Create Notification Preferences
    // ========================================
    console.log('🔔 Setting up notification preferences...')

    await prisma.notificationPreference.upsert({
      where: { contractorId: demoContractor.id },
      update: {},
      create: {
        contractorId: demoContractor.id,
        soundEnabled: true,
        soundType: 'subtle_chime',
        smsEnabled: true,
        smsPhone: '+61400000002',
      },
    })

    console.log(`✅ Notifications configured\n`)

    // ========================================
    // 5. Create Demo Jobs (Various Statuses)
    // ========================================
    console.log('📋 Creating demo jobs...')

    // Job 1: En Route (for live tracking demo)
    const job1 = await prisma.serviceRequest.upsert({
      where: { id: 'demo-job-en-route' },
      update: {},
      create: {
        id: 'demo-job-en-route',
        clientId: demoClient.id,
        australianServiceType: 'WATER_DAMAGE',
        title: 'Emergency Water Damage - Burst Pipe',
        description: 'Burst pipe in kitchen causing flooding. Water spreading to living area. Need immediate response.',
        servicePostcode: '3000',
        serviceState: 'VIC',
        serviceSuburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        latitude: -37.8136,
        longitude: 144.9631,
        emergencyResponseLevel: 'URGENT',
        status: 'CONFIRMED',
        estimatedCostAUD: new Prisma.Decimal(4500),
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
      },
    })

    // Create booking for job 1
    await prisma.booking.upsert({
      where: { id: 'demo-booking-1' },
      update: {},
      create: {
        id: 'demo-booking-1',
        clientId: demoClient.id,
        contractorId: demoContractor.id,
        serviceRequestId: job1.id,
        australianServiceType: 'WATER_DAMAGE',
        description: job1.description || '',
        servicePostcode: '3000',
        serviceState: 'VIC',
        serviceSuburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        status: 'IN_PROGRESS',
        emergencyResponseLevel: 'URGENT',
        scheduledDate: new Date(),
        startedAt: new Date(Date.now() - 15 * 60 * 1000),
        estimatedCostAUD: new Prisma.Decimal(4500),
        damagePhotos: [],
      },
    })

    // Job 2: Completed (for history demo)
    const job2 = await prisma.serviceRequest.upsert({
      where: { id: 'demo-job-completed' },
      update: {},
      create: {
        id: 'demo-job-completed',
        clientId: demoClient.id,
        australianServiceType: 'MOULD_REMEDIATION',
        title: 'Mould Remediation - Bathroom',
        description: 'Black mould discovered behind bathroom tiles. Requires professional remediation.',
        servicePostcode: '3000',
        serviceState: 'VIC',
        serviceSuburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        latitude: -37.8136,
        longitude: 144.9631,
        emergencyResponseLevel: 'STANDARD',
        status: 'COMPLETED',
        estimatedCostAUD: new Prisma.Decimal(2800),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
    })

    // Job 3: Pending (for new job notification demo)
    const job3 = await prisma.serviceRequest.upsert({
      where: { id: 'demo-job-pending' },
      update: {},
      create: {
        id: 'demo-job-pending',
        clientId: demoClient.id,
        australianServiceType: 'STORM_DAMAGE',
        title: 'Storm Damage Assessment',
        description: 'Roof damage from recent storm. Water ingress into ceiling cavity.',
        servicePostcode: '3121',
        serviceState: 'VIC',
        serviceSuburb: 'Richmond',
        streetAddress: '88 Bridge Road',
        latitude: -37.8183,
        longitude: 144.9987,
        emergencyResponseLevel: 'HIGH',
        status: 'PENDING',
        estimatedCostAUD: new Prisma.Decimal(6500),
        createdAt: new Date(),
      },
    })

    console.log(`✅ Created 3 demo jobs\n`)

    // ========================================
    // 6. Create Demo Messages
    // ========================================
    console.log('💬 Creating demo messages...')

    await prisma.jobMessage.createMany({
      skipDuplicates: true,
      data: [
        {
          id: 'demo-msg-1',
          jobId: job1.id,
          senderId: demoClient.id,
          senderType: 'client',
          content: 'Hi, water is still coming in. How far away are you?',
          isRead: true,
          createdAt: new Date(Date.now() - 10 * 60 * 1000),
        },
        {
          id: 'demo-msg-2',
          jobId: job1.id,
          senderId: demoContractorUser.id,
          senderType: 'contractor',
          content: "I'm about 12 minutes away. Please turn off the water main if you can access it safely.",
          isRead: true,
          createdAt: new Date(Date.now() - 8 * 60 * 1000),
        },
        {
          id: 'demo-msg-3',
          jobId: job1.id,
          senderId: demoClient.id,
          senderType: 'client',
          content: 'Done! Water main is off now. Thank you for the quick response.',
          isRead: true,
          createdAt: new Date(Date.now() - 6 * 60 * 1000),
        },
        {
          id: 'demo-msg-4',
          jobId: job1.id,
          senderId: demoContractorUser.id,
          senderType: 'contractor',
          content: "Great work! I'll be there shortly with all the extraction equipment.",
          isRead: false,
          createdAt: new Date(Date.now() - 4 * 60 * 1000),
        },
      ],
    })

    console.log(`✅ Created demo messages\n`)

    // ========================================
    // 7. Create Demo Admin
    // ========================================
    console.log('👔 Creating demo admin...')

    const demoAdmin = await prisma.user.upsert({
      where: { email: 'demo.admin@disasterrecovery.com.au' },
      update: {},
      create: {
        email: 'demo.admin@disasterrecovery.com.au',
        name: 'Demo Admin',
        password: DEMO_PASSWORD_HASH,
        userType: 'ADMIN',
        australianPhoneNumber: '+61400000003',
        australianState: 'VIC',
        australianPostcode: '3000',
        isEmailVerified: true,
        isActive: true,
      },
    })

    console.log(`✅ Demo admin: ${demoAdmin.email}\n`)

    // ========================================
    // Summary
    // ========================================
    console.log('\n' + '='.repeat(60))
    console.log('🎪 RIA TRADESHOW DEMO DATA READY!')
    console.log('='.repeat(60))
    console.log('\n📧 Demo Credentials (password: demo2026):')
    console.log('   Client:     demo.client@disasterrecovery.com.au')
    console.log('   Contractor: demo.contractor@disasterrecovery.com.au')
    console.log('   Admin:      demo.admin@disasterrecovery.com.au')
    console.log('\n💎 Subscription: ENTERPRISE (all features unlocked)')
    console.log('\n📋 Demo Jobs:')
    console.log('   • Water Damage (En Route) - for live tracking')
    console.log('   • Mould Remediation (Completed) - for history')
    console.log('   • Storm Damage (Pending) - for new job demo')
    console.log('\n🔗 Quick Links:')
    console.log('   Client View:     /dashboard/client/jobs')
    console.log('   Contractor View: /dashboard/contractor/jobs')
    console.log('   Admin View:      /dashboard/admin/jobs/live')
    console.log('   Pricing:         /dashboard/contractor/realtime/pricing')
    console.log('\n')

  } catch (error) {
    console.error('\n❌ Error seeding demo data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedDemoData()
  .then(() => {
    console.log('✅ Demo seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Demo seeding failed:', error)
    process.exit(1)
  })

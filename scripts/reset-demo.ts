/**
 * Reset Demo Data for RIA Tradeshow
 *
 * Clears demo-specific data and re-seeds fresh state between booth demonstrations.
 * Only affects demo accounts - does not touch production data.
 *
 * Run: npx tsx scripts/reset-demo.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Demo account identifiers
const DEMO_EMAILS = [
  'demo.client@disasterrecovery.com.au',
  'demo.contractor@disasterrecovery.com.au',
  'demo.admin@disasterrecovery.com.au',
]

const DEMO_JOB_IDS = [
  'demo-job-en-route',
  'demo-job-completed',
  'demo-job-pending',
]

const DEMO_BOOKING_IDS = [
  'demo-booking-1',
]

async function resetDemoData() {
  console.log('🔄 Resetting RIA Tradeshow Demo Data...\n')

  try {
    // ========================================
    // 1. Clear Demo Messages
    // ========================================
    console.log('💬 Clearing demo messages...')

    const deletedMessages = await prisma.jobMessage.deleteMany({
      where: {
        id: { startsWith: 'demo-msg-' },
      },
    })

    console.log(`   Deleted ${deletedMessages.count} messages`)

    // ========================================
    // 2. Clear Demo Call History
    // ========================================
    console.log('📞 Clearing demo call history...')

    const deletedCalls = await prisma.jobCall.deleteMany({
      where: {
        jobId: { in: DEMO_JOB_IDS },
      },
    })

    console.log(`   Deleted ${deletedCalls.count} calls`)

    // ========================================
    // 3. Clear Demo Location History
    // ========================================
    console.log('📍 Clearing demo location history...')

    const deletedLocations = await prisma.contractorLocationHistory.deleteMany({
      where: {
        jobId: { in: DEMO_JOB_IDS },
      },
    })

    console.log(`   Deleted ${deletedLocations.count} locations`)

    // ========================================
    // 4. Reset Demo Bookings
    // ========================================
    console.log('📅 Resetting demo bookings...')

    await prisma.booking.updateMany({
      where: { id: { in: DEMO_BOOKING_IDS } },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(Date.now() - 15 * 60 * 1000),
        completedAt: null,
      },
    })

    console.log(`   Reset ${DEMO_BOOKING_IDS.length} bookings`)

    // ========================================
    // 5. Reset Demo Jobs Status
    // ========================================
    console.log('📋 Resetting demo jobs...')

    // Reset en-route job
    await prisma.serviceRequest.update({
      where: { id: 'demo-job-en-route' },
      data: {
        status: 'CONFIRMED',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    })

    // Reset pending job
    await prisma.serviceRequest.update({
      where: { id: 'demo-job-pending' },
      data: {
        status: 'PENDING',
        createdAt: new Date(),
      },
    })

    console.log(`   Reset job statuses`)

    // ========================================
    // 6. Re-seed Demo Messages
    // ========================================
    console.log('💬 Re-seeding demo messages...')

    const demoClient = await prisma.user.findUnique({
      where: { email: 'demo.client@disasterrecovery.com.au' },
    })

    const demoContractor = await prisma.user.findFirst({
      where: { email: 'demo.contractor@disasterrecovery.com.au' },
    })

    if (demoClient && demoContractor) {
      await prisma.jobMessage.createMany({
        skipDuplicates: true,
        data: [
          {
            id: 'demo-msg-1',
            jobId: 'demo-job-en-route',
            senderId: demoClient.id,
            senderType: 'client',
            content: 'Hi, water is still coming in. How far away are you?',
            isRead: true,
            createdAt: new Date(Date.now() - 10 * 60 * 1000),
          },
          {
            id: 'demo-msg-2',
            jobId: 'demo-job-en-route',
            senderId: demoContractor.id,
            senderType: 'contractor',
            content: "I'm about 12 minutes away. Please turn off the water main if you can access it safely.",
            isRead: true,
            createdAt: new Date(Date.now() - 8 * 60 * 1000),
          },
          {
            id: 'demo-msg-3',
            jobId: 'demo-job-en-route',
            senderId: demoClient.id,
            senderType: 'client',
            content: 'Done! Water main is off now. Thank you for the quick response.',
            isRead: true,
            createdAt: new Date(Date.now() - 6 * 60 * 1000),
          },
          {
            id: 'demo-msg-4',
            jobId: 'demo-job-en-route',
            senderId: demoContractor.id,
            senderType: 'contractor',
            content: "Great work! I'll be there shortly with all the extraction equipment.",
            isRead: false,
            createdAt: new Date(Date.now() - 4 * 60 * 1000),
          },
        ],
      })

      console.log('   Created 4 fresh messages')
    }

    // ========================================
    // Summary
    // ========================================
    console.log('\n' + '='.repeat(60))
    console.log('✅ DEMO DATA RESET COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n🎪 Ready for next booth demonstration')
    console.log('\n📧 Demo Credentials (password: demo2026):')
    console.log('   Client:     demo.client@disasterrecovery.com.au')
    console.log('   Contractor: demo.contractor@disasterrecovery.com.au')
    console.log('   Admin:      demo.admin@disasterrecovery.com.au')
    console.log('\n💡 Tip: Run this script between each booth demo')
    console.log('\n')

  } catch (error) {
    console.error('\n❌ Error resetting demo data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the reset
resetDemoData()
  .then(() => {
    console.log('✅ Demo reset completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Demo reset failed:', error)
    process.exit(1)
  })

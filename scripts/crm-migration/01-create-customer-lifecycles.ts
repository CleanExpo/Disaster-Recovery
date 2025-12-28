/**
 * CRM Migration Script 1: Create Customer Lifecycles
 *
 * Backfills CustomerLifecycle records for all existing Users
 * Determines initial stage based on user activity
 *
 * @run npm run ts-node scripts/crm-migration/01-create-customer-lifecycles.ts
 */

import { PrismaClient, CustomerLifecycleStage } from '@prisma/client';

const prisma = new PrismaClient();

async function createCustomerLifecycles() {
  console.log('🔄 Starting Customer Lifecycle creation...\n');

  const users = await prisma.user.findMany({
    include: {
      bookings: true,
      serviceRequests: true,
      payments: true,
      ratings: true,
    },
  });

  console.log(`Found ${users.length} users to process\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const user of users) {
    try {
      // Check if lifecycle already exists
      const existing = await prisma.customerLifecycle.findUnique({
        where: { userId: user.id },
      });

      if (existing) {
        console.log(`⏭️  Skipped ${user.email} (lifecycle exists)`);
        skipped++;
        continue;
      }

      // Determine initial stage
      const hasCompletedBookings = user.bookings.some(
        (b) => b.status === 'COMPLETED'
      );
      const hasServiceRequests = user.serviceRequests.length > 0;
      const hasRatings = user.ratings.length > 0;

      let initialStage: CustomerLifecycleStage;

      if (hasCompletedBookings) {
        initialStage = hasRatings && user.ratings[0]?.rating >= 4.5 ? 'ADVOCATE' : 'CUSTOMER';
      } else if (hasServiceRequests) {
        initialStage = 'QUALIFIED_LEAD';
      } else {
        initialStage = 'LEAD';
      }

      // Calculate initial metrics
      const totalValue = user.bookings.reduce(
        (sum, b) => sum + Number(b.finalCostAUD || b.estimatedCostAUD),
        0
      );

      const completedJobs = user.bookings.filter(
        (b) => b.status === 'COMPLETED'
      ).length;

      const averageJobValue =
        completedJobs > 0 ? totalValue / completedJobs : 0;

      const lastBooking = user.bookings.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )[0];

      const daysSince = lastBooking
        ? Math.floor((Date.now() - lastBooking.createdAt.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      // Create lifecycle
      await prisma.customerLifecycle.create({
        data: {
          userId: user.id,
          currentStage: initialStage,
          totalInteractions: user.bookings.length + user.serviceRequests.length,
          lastInteractionDate: lastBooking?.createdAt,
          daysSinceLastContact: daysSince,
          lifetimeValueAUD: totalValue,
          averageJobValueAUD: averageJobValue,
          totalJobsCompleted: completedJobs,
          healthScore: 50, // Will be calculated in script 04
          churnRiskScore: 0, // Will be calculated in script 04
          isAtRisk: false,
        },
      });

      console.log(`✅ Created lifecycle for ${user.email} (${initialStage})`);
      created++;
    } catch (error: any) {
      console.error(`❌ Error processing ${user.email}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${users.length}\n`);

  await prisma.$disconnect();
}

createCustomerLifecycles()
  .then(() => {
    console.log('✅ Customer Lifecycle creation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });

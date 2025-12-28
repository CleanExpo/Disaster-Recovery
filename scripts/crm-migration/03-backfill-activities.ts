/**
 * CRM Migration Script 3: Backfill Activities
 *
 * Creates Activity records from existing:
 * - Bookings (BOOKING_CREATED)
 * - Payments (PAYMENT_RECEIVED)
 * - Insurance Claims (CLAIM_SUBMITTED, CLAIM_APPROVED)
 * - Ratings (REVIEW_RECEIVED)
 *
 * @run npm run ts-node scripts/crm-migration/03-backfill-activities.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function backfillActivities() {
  console.log('🔄 Starting Activities backfill...\n');

  let createdFromBookings = 0;
  let createdFromPayments = 0;
  let createdFromClaims = 0;
  let createdFromRatings = 0;
  let errors = 0;

  // 1. Create activities from bookings
  console.log('📋 Processing bookings...');
  const bookings = await prisma.booking.findMany({
    include: {
      client: {
        include: {
          lifecycle: true,
        },
      },
    },
  });

  for (const booking of bookings) {
    try {
      if (!booking.client.lifecycle) continue;

      const existing = await prisma.activity.findFirst({
        where: {
          type: 'BOOKING_CREATED',
          bookingId: booking.id,
        },
      });

      if (existing) continue;

      await prisma.activity.create({
        data: {
          type: 'BOOKING_CREATED',
          subject: `Booking created: ${booking.description}`,
          description: `Service: ${booking.australianServiceType}, Location: ${booking.serviceSuburb}, ${booking.serviceState}`,
          performedById: booking.clientId,
          customerId: booking.clientId,
          customerLifecycleId: booking.client.lifecycle.id,
          bookingId: booking.id,
          activityDate: booking.createdAt,
          contractorId: booking.contractorId || undefined,
        },
      });

      createdFromBookings++;
    } catch (error: any) {
      console.error(`Error processing booking ${booking.id}:`, error.message);
      errors++;
    }
  }

  console.log(`✅ Created ${createdFromBookings} activities from bookings\n`);

  // 2. Create activities from payments
  console.log('💳 Processing payments...');
  const payments = await prisma.payment.findMany({
    include: {
      client: {
        include: {
          lifecycle: true,
        },
      },
    },
  });

  for (const payment of payments) {
    try {
      if (!payment.client.lifecycle) continue;

      const existing = await prisma.activity.findFirst({
        where: {
          type: 'PAYMENT_RECEIVED',
          performedById: payment.clientId,
          activityDate: payment.processedAt || payment.createdAt,
        },
      });

      if (existing) continue;

      await prisma.activity.create({
        data: {
          type: 'PAYMENT_RECEIVED',
          subject: `Payment received: $${payment.amountAUD} AUD`,
          description: `Payment for booking ${payment.bookingId}`,
          outcome: `Status: ${payment.status}`,
          performedById: payment.clientId,
          customerId: payment.clientId,
          customerLifecycleId: payment.client.lifecycle.id,
          bookingId: payment.bookingId,
          activityDate: payment.processedAt || payment.createdAt,
        },
      });

      createdFromPayments++;
    } catch (error: any) {
      console.error(`Error processing payment ${payment.id}:`, error.message);
      errors++;
    }
  }

  console.log(`✅ Created ${createdFromPayments} activities from payments\n`);

  // 3. Create activities from insurance claims
  console.log('🏥 Processing insurance claims...');
  const claims = await prisma.insuranceClaimAU.findMany({
    include: {
      client: {
        include: {
          lifecycle: true,
        },
      },
    },
  });

  for (const claim of claims) {
    try {
      if (!claim.client.lifecycle) continue;

      // CLAIM_SUBMITTED activity
      const submittedExists = await prisma.activity.findFirst({
        where: {
          type: 'CLAIM_SUBMITTED',
          claimId: claim.id,
        },
      });

      if (!submittedExists && claim.submittedAt) {
        await prisma.activity.create({
          data: {
            type: 'CLAIM_SUBMITTED',
            subject: `Insurance claim submitted: ${claim.claimNumber || 'Pending'}`,
            description: `Amount: $${claim.totalClaimAmountAUD} AUD`,
            performedById: claim.clientId,
            customerId: claim.clientId,
            customerLifecycleId: claim.client.lifecycle.id,
            claimId: claim.id,
            bookingId: claim.bookingId,
            activityDate: claim.submittedAt,
          },
        });

        createdFromClaims++;
      }

      // CLAIM_APPROVED activity
      const approvedExists = await prisma.activity.findFirst({
        where: {
          type: 'CLAIM_APPROVED',
          claimId: claim.id,
        },
      });

      if (!approvedExists && claim.status === 'APPROVED' && claim.approvedAt) {
        await prisma.activity.create({
          data: {
            type: 'CLAIM_APPROVED',
            subject: `Insurance claim approved: ${claim.claimNumber}`,
            description: `Approved amount: $${claim.approvedAmountAUD} AUD`,
            performedById: claim.clientId,
            customerId: claim.clientId,
            customerLifecycleId: claim.client.lifecycle.id,
            claimId: claim.id,
            bookingId: claim.bookingId,
            activityDate: claim.approvedAt,
          },
        });

        createdFromClaims++;
      }
    } catch (error: any) {
      console.error(`Error processing claim ${claim.id}:`, error.message);
      errors++;
    }
  }

  console.log(`✅ Created ${createdFromClaims} activities from claims\n`);

  // 4. Create activities from ratings
  console.log('⭐ Processing ratings...');
  const ratings = await prisma.rating.findMany({
    include: {
      user: {
        include: {
          lifecycle: true,
        },
      },
    },
  });

  for (const rating of ratings) {
    try {
      if (!rating.user.lifecycle) continue;

      const existing = await prisma.activity.findFirst({
        where: {
          type: 'REVIEW_RECEIVED',
          customerId: rating.userId,
          activityDate: rating.createdAt,
        },
      });

      if (existing) continue;

      await prisma.activity.create({
        data: {
          type: 'REVIEW_RECEIVED',
          subject: `Rating received: ${rating.rating}/5 stars`,
          description: rating.comment || undefined,
          outcome: `Rating: ${rating.rating}`,
          performedById: rating.userId,
          customerId: rating.userId,
          customerLifecycleId: rating.user.lifecycle.id,
          bookingId: rating.bookingId,
          activityDate: rating.createdAt,
          sentiment: rating.rating >= 4 ? 'positive' : rating.rating <= 2 ? 'negative' : 'neutral',
          sentimentScore: (rating.rating - 3) / 2, // -1 to +1 scale
        },
      });

      createdFromRatings++;
    } catch (error: any) {
      console.error(`Error processing rating ${rating.id}:`, error.message);
      errors++;
    }
  }

  console.log(`✅ Created ${createdFromRatings} activities from ratings\n`);

  const totalCreated =
    createdFromBookings +
    createdFromPayments +
    createdFromClaims +
    createdFromRatings;

  console.log(`\n📊 Summary:`);
  console.log(`   Bookings: ${createdFromBookings}`);
  console.log(`   Payments: ${createdFromPayments}`);
  console.log(`   Claims: ${createdFromClaims}`);
  console.log(`   Ratings: ${createdFromRatings}`);
  console.log(`   Total Created: ${totalCreated}`);
  console.log(`   Errors: ${errors}\n`);

  await prisma.$disconnect();
}

backfillActivities()
  .then(() => {
    console.log('✅ Activities backfill completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });

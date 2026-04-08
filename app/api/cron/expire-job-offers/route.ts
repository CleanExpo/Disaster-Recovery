/**
 * GET /api/cron/expire-job-offers
 *
 * Cron job: every 5 minutes
 * - Marks pending JobOffers whose expiresAt has passed as 'expired'
 * - Sends expiry notification emails to affected contractors
 * - Cascades to the next contractor in the pool
 *
 * Secured with CRON_SECRET header.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { findNextContractor, OFFER_TIMEOUT_MINUTES } from '@/lib/contractor-matching';
import { sendEmail, emailTemplates } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  // Find all pending offers past their expiry time
  const expired = await prisma.jobOffer.findMany({
    where: {
      status: 'pending',
      expiresAt: { lt: now },
    },
    include: {
      job: {
        select: {
          id: true,
          serviceType: true,
          suburb: true,
          coordinates: true,
          status: true,
        },
      },
      contractor: {
        select: { email: true, username: true },
      },
    },
  });

  let expiredCount = 0;
  let cascadeCount = 0;
  let emailCount = 0;

  for (const offer of expired) {
    // Skip if job already assigned
    if (offer.job.status === 'assigned') {
      await prisma.jobOffer.update({
        where: { id: offer.id },
        data: { status: 'expired' },
      });
      expiredCount++;
      continue;
    }

    // Mark as expired
    await prisma.jobOffer.update({
      where: { id: offer.id },
      data: { status: 'expired' },
    });
    expiredCount++;

    // Notify contractor of expiry
    const ctEmail = offer.contractor?.email;
    const ctName = offer.contractor?.username ?? 'Contractor';
    const suburb = offer.job.suburb ?? 'your area';
    if (ctEmail) {
      const sent = await sendEmail(
        ctEmail,
        emailTemplates.jobOfferExpired(ctName, offer.job.serviceType, suburb)
      );
      if (sent) emailCount++;
    }

    // Cascade to next contractor
    const coords = offer.job.coordinates as { lat?: number; lng?: number } | null;
    if (!coords?.lat || !coords?.lng) continue;

    const next = await findNextContractor(
      offer.jobId,
      { lat: coords.lat, lng: coords.lng },
      offer.job.serviceType,
      prisma,
    );

    if (!next) continue;

    const expiresAt = new Date(Date.now() + OFFER_TIMEOUT_MINUTES * 60 * 1000);

    const newOffer = await prisma.jobOffer.create({
      data: {
        jobId: offer.jobId,
        contractorId: next.contractorId,
        status: 'pending',
        expiresAt,
        requiresLiabilityAck: next.requiresLiabilityAck,
        pool: next.pool,
      },
    });

    cascadeCount++;

    // Notify next contractor
    const nextContractor = await prisma.contractor.findUnique({
      where: { id: next.contractorId },
      select: { email: true, username: true },
    });

    if (nextContractor?.email) {
      const sent = await sendEmail(
        nextContractor.email,
        emailTemplates.jobOfferNew(
          nextContractor.username ?? 'Contractor',
          newOffer.id,
          {
            serviceType: offer.job.serviceType,
            suburb,
            expiresAt,
            requiresLiabilityAck: next.requiresLiabilityAck,
          }
        )
      );
      if (sent) emailCount++;
    }
  }

  return NextResponse.json({
    success: true,
    expired: expiredCount,
    cascaded: cascadeCount,
    emailsSent: emailCount,
    processedAt: now.toISOString(),
  });
}

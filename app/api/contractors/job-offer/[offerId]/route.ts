/**
 * PATCH /api/contractors/job-offer/[offerId]
 *
 * Contractor accepts or declines a job offer.
 *
 * Body: { action: "accept" | "decline", liabilityAcknowledged?: boolean }
 *
 * Accept flow:
 *   - If requiresLiabilityAck and liabilityAcknowledged !== true → 400
 *   - Marks offer as accepted, assigns job to contractor
 *
 * Decline flow:
 *   - Marks offer as declined
 *   - Triggers findNextContractor to cascade to the next candidate
 *   - Returns new offer details (or noContractors if pool exhausted)
 *
 * Expired offers:
 *   - Returns 410 Gone
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { findNextContractor, OFFER_TIMEOUT_MINUTES } from '@/lib/contractor-matching';
import { sendEmail, emailTemplates } from '@/lib/email';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

interface OfferActionBody {
  action: 'accept' | 'decline';
  liabilityAcknowledged?: boolean;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ offerId: string }> },
) {
  const log = requestLogger(request, { route: '/api/contractors/job-offer/[offerId]' });
  try {
    const { offerId } = await params;

    const offer = await prisma.jobOffer.findUnique({
      where: { id: offerId },
      include: {
        job: {
          select: {
            id: true,
            serviceType: true,
            coordinates: true,
            status: true,
            suburb: true,
          },
        },
        contractor: {
          select: { email: true, username: true },
        },
      },
    });

    if (!offer) {
      return NextResponse.json(
        { success: false, message: 'Offer not found' },
        { status: 404 },
      );
    }

    // Check for expiry
    if (offer.status === 'expired' || new Date() > offer.expiresAt) {
      // Mark expired if not already
      if (offer.status !== 'expired') {
        await prisma.jobOffer.update({
          where: { id: offerId },
          data: { status: 'expired' },
        });
      }
      return NextResponse.json(
        { success: false, message: 'This offer has expired' },
        { status: 410 },
      );
    }

    if (offer.status !== 'pending') {
      return NextResponse.json(
        { success: false, message: `Offer is already ${offer.status}` },
        { status: 409 },
      );
    }

    const body: OfferActionBody = await request.json();
    const { action, liabilityAcknowledged } = body;

    if (action !== 'accept' && action !== 'decline') {
      return NextResponse.json(
        { success: false, message: 'action must be "accept" or "decline"' },
        { status: 400 },
      );
    }

    // ── Accept ────────────────────────────────────────────────────────────────
    if (action === 'accept') {
      if (offer.requiresLiabilityAck && !liabilityAcknowledged) {
        return NextResponse.json(
          {
            success: false,
            message:
              'You must acknowledge the liability disclaimer before accepting this job.',
            requiresLiabilityAck: true,
          },
          { status: 400 },
        );
      }

      const now = new Date();

      // Update offer record
      await prisma.jobOffer.update({
        where: { id: offerId },
        data: {
          status: 'accepted',
          liabilityAcknowledgedAt: offer.requiresLiabilityAck ? now : null,
        },
      });

      // Assign job to contractor and mark accepted
      await prisma.job.update({
        where: { id: offer.jobId },
        data: {
          contractorId: offer.contractorId,
          status: 'assigned',
          assignedAt: now,
          acceptedAt: now,
        },
      });

      // Expire any other pending offers for this job
      await prisma.jobOffer.updateMany({
        where: {
          jobId: offer.jobId,
          id: { not: offerId },
          status: 'pending',
        },
        data: { status: 'expired' },
      });

      // Notify contractor of acceptance
      const ctEmail = offer.contractor?.email;
      const ctName = offer.contractor?.username ?? 'Contractor';
      const suburb = offer.job.suburb ?? 'your area';
      if (ctEmail) {
        sendEmail(ctEmail, emailTemplates.jobOfferAccepted(ctName, offerId, offer.job.serviceType, suburb)).catch(() => {});
      }

      await logComplianceEvent({
        eventType: 'contractor_accepted',
        correlationId: '00000000-0000-0000-0000-000000000000',
        correlationType: 'contractor_dispatch',
        entityType: 'contractor',
        metadata: {
          route: '/api/contractors/job-offer/[offerId]',
          request_id: log.requestId,
          offer_id: offerId,
          job_id: offer.jobId,
          contractor_id: offer.contractorId,
          liability_acknowledged: Boolean(offer.requiresLiabilityAck && liabilityAcknowledged),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Job accepted successfully',
        jobId: offer.jobId,
        offerId,
      });
    }

    // ── Decline ───────────────────────────────────────────────────────────────
    await prisma.jobOffer.update({
      where: { id: offerId },
      data: { status: 'declined' },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'contractor_dispatch',
      entityType: 'contractor',
      metadata: {
        route: '/api/contractors/job-offer/[offerId]',
        request_id: log.requestId,
        offer_id: offerId,
        job_id: offer.jobId,
        contractor_id: offer.contractorId,
        action: 'decline',
      },
    });

    // Notify contractor of declination
    const dctEmail = offer.contractor?.email;
    const dctName = offer.contractor?.username ?? 'Contractor';
    const dSuburb = offer.job.suburb ?? 'your area';
    if (dctEmail) {
      sendEmail(dctEmail, emailTemplates.jobOfferDeclined(dctName, offer.job.serviceType, dSuburb)).catch(() => {});
    }

    // Determine job location for cascade
    const coords = offer.job.coordinates as { lat?: number; lng?: number } | null;

    if (!coords?.lat || !coords?.lng) {
      return NextResponse.json({
        success: true,
        message: 'Offer declined. No coordinates available to cascade.',
        cascaded: false,
      });
    }

    // Cascade to next contractor
    const next = await findNextContractor(
      offer.jobId,
      { lat: coords.lat, lng: coords.lng },
      offer.job.serviceType,
      prisma,
    );

    if (!next) {
      return NextResponse.json({
        success: true,
        message: 'Offer declined. No further contractors available.',
        cascaded: false,
        noContractors: true,
      });
    }

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

    return NextResponse.json({
      success: true,
      message: 'Offer declined. Next contractor has been offered the job.',
      cascaded: true,
      newOfferId: newOffer.id,
      newContractorId: next.contractorId,
      pool: next.pool,
      requiresLiabilityAck: next.requiresLiabilityAck,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    log.error('job-offer PATCH error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contractors/job-offer/[offerId]' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process offer action',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// GET — fetch current offer status
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ offerId: string }> },
) {
  const { offerId } = await params;
  const offer = await prisma.jobOffer.findUnique({
    where: { id: offerId },
    select: {
      id: true,
      jobId: true,
      contractorId: true,
      status: true,
      pool: true,
      offeredAt: true,
      expiresAt: true,
      requiresLiabilityAck: true,
      liabilityAcknowledgedAt: true,
    },
  });

  if (!offer) {
    return NextResponse.json(
      { success: false, message: 'Offer not found' },
      { status: 404 },
    );
  }

  const isExpired = offer.status === 'pending' && new Date() > offer.expiresAt;

  return NextResponse.json({
    success: true,
    offer: {
      ...offer,
      isExpired,
      timeRemainingSeconds: isExpired
        ? 0
        : Math.max(0, Math.floor((offer.expiresAt.getTime() - Date.now()) / 1000)),
    },
  });
}

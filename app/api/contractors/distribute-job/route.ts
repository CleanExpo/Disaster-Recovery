/**
 * POST /api/contractors/distribute-job
 *
 * Initiates job matching — finds the next eligible contractor via the
 * radius-tier + round-robin algorithm and creates a JobOffer record.
 *
 * Body: { jobId, jobType, latitude, longitude }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { findNextContractor, OFFER_TIMEOUT_MINUTES } from '@/lib/contractor-matching';
import { sendEmail, emailTemplates } from '@/lib/email';
import { requestLogger, captureException } from '@/lib/observability';

interface DistributeJobBody {
  jobId: string;
  jobType: string;
  latitude: number;
  longitude: number;
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractors/distribute-job' });
  try {
    const body: DistributeJobBody = await request.json();
    const { jobId, jobType, latitude, longitude } = body;

    if (!jobId || !jobType || latitude == null || longitude == null) {
      return NextResponse.json(
        { success: false, message: 'jobId, jobType, latitude and longitude are required' },
        { status: 400 },
      );
    }

    // Verify the job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 },
      );
    }

    const match = await findNextContractor(
      jobId,
      { lat: latitude, lng: longitude },
      jobType,
      prisma,
    );

    if (!match) {
      return NextResponse.json(
        { noContractors: true, message: 'No contractors available — client should be notified' },
        { status: 200 },
      );
    }

    const expiresAt = new Date(Date.now() + OFFER_TIMEOUT_MINUTES * 60 * 1000);

    const offer = await prisma.jobOffer.create({
      data: {
        jobId,
        contractorId: match.contractorId,
        status: 'pending',
        expiresAt,
        requiresLiabilityAck: match.requiresLiabilityAck,
        pool: match.pool,
      },
    });

    // Fetch basic contractor info for the response
    const contractor = await prisma.contractor.findUnique({
      where: { id: match.contractorId },
      select: {
        id: true,
        username: true,
        email: true,
        mobileNumber: true,
        companyProfile: {
          select: { companyName: true, tradingName: true },
        },
      },
    });

    // Send job offer email to contractor
    if (contractor?.email) {
      const suburb = (job as Record<string, unknown>).suburb as string | undefined ?? 'your area';
      sendEmail(
        contractor.email,
        emailTemplates.jobOfferNew(
          contractor.username ?? 'Contractor',
          offer.id,
          {
            serviceType: jobType,
            suburb,
            expiresAt,
            requiresLiabilityAck: match.requiresLiabilityAck,
          }
        )
      ).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      offerId: offer.id,
      contractorId: match.contractorId,
      contractor: contractor
        ? {
            id: contractor.id,
            username: contractor.username,
            email: contractor.email,
            mobileNumber: contractor.mobileNumber,
            companyName:
              contractor.companyProfile?.companyName ??
              contractor.companyProfile?.tradingName ??
              contractor.username,
          }
        : null,
      distanceKm: Math.round(match.distanceKm * 10) / 10,
      pool: match.pool,
      requiresLiabilityAck: match.requiresLiabilityAck,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    log.error('distribute-job error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contractors/distribute-job' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to distribute job',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// GET — check distribution status for a job
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json(
      { success: false, message: 'jobId is required' },
      { status: 400 },
    );
  }

  const offers = await prisma.jobOffer.findMany({
    where: { jobId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      contractorId: true,
      status: true,
      pool: true,
      offeredAt: true,
      expiresAt: true,
      requiresLiabilityAck: true,
      liabilityAcknowledgedAt: true,
    },
  });

  return NextResponse.json({ success: true, jobId, offers });
}

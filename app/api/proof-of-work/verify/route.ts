import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

const VerifyBodySchema = z.object({
  claimId: z.string().min(1),
  verificationStatus: z.enum(['VERIFIED', 'REJECTED', 'PENDING']),
  verificationNotes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/proof-of-work/verify' });
  try {
    const body = await req.json();
    const parsed = VerifyBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { claimId, verificationStatus, verificationNotes } = parsed.data;

    const existingClaim = await prisma.proofOfWork.findUnique({
      where: { id: claimId },
      include: {
        contractor: {
          select: {
            id: true,
            email: true,
            username: true,
            status: true,
            onboardingStep: true,
          },
        },
      },
    });

    if (!existingClaim) {
      return NextResponse.json({ error: 'Proof of work claim not found' }, { status: 404 });
    }

    const updatedClaim = await prisma.proofOfWork.update({
      where: { id: claimId },
      data: {
        verificationStatus,
        rejectionReason: verificationStatus === 'REJECTED' ? (verificationNotes ?? null) : null,
        verifiedAt: verificationStatus === 'VERIFIED' ? new Date() : null,
      },
    });

    if (verificationStatus === 'VERIFIED' || verificationStatus === 'REJECTED') {
      const contractorId = existingClaim.contractorId;

      const [allClaims, competencyTests] = await Promise.all([
        prisma.proofOfWork.findMany({
          where: { contractorId },
          select: { workType: true, verificationStatus: true },
        }),
        prisma.competencyTestResult.findMany({
          where: { contractorId, passed: true },
          select: { category: true },
        }),
      ]);

      const requiredCategories = competencyTests.map((t) => t.category);
      const verifiedWorkTypes = [
        ...new Set(
          allClaims.filter((c) => c.verificationStatus === 'VERIFIED').map((c) => c.workType),
        ),
      ];

      const hasAllRequiredProof =
        requiredCategories.length > 0 &&
        requiredCategories.every((category) => verifiedWorkTypes.includes(category));

      if (hasAllRequiredProof && existingClaim.contractor.status !== 'APPROVED') {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            status: 'APPROVED',
            approvedAt: new Date(),
            onboardingStep: Math.max(existingClaim.contractor.onboardingStep ?? 0, 10),
          },
        });
      } else if (
        verificationStatus === 'REJECTED' &&
        existingClaim.contractor.status !== 'UNDER_REVIEW'
      ) {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: { status: 'UNDER_REVIEW' },
        });
      }

      const notificationType =
        verificationStatus === 'VERIFIED' ? 'PROOF_OF_WORK_APPROVED' : 'PROOF_OF_WORK_REJECTED';

      await prisma.contractorNotification.create({
        data: {
          contractorId,
          type: notificationType,
          priority: verificationStatus === 'REJECTED' ? 'HIGH' : 'NORMAL',
          subject:
            verificationStatus === 'VERIFIED' ? 'Proof of Work Approved' : 'Proof of Work Rejected',
          message:
            verificationStatus === 'VERIFIED'
              ? `The proof of work for ${existingClaim.workType} has been approved.`
              : `The proof of work for ${existingClaim.workType} has been rejected. Please review the feedback and resubmit.`,
          actionRequired: verificationStatus === 'REJECTED',
        },
      });

      if (hasAllRequiredProof && existingClaim.contractor.status !== 'APPROVED') {
        await prisma.contractorNotification.create({
          data: {
            contractorId,
            type: 'SYSTEM',
            priority: 'HIGH',
            subject: 'Application Approved',
            message:
              'The contractor application has been fully approved. Leads can now be received.',
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      claim: {
        ...updatedClaim,
        evidence: JSON.parse(updatedClaim.evidence) as unknown[],
      },
      message: `Proof of work claim ${verificationStatus.toLowerCase()} successfully`,
    });
  } catch (error) {
    log.error('proof-of-work verify failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/proof-of-work/verify' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        error: 'Internal server error during proof of work verification',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const claimId = searchParams.get('claimId');

    if (!claimId) {
      return NextResponse.json({ error: 'Missing claimId parameter' }, { status: 400 });
    }

    const claim = await prisma.proofOfWork.findUnique({
      where: { id: claimId },
      include: {
        contractor: {
          select: {
            email: true,
            username: true,
            status: true,
            mobileNumber: true,
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json({ error: 'Proof of work claim not found' }, { status: 404 });
    }

    return NextResponse.json({
      claim: {
        ...claim,
        evidence: JSON.parse(claim.evidence) as unknown[],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proof of work claim' }, { status: 500 });
  }
}

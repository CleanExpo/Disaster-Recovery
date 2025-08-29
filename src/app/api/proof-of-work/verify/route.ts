import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { claimId, verificationStatus, verificationNotes } = await req.json();

    // Validate input
    if (!claimId || !verificationStatus) {
      return NextResponse.json(
        { error: 'Missing required fields: claimId, verificationStatus' },
        { status: 400 }
      );
    }

    // Validate verification status
    const validStatuses = ['VERIFIED', 'REJECTED', 'PENDING'];
    if (!validStatuses.includes(verificationStatus)) {
      return NextResponse.json(
        { error: `Invalid verification status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if claim exists
    const existingClaim = await prisma.proofOfWork.findUnique({
      where: { id: claimId },
      include: {
        contractor: {
          select: {
            id: true,
            email: true,
            businessName: true,
            status: true,
          }
        }
      }
    });

    if (!existingClaim) {
      return NextResponse.json(
        { error: 'Proof of work claim not found' },
        { status: 404 }
      );
    }

    // Update the claim
    const updatedClaim = await prisma.proofOfWork.update({
      where: { id: claimId },
      data: {
        verificationStatus,
        verificationNotes,
        verifiedAt: verificationStatus === 'VERIFIED' ? new Date() : null,
      }
    });

    // If claim is verified or rejected, check contractor's overall status
    if (verificationStatus === 'VERIFIED' || verificationStatus === 'REJECTED') {
      const contractorId = existingClaim.contractorId;

      // Get all proof of work claims for this contractor
      const allClaims = await prisma.proofOfWork.findMany({
        where: { contractorId },
        select: {
          workType: true,
          verificationStatus: true,
        }
      });

      // Get required work types from passed competency tests
      const competencyTests = await prisma.competencyTestResult.findMany({
        where: {
          contractorId,
          passed: true,
        },
        select: {
          workType: true,
        }
      });

      const requiredWorkTypes = competencyTests.map(test => test.workType);
      const verifiedClaims = allClaims.filter(claim => claim.verificationStatus === 'VERIFIED');
      const rejectedClaims = allClaims.filter(claim => claim.verificationStatus === 'REJECTED');

      // Check if contractor has verified proof of work for all required work types
      const verifiedWorkTypes = [...new Set(verifiedClaims.map(claim => claim.workType))];
      const hasAllRequiredProof = requiredWorkTypes.every(workType =>
        verifiedWorkTypes.includes(workType)
      );

      // Update contractor status based on proof of work verification
      let newContractorStatus = existingClaim.contractor.status;
      let statusUpdateData: any = {};

      if (hasAllRequiredProof && verifiedClaims.length >= requiredWorkTypes.length) {
        // All required proof of work is verified - move to next stage
        newContractorStatus = 'APPROVED';
        statusUpdateData = {
          status: 'APPROVED',
          approvedAt: new Date(),
          onboardingStep: Math.max(existingClaim.contractor.onboardingStep || 0, 10), // Proof verification step
        };
      } else if (rejectedClaims.length > 0 && verificationStatus === 'REJECTED') {
        // Some claims rejected - contractor needs to resubmit
        newContractorStatus = 'UNDER_REVIEW';
        statusUpdateData = {
          status: 'UNDER_REVIEW',
          reviewNotes: `Proof of work verification incomplete. Rejected: ${rejectedClaims.length}, Verified: ${verifiedClaims.length}`,
        };
      }

      if (newContractorStatus !== existingClaim.contractor.status) {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: statusUpdateData
        });
      }

      // Create notification for contractor
      await prisma.notification.create({
        data: {
          type: verificationStatus === 'VERIFIED' ? 'PROOF_OF_WORK_APPROVED' : 'PROOF_OF_WORK_REJECTED',
          title: `Proof of Work ${verificationStatus === 'VERIFIED' ? 'Approved' : 'Rejected'}`,
          message: verificationStatus === 'VERIFIED' 
            ? `Your proof of work for ${existingClaim.workType} has been approved`
            : `Your proof of work for ${existingClaim.workType} has been rejected. Please review the feedback and resubmit.`,
          metadata: JSON.stringify({
            contractorId,
            proofOfWorkId: claimId,
            workType: existingClaim.workType,
            verificationNotes,
            newStatus: newContractorStatus,
          }),
          read: false,
          recipientType: 'CONTRACTOR',
          recipientId: contractorId,
        }
      });

      // If contractor is now approved, create welcome notification
      if (newContractorStatus === 'APPROVED' && existingClaim.contractor.status !== 'APPROVED') {
        await prisma.notification.create({
          data: {
            type: 'CONTRACTOR_APPROVED',
            title: 'Congratulations! Your Application is Approved',
            message: 'Your contractor application has been fully approved. You can now start receiving leads.',
            metadata: JSON.stringify({
              contractorId,
              approvedAt: new Date().toISOString(),
            }),
            read: false,
            recipientType: 'CONTRACTOR',
            recipientId: contractorId,
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      claim: {
        ...updatedClaim,
        evidence: JSON.parse(updatedClaim.evidence as string || '[]')
      },
      message: `Proof of work claim ${verificationStatus.toLowerCase()} successfully`,
    });

  } catch (error) {
    console.error('Error verifying proof of work:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during proof of work verification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const claimId = searchParams.get('claimId');

    if (!claimId) {
      return NextResponse.json(
        { error: 'Missing claimId parameter' },
        { status: 400 }
      );
    }

    const claim = await prisma.proofOfWork.findUnique({
      where: { id: claimId },
      include: {
        contractor: {
          select: {
            email: true,
            businessName: true,
            status: true,
            phone: true,
          }
        }
      }
    });

    if (!claim) {
      return NextResponse.json(
        { error: 'Proof of work claim not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      claim: {
        ...claim,
        evidence: JSON.parse(claim.evidence as string || '[]')
      }
    });

  } catch (error) {
    console.error('Error fetching proof of work claim:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proof of work claim' },
      { status: 500 }
    );
  }
}
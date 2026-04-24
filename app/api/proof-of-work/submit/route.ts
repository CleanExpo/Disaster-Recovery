import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

interface ProofOfWorkEvidence {
  type: 'BEFORE_PHOTO' | 'AFTER_PHOTO' | 'INVOICE' | 'COMPLETION_CERTIFICATE' | 'CLIENT_TESTIMONIAL' | 'INSURANCE_REPORT';
  url: string;
  description: string;
  uploadedAt: string;
}

interface ProofOfWorkClaim {
  workType: string;
  projectName: string;
  clientName: string;
  clientContact: string;
  projectAddress: string;
  completionDate: string;
  projectValue: number;
  projectDescription: string;
  damageType: string[];
  propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'INSTITUTIONAL';
  emergencyResponse: boolean;
  insuranceClaim: boolean;
  insuranceCompany?: string;
  evidence: ProofOfWorkEvidence[];
}

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/proof-of-work/submit' });
  try {
    const { contractorId, claims } = await req.json() as { contractorId: string; claims: ProofOfWorkClaim[] };

    if (!contractorId || !claims || !Array.isArray(claims)) {
      return NextResponse.json(
        { error: 'Missing required fields: contractorId, claims' },
        { status: 400 }
      );
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId }
    });

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 });
    }

    const requiredEvidenceTypes = ['BEFORE_PHOTO', 'AFTER_PHOTO', 'INVOICE'];

    for (const claim of claims) {
      const requiredFields = ['workType', 'projectName', 'clientName', 'clientContact', 'completionDate', 'projectValue'];
      for (const field of requiredFields) {
        if (!claim[field as keyof ProofOfWorkClaim]) {
          return NextResponse.json(
            { error: `Missing required field: ${field} in claim for ${claim.workType}` },
            { status: 400 }
          );
        }
      }

      if (claim.projectValue < 1000) {
        return NextResponse.json(
          { error: `Project value must be at least $1,000 for ${claim.workType}` },
          { status: 400 }
        );
      }

      const completionDate = new Date(claim.completionDate);
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

      if (completionDate < threeYearsAgo) {
        return NextResponse.json(
          { error: `Project completion date must be within the last 3 years for ${claim.workType}` },
          { status: 400 }
        );
      }

      const evidenceTypes: string[] = claim.evidence.map((e) => e.type);
      const missingEvidence = requiredEvidenceTypes.filter(type => !evidenceTypes.includes(type));

      if (missingEvidence.length > 0) {
        return NextResponse.json(
          { error: `Missing required evidence for ${claim.workType}: ${missingEvidence.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const createdClaims = [];

    for (const claim of claims) {
      const existing = await prisma.proofOfWork.findFirst({
        where: { contractorId, workType: claim.workType, projectName: claim.projectName }
      });

      if (existing) {
        const updated = await prisma.proofOfWork.update({
          where: { id: existing.id },
          data: {
            clientName: claim.clientName,
            clientContact: claim.clientContact,
            projectAddress: claim.projectAddress,
            completionDate: new Date(claim.completionDate),
            projectValue: claim.projectValue,
            projectDescription: claim.projectDescription,
            damageType: claim.damageType,
            propertyType: claim.propertyType,
            emergencyResponse: claim.emergencyResponse,
            insuranceClaim: claim.insuranceClaim,
            insuranceCompany: claim.insuranceCompany,
            evidence: JSON.stringify(claim.evidence),
            verificationStatus: 'PENDING',
            submittedAt: new Date()
          }
        });
        createdClaims.push(updated);
      } else {
        const created = await prisma.proofOfWork.create({
          data: {
            contractorId,
            workType: claim.workType,
            projectName: claim.projectName,
            clientName: claim.clientName,
            clientContact: claim.clientContact,
            projectAddress: claim.projectAddress,
            completionDate: new Date(claim.completionDate),
            projectValue: claim.projectValue,
            projectDescription: claim.projectDescription,
            damageType: claim.damageType,
            propertyType: claim.propertyType,
            emergencyResponse: claim.emergencyResponse,
            insuranceClaim: claim.insuranceClaim,
            insuranceCompany: claim.insuranceCompany,
            evidence: JSON.stringify(claim.evidence),
            verificationStatus: 'PENDING'
          }
        });
        createdClaims.push(created);
      }
    }

    const requiredWorkTypesCount = await prisma.competencyTestResult.count({
      where: { contractorId, passed: true }
    });

    const submittedProofCount = await prisma.proofOfWork.count({
      where: { contractorId, verificationStatus: { in: ['PENDING', 'VERIFIED'] } }
    });

    if (submittedProofCount >= requiredWorkTypesCount && requiredWorkTypesCount > 0) {
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          status: 'UNDER_REVIEW',
          onboardingStep: Math.max(contractor.onboardingStep || 0, 8)
        }
      });
    }

    return NextResponse.json({
      success: true,
      claims: createdClaims.map(claim => ({
        ...claim,
        evidence: JSON.parse(claim.evidence as string)
      })),
      message: `Successfully submitted ${createdClaims.length} proof of work claims`,
      contractorStatus: submittedProofCount >= requiredWorkTypesCount ? 'UNDER_REVIEW' : 'IN_PROGRESS'
    });

  } catch (error) {
    log.error('error submitting proof of work', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/proof-of-work/submit' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        error: 'Internal server error during proof of work submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/proof-of-work/submit' });
  try {
    const { searchParams } = new URL(req.url);
    const contractorId = searchParams.get('contractorId');
    const workType = searchParams.get('workType');
    const verificationStatus = searchParams.get('verificationStatus');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: {
      contractorId?: string;
      workType?: string;
      verificationStatus?: string;
    } = {};
    if (contractorId) where.contractorId = contractorId;
    if (workType) where.workType = workType;
    if (verificationStatus) where.verificationStatus = verificationStatus;

    const [claims, total] = await Promise.all([
      prisma.proofOfWork.findMany({
        where,
        include: {
          contractor: {
            select: { email: true, username: true, status: true }
          }
        },
        orderBy: { submittedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.proofOfWork.count({ where })
    ]);

    const claimsWithParsedEvidence = claims.map(claim => ({
      ...claim,
      evidence: JSON.parse(claim.evidence as string || '[]')
    }));

    const [statusStats, workTypeStats] = await Promise.all([
      prisma.proofOfWork.groupBy({
        by: ['verificationStatus'],
        _count: { id: true },
        where: contractorId ? { contractorId } : undefined
      }),
      prisma.proofOfWork.groupBy({
        by: ['workType'],
        _count: { id: true },
        where: contractorId ? { contractorId } : undefined
      })
    ]);

    return NextResponse.json({
      claims: claimsWithParsedEvidence,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      statistics: {
        total,
        byVerificationStatus: statusStats.reduce((acc, stat) => {
          acc[stat.verificationStatus] = stat._count.id;
          return acc;
        }, {} as Record<string, number>),
        byWorkType: workTypeStats.reduce((acc, stat) => {
          acc[stat.workType] = stat._count.id;
          return acc;
        }, {} as Record<string, number>)
      }
    });

  } catch (error) {
    log.error('error fetching proof of work claims', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/proof-of-work/submit' }, extra: { requestId: log.requestId } });
    return NextResponse.json({ error: 'Failed to fetch proof of work claims' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  try {
    const { contractorId, claims } = await req.json();

    // Validate input
    if (!contractorId || !claims || !Array.isArray(claims)) {
      return NextResponse.json(
        { error: 'Missing required fields: contractorId, claims' },
        { status: 400 }
      );
    }

    // Check if contractor exists
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId }
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Validate each claim
    const requiredEvidenceTypes = ['BEFORE_PHOTO', 'AFTER_PHOTO', 'INVOICE'];
    
    for (const claim of claims) {
      // Validate basic fields
      const requiredFields = ['workType', 'projectName', 'clientName', 'clientContact', 'completionDate', 'projectValue'];
      for (const field of requiredFields) {
        if (!claim[field]) {
          return NextResponse.json(
            { error: `Missing required field: ${field} in claim for ${claim.workType}` },
            { status: 400 }
          );
        }
      }

      // Validate project value
      if (claim.projectValue < 1000) {
        return NextResponse.json(
          { error: `Project value must be at least $1,000 for ${claim.workType}` },
          { status: 400 }
        );
      }

      // Validate completion date (within last 3 years)
      const completionDate = new Date(claim.completionDate);
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
      
      if (completionDate < threeYearsAgo) {
        return NextResponse.json(
          { error: `Project completion date must be within the last 3 years for ${claim.workType}` },
          { status: 400 }
        );
      }

      // Validate required evidence
      const evidenceTypes = claim.evidence.map((e: ProofOfWorkEvidence) => e.type);
      const missingEvidence = requiredEvidenceTypes.filter(type => !evidenceTypes.includes(type));
      
      if (missingEvidence.length > 0) {
        return NextResponse.json(
          { error: `Missing required evidence for ${claim.workType}: ${missingEvidence.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Create proof of work records
    const createdClaims = [];
    
    for (const claim of claims) {
      // TODO: Store proof of work when model is added to schema
      // For now, create a stub response
      const stubClaim = {
        id: `temp_${Date.now()}_${claim.workType}`,
        contractorId,
        workType: claim.workType,
        projectName: claim.projectName,
        projectValue: claim.projectValue,
        evidence: JSON.stringify(claim.evidence)
      };
      createdClaims.push(stubClaim);
      
      // const existingClaim = await prisma.proofOfWork.findFirst({
      //   where: {
      //     contractorId,
      //     workType: claim.workType,
      //     projectName: claim.projectName }
      // });
      //
      // if (existingClaim) {
      //   // Update existing claim
      //   const updatedClaim = await prisma.proofOfWork.update({
      //     where: { id: existingClaim.id },
      //     data: {
      //       clientName: claim.clientName,
      //       clientContact: claim.clientContact,
      //       projectAddress: claim.projectAddress,
      //       completionDate: new Date(claim.completionDate),
      //       projectValue: claim.projectValue,
      //       projectDescription: claim.projectDescription,
      //       damageType: claim.damageType,
      //       propertyType: claim.propertyType,
      //       emergencyResponse: claim.emergencyResponse,
      //       insuranceClaim: claim.insuranceClaim,
      //       insuranceCompany: claim.insuranceCompany,
      //       evidence: JSON.stringify(claim.evidence),
      //       verificationStatus: 'PENDING',
      //       submittedAt: new Date() }
      //   });
      //   createdClaims.push(updatedClaim);
      // } else {
      //   // Create new claim
      //   const newClaim = await prisma.proofOfWork.create({
      //     data: {
      //       contractorId,
      //       workType: claim.workType,
      //       projectName: claim.projectName,
      //       clientName: claim.clientName,
      //       clientContact: claim.clientContact,
      //       projectAddress: claim.projectAddress,
      //       completionDate: new Date(claim.completionDate),
      //       projectValue: claim.projectValue,
      //       projectDescription: claim.projectDescription,
      //       damageType: claim.damageType,
      //       propertyType: claim.propertyType,
      //       emergencyResponse: claim.emergencyResponse,
      //       insuranceClaim: claim.insuranceClaim,
      //       insuranceCompany: claim.insuranceCompany,
      //       evidence: JSON.stringify(claim.evidence),
      //       verificationStatus: 'PENDING',
      //       submittedAt: new Date() }
      //   });
      //   createdClaims.push(newClaim);
      // }
    }

    // Update contractor onboarding progress
    const totalWorkTypes = claims.length;
    const completedWorkTypes = createdClaims.length;
    
    // TODO: Check required work types when competencyTestResult model is added
    const requiredWorkTypesCount = 0;
    
    // const requiredWorkTypesCount = await prisma.competencyTestResult.count({
    //   where: {
    //     contractorId,
    //     passed: true }
    // });

    // TODO: Count proof of work when model is added
    const submittedProofCount = 0;
    
    // const submittedProofCount = await prisma.proofOfWork.count({
    //   where: {
    //     contractorId,
    //     verificationStatus: {
    //       in: ['PENDING', 'VERIFIED']
    //     }
    //   }
    // });

    // Update contractor status if all proof of work is submitted
    if (submittedProofCount >= requiredWorkTypesCount) {
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          status: 'UNDER_REVIEW',
          onboardingStep: Math.max(contractor.onboardingStep || 0, 8), // Proof of work submission step
        }
      });
    }

    // TODO: Create notifications when user relationship is properly configured
    // await prisma.notification.createMany({
    //   data: createdClaims.map(claim => ({
    //     type: 'PROOF_OF_WORK_SUBMITTED',
    //     title: 'New Proof of Work Submitted',
    //     message: `${contractor.username || contractor.email} has submitted proof of work for ${claim.workType}`,
    //     metadata: JSON.stringify({
    //       contractorId,
    //       proofOfWorkId: claim.id,
    //       workType: claim.workType,
    //       projectValue: claim.projectValue }),
    //     read: false,
    //     userId: 'admin_user_id' // Need proper user ID
    //   }))
    // });

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
    console.error('Error submitting proof of work:', error);
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
  try {
    const { searchParams } = new URL(req.url);
    const contractorId = searchParams.get('contractorId');
    const workType = searchParams.get('workType');
    const verificationStatus = searchParams.get('verificationStatus');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (contractorId) where.contractorId = contractorId;
    if (workType) where.workType = workType;
    if (verificationStatus) where.verificationStatus = verificationStatus;

    // TODO: Get proof of work claims when model is added
    const claims: any[] = [];
    const total = 0;
    
    // const [claims, total] = await Promise.all([
    //   prisma.proofOfWork.findMany({
    //     where,
    //     include: {
    //       contractor: {
    //         select: {
    //           email: true,
    //           username: true,
    //           status: true }
    //       }
    //     },
    //     orderBy: { submittedAt: 'desc' },
    //     skip,
    //     take: limit }),
    //   prisma.proofOfWork.count({ where })
    // ]);

    // Parse evidence JSON
    const claimsWithParsedEvidence = claims.map(claim => ({
      ...claim,
      evidence: JSON.parse(claim.evidence as string || '[]')
    }));

    // TODO: Get summary statistics when model is added
    const stats: any[] = [];
    const workTypeStats: any[] = [];
    
    // const stats = await prisma.proofOfWork.groupBy({
    //   by: ['verificationStatus'],
    //   _count: {
    //     id: true
    //   },
    //   where: contractorId ? { contractorId } : undefined
    // });
    //
    // const workTypeStats = await prisma.proofOfWork.groupBy({
    //   by: ['workType'],
    //   _count: {
    //     id: true
    //   },
    //   where: contractorId ? { contractorId } : undefined
    // });

    return NextResponse.json({
      claims: claimsWithParsedEvidence,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      statistics: {
        total,
        byVerificationStatus: stats.reduce((acc, stat) => {
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
    console.error('Error fetching proof of work claims:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proof of work claims' },
      { status: 500 }
    );
  }
}
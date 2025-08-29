import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import FraudDetectionService, { DocumentAnalysisInput } from '@/lib/ai/fraud-detection';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      documentId,
      contractorId,
      documentType,
      content,
      metadata
    } = body;

    // Validate required fields
    if (!contractorId || !documentType || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: contractorId, documentType, content' },
        { status: 400 }
      );
    }

    // Validate document type
    const validDocumentTypes = [
      'INSURANCE_POLICY',
      'BUSINESS_LICENSE', 
      'CERTIFICATION',
      'PROOF_OF_WORK',
      'FINANCIAL_STATEMENT',
      'OTHER'
    ];

    if (!validDocumentTypes.includes(documentType)) {
      return NextResponse.json(
        { error: `Invalid document type. Must be one of: ${validDocumentTypes.join(', ')}` },
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

    // Prepare analysis input
    const analysisInput: DocumentAnalysisInput = {
      documentType,
      content,
      metadata: {
        ...metadata,
        ipAddress: req.ip || req.headers.get('x-forwarded-for')?.split(',')[0],
        userAgent: req.headers.get('user-agent') || undefined,
        uploadTimestamp: new Date().toISOString(),
      },
      contractorId,
    };

    // Run fraud detection analysis
    const fraudDetectionService = FraudDetectionService.getInstance();
    const analysisResult = await fraudDetectionService.analyzeDocument(analysisInput);

    // Update document record if documentId provided
    if (documentId) {
      await prisma.onboardingDocument.update({
        where: { id: documentId },
        data: {
          fraudAnalysisCompleted: true,
          fraudConfidenceScore: analysisResult.confidenceScore,
          fraudRiskLevel: analysisResult.confidenceScore >= 80 ? 'LOW' : 
                          analysisResult.confidenceScore >= 60 ? 'MEDIUM' : 'HIGH',
          fraudAnalysisResults: JSON.stringify(analysisResult),
          reviewRequired: analysisResult.recommendedAction === 'REVIEW',
          status: analysisResult.recommendedAction === 'REJECT' ? 'REJECTED' :
                  analysisResult.recommendedAction === 'REVIEW' ? 'UNDER_REVIEW' : 'APPROVED'
        }
      });
    }

    // Update contractor status if this is a critical document
    const criticalDocuments = ['INSURANCE_POLICY', 'BUSINESS_LICENSE', 'CERTIFICATION'];
    if (criticalDocuments.includes(documentType)) {
      if (analysisResult.recommendedAction === 'REJECT') {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            status: 'REJECTED',
            rejectionReason: `Document fraud detected: ${analysisResult.suspiciousElements.join(', ')}`
          }
        });
      } else if (analysisResult.recommendedAction === 'REVIEW') {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            status: 'UNDER_REVIEW',
            reviewNotes: `Document requires manual review: ${analysisResult.suspiciousElements.join(', ')}`
          }
        });
      }
    }

    // Return analysis results
    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      documentId,
      message: `Document analysis completed. Recommendation: ${analysisResult.recommendedAction}`
    });

  } catch (error) {
    console.error('Error in fraud detection API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during fraud analysis',
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
    const documentId = searchParams.get('documentId');
    const riskLevel = searchParams.get('riskLevel');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (contractorId) where.contractorId = contractorId;
    if (riskLevel) where.riskLevel = riskLevel;

    // Get fraud detection logs
    const [logs, total] = await Promise.all([
      prisma.fraudDetectionLog.findMany({
        where,
        include: {
          contractor: {
            select: {
              email: true,
              businessName: true,
              status: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.fraudDetectionLog.count({ where })
    ]);

    // Get summary statistics
    const stats = await prisma.fraudDetectionLog.groupBy({
      by: ['riskLevel'],
      _count: {
        id: true
      },
      where: contractorId ? { contractorId } : undefined
    });

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      statistics: {
        total,
        byRiskLevel: stats.reduce((acc, stat) => {
          acc[stat.riskLevel || 'UNKNOWN'] = stat._count.id;
          return acc;
        }, {} as Record<string, number>)
      }
    });

  } catch (error) {
    console.error('Error fetching fraud detection logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fraud detection logs' },
      { status: 500 }
    );
  }
}
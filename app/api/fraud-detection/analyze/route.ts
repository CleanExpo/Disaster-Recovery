import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import FraudDetectionService, { DocumentAnalysisInput } from '@/lib/ai/fraud-detection';
import { requestLogger, captureException } from '@/lib/observability';

const ValidDocumentTypes = [
  'INSURANCE_POLICY',
  'BUSINESS_LICENSE',
  'CERTIFICATION',
  'PROOF_OF_WORK',
  'FINANCIAL_STATEMENT',
  'OTHER',
] as const;

type DocumentType = (typeof ValidDocumentTypes)[number];

const AnalyzeBodySchema = z.object({
  documentId: z.string().optional(),
  contractorId: z.string().min(1),
  documentType: z.enum(ValidDocumentTypes),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

const CriticalDocumentTypes: DocumentType[] = [
  'INSURANCE_POLICY',
  'BUSINESS_LICENSE',
  'CERTIFICATION',
];

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/fraud-detection/analyze' });
  try {
    const body = await req.json();
    const parsed = AnalyzeBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { documentId, contractorId, documentType, content, metadata } = parsed.data;

    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 });
    }

    const analysisInput: DocumentAnalysisInput = {
      documentType,
      content,
      metadata: {
        ...metadata,
        ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? undefined,
        userAgent: req.headers.get('user-agent') ?? undefined,
        uploadTimestamp: new Date().toISOString(),
      },
      contractorId,
    };

    const fraudDetectionService = FraudDetectionService.getInstance();
    const analysisResult = await fraudDetectionService.analyzeDocument(analysisInput);

    if (CriticalDocumentTypes.includes(documentType)) {
      if (analysisResult.recommendedAction === 'REJECT') {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            status: 'REJECTED',
            rejectionReason: `Document fraud detected: ${analysisResult.suspiciousElements.join(', ')}`,
          },
        });
      } else if (analysisResult.recommendedAction === 'REVIEW') {
        await prisma.contractor.update({
          where: { id: contractorId },
          data: { status: 'UNDER_REVIEW' },
        });
      }
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      documentId: documentId ?? null,
      message: `Document analysis completed. Recommendation: ${analysisResult.recommendedAction}`,
    });
  } catch (error) {
    log.error('fraud analysis failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/fraud-detection/analyze' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      {
        error: 'Internal server error during fraud analysis',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get('page') ?? '1', 10), 1);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);

    return NextResponse.json({
      logs: [] as unknown[],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
      statistics: {
        total: 0,
        byRiskLevel: {} as Record<string, number>,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fraud detection logs' }, { status: 500 });
  }
}

// Sub-contractor engagements API
// Ref: DR-592 — Licensed trade engagement within NRPG contractor portal

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { calculateSubContractorMarkup } from '@/types/sub-contractor';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const TradeTypeSchema = z.enum([
  'pest_termite',
  'plumbing',
  'electrical',
  'gas_fitting',
  'asbestos_removal',
  'structural_engineering',
  'other',
]);

const createEngagementSchema = z.object({
  jobId: z.string().min(1, 'Job ID required'),
  subContractorId: z.string().min(1, 'Sub-contractor ID required'),
  primaryContractorId: z.string().min(1, 'Primary contractor ID required'),
  tradeType: TradeTypeSchema,
  workScope: z.string().min(20, 'Work scope must be at least 20 characters'),
  subInvoiceAmount: z.number().positive('Invoice amount must be positive'),
  markupPercent: z.number().min(15, 'Minimum markup is 15%'),
  notes: z.string().optional(),
});

// ─── GET /api/contractor/sub-contractors/engagements ──────────────────────────

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json(
        { success: false, message: 'Contractor authentication required' },
        { status: 401 },
      );
    }

    const contractorId = request.nextUrl.searchParams.get('contractorId');
    const jobId = request.nextUrl.searchParams.get('jobId');

    if (!contractorId) {
      return NextResponse.json(
        { success: false, message: 'contractorId query parameter required' },
        { status: 400 },
      );
    }

    if (user.role !== UserRole.ADMIN && user.id !== contractorId) {
      return NextResponse.json({ success: false, message: 'Access denied' }, { status: 403 });
    }

    const engagements = await prisma.subContractorEngagement.findMany({
      where: {
        primaryContractorId: contractorId,
        ...(jobId ? { jobId } : {}),
      },
      include: { subContractor: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, engagements });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ─── POST /api/contractor/sub-contractors/engagements ─────────────────────────

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/sub-contractors/engagements' });
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json(
        { success: false, message: 'Contractor authentication required' },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const parsed = createEngagementSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // Verify sub-contractor belongs to this primary contractor and is active
    const subContractor = await prisma.subContractor.findUnique({
      where: { id: data.subContractorId },
    });

    if (!subContractor) {
      return NextResponse.json(
        { success: false, message: 'Sub-contractor not found' },
        { status: 404 },
      );
    }

    if (subContractor.registeredByContractorId !== data.primaryContractorId) {
      return NextResponse.json(
        { success: false, message: 'Sub-contractor not registered under this contractor' },
        { status: 403 },
      );
    }

    if (subContractor.onboardingStatus !== 'COMPLETE' || subContractor.status !== 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          message: 'Sub-contractor onboarding must be complete before engaging on a job',
        },
        { status: 422 },
      );
    }

    // Calculate markup figures
    const calc = calculateSubContractorMarkup(data.subInvoiceAmount, data.markupPercent);

    const engagement = await prisma.subContractorEngagement.create({
      data: {
        jobId: data.jobId,
        subContractorId: data.subContractorId,
        primaryContractorId: data.primaryContractorId,
        tradeType: data.tradeType,
        workScope: data.workScope,
        subInvoiceAmount: calc.subInvoiceAmount,
        markupPercent: calc.markupPercent,
        customerChargeAmount: calc.customerChargeExGst,
        gstAmount: calc.gstAmount,
        customerChargeTotalIncGst: calc.customerChargeTotalIncGst,
        status: 'QUOTED',
        notes: data.notes ?? null,
      },
      include: { subContractor: true },
    });

    void logComplianceEvent({
      eventType: 'contractor_dispatched',
      correlationId: engagement.id,
      correlationType: 'contractor_dispatch',
      entityType: 'contractor',
      entityIdentifier: data.primaryContractorId,
      amountCents: Math.round(calc.customerChargeTotalIncGst * 100),
      amountCurrency: 'AUD',
      metadata: {
        action: 'sub_contractor_engagement_created',
        job_id: data.jobId,
        sub_contractor_id: data.subContractorId,
        trade_type: data.tradeType,
        markup_percent: calc.markupPercent,
        request_id: log.requestId,
      },
    });

    return NextResponse.json({ success: true, engagement }, { status: 201 });
  } catch (err) {
    captureException(err, {
      tags: { route: '/api/contractor/sub-contractors/engagements' },
      extra: { requestId: log.requestId },
    });
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

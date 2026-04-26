// Sub-contractor registration API
// Ref: DR-592 — Licensed trade engagement within NRPG contractor portal

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { requestLogger, captureException } from '@/lib/observability';

const AustralianStateSchema = z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']);

const TradeTypeSchema = z.enum([
  'pest_termite',
  'plumbing',
  'electrical',
  'gas_fitting',
  'asbestos_removal',
  'structural_engineering',
  'other',
]);

const registerSubContractorSchema = z.object({
  // Business details
  businessName: z.string().min(2, 'Business name is required'),
  tradingName: z.string().optional(),
  abn: z.string().regex(/^\d{11}$/, 'ABN must be 11 digits (no spaces)'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactEmail: z.string().email('Valid email required'),
  contactPhone: z.string().min(8, 'Phone number required'),

  // Licence
  tradeType: TradeTypeSchema,
  licenceNumber: z.string().min(3, 'Licence number required'),
  licenceState: AustralianStateSchema,
  licenceExpiry: z.string().refine((v) => new Date(v) > new Date(), {
    message: 'Licence has expired',
  }),

  // Insurance
  publicLiabilityCoverage: z.number().min(5_000_000, 'Minimum $5M public liability required'),
  publicLiabilityInsurer: z.string().min(2, 'Insurer name required'),
  publicLiabilityExpiry: z.string().refine((v) => new Date(v) > new Date(), {
    message: 'Insurance has expired',
  }),

  // Agreement
  agreementAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Agreement must be accepted' }),
  }),
  electronicSignature: z.string().min(2, 'Electronic signature required'),
  signatureDate: z.string().min(1, 'Signature date required'),

  registeredByContractorId: z.string().min(1, 'Contractor ID required'),
});

// ─── GET /api/contractor/sub-contractors ──────────────────────────────────────

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
    if (!contractorId) {
      return NextResponse.json(
        { success: false, message: 'contractorId query parameter required' },
        { status: 400 },
      );
    }

    // Verify the requesting user is the contractor (or admin)
    if (user.role !== UserRole.ADMIN && user.id !== contractorId) {
      return NextResponse.json({ success: false, message: 'Access denied' }, { status: 403 });
    }

    const subContractors = await prisma.subContractor.findMany({
      where: { registeredByContractorId: contractorId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, subContractors });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ─── POST /api/contractor/sub-contractors ─────────────────────────────────────

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/sub-contractors' });
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json(
        { success: false, message: 'Contractor authentication required' },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const parsed = registerSubContractorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // Normalise ABN — strip spaces
    const abn = data.abn.replace(/\s/g, '');

    // Upsert sub-contractor by ABN within this primary contractor's scope
    const subContractor = await prisma.subContractor.upsert({
      where: {
        abn_registeredByContractorId: {
          abn,
          registeredByContractorId: data.registeredByContractorId,
        },
      },
      update: {
        businessName: data.businessName,
        tradingName: data.tradingName ?? null,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        tradeType: data.tradeType,
        licenceNumber: data.licenceNumber,
        licenceState: data.licenceState,
        licenceExpiry: new Date(data.licenceExpiry),
        publicLiabilityCoverage: data.publicLiabilityCoverage,
        publicLiabilityInsurer: data.publicLiabilityInsurer,
        publicLiabilityExpiry: new Date(data.publicLiabilityExpiry),
        onboardingStatus: 'COMPLETE',
        status: 'ACTIVE',
        agreementSignedAt: new Date(),
        agreementSignedBy: data.electronicSignature,
        updatedAt: new Date(),
      },
      create: {
        abn,
        businessName: data.businessName,
        tradingName: data.tradingName ?? null,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        tradeType: data.tradeType,
        licenceNumber: data.licenceNumber,
        licenceState: data.licenceState,
        licenceExpiry: new Date(data.licenceExpiry),
        publicLiabilityCoverage: data.publicLiabilityCoverage,
        publicLiabilityInsurer: data.publicLiabilityInsurer,
        publicLiabilityExpiry: new Date(data.publicLiabilityExpiry),
        onboardingStatus: 'COMPLETE',
        status: 'ACTIVE',
        agreementSignedAt: new Date(),
        agreementSignedBy: data.electronicSignature,
        registeredByContractorId: data.registeredByContractorId,
      },
    });

    return NextResponse.json({ success: true, subContractor }, { status: 201 });
  } catch (err) {
    captureException(err, {
      tags: { route: '/api/contractor/sub-contractors' },
      extra: { requestId: log.requestId },
    });
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

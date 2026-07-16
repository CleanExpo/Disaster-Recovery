import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

function parseJsonArray(str: string | null): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return str ? [str] : [];
  }
}

function mapLeadStatus(db: string): 'new' | 'contacted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' {
  const map: Record<string, 'new' | 'contacted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'> = {
    NEW: 'new',
    ASSIGNED: 'assigned',
    ACCEPTED: 'in_progress',
    COMPLETED: 'completed',
    REJECTED: 'cancelled',
  };
  return map[db] ?? 'new';
}

function mapPaymentStatus(db: string): 'pending' | 'processing' | 'completed' | 'failed' {
  const map: Record<string, 'pending' | 'processing' | 'completed' | 'failed'> = {
    PENDING: 'pending',
    PAID: 'completed',
    COMPLETED: 'completed',
    CANCELLED: 'failed',
    REFUNDED: 'failed',
  };
  return map[db] ?? 'pending';
}

function normalizeUrgency(s: string): 'emergency' | 'urgent' | 'standard' {
  const u = (s || '').toLowerCase();
  if (u.includes('emergency')) return 'emergency';
  if (u.includes('urgent')) return 'urgent';
  return 'standard';
}

export async function GET(request: NextRequest) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { searchParams } = new URL(request.url);

  if (searchParams.get('partners') === '1') {
    const partners = await prisma.partner.findMany({
      select: { id: true, businessName: true },
      orderBy: { businessName: 'asc' },
      take: 200,
    });
    return NextResponse.json({ partners });
  }

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const status = searchParams.get('status') || undefined;
  const urgency = searchParams.get('urgency') || undefined;
  const search = searchParams.get('search')?.trim() || undefined;

  const statusToDb: Record<string, string> = {
    new: 'NEW',
    contacted: 'NEW',
    assigned: 'ASSIGNED',
    in_progress: 'ACCEPTED',
    completed: 'COMPLETED',
    cancelled: 'REJECTED',
  };

  type Where = {
    status?: string;
    urgencyLevel?: { contains: string; mode: 'insensitive' };
    OR?: Array<{ fullName?: { contains: string; mode: 'insensitive' }; email?: { contains: string; mode: 'insensitive' } }>;
  };
  const where: Where = {};
  if (status && status !== 'all') where.status = statusToDb[status] ?? status.toUpperCase();
  if (urgency && urgency !== 'all') where.urgencyLevel = { contains: urgency, mode: 'insensitive' };
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [rows, totalLeads, claimEnquiries] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        partner: { select: { id: true, businessName: true } },
        billing: { take: 1, orderBy: { createdAt: 'desc' } },
        notes: { orderBy: { createdAt: 'desc' }, select: { note: true } },
      },
    }),
    prisma.lead.count({ where }),
    // Public claim submissions land in Enquiry when InsuranceClaimAU FKs can't be satisfied.
    prisma.enquiry.findMany({
      where: {
        source: 'public_claim_submit',
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(status === 'completed' || status === 'cancelled'
          ? { responded: true }
          : status && status !== 'all'
            ? { responded: false }
            : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 50),
    }),
  ]);

  const leadItems = rows.map((lead) => {
    const billing = lead.billing[0];
    const urgencyNorm = normalizeUrgency(lead.urgencyLevel);
    const damageTypes = parseJsonArray(lead.damageType);
    const serviceType = damageTypes[0] || 'Damage restoration';
    const affectedAreas = lead.estimatedAreaAffected
      ? (lead.estimatedAreaAffected.includes(',') ? lead.estimatedAreaAffected.split(',').map((s) => s.trim()) : [lead.estimatedAreaAffected])
      : [];

    let responseTime: number | undefined;
    if (lead.assignedAt && lead.acceptedAt) {
      responseTime = Math.round((lead.acceptedAt.getTime() - lead.assignedAt.getTime()) / 60000);
    }

    const bookingId = `NRPG-${new Date(lead.createdAt).getFullYear()}-${lead.id.slice(-6).toUpperCase()}`;

    return {
      id: lead.id,
      bookingId,
      createdAt: lead.createdAt.toISOString(),
      customer: {
        name: lead.fullName,
        email: lead.email,
        address: lead.propertyAddress,
        suburb: lead.suburb,
        state: lead.state,
        postcode: lead.postcode,
      },
      service: {
        type: serviceType,
        urgency: urgencyNorm,
        description: lead.damageDescription,
        propertyType: lead.propertyType,
        affectedAreas,
      },
      insurance: {
        hasInsurance: lead.hasInsurance,
        company: lead.insuranceCompany ?? undefined,
        claimNumber: lead.claimNumber ?? undefined,
      },
      payment: {
        status: billing ? mapPaymentStatus(billing.status) : 'pending',
        amount: billing?.amount ?? lead.leadValue,
        method: 'card' as const,
        paidAt: billing?.paidAt?.toISOString(),
      },
      contractor: {
        assigned: !!lead.partnerId,
        id: lead.partnerId ?? undefined,
        username: lead.partner?.businessName ?? undefined,
        acceptedAt: lead.acceptedAt?.toISOString(),
        responseTime,
      },
      status: mapLeadStatus(lead.status),
      priority: urgencyNorm === 'emergency' || urgencyNorm === 'urgent' ? ('high' as const) : ('medium' as const),
      notes: lead.notes.map((n) => n.note),
      source: 'lead' as const,
    };
  });

  const enquiryItems = claimEnquiries.map((enquiry) => {
    let payload: Record<string, unknown> = {};
    try {
      const meta = enquiry.metadata
        ? (JSON.parse(enquiry.metadata) as { payload?: Record<string, unknown> })
        : null;
      if (meta?.payload && typeof meta.payload === 'object') payload = meta.payload;
    } catch {
      // ignore malformed metadata
    }
    const urgencyNorm = normalizeUrgency(String(payload.urgencyLevel ?? 'standard'));
    const damageTypes = Array.isArray(payload.damageTypes)
      ? (payload.damageTypes as string[])
      : [];
    return {
      id: enquiry.id,
      bookingId: `ENQ-${enquiry.id.slice(-6).toUpperCase()}`,
      createdAt: enquiry.createdAt.toISOString(),
      customer: {
        name: enquiry.name,
        email: enquiry.email,
        address: String(payload.propertyAddress ?? ''),
        suburb: String(payload.suburb ?? ''),
        state: String(payload.state ?? ''),
        postcode: String(payload.postcode ?? ''),
      },
      service: {
        type: damageTypes[0] || 'Claim enquiry',
        urgency: urgencyNorm,
        description: enquiry.message,
        propertyType: String(payload.propertyType ?? 'residential'),
        affectedAreas: [] as string[],
      },
      insurance: {
        hasInsurance: Boolean(payload.hasInsurance),
        company: payload.insuranceCompany ? String(payload.insuranceCompany) : undefined,
        claimNumber: payload.claimNumber ? String(payload.claimNumber) : undefined,
      },
      payment: {
        status: 'pending' as const,
        amount: 0,
        method: 'card' as const,
      },
      contractor: {
        assigned: false,
      },
      status: enquiry.responded ? ('in_progress' as const) : ('new' as const),
      priority: urgencyNorm === 'emergency' || urgencyNorm === 'urgent' ? ('high' as const) : ('medium' as const),
      notes: ['Source: public claim submit'],
      source: 'claim_enquiry' as const,
      trackUrl: `/track/${enquiry.id}`,
    };
  });

  // Prefer real leads first; append claim enquiries for the same page so ops never miss intake.
  const leads = [...leadItems, ...enquiryItems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const total = totalLeads + claimEnquiries.length;

  return NextResponse.json({
    leads,
    pagination: { page, limit, total, pages: Math.max(1, Math.ceil(totalLeads / limit)) },
  });
}

/**
 * Assign a lead to a Partner (network partner / contractor partner row).
 * Body: { leadId: string, partnerId: string }
 */
export async function PATCH(request: NextRequest) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  let body: { leadId?: string; partnerId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const leadId = body.leadId?.trim();
  const partnerId = body.partnerId?.trim();
  if (!leadId || !partnerId) {
    return NextResponse.json(
      { error: 'leadId and partnerId are required' },
      { status: 400 },
    );
  }

  const partner = await prisma.partner.findUnique({ where: { id: partnerId } });
  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: leadId },
      select: { id: true, source: true },
    });
    if (enquiry?.source === 'public_claim_submit') {
      return NextResponse.json(
        {
          error:
            'This item is a claim enquiry. Promote it to a Lead before assigning a partner, or contact the claimant directly from /track.',
          trackUrl: `/track/${enquiry.id}`,
        },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  if (lead.partnerId && lead.partnerId === partnerId && lead.status === 'ASSIGNED') {
    return NextResponse.json(
      {
        error: 'This lead is already assigned to that partner.',
        leadId: lead.id,
        partnerId,
      },
      { status: 409 },
    );
  }

  if (lead.partnerId && lead.partnerId !== partnerId && ['ASSIGNED', 'ACCEPTED'].includes(lead.status)) {
    return NextResponse.json(
      {
        error:
          'This lead is already assigned to another partner. Reassign only after clearing the current assignment.',
        leadId: lead.id,
        currentPartnerId: lead.partnerId,
      },
      { status: 409 },
    );
  }

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: {
      partnerId,
      status: 'ASSIGNED',
      assignedAt: new Date(),
    },
    include: { partner: { select: { id: true, businessName: true } } },
  });

  return NextResponse.json({
    success: true,
    lead: {
      id: updated.id,
      status: 'assigned',
      partnerId: updated.partnerId,
      partnerName: updated.partner?.businessName,
      assignedAt: updated.assignedAt?.toISOString(),
    },
  });
}


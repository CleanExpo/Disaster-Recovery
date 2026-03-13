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

  const [rows, total] = await Promise.all([
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
  ]);

  const leads = rows.map((lead) => {
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
    };
  });

  return NextResponse.json({
    leads,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

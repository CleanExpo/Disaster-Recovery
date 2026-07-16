import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';

async function resolvePartnerIdForContractor(user: {
  id: string;
  email?: string | null;
  role?: string;
}): Promise<string | null> {
  if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
    return null; // admin may see all — handled by caller
  }

  const email = user.email?.toLowerCase();
  if (!email) return null;

  const partner = await prisma.partner.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    select: { id: true },
  });
  if (partner) return partner.id;

  // Some deployments use Contractor.id as partnerId on leads
  const contractor = await prisma.contractor.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    select: { id: true },
  });
  return contractor?.id ?? null;
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/leads' });
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contractor authentication required',
        },
        { status: 401 },
      );
    }

    const isAdmin = hasRole(user.role as UserRole, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    const partnerId = isAdmin ? null : await resolvePartnerIdForContractor(user);

    if (!isAdmin && !partnerId) {
      return NextResponse.json({
        success: true,
        data: {
          leads: [],
          summary: {
            totalLeads: 0,
            newLeads: 0,
            expiringWithin1Hour: 0,
            totalPotentialValue: 0,
            averageLeadScore: 0,
          },
        },
      });
    }

    const leads = await prisma.lead.findMany({
      where: isAdmin ? undefined : { partnerId: partnerId! },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    const leadsWithTimeRemaining = leads.map((lead) => {
      let serviceDisplay = lead.damageType;
      try {
        const parsed = JSON.parse(lead.damageType);
        if (Array.isArray(parsed) && parsed.length > 0) {
          serviceDisplay = parsed[0];
        }
      } catch {
        // Use raw string if not valid JSON
      }

      const expiresAt = new Date(lead.createdAt.getTime() + 24 * 60 * 60 * 1000);
      const now = new Date();
      const timeRemaining = Math.max(0, expiresAt.getTime() - now.getTime());
      const minutesRemaining = Math.floor(timeRemaining / 60000);

      return {
        id: lead.id,
        customer: {
          name: lead.fullName,
          email: lead.email,
          location: `${lead.suburb}, ${lead.state}`,
        },
        service: serviceDisplay,
        urgency: lead.urgencyLevel,
        propertyType: lead.propertyType,
        description: lead.damageDescription,
        hasInsurance: lead.hasInsurance,
        estimatedValue: lead.leadValue,
        leadScore: lead.leadScore,
        priority:
          lead.qualityStatus === 'HIGH_VALUE'
            ? 'critical'
            : lead.qualityStatus === 'QUALIFIED'
              ? 'high'
              : 'medium',
        createdAt: lead.createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: lead.status.toLowerCase(),
        address: `${lead.propertyAddress}, ${lead.suburb}, ${lead.state} ${lead.postcode}`,
        insuranceCompany: lead.insuranceCompany || null,
        claimNumber: lead.claimNumber || null,
        timeRemaining: {
          minutes: minutesRemaining,
          display:
            minutesRemaining > 60
              ? `${Math.floor(minutesRemaining / 60)}h ${minutesRemaining % 60}m`
              : `${minutesRemaining}m`,
          urgent: minutesRemaining < 30,
        },
      };
    });

    const summary = {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === 'NEW').length,
      expiringWithin1Hour: leadsWithTimeRemaining.filter((l) => {
        return l.timeRemaining.minutes > 0 && l.timeRemaining.minutes <= 60;
      }).length,
      totalPotentialValue: leads.reduce((sum, l) => sum + l.leadValue, 0),
      averageLeadScore:
        leads.length > 0
          ? Math.round(leads.reduce((sum, l) => sum + l.leadScore, 0) / leads.length)
          : 0,
    };

    return NextResponse.json(
      {
        success: true,
        data: {
          leads: leadsWithTimeRemaining,
          summary,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    log.error('leads api error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/leads' },
      extra: { requestId: log.requestId },
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch leads',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/leads' });
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contractor authentication required',
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { leadId, action, message } = body;

    if (!leadId || !action) {
      return NextResponse.json(
        {
          success: false,
          message: 'leadId and action are required',
        },
        { status: 400 },
      );
    }

    if (!['accept', 'decline', 'request-info'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid action',
        },
        { status: 400 },
      );
    }

    const isAdmin = hasRole(user.role as UserRole, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    const partnerId = isAdmin ? null : await resolvePartnerIdForContractor(user);

    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          message: `Lead ${leadId} not found`,
        },
        { status: 404 },
      );
    }

    if (!isAdmin && partnerId && existingLead.partnerId !== partnerId) {
      return NextResponse.json(
        {
          success: false,
          message: 'This lead is not assigned to you',
        },
        { status: 403 },
      );
    }

    let updateData: Record<string, unknown> = {};
    let responseMessage = '';
    let leadCost = 0;

    switch (action) {
      case 'accept':
        updateData = {
          status: 'ACCEPTED',
          acceptedAt: new Date(),
        };
        leadCost = 50;
        responseMessage = `Lead ${leadId} accepted.`;
        break;

      case 'decline':
        updateData = {
          status: 'REJECTED',
          rejectedAt: new Date(),
          partnerId: null,
        };
        responseMessage = `Lead ${leadId} declined. It will be offered to other contractors.`;
        break;

      case 'request-info':
        responseMessage = `Additional information requested for lead ${leadId}`;
        if (message) {
          await prisma.leadNote.create({
            data: {
              leadId,
              note: message,
              type: 'PARTNER',
              author: user.email || 'contractor',
            },
          });
        }
        break;
    }

    let updatedLead = existingLead;
    if (Object.keys(updateData).length > 0) {
      updatedLead = await prisma.lead.update({
        where: { id: leadId },
        data: updateData,
      });
    }

    await prisma.leadTracking.create({
      data: {
        leadId,
        event:
          action === 'accept' ? 'ACCEPTED' : action === 'decline' ? 'REJECTED' : 'VIEWED',
        metadata: JSON.stringify({
          actionedBy: user.email || 'contractor',
          actionedAt: new Date().toISOString(),
          message: message || null,
        }),
      },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: leadId,
      correlationType: 'system',
      entityType: 'contractor',
      entityIdentifier: user.email || user.id,
      metadata: {
        route: '/api/contractor/leads',
        method: 'POST',
        request_id: log.requestId,
        lead_id: leadId,
        action,
        contractor_id: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        lead: {
          id: updatedLead.id,
          status: updatedLead.status.toLowerCase(),
          cost: leadCost,
          actionedAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    log.error('lead action error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/leads' },
      extra: { requestId: log.requestId },
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process lead action',
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/leads' });
  try {
    // Verify authentication
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required',
      }, { status: 401 });
    }

    // Query all leads ordered by most recent first
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Map database rows to response structure with time-remaining calculations
    const leadsWithTimeRemaining = leads.map((lead) => {
      // Parse damageType (stored as JSON string array)
      let serviceDisplay = lead.damageType;
      try {
        const parsed = JSON.parse(lead.damageType);
        if (Array.isArray(parsed) && parsed.length > 0) {
          serviceDisplay = parsed[0];
        }
      } catch {
        // Use raw string if not valid JSON
      }

      // Calculate time remaining (leads expire 24h after creation if no explicit expiry)
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
        priority: lead.qualityStatus === 'HIGH_VALUE' ? 'critical'
          : lead.qualityStatus === 'QUALIFIED' ? 'high'
          : 'medium',
        createdAt: lead.createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: lead.status.toLowerCase(),
        address: `${lead.propertyAddress}, ${lead.suburb}, ${lead.state} ${lead.postcode}`,
        insuranceCompany: lead.insuranceCompany || null,
        claimNumber: lead.claimNumber || null,
        timeRemaining: {
          minutes: minutesRemaining,
          display: minutesRemaining > 60
            ? `${Math.floor(minutesRemaining / 60)}h ${minutesRemaining % 60}m`
            : `${minutesRemaining}m`,
          urgent: minutesRemaining < 30,
        },
      };
    });

    // Summary statistics
    const summary = {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === 'NEW').length,
      expiringWithin1Hour: leadsWithTimeRemaining.filter((l) => {
        return l.timeRemaining.minutes > 0 && l.timeRemaining.minutes <= 60;
      }).length,
      totalPotentialValue: leads.reduce((sum, l) => sum + l.leadValue, 0),
      averageLeadScore: leads.length > 0
        ? Math.round(leads.reduce((sum, l) => sum + l.leadScore, 0) / leads.length)
        : 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        leads: leadsWithTimeRemaining,
        summary,
      },
    }, { status: 200 });

  } catch (error) {
    log.error('leads api error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contractor/leads' }, extra: { requestId: log.requestId } });

    return NextResponse.json({
      success: false,
      message: 'Failed to fetch leads',
    }, { status: 500 });
  }
}

// Accept or decline a lead
export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/leads' });
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required',
      }, { status: 401 });
    }

    const body = await request.json();
    const { leadId, action, message } = body;

    // Validate required fields
    if (!leadId || !action) {
      return NextResponse.json({
        success: false,
        message: 'leadId and action are required',
      }, { status: 400 });
    }

    // Validate action
    if (!['accept', 'decline', 'request-info'].includes(action)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid action',
      }, { status: 400 });
    }

    // Verify the lead exists
    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) {
      return NextResponse.json({
        success: false,
        message: `Lead ${leadId} not found`,
      }, { status: 404 });
    }

    // Build update payload and response based on action
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
        responseMessage = `Lead ${leadId} accepted. $${leadCost} charged to your account.`;
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
        // Add a note requesting more information; status stays the same
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

    // Perform the database update (skip if request-info with no status change)
    let updatedLead = existingLead;
    if (Object.keys(updateData).length > 0) {
      updatedLead = await prisma.lead.update({
        where: { id: leadId },
        data: updateData,
      });
    }

    // Track the action
    await prisma.leadTracking.create({
      data: {
        leadId,
        event: action === 'accept' ? 'ACCEPTED'
          : action === 'decline' ? 'REJECTED'
          : 'VIEWED',
        metadata: JSON.stringify({
          actionedBy: user.email || 'contractor',
          actionedAt: new Date().toISOString(),
          message: message || null,
        }),
      },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/contractor/leads',
        method: 'POST',
        request_id: log.requestId,
        lead_id: leadId,
        action,
        contractor_id: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: responseMessage,
      lead: {
        id: updatedLead.id,
        status: updatedLead.status.toLowerCase(),
        cost: leadCost,
        actionedAt: new Date().toISOString(),
      },
    }, { status: 200 });

  } catch (error) {
    log.error('lead action error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contractor/leads' }, extra: { requestId: log.requestId } });

    return NextResponse.json({
      success: false,
      message: 'Failed to process lead action',
    }, { status: 500 });
  }
}

/**
 * Partnerships API Route
 *
 * Handles partnership management including proposals, activation,
 * performance tracking, and analytics.
 *
 * @module PartnershipsAPI
 * @category API - Link Building
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  partnershipManager,
  PROPOSAL_TEMPLATES,
  PartnershipType,
  PartnershipStatus
} from '@/lib/seo/partnership-manager';
import { z } from 'zod';

// ============================================================================
// Request Schemas
// ============================================================================

const CreateProposalSchema = z.object({
  partnerId: z.string(),
  template: z.string(),
  customization: z.any().optional()
});

const ActivatePartnershipSchema = z.object({
  partnerId: z.string(),
  terms: z.any(),
  benefits: z.any()
});

const UpdatePerformanceSchema = z.object({
  partnerId: z.string(),
  metrics: z.object({
    backlinksEarned: z.number().optional(),
    referralsReceived: z.number().optional(),
    revenueGenerated: z.number().optional(),
    customersSent: z.number().optional()
  })
});

// ============================================================================
// GET - List partners or get specific partner
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get('partnerId');
    const type = searchParams.get('type') as PartnershipType | null;
    const status = searchParams.get('status') as PartnershipStatus | null;
    const view = searchParams.get('view') || 'list';

    // Get specific partner
    if (partnerId) {
      const partner = partnershipManager.getPartner(partnerId);
      if (!partner) {
        return NextResponse.json(
          { error: 'Partner not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ partner });
    }

    // Get analytics
    if (view === 'analytics') {
      const analytics = partnershipManager.getPartnershipAnalytics();
      const topPerformers = partnershipManager.getTopPerformers(10);

      return NextResponse.json({
        analytics,
        topPerformers
      });
    }

    // Get proposals
    if (view === 'proposals') {
      const proposalId = searchParams.get('proposalId');
      if (proposalId) {
        const proposal = partnershipManager.getProposal(proposalId);
        if (!proposal) {
          return NextResponse.json(
            { error: 'Proposal not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ proposal });
      }

      const proposals = partnershipManager.getAllProposals();
      return NextResponse.json({ proposals });
    }

    // Get templates
    if (view === 'templates') {
      return NextResponse.json({
        templates: Object.entries(PROPOSAL_TEMPLATES).map(([key, tmpl]) => ({
          key,
          name: tmpl.name,
          type: tmpl.type
        }))
      });
    }

    // List partners
    let partners;
    if (type) {
      partners = partnershipManager.getPartnersByType(type);
    } else if (status) {
      partners = partnershipManager.getPartnersByStatus(status);
    } else {
      partners = partnershipManager.getAllPartners();
    }

    return NextResponse.json({
      partners,
      total: partners.length,
      stats: {
        prospect: partners.filter(p => p.status === 'prospect').length,
        active: partners.filter(p => p.status === 'active').length,
        paused: partners.filter(p => p.status === 'paused').length
      }
    });

  } catch (error) {
    console.error('Partnerships GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Create proposal or activate partnership
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create_proposal': {
        const validation = CreateProposalSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request', details: validation.error },
            { status: 400 }
          );
        }

        const { partnerId, template, customization } = validation.data;
        const proposal = await partnershipManager.createProposal(
          partnerId,
          template as keyof typeof PROPOSAL_TEMPLATES,
          customization
        );

        return NextResponse.json({
          success: true,
          proposal,
          message: 'Proposal created successfully'
        });
      }

      case 'generate_proposal_document': {
        const { proposalId } = body;
        if (!proposalId) {
          return NextResponse.json(
            { error: 'Proposal ID required' },
            { status: 400 }
          );
        }

        const document = partnershipManager.generateProposalDocument(proposalId);

        return NextResponse.json({
          success: true,
          document,
          message: 'Proposal document generated'
        });
      }

      case 'activate_partnership': {
        const validation = ActivatePartnershipSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request', details: validation.error },
            { status: 400 }
          );
        }

        const { partnerId, terms, benefits } = validation.data;
        const partner = await partnershipManager.activatePartnership(
          partnerId,
          terms,
          benefits
        );

        return NextResponse.json({
          success: true,
          partner,
          message: 'Partnership activated successfully'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Partnerships POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH - Update partnership performance
// ============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = UpdatePerformanceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error },
        { status: 400 }
      );
    }

    const { partnerId, metrics } = validation.data;
    const partner = await partnershipManager.updatePerformance(partnerId, metrics);

    return NextResponse.json({
      success: true,
      partner,
      message: 'Performance metrics updated'
    });

  } catch (error) {
    console.error('Partnerships PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update performance', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * PR Campaigns API Route
 *
 * Handles CRUD operations for PR campaigns, campaign analytics,
 * and campaign management.
 *
 * @module PRCampaignsAPI
 * @category API - Link Building
 */

import { NextRequest, NextResponse } from 'next/server';
import { prCampaignManager, CAMPAIGN_TEMPLATES } from '@/lib/seo/pr-campaign-manager';
import { z } from 'zod';

// ============================================================================
// Request Schemas
// ============================================================================

const CreateCampaignSchema = z.object({
  template: z.enum(['trueCostOfDelays', 'climateChangeImpact', 'stateOfRestoration2025', 'custom']),
  customData: z.any().optional()
});

const UpdateCampaignSchema = z.object({
  campaignId: z.string(),
  updates: z.any()
});

const CreatePitchSchema = z.object({
  campaignId: z.string(),
  contactId: z.string(),
  customization: z.any().optional()
});

// ============================================================================
// GET - List campaigns or get specific campaign
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const includeAnalytics = searchParams.get('analytics') === 'true';

    // Get specific campaign
    if (campaignId) {
      const campaign = prCampaignManager.getCampaign(campaignId);
      if (!campaign) {
        return NextResponse.json(
          { error: 'Campaign not found' },
          { status: 404 }
        );
      }

      if (includeAnalytics) {
        const analytics = await prCampaignManager.getCampaignAnalytics(campaignId);
        return NextResponse.json({ campaign, analytics });
      }

      return NextResponse.json({ campaign });
    }

    // List all campaigns
    const campaigns = prCampaignManager.getAllCampaigns();
    const templates = Object.keys(CAMPAIGN_TEMPLATES);

    return NextResponse.json({
      campaigns,
      templates,
      stats: {
        total: campaigns.length,
        active: campaigns.filter(c => c.status === 'outreach' || c.status === 'published').length,
        completed: campaigns.filter(c => c.status === 'completed').length
      }
    });

  } catch (error) {
    console.error('PR campaigns GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Create campaign, generate press release, or create pitch
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create_campaign': {
        const validation = CreateCampaignSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request', details: validation.error },
            { status: 400 }
          );
        }

        const { template, customData } = validation.data;
        const campaign = await prCampaignManager.createCampaign(template, customData);

        return NextResponse.json({
          success: true,
          campaign,
          message: 'Campaign created successfully'
        });
      }

      case 'generate_press_release': {
        const { campaignId } = body;
        if (!campaignId) {
          return NextResponse.json(
            { error: 'Campaign ID required' },
            { status: 400 }
          );
        }

        const pressRelease = await prCampaignManager.generatePressRelease(campaignId);

        return NextResponse.json({
          success: true,
          pressRelease,
          message: 'Press release generated successfully'
        });
      }

      case 'create_pitch': {
        const validation = CreatePitchSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request', details: validation.error },
            { status: 400 }
          );
        }

        const { campaignId, contactId, customization } = validation.data;
        const pitch = await prCampaignManager.generateMediaPitch(
          campaignId,
          contactId,
          customization
        );

        return NextResponse.json({
          success: true,
          pitch,
          message: 'Media pitch created successfully'
        });
      }

      case 'add_contact': {
        const { contact } = body;
        if (!contact) {
          return NextResponse.json(
            { error: 'Contact data required' },
            { status: 400 }
          );
        }

        const newContact = await prCampaignManager.addMediaContact(contact);

        return NextResponse.json({
          success: true,
          contact: newContact,
          message: 'Contact added successfully'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('PR campaigns POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH - Update campaign or track results
// ============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'update_results': {
        const { campaignId, results } = body;
        if (!campaignId || !results) {
          return NextResponse.json(
            { error: 'Campaign ID and results required' },
            { status: 400 }
          );
        }

        const campaign = await prCampaignManager.updateCampaignResults(campaignId, results);

        return NextResponse.json({
          success: true,
          campaign,
          message: 'Campaign results updated'
        });
      }

      case 'update_pitch_response': {
        const { pitchId, response } = body;
        if (!pitchId || !response) {
          return NextResponse.json(
            { error: 'Pitch ID and response required' },
            { status: 400 }
          );
        }

        const pitch = await prCampaignManager.updatePitchResponse(pitchId, response);

        return NextResponse.json({
          success: true,
          pitch,
          message: 'Pitch response updated'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('PR campaigns PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Recommendations API
 *
 * Get AI-powered recommendations
 */

import { NextRequest, NextResponse } from 'next/server';
import { recommendationEngine } from '@/lib/ai/recommendation-engine';

/**
 * GET /api/ai/recommendations
 *
 * Get recommendations for user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'all'; // all | rooms | collaborators | suggestions

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      );
    }

    let recommendations;

    switch (type) {
      case 'rooms':
        recommendations = recommendationEngine.recommendRooms(userId);
        return NextResponse.json({ success: true, recommendations });

      case 'collaborators':
        recommendations = recommendationEngine.recommendCollaborators(userId);
        return NextResponse.json({ success: true, recommendations });

      case 'suggestions':
        recommendations = recommendationEngine.generateSmartSuggestions(userId);
        return NextResponse.json({ success: true, recommendations });

      case 'all':
      default:
        const rooms = recommendationEngine.recommendRooms(userId, 3);
        const collaborators = recommendationEngine.recommendCollaborators(userId, 3);
        const suggestions = recommendationEngine.generateSmartSuggestions(userId, 3);

        return NextResponse.json({
          success: true,
          recommendations: {
            rooms,
            collaborators,
            suggestions,
          },
        });
    }
  } catch (error) {
    console.error('Recommendations error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get recommendations',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/recommendations
 *
 * Generate engagement prediction
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      );
    }

    const engagement = recommendationEngine.predictEngagement(userId);
    const bestTime = recommendationEngine.recommendBestTimeToReach(userId);
    const greeting = recommendationEngine.getPersonalizedGreeting(userId);

    return NextResponse.json({
      success: true,
      predictions: {
        engagement,
        bestTime,
        greeting,
      },
    });
  } catch (error) {
    console.error('Prediction error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate predictions',
      },
      { status: 500 }
    );
  }
}

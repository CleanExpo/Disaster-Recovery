import { NextRequest, NextResponse } from 'next/server';
import { getDisasterRecoveryAgent } from '@/lib/services/disasterRecoveryAgent.service';

export async function POST(request: NextRequest) {
    try {
          const {
                  disasterType,
                  severity,
                  description,
                  affectedAreas,
                  userId,
          } = await request.json();

      if (!disasterType || !severity || !description || !userId) {
              return NextResponse.json(
                {
                            error:
                                          'Missing required fields: disasterType, severity, description, userId',
                },
                { status: 400 }
                      );
      }

      const agent = getDisasterRecoveryAgent();
          const result = await agent.analyzeDisaster(
            {
                      type: disasterType,
                      severity,
                      description,
                      affectedAreas: affectedAreas || [],
            },
                  userId
                );

      return NextResponse.json({
              success: true,
              ...result,
      });
    } catch (error) {
          return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Analysis failed' },
            { status: 500 }
                );
    }
}

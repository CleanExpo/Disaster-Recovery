/**
 * Business Rule Violations API
 *
 * GET /api/crm/accountability/violations - List violations
 *
 * @route /api/crm/accountability/violations
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, AlertSeverity } from '@prisma/client';
import { BusinessRulesService } from '@/lib/crm/business-rules.service';

const prisma = new PrismaClient();
const businessRulesService = new BusinessRulesService(prisma);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity') as AlertSeverity | null;

    const violations = await businessRulesService.getActiveViolations(
      severity || undefined
    );

    return NextResponse.json({
      success: true,
      data: violations,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@/lib/tenant-service';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Domain parameter is required',
        400
      );
    }

    const tenant = await TenantService.getTenantByDomain(domain);

    if (!tenant) {
      // Return default tenant for development
      return NextResponse.json({
        id: 'default',
        name: 'Default Platform',
        isActive: true,
        configurations: {}
      });
    }

    return NextResponse.json(tenant);
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

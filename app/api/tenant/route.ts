import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@/lib/tenant-service';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    
    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
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
    console.error('Error fetching tenant:', error);
    return NextResponse.json({ error: 'Failed to fetch tenant' }, { status: 500 });
  }
}

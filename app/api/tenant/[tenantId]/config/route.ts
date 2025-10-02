import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@/lib/tenant-service';

export async function POST(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const { tenantId } = params;
    const { key, value } = await request.json();
    
    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    await TenantService.updateTenantConfig(tenantId, key, value);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating tenant config:', error);
    return NextResponse.json({ error: 'Failed to update tenant configuration' }, { status: 500 });
  }
}

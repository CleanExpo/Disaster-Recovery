import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@/lib/tenant-service';
import { z } from 'zod';

const updateConfigSchema = z.object({
  key: z.string(),
  value: z.any(),
  type: z.enum(['string', 'boolean', 'number', 'json']).optional()
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const body = await request.json();
    const { key, value, type = 'string' } = updateConfigSchema.parse(body);

    await TenantService.updateTenantConfig(params.tenantId, key, value, type);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update tenant config error:', error);
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      const value = await TenantService.getTenantConfig(params.tenantId, key);
      return NextResponse.json({ key, value });
    }

    const configs = await TenantService.getAllTenantConfigs(params.tenantId);
    return NextResponse.json(configs);
  } catch (error) {
    console.error('Get tenant config error:', error);
    return NextResponse.json(
      { error: 'Failed to get configuration' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@/lib/tenant-service';
import { z } from 'zod';

const createTenantSchema = z.object({
  name: z.string().min(1),
  domain: z.string().optional(),
  subdomain: z.string().optional(),
  logo: z.string().url().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  customCss: z.string().optional(),
  industry: z.string().optional(),
  configurations: z.array(z.object({
    key: z.string(),
    value: z.any(),
    type: z.enum(['string', 'boolean', 'number', 'json'])
  })).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createTenantSchema.parse(body);

    // Add default configurations based on industry
    const industry = data.industry || 'restoration';
    const defaultConfigs = TenantService.getDefaultIndustryConfigs(industry);
    const allConfigs = [...(data.configurations || []), ...defaultConfigs];

    const tenant = await TenantService.createTenant({
      ...data,
      configurations: allConfigs
    });

    return NextResponse.json(tenant);
  } catch (error) {
    console.error('Create tenant error:', error);
    return NextResponse.json(
      { error: 'Failed to create tenant' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const subdomain = searchParams.get('subdomain');

    if (domain) {
      const tenant = await TenantService.getTenantByDomain(domain);
      if (!tenant) {
        return NextResponse.json(
          { error: 'Tenant not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(tenant);
    }

    if (subdomain) {
      const tenant = await TenantService.getTenantByDomain(subdomain);
      if (!tenant) {
        return NextResponse.json(
          { error: 'Tenant not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(tenant);
    }

    return NextResponse.json(
      { error: 'Domain or subdomain parameter required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get tenant error:', error);
    return NextResponse.json(
      { error: 'Failed to get tenant' },
      { status: 500 }
    );
  }
}

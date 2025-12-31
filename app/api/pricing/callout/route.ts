import { NextResponse } from 'next/server';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    pricing: getNrpgCalloutSplit(),
    currency: 'AUD',
  });
}

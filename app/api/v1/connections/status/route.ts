import { NextResponse } from 'next/server';
import { buildDisasterRecoveryConnectionStatus } from '@/lib/connections/status';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(buildDisasterRecoveryConnectionStatus());
}

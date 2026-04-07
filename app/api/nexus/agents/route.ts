// GET /api/nexus/agents — returns agent list with status
// POST /api/nexus/agents/[id]/trigger — manually triggers an agent (admin only, see [id]/trigger/route.ts)

import { NextResponse } from 'next/server';
import { NEXUS_AGENTS } from '@/lib/nexus';

export async function GET() {
  return NextResponse.json({
    success: true,
    agents: NEXUS_AGENTS,
    total: NEXUS_AGENTS.length,
  });
}

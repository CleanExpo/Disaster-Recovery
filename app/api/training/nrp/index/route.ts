import { NextRequest, NextResponse } from 'next/server';
import { handleUnexpectedError } from '@/lib/api-errors';
import { loadNrpgTrainingIndex, verifyTrainingSourcesPresent } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    await verifyTrainingSourcesPresent();
    const index = await loadNrpgTrainingIndex();
    return NextResponse.json({ success: true, index });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}


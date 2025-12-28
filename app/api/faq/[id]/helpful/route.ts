import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const helpfulSchema = z.object({
  helpful: z.boolean(),
});

/**
 * POST /api/faq/[id]/helpful
 * Mark FAQ as helpful or not helpful
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { helpful } = helpfulSchema.parse(body);

    const faq = await prisma.fAQ.update({
      where: { id: params.id },
      data: {
        ...(helpful
          ? { helpful: { increment: 1 } }
          : { notHelpful: { increment: 1 } }),
        viewCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error('Error updating FAQ helpful count:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

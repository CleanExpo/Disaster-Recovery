import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const status = searchParams.get('status') || undefined;

  const where = status ? { status } : {};

  const [applications, total] = await Promise.all([
    prisma.contractorApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        businessName: true,
        contactName: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.contractorApplication.count({ where }),
  ]);

  return NextResponse.json({
    applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

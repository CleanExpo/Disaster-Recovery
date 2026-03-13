import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { format, subDays } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const now = new Date();
  const sevenDaysAgo = subDays(now, 6);

  const [byStatus, lastSevenDaysRaw] = await Promise.all([
    prisma.contractorApplication.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    prisma.contractorApplication.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const statusCounts = Object.fromEntries(
    byStatus.map((r) => [r.status, r._count.id])
  ) as Record<string, number>;

  const submitted = statusCounts.SUBMITTED ?? 0;
  const underReview = statusCounts.UNDER_REVIEW ?? 0;
  const approved = statusCounts.APPROVED ?? 0;
  const rejected = statusCounts.REJECTED ?? 0;
  const total = submitted + underReview + approved + rejected;

  const dayCounts: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = subDays(now, 6 - i);
    dayCounts[format(d, 'yyyy-MM-dd')] = 0;
  }
  lastSevenDaysRaw.forEach((a) => {
    const key = format(a.createdAt, 'yyyy-MM-dd');
    if (key in dayCounts) dayCounts[key]++;
  });

  const trendData = Object.entries(dayCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, count]) => ({
      date: dateStr,
      label: format(new Date(dateStr), 'EEE d'),
      count,
    }));

  const statusData = [
    { name: 'Submitted', value: submitted, status: 'SUBMITTED' },
    { name: 'Under review', value: underReview, status: 'UNDER_REVIEW' },
    { name: 'Approved', value: approved, status: 'APPROVED' },
    { name: 'Rejected', value: rejected, status: 'REJECTED' },
  ].filter((d) => d.value > 0);

  return NextResponse.json({
    kpis: { submitted, underReview, approved, rejected, total },
    trendData,
    statusData,
  });
}

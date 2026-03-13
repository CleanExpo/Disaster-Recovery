import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const [byStatus, byUrgency, total, paidBilling, responseTimes] = await Promise.all([
    prisma.lead.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    prisma.lead.groupBy({
      by: ['urgencyLevel'],
      _count: { id: true },
    }),
    prisma.lead.count(),
    prisma.partnerBilling.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true },
    }),
    prisma.lead.findMany({
      where: {
        assignedAt: { not: null },
        acceptedAt: { not: null },
      },
      select: {
        assignedAt: true,
        acceptedAt: true,
      },
    }),
  ]);

  const statusCounts = Object.fromEntries(byStatus.map((r) => [r.status, r._count.id])) as Record<string, number>;
  const newCount = statusCounts.NEW ?? 0;
  const assignedCount = (statusCounts.ASSIGNED ?? 0) + (statusCounts.ACCEPTED ?? 0);
  const completedCount = statusCounts.COMPLETED ?? 0;

  const revenue = paidBilling._sum.amount ?? 0;
  const conversionRate = total ? (completedCount / total) * 100 : 0;

  const times = responseTimes
    .filter((r) => r.assignedAt && r.acceptedAt)
    .map((r) => Math.round((r.acceptedAt!.getTime() - r.assignedAt!.getTime()) / 60000));
  const avgResponseTime = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

  const urgencyCounts: Record<string, number> = {};
  byUrgency.forEach((r) => {
    const key = (r.urgencyLevel || '').toLowerCase().includes('emergency')
      ? 'emergency'
      : (r.urgencyLevel || '').toLowerCase().includes('urgent')
        ? 'urgent'
        : 'standard';
    urgencyCounts[key] = (urgencyCounts[key] ?? 0) + r._count.id;
  });

  const statusData = [
    { name: 'New', value: newCount, status: 'new' },
    { name: 'Assigned', value: statusCounts.ASSIGNED ?? 0, status: 'assigned' },
    { name: 'In progress', value: statusCounts.ACCEPTED ?? 0, status: 'in_progress' },
    { name: 'Completed', value: completedCount, status: 'completed' },
    { name: 'Rejected', value: statusCounts.REJECTED ?? 0, status: 'cancelled' },
  ].filter((d) => d.value > 0);

  const urgencyData = [
    { name: 'emergency', value: urgencyCounts.emergency ?? 0 },
    { name: 'urgent', value: urgencyCounts.urgent ?? 0 },
    { name: 'standard', value: urgencyCounts.standard ?? 0 },
  ].filter((d) => d.value > 0);

  return NextResponse.json({
    kpis: {
      total,
      new: newCount,
      assigned: assignedCount,
      completed: completedCount,
      revenue,
      conversionRate,
      avgResponseTime,
    },
    statusData,
    urgencyData,
  });
}

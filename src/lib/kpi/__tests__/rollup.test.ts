/**
 * Unit tests for src/lib/kpi/rollup.ts
 *
 * Covers period-window arithmetic + the aggregator's per-contractor
 * roll-up behaviour. Database calls are mocked at the prisma client
 * level — we verify the SHAPE of the calls + how the aggregator turns
 * grouped results into ContractorKPI rows.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  periodWindow,
  aggregateContractors,
  upsertKpiRow,
  runRollup,
  type ContractorKpiAggregate,
  type PeriodWindow,
} from '../rollup';

describe('periodWindow', () => {
  it('returns the calendar month containing a mid-month date', () => {
    const w = periodWindow(new Date('2026-04-15T10:30:00Z'), 'MONTHLY');
    expect(w.periodType).toBe('MONTHLY');
    expect(w.periodStart.toISOString()).toBe('2026-04-01T00:00:00.000Z');
    expect(w.periodEnd.toISOString()).toBe('2026-05-01T00:00:00.000Z');
  });

  it('handles a December → January roll-over for monthly', () => {
    const w = periodWindow(new Date('2026-12-31T23:59:59Z'), 'MONTHLY');
    expect(w.periodStart.toISOString()).toBe('2026-12-01T00:00:00.000Z');
    expect(w.periodEnd.toISOString()).toBe('2027-01-01T00:00:00.000Z');
  });

  it('returns the calendar quarter (Q2 = Apr-May-Jun) for an April date', () => {
    const w = periodWindow(new Date('2026-04-15T10:00:00Z'), 'QUARTERLY');
    expect(w.periodStart.toISOString()).toBe('2026-04-01T00:00:00.000Z');
    expect(w.periodEnd.toISOString()).toBe('2026-07-01T00:00:00.000Z');
  });

  it('quarter Q4 (Oct-Nov-Dec) rolls to next year for periodEnd', () => {
    const w = periodWindow(new Date('2026-11-30T23:59:59Z'), 'QUARTERLY');
    expect(w.periodStart.toISOString()).toBe('2026-10-01T00:00:00.000Z');
    expect(w.periodEnd.toISOString()).toBe('2027-01-01T00:00:00.000Z');
  });

  it('returns the calendar year for ANNUAL', () => {
    const w = periodWindow(new Date('2026-06-15T10:00:00Z'), 'ANNUAL');
    expect(w.periodStart.toISOString()).toBe('2026-01-01T00:00:00.000Z');
    expect(w.periodEnd.toISOString()).toBe('2027-01-01T00:00:00.000Z');
  });
});

describe('aggregateContractors', () => {
  function makePrismaMock(opts: {
    outcomeRows: Array<{
      contractorId: string | null;
      outcome: string;
      _count: { outcome: number };
    }>;
    timingRows: Array<{
      contractorId: string | null;
      _avg: { responseMinutes: number | null; durationMinutes: number | null };
    }>;
  }) {
    return {
      jobOutcome: {
        groupBy: vi
          .fn()
          .mockResolvedValueOnce(opts.outcomeRows)
          .mockResolvedValueOnce(opts.timingRows),
      },
    } as any;
  }

  const window: PeriodWindow = {
    periodType: 'MONTHLY',
    periodStart: new Date('2026-04-01T00:00:00Z'),
    periodEnd: new Date('2026-05-01T00:00:00Z'),
  };

  it('returns an empty array when there are no outcomes in the window', async () => {
    const prisma = makePrismaMock({ outcomeRows: [], timingRows: [] });
    const result = await aggregateContractors(prisma, window);
    expect(result).toEqual([]);
  });

  it('skips JobOutcome rows where contractorId is null', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [
        { contractorId: null, outcome: 'COMPLETED', _count: { outcome: 5 } },
        { contractorId: 'contractor-A', outcome: 'COMPLETED', _count: { outcome: 3 } },
      ],
      timingRows: [],
    });
    const result = await aggregateContractors(prisma, window);
    expect(result).toHaveLength(1);
    expect(result[0]?.contractorId).toBe('contractor-A');
  });

  it('counts COMPLETED + DECLINED + CANCELLED into totalJobs', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [
        { contractorId: 'c1', outcome: 'COMPLETED', _count: { outcome: 10 } },
        { contractorId: 'c1', outcome: 'CANCELLED', _count: { outcome: 2 } },
        { contractorId: 'c1', outcome: 'DECLINED', _count: { outcome: 1 } },
      ],
      timingRows: [],
    });
    const [agg] = await aggregateContractors(prisma, window);
    expect(agg).toBeDefined();
    expect(agg!.totalJobs).toBe(13);
    expect(agg!.completedJobs).toBe(10);
    expect(agg!.complaints).toBe(2);
    expect(agg!.violations).toBe(1);
  });

  it('converts averageResponseTime from minutes to hours', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [{ contractorId: 'c1', outcome: 'COMPLETED', _count: { outcome: 1 } }],
      timingRows: [
        {
          contractorId: 'c1',
          _avg: { responseMinutes: 90, durationMinutes: null },
        },
      ],
    });
    const [agg] = await aggregateContractors(prisma, window);
    expect(agg!.averageResponseTime).toBe(1.5);
  });

  it('converts averageCompletionTime from minutes to days', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [{ contractorId: 'c1', outcome: 'COMPLETED', _count: { outcome: 1 } }],
      timingRows: [
        {
          contractorId: 'c1',
          _avg: { responseMinutes: null, durationMinutes: 2880 }, // 2 days
        },
      ],
    });
    const [agg] = await aggregateContractors(prisma, window);
    expect(agg!.averageCompletionTime).toBe(2);
  });

  it('keeps timing nulls when no completed jobs in the window', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [{ contractorId: 'c1', outcome: 'CANCELLED', _count: { outcome: 1 } }],
      timingRows: [],
    });
    const [agg] = await aggregateContractors(prisma, window);
    expect(agg!.averageResponseTime).toBeNull();
    expect(agg!.averageCompletionTime).toBeNull();
  });

  it('produces one row per contractor across multiple outcomes', async () => {
    const prisma = makePrismaMock({
      outcomeRows: [
        { contractorId: 'c1', outcome: 'COMPLETED', _count: { outcome: 5 } },
        { contractorId: 'c2', outcome: 'COMPLETED', _count: { outcome: 8 } },
        { contractorId: 'c2', outcome: 'CANCELLED', _count: { outcome: 1 } },
      ],
      timingRows: [],
    });
    const result = await aggregateContractors(prisma, window);
    expect(result).toHaveLength(2);
    const ids = result.map((r) => r.contractorId).sort();
    expect(ids).toEqual(['c1', 'c2']);
  });
});

describe('upsertKpiRow', () => {
  it('calls prisma.contractorKPI.upsert with the unique 3-tuple key', async () => {
    const upsert = vi.fn().mockResolvedValue({});
    const prisma = { contractorKPI: { upsert } } as any;

    const window: PeriodWindow = {
      periodType: 'MONTHLY',
      periodStart: new Date('2026-04-01T00:00:00Z'),
      periodEnd: new Date('2026-05-01T00:00:00Z'),
    };
    const agg: ContractorKpiAggregate = {
      contractorId: 'c1',
      totalJobs: 10,
      completedJobs: 7,
      averageResponseTime: 1.5,
      averageCompletionTime: 2,
      complaints: 1,
      violations: 0,
    };

    await upsertKpiRow(prisma, agg, window);

    expect(upsert).toHaveBeenCalledTimes(1);
    const call = upsert.mock.calls[0][0];
    expect(call.where.contractorId_periodType_periodStart).toEqual({
      contractorId: 'c1',
      periodType: 'MONTHLY',
      periodStart: window.periodStart,
    });
    expect(call.create.totalJobs).toBe(10);
    expect(call.create.completedJobs).toBe(7);
    expect(call.update.totalJobs).toBe(10);
    expect(call.update.calculatedAt).toBeInstanceOf(Date);
  });
});

describe('runRollup', () => {
  it('returns a result summary with the run window + counts', async () => {
    const groupBy = vi
      .fn()
      .mockResolvedValueOnce([{ contractorId: 'c1', outcome: 'COMPLETED', _count: { outcome: 4 } }])
      .mockResolvedValueOnce([]);
    const upsert = vi.fn().mockResolvedValue({});
    const prisma = {
      jobOutcome: { groupBy },
      contractorKPI: { upsert },
    } as any;

    const result = await runRollup(prisma, new Date('2026-04-15T10:00:00Z'), 'MONTHLY');

    expect(result.periodType).toBe('MONTHLY');
    expect(result.periodStart).toBe('2026-04-01T00:00:00.000Z');
    expect(result.periodEnd).toBe('2026-05-01T00:00:00.000Z');
    expect(result.contractorsAggregated).toBe(1);
    expect(result.rowsUpserted).toBe(1);
    expect(upsert).toHaveBeenCalledTimes(1);
  });

  it('returns zero when no contractors have outcomes in the window', async () => {
    const groupBy = vi.fn().mockResolvedValue([]);
    const upsert = vi.fn();
    const prisma = {
      jobOutcome: { groupBy },
      contractorKPI: { upsert },
    } as any;

    const result = await runRollup(prisma, new Date('2026-04-15T10:00:00Z'), 'MONTHLY');

    expect(result.contractorsAggregated).toBe(0);
    expect(result.rowsUpserted).toBe(0);
    expect(upsert).not.toHaveBeenCalled();
  });
});

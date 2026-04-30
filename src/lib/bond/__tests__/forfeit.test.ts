/**
 * Unit tests for src/lib/bond/forfeit.ts
 *
 * Covers threshold evaluation + forfeit-pass behaviour with mocked
 * prisma. We assert:
 *   - threshold logic (which rows breach, which don't)
 *   - state transitions (subscription update + payment + notification)
 *   - idempotency (existing pending BOND payment short-circuits)
 *   - skip paths (no subscription / inactive subscription)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  evaluateBreach,
  findBreaches,
  applyForfeitPending,
  runForfeitPass,
  FORFEIT_THRESHOLDS,
  type KpiBreach,
} from '../forfeit';

describe('evaluateBreach', () => {
  it('returns empty array when both metrics are within thresholds', () => {
    const reasons = evaluateBreach({ complaints: 0, violations: 0 });
    expect(reasons).toEqual([]);
  });

  it('flags TOO_MANY_COMPLAINTS when complaints exceed threshold', () => {
    const reasons = evaluateBreach({
      complaints: FORFEIT_THRESHOLDS.maxComplaints + 1,
      violations: 0,
    });
    expect(reasons).toHaveLength(1);
    expect(reasons[0]?.reason).toBe('TOO_MANY_COMPLAINTS');
    expect(reasons[0]?.metric).toBe(FORFEIT_THRESHOLDS.maxComplaints + 1);
    expect(reasons[0]?.threshold).toBe(FORFEIT_THRESHOLDS.maxComplaints);
  });

  it('flags TOO_MANY_VIOLATIONS independently', () => {
    const reasons = evaluateBreach({
      complaints: 0,
      violations: FORFEIT_THRESHOLDS.maxViolations + 5,
    });
    expect(reasons).toHaveLength(1);
    expect(reasons[0]?.reason).toBe('TOO_MANY_VIOLATIONS');
  });

  it('treats null metrics as 0 (within threshold)', () => {
    const reasons = evaluateBreach({ complaints: null, violations: null });
    expect(reasons).toEqual([]);
  });

  it('returns BOTH reasons when BOTH thresholds breach', () => {
    const reasons = evaluateBreach({
      complaints: FORFEIT_THRESHOLDS.maxComplaints + 1,
      violations: FORFEIT_THRESHOLDS.maxViolations + 1,
    });
    expect(reasons).toHaveLength(2);
  });

  it('threshold is exclusive — value === threshold is NOT a breach', () => {
    const reasons = evaluateBreach({
      complaints: FORFEIT_THRESHOLDS.maxComplaints,
      violations: FORFEIT_THRESHOLDS.maxViolations,
    });
    expect(reasons).toEqual([]);
  });
});

describe('findBreaches', () => {
  it('reads ContractorKPI rows for the period and filters to breaches', async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        contractorId: 'c1',
        periodType: 'MONTHLY',
        periodStart: new Date('2026-04-01T00:00:00Z'),
        periodEnd: new Date('2026-05-01T00:00:00Z'),
        complaints: FORFEIT_THRESHOLDS.maxComplaints + 1,
        violations: 0,
      },
      {
        contractorId: 'c2',
        periodType: 'MONTHLY',
        periodStart: new Date('2026-04-01T00:00:00Z'),
        periodEnd: new Date('2026-05-01T00:00:00Z'),
        complaints: 0,
        violations: 0,
      },
    ]);
    const prisma = { contractorKPI: { findMany } } as any;

    const result = await findBreaches(prisma, 'MONTHLY', new Date('2026-04-01T00:00:00Z'));

    expect(findMany).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]?.contractorId).toBe('c1');
    expect(result[0]?.reasons[0]?.reason).toBe('TOO_MANY_COMPLAINTS');
  });
});

describe('applyForfeitPending', () => {
  const breach: KpiBreach = {
    contractorId: 'c1',
    periodType: 'MONTHLY',
    periodStart: new Date('2026-04-01T00:00:00Z'),
    periodEnd: new Date('2026-05-01T00:00:00Z'),
    reasons: [{ reason: 'TOO_MANY_COMPLAINTS', metric: 5, threshold: 3 }],
  };

  function makePrisma(overrides: {
    subscription?: any;
    existingPayment?: any;
    update?: ReturnType<typeof vi.fn>;
    paymentCreate?: ReturnType<typeof vi.fn>;
    notificationCreate?: ReturnType<typeof vi.fn>;
  }) {
    return {
      contractorSubscription: {
        findUnique: vi.fn().mockResolvedValue(overrides.subscription ?? null),
        update: overrides.update ?? vi.fn().mockResolvedValue({}),
      },
      contractorPayment: {
        findFirst: vi.fn().mockResolvedValue(overrides.existingPayment ?? null),
        create: overrides.paymentCreate ?? vi.fn().mockResolvedValue({ id: 'payment-new' }),
      },
      contractorNotification: {
        create:
          overrides.notificationCreate ?? vi.fn().mockResolvedValue({ id: 'notification-new' }),
      },
    } as any;
  }

  it('returns no_subscription when contractor has no ContractorSubscription', async () => {
    const prisma = makePrisma({ subscription: null });
    const result = await applyForfeitPending(prisma, breach);
    expect(result.status).toBe('no_subscription');
  });

  it('returns subscription_inactive when subscription status is not ACTIVE', async () => {
    const prisma = makePrisma({
      subscription: { id: 'sub-1', status: 'CANCELLED' },
    });
    const result = await applyForfeitPending(prisma, breach);
    expect(result.status).toBe('subscription_inactive');
  });

  it('is idempotent — already_forfeit_pending when a pending BOND payment exists', async () => {
    const prisma = makePrisma({
      subscription: { id: 'sub-1', status: 'ACTIVE', bondAmount: 5000 },
      existingPayment: { id: 'payment-existing' },
    });
    const result = await applyForfeitPending(prisma, breach);
    expect(result.status).toBe('already_forfeit_pending');
    expect(result.paymentId).toBe('payment-existing');
  });

  it('updates subscription bondStatus + creates BOND payment + notification on first forfeit', async () => {
    const update = vi.fn().mockResolvedValue({});
    const paymentCreate = vi.fn().mockResolvedValue({ id: 'payment-1' });
    const notificationCreate = vi.fn().mockResolvedValue({ id: 'notif-1' });
    const prisma = makePrisma({
      subscription: {
        id: 'sub-1',
        status: 'ACTIVE',
        bondAmount: 5000,
        paymentMethod: 'DIRECT_DEBIT',
      },
      update,
      paymentCreate,
      notificationCreate,
    });

    const result = await applyForfeitPending(prisma, breach);

    expect(result.status).toBe('forfeit_pending_created');
    expect(result.paymentId).toBe('payment-1');
    expect(result.notificationId).toBe('notif-1');

    expect(update).toHaveBeenCalledWith({
      where: { id: 'sub-1' },
      data: { bondStatus: 'FORFEIT_PENDING' },
    });

    expect(paymentCreate).toHaveBeenCalledTimes(1);
    const paymentArgs = paymentCreate.mock.calls[0][0];
    expect(paymentArgs.data.subscriptionId).toBe('sub-1');
    expect(paymentArgs.data.amount).toBe(5000);
    expect(paymentArgs.data.type).toBe('BOND');
    expect(paymentArgs.data.status).toBe('PENDING');
    expect(paymentArgs.data.paymentMethod).toBe('DIRECT_DEBIT');
    expect(paymentArgs.data.dueDate).toBeInstanceOf(Date);

    expect(notificationCreate).toHaveBeenCalledTimes(1);
    const notifArgs = notificationCreate.mock.calls[0][0];
    expect(notifArgs.data.contractorId).toBe('c1');
    expect(notifArgs.data.type).toBe('COMPLIANCE');
    expect(notifArgs.data.priority).toBe('URGENT');
    expect(notifArgs.data.actionRequired).toBe(true);
  });

  it('uses paymentMethod="PENDING" when subscription has no method set yet', async () => {
    const paymentCreate = vi.fn().mockResolvedValue({ id: 'payment-1' });
    const prisma = makePrisma({
      subscription: { id: 'sub-1', status: 'ACTIVE', bondAmount: 5000, paymentMethod: null },
      paymentCreate,
    });
    await applyForfeitPending(prisma, breach);
    expect(paymentCreate.mock.calls[0][0].data.paymentMethod).toBe('PENDING');
  });
});

describe('runForfeitPass', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('aggregates per-contractor outcomes into a summary', async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        contractorId: 'c1',
        periodType: 'MONTHLY',
        periodStart: new Date('2026-04-01T00:00:00Z'),
        periodEnd: new Date('2026-05-01T00:00:00Z'),
        complaints: FORFEIT_THRESHOLDS.maxComplaints + 1,
        violations: 0,
      },
      {
        contractorId: 'c2',
        periodType: 'MONTHLY',
        periodStart: new Date('2026-04-01T00:00:00Z'),
        periodEnd: new Date('2026-05-01T00:00:00Z'),
        complaints: 0,
        violations: FORFEIT_THRESHOLDS.maxViolations + 1,
      },
    ]);

    let subFindCount = 0;
    const prisma = {
      contractorKPI: { findMany },
      contractorSubscription: {
        findUnique: vi.fn().mockImplementation(async ({ where }) => {
          subFindCount++;
          if (where.contractorId === 'c1') {
            return {
              id: 'sub-1',
              status: 'ACTIVE',
              bondAmount: 5000,
              paymentMethod: 'DIRECT_DEBIT',
            };
          }
          // c2 has no subscription
          return null;
        }),
        update: vi.fn().mockResolvedValue({}),
      },
      contractorPayment: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'payment-1' }),
      },
      contractorNotification: {
        create: vi.fn().mockResolvedValue({ id: 'notif-1' }),
      },
    } as any;

    const summary = await runForfeitPass(prisma, 'MONTHLY', new Date('2026-04-01T00:00:00Z'));

    expect(summary.breachesFound).toBe(2);
    expect(summary.forfeitPendingCreated).toBe(1);
    expect(summary.skippedNoSubscription).toBe(1);
    expect(summary.alreadyForfeitPending).toBe(0);
    expect(subFindCount).toBe(2);
  });

  it('returns zero counts when there are no breaches', async () => {
    const prisma = {
      contractorKPI: { findMany: vi.fn().mockResolvedValue([]) },
      contractorSubscription: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      contractorPayment: {
        findFirst: vi.fn(),
        create: vi.fn(),
      },
      contractorNotification: { create: vi.fn() },
    } as any;

    const summary = await runForfeitPass(prisma, 'MONTHLY', new Date('2026-04-01T00:00:00Z'));

    expect(summary.breachesFound).toBe(0);
    expect(summary.forfeitPendingCreated).toBe(0);
    expect(prisma.contractorSubscription.findUnique).not.toHaveBeenCalled();
  });
});

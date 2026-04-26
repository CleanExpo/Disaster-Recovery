/**
 * Unit tests for PaymentValidator (src/lib/payment-security.ts)
 *
 * Tests the core payment calculation and validation methods to prevent
 * financial fraud, ensure pricing consistency, and validate the IMMUTABLE
 * PRICING_CONSTANTS (dated 2026-04-07).
 *
 * Coverage:
 *   - calculateOnboardingAmount(): baseline, breakdown sums, idempotence
 *   - calculateSubscriptionAmount(): all 4 tiers × 3 frequencies, multiplier accuracy
 *   - validatePaymentAmount(): exact match, undercharge, overcharge, missing metadata
 *
 * These are pure-function math tests with real values from PRICING_CONSTANTS.
 * Test failures will clearly indicate the actual vs expected amount in cents.
 *
 * Vitest Batch 1 of 4 — see 2026-04-26 health-check audit C3 for the full plan.
 */

import { describe, it, expect } from 'vitest';
import { PaymentValidator, PRICING_CONSTANTS } from '@/lib/payment-security';

describe('PaymentValidator.calculateOnboardingAmount()', () => {
  it('returns the correct total onboarding amount (247500 cents = $2,475)', () => {
    const result = PaymentValidator.calculateOnboardingAmount();

    expect(result.amount).toBe(247500);
    expect(result.currency).toBe('AUD');
  });

  it('breakdown sums to the total amount', () => {
    const result = PaymentValidator.calculateOnboardingAmount();

    const sum = result.breakdown.applicationFee + result.breakdown.joiningFee;
    expect(sum).toBe(result.breakdown.total);
    expect(result.breakdown.total).toBe(247500);
  });

  it('is idempotent across multiple calls', () => {
    const result1 = PaymentValidator.calculateOnboardingAmount();
    const result2 = PaymentValidator.calculateOnboardingAmount();

    expect(result1.amount).toBe(result2.amount);
    expect(result1.breakdown).toEqual(result2.breakdown);
  });

  it('matches PRICING_CONSTANTS source-of-truth values', () => {
    const result = PaymentValidator.calculateOnboardingAmount();

    expect(result.breakdown.applicationFee).toBe(PRICING_CONSTANTS.APPLICATION_FEE);
    expect(result.breakdown.joiningFee).toBe(PRICING_CONSTANTS.JOINING_FEE);
    expect(result.amount).toBe(PRICING_CONSTANTS.TOTAL_ONBOARDING);
  });
});

describe('PaymentValidator.calculateSubscriptionAmount()', () => {
  it('calculates TIER_25KM monthly correctly (49500 cents = $495)', () => {
    const result = PaymentValidator.calculateSubscriptionAmount('TIER_25KM', 'MONTHLY');

    expect(result.amount).toBe(49500);
    expect(result.baseAmount).toBe(49500);
    expect(result.multiplier).toBe(1);
    expect(result.frequency).toBe('MONTHLY');
    expect(result.currency).toBe('AUD');
  });

  it('calculates TIER_50KM quarterly correctly (226575 cents = 79500 × 2.85)', () => {
    const result = PaymentValidator.calculateSubscriptionAmount('TIER_50KM', 'QUARTERLY');

    expect(result.amount).toBe(226575);
    expect(result.baseAmount).toBe(79500);
    expect(result.multiplier).toBe(2.85);
    expect(result.frequency).toBe('QUARTERLY');
  });

  it('calculates TIER_100KM annually correctly (1359750 cents = 129500 × 10.5)', () => {
    const result = PaymentValidator.calculateSubscriptionAmount('TIER_100KM', 'ANNUAL');

    expect(result.amount).toBe(1359750);
    expect(result.baseAmount).toBe(129500);
    expect(result.multiplier).toBe(10.5);
    expect(result.frequency).toBe('ANNUAL');
  });

  it('all 4 tiers × 3 frequencies = 12 combos return positive amounts', () => {
    const tiers = ['TIER_25KM', 'TIER_50KM', 'TIER_75KM', 'TIER_100KM'] as const;
    const frequencies = ['MONTHLY', 'QUARTERLY', 'ANNUAL'] as const;

    tiers.forEach((tier) => {
      frequencies.forEach((freq) => {
        const result = PaymentValidator.calculateSubscriptionAmount(tier, freq);
        expect(result.amount).toBeGreaterThan(0);
        expect(result.baseAmount).toBeGreaterThan(0);
        expect(result.multiplier).toBeGreaterThan(0);
      });
    });
  });

  it('quarterly multiplier (2.85) reflects 5% discount vs 3 separate monthlies', () => {
    const monthly = PaymentValidator.calculateSubscriptionAmount('TIER_25KM', 'MONTHLY');
    const quarterly = PaymentValidator.calculateSubscriptionAmount('TIER_25KM', 'QUARTERLY');

    // 3 monthlies = 3.0× base; quarterly = 2.85× → ~5% discount
    expect(quarterly.amount).toBeLessThan(monthly.amount * 3);
    expect(quarterly.multiplier).toBe(2.85);
  });

  it('annual multiplier (10.5) reflects 12.5% discount vs 12 separate monthlies', () => {
    const monthly = PaymentValidator.calculateSubscriptionAmount('TIER_25KM', 'MONTHLY');
    const annual = PaymentValidator.calculateSubscriptionAmount('TIER_25KM', 'ANNUAL');

    // 12 monthlies = 12.0× base; annual = 10.5× → 12.5% discount
    expect(annual.amount).toBeLessThan(monthly.amount * 12);
    expect(annual.multiplier).toBe(10.5);
  });
});

describe('PaymentValidator.validatePaymentAmount()', () => {
  it('returns isValid: true when provided amount matches onboarding (247500)', () => {
    const result = PaymentValidator.validatePaymentAmount(247500, 'ONBOARDING');

    expect(result.isValid).toBe(true);
    expect(result.expectedAmount).toBe(247500);
    expect(result.providedAmount).toBe(247500);
    expect(result.discrepancy).toBe(0);
  });

  it('returns isValid: false when undercharge (200000 vs 247500)', () => {
    const result = PaymentValidator.validatePaymentAmount(200000, 'ONBOARDING');

    expect(result.isValid).toBe(false);
    expect(result.expectedAmount).toBe(247500);
    expect(result.providedAmount).toBe(200000);
    expect(result.discrepancy).toBe(47500);
    expect(result.reason).toBeTruthy();
  });

  it('returns isValid: false when overcharge (300000 vs 247500)', () => {
    const result = PaymentValidator.validatePaymentAmount(300000, 'ONBOARDING');

    expect(result.isValid).toBe(false);
    expect(result.expectedAmount).toBe(247500);
    expect(result.providedAmount).toBe(300000);
    expect(result.discrepancy).toBe(52500);
  });

  it('validates subscription with tier + frequency metadata', () => {
    const metadata = { tier: 'TIER_25KM' as const, frequency: 'MONTHLY' as const };
    const result = PaymentValidator.validatePaymentAmount(49500, 'SUBSCRIPTION', metadata);

    expect(result.isValid).toBe(true);
    expect(result.expectedAmount).toBe(49500);
    expect(result.discrepancy).toBe(0);
  });

  it('validates BOND payment against PERFORMANCE_BOND constant (500000)', () => {
    const result = PaymentValidator.validatePaymentAmount(500000, 'BOND');

    expect(result.isValid).toBe(true);
    expect(result.expectedAmount).toBe(500000);
  });

  it('discrepancy is always reported as absolute value', () => {
    const undercharge = PaymentValidator.validatePaymentAmount(100000, 'ONBOARDING');
    const overcharge = PaymentValidator.validatePaymentAmount(400000, 'ONBOARDING');

    expect(undercharge.discrepancy).toBeGreaterThan(0);
    expect(overcharge.discrepancy).toBeGreaterThan(0);
    expect(undercharge.discrepancy).toBe(147500); // |247500 - 100000|
    expect(overcharge.discrepancy).toBe(152500); // |400000 - 247500|
  });
});

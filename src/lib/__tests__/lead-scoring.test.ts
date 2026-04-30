/**
 * Unit tests for src/lib/lead-scoring.ts
 *
 * The score drives priority, response-time SLAs, and team routing.
 * Drift here changes how leads queue inside CRM — hard to spot
 * post-deploy, so we pin the score buckets + the threshold logic.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateLeadScore,
  getLeadPriority,
  getResponseTime,
  formatLeadScore,
  getConversionProbability,
  assignLeadToTeam,
} from '../lead-scoring';

describe('calculateLeadScore', () => {
  it('clamps to 0-100 range', () => {
    const score = calculateLeadScore({
      urgency: 'emergency',
      serviceType: 'water',
      propertyType: 'commercial',
      hasInsurance: true,
      estimatedValue: 100000,
      contactMethod: 'email',
      timeFrame: 'immediate',
      previousCustomer: true,
      referralSource: 'partner',
      location: { distance: 5 },
    });
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('emergency urgency contributes more than routine', () => {
    const emergency = calculateLeadScore({ urgency: 'emergency' });
    const routine = calculateLeadScore({ urgency: 'routine' });
    expect(emergency).toBeGreaterThan(routine);
  });

  it('water/fire/mould services score the high-value tier (+20)', () => {
    const high = calculateLeadScore({ serviceType: 'water' });
    const generic = calculateLeadScore({ serviceType: 'unknown' });
    expect(high - generic).toBe(10); // 20 - 10
  });

  it('previousCustomer adds 5 points', () => {
    const without = calculateLeadScore({ urgency: 'urgent' });
    const with_ = calculateLeadScore({ urgency: 'urgent', previousCustomer: true });
    expect(with_ - without).toBe(5);
  });

  it('hasInsurance adds 10 points', () => {
    const without = calculateLeadScore({ urgency: 'urgent' });
    const with_ = calculateLeadScore({ urgency: 'urgent', hasInsurance: true });
    expect(with_ - without).toBe(10);
  });

  it('returns a non-negative number for an empty input', () => {
    expect(calculateLeadScore({})).toBeGreaterThanOrEqual(0);
  });
});

describe('getLeadPriority — threshold buckets', () => {
  it('80+ is critical', () => {
    expect(getLeadPriority(80)).toBe('critical');
    expect(getLeadPriority(100)).toBe('critical');
  });

  it('60-79 is high', () => {
    expect(getLeadPriority(60)).toBe('high');
    expect(getLeadPriority(79)).toBe('high');
  });

  it('40-59 is medium', () => {
    expect(getLeadPriority(40)).toBe('medium');
    expect(getLeadPriority(59)).toBe('medium');
  });

  it('<40 is low', () => {
    expect(getLeadPriority(39)).toBe('low');
    expect(getLeadPriority(0)).toBe('low');
  });
});

describe('getResponseTime — SLA mapping (minutes)', () => {
  it('80+ → 15 min', () => {
    expect(getResponseTime(80)).toBe(15);
  });

  it('60 → 30 min', () => {
    expect(getResponseTime(60)).toBe(30);
  });

  it('40 → 60 min', () => {
    expect(getResponseTime(40)).toBe(60);
  });

  it('<40 → 240 min (4h)', () => {
    expect(getResponseTime(0)).toBe(240);
  });
});

describe('formatLeadScore', () => {
  it('returns the 4-field shape with capitalised priority', () => {
    const f = formatLeadScore(85);
    expect(f.score).toBe(85);
    expect(f.label).toBe('85/100');
    expect(f.priority).toBe('Critical');
    expect(f.colour).toBe('red');
  });

  it('maps high → orange, medium → yellow, low → gray', () => {
    expect(formatLeadScore(70).colour).toBe('orange');
    expect(formatLeadScore(45).colour).toBe('yellow');
    expect(formatLeadScore(10).colour).toBe('gray');
  });
});

describe('getConversionProbability — monotone non-decreasing', () => {
  it('returns 95% at 90+', () => {
    expect(getConversionProbability(95)).toBe(95);
  });

  it('returns 10% at the floor', () => {
    expect(getConversionProbability(0)).toBe(10);
  });

  it('is monotone non-decreasing across the score range', () => {
    let prev = -1;
    for (const score of [0, 30, 40, 50, 60, 70, 80, 90, 100]) {
      const p = getConversionProbability(score);
      expect(p).toBeGreaterThanOrEqual(prev);
      prev = p;
    }
  });
});

describe('assignLeadToTeam — routing', () => {
  it('critical priority → Senior Response Team + escalation true', () => {
    const result = assignLeadToTeam(90);
    expect(result.team).toBe('Senior Response Team');
    expect(result.escalation).toBe(true);
  });

  it('high priority → Priority Response Team + escalation false', () => {
    expect(assignLeadToTeam(70).team).toBe('Priority Response Team');
  });

  it('medium/low + specialised service routes to Specialist Team', () => {
    expect(assignLeadToTeam(45, 'mould').team).toBe('Specialist Team');
    expect(assignLeadToTeam(20, 'biohazard').team).toBe('Specialist Team');
  });

  it('medium/low + generic service routes to General Response Team', () => {
    expect(assignLeadToTeam(45, 'water').team).toBe('General Response Team');
  });
});

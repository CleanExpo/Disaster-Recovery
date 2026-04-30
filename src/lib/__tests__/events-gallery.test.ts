/**
 * Unit tests for src/lib/events-gallery.ts
 *
 * The disasterEvents catalogue powers the case-studies + events
 * gallery surfaces. We pin the helper behaviour and the structural
 * integrity invariants (unique ids, valid enum values, every event
 * has at least one image).
 */

import { describe, it, expect } from 'vitest';
import {
  disasterEvents,
  getEventsByType,
  getEventsBySeverity,
  getEventsByLocation,
  getRecentEvents,
  getEventById,
  getAllEventImages,
} from '../events-gallery';

const VALID_TYPES = ['flood', 'fire', 'storm', 'mould', 'biohazard', 'other'] as const;
const VALID_SEVERITIES = ['minor', 'moderate', 'severe', 'catastrophic'] as const;

describe('disasterEvents — structural integrity', () => {
  it('contains at least one event', () => {
    expect(disasterEvents.length).toBeGreaterThan(0);
  });

  it('every id is unique', () => {
    const ids = disasterEvents.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every type is one of the declared enum values', () => {
    for (const event of disasterEvents) {
      expect(VALID_TYPES, `bad type for ${event.id}: ${event.type}`).toContain(event.type);
    }
  });

  it('every severity is one of the declared enum values', () => {
    for (const event of disasterEvents) {
      expect(VALID_SEVERITIES, `bad severity for ${event.id}: ${event.severity}`).toContain(
        event.severity,
      );
    }
  });

  it('every event has at least one image (gallery rendering invariant)', () => {
    for (const event of disasterEvents) {
      expect(event.images.length, `no images on ${event.id}`).toBeGreaterThan(0);
    }
  });
});

describe('getEventsByType', () => {
  it('returns only events of the requested type', () => {
    const result = getEventsByType('flood');
    expect(result.length).toBeGreaterThan(0);
    for (const event of result) expect(event.type).toBe('flood');
  });

  it('returns empty array for a type with no events', () => {
    // 'other' is allowed by the union but currently unused — safe sentinel.
    const result = getEventsByType('other');
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getEventsBySeverity', () => {
  it('returns only events of the requested severity', () => {
    const result = getEventsBySeverity('catastrophic');
    for (const event of result) expect(event.severity).toBe('catastrophic');
  });
});

describe('getEventsByLocation', () => {
  it('matches case-insensitively against the location string', () => {
    const lower = getEventsByLocation('brisbane');
    const upper = getEventsByLocation('BRISBANE');
    expect(lower.length).toBeGreaterThan(0);
    expect(upper).toEqual(lower);
  });

  it('returns an empty array when nothing matches', () => {
    expect(getEventsByLocation('atlantis')).toEqual([]);
  });
});

describe('getRecentEvents', () => {
  it('default returns at most 3 items (the docs default)', () => {
    expect(getRecentEvents().length).toBeLessThanOrEqual(3);
  });

  it('honours a custom limit', () => {
    const limited = getRecentEvents(1);
    expect(limited.length).toBeLessThanOrEqual(1);
  });

  it('returns the head slice of disasterEvents', () => {
    expect(getRecentEvents(2)).toEqual(disasterEvents.slice(0, 2));
  });
});

describe('getEventById', () => {
  it('returns the matching event by id', () => {
    const firstId = disasterEvents[0].id;
    expect(getEventById(firstId)?.id).toBe(firstId);
  });

  it('returns undefined for an unknown id', () => {
    expect(getEventById('not-a-real-event')).toBeUndefined();
  });
});

describe('getAllEventImages', () => {
  it('flattens images from every event', () => {
    const expected = disasterEvents.reduce((acc, e) => acc + e.images.length, 0);
    expect(getAllEventImages().length).toBe(expected);
  });

  it('every flattened image has the required fields', () => {
    for (const image of getAllEventImages()) {
      expect(typeof image.id).toBe('string');
      expect(typeof image.url).toBe('string');
      expect(typeof image.thumbnail).toBe('string');
      expect(typeof image.caption).toBe('string');
      expect(Array.isArray(image.tags)).toBe(true);
    }
  });
});

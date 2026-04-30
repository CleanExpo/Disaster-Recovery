/**
 * Unit tests for src/lib/equipment-catalog.ts
 *
 * The catalog feeds the /equipment hub + per-category pages. We pin
 * the helper behaviour (filter / find / search / featured) and the
 * structural integrity of the catalog (unique ids, every item maps
 * to a known category, valid availability enum).
 */

import { describe, it, expect } from 'vitest';
import {
  equipmentCatalog,
  equipmentCategories,
  getEquipmentByCategory,
  getEquipmentById,
  searchEquipment,
  getFeaturedEquipment,
} from '../equipment-catalog';

describe('equipmentCatalog — structural integrity', () => {
  it('contains at least one entry', () => {
    expect(equipmentCatalog.length).toBeGreaterThan(0);
  });

  it('every id is unique', () => {
    const ids = equipmentCatalog.map((item) => item.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every category is one of the declared equipmentCategories names', () => {
    const declared = new Set(equipmentCategories.map((c) => c.name));
    for (const item of equipmentCatalog) {
      expect(declared.has(item.category), `unknown category: ${item.category}`).toBe(true);
    }
  });

  it('every availability is one of the declared enum values', () => {
    const allowed = new Set(['available', 'limited', 'on-request']);
    for (const item of equipmentCatalog) {
      expect(allowed.has(item.availability), `bad availability: ${item.availability}`).toBe(true);
    }
  });
});

describe('getEquipmentByCategory', () => {
  it('returns every item whose category matches', () => {
    const result = getEquipmentByCategory('Air Scrubbers');
    expect(result.length).toBeGreaterThan(0);
    for (const item of result) {
      expect(item.category).toBe('Air Scrubbers');
    }
  });

  it('returns an empty array for an unknown category', () => {
    expect(getEquipmentByCategory('Wormholes')).toEqual([]);
  });
});

describe('getEquipmentById', () => {
  it('returns the matching item by id', () => {
    const firstId = equipmentCatalog[0].id;
    expect(getEquipmentById(firstId)?.id).toBe(firstId);
  });

  it('returns undefined for an unknown id', () => {
    expect(getEquipmentById('definitely-not-a-real-id')).toBeUndefined();
  });
});

describe('searchEquipment', () => {
  it('is case-insensitive', () => {
    const lower = searchEquipment('phoenix');
    const upper = searchEquipment('PHOENIX');
    expect(lower.length).toBeGreaterThan(0);
    expect(upper).toEqual(lower);
  });

  it('returns an empty array when nothing matches', () => {
    expect(searchEquipment('zzz-no-match-zzz')).toEqual([]);
  });

  it('matches the application array (e.g. "mould remediation")', () => {
    const result = searchEquipment('mould');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('getFeaturedEquipment', () => {
  it('returns at most 6 items', () => {
    expect(getFeaturedEquipment().length).toBeLessThanOrEqual(6);
  });

  it('returns the first 6 items of the catalog', () => {
    const featured = getFeaturedEquipment();
    expect(featured).toEqual(equipmentCatalog.slice(0, 6));
  });
});

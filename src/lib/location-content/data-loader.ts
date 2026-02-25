import { LocationDataSchema, type LocationData } from '../../../data/locations/_schema';
import { getStateDefaults } from '../../../data/locations/_state-defaults';

// Build-time cache — populated once during static generation
const cache = new Map<string, LocationData>();

export function loadLocationData(slug: string): LocationData | null {
  if (cache.has(slug)) return cache.get(slug)!;

  try {
    // Dynamic require at build time — JSON files are bundled by Next.js
    const raw = require(`../../../data/locations/${slug}.json`);
    const parsed = LocationDataSchema.parse(raw);
    cache.set(slug, parsed);
    return parsed;
  } catch {
    return null;
  }
}

export function loadLocationDataWithFallback(
  slug: string,
  city: string,
  state: string,
): LocationData | null {
  const data = loadLocationData(slug);
  if (data) return data;

  // Fall back to state defaults — produces a minimal LocationData
  const defaults = getStateDefaults(state);
  if (!defaults) return null;

  // Phase 1 always has JSON files — implement full fallback construction in Phase 2
  return null;
}

export function hasRichData(slug: string): boolean {
  return loadLocationData(slug) !== null;
}

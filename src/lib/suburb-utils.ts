// Suburb slug utilities for URL generation and resolution
import { sydneySuburbs } from '../../data/suburbs/sydney';
import { melbourneSuburbs } from '../../data/suburbs/melbourne';
import { brisbaneSuburbs } from '../../data/suburbs/brisbane';
import type { SuburbData } from '../../data/suburbs/sydney';

// Convert suburb name to URL slug
export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// City-to-state mapping
export const cityStateMap: Record<string, string> = {
  sydney: 'NSW',
  melbourne: 'VIC',
  brisbane: 'QLD',
};

// Build suburb lookup maps: { slug → SuburbData }
const sydneyMap = new Map<string, SuburbData>();
sydneySuburbs.forEach(s => sydneyMap.set(toSlug(s.name), s));

const melbourneMap = new Map<string, SuburbData>();
melbourneSuburbs.forEach(s => melbourneMap.set(toSlug(s.name), s));

const brisbaneMap = new Map<string, SuburbData>();
brisbaneSuburbs.forEach(s => brisbaneMap.set(toSlug(s.name), s));

// All suburb maps by parent city slug
export const suburbsByCity: Record<string, Map<string, SuburbData>> = {
  sydney: sydneyMap,
  melbourne: melbourneMap,
  brisbane: brisbaneMap,
};

// Get suburb data by city slug + suburb slug
export function getSuburb(citySlug: string, suburbSlug: string): SuburbData | undefined {
  return suburbsByCity[citySlug]?.get(suburbSlug);
}

// Get all suburb slugs for a city
export function getSuburbSlugs(citySlug: string): string[] {
  const map = suburbsByCity[citySlug];
  return map ? Array.from(map.keys()) : [];
}

// Supported cities for suburb expansion
export const suburbCities = ['sydney', 'melbourne', 'brisbane'] as const;

// All valid services (shared with city-service page)
export const validServices = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'storm-damage-repairs',
  'mould-remediation',
  'flood-recovery',
  'emergency-restoration',
] as const;

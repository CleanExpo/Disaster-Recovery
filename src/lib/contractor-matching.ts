/**
 * Contractor Job Matching Algorithm
 *
 * Implements radius-tier matching, IICRC cert filtering, round-robin rotation,
 * and the fallback cascade defined in the business rules.
 */

import type { PrismaClient } from '@prisma/client';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JobLocation {
  lat: number;
  lng: number;
}

export type MatchPool =
  | 'primary_qualified'
  | 'primary_unqualified'
  | 'fallback_100'
  | 'fallback_50'
  | 'fallback_125';

export interface CandidateGroup {
  pool: MatchPool;
  contractors: MatchCandidate[];
}

export interface MatchCandidate {
  contractorId: string;
  distanceKm: number;
  isQualified: boolean;
  lastJobOfferedAt: Date | null;
  rotationIndex: number;
}

export interface ContractorMatch {
  contractorId: string;
  distanceKm: number;
  pool: MatchPool;
  requiresLiabilityAck: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Timeout before an offer expires and the next contractor is tried */
export const OFFER_TIMEOUT_MINUTES = 30;

/** Job type → required IICRC certification codes */
const CERT_MAP: Record<string, string[]> = {
  // Water category
  'Water damage': ['S500'],
  'Storm': ['S500'],
  'Sewage': ['S500'],
  'Rising water': ['S500'],
  'Rising damp': ['S500'],
  'Floods': ['S500'],
  // Fire category
  'Fire': ['S700'],
  'Smoke': ['S700'],
  'Odour': ['S700'],
  'Building & Content Cleaning': ['S700'],
  // Mould
  'Mould': ['S520'],
  // Structural drying
  'Structural Drying': ['S500', 'WRT', 'ASD', 'CDS'],
  'Specialised Drying': ['S500', 'WRT', 'ASD', 'CDS'],
  // Biohazard
  'Biohazard': ['TCST', 'OCT', 'HST', 'CPT', 'FSRT'],
  'Hazardous': ['TCST', 'OCT', 'HST', 'CPT', 'FSRT'],
};

// ─── Core helpers ─────────────────────────────────────────────────────────────

/**
 * Haversine formula — returns straight-line distance in kilometres between
 * two WGS-84 coordinates.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Returns the maximum job distance (km) that a radius tier covers.
 *
 * Tier thresholds add a small buffer:
 *   25km  → 28 km
 *   50km  → 53 km
 *   100km → 100 km
 *   rural → contractor's own maxKmRadius
 */
export function getRadiusCoverageKm(
  tier: string,
  maxKmRadius?: number | null,
): number {
  switch (tier) {
    case '25km':
      return 28;
    case '50km':
      return 53;
    case '100km':
      return 100;
    case 'rural':
      return maxKmRadius ?? 200; // fallback if not set
    default:
      return 0;
  }
}

/**
 * Returns true if the contractor's purchased radius tier covers the given
 * job distance.
 */
export function contractorCoversDistance(
  contractor: {
    serviceRadiusTier: string | null;
    maxKmRadius: number | null;
  },
  distanceKm: number,
): boolean {
  if (!contractor.serviceRadiusTier) return false;
  return distanceKm <= getRadiusCoverageKm(contractor.serviceRadiusTier, contractor.maxKmRadius);
}

/**
 * Returns the required certification codes for a given job type.
 * Case-insensitive lookup — returns empty array when unknown.
 */
export function getRequiredCertifications(jobType: string): string[] {
  // Exact match first
  if (CERT_MAP[jobType]) return CERT_MAP[jobType];

  // Case-insensitive match
  const lower = jobType.toLowerCase();
  for (const [key, certs] of Object.entries(CERT_MAP)) {
    if (key.toLowerCase() === lower) return certs;
  }

  return [];
}

/**
 * Returns true if the contractor holds all of the required certifications.
 */
export function contractorIsQualified(
  contractorCerts: string[],
  requiredCerts: string[],
): boolean {
  if (requiredCerts.length === 0) return true;
  const held = new Set(contractorCerts.map(c => c.toUpperCase()));
  return requiredCerts.every(req => held.has(req.toUpperCase()));
}

// ─── Candidate list builder ───────────────────────────────────────────────────

type ContractorRow = {
  id: string;
  baseLatitude: number | null;
  baseLongitude: number | null;
  serviceRadiusTier: string | null;
  maxKmRadius: number | null;
  iicrcCertifications: string[];
  lastJobOfferedAt: Date | null;
  rotationIndex: number;
  status: string;
};

/**
 * Builds an ordered list of candidate groups for a job.
 *
 * Groups (in evaluation order):
 *  1. primary_qualified   — within radius, has required certs
 *  2. primary_unqualified — within radius, missing certs
 *  3. fallback_100        — 100km-tier contractors where job is outside their radius
 *  4. fallback_50         — 50km-tier contractors outside their radius
 *  5. fallback_125        — 25km-tier OR any contractor within 125km
 *
 * Within each group contractors are sorted by round-robin (lastJobOfferedAt ASC,
 * rotationIndex ASC).
 */
export async function buildCandidateList(
  jobLocation: JobLocation,
  requiredCerts: string[],
  prisma: PrismaClient,
): Promise<CandidateGroup[]> {
  const contractors = await prisma.contractor.findMany({
    where: {
      status: 'APPROVED',
      baseLatitude: { not: null },
      baseLongitude: { not: null },
    },
    select: {
      id: true,
      baseLatitude: true,
      baseLongitude: true,
      serviceRadiusTier: true,
      maxKmRadius: true,
      iicrcCertifications: true,
      lastJobOfferedAt: true,
      rotationIndex: true,
      status: true,
    },
  }) as ContractorRow[];

  const primaryQualified: MatchCandidate[] = [];
  const primaryUnqualified: MatchCandidate[] = [];
  const fallback100: MatchCandidate[] = [];
  const fallback50: MatchCandidate[] = [];
  const fallback125: MatchCandidate[] = [];

  for (const c of contractors) {
    if (!c.baseLatitude || !c.baseLongitude) continue;

    const distanceKm = calculateDistanceKm(
      jobLocation.lat,
      jobLocation.lng,
      c.baseLatitude,
      c.baseLongitude,
    );

    const inPrimary = contractorCoversDistance(c, distanceKm);
    const qualified = contractorIsQualified(c.iicrcCertifications, requiredCerts);

    const candidate: MatchCandidate = {
      contractorId: c.id,
      distanceKm,
      isQualified: qualified,
      lastJobOfferedAt: c.lastJobOfferedAt,
      rotationIndex: c.rotationIndex,
    };

    if (inPrimary) {
      if (qualified) {
        primaryQualified.push(candidate);
      } else {
        primaryUnqualified.push(candidate);
      }
    } else {
      // Outside primary radius — determine fallback bucket
      if (c.serviceRadiusTier === '100km') {
        fallback100.push(candidate);
      } else if (c.serviceRadiusTier === '50km') {
        fallback50.push(candidate);
      } else if (c.serviceRadiusTier === '25km' || distanceKm <= 125) {
        fallback125.push(candidate);
      }
      // Beyond 125km → not included
    }
  }

  const sortRoundRobin = (a: MatchCandidate, b: MatchCandidate): number => {
    // Null lastJobOfferedAt goes first (never been offered a job)
    if (!a.lastJobOfferedAt && !b.lastJobOfferedAt) return a.rotationIndex - b.rotationIndex;
    if (!a.lastJobOfferedAt) return -1;
    if (!b.lastJobOfferedAt) return 1;
    const timeDiff = a.lastJobOfferedAt.getTime() - b.lastJobOfferedAt.getTime();
    if (timeDiff !== 0) return timeDiff;
    return a.rotationIndex - b.rotationIndex;
  };

  return [
    { pool: 'primary_qualified', contractors: primaryQualified.sort(sortRoundRobin) },
    { pool: 'primary_unqualified', contractors: primaryUnqualified.sort(sortRoundRobin) },
    { pool: 'fallback_100', contractors: fallback100.sort(sortRoundRobin) },
    { pool: 'fallback_50', contractors: fallback50.sort(sortRoundRobin) },
    { pool: 'fallback_125', contractors: fallback125.sort(sortRoundRobin) },
  ];
}

// ─── Main matching function ───────────────────────────────────────────────────

/**
 * Finds the next contractor to offer a job to.
 *
 * Skips contractors who already have a pending/accepted offer for this job,
 * or who have declined/had their offer expire.
 *
 * Returns null when no contractor is available (→ notify client).
 */
export async function findNextContractor(
  jobId: string,
  jobLocation: JobLocation,
  jobType: string,
  prisma: PrismaClient,
): Promise<ContractorMatch | null> {
  const requiredCerts = getRequiredCertifications(jobType);

  // Fetch existing offers for this job so we skip already-contacted contractors
  const existingOffers = await prisma.jobOffer.findMany({
    where: { jobId },
    select: { contractorId: true, status: true },
  });

  const alreadyContacted = new Set(existingOffers.map(o => o.contractorId));

  const candidateGroups = await buildCandidateList(jobLocation, requiredCerts, prisma);

  for (const group of candidateGroups) {
    for (const candidate of group.contractors) {
      if (alreadyContacted.has(candidate.contractorId)) continue;

      // Update round-robin tracking for the selected contractor
      await prisma.contractor.update({
        where: { id: candidate.contractorId },
        data: {
          lastJobOfferedAt: new Date(),
          rotationIndex: { increment: 1 },
        },
      });

      return {
        contractorId: candidate.contractorId,
        distanceKm: candidate.distanceKm,
        pool: group.pool,
        requiresLiabilityAck: !candidate.isQualified,
      };
    }
  }

  return null; // No contractors available — notify client
}

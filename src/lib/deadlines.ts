/**
 * deadlines.ts — Single source of truth for disaster assistance program deadlines.
 * DR-744 / BUILD-PLAN-48-A.
 *
 * Add a new entry when a program is announced. Update closeDate when extended.
 * All dates are in AEST (UTC+10). "Closed" state activates at 00:00 AEST on closeDate.
 */

export type ProgramKey =
  | 'qld-floods-2026-extended-esha'
  | 'qld-floods-2026-personal-hardship'
  | 'qld-floods-2026-structural-assistance'
  | 'narelle-wa-emergency-hardship'
  | 'alfred-fnq-qld-assistance';

export type DeadlineState = 'active' | 'closing-soon' | 'closed' | 'extended';

export interface ProgramDeadline {
  key: ProgramKey;
  name: string;
  openDate: string; // ISO date YYYY-MM-DD
  closeDate: string; // ISO date YYYY-MM-DD (exclusive — state becomes 'closed' at 00:00 AEST this day)
  extendedCloseDate?: string;
  lgaList: string[];
  sourceUrl: string;
  lastVerifiedAt: string; // ISO date YYYY-MM-DD
  closedCopy?: string; // Override copy for the closed state
  successorProgramKey?: ProgramKey;
}

export const PROGRAM_DEADLINES: Record<ProgramKey, ProgramDeadline> = {
  'qld-floods-2026-extended-esha': {
    key: 'qld-floods-2026-extended-esha',
    name: 'Extended ESHA (Exceptional Circumstances) — Queensland Floods 2026',
    openDate: '2026-03-15',
    closeDate: '2026-04-27',
    lgaList: ['Bundaberg', 'North Burnett', 'South Burnett', 'Fraser Coast'],
    sourceUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
    lastVerifiedAt: '2026-04-25',
    closedCopy:
      'Extended ESHA has closed. Contact us for referral to ongoing recovery support services.',
  },
  'qld-floods-2026-personal-hardship': {
    key: 'qld-floods-2026-personal-hardship',
    name: 'Personal Hardship Assistance — Queensland Floods 2026',
    openDate: '2026-03-15',
    closeDate: '2026-04-27',
    lgaList: ['Bundaberg', 'North Burnett', 'South Burnett', 'Fraser Coast'],
    sourceUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
    lastVerifiedAt: '2026-04-25',
    closedCopy:
      'Personal Hardship Assistance has closed. Contact us for referral to other support pathways.',
  },
  'qld-floods-2026-structural-assistance': {
    key: 'qld-floods-2026-structural-assistance',
    name: 'Structural Assistance Grants — Queensland Floods 2026',
    openDate: '2026-03-15',
    closeDate: '2026-04-27',
    lgaList: ['Bundaberg', 'North Burnett', 'South Burnett', 'Fraser Coast'],
    sourceUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
    lastVerifiedAt: '2026-04-25',
    closedCopy:
      'Structural Assistance Grants have closed. Contact us for referral to other repair support services.',
  },
  'narelle-wa-emergency-hardship': {
    key: 'narelle-wa-emergency-hardship',
    name: 'WA Emergency Hardship Assistance — Cyclone Narelle 2026',
    openDate: '2026-04-10',
    closeDate: '2026-04-27',
    lgaList: ['Exmouth', 'Carnarvon', 'Shark Bay', 'Ashburton', 'Upper Gascoyne', 'Yalgoo'],
    sourceUrl: 'https://www.communities.wa.gov.au/disaster-relief',
    lastVerifiedAt: '2026-04-25',
    closedCopy: 'WA Emergency Hardship Assistance has closed. Contact us for alternative pathways.',
  },
  'alfred-fnq-qld-assistance': {
    key: 'alfred-fnq-qld-assistance',
    name: 'QLD Government Assistance — Ex-TC Alfred FNQ',
    openDate: '2026-03-01',
    closeDate: '2026-04-27',
    lgaList: ['Cairns', 'Tablelands', 'Mareeba', 'Cook', 'Douglas'],
    sourceUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
    lastVerifiedAt: '2026-04-25',
    closedCopy:
      'QLD government assistance programs for Alfred-affected LGAs have closed. Insurance claims have no deadline — contact us for claim support.',
  },
};

/**
 * Compute the deadline state for a program relative to a given date.
 * @param programKey  Key from PROGRAM_DEADLINES
 * @param now         Date to evaluate against (defaults to new Date())
 * @returns           DeadlineState + human-readable date string
 */
export function getDeadlineState(
  programKey: ProgramKey,
  now: Date = new Date(),
): {
  state: DeadlineState;
  program: ProgramDeadline;
  daysRemaining: number;
  closeDateLabel: string;
} {
  const program = PROGRAM_DEADLINES[programKey];

  // closeDate is the last day applications are accepted (inclusive).
  // State becomes 'closed' at 00:00 AEST the day after closeDate.
  // Parse with explicit AEST offset (+10:00) — Brisbane does not observe DST.
  // ACL s18/s29(1)(g) exposure if this drifts: live fix per DR-794 / GAP-121.
  const activeCloseDate = program.extendedCloseDate ?? program.closeDate;
  const closeDayEnd = new Date(`${activeCloseDate}T23:59:59.999+10:00`);

  const msRemaining = closeDayEnd.getTime() - now.getTime();
  // Floor on partial days so "closes in N days" never overstates the time available.
  // 23h remaining → 0 days (renders "<24 hours" / "today" copy via the closing-soon branch
  // when daysRemaining === 0 but msRemaining > 0).
  const daysRemaining = msRemaining <= 0 ? 0 : Math.max(0, Math.floor(msRemaining / (1000 * 60 * 60 * 24)));

  const closeDateLabel = new Date(`${activeCloseDate}T12:00:00+10:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Australia/Brisbane',
  });

  let state: DeadlineState;
  if (msRemaining <= 0) {
    state = 'closed';
  } else if (program.extendedCloseDate) {
    state = 'extended';
  } else if (daysRemaining <= 7) {
    // includes the final < 24h window — daysRemaining can be 0 here; the band
    // renders "today" copy via DeadlineBand.tsx when daysRemaining === 0.
    state = 'closing-soon';
  } else {
    state = 'active';
  }

  return { state, program, daysRemaining, closeDateLabel };
}

/** Convenience: return a short status string suitable for use in metadata descriptions. */
export function deadlineStatusText(programKey: ProgramKey, now: Date = new Date()): string {
  const { state, closeDateLabel, daysRemaining } = getDeadlineState(programKey, now);
  switch (state) {
    case 'closed':
      return 'This program has closed.';
    case 'extended':
      return `Extended — applications close ${closeDateLabel} AEST.`;
    case 'closing-soon':
      return `Closing soon — ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining. Apply by ${closeDateLabel} AEST.`;
    default:
      return `Applications close ${closeDateLabel} AEST.`;
  }
}

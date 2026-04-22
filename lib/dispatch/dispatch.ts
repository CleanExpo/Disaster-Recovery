/**
 * Dispatcher. Pure function: ClaimIntake + contractor roster -> DispatchDecision.
 *
 * Matching logic:
 *   1. Filter contractors who service the claim's location (postcode > suburb > home-city).
 *   2. Filter to those whose service mix includes the claim's service.
 *   3. Rank by weighted signals (postcode 40, suburb 25, service-mix 15, home-city 10, load 0-10).
 *   4. Return top contractor with rationale and confidence.
 *   5. Escalate to ops-review if 0 matches, to on-call if immediate + 0 matches.
 *
 * Stateless and testable. Callers inject live load via RosterEntry.activeJobs.
 *
 * Ported from DR-Sandbox agents/dispatch.ts @ main (commit 7c2f721 baseline + later changes).
 * Linear: DR-627
 */

import type { ClaimIntake, DispatchDecision, RosterEntry } from "./types";

const IMMEDIATE_SLA_MINS = 60;
const SAME_DAY_SLA_MINS = 240;

function postcodeMatch(entry: RosterEntry, claim: ClaimIntake): boolean {
  return !!claim.propertyPostcode && entry.postcodes.includes(claim.propertyPostcode);
}

function suburbMatch(entry: RosterEntry, claim: ClaimIntake): boolean {
  return !!claim.propertySuburb && (entry.suburbs ?? []).some(
    (s) => s.toLowerCase() === claim.propertySuburb!.toLowerCase()
  );
}

function homeCityMatch(entry: RosterEntry, claim: ClaimIntake): boolean {
  if (!entry.homeCity || !claim.propertySuburb) return false;
  return claim.propertySuburb.toLowerCase().includes(entry.homeCity.toLowerCase());
}

function serviceMatch(entry: RosterEntry, claim: ClaimIntake): boolean {
  return !!claim.service && entry.serviceMix.includes(claim.service);
}

interface Candidate {
  entry: RosterEntry;
  signals: DispatchDecision["matchSignals"];
  confidence: number;
}

function scoreCandidate(entry: RosterEntry, claim: ClaimIntake): Candidate {
  const signals: DispatchDecision["matchSignals"] = [];
  let w = 0;
  if (postcodeMatch(entry, claim)) {
    signals.push({ signal: "postcode-exact", value: claim.propertyPostcode!, weight: 40 });
    w += 40;
  }
  if (suburbMatch(entry, claim)) {
    signals.push({ signal: "suburb-exact", value: claim.propertySuburb!, weight: 25 });
    w += 25;
  }
  if (homeCityMatch(entry, claim)) {
    signals.push({ signal: "home-city", value: entry.homeCity!, weight: 10 });
    w += 10;
  }
  if (serviceMatch(entry, claim)) {
    signals.push({ signal: "service-mix", value: claim.service!, weight: 15 });
    w += 15;
  }
  const load = entry.activeJobs ?? 0;
  const loadScore = Math.max(0, 10 - load);
  signals.push({ signal: "load-balance", value: `${load} active`, weight: loadScore });
  w += loadScore;

  return { entry, signals, confidence: Math.min(1, w / 100) };
}

/**
 * Dispatch a claim to the best-matching contractor.
 * Returns a DispatchDecision with contractorId=null and escalation set when
 * no automatic match is possible (service unknown, no roster coverage, etc.).
 */
export function dispatch(claim: ClaimIntake, roster: RosterEntry[]): DispatchDecision {
  if (!claim.service) {
    return {
      contractorId: null,
      contractorName: null,
      rationale: "service not identified; ops review needed",
      responseSlaMinutes: null,
      matchSignals: [],
      confidence: 0,
      escalation: "ops-review",
    };
  }

  const eligible = roster
    .map((e) => scoreCandidate(e, claim))
    .filter((c) => {
      const geo = c.signals.some(
        (s) => s.signal === "postcode-exact" || s.signal === "suburb-exact" || s.signal === "home-city"
      );
      const svc = c.signals.some((s) => s.signal === "service-mix");
      return geo && svc;
    });

  if (eligible.length === 0) {
    const escalation: DispatchDecision["escalation"] =
      claim.urgency === "immediate" ? "on-call" : "ops-review";
    return {
      contractorId: null,
      contractorName: null,
      rationale: `no roster match on ${claim.service} in ${
        claim.propertyPostcode ?? claim.propertySuburb ?? "unknown location"
      }`,
      responseSlaMinutes: claim.urgency === "immediate" ? IMMEDIATE_SLA_MINS : null,
      matchSignals: [],
      confidence: 0,
      escalation,
    };
  }

  eligible.sort((a, b) => {
    if (b.confidence !== a.confidence) return b.confidence - a.confidence;
    return (a.entry.activeJobs ?? 0) - (b.entry.activeJobs ?? 0);
  });
  const top = eligible[0];

  const responseSlaMinutes =
    claim.urgency === "immediate" ? IMMEDIATE_SLA_MINS :
    claim.urgency === "same-day" ? SAME_DAY_SLA_MINS :
    null;

  const rationaleParts = top.signals
    .filter((s) => s.weight > 0)
    .map((s) => `${s.signal}(${s.value})`);

  return {
    contractorId: top.entry.contractorId,
    contractorName: top.entry.contractorName,
    rationale: `matched ${top.entry.contractorName}: ${rationaleParts.join(" + ") || "no explicit signals"}`,
    responseSlaMinutes,
    matchSignals: top.signals,
    confidence: top.confidence,
    escalation: "none",
  };
}

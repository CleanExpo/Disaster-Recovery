/**
 * Dispatcher unit tests. 10 cases covering:
 *   - happy path (postcode + service match)
 *   - multi-candidate resolution
 *   - load-balancing tie-break
 *   - escalation paths (on-call, ops-review, service-unknown)
 *   - service-mix filtering
 *   - SLA windows (immediate 60 / same-day 240 / scheduled null)
 *   - confidence bounds
 *
 * Ported from DR-Sandbox agents/dispatch.test.ts @ main. 10/10 green.
 */

import { describe, it, expect } from "vitest";
import { dispatch } from "../dispatch";
import type { ClaimIntake, RosterEntry } from "../types";

const BASE_CLAIM: ClaimIntake = {
  conversationId: "conv_1",
  agentId: "agent_sarah",
  capturedAt: "2026-04-20T10:00:00Z",
  service: "water",
  urgency: "immediate",
  callerName: "Jane Doe",
  callerPhone: "+61411222333",
  callerEmail: null,
  propertyAddress: "14 Smith St, South Brisbane QLD 4101",
  propertySuburb: "South Brisbane",
  propertyState: "QLD",
  propertyPostcode: "4101",
  propertyType: "residential",
  insurer: null,
  policyNumber: null,
  summary: "burst pipe",
  callSuccessful: true,
  callDurationSecs: 180,
  fromNumber: "+61411222333",
  toNumber: "+61731111111",
};

const BRISBANE_CO: RosterEntry = {
  contractorId: "nrpg-brisbane-co",
  contractorName: "Brisbane Restoration Co.",
  postcodes: ["4000", "4101", "4102"],
  suburbs: ["Brisbane CBD", "South Brisbane", "West End"],
  homeCity: "Brisbane",
  serviceMix: ["water", "fire", "mould"],
  activeJobs: 2,
};

const GOLD_COAST_CO: RosterEntry = {
  contractorId: "nrpg-gold-coast-co",
  contractorName: "Gold Coast Recovery",
  postcodes: ["4215", "4217"],
  serviceMix: ["water", "storm"],
  homeCity: "Gold Coast",
  activeJobs: 0,
};

describe("dispatch", () => {
  it("matches contractor by postcode + service and returns correct SLA", () => {
    const d = dispatch(BASE_CLAIM, [BRISBANE_CO, GOLD_COAST_CO]);
    expect(d.contractorId).toBe("nrpg-brisbane-co");
    expect(d.contractorName).toBe("Brisbane Restoration Co.");
    expect(d.responseSlaMinutes).toBe(60);
    expect(d.confidence).toBeGreaterThan(0.5);
    expect(d.escalation).toBe("none");
    expect(d.matchSignals.map((s) => s.signal)).toContain("postcode-exact");
    expect(d.matchSignals.map((s) => s.signal)).toContain("service-mix");
  });

  it("prefers higher-confidence match when multiple contractors match", () => {
    const overlap: RosterEntry = {
      ...GOLD_COAST_CO,
      postcodes: ["4101"],
      contractorId: "overlap",
      contractorName: "Overlap",
    };
    const d = dispatch(BASE_CLAIM, [overlap, BRISBANE_CO]);
    expect(d.contractorId).toBe("nrpg-brisbane-co");
  });

  it("breaks ties by fewer active jobs", () => {
    const busy: RosterEntry = { ...BRISBANE_CO, contractorId: "busy", contractorName: "Busy Co.", activeJobs: 8 };
    const quiet: RosterEntry = { ...BRISBANE_CO, contractorId: "quiet", contractorName: "Quiet Co.", activeJobs: 0 };
    const d = dispatch(BASE_CLAIM, [busy, quiet]);
    expect(d.contractorId).toBe("quiet");
  });

  it("escalates to on-call when immediate + no match", () => {
    const d = dispatch(BASE_CLAIM, [GOLD_COAST_CO]);
    expect(d.contractorId).toBeNull();
    expect(d.escalation).toBe("on-call");
    expect(d.responseSlaMinutes).toBe(60);
  });

  it("escalates to ops-review when non-immediate + no match", () => {
    const scheduled: ClaimIntake = { ...BASE_CLAIM, urgency: "scheduled" };
    const d = dispatch(scheduled, [GOLD_COAST_CO]);
    expect(d.contractorId).toBeNull();
    expect(d.escalation).toBe("ops-review");
    expect(d.responseSlaMinutes).toBeNull();
  });

  it("escalates to ops-review when service is unknown", () => {
    const unknown: ClaimIntake = { ...BASE_CLAIM, service: null };
    const d = dispatch(unknown, [BRISBANE_CO]);
    expect(d.contractorId).toBeNull();
    expect(d.escalation).toBe("ops-review");
  });

  it("filters out contractors who don't cover the service even if geo matches", () => {
    const wrongService: RosterEntry = { ...BRISBANE_CO, serviceMix: ["biohazard"] };
    const d = dispatch(BASE_CLAIM, [wrongService]);
    expect(d.contractorId).toBeNull();
    expect(d.escalation).toBe("on-call");
  });

  it("same-day urgency gets 240min SLA", () => {
    const sameDay: ClaimIntake = { ...BASE_CLAIM, urgency: "same-day" };
    const d = dispatch(sameDay, [BRISBANE_CO]);
    expect(d.responseSlaMinutes).toBe(240);
  });

  it("scheduled urgency gets null SLA", () => {
    const sched: ClaimIntake = { ...BASE_CLAIM, urgency: "scheduled" };
    const d = dispatch(sched, [BRISBANE_CO]);
    expect(d.responseSlaMinutes).toBeNull();
  });

  it("confidence is bounded 0..1", () => {
    const d = dispatch(BASE_CLAIM, [BRISBANE_CO]);
    expect(d.confidence).toBeGreaterThanOrEqual(0);
    expect(d.confidence).toBeLessThanOrEqual(1);
  });
});

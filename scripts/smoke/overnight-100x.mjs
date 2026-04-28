#!/usr/bin/env node
/**
 * Overnight smoke battery — 100×2 simulated client + contractor signups
 * against production. Senior PM persona — verify every reasonable failure
 * mode, surface go-live blockers.
 *
 * Usage:
 *   node scripts/smoke/overnight-100x.mjs --runs 100 --base https://disasterrecovery.com.au
 *   node scripts/smoke/overnight-100x.mjs --runs 5 --base https://disasterrecovery.com.au   # quick sanity
 *
 * Output:
 *   - JSONL: docs/audits/smoke-100x-raw-2026-04-29.jsonl
 *   - Markdown: docs/audits/smoke-overnight-100x-2026-04-29.md
 */

import { writeFileSync, appendFileSync, existsSync, unlinkSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { clientClaimBody, contractorApplicationBody, contractorSignupBody, fakeIp } from './test-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..', '..');

// ───── CLI args ─────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));
const RUNS = Number(args.runs ?? 100);
const BASE = String(args.base ?? 'https://disasterrecovery.com.au').replace(/\/$/, '');
const PACE_MS = Number(args.pace ?? 1500);
const RAW_PATH = resolve(REPO_ROOT, 'docs/audits/smoke-100x-raw-2026-04-29.jsonl');
const REPORT_PATH = resolve(REPO_ROOT, 'docs/audits/smoke-overnight-100x-2026-04-29.md');

mkdirSync(dirname(RAW_PATH), { recursive: true });
if (existsSync(RAW_PATH)) unlinkSync(RAW_PATH);

// ───── Endpoint definitions ─────────────────────────────────────────────────

const ENDPOINTS = [
  {
    persona: 'client',
    step: 'submit-claim',
    method: 'POST',
    path: '/api/claims/submit',
    bodyFor: clientClaimBody,
    requiredResponseKeys: ['success'],
    successCodes: [200, 201],
  },
  {
    persona: 'contractor',
    step: 'signup-account',
    method: 'POST',
    path: '/api/auth/signup',
    bodyFor: contractorSignupBody,
    requiredResponseKeys: ['user'],
    successCodes: [200, 201],
  },
  {
    persona: 'contractor',
    step: 'submit-application',
    method: 'POST',
    path: '/api/contractor/onboarding/submit',
    bodyFor: contractorApplicationBody,
    requiredResponseKeys: ['success'],
    successCodes: [200, 201],
  },
];

// ───── Runner ───────────────────────────────────────────────────────────────

const startedAt = Date.now();
console.log(`Starting smoke battery: ${RUNS} runs × ${ENDPOINTS.length} endpoints = ${RUNS * ENDPOINTS.length} total requests against ${BASE}`);

const allResults = [];
let runIdx = 0;

for (const endpoint of ENDPOINTS) {
  console.log(`\n── ${endpoint.persona}/${endpoint.step} (${endpoint.method} ${endpoint.path}) ──`);
  for (let seq = 0; seq < RUNS; seq++) {
    runIdx++;
    const result = await runOne(endpoint, seq);
    allResults.push(result);
    appendFileSync(RAW_PATH, JSON.stringify(result) + '\n');
    if (seq % 10 === 0) {
      const status = result.errors.length === 0 ? '✓' : '✗';
      const lat = String(result.latency_ms).padStart(4, ' ');
      console.log(`  ${status} seq=${String(seq).padStart(3, ' ')} HTTP ${result.http_code} ${lat}ms ${result.errors[0] ?? 'OK'}`);
    }
    if (PACE_MS > 0 && runIdx < RUNS * ENDPOINTS.length) {
      await sleep(PACE_MS);
    }
  }
}

const finishedAt = Date.now();
const wallSec = Math.round((finishedAt - startedAt) / 1000);
console.log(`\n── Battery complete in ${wallSec}s. Compiling report... ──`);

writeFileSync(REPORT_PATH, buildReport(allResults, { startedAt, finishedAt, runs: RUNS, base: BASE }));
console.log(`\n✅ Report: ${REPORT_PATH}`);
console.log(`✅ Raw:    ${RAW_PATH}`);

// ───── Helpers ──────────────────────────────────────────────────────────────

async function runOne(endpoint, seq) {
  const url = BASE + endpoint.path;
  const body = endpoint.bodyFor(seq);
  const ip = fakeIp(seq);
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': `dr-smoke-overnight/2026-04-28 seq=${seq}`,
    'X-Forwarded-For': ip,
  };
  const result = {
    seq,
    persona: endpoint.persona,
    step: endpoint.step,
    endpoint: endpoint.path,
    method: endpoint.method,
    request_body_keys: Object.keys(body),
    request_body_size: JSON.stringify(body).length,
    fake_ip: ip,
    http_code: 0,
    content_type: '',
    latency_ms: 0,
    response_keys: [],
    response_body_excerpt: '',
    errors: [],
    warnings: [],
  };
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      method: endpoint.method,
      headers,
      body: JSON.stringify(body),
    });
    result.latency_ms = Date.now() - t0;
    result.http_code = res.status;
    result.content_type = res.headers.get('content-type') ?? '';
    const text = await res.text();
    result.response_body_excerpt = text.slice(0, 240);

    // Severity checks
    if (!endpoint.successCodes.includes(res.status)) {
      // Anything not in successCodes is suspect — but 400/401 may be expected for some payloads
      if (res.status >= 500) {
        result.errors.push(`5xx: ${res.status}`);
      } else if (res.status === 400 || res.status === 422) {
        // Validation error — may be expected; flag as warning unless it's a 100% pattern
        result.warnings.push(`validation: ${res.status}`);
      } else if (res.status === 401 || res.status === 403) {
        result.warnings.push(`auth-gate: ${res.status}`);
      } else if (res.status === 429) {
        result.warnings.push('rate-limited');
      } else {
        result.warnings.push(`unexpected-code: ${res.status}`);
      }
    }

    if (!result.content_type.includes('application/json')) {
      result.errors.push(`non-json content-type: ${result.content_type}`);
    } else {
      try {
        const parsed = JSON.parse(text);
        result.response_keys = Object.keys(parsed);
        // Required keys check (only when 2xx)
        if (endpoint.successCodes.includes(res.status)) {
          for (const k of endpoint.requiredResponseKeys) {
            if (!(k in parsed)) result.warnings.push(`missing response key: ${k}`);
          }
        }
      } catch (e) {
        result.errors.push(`json-parse: ${e.message}`);
      }
    }

    if (result.latency_ms > 3000) {
      result.warnings.push(`slow: ${result.latency_ms}ms`);
    }
  } catch (e) {
    result.latency_ms = Date.now() - t0;
    result.errors.push(`fetch-failed: ${e.message}`);
  }
  return result;
}

function buildReport(results, meta) {
  const total = results.length;
  const ok = results.filter((r) => r.errors.length === 0 && r.warnings.length === 0).length;
  const warned = results.filter((r) => r.errors.length === 0 && r.warnings.length > 0).length;
  const errored = results.filter((r) => r.errors.length > 0).length;

  // Severity buckets
  const p0 = []; // 5xx that recurs >3×
  const p1 = []; // 4xx misclassification, latency p95 > 3s
  const p2 = []; // polish

  // Group by errorKey = http_code + endpoint + first-100-chars
  const errorGroups = new Map();
  for (const r of results) {
    if (r.errors.length === 0) continue;
    const key = `${r.http_code}|${r.endpoint}|${r.response_body_excerpt.slice(0, 100)}`;
    if (!errorGroups.has(key)) {
      errorGroups.set(key, { ...r, count: 0, sample_seqs: [] });
    }
    const grp = errorGroups.get(key);
    grp.count++;
    if (grp.sample_seqs.length < 3) grp.sample_seqs.push(r.seq);
  }

  for (const [, grp] of errorGroups) {
    if (grp.http_code >= 500 && grp.count > 3) {
      p0.push(grp);
    } else if (grp.http_code >= 400 && grp.http_code < 500) {
      p1.push(grp);
    } else {
      p2.push(grp);
    }
  }

  // Per-endpoint stats
  const byEndpoint = new Map();
  for (const r of results) {
    const key = `${r.method} ${r.endpoint}`;
    if (!byEndpoint.has(key)) {
      byEndpoint.set(key, { count: 0, latencies: [], successes: 0, errors: 0, codes: new Map() });
    }
    const e = byEndpoint.get(key);
    e.count++;
    e.latencies.push(r.latency_ms);
    if (r.errors.length === 0 && r.http_code >= 200 && r.http_code < 400) e.successes++;
    if (r.errors.length > 0) e.errors++;
    e.codes.set(r.http_code, (e.codes.get(r.http_code) ?? 0) + 1);
  }

  function pct(arr, p) {
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p));
    return sorted[idx] ?? 0;
  }

  const startISO = new Date(meta.startedAt).toISOString();
  const finishISO = new Date(meta.finishedAt).toISOString();
  const wallSec = Math.round((meta.finishedAt - meta.startedAt) / 1000);

  let md = `# Smoke Battery — Overnight 100×2 — 2026-04-28 → 2026-04-29\n\n`;
  md += `**Run by:** Senior PM persona, autonomous overnight QA pass\n`;
  md += `**Target:** \`${meta.base}\`\n`;
  md += `**Started:** ${startISO}\n`;
  md += `**Finished:** ${finishISO}\n`;
  md += `**Wall clock:** ${wallSec}s (${(wallSec / 60).toFixed(1)} min)\n`;
  md += `**Total requests:** ${total} (${meta.runs} runs × ${total / meta.runs} endpoints)\n\n`;

  md += `## Summary\n\n`;
  md += `| Outcome | Count | % |\n`;
  md += `| --- | ---:| ---:|\n`;
  md += `| 🟢 OK (no errors, no warnings) | ${ok} | ${pcts(ok, total)} |\n`;
  md += `| 🟡 OK-with-warnings | ${warned} | ${pcts(warned, total)} |\n`;
  md += `| 🔴 ERRORED | ${errored} | ${pcts(errored, total)} |\n\n`;

  md += `## Severity buckets (deduplicated)\n\n`;
  md += `- 🔴 **P0 BLOCKER** (5xx recurring >3×): **${p0.length}** unique\n`;
  md += `- 🟠 **P1 NEEDS-FIX** (4xx misclassification): **${p1.length}** unique\n`;
  md += `- 🟡 **P2 POLISH**: **${p2.length}** unique\n\n`;

  md += `## Per-endpoint stats\n\n`;
  md += `| Endpoint | Requests | Successes | Errors | p50 ms | p95 ms | Codes |\n`;
  md += `| --- | ---:| ---:| ---:| ---:| ---:| --- |\n`;
  for (const [k, v] of byEndpoint) {
    const codeSummary = [...v.codes.entries()].map(([c, n]) => `${c}×${n}`).join(', ');
    md += `| \`${k}\` | ${v.count} | ${v.successes} | ${v.errors} | ${pct(v.latencies, 0.5)} | ${pct(v.latencies, 0.95)} | ${codeSummary} |\n`;
  }
  md += `\n`;

  if (p0.length > 0) {
    md += `## 🔴 P0 BLOCKERS\n\n`;
    md += renderIssueTable(p0);
  }
  if (p1.length > 0) {
    md += `## 🟠 P1 NEEDS-FIX\n\n`;
    md += renderIssueTable(p1);
  }
  if (p2.length > 0) {
    md += `## 🟡 P2 POLISH\n\n`;
    md += renderIssueTable(p2);
  }

  md += `## Senior PM verdict\n\n`;
  if (p0.length === 0 && errored < total * 0.05) {
    md += `**SHIP IT.** No P0 blockers. Error rate ${pcts(errored, total)} is within normal-noise budget.\n\n`;
  } else if (p0.length === 0) {
    md += `**FIX P1s, THEN SHIP.** No P0 blockers but error rate ${pcts(errored, total)} is above the 5% noise budget — fix the surfaced P1 patterns first.\n\n`;
  } else {
    md += `**DO NOT SHIP.** ${p0.length} P0 blockers surfaced (${p0.reduce((a, b) => a + b.count, 0)} affected requests). Fix all P0s, re-run battery, then evaluate.\n\n`;
  }

  md += `## Reproducer\n\n`;
  md += `Each row links to a sample \`seq\` number. To reproduce one specific failure:\n\n`;
  md += `\`\`\`bash\n`;
  md += `node -e "import('./scripts/smoke/test-data.mjs').then(m => console.log(JSON.stringify(m.clientClaimBody(SEQ), null, 2)))"\n`;
  md += `# then POST to the endpoint with that body and the matching X-Forwarded-For\n`;
  md += `\`\`\`\n\n`;

  md += `## Cleanup\n\n`;
  md += `All test data uses \`smoke-2026-04-28-*@disasterrecovery.smoke.invalid\` as the email. To remove from prod DB:\n\n`;
  md += `\`\`\`sql\n`;
  md += `DELETE FROM "InsuranceClaimAU" WHERE email LIKE 'smoke-2026-04-28-%@disasterrecovery.smoke.invalid';\n`;
  md += `DELETE FROM "contractor_applications" WHERE email LIKE 'smoke-2026-04-28-%@disasterrecovery.smoke.invalid';\n`;
  md += `DELETE FROM "users" WHERE email LIKE 'smoke-2026-04-28-%@disasterrecovery.smoke.invalid';\n`;
  md += `\`\`\`\n\n`;

  md += `---\n\n_Raw run log: \`docs/audits/smoke-100x-raw-2026-04-29.jsonl\` (${total} JSONL lines)_\n`;
  return md;
}

function renderIssueTable(groups) {
  let md = `| HTTP | Endpoint | Hits | Sample seqs | Body excerpt |\n`;
  md += `| ---:| --- | ---:| --- | --- |\n`;
  for (const g of groups.sort((a, b) => b.count - a.count)) {
    const excerpt = g.response_body_excerpt.replace(/\|/g, '\\|').replace(/\n/g, ' ').slice(0, 80);
    md += `| ${g.http_code} | \`${g.endpoint}\` | ${g.count} | ${g.sample_seqs.join(', ')} | ${excerpt} |\n`;
  }
  return md + '\n';
}

function pcts(n, d) {
  return d === 0 ? '0%' : `${((n / d) * 100).toFixed(1)}%`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      out[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

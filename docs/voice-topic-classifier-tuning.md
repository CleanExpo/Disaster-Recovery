# Voice Topic Classifier — Tuning Guide

**Ticket:** DR-711 (parent epic DR-706)
**Module:** `src/lib/voice/topic-classifier.ts`, `src/lib/voice/deny-list.ts`
**Status:** NOT LEGAL ADVICE. Defence-in-depth only — the authoritative boundary is the tool surface itself (DR-710). The classifier is a second line of defence that catches off-scope probes the tool layer can't see (e.g. social-engineering of the LLM into paraphrasing internal facts).

---

## What this is

A rolling-window detector that scans every transcript turn from Sarah (the ElevenLabs voice agent) for tokens that signal an off-scope probe. Each hit adds weight to a per-session score. When the score crosses a threshold, the agent is forced to reply with the canonical refusal line and the kill-switch circuit breaker is tripped (DR-715).

Seven categories: `prompt_extraction`, `commission`, `contractor_identity`, `partner_extraction`, `infra_extraction`, `authority_impersonation`, `multi_turn_gradual`.

Three trip rules:

1. Rolling score >= **10** (weights: critical=5, high=3, medium=1).
2. **Two or more** critical hits in a session.
3. **Any single** `infra_extraction` hit (hard rule — secrets exposure is unrecoverable).

---

## Tuning thresholds

Default thresholds err on the side of too-many false positives — better to over-refuse than to leak.

**If you see too many false positives** (legitimate callers being refused):

- Raise the score threshold from 10 to 12 or 15. Edit the constant in `topic-classifier.ts` (search for `score >= 10`).
- Move a noisy category from `medium` to `low` in `SEVERITY_BY_CATEGORY`. `low` weight is 0 — patterns are still logged but don't accumulate.
- Tighten an over-broad pattern. The `commission` category once matched the word "cut" anywhere; it's now `re:\bcut\b` (word-bounded). If you see another over-match, switch the offending string to a `re:` regex with anchors.

**If misses appear** (probes getting through):

- Lower the score threshold to 8.
- Promote a category's severity (medium → high, high → critical).
- Add new trigger phrases. Real attacker transcripts are the best source — review monthly logs (below).

---

## Adding a new trigger category

1. Add the category and its trigger array to `TRIP_CATEGORIES` in `topic-classifier.ts`.
2. Add the category's severity to `SEVERITY_BY_CATEGORY`.
3. Add at least one assertion to `src/lib/voice/__tests__/topic-classifier.test.ts` covering a positive match and a benign-text negative.
4. Run `npx tsx src/lib/voice/__tests__/topic-classifier.test.ts` and verify all assertions pass.
5. Update this doc with a one-line note on what the category catches.

Patterns are matched as case-insensitive substrings. Prefix a string with `re:` to treat it as a regex (the `re:` prefix is stripped before compilation; the regex is compiled with the `i` flag).

---

## Populating the contractor deny-list (safely)

**Never hard-code contractor names in source.** Source files leak via:

- Public GitHub mirrors / forks
- Vercel build logs
- `next/build` static manifests
- AI assistants reading the repo for unrelated tasks

**Use the env var instead:**

1. Pull the canonical list of contractor trading names from the CRM (single source of truth — same place the dispatch tool reads from).
2. JSON-stringify the array: `JSON.stringify(['Trading Name 1', 'Trading Name 2', ...])`.
3. Set `VOICE_DENY_LIST_JSON` in Vercel project env vars (Production scope only — staging uses synthetic test names).
4. Redeploy. `loadDenyListFromEnv()` reads at runtime; no code change required.

If `VOICE_DENY_LIST_JSON` is absent or malformed, `loadDenyListFromEnv()` falls back to `DEFAULT_INTERNAL_DENY_LIST` (intentionally empty).

`SECRET_PREFIX_TOKENS` (Stripe live keys, Slack bot tokens, GitHub PATs etc.) is hard-coded in `deny-list.ts` because those prefixes are universal and not sensitive in themselves.

---

## Monthly classifier log review

Each anomaly trip should be logged to the voice ops channel with: session ID, score, critical_hits, reason, full transcript (redacted). Review once a month:

1. **False positive rate.** What fraction of trips were legitimate callers? Target < 5%. If higher, tune as above.
2. **Miss rate.** Sample 50 random non-tripped sessions. Did any contain a probe the classifier missed? If yes, add the missed phrase to the relevant category.
3. **Category distribution.** Which categories are firing most? If `multi_turn_gradual` dominates, the medium weight may need re-tuning.
4. **New patterns.** Are attackers using new phrasings the current list misses? Add them.

Keep the `deny-list.ts` env-loaded list in sync with the CRM monthly — contractors leaving the panel should be removed promptly to avoid stale blocks.

---

## Canonical refusal

Exported as `CANONICAL_REFUSAL` from `topic-classifier.ts`. Mirror of DR-709's system prompt. If you change it here, change it in the system prompt too — they must match exactly so the agent's voice stays consistent whether the refusal is forced by the classifier or chosen by the model.

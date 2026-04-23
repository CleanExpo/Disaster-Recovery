# Sarah KB — Reviewer Checklist

**Prepared 2026-04-23. NOT LEGAL ADVICE.**

Use this page before approving any PR that touches `src/lib/voice/sarah-kb.ts`. Walk every item. If any answer is "unsure", do not merge — ask.

## The PUBLIC-only rule

`SARAH_KB` is the knowledge base attached to the ElevenLabs voice agent. Everything it contains may be retrieved and read aloud to a caller. The agent has no way to distinguish "PUBLIC" from "sensitive" once an entry is in the KB — the filter happens at review, not at runtime.

Only content classified as **PUBLIC** under the 5-class data taxonomy is allowed:

| Class | In KB? |
|---|---|
| PUBLIC | Yes |
| CUSTOMER_TO_CUSTOMER | No |
| INTERNAL | No |
| CONFIDENTIAL | No |
| SECRET | No |

## Block list — if any of these are true, reject the entry

- [ ] Does the entry contain a contractor's name, business name, ABN, licence number, or trading name? → **BLOCK**
- [ ] Does it include counts per suburb, per state, or network totals? → **BLOCK**
- [ ] Does it disclose commission rates, platform fees, revenue share, or any other aspect of the NRPG fee model? → **BLOCK**
- [ ] Does it mention Equipped Commercial Finance terms, rates, or deal structure? → **BLOCK**
- [ ] Does it reference internal systems, tools, dashboards, databases, CI/CD, infrastructure, or SOPs? → **BLOCK**
- [ ] Does it describe any specific past claim, caller, or customer interaction? → **BLOCK**
- [ ] Does it promise an insurance outcome, approval, timeline, or payout amount? → **BLOCK**
- [ ] Does it contain a specific dollar price or quote for restoration work? → **BLOCK**
- [ ] Does it use the phrase "insurance approved"? → **BLOCK** (use "IICRC-certified" instead)
- [ ] Does it provide legal, tax, insurance, medical, or financial advice? → **BLOCK**

## Allow list — these conditions should all be true

- [ ] The content appears on a live public page under `disasterrecovery.com.au`, or is a marketing asset cleared for external use, or is a verifiable public standard (for example IICRC S500/S520).
- [ ] `source_url` (if set) points to a live public URL on our own site or a recognised standards body.
- [ ] `data_class` is the literal string `'PUBLIC'`. No other value is accepted.
- [ ] Every factual claim in the entry is traceable to the DR-705 substantiation register. If the claim is new, add it to the register first, then cite it here.
- [ ] The language is Australian English (mobile, postcode, suburb, IICRC-certified) and matches the tone of the rest of the KB.
- [ ] The entry is 80-200 words of natural prose. Not a bullet list, not a slab of headings.

## Process

1. Open a PR against `main` that touches `src/lib/voice/sarah-kb.ts`.
2. In the PR description, paste this checklist with each box ticked and a one-line justification per item.
3. Request review from the CODEOWNERS on `/src/lib/voice/` (voice + compliance).
4. Two approvals required before merge — do not self-approve.
5. After merge, the ElevenLabs agent KB is re-synced from the file on the next deploy. Do not edit the KB in the dashboard.

## When in doubt

Leave it out. The tool boundary is the last line of defence, but the KB is the first. Every entry we skip is one less surface to red-team.

Questions → `#voice-compliance` in Slack, or tag `@phill.mcgurk` on the PR.

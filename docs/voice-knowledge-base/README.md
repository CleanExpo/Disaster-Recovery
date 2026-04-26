# Voice Agent Knowledge Base

Source-of-truth content packs for the ElevenLabs convai agents.

## Why this exists

The ElevenLabs system prompt sets the agent's voice, scope, and refusal
boundaries — but not the factual content the agent should pull from.
For factual questions ("what does IICRC certification cost?", "how long
does the seven-step flow take?"), the agent should retrieve from a
**knowledge base** rather than paraphrase the system prompt.

This directory contains markdown files designed to be uploaded to the
ElevenLabs Convai > Agents > [agent] > **Knowledge Base** surface.

## Files

| File                               | Agent  | Description                                                     |
| ---------------------------------- | ------ | --------------------------------------------------------------- |
| `olivia-nrpg-overview.md`          | Olivia | What NRPG is + the network-orchestrator model                   |
| `olivia-onboarding-process.md`     | Olivia | The seven-step application flow in detail                       |
| `olivia-applicant-requirements.md` | Olivia | Documents, certifications, and licences applicants must produce |
| `olivia-service-categories.md`     | Olivia | The nine damage categories DR contractors are approved for      |
| `olivia-faq.md`                    | Olivia | Frequently asked onboarding questions                           |
| `sarah-claim-process.md`           | Sarah  | Property-owner-facing claim flow                                |
| `sarah-faq.md`                     | Sarah  | Frequently asked claim questions                                |

## How to upload (manual, ~5 minutes per agent)

1. Sign in to https://elevenlabs.io/app/agents/agents
2. Open the target agent (Olivia or Tannika).
3. Click the **Knowledge Base** tab.
4. Click **Add document** → select the relevant `.md` file from this
   directory.
5. Repeat for each file linked to that agent.
6. Click **Save**, then click **Publish** to activate.

## Versioning

Bump the date in each file's frontmatter when content changes. The
agent's system prompt does NOT need to bump (it doesn't reference the
KB content directly). Knowledge-base updates are a hot-swap — no
prompt re-deploy required.

## Compliance

All content here is PUBLIC class (per `.claude/rules/privacy.md §1`).
Specifically:

- No contractor identities, ABNs, locations, or commercial terms.
- No specific subscription rates or platform fees (those are
  CONFIDENTIAL — see `.claude/rules/privacy.md §2`).
- No client PII or claim details.
- No internal SOPs, dashboards, or system info.

If a future KB document needs CONFIDENTIAL data to answer a question,
that's a sign the agent should refuse and escalate, not extend the KB.

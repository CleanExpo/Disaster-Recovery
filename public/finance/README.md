# /public/finance — Equipped Commercial Finance disclosure PDFs

This directory holds the public-facing PDF disclosures for the Phase 1
Equipped Commercial Finance referral integration. Files are served
directly at `/finance/<filename>.pdf`.

## Expected files (drop-in)

| Filename                                             | Source                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `credit-guide-equipped-v17-202307.pdf`               | George Steele email 22/04/2026 — attachment `Credit Guide - Version 17 202307.pdf` |
| `privacy-disclosure-statement-equippedcf-v2.pdf`     | George Steele email 22/04/2026 — attachment `Privacy Disclosure Statement_EquippedCF_V2.pdf` |
| `recoverycapital-base44.pdf`                         | George Steele email 22/04/2026 — attachment `RecoveryCapital _ Base44.pdf` |

## Status — 24/04/2026

TODO. The agent run that built this scaffold could not download the
attachments via the browser extension (no host permission for
`mail.google.com`). Phill to drop the three PDFs here manually and
commit in a follow-up.

The `/finance` page already links
`credit-guide-equipped-v17-202307.pdf` and
`privacy-disclosure-statement-equippedcf-v2.pdf`; those links will 404
until the files land.

NOT LEGAL ADVICE.

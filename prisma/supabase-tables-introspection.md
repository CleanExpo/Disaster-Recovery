# Supabase Tables Introspection

> **Last refreshed: 2026-04-27** via `npx prisma db pull --print` against
> production Supabase (`aws-1-ap-southeast-2.pooler.supabase.com`).
>
> **Previous generation:** 2026-02-22 (stale — superseded by this run).
> See git history for the previous version.

---

## Summary (2026-04-27)

| Metric                                                             | Value   | Notes                                                                                                                                                                                     |
| ------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Total live Supabase tables** (excluding `_prisma_migrations`)    | **109** | Was 90 in Feb 2026 — net +19 in 2 months.                                                                                                                                                 |
| **PascalCase tables Prisma created via our migrations**            | ~26     | Subset of the 79 models in `prisma/schema.prisma`. These are real, queryable, owned by DR.                                                                                                |
| **Lowercase / snake_case tables NOT created by our migrations**    | ~84     | Co-tenant data from sibling apps in the same Supabase project (NRPG curriculum, CARSI, RestoreAssist, beta programmes, blog/SEO, etc.). DR does NOT manage these.                         |
| **Prisma models in `schema.prisma` WITHOUT a matching live table** | ~53     | **CRITICAL DRIFT.** Many core models (User, Lead, Job, Client, ContractorApplication, Notification, etc.) have no backing table. App must avoid these code paths or it breaks at runtime. |

This is the headline number from the audit-style refresh. It changes the
Phase 2 priority list: dropping just the 13 "safe" dead models is too
narrow — we need a bigger sweep.

---

## What changed since February

In February the introspection said _"3 in Prisma, 87 missing"_. The
current state is shaped differently: 26 PascalCase tables ARE Prisma-
managed (massive growth from 3), but **53 declared Prisma models have
no live table** in production. The drift moved from "Supabase has
unmodeled tables" → "Prisma has unbacked models".

The 84 lowercase tables co-existing in the same Supabase project are
likely from these sibling apps sharing the database:

- NRPG onboarding curriculum (`nrpg_*`, `client_module_progress`,
  `contractor_module_progress`)
- CARSI inspection platform (`inspection_*`, `damage_areas`,
  `moisture_readings`, `equipment_line_items`, `labor_line_items`,
  `material_line_items`, `cost_estimates`)
- RestoreAssist (`triage_assessments`, `service_requests`)
- Beta programme + blog (`beta_*`, `blog_*`, `case_studies`, `faqs`)
- Workspace tooling (`workspaces`, `workspace_*`, `tenants`)

These are NOT DR-managed. DR's app should never query them. The Prisma
client doesn't know about them, which is correct.

---

## DR-managed tables (PascalCase, in our migrations)

These 26 tables exist in live Supabase AND are the canonical surface for
DR's application code:

```
AuditLog                       Booking                CallTranscript
Contractor                     ContractorDocument     ContractorServiceArea
ContractorVerificationHistory  DisasterAlert          FinanceReferral
FinanceReferralEvent           IICRCCertification     InsuranceClaimAU
InsuranceProvider              InvoiceAU              LoginAttempt
Payment                        Rating                 RedditContentPillar
RedditOrchestratorRun          RedditPerformanceLog   RedditPost
RedditSafetyAudit              RedditSystemPrompt     RiskAssessment
VerificationToken              VoiceCall
```

If your code calls `prisma.<model>.X()` for any model NOT in that list,
the call WILL fail at runtime against production unless the model is
mapped to one of the lowercase co-tenant tables via `@@map` (see the
6 `@@map` directives in `schema.prisma`).

---

## Prisma models WITHOUT a backing table (~53)

The dead-model audit (PR #231) called out 15. The actual count is much
larger:

```
Agency                       Audit                  BackgroundCheck
BotConversation              BotMetrics             ClaimNotification
ClaimPhotoAttachment         Client                 CompetencyTestResult
ComplianceAudit              ContractorAgreement    ContractorApplication
ContractorAuditLog           ContractorAvailability ContractorCertification
ContractorCompany            ContractorInsurance    ContractorInvoice
ContractorKPI                ContractorNotification ContractorPayment
ContractorProject            ContractorReference    ContractorSubscription
ContractorSupport            ContractorTerritory    ContractorTraining
EmergencyGuide               Enquiry                ErrorLog
GuideStep                    InsuranceProcess       Invoice
Job                          JobOffer               Lead
LeadNote                     LeadTracking           ModuleProgress
Notification                 OnboardingPayment      OnboardingProgress
Partner                      PartnerBilling         PartnerPayment
ProofOfWork                  Proposal               PushToken
ServiceProcedure             StepByStepGuide        SubContractor
SubContractorEngagement      SubscriptionPricing    SupportMessage
User                         VerifiedContent
```

**This includes the entire core domain — `User`, `Lead`, `Job`, `Client`,
`Notification`, `Invoice`, `ContractorApplication`, `OnboardingPayment`,
etc.** Many code paths reference these. Either:

1. Those code paths are dead and never execute (most likely) — the
   audit's dead-model finding suggested 15 of these are zero-reference.
2. Some of these need `@@map` directives pointing at the lowercase
   co-tenant tables (e.g. `User` → `users`, `Job` → `jobs`).
3. Some need fresh migrations to create the missing tables.

This is a **genuine 1-2 day audit** by an engineer who knows which code
paths are alive. It is NOT a mechanical "drop the dead models" job.

---

## Co-tenant lowercase tables (~84) — NOT DR-managed

Listed for reference. Do NOT add Prisma models for these unless you are
explicitly taking over ownership of one of the sibling apps.

```
activities                    admin_service_categories  admin_services
admin_themes                  ai_batch_processing_jobs  ai_image_enhancement_logs
background_jobs               backlinks                 beta_enrollments
beta_feedback                 beta_nps_surveys          beta_programs
blog_faqs                     blog_posts                business_rule_violations
business_rules                case_studies              client_emergency_contacts
client_insurance              client_module_progress    client_onboarding
client_payments               client_profiles           client_properties
competitor_analyses           competitor_keywords       competitors
compliance_checks             connection_logs           contractor_applications
contractor_assessments        contractor_certifications contractor_inquiries
contractor_location_history   contractor_matches        contractor_module_progress
contractor_onboarding         contractor_preferences    contractor_profiles
contractor_rotation           cost_estimates            customer_lifecycle
damage_areas                  equipment_line_items      faqs
inspection_photos             inspection_reports        job_documents
job_messages                  job_outcome_logs          job_photos
jobs                          keyword_opportunities     labor_line_items
lead_captures                 material_line_items       messages
moisture_readings             newsletter_subscriptions  notification_logs
notification_preferences      nrpg_certification_points nrpg_commitments
nrpg_onboarding_phases        nrpg_training_progress    opportunities
public_claims                 realtime_subscriptions    report_revisions
service_request_callout_payments  service_requests      swot_analyses
tasks                         tenant_configurations     tenants
triage_assessments            user_preferences          users
waitlist_submissions          workspace_audit_logs      workspace_members
workspaces                    xero_tokens
```

---

## Recommended Phase 2 follow-ups

1. **P1 — Audit which of the 53 phantom Prisma models are actually
   queried in DR's code.** Tooling: `grep -rn "prisma.<model>." src/ app/`
   for each. Report 3-bucket breakdown:
   - Active in code, no live table → CRITICAL bug, route is broken
   - Active in code, lowercase co-tenant table exists → add `@@map`
   - Dead in code, no live table → safe to drop the Prisma model

2. **P2 — Reconcile schema.prisma with migration history.** If a Prisma
   model was added but no migration created the table, that's the bug.
   Best fix: create the missing migration.

3. **P3 — Add `@@map` lint.** A check that fails if a Prisma model has
   no migration creating its target table — would have caught this
   2 months ago.

4. **DEFERRED — Coexistence policy with co-tenant lowercase tables.**
   Decide whether to:
   - Keep the Supabase project shared (current state, no overhead but
     accidental cross-contamination risk).
   - Split DR into its own Supabase project (clean but expensive +
     migration work).

---

## How this doc is generated

```bash
# from repo root
npx prisma db pull --print > /tmp/live.prisma
diff <(grep '^model ' prisma/schema.prisma | awk '{print $2}' | sort) \
     <(grep '^model ' /tmp/live.prisma | awk '{print $2}' | sort)
```

Re-run after every schema change to keep this doc current.

---

## References

- Phase 1 schema-drift audit: `docs/audits/schema-drift-phase-1-summary-2026-04-27.md`
- Dead-model audit: `docs/audits/dead-prisma-models-2026-04-27.md`
- Domain models + drift index: `.context/domain-models.md`
- Migration history: `prisma/migrations/`

# DR-628 — dangerouslySetInnerHTML Security Audit

**Date:** 2026-04-23
**Scope:** `C:/Disaster Recovery/Disaster-Recovery` — all `.ts`/`.tsx`/`.js`/`.jsx` files
**Method:** Grep + per-file classification (SAFE / STRUCTURED_DATA_OK / RISKY)

## Summary

| Classification | Count | Action |
|---|---|---|
| STRUCTURED_DATA_OK | ~395 | None — JSON.stringify of developer-controlled schema.org JSON-LD |
| SAFE | 3 | None — hardcoded analytics snippets / trusted SVG assets |
| RISKY (public-facing) | 0 | None required |
| RISKY (internal admin, unrouted) | 2 | Backlog — documented below |

**Total occurrences:** 400 across ~92 source files.
**Public-facing RISKY findings:** 0.
**High-severity fixes applied:** 0 (none required).

## Classification

### STRUCTURED_DATA_OK (~395)

Every occurrence in `app/**/page.tsx` and the schema helpers in
`src/components/seo/*` follows one of these trusted patterns:

```tsx
<Script id="x-schema" type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />
```

or

```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: staticSchemaString }} />
```

The `schemaObject` / `staticSchemaString` values are built server-side from
developer-authored constants, typed location/service data under `data/`, or
`NAP` constants in `src/lib/constants.ts`. No user input, no query params,
no CMS body, no URL-derived values reach `__html`.

Representative families covered:
- `app/layout.tsx` global schemas (Organization, WebSite, EmergencyService, Breadcrumb)
- `src/components/seo/GlobalFAQSchema.tsx`, `DynamicBreadcrumbSchema.tsx`, `ComprehensiveSEO.tsx`
- `AgContentPageTemplate`, `AgGuidePageTemplate`, `AgServicePageTemplate` (article/FAQ/howTo schemas)
- Location pages: `app/locations/**/page.tsx`, `app/services/**/page.tsx`
- Guide pages: `app/guides/**/page.tsx`
- Case studies, about, compare, facts, contact

No action required for this class.

### SAFE (3)

1. **`src/components/analytics/ConsentModeInit.tsx:16`** — emits the
   `CONSENT_MODE_DEFAULT_SCRIPT` constant from `src/lib/analytics/consent.ts`.
   Developer-authored literal script, loaded `beforeInteractive` for GTM.
2. **`src/components/analytics/GoogleTagManager.tsx:19`** and
   **`src/components/analytics/MicrosoftClarity.tsx:17`** — hardcoded GTM /
   Clarity bootstrap snippets with build-time string interpolation of the
   container ID from env vars. Standard industry practice; IDs are public.
3. **`src/components/antigravity/AntigravityServicePageTemplate.tsx:61`** —
   `card.iconSvg` injection. `card` comes from typed service-data files
   under `data/services/**` (developer-authored). Already commented as safe.

### RISKY — internal admin, not routed publicly (2, backlog)

These two components render user-influenced HTML but are **not imported by any
public route** (verified by grep — their only references are their own file
definitions). They appear to be orphaned back-office / demo components from
an earlier CRM exploration.

1. **`src/components/clean-claims/ClientCommunicationWorkflow.tsx:661`** —
   renders `emailPreview.html` unsanitised inside an admin modal. If ever
   wired to a public or low-trust user route, this is a stored-XSS sink.
   **Status:** Orphan; not rendered on any current public page.
   **Backlog action:** Either delete the component or wrap with
   DOMPurify before re-use.

2. **`src/components/notifications/EmailTemplates.tsx:543`** —
   renders `processTemplate(selectedTemplate.bodyTemplate, testData)` into a
   preview pane. Template bodies are admin-authored, but `testData` includes
   a free-text "customer name" field. Template uses naive `{{var}}` string
   replacement with no HTML escaping.
   **Status:** Orphan; not rendered on any current public page.
   **Backlog action:** Escape variables during `processTemplate()` or
   sanitise final HTML with DOMPurify before preview.

### Non-source references (ignored)

- `src/lib/agents/research-planner/code-analysis.ts:87` — regex literal
  used by an internal code-analysis agent to flag this very pattern.
  Not an actual innerHTML call.
- `docs/plans/*.md`, `docs/audits/*.md` — documentation references only.

## Fixes applied in this PR

None — all public-facing occurrences are SAFE or STRUCTURED_DATA_OK, and
the two RISKY findings are on unrouted orphan components that pose no
current production risk. Deferring to backlog per the scoping rule.

## Backlog (tracked here)

- [ ] DR-628-a: Decide fate of `ClientCommunicationWorkflow.tsx` — delete
  or add DOMPurify + route guard.
- [ ] DR-628-b: Decide fate of `EmailTemplates.tsx` — escape variables
  in `processTemplate()` or gate behind admin-only route.
- [ ] DR-628-c: Add an ESLint rule (or `scripts/lint-innerhtml.ts`) that
  flags any new `dangerouslySetInnerHTML` whose `__html` expression isn't
  `JSON.stringify(...)` or a known-schema identifier.

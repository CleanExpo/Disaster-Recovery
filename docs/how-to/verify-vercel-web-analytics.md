# Verify Vercel Web Analytics

Tracking: issue #387, reported on 8 October 2026 (AEST).

## Confirmed from source

ADR-005 explicitly chooses Vercel user analytics. The root layout imports
Analytics from @vercel/analytics/react and renders it alongside SpeedInsights.
There is no source evidence that Web Analytics was deliberately switched off.

The reported 404 on /_vercel/insights/script.js, while Speed Insights serves
JavaScript, is consistent with a missing Web Analytics setting on the serving
Vercel project. It does not establish that setting without inspecting the project.

## Outstanding configuration verification

The Vercel connector did not return during this investigation and the managed
execution environment was unavailable. The serving project, Analytics enablement
and current production responses have not been independently verified.

1. In Vercel, identify the project whose production domain is
   disasterrecovery.com.au. Confirm both domain assignment and connected
   CleanExpo/Disaster-Recovery repository; do not select the sandbox project.
2. Inspect Project → Analytics. Record whether Web Analytics is enabled.
3. If disabled, enable it in accordance with ADR-005. Follow Vercel's displayed
   activation/redeployment instructions for that project.
4. Verify /_vercel/insights/script.js returns HTTP 200 with JavaScript content.
   Check Speed Insights separately; it does not prove Web Analytics is working.
5. Open a page in a browser, inspect the Web Analytics collection request and
   confirm the visit appears in the project's Analytics view.
6. Record the actual project and outcome in the PR before closing #387.

Do not remove Analytics merely to silence a 404. If the product decision has
changed, record the approved change to ADR-005 before removing the component.

## Deployment smoke check

With the existing project dependencies and browser installed, run:

```bash
VERCEL_ANALYTICS_SMOKE=true PLAYWRIGHT_BASE_URL=https://disasterrecovery.com.au npx playwright test tests/e2e/vercel-analytics-deployment.spec.ts
```

The test is opt-in because Vercel supplies these endpoints and a local Next.js
server cannot verify enablement. It asserts the two scripts serve JavaScript.
It also captures the /claim top viewport and element positions for visual review
on desktop and mobile using the existing Playwright projects. Script availability
alone does not prove that collection requests are accepted.

## Claim top band

The source places AntigravityNavbar, a breadcrumb with 1rem top padding, and the
VoiceWidget wrapper before the interactive claim form. That wrapper has pt-2 even
when the flag-gated widget returns null. The form adds py-6/sm:py-10, followed by
the life-safety notice before its heading. The SSR fallback has a different hero.

These are candidate contributors to the reported band, not a confirmed cause.
Review the screenshot and geometry before changing spacing. Keep the life-safety
notice visible and preserve the voice feature's consent gate. No claim layout
change was made without a rendered reproduction.

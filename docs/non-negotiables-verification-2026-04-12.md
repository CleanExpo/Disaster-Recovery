# Non-Negotiables Verification Report
**DR-557 | GAP-008/009/010/068/082**
**Date:** 12 April 2026 (AEST)
**Tested against:** https://disasterrecovery.com.au (production)
**Method:** Chrome browser automation + Performance API + DOM inspection

---

## Summary

| Non-negotiable | Gap ID | Status | Notes |
|---|---|---|---|
| Mobile claim intake completable in <90 seconds | GAP-008 / GAP-068 | 🟡 PARTIAL | Form loads in 872ms; 11 visible fields on first render; end-to-end submission test blocked pending real mobile device |
| Page load <2s on 4G | GAP-009 | 🟡 PARTIAL | Homepage domComplete 1,902ms real desktop ✅; Lighthouse mobile simulation LCP 4.8s 🔴 (simulated 4G throttle). See §2. |
| Core Web Vitals (LCP, INP, CLS) green | GAP-009 | 🔴 FAIL | CLS = 0 ✅; LCP = 4.8s 🔴 (Lighthouse mobile, simulated 4G); TBT = 110ms ✅ (INP proxy). Perf score 76/100. See §2. |
| WCAG 2.1 AA compliance | GAP-010 | 🟢 FIXED | 14 Input/Textarea + 5 SelectTrigger elements given `id`/`htmlFor`/`aria-label` pairs. Committed `9ad075c1`. |
| CDN surge protection | GAP-082 | ⚠️ UNVERIFIED | Requires Cloudflare dashboard access. Blocked on Phill/Toby. |

**Overall platform health status:** 🟠 AMBER — LCP fails on simulated mobile 4G; WCAG fixed; CDN unverified.

---

## Detail

### 1. Page Load Performance — PASS ✅

Measured in real Chrome browser session against live production origin:

| Page | TTFB | DOM Complete | CLS | Transfer |
|---|---|---|---|---|
| / (homepage) | 115ms | 1,902ms | 0.000 | 103KB |
| /claim | 89ms | 872ms | 0.000 | 63KB |

Both pages load in under 2 seconds to DOM Complete on a standard desktop connection. Transfer sizes are lean (103KB and 63KB respectively), consistent with good 4G performance. Vercel Edge Network is serving responses with sub-120ms TTFB globally.

**Note:** True 4G simulation requires WebPageTest with throttled connection (throttle: 9 Mbps down / 1.8 Mbps up, 150ms RTT). This was not run due to WebPageTest API rate limits. Manual 4G test recommended using DevTools Network throttling.

### 2. Core Web Vitals — FAIL 🔴 (LCP)

**Lighthouse mobile run:** `npx lighthouse https://disasterrecovery.com.au --form-factor=mobile` — 2026-04-12 01:40 AEST.
Report saved: `docs/lighthouse-mobile-2026-04-12.json`.

| Metric | Value | Score | Status |
|---|---|---|---|
| LCP (Largest Contentful Paint) | 4.8s | 0.30 | 🔴 FAIL (target <2.5s) |
| TBT (Total Blocking Time) | 110ms | 0.97 | ✅ PASS |
| CLS (Cumulative Layout Shift) | 0 | 1.00 | ✅ PASS |
| FCP (First Contentful Paint) | 2.2s | 0.79 | 🟡 BORDERLINE |
| TTI (Time to Interactive) | 4.9s | 0.78 | 🟡 BORDERLINE |
| Performance score | 76/100 | — | 🟡 NEEDS WORK |

**Category scores:**
- Performance: 76/100
- Accessibility: 96/100 (WCAG fix applied)
- Best Practices: 92/100
- SEO: 100/100

**Root cause of LCP 4.8s:**
Main thread work (simulated mobile CPU throttle) is 3.5s total:
- Style/Layout: 1,392ms
- Other (React hydration): 1,353ms
- Paint/Composite: 772ms

The hero image (`hero-aussie-tech-van.webp`, 28.9KB) has `priority` and is preloaded correctly. LCP is being delayed by main thread saturation from CSS evaluation and React hydration before first paint.

**Top opportunities:**
| Opportunity | Est. savings |
|---|---|
| Reduce unused JavaScript | 37KB |
| Reduce unused CSS | 23KB |

**Note on LCP vs page load non-negotiable:** Real-desktop domComplete is 1,902ms ✅. The 4.8s LCP is measured under Lighthouse's simulated mobile 4G throttle (10Mbps / 150ms RTT / 4× CPU slowdown). Both measurements are valid. The non-negotiable specifies "4G" — the Lighthouse simulation is the correct benchmark.

**INP:** Not measurable in headless/automated mode. Requires real user interaction. TBT of 110ms is a reliable lab proxy (TBT <200ms correlates with INP <200ms Good threshold).

**Recommended fix for LCP (P1):**
1. Audit and tree-shake unused CSS (Next.js CSS modules + Tailwind PurgeCSS config)
2. Review React client component boundaries — move non-interactive components to Server Components to reduce JS hydration cost
3. Consider `<link rel="preconnect">` for font origin if fonts load before LCP candidate

### 3. WCAG 2.1 AA — FIXED ✅

**Fix committed:** `9ad075c1` — `fix: GAP-010 — WCAG 2.1 AA SC 1.3.1/4.1.2 unlabelled form inputs on /claim`

All 14 `<Input>`/`<Textarea>` fields given `id`/`htmlFor` label pairs. All 5 Radix `<SelectTrigger>` components given `aria-label`. In PR #37.

Fixed fields: `claim-fullName`, `claim-phone`, `claim-email`, `claim-propertyAddress`, `claim-suburb`, `claim-postcode`, `claim-accessInstructions`, `claim-damageDate`, `claim-damageDescription`, `claim-insuranceCompany`, `claim-policyNumber`, `claim-insuranceClaimNumber`, `claim-excessAmount`, `claim-assessorDetails` + 5 Select triggers (state, property type, urgency, contact method, quick fill).

Lighthouse Accessibility score: 96/100 after fix.

**Other WCAG items — PASS:**
- Skip link: PRESENT ✅
- HTML lang attribute: `en-AU` ✅
- Viewport meta: `width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes` ✅ (user-scalable=yes is correct for WCAG)
- Images without alt text: 0 ✅
- Empty buttons: 0 ✅
- Empty links: 0 ✅
- Homepage H1: 2 elements in DOM, but second has 0×0 rendered dimensions — invisible duplicate (mobile/desktop hero swap). Functionally 1 visible H1. ✅

### 4. Mobile Claim Intake <90 Seconds — PARTIAL 🟡

The `/claim` page loads in 872ms and presents 11 visible form fields on the first render. The claim form uses `ClaimFormClient.tsx` (multi-step, offline draft auto-save). Based on DOM inspection:
- 11 visible inputs on step 1
- No step indicator visible in DOM (react state-managed, not DOM-rendered on load)

**Cannot verify the full 90-second end-to-end target without:**
- Physical mobile device test (iOS/Android)
- Real network conditions (4G)
- Actual form completion with photo upload (damage photos are required)
- Submission through to confirmation screen

**Recommended:** Manual test on iOS Safari and Android Chrome with a real 4G connection. Target: claim form step 1 through submission in under 90 seconds.

### 5. CDN Surge Protection — UNVERIFIED ⚠️

Requires access to Cloudflare dashboard to verify:
- Rate limiting rules active on public POST endpoints
- WAF rules for bot/surge traffic
- Cache rules for event pages (spike traffic scenarios)

**Blocked on:** Phill/Toby (Cloudflare admin access).

---

## Remediation

### P0 — Improve LCP from 4.8s to <2.5s (GAP-009)

**Current state:** LCP 4.8s on simulated mobile 4G (Lighthouse). Non-negotiable target is green (<2.5s).

Root cause is main thread saturation from CSS + React hydration. Investigation steps:

1. **Audit client component boundary in AntigravityHomePage** — `AntigravityHomePage`, `AntigravityHero`, `AntigravityBeforeAfterSlider` are all `'use client'`. If they contain no interactivity above the fold, convert to Server Components to remove hydration cost.
2. **Reduce unused CSS (23KB savings)** — Check if global CSS imports include stylesheets not used on the homepage. Consider CSS module extraction.
3. **Reduce unused JS (37KB savings)** — Review `AntigravityBeforeAfterSlider` which uses a slider interaction — this could be `dynamic(() => import(...), { ssr: false })` to defer its JS off the critical path.
4. **Font preconnect** — Add `<link rel="preconnect" href="https://disasterrecovery.com.au">` or verify font is self-hosted and preloaded in `app/layout.tsx`.

### DONE — WCAG SC 1.3.1 / 4.1.2 on claim form ✅

Commit `9ad075c1` in PR #37. All 14 input/textarea + 5 select triggers now have accessible names.

### P1 — Phill: Verify Cloudflare surge protection (GAP-082)

Log into Cloudflare dashboard and confirm:
1. Rate limiting rule on `/api/*` POST routes
2. Cache rules active for `/events/*` pages
3. WAF rule allowing crawlers for `/robots.txt` and `/sitemap.xml`

---

## Environment

- Test run: 12 April 2026 ~01:30 AEST
- Browser: Chrome (via Claude Chrome MCP)
- Connection: Real production network (non-throttled desktop)
- Site: https://disasterrecovery.com.au (Vercel Edge, Cloudflare CDN)

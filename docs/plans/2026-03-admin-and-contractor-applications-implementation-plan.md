# Admin Area & Contractor Applications — Implementation Plan

**Document owner:** Product / Engineering  
**Version:** 1.0  
**Last updated:** March 2026  
**Status:** Plan — not yet implemented

---

## 1. Executive summary

The admin area currently has **no login or access control**: any user can open `/admin/*` if they know the URL. Contractor applications are stored in the database but there is **no admin UI** to list, approve, reject, or request more information. This plan defines a phased approach to:

1. **Introduce admin authentication** — reuse existing login with role-based redirect and protect all admin routes.
2. **Add contractor applications admin** — list applications, view details, approve, reject, request more info.
3. **Harden and extend** — optional admin APIs, audit trail, and UX improvements.

---

## 2. Current state (as-is)

| Area | Status | Notes |
|------|--------|------|
| **Admin login** | ❌ Missing | No dedicated admin login; main `/login` always redirects to `/dashboard`. Admin users are not sent to admin after login. |
| **Admin route protection** | ❌ Missing | Middleware does not guard `/admin`. All admin pages are publicly reachable. |
| **Admin layout** | ❌ Missing | No shared layout for admin (nav, sidebar, session check). |
| **Contractor applications list** | ❌ Missing | No page to list `ContractorApplication` records. |
| **Approve / Reject / Request info** | ❌ Missing | No actions or API to change application status or notify applicant. |
| **Existing admin pages** | ✅ Present | Leads, Fraud detection, SEO pages, Proof of work, Site audit, SEMrush — all unprotected. |
| **Auth backend** | ✅ Present | NextAuth + Prisma `User` with `role` (e.g. `ADMIN`, `MANAGER`, `CLIENT`). Seed: `admin@demo.com` / `admin123`. |
| **ContractorApplication data** | ✅ Present | Stored via `/api/contractor/onboarding/submit`; status and full JSON in DB. |

---

## 3. Goals and success criteria

- **G1** Admin area is only accessible after login by users with an admin-capable role (e.g. `ADMIN`, optionally `MANAGER`).
- **G2** Admin users land in the admin area after login (not only on `/dashboard`).
- **G3** Admins can see a list of contractor applications, open each one, and perform: Approve, Reject, Request more information.
- **G4** Changes to application status are persisted and (optionally) trigger notifications (e.g. email) to the applicant.
- **G5** Plan is implementable in phases without breaking existing contractor or public flows.

---

## 4. Admin login strategy

**Recommendation: single login, role-based redirect — no separate “admin login” page.**

- **Why:** One credential store (Prisma `User`), one NextAuth flow, simpler maintenance and UX (one place to sign in).
- **How:**
  - Keep **one** login page: `/login` (or `/admin/login` as an alias that renders the same form and redirect logic).
  - After successful `signIn('credentials', ...)`:
    - If `session.user.role` is admin-capable (e.g. `ADMIN` or `MANAGER`): redirect to **`/admin`** (or `/admin/dashboard`).
    - Else: redirect to **`/dashboard`** (current behaviour).
  - **Admin route protection:** For any request to `/admin/*`, ensure the user is logged in and has an admin role; otherwise redirect to `/login` (and optionally back to the requested admin URL after login).

**Alternatives (not recommended for v1):**

- Separate `/admin/login` with different branding: possible later; still use same NextAuth + same `User` table.
- Separate “admin” auth (e.g. different provider or JWT-only): adds complexity and two sources of truth; defer.

**Concrete implementation points:**

1. **Login page redirect logic**  
   After successful login, call `getSession()` (or use the result of `signIn`) to read `user.role` and:
   - `role === 'ADMIN' || role === 'MANAGER'` → `router.push('/admin')` (or `/admin/dashboard`).
   - Else → `router.push('/dashboard')`.

2. **Admin entry point**  
   - Add a single **admin home/dashboard** route, e.g. `/admin` or `/admin/dashboard`, that shows a simple overview (links to Leads, Applications, SEO, etc.). This is the post-login landing page for admins.

3. **Protecting all admin routes**  
   - Option A (recommended): **Admin layout** that runs once for all `/admin/*` pages:
     - In a server component or layout, call `getServerSession(authOptions)`.
     - If no session or role not admin-capable → `redirect('/login?callbackUrl=' + encodeURIComponent(requested path))`.
     - Else render children (existing admin pages).
   - Option B: Middleware that checks session for `/admin` paths and redirects if unauthorized. Requires reading session in middleware (e.g. via JWT strategy); same net effect.

4. **Login link for admin**  
   - Add a clear “Admin” entry point: e.g. from marketing site or footer, link to **`/admin`**. Unauthenticated users hit the layout (or middleware), get redirected to `/login?callbackUrl=/admin`. After login, redirect logic sends them to `/admin`. So “admin login” = going to `/admin` and being sent to `/login` when not logged in.

---

## 5. Phased implementation plan

### Phase 1 — Admin authentication and protection (foundation)

**Objective:** Only admins can reach `/admin/*`; admin users are sent to admin after login. No new business features yet.

| # | Task | Description | Owner / Notes |
|---|------|-------------|---------------|
| 1.1 | Define admin roles | Treat `User.role === 'ADMIN'` as admin; optionally `'MANAGER'`. Document in one place (e.g. `src/lib/constants.ts` or auth module). | Dev |
| 1.2 | Role-based redirect after login | In `app/login/page.tsx` (or shared submit handler), after successful `signIn`: get session/role and `router.push(role is admin ? '/admin' : '/dashboard')`. | Dev |
| 1.3 | Admin layout with auth check | Add `app/admin/layout.tsx`: server component that calls `getServerSession(authOptions)`. If no session or not admin role → `redirect('/login?callbackUrl=' + path)`. Layout renders nav/sidebar + `children`. | Dev |
| 1.4 | Admin shell / dashboard | Add `app/admin/page.tsx` (or `app/admin/dashboard/page.tsx`) as landing: title “Admin”, links to Leads, SEO, Fraud, Proof of work, Site audit, SEMrush, and (later) Contractor applications. | Dev |
| 1.5 | Login link to admin | From main site (e.g. footer or “For staff” link), add “Admin” linking to `/admin`. Ensure sitemap/excluded paths already exclude `/admin` (already in place). | Dev |
| 1.6 | Optional: callbackUrl after login | When redirecting to login from admin, pass `callbackUrl=/admin`. After login, if `callbackUrl` is under `/admin` and user is admin, redirect to `callbackUrl` instead of default `/admin`. | Dev |

**Acceptance criteria (Phase 1):**

- Unauthenticated visit to `/admin` or `/admin/leads` redirects to `/login`.
- Login as `admin@demo.com` redirects to `/admin` (or `/admin/dashboard`).
- Login as a non-admin user redirects to `/dashboard`; direct navigation to `/admin` redirects to `/login` or 403.
- All existing admin pages (Leads, Fraud, SEO, etc.) remain usable when accessed as an admin.

**Risks / mitigations:**  
- Session type: ensure `session.user.role` is typed and present (NextAuth callbacks already add it).  
- If middleware is used later, keep layout check as a second layer so server-rendered admin pages never render for non-admins.

---

### Phase 2 — Contractor applications admin (core feature)

**Objective:** Admins can list contractor applications, open one, and set status to Approved, Rejected, or “Request more information”.

| # | Task | Description | Owner / Notes |
|---|------|-------------|---------------|
| 2.1 | API: list applications | `GET /api/admin/contractor-applications` (or under existing `/api/contractor/...` with admin-only check). Query `ContractorApplication` with filters (status, date range), pagination. Return summary fields + id. Protect: only admin role (session). | Dev |
| 2.2 | API: get one application | `GET /api/admin/contractor-applications/[id]`. Return full record including `data` (JSON). Admin-only. | Dev |
| 2.3 | API: update status | `PATCH /api/admin/contractor-applications/[id]` body `{ status: 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW', adminNotes?: string }`. Optionally support “request more info” as status or flag. Admin-only. | Dev |
| 2.4 | Applications list page | New page `app/admin/applications/page.tsx`: table/cards of applications (business name, contact, email, status, submitted date). Link to detail page. Use list API. | Dev |
| 2.5 | Application detail page | `app/admin/applications/[id]/page.tsx`: show full application (from get-one API), display `data` in readable sections. Buttons: Approve, Reject, Request more information. Call PATCH API; then refresh or redirect back to list. | Dev |
| 2.6 | Add “Applications” to admin nav | In admin layout sidebar/nav, add link to “Contractor applications” (e.g. `/admin/applications`). | Dev |

**Acceptance criteria (Phase 2):**

- Admin can open “Contractor applications” and see all submitted applications.
- Admin can open one application and see full details (business info, insurance, experience, etc.).
- Admin can set status to Approved, Rejected, or (e.g.) Under review / Request more info; change is saved and visible in list and detail.
- Non-admin users cannot call the new admin APIs (403).

**Risks / mitigations:**  
- Large `data` JSON: render in collapsible sections or tabs to avoid huge scroll.  
- Idempotency: same status can be set twice; no need for complex workflow in v1.

---

### Phase 3 — Notifications and polish (optional for v1)

**Objective:** When status changes, applicant is informed (e.g. email). Optional: simple audit of who changed what.

| # | Task | Description | Owner / Notes |
|---|------|-------------|---------------|
| 3.1 | Email on status change | On PATCH to Approved/Rejected/Request more info, send email to `application.email` (from summary or `data.businessInfo`). Use existing email stack (e.g. SendGrid). Template: outcome + next steps. | Dev |
| 3.2 | Optional: audit log | Log “Admin X set application Y to Z at time T” in DB or log stream. Low priority for first release. | Dev |
| 3.3 | “Request more information” content | If “request more info” allows a message, add `adminNotes` or `requestedInfoMessage` to PATCH and show in email. | Dev |

---

### Phase 4 — Future enhancements (backlog)

- **Admin APIs:** `GET /api/admin/metrics`, `GET /api/admin/compliance`, `POST /api/admin/verify-document`, `GET /api/admin/audit-logs` (as per health check doc) — implement when a consumer (e.g. dashboard or external tool) is ready.
- **Contractor creation on approve:** When status is set to Approved, optionally create or link a `Contractor` record and send portal/training access (separate product decision).
- **Dedicated admin login page:** If branding or flow later requires a separate `/admin/login` page, keep same NextAuth and same redirect logic; only change entry URL and copy.

---

## 6. Technical notes

### Roles

- **Source of truth:** `User.role` in Prisma (string). Seed uses `'ADMIN'`, `'MANAGER'`, `'CLIENT'`.
- **NextAuth:** Session includes `user.role` (from DB via callbacks). Use this for redirect and layout protection.
- **JWT auth** (`src/lib/jwt-auth.ts`): Separate from NextAuth; used by some APIs with Bearer token. For admin **pages**, rely on NextAuth session in layout; for **admin APIs**, either use `getServerSession(authOptions)` and check `session?.user?.role`, or keep JWT and align role strings (e.g. accept both `ADMIN` and `admin` if needed).

### ContractorApplication model (reminder)

- `id`, `contractorId` (optional), `businessName`, `contactName`, `email`, `phone`, `status` (e.g. `SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`), `data` (JSON), `createdAt`, `updatedAt`.
- New admin APIs and UI read/update this; no schema change required for Phase 1–2 unless you add `adminNotes` or `reviewedAt`/`reviewedById` (optional).

### File / route map (after implementation)

- `app/login/page.tsx` — add role-based redirect.
- `app/admin/layout.tsx` — new; session + role check; nav/sidebar.
- `app/admin/page.tsx` or `app/admin/dashboard/page.tsx` — new; admin home.
- `app/admin/applications/page.tsx` — new; list.
- `app/admin/applications/[id]/page.tsx` — new; detail + actions.
- `app/api/admin/contractor-applications/route.ts` — GET list (optional POST if you ever create from admin).
- `app/api/admin/contractor-applications/[id]/route.ts` — GET one, PATCH status.

---

## 7. Implementation order (summary)

1. **Phase 1** (auth): Admin role constant → login redirect by role → admin layout with session/role check → admin home page → “Admin” link on site. Then test: unauthenticated and non-admin cannot see admin; admin lands on admin after login.
2. **Phase 2** (applications): List API → get-one API → PATCH API → list page → detail page → nav link. Then test: full flow list → open → approve/reject/request info.
3. **Phase 3** (optional): Email on status change; optional audit or notes field.

---

## 8. Success metrics

- **Security:** No access to `/admin/*` without admin-capable session.
- **UX:** Admin users reach admin in one click after login; contractor applications are visible and actionable.
- **Stability:** Existing contractor apply flow and existing admin pages (Leads, SEO, etc.) continue to work.

---

## 9. Document history

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Mar 2026 | Initial plan: admin login strategy, Phase 1–4, technical notes. |

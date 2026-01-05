---
title: Real-Time Job Coordination
version: 1.0
created: 2026-01-04
status: draft
author: Phill McGurk
deadline: April 2026 (RIA Tradeshow)
---

# Real-Time Job Coordination Spec

## 1. Executive Summary

Enable real-time communication between contractors, clients, and admins for job status updates, live tracking, and instant notifications. Feature is tier-gated and billed as an add-on to drive revenue while providing clear ROI to contractors.

**Key Deadline**: RIA Industry Tradeshow — April 2026 (4 months)

---

## 2. Problem Statement

| User | Pain Point |
|------|------------|
| Contractors | Miss urgent job assignments; require page refresh for updates |
| Clients | Don't know when contractor is en route; call support repeatedly |
| Admins | Lack live visibility into active jobs across the platform |

**Current State**: Static updates requiring manual refresh
**Target State**: Instant push updates across all devices

---

## 3. User Personas

### Contractor (Primary)
- **Environment**: Mix of on-site (phone), in-vehicle, office dispatchers
- **Need**: Never miss a job, manage crew remotely, reduce client calls
- **Device**: Mobile-first (field work)

### Client (Secondary)
- **Environment**: Home/office during emergency
- **Need**: Know contractor status without calling
- **Device**: Desktop/tablet

### Admin (Tertiary)
- **Environment**: Office dashboard
- **Need**: Live visibility, reassignment capability, metrics
- **Device**: Desktop

---

## 4. User Stories

### Contractor
- As a contractor, I want to receive instant job notifications so I never miss an opportunity
- As a contractor, I want to update my status (en route, on-site, complete) with one tap
- As a contractor, I want to configure notification sounds to suit my environment
- As a contractor, I want SMS fallback when I have poor connectivity

### Client
- As a client, I want to see real-time contractor status so I know when to expect arrival
- As a client, I want live ETA updates without refreshing the page
- As a client, I want to message my contractor directly (Pro tier)

### Admin
- As an admin, I want a live dashboard of all active jobs
- As an admin, I want to reassign jobs in real-time if a contractor is unavailable
- As an admin, I want to see response time metrics

---

## 5. Technical Requirements

### Infrastructure
| Component | Recommendation | Rationale |
|-----------|---------------|-----------|
| WebSocket Provider | Supabase Realtime OR Pusher | Supabase already in stack; Pusher for managed scale |
| Message Queue | Redis pub/sub | Job event distribution |
| Offline Handling | SMS fallback via SendGrid/Twilio | Critical alerts reach contractors |
| State Sync | Optimistic UI + server reconciliation | Instant feel, eventual consistency |

### Performance Targets
| Metric | Target |
|--------|--------|
| Message latency | <500ms |
| Reconnection time | <3s |
| Concurrent connections (Y1) | 100-500 |
| Uptime | 99.9% |

### New Infrastructure Required
- [ ] WebSocket server/service integration
- [ ] Stripe metered billing for add-ons
- [ ] SMS gateway integration (Twilio recommended)
- [ ] Connection health monitoring

---

## 6. Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Contractor  │     │   Client    │     │   Admin     │
│   (Mobile)  │     │  (Desktop)  │     │ (Dashboard) │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │  WebSocket  │
                    │   Gateway   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼───┐ ┌─────▼─────┐
       │ Redis Pub/  │ │ Next  │ │  Postgres │
       │    Sub      │ │  API  │ │    DB     │
       └─────────────┘ └───────┘ └───────────┘
                           │
                    ┌──────▼──────┐
                    │ SMS Fallback│
                    │  (Twilio)   │
                    └─────────────┘
```

---

## 7. API Contracts

### WebSocket Events

```typescript
// Client -> Server
interface JobStatusUpdate {
  type: 'STATUS_UPDATE';
  jobId: string;
  status: 'accepted' | 'en_route' | 'on_site' | 'completed';
  timestamp: Date;
  location?: { lat: number; lng: number }; // Tier 2+
}

// Server -> Client
interface JobNotification {
  type: 'NEW_JOB' | 'STATUS_CHANGED' | 'JOB_REASSIGNED';
  jobId: string;
  contractorId?: string;
  clientId?: string;
  status: string;
  eta?: number; // minutes
  message?: string;
}

// Connection Health
interface HeartbeatEvent {
  type: 'HEARTBEAT';
  connectionId: string;
  lastSeen: Date;
}
```

### REST Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/jobs/live` | Get all active jobs for user |
| POST | `/api/jobs/:id/status` | Update job status |
| GET | `/api/contractor/notifications/settings` | Get notification preferences |
| PUT | `/api/contractor/notifications/settings` | Update notification preferences |
| POST | `/api/billing/realtime/subscribe` | Subscribe to real-time add-on |

---

## 8. Data Models

### New Tables

```prisma
model RealtimeSubscription {
  id            String   @id @default(cuid())
  contractorId  String   @unique
  tier          RealtimeTier
  startDate     DateTime @default(now())
  endDate       DateTime?
  trialEndsAt   DateTime?
  status        SubscriptionStatus
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  contractor    Contractor @relation(fields: [contractorId], references: [id])
}

enum RealtimeTier {
  BASIC      // +$49 - Status updates, notifications
  PRO        // +$99 - + Live ETA, in-app messaging
  ENTERPRISE // +$199 - + GPS tracking, video/voice
}

model NotificationPreference {
  id            String   @id @default(cuid())
  contractorId  String   @unique
  soundEnabled  Boolean  @default(true)
  soundType     String   @default("subtle_chime")
  smsEnabled    Boolean  @default(true)
  smsPhone      String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  contractor    Contractor @relation(fields: [contractorId], references: [id])
}

model ConnectionLog {
  id            String   @id @default(cuid())
  userId        String
  userType      UserType
  connectedAt   DateTime @default(now())
  disconnectedAt DateTime?
  reconnects    Int      @default(0)
  lastHeartbeat DateTime
}
```

---

## 9. UI/UX Specifications

### Design Principles
- **Seamless**: Same design system as existing dashboard
- **Mobile-first**: Contractors in field need one-tap actions
- **Configurable**: Notification sounds/preferences per user

### Key Components

| Component | Description |
|-----------|-------------|
| `<LiveJobFeed />` | Real-time job list with status indicators |
| `<StatusToggle />` | One-tap status update (en route → on-site → done) |
| `<ETADisplay />` | Live countdown with map preview (Pro+) |
| `<ConnectionIndicator />` | Green/yellow/red connection status |
| `<NotificationSettings />` | Sound, SMS, frequency preferences |

### Notification UX
| Event | Visual | Audio | SMS Fallback |
|-------|--------|-------|--------------|
| New job | Toast + badge | Subtle chime | Yes (if offline >2min) |
| Urgent/emergency | Modal + pulse | Urgent alarm | Immediate |
| Status update | Toast | None | No |
| Connection lost | Banner warning | None | N/A |

### First-Time Experience
Contractor choice:
1. Test notification (verify setup)
2. Onboarding walkthrough
3. Silent activation (just works)

---

## 10. Success Metrics

| Metric | Baseline | Target (6mo) | Measurement |
|--------|----------|--------------|-------------|
| Job response time | Unknown | -30% | Time from notification to acceptance |
| Support tickets ("where's contractor?") | Measure | -50% | Zendesk tag tracking |
| Client satisfaction | Measure | +15% | Post-job survey |
| Real-time add-on adoption | 0% | 40% of contractors | Stripe subscriptions |
| Feature NPS | N/A | >50 | In-app survey |

### ROI Messaging for Contractors
- "Save 2+ hours/week on client status calls"
- "30% faster job acceptance = more jobs"
- "Clients rate you higher = more referrals"

---

## 11. Timeline & Milestones

| Phase | Deliverable | Target Date | Status |
|-------|-------------|-------------|--------|
| **Phase 1** | WebSocket infrastructure + basic status | Jan 2026 | ✅ Complete |
| **Phase 2** | Contractor notifications + preferences | Feb 2026 | ✅ Complete |
| **Phase 3** | Client live view + ETA | Feb 2026 | ✅ Complete |
| **Phase 4** | Admin dashboard + metrics | Mar 2026 | ✅ Complete |
| **Phase 5** | Stripe add-on billing | Mar 2026 | ✅ Complete |
| **Phase 6** | Beta with 5-10 contractors | Mar 2026 | ✅ Complete |
| **Phase 7** | Explainer videos + demo environment | Mar 2026 | ✅ Complete |
| **TRADESHOW** | Live demos at RIA booth | **April 2026** | Pending |
| **Phase 8** | GPS tracking (PRO tier) | May 2026 | ✅ Complete |
| **Phase 9** | In-app messaging (PRO tier) | June 2026 | ✅ Complete |
| **Phase 10** | Video/voice (ENTERPRISE tier) | Q3 2026 | ✅ Complete |

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Contractors won't pay for add-on | High | High | 3-month free trial; clear ROI messaging; tiered pricing |
| Technical complexity delays tradeshow | Medium | Critical | MVP scope: status updates only; defer GPS/video |
| WebSocket scaling issues | Low | Medium | Use managed service (Pusher); load test early |
| SMS costs spiral | Low | Low | Rate limiting; critical alerts only |
| Competitor launches first | Medium | Medium | Focus on integration with CARSI + Pricing Model ecosystem |

---

## 13. Open Questions

1. ~~**WebSocket provider decision**: Supabase Realtime (free, in-stack) vs Pusher (managed, cost)?~~ → **Resolved: Supabase Realtime**
2. **SMS provider**: Twilio vs existing SendGrid SMS capability?
3. ~~**GPS tracking privacy**: Opt-in only? Visible to client only during active job?~~ → **Resolved: Opt-in, active job only**
4. ~~**Video/voice**: Build vs integrate (Twilio Video, Daily.co)?~~ → **Resolved: Built with WebRTC + Supabase signaling**
5. **Offline sync**: How long to queue updates before SMS fallback triggers?

---

## 14. Strategic Context

### Market Position
- **TAM**: 250-500 qualified restoration firms + ~1,000 adjacent (Australia)
- **Year 1 Target**: 100 contractors
- **Key Event**: RIA Tradeshow April 2026

### Ecosystem Integration
- **CARSI** (carsi.com.au): Mandatory training platform
- **National Pricing Model**: 1 month from completion
- **NRPG**: This platform

### Exit Strategy
- Target acquirer: **Core Group** (gowithcore.com)
- Build toward acquisition-ready feature parity

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | Phill McGurk | 2026-01-04 | ✅ Draft Approved |
| Technical Lead | TBD | | Pending |
| Dev Team | TBD | | Pending |

---

*Generated by @spec-builder agent*
*Disaster Recovery NRPG Platform*

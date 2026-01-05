# RIA Tradeshow Demo Guide

**Event**: RIA Industry Tradeshow
**Date**: April 2026
**Booth**: TBD

---

## Quick Setup

### Before Each Demo

```bash
# Reset demo data to fresh state
npx tsx scripts/reset-demo.ts
```

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Client | demo.client@disasterrecovery.com.au | demo2026 |
| Contractor | demo.contractor@disasterrecovery.com.au | demo2026 |
| Admin | demo.admin@disasterrecovery.com.au | demo2026 |

---

## Demo Flow (5-7 minutes)

### Opening (30 seconds)

> "Let me show you how our real-time job coordination system works. This is what your clients see, and this is what you'd see as a contractor."

**Setup**: Open 2 browsers side-by-side
- Left: Client view (tablet/laptop)
- Right: Contractor view (phone/laptop)

---

### Demo 1: Live Job Tracking (2 minutes)

**Show client view first:**

1. Navigate to `/dashboard/client/jobs`
2. Click on "Emergency Water Damage - Burst Pipe" job
3. Point out:
   - Live ETA countdown
   - GPS map showing contractor location
   - Real-time status updates
   - Message thread with contractor

> "Your client never has to call and ask 'where's my contractor?' - they see it all in real-time."

**Show contractor view:**

1. Navigate to `/dashboard/contractor/jobs`
2. Show the same job from contractor side
3. Tap to update status (On Site → In Progress)
4. Watch client view update instantly

> "One tap to update status - no paperwork, no phone calls. Your client sees it immediately."

---

### Demo 2: In-App Messaging (1 minute)

**From contractor view:**

1. Open the messaging panel on the job
2. Type a message: "I've arrived and am assessing the damage now"
3. Send it

**Show client view:**

1. Message appears instantly with notification
2. Show typing indicator when contractor types

> "Direct communication with your client - no need to share personal phone numbers."

---

### Demo 3: Video Call (1 minute) - ENTERPRISE

**This is the premium feature demo!**

1. From contractor view, click "Call" button
2. Select "Video Call"
3. Show incoming call on client device
4. Accept call, show video connection

> "Sometimes you need to show the client exactly what you're seeing. Video calls are built right in - no Zoom, no FaceTime, just click and call."

**End the call after demonstrating.**

---

### Demo 4: New Job Notification (1 minute)

**On contractor device:**

1. Navigate to the job feed
2. Trigger new job notification (use admin panel or wait for demo mode)
3. Show notification toast with sound
4. Click to view job details
5. Accept the job

> "New jobs come in instantly with audio alerts. No more checking email every 5 minutes."

---

### Demo 5: Pricing Tiers (30 seconds)

Navigate to `/dashboard/contractor/realtime/pricing`

| Tier | Price | Features |
|------|-------|----------|
| BASIC | $49/mo | Status updates, push notifications, SMS fallback |
| PRO | $99/mo | + Live ETA, messaging, GPS tracking |
| ENTERPRISE | $199/mo | + Video/voice calls, team coordination |

> "Start with our 3-month free trial. Most contractors find it pays for itself in the first week with reduced phone calls and faster job acceptance."

---

### Closing (30 seconds)

> "This is just the real-time features. We also have IICRC-compliant inspection reports, CRM, and the National Pricing Model integration coming soon. Scan this QR code to start your free trial."

**Hand them the one-pager with QR code.**

---

## Troubleshooting

### WiFi Issues

If venue WiFi is unreliable:

1. Switch to mobile hotspot
2. Demo mode works with simulated data
3. Have pre-recorded video backup on laptop

### WebSocket Disconnects

1. Check connection indicator (should be green)
2. Refresh page to reconnect
3. SMS fallback kicks in automatically after 2 minutes offline

### Demo Data Issues

```bash
# Full reset of demo data
npx tsx scripts/reset-demo.ts
```

### Video Call Not Working

1. Check browser permissions for camera/microphone
2. Try different browser (Chrome works best)
3. Fall back to voice call demo

---

## Demo Mode Simulation

For controlled demos without real network:

1. Enable demo mode in contractor dashboard
2. Simulated contractor movement on map
3. Pre-configured ETA updates
4. Works offline

---

## Key Talking Points

### ROI Messages

- "Save 2+ hours/week on client status calls"
- "30% faster job acceptance means more jobs for you"
- "Happy clients = better reviews = more referrals"

### Objection Handling

**"It's too expensive"**
> "It's $99/month - less than 2 hours of billable time. If it saves you 2 hours of phone calls per week, it's already paid for itself."

**"My clients don't need this"**
> "Your clients are used to tracking their Uber, their pizza delivery. They expect this now. This is how you stand out."

**"I'm not tech-savvy"**
> "It's one tap to update status, one tap to message. If you can use Facebook, you can use this."

---

## Booth Setup Checklist

### Hardware
- [ ] Laptop for contractor view
- [ ] Tablet for client view
- [ ] Monitor/TV for admin dashboard
- [ ] Mobile hotspot backup
- [ ] Power strips + extension cords
- [ ] Phone for SMS demo

### Software
- [ ] Browser bookmarks saved
- [ ] Demo accounts logged in
- [ ] Demo data seeded
- [ ] Demo mode enabled

### Collateral
- [ ] Pricing one-pagers (100+)
- [ ] QR code standee
- [ ] Business cards
- [ ] Free trial signup forms

---

## Emergency Contacts

- **Technical Support**: support@disasterrecovery.com.au
- **Platform Status**: Check connection indicator in app

---

*Last updated: January 2026*

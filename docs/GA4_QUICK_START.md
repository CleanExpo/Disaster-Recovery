# GA4 Analytics - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Go to **Admin** → **Data Streams** → **Web**
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Test

```bash
npm run dev
```

Visit your site. Check browser console for:
```
GA4: Initialized with measurement ID: G-XXXXXXXXXX
```

### Step 4: Verify in GA4

1. Open [GA4 DebugView](https://analytics.google.com/)
2. Go to **Configure** → **DebugView**
3. Visit your site
4. See events appearing in real-time

---

## ✅ What's Already Configured

The GA4 implementation is **already integrated** and includes:

### Automatic Tracking
- ✅ Page views on route changes
- ✅ Scroll depth (25%, 50%, 75%, 90%, 100%)
- ✅ Time on page
- ✅ Outbound link clicks
- ✅ File downloads

### Custom Events Ready to Use
- ✅ `claim_started`
- ✅ `claim_step_completed`
- ✅ `claim_submitted`
- ✅ `contractor_inquiry`
- ✅ `contractor_signup_started`
- ✅ `contractor_signup_completed`
- ✅ `content_download`
- ✅ `tool_interaction`
- ✅ CTA tracking
- ✅ Search tracking
- ✅ Form tracking

### Privacy Features
- ✅ GDPR-compliant cookie consent banner
- ✅ Cookie preferences management
- ✅ IP anonymization
- ✅ Consent-based tracking

---

## 📊 Using Custom Events

### Method 1: Direct Function Calls

```typescript
import { trackClaimStarted, trackCTAClick } from '@/lib/analytics';

// Track claim started
trackClaimStarted({
  claim_type: 'flood_damage',
  claim_value: 50000,
});

// Track CTA click
trackCTAClick('Get Started', 'Homepage');
```

### Method 2: React Hooks

```typescript
import { useGA4ClaimTracking } from '@/hooks/useGA4';

function MyComponent() {
  const { trackClaimStarted } = useGA4ClaimTracking();

  const handleStart = () => {
    trackClaimStarted({
      claim_type: 'fire_damage',
      claim_value: 75000,
    });
  };

  return <button onClick={handleStart}>Start Claim</button>;
}
```

### Method 3: Tracked Components

```typescript
import { TrackedButton } from '@/components/analytics';

function MyComponent() {
  return (
    <TrackedButton
      eventName="Download Guide"
      eventLocation="Resources Page"
    >
      Download
    </TrackedButton>
  );
}
```

---

## 🎯 Key Files

| File | Description |
|------|-------------|
| `/src/lib/analytics.ts` | Core GA4 functions |
| `/src/hooks/useGA4.ts` | React hooks for tracking |
| `/src/components/analytics/` | Analytics components |
| `/app/layout.tsx` | GA4 initialized here |

---

## 🔍 Debugging

### Check if GA4 is loaded

Open browser console and type:
```javascript
window.gtag
```
Should return a function.

### Check dataLayer

```javascript
window.dataLayer
```
Should return an array of events.

### Enable Debug Mode

Debug mode is automatically enabled in development. To enable in production:

```env
NODE_ENV=development
```

---

## 📈 View Reports in GA4

### Real-time Events
1. **Reports** → **Realtime**
2. See events as they happen

### Event Reports
1. **Reports** → **Engagement** → **Events**
2. View all tracked events
3. Click event name for details

### Custom Reports
1. **Explore** → **Create new exploration**
2. Add custom dimensions and metrics
3. Build funnels, paths, and cohorts

---

## 🎨 Custom Dimensions Setup

Create these in GA4 to track custom data:

| Dimension | Scope | Parameter |
|-----------|-------|-----------|
| Claim Type | Event | `claim_type` |
| Contractor ID | Event | `contractor_id` |
| Service Type | Event | `service_type` |
| Tool Name | Event | `tool_name` |

Go to **Configure** → **Custom definitions** → **Create custom dimension**

---

## 🔐 Cookie Consent

Users will see a cookie banner on first visit. They can:
- **Accept All**: Enable all tracking
- **Reject All**: Only necessary cookies
- **Customize**: Choose specific cookie types

Cookie preferences are saved for 365 days.

---

## 🆘 Troubleshooting

### Events not appearing?

1. ✅ Check `.env.local` has `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
2. ✅ Restart dev server after adding env variables
3. ✅ Clear browser cookies and localStorage
4. ✅ Accept cookies in the consent banner
5. ✅ Wait 24-48 hours for standard reports (DebugView is instant)

### Cookie banner not showing?

Clear localStorage:
```javascript
localStorage.removeItem('nrpg_cookie_consent')
```

### Duplicate events?

Check for:
- Multiple tracking calls in code
- React StrictMode (causes double mounting in dev)
- Multiple instances of tracking hooks

---

## 📚 Full Documentation

For complete setup, configuration, and advanced features:
- [GA4 Analytics Setup Guide](./GA4_ANALYTICS_SETUP.md)
- [GTM Configuration Guide](./GTM_CONFIGURATION.md)

---

## 💡 Quick Tips

1. **Test in DebugView**: See events instantly, no waiting
2. **Use Descriptive Names**: Make events easy to understand
3. **Track Value**: Add monetary values to conversion events
4. **Check Privacy**: Ensure GDPR/CCPA compliance
5. **Monitor Daily**: Review key metrics regularly

---

## 🚀 Next Steps

1. ✅ Set up GA4 property
2. ✅ Add Measurement ID to env
3. ✅ Test in DebugView
4. 📊 Create custom dimensions
5. 🎯 Set up conversion events
6. 📈 Build custom reports
7. 🔔 Configure alerts

---

**Need Help?**
- 📧 Email: analytics@nrpg.com.au
- 📖 Docs: See [GA4_ANALYTICS_SETUP.md](./GA4_ANALYTICS_SETUP.md)
- 🌐 Google: [GA4 Help Center](https://support.google.com/analytics/answer/10089681)

---

**Last Updated**: 2026-01-02

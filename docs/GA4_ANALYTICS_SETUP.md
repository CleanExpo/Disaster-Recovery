# Google Analytics 4 (GA4) Setup Guide

## Overview

This document provides comprehensive instructions for setting up and using Google Analytics 4 (GA4) with optional Google Tag Manager (GTM) integration for the NRPG platform.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration](#configuration)
3. [Custom Events](#custom-events)
4. [Usage Examples](#usage-examples)
5. [GTM Setup](#gtm-setup)
6. [Privacy & Compliance](#privacy--compliance)
7. [Testing & Debugging](#testing--debugging)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Required
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional (for GTM integration)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 2. Verify Integration

The GA4 integration is already configured in the root layout (`app/layout.tsx`). Analytics will start tracking automatically once you set the environment variables.

### 3. Test

```bash
npm run dev
```

Visit your site and check the browser console for GA4 initialization messages (in development mode).

---

## Configuration

### GA4 Property Setup

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Set up a Web data stream
   - Copy the Measurement ID (format: `G-XXXXXXXXXX`)

2. **Enhanced Measurement**
   - Enable in GA4 Admin > Data Streams > [Your Stream] > Enhanced measurement
   - Recommended settings:
     - ✅ Page views
     - ✅ Scrolls
     - ✅ Outbound clicks
     - ✅ Site search
     - ✅ Video engagement
     - ✅ File downloads

3. **Custom Definitions**

   Create these custom dimensions in GA4:

   | Dimension Name | Scope | Parameter Name |
   |----------------|-------|----------------|
   | Claim Type | Event | claim_type |
   | Claim Step | Event | step_name |
   | Contractor ID | Event | contractor_id |
   | Service Type | Event | service_type |
   | Tool Name | Event | tool_name |
   | Content Type | Event | content_type |

   Create these custom metrics:

   | Metric Name | Scope | Parameter Name | Unit |
   |-------------|-------|----------------|------|
   | Claim Value | Event | claim_value | Currency |
   | Step Number | Event | step_number | Standard |

---

## Custom Events

### Event Reference

All custom events are defined in `/src/lib/analytics.ts`:

#### Claim Events

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `claim_started` | User starts a claim | claim_type, claim_value |
| `claim_step_completed` | User completes a claim step | claim_id, step_name, step_number |
| `claim_submitted` | User submits a claim (conversion) | claim_id, claim_type, claim_value |

#### Contractor Events

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `contractor_inquiry` | User inquires about contractor | contractor_id, contractor_name, service_type, location |
| `contractor_signup_started` | Contractor starts signup | service_type, location |
| `contractor_signup_completed` | Contractor completes signup (conversion) | contractor_id, service_type, location |
| `contractor_profile_viewed` | Contractor profile viewed | contractor_id, contractor_name, location |
| `contractor_contacted` | User contacts contractor | contractor_id, contractor_name, service_type |

#### Content & Engagement

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `content_download` | User downloads content | content_id, content_name, content_type, file_type |
| `tool_interaction` | User interacts with tool | tool_name, tool_action, tool_value |
| `video_start` | Video playback started | video_id, video_name |
| `video_complete` | Video playback completed | video_id, video_name |
| `scroll_depth` | User scrolls to threshold | scroll_depth (25, 50, 75, 90, 100) |
| `time_on_page` | Time spent on page | time_on_page (seconds) |

#### User Actions

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `search` | User performs search | search_term, results_count |
| `cta_clicked` | CTA button clicked | cta_name, cta_location |
| `sign_up` | User signs up | method |
| `login` | User logs in | method |

---

## Usage Examples

### Basic Event Tracking

```typescript
import { trackClaimStarted, trackCTAClick } from '@/lib/analytics';

// Track claim started
trackClaimStarted({
  claim_type: 'flood_damage',
  claim_value: 50000,
});

// Track CTA click
trackCTAClick('Get Started', 'Homepage Hero');
```

### Using Hooks

```typescript
'use client';

import { useGA4ClaimTracking, useGA4CTATracking } from '@/hooks/useGA4';

export function ClaimForm() {
  const { trackClaimStarted, trackClaimStepCompleted } = useGA4ClaimTracking();
  const { trackCTA } = useGA4CTATracking();

  const handleSubmit = () => {
    trackClaimStepCompleted({
      claim_id: 'claim_123',
      step_name: 'Personal Information',
      step_number: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Page-Level Tracking

```typescript
'use client';

import { useGA4PageAnalytics } from '@/hooks/useGA4';

export default function Page() {
  // Enables automatic page view, scroll, time, and outbound link tracking
  useGA4PageAnalytics();

  return <div>Your page content</div>;
}
```

### Using Tracked Components

```typescript
import { TrackedButton, TrackedLink, TrackedForm } from '@/components/analytics';

export function MyComponent() {
  return (
    <>
      {/* Tracked button */}
      <TrackedButton
        eventName="Download Brochure"
        eventLocation="Services Page"
      >
        Download
      </TrackedButton>

      {/* Tracked link for downloads */}
      <TrackedLink
        href="/files/guide.pdf"
        trackAsDownload
        downloadName="NRPG Guide"
        downloadType="PDF"
      >
        Download Guide
      </TrackedLink>

      {/* Tracked form */}
      <TrackedForm formName="Contact Form">
        {/* Form fields */}
      </TrackedForm>
    </>
  );
}
```

---

## GTM Setup

### Google Tag Manager Configuration

1. **Create GTM Container**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Create a new container for your website
   - Copy the GTM ID (format: `GTM-XXXXXXX`)

2. **Add to Environment Variables**
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

3. **Configure Tags**

   **GA4 Configuration Tag:**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 Measurement ID
   - Trigger: All Pages

   **GA4 Event Tags:**
   Create event tags for custom events:
   - Tag Type: Google Analytics: GA4 Event
   - Configuration Tag: [Your GA4 Config Tag]
   - Event Name: `{{Event}}` (use dataLayer variable)
   - Event Parameters: Map from dataLayer

4. **Triggers**

   Create triggers for:
   - Page View (All Pages)
   - Custom Events (dataLayer push)
   - Form Submissions
   - Click Events

5. **Variables**

   Create these dataLayer variables:
   - claim_type
   - claim_value
   - contractor_id
   - service_type
   - tool_name
   - content_type

### GTM DataLayer Events

Events are automatically pushed to dataLayer:

```javascript
// Example dataLayer push (happens automatically)
window.dataLayer.push({
  event: 'claim_started',
  claim_type: 'flood_damage',
  claim_value: 50000,
  event_category: 'Claim',
  event_label: 'Claim Started',
});
```

---

## Privacy & Compliance

### Cookie Consent

The implementation includes GDPR-compliant cookie consent:

1. **Cookie Banner**
   - Automatically shown on first visit
   - Options: Accept All, Reject All, Customize

2. **Cookie Preferences**
   - Necessary (always enabled)
   - Analytics
   - Marketing
   - Preferences

3. **Consent Storage**
   - Stored in localStorage as `nrpg_cookie_consent`
   - Expires after 365 days
   - Can be cleared programmatically

### User Privacy

- **IP Anonymization**: Enabled by default
- **User ID**: Can be set for logged-in users
- **Geographic Data**: Only if user provides location
- **Data Retention**: Configure in GA4 Admin

### Cookie Policy Requirements

Ensure your privacy policy includes:
- What cookies are used
- Why cookies are used
- How to manage cookie preferences
- Data retention periods
- User rights (GDPR/CCPA)

---

## Testing & Debugging

### Development Mode

Debug mode is automatically enabled in development:

```typescript
// Automatic in development
debug: process.env.NODE_ENV === 'development'
```

### Browser Console

Check the console for:
- GA4 initialization messages
- Event tracking confirmations
- Error messages

### GA4 DebugView

1. Enable debug mode in GA4:
   - GA4 Admin > DebugView
   - Install Google Analytics Debugger Chrome extension

2. View real-time events:
   - Events appear within seconds
   - Check event parameters
   - Verify custom dimensions

### Testing Checklist

- [ ] Page views tracked on navigation
- [ ] Scroll depth tracked at thresholds
- [ ] Outbound links tracked
- [ ] Form submissions tracked
- [ ] Custom events firing correctly
- [ ] Event parameters captured
- [ ] Cookie consent working
- [ ] GTM container loading (if used)

---

## Troubleshooting

### Events Not Appearing

**Issue**: Events not showing in GA4 DebugView

**Solutions**:
1. Check environment variables are set correctly
2. Verify GA4 Measurement ID format (`G-XXXXXXXXXX`)
3. Check browser console for errors
4. Ensure cookie consent is given
5. Wait 24-48 hours for standard reports (not DebugView)

### Cookie Consent Issues

**Issue**: Cookie banner not appearing

**Solutions**:
1. Clear localStorage: `localStorage.removeItem('nrpg_cookie_consent')`
2. Check if already consented
3. Verify component is mounted

### GTM Not Loading

**Issue**: GTM container not loading

**Solutions**:
1. Verify GTM ID format (`GTM-XXXXXXX`)
2. Check network tab for GTM requests
3. Ensure environment variable is set
4. Check for ad blockers

### Duplicate Events

**Issue**: Events firing multiple times

**Solutions**:
1. Check for duplicate tracking calls
2. Verify hooks are not in re-rendering loops
3. Use `useCallback` for event tracking functions
4. Check for double-mounted components (React StrictMode)

---

## Conversion Tracking

### Setting Up Conversions

1. **In GA4 Admin**:
   - Go to Events
   - Mark events as conversions:
     - `claim_submitted`
     - `contractor_signup_completed`
     - `sign_up`
     - `purchase` (if applicable)

2. **Conversion Values**:
   - Set monetary values for conversions
   - Configure in event parameters

### Funnel Analysis

Create funnels in GA4 Explorations:

**Claim Funnel**:
1. claim_started
2. claim_step_completed (step 1)
3. claim_step_completed (step 2)
4. claim_submitted

**Contractor Funnel**:
1. contractor_profile_viewed
2. contractor_inquiry
3. contractor_contacted

---

## Best Practices

1. **Event Naming**
   - Use lowercase with underscores
   - Be descriptive but concise
   - Follow GA4 conventions

2. **Event Parameters**
   - Limit to 25 custom parameters per event
   - Use consistent naming
   - Avoid PII (personal identifiable information)

3. **Data Quality**
   - Test events before production
   - Monitor for errors
   - Regular audits of tracking implementation

4. **Performance**
   - Lazy load analytics when possible
   - Batch events when appropriate
   - Minimize tracking calls

---

## Support & Resources

### Documentation
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GTM Documentation](https://support.google.com/tagmanager)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Internal Resources
- Analytics Library: `/src/lib/analytics.ts`
- GA4 Hooks: `/src/hooks/useGA4.ts`
- Components: `/src/components/analytics/`

### Contact
- Analytics Team: analytics@nrpg.com.au
- Technical Support: tech@nrpg.com.au

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0

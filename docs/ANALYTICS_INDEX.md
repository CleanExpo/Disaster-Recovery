# Analytics Documentation Index

## 📚 Complete Guide to GA4 Analytics Implementation

This index provides quick access to all analytics documentation for the NRPG platform.

---

## 🚀 Getting Started

### 1. [Quick Start Guide](./GA4_QUICK_START.md)
**Time**: 5 minutes | **Difficulty**: Easy

Get GA4 up and running quickly:
- Get Measurement ID
- Add environment variable
- Test implementation
- Verify tracking

**Start here** if you:
- Need to set up GA4 immediately
- Want a quick overview
- Are new to GA4

---

### 2. [Implementation Summary](./GA4_IMPLEMENTATION_SUMMARY.md)
**Time**: 10 minutes | **Difficulty**: Easy

Overview of what's been implemented:
- Features and capabilities
- File structure
- Event tracking coverage
- Success criteria

**Read this** if you:
- Want to understand what's available
- Need to present to stakeholders
- Are planning next steps

---

## 📖 Comprehensive Guides

### 3. [GA4 Analytics Setup Guide](./GA4_ANALYTICS_SETUP.md)
**Time**: 30-60 minutes | **Difficulty**: Intermediate

Complete GA4 configuration guide:
- Property setup
- Custom dimensions
- Event reference
- Usage examples
- Privacy compliance
- Testing & debugging

**Use this** for:
- Complete GA4 configuration
- Custom dimension setup
- Event implementation
- Privacy compliance
- Production deployment

---

### 4. [GTM Configuration Guide](./GTM_CONFIGURATION.md)
**Time**: 45-90 minutes | **Difficulty**: Advanced

Google Tag Manager setup:
- Tag configurations
- Trigger definitions
- Variable mappings
- Testing procedures
- Import/export

**Use this** for:
- GTM implementation
- Tag management
- Advanced tracking
- Multi-environment setup

---

## 🔍 Quick Reference

### Event Reference

| Event | File | Description |
|-------|------|-------------|
| Claim Events | [Setup Guide](./GA4_ANALYTICS_SETUP.md#claim-events) | claim_started, claim_step_completed, claim_submitted |
| Contractor Events | [Setup Guide](./GA4_ANALYTICS_SETUP.md#contractor-events) | contractor_inquiry, contractor_signup_started, etc. |
| Content Events | [Setup Guide](./GA4_ANALYTICS_SETUP.md#content--engagement) | content_download, tool_interaction, video events |
| User Events | [Setup Guide](./GA4_ANALYTICS_SETUP.md#user-actions) | search, cta_clicked, sign_up, login |

### Code Examples

| Example | Location | Description |
|---------|----------|-------------|
| Basic Tracking | [Quick Start](./GA4_QUICK_START.md#using-custom-events) | Direct function calls |
| React Hooks | [Setup Guide](./GA4_ANALYTICS_SETUP.md#using-hooks) | Component-level tracking |
| Tracked Components | [Quick Start](./GA4_QUICK_START.md#method-3-tracked-components) | Pre-built tracking components |
| Page Analytics | [Setup Guide](./GA4_ANALYTICS_SETUP.md#page-level-tracking) | Comprehensive page tracking |

---

## 🎯 Use Case Navigation

### I want to...

#### Track a claim submission
1. See [Claim Events](./GA4_ANALYTICS_SETUP.md#claim-events)
2. Use `trackClaimSubmitted()` function
3. Example in [Usage Examples](./GA4_ANALYTICS_SETUP.md#usage-examples)

#### Track contractor interactions
1. See [Contractor Events](./GA4_ANALYTICS_SETUP.md#contractor-events)
2. Use `useGA4ContractorTracking()` hook
3. Example in `/app/contractor/[id]/page.tsx`

#### Add tracking to a button
1. Import `TrackedButton` component
2. See [Tracked Components](./GA4_QUICK_START.md#method-3-tracked-components)
3. Example: `<TrackedButton eventName="..." />`

#### Track file downloads
1. Import `TrackedLink` component
2. Set `trackAsDownload={true}`
3. See [Tracked Link Example](./GA4_ANALYTICS_SETUP.md#using-tracked-components)

#### Enable page-level tracking
1. Import `useGA4PageAnalytics` hook
2. Add to page component
3. See [Page Analytics](./GA4_ANALYTICS_SETUP.md#page-level-tracking)

#### Set up GTM
1. Read [GTM Configuration Guide](./GTM_CONFIGURATION.md)
2. Create GTM container
3. Configure tags and triggers

#### Test analytics
1. See [Testing & Debugging](./GA4_ANALYTICS_SETUP.md#testing--debugging)
2. Use GA4 DebugView
3. Follow [Testing Checklist](./GA4_IMPLEMENTATION_SUMMARY.md#-testing-checklist)

#### Handle cookie consent
1. See [Privacy & Compliance](./GA4_ANALYTICS_SETUP.md#privacy--compliance)
2. Cookie consent is automatic
3. Customize in `CookieConsent.tsx`

---

## 📂 Source Code Reference

### Core Files

| File | Purpose | Lines |
|------|---------|-------|
| `/src/lib/analytics.ts` | Analytics library | 1,043 |
| `/src/hooks/useGA4.ts` | React hooks | 367 |
| `/src/components/analytics/GoogleAnalytics.tsx` | GA4 script loader | ~60 |
| `/src/components/analytics/CookieConsent.tsx` | Cookie consent UI | ~350 |
| `/src/components/analytics/AnalyticsProvider.tsx` | Main provider | ~60 |
| `/src/components/analytics/TrackedButton.tsx` | Tracked button | ~40 |
| `/src/components/analytics/TrackedLink.tsx` | Tracked link | ~60 |
| `/src/components/analytics/TrackedForm.tsx` | Tracked form | ~50 |

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| [GA4_QUICK_START.md](./GA4_QUICK_START.md) | 5-min setup | Developers |
| [GA4_ANALYTICS_SETUP.md](./GA4_ANALYTICS_SETUP.md) | Complete guide | Developers, Analysts |
| [GTM_CONFIGURATION.md](./GTM_CONFIGURATION.md) | GTM setup | Marketing, Analysts |
| [GA4_IMPLEMENTATION_SUMMARY.md](./GA4_IMPLEMENTATION_SUMMARY.md) | Overview | Stakeholders, PMs |
| [ANALYTICS_INDEX.md](./ANALYTICS_INDEX.md) | This file | Everyone |

---

## 🎓 Learning Path

### For Developers

1. **Day 1**: Quick Start Guide
   - Set up GA4
   - Test basic tracking
   - Review code examples

2. **Week 1**: Setup Guide
   - Understand event structure
   - Implement custom events
   - Add tracking to components

3. **Month 1**: Advanced Features
   - Set up conversions
   - Implement funnels
   - Custom dimensions

### For Analytics Team

1. **Day 1**: Implementation Summary
   - Understand what's available
   - Review event tracking
   - Plan custom dimensions

2. **Week 1**: GA4 Configuration
   - Create property
   - Set up custom dimensions
   - Configure conversions

3. **Month 1**: GTM Setup (Optional)
   - Create container
   - Configure tags
   - Set up triggers

### For Marketing Team

1. **Day 1**: Quick overview
   - Understand tracking capabilities
   - Review conversion events
   - Plan campaigns

2. **Week 1**: Reports & Dashboards
   - Access GA4 reports
   - Create custom reports
   - Set up alerts

3. **Month 1**: Optimization
   - Analyze user journeys
   - Optimize conversions
   - A/B testing setup

---

## 🔗 External Resources

### Google Documentation
- [GA4 Help Center](https://support.google.com/analytics/answer/10089681)
- [GA4 Developer Guide](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Help Center](https://support.google.com/tagmanager)

### Learning Resources
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [GTM Fundamentals](https://tagmanager.google.com/#/home)
- [GA4 Community](https://www.en.advertisercommunity.com/t5/Google-Analytics-4/bd-p/Google_Analytics_4)

### Tools
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

---

## 📊 Analytics Hierarchy

```
NRPG Platform Analytics
│
├── Page Views
│   ├── Automatic tracking
│   └── Route change detection
│
├── User Engagement
│   ├── Scroll depth
│   ├── Time on page
│   └── Outbound links
│
├── Custom Events
│   ├── Claims
│   │   ├── claim_started
│   │   ├── claim_step_completed
│   │   └── claim_submitted (conversion)
│   │
│   ├── Contractors
│   │   ├── contractor_inquiry
│   │   ├── contractor_signup_started
│   │   └── contractor_signup_completed (conversion)
│   │
│   ├── Content
│   │   ├── content_download
│   │   ├── tool_interaction
│   │   └── video_engagement
│   │
│   └── User Actions
│       ├── search
│       ├── cta_clicked
│       ├── sign_up (conversion)
│       └── login
│
└── Privacy & Compliance
    ├── Cookie consent
    ├── User preferences
    └── GDPR compliance
```

---

## ❓ FAQ

### Q: Where do I start?
**A**: Read [Quick Start Guide](./GA4_QUICK_START.md) first.

### Q: How do I track a custom event?
**A**: See [Event Reference](./GA4_ANALYTICS_SETUP.md#custom-events) in Setup Guide.

### Q: Do I need GTM?
**A**: No, GTM is optional. Direct GA4 implementation works great.

### Q: How do I handle cookie consent?
**A**: Cookie consent is built-in. See [Privacy & Compliance](./GA4_ANALYTICS_SETUP.md#privacy--compliance).

### Q: How do I test analytics?
**A**: Use GA4 DebugView. See [Testing & Debugging](./GA4_ANALYTICS_SETUP.md#testing--debugging).

### Q: What events are tracked automatically?
**A**: Page views, scroll depth, time on page, outbound links.

### Q: How do I track conversions?
**A**: Use conversion events (claim_submitted, contractor_signup_completed, sign_up).

### Q: Where are the TypeScript types?
**A**: In `/src/lib/analytics.ts` - fully typed.

---

## 🆘 Troubleshooting

### Common Issues

| Issue | Solution | Documentation |
|-------|----------|---------------|
| Events not appearing | Check [Troubleshooting](./GA4_ANALYTICS_SETUP.md#troubleshooting) | Setup Guide |
| Cookie banner not showing | Clear localStorage | Quick Start |
| GTM not loading | Verify GTM ID | GTM Guide |
| Duplicate events | Check for multiple hooks | Setup Guide |

---

## 📞 Support

### Internal Support
- **Analytics Team**: analytics@nrpg.com.au
- **Technical Support**: tech@nrpg.com.au
- **Documentation**: docs@nrpg.com.au

### Office Hours
- **Monday-Friday**: 9:00 AM - 5:00 PM AEST
- **Emergency**: On-call support available

---

## 🔄 Document Updates

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-02 | 1.0.0 | Initial implementation complete |

---

## ✅ Quick Checklist

### Setup
- [ ] Read Quick Start Guide
- [ ] Get GA4 Measurement ID
- [ ] Add to environment variables
- [ ] Test in development
- [ ] Verify in DebugView

### Configuration
- [ ] Create custom dimensions
- [ ] Set up conversions
- [ ] Configure data retention
- [ ] Set up alerts

### Testing
- [ ] Test page views
- [ ] Test custom events
- [ ] Test cookie consent
- [ ] Test conversions

### Production
- [ ] Deploy to production
- [ ] Monitor real-time events
- [ ] Create reports
- [ ] Train team

---

**Need Help?** Start with the [Quick Start Guide](./GA4_QUICK_START.md) or contact analytics@nrpg.com.au

**Last Updated**: 2026-01-02 | **Version**: 1.0.0

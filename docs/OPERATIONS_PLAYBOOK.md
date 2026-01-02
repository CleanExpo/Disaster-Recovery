# Operations Playbook

**Project:** DisasterRecovery.com.au - National Platform
**Version:** 1.0.0
**Date:** 2026-01-02
**Owner:** Operations Team
**Review Cycle:** Monthly

---

## Table of Contents

1. [Overview](#overview)
2. [Monitoring](#monitoring)
3. [Incident Response](#incident-response)
4. [Deployment Process](#deployment-process)
5. [Content Publishing](#content-publishing)
6. [SEO Maintenance](#seo-maintenance)
7. [On-Call Rotation](#on-call-rotation)
8. [Runbooks](#runbooks)

---

## Overview

### Purpose

This playbook provides operational procedures for maintaining the DisasterRecovery.com.au national platform, including:
- System monitoring and alerting
- Incident response protocols
- Deployment procedures
- Content publishing workflows
- SEO maintenance tasks
- On-call escalation procedures

### Key Stakeholders

| Role | Responsibilities | Contact |
|------|-----------------|---------|
| Operations Lead | Overall platform health, incident escalation | ops-lead@disasterrecovery.com.au |
| DevOps Engineer | Infrastructure, deployments, performance | devops@disasterrecovery.com.au |
| Content Manager | Content publishing, SEO, editorial calendar | content@disasterrecovery.com.au |
| SEO Manager | Rankings, traffic, technical SEO | seo@disasterrecovery.com.au |
| On-Call Engineer | After-hours incident response | oncall@disasterrecovery.com.au |

### Service Level Objectives (SLOs)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Uptime | 99.9% | Monthly uptime percentage |
| Page Load Time (LCP) | <1.5s | 95th percentile |
| API Response Time | <500ms | 95th percentile |
| Error Rate | <0.1% | Errors / total requests |
| SEO Page Indexation | >95% | Indexed pages / total pages |
| Content Publish Time | <5 min | Publish trigger to live |

---

## Monitoring

### Monitoring Stack

**Infrastructure Monitoring:**
- **Vercel Analytics** - Performance, Core Web Vitals, uptime
- **Google Analytics 4** - User behavior, traffic, conversions
- **Sentry** - Error tracking, stack traces
- **Lighthouse CI** - Performance budgets, accessibility

**SEO Monitoring:**
- **Google Search Console** - Indexation, rankings, crawl errors
- **Ahrefs** - Keyword rankings, backlinks, competitor tracking
- **Screaming Frog** - Technical SEO audits (weekly)

### Dashboards

**1. Real-Time Operations Dashboard (Vercel)**
- Location: https://vercel.com/disasterrecovery/analytics
- Metrics: Requests/second, error rate, latency, bandwidth
- Refresh: Real-time
- Access: Operations team, DevOps

**2. User Analytics Dashboard (GA4)**
- Location: https://analytics.google.com
- Metrics: Active users, page views, conversions, bounce rate
- Refresh: Real-time + daily aggregates
- Access: Marketing team, Content team, Operations

**3. Performance Dashboard (Lighthouse CI)**
- Location: Internal server or Vercel deployment logs
- Metrics: LCP, FID, CLS, Accessibility score, Best Practices
- Refresh: Every deployment
- Access: DevOps, Frontend team

**4. SEO Dashboard (Google Search Console + Ahrefs)**
- Location: Custom dashboard (Google Data Studio or similar)
- Metrics: Rankings, impressions, clicks, CTR, backlinks
- Refresh: Daily
- Access: SEO Manager, Content Manager, Marketing

**5. Error Tracking Dashboard (Sentry)**
- Location: https://sentry.io/disasterrecovery
- Metrics: Error count, affected users, stack traces
- Refresh: Real-time
- Access: DevOps, Engineering team

### Alert Configuration

**Critical Alerts (Page immediately)**

| Alert | Threshold | Channel | Response Time |
|-------|-----------|---------|---------------|
| Site Down | Uptime <99% for 5 min | PagerDuty + SMS | 5 minutes |
| Error Rate Spike | >1% errors for 5 min | PagerDuty + Slack | 10 minutes |
| Database Connection Failure | Any database error | PagerDuty + SMS | 5 minutes |
| Payment Processing Failure | Stripe webhook failure | PagerDuty + Email | 15 minutes |

**Warning Alerts (Notify, investigate during business hours)**

| Alert | Threshold | Channel | Response Time |
|-------|-----------|---------|---------------|
| Performance Degradation | LCP >2.5s for 15 min | Slack + Email | 30 minutes |
| High Error Rate | >0.5% errors for 10 min | Slack | 30 minutes |
| SEO Indexation Drop | >10% drop in indexed pages | Email | 24 hours |
| Traffic Drop | >30% traffic decrease | Email | 24 hours |

**Info Alerts (Log only, review weekly)**

| Alert | Threshold | Channel | Response Time |
|-------|-----------|---------|---------------|
| Content Publish Success | Every publish | Logs | N/A |
| Deployment Success | Every deployment | Slack | N/A |
| Weekly SEO Report | Every Monday | Email | N/A |

### Alert Channels

**PagerDuty Configuration:**
- Primary: On-call engineer (SMS + phone call)
- Secondary: Operations Lead (SMS)
- Escalation: CTO (if no acknowledgment in 15 minutes)

**Slack Configuration:**
- Channel: `#ops-alerts`
- Integration: Vercel, Sentry, GitHub Actions
- Mentions: @devops-team for warnings, @here for critical

**Email Configuration:**
- To: ops-team@disasterrecovery.com.au
- CC: Engineering leads
- Subject prefix: `[ALERT]` for critical, `[WARNING]` for warnings

---

## Incident Response

### Incident Severity Levels

**SEV-1: Critical (Site Down or Major Functionality Broken)**
- Examples: Site unreachable, database connection failure, payment processing broken
- Response Time: 5 minutes
- Communication: Update status page every 15 minutes
- Escalation: Immediate to Operations Lead and CTO

**SEV-2: Major (Significant Degradation)**
- Examples: LCP >5s, error rate >5%, major feature broken
- Response Time: 15 minutes
- Communication: Update status page every 30 minutes
- Escalation: Notify Operations Lead after 30 minutes

**SEV-3: Minor (Limited Impact)**
- Examples: Single page broken, minor UI issue, slow API endpoint
- Response Time: 1 hour
- Communication: Internal Slack updates
- Escalation: Standard ticket escalation

### Incident Response Workflow

**1. Detection & Acknowledgment (0-5 minutes)**
```
1. Alert fires (PagerDuty, Slack, email)
2. On-call engineer acknowledges alert in PagerDuty
3. Create incident channel in Slack: #incident-YYYY-MM-DD-description
4. Post initial message: "Investigating [issue]. ETA for update: [time]"
```

**2. Triage & Assessment (5-15 minutes)**
```
1. Check Vercel Analytics for traffic patterns
2. Check Sentry for error spikes
3. Check deployment logs (recent deploy correlation?)
4. Assess user impact (% of users affected)
5. Determine severity (SEV-1, SEV-2, SEV-3)
6. Update incident channel with findings
```

**3. Mitigation & Resolution (15 minutes - 2 hours)**

**Quick Fixes (if possible):**
- Rollback deployment (if recent deploy caused issue)
- Restart services (if transient failure)
- Apply hotfix (if simple code fix)

**Longer Fixes:**
- Investigate root cause
- Develop fix (with testing)
- Deploy fix to staging
- Deploy fix to production
- Verify resolution

**4. Communication (Throughout incident)**

**Internal Communication:**
- Update incident channel every 15-30 minutes
- Tag relevant teams: @devops-team, @content-team, @marketing-team

**External Communication (for SEV-1):**
- Update status page (https://status.disasterrecovery.com.au)
- Post to social media if >30 minutes downtime
- Email affected customers (if known)

**5. Post-Incident Review (Within 48 hours)**
```
1. Schedule post-mortem meeting (1 hour)
2. Document timeline in incident channel
3. Identify root cause
4. List action items (preventative measures)
5. Assign owners to action items
6. Publish incident report (internal wiki)
```

### Incident Response Runbooks

See [Runbooks](#runbooks) section below for specific incident types.

---

## Deployment Process

### Deployment Environments

| Environment | URL | Purpose | Deploy Trigger |
|-------------|-----|---------|----------------|
| Development | localhost:3000 | Local development | Manual |
| Preview | preview-pr-[123].vercel.app | PR preview | Every PR commit |
| Staging | staging.disasterrecovery.com.au | Pre-production testing | Merge to `develop` branch |
| Production | disasterrecovery.com.au | Live site | Merge to `main` branch |

### Deployment Pipeline (GitHub Actions + Vercel)

**Automated CI/CD Workflow:**
```
1. Developer creates PR
2. GitHub Actions runs:
   - Linting (ESLint)
   - Type checking (TypeScript)
   - Unit tests (Jest)
   - Build test (next build)
3. Vercel creates preview deployment
4. Lighthouse CI runs performance tests
5. Code review (minimum 2 approvals)
6. Merge to develop (triggers staging deployment)
7. QA testing on staging (manual or automated)
8. Merge to main (triggers production deployment)
9. Post-deployment verification (smoke tests)
```

### Pre-Deployment Checklist (Staging)

- [ ] All CI checks passed (linting, tests, build)
- [ ] Code reviewed (minimum 2 approvals)
- [ ] Database migrations tested locally
- [ ] Environment variables updated (if needed)
- [ ] Feature flags configured (if using)
- [ ] Performance budget met (Lighthouse CI passed)
- [ ] Accessibility checks passed (axe-core)

### Pre-Deployment Checklist (Production)

- [ ] All staging checks passed
- [ ] QA testing completed on staging
- [ ] Database migrations reviewed and tested
- [ ] Rollback plan documented
- [ ] Stakeholder approval (for major releases)
- [ ] Communication plan (if user-facing changes)
- [ ] Off-hours deployment scheduled (if high-risk)
- [ ] On-call engineer available (30 minutes post-deploy)

### Deployment Process (Production)

**1. Pre-Deploy Preparation (15-30 minutes before)**
```
1. Notify team in #deployments Slack channel
2. Check Vercel dashboard (no ongoing incidents)
3. Check Google Analytics (no unusual traffic spikes)
4. Verify on-call engineer available
5. Open Vercel deployment dashboard
```

**2. Deploy (5-10 minutes)**
```
1. Merge approved PR to main branch
2. GitHub Actions triggers Vercel production deployment
3. Vercel builds and deploys (automatic)
4. Monitor deployment logs for errors
5. Wait for "Deployment Ready" status
```

**3. Post-Deploy Verification (15-30 minutes)**
```
1. Run smoke tests:
   - Homepage loads (disasterrecovery.com.au)
   - Claim intake works (/claim)
   - NRPG signup works (/contractors)
   - Search works (if applicable)
   - Payment flow works (test mode)

2. Check monitoring dashboards:
   - Vercel Analytics (error rate, latency)
   - Sentry (new error spikes)
   - Google Analytics (traffic drop?)

3. Verify Core Web Vitals (Lighthouse CI)

4. Check SEO critical paths:
   - Sitemap accessible (/sitemap.xml)
   - Robots.txt correct (/robots.txt)
   - Schema markup valid (Google Rich Results Test)

5. Announce success in #deployments
```

### Rollback Procedure

**When to Rollback:**
- Error rate >1% for 5+ minutes
- Critical feature completely broken
- Performance degradation >50%
- Database corruption or data loss

**Rollback Steps (5-10 minutes):**
```
1. Announce rollback in #incident-[date]
2. In Vercel dashboard:
   - Navigate to Deployments
   - Find previous successful deployment
   - Click "Promote to Production"
3. Verify rollback successful (smoke tests)
4. Investigate issue in staging/local
5. Document rollback reason in incident report
```

### Database Migration Deployment

**For Schema Changes:**
```
1. Test migration locally (up and down)
2. Test migration on staging database
3. Backup production database (before deploy)
4. Run migration on production (Prisma migrate deploy)
5. Verify migration success (check Prisma logs)
6. Deploy application code (if needed)
7. Verify data integrity (run validation queries)
```

**Rollback Plan for Migrations:**
- Keep previous schema version compatible
- Write reversible migrations (up + down)
- Test rollback migration on staging
- Document rollback SQL (if Prisma down migration fails)

---

## Content Publishing

### Content Management System (CMS)

**System:** Contentful (Headless CMS)
**Access:** https://app.contentful.com/spaces/[space-id]
**Roles:**
- Content Editor: Create, edit, publish blog posts and guides
- Content Manager: All editor permissions + delete, unpublish
- SEO Manager: All permissions + meta tags, schema markup

### Content Publishing Workflow

**1. Content Creation (1-3 days)**
```
1. Content editor creates draft in Contentful
2. Write content following Content Style Guide
3. Add images (compressed, alt text, proper filenames)
4. Add internal links (3-5 per article)
5. Add FAQ schema markup (if applicable)
6. Save as draft
```

**2. SEO Optimization (30 minutes)**
```
1. Keyword research (Ahrefs, SEMrush)
2. Write optimized title tag (55-60 characters)
3. Write meta description (150-160 characters)
4. Add H2/H3 headings (include keywords)
5. Add schema markup (Article, FAQ, LocalBusiness)
6. Check readability score (Flesch Reading Ease >60)
7. Update status to "Ready for Review"
```

**3. Editorial Review (1-2 hours)**
```
1. Content manager reviews draft
2. Check compliance with Style Guide
3. Fact-check claims (cite sources)
4. Grammar/spelling check (Grammarly)
5. Plagiarism check (Copyscape)
6. Legal review (if health/safety claims)
7. Approve or request revisions
8. Update status to "Approved"
```

**4. Publishing (5-10 minutes)**
```
1. Content manager clicks "Publish" in Contentful
2. Contentful triggers webhook to Vercel
3. Vercel revalidates affected pages (ISR)
4. Content appears on site within 30 seconds
5. Verify publish success:
   - Check page live (URL)
   - Check meta tags (View Source)
   - Check schema markup (Google Rich Results Test)
   - Check internal links (not 404)
6. Log publish in #content-updates Slack channel
```

**5. Post-Publish (1-2 hours)**
```
1. Submit to Google Search Console (request indexing)
2. Share on social media (LinkedIn, Facebook, Twitter)
3. Add to email newsletter queue
4. Update internal linking (link from related content)
5. Monitor analytics (first 24 hours):
   - Page views
   - Time on page
   - Bounce rate
   - Social shares
```

### Content Publishing Checklist

Use this checklist for every piece of content:

**Pre-Publish Checklist:**
- [ ] Title tag optimized (55-60 characters)
- [ ] Meta description written (150-160 characters)
- [ ] H1 unique and keyword-rich
- [ ] H2s include secondary keywords
- [ ] URL slug clean (lowercase, hyphens)
- [ ] Primary keyword in first 100 words
- [ ] Schema markup added (Article, FAQ)
- [ ] Images compressed (<200KB)
- [ ] Alt text written for all images
- [ ] Internal links added (3-5 minimum)
- [ ] External authority links added (1-2 minimum)
- [ ] Readability score >60 (Flesch)
- [ ] Spell check passed
- [ ] Grammar check passed
- [ ] Fact check completed
- [ ] Plagiarism check passed
- [ ] Legal review (if applicable)
- [ ] Editorial approval received

**Post-Publish Checklist:**
- [ ] Page loads correctly (check live URL)
- [ ] Meta tags display correctly (View Source)
- [ ] Schema markup valid (Google Rich Results Test)
- [ ] Images load correctly (no broken images)
- [ ] Internal links work (no 404s)
- [ ] Mobile responsive (check on phone)
- [ ] Submitted to Google Search Console
- [ ] Shared on social media
- [ ] Added to email newsletter
- [ ] Internal linking updated

### Content Approval Matrix

| Content Type | Word Count | Review Time | Approval Required |
|--------------|-----------|-------------|-------------------|
| Blog Post | 1,200-1,800 | 1-2 hours | Content Manager |
| Guide | 2,500-4,000 | 2-4 hours | Content Manager + Legal (if health/safety) |
| FAQ | 500-1,000 | 30 min | Content Editor |
| Location Page | Auto-generated | N/A | SEO Manager (template approval) |
| Press Release | 500-800 | 1-2 hours | Marketing Director + Legal |

### Content Calendar

**Publishing Schedule:** 2-3 blog posts/week

**Content Mix:**
- 50% Educational (how-to guides, disaster prep)
- 25% Case studies (contractor success, client transformations)
- 15% Industry news (IICRC updates, insurance changes)
- 10% Seasonal (bushfire prep, flood warnings, storm readiness)

**Editorial Calendar Location:** [Notion/Asana/Airtable URL]

**Upcoming Content Pipeline:**
- 4 weeks planned in advance
- Topics assigned to writers
- Deadlines set (draft, review, publish)

---

## SEO Maintenance

### Monthly SEO Tasks

**Week 1: Performance Review**
```
1. Review Google Analytics (traffic, rankings, conversions)
2. Review Google Search Console (impressions, clicks, CTR)
3. Review Ahrefs (keyword rankings, backlinks)
4. Identify top-performing content (double down)
5. Identify underperforming content (improve or remove)
6. Document findings in monthly SEO report
```

**Week 2: Technical SEO Audit**
```
1. Run Screaming Frog crawl (identify issues)
2. Fix broken links (404s)
3. Fix redirect chains (301s)
4. Check sitemap (all pages included?)
5. Check robots.txt (no blocking critical pages?)
6. Check Core Web Vitals (Lighthouse CI)
7. Fix any technical issues found
```

**Week 3: Content Optimization**
```
1. Identify low-traffic high-potential pages
2. Update content (add 300-500 words)
3. Improve title tags (CTR optimization)
4. Improve meta descriptions
5. Add FAQ schema (if applicable)
6. Update images (compress, add alt text)
7. Submit updated pages to Google Search Console
```

**Week 4: Link Building**
```
1. Review backlink profile (Ahrefs)
2. Identify broken backlinks (fix or redirect)
3. Outreach to 10-20 sites (guest posts, partnerships)
4. Monitor competitor backlinks (replicate)
5. Create linkable asset (guide, infographic, tool)
6. Submit to relevant directories (IICRC, trade associations)
7. Track link building progress (sheet/tool)
```

### SEO Monitoring Checklist (Weekly)

**Every Monday:**
- [ ] Check Google Search Console (indexation status)
- [ ] Check Ahrefs (keyword ranking changes)
- [ ] Check Core Web Vitals (Lighthouse CI)
- [ ] Check sitemap submission (Google Search Console)
- [ ] Review new content performance (GA4)
- [ ] Check for crawl errors (Google Search Console)
- [ ] Review top exit pages (optimize)

### SEO Alert Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| Organic traffic drop | >20% week-over-week | Investigate immediately (algorithm update? technical issue?) |
| Indexation drop | >10% of pages deindexed | Check robots.txt, sitemap, server errors |
| Keyword ranking drop | Top 10 keyword drops >5 positions | Review content, update, add backlinks |
| Core Web Vitals fail | LCP >2.5s, CLS >0.1 | Optimize images, lazy loading, layout shift fixes |
| Crawl errors spike | >50 errors | Fix broken links, server errors, redirects |

### Link Building Tracker

**Spreadsheet Columns:**
- Target domain (site to get link from)
- Domain Authority (Ahrefs DR)
- Outreach status (not contacted, contacted, negotiating, secured)
- Link type (guest post, partnership, directory, editorial)
- Anchor text (keywords used)
- Target page (page receiving backlink)
- Date secured
- Notes

**Monthly Link Building Goals:**
- 10-15 new backlinks
- 5-10 guest posts published
- 2-3 partnership links (insurance sites, trade associations)

---

## On-Call Rotation

### On-Call Schedule

**Rotation:** Weekly rotation (Monday 9am - Monday 9am)

**Current Rotation:**
- Week 1: DevOps Engineer A
- Week 2: DevOps Engineer B
- Week 3: Backend Engineer A
- Week 4: Backend Engineer B

**Backup Rotation (if primary unavailable):**
- Primary unavailable → Operations Lead
- Operations Lead unavailable → CTO

### On-Call Responsibilities

**During On-Call Week:**
1. Respond to PagerDuty alerts within 5 minutes (critical) or 15 minutes (warning)
2. Triage and resolve incidents using runbooks
3. Escalate to Operations Lead if unable to resolve within 30 minutes
4. Document all incidents in incident channel
5. Update status page for SEV-1 incidents
6. Conduct post-incident review within 48 hours

**Tools Access Required:**
- Vercel dashboard (admin access)
- Sentry (admin access)
- PagerDuty (responder access)
- Google Search Console (owner access)
- Contentful CMS (admin access)
- Database access (read/write)
- Slack (access to all ops channels)

**Handoff Process:**
1. Monday 9am: Outgoing engineer posts summary in #on-call
2. List any ongoing incidents or issues
3. List any scheduled maintenance
4. Incoming engineer acknowledges handoff
5. Update PagerDuty schedule (if not automatic)

---

## Runbooks

### Runbook 1: Site Down (SEV-1)

**Symptoms:**
- Vercel shows site unreachable
- Uptime monitor alerts
- Users report "site down" on social media

**Diagnosis:**
```
1. Check Vercel status page (https://vercel.com/status)
   - If Vercel incident → Wait for resolution, communicate to users
2. Check recent deployments (last 1 hour)
   - If recent deploy → Likely cause
3. Check error logs in Sentry
   - Look for spike in errors at incident start time
4. Check database connection
   - Test database query (Prisma Studio or CLI)
```

**Resolution:**
```
Option A: Rollback recent deployment (if deployment caused issue)
1. Navigate to Vercel > Deployments
2. Find previous successful deployment
3. Click "Promote to Production"
4. Verify site loads
5. ETA: 5-10 minutes

Option B: Vercel incident (if Vercel status page shows outage)
1. Nothing to do (wait for Vercel to resolve)
2. Update status page: "Monitoring third-party infrastructure issue"
3. Post update every 15 minutes
4. ETA: Unknown (Vercel SLA: 99.9% uptime)

Option C: Database connection failure
1. Check database status (Vercel Postgres/Supabase dashboard)
2. Restart database if needed
3. Check connection string in env variables
4. Redeploy if env variables changed
5. ETA: 10-20 minutes
```

**Communication:**
```
1. Update status page immediately
2. Post to Twitter/Facebook if >15 minutes
3. Update incident channel every 15 minutes
4. Escalate to Operations Lead after 30 minutes
```

### Runbook 2: Performance Degradation (SEV-2)

**Symptoms:**
- LCP >2.5s for 15+ minutes
- Slow API response times
- User reports of slow loading

**Diagnosis:**
```
1. Check Vercel Analytics (identify slow pages)
2. Check Lighthouse CI (recent performance regression?)
3. Check database query performance (Prisma logs)
4. Check third-party API latency (Stripe, Contentful)
5. Check recent deployments (new code causing slowness?)
```

**Resolution:**
```
Option A: Slow database queries
1. Identify slow queries in Prisma logs
2. Add database indexes if missing
3. Optimize query (reduce joins, add select fields)
4. Deploy fix
5. ETA: 30-60 minutes

Option B: Large images/assets
1. Identify large assets in Lighthouse report
2. Compress images (TinyPNG, Cloudinary)
3. Add lazy loading (below fold)
4. Deploy fix
5. ETA: 30-60 minutes

Option C: Third-party API slow
1. Identify slow API (check network tab)
2. Add timeout handling (fail gracefully)
3. Consider caching API responses
4. Deploy fix (or wait if third-party issue)
5. ETA: Varies

Option D: Traffic spike (legitimate)
1. Check Vercel Analytics (traffic pattern)
2. Verify auto-scaling working
3. If Vercel limits hit → Upgrade plan temporarily
4. ETA: 10-20 minutes
```

**Communication:**
```
1. Update incident channel
2. No external communication unless >30 minutes
3. Escalate to Operations Lead if unable to resolve in 1 hour
```

### Runbook 3: Error Rate Spike (SEV-2)

**Symptoms:**
- Sentry alerts (error rate >0.5%)
- Vercel Analytics shows error spike
- User reports of broken functionality

**Diagnosis:**
```
1. Check Sentry dashboard (identify error type)
2. Review stack traces (where is error occurring?)
3. Check recent deployments (new code causing errors?)
4. Check affected users (% of users affected)
5. Determine severity (critical feature or edge case?)
```

**Resolution:**
```
Option A: Recent deployment caused errors
1. Rollback deployment (Vercel dashboard)
2. Verify errors stop
3. Fix bug locally
4. Deploy fix to staging
5. Test on staging
6. Deploy to production
7. ETA: 30-60 minutes

Option B: Third-party API failure (Stripe, Contentful)
1. Check third-party status page
2. Add error handling (fail gracefully)
3. Display user-friendly error message
4. Deploy fix
5. ETA: 20-40 minutes

Option C: Database error (connection, query failure)
1. Check database status
2. Restart database if needed
3. Fix query if syntax error
4. Deploy fix
5. ETA: 20-40 minutes
```

**Communication:**
```
1. Update incident channel with error type
2. If user-facing feature broken → Post to status page
3. Escalate to Operations Lead if >50% users affected
```

### Runbook 4: SEO Indexation Drop (SEV-3)

**Symptoms:**
- Google Search Console shows >10% drop in indexed pages
- Traffic drop from organic search
- Pages missing from Google search results

**Diagnosis:**
```
1. Check Google Search Console > Coverage report
2. Identify deindexed pages (what pages dropped?)
3. Check robots.txt (are pages blocked?)
4. Check sitemap (are pages in sitemap?)
5. Check server errors (500s, 404s)
6. Check recent deployments (did deploy break SEO?)
```

**Resolution:**
```
Option A: Robots.txt blocking pages
1. Review robots.txt (public/robots.txt)
2. Remove incorrect disallow rules
3. Deploy fix
4. Submit sitemap to Google Search Console
5. Request reindexing
6. ETA: 1-7 days for reindexing

Option B: Sitemap not generated/submitted
1. Verify sitemap exists (/sitemap.xml)
2. Submit sitemap to Google Search Console
3. Monitor indexation status
4. ETA: 1-7 days

Option C: Pages returning 404 or 500 errors
1. Check Vercel logs (identify errors)
2. Fix errors (missing pages, broken routes)
3. Deploy fix
4. Submit pages to Google Search Console
5. ETA: 1-7 days for reindexing

Option D: Noindex meta tag added accidentally
1. Search codebase for `<meta name="robots" content="noindex">`
2. Remove noindex tags
3. Deploy fix
4. Request reindexing
5. ETA: 1-7 days
```

**Communication:**
```
1. Document in #seo-alerts Slack channel
2. Notify SEO Manager via email
3. No external communication
4. Weekly update on reindexing progress
```

### Runbook 5: Payment Processing Failure (SEV-1)

**Symptoms:**
- Stripe webhook failures in logs
- Users report payment not working
- Subscription signups failing

**Diagnosis:**
```
1. Check Stripe dashboard (webhook events)
2. Check Stripe logs (webhook delivery failures)
3. Check Vercel logs (webhook endpoint errors)
4. Test payment flow (create test subscription)
5. Check API keys (correct environment?)
```

**Resolution:**
```
Option A: Webhook endpoint broken
1. Check webhook endpoint code (/api/stripe/webhook)
2. Fix bugs (verify signature, handle events)
3. Deploy fix
4. Retry failed webhook events in Stripe dashboard
5. ETA: 20-40 minutes

Option B: Stripe API keys incorrect
1. Check environment variables (Vercel dashboard)
2. Verify keys (test vs production)
3. Update keys if incorrect
4. Redeploy
5. ETA: 10-20 minutes

Option C: Stripe account issue
1. Check Stripe dashboard (account status)
2. Contact Stripe support if account suspended
3. ETA: Varies (hours to days)
```

**Communication:**
```
1. Update status page immediately
2. Email affected users (if known)
3. Escalate to Operations Lead immediately
4. Escalate to CTO if unable to resolve in 30 minutes
```

---

## Appendix

### Contact Directory

| Role | Name | Phone | Email | Slack |
|------|------|-------|-------|-------|
| Operations Lead | [Name] | [Phone] | ops-lead@disasterrecovery.com.au | @ops-lead |
| DevOps Engineer | [Name] | [Phone] | devops@disasterrecovery.com.au | @devops |
| Content Manager | [Name] | [Phone] | content@disasterrecovery.com.au | @content-mgr |
| SEO Manager | [Name] | [Phone] | seo@disasterrecovery.com.au | @seo-mgr |
| CTO | [Name] | [Phone] | cto@disasterrecovery.com.au | @cto |

### Tool Access

| Tool | URL | Access Level | Owner |
|------|-----|--------------|-------|
| Vercel Dashboard | https://vercel.com/disasterrecovery | Admin | DevOps |
| Google Analytics 4 | https://analytics.google.com | Editor | Marketing |
| Google Search Console | https://search.google.com/search-console | Owner | SEO Manager |
| Sentry | https://sentry.io/disasterrecovery | Admin | DevOps |
| Contentful CMS | https://app.contentful.com | Admin | Content Manager |
| Ahrefs | https://ahrefs.com | Editor | SEO Manager |
| PagerDuty | https://disasterrecovery.pagerduty.com | Admin | Operations Lead |

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-02 | 1.0.0 | Initial playbook creation | Operations Team |

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-02
**Next Review:** February 2026
**Owner:** Operations Lead
**Approvals:** CTO, DevOps Lead, Content Manager

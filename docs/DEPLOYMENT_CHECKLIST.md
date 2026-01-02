# Deployment Checklist

## Pre-Deployment Phase

### 1. Code Quality & Testing
- [ ] All tests pass locally (`npm run test:all`)
- [ ] TypeScript compilation succeeds (`npm run type-check`)
- [ ] ESLint passes without errors (`npm run lint`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Code coverage meets minimum threshold (>80%)
- [ ] No critical security vulnerabilities (`npm audit`)
- [ ] All PR reviews approved
- [ ] Branch is up-to-date with main

### 2. Environment Configuration

#### Required Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `REDIS_URL` - Redis connection string
- [ ] `NEXTAUTH_URL` - Application URL
- [ ] `NEXTAUTH_SECRET` - Authentication secret (32+ characters)
- [ ] `STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key

#### Optional but Recommended
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - Email service
- [ ] `SENTRY_DSN` - Error tracking
- [ ] `GITHUB_ID`, `GITHUB_SECRET` - GitHub OAuth
- [ ] `GOOGLE_ID`, `GOOGLE_SECRET` - Google OAuth
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity CMS
- [ ] `NEXT_PUBLIC_ALGOLIA_APP_ID` - Algolia Search
- [ ] `HUGGINGFACE_API_KEY` - AI/ML services
- [ ] `GEMINI_API_KEY` - Google Gemini API

### 3. Database Preparation
- [ ] Database migrations tested locally
- [ ] Backup of production database created
- [ ] Migration rollback plan documented
- [ ] Database connection tested from staging
- [ ] Indexes optimized for production queries
- [ ] Database user permissions verified

### 4. Third-Party Services

#### Stripe (Payment Processing)
- [ ] Stripe account configured (test/production mode)
- [ ] Webhook endpoints registered
- [ ] Webhook secret configured in environment
- [ ] Payment flows tested in test mode
- [ ] Products and prices created in Stripe dashboard

#### SendGrid/SMTP (Email)
- [ ] Email service account created
- [ ] SMTP credentials configured
- [ ] Email templates tested
- [ ] Sender domain verified (SPF, DKIM)
- [ ] Unsubscribe links working

#### Sanity CMS
- [ ] Sanity project created
- [ ] Content schemas deployed
- [ ] API credentials configured
- [ ] CORS settings configured
- [ ] Preview mode tested

#### Algolia (Search)
- [ ] Algolia application created
- [ ] Search indices created
- [ ] API keys configured (search + admin)
- [ ] Index settings optimized
- [ ] Initial data synced

### 5. Build & Bundle Verification
- [ ] Production build succeeds (`npm run build`)
- [ ] Bundle size analyzed (`npm run build:analyze`)
- [ ] No build warnings or errors
- [ ] Bundle size within acceptable limits
- [ ] Tree-shaking working correctly
- [ ] Code splitting optimized

### 6. Performance Verification
- [ ] Lighthouse score >85 for performance
- [ ] Core Web Vitals meet targets:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Image optimization verified
- [ ] Font loading optimized
- [ ] Critical CSS inlined

---

## Deployment Phase

### 1. Vercel Configuration

#### Project Setup
- [ ] Vercel project created
- [ ] GitHub integration configured
- [ ] Production domain configured
- [ ] Preview deployments enabled
- [ ] Build settings verified

#### Environment Variables (Vercel)
- [ ] All required variables added to Vercel
- [ ] Production vs Preview environments configured
- [ ] Sensitive variables marked as sensitive
- [ ] Environment variable encryption verified

#### Deployment Settings
- [ ] Node.js version: 20.x
- [ ] Build command: `npm run build`
- [ ] Install command: `npm ci --legacy-peer-deps`
- [ ] Output directory: `.next`
- [ ] Root directory: `./`

### 2. DNS Configuration
- [ ] Domain purchased/available
- [ ] DNS records configured:
  - [ ] A record or CNAME for root domain
  - [ ] CNAME for www subdomain
  - [ ] TXT records for verification
- [ ] SSL certificate auto-provisioned
- [ ] DNS propagation verified
- [ ] Subdomain redirects configured

### 3. Database Migration
- [ ] Staging database migrated successfully
- [ ] Migration logs reviewed
- [ ] Data integrity verified
- [ ] Production database backed up
- [ ] Production migration executed
- [ ] Rollback tested on staging

### 4. Deploy to Staging
- [ ] Staging deployment successful
- [ ] Staging URL accessible
- [ ] All pages load correctly
- [ ] API endpoints responding
- [ ] Authentication flows working
- [ ] Payment flows tested (test mode)
- [ ] Email sending tested
- [ ] Search functionality tested

### 5. Deploy to Production
- [ ] Create deployment tag/release
- [ ] Trigger production deployment
- [ ] Monitor deployment logs
- [ ] Verify deployment status
- [ ] Check Vercel deployment dashboard

---

## Post-Deployment Phase

### 1. Smoke Tests (Immediate)
- [ ] Homepage loads (HTTP 200)
- [ ] Health endpoint responds (`/api/health`)
- [ ] Authentication works (login/logout)
- [ ] Critical user flows working:
  - [ ] User registration
  - [ ] Password reset
  - [ ] Profile update
  - [ ] Payment flow (if applicable)
  - [ ] Search functionality
  - [ ] Contact form submission

### 2. Monitoring Setup

#### Application Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking active (Sentry)
- [ ] Uptime monitoring configured
- [ ] Performance monitoring active
- [ ] Real User Monitoring (RUM) enabled

#### Infrastructure Monitoring
- [ ] Database metrics monitored
- [ ] Redis metrics monitored
- [ ] API response times tracked
- [ ] Error rates tracked
- [ ] Resource usage monitored

### 3. Performance Baseline
- [ ] Lighthouse audit run on production
- [ ] Core Web Vitals captured
- [ ] API response times measured
- [ ] Database query performance verified
- [ ] CDN performance verified
- [ ] Image optimization verified

### 4. Security Verification
- [ ] Security headers present:
  - [ ] Content-Security-Policy
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Strict-Transport-Security
  - [ ] Referrer-Policy
- [ ] SSL/TLS certificate valid
- [ ] HTTPS redirect working
- [ ] API rate limiting active
- [ ] CORS configured correctly
- [ ] Authentication tokens secure

### 5. SEO Verification
- [ ] Robots.txt accessible
- [ ] Sitemap.xml generated and accessible
- [ ] Meta tags present on all pages
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Structured data (JSON-LD) present
- [ ] Google Search Console configured
- [ ] Google Analytics configured

### 6. Third-Party Integrations
- [ ] Stripe webhooks receiving events
- [ ] Email service sending successfully
- [ ] OAuth providers working (GitHub, Google)
- [ ] Analytics tracking pageviews
- [ ] Error tracking capturing errors
- [ ] Search index syncing

### 7. Documentation Updates
- [ ] README updated with production info
- [ ] Environment variables documented
- [ ] API documentation current
- [ ] Runbooks updated
- [ ] Changelog updated
- [ ] Release notes published

---

## Rollback Procedure

### If Deployment Fails:

1. **Immediate Actions**
   - [ ] Stop deployment if in progress
   - [ ] Check deployment logs for errors
   - [ ] Verify error scope (frontend, backend, database)

2. **Rollback Steps**
   - [ ] Revert to previous Vercel deployment
   - [ ] Rollback database migrations (if applicable)
   - [ ] Clear CDN cache
   - [ ] Verify rollback successful

3. **Post-Rollback**
   - [ ] Monitor error rates
   - [ ] Verify critical functionality
   - [ ] Notify team of rollback
   - [ ] Document failure reason
   - [ ] Create incident report

---

## Team Notification

### Notify Team When:
- [ ] Deployment starts
- [ ] Staging deployment complete
- [ ] Production deployment complete
- [ ] Any deployment failures
- [ ] Rollback executed

### Notification Channels:
- [ ] Slack - #deployments channel
- [ ] Discord - Deployment notifications
- [ ] Email - Team distribution list
- [ ] Status page updated (if applicable)

---

## Performance Targets

### Response Times
- Homepage: < 1.5s (LCP)
- API endpoints: < 200ms (p95)
- Database queries: < 100ms (p95)
- Search queries: < 500ms

### Availability
- Uptime target: 99.9%
- Maximum downtime: 43 minutes/month
- Error rate: < 0.1%

### Core Web Vitals
- LCP: < 2.5s (good), < 4.0s (needs improvement)
- FID: < 100ms (good), < 300ms (needs improvement)
- CLS: < 0.1 (good), < 0.25 (needs improvement)

---

## Emergency Contacts

### On-Call Rotation
- Primary: [Name] - [Contact]
- Secondary: [Name] - [Contact]
- Escalation: [Name] - [Contact]

### Service Providers
- Vercel Support: support@vercel.com
- Database Provider: [Contact]
- Email Service: [Contact]
- Payment Processor (Stripe): support@stripe.com

---

## Compliance & Legal

### Before Going Live:
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie consent banner (if EU traffic)
- [ ] GDPR compliance verified
- [ ] Data retention policies documented
- [ ] Backup/recovery procedures tested
- [ ] Security audit completed
- [ ] Penetration testing completed (if required)

---

## Sign-Off

### Approvals Required:
- [ ] Technical Lead: _________________ Date: _______
- [ ] DevOps Lead: _________________ Date: _______
- [ ] Product Owner: _________________ Date: _______
- [ ] Security Lead: _________________ Date: _______

---

## Deployment Log

| Date | Version | Deployed By | Status | Notes |
|------|---------|-------------|--------|-------|
|      |         |             |        |       |

---

**Last Updated:** 2026-01-02
**Next Review:** Every deployment
**Owner:** DevOps Team

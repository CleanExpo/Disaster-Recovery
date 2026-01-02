# Environment Setup Checklist

**Use this checklist to ensure proper environment configuration for all deployment stages.**

---

## For Developers (Local Setup)

### Initial Setup
- [ ] Copy `.env.example` to `.env.local`
  ```bash
  cp .env.example .env.local
  ```
- [ ] Generate `NEXTAUTH_SECRET`
  ```bash
  openssl rand -base64 32
  ```
- [ ] Generate `JWT_SECRET` (different from NEXTAUTH_SECRET)
  ```bash
  openssl rand -base64 32
  ```
- [ ] Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- [ ] Set `NEXTAUTH_URL=http://localhost:3000`

### Database
- [ ] Start PostgreSQL (Docker or local)
  ```bash
  docker-compose up -d postgres
  ```
- [ ] Set `DATABASE_URL` to local PostgreSQL
- [ ] Set `DIRECT_URL` (same as DATABASE_URL for local)
- [ ] Run migrations
  ```bash
  npx prisma migrate dev
  ```

### Redis
- [ ] Start Redis (Docker or local)
  ```bash
  docker-compose up -d redis
  ```
- [ ] Set `REDIS_URL=redis://localhost:6379`

### Stripe (Test Mode)
- [ ] Sign up for Stripe account
- [ ] Get test API keys from https://dashboard.stripe.com/test/apikeys
- [ ] Set `STRIPE_SECRET_KEY=sk_test_...`
- [ ] Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
- [ ] Set up local webhook testing
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```
- [ ] Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Email (SendGrid)
- [ ] Sign up for SendGrid account
- [ ] Create API key: https://app.sendgrid.com/settings/api_keys
- [ ] Set `SENDGRID_API_KEY=SG....`
- [ ] Set `EMAIL_FROM=noreply@localhost` (or verified email)
- [ ] Verify sender email in SendGrid

### Optional Services
- [ ] **Sanity CMS** (if using)
  - [ ] Create project: https://sanity.io/manage
  - [ ] Set `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] Set `NEXT_PUBLIC_SANITY_DATASET=development`
  - [ ] Create API token
  - [ ] Set `SANITY_API_TOKEN`

- [ ] **Algolia Search** (if using)
  - [ ] Create account: https://algolia.com
  - [ ] Set `NEXT_PUBLIC_ALGOLIA_APP_ID`
  - [ ] Set `NEXT_PUBLIC_ALGOLIA_API_KEY`
  - [ ] Set `ALGOLIA_ADMIN_API_KEY`

- [ ] **hCaptcha** (if using)
  - [ ] Create account: https://hcaptcha.com
  - [ ] Set `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
  - [ ] Set `HCAPTCHA_SECRET_KEY`

- [ ] **Google Gemini** (if using AI features)
  - [ ] Get API key: https://makersuite.google.com/app/apikey
  - [ ] Set `GEMINI_API_KEY`

### Validation
- [ ] Run validation script
  ```bash
  npm run validate:env
  ```
- [ ] Fix any errors or warnings
- [ ] Start development server
  ```bash
  npm run dev
  ```
- [ ] Verify application loads at http://localhost:3000
- [ ] Test authentication (sign up/login)
- [ ] Test database connection

---

## For DevOps (Preview/Staging)

### Vercel Setup
- [ ] Install Vercel CLI
  ```bash
  npm i -g vercel
  ```
- [ ] Login to Vercel
  ```bash
  vercel login
  ```
- [ ] Link project
  ```bash
  vercel link
  ```

### Database (Staging)
- [ ] Provision staging database (Supabase/Neon/RDS)
- [ ] Add `DATABASE_URL` to Vercel (preview environment)
  ```bash
  vercel env add DATABASE_URL preview
  ```
- [ ] Add `DIRECT_URL` if using connection pooler
  ```bash
  vercel env add DIRECT_URL preview
  ```

### Redis (Staging)
- [ ] Provision Upstash Redis (recommended for Vercel)
- [ ] Add `UPSTASH_REDIS_REST_URL` to Vercel (preview)
  ```bash
  vercel env add UPSTASH_REDIS_REST_URL preview
  ```
- [ ] Add `UPSTASH_REDIS_REST_TOKEN` to Vercel (preview)
  ```bash
  vercel env add UPSTASH_REDIS_REST_TOKEN preview
  ```

### Core Variables (Preview)
- [ ] Add `NEXTAUTH_URL` (will be Vercel preview URL)
  ```bash
  vercel env add NEXTAUTH_URL preview
  # Use: https://[project].vercel.app
  ```
- [ ] Generate and add `NEXTAUTH_SECRET`
  ```bash
  openssl rand -base64 32
  vercel env add NEXTAUTH_SECRET preview
  ```
- [ ] Generate and add `JWT_SECRET`
  ```bash
  openssl rand -base64 32
  vercel env add JWT_SECRET preview
  ```
- [ ] Add `NEXT_PUBLIC_SITE_URL`
  ```bash
  vercel env add NEXT_PUBLIC_SITE_URL preview
  ```

### Stripe (Test Mode)
- [ ] Add `STRIPE_SECRET_KEY` (test key)
  ```bash
  vercel env add STRIPE_SECRET_KEY preview
  ```
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (test key)
  ```bash
  vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview
  ```
- [ ] Create webhook in Stripe for preview URL
- [ ] Add `STRIPE_WEBHOOK_SECRET`
  ```bash
  vercel env add STRIPE_WEBHOOK_SECRET preview
  ```

### Email (Preview)
- [ ] Add `SENDGRID_API_KEY` (can use same as production or separate)
  ```bash
  vercel env add SENDGRID_API_KEY preview
  ```
- [ ] Add `EMAIL_FROM`
  ```bash
  vercel env add EMAIL_FROM preview
  ```

### Optional Services (Preview)
- [ ] Add Sanity variables (if using)
- [ ] Add Algolia variables (if using)
- [ ] Add hCaptcha variables (if using)
- [ ] Add AI service keys (if using)

### Deployment Test
- [ ] Trigger preview deployment
  ```bash
  git push
  ```
- [ ] Check deployment logs for errors
- [ ] Run validation in preview environment
- [ ] Test all functionality
- [ ] Verify webhooks working
- [ ] Check monitoring/logging

---

## For DevOps (Production)

### Database (Production)
- [ ] Provision production database (Supabase/Neon/RDS)
- [ ] Enable multi-AZ/replication
- [ ] Configure automated backups
- [ ] Add `DATABASE_URL` to Vercel (production)
  ```bash
  vercel env add DATABASE_URL production
  ```
- [ ] Add `DIRECT_URL` if using connection pooler
  ```bash
  vercel env add DIRECT_URL production
  ```

### Redis (Production)
- [ ] Provision Upstash Redis with persistence
- [ ] Add `UPSTASH_REDIS_REST_URL` to Vercel (production)
  ```bash
  vercel env add UPSTASH_REDIS_REST_URL production
  ```
- [ ] Add `UPSTASH_REDIS_REST_TOKEN` to Vercel (production)
  ```bash
  vercel env add UPSTASH_REDIS_REST_TOKEN production
  ```

### Domain Setup
- [ ] Configure custom domain in Vercel
- [ ] Verify DNS records
- [ ] Enable SSL/TLS (automatic with Vercel)

### Core Variables (Production)
- [ ] Add `NEXTAUTH_URL` (custom domain)
  ```bash
  vercel env add NEXTAUTH_URL production
  # Use: https://your-domain.com
  ```
- [ ] Generate and add `NEXTAUTH_SECRET` (DIFFERENT from preview)
  ```bash
  openssl rand -base64 32
  vercel env add NEXTAUTH_SECRET production
  ```
- [ ] Generate and add `JWT_SECRET` (DIFFERENT from preview)
  ```bash
  openssl rand -base64 32
  vercel env add JWT_SECRET production
  ```
- [ ] Add `NEXT_PUBLIC_SITE_URL`
  ```bash
  vercel env add NEXT_PUBLIC_SITE_URL production
  ```

### Stripe (Live Mode)
- [ ] Activate Stripe account for live payments
- [ ] Get live API keys from https://dashboard.stripe.com/apikeys
- [ ] Add `STRIPE_SECRET_KEY` (LIVE key - sk_live_...)
  ```bash
  vercel env add STRIPE_SECRET_KEY production
  # Mark as "Encrypted" in dashboard
  ```
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (LIVE key)
  ```bash
  vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
  ```
- [ ] Create webhook in Stripe for production URL
- [ ] Add `STRIPE_WEBHOOK_SECRET`
  ```bash
  vercel env add STRIPE_WEBHOOK_SECRET production
  # Mark as "Encrypted" in dashboard
  ```

### Email (Production)
- [ ] Verify sender domain in SendGrid
- [ ] Create production API key
- [ ] Add `SENDGRID_API_KEY`
  ```bash
  vercel env add SENDGRID_API_KEY production
  # Mark as "Encrypted" in dashboard
  ```
- [ ] Add `EMAIL_FROM` (verified domain email)
  ```bash
  vercel env add EMAIL_FROM production
  ```

### CMS (Production)
- [ ] Create production Sanity dataset
- [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID`
  ```bash
  vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
  ```
- [ ] Add `NEXT_PUBLIC_SANITY_DATASET` (set to "production")
  ```bash
  vercel env add NEXT_PUBLIC_SANITY_DATASET production
  ```
- [ ] Create production API token
- [ ] Add `SANITY_API_TOKEN`
  ```bash
  vercel env add SANITY_API_TOKEN production
  # Mark as "Encrypted" in dashboard
  ```

### Search (Production)
- [ ] Create production Algolia indices
- [ ] Add `NEXT_PUBLIC_ALGOLIA_APP_ID`
  ```bash
  vercel env add NEXT_PUBLIC_ALGOLIA_APP_ID production
  ```
- [ ] Add `NEXT_PUBLIC_ALGOLIA_API_KEY`
  ```bash
  vercel env add NEXT_PUBLIC_ALGOLIA_API_KEY production
  ```
- [ ] Create admin API key
- [ ] Add `ALGOLIA_ADMIN_API_KEY`
  ```bash
  vercel env add ALGOLIA_ADMIN_API_KEY production
  # Mark as "Encrypted" in dashboard
  ```

### Security (Production)
- [ ] Set up hCaptcha for production
- [ ] Add `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
  ```bash
  vercel env add NEXT_PUBLIC_HCAPTCHA_SITE_KEY production
  ```
- [ ] Add `HCAPTCHA_SECRET_KEY`
  ```bash
  vercel env add HCAPTCHA_SECRET_KEY production
  # Mark as "Encrypted" in dashboard
  ```

### Analytics (Production)
- [ ] Create Google Analytics 4 property
- [ ] Add `NEXT_PUBLIC_GA4_ID`
  ```bash
  vercel env add NEXT_PUBLIC_GA4_ID production
  ```
- [ ] Set up Sentry project (if using)
- [ ] Add `NEXT_PUBLIC_SENTRY_DSN`
  ```bash
  vercel env add NEXT_PUBLIC_SENTRY_DSN production
  ```

### AI Services (Production)
- [ ] Set up production API keys for AI services
- [ ] Add `GEMINI_API_KEY` (if using)
  ```bash
  vercel env add GEMINI_API_KEY production
  # Mark as "Encrypted" in dashboard
  ```
- [ ] Add other AI service keys as needed

### OAuth Providers (Production)
- [ ] Configure GitHub OAuth app
- [ ] Add production callback URL
- [ ] Add `GITHUB_ID` and `GITHUB_SECRET`
- [ ] Configure Google OAuth app
- [ ] Add production callback URL
- [ ] Add `GOOGLE_ID` and `GOOGLE_SECRET`

### Mark Sensitive Variables as Encrypted
In Vercel dashboard, mark these as "Encrypted":
- [ ] `DATABASE_URL`
- [ ] `DIRECT_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `JWT_SECRET`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `SENDGRID_API_KEY`
- [ ] `SANITY_API_TOKEN`
- [ ] `ALGOLIA_ADMIN_API_KEY`
- [ ] `HCAPTCHA_SECRET_KEY`
- [ ] `GEMINI_API_KEY`
- [ ] `GITHUB_SECRET`
- [ ] `GOOGLE_SECRET`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

### Pre-Deployment Validation
- [ ] Run validation script locally
  ```bash
  npm run validate:env
  ```
- [ ] Review all environment variables in Vercel dashboard
- [ ] Verify all sensitive variables marked as "Encrypted"
- [ ] Check webhook URLs are correct
- [ ] Verify OAuth callback URLs

### Production Deployment
- [ ] Deploy to production
  ```bash
  vercel --prod
  ```
- [ ] Monitor deployment logs
- [ ] Check for environment variable errors
- [ ] Verify successful deployment

### Post-Deployment Verification
- [ ] Visit production URL
- [ ] Test user authentication (sign up/login)
- [ ] Test Stripe payment (use real card, then refund)
- [ ] Test email sending (welcome email, password reset)
- [ ] Verify webhooks processing (check Stripe dashboard)
- [ ] Test search functionality
- [ ] Verify analytics tracking
- [ ] Check hCaptcha working
- [ ] Test OAuth providers
- [ ] Monitor error tracking (Sentry)
- [ ] Review performance metrics

### Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure alerting (email/Slack)
- [ ] Create monitoring dashboards
- [ ] Set up log aggregation
- [ ] Configure error tracking

---

## Security Checklist

### Secret Management
- [ ] All secrets stored in Vercel (not in code)
- [ ] `.env.local` in `.gitignore`
- [ ] Production secrets different from preview/dev
- [ ] Secrets marked as "Encrypted" in Vercel
- [ ] No secrets in Git history
- [ ] Team uses 1Password/vault for secret sharing

### Rotation Schedule
- [ ] Set calendar reminders for secret rotation
- [ ] Document rotation procedures
- [ ] Test rotation in staging first
- [ ] Have rollback plan ready

### Access Control
- [ ] Limit who can access production secrets
- [ ] Enable MFA on all service accounts
- [ ] Audit access logs regularly
- [ ] Remove access for departed team members

---

## Compliance Checklist

### GDPR (if applicable)
- [ ] Enable `GDPR_MODE=true`
- [ ] Configure `DATA_RETENTION_DAYS`
- [ ] Enable `ENABLE_COOKIE_CONSENT=true`
- [ ] Set up data deletion procedures

### PCI DSS (for payments)
- [ ] Never store card data (Stripe handles this)
- [ ] Use HTTPS only (automatic with Vercel)
- [ ] Enable logging for payment events
- [ ] Regular security audits

---

## Troubleshooting

### If validation fails:
1. [ ] Check variable names match `.env.example` exactly
2. [ ] Verify no typos in values
3. [ ] Ensure secrets are strong (32+ characters)
4. [ ] Check format patterns (URLs, API keys)
5. [ ] Review validation script output

### If deployment fails:
1. [ ] Check Vercel deployment logs
2. [ ] Verify all required variables set
3. [ ] Check for missing environment-specific vars
4. [ ] Test in preview environment first

### If webhooks fail:
1. [ ] Verify webhook URL is correct
2. [ ] Check webhook secret matches service
3. [ ] Review webhook logs in service dashboard
4. [ ] Test with webhook testing tools

---

## Documentation

- [ ] Review [ENV_QUICK_START.md](./ENV_QUICK_START.md)
- [ ] Review [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)
- [ ] Review [SECRET_ROTATION_GUIDE.md](./SECRET_ROTATION_GUIDE.md)
- [ ] Bookmark [README_ENV.md](./README_ENV.md)

---

## Sign-off

### Development Team
- [ ] Local setup complete
- [ ] All tests passing
- [ ] Documentation reviewed
- **Signed**: ________________ **Date**: __________

### DevOps Team
- [ ] Preview environment configured
- [ ] Production environment configured
- [ ] Monitoring set up
- [ ] Secrets documented in vault
- **Signed**: ________________ **Date**: __________

### Security Team
- [ ] Security review complete
- [ ] Sensitive variables encrypted
- [ ] Rotation schedule established
- [ ] Compliance requirements met
- **Signed**: ________________ **Date**: __________

---

**Checklist Version**: 1.0.0
**Last Updated**: 2026-01-02
**Next Review**: 2026-04-02

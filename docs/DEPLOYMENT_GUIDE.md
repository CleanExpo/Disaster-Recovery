# Deployment Guide

Complete guide for deploying the Disaster Recovery NRPG Platform to production.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Local Development](#local-development)
5. [Deployment to Vercel](#deployment-to-vercel)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/disaster-recovery-nrpg.git
cd disaster-recovery-nrpg

# 2. Install dependencies
npm ci --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Run database migrations
npm run prisma:migrate

# 5. Start development server
npm run dev
```

---

## Prerequisites

### Required Software
- **Node.js**: v20.x or higher
- **npm**: v9.x or higher
- **PostgreSQL**: v15 or higher
- **Redis**: v7 or higher (optional, for caching)
- **Git**: Latest version

### Required Accounts
- **Vercel**: For hosting and deployment
- **GitHub**: For source control and CI/CD
- **Stripe**: For payment processing
- **SendGrid/SMTP**: For email delivery (optional)
- **Sanity**: For CMS (optional)
- **Algolia**: For search (optional)

---

## Environment Setup

### 1. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/disaster_recovery"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# OAuth Providers (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Email (optional)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
SMTP_FROM="noreply@yourdomain.com"

# Monitoring (optional)
SENTRY_DSN="https://...@sentry.io/..."

# CMS (optional)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"

# Search (optional)
NEXT_PUBLIC_ALGOLIA_APP_ID="your-app-id"
NEXT_PUBLIC_ALGOLIA_API_KEY="your-search-key"
ALGOLIA_ADMIN_KEY="your-admin-key"
```

### 2. Database Setup

```bash
# Start PostgreSQL (if using Docker)
docker run --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=disaster_recovery \
  -p 5432:5432 \
  -d postgres:15-alpine

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run db:seed
```

### 3. Verify Environment

```bash
# Run environment verification
npm run verify:env

# Expected output:
# ✅ All required environment variables are set
```

---

## Local Development

### Development Server

```bash
# Start development server
npm run dev

# Server will start at http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:all         # Run all tests
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking

# Database
npm run db:migrate       # Run migrations (dev)
npm run db:migrate:deploy # Run migrations (production)
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Build Analysis
npm run build:analyze    # Analyze bundle size

# Lighthouse
npm run lighthouse       # Run Lighthouse CI

# Storybook
npm run storybook        # Start Storybook
npm run build-storybook  # Build Storybook

# Utilities
npm run sync-algolia     # Sync Algolia search indices
npm run verify:env       # Verify environment variables
npm run verify:deployment # Verify deployment readiness
```

---

## Deployment to Vercel

### Initial Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```

### Configure Vercel Project

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Import Project from GitHub**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure settings:
     - Framework: Next.js
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm ci --legacy-peer-deps`
     - Node Version: 20.x

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Separate variables for:
     - Production
     - Preview
     - Development

4. **Configure Domains**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Automatic Deployments

Automatic deployments are triggered via GitHub Actions:

- **Preview Deployments**: Triggered on pull requests
- **Production Deployments**: Triggered on push to `main` branch

---

## CI/CD Pipeline

### GitHub Actions Workflows

#### 1. CI Pipeline (`.github/workflows/ci.yml`)

Runs on every push and pull request:

- Install dependencies
- TypeScript type checking
- ESLint linting
- Unit tests
- Integration tests (with PostgreSQL and Redis)
- E2E tests (with Playwright)
- Build verification
- Security audit

#### 2. Deploy Preview (`.github/workflows/deploy-preview.yml`)

Runs on pull requests:

- Deploy to Vercel preview environment
- Run Lighthouse audit on preview
- Run smoke tests
- Comment results on PR

#### 3. Deploy Production (`.github/workflows/deploy-production.yml`)

Runs on push to `main`:

- Deploy to Vercel production
- Run smoke tests on production
- Run Lighthouse audit
- Notify team (Slack/Discord)

### Required GitHub Secrets

Add these secrets in GitHub repository settings:

```
VERCEL_TOKEN            # Vercel API token
VERCEL_ORG_ID          # Vercel organization ID
VERCEL_PROJECT_ID      # Vercel project ID
DATABASE_URL           # Production database URL
REDIS_URL              # Production Redis URL
NEXTAUTH_SECRET        # NextAuth secret
STRIPE_SECRET_KEY      # Stripe secret key
STRIPE_WEBHOOK_SECRET  # Stripe webhook secret
SLACK_WEBHOOK_URL      # Slack webhook (optional)
DISCORD_WEBHOOK        # Discord webhook (optional)
SNYK_TOKEN            # Snyk security token (optional)
```

### How to Get Vercel Secrets

```bash
# Get organization ID
vercel org ls

# Get project ID
vercel project ls

# Create token
# Go to: https://vercel.com/account/tokens
```

---

## Monitoring & Maintenance

### Application Monitoring

1. **Vercel Analytics**
   - Automatic page view tracking
   - Real User Monitoring (RUM)
   - Core Web Vitals tracking

2. **Sentry (Error Tracking)**
   - JavaScript error tracking
   - API error tracking
   - Performance monitoring

3. **Uptime Monitoring**
   - Use services like UptimeRobot or Pingdom
   - Monitor critical endpoints:
     - Homepage: `/`
     - Health: `/api/health`
     - Auth: `/api/auth/providers`

### Performance Monitoring

```bash
# Run Lighthouse audit
npm run lighthouse

# Analyze bundle size
npm run build:analyze

# Check Core Web Vitals
# Visit: https://pagespeed.web.dev/
```

### Database Maintenance

```bash
# Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore database
psql $DATABASE_URL < backup_20260102.sql

# Optimize database
npm run db:studio
# Run VACUUM ANALYZE in Prisma Studio
```

### Logs & Debugging

```bash
# View Vercel logs
vercel logs

# View real-time logs
vercel logs --follow

# View specific deployment logs
vercel logs [deployment-url]
```

---

## Troubleshooting

### Common Issues

#### Build Failures

**Problem**: Build fails with module not found errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm ci --legacy-peer-deps
npm run build
```

#### Database Connection Issues

**Problem**: Cannot connect to database

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check network connectivity
3. Verify database is running
4. Check connection pool limits

```bash
# Test connection
npx prisma db pull
```

#### Environment Variable Issues

**Problem**: Environment variables not available in production

**Solution**:
1. Check Vercel environment variables are set
2. Verify variables are assigned to correct environment
3. Redeploy after adding variables

```bash
# List environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME
```

#### TypeScript Errors

**Problem**: Type checking fails

**Solution**:
```bash
# Regenerate Prisma types
npm run prisma:generate

# Clear TypeScript cache
rm -rf node_modules/.cache

# Run type check
npm run type-check
```

#### Deployment Timeout

**Problem**: Vercel deployment times out

**Solution**:
1. Check build command is optimized
2. Reduce bundle size
3. Optimize database queries
4. Contact Vercel support if issue persists

### Performance Issues

**Problem**: Slow page loads

**Solutions**:
- Enable caching (Redis)
- Optimize images (use Next.js Image)
- Reduce JavaScript bundle size
- Enable CDN caching
- Use ISR (Incremental Static Regeneration)

**Problem**: High database query times

**Solutions**:
- Add database indexes
- Optimize queries
- Use connection pooling
- Enable query caching

### Getting Help

- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: Create an issue in the repository
- **Team Chat**: Slack/Discord channels
- **Documentation**: Check `/docs` folder

---

## Best Practices

### Development

1. **Always work on feature branches**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Write tests for new features**
   ```bash
   npm run test
   ```

3. **Run checks before committing**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

### Deployment

1. **Always deploy to preview first**
   - Create a pull request
   - Wait for preview deployment
   - Test thoroughly

2. **Use semantic versioning**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Monitor deployments**
   - Check deployment logs
   - Verify smoke tests pass
   - Monitor error rates

4. **Have a rollback plan**
   - Keep previous deployment accessible
   - Document rollback procedure
   - Test rollback in staging

### Security

1. **Never commit secrets**
   - Use `.env.local` for local secrets
   - Add to `.gitignore`
   - Use Vercel environment variables

2. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

3. **Regular security scans**
   ```bash
   npm run security:audit
   ```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
**Maintained by**: DevOps Team

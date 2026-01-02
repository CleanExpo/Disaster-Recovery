# Vercel Environment Variables Setup Guide

## Overview

This guide provides step-by-step instructions for configuring environment variables in Vercel for the Disaster Recovery - NRPG Platform. Proper environment configuration is critical for security, functionality, and deployment success.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Structure](#environment-structure)
3. [Setting Up Environment Variables](#setting-up-environment-variables)
4. [Environment-Specific Configuration](#environment-specific-configuration)
5. [Security Best Practices](#security-best-practices)
6. [Webhook Configuration](#webhook-configuration)
7. [Verification & Testing](#verification--testing)
8. [Troubleshooting](#troubleshooting)
9. [Environment Variable Reference](#environment-variable-reference)

---

## Prerequisites

Before setting up environment variables in Vercel:

- [ ] Vercel account created
- [ ] Project connected to Git repository
- [ ] All third-party service accounts created (Stripe, SendGrid, Sanity, etc.)
- [ ] API keys and secrets obtained
- [ ] `.env.example` file reviewed
- [ ] Production domain configured (if deploying to production)

---

## Environment Structure

Vercel supports three environment types:

### 1. **Development**
- Used for local development with `vercel dev`
- Pulled to local machine with `vercel env pull`
- Not used in deployments

### 2. **Preview**
- Used for all preview deployments (branches, PRs)
- Automatically applied to preview URLs
- Should use test/staging credentials

### 3. **Production**
- Used for production deployments only
- Applied to production domain
- Should use production credentials

---

## Setting Up Environment Variables

### Method 1: Vercel Dashboard (Recommended for Initial Setup)

1. **Navigate to Project Settings**
   ```
   https://vercel.com/[your-team]/[your-project]/settings/environment-variables
   ```

2. **Add Each Variable**
   - Click "Add New"
   - Enter variable name (exactly as in `.env.example`)
   - Enter variable value
   - Select environments (Development, Preview, Production)
   - Mark sensitive variables as "Encrypted" (see list below)
   - Click "Save"

3. **Bulk Import (Optional)**
   - Click "Import .env"
   - Paste contents of `.env.local` (with real values)
   - Review and select environments
   - Click "Import"

### Method 2: Vercel CLI (Recommended for Updates)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```

4. **Add Single Variable**
   ```bash
   vercel env add [VARIABLE_NAME] [environment]
   ```
   Example:
   ```bash
   vercel env add STRIPE_SECRET_KEY production
   # Paste value when prompted
   ```

5. **Add Multiple Variables from File**
   ```bash
   # For production
   vercel env add --from .env.production production

   # For preview
   vercel env add --from .env.preview preview
   ```

6. **Pull Environment Variables Locally**
   ```bash
   vercel env pull .env.local
   ```

---

## Environment-Specific Configuration

### Development Environment

**Purpose**: Local development with `vercel dev`

**Required Variables**:
```bash
# Core
DATABASE_URL=postgresql://admin:password@localhost:5432/disaster_recovery?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=[generate-locally]
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Use test credentials for all third-party services
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

**Setup**:
```bash
vercel env add DATABASE_URL development
vercel env add NEXTAUTH_URL development
vercel env add NEXTAUTH_SECRET development
# ... add remaining variables
```

---

### Preview Environment

**Purpose**: Branch deployments, PR previews, testing

**Required Variables**:
```bash
# Core
DATABASE_URL=[staging-database-url]
NEXTAUTH_URL=https://[project].vercel.app
NEXTAUTH_SECRET=[unique-secret-for-preview]
NEXT_PUBLIC_SITE_URL=https://[project].vercel.app

# Use test/staging credentials
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
SENDGRID_API_KEY=[test-api-key]
```

**Dynamic URL Handling**:
Vercel provides automatic variables for preview URLs:
```bash
# These are automatically available
VERCEL_URL=[auto-generated-preview-url]
VERCEL_ENV=preview
```

**Setup**:
```bash
vercel env add DATABASE_URL preview
vercel env add NEXTAUTH_SECRET preview
vercel env add STRIPE_SECRET_KEY preview
# ... add remaining variables
```

---

### Production Environment

**Purpose**: Production deployments on custom domain

**Required Variables**:
```bash
# Core
DATABASE_URL=[production-database-url]
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=[strong-production-secret]
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Use production credentials
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
SENDGRID_API_KEY=[production-api-key]
```

**Setup**:
```bash
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add STRIPE_SECRET_KEY production
# ... add remaining variables
```

---

## Security Best Practices

### Variables to Mark as "Encrypted"

In Vercel dashboard, mark these variables as **"Encrypted"** (sensitive):

- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SENDGRID_API_KEY` / `EMAIL_API_KEY`
- `SANITY_API_TOKEN`
- `ALGOLIA_ADMIN_API_KEY`
- `HCAPTCHA_SECRET_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `REDIS_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `GITHUB_SECRET`
- `GOOGLE_SECRET`
- `AWS_S3_SECRET_ACCESS_KEY`
- `CLOUDINARY_API_SECRET`
- `SENTRY_AUTH_TOKEN`
- Any variable containing `_SECRET_`, `_PASSWORD`, `_TOKEN`, or `_KEY`

### Variables Safe to Expose (Public)

These variables are prefixed with `NEXT_PUBLIC_` and are safe to expose:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_ALGOLIA_APP_ID`
- `NEXT_PUBLIC_ALGOLIA_API_KEY`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`

---

## Webhook Configuration

### Stripe Webhooks

**Preview Environment**:
1. Create webhook endpoint:
   ```
   https://[project].vercel.app/api/webhooks/stripe
   ```
2. Get webhook secret from Stripe Dashboard
3. Add to Vercel:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET preview
   ```

**Production Environment**:
1. Create webhook endpoint:
   ```
   https://your-domain.com/api/webhooks/stripe
   ```
2. Get webhook secret from Stripe Dashboard
3. Add to Vercel:
   ```bash
   vercel env add STRIPE_WEBHOOK_SECRET production
   ```

**Events to Listen For**:
```
payment_intent.succeeded
payment_intent.payment_failed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
checkout.session.completed
```

### Testing Webhooks Locally

1. **Install Stripe CLI**:
   ```bash
   stripe login
   ```

2. **Forward Webhooks**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Use Test Webhook Secret**:
   ```bash
   # Copy the webhook secret from CLI output
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

## Verification & Testing

### After Adding Variables

1. **Trigger a Deployment**
   ```bash
   git commit --allow-empty -m "Trigger deployment to apply env vars"
   git push
   ```

2. **Check Build Logs**
   - Navigate to Vercel dashboard
   - Open latest deployment
   - Check "Building" logs for errors
   - Verify no missing environment variables

3. **Test Application**
   - Visit deployment URL
   - Test authentication (login/signup)
   - Test Stripe checkout (use test card: 4242 4242 4242 4242)
   - Test email sending
   - Test search functionality
   - Verify analytics tracking

4. **Check Runtime Logs**
   - Navigate to deployment
   - Click "Functions" tab
   - Check for runtime errors
   - Verify environment variables are loaded

### Verification Checklist

- [ ] All required variables added for each environment
- [ ] Sensitive variables marked as "Encrypted"
- [ ] Webhook secrets match Stripe dashboard
- [ ] Database connection successful
- [ ] Authentication working
- [ ] Payments processing correctly
- [ ] Emails sending successfully
- [ ] Search functionality working
- [ ] No environment variable errors in logs

---

## Troubleshooting

### Common Issues

#### 1. "Missing environment variable: DATABASE_URL"

**Solution**:
```bash
# Add DATABASE_URL to correct environment
vercel env add DATABASE_URL production
```

#### 2. "NEXTAUTH_URL mismatch"

**Solution**:
```bash
# For production, use custom domain
NEXTAUTH_URL=https://your-domain.com

# For preview, use Vercel URL
NEXTAUTH_URL=https://[project].vercel.app
```

#### 3. "Stripe webhook signature verification failed"

**Solution**:
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check webhook endpoint URL is correct
- Ensure raw body parsing is enabled

#### 4. "Database connection failed"

**Solution**:
```bash
# Verify connection string format
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# For Supabase/Neon, use connection pooler:
DATABASE_URL=[pooler-url]
DIRECT_URL=[direct-url]
```

#### 5. "CORS errors"

**Solution**:
```bash
# Update CORS_ORIGIN to match deployment URL
CORS_ORIGIN=https://your-domain.com
```

#### 6. "Environment variables not updating"

**Solution**:
1. Delete existing variable
2. Re-add with correct value
3. Redeploy:
   ```bash
   vercel --prod
   ```

---

## Environment Variable Reference

### Minimum Required for Basic Functionality

```bash
# Core Application
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://...
NEXTAUTH_SECRET=...
NEXT_PUBLIC_SITE_URL=https://...
```

### Required for Payments

```bash
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Required for Email

```bash
EMAIL_FROM=noreply@your-domain.com
SENDGRID_API_KEY=SG....
```

### Required for CMS

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
```

### Required for Search

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=...
NEXT_PUBLIC_ALGOLIA_API_KEY=...
ALGOLIA_ADMIN_API_KEY=...
```

### Required for Security

```bash
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
HCAPTCHA_SECRET_KEY=...
```

### Optional but Recommended

```bash
# Analytics
NEXT_PUBLIC_GA4_ID=G-...
NEXT_PUBLIC_SENTRY_DSN=https://...

# Redis/Upstash (for rate limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# AI Services
GEMINI_API_KEY=...
```

---

## Quick Setup Script

Create a shell script to automate Vercel env setup:

```bash
#!/bin/bash
# setup-vercel-env.sh

# Production environment
vercel env add DATABASE_URL production < ./secrets/database-url-prod.txt
vercel env add NEXTAUTH_SECRET production < ./secrets/nextauth-secret-prod.txt
vercel env add STRIPE_SECRET_KEY production < ./secrets/stripe-secret-prod.txt
# ... add more variables

# Preview environment
vercel env add DATABASE_URL preview < ./secrets/database-url-preview.txt
vercel env add NEXTAUTH_SECRET preview < ./secrets/nextauth-secret-preview.txt
vercel env add STRIPE_SECRET_KEY preview < ./secrets/stripe-secret-preview.txt
# ... add more variables

echo "Environment variables configured!"
```

**Usage**:
```bash
chmod +x setup-vercel-env.sh
./setup-vercel-env.sh
```

---

## Secret Rotation Procedure

### When to Rotate

- Every 90 days for API keys
- Every 180 days for auth secrets
- Immediately if compromised
- After team member departure

### How to Rotate

1. **Generate New Secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Update in Vercel**:
   ```bash
   vercel env rm NEXTAUTH_SECRET production
   vercel env add NEXTAUTH_SECRET production
   # Paste new secret
   ```

3. **Update in Third-party Service** (if applicable)

4. **Redeploy**:
   ```bash
   vercel --prod
   ```

5. **Verify** functionality

6. **Document** rotation in security log

---

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Stripe Webhook Testing](https://stripe.com/docs/webhooks/test)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)

---

## Support

For issues with environment configuration:

1. Check Vercel build logs
2. Review this documentation
3. Check `.env.example` for correct format
4. Verify third-party service credentials
5. Contact DevOps team if issues persist

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
**Maintained By**: DevOps Team

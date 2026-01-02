# Environment Configuration Documentation

**Complete guide to environment variable configuration for the Disaster Recovery - NRPG Platform.**

---

## Overview

This directory contains comprehensive documentation for managing environment variables across all deployment environments. Proper environment configuration is critical for security, functionality, and production readiness.

---

## Documentation Index

### Quick Start
- **[ENV_QUICK_START.md](./ENV_QUICK_START.md)** - Fast setup guide for developers
  - Minimum required variables
  - Getting API keys
  - Local development setup
  - Common troubleshooting

### Deployment
- **[VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)** - Complete Vercel deployment guide
  - Environment structure (dev/preview/production)
  - Setting up variables in Vercel
  - Webhook configuration
  - Verification procedures

### Security
- **[SECRET_ROTATION_GUIDE.md](./SECRET_ROTATION_GUIDE.md)** - Secret management procedures
  - Rotation schedules
  - Service-specific procedures
  - Emergency rotation
  - Audit logging

---

## File Structure

```
.
├── .env.example              # Template with all variables (committed)
├── .env.local               # Your local secrets (NOT committed)
├── .env.development         # Shared dev config (NOT committed)
├── .env.staging             # Staging config (NOT committed)
├── .env.production          # Production config (NOT committed)
├── docs/
│   ├── ENV_QUICK_START.md   # Developer quick start
│   ├── VERCEL_ENV_SETUP.md  # Vercel deployment guide
│   └── SECRET_ROTATION_GUIDE.md  # Security procedures
└── scripts/
    └── validate-env.js      # Environment validation script
```

---

## Quick Reference

### Required for All Environments

```bash
DATABASE_URL              # PostgreSQL connection
NEXTAUTH_URL             # Authentication base URL
NEXTAUTH_SECRET          # Session encryption key
NEXT_PUBLIC_SITE_URL     # Public site URL
```

### Required for Payments

```bash
STRIPE_SECRET_KEY                    # Stripe API key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Public Stripe key
STRIPE_WEBHOOK_SECRET               # Webhook verification
```

### Required for Email

```bash
EMAIL_FROM           # Sender email address
SENDGRID_API_KEY    # SendGrid API key
```

### Required for Security

```bash
NEXT_PUBLIC_HCAPTCHA_SITE_KEY  # Bot protection
HCAPTCHA_SECRET_KEY            # Server-side verification
```

---

## Commands

### Validation

```bash
# Validate environment variables
npm run validate:env
npm run env:check

# Validate before build
npm run validate:env && npm run build
```

### Setup

```bash
# Copy example file
cp .env.example .env.local

# Generate secrets
openssl rand -base64 32
```

### Vercel CLI

```bash
# Add variable
vercel env add VARIABLE_NAME production

# Pull variables locally
vercel env pull .env.local

# Remove variable
vercel env rm VARIABLE_NAME production
```

---

## Environment Types

### Development
- **Purpose**: Local development with `npm run dev`
- **Source**: `.env.local` file
- **Database**: Local PostgreSQL or Docker
- **API Keys**: Use test/sandbox keys
- **Domain**: `http://localhost:3000`

### Preview
- **Purpose**: Branch deployments, PR previews
- **Source**: Vercel environment variables
- **Database**: Staging/development database
- **API Keys**: Use test/sandbox keys
- **Domain**: `https://[project]-[hash].vercel.app`

### Production
- **Purpose**: Live production deployments
- **Source**: Vercel environment variables
- **Database**: Production database
- **API Keys**: Use production keys
- **Domain**: `https://your-domain.com`

---

## Security Guidelines

### ✅ DO

- Use `.env.local` for local development
- Generate strong secrets (32+ characters)
- Use test API keys for development
- Keep `.env.local` in `.gitignore`
- Rotate secrets every 90-180 days
- Mark sensitive variables as "Encrypted" in Vercel
- Use different credentials per environment
- Store production secrets in secure vault

### ❌ DON'T

- Commit `.env.local` to Git
- Share API keys in Slack/email
- Use production keys for local development
- Hardcode secrets in source code
- Use weak or placeholder secrets
- Reuse secrets across environments
- Share secrets with unauthorized users
- Store secrets in plain text files

---

## Variables by Category

### Core Application
```bash
NEXT_PUBLIC_SITE_URL      # Public site URL
NODE_ENV                  # Environment: development/production
DATABASE_URL              # PostgreSQL connection
DIRECT_URL               # Direct DB connection (migrations)
```

### Authentication
```bash
NEXTAUTH_URL             # Auth base URL
NEXTAUTH_SECRET          # Session secret
JWT_SECRET               # JWT signing key
GITHUB_ID                # GitHub OAuth ID
GITHUB_SECRET            # GitHub OAuth secret
GOOGLE_ID                # Google OAuth ID
GOOGLE_SECRET            # Google OAuth secret
```

### Payments (Stripe)
```bash
STRIPE_SECRET_KEY                    # Secret key (sk_test_/sk_live_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Publishable key (pk_test_/pk_live_)
STRIPE_WEBHOOK_SECRET               # Webhook secret (whsec_)
```

### Email (SendGrid)
```bash
EMAIL_FROM               # From email address
EMAIL_FROM_NAME          # From name
SENDGRID_API_KEY        # SendGrid API key (SG.)
EMAIL_PROVIDER          # Provider: sendgrid/ses/smtp
```

### CMS (Sanity)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID    # Project ID
NEXT_PUBLIC_SANITY_DATASET       # Dataset name
SANITY_API_TOKEN                 # API token (sk)
```

### Search (Algolia)
```bash
NEXT_PUBLIC_ALGOLIA_APP_ID       # Application ID
NEXT_PUBLIC_ALGOLIA_API_KEY      # Search API key
ALGOLIA_ADMIN_API_KEY            # Admin API key
```

### Security
```bash
NEXT_PUBLIC_HCAPTCHA_SITE_KEY    # Site key (public)
HCAPTCHA_SECRET_KEY              # Secret key (0x)
RATE_LIMIT_REDIS_URL             # Redis for rate limiting
```

### Analytics
```bash
NEXT_PUBLIC_GA4_ID               # Google Analytics (G-)
NEXT_PUBLIC_SENTRY_DSN           # Sentry error tracking
```

### Cache & Storage
```bash
REDIS_URL                        # Redis connection
UPSTASH_REDIS_REST_URL          # Upstash REST URL
UPSTASH_REDIS_REST_TOKEN        # Upstash token
```

### AI Services
```bash
GEMINI_API_KEY                   # Google Gemini
OPENAI_API_KEY                   # OpenAI (sk-)
ANTHROPIC_API_KEY                # Claude (sk-ant-)
```

---

## Troubleshooting

### "Missing environment variable"
1. Check variable name matches `.env.example` exactly
2. Verify `.env.local` file exists
3. Restart dev server after adding variables
4. Run `npm run validate:env` to check configuration

### "Database connection failed"
1. Verify `DATABASE_URL` format is correct
2. Check PostgreSQL is running (`docker-compose ps`)
3. Test connection: `psql $DATABASE_URL`
4. Check firewall/network settings

### "Stripe webhook verification failed"
1. Verify `STRIPE_WEBHOOK_SECRET` matches dashboard
2. Check webhook endpoint URL is correct
3. Use Stripe CLI for local testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### "NextAuth error"
1. Ensure `NEXTAUTH_URL` matches `NEXT_PUBLIC_SITE_URL`
2. Generate strong `NEXTAUTH_SECRET` (32+ chars)
3. Clear cookies and restart browser
4. Check OAuth redirect URIs in provider settings

### "Email sending failed"
1. Verify `SENDGRID_API_KEY` is valid
2. Check sender email is verified in SendGrid
3. Review SendGrid activity feed for errors
4. Ensure API key has necessary permissions

---

## Getting API Keys

### Stripe (Payments)
1. Sign up at https://stripe.com
2. Navigate to Developers → API Keys
3. Copy Publishable and Secret keys
4. Set up webhooks at Developers → Webhooks

### SendGrid (Email)
1. Sign up at https://sendgrid.com
2. Navigate to Settings → API Keys
3. Create new key with Full Access
4. Verify sender email

### Sanity (CMS)
1. Sign up at https://sanity.io
2. Create new project or use existing
3. Copy Project ID from project settings
4. Generate API token in Settings → API

### Algolia (Search)
1. Sign up at https://algolia.com
2. Navigate to Settings → API Keys
3. Copy Application ID and Search API Key
4. Generate new Admin API Key for indexing

### hCaptcha (Security)
1. Sign up at https://hcaptcha.com
2. Add new site
3. Copy Site Key and Secret Key
4. Configure difficulty level

### Google Gemini (AI)
1. Navigate to https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy key for environment variables
4. Monitor usage in console

---

## Rotation Schedule

| Service | Frequency | Priority |
|---------|-----------|----------|
| Database credentials | 90 days | High |
| Stripe API keys | 90 days | High |
| SendGrid API keys | 90 days | Medium |
| NextAuth secrets | 180 days | High |
| JWT secrets | 180 days | High |
| OAuth secrets | 180 days | Medium |
| AI API keys | 90 days | Medium |

See [SECRET_ROTATION_GUIDE.md](./SECRET_ROTATION_GUIDE.md) for detailed procedures.

---

## Support

### Documentation
- Quick start: [ENV_QUICK_START.md](./ENV_QUICK_START.md)
- Vercel setup: [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)
- Secret rotation: [SECRET_ROTATION_GUIDE.md](./SECRET_ROTATION_GUIDE.md)

### Commands
```bash
npm run validate:env  # Validate configuration
npm run env:check     # Check environment
```

### Contacts
- DevOps team: #devops-support
- Security team: #security
- Development team: #dev-support

---

**Last Updated**: 2026-01-02
**Maintained By**: DevOps Team
**Review Schedule**: Quarterly

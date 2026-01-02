# Environment Variables Quick Start Guide

**Quick reference for setting up environment variables for local development.**

---

## 1. Initial Setup (First Time)

```bash
# 1. Copy the example file
cp .env.example .env.local

# 2. Edit .env.local with your actual credentials
# Use your preferred text editor
code .env.local  # VS Code
nano .env.local  # Terminal
```

---

## 2. Minimum Required Variables

For the application to run locally, you need **at minimum**:

```bash
# Core (REQUIRED)
DATABASE_URL=postgresql://admin:password@localhost:5432/disaster_recovery?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Generate secrets:
# openssl rand -base64 32
```

---

## 3. Full Local Development Setup

For complete functionality, add these to `.env.local`:

```bash
# ===== CORE =====
DATABASE_URL=postgresql://admin:password@localhost:5432/disaster_recovery?schema=public
DIRECT_URL=postgresql://admin:password@localhost:5432/disaster_recovery?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ===== STRIPE (Test Mode) =====
STRIPE_SECRET_KEY=sk_test_your_test_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ===== EMAIL (SendGrid) =====
SENDGRID_API_KEY=SG.your_api_key_here
EMAIL_FROM=noreply@localhost
EMAIL_FROM_NAME=Disaster Recovery Local

# ===== REDIS =====
REDIS_URL=redis://localhost:6379

# ===== OPTIONAL =====
# Leave these empty if not needed
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_TOKEN=

NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_API_KEY=
ALGOLIA_ADMIN_API_KEY=

NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET_KEY=

GEMINI_API_KEY=
```

---

## 4. Get API Keys

### Stripe (Payments)
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy "Publishable key" → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Reveal and copy "Secret key" → `STRIPE_SECRET_KEY`
4. For webhooks: https://dashboard.stripe.com/test/webhooks

### SendGrid (Email)
1. Go to: https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Choose "Full Access"
4. Copy key → `SENDGRID_API_KEY`

### Sanity CMS (Optional)
1. Go to: https://sanity.io/manage
2. Select or create project
3. Copy Project ID → `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Settings → API → Tokens → Add token

### Algolia Search (Optional)
1. Go to: https://dashboard.algolia.com/account/api-keys
2. Copy Application ID → `NEXT_PUBLIC_ALGOLIA_APP_ID`
3. Copy Search API Key → `NEXT_PUBLIC_ALGOLIA_API_KEY`
4. Copy Admin API Key → `ALGOLIA_ADMIN_API_KEY`

### hCaptcha (Bot Protection - Optional)
1. Go to: https://dashboard.hcaptcha.com/
2. Create new site
3. Copy Site Key → `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
4. Copy Secret Key → `HCAPTCHA_SECRET_KEY`

### Google Gemini (AI - Optional)
1. Go to: https://makersuite.google.com/app/apikey
2. Create API Key
3. Copy key → `GEMINI_API_KEY`

---

## 5. Start Local Services

If using Docker for local development:

```bash
# Start PostgreSQL + Redis
docker-compose up -d

# Verify services are running
docker-compose ps

# Check logs if issues
docker-compose logs -f
```

Or start manually:
```bash
# PostgreSQL (if installed locally)
pg_ctl start

# Redis (if installed locally)
redis-server
```

---

## 6. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

---

## 7. Run the Application

```bash
# Development mode
npm run dev

# Application should be running at:
# http://localhost:3000
```

---

## 8. Verify Setup

Visit these URLs to verify:

- **Homepage**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **Database**: http://localhost:3000/api/db/status

Check for errors in terminal output.

---

## 9. Common Issues

### "Cannot connect to database"
```bash
# Check DATABASE_URL is correct
# Verify PostgreSQL is running
docker-compose ps

# Or check local PostgreSQL
pg_isready
```

### "NEXTAUTH_SECRET is not set"
```bash
# Generate a secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=the_generated_secret_here
```

### "Missing environment variable"
```bash
# Check spelling matches .env.example exactly
# Restart dev server after adding variables
# Ctrl+C and npm run dev again
```

### "Stripe webhook fails"
```bash
# For local testing, use Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook secret from CLI output
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## 10. Environment Files Explained

| File | Purpose | Committed to Git? |
|------|---------|-------------------|
| `.env.example` | Template with dummy values | ✅ Yes |
| `.env.local` | Your actual local secrets | ❌ No |
| `.env.development` | Shared dev team config | ❌ No |
| `.env.production` | Production config | ❌ No |
| `.env.staging` | Staging config | ❌ No |

**Never commit `.env.local` or any file with actual secrets!**

---

## 11. Testing Your Setup

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Check linting
npm run lint

# Type checking
npm run type-check
```

---

## 12. Deployment to Vercel

When ready to deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
# ... add all required variables

# Deploy
vercel --prod
```

See [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) for detailed deployment guide.

---

## 13. Getting Help

If you encounter issues:

1. Check `.env.example` for correct variable names
2. Verify all required variables are set
3. Check terminal for specific error messages
4. Review [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) for detailed info
5. Check service provider dashboards for API key status
6. Ask team for help in #dev-support

---

## 14. Security Reminders

- ✅ **DO**: Use `.env.local` for local development
- ✅ **DO**: Generate strong secrets with `openssl rand -base64 32`
- ✅ **DO**: Use test API keys for local development
- ✅ **DO**: Keep `.env.local` in `.gitignore`

- ❌ **DON'T**: Commit `.env.local` to Git
- ❌ **DON'T**: Share your API keys in Slack/email
- ❌ **DON'T**: Use production keys for local development
- ❌ **DON'T**: Hardcode secrets in source code

---

## Quick Command Reference

```bash
# Copy example file
cp .env.example .env.local

# Generate secret
openssl rand -base64 32

# Start services
docker-compose up -d

# Setup database
npx prisma migrate dev

# Start app
npm run dev

# Add Vercel env var
vercel env add VARIABLE_NAME production
```

---

**Need More Help?**
- Full setup guide: [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)
- Secret rotation: [SECRET_ROTATION_GUIDE.md](./SECRET_ROTATION_GUIDE.md)
- Project documentation: [../README.md](../README.md)

---

**Last Updated**: 2026-01-02

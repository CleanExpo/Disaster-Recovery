# NRP Platform Production Deployment Guide

## 🚀 Deployment Overview

This guide covers the complete deployment process for the National Recovery Partners platform to production environments.

---

## 📋 Pre-Deployment Checklist

### Required Services
- [ ] Vercel account (or AWS hosting)
- [ ] PostgreSQL database (Supabase/Neon/Railway)
- [ ] Stripe account with API keys
- [ ] SendGrid/Mailchimp account for emails
- [ ] Domain name (disasterrecovery.com.au)
- [ ] SSL certificate (auto-handled by Vercel)
- [ ] Google Maps API key
- [ ] OpenAI API key (optional for AI features)
- [ ] Sentry account for monitoring

### Environment Variables Required
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Authentication
NEXTAUTH_URL=https://disasterrecovery.com.au
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_APPLICATION_FEE_PRICE_ID=price_xxx
STRIPE_JOINING_FEE_PRICE_ID=price_xxx

# Email Service (SendGrid)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxx
SMTP_FROM=noreply@disasterrecovery.com.au

# APIs
GOOGLE_MAPS_API_KEY=AIza_xxx
OPENAI_API_KEY=sk-xxx (optional)

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx

# Public URLs
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXT_PUBLIC_SITE_URL=https://disasterrecovery.com.au
```

---

## 🔧 Database Setup

### 1. PostgreSQL with Supabase (Recommended)
```bash
# 1. Create Supabase project at https://supabase.com
# 2. Get connection string from Settings > Database
# 3. Update DATABASE_URL in Vercel environment variables
```

### 2. Database Migration
```bash
# Run migrations
npx prisma migrate deploy

# Seed initial data (optional)
npx prisma db seed
```

---

## 🌐 Vercel Deployment

### 1. Initial Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

### 2. Configure Environment Variables
```bash
# Add each environment variable
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... add all required variables
```

### 3. Deploy to Production
```bash
# Deploy to production
vercel --prod

# Or use GitHub integration for automatic deployments
```

### 4. Domain Configuration
1. Go to Vercel Dashboard > Settings > Domains
2. Add `disasterrecovery.com.au`
3. Configure DNS records:
   ```
   A Record: @ -> 76.76.21.21
   CNAME: www -> cname.vercel-dns.com
   ```

---

## ☁️ AWS Deployment (Alternative)

### 1. AWS Amplify Setup
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### 2. EC2 with Docker
```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```bash
# Build and deploy
docker build -t nrp-platform .
docker run -p 3000:3000 --env-file .env.production nrp-platform
```

---

## 📧 Email Service Setup

### SendGrid Configuration
1. Create SendGrid account
2. Verify sender domain
3. Generate API key
4. Update SMTP environment variables

### Email Templates to Configure
- Welcome email
- Application confirmation
- Payment receipt
- Lead notification
- Password reset

---

## 💳 Stripe Setup

### 1. Create Products & Prices
```javascript
// In Stripe Dashboard, create:
// 1. Application Fee - $275 one-time
// 2. Joining Fee - $2,200 one-time
// 3. Monthly Subscriptions:
//    - Month 1: Free
//    - Month 2: $198 (60% off)
//    - Month 3: $247 (50% off)
//    - Regular: $495/month
```

### 2. Webhook Configuration
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://disasterrecovery.com.au/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

---

## 🔍 SEO Configuration

### 1. Sitemap Generation
The sitemap is automatically generated at `/api/sitemap`

### 2. Robots.txt
Served from `/api/robots`

### 3. Meta Tags
All pages include comprehensive Open Graph and Twitter Card meta tags

---

## 📊 Monitoring Setup

### 1. Sentry Error Tracking
```javascript
// Already configured in src/lib/sentry.ts
// Just add SENTRY_DSN to environment variables
```

### 2. Vercel Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Automatically enabled when deployed to Vercel
```

### 3. Google Analytics (Optional)
```html
<!-- Add to _document.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 🚦 Health Checks

### API Health Check
```bash
curl https://disasterrecovery.com.au/api/health
```

### Database Connection
```bash
curl https://disasterrecovery.com.au/api/health/db
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🔐 Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use Vercel's environment variable UI
- Rotate secrets regularly

### 2. API Rate Limiting
Already implemented in API routes with custom rate limiting

### 3. CORS Configuration
```javascript
// Configured in next.config.js
headers: {
  'Access-Control-Allow-Origin': 'https://disasterrecovery.com.au',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}
```

### 4. Content Security Policy
```javascript
// Add to next.config.js
headers: {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
}
```

---

## 🚨 Rollback Procedure

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
```

### Database Rollback
```bash
# Rollback last migration
npx prisma migrate rollback

# Restore from backup
pg_restore -d DATABASE_URL backup.sql
```

---

## 📱 Post-Deployment Tasks

### 1. DNS Propagation
- Wait 24-48 hours for full propagation
- Test from multiple locations

### 2. SSL Certificate
- Automatically provisioned by Vercel
- Check at: https://www.ssllabs.com/ssltest/

### 3. Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Load testing with k6
k6 run load-test.js
```

### 4. SEO Verification
- Submit sitemap to Google Search Console
- Verify meta tags with social media debuggers
- Test structured data with Google's Rich Results Test

---

## 📞 Support Contacts

### Critical Issues
- **Vercel Support**: https://vercel.com/support
- **Database**: Check provider's status page
- **Stripe**: https://status.stripe.com

### Monitoring Alerts
- Set up PagerDuty integration
- Configure Slack webhooks for alerts
- Email alerts to: ops@disasterrecovery.com.au

---

## 📝 Deployment Log Template

```markdown
## Deployment - [DATE]

**Version**: x.x.x
**Deployed By**: [Name]
**Environment**: Production

### Changes
- Feature: [Description]
- Fix: [Description]
- Update: [Description]

### Database Migrations
- [ ] Migration ran successfully
- [ ] Seed data updated

### Configuration Changes
- [ ] Environment variables updated
- [ ] API keys rotated

### Testing
- [ ] Health checks passing
- [ ] Payment flow tested
- [ ] Email notifications working

### Notes
[Any additional notes or issues]
```

---

## ✅ Final Checklist

Before marking deployment complete:
- [ ] All health checks passing
- [ ] SSL certificate active
- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] Payment processing working
- [ ] Email sending verified
- [ ] SEO meta tags present
- [ ] Monitoring active
- [ ] Backup strategy in place
- [ ] Documentation updated

---

**Last Updated**: August 2024
**Platform Version**: 1.0.0
**Status**: PRODUCTION READY
# 🚀 Production Setup Guide - Disaster Recovery Australia

## 📋 Overview

This platform operates in two modes:
1. **Demo Mode** (Default) - Uses mock data and services, perfect for investor presentations
2. **Production Mode** - Live services activated when API keys are configured

## 🎭 Current Status: DEMO MODE

The system is currently running in Demo Mode with:
- ✅ Full functionality with mock data
- ✅ 50 mock contractors across Australia
- ✅ 200 sample leads over 3 months
- ✅ Simulated payments, AI responses, and notifications
- ✅ Complete investor demo scenarios

## 🔑 Switching to Production

### Step 1: Obtain API Keys

You'll need to obtain the following API keys:

#### 1. **Stripe** (Payment Processing)
- Go to https://dashboard.stripe.com
- Get your keys from Developers → API Keys
- Required keys:
  - `STRIPE_SECRET_KEY` (starts with `sk_live_` for production)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_live_` for production)
  - `STRIPE_WEBHOOK_SECRET` (from Webhooks section)

#### 2. **OpenRouter** (AI Orchestration)
- Sign up at https://openrouter.ai
- Get your API key from Account Settings
- Required: `OPENROUTER_API_KEY`

#### 3. **Anthropic** (Claude AI)
- Sign up at https://console.anthropic.com
- Get your API key from API Keys section
- Required: `ANTHROPIC_API_KEY`

#### 4. **Email Service** (SMTP)
- Use any SMTP service (SendGrid, Mailgun, AWS SES, etc.)
- Required configuration:
  - `EMAIL_SERVER_HOST`
  - `EMAIL_SERVER_PORT`
  - `EMAIL_SERVER_USER`
  - `EMAIL_SERVER_PASSWORD`
  - `EMAIL_FROM`

#### 5. **Optional Services**
- **Twilio** (SMS): `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- **Google Maps**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Clean Claims (CARSI)**: Contact provider for integration
- **PISA Background Checks**: Contact provider for API access

### Step 2: Configure Environment Variables

#### For Local Development:
1. Copy `.env.example` to `.env.local`
2. Fill in your API keys:

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/disaster_recovery"

# Stripe
STRIPE_SECRET_KEY=sk_live_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI Services
OPENROUTER_API_KEY=sk-or-v1-your_key_here
ANTHROPIC_API_KEY=sk-ant-api03-your_key_here

# Email
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your_sendgrid_api_key
EMAIL_FROM=noreply@disasterrecovery.com.au

# NextAuth
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

#### For Production (Vercel):
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable for the Production environment
4. **IMPORTANT**: Never commit actual API keys to Git

### Step 3: Database Setup

#### For Development:
```bash
# Install PostgreSQL locally
# Create database
createdb disaster_recovery

# Run migrations
npx prisma migrate dev
```

#### For Production:
1. Use a managed PostgreSQL service:
   - **Recommended**: Neon, Supabase, or AWS RDS
   - Get your connection string
   - Update `DATABASE_URL` in Vercel

2. Run production migrations:
```bash
npx prisma migrate deploy
```

### Step 4: Deploy to Production

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
vercel --prod

# The system will automatically detect API keys and switch to production mode
```

## 🔍 Verifying Production Mode

When properly configured, you'll see:
1. Demo Mode banner will disappear
2. Console will show: "✅ Production Mode Active"
3. Real payments will process through Stripe
4. AI responses will use OpenRouter/Anthropic
5. Emails will send via SMTP
6. All mock services will be replaced with live integrations

## 📊 Production Checklist

### Essential for Go-Live:
- [ ] Stripe account verified and activated
- [ ] SSL certificate configured (automatic with Vercel)
- [ ] Database backups configured
- [ ] Error monitoring setup (Sentry recommended)
- [ ] Google Analytics configured
- [ ] ABN and business registration verified
- [ ] Insurance documentation uploaded
- [ ] Terms of Service and Privacy Policy reviewed by legal

### Compliance Requirements:
- [ ] GST registration confirmed
- [ ] Australian Consumer Law compliance verified
- [ ] Privacy Act 1988 compliance
- [ ] Payment Card Industry (PCI) compliance
- [ ] WorkSafe requirements met

## 🚨 Important Security Notes

1. **API Key Rotation**: If any key is exposed, rotate immediately
2. **Environment Separation**: Use different keys for dev/staging/prod
3. **Access Control**: Limit API key permissions to minimum required
4. **Monitoring**: Set up alerts for unusual API usage
5. **Backup Keys**: Store backup keys securely (not in code)

## 📞 Support Contacts

### Technical Support:
- Vercel Support: https://vercel.com/support
- Stripe Support: https://support.stripe.com
- OpenRouter: support@openrouter.ai
- Anthropic: support@anthropic.com

### Platform Support:
- Email: tech@disasterrecovery.com.au
- Emergency: 1300 DISASTER (1300 347 278)

## 🔄 Switching Back to Demo Mode

To switch back to demo mode (for testing or demonstrations):
1. Remove or rename API keys in environment variables
2. The system will automatically detect missing keys and use mock services
3. Demo Mode banner will appear at the top of the site

## 📈 Monitoring Production

### Key Metrics to Track:
- Response time < 2 seconds
- Uptime > 99.9%
- Failed payment rate < 2%
- Contractor response time < specified SLA
- Customer satisfaction > 4.5/5

### Recommended Monitoring Tools:
- **Application**: New Relic or Datadog
- **Errors**: Sentry
- **Uptime**: Pingdom or StatusCake
- **Analytics**: Google Analytics + Microsoft Clarity

## 🎯 Go-Live Checklist

### 48 Hours Before:
- [ ] All API keys configured in Vercel
- [ ] Database migrated and backed up
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Legal documents in place

### 24 Hours Before:
- [ ] DNS configured
- [ ] SSL certificate verified
- [ ] Email deliverability tested
- [ ] Payment flow tested with real card
- [ ] Emergency response team briefed

### Launch Day:
- [ ] Monitor error rates
- [ ] Check payment processing
- [ ] Verify email delivery
- [ ] Test contractor notifications
- [ ] Monitor server resources

## 💡 Quick Troubleshooting

### System stays in Demo Mode:
- Check all required API keys are set
- Verify keys are in Production environment (not just Development)
- Check for typos in environment variable names
- Restart the application after adding keys

### Payments not processing:
- Verify Stripe webhook endpoint is configured
- Check Stripe API key starts with `sk_live_` (not `sk_test_`)
- Ensure webhook secret is correct

### Emails not sending:
- Verify SMTP credentials
- Check firewall allows outbound SMTP
- Test with a tool like `swaks` or `telnet`

---

**Remember**: The system is designed to fail gracefully. If any service is unavailable, it will fall back to mock mode for that specific service while keeping others operational.

For additional support, contact the development team.
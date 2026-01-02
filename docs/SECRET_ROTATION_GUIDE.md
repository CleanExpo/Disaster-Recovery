# Secret Rotation Guide

## Overview

This guide outlines procedures for rotating secrets, API keys, and credentials for the Disaster Recovery - NRPG Platform. Regular secret rotation is a critical security practice that reduces the impact of potential credential compromise.

---

## Table of Contents

1. [Rotation Schedule](#rotation-schedule)
2. [Pre-Rotation Checklist](#pre-rotation-checklist)
3. [Rotation Procedures by Service](#rotation-procedures-by-service)
4. [Emergency Rotation](#emergency-rotation)
5. [Post-Rotation Verification](#post-rotation-verification)
6. [Rotation Log Template](#rotation-log-template)

---

## Rotation Schedule

### Regular Rotation Intervals

| Secret Type | Rotation Interval | Priority | Complexity |
|-------------|------------------|----------|------------|
| Database credentials | 90 days | High | Medium |
| Stripe API keys | 90 days | High | Low |
| SendGrid API keys | 90 days | Medium | Low |
| NextAuth secrets | 180 days | High | Low |
| JWT secrets | 180 days | High | Low |
| OAuth secrets | 180 days | Medium | Medium |
| Sanity API tokens | 90 days | Low | Low |
| Algolia API keys | 90 days | Low | Low |
| hCaptcha secrets | 180 days | Low | Low |
| Gemini API keys | 90 days | Medium | Low |
| Redis passwords | 90 days | Medium | Medium |

### Rotation Calendar

**Quarter 1 (Jan-Mar)**:
- Week 1: Database credentials
- Week 2: Stripe keys
- Week 3: SendGrid keys
- Week 4: AI API keys (Gemini, OpenAI)

**Quarter 2 (Apr-Jun)**:
- Week 1: NextAuth & JWT secrets
- Week 2: OAuth secrets (GitHub, Google)
- Week 3: Redis passwords
- Week 4: CMS & Search API keys

**Quarter 3 (Jul-Sep)**:
- Week 1: Database credentials
- Week 2: Stripe keys
- Week 3: SendGrid keys
- Week 4: AI API keys

**Quarter 4 (Oct-Dec)**:
- Week 1: NextAuth & JWT secrets
- Week 2: OAuth secrets
- Week 3: Redis passwords
- Week 4: CMS & Search API keys

---

## Pre-Rotation Checklist

Before rotating any secret:

- [ ] **Schedule maintenance window** (if downtime expected)
- [ ] **Notify team** of upcoming rotation
- [ ] **Backup current secrets** to secure vault
- [ ] **Verify backup procedures** are working
- [ ] **Prepare rollback plan** in case of issues
- [ ] **Test in staging first** (if applicable)
- [ ] **Have monitoring ready** to detect issues
- [ ] **Coordinate with on-call engineer**

---

## Rotation Procedures by Service

### 1. Database Credentials (PostgreSQL)

**Frequency**: Every 90 days
**Downtime**: None (zero-downtime rotation)
**Complexity**: Medium

#### Procedure:

1. **Create New Database User**:
   ```sql
   -- Connect to database as superuser
   CREATE USER disaster_recovery_new WITH PASSWORD 'new-secure-password';
   GRANT ALL PRIVILEGES ON DATABASE disaster_recovery TO disaster_recovery_new;
   GRANT ALL ON SCHEMA public TO disaster_recovery_new;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO disaster_recovery_new;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO disaster_recovery_new;
   ```

2. **Update Connection String**:
   ```bash
   # Old
   DATABASE_URL=postgresql://admin:old-password@host:5432/disaster_recovery

   # New
   DATABASE_URL=postgresql://disaster_recovery_new:new-secure-password@host:5432/disaster_recovery
   ```

3. **Update in Vercel**:
   ```bash
   vercel env rm DATABASE_URL production
   vercel env add DATABASE_URL production
   # Paste new connection string
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

5. **Verify Connection**:
   - Check application logs
   - Test database operations
   - Monitor error rates

6. **Remove Old User** (after 24 hours):
   ```sql
   DROP USER admin;
   ```

#### Managed Database Services:

**Supabase**:
1. Navigate to Database Settings
2. Click "Generate new password"
3. Copy new connection string
4. Update in Vercel

**Neon**:
1. Navigate to Connection Details
2. Click "Reset password"
3. Copy new connection string
4. Update in Vercel

**AWS RDS**:
1. Use AWS Secrets Manager rotation
2. Update connection string in Vercel

---

### 2. Stripe API Keys

**Frequency**: Every 90 days
**Downtime**: None
**Complexity**: Low

#### Procedure:

1. **Create New Keys**:
   - Go to [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys)
   - Click "Create secret key"
   - Name it: `disaster-recovery-prod-[date]`
   - Copy the new secret key (starts with `sk_live_`)

2. **Update in Vercel**:
   ```bash
   # Update secret key
   vercel env rm STRIPE_SECRET_KEY production
   vercel env add STRIPE_SECRET_KEY production
   # Paste new secret key

   # Publishable key (if changed)
   vercel env rm NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Test Payment Flow**:
   - Complete test transaction
   - Verify webhook processing
   - Check Stripe dashboard for events

5. **Delete Old Key** (after 24 hours):
   - Go to Stripe Dashboard → API Keys
   - Find old key
   - Click "Delete"

#### Webhook Secret Rotation:

1. **Create New Webhook Endpoint**:
   - Go to Stripe Dashboard → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/webhooks/stripe-new`
   - Select events
   - Copy signing secret

2. **Update Code** to handle both endpoints temporarily

3. **Update Environment Variable**:
   ```bash
   vercel env rm STRIPE_WEBHOOK_SECRET production
   vercel env add STRIPE_WEBHOOK_SECRET production
   ```

4. **Deploy and Test**

5. **Delete Old Endpoint** (after 24 hours)

---

### 3. SendGrid API Key

**Frequency**: Every 90 days
**Downtime**: None
**Complexity**: Low

#### Procedure:

1. **Create New API Key**:
   - Go to [SendGrid Dashboard → Settings → API Keys](https://app.sendgrid.com/settings/api_keys)
   - Click "Create API Key"
   - Name: `disaster-recovery-prod-[date]`
   - Permissions: Full Access (or specific permissions)
   - Copy the new API key

2. **Update in Vercel**:
   ```bash
   vercel env rm SENDGRID_API_KEY production
   vercel env add SENDGRID_API_KEY production
   # Paste new API key

   # Also update EMAIL_API_KEY if used
   vercel env rm EMAIL_API_KEY production
   vercel env add EMAIL_API_KEY production
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Test Email Sending**:
   - Trigger test email (password reset, welcome email)
   - Verify delivery
   - Check SendGrid activity feed

5. **Delete Old Key**:
   - Go to SendGrid Dashboard → API Keys
   - Find old key
   - Click "Delete"

---

### 4. NextAuth & JWT Secrets

**Frequency**: Every 180 days
**Downtime**: Sessions invalidated (users logged out)
**Complexity**: Low

#### Procedure:

1. **Generate New Secrets**:
   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32

   # Generate JWT_SECRET (should be different)
   openssl rand -base64 32
   ```

2. **Update in Vercel**:
   ```bash
   # NEXTAUTH_SECRET
   vercel env rm NEXTAUTH_SECRET production
   vercel env add NEXTAUTH_SECRET production
   # Paste new secret

   # JWT_SECRET
   vercel env rm JWT_SECRET production
   vercel env add JWT_SECRET production
   # Paste new secret
   ```

3. **Schedule Rotation**:
   - Choose low-traffic time (e.g., 2 AM)
   - Notify users in advance

4. **Deploy**:
   ```bash
   vercel --prod
   ```

5. **Impact**:
   - All users logged out
   - Must sign in again
   - Active sessions invalidated

6. **Communicate to Users**:
   ```
   Subject: Scheduled Maintenance - Re-login Required

   As part of our regular security maintenance, we've updated
   authentication systems. Please log in again to continue.
   ```

---

### 5. OAuth Secrets (GitHub, Google)

**Frequency**: Every 180 days
**Downtime**: None
**Complexity**: Medium

#### GitHub OAuth:

1. **Create New OAuth App** (or regenerate secret):
   - Go to [GitHub → Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
   - Click your app
   - Click "Generate a new client secret"
   - Copy the new secret

2. **Update in Vercel**:
   ```bash
   vercel env rm GITHUB_SECRET production
   vercel env add GITHUB_SECRET production
   # Paste new secret
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Test**: Attempt GitHub login

#### Google OAuth:

1. **Regenerate Client Secret**:
   - Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
   - Click your OAuth 2.0 Client ID
   - Click "Reset secret" or create new credentials
   - Copy the new secret

2. **Update in Vercel**:
   ```bash
   vercel env rm GOOGLE_SECRET production
   vercel env add GOOGLE_SECRET production
   # Paste new secret
   ```

3. **Deploy and Test**

---

### 6. Redis Password

**Frequency**: Every 90 days
**Downtime**: Minimal (cache flush)
**Complexity**: Medium

#### Procedure:

1. **Update Redis Password** (depends on provider):

   **Upstash**:
   - Dashboard → Database → Reset Password
   - Copy new password

   **AWS ElastiCache**:
   - Console → Modify → Auth Token
   - Copy new token

   **Self-hosted**:
   ```bash
   redis-cli CONFIG SET requirepass "new-password"
   redis-cli CONFIG REWRITE
   ```

2. **Update Connection String**:
   ```bash
   # Old
   REDIS_URL=redis://:old-password@host:6379

   # New
   REDIS_URL=redis://:new-password@host:6379
   ```

3. **Update in Vercel**:
   ```bash
   vercel env rm REDIS_URL production
   vercel env add REDIS_URL production

   # Also update UPSTASH_REDIS_REST_TOKEN if using Upstash
   vercel env rm UPSTASH_REDIS_REST_TOKEN production
   vercel env add UPSTASH_REDIS_REST_TOKEN production
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

5. **Impact**:
   - Cache cleared
   - Rate limits reset
   - Session store cleared (users may be logged out)

---

### 7. Sanity CMS API Token

**Frequency**: Every 90 days
**Downtime**: None
**Complexity**: Low

#### Procedure:

1. **Create New Token**:
   - Go to [Sanity Manage](https://sanity.io/manage)
   - Select your project
   - Settings → API → Tokens
   - Click "Add API token"
   - Name: `disaster-recovery-prod-[date]`
   - Permissions: Editor
   - Copy the new token

2. **Update in Vercel**:
   ```bash
   vercel env rm SANITY_API_TOKEN production
   vercel env add SANITY_API_TOKEN production
   # Paste new token
   ```

3. **Deploy and Test**

4. **Delete Old Token**:
   - Find old token in Sanity dashboard
   - Click "Delete"

---

### 8. Algolia API Keys

**Frequency**: Every 90 days
**Downtime**: None
**Complexity**: Low

#### Procedure:

1. **Rotate Admin API Key**:
   - Go to [Algolia Dashboard → Settings → API Keys](https://dashboard.algolia.com/account/api-keys)
   - Click "All API Keys"
   - Click "Generate new Admin API Key" or create new key with admin rights
   - Copy new key

2. **Update in Vercel**:
   ```bash
   vercel env rm ALGOLIA_ADMIN_API_KEY production
   vercel env add ALGOLIA_ADMIN_API_KEY production
   # Paste new key
   ```

3. **Deploy and Test**

4. **Delete Old Key**

---

### 9. hCaptcha Secret Key

**Frequency**: Every 180 days
**Downtime**: None
**Complexity**: Low

#### Procedure:

1. **Generate New Secret**:
   - Go to [hCaptcha Dashboard](https://dashboard.hcaptcha.com/)
   - Settings → Sitekeys
   - Create new sitekey or regenerate secret

2. **Update in Vercel**:
   ```bash
   vercel env rm HCAPTCHA_SECRET_KEY production
   vercel env add HCAPTCHA_SECRET_KEY production

   # Also update site key if changed
   vercel env rm NEXT_PUBLIC_HCAPTCHA_SITE_KEY production
   vercel env add NEXT_PUBLIC_HCAPTCHA_SITE_KEY production
   ```

3. **Deploy and Test**

---

### 10. AI API Keys (Gemini, OpenAI, Anthropic)

**Frequency**: Every 90 days
**Downtime**: None
**Complexity**: Low

#### Gemini API:

1. **Create New API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"
   - Copy the new key

2. **Update in Vercel**:
   ```bash
   vercel env rm GEMINI_API_KEY production
   vercel env add GEMINI_API_KEY production
   ```

3. **Deploy and Test**

4. **Delete Old Key**

#### OpenAI API:

1. Create new key in [OpenAI Platform](https://platform.openai.com/api-keys)
2. Update `OPENAI_API_KEY`
3. Delete old key

#### Anthropic Claude:

1. Create new key in [Anthropic Console](https://console.anthropic.com/)
2. Update `ANTHROPIC_API_KEY`
3. Delete old key

---

## Emergency Rotation

**When to Perform Emergency Rotation**:
- Secret compromised or leaked
- Unauthorized access detected
- Team member with access departs
- Security breach suspected
- Secret found in public repository

### Emergency Procedure:

1. **Immediately Revoke Compromised Secret**:
   - Delete/disable in service dashboard
   - Don't wait for standard rotation window

2. **Generate New Secret**:
   - Follow service-specific procedure
   - Use maximum complexity

3. **Update in All Environments**:
   ```bash
   # Production
   vercel env rm [VARIABLE] production
   vercel env add [VARIABLE] production

   # Preview
   vercel env rm [VARIABLE] preview
   vercel env add [VARIABLE] preview

   # Development
   vercel env rm [VARIABLE] development
   vercel env add [VARIABLE] development
   ```

4. **Force Redeploy**:
   ```bash
   vercel --prod --force
   ```

5. **Audit Access Logs**:
   - Check for unauthorized usage
   - Review recent activity
   - Document findings

6. **Notify Team**:
   - Security incident report
   - Root cause analysis
   - Prevention measures

7. **Update Incident Log**

---

## Post-Rotation Verification

After rotating any secret:

### Immediate Checks (within 1 hour):
- [ ] Application deployment successful
- [ ] No errors in production logs
- [ ] Service integration working (e.g., Stripe, SendGrid)
- [ ] User authentication functioning
- [ ] Database connections stable
- [ ] Webhooks processing correctly

### Extended Monitoring (24 hours):
- [ ] Error rates normal
- [ ] Performance metrics stable
- [ ] No user-reported issues
- [ ] All background jobs running
- [ ] Email delivery working
- [ ] Payment processing successful

### Final Steps:
- [ ] Delete old secret from service
- [ ] Update rotation log
- [ ] Update team documentation
- [ ] Schedule next rotation

---

## Rotation Log Template

Maintain a secure log of all rotations:

```markdown
# Secret Rotation Log

## Rotation: [Service Name] - [Date]

**Performed By**: [Name]
**Date**: YYYY-MM-DD
**Time**: HH:MM UTC
**Environment**: Production / Preview / All

### Details:
- **Secret Type**: [Database / API Key / OAuth / etc.]
- **Old Secret**: [Last 4 characters only]
- **New Secret**: [Last 4 characters only]
- **Reason**: [Scheduled / Emergency / Compromise]

### Downtime:
- **Scheduled**: Yes / No
- **Actual Downtime**: XX minutes
- **Impacted Users**: [Number or "None"]

### Verification:
- [ ] Deployment successful
- [ ] Integration tests passed
- [ ] No errors in logs
- [ ] Service functioning normally

### Notes:
[Any issues encountered, how resolved, lessons learned]

### Next Rotation:
**Scheduled For**: YYYY-MM-DD
```

---

## Automated Rotation (Future Enhancement)

Consider implementing automated rotation for:

- Database credentials (AWS Secrets Manager)
- API keys with programmatic rotation APIs
- OAuth secrets with auto-renewal

**Benefits**:
- Reduces manual effort
- Ensures consistent rotation
- Minimizes human error
- Provides audit trail

---

## Additional Resources

- [OWASP Password Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [AWS Secrets Manager Rotation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
**Review Frequency**: Quarterly

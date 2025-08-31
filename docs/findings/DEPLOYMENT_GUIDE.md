# Production Deployment Guide
# Disaster Recovery Platform

**Version:** 1.0  
**Last Updated:** 28 August 2025  
**Target Environment:** Production (Australia Region)  
**Deployment Status:** Not Production Ready (Critical gaps identified)  

---

## 📊 Deployment Readiness Assessment

**Overall Deployment Readiness:** 35/100 (Not Ready for Production)

```
Deployment Readiness Checklist:
┌─────────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Component               │ Status      │ Score       │ Blocker     │ Timeline    │
├─────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Security Hardening      │ ❌ Critical  │ 20/100      │ Yes         │ 2 weeks     │
│ Infrastructure Setup    │ ⚠️ Partial   │ 40/100      │ Yes         │ 1 week      │
│ Database Configuration  │ ⚠️ Basic     │ 50/100      │ Yes         │ 1 week      │
│ Environment Config      │ ❌ Missing   │ 10/100      │ Yes         │ 3 days      │
│ Monitoring & Logging    │ ❌ Missing   │ 5/100       │ No          │ 1 week      │
│ Backup & Recovery       │ ❌ Missing   │ 0/100       │ No          │ 1 week      │
│ Load Balancing         │ ❌ Missing   │ 0/100       │ No          │ 3 days      │
│ SSL/TLS Configuration   │ ⚠️ Basic     │ 60/100      │ No          │ 2 days      │
│ CI/CD Pipeline          │ ⚠️ Partial   │ 30/100      │ No          │ 1 week      │
│ Testing in Production   │ ❌ Missing   │ 0/100       │ Yes         │ 2 weeks     │
└─────────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

**Production Blockers:** 4 critical issues must be resolved before deployment  
**Estimated Time to Production Ready:** 6-8 weeks  

---

## 🏗️ Infrastructure Architecture

### Target Production Architecture
```
Production Infrastructure (AWS Sydney Region):
┌─────────────────────────────────────────────────────────────────────┐
│                          Route 53 DNS                              │
│                               │                                     │
│                    ┌─────────────────────┐                         │
│                    │   CloudFlare CDN    │                         │
│                    │   (DDoS Protection) │                         │
│                    └─────────────────────┘                         │
│                               │                                     │
│    ┌─────────────────────────────────────────────────────────┐     │
│    │                Application Load Balancer                │     │
│    │              (SSL termination, WAF)                     │     │
│    └─────────────────────────────────────────────────────────┘     │
│                               │                                     │
│    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐     │
│    │   ECS Fargate   │ │   ECS Fargate   │ │   ECS Fargate   │     │
│    │  (Primary AZ)   │ │  (Secondary AZ) │ │  (Tertiary AZ)  │     │
│    │  Next.js App    │ │  Next.js App    │ │  Next.js App    │     │
│    └─────────────────┘ └─────────────────┘ └─────────────────┘     │
│                               │                                     │
│    ┌─────────────────────────────────────────────────────────┐     │
│    │                    RDS PostgreSQL                       │     │
│    │            (Multi-AZ, Encrypted, Backups)               │     │
│    └─────────────────────────────────────────────────────────┘     │
│                                                                     │
│    Additional Services:                                             │
│    • ElastiCache Redis (Session storage, Caching)                  │
│    • S3 Buckets (Static assets, File uploads, Backups)             │
│    • CloudWatch (Monitoring, Logging, Alerts)                      │
│    • Systems Manager (Secrets, Configuration)                      │
│    • AWS Certificate Manager (SSL/TLS certificates)                │
│    • AWS WAF (Web Application Firewall)                            │
└─────────────────────────────────────────────────────────────────────┘
```

### Infrastructure Requirements

#### Compute Resources (ECS Fargate)
```typescript
interface ComputeRequirements {
  taskDefinition: {
    cpu: '2048';        // 2 vCPU
    memory: '4096';     // 4 GB RAM
    networkMode: 'awsvpc';
    requiresAttributes: ['ecs.capability.fargate'];
  };
  autoscaling: {
    min: 2;             // Minimum 2 instances
    max: 10;            // Maximum 10 instances
    targetCPU: 70;      // Scale at 70% CPU
    targetMemory: 80;   // Scale at 80% memory
    scaleUpCooldown: 300;   // 5 minutes
    scaleDownCooldown: 600; // 10 minutes
  };
  healthCheck: {
    path: '/api/health';
    interval: 30;       // seconds
    timeout: 5;         // seconds
    retries: 3;
    matcher: '200';
  };
}
```

#### Database Configuration (RDS PostgreSQL)
```sql
-- Production Database Configuration
-- Instance: db.r5.xlarge (4 vCPU, 32 GB RAM)
-- Storage: 500 GB GP2, encrypted
-- Multi-AZ: Enabled
-- Backup retention: 30 days
-- Maintenance window: Sunday 3:00-4:00 AM AEST

CREATE DATABASE disaster_recovery_prod
  OWNER postgres
  ENCODING 'UTF8'
  LC_COLLATE 'en_AU.UTF-8'
  LC_CTYPE 'en_AU.UTF-8'
  TEMPLATE template0;

-- Required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- Database users with minimal privileges
CREATE USER app_read WITH PASSWORD 'SecureReadOnlyPassword123!';
CREATE USER app_write WITH PASSWORD 'SecureWritePassword456!';

GRANT CONNECT ON DATABASE disaster_recovery_prod TO app_read, app_write;
GRANT USAGE ON SCHEMA public TO app_read, app_write;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_write;
```

---

## 🔐 Security Configuration

### SSL/TLS Setup
```typescript
// Required SSL/TLS configuration
interface SSLConfig {
  certificateProvider: 'AWS Certificate Manager';
  certificateType: 'Wildcard'; // *.disasterrecoveryaustralia.com.au
  protocols: ['TLSv1.2', 'TLSv1.3'];
  cipherSuites: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES128-GCM-SHA256'
  ];
  hstsMaxAge: 31536000; // 1 year
  hstsIncludeSubdomains: true;
  hstsPreload: true;
}
```

### Web Application Firewall (WAF)
```json
{
  "wafRules": [
    {
      "name": "AWSManagedRulesCommonRuleSet",
      "priority": 1,
      "action": "BLOCK"
    },
    {
      "name": "AWSManagedRulesKnownBadInputsRuleSet", 
      "priority": 2,
      "action": "BLOCK"
    },
    {
      "name": "AWSManagedRulesSQLiRuleSet",
      "priority": 3,
      "action": "BLOCK"
    },
    {
      "name": "CustomRateLimitRule",
      "priority": 10,
      "action": "BLOCK",
      "rateLimit": {
        "requests": 2000,
        "period": 300
      }
    }
  ]
}
```

---

## 🌍 Environment Configuration

### Production Environment Variables
```bash
# .env.production (CRITICAL: Must be configured before deployment)

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://disasterrecoveryaustralia.com.au
PORT=3000

# Database  
DATABASE_URL=postgresql://app_write:${DB_PASSWORD}@prod-db.region.rds.amazonaws.com:5432/disaster_recovery_prod
DATABASE_READ_URL=postgresql://app_read:${DB_READ_PASSWORD}@prod-db.region.rds.amazonaws.com:5432/disaster_recovery_prod

# Authentication
NEXTAUTH_URL=https://disasterrecoveryaustralia.com.au
NEXTAUTH_SECRET=${NEXTAUTH_SECRET} # 32+ character random string
JWT_SECRET=${JWT_SECRET} # Different from NEXTAUTH_SECRET

# External Services
STRIPE_SECRET_KEY=${STRIPE_LIVE_SECRET_KEY}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${STRIPE_LIVE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=${CLARITY_ID}
SENTRY_DSN=${SENTRY_DSN}
SENTRY_ENVIRONMENT=production

# Email Services
SMTP_HOST=smtp.ses.ap-southeast-2.amazonaws.com
SMTP_PORT=587
SMTP_USER=${SES_SMTP_USERNAME}
SMTP_PASSWORD=${SES_SMTP_PASSWORD}
FROM_EMAIL=noreply@disasterrecoveryaustralia.com.au

# AWS Services
AWS_REGION=ap-southeast-2
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
S3_BUCKET_NAME=disaster-recovery-assets-prod
CLOUDFRONT_DISTRIBUTION_ID=${CLOUDFRONT_ID}

# Security
RATE_LIMIT_REDIS_URL=redis://${REDIS_ENDPOINT}:6379
ENCRYPTION_KEY=${AES_ENCRYPTION_KEY} # 32 bytes base64 encoded

# Feature Flags
MAINTENANCE_MODE=false
FEATURE_CONTRACTOR_REGISTRATION=true
FEATURE_PAYMENT_PROCESSING=true

# Logging
LOG_LEVEL=warn
PAPERTRAIL_HOST=${PAPERTRAIL_HOST}
PAPERTRAIL_PORT=${PAPERTRAIL_PORT}
```

### Secrets Management (AWS Systems Manager)
```typescript
interface SecretsConfiguration {
  parameters: {
    // Database credentials
    '/disaster-recovery/prod/db/write-password': string;
    '/disaster-recovery/prod/db/read-password': string;
    
    // Authentication secrets
    '/disaster-recovery/prod/auth/nextauth-secret': string;
    '/disaster-recovery/prod/auth/jwt-secret': string;
    
    // Third-party API keys
    '/disaster-recovery/prod/stripe/secret-key': string;
    '/disaster-recovery/prod/stripe/webhook-secret': string;
    '/disaster-recovery/prod/sentry/dsn': string;
    
    // Encryption keys
    '/disaster-recovery/prod/security/encryption-key': string;
    
    // Email credentials
    '/disaster-recovery/prod/ses/smtp-username': string;
    '/disaster-recovery/prod/ses/smtp-password': string;
  };
  encryption: 'KMS';
  keyId: 'arn:aws:kms:ap-southeast-2:account:key/key-id';
  tier: 'Standard';
  type: 'SecureString';
}
```

---

## 🚀 Deployment Process

### Pre-deployment Checklist
```
Critical Pre-deployment Tasks:
☐ Security audit completed and passed
☐ Performance testing completed (load, stress, spike)
☐ Database migration scripts tested in staging
☐ Environment variables configured and tested
☐ SSL certificates provisioned and validated
☐ DNS records updated and propagated
☐ CDN configuration verified
☐ WAF rules tested and activated
☐ Monitoring and alerting configured
☐ Backup procedures tested and verified
☐ Rollback procedure documented and tested
☐ Team deployment training completed
```

### Deployment Pipeline (GitHub Actions)
```yaml
# .github/workflows/production-deploy.yml
name: Production Deployment
on:
  push:
    branches: [main]
    paths-ignore: ['docs/**', '*.md']

env:
  AWS_REGION: ap-southeast-2
  ECR_REPOSITORY: disaster-recovery-prod
  ECS_SERVICE: disaster-recovery-prod-service
  ECS_CLUSTER: disaster-recovery-prod-cluster

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security audit
        run: |
          npm audit --audit-level high
          npm run lint:security
      
      - name: SAST Security Scan
        uses: securecodewarrior/github-action-add-sarif@v1
        with:
          sarif-file: 'security-scan-results.sarif'

  tests:
    runs-on: ubuntu-latest
    needs: security-scan
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL: http://localhost:3000

  build-and-deploy:
    runs-on: ubuntu-latest
    needs: tests
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and tag image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -f Dockerfile.prod -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      - name: Push image to Amazon ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      - name: Database migration (if needed)
        run: |
          aws ecs run-task \
            --cluster $ECS_CLUSTER \
            --task-definition disaster-recovery-migration:latest \
            --launch-type FARGATE \
            --network-configuration "awsvpcConfiguration={subnets=[$PRIVATE_SUBNET_IDS],securityGroups=[$MIGRATION_SG],assignPublicIp=DISABLED}"
      
      - name: Update ECS service
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          aws ecs update-service \
            --cluster $ECS_CLUSTER \
            --service $ECS_SERVICE \
            --task-definition disaster-recovery-prod:latest \
            --force-new-deployment
      
      - name: Wait for deployment to complete
        run: |
          aws ecs wait services-stable \
            --cluster $ECS_CLUSTER \
            --services $ECS_SERVICE
      
      - name: Run smoke tests
        run: |
          npm run test:smoke
        env:
          SMOKE_TEST_URL: https://disasterrecoveryaustralia.com.au

  post-deployment:
    runs-on: ubuntu-latest
    needs: build-and-deploy
    steps:
      - name: Clear CDN cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
      
      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

### Production Docker Configuration
```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build application
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create app user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

---

## 📊 Monitoring & Observability

### CloudWatch Monitoring Setup
```typescript
interface MonitoringConfiguration {
  metrics: {
    application: [
      'HTTP_REQUESTS_TOTAL',
      'HTTP_REQUEST_DURATION',
      'HTTP_ERROR_RATE',
      'ACTIVE_USERS',
      'LEAD_SUBMISSIONS',
      'DATABASE_CONNECTIONS',
      'MEMORY_USAGE',
      'CPU_UTILIZATION'
    ];
    business: [
      'LEADS_CONVERTED',
      'CONTRACTOR_REGISTRATIONS',
      'REVENUE_TRACKING',
      'CUSTOMER_SATISFACTION',
      'RESPONSE_TIME_SLA'
    ];
  };
  alerts: {
    critical: [
      {
        name: 'High Error Rate';
        threshold: '5%';
        evaluation_periods: 2;
        datapoints_to_alarm: 2;
        actions: ['sns_critical', 'pagerduty'];
      },
      {
        name: 'Database Connection Pool Exhausted';
        threshold: '90%';
        evaluation_periods: 1;
        datapoints_to_alarm: 1;
        actions: ['sns_critical', 'auto_scale'];
      }
    ];
    warning: [
      {
        name: 'High Response Time';
        threshold: '1000ms';
        evaluation_periods: 3;
        datapoints_to_alarm: 2;
        actions: ['sns_warning'];
      }
    ];
  };
}
```

### Application Monitoring (Sentry + DataDog)
```typescript
// Comprehensive monitoring setup
import * as Sentry from '@sentry/nextjs';
import { StatsD } from 'node-statsd';

// Sentry configuration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: 'production',
  tracesSampleRate: 0.1, // 10% sampling for performance
  profilesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  beforeSend: (event) => {
    // Filter out non-critical errors
    if (event.level === 'warning') return null;
    return event;
  }
});

// Custom metrics
const statsd = new StatsD({
  host: process.env.STATSD_HOST,
  port: 8125,
  prefix: 'disaster-recovery.'
});

// Business metrics tracking
export const trackBusinessMetrics = {
  leadSubmission: (leadData: any) => {
    statsd.increment('leads.submitted');
    statsd.histogram('leads.value', leadData.estimatedValue);
    
    Sentry.addBreadcrumb({
      category: 'business',
      message: 'Lead submitted',
      data: { leadId: leadData.id, value: leadData.estimatedValue }
    });
  },
  
  contractorRegistration: (contractorData: any) => {
    statsd.increment('contractors.registered');
    
    Sentry.addBreadcrumb({
      category: 'business',
      message: 'Contractor registered',
      data: { contractorId: contractorData.id }
    });
  }
};
```

---

## 🔄 Backup & Disaster Recovery

### Database Backup Strategy
```typescript
interface BackupStrategy {
  automated: {
    rds: {
      backupRetention: 30; // days
      backupWindow: '03:00-04:00'; // AEST
      copyToS3: true;
      encryption: true;
      crossRegion: 'ap-northeast-1'; // Tokyo for DR
    };
    pointInTimeRecovery: {
      enabled: true;
      retentionPeriod: 7; // days
    };
  };
  
  manual: {
    fullBackup: 'weekly'; // Sunday 2:00 AM
    incrementalBackup: 'daily'; // 2:00 AM
    testRestore: 'monthly'; // First Sunday
    offsite: {
      provider: 'AWS S3 Glacier';
      schedule: 'weekly';
      retention: '7 years'; // Compliance requirement
    };
  };
  
  recovery: {
    rto: 4; // hours - Recovery Time Objective
    rpo: 1; // hours - Recovery Point Objective
    testFrequency: 'quarterly';
    documentation: 'required';
  };
}
```

### Application Disaster Recovery Plan
```typescript
interface DisasterRecoveryPlan {
  scenarios: {
    'single-az-failure': {
      impact: 'Minor service disruption';
      recovery: 'Automatic failover to healthy AZ';
      estimated_downtime: '5 minutes';
    };
    'database-failure': {
      impact: 'Complete service outage';
      recovery: 'Failover to Multi-AZ standby';
      estimated_downtime: '15 minutes';
    };
    'region-failure': {
      impact: 'Complete service outage';
      recovery: 'Manual failover to DR region';
      estimated_downtime: '4 hours';
    };
  };
  
  procedures: {
    communication: {
      internal: 'Slack #incidents channel';
      external: 'Status page + email notifications';
      escalation: 'VP Engineering -> CEO';
    };
    
    recovery: {
      database: [
        '1. Assess extent of failure',
        '2. Attempt automatic recovery',
        '3. If failed, initiate manual failover',
        '4. Verify data integrity',
        '5. Resume normal operations'
      ];
      
      application: [
        '1. Check health endpoints',
        '2. Review CloudWatch metrics',
        '3. Scale healthy instances',
        '4. Investigate root cause',
        '5. Deploy fix if needed'
      ];
    };
  };
}
```

---

## 🔍 Health Checks & Monitoring

### Application Health Endpoints
```typescript
// pages/api/health/index.ts - Comprehensive health check
export default async function handler(req: Request, res: Response) {
  const startTime = Date.now();
  
  const healthChecks = {
    timestamp: new Date().toISOString(),
    status: 'healthy', // healthy | degraded | unhealthy
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      external_apis: await checkExternalAPIs(),
      file_system: await checkFileSystem(),
      memory: checkMemory(),
    },
    
    response_time: Date.now() - startTime
  };
  
  // Determine overall status
  const hasUnhealthy = Object.values(healthChecks.checks).some(check => check.status === 'unhealthy');
  const hasDegraded = Object.values(healthChecks.checks).some(check => check.status === 'degraded');
  
  if (hasUnhealthy) {
    healthChecks.status = 'unhealthy';
    res.status(503);
  } else if (hasDegraded) {
    healthChecks.status = 'degraded';
    res.status(200);
  } else {
    res.status(200);
  }
  
  res.json(healthChecks);
}

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', response_time: Date.now() - start };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}
```

### Load Balancer Health Check Configuration
```typescript
interface LoadBalancerHealthCheck {
  path: '/api/health';
  interval: 30; // seconds
  timeout: 5; // seconds
  healthy_threshold: 2; // consecutive successes
  unhealthy_threshold: 3; // consecutive failures
  expected_codes: '200,201';
  matcher: {
    http_code: '200';
    body_contains: '"status":"healthy"';
  };
}
```

---

## 📋 Post-Deployment Verification

### Smoke Test Suite
```typescript
// tests/smoke/production.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Production Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('https://disasterrecoveryaustralia.com.au');
    
    await expect(page).toHaveTitle(/Disaster Recovery/);
    await expect(page.locator('[data-testid="emergency-cta"]')).toBeVisible();
    
    // Check critical elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('[data-testid="service-cards"]')).toBeVisible();
  });

  test('lead capture form works', async ({ page }) => {
    await page.goto('https://disasterrecoveryaustralia.com.au/get-help');
    
    await page.fill('[data-testid="full-name"]', 'Production Test User');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="phone"]', '');
    
    // Don't submit in production, just verify form loads
    await expect(page.locator('[data-testid="submit-lead"]')).toBeVisible();
  });

  test('API health check responds', async ({ request }) => {
    const response = await request.get('https://disasterrecoveryaustralia.com.au/api/health');
    
    expect(response.status()).toBe(200);
    
    const health = await response.json();
    expect(health.status).toBe('healthy');
    expect(health.checks.database.status).toBe('healthy');
  });

  test('SSL certificate is valid', async ({ page }) => {
    const response = await page.goto('https://disasterrecoveryaustralia.com.au');
    
    expect(response?.status()).toBe(200);
    
    // Check security headers
    const headers = response?.headers();
    expect(headers?.['strict-transport-security']).toBeTruthy();
    expect(headers?.['x-frame-options']).toBe('DENY');
  });
});
```

### Production Verification Checklist
```
Post-Deployment Verification (30 minutes after deployment):
☐ Homepage loads successfully (< 3 seconds)
☐ All critical user journeys functional
☐ API health endpoints return 200 OK
☐ Database connectivity confirmed
☐ SSL certificate valid and properly configured
☐ Security headers present and correct
☐ CDN serving static assets correctly
☐ Form submissions working (test with dummy data)
☐ Error tracking receiving events
☐ Monitoring dashboards showing green status
☐ Log aggregation working correctly
☐ Backup systems operational
☐ DNS resolution working from multiple locations
☐ Mobile responsiveness verified
☐ Performance within acceptable thresholds
```

---

## 🔄 Rollback Procedures

### Automated Rollback Triggers
```typescript
interface RollbackConfiguration {
  triggers: {
    error_rate: {
      threshold: '5%';
      duration: '5 minutes';
      action: 'automatic_rollback';
    };
    response_time: {
      threshold: '5000ms';
      percentile: 95;
      duration: '3 minutes';
      action: 'automatic_rollback';
    };
    health_check_failures: {
      threshold: 3;
      duration: '2 minutes';
      action: 'automatic_rollback';
    };
  };
  
  rollback_steps: [
    'Stop new deployments',
    'Revert ECS service to previous task definition',
    'Wait for service to stabilize (5 minutes)',
    'Run smoke tests on reverted version',
    'If smoke tests pass, complete rollback',
    'If smoke tests fail, investigate immediately'
  ];
  
  manual_rollback: {
    command: 'aws ecs update-service --cluster prod --service app --task-definition app:PREVIOUS_VERSION';
    verification: 'npm run test:smoke:production';
    documentation: 'required';
  };
}
```

### Emergency Rollback Procedure
```bash
#!/bin/bash
# emergency-rollback.sh
set -e

echo "🚨 EMERGENCY ROLLBACK INITIATED"
echo "Timestamp: $(date)"

# Get previous stable version
PREVIOUS_VERSION=$(aws ecs describe-services \
  --cluster disaster-recovery-prod-cluster \
  --services disaster-recovery-prod-service \
  --query 'services[0].taskDefinition' --output text | \
  grep -o ':.*' | cut -d':' -f2)

PREVIOUS_VERSION=$((PREVIOUS_VERSION - 1))

echo "Rolling back to version: $PREVIOUS_VERSION"

# Update ECS service
aws ecs update-service \
  --cluster disaster-recovery-prod-cluster \
  --service disaster-recovery-prod-service \
  --task-definition disaster-recovery-prod:$PREVIOUS_VERSION \
  --force-new-deployment

echo "Waiting for rollback to complete..."
aws ecs wait services-stable \
  --cluster disaster-recovery-prod-cluster \
  --services disaster-recovery-prod-service

# Verify rollback success
echo "Running smoke tests..."
npm run test:smoke:production

echo "✅ EMERGENCY ROLLBACK COMPLETED"
echo "Next steps:"
echo "1. Investigate root cause"
echo "2. Fix issues in development"
echo "3. Document incident"
echo "4. Plan re-deployment"
```

---

## 📈 Performance & Scaling

### Auto Scaling Configuration
```typescript
interface AutoScalingPolicy {
  target_tracking: {
    cpu_utilization: {
      target_value: 70;
      scale_out_cooldown: 300; // 5 minutes
      scale_in_cooldown: 600;  // 10 minutes
    };
    memory_utilization: {
      target_value: 80;
      scale_out_cooldown: 300;
      scale_in_cooldown: 600;
    };
    custom_metrics: {
      requests_per_target: {
        target_value: 1000;
        scale_out_cooldown: 180; // 3 minutes
        scale_in_cooldown: 900;  // 15 minutes
      };
    };
  };
  
  step_scaling: {
    scale_out: [
      { metric_value: 80, scaling_adjustment: 2 },
      { metric_value: 90, scaling_adjustment: 4 }
    ];
    scale_in: [
      { metric_value: 40, scaling_adjustment: -1 },
      { metric_value: 20, scaling_adjustment: -2 }
    ];
  };
  
  limits: {
    min_capacity: 2;
    max_capacity: 50;
    desired_capacity: 4;
  };
}
```

### Performance Targets
```
Production Performance Requirements:
┌─────────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Metric                  │ Target      │ Alert       │ Critical    │ Measurement │
├─────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Homepage Load Time      │ < 2s        │ > 3s        │ > 5s        │ 95th %ile   │
│ API Response Time       │ < 500ms     │ > 1s        │ > 2s        │ 95th %ile   │
│ Database Query Time     │ < 100ms     │ > 200ms     │ > 500ms     │ Average     │
│ Uptime                  │ > 99.9%     │ < 99.5%     │ < 99%       │ Monthly     │
│ Error Rate              │ < 0.1%      │ > 0.5%      │ > 1%        │ Hourly      │
│ Concurrent Users        │ 1000+       │ N/A         │ N/A         │ Peak        │
│ Lead Submissions/Min    │ 100+        │ N/A         │ N/A         │ Peak        │
└─────────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## 🚀 Next Steps & Action Items

### Immediate Actions (This Week)
1. ⚡ **Configure AWS infrastructure** - Set up ECS, RDS, networking
2. ⚡ **Set up production environment variables** - All secrets and config
3. ⚡ **Configure SSL certificates** - Wildcard cert via ACM
4. ⚡ **Set up basic monitoring** - CloudWatch, health checks

### Short-term Actions (Next 2 Weeks)
1. 🚀 **Complete security hardening** - WAF, security groups, IAM roles
2. 🚀 **Implement backup procedures** - Database, file, configuration backups
3. 🚀 **Set up CI/CD pipeline** - Automated testing and deployment
4. 🚀 **Configure monitoring and alerting** - Comprehensive observability

### Long-term Actions (Next Month)
1. 🎯 **Complete disaster recovery setup** - Cross-region backup, failover procedures
2. 🎯 **Performance optimization** - CDN, caching, database tuning
3. 🎯 **Security audit and penetration testing** - Third-party security validation
4. 🎯 **Documentation and training** - Team training, runbooks, procedures

---

## 📊 Success Metrics

### Deployment Success KPIs
```
Deployment Success Criteria:
┌─────────────────────────┬─────────────┬─────────────┬─────────────────┐
│ Metric                  │ Target      │ Measurement │ Timeline        │
├─────────────────────────┼─────────────┼─────────────┼─────────────────┤
│ Deployment Success Rate │ > 95%       │ Per deploy  │ Ongoing         │
│ Rollback Frequency      │ < 5%        │ Monthly     │ Ongoing         │
│ Mean Time to Deploy     │ < 15 min    │ Per deploy  │ Target: Week 4  │
│ Mean Time to Recovery   │ < 30 min    │ Per incident│ Target: Week 6  │
│ Zero-downtime Deploys   │ 100%        │ Per deploy  │ Target: Week 8  │
│ Security Score          │ > 90/100    │ Weekly      │ Target: Week 2  │
│ Performance Score       │ > 95/100    │ Daily       │ Target: Week 4  │
│ Uptime                  │ > 99.9%     │ Monthly     │ Target: Month 1 │
└─────────────────────────┴─────────────┴─────────────┴─────────────────┘
```

---

**Document Owner:** DevOps Engineering Team  
**Approved By:** Technical Architecture Team, Security Team  
**Review Schedule:** Weekly during deployment phase, Monthly in production  
**Next Review:** 4 September 2025  

*This deployment guide must be followed exactly for production deployment. Any deviations require approval from the Technical Architecture Team.*
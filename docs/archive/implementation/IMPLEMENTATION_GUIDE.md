# Implementation & Deployment Guide

## From Code to Production: Step-by-Step

This guide explains HOW to actually implement each standard from DEPLOYMENT_STANDARDS.md

---

## Part 1: Docker & Containerization

### 1.1 Create Dockerfile for a Service

```dockerfile
# Dockerfile for Messaging Service
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Build TypeScript
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["/sbin/dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

### 1.2 Build & Push Docker Image

```bash
#!/bin/bash
# build-and-push.sh

SERVICE_NAME="messaging-service"
REGISTRY="your-ecr-registry.dkr.ecr.us-east-1.amazonaws.com"
VERSION="1.0.0"
IMAGE_TAG="${REGISTRY}/${SERVICE_NAME}:${VERSION}"

# Build image
docker build -t ${IMAGE_TAG} .

# Scan for vulnerabilities
trivy image ${IMAGE_TAG}

# Push to registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${REGISTRY}
docker push ${IMAGE_TAG}

# Output for Kubernetes deployment
echo "Image pushed: ${IMAGE_TAG}"
```

---

## Part 2: Kubernetes Deployment Manifests

### 2.1 Deployment Manifest

```yaml
# k8s/messaging-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: messaging-service
  namespace: default
  labels:
    app: messaging-service
    version: v1
spec:
  replicas: 3  # Auto-scaled by HPA
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0  # Zero downtime
  selector:
    matchLabels:
      app: messaging-service
  template:
    metadata:
      labels:
        app: messaging-service
        version: v1
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - messaging-service
              topologyKey: kubernetes.io/hostname
      containers:
      - name: messaging-service
        image: your-registry/messaging-service:1.0.0
        imagePullPolicy: IfNotPresent
        ports:
        - name: http
          containerPort: 3000
          protocol: TCP
        - name: metrics
          containerPort: 9090
          protocol: TCP
        env:
        - name: NODE_ENV
          value: "production"
        - name: LOG_LEVEL
          value: "info"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: messaging-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: messaging-config
              key: redis-url
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: 500m
            memory: 1Gi
        livenessProbe:
          httpGet:
            path: /health/live
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health/ready
            port: http
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          runAsUser: 1001
          capabilities:
            drop:
            - ALL
        volumeMounts:
        - name: tmp
          mountPath: /tmp
      volumes:
      - name: tmp
        emptyDir: {}
      securityContext:
        fsGroup: 1001
```

### 2.2 Service & Ingress

```yaml
# k8s/messaging-service-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: messaging-service
  namespace: default
  labels:
    app: messaging-service
spec:
  type: ClusterIP
  selector:
    app: messaging-service
  ports:
  - name: http
    port: 80
    targetPort: 3000
    protocol: TCP
  - name: metrics
    port: 9090
    targetPort: 9090
    protocol: TCP
---
# k8s/messaging-service-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: messaging-service
  namespace: default
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: messaging-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /messaging
        pathType: Prefix
        backend:
          service:
            name: messaging-service
            port:
              number: 80
```

### 2.3 HPA (Auto-scaling)

```yaml
# k8s/messaging-service-hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: messaging-service-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: messaging-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 2
        periodSeconds: 15
      selectPolicy: Max
```

---

## Part 3: CI/CD Pipeline

### 3.1 GitHub Actions Workflow

```yaml
# .github/workflows/messaging-service.yml
name: Messaging Service CI/CD

on:
  push:
    branches: [ main, develop ]
    paths:
    - 'services/messaging/**'
    - '.github/workflows/messaging-service.yml'
  pull_request:
    branches: [ main ]
    paths:
    - 'services/messaging/**'

env:
  REGISTRY: your-ecr-registry.dkr.ecr.us-east-1.amazonaws.com
  IMAGE_NAME: messaging-service
  AWS_REGION: us-east-1

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: 'services/messaging/package-lock.json'

    - name: Install dependencies
      working-directory: services/messaging
      run: npm ci

    - name: Run ESLint
      working-directory: services/messaging
      run: npm run lint

    - name: Run Prettier
      working-directory: services/messaging
      run: npm run format:check

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
    - uses: actions/checkout@v3

    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      working-directory: services/messaging
      run: npm ci

    - name: Run tests
      working-directory: services/messaging
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
        REDIS_URL: redis://localhost:6379
      run: npm run test:ci

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./services/messaging/coverage/coverage-final.json
        flags: messaging-service
        fail_ci_if_error: true
        required_coverage: 80

  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Run Snyk vulnerability scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high

    - name: Run npm audit
      working-directory: services/messaging
      run: npm audit --audit-level=high

  build:
    needs: [lint, test, security]
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
    - uses: actions/checkout@v3

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: arn:aws:iam::ACCOUNT:role/github-actions
        aws-region: ${{ env.AWS_REGION }}

    - name: Login to ECR
      run: |
        aws ecr get-login-password --region ${{ env.AWS_REGION }} | \
        docker login --username AWS --password-stdin ${{ env.REGISTRY }}

    - name: Build Docker image
      run: |
        docker build \
          -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }} \
          -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest \
          -f services/messaging/Dockerfile \
          services/messaging/

    - name: Scan image with Trivy
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
        format: 'sarif'
        output: 'trivy-results.sarif'

    - name: Upload Trivy results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

    - name: Push image to ECR
      run: |
        docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
        docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
    - uses: actions/checkout@v3

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: arn:aws:iam::ACCOUNT:role/github-actions
        aws-region: ${{ env.AWS_REGION }}

    - name: Update Kubernetes manifest
      run: |
        sed -i "s|IMAGE_TAG|${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}|g" \
          k8s/messaging-service-deployment.yaml

    - name: Deploy to staging
      run: |
        aws eks update-kubeconfig --name staging-cluster --region ${{ env.AWS_REGION }}
        kubectl apply -f k8s/
        kubectl set image deployment/messaging-service \
          messaging-service=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }} \
          -n default
        kubectl rollout status deployment/messaging-service -n default --timeout=5m

    - name: Run smoke tests
      run: |
        npm ci
        npm run test:smoke -- http://staging-api.example.com

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
    - uses: actions/checkout@v3

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: arn:aws:iam::ACCOUNT:role/github-actions
        aws-region: ${{ env.AWS_REGION }}

    - name: Deploy to production (blue-green)
      run: |
        aws eks update-kubeconfig --name prod-cluster --region ${{ env.AWS_REGION }}

        # Deploy to green environment
        kubectl set image deployment/messaging-service-green \
          messaging-service=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }} \
          -n default
        kubectl rollout status deployment/messaging-service-green -n default --timeout=5m

        # Run health checks on green
        kubectl exec -it $(kubectl get pod -l app=messaging-service-green -o jsonpath='{.items[0].metadata.name}') \
          -- curl localhost:3000/health

        # Switch traffic from blue to green
        kubectl patch service messaging-service -p '{"spec":{"selector":{"deployment":"green"}}}'

        # Verify
        sleep 30
        kubectl patch service messaging-service -p '{"spec":{"selector":{"deployment":"blue"}}}'
```

---

## Part 4: Database Setup

### 4.1 Database Migration Script

```typescript
// services/messaging/src/migrations/001-create-messages.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("messages", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("room_id").notNullable();
    table.uuid("user_id").notNullable();
    table.text("content").notNullable();
    table.enum("type", ["text", "image", "video", "file"]).defaultTo("text");
    table.jsonb("metadata");
    table.timestamps(true, true);
    table.index("room_id");
    table.index("user_id");
    table.index("created_at");
    table.foreign("room_id").references("rooms.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("messages");
}
```

### 4.2 Database Backup Script

```bash
#!/bin/bash
# scripts/backup-database.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
DATABASE_URL="${DATABASE_URL}"

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Backup primary database
pg_dump ${DATABASE_URL} | gzip > ${BACKUP_DIR}/prod_${TIMESTAMP}.sql.gz

# Upload to S3
aws s3 cp ${BACKUP_DIR}/prod_${TIMESTAMP}.sql.gz s3://backups/database/

# Keep only last 7 days of backups locally
find ${BACKUP_DIR} -name "prod_*.sql.gz" -mtime +7 -delete

# Verify backup integrity
gzip -t ${BACKUP_DIR}/prod_${TIMESTAMP}.sql.gz && echo "Backup verified OK"

echo "Backup completed: prod_${TIMESTAMP}.sql.gz"
```

---

## Part 5: Monitoring & Observability

### 5.1 Prometheus Metrics Export

```typescript
// services/messaging/src/metrics.ts
import promClient from 'prom-client';

// Create metrics
export const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export const messageProcessed = new promClient.Counter({
  name: 'messages_processed_total',
  help: 'Total number of messages processed',
  labelNames: ['status']
});

export const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active WebSocket connections',
  labelNames: ['region']
});

// Middleware
export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || 'unknown', res.statusCode)
      .observe(duration);
  });

  next();
}

// Metrics endpoint
export async function metricsHandler(req: Request, res: Response) {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
}
```

### 5.2 Grafana Dashboard

```json
{
  "dashboard": {
    "title": "Messaging Service",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_request_duration_seconds_count[5m])"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_request_duration_seconds_count{status_code=~\"5..\"}[5m])"
          }
        ]
      },
      {
        "title": "P95 Latency",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket)"
          }
        ]
      },
      {
        "title": "Active Connections",
        "targets": [
          {
            "expr": "active_connections"
          }
        ]
      }
    ]
  }
}
```

### 5.3 Alert Rules

```yaml
# monitoring/alerts.yml
groups:
- name: messaging-service
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
    for: 5m
    annotations:
      summary: "High error rate detected"
      description: "Error rate > 5% for {{ $labels.service }}"

  - alert: HighLatency
    expr: histogram_quantile(0.95, http_request_duration_seconds_bucket) > 1
    for: 5m
    annotations:
      summary: "High latency detected"
      description: "P95 latency > 1s for {{ $labels.service }}"

  - alert: PodCrashing
    expr: rate(container_last_seen{pod=~"messaging-.*"}[5m]) == 0
    for: 1m
    annotations:
      summary: "Pod is crashing"
```

---

## Part 6: Security Implementation

### 6.1 Secret Management

```bash
#!/bin/bash
# scripts/setup-secrets.sh

# Create secrets in AWS Secrets Manager
aws secretsmanager create-secret \
  --name messaging/prod/database \
  --secret-string '{
    "host":"db.example.com",
    "port":5432,
    "username":"app_user",
    "password":"secure_password",
    "database":"messaging_prod"
  }'

# Create Kubernetes secret from AWS secret
aws secretsmanager get-secret-value --secret-id messaging/prod/database \
  | jq -r '.SecretString' | kubectl create secret generic messaging-secrets --from-file=-

# Rotate secrets (automated)
aws secretsmanager rotate-secret --secret-id messaging/prod/database \
  --rotation-lambda-arn arn:aws:lambda:region:account:function:rotate-secret
```

### 6.2 TLS/SSL Certificates

```yaml
# k8s/cert-manager-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: messaging-service-tls
spec:
  secretName: messaging-service-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - api.example.com
```

---

## Part 7: Payment Processing

### 7.1 Stripe Integration

```typescript
// services/billing/src/stripe-integration.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(data: {
  amount: number;
  currency: string;
  customerId: string;
  description: string;
}): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency,
    customer: data.customerId,
    description: data.description,
    metadata: {
      order_id: data.customerId
    },
    // Enable idempotency
    idempotencyKey: `payment_${data.customerId}_${Date.now()}`
  });
}

export async function createSubscription(data: {
  customerId: string;
  priceId: string;
  paymentMethod: string;
}): Promise<Stripe.Subscription> {
  return stripe.subscriptions.create({
    customer: data.customerId,
    items: [{
      price: data.priceId
    }],
    default_payment_method: data.paymentMethod,
    automatic_tax: {
      enabled: true
    }
  });
}

// Webhook handler
export async function handleWebhook(signature: string, body: string): Promise<void> {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
      break;
  }
}
```

---

## Part 8: Load Testing

### 8.1 Load Test Script (k6)

```javascript
// tests/load/messaging-service.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,  // 100 virtual users
  duration: '5m',  // 5 minute test
  stages: [
    { duration: '1m', target: 100 },   // Ramp up
    { duration: '3m', target: 100 },   // Steady state
    { duration: '1m', target: 0 }      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01']     // Less than 1% failure
  }
};

export default function() {
  // Create message
  let createRes = http.post('http://api.example.com/messages', {
    room_id: 'room-123',
    content: 'Test message',
    type: 'text'
  }, {
    headers: {
      'Authorization': `Bearer ${__ENV.AUTH_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  check(createRes, {
    'create message status is 201': (r) => r.status === 201,
    'create message duration < 500ms': (r) => r.timings.duration < 500
  });

  // Get messages
  let listRes = http.get('http://api.example.com/rooms/room-123/messages');

  check(listRes, {
    'list messages status is 200': (r) => r.status === 200,
    'list messages returned data': (r) => r.body.length > 0
  });

  sleep(1);
}
```

---

## Part 9: Disaster Recovery Testing

### 9.1 Backup Restore Test

```bash
#!/bin/bash
# scripts/test-restore.sh

# Create test database
TEST_DB="messaging_test_restore_$(date +%s)"
createdb ${TEST_DB}

# Restore from latest backup
LATEST_BACKUP=$(ls -t /backups/database/prod_*.sql.gz | head -1)
gunzip < ${LATEST_BACKUP} | psql ${TEST_DB}

# Run validation queries
psql ${TEST_DB} -c "SELECT COUNT(*) FROM messages;"
psql ${TEST_DB} -c "SELECT COUNT(*) FROM users;"
psql ${TEST_DB} -c "SELECT COUNT(*) FROM rooms;"

# Check data integrity
psql ${TEST_DB} -c "\
  SELECT COUNT(*) as orphaned_messages \
  FROM messages m \
  LEFT JOIN rooms r ON m.room_id = r.id \
  WHERE r.id IS NULL;"

# Cleanup
dropdb ${TEST_DB}

echo "Restore test completed successfully"
```

### 9.2 Failover Test

```bash
#!/bin/bash
# scripts/test-failover.sh

# Simulate primary region failure
aws autoscaling set-desired-capacity \
  --auto-scaling-group-name messaging-prod-us-east-1 \
  --desired-capacity 0

# Verify failover to secondary region
sleep 30

for i in {1..30}; do
  HEALTH=$(curl -s http://api-eu-west-1.example.com/health)
  if [ "$(echo $HEALTH | jq -r '.status')" == "healthy" ]; then
    echo "Failover successful in $((i*10)) seconds"
    break
  fi
  sleep 10
done

# Restore primary
aws autoscaling set-desired-capacity \
  --auto-scaling-group-name messaging-prod-us-east-1 \
  --desired-capacity 3

echo "Failover test completed"
```

---

## Success Criteria Checklist

For production deployment, verify ALL of the following:

```markdown
# Deployment Verification Checklist

## ✅ Code & Testing
- [ ] All code reviewed and approved (2+ reviewers)
- [ ] Unit tests passing (100%)
- [ ] Integration tests passing (100%)
- [ ] E2E tests passing (100%)
- [ ] Code coverage > 80%
- [ ] No critical security issues
- [ ] Load test: passed 10x target load
- [ ] Performance tests: met targets

## ✅ Infrastructure
- [ ] Docker image built and scanned
- [ ] Kubernetes manifests reviewed
- [ ] Staging deployment successful
- [ ] Health checks passing
- [ ] Monitoring metrics flowing

## ✅ Database
- [ ] Migrations applied to staging
- [ ] Data backup verified
- [ ] Restore tested successfully
- [ ] Replication lag < 5 seconds
- [ ] Indexes optimized

## ✅ Monitoring
- [ ] Prometheus metrics exported
- [ ] Grafana dashboards configured
- [ ] Alerts configured and tested
- [ ] Log aggregation working
- [ ] Distributed tracing working

## ✅ Security
- [ ] Secrets stored in vault
- [ ] TLS certificates valid
- [ ] Vulnerability scan passed
- [ ] SAST scan passed
- [ ] Dependency audit passed
- [ ] Network policies configured

## ✅ Documentation
- [ ] Deployment guide complete
- [ ] Runbooks created
- [ ] API documentation updated
- [ ] Architecture diagram updated
- [ ] Troubleshooting guide complete

## ✅ Approval
- [ ] Technical lead approval: _______________
- [ ] Operations approval: _______________
- [ ] Security approval: _______________
- [ ] Product approval: _______________
- [ ] Deployment date/time: _______________

## Only after ALL boxes are checked, proceed with production deployment.
```

---

## Next Steps

1. **For each service/phase**, run through this entire guide
2. **Create the infrastructure** (Kubernetes, databases, etc.)
3. **Setup CI/CD pipeline** - automate everything
4. **Deploy to staging** - test the complete flow
5. **Run load tests** - verify performance
6. **Test disaster recovery** - backup/restore and failover
7. **Get approvals** - from tech, ops, security, product
8. **Deploy to production** - with monitoring active
9. **Verify with real users** - canary/staged rollout
10. **Document lessons learned** - improve process

Only then can you claim: ✅ **Production Ready**

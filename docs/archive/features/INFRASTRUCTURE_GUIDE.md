# Infrastructure Guide - Phase 23

## Overview

This guide provides comprehensive instructions for implementing Phase 23: Infrastructure as Code for the Disaster Recovery NRPG Platform.

**Phase 23 Status**: ⏳ PENDING - Ready for implementation
**Current Progress**: 15% (Architecture complete, Infrastructure pending)
**Target Completion**: 100% (Full production deployment)

## Table of Contents

1. [Phase 23 Objectives](#phase-23-objectives)
2. [Infrastructure Architecture](#infrastructure-architecture)
3. [Cloud Provider Selection](#cloud-provider-selection)
4. [Terraform Implementation](#terraform-implementation)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring & Observability](#monitoring--observability)
8. [Security Implementation](#security-implementation)
9. [Database & Storage](#database--storage)
10. [Testing & Validation](#testing--validation)
11. [Deployment Checklist](#deployment-checklist)
12. [Troubleshooting](#troubleshooting)

## Phase 23 Objectives

### Primary Goals
- Transform 68,728 lines of TypeScript architecture into deployed infrastructure
- Implement Infrastructure as Code (IaC) using Terraform
- Deploy 50+ microservices to Kubernetes
- Establish comprehensive monitoring and observability
- Implement zero-trust security architecture
- Achieve 99.9% uptime target

### Success Metrics
- ✅ **Infrastructure**: 100% automated deployment
- ✅ **Performance**: <1 second response times
- ✅ **Scalability**: Handle 10k+ concurrent users
- ✅ **Security**: Zero critical vulnerabilities
- ✅ **Monitoring**: Real-time metrics and alerting
- ✅ **Cost**: Within $3,800-6,400/month budget

## Infrastructure Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                        │
│                    (ALB/Ingress Controller)                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Kubernetes Cluster                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Frontend  │  │   Backend   │  │     Services        │  │
│  │  (Next.js)  │  │ (Node.js)   │  │  (50+ Microservices)│  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Database  │  │    Cache    │  │     Monitoring      │  │
│  │ (PostgreSQL)│  │   (Redis)   │  │ (Prometheus/Grafana)│  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      Storage Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   File      │  │   Logs      │  │     Backups         │  │
│  │   Storage   │  │   (ELK)     │  │   (Automated)       │  │
│  │   (S3)      │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Compute Layer
- **Kubernetes Cluster**: EKS/GKE/AKS with auto-scaling
- **Node Groups**: Separate pools for different workloads
- **Pod Resources**: CPU/memory limits and requests
- **HPA**: Horizontal Pod Autoscaling for demand spikes

#### 2. Networking Layer
- **VPC**: Isolated network with subnets
- **Security Groups**: Fine-grained access control
- **Load Balancer**: Application Load Balancer with SSL termination
- **Ingress**: Kubernetes ingress controllers

#### 3. Data Layer
- **PostgreSQL**: RDS with multi-AZ deployment
- **Redis**: ElastiCache for caching and sessions
- **S3**: Object storage for files and backups
- **Backup**: Automated daily backups with point-in-time recovery

#### 4. Observability Layer
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **AlertManager**: Alert routing and notifications
- **Jaeger**: Distributed tracing
- **ELK Stack**: Log aggregation and analysis

## Cloud Provider Selection

### AWS (Recommended)
**Why AWS:**
- Most mature Kubernetes offering (EKS)
- Comprehensive service ecosystem
- Strong enterprise adoption
- Excellent documentation and community

**Services Used:**
- **EKS**: Kubernetes cluster management
- **RDS**: Managed PostgreSQL
- **ElastiCache**: Redis caching
- **S3**: Object storage
- **ALB**: Load balancing
- **CloudWatch**: Monitoring and logging
- **IAM**: Identity and access management

**Estimated Costs:**
- EKS: $13.20/month (cluster management)
- EC2 nodes: $1,500-2,500/month
- RDS: $300-600/month
- ElastiCache: $100-200/month
- S3: $50-100/month
- **Total**: $2,000-3,500/month

### Alternative: Google Cloud Platform
**Why GCP:**
- Excellent Kubernetes support (GKE)
- Strong AI/ML integration
- Competitive pricing
- Good performance

**Services Used:**
- **GKE**: Kubernetes cluster management
- **Cloud SQL**: Managed PostgreSQL
- **Memorystore**: Redis caching
- **Cloud Storage**: Object storage
- **Cloud Load Balancing**: Load balancing
- **Cloud Monitoring**: Observability

### Alternative: Microsoft Azure
**Why Azure:**
- Strong enterprise integration
- Good hybrid cloud capabilities
- Competitive pricing
- Integration with Microsoft services

**Services Used:**
- **AKS**: Kubernetes cluster management
- **Azure Database for PostgreSQL**: Managed database
- **Azure Cache for Redis**: Caching service
- **Azure Blob Storage**: Object storage
- **Azure Load Balancer**: Load balancing
- **Azure Monitor**: Observability

## Terraform Implementation

### Project Structure

```
terraform/
├── main.tf              # Main configuration
├── variables.tf         # Input variables
├── outputs.tf          # Output values
├── providers.tf        # Provider configurations
├── modules/            # Reusable modules
│   ├── vpc/           # VPC and networking
│   ├── eks/           # Kubernetes cluster
│   ├── rds/           # Database setup
│   ├── redis/         # Cache setup
│   ├── iam/           # Identity and access
│   └── monitoring/    # Observability stack
├── environments/       # Environment-specific configs
│   ├── dev/           # Development environment
│   ├── staging/       # Staging environment
│   └── prod/          # Production environment
└── scripts/           # Helper scripts
```

### Core Terraform Files

#### providers.tf
```hcl
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "disaster-recovery-nrpg/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Disaster Recovery NRPG"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
  
  token = data.aws_eks_cluster_auth.cluster.token
}
```

#### variables.tf
```hcl
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "disaster-recovery-nrpg"
}

variable "node_instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "t3.medium"
}

variable "node_count" {
  description = "Number of worker nodes"
  type        = number
  default     = 3
}

variable "database_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.medium"
}

variable "database_allocated_storage" {
  description = "RDS allocated storage in GB"
  type        = number
  default     = 100
}
```

### Environment-Specific Configurations

#### environments/dev/main.tf
```hcl
module "vpc" {
  source = "../../modules/vpc"
  
  environment = var.environment
  cidr_block  = "10.0.0.0/16"
  
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
}

module "eks" {
  source = "../../modules/eks"
  
  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  node_groups = {
    main = {
      desired_capacity = 2
      max_capacity     = 4
      min_capacity     = 1
      
      instance_type = "t3.medium"
      ami_type      = "AL2_x86_64"
      
      labels = {
        Environment = var.environment
        Team        = "platform"
      }
    }
  }
}

module "rds" {
  source = "../../modules/rds"
  
  identifier = "${var.cluster_name}-db"
  
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = var.database_instance_class
  allocated_storage = var.database_allocated_storage
  
  username = "postgres"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  subnet_ids              = module.vpc.private_subnets
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
}

module "redis" {
  source = "../../modules/redis"
  
  identifier = "${var.cluster_name}-cache"
  
  engine_version = "7.0"
  node_type      = "cache.t3.micro"
  port           = 6379
  
  num_cache_clusters = 1
  
  subnet_group_name          = module.vpc.subnet_group_name
  security_group_ids         = [module.vpc.default_security_group_id]
  preferred_availability_zones = ["${var.aws_region}a", "${var.aws_region}b"]
}
```

## Kubernetes Deployment

### Cluster Setup

#### EKS Cluster Configuration
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: disaster-recovery-nrpg
  region: us-east-1
  version: "1.28"

vpc:
  cidr: 10.0.0.0/16
  nat:
    gateway: Single

nodeGroups:
  frontend:
    desiredCapacity: 2
    minSize: 1
    maxSize: 4
    instanceType: t3.medium
    labels:
      app: frontend
      tier: web
    taints:
      dedicated: frontend:NoSchedule

  backend:
    desiredCapacity: 3
    minSize: 2
    maxSize: 6
    instanceType: t3.large
    labels:
      app: backend
      tier: api
    taints:
      dedicated: backend:NoSchedule

  services:
    desiredCapacity: 2
    minSize: 1
    maxSize: 4
    instanceType: t3.medium
    labels:
      app: services
      tier: microservices
```

### Application Deployment Manifests

#### Frontend Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: disaster-recovery
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        version: v1
    spec:
      containers:
      - name: frontend
        image: your-registry/frontend:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: API_URL
          value: "http://backend-service:8080"
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: disaster-recovery
spec:
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

#### Backend Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: disaster-recovery
spec:
  replicas: 5
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        version: v1
    spec:
      containers:
      - name: backend
        image: your-registry/backend:v1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: connection-string
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-secret
              key: connection-string
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: disaster-recovery
spec:
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 8080
    targetPort: 8080
  type: ClusterIP
```

### Ingress Configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: disaster-recovery-ingress
  namespace: disaster-recovery
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:us-east-1:account:certificate/...
    alb.ingress.kubernetes.io/ssl-redirect: "443"
    alb.ingress.kubernetes.io/healthcheck-path: /health
    alb.ingress.kubernetes.io/healthcheck-interval-seconds: "30"
    alb.ingress.kubernetes.io/healthcheck-timeout-seconds: "5"
    alb.ingress.kubernetes.io/success-codes: "200-399"
spec:
  rules:
  - host: app.disaster-recovery-nrpg.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
```

## CI/CD Pipeline

### GitHub Actions Workflow

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Kubernetes

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: your-registry
  IMAGE_NAME: disaster-recovery-nrpg
  KUBE_NAMESPACE: disaster-recovery

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
    
    - name: Generate deployment manifests
      run: |
        sed -i "s|IMAGE_TAG|${{ steps.meta.outputs.version }}|g" k8s/deployment.yaml
        sed -i "s|IMAGE_TAG|${{ steps.meta.outputs.version }}|g" k8s/frontend-deployment.yaml
    
    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v4
      with:
        namespace: ${{ env.KUBE_NAMESPACE }}
        manifests: |
          k8s/namespace.yaml
          k8s/secrets.yaml
          k8s/frontend-deployment.yaml
          k8s/backend-deployment.yaml
          k8s/services.yaml
          k8s/ingress.yaml
        images: |
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.meta.outputs.version }}
        pull-images: true

  terraform-plan:
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.event_name == 'pull_request'
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.6.0
    
    - name: Terraform Format
      run: terraform fmt -check
    
    - name: Terraform Init
      run: terraform init
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Terraform Plan
      run: terraform plan -no-color
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

  terraform-apply:
    runs-on: ubuntu-latest
    needs: [build-and-push, terraform-plan]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.6.0
    
    - name: Terraform Init
      run: terraform init
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Terraform Apply
      run: terraform apply -auto-approve
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Dockerfile Optimization

#### Multi-stage Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["dumb-init", "node", "dist/server.js"]
```

## Monitoring & Observability

### Prometheus Setup

#### prometheus-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
      - name: prometheus
        image: prom/prometheus:v2.47.0
        args:
          - '--config.file=/etc/prometheus/prometheus.yml'
          - '--storage.tsdb.path=/prometheus/'
          - '--web.console.libraries=/etc/prometheus/console_libraries'
          - '--web.console.templates=/etc/prometheus/consoles'
          - '--storage.tsdb.retention.time=200h'
          - '--web.enable-lifecycle'
        ports:
        - containerPort: 9090
        resources:
          requests:
            memory: "400Mi"
            cpu: "200m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        volumeMounts:
        - name: prometheus-config-volume
          mountPath: /etc/prometheus/
        - name: prometheus-storage-volume
          mountPath: /prometheus/
      volumes:
      - name: prometheus-config-volume
        configMap:
          defaultMode: 420
          name: prometheus-config
      - name: prometheus-storage-volume
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: monitoring
spec:
  selector:
    app: prometheus
  ports:
  - protocol: TCP
    port: 9090
    targetPort: 9090
  type: ClusterIP
```

### Grafana Setup

#### grafana-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:10.1.0
        ports:
        - containerPort: 3000
        env:
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: admin-password
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
        volumeMounts:
        - name: grafana-storage
          mountPath: /var/lib/grafana
      volumes:
      - name: grafana-storage
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: monitoring
spec:
  selector:
    app: grafana
  ports:
  - protocol: TCP
    port: 3000
    targetPort: 3000
  type: ClusterIP
```

### Application Metrics

#### metrics.js (Node.js)
```javascript
const promClient = require('prom-client');

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeUsers = new promClient.Gauge({
  name: 'active_users_total',
  help: 'Number of active users'
});

// Register metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeUsers);

// Middleware to track metrics
function metricsMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
}

module.exports = {
  register,
  metricsMiddleware,
  activeUsers
};
```

## Security Implementation

### Zero-Trust Architecture

#### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-network-policy
  namespace: disaster-recovery
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: backend
    ports:
    - protocol: TCP
      port: 8080
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-network-policy
  namespace: disaster-recovery
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

### Secrets Management

#### AWS Secrets Manager Integration
```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
  namespace: disaster-recovery
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-secret
  namespace: disaster-recovery
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: database-secret
    creationPolicy: Owner
  data:
  - secretKey: connection-string
    remoteRef:
      key: disaster-recovery/database
      property: connection-string
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: redis-secret
  namespace: disaster-recovery
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: redis-secret
    creationPolicy: Owner
  data:
  - secretKey: connection-string
    remoteRef:
      key: disaster-recovery/redis
      property: connection-string
```

### RBAC Configuration

#### rbac.yaml
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: disaster-recovery
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: disaster-recovery
  name: app-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-role-binding
  namespace: disaster-recovery
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: disaster-recovery
roleRef:
  kind: Role
  name: app-role
  apiGroup: rbac.authorization.k8s.io
```

## Database & Storage

### PostgreSQL RDS Configuration

#### RDS Module (Terraform)
```hcl
module "rds" {
  source = "./modules/rds"
  
  identifier = "${var.cluster_name}-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.database_instance_class
  
  allocated_storage     = var.database_allocated_storage
  max_allocated_storage = 1000
  storage_type          = "gp2"
  storage_encrypted     = true
  
  username = "postgres"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  subnet_ids              = module.vpc.private_subnets
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  multi_az = var.environment == "prod"
  
  skip_final_snapshot = var.environment != "prod"
  
  tags = {
    Environment = var.environment
    Project     = "Disaster Recovery NRPG"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}
```

### Redis ElastiCache Configuration

#### Redis Module (Terraform)
```hcl
module "redis" {
  source = "./modules/redis"
  
  identifier = "${var.cluster_name}-cache"
  
  engine_version = "7.0"
  node_type      = "cache.t3.micro"
  port           = 6379
  
  num_cache_clusters = var.environment == "prod" ? 2 : 1
  
  subnet_group_name          = module.vpc.subnet_group_name
  security_group_ids         = [module.vpc.default_security_group_id]
  preferred_availability_zones = var.environment == "prod" ? 
    ["${var.aws_region}a", "${var.aws_region}b"] : 
    ["${var.aws_region}a"]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  
  parameter_group_name = "default.redis7"
  
  tags = {
    Environment = var.environment
    Project     = "Disaster Recovery NRPG"
  }
}
```

### Storage Configuration

#### S3 Bucket for File Storage
```hcl
resource "aws_s3_bucket" "file_storage" {
  bucket = "${var.cluster_name}-files-${var.environment}"
  
  tags = {
    Environment = var.environment
    Project     = "Disaster Recovery NRPG"
  }
}

resource "aws_s3_bucket_versioning" "file_storage_versioning" {
  bucket = aws_s3_bucket.file_storage.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption_configuration" "file_storage_encryption" {
  bucket = aws_s3_bucket.file_storage.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "file_storage_lifecycle" {
  bucket = aws_s3_bucket.file_storage.id
  
  rule {
    id     = "expire-old-versions"
    status = "Enabled"
    
    noncurrent_version_expiration {
      days = 30
    }
  }
}
```

## Testing & Validation

### Load Testing

#### Artillery Configuration
```yaml
config:
  target: 'https://app.disaster-recovery-nrpg.com'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 100
      name: "Sustained load"
    - duration: 60
      arrivalRate: 200
      name: "Peak load"
  
  defaults:
    headers:
      'Content-Type': 'application/json'

scenarios:
  - name: "User Journey"
    weight: 70
    flow:
      - get:
          url: "/"
      - get:
          url: "/api/health"
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "testpassword"
      - get:
          url: "/api/dashboard"
          headers:
            Authorization: "Bearer {{ token }}"
  
  - name: "API Endpoints"
    weight: 30
    flow:
      - get:
          url: "/api/bookings"
      - post:
          url: "/api/bookings"
          json:
            serviceType: "Water Damage"
            emergencyLevel: "URGENT"
            description: "Test booking"
```

### Security Testing

#### OWASP ZAP Configuration
```yaml
version: 2.0
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.10.0
        with:
          target: 'https://app.disaster-recovery-nrpg.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
      
      - name: Run ZAP Full Scan
        uses: zaproxy/action-full-scan@v0.8.0
        with:
          target: 'https://app.disaster-recovery-nrpg.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
```

## Deployment Checklist

### Pre-Deployment
- [ ] Terraform configuration reviewed and approved
- [ ] Kubernetes manifests validated
- [ ] Docker images built and pushed
- [ ] Secrets configured in AWS Secrets Manager
- [ ] Monitoring stack deployed
- [ ] Load testing completed
- [ ] Security scanning passed
- [ ] Documentation updated

### Deployment
- [ ] Apply Terraform infrastructure
- [ ] Deploy Kubernetes manifests
- [ ] Verify application health
- [ ] Test monitoring and alerting
- [ ] Validate security controls
- [ ] Run smoke tests

### Post-Deployment
- [ ] Monitor application performance
- [ ] Verify backup processes
- [ ] Test disaster recovery procedures
- [ ] Update runbooks
- [ ] Train operations team
- [ ] Document lessons learned

## Troubleshooting

### Common Issues

#### Pod Not Starting
```bash
# Check pod status
kubectl get pods -n disaster-recovery

# Check pod events
kubectl describe pod <pod-name> -n disaster-recovery

# Check pod logs
kubectl logs <pod-name> -n disaster-recovery

# Check resource limits
kubectl top pod <pod-name> -n disaster-recovery
```

#### Database Connection Issues
```bash
# Test database connectivity
kubectl exec -it <pod-name> -n disaster-recovery -- \
  nc -zv <database-endpoint> 5432

# Check database logs
kubectl logs <database-pod> -n disaster-recovery
```

#### Ingress Not Working
```bash
# Check ingress status
kubectl get ingress -n disaster-recovery

# Check ALB target groups
aws elbv2 describe-target-groups --query 'TargetGroups[?TargetType==`ip`].TargetGroupArn'

# Check security groups
aws ec2 describe-security-groups --group-ids <sg-id>
```

### Performance Issues

#### High CPU Usage
```bash
# Check resource usage
kubectl top nodes
kubectl top pods --all-namespaces

# Check HPA status
kubectl get hpa -n disaster-recovery

# Check pod resource limits
kubectl describe pod <pod-name> -n disaster-recovery
```

#### High Memory Usage
```bash
# Check memory usage
kubectl top pods --sort-by=memory

# Check for memory leaks
kubectl logs <pod-name> -n disaster-recovery | grep -i "out of memory"
```

### Monitoring Issues

#### Prometheus Not Scraping
```bash
# Check Prometheus targets
curl http://prometheus:9090/api/v1/targets

# Check service discovery
kubectl get endpoints -n disaster-recovery
```

#### Grafana Dashboards Empty
```bash
# Check data source
kubectl get secret grafana-datasource -n monitoring -o yaml

# Check Prometheus queries
curl "http://prometheus:9090/api/v1/query?query=up"
```

## Next Steps

After completing this Infrastructure Guide:

1. **Review and Customize**: Adapt configurations for your specific requirements
2. **Test in Development**: Deploy to development environment first
3. **Validate Security**: Run comprehensive security scans
4. **Performance Testing**: Conduct load testing with realistic scenarios
5. **Documentation**: Update runbooks and operational procedures
6. **Team Training**: Ensure operations team is trained on new infrastructure
7. **Go-Live Planning**: Plan production deployment with rollback procedures

## Support

For questions or issues related to this Infrastructure Guide:

- **Architecture Questions**: Refer to [claude.md](../claude.md)
- **Implementation Help**: Use `npm run claude infrastructure`
- **Troubleshooting**: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Security Concerns**: Use `npm run claude security`

---

**Document Version**: 1.0
**Last Updated**: 2025-12-23
**Next Review**: 2026-01-23

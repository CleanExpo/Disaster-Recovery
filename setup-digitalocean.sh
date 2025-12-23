#!/bin/bash
set -e

echo "🌊 DigitalOcean Infrastructure Setup"
echo "====================================="
echo ""
echo "This will create:"
echo "  - Kubernetes cluster (3 nodes @ \$40/month each = \$120/month)"
echo "  - PostgreSQL database (~\$15/month)"
echo "  - Redis cache (~\$15/month)"
echo "  - Total: ~\$150/month"
echo ""
read -p "Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Setup cancelled."
  exit 0
fi

echo ""
echo "You need a DigitalOcean API token."
echo "Get one at: https://cloud.digitalocean.com/account/api/tokens"
echo ""
read -p "Paste your DigitalOcean API token: " DO_TOKEN

if [ -z "$DO_TOKEN" ]; then
  echo "Error: No token provided"
  exit 1
fi

export DIGITALOCEAN_ACCESS_TOKEN=$DO_TOKEN

# Create infrastructure directory
mkdir -p infrastructure/digitalocean

# Authenticate doctl
echo ""
echo "📝 Authenticating with DigitalOcean..."
doctl auth init --access-token "$DO_TOKEN"

# Create Kubernetes cluster
echo ""
echo "☸️  Creating Kubernetes cluster (this takes ~5-7 minutes)..."
doctl kubernetes cluster create disaster-recovery-nrpg \
  --region nyc3 \
  --node-pool "name=worker-pool;count=3;size=s-2vcpu-4gb" \
  --wait || echo "⚠️  Cluster may already exist"

# Get kubeconfig
echo ""
echo "📥 Configuring kubectl..."
doctl kubernetes cluster kubeconfig save disaster-recovery-nrpg

# Create PostgreSQL database
echo ""
echo "🗄️  Creating PostgreSQL database (this takes ~2-3 minutes)..."
doctl databases create disaster-recovery-postgres \
  --engine pg \
  --region nyc3 \
  --num-nodes 1 \
  --size db-s-1vcpu-1gb \
  --version 15 || echo "⚠️  Database may already exist"

# Create Redis
echo ""
echo "⚡ Creating Redis cache (this takes ~2-3 minutes)..."
doctl databases create disaster-recovery-redis \
  --engine redis \
  --region nyc3 \
  --num-nodes 1 \
  --size db-s-1vcpu-1gb \
  --version 7 || echo "⚠️  Redis may already exist"

# Wait for databases to be ready
echo ""
echo "⏳ Waiting for databases to be ready..."
sleep 30

# Get connection details
echo ""
echo "✅ Infrastructure Created!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 DigitalOcean Resources:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
doctl kubernetes cluster list
echo ""
doctl databases list
echo ""

# Get database connection string
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 Database Connection Strings:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "PostgreSQL:"
doctl databases connection disaster-recovery-postgres --format URI || true
echo ""
echo "Redis:"
doctl databases connection disaster-recovery-redis --format URI || true
echo ""

# Deploy to Kubernetes
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "☸️  Deploying to Kubernetes..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create namespace
kubectl create namespace disaster-recovery --dry-run=client -o yaml | kubectl apply -f - || true

# Get actual database URLs
PG_URI=$(doctl databases connection disaster-recovery-postgres --format URI 2>/dev/null || echo "postgresql://user:pass@host:5432/db")
REDIS_URI=$(doctl databases connection disaster-recovery-redis --format URI 2>/dev/null || echo "redis://host:6379")

# Create secret with actual database URLs
kubectl create secret generic app-secrets \
  --from-literal=DATABASE_URL="$PG_URI" \
  --from-literal=REDIS_URL="$REDIS_URI" \
  --from-literal=NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  -n disaster-recovery \
  --dry-run=client -o yaml | kubectl apply -f - || true

# Apply Kubernetes manifests
kubectl apply -f k8s/deployment.yaml || echo "⚠️  Update k8s/deployment.yaml with your Docker image"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo "  1. Build and push your Docker image:"
echo "     docker build -t registry.digitalocean.com/disaster-recovery-nrpg/disaster-recovery-api:latest ."
echo "     docker push registry.digitalocean.com/disaster-recovery-nrpg/disaster-recovery-api:latest"
echo ""
echo "  2. Update Vercel environment variables with database URLs"
echo ""
echo "  3. Check deployment status:"
echo "     kubectl get pods -n disaster-recovery"
echo "     kubectl get service -n disaster-recovery"
echo ""
echo "  4. View logs:"
echo "     kubectl logs -f deployment/disaster-recovery-app -n disaster-recovery"
echo ""
echo "💰 Monthly Cost: ~\$150/month"
echo "🌐 Kubernetes Dashboard: https://cloud.digitalocean.com/kubernetes/clusters"
echo "🗄️  Database Dashboard: https://cloud.digitalocean.com/databases"
echo ""

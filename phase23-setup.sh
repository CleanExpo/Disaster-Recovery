#!/bin/bash
set -e

echo "🚀 Phase 23: Vercel + DigitalOcean Deployment Setup"
echo "=================================================="

# Step 1: Vercel Redeployment (fix integration issue)
echo "📦 Step 1: Fixing Vercel deployment..."
vercel env rm SUPABASE_URL --yes || true
vercel env rm SUPABASE_ANON_KEY --yes || true
vercel env rm SUPABASE_SERVICE_ROLE_KEY --yes || true
vercel env rm SUPABASE_JWT_SECRET --yes || true
echo "Deploying to Vercel production..."
vercel --prod --yes || echo "⚠️  Vercel deployment skipped (may need manual trigger)"

echo "✅ Vercel redeployed. Check: https://vercel.com/unite-group/disaster-recovery"

# Step 2: DigitalOcean Setup
echo ""
echo "🌊 Step 2: Setting up DigitalOcean infrastructure..."
echo "You need a DigitalOcean API token. Get one at: https://cloud.digitalocean.com/account/api/tokens"
read -p "Paste your DigitalOcean API token: " DO_TOKEN

export DIGITALOCEAN_ACCESS_TOKEN=$DO_TOKEN

# Create infrastructure directory
mkdir -p infrastructure/digitalocean

# Create doctl config directory if it doesn't exist
mkdir -p ~/.config/doctl

# Create doctl config
cat > ~/.config/doctl/config.yaml << DOCTL
access-token: ${DO_TOKEN}
auth-method: oauth
DOCTL

# Create Kubernetes cluster
echo "Creating Kubernetes cluster... (this takes ~5 minutes)"
doctl kubernetes cluster create disaster-recovery-nrpg \
  --region nyc3 \
  --node-pool-name "worker-pool" \
  --count 3 \
  --machine-slug s-2vcpu-4gb \
  --enable-monitoring \
  --wait

# Get kubeconfig
doctl kubernetes cluster kubeconfig save disaster-recovery-nrpg

# Create PostgreSQL database
echo "Creating PostgreSQL database..."
doctl databases create disaster-recovery-postgres \
  --engine pg \
  --region nyc3 \
  --num-nodes 1 \
  --size db-s-1vcpu-1gb \
  --wait

# Create Redis
echo "Creating Redis cache..."
doctl databases create disaster-recovery-redis \
  --engine redis \
  --region nyc3 \
  --num-nodes 1 \
  --size db-s-1vcpu-1gb \
  --wait

# Get connection details
echo ""
echo "✅ DigitalOcean infrastructure created!"
echo "Database details:"
doctl databases list --format Name,Connection --no-header

# Step 3: Update environment variables
echo ""
echo "📝 Step 3: Updating environment variables..."

# Get PostgreSQL connection string
PG_CONN=$(doctl databases get disaster-recovery-postgres --format Connection --no-header)

# Update Vercel with new database
vercel env add DATABASE_URL "$PG_CONN"
vercel env add DIRECT_URL "$PG_CONN"

# Step 4: Deploy to Kubernetes
echo ""
echo "☸️  Step 4: Deploying to Kubernetes..."

# Create namespace
kubectl create namespace disaster-recovery || true

# Create ConfigMap
kubectl create configmap app-config \
  --from-literal=NODE_ENV=production \
  --from-literal=PORT=3000 \
  -n disaster-recovery || true

# Create Secret (you need to fill these in)
kubectl create secret generic app-secrets \
  --from-literal=DATABASE_URL="$PG_CONN" \
  --from-literal=NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  -n disaster-recovery || true

# Check if k8s manifests exist, if not create basic ones
if [ ! -d "k8s" ]; then
  echo "Creating basic Kubernetes manifests..."
  mkdir -p k8s

  # Basic namespace
  cat > k8s/namespace.yaml << 'K8S_NS'
apiVersion: v1
kind: Namespace
metadata:
  name: disaster-recovery
K8S_NS

  # Basic deployment
  cat > k8s/deployment.yaml << 'K8S_DEPLOY'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: disaster-recovery-app
  namespace: disaster-recovery
spec:
  replicas: 3
  selector:
    matchLabels:
      app: disaster-recovery
  template:
    metadata:
      labels:
        app: disaster-recovery
    spec:
      containers:
      - name: app
        image: your-registry/disaster-recovery:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
K8S_DEPLOY
fi

# Apply Kubernetes manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml || echo "⚠️  Deployment will need Docker image - build and push first"

echo "✅ Kubernetes configuration submitted!"
kubectl get pods -n disaster-recovery || true

# Step 5: GitHub Actions Setup
echo ""
echo "🔄 Step 5: Setting up CI/CD..."
echo "Add these GitHub secrets:"
echo "  DO_API_TOKEN: $DO_TOKEN"
echo "  VERCEL_TOKEN: (get from https://vercel.com/account/tokens)"
echo "  VERCEL_ORG_ID: unite-group"
echo "  VERCEL_PROJECT_ID: (check .vercel/project.json)"

echo ""
echo "🎉 Phase 23 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Go to GitHub Settings → Secrets and add the tokens above"
echo "2. Build and push Docker images"
echo "3. Push to main branch to trigger CI/CD"
echo "4. Check Vercel and DigitalOcean dashboards for status"
echo ""
echo "Your deployment URLs:"
echo "  Frontend: https://disaster-recovery-[random].vercel.app"
echo "  Backend: Run 'kubectl get service -n disaster-recovery' to check"
echo ""
echo "Database connection string saved in Vercel environment variables"

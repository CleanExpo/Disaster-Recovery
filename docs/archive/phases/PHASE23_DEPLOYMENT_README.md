# Phase 23: Vercel + DigitalOcean Deployment

## Quick Start

### Option 1: Automated Setup (Recommended)
```bash
./phase23-setup.sh
```

This script will:
- Fix Vercel deployment
- Create DigitalOcean Kubernetes cluster
- Provision PostgreSQL and Redis
- Deploy to Kubernetes
- Set up CI/CD

### Option 2: Manual Setup

#### 1. Fix Vercel
```bash
vercel redeploy --prod
```

#### 2. Get DigitalOcean Token
1. Go to https://cloud.digitalocean.com/account/api/tokens
2. Create new token
3. Copy the token

#### 3. Set up DigitalOcean
```bash
export DIGITALOCEAN_ACCESS_TOKEN=your_token_here
doctl auth init
doctl kubernetes cluster create disaster-recovery-nrpg --region nyc3 --count 3 --machine-slug s-2vcpu-4gb --wait
doctl kubernetes cluster kubeconfig save disaster-recovery-nrpg
```

#### 4. Deploy to Kubernetes
```bash
kubectl create namespace disaster-recovery
kubectl apply -f k8s/
```

#### 5. Add GitHub Secrets
Go to GitHub repo → Settings → Secrets → New repository secret

Add:
- `DO_API_TOKEN` = your DigitalOcean token
- `VERCEL_TOKEN` = your Vercel token
- `VERCEL_ORG_ID` = unite-group
- `VERCEL_PROJECT_ID` = (from .vercel/project.json)

#### 6. Push to Main
```bash
git add .
git commit -m "Phase 23: Deployment configuration"
git push origin main
```

## Monitoring

### Vercel
https://vercel.com/unite-group/disaster-recovery

### DigitalOcean
```bash
kubectl get pods -n disaster-recovery
kubectl get service -n disaster-recovery
kubectl logs -f deployment/disaster-recovery-app -n disaster-recovery
```

## Troubleshooting

### Vercel Build Fails
- Check logs: https://vercel.com/unite-group/disaster-recovery/deployments
- Common issue: Missing UI components - run `npm install shadcn-ui`

### Kubernetes Pod Won't Start
```bash
kubectl describe pod <pod-name> -n disaster-recovery
kubectl logs <pod-name> -n disaster-recovery
```

### Database Connection Issues
```bash
doctl databases list
doctl databases get disaster-recovery-postgres
```

## Costs

- DigitalOcean Kubernetes: ~$60/month
- PostgreSQL: ~$15/month
- Redis: ~$15/month
- Vercel: Free tier (or $20/month Pro)
- **Total: ~$90-110/month**

## Support

Check these files:
- `vercel.json` - Vercel configuration
- `.github/workflows/deploy-phase23.yml` - CI/CD pipeline
- `k8s/*.yaml` - Kubernetes manifests
- `phase23-setup.sh` - Automated setup script

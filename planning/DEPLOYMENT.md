# Deployment Configuration

## Current Setup: Vercel Native GitHub Integration ✅

The project is configured to auto-deploy through **Vercel's native GitHub integration**, which automatically deploys on every push to the `main` branch.

### How It Works
1. **Push to main branch** → Vercel automatically detects the push
2. **Vercel builds** → Uses settings from `vercel.json`
3. **Deployment** → Automatically deploys to production

### Vercel Configuration
- **Framework**: Next.js
- **Build Command**: `npx prisma generate && next build`
- **Install Command**: `npm install --force --legacy-peer-deps`
- **Region**: Sydney (syd1)
- **GitHub Integration**: Enabled (`"github": { "silent": true }`)

## Why GitHub Actions is Disabled

The GitHub Actions workflow (`.github/workflows/auto-deploy.yml`) is **intentionally disabled** because:
1. **Redundancy**: Vercel's native integration already handles auto-deployment
2. **Conflicts**: Running both would cause duplicate deployments
3. **Missing Secrets**: The workflow requires VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID

## To Fix Auto-Deploy Issues

If auto-deploy isn't working:

### 1. Check Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Git**
4. Ensure:
   - GitHub repository is connected
   - Production branch is set to `main`
   - Auto-deploy is enabled

### 2. Check GitHub Integration
1. Go to GitHub repository settings
2. Check **Integrations** → **Vercel**
3. Ensure the integration has proper permissions

### 3. Manual Deployment Commands
If you need to deploy manually:
```bash
# Using Vercel CLI
vercel --prod

# Using npm scripts
npm run deploy
```

## Alternative: Enable GitHub Actions

If you prefer GitHub Actions over Vercel's native integration:

### 1. Add GitHub Secrets
Add these secrets to your repository:
- `VERCEL_TOKEN`: Get from Vercel dashboard → Settings → Tokens
- `VERCEL_ORG_ID`: Get from Vercel dashboard → Team Settings
- `VERCEL_PROJECT_ID`: Get from Vercel dashboard → Project Settings

### 2. Disable Vercel Integration
1. Go to Vercel Dashboard → Project Settings → Git
2. Disconnect GitHub integration

### 3. Re-enable Workflow
Edit `.github/workflows/auto-deploy.yml` and uncomment the push trigger:
```yaml
on:
  push:
    branches:
      - main
```

## Current Deployment URLs
- **Production**: https://disasterrecovery.com.au
- **Preview**: disaster-recovery-*.vercel.app

## Build Optimizations
The build is configured with:
- **Memory**: 8GB (`NODE_OPTIONS: --max-old-space-size=8192`)
- **Skip Validation**: Build continues despite TypeScript errors
- **Database**: SQLite file database for build
- **Image Optimization**: Disabled (Sharp removed for compatibility)

## Monitoring Deployments

### Vercel Dashboard
Monitor deployments at: https://vercel.com/dashboard

### Local Monitoring
```bash
# Check deployment status
npm run monitor

# Watch for issues
npm run monitor:watch

# Auto-fix common issues
npm run monitor:fix
```

## Common Issues & Solutions

### Issue: Push doesn't trigger deployment
**Solution**: Check Vercel GitHub integration is connected

### Issue: Build fails with memory error
**Solution**: Already configured with 8GB memory limit

### Issue: Sharp module errors
**Solution**: Sharp has been removed, using placeholder image optimizer

### Issue: TypeScript errors blocking build
**Solution**: `SKIP_ENV_VALIDATION` and `CI=false` are set

## Support
For deployment issues:
1. Check Vercel deployment logs
2. Review this guide
3. Check GitHub repository settings
4. Verify Vercel project settings# Deployment trigger Sat, Aug 30, 2025  9:19:47 PM

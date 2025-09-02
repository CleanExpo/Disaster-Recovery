# Vercel Token Setup for Pipeline Deployment

## Required Values (Already Retrieved)

- **VERCEL_ORG_ID**: `team_KMZACI5rIltoCRhAtGCXlxUf`
- **VERCEL_PROJECT_ID**: `prj_a776Ydu6bNc7va8zrGfwXosp2xif`

## Steps to Create Vercel Token

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/account/tokens

2. **Create New Token**
   - Click "Create Token"
   - Name: `disaster-recovery-github-actions`
   - Scope: Full Access (or Custom with deploy permissions)
   - Expiration: Never (or set as needed)
   - Click "Create"

3. **Copy the Token**
   - Copy the generated token immediately (it won't be shown again)

## Add to GitHub Secrets

1. **Go to GitHub Repository Settings**
   - Visit: https://github.com/CleanExpo/Disaster-Recovery/settings/secrets/actions

2. **Add Required Secrets**
   - Click "New repository secret" for each:
   
   | Secret Name | Value |
   |------------|-------|
   | VERCEL_TOKEN | [Your generated token from step 3] |
   | VERCEL_ORG_ID | team_KMZACI5rIltoCRhAtGCXlxUf |
   | VERCEL_PROJECT_ID | prj_a776Ydu6bNc7va8zrGfwXosp2xif |
   | NEXTAUTH_SECRET | LMUDdvl91SzvH84on2RBx820GPJX33z+ICkk66EQMpg= |

## Enable GitHub Actions Workflow

Once secrets are added, update `.github/workflows/auto-deploy.yml`:

```yaml
# Change from:
on:
  # Disabled automatic triggers
  # push:
  #   branches:
  #     - main
  workflow_dispatch:

# To:
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

## Test Deployment

1. **Manual Test**:
   ```bash
   vercel deploy --token=[YOUR_TOKEN]
   ```

2. **Via GitHub Actions**:
   - Push to main branch
   - Check Actions tab: https://github.com/CleanExpo/Disaster-Recovery/actions

## Current Deployment Status

- **Production URL**: https://disaster-recovery-seven.vercel.app
- **Project**: disaster-recovery
- **Team**: unite-group
- **Framework**: Next.js

## Alternative: Use Vercel GitHub Integration

If you prefer automatic deployments without tokens:

1. Visit: https://vercel.com/unite-group/disaster-recovery/settings/git
2. Connect GitHub repository
3. Enable automatic deployments for main branch
4. Vercel will handle deployments automatically without needing tokens

## Troubleshooting

If deployments fail:

1. **Check Token Permissions**: Ensure token has deploy permissions
2. **Verify Environment Variables**: Run `vercel env pull` to check
3. **Check Build Logs**: Visit Vercel dashboard for detailed logs
4. **Validate Secrets**: Ensure GitHub secrets are correctly set

## Current Configuration Files

- **Vercel Config**: `vercel.json`
- **GitHub Workflow**: `.github/workflows/auto-deploy.yml`
- **Environment**: `.env`, `.env.production`
- **Project Link**: `.vercel/project.json`
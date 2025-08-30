# 🚀 Auto-Deploy System Documentation

## Overview
The Disaster Recovery platform includes a comprehensive auto-deployment system that automatically commits, pushes, and deploys changes to Vercel when working on the main branch.

## Features

### ✅ Automatic Git Operations
- Detects file changes automatically
- Stages all changes
- Creates descriptive commit messages
- Pushes to GitHub main branch

### 🔄 Continuous Deployment
- GitHub integration triggers Vercel deployment
- GitHub Actions workflow for CI/CD
- Automatic build optimization
- Error recovery mechanisms

### 📊 Monitoring
- Real-time change detection
- Deployment status tracking
- Error logging and reporting
- Success notifications

## Usage Methods

### Method 1: NPM Scripts
```bash
# Run auto-deploy once
npm run deploy

# Watch for changes and auto-deploy
npm run deploy:watch

# Get help
npm run deploy:help
```

### Method 2: PowerShell (Windows)
```powershell
# Watch mode (default)
.\auto-deploy.ps1

# Run once
.\auto-deploy.ps1 -Mode once

# Custom interval (30 seconds)
.\auto-deploy.ps1 -Interval 30
```

### Method 3: Node.js Direct
```bash
# Watch mode
node scripts/auto-deploy.js watch

# Run once
node scripts/auto-deploy.js once
```

## Configuration

### Auto-Deploy Settings
Edit `scripts/auto-deploy.js`:
```javascript
const AUTO_DEPLOY_CONFIG = {
  branch: 'main',           // Branch to auto-deploy from
  commitPrefix: 'auto-deploy:', // Commit message prefix
  checkInterval: 60000,      // Check interval in milliseconds
  autoPush: true,           // Auto-push to GitHub
  vercelDeploy: true        // Trigger Vercel deployment
};
```

### GitHub Actions Setup

1. **Add Secrets to GitHub Repository**:
   - Go to Settings → Secrets → Actions
   - Add the following secrets:
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `VERCEL_TOKEN`: Your Vercel access token
     - `NEXTAUTH_SECRET`: Your NextAuth secret (optional)

2. **Get Vercel Credentials**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Link project
   vercel link
   
   # Get credentials
   vercel env pull
   ```

### Environment Variables
Create `.env.local` for local development:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret"
NEXT_PUBLIC_MOCK_MODE="true"
SKIP_ENV_VALIDATION="true"
```

## Workflow

### Automatic Deployment Flow
```
1. Developer makes changes
2. Auto-deploy detects changes (every 60s)
3. Changes are staged and committed
4. Code pushed to GitHub main branch
5. GitHub Actions workflow triggered
6. Vercel builds and deploys
7. Site live at disaster-recovery.vercel.app
```

### Manual Override
You can still manually commit and push:
```bash
git add .
git commit -m "manual: Your message"
git push origin main
```

## Best Practices

### 1. Development Workflow
- Work on feature branches for major changes
- Use auto-deploy on main for quick updates
- Test locally before enabling auto-deploy

### 2. Commit Messages
Auto-generated format:
```
auto-deploy: X added, Y modified, Z deleted - YYYY-MM-DD HH:MM:SS

🤖 Auto-deployed by Disaster Recovery Auto-Deploy System
Timestamp: ISO-8601
```

### 3. Monitoring
- Check Vercel dashboard for deployment status
- Monitor GitHub Actions for build logs
- Review commit history for changes

## Troubleshooting

### Issue: Auto-deploy not detecting changes
```bash
# Check git status
git status

# Ensure you're on main branch
git checkout main

# Restart auto-deploy
npm run deploy:watch
```

### Issue: Push fails with authentication error
```bash
# Set up GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Use SSH instead of HTTPS
git remote set-url origin git@github.com:CleanExpo/Disaster-Recovery.git
```

### Issue: Vercel deployment fails
1. Check Vercel dashboard for error logs
2. Ensure environment variables are set
3. Check build logs in GitHub Actions
4. Verify `vercel.json` configuration

### Issue: Build errors on Vercel
```bash
# Test build locally
npm run build

# Check for missing dependencies
npm install --force

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## Security Considerations

### ⚠️ Important
- Never commit sensitive data (API keys, passwords)
- Use environment variables for secrets
- Review commits before enabling auto-deploy
- Set up branch protection rules on GitHub

### Recommended .gitignore
```
.env.local
.env.production
*.log
.DS_Store
node_modules/
.next/
out/
build/
dist/
```

## Performance Optimization

### Deployment Speed
- Cached dependencies in GitHub Actions
- Incremental builds in Vercel
- Parallel job execution
- Optimized build scripts

### Resource Usage
- Minimal CPU usage in watch mode
- Efficient file watching
- Smart change detection
- Batched git operations

## Advanced Configuration

### Custom Deployment Hooks
Add to `scripts/auto-deploy.js`:
```javascript
// Pre-deploy hook
async function preDeployHook() {
  // Run tests
  execSync('npm test');
  
  // Build check
  execSync('npm run build');
}

// Post-deploy hook
async function postDeployHook() {
  // Send notification
  // Update status page
  // Clear CDN cache
}
```

### Multiple Environment Support
```javascript
const ENVIRONMENTS = {
  development: {
    branch: 'dev',
    url: 'dev.disasterrecovery.com.au'
  },
  staging: {
    branch: 'staging',
    url: 'staging.disasterrecovery.com.au'
  },
  production: {
    branch: 'main',
    url: 'disasterrecovery.com.au'
  }
};
```

## Monitoring Dashboard

Access deployment status:
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: https://github.com/CleanExpo/Disaster-Recovery/actions
- **Commit History**: https://github.com/CleanExpo/Disaster-Recovery/commits/main

## Support

For issues or questions:
1. Check troubleshooting section
2. Review Vercel logs
3. Check GitHub Actions logs
4. Create issue on GitHub

---

*Last Updated: 2024-01-30*
*Version: 1.0.0*
*Status: ACTIVE*
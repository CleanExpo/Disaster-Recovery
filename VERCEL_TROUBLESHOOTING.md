# Vercel Deployment Troubleshooting Guide

## 🔧 Build Configuration Updates Applied

### 1. Enhanced Build Script
The `scripts/vercel-build.js` has been updated with:
- Better error handling and detailed logging
- Memory usage tracking
- Automatic SQLite database creation for build
- Improved Prisma client generation
- Support for both `schema.prisma` and `schema.sqlite.prisma`

### 2. Updated Vercel Configuration
The `vercel.json` now includes:
- Explicit install command
- Build-time environment variables
- Memory allocation settings
- Database URL fallback

## 🚨 Common Issues and Solutions

### Issue 1: Prisma Client Generation Fails

**Error:** `Can't reach database server`

**Solution:**
```bash
# In Vercel Environment Variables, set:
DATABASE_URL=file:./prod.db
```

The build script will automatically use a temporary SQLite database during build.

### Issue 2: Out of Memory During Build

**Error:** `JavaScript heap out of memory`

**Solution:**
Already configured in `vercel.json`:
```json
{
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=4096"
  }
}
```

### Issue 3: TypeScript Errors

**Solution:**
Run locally first to check:
```bash
npm run type-check
npm run build
```

### Issue 4: Module Not Found Errors

**Solution:**
Ensure all dependencies are in `package.json`:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## 📋 Pre-Deployment Checklist

1. **Test Build Locally**
   ```bash
   npm run build
   ```

2. **Check Environment Variables**
   Required in Vercel:
   - `DATABASE_URL` (set to `file:./prod.db` for SQLite)
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)

3. **Verify Git Status**
   ```bash
   git status
   git add .
   git commit -m "Fix Vercel deployment"
   git push origin main
   ```

## 🔍 Debugging Steps

### Step 1: Check Vercel Build Logs

Look for these specific sections:
- "Build Environment Information"
- "Generating Prisma client"
- "Building Next.js application"

### Step 2: Verify Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Ensure all required variables are set
3. Check for typos or missing values

### Step 3: Review Function Logs

If the build succeeds but the site doesn't work:
1. Go to Functions tab in Vercel
2. Check for runtime errors
3. Look for database connection issues

## 🛠 Quick Fixes

### Fix 1: Clear Cache and Rebuild
```bash
# In Vercel Dashboard:
1. Go to Settings → Functions
2. Click "Clear Cache"
3. Trigger new deployment
```

### Fix 2: Use Production Database
If using PostgreSQL/MySQL in production:
```bash
# Update DATABASE_URL in Vercel to your production database
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Fix 3: Simplify Build Process
If complex builds fail, use simpler approach:
```json
// In vercel.json
{
  "buildCommand": "prisma generate && next build",
  "env": {
    "DATABASE_URL": "file:./prod.db"
  }
}
```

## 🎯 Current Build Process

1. **Environment Detection**
   - Checks if running on Vercel
   - Sets appropriate environment variables

2. **Database Setup**
   - Creates temporary SQLite database for build
   - Generates Prisma client

3. **Next.js Build**
   - Compiles TypeScript
   - Generates static pages
   - Creates API routes

4. **Cleanup**
   - Removes temporary files
   - Reports build status

## 📊 Expected Build Output

Successful build should show:
```
✅ Prisma client generated successfully
✅ Build completed successfully!
✨ Build process completed successfully!
```

## 🆘 If All Else Fails

1. **Use Minimal Configuration**
   ```json
   // vercel.json
   {
     "buildCommand": "next build"
   }
   ```

2. **Disable Prisma Temporarily**
   Comment out Prisma imports to isolate issue

3. **Contact Support**
   - Include build logs
   - List environment variables (without secrets)
   - Share `vercel.json` and `package.json`

## 📝 Recent Fixes Applied

1. ✅ Updated build script with better error handling
2. ✅ Added DATABASE_URL fallback for build process  
3. ✅ Configured memory allocation for large builds
4. ✅ Added support for SQLite during build
5. ✅ Improved Prisma schema detection
6. ✅ Added detailed logging for debugging

## 🚀 Deployment Command

After applying fixes:
```bash
git add .
git commit -m "Fix Vercel deployment with improved build process"
git push origin main
```

Vercel will automatically detect the push and start a new deployment.

## 📈 Monitor After Deployment

1. Check build logs for any warnings
2. Test critical paths:
   - Homepage loads
   - API routes work
   - Dynamic pages render
3. Monitor Vercel Analytics for errors

## 💡 Best Practices

1. Always test builds locally first
2. Keep environment variables synchronized
3. Use SQLite for development, upgrade to PostgreSQL for production
4. Monitor build times and optimize if needed
5. Keep dependencies up to date

## 🔄 If Issues Persist

The build script now includes extensive logging. Check the Vercel build logs for:
- Platform information
- Node version
- Database URL status
- Memory usage
- Specific error messages

This information will help identify the exact failure point.

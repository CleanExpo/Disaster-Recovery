#!/bin/bash
set -e

echo "🔧 Fixing Vercel Configuration"
echo "==============================="
echo ""
echo "This script will:"
echo "  1. Remove invalid secret references from vercel.json"
echo "  2. Deploy to Vercel with basic configuration"
echo ""

# Update vercel.json to remove secret references
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs"
}
EOF

echo "✅ Updated vercel.json (removed secret references)"
echo ""
echo "📦 Deploying to Vercel..."

# Deploy to production
vercel --prod --yes

echo ""
echo "✅ Vercel deployment complete!"
echo ""
echo "🔗 Dashboard: https://vercel.com/unite-group/disaster-recovery"
echo ""
echo "⚙️  To add environment variables later:"
echo "   vercel env add DATABASE_URL"
echo "   vercel env add NEXTAUTH_SECRET"
echo "   vercel env add NEXTAUTH_URL"
echo ""

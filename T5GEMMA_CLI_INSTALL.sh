#!/bin/bash

# T5Gemma Integration Installation Script
# Run this script to setup T5Gemma in your Disaster Recovery SaaS

echo "🚀 Starting T5Gemma Installation..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install transformers@latest torch huggingface-hub @huggingface/inference dotenv axios pino bull redis node-cache lru-cache
npm install -D @types/node-cache @types/bull ts-node

# Step 2: Download models
echo "🤖 Downloading T5Gemma models..."
npx ts-node scripts/downloadModels.ts

# Step 3: Update Prisma
echo "🗄️  Updating database schema..."
npx prisma migrate dev --name add_ai_models
npx prisma generate

# Step 4: Start Redis (in background)
echo "🔴 Starting Redis server..."
redis-server &

# Step 5: Run development server
echo "✅ Installation complete! Starting development server..."
npm run dev

echo "🎉 T5Gemma is ready! Access it at http://localhost:3000"
echo ""
echo "API Endpoints:"
echo "  POST /api/ai/process - General task processing"
echo "  POST /api/ai/summarize - Text summarization"
echo "  POST /api/ai/extract - Information extraction"
echo "  POST /api/disasters/analyze - Disaster analysis"
echo ""
echo "For more info, see T5GEMMA_SETUP.md"

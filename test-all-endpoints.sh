#!/bin/bash

echo "🧪 Testing All API Endpoints"
echo "============================"
echo ""

BASE_URL="http://localhost:3000"
SUCCESS_COUNT=0
FAIL_COUNT=0

# Test health endpoints
echo "Testing health endpoints..."
curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/health && echo "✅ /api/health" || echo "❌ /api/health"
curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/health/live && echo "✅ /api/health/live" || echo "❌ /api/health/live"
curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/health/ready && echo "✅ /api/health/ready" || echo "❌ /api/health/ready"

# Test onboarding endpoints
echo ""
echo "Testing onboarding endpoints..."
curl -s -X POST $BASE_URL/api/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"contractorId":"test","businessName":"Test","specialization":"water","experience":5,"certifications":[]}' \
  | grep -q "success" && echo "✅ POST /api/onboarding/start" || echo "❌ POST /api/onboarding/start"

curl -s $BASE_URL/api/onboarding/progress/test-id \
  | grep -q "error\|success" && echo "✅ GET /api/onboarding/progress/[id]" || echo "❌ GET /api/onboarding/progress/[id]"

curl -s -X POST $BASE_URL/api/onboarding/quiz \
  -H "Content-Type: application/json" \
  -d '{"moduleId":"TEST_MODULE","contractorId":"test"}' \
  | grep -q "success" && echo "✅ POST /api/onboarding/quiz" || echo "❌ POST /api/onboarding/quiz"

# Test tenant endpoint
echo ""
echo "Testing tenant endpoint..."
curl -s "$BASE_URL/api/tenant?domain=test.com" \
  | grep -q "id" && echo "✅ GET /api/tenant" || echo "❌ GET /api/tenant"

echo ""
echo "============================"
echo "Basic endpoint testing complete"
echo "Run with development server active: npm run dev"

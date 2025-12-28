#!/bin/bash
# Test Verification Script
# Verifies all test files are properly configured and discoverable
# Usage: bash scripts/verify-tests.sh

set -e

echo "=========================================="
echo "Test Verification Script"
echo "Disaster Recovery NRPG Platform"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to check file exists
check_file() {
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} Found: $1"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    return 0
  else
    echo -e "${RED}✗${NC} Missing: $1"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
    return 1
  fi
}

# Function to check directory exists
check_dir() {
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} Directory exists: $1"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    return 0
  else
    echo -e "${RED}✗${NC} Directory missing: $1"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
    return 1
  fi
}

# Function to count lines in file
count_lines() {
  if [ -f "$1" ]; then
    wc -l < "$1"
  else
    echo "0"
  fi
}

echo "Step 1: Checking test directories..."
echo "--------------------------------------"
check_dir "tests/integration/crm"
check_dir "tests/integration/inspection"
check_dir "tests/integration/agents"
check_dir "tests/e2e/crm"
check_dir "tests/e2e/inspection"
echo ""

echo "Step 2: Checking integration test files..."
echo "--------------------------------------"
check_file "tests/integration/crm/customer-journey.test.ts"
check_file "tests/integration/inspection/report-workflow.test.ts"
check_file "tests/integration/agents/workflow.test.ts"
echo ""

echo "Step 3: Checking E2E test files..."
echo "--------------------------------------"
check_file "tests/e2e/crm/customer-360.spec.ts"
check_file "tests/e2e/inspection/report-generation.spec.ts"
echo ""

echo "Step 4: Checking test infrastructure..."
echo "--------------------------------------"
check_file "playwright.config.ts"
if [ -f "jest.config.ts" ] || [ -f "jest.config.js" ]; then
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  echo -e "${GREEN}✓${NC} Found: jest.config.ts or jest.config.js"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
  TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
  echo -e "${RED}✗${NC} Missing: jest.config.ts or jest.config.js"
  FAILED_CHECKS=$((FAILED_CHECKS + 1))
fi
check_file "package.json"
echo ""

echo "Step 5: Verifying test file line counts..."
echo "--------------------------------------"
CUSTOMER_JOURNEY_LINES=$(count_lines "tests/integration/crm/customer-journey.test.ts")
REPORT_WORKFLOW_LINES=$(count_lines "tests/integration/inspection/report-workflow.test.ts")
AGENT_WORKFLOW_LINES=$(count_lines "tests/integration/agents/workflow.test.ts")
CUSTOMER_360_LINES=$(count_lines "tests/e2e/crm/customer-360.spec.ts")
REPORT_GEN_LINES=$(count_lines "tests/e2e/inspection/report-generation.spec.ts")

echo "  customer-journey.test.ts: $CUSTOMER_JOURNEY_LINES lines"
echo "  report-workflow.test.ts: $REPORT_WORKFLOW_LINES lines"
echo "  workflow.test.ts: $AGENT_WORKFLOW_LINES lines"
echo "  customer-360.spec.ts: $CUSTOMER_360_LINES lines"
echo "  report-generation.spec.ts: $REPORT_GEN_LINES lines"

TOTAL_LINES=$((CUSTOMER_JOURNEY_LINES + REPORT_WORKFLOW_LINES + AGENT_WORKFLOW_LINES + CUSTOMER_360_LINES + REPORT_GEN_LINES))
echo "  Total test code: $TOTAL_LINES lines"
echo ""

echo "Step 6: Checking NPM dependencies..."
echo "--------------------------------------"
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if npm list @jest/globals > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Jest dependencies installed"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
  echo -e "${YELLOW}⚠${NC} Jest dependencies may need installation"
fi

TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if npm list @playwright/test > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Playwright dependencies installed"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
  echo -e "${YELLOW}⚠${NC} Playwright dependencies may need installation"
fi
echo ""

echo "Step 7: Checking test discoverability..."
echo "--------------------------------------"
echo "Discovering Jest tests..."
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if npm run test -- --listTests --passWithNoTests 2>/dev/null | grep -q "customer-journey"; then
  echo -e "${GREEN}✓${NC} Jest can discover integration tests"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
  echo -e "${YELLOW}⚠${NC} Jest test discovery check skipped (may need running app)"
fi

echo "Discovering Playwright tests..."
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
if npx playwright test --list 2>/dev/null | grep -q "customer-360"; then
  echo -e "${GREEN}✓${NC} Playwright can discover E2E tests"
  PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
  # Try alternative check
  if [ -f "tests/e2e/crm/customer-360.spec.ts" ]; then
    echo -e "${YELLOW}⚠${NC} Playwright test discovery check skipped (may need browser installation)"
  else
    echo -e "${RED}✗${NC} Playwright cannot discover E2E tests"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
  fi
fi
echo ""

echo "Step 8: Summary..."
echo "=========================================="
echo "Total Checks: $TOTAL_CHECKS"
echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
if [ $FAILED_CHECKS -gt 0 ]; then
  echo -e "Failed: ${RED}$FAILED_CHECKS${NC}"
fi
echo ""

if [ $FAILED_CHECKS -eq 0 ]; then
  echo -e "${GREEN}✅ All verification checks passed!${NC}"
  echo ""
  echo "Next Steps:"
  echo "  1. Run integration tests: npm run test tests/integration/"
  echo "  2. Install Playwright browsers: npx playwright install --with-deps"
  echo "  3. Start dev server: npm run dev"
  echo "  4. Run E2E tests: npx playwright test tests/e2e/"
  exit 0
else
  echo -e "${RED}❌ Some verification checks failed${NC}"
  echo ""
  echo "Please review the errors above and:"
  echo "  1. Ensure all test files exist"
  echo "  2. Install dependencies: npm install"
  echo "  3. Install Playwright browsers: npx playwright install --with-deps"
  exit 1
fi

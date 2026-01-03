# Quick Test Reference Card

**Disaster Recovery NRPG Platform - Test Suite**

---

## 🚀 Quick Start

### 1. Verify Setup
```bash
bash scripts/verify-tests.sh
```

### 2. Run Integration Tests
```bash
npm run test tests/integration/
```

### 3. Run E2E Tests
```bash
# Install browsers (one time)
npx playwright install --with-deps

# Start dev server (separate terminal)
npm run dev

# Run tests
npx playwright test tests/e2e/
```

---

## 📋 Test Files

| File | Type | Tests | Lines |
|------|------|-------|-------|
| `tests/integration/crm/customer-journey.test.ts` | Integration | Customer lifecycle | 523 |
| `tests/integration/inspection/report-workflow.test.ts` | Integration | Report workflow | 623 |
| `tests/integration/agents/workflow.test.ts` | Integration | Agent orchestration | 617 |
| `tests/e2e/crm/customer-360.spec.ts` | E2E | CRM UI | 375 |
| `tests/e2e/inspection/report-generation.spec.ts` | E2E | Inspection UI | 487 |

**Total**: 2,625 lines | 50+ scenarios

---

## 🎯 Common Commands

### Integration Tests (Jest)

```bash
# All integration tests
npm run test tests/integration/

# Specific file
npm run test tests/integration/crm/customer-journey.test.ts

# With coverage
npm run test -- --coverage tests/integration/

# Watch mode
npm run test -- --watch tests/integration/

# Single test
npm run test -- --testNamePattern="should complete customer journey"

# Verbose output
npm run test -- --verbose tests/integration/
```

### E2E Tests (Playwright)

```bash
# All E2E tests
npx playwright test tests/e2e/

# Specific file
npx playwright test tests/e2e/crm/customer-360.spec.ts

# UI mode (debugging)
npx playwright test --ui

# Headed (see browser)
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# Generate trace
npx playwright test --trace on

# View report
npx playwright show-report
```

---

## 🔍 What Each Test Does

### `customer-journey.test.ts`
Tests CRM customer lifecycle:
- LEAD → PROSPECT → CUSTOMER progression
- Opportunity creation and stage transitions
- Booking and job completion
- Activity logging
- Metrics calculation

### `report-workflow.test.ts`
Tests inspection report workflow:
- Report creation and state transitions
- Damage area documentation
- Moisture readings
- Photo upload
- Cost estimation
- Compliance checks
- Approval workflow
- PDF generation

### `workflow.test.ts`
Tests agent orchestration:
- 4-agent sequential execution
- Data intake and validation
- Report generation
- Quality assurance review
- Operations finalization
- Error handling and rollback

### `customer-360.spec.ts`
Tests CRM UI in browser:
- Customer search
- 360° view display
- Tab navigation
- Opportunity management
- Activity tracking
- Filtering

### `report-generation.spec.ts`
Tests inspection UI in browser:
- Booking creation
- Damage area entry
- Photo upload
- Cost generation
- Approval process
- PDF download

---

## 🛠️ Troubleshooting

### Integration Tests

**Problem**: Database connection error
```bash
# Check DATABASE_URL is set
echo $DATABASE_URL

# Verify database is running
psql -U user -d test_db
```

**Problem**: Tests fail with "table not found"
```bash
# Run migrations
npx prisma migrate dev
```

### E2E Tests

**Problem**: Browsers not found
```bash
# Install browsers
npx playwright install --with-deps
```

**Problem**: Tests timeout
```bash
# Ensure dev server is running
npm run dev
# Should be on http://localhost:3000
```

**Problem**: Test data not found
```bash
# Create test data (see TESTING_GUIDE.md)
# Or update test to create its own data
```

---

## 📊 Test Reports

### Jest Coverage Report
```bash
npm run test -- --coverage tests/integration/
# Report: coverage/lcov-report/index.html
```

### Playwright HTML Report
```bash
npx playwright test
npx playwright show-report
# Report: playwright-report/index.html
```

### Playwright Trace Viewer
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

---

## ⚙️ Environment Setup

### Integration Tests
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/test_db"
NODE_ENV=test
```

### E2E Tests
```env
# No special env needed
# Dev server should run on http://localhost:3000
```

### Test Users
- Admin: `admin@example.com` / `password123`
- Inspector: `inspector@example.com` / `password123`
- Manager: `manager@example.com` / `password123`

---

## 📝 Quick Tips

1. **Always verify first**: `bash scripts/verify-tests.sh`
2. **Run integration tests first**: Faster feedback
3. **Use watch mode for development**: `--watch`
4. **Use UI mode for E2E debugging**: `--ui`
5. **Check logs for failures**: Detailed error messages
6. **Clean test data regularly**: Avoid conflicts

---

## 🎓 Learning Resources

- **Full Guide**: See `TESTING_GUIDE.md`
- **Implementation Details**: See `TEST_IMPLEMENTATION_SUMMARY.md`
- **Jest Docs**: https://jestjs.io/docs/getting-started
- **Playwright Docs**: https://playwright.dev/docs/intro

---

## 🎯 CI/CD Integration

### GitHub Actions
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test tests/integration/
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

---

**Last Updated**: 2025-12-29
**Test Suite Version**: 1.0.0
**Total Tests**: 50+

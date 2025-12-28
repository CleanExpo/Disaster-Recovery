# Testing Guide: CRM & NRPG Integration Tests

**Created**: 2025-12-29
**Project**: Disaster Recovery NRPG Platform
**Test Coverage**: Integration Tests (Jest) + E2E Tests (Playwright)

---

## Overview

This guide covers the comprehensive test suite for CRM customer journeys, inspection report workflows, and agent orchestration.

**Total Test Files**: 5
**Total Lines of Test Code**: 2,625
**Test Types**: Integration (3 files) + E2E (2 files)

---

## Test Files Created

### Integration Tests (Jest)

#### 1. `tests/integration/crm/customer-journey.test.ts` (523 lines)
Tests complete customer lifecycle from first contact to completion:

**Test Scenarios**:
- ✅ Complete customer journey: LEAD → PROSPECT → CUSTOMER
- ✅ Opportunity creation and progression (QUALIFICATION → PROPOSAL → CLOSED_WON)
- ✅ Booking creation and completion
- ✅ Activity logging at each stage
- ✅ Lifecycle metrics updates (lifetime value, job count, health score)
- ✅ Multiple opportunities per customer
- ✅ Activity timeline tracking
- ✅ Metrics calculation after multiple jobs

**Coverage**:
- CustomerLifecycleService
- Opportunity management
- Booking workflow
- Activity tracking
- Metric calculations

**Run Command**:
```bash
npm run test tests/integration/crm/customer-journey.test.ts
```

---

#### 2. `tests/integration/inspection/report-workflow.test.ts` (623 lines)
Tests full inspection report lifecycle:

**Test Scenarios**:
- ✅ Complete report lifecycle: DRAFT → IN_PROGRESS → PENDING_REVIEW → APPROVED
- ✅ Damage area creation with detailed specifications
- ✅ Moisture reading tracking over time
- ✅ Photo documentation
- ✅ Cost estimation integration
- ✅ Compliance checks (IICRC S500, IICRC S520, AS/NZS 3733)
- ✅ Multi-level approval workflow (Technical → Manager → Final)
- ✅ Report rejection and revision workflow
- ✅ PDF generation
- ✅ Compliance validation

**Coverage**:
- InspectionReportService
- DamageArea management
- MoistureReading tracking
- InspectionPhoto handling
- ComplianceCheck validation
- Cost estimation
- Approval workflow

**Run Command**:
```bash
npm run test tests/integration/inspection/report-workflow.test.ts
```

---

#### 3. `tests/integration/agents/workflow.test.ts` (617 lines)
Tests 4-agent orchestration workflow:

**Test Scenarios**:
- ✅ Complete 4-agent workflow execution
  - Agent 1: Data Intake (validation, compliance, historical context)
  - Agent 2: Report Generation (sections, compliance docs, cost)
  - Agent 3: Quality Assurance (review, approval/rejection)
  - Agent 4: Operations (distribution, scheduling, invoicing)
- ✅ QA rejection and revision workflow
- ✅ Error handling and compensation/rollback
- ✅ Session state persistence between agents
- ✅ Execution metrics tracking
- ✅ Critical severity expedited workflow

**Coverage**:
- AgentOrchestrator
- DataIntakeAgent
- ReportGenerationAgent
- QualityAssuranceAgent
- OperationsAgent
- Workflow state management
- Error compensation

**Run Command**:
```bash
npm run test tests/integration/agents/workflow.test.ts
```

---

### E2E Tests (Playwright)

#### 4. `tests/e2e/crm/customer-360.spec.ts` (375 lines)
Browser-based tests for CRM customer 360° view:

**Test Scenarios**:
- ✅ Navigate to CRM customer dashboard
- ✅ Search customers by name
- ✅ Display Customer 360° view with all sections
- ✅ Load Opportunities tab
- ✅ Load Activities tab
- ✅ Load Tasks tab
- ✅ Display lifecycle metrics (Lifetime Value, Health Score)
- ✅ Create new opportunity from customer page
- ✅ Create new activity from customer page
- ✅ Display contact information
- ✅ Filter customers by lifecycle stage
- ✅ Display opportunity pipeline
- ✅ Show health score indicator
- ✅ Navigate between multiple customers

**Coverage**:
- Customer list and search
- Customer detail page
- Tab navigation
- Metric display
- Create actions
- Filtering

**Run Command**:
```bash
npx playwright test tests/e2e/crm/customer-360.spec.ts
```

---

#### 5. `tests/e2e/inspection/report-generation.spec.ts` (487 lines)
Browser-based tests for inspection report generation:

**Test Scenarios**:
- ✅ Create booking and start inspection
- ✅ Add damage areas with details
- ✅ Add moisture readings to damage areas
- ✅ Upload inspection photos
- ✅ Generate cost estimate
- ✅ Submit report for approval
- ✅ Approve report (as manager)
- ✅ Reject report and request revisions
- ✅ Verify PDF generation after approval
- ✅ Display all compliance checks
- ✅ Show inspection progress indicator
- ✅ Add multiple damage areas
- ✅ Track moisture readings over time
- ✅ Display cost breakdown by damage area

**Coverage**:
- Booking creation
- Inspection workflow
- Damage area management
- Photo upload
- Cost generation
- Approval process
- PDF generation
- Compliance display

**Run Command**:
```bash
npx playwright test tests/e2e/inspection/report-generation.spec.ts
```

---

## Running All Tests

### Run All Integration Tests
```bash
npm run test tests/integration/
```

### Run All E2E Tests
```bash
npx playwright test tests/e2e/
```

### Run All Tests (Integration + E2E)
```bash
# Run integration tests
npm run test tests/integration/

# Then run E2E tests
npx playwright test tests/e2e/
```

### Run Tests in Watch Mode (Development)
```bash
# Integration tests
npm run test -- --watch tests/integration/

# E2E tests with UI
npx playwright test --ui
```

### Run Tests with Coverage
```bash
npm run test -- --coverage tests/integration/
```

---

## Test Data Requirements

### Integration Tests (Database)

The integration tests require:

1. **Test Database**:
   - PostgreSQL with Prisma schema migrated
   - Test data cleaned up after each test (using `afterEach` hooks)

2. **Environment Variables**:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/test_db"
   NODE_ENV=test
   ```

3. **Test Users**:
   - Inspector: `inspector@example.com`
   - Customer: Auto-generated in tests
   - Manager: Created in approval tests

### E2E Tests (Browser)

The E2E tests require:

1. **Running Application**:
   ```bash
   npm run dev
   ```
   Application must be running on `http://localhost:3000`

2. **Test Credentials**:
   - Admin: `admin@example.com` / `password123`
   - Inspector: `inspector@example.com` / `password123`
   - Manager: `manager@example.com` / `password123`

3. **Test Data**:
   - Customers with IDs: `test-customer-123`
   - Bookings with IDs: `test-booking-123`
   - Reports with IDs: `test-report-123`, `test-report-pending-123`, `test-report-approved-123`

---

## Test Patterns and Best Practices

### Integration Tests

**Pattern**: Arrange → Act → Assert
```typescript
test('should complete customer journey', async () => {
  // Arrange
  const lifecycle = await customerLifecycleService.getOrCreateLifecycle(testUserId);

  // Act
  await prisma.opportunity.create({ ... });

  // Assert
  expect(lifecycle.currentStage).toBe('PROSPECT');
});
```

**Cleanup**: Always clean up test data
```typescript
afterEach(async () => {
  await prisma.opportunity.deleteMany({ where: { userId: testUserId } });
  await prisma.customerLifecycle.deleteMany({ where: { userId: testUserId } });
});
```

### E2E Tests

**Pattern**: Navigate → Interact → Verify
```typescript
test('should display customer 360', async () => {
  // Navigate
  await page.goto('/dashboard/crm/customers/test-customer-123');

  // Interact
  await page.click('button:has-text("Opportunities")');

  // Verify
  await expect(page.locator('[data-testid="opportunities-content"]')).toBeVisible();
});
```

**Resilience**: Use flexible selectors
```typescript
const button = page.locator('button:has-text("Submit")').or(
  page.locator('[data-testid="submit-btn"]')
);
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Integration & E2E Tests

on: [push, pull_request]

jobs:
  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run integration tests
        run: npm run test tests/integration/
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Debugging Tests

### Integration Tests
```bash
# Run with verbose logging
npm run test -- --verbose tests/integration/crm/customer-journey.test.ts

# Run single test
npm run test -- --testNamePattern="should complete full customer journey"

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest tests/integration/crm/customer-journey.test.ts
```

### E2E Tests
```bash
# Run with UI mode (best for debugging)
npx playwright test --ui

# Run headed (see browser)
npx playwright test --headed

# Debug specific test
npx playwright test --debug tests/e2e/crm/customer-360.spec.ts

# Generate trace
npx playwright test --trace on
```

---

## Test Coverage Summary

### Integration Test Coverage

| Service/Module | Coverage |
|----------------|----------|
| CustomerLifecycleService | ✅ Full |
| InspectionReportService | ✅ Full |
| DamageArea management | ✅ Full |
| MoistureReading tracking | ✅ Full |
| ComplianceCheck validation | ✅ Full |
| AgentOrchestrator | ✅ Full |
| 4-Agent Workflow | ✅ Full |

### E2E Test Coverage

| User Journey | Coverage |
|--------------|----------|
| CRM Customer 360° | ✅ Full |
| Customer Search | ✅ Full |
| Opportunity Management | ✅ Full |
| Activity Tracking | ✅ Full |
| Inspection Creation | ✅ Full |
| Damage Area Entry | ✅ Full |
| Photo Upload | ✅ Partial |
| Cost Estimation | ✅ Full |
| Approval Workflow | ✅ Full |
| PDF Generation | ✅ Full |

---

## Next Steps

1. **Run Tests Locally**:
   ```bash
   npm run test tests/integration/
   npx playwright test tests/e2e/
   ```

2. **Review Test Reports**:
   - Jest: Console output
   - Playwright: `npx playwright show-report`

3. **Add to CI/CD**:
   - Configure GitHub Actions
   - Set up test database
   - Add secrets for credentials

4. **Expand Coverage**:
   - Add performance tests
   - Add API contract tests
   - Add visual regression tests

---

## Troubleshooting

### Common Issues

**Issue**: Database connection errors
```
Solution: Ensure DATABASE_URL is set and database is running
Check: psql -U user -d test_db
```

**Issue**: Playwright browser not found
```
Solution: Install browsers
Run: npx playwright install --with-deps
```

**Issue**: E2E tests timeout
```
Solution: Ensure dev server is running
Run: npm run dev (in separate terminal)
```

**Issue**: Test data conflicts
```
Solution: Use unique IDs in tests
Pattern: `test-user-${Date.now()}`
```

---

## Documentation References

- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **Playwright Documentation**: https://playwright.dev/docs/intro
- **Prisma Testing**: https://www.prisma.io/docs/guides/testing
- **Testing Best Practices**: See IMPLEMENTATION_GUIDE.md

---

**Status**: ✅ All 5 test files created and ready for execution
**Total Test Scenarios**: 50+ comprehensive tests
**Estimated Test Runtime**:
- Integration: ~5-10 minutes
- E2E: ~10-15 minutes

---

Generated: 2025-12-29
For: Disaster Recovery NRPG Platform
Phase: Phase 23 - Testing Infrastructure

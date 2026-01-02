# Testing Infrastructure - Disaster Recovery NRPG Platform

## Table of Contents

1. [Overview](#overview)
2. [Test Structure](#test-structure)
3. [Running Tests](#running-tests)
4. [E2E Tests (Playwright)](#e2e-tests-playwright)
5. [Unit Tests (Jest)](#unit-tests-jest)
6. [Integration Tests](#integration-tests)
7. [Visual Regression Tests](#visual-regression-tests)
8. [CI/CD Integration](#cicd-integration)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Disaster Recovery NRPG Platform has a comprehensive testing infrastructure covering:

- **E2E Tests**: 50+ end-to-end tests using Playwright
- **Unit Tests**: Service, utility, and component tests using Jest
- **Integration Tests**: API and workflow tests
- **Visual Regression**: Screenshot-based visual testing
- **Performance Tests**: Load and performance benchmarks
- **Security Tests**: Vulnerability and penetration testing

### Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Integration Tests**: All critical user flows
- **E2E Tests**: Complete user journeys
- **Visual Tests**: All key pages and components

---

## Test Structure

```
tests/
├── e2e/                          # End-to-end tests (Playwright)
│   ├── auth.setup.ts            # Authentication setup
│   ├── claim-intake/            # Claim submission tests
│   │   └── claim-wizard.spec.ts
│   ├── nrpg-signup/            # Contractor signup tests
│   │   └── contractor-application.spec.ts
│   ├── contact/                # Contact form tests
│   │   └── contact-form.spec.ts
│   ├── homepage/               # Homepage navigation tests
│   │   └── navigation.spec.ts
│   ├── mobile/                 # Mobile responsive tests
│   │   └── responsive.spec.ts
│   ├── visual/                 # Visual regression tests
│   │   └── visual-regression.spec.ts
│   ├── fixtures/               # Test data fixtures
│   │   └── test-data.ts
│   └── helpers/                # Test helper utilities
│       └── page-helpers.ts
│
├── unit/                        # Unit tests (Jest)
│   ├── services/
│   ├── utils/
│   └── components/
│
├── integration/                 # Integration tests
│   ├── api/
│   └── workflows/
│
├── performance/                 # Performance tests
│   └── load-tests.test.ts
│
├── security/                    # Security tests
│   └── vulnerability-tests.test.ts
│
├── factories/                   # Test data factories
├── mocks/                       # Mock implementations
└── utils/                       # Test utilities
```

---

## Running Tests

### Quick Commands

```bash
# Run all tests
npm run test:all

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI (interactive mode)
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests in CI mode
npm run test:ci
```

### Environment-Specific

```bash
# Development environment
npm run test

# Staging environment
BASE_URL=https://staging.nrpg.com npm run test:e2e

# Production smoke tests
BASE_URL=https://nrpg.com npm run test:e2e -- --grep @smoke
```

---

## E2E Tests (Playwright)

### Test Suites

#### 1. Claim Intake Flow (`tests/e2e/claim-intake/`)

Tests the 3-step claim submission wizard:

- **Step 1**: Basic information (damage type, location, date)
- **Step 2**: Damage details (description, photos, affected areas)
- **Step 3**: Contact & insurance information

**Key Tests:**
- ✅ Complete wizard submission
- ✅ Field validation
- ✅ Navigation between steps
- ✅ Draft saving
- ✅ File uploads
- ✅ Session timeout handling

**Run:**
```bash
npx playwright test claim-intake
```

#### 2. Contractor Signup (`tests/e2e/nrpg-signup/`)

Tests contractor application process:

- Company information
- License & insurance verification
- Service areas & specializations
- Certifications & references
- Background check consent

**Key Tests:**
- ✅ Complete application submission
- ✅ Multi-field validation
- ✅ Dynamic form fields (add/remove certifications)
- ✅ Document uploads
- ✅ Draft saving

**Run:**
```bash
npx playwright test nrpg-signup
```

#### 3. Contact Form (`tests/e2e/contact/`)

Tests all contact form scenarios:

- General inquiries
- Claim assistance requests
- Partnership inquiries
- Form validation
- Error handling

**Key Tests:**
- ✅ Form submission
- ✅ Email/phone validation
- ✅ Required field validation
- ✅ Network error handling
- ✅ Accessibility (keyboard navigation)

**Run:**
```bash
npx playwright test contact
```

#### 4. Homepage Navigation (`tests/e2e/homepage/`)

Tests homepage functionality:

- Navigation menu
- Hero section
- Call-to-action buttons
- Footer links
- Mobile menu

**Key Tests:**
- ✅ Page load
- ✅ Navigation links
- ✅ Mobile menu toggle
- ✅ CTA redirects
- ✅ Performance metrics

**Run:**
```bash
npx playwright test homepage
```

#### 5. Mobile Responsive (`tests/e2e/mobile/`)

Tests responsive design across devices:

- Mobile portrait (375x667)
- Mobile landscape (667x375)
- Tablet portrait (768x1024)
- Tablet landscape (1024x768)

**Key Tests:**
- ✅ Layout adaptation
- ✅ Touch interactions
- ✅ Swipe gestures
- ✅ Mobile menu
- ✅ Form usability
- ✅ No horizontal scroll

**Run:**
```bash
npx playwright test mobile
```

#### 6. Visual Regression (`tests/e2e/visual/`)

Screenshot-based visual testing:

- Page screenshots
- Component screenshots
- Responsive breakpoints
- Dark mode
- Cross-browser consistency

**Key Tests:**
- ✅ Homepage screenshots
- ✅ Form components
- ✅ Navigation components
- ✅ State variations (hover, focus, error)
- ✅ Browser consistency

**Run:**
```bash
npx playwright test visual
```

### Test Helpers

#### PageHelper Class

Provides utilities for common test operations:

```typescript
import { PageHelper } from '../helpers/page-helpers';

const helper = new PageHelper(page);

// Navigation
await helper.nav.goToHomepage();
await helper.nav.goToClaimIntake();

// Form filling
await helper.form.fillInput('Name', 'John Doe');
await helper.form.selectOption('State', 'NY');
await helper.form.checkCheckbox('Agree to terms');

// Assertions
await helper.assert.expectToBeOnPage('/dashboard');
await helper.assert.expectSuccessMessage();

// Waiting
await helper.wait.waitForNavigation();
await helper.wait.waitForApiResponse('/api/claims');

// Scrolling
await helper.scroll.scrollToBottom();
await helper.scroll.scrollToElement('.footer');

// Mobile
await helper.mobile.tap('.button');
await helper.mobile.swipe('up');
```

### Test Data Fixtures

Reusable test data in `tests/e2e/fixtures/test-data.ts`:

```typescript
import { testUsers, testClaims, testContactForms } from '../fixtures/test-data';

// Use predefined test data
await helper.form.fillContactForm(testContactForms.generalInquiry);
```

---

## Unit Tests (Jest)

### Configuration

See `jest.config.ts` for complete configuration.

### Running Unit Tests

```bash
# All unit tests
npm run test:unit

# Specific file
npm test -- services.test.ts

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Writing Unit Tests

```typescript
import { describe, it, expect } from '@jest/globals';
import { myService } from '@/services/myService';

describe('MyService', () => {
  it('should perform expected operation', () => {
    const result = myService.doSomething();
    expect(result).toBe(expectedValue);
  });
});
```

---

## Integration Tests

Integration tests verify cross-service workflows and API endpoints.

### Running Integration Tests

```bash
npm run test:integration
```

### Test Structure

```typescript
describe('API Integration: Claims', () => {
  it('should create and retrieve claim', async () => {
    // Create claim
    const createResponse = await api.post('/api/claims', claimData);
    expect(createResponse.status).toBe(201);

    // Retrieve claim
    const getResponse = await api.get(`/api/claims/${createResponse.data.id}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data).toMatchObject(claimData);
  });
});
```

---

## Visual Regression Tests

Visual regression testing captures screenshots and compares them against baselines.

### Setup

Screenshots are stored in `tests/e2e/__screenshots__/` and compared on subsequent runs.

### Updating Baselines

```bash
# Update all screenshots
npx playwright test visual --update-snapshots

# Update specific test
npx playwright test visual-regression --update-snapshots
```

### Best Practices

1. **Disable Animations**: Always use `animations: 'disabled'`
2. **Hide Dynamic Content**: Hide timestamps, counters, etc.
3. **Consistent Data**: Use fixed test data
4. **Tolerance**: Set appropriate `maxDiffPixels` for browser differences

---

## CI/CD Integration

### GitHub Actions Workflows

#### 1. E2E Tests (`.github/workflows/test-e2e.yml`)

- Runs on every push and PR
- Parallel execution with sharding
- Uploads test results and screenshots
- Merges reports

#### 2. Complete Test Suite (`.github/workflows/test-all.yml`)

- Daily scheduled run
- Runs all test types:
  - Unit tests
  - Integration tests
  - E2E tests (all browsers)
  - Security tests
  - Performance tests
  - Build check

### Viewing Test Results

1. **GitHub Actions**: Check the Actions tab in GitHub
2. **Artifacts**: Download test reports and screenshots
3. **Summary**: View test summary in PR comments

---

## Best Practices

### E2E Tests

1. **Use Page Object Model**: Organize selectors and actions in page objects
2. **Use Test Helpers**: Utilize `PageHelper` for common operations
3. **Avoid Hard Waits**: Use `waitFor*` methods instead of `waitForTimeout`
4. **Data Independence**: Each test should be independent
5. **Cleanup**: Clean up test data after tests
6. **Descriptive Names**: Use clear, descriptive test names

### Unit Tests

1. **Test One Thing**: Each test should verify one behavior
2. **AAA Pattern**: Arrange, Act, Assert
3. **Mock External Dependencies**: Use mocks for APIs, databases, etc.
4. **Fast Tests**: Unit tests should run quickly
5. **Avoid Testing Implementation**: Test behavior, not implementation details

### General

1. **DRY**: Don't Repeat Yourself - use helpers and fixtures
2. **Readable**: Write tests that serve as documentation
3. **Maintainable**: Keep tests simple and easy to update
4. **Reliable**: Tests should not be flaky
5. **Comprehensive**: Cover happy paths, edge cases, and errors

---

## Troubleshooting

### Common Issues

#### Tests Failing Locally But Passing in CI

- Ensure consistent test data
- Check for timing issues (use proper waits)
- Verify browser versions match

#### Flaky Tests

- Add proper wait conditions
- Increase timeouts if needed
- Check for race conditions
- Ensure data independence

#### Visual Regression Failures

- Update baselines if intentional changes
- Check for dynamic content
- Verify browser consistency
- Review diff images

#### Timeout Errors

- Increase test timeout: `test.setTimeout(120000)`
- Check network conditions
- Verify server is running
- Look for blocked requests

### Debug Mode

```bash
# Run in debug mode
npx playwright test --debug

# Run with headed browser
npx playwright test --headed

# Verbose output
npx playwright test --reporter=list

# Trace viewer
npx playwright show-trace trace.zip
```

### Logging

```typescript
// Add logging to tests
console.log('Current URL:', page.url());
console.log('Element text:', await element.textContent());

// Take diagnostic screenshot
await page.screenshot({ path: 'debug-screenshot.png' });
```

---

## Test Metrics

### Current Coverage

- **E2E Tests**: 50+ scenarios
- **Unit Tests**: TBD (based on implementation)
- **Integration Tests**: 25+ API tests
- **Visual Tests**: 30+ screenshot comparisons

### Target Metrics

- **Code Coverage**: 80%+
- **E2E Coverage**: All critical user flows
- **Test Execution Time**: < 10 minutes (full suite)
- **Flaky Test Rate**: < 2%

---

## Contributing to Tests

### Adding New Tests

1. **Identify Test Type**: Unit, Integration, or E2E
2. **Create Test File**: Follow naming convention `*.spec.ts` or `*.test.ts`
3. **Use Helpers**: Leverage existing helpers and fixtures
4. **Document**: Add clear descriptions and comments
5. **Run Locally**: Ensure tests pass locally
6. **Submit PR**: Include test results in PR description

### Test Review Checklist

- [ ] Tests are independent and can run in any order
- [ ] Tests use proper wait conditions (no hard waits)
- [ ] Tests have descriptive names
- [ ] Tests use helpers and fixtures (DRY)
- [ ] Tests handle both success and error cases
- [ ] Tests clean up after themselves
- [ ] Tests pass locally and in CI

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Jest Documentation](https://jestjs.io)
- [Testing Best Practices](https://testingjavascript.com)
- [Visual Regression Testing Guide](https://playwright.dev/docs/test-snapshots)

---

## Support

For testing questions or issues:

1. Check this documentation
2. Review existing tests for examples
3. Check CI/CD logs for error details
4. Ask the team in #testing channel

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
**Maintained By**: Platform Engineering Team

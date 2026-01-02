# E2E Testing Quick Reference

## Running Tests

```bash
# All E2E tests
npm run test:e2e

# Interactive UI mode
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed

# Specific test file
npx playwright test claim-wizard

# Specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug
```

## Test Structure

- `auth.setup.ts` - Authentication setup (runs before all tests)
- `claim-intake/` - Claim submission wizard tests
- `nrpg-signup/` - Contractor application tests
- `contact/` - Contact form tests
- `homepage/` - Homepage navigation tests
- `mobile/` - Responsive design tests
- `visual/` - Visual regression tests
- `fixtures/` - Test data
- `helpers/` - Test utilities

## Test Helpers

```typescript
import { PageHelper } from './helpers/page-helpers';

const helper = new PageHelper(page);

// Navigation
await helper.nav.goToHomepage();

// Forms
await helper.form.fillInput('Email', 'test@example.com');
await helper.form.submitForm();

// Assertions
await helper.assert.expectToBeOnPage('/dashboard');

// Waiting
await helper.wait.waitForNavigation();

// Mobile
await helper.mobile.tap('.button');
```

## Test Data Fixtures

```typescript
import { testUsers, testClaims } from './fixtures/test-data';

await helper.form.fillContactForm(testContactForms.generalInquiry);
```

## Screenshots

```bash
# Update screenshots
npx playwright test visual --update-snapshots

# Update specific test
npx playwright test visual-regression --update-snapshots
```

## Debugging

```bash
# Debug mode
npx playwright test --debug

# Headed browser
npx playwright test --headed

# Trace viewer (after test)
npx playwright show-trace trace.zip
```

## CI/CD

Tests run automatically on:
- Every push to main/develop
- Every pull request
- Daily at midnight (full suite)

View results in GitHub Actions tab.

## Documentation

Full documentation: `/docs/TESTING_INFRASTRUCTURE.md`

# Contractor CRM Testing Scripts

This directory contains testing scripts for the Contractor CRM portal.

## Test Scripts

### 1. capture-contractor-login.js
Captures screenshots of the contractor login page using Puppeteer.

**Usage:**
```bash
node capture-contractor-login.js
```

### 2. test-contractor-dashboard.js
Tests the login flow and captures dashboard screenshots.

**Usage:**
```bash
node test-contractor-dashboard.js
```

### 3. test-mobile-dashboard.js
Tests the mobile responsive view of the dashboard.

**Usage:**
```bash
node test-mobile-dashboard.js
```

## Test Credentials

- **Username:** `demo`
- **Password:** `Demo123!`

## Generated Files

The test scripts generate the following files (not tracked in git):
- contractor-login-screenshot.png
- contractor-dashboard.png
- contractor-mobile-dashboard.png
- contractor-mobile-login.png
- contractor-login-filled.png

## Prerequisites

```bash
npm install puppeteer --save-dev
```

## Running All Tests

```bash
# Run all contractor tests
npm run test:contractor
```
# Testing & Quality Assurance Guide

This document outlines the comprehensive testing strategy for the Disaster Recovery - NRP platform.

## Test Structure

```
src/__tests__/
├── integration/        # End-to-end integration tests
│   └── api.test.ts
├── unit/               # Unit tests for services
│   └── resilience.test.ts
└── fixtures/           # Test data and factories
    └── test-data.ts
```

## Running Tests

### Unit Tests
```bash
npm test -- src/__tests__/unit
```

### Integration Tests
```bash
# Requires database connection
npm test -- src/__tests__/integration
```

### All Tests with Coverage
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm test -- --watch
```

## Test Coverage Requirements

- **Branches**: 70% minimum
- **Functions**: 75% minimum
- **Lines**: 80% minimum
- **Statements**: 80% minimum

Current coverage targets:
- Core services: 90%+
- API routes: 85%+
- Utilities: 75%+

## Load Testing

Simulate concurrent load on the application:

```bash
# Default: 1000 total requests, 10 concurrent
npm run load-test

# Custom configuration
TEST_URL=http://localhost:3000 \
CONCURRENT=20 \
TOTAL_REQUESTS=5000 \
npm run load-test
```

### Metrics Collected
- Response times (min, max, avg, p50, p95, p99)
- Success/failure rates
- Status code distribution
- Throughput (req/s)

### Performance Baselines
- Health check: < 10ms (p99)
- API endpoints: < 100ms (p99)
- Database queries: < 50ms (p99)
- WebSocket operations: < 30ms (p99)

## Security Testing

### SQL Injection Tests
```bash
# Test parameterized queries
npm test -- security/sql-injection
```

### XSS Prevention
```bash
# Test HTML escaping
npm test -- security/xss
```

### CSRF Protection
```bash
# Test CSRF token validation
npm test -- security/csrf
```

### Rate Limiting
```bash
# Test rate limit enforcement
npm test -- security/rate-limiting
```

### Authentication/Authorization
```bash
# Test access control
npm test -- security/auth
```

## API Endpoint Testing

### Health Checks
- **GET /api/health** - Full health check
- **GET /api/health/ready** - Readiness probe (K8s)
- **GET /api/health/live** - Liveness probe (K8s)

### Message Operations
- **GET /api/chat/messages** - List messages
- **POST /api/chat/messages** - Create message
- **PUT /api/chat/messages/[id]** - Update message
- **DELETE /api/chat/messages/[id]** - Delete message

### User Features
- **GET /api/presence** - Get user presence
- **PUT /api/presence** - Update presence
- **GET /api/rooms/[id]/presence** - Get room members
- **GET /api/rooms/[id]/typing** - Get typing users
- **POST /api/rooms/[id]/typing** - Update typing status
- **POST /api/chat/messages/[id]/read** - Mark as read
- **GET /api/chat/messages/[id]/receipts** - Get read receipts

## Performance Profiling

### Node.js Profiling
```bash
npm run profile
```

### Memory Usage
```bash
npm run profile:memory
```

### CPU Usage
```bash
npm run profile:cpu
```

### Heap Snapshots
```bash
npm run profile:heap
```

## Database Testing

### Migrations
```bash
# Test migration up
npx prisma migrate dev

# Test migration down
npx prisma migrate resolve --rolled-back
```

### Data Integrity
```bash
# Verify referential integrity
npm test -- db/integrity
```

### Performance
```bash
# Test query performance
npm test -- db/performance
```

## E2E Testing Strategy

### Critical User Flows
1. **User Authentication**
   - Signup
   - Login
   - Password reset
   - Session management

2. **Messaging**
   - Create message
   - Edit message
   - Delete message
   - Add reaction
   - Create thread
   - Read receipts

3. **Presence & Typing**
   - Update presence status
   - Show typing indicator
   - Broadcast to room

4. **Bookings & Claims**
   - Create booking
   - Update booking status
   - Create claim
   - Claim resolution

## Monitoring & Observability Testing

### Metrics Validation
```bash
npm test -- monitoring/metrics
```

### Logging Validation
```bash
npm test -- monitoring/logging
```

### Health Check Validation
```bash
npm test -- monitoring/health
```

## Resilience Testing

### Circuit Breaker
```bash
npm test -- resilience/circuit-breaker
```

### Retry Logic
```bash
npm test -- resilience/retry
```

### Graceful Degradation
```bash
npm test -- resilience/degradation
```

### Self-Healing
```bash
npm test -- resilience/healing
```

## Continuous Integration

Tests automatically run on:
- **Push to any branch**: Lint + type check
- **Pull requests**: Full test suite + coverage
- **Merge to develop**: Deploy to staging
- **Merge to main**: Deploy to production

### CI Pipeline Steps
1. Install dependencies
2. Lint and type check
3. Run unit tests
4. Run integration tests
5. Generate coverage report
6. Build Docker image
7. Run security scanning
8. Deploy to environment

## Test Best Practices

### Unit Tests
- Isolated, no external dependencies
- Fast execution (< 1s per test)
- Clear, descriptive names
- One assertion per test when possible
- Mock external dependencies

### Integration Tests
- Use test database with cleanup
- Test realistic user flows
- Test error scenarios
- Verify data persistence
- Cleanup after each test

### Load Tests
- Run against non-production environment
- Monitor memory/CPU
- Test with realistic user patterns
- Identify performance bottlenecks
- Record baseline metrics

## Debugging Failed Tests

### Verbose Output
```bash
npm test -- --verbose
```

### Specific Test
```bash
npm test -- --testNamePattern="pattern"
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Performance Benchmarks

### API Response Times
| Endpoint | P50 | P95 | P99 |
|----------|-----|-----|-----|
| /api/health | 2ms | 5ms | 10ms |
| /api/presence | 10ms | 30ms | 50ms |
| /api/chat/messages | 20ms | 75ms | 150ms |
| /api/rooms/[id]/read | 15ms | 50ms | 100ms |

### Database Performance
| Operation | P50 | P95 | P99 |
|-----------|-----|-----|-----|
| Select message | 5ms | 15ms | 30ms |
| Insert message | 8ms | 25ms | 50ms |
| Update message | 10ms | 30ms | 60ms |
| Complex join | 30ms | 100ms | 200ms |

### Memory Usage
- Average: 150-200 MB
- Peak (under load): 400-500 MB
- Leak threshold: > 600 MB

## Reporting

### Coverage Reports
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

### Load Test Reports
Reports saved to `reports/load-test-[timestamp].json`

### Performance Profiles
Profiles saved to `profiles/[type]-[timestamp].txt`

## Maintenance

### Regular Test Updates
- Review coverage monthly
- Update baselines quarterly
- Refactor tests bi-annually
- Update dependencies regularly

### Known Issues
- WebSocket tests require manual setup
- Some integration tests require Redis
- Performance tests platform-dependent

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/)
- [Prisma Testing Guide](https://www.prisma.io/docs/guides/testing)
- [Load Testing Best Practices](https://httpwg.org/http-semantics/)

# Testing Strategies

**Skill ID**: testing-strategies
**Version**: 1.0.0

## Test Coverage Requirements
- Minimum: 80% coverage
- Critical paths (auth, payments): 100%
- Current status: 151/151 passing

## Unit Tests

```typescript
describe('BookingService', () => {
  it('should create booking successfully', async () => {
    const result = await bookingService.createBooking(input)
    expect(result.status).toBe('PENDING')
  })
})
```

## Integration Tests

```typescript
describe('Booking Flow', () => {
  it('should complete end-to-end', async () => {
    const user = await createTestUser()
    const booking = await createBooking({ userId: user.id })
    expect(emailService.send).toHaveBeenCalled()
  })
})
```

## E2E Tests (Playwright)

```typescript
test('complete booking flow', async ({ page }) => {
  await page.goto('/services/water-damage')
  await page.fill('[name="address"]', '123 Test St')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

Load when writing or running tests.

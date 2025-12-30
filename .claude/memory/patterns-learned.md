# Patterns Learned

**Purpose**: Record discovered patterns, anti-patterns, and best practices specific to this project.

---

## TypeScript Patterns

### Pattern: Type-Safe API Responses
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

function wrapResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data }
}
```

**Why**: Consistent API responses, type-safe error handling

---

### Pattern: Zod Schema + TypeScript Type
```typescript
const BookingCreateSchema = z.object({
  userId: z.string().uuid(),
  serviceType: z.enum(['WATER_DAMAGE', 'FIRE_DAMAGE']),
  address: z.string().min(10)
})

type BookingCreateInput = z.infer<typeof BookingCreateSchema>
```

**Why**: Single source of truth for validation and types

---

## Next.js Patterns

### Pattern: Server Component Data Fetching
```typescript
export default async function Page() {
  // Fetch in parallel
  const [user, bookings] = await Promise.all([
    getUser(),
    getBookings()
  ])

  return <Dashboard user={user} bookings={bookings} />
}
```

**Why**: Better performance than sequential fetching

---

### Pattern: Client Component Islands
```typescript
// Server Component (page.tsx)
export default async function Page() {
  const data = await getData() // Server-side fetch

  return (
    <div>
      <StaticContent data={data} />
      <InteractiveForm /> {/* Client Component */}
    </div>
  )
}
```

**Why**: Minimize client-side JavaScript, better performance

---

## Database Patterns

### Pattern: Prisma Transaction for Multi-Table Operations
```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData })
  const profile = await tx.profile.create({ data: { userId: user.id } })
  return { user, profile }
})
```

**Why**: Atomicity, rollback on failure

---

### Pattern: Select Only Needed Fields
```typescript
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
})
```

**Why**: Reduce database load, faster queries

---

## Agent Patterns

### Pattern: Subagent Delegation
```typescript
const dataIntakeAgent = {
  name: 'data-intake-agent',
  subagents: [
    { name: 'address-validator', prompt: 'Validate Australian addresses' },
    { name: 'photo-validator', prompt: 'Validate photo requirements' },
    { name: 'moisture-validator', prompt: 'Validate moisture readings' }
  ]
}
```

**Why**: Separation of concerns, focused responsibilities

---

### Pattern: Agent Workflow Orchestration
```typescript
async function runInspectionWorkflow(data) {
  const validated = await dataIntakeAgent.execute(data)
  const report = await reportGenerationAgent.execute(validated)
  const qa = await qualityAssuranceAgent.execute(report)

  if (qa.status === 'APPROVED') {
    await operationsAgent.execute(report)
  }
}
```

**Why**: Sequential processing with validation gates

---

## Error Handling Patterns

### Pattern: Structured Error Logging
```typescript
try {
  const result = await operation()
} catch (error) {
  logger.error('Operation failed', {
    error: error.message,
    stack: error.stack,
    context: { userId, bookingId }
  })
  throw new InternalServerError('Operation failed')
}
```

**Why**: Easier debugging, audit trail

---

### Pattern: Custom Error Classes
```typescript
class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
```

**Why**: Type-safe error handling, clear intent

---

## Testing Patterns

### Pattern: Test Data Factories
```typescript
function createTestUser(overrides?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    ...overrides
  }
}
```

**Why**: Consistent test data, easy customization

---

### Pattern: Parallel Test Execution
```typescript
// jest.config.js
module.exports = {
  maxWorkers: 4 // Parallel test execution
}
```

**Why**: Faster test runs (4x speedup)

---

## Australian Localization Patterns

### Pattern: State Enum
```typescript
enum AustralianState {
  NSW = 'NSW',
  VIC = 'VIC',
  QLD = 'QLD',
  // ...
}
```

**Why**: Type-safe state references

---

### Pattern: Postcode Validation
```typescript
const POSTCODE_REGEX = /^[0-9]{4}$/
const isValidPostcode = (postcode: string) => {
  const num = parseInt(postcode)
  return POSTCODE_REGEX.test(postcode) && num >= 200 && num <= 9999
}
```

**Why**: Australian postcodes are 4 digits (0200-9999 range)

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern: Non-Null Assertion
```typescript
const user = await getUser(userId)
const email = user!.email // DON'T DO THIS
```

**Why**: Runtime errors if user is null

**Instead**:
```typescript
const user = await getUser(userId)
if (!user) throw new NotFoundError('User not found')
const email = user.email
```

---

### ❌ Anti-Pattern: Mutating Objects
```typescript
function addBooking(user: User, booking: Booking) {
  user.bookings.push(booking) // DON'T DO THIS
  return user
}
```

**Why**: Side effects, harder to debug

**Instead**:
```typescript
function addBooking(user: User, booking: Booking): User {
  return {
    ...user,
    bookings: [...user.bookings, booking]
  }
}
```

---

### ❌ Anti-Pattern: Forgetting tenantId Filter
```typescript
const bookings = await prisma.booking.findMany() // DON'T DO THIS
```

**Why**: Security risk, cross-tenant data leak

**Instead**:
```typescript
const bookings = await prisma.booking.findMany({
  where: { tenantId }
})
```

---

### ❌ Anti-Pattern: Using 'any' Type
```typescript
function processData(data: any) { // DON'T DO THIS
  // ...
}
```

**Why**: Loses type safety benefits

**Instead**:
```typescript
function processData<T>(data: T) {
  // ...
}
```

---

**Last Updated**: 2025-12-30
**Agents**: Read this file to learn project-specific patterns and avoid anti-patterns.

# TypeScript Coding Standards

**Skill ID**: typescript-coding-standards
**Version**: 1.0.0
**Last Updated**: 2025-12-30

## Purpose
This skill provides comprehensive TypeScript coding standards for the Disaster Recovery - NRPG Platform. Use this skill when generating, reviewing, or refactoring TypeScript code.

---

## Strict Mode Configuration

Always use strict TypeScript configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Type Annotations

### Always Use Explicit Types

❌ **Bad**:
```typescript
function createUser(email, name, role) {
  return { email, name, role }
}
```

✅ **Good**:
```typescript
interface UserCreateInput {
  email: string
  name: string
  role: UserRole
}

function createUser(input: UserCreateInput): User {
  return {
    id: generateId(),
    ...input,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
```

### Function Return Types

Always specify return types for functions:

❌ **Bad**:
```typescript
function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } })
}
```

✅ **Good**:
```typescript
async function getUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } })
}
```

### Generic Types

Use generics for reusable functions:

```typescript
function wrapResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message ?? 'Success',
    timestamp: new Date().toISOString()
  }
}
```

---

## Interfaces vs Type Aliases

### Prefer Interfaces for Object Shapes

✅ **Good**:
```typescript
interface User {
  id: string
  email: string
  name: string
  role: UserRole
  tenantId: string
  createdAt: Date
  updatedAt: Date
}
```

### Use Type Aliases for Unions, Intersections, and Utility Types

✅ **Good**:
```typescript
type UserRole = 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN'

type UserWithTenant = User & { tenant: Tenant }

type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

type PartialUser = Partial<User>
```

---

## Enums

### Use Enums for Fixed Sets of Values

```typescript
enum AustralianState {
  NSW = 'NSW',
  VIC = 'VIC',
  QLD = 'QLD',
  WA = 'WA',
  SA = 'SA',
  TAS = 'TAS',
  ACT = 'ACT',
  NT = 'NT'
}

enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
```

### String Enums vs Const Objects

For values that might change or come from database, use const objects:

```typescript
const INSURANCE_PROVIDERS = {
  NRMA: 'NRMA Insurance',
  SUNCORP: 'Suncorp',
  ALLIANZ: 'Allianz',
  QBE: 'QBE Insurance',
  IAG: 'IAG',
  CGU: 'CGU Insurance',
  MEDIBANK: 'Medibank Private'
} as const

type InsuranceProvider = typeof INSURANCE_PROVIDERS[keyof typeof INSURANCE_PROVIDERS]
```

---

## Async/Await

### Always Use Async/Await Over Raw Promises

❌ **Bad**:
```typescript
function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } })
    .then(user => {
      return getProfile(user.id).then(profile => {
        return { user, profile }
      })
    })
    .catch(error => {
      logger.error('Failed', { error })
      throw error
    })
}
```

✅ **Good**:
```typescript
async function getUserWithProfile(id: string): Promise<{ user: User; profile: Profile }> {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new Error('User not found')
    }

    const profile = await prisma.profile.findUnique({ where: { userId: user.id } })
    if (!profile) {
      throw new Error('Profile not found')
    }

    return { user, profile }
  } catch (error) {
    logger.error('Failed to fetch user with profile', { error, userId: id })
    throw error
  }
}
```

### Use Promise.all() for Parallel Operations

```typescript
async function getUserDashboardData(userId: string): Promise<DashboardData> {
  const [user, bookings, notifications, stats] = await Promise.all([
    getUser(userId),
    getBookings(userId),
    getNotifications(userId),
    getUserStats(userId)
  ])

  return { user, bookings, notifications, stats }
}
```

---

## Error Handling

### Always Use Try/Catch with Async Functions

```typescript
async function createBooking(input: BookingCreateInput): Promise<Booking> {
  try {
    logger.info('Creating booking', { input })

    // Validate
    const validatedInput = BookingCreateSchema.parse(input)

    // Create
    const booking = await prisma.booking.create({
      data: validatedInput
    })

    logger.info('Booking created successfully', { bookingId: booking.id })
    return booking

  } catch (error) {
    logger.error('Failed to create booking', { error, input })

    if (error instanceof ZodError) {
      throw new ValidationError('Invalid booking data', error.errors)
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictError('Booking already exists')
      }
    }

    throw new InternalServerError('Failed to create booking')
  }
}
```

### Custom Error Classes

```typescript
export class ValidationError extends Error {
  constructor(message: string, public errors: any[]) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}
```

---

## Null Safety

### Use Optional Chaining and Nullish Coalescing

```typescript
// Optional chaining
const userName = user?.profile?.name ?? 'Unknown'

// Nullish coalescing
const maxRetries = config.maxRetries ?? 3

// Array access
const firstBooking = bookings?.[0]

// Method calls
const email = user?.getEmail?.()
```

### Never Use Non-Null Assertion (!) Unless Absolutely Sure

❌ **Bad**:
```typescript
const user = await getUser(userId)
const email = user!.email // Dangerous!
```

✅ **Good**:
```typescript
const user = await getUser(userId)
if (!user) {
  throw new NotFoundError('User not found')
}
const email = user.email
```

---

## Type Guards

### Create Type Guards for Runtime Type Checking

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    'role' in value
  )
}

function isBooking(value: unknown): value is Booking {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'userId' in value &&
    'status' in value
  )
}
```

### Use Type Guards in Conditional Logic

```typescript
async function processEntity(entity: User | Booking | Contractor) {
  if (isUser(entity)) {
    // TypeScript knows entity is User here
    await sendEmailToUser(entity.email)
  } else if (isBooking(entity)) {
    // TypeScript knows entity is Booking here
    await updateBookingStatus(entity.id, 'CONFIRMED')
  } else {
    // TypeScript knows entity is Contractor here
    await notifyContractor(entity.id)
  }
}
```

---

## Utility Types

### Leverage Built-in Utility Types

```typescript
// Partial - Make all properties optional
type PartialUser = Partial<User>

// Required - Make all properties required
type RequiredUser = Required<User>

// Readonly - Make all properties readonly
type ReadonlyUser = Readonly<User>

// Pick - Select specific properties
type UserBasic = Pick<User, 'id' | 'email' | 'name'>

// Omit - Exclude specific properties
type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

// Record - Create an object type with specific keys
type UserRolePermissions = Record<UserRole, string[]>

// Exclude - Exclude types from union
type AdminRole = Exclude<UserRole, 'CLIENT' | 'CONTRACTOR'>

// Extract - Extract types from union
type AdminRole = Extract<UserRole, 'ADMIN' | 'SUPER_ADMIN'>

// NonNullable - Exclude null and undefined
type NonNullableString = NonNullable<string | null | undefined>

// ReturnType - Extract return type of function
type BookingResult = ReturnType<typeof createBooking>

// Parameters - Extract parameters of function
type BookingParams = Parameters<typeof createBooking>
```

---

## File Naming Conventions

### Components
```
UserDashboard.tsx
BookingForm.tsx
ContractorCard.tsx
```

### Utilities
```
date-formatter.ts
string-helpers.ts
validation-helpers.ts
```

### Services
```
booking.service.ts
user.service.ts
payment.service.ts
```

### Types
```
user.types.ts
booking.types.ts
common.types.ts
```

### Tests
```
booking.service.test.ts
user.service.test.ts
date-formatter.spec.ts
```

### Agents
```
data-intake-agent.ts
report-generation-agent.ts
code-generation-agent.ts
```

---

## Module Organization

### Barrel Exports (index.ts)

```typescript
// src/services/index.ts
export * from './booking.service'
export * from './user.service'
export * from './payment.service'

// src/types/index.ts
export * from './user.types'
export * from './booking.types'
export * from './common.types'
```

### Named Exports (Prefer Over Default Exports)

❌ **Bad**:
```typescript
export default class BookingService {
  // ...
}
```

✅ **Good**:
```typescript
export class BookingService {
  // ...
}

// Usage
import { BookingService } from '@/services'
```

---

## Constants

### Use SCREAMING_SNAKE_CASE for Constants

```typescript
const MAX_RETRIES = 3
const DEFAULT_TIMEOUT = 5000
const API_BASE_URL = 'https://api.example.com'

const BOOKING_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const
```

---

## Comments and Documentation

### Use JSDoc for Public APIs

```typescript
/**
 * Creates a new booking for a user
 *
 * @param input - The booking creation input
 * @returns The created booking
 * @throws {ValidationError} If input is invalid
 * @throws {ConflictError} If booking already exists
 * @throws {InternalServerError} If creation fails
 *
 * @example
 * ```typescript
 * const booking = await createBooking({
 *   userId: 'user_123',
 *   serviceType: 'WATER_DAMAGE',
 *   address: '123 Test St, Sydney NSW 2000',
 *   scheduledAt: new Date('2025-01-15T10:00:00Z')
 * })
 * ```
 */
export async function createBooking(input: BookingCreateInput): Promise<Booking> {
  // Implementation
}
```

### Avoid Obvious Comments

❌ **Bad**:
```typescript
// Increment counter
counter++

// Loop through users
for (const user of users) {
  // ...
}
```

✅ **Good**:
```typescript
// Retry exponentially with backoff to avoid overwhelming the API
const delay = Math.pow(2, retryCount) * 1000

// Calculate pro-rated amount based on days remaining in billing cycle
const proratedAmount = (totalAmount / 30) * daysRemaining
```

---

## Immutability

### Use Const by Default

```typescript
// Good
const user = await getUser(userId)
const bookings = await getBookings(userId)
const totalAmount = calculateTotal(bookings)

// Only use let when value changes
let retryCount = 0
let isSuccess = false

while (!isSuccess && retryCount < MAX_RETRIES) {
  try {
    await performOperation()
    isSuccess = true
  } catch (error) {
    retryCount++
  }
}
```

### Avoid Mutating Objects/Arrays

❌ **Bad**:
```typescript
function addBooking(user: User, booking: Booking): User {
  user.bookings.push(booking)
  return user
}
```

✅ **Good**:
```typescript
function addBooking(user: User, booking: Booking): User {
  return {
    ...user,
    bookings: [...user.bookings, booking]
  }
}
```

---

## Destructuring

### Use Destructuring for Objects and Arrays

```typescript
// Object destructuring
const { id, email, name } = user
const { address, city, state, postcode } = property

// Array destructuring
const [first, second, ...rest] = items
const [error, result] = await Promise.allSettled([operation()])

// Function parameters
function createBooking({ userId, serviceType, address }: BookingCreateInput): Promise<Booking> {
  // ...
}

// Nested destructuring
const {
  user: { id: userId, email },
  booking: { id: bookingId, status }
} = data
```

---

## Template Literals

### Use Template Literals for String Interpolation

❌ **Bad**:
```typescript
const message = 'Hello ' + user.name + ', your booking ' + booking.id + ' is confirmed.'
```

✅ **Good**:
```typescript
const message = `Hello ${user.name}, your booking ${booking.id} is confirmed.`
```

### Use Template Literals for Multi-line Strings

```typescript
const emailBody = `
Dear ${user.name},

Your booking ${booking.id} has been confirmed for ${formatDate(booking.scheduledAt)}.

Service Type: ${booking.serviceType}
Address: ${booking.address}

Thank you for choosing our service.

Best regards,
Disaster Recovery Team
`
```

---

## Arrow Functions

### Use Arrow Functions for Callbacks

```typescript
// Array methods
const userIds = users.map(user => user.id)
const activeUsers = users.filter(user => user.isActive)
const totalAmount = bookings.reduce((sum, booking) => sum + booking.amount, 0)

// Event handlers
button.addEventListener('click', () => {
  console.log('Button clicked')
})

// Promises
fetchData()
  .then(data => processData(data))
  .catch(error => handleError(error))
```

### Use Regular Functions for Methods

```typescript
class BookingService {
  // Use regular function for methods
  async createBooking(input: BookingCreateInput): Promise<Booking> {
    // Can access 'this'
    return this.repository.create(input)
  }
}
```

---

## Best Practices Summary

1. **Always use explicit types** for function parameters and return values
2. **Prefer interfaces** for object shapes, type aliases for unions/intersections
3. **Use async/await** over raw promises
4. **Always use try/catch** with async functions
5. **Use optional chaining** (?.) and nullish coalescing (??)
6. **Avoid non-null assertion** (!) unless absolutely necessary
7. **Use type guards** for runtime type checking
8. **Leverage utility types** (Partial, Pick, Omit, Record, etc.)
9. **Use const by default**, let only when value changes
10. **Avoid mutating objects/arrays**, use spread operators instead
11. **Use destructuring** for cleaner code
12. **Use template literals** for string interpolation
13. **Use arrow functions** for callbacks, regular functions for methods
14. **Document public APIs** with JSDoc
15. **Follow naming conventions**: PascalCase for components, kebab-case for utilities

---

**This skill should be loaded whenever generating, reviewing, or refactoring TypeScript code.**

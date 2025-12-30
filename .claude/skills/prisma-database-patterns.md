# Prisma Database Patterns

**Skill ID**: prisma-database-patterns
**Version**: 1.0.0

## Multi-Tenant Queries

```typescript
// ALWAYS filter by tenantId
const bookings = await prisma.booking.findMany({
  where: { tenantId }
})
```

## Transactions

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData })
  const profile = await tx.profile.create({ data: { userId: user.id } })
  return { user, profile }
})
```

## Performance

```typescript
// Use select to limit fields
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
})

// Use include for relations (careful of N+1)
const usersWithTenants = await prisma.user.findMany({
  include: { tenant: true }
})
```

Load when working with Prisma database operations.

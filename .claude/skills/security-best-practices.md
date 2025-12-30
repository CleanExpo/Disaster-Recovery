# Security Best Practices

**Skill ID**: security-best-practices
**Version**: 1.0.0

## Input Validation

```typescript
// Use Zod for validation
const UserCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['CLIENT', 'CONTRACTOR', 'ADMIN'])
})

const validatedInput = UserCreateSchema.parse(input)
```

## Authentication

```typescript
// Always verify session/token
const user = await getUser()
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## Environment Variables

```typescript
// NEVER hardcode secrets
const apiKey = process.env.STRIPE_SECRET_KEY
if (!apiKey) {
  throw new Error('STRIPE_SECRET_KEY not configured')
}
```

## SQL Injection Prevention

```typescript
// Use Prisma (parameterized queries)
const user = await prisma.user.findUnique({ where: { email } })
// NEVER: prisma.$queryRaw`SELECT * FROM users WHERE email = '${email}'`
```

Load when implementing security features or reviewing code for vulnerabilities.

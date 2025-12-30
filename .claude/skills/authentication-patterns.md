# Authentication Patterns

**Skill ID**: authentication-patterns
**Version**: 1.0.0

## NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await verifyCredentials(credentials)
        return user
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

## Protected API Routes

```typescript
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Protected logic
}
```

Load when implementing authentication.

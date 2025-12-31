import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userType?: 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN'
      role?: string
      avatar?: string | null
    } & DefaultSession['user']
  }

  interface User {
    userType?: 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN'
    avatar?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    userType?: 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN'
    role?: string
    avatar?: string | null
  }
}


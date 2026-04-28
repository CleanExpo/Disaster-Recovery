import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    tenantId?: string | null;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      tenantId?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    tenantId?: string | null;
  }
}

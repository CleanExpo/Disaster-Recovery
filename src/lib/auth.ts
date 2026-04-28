import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { captureException } from '@/lib/observability/vercel';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user;
        try {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (e) {
          captureException(e, {
            tags: { route: 'src/lib/auth.ts', model: 'user', op: 'findUnique' },
          });
          throw e;
        }

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Bridge: Prisma User column is `userType` (DR-807 schema rewrite to
        // match live `users` table) but the JWT/session contract still
        // exposes `role` for downstream RBAC + RBAC components. Mapped here
        // so call sites reading `session.user.role` keep working without
        // a sweep. See src/types/next-auth.d.ts for the augmented shape.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.userType,
          tenantId: user.tenantId,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.tenantId = user.tenantId;
      }

      return token;
    },
  },
};

import { Session } from 'next-auth';
import { createMockUser, MockUser } from '../factories/userFactory';

export interface MockSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    role: string;
  };
  expires: string;
}

export const createMockSession = (user: MockUser = createMockUser()): MockSession => ({
  user: {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

export const mockUseSession = (session: MockSession | null = null) => ({
  data: session,
  status: session ? 'authenticated' : 'unauthenticated',
  update: jest.fn(),
});

export const mockGetServerSession = jest.fn();

export const setupAuthMocks = (user: MockUser | null = null) => {
  const session = user ? createMockSession(user) : null;

  mockGetServerSession.mockResolvedValue(session);

  jest.mock('next-auth', () => ({
    getServerSession: mockGetServerSession,
    default: jest.fn(),
  }));

  jest.mock('next-auth/react', () => ({
    useSession: () => mockUseSession(session),
    signIn: jest.fn().mockResolvedValue({ ok: true }),
    signOut: jest.fn().mockResolvedValue(undefined),
    getSession: jest.fn().mockResolvedValue(session),
    getCsrfToken: jest.fn().mockResolvedValue('mock-csrf-token'),
    getProviders: jest.fn().mockResolvedValue({
      credentials: {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
      },
      google: {
        id: 'google',
        name: 'Google',
        type: 'oauth',
      },
    }),
  }));

  return { session, mockGetServerSession };
};

export const mockAuthOptions = {
  providers: [],
  callbacks: {
    session: jest.fn(({ session, user }) => ({ ...session, user })),
    jwt: jest.fn(({ token, user }) => ({ ...token, ...user })),
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

// Helper to clear auth mocks
export const clearAuthMocks = () => {
  mockGetServerSession.mockClear();
  jest.clearAllMocks();
};

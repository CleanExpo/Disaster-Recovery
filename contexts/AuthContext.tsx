'use client';

import React, { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface User {
  id: string
  email: string
  name: string
  userType: 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN'
  avatar?: string | null
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (
    email: string,
    password: string,
    name: string,
    userType: 'CLIENT' | 'CONTRACTOR'
  ) => Promise<User>
}

interface RegisterData {
  name: string
  email: string
  password: string
  userType: 'CLIENT' | 'CONTRACTOR'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()

  const user = useMemo<User | null>(() => {
    if (!session?.user) return null

    const sessionUser = session.user as unknown as {
      id?: string
      email?: string | null
      name?: string | null
      userType?: User['userType']
      avatar?: string | null
    }

    if (!sessionUser.id || !sessionUser.email || !sessionUser.userType) return null

    return {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name || '',
      userType: sessionUser.userType,
      avatar: sessionUser.avatar ?? null,
    }
  }, [session])

  const loading = status === 'loading'

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (!result || result.error) {
      throw new Error('Invalid email or password')
    }
  }, [])

  const logout = useCallback((): void => {
    void signOut({ redirect: false })
  }, [])

  const register = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      userType: 'CLIENT' | 'CONTRACTOR'
    ): Promise<User> => {
      const userData: RegisterData = { email, password, name, userType }
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || data?.error || 'Registration failed')
      }

      if (!data?.success || !data?.data?.user) {
        throw new Error('Invalid response from server')
      }

      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (!signInResult || signInResult.error) {
        throw new Error('Account created but sign-in failed')
      }

      const apiUser = data.data.user as User
      return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.name,
        userType: apiUser.userType,
        avatar: apiUser.avatar ?? null,
      }
    },
    []
  )

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      register,
    }
  }, [user, isAuthenticated, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
    if (!token) {
      setLoading(false)
      return
    }

    // Verify token and fetch user data
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.user) {
          const apiUser = data.data.user as User
          setUser({
            id: apiUser.id,
            email: apiUser.email,
            name: apiUser.name,
            userType: apiUser.userType,
            avatar: apiUser.avatar ?? null,
          })
          // Keep both keys for backward compatibility across the codebase.
          localStorage.setItem('token', token)
          localStorage.setItem('auth_token', token)
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('auth_token')
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('auth_token')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.message || data?.error || 'Login failed')
    }

    if (!data?.success || !data?.data?.user || !data?.data?.token) {
      throw new Error('Invalid response from server')
    }

    const apiUser = data.data.user as User
    const token = data.data.token as string

    setUser({
      id: apiUser.id,
      email: apiUser.email,
      name: apiUser.name,
      userType: apiUser.userType,
      avatar: apiUser.avatar ?? null,
    })

    localStorage.setItem('token', token)
    localStorage.setItem('auth_token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('auth_token')
  }

  const register = async (
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

    if (!data?.success || !data?.data?.user || !data?.data?.token) {
      throw new Error('Invalid response from server')
    }

    const apiUser = data.data.user as User
    const token = data.data.token as string

    setUser({
      id: apiUser.id,
      email: apiUser.email,
      name: apiUser.name,
      userType: apiUser.userType,
      avatar: apiUser.avatar ?? null,
    })

    localStorage.setItem('token', token)
    localStorage.setItem('auth_token', token)

    return apiUser
  }

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

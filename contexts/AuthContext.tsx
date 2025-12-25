'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'contractor' | 'admin'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: 'customer' | 'contractor'
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Verify token and fetch user data
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            setUser({
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.userType?.toLowerCase() || 'customer'
            });
            setIsAuthenticated(true);
          } else {
            // Invalid token, clear it
            localStorage.removeItem('auth_token');
          }
        })
        .catch(() => {
          // Error verifying token, clear it
          localStorage.removeItem('auth_token');
        });
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.data) {
        // Set user from API response
        const userData = data.data.user;
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.userType?.toLowerCase() || 'customer'
        });
        setIsAuthenticated(true);

        // Store token
        if (data.data.token) {
          localStorage.setItem('auth_token', data.data.token);
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Re-throw error for the login page to handle
      throw error;
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth_token')
  }

  const register = async (userData: RegisterData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you'd make an API call here
    setUser({
      id: '1',
      email: userData.email,
      name: userData.name,
      role: userData.role
    })
    setIsAuthenticated(true)
    localStorage.setItem('auth_token', 'fake-token')
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

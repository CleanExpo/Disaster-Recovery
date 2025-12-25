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
      // In a real app, you'd verify the token and fetch user data
      // For now, we'll simulate a logged-in state
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'customer'
      })
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you'd make an API call here
    setUser({
      id: '1',
      email,
      name: 'John Doe',
      role: 'customer'
    })
    setIsAuthenticated(true)
    localStorage.setItem('auth_token', 'fake-token')
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

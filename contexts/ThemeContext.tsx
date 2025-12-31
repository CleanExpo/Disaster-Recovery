'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

// Theme options for selection
export const THEMES = [
  { value: 'light', label: 'Light', description: 'Light theme' },
  { value: 'dark', label: 'Dark', description: 'Dark theme' }
];

export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
}

interface ThemeContextType {
  theme: Theme
  currentTheme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  getThemeColors: () => ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    // Check user preference on mount
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const getThemeColors = (): ThemeColors => {
    if (theme === 'light') {
      return {
        primary: '#00BFA6',
        secondary: '#2196F3',
        background: '#ffffff',
        text: '#0f172a',
      }
    }

    return {
      primary: '#00BFA6',
      secondary: '#2196F3',
      background: '#0b1220',
      text: '#ffffff',
    }
  }

  const value = {
    theme,
    currentTheme: theme,
    toggleTheme,
    setTheme,
    getThemeColors,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

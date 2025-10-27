'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme definitions
export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  description: string;
}

export const THEMES: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    primaryColor: '#00BFA6',
    secondaryColor: '#7C4DFF',
    accentColor: '#3B82F6',
    backgroundColor: '#0F1115',
    textColor: '#F9FAFB',
    description: 'Clean, contemporary design'
  },
  {
    id: 'classic',
    name: 'Classic',
    primaryColor: '#6B7280',
    secondaryColor: '#374151',
    accentColor: '#9CA3AF',
    backgroundColor: '#111827',
    textColor: '#F9FAFB',
    description: 'Traditional, professional look'
  },
  {
    id: 'warm',
    name: 'Warm',
    primaryColor: '#FF9800',
    secondaryColor: '#F57C00',
    accentColor: '#FFB74D',
    backgroundColor: '#1A1A1A',
    textColor: '#FFF8E1',
    description: 'Cozy, inviting atmosphere'
  },
  {
    id: 'cool',
    name: 'Cool',
    primaryColor: '#00BCD4',
    secondaryColor: '#0097A7',
    accentColor: '#4DD0E1',
    backgroundColor: '#0D1117',
    textColor: '#E0F7FA',
    description: 'Calm, soothing colors'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  getThemeColors: () => {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  applyThemeToElement: (element: HTMLElement) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

export function ThemeProvider({ children, initialTheme = 'modern' }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    THEMES.find(theme => theme.id === initialTheme) || THEMES[0]
  );

  const setTheme = (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      // Save to localStorage
      localStorage.setItem('user-theme', themeId);
      // Apply theme to document
      applyThemeToDocument(theme);
    }
  };

  const getThemeColors = () => ({
    primary: currentTheme.primaryColor,
    secondary: currentTheme.secondaryColor,
    accent: currentTheme.accentColor,
    background: currentTheme.backgroundColor,
    text: currentTheme.textColor
  });

  const applyThemeToElement = (element: HTMLElement) => {
    element.style.setProperty('--theme-primary', currentTheme.primaryColor);
    element.style.setProperty('--theme-secondary', currentTheme.secondaryColor);
    element.style.setProperty('--theme-accent', currentTheme.accentColor);
    element.style.setProperty('--theme-background', currentTheme.backgroundColor);
    element.style.setProperty('--theme-text', currentTheme.textColor);
  };

  const applyThemeToDocument = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--theme-secondary', theme.secondaryColor);
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-background', theme.backgroundColor);
    root.style.setProperty('--theme-text', theme.textColor);
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
      const theme = THEMES.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
        applyThemeToDocument(theme);
      }
    } else {
      applyThemeToDocument(currentTheme);
    }
  }, []);

  // Apply theme to document when currentTheme changes
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      getThemeColors,
      applyThemeToElement
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Utility function to get theme-aware CSS classes
export function getThemeClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return {
    primary: `bg-[${theme.primaryColor}]`,
    secondary: `bg-[${theme.secondaryColor}]`,
    accent: `bg-[${theme.accentColor}]`,
    background: `bg-[${theme.backgroundColor}]`,
    text: `text-[${theme.textColor}]`,
    border: `border-[${theme.primaryColor}]`,
    hover: `hover:bg-[${theme.primaryColor}]`,
    focus: `focus:ring-[${theme.primaryColor}]`,
    shadow: `shadow-[${theme.primaryColor}50]`
  };
}

// Utility function to get theme-aware styles
export function getThemeStyles(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return {
    primary: { backgroundColor: theme.primaryColor },
    secondary: { backgroundColor: theme.secondaryColor },
    accent: { backgroundColor: theme.accentColor },
    background: { backgroundColor: theme.backgroundColor },
    text: { color: theme.textColor },
    border: { borderColor: theme.primaryColor },
    shadow: { boxShadow: `0 4px 6px -1px ${theme.primaryColor}50` }
  };
}

'use client';

import { THEMES, Theme } from './ThemeContext';

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

// Utility function to get theme-aware Tailwind classes
export function getThemeTailwindClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  // Map theme colors to Tailwind classes
  const colorMap: { [key: string]: string } = {
    '#00BFA6': 'bg-teal-500',
    '#7C4DFF': 'bg-purple-500',
    '#3B82F6': 'bg-blue-500',
    '#6B7280': 'bg-gray-500',
    '#374151': 'bg-gray-700',
    '#9CA3AF': 'bg-gray-400',
    '#FF9800': 'bg-orange-500',
    '#F57C00': 'bg-orange-600',
    '#FFB74D': 'bg-orange-300',
    '#00BCD4': 'bg-cyan-500',
    '#0097A7': 'bg-cyan-600',
    '#4DD0E1': 'bg-cyan-300',
    '#0F1115': 'bg-gray-900',
    '#111827': 'bg-gray-800',
    '#1A1A1A': 'bg-gray-900',
    '#0D1117': 'bg-gray-900',
    '#F9FAFB': 'text-gray-50',
    '#FFF8E1': 'text-orange-50',
    '#E0F7FA': 'text-cyan-50'
  };

  return {
    primary: colorMap[theme.primaryColor] || 'bg-teal-500',
    secondary: colorMap[theme.secondaryColor] || 'bg-purple-500',
    accent: colorMap[theme.accentColor] || 'bg-blue-500',
    background: colorMap[theme.backgroundColor] || 'bg-gray-900',
    text: colorMap[theme.textColor] || 'text-gray-50',
    border: `border-[${theme.primaryColor}]`,
    hover: `hover:bg-[${theme.primaryColor}]`,
    focus: `focus:ring-[${theme.primaryColor}]`,
    shadow: `shadow-[${theme.primaryColor}50]`
  };
}

// Utility function to apply theme to a DOM element
export function applyThemeToElement(element: HTMLElement, themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  element.style.setProperty('--theme-primary', theme.primaryColor);
  element.style.setProperty('--theme-secondary', theme.secondaryColor);
  element.style.setProperty('--theme-accent', theme.accentColor);
  element.style.setProperty('--theme-background', theme.backgroundColor);
  element.style.setProperty('--theme-text', theme.textColor);
}

// Utility function to get theme-aware button classes
export function getThemeButtonClasses(themeId: string, variant: 'primary' | 'secondary' | 'outline' = 'primary') {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200';
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} text-white hover:opacity-90`;
    case 'secondary':
      return `${baseClasses} text-white hover:opacity-90`;
    case 'outline':
      return `${baseClasses} border-2 text-white hover:text-white`;
    default:
      return baseClasses;
  }
}

// Utility function to get theme-aware card classes
export function getThemeCardClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return `bg-gray-800 border-gray-700 hover:border-[${theme.primaryColor}] transition-colors duration-200`;
}

// Utility function to get theme-aware input classes
export function getThemeInputClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return `bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[${theme.primaryColor}] focus:ring-[${theme.primaryColor}]`;
}

// Utility function to create CSS custom properties for a theme
export function createThemeCSSVariables(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return `
    :root {
      --theme-primary: ${theme.primaryColor};
      --theme-secondary: ${theme.secondaryColor};
      --theme-accent: ${theme.accentColor};
      --theme-background: ${theme.backgroundColor};
      --theme-text: ${theme.textColor};
    }
  `;
}

// Utility function to get theme-aware gradient classes
export function getThemeGradientClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return {
    primary: `bg-gradient-to-r from-[${theme.primaryColor}] to-[${theme.secondaryColor}]`,
    secondary: `bg-gradient-to-r from-[${theme.secondaryColor}] to-[${theme.accentColor}]`,
    accent: `bg-gradient-to-r from-[${theme.accentColor}] to-[${theme.primaryColor}]`
  };
}

// Utility function to get theme-aware text classes
export function getThemeTextClasses(themeId: string) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  return {
    primary: `text-[${theme.primaryColor}]`,
    secondary: `text-[${theme.secondaryColor}]`,
    accent: `text-[${theme.accentColor}]`,
    background: `text-[${theme.backgroundColor}]`,
    text: `text-[${theme.textColor}]`
  };
}

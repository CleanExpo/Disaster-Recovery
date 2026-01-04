'use client'

import { useLoadScript, Libraries } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from './config'

interface GoogleMapsProviderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Define libraries outside component to prevent re-renders
const libraries: Libraries = GOOGLE_MAPS_LIBRARIES

export function GoogleMapsProvider({ children, fallback }: GoogleMapsProviderProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load Google Maps. Please check your API key.
        </p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}

// Hook to check if maps are loaded
export function useGoogleMapsLoaded() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  return { isLoaded, loadError }
}

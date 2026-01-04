'use client'

import { useMemo, useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker, Polyline, InfoWindow } from '@react-google-maps/api'
import { cn } from '@/lib/utils'
import {
  GoogleMapsProvider,
  DEFAULT_MAP_OPTIONS,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  CONTRACTOR_MARKER_ICON,
  DESTINATION_MARKER_ICON,
  ROUTE_POLYLINE_OPTIONS,
} from '@/lib/google-maps'
import type { ContractorLocation } from '@/lib/supabase/types'

interface MapPreviewProps {
  destinationAddress: string
  destinationCoords?: { lat: number; lng: number }
  contractorLocation?: ContractorLocation
  eta?: number
  distanceKm?: number
  trafficCondition?: 'clear' | 'moderate' | 'heavy'
  routePolyline?: google.maps.LatLngLiteral[]
  showContractorInfo?: boolean
  contractorName?: string
  isLive?: boolean
  className?: string
  onMapLoad?: (map: google.maps.Map) => void
}

function LiveTrackingMapInner({
  destinationAddress,
  destinationCoords,
  contractorLocation,
  eta,
  distanceKm,
  trafficCondition,
  routePolyline,
  showContractorInfo = true,
  contractorName,
  isLive = true,
  className,
  onMapLoad,
}: MapPreviewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [showContractorPopup, setShowContractorPopup] = useState(false)

  // Calculate map center and bounds
  const mapCenter = useMemo(() => {
    if (contractorLocation) {
      return { lat: contractorLocation.latitude, lng: contractorLocation.longitude }
    }
    if (destinationCoords) {
      return destinationCoords
    }
    return DEFAULT_CENTER
  }, [contractorLocation, destinationCoords])

  // Fit bounds when we have both points
  useEffect(() => {
    if (map && contractorLocation && destinationCoords) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend({ lat: contractorLocation.latitude, lng: contractorLocation.longitude })
      bounds.extend(destinationCoords)
      map.fitBounds(bounds, { top: 50, bottom: 100, left: 50, right: 50 })
    }
  }, [map, contractorLocation, destinationCoords])

  const handleMapLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance)
      onMapLoad?.(mapInstance)
    },
    [onMapLoad]
  )

  const containerStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
    }),
    []
  )

  // Traffic condition colour
  const trafficColour = useMemo(() => {
    switch (trafficCondition) {
      case 'heavy':
        return 'text-red-500'
      case 'moderate':
        return 'text-amber-500'
      default:
        return 'text-green-500'
    }
  }, [trafficCondition])

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      {/* Map Container */}
      <div className="aspect-video w-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={DEFAULT_ZOOM}
          options={DEFAULT_MAP_OPTIONS}
          onLoad={handleMapLoad}
        >
          {/* Contractor Marker */}
          {contractorLocation && (
            <Marker
              position={{
                lat: contractorLocation.latitude,
                lng: contractorLocation.longitude,
              }}
              icon={CONTRACTOR_MARKER_ICON}
              onClick={() => setShowContractorPopup(true)}
              animation={google.maps.Animation.DROP}
            />
          )}

          {/* Contractor Info Popup */}
          {showContractorPopup && contractorLocation && showContractorInfo && (
            <InfoWindow
              position={{
                lat: contractorLocation.latitude,
                lng: contractorLocation.longitude,
              }}
              onCloseClick={() => setShowContractorPopup(false)}
            >
              <div className="p-2 min-w-[150px]">
                <p className="font-semibold text-gray-900">{contractorName || 'Contractor'}</p>
                {contractorLocation.speed && (
                  <p className="text-xs text-gray-600">
                    {Math.round(contractorLocation.speed)} km/h
                  </p>
                )}
                {eta && (
                  <p className="text-xs text-teal-600 font-medium">{eta} min away</p>
                )}
              </div>
            </InfoWindow>
          )}

          {/* Destination Marker */}
          {destinationCoords && (
            <Marker
              position={destinationCoords}
              icon={DESTINATION_MARKER_ICON}
              title={destinationAddress}
            />
          )}

          {/* Route Polyline */}
          {routePolyline && routePolyline.length > 0 && (
            <Polyline path={routePolyline} options={ROUTE_POLYLINE_OPTIONS} />
          )}
        </GoogleMap>
      </div>

      {/* ETA Overlay */}
      {eta && (
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-lg shadow-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚗</span>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated arrival</p>
                  <p className="font-semibold">{eta} minutes</p>
                </div>
              </div>
              <div className="text-right">
                {distanceKm && (
                  <p className="text-sm font-medium">{distanceKm.toFixed(1)} km</p>
                )}
                {trafficCondition && (
                  <p className={cn('text-xs capitalize', trafficColour)}>
                    {trafficCondition} traffic
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Indicator */}
      {isLive && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full px-2 py-1 shadow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-medium">LIVE</span>
          </div>
        </div>
      )}

      {/* Contractor Location Indicator */}
      {contractorLocation && (
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full px-2 py-1 shadow">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-medium">Tracking</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Wrapper with Google Maps Provider
export function MapPreview(props: MapPreviewProps) {
  return (
    <GoogleMapsProvider
      fallback={
        <MapPreviewFallback
          destinationAddress={props.destinationAddress}
          eta={props.eta}
          contractorLocation={props.contractorLocation}
          className={props.className}
        />
      }
    >
      <LiveTrackingMapInner {...props} />
    </GoogleMapsProvider>
  )
}

// Fallback component when maps are loading or unavailable
function MapPreviewFallback({
  destinationAddress,
  eta,
  contractorLocation,
  className,
}: Pick<MapPreviewProps, 'destinationAddress' | 'eta' | 'contractorLocation' | 'className'>) {
  return (
    <div className={cn('relative rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden', className)}>
      {/* Map Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading Live Map</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{destinationAddress}</p>
        </div>
      </div>

      {/* ETA Overlay */}
      {eta && (
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-lg shadow-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚗</span>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated arrival</p>
                  <p className="font-semibold">{eta} minutes</p>
                </div>
              </div>
              {contractorLocation && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Contractor</p>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Live indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full px-2 py-1 shadow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-xs font-medium">LIVE</span>
        </div>
      </div>
    </div>
  )
}

// Export alias for backwards compatibility
export { MapPreview as LiveTrackingMap }

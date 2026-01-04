// Google Maps configuration for Phase 3 Live Tracking

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  gestureHandling: 'greedy',
  styles: [
    // Subtle dark-mode friendly styling
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
}

// Default center for Australian maps (Sydney)
export const DEFAULT_CENTER = {
  lat: -33.8688,
  lng: 151.2093,
}

export const DEFAULT_ZOOM = 14

// Marker icons
export const CONTRACTOR_MARKER_ICON = {
  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  fillColor: '#00BFA6', // Teal brand colour
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 2,
  scale: 1.5,
  anchor: { x: 12, y: 24 } as google.maps.Point,
}

export const DESTINATION_MARKER_ICON = {
  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  fillColor: '#EF4444', // Red for destination
  fillOpacity: 1,
  strokeColor: '#ffffff',
  strokeWeight: 2,
  scale: 1.5,
  anchor: { x: 12, y: 24 } as google.maps.Point,
}

// Route polyline styling
export const ROUTE_POLYLINE_OPTIONS: google.maps.PolylineOptions = {
  strokeColor: '#00BFA6',
  strokeOpacity: 0.8,
  strokeWeight: 4,
}

// Libraries to load
export const GOOGLE_MAPS_LIBRARIES: ('places' | 'geometry' | 'drawing' | 'visualization')[] = [
  'places',
  'geometry',
]

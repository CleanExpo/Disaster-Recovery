'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle, HeatmapLayer, DirectionsRenderer } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Users, AlertTriangle, 
  Clock, Shield, Phone, Mail, Star, Activity,
  Zap, Filter, Search, Layers, ZoomIn, ZoomOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useWebSocket } from '@/lib/websocket-provider';
import { cn } from '@/lib/utils';

const libraries: any[] = ['places', 'visualization', 'geometry'];

interface Contractor {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  status: 'available' | 'busy' | 'offline' | 'emergency';
  specialty: string[];
  rating: number;
  jobsCompleted: number;
  responseTime: number; // in minutes
  currentJob?: {
    id: string;
    location: { lat: number; lng: number };
    type: string;
  };
  serviceRadius: number; // in km
  phone: string;
  email: string;
}

interface EmergencyJob {
  id: string;
  location: { lat: number; lng: number };
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  status: 'pending' | 'assigned' | 'in_progress';
  assignedTo?: string;
}

interface MapFilters {
  showAvailable: boolean;
  showBusy: boolean;
  showOffline: boolean;
  showEmergencies: boolean;
  showServiceAreas: boolean;
  showHeatmap: boolean;
  specialtyFilter: string;
  radiusFilter: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: -27.4698, // Brisbane
  lng: 153.0251,
};

const mapOptions = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

export const InteractiveContractorMap: React.FC = () => {
  const { on, off, emit, connected } = useWebSocket();
  
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyJob[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyJob | null>(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(11);
  const [filters, setFilters] = useState<MapFilters>({
    showAvailable: true,
    showBusy: true,
    showOffline: false,
    showEmergencies: true,
    showServiceAreas: false,
    showHeatmap: false,
    specialtyFilter: 'all',
    radiusFilter: 50,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [directions, setDirections] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Load contractors and emergencies
  useEffect(() => {
    if (!connected) return;

    const handleContractorUpdate = (data: Contractor[]) => {
      setContractors(data);
    };

    const handleEmergencyUpdate = (data: EmergencyJob[]) => {
      setEmergencies(data);
    };

    const handleContractorMove = (update: { id: string; position: any }) => {
      setContractors(prev => 
        prev.map(c => c.id === update.id 
          ? { ...c, position: update.position }
          : c
        )
      );
    };

    on('map:contractors', handleContractorUpdate);
    on('map:emergencies', handleEmergencyUpdate);
    on('contractor:move', handleContractorMove);

    // Request initial data
    emit('map:init');

    return () => {
      off('map:contractors', handleContractorUpdate);
      off('map:emergencies', handleEmergencyUpdate);
      off('contractor:move', handleContractorMove);
    };
  }, [connected, on, off, emit]);

  // Generate mock data
  useEffect(() => {
    // Mock contractors around Brisbane
    const mockContractors: Contractor[] = [
      {
        id: 'c1',
        name: 'John Smith',
        position: { lat: -27.4698, lng: 153.0251 },
        status: 'available',
        specialty: ['water_damage', 'mould'],
        rating: 4.8,
        jobsCompleted: 156,
        responseTime: 15,
        serviceRadius: 20,
        phone: '+61 400 000 001',
        email: 'john@example.com',
      },
      {
        id: 'c2',
        name: 'Sarah Johnson',
        position: { lat: -27.4598, lng: 153.0351 },
        status: 'busy',
        specialty: ['fire_damage', 'storm'],
        rating: 4.9,
        jobsCompleted: 203,
        responseTime: 12,
        currentJob: {
          id: 'j1',
          location: { lat: -27.4498, lng: 153.0451 },
          type: 'Fire Damage',
        },
        serviceRadius: 25,
        phone: '+61 400 000 002',
        email: 'sarah@example.com',
      },
      {
        id: 'c3',
        name: 'Mike Chen',
        position: { lat: -27.4798, lng: 153.0151 },
        status: 'available',
        specialty: ['water_damage', 'sewage'],
        rating: 4.7,
        jobsCompleted: 98,
        responseTime: 18,
        serviceRadius: 15,
        phone: '+61 400 000 003',
        email: 'mike@example.com',
      },
      {
        id: 'c4',
        name: 'Emergency Response Team',
        position: { lat: -27.4898, lng: 153.0051 },
        status: 'emergency',
        specialty: ['emergency', 'hazmat'],
        rating: 5.0,
        jobsCompleted: 412,
        responseTime: 5,
        serviceRadius: 50,
        phone: '+61 400 000 911',
        email: 'emergency@example.com',
      },
    ];

    const mockEmergencies: EmergencyJob[] = [
      {
        id: 'e1',
        location: { lat: -27.4598, lng: 153.0151 },
        type: 'Flood',
        priority: 'critical',
        createdAt: new Date(),
        status: 'pending',
      },
      {
        id: 'e2',
        location: { lat: -27.4798, lng: 153.0451 },
        type: 'Fire',
        priority: 'high',
        createdAt: new Date(),
        status: 'assigned',
        assignedTo: 'c2',
      },
    ];

    setContractors(mockContractors);
    setEmergencies(mockEmergencies);
  }, []);

  // Filter contractors based on filters
  const filteredContractors = contractors.filter(contractor => {
    if (!filters.showAvailable && contractor.status === 'available') return false;
    if (!filters.showBusy && contractor.status === 'busy') return false;
    if (!filters.showOffline && contractor.status === 'offline') return false;
    
    if (filters.specialtyFilter !== 'all' && 
        !contractor.specialty.includes(filters.specialtyFilter)) {
      return false;
    }
    
    return true;
  });

  // Get contractor icon
  const getContractorIcon = (contractor: Contractor) => {
    const color = 
      contractor.status === 'available' ? '#10B981' :
      contractor.status === 'busy' ? '#F59E0B' :
      contractor.status === 'emergency' ? '#EF4444' :
      '#6B7280';

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#FFFFFF',
      scale: 8,
    };
  };

  // Get emergency icon
  const getEmergencyIcon = (emergency: EmergencyJob) => {
    const color = 
      emergency.priority === 'critical' ? '#DC2626' :
      emergency.priority === 'high' ? '#F59E0B' :
      emergency.priority === 'medium' ? '#3B82F6' :
      '#6B7280';

    return {
      path: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z',
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 1.5,
      anchor: new google.maps.Point(12, 12),
    };
  };

  // Calculate route
  const calculateRoute = async (contractor: Contractor, emergency: EmergencyJob) => {
    if (!window.google) return;

    const directionsService = new google.maps.DirectionsService();
    
    try {
      const result = await directionsService.route({
        origin: contractor.position,
        destination: emergency.location,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      
      setDirections(result);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  // Assign contractor to emergency
  const assignContractor = async (contractorId: string, emergencyId: string) => {
    setIsLoading(true);
    
    try {
      // Send assignment via WebSocket
      emit('emergency:assign', { contractorId, emergencyId });
      
      // Update local state
      setEmergencies(prev =>
        prev.map(e => e.id === emergencyId 
          ? { ...e, status: 'assigned' as const, assignedTo: contractorId }
          : e
        )
      );
      
      setContractors(prev =>
        prev.map(c => c.id === contractorId
          ? { ...c, status: 'busy' as const }
          : c
        )
      );
      
      // Calculate and show route
      const contractor = contractors.find(c => c.id === contractorId);
      const emergency = emergencies.find(e => e.id === emergencyId);
      if (contractor && emergency) {
        await calculateRoute(contractor, emergency);
      }
      
    } catch (error) {
      console.error('Failed to assign contractor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Find nearest available contractor
  const findNearestContractor = (emergency: EmergencyJob) => {
    const available = contractors.filter(c => c.status === 'available');
    
    if (available.length === 0) return null;
    
    let nearest = available[0];
    let minDistance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(emergency.location),
      new google.maps.LatLng(nearest.position)
    );
    
    available.forEach(contractor => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(emergency.location),
        new google.maps.LatLng(contractor.position)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearest = contractor;
      }
    });
    
    return nearest;
  };

  // Heat map data
  const heatmapData = emergencies.map(e => ({
    location: new google.maps.LatLng(e.location.lat, e.location.lng),
    weight: e.priority === 'critical' ? 10 : e.priority === 'high' ? 5 : 2,
  }));

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interactive Contractor Map</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={connected ? 'default' : 'destructive'}>
                {connected ? 'Live' : 'Offline'}
              </Badge>
              <span className="text-sm text-gray-500">
                {filteredContractors.length} contractors, {emergencies.length} emergencies
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialty Filter</label>
              <Select value={filters.specialtyFilter} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, specialtyFilter: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="water_damage">Water Damage</SelectItem>
                  <SelectItem value="fire_damage">Fire Damage</SelectItem>
                  <SelectItem value="mould">Mould</SelectItem>
                  <SelectItem value="storm">Storm</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Service Radius (km)</label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[filters.radiusFilter]}
                  onValueChange={([value]) => 
                    setFilters(prev => ({ ...prev, radiusFilter: value }))
                  }
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm w-12">{filters.radiusFilter}km</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Map Layers</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={filters.showServiceAreas}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, showServiceAreas: checked }))
                    }
                  />
                  <span className="text-xs">Service Areas</span>
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={filters.showHeatmap}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, showHeatmap: checked }))
                    }
                  />
                  <span className="text-xs">Heat Map</span>
                </label>
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium">Show:</span>
            <label className="flex items-center gap-2">
              <Switch
                checked={filters.showAvailable}
                onCheckedChange={(checked) =>
                  setFilters(prev => ({ ...prev, showAvailable: checked }))
                }
              />
              <span className="text-sm">Available ({contractors.filter(c => c.status === 'available').length})</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={filters.showBusy}
                onCheckedChange={(checked) =>
                  setFilters(prev => ({ ...prev, showBusy: checked }))
                }
              />
              <span className="text-sm">Busy ({contractors.filter(c => c.status === 'busy').length})</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={filters.showEmergencies}
                onCheckedChange={(checked) =>
                  setFilters(prev => ({ ...prev, showEmergencies: checked }))
                }
              />
              <span className="text-sm">Emergencies ({emergencies.length})</span>
            </label>
          </div>

          {/* Map */}
          <div className="relative rounded-lg overflow-hidden">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
              libraries={libraries}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                options={mapOptions}
                onLoad={(map) => { mapRef.current = map; }}
              >
                {/* Contractors */}
                {filteredContractors.map((contractor) => (
                  <React.Fragment key={contractor.id}>
                    <Marker
                      position={contractor.position}
                      icon={getContractorIcon(contractor)}
                      onClick={() => setSelectedContractor(contractor)}
                    />
                    
                    {/* Service Area Circle */}
                    {filters.showServiceAreas && (
                      <Circle
                        center={contractor.position}
                        radius={contractor.serviceRadius * 1000}
                        options={{
                          fillColor: contractor.status === 'available' ? '#10B981' : '#F59E0B',
                          fillOpacity: 0.1,
                          strokeColor: contractor.status === 'available' ? '#10B981' : '#F59E0B',
                          strokeOpacity: 0.3,
                          strokeWeight: 1,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}

                {/* Emergencies */}
                {filters.showEmergencies && emergencies.map((emergency) => (
                  <Marker
                    key={emergency.id}
                    position={emergency.location}
                    icon={getEmergencyIcon(emergency)}
                    onClick={() => setSelectedEmergency(emergency)}
                    animation={emergency.priority === 'critical' ? google.maps.Animation.BOUNCE : undefined}
                  />
                ))}

                {/* Heat Map */}
                {filters.showHeatmap && heatmapData.length > 0 && (
                  <HeatmapLayer
                    data={heatmapData}
                    options={{
                      radius: 30,
                      opacity: 0.6,
                    }}
                  />
                )}

                {/* Directions */}
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: '#3B82F6',
                        strokeWeight: 4,
                      },
                    }}
                  />
                )}

                {/* Contractor Info Window */}
                {selectedContractor && (
                  <InfoWindow
                    position={selectedContractor.position}
                    onCloseClick={() => setSelectedContractor(null)}
                  >
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold">{selectedContractor.name}</h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3 h-3" />
                          <span>{selectedContractor.jobsCompleted} jobs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3" />
                          <span>{selectedContractor.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{selectedContractor.responseTime} min response</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{selectedContractor.phone}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="flex-1">
                          Contact
                        </Button>
                        {selectedEmergency && selectedContractor.status === 'available' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => assignContractor(selectedContractor.id, selectedEmergency.id)}
                            disabled={isLoading}
                          >
                            Assign to Emergency
                          </Button>
                        )}
                      </div>
                    </div>
                  </InfoWindow>
                )}

                {/* Emergency Info Window */}
                {selectedEmergency && (
                  <InfoWindow
                    position={selectedEmergency.location}
                    onCloseClick={() => setSelectedEmergency(null)}
                  >
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        {selectedEmergency.type} Emergency
                      </h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <div>Priority: <Badge variant={getPriorityColor(selectedEmergency.priority)}>
                          {selectedEmergency.priority}
                        </Badge></div>
                        <div>Status: {selectedEmergency.status}</div>
                        <div>Created: {new Date(selectedEmergency.createdAt).toLocaleTimeString()}</div>
                      </div>
                      {selectedEmergency.status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => {
                            const nearest = findNearestContractor(selectedEmergency);
                            if (nearest) {
                              assignContractor(nearest.id, selectedEmergency.id);
                            }
                          }}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Auto-Assign Nearest
                        </Button>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>

            {/* Map Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setZoom(prev => Math.min(prev + 1, 20))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setZoom(prev => Math.max(prev - 1, 5))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                      setZoom(14);
                    });
                  }
                }}
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Contractors</p>
                <p className="text-2xl font-bold">{contractors.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Emergencies</p>
                <p className="text-2xl font-bold">{emergencies.filter(e => e.status === 'pending').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {Math.round(contractors.reduce((acc, c) => acc + c.responseTime, 0) / contractors.length)} min
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Coverage Area</p>
                <p className="text-2xl font-bold">
                  {Math.max(...contractors.map(c => c.serviceRadius))} km
                </p>
              </div>
              <MapPin className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function for priority colors
function getPriorityColor(priority: string): any {
  switch (priority) {
    case 'critical': return 'destructive';
    case 'high': return 'default';
    case 'medium': return 'secondary';
    default: return 'outline';
  }
}
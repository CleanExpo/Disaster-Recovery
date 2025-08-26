'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  MapPin,
  AlertTriangle,
  Users,
  Check,
  X,
  Search,
  Maximize2,
  Info,
  Map,
  Navigation,
  Target,
  Shield
} from 'lucide-react';

interface Territory {
  id: string;
  contractorId: string;
  contractorName: string;
  companyName: string;
  type: 'radius' | 'postcode' | 'suburb';
  centerLat?: number;
  centerLng?: number;
  radiusKm?: number;
  postcodes?: string[];
  suburbs?: string[];
  status: 'active' | 'pending' | 'conflict';
  conflictsWith?: string[];
}

interface TerritoryConflict {
  id: string;
  territory1: Territory;
  territory2: Territory;
  overlapPercentage: number;
  resolution?: 'pending' | 'resolved' | 'approved';
  notes?: string;
}

export function TerritoryManager() {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [conflicts, setConflicts] = useState<TerritoryConflict[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [resolveModal, setResolveModal] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<TerritoryConflict | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    fetchTerritories();
    checkForConflicts();
  }, []);

  const fetchTerritories = async () => {
    try {
      const response = await fetch('/api/admin/territories');
      const data = await response.json();
      setTerritories(data);
    } catch (error) {
      console.error('Failed to fetch territories:', error);
    }
  };

  const checkForConflicts = async () => {
    try {
      const response = await fetch('/api/admin/territories/conflicts');
      const data = await response.json();
      setConflicts(data);
    } catch (error) {
      console.error('Failed to check conflicts:', error);
    }
  };

  const calculateCoverage = (territory: Territory): number => {
    if (territory.type === 'radius' && territory.radiusKm) {
      return Math.PI * Math.pow(territory.radiusKm, 2);
    } else if (territory.postcodes) {
      return territory.postcodes.length * 25; // Approximate km² per postcode
    } else if (territory.suburbs) {
      return territory.suburbs.length * 15; // Approximate km² per suburb
    }
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'conflict': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResolveConflict = async () => {
    if (!selectedConflict) return;

    try {
      const response = await fetch(`/api/admin/territories/conflicts/${selectedConflict.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resolution: 'resolved',
          notes: resolutionNotes
        })
      });

      if (response.ok) {
        checkForConflicts();
        setResolveModal(false);
        setSelectedConflict(null);
        setResolutionNotes('');
      }
    } catch (error) {
      console.error('Failed to resolve conflict:', error);
    }
  };

  const handleApproveOverlap = async (conflictId: string) => {
    try {
      const response = await fetch(`/api/admin/territories/conflicts/${conflictId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        checkForConflicts();
      }
    } catch (error) {
      console.error('Failed to approve overlap:', error);
    }
  };

  const openMapView = (territory: Territory) => {
    setSelectedTerritory(territory);
    setShowMapModal(true);
  };

  const filteredTerritories = territories.filter(territory =>
    (filterType === 'all' || territory.status === filterType) &&
    (searchTerm === '' ||
     territory.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     territory.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group territories by region for visualization
  const regionStats = {
    metropolitan: territories.filter(t => t.radiusKm && t.radiusKm <= 50).length,
    regional: territories.filter(t => t.radiusKm && t.radiusKm > 50 && t.radiusKm <= 100).length,
    rural: territories.filter(t => t.radiusKm && t.radiusKm > 100).length,
    postcodeBased: territories.filter(t => t.type === 'postcode').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Territory Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter territories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Territories</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="conflict">Conflicts</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Map className="h-4 w-4 mr-2" />
            Full Map View
          </Button>
        </div>
      </div>

      {/* Conflict Alert */}
      {conflicts.length > 0 && (
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>{conflicts.length} territory conflicts detected.</strong> Review and resolve overlapping 
            service areas to ensure proper coverage and prevent contractor disputes.
          </AlertDescription>
        </Alert>
      )}

      {/* Coverage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Metropolitan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{regionStats.metropolitan}</p>
            <p className="text-xs text-gray-600">≤50km radius</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Regional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{regionStats.regional}</p>
            <p className="text-xs text-gray-600">50-100km radius</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rural</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{regionStats.rural}</p>
            <p className="text-xs text-gray-600">&gt;100km radius</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Postcode-based</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{regionStats.postcodeBased}</p>
            <p className="text-xs text-gray-600">Specific areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Territory Conflicts */}
      {conflicts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Territory Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conflicts.map(conflict => (
                <div key={conflict.id} className="border rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div>
                          <p className="font-medium">{conflict.territory1.companyName}</p>
                          <p className="text-sm text-gray-600">
                            {conflict.territory1.type === 'radius' 
                              ? `${conflict.territory1.radiusKm}km radius` 
                              : `${conflict.territory1.postcodes?.length || 0} postcodes`}
                          </p>
                        </div>
                        <span className="text-red-600 font-bold">⚠️ OVERLAPS WITH</span>
                        <div>
                          <p className="font-medium">{conflict.territory2.companyName}</p>
                          <p className="text-sm text-gray-600">
                            {conflict.territory2.type === 'radius' 
                              ? `${conflict.territory2.radiusKm}km radius` 
                              : `${conflict.territory2.postcodes?.length || 0} postcodes`}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">
                        {conflict.overlapPercentage}% overlap
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedConflict(conflict);
                          setResolveModal(true);
                        }}
                      >
                        Resolve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleApproveOverlap(conflict.id)}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Territories List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Territories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Contractor</th>
                  <th className="text-left p-4 font-medium text-sm">Coverage Type</th>
                  <th className="text-left p-4 font-medium text-sm">Coverage Area</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTerritories.map(territory => (
                  <tr key={territory.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{territory.companyName}</p>
                        <p className="text-sm text-gray-600">{territory.contractorName}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {territory.type === 'radius' ? (
                          <Target className="h-4 w-4 text-gray-400" />
                        ) : (
                          <MapPin className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="capitalize">{territory.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {territory.type === 'radius' ? (
                        <span>{territory.radiusKm}km radius</span>
                      ) : territory.type === 'postcode' ? (
                        <span>{territory.postcodes?.length} postcodes</span>
                      ) : (
                        <span>{territory.suburbs?.length} suburbs</span>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        ~{calculateCoverage(territory).toFixed(0)} km²
                      </p>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(territory.status)}>
                        {territory.status}
                      </Badge>
                      {territory.conflictsWith && territory.conflictsWith.length > 0 && (
                        <p className="text-xs text-red-600 mt-1">
                          {territory.conflictsWith.length} conflicts
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openMapView(territory)}
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Underserved Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Underserved Regions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              The following regions have limited or no contractor coverage:
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Western NSW</p>
              <p className="text-xs text-gray-600">0 contractors</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Far North QLD</p>
              <p className="text-xs text-gray-600">1 contractor</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">Tasmania East</p>
              <p className="text-xs text-gray-600">0 contractors</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="font-medium text-sm">NT Remote</p>
              <p className="text-xs text-gray-600">0 contractors</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conflict Resolution Modal */}
      <Dialog open={resolveModal} onOpenChange={setResolveModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resolve Territory Conflict</DialogTitle>
          </DialogHeader>
          
          {selectedConflict && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{selectedConflict.territory1.companyName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Type: {selectedConflict.territory1.type}</p>
                    <p className="text-sm">
                      Coverage: {selectedConflict.territory1.type === 'radius' 
                        ? `${selectedConflict.territory1.radiusKm}km` 
                        : `${selectedConflict.territory1.postcodes?.length} areas`}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{selectedConflict.territory2.companyName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Type: {selectedConflict.territory2.type}</p>
                    <p className="text-sm">
                      Coverage: {selectedConflict.territory2.type === 'radius' 
                        ? `${selectedConflict.territory2.radiusKm}km` 
                        : `${selectedConflict.territory2.postcodes?.length} areas`}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label>Overlap Details</Label>
                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm">Overlap percentage: <strong>{selectedConflict.overlapPercentage}%</strong></p>
                  <p className="text-sm mt-1">Affected area: ~{(calculateCoverage(selectedConflict.territory1) * selectedConflict.overlapPercentage / 100).toFixed(0)} km²</p>
                </div>
              </div>

              <div>
                <Label htmlFor="resolution-notes">Resolution Notes</Label>
                <textarea
                  id="resolution-notes"
                  className="w-full mt-2 p-3 border rounded-lg"
                  rows={4}
                  placeholder="Describe how this conflict will be resolved..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Suggested Resolutions</Label>
                <div className="space-y-2">
                  <button
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
                    onClick={() => setResolutionNotes('Territories will be divided by postcodes with clear boundaries.')}
                  >
                    <p className="font-medium text-sm">Geographic Division</p>
                    <p className="text-xs text-gray-600">Split territory by postcodes or natural boundaries</p>
                  </button>
                  <button
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
                    onClick={() => setResolutionNotes('Both contractors approved for shared territory with lead rotation.')}
                  >
                    <p className="font-medium text-sm">Shared Territory</p>
                    <p className="text-xs text-gray-600">Allow overlap with lead distribution rules</p>
                  </button>
                  <button
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50"
                    onClick={() => setResolutionNotes('One contractor to adjust radius to eliminate overlap.')}
                  >
                    <p className="font-medium text-sm">Radius Adjustment</p>
                    <p className="text-xs text-gray-600">Reduce coverage radius for one contractor</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setResolveModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveConflict}>
              Resolve Conflict
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
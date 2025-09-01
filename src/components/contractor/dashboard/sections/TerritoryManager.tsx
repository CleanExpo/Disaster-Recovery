'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Navigation
} from 'lucide-react';

interface Territory {
  id: string;
  name: string;
  type: 'PRIMARY' | 'SECONDARY' | 'EMERGENCY';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  coverage: {
    radius: number;
    unit: 'km' | 'miles';
  };
  address?: string;
  postcode?: string;
  state?: string;
  responseTime?: string;
}

interface TerritoryManagerProps {
  territories?: Territory[];
}

export function TerritoryManager({ territories = [] }: TerritoryManagerProps) {
  const [activeTab, setActiveTab] = useState('active');

  const activeT = territories.filter(t => t.status === 'ACTIVE');
  const pendingT = territories.filter(t => t.status === 'PENDING');
  const inactiveT = territories.filter(t => t.status === 'INACTIVE');

  const getStatusIcon = (status: Territory['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'PENDING':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'INACTIVE':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: Territory['type']) => {
    switch (type) {
      case 'PRIMARY':
        return 'bg-blue-100 text-blue-800';
      case 'SECONDARY':
        return 'bg-purple-100 text-purple-800';
      case 'EMERGENCY':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTerritoryList = (territoryList: Territory[]) => (
    <div className="space-y-4">
      {territoryList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No territories found in this category
        </div>
      ) : (
        territoryList.map((territory) => (
          <Card key={territory.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{territory.name}</h4>
                      <Badge className={getTypeColor(territory.type)}>
                        {territory.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(territory.status)}
                        <span className="text-sm text-gray-600">{territory.status}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {territory.address && <p>{territory.address}</p>}
                      <p>{territory.postcode} {territory.state}</p>
                      <p>Coverage: {territory.coverage.radius} {territory.coverage.unit}</p>
                      {territory.responseTime && (
                        <p>Response Time: {territory.responseTime}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{territories.length}</div>
            <p className="text-xs text-gray-600">Territories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeT.length}</div>
            <p className="text-xs text-gray-600">Serving customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingT.length}</div>
            <p className="text-xs text-gray-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coverage Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge variant="outline">{territories.filter(t => t.type === 'PRIMARY').length} Primary</Badge>
              <Badge variant="outline">{territories.filter(t => t.type === 'SECONDARY').length} Secondary</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Territory Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Territory Management</CardTitle>
              <CardDescription>
                Manage your service territories and coverage areas
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Territory
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active ({activeT.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingT.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inactiveT.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              {renderTerritoryList(activeT)}
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              {renderTerritoryList(pendingT)}
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              {renderTerritoryList(inactiveT)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Coverage Map
          </CardTitle>
          <CardDescription>
            Visual representation of your service territories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Interactive map will be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

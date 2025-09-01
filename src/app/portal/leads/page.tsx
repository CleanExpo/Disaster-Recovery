'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Filter, Download, MapPin, Clock, 
  DollarSign, AlertTriangle, CheckCircle, XCircle,
  Phone, Mail, Navigation, Calendar, FileText,
  TrendingUp, AlertCircle, ChevronRight, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LeadManagement() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock lead data with Australian context
  const leads = {
    active: [
      {
        id: 'LD-2024-3421',
        type: 'Water Damage - Category 1',
        customer: 'Sarah Mitchell',
        property: 'Residential - House',
        address: '45 Sandgate Rd, Chermside QLD 4032',
        insuranceCompany: 'AAMI',
        claimNumber: 'AAMI-2024-987654',
        value: 12500,
        urgency: 'high',
        responseTime: '30 min',
        created: '2 hours ago',
        status: 'new',
        description: 'Burst pipe in bathroom, water damage to ceiling and walls',
        rooms: 3,
        sqm: 45
      },
      {
        id: 'LD-2024-3422',
        type: 'Mould Remediation',
        customer: 'James Chen',
        property: 'Residential - Unit',
        address: '12/88 Park Ave, Aspley QLD 4034',
        insuranceCompany: 'Suncorp',
        claimNumber: 'SUN-2024-456789',
        value: 8700,
        urgency: 'medium',
        responseTime: '2 hours',
        created: '4 hours ago',
        status: 'contacted',
        description: 'Black mould in bathroom and bedroom after recent flooding',
        rooms: 2,
        sqm: 30
      },
      {
        id: 'LD-2024-3423',
        type: 'Fire & Smoke Damage',
        customer: 'Brisbane Medical Centre',
        property: 'Commercial - Medical',
        address: '234 Gympie Rd, Kedron QLD 4031',
        insuranceCompany: 'Allianz',
        claimNumber: 'ALZ-2024-123456',
        value: 45000,
        urgency: 'urgent',
        responseTime: 'ASAP',
        created: '30 min ago',
        status: 'new',
        description: 'Kitchen fire, smoke damage throughout facility',
        rooms: 8,
        sqm: 280
      },
      {
        id: 'LD-2024-3424',
        type: 'Sewage Backup - Category 3',
        customer: 'Tony Marconi',
        property: 'Residential - Townhouse',
        address: '67 Hamilton Rd, Nundah QLD 4012',
        insuranceCompany: 'NRMA',
        claimNumber: 'NRMA-2024-789012',
        value: 6300,
        urgency: 'urgent',
        responseTime: '1 hour',
        created: '1 hour ago',
        status: 'accepted',
        description: 'Sewage backup in ground floor, contamination risk',
        rooms: 2,
        sqm: 35
      }
    ],
    completed: [
      {
        id: 'LD-2024-3401',
        type: 'Water Damage - Category 2',
        customer: 'Lisa Wong',
        property: 'Residential - Apartment',
        address: '8/120 Breakfast Creek Rd, Newstead QLD 4006',
        value: 9800,
        completedDate: '2024-12-28',
        rating: 5,
        profit: 3200
      },
      {
        id: 'LD-2024-3398',
        type: 'Storm Damage',
        customer: 'Northside Retail Centre',
        property: 'Commercial - Retail',
        address: '450 Webster Rd, Stafford QLD 4053',
        value: 67000,
        completedDate: '2024-12-24',
        rating: 4.8,
        profit: 18500
      }
    ],
    rejected: [
      {
        id: 'LD-2024-3419',
        type: 'Water Damage',
        reason: 'Outside service area',
        value: 5600,
        rejectedDate: '2024-12-29'
      }
    ]
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'contacted':
        return <Phone className="h-4 w-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portal">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                <p className="text-sm text-gray-600">Manage and track your insurance claims</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <MapPin className="h-4 w-4 mr-2" />
                Update Availability
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-gray-500 mt-1">$72,800 potential value</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-green-600 mt-1">+2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 min</div>
              <p className="text-xs text-gray-500 mt-1">Target: <60 min</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-gray-500 mt-1">Industry avg: 65%</p>
            </CardContent>
          </Card>
        </div>

        {/* Lead Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="active">Active (4)</TabsTrigger>
              <TabsTrigger value="pending">Pending Review (2)</TabsTrigger>
              <TabsTrigger value="completed">Completed (145)</TabsTrigger>
              <TabsTrigger value="rejected">Rejected (8)</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Search leads..." 
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="urgent">Urgent Only</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="new">New Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="active" className="space-y-4">
            {leads.active.map((lead) => (
              <Card key={lead.id} className="overflow-hidden">
                <div className="flex">
                  {/* Lead Main Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-mono text-sm text-gray-600">{lead.id}</h3>
                          <Badge className={getUrgencyColor(lead.urgency)}>
                            {lead.urgency === 'urgent' ? 'URGENT' : lead.urgency.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(lead.status)}
                            <span className="text-sm text-gray-600 capitalize">{lead.status}</span>
                          </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-1">{lead.type}</h2>
                        <p className="text-gray-600">{lead.customer} • {lead.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${lead.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Est. value</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Insurance</p>
                        <p className="text-sm font-medium">
                          {lead.insuranceCompany} • {lead.claimNumber}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{lead.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">
                          <strong>{lead.rooms}</strong> rooms affected
                        </span>
                        <span className="text-sm text-gray-600">
                          <strong>{lead.sqm}</strong> sqm area
                        </span>
                        <span className="text-sm text-gray-600">
                          Response needed: <strong className="text-orange-600">{lead.responseTime}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Lead
                      </Button>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" className="text-red-600 hover:text-red-700">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>

                  {/* Lead Sidebar */}
                  <div className="w-64 bg-gray-50 p-4 border-l">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Quick Actions</p>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Navigation className="h-3 w-3 mr-2" />
                            Get Directions
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <FileText className="h-3 w-3 mr-2" />
                            View Scope
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Calendar className="h-3 w-3 mr-2" />
                            Schedule Visit
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Lead Score</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-bold">92/100</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">High conversion probability</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Time Remaining</p>
                        <p className="text-lg font-bold text-orange-600">28 min</p>
                        <p className="text-xs text-gray-600">to meet response SLA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {leads.completed.map((lead) => (
              <Card key={lead.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm text-gray-600 mb-1">{lead.id}</p>
                      <h3 className="text-lg font-semibold">{lead.type}</h3>
                      <p className="text-sm text-gray-600">{lead.customer} • {lead.property}</p>
                      <p className="text-sm text-gray-600 mt-1">{lead.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${lead.value.toLocaleString()}</p>
                      <p className="text-sm text-green-600 font-medium">Profit: ${lead.profit.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(lead.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{lead.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Completed: {lead.completedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
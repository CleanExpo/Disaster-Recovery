'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Download,
  RefreshCw,
  Mail,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Building2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  TrendingUp,
  ChevronRight,
  Badge,
  Timer,
  Activity
} from 'lucide-react';

interface Lead {
  id: string;
  bookingId: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    
    address: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  service: {
    type: string;
    urgency: 'emergency' | 'urgent' | 'standard';
    description: string;
    propertyType: string;
    affectedAreas: string[];
  };
  insurance: {
    hasInsurance: boolean;
    company?: string;
    claimNumber?: string;
  };
  payment: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    amount: number;
    method: 'card' | 'bank_transfer';
    paidAt?: string;
  };
  contractor: {
    assigned: boolean;
    id?: string;
    businessName?: string;
    acceptedAt?: string;
    responseTime?: number;
  };
  status: 'new' | 'contacted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  notes: string[];
}

interface LeadStats {
  total: number;
  new: number;
  assigned: number;
  completed: number;
  revenue: number;
  conversionRate: number;
  avgResponseTime: number;
}

export default function LeadManagementDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock lead data
  const mockLeads: Lead[] = [
    {
      id: 'LEAD-001',
      bookingId: 'NRP-2024-ABC123',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      customer: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        
        address: '123 Example Street',
        suburb: 'Brisbane',
        state: 'QLD',
        postcode: '4000' },
      service: {
        type: 'Water Damage Restoration',
        urgency: 'emergency',
        description: 'Burst pipe in kitchen, water spreading to living room',
        propertyType: 'residential',
        affectedAreas: ['Kitchen', 'Living Room'] },
      insurance: {
        hasInsurance: true,
        company: 'NRMA Insurance',
        claimNumber: 'CLM-2024-789' },
      payment: {
        status: 'completed',
        amount: 2750,
        method: 'card',
        paidAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      contractor: {
        assigned: true,
        id: 'CONT-001',
        businessName: 'Elite Water Damage Restoration',
        acceptedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        responseTime: 15 },
      status: 'in_progress',
      priority: 'high',
      notes: ['Customer very stressed, needs immediate help', 'Contractor on the way'] },
    {
      id: 'LEAD-002',
      bookingId: 'NRP-2024-DEF456',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        
        address: '456 Test Avenue',
        suburb: 'Sydney',
        state: 'NSW',
        postcode: '2000' },
      service: {
        type: 'Fire Damage Restoration',
        urgency: 'urgent',
        description: 'Kitchen fire damage, smoke throughout property',
        propertyType: 'residential',
        affectedAreas: ['Kitchen', 'Dining Room', 'Hallway'] },
      insurance: {
        hasInsurance: true,
        company: 'Allianz',
        claimNumber: 'CLM-2024-456' },
      payment: {
        status: 'processing',
        amount: 2750,
        method: 'bank_transfer' },
      contractor: {
        assigned: false },
      status: 'new',
      priority: 'high',
      notes: ['Awaiting payment confirmation'] },
    {
      id: 'LEAD-003',
      bookingId: 'NRP-2024-GHI789',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        name: 'Michael Brown',
        email: 'mbrown@email.com',
        
        address: '789 Sample Road',
        suburb: 'Melbourne',
        state: 'VIC',
        postcode: '3000' },
      service: {
        type: 'Mould Remediation',
        urgency: 'standard',
        description: 'Mould found in bathroom and bedroom walls',
        propertyType: 'rental',
        affectedAreas: ['Bathroom', 'Master Bedroom'] },
      insurance: {
        hasInsurance: false },
      payment: {
        status: 'completed',
        amount: 2750,
        method: 'card',
        paidAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString() },
      contractor: {
        assigned: true,
        id: 'CONT-003',
        businessName: 'Pro Mould Solutions',
        acceptedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        responseTime: 180 },
      status: 'completed',
      priority: 'low',
      notes: ['Job completed successfully', 'Customer satisfied'] },
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      
      // Calculate stats
      const totalRevenue = mockLeads
        .filter(l => l.payment.status === 'completed')
        .reduce((sum, l) => sum + l.payment.amount, 0);
      
      const avgResponseTime = mockLeads
        .filter(l => l.contractor.responseTime)
        .reduce((sum, l, _, arr) => sum + (l.contractor.responseTime || 0) / arr.length, 0);

      setStats({
        total: mockLeads.length,
        new: mockLeads.filter(l => l.status === 'new').length,
        assigned: mockLeads.filter(l => l.contractor.assigned).length,
        completed: mockLeads.filter(l => l.status === 'completed').length,
        revenue: totalRevenue,
        conversionRate: (mockLeads.filter(l => l.status === 'completed').length / mockLeads.length) * 100,
        avgResponseTime: Math.round(avgResponseTime) });
      
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...leads];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Apply urgency filter
    if (filterUrgency !== 'all') {
      filtered = filtered.filter(lead => lead.service.urgency === filterUrgency);
    }

    setFilteredLeads(filtered);
  }, [searchQuery, filterStatus, filterUrgency, leads]);

  const getStatusColor = (status: Lead['status']) => {
    const colours = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-indigo-100 text-indigo-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800' };
    return colours[status] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyIcon = (urgency: Lead['service']['urgency']) => {
    switch (urgency) {
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'urgent':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Timer className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTimeSince = (date: string) => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lead data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management Dashboard</h1>
          <p className="text-gray-600">Track and manage all incoming disaster recovery leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Active leads</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${(stats?.revenue || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total collected</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Conversion</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.conversionRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">Lead to job rate</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
              <span className="text-sm text-gray-500">Response</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.avgResponseTime || 0} min
            </p>
            <p className="text-sm text-gray-600 mt-1">Avg response time</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, booking ID, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Urgency</option>
                <option value="emergency">Emergency</option>
                <option value="urgent">Urgent</option>
                <option value="standard">Standard</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colours">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contractor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.bookingId}</p>
                        <p className="text-xs text-gray-500">{getTimeSince(lead.createdAt)}</p>
                        {lead.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                            High Priority
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.customer.name}</p>
                        <p className="text-xs text-gray-500">{lead.customer.phone}</p>
                        <p className="text-xs text-gray-500">{lead.customer.suburb}, {lead.customer.state}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          {getUrgencyIcon(lead.service.urgency)}
                          <p className="text-sm text-gray-900">{lead.service.type}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {lead.service.propertyType} - {lead.service.affectedAreas.join(', ')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          ${lead.payment.amount.toLocaleString()}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          lead.payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          lead.payment.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          lead.payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.contractor.assigned ? (
                        <div>
                          <p className="text-sm text-gray-900">{lead.contractor.businessName}</p>
                          <p className="text-xs text-gray-500">
                            Response: {lead.contractor.responseTime} min
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedLead.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedLead.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedLead.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">
                      {selectedLead.customer.address}, {selectedLead.customer.suburb}, {selectedLead.customer.state} {selectedLead.customer.postcode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-600">Type:</span> <span className="font-medium">{selectedLead.service.type}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Urgency:</span> 
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedLead.service.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
                      selectedLead.service.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedLead.service.urgency}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Description:</span> <span className="font-medium">{selectedLead.service.description}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Affected Areas:</span> <span className="font-medium">{selectedLead.service.affectedAreas.join(', ')}</span>
                  </p>
                </div>
              </div>

              {/* Notes */}
              {selectedLead.notes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <ul className="space-y-2">
                    {selectedLead.notes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Assign Contractor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, MapPin, Mail, Calendar, AlertCircle, CheckCircle, Clock, FileText, Download, CreditCard, MessageSquare} from 'lucide-react';

interface PartnerDashboardData {
  partner: {
    id: string;
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    serviceAreas: string[];
    specializations: string[];
    leadCredits: number;
    accountBalance: number;
    status: string;
  };
  leads: Lead[];
  billing: BillingRecord[];
  stats: {
    totalLeads: number;
    acceptedLeads: number;
    pendingLeads: number;
    conversionRate: number;
    totalSpent: number;
    averageLeadValue: number;
  };
}

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  state: string;
  damageType: string[];
  urgencyLevel: string;
  propertyValue: string;
  hasInsurance: boolean;
  leadScore: number;
  leadValue: number;
  status: string;
  createdAt: string;
  assignedAt: string;
}

interface BillingRecord {
  id: string;
  leadId: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt?: string;
}

export default function PartnerPortal() {
  const [dashboardData, setDashboardData] = useState<PartnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/partner/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/partner/leads/${leadId}/accept`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to accept lead:', error);
    }
  };

  const rejectLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/partner/leads/${leadId}/reject`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to reject lead:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!dashboardData) {
    return <div className="flex justify-center items-center min-h-screen">No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Partner Portal</h1>
          <p className="text-gray-600">Welcome back, {dashboardData.partner.businessName}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Credits</p>
                <p className="text-2xl font-bold">${dashboardData.partner.leadCredits}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{dashboardData.stats.totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{dashboardData.stats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Leads</p>
                <p className="text-2xl font-bold">{dashboardData.stats.pendingLeads}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads">New Leads</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Leads</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* New Leads Tab */}
          <TabsContent value="leads">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Available Leads</h2>
              <div className="space-y-4">
                {dashboardData.leads
                  .filter(lead => lead.status === 'ASSIGNED')
                  .map(lead => (
                    <Card key={lead.id} className="p-4 border-2 hover:border-blue-300 transition-colours">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-bold text-lg">{lead.fullName}</h3>
                            <Badge variant={lead.urgencyLevel === 'emergency' ? 'destructive' : 'default'}>
                              {lead.urgencyLevel}
                            </Badge>
                            <Badge variant="outline" className="bg-green-50">
                              Score: {lead.leadScore}/100
                            </Badge>
                            {lead.hasInsurance && (
                              <Badge className="bg-blue-100 text-blue-800">Insured</Badge>
                            )}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{lead.suburb}, {lead.state}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-gray-500" />
                                <span>{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span>{lead.email}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-gray-500" />
                                <span>{lead.damageType.join(', ')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <span>Property Value: ${lead.propertyValue}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>Received: {new Date(lead.assignedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <div className="text-center mb-2">
                            <p className="text-2xl font-bold text-green-600">${lead.leadValue}</p>
                            <p className="text-xs text-gray-500">Lead Cost</p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => acceptLead(lead.id)}
                          >
                            Accept Lead
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectLead(lead.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedLead(lead)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Accepted Leads Tab */}
          <TabsContent value="accepted">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Accepted Leads</h2>
              <div className="space-y-4">
                {dashboardData.leads
                  .filter(lead => lead.status === 'ACCEPTED')
                  .map(lead => (
                    <Card key={lead.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{lead.fullName}</h3>
                          <p className="text-sm text-gray-600">{lead.suburb}, {lead.state}</p>
                          <p className="text-sm">{lead.phone} | {lead.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(lead.assignedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Billing & Payments</h2>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Credits
                </Button>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-3xl font-bold">${dashboardData.partner.accountBalance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold">${dashboardData.stats.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Lead Value</p>
                    <p className="text-2xl font-bold">${dashboardData.stats.averageLeadValue}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Recent Transactions</h3>
                {dashboardData.billing.map(record => (
                  <div key={record.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Lead #{record.leadId.slice(-6)}</p>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(record.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${record.amount}</span>
                      <Badge variant={record.status === 'PAID' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                      {record.status === 'PENDING' && (
                        <Button size="sm">Pay Now</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Partner Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.partner.serviceAreas.map(area => (
                      <Badge key={area} variant="outline">{area}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.partner.specializations.map(spec => (
                      <Badge key={spec} variant="outline">{spec}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Lead Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Receive emergency leads (24/7)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Receive commercial property leads</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Auto-accept high-value leads (Score 80+)</span>
                    </label>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
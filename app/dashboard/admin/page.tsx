'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import {
  Activity,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Palette,
  Phone,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wrench,
  X,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

interface AdminStats {
  totalUsers: number;
  totalRequests: number;
  totalMessages: number;
  totalRevenue: number;
  pendingRequests: number;
  completedRequests: number;
  averageLeadScore: number;
  conversionRate: number;
}

interface HighValueLead {
  id: string;
  serviceTitle: string;
  leadScore: number;
  urgency: string;
  location: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddThemeModal, setShowAddThemeModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
    theme: '',
    sortOrder: 0
  });
  const [newTheme, setNewTheme] = useState({
    name: '',
    identifier: '',
    primaryColor: '#00BFA6',
    secondaryColor: '#7C4DFF',
    accentColor: '#2196F3',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB'
  });
  const [newService, setNewService] = useState({
    categoryId: '',
    name: '',
    description: '',
    icon: '',
    theme: '',
    sortOrder: 0
  });
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [highValueLeads, setHighValueLeads] = useState<HighValueLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminKpis, setAdminKpis] = useState({
    totalRevenue: 0,
    activeTenants: 0,
    totalClients: 0,
    totalContractors: 0,
    activeContractors: 0,
    pendingContractors: 0,
    totalServiceRequests: 0,
    completedRequests: 0,
    conversionRate: 0,
    recentUsers: 0,
    recentRequests: 0
  });
  const [loadingKpis, setLoadingKpis] = useState(false);
  const [contractors, setContractors] = useState<any[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [contractorSearchTerm, setContractorSearchTerm] = useState('');
  const [contractorStatusFilter, setContractorStatusFilter] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [contractorStats, setContractorStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    rejected: 0
  });
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [clientServices, setClientServices] = useState<any[]>([]);
  const [loadingClientServices, setLoadingClientServices] = useState(false);
  const [whiteLabelStats, setWhiteLabelStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalServices: 0,
    completedServices: 0,
    totalRevenue: 0,
    averageServiceValue: 0
  });

  const fetchAdminKpis = async () => {
    try {
      setLoadingKpis(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/admin/kpis', { cache: 'no-store' });

      if (response.ok) {
        const result = await response.json();
        setAdminKpis(result.data);
      }
    } catch (error) {
      console.error('Error fetching admin KPIs:', error);
    } finally {
      setLoadingKpis(false);
    }
  };

  const fetchAdminData = useCallback(async () => {
    try {
      if (typeof window === 'undefined') return;

      // Fetch analytics
      const analyticsResponse = await fetch('/api/analytics/leads', {
        cache: 'no-store',
      });

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setStats({
          totalUsers: analyticsData.analytics.totalLeads || 0,
          totalRequests: analyticsData.analytics.totalLeads || 0,
          totalMessages: 0, // You can implement this
          totalRevenue: 0, // You can implement this
          pendingRequests: analyticsData.analytics.lowValueLeads || 0,
          completedRequests: analyticsData.analytics.highValueLeads || 0,
          averageLeadScore: analyticsData.analytics.averageScore || 0,
          conversionRate: analyticsData.analytics.conversionRate || 0
        });
        setHighValueLeads(analyticsData.highValueLeads || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }

    // Fetch admin KPIs
    fetchAdminKpis();
  }, []);

  const fetchContractors = useCallback(async () => {
    try {
      setLoadingContractors(true);
      if (typeof window === 'undefined') return;

      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        ...(contractorStatusFilter !== 'all' && { status: contractorStatusFilter }),
        ...(contractorSearchTerm && { search: contractorSearchTerm })
      });

      const response = await fetch(`/api/admin/contractors?${params}`, { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setContractors(data.contractors);
        
        // Calculate stats
        const stats = {
          total: data.contractors.length,
          verified: data.contractors.filter((c: any) => c.isVerified).length,
          pending: data.contractors.filter((c: any) => !c.isVerified).length,
          rejected: 0 // We don't track rejected status in current schema
        };
        setContractorStats(stats);
      }
    } catch (error) {
      console.error('Error fetching contractors:', error);
    } finally {
      setLoadingContractors(false);
    }
  }, [contractorStatusFilter, contractorSearchTerm]);

  const handleContractorVerification = async (contractorId: string, action: 'verify' | 'reject') => {
    try {
      setActionLoading(contractorId);
      if (typeof window === 'undefined') return;
      
      const response = await fetch('/api/admin/contractors', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractorId,
          action,
          reason: action === 'reject' ? 'Profile does not meet verification requirements' : undefined
        })
      });

      if (response.ok) {
        await fetchContractors();
        setSelectedContractor(null);
      }
    } catch (error) {
      console.error('Error updating verification:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('Category name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/service-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setShowAddCategoryModal(false);
        setNewCategory({ name: '', description: '', icon: '', theme: '', sortOrder: 0 });
        // Refresh the page or update the categories list
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error creating category: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTheme = async () => {
    if (!newTheme.name.trim() || !newTheme.identifier.trim()) {
      alert('Theme name and identifier are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTheme),
      });

      if (response.ok) {
        setShowAddThemeModal(false);
        setNewTheme({
          name: '',
          identifier: '',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          accentColor: '#2196F3',
          backgroundColor: '#1F2937',
          textColor: '#F9FAFB'
        });
        // Refresh the page or update the themes list
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error creating theme: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating theme:', error);
      alert('Failed to create theme. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async () => {
    if (!newService.name.trim() || !newService.categoryId) {
      alert('Service name and category are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        setShowAddServiceModal(false);
        setNewService({ categoryId: '', name: '', description: '', icon: '', theme: '', sortOrder: 0 });
        // Refresh the page or update the services list
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error creating service: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      alert('Failed to create service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'ADMIN') {
      if (user.userType === 'CLIENT') {
        router.push('/dashboard/client');
      } else if (user.userType === 'CONTRACTOR') {
        router.push('/dashboard/contractor');
      }
    } else if (user && user.userType === 'ADMIN') {
      fetchAdminData();
    }
  }, [user, loading, router, fetchAdminData]);

  const fetchClients = async () => {
    try {
      setLoadingClients(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/admin/clients', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setClients(data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  const fetchClientServices = async () => {
    try {
      setLoadingClientServices(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/admin/client-services', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setClientServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching client services:', error);
    } finally {
      setLoadingClientServices(false);
    }
  };

  const fetchWhiteLabelStats = async () => {
    try {
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/admin/white-label-stats', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setWhiteLabelStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching white label stats:', error);
    }
  };

  useEffect(() => {
    if (user && user.userType === 'ADMIN') {
      fetchContractors();
      fetchClients();
      fetchClientServices();
      fetchWhiteLabelStats();
    }
  }, [user, contractorStatusFilter, contractorSearchTerm, fetchContractors]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Users</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingKpis ? '...' : adminKpis.activeTenants}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-[#00BFA6]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Requests</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingKpis ? '...' : adminKpis.totalServiceRequests}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Avg Lead Score</p>
                      <p className="text-2xl font-bold text-white">{stats?.averageLeadScore?.toFixed(1) || 0}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingKpis ? '...' : `${(adminKpis.conversionRate ?? 0).toFixed(1)}%`}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Value Leads */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">High Value Leads</CardTitle>
                <CardDescription className="text-gray-400">
                  Recent high-value service requests (Score ≥ 70)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highValueLeads.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No high-value leads found</p>
                  ) : (
                    highValueLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{lead.serviceTitle}</h4>
                          <p className="text-sm text-gray-400">{lead.user.name} • {lead.location}</p>
                          <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${
                              lead.leadScore >= 90 ? 'bg-green-900/30 text-green-400 border-green-500' :
                              lead.leadScore >= 80 ? 'bg-blue-900/30 text-blue-400 border-blue-500' :
                              'bg-yellow-900/30 text-yellow-400 border-yellow-500'
                            }`}
                          >
                            Score: {lead.leadScore.toFixed(0)}
                          </Badge>
                          <Badge 
                            className={`${
                              lead.urgency === 'emergency' ? 'bg-red-900/30 text-red-400 border-red-500' :
                              lead.urgency === 'urgent' ? 'bg-orange-900/30 text-orange-400 border-orange-500' :
                              'bg-gray-900/30 text-gray-400 border-gray-500'
                            }`}
                          >
                            {lead.urgency}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );






      case 'contractors':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Contractor Verification</h3>
                <p className="text-gray-400 mt-1">Review and verify contractor profiles</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Contractors</p>
                      <p className="text-2xl font-bold text-white">{contractorStats.total}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Verified</p>
                      <p className="text-2xl font-bold text-white">{contractorStats.verified}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending Verification</p>
                      <p className="text-2xl font-bold text-white">{contractorStats.pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Rejected</p>
                      <p className="text-2xl font-bold text-white">{contractorStats.rejected}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search contractors..."
                      value={contractorSearchTerm}
                      onChange={(e) => setContractorSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Select value={contractorStatusFilter} onValueChange={setContractorStatusFilter}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white">All Contractors</SelectItem>
                    <SelectItem value="pending" className="text-white">Pending Verification</SelectItem>
                    <SelectItem value="verified" className="text-white">Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contractors List */}
            {loadingContractors ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-[#00BFA6]" />
                  <span>Loading contractors...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {contractors.map((contractor) => (
                  <Card key={contractor.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {contractor.user.name?.charAt(0) || 'C'}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{contractor.businessName}</h3>
                              <p className="text-gray-400">{contractor.user.name} • {contractor.user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`${
                                  contractor.isVerified 
                                    ? 'bg-green-900/30 text-green-400 border-green-500' 
                                    : 'bg-yellow-900/30 text-yellow-400 border-yellow-500'
                                }`}>
                                  {contractor.isVerified ? 'Verified' : 'Pending Verification'}
                                </Badge>
                                <Badge className="bg-blue-900/30 text-blue-400 border-blue-500">
                                  {contractor.availability}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">{contractor.city}, {contractor.state}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">{contractor.experience} years experience</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">${contractor.hourlyRate}/hour</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Services Offered</h4>
                            <div className="flex flex-wrap gap-2">
                              {contractor.services.slice(0, 5).map((service: string, index: number) => (
                                <Badge key={index} className="bg-[#00BFA6] text-white text-xs">
                                  {service}
                                </Badge>
                              ))}
                              {contractor.services.length > 5 && (
                                <Badge className="bg-gray-600 text-white text-xs">
                                  +{contractor.services.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {contractor.bio && (
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{contractor.bio}</p>
                          )}

                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{contractor.rating.toFixed(1)} ({contractor.totalJobs} jobs)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Joined {new Date(contractor.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              setSelectedContractor(contractor);
                              setShowContractorModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          
                          {!contractor.isVerified && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleContractorVerification(contractor.id, 'verify')}
                                disabled={actionLoading === contractor.id}
                              >
                                {actionLoading === contractor.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                Verify
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                                onClick={() => handleContractorVerification(contractor.id, 'reject')}
                                disabled={actionLoading === contractor.id}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {contractors.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                      <Shield className="h-12 w-12 mx-auto mb-2" />
                      <p>No contractors found</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contractor Details Modal */}
            <Dialog open={showContractorModal} onOpenChange={setShowContractorModal}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    Contractor Profile Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Review contractor information and manage verification status
                  </DialogDescription>
                </DialogHeader>
                
                {selectedContractor && (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="text-center pb-4 border-b border-gray-600">
                      <div className="w-20 h-20 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-3xl">
                          {selectedContractor.user.name?.charAt(0) || 'C'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{selectedContractor.businessName}</h3>
                      <p className="text-gray-400 text-lg mb-2">{selectedContractor.user.name}</p>
                      <p className="text-gray-500 text-sm mb-3">{selectedContractor.user.email}</p>
                      <div className="flex items-center justify-center space-x-2">
                        <Badge className={`${
                          selectedContractor.isVerified 
                            ? 'bg-green-900/30 text-green-400 border-green-500' 
                            : 'bg-yellow-900/30 text-yellow-400 border-yellow-500'
                        }`}>
                          {selectedContractor.isVerified ? 'Verified' : 'Pending Verification'}
                        </Badge>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-500">
                          {selectedContractor.availability}
                        </Badge>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-[#00BFA6] flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{selectedContractor.user.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-[#00BFA6] flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{selectedContractor.phone}</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-[#00BFA6] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{selectedContractor.address}, {selectedContractor.city}, {selectedContractor.state} {selectedContractor.zipCode}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Business Details */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Business Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Experience</span>
                          <span className="text-white font-medium">{selectedContractor.experience} years</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Hourly Rate</span>
                          <span className="text-white font-medium">${selectedContractor.hourlyRate}/hour</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Rating</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-white font-medium">{selectedContractor.rating.toFixed(1)} ({selectedContractor.totalJobs} jobs)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Services */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Services Offered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedContractor.services.map((service: string, index: number) => (
                            <Badge key={index} className="bg-[#00BFA6] text-white text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Service Areas */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Service Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedContractor.serviceAreas.map((area: string, index: number) => (
                            <Badge key={index} className="bg-blue-600 text-white text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Bio */}
                    {selectedContractor.bio && (
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-white">About</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 text-sm leading-relaxed">{selectedContractor.bio}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-600">
                      {!selectedContractor.isVerified && (
                        <div className="flex space-x-3">
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              handleContractorVerification(selectedContractor.id, 'verify');
                              setShowContractorModal(false);
                            }}
                            disabled={actionLoading === selectedContractor.id}
                          >
                            {actionLoading === selectedContractor.id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Verify Contractor
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            onClick={() => {
                              handleContractorVerification(selectedContractor.id, 'reject');
                              setShowContractorModal(false);
                            }}
                            disabled={actionLoading === selectedContractor.id}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => setShowContractorModal(false)}
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Clients & Services</h3>
                <p className="text-gray-400 mt-1">Manage all clients and their service requests</p>
              </div>
            </div>

            {/* Client Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Clients</p>
                      <p className="text-2xl font-bold text-white">{clients.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Services</p>
                      <p className="text-2xl font-bold text-white">{clientServices.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-white">
                        {clientServices.filter((s: any) => s.status === 'COMPLETED').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-white">
                        {clientServices.filter((s: any) => s.status === 'PENDING').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clients List */}
            {loadingClients ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-[#00BFA6]" />
                  <span>Loading clients...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">All Clients</h4>
                {clients.map((client) => (
                  <Card key={client.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {client.name?.charAt(0) || 'C'}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{client.name}</h3>
                              <p className="text-gray-400">{client.email}</p>
                              <p className="text-sm text-gray-500">
                                Joined {new Date(client.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">
                                {clientServices.filter((s: any) => s.userId === client.id).length} services
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">
                                ${clientServices
                                  .filter((s: any) => s.userId === client.id && s.budget)
                                  .reduce((sum: number, s: any) => sum + (s.budget || 0), 0)
                                  .toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                              <span className="text-gray-300">
                                {clientServices.filter((s: any) => s.userId === client.id && s.status === 'COMPLETED').length} completed
                              </span>
                            </div>
                          </div>

                          {/* Recent Services */}
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-300 mb-2">Recent Services</h5>
                            <div className="space-y-2">
                              {clientServices
                                .filter((s: any) => s.userId === client.id)
                                .slice(0, 3)
                                .map((service: any) => (
                                  <div key={service.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                    <div>
                                      <p className="text-sm text-white">{service.serviceTitle}</p>
                                      <p className="text-xs text-gray-400">{service.serviceCategory}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge className={`text-xs ${
                                        service.status === 'COMPLETED' ? 'bg-green-900/30 text-green-400' :
                                        service.status === 'IN_PROGRESS' ? 'bg-blue-900/30 text-blue-400' :
                                        'bg-yellow-900/30 text-yellow-400'
                                      }`}>
                                        {service.status}
                                      </Badge>
                                      {service.budget && (
                                        <span className="text-xs text-gray-300">${service.budget}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {clients.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                      <Users className="h-12 w-12 mx-auto mb-2" />
                      <p>No clients found</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'white-label':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">White Label Management</h3>
                <p className="text-gray-400 mt-1">Manage white-label clients and their configurations</p>
              </div>
            </div>

            {/* White Label Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Clients</p>
                      <p className="text-2xl font-bold text-white">{whiteLabelStats.totalClients}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Active Clients</p>
                      <p className="text-2xl font-bold text-white">{whiteLabelStats.activeClients}</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">${whiteLabelStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* White Label Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Client Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage white-label client accounts and configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Clients</span>
                      <span className="text-white font-medium">{whiteLabelStats.totalClients}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Active Clients</span>
                      <span className="text-white font-medium">{whiteLabelStats.activeClients}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Average Service Value</span>
                      <span className="text-white font-medium">${whiteLabelStats.averageServiceValue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Service Analytics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track service performance and client satisfaction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Services</span>
                      <span className="text-white font-medium">{whiteLabelStats.totalServices}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Completed Services</span>
                      <span className="text-white font-medium">{whiteLabelStats.completedServices}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Completion Rate</span>
                      <span className="text-white font-medium">
                        {whiteLabelStats.totalServices > 0 
                          ? ((whiteLabelStats.completedServices / whiteLabelStats.totalServices) * 100).toFixed(1)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* White Label Configuration */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">White Label Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure branding, features, and customization options for clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Branding Options</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">Custom Logo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">Custom Colors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">Custom Domain</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Feature Access</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">Lead Generation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">CRM System</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-300">Analytics Dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure system parameters and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Lead Scoring Threshold</h4>
                      <p className="text-sm text-gray-400">Minimum score for high-value leads</p>
                    </div>
                    <Badge className="bg-[#00BFA6] text-white">70</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Matching Algorithm</h4>
                      <p className="text-sm text-gray-400">Contractor matching system</p>
                    </div>
                    <Badge className="bg-green-900/30 text-green-400 border-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Auto-Matching</h4>
                      <p className="text-sm text-gray-400">Automatically find contractors for new requests</p>
                    </div>
                    <Badge className="bg-green-900/30 text-green-400 border-green-500">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Service Preferences Management</h3>
                <p className="text-gray-400 mt-1">Manage service categories, services, and themes for client onboarding</p>
              </div>
              <Button 
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                onClick={() => setActiveTab('preferences-management')}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Manage Preferences
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Service Categories</p>
                      <p className="text-2xl font-bold text-white">5</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Individual Services</p>
                      <p className="text-2xl font-bold text-white">20+</p>
                    </div>
                    <Wrench className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Available Themes</p>
                      <p className="text-2xl font-bold text-white">4</p>
                    </div>
                    <Palette className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Active Configurations</p>
                      <p className="text-2xl font-bold text-white">100%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Management Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Service Categories
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage service categories with themes and icons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Emergency Services</span>
                      <Badge className="bg-red-900/30 text-red-400 border-red-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Water Damage Restoration</span>
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fire Damage Restoration</span>
                      <Badge className="bg-orange-900/30 text-orange-400 border-orange-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Construction & Renovation</span>
                      <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Professional Services</span>
                      <Badge className="bg-purple-900/30 text-purple-400 border-purple-500">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-purple-500" />
                    Theme Management
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize themes and branding for different service categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-gray-300">Emergency Theme</span>
                      </div>
                      <Badge className="bg-green-900/30 text-green-400 border-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                        <span className="text-gray-300">Restoration Theme</span>
                      </div>
                      <Badge className="bg-green-900/30 text-green-400 border-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                        <span className="text-gray-300">Construction Theme</span>
                      </div>
                      <Badge className="bg-green-900/30 text-green-400 border-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-gray-300">Professional Theme</span>
                      </div>
                      <Badge className="bg-green-900/30 text-green-400 border-green-500">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your service preferences and client onboarding experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => setActiveTab('preferences-management')}
                  >
                    <Palette className="h-6 w-6" />
                    <span className="text-sm font-medium">Manage Themes</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => setActiveTab('preferences-management')}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm font-medium">Service Categories</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => setActiveTab('preferences-management')}
                  >
                    <Wrench className="h-6 w-6" />
                    <span className="text-sm font-medium">Individual Services</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'preferences-management':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Preferences Management</h3>
                <p className="text-gray-400 mt-1">Manage service categories, services, and themes</p>
              </div>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => setActiveTab('preferences')}
              >
                ← Back to Overview
              </Button>
            </div>

            {/* Management Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Categories Management */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Service Categories
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage service categories and their themes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🚨</div>
                        <div>
                          <h4 className="font-semibold text-white">Emergency Services</h4>
                          <p className="text-sm text-gray-400">24/7 emergency response</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">💧</div>
                        <div>
                          <h4 className="font-semibold text-white">Water Damage Restoration</h4>
                          <p className="text-sm text-gray-400">Water damage cleanup services</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🔥</div>
                        <div>
                          <h4 className="font-semibold text-white">Fire Damage Restoration</h4>
                          <p className="text-sm text-gray-400">Fire damage cleanup services</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white"
                      onClick={() => setShowAddCategoryModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Category
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Themes Management */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-purple-500" />
                    Theme Management
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Create and manage themes for service categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full bg-red-500"></div>
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Emergency Theme</h4>
                          <p className="text-sm text-gray-400">Red/Orange color scheme</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <div className="w-4 h-4 rounded-full bg-lime-500"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Restoration Theme</h4>
                          <p className="text-sm text-gray-400">Teal/Green color scheme</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Construction Theme</h4>
                          <p className="text-sm text-gray-400">Orange/Yellow color scheme</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#7C4DFF] hover:bg-[#6B46C1] text-white"
                      onClick={() => setShowAddThemeModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Theme
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Services Management */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Wrench className="h-5 w-5 mr-2 text-green-500" />
                    Individual Services
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage specific services within categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🚨</div>
                        <div>
                          <h4 className="font-semibold text-white">24/7 Emergency Response</h4>
                          <p className="text-sm text-gray-400">Emergency Services</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">💧</div>
                        <div>
                          <h4 className="font-semibold text-white">Water Extraction</h4>
                          <p className="text-sm text-gray-400">Water Damage Restoration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🔥</div>
                        <div>
                          <h4 className="font-semibold text-white">Smoke Damage Cleanup</h4>
                          <p className="text-sm text-gray-400">Fire Damage Restoration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white"
                      onClick={() => setShowAddServiceModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  // Modal Components
  const AddCategoryModal = () => {
    if (!showAddCategoryModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Add New Category</h3>
            <button
              onClick={() => setShowAddCategoryModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon
              </label>
              <input
                type="text"
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                placeholder="Icon name (e.g., home, wrench)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme
              </label>
              <input
                type="text"
                value={newCategory.theme}
                onChange={(e) => setNewCategory({ ...newCategory, theme: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                placeholder="Theme identifier"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={newCategory.sortOrder}
                onChange={(e) => setNewCategory({ ...newCategory, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddCategoryModal(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCategory}
              disabled={loading}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const AddThemeModal = () => {
    if (!showAddThemeModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Add New Theme</h3>
            <button
              onClick={() => setShowAddThemeModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme Name *
            </label>
            <input
              type="text"
              value={newTheme.name}
              onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
              placeholder="Enter theme name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Identifier *
            </label>
            <input
              type="text"
              value={newTheme.identifier}
              onChange={(e) => setNewTheme({ ...newTheme, identifier: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
              placeholder="theme-identifier"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newTheme.primaryColor}
                  onChange={(e) => setNewTheme({ ...newTheme, primaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newTheme.primaryColor}
                  onChange={(e) => setNewTheme({ ...newTheme, primaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newTheme.secondaryColor}
                  onChange={(e) => setNewTheme({ ...newTheme, secondaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newTheme.secondaryColor}
                  onChange={(e) => setNewTheme({ ...newTheme, secondaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Accent Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newTheme.accentColor}
                  onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newTheme.accentColor}
                  onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Background Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newTheme.backgroundColor}
                  onChange={(e) => setNewTheme({ ...newTheme, backgroundColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newTheme.backgroundColor}
                  onChange={(e) => setNewTheme({ ...newTheme, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Text Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={newTheme.textColor}
                onChange={(e) => setNewTheme({ ...newTheme, textColor: e.target.value })}
                className="w-12 h-10 rounded border border-gray-600"
              />
              <input
                type="text"
                value={newTheme.textColor}
                onChange={(e) => setNewTheme({ ...newTheme, textColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAddThemeModal(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTheme}
            disabled={loading}
            className="bg-[#7C4DFF] hover:bg-[#6B46C1] text-white"
          >
            {loading ? 'Creating...' : 'Create Theme'}
          </Button>
        </div>
      </div>
    </div>
  );
  };

  const AddServiceModal = () => {
    if (!showAddServiceModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Add New Service</h3>
            <button
              onClick={() => setShowAddServiceModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={newService.categoryId}
              onChange={(e) => setNewService({ ...newService, categoryId: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
            >
              <option value="">Select a category</option>
              <option value="cat-1">Home Services</option>
              <option value="cat-2">Business Services</option>
              <option value="cat-3">Emergency Services</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Enter service name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Enter service description"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <input
              type="text"
              value={newService.icon}
              onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Icon name (e.g., wrench, home)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <input
              type="text"
              value={newService.theme}
              onChange={(e) => setNewService({ ...newService, theme: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Theme identifier"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              value={newService.sortOrder}
              onChange={(e) => setNewService({ ...newService, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAddServiceModal(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateService}
            disabled={loading}
            className="bg-[#2196F3] hover:bg-[#1976D2] text-white"
          >
            {loading ? 'Creating...' : 'Create Service'}
          </Button>
        </div>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 shadow-xl border-r border-gray-700">
          <nav className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
              <p className="text-sm text-gray-400">System Management</p>
            </div>
            
            <div className="space-y-2 flex-1 p-4">
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 relative ${
                  activeTab === 'overview'
                    ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                <span className="font-medium">Overview</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-left transition-all duration-200 relative hover:bg-gray-700 hover:text-white text-gray-300"
                onClick={() => router.push('/dashboard/admin/jobs/live')}
              >
                <Activity className="h-5 w-5 mr-3" />
                <span className="font-medium">Live Jobs</span>
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                  Live
                </span>
              </Button>


              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 relative ${
                  activeTab === 'contractors' 
                    ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('contractors')}
              >
                <Users className="h-5 w-5 mr-3" />
                <span className="font-medium">Contractors</span>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 relative ${
                  activeTab === 'clients' 
                    ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('clients')}
              >
                <FileText className="h-5 w-5 mr-3" />
                <span className="font-medium">Clients & Services</span>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 relative ${
                  activeTab === 'white-label' 
                    ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('white-label')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span className="font-medium">White Label</span>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 relative ${
                  activeTab === 'preferences' 
                    ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('preferences')}
              >
                <Palette className="h-5 w-5 mr-3" />
                <span className="font-medium">Preferences</span>
              </Button>

            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="h-full overflow-y-auto bg-gray-900">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      
      {/* Modals */}
      <AddCategoryModal />
      <AddThemeModal />
      <AddServiceModal />
    </div>
  );
}

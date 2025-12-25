'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Globe,
  Building,
  Settings,
  Loader2
} from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  industry?: string;
  isActive: boolean;
  createdAt: string;
  userCount: number;
  requestCount: number;
}

export default function TenantsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    subdomain: '',
    logo: '',
    primaryColor: '#00BFA6',
    secondaryColor: '#7C4DFF',
    industry: 'restoration',
    customCss: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType !== 'ADMIN') {
      router.push('/dashboard');
    } else if (user && user.userType === 'ADMIN') {
      fetchTenants();
    }
  }, [user, loading, router]);

  const fetchTenants = async () => {
    try {
      setLoadingTenants(true);
      // Mock data for now - replace with actual API call
      const mockTenants: Tenant[] = [
        {
          id: '1',
          name: 'Restoration Pro',
          domain: 'restorationpro.com',
          subdomain: 'restorationpro',
          logo: '/placeholder-logo.png',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          industry: 'restoration',
          isActive: true,
          createdAt: '2024-01-15',
          userCount: 150,
          requestCount: 89
        },
        {
          id: '2',
          name: 'HealthConnect',
          domain: 'healthconnect.com.au',
          subdomain: 'healthconnect',
          logo: '/placeholder-logo.png',
          primaryColor: '#EF4444',
          secondaryColor: '#F59E0B',
          industry: 'healthcare',
          isActive: true,
          createdAt: '2024-02-01',
          userCount: 75,
          requestCount: 45
        },
        {
          id: '3',
          name: 'LegalMatch',
          domain: 'legalmatch.com.au',
          subdomain: 'legalmatch',
          logo: '/placeholder-logo.png',
          primaryColor: '#3B82F6',
          secondaryColor: '#1E40AF',
          industry: 'legal',
          isActive: false,
          createdAt: '2024-01-20',
          userCount: 25,
          requestCount: 12
        }
      ];
      setTenants(mockTenants);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setLoadingTenants(false);
    }
  };

  const handleCreateTenant = async () => {
    try {
      setCreateLoading(true);
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTenant),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewTenant({
          name: '',
          domain: '',
          subdomain: '',
          logo: '',
          primaryColor: '#00BFA6',
          secondaryColor: '#7C4DFF',
          industry: 'restoration',
          customCss: ''
        });
        fetchTenants();
      }
    } catch (error) {
      console.error('Failed to create tenant:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.subdomain?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || tenant.industry === industryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tenant.isActive) ||
                         (statusFilter === 'inactive' && !tenant.isActive);
    
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600">Manage white-label platform instances</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tenant</DialogTitle>
              <DialogDescription>
                Set up a new white-label platform instance for a client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Client company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={newTenant.industry}
                    onValueChange={(value) => setNewTenant(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restoration">Restoration</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={newTenant.domain}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, domain: e.target.value }))}
                    placeholder="client.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <Input
                    id="subdomain"
                    value={newTenant.subdomain}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, subdomain: e.target.value }))}
                    placeholder="client"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={newTenant.logo}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={newTenant.primaryColor}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, primaryColor: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={newTenant.secondaryColor}
                    onChange={(e) => setNewTenant(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea
                  id="customCss"
                  value={newTenant.customCss}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, customCss: e.target.value }))}
                  placeholder="Custom CSS styles..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTenant} disabled={createLoading}>
                  {createLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Tenant'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="restoration">Restoration</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tenants Grid */}
      {loadingTenants ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {tenant.logo && (
                      <Image src={tenant.logo} alt={tenant.name} width={32} height={32} className="rounded" unoptimized={tenant.logo?.startsWith('http')} />
                    )}
                    <div>
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <CardDescription>
                        {tenant.domain || `${tenant.subdomain}.platform.com`}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={tenant.isActive ? 'default' : 'secondary'}>
                    {tenant.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Industry:</span>
                    <Badge variant="outline" className="capitalize">
                      {tenant.industry}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Users:</span>
                      <span className="ml-2 font-medium">{tenant.userCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Requests:</span>
                      <span className="ml-2 font-medium">{tenant.requestCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(tenant.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTenants.length === 0 && !loadingTenants && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || industryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first tenant.'}
          </p>
        </div>
      )}
    </div>
  );
}

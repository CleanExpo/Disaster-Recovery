'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Clock,
  DollarSign,
  Shield,
  Award,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

interface Contractor {
  id: string;
  businessName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  licenseNumber: string;
  insuranceProvider: string;
  insuranceExpiry: string;
  services: string[];
  serviceAreas: string[];
  hourlyRate: number;
  experience: number;
  rating: number;
  totalJobs: number;
  bio: string;
  availability: string;
  isVerified: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    createdAt: string;
  };
}

export default function AdminContractorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.userType !== 'ADMIN')) {
      router.push('/');
    }
  }, [user, loading, router]);

  const fetchContractors = useCallback(async () => {
    try {
      setLoadingContractors(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/admin/contractors?${params}`, { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setContractors(data.contractors);
        setTotalPages(data.pagination.pages);
      } else {
        const error = await response.json();
        toast.error('Failed to load contractors', {
          description: error.error || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Error fetching contractors:', error);
    } finally {
      setLoadingContractors(false);
    }
  }, [currentPage, statusFilter, searchTerm]);

  useEffect(() => {
    if (user) {
      fetchContractors();
    }
  }, [user, fetchContractors]);

  const handleVerification = async (contractorId: string, action: 'verify' | 'reject') => {
    try {
      setActionLoading(contractorId);
      
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
        // Refresh the contractors list
        await fetchContractors();
        setSelectedContractor(null);
        
        // Show success toast
        toast.success(
          action === 'verify' 
            ? 'Contractor verified successfully!' 
            : 'Contractor rejected successfully!',
          {
            description: action === 'verify' 
              ? 'The contractor can now receive job matches.'
              : 'The contractor has been notified of the rejection.'
          }
        );
      } else {
        const error = await response.json();
        toast.error('Failed to update contractor status', {
          description: error.error || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Error updating verification:', error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#00BFA6]">Contractor Verification</span>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search contractors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <div className="space-y-6">
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
                          {contractor.services.slice(0, 5).map((service, index) => (
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
                        onClick={() => setSelectedContractor(contractor)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {!contractor.isVerified && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleVerification(contractor.id, 'verify')}
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
                            onClick={() => handleVerification(contractor.id, 'reject')}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-gray-400 px-4">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Contractor Details Modal */}
      {selectedContractor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-800 border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Contractor Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedContractor(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Business Name</label>
                    <p className="text-white">{selectedContractor.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Contact Person</label>
                    <p className="text-white">{selectedContractor.user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedContractor.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{selectedContractor.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400">Address</label>
                    <p className="text-white">
                      {selectedContractor.address}, {selectedContractor.city}, {selectedContractor.state} {selectedContractor.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Professional Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Experience</label>
                    <p className="text-white">{selectedContractor.experience} years</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Hourly Rate</label>
                    <p className="text-white">${selectedContractor.hourlyRate}/hour</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Rating</label>
                    <p className="text-white">{selectedContractor.rating.toFixed(1)}/5 ({selectedContractor.totalJobs} jobs)</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Availability</label>
                    <p className="text-white">{selectedContractor.availability}</p>
                  </div>
                  {selectedContractor.licenseNumber && (
                    <div>
                      <label className="text-sm text-gray-400">License Number</label>
                      <p className="text-white">{selectedContractor.licenseNumber}</p>
                    </div>
                  )}
                  {selectedContractor.insuranceProvider && (
                    <div>
                      <label className="text-sm text-gray-400">Insurance Provider</label>
                      <p className="text-white">{selectedContractor.insuranceProvider}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Services & Areas</h4>
                <div className="mb-4">
                  <label className="text-sm text-gray-400">Services Offered</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContractor.services.map((service, index) => (
                      <Badge key={index} className="bg-[#00BFA6] text-white">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Service Areas</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContractor.serviceAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedContractor.bio && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Bio</h4>
                  <p className="text-gray-300">{selectedContractor.bio}</p>
                </div>
              )}

              {/* Actions */}
              {!selectedContractor.isVerified && (
                <div className="flex space-x-3 pt-4 border-t border-gray-700">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleVerification(selectedContractor.id, 'verify');
                      setSelectedContractor(null);
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
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    onClick={() => {
                      handleVerification(selectedContractor.id, 'reject');
                      setSelectedContractor(null);
                    }}
                    disabled={actionLoading === selectedContractor.id}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

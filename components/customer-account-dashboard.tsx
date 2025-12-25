'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertCircle, Calendar, MapPin, Phone, Mail, DollarSign, Clock, CheckCircle, FileText, Settings, LogOut } from 'lucide-react';

interface Booking {
  id: string;
  serviceType: string;
  emergencyLevel: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  scheduledDate?: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  estimatedCostAUD: number;
  finalCostAUD?: number;
  contractor?: {
    name: string;
    company: string;
    rating: number;
    phone: string;
  };
  description: string;
  damagePhotos: string[];
}

interface Claim {
  id: string;
  claimNumber: string;
  status: 'DRAFT' | 'SUBMITTED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PAID';
  bookingId: string;
  insuranceProvider: string;
  policyNumber: string;
  claimAmountAUD: number;
  approvedAmountAUD?: number;
  submittedDate?: string;
  approvalDate?: string;
  rejectionReason?: string;
  damageDescription: string;
}

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  insuranceProvider?: string;
  policyNumber?: string;
  totalBookingsCount: number;
  totalClaimsCount: number;
  totalSpentAUD: number;
  joinedDate: string;
  profileCompletion: number;
}

interface DashboardData {
  profile: CustomerProfile;
  bookings: Booking[];
  claims: Claim[];
  insuranceDetails: Array<{
    provider: string;
    policyNumber: string;
    coverageType: string;
    status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
    expiryDate: string;
  }>;
}

export default function CustomerAccountDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data
      const mockData: DashboardData = {
        profile: {
          id: 'cust-001',
          name: 'James Wilson',
          email: 'james.wilson@email.com',
          phone: '02 9876 5432',
          address: '123 Main Street',
          suburb: 'Sydney',
          postcode: '2000',
          state: 'NSW',
          insuranceProvider: 'NRMA',
          policyNumber: 'POL-20251122-001',
          totalBookingsCount: 5,
          totalClaimsCount: 3,
          totalSpentAUD: 24_560,
          joinedDate: '2023-06-15',
          profileCompletion: 100,
        },
        bookings: [
          {
            id: 'book-001',
            serviceType: 'WATER_DAMAGE',
            emergencyLevel: 'URGENT',
            status: 'COMPLETED',
            createdAt: '2025-12-10',
            scheduledDate: '2025-12-11',
            address: '123 Main Street',
            suburb: 'Sydney',
            postcode: '2000',
            state: 'NSW',
            estimatedCostAUD: 4_500,
            finalCostAUD: 5_200,
            contractor: {
              name: 'John Smith',
              company: 'Sydney Restoration Pro',
              rating: 4.9,
              phone: '0411 222 333',
            },
            description: 'Burst pipe causing water damage to living room',
            damagePhotos: ['https://via.placeholder.com/200'],
          },
          {
            id: 'book-002',
            serviceType: 'STORM_DAMAGE',
            emergencyLevel: 'HIGH',
            status: 'COMPLETED',
            createdAt: '2025-11-20',
            scheduledDate: '2025-11-21',
            address: '123 Main Street',
            suburb: 'Sydney',
            postcode: '2000',
            state: 'NSW',
            estimatedCostAUD: 3_800,
            finalCostAUD: 3_950,
            contractor: {
              name: 'Maria Rodriguez',
              company: 'Sydney Rapid Response',
              rating: 4.7,
              phone: '0412 333 444',
            },
            description: 'Roof damaged by hail and wind',
            damagePhotos: ['https://via.placeholder.com/200'],
          },
          {
            id: 'book-003',
            serviceType: 'MOLD_REMEDIATION',
            emergencyLevel: 'MEDIUM',
            status: 'COMPLETED',
            createdAt: '2025-10-05',
            scheduledDate: '2025-10-07',
            address: '123 Main Street',
            suburb: 'Sydney',
            postcode: '2000',
            state: 'NSW',
            estimatedCostAUD: 2_800,
            finalCostAUD: 2_650,
            contractor: {
              name: 'David Chen',
              company: 'Mold Solutions Sydney',
              rating: 4.6,
              phone: '0413 444 555',
            },
            description: 'Mold growth in basement',
            damagePhotos: ['https://via.placeholder.com/200'],
          },
        ],
        claims: [
          {
            id: 'claim-001',
            claimNumber: 'NRMA-2025-001234',
            status: 'APPROVED',
            bookingId: 'book-001',
            insuranceProvider: 'NRMA',
            policyNumber: 'POL-20251122-001',
            claimAmountAUD: 5_200,
            approvedAmountAUD: 5_200,
            submittedDate: '2025-12-12',
            approvalDate: '2025-12-19',
            damageDescription: 'Water damage from burst pipe',
          },
          {
            id: 'claim-002',
            claimNumber: 'NRMA-2025-001235',
            status: 'APPROVED',
            bookingId: 'book-002',
            insuranceProvider: 'NRMA',
            policyNumber: 'POL-20251122-001',
            claimAmountAUD: 3_950,
            approvedAmountAUD: 3_950,
            submittedDate: '2025-11-22',
            approvalDate: '2025-11-29',
            damageDescription: 'Storm damage to roof',
          },
          {
            id: 'claim-003',
            claimNumber: 'NRMA-2025-001236',
            status: 'APPROVED',
            bookingId: 'book-003',
            insuranceProvider: 'NRMA',
            policyNumber: 'POL-20251122-001',
            claimAmountAUD: 2_650,
            approvedAmountAUD: 2_650,
            submittedDate: '2025-10-08',
            approvalDate: '2025-10-15',
            damageDescription: 'Mold remediation',
          },
        ],
        insuranceDetails: [
          {
            provider: 'NRMA',
            policyNumber: 'POL-20251122-001',
            coverageType: 'Home & Contents',
            status: 'ACTIVE',
            expiryDate: '2026-06-30',
          },
        ],
      };

      setDashboardData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center text-red-600">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        {error || 'Failed to load customer dashboard'}
      </div>
    );
  }

  const profile = dashboardData.profile;
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
      case 'REJECTED':
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmergencyColor = (level: string) => {
    switch (level) {
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {profile.name}!</h1>
          <p className="text-gray-600 mt-1">Manage your bookings, claims, and insurance</p>
        </div>
        <Button variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Profile Completion */}
      {profile.profileCompletion < 100 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-blue-900">
              Profile {profile.profileCompletion}% complete
            </p>
            <div className="h-2 bg-blue-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${profile.profileCompletion}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{profile.totalBookingsCount}</p>
                <p className="text-sm text-gray-600 mt-2">Service requests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Insurance Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{profile.totalClaimsCount}</p>
                <p className="text-sm text-gray-600 mt-2">Submitted & processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${(profile.totalSpentAUD / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600 mt-2">On restoration services</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{booking.serviceType.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-gray-600">{booking.address}, {booking.suburb} {booking.postcode}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getEmergencyColor(booking.emergencyLevel)}`}>
                          {booking.emergencyLevel}
                        </span>
                        {booking.contractor && (
                          <span className="text-gray-600">Contractor: {booking.contractor.name}</span>
                        )}
                      </div>
                      <span className="font-semibold">${(booking.finalCostAUD || booking.estimatedCostAUD).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              {dashboardData.bookings.length > 3 && (
                <Button variant="outline" className="w-full mt-4">
                  View All Bookings
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Insurance Coverage */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.insuranceDetails.map((insurance, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{insurance.provider}</p>
                        <p className="text-sm text-gray-600">Policy: {insurance.policyNumber}</p>
                        <p className="text-sm text-gray-600">Type: {insurance.coverageType}</p>
                      </div>
                      <Badge className={getStatusColor(insurance.status)}>
                        {insurance.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Expires: {new Date(insurance.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>{dashboardData.bookings.length} total bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.bookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-lg">{booking.serviceType.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-gray-600">{booking.address}</p>
                        <p className="text-sm text-gray-600">{booking.suburb}, {booking.postcode} {booking.state}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-2">${(booking.finalCostAUD || booking.estimatedCostAUD).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Created</p>
                        <p className="font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Severity</p>
                        <Badge className={getEmergencyColor(booking.emergencyLevel)}>
                          {booking.emergencyLevel}
                        </Badge>
                      </div>
                    </div>

                    {booking.contractor && (
                      <div className="p-3 bg-gray-50 rounded mb-3">
                        <p className="font-semibold text-sm">Assigned Contractor</p>
                        <p className="text-sm">{booking.contractor.name} - {booking.contractor.company}</p>
                        <p className="text-sm text-gray-600">⭐ {booking.contractor.rating} | {booking.contractor.phone}</p>
                      </div>
                    )}

                    <p className="text-sm text-gray-700">{booking.description}</p>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">View Details</Button>
                      {booking.status === 'COMPLETED' && (
                        <Button size="sm" variant="outline">Submit Claim</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>{dashboardData.claims.length} total claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.claims.map((claim) => (
                  <div key={claim.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-lg">{claim.claimNumber}</p>
                        <p className="text-sm text-gray-600">{claim.insuranceProvider} - {claim.policyNumber}</p>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Claim Amount</p>
                        <p className="font-semibold">${claim.claimAmountAUD.toLocaleString()}</p>
                      </div>
                      {claim.approvedAmountAUD && (
                        <div>
                          <p className="text-gray-600">Approved Amount</p>
                          <p className="font-semibold text-green-600">${claim.approvedAmountAUD.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-700 mb-3">
                      <p className="font-medium mb-1">Damage Description</p>
                      <p>{claim.damageDescription}</p>
                    </div>

                    {claim.submittedDate && (
                      <p className="text-sm text-gray-600">
                        Submitted: {new Date(claim.submittedDate).toLocaleDateString()}
                      </p>
                    )}

                    {claim.approvalDate && (
                      <p className="text-sm text-green-600 font-medium">
                        Approved: {new Date(claim.approvalDate).toLocaleDateString()}
                      </p>
                    )}

                    {claim.rejectionReason && (
                      <p className="text-sm text-red-600 mt-2">
                        Rejection Reason: {claim.rejectionReason}
                      </p>
                    )}

                    <Button size="sm" variant="outline" className="mt-3">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>View and manage your account details</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-medium mt-1">{profile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <p className="text-lg font-medium mt-1">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <p className="text-lg font-medium mt-1">{profile.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-lg font-medium mt-1">{new Date(profile.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Street Address</label>
                    <p className="text-lg font-medium mt-1">{profile.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Suburb</label>
                    <p className="text-lg font-medium mt-1">{profile.suburb}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Postcode</label>
                    <p className="text-lg font-medium mt-1">{profile.postcode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">State</label>
                    <p className="text-lg font-medium mt-1">{profile.state}</p>
                  </div>
                </div>
              </div>

              {profile.insuranceProvider && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Insurance Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Provider</label>
                      <p className="text-lg font-medium mt-1">{profile.insuranceProvider}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Policy Number</label>
                      <p className="text-lg font-medium mt-1">{profile.policyNumber}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold mt-2">{profile.totalBookingsCount}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Claims Submitted</p>
                <p className="text-3xl font-bold mt-2">{profile.totalClaimsCount}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold mt-2">${(profile.totalSpentAUD / 1000).toFixed(1)}K</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

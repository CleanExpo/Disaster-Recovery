'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  Eye,
  MessageSquare,
  Download,
  Refresh2,
  Loader2,
  Calendar,
  User,
  FileText,
  TrendingUp,
} from 'lucide-react';

interface Booking {
  id: string;
  australianServiceType: string;
  emergencyLevel: string;
  status: string;
  estimatedCostAUD: number;
  finalCostAUD?: number;
  address?: {
    street?: string;
    suburb?: string;
    postcode?: string;
    state?: string;
  };
  description: string;
  createdAt: string;
  contractor?: {
    businessName: string;
    rating?: number;
  };
  booking?: {
    id: string;
    status: string;
    estimatedCostAUD: number;
    australianServiceType: string;
  };
}

interface BookingTrackingDashboardProps {
  userId?: string;
}

const SERVICE_TYPE_LABELS: Record<string, string> = {
  WATER_DAMAGE: 'Water Damage',
  FIRE_DAMAGE: 'Fire Damage',
  SMOKE_DAMAGE: 'Smoke Damage',
  MOULD_REMEDIATION: 'Mould Remediation',
  ODOUR_REMEDIATION: 'Odour Remediation',
  CARPET_CLEANING: 'Carpet Cleaning',
  COMMERCIAL_WATER_DAMAGE: 'Commercial Water Damage',
  COMMERCIAL_FIRE_DAMAGE: 'Commercial Fire Damage',
  COMMERCIAL_MOULD: 'Commercial Mould',
  CRIME_SCENE_CLEANING: 'Crime Scene Cleaning',
  BIOHAZARD_REMEDIATION: 'Biohazard Remediation',
  HOARDING_CLEANUP: 'Hoarding Cleanup',
  VANDALISM_CLEANUP: 'Vandalism Cleanup',
  GENERAL_RESTORATION: 'General Restoration',
};

const EMERGENCY_LEVEL_COLORS: Record<string, { badge: string; text: string }> = {
  URGENT: { badge: 'bg-red-900/30 text-red-400 border-red-500', text: 'Urgent (< 2 hrs)' },
  HIGH: { badge: 'bg-orange-900/30 text-orange-400 border-orange-500', text: 'High (Same day)' },
  STANDARD: { badge: 'bg-blue-900/30 text-blue-400 border-blue-500', text: 'Standard (Next day)' },
  SCHEDULED: { badge: 'bg-green-900/30 text-green-400 border-green-500', text: 'Scheduled' },
};

const BOOKING_STATUS_COLORS: Record<string, { badge: string; icon: React.ReactNode }> = {
  PENDING: {
    badge: 'bg-yellow-900/30 text-yellow-400 border-yellow-500',
    icon: <Clock className="h-4 w-4" />,
  },
  CONFIRMED: {
    badge: 'bg-blue-900/30 text-blue-400 border-blue-500',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  IN_PROGRESS: {
    badge: 'bg-purple-900/30 text-purple-400 border-purple-500',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  COMPLETED: {
    badge: 'bg-green-900/30 text-green-400 border-green-500',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  CANCELLED: {
    badge: 'bg-red-900/30 text-red-400 border-red-500',
    icon: <AlertCircle className="h-4 w-4" />,
  },
};

const getStatusStep = (status: string): number => {
  const steps: Record<string, number> = {
    PENDING: 1,
    CONFIRMED: 2,
    IN_PROGRESS: 3,
    COMPLETED: 4,
    CANCELLED: 0,
  };
  return steps[status] || 0;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function BookingTrackingDashboard({ userId }: BookingTrackingDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings', { cache: 'no-store' });

      if (response.status === 401) {
        setBookings([]);
        toast.error('Please sign in to view bookings');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch bookings');

      const result = await response.json();
      setBookings(result.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return booking.status === 'PENDING';
    if (activeFilter === 'active')
      return ['CONFIRMED', 'IN_PROGRESS'].includes(booking.status);
    if (activeFilter === 'completed') return booking.status === 'COMPLETED';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-[#00BFA6] animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-gray-400 mt-1">Track and manage your disaster recovery service requests</p>
        </div>
        <Button
          onClick={fetchBookings}
          className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
        >
          <Refresh2 className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Bookings' },
          { id: 'pending', label: 'Pending' },
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' },
        ].map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={activeFilter === filter.id ? 'default' : 'outline'}
            className={
              activeFilter === filter.id
                ? 'bg-[#00BFA6] text-white hover:bg-[#00A693]'
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }
          >
            {filter.label}
            <span className="ml-2 text-xs font-semibold">
              (
              {bookings.filter((b) => {
                if (filter.id === 'all') return true;
                if (filter.id === 'pending') return b.status === 'PENDING';
                if (filter.id === 'active') return ['CONFIRMED', 'IN_PROGRESS'].includes(b.status);
                if (filter.id === 'completed') return b.status === 'COMPLETED';
                return false;
              }).length}
              )
            </span>
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
            <p className="text-gray-400">
              {activeFilter === 'all'
                ? 'You haven\'t created any bookings yet.'
                : `No ${activeFilter} bookings at the moment.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const statusInfo = BOOKING_STATUS_COLORS[booking.status] || BOOKING_STATUS_COLORS.PENDING;
            const emergencyInfo = EMERGENCY_LEVEL_COLORS[booking.emergencyLevel];
            const currentStep = getStatusStep(booking.status);

            return (
              <Card
                key={booking.id}
                className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <CardContent className="p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {SERVICE_TYPE_LABELS[booking.australianServiceType] ||
                            booking.australianServiceType}
                        </h3>
                        <Badge className={emergencyInfo?.badge}>
                          {emergencyInfo?.text}
                        </Badge>
                        <Badge className={statusInfo.badge}>
                          <span className="flex items-center gap-1">
                            {statusInfo.icon}
                            {booking.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Booking ID: <span className="font-mono text-gray-300">{booking.id.slice(0, 8)}...</span>
                      </p>
                    </div>

                    {/* Cost Display */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-2xl font-bold text-[#00BFA6]">
                        <DollarSign className="h-6 w-6" />
                        {booking.finalCostAUD ? (
                          <>
                            <span className="line-through text-gray-400 text-base">
                              ${booking.estimatedCostAUD}
                            </span>
                            <span>${booking.finalCostAUD}</span>
                          </>
                        ) : (
                          <span>${booking.estimatedCostAUD}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {booking.finalCostAUD ? 'Final Cost' : 'Estimated Cost'}
                      </p>
                    </div>
                  </div>

                  {/* Location and Description */}
                  <div className="mb-4 pb-4 border-b border-gray-700 space-y-2">
                    {booking.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-[#00BFA6] mt-0.5 flex-shrink-0" />
                        <div className="text-gray-300">
                          {booking.address.street && <p>{booking.address.street}</p>}
                          {booking.address.suburb && (
                            <p>
                              {booking.address.suburb}, {booking.address.state}{' '}
                              {booking.address.postcode}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-gray-300 ml-6">{booking.description}</div>
                  </div>

                  {/* Status Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-400">Progress</p>
                      <p className="text-xs text-gray-400">{currentStep}/4 steps</p>
                    </div>
                    <div className="flex gap-2">
                      {['Pending', 'Confirmed', 'In Progress', 'Completed'].map((label, index) => (
                        <div key={index} className="flex-1">
                          <div
                            className={`h-2 rounded-full transition-colors ${
                              index < currentStep
                                ? 'bg-[#00BFA6]'
                                : index === currentStep
                                  ? 'bg-[#00BFA6]/50'
                                  : 'bg-gray-700'
                            }`}
                          />
                          <p className="text-xs text-gray-400 mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Details Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-700 p-2 rounded text-center">
                      <p className="text-xs text-gray-400">Created</p>
                      <p className="text-xs text-white font-medium">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {booking.contractor && (
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <p className="text-xs text-gray-400">Contractor</p>
                        <p className="text-xs text-white font-medium truncate">
                          {booking.contractor.businessName}
                        </p>
                      </div>
                    )}
                    {booking.contractor?.rating && (
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <p className="text-xs text-gray-400">Rating</p>
                        <p className="text-xs text-yellow-400 font-medium">
                          ⭐ {booking.contractor.rating.toFixed(1)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {booking.status !== 'CANCELLED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Open chat for booking:', booking.id);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-[#00BFA6] to-[#3B82F6]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl">
                    {SERVICE_TYPE_LABELS[selectedBooking.australianServiceType]}
                  </CardTitle>
                  <CardDescription className="text-gray-100">
                    Booking ID: {selectedBooking.id}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => setSelectedBooking(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Status Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white">Current Status</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      BOOKING_STATUS_COLORS[selectedBooking.status]?.badge ||
                      BOOKING_STATUS_COLORS.PENDING.badge
                    }
                  >
                    {selectedBooking.status}
                  </Badge>
                  <Badge className={EMERGENCY_LEVEL_COLORS[selectedBooking.emergencyLevel]?.badge}>
                    {EMERGENCY_LEVEL_COLORS[selectedBooking.emergencyLevel]?.text}
                  </Badge>
                </div>
              </div>

              {/* Location Section */}
              {selectedBooking.address && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Service Location
                  </h3>
                  <div className="bg-gray-700 p-3 rounded text-sm text-gray-300">
                    {selectedBooking.address.street && (
                      <p>{selectedBooking.address.street}</p>
                    )}
                    {selectedBooking.address.suburb && (
                      <p>
                        {selectedBooking.address.suburb}, {selectedBooking.address.state}{' '}
                        {selectedBooking.address.postcode}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white">Damage Description</h3>
                <p className="bg-gray-700 p-3 rounded text-sm text-gray-300">
                  {selectedBooking.description}
                </p>
              </div>

              {/* Cost Details */}
              <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#3B82F6]/10 border-2 border-[#00BFA6] p-4 rounded space-y-2">
                <p className="text-sm text-gray-400">Cost Summary</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Estimated Cost:</span>
                  <span className="text-lg font-bold text-[#00BFA6]">
                    ${selectedBooking.estimatedCostAUD}
                  </span>
                </div>
                {selectedBooking.finalCostAUD && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Final Cost:</span>
                    <span className="text-lg font-bold text-[#00BFA6]">
                      ${selectedBooking.finalCostAUD}
                    </span>
                  </div>
                )}
              </div>

              {/* Contractor Info */}
              {selectedBooking.contractor && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Assigned Contractor
                  </h3>
                  <div className="bg-gray-700 p-3 rounded space-y-1">
                    <p className="font-medium text-white">
                      {selectedBooking.contractor.businessName}
                    </p>
                    {selectedBooking.contractor.rating && (
                      <p className="text-sm text-gray-300">
                        Rating: <span className="text-yellow-400 font-semibold">
                          ⭐ {selectedBooking.contractor.rating.toFixed(1)}/5
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-2">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timeline
                </h3>
                <div className="bg-gray-700 p-3 rounded text-sm text-gray-300 space-y-1">
                  <p>
                    <span className="text-gray-400">Created:</span> {formatDate(selectedBooking.createdAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-600">
                <Button
                  className="flex-1 bg-[#00BFA6] hover:bg-[#00A693] text-white"
                  onClick={() => {
                    console.log('Open chat for booking:', selectedBooking.id);
                    setSelectedBooking(null);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Contractor
                </Button>
                {selectedBooking.status === 'PENDING' && (
                  <Button
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                    onClick={() => {
                      console.log('Cancel booking:', selectedBooking.id);
                      setSelectedBooking(null);
                    }}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

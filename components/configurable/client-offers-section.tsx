'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign,
  Clock,
  Calendar,
  MapPin,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Briefcase,
  Phone,
  Mail,
  Eye,
  Send,
  AlertCircle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

interface BidOffer {
  id: string;
  budget: string;
  timeline: string;
  message: string;
  startDate: string;
  estimatedHours: string;
  status: string;
  createdAt: string;
  contractor: {
    id: string;
    businessName: string;
    rating: number;
    experience: number;
    totalJobs: number;
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
    };
  };
  serviceRequest: {
    id: string;
    serviceTitle: string;
    serviceCategory: string;
    location: string;
    budget?: string;
    urgency: string;
  };
}

export default function ClientOffersSection() {
  const [offers, setOffers] = useState<BidOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<BidOffer | null>(null);
  const [showOfferDetails, setShowOfferDetails] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/client/offers', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers || []);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch offers');
        setOffers([]);
      }
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      setError('Network error. Please try again.');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAcceptOffer = async (offerId: string) => {
    try {
      const response = await fetch(`/api/client/offers/${offerId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Refresh offers to update status
        fetchOffers();
      }
    } catch (error) {
      console.error('Failed to accept offer:', error);
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    try {
      const response = await fetch(`/api/client/offers/${offerId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Refresh offers to update status
        fetchOffers();
      }
    } catch (error) {
      console.error('Failed to reject offer:', error);
    }
  };

  const handleViewOfferDetails = (offer: BidOffer) => {
    setSelectedOffer(offer);
    setShowOfferDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
      case 'accepted':
        return 'bg-green-900/30 text-green-400 border-green-500';
      case 'rejected':
        return 'bg-red-900/30 text-red-400 border-red-500';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'emergency':
        return 'bg-red-900/30 text-red-400 border-red-500';
      case 'urgent':
        return 'bg-orange-900/30 text-orange-400 border-orange-500';
      case 'standard':
        return 'bg-blue-900/30 text-blue-400 border-blue-500';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Contractor Offers</h2>
            <p className="text-white/80">Review and manage bids from qualified contractors</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{offers.length}</p>
            <p className="text-white/80">Total Offers</p>
          </div>
        </div>
      </div>

      {/* Offers List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-400 mb-2">Error Loading Offers</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button 
              onClick={fetchOffers}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : offers.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No Offers Yet</h3>
            <p className="text-gray-400 mb-4">
              Contractor offers will appear here once they submit bids on your service requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Offer Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{offer.serviceRequest.serviceTitle}</h3>
                        <p className="text-gray-300 mb-3">{offer.message}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(offer.status)}>
                          {offer.status}
                        </Badge>
                        <Badge className={getUrgencyColor(offer.serviceRequest.urgency)}>
                          {offer.serviceRequest.urgency}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${offer.budget}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {offer.timeline}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(offer.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {offer.serviceRequest.location}
                      </div>
                    </div>

                    {/* Contractor Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={offer.contractor.user.avatar} />
                        <AvatarFallback>{offer.contractor.user.name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{offer.contractor.businessName || offer.contractor.user.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            {offer.contractor.rating?.toFixed(1) || '0.0'}
                          </span>
                          <span>{offer.contractor.experience} years exp</span>
                          <span>{offer.contractor.totalJobs} jobs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    {offer.status === 'pending' ? (
                      <>
                        <Button
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Offer
                        </Button>
                        <Button
                          onClick={() => handleRejectOffer(offer.id)}
                          variant="outline"
                          className="w-full border-red-600 text-red-400 hover:bg-red-900/20"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                        disabled
                      >
                        {offer.status === 'accepted' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accepted
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejected
                          </>
                        )}
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={() => handleViewOfferDetails(offer)}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Offer Details Modal */}
      {showOfferDetails && selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">Offer Details</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setShowOfferDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Summary */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{selectedOffer.serviceRequest.serviceTitle}</h3>
                <p className="text-gray-300 mb-3">{selectedOffer.message}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Budget</p>
                    <p className="text-white font-medium">${selectedOffer.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Timeline</p>
                    <p className="text-white font-medium">{selectedOffer.timeline}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="text-white font-medium">{new Date(selectedOffer.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Hours</p>
                    <p className="text-white font-medium">{selectedOffer.estimatedHours}</p>
                  </div>
                </div>
              </div>

              {/* Contractor Details */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Contractor Profile</h3>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedOffer.contractor.user.avatar} />
                    <AvatarFallback>{selectedOffer.contractor.user.name?.charAt(0) || 'C'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">{selectedOffer.contractor.businessName || selectedOffer.contractor.user.name}</h4>
                    <p className="text-gray-400 mb-3">{selectedOffer.contractor.user.email}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Rating</p>
                        <p className="text-white font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {selectedOffer.contractor.rating?.toFixed(1) || '0.0'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Experience</p>
                        <p className="text-white font-medium">{selectedOffer.contractor.experience} years</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Jobs Completed</p>
                        <p className="text-white font-medium">{selectedOffer.contractor.totalJobs}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Status</p>
                        <Badge className={getStatusColor(selectedOffer.status)}>
                          {selectedOffer.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedOffer.status === 'pending' && (
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectOffer(selectedOffer.id)}
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Offer
                  </Button>
                  <Button
                    onClick={() => handleAcceptOffer(selectedOffer.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Offer
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

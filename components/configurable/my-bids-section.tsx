'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  DollarSign,
  MapPin,
  Star
} from 'lucide-react';

interface Bid {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  matchScore: number;
  createdAt: string;
  contractorMessage?: string;
  serviceRequest: {
    id: string;
    serviceTitle: string;
    serviceCategory: string;
    description: string;
    location: string;
    budget?: number;
    urgency: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
    };
  };
}

export default function MyBidsSection() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    expired: 0
  });

  useEffect(() => {
    fetchMyBids();
  }, [fetchMyBids]);

  const fetchMyBids = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contractor/my-bids', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setBids(data.bids || []);
        setStats(data.stats || { total: 0, pending: 0, accepted: 0, rejected: 0, expired: 0 });
      }
    } catch (error) {
      console.error('Failed to fetch my bids:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-900/30 text-green-400 border-green-500';
      case 'REJECTED':
        return 'bg-red-900/30 text-red-400 border-red-500';
      case 'EXPIRED':
        return 'bg-gray-900/30 text-gray-400 border-gray-500';
      case 'PENDING':
      default:
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return <CheckCircle className="h-4 w-4" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4" />;
      case 'EXPIRED':
        return <Clock className="h-4 w-4" />;
      case 'PENDING':
      default:
        return <Clock className="h-4 w-4" />;
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
            <h2 className="text-2xl font-bold mb-2">My Bids</h2>
            <p className="text-white/80">Track your submitted bids and their status</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-white/80">Total Bids</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Accepted</p>
                <p className="text-2xl font-bold text-white">{stats.accepted}</p>
              </div>
              <div className="h-8 w-8 bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-white">{stats.rejected}</p>
              </div>
              <div className="h-8 w-8 bg-red-900/30 rounded-full flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Expired</p>
                <p className="text-2xl font-bold text-white">{stats.expired}</p>
              </div>
              <div className="h-8 w-8 bg-gray-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bids List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : bids.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No bids yet</h3>
            <p className="text-gray-400 mb-4">
              You haven't submitted any bids yet. Check the Available Requests tab to find projects to bid on.
            </p>
            <Button 
              onClick={() => window.location.href = '/dashboard/contractor?tab=available-requests'}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Browse Available Requests
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <Card key={bid.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Bid Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{bid.serviceRequest.serviceTitle}</h3>
                        <p className="text-gray-300 mb-3">{bid.serviceRequest.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(bid.status)}>
                          {getStatusIcon(bid.status)}
                          <span className="ml-1">{bid.status}</span>
                        </Badge>
                        <Badge className={getUrgencyColor(bid.serviceRequest.urgency)}>
                          {bid.serviceRequest.urgency}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {bid.serviceRequest.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Bid submitted {new Date(bid.createdAt).toLocaleDateString()}
                      </div>
                      {bid.serviceRequest.budget && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${bid.serviceRequest.budget.toLocaleString()}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {bid.matchScore}% match
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={bid.serviceRequest.user.avatar} />
                        <AvatarFallback>{bid.serviceRequest.user.name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{bid.serviceRequest.user.name}</p>
                        <p className="text-gray-400 text-sm">{bid.serviceRequest.user.email}</p>
                      </div>
                    </div>

                    {/* Bid Message */}
                    {bid.contractorMessage && (
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-1">Your message:</p>
                        <p className="text-white">{bid.contractorMessage}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    {bid.status === 'ACCEPTED' && (
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Client
                      </Button>
                    )}
                    
                    {bid.status === 'PENDING' && (
                      <Button
                        variant="outline"
                        className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-900/20"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Awaiting Response
                      </Button>
                    )}

                    {bid.status === 'REJECTED' && (
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Bid Rejected
                      </Button>
                    )}

                    {bid.status === 'EXPIRED' && (
                      <Button
                        variant="outline"
                        className="w-full border-gray-500 text-gray-400 hover:bg-gray-700"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Expired
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

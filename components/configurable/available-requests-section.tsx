'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Eye, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { useIndustryConfig } from '@/contexts/TenantContext';
import RequestDetailsModal from './request-details-modal';

interface AvailableRequest {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  description: string;
  location: string;
  budget?: number;
  urgency: string;
  leadScore?: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  matchScore: number;
  matchReasons: string[];
  hasBid: boolean;
  canBid: boolean;
}

export default function AvailableRequestsSection() {
  const { serviceCategories, urgencyLevels } = useIndustryConfig();
  
  // Default service categories if not provided by context
  const defaultServiceCategories = [
    'Water Damage Restoration',
    'Fire Damage Restoration', 
    'Mold Remediation',
    'Storm Damage Repair',
    'Home Maintenance',
    'Emergency Services',
    'Construction & Trades',
    'Automotive Services'
  ];
  
  // Default urgency levels
  const defaultUrgencyLevels = [
    'Emergency',
    'Urgent', 
    'High Priority',
    'Normal',
    'Low Priority'
  ];
  
  // Use context values or fallback to defaults
  const categories = serviceCategories && serviceCategories.length > 0 ? serviceCategories : defaultServiceCategories;
  const urgencyOptions = urgencyLevels && urgencyLevels.length > 0 ? urgencyLevels : defaultUrgencyLevels;
  const [requests, setRequests] = useState<AvailableRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    category: 'all',
    location: '',
    urgency: 'all',
    minBudget: '',
    maxBudget: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [selectedRequestForBid, setSelectedRequestForBid] = useState<AvailableRequest | null>(null);
  const [bidData, setBidData] = useState({
    budget: '',
    timeline: '',
    message: '',
    startDate: '',
    estimatedHours: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailableRequests();
  }, [filters, fetchAvailableRequests]);

  const fetchAvailableRequests = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.urgency !== 'all') params.append('urgency', filters.urgency);
      if (filters.minBudget) params.append('minBudget', filters.minBudget);
      if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);
      params.append('page', filters.page.toString());
      params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/contractor/available-requests?${params}`, {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
        setError(null);
      } else if (response.status === 404) {
        const errorData = await response.json();
        setError('Contractor profile not found. Please complete your profile setup first.');
        setRequests([]);
        setPagination({ page: 1, limit: 10, total: 0, pages: 0 });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch available requests');
        setRequests([]);
        setPagination({ page: 1, limit: 10, total: 0, pages: 0 });
      }
    } catch (error) {
      console.error('Failed to fetch available requests:', error);
      setError('Network error. Please try again.');
      setRequests([]);
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 });
    } finally {
      setLoading(false);
    }
  }, [filters]);


  const handleViewDetails = (requestId: string) => {
    setSelectedRequestId(requestId);
    setShowDetailsModal(true);
  };

  const handleOpenBidDialog = (request: AvailableRequest) => {
    setSelectedRequestForBid(request);
    setShowBidDialog(true);
  };

  const handleCloseBidDialog = () => {
    setShowBidDialog(false);
    setSelectedRequestForBid(null);
    setBidData({
      budget: '',
      timeline: '',
      message: '',
      startDate: '',
      estimatedHours: ''
    });
  };

  const handleSubmitBid = async () => {
    if (!selectedRequestForBid || !bidData.budget || !bidData.timeline || !bidData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Budget, Timeline, and Message).",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/contractor/requests/${selectedRequestForBid.id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          budget: bidData.budget,
          timeline: bidData.timeline,
          message: bidData.message,
          startDate: bidData.startDate || null,
          estimatedHours: bidData.estimatedHours || null
        })
      });

      if (response.ok) {
        toast({
          title: "Bid Submitted Successfully! 🎯",
          description: `Your professional bid has been sent to ${selectedRequestForBid.user.name}. They will be notified and can review your proposal.`,
          duration: 6000,
        });
        
        // Refresh requests to update bid status
        fetchAvailableRequests();
        handleCloseBidDialog();
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to Submit Bid",
          description: errorData.error || "Unable to submit bid. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Submit bid error:', error);
      toast({
        title: "Error",
        description: "Failed to submit bid. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedRequestId(null);
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

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/30 text-green-400 border-green-500';
    if (score >= 60) return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
    return 'bg-red-900/30 text-red-400 border-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Available Service Requests</h2>
            <p className="text-white/80">Discover and submit bids on service requests that align with your professional expertise</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{pagination.total}</p>
            <p className="text-white/80">Available Requests</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Category</label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="all" className="text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">All Categories</SelectItem>
                  {categories.map((category: string) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Location</label>
              <Input
                placeholder="Enter city, state, or region"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Priority Level</label>
              <Select 
                value={filters.urgency} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="All Priority Levels" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="all" className="text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">All Priority Levels</SelectItem>
                  {urgencyOptions.map((level: string) => (
                    <SelectItem key={level} value={level} className="text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Budget Range (USD)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Minimum Budget"
                  type="number"
                  value={filters.minBudget}
                  onChange={(e) => setFilters(prev => ({ ...prev, minBudget: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Maximum Budget"
                  type="number"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-400 mb-2">Profile Setup Required</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.href = '/dashboard/contractor?tab=profile'}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Complete Profile Setup
            </Button>
          </CardContent>
        </Card>
      ) : requests.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No Service Requests Available</h3>
            <p className="text-gray-400 mb-4">
              {filters.category !== 'all' || filters.location || filters.urgency !== 'all'
                ? 'No service requests match your current filter criteria. Please adjust your search parameters to see more opportunities.'
                : 'No service requests are currently available. Please check back later for new opportunities.'}
            </p>
            <Button 
              onClick={() => setFilters({ category: 'all', location: '', urgency: 'all', minBudget: '', maxBudget: '', page: 1, limit: 10 })}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Reset Search Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Request Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{request.serviceTitle}</h3>
                        <p className="text-gray-300 mb-3">{request.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getMatchScoreColor(request.matchScore)}>
                          {request.matchScore}% match
                        </Badge>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      {request.budget && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${request.budget.toLocaleString()}
                        </div>
                      )}
                      {request.leadScore && (
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Lead Score: {request.leadScore}
                        </div>
                      )}
                    </div>

                    {/* Match Reasons */}
                    {request.matchReasons.length > 0 && (
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-2">Why this matches you:</p>
                        <div className="flex flex-wrap gap-2">
                          {request.matchReasons.map((reason, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Client Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={request.user.avatar} />
                        <AvatarFallback>{request.user.name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{request.user.name}</p>
                        <p className="text-gray-400 text-sm">{request.user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleOpenBidDialog(request)}
                      disabled={!request.canBid || request.hasBid}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      {request.hasBid ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Bid Submitted
                        </>
                      ) : request.canBid ? (
                        < div className="flex items-center bg-[#00BFA6] hover:bg-[#00A693] text-white border-[#00BFA6] transition-colors px-2 py-1 rounded-md">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Submit Bid
                        </div>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Not Available
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleViewDetails(request.id)}
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={filters.page === 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>
          <span className="text-gray-300">
            Page {filters.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            onClick={() => setFilters(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
            disabled={filters.page === pagination.pages}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Next
          </Button>
        </div>
      )}

      {/* Bid Dialog */}
      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Submit Professional Bid
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Submit a detailed proposal for this project to showcase your expertise and win the client.
            </DialogDescription>
          </DialogHeader>

          {selectedRequestForBid && (
            <div className="space-y-6">
              {/* Project Summary */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">{selectedRequestForBid.serviceTitle}</h3>
                <p className="text-gray-300 text-sm mb-2">{selectedRequestForBid.description}</p>
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedRequestForBid.location}
                </div>
              </div>

              {/* Bid Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget" className="text-white font-medium mb-1">
                      Your Bid Amount *
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter your bid amount"
                      value={bidData.budget}
                      onChange={(e) => setBidData({ ...bidData, budget: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white focus:ring-[#00BFA6] focus:border-[#00BFA6]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-white font-medium mb-1">
                      Project Timeline *
                    </Label>
                    <Select value={bidData.timeline} onValueChange={(value) => setBidData({ ...bidData, timeline: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:ring-[#00BFA6] focus:border-[#00BFA6]">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="1-2 weeks" className="text-white hover:bg-gray-700">1-2 weeks</SelectItem>
                        <SelectItem value="2-4 weeks" className="text-white hover:bg-gray-700">2-4 weeks</SelectItem>
                        <SelectItem value="1-2 months" className="text-white hover:bg-gray-700">1-2 months</SelectItem>
                        <SelectItem value="2-3 months" className="text-white hover:bg-gray-700">2-3 months</SelectItem>
                        <SelectItem value="3+ months" className="text-white hover:bg-gray-700">3+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-white font-medium mb-1">
                      Preferred Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={bidData.startDate}
                      onChange={(e) => setBidData({ ...bidData, startDate: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white focus:ring-[#00BFA6] focus:border-[#00BFA6]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedHours" className="text-white font-medium mb-1">
                      Estimated Hours
                    </Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      placeholder="e.g., 40"
                      value={bidData.estimatedHours}
                      onChange={(e) => setBidData({ ...bidData, estimatedHours: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white focus:ring-[#00BFA6] focus:border-[#00BFA6]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white font-medium mb-1">
                    Professional Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write a compelling message explaining why you're the best fit for this project. Include your approach, relevant experience, and any questions you have."
                    value={bidData.message}
                    onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white focus:ring-[#00BFA6] focus:border-[#00BFA6] min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCloseBidDialog}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitBid}
              disabled={!bidData.budget || !bidData.timeline || !bidData.message}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Professional Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        requestId={selectedRequestId}
      />
    </div>
  );
}

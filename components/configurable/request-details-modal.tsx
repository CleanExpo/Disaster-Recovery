'use client';

import { useState, useEffect, useCallback } from 'react';
import '../../styles/modal-fixes.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  TrendingUp,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  FileText,
  Shield,
  Award,
  Briefcase,
  Home,
  Car,
  Building,
  Heart,
  Zap,
  Target,
  Users,
  Globe,
  Smartphone,
  CreditCard,
  Clock3,
  CalendarDays,
  Timer,
  AlertTriangle,
  Info,
  ExternalLink,
  Send,
  Calendar as CalendarIcon,
  DollarSign as DollarIcon,
  MessageCircle,
  Eye,
  UserCheck,
  Clock4,
  MapPin as LocationIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Shield as ShieldIcon,
  AlertTriangle as AlertIcon,
  CheckCircle2,
  XCircle,
  Plus,
  Minus
} from 'lucide-react';

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string | null;
}

interface RequestDetails {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  description: string;
  location: string;
  budget?: string;
  phone?: string;
  preferredTime?: string;
  insurance: boolean;
  urgentResponse: boolean;
  urgency: string;
  leadScore?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
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

export default function RequestDetailsModal({ isOpen, onClose, requestId }: RequestDetailsModalProps) {
  const { toast } = useToast();
  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingBid, setSubmittingBid] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [bidData, setBidData] = useState({
    budget: '',
    timeline: '',
    message: '',
    startDate: '',
    estimatedHours: ''
  });

  useEffect(() => {
    if (isOpen && requestId) {
      fetchRequestDetails();
    }
  }, [isOpen, requestId, fetchRequestDetails]);

  const fetchRequestDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/service-requests/${requestId}`);

      if (response.ok) {
        const data = await response.json();
        setRequest(data.data);
        
        // Show success toast for loading request details
        toast({
          title: "Request Details Loaded 📋",
          description: "All project information has been loaded successfully.",
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch request details');
        
        // Show error toast
        toast({
          title: "Failed to Load Details",
          description: errorData.error || 'Unable to load request details.',
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to fetch request details:', error);
      setError('Network error. Please try again.');
      
      // Show error toast
      toast({
        title: "Network Error",
        description: "Unable to load request details. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [requestId, toast]);

  const handleBidOnRequest = async () => {
    if (!request) return;

    try {
      setSubmittingBid(true);
      const response = await fetch(`/api/contractor/requests/${request.id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          budget: bidData.budget,
          timeline: bidData.timeline,
          message: bidData.message,
          startDate: bidData.startDate,
          estimatedHours: bidData.estimatedHours
        })
      });

      if (response.ok) {
        // Update the request to show bid submitted
        setRequest(prev => prev ? { ...prev, hasBid: true, canBid: false } : null);
        setShowBidDialog(false);
        // Reset bid data
        setBidData({
          budget: '',
          timeline: '',
          message: '',
          startDate: '',
          estimatedHours: ''
        });
        
        // Show success toast
        toast({
          title: "Bid Submitted Successfully! 🎯",
          description: `Your professional bid has been sent to ${request.user.name}. They will be notified and can review your proposal.`,
          duration: 6000,
        });
      }
    } catch (error) {
      console.error('Failed to bid on request:', error);
      toast({
        title: "Failed to Submit Bid",
        description: "Unable to submit your bid. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleOpenBidDialog = () => {
    setShowBidDialog(true);
  };

  const handleSendMessage = async () => {
    if (!request) return;

    try {
      const response = await fetch('/api/messages/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiverId: request.user.id,
          serviceRequestId: request.id,
          message: `Hi ${request.user.name}, I'm interested in discussing your ${request.serviceTitle} project. Could we schedule a time to talk about the details?`
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Check if chat already exists
        if (data.alreadyExists) {
          toast({
            title: "Chat Already Active! 💬",
            description: `You already have an active chat with ${request.user.name} for this project. Check your messages to continue the conversation.`,
            duration: 5000,
          });
        } else {
          toast({
            title: "Message Sent! 💬",
            description: `Your message has been sent to ${request.user.name}. They will be notified and can respond to you.`,
            duration: 5000,
          });
        }
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to Send Message",
          description: errorData.error || "Unable to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
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

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/30 text-green-400 border-green-500';
    if (score >= 60) return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
    return 'bg-red-900/30 text-red-400 border-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
      case 'matched':
        return 'bg-green-900/30 text-green-400 border-green-500';
      case 'in_progress':
        return 'bg-blue-900/30 text-blue-400 border-blue-500';
      case 'completed':
        return 'bg-purple-900/30 text-purple-400 border-purple-500';
      case 'cancelled':
        return 'bg-red-900/30 text-red-400 border-red-500';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dialog-content-custom overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader className="pb-4">
          <DialogTitle className="dialog-title-custom text-white flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Service Request Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-400 mb-2">Error Loading Request</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Close
            </Button>
          </div>
        ) : request ? (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/15 to-primary/8 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-6">
                  <h2 className="service-title-custom text-white mb-3 leading-tight">{request.serviceTitle}</h2>
                  <p className="text-gray-300 service-description-custom mb-4 leading-relaxed">{request.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={`${getMatchScoreColor(request.matchScore)} text-xs px-3 py-1`}>
                      <Target className="h-3 w-3 mr-1" />
                      {request.matchScore}% Match
                    </Badge>
                    <Badge className={`${getUrgencyColor(request.urgency)} text-xs px-3 py-1`}>
                      <Zap className="h-3 w-3 mr-1" />
                      {request.urgency}
                    </Badge>
                    <Badge className={`${getStatusColor(request.status)} text-xs px-3 py-1`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {request.status}
                    </Badge>
                    {request.leadScore && (
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-500 text-xs px-3 py-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Lead Score: {request.leadScore}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-2xl font-bold text-white mb-1">
                    {request.budget ? `$${request.budget}` : 'Budget TBD'}
                  </p>
                  <p className="text-gray-400 text-sm">Project Budget</p>
                </div>
              </div>
            </div>

            <div className="grid-custom grid-cols-1-custom xl:grid-cols-4-custom gap-8-custom">
              {/* Main Content */}
              <div className="xl:col-span-3-custom space-y-6">
                {/* Project Details */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="card-title-custom text-white flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      Project Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-4 !gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <LocationIcon className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                          <p className="text-sm text-white font-medium">{request.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <Clock4 className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Posted</p>
                          <p className="text-sm text-white font-medium">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <CalendarIcon className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Preferred Time</p>
                          <p className="text-sm text-white font-medium">
                            {request.preferredTime || 'Flexible'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <PhoneIcon className="h-4 w-4 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Contact Phone</p>
                          <p className="text-sm text-white font-medium">
                            {request.phone || 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700/50" />

                    <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-4 !gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <ShieldIcon className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Insurance Claim</p>
                          <Badge className={`${request.insurance ? 'bg-green-900/30 text-green-400 border-green-500' : 'bg-gray-900/30 text-gray-400 border-gray-500'} text-xs px-2 py-1 mt-1`}>
                            {request.insurance ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                          <AlertIcon className="h-4 w-4 text-red-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Urgent Response</p>
                          <Badge className={`${request.urgentResponse ? 'bg-red-900/30 text-red-400 border-red-500' : 'bg-gray-900/30 text-gray-400 border-gray-500'} text-xs px-2 py-1 mt-1`}>
                            {request.urgentResponse ? 'Required' : 'Not Required'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Match Reasons */}
                {request.matchReasons.length > 0 && (
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="card-title-custom text-white flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Why This Matches You
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        Based on your profile and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {request.matchReasons.map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-white text-white bg-primary/10 px-3 py-1">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Client Information */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Client Information
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      Contact details and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={request.user.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                          {request.user.name?.charAt(0) || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{request.user.name}</h3>
                          <p className="text-gray-400 text-sm">Service Request Client</p>
                        </div>
                        
                        <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 !gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                              <MailIcon className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                              <p className="text-sm text-white font-medium">{request.user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                              <PhoneIcon className="h-4 w-4 text-orange-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                              <p className="text-sm text-white font-medium">
                                {request.phone || 'Not provided'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                              <LocationIcon className="h-4 w-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                              <p className="text-sm text-white font-medium">{request.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={request.hasBid ? undefined : handleOpenBidDialog}
                      disabled={!request.canBid || request.hasBid}
                      className="w-full bg-primary hover:bg-primary/90 text-white h-10"
                    >
                      {request.hasBid ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Bid Submitted
                        </>
                      ) : request.canBid ? (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Bid
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Not Available
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleSendMessage}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 h-10"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 h-10"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Project Timeline */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                      Project Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div>
                          <p className="text-white font-medium text-sm">Request Posted</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-400 font-medium text-sm">Bidding Phase</p>
                          <p className="text-gray-500 text-xs">In Progress</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-400 font-medium text-sm">Contractor Selected</p>
                          <p className="text-gray-500 text-xs">Pending</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-400 font-medium text-sm">Work Started</p>
                          <p className="text-gray-500 text-xs">Pending</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-400 font-medium text-sm">Project Completed</p>
                          <p className="text-gray-500 text-xs">Pending</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Stats */}
                <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-white flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      Project Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Match Score</span>
                        <Badge className={`${getMatchScoreColor(request.matchScore)} text-xs px-2 py-1`}>
                          {request.matchScore}%
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Lead Score</span>
                        <span className="text-white font-medium text-sm">
                          {request.leadScore || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Days Active</span>
                        <span className="text-white font-medium text-sm">
                          {Math.ceil((Date.now() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Budget Range</span>
                        <span className="text-white font-medium text-sm">
                          {request.budget ? `$${request.budget}` : 'TBD'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : null}

        {/* Professional Bid Submission Dialog */}
        <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white flex items-center">
                <Send className="h-5 w-5 mr-2 text-primary" />
                Submit Professional Bid
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Project Summary */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Project Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="text-white font-medium">{request?.serviceTitle}</h3>
                    <p className="text-gray-300 text-sm">{request?.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <LocationIcon className="h-4 w-4 mr-1" />
                        {request?.location}
                      </span>
                      <span className="flex items-center">
                        <DollarIcon className="h-4 w-4 mr-1" />
                        {request?.budget || 'Budget TBD'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bid Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-white">Your Bid Amount</Label>
                    <div className="relative">
                      <DollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="Enter your bid amount"
                        value={bidData.budget}
                        onChange={(e) => setBidData(prev => ({ ...prev, budget: e.target.value }))}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-white">Project Timeline</Label>
                    <div className="relative">
                      <Clock4 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="timeline"
                        placeholder="e.g., 2-3 weeks"
                        value={bidData.timeline}
                        onChange={(e) => setBidData(prev => ({ ...prev, timeline: e.target.value }))}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-white">Preferred Start Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="startDate"
                        type="date"
                        value={bidData.startDate}
                        onChange={(e) => setBidData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estimatedHours" className="text-white">Estimated Hours</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="estimatedHours"
                        type="number"
                        placeholder="e.g., 40 hours"
                        value={bidData.estimatedHours}
                        onChange={(e) => setBidData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Professional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                    value={bidData.message}
                    onChange={(e) => setBidData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowBidDialog(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBidOnRequest}
                  disabled={submittingBid || !bidData.budget || !bidData.message}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {submittingBid ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Bid...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Professional Bid
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

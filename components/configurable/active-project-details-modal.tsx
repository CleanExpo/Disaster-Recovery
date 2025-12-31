'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  Award,
  Briefcase,
  Home,
  Building,
  Users,
  Globe,
  Smartphone,
  Timer,
  AlertTriangle,
  Info,
  ExternalLink,
  Send,
  Calendar as CalendarIcon,
  DollarSign as DollarIcon,
  Clock as ClockIcon,
  CheckCircle,
  Eye,
  X
} from 'lucide-react';

interface ActiveProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  userType: 'CLIENT' | 'CONTRACTOR';
}

interface ProjectDetails {
  id: string;
  budget: string;
  timeline: string;
  startDate: string;
  estimatedHours: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // For client view - contractor details
  contractor?: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
    businessName: string;
    rating: number;
    totalJobs: number;
    yearsExperience: number;
    hourlyRate: number;
    services: string[];
    serviceAreas: string[];
  };
  // For contractor view - client details  
  client?: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
  serviceRequest: {
    id: string;
    serviceTitle: string;
    description: string;
    location: string;
    serviceCategory: string;
    urgency: string;
    budget: string;
    createdAt: string;
  };
}

export default function ActiveProjectDetailsModal({ 
  isOpen, 
  onClose, 
  projectId, 
  userType
}: ActiveProjectDetailsModalProps) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId, fetchProjectDetails]);

  const fetchProjectDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/active-projects/${projectId}`);

      if (response.ok) {
        const data = await response.json();
        setProject(data.project);
      } else {
        setError('Failed to load project details');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dialog-content-custom max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader className="dialog-header-custom">
          <DialogTitle className="dialog-title-custom text-white">
            {userType === 'CLIENT' ? 'Contractor Details' : 'Client Details'}
          </DialogTitle>
          <p className="text-gray-400 text-sm">
            {userType === 'CLIENT' 
              ? 'Professional contractor information and project details' 
              : 'Client information and project requirements'
            }
          </p>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Error Loading Details</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : project ? (
          <div className="space-y-6">
            {/* Project Summary Card */}
            <Card className="bg-[#00BFA6] border-[#00BFA6]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white">
                    <AvatarImage src={userType === 'CLIENT' ? project.contractor?.user?.avatar || '' : project.client?.user?.avatar || ''} />
                    <AvatarFallback className="bg-white text-[#00BFA6] text-xl font-bold">
                      {userType === 'CLIENT' 
                        ? project.contractor?.user?.name?.charAt(0) || 'C'
                        : project.client?.user?.name?.charAt(0) || 'C'
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">
                      {userType === 'CLIENT' 
                        ? project.contractor?.user?.name || 'Contractor'
                        : project.client?.user?.name || 'Client'
                      }
                    </h2>
                    <p className="text-white/90 text-lg">
                      {userType === 'CLIENT' 
                        ? project.contractor?.businessName || 'Professional Contractor'
                        : project.client?.user?.email || 'Client Email'
                      }
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-white text-[#00BFA6] px-3 py-1">
                        {project.status}
                      </Badge>
                      {userType === 'CLIENT' && project.contractor?.rating && (
                        <div className="flex items-center text-white">
                          <Star className="h-4 w-4 mr-1" />
                          {project.contractor.rating.toFixed(1)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Status & Progress */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="card-title-custom text-white flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Project Status & Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-[#00BFA6]">Active</div>
                    <div className="text-sm text-gray-400">Project Status</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">0%</div>
                    <div className="text-sm text-gray-400">Completion</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'}
                    </div>
                    <div className="text-sm text-gray-400">Start Date</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Project Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#00BFA6] h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Bid Details Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Bid Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Budget</span>
                      <span className="text-white font-semibold">${project.budget || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Timeline</span>
                      <span className="text-white font-semibold">{project.timeline || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Start Date</span>
                      <span className="text-white font-semibold">{project.startDate || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Estimated Hours</span>
                      <span className="text-white font-semibold">{project.estimatedHours || 'Not specified'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Request Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Service Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">{project.serviceRequest.serviceTitle}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.serviceRequest.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.serviceRequest.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Shield className="h-4 w-4 mr-2" />
                      {project.serviceRequest.serviceCategory}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {project.serviceRequest.urgency}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Message Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Professional Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.message || 'No message provided'}
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <Mail className="h-4 w-4 mr-2" />
                      {userType === 'CLIENT' 
                        ? project.contractor?.user?.email || 'Not provided'
                        : project.client?.user?.email || 'Not provided'
                      }
                    </div>
                    {userType === 'CLIENT' && project.contractor && (
                      <>
                        <div className="flex items-center text-sm text-gray-300">
                          <Star className="h-4 w-4 mr-2" />
                          {project.contractor.rating?.toFixed(1) || '0.0'} ({project.contractor.totalJobs || 0} jobs)
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {project.contractor.yearsExperience || 0} years experience
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <DollarSign className="h-4 w-4 mr-2" />
                          ${project.contractor.hourlyRate || 0}/hour
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deliverables & Files Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="card-title-custom text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Deliverables & Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No deliverables yet</h3>
                  <p className="text-gray-400 mb-4">
                    {userType === 'CLIENT' 
                      ? 'Contractor will upload project files and deliverables here'
                      : 'Upload your work files and deliverables for the client'
                    }
                  </p>
                  {userType === 'CONTRACTOR' && (
                    <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Deliverable
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Communication History */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="card-title-custom text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Communication History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userType === 'CLIENT' ? project.contractor?.user?.avatar || '' : project.client?.user?.avatar || ''} />
                      <AvatarFallback className="bg-[#00BFA6] text-white text-xs">
                        {userType === 'CLIENT' 
                          ? project.contractor?.user?.name?.charAt(0) || 'C'
                          : project.client?.user?.name?.charAt(0) || 'C'
                        }
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">
                          {userType === 'CLIENT' 
                            ? project.contractor?.user?.name || 'Contractor'
                            : project.client?.user?.name || 'Client'
                          }
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {project.message || 'Project initiated'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <p className="text-gray-400 text-sm">
                      {userType === 'CLIENT' 
                        ? 'Start a conversation with your contractor'
                        : 'Start a conversation with your client'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="text-white font-semibold">${project.budget || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-white">Escrow</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="card-title-custom text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#00BFA6]" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{project.timeline || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date</span>
                    <span className="text-white">{project.startDate || 'TBD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Hours</span>
                    <span className="text-white">{project.estimatedHours || 'Not specified'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Request modification functionality
                    console.log('Request modification for project:', project.id);
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request Modification
                </Button>
                {userType === 'CONTRACTOR' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Mark as completed functionality
                      console.log('Mark project as completed:', project.id);
                    }}
                    className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
                <Button
                  onClick={() => {
                    // Open chat functionality
                    console.log('Open chat with:', userType === 'CLIENT' ? project.contractor?.user?.id : project.client?.user?.id);
                  }}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

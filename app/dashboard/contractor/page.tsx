'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvailableRequestsSection from '@/components/configurable/available-requests-section';
import MyBidsSection from '@/components/configurable/my-bids-section';
import ContractorOnboarding from '@/components/onboarding/contractor-onboarding';
import ContractorDashboard from '@/components/personalized/contractor-dashboard';
import FloatingChatWidget from '@/components/floating-chat-widget';
import ActiveProjectDetailsModal from '@/components/configurable/active-project-details-modal';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  DollarSign,
  Star,
  Briefcase,
  User,
  MapPin,
  Award,
  Wrench,
  Eye
} from 'lucide-react';

export default function ContractorDashboardPage() {
  const { user, logout, loading } = useAuth();
  const { currentTheme, getThemeColors } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [contractorPreferences, setContractorPreferences] = useState<any>(null);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [loadingActiveProjects, setLoadingActiveProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);


  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType === 'ADMIN') {
      router.push('/dashboard/admin');
    } else if (user && user.userType === 'CLIENT') {
      router.push('/dashboard/client');
    } else if (user && user.userType === 'CONTRACTOR') {
      fetchProfile();
      checkOnboardingStatus();
      fetchActiveProjects();
    }
  }, [user, loading, router]);

  const checkOnboardingStatus = async () => {
    try {
      setLoadingPreferences(true);
      const response = await fetch('/api/contractor/preferences', {
        cache: 'no-store',
      });

      if (response.ok) {
        const preferences = await response.json();
        setContractorPreferences(preferences);
        
        if (!preferences || !preferences.isOnboardingComplete) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } else {
        // If no preferences exist, show onboarding
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setShowOnboarding(true);
    } finally {
      setLoadingPreferences(false);
    }
  };

  const handleOnboardingComplete = async (preferences: any) => {
    try {
      setLoadingPreferences(true);
      const response = await fetch('/api/contractor/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        const savedPreferences = await response.json();
        setContractorPreferences(savedPreferences.preferences);
        setShowOnboarding(false);
        setLoadingPreferences(false);
      } else {
        console.error('Failed to save contractor preferences');
      }
    } catch (error) {
      console.error('Error saving contractor preferences:', error);
    } finally {
      setLoadingPreferences(false);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setLoadingPreferences(false);
  };

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const response = await fetch('/api/contractor/profile', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchActiveProjects = async () => {
    try {
      setLoadingActiveProjects(true);
      const response = await fetch('/api/contractor/active-projects', {
        cache: 'no-store',
      });

      if (response.ok) {
        const result = await response.json();
        setActiveProjects(result.projects || []);
      }
    } catch (error) {
      console.error('Error fetching active projects:', error);
    } finally {
      setLoadingActiveProjects(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const renderContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Show Personalized Dashboard if contractor has preferences, otherwise show original dashboard */}
            {contractorPreferences ? (
              <ContractorDashboard 
                preferences={contractorPreferences}
                onRequestSelect={(requestId) => {
                  console.log('Request selected:', requestId);
                  setActiveTab('available-requests');
                }}
                onCategorySelect={(categoryId) => {
                  console.log('Category selected:', categoryId);
                  setActiveTab('available-requests');
                }}
              />
            ) : (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'Contractor'}!
                  </h1>
                  <p className="text-gray-400">
                    Manage your bids and find new opportunities
                  </p>
                </div>

            {/* Profile Status */}
            {profile && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {profile.businessName || user?.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {profile.services?.join(', ') || 'No services listed'}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={
                        profile.availability === 'AVAILABLE' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }
                    >
                      {profile.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold text-white ml-1">
                          {profile.rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{profile.totalJobs || 0}</p>
                      <p className="text-sm text-gray-400">Jobs Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{profile.experience || 0}</p>
                      <p className="text-sm text-gray-400">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        ${profile.hourlyRate || 0}
                      </p>
                      <p className="text-sm text-gray-400">Per Hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-400">Available Requests</p>
                      <p className="text-2xl font-bold text-white">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-400">Pending Bids</p>
                      <p className="text-2xl font-bold text-white">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-400">Accepted Bids</p>
                      <p className="text-2xl font-bold text-white">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-400">Total Earnings</p>
                      <p className="text-2xl font-bold text-white">$0</p>
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
                  Manage your contractor activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveTab('available-requests')}
                    className="bg-primary hover:bg-primary/90 text-white h-12"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    View Available Requests
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('my-bids')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    My Bids
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard/contractor/onboarding/checklist')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Onboarding Checklist
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('profile')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
              </>
            )}
          </div>
        );

      case 'available-requests':
        return <AvailableRequestsSection />;

      case 'my-bids':
        return <MyBidsSection />;

      case 'active-projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">Active Projects</h2>
                <p className="text-gray-400 mt-1">
                  Manage your ongoing projects with clients
                </p>
            </div>
              <Button
                onClick={fetchActiveProjects}
                disabled={loadingActiveProjects}
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                {loadingActiveProjects ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>

            {loadingActiveProjects ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
              </div>
            ) : activeProjects.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Active Projects</h3>
                <p className="text-gray-400 mb-6">
                  You don't have any active projects yet. When clients accept your bids, they will appear here.
                </p>
                <Button
                  onClick={() => setActiveTab('my-bids')}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View My Bids
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <Card key={project.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={project.client?.user?.avatar || ''} />
                              <AvatarFallback className="bg-[#00BFA6] text-white">
                                {project.client?.user?.name?.charAt(0) || 'C'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">
                                {project.client?.user?.name || 'Client'}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {project.client?.user?.email || 'Client Email'}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-white mb-2">{project.serviceRequest?.serviceTitle}</h4>
                            <p className="text-gray-300 text-sm mb-3">{project.serviceRequest?.description}</p>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.serviceRequest?.location}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Project Value</p>
                              <p className="text-lg font-semibold text-[#00BFA6]">
                                ${project.budget || 'Not specified'}
                              </p>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Timeline</p>
                              <p className="text-sm font-medium text-white">
                                {project.timeline || 'Not specified'}
                              </p>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Status</p>
                              <Badge className="bg-green-100 text-green-800">
                                IN PROGRESS
                              </Badge>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Started</p>
                              <p className="text-sm font-medium text-white">
                                {new Date(project.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(project.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Open chat with client
                                  console.log('Open chat with client:', project.client?.user?.id);
                                }}
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message Client
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedProjectId(project.id);
                                  setShowDetailsModal(true);
                                }}
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
              </CardContent>
            </Card>
                ))}
              </div>
            )}
          </div>
        );


      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <p className="text-gray-400">Track your performance and earnings</p>
            </div>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Analytics coming soon</h3>
                <p className="text-gray-400">Detailed performance analytics will be available here</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Profile</h2>
              <p className="text-gray-400">Manage your preferences and professional information</p>
            </div>
            
            {contractorPreferences ? (
              <div className="space-y-6">
                {/* Personal Information */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Name</p>
                        <p className="text-white font-medium">{user?.name || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white font-medium">{user?.email || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Account Type</p>
                        <Badge className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30">
                          Contractor
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Onboarding Status</p>
                        <Badge className={`${contractorPreferences.isOnboardingComplete ? 'bg-green-900/30 text-green-400 border-green-500' : 'bg-red-900/30 text-red-400 border-red-500'}`}>
                          {contractorPreferences.isOnboardingComplete ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Categories */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Wrench className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Service Categories ({contractorPreferences.serviceCategories?.length || 0})
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Services you specialize in</p>
                  </CardHeader>
                  <CardContent>
                    {contractorPreferences.serviceCategories && contractorPreferences.serviceCategories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {contractorPreferences.serviceCategories.map((category: string) => (
                          <Badge key={category} className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30">
                            {category.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No service categories selected</p>
                    )}
                  </CardContent>
                </Card>

                {/* Service Locations */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Service Locations ({contractorPreferences.locations?.length || 0})
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Areas where you provide services</p>
                  </CardHeader>
                  <CardContent>
                    {contractorPreferences.locations && contractorPreferences.locations.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {contractorPreferences.locations.map((location: string) => (
                          <Badge key={location} className="bg-blue-900/30 text-blue-400 border-blue-500">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No service locations specified</p>
                    )}
                  </CardContent>
                </Card>

                {/* Experience & Expertise */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Award className="h-5 w-5 mr-2 text-[#00BFA6]" />
                        Experience Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {contractorPreferences.experience ? (
                        <Badge className="bg-green-900/30 text-green-400 border-green-500">
                          {contractorPreferences.experience.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Badge>
                      ) : (
                        <p className="text-gray-400 italic">Not specified</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Star className="h-5 w-5 mr-2 text-[#00BFA6]" />
                        Areas of Expertise ({contractorPreferences.expertise?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {contractorPreferences.expertise && contractorPreferences.expertise.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {contractorPreferences.expertise.map((expertise: string) => (
                            <Badge key={expertise} className="bg-purple-900/30 text-purple-400 border-purple-500">
                              {expertise.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">No expertise areas specified</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Professional Background */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Professional Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contractorPreferences.background ? (
                      <p className="text-gray-300 leading-relaxed">{contractorPreferences.background}</p>
                    ) : (
                      <p className="text-gray-400 italic">No background information provided</p>
                    )}
                  </CardContent>
                </Card>

                {/* Work Preferences */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Work Preferences
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Your work schedule and pricing</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Hourly Rate</p>
                        {contractorPreferences.hourlyRate ? (
                          <p className="text-2xl font-bold text-white">${contractorPreferences.hourlyRate}/hour</p>
                        ) : (
                          <p className="text-gray-400 italic">Not set</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Availability</p>
                        {contractorPreferences.availability ? (
                          <Badge className="bg-orange-900/30 text-orange-400 border-orange-500">
                            {contractorPreferences.availability.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Badge>
                        ) : (
                          <p className="text-gray-400 italic">Not specified</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Max Travel Distance</p>
                        {contractorPreferences.maxDistance ? (
                          <p className="text-2xl font-bold text-white">{contractorPreferences.maxDistance} miles</p>
                        ) : (
                          <p className="text-gray-400 italic">Not set</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Statistics */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-[#00BFA6]" />
                      Account Statistics
                    </CardTitle>
                    <p className="text-gray-400 text-sm">Your account activity and performance</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{contractorPreferences.serviceCategories?.length || 0}</p>
                        <p className="text-sm text-gray-400">Service Categories</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{contractorPreferences.locations?.length || 0}</p>
                        <p className="text-sm text-gray-400">Service Locations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{contractorPreferences.expertise?.length || 0}</p>
                        <p className="text-sm text-gray-400">Expertise Areas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {contractorPreferences.isOnboardingComplete ? '100' : '0'}%
                        </p>
                        <p className="text-sm text-gray-400">Profile Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No preferences set</h3>
                  <p className="text-gray-400 mb-4">Complete your onboarding to see your personalized profile</p>
                  <Button 
                    onClick={() => setShowOnboarding(true)}
                    className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                  >
                    Complete Setup
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <p className="text-gray-400">Manage your account preferences</p>
            </div>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Settings coming soon</h3>
                <p className="text-gray-400">Account settings will be available here</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-gray-800 border-r border-gray-700">
            <div className="flex items-center p-4 border-b border-gray-700">
              <Briefcase className="h-6 w-6  mr-2 text-white" />
              <h1 className="text-xl font-bold text-white">Contractor</h1>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <Home className="h-5 w-5 mr-3" />
                Overview
              </Button>
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'available-requests' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('available-requests')}
              >
                <FileText className="h-5 w-5 mr-3" />
                Available Requests
              </Button>
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'my-bids' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('my-bids')}
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                My Bids
              </Button>
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'active-projects' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('active-projects')}
              >
                <CheckCircle className="h-5 w-5 mr-3" />
                Active Projects
              </Button>
              
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'analytics' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                Analytics
              </Button>
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'profile' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <Users className="h-5 w-5 mr-3" />
                Profile
              </Button>
              
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === 'settings' 
                    ? 'bg-primary text-white shadow-md hover:bg-primary/90' 
                    : 'hover:bg-gray-700 hover:text-white text-gray-300'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/20">
                  <AvatarImage src={user.avatar || ''} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                    {user.name?.charAt(0) || 'C'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="h-full overflow-y-auto bg-gray-900">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Contractor Onboarding Modal */}
      {showOnboarding && (
        <ContractorOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Floating Chat Widget */}
      {user && (
        <FloatingChatWidget 
          currentUserId={user.id} 
          currentUserType={user.userType as 'CLIENT' | 'CONTRACTOR' | 'ADMIN'} 
        />
      )}
      
      {/* Active Project Details Modal */}
      {showDetailsModal && selectedProjectId && (
        <ActiveProjectDetailsModal
          projectId={selectedProjectId}
          isOpen={showDetailsModal}
          userType="CONTRACTOR"
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedProjectId(null);
          }}
        />
      )}
    </div>
  );
}

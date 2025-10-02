'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import FloatingChatWidget from '@/components/floating-chat-widget';
import {
  Briefcase,
  Loader2,
  LogOut,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Clock,
  Badge,
  Plus,
  Search,
  Filter,
  FileText,
  CheckCircle,
  Home,
  BarChart3,
  Menu,
  X,
  Bell,
  MoreHorizontal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

const serviceCategories = [
  "Restoration", "Home Services", "Construction/Trades",
  "Professional Services", "Healthcare Services", "Real Estate Services"
];

const availabilityOptions = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'BUSY', label: 'Busy' },
  { value: 'UNAVAILABLE', label: 'Unavailable' },
];

interface ContractorProfileSettingsProps {
  profile: any;
  loading: boolean;
  saving: boolean;
  onLoadProfile: () => void;
  onSaveProfile: (data: any) => Promise<{ success: boolean; error?: string }>;
}

function ContractorProfileSettings({ 
  profile, 
  loading, 
  saving, 
  onLoadProfile, 
  onSaveProfile 
}: ContractorProfileSettingsProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    insuranceProvider: '',
    insuranceExpiry: '',
    services: [] as string[],
    serviceAreas: [] as string[],
    hourlyRate: '',
    experience: '',
    bio: '',
    availability: 'AVAILABLE',
  });

  const [serviceAreasInput, setServiceAreasInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load profile data when component mounts or profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        businessName: profile.businessName || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zipCode: profile.zipCode || '',
        licenseNumber: profile.licenseNumber || '',
        insuranceProvider: profile.insuranceProvider || '',
        insuranceExpiry: profile.insuranceExpiry ? new Date(profile.insuranceExpiry).toISOString().split('T')[0] : '',
        services: profile.services || [],
        serviceAreas: profile.serviceAreas || [],
        hourlyRate: profile.hourlyRate?.toString() || '',
        experience: profile.experience?.toString() || '',
        bio: profile.bio || '',
        availability: profile.availability || 'AVAILABLE',
      });
      setServiceAreasInput((profile.serviceAreas || []).join(', '));
    }
  }, [profile]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleServiceAreasChange = (value: string) => {
    setServiceAreasInput(value);
    const areas = value.split(',').map(area => area.trim()).filter(area => area);
    setFormData(prev => ({ ...prev, serviceAreas: areas }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.phone || !formData.address || !formData.city || 
        !formData.state || !formData.zipCode || formData.services.length === 0 || 
        formData.serviceAreas.length === 0 || !formData.hourlyRate || !formData.experience || !formData.bio) {
      setError('Please fill in all required fields');
      return;
    }

    const result = await onSaveProfile(formData);
    if (result.success) {
      toast.success('Profile updated successfully!');
      setError(null);
    } else {
      setError(result.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-[#00BFA6]" />
            <span>Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Settings & Profile</h3>
          <p className="text-gray-400 mt-1">Manage your contractor profile and preferences</p>
        </div>
        <Button
          onClick={onLoadProfile}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <Settings className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-gray-400">Your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-gray-300 block mb-2">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300 block mb-2">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300 block mb-2">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300 block mb-2">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-300 block mb-2">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="State"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-gray-300 block mb-2">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="12345"
                />
              </div>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Services & Pricing</CardTitle>
              <CardDescription className="text-gray-400">Configure your offered services and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300 block mb-2">Service Categories *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {serviceCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.services.includes(category)}
                        onCheckedChange={() => handleServiceToggle(category)}
                        className="border-gray-600 data-[state=checked]:bg-[#00BFA6] data-[state=checked]:border-[#00BFA6]"
                      />
                      <Label htmlFor={category} className="text-sm text-gray-300 cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="serviceAreas" className="text-gray-300 block mb-2">Service Areas *</Label>
                <Input
                  id="serviceAreas"
                  value={serviceAreasInput}
                  onChange={(e) => handleServiceAreasChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="Downtown, Suburbs, City Center (comma-separated)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate" className="text-gray-300 block mb-2">Hourly Rate ($) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="75"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-gray-300 block mb-2">Experience (Years) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                    placeholder="5"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="availability" className="text-gray-300 block mb-2">Availability *</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Details */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Professional Details</CardTitle>
            <CardDescription className="text-gray-400">Licenses, insurance, and professional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseNumber" className="text-gray-300 block mb-2">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="Enter your license number"
                />
              </div>
              <div>
                <Label htmlFor="insuranceProvider" className="text-gray-300 block mb-2">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
                  placeholder="Insurance company name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="insuranceExpiry" className="text-gray-300 block mb-2">Insurance Expiry Date</Label>
              <Input
                id="insuranceExpiry"
                type="date"
                value={formData.insuranceExpiry}
                onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6]"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-300 block mb-2">Professional Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white focus:ring-[#00BFA6] min-h-[100px]"
                placeholder="Tell clients about your experience, specialties, and what makes you unique..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#00BFA6] hover:bg-[#00A693] text-white px-8 py-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ContractorDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [contractorProfile, setContractorProfile] = useState<any>(null);
  const [loadingProfileData, setLoadingProfileData] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [contractorStats, setContractorStats] = useState({
    activeProjects: 0,
    totalEarnings: 0,
    completedJobs: 0,
    rating: 0,
    todaysOpportunities: 0
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchContractorStats = async () => {
    try {
      setLoadingStats(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/contractor/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setContractorStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching contractor stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType === 'ADMIN') {
      router.push('/dashboard/admin');
    } else if (user && user.userType === 'CLIENT') {
      router.push('/dashboard/client');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (user && user.userType === 'CONTRACTOR') {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/contractor/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            const profile = data.profile;
            
            // Check if profile exists and is complete
            const isProfileComplete = profile && !!(
              profile.businessName &&
              profile.phone &&
              profile.address &&
              profile.city &&
              profile.state &&
              profile.zipCode &&
              profile.services &&
              profile.services.length > 0 &&
              profile.serviceAreas &&
              profile.serviceAreas.length > 0 &&
              profile.hourlyRate !== null &&
              profile.experience !== null &&
              profile.bio
            );
            
            setProfileComplete(isProfileComplete);
            setContractorProfile(profile);
            
            // Fetch stats if profile is complete
            if (isProfileComplete) {
              fetchContractorStats();
            }
            
            // Redirect to profile setup if not complete
            if (!isProfileComplete) {
              router.push('/dashboard/contractor/profile-setup');
            }
          }
        } catch (error) {
          console.error('Error checking profile completion:', error);
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    if (user) {
      checkProfileCompletion();
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const loadProfileData = async () => {
    if (!user) return;
    
    setLoadingProfileData(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/contractor/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const profile = data.profile;
        
        // Check if profile is complete
        const isProfileComplete = profile && !!(
          profile.businessName &&
          profile.phone &&
          profile.address &&
          profile.city &&
          profile.state &&
          profile.zipCode &&
          profile.services &&
          profile.services.length > 0 &&
          profile.serviceAreas &&
          profile.serviceAreas.length > 0 &&
          profile.hourlyRate !== null &&
          profile.experience !== null &&
          profile.bio
        );
        
        setContractorProfile(profile);
        setProfileComplete(isProfileComplete);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoadingProfileData(false);
    }
  };

  const saveProfile = async (profileData: any) => {
    setSavingProfile(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/contractor/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const data = await response.json();
        const profile = data.profile;
        
        // Check if profile is now complete
        const isProfileComplete = profile && !!(
          profile.businessName &&
          profile.phone &&
          profile.address &&
          profile.city &&
          profile.state &&
          profile.zipCode &&
          profile.services &&
          profile.services.length > 0 &&
          profile.serviceAreas &&
          profile.serviceAreas.length > 0 &&
          profile.hourlyRate !== null &&
          profile.experience !== null &&
          profile.bio
        );
        
        setContractorProfile(profile);
        setProfileComplete(isProfileComplete);
        
        // Show toast notification
        if (isProfileComplete) {
          toast.success("Profile saved successfully! Your profile is now pending admin verification.", {
            description: "You'll be notified once it's approved and you can start receiving job matches."
          });
        } else {
          toast.success("Profile saved successfully!", {
            description: "Please complete all required fields to submit for verification."
          });
        }
        
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Failed to save profile' };
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      return { success: false, error: 'Network error' };
    } finally {
      setSavingProfile(false);
    }
  };

  // Load profile data when settings tab is selected
  useEffect(() => {
    if (activeTab === 'settings' && !contractorProfile) {
      loadProfileData();
    }
  }, [activeTab, contractorProfile]);

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          <span>{loading ? 'Loading dashboard...' : 'Checking profile...'}</span>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'CONTRACTOR') {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome back, {user?.name || 'Contractor'}! 👷‍♂️
                  </h2>
                  <p className="text-white/90">
                    Ready to find your next project opportunity
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm">Today's Opportunities</p>
                  <p className="text-3xl font-bold text-white">
                    {loadingStats ? '...' : contractorStats.todaysOpportunities}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Active Projects</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : contractorStats.activeProjects}
                      </p>
                      <p className="text-xs text-green-400">Currently working</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-[#00BFA6]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Earnings</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : `$${contractorStats.totalEarnings.toLocaleString()}`}
                      </p>
                      <p className="text-xs text-green-400">All time</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Rating</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : contractorStats.rating.toFixed(1)}
                      </p>
                      <p className="text-xs text-yellow-400">Based on reviews</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Response Time</p>
                      <p className="text-2xl font-bold text-white">2.3h</p>
                      <p className="text-xs text-blue-400">Average</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Opportunities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Opportunities</CardTitle>
                <CardDescription className="text-gray-400">Latest project matches in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Water Damage Restoration - Kitchen",
                      location: "Downtown, 2 miles away",
                      budget: "$3,500",
                      urgency: "urgent",
                      matchScore: 95,
                      posted: "2 hours ago"
                    },
                    {
                      id: 2,
                      title: "Mold Remediation - Basement",
                      location: "Suburbs, 5 miles away",
                      budget: "$2,200",
                      urgency: "flexible",
                      matchScore: 87,
                      posted: "4 hours ago"
                    },
                    {
                      id: 3,
                      title: "Fire Damage Cleanup",
                      location: "City Center, 1 mile away",
                      budget: "$8,500",
                      urgency: "urgent",
                      matchScore: 92,
                      posted: "6 hours ago"
                    }
                  ].map((opportunity) => (
                    <div key={opportunity.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{opportunity.title}</h4>
                        <p className="text-sm text-gray-400">{opportunity.location} • {opportunity.budget} • {opportunity.posted}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${
                          opportunity.urgency === 'urgent' ? 'bg-red-900/30 text-red-400 border-red-500' : 'bg-yellow-900/30 text-yellow-400 border-yellow-500'
                        }`}>
                          {opportunity.urgency}
                        </Badge>
                        <Badge className="bg-[#00BFA6] text-white">
                          {opportunity.matchScore}% match
                        </Badge>
                        <Button size="sm" className="bg-[#00BFA6] hover:bg-[#00A693] text-white">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">My Projects</h3>
                <p className="text-gray-400 mt-1">Track and manage your active projects</p>
              </div>
            </div>

            <div className="text-center py-16 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
              <Briefcase className="h-20 w-20 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No active projects yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Start by browsing available opportunities and applying to projects that match your skills.
              </p>
              <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-white">
                <Plus className="h-5 w-5 mr-2" />
                Browse Opportunities
              </Button>
            </div>
          </div>
        );

      case 'opportunities':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Available Opportunities</h3>
                <p className="text-gray-400 mt-1">Find projects that match your expertise</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                  />
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="text-center py-16 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
              <Users className="h-20 w-20 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No opportunities available</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Complete your contractor profile to start receiving project matches.
              </p>
              <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-white">
                <Settings className="h-5 w-5 mr-2" />
                Complete Profile
              </Button>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Messages</h3>
                <p className="text-gray-400 mt-1">Communicate with clients and manage conversations</p>
              </div>
            </div>

            <div className="text-center py-16 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
              <MessageSquare className="h-20 w-20 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Once you start working on projects, you'll receive messages from clients here.
              </p>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Analytics Dashboard</h3>
                <p className="text-gray-400 mt-1">Track your performance and earnings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Projects</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : contractorStats.completedJobs}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-[#00BFA6]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Success Rate</p>
                      <p className="text-2xl font-bold text-white">96%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Avg. Project Value</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : contractorStats.completedJobs > 0 ? `$${Math.round(contractorStats.totalEarnings / contractorStats.completedJobs).toLocaleString()}` : '$0'}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Client Rating</p>
                      <p className="text-2xl font-bold text-white">
                        {loadingStats ? '...' : `${contractorStats.rating.toFixed(1)}/5`}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'settings':
        return <ContractorProfileSettings 
          profile={contractorProfile} 
          loading={loadingProfileData}
          saving={savingProfile}
          onLoadProfile={loadProfileData}
          onSaveProfile={saveProfile}
        />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:text-white mr-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <span className="text-2xl font-bold text-[#00BFA6]">Contractor Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-gray-800 shadow-xl border-r border-gray-700 p-4 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <nav className="space-y-2 overflow-y-auto h-full">
            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <Home className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'overview' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">Overview</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'projects'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'projects' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">My Projects</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'opportunities'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('opportunities')}
            >
              <Users className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'opportunities' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">Opportunities</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'messages'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'messages' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">Messages</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'analytics' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">Analytics</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-[#00BFA6] text-white shadow-md hover:bg-[#00A693] border-l-4 border-l-[#00A693]'
                  : 'hover:bg-gray-700 hover:text-white text-gray-300'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className={`h-5 w-5 mr-3 transition-colors duration-200 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium transition-colors duration-200">Settings</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8 pt-4 bg-gray-900 min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
      </div>

      {/* Floating Chat Widget */}
      {/* Test element to verify rendering */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 z-50">
        Test: {user?.id ? 'User ID exists' : 'No User ID'}
      </div>
      
      <FloatingChatWidget 
        currentUserId={user?.id || ''} 
        currentUserType={user?.userType || 'CONTRACTOR'} 
      />
    </div>
  );
}

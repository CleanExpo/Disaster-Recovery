'use client';

import ClientOnboarding from '@/components/client-onboarding';
import FloatingChatWidget from '@/components/floating-chat-widget';
import ActiveProjectDetailsModal from '@/components/configurable/active-project-details-modal';
import ClientLayout from '@/components/dashboard/client-layout';
import PersonalizedDashboard from '@/components/personalized/personalized-dashboard';
import UserPreferencesDisplay from '@/components/profile/user-preferences-display';
import { ClientEligibilityBanner } from '@/components/client/eligibility-banner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Award,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Filter,
  Home,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
  User,
  Users,
  X,
  RotateCcw,
  Calendar,
  Zap,
  MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function ClientDashboard() {
  const { user, logout, loading } = useAuth();
  const { currentTheme, getThemeColors } = useTheme();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    serviceCategory: '',
    urgency: '',
    serviceTitle: '',
    description: '',
    location: '',
    phone: '',
    preferredTime: '',
    insurance: false,
    urgentResponse: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    urgency: 'all',
    dateRange: 'all',
    insurance: 'all',
    sortBy: 'newest',
    sortOrder: 'desc'
  });
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [loadingActiveProjects, setLoadingActiveProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [contractorMatches, setContractorMatches] = useState<Record<string, any[]>>({});
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [availableContractors, setAvailableContractors] = useState<any[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [showRequestDetailsModal, setShowRequestDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [cancellingRequest, setCancellingRequest] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Fetch user preferences
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch('/api/user/preferences', {
        cache: 'no-store',
      });

      if (response.ok) {
        const preferences = await response.json();
        setUserPreferences(preferences);
      }
    } catch (error) {
      console.error('Failed to fetch user preferences:', error);
    } finally {
      setLoadingPreferences(false);
    }
  };

  // Handle view request details
  const handleViewRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setShowRequestDetailsModal(true);
  };

  // Handle cancel request
  const handleCancelRequest = async (requestId: string) => {
    try {
      setCancellingRequest(true);
      const response = await fetch(`/api/service-requests/${requestId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Refresh the requests list
        await fetchServiceRequests();
        console.log('Request cancelled successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to cancel request:', errorData);
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
    } finally {
      setCancellingRequest(false);
    }
  };

  // Handle onboarding completion
  const handleOnboardingComplete = async (preferences: any) => {
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        const savedPreferences = await response.json();
        setUserPreferences(savedPreferences);
        setShowOnboarding(false);
        setLoadingPreferences(false);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // Handle onboarding skip
  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setLoadingPreferences(false);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user && user.userType === 'ADMIN') {
      router.push('/dashboard/admin');
    } else if (user && user.userType === 'CONTRACTOR') {
      router.push('/dashboard/contractor');
    } else if (user && user.userType === 'CLIENT') {
      fetchServiceRequests();
      fetchMessages();
      fetchNotifications();
      fetchUserPreferences();
      fetchOffers();
      fetchActiveProjects();
    }
  }, [user, loading, router]);

  // Check if onboarding should be shown
  useEffect(() => {
    if (user && user.userType === 'CLIENT' && !loadingPreferences && userPreferences && !(userPreferences as any).isOnboardingComplete) {
      setShowOnboarding(true);
    }
  }, [user, loadingPreferences, userPreferences]);

  // Calculate analytics whenever serviceRequests changes
  useEffect(() => {
    if (serviceRequests.length > 0) {
      calculateAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceRequests]);

  // Fetch contractor matches for each service request
  useEffect(() => {
    if (serviceRequests.length > 0) {
      serviceRequests.forEach(request => {
        if (request.status === 'MATCHED' || request.status === 'IN_PROGRESS') {
          fetchContractorMatches(request.id);
        }
      });
    }
  }, [serviceRequests]);

  // Fetch available contractors when Services tab is selected
  useEffect(() => {
    if (activeTab === 'services') {
      fetchAvailableContractors(selectedCategory);
    }
  }, [activeTab, selectedCategory]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAcceptOffer = async (offerId: string) => {
    try {
      console.warn('Client offer acceptance is disabled (auto-dispatch).', { offerId });
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    try {
      console.warn('Client offer rejection is disabled (auto-dispatch).', { offerId });
    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };

  const handleCompleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/client/active-projects/${projectId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Refresh active projects
        await fetchActiveProjects();
        console.log('Project completed successfully');
      } else {
        console.error('Failed to complete project');
      }
    } catch (error) {
      console.error('Error completing project:', error);
    }
  };

  const handleRateProject = async (projectId: string) => {
    // This will open a rating modal/dialog
    // For now, just log - we'll implement the rating modal later
    console.log('Rate project:', projectId);
  };

  const handleViewContractor = async (contractorId: string, serviceCategory?: string) => {
    try {
      if (typeof window === 'undefined') return;
      console.warn('Contractor details are not available to clients.', { contractorId, serviceCategory });
    } catch (error) {
      console.error('Error fetching contractor details:', error);
    }
  };

  const handleContactContractor = async () => {
    try {
      if (typeof window === 'undefined') return;
      console.warn('Direct contractor contact is not available to clients.');
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const loadChatMessages = async (contractorId: string) => {
    try {
      setLoadingMessages(true);
      if (typeof window === 'undefined') return;

      const response = await fetch(`/api/messages?contractorId=${contractorId}`);

      if (response.ok) {
        const data = await response.json();
        setChatMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContractor) return;

    try {
      setSendingMessage(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: selectedContractor.userId,
          subject: `Chat with ${selectedContractor.businessName || selectedContractor.user?.name}`,
          content: newMessage,
          messageType: 'GENERAL'
        })
      });

      if (response.ok) {
        setNewMessage('');
        // Reload messages
        await loadChatMessages(selectedContractor.userId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const getCategoryDisplayName = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const getUrgencyDisplayName = (urgencyId: string) => {
    const urgencyMap = {
      emergency: "Emergency",
      urgent: "Urgent", 
      normal: "Normal",
      flexible: "Flexible"
    };
    return urgencyMap[urgencyId as keyof typeof urgencyMap] || '';
  };

  // Filter and sort logic
  const applyFilters = useCallback((requests: any[]) => {
    let filtered = [...requests];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(request => 
        request.serviceTitle?.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.location?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(request => request.serviceCategory === filters.category);
    }

    // Urgency filter
    if (filters.urgency !== 'all') {
      filtered = filtered.filter(request => request.urgency === filters.urgency);
    }

    // Insurance filter
    if (filters.insurance !== 'all') {
      const isInsurance = filters.insurance === 'yes';
      filtered = filtered.filter(request => request.insurance === isInsurance);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(request => 
        new Date(request.createdAt) >= filterDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'newest':
        case 'oldest':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'urgency':
          const urgencyOrder = { emergency: 4, urgent: 3, normal: 2, flexible: 1 };
          aValue = urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0;
          bValue = urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0;
          break;
        case 'title':
          aValue = a.serviceTitle?.toLowerCase() || '';
          bValue = b.serviceTitle?.toLowerCase() || '';
          break;
        default:
          return 0;
      }

      if (filters.sortBy === 'oldest' || filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [filters]);

  // Update filtered requests when filters or service requests change
  useEffect(() => {
    setFilteredRequests(applyFilters(serviceRequests));
  }, [serviceRequests, filters, applyFilters]);

  const fetchServiceRequests = async () => {
    try {
      setLoadingRequests(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/service-requests', { cache: 'no-store' });

      if (response.ok) {
        const result = await response.json();
        setServiceRequests(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/messages', { cache: 'no-store' });

      if (response.ok) {
        const result = await response.json();
        setMessages(result.messages || []);
        setUnreadCount(result.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchOffers = async () => {
    try {
      setLoadingOffers(true);
      if (typeof window === 'undefined') return;

      // NRPG uses private, automatic claim dispatch. Clients do not receive/accept contractor offers.
      setOffers([]);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoadingOffers(false);
    }
  };

  const fetchActiveProjects = async () => {
    try {
      setLoadingActiveProjects(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/client/active-projects', { cache: 'no-store' });

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

  const calculateAnalytics = useCallback(() => {
    const totalRequests = serviceRequests.length;
    const pendingRequests = serviceRequests.filter(req => req.status === 'PENDING').length;
    const inProgressRequests = serviceRequests.filter(req => req.status === 'IN_PROGRESS').length;
    const completedRequests = serviceRequests.filter(req => req.status === 'COMPLETED').length;
    const cancelledRequests = serviceRequests.filter(req => req.status === 'CANCELLED').length;
    
    const conversionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;
    
    // Calculate average lead score
    const requestsWithScore = serviceRequests.filter(req => req.leadScore !== null && req.leadScore !== undefined);
    const averageLeadScore = requestsWithScore.length > 0 
      ? requestsWithScore.reduce((sum, req) => sum + (req.leadScore || 0), 0) / requestsWithScore.length 
      : 0;
    
    // Calculate total spent (mock calculation)
    const totalSpent = completedRequests * 2750;
    
    // Calculate category distribution
    const categoryCounts = serviceRequests.reduce((acc, req) => {
      acc[req.serviceCategory] = (acc[req.serviceCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategories = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => (b.count as number) - (a.count as number))
      .slice(0, 5);
    
    // Calculate monthly trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrends = serviceRequests
      .filter(req => new Date(req.createdAt) >= sixMonthsAgo)
      .reduce((acc, req) => {
        const month = new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    const monthlyTrendsArray = Object.entries(monthlyTrends)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month + ' 1, 2024').getTime() - new Date(b.month + ' 1, 2024').getTime());
    
    // Recent activity (last 5 requests)
    const recentActivity = serviceRequests.slice(0, 5).map(req => ({
      id: req.id,
      title: req.serviceTitle,
      status: req.status,
      category: req.serviceCategory,
      createdAt: req.createdAt,
      leadScore: req.leadScore
    }));
    
    const analytics = {
      overview: {
        totalRequests,
        pendingRequests,
        inProgressRequests,
        completedRequests,
        cancelledRequests,
        conversionRate: Math.round(conversionRate * 10) / 10,
        averageLeadScore: Math.round(averageLeadScore * 10) / 10,
        totalSpent,
        averageProjectValue: 2500,
        averageResponseTime: 2.5,
        satisfactionScore: 4.7
      },
      recentActivity,
      topCategories,
      monthlyTrends: monthlyTrendsArray
    };
    
    setAnalytics(analytics);
  }, [serviceRequests]);


  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      if (typeof window === 'undefined') return;

      const response = await fetch('/api/notifications', { cache: 'no-store' });

      if (response.ok) {
        const result = await response.json();
        setNotifications(result.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchContractorMatches = async (requestId: string) => {
    try {
      setLoadingMatches(true);
      if (typeof window === 'undefined') return;

      // Contractor identities are private; clients do not receive a contractor list.
      setContractorMatches(prev => ({
        ...prev,
        [requestId]: []
      }));
      return;
    } catch (error) {
      console.error('Error fetching contractor matches:', error);
    } finally {
      setLoadingMatches(false);
    }
  };

  const fetchAvailableContractors = async (category: string = 'all') => {
    try {
      setLoadingContractors(true);
      if (typeof window === 'undefined') return;

      // Contractor identities are private; clients do not have visibility of the contractor network.
      setAvailableContractors([]);
      return;
    } catch (error) {
      console.error('Error fetching available contractors:', error);
    } finally {
      setLoadingContractors(false);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Validate required fields
      if (!formData.serviceCategory || !formData.urgency || !formData.serviceTitle || !formData.description || !formData.location) {
        setSubmitError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Get the auth token
      if (typeof window === 'undefined') {
        setSubmitError('Authentication required. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      // Submit the request
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }

      const createdRequestId: string | undefined = result?.data?.id;

      // Success
      setSubmitSuccess(true);
      setFormData({
        serviceCategory: '',
        urgency: '',
        serviceTitle: '',
        description: '',
        location: '',
        phone: '',
        preferredTime: '',
        insurance: false,
        urgentResponse: false
      });

      // Refresh the service requests
      await fetchServiceRequests();

      // Close modal after a short delay
      setTimeout(() => {
        setShowServiceModal(false);
        setSubmitSuccess(false);
        setActiveTab('requests'); // Switch to requests tab
        if (createdRequestId) {
          router.push(`/dashboard/client/callout/${createdRequestId}`);
        }
      }, 2000);

    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const serviceCategories = [
    { id: 'restoration', name: 'Restoration Services', icon: '🏠', count: 45, description: 'Water, fire, and storm damage restoration' },
    { id: 'construction', name: 'Construction', icon: '🏗️', count: 32, description: 'Building and renovation services' },
    { id: 'home-services', name: 'Home Services', icon: '🔧', count: 28, description: 'Plumbing, electrical, HVAC services' },
    { id: 'landscaping', name: 'Landscaping', icon: '🌳', count: 19, description: 'Garden and outdoor maintenance' },
    { id: 'cleaning', name: 'Cleaning Services', icon: '🧹', count: 24, description: 'Residential and commercial cleaning' },
    { id: 'legal', name: 'Legal Services', icon: '⚖️', count: 15, description: 'Legal consultation and representation' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', count: 21, description: 'Medical and wellness services' },
    { id: 'consulting', name: 'Consulting', icon: '💼', count: 18, description: 'Business and professional consulting' }
  ];

  const availableServices = [
    // RESTORATION SERVICES
    {
      id: 1,
      title: 'Emergency Water Damage Restoration',
      category: 'restoration',
      description: '24/7 emergency water damage cleanup, drying, and restoration services for homes and businesses',
      price: '$2,500 - $15,000',
      rating: 4.9,
      reviews: 127,
      contractor: 'Elite Restoration Co.',
      contractorId: 'contractor-1',
      contractorLocation: 'Downtown, NY',
      location: 'Sydney, NSW',
      availability: 'Available Now',
      estimatedTime: '2-5 days',
      icon: '💧'
    },
    {
      id: 2,
      title: 'Fire Damage Restoration',
      category: 'restoration',
      description: 'Complete fire damage cleanup, smoke removal, and structural restoration services',
      price: '$5,000 - $50,000',
      rating: 4.8,
      reviews: 89,
      contractor: 'Fire & Smoke Restoration Pro',
      contractorId: 'contractor-2',
      contractorLocation: 'Melbourne, VIC',
      location: 'Melbourne, VIC',
      availability: 'Available Now',
      estimatedTime: '1-4 weeks',
      icon: '🔥'
    },
    {
      id: 3,
      title: 'Mold Remediation',
      category: 'restoration',
      description: 'Professional mold inspection, removal, and prevention services',
      price: '$1,500 - $8,000',
      rating: 4.7,
      reviews: 156,
      contractor: 'Mold-Free Solutions',
      contractorId: 'contractor-3',
      contractorLocation: 'Brisbane, QLD',
      location: 'Brisbane, QLD',
      availability: 'Available Now',
      estimatedTime: '3-7 days',
      icon: '🦠'
    },
    {
      id: 4,
      title: 'Storm Damage Repair',
      category: 'restoration',
      description: 'Roof repairs, window replacement, and structural damage restoration after storms',
      price: '$3,000 - $25,000',
      rating: 4.6,
      reviews: 73,
      contractor: 'Storm Recovery Specialists',
      location: 'Perth, WA',
      availability: 'Available in 1 week',
      estimatedTime: '1-3 weeks',
      icon: '⛈️'
    },
    {
      id: 5,
      title: 'Flood Damage Restoration',
      category: 'restoration',
      description: 'Complete flood damage cleanup, sanitization, and restoration services',
      price: '$4,000 - $30,000',
      rating: 4.8,
      reviews: 94,
      contractor: 'Flood Recovery Experts',
      location: 'Adelaide, SA',
      availability: 'Available Now',
      estimatedTime: '1-2 weeks',
      icon: '🌊'
    },
    {
      id: 6,
      title: 'Carpet & Upholstery Cleaning',
      category: 'restoration',
      description: 'Professional carpet, rug, and upholstery deep cleaning and restoration',
      price: '$200 - $1,500',
      rating: 4.5,
      reviews: 201,
      contractor: 'Clean & Restore Pro',
      location: 'Hobart, TAS',
      availability: 'Available Now',
      estimatedTime: '1-2 days',
      icon: '🧽'
    },
    {
      id: 7,
      title: 'Emergency Board-Up Services',
      category: 'restoration',
      description: '24/7 emergency board-up and security services for damaged properties',
      price: '$300 - $1,500',
      rating: 4.6,
      reviews: 89,
      contractor: 'Secure & Restore',
      location: 'Sydney, NSW',
      availability: 'Available Now',
      estimatedTime: '2-6 hours',
      icon: '🔒'
    },
    {
      id: 8,
      title: 'Content Restoration',
      category: 'restoration',
      description: 'Professional cleaning and restoration of personal belongings and furniture',
      price: '$500 - $5,000',
      rating: 4.4,
      reviews: 112,
      contractor: 'Content Care Specialists',
      location: 'Melbourne, VIC',
      availability: 'Available Now',
      estimatedTime: '3-10 days',
      icon: '📦'
    },
    {
      id: 9,
      title: 'Odor Removal Services',
      category: 'restoration',
      description: 'Professional odor elimination and air purification services',
      price: '$300 - $2,000',
      rating: 4.5,
      reviews: 78,
      contractor: 'Fresh Air Solutions',
      location: 'Perth, WA',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '🌸'
    },

    // HOME SERVICES
    {
      id: 10,
      title: 'Emergency Plumbing Services',
      category: 'home-services',
      description: '24/7 emergency plumbing repairs, leak detection, and pipe replacement',
      price: '$150 - $2,000',
      rating: 4.8,
      reviews: 234,
      contractor: 'Quick Fix Plumbing',
      location: 'Sydney, NSW',
      availability: 'Available Now',
      estimatedTime: '1-4 hours',
      icon: '🔧'
    },
    {
      id: 11,
      title: 'Electrical Panel Upgrade',
      category: 'home-services',
      description: 'Professional electrical panel upgrade and safety inspection',
      price: '$800 - $2,500',
      rating: 4.7,
      reviews: 156,
      contractor: 'Spark Electric',
      location: 'Brisbane, QLD',
      availability: 'Available Now',
      estimatedTime: '1-2 days',
      icon: '⚡'
    },
    {
      id: 12,
      title: 'Landscaping Design & Installation',
      category: 'home-services',
      description: 'Custom garden design, lawn care, and professional landscaping services',
      price: '$1,000 - $15,000',
      rating: 4.6,
      reviews: 89,
      contractor: 'Green Thumb Landscaping',
      location: 'Melbourne, VIC',
      availability: 'Available in 1 week',
      estimatedTime: '1-3 weeks',
      icon: '🌿'
    },
    {
      id: 13,
      title: 'HVAC Installation & Repair',
      category: 'home-services',
      description: 'Heating, ventilation, and air conditioning installation, repair, and maintenance',
      price: '$500 - $8,000',
      rating: 4.7,
      reviews: 178,
      contractor: 'Climate Control Experts',
      location: 'Perth, WA',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '🌡️'
    },
    {
      id: 14,
      title: 'Pool Maintenance & Repair',
      category: 'home-services',
      description: 'Swimming pool cleaning, maintenance, and equipment repair services',
      price: '$200 - $1,500',
      rating: 4.5,
      reviews: 145,
      contractor: 'Crystal Clear Pools',
      location: 'Gold Coast, QLD',
      availability: 'Available Now',
      estimatedTime: '1-2 days',
      icon: '🏊'
    },
    {
      id: 15,
      title: 'Locksmith Services',
      category: 'home-services',
      description: 'Emergency locksmith services, lock installation, and security system setup',
      price: '$100 - $800',
      rating: 4.9,
      reviews: 267,
      contractor: 'Secure Lock Solutions',
      location: 'Adelaide, SA',
      availability: 'Available Now',
      estimatedTime: '30 minutes - 2 hours',
      icon: '🔐'
    },

    // CONSTRUCTION & TRADES
    {
      id: 16,
      title: 'Structural Repairs',
      category: 'construction',
      description: 'Foundation repairs, structural damage assessment, and building restoration',
      price: '$5,000 - $100,000',
      rating: 4.9,
      reviews: 67,
      contractor: 'Structural Solutions',
      location: 'Darwin, NT',
      availability: 'Available in 2 weeks',
      estimatedTime: '2-8 weeks',
      icon: '🏗️'
    },
    {
      id: 17,
      title: 'Roof Restoration',
      category: 'construction',
      description: 'Complete roof repair, replacement, and weatherproofing services',
      price: '$3,000 - $20,000',
      rating: 4.7,
      reviews: 143,
      contractor: 'Roof Masters',
      location: 'Canberra, ACT',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 weeks',
      icon: '🏠'
    },
    {
      id: 18,
      title: 'Kitchen Renovation',
      category: 'construction',
      description: 'Complete kitchen design and renovation services',
      price: '$15,000 - $45,000',
      rating: 4.8,
      reviews: 89,
      contractor: 'Premier Builders',
      location: 'Melbourne, VIC',
      availability: 'Available in 1 week',
      estimatedTime: '3-6 weeks',
      icon: '🍳'
    },
    {
      id: 19,
      title: 'Bathroom Renovation',
      category: 'construction',
      description: 'Complete bathroom design, renovation, and waterproofing services',
      price: '$8,000 - $25,000',
      rating: 4.7,
      reviews: 112,
      contractor: 'Bathroom Specialists',
      location: 'Sydney, NSW',
      availability: 'Available in 2 weeks',
      estimatedTime: '2-4 weeks',
      icon: '🚿'
    },
    {
      id: 20,
      title: 'Deck & Patio Construction',
      category: 'construction',
      description: 'Custom deck, patio, and outdoor living space construction',
      price: '$3,000 - $15,000',
      rating: 4.6,
      reviews: 98,
      contractor: 'Outdoor Living Pros',
      location: 'Brisbane, QLD',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 weeks',
      icon: '🪵'
    },
    {
      id: 21,
      title: 'Fencing Installation',
      category: 'construction',
      description: 'Residential and commercial fencing installation and repair',
      price: '$1,500 - $8,000',
      rating: 4.5,
      reviews: 134,
      contractor: 'Fence Masters',
      location: 'Perth, WA',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '🚧'
    },

    // PROFESSIONAL SERVICES
    {
      id: 22,
      title: 'Legal Consultation',
      category: 'professional',
      description: 'Professional legal advice and consultation services',
      price: '$200 - $500',
      rating: 4.8,
      reviews: 156,
      contractor: 'Legal Solutions Group',
      location: 'Sydney, NSW',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 hours',
      icon: '⚖️'
    },
    {
      id: 23,
      title: 'Accounting Services',
      category: 'professional',
      description: 'Bookkeeping, tax preparation, and financial consulting services',
      price: '$100 - $300',
      rating: 4.7,
      reviews: 189,
      contractor: 'Numbers & Co',
      location: 'Melbourne, VIC',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '📊'
    },
    {
      id: 24,
      title: 'Business Consulting',
      category: 'professional',
      description: 'Strategic business planning, process improvement, and management consulting',
      price: '$150 - $400',
      rating: 4.6,
      reviews: 78,
      contractor: 'Business Growth Partners',
      location: 'Brisbane, QLD',
      availability: 'Available in 1 week',
      estimatedTime: '2-5 days',
      icon: '💼'
    },
    {
      id: 25,
      title: 'Insurance Claim Assistance',
      category: 'professional',
      description: 'Professional assistance with insurance claims and documentation',
      price: '$200 - $1,000',
      rating: 4.8,
      reviews: 156,
      contractor: 'Claim Support Services',
      location: 'Brisbane, QLD',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '📋'
    },
    {
      id: 26,
      title: 'IT Support & Consulting',
      category: 'professional',
      description: 'Computer repair, network setup, and IT consulting services',
      price: '$80 - $200',
      rating: 4.5,
      reviews: 203,
      contractor: 'Tech Solutions Pro',
      location: 'Perth, WA',
      availability: 'Available Now',
      estimatedTime: '1-4 hours',
      icon: '💻'
    },

    // HEALTHCARE SERVICES
    {
      id: 27,
      title: 'Home Health Care',
      category: 'healthcare',
      description: 'In-home nursing care, physical therapy, and medical assistance',
      price: '$50 - $150',
      rating: 4.9,
      reviews: 234,
      contractor: 'Compassionate Care Services',
      location: 'Sydney, NSW',
      availability: 'Available Now',
      estimatedTime: '2-8 hours',
      icon: '🏥'
    },
    {
      id: 28,
      title: 'Medical Equipment Installation',
      category: 'healthcare',
      description: 'Installation and setup of medical equipment and accessibility features',
      price: '$200 - $1,500',
      rating: 4.7,
      reviews: 89,
      contractor: 'Medical Equipment Specialists',
      location: 'Melbourne, VIC',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 days',
      icon: '🩺'
    },
    {
      id: 29,
      title: 'Mental Health Support',
      category: 'healthcare',
      description: 'Counseling, therapy, and mental health support services',
      price: '$100 - $200',
      rating: 4.8,
      reviews: 167,
      contractor: 'Wellness & Care',
      location: 'Brisbane, QLD',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 hours',
      icon: '🧠'
    },
    {
      id: 30,
      title: 'Elderly Care Services',
      category: 'healthcare',
      description: 'Comprehensive elderly care, companionship, and daily living assistance',
      price: '$30 - $80',
      rating: 4.9,
      reviews: 298,
      contractor: 'Golden Years Care',
      location: 'Adelaide, SA',
      availability: 'Available Now',
      estimatedTime: '2-8 hours',
      icon: '👴'
    },

    // REAL ESTATE SERVICES
    {
      id: 31,
      title: 'Property Management',
      category: 'real-estate',
      description: 'Complete property management services for landlords and investors',
      price: '$200 - $500',
      rating: 4.6,
      reviews: 145,
      contractor: 'Premier Property Management',
      location: 'Sydney, NSW',
      availability: 'Available Now',
      estimatedTime: '1-3 days',
      icon: '🏘️'
    },
    {
      id: 32,
      title: 'Property Valuation',
      category: 'real-estate',
      description: 'Professional property valuation and market analysis services',
      price: '$300 - $800',
      rating: 4.7,
      reviews: 98,
      contractor: 'Accurate Valuations',
      location: 'Melbourne, VIC',
      availability: 'Available in 1 week',
      estimatedTime: '1-2 days',
      icon: '📈'
    },
    {
      id: 33,
      title: 'Home Inspection',
      category: 'real-estate',
      description: 'Comprehensive home inspection and condition assessment services',
      price: '$400 - $800',
      rating: 4.8,
      reviews: 178,
      contractor: 'Thorough Inspections',
      location: 'Brisbane, QLD',
      availability: 'Available in 1 week',
      estimatedTime: '2-4 hours',
      icon: '🔍'
    },
    {
      id: 34,
      title: 'Real Estate Photography',
      category: 'real-estate',
      description: 'Professional real estate photography and virtual tour services',
      price: '$200 - $600',
      rating: 4.9,
      reviews: 156,
      contractor: 'Property Visuals',
      location: 'Perth, WA',
      availability: 'Available in 1 week',
      estimatedTime: '2-4 hours',
      icon: '📸'
    },
    {
      id: 35,
      title: 'Conveyancing Services',
      category: 'real-estate',
      description: 'Legal property transfer and conveyancing services',
      price: '$800 - $2,000',
      rating: 4.7,
      reviews: 134,
      contractor: 'Property Legal Solutions',
      location: 'Canberra, ACT',
      availability: 'Available Now',
      estimatedTime: '2-4 weeks',
      icon: '📜'
    }
  ];

  const getStatusDisplay = (status: string) => {
    const statusMap = {
      PENDING: 'Pending',
      MATCHED: 'Matched',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'MATCHED':
        return 'bg-purple-100 text-purple-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 100;
      case 'IN_PROGRESS':
        return 65;
      case 'MATCHED':
        return 30;
      default:
        return 0;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Eligibility Banner - Shows onboarding progress */}
            <ClientEligibilityBanner />

            {/* Dual-Path Buttons (Emergency vs Complete Setup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-red-500 hover:border-red-600 transition-colors cursor-pointer"
                    onClick={() => router.push('/dashboard/client/requests/new?emergency=true')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-600">🚨 EMERGENCY SERVICE</h3>
                      <p className="text-sm text-muted-foreground">Get Help Now</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Fast-track: Name, Phone, Address only (3 min)
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Create Emergency Request →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-500 hover:border-green-600 transition-colors cursor-pointer"
                    onClick={() => router.push('/dashboard/client/onboarding')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-600">Complete Your Profile</h3>
                      <p className="text-sm text-muted-foreground">Recommended</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Full setup: Better matching, priority support (15 min)
                  </p>
                  <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                    Start Full Setup →
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome back, {user?.name || 'Client'}! 👋
                  </h2>
                  <p className="text-white/90">
                    Ready to start your next project? Let's get you connected with the best contractors.
                  </p>
                </div>
                <Button 
                  className="bg-white text-[#00BFA6] hover:bg-gray-100"
                  onClick={() => setShowServiceModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            {/* Show Personalized Dashboard if user has preferences, otherwise show original dashboard */}
            {userPreferences ? (
              <PersonalizedDashboard 
                preferences={userPreferences}
                onServiceSelect={(serviceId) => {
                  console.log('Service selected:', serviceId);
                  // Handle service selection
                }}
                onCategorySelect={(categoryId) => {
                  console.log('Category selected:', categoryId);
                  setActiveTab('services');
                }}
              />
            ) : (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Total Requests</p>
                          <p className="text-2xl font-bold text-white">{analytics?.overview?.totalRequests || serviceRequests.length}</p>
                        </div>
                        <FileText className="h-8 w-8 text-[#00BFA6]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Active Requests</p>
                          <p className="text-2xl font-bold text-white">{analytics?.overview?.inProgressRequests || serviceRequests.filter(r => r.status === 'IN_PROGRESS').length}</p>
                        </div>
                        <Clock className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Completed</p>
                          <p className="text-2xl font-bold text-white">{analytics?.overview?.completedRequests || serviceRequests.filter(r => r.status === 'COMPLETED').length}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Success Rate</p>
                          <p className="text-2xl font-bold text-white">{analytics?.overview?.conversionRate || 0}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Service Categories */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Browse Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {serviceCategories.slice(0, 8).map((category) => (
                      <Card 
                        key={category.id} 
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gray-800 border-gray-700 hover:border-[#00BFA6]"
                        onClick={() => setActiveTab('services')}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <h4 className="font-semibold text-white text-sm">{category.name}</h4>
                          <p className="text-xs text-gray-400">{category.count} services</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Plus className="h-5 w-5 mr-2 text-[#00BFA6]" />
                        Request Service
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Submit a service request and get matched with qualified contractors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-[#00BFA6] hover:bg-[#00A693]"
                        onClick={() => setShowServiceModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Request
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Search className="h-5 w-5 mr-2 text-[#00BFA6]" />
                        Browse Services
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Explore available services across all categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setActiveTab('services')}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Browse Marketplace
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {userPreferences ? 'Personalized Services for You' : 'Browse Services'}
                </h3>
                <p className="text-gray-400 mt-1">
                  {userPreferences 
                    ? 'Services tailored to your preferences and interests' 
                    : 'Professional restoration and construction services'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 text-white border-gray-600'>
                    <SelectItem value="all" className='text-white hover:bg-gray-700'>All Services</SelectItem>
                    <SelectItem value="restoration" className='text-white hover:bg-gray-700'>Restoration</SelectItem>
                    <SelectItem value="home-services" className='text-white hover:bg-gray-700'>Home Services</SelectItem>
                    <SelectItem value="construction" className='text-white hover:bg-gray-700'>Construction & Trades</SelectItem>
                    <SelectItem value="professional" className='text-white hover:bg-gray-700'>Professional Services</SelectItem>
                    <SelectItem value="healthcare" className='text-white hover:bg-gray-700'>Healthcare Services</SelectItem>
                    <SelectItem value="real-estate" className='text-white hover:bg-gray-700'>Real Estate Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-blue-400 mr-3">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-blue-300">Need Emergency Service?</h4>
                  <p className="text-sm text-blue-200">Many of our contractors offer 24/7 emergency services for urgent restoration needs.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400">
                NRPG assigns a vetted contractor automatically. Contractor identities are not shown in the client portal.
              </p>
            </div>
            
            {loadingContractors ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                <span className="ml-2 text-gray-400">Loading contractors...</span>
              </div>
            ) : availableContractors.length >= 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">Contractor network is private</h3>
                <p className="text-gray-500">Submit a request and NRPG will dispatch a vetted, insured, qualified contractor for the role.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableContractors.map((contractor) => (
                <Card key={contractor.id} className="hover:shadow-lg transition-all duration-300 group bg-gray-800 border-gray-700 hover:border-[#00BFA6]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-lg">
                              {contractor.businessName?.charAt(0) || contractor.user.name?.charAt(0) || 'C'}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{contractor.businessName || contractor.user.name}</h4>
                            <p className="text-sm text-gray-400">{contractor.city}, {contractor.state}</p>
                          </div>
                        </div>
                        {contractor.bio && (
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{contractor.bio}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-green-500 text-green-400 bg-green-900/20"
                        >
                          {contractor.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                        <div className="flex items-center">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-white text-sm ml-1">{contractor.rating.toFixed(1)}</span>
                          <span className="text-gray-400 text-sm ml-1">({contractor.totalJobs})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">Experience</span>
                        <span className="text-sm text-white font-medium">{contractor.experience} years</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">Hourly Rate</span>
                        <span className="font-bold text-[#00BFA6] text-lg">${contractor.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">Services</span>
                        <span className="text-sm text-white">{contractor.services.slice(0, 2).join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">Availability</span>
                        <span className={`text-sm font-medium ${
                          contractor.availability === 'AVAILABLE' ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {contractor.availability === 'AVAILABLE' ? 'Available Now' : contractor.availability}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(contractor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{contractor.rating.toFixed(1)} ({contractor.totalJobs} jobs)</span>
                      </div>
                    </div>
                    
                    {/* Services Offered */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {contractor.services.slice(0, 3).map((service: string, index: number) => (
                          <Badge key={index} className="bg-gray-700 text-gray-300 text-xs">
                            {service}
                          </Badge>
                        ))}
                        {contractor.services.length > 3 && (
                          <Badge className="bg-gray-700 text-gray-300 text-xs">
                            +{contractor.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => handleViewContractor(contractor.id, contractor.services?.[0])}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 group-hover:shadow-md transition-all duration-200"
                        onClick={handleContactContractor}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        );

      case 'requests':
        return (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">My Service Requests</h3>
                  <p className="text-white/80">Track and manage all your service requests in one place</p>
                </div>
                <Button 
                  className="bg-white text-[#00BFA6] hover:bg-gray-100 font-semibold"
                  onClick={() => setShowServiceModal(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Request
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Requests</p>
                      <p className="text-2xl font-bold text-white">{serviceRequests.length}</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 text-sm font-bold">📋</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-white">{serviceRequests.filter(r => r.status === 'PENDING').length}</p>
                    </div>
                    <div className="h-8 w-8 bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-sm font-bold">⏳</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">In Progress</p>
                      <p className="text-2xl font-bold text-white">{serviceRequests.filter(r => r.status === 'IN_PROGRESS').length}</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 text-sm font-bold">🔄</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-white">{serviceRequests.filter(r => r.status === 'COMPLETED').length}</p>
                    </div>
                    <div className="h-8 w-8 bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-sm font-bold">✅</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise-Level Filter System */}
            <div className="space-y-4">
              {/* Search Bar */}
                  <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                  placeholder="Search by title, description, or location..." 
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-12 h-14 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/20"
                    />
                  </div>

              {/* Filter Pills - Stripe Style */}
              <div className="flex flex-wrap items-center gap-3">
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.status === 'all' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          All Status
                        </span>
                      ) : (
                        getStatusDisplay(filters.status)
                      )}
                    </SelectValue>
                    </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="all" className="hover:bg-gray-700 cursor-pointer">All Status</SelectItem>
                    <SelectItem value="PENDING" className="hover:bg-gray-700">Pending</SelectItem>
                    <SelectItem value="MATCHED" className="hover:bg-gray-700">Matched</SelectItem>
                    <SelectItem value="IN_PROGRESS" className="hover:bg-gray-700">In Progress</SelectItem>
                    <SelectItem value="COMPLETED" className="hover:bg-gray-700">Completed</SelectItem>
                    <SelectItem value="CANCELLED" className="hover:bg-gray-700">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.category === 'all' ? 'All Categories' : getCategoryDisplayName(filters.category)}
                    </SelectValue>
                    </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="all" className="hover:bg-gray-700">All Categories</SelectItem>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="hover:bg-gray-700">
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </span>
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>

                <Select value={filters.urgency} onValueChange={(value) => setFilters(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.urgency === 'all' ? 'All Urgency' : getUrgencyDisplayName(filters.urgency)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="all" className="hover:bg-gray-700">All Urgency</SelectItem>
                    <SelectItem value="emergency" className="hover:bg-gray-700">🚨 Emergency</SelectItem>
                    <SelectItem value="urgent" className="hover:bg-gray-700">⚡ Urgent</SelectItem>
                    <SelectItem value="normal" className="hover:bg-gray-700">📅 Normal</SelectItem>
                    <SelectItem value="flexible" className="hover:bg-gray-700">🔄 Flexible</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.dateRange === 'all' ? 'All Time' : 
                       filters.dateRange === 'today' ? 'Today' :
                       filters.dateRange === 'week' ? 'Past Week' :
                       filters.dateRange === 'month' ? 'Past Month' :
                       filters.dateRange === 'year' ? 'Past Year' : 'All Time'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="all" className="hover:bg-gray-700">All Time</SelectItem>
                    <SelectItem value="today" className="hover:bg-gray-700">Today</SelectItem>
                    <SelectItem value="week" className="hover:bg-gray-700">Past Week</SelectItem>
                    <SelectItem value="month" className="hover:bg-gray-700">Past Month</SelectItem>
                    <SelectItem value="year" className="hover:bg-gray-700">Past Year</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.sortBy === 'newest' ? 'Newest First' :
                       filters.sortBy === 'oldest' ? 'Oldest First' :
                       filters.sortBy === 'status' ? 'By Status' :
                       filters.sortBy === 'urgency' ? 'By Urgency' :
                       filters.sortBy === 'title' ? 'By Title' : 'Sort'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="newest" className="hover:bg-gray-700">Newest First</SelectItem>
                    <SelectItem value="oldest" className="hover:bg-gray-700">Oldest First</SelectItem>
                    <SelectItem value="status" className="hover:bg-gray-700">By Status</SelectItem>
                    <SelectItem value="urgency" className="hover:bg-gray-700">By Urgency</SelectItem>
                    <SelectItem value="title" className="hover:bg-gray-700">By Title</SelectItem>
                  </SelectContent>
                </Select>

                {/* Active Filters Count Badge */}
                {(filters.status !== 'all' || filters.category !== 'all' || filters.urgency !== 'all' || 
                  filters.dateRange !== 'all' || filters.insurance !== 'all' || filters.search) && (
                  <Badge className="bg-[#00BFA6] text-white px-3 py-1.5 h-9 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      Active Filters
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilters({
                        search: '',
                        status: 'all',
                        category: 'all',
                        urgency: 'all',
                        dateRange: 'all',
                        insurance: 'all',
                        sortBy: 'newest',
                        sortOrder: 'desc'
                      })}
                      className="h-auto px-2 py-0 text-white hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                </Button>
                  </Badge>
                )}

                <Select value={filters.insurance} onValueChange={(value) => setFilters(prev => ({ ...prev, insurance: value }))}>
                  <SelectTrigger className="h-9 px-4 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white focus:border-[#00BFA6]">
                    <SelectValue>
                      {filters.insurance === 'all' ? 'Insurance' : filters.insurance === 'yes' ? 'Yes' : 'No'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-[100]">
                    <SelectItem value="all" className="hover:bg-gray-700">All</SelectItem>
                    <SelectItem value="yes" className="hover:bg-gray-700">Insurance Claims</SelectItem>
                    <SelectItem value="no" className="hover:bg-gray-700">Non-Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filter Pills */}
              {filters.search && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Search:</span>
                  <Badge className="bg-gray-700 text-gray-200 px-3 py-1 border-none">
                    "{filters.search}"
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Requests List */}
            {loadingRequests ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                <span className="ml-2 text-gray-400">Loading requests...</span>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
                <div className="text-gray-500 mb-4">
                  <Plus className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {serviceRequests.length === 0 ? "No service requests yet" : "No requests match your filters"}
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {serviceRequests.length === 0 
                    ? "Get started by submitting your first service request. Our professional contractors are ready to help!"
                    : "Try adjusting your search criteria or filters to see more results."
                  }
                </p>
                {serviceRequests.length === 0 ? (
                <Button 
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white px-8 py-3 text-lg"
                  onClick={() => setShowServiceModal(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Submit Your First Request
                </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3 text-lg"
                    onClick={() => setFilters({
                      search: '',
                      status: 'all',
                      category: 'all',
                      urgency: 'all',
                      dateRange: 'all',
                      insurance: 'all',
                      sortBy: 'newest',
                      sortOrder: 'desc'
                    })}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#00BFA6] group bg-gray-800 border-gray-700">
                    <CardContent className="px-4 py-0">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Main Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-xl mb-2 group-hover:text-[#00BFA6] transition-colors">
                                {request.serviceTitle}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Category:</span>
                                  <Badge variant="outline" className="text-xs">
                                    {getCategoryDisplayName(request.serviceCategory)}
                                  </Badge>
                                </div>
                                {request.leadScore && (
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">Lead Score:</span>
                                    <Badge 
                                      className={`text-xs ${
                                        request.leadScore >= 80 ? 'bg-green-900/30 text-green-400 border-green-500' :
                                        request.leadScore >= 60 ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500' :
                                        'bg-red-900/30 text-red-400 border-red-500'
                                      }`}
                                    >
                                      {request.leadScore.toFixed(0)}
                                    </Badge>
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Urgency:</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      request.urgency === 'emergency' ? 'border-red-500 text-red-400 bg-red-900/20' :
                                      request.urgency === 'urgent' ? 'border-orange-500 text-orange-400 bg-orange-900/20' :
                                      'border-gray-500 text-gray-400 bg-gray-700'
                                    }`}
                                  >
                                    {getUrgencyDisplayName(request.urgency)}
                                  </Badge>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Location:</span>
                                  <span className="text-white">{request.location}</span>
                                </div>
                              </div>
                              
                              {request.description && (
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                  {request.description}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pt-2">
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Budget:</span>
                                  <span className="text-white">To be discussed</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Submitted:</span>
                                  <span className="text-white">{new Date(request.createdAt).toLocaleDateString()}</span>
                                </div>
                                {request.phone && (
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">Phone:</span>
                                    <span className="text-white">{request.phone}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 pt-2">
                                {request.insurance && (
                                  <Badge className="bg-blue-900/30 text-blue-400 border-blue-500">
                                    Insurance Claim
                                  </Badge>
                                )}
                                {request.urgentResponse && (
                                  <Badge className="bg-orange-900/30 text-orange-400 border-orange-500">
                                    Urgent Response
                                  </Badge>
                                )}
                                {request.preferredTime && (
                                  <Badge variant="outline" className="text-xs border-gray-500 text-gray-400 bg-gray-700">
                                    Preferred: {request.preferredTime}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col lg:items-end space-y-4">
                          <div className="text-right">
                            <Badge className={`${getStatusColor(request.status)} text-sm px-3 py-1`}>
                              {getStatusDisplay(request.status)}
                            </Badge>
                            {getProgressPercentage(request.status) > 0 && (
                              <div className="mt-3 w-40">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress</span>
                                  <span>{getProgressPercentage(request.status)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-[#00BFA6] h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${getProgressPercentage(request.status)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Contractor Matches Section */}
                          {false && (request.status === 'MATCHED' || request.status === 'IN_PROGRESS') && contractorMatches[request.id] && (
                            <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                              <h5 className="font-semibold text-white mb-3 flex items-center">
                                <Users className="h-4 w-4 mr-2 text-[#00BFA6]" />
                                Dispatch Status
                              </h5>
                              <div className="space-y-3">
                                {contractorMatches[request.id].slice(0, 3).map((match: any) => (
                                  <div key={match.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-[#00BFA6] rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                          {match.contractor.businessName?.charAt(0) || match.contractor.user.name?.charAt(0) || 'C'}
                                        </span>
                                      </div>
                                      <div>
                                        <h6 className="font-medium text-white">
                                          {match.contractor.businessName || match.contractor.user.name}
                                        </h6>
                                        <p className="text-sm text-gray-400">
                                          {match.contractor.city}, {match.contractor.state} • {match.contractor.experience} years exp
                                        </p>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <div className="flex items-center">
                                            <span className="text-yellow-400 text-sm">★</span>
                                            <span className="text-white text-sm ml-1">{match.contractor.rating.toFixed(1)}</span>
                                            <span className="text-gray-400 text-sm ml-1">({match.contractor.totalJobs} jobs)</span>
                                          </div>
                                          <Badge 
                                            className={`text-xs ${
                                              match.matchScore >= 80 ? 'bg-green-900/30 text-green-400 border-green-500' :
                                              match.matchScore >= 60 ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500' :
                                              'bg-red-900/30 text-red-400 border-red-500'
                                            }`}
                                          >
                                            {match.matchScore}% match
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                                        onClick={() => handleViewContractor(match.contractor.id, match.contractor.services?.[0])}
                                      >
                                        <Eye className="h-3 w-3 mr-1" />
                                        View Profile
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-[#00BFA6] hover:bg-[#00A693] text-white text-xs"
                                        onClick={handleContactContractor}
                                      >
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        Contact
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                {contractorMatches[request.id].length > 3 && (
                                  <p className="text-sm text-gray-400 text-center">
                                    +{contractorMatches[request.id].length - 3} more contractors available
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="group-hover:border-[#00BFA6] group-hover:text-[#00BFA6] transition-colors border-gray-600 text-gray-300 hover:bg-gray-700"
                              onClick={() => handleViewRequestDetails(request)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            {request.status === 'PENDING' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="group-hover:border-red-500 group-hover:text-red-500 transition-colors border-gray-600 text-gray-300 hover:bg-gray-700"
                                onClick={() => handleCancelRequest(request.id)}
                                disabled={cancellingRequest}
                              >
                                {cancellingRequest ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                                ) : (
                                  <X className="h-4 w-4 mr-2" />
                                )}
                                {cancellingRequest ? 'Cancelling...' : 'Cancel'}
                              </Button>
                            )}
                            {request.status === 'COMPLETED' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="group-hover:border-green-500 group-hover:text-green-500 transition-colors border-gray-600 text-gray-300 hover:bg-gray-700"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            )}
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

      case 'offers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Dispatch</h2>
                <p className="text-gray-400 mt-1">
                  NRPG assigns vetted contractors automatically. Contractor identities are not shown in the client portal.
                </p>
              </div>
              <Button
                onClick={fetchOffers}
                disabled={loadingOffers}
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                {loadingOffers ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Award className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>

            {loadingOffers ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
              </div>
            ) : offers.length >= 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Dispatch In Progress</h3>
                <p className="text-gray-400 mb-6">
                  When you submit a request, NRPG will dispatch a vetted, insured, qualified contractor automatically and keep you updated here.
                </p>
                <Button
                  onClick={() => setActiveTab('requests')}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  View Requests
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <Card key={offer.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={offer.contractor?.user?.avatar || ''} />
                              <AvatarFallback className="bg-[#00BFA6] text-white">
                                {offer.contractor?.user?.name?.charAt(0) || 'C'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">
                                {offer.contractor?.user?.name || 'Contractor'}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {offer.contractor?.businessName || 'Professional Contractor'}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-white mb-2">{offer.serviceRequest?.serviceTitle}</h4>
                            <p className="text-gray-300 text-sm mb-3">{offer.serviceRequest?.description}</p>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {offer.serviceRequest?.location}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Bid Amount</p>
                              <p className="text-lg font-semibold text-[#00BFA6]">
                                To be discussed
                              </p>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Timeline</p>
                              <p className="text-sm font-medium text-white">
                                {offer.timeline || 'Not specified'}
                              </p>
                            </div>
                            {offer.startDate && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">Start Date</p>
                                <p className="text-sm font-medium text-white">
                                  {new Date(offer.startDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                            {offer.estimatedHours && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">Est. Hours</p>
                                <p className="text-sm font-medium text-white">
                                  {offer.estimatedHours} hours
                                </p>
                              </div>
                            )}
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Status</p>
                              <Badge 
                                className={`${
                                  offer.status === 'PENDING' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : offer.status === 'ACCEPTED'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {offer.status}
                              </Badge>
                            </div>
                          </div>

                          {offer.contractorMessage && (
                            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                              <p className="text-sm text-gray-400 mb-2">Contractor's Message:</p>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {offer.contractorMessage}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                {offer.contractor?.rating?.toFixed(1) || '4.5'}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {offer.contractor?.totalJobs || 0} jobs
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(offer.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              {offer.status === 'PENDING' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAcceptOffer(offer.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectOffer(offer.id)}
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedRequest(offer.serviceRequest);
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

      case 'active-projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Active Projects</h2>
                <p className="text-gray-400 mt-1">
                  Manage your ongoing projects with contractors
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
                  You don't have any active projects yet. Accept an offer to start a project.
                </p>
                <Button
                  onClick={() => setActiveTab('offers')}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                >
                  <Award className="h-4 w-4 mr-2" />
                  View Offers
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
                              <AvatarImage src={project.contractor?.user?.avatar || ''} />
                              <AvatarFallback className="bg-[#00BFA6] text-white">
                                {project.contractor?.user?.name?.charAt(0) || 'C'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">
                                {project.contractor?.user?.name || 'Contractor'}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {project.contractor?.businessName || 'Professional Contractor'}
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
                                To be discussed
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
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                {project.contractor?.rating?.toFixed(1) || '4.5'}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {project.contractor?.totalJobs || 0} jobs
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(project.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleCompleteProject(project.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRateProject(project.id)}
                                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Rate
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

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Messages</h3>
                <p className="text-gray-400 mt-1">Communicate with contractors and get updates</p>
              </div>
              <Badge className="bg-[#00BFA6] text-white">
                {unreadCount} unread
              </Badge>
            </div>

            {loadingMessages ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                <span className="ml-2 text-gray-400">Loading messages...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
                <MessageSquare className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  When contractors respond to your requests, you'll see their messages here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-[#00BFA6] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {message.sender?.name?.charAt(0) || 'S'}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white truncate">
                              {message.sender?.name || 'System'}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">
                                {new Date(message.createdAt).toLocaleDateString()}
                              </span>
                              {!message.isRead && (
                                <div className="h-2 w-2 bg-[#00BFA6] rounded-full"></div>
                              )}
                            </div>
                          </div>
                          {message.subject && (
                            <p className="text-sm font-medium text-gray-300 mt-1">{message.subject}</p>
                          )}
                          <p className="text-gray-400 mt-2 line-clamp-2">{message.content}</p>
                          <div className="flex items-center mt-3 space-x-2">
                            <Badge 
                              className={`text-xs ${
                                message.messageType === 'MATCH_NOTIFICATION' ? 'bg-green-900/30 text-green-400 border-green-500' :
                                message.messageType === 'PROJECT_UPDATE' ? 'bg-blue-900/30 text-blue-400 border-blue-500' :
                                message.messageType === 'PAYMENT_REMINDER' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500' :
                                'bg-gray-900/30 text-gray-400 border-gray-500'
                              }`}
                            >
                              {message.messageType.replace('_', ' ').toLowerCase()}
                            </Badge>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Analytics Dashboard</h3>
                <p className="text-gray-400 mt-1">Track your project performance and insights</p>
              </div>
            </div>

            {analytics ? (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Total Requests</p>
                          <p className="text-2xl font-bold text-white">{analytics.overview.totalRequests}</p>
                        </div>
                        <FileText className="h-8 w-8 text-[#00BFA6]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Completed</p>
                          <p className="text-2xl font-bold text-white">{analytics.overview.completedRequests}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
                          <p className="text-2xl font-bold text-white">{analytics.overview.conversionRate}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Avg Lead Score</p>
                          <p className="text-2xl font-bold text-white">{analytics.overview.averageLeadScore}</p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">Your latest project updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.recentActivity.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{activity.title}</h4>
                            <p className="text-sm text-gray-400">{getCategoryDisplayName(activity.category)} • {new Date(activity.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={`${
                                activity.status === 'COMPLETED' ? 'bg-green-900/30 text-green-400 border-green-500' :
                                activity.status === 'IN_PROGRESS' ? 'bg-blue-900/30 text-blue-400 border-blue-500' :
                                'bg-yellow-900/30 text-yellow-400 border-yellow-500'
                              }`}
                            >
                              {activity.status}
                            </Badge>
                            {activity.leadScore && (
                              <Badge className="bg-[#00BFA6] text-white">
                                {activity.leadScore.toFixed(0)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Categories */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top Service Categories</CardTitle>
                    <CardDescription className="text-gray-400">Your most requested services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.topCategories.map((category: any, index: number) => (
                        <div key={category.category} className="flex items-center justify-between">
                          <span className="text-white">{getCategoryDisplayName(category.category)}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-[#00BFA6] h-2 rounded-full" 
                                style={{ width: `${(category.count / analytics.topCategories[0].count) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-400 text-sm">{category.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
                <BarChart3 className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No analytics data yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Submit your first service request to start seeing analytics and insights.
                </p>
                <Button 
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                  onClick={() => setShowServiceModal(true)}
                >
                  Submit Request
                </Button>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Your Profile</h3>
                <p className="text-gray-400 mt-1">Manage your preferences and personal information</p>
              </div>
            </div>

            <UserPreferencesDisplay 
              preferences={userPreferences}
              onEditPreferences={() => {
                // This could open a modal or redirect to preferences page
                console.log('Edit preferences clicked');
              }}
            />
          </div>
        );

      case 'contractors':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Private Contractor Network</h3>
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">Contractor identities are not shown to clients. NRPG dispatches vetted contractors automatically.</p>
            </div>
          </div>
        );


      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Settings & Preferences</h3>
                <p className="text-gray-400 mt-1">Customize your experience and manage your account</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || ''}
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || ''}
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567"
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    />
                  </div>
                  <Button className="w-full bg-[#00BFA6] hover:bg-[#00A693] text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-gray-400">Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-gray-400 text-sm">Receive updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-gray-400 text-sm">Receive urgent updates via SMS</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Match Notifications</p>
                      <p className="text-gray-400 text-sm">Get notified when contractors match</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Project Updates</p>
                      <p className="text-gray-400 text-sm">Receive project status updates</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Privacy & Security</CardTitle>
                  <CardDescription className="text-gray-400">Control your privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Profile Visibility</p>
                      <p className="text-gray-400 text-sm">Make your profile visible to contractors</p>
                    </div>
                    <select className="bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-1">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Contact Information</p>
                      <p className="text-gray-400 text-sm">Allow contractors to contact you directly</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Marketing Communications</p>
                      <p className="text-gray-400 text-sm">Receive promotional emails</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#00BFA6] rounded" />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Account Actions</CardTitle>
                  <CardDescription className="text-gray-400">Manage your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    Download Data
                  </Button>
                  <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <ClientLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showServiceModal={showServiceModal}
        setShowServiceModal={setShowServiceModal}
        unreadCount={unreadCount}
      >
        {renderContent()}
      </ClientLayout>

      {/* Service Request Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Request a Service</h2>
                  <p className="text-white/90 mt-1">
                    Submit your service request and get matched with qualified contractors
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowServiceModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 h-10 w-10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 bg-white">
              <form onSubmit={handleSubmitRequest} className="space-y-8">
                {/* Success/Error Messages */}
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Service request submitted successfully! Redirecting to your requests...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className='flex gap-6'>
                  {/* Left Column - Main Form */}
                  <div className="flex-1 space-y-6">
                {/* Service Category & Urgency */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                    <Label htmlFor="service-category" className="text-sm font-semibold text-gray-700 flex items-center">
                          <span className="text-red-500 mr-2">*</span>
                      Service Category
                    </Label>
                    <Select 
                      value={formData.serviceCategory} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, serviceCategory: value }))}
                    >
                          <SelectTrigger className="h-14 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white shadow-sm">
                        <SelectValue placeholder="Choose a service category">
                          {formData.serviceCategory ? getCategoryDisplayName(formData.serviceCategory) : "Choose a service category"}
                        </SelectValue>
                      </SelectTrigger>
                          <SelectContent className="z-[99999] bg-white border border-gray-200 shadow-xl rounded-lg">
                        {serviceCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id} className="py-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                                  <span className="text-xl mr-4">{category.icon}</span>
                              <div>
                                    <div className="font-semibold text-gray-900">{category.name}</div>
                                    <div className="text-sm text-gray-500">{category.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                      <div className="space-y-3">
                    <Label htmlFor="urgency" className="text-sm font-semibold text-gray-700 flex items-center">
                          <span className="text-red-500 mr-2">*</span>
                      Urgency Level
                    </Label>
                    <Select 
                      value={formData.urgency} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                    >
                          <SelectTrigger className="h-14 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white shadow-sm">
                        <SelectValue placeholder="Select urgency level">
                          {formData.urgency ? getUrgencyDisplayName(formData.urgency) : "Select urgency level"}
                        </SelectValue>
                      </SelectTrigger>
                          <SelectContent className="z-[99999] bg-white border border-gray-200 shadow-xl rounded-lg">
                            <SelectItem value="emergency" className="py-4 hover:bg-red-50 cursor-pointer">
                          <div className="flex items-center">
                                <span className="text-2xl mr-4">🚨</span>
                            <div>
                                  <div className="font-semibold text-gray-900">Emergency</div>
                                  <div className="text-sm text-gray-500">24 hours or less</div>
                            </div>
                          </div>
                        </SelectItem>
                            <SelectItem value="urgent" className="py-4 hover:bg-orange-50 cursor-pointer">
                          <div className="flex items-center">
                                <span className="text-2xl mr-4">⚡</span>
                            <div>
                                  <div className="font-semibold text-gray-900">Urgent</div>
                                  <div className="text-sm text-gray-500">2-3 days</div>
                            </div>
                          </div>
                        </SelectItem>
                            <SelectItem value="normal" className="py-4 hover:bg-blue-50 cursor-pointer">
                          <div className="flex items-center">
                                <span className="text-2xl mr-4">📅</span>
                            <div>
                                  <div className="font-semibold text-gray-900">Normal</div>
                                  <div className="text-sm text-gray-500">1-2 weeks</div>
                            </div>
                          </div>
                        </SelectItem>
                            <SelectItem value="flexible" className="py-4 hover:bg-green-50 cursor-pointer">
                          <div className="flex items-center">
                                <span className="text-2xl mr-4">🔄</span>
                            <div>
                                  <div className="font-semibold text-gray-900">Flexible</div>
                                  <div className="text-sm text-gray-500">1+ month</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Service Title */}
                    <div className="space-y-3">
                  <Label htmlFor="service-title" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-2">*</span>
                    Service Title
                  </Label>
                  <Input
                    id="service-title"
                    placeholder="e.g., Emergency Water Damage Restoration"
                    value={formData.serviceTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceTitle: e.target.value }))}
                        className="h-14 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white shadow-sm text-lg"
                  />
                </div>

                {/* Description */}
                    <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-2">*</span>
                    Description
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Please describe your service needs in detail. Include any specific requirements, damage details, or special instructions..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] min-h-[140px] bg-white shadow-sm text-gray-900"
                    rows={5}
                  />
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-1">💡</span>
                        Be as detailed as possible to help contractors understand your needs
                      </p>
                </div>

                    {/* Location */}
                    <div className="space-y-3">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="text-red-500 mr-2">*</span>
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Sydney, NSW 2000"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="h-14 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white shadow-sm text-lg"
                    />
                  </div>
                </div>

                  {/* Right Column - Contact & Options */}
                  <div className="w-80 space-y-6">
                {/* Contact Preferences */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">📞</span>
                        Contact Preferences
                      </h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+61 4XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="h-12 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred-time" className="text-sm font-semibold text-gray-700">Preferred Contact Time</Label>
                      <Select 
                        value={formData.preferredTime} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}
                      >
                            <SelectTrigger className="h-12 border-gray-300 focus:ring-2 focus:ring-[#00BFA6] focus:border-[#00BFA6] bg-white">
                          <SelectValue placeholder="When can we contact you?" />
                        </SelectTrigger>
                            <SelectContent className="z-[99999] bg-white border border-gray-200 shadow-lg rounded-lg">
                          <SelectItem value="anytime" className="hover:bg-gray-50">Anytime</SelectItem>
                          <SelectItem value="business-hours" className="hover:bg-gray-50">Business Hours (9 AM - 5 PM)</SelectItem>
                          <SelectItem value="evenings" className="hover:bg-gray-50">Evenings (5 PM - 8 PM)</SelectItem>
                          <SelectItem value="weekends" className="hover:bg-gray-50">Weekends Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">ℹ️</span>
                        Additional Information
                      </h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        id="insurance" 
                        checked={formData.insurance}
                        onChange={(e) => setFormData(prev => ({ ...prev, insurance: e.target.checked }))}
                            className="mt-1 rounded border-gray-300 text-[#00BFA6] focus:ring-[#00BFA6] h-5 w-5" 
                      />
                      <div>
                        <Label htmlFor="insurance" className="text-sm font-medium text-gray-700 cursor-pointer">
                          This is an insurance claim
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">Check if this service is covered by insurance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        id="urgent-response" 
                        checked={formData.urgentResponse}
                        onChange={(e) => setFormData(prev => ({ ...prev, urgentResponse: e.target.checked }))}
                            className="mt-1 rounded border-gray-300 text-[#00BFA6] focus:ring-[#00BFA6] h-5 w-5" 
                      />
                      <div>
                        <Label htmlFor="urgent-response" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Request urgent response
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">Get priority matching with contractors</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setShowServiceModal(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 h-12"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#00BFA6] hover:bg-[#00A693] px-8 py-3 h-12 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed top-16 left-0 right-0 bottom-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contractor Details Modal */}
      <Dialog open={showContractorModal} onOpenChange={setShowContractorModal}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl">
          <DialogHeader className="text-center pb-6">
            <DialogTitle className="text-xl font-bold text-gray-900 text-center">
              Professional Contractor
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm text-center">
              Detailed contractor information and contact options
            </DialogDescription>
          </DialogHeader>
          
          {selectedContractor && (
            <div className="space-y-8">
              {/* Professional Header */}
              <div className="text-center bg-gradient-to-r from-[#00BFA6] to-[#00A693] rounded-2xl p-8 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">
                    {selectedContractor.user?.name?.charAt(0) || selectedContractor.businessName?.charAt(0) || 'C'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{selectedContractor.businessName || selectedContractor.user?.name}</h3>
                <p className="text-md text-white/90 mb-2">{selectedContractor.user?.name} • {selectedContractor.user?.email}</p>
                
                <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedContractor.isVerified 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {selectedContractor.isVerified ? '✓ Verified' : '⏳ Pending'}
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                    {selectedContractor.availability}
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                    <Star className="h-5 w-5 text-yellow-300 fill-current" />
                    <span className="font-semibold">{selectedContractor.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-sm">({selectedContractor.totalJobs || 0} jobs)</span>
                  </div>
                </div>
              </div>

              {/* Main Content - Single Column Layout */}
              <div className="space-y-6">
                {/* Contact & Business Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-md text-gray-900 flex items-center">
                        <Phone className="h-3 w-3 mr-3 text-[#00BFA6]" />
                        Contact Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-[#00BFA6] flex-shrink-0" />
                        <span className="text-gray-700">{selectedContractor.user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-[#00BFA6] flex-shrink-0" />
                        <span className="text-gray-700">{selectedContractor.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3 w-3 text-[#00BFA6] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{selectedContractor.address}, {selectedContractor.city}, {selectedContractor.state} {selectedContractor.zipCode}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Details */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-md text-gray-900 flex items-center">
                        <Award className="h-3 w-3 mr-3 text-[#00BFA6]" />
                        Business Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-md font-bold text-[#00BFA6] mb-2">{selectedContractor.experience || 0}</div>
                          <div className="text-gray-600 ">Years Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="text-md font-bold text-[#00BFA6] mb-2">${selectedContractor.hourlyRate || 0}</div>
                          <div className="text-gray-600 ">Per Hour</div>
                        </div>
                        <div className="text-center">
                          <div className="text-md font-bold text-[#00BFA6] mb-2">{selectedContractor.totalJobs || 0}</div>
                          <div className="text-gray-600 ">Jobs Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-md font-bold text-[#00BFA6]">{selectedContractor.rating?.toFixed(1) || '0.0'}</span>
                          </div>
                          <div className="text-gray-600 text-sm">Average Rating</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Services & Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Services Offered */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-md text-gray-900 flex items-center">
                        <Shield className="h-3 w-3 mr-3 text-[#00BFA6]" />
                        Services Offered
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-3">
                        {selectedContractor.services?.map((service: string, index: number) => (
                          <Badge key={index} className="bg-[#00BFA6] text-white px-2 py-1 text-sm font-medium">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Service Areas */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-md text-gray-900 flex items-center">
                        <MapPin className="h-3 w-3 mr-3 text-[#00BFA6]" />
                        Service Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-3">
                        {selectedContractor.serviceAreas?.map((area: string, index: number) => (
                          <Badge key={index} className="bg-blue-600 text-white px-2 py-1 text-sm font-medium">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* About Section */}
                {selectedContractor.bio && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 rounded-t-lg">
                      <CardTitle className="text-md text-gray-900">About</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 py-2">
                      <p className="text-gray-700 leading-relaxed text-md">{selectedContractor.bio}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-[#00BFA6]/5 to-[#00A693]/5">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                    {selectedContractor.selectedServiceCategory && (
                      <div className="mb-4 p-3 bg-white/50 rounded-lg border border-[#00BFA6]/20">
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Service Category:</span> {selectedContractor.selectedServiceCategory}
                        </p>
                        <p className="text-xs text-gray-600">
                          This will be auto-selected when you create your service request
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <Button
                          className="flex-1 bg-[#00BFA6] hover:bg-[#00A693] text-white text-md py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              serviceCategory: selectedContractor.selectedServiceCategory || selectedContractor.services?.[0] || 'restoration',
                              serviceTitle: `Service from ${selectedContractor.businessName || selectedContractor.user?.name}`,
                              description: `Interested in services from ${selectedContractor.businessName || selectedContractor.user?.name}`,
                              location: `${selectedContractor.city}, ${selectedContractor.state}`
                            }));
                            setShowContractorModal(false);
                            setShowServiceModal(true);
                          }}
                        >
                        <MessageSquare className="h-3 w-3 mr-3" />
                        Request Service
                      </Button>
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-md py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={handleContactContractor}
                      >
                        <MessageSquare className="h-3 w-3 mr-3" />
                        Contact Me
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-md py-6 h-auto font-medium"
                        onClick={() => setShowContractorModal(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="h-6 w-6 mr-3 text-[#00BFA6]" />
              Chat with {selectedContractor?.businessName || selectedContractor?.user?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Negotiate and discuss service details directly
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-[600px]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BFA6]"></div>
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                chatMessages.map((message: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-[#00BFA6] text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sendingMessage}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white px-6"
                >
                  {sendingMessage ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Portal container for dropdowns */}
      <div id="dropdown-portal" className="relative z-[99999]"></div>

      {/* Request Details Modal */}
      {showRequestDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] text-white p-4 rounded-t-xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Request Details</h2>
                  <p className="text-white/90 mt-1">
              Complete information about your service request
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRequestDetailsModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 h-10 w-10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 bg-white space-y-8">
              {/* Request Header */}
              <div className="space-y-6">
                  <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedRequest.serviceTitle}</h3>
                  <div className="flex items-center gap-4">
                    <Badge className={`${getStatusColor(selectedRequest.status)} text-sm px-4 py-2 font-semibold`}>
                        {getStatusDisplay(selectedRequest.status)}
                      </Badge>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        Submitted: {new Date(selectedRequest.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedRequest.description && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-base flex items-center">
                      Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedRequest.description}</p>
                  </div>
                )}
              </div>

              {/* Service Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-700">Service Category</Label>
                  <p className="text-lg font-semibold text-gray-900">{getCategoryDisplayName(selectedRequest.serviceCategory)}</p>
                  
                  <Label className="text-sm font-semibold text-gray-700">Urgency Level</Label>
                      <Badge 
                        variant="outline" 
                    className={`text-sm px-4 py-2 font-semibold ${
                      selectedRequest.urgency === 'emergency' ? 'border-red-500 text-red-600 bg-red-50' :
                      selectedRequest.urgency === 'urgent' ? 'border-orange-500 text-orange-600 bg-orange-50' :
                      'border-gray-300 text-gray-600 bg-gray-50'
                        }`}
                      >
                        {getUrgencyDisplayName(selectedRequest.urgency)}
                      </Badge>
                    </div>

                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-700">Location</Label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRequest.location}</p>
                  
                    {selectedRequest.phone && (
                    <>
                      <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                      <p className="text-lg font-semibold text-gray-900">{selectedRequest.phone}</p>
                    </>
                  )}
                  
                    {selectedRequest.preferredTime && (
                    <>
                      <Label className="text-sm font-semibold text-gray-700">Preferred Time</Label>
                      <p className="text-lg font-semibold text-gray-900">{selectedRequest.preferredTime}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Special Requirements */}
              {(selectedRequest.insurance || selectedRequest.urgentResponse) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Special Requirements</h4>
                  <div className="flex flex-wrap gap-3">
                      {selectedRequest.insurance && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-4 py-2 text-sm font-semibold">
                          Insurance Claim
                        </Badge>
                      )}
                      {selectedRequest.urgentResponse && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-300 px-4 py-2 text-sm font-semibold">
                          Urgent Response Required
                        </Badge>
                      )}
                    </div>
                </div>
              )}

              {/* Contractor Matches */}
              {false && contractorMatches[selectedRequest.id] && contractorMatches[selectedRequest.id].length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">
                      Matched Contractors ({contractorMatches[selectedRequest.id].length})
                  </h4>
                  <div className="space-y-4">
                      {contractorMatches[selectedRequest.id].map((match: any) => (
                      <div key={match.id} className="flex items-center justify-between p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                {match.contractor.businessName?.charAt(0) || match.contractor.user.name?.charAt(0) || 'C'}
                              </span>
                            </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-gray-900 text-lg mb-1">
                                {match.contractor.businessName || match.contractor.user.name}
                              </h6>
                            <p className="text-sm text-gray-600 mb-2">
                              {match.contractor.city}, {match.contractor.state} • {match.contractor.experience} years experience
                              </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-gray-900 text-sm font-medium">{match.contractor.rating.toFixed(1)}</span>
                                <span className="text-gray-500 text-sm ml-1">({match.contractor.totalJobs} jobs)</span>
                                </div>
                                <Badge 
                                className={`text-sm px-3 py-1 font-semibold ${
                                  match.matchScore >= 80 ? 'bg-green-50 text-green-700 border-green-300' :
                                  match.matchScore >= 60 ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                                  'bg-red-50 text-red-700 border-red-300'
                                  }`}
                                >
                                  {match.matchScore}% match
                                </Badge>
                              </div>
                            </div>
                          </div>
                        <div className="flex items-center space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                            className="text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
                              onClick={() => handleViewContractor(match.contractor.id, match.contractor.services?.[0])}
                            >
                            <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Button>
                            <Button
                              size="sm"
                            className="bg-[#00BFA6] hover:bg-[#00A693] text-white text-sm"
                              onClick={handleContactContractor}
                            >
                            <MessageCircle className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              )}
            </div>
          </div>
            </div>
          )}

      {/* Client Onboarding Modal */}
      {showOnboarding && (
        <ClientOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Floating Chat Widget */}
      <FloatingChatWidget 
        currentUserId={user?.id || ''} 
        currentUserType={user?.userType || 'CLIENT'} 
      />
      
      {/* Active Project Details Modal */}
      {showDetailsModal && selectedProjectId && (
        <ActiveProjectDetailsModal
          projectId={selectedProjectId}
          isOpen={showDetailsModal}
          userType="CLIENT"
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedProjectId(null);
          }}
        />
      )}

      {/* Removed Modal - Using Inline Filters */}
      {false && showFiltersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Advanced Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFiltersModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Service Category Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-300">Service Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Categories</SelectItem>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white hover:bg-gray-700">
                        <div className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Urgency Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-300">Urgency Level</Label>
                <Select value={filters.urgency} onValueChange={(value) => setFilters(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Urgency Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Urgency Levels</SelectItem>
                    <SelectItem value="emergency" className="text-white hover:bg-gray-700">
                      <div className="flex items-center">
                        <span className="mr-2">🚨</span>
                        Emergency
                      </div>
                    </SelectItem>
                    <SelectItem value="urgent" className="text-white hover:bg-gray-700">
                      <div className="flex items-center">
                        <span className="mr-2">⚡</span>
                        Urgent
                      </div>
                    </SelectItem>
                    <SelectItem value="normal" className="text-white hover:bg-gray-700">
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        Normal
                      </div>
                    </SelectItem>
                    <SelectItem value="flexible" className="text-white hover:bg-gray-700">
                      <div className="flex items-center">
                        <span className="mr-2">🔄</span>
                        Flexible
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-300">Date Range</Label>
                <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Time</SelectItem>
                    <SelectItem value="today" className="text-white hover:bg-gray-700">Today</SelectItem>
                    <SelectItem value="week" className="text-white hover:bg-gray-700">Past Week</SelectItem>
                    <SelectItem value="month" className="text-white hover:bg-gray-700">Past Month</SelectItem>
                    <SelectItem value="year" className="text-white hover:bg-gray-700">Past Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Insurance Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-300">Insurance Claims</Label>
                <Select value={filters.insurance} onValueChange={(value) => setFilters(prev => ({ ...prev, insurance: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Requests" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Requests</SelectItem>
                    <SelectItem value="yes" className="text-white hover:bg-gray-700">Insurance Claims Only</SelectItem>
                    <SelectItem value="no" className="text-white hover:bg-gray-700">Non-Insurance Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-300">Sort Order</Label>
                <Select value={filters.sortOrder} onValueChange={(value) => setFilters(prev => ({ ...prev, sortOrder: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="desc" className="text-white hover:bg-gray-700">Descending (Newest First)</SelectItem>
                    <SelectItem value="asc" className="text-white hover:bg-gray-700">Ascending (Oldest First)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setFilters({
                  search: '',
                  status: 'all',
                  category: 'all',
                  urgency: 'all',
                  dateRange: 'all',
                  insurance: 'all',
                  sortBy: 'newest',
                  sortOrder: 'desc'
                })}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFiltersModal(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowFiltersModal(false)}
                  className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIndustryConfig } from '@/contexts/TenantContext';
import {
  ArrowLeft,
  ArrowRight,
  Building,
  CheckCircle,
  Droplets,
  File,
  Hammer,
  Home,
  MessageSquare,
  Shield,
  Settings,
  Wrench,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface PreferenceSelectorProps {
  onComplete: (preferences: UserPreferences) => void;
  onSkip: () => void;
}

interface UserPreferences {
  interests: string[];
  serviceTypes: string[];
  budgetRange: string;
  urgencyLevel: string;
  communicationStyle: string;
  notificationSettings: any;
  dashboardLayout: any;
  themePreferences: any;
}

const INTEREST_CATEGORIES = [
  { id: 'home-improvement', label: 'Home Improvement', icon: Home, color: 'bg-blue-500' },
  { id: 'emergency-services', label: 'Emergency Services', icon: Zap, color: 'bg-red-500' },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'bg-green-500' },
  { id: 'security', label: 'Security & Safety', icon: Shield, color: 'bg-purple-500' },
  { id: 'renovation', label: 'Renovation', icon: Hammer, color: 'bg-orange-500' },
  { id: 'consultation', label: 'Consultation', icon: MessageSquare, color: 'bg-teal-500' },
  { id: 'cleaning', label: 'Cleaning Services', icon: Droplets, color: 'bg-cyan-500' },
  { id: 'repairs', label: 'Repairs & Fixes', icon: Settings, color: 'bg-indigo-500' },
  { id: 'insurance', label: 'Insurance Claims', icon: File, color: 'bg-pink-500' },
  { id: 'commercial', label: 'Commercial Services', icon: Building, color: 'bg-yellow-500' },
];

const BUDGET_RANGES = [
  { id: 'under-500', label: 'Under $500', description: 'Small repairs and quick fixes' },
  { id: '500-1k', label: '$500 - $1,000', description: 'Minor repairs and maintenance' },
  { id: '1k-5k', label: '$1,000 - $5,000', description: 'Medium projects and repairs' },
  { id: '5k-10k', label: '$5,000 - $10,000', description: 'Large projects and renovations' },
  { id: '10k-25k', label: '$10,000 - $25,000', description: 'Major renovations and improvements' },
  { id: 'over-25k', label: 'Over $25,000', description: 'Full home renovations and major projects' },
  { id: 'flexible', label: 'Flexible', description: 'Budget varies by project' },
  { id: 'insurance', label: 'Insurance Covered', description: 'Projects covered by insurance' },
];

const URGENCY_LEVELS = [
  { id: 'emergency', label: 'Emergency', description: 'Need immediate assistance', color: 'text-red-500' },
  { id: 'urgent', label: 'Urgent', description: 'Within 24-48 hours', color: 'text-orange-500' },
  { id: 'standard', label: 'Standard', description: 'Within a week', color: 'text-blue-500' },
  { id: 'planned', label: 'Planned', description: 'Flexible timing', color: 'text-green-500' },
  { id: 'seasonal', label: 'Seasonal', description: 'Timing depends on weather/season', color: 'text-purple-500' },
  { id: 'insurance', label: 'Insurance Timeline', description: 'Follows insurance claim process', color: 'text-indigo-500' },
];

const COMMUNICATION_STYLES = [
  { id: 'direct', label: 'Direct Communication', description: 'Phone calls and direct messages' },
  { id: 'email', label: 'Email Preferred', description: 'Detailed email updates' },
  { id: 'mixed', label: 'Mixed Approach', description: 'Combination of methods' },
  { id: 'minimal', label: 'Minimal Updates', description: 'Only essential communications' },
  { id: 'text', label: 'Text Messages', description: 'SMS and instant messaging' },
  { id: 'app', label: 'App Notifications', description: 'In-app messages and alerts' },
  { id: 'video', label: 'Video Calls', description: 'Face-to-face video consultations' },
  { id: 'document', label: 'Written Updates', description: 'Detailed written reports and updates' },
];

// Fallback service categories if tenant config is empty
const DEFAULT_SERVICE_CATEGORIES = [
  'Water Damage Restoration',
  'Fire Damage Restoration',
  'Mold Remediation',
  'Storm Damage Repair',
  'Flood Restoration',
  'Emergency Services',
  'Structural Repairs',
  'Content Restoration',
  'Odor Removal',
  'Carpet Cleaning',
  'Upholstery Cleaning',
  'Tile & Grout Cleaning',
  'Air Duct Cleaning',
  'Commercial Cleaning',
  'Disaster Recovery',
  'Insurance Claims',
  'Assessment & Inspection',
  'Preventive Maintenance',
  'Consultation Services',
  '24/7 Emergency Response',
  'Roofing & Guttering',
  'Plumbing Services',
  'Electrical Work',
  'HVAC Services',
  'Painting & Decorating',
  'Flooring Installation',
  'Kitchen Renovation',
  'Bathroom Renovation',
  'Window & Door Replacement',
  'Fence & Gate Repair',
  'Garden & Landscaping',
  'Pool Maintenance',
  'Security Systems',
  'Home Automation',
  'Energy Efficiency',
  'Asbestos Removal',
  'Lead Paint Removal',
  'Termite Treatment',
  'Pest Control',
  'Home Inspection'
];

export default function PreferenceSelector({ onComplete, onSkip }: PreferenceSelectorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Safety check for serviceCategories with error handling
  let serviceCategories = [];
  try {
    const config = useIndustryConfig();
    serviceCategories = config?.serviceCategories || [];
  } catch (error) {
    console.warn('Failed to load industry config, using defaults:', error);
    serviceCategories = [];
  }
  
  // If no service categories are available, use defaults
  if (!serviceCategories || serviceCategories.length === 0) {
    serviceCategories = DEFAULT_SERVICE_CATEGORIES;
  }
  
  // Ensure we always have service categories
  const finalServiceCategories = serviceCategories.length > 0 ? serviceCategories : DEFAULT_SERVICE_CATEGORIES;
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    serviceTypes: [],
    budgetRange: '',
    urgencyLevel: '',
    communicationStyle: '',
    notificationSettings: {},
    dashboardLayout: {},
    themePreferences: {}
  });

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Minimum loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleServiceTypeToggle = (serviceType: string) => {
    setPreferences(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(serviceType)
        ? prev.serviceTypes.filter(type => type !== serviceType)
        : [...prev.serviceTypes, serviceType]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">What interests you most?</h2>
              <p className="text-gray-400 text-lg">Select all that apply to personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INTEREST_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isSelected = preferences.interests.includes(category.id);
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'ring-2 ring-[#00BFA6] bg-[#00BFA6]/10 border-[#00BFA6]' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => handleInterestToggle(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{category.label}</h3>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-[#00BFA6] mx-auto" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">What services do you need?</h2>
              <p className="text-gray-400 text-lg">Choose the services you're most likely to request</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {finalServiceCategories.map((category: string) => {
                const isSelected = preferences.serviceTypes.includes(category);
                return (
                  <Card
                    key={category}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-[#00BFA6] bg-[#00BFA6]/10 border-[#00BFA6]' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => handleServiceTypeToggle(category)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="text-white font-medium">{category}</span>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-[#00BFA6]" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">What's your typical budget range?</h2>
              <p className="text-gray-400 text-lg">This helps us show you relevant contractors</p>
            </div>
            
            <div className="space-y-3">
              {BUDGET_RANGES.map((range) => {
                const isSelected = preferences.budgetRange === range.id;
                return (
                  <Card
                    key={range.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-[#00BFA6] bg-[#00BFA6]/10 border-[#00BFA6]' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPreferences(prev => ({ ...prev, budgetRange: range.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{range.label}</h3>
                          <p className="text-gray-400 text-sm">{range.description}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="h-5 w-5 text-[#00BFA6]" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">How urgent are your needs typically?</h2>
              <p className="text-gray-400 text-lg">This helps us prioritize your requests</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {URGENCY_LEVELS.map((level) => {
                const isSelected = preferences.urgencyLevel === level.id;
                return (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-[#00BFA6] bg-[#00BFA6]/10 border-[#00BFA6]' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPreferences(prev => ({ ...prev, urgencyLevel: level.id }))}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`text-4xl mb-4 ${level.color}`}>
                        {level.id === 'emergency' && '🚨'}
                        {level.id === 'urgent' && '⚡'}
                        {level.id === 'standard' && '📅'}
                        {level.id === 'planned' && '📋'}
                      </div>
                      <h3 className={`font-semibold mb-2 ${level.color}`}>{level.label}</h3>
                      <p className="text-gray-400 text-sm">{level.description}</p>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-[#00BFA6] mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">How do you prefer to communicate?</h2>
              <p className="text-gray-400 text-lg">This helps contractors know how to reach you</p>
            </div>
            
            <div className="space-y-3">
              {COMMUNICATION_STYLES.map((style) => {
                const isSelected = preferences.communicationStyle === style.id;
                return (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-[#00BFA6] bg-[#00BFA6]/10 border-[#00BFA6]' 
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setPreferences(prev => ({ ...prev, communicationStyle: style.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{style.label}</h3>
                          <p className="text-gray-400 text-sm">{style.description}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="h-5 w-5 text-[#00BFA6]" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BFA6] mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-400">Setting up your personalized experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Personalize Your Experience</h1>
              <p className="text-gray-400">Step {currentStep} of {totalSteps}</p>
            </div>
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-gray-400 hover:text-white"
            >
              Skip for now
            </Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {preferences.interests.length > 0 && currentStep === 1 && (
                <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6]">
                  {preferences.interests.length} selected
                </Badge>
              )}
              {preferences.serviceTypes.length > 0 && currentStep === 2 && (
                <Badge variant="outline" className="border-[#00BFA6] text-[#00BFA6]">
                  {preferences.serviceTypes.length} selected
                </Badge>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && preferences.interests.length === 0) ||
                (currentStep === 2 && preferences.serviceTypes.length === 0) ||
                (currentStep === 3 && !preferences.budgetRange) ||
                (currentStep === 4 && !preferences.urgencyLevel) ||
                (currentStep === 5 && !preferences.communicationStyle)
              }
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

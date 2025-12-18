'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  Wrench, 
  Star, 
  Clock, 
  DollarSign,
  Users,
  Award,
  Briefcase,
  Shield,
  Zap,
  Building,
  Car,
  Droplets,
  Flame,
  CloudRain,
  MapPin,
  MessageSquare,
  Search,
  BarChart3,
  FileText,
  User
} from 'lucide-react';
import { THEMES, useTheme } from "@/contexts/ThemeContext";

interface ClientOnboardingProps {
  onComplete: (preferences: ClientPreferences) => void;
  onSkip: () => void;
}

interface ClientPreferences {
  selectedCategories: string[];
  locations: string[];
  budgetRange: string;
  urgencyLevel: string;
  selectedTheme: string;
  isOnboardingComplete: boolean;
}

const SERVICE_CATEGORIES = [
  { id: 'water-damage', name: 'Water Damage Restoration', icon: Droplets, description: 'Emergency water damage cleanup and restoration' },
  { id: 'fire-damage', name: 'Fire Damage Restoration', icon: Flame, description: 'Fire damage cleanup and restoration services' },
  { id: 'mold-remediation', name: 'Mold Remediation', icon: Shield, description: 'Professional mold removal and prevention' },
  { id: 'storm-damage', name: 'Storm Damage Repair', icon: CloudRain, description: 'Storm and weather damage repair' },
  { id: 'home-maintenance', name: 'Home Maintenance', icon: Home, description: 'Regular home maintenance and repair' },
  { id: 'emergency-services', name: 'Emergency Services', icon: Zap, description: '24/7 emergency response services' },
  { id: 'construction', name: 'Construction & Trades', icon: Building, description: 'General construction and trade work' },
  { id: 'automotive', name: 'Automotive Services', icon: Car, description: 'Vehicle repair and maintenance' }
];


const BUDGET_RANGES = [
  { value: 'under-1000', label: 'Under $1,000', description: 'Small repairs and maintenance' },
  { value: '1000-5000', label: '$1,000 - $5,000', description: 'Medium projects and repairs' },
  { value: '5000-10000', label: '$5,000 - $10,000', description: 'Significant restoration work' },
  { value: '10000-25000', label: '$10,000 - $25,000', description: 'Major renovation projects' },
  { value: '25000-plus', label: '$25,000+', description: 'Large construction projects' }
];

const URGENCY_LEVELS = [
  { value: 'emergency', label: 'Emergency', description: 'Immediate response needed' },
  { value: 'urgent', label: 'Urgent', description: 'Within 24-48 hours' },
  { value: 'high', label: 'High Priority', description: 'Within a week' },
  { value: 'normal', label: 'Normal', description: 'Within 2-4 weeks' },
  { value: 'low', label: 'Low Priority', description: 'Flexible timeline' }
];

const THEME_OPTIONS = THEMES;

export default function ClientOnboarding({ onComplete, onSkip }: ClientOnboardingProps) {
  const { setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<ClientPreferences>({
    selectedCategories: [],
    locations: [],
    budgetRange: '',
    urgencyLevel: '',
    selectedTheme: '',
    isOnboardingComplete: false
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Apply the selected theme immediately
      if (preferences.selectedTheme) {
        setTheme(preferences.selectedTheme);
      }
      
      const completedPreferences = {
        serviceTypes: preferences.selectedCategories, // Use serviceTypes as per schema
        budgetRange: preferences.budgetRange,
        urgencyLevel: preferences.urgencyLevel,
        selectedTheme: preferences.selectedTheme,
        themePreferences: preferences.selectedTheme, // Map to themePreferences for API
        isOnboardingComplete: true
      };
      await onComplete(completedPreferences);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setPreferences(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };


  const setBudgetRange = (budgetValue: string) => {
    setPreferences(prev => ({
      ...prev,
      budgetRange: budgetValue
    }));
  };

  const setUrgencyLevel = (urgencyValue: string) => {
    setPreferences(prev => ({
      ...prev,
      urgencyLevel: urgencyValue
    }));
  };

  const toggleTheme = (themeId: string) => {
    setPreferences(prev => ({
      ...prev,
      selectedTheme: prev.selectedTheme === themeId ? '' : themeId
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Service Categories</h2>
              <p className="text-gray-400 text-lg">Select the types of services you're interested in</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICE_CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      preferences.selectedCategories.includes(category.id)
                        ? 'bg-[#00BFA6] border-[#00BFA6] text-white'
                        : 'bg-gray-800 border-gray-700 hover:border-[#00BFA6] text-gray-300'
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-80">{category.description}</p>
                      {preferences.selectedCategories.includes(category.id) && (
                        <CheckCircle className="h-5 w-5 text-white mt-3 mx-auto" />
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Service Location</h2>
              <p className="text-gray-400 text-lg">Enter your primary service location (we'll integrate map API later)</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-white text-lg font-medium mb-2 block">
                    Primary Service Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter your city, state (e.g., New York, NY)"
                    value={preferences.locations[0] || ''}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      locations: e.target.value ? [e.target.value] : []
                    }))}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#00BFA6] focus:ring-[#00BFA6]"
                  />
                </div>
                <p className="text-gray-400 text-sm text-center">
                  💡 We'll integrate a map API in the future to help you select precise locations
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Budget Range</h2>
              <p className="text-gray-400 text-lg">What's your typical project budget range?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUDGET_RANGES.map((budget) => (
                <Card
                  key={budget.value}
                  className={`cursor-pointer transition-all duration-200 ${
                    preferences.budgetRange === budget.value
                      ? 'bg-[#00BFA6] border-[#00BFA6] text-white'
                      : 'bg-gray-800 border-gray-700 hover:border-[#00BFA6] text-gray-300'
                  }`}
                  onClick={() => setBudgetRange(budget.value)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5" />
                      <div>
                        <h3 className="font-semibold mb-1">{budget.label}</h3>
                        <p className="text-sm opacity-80">{budget.description}</p>
                      </div>
                      {preferences.budgetRange === budget.value && (
                        <CheckCircle className="h-5 w-5 text-white ml-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Urgency Level</h2>
              <p className="text-gray-400 text-lg">How quickly do you typically need services?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {URGENCY_LEVELS.map((urgency) => (
                <Card
                  key={urgency.value}
                  className={`cursor-pointer transition-all duration-200 ${
                    preferences.urgencyLevel === urgency.value
                      ? 'bg-[#00BFA6] border-[#00BFA6] text-white'
                      : 'bg-gray-800 border-gray-700 hover:border-[#00BFA6] text-gray-300'
                  }`}
                  onClick={() => setUrgencyLevel(urgency.value)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5" />
                      <div>
                        <h3 className="font-semibold mb-1">{urgency.label}</h3>
                        <p className="text-sm opacity-80">{urgency.description}</p>
                      </div>
                      {preferences.urgencyLevel === urgency.value && (
                        <CheckCircle className="h-5 w-5 text-white ml-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Choose Your Theme</h2>
              <p className="text-gray-400 text-lg">Select a theme that matches your style and preferences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {THEME_OPTIONS.map((theme) => (
                <Card
                  key={theme.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    preferences.selectedTheme === theme.id
                      ? 'border-2 border-white'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{
                    backgroundColor: preferences.selectedTheme === theme.id 
                      ? theme.primaryColor 
                      : '#1F2937'
                  }}
                  onClick={() => toggleTheme(theme.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondaryColor }}
                        ></div>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.accentColor }}
                        ></div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-white">{theme.name}</h3>
                        <p className="text-sm opacity-80 text-gray-300">{theme.description}</p>
                      </div>
                      {preferences.selectedTheme === theme.id && (
                        <CheckCircle className="h-5 w-5 text-white ml-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Client Setup</h1>
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

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-[#00BFA6] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
            >
              {isLoading ? 'Saving...' : currentStep === totalSteps ? 'Complete Setup' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
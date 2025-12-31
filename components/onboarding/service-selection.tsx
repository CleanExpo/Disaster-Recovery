'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Palette,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ServiceSelectionProps {
  onComplete: (selections: ServiceSelections) => void;
  onSkip: () => void;
}

interface ServiceSelections {
  selectedCategories: string[];
  selectedServices: string[];
  brandingColor: string;
  selectedTheme: string;
}

interface AdminServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  theme: string;
  services: AdminService[];
}

interface AdminService {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  theme: string;
}

interface AdminTheme {
  id: string;
  name: string;
  identifier: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

const BRANDING_COLORS = [
  { name: 'Ocean Blue', value: '#00BFA6', description: 'Professional and trustworthy' },
  { name: 'Royal Purple', value: '#7C4DFF', description: 'Creative and innovative' },
  { name: 'Sky Blue', value: '#2196F3', description: 'Calm and reliable' },
  { name: 'Forest Green', value: '#4CAF50', description: 'Natural and sustainable' },
  { name: 'Sunset Orange', value: '#FF9800', description: 'Energetic and warm' },
  { name: 'Crimson Red', value: '#F44336', description: 'Bold and confident' },
  { name: 'Deep Purple', value: '#9C27B0', description: 'Luxury and sophistication' },
  { name: 'Teal Green', value: '#009688', description: 'Modern and fresh' }
];

export default function ServiceSelection({ onComplete, onSkip }: ServiceSelectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<AdminServiceCategory[]>([]);
  const [themes, setThemes] = useState<AdminTheme[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBrandingColor, setSelectedBrandingColor] = useState<string>('#00BFA6');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const totalSteps = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesRes, themesRes] = await Promise.all([
          fetch('/api/admin/service-categories', { cache: 'no-store' }),
          fetch('/api/admin/themes', { cache: 'no-store' })
        ]);

        if (categoriesRes.status === 401 || themesRes.status === 401) {
          toast.error('Please sign in to continue');
          return;
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.data || []);
        }

        if (themesRes.ok) {
          const themesData = await themesRes.json();
          setThemes(themesData.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load onboarding data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const progress = (currentStep / totalSteps) * 100;

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

  const handleComplete = () => {
    const selections: ServiceSelections = {
      selectedCategories,
      selectedServices,
      brandingColor: selectedBrandingColor,
      selectedTheme
    };
    onComplete(selections);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getAvailableServices = () => {
    return categories
      .filter(category => selectedCategories.includes(category.id))
      .flatMap(category => category.services);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">What services do you need?</h2>
              <p className="text-gray-400">Choose the service categories you're most likely to request</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedCategories.includes(category.id)
                      ? 'bg-[#00BFA6] border-[#00BFA6] shadow-lg'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                    {selectedCategories.includes(category.id) && (
                      <CheckCircle className="h-5 w-5 text-white mx-auto" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedCategories.length > 0 && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Selected Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map(categoryId => {
                    const category = categories.find(c => c.id === categoryId);
                    return (
                      <Badge key={categoryId} className="bg-[#00BFA6] text-white">
                        {category?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        const availableServices = getAvailableServices();
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Select Specific Services</h2>
              <p className="text-gray-400">Choose the specific services you need from your selected categories</p>
            </div>

            {availableServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableServices.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedServices.includes(service.id)
                        ? 'bg-[#7C4DFF] border-[#7C4DFF] shadow-lg'
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{service.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{service.name}</h3>
                          <p className="text-sm text-gray-400">{service.description}</p>
                        </div>
                        {selectedServices.includes(service.id) && (
                          <CheckCircle className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Please select service categories first</p>
              </div>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Selected Services:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map(serviceId => {
                    const service = availableServices.find(s => s.id === serviceId);
                    return (
                      <Badge key={serviceId} className="bg-[#7C4DFF] text-white">
                        {service?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Branding</h2>
              <p className="text-gray-400">Select your preferred branding color and theme</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Branding Color</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BRANDING_COLORS.map((color) => (
                    <Card 
                      key={color.value}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedBrandingColor === color.value
                          ? 'bg-gray-700 border-2 border-white'
                          : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedBrandingColor(color.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-600"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        <h4 className="font-medium text-white text-sm">{color.name}</h4>
                        <p className="text-xs text-gray-400">{color.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Dashboard Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <Card 
                      key={theme.id}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedTheme === theme.identifier
                          ? 'bg-gray-700 border-2 border-white'
                          : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedTheme(theme.identifier)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
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
                            <h4 className="font-medium text-white">{theme.name}</h4>
                            <p className="text-sm text-gray-400">{theme.identifier}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Your Selection Summary:</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedBrandingColor }}
                  ></div>
                  <span className="text-gray-300">Branding Color: {BRANDING_COLORS.find(c => c.value === selectedBrandingColor)?.name}</span>
                </div>
                <div className="text-gray-300">
                  Theme: {themes.find(t => t.identifier === selectedTheme)?.name || 'Default'}
                </div>
                <div className="text-gray-300">
                  Categories: {selectedCategories.length} selected
                </div>
                <div className="text-gray-300">
                  Services: {selectedServices.length} selected
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BFA6] mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-400">Setting up your service preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Service Selection</h1>
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
              {currentStep === 1 && selectedCategories.length === 0 && (
                <span className="text-sm text-gray-400">Please select at least one category</span>
              )}
              {currentStep === 2 && selectedServices.length === 0 && (
                <span className="text-sm text-gray-400">Please select at least one service</span>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && selectedCategories.length === 0) ||
                (currentStep === 2 && selectedServices.length === 0) ||
                (currentStep === 3 && !selectedTheme)
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

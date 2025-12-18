'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Wrench,
  Zap,
  Home,
  Building,
  Car,
  Droplets,
  Flame,
  CloudRain,
  Shield,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface ContractorDashboardProps {
  preferences: ContractorPreferences | null;
  onRequestSelect: (requestId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

interface ContractorPreferences {
  serviceCategories: string[];
  locations: string[];
  experience: string;
  expertise: string[];
  background: string;
  hourlyRate: string;
  availability: string;
  maxDistance: string;
  isOnboardingComplete: boolean;
}

const CATEGORY_ICONS = {
  'water-damage': Droplets,
  'fire-damage': Flame,
  'mold-remediation': Shield,
  'storm-damage': CloudRain,
  'home-maintenance': Home,
  'emergency-services': Zap,
  'construction': Building,
  'automotive': Car,
};

const EXPERTISE_ICONS = {
  'emergency-response': Zap,
  'insurance-work': Shield,
  'commercial': Building,
  'residential': Home,
  'restoration': Wrench,
  'preventive': Clock,
  'consulting': Briefcase,
  'training': GraduationCap,
};

export default function ContractorDashboard({ 
  preferences, 
  onRequestSelect, 
  onCategorySelect 
}: ContractorDashboardProps) {
  if (!preferences) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Loading your personalized dashboard...</p>
      </div>
    );
  }

  const getPersonalizedRecommendations = () => {
    const recommendations = {
      priorityRequests: [
        {
          id: '1',
          title: 'Emergency Water Damage - Downtown',
          category: 'water-damage',
          urgency: 'emergency',
          location: 'Downtown, NY',
          budget: '$2,500 - $5,000',
          distance: '2.3 miles',
          matchScore: 95
        },
        {
          id: '2',
          title: 'Fire Damage Restoration - Residential',
          category: 'fire-damage',
          urgency: 'urgent',
          location: 'Brooklyn, NY',
          budget: '$5,000 - $10,000',
          distance: '4.1 miles',
          matchScore: 88
        }
      ],
      personalizedTips: [
        'You have 3 emergency requests within your preferred distance',
        'Your expertise in water damage restoration is highly sought after',
        'Consider updating your availability for weekend emergency calls'
      ],
      marketInsights: [
        'Water damage requests increased 25% this month in your area',
        'Average project value in your categories: $3,200',
        'Peak hours for emergency calls: 6 PM - 10 PM'
      ]
    };

    return recommendations;
  };

  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to Your Contractor Dashboard
              </h2>
              <p className="text-white/90">
                Based on your preferences, we've curated the best opportunities for you
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Specializations */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-[#00BFA6]" />
          Your Specializations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preferences.serviceCategories.map((categoryId) => {
            const category = Object.entries(CATEGORY_ICONS).find(([id]) => id === categoryId);
            if (!category) return null;
            
            const [id, IconComponent] = category;
            const categoryName = id.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            return (
              <Card 
                key={categoryId} 
                className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors cursor-pointer"
                onClick={() => onCategorySelect(categoryId)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-[#00BFA6]" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30"
                    >
                      Active
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{categoryName}</h4>
                  <p className="text-sm text-gray-400">View available requests</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Priority Requests */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Priority Requests for You
          </CardTitle>
          <CardDescription className="text-gray-400">
            High-priority requests matching your expertise and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.priorityRequests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => onRequestSelect(request.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#00BFA6]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{request.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {request.budget}
                      </span>
                      <span>{request.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    className={`${
                      request.urgency === 'emergency' 
                        ? 'bg-red-900/30 text-red-400 border-red-500'
                        : 'bg-orange-900/30 text-orange-400 border-orange-500'
                    }`}
                  >
                    {request.urgency}
                  </Badge>
                  <Badge className="bg-green-900/30 text-green-400 border-green-500">
                    {request.matchScore}% match
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

      {/* Your Expertise Areas */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="h-5 w-5 mr-2 text-[#00BFA6]" />
            Your Expertise Areas
          </CardTitle>
          <CardDescription className="text-gray-400">
            Areas where you excel and can provide exceptional service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {preferences.expertise.map((expertiseId) => {
              const expertise = Object.entries(EXPERTISE_ICONS).find(([id]) => id === expertiseId);
              if (!expertise) return null;
              
              const [id, IconComponent] = expertise;
              const expertiseName = id.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              
              return (
                <div key={expertiseId} className="flex items-center space-x-2 p-3 bg-gray-700/50 rounded-lg">
                  <IconComponent className="h-5 w-5 text-[#00BFA6]" />
                  <span className="text-white text-sm font-medium">{expertiseName}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Tips */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Personalized Tips for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.personalizedTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="h-2 w-2 bg-[#00BFA6] rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recommendations.marketInsights.map((insight, index) => (
              <div key={index} className="flex items-center">
                <div className="h-2 w-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                <p className="text-blue-200">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-[#00BFA6]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              onClick={() => onRequestSelect('emergency')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Emergency Requests
            </Button>
            <Button 
              variant="outline" 
              className="border-[#7C4DFF] text-[#7C4DFF] hover:bg-[#7C4DFF] hover:text-white"
              onClick={() => onRequestSelect('scheduled')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Scheduled Work
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => onRequestSelect('profile')}
            >
              <Users className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

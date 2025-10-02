'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Zap, 
  Shield, 
  Droplets, 
  Flame, 
  CloudRain,
  Star,
  Clock,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react';
import { PreferenceService, UserPreferences } from '@/lib/preference-service';

interface PersonalizedDashboardProps {
  preferences: UserPreferences | null;
  onServiceSelect: (serviceId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

const CATEGORY_ICONS = {
  'water-damage': Droplets,
  'fire-damage': Flame,
  'mold-remediation': Shield,
  'storm-damage': CloudRain,
  'home-maintenance': Home,
  'emergency-services': Zap,
};

export default function PersonalizedDashboard({ 
  preferences, 
  onServiceSelect, 
  onCategorySelect 
}: PersonalizedDashboardProps) {
  if (!preferences) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Loading your personalized dashboard...</p>
      </div>
    );
  }

  const recommendations = PreferenceService.getPersonalizedRecommendations(preferences);
  const personalizedCategories = PreferenceService.getPersonalizedCategories(preferences);

  return (
    <div className="space-y-6">
  
      {/* Personalized Categories */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Home className="h-5 w-5 mr-2 text-[#00BFA6]" />
          Recommended Services for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalizedCategories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS] || Home;
            return (
              <Card 
                key={category.id} 
                className="bg-gray-800 border-gray-700 hover:border-[#00BFA6] transition-colors cursor-pointer"
                onClick={() => onCategorySelect(category.id)}
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
                      Recommended
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-[#00BFA6]/20 text-white border-[#00BFA6]/30 capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Personalized Tips */}
      {recommendations.personalizedTips.length > 0 && (
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
      )}

      {/* Urgency Alerts */}
      {recommendations.urgencyAlerts.length > 0 && (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendations.urgencyAlerts.map((alert, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-3 flex-shrink-0" />
                  <p className="text-red-200">{alert}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Services */}
      {recommendations.recommendedServices.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Recommended Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.recommendedServices.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => onServiceSelect(service)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center mr-3">
                      <Zap className="h-4 w-4 text-[#00BFA6]" />
                    </div>
                    <span className="text-white font-medium">{service}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-[#00BFA6] hover:text-white">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions Based on Preferences */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-[#00BFA6]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              onClick={() => onServiceSelect('emergency-request')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Emergency Request
            </Button>
            <Button 
              variant="outline" 
              className="border-[#7C4DFF] text-[#7C4DFF] hover:bg-[#7C4DFF] hover:text-white"
              onClick={() => onServiceSelect('schedule-service')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule Service
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => onServiceSelect('get-quote')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Get Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

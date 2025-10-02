'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Settings, 
  Heart, 
  DollarSign, 
  Clock, 
  MessageSquare,
  Palette,
  Star,
  Edit,
  CheckCircle
} from 'lucide-react';
import { UserPreferences } from '@/lib/preference-service';

interface UserPreferencesDisplayProps {
  preferences: UserPreferences | null;
  onEditPreferences: () => void;
}

const INTEREST_ICONS = {
  'home-improvement': '🏠',
  'emergency-services': '🚨',
  'maintenance': '🔧',
  'security': '🛡️',
  'renovation': '🏗️',
  'cleaning': '🧹',
  'restoration': '🔨',
  'insurance': '📋'
};

const SERVICE_TYPE_ICONS = {
  'water-damage': '💧',
  'fire-damage': '🔥',
  'mold-remediation': '🦠',
  'storm-damage': '⛈️',
  'emergency': '🚨',
  'maintenance': '🔧'
};

const BUDGET_ICONS = {
  'low': '💰',
  'medium': '💵',
  'high': '💎'
};

const URGENCY_ICONS = {
  'emergency': '🚨',
  'urgent': '⚡',
  'standard': '📅',
  'planned': '📋'
};

const COMMUNICATION_ICONS = {
  'detailed': '📝',
  'brief': '💬',
  'visual': '📊',
  'phone': '📞'
};

export default function UserPreferencesDisplay({ 
  preferences, 
  onEditPreferences 
}: UserPreferencesDisplayProps) {
  if (!preferences) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No preferences saved yet</p>
          <Button 
            onClick={onEditPreferences}
            className="mt-4 bg-[#00BFA6] hover:bg-[#00A693] text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Set Your Preferences
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-[#00BFA6]" />
            Your Preferences
          </h2>
          <p className="text-gray-400">Your personalized settings and interests</p>
        </div>
        <Button 
          onClick={onEditPreferences}
          variant="outline"
          className="border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Preferences
        </Button>
      </div>

      {/* Interests */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Your Interests
          </CardTitle>
          <CardDescription className="text-gray-400">
            Services and areas you're most interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {preferences.interests.map((interest, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-red-500/20 text-red-300 border-red-500/30 flex items-center"
              >
                <span className="mr-1">
                  {INTEREST_ICONS[interest as keyof typeof INTEREST_ICONS] || '⭐'}
                </span>
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Types */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-500" />
            Preferred Service Types
          </CardTitle>
          <CardDescription className="text-gray-400">
            Types of services you're looking for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {preferences.serviceTypes.map((serviceType, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center"
              >
                <span className="mr-1">
                  {SERVICE_TYPE_ICONS[serviceType as keyof typeof SERVICE_TYPE_ICONS] || '🔧'}
                </span>
                {serviceType}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Range */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Budget Range
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your preferred budget range for services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Badge 
              variant="secondary" 
              className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center"
            >
              <span className="mr-1">
                {BUDGET_ICONS[preferences.budgetRange as keyof typeof BUDGET_ICONS] || '💰'}
              </span>
              {preferences.budgetRange}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Urgency Level */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-orange-500" />
            Urgency Level
          </CardTitle>
          <CardDescription className="text-gray-400">
            How quickly you typically need services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Badge 
              variant="secondary" 
              className="bg-orange-500/20 text-orange-300 border-orange-500/30 flex items-center"
            >
              <span className="mr-1">
                {URGENCY_ICONS[preferences.urgencyLevel as keyof typeof URGENCY_ICONS] || '⏰'}
              </span>
              {preferences.urgencyLevel}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Communication Style */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
            Communication Style
          </CardTitle>
          <CardDescription className="text-gray-400">
            How you prefer to communicate with service providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Badge 
              variant="secondary" 
              className="bg-purple-500/20 text-purple-300 border-purple-500/30 flex items-center"
            >
              <span className="mr-1">
                {COMMUNICATION_ICONS[preferences.communicationStyle as keyof typeof COMMUNICATION_ICONS] || '💬'}
              </span>
              {preferences.communicationStyle}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Selected Categories & Services */}
      {preferences.selectedCategories && preferences.selectedCategories.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Selected Categories
            </CardTitle>
            <CardDescription className="text-gray-400">
              Categories you've specifically chosen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {preferences.selectedCategories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {preferences.selectedServices && preferences.selectedServices.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2 text-cyan-500" />
              Selected Services
            </CardTitle>
            <CardDescription className="text-gray-400">
              Specific services you've chosen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {preferences.selectedServices.map((service, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theme & Branding */}
      {(preferences.selectedTheme || preferences.brandingColor) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className="h-5 w-5 mr-2 text-pink-500" />
              Theme & Branding
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your personalized theme and color preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preferences.selectedTheme && (
                <div className="flex items-center">
                  <span className="text-gray-300 mr-3">Theme:</span>
                  <Badge variant="outline" className="border-pink-500/30 text-pink-300">
                    {preferences.selectedTheme}
                  </Badge>
                </div>
              )}
              {preferences.brandingColor && (
                <div className="flex items-center">
                  <span className="text-gray-300 mr-3">Brand Color:</span>
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-600 mr-2"
                      style={{ backgroundColor: preferences.brandingColor }}
                    />
                    <span className="text-gray-300">{preferences.brandingColor}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Onboarding Status */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Profile Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-gray-300">
                {preferences.isOnboardingComplete ? 'Profile Complete' : 'Profile Incomplete'}
              </span>
            </div>
            {!preferences.isOnboardingComplete && (
              <Button 
                onClick={onEditPreferences}
                size="sm"
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

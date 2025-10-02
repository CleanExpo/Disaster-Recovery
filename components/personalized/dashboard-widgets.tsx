'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  MessageSquare, 
  Zap, 
  Home, 
  Wrench, 
  Shield,
  Plus,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface PersonalizedWidgetsProps {
  preferences: {
    interests: string[];
    serviceTypes: string[];
    budgetRange: string;
    urgencyLevel: string;
    communicationStyle: string;
  };
  userStats?: {
    totalRequests?: number;
    activeRequests?: number;
    completedRequests?: number;
    averageRating?: number;
  };
  onAction: (action: string, data?: any) => void;
}

const INTEREST_ICONS = {
  'home-improvement': Home,
  'emergency-services': Zap,
  'maintenance': Wrench,
  'security': Shield,
  'renovation': Home,
  'consultation': MessageSquare,
};

const URGENCY_COLORS = {
  'emergency': 'text-red-500 bg-red-900/30',
  'urgent': 'text-orange-500 bg-orange-900/30',
  'standard': 'text-blue-500 bg-blue-900/30',
  'planned': 'text-green-500 bg-green-900/30',
};

export default function PersonalizedWidgets({ preferences, userStats, onAction }: PersonalizedWidgetsProps) {
  const getInterestIcon = (interest: string) => {
    const Icon = INTEREST_ICONS[interest as keyof typeof INTEREST_ICONS] || Home;
    return <Icon className="h-5 w-5" />;
  };

  const getUrgencyColor = (urgency: string) => {
    return URGENCY_COLORS[urgency as keyof typeof URGENCY_COLORS] || 'text-gray-500 bg-gray-900/30';
  };

  return (
    <div className="space-y-6">
      {/* Personalized Welcome */}
      <Card className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back! 👋
              </h2>
              <p className="text-white/90">
                {preferences.interests.length > 0 && (
                  <>
                    Ready to work on your{' '}
                    {preferences.interests.map((interest, index) => (
                      <span key={interest} className="font-semibold">
                        {interest.replace('-', ' ')}
                        {index < preferences.interests.length - 1 && ', '}
                      </span>
                    ))}
                    {' '}projects?
                  </>
                )}
              </p>
            </div>
            <Button 
              className="bg-white text-[#00BFA6] hover:bg-gray-100"
              onClick={() => onAction('new-request')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-white">{userStats?.totalRequests || 0}</p>
              </div>
              <div className="h-8 w-8 bg-[#00BFA6]/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-[#00BFA6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-2xl font-bold text-white">{userStats?.activeRequests || 0}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">{userStats?.completedRequests || 0}</p>
              </div>
              <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-white">{(userStats?.averageRating || 0).toFixed(1)}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Interests */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Home className="h-5 w-5 mr-2 text-[#00BFA6]" />
              Your Interests
            </CardTitle>
            <CardDescription className="text-gray-400">
              Based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preferences.interests.map((interest) => (
                <div key={interest} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getInterestIcon(interest)}
                    <span className="text-white font-medium capitalize">
                      {interest.replace('-', ' ')}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-white"
                    onClick={() => onAction('browse-services', { category: interest })}
                  >
                    Browse
                  </Button>
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
            <CardDescription className="text-gray-400">
              Based on your typical needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preferences.serviceTypes.slice(0, 3).map((serviceType) => (
                <div key={serviceType} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-white font-medium">{serviceType}</span>
                  <Button
                    size="sm"
                    className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                    onClick={() => onAction('quick-request', { serviceType })}
                  >
                    Request Now
                  </Button>
                </div>
              ))}
              
              {preferences.urgencyLevel === 'emergency' && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-red-500" />
                    <span className="text-red-400 font-medium">Emergency Services</span>
                  </div>
                  <p className="text-red-300 text-sm mt-1">
                    Get immediate assistance for urgent needs
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Preferences */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-[#00BFA6]" />
            Your Communication Style
          </CardTitle>
          <CardDescription className="text-gray-400">
            Contractors will know how you prefer to communicate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge className="bg-[#00BFA6]/20 text-[#00BFA6] border-[#00BFA6]/30">
              {preferences.communicationStyle.replace('-', ' ').toUpperCase()}
            </Badge>
            <span className="text-gray-300">
              {preferences.communicationStyle === 'direct' && 'Direct phone calls and messages'}
              {preferences.communicationStyle === 'email' && 'Detailed email updates preferred'}
              {preferences.communicationStyle === 'mixed' && 'Combination of communication methods'}
              {preferences.communicationStyle === 'minimal' && 'Only essential updates needed'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Budget & Urgency Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Budget Range</CardTitle>
            <CardDescription className="text-gray-400">Your typical project budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {preferences.budgetRange.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Typical Urgency</CardTitle>
            <CardDescription className="text-gray-400">Your usual project timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={getUrgencyColor(preferences.urgencyLevel)}>
                {preferences.urgencyLevel.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

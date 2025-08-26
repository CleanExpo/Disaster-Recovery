'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  User,
  Shield,
  CreditCard,
  GraduationCap,
  Settings,
  ArrowRight,
  BookOpen,
  Zap,
  Trophy,
  Target,
  Info,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OnboardingChecklist as OnboardingChecklistType, OnboardingItem } from '@/types/support';

// Mock onboarding data
const mockOnboardingItems: OnboardingItem[] = [
  // Account Setup
  {
    id: '1',
    title: 'Create Your Account',
    description: 'Set up your login credentials and verify your email',
    category: 'account',
    order: 1,
    isRequired: true,
    isCompleted: true,
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    helpArticleUrl: '/help/articles/account-setup',
    actionUrl: '/profile/account',
    actionLabel: 'Account Settings',
    icon: 'user',
    estimatedTime: '2 minutes'
  },
  {
    id: '2',
    title: 'Complete Company Profile',
    description: 'Add your business information, ABN, and contact details',
    category: 'account',
    order: 2,
    isRequired: true,
    isCompleted: true,
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    helpArticleUrl: '/help/articles/company-profile',
    actionUrl: '/profile/company',
    actionLabel: 'Edit Profile',
    icon: 'building',
    estimatedTime: '5 minutes'
  },
  {
    id: '3',
    title: 'Enable Two-Factor Authentication',
    description: 'Secure your account with 2FA for enhanced protection',
    category: 'account',
    order: 3,
    isRequired: false,
    isCompleted: false,
    helpArticleUrl: '/help/articles/two-factor-auth',
    actionUrl: '/settings/security',
    actionLabel: 'Enable 2FA',
    icon: 'shield',
    estimatedTime: '3 minutes'
  },

  // Compliance
  {
    id: '4',
    title: 'Upload IICRC Certifications',
    description: 'Submit your IICRC Water Damage Restoration certification',
    category: 'compliance',
    order: 4,
    isRequired: true,
    isCompleted: true,
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    helpArticleUrl: '/help/articles/iicrc-requirements',
    actionUrl: '/compliance/certifications',
    actionLabel: 'Upload Certificate',
    icon: 'award',
    estimatedTime: '5 minutes'
  },
  {
    id: '5',
    title: 'Submit Insurance Documentation',
    description: 'Upload public liability and professional indemnity insurance',
    category: 'compliance',
    order: 5,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/insurance-requirements',
    actionUrl: '/compliance/insurance',
    actionLabel: 'Upload Insurance',
    icon: 'shield',
    estimatedTime: '5 minutes'
  },
  {
    id: '6',
    title: 'Complete Background Check',
    description: 'Authorize and complete the required background verification',
    category: 'compliance',
    order: 6,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/background-check',
    actionUrl: '/compliance/background-check',
    actionLabel: 'Start Check',
    icon: 'search',
    estimatedTime: '10 minutes'
  },

  // Billing
  {
    id: '7',
    title: 'Select Subscription Plan',
    description: 'Choose your monthly subscription tier',
    category: 'billing',
    order: 7,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/subscription-plans',
    actionUrl: '/billing/subscription',
    actionLabel: 'Choose Plan',
    icon: 'credit-card',
    estimatedTime: '3 minutes'
  },
  {
    id: '8',
    title: 'Add Payment Method',
    description: 'Set up your preferred payment method for automatic billing',
    category: 'billing',
    order: 8,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/payment-setup',
    actionUrl: '/billing/payment-methods',
    actionLabel: 'Add Payment',
    icon: 'credit-card',
    estimatedTime: '3 minutes'
  },

  // Training
  {
    id: '9',
    title: 'Complete Platform Orientation',
    description: 'Watch the introductory video and learn the basics',
    category: 'training',
    order: 9,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/platform-orientation',
    actionUrl: '/training/orientation',
    actionLabel: 'Start Training',
    icon: 'play',
    estimatedTime: '15 minutes'
  },
  {
    id: '10',
    title: 'Review Clean Claims Process',
    description: 'Understand the Clean Claims requirements and workflow',
    category: 'training',
    order: 10,
    isRequired: false,
    isCompleted: false,
    helpArticleUrl: '/help/articles/clean-claims',
    actionUrl: '/training/clean-claims',
    actionLabel: 'Learn More',
    icon: 'book',
    estimatedTime: '10 minutes'
  },

  // Setup
  {
    id: '11',
    title: 'Configure Notification Preferences',
    description: 'Set how you want to receive job alerts and updates',
    category: 'setup',
    order: 11,
    isRequired: false,
    isCompleted: false,
    helpArticleUrl: '/help/articles/notifications',
    actionUrl: '/settings/notifications',
    actionLabel: 'Configure',
    icon: 'bell',
    estimatedTime: '2 minutes'
  },
  {
    id: '12',
    title: 'Select Service Territories',
    description: 'Choose the geographic areas where you provide services',
    category: 'setup',
    order: 12,
    isRequired: true,
    isCompleted: false,
    helpArticleUrl: '/help/articles/territories',
    actionUrl: '/settings/territories',
    actionLabel: 'Select Areas',
    icon: 'map',
    estimatedTime: '5 minutes'
  }
];

const categoryInfo = {
  account: {
    title: 'Account Setup',
    icon: User,
    color: 'text-blue-600 bg-blue-100'
  },
  compliance: {
    title: 'Compliance & Certification',
    icon: Shield,
    color: 'text-green-600 bg-green-100'
  },
  billing: {
    title: 'Billing & Payments',
    icon: CreditCard,
    color: 'text-purple-600 bg-purple-100'
  },
  training: {
    title: 'Training & Education',
    icon: GraduationCap,
    color: 'text-orange-600 bg-orange-100'
  },
  setup: {
    title: 'Platform Setup',
    icon: Settings,
    color: 'text-gray-600 bg-gray-100'
  }
};

interface OnboardingChecklistProps {
  embedded?: boolean;
  onComplete?: () => void;
}

export function OnboardingChecklist({ embedded = false, onComplete }: OnboardingChecklistProps) {
  const [checklist, setChecklist] = useState<OnboardingChecklistType>({
    id: '1',
    userId: 'current-user',
    items: mockOnboardingItems,
    completedCount: mockOnboardingItems.filter(i => i.isCompleted).length,
    totalCount: mockOnboardingItems.length,
    completionPercentage: Math.round((mockOnboardingItems.filter(i => i.isCompleted).length / mockOnboardingItems.length) * 100),
    startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastActivity: new Date()
  });

  const [expandedCategories, setExpandedCategories] = useState<string[]>(['account', 'compliance']);
  const [showCompleted, setShowCompleted] = useState(false);

  const requiredItems = checklist.items.filter(i => i.isRequired);
  const requiredCompleted = requiredItems.filter(i => i.isCompleted).length;
  const isFullyOnboarded = requiredCompleted === requiredItems.length;

  const handleCompleteItem = (itemId: string) => {
    const updatedItems = checklist.items.map(item =>
      item.id === itemId
        ? { ...item, isCompleted: true, completedAt: new Date() }
        : item
    );

    const completedCount = updatedItems.filter(i => i.isCompleted).length;
    
    setChecklist({
      ...checklist,
      items: updatedItems,
      completedCount,
      completionPercentage: Math.round((completedCount / updatedItems.length) * 100),
      lastActivity: new Date(),
      completedAt: completedCount === updatedItems.length ? new Date() : undefined
    });

    if (completedCount === updatedItems.length && onComplete) {
      onComplete();
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const groupedItems = checklist.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, OnboardingItem[]>);

  const getItemIcon = (icon?: string) => {
    switch (icon) {
      case 'user': return <User className="h-4 w-4" />;
      case 'shield': return <Shield className="h-4 w-4" />;
      case 'credit-card': return <CreditCard className="h-4 w-4" />;
      case 'bell': return <Bell className="h-4 w-4" />;
      case 'map': return <Map className="h-4 w-4" />;
      case 'award': return <Award className="h-4 w-4" />;
      case 'search': return <Search className="h-4 w-4" />;
      case 'play': return <Play className="h-4 w-4" />;
      case 'book': return <Book className="h-4 w-4" />;
      case 'building': return <Building className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("space-y-6", embedded && "p-0")}>
      {/* Header */}
      {!embedded && (
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Onboarding Progress
          </h2>
          <p className="text-gray-600 mt-1">
            Complete these steps to get fully set up on the platform
          </p>
        </div>
      )}

      {/* Progress Overview */}
      <Card className={embedded ? "border-0 shadow-none" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Overall Progress</CardTitle>
              <CardDescription>
                {checklist.completedCount} of {checklist.totalCount} tasks completed
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{checklist.completionPercentage}%</div>
              {isFullyOnboarded ? (
                <Badge className="bg-green-100 text-green-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  Fully Onboarded
                </Badge>
              ) : (
                <Badge variant="outline">
                  {requiredCompleted}/{requiredItems.length} required
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={checklist.completionPercentage} className="h-3" />
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{checklist.completedCount}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {checklist.items.filter(i => !i.isCompleted && i.isRequired).length}
              </p>
              <p className="text-sm text-gray-500">Required Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {checklist.items.filter(i => !i.isCompleted && !i.isRequired).length}
              </p>
              <p className="text-sm text-gray-500">Optional</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {Math.ceil(
                  checklist.items
                    .filter(i => !i.isCompleted)
                    .reduce((acc, item) => {
                      const time = parseInt(item.estimatedTime || '0');
                      return acc + time;
                    }, 0) / 60
                )}h
              </p>
              <p className="text-sm text-gray-500">Est. Time Left</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Alert */}
      {!isFullyOnboarded && (
        <Alert className="border-orange-200 bg-orange-50">
          <Zap className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-900">
            <strong>Next Step:</strong> {
              checklist.items.find(i => !i.isCompleted && i.isRequired)?.title ||
              'Complete the remaining optional tasks to enhance your profile'
            }
          </AlertDescription>
        </Alert>
      )}

      {/* Checklist Items by Category */}
      <div className="space-y-4">
        {Object.entries(groupedItems).map(([category, items]) => {
          const CategoryIcon = categoryInfo[category as keyof typeof categoryInfo].icon;
          const categoryColor = categoryInfo[category as keyof typeof categoryInfo].color;
          const categoryTitle = categoryInfo[category as keyof typeof categoryInfo].title;
          const categoryCompleted = items.filter(i => i.isCompleted).length;
          const isExpanded = expandedCategories.includes(category);

          return (
            <Card key={category}>
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", categoryColor)}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{categoryTitle}</CardTitle>
                      <CardDescription>
                        {categoryCompleted} of {items.length} completed
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(categoryCompleted / items.length) * 100} 
                      className="w-24 h-2"
                    />
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent>
                  <div className="space-y-3">
                    {items
                      .filter(item => showCompleted || !item.isCompleted)
                      .map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg transition-colors",
                            item.isCompleted ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                          )}
                        >
                          <button
                            onClick={() => !item.isCompleted && handleCompleteItem(item.id)}
                            className={cn(
                              "mt-0.5 transition-colors",
                              item.isCompleted
                                ? "text-green-600 cursor-default"
                                : "text-gray-400 hover:text-blue-600"
                            )}
                            disabled={item.isCompleted}
                          >
                            {item.isCompleted ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className={cn(
                                "font-medium",
                                item.isCompleted && "line-through text-gray-500"
                              )}>
                                {item.title}
                              </p>
                              {item.isRequired && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                              {item.estimatedTime && !item.isCompleted && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.estimatedTime}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                            {item.completedAt && (
                              <p className="text-xs text-gray-500 mt-1">
                                Completed {new Date(item.completedAt).toLocaleDateString()}
                              </p>
                            )}
                            {!item.isCompleted && (
                              <div className="flex gap-2 mt-2">
                                {item.actionUrl && (
                                  <Button
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = item.actionUrl!;
                                    }}
                                  >
                                    {item.actionLabel || 'Start'}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                                {item.helpArticleUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(item.helpArticleUrl, '_blank');
                                    }}
                                  >
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    Help
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Show Completed Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'Hide' : 'Show'} Completed Tasks
        </Button>
      </div>

      {/* Completion Message */}
      {isFullyOnboarded && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Congratulations! You're Fully Onboarded
              </h3>
              <p className="text-green-700">
                You've completed all required onboarding tasks and are ready to start receiving jobs.
              </p>
              <Button className="mt-4" onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Add missing imports
import { Bell, Map, Award, Search, Play, Book, Building } from 'lucide-react';
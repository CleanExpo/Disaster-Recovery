'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Book,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Headphones,
  FileText,
  Search,
  ChevronRight,
  ExternalLink,
  Star,
  Target,
  Lightbulb,
  Award,
  TrendingUp
} from 'lucide-react';

// Import all support components
import { KnowledgeBase } from './KnowledgeBase';
import { LiveChat } from './LiveChat';
import { SupportTickets } from './SupportTickets';
import { FeedbackForm } from './FeedbackForm';
import { OnboardingChecklist } from './OnboardingChecklist';

import type { SupportMetrics } from '@/types/support';
import { DEFAULT_BUSINESS_HOURS } from '@/types/support';

// Mock support metrics
const mockMetrics: SupportMetrics = {
  tickets: {
    open: 3,
    inProgress: 2,
    pending: 1,
    resolved: 45,
    totalToday: 8,
    totalWeek: 32,
    totalMonth: 145
  },
  responseTime: {
    average: 15,
    median: 12,
    target: 30,
    compliance: 98
  },
  satisfaction: {
    average: 4.6,
    totalRatings: 523,
    distribution: {
      1: 8,
      2: 12,
      3: 35,
      4: 168,
      5: 300
    }
  },
  chat: {
    activeChats: 2,
    waitingQueue: 0,
    averageWaitTime: 45,
    averageDuration: 8
  },
  knowledge: {
    totalArticles: 142,
    totalViews: 15234,
    helpfulPercentage: 87,
    popularArticles: [
      { id: '1', title: 'Quick Start Guide', views: 1250 },
      { id: '2', title: 'Setting Up Direct Deposit', views: 980 },
      { id: '3', title: 'Territory Selection Guide', views: 856 }
    ]
  }
};

export function HelpCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const isBusinessHours = () => {
    const now = new Date();
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const schedule = DEFAULT_BUSINESS_HOURS.schedule[day as keyof typeof DEFAULT_BUSINESS_HOURS.schedule];
    
    if (!schedule.isOpen) return false;
    
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime >= (schedule.openTime || '') && currentTime <= (schedule.closeTime || '');
  };

  const supportChannels = [
    {
      icon: Book,
      title: 'Knowledge Base',
      description: 'Search our library of helpful articles',
      action: () => setActiveTab('knowledge'),
      stats: `${mockMetrics.knowledge.totalArticles} articles`,
      available: true
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => setActiveTab('chat'),
      stats: isBusinessHours() ? 'Available now' : 'Outside hours',
      available: isBusinessHours()
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: '24-48 hour response time',
      action: () => window.location.href = 'mailto:support@nrp.com.au',
      stats: 'support@nrp.com.au',
      available: true
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'For urgent issues only',
      action: () => window.location.href = 'tel:1300NRPSUP',
      stats: '1300 NRP SUP',
      available: isBusinessHours()
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <HelpCircle className="h-8 w-8" />
            Help & Support Center
          </h1>
          <p className="text-blue-100 text-lg">
            Get help, find answers, and connect with our support team
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      {activeTab === 'overview' && (
        <>
          {/* Support Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  !channel.available ? 'opacity-75' : ''
                }`}
                onClick={channel.action}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full mb-3 ${
                      channel.available ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <channel.icon className={`h-6 w-6 ${
                        channel.available ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <h3 className="font-semibold mb-1">{channel.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {channel.description}
                    </p>
                    <Badge variant={channel.available ? 'default' : 'secondary'} className="text-xs">
                      {channel.stats}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Onboarding Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-orange-600" />
                  <CardTitle>Your Onboarding Progress</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('onboarding')}
                >
                  View All Tasks
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <OnboardingChecklist embedded={true} />
            </CardContent>
          </Card>

          {/* Support Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Your Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Open Tickets</span>
                    <Badge>{mockMetrics.tickets.open}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Chat</span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Articles Read</span>
                    <span className="text-sm text-gray-500">12 this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Feedback Submitted</span>
                    <span className="text-sm text-gray-500">3 items</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Popular Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockMetrics.knowledge.popularArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setActiveTab('knowledge')}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium">{article.title}</p>
                      <p className="text-xs text-gray-500">{article.views} views</p>
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => setActiveTab('knowledge')}
                >
                  Browse All Articles
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a
                    href="/compliance"
                    className="flex items-center gap-2 text-sm hover:text-blue-600"
                  >
                    <Award className="h-4 w-4" />
                    Compliance Dashboard
                  </a>
                  <a
                    href="/billing"
                    className="flex items-center gap-2 text-sm hover:text-blue-600"
                  >
                    <FileText className="h-4 w-4" />
                    Billing & Invoices
                  </a>
                  <a
                    href="/training"
                    className="flex items-center gap-2 text-sm hover:text-blue-600"
                  >
                    <Users className="h-4 w-4" />
                    Training Resources
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center gap-2 text-sm hover:text-blue-600"
                  >
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Hours Alert */}
          {!isBusinessHours() && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-900">
                <strong>Outside Business Hours:</strong> Live chat and phone support are available 
                Monday-Friday 8:00 AM - 6:00 PM AEDT. You can still browse our knowledge base, 
                submit support tickets, or send us an email.
              </AlertDescription>
            </Alert>
          )}

          {/* Satisfaction Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Support Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {mockMetrics.responseTime.average} min
                  </p>
                  <p className="text-sm text-gray-500">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {mockMetrics.satisfaction.average}/5
                  </p>
                  <p className="text-sm text-gray-500">Satisfaction Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {mockMetrics.responseTime.compliance}%
                  </p>
                  <p className="text-sm text-gray-500">SLA Compliance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {mockMetrics.knowledge.helpfulPercentage}%
                  </p>
                  <p className="text-sm text-gray-500">Articles Helpful</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Main Content Tabs */}
      {activeTab !== 'overview' && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>

          <TabsContent value="tickets">
            <SupportTickets />
          </TabsContent>

          <TabsContent value="chat">
            <LiveChat embedded={true} />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>

          <TabsContent value="onboarding">
            <OnboardingChecklist />
          </TabsContent>
        </Tabs>
      )}

      {/* Emergency Support Card */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Emergency Support</h3>
              <p className="text-sm text-red-700 mt-1">
                For urgent compliance or system emergencies outside business hours, 
                call our emergency hotline: <strong>1300 EMERGENCY</strong>
              </p>
              <p className="text-xs text-red-600 mt-2">
                * Emergency support is limited to critical issues only. Standard support 
                requests will be directed to submit a ticket.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add missing import
import { Settings } from 'lucide-react';
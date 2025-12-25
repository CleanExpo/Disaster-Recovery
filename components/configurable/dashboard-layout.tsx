'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTenant, useIndustryConfig } from '@/contexts/TenantContext';
import {
  Bell,
  Menu,
  LogOut,
  Settings,
  Home,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Plus
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    avatar?: string;
  };
  onLogout: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function DashboardLayout({ 
  children, 
  user, 
  onLogout, 
  activeTab = 'overview',
  onTabChange 
}: DashboardLayoutProps) {
  const { tenant } = useTenant();
  const { industry, serviceCategories } = useIndustryConfig();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'requests', label: 'Service Requests', icon: FileText },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    if (user.userType === 'CONTRACTOR') {
      return [
        ...baseItems,
        { id: 'profile', label: 'Profile', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (user.userType === 'ADMIN') {
      return [
        ...baseItems,
        { id: 'users', label: 'Users', icon: Users },
        { id: 'tenants', label: 'Tenants', icon: Settings },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getIndustrySpecificContent = () => {
    switch (industry) {
      case 'healthcare':
        return {
          title: 'Healthcare Services',
          subtitle: 'Connect with qualified healthcare professionals',
          primaryAction: 'Book Appointment'
        };
      case 'legal':
        return {
          title: 'Legal Services',
          subtitle: 'Find experienced legal professionals',
          primaryAction: 'Get Consultation'
        };
      case 'insurance':
        return {
          title: 'Insurance Services',
          subtitle: 'Streamline your insurance processes',
          primaryAction: 'Submit Claim'
        };
      default:
        return {
          title: 'Restoration Services',
          subtitle: 'Connect with verified restoration professionals',
          primaryAction: 'Request Service'
        };
    }
  };

  const industryContent = getIndustrySpecificContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              {tenant?.logo && (
                <Image
                  src={tenant.logo}
                  alt={tenant.name}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                  unoptimized={tenant.logo.startsWith('http')}
                />
              )}
              <span className="font-semibold text-lg">{tenant?.name || 'Platform'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              ×
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onTabChange?.(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
            <div className="flex items-center p-4 border-b">
              {tenant?.logo && (
                <Image
                  src={tenant.logo}
                  alt={tenant.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 mr-2"
                  unoptimized={tenant.logo.startsWith('http')}
                />
              )}
              <span className="font-semibold text-lg">{tenant?.name || 'Platform'}</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => onTabChange?.(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex-1">
          {/* Top bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {getGreeting()}, {user.name?.split(' ')[0] || 'User'}!
                  </h1>
                  <p className="text-sm text-gray-500">{industryContent.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button className="bg-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  {industryContent.primaryAction}
                </Button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

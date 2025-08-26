'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  GraduationCap,
  MapPin,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Star,
  Activity,
  Users,
  Award,
  FileCheck,
  Droplets,
  Flame,
  Home,
  Briefcase,
  MessageSquare,
  User,
  Camera,
  Navigation,
  Plus,
  X,
  Check,
  ArrowRight,
  CloudRain,
  Wind,
  ChevronRight,
  Phone,
  Mail,
  Loader2,
  WifiOff,
  Wifi
} from 'lucide-react';

// Import custom styles
import '@/styles/contractor-theme.css';

// Custom hooks for real-time data and online status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Status Indicator Component
function StatusIndicator({ status, label }: { status: string; label: string }) {
  return (
    <div className={cn("status-indicator", status)}>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Job Type Badge Component
function JobTypeBadge({ type, count }: { type: string; count?: number }) {
  const icons = {
    water: Droplets,
    fire: Flame,
    mold: Shield,
    structural: Building2,
    biohazard: AlertTriangle
  };

  const Icon = icons[type as keyof typeof icons] || Building2;

  return (
    <div className={cn("job-type-badge", type)}>
      <Icon className="h-3 w-3" />
      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      {count && <span className="font-semibold">({count})</span>}
    </div>
  );
}

// Priority Card Component
function PriorityCard({ 
  priority, 
  title, 
  children, 
  className 
}: { 
  priority?: 'critical' | 'high' | 'normal' | 'low';
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("priority-card", priority, className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Performance Meter Component
function PerformanceMeter({ 
  value, 
  label, 
  target 
}: { 
  value: number; 
  label: string; 
  target?: number;
}) {
  const performance = 
    value >= 90 ? 'excellent' :
    value >= 70 ? 'good' :
    value >= 50 ? 'needs-improvement' : 'poor';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold">{value}%</span>
      </div>
      <div 
        className="performance-meter" 
        data-value={performance}
        style={{ '--progress': `${value}%` } as React.CSSProperties}
      />
      {target && (
        <p className="text-xs text-gray-500">Target: {target}%</p>
      )}
    </div>
  );
}

// Mobile Bottom Navigation
function MobileBottomNavigation({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
}) {
  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, badge: 3 },
    { id: 'compliance', label: 'Comply', icon: Shield },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col items-center p-2 min-w-[44px] transition-colors touch-target",
              activeTab === item.id ? "text-blue-600" : "text-gray-400"
            )}
          >
            <div className="relative">
              <item.icon className="h-6 w-6" />
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// Quick Actions FAB
function QuickActionsFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Camera, label: 'Photo', color: 'bg-blue-500' },
    { icon: Phone, label: 'Call', color: 'bg-green-500' },
    { icon: FileText, label: 'Report', color: 'bg-purple-500' },
    { icon: Navigation, label: 'Navigate', color: 'bg-orange-500' }
  ];

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg touch-target-lg"
      >
        <Plus className={cn(
          "h-6 w-6 transition-transform",
          isOpen && "rotate-45"
        )} />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full shadow-md animate-slide-in-bottom touch-target",
                action.color
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <action.icon className="h-5 w-5 text-white" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// Weather Widget
function WeatherWidget() {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <CloudRain className="h-4 w-4" />
          Weather Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudRain className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-semibold">Heavy Rain</p>
              <p className="text-xs text-gray-600">Next 4 hours</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">25°C</p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Wind className="h-3 w-3" />
              15 km/h
            </p>
          </div>
        </div>
        <Alert className="mt-3 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            2 outdoor jobs may be affected
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

// Active Job Card
function ActiveJobCard({ job }: { job: any }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-sm flex items-center gap-2">
            {job.id}
            <StatusIndicator status={job.priority} label="" />
          </h3>
          <p className="text-xs text-gray-600 mt-1">{job.address}</p>
        </div>
        <JobTypeBadge type={job.type} />
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {job.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.distance}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );
}

// Main Enhanced Dashboard Component
export function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useOnlineStatus();

  // Demo data
  const activeJobs = [
    { id: '#1248', type: 'water', address: '123 Main St, Sydney', time: '2h ago', distance: '5km', priority: 'urgent' },
    { id: '#1249', type: 'fire', address: '456 Park Ave, Melbourne', time: 'Tomorrow 9am', distance: '12km', priority: 'active' },
    { id: '#1250', type: 'mold', address: '789 Queen St, Brisbane', time: 'Monday', distance: '8km', priority: 'normal' }
  ];

  const kpiData = {
    jobsCompleted: 47,
    avgRating: 4.8,
    responseTime: 45,
    revenue: 124580,
    activeJobs: 3,
    pendingInvoices: 5,
    completionRate: 95,
    satisfactionRate: 96,
    onTimeRate: 89
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Connection Status Bar */}
      <div className={cn(
        "flex items-center justify-center py-1 text-xs transition-all",
        isOnline ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
      )}>
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3 mr-1" />
            <span>Connected</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3 mr-1" />
            <span>Offline Mode - Changes will sync when connected</span>
          </>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Contractor Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Demo Restoration Services</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            <Badge variant="outline">Tier: Gold</Badge>
          </div>
        </div>

        {/* Emergency Alert (if any) */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              <strong>Emergency Job Available:</strong> Water damage at 42 Emergency St - Respond immediately
            </span>
            <Button size="sm" className="ml-4">
              Accept
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </AlertDescription>
        </Alert>

        {/* Desktop Tabs / Mobile Content */}
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {renderOverviewContent()}
            </TabsContent>

            <TabsContent value="jobs">
              {renderJobsContent()}
            </TabsContent>

            <TabsContent value="compliance">
              {renderComplianceContent()}
            </TabsContent>

            <TabsContent value="training">
              {renderTrainingContent()}
            </TabsContent>

            <TabsContent value="billing">
              {renderBillingContent()}
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden space-y-6">
          {activeTab === 'overview' && renderOverviewContent()}
          {activeTab === 'jobs' && renderJobsContent()}
          {activeTab === 'compliance' && renderComplianceContent()}
          {activeTab === 'support' && renderSupportContent()}
          {activeTab === 'profile' && renderProfileContent()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Quick Actions FAB */}
      <QuickActionsFAB />
    </div>
  );

  function renderOverviewContent() {
    return (
      <>
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PriorityCard priority="high" title="Active Jobs">
            <div className="text-2xl font-bold">{kpiData.activeJobs}</div>
            <p className="text-xs text-gray-600 mt-1">2 urgent</p>
          </PriorityCard>

          <PriorityCard priority="normal" title="Avg Rating">
            <div className="text-2xl font-bold flex items-center gap-1">
              {kpiData.avgRating}
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-xs text-gray-600 mt-1">89 reviews</p>
          </PriorityCard>

          <PriorityCard priority="normal" title="Response Time">
            <div className="text-2xl font-bold">{kpiData.responseTime} min</div>
            <p className="text-xs text-green-600 mt-1">↓ 15% better</p>
          </PriorityCard>

          <PriorityCard priority="normal" title="Revenue YTD">
            <div className="text-2xl font-bold">${(kpiData.revenue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-gray-600 mt-1">↑ 23% vs last year</p>
          </PriorityCard>
        </div>

        {/* Weather and Active Jobs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Active Jobs
                  </span>
                  <Button size="sm" variant="outline">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeJobs.map((job) => (
                    <ActiveJobCard key={job.id} job={job} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your performance for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PerformanceMeter 
                value={kpiData.completionRate} 
                label="Job Completion Rate" 
                target={90}
              />
              <PerformanceMeter 
                value={kpiData.satisfactionRate} 
                label="Customer Satisfaction" 
                target={95}
              />
              <PerformanceMeter 
                value={kpiData.onTimeRate} 
                label="On-Time Arrival" 
                target={85}
              />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  function renderJobsContent() {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Assigned', 'En Route', 'On Site', 'In Progress', 'Completed'].map((stage, index) => (
                  <div key={stage} className="text-center">
                    <div className="text-2xl font-bold">{index === 2 ? 1 : index === 4 ? 47 : index === 0 ? 2 : 0}</div>
                    <p className="text-xs text-gray-600">{stage}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <ActiveJobCard key={job.id} job={job} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderComplianceContent() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Insurance', status: 'Active', expiry: 'Mar 15, 2025', icon: Shield },
              { name: 'IICRC Certification', status: 'Active', expiry: 'Jun 20, 2025', icon: Award },
              { name: 'Background Check', status: 'Verified', expiry: 'Dec 01, 2024', icon: Users },
              { name: 'Business License', status: 'Active', expiry: 'Sep 30, 2025', icon: FileText }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Expires: {item.expiry}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderTrainingContent() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Training & Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Available Courses</h3>
              <div className="space-y-3">
                {[
                  { name: 'Advanced Water Damage', duration: '8h', ceus: 0.8 },
                  { name: 'Mould Remediation', duration: '4h', ceus: 0.4 }
                ].map((course) => (
                  <div key={course.name} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">{course.name}</p>
                      <p className="text-xs text-gray-500">Duration: {course.duration} | CEUs: {course.ceus}</p>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderBillingContent() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PriorityCard priority="high" title="Outstanding">
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-gray-600">5 invoices</p>
          </PriorityCard>

          <PriorityCard priority="normal" title="Last Payment">
            <div className="text-2xl font-bold">$8,320</div>
            <p className="text-xs text-gray-600">3 days ago</p>
          </PriorityCard>

          <PriorityCard priority="normal" title="Next Payout">
            <div className="text-2xl font-bold">$5,200</div>
            <p className="text-xs text-gray-600">In 2 days</p>
          </PriorityCard>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: '#892', job: 'Water damage - #1247', amount: 3450, status: 'Pending' },
                { id: '#891', job: 'Mould remediation - #1244', amount: 2100, status: 'Paid' }
              ].map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Invoice {invoice.id}</p>
                    <p className="text-xs text-gray-500">{invoice.job}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${invoice.amount}</p>
                    <Badge 
                      variant={invoice.status === 'Paid' ? 'default' : 'outline'}
                      className={invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderSupportContent() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  function renderProfileContent() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Demo Restoration Services</p>
              <p className="text-sm text-gray-600">demo@restoration.com</p>
            </div>
            <Button className="w-full" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button className="w-full" variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
            <Button className="w-full" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
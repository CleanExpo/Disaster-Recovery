'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Smartphone,
  Shield,
  Briefcase,
  Camera,
  Wifi,
  WifiOff,
  MapPin,
  Bell,
  User,
  Settings,
  Download,
  Upload,
  Battery,
  Signal,
  Navigation,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Home,
  FileText,
  GraduationCap,
  MessageSquare,
  ScanLine,
  Fingerprint,
  RefreshCw,
  Play,
  Apple,
  Zap
} from 'lucide-react';
import type { MobileJob, MobileCompliance, MobileNotification, SyncStatus } from '@/types/mobile-app';

// Mock data
const mockJobs: MobileJob[] = [
  {
    id: 'job-1',
    jobNumber: 'JOB-2024-001',
    type: 'water_damage',
    status: 'in_progress',
    priority: 'urgent',
    client: {
      name: 'Sarah Johnson' },
    location: {
      address: '123 George St, Sydney NSW 2000',
      coordinates: { latitude: -33.8688, longitude: 151.2093 },
      distance: 2.5,
      estimatedTravelTime: 15
    },
    scheduledDate: new Date(),
    estimatedDuration: 3,
    notes: 'Severe water damage in basement',
    photos: [],
    documents: [],
    syncStatus: 'synced'
  },
  {
    id: 'job-2',
    jobNumber: 'JOB-2024-002',
    type: 'mould',
    status: 'assigned',
    priority: 'routine',
    client: {
      name: 'Mike Chen' },
    location: {
      address: '456 Pitt St, Sydney NSW 2000',
      coordinates: { latitude: -33.8732, longitude: 151.2069 },
      distance: 4.2,
      estimatedTravelTime: 20
    },
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    estimatedDuration: 2,
    notes: 'Mould inspection and remediation',
    photos: [],
    documents: [],
    syncStatus: 'synced'
  }
];

const mockCompliance: MobileCompliance = {
  certifications: [
    {
      id: 'cert-1',
      name: 'IICRC Water Damage Restoration',
      type: 'IICRC',
      status: 'valid',
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      offlineAvailable: true,
      canRenewViaApp: true
    },
    {
      id: 'cert-2',
      name: 'Public Liability Insurance',
      type: 'Insurance',
      status: 'expiring',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      offlineAvailable: true,
      canRenewViaApp: false
    }
  ],
  insurance: [],
  training: [],
  overallScore: 85,
  expiringItems: 2,
  urgentActions: []
};

const mockSyncStatus: SyncStatus = {
  isOnline: true,
  isSyncing: false,
  lastSync: new Date(Date.now() - 5 * 60 * 1000),
  pendingUploads: 3,
  pendingDownloads: 0,
  queuedItems: [],
  conflicts: []
};

export function MobileAppDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const MobileFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto" style={{ maxWidth: '375px' }}>
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
        {/* Notch/Dynamic Island */}
        {selectedPlatform === 'ios' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-10" />
        )}
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ minHeight: '700px' }}>
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-2 bg-white text-black text-xs">
            <span className="font-medium">9:41 AM</span>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3 w-3" />
            </div>
          </div>
          
          {/* Content */}
          <div className="pb-20">
            {children}
          </div>
          
          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
            <div className="flex justify-around py-2">
              <button className="flex flex-col items-center p-2">
                <Home className="h-5 w-5 text-blue-600" />
                <span className="text-xs mt-1 text-blue-600">Home</span>
              </button>
              <button className="flex flex-col items-center p-2">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">Jobs</span>
              </button>
              <button className="flex flex-col items-center p-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">Compliance</span>
              </button>
              <button className="flex flex-col items-center p-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">Alerts</span>
              </button>
              <button className="flex flex-col items-center p-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">Profile</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Home Indicator (iOS) */}
        {selectedPlatform === 'ios' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full" />
        )}
      </div>
    </div>
  );

  const MobileHomeScreen = () => (
    <ScrollArea className="h-[580px]">
      <div className="p-4 space-y-4">
        {/* Offline Mode Alert */}
        {isOfflineMode && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <WifiOff className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm">
              Offline mode - Changes will sync when connected
            </AlertDescription>
          </Alert>
        )}

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold">Good Morning, John</h2>
              <p className="text-sm text-blue-100">2 jobs scheduled today</p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white">
                {isOfflineMode ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
              </Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-xs text-blue-100">Compliance Score</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-xs text-blue-100">Rating</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <Camera className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs">Photo</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <Navigation className="h-5 w-5 text-green-600 mb-1" />
            <span className="text-xs">Navigate</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <ScanLine className="h-5 w-5 text-purple-600 mb-1" />
            <span className="text-xs">Scan Doc</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <MessageSquare className="h-5 w-5 text-blue-700 mb-1" />
            <span className="text-xs">Support</span>
          </button>
        </div>

        {/* Today's Jobs */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Today's Jobs</h3>
            <button className="text-sm text-blue-600">View All</button>
          </div>
          <div className="space-y-2">
            {mockJobs.slice(0, 2).map((job) => (
              <div key={job.id} className="bg-white border rounded-xl p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{job.jobNumber}</p>
                    <p className="text-xs text-gray-500">{job.client.name}</p>
                  </div>
                  <Badge className={`text-xs ${
                    job.priority === 'emergency' ? 'bg-red-100 text-red-700' :
                    job.priority === 'urgent' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span className="flex-1 truncate">{job.location.address}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{job.estimatedDuration}h</span>
                  </div>
                  <Button size="sm" className="h-7 text-xs">
                    {job.status === 'assigned' ? 'Start' : 'Continue'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Alerts */}
        {mockCompliance.expiringItems > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900">
                  {mockCompliance.expiringItems} items expiring soon
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Tap to view and renew
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        )}

        {/* Sync Status */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${mockSyncStatus.isSyncing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Sync Status</span>
            </div>
            <span className="text-xs text-gray-500">
              {mockSyncStatus.isSyncing ? 'Syncing...' : `Last: ${new Date(mockSyncStatus.lastSync).toLocaleTimeString()}`}
            </span>
          </div>
          {mockSyncStatus.pendingUploads > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{mockSyncStatus.pendingUploads} pending uploads</span>
                <span>3 MB</span>
              </div>
              <Progress value={30} className="h-1" />
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
              <Smartphone className="h-8 w-8" />
              Mobile App Features
            </h1>
            <p className="text-blue-100">
              Secure, mobile-optimised contractor portal for field technicians
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedPlatform === 'ios' ? 'secondary' : 'outline'}
              onClick={() => setSelectedPlatform('ios')}
              className={selectedPlatform === 'ios' ? '' : 'bg-white/20 text-white border-white/50'}
            >
              <Apple className="h-4 w-4 mr-2" />
              iOS
            </Button>
            <Button
              variant={selectedPlatform === 'android' ? 'secondary' : 'outline'}
              onClick={() => setSelectedPlatform('android')}
              className={selectedPlatform === 'android' ? '' : 'bg-white/20 text-white border-white/50'}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Android
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mobile Preview */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mobile App Preview</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOfflineMode(!isOfflineMode)}
                >
                  {isOfflineMode ? <WifiOff className="h-4 w-4 mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
                  {isOfflineMode ? 'Offline' : 'Online'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <MobileFrame>
                <MobileHomeScreen />
              </MobileFrame>
            </CardContent>
          </Card>
        </div>

        {/* Feature Details */}
        <div className="space-y-6">
          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle>Core Features</CardTitle>
              <CardDescription>
                Essential functionality for field operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Secure Authentication */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Fingerprint className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Secure Authentication</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Biometric login (Face ID/Touch ID) with 2FA support
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Face ID</Badge>
                    <Badge variant="outline" className="text-xs">Touch ID</Badge>
                    <Badge variant="outline" className="text-xs">2FA</Badge>
                  </div>
                </div>
              </div>

              {/* Job Management */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Job Management On-the-Go</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    View jobs, update status, upload photos, and manage documentation
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Real-time</Badge>
                    <Badge variant="outline" className="text-xs">GPS</Badge>
                    <Badge variant="outline" className="text-xs">Photos</Badge>
                  </div>
                </div>
              </div>

              {/* Offline Mode */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <WifiOff className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Offline Functionality</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Capture data without connection, auto-sync when online
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Auto-sync</Badge>
                    <Badge variant="outline" className="text-xs">Conflict resolution</Badge>
                  </div>
                </div>
              </div>

              {/* Compliance Tracking */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Compliance Reminders</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Push notifications for expiring certifications and documents
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">Push alerts</Badge>
                    <Badge variant="outline" className="text-xs">Quick upload</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Platform Support</span>
                  <div className="flex gap-2">
                    <Badge>iOS 14+</Badge>
                    <Badge>Android 10+</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">App Size</span>
                  <span className="text-sm text-gray-500">~45 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Offline Storage</span>
                  <span className="text-sm text-gray-500">Up to 500 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Battery Usage</span>
                  <Badge className="bg-green-100 text-green-800">Optimised</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security</span>
                  <Badge className="bg-blue-100 text-blue-800">AES-256</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Links */}
          <Card>
            <CardHeader>
              <CardTitle>Download the App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <Apple className="h-4 w-4 mr-2" />
                Download on App Store
              </Button>
              <Button className="w-full" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Get it on Google Play
              </Button>
              <p className="text-xs text-center text-gray-500">
                Version 2.1.0 • Released Dec 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Training & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Access learning modules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Submit course completions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Track CEU credits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Bookmark resources</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Live chat support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Emergency notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Ticket management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Push notifications</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Safety & Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Location sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Safety check-ins</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Emergency contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Geofencing alerts</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
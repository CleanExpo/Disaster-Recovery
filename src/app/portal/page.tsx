'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, BookOpen, Award, 
  BarChart3, Settings, LogOut, Menu, X,
  DollarSign, MapPin, Clock, CheckCircle2,
  AlertCircle, TrendingUp, Calendar, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ContractorPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Mock contractor data - will be replaced with real API data
  const contractorData = {
    name: "Elite Restoration Services",
    id: "CNT-2024-0156",
    status: "Active",
    certification: "Gold",
    territory: "Brisbane North",
    joinDate: "March 2024",
    leads: {
      active: 12,
      completed: 145,
      revenue: 487650
    },
    training: {
      completed: 85,
      inProgress: 2,
      required: 3
    },
    performance: {
      rating: 4.8,
      responseTime: "45 min avg",
      completionRate: 96
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/portal' },
    { icon: Users, label: 'Lead Management', href: '/portal/leads' },
    { icon: BookOpen, label: 'Training Hub', href: '/portal/training' },
    { icon: Award, label: 'Certifications', href: '/portal/certifications' },
    { icon: MapPin, label: 'Territory', href: '/portal/territory' },
    { icon: BarChart3, label: 'Analytics', href: '/portal/analytics' },
    { icon: DollarSign, label: 'Billing', href: '/portal/billing' },
    { icon: Settings, label: 'Settings', href: '/portal/settings' }
  ];

  const activeLeads = [
    { id: 'LD-2024-3421', type: 'Water Damage', location: 'Chermside', value: 12500, urgency: 'high' },
    { id: 'LD-2024-3422', type: 'Mould Remediation', location: 'Aspley', value: 8700, urgency: 'medium' },
    { id: 'LD-2024-3423', type: 'Fire Restoration', location: 'Kedron', value: 45000, urgency: 'high' },
    { id: 'LD-2024-3424', type: 'Sewage Cleanup', location: 'Nundah', value: 6300, urgency: 'urgent' }
  ];

  const upcomingTraining = [
    { title: 'Advanced Mould Remediation', date: '15 Jan 2025', duration: '2 days', type: 'mandatory' },
    { title: 'IICRC WRT Certification', date: '22 Jan 2025', duration: '3 days', type: 'certification' },
    { title: 'Commercial Large Loss', date: '5 Feb 2025', duration: '1 day', type: 'optional' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-white transition-transform duration-300 z-50`}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">NRP Portal</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Contractor ID</p>
            <p className="font-mono text-sm">{contractorData.id}</p>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors mb-1"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors w-full">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {contractorData.name}</h1>
                <p className="text-sm text-gray-600">Territory: {contractorData.territory} • Status: <span className="text-green-600 font-medium">{contractorData.status}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Certification Level</p>
                <p className="text-lg font-bold text-yellow-600">{contractorData.certification}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <AlertCircle className="h-4 w-4 mr-2" />
                Emergency Support
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Leads</CardTitle>
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractorData.leads.active}</div>
                <p className="text-xs text-gray-500 mt-1">4 urgent, 5 high priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(contractorData.leads.revenue / 12).toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Response Time</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractorData.performance.responseTime}</div>
                <p className="text-xs text-gray-500 mt-1">Target: &lt;60 min</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Performance Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractorData.performance.rating}/5.0</div>
                <p className="text-xs text-gray-500 mt-1">{contractorData.performance.completionRate}% completion rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Leads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Leads</span>
                  <Link href="/portal/leads" className="text-sm text-blue-600 hover:text-blue-700">
                    View all →
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{lead.id}</span>
                          {lead.urgency === 'urgent' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Urgent</span>
                          )}
                          {lead.urgency === 'high' && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">High</span>
                          )}
                        </div>
                        <p className="text-sm font-medium">{lead.type}</p>
                        <p className="text-xs text-gray-600">{lead.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${lead.value.toLocaleString()}</p>
                        <Button size="sm" className="mt-1">Accept</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training & Certification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Training & Certification</span>
                  <Link href="/portal/training" className="text-sm text-blue-600 hover:text-blue-700">
                    View all →
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Training Progress</span>
                    <span>{contractorData.training.completed}%</span>
                  </div>
                  <Progress value={contractorData.training.completed} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {contractorData.training.inProgress} in progress, {contractorData.training.required} required
                  </p>
                </div>

                <div className="space-y-3">
                  {upcomingTraining.map((training) => (
                    <div key={training.title} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{training.title}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {training.date} • {training.duration}
                          </p>
                        </div>
                        {training.type === 'mandatory' && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Required</span>
                        )}
                        {training.type === 'certification' && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Certification</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Submit Claim</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <MapPin className="h-6 w-6 mb-2" />
                  <span>Update Territory</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span>Start Training</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-4">
                  <Award className="h-6 w-6 mb-2" />
                  <span>View Certificates</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
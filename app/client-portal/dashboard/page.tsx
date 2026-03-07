'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { BarChart3, FileText, Clock, CheckCircle, TrendingUp, Calendar, DollarSign, AlertCircle } from 'lucide-react';

function ClientPortalDashboardPageOriginal() {
  const stats = [
    { label: 'Active Claims', value: '3', icon: FileText, color: 'bg-blue-600' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'In Progress', value: '2', icon: Clock, color: 'bg-yellow-600' },
    { label: 'Total Value', value: '$245K', icon: DollarSign, color: 'bg-purple-600' }
  ];

  const recentActivity = [
    { id: 1, action: 'Claim CLM-2024-001 updated', time: '2 hours ago', status: 'info' },
    { id: 2, action: 'Document uploaded for water damage claim', time: '5 hours ago', status: 'success' },
    { id: 3, action: 'Contractor assigned to fire damage restoration', time: '1 day ago', status: 'success' },
    { id: 4, action: 'Insurance approval received for CLM-2024-002', time: '2 days ago', status: 'success' },
    { id: 5, action: 'New message from contractor', time: '3 days ago', status: 'info' }
  ];

  const upcomingAppointments = [
    { date: '2024-03-20', time: '10:00 AM', type: 'Site Inspection', location: '123 Main St, Brisbane' },
    { date: '2024-03-22', time: '2:00 PM', type: 'Progress Review', location: '456 Queen St, Sydney' },
    { date: '2024-03-25', time: '11:30 AM', type: 'Final Walkthrough', location: '789 King St, Melbourne' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Client Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's your restoration overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      {activity.status === 'success' ? 
                        <CheckCircle className="w-4 h-4 text-white" /> : 
                        <AlertCircle className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-300 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Appointments</h2>
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((apt, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold">{apt.type}</p>
                      <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">Upcoming</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">{apt.date} at {apt.time}</p>
                    <p className="text-gray-300 text-xs">{apt.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Restoration Progress</h2>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-blue-600 border-t-transparent animate-spin"></div>
              <p className="text-gray-300">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ClientPortalDashboardPage() {
  return (
    <>
      <AntigravityNavbar />
      <ClientPortalDashboardPageOriginal />
      <AntigravityFooter />
    </>
  );
}

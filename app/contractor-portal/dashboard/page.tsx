'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { DollarSign, Briefcase, TrendingUp, Clock, Star, Calendar, MapPin, Award } from 'lucide-react';

function ContractorPortalDashboardPageOriginal() {
  const stats = [
    { label: 'Total Earnings', value: '$125,450', icon: DollarSign, color: 'bg-green-600', trend: '+12%' },
    { label: 'Active Jobs', value: '8', icon: Briefcase, color: 'bg-blue-600', trend: '+2' },
    { label: 'Completed Jobs', value: '47', icon: Award, color: 'bg-purple-600', trend: '+5' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-yellow-600', trend: '↑0.2' }
  ];

  const activeJobs = [
    {
      id: 'JOB-2024-101',
      client: 'Sarah Johnson',
      type: 'Water Damage Restoration',
      location: 'Brisbane CBD',
      status: 'in-progress',
      value: '$15,000',
      deadline: '2024-03-25'
    },
    {
      id: 'JOB-2024-102',
      client: 'Mike Chen',
      type: 'Fire Damage Cleanup',
      location: 'Gold Coast',
      status: 'scheduled',
      value: '$35,000',
      deadline: '2024-03-28'
    },
    {
      id: 'JOB-2024-103',
      client: 'ABC Corporation',
      type: 'Commercial Mould Remediation',
      location: 'Sydney',
      status: 'assessment',
      value: '$45,000',
      deadline: '2024-04-05'
    }
  ];

  const upcomingSchedule = [
    { time: '9:00 AM', task: 'Site inspection - Water damage', client: 'Johnson Residence' },
    { time: '11:30 AM', task: 'Progress meeting', client: 'Chen Property' },
    { time: '2:00 PM', task: 'Final walkthrough', client: 'Williams Office' },
    { time: '4:00 PM', task: 'Quote preparation', client: 'New Lead - Storm damage' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'assessment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Contractor Dashboard</h1>
          <p className="text-gray-300">Welcome back! Manage your restoration projects</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.trend}</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Active Jobs</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View All Jobs</button>
              </div>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{job.id}</h3>
                        <p className="text-gray-300">{job.client} • {job.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                        {job.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {job.deadline}
                        </span>
                      </div>
                      <span className="text-green-400 font-semibold">{job.value}</span>
                    </div>
                    <div className="mt-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Today's Schedule</h2>
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="space-y-3">
                {upcomingSchedule.map((item, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-semibold text-sm whitespace-nowrap">{item.time}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{item.task}</p>
                        <p className="text-gray-300 text-xs mt-1">{item.client}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance This Month</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Jobs Completed</span>
                    <span className="text-white font-semibold">12/15</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Revenue Target</span>
                    <span className="text-white font-semibold">$38K/$50K</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Customer Satisfaction</span>
                    <span className="text-white font-semibold">96%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ContractorPortalDashboardPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ContractorPortalDashboardPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalDashboardPageOriginal />
      <AntigravityFooter />
    </>
  );
}

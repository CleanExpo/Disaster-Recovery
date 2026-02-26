'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Filter, Search, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

function ContractorPortalJobsPageOriginal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const jobs = [
    {
      id: 'JOB-2024-105',
      title: 'Emergency Water Damage - Residential',
      client: 'Insurance Claim #45678',
      location: 'Brisbane CBD, QLD',
      type: 'water-damage',
      status: 'new',
      value: '$18,500',
      urgency: 'urgent',
      deadline: '48 hours',
      description: 'Burst pipe flooding in 3-bedroom home. Immediate water extraction and drying required.',
      requirements: ['IICRC Certified', 'Water Extraction Equipment', 'Available Immediately']
    },
    {
      id: 'JOB-2024-106',
      title: 'Commercial Fire Damage Restoration',
      client: 'ABC Corporation',
      location: 'Sydney, NSW',
      type: 'fire-damage',
      status: 'available',
      value: '$75,000',
      urgency: 'high',
      deadline: '1 week',
      description: 'Fire damage to office building. Smoke damage cleanup and structural restoration needed.',
      requirements: ['Fire Restoration Experience', 'Large Crew Available', 'Commercial Insurance']
    },
    {
      id: 'JOB-2024-107',
      title: 'Mould Remediation - Apartment Complex',
      client: 'Property Management Group',
      location: 'Melbourne, VIC',
      type: 'mould',
      status: 'in-progress',
      value: '$32,000',
      urgency: 'medium',
      deadline: '2 weeks',
      description: 'Mould remediation in 10-unit apartment complex. HEPA filtration and containment required.',
      requirements: ['Mould Certification', 'HEPA Equipment', 'Safety Gear']
    },
    {
      id: 'JOB-2024-108',
      title: 'Storm Damage Repair - Multiple Properties',
      client: 'Insurance Batch Claim',
      location: 'Gold Coast, QLD',
      type: 'storm-damage',
      status: 'available',
      value: '$125,000',
      urgency: 'high',
      deadline: '2 weeks',
      description: 'Storm damage to 5 residential properties. Roof repairs, water damage, and debris removal.',
      requirements: ['Storm Damage Experience', 'Multiple Crews', 'Own Equipment']
    },
    {
      id: 'JOB-2024-109',
      title: 'Biohazard Cleanup - Industrial',
      client: 'Manufacturing Plant',
      location: 'Perth, WA',
      type: 'biohazard',
      status: 'available',
      value: '$28,000',
      urgency: 'urgent',
      deadline: '24 hours',
      description: 'Chemical spill cleanup in manufacturing facility. Specialised hazmat response required.',
      requirements: ['Hazmat Certification', 'Specialised PPE', 'Emergency Response Team']
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'water-damage': 'bg-blue-600',
      'fire-damage': 'bg-red-600',
      'mould': 'bg-green-600',
      'storm-damage': 'bg-purple-600',
      'biohazard': 'bg-orange-600'
    };
    return colors[type] || 'bg-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-gray-200';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Available Jobs</h1>
          <p className="text-gray-200">Browse and accept restoration projects</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by title, location, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Status</option>
                  <option value="new" className="text-gray-900">New</option>
                  <option value="available" className="text-gray-900">Available</option>
                  <option value="in-progress" className="text-gray-900">In Progress</option>
                </select>
              </button>
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Types</option>
                  <option value="water-damage" className="text-gray-900">Water Damage</option>
                  <option value="fire-damage" className="text-gray-900">Fire Damage</option>
                  <option value="mould" className="text-gray-900">Mould</option>
                  <option value="storm-damage" className="text-gray-900">Storm Damage</option>
                  <option value="biohazard" className="text-gray-900">Biohazard</option>
                </select>
              </button>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(job.type)}`}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status === 'in-progress' ? 'In Progress' : job.status}
                        </span>
                        <span className={`text-sm font-semibold ${getUrgencyColor(job.urgency)}`}>
                          {job.urgency.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{job.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-gray-200">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-200">
                          <Clock className="w-4 h-4" />
                          <span>Deadline: {job.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-200">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.value}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-200 text-sm mb-2">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <span key={index} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-sm">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {job.status === 'in-progress' ? (
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      View Progress
                    </button>
                  ) : (
                    <>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Accept Job
                      </button>
                      <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                        View Details
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default function ContractorPortalJobsPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ContractorPortalJobsPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalJobsPageOriginal />
      <AntigravityFooter />
    </>
  );
}

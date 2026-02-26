'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Filter, Search, Download } from 'lucide-react';

function ClientPortalClaimsPageOriginal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const claims = [
    {
      id: 'CLM-2024-001',
      date: '2024-03-15',
      type: 'Water Damage',
      property: '123 Main St, Brisbane',
      status: 'in-progress',
      amount: '$45,000',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'CLM-2024-002', 
      date: '2024-03-10',
      type: 'Fire Damage',
      property: '456 Queen St, Sydney',
      status: 'approved',
      amount: '$125,000',
      lastUpdate: '3 days ago'
    },
    {
      id: 'CLM-2024-003',
      date: '2024-03-05',
      type: 'Mould Remediation',
      property: '789 King St, Melbourne',
      status: 'pending',
      amount: '$15,000',
      lastUpdate: '1 week ago'
    },
    {
      id: 'CLM-2024-004',
      date: '2024-02-28',
      type: 'Storm Damage',
      property: '321 Park Ave, Perth',
      status: 'completed',
      amount: '$75,000',
      lastUpdate: '2 weeks ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Insurance Claims</h1>
          <p className="text-gray-300">Track and manage your restoration claims</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search claims by ID, property, or type..."
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
                  <option value="pending" className="text-gray-900">Pending</option>
                  <option value="in-progress" className="text-gray-900">In Progress</option>
                  <option value="approved" className="text-gray-900">Approved</option>
                  <option value="completed" className="text-gray-900">Completed</option>
                </select>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Claims Grid */}
        <div className="grid gap-6">
          {filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{claim.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      {claim.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="space-y-1 text-gray-300">
                    <p><span className="text-gray-300">Property:</span> {claim.property}</p>
                    <p><span className="text-gray-300">Type:</span> {claim.type}</p>
                    <p><span className="text-gray-300">Date Filed:</span> {claim.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white mb-1">{claim.amount}</p>
                  <p className="text-sm text-gray-300">Last updated {claim.lastUpdate}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No claims found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default function ClientPortalClaimsPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ClientPortalClaimsPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ClientPortalClaimsPageOriginal />
      <AntigravityFooter />
    </>
  );
}

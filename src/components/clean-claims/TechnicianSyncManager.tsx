'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  RefreshCw, 
  Check,
  AlertCircle,
  User,
  Award,
  Shield,
  Clock,
  Upload,
  Download,
  Camera,
  Star,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { 
  Technician,
  Certification,
  SyncStatus,
  JobAssignment,
  SpecialtyType,
  TechnicianStatus
} from '@/types/clean-claims-integration';

interface SyncMetrics {
  totalTechnicians: number;
  syncedTechnicians: number;
  pendingSync: number;
  failedSync: number;
  lastSyncTime?: string;
  nextScheduledSync?: string;
}

const TechnicianSyncManager: React.FC = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [syncMetrics, setSyncMetrics] = useState<SyncMetrics>({
    totalTechnicians: 0,
    syncedTechnicians: 0,
    pendingSync: 0,
    failedSync: 0
  });
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'synced' | 'pending' | 'error'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTechnicians();
    loadSyncMetrics();
  }, []);

  const loadTechnicians = () => {
    // Mock technician data
    const mockTechnicians: Technician[] = [
      {
        id: 'T001',
        cleanClaimsId: 'CC-TECH-001',
        name: 'John Smith',
        profileImage: '/api/placeholder/150/150',
        contactNumber: '+61 400 123 456',
        email: 'john.smith@eliterestore.com',
        certifications: [
          {
            id: 'CERT001',
            code: 'WRT',
            name: 'Water Damage Restoration Technician',
            issuingBody: 'IICRC',
            issueDate: '2022-03-15',
            expiryDate: '2025-03-15',
            verificationStatus: 'verified',
            verifiedAt: '2022-03-20'
          },
          {
            id: 'CERT002',
            code: 'ASD',
            name: 'Applied Structural Drying',
            issuingBody: 'IICRC',
            issueDate: '2022-06-10',
            expiryDate: '2025-06-10',
            verificationStatus: 'verified',
            verifiedAt: '2022-06-15'
          }
        ],
        specialtyFlags: [
          { type: 'senior_technician', label: 'Senior Technician', priority: 1 },
          { type: 'specialist', label: 'Water Damage Specialist', priority: 2 }
        ],
        companyAffiliation: {
          id: 'COMP001',
          name: 'Elite Restoration Co',
          logo: '/api/placeholder/100/100',
          website: 'https://eliterestore.com',
          contactEmail: 'info@eliterestore.com',
          contactPhone: '+61 2 9000 1234',
          address: {
            street: '123 Main St',
            suburb: 'Sydney',
            state: 'NSW',
            postcode: '2000',
            country: 'Australia'
          }
        },
        status: 'active',
        syncStatus: {
          status: 'synced',
          lastSuccess: new Date().toISOString(),
          retryCount: 0
        },
        metadata: {
          bio: 'Experienced restoration technician with 10+ years in water damage and mould remediation.',
          yearsExperience: 10,
          languages: ['English', 'Spanish'],
          specializations: ['Water Damage', 'Mould Remediation', 'Fire Damage'],
          rating: 4.8,
          completedJobs: 245,
          preferredRegions: ['Sydney Metro', 'Eastern Suburbs']
        }
      },
      {
        id: 'T002',
        cleanClaimsId: 'CC-TECH-002',
        name: 'Sarah Johnson',
        profileImage: '/api/placeholder/150/150',
        email: 'sarah.j@rapidresponse.com',
        certifications: [
          {
            id: 'CERT003',
            code: 'FSRT',
            name: 'Fire and Smoke Restoration Technician',
            issuingBody: 'IICRC',
            issueDate: '2023-01-10',
            expiryDate: '2026-01-10',
            verificationStatus: 'verified',
            verifiedAt: '2023-01-15'
          }
        ],
        specialtyFlags: [
          { type: 'team_lead', label: 'Team Lead', priority: 1 }
        ],
        companyAffiliation: {
          id: 'COMP002',
          name: 'Rapid Response Team',
          contactEmail: 'info@rapidresponse.com',
          contactPhone: '+61 3 9000 5678',
          address: {
            suburb: 'Melbourne',
            state: 'VIC',
            postcode: '3000',
            country: 'Australia'
          }
        },
        status: 'active',
        syncStatus: {
          status: 'pending',
          lastAttempt: new Date(Date.now() - 3600000).toISOString(),
          retryCount: 1
        },
        metadata: {
          yearsExperience: 7,
          languages: ['English'],
          rating: 4.6,
          completedJobs: 178
        }
      },
      {
        id: 'T003',
        name: 'Michael Chen',
        email: 'michael.chen@premier.com',
        certifications: [],
        specialtyFlags: [
          { type: 'specialist', label: 'Biohazard Specialist', priority: 1 }
        ],
        companyAffiliation: {
          id: 'COMP003',
          name: 'Premier Services',
          contactEmail: 'info@premier.com',
          contactPhone: '+61 7 3000 9999',
          address: {
            suburb: 'Brisbane',
            state: 'QLD',
            postcode: '4000',
            country: 'Australia'
          }
        },
        status: 'training',
        syncStatus: {
          status: 'error',
          lastAttempt: new Date(Date.now() - 7200000).toISOString(),
          errorMessage: 'Invalid certification data',
          retryCount: 3
        },
        metadata: {
          yearsExperience: 3,
          languages: ['English', 'Mandarin'],
          rating: 4.2,
          completedJobs: 56
        }
      }
    ];

    setTechnicians(mockTechnicians);
  };

  const loadSyncMetrics = () => {
    setSyncMetrics({
      totalTechnicians: 45,
      syncedTechnicians: 38,
      pendingSync: 4,
      failedSync: 3,
      lastSyncTime: new Date(Date.now() - 3600000).toISOString(),
      nextScheduledSync: new Date(Date.now() + 3600000).toISOString()
    });
  };

  const handleSync = async (technicianId?: string) => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          loadTechnicians();
          loadSyncMetrics();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleBulkSync = () => {
    handleSync();
  };

  const getStatusColor = (status: SyncStatus['status']) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTechnicianStatusColor = (status: TechnicianStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTechnicians = technicians.filter(tech => {
    const matchesFilter = filterStatus === 'all' || tech.syncStatus.status === filterStatus;
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.companyAffiliation.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-centre justify-between mb-4">
          <div className="flex items-centre space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Technician Sync Manager</h2>
              <p className="text-sm text-gray-500">Clean Claims API Integration</p>
            </div>
          </div>
          <div className="flex items-centre space-x-2">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-centre space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button
              onClick={handleBulkSync}
              disabled={isSyncing}
              className={`px-4 py-2 rounded-lg flex items-centre space-x-2 ${
                isSyncing 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
            </button>
          </div>
        </div>

        {/* Sync Progress */}
        {isSyncing && (
          <div className="mt-4">
            <div className="flex items-centre justify-between text-sm mb-1">
              <span className="text-gray-600">Syncing technicians...</span>
              <span className="font-medium">{syncProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Total Technicians</p>
            <p className="text-2xl font-semibold">{syncMetrics.totalTechnicians}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Synced</p>
            <p className="text-2xl font-semibold text-green-600">{syncMetrics.syncedTechnicians}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600">{syncMetrics.pendingSync}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Failed</p>
            <p className="text-2xl font-semibold text-red-600">{syncMetrics.failedSync}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Last Sync</p>
            <p className="text-sm font-medium text-blue-600">
              {syncMetrics.lastSyncTime 
                ? new Date(syncMetrics.lastSyncTime).toLocaleTimeString()
                : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-centre justify-between">
          <div className="flex items-centre space-x-2">
            {(['all', 'synced', 'pending', 'error'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg capitalize ${
                  filterStatus === status
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search technicians..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-64"
          />
        </div>
      </div>

      {/* Technician List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {filteredTechnicians.map((technician) => (
            <div
              key={technician.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedTechnician(technician)}
            >
              <div className="flex items-centre justify-between">
                <div className="flex items-centre space-x-4">
                  {/* Profile Image */}
                  <div className="relative">
                    {technician.profileImage ? (
                      <img
                        src={technician.profileImage}
                        alt={technician.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-centre justify-centre">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      technician.status === 'active' ? 'bg-green-500' :
                      technician.status === 'training' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`} />
                  </div>

                  {/* Technician Info */}
                  <div className="flex-1">
                    <div className="flex items-centre space-x-2">
                      <p className="font-medium">{technician.name}</p>
                      {technician.specialtyFlags.map((flag) => (
                        <span
                          key={flag.type}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                        >
                          {flag.label}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-centre space-x-4 mt-1 text-sm text-gray-600">
                      <span>{technician.companyAffiliation.name}</span>
                      {technician.email && (
                        <span>{technician.email}</span>
                      )}
                      {technician.metadata?.rating && (
                        <div className="flex items-centre space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{technician.metadata.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex items-centre space-x-2">
                    {technician.certifications.slice(0, 3).map((cert) => (
                      <div
                        key={cert.id}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded flex items-centre space-x-1"
                        title={cert.name}
                      >
                        <Shield className="h-3 w-3" />
                        <span>{cert.code}</span>
                      </div>
                    ))}
                    {technician.certifications.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{technician.certifications.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Sync Status */}
                <div className="flex items-centre space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Sync Status</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      getStatusColor(technician.syncStatus.status)
                    }`}>
                      {technician.syncStatus.status}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSync(technician.id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <RefreshCw className="h-4 w-4 text-gray-600" />
                  </button>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Error Message */}
              {technician.syncStatus.status === 'error' && technician.syncStatus.errorMessage && (
                <div className="mt-2 p-2 bg-red-50 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{technician.syncStatus.errorMessage}</p>
                    <p className="text-xs text-red-600 mt-1">
                      Retry {technician.syncStatus.retryCount} of 3
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technician Detail Modal */}
      {selectedTechnician && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-centre justify-between mb-4">
              <h3 className="text-lg font-semibold">Technician Profile</h3>
              <button
                onClick={() => setSelectedTechnician(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Profile Header */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="relative">
                {selectedTechnician.profileImage ? (
                  <img
                    src={selectedTechnician.profileImage}
                    alt={selectedTechnician.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-centre justify-centre">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold">{selectedTechnician.name}</h4>
                <p className="text-gray-600">{selectedTechnician.companyAffiliation.name}</p>
                <div className="flex items-centre space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    getTechnicianStatusColor(selectedTechnician.status)
                  }`}>
                    {selectedTechnician.status}
                  </span>
                  {selectedTechnician.specialtyFlags.map((flag) => (
                    <span
                      key={flag.type}
                      className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                    >
                      {flag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                {selectedTechnician.cleanClaimsId && (
                  <p className="text-xs text-gray-500">Clean Claims ID</p>
                )}
                <p className="font-mono text-sm">{selectedTechnician.cleanClaimsId || 'Not synced'}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-4 mb-4">
              <h5 className="font-medium mb-3">Contact Information</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm">{selectedTechnician.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm">{selectedTechnician.contactNumber || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-t pt-4 mb-4">
              <h5 className="font-medium mb-3">Certifications</h5>
              {selectedTechnician.certifications.length > 0 ? (
                <div className="space-y-2">
                  {selectedTechnician.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-centre justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-centre space-x-3">
                        <Shield className={`h-5 w-5 ${
                          cert.verificationStatus === 'verified' ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-600">
                            {cert.code} • {cert.issuingBody} • Expires {new Date(cert.expiryDate || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cert.verificationStatus === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cert.verificationStatus}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No certifications on file</p>
              )}
            </div>

            {/* Metadata */}
            {selectedTechnician.metadata && (
              <div className="border-t pt-4">
                <h5 className="font-medium mb-3">Professional Details</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm">{selectedTechnician.metadata.yearsExperience} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed Jobs</p>
                    <p className="text-sm">{selectedTechnician.metadata.completedJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="flex items-centre space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{selectedTechnician.metadata.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Languages</p>
                    <p className="text-sm">{selectedTechnician.metadata.languages?.join(', ')}</p>
                  </div>
                </div>
                {selectedTechnician.metadata.bio && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Bio</p>
                    <p className="text-sm text-gray-700">{selectedTechnician.metadata.bio}</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedTechnician(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleSync(selectedTechnician.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-centre space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Sync Technician</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Import Technicians</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-centre">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drop CSV file here or click to browse</p>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
              >
                Select File
              </label>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Expected format:</p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li>• Name, Email, Phone, Company, Certifications</li>
                <li>• CSV format with headers</li>
                <li>• Maximum 500 records per import</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianSyncManager;
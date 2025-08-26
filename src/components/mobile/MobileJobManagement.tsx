'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Camera,
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  Briefcase,
  Droplets,
  Flame,
  Shield,
  Wind,
  ChevronRight,
  PlayCircle,
  PauseCircle,
  XCircle,
  Upload,
  Download,
  Wifi,
  WifiOff,
  Battery,
  BarChart3,
  MessageSquare,
  Paperclip,
  Navigation2
} from 'lucide-react';
import type { MobileJob, JobPhoto, JobDocument } from '@/types/mobile-app';

export default function MobileJobManagement() {
  const [selectedJob, setSelectedJob] = useState<MobileJob | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'photos' | 'documents' | 'notes'>('details');
  const [jobStatus, setJobStatus] = useState<MobileJob['status']>('assigned');
  const [isOffline, setIsOffline] = useState(false);

  const mockJobs: MobileJob[] = [
    {
      id: '1',
      jobNumber: 'JOB-2024-001',
      type: 'water_damage',
      status: 'in_route',
      priority: 'emergency',
      client: {
        name: 'Sarah Johnson',
        phone: '+61 412 345 678',
        email: 'sarah.j@email.com'
      },
      location: {
        address: '123 Main St, Sydney NSW 2000',
        coordinates: { latitude: -33.8688, longitude: 151.2093 },
        distance: 5.2,
        estimatedTravelTime: 15
      },
      scheduledDate: new Date('2024-03-20T09:00:00'),
      estimatedDuration: 4,
      notes: 'Burst pipe in kitchen. Water damage to floor and cabinets.',
      photos: [],
      documents: [],
      syncStatus: 'synced'
    },
    {
      id: '2',
      jobNumber: 'JOB-2024-002',
      type: 'fire_damage',
      status: 'assigned',
      priority: 'urgent',
      client: {
        name: 'Michael Chen',
        phone: '+61 423 456 789'
      },
      location: {
        address: '456 Park Ave, Melbourne VIC 3000',
        coordinates: { latitude: -37.8136, longitude: 144.9631 },
        distance: 12.5,
        estimatedTravelTime: 25
      },
      scheduledDate: new Date('2024-03-20T14:00:00'),
      estimatedDuration: 6,
      notes: 'Kitchen fire. Smoke damage throughout property.',
      photos: [],
      documents: [],
      syncStatus: 'pending'
    },
    {
      id: '3',
      jobNumber: 'JOB-2024-003',
      type: 'mold',
      status: 'completed',
      priority: 'routine',
      client: {
        name: 'Emma Wilson',
        phone: '+61 434 567 890',
        email: 'emma.w@email.com'
      },
      location: {
        address: '789 Beach Rd, Brisbane QLD 4000',
        coordinates: { latitude: -27.4698, longitude: 153.0251 },
        distance: 8.3,
        estimatedTravelTime: 20
      },
      scheduledDate: new Date('2024-03-19T10:00:00'),
      estimatedDuration: 3,
      notes: 'Mold remediation in bathroom and laundry area.',
      photos: [],
      documents: [],
      syncStatus: 'synced'
    }
  ];

  const jobTypeIcons = {
    water_damage: <Droplets className="w-5 h-5" />,
    fire_damage: <Flame className="w-5 h-5" />,
    mold: <Shield className="w-5 h-5" />,
    biohazard: <AlertTriangle className="w-5 h-5" />,
    other: <Briefcase className="w-5 h-5" />
  };

  const jobTypeColors = {
    water_damage: 'bg-blue-100 text-blue-700 border-blue-200',
    fire_damage: 'bg-red-100 text-red-700 border-red-200',
    mold: 'bg-green-100 text-green-700 border-green-200',
    biohazard: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    other: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const statusColors = {
    assigned: 'bg-gray-100 text-gray-700',
    in_route: 'bg-blue-100 text-blue-700',
    on_site: 'bg-purple-100 text-purple-700',
    in_progress: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700'
  };

  const priorityColors = {
    routine: 'bg-gray-100 text-gray-700',
    urgent: 'bg-orange-100 text-orange-700',
    emergency: 'bg-red-100 text-red-700'
  };

  const JobCard = ({ job }: { job: MobileJob }) => (
    <div
      onClick={() => setSelectedJob(job)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg border ${jobTypeColors[job.type]}`}>
            {jobTypeIcons[job.type]}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{job.jobNumber}</p>
            <p className="text-sm text-gray-500">{job.client.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
            {job.priority.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
            {job.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{job.location.address}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{new Date(job.scheduledDate).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          {job.location.distance && (
            <div className="flex items-center text-gray-600">
              <Navigation className="w-4 h-4 mr-1" />
              <span>{job.location.distance} km</span>
            </div>
          )}
        </div>

        {job.syncStatus === 'pending' && (
          <div className="flex items-center text-orange-600">
            <WifiOff className="w-4 h-4 mr-2" />
            <span className="text-xs">Pending sync</span>
          </div>
        )}
      </div>
    </div>
  );

  const JobStatusUpdater = () => {
    const statusFlow = [
      { status: 'assigned', label: 'Assigned', icon: <Briefcase className="w-5 h-5" /> },
      { status: 'in_route', label: 'In Route', icon: <Navigation2 className="w-5 h-5" /> },
      { status: 'on_site', label: 'On Site', icon: <MapPin className="w-5 h-5" /> },
      { status: 'in_progress', label: 'In Progress', icon: <PlayCircle className="w-5 h-5" /> },
      { status: 'completed', label: 'Completed', icon: <CheckCircle className="w-5 h-5" /> }
    ];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
        <div className="flex justify-between items-center">
          {statusFlow.map((item, index) => (
            <React.Fragment key={item.status}>
              <button
                onClick={() => setJobStatus(item.status as MobileJob['status'])}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  jobStatus === item.status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
              {index < statusFlow.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const PhotoCapture = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Photos</h3>
        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Before</span>
        </div>
        <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">During</span>
        </div>
        <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">After</span>
        </div>
        <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <Camera className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Damage</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          4 photos pending upload • Will sync when online
        </p>
      </div>
    </div>
  );

  const DocumentManager = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Documents</h3>
        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {['Assessment Form', 'Client Agreement', 'Insurance Claim', 'Completion Report'].map((doc) => (
          <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc}</p>
                <p className="text-xs text-gray-500">PDF • 245 KB</p>
              </div>
            </div>
            <button className="p-1.5 text-gray-600 hover:text-blue-600">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const JobNotes = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Job Notes</h3>
      
      <div className="space-y-3 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">Initial assessment: Burst pipe in kitchen caused extensive water damage to flooring and lower cabinets.</p>
          <p className="text-xs text-gray-500 mt-1">Added 2 hours ago</p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">Client requested priority attention to kitchen area for insurance purposes.</p>
          <p className="text-xs text-gray-500 mt-1">Added 1 hour ago</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a note..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Job Management</h1>
          <p className="text-gray-600 mt-2">Field technician job tracking and management</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isOffline ? (
              <>
                <WifiOff className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Online</span>
              </>
            )}
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Toggle Network
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Jobs</h2>
          <div className="space-y-4">
            {mockJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-blue-900">Daily Summary</h3>
              <BarChart3 className="w-5 h-5 text-blue-700" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-900">3</p>
                <p className="text-xs text-blue-700">Total Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">1</p>
                <p className="text-xs text-blue-700">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">13h</p>
                <p className="text-xs text-blue-700">Est. Duration</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {selectedJob ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedJob.jobNumber}</h3>
                    <p className="text-sm text-gray-500">{selectedJob.client.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{selectedJob.location.address}</p>
                      <button className="text-xs text-blue-600 hover:text-blue-700 mt-1">
                        Get Directions
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{selectedJob.client.phone}</p>
                      <button className="text-xs text-blue-600 hover:text-blue-700 mt-1">
                        Call Client
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {new Date(selectedJob.scheduledDate).toLocaleDateString('en-AU')} at{' '}
                      {new Date(selectedJob.scheduledDate).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      Estimated duration: {selectedJob.estimatedDuration} hours
                    </p>
                  </div>
                </div>
              </div>

              <JobStatusUpdater />
              <PhotoCapture />
              <DocumentManager />
              <JobNotes />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
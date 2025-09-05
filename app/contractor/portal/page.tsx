'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  FileText,
  LogOut,
  BellRing,
  Briefcase,
  TrendingUp,
  Home,
  ChevronRight,
  Timer,
  AlertTriangle
} from 'lucide-react';

interface Job {
  id: string;
  claimId: string;
  status: 'new' | 'accepted' | 'in_progress' | 'completed';
  urgency: 'emergency' | 'urgent' | 'standard';
  client: {
    name: string;
    phone: string;
    address: string;
    suburb: string;
  };
  damage: {
    types: string[];
    description: string;
  };
  fee: number;
  submittedAt: string;
  deadline: string;
}

export default function ContractorPortalPage() {
  const router = useRouter();
  const [contractor, setContractor] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('contractorAuth');
    if (!auth) {
      router.push('/contractor/login');
      return;
    }
    
    const contractorData = JSON.parse(auth);
    setContractor(contractorData);
    
    // Load mock jobs
    loadJobs();
  }, []);

  const loadJobs = () => {
    // Mock jobs data
    const mockJobs: Job[] = [
      {
        id: 'JOB-001',
        claimId: 'CLM-2025-001',
        status: 'new',
        urgency: 'emergency',
        client: {
          name: 'Sarah Johnson',
          phone: '0423 456 789',
          address: '45 River Street',
          suburb: 'Brisbane CBD'
        },
        damage: {
          types: ['Water/Flood Damage', 'Mould Growth'],
          description: 'Burst pipe in bathroom, water damage to 3 rooms'
        },
        fee: 2750,
        submittedAt: new Date(Date.now() - 10 * 60000).toISOString(),
        deadline: new Date(Date.now() + 50 * 60000).toISOString()
      },
      {
        id: 'JOB-002',
        claimId: 'CLM-2025-002',
        status: 'new',
        urgency: 'urgent',
        client: {
          name: 'Michael Chen',
          phone: '0412 789 456',
          address: '123 Queen Street',
          suburb: 'South Brisbane'
        },
        damage: {
          types: ['Fire/Smoke Damage'],
          description: 'Kitchen fire, smoke damage throughout property'
        },
        fee: 2750,
        submittedAt: new Date(Date.now() - 30 * 60000).toISOString(),
        deadline: new Date(Date.now() + 30 * 60000).toISOString()
      },
      {
        id: 'JOB-003',
        claimId: 'CLM-2025-003',
        status: 'accepted',
        urgency: 'standard',
        client: {
          name: 'Emma Wilson',
          phone: '0498 765 432',
          address: '78 Park Avenue',
          suburb: 'Toowong'
        },
        damage: {
          types: ['Storm/Wind Damage'],
          description: 'Roof damage from recent storms, water ingress'
        },
        fee: 2750,
        submittedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        deadline: new Date(Date.now() + 22 * 3600000).toISOString()
      }
    ];
    
    setJobs(mockJobs);
    setLoading(false);
  };

  const acceptJob = async (jobId: string) => {
    // Update job status
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'accepted' as const } : job
    ));
    
    // Show success message
    alert(`Job ${jobId} accepted! Please contact the client within 60 minutes.`);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'OVERDUE';
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('contractorAuth');
    router.push('/contractor/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portal...</p>
        </div>
      </div>
    );
  }

  const availableJobs = jobs.filter(j => j.status === 'new');
  const acceptedJobs = jobs.filter(j => j.status === 'accepted');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Contractor Portal</h1>
                <p className="text-sm text-gray-600">{contractor?.company || 'Premium Restoration Services'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <BellRing className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Jobs</p>
                  <p className="text-2xl font-bold">{availableJobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold">{acceptedJobs.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{completedJobs.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Earnings</p>
                  <p className="text-2xl font-bold">${(jobs.filter(j => j.status === 'accepted' || j.status === 'completed').length * 2750).toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 60-Minute Alert */}
        {availableJobs.some(job => job.urgency === 'emergency') && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>URGENT:</strong> You have emergency jobs requiring contact within 60 MINUTES!
            </AlertDescription>
          </Alert>
        )}

        {/* Jobs Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">
              Available ({availableJobs.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({acceptedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-6">
            {availableJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No available jobs at the moment</p>
                </CardContent>
              </Card>
            ) : (
              availableJobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Job #{job.id}
                          <Badge className={getUrgencyColor(job.urgency)}>
                            {job.urgency.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Claim ID: {job.claimId}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${job.fee}</p>
                        <div className="flex items-center gap-1 text-sm text-red-600 font-medium">
                          <Timer className="h-4 w-4" />
                          Contact in: {getTimeRemaining(job.deadline)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Client Details
                        </h4>
                        <p className="text-sm">{job.client.name}</p>
                        <p className="text-sm text-gray-600">{job.client.phone}</p>
                        <p className="text-sm text-gray-600">
                          {job.client.address}, {job.client.suburb}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Damage Details
                        </h4>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.damage.types.map((type, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{job.damage.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => acceptJob(job.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Accept Job
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-6">
            {acceptedJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active jobs</p>
                </CardContent>
              </Card>
            ) : (
              acceptedJobs.map(job => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>Job #{job.id} - {job.client.name}</CardTitle>
                    <CardDescription>{job.client.address}, {job.client.suburb}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{job.client.phone}</span>
                      </div>
                      <Button size="sm">
                        Update Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No completed jobs yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
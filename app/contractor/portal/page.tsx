'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { contractorFetch, contractorLogout, getContractorProfile } from '@/lib/contractor-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubContractorManager from '@/components/contractor/portal/SubContractorManager';
import Link from 'next/link';
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
  AlertTriangle,
  Users,
  Truck,
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

function ContractorPortalPageOriginal() {
  const router = useRouter();
  const [contractor, setContractor] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  const [dashboardStats, setDashboardStats] = useState<{
    activeJobs: number; completedThisMonth: number; earningsThisMonth: number;
  }>({ activeJobs: 0, completedThisMonth: 0, earningsThisMonth: 0 });

  useEffect(() => {
    const profile = getContractorProfile();
    if (!profile) {
      router.push('/contractor/login');
      return;
    }
    setContractor(profile);
    loadJobs();
    loadDashboard();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await contractorFetch('/api/contractor/jobs');
      if (res.ok) {
        const data = await res.json();
        const apiJobs = (data.jobs ?? data.data ?? []).map((j: any): Job => ({
          id: j.id ?? j.jobId ?? '',
          claimId: j.claimId ?? j.claim?.id ?? '',
          status: mapStatus(j.status),
          urgency: mapUrgency(j.urgency ?? j.priority),
          client: {
            name: j.customer?.name ?? j.client?.name ?? 'Client',
            phone: j.customer?.phone ?? j.client?.phone ?? '',
            address: j.customer?.address ?? j.client?.address ?? j.address ?? '',
            suburb: j.customer?.suburb ?? j.client?.suburb ?? j.suburb ?? '',
          },
          damage: {
            types: j.service?.types ?? j.damage?.types ?? [j.serviceType ?? 'Restoration'],
            description: j.notes ?? j.damage?.description ?? j.description ?? '',
          },
          fee: j.fee ?? j.amount ?? 2750,
          submittedAt: j.createdAt ?? j.submittedAt ?? new Date().toISOString(),
          deadline: j.deadline ?? j.dueDate ?? new Date(Date.now() + 24 * 3600000).toISOString(),
        }));
        setJobs(apiJobs);
      }
    } catch {
      // API may 401 if JWT_SECRET_KEY not set — show empty state
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      const res = await contractorFetch('/api/contractor/dashboard');
      if (res.ok) {
        const data = await res.json();
        setDashboardStats({
          activeJobs: data.overview?.activeJobs ?? 0,
          completedThisMonth: data.overview?.completedThisMonth ?? 0,
          earningsThisMonth: data.earnings?.thisMonth ?? 0,
        });
      }
    } catch {
      // Graceful fallback — stats stay at 0
    }
  };

  const mapStatus = (s: string): Job['status'] => {
    const lower = (s ?? '').toLowerCase();
    if (lower === 'pending' || lower === 'new' || lower === 'available') return 'new';
    if (lower === 'assigned' || lower === 'accepted' || lower === 'in_progress') return 'accepted';
    if (lower === 'completed' || lower === 'done') return 'completed';
    return 'new';
  };

  const mapUrgency = (u: string): Job['urgency'] => {
    const lower = (u ?? '').toLowerCase();
    if (lower === 'emergency' || lower === 'critical') return 'emergency';
    if (lower === 'urgent' || lower === 'high') return 'urgent';
    return 'standard';
  };

  const acceptJob = async (jobId: string) => {
    try {
      const res = await contractorFetch('/api/contractor/jobs', {
        method: 'POST',
        body: JSON.stringify({ jobId, action: 'accept' }),
      });
      if (res.ok) {
        setJobs(prev => prev.map(job =>
          job.id === jobId ? { ...job, status: 'accepted' as const } : job
        ));
      }
    } catch {
      // Fallback: update locally anyway for UX
      setJobs(prev => prev.map(job =>
        job.id === jobId ? { ...job, status: 'accepted' as const } : job
      ));
    }
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
    contractorLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading portal...</p>
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
                <h1 className="text-base sm:text-xl font-bold">Contractor Portal</h1>
                <p className="text-xs sm:text-sm text-gray-700 truncate max-w-[150px] sm:max-w-none">{contractor?.company || 'Premium Restoration Services'}</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">Available Jobs</p>
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
                  <p className="text-sm text-gray-700">Active Jobs</p>
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
                  <p className="text-sm text-gray-700">Completed</p>
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
                  <p className="text-sm text-gray-700">Earnings</p>
                  <p className="text-2xl font-bold">${dashboardStats.earningsThisMonth.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits — Equipment finance */}
        <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Equipment finance — NRPG contractor benefit</p>
                <p className="text-sm text-slate-700">
                  Commercial equipment finance for trucks, drying rigs, thermal cameras and HEPA gear through Equipped Commercial Finance. DR is a Reg 25 referrer, not the lender.
                </p>
              </div>
            </div>
            <Link
              href="/contractor/equipment-finance"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 whitespace-nowrap"
            >
              Learn more
            </Link>
          </CardContent>
        </Card>

        {/* 60-Minute Alert */}
        {availableJobs.some(job => job.urgency === 'emergency') && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>URGENT:</strong> You have emergency jobs requiring contact as soon as a certified contractor is confirmed for your area!
            </AlertDescription>
          </Alert>
        )}

        {/* Jobs Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">
              Available ({availableJobs.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({acceptedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="sub-contractors" className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Sub-Contractors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-6">
            {availableJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-700">No available jobs at the moment</p>
                </CardContent>
              </Card>
            ) : (
              availableJobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2 flex-wrap">
                          Job #{job.id}
                          <Badge className={getUrgencyColor(job.urgency)}>
                            {job.urgency.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Claim ID: {job.claimId}
                        </CardDescription>
                      </div>
                      <div className="sm:text-right">
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
                        <p className="text-sm text-gray-700">{job.client.phone}</p>
                        <p className="text-sm text-gray-700">
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
                        <p className="text-sm text-gray-700">{job.damage.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-800"
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
                  <Clock className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-700">No active jobs</p>
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
                <CheckCircle2 className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-700">No completed jobs yet</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sub-contractors" className="mt-6">
            <SubContractorManager
              contractorId={contractor?.id ?? contractor?.contractorId ?? ''}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default function ContractorPortalPage() {
  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalPageOriginal />
      <AntigravityFooter />
    </>
  );
}

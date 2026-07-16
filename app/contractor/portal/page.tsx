'use client';


import {
  AntigravityNavbar,
  AntigravityFooter,
  AgLoadingState,
  AgEmptyState,
} from '@/components/antigravity';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { contractorFetch, contractorLogout, getContractorProfile, setContractorAuth } from '@/lib/contractor-auth';
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
    let cancelled = false;

    async function bootstrap() {
      try {
        const meRes = await fetch('/api/auth/me', { credentials: 'include' });
        if (!meRes.ok) {
          router.push('/contractor/login');
          return;
        }
        const me = (await meRes.json()) as {
          authenticated?: boolean;
          user?: {
            id?: string;
            email?: string;
            name?: string;
            role?: string;
            contractorId?: string;
          };
        };
        if (!me.authenticated || me.user?.role !== 'CONTRACTOR') {
          router.push('/contractor/login');
          return;
        }

        const cached = getContractorProfile();
        const profile = {
          id: me.user.contractorId || me.user.id,
          email: me.user.email,
          username: me.user.name || cached?.username,
          name: me.user.name,
          role: 'CONTRACTOR',
          ...(cached ?? {}),
        };
        setContractorAuth(profile);
        if (!cancelled) {
          setContractor(profile);
          loadJobs();
          loadDashboard();
        }
      } catch {
        if (!cancelled) router.push('/contractor/login');
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
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
      <div className="ag-page-elevated min-h-screen flex items-center justify-center">
        <AgLoadingState label="Loading portal…" />
      </div>
    );
  }

  const availableJobs = jobs.filter(j => j.status === 'new');
  const acceptedJobs = jobs.filter(j => j.status === 'accepted');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  return (
    <div className="ag-page-elevated min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[var(--ag-border-grey)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--ag-primary-blue)' }}
              >
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-[var(--ag-primary-blue)]">
                  Contractor portal
                </h1>
                <p className="text-xs sm:text-sm text-[var(--ag-text-grey)] truncate max-w-[150px] sm:max-w-none">
                  {contractor?.company || 'Your company'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
              <Link
                href="/contractor/kpi-tracking"
                className="hidden sm:inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--ag-secondary-blue)] hover:underline"
              >
                KPIs
              </Link>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <BellRing className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview — AG KPI tiles (no shadcn Card) */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: 'Available jobs',
              value: availableJobs.length,
              icon: <Briefcase className="h-5 w-5" style={{ color: 'var(--ag-secondary-blue)' }} />,
            },
            {
              label: 'Active jobs',
              value: acceptedJobs.length,
              icon: <Clock className="h-5 w-5 text-amber-600" />,
            },
            {
              label: 'Completed',
              value: completedJobs.length,
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
            },
            {
              label: 'Client bill (month)',
              value: `$${dashboardStats.earningsThisMonth.toLocaleString()}`,
              icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-[var(--ag-border-grey)] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--ag-text-grey)]">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--ag-primary-blue)]">
                    {kpi.value}
                  </p>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'color-mix(in srgb, var(--ag-primary-blue) 12%, white)' }}
                >
                  {kpi.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits — Equipment finance */}
        <div
          className="mb-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{
            background: 'color-mix(in srgb, var(--ag-primary-blue) 5%, white)',
            borderColor: 'color-mix(in srgb, var(--ag-primary-blue) 18%, white)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: 'var(--ag-primary-blue)' }}
            >
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ag-primary-blue)]">
                Equipment finance — NRPG contractor benefit
              </p>
              <p className="text-sm text-[var(--ag-text-grey)]">
                Commercial equipment finance for trucks, drying rigs, thermal cameras and HEPA gear
                through Equipped Commercial Finance. DR is a Reg 25 referrer, not the lender.
              </p>
            </div>
          </div>
          <Link
            href="/contractor/equipment-finance"
            className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-semibold text-white"
            style={{ background: 'var(--ag-primary-blue)' }}
          >
            Learn more
          </Link>
        </div>

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
              <Card className="border-[var(--ag-border-grey)]">
                <CardContent className="py-8">
                  <AgEmptyState
                    title="No available jobs"
                    description="New matched jobs will appear here when leads are assigned to your territory."
                  />
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

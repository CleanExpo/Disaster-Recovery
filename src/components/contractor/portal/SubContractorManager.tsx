'use client';

// Sub-Contractor Manager — Contractor Portal Tab
// Ref: DR-592 — Licensed trade engagement within NRPG contractor portal

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Users,
  Plus,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  DollarSign,
  ChevronRight,
  Info,
  UserPlus,
  Briefcase,
  Mail,
} from 'lucide-react';
import {
  SubContractor,
  SubContractorEngagement,
  SubContractorEngagementFormValues,
  SubContractorOnboardingFormValues,
  SubContractorTradeType,
  EngagementStatus,
  OnboardingStatus,
  TRADE_TYPE_LABELS,
  calculateSubContractorMarkup,
  MarkupCalculation,
} from '@/types/sub-contractor';
import SubContractorOnboarding from './SubContractorOnboarding';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ENGAGEMENT_STATUS_CONFIG: Record<
  EngagementStatus,
  { label: string; colour: string }
> = {
  QUOTED: { label: 'Quoted', colour: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  PENDING_AGREEMENT: { label: 'Pending Agreement', colour: 'bg-orange-100 text-orange-800 border-orange-200' },
  ACTIVE: { label: 'Active', colour: 'bg-blue-100 text-blue-800 border-blue-200' },
  COMPLETE: { label: 'Complete', colour: 'bg-green-100 text-green-800 border-green-200' },
  INVOICED: { label: 'Invoiced', colour: 'bg-purple-100 text-purple-800 border-purple-200' },
  CANCELLED: { label: 'Cancelled', colour: 'bg-gray-100 text-gray-600 border-gray-200' },
};

const ONBOARDING_STATUS_CONFIG: Record<
  OnboardingStatus,
  { label: string; colour: string }
> = {
  NOT_STARTED: { label: 'Not Started', colour: 'bg-gray-100 text-gray-600' },
  IN_PROGRESS: { label: 'In Progress', colour: 'bg-yellow-100 text-yellow-800' },
  AWAITING_SIGNATURE: { label: 'Awaiting Signature', colour: 'bg-orange-100 text-orange-800' },
  COMPLETE: { label: 'Onboarded', colour: 'bg-green-100 text-green-800' },
  REJECTED: { label: 'Rejected', colour: 'bg-red-100 text-red-800' },
};

function formatAud(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  }).format(cents);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Markup Calculator Card ────────────────────────────────────────────────────

interface MarkupCalculatorDisplayProps {
  calc: MarkupCalculation | null;
}

function MarkupCalculatorDisplay({ calc }: MarkupCalculatorDisplayProps) {
  if (!calc) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-blue-900 flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Customer Invoice Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Sub-contractor invoice (ex GST)</span>
          <span>{formatAud(calc.subInvoiceAmount)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>NRPG administration ({calc.markupPercent}%)</span>
          <span>{formatAud(calc.markupAmount)}</span>
        </div>
        <div className="flex justify-between font-medium border-t border-blue-200 pt-2">
          <span>Customer charge (ex GST)</span>
          <span>{formatAud(calc.customerChargeExGst)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>GST (10%)</span>
          <span>{formatAud(calc.gstAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-blue-900 border-t border-blue-200 pt-2">
          <span>Customer total (inc GST)</span>
          <span>{formatAud(calc.customerChargeTotalIncGst)}</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          The administration margin is not itemised on the customer invoice. The customer sees the total line item only.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Engagement Form ───────────────────────────────────────────────────────────

interface EngagementFormProps {
  subContractors: SubContractor[];
  onSubmit: (values: SubContractorEngagementFormValues) => Promise<void>;
  onInviteNew: (email: string, tradeType: SubContractorTradeType) => void;
  isSubmitting: boolean;
}

function EngagementForm({
  subContractors,
  onSubmit,
  onInviteNew,
  isSubmitting,
}: EngagementFormProps) {
  const [calc, setCalc] = useState<MarkupCalculation | null>(null);
  const [inviteMode, setInviteMode] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteTradeType, setInviteTradeType] = useState<SubContractorTradeType | ''>('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SubContractorEngagementFormValues>({
    defaultValues: {
      markupPercent: 15,
      subInvoiceAmount: 0,
    },
  });

  const watchedAmount = watch('subInvoiceAmount');
  const watchedMarkup = watch('markupPercent');

  useEffect(() => {
    const amount = Number(watchedAmount);
    const markup = Number(watchedMarkup);
    if (amount > 0 && markup >= 15) {
      setCalc(calculateSubContractorMarkup(amount, markup));
    } else {
      setCalc(null);
    }
  }, [watchedAmount, watchedMarkup]);

  const activeSubContractors = subContractors.filter(
    sc => sc.onboardingStatus === 'COMPLETE'
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Sub-contractor selection */}
      <div className="space-y-2">
        <Label>Sub-Contractor</Label>
        {activeSubContractors.length === 0 ? (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              No onboarded sub-contractors yet. Invite one below or register a new sub-contractor first.
            </AlertDescription>
          </Alert>
        ) : (
          <Controller
            name="subContractorId"
            control={control}
            rules={{ required: inviteMode ? false : 'Select a sub-contractor or use the invite option' }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={inviteMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select registered sub-contractor..." />
                </SelectTrigger>
                <SelectContent>
                  {activeSubContractors.map(sc => (
                    <SelectItem key={sc.id} value={sc.id}>
                      {sc.businessName} — {TRADE_TYPE_LABELS[sc.tradeType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}
        {errors.subContractorId && (
          <p className="text-xs text-red-600">{errors.subContractorId.message}</p>
        )}
        <button
          type="button"
          className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
          onClick={() => setInviteMode(m => !m)}
        >
          {inviteMode ? 'Select existing sub-contractor instead' : 'Invite a new sub-contractor instead'}
        </button>
      </div>

      {/* Invite new mode */}
      {inviteMode && (
        <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
          <p className="text-sm font-medium text-blue-900">Invite New Sub-Contractor</p>
          <div className="space-y-2">
            <Label htmlFor="inviteEmail">Sub-contractor email address</Label>
            <Input
              id="inviteEmail"
              type="email"
              placeholder="contractor@example.com.au"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Trade type required</Label>
            <Select
              value={inviteTradeType}
              onValueChange={v => setInviteTradeType(v as SubContractorTradeType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trade type..." />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(TRADE_TYPE_LABELS) as SubContractorTradeType[]).map(t => (
                  <SelectItem key={t} value={t}>
                    {TRADE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!inviteEmail || !inviteTradeType}
            onClick={() => {
              if (inviteEmail && inviteTradeType) {
                onInviteNew(inviteEmail, inviteTradeType as SubContractorTradeType);
              }
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Onboarding Invite
          </Button>
        </div>
      )}

      {/* Trade type */}
      <div className="space-y-2">
        <Label>Trade Type</Label>
        <Controller
          name="tradeType"
          control={control}
          rules={{ required: 'Select the trade type for this engagement' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select trade type..." />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(TRADE_TYPE_LABELS) as SubContractorTradeType[]).map(t => (
                  <SelectItem key={t} value={t}>
                    {TRADE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.tradeType && (
          <p className="text-xs text-red-600">{errors.tradeType.message}</p>
        )}
      </div>

      {/* Work scope */}
      <div className="space-y-2">
        <Label htmlFor="workScope">Work Scope Description</Label>
        <Textarea
          id="workScope"
          placeholder="Describe the scope of work required..."
          rows={3}
          {...register('workScope', {
            required: 'Describe the work scope',
            minLength: { value: 20, message: 'Provide at least 20 characters of detail' },
          })}
        />
        {errors.workScope && (
          <p className="text-xs text-red-600">{errors.workScope.message}</p>
        )}
      </div>

      {/* Invoice amount + markup */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subInvoiceAmount">Sub-contractor Quote (ex GST)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <Input
              id="subInvoiceAmount"
              type="number"
              min={0}
              step={0.01}
              placeholder="0.00"
              className="pl-7"
              {...register('subInvoiceAmount', {
                required: 'Enter the sub-contractor quote amount',
                min: { value: 1, message: 'Amount must be greater than $0' },
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.subInvoiceAmount && (
            <p className="text-xs text-red-600">{errors.subInvoiceAmount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="markupPercent">
            NRPG Markup %
            <span className="ml-1 text-xs font-normal text-gray-500">(min 15%)</span>
          </Label>
          <div className="relative">
            <Input
              id="markupPercent"
              type="number"
              min={15}
              max={200}
              step={1}
              placeholder="15"
              className="pr-7"
              {...register('markupPercent', {
                required: 'Enter markup percentage',
                min: { value: 15, message: 'Minimum markup is 15%' },
                valueAsNumber: true,
              })}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
          </div>
          {errors.markupPercent && (
            <p className="text-xs text-red-600">{errors.markupPercent.message}</p>
          )}
        </div>
      </div>

      {/* Live calculation */}
      <MarkupCalculatorDisplay calc={calc} />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Engagement'}
      </Button>
    </form>
  );
}

// ─── Sub-contractor Card ───────────────────────────────────────────────────────

interface SubContractorCardProps {
  subContractor: SubContractor;
  engagements: SubContractorEngagement[];
  onAddEngagement: (sc: SubContractor) => void;
}

function SubContractorCard({
  subContractor: sc,
  engagements,
  onAddEngagement,
}: SubContractorCardProps) {
  const statusCfg = ONBOARDING_STATUS_CONFIG[sc.onboardingStatus];
  const activeEngagements = engagements.filter(
    e => e.subContractorId === sc.id && e.status !== 'CANCELLED'
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{sc.businessName}</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {TRADE_TYPE_LABELS[sc.tradeType]} · ABN {sc.abn}
            </CardDescription>
          </div>
          <Badge className={`${statusCfg.colour} text-xs shrink-0`}>
            {statusCfg.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Contact</p>
            <p className="font-medium">{sc.contactName}</p>
            <p className="text-gray-700">{sc.contactEmail}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Licence</p>
            <p className="font-medium">{sc.licenceState} — {sc.licenceNumber}</p>
            <p className="text-gray-700">Expires {formatDate(sc.licenceExpiry)}</p>
          </div>
        </div>

        {activeEngagements.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Engagements</p>
            <div className="space-y-1">
              {activeEngagements.slice(0, 3).map(e => {
                const engCfg = ENGAGEMENT_STATUS_CONFIG[e.status];
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between text-xs bg-gray-50 rounded px-2 py-1"
                  >
                    <span className="text-gray-700 truncate mr-2">
                      Job {e.jobId.slice(-6)}
                    </span>
                    <Badge className={`${engCfg.colour} text-xs`}>{engCfg.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sc.onboardingStatus === 'COMPLETE' && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => onAddEngagement(sc)}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add to Job
          </Button>
        )}
        {sc.onboardingStatus !== 'COMPLETE' && (
          <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
            Onboarding must be completed before engaging on a job.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Engagements Table ─────────────────────────────────────────────────────────

interface EngagementsTableProps {
  engagements: SubContractorEngagement[];
  subContractors: SubContractor[];
}

function EngagementsTable({ engagements, subContractors }: EngagementsTableProps) {
  if (engagements.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No engagements yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Engagements will appear here once a sub-contractor has been added to a job.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sub-Contractor</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Job</TableHead>
            <TableHead className="text-right">Sub Invoice</TableHead>
            <TableHead className="text-right">Customer Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {engagements.map(e => {
            const sc = subContractors.find(s => s.id === e.subContractorId);
            const statusCfg = ENGAGEMENT_STATUS_CONFIG[e.status];
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium">
                  {sc?.businessName ?? e.subContractorId}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {TRADE_TYPE_LABELS[e.tradeType]}
                </TableCell>
                <TableCell className="text-sm font-mono">
                  {e.jobId.slice(-8)}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {formatAud(e.subInvoiceAmount)}
                </TableCell>
                <TableCell className="text-right text-sm font-semibold">
                  {formatAud(e.customerChargeTotalIncGst)}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusCfg.colour} text-xs`}>
                    {statusCfg.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(e.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

interface SubContractorManagerProps {
  /** The primary contractor's ID — passed from the portal session */
  contractorId: string;
}

export default function SubContractorManager({ contractorId }: SubContractorManagerProps) {
  const [subContractors, setSubContractors] = useState<SubContractor[]>([]);
  const [engagements, setEngagements] = useState<SubContractorEngagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog state
  const [showEngagementDialog, setShowEngagementDialog] = useState(false);
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const [selectedSubContractor, setSelectedSubContractor] = useState<SubContractor | null>(null);
  const [inviteEmail, setInviteEmail] = useState<string | undefined>(undefined);
  const [inviteTradeType, setInviteTradeType] = useState<SubContractorTradeType | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [scRes, engRes] = await Promise.all([
        fetch(`/api/contractor/sub-contractors?contractorId=${contractorId}`),
        fetch(`/api/contractor/sub-contractors/engagements?contractorId=${contractorId}`),
      ]);

      if (scRes.ok) {
        const scData = await scRes.json();
        setSubContractors(scData.subContractors ?? []);
      }
      if (engRes.ok) {
        const engData = await engRes.json();
        setEngagements(engData.engagements ?? []);
      }
    } catch {
      setError('Failed to load sub-contractor data. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [contractorId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleAddEngagement = (sc: SubContractor) => {
    setSelectedSubContractor(sc);
    setShowEngagementDialog(true);
  };

  const handleInviteNew = (email: string, tradeType: SubContractorTradeType) => {
    setInviteEmail(email);
    setInviteTradeType(tradeType);
    setShowEngagementDialog(false);
    setShowOnboardingDialog(true);
  };

  const handleEngagementSubmit = async (values: SubContractorEngagementFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contractor/sub-contractors/engagements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          primaryContractorId: contractorId,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? 'Failed to save engagement');
      }

      setShowEngagementDialog(false);
      setSelectedSubContractor(null);
      setSuccessMessage('Engagement saved. It has been added to the job invoice.');
      await loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnboardingComplete = async (data: SubContractorOnboardingFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contractor/sub-contractors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          registeredByContractorId: contractorId,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? 'Failed to register sub-contractor');
      }

      setShowOnboardingDialog(false);
      setInviteEmail(undefined);
      setInviteTradeType(undefined);
      setSuccessMessage('Sub-contractor registered and agreement signed. They are now available for job engagements.');
      await loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register sub-contractor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-3 text-sm text-gray-600">Loading sub-contractors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Sub-Contractors
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Manage licensed trade sub-contractors and their job engagements.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setInviteEmail(undefined);
              setInviteTradeType(undefined);
              setShowOnboardingDialog(true);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Register Sub-Contractor
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedSubContractor(null);
              setShowEngagementDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Engagement
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Info panel — first-time state */}
      {subContractors.length === 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            No sub-contractors registered yet. When a job requires a licensed trade (pest management, plumbing, electrical, gas fitting, asbestos removal, or structural engineering), register the sub-contractor here. Their invoice will be covered under the customer payment with a minimum 15% NRPG administration margin applied.
          </AlertDescription>
        </Alert>
      )}

      {/* Content tabs */}
      <Tabs defaultValue="registered">
        <TabsList>
          <TabsTrigger value="registered">
            Registered ({subContractors.length})
          </TabsTrigger>
          <TabsTrigger value="engagements">
            Engagements ({engagements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registered" className="mt-4">
          {subContractors.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No registered sub-contractors</p>
                <p className="text-gray-500 text-sm mt-1 mb-4">
                  Register a licensed trade sub-contractor to get started.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setInviteEmail(undefined);
                    setInviteTradeType(undefined);
                    setShowOnboardingDialog(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register First Sub-Contractor
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subContractors.map(sc => (
                <SubContractorCard
                  key={sc.id}
                  subContractor={sc}
                  engagements={engagements}
                  onAddEngagement={handleAddEngagement}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="engagements" className="mt-4">
          <EngagementsTable
            engagements={engagements}
            subContractors={subContractors}
          />
        </TabsContent>
      </Tabs>

      {/* Engagement Dialog */}
      <Dialog open={showEngagementDialog} onOpenChange={setShowEngagementDialog}>
        <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Add Sub-Contractor Engagement
            </DialogTitle>
            <DialogDescription>
              Assign a licensed sub-contractor to a job. Their invoice will be included in the customer invoice with a minimum 15% NRPG margin.
            </DialogDescription>
          </DialogHeader>

          {selectedSubContractor && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <span>
                <span className="font-medium">{selectedSubContractor.businessName}</span>
                {' — '}
                {TRADE_TYPE_LABELS[selectedSubContractor.tradeType]}
              </span>
            </div>
          )}

          <EngagementForm
            subContractors={subContractors}
            onSubmit={handleEngagementSubmit}
            onInviteNew={handleInviteNew}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Onboarding Dialog */}
      <Dialog open={showOnboardingDialog} onOpenChange={setShowOnboardingDialog}>
        <DialogContent className="sm:max-w-[640px] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              Register Sub-Contractor
            </DialogTitle>
            <DialogDescription>
              Complete the NRPG sub-contractor agreement and capture licence and insurance details.
            </DialogDescription>
          </DialogHeader>
          <SubContractorOnboarding
            inviteEmail={inviteEmail}
            requiredTradeType={inviteTradeType}
            onComplete={handleOnboardingComplete}
            onCancel={() => {
              setShowOnboardingDialog(false);
              setInviteEmail(undefined);
              setInviteTradeType(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

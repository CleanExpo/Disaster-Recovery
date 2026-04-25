'use client';

// Sub-Contractor Manager — Contractor Portal Tab
// Ref: DR-592 — Licensed trade engagement within NRPG contractor portal
// Decomposed per ADR-009 (L8 — 2026-04-28). See ./subContractorManager/ for
// sub-components.

import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, Briefcase, CheckCircle2, Info, Plus, UserPlus, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SubContractor,
  SubContractorEngagement,
  SubContractorEngagementFormValues,
  SubContractorOnboardingFormValues,
  SubContractorTradeType,
  TRADE_TYPE_LABELS,
} from '@/types/sub-contractor';
import SubContractorOnboarding from './SubContractorOnboarding';
import { EngagementForm } from './subContractorManager/EngagementForm';
import { EngagementsTable } from './subContractorManager/EngagementsTable';
import { SubContractorCard } from './subContractorManager/SubContractorCard';

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
  const [inviteTradeType, setInviteTradeType] = useState<SubContractorTradeType | undefined>(
    undefined,
  );
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
      setSuccessMessage(
        'Sub-contractor registered and agreement signed. They are now available for job engagements.',
      );
      await loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register sub-contractor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contractorId) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Contractor profile not loaded. Please refresh the page or contact support.
        </AlertDescription>
      </Alert>
    );
  }

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
            No sub-contractors registered yet. When a job requires a licensed trade (pest
            management, plumbing, electrical, gas fitting, asbestos removal, or structural
            engineering), register the sub-contractor here. Their invoice will be covered under the
            customer payment with a minimum 15% NRPG administration margin applied.
          </AlertDescription>
        </Alert>
      )}

      {/* Content tabs */}
      <Tabs defaultValue="registered">
        <TabsList>
          <TabsTrigger value="registered">Registered ({subContractors.length})</TabsTrigger>
          <TabsTrigger value="engagements">Engagements ({engagements.length})</TabsTrigger>
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
              {subContractors.map((sc) => (
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
          <EngagementsTable engagements={engagements} subContractors={subContractors} />
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
              Assign a licensed sub-contractor to a job. Their invoice will be included in the
              customer invoice with a minimum 15% NRPG margin.
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

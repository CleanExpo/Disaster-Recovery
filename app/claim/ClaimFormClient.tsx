'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PrivacyCollectionNoticeSection } from './PrivacyCollectionNotice';
import {
  AntigravityNavbar,
  AntigravityFooter,
  AgStepProgress,
  AgFormShell,
} from '@/components/antigravity';
import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';

// Deferred — these components are below-fold or interaction-gated.
// SSR=false on VoiceWidget (loads ElevenLabs script on click) keeps it out of initial HTML.
// DamageMediaCapture (~370 lines + camera/upload UI) is hidden until the media-capture step.
// OfflineBanner / OfflineQueueBanner / UseCurrentLocationButton are conditionally rendered
// and depend on browser APIs (online status, geolocation) — safe to defer.
const DamageMediaCapture = dynamic(() => import('@/components/claim/DamageMediaCapture'), {
  ssr: false,
  loading: () => <div className="h-32 bg-slate-100 rounded-lg animate-pulse" aria-hidden="true" />,
});
const OfflineBanner = dynamic(() => import('@/components/claim/OfflineBanner'), { ssr: false });
const OfflineQueueBanner = dynamic(() => import('@/components/claim/OfflineQueueBanner'), {
  ssr: false,
});
const HeldClaimsPanel = dynamic(() => import('@/components/claim/HeldClaimsPanel'), {
  ssr: false,
});
const UseCurrentLocationButton = dynamic(
  () => import('@/components/claim/UseCurrentLocationButton'),
  { ssr: false },
);
const VoiceWidget = dynamic(
  () => import('@/components/voice/VoiceWidget').then((m) => ({ default: m.VoiceWidget })),
  { ssr: false },
);
import {
  saveDraft,
  loadDraft,
  clearDraft,
  getUnsynced,
  type ClaimDraft,
} from '@/lib/offline-store';
import { mediumTap, heavyTap, isOnline as bridgeIsOnline } from '@/lib/native-bridge';
import { enqueueClaim, replayQueue, isOfflineQueueEnabled } from '@/lib/offline-queue';
import { useSearchParams } from 'next/navigation';
import { CALLOUT_FEE_ACK_LABEL, CALLOUT_FEE_EXPLAINER } from '@/lib/claims/callout-fee-notice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DrPhoneLink } from '@/components/contact/DrPhoneLink';
import { DR_CALL_CLAUSE, DR_PHONE_DISPLAY } from '@/config/contact';
import {
  AlertCircle,
  ClipboardList,
  CheckCircle2,
  Info,
  Phone,
  FileText,
  Shield,
  Clock,
  DollarSign,
  User,
  Home,
  AlertTriangle,
} from 'lucide-react';

// Clear selected/unselected checkbox style
type DraftSlot = 'checking' | 'slow' | 'unreadable' | 'offered' | 'owned' | 'closed';
// After this long the page says the saved-draft lookup is slow. It never opens
// the form on its own: only storage's answer or the homeowner's choice does.
const DRAFT_LOOKUP_LIMIT_MS = 3000;
// After this long a removal still running is described as slow and the
// homeowner is offered a form that does not save on this device. The removal
// itself is never treated as failed or done until storage says so.
const DRAFT_CLEAR_SLOW_MS = 5000;
const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const CHECKBOX_CLASS =
  'h-5 w-5 rounded border-2 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white shrink-0';

// Map cost estimator damage types to claim form damage types
const ESTIMATOR_TO_CLAIM_DAMAGE: Record<string, string> = {
  'water-damage': 'Water/Flood Damage',
  'fire-damage': 'Fire/Smoke Damage',
  'mould-removal': 'Mould Growth',
  'flood-restoration': 'Water/Flood Damage',
  'storm-damage': 'Storm/Wind Damage',
  sewage: 'Sewage Overflow',
  biohazard: 'Biohazard Contamination',
};

const ESTIMATOR_TO_URGENCY: Record<string, string> = {
  emergency: 'emergency',
  urgent: 'urgent',
  scheduled: 'standard',
};

const QUICK_FILL_SCENARIOS: Record<string, Record<string, unknown>> = {
  burstPipe: {
    fullName: 'Alex Taylor',
    phone: '0400123456',
    email: 'alex.taylor@example.com',
    propertyAddress: '25 King Street',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    propertyType: 'house',
    damageTypes: ['Water/Flood Damage'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Burst pipe in kitchen caused water damage to flooring and cabinetry.',
    urgencyLevel: 'emergency',
    hazards: ['Standing water'],
    hasInsurance: true,
    insuranceCompany: 'Suncorp',
    policyNumber: 'POL-123456',
    hasPhotos: true,
  },
  stormDamage: {
    fullName: 'Jordan Lee',
    phone: '0411222333',
    email: 'jordan.lee@example.com',
    propertyAddress: '82 Main Road',
    suburb: 'Newcastle',
    state: 'NSW',
    postcode: '2300',
    propertyType: 'house',
    damageTypes: ['Storm/Wind Damage', 'Structural Damage'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Storm damage to roof and ceiling leaks in living room.',
    urgencyLevel: 'urgent',
    hazards: ['Structural instability'],
    hasInsurance: true,
    insuranceCompany: 'NRMA',
    policyNumber: 'POL-789012',
    hasPhotos: true,
  },
  mouldClaim: {
    fullName: 'Casey Morgan',
    phone: '0422333444',
    email: 'casey.morgan@example.com',
    propertyAddress: '14 River Drive',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    propertyType: 'apartment',
    damageTypes: ['Mould Growth'],
    damageDate: new Date().toISOString().slice(0, 10),
    damageDescription: 'Visible mould growth in bathroom and bedroom walls after long-term leak.',
    urgencyLevel: 'standard',
    hazards: ['Mould growth'],
    hasInsurance: false,
    policyNumber: '',
    hasPhotos: true,
  },
};

function OnlineClaimPageOriginal() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [replayToast, setReplayToast] = useState<string | null>(null);
  const [queuedOffline, setQueuedOffline] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Read cost estimator data from URL params (sync from both useSearchParams and window so client nav is reliable)
  const applyParamsToForm = useCallback((params: URLSearchParams) => {
    const estimateLow = params.get('estimateLow');
    const estimateHigh = params.get('estimateHigh');
    const damageType = params.get('damageType');
    const urgency = params.get('urgency');
    const propertyType = params.get('propertyType');

    if (estimateLow && estimateHigh) {
      setEstimate({ low: Number(estimateLow), high: Number(estimateHigh) });
    }

    const updates: Record<string, unknown> = {};
    if (damageType && ESTIMATOR_TO_CLAIM_DAMAGE[damageType]) {
      updates.damageTypes = [ESTIMATOR_TO_CLAIM_DAMAGE[damageType]];
    }
    if (urgency && ESTIMATOR_TO_URGENCY[urgency]) {
      updates.urgencyLevel = ESTIMATOR_TO_URGENCY[urgency];
    }
    if (propertyType) {
      updates.propertyType = propertyType === 'commercial' ? 'commercial' : 'house';
    }
    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) applyParamsToForm(params);
  }, [applyParamsToForm]);

  useEffect(() => {
    if (!searchParams) return;
    const estimateLow = searchParams.get('estimateLow');
    const estimateHigh = searchParams.get('estimateHigh');
    if (!estimateLow && !estimateHigh && !searchParams.get('damageType')) return;
    applyParamsToForm(searchParams);
  }, [searchParams, applyParamsToForm]);

  const [formData, setFormData] = useState({
    // Client Information
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'phone',

    // Property Information
    propertyAddress: '',
    suburb: '',
    state: '',
    postcode: '',
    propertyType: '',
    accessInstructions: '',

    // Damage Information
    damageTypes: [] as string[],
    damageDate: '',
    damageDescription: '',
    affectedAreas: '',
    urgencyLevel: '',
    hazards: [] as string[],

    // Insurance Information
    hasInsurance: false,
    insuranceCompany: '',
    policyNumber: '',
    insuranceClaimNumber: '',
    excessAmount: '',
    assessorDetails: '',

    // Documentation
    hasPhotos: false,
    uploadedDocuments: [] as string[],

    // Authorisations
    authorizePropertyAccess: false,
    authorizeInsuranceLiaison: false,
    authorizeWorkCommencement: false,

    // Payment
    paymentMethod: 'card',
    paymentConfirmed: false,
    paymentAmount: 0,

    // Terms
    understandPlatformRole: false,
    acceptContractorCommunication: false,
    agreeToTerms: false,

    // Privacy — APP 5 collection notice acknowledgement
    privacyCollectionNotice: false,

    // Contractor call-out fee acknowledgement (required, step 4)
    calloutFeeAcknowledged: false,
  });

  // Captured photo/video File objects — kept separate from formData because
  // File objects are not JSON-serialisable. These are included in the
  // submission summary shown to the user; file hosting is handled server-side.
  const [capturedPhotos, setCapturedPhotos] = useState<File[]>([]);

  // ── Offline persistence ──────────────────────────────────────────────────
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [savedLocally, setSavedLocally] = useState<boolean>(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Draft slot state machine (DR-966, docs/plans/2026-11-02-saved-claim-lifecycle.md):
  //   checking → offered | owned | slow;  slow → offered | owned;
  //   offered → owned;  owned → closed.
  // The form is only shown, and autosave only writes, while the slot is owned.
  // The slot only becomes owned with no lookup answer by the homeowner's own
  // "Start a new claim" choice, so a draft they did not discard is never replaced.
  // Claims held in the offline queue are handled by HeldClaimsPanel; the form
  // never reads or writes them.
  const [slot, setSlotState] = useState<DraftSlot>('checking');
  const slotRef = useRef<DraftSlot>('checking');
  const offeredDraftRef = useRef<ClaimDraft | null>(null);
  const [offeredSavedAt, setOfferedSavedAt] = useState<number | null>(null);
  // "Start a new claim" removes the saved claim first; the form opens only once
  // that removal has committed, so the page never says it is gone when it is not.
  // While a removal is running, Resume is off, so a late removal can never
  // delete a claim the homeowner has just resumed.
  const [clearing, setClearing] = useState<'idle' | 'clearing' | 'failed'>('idle');
  const [clearSlow, setClearSlow] = useState(false);
  const clearingRef = useRef(false);
  // False only when the homeowner chose to continue without saving on this
  // device, after a removal failed or stalled. Autosave then writes nothing.
  const [saveOnDevice, setSaveOnDevice] = useState(true);
  const saveOnDeviceRef = useRef(true);
  const lookupRef = useRef(0);
  // Form and step when the slot became owned. Autosave writes only after a change
  // from this, so an untouched visit never creates or overwrites a draft.
  const baselineRef = useRef<{ formData: unknown; step: number } | null>(null);
  const latestRef = useRef<{ formData: unknown; step: number }>({ formData, step });
  latestRef.current = { formData, step };

  const setSlot = useCallback((next: DraftSlot) => {
    slotRef.current = next;
    setSlotState(next);
  }, []);

  const isPristine = useCallback(() => {
    const baseline = baselineRef.current;
    return (
      baseline !== null &&
      baseline.formData === latestRef.current.formData &&
      baseline.step === latestRef.current.step
    );
  }, []);

  const takeOwnership = useCallback(() => {
    baselineRef.current = { ...latestRef.current };
    setSlot('owned');
  }, [setSlot]);

  const offerDraft = useCallback(
    (draft: ClaimDraft) => {
      offeredDraftRef.current = draft;
      setOfferedSavedAt(draft.savedAt);
      setSlot('offered');
    },
    [setSlot],
  );

  // Look up the saved draft. A failed read is not "no draft": the page says it
  // could not check, and the form stays closed until the homeowner chooses.
  const lookUpDraft = useCallback(() => {
    const lookup = ++lookupRef.current;
    setSlot('checking');
    // Taking too long: say so and offer an explicit way on. Never open the
    // form on our own while a saved draft might still be there.
    const limit = window.setTimeout(() => {
      if (lookup === lookupRef.current && slotRef.current === 'checking') setSlot('slow');
    }, DRAFT_LOOKUP_LIMIT_MS);
    // Only an answer to the latest lookup, arriving before the homeowner has
    // chosen, is acted on.
    const waiting = () =>
      lookup === lookupRef.current &&
      (slotRef.current === 'checking' || slotRef.current === 'slow');
    loadDraft().then(
      (draft) => {
        window.clearTimeout(limit);
        if (!waiting()) return;
        const fresh = draft && Date.now() - draft.savedAt < DRAFT_MAX_AGE_MS ? draft : null;
        if (fresh) offerDraft(fresh);
        else takeOwnership();
      },
      () => {
        window.clearTimeout(limit);
        if (waiting()) setSlot('unreadable');
      },
    );
    return () => window.clearTimeout(limit);
  }, [offerDraft, setSlot, takeOwnership]);

  // Look up the saved draft once, on mount
  useEffect(() => {
    const stopLookup = lookUpDraft();
    setIsOffline(typeof navigator !== 'undefined' ? !navigator.onLine : false);
    // Once-on-mount replay: if the app was killed mid-queue last session, drain now.
    if (isOfflineQueueEnabled() && typeof navigator !== 'undefined' && navigator.onLine) {
      replayQueue()
        .then((result) => {
          if (result.successes > 0) {
            setReplayToast('Claim sent — queued offline earlier.');
            window.setTimeout(() => setReplayToast(null), 6000);
          }
        })
        .catch(() => {
          /* ignore — banner surfaces any residual items */
        });
    }
    return stopLookup;
    // Mount-only: the lookup runs once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Demo autofill — development only (mirrors contractor apply ?demo=auto).
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (!searchParams || searchParams.get('demo') !== 'auto') return;
    const demo = QUICK_FILL_SCENARIOS.burstPipe;
    if (!demo) return;
    setFormData((prev) => ({ ...prev, ...demo }));
    setReplayToast('Demo autofill applied (development only).');
    window.setTimeout(() => setReplayToast(null), 5000);
  }, [searchParams]);

  // Noscript / submit-basic failure redirect
  useEffect(() => {
    if (!searchParams) return;
    if (searchParams.get('error') === 'submit_failed') {
      setSubmissionError(
        `We could not submit your claim. Please complete the form again${DR_CALL_CLAUSE}.`,
      );
    }
  }, [searchParams]);

  // Online/offline event listeners
  useEffect(() => {
    const handleOnline = async () => {
      setIsOffline(false);
      // Attempt to mark unsynced drafts — actual API sync is beyond client scope
      const unsynced = await getUnsynced();
      if (unsynced.length > 0) {
        // Drafts exist; they will be submitted when the user completes the form
        setSavedLocally(true);
      }
      // Replay any queued offline claim submissions. Flag-gated internally.
      if (isOfflineQueueEnabled()) {
        try {
          const result = await replayQueue();
          if (result.successes > 0) {
            setReplayToast('Claim sent — queued offline earlier.');
            window.setTimeout(() => setReplayToast(null), 6000);
          }
        } catch {
          /* swallow — banner will show any stuck items */
        }
      }
    };
    const handleOffline = () => {
      setIsOffline(true);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Debounced auto-save on formData / step change — only while the slot is
  // owned and only after the homeowner has changed something.
  useEffect(() => {
    if (slot !== 'owned' || !saveOnDevice || isPristine()) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (slotRef.current !== 'owned') return;
      // Exclude non-serialisable fields (File[]) — use keys from formData directly
      saveDraft({
        id: 'current',
        formData: formData as Record<string, unknown>,
        step,
        savedAt: Date.now(),
        synced: false,
      })
        .then(() => {
          if (isOffline) setSavedLocally(true);
        })
        .catch(() => {
          // Silently ignore save errors
        });
    }, 500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, step, slot, saveOnDevice]);

  // Resume uses the draft read at page load, so no second read can race it.
  const resumeDraft = () => {
    const draft = offeredDraftRef.current;
    offeredDraftRef.current = null;
    setOfferedSavedAt(null);
    if (draft) {
      setFormData((prev) => ({ ...prev, ...draft.formData }));
      setStep(draft.step);
    }
    // No baseline: the resumed claim is saved back so the slot stays current.
    baselineRef.current = null;
    setSlot('owned');
  };

  const choosing = () =>
    slotRef.current === 'offered' || slotRef.current === 'slow' || slotRef.current === 'unreadable';

  // The homeowner's explicit choice is the only way a waiting draft is deleted.
  // The form opens only when storage confirms the removal.
  const startNewClaim = async () => {
    if (clearingRef.current) return;
    clearingRef.current = true;
    setClearing('clearing');
    setClearSlow(false);
    const slowTimer = window.setTimeout(() => setClearSlow(true), DRAFT_CLEAR_SLOW_MS);
    const removed = await clearDraft().then(
      () => true,
      () => false,
    );
    window.clearTimeout(slowTimer);
    clearingRef.current = false;
    setClearSlow(false);
    if (!choosing()) return;
    if (!removed) {
      // Keep the choice on screen; nothing has been deleted or replaced.
      setClearing('failed');
      return;
    }
    setClearing('idle');
    offeredDraftRef.current = null;
    setOfferedSavedAt(null);
    takeOwnership();
  };

  // Storage would not confirm the removal. The homeowner may still lodge a
  // claim, but nothing is written on this device, so no saved claim is replaced.
  const continueWithoutSaving = () => {
    if (!choosing()) return;
    saveOnDeviceRef.current = false;
    setSaveOnDevice(false);
    offeredDraftRef.current = null;
    setOfferedSavedAt(null);
    takeOwnership();
  };

  const stuck = clearing === 'failed' || (clearing === 'clearing' && clearSlow);

  // Terminal: the claim was accepted or queued. Stop autosave before clearing,
  // so the sent claim can never be written back as a draft.
  const closeSlot = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSlot('closed');
    // A form opened with "Continue without saving" never wrote the slot, and
    // the saved claim there is not this one: leave it for the homeowner.
    if (!saveOnDeviceRef.current) return;
    // Best-effort: the claim has gone. If this fails, the next visit offers the
    // draft and the homeowner chooses (plan doc, draft-slot failures).
    void clearDraft().catch(() => undefined);
  };

  const formatDraftTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
  };
  // ────────────────────────────────────────────────────────────────────────

  const step1Complete = Boolean(
    formData.fullName?.trim() &&
    formData.phone?.trim() &&
    formData.email?.trim() &&
    formData.propertyAddress?.trim() &&
    formData.suburb?.trim() &&
    formData.state?.trim() &&
    formData.postcode?.trim() &&
    formData.propertyType &&
    formData.damageDescription?.trim() &&
    formData.damageTypes.length > 0 &&
    formData.urgencyLevel,
  );

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.propertyAddress ||
      !formData.suburb ||
      !formData.state ||
      !formData.postcode ||
      !formData.damageDescription ||
      formData.damageTypes.length === 0 ||
      !formData.urgencyLevel
    ) {
      setSubmissionError(
        "We're nearly there — a few contact and damage details are still needed. Taking you back to step 1 so you can finish.",
      );
      setStep(1);
      return;
    }

    if (
      !formData.understandPlatformRole ||
      !formData.acceptContractorCommunication ||
      !formData.agreeToTerms ||
      !formData.privacyCollectionNotice
    ) {
      setSubmissionError(
        'One last tick — please confirm the privacy notice and agreements above so we can submit your claim.',
      );
      return;
    }

    if (!formData.calloutFeeAcknowledged) {
      setSubmissionError(
        'Please tick the box to confirm you understand the contractor will quote a call-out fee that you pay to them.',
      );
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);

    // Offline-first: if the iOS native-bridge flag is on AND we detect
    // the device is offline, queue the submission for later replay
    // instead of posting. RA-1633 Phase 2 PR #5.
    if (isOfflineQueueEnabled()) {
      const online = await bridgeIsOnline();
      if (!online) {
        const enq = await enqueueClaim({
          ...formData,
          paymentConfirmed: false,
          paymentAmount: 0,
        });
        setSubmitting(false);
        if (enq.ok) {
          closeSlot();
          setQueuedOffline(true);
          return;
        }
        // Enqueue failed — fall through to the normal online path as a
        // last resort (may still fail, but we surface a real error).
      }
    }

    try {
      const response = await fetch('/api/claims/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          propertyAddress: formData.propertyAddress,
          suburb: formData.suburb,
          state: formData.state,
          postcode: formData.postcode,
          damageTypes: formData.damageTypes,
          damageDescription: formData.damageDescription,
          urgencyLevel: formData.urgencyLevel || 'standard',
          policyNumber: formData.policyNumber || undefined,
          insuranceCompany: formData.insuranceCompany || undefined,
          insuranceClaimNumber: formData.insuranceClaimNumber || undefined,
          accessInstructions: formData.accessInstructions || undefined,
          paymentConfirmed: false,
          calloutFeeAcknowledged: formData.calloutFeeAcknowledged,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        closeSlot();
        setClaimId(result.claimId);
        // Phase 2 PR #6 — Medium haptic on submit success (RA-1633). No-op on web.
        void mediumTap();
        setStep(5); // Success step
      } else if (response.status === 503 || result.code === 'CLAIM_PERSISTENCE_FAILED') {
        setSubmissionError(
          result.error ||
            `We could not save your claim right now. Please try again shortly${DR_CALL_CLAUSE}.`,
        );
      } else if (response.status === 400) {
        setSubmissionError(
          result.error ||
            'Some details look incomplete or invalid. Please check the form and try again.',
        );
        setStep(1);
      } else if (response.status === 429) {
        setSubmissionError('Too many submissions. Please wait a moment and try again.');
      } else {
        setSubmissionError(result.error || result.message || 'Failed to submit claim');
      }
    } catch {
      setSubmissionError('Error submitting claim. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const applyQuickFill = () => {
    if (!selectedScenario || !QUICK_FILL_SCENARIOS[selectedScenario]) return;
    setFormData((prev) => ({ ...prev, ...QUICK_FILL_SCENARIOS[selectedScenario] }));
  };

  const damageTypeOptions = [
    'Water/Flood Damage',
    'Fire/Smoke Damage',
    'Storm/Wind Damage',
    'Mould Growth',
    'Sewage Overflow',
    'Structural Damage',
    'Asbestos Exposure',
    'Biohazard Contamination',
  ];

  const hazardOptions = [
    'Electrical hazards',
    'Structural instability',
    'Asbestos present',
    'Sewage contamination',
    'Mould growth',
    'Chemical exposure',
    'Standing water',
    'Gas leak',
  ];

  const CLAIM_STEPS = [
    { id: 1, label: 'Property & damage' },
    { id: 2, label: 'Insurance' },
    { id: 3, label: 'Authorisations' },
    { id: 4, label: 'Review' },
  ];

  const showQuickFill = process.env.NODE_ENV !== 'production';

  if (queuedOffline) {
    return (
      <div className="ag-page-elevated">
        <div className="ag-container py-12 max-w-2xl mx-auto px-4">
          <AgFormShell title="Claim saved on this device">
            <Alert role="status" className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                You&rsquo;re offline, so your claim is saved on this device. We&rsquo;ll send it
                automatically as soon as you&rsquo;re back online. Keep this app installed until
                then. If it&rsquo;s urgent, call 1300 309 361.
              </AlertDescription>
            </Alert>
            {replayToast && (
              <p role="status" aria-live="polite" className="mt-4 text-sm text-emerald-900">
                {replayToast}
              </p>
            )}
          </AgFormShell>
        </div>
      </div>
    );
  }
  if (step === 5 && claimId) {
    return (
      <div className="ag-page-elevated">
        <AntigravityNavbar />
        <div className="ag-container py-12 max-w-2xl mx-auto px-4">
          <AgFormShell title="Claim submitted successfully" subtitle={`Your claim ID: ${claimId}`}>
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-600" aria-hidden="true" />
              </div>
              <Alert className="bg-emerald-50 border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-900">
                  Your claim has been received and is being matched with an IICRC-certified NRPG
                  contractor.
                </AlertDescription>
              </Alert>

              <div className="rounded-xl border border-[var(--ag-border-grey)] bg-[var(--ag-background-light)] p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-[var(--ag-primary-blue)]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                  What happens next
                </h3>
                <ol className="space-y-2 text-sm text-[var(--ag-text-dark)]">
                  <li>1. Your claim is matched with a certified NRPG contractor</li>
                  <li>2. That contractor reviews your claim and contacts you directly</li>
                  <li>3. They schedule an inspection at your convenience</li>
                  <li>4. The contractor handles restoration work and bills you directly</li>
                  <li>5. Ongoing communication is with your contractor, not Disaster Recovery</li>
                </ol>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Disaster Recovery is a network orchestrator. We
                  connect you with certified contractors — we do not perform restoration work or
                  invoice you for it.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  onClick={() => (window.location.href = `/track/${claimId}`)}
                  className="ag-btn-primary-navy hover:opacity-90"
                >
                  Track your claim
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return home</Link>
                </Button>
              </div>
            </div>
          </AgFormShell>
        </div>
        <AntigravityFooter />
      </div>
    );
  }

  return (
    <div className="ag-page-elevated py-6 sm:py-10">
      <div className="ag-container mx-auto px-4 max-w-4xl">
        {/* DR-542 — Life-safety carve-out. ALWAYS first. A user with flood
            entering the home or a roof torn off needs 000 before anything else. */}
        <div role="alert" className="mb-4 rounded-lg border-2 border-red-600 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-900 mb-2">In immediate life-safety danger?</p>
          <a
            href="tel:000"
            onClick={() => {
              void heavyTap();
            }}
            className="inline-flex items-center justify-center min-h-[48px] w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label="Call 000 emergency services now"
          >
            Dial 000 now
          </a>
          <p className="mt-2 text-xs text-red-900 leading-relaxed">
            Fire, rising floodwater, structural collapse, gas leak, injury, or exposed live wiring —
            call 000 first. You can lodge the claim after you are safe.
          </p>
        </div>

        {/* DR-542 — Prefer-to-call fallback. Voice option for users who can't
            complete a multi-step form one-handed on a mobile in active distress. */}
        {DR_PHONE_DISPLAY && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-900">Prefer to talk to a person?</p>
              <p className="text-xs text-blue-800">
                Our 24/7 intake line will take your claim over the phone. A contractor will call you
                back shortly after.
              </p>
            </div>
            <DrPhoneLink className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap" />
          </div>
        )}

        {/* Who First trust signal — GAP-073 */}
        <div className="mb-6 bg-blue-900 text-white rounded-xl px-6 py-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-200" />
          </div>
          <p className="font-semibold text-base md:text-lg">
            <strong className="text-white">Work for you, not your insurer.</strong>{' '}
            <span className="text-blue-200 font-normal">
              NRPG coordinates independent assessment and restoration — you keep control of your
              claim.
            </span>
          </p>
        </div>

        {/* DR-542 — Early reassurance. Users need to see the response-time
            commitment BEFORE they invest effort in a multi-step form. */}
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center gap-3">
          <Clock className="h-5 w-5 text-emerald-700 flex-shrink-0" />
          <p className="text-sm text-emerald-900">
            <strong>A certified contractor will call you back within 60 minutes</strong> of
            submission, 24/7. Your progress is saved to this device as you type.
          </p>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-[var(--ag-primary-blue)]">
              Lodge your claim
            </h1>
            <p className="text-sm text-[var(--ag-text-grey)]">
              Matched with an IICRC-certified contractor. They bill you directly for restoration
              work — Disaster Recovery does not invoice you.
            </p>
          </div>
          {showQuickFill && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:max-w-sm w-full">
              <Label className="text-xs font-semibold text-green-900">Quick fill (dev only)</Label>
              <div className="mt-2 flex gap-2">
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger className="bg-white" aria-label="Quick fill scenario">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="burstPipe">Burst Pipe (Emergency)</SelectItem>
                    <SelectItem value="stormDamage">Storm Damage (Urgent)</SelectItem>
                    <SelectItem value="mouldClaim">Mould Claim (Standard)</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={applyQuickFill}
                  className="bg-green-700 hover:bg-green-800"
                >
                  Fill
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Offline banner */}
        <OfflineBanner isOffline={isOffline} savedLocally={savedLocally} />

        {/* Offline queue status — only renders when queue/dead-letter > 0. */}
        <OfflineQueueBanner />

        {/* Claims queued offline before the call-out fee tick existed (DR-966). */}
        <HeldClaimsPanel />

        {/* Transient toast — queue replayed / item queued. */}
        {replayToast && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm text-emerald-900"
          >
            {replayToast}
          </div>
        )}

        {/* Saved locally indicator (when offline) */}
        {isOffline && savedLocally && (
          <div className="mb-4 px-3 py-2 bg-amber-100 border border-amber-300 rounded-md text-xs text-amber-800 flex items-center gap-2">
            <span className="font-semibold">Saved locally</span> — your progress is stored on this
            device.
          </div>
        )}

        {submissionError && (
          // DR-542 — calm, action-first tone. Amber signals "needs a touch-up",
          // not "you failed". Users in distress don't need punitive red boxes.
          <Alert className="mb-6 border-amber-300 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-700" />
            <AlertDescription className="text-amber-900">{submissionError}</AlertDescription>
          </Alert>
        )}

        {/* Cost Estimate Banner (shown when arriving from cost estimator) */}
        {estimate && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900">
                  Your estimated restoration cost: ${estimate.low.toLocaleString()} – $
                  {estimate.high.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  Your assigned IICRC-certified contractor will give you a firm Scope of Works
                  on-site and bill you directly.
                </p>
              </div>
            </div>
          </div>
        )}

        {(slot === 'slow' || slot === 'unreadable' || slot === 'offered') && stuck && (
          <section
            aria-label="Saved claim not removed"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-5"
          >
            <p role="alert" className="text-sm text-red-700">
              {clearing === 'failed'
                ? 'We couldn\u2019t remove the saved claim from this device, so a new claim hasn\u2019t been started.'
                : 'Removing the saved claim from this device is taking longer than usual.'}{' '}
              You can try again, call 1300 309 361, or continue without saving on this device. If
              you continue, your new claim is not kept if you close this page before sending it.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={continueWithoutSaving}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Continue without saving on this device
              </button>
            </div>
          </section>
        )}

        {slot === 'unreadable' && (
          <section
            aria-label="Could not check for a saved claim"
            className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5"
          >
            <p role="status" className="text-sm text-amber-900">
              We couldn&rsquo;t check this device for a claim you saved earlier. You can try again,
              or start a new claim. If you saved a claim on this device before, starting a new one
              replaces it. If it&rsquo;s urgent, call 1300 309 361.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => lookUpDraft()}
                disabled={clearing === 'clearing'}
                className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={startNewClaim}
                disabled={clearing === 'clearing'}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Start a new claim
              </button>
            </div>
          </section>
        )}

        {slot === 'slow' && (
          <section
            aria-label="Still checking for a saved claim"
            className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5"
          >
            <p role="status" className="text-sm text-amber-900">
              Checking this device for a claim you saved earlier is taking longer than usual. You
              can keep waiting, or start a new claim now. If you saved a claim on this device
              before, starting a new one replaces it. If it&rsquo;s urgent, call 1300 309 361.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={startNewClaim}
                disabled={clearing === 'clearing'}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Start a new claim
              </button>
            </div>
          </section>
        )}

        {slot === 'checking' && (
          <p role="status" className="mb-8 text-sm text-[var(--ag-text-grey)]">
            Checking this device for a claim you saved earlier&hellip;
          </p>
        )}

        {slot === 'offered' && (
          <section
            aria-label="Saved claim found"
            className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5"
          >
            <p className="text-sm text-blue-900">
              You have a claim saved on this device from{' '}
              <strong>{offeredSavedAt !== null ? formatDraftTime(offeredSavedAt) : ''}</strong> that
              has not been sent. Would you like to continue it?
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={resumeDraft}
                disabled={clearing === 'clearing'}
                className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={startNewClaim}
                disabled={clearing === 'clearing'}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Start a new claim
              </button>
            </div>
            <p className="mt-3 text-xs text-blue-900">
              Starting a new claim deletes the saved one from this device.
            </p>
          </section>
        )}

        {slot === 'owned' && (
          <>
            {!saveOnDevice && (
              <p role="status" className="mb-6 text-sm text-amber-900">
                This claim isn&rsquo;t being saved on this device. Please send it before you close
                this page.
              </p>
            )}
            <AgStepProgress steps={CLAIM_STEPS} current={step} className="mb-8" />

            {/* Platform Role Disclaimer — Path A */}
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                <strong>Important:</strong> Disaster Recovery connects you with certified NRPG
                contractors who handle all work, communication, and service delivery. Your
                contractor bills you directly — Disaster Recovery does not hold client funds or
                invoice for restoration.
              </AlertDescription>
            </Alert>

            <AgFormShell
              title={
                step === 1
                  ? 'Property & damage information'
                  : step === 2
                    ? 'Insurance & documentation'
                    : step === 3
                      ? 'Authorisations & terms'
                      : 'Final review & submit'
              }
            >
              {/* Step 1: Property & Damage */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="claim-fullName">Full Name *</Label>
                        <Input
                          id="claim-fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="claim-phone">Phone Number *</Label>
                        <Input
                          id="claim-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="claim-email">Email Address *</Label>
                        <Input
                          id="claim-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="!bg-white !border-gray-300 !text-gray-900 placeholder:!text-gray-500"
                          required
                          style={{
                            backgroundColor: 'white',
                            borderColor: '#e2e8f0',
                            color: '#1f2937',
                          }}
                        />
                      </div>
                      <div>
                        <Label>Preferred Contact Method</Label>
                        <Select
                          value={formData.preferredContact}
                          onValueChange={(value) =>
                            setFormData({ ...formData, preferredContact: value })
                          }
                        >
                          <SelectTrigger aria-label="Preferred contact method">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Property Information
                    </h3>
                    <UseCurrentLocationButton
                      onAutofill={(fields) =>
                        setFormData((prev) => ({
                          ...prev,
                          propertyAddress: fields.address || prev.propertyAddress,
                          suburb: fields.suburb || prev.suburb,
                          state: fields.state || prev.state,
                          postcode: fields.postcode || prev.postcode,
                        }))
                      }
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="claim-propertyAddress">Property Address *</Label>
                        <Input
                          id="claim-propertyAddress"
                          value={formData.propertyAddress}
                          onChange={(e) =>
                            setFormData({ ...formData, propertyAddress: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="claim-suburb">Suburb *</Label>
                        <Input
                          id="claim-suburb"
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label>State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger aria-label="State">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NSW">NSW</SelectItem>
                            <SelectItem value="VIC">VIC</SelectItem>
                            <SelectItem value="QLD">QLD</SelectItem>
                            <SelectItem value="SA">SA</SelectItem>
                            <SelectItem value="WA">WA</SelectItem>
                            <SelectItem value="TAS">TAS</SelectItem>
                            <SelectItem value="NT">NT</SelectItem>
                            <SelectItem value="ACT">ACT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="claim-postcode">Postcode *</Label>
                        <Input
                          id="claim-postcode"
                          value={formData.postcode}
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                          maxLength={4}
                          required
                        />
                      </div>
                      <div>
                        <Label>Property Type *</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, propertyType: value })
                          }
                        >
                          <SelectTrigger aria-label="Property type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="claim-accessInstructions">
                        Access Instructions (gate codes, etc.)
                      </Label>
                      <Textarea
                        id="claim-accessInstructions"
                        value={formData.accessInstructions}
                        onChange={(e) =>
                          setFormData({ ...formData, accessInstructions: e.target.value })
                        }
                        placeholder="Any special instructions for accessing the property..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Damage Information
                    </h3>
                    <div>
                      <Label>Type of Damage (select all that apply) *</Label>
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        {damageTypeOptions.map((type) => (
                          <div key={type} className="flex items-center gap-3 py-1">
                            <Checkbox
                              id={`damage-${type}`}
                              className={CHECKBOX_CLASS}
                              checked={formData.damageTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    damageTypes: [...formData.damageTypes, type],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    damageTypes: formData.damageTypes.filter((t) => t !== type),
                                  });
                                }
                              }}
                            />
                            <Label
                              htmlFor={`damage-${type}`}
                              className="font-normal cursor-pointer"
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="claim-damageDate">
                          Date Damage Occurred
                          <span className="text-xs text-gray-500 font-normal ms-1">
                            (approximate is fine)
                          </span>
                        </Label>
                        <Input
                          id="claim-damageDate"
                          type="date"
                          value={formData.damageDate}
                          onChange={(e) => setFormData({ ...formData, damageDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Urgency Level *</Label>
                        <Select
                          value={formData.urgencyLevel}
                          onValueChange={(value) =>
                            setFormData({ ...formData, urgencyLevel: value })
                          }
                        >
                          <SelectTrigger aria-label="Urgency level">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                            <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
                            <SelectItem value="standard">Standard - Within 48 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="claim-damageDescription">Describe the Damage *</Label>
                      <Textarea
                        id="claim-damageDescription"
                        value={formData.damageDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, damageDescription: e.target.value })
                        }
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <Label>Safety Hazards Present</Label>
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        {hazardOptions.map((hazard) => (
                          <div key={hazard} className="flex items-center gap-3 py-1">
                            <Checkbox
                              id={`hazard-${hazard}`}
                              className={CHECKBOX_CLASS}
                              checked={formData.hazards.includes(hazard)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    hazards: [...formData.hazards, hazard],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    hazards: formData.hazards.filter((h) => h !== hazard),
                                  });
                                }
                              }}
                            />
                            <Label
                              htmlFor={`hazard-${hazard}`}
                              className="font-normal cursor-pointer"
                            >
                              {hazard}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!step1Complete}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Insurance & Documentation */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Insurance Information
                    </h3>
                    <div className="flex items-center gap-3 py-1">
                      <Checkbox
                        id="hasInsurance"
                        className={CHECKBOX_CLASS}
                        checked={formData.hasInsurance}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, hasInsurance: checked as boolean })
                        }
                      />
                      <Label htmlFor="hasInsurance" className="cursor-pointer">
                        I have insurance coverage for this damage
                      </Label>
                    </div>
                    {formData.hasInsurance && (
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="claim-insuranceCompany">Insurance Company</Label>
                          <Input
                            id="claim-insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={(e) =>
                              setFormData({ ...formData, insuranceCompany: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="claim-policyNumber">Policy Number</Label>
                          <Input
                            id="claim-policyNumber"
                            value={formData.policyNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, policyNumber: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="claim-insuranceClaimNumber">Insurance Claim Number</Label>
                          <Input
                            id="claim-insuranceClaimNumber"
                            value={formData.insuranceClaimNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, insuranceClaimNumber: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="claim-excessAmount">Excess Amount</Label>
                          <Input
                            id="claim-excessAmount"
                            type="number"
                            value={formData.excessAmount}
                            onChange={(e) =>
                              setFormData({ ...formData, excessAmount: e.target.value })
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="claim-assessorDetails">
                            Assessor Details (if applicable)
                          </Label>
                          <Textarea
                            id="claim-assessorDetails"
                            value={formData.assessorDetails}
                            onChange={(e) =>
                              setFormData({ ...formData, assessorDetails: e.target.value })
                            }
                            placeholder="Name, contact, appointment time..."
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documentation
                    </h3>

                    {/* Camera / media capture */}
                    <DamageMediaCapture
                      label="Damage Photos & Videos"
                      description="Optionally capture photos or short videos for your own records. They stay on this device for now — your matched contractor will collect evidence when they contact you."
                      maxFiles={10}
                      onChange={(files) => {
                        setCapturedPhotos(files);
                        setFormData((prev) => ({
                          ...prev,
                          hasPhotos: files.length > 0,
                        }));
                      }}
                    />

                    {capturedPhotos.length === 0 && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Photos are optional at this stage. Your assigned contractor will also
                          request documentation directly when they contact you.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="w-full sm:w-auto min-h-[44px] bg-blue-600 hover:bg-blue-700"
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Authorisations & Terms */}
              {step === 3 && (
                <div className="space-y-6">
                  <Alert className="bg-orange-50 border-orange-200">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Platform Role:</strong> Disaster Recovery connects you with
                      contractors. The contractor handles ALL work, communication, and service
                      delivery.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Work Authorisations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="authorizePropertyAccess"
                          className={CHECKBOX_CLASS}
                          checked={formData.authorizePropertyAccess}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              authorizePropertyAccess: checked as boolean,
                            })
                          }
                        />
                        <Label
                          htmlFor="authorizePropertyAccess"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I authorise the assigned contractor to access my property for inspection
                          and make-safe works
                        </Label>
                      </div>
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="authorizeInsuranceLiaison"
                          className={CHECKBOX_CLASS}
                          checked={formData.authorizeInsuranceLiaison}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              authorizeInsuranceLiaison: checked as boolean,
                            })
                          }
                        />
                        <Label
                          htmlFor="authorizeInsuranceLiaison"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I authorise the contractor to liaise with my insurance company on my
                          behalf
                        </Label>
                      </div>
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="authorizeWorkCommencement"
                          className={CHECKBOX_CLASS}
                          checked={formData.authorizeWorkCommencement}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              authorizeWorkCommencement: checked as boolean,
                            })
                          }
                        />
                        <Label
                          htmlFor="authorizeWorkCommencement"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I authorise the contractor to commence emergency make-safe works as
                          required
                        </Label>
                      </div>
                    </div>
                  </div>

                  <PrivacyCollectionNoticeSection
                    checked={formData.privacyCollectionNotice}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, privacyCollectionNotice: checked })
                    }
                  />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Understanding & Agreement</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="understandPlatformRole"
                          className={CHECKBOX_CLASS}
                          checked={formData.understandPlatformRole}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, understandPlatformRole: checked as boolean })
                          }
                          required
                        />
                        <Label
                          htmlFor="understandPlatformRole"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I understand that Disaster Recovery is a network orchestrator that
                          connects me with certified NRPG contractors. My matched contractor will
                          quote and bill me directly for restoration work — Disaster Recovery does
                          not hold client funds or invoice me for that work.
                        </Label>
                      </div>
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="acceptContractorCommunication"
                          className={CHECKBOX_CLASS}
                          checked={formData.acceptContractorCommunication}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              acceptContractorCommunication: checked as boolean,
                            })
                          }
                          required
                        />
                        <Label
                          htmlFor="acceptContractorCommunication"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I understand that all communication regarding work, scheduling, and claims
                          will be directly with the assigned contractor, not Disaster Recovery.
                        </Label>
                      </div>
                      <div className="flex items-start gap-3 py-1">
                        <Checkbox
                          id="agreeToTerms"
                          className={CHECKBOX_CLASS}
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, agreeToTerms: checked as boolean })
                          }
                          required
                        />
                        <Label
                          htmlFor="agreeToTerms"
                          className="font-normal cursor-pointer leading-snug"
                        >
                          I agree to the terms of service and understand that contractors follow
                          NRPG standards and guidelines but are independent service providers.
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Contractor Responsibilities:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li className="font-bold text-blue-700">
                        • Initial phone contact once a certified contractor is confirmed for your
                        area
                      </li>
                      <li>• Schedule and conduct property inspection</li>
                      <li>• Perform emergency make-safe works</li>
                      <li>• Document all damage thoroughly</li>
                      <li>• Assist you in liaising with your insurance carrier</li>
                      <li>• Coordinate all re-attendances and additional work</li>
                      <li>• Provide complete claim documentation</li>
                    </ul>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="w-full sm:w-auto min-h-[44px] bg-blue-600 hover:bg-blue-700"
                      disabled={
                        !formData.privacyCollectionNotice ||
                        !formData.understandPlatformRole ||
                        !formData.acceptContractorCommunication ||
                        !formData.agreeToTerms
                      }
                    >
                      Proceed to Final Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Final Review */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* What happens next — homeowners pay nothing to DR. The NRPG */}
                  {/* contractor sets and collects their own call-out fee. */}
                  <div
                    className="mb-8 rounded-xl border p-6"
                    style={{
                      background: 'color-mix(in srgb, var(--ag-primary-blue) 5%, white)',
                      borderColor: 'color-mix(in srgb, var(--ag-primary-blue) 18%, white)',
                    }}
                  >
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--ag-primary-blue)]">
                      <Info className="h-5 w-5" style={{ color: 'var(--ag-secondary-blue)' }} />
                      What happens next
                    </h2>
                    <p className="text-sm leading-relaxed text-[var(--ag-text-dark)]">
                      {CALLOUT_FEE_EXPLAINER}
                    </p>
                    <div className="mt-4 flex items-start gap-3 py-1">
                      <Checkbox
                        id="calloutFeeAcknowledged"
                        className={CHECKBOX_CLASS}
                        checked={formData.calloutFeeAcknowledged}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, calloutFeeAcknowledged: checked === true })
                        }
                        required
                        aria-required="true"
                      />
                      <Label
                        htmlFor="calloutFeeAcknowledged"
                        className="font-normal cursor-pointer leading-snug"
                      >
                        {CALLOUT_FEE_ACK_LABEL}
                      </Label>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Claim Review:</strong> Submit now and your claim is sent immediately
                      for contractor matching.
                    </AlertDescription>
                  </Alert>

                  <div className="bg-white border-2 border-[var(--ag-border-grey)] rounded-lg p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-[var(--ag-primary-blue)]">
                      <ClipboardList className="h-5 w-5" />
                      Submission summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Claim intake &amp; contractor matching</span>
                        <span className="font-semibold">Included</span>
                      </div>
                      {capturedPhotos.length > 0 && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Damage photos attached</span>
                          <span className="font-medium text-green-700">
                            {capturedPhotos.length} file{capturedPhotos.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 ps-1">
                        No payment is taken when you submit this form. Your matched contractor will
                        contact you, provide a firm Scope of Works on-site, and bill you directly.
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What you get</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Immediate contractor matching based on location and damage type</li>
                      <li>
                        ✓ Contractor contacts you promptly to schedule emergency make-safe works
                      </li>
                      <li>✓ Full claims documentation for your insurer</li>
                      <li>✓ Contractor provides a formal contract with clear terms</li>
                      <li>✓ Contractor bills you directly — not via Disaster Recovery</li>
                    </ul>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>How billing works:</strong> Your IICRC-certified contractor bills you
                      directly for restoration work. Disaster Recovery is a network orchestrator and
                      does not invoice you or hold client funds. Contractors can usually start
                      make-safe works without waiting for insurer approval; keep documentation for
                      reimbursement where your policy covers it.
                    </AlertDescription>
                  </Alert>

                  <div
                    className="rounded-lg border p-4"
                    style={{
                      background: 'color-mix(in srgb, var(--ag-secondary-blue) 8%, white)',
                      borderColor: 'color-mix(in srgb, var(--ag-secondary-blue) 25%, white)',
                    }}
                  >
                    <p className="text-sm text-[var(--ag-text-dark)]">
                      <strong>Need to spread the cost?</strong> Flexible payment plans available
                      through{' '}
                      <a
                        href="https://equippedcf.com.au"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                        style={{ color: 'var(--ag-primary-blue)' }}
                      >
                        Equipped Commercial Finance
                      </a>
                      .
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="w-full sm:w-auto min-h-[44px] bg-green-600 hover:bg-green-800"
                      disabled={submitting || !formData.calloutFeeAcknowledged}
                    >
                      {submitting ? 'Submitting Claim...' : 'Submit Claim'}
                    </Button>
                  </div>
                </div>
              )}
            </AgFormShell>
          </>
        )}
      </div>
    </div>
  );
}
export default function OnlineClaimPage() {
  return (
    <>
      <AntigravityNavbar />
      <nav
        className="ag-breadcrumb"
        aria-label="Breadcrumb"
        style={{ padding: '1rem 1.5rem 0', maxWidth: '1200px', margin: '0 auto' }}
      >
        <Link href="/">Home</Link> / <span>Lodge a Claim</span>
      </nav>
      {/*
        Voice widget — gated by NEXT_PUBLIC_VOICE_WIDGET_ENABLED.
        When off, returns null (zero impact). When on, shows a "Talk to
        Sarah" CTA → APP 8 consent modal → ElevenLabs convai widget.
      */}
      <div className="mx-auto max-w-4xl px-6 pt-2">
        <VoiceWidget agent="sarah" />
      </div>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        }
      >
        <OnlineClaimPageOriginal />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}

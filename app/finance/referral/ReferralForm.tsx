'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type CustomerType = 'business' | 'consumer';
type DisasterCategory = 'water' | 'fire' | 'storm' | 'mould' | 'biohazard' | 'other';
type FundingBand = '<10k' | '10-25k' | '25-50k' | '50-100k' | '100-250k' | '>250k';
type PreferredContact = 'asap' | 'morning' | 'afternoon' | 'evening';

interface ReferralPayload {
  full_name: string;
  mobile: string;
  email: string;
  postcode: string;
  country: 'AU';
  customer_type: CustomerType;
  abn?: string;
  disaster_category: DisasterCategory;
  job_reference?: string;
  purpose: string;
  funding_band: FundingBand;
  preferred_contact: PreferredContact;
  consent_share_equipped: boolean;
  consent_referral_disclosure: boolean;
  consent_marketing: boolean;
}

export function ReferralForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerType, setCustomerType] = useState<CustomerType>('business');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload: ReferralPayload = {
      full_name: String(fd.get('full_name') || '').trim(),
      mobile: String(fd.get('mobile') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      postcode: String(fd.get('postcode') || '').trim(),
      country: 'AU',
      customer_type: customerType,
      abn: customerType === 'business' ? String(fd.get('abn') || '').trim() : undefined,
      disaster_category: (fd.get('disaster_category') as DisasterCategory) || 'other',
      job_reference: String(fd.get('job_reference') || '').trim() || undefined,
      purpose: String(fd.get('purpose') || '').trim(),
      funding_band: (fd.get('funding_band') as FundingBand) || '25-50k',
      preferred_contact: (fd.get('preferred_contact') as PreferredContact) || 'asap',
      consent_share_equipped: fd.get('consent_share_equipped') === 'on',
      consent_referral_disclosure: fd.get('consent_referral_disclosure') === 'on',
      consent_marketing: fd.get('consent_marketing') === 'on',
    };

    if (!payload.consent_share_equipped || !payload.consent_referral_disclosure) {
      setError('Both consent boxes are required to submit a referral.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/finance/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        referral_id?: string;
        handoff_token?: string;
        error?: string;
      };

      if (!res.ok || !data.ok || !data.handoff_token || !data.referral_id) {
        setError(data.error || `Submission failed (HTTP ${res.status}). Try again shortly.`);
        setSubmitting(false);
        return;
      }

      router.push(`/finance/handoff?token=${encodeURIComponent(data.handoff_token)}&id=${encodeURIComponent(data.referral_id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-200 space-y-6">
      {error && (
        <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-900">
          {error}
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">Who are you?</legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setCustomerType('business')}
            className={`px-4 py-3 rounded border text-sm font-medium ${
              customerType === 'business'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            aria-pressed={customerType === 'business'}
          >
            Business / ABN holder
          </button>
          <button
            type="button"
            onClick={() => setCustomerType('consumer')}
            className={`px-4 py-3 rounded border text-sm font-medium ${
              customerType === 'consumer'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            aria-pressed={customerType === 'consumer'}
          >
            Household / individual
          </button>
        </div>
        {customerType === 'consumer' && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded p-3">
            Heads up: household consumer finance is currently Phase 2 of this service while we finalise partner
            arrangements. You can still submit a referral and Equipped will contact you when the consumer pathway is
            open.
          </p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" name="full_name" required />
        <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Postcode" name="postcode" required maxLength={4} pattern="[0-9]{4}" />
      </div>

      {customerType === 'business' && (
        <Field label="ABN (optional — speeds up verification)" name="abn" maxLength={14} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Disaster category" name="disaster_category" required>
          <option value="">Select…</option>
          <option value="water">Water damage</option>
          <option value="fire">Fire / smoke</option>
          <option value="storm">Storm</option>
          <option value="mould">Mould</option>
          <option value="biohazard">Biohazard / sewage</option>
          <option value="other">Other</option>
        </Select>
        <Select label="Funding range needed" name="funding_band" required>
          <option value="">Select…</option>
          <option value="<10k">Under $10,000</option>
          <option value="10-25k">$10,000 – $25,000</option>
          <option value="25-50k">$25,000 – $50,000</option>
          <option value="50-100k">$50,000 – $100,000</option>
          <option value="100-250k">$100,000 – $250,000</option>
          <option value=">250k">Over $250,000</option>
        </Select>
      </div>

      <Field label="Job or quote reference (if you already have one)" name="job_reference" />

      <label className="block">
        <span className="text-sm font-medium text-slate-800">Short purpose (1–2 sentences)</span>
        <textarea
          name="purpose"
          required
          rows={3}
          maxLength={500}
          className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g. Commercial warehouse fire — need equipment finance for replacement forklift and pallet racking."
        />
      </label>

      <Select label="When should Equipped call you?" name="preferred_contact" required>
        <option value="asap">As soon as possible</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </Select>

      <fieldset className="space-y-3 border-t border-slate-200 pt-4">
        <legend className="text-sm font-semibold text-slate-800">Consents</legend>
        <Checkbox
          name="consent_share_equipped"
          required
          label={
            <>
              I consent to Disaster Recovery sharing the information on this form with{' '}
              <strong>Equipped Commercial Finance</strong> (SME Consulting Group Pty Ltd) and/or its authorised lending
              partners, so they can contact me about finance options.
            </>
          }
        />
        <Checkbox
          name="consent_referral_disclosure"
          required
          label={
            <>
              I understand Disaster Recovery is a <strong>referrer, not the lender</strong>, and that a referral fee may
              be paid to Disaster Recovery by Equipped Commercial Finance when this referral results in funded finance.
            </>
          }
        />
        <Checkbox
          name="consent_marketing"
          label="Optional: I&apos;m happy to receive occasional updates from Disaster Recovery about recovery finance and restoration services."
        />
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting securely…' : 'Send referral to Equipped'}
      </button>

      <p className="text-xs text-slate-500">
        Submitting this form creates a signed, single-use referral token that expires in 15 minutes. Your data is sent
        to Equipped over HTTPS; only the fields shown above are transmitted.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  maxLength,
  pattern,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        autoComplete={autoComplete}
        className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </label>
  );
}

function Select({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {children}
      </select>
    </label>
  );
}

function Checkbox({
  name,
  required,
  label,
}: {
  name: string;
  required?: boolean;
  label: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <span>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
    </label>
  );
}

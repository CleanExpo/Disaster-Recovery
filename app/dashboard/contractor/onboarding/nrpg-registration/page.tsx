'use client';

import { useMemo, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

type IicrcLevel = 'TECHNICIAN' | 'SPECIALIST' | 'MASTER' | 'INSTRUCTOR';
type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

const allStates: AustralianState[] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const australianServiceTypes = [
  'WATER_DAMAGE',
  'FIRE_DAMAGE',
  'SMOKE_DAMAGE',
  'MOULD_REMEDIATION',
  'ODOUR_REMEDIATION',
  'CARPET_CLEANING',
  'COMMERCIAL_WATER_DAMAGE',
  'COMMERCIAL_FIRE_DAMAGE',
  'COMMERCIAL_MOULD',
  'COMMERCIAL_ODOUR',
  'CRIME_SCENE_CLEANING',
  'BIOHAZARD_REMEDIATION',
  'HOARDING_CLEANUP',
  'VANDALISM_CLEANUP',
  'GENERAL_RESTORATION',
] as const;
type AustralianServiceType = (typeof australianServiceTypes)[number];

export default function NrpgRegistrationPage() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const sessionEmail = useMemo(() => (session?.user as any)?.email as string | undefined, [session]);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    businessName: '',
    abnNumber: '',
    acnNumber: '',
    phone: '',
    email: sessionEmail ?? '',
    iicrcLevel: 'TECHNICIAN' as IicrcLevel,
    iicrcCertificationCode: '',
    iicrcCertificationDate: '',
    iicrcExpiryDate: '',
    iicrcCertificateFile: '',
    operatingStates: [] as AustralianState[],
    servicePostcodesText: '',
    specialties: [] as AustralianServiceType[],
    publicLiabilityPolicyNumber: '',
    publicLiabilityExpiryDate: '',
    notes: '',
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>NRPG Registration</CardTitle>
            <CardDescription>Sign in to submit your NRPG contractor registration.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void signIn()} className="w-full" size="lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleState = (state: AustralianState) => {
    setForm((prev) => ({
      ...prev,
      operatingStates: prev.operatingStates.includes(state)
        ? prev.operatingStates.filter((s) => s !== state)
        : [...prev.operatingStates, state],
    }));
  };

  const parsePostcodes = (value: string): string[] => {
    const parsed = value
      .split(/[\s,]+/)
      .map((v) => v.trim())
      .filter(Boolean)
      .filter((v) => /^[0-9]{4}$/.test(v));

    return Array.from(new Set(parsed));
  };

  const toggleSpecialty = (specialty: AustralianServiceType) => {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const validate = (): string | null => {
    if (!form.businessName.trim()) return 'Business name is required';
    if (!form.phone.trim()) return 'Phone is required';
    const emailToUse = (form.email || sessionEmail || '').trim();
    if (!emailToUse) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToUse)) return 'Email format is invalid';

    if (form.abnNumber.trim() && !/^[0-9]{11}$/.test(form.abnNumber.trim())) return 'ABN must be 11 digits';
    if (form.acnNumber.trim() && !/^[0-9]{9}$/.test(form.acnNumber.trim())) return 'ACN must be 9 digits';

    if (!form.iicrcCertificationCode.trim()) return 'IICRC certification code is required';
    if (!form.iicrcCertificationDate) return 'IICRC certification date is required';
    if (!form.iicrcExpiryDate) return 'IICRC expiry date is required';

    if (form.operatingStates.length < 1) return 'Select at least one operating state/territory';
    if (form.specialties.length < 1) return 'Select at least one specialty';

    const postcodes = parsePostcodes(form.servicePostcodesText);
    if (postcodes.length < 1) return 'Enter at least one valid service postcode';

    if (!form.publicLiabilityPolicyNumber.trim()) return 'Public liability policy number is required';
    if (!form.publicLiabilityExpiryDate) return 'Public liability expiry date is required';

    const certDate = new Date(form.iicrcCertificationDate);
    const certExpiry = new Date(form.iicrcExpiryDate);
    const liabilityExpiry = new Date(form.publicLiabilityExpiryDate);
    if (Number.isNaN(certDate.getTime())) return 'IICRC certification date is invalid';
    if (Number.isNaN(certExpiry.getTime())) return 'IICRC expiry date is invalid';
    if (Number.isNaN(liabilityExpiry.getTime())) return 'Public liability expiry date is invalid';
    if (certExpiry.getTime() <= certDate.getTime()) return 'IICRC expiry must be after certification date';

    return null;
  };

  const submit = async () => {
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    try {
      const emailToUse = (form.email || sessionEmail || '').trim();
      const response = await fetch('/api/contractors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.businessName,
          abnNumber: form.abnNumber.trim() ? form.abnNumber.trim() : null,
          acnNumber: form.acnNumber.trim() ? form.acnNumber.trim() : null,
          phone: form.phone,
          email: emailToUse,
          iicrcLevel: form.iicrcLevel,
          iicrcCertificationCode: form.iicrcCertificationCode,
          iicrcCertificationDate: form.iicrcCertificationDate,
          iicrcExpiryDate: form.iicrcExpiryDate,
          iicrcCertificateFile: form.iicrcCertificateFile,
          operatingStates: form.operatingStates,
          servicePostcodes: parsePostcodes(form.servicePostcodesText),
          specialties: form.specialties,
          publicLiabilityPolicyNumber: form.publicLiabilityPolicyNumber,
          publicLiabilityExpiryDate: form.publicLiabilityExpiryDate,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setError(data?.error || data?.message || 'Registration failed');
        return;
      }

      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Registration submitted
            </CardTitle>
            <CardDescription>
              NRPG will review your submission. You can continue training while verification is pending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => router.push('/dashboard/contractor/onboarding/checklist')}>
              Back to checklist
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/contractor/onboarding')}>
              Continue training
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>NRPG Registration</CardTitle>
          <CardDescription>Provide verified business, certification, and coverage details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              value={form.businessName}
              onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              placeholder="ABC Restoration Services"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="abnNumber">ABN (optional)</Label>
              <Input
                id="abnNumber"
                value={form.abnNumber}
                onChange={(e) => setForm((p) => ({ ...p, abnNumber: e.target.value }))}
                placeholder="11 digits"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acnNumber">ACN (optional)</Label>
              <Input
                id="acnNumber"
                value={form.acnNumber}
                onChange={(e) => setForm((p) => ({ ...p, acnNumber: e.target.value }))}
                placeholder="9 digits"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="0412 345 678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@business.com.au"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>IICRC level</Label>
              <Select
                value={form.iicrcLevel}
                onValueChange={(value) => setForm((p) => ({ ...p, iicrcLevel: value as IicrcLevel }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNICIAN">Technician</SelectItem>
                  <SelectItem value="SPECIALIST">Specialist</SelectItem>
                  <SelectItem value="MASTER">Master</SelectItem>
                  <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iicrcCertificationCode">IICRC certification code</Label>
              <Input
                id="iicrcCertificationCode"
                value={form.iicrcCertificationCode}
                onChange={(e) => setForm((p) => ({ ...p, iicrcCertificationCode: e.target.value }))}
                placeholder="e.g. WRT123456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="iicrcCertificationDate">IICRC certification date</Label>
              <Input
                id="iicrcCertificationDate"
                type="date"
                value={form.iicrcCertificationDate}
                onChange={(e) => setForm((p) => ({ ...p, iicrcCertificationDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iicrcExpiryDate">IICRC expiry date</Label>
              <Input
                id="iicrcExpiryDate"
                type="date"
                value={form.iicrcExpiryDate}
                onChange={(e) => setForm((p) => ({ ...p, iicrcExpiryDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iicrcCertificateFile">IICRC certificate URL</Label>
            <Input
              id="iicrcCertificateFile"
              value={form.iicrcCertificateFile}
              onChange={(e) => setForm((p) => ({ ...p, iicrcCertificateFile: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label>Operating states</Label>
            <div className="flex flex-wrap gap-2">
              {allStates.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={form.operatingStates.includes(s) ? 'default' : 'outline'}
                  onClick={() => toggleState(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Select where you can operate (Australia only).</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicePostcodesText">Service postcodes (4-digit, separated by spaces/commas)</Label>
            <Input
              id="servicePostcodesText"
              value={form.servicePostcodesText}
              onChange={(e) => setForm((p) => ({ ...p, servicePostcodesText: e.target.value }))}
              placeholder="2000, 2010, 2020"
            />
          </div>

          <div className="space-y-2">
            <Label>Specialties</Label>
            <div className="flex flex-wrap gap-2">
              {australianServiceTypes.map((service) => (
                <Button
                  key={service}
                  type="button"
                  variant={form.specialties.includes(service) ? 'default' : 'outline'}
                  onClick={() => toggleSpecialty(service)}
                >
                  {service}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Select all services you can perform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publicLiabilityPolicyNumber">Public liability policy number</Label>
              <Input
                id="publicLiabilityPolicyNumber"
                value={form.publicLiabilityPolicyNumber}
                onChange={(e) => setForm((p) => ({ ...p, publicLiabilityPolicyNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicLiabilityExpiryDate">Public liability expiry date</Label>
              <Input
                id="publicLiabilityExpiryDate"
                type="date"
                value={form.publicLiabilityExpiryDate}
                onChange={(e) => setForm((p) => ({ ...p, publicLiabilityExpiryDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            className="w-full"
            onClick={submit}
            disabled={
              submitting ||
              !form.businessName ||
              !form.phone ||
              form.operatingStates.length === 0 ||
              form.specialties.length === 0
            }
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting…
              </>
            ) : (
              'Submit registration'
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            This submission is used for NRPG verification. Ensure all details are accurate and match supporting documentation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

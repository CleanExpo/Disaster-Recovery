'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AlertCircle, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  SubContractor,
  SubContractorEngagementFormValues,
  SubContractorTradeType,
  TRADE_TYPE_LABELS,
  calculateSubContractorMarkup,
  MarkupCalculation,
} from '@/types/sub-contractor';
import { MarkupCalculatorDisplay } from './MarkupCalculatorDisplay';

export interface EngagementFormProps {
  subContractors: SubContractor[];
  onSubmit: (values: SubContractorEngagementFormValues) => Promise<void>;
  onInviteNew: (email: string, tradeType: SubContractorTradeType) => void;
  isSubmitting: boolean;
}

export function EngagementForm({
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

  const activeSubContractors = subContractors.filter((sc) => sc.onboardingStatus === 'COMPLETE');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Sub-contractor selection */}
      <div className="space-y-2">
        <Label>Sub-Contractor</Label>
        {activeSubContractors.length === 0 ? (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              No onboarded sub-contractors yet. Invite one below or register a new sub-contractor
              first.
            </AlertDescription>
          </Alert>
        ) : (
          <Controller
            name="subContractorId"
            control={control}
            rules={{
              required: inviteMode ? false : 'Select a sub-contractor or use the invite option',
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={inviteMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select registered sub-contractor..." />
                </SelectTrigger>
                <SelectContent>
                  {activeSubContractors.map((sc) => (
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
          onClick={() => setInviteMode((m) => !m)}
        >
          {inviteMode
            ? 'Select existing sub-contractor instead'
            : 'Invite a new sub-contractor instead'}
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
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Trade type required</Label>
            <Select
              value={inviteTradeType}
              onValueChange={(v) => setInviteTradeType(v as SubContractorTradeType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trade type..." />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(TRADE_TYPE_LABELS) as SubContractorTradeType[]).map((t) => (
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
                {(Object.keys(TRADE_TYPE_LABELS) as SubContractorTradeType[]).map((t) => (
                  <SelectItem key={t} value={t}>
                    {TRADE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.tradeType && <p className="text-xs text-red-600">{errors.tradeType.message}</p>}
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
        {errors.workScope && <p className="text-xs text-red-600">{errors.workScope.message}</p>}
      </div>

      {/* Invoice amount + markup */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subInvoiceAmount">Sub-contractor Quote (ex GST)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              $
            </span>
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
            NRPG Markup %<span className="ml-1 text-xs font-normal text-gray-500">(min 15%)</span>
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
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              %
            </span>
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

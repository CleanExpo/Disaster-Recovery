'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  FileText,
  DollarSign,
} from 'lucide-react';

// Australian service types for disaster recovery
const AUSTRALIAN_SERVICE_TYPES = [
  { value: 'WATER_DAMAGE', label: 'Water Damage', icon: '💧' },
  { value: 'FIRE_DAMAGE', label: 'Fire Damage', icon: '🔥' },
  { value: 'SMOKE_DAMAGE', label: 'Smoke Damage', icon: '💨' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation', icon: '🍄' },
  { value: 'ODOUR_REMEDIATION', label: 'Odour Remediation', icon: '👃' },
  { value: 'CARPET_CLEANING', label: 'Carpet Cleaning', icon: '🧹' },
  { value: 'COMMERCIAL_WATER_DAMAGE', label: 'Commercial Water Damage', icon: '🏢' },
  { value: 'COMMERCIAL_FIRE_DAMAGE', label: 'Commercial Fire Damage', icon: '🏢' },
  { value: 'COMMERCIAL_MOULD', label: 'Commercial Mould', icon: '🏢' },
  { value: 'CRIME_SCENE_CLEANING', label: 'Crime Scene Cleaning', icon: '🛡️' },
  { value: 'BIOHAZARD_REMEDIATION', label: 'Biohazard Remediation', icon: '⚠️' },
  { value: 'HOARDING_CLEANUP', label: 'Hoarding Cleanup', icon: '📦' },
  { value: 'VANDALISM_CLEANUP', label: 'Vandalism Cleanup', icon: '🔨' },
  { value: 'GENERAL_RESTORATION', label: 'General Restoration', icon: '🔧' },
];

// Emergency response levels
const EMERGENCY_RESPONSE_LEVELS = [
  { value: 'URGENT', label: 'Urgent (< 2 hours)', color: 'text-red-500' },
  { value: 'HIGH', label: 'High (Same day)', color: 'text-orange-500' },
  { value: 'STANDARD', label: 'Standard (Next business day)', color: 'text-blue-500' },
  { value: 'SCHEDULED', label: 'Scheduled (Pre-arranged)', color: 'text-green-500' },
];

// Australian states for postcode validation
const AUSTRALIAN_STATES: Record<string, { name: string; postcodeRange: [number, number] }> = {
  NSW: { name: 'New South Wales', postcodeRange: [1000, 2999] },
  VIC: { name: 'Victoria', postcodeRange: [3000, 3999] },
  QLD: { name: 'Queensland', postcodeRange: [4000, 4999] },
  WA: { name: 'Western Australia', postcodeRange: [6000, 6999] },
  SA: { name: 'South Australia', postcodeRange: [5000, 5999] },
  TAS: { name: 'Tasmania', postcodeRange: [7000, 7999] },
  ACT: { name: 'Australian Capital Territory', postcodeRange: [200, 999] },
  NT: { name: 'Northern Territory', postcodeRange: [800, 899] },
};

// Validation schema
const bookingFormSchema = z.object({
  serviceType: z.string({
    required_error: 'Please select a service type',
  }),
  emergencyLevel: z.string({
    required_error: 'Please select an emergency level',
  }),
  address: z.string().min(5, 'Address is required'),
  postcode: z
    .string()
    .regex(/^\d{4}$/, 'Postcode must be exactly 4 digits')
    .refine((code) => {
      const num = parseInt(code, 10);
      for (const state of Object.values(AUSTRALIAN_STATES)) {
        const [min, max] = state.postcodeRange;
        if (num >= min && num <= max) return true;
      }
      return false;
    }, 'Invalid Australian postcode'),
  suburb: z.string().min(2, 'Suburb is required'),
  state: z.string({
    required_error: 'Please select a state',
  }),
  phone: z
    .string()
    .regex(/^0[2-8]\d{8}$|^04\d{8}$/, 'Invalid Australian phone number'),
  description: z.string().min(10, 'Please describe the damage or issue'),
  damagePhotos: z.array(z.string()).optional(),
  estimatedDamageAUD: z
    .string()
    .optional()
    .refine(
      (val) => !val || parseInt(val) >= 0,
      'Damage estimate must be a positive number'
    ),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface DisasterRecoveryBookingFormProps {
  onSubmit?: (data: BookingFormValues) => void;
  showEstimate?: boolean;
}

export default function DisasterRecoveryBookingForm({
  onSubmit,
  showEstimate = true,
}: DisasterRecoveryBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceType: '',
      emergencyLevel: 'STANDARD',
      address: '',
      postcode: '',
      suburb: '',
      state: '',
      phone: '',
      description: '',
      damagePhotos: [],
      estimatedDamageAUD: '',
      insuranceProvider: '',
      policyNumber: '',
    },
  });

  // Calculate estimated cost based on service type and emergency level
  const calculateEstimate = (serviceType: string, emergencyLevel: string) => {
    const basePrices: Record<string, number> = {
      WATER_DAMAGE: 1500,
      FIRE_DAMAGE: 2500,
      SMOKE_DAMAGE: 1200,
      MOULD_REMEDIATION: 800,
      ODOUR_REMEDIATION: 600,
      CARPET_CLEANING: 500,
      COMMERCIAL_WATER_DAMAGE: 3500,
      COMMERCIAL_FIRE_DAMAGE: 5000,
      COMMERCIAL_MOULD: 2000,
      CRIME_SCENE_CLEANING: 1800,
      BIOHAZARD_REMEDIATION: 2200,
      HOARDING_CLEANUP: 1100,
      VANDALISM_CLEANUP: 900,
      GENERAL_RESTORATION: 1000,
    };

    const emergencySurcharges: Record<string, number> = {
      URGENT: 1.5,
      HIGH: 1.25,
      STANDARD: 1.0,
      SCHEDULED: 0.9,
    };

    const basePrice = basePrices[serviceType] || 1000;
    const surcharge = emergencySurcharges[emergencyLevel] || 1.0;
    let estimate = basePrice * surcharge;

    // Add 10% GST for Australia
    estimate = estimate * 1.1;

    // Round to nearest $50
    estimate = Math.ceil(estimate / 50) * 50;

    setEstimatedCost(estimate);
    return estimate;
  };

  // Watch for service type and emergency level changes
  form.watch((data) => {
    if (data.serviceType && data.emergencyLevel && showEstimate) {
      calculateEstimate(data.serviceType, data.emergencyLevel);
    }
  });

  async function onFormSubmit(values: BookingFormValues) {
    try {
      setIsSubmitting(true);

      // Build request payload matching Phase 2 API spec
      const payload = {
        serviceType: values.serviceType,
        emergencyLevel: values.emergencyLevel,
        address: {
          street: values.address,
          suburb: values.suburb,
          postcode: values.postcode,
          state: values.state,
          country: 'Australia',
        },
        phone: values.phone,
        description: values.description,
        damagePhotos: uploadedPhotos,
        estimatedDamageAUD: values.estimatedDamageAUD
          ? parseInt(values.estimatedDamageAUD)
          : undefined,
        insuranceProvider: values.insuranceProvider || undefined,
        policyNumber: values.policyNumber || undefined,
      };

      // Call API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        throw new Error('Please sign in to create a booking');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }

      const result = await response.json();
      toast.success('Booking created successfully!');

      if (onSubmit) {
        onSubmit(values);
      }

      // Reset form
      form.reset();
      setUploadedPhotos([]);
      setEstimatedCost(null);

      return result.data;
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="bg-gradient-to-r from-[#00BFA6] to-[#3B82F6]">
          <CardTitle className="text-white text-2xl">Disaster Recovery Booking</CardTitle>
          <CardDescription className="text-gray-100">
            Request professional restoration services in Australia
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
              {/* Service Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  What service do you need?
                </h3>
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {AUSTRALIAN_SERVICE_TYPES.map((service) => (
                            <div
                              key={service.value}
                              onClick={() => field.onChange(service.value)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === service.value
                                  ? 'border-[#00BFA6] bg-[#00BFA6]/10'
                                  : 'border-gray-600 bg-gray-700 hover:border-[#00BFA6]/50'
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <span className="text-2xl">{service.icon}</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">
                                    {service.label}
                                  </p>
                                </div>
                                {field.value === service.value && (
                                  <CheckCircle2 className="h-5 w-5 text-[#00BFA6]" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Emergency Level Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  How urgent is this?
                </h3>
                <FormField
                  control={form.control}
                  name="emergencyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {EMERGENCY_RESPONSE_LEVELS.map((level) => (
                            <div
                              key={level.value}
                              onClick={() => field.onChange(level.value)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === level.value
                                  ? 'border-[#00BFA6] bg-[#00BFA6]/10'
                                  : 'border-gray-600 bg-gray-700 hover:border-[#00BFA6]/50'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`h-3 w-3 rounded-full ${level.color} bg-current`} />
                                <p className="text-sm font-medium text-white">{level.label}</p>
                                {field.value === level.value && (
                                  <CheckCircle2 className="h-5 w-5 text-[#00BFA6] ml-auto" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Service Location
                </h3>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main Street"
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="suburb"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Suburb</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Sydney"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Postcode</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2000"
                            maxLength={4}
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-700 border-gray-600 text-white">
                            {Object.entries(AUSTRALIAN_STATES).map(([code, state]) => (
                              <SelectItem key={code} value={code}>
                                {state.name} ({code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Contact Phone</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-2" />
                          <Input
                            placeholder="02 XXXX XXXX or 04XX XXX XXX"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Australian phone number (02-08 or 04 prefixes)
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description and Damage */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Damage Description</h3>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Describe the damage or issue
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about the damage, including what happened, affected areas, and any immediate concerns..."
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimatedDamageAUD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Estimated Damage Value (AUD)</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                          <Input
                            type="number"
                            placeholder="e.g., 5000"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Optional - helps with quote estimation
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Insurance Information */}
              <div className="space-y-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-white">Insurance Information (Optional)</h3>

                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Insurance Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                            <SelectValue placeholder="Select provider (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-600 border-gray-500 text-white">
                          <SelectItem value="NRMA">NRMA</SelectItem>
                          <SelectItem value="SUNCORP">Suncorp</SelectItem>
                          <SelectItem value="ALLIANZ">Allianz</SelectItem>
                          <SelectItem value="QBE">QBE</SelectItem>
                          <SelectItem value="IAG">IAG</SelectItem>
                          <SelectItem value="CGU">CGU</SelectItem>
                          <SelectItem value="MEDIBANK">Medibank</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Policy Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your policy number (optional)"
                          className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Estimated Cost Display */}
              {showEstimate && estimatedCost && (
                <div className="p-4 bg-gradient-to-r from-[#00BFA6]/10 to-[#3B82F6]/10 border-2 border-[#00BFA6] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Estimated Service Cost (Including 10% GST)</p>
                      <p className="text-3xl font-bold text-[#00BFA6] mt-1">
                        ${estimatedCost.toLocaleString('en-AU')}
                      </p>
                    </div>
                    <CheckCircle2 className="h-12 w-12 text-[#00BFA6]" />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    This is an estimate based on service type and emergency level. Final cost may vary based on contractor assessment.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-600">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#00BFA6] to-[#3B82F6] hover:from-[#00A693] hover:to-[#2E7FD6] text-white font-semibold text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Booking...
                    </>
                  ) : (
                    'Create Booking'
                  )}
                </Button>
                <p className="text-gray-400 text-sm text-center mt-3">
                  By submitting this form, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

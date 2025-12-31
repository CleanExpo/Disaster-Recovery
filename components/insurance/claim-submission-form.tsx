'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  Upload,
  X,
  FileText,
  DollarSign,
  FileCheck,
} from 'lucide-react';

// Australian insurance providers
const INSURANCE_PROVIDERS = [
  { code: 'NRMA', name: 'NRMA', contact: 'claims@nrma.com.au', phone: '131 123' },
  { code: 'SUNCORP', name: 'Suncorp', contact: 'claims@suncorp.com.au', phone: '13 11 55' },
  { code: 'ALLIANZ', name: 'Allianz', contact: 'claims@allianz.com.au', phone: '13 10 13' },
  { code: 'QBE', name: 'QBE', contact: 'claims@qbe.com.au', phone: '133 723' },
  { code: 'CGU', name: 'CGU', contact: 'claims@cgu.com.au', phone: '131 123' },
  { code: 'MEDIBANK', name: 'Medibank', contact: 'claims@medibank.com.au', phone: '132 331' },
];

// Claim submission validation schema
const claimSubmissionSchema = z.object({
  bookingId: z.string({
    required_error: 'Please select a booking',
  }),
  insuranceProvider: z.string({
    required_error: 'Please select your insurance provider',
  }),
  policyNumber: z
    .string()
    .min(5, 'Policy number is required and must be at least 5 characters'),
  totalClaimAmountAUD: z
    .string()
    .refine((val) => parseInt(val) > 0, 'Claim amount must be greater than $0'),
  damageDescription: z
    .string()
    .min(20, 'Please provide a detailed description of the damage'),
  damagePhotos: z
    .array(z.string())
    .min(1, 'At least one damage photo is required'),
  invoiceUrl: z.string().optional(),
  estimateUrl: z.string().optional(),
  additionalDocuments: z.array(z.string()).optional(),
});

type ClaimSubmissionValues = z.infer<typeof claimSubmissionSchema>;

interface ClaimSubmissionFormProps {
  bookingId?: string;
  onSubmit?: (claimId: string, claimNumber: string) => void;
}

interface Booking {
  id: string;
  australianServiceType: string;
  estimatedCostAUD: number;
  description: string;
  status: string;
}

export default function ClaimSubmissionForm({
  bookingId: initialBookingId,
  onSubmit,
}: ClaimSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<(typeof INSURANCE_PROVIDERS)[0] | null>(
    null
  );

  const form = useForm<ClaimSubmissionValues>({
    resolver: zodResolver(claimSubmissionSchema),
    defaultValues: {
      bookingId: initialBookingId || '',
      insuranceProvider: '',
      policyNumber: '',
      totalClaimAmountAUD: '',
      damageDescription: '',
      damagePhotos: [],
      invoiceUrl: '',
      estimateUrl: '',
      additionalDocuments: [],
    },
  });

  // Fetch available bookings
  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const response = await fetch('/api/bookings', { cache: 'no-store' });

      if (!response.ok) throw new Error('Failed to fetch bookings');

      const result = await response.json();
      const completedOrInProgressBookings = result.data.filter(
        (booking: any) =>
          ['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
      );
      setBookings(completedOrInProgressBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoadingBookings(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    try {
      for (const file of files) {
        // In a real implementation, you would upload to cloud storage (S3, Azure Blob, etc.)
        // For now, we'll use a data URL for demonstration
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setUploadedPhotos((prev) => [...prev, dataUrl]);
          form.setValue('damagePhotos', [...uploadedPhotos, dataUrl]);
        };
        reader.readAsDataURL(file);
      }
      toast.success(`${files.length} photo(s) uploaded`);
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error('Failed to upload photos');
    }
  };

  // Remove uploaded photo
  const removePhoto = (index: number) => {
    const newPhotos = uploadedPhotos.filter((_, i) => i !== index);
    setUploadedPhotos(newPhotos);
    form.setValue('damagePhotos', newPhotos);
  };

  async function onFormSubmit(values: ClaimSubmissionValues) {
    try {
      setIsSubmitting(true);

      // Build payload matching Phase 2 API spec
      const payload = {
        bookingId: values.bookingId,
        insuranceProvider: values.insuranceProvider,
        policyNumber: values.policyNumber,
        totalClaimAmountAUD: parseInt(values.totalClaimAmountAUD),
        damageDescription: values.damageDescription,
        damagePhotos: uploadedPhotos,
        invoiceUrl: values.invoiceUrl || undefined,
        estimateUrl: values.estimateUrl || undefined,
        additionalDocuments: values.additionalDocuments || [],
      };

      // Call API
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Failed to submit claim');
      }

      const result = await response.json();
      toast.success('Insurance claim submitted successfully!');

      if (onSubmit) {
        onSubmit(result.data.claimId, result.data.claimNumber);
      }

      // Reset form
      form.reset();
      setUploadedPhotos([]);
      setSelectedProvider(null);

      return result.data;
    } catch (error) {
      console.error('Claim submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit claim');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="bg-gradient-to-r from-[#00BFA6] to-[#3B82F6]">
          <CardTitle className="text-white text-2xl">Submit Insurance Claim</CardTitle>
          <CardDescription className="text-gray-100">
            File a claim with your insurance provider for your disaster recovery service
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
              {/* Booking Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Select Service Booking
                </h3>

                <FormField
                  control={form.control}
                  name="bookingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Which booking is this claim for?
                      </FormLabel>

                      {!initialBookingId && (
                        <Button
                          type="button"
                          onClick={fetchBookings}
                          disabled={loadingBookings}
                          className="mb-4 bg-gray-700 hover:bg-gray-600"
                        >
                          {loadingBookings ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Loading bookings...
                            </>
                          ) : (
                            'Load My Bookings'
                          )}
                        </Button>
                      )}

                      {bookings.length > 0 && (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select a booking" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-700 border-gray-600 text-white">
                            {bookings.map((booking) => (
                              <SelectItem key={booking.id} value={booking.id}>
                                {booking.australianServiceType} - ${booking.estimatedCostAUD}
                                (Status: {booking.status})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {initialBookingId && (
                        <Input
                          value={initialBookingId}
                          disabled
                          className="bg-gray-700 border-gray-600 text-gray-300"
                        />
                      )}
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Insurance Provider */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Insurance Provider Details
                </h3>

                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Select Your Insurance Provider</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const provider = INSURANCE_PROVIDERS.find((p) => p.code === value);
                            setSelectedProvider(provider || null);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select insurance provider" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600 text-white">
                            {INSURANCE_PROVIDERS.map((provider) => (
                              <SelectItem key={provider.code} value={provider.code}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {selectedProvider && (
                  <div className="mt-3 p-4 bg-blue-900/20 border border-blue-500 rounded text-sm text-gray-300">
                    <p className="font-medium text-blue-400 mb-1">{selectedProvider.name}</p>
                    <p>Email: {selectedProvider.contact}</p>
                    <p>Phone: {selectedProvider.phone}</p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-gray-300">Policy Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your insurance policy number"
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        This should be on your insurance document
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Claim Amount */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Claim Amount
                </h3>

                <FormField
                  control={form.control}
                  name="totalClaimAmountAUD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Total Claim Amount (AUD)</FormLabel>
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
                        The total amount you are claiming from your insurance provider
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Damage Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Damage Description</h3>

                <FormField
                  control={form.control}
                  name="damageDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Detailed Damage Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a comprehensive description of the damage, including:
- Type of damage
- Areas affected
- Estimated cause
- Actions taken so far
- Any repairs already started"
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-40"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Be thorough - this helps your insurance company process the claim faster
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Damage Photos */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Damage Photos
                </h3>

                <FormField
                  control={form.control}
                  name="damagePhotos"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Upload Damage Photos</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#00BFA6] transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="photo-upload"
                            />
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer flex flex-col items-center gap-2"
                            >
                              <Upload className="h-8 w-8 text-gray-400" />
                              <span className="text-gray-300 font-medium">
                                Click to upload or drag and drop
                              </span>
                              <span className="text-gray-400 text-sm">
                                PNG, JPG, GIF up to 10MB each
                              </span>
                            </label>
                          </div>

                          {/* Uploaded Photos Grid */}
                          {uploadedPhotos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {uploadedPhotos.map((photo, index) => (
                                <div
                                  key={index}
                                  className="relative group rounded-lg overflow-hidden bg-gray-700 h-32"
                                >
                                  <Image
                                    src={photo}
                                    alt={`Damage photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm">Click X to remove</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <p className="text-gray-400 text-sm">
                            {uploadedPhotos.length} photo(s) uploaded
                            {uploadedPhotos.length > 0 && (
                              <span className="text-green-400 flex items-center gap-1 mt-1">
                                <CheckCircle2 className="h-4 w-4" />
                                Ready to submit
                              </span>
                            )}
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional Documents */}
              <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 space-y-4">
                <h3 className="text-lg font-semibold text-white">Optional Documents</h3>

                <FormField
                  control={form.control}
                  name="invoiceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Invoice/Receipt URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://... (URL to invoice)"
                          className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Link to contractor's invoice (if available)
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estimateUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Estimate/Quote URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://... (URL to estimate)"
                          className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Link to repair estimate (if available)
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

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
                      Submitting Claim...
                    </>
                  ) : (
                    'Submit Insurance Claim'
                  )}
                </Button>
                <p className="text-gray-400 text-sm text-center mt-3">
                  Your claim will be sent to {selectedProvider?.name || 'your insurance provider'} for processing.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Important Information Card */}
      <Card className="bg-blue-900/20 border border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-100 text-sm space-y-2">
          <p>• Keep copies of all submitted documents for your records</p>
          <p>• Your insurance provider typically processes claims within 5-10 business days</p>
          <p>• You will be notified via email of your claim status</p>
          <p>• If additional information is needed, the insurer will contact you directly</p>
          <p>• For urgent claim status, contact your provider directly using the contact details above</p>
        </CardContent>
      </Card>
    </div>
  );
}

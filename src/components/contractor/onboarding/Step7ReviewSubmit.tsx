'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  Shield, 
  Briefcase, 
  Wrench,
  Heart,
  DollarSign,
  Send,
  Download,
  Eye,
  Edit,
  CheckSquare,
  XCircle,
  Clock,
  ChevronRight,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Info
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

const reviewSchema = z.object({
  confirmDataAccuracy: z.boolean().refine(val => val === true, {
    message: "You must confirm all information is accurate"
  }),
  confirmTermsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
  confirmPaymentAuthorized: z.boolean().refine(val => val === true, {
    message: "You must authorise the payment"
  }),
  confirmCommitment: z.boolean().refine(val => val === true, {
    message: "You must confirm your commitment to NRP standards"
  }),
  agreeToBackground: z.boolean().refine(val => val === true, {
    message: "You must agree to background verification"
  }),
  electronicSignature: z.string().min(1, "Electronic signature is required"),
  signatureDate: z.string().min(1, "Signature date is required")
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface Step7ReviewSubmitProps {
  onNext: (data: ReviewFormValues) => void
  onPrevious: () => void
  defaultValues?: Partial<ReviewFormValues>
  applicationData?: any // Full application data from all previous steps
}

interface SectionReview {
  title: string
  icon: React.ReactNode
  status: 'complete' | 'incomplete' | 'warning'
  items: Array<{
    label: string
    value: string | number | boolean
    required?: boolean
    missing?: boolean
  }>
}

export default function Step7ReviewSubmit({ 
  onNext, 
  onPrevious, 
  defaultValues,
  applicationData = {}
}: Step7ReviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullReview, setShowFullReview] = useState(false)

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      confirmDataAccuracy: false,
      confirmTermsAccepted: false,
      confirmPaymentAuthorized: false,
      confirmCommitment: false,
      agreeToBackground: false,
      electronicSignature: '',
      signatureDate: new Date().toISOString().split('T')[0],
      ...defaultValues
    }
  })

  // Calculate completion status for each section
  const getSectionStatus = (section: string): 'complete' | 'incomplete' | 'warning' => {
    const data = applicationData[section]
    if (!data) return 'incomplete'
    
    // Check if all required fields are filled
    const requiredFields = getRequiredFields(section)
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length === 0) return 'complete'
    if (missingFields.length <= 2) return 'warning'
    return 'incomplete'
  }

  const getRequiredFields = (section: string): string[] => {
    const requiredFieldsMap: Record<string, string[]> = {
      businessInfo: ['businessName', 'abn', 'tradingName', 'businessType', 'yearEstablished'],
      insurance: ['publicLiability', 'professionalIndemnity', 'workersComp'],
      experience: ['yearsExperience', 'primaryServices', 'previousProjects'],
      equipment: ['vehicleFleet', 'specializedEquipment', 'teamSize'],
      healthSafety: ['whsPolicy', 'safeWorkProcedures', 'incidentReporting'],
      banking: ['accountName', 'bsb', 'accountNumber', 'gstRegistered']
    }
    return requiredFieldsMap[section] || []
  }

  // Generate review sections
  const reviewSections: SectionReview[] = [
    {
      title: 'Business Information',
      icon: <Briefcase className="h-5 w-5" />,
      status: getSectionStatus('businessInfo'),
      items: [
        { label: 'Business Name', value: applicationData.businessInfo?.businessName || 'Not provided', required: true },
        { label: 'ABN', value: applicationData.businessInfo?.abn || 'Not provided', required: true },
        { label: 'Trading Name', value: applicationData.businessInfo?.tradingName || 'Not provided' },
        { label: 'Business Type', value: applicationData.businessInfo?.businessType || 'Not provided', required: true },
        { label: 'Year Established', value: applicationData.businessInfo?.yearEstablished || 'Not provided', required: true },
        { label: 'Website', value: applicationData.businessInfo?.website || 'Not provided' },
      ]
    },
    {
      title: 'Insurance & Licensing',
      icon: <Shield className="h-5 w-5" />,
      status: getSectionStatus('insurance'),
      items: [
        { label: 'Public Liability', value: applicationData.insurance?.publicLiability ? `$${applicationData.insurance.publicLiability}` : 'Not provided', required: true },
        { label: 'Professional Indemnity', value: applicationData.insurance?.professionalIndemnity ? `$${applicationData.insurance.professionalIndemnity}` : 'Not provided', required: true },
        { label: 'Workers Compensation', value: applicationData.insurance?.workersComp ? 'Active' : 'Not provided', required: true },
        { label: 'Licenses', value: applicationData.insurance?.licenses?.length ? `${applicationData.insurance.licenses.length} licenses` : 'None provided' },
      ]
    },
    {
      title: 'Experience & References',
      icon: <User className="h-5 w-5" />,
      status: getSectionStatus('experience'),
      items: [
        { label: 'Years in Business', value: applicationData.experience?.yearsExperience || 'Not provided', required: true },
        { label: 'Primary Services', value: applicationData.experience?.primaryServices?.join(', ') || 'Not provided', required: true },
        { label: 'Previous Projects', value: applicationData.experience?.previousProjects?.length ? `${applicationData.experience.previousProjects.length} projects` : 'None provided', required: true },
        { label: 'References', value: applicationData.experience?.references?.length ? `${applicationData.experience.references.length} references` : 'None provided', required: true },
      ]
    },
    {
      title: 'Equipment & Resources',
      icon: <Wrench className="h-5 w-5" />,
      status: getSectionStatus('equipment'),
      items: [
        { label: 'Vehicle Fleet', value: applicationData.equipment?.vehicleFleet?.length ? `${applicationData.equipment.vehicleFleet.length} vehicles` : 'Not provided', required: true },
        { label: 'Specialised Equipment', value: applicationData.equipment?.specializedEquipment?.length ? `${applicationData.equipment.specializedEquipment.length} items` : 'Not provided', required: true },
        { label: 'Team Size', value: applicationData.equipment?.teamSize || 'Not provided', required: true },
        { label: 'Technicians', value: applicationData.equipment?.technicians || 'Not provided' },
      ]
    },
    {
      title: 'Health & Safety',
      icon: <Heart className="h-5 w-5" />,
      status: getSectionStatus('healthSafety'),
      items: [
        { label: 'WHS Policy', value: applicationData.healthSafety?.whsPolicy ? 'Provided' : 'Not provided', required: true },
        { label: 'Safe Work Procedures', value: applicationData.healthSafety?.safeWorkProcedures ? 'Documented' : 'Not provided', required: true },
        { label: 'Training Records', value: applicationData.healthSafety?.trainingRecords ? 'Maintained' : 'Not provided', required: true },
        { label: 'Incident Reporting', value: applicationData.healthSafety?.incidentReporting ? 'System in place' : 'Not provided', required: true },
      ]
    },
    {
      title: 'Banking & Payment',
      icon: <DollarSign className="h-5 w-5" />,
      status: getSectionStatus('banking'),
      items: [
        { label: 'Account Name', value: applicationData.banking?.accountName || 'Not provided', required: true },
        { label: 'BSB', value: applicationData.banking?.bsb || 'Not provided', required: true },
        { label: 'Account Number', value: applicationData.banking?.accountNumber ? '****' + applicationData.banking.accountNumber.slice(-4) : 'Not provided', required: true },
        { label: 'GST Registered', value: applicationData.banking?.gstRegistered ? 'Yes' : 'No', required: true },
        { label: 'Payment Terms', value: applicationData.banking?.paymentTerms || '30 days' },
      ]
    }
  ]

  const totalSections = reviewSections.length
  const completeSections = reviewSections.filter(s => s.status === 'complete').length
  const warningSections = reviewSections.filter(s => s.status === 'warning').length
  const incompleteSections = reviewSections.filter(s => s.status === 'incomplete').length
  const completionPercentage = (completeSections / totalSections) * 100

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true)
    
    // Check for incomplete sections
    if (incompleteSections > 0) {
      toast({
        title: "Incomplete Application",
        description: `Please complete all required sections before submitting. ${incompleteSections} section(s) are incomplete.`,
        variant: "destructive" })
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Process payment
      toast({
        title: "Processing Payment",
        description: "Charging application fee of $275..." })
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onNext(data)
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Welcome to National Recovery Partners. Check your email for next steps." })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: 'complete' | 'incomplete' | 'warning') => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-blue-600" />
      case 'incomplete':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Step 7: Review & Submit Application</CardTitle>
              <CardDescription>
                Review your application details and submit for approval
              </CardDescription>
            </div>
          </div>
          <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
            {completionPercentage.toFixed(0)}% Complete
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Application Status Overview */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" />
              Application Overview
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullReview(!showFullReview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showFullReview ? 'Hide' : 'Show'} Full Review
            </Button>
          </div>

          <Progress value={completionPercentage} className="h-2" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{completeSections}</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{warningSections}</div>
              <div className="text-sm text-muted-foreground">Needs Review</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{incompleteSections}</div>
              <div className="text-sm text-muted-foreground">Incomplete</div>
            </div>
          </div>
        </div>

        {/* Section Review */}
        {showFullReview && (
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              {reviewSections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-2">
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                      {getStatusIcon(section.status)}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center py-1">
                          <span className="text-sm text-muted-foreground">
                            {item.label}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                          </span>
                          <span className={`text-sm font-medium ${item.value === 'Not provided' ? 'text-red-500' : ''}`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                      {section.status !== 'complete' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            // Navigate to specific section for editing
                            toast({
                              title: "Edit Section",
                              description: `Navigate to ${section.title} section to make changes` })
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Section
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}

        {/* Important Notices */}
        {incompleteSections > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Incomplete Application</AlertTitle>
            <AlertDescription>
              You have {incompleteSections} incomplete section(s). Please complete all required information before submitting your application.
            </AlertDescription>
          </Alert>
        )}

        {warningSections > 0 && incompleteSections === 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Review Recommended</AlertTitle>
            <AlertDescription>
              Some sections may be missing optional information. You can still submit, but providing complete information may speed up approval.
            </AlertDescription>
          </Alert>
        )}

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Application Fee (one-time)</span>
              <span className="font-semibold">$275.00</span>
            </div>
            <div className="flex justify-between">
              <span>Joining Fee (upon approval)</span>
              <span className="font-semibold">$2,200.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Due Today</span>
              <span>$275.00</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              The joining fee will be charged upon approval of your application.
            </p>
          </CardContent>
        </Card>

        {/* Confirmation Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  Confirmations & Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="confirmDataAccuracy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that all information provided is accurate and complete
                        </FormLabel>
                        <FormDescription>
                          False or misleading information may result in rejection or termination
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmTermsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the NRP Contractor Terms and Conditions
                        </FormLabel>
                        <FormDescription>
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto"
                            onClick={() => window.open('/terms', '_blank')}
                          >
                            View Terms and Conditions
                          </Button>
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPaymentAuthorized"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I authorise the payment of $275.00 application fee
                        </FormLabel>
                        <FormDescription>
                          This payment will be processed immediately upon submission
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmCommitment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I commit to maintaining NRP quality and service standards
                        </FormLabel>
                        <FormDescription>
                          Including 24/7 availability, rapid response times, and professional conduct
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToBackground"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to background and reference verification
                        </FormLabel>
                        <FormDescription>
                          NRP will verify insurance, licenses, and contact references
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="electronicSignature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Electronic Signature (Full Legal Name)</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your full legal name"
                          />
                        </FormControl>
                        <FormDescription>
                          By typing your name, you are electronically signing this application
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="signatureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Save draft functionality
              toast({
                title: "Draft Saved",
                description: "Your application has been saved. You can continue later." })
            }}
            disabled={isSubmitting}
          >
            <Download className="h-4 w-4 mr-2" />
            Save Draft
          </Button>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting || incompleteSections > 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
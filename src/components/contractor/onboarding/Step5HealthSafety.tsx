'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Heart, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Users, 
  Briefcase,
  CheckCircle2,
  Upload,
  Plus,
  X,
  Info,
  ChevronRight,
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  Activity,
  UserCheck,
  HardHat,
  Siren,
  FileCheck
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"

const safetySchema = z.object({
  // WHS Policy & Procedures
  whsPolicyDocument: z.string().min(1, "WHS policy document is required"),
  whsPolicyVersion: z.string().min(1, "Policy version is required"),
  whsPolicyReviewDate: z.string().min(1, "Review date is required"),
  safeWorkMethodStatements: z.boolean(),
  swmsCategories: z.array(z.string()).min(1, "Select at least one SWMS category"),
  
  // Safety Management System
  safetyManagementSystem: z.enum(['internal', 'external', 'hybrid']),
  safetyOfficerName: z.string().optional(),
  safetyOfficerContact: z.string().optional(),
  safetyMeetingFrequency: z.enum(['weekly', 'fortnightly', 'monthly', 'quarterly']),
  
  // Training & Competency
  inductionProcess: z.boolean(),
  trainingRecordSystem: z.enum(['digital', 'paper', 'hybrid']),
  mandatoryTraining: z.array(z.object({
    trainingType: z.string(),
    provider: z.string(),
    frequency: z.string(),
    lastCompleted: z.string()
  })),
  
  // Certifications & Tickets
  certifications: z.array(z.object({
    certificationType: z.string(),
    certNumber: z.string(),
    expiryDate: z.string(),
    holder: z.string()
  })),
  
  // PPE & Equipment
  ppeProvided: z.boolean(),
  ppeTypes: z.array(z.string()).min(1, "Select PPE types provided"),
  equipmentMaintenance: z.boolean(),
  maintenanceSchedule: z.enum(['monthly', 'quarterly', 'biannual', 'annual']),
  
  // Incident Management
  incidentReportingSystem: z.boolean(),
  incidentReportingMethod: z.enum(['digital', 'paper', 'phone', 'mixed']),
  nearMissReporting: z.boolean(),
  incidentInvestigationProcess: z.boolean(),
  workersCompClaims: z.number().min(0),
  lostTimeInjuries: z.number().min(0),
  
  // Risk Management
  riskAssessmentProcess: z.boolean(),
  hazardIdentification: z.boolean(),
  jsaProcess: z.boolean(), // Job Safety Analysis
  takesFiveImplemented: z.boolean(), // Take 5 safety checks
  
  // Emergency Procedures
  emergencyResponsePlan: z.boolean(),
  evacuationProcedures: z.boolean(),
  firstAidCapability: z.boolean(),
  firstAiders: z.array(z.object({
    name: z.string(),
    certification: z.string(),
    expiryDate: z.string()
  })),
  
  // Compliance & Auditing
  safetyAuditsFrequency: z.enum(['monthly', 'quarterly', 'biannual', 'annual', 'none']),
  externalAudits: z.boolean(),
  lastAuditDate: z.string().optional(),
  complianceScore: z.number().min(0).max(100).optional(),
  
  // Mental Health & Wellbeing
  mentalHealthPolicy: z.boolean(),
  eapProgram: z.boolean(), // Employee Assistance Program
  fatigueManagement: z.boolean(),
  
  // Additional Commitments
  commitToNRPStandards: z.boolean().refine(val => val === true, {
    message: "You must commit to NRP safety standards"
  }),
  shareIncidentData: z.boolean(),
  participateInSafetyPrograms: z.boolean()
})

type HealthSafetyFormValues = z.infer<typeof safetySchema>

interface Step5HealthSafetyProps {
  onNext: (data: HealthSafetyFormValues) => void
  onPrevious: () => void
  defaultValues?: Partial<HealthSafetyFormValues>
}

export default function Step5HealthSafety({ onNext, onPrevious, defaultValues }: Step5HealthSafetyProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const form = useForm<HealthSafetyFormValues>({
    resolver: zodResolver(safetySchema),
    defaultValues: {
      swmsCategories: [],
      mandatoryTraining: [],
      certifications: [],
      ppeTypes: [],
      workersCompClaims: 0,
      lostTimeInjuries: 0,
      firstAiders: [],
      commitToNRPStandards: false,
      shareIncidentData: false,
      participateInSafetyPrograms: false,
      ...defaultValues
    }
  })

  const onSubmit = (data: HealthSafetyFormValues) => {
    console.log('Health & Safety data:', data)
    onNext(data)
    toast({
      title: "Health & Safety Information Saved",
      description: "Your safety compliance details have been recorded.",
    })
  }

  const swmsOptions = [
    'Water Damage Restoration',
    'Fire Damage Restoration',
    'Mould Remediation',
    'Biohazard Cleaning',
    'Asbestos Work',
    'Working at Heights',
    'Confined Spaces',
    'Electrical Work',
    'Chemical Handling',
    'Heavy Machinery Operation',
    'Demolition Work',
    'Structural Repairs'
  ]

  const ppeOptions = [
    'Safety Helmets/Hard Hats',
    'Safety Glasses/Goggles',
    'Face Shields',
    'Respirators/Masks',
    'Hearing Protection',
    'High-Vis Clothing',
    'Safety Boots',
    'Gloves (Various Types)',
    'Fall Protection/Harnesses',
    'Chemical Suits',
    'Cut-Resistant Gear'
  ]

  const trainingTypes = [
    'White Card (Construction Induction)',
    'Working at Heights',
    'Confined Space Entry',
    'First Aid/CPR',
    'Fire Safety',
    'Manual Handling',
    'Hazardous Substances',
    'Asbestos Awareness',
    'Electrical Safety',
    'Emergency Response',
    'Mental Health First Aid'
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-centre space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Step 5: Health & Safety Compliance</CardTitle>
            <CardDescription>
              Provide details about your workplace health and safety systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Safety Score Overview */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Safety Excellence Standards</AlertTitle>
              <AlertDescription>
                NRP maintains the highest safety standards in the industry. Your commitment to safety directly impacts your contractor rating and lead allocation.
              </AlertDescription>
            </Alert>

            {/* WHS Policy Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <FileText className="h-5 w-5" />
                WHS Policy & Procedures
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="whsPolicyDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WHS Policy Document</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input {...field} placeholder="Policy document name" />
                          <Button type="button" variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whsPolicyVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Version</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., v2.1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whsPolicyReviewDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Review Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="safeWorkMethodStatements"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          SWMS Available
                        </FormLabel>
                        <FormDescription>
                          Safe Work Method Statements
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="swmsCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWMS Categories Available</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {swmsOptions.map((option) => (
                        <div key={option} className="flex items-centre space-x-2">
                          <Checkbox
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...(field.value || []), option]
                                : field.value?.filter((val) => val !== option) || []
                              field.onChange(updated)
                            }}
                          />
                          <Label className="text-sm font-normal">{option}</Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Safety Management System */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <Briefcase className="h-5 w-5" />
                Safety Management System
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="safetyManagementSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Management Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select management type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="internal">Internal Management</SelectItem>
                          <SelectItem value="external">External Provider</SelectItem>
                          <SelectItem value="hybrid">Hybrid System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="safetyMeetingFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Meeting Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="fortnightly">Fortnightly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="safetyOfficerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Officer Name (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name of safety officer" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="safetyOfficerContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Safety Officer Contact (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone or email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Training & Competency */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <UserCheck className="h-5 w-5" />
                Training & Competency
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="inductionProcess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Site Induction Process
                        </FormLabel>
                        <FormDescription>
                          New worker induction system
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingRecordSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Record System</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select system type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="digital">Digital System</SelectItem>
                          <SelectItem value="paper">Paper Based</SelectItem>
                          <SelectItem value="hybrid">Hybrid System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* PPE & Equipment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <HardHat className="h-5 w-5" />
                PPE & Equipment Safety
              </h3>

              <FormField
                control={form.control}
                name="ppeProvided"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        PPE Provided to Workers
                      </FormLabel>
                      <FormDescription>
                        Company provides required personal protective equipment
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ppeTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Types of PPE Provided</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {ppeOptions.map((option) => (
                        <div key={option} className="flex items-centre space-x-2">
                          <Checkbox
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...(field.value || []), option]
                                : field.value?.filter((val) => val !== option) || []
                              field.onChange(updated)
                            }}
                          />
                          <Label className="text-sm font-normal">{option}</Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="equipmentMaintenance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Equipment Maintenance Program
                        </FormLabel>
                        <FormDescription>
                          Regular equipment inspection & maintenance
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceSchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="biannual">Bi-Annual</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Incident Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <Siren className="h-5 w-5" />
                Incident Management
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="incidentReportingSystem"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Incident Reporting System
                        </FormLabel>
                        <FormDescription>
                          Formal incident reporting process
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incidentReportingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reporting Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="digital">Digital/App</SelectItem>
                          <SelectItem value="paper">Paper Forms</SelectItem>
                          <SelectItem value="phone">Phone Reporting</SelectItem>
                          <SelectItem value="mixed">Mixed Methods</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workersCompClaims"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workers Comp Claims (Last 12 months)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lostTimeInjuries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lost Time Injuries (Last 12 months)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nearMissReporting"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Near Miss Reporting
                        </FormLabel>
                        <FormDescription>
                          System for reporting near misses
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incidentInvestigationProcess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Incident Investigation Process
                        </FormLabel>
                        <FormDescription>
                          Formal investigation procedures
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Risk Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Management
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="riskAssessmentProcess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Risk Assessment Process
                        </FormLabel>
                        <FormDescription>
                          Formal risk assessment procedures
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hazardIdentification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Hazard Identification System
                        </FormLabel>
                        <FormDescription>
                          Process for identifying hazards
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jsaProcess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Job Safety Analysis (JSA)
                        </FormLabel>
                        <FormDescription>
                          JSA conducted for high-risk tasks
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="takesFiveImplemented"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Take 5 Safety Checks
                        </FormLabel>
                        <FormDescription>
                          Pre-task safety assessment
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Emergency Procedures */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <Activity className="h-5 w-5" />
                Emergency Procedures
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyResponsePlan"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Emergency Response Plan
                        </FormLabel>
                        <FormDescription>
                          Documented emergency procedures
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="evacuationProcedures"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Evacuation Procedures
                        </FormLabel>
                        <FormDescription>
                          Site evacuation plans
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstAidCapability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          First Aid Capability
                        </FormLabel>
                        <FormDescription>
                          Trained first aiders on staff
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Compliance & Auditing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <FileCheck className="h-5 w-5" />
                Compliance & Auditing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="safetyAuditsFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internal Safety Audit Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="biannual">Bi-Annual</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="externalAudits"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          External Safety Audits
                        </FormLabel>
                        <FormDescription>
                          Third-party safety audits conducted
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastAuditDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Audit Date (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complianceScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compliance Score % (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          min="0" 
                          max="100"
                          placeholder="0-100"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Latest audit compliance score
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Mental Health & Wellbeing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-centre gap-2">
                <Heart className="h-5 w-5" />
                Mental Health & Wellbeing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="mentalHealthPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Mental Health Policy
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eapProgram"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          EAP Program
                        </FormLabel>
                        <FormDescription>
                          Employee Assistance Program
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatigueManagement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-centre space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Fatigue Management
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* NRP Safety Commitments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-centre gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  NRP Safety Commitments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="commitToNRPStandards"
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
                          Commit to NRP Safety Standards
                        </FormLabel>
                        <FormDescription>
                          I commit to maintaining the highest safety standards as required by NRP
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shareIncidentData"
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
                          Share Incident Data
                        </FormLabel>
                        <FormDescription>
                          Agree to share anonymized safety data for industry improvement
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participateInSafetyPrograms"
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
                          Participate in Safety Programs
                        </FormLabel>
                        <FormDescription>
                          Willing to participate in NRP safety initiatives and training programs
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Safety Excellence Badge */}
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Safety Excellence Recognition</AlertTitle>
              <AlertDescription>
                Contractors with exceptional safety records receive priority lead allocation and can earn the NRP Safety Excellence badge.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button type="submit">
              Next Step
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
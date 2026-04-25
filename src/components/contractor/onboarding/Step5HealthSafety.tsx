'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Shield,
  CheckCircle2,
  ChevronRight,
  ArrowLeft } from 'lucide-react'
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import {
  safetySchema,
  type HealthSafetyFormValues } from './step5/types'
import WhsPolicySection from './step5/WhsPolicySection'
import SafetyManagementSection from './step5/SafetyManagementSection'
import TrainingCompetencySection from './step5/TrainingCompetencySection'
import PpeEquipmentSection from './step5/PpeEquipmentSection'
import IncidentManagementSection from './step5/IncidentManagementSection'
import RiskManagementSection from './step5/RiskManagementSection'
import EmergencyProceduresSection from './step5/EmergencyProceduresSection'
import ComplianceAuditingSection from './step5/ComplianceAuditingSection'
import MentalHealthSection from './step5/MentalHealthSection'
import NrpgCommitmentsSection from './step5/NrpgCommitmentsSection'

interface Step5HealthSafetyProps {
  onNext: (data: HealthSafetyFormValues) => void
  onPrevious: () => void
  defaultValues?: Partial<HealthSafetyFormValues>
}

export default function Step5HealthSafety({ onNext, onPrevious, defaultValues }: Step5HealthSafetyProps) {
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
      description: "Your safety compliance details have been recorded." })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
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
                NRPG maintains the highest safety standards in the industry. Your commitment to safety directly impacts your contractor rating and lead allocation.
              </AlertDescription>
            </Alert>

            <WhsPolicySection control={form.control} />
            <Separator />
            <SafetyManagementSection control={form.control} />
            <Separator />
            <TrainingCompetencySection control={form.control} />
            <Separator />
            <PpeEquipmentSection control={form.control} />
            <Separator />
            <IncidentManagementSection control={form.control} />
            <Separator />
            <RiskManagementSection control={form.control} />
            <Separator />
            <EmergencyProceduresSection control={form.control} />
            <Separator />
            <ComplianceAuditingSection control={form.control} />
            <Separator />
            <MentalHealthSection control={form.control} />
            <Separator />
            <NrpgCommitmentsSection control={form.control} />

            {/* Safety Excellence Badge */}
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Safety Excellence Recognition</AlertTitle>
              <AlertDescription>
                Contractors with exceptional safety records receive priority lead allocation and can earn the NRPG Safety Excellence badge.
              </AlertDescription>
            </Alert>
          </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="w-full sm:w-auto h-12 px-8 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-all duration-200 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Next Step
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

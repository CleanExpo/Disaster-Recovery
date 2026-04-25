import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel } from "@/components/ui/form"
import { Step5SectionProps } from './types'

function RiskManagementSection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Risk Management
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="riskAssessmentProcess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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
          control={control}
          name="hazardIdentification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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
          control={control}
          name="jsaProcess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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
          control={control}
          name="takesFiveImplemented"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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
  )
}

export default React.memo(RiskManagementSection)

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Activity } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel } from "@/components/ui/form"
import { Step5SectionProps } from './types'

function EmergencyProceduresSection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Emergency Procedures
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="emergencyResponsePlan"
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
          control={control}
          name="evacuationProcedures"
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
          control={control}
          name="firstAidCapability"
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
  )
}

export default React.memo(EmergencyProceduresSection)

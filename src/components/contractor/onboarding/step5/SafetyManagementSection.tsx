import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import { Step5SectionProps } from './types'

function SafetyManagementSection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        Safety Management System
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
  )
}

export default React.memo(SafetyManagementSection)

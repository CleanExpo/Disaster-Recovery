import React from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Siren } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import { Step5SectionProps } from './types'

function IncidentManagementSection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Siren className="h-5 w-5" />
        Incident Management
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="incidentReportingSystem"
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name="nearMissReporting"
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
          control={control}
          name="incidentInvestigationProcess"
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
  )
}

export default React.memo(IncidentManagementSection)

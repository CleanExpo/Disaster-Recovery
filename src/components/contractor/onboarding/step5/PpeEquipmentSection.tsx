import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HardHat } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import { Step5SectionProps, ppeOptions } from './types'

function PpeEquipmentSection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <HardHat className="h-5 w-5" />
        PPE & Equipment Safety
      </h3>

      <FormField
        control={control}
        name="ppeProvided"
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
        control={control}
        name="ppeTypes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Types of PPE Provided</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ppeOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
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
          control={control}
          name="equipmentMaintenance"
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
          control={control}
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
  )
}

export default React.memo(PpeEquipmentSection)

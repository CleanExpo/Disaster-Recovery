import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Upload } from 'lucide-react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import { Step5SectionProps, swmsOptions } from './types'

function WhsPolicySection({ control }: Step5SectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FileText className="h-5 w-5" />
        WHS Policy & Procedures
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name="safeWorkMethodStatements"
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
        control={control}
        name="swmsCategories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SWMS Categories Available</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {swmsOptions.map((option) => (
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
    </div>
  )
}

export default React.memo(WhsPolicySection)

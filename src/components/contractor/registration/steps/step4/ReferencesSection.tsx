import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  Trash2,
  Plus,
  CheckCircle,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { type Step4Control, RELATIONSHIP_TYPES, formatPhoneNumber } from './types';

function ReferencesSection({ control }: { control: Step4Control }) {
  const {
    references,
    updateReference,
    addReference,
    removeReference,
    validationStatus,
    errors,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Business References
        </CardTitle>
        <CardDescription>
          Professional endorsements from clients or partners (minimum 2 required)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.map((ref, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Reference {index + 1}</h4>
              {references.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReference(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Reference Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="John Smith"
                  value={ref.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  className={errors[`reference.${index}.name`] ? 'border-red-600' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Company/Organisation <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="ABC Insurance"
                  value={ref.companyName}
                  onChange={(e) => updateReference(index, 'companyName', e.target.value)}
                  className={errors[`reference.${index}.companyName`] ? 'border-red-600' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Relationship <span className="text-red-500">*</span>
                </Label>
                <select
                  value={ref.relationship}
                  onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select relationship</option>
                  {RELATIONSHIP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <Input
                    type="tel"
                    placeholder="Contact Form"
                    value={ref.phone}
                    onChange={(e) =>
                      updateReference(index, 'phone', formatPhoneNumber(e.target.value))
                    }
                    className={errors[`reference.${index}.phone`] ? 'border-red-600' : ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contact Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <Input
                    type="email"
                    placeholder="reference@company.com"
                    value={ref.email}
                    onChange={(e) => updateReference(index, 'email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Project/Relationship Description</Label>
                <Textarea
                  placeholder="Describe the nature of your work relationship and any notable projects..."
                  value={ref.projectDescription}
                  onChange={(e) =>
                    updateReference(index, 'projectDescription', e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-3 md:col-span-2">
                <Checkbox
                  id={`can-contact-${index}`}
                  checked={ref.canContact}
                  onCheckedChange={(checked) =>
                    updateReference(index, 'canContact', checked as boolean)
                  }
                />
                <Label
                  htmlFor={`can-contact-${index}`}
                  className="font-normal cursor-pointer"
                >
                  This reference can be contacted for verification
                </Label>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addReference} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Reference
        </Button>

        {validationStatus.references && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {references.filter((r) => r.name && r.phone).length} valid references provided
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(ReferencesSection);

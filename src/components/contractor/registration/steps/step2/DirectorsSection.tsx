'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Users } from 'lucide-react';
import type { Step2Control } from './types';

function DirectorsSection({
  directors,
  updateDirector,
  addDirector,
  removeDirector,
}: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Director Names & Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {directors.map((director, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Director {index + 1}</h4>
              {directors.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDirector(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>
                  Director Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="John Smith"
                  value={director.name}
                  onChange={(e) => updateDirector(index, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  placeholder="0400 000 000"
                  value={director.phone}
                  onChange={(e) => updateDirector(index, 'phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  placeholder="director@company.com.au"
                  value={director.email}
                  onChange={(e) => updateDirector(index, 'email', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addDirector} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Director
        </Button>

        <p className="text-xs text-gray-700">Responsible persons for business operations</p>
      </CardContent>
    </Card>
  );
}

export default React.memo(DirectorsSection);

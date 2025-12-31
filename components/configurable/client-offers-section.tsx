'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase } from 'lucide-react';

export default function ClientOffersSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Dispatch Status</h2>
            <p className="text-white/80">Contractors are assigned automatically by NRPG</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">Auto</p>
            <p className="text-white/80">Dispatch</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-100">
            <Briefcase className="h-5 w-5" />
            Private Contractor Network
          </CardTitle>
          <CardDescription className="text-gray-400">
            Contractor identities are kept private. NRPG dispatches vetted, insured, and qualified contractors automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator className="bg-gray-700" />
          <div className="text-sm text-gray-300 space-y-2">
            <p>You’ll receive status updates as your job progresses (dispatch, on-site, and completion).</p>
            <p className="text-gray-400">
              If you need to update access details or job notes, message NRPG support from your dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

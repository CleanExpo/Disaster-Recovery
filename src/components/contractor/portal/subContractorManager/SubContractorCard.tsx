'use client';

import { memo } from 'react';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubContractor, SubContractorEngagement, TRADE_TYPE_LABELS } from '@/types/sub-contractor';
import { ENGAGEMENT_STATUS_CONFIG, ONBOARDING_STATUS_CONFIG, formatDate } from './types';

export interface SubContractorCardProps {
  subContractor: SubContractor;
  engagements: SubContractorEngagement[];
  onAddEngagement: (sc: SubContractor) => void;
}

export const SubContractorCard = memo(function SubContractorCard({
  subContractor: sc,
  engagements,
  onAddEngagement,
}: SubContractorCardProps) {
  const statusCfg = ONBOARDING_STATUS_CONFIG[sc.onboardingStatus];
  const activeEngagements = engagements.filter(
    (e) => e.subContractorId === sc.id && e.status !== 'CANCELLED',
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{sc.businessName}</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {TRADE_TYPE_LABELS[sc.tradeType]} · ABN {sc.abn}
            </CardDescription>
          </div>
          <Badge className={`${statusCfg.colour} text-xs shrink-0`}>{statusCfg.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Contact</p>
            <p className="font-medium">{sc.contactName}</p>
            <p className="text-gray-700">{sc.contactEmail}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Licence</p>
            <p className="font-medium">
              {sc.licenceState} — {sc.licenceNumber}
            </p>
            <p className="text-gray-700">Expires {formatDate(sc.licenceExpiry)}</p>
          </div>
        </div>

        {activeEngagements.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Engagements</p>
            <div className="space-y-1">
              {activeEngagements.slice(0, 3).map((e) => {
                const engCfg = ENGAGEMENT_STATUS_CONFIG[e.status];
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between text-xs bg-gray-50 rounded px-2 py-1"
                  >
                    <span className="text-gray-700 truncate mr-2">Job {e.jobId.slice(-6)}</span>
                    <Badge className={`${engCfg.colour} text-xs`}>{engCfg.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sc.onboardingStatus === 'COMPLETE' && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => onAddEngagement(sc)}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add to Job
          </Button>
        )}
        {sc.onboardingStatus !== 'COMPLETE' && (
          <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
            Onboarding must be completed before engaging on a job.
          </p>
        )}
      </CardContent>
    </Card>
  );
});

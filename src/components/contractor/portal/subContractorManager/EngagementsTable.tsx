'use client';

import { memo } from 'react';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SubContractor, SubContractorEngagement, TRADE_TYPE_LABELS } from '@/types/sub-contractor';
import { ENGAGEMENT_STATUS_CONFIG, formatAud, formatDate } from './types';

export interface EngagementsTableProps {
  engagements: SubContractorEngagement[];
  subContractors: SubContractor[];
}

export const EngagementsTable = memo(function EngagementsTable({
  engagements,
  subContractors,
}: EngagementsTableProps) {
  if (engagements.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No engagements yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Engagements will appear here once a sub-contractor has been added to a job.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sub-Contractor</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Job</TableHead>
            <TableHead className="text-right">Sub Invoice</TableHead>
            <TableHead className="text-right">Customer Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {engagements.map((e) => {
            const sc = subContractors.find((s) => s.id === e.subContractorId);
            const statusCfg = ENGAGEMENT_STATUS_CONFIG[e.status];
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium">
                  {sc?.businessName ?? e.subContractorId}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {TRADE_TYPE_LABELS[e.tradeType]}
                </TableCell>
                <TableCell className="text-sm font-mono">{e.jobId.slice(-8)}</TableCell>
                <TableCell className="text-right text-sm">
                  {formatAud(e.subInvoiceAmount)}
                </TableCell>
                <TableCell className="text-right text-sm font-semibold">
                  {formatAud(e.customerChargeTotalIncGst)}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusCfg.colour} text-xs`}>{statusCfg.label}</Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{formatDate(e.createdAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

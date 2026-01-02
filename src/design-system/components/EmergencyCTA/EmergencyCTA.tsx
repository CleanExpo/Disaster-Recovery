/**
 * DesignOS Emergency CTA Component
 *
 * Dual-path CTA for crisis users:
 * - Call Now (phone - immediate)
 * - Get Help Online (form - slightly less urgent)
 *
 * Strategic decision: Reduce decision paralysis by offering both options
 * Mobile: Full-width stacked
 * Desktop: Side-by-side cards
 */

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../Button/Button';
import { Phone, MessageSquare, Zap, CheckCircle } from 'lucide-react';

export interface EmergencyCTAProps {
  phoneNumber?: string;
  onlineHelpUrl?: string;
  className?: string;
}

export function EmergencyCTA({
  phoneNumber = '1300 309 361',
  onlineHelpUrl = '/dashboard/client/requests/new?emergency=true',
  className,
}: EmergencyCTAProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {/* Emergency Service Card (Red - Call Now) */}
      <Card className="border-red-500 hover:border-red-600 transition-colors cursor-pointer group">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-600">🚨 EMERGENCY SERVICE</h3>
              <p className="text-sm text-muted-foreground">Get Help Now</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Fast-track: Name, Phone, Address only (3 min)
          </p>
          <Button
            variant="emergency-primary"
            size="crisis-full"
            className="w-full"
            onClick={() => window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call {phoneNumber}
          </Button>
        </CardContent>
      </Card>

      {/* Complete Profile Card (Green - Online Help) */}
      <Card className="border-green-500 hover:border-green-600 transition-colors cursor-pointer group">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-600">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground">Recommended</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Full setup: Better matching, priority support (15 min)
          </p>
          <Button
            variant="education-primary"
            size="lg"
            className="w-full"
            asChild
          >
            <Link href={onlineHelpUrl}>
              <MessageSquare className="mr-2 h-5 w-5" />
              Get Help Online
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Mobile-optimized Emergency CTA (sticky bottom)
 * Use on emergency intake forms for persistent access
 */
export function StickyEmergencyCTA({ phoneNumber = '1300 309 361' }: { phoneNumber?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent shadow-lg z-50 md:hidden">
      <Button
        variant="emergency-primary"
        size="crisis-full"
        className="w-full"
        onClick={() => window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`}
      >
        <Phone className="mr-2 h-5 w-5" />
        Call Emergency: {phoneNumber}
      </Button>
    </div>
  );
}

// Import cn utility if not exists
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

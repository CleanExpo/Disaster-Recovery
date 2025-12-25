'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Trophy, Crown } from 'lucide-react';

interface CertificationBadgeProps {
  certificationType: string;
  completionPercentage: number;
}

export function CertificationBadge({ certificationType, completionPercentage }: CertificationBadgeProps) {
  const getCertificationLevel = () => {
    if (completionPercentage >= 100) {
      return {
        level: 'CERTIFIED',
        icon: Trophy,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-600',
        label: 'Certified Professional',
      };
    } else if (completionPercentage >= 75) {
      return {
        level: 'ADVANCED',
        icon: Crown,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-600',
        label: 'Advanced Level',
      };
    } else if (completionPercentage >= 50) {
      return {
        level: 'INTERMEDIATE',
        icon: Star,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-600',
        label: 'Intermediate Level',
      };
    } else {
      return {
        level: 'BEGINNER',
        icon: Award,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-600',
        label: 'Beginner Level',
      };
    }
  };

  const certification = getCertificationLevel();
  const Icon = certification.icon;

  return (
    <Card className={`${certification.bgColor} border-2 ${certification.borderColor}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${certification.bgColor}`}>
            <Icon className={`h-8 w-8 ${certification.color}`} />
          </div>
          <div>
            <Badge variant="outline" className={`${certification.color} border-current mb-1`}>
              {certification.level}
            </Badge>
            <p className="text-sm font-medium">{certification.label}</p>
            {completionPercentage < 100 && (
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(100 - completionPercentage)}% to certification
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

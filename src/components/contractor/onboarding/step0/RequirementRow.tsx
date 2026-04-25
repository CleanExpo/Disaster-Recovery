'use client';

import { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const RequirementRow = memo(function RequirementRow({
  satisfied,
  children,
}: {
  satisfied: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          satisfied ? 'bg-emerald-600 text-white' : 'bg-slate-700/80 border border-slate-600'
        }`}
      >
        {satisfied && <CheckCircle2 className="h-3.5 w-3.5" />}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
});

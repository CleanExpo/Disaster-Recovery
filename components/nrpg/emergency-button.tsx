/**
 * Emergency Button Component - NRPG Brand
 *
 * Distinctive emergency CTA button matching Phil McGurk's 15-year brand
 * Prominently displays 1300 309 361 with emergency red styling
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { EMERGENCY_PHONE } from '@/lib/design-tokens';

interface EmergencyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'lg' | 'xl';
  showPulse?: boolean;
  label?: string;
}

export function EmergencyButton({
  className,
  size = 'default',
  showPulse = true,
  label,
  ...props
}: EmergencyButtonProps) {
  const sizeClasses = {
    default: 'px-7 py-3 text-sm',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-2xl',
  };

  return (
    <button
      onClick={() => window.location.href = EMERGENCY_PHONE.href}
      className={cn(
        'bg-nrpg-red hover:bg-nrpg-red/90 text-white rounded-3xl font-black',
        'shadow-2xl shadow-nrpg-red/30 hover:shadow-nrpg-red/40',
        'transition-all duration-300',
        'active:scale-95',
        'flex items-center gap-2',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      )}
      {label || EMERGENCY_PHONE.number}
    </button>
  );
}

// Variant: With label above number
export function EmergencyButtonLabeled({
  label = EMERGENCY_PHONE.labels.primary,
  className,
  ...props
}: Omit<EmergencyButtonProps, 'label'> & { label?: string }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      <EmergencyButton {...props} className={className} />
    </div>
  );
}

// Variant: Inline with icon
export function EmergencyButtonInline({
  icon,
  className,
  ...props
}: EmergencyButtonProps & { icon?: React.ReactNode }) {
  return (
    <EmergencyButton
      className={cn('gap-3', className)}
      showPulse={false}
      {...props}
    >
      {icon}
      <span>{EMERGENCY_PHONE.number}</span>
    </EmergencyButton>
  );
}

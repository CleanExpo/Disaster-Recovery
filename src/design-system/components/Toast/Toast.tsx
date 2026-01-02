/**
 * DesignOS Toast Notification Component
 *
 * Global notifications for success, error, warnings, info
 * Auto-refresh notifications (30-second polling in CRM)
 *
 * Strategic decision: Subtle notifications (not intrusive)
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  message?: string;
  duration?: number; // ms, 0 = no auto-dismiss
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    titleColor: 'text-green-900',
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    titleColor: 'text-red-900',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    titleColor: 'text-amber-900',
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    titleColor: 'text-blue-900',
  },
};

export function Toast({
  variant = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  action,
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const config = variantConfig[variant];
  const Icon = config.icon;

  // Auto-dismiss after duration
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-20 right-4 z-50',
        'max-w-md w-full',
        'rounded-lg border shadow-lg',
        'p-4',
        'animate-in slide-in-from-right',
        config.bgColor,
        config.borderColor
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconColor)} />

        {/* Content */}
        <div className="flex-1">
          <p className={cn('font-semibold text-sm', config.titleColor)}>{title}</p>
          {message && <p className="text-sm text-gray-700 mt-1">{message}</p>}

          {/* Action button */}
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                'text-sm font-medium underline mt-2',
                config.iconColor
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Example usage:
 *
 * // Success notification
 * <Toast
 *   variant="success"
 *   title="Payment processed"
 *   message="Your subscription has been activated"
 *   duration={5000}
 *   onClose={() => setShowToast(false)}
 * />
 *
 * // CRM auto-refresh notification (strategic decision: 30-second polling)
 * <Toast
 *   variant="info"
 *   title="2 new incidents"
 *   message="Critical sewage backup in Sydney CBD"
 *   duration={5000}
 *   action={{
 *     label: 'View Now',
 *     onClick: () => router.push('/crm/incidents')
 *   }}
 * />
 */

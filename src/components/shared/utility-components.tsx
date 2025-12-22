'use client';

import React from 'react';
import { AlertCircle, Loader, Home } from 'lucide-react';

// Loading Skeleton
export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-12 bg-slate-200 rounded-lg mb-3"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-slate-200 rounded flex-1"></div>
            <div className="h-8 bg-slate-200 rounded flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Loading Spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <Loader className={`${sizeClasses[size]} animate-spin text-blue-600`} />
    </div>
  );
}

// Empty State Component
export function EmptyState({
  title,
  description,
  action,
  icon = <Home className="w-12 h-12 text-slate-400" />,
}: {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-center mb-6 max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Error Alert Component
export function ErrorAlert({
  title,
  message,
  onDismiss,
}: {
  title: string;
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900">{title}</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Success Alert Component
export function SuccessAlert({
  title,
  message,
  onDismiss,
}: {
  title: string;
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex gap-3">
        <div className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-green-900">{title}</h3>
          <p className="text-sm text-green-700 mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Warning Alert Component
export function WarningAlert({
  title,
  message,
  onDismiss,
}: {
  title: string;
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900">{title}</h3>
          <p className="text-sm text-yellow-700 mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Info Alert Component
export function InfoAlert({
  title,
  message,
  onDismiss,
}: {
  title: string;
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900">{title}</h3>
          <p className="text-sm text-blue-700 mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Data Table Header
export function TableHeader({
  columns,
}: {
  columns: Array<{ label: string; width?: string }>;
}) {
  return (
    <thead>
      <tr className="border-b border-slate-200 bg-slate-50">
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`px-4 py-3 text-left text-sm font-semibold text-slate-900 ${col.width || ''}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// Data Table Row
export function TableRow({
  cells,
  onClick,
  hover = true,
}: {
  cells: React.ReactNode[];
  onClick?: () => void;
  hover?: boolean;
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-slate-100 ${
        hover && onClick ? 'hover:bg-slate-50 cursor-pointer' : ''
      }`}
    >
      {cells.map((cell, idx) => (
        <td key={idx} className="px-4 py-3 text-sm text-slate-900">
          {cell}
        </td>
      ))}
    </tr>
  );
}

// Card Container
export function Card({
  children,
  className = '',
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 ${
        hover ? 'hover:border-slate-300 hover:shadow-md transition-all' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Metric Card
export function MetricCard({
  label,
  value,
  unit,
  icon,
  trend,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-600">{label}</p>
        {icon && <div className="text-slate-500">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {unit && <p className="text-sm text-slate-600">{unit}</p>}
      </div>
      {trend && (
        <p
          className={`text-xs font-semibold ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
        </p>
      )}
    </Card>
  );
}

// Divider
export function Divider() {
  return <div className="h-px bg-slate-200"></div>;
}

// Badge (Simple)
export function Badge({
  label,
  variant = 'default',
}: {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}) {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}

// Progress Bar
export function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
}

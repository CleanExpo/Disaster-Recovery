'use client';

import React from 'react';
import { CheckCircle2, Inbox, AlertCircle, Loader2 } from 'lucide-react';

export type AgStep = {
  id: number;
  label: string;
};

type AgStepProgressProps = {
  steps: AgStep[];
  current: number;
  className?: string;
};

/** Labelled horizontal step progress for multi-step emergency / apply forms. */
export function AgStepProgress({ steps, current, className = '' }: AgStepProgressProps) {
  return (
    <nav
      aria-label="Form progress"
      className={`ag-step-progress ${className}`.trim()}
    >
      <ol className="ag-step-progress-list">
        {steps.map((s, i) => {
          const done = current > s.id;
          const active = current === s.id;
          return (
            <li
              key={s.id}
              className={`ag-step-progress-item${done ? ' is-done' : ''}${active ? ' is-active' : ''}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="ag-step-progress-marker" aria-hidden="true">
                {done ? <CheckCircle2 className="h-4 w-4" /> : s.id}
              </span>
              <span className="ag-step-progress-label">{s.label}</span>
              {i < steps.length - 1 && <span className="ag-step-progress-connector" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type AgFormShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
};

/** White card shell on AG background for claim / book / apply forms. */
export function AgFormShell({ children, title, subtitle, className = '' }: AgFormShellProps) {
  return (
    <div className={`ag-form-shell ${className}`.trim()}>
      {(title || subtitle) && (
        <header className="ag-form-shell-header">
          {title && <h2 className="ag-form-shell-title">{title}</h2>}
          {subtitle && <p className="ag-form-shell-subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="ag-form-shell-body">{children}</div>
    </div>
  );
}

type AgFieldClusterProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AgFieldCluster({ title, icon, children, className = '' }: AgFieldClusterProps) {
  return (
    <section className={`ag-field-cluster ${className}`.trim()}>
      <h3 className="ag-field-cluster-title">
        {icon}
        {title}
      </h3>
      <div className="ag-field-cluster-body">{children}</div>
    </section>
  );
}

type AgEmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function AgEmptyState({ title, description, action }: AgEmptyStateProps) {
  return (
    <div className="ag-empty-state" role="status">
      <Inbox className="ag-empty-state-icon" aria-hidden="true" />
      <p className="ag-empty-state-title">{title}</p>
      {description && <p className="ag-empty-state-desc">{description}</p>}
      {action && <div className="ag-empty-state-action">{action}</div>}
    </div>
  );
}

type AgLoadingStateProps = {
  label?: string;
};

export function AgLoadingState({ label = 'Loading…' }: AgLoadingStateProps) {
  return (
    <div className="ag-loading-state" role="status" aria-live="polite">
      <Loader2 className="ag-loading-state-icon animate-spin" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

type AgErrorStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function AgErrorState({
  title = 'Something went wrong',
  description = 'Please try again. If the problem continues, call 1300 309 361.',
  action,
}: AgErrorStateProps) {
  return (
    <div className="ag-error-state" role="alert">
      <AlertCircle className="ag-error-state-icon" aria-hidden="true" />
      <p className="ag-error-state-title">{title}</p>
      <p className="ag-error-state-desc">{description}</p>
      {action && <div className="ag-error-state-action">{action}</div>}
    </div>
  );
}

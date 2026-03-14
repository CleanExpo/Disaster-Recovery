'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  ChevronUp,
  DollarSign,
  FileText,
  Receipt,
  Shield,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';

const RATES: Record<string, Array<{ 'Service Item': string; Unit: string; Rate: string }>> = {
  'Water Damage': [
    { 'Service Item': 'Callout/Assessment', Unit: '$350 per job', Rate: '' },
    { 'Service Item': 'Labour', Unit: '$145 per hour', Rate: '' },
    { 'Service Item': 'Water Extraction Cat1', Unit: '$12 per m²', Rate: '' },
    { 'Service Item': 'Dehumidifier', Unit: '$95 per day', Rate: '' },
    { 'Service Item': 'Air Mover', Unit: '$55 per day', Rate: '' },
    { 'Service Item': 'Structural Drying', Unit: '$185 per day', Rate: '' },
  ],
  'Mould Remediation': [
    { 'Service Item': 'Callout', Unit: '$350 per job', Rate: '' },
    { 'Service Item': 'Labour', Unit: '$145/hr', Rate: '' },
    { 'Service Item': 'Mould Treatment', Unit: '$18/m²', Rate: '' },
    { 'Service Item': 'Containment Setup', Unit: '$450 per job', Rate: '' },
    { 'Service Item': 'HEPA Vacuuming', Unit: '$8/m²', Rate: '' },
    { 'Service Item': 'Antimicrobial Treatment', Unit: '$14/m²', Rate: '' },
  ],
  'Fire & Smoke': [
    { 'Service Item': 'Callout', Unit: '$350', Rate: '' },
    { 'Service Item': 'Labour', Unit: '$145/hr', Rate: '' },
    { 'Service Item': 'Smoke Cleaning', Unit: '$16/m²', Rate: '' },
    { 'Service Item': 'Deodorisation', Unit: '$12/m²', Rate: '' },
    { 'Service Item': 'Ozone Treatment', Unit: '$650 per job', Rate: '' },
  ],
  'Storm Damage': [
    { 'Service Item': 'Callout', Unit: '$350', Rate: '' },
    { 'Service Item': 'Labour', Unit: '$145/hr', Rate: '' },
    { 'Service Item': 'Tarping', Unit: '$22/m²', Rate: '' },
    { 'Service Item': 'Debris Removal', Unit: '$180/m³', Rate: '' },
    { 'Service Item': 'Structural Assessment', Unit: '$550 per job', Rate: '' },
  ],
  Biohazard: [
    { 'Service Item': 'Callout', Unit: '$350', Rate: '' },
    { 'Service Item': 'Labour', Unit: '$145/hr', Rate: '' },
    { 'Service Item': 'Biohazard Cleaning', Unit: '$45/m²', Rate: '' },
    { 'Service Item': 'Waste Disposal', Unit: '$35/bag', Rate: '' },
    { 'Service Item': 'Sanitisation', Unit: '$28/m²', Rate: '' },
  ],
};

const CATEGORY_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444'];

const MIN_CHARGE = 2750;

export default function RatesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Water Damage');

  const categoryStats = useMemo(() => {
    return Object.entries(RATES).map(([name, items]) => ({
      name,
      count: items.length,
      items,
    }));
  }, []);

  const pieData = useMemo(
    () => categoryStats.map((c, i) => ({ name: c.name, value: c.count, fill: CATEGORY_COLORS[i % CATEGORY_COLORS.length] })),
    [categoryStats]
  );

  const totalLineItems = useMemo(() => categoryStats.reduce((s, c) => s + c.count, 0), [categoryStats]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AntigravityNavbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
                <Receipt className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  NRPG Professional Rate Schedule
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Transparent pricing for contractors and insurers — all rates AUD ex GST
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools/cost-estimator"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Calculator className="h-4 w-4" />
                Get cost estimate
              </Link>
              <Link
                href="/claim"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
                style={{ backgroundColor: '#dc2626' }}
              >
                Lodge a claim
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* KPI cards */}
        <section className="mb-8">
          <h2 className="sr-only">Rate schedule overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Service categories</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{categoryStats.length}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Line items</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{totalLineItems}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Minimum charge</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-900">${MIN_CHARGE.toLocaleString()}</p>
                  <p className="text-xs text-emerald-600">ex GST per callout</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Framework</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">NRPG Professional</p>
                  <p className="text-xs text-gray-500">Last reviewed Mar 2026</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="mb-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Items per category
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={({ name, value }) => `${name} (${value})`}
                      labelLine={{ stroke: '#9ca3af' }}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={entry.name} fill={entry.fill} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: number, name: string) => [value, `${name} items`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Line items by category
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryStats} margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      angle={-25}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={28} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: number) => [value, 'Items']}
                    />
                    <Bar dataKey="count" name="Items" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Rate tables by category */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Rates by category</h2>
          <div className="space-y-4">
            {categoryStats.map(({ name, items }, idx) => {
              const isExpanded = expandedCategory === name;
              return (
                <div
                  key={name}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(isExpanded ? null : name)}
                    className="flex w-full items-center justify-between border-b border-gray-100 bg-gray-50/80 px-6 py-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}20` }}
                      >
                        <Zap
                          className="h-5 w-5"
                          style={{ color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                        />
                      </div>
                      <span className="font-semibold text-gray-900">{name}</span>
                      <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {items.length} items
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/80">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Service item
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Unit
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Rate (AUD ex GST)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {items.map((row) => (
                            <tr key={row['Service Item']} className="transition-colors hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-medium text-gray-900">{row['Service Item']}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{row.Unit}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{row.Rate || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA + disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
          <p className="text-sm font-medium text-amber-900">
            These rates are used to calculate transparent cost estimates at{' '}
            <Link href="/tools/cost-estimator" className="font-semibold text-amber-700 underline hover:text-amber-800">
              disasterrecovery.com.au/tools/cost-estimator
            </Link>
            . Use the cost estimator for a personalised range, then lodge a claim to get started.
          </p>
        </div>

        <footer className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            Minimum charge ${MIN_CHARGE.toLocaleString()} ex GST applies to all professional callouts. All rates
            exclude GST. Rates set under the NRPG Professional Framework. Last reviewed March 2026.
          </p>
        </footer>
      </div>

      <AntigravityFooter />
    </div>
  );
}

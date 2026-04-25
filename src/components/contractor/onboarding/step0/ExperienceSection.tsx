'use client';

import { Section } from './Section';
import type { Step0SectionProps } from './types';

export function ExperienceSection({ control }: Step0SectionProps) {
  const { data, set } = control;

  return (
    <Section
      number={4}
      title="Minimum 2 Years Business Experience"
      subtitle="The applying business must have been actively operating in the cleaning or restoration industry for at least 2 years."
      satisfied={data.yearsInBusinessConfirmed}
    >
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.yearsInBusinessConfirmed}
          onChange={(e) => set('yearsInBusinessConfirmed', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-blue-500"
        />
        <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
          Confirm: the business has been actively operating in the industry for 2 or more years.
        </span>
      </label>
    </Section>
  );
}

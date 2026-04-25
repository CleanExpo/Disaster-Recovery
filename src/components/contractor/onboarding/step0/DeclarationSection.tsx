'use client';

import { Section } from './Section';
import type { Step0SectionProps } from './types';

export function DeclarationSection({ control }: Step0SectionProps) {
  const { data, set } = control;

  return (
    <Section
      number={5}
      title="Current Business Member Declaration"
      subtitle="The IICRC certification card uploaded above must be registered to a current active member of the applying business."
      satisfied={data.currentMemberDeclaration}
    >
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.currentMemberDeclaration}
          onChange={(e) => set('currentMemberDeclaration', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-blue-500"
        />
        <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
          Declare: the IICRC certification card uploaded above belongs to a current member of this
          business who has 2+ years of industry experience.
        </span>
      </label>
    </Section>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLinkBtn } from './ExternalLinkBtn';
import { Section } from './Section';
import { ASSOCIATION_OPTIONS, type AssociationChoice, type Step0SectionProps } from './types';

export function AssociationSection({ control }: Step0SectionProps) {
  const { data, set } = control;

  const satisfied =
    data.associationChoice !== '' &&
    data.associationMemberNumber.trim().length > 0 &&
    (data.associationChoice !== 'other' || (data.associationOtherName?.trim() ?? '').length > 0);

  const selectedAssociation = ASSOCIATION_OPTIONS.find((a) => a.id === data.associationChoice);

  return (
    <Section
      number={2}
      title="Industry Association Membership"
      subtitle="Active membership with a recognised restoration or cleaning industry body."
      satisfied={satisfied}
    >
      <div className="grid sm:grid-cols-2 gap-2">
        {ASSOCIATION_OPTIONS.map((assoc) => {
          const isSelected = data.associationChoice === assoc.id;
          return (
            <button
              key={assoc.id}
              type="button"
              onClick={() => set('associationChoice', assoc.id as AssociationChoice)}
              className={`text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-slate-600 bg-slate-700/40 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Badge
                  className={`text-xs ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300'
                  }`}
                >
                  {assoc.label}
                </Badge>
                {assoc.states && (
                  <span className="text-xs text-slate-500">{assoc.states.join(', ')} only</span>
                )}
              </div>
              <p className="text-xs leading-snug">{assoc.fullName}</p>
              {isSelected && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {assoc.membershipUrl && (
                    <ExternalLinkBtn href={assoc.membershipUrl} label="Join / apply" />
                  )}
                  {assoc.loginUrl && <ExternalLinkBtn href={assoc.loginUrl} label="Member login" />}
                  {assoc.verifyUrl && (
                    <ExternalLinkBtn href={assoc.verifyUrl} label="Verify member" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {data.associationChoice === 'other' && (
        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Association Name</Label>
          <Input
            placeholder="Full name of the association"
            value={data.associationOtherName ?? ''}
            onChange={(e) => set('associationOtherName', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-xs">Membership Number</Label>
        <Input
          placeholder="Current membership number"
          value={data.associationMemberNumber}
          onChange={(e) => set('associationMemberNumber', e.target.value)}
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
        />
        {selectedAssociation?.verifyUrl && (
          <p className="text-xs text-slate-500">
            Verify at:{' '}
            <ExternalLinkBtn
              href={selectedAssociation.verifyUrl}
              label={selectedAssociation.verifyUrl}
            />
          </p>
        )}
      </div>
    </Section>
  );
}

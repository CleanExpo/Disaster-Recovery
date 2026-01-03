/**
 * DesignOS IICRC Badge Component
  *
   * Official IICRC certification badges with always-visible tooltips
    *
     * Strategic decisions:
      * - Use official IICRC logos exactly as specified (no redesign)
       * - Always visible tooltips (assume zero client knowledge)
        * - Desktop: Hover to show, Mobile: Tap to show
         * - Every acronym gets explanation
          */

'use client';

import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type IICRCCode = 
    | 'S100' | 'S220' | 'S230' | 'S250' | 'S300' | 'S320' 
  | 'S400' | 'S410' | 'S500' | 'S520' | 'S530' | 'S540' 
  | 'S590' | 'S700' | 'S800' | 'S900'
  | 'FSRT' | 'WRT' | 'AMRT' | 'ASD' | 'OCT';

interface IICRCStandard {
    code: IICRCCode;
    name: string;
    description: string;
    learnMoreUrl: string;
}

const iicrcStandards: Record<IICRCCode, IICRCStandard> = {
    S100: {
          code: 'S100',
          name: 'Professional Cleaning of Textile Floor Coverings',
          description: 'Standard for professional carpet and textile floor covering cleaning procedures.',
          learnMoreUrl: '/standards/iicrc-s100',
    },
    S220: {
          code: 'S220',
          name: 'Professional Inspection of Hard Surface Floor Coverings',
          description: 'Standard for inspecting hard surface flooring including tile, stone, and wood.',
          learnMoreUrl: '/standards/iicrc-s220',
    },
    S230: {
          code: 'S230',
          name: 'Professional Inspection of Flooring Subfloors and Substrates',
          description: 'Standard for inspecting subfloors and substrates beneath floor coverings.',
          learnMoreUrl: '/standards/iicrc-s230',
    },
    S250: {
          code: 'S250',
          name: 'Professional Cleaning and Maintenance of Resilient Floor Coverings',
          description: 'Standard for cleaning and maintaining vinyl, linoleum, and other resilient floors.',
          learnMoreUrl: '/standards/iicrc-s250',
    },
    S300: {
          code: 'S300',
          name: 'Professional Upholstery Cleaning',
          description: 'Standard for professional cleaning of upholstered furniture and fabrics.',
          learnMoreUrl: '/standards/iicrc-s300',
    },
    S320: {
          code: 'S320',
          name: 'Professional Assessment Cleaning and Restoration Contents',
          description: 'Standard for assessment, cleaning, and restoration of contents after disasters.',
          learnMoreUrl: '/standards/iicrc-s320',
    },
    S400: {
          code: 'S400',
          name: 'Professional Cleaning of the Commercial Built Environment',
          description: 'Standard for cleaning, maintenance, and restoration of commercial buildings.',
          learnMoreUrl: '/standards/iicrc-s400',
    },
    S410: {
          code: 'S410',
          name: 'Professional Cleaning for Infection Prevention and Control',
          description: 'Standard for cleaning the built environment for infection prevention and control.',
          learnMoreUrl: '/standards/iicrc-s410',
    },
    S500: {
          code: 'S500',
          name: 'Water Damage Restoration',
          description: 'International standard for water damage assessment, classification, and restorative drying.',
          learnMoreUrl: '/standards/iicrc-s500',
    },
    S520: {
          code: 'S520',
          name: 'Mold Remediation',
          description: 'Standard for professional mold remediation including assessment, containment, and removal.',
          learnMoreUrl: '/standards/iicrc-s520',
    },
    S530: {
          code: 'S530',
          name: 'Indoor Environment Assessment for Mold',
          description: 'Standard for indoor environment assessment for suspected mold contaminated structures.',
          learnMoreUrl: '/standards/iicrc-s530',
    },
    S540: {
          code: 'S540',
          name: 'Trauma and Crime Scene Cleanup',
          description: 'Standard for professional trauma and crime scene cleanup, biohazard remediation.',
          learnMoreUrl: '/standards/iicrc-s540',
    },
    S590: {
          code: 'S590',
          name: 'HVAC Systems Assessment',
          description: 'Standard for professional assessment of HVAC systems following water, fire, or mold damage.',
          learnMoreUrl: '/standards/iicrc-s590',
    },
    S700: {
          code: 'S700',
          name: 'Fire and Smoke Damage Restoration',
          description: 'Standard for professional fire and smoke damage restoration procedures.',
          learnMoreUrl: '/standards/iicrc-s700',
    },
    S800: {
          code: 'S800',
          name: 'Professional Inspection of Textile Floor Coverings',
          description: 'Standard for professional inspection of carpet and textile floor coverings.',
          learnMoreUrl: '/standards/iicrc-s800',
    },
    S900: {
          code: 'S900',
          name: 'Remediation of Drug Residues and Chemical Waste',
          description: 'Standard for professional remediation of precursors, drug residues, and associated chemical waste.',
          learnMoreUrl: '/standards/iicrc-s900',
    },
    FSRT: {
          code: 'FSRT',
          name: 'Fire and Smoke Restoration Technician',
          description: 'Certification for fire and smoke damage restoration including soot removal and odor control.',
          learnMoreUrl: '/standards/iicrc-fsrt',
    },
    WRT: {
          code: 'WRT',
          name: 'Water Damage Restoration Technician',
          description: 'Fundamental certification for water damage restoration and drying techniques.',
          learnMoreUrl: '/standards/iicrc-wrt',
    },
    AMRT: {
          code: 'AMRT',
          name: 'Applied Microbial Remediation Technician',
          description: 'Certification for microbial contamination remediation and decontamination protocols.',
          learnMoreUrl: '/standards/iicrc-amrt',
    },
    ASD: {
          code: 'ASD',
          name: 'Applied Structural Drying',
          description: 'Advanced certification for structural drying and complex water damage scenarios.',
          learnMoreUrl: '/standards/iicrc-asd',
    },
    OCT: {
          code: 'OCT',
          name: 'Odor Control Technician',
          description: 'Certification for odor identification, removal, and deodorization techniques.',
          learnMoreUrl: '/standards/iicrc-oct',
    },
};

export interface IICRCBadgeProps {
    code: IICRCCode;
    size?: 'sm' | 'md' | 'lg';
    showCode?: boolean;
    className?: string;
}

export function IICRCBadge({ code, size = 'md', showCode = true, className }: IICRCBadgeProps) {
    const standard = iicrcStandards[code];

    // Guard against invalid codes
    if (!standard) {
          console.warn(`IICRCBadge: Unknown code "${code}"`);
          return null;
    }

    const sizeClasses = {
          sm: 'h-8 w-8',
          md: 'h-10 w-10',
          lg: 'h-12 w-12',
    };

    return (
          <TooltipProvider delayDuration={0}>
                  <Tooltip>
                          <TooltipTrigger asChild>
                                    <div
                                                  className={cn(
                                                                  'inline-flex items-center gap-2 cursor-help transition-opacity hover:opacity-80',
                                                                  className
                                                                )}
                                                >
                                                <div
                                                                className={cn(
                                                                                  'rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs',
                                                                                  sizeClasses[size]
                                                                                )}
                                                                role="img"
                                                                aria-label={`IICRC ${code} Certified`}
                                                              >
                                                  {code}
                                                </div>div>
                                      {showCode && (
                                                                <span className="text-sm font-medium text-muted-foreground">IICRC {code}</span>span>
                                                )}
                                    </div>div>
                          </TooltipTrigger>TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4">
                                    <h4 className="font-semibold mb-2">
                                                IICRC {code}: {standard.name}
                                    </h4>h4>
                                    <p className="text-sm text-muted-foreground mb-3">{standard.description}</p>p>
                                    <Link
                                                  href={standard.learnMoreUrl}
                                                  className="text-xs text-primary hover:underline inline-flex items-center"
                                                >
                                                Learn more about {code} →
                                    </Link>Link>
                          </TooltipContent>TooltipContent>
                  </Tooltip>Tooltip>
          </TooltipProvider>TooltipProvider>
        );
}

/**
 * Multiple badges in a row (contractor profile)
  */
export function IICRCBadgeGroup({ codes, className }: { codes: IICRCCode[]; className?: string }) {
    return (
          <div className={cn('flex flex-wrap gap-2', className)}>
            {codes.map((code) => (
                    <IICRCBadge key={code} code={code} size="sm" showCode={false} />
                  ))}
          </div>div>
        );
}</Tooltip>

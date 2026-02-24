import type { ServicePageData } from '../types';

const iconTesting = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;
const iconPPE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
const iconCompliance = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;

export const methLabDecontaminationData: ServicePageData = {
  slug: 'meth-lab-decontamination',
  breadcrumbLabel: 'Biohazard',
  title: 'Clandestine Drug Lab Decontamination',
  leadText: 'Rigorous, scientific remediation to restore your property to safe, legal habitation standards. Conducted exclusively by specialised NRPG bio-technicians.',
  theme: {
    headerGradient: 'linear-gradient(135deg, #0A1B2C 0%, #1A4674 100%)',
    leadBorderColor: '#F29900',
    statusColor: '#F29900',
    pulseColor: 'rgba(242, 153, 0, 0.7)',
    techIconColor: '#64B5F6',
    techIconBg: '#F4F6F8',
    techIconBorder: '#E0E4E8',
  },
  introHeading: 'The Hidden Danger of Chemical Residue',
  introParagraphs: [
    'Properties previously used as clandestine drug laboratories retain highly toxic chemical residues long after the equipment is removed. These volatile organic compounds (VOCs) embed themselves in gyprock, carpets, HVAC systems, and structural timber, posing severe respiratory and neurological risks to future occupants.',
    'Standard cleaning is dangerously insufficient. Disaster Recovery utilises elite, IICRC-certified protocols to scientifically neutralise and extract these hazardous materials.',
  ],
  technicalCards: [
    {
      iconSvg: iconTesting,
      title: 'Pre & Post ATP Testing',
      description: 'Comprehensive baseline swab testing using independent NATA-accredited laboratories to legally establish contamination levels before and after remediation.',
    },
    {
      iconSvg: iconPPE,
      title: 'Level C Hazmat Protocol',
      description: 'Technicians deploy in full Tyvek suits with powered air-purifying respirators (PAPR) to safely execute deep chemical extraction without cross-contamination.',
    },
    {
      iconSvg: iconCompliance,
      title: 'Council Clearance',
      description: 'Provision of certified clearance certificates required by local Australian city councils and health departments to lift property habitation bans.',
    },
  ],
  protocolHeading: 'Our 4-Stage Remediation Architecture',
  protocolSteps: [
    {
      title: 'Initial Environmental Assessment:',
      description: ' Deployment of specialised field technicians to conduct thorough site mapping and chemical sampling.',
    },
    {
      title: 'Site Containment & Depressurisation:',
      description: ' Installation of critical zip-wall barriers and HEPA-filtered negative air machines to prevent particulate drift.',
    },
    {
      title: 'Chemical Neutralisation:',
      description: ' Application of proprietary, industrial-grade neutralising agents to break down methamphetamine residues at a molecular level.',
    },
    {
      title: 'Independent Clearance:',
      description: ' Final environmental testing by an unbiased third-party hygienist to guarantee the property meets safe habitation thresholds.',
    },
  ],
  sidebar: {
    statusText: 'Live Network Active',
    heading: 'Secure Decontamination Connection',
    description: 'Discreet, compliance-certified teams ready to deploy Australia-wide.',
    ctaHref: '/claim/start?service=meth-lab-decontamination',
    ctaText: 'Make a Claim',
    footerNote: 'Discreet, unmarked vehicles available upon request to protect property reputation.',
    trustText: 'Adhering strictly to Australian National Guidelines for Clandestine Drug Laboratories.',
  },
};

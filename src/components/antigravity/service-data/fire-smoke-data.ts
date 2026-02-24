import type { ServicePageData } from '../types';

const iconScrub = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 12 17.19 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;
const iconWind = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>`;
const iconFlame = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;

export const fireSmokeData: ServicePageData = {
  slug: 'fire-smoke',
  breadcrumbLabel: 'Fire & Smoke',
  title: 'Fire & Smoke Remediation',
  leadText: 'Advanced recovery protocols for structural fire damage. We deploy intensive carbon filtration, thermal fogging, and specialised chemical sponges to permanently neutralize highly toxic smoke residues.',
  theme: {
    headerGradient: 'linear-gradient(135deg, #2D0A0A 0%, #741A1A 100%)',
    headerRadial: 'radial-gradient(circle at bottom right, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
    leadBorderColor: '#D93025',
    statusColor: '#D93025',
    pulseColor: 'rgba(217, 48, 37, 0.7)',
    techIconColor: '#D93025',
    techIconBg: '#FEF2F2',
    techIconBorder: '#FEE2E2',
  },
  introHeading: 'The Corrosive Threat of Smoke WEBS',
  introParagraphs: [
    'Extinguishing a fire is only the initial phase of recovery. The dense, acidic soot and smoke webs left behind rapidly corrode electronics, tarnish metals, and permanently stain structural elements within days.',
    'Our FSRT (Fire & Smoke Restoration Technician) certified teams act immediately to neutralize these acidic byproducts. NRPG employs commercial-grade ultrasonic cleaning tanks for contents recovery, alongside heavy-duty HEPA air scrubbers to completely filter airborne particulate matter from the environment.',
  ],
  technicalCards: [
    {
      iconSvg: iconScrub,
      title: 'Soot Decontamination',
      description: 'Utilising specialised dry chem sponges and highly formulated degreasers, we methodically lift bonded soot and carbon from porous drywall and historic masonry without causing micro-abrasions.',
    },
    {
      iconSvg: iconWind,
      title: 'Odour Neutralisation',
      description: 'Smoke odours penetrate deeply into structural framing. We use thermal foggers and industrial ozone generators to pair with and permanently destroy odour-causing molecules at their chemical source.',
    },
    {
      iconSvg: iconFlame,
      title: 'Corrosion Mitigation',
      description: 'Acidic fire residues initiate rapid oxidative corrosion on brass, copper, and sensitive electronics. We apply immediate protective sealants and anti-corrosive inhibitors prior to the full restoration phase.',
    },
  ],
  protocolHeading: 'The IICRC FSRT Restoration Framework',
  protocolSteps: [
    {
      title: 'Structural Safety Profiling:',
      description: ' Assessing structural integrity, isolating hazardous electrical circuits, and installing emergency board-ups or roof tarping to secure the property.',
    },
    {
      title: 'Air Quality Establishment:',
      description: ' Deployment of industrial HEPA 500 air scrubbers creating negative pressure environments to filter carcinogenic particulates from the breathing zone.',
    },
    {
      title: 'Intensive Cleaning & Vaporisation:',
      description: ' A meticulous top-down cleaning of ceilings, walls, contents, and HVAC systems using EPA-approved restorative chemicals.',
    },
    {
      title: 'Sealing & Odour Lock:',
      description: ' Applying encapsulating primers and shellac-based sealants to wood framing to permanently lock in un-reachable smoke odours before reconstruction begins.',
    },
  ],
  sidebar: {
    statusText: '24/7 Fire Response Active',
    heading: 'Deploy Fire Specialists',
    description: 'Trigger immediate dispatch of certified FSRT crews to your disaster zone.',
    ctaHref: '/claim/start?service=fire-damage',
    ctaText: 'Make a Claim',
    footerNote: 'Approved and trusted by top tier insurers across Australia and New Zealand.',
    trustText: 'Operating strictly under IICRC FSRT Standards for Fire & Smoke Damage Restoration.',
  },
};

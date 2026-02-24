import type { ServicePageData } from '../types';

const iconPrecision = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>`;
const iconVapor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"></path><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9"></path><path d="M10 2v3M14 2v3M10 5V2M14 5V2"></path></svg>`;
const iconPulse = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`;

export const laserCleaningData: ServicePageData = {
  slug: 'laser-cleaning',
  breadcrumbLabel: 'Advanced Recovery',
  title: 'Precision Laser Cleaning Technology',
  leadText: 'Next-generation, non-abrasive surface restoration. Our advanced ablation lasers vaporise soot, graffiti, and rust at the molecular level without damaging the underlying substrate.',
  theme: {
    headerGradient: 'linear-gradient(135deg, #0A1B2C 0%, #1A4674 100%)',
    headerRadial: 'linear-gradient(rgba(26, 70, 116, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 70, 116, 0.4) 1px, transparent 1px)',
    leadBorderColor: '#64B5F6',
    statusColor: '#64B5F6',
    pulseColor: 'rgba(100, 181, 246, 0.7)',
    techIconColor: '#64B5F6',
    techIconBg: '#F4F6F8',
    techIconBorder: '#E0E4E8',
  },
  introHeading: 'The Future of Soot & Smoke Removal',
  introParagraphs: [
    'Traditional fire damage restoration heavily relies on dry ice blasting, soda blasting, or toxic chemical solvents. While effective, these methods generate immense secondary waste, require exhaustive containment, and risk eroding fragile structural frameworks.',
    "NRPG's state-of-the-art Laser Cleaning units emit high-frequency light pulses to instantly ablate smoke webs, heavy soot, and carbon scoring. The contamination vaporizes into a fine dust that is immediately captured by our integrated HEPA extraction systems, leaving behind zero trace media.",
  ],
  technicalCards: [
    {
      iconSvg: iconPrecision,
      title: 'Substrate Preservation',
      description: "The laser's wavelength is calibrated to only absorb into the contamination layer, reflecting harmlessly off the original brickwork, timber, or metal, ensuring total architectural preservation.",
    },
    {
      iconSvg: iconVapor,
      title: 'Zero Secondary Waste',
      description: 'No chemicals, no blasting media, no water. Laser ablation eliminates the compounding cleanup costs associated with traditional industrial pressure washing or sandblasting.',
    },
    {
      iconSvg: iconPulse,
      title: 'Rapid Environmental ROI',
      description: 'Achieve unparalleled restoration speeds. Our Class 4 laser arrays dramatically reduce operational downtime for commercial and industrial facilities struck by fire disasters.',
    },
  ],
  protocolHeading: 'Our Laser Deployment Process',
  protocolSteps: [
    {
      title: 'Substrate Analysis:',
      description: " Technicians assess the material density (brick, sandstone, structural steel) and calibrate the laser frequency to match the contamination's thermal properties.",
    },
    {
      title: 'Safety Parameter Setup:',
      description: ' Establishing a Class 4 laser exclusion zone with specialised optical barriers to protect surrounding personnel from scattered radiation.',
    },
    {
      title: 'Precision Ablation Phase:',
      description: ' Methodical, line-by-line vaporisation of the affected surface area, guided by an IICRC-certified laser technician.',
    },
    {
      title: 'HEPA Vapour Extraction:',
      description: ' Simultaneous vacuum capture of off-gassing and micro-particulates, rendering the environment instantly clean.',
    },
  ],
  sidebar: {
    statusText: 'Live Equipment Ready',
    heading: 'Deploy Laser Specialist',
    description: 'Secure our advanced laser remediation units for immediate dispatch.',
    ctaHref: '/claim/start?service=laser-cleaning',
    ctaText: 'Make a Claim',
    footerNote: 'Ideal for heritage-listed restorations, industrial manufacturing lines, and severe fire damage.',
    trustText: 'Adhering to strict Australian occupational health and laser safety regulations.',
  },
};
